import express from "express";
import { getProductsGroupedByCategory } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProductsGroupedByCategory);

export default router;
