import { Request, Response } from "express";
import { handleBooking } from "../services/booking.service";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await handleBooking(req.body);
    res.status(200).json(booking);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
