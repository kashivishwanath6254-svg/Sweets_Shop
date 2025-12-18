import express from "express";
import { Product } from "../models/products.models.js";

const router = express.Router();

//GET: Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: error.message });
  }
});

//POST: Add new products
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: error.message });
  }
});

//PUT: Edit a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: error.message });
  }
});

//DELETE: Remove a product
router.put("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;