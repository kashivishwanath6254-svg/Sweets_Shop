import { Order } from "../models/order.models.js";
import { Product } from "../models/products.models.js";
import { canTransitionOrderStatus } from "../services/order.service.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    next(error);
  }
}

export const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const { status: newStatus } = req.body;
    const updatedStatus = newStatus.toUpperCase();

    if (!updatedStatus) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const currentStatus = order.orderStatus;

    //block final states
    if (["DELIVERED", "CANCELLED"].includes(currentStatus)) {
      return res.status(400).json({
        message: `Cannot update a ${currentStatus} order`,
      })
    }

    //validate transition 
    const isValid = canTransitionOrderStatus(currentStatus, updatedStatus);

    if (!isValid) {
      return res.status(400).json({
        message: `Invalid transition: ${currentStatus} -> ${updatedStatus}`,
      })
    }

    if (updatedStatus === "CANCELLED") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: { stock: item.quantity },
          }
        )
      }
    }

    //Update Order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: { orderStatus: updatedStatus }
      },
      {
        new: true,
      }
    )

    return res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    next(error);
  }
}
