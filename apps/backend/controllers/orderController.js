// const Order = require("../models/order.js");

// export const createOrder = async (req, res) => {
//   try {
//     const { user, products, totalPrice, shippingAddress } = req.body;

//     if (!products || products.length === 0) {
//       return res.status(400).json({ message: "No products in the order" });
//     }

//     const newOrder = new Order({
//       user,
//       products,
//       totalPrice,
//       shippingAddress,
//       paymentStatus: "Paid", // Change this to "Pending" if payment not confirmed yet
//     });

//     await newOrder.save();

//     res.status(201).json({
//       message: "Order created successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error("Order creation error:", error);
//     res.status(500).json({ message: "Order creation failed", error });
//   }
// };

// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Get orders error:", error);
//     res.status(500).json({ message: "Failed to fetch orders", error });
//   }
// };
const Order = require("../models/order");
const nodemailer = require("nodemailer");

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createOrder = async (req, res) => {
  console.log("🔹 Checkout request body:", req.body);

  const { user, products, totalPrice, shippingAddress } = req.body;

  // Basic validation
  if (!products || products.length === 0 || !totalPrice || !shippingAddress) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const order = new Order({
      user,
      products,
      totalPrice,
      shippingAddress,
      paymentStatus: "Paid", // or "Pending" depending on your flow
    });

    await order.save();
    console.log("🛒 New Order Saved:", order);

    // Send notification email (optional)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFY_TO,
        subject: `🛒 New Order EF-${order._id}`,
        text: `New order received!\n\nCustomer: ${user}\nTotal: $${totalPrice}`,
      });
      console.log("📧 Notification email sent");
    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr);
    }

    res.status(201).json({ orderId: `EF-${order._id}` });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ message: "Failed to process order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Get orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
