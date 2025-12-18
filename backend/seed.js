import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "./src/models/products.models.js";
import fs from "fs";

dotenv.config();

const productData = JSON.parse(
  fs.readFileSync("./src/json/products.json", "utf-8")
);

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    //Clear old data
    await Product.deleteMany();
    console.log("Old data removed");

    //Inserting new data
    await Product.insertMany(productData);
    console.log("New data inserted");

    //Stop script
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
}

seedData();
