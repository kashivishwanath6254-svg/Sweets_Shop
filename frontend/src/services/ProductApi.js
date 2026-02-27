// src/services/ProductApi.js
import { BASE_URL } from "../constants/constants.js";



export const ProductApi = {
  getProducts: async () => {
    //Get all products
    const response = await fetch(BASE_URL, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  },

  addProduct: async (product) => {
    //Add a new product
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(product),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const savedProduct = await response.json();
    return savedProduct;
  },

  updateProduct: async (id, updates) => {
    //Update a product
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updates),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    const updatedProduct = await response.json();
    return updatedProduct;
  },

  deleteProduct: async (id) => {
    //Delete a product
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    const deletedProduct = await response.json();
    return deletedProduct;
  },
};
