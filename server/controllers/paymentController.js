const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

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

    const options = {
      amount: amount,
      currency: "INR",
      receipt: Math.random().toString(36).substring(2),
    };

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    instance.orders.create(options, async (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ sucess: false, message: err });
      }

      return res.status(200).json({
        success: true,
        data: { ...order, name: user.name },
      });
    });
  } catch (error) {
    console.error("Generate Payment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const userId = req.id;

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      productArray,
      address,
    } = req.body;

    // Generate expected signature
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const validatePayment = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      signature,
      process.env.RAZORPAY_KEY_SECRET
    );

    if (!validatePayment){
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Check stock availability
    for (const product of productArray) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { purchasedProducts: product.id } }
      );

      await Product.findByIdAndUpdate(
        { _id: product.id },
        { $inc: { stock: -product.quantity } }
      );
    }

    // Create order
    await Order.create({
      amount: amount, // Store in rupees
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentID: razorpay_payment_id,
      razorpaySignature: signature,
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
