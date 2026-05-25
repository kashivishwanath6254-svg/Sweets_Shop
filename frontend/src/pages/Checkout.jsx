import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddressApi } from "../services/AddressApi.js";
import { OrderApi } from "../services/OrderApi.js";
import Button from "../components/ui/Button";

function Checkout() {
  const { cart, loading, error } = useCart();
  const navigate = useNavigate();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [placeOrderError, setPlaceOrderError] = useState(null);

  const updateShippingAddress = (field, value) => {
    setSelectedAddressId(null);
    setPlaceOrderError(null);

    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const populateShippingAddress = (address) => {
    setShippingAddress({
      fullName: address.fullName || "",
      phone: address.phone || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      country: address.country || "",
    });
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await AddressApi.getAddresses();
        const addresses = data || [];
        setSavedAddresses(addresses);

        const defaultAddress = addresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
          populateShippingAddress(defaultAddress);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

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
            Add some sweets to your cart before checkout.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate("/products")}
          >
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
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + deliveryFee + tax).toFixed(2));

  const handlePlaceOrder = async () => {
    // Reset error
    setPlaceOrderError(null);

    // Safer address validation with optional chaining
    const isAddressIncomplete = Object.values(shippingAddress).some(
      (value) => !value?.trim(),
    );

    if (isAddressIncomplete) {
      setPlaceOrderError("Please fill in all delivery details");
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Actual API call to create order
      const response = await OrderApi.placeOrder({
        shippingAddress,
        paymentMethod,
      });

      // Navigate to order confirmation page
      navigate(`/orders/${response.order._id}`, {
        replace: true,
      });

    } catch (error) {
      console.error("Order placement failed:", error);
      setPlaceOrderError(
        error.message || "Failed to place order. Please try again.",
      );
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
          <p className="text-lg text-amber-600/80">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Addresses Section */}
            {!isLoadingAddresses && savedAddresses.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-amber-200">
                  <span className="text-2xl">📍</span>
                  <h2 className="text-2xl font-bold text-amber-800">
                    Saved Addresses
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map((addr) => (
                    <button
                      key={addr._id}
                      type="button"
                      onClick={() => {
                        setSelectedAddressId(addr._id);
                        populateShippingAddress(addr);
                      }}
                      className={`relative text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedAddressId === addr._id
                          ? "border-amber-500 bg-amber-50 shadow-md"
                          : "border-amber-200 hover:border-amber-300 hover:shadow-md"
                      }`}
                    >
                      {addr.isDefault && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
                          Default
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <span className="text-xl">
                          {addr.label === "Home" ? "🏠" : "💼"}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-amber-800">
                            {addr.label}
                          </p>
                          <p className="text-sm text-amber-600 mt-1">
                            {addr.fullName}
                          </p>
                          <p className="text-sm text-amber-600">
                            {addr.street}, {addr.city}
                          </p>
                          <p className="text-sm text-amber-500 mt-1">
                            📞 {addr.phone}
                          </p>
                        </div>
                      </div>
                      {selectedAddressId === addr._id && (
                        <div className="mt-3 pt-2 border-t border-amber-200">
                          <span className="text-xs text-amber-600 flex items-center gap-1">
                            <span>✓</span> Selected
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {selectedAddressId && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                    <p className="text-xs text-amber-600 flex items-center gap-2">
                      <span>💡</span>
                      You can still edit the address below if needed
                    </p>
                  </div>
                )}
              </div>
            )}

            {isLoadingAddresses && (
              <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6">
                <div className="flex items-center justify-center gap-3 text-amber-600">
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  <p>Loading saved addresses...</p>
                </div>
              </div>
            )}

            {/* Delivery Details Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-amber-200">
                <span className="text-2xl">📝</span>
                <h2 className="text-2xl font-bold text-amber-800">
                  Delivery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-amber-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) =>
                      updateShippingAddress("fullName", e.target.value)
                    }
                    disabled={isPlacingOrder}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-amber-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) =>
                      updateShippingAddress("street", e.target.value)
                    }
                    disabled={isPlacingOrder}
                    placeholder="123 Main Street, Apartment / House No."
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      updateShippingAddress("city", e.target.value)
                    }
                    disabled={isPlacingOrder}
                    placeholder="Mumbai"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-700 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      updateShippingAddress("postalCode", e.target.value)
                    }
                    disabled={isPlacingOrder}
                    placeholder="400001"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      updateShippingAddress("state", e.target.value)
                    }
                    disabled={isPlacingOrder}
                    placeholder="Maharashtra"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      updateShippingAddress("country", e.target.value)
                    }
                    disabled={isPlacingOrder}
                    placeholder="India"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-amber-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      updateShippingAddress("phone", e.target.value)
                    }
                    disabled={isPlacingOrder}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-amber-50/30"
                  />
                </div>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-amber-200">
                <span className="text-2xl">🍬</span>
                <h2 className="text-2xl font-bold text-amber-800">
                  Order Items
                </h2>
                <span className="ml-auto text-sm text-amber-500 bg-amber-100 px-3 py-1 rounded-full">
                  {cart.items.length} items
                </span>
              </div>

              <div className="divide-y divide-amber-100">
                {cart.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center border border-amber-200">
                        <span className="text-2xl">🍬</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-800">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-amber-600">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm text-amber-500">
                            × ₹{item.product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-amber-800 text-lg">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-amber-200">
                <span className="text-2xl">💰</span>
                <h2 className="text-2xl font-bold text-amber-800">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">₹{deliveryFee}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Tax (5%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>

                {subtotal > 0 && subtotal < 500 && (
                  <div className="bg-linear-to-r from-amber-50 to-amber-100 rounded-xl p-3 border border-amber-200">
                    <p className="text-sm text-amber-700 flex items-center gap-2">
                      <span>🎉</span>
                      Add ₹{(500 - subtotal).toFixed(2)} more to get free
                      delivery!
                    </p>
                    <div className="mt-2 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${(subtotal / 500) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Payment Method Selection */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <label className="block text-sm font-semibold text-amber-700 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-amber-500 focus:ring-amber-400"
                      />
                      <span className="text-amber-700">
                        Cash on Delivery (COD)
                      </span>
                    </label>

                    {/* Future payment methods can be added here */}
                    {/* 
                    <label className="flex items-center gap-3 cursor-pointer opacity-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CARD"
                        disabled
                        className="w-4 h-4"
                      />
                      <span className="text-amber-500">Card Payment (Coming Soon)</span>
                    </label>
                    */}
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-amber-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-amber-800">
                  <span>Total</span>
                  <span className="text-2xl">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Error Message Display */}
              {placeOrderError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {placeOrderError}
                </div>
              )}

              <Button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                variant="primary"
                fullWidth
                className="group"
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
              </Button>

              <Button
                onClick={() => navigate("/cart")}
                variant="outlineFullWidth"
                className="flex items-center justify-center gap-2"
              >
                <span>←</span>
                Back to Cart
              </Button>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t border-amber-100">
                <p className="text-xs text-amber-500 text-center mb-3">
                  We accept
                </p>
                <div className="flex justify-center gap-3 text-2xl">
                  <span className="bg-gray-100 p-2 rounded-lg">💳</span>
                  <span className="bg-gray-100 p-2 rounded-lg">📱</span>
                  <span className="bg-gray-100 p-2 rounded-lg">🏦</span>
                  <span className="bg-gray-100 p-2 rounded-lg">💵</span>
                </div>
                <p className="text-xs text-amber-500 text-center mt-3">
                  Secure payment powered by SweetShop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
