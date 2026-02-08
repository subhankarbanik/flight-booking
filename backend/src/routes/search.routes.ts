
export {};
import { Router } from "express";
import { searchFlights } from "../controllers/search.controller";

const router = Router();

router.post("/", searchFlights);


export default router;
