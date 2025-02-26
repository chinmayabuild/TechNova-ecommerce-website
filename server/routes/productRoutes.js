const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByName,
  blacklistProduct,
  removeFromBlacklist,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const { verify } = require("jsonwebtoken");

router.post(
  "/create-product",
  verifyToken,
  upload.array("images", 4),
  createProduct
);

router.put("/update-product/:id", verifyToken, updateProduct);
router.delete("/delete-product/:id", verifyToken, deleteProduct);
router.get("/get-products", getProducts);
router.get("/get-product-by-name/:name", getProductByName);
router.put("/backlist-product/:id", verifyToken, blacklistProduct);
router.put("/remove-from-blacklist/:id", verifyToken, removeFromBlacklist);

module.exports = router;
