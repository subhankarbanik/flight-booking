"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFlight = void 0;
const flight_service_1 = require("../services/flight.service");
const selectFlight = async (req, res) => {
    try {
        const result = await (0, flight_service_1.handleFlightSelection)(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.selectFlight = selectFlight;
