"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const flight_json_1 = __importDefault(require("./data/flight.json"));
dotenv_1.default.config();
const flightData = flight_json_1.default;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected", mongoose_1.default.connection.name))
    .catch(err => console.error(err));
app_1.default.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
app_1.default.listen(process.env.PORT || 4000, () => {
    console.log("Backend running on port 4000");
});
