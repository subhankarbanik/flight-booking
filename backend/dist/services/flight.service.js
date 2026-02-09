"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFlightSelection = void 0;
const flight_json_1 = __importDefault(require("../data/flight.json"));
const Search_1 = __importDefault(require("../models/Search"));
const SelectedFlight_1 = __importDefault(require("../models/SelectedFlight"));
const flattenFlights_1 = require("../utils/flattenFlights");
const handleFlightSelection = async (payload) => {
    const { searchId, flightKey, fareId } = payload;
    const search = await Search_1.default.findOne({ searchId });
    if (!search)
        throw new Error("Search not found");
    const flightData = flight_json_1.default;
    const allFlights = (0, flattenFlights_1.flattenFlights)(flightData.data.result);
    const flight = allFlights.find(f => f.flightKey === flightKey);
    if (!flight)
        throw new Error("Flight not found");
    const fare = flight.fares.find((f) => `${f.fareGroup}-${f.fareIdentifiers.cabinType}` === fareId);
    if (!fare)
        throw new Error("Fare not found");
    const priceLocked = Number(fare.price.pricePerAdult);
    const saved = await SelectedFlight_1.default.create({
        searchId,
        flightKey,
        fareId,
        flightData: flight,
        fare,
        priceLocked
    });
    return {
        selectedFlightId: saved._id,
        priceLocked
    };
};
exports.handleFlightSelection = handleFlightSelection;
