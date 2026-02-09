"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performSearch = void 0;
const Search_1 = __importDefault(require("../models/Search"));
const flight_json_1 = __importDefault(require("../data/flight.json"));
const flattenFlights_1 = require("../utils/flattenFlights");
const performSearch = async (filters) => {
    if (!filters.from || !filters.to || !filters.departureDate) {
        throw new Error("From, To and Departure Date are required");
    }
    if (filters.tripType === "ROUND_TRIP") {
        throw new Error("Round trip not supported with current dataset");
    }
    const flightData = flight_json_1.default;
    const searchId = `${filters.from}-${filters.to}-${Date.now()}`;
    let flights = (0, flattenFlights_1.flattenFlights)(flightData.data.result);
    flights = flights.filter(f => f.origin === filters.from &&
        f.destination === filters.to);
    // i am mocking this filter cause the non availabilty of sufficient data to get matching fligts 
    if (filters.departureDate) {
        flights = flights.filter(f => !!f.departureTime);
    }
    if (filters.stops) {
        if (filters.stops === "2+") {
            flights = flights.filter(f => f.stops >= 2);
        }
        else {
            flights = flights.filter(f => f.stops === Number(filters.stops));
        }
    }
    if (filters.timeRange && filters.timeRange !== "ANY") {
        flights = flights.filter(f => {
            const hour = new Date(f.departureTime).getHours();
            if (filters.timeRange === "MORNING")
                return hour >= 5 && hour < 12;
            if (filters.timeRange === "AFTERNOON")
                return hour >= 12 && hour < 17;
            if (filters.timeRange === "EVENING")
                return hour >= 17 && hour < 21;
            if (filters.timeRange === "NIGHT")
                return hour >= 21 || hour < 5;
            return true;
        });
    }
    if (filters.maxPrice) {
        flights = flights.filter(f => f.lowestPrice <= filters.maxPrice);
    }
    await Search_1.default.create({
        searchId,
        payload: filters,
        matchedFlights: flights.map(f => f.flightKey)
    });
    return {
        searchId,
        flights
    };
};
exports.performSearch = performSearch;
