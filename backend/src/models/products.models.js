import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, min: 1 },
    image: { type: String, default: "" },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true, trim: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
