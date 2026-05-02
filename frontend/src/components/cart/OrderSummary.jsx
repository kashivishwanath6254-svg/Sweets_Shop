function OrderSummary({ subtotal, deliveryFee, tax, total, onCheckout }) {
  return (
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
        {subtotal > 0 && subtotal < 500 && (
          <div className="bg-amber-50 rounded-xl p-3 text-sm">
            <p className="text-amber-600">
              🎉 Add ₹{(500 - subtotal).toFixed(2)} more to get free
              delivery!
            </p>
          </div>
        )}
      </div>

      <div className="border-t-2 border-amber-200 pt-4 mb-6">
        <div className="flex justify-between text-xl font-bold text-amber-800">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full py-4 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
      >
        <span>Proceed to Checkout</span>
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-amber-500">
          We accept all major payment methods
        </p>
        <div className="flex justify-center gap-2 mt-2 text-xl">
          <span>💳</span>
          <span>📱</span>
          <span>💵</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
