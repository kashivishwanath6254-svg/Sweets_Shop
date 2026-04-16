import { Cart } from "../models/cart.models.js";

export const addToCart = async (req, res, next) => {
  try {
    // 1. get userId
    const userId = req.user.id;
    // 2. get productId
    const { productId } = req.body;
    // 3. find cart
    let cart = await Cart.findOne({ user: userId });
    // 4. if no cart → create one
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
      await cart.save();
      return res.status(201).json(cart);
    }
    // 5. if exists → check product in items
    const existingProduct = cart.items.find((item) =>
      item.product.equals(productId)
    );
    // 6. update or push item
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }
    // 7. save cart
    await cart.save();
    await cart.populate("items.product");
    // 8. send response
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    await cart.populate("items.product");
    return res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingProduct = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (!existingProduct) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((item) => !item.product.equals(productId));
    } else {
      existingProduct.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemExists = cart.items.some((item) =>
      item.product.equals(productId)
    );

    if (!itemExists) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    cart.items = cart.items.filter((item) => !item.product.equals(productId));

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
