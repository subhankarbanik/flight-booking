import rawFlightData from "../data/flight.json";
import Search from "../models/Search";
import SelectedFlight from "../models/SelectedFlight";
import { flattenFlights } from "../utils/flattenFlights";
import { FlightSearchResponse } from "../types/FlightSearch";

export const handleFlightSelection = async (payload: any) => {
  const { searchId, flightKey, fareId } = payload;

  const search = await Search.findOne({ searchId });
  if (!search) throw new Error("Search not found");
  const flightData = rawFlightData as FlightSearchResponse;
  const allFlights = flattenFlights(flightData.data.result);
  const flight = allFlights.find(f => f.flightKey === flightKey);
  if (!flight) throw new Error("Flight not found");
  const fare = flight.fares.find(
    (f: any) =>
      `${f.fareGroup}-${f.fareIdentifiers.cabinType}` === fareId
  );

  if (!fare) throw new Error("Fare not found");


  const priceLocked = Number(fare.price.pricePerAdult);


  const saved = await SelectedFlight.create({
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
