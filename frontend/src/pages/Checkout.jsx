import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const { cart, loading, error, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-600 text-lg">Loading checkout...</p>
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
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
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
            Add some sweets to your cart before checkout.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <span>🍬</span>
            Browse Our Sweets
            <span>→</span>
          </button>
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

  const handlePlaceOrder = async () => {
    if (!address || !city || !zipCode || !phone) {
      alert("Please fill in all delivery details");
      return;
    }

    setIsPlacingOrder(true);
    try {
      // Simulate order creation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Clear cart after successful order
      await clearCart();
      
      alert("Order placed successfully! 🎉");
      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    } finally {
      setIsPlacingOrder(false);
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
            Checkout
          </h1>
          <p className="text-lg text-amber-600/80">
            Complete your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Details - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">
                Delivery Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="400001"
                      className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6 pb-2 border-b border-amber-200">
                Order Items
              </h2>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center justify-between py-3 border-b border-amber-100 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍬</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-amber-800">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-amber-600">
                          Qty: {item.quantity} × ₹{item.product.price}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-amber-800">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-amber-800 mb-4 pb-2 border-b border-amber-200">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t-2 border-amber-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-amber-800">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full py-4 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full mt-4 py-3 border border-amber-300 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
