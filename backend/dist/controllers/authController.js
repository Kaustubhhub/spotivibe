"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotifyPlaylists = exports.spotifyCallback = exports.loginWithSpotify = void 0;
const authService_1 = require("../services/authService");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const loginWithSpotify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const scopes = ['user-read-email', 'playlist-read-private'];
        const state = Math.random().toString(36).substring(7);
        if (!clientId || !redirectUri) {
            res.status(500).json({ error: 'Spotify client ID or redirect URI is missing in the environment variables' });
            return;
        }
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&state=${state}`;
        res.json({ authUrl });
    }
    catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});
exports.loginWithSpotify = loginWithSpotify;
const spotifyCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(exports.spotifyCallback);
    const { code, error } = req.query;
    if (error) {
        res.status(400).json({ error: 'Authorization failed', details: error });
        return;
    }
    if (!code) {
        res.status(400).json({ error: 'Authorization code is missing' });
        return;
    }
    try {
        const tokenResponse = yield axios_1.default.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI || '',
        }), {
            headers: {
                Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const { access_token, refresh_token, expires_in } = tokenResponse.data;
        res.status(200).json({
            message: 'Authorization successful',
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in,
        });
    }
    catch (err) {
        console.error('Error exchanging authorization code:', err);
        res.status(500).json({
            error: 'Failed to retrieve access token',
            details: err instanceof Error ? err.message : 'Unknown error',
        });
    }
});
exports.spotifyCallback = spotifyCallback;
const getSpotifyPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.query.accessToken;
    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }
    try {
        const playlists = yield (0, authService_1.fetchSpotifyPlaylists)(accessToken);
        return res.json({ playlists });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch playlists' });
    }
});
exports.getSpotifyPlaylists = getSpotifyPlaylists;
