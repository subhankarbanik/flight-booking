
import Search from "../models/Search";
import rawFlightData from "../data/flight.json";
import { flattenFlights } from "../utils/flattenFlights";
import { FlightSearchResponse } from "../types/FlightSearch";

export const performSearch = async (filters: any) => {
  const flightData = rawFlightData as FlightSearchResponse;

  const searchId = `${filters.from}-${filters.to}-${Date.now()}`;


  let flights = flattenFlights(flightData.data.result);
  // flights = flights.filter(f => {
  //   const firstSegment = f.segments[0];
  //   const lastSegment = f.segments[f.segments.length - 1];
  
  //   return (
  //     firstSegment.origin === filters.from &&
  //     lastSegment.destination === filters.to
  //   );
  // });
  


  if (filters.stops !== undefined) {
    flights = flights.filter(f => f.stops === filters.stops);
  }

  if (filters.maxPrice) {
    flights = flights.filter(f => f.lowestPrice <= filters.maxPrice);
  }

 
  await Search.create({
    searchId,
    payload: filters,
    result: flightData.data.result
  });


  return {
    searchId,
    flights
  };
};
