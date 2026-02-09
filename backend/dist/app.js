"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const flight_routes_1 = __importDefault(require("./routes/flight.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/search", search_routes_1.default);
app.use("/api/flight", flight_routes_1.default);
app.use("/api/booking", booking_routes_1.default);
exports.default = app;
