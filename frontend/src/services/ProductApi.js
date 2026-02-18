// src/services/ProductApi.js
import { BASE_URL } from "../constants/constants.js";

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const ProductApi = {
  getProducts: async () => {
    //Get all products
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
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
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
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
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    const deletedProduct = await response.json();
    return deletedProduct;
  },
};
