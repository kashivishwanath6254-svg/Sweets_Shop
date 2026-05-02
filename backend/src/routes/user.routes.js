import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changePassword,
} from "../controllers/authController.js";
import { protect } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getCurrentUser);
router.patch("/updateProfile", protect, updateProfile);
router.patch("/changePassword", protect, changePassword);
export default router;
