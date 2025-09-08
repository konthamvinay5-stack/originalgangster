const Order = require("../models/order.js");

export const createOrder = async (req, res) => {
  try {
    const { user, products, totalPrice, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    const newOrder = new Order({
      user,
      products,
      totalPrice,
      shippingAddress,
      paymentStatus: "Paid", // Change this to "Pending" if payment not confirmed yet
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Order creation failed", error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
