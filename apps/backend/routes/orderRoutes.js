const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

// POST /api/checkout - create a new order
router.post("/checkout", createOrder);

// GET /api/orders - fetch all orders (admin)
router.get("/orders", getOrders);

module.exports = router;
