const {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  replyReview,
} = require("../controllers/ReviewController");

const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

router.post("/create-review", verifyToken, createReview);

router.put("/update-review/:id", verifyToken, updateReview);

router.delete("/delete-review/:id", verifyToken, deleteReview);

router.get("/get-reviews/:id", getReviews);

router.put("/reply-review/:id", replyReview);

module.exports = router;
