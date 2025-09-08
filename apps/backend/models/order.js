// // // /app/models/order.js
// // const mongoose = require("mongoose");

// // const orderSchema = new mongoose.Schema({
// //   customer: {
// //     name: String,
// //     email: String,
// //   },
// //   total: Number,
// //   products: [
// //     {
// //       productId: String,
// //       quantity: Number,
// //       price: Number,
// //     },
// //   ],
// //   createdAt: { type: Date, default: Date.now },
// // });

// // module.exports = mongoose.model("Order", orderSchema);
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   user: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//   },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   totalPrice: { type: Number, required: true },
//   shippingAddress: {
//     address: String,
//     city: String,
//     postalCode: String,
//     country: String,
//   },
//   paymentStatus: { type: String, default: "Pending" },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },  // changed to string
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String },
  image: { type: String },
  model3d: { type: String },
  model3d_ios: { type: String, default: "" },
  description: { type: String },
});

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    city: { type: String },
    pincode: { type: String },
    provider: { type: String, default: "cod" },
    coupon: { type: String, default: "" },
  },
  products: { type: [ProductSchema], required: true },
  total: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
