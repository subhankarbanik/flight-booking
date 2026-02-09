"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <div>
      <h2>Booking Confirmed</h2>
      <p>Booking ID: {bookingId}</p>
    </div>
  );
}
