import { Request, Response } from "express";
import { handleFlightSelection } from "../services/flight.service";

export const selectFlight = async (req: Request, res: Response) => {
  try {
    const result = await handleFlightSelection(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
