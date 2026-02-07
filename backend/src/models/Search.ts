import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema(
  {
    searchId: { type: String, required: true, index: true },
    payload: { type: Object, required: true },
    result: { type: Object, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Search", SearchSchema);
