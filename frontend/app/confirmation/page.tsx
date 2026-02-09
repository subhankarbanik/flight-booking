"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useSearchParams();

  return (
    <div style={{ padding: 20 }}>
      <h2>Booking Confirmed ,YAY</h2>
      <p>Booking ID: {params.get("bookingId")}</p>
      <p>Status: CONFIRMED</p>
    </div>
  );
}
