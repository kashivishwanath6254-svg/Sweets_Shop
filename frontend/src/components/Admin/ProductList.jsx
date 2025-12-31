// src/components/admin/ProductList.jsx

function ProductList({ products, loading, onEdit, onDelete }) {
  if (loading && products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-amber-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-amber-600 font-medium">
            Loading sweet delights...
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border-2 border-dashed border-amber-200">
        <div className="text-5xl mb-4">🍬</div>
        <p className="text-amber-700 font-medium mb-2">No products found</p>
        <p className="text-amber-500 text-sm">
          Start by adding your products to the collection
        </p>
      </div>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sweet product?")) {
      onDelete(id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Sweets: "from-amber-500 to-orange-400",
      "Dry Sweets": "from-amber-400 to-amber-300",
      Cakes: "from-purple-400 to-pink-400",
      Seasonal: "from-green-400 to-emerald-400",
      Traditional: "from-amber-600 to-amber-500",
    };
    return colors[category] || "from-gray-400 to-gray-300";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
      <div className="p-4 border-b border-amber-100 bg-amber-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-amber-800">Products</h2>
          <span className="text-sm text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            {products.length} items
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-amber-100">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Product Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-amber-50">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-amber-50/50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-amber-200 to-amber-100 rounded-lg flex items-center justify-center">
                      <span className="text-amber-600 text-lg">🍯</span>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-900">
                        {product.name}
                      </div>
                      {product.description && (
                        <div className="text-sm text-amber-600 mt-1 line-clamp-2 max-w-md">
                          {product.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1 bg-linear-to-r from-amber-500/10 to-amber-400/10 px-3 py-2 rounded-lg">
                    <span className="text-lg font-bold text-amber-700">₹</span>
                    <span className="text-xl font-bold text-amber-800">
                      {product.price}
                    </span>
                    <span className="text-sm text-amber-600">/Kg</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full bg-linear-to-r ${getCategoryColor(
                      product.category
                    )} text-white shadow-sm`}
                  >
                    {product.category || "Traditional"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-amber-50 rounded-xl overflow-hidden border border-amber-200 shadow-sm">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-amber-400">
                        <span className="text-2xl">📷</span>
                        <span className="text-xs mt-1">No image</span>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-400 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <span>✏️</span>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 bg-linear-to-r from-red-500 to-red-400 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-500 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <span>🗑️</span>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-amber-100 bg-amber-50/50">
        <div className="text-sm text-amber-600">
          Showing <span className="font-semibold">{products.length}</span>{" "}
          products
        </div>
      </div>
    </div>
  );
}

export default ProductList;
