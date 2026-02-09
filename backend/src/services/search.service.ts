import Search from "../models/Search";
import rawFlightData from "../data/flight.json";
import { flattenFlights } from "../utils/flattenFlights";
import { FlightSearchResponse } from "../types/FlightSearch";

export const performSearch = async (filters: any) => {
  if (!filters.from || !filters.to || !filters.departureDate) {
    throw new Error("From, To and Departure Date are required");
  }

  if (filters.tripType === "ROUND_TRIP") {
    throw new Error("Round trip not supported with current dataset");
  }

  const flightData = rawFlightData as FlightSearchResponse;
  const searchId = `${filters.from}-${filters.to}-${Date.now()}`;

  let flights = flattenFlights(flightData.data.result);

  flights = flights.filter(f =>
    f.origin === filters.from &&
    f.destination === filters.to
  );

  // i am mocking this filter cause the non availabilty of sufficient data to get matching fligts 
  if (filters.departureDate) {
    flights = flights.filter(f => !!f.departureTime);
  }

  if (filters.stops) {
    if (filters.stops === "2+") {
      flights = flights.filter(f => f.stops >= 2);
    } else {
      flights = flights.filter(f => f.stops === Number(filters.stops));
    }
  }

  if (filters.timeRange && filters.timeRange !== "ANY") {
    flights = flights.filter(f => {
      const hour = new Date(f.departureTime).getHours();

      if (filters.timeRange === "MORNING") return hour >= 5 && hour < 12;
      if (filters.timeRange === "AFTERNOON") return hour >= 12 && hour < 17;
      if (filters.timeRange === "EVENING") return hour >= 17 && hour < 21;
      if (filters.timeRange === "NIGHT") return hour >= 21 || hour < 5;

      return true;
    });
  }

  
  if (filters.maxPrice) {
    flights = flights.filter(f => f.lowestPrice <= filters.maxPrice);
  }

  await Search.create({
    searchId,
    payload: filters,
    matchedFlights: flights.map(f => f.flightKey)
  });

  return {
    searchId,
    flights
  };
};
