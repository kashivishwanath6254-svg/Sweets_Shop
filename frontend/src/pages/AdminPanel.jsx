// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import { ProductApi } from "../services/ProductApi.js";
import ProductList from "../components/Admin/ProductList.jsx";
import ProductForm from "../components/Admin/ProductForm.jsx";

function AdminPanel() {
  const [mode, setMode] = useState("view"); // 'view' | 'add' | 'edit'
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await ProductApi.getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddClick = () => {
    setMode("add");
    setSelectedProduct(null);
    setError("");
  };

  const handleEditClick = (product) => {
    setMode("edit");
    setSelectedProduct(product);
    setError("");
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      await ProductApi.deleteProduct(id);
      await loadProducts(); // Reload products
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      if (mode === "add") {
        await ProductApi.addProduct(formData);
      } else if (mode === "edit") {
        await ProductApi.updateProduct(selectedProduct._id, formData);
      }

      await loadProducts(); // Reload products
      setMode("view");
      setSelectedProduct(null);
    } catch (err) {
      setError(`Failed to ${mode === "add" ? "add" : "update"} product`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setMode("view");
    setSelectedProduct(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 p-4 md:p-6">
      {/* Header with golden theme */}
      <header className="mb-8">
        <div className="bg-linear-to-r from-amber-800 to-amber-900 rounded-2xl p-6 mb-6 shadow-lg border border-amber-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-amber-100 mb-2">
                SweetShop Admin Panel
              </h1>
              <p className="text-amber-200/80">
                Manage your products with love and tradition
              </p>
            </div>

            {mode === "view" && (
              <button
                onClick={handleAddClick}
                className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center gap-2 justify-center"
              >
                <span className="text-2xl">+</span>
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Mode Indicator */}
        {mode !== "view" && (
          <div className="mb-6 p-4 bg-linear-to-r from-amber-600/10 to-amber-500/10 rounded-xl border border-amber-300/30">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-8 rounded-full ${
                  mode === "add" ? "bg-green-500" : "bg-amber-500"
                }`}
              ></div>
              <div>
                <p className="font-medium text-amber-800">
                  {mode === "add"
                    ? "Adding New Sweet Product"
                    : `Editing: ${selectedProduct?.name}`}
                </p>
                <p className="text-sm text-amber-600/80">
                  {mode === "add"
                    ? "Fill in the details to add a new sweet to your collection"
                    : "Update the product information as needed"}
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="space-y-8">
        {/* Product Form (for Add/Edit modes) */}
        {(mode === "add" || mode === "edit") && (
          <ProductForm
            mode={mode}
            initialData={selectedProduct || {}}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        )}

        {/* Product List (always visible in view mode) */}
        {mode === "view" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
                <p className="text-sm text-amber-600">Total Products</p>
                <p className="text-2xl font-bold text-amber-800">
                  {products.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
                <p className="text-sm text-amber-600">Categories</p>
                <p className="text-2xl font-bold text-amber-800">
                  {new Set(products.map((p) => p.category)).size}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
                <p className="text-sm text-amber-600">Average Price</p>
                <p className="text-2xl font-bold text-amber-800">
                  ₹
                  {products.length > 0
                    ? Math.round(
                        products.reduce((sum, p) => sum + (p.price || 0), 0) /
                          products.length
                      )
                    : 0}
                </p>
              </div>
            </div>

            {/* Product List */}
            <ProductList
              products={products}
              loading={loading}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
