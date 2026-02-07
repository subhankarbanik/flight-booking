import { Request, Response } from "express";
import { performSearch } from "../services/search.service";

export const searchFlights = async (req: Request, res: Response) => {
  try {
    const result = await performSearch(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
