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
} from "../middlewares/validation.js";

const router = express.Router();

//GET: Fetch all products
router.get("/", getAllProducts);

//POST: Add new products
router.post("/", validateProduct, createProduct);

//PUT: Edit a product
router.put("/:id", validateProductId, validateProduct, updateProduct);

//DELETE: Remove a product
router.delete("/:id", validateProductId, deleteProduct);

export default router;
