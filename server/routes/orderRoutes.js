const router = require("express").Router();

const { getOrderByUserId, getAllOrders, getMetrics, updateOrderStatus } = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");
const veryfyToken = require("../middlewares/verifyToken");

router.get("/get-orders-by-user-id", veryfyToken, getOrderByUserId);

router.get("/get-all-orders", veryfyToken, getAllOrders);

router.get("/get-metrics", verifyToken, getMetrics)

router.put("/update-order-status/:paymentId", verifyToken, updateOrderStatus);



module.exports = router;