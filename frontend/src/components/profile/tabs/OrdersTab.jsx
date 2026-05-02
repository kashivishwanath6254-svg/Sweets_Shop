function OrdersTab({ orders, actions }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Order History</h2>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-500">Total Orders</p>
          <p className="text-2xl font-bold text-amber-800">12</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-sm text-green-500">Delivered</p>
          <p className="text-2xl font-bold text-green-700">9</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-500">Processing</p>
          <p className="text-2xl font-bold text-blue-700">3</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-white rounded-xl border border-amber-200 hover:shadow-lg transition-all"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-amber-600 font-mono">{order.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-amber-600 mb-1">{order.items}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-amber-500">📅 {order.date}</span>
                  <span className="text-amber-500 font-semibold">
                    💰 {order.total}
                  </span>
                </div>
              </div>
              <button
                onClick={() => actions.onReorder(order.id)}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition flex items-center gap-2"
              >
                <span>🔄</span>
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersTab;
