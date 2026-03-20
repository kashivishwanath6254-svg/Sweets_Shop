import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // Mock user data - In real app, this would come from your auth context/API
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    registrationDate: "January 15, 2024",
    phone: "+91 98765 43210",
  };

  // Mock orders data
  const orders = [
    {
      id: "#ORD001",
      date: "2024-03-15",
      items: "Gulab Jamun (1kg), Kaju Katli (500g)",
      total: "₹1,250",
      status: "Delivered",
    },
    {
      id: "#ORD002",
      date: "2024-03-10",
      items: "Rasgulla (1kg), Ladoo (500g)",
      total: "₹950",
      status: "Shipped",
    },
    {
      id: "#ORD003",
      date: "2024-03-05",
      items: "Barfi (500g), Jalebi (1kg)",
      total: "₹800",
      status: "Processing",
    },
  ];

  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Sweet Street, Block A",
      city: "Delhi",
      pincode: "110001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Business Plaza, Sector 18",
      city: "Noida",
      pincode: "201301",
      isDefault: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData.name);
  const [editedEmail, setEditedEmail] = useState(userData.email);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    address: "",
    city: "",
    pincode: "",
  });

  const handleUpdateProfile = () => {
    // API call to update profile
    console.log("Updating profile:", { name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Navigate to change password page or open modal
    alert("Change password functionality - Implement your own!");
  };

  const handleDeleteAccount = () => {
    // API call to delete account
    console.log("Deleting account...");
    setShowDeleteConfirm(false);
    // Navigate to home after deletion
    navigate("/");
  };

  const handleReorder = (orderId) => {
    console.log("Reordering:", orderId);
    alert(`Adding items from order ${orderId} to cart!`);
  };

  const handleAddAddress = () => {
    if (editingAddress !== null) {
      // Update existing address
      const updatedAddresses = addresses.map((addr, index) =>
        index === editingAddress ? { ...newAddress, id: addr.id } : addr,
      );
      setAddresses(updatedAddresses);
    } else {
      // Add new address
      setAddresses([
        ...addresses,
        { ...newAddress, id: addresses.length + 1, isDefault: false },
      ]);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setNewAddress({ type: "Home", address: "", city: "", pincode: "" });
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const handleSetDefaultAddress = (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddresses(updatedAddresses);
  };

  const handleEditAddress = (index) => {
    setEditingAddress(index);
    setNewAddress(addresses[index]);
    setShowAddressForm(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-1 bg-amber-400 rounded-full"></div>
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-lg text-amber-600/80">
            Manage your account, orders, and delivery preferences
          </p>
        </div>

        {/* Profile Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border border-amber-200">
          <div className="flex flex-wrap border-b border-amber-200">
            {[
              { id: "profile", label: "Personal Info", icon: "👤" },
              { id: "orders", label: "My Orders", icon: "📦" },
              { id: "addresses", label: "Addresses", icon: "📍" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-medium capitalize transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "text-amber-600 border-b-2 border-amber-500 bg-amber-50/50"
                    : "text-amber-400 hover:text-amber-600 hover:bg-amber-50/30"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* Personal Information Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="flex items-center gap-6 pb-6 border-b border-amber-200">
                  <div className="w-24 h-24 bg-linear-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-amber-700">👤</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-amber-800">
                      {userData.name}
                    </h2>
                    <p className="text-amber-600">{userData.email}</p>
                    <p className="text-sm text-amber-500 mt-1">
                      Member since {userData.registrationDate}
                    </p>
                  </div>
                </div>

                {/* Edit Profile Form */}
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={userData.phone}
                        disabled
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl bg-amber-50/50 text-amber-500"
                      />
                      <p className="text-xs text-amber-500 mt-1">
                        Contact support to update phone number
                      </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleUpdateProfile}
                        className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-amber-300 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <p className="text-sm text-amber-500">Full Name</p>
                        <p className="text-lg font-medium text-amber-800">
                          {userData.name}
                        </p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <p className="text-sm text-amber-500">Email Address</p>
                        <p className="text-lg font-medium text-amber-800">
                          {userData.email}
                        </p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <p className="text-sm text-amber-500">Phone Number</p>
                        <p className="text-lg font-medium text-amber-800">
                          {userData.phone}
                        </p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <p className="text-sm text-amber-500">Member Since</p>
                        <p className="text-lg font-medium text-amber-800">
                          {userData.registrationDate}
                        </p>
                      </div>
                    </div>

                    {/* Account Management Actions */}
                    <div className="pt-6 border-t border-amber-200">
                      <h3 className="text-xl font-bold text-amber-800 mb-4">
                        Account Management
                      </h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="w-full p-4 text-left bg-white hover:bg-amber-50 border border-amber-200 rounded-xl transition-all duration-300 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-amber-500 text-xl">✏️</span>
                            <div>
                              <p className="font-medium text-amber-800">
                                Edit Profile
                              </p>
                              <p className="text-sm text-amber-500">
                                Update your name or email address
                              </p>
                            </div>
                          </div>
                          <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>

                        <button
                          onClick={handleChangePassword}
                          className="w-full p-4 text-left bg-white hover:bg-amber-50 border border-amber-200 rounded-xl transition-all duration-300 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-amber-500 text-xl">🔒</span>
                            <div>
                              <p className="font-medium text-amber-800">
                                Change Password
                              </p>
                              <p className="text-sm text-amber-500">
                                Update your password regularly for security
                              </p>
                            </div>
                          </div>
                          <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>

                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="w-full p-4 text-left bg-white hover:bg-red-50 border border-red-200 rounded-xl transition-all duration-300 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-red-500 text-xl">🗑️</span>
                            <div>
                              <p className="font-medium text-red-600">
                                Delete Account
                              </p>
                              <p className="text-sm text-red-400">
                                Permanently delete your account and data
                              </p>
                            </div>
                          </div>
                          <span className="text-red-400 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delete Account Confirmation Modal */}
                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                      <h3 className="text-2xl font-bold text-red-600 mb-4">
                        Delete Account?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        This action cannot be undone. All your data, orders, and
                        saved addresses will be permanently removed.
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={handleDeleteAccount}
                          className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-amber-800 mb-4">
                  Order History
                </h2>

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
                            <span className="text-amber-600 font-mono">
                              {order.id}
                            </span>
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
                            <span className="text-amber-500">
                              📅 {order.date}
                            </span>
                            <span className="text-amber-500 font-semibold">
                              💰 {order.total}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleReorder(order.id)}
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
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-amber-800">
                    Saved Addresses
                  </h2>
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setNewAddress({
                        type: "Home",
                        address: "",
                        city: "",
                        pincode: "",
                      });
                      setShowAddressForm(true);
                    }}
                    className="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>+</span>
                    Add New Address
                  </button>
                </div>

                {/* Address List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr, index) => (
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
                          <h3 className="font-semibold text-amber-800">
                            {addr.type}
                          </h3>
                          <p className="text-amber-600 text-sm mt-1">
                            {addr.address}, {addr.city} - {addr.pincode}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-3 border-t border-amber-100">
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(index)}
                            className="px-3 py-1.5 text-xs bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleEditAddress(index)}
                          className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(index)}
                          className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add/Edit Address Modal */}
                {showAddressForm && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                      <h3 className="text-2xl font-bold text-amber-800 mb-4">
                        {editingAddress !== null
                          ? "Edit Address"
                          : "Add New Address"}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-amber-700 mb-2">
                            Address Type
                          </label>
                          <select
                            value={newAddress.type}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                type: e.target.value,
                              })
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
                            value={newAddress.address}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                address: e.target.value,
                              })
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
                              value={newAddress.city}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  city: e.target.value,
                                })
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
                              value={newAddress.pincode}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  pincode: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button
                            onClick={handleAddAddress}
                            className="flex-1 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition"
                          >
                            {editingAddress !== null
                              ? "Update Address"
                              : "Save Address"}
                          </button>
                          <button
                            onClick={() => {
                              setShowAddressForm(false);
                              setEditingAddress(null);
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
