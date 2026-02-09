import { Suspense } from "react";
import TravellerClient from "./TravellerClient";

export default function TravellerPage() {
  return (
    <Suspense fallback={<div>Loading traveller form...</div>}>
      <TravellerClient />
    </Suspense>
  );
}
