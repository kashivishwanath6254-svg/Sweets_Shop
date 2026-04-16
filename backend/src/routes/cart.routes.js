import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeItem,
  updateQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/get", protect, getCart);
router.put("/update", protect, updateQuantity);
router.delete("/clear", protect, clearCart);
router.delete("/remove/:productId", protect, removeItem);

export default router;
