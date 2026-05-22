import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import ClearCartModal from "../components/cart/ClearCartModal";
import Button from "../components/ui/Button";

function Cart() {
  const { cart, loading, error, updateQuantity, removeItem, clearCart } =
    useCart();
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <span className="text-6xl mb-4 block">⚠️</span>
          <h3 className="text-xl font-bold text-red-600 mb-2">
            Error Loading Cart
          </h3>
          <p className="text-red-500">{error}</p>
          <Button variant="danger" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-3xl font-bold text-amber-800 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-amber-600 mb-8">
            Looks like you haven't added any sweets to your cart yet.
          </p>
          <Button variant="primary" fullWidth onClick={() => navigate("/products")}>
            <span>🍬</span>
            Browse Our Sweets
            <span>→</span>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingItemId(productId);
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error(error);
      alert("Failed to update cart");
    }
    setUpdatingItemId(null);
  };

  const handleRemoveItem = async (productId) => {
    if (window.confirm("Remove this item from your cart?")) {
      try {
        await removeItem(productId);
      } catch (error) {
        console.error(error);
        alert("Failed to remove item");
      }
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setShowClearConfirm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to clear cart");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-amber-400 rounded-full"></div>
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-4">
            Your Cart
          </h1>
          <p className="text-lg text-amber-600/80">
            Review and manage your selected items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Items Header */}
            <div className="bg-white rounded-xl p-4 border border-amber-200 hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-amber-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Cart Items List */}
            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                isUpdating={updatingItemId}
              />
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-between items-center pt-4">
          <Button
            onClick={() => setShowClearConfirm(true)}
            variant="dangerOutline"
            className="flex items-center gap-2"
          >
            <span>🗑️</span>
            Clear Cart
          </Button>
          <Button
            onClick={() => navigate("/products")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <span>←</span>
            Continue Shopping
          </Button>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
              onCheckout={() => navigate("/checkout")}
            />
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <ClearCartModal
          onConfirm={handleClearCart}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}

export default Cart;
