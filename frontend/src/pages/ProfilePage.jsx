import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { AuthApi } from "../services/AuthApi";
import PersonalInfoTab from "../components/profile/tabs/PersonalInfoTab";
import OrdersTab from "../components/profile/tabs/OrdersTab";
import AddressesTab from "../components/profile/tabs/AddressesTab";
import PasswordModal from "../components/profile/modals/PasswordModal";
import DeleteModal from "../components/profile/modals/DeleteModal";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading, setUser } = useContext(AuthContext);

  // Profile state
  const [profile, setProfile] = useState({
    editedName: "",
    isEditing: false,
  });

  // Password state
  const [password, setPassword] = useState({
    show: false,
    data: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    error: "",
    isSubmitting: false,
    visibility: {
      current: false,
      new: false,
      confirm: false,
    },
  });

  // Address state
  const [address, setAddress] = useState({
    list: [
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
    ],
    showForm: false,
    editingIndex: null,
    newAddress: {
      type: "Home",
      address: "",
      city: "",
      pincode: "",
    },
  });

  // UI state
  const [ui, setUi] = useState({
    activeTab: "profile",
    showDeleteConfirm: false,
  });

  if (loading || !user)
    return <p className="text-center py-8 text-amber-600">Loading...</p>;

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

  const handleUpdateProfile = async () => {
    try {
      if (profile.editedName === user.profileName) {
        setProfile((prev) => ({ ...prev, isEditing: false }));
        return; // no unnecessary API call
      }

      const updatedUser = await AuthApi.updateProfile({
        profileName: profile.editedName,
      });

      setUser(updatedUser);
      setProfile((prev) => ({ ...prev, isEditing: false }));
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  const handleChangePassword = () => {
    setPassword((prev) => ({
      ...prev,
      data: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      error: "",
      show: true,
    }));
  };

  const handlePasswordSubmit = async () => {
    try {
      await AuthApi.changePassword(
        password.data.currentPassword,
        password.data.newPassword,
      );

      alert("Password changed successfully! Please login again.");
      setUser(null);
      navigate("/login");
    } catch (error) {
      setPassword((prev) => ({
        ...prev,
        error: error.message || "Failed to change password",
        isSubmitting: false,
      }));
    }
  };

  const handleDeleteAccount = () => {
    // API call to delete account
    console.log("Deleting account...");
    setUi((prev) => ({ ...prev, showDeleteConfirm: false }));
    // Navigate to home after deletion
    navigate("/");
  };

  const handleReorder = (orderId) => {
    console.log("Reordering:", orderId);
    alert(`Adding items from order ${orderId} to cart!`);
  };

  const handleAddAddress = () => {
    if (address.editingIndex !== null) {
      // Update existing address
      const updatedAddresses = address.list.map((addr, index) =>
        index === address.editingIndex
          ? { ...address.newAddress, id: addr.id }
          : addr,
      );
      setAddress((prev) => ({
        ...prev,
        list: updatedAddresses,
      }));
    } else {
      // Add new address
      setAddress((prev) => ({
        ...prev,
        list: [
          ...prev.list,
          { ...prev.newAddress, id: prev.list.length + 1, isDefault: false },
        ],
      }));
    }
    setAddress((prev) => ({
      ...prev,
      showForm: false,
      editingIndex: null,
      newAddress: { type: "Home", address: "", city: "", pincode: "" },
    }));
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = address.list.filter((_, i) => i !== index);
    setAddress((prev) => ({ ...prev, list: updatedAddresses }));
  };

  const handleSetDefaultAddress = (index) => {
    const updatedAddresses = address.list.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddress((prev) => ({ ...prev, list: updatedAddresses }));
  };

  const handleEditAddress = (index) => {
    setAddress((prev) => ({
      ...prev,
      editingIndex: index,
      newAddress: prev.list[index],
      showForm: true,
    }));
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
                onClick={() =>
                  setUi((prev) => ({ ...prev, activeTab: tab.id }))
                }
                className={`flex-1 px-6 py-4 font-medium capitalize transition-all flex items-center justify-center gap-2 ${
                  ui.activeTab === tab.id
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
            {ui.activeTab === "profile" && (
              <PersonalInfoTab
                user={user}
                profile={profile}
                setProfile={setProfile}
                onUpdateProfile={handleUpdateProfile}
                onChangePassword={handleChangePassword}
                onDeleteAccount={() =>
                  setUi((prev) => ({ ...prev, showDeleteConfirm: true }))
                }
              />
            )}

            {/* Orders Tab */}
            {ui.activeTab === "orders" && (
              <OrdersTab
                orders={orders}
                actions={{
                  onReorder: handleReorder,
                }}
              />
            )}

            {/* Addresses Tab */}
            {ui.activeTab === "addresses" && (
              <AddressesTab
                address={address}
                setAddress={setAddress}
                actions={{
                  onAdd: handleAddAddress,
                  onEdit: handleEditAddress,
                  onDelete: handleDeleteAddress,
                  onSetDefault: handleSetDefaultAddress,
                }}
              />
            )}
          </div>
        </div>

        {/* Modals */}
        <PasswordModal
          password={password}
          setPassword={setPassword}
          onSubmit={handlePasswordSubmit}
        />

        <DeleteModal
          showDeleteConfirm={ui.showDeleteConfirm}
          setShowDeleteConfirm={(show) =>
            setUi((prev) => ({ ...prev, showDeleteConfirm: show }))
          }
          onDeleteAccount={handleDeleteAccount}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
