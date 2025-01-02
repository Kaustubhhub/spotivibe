"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get('/spotify/login', authController_1.loginWithSpotify);
router.get('/spotify/callback', authController_1.spotifyCallback);
// router.get('/spotify/playlists', getSpotifyPlaylists);
exports.default = router;
