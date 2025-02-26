const Razorpay = require("razorpay");
const crypto = require("crypto"); // Added import
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generatePayment = async (req, res) => {
  const userId = req.id;

  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount provided",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: Math.random().toString(36).substring(2),
    };

    const order = await instance.orders.create(options); // Use promise-based call
    return res.status(200).json({
      success: true,
      data: { ...order, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const userId = req.id;

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature, // Add this to req.body
      amount,
      productArray,
      address,
    } = req.body;

    // Generate expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify signature
    const isValid = generatedSignature === razorpay_signature;
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Optional: Verify amount by fetching order details
    const orderDetails = await instance.orders.fetch(razorpay_order_id);
    if (orderDetails.amount !== amount * 100) {
      return res.status(400).json({
        success: false,
        message: "Amount mismatch",
      });
    }

    // Check stock availability
    for (const product of productArray) {
      const productDoc = await Product.findById(product.id);
      if (!productDoc || productDoc.stock < product.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.id}`,
        });
      }
    }

    // Update user purchases and product stock
    for (const product of productArray) {
      await User.findByIdAndUpdate(
        userId,
        { $push: { purchasedProducts: product.id } }
      );
      await Product.findByIdAndUpdate(product.id, {
        $inc: { stock: -product.quantity },
      });
    }

    // Create order
    await Order.create({
      amount: amount, // Store in rupees
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentID: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      products: productArray,
      address: address,
      userId: userId,
    });

    return res.status(200).json({ success: true, message: "Payment verified" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { generatePayment, verifyPayment };