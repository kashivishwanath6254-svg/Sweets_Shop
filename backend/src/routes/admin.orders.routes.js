import express from "express";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();
router.use(protect);
router.use(adminOnly);

router.get("/", getAllOrders);
router.patch("/status/:orderId", updateOrderStatus);

export default router;
