const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true, // ✅ Fixed typo
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId, // ✅ Fixed typo
      ref: "Product",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // ✅ Ensures rating is at least 1
      max: 5, // ✅ Ensures rating is at most 5
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    replies: [replySchema], // ✅ Stores replies to a review
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
