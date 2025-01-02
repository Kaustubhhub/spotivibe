import { Router } from 'express';
import { fetchSongs } from '../controllers/songController';

const router = Router();

router.get('/', fetchSongs);

export default router;
