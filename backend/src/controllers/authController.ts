import { Request, Response } from 'express';
import { fetchSpotifyPlaylists } from '../services/authService';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const loginWithSpotify = async (req: Request, res: Response): Promise<void> => {
    try {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const scopes = ['user-read-email', 'playlist-read-private'];
        const state = Math.random().toString(36).substring(7);

        if (!clientId || !redirectUri) {
            res.status(500).json({ error: 'Spotify client ID or redirect URI is missing in the environment variables' });
            return;
        }

        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${encodeURIComponent(
            clientId
        )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(
            scopes.join(' ')
        )}&state=${state}`;

        res.json({ authUrl });
    } catch (error) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

export const spotifyCallback = async (req: Request, res: Response): Promise<void> => {
    console.log(spotifyCallback)
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
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code as string,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI || '',
            }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        res.status(200).json({
            message: 'Authorization successful',
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in,
        });
    } catch (err) {
        console.error('Error exchanging authorization code:', err);
        res.status(500).json({
            error: 'Failed to retrieve access token',
            details: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getSpotifyPlaylists = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const accessToken = req.query.accessToken as string;

    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }

    try {
        const playlists = await fetchSpotifyPlaylists(accessToken);
        return res.json({ playlists });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch playlists' });
    }
};
