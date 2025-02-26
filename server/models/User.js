const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(  // ✅ Use 'new' for clarity
  {
    name: {
      type: String,
      required: true,
      trim: true, // ✅ Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // ✅ Ensures case-insensitive email storage
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    otp: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    purchasedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }  // ✅ Fixed key (plural)
);

const User = mongoose.model("User", userSchema);

module.exports = User;
