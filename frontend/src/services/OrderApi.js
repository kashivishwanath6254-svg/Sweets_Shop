import API_BASE_URL from "../config/api.js";

const BASE_URL = `${API_BASE_URL}/api/orders`;

export const OrderApi = {
  placeOrder: async ({ shippingAddress, paymentMethod }) => {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ shippingAddress, paymentMethod }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }

    return data;
  },

  getMyOrders: async () => {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data;
  },

  getOrderById: async (orderId) => {
    const response = await fetch(`${BASE_URL}/${orderId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data;
  },

  cancelOrder: async (orderId) => {
    const response = await fetch(`${BASE_URL}/cancel/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data;
  },
};
