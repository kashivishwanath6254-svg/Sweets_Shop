import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);

export default router;
