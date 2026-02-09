# Flight Search & Booking App

This is a simple full-stack flight search and booking app built as part of an assignment.  
Main focus is on flow, APIs and data handling, not UI perfection.

---

## Live App
Frontend deployed on **Vercel**  (https://flight-booking-pi-eight.vercel.app/)
Backend deployed on **Render**   (https://flight-booking-mlmp.onrender.com)
Database used: **MongoDB Atlas**

---

## App Flow
1. User searches flights
2. Flight list is shown
3. User selects a flight
4. Redirects to `/traveller`
5. Traveller details filled
6. Booking is created
7. Confirmation page shows booking ID

---

## Features Done

### Flight Search
- From & To city
- Departure date
- One way / Round trip (round trip blocked due to dataset)
- Passenger count
- Price range filter
- Stops filter (0 / 1 / 2+)
- Departure time filter

Flights are filtered from given static JSON data and stored with a unique `searchId`.

---

### Flight Selection
- Selected flight is saved using `searchId`
- Fare is locked
- Full flight JSON is stored

---

### Traveller Form
- Name
- Email
- Phone
- DOB
- Gender
- Passport (optional)

---

### Booking
- Traveller attached to selected flight
- Locked price used
- Booking ID generated
- Status saved as CONFIRMED

---

## Tech Used
Frontend: Next.js, React, TypeScript  
Backend: Node.js, Express, TypeScript  
DB: MongoDB (Mongoose)

---

## Limitations
- No round trip booking
- No login or auth
- No payment gateway
- Static flight data only
- Filter based on departure date is not fully applied due to data restriction

---

## Notes
- Price is locked at flight selection
- Passenger count affects total price
- Built as per assignment flow
