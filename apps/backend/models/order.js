import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [{ productId: String, qty: Number }],
  total: Number,
  customer: {
    name: String,
    email: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
