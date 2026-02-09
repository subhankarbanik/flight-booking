"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBooking = void 0;
const SelectedFlight_1 = __importDefault(require("../models/SelectedFlight"));
const Booking_1 = __importDefault(require("../models/Booking"));
const handleBooking = async (payload) => {
    const { searchId, traveller } = payload;
    if (!traveller?.name ||
        !traveller?.email ||
        !traveller?.phone ||
        !traveller?.dob ||
        !traveller?.gender) {
        throw new Error("Missing traveller details");
    }
    const selected = await SelectedFlight_1.default.findOne({ searchId });
    if (!selected)
        throw new Error("No flight selected");
    const bookingId = `BK-${Date.now()}`;
    const booking = await Booking_1.default.create({
        bookingId,
        searchId,
        selectedFlightId: selected._id,
        traveller,
        finalPrice: selected.priceLocked,
        status: "CONFIRMED"
    });
    return {
        bookingId: booking.bookingId,
        pricePaid: booking.finalPrice,
        traveller: booking.traveller,
        status: booking.status
    };
};
exports.handleBooking = handleBooking;
