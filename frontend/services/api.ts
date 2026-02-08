const API_BASE = "http://localhost:4000/api";

export const searchFlights = async (payload: any) => {
  console.log("API payload", payload);
  const res = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  console.log('search response' , data );
  return data;
};

export const selectFlight = async (payload: any) => {
  const res = await fetch(`${API_BASE}/flight/select`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const createBooking = async (payload: any) => {
  const res = await fetch(`${API_BASE}/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
};
