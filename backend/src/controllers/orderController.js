import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";
import { Product } from "../models/products.models.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: "No address found" });
    }

    const isAddressIncomplete = Object.values(shippingAddress).some(
      (value) => !value?.trim()
    );

    if (isAddressIncomplete) {
      return res
        .status(400)
        .json({ message: "Please provide complete shipping details" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(400).json({
          message: "No products found",
        });
      }

      if (!product.isAvailable) {
        return res.status(400).json({
          message: `${product.name} is currently unavailable`,
        });
      }
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

    const tax = Number((subtotal * 0.05).toFixed(2));

    const totalAmount = Number((subtotal + deliveryFee + tax).toFixed(2));

    for (const item of cart.items) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product._id,

          //only update if enough stock exists
          stock: { $gte: item.quantity },
          isAvailable: true,
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        {
          new: true,
        }
      );

      if (!updatedProduct) {
        return res.status(400).json({
          message: `Only ${item.product.stock} units available for ${item.product.name}`,
        });
      }

      if (updatedProduct.stock === 0) {
        updatedProduct.isAvailable = false;
        await updatedProduct.save();
      }
    }

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

    await Cart.findByIdAndUpdate(cart._id, {
      $set: { items: [] },
    });


    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product");

    const message =
      orders.length === 0 ? "No orders found" : "Orders fetched successfully";

    return res.status(200).json({
      message,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).populate("items.product");

    //Order not found
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    //OwnerShip check
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access to order" });
    }

    return res
      .status(200)
      .json({ message: "Order fetched successfully", order });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).populate("items.product");

    //Order not found
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    //OwnerShip check
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access to order" });
    }

    //Checking if order can be cancelled
    if (order.orderStatus !== "PLACED" && order.orderStatus !== "CONFIRMED") {
      return res.status(400).json({
        message: "Order cannot be cancelled!",
      });
    }

    //Restoring stock
    for (const item of order.items) {
      if (!item.product) continue;

      item.product.stock += item.quantity;

      if (item.product.stock > 0) {
        item.product.isAvailable = true;
      }

      await item.product.save();
    }

    order.orderStatus = "CANCELLED";
    await order.save();

    return res.status(200).json({
      message: "Order canceled successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
