import mongoose from "mongoose";

const SelectedFlightSchema = new mongoose.Schema(
  {
    searchId: { type: String, required: true },
    flightKey: { type: String, required: true },
    fareId: { type: String, required: true },
    flightData: { type: Object, required: true },
    fare: { type: Object, required: true },
    priceLocked: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("SelectedFlight", SelectedFlightSchema);
