
# Flight Search & Booking App

A simple full-stack flight search and booking flow built using a static flight dataset.
Focus is on correct flow, API design, and data handling.

---

## Flow
1. User searches flights (/flights)
2. Matching flights are shown
3. User selects a flight
4. Redirect to /traveller
5. Traveller details submitted
6. Booking is created and confirmed

---

## Features Implemented

### Flight Search
- Source & Destination
- Departure date
- One-way / Round-trip (round-trip blocked with message)
- Passenger count
- Price range filter
- Stops filter (0 / 1 / 2+)
- Departure time range

Flights are filtered from the provided static JSON dataset.
Each search generates a unique searchId and is stored in DB.

### Flight Results
Each flight shows:
- Airline
- Flight number(s)
- Departure & arrival time
- Duration
- Stops
- Price per passenger
- Total price (passengers × fare)
- Select button

---

### Select Flight
POST /api/flight/select
- Stores selected flight using searchId, flightKey and fareId
- Saves full flight JSON, selected fare, and locks price

---

### Traveller Details
Form fields:
- Name
- Email
- Phone
- DOB
- Gender
- Passport (optional)

---

### Booking
POST /api/booking
- Attaches traveller to selected flight
- Uses locked price
- Generates bookingId
- Saves booking with CONFIRMED status

---

## Tech Stack
Frontend: Next.js, React, TypeScript  
Backend: Node.js, Express, TypeScript  
Database: MongoDB (Mongoose)

---

## Limitations
- No round-trip support (dataset limitation)
- No authentication
- No seat selection or add-ons
- No payment gateway
- Static flight data only

---

## Notes
- Price is locked at flight selection
- Passenger count affects total price only
- Designed to match assignment flow, not production scale
