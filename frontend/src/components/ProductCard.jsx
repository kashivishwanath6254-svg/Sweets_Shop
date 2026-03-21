const ProductCard = ({ product }) => {
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

  const handleAddToCart = () => {
    if (stockStatus.disabled) return;

    // TODO: Implement add to cart logic
    console.log(`Adding ${product.name} to cart`);
    // You'll connect this to your cart context/state later
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-200">
      {/* Product Image */}
      <div className="relative h-48 bg-linear-to-br from-amber-50 to-amber-100">
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
                ? "bg-red-500 text-white"
                : "bg-red-600 text-white"
          }`}
        >
          {stockStatus.text}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-amber-800 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-amber-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-amber-700">
            ₹{product.price}
          </div>
          <div className="text-xs text-amber-500">
            {product.stock > 0 && `${product.stock} units`}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={stockStatus.disabled}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
            stockStatus.disabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
              : "bg-linear-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {stockStatus.disabled ? stockStatus.text : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
