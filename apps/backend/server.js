// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const productsRouter = require('./routes/products');
// const paymentsRouter = require('./routes/payments');

// const app = express();
// // app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000", // React app URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/products', productsRouter);
// app.use('/api/payments', paymentsRouter);

// // Simple checkout endpoint to log & return order id
// app.post('/api/checkout', (req, res) => {
//   const order = req.body;
//   console.log('Checkout order logged:', JSON.stringify(order, null, 2));
//   res.json({ orderId: `EF-${Date.now()}` });
// });

// // Serve a health endpoint
// app.get('/health', (req, res) => res.json({ status: 'ok' }));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Backend listening on http://localhost:${PORT}`);
//   if (!process.env.STRIPE_SECRET_KEY) console.log('Stripe not configured — STRIPE_SECRET_KEY missing in env.');
//   if (!process.env.PAYTM_MID || !process.env.PAYTM_KEY) console.log('PayTM not configured — PAYTM_MID/PAYTM_KEY missing in env.');
// });
// require("dotenv").config();

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Order = require("./models/order");

const productsRouter = require("./routes/products");
const paymentsRouter = require("./routes/payments");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB connection error:", err));
// mongoose.connect("mongodb://localhost:27017/errorfit", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))


// ✅ Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Routes
app.use("/api/products", productsRouter);
app.use("/api/payments", paymentsRouter);

// ✅ Checkout API (saves + notifies)
app.post("/api/checkout", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    console.log("🛒 New Order Saved:", order);

    // Send notification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_TO,
      subject: `🛒 New Order EF-${order._id}`,
      text: `New order received!\n\nCustomer: ${order.customer?.name}\nEmail: ${order.customer?.email}\nTotal: $${order.total}`,
    });

    res.json({ orderId: `EF-${order._id}` });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ message: "Failed to process order" });
  }
});

// ✅ Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
