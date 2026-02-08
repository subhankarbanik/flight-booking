import Search from "../models/Search";
import SelectedFlight from "../models/SelectedFlight";

export const handleFlightSelection = async (payload: any) => {
  const { searchId, flightKey, fareId } = payload;

 
  const search = await Search.findOne({ searchId });
  if (!search) throw new Error("Search not found");

  const result: any = search.result;


  let selectedFlight: any = null;

  Object.values(result.sectors).forEach((sector: any) => {
    if (sector[flightKey]) {
      selectedFlight = sector[flightKey];
    }
  });

  if (!selectedFlight) throw new Error("Flight not found");

 
  const fare = selectedFlight.fares.find(
    (f: any) => `${f.fareGroup}-${f.fareIdentifiers.cabinType}` === fareId
  );

  if (!fare) throw new Error("Fare not found");


  const priceLocked = Number(fare.price.pricePerAdult);

  const saved = await SelectedFlight.create({
    searchId,
    flightKey,
    fareId,
    flightData: selectedFlight,
    fare,
    priceLocked
  });

  return {
    selectedFlightId: saved._id,
    priceLocked
  };
};
