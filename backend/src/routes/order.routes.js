import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.post("/", createOrder).get("/", getMyOrders);
router.get("/:orderId", getOrderById);
router.patch("/cancel/:orderId", cancelOrder);

export default router;
