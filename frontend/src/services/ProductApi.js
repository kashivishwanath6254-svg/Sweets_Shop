// src/services/ProductApi.js
import { BASE_URL } from "../constants/constants.js";

export const ProductApi = {
  getProducts: async () => {
    const response = await fetch(BASE_URL); //fetch the info from the admin routes in backend
    if (!response.ok) {
      throw new Error("Failed to fetch products!"); //Throw stops execution and signals an exception
    }
    const data = await response.json(); //convert the fetched info to useable js object
    return data; //return the object
  },

  addProduct: async (product) => {
    //product is an js object containing info about the product to be added
    const response = await fetch(BASE_URL, {
      //fetch the info
      method: "POST", //tell what to do with the info
      headers: { "Content-type": "application/json" }, //what type of info we will be dealing with
      body: JSON.stringify(product), //convert the info to json
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const savedProduct = await response.json();
    return savedProduct;
  },

  updateProduct: async (id, updates) => {
    //id contains the id of product to be updated and updates contain the info to be updated
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
