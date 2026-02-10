import dotenv from "dotenv";
import connectDB from "../db/db.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@sweets.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      profileName: "Admin",
      email: "admin@sweets.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully:");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: admin123`);
    console.log(`Role: ${admin.role}`);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
