import { useCart } from "../hooks/useCart";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'success', 'error'

  const getStockStatus = (stock, isAvailable) => {
    if (!isAvailable)
      return { text: "Not Available", color: "red", disabled: true };
    if (stock === 0)
      return { text: "Out of Stock", color: "red", disabled: true };
    if (stock < 5)
      return { text: `Low Stock: ${stock}`, color: "amber", disabled: false };
    return { text: "In Stock", color: "green", disabled: false };
  };

  const stockStatus = getStockStatus(product.stock, product.isAvailable);

  const handleAddToCart = async () => {
    if (stockStatus.disabled) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Show feedback that login is required
      setFeedback("login");

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    setIsAdding(true);
    setFeedback(null);

    try {
      await addToCart(product.id);

      // Success feedback
      setFeedback("success");

      // Revert after 1.5 seconds
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    } catch (error) {
      console.error(error);

      // Error feedback
      setFeedback("error");

      // Revert after 1.5 seconds
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    } finally {
      setIsAdding(false);
    }
  };

  // Determine button styling based on feedback state
  const getButtonStyle = () => {
    if (feedback === "success") {
      return "bg-green-500 hover:bg-green-600 text-white";
    }
    if (feedback === "error") {
      return "bg-red-500 hover:bg-red-600 text-white";
    }
    if (feedback === "login") {
      return "bg-blue-500 hover:bg-blue-600 text-white";
    }
    if (stockStatus.disabled || isAdding) {
      return "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300";
    }
    return "bg-linear-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white shadow-md hover:shadow-lg";
  };

  // Determine button text based on feedback state
  const getButtonText = () => {
    if (feedback === "success") {
      return (
        <>
          <span className="text-lg">✓</span>
          <span>Added to Cart!</span>
        </>
      );
    }
    if (feedback === "error") {
      return (
        <>
          <span className="text-lg">✗</span>
          <span>Failed to Add</span>
        </>
      );
    }
    if (feedback === "login") {
      return (
        <>
          <span className="text-lg">🔒</span>
          <span>Please Login First</span>
        </>
      );
    }
    if (isAdding) {
      return (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Adding...</span>
        </>
      );
    }
    if (stockStatus.disabled) {
      return stockStatus.text;
    }
    return "Add to Cart";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-200 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative h-48 bg-linear-to-br from-amber-50 to-amber-100 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkVGNUM2Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWODBIODBWNjBaIiBmaWxsPSIjRjlBODM0Ii8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iI0Y5QTgzNCIvPgo8cGF0aCBkPSJNODAgMTIwSDEyMFYxNjBIODBWMTIwWiIgZmlsbD0iI0Y5QTgzNCIvPgo8L3N2Zz4=";
          }}
        />

        {/* Stock Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            stockStatus.color === "green"
              ? "bg-green-100 text-green-700"
              : stockStatus.color === "amber"
                ? "bg-amber-500 text-white"
                : "bg-red-600 text-white"
          }`}
        >
          {stockStatus.text}
        </div>
      </div>

      {/* Product Info - Flex column to push button to bottom */}
      <div className="p-4 flex flex-col grow">
        <div className="grow">
          <h3 className="text-lg font-bold text-amber-800 mb-2 line-clamp-2 min-h-14">
            {product.name}
          </h3>
          <p className="text-sm text-amber-600 mb-3 line-clamp-2 min-h-10">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-amber-700">
            ₹{product.price}
          </div>
          <div className="text-xs text-amber-500">
            {product.stock > 0 && `${product.stock} units`}
          </div>
        </div>

        {/* Add to Cart Button - Fixed at bottom */}
        <button
          onClick={handleAddToCart}
          disabled={stockStatus.disabled || isAdding || feedback !== null}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 ${getButtonStyle()}`}
        >
          {getButtonText()}
        </button>
      </div>

      {/* Toast notification for mobile */}
      {feedback === "success" && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <span>✓</span>
            Added to cart!
          </div>
        </div>
      )}

      {feedback === "error" && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <span>✗</span>
            Failed to add
          </div>
        </div>
      )}

      {feedback === "login" && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <span>🔒</span>
            Please login first
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
