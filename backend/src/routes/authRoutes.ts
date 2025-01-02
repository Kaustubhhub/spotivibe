import { Router } from 'express';
import { loginWithSpotify, spotifyCallback } from '../controllers/authController';

const router = Router();

router.get('/spotify/login', loginWithSpotify);
router.get('/spotify/callback', spotifyCallback);
// router.get('/spotify/playlists', getSpotifyPlaylists);

export default router;
