import { API_ENDPOINTS } from "../config/api";

const BASE_URL = `${API_ENDPOINTS.ADMIN}/orders`;

export const AdminOrderApi = {
  getAllOrders: async () => {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    const data = response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch all orders");
    }

    return data;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    const response = await fetch(`${BASE_URL}/status/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus })
    })

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update status");
    }

    return data;
  }
}
