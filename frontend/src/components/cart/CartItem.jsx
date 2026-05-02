import { useState } from "react";

function CartItem({ item, onUpdateQuantity, onRemove, isUpdating }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-200 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Product Image */}
          <div className="w-24 h-24 bg-linear-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center shrink-0 border border-amber-200">
            {imageError ? (
              <span className="text-3xl">🍬</span>
            ) : (
              <img
                src={item.product.image}
                alt={item.product.name}
                onError={() => setImageError(true)}
                className="w-16 h-16 object-contain"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-800 mb-1">
              {item.product.name}
            </h3>
            <p className="text-amber-500 text-sm mb-2">
              {item.product.description?.length > 60
                ? item.product.description.substring(0, 60) + "..."
                : item.product.description}
            </p>
            <button
              onClick={() => onRemove(item.product._id)}
              className="text-red-500 text-sm hover:text-red-600 transition flex items-center gap-1"
            >
              <span>🗑️</span>
              Remove
            </button>
          </div>

          {/* Price */}
          <div className="text-center md:text-left">
            <p className="text-sm text-amber-500 md:hidden">Price</p>
            <p className="text-lg font-semibold text-amber-800">
              ₹{item.product.price}
            </p>
          </div>

          {/* Quantity Controls */}
          <div>
            <p className="text-sm text-amber-500 md:hidden mb-2">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  onUpdateQuantity(item.product._id, item.quantity - 1)
                }
                disabled={isUpdating === item.product._id}
                className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200 transition disabled:opacity-50"
              >
                -
              </button>
              <span className="text-lg font-medium text-amber-800 min-w-10 text-center">
                {isUpdating === item.product._id ? (
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  item.quantity
                )}
              </span>
              <button
                onClick={() =>
                  onUpdateQuantity(item.product._id, item.quantity + 1)
                }
                disabled={isUpdating === item.product._id}
                className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200 transition disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <p className="text-sm text-amber-500 md:hidden">Total</p>
            <p className="text-xl font-bold text-amber-800">
              ₹{item.product.price * item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
