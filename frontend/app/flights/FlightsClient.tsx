"use client";

import { useState } from "react";
import { searchFlights, selectFlight } from "@/services/api";
import { useRouter } from "next/navigation";

export default function FlightsClient() {
  const router = useRouter();

  const [flights, setFlights] = useState<any[]>([]);
  const [searchId, setSearchId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [tripType, setTripType] = useState<"ONE_WAY" | "ROUND_TRIP">("ONE_WAY");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [stops, setStops] = useState("");
  const [timeRange, setTimeRange] = useState("ANY");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!from || !to || !departureDate) {
      alert("From, To and Departure Date are required");
      return;
    }

    if (tripType === "ROUND_TRIP") {
      alert("Round trip not supported with current data");
      return;
    }

    const res = await searchFlights({
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departureDate,
      tripType,
      passengers,
      maxPrice,
      stops,
      timeRange
    });

    setFlights(res.flights);
    setSearchId(res.searchId);
    setHasSearched(true);
  };

  const handleSelect = async (flight: any) => {
    await selectFlight({
      searchId,
      flightKey: flight.flightKey,
      fareId: `${flight.fares[0].fareGroup}-${flight.fares[0].fareIdentifiers.cabinType}`
    });

    router.push(`/traveller?searchId=${searchId}`);
  };

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Flights</h2>

      <div style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        <input placeholder="From (DEL)" value={from} onChange={e => setFrom(e.target.value)} />
        <input placeholder="To (SHJ)" value={to} onChange={e => setTo(e.target.value)} />

        <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />

        <select value={tripType} onChange={e => setTripType(e.target.value as any)}>
          <option value="ONE_WAY">One Way</option>
          <option value="ROUND_TRIP">Round Trip</option>
        </select>

        <input
          type="number"
          min={1}
          value={passengers}
          onChange={e => setPassengers(Number(e.target.value))}
        />

        <label>Max Price: ₹{maxPrice}</label>
        <input
          type="range"
          min={2000}
          max={50000}
          step={500}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
        />

        <select value={stops} onChange={e => setStops(e.target.value)}>
          <option value="">Any Stops</option>
          <option value="0">Non-stop</option>
          <option value="1">1 Stop</option>
          <option value="2+">2+ Stops</option>
        </select>

        <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
          <option value="ANY">Any Time</option>
          <option value="MORNING">Morning</option>
          <option value="AFTERNOON">Afternoon</option>
          <option value="EVENING">Evening</option>
          <option value="NIGHT">Night</option>
        </select>

        <button onClick={handleSearch}>Search Flights</button>
      </div>

      <hr />

      {hasSearched && flights.length === 0 && (
        <p>No matching flights found.</p>
      )}

      {flights.map(f => (
        <div key={f.flightKey} style={{ border: "1px solid #ccc", padding: 10 }}>
          <p><strong>{f.airline}</strong></p>
          <p>Stops: {f.stops}</p>
          <p>Departure: {formatDateTime(f.departureTime)}</p>
          <p>Arrival: {formatDateTime(f.arrivalTime)}</p>
          <p>Duration: {Math.floor(f.durationInMin / 60)}h {f.durationInMin % 60}m</p>
          <p>Total: ₹{f.lowestPrice * passengers}</p>
          <button onClick={() => handleSelect(f)}>Select</button>
        </div>
      ))}
    </div>
  );
}
