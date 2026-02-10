import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminProductController.js";
import {
  validateProduct,
  validateProductId,
} from "../middlewares/validation.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

//GET: Fetch all products
router.get("/", protect, adminOnly, getAllProducts);

//POST: Add new products
router.post("/", protect, adminOnly, validateProduct, createProduct);

//PUT: Edit a product
router.put(
  "/:id",
  protect,
  adminOnly,
  validateProductId,
  validateProduct,
  updateProduct
);

//DELETE: Remove a product
router.delete("/:id", protect, adminOnly, validateProductId, deleteProduct);

export default router;
