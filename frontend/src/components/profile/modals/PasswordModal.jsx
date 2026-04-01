function PasswordModal({ password, setPassword, onSubmit }) {
  const handlePasswordSubmit = async () => {
    // Validation
    if (!password.data.currentPassword) {
      setPassword((prev) => ({
        ...prev,
        error: "Please enter your current password",
      }));
      return;
    }
    if (!password.data.newPassword) {
      setPassword((prev) => ({
        ...prev,
        error: "Please enter a new password",
      }));
      return;
    }
    if (password.data.newPassword.length < 6) {
      setPassword((prev) => ({
        ...prev,
        error: "New password must be at least 6 characters",
      }));
      return;
    }
    if (password.data.newPassword !== password.data.confirmPassword) {
      setPassword((prev) => ({
        ...prev,
        error: "New passwords do not match",
      }));
      return;
    }

    setPassword((prev) => ({
      ...prev,
      isSubmitting: true,
      error: "",
    }));

    try {
      await onSubmit();
    } catch (error) {
      setPassword((prev) => ({
        ...prev,
        error: error.message || "Failed to change password",
        isSubmitting: false,
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setPassword((prev) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [field]: !prev.visibility[field],
      },
    }));
  };

  if (!password.show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-amber-800">Change Password</h3>
          <button
            onClick={() => setPassword((prev) => ({ ...prev, show: false }))}
            className="text-amber-400 hover:text-amber-600 transition text-2xl"
          >
            ×
          </button>
        </div>

        <p className="text-amber-600 text-sm mb-6">
          Please enter your current password and choose a new one
        </p>

        {/* Error Message */}
        {password.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
            <span>⚠️</span>
            {password.error}
          </div>
        )}

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={password.visibility.current ? "text" : "password"}
                value={password.data.currentPassword}
                onChange={(e) =>
                  setPassword((prev) => ({
                    ...prev,
                    data: {
                      ...prev.data,
                      currentPassword: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600"
              >
                {password.visibility.current ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={password.visibility.new ? "text" : "password"}
                value={password.data.newPassword}
                onChange={(e) =>
                  setPassword((prev) => ({
                    ...prev,
                    data: {
                      ...prev.data,
                      newPassword: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Enter new password (min. 6 characters)"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600"
              >
                {password.visibility.new ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={password.visibility.confirm ? "text" : "password"}
                value={password.data.confirmPassword}
                onChange={(e) =>
                  setPassword((prev) => ({
                    ...prev,
                    data: {
                      ...prev.data,
                      confirmPassword: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600"
              >
                {password.visibility.confirm ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs text-amber-600 font-medium mb-1">
              Password Requirements:
            </p>
            <ul className="text-xs text-amber-500 space-y-1">
              <li>• At least 6 characters long</li>
              <li>
                • Use a mix of letters, numbers, and symbols for better security
              </li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handlePasswordSubmit}
              disabled={password.isSubmitting}
              className="flex-1 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {password.isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
            <button
              onClick={() => setPassword((prev) => ({ ...prev, show: false }))}
              className="flex-1 px-6 py-3 border border-amber-300 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
