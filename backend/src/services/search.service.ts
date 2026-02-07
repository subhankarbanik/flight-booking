// import { v4 as uuid } from "uuid";
import Search from "../models/Search";
import rawFlightData from "../data/flight.json";
import { flattenFlights } from "../utils/flattenFlights";
import { FlightSearchResponse } from "../types/FlightSearch";

export const performSearch = async (filters: any) => {
  const flightData = rawFlightData as FlightSearchResponse;

  const searchId = `${filters.from}-${filters.to}-${Date.now()}`;


  let flights = flattenFlights(flightData.result);


  if (filters.stops !== undefined) {
    flights = flights.filter(f => f.stops === filters.stops);
  }

  if (filters.maxPrice) {
    flights = flights.filter(f => f.lowestPrice <= filters.maxPrice);
  }

 
  await Search.create({
    searchId,
    payload: filters,
    result: flightData.result
  });


  return {
    searchId,
    flights
  };
};
