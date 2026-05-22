import express from "express";
import {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addAddress);
router.get("/get", protect, getAddress);
router.put("/update/:addressId", protect, updateAddress);
router.delete("/delete/:addressId", protect, deleteAddress);
router.patch("/default/:addressId", protect, setDefaultAddress);

export default router;