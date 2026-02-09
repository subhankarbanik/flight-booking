import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { Request, Response } from "express";
import rawFlightData from "./data/flight.json";
import { FlightSearchResponse } from "./types/FlightSearch";
import { flattenFlights } from "./utils/flattenFlights";

dotenv.config();
const flightData = rawFlightData as FlightSearchResponse;
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected" , mongoose.connection.name))
  .catch(err => console.error(err));



  app.get("/health", (_req:Request, res:Response) => {
    res.status(200).json({ status: "ok" });
  });


app.listen(process.env.PORT || 4000, () => {
  console.log("Backend running on port 4000");
});

