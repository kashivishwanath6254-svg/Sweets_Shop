import { useState, useEffect } from "react";
import { AdminOrderApi } from "../services/AdminOrderApi.js";
import Button from "../components/ui/Button.jsx";

const STATUS_CONFIG = {
  PLACED: { color: "bg-gray-100 text-gray-700", label: "Placed", icon: "📋" },
  CONFIRMED: { color: "bg-blue-100 text-blue-700", label: "Confirmed", icon: "✓" },
  PREPARING: { color: "bg-yellow-100 text-yellow-700", label: "Preparing", icon: "🔪" },
  OUT_FOR_DELIVERY: { color: "bg-orange-100 text-orange-700", label: "Out for Delivery", icon: "🚚" },
  DELIVERED: { color: "bg-green-100 text-green-700", label: "Delivered", icon: "✅" },
  CANCELLED: { color: "bg-red-100 text-red-700", label: "Cancelled", icon: "❌" },
};

// Valid status transitions based on backend rules
const ALLOWED_TRANSITIONS = {
  PLACED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
}


function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Fetch orders on mount
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AdminOrderApi.getAllOrders();
      setOrders(data?.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await AdminOrderApi.updateOrderStatus(orderId, newStatus);

      // Update UI optimistically
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert(err.message || "Failed to update order status");
      // Refetch to ensure consistency
      fetchOrders();
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.PLACED;
    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${config.color}`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortId = (id) => id?.slice(-8).toUpperCase();

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-600 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
          </div>
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">
            Orders Management
          </h1>
          <p className="text-center text-amber-600/80">
            Manage and track customer orders
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-md border border-amber-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="ALL">All Status</option>
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>

              <Button variant="outline" onClick={fetchOrders} className="!px-4 !py-2">
                🔄 Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchOrders}
              className="mt-2 text-red-600 hover:text-red-700 underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-amber-200">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-amber-800 mb-2">
              No Orders Found
            </h3>
            <p className="text-amber-600">
              {searchTerm || statusFilter !== "ALL"
                ? "Try adjusting your search or filter criteria"
                : "No orders have been placed yet"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-800">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-800">Customer</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-amber-800">Items</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-amber-800">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-800">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-800">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-800">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {filteredOrders.map((order) => {
                    const availableTransitions = ALLOWED_TRANSITIONS[order.orderStatus] || [];

                    return (
                      <tr key={order._id} className="hover:bg-amber-50/30 transition-colors">
                        {/* Order ID */}
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-medium text-amber-800">
                            #{shortId(order._id)}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-amber-800">
                              {order.shippingAddress?.fullName || "N/A"}
                            </p>
                          </div>
                        </td>

                        {/* Items Count */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 text-amber-700">
                            <span>📦</span>
                            {order.items?.length || 0}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-amber-800">
                            ₹{order.totalAmount}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-amber-600">
                            {formatDate(order.createdAt)}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4">
                          {getStatusBadge(order.orderStatus)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          {availableTransitions.length > 0 ? (
                            <select
                              value=""
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              disabled={updatingOrderId === order._id}
                              className="px-3 py-1.5 border border-amber-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white cursor-pointer hover:border-amber-400 transition-colors"
                            >
                              <option value="" disabled>Update Status</option>
                              {availableTransitions.map((status) => (
                                <option key={status} value={status}>
                                  → {STATUS_CONFIG[status]?.label || status}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-sm text-amber-400 italic">
                              Final
                            </span>
                          )}
                          {updatingOrderId === order._id && (
                            <div className="inline-block ml-2 w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer with Summary */}
            <div className="bg-amber-50/50 px-6 py-4 border-t border-amber-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-amber-600">
                  Showing {filteredOrders.length} of {orders.length} orders
                </span>
                <div className="flex gap-3">
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                    const count = orders.filter(o => o.orderStatus === key).length;
                    if (count === 0) return null;
                    return (
                      <span key={key} className={`px-2 py-1 rounded-full text-xs ${config.color}`}>
                        {config.label}: {count}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;
