import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../utils/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(AdminContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const authEmail = "admin@sweetshop.com";
    const authPassword = "admin123";

    if (email === authEmail && password === authPassword) {
      setError(null);
      setIsAdmin(true);
      navigate("/admin");

      localStorage.removeItem("isAdmin");
      sessionStorage.removeItem("isAdmin");

      if (remember) {
        localStorage.setItem("isAdmin", "true");
      } else {
        sessionStorage.setItem("isAdmin", "true");
      }
    } else {
      console.error("Invalid user!!!");
      setError("Invalid Credentials");
    }
  };

  const homePage = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-amber-50 to-amber-100 flex flex-col items-center justify-center p-6">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-amber-200/20 to-amber-300/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-amber-200/20 to-amber-300/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200 relative z-10">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-600 to-amber-500 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-3xl text-white">👑</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SweetShop Admin
          </h1>
          <p className="text-amber-100">Secure Admin Access</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                  ✉️
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                  placeholder="admin@sweetshop.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(null);
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                  🔒
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError(null);
                  }}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-600 transition"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((prev) => !prev)}
                  className="w-4 h-4 text-amber-500 rounded border-amber-300 focus:ring-amber-400"
                />
                <span className="ml-2 text-sm text-amber-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-amber-500 hover:text-amber-700 transition"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                ❌ {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              Sign In to Admin Panel
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm font-medium text-amber-700 mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-amber-600">
                📧 Email: <span className="font-mono">admin@sweetshop.com</span>
              </p>
              <p className="text-amber-600">
                🔑 Password: <span className="font-mono">admin123</span>
              </p>
            </div>
            <p className="text-xs text-amber-500 mt-3">
              ⚠️ In production, use secure authentication methods
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-amber-200 p-4 text-center">
          <p className="text-sm text-amber-500">
            For authorized personnel only. Unauthorized access prohibited.
          </p>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-8 text-center">
        <button
          onClick={homePage}
          className="text-amber-600 hover:text-amber-700 transition flex items-center gap-2"
        >
          ← Continue as regular user
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
