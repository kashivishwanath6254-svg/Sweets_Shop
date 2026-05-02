function AddressesTab({ address, setAddress, actions }) {
  const handleAddAddress = () => {
    setAddress((prev) => ({
      ...prev,
      editingIndex: null,
      newAddress: {
        type: "Home",
        address: "",
        city: "",
        pincode: "",
      },
      showForm: true,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-800">Saved Addresses</h2>
        <button
          onClick={handleAddAddress}
          className="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span>+</span>
          Add New Address
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {address.list.map((addr, index) => (
          <div
            key={addr.id}
            className="p-5 bg-white rounded-xl border border-amber-200 hover:shadow-lg transition-all relative"
          >
            {addr.isDefault && (
              <span className="absolute -top-2 -right-2 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-lg">
                Default
              </span>
            )}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-amber-500 text-xl">
                {addr.type === "Home" ? "🏠" : "💼"}
              </span>
              <div>
                <h3 className="font-semibold text-amber-800">{addr.type}</h3>
                <p className="text-amber-600 text-sm mt-1">
                  {addr.address}, {addr.city} - {addr.pincode}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-amber-100">
              {!addr.isDefault && (
                <button
                  onClick={() => actions.onSetDefault(index)}
                  className="px-3 py-1.5 text-xs bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={() => actions.onEdit(index)}
                className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                Edit
              </button>
              <button
                onClick={() => actions.onDelete(index)}
                className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Address Modal */}
      {address.showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              {address.editingIndex !== null
                ? "Edit Address"
                : "Add New Address"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">
                  Address Type
                </label>
                <select
                  value={address.newAddress.type}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      newAddress: {
                        ...prev.newAddress,
                        type: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400"
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address.newAddress.address}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      newAddress: {
                        ...prev.newAddress,
                        address: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={address.newAddress.city}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        newAddress: {
                          ...prev.newAddress,
                          city: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={address.newAddress.pincode}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        newAddress: {
                          ...prev.newAddress,
                          pincode: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={actions.onAdd}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition"
                >
                  {address.editingIndex !== null
                    ? "Update Address"
                    : "Save Address"}
                </button>
                <button
                  onClick={() => {
                    setAddress((prev) => ({
                      ...prev,
                      showForm: false,
                      editingIndex: null,
                    }));
                  }}
                  className="flex-1 px-6 py-3 border border-amber-300 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressesTab;
