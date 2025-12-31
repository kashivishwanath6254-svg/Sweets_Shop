// src/components/admin/ProductForm.jsx
import { useState } from "react";

function ProductForm({ mode, initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    price: initialData.price || "",
    category: initialData.category || "",
    image: initialData.image || "",
    description: initialData.description || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Product name is required";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      e.price = "Valid price is required";
    if (!formData.description.trim()) e.description = "Description is required";
    if(!formData.category.trim()) e.category = "Category is required"

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <div className="bg-linear-to-br from-white to-amber-50 rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-linear-to-r from-amber-600 to-amber-500 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl text-white">
              {mode === "add" ? "➕" : "✏️"}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {mode === "add" ? "Add Sweet Product" : "Edit Product"}
            </h2>
            <p className="text-amber-100">
              {mode === "add"
                ? "Add a new delicious sweet to your collection"
                : "Update the product details below"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-amber-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Gulab Jamun, Kaju Katli, Ladoo"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-amber-200 bg-white"
              }`}
            />
            {errors.name && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <span>⚠️</span>
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-amber-800">
              Price per Kg (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 font-bold">
                ₹
              </div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="450"
                min="0"
                step="0.01"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${
                  errors.price
                    ? "border-red-300 bg-red-50"
                    : "border-amber-200 bg-white"
                }`}
              />
            </div>
            {errors.price && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <span>⚠️</span>
                <span>{errors.price}</span>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-amber-800">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${
                errors.category
                  ? "border-red-300 bg-red-50"
                  : "border-amber-200 bg-white"
              }`}
            >
              <option value="">Select a category</option>
              <option value="Sweets">Sweets</option>
              <option value="Cakes">Cakes</option>
              {/* <option value="Festive">🎉 Festive Specials</option>
              <option value="Seasonal">🍂 Seasonal</option>
              <option value="Traditional">👑 Traditional</option> */}
            </select>
            {errors.category && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <span>⚠️</span>
                <span>{errors.category}</span>
              </div>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-amber-800">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/sweet-image.jpg"
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-white"
            />
            <p className="text-xs text-amber-500">
              Leave empty for default image
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-amber-800">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe this sweet delicacy... (taste, ingredients, occasion)"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${
              errors.description
                ? "border-red-300 bg-red-50"
                : "border-amber-200 bg-white"
            }`}
          />
          {errors.description && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <span>⚠️</span>
              <span>{errors.description}</span>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-amber-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-amber-300 text-amber-700 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                {mode === "add" ? "Adding Sweet..." : "Updating..."}
              </>
            ) : mode === "add" ? (
              <>
                <span>🍬</span>
                Add Product
              </>
            ) : (
              <>
                <span>💾</span>
                Update Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
