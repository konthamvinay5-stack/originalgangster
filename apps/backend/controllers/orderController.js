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

  const { customer, items, total } = req.body;

  // Basic validation
  if (!customer || !items || items.length === 0 || !total || !customer.address) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Map frontend fields to Order schema
    const mappedProducts = items.map(item => ({
      productId: item.productId.toString(), // convert to string/ObjectId as needed
      name: item.name,
      price: item.price,
      size: item.size,
      quantity: item.qty, // map qty -> quantity
      image: item.image,
      model3d: item.model3d,
      model3d_ios: item.model3d_ios || "",
      description: item.description,
    }));

    const order = new Order({
      user: customer,
      products: mappedProducts,
      totalPrice: total,
      shippingAddress: customer.address,
      paymentStatus: "Paid", // change to "Pending" if payment not confirmed
    });

    await order.save();
    console.log("🛒 New Order Saved:", order);

    // Send notification email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFY_TO,
        subject: `🛒 New Order EF-${order._id}`,
        text: `New order received!\n\nCustomer: ${customer.name}\nEmail: ${customer.email}\nTotal: $${total}`,
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
