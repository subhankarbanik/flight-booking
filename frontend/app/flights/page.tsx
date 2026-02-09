import { Suspense } from "react";
import FlightsClient from "./FlightsClient";

export default function FlightsPage() {
  return (
    <Suspense fallback={<div>Loading flights...</div>}>
      <FlightsClient />
    </Suspense>
  );
}
