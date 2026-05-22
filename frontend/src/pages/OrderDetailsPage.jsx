import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderApi } from "../services/OrderApi";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/profile/modals/ConfirmModal";
import { useCart } from "../hooks/useCart";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const { addToCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const canCancel = ["placed", "confirmed"].includes(
    order?.orderStatus?.toLowerCase(),
  );

  const confirmCancelOrder = async () => {
    setIsCancelling(true);
    try {
      await OrderApi.cancelOrder(order._id);
      const updated = await OrderApi.getOrderById(orderId);
      setOrder(updated?.order);
      setShowCancelModal(false);
    } catch (err) {
      console.error("Cancel failed:", err);
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await OrderApi.getOrderById(orderId);
        setOrder(data?.order || []);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      placed: {
        color: "bg-yellow-100 text-yellow-700",
        icon: "⏳",
        label: "Processing",
      },
      preparing: {
        color: "bg-blue-100 text-blue-700",
        icon: "🔄",
        label: "Preparing",
      },
      confirmed: {
        color: "bg-green-100 text-green-700",
        icon: "✓",
        label: "Confirmed",
      },
      out_for_delivery: {
        color: "bg-purple-100 text-purple-700",
        icon: "📦",
        label: "Out for delivery",
      },
      delivered: {
        color: "bg-green-100 text-green-700",
        icon: "✅",
        label: "Delivered",
      },
      cancelled: {
        color: "bg-red-100 text-red-700",
        icon: "✗",
        label: "Cancelled",
      },
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.placed;
    return (
      <span
        className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${config.color} shadow-sm`}
      >
        <span className="text-base">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const handleReorder = async () => {
    try {
      for (const item of order.items) {
        await addToCart(item.product._id);

        // if quantity > 1, adjust it
        if (item.quantity > 1) {
          await updateQuantity(item.product._id, item.quantity);
        }
      }

      navigate("/cart");
    } catch (error) {
      console.error("Reorder failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-600 text-lg font-medium">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center border border-amber-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">
            Failed to Load Order
          </h3>
          <p className="text-amber-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">🔍</span>
          </div>
          <h2 className="text-3xl font-bold text-amber-800 mb-3">
            Order Not Found
          </h2>
          <p className="text-amber-600 mb-8">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortId = (id) => id?.slice(-6).toUpperCase();

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-linear-to-r from-amber-400 to-amber-500 rounded-full"></div>
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-4">
            Order Details
          </h1>
          <p className="text-lg text-amber-600/80">
            Thank you for your order! 🎉
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          {/* Order Header */}
          <div className="bg-linear-to-r from-amber-50 to-amber-100 p-6 border-b border-amber-200">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-sm text-amber-500 font-medium">
                  Order Number
                </p>
                <h2 className="text-2xl font-bold text-amber-800 font-mono tracking-wide">
                  #{shortId(order?._id)}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-amber-500 font-medium">Placed on</p>
                <p className="font-semibold text-amber-700">
                  {formatDate(order?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="p-6 border-b border-amber-200 bg-white">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                <div>
                  <p className="text-sm text-amber-500 font-medium">
                    Order Status
                  </p>
                  {getStatusBadge(order?.orderStatus)}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <p className="text-sm text-amber-500 font-medium">
                    Payment Method
                  </p>
                  <p className="font-semibold text-amber-700 capitalize">
                    {order?.paymentMethod || "Cash on Delivery"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-amber-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🛍️</span>
              </div>
              <h3 className="text-xl font-bold text-amber-800">
                Items Ordered
              </h3>
              <span className="ml-auto text-sm font-medium text-amber-600 bg-amber-100 px-3 py-1.5 rounded-full">
                {order.items?.length || 0}{" "}
                {order.items?.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {order.items?.map((item, idx) => (
                <div
                  key={item.product._id}
                  className={`flex items-center gap-4 py-4 ${idx !== order.items.length - 1 ? "border-b border-amber-100" : ""} hover:bg-amber-50/30 transition-colors duration-200 rounded-lg px-2 -mx-2`}
                >
                  <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center border border-amber-200 shrink-0 shadow-sm">
                    <span className="text-2xl">🍬</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-800 text-lg">
                      {item.product.name}
                    </h4>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="text-sm text-amber-600 flex items-center gap-1">
                        <span>📦</span> Qty: {item.quantity}
                      </span>
                      <span className="text-sm text-amber-500 flex items-center gap-1">
                        <span>💰</span> ₹{item.product.price} each
                      </span>
                    </div>
                  </div>
                  <p className="font-bold text-amber-800 text-xl">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-6 border-b border-amber-200 bg-amber-50/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📍</span>
              </div>
              <h3 className="text-xl font-bold text-amber-800">
                Delivery Address
              </h3>
            </div>
            <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-amber-800 text-lg">
                {order.shippingAddress?.fullName}
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-amber-600">
                  {order.shippingAddress?.street}
                </p>
                <p className="text-amber-600">
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                  - {order.shippingAddress?.postalCode}
                </p>
                <p className="text-amber-600">
                  {order.shippingAddress?.country}
                </p>
                <p className="text-amber-600 mt-2 pt-2 border-t border-amber-100">
                  📞 {order.shippingAddress?.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-6 border-b border-amber-200 bg-linear-to-br from-amber-50/50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <h3 className="text-xl font-bold text-amber-800">
                Price Summary
              </h3>
            </div>

            <div className="space-y-3 max-w-md ml-11">
              <div className="flex justify-between py-2 text-amber-700">
                <span>Subtotal</span>
                <span className="font-semibold">₹{order?.subtotal}</span>
              </div>
              <div className="flex justify-between py-2 text-amber-700 border-t border-amber-100">
                <span>Delivery Fee</span>
                <span className="font-semibold">
                  {order?.deliveryFee === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${order?.deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between py-2 text-amber-700 border-t border-amber-100">
                <span>Tax (5%)</span>
                <span className="font-semibold">₹{order?.tax}</span>
              </div>

              <div className="border-t-2 border-amber-200 pt-4 mt-2">
                <div className="flex justify-between text-xl font-bold text-amber-800">
                  <span>Total Amount</span>
                  <span className="text-2xl text-amber-700">
                    ₹{order?.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-white">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={handleReorder}
                className="flex-1"
              >
                <span>🔄</span>
                Reorder Items
                <span>→</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/products")}
                className="flex-1"
              >
                <span>🍬</span>
                Continue Shopping
              </Button>

              {canCancel && (
                <Button
                  variant="danger"
                  onClick={() => setShowCancelModal(true)}
                  disabled={isCancelling}
                  className="min-w-[140px]"
                >
                  {isCancelling ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Cancelling...
                    </>
                  ) : (
                    <>❌ Cancel Order</>
                  )}
                </Button>
              )}
            </div>

            {/* Order Note */}
            {order?.orderStatus?.toLowerCase() !== "delivered" &&
              order?.orderStatus?.toLowerCase() !== "cancelled" && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <span className="text-base">ℹ️</span>
                    We'll send you updates about your order via email/SMS. Track
                    your order status here.
                  </p>
                </div>
              )}

            {/* Delivered Message */}
            {order?.orderStatus?.toLowerCase() === "delivered" && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm">
                <p className="text-sm text-green-700 flex items-center gap-2">
                  <span className="text-base">✅</span>
                  Your order has been delivered! Enjoy your sweets and don't
                  forget to rate your experience.
                </p>
              </div>
            )}

            {/* Cancelled Message */}
            {order?.orderStatus?.toLowerCase() === "cancelled" && (
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 shadow-sm">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <span className="text-base">❌</span>
                  This order has been cancelled. If you have any questions,
                  please contact support.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-amber-500">
            Need help with your order? Contact our support team at{" "}
            <a
              href="mailto:support@sweetshop.com"
              className="text-amber-600 hover:text-amber-700 hover:underline font-medium"
            >
              support@sweetshop.com
            </a>
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={() => window.print()}
              className="text-amber-600 hover:text-amber-700 transition-all flex items-center gap-2 text-sm hover:scale-105"
            >
              <span className="text-base">🖨️</span>
              Print Invoice
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-amber-600 hover:text-amber-700 transition-all flex items-center gap-2 text-sm hover:scale-105"
            >
              <span className="text-base">❓</span>
              Need Support?
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={showCancelModal}
        title="Cancel Order?"
        description="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Yes, Cancel Order"
        confirmVariant="danger"
        loading={isCancelling}
        onConfirm={confirmCancelOrder}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
}

export default OrderDetailsPage;
