"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const bookingId = params.get("bookingId");

  return (
    <div>
      <h1>Booking Confirmed</h1>
      <p>Your Booking ID:</p>
      <strong>{bookingId}</strong>
    </div>
  );
}
