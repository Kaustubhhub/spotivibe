import { Request, Response } from 'express';
import { getSongs } from '../services/songService';

export const fetchSongs = async (req: Request, res: Response) => {
  try {
    const songs = await getSongs();
    res.json({ songs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};
