import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { shippingAddress, paymentMethod } = req.body;

    const isAddressIncomplete = Object.values(shippingAddress).some(
      (value) => !value?.trim()
    );

    if (isAddressIncomplete) {
      return res
        .status(400)
        .json({ message: "Please provide complete shipping details" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee = subtotal > 500 ? 0 : 50;

    const tax = subtotal * 0.05;

    const totalAmount = subtotal + deliveryFee + tax;

    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress,
      subtotal,
      deliveryFee,
      tax,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
    });

    cart.items = [];

    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
