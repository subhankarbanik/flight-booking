"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createBooking } from "@/services/api";

export default function TravellerClient() {
  const params = useSearchParams();
  const searchId = params.get("searchId");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    passport: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!searchId) {
      alert("Invalid search");
      return;
    }

    const { name, email, phone, dob, gender } = form;

    if (!name || !email || !phone || !dob || !gender) {
      alert("All required fields must be filled");
      return;
    }

    try {
      const res = await createBooking({
        searchId,
        traveller: form
      });

      router.push(`/confirmation?bookingId=${res.bookingId}`);
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Traveller Details</h2>

      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="date" name="dob" onChange={handleChange} />

      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>

      <input
        name="passport"
        placeholder="Passport Number (optional)"
        onChange={handleChange}
      />

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
