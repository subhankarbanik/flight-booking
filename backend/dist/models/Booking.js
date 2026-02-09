"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    bookingId: { type: String, required: true },
    searchId: { type: String, required: true },
    selectedFlightId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "SelectedFlight",
        required: true
    },
    traveller: {
        name: String,
        email: String,
        phone: String,
        dob: String,
        gender: String,
        passport: String
    },
    finalPrice: { type: Number, required: true },
    status: { type: String, default: "CONFIRMED" }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Booking", BookingSchema);
