

import SelectedFlight from "../models/SelectedFlight";
import Booking from "../models/Booking";

export const handleBooking = async (payload: any) => {
  const { searchId, traveller } = payload;

  if (
    !traveller?.name ||
    !traveller?.email ||
    !traveller?.phone ||
    !traveller?.dob ||
    !traveller?.gender
  ) {
    throw new Error("Missing traveller details");
  }

  const selected = await SelectedFlight.findOne({ searchId });
  if (!selected) throw new Error("No flight selected");

  const bookingId = `BK-${Date.now()}`;

  const booking = await Booking.create({
    bookingId,
    searchId,
    selectedFlightId: selected._id,
    traveller,
    finalPrice: selected.priceLocked,
    status: "CONFIRMED"
  });

  return {
    bookingId: booking.bookingId,
    pricePaid: booking.finalPrice,
    traveller: booking.traveller,
    status: booking.status
  };
};
