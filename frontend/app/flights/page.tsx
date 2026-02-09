"use client";

import { useState } from "react";
import { searchFlights, selectFlight } from "@/services/api";
import { useRouter } from "next/navigation";

export default function FlightsPage() {
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

    try {
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
    } catch (err) {
      console.error("Search failed", err);
      alert("Search failed. Check backend.");
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
    <div style={{ padding: 20 ,   }}>
      <h2 >Search Flights</h2>

      <div style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        <input placeholder="From (DEL)" value={from} onChange={e => setFrom(e.target.value)} />
        <input placeholder="To (SHJ)" value={to} onChange={e => setTo(e.target.value)} />

        <span>Departure : <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} /></span>

        <select value={tripType} onChange={e => setTripType(e.target.value as any)}>
          <option value="ONE_WAY">One Way</option>
          <option value="ROUND_TRIP">Round Trip</option>
        </select>

        {tripType === "ROUND_TRIP" && (
          <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
        )}

        <span>
          No of passngr  : <input
          placeholder="No of psg"
          type="number"
          min={1}
          value={passengers}
          onChange={e => setPassengers(Number(e.target.value))}
        />
        </span>

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
          <option value="MORNING">Morning (5–12)</option>
          <option value="AFTERNOON">Afternoon (12–17)</option>
          <option value="EVENING">Evening (17–21)</option>
          <option value="NIGHT">Night (21–5)</option>
        </select>

        <button onClick={handleSearch}>Search Flights</button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {hasSearched && flights.length === 0 && (
        <p style={{ color: "gray", marginTop: 20 }}>
          No matching flights found. Please try changing your filters.
        </p>
      )}

      {flights.map(f => (
        <div key={f.flightKey} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <p>Aitline : <strong> {f.airline}</strong></p>
          <p>Stops: {f.stops}</p>
          <p>Departure: {formatDateTime(f.departureTime)}</p>
          <p>Arrival: {formatDateTime(f.arrivalTime)}</p>
          <p>Price: ₹{f.lowestPrice} (per passenger)</p>
          <p>total: ₹{f.lowestPrice * passengers}</p>
          <p>duration: {Math.floor(f.durationInMin / 60)}h {f.durationInMin % 60}m</p>
          <button style={{color:'blue'}} onClick={() => handleSelect(f)}>Select</button>
        </div>
      ))}
    </div>
  );
}
