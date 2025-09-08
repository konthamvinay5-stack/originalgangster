// /app/models/order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
  },
  total: Number,
  products: [
    {
      productId: String,
      quantity: Number,
      price: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
