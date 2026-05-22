import { useNavigate } from "react-router-dom";
import { OrderApi } from "../../../services/OrderApi";

function OrdersTab({ orders = [], ordersLoading, ordersError }) {
  const navigate = useNavigate();

  const total = orders.length;
  const delivered = orders.filter((o) => o.orderStatus === "DELIVERED").length;
  const processing = orders.filter(
    (o) => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED",
  ).length;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const shortId = (id) => id?.slice(-6).toUpperCase();

  // Loading State with Skeleton UI
  if (ordersLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">
          Order History
        </h2>

        {/* Skeleton Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 bg-amber-50 rounded-xl border border-amber-200 animate-pulse"
            >
              <div className="h-4 bg-amber-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-amber-200 rounded w-16"></div>
            </div>
          ))}
        </div>

        {/* Skeleton Orders */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl border border-amber-200 animate-pulse"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-5 bg-amber-200 rounded w-32"></div>
                    <div className="h-5 bg-amber-200 rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-amber-100 rounded w-48 mb-2"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-amber-100 rounded w-24"></div>
                    <div className="h-4 bg-amber-100 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-10 bg-amber-200 rounded-lg w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State with Styled UI
  if (ordersError) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">
          Order History
        </h2>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">
            Failed to Load Orders
          </h3>
          <p className="text-red-500 mb-6 max-w-md mx-auto">
            {ordersError ||
              "Something went wrong while loading your orders. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State (when no orders)
  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">
          Order History
        </h2>

        <div className="bg-white rounded-2xl p-12 text-center border border-amber-200">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📦</span>
          </div>
          <h3 className="text-xl font-semibold text-amber-800 mb-2">
            No Orders Yet
          </h3>
          <p className="text-amber-600 mb-6">
            You haven't placed any orders yet. Start shopping to see your orders
            here!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Order History</h2>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 hover:shadow-md transition">
          <p className="text-sm text-amber-500">Total Orders</p>
          <p className="text-2xl font-bold text-amber-800">{total}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition">
          <p className="text-sm text-green-500">Delivered</p>
          <p className="text-2xl font-bold text-green-700">{delivered}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition">
          <p className="text-sm text-blue-500">Processing</p>
          <p className="text-2xl font-bold text-blue-700">{processing}</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 bg-white rounded-xl border border-amber-200 hover:shadow-lg hover:border-amber-300 transition-all duration-300"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    title={order._id}
                    className="text-amber-600 font-mono text-sm"
                  >
                    #{shortId(order._id)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.orderStatus === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "OUT_FOR_DELIVERY"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-amber-600 text-sm">
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-amber-500">
                    📅 {formatDate(order.createdAt)}
                  </span>
                  <span className="text-amber-500 font-semibold">
                    💰 {order.subtotal}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/orders/${order._id}`)}
                className="px-5 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all duration-300 flex items-center gap-2 font-medium"
              >
                <span>👁️</span>
                View details
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersTab;
