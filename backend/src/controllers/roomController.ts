import { Request, Response } from 'express';
import { createNewRoom, fetchRooms } from '../services/roomService';

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await fetchRooms();
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const room = await createNewRoom(req.body);
    res.status(201).json({ room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};
