"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFlights = void 0;
const search_service_1 = require("../services/search.service");
const searchFlights = async (req, res) => {
    try {
        const result = await (0, search_service_1.performSearch)(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ message: "Search failed" });
    }
};
exports.searchFlights = searchFlights;
