

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true },
    searchId: { type: String, required: true },
    selectedFlightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SelectedFlight",
      required: true
    },
    traveller: {
      name: String,
      email: String,
      phone: String,
      dob: String,
      gender: String,
      passport: String
    },
    finalPrice: { type: Number, required: true },
    status: { type: String, default: "CONFIRMED" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
