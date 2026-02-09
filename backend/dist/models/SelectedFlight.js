"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SelectedFlightSchema = new mongoose_1.default.Schema({
    searchId: { type: String, required: true },
    flightKey: { type: String, required: true },
    fareId: { type: String, required: true },
    flightData: { type: Object, required: true },
    fare: { type: Object, required: true },
    priceLocked: { type: Number, required: true }
}, { timestamps: true });
exports.default = mongoose_1.default.model("SelectedFlight", SelectedFlightSchema);
