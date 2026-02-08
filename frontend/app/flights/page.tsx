
"use client";

import { useState } from "react";
import { searchFlights, selectFlight } from "@/services/api";
import { useRouter } from "next/navigation";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    console.log("SEARCH CLICKED", { from, to });
    if (!from || !to) {
      alert("Please enter both From and To cities");
      return;
    }
  
    try {
      const res = await searchFlights({
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        maxPrice: 15000
      });
  
      setFlights(res.flights);
      setSearchId(res.searchId);
    } catch (err) {
      console.error("Search failed", err);
    }
  };
  

  const handleSelect = async (flight: any) => {
    try {
      await selectFlight({
        searchId,
        flightKey: flight.flightKey,
        fareId: `${flight.fares[0].fareGroup}-${flight.fares[0].fareIdentifiers.cabinType}`
      });

      router.push(`/traveller?searchId=${searchId}`);
    } catch (err) {
      console.error("Select failed", err);
    }
  };
  const formatDateTime = (iso: string) => {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  

  return (
    <div>
      <input
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button onClick={handleSearch}>Search Flights</button>
    

      {flights.map(f => (
        <div key={f.flightKey}>
          <p>{f.airline}</p>
          <p>Stops: {f.stops}</p>
          <p>Departure Time: {formatDateTime(f.departureTime)}</p>
          <p>Arrival Time: {formatDateTime(f.arrivalTime)}</p>
          <p>Fare Type</p>
          <p>Price: {f.lowestPrice}</p>
          <button onClick={() => handleSelect(f)}>Select</button>
        </div>
      ))}
    </div>
  );
}
