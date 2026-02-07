import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { Request, Response } from "express";

dotenv.config();



mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));



  app.get("/health", (_req:Request, res:Response) => {
    res.status(200).json({ status: "ok" });
  });


app.listen(4000, () => {
  console.log("Backend running on port 4000");
});

