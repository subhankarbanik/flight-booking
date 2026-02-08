import { Router } from "express";
import { selectFlight } from "../controllers/flight.controller";

const router = Router();

router.post("/select", selectFlight);

export default router;
