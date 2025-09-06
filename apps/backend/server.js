require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const productsRouter = require('./routes/products');
const paymentsRouter = require('./routes/payments');

const app = express();
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // React app URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/payments', paymentsRouter);

// Simple checkout endpoint to log & return order id
app.post('/api/checkout', (req, res) => {
  const order = req.body;
  console.log('Checkout order logged:', JSON.stringify(order, null, 2));
  res.json({ orderId: `EF-${Date.now()}` });
});

// Serve a health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
  if (!process.env.STRIPE_SECRET_KEY) console.log('Stripe not configured — STRIPE_SECRET_KEY missing in env.');
  if (!process.env.PAYTM_MID || !process.env.PAYTM_KEY) console.log('PayTM not configured — PAYTM_MID/PAYTM_KEY missing in env.');
});
