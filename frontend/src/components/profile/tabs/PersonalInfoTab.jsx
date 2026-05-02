function PersonalInfoTab({
  user,
  profile,
  setProfile,
  onUpdateProfile,
  onChangePassword,
  // onDeleteAccount,
}) {
  const registrationDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  const handleEditClick = () => {
    setProfile((prev) => ({
      ...prev,
      editedName: user?.profileName || "",
      isEditing: true,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 pb-6 border-b border-amber-200">
        <div className="w-24 h-24 bg-linear-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center">
          <span className="text-4xl text-amber-700">👤</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-amber-800">
            {user?.profileName}
          </h2>
          <p className="text-amber-600">{user?.email}</p>
          <p className="text-sm text-amber-500 mt-1">
            Member since {registrationDate}
          </p>
        </div>
      </div>

      {/* Edit Profile Form - Only Name is Editable */}
      {profile.isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.editedName}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, editedName: e.target.value }))
              }
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>

          {/* Email Field - Read Only with Coming Soon Badge */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 border border-amber-200 rounded-xl bg-amber-50/50 text-amber-500 cursor-not-allowed"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-amber-500 mt-1">
              Email editing will be available soon
            </p>
          </div>

          {/* Phone Field - Read Only with Coming Soon Badge */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={user?.phone || "Not added"}
                disabled
                className="w-full px-4 py-3 border border-amber-200 rounded-xl bg-amber-50/50 text-amber-500 cursor-not-allowed"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-amber-500 mt-1">
              Phone number editing will be available soon with OTP verification
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onUpdateProfile}
              className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
            <button
              onClick={() =>
                setProfile((prev) => ({ ...prev, isEditing: false }))
              }
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
                {user?.profileName}
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-amber-500">Email Address</p>
                  <p className="text-lg font-medium text-amber-800">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-amber-500">Phone Number</p>
                  <p className="text-lg font-medium text-amber-800">
                    {user?.phone || "Not added"}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-500">Member Since</p>
              <p className="text-lg font-medium text-amber-800">
                {registrationDate}
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
                onClick={handleEditClick}
                className="w-full p-4 text-left bg-white hover:bg-amber-50 border border-amber-200 rounded-xl transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-amber-500 text-xl">✏️</span>
                  <div>
                    <p className="font-medium text-amber-800">Edit Profile</p>
                    <p className="text-sm text-amber-500">Update Profile</p>
                  </div>
                </div>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>

              <button
                onClick={onChangePassword}
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

              {/* Delete account functionality - currently hidden */}
              {/* <button
                onClick={onDeleteAccount}
                className="w-full p-4 text-left bg-white hover:bg-red-50 border border-red-200 rounded-xl transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">🗑️</span>
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-red-400">
                      Permanently delete your account and data
                    </p>
                  </div>
                </div>
                <span className="text-red-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalInfoTab;
