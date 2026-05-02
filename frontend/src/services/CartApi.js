import API_BASE_URL from "../config/api.js"

const BASE_URL = `${API_BASE_URL}/api/cart`;

export const CartApi = {
  getCart: async () => {
    const response = await fetch(`${BASE_URL}/get`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    const data = await response.json();
    return data;
  },

  addToCart: async (productId) => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }
    const data = await response.json();
    return data;
  },

  updateQuantity: async (productId, quantity) => {
    const response = await fetch(`${BASE_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart");
    }
    const data = await response.json();
    return data;
  },

  removeItem: async (productId) => {
    const response = await fetch(`${BASE_URL}/remove/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to remove item");
    }
    const data = await response.json();
    return data;
  },

  clearCart: async () => {
    const response = await fetch(`${BASE_URL}/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }
    const data = await response.json();
    return data;
  },
};
