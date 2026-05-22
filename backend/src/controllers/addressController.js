import mongoose from "mongoose";
import { Address } from "../models/address.models.js";

export const addAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      phone,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault,
      label,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !postalCode ||
      !country ||
      !label
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isDefault) {
      await Address.updateMany(
        { user: userId, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.create({
      user: userId,
      fullName,
      phone,
      street,
      city,
      state,
      postalCode,
      country,
      isDefault,
      label,
    });

    return res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.find({ user: userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return res.status(201).json(addresses);
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { isDefault } = req.body;
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        message: "Invalid address ID",
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { user: userId, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        user: userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json(updatedAddress);
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        message: "Invalid address ID",
      });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    return res.status(200).json({ message: "Address deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

export const setDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        message: "Invalid address ID",
      });
    }

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    await Address.updateMany(
      { user: userId, isDefault: true },
      { $set: { isDefault: false } }
    );

    address.isDefault = true;

    await address.save();

    return res.status(200).json({
      message: "Default address updated successfully",
      address,
    });
  } catch (error) {
    next(error);
  }
};