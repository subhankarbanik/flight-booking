"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SearchSchema = new mongoose_1.default.Schema({
    searchId: {
        type: String,
        required: true,
        index: true
    },
    payload: {
        type: Object,
        required: true
    },
    matchedFlights: {
        type: [String],
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Search", SearchSchema);
