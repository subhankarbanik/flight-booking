"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flight_controller_1 = require("../controllers/flight.controller");
const router = (0, express_1.Router)();
router.post("/select", flight_controller_1.selectFlight);
exports.default = router;
