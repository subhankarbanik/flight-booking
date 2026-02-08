"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createBooking } from "@/services/api";

export default function TravellerPage() {
  const params = useSearchParams();
  const searchId = params.get("searchId");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!searchId) {
      alert("Invalid search");
      return;
    }

    const res = await createBooking({
      searchId,
      traveller: form
    });

    router.push(`/confirmation?bookingId=${res.bookingId}`);
  };

  return (
    <div>
      <h2>Traveller Details</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
