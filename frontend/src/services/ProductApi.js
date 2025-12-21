// src/services/ProductApi.js
import { BASE_URL } from "../constants/constants";

export const ProductApi = {
  getProducts: async () => {
    const response = await fetch(BASE_URL);

    const data = await response.json();
    return data;
  },

  addProduct: async (product) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const savedProduct = await response.json();
    return savedProduct;
  },

  updateProduct: async (id, updates) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    const updatedProduct = await response.json();
    return updatedProduct;
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    const deletedProduct = await response.json();
    return deletedProduct;
  },
};
