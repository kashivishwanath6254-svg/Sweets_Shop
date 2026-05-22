import API_BASE_URL from "../config/api.js";

const BASE_URL = `${API_BASE_URL}/api/address`;

export const AddressApi = {
  getAddresses: async () => {
    const response = await fetch(`${BASE_URL}/get`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }
    const data = await response.json();
    return data;
  },

  addAddress: async (address) => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(address),
    });
    if (!response.ok) {
      throw new Error("Failed to add address");
    }
    const data = await response.json();
    return data;
  },

  updateAddress: async (addressId, updates) => {
    const response = await fetch(`${BASE_URL}/update/${addressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Failed to update address");
    }
    const data = await response.json();
    return data;
  },

  deleteAddress: async (addressId) => {
    const response = await fetch(`${BASE_URL}/delete/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to remove address");
    }
    const data = await response.json();
    return data;
  },

  setDefaultAddress: async (addressId) => {
    const response = await fetch(`${BASE_URL}/default/${addressId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to set to default");
    }
    const data = await response.json();
    return data;
  },
};
