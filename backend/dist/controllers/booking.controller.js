"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const booking_service_1 = require("../services/booking.service");
const createBooking = async (req, res) => {
    try {
        const booking = await (0, booking_service_1.handleBooking)(req.body);
        res.status(200).json(booking);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createBooking = createBooking;
