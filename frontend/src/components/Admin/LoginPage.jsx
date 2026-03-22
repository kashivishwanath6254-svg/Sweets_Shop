import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileName, setProfileName] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);

  // Function to fill demo credentials
  const fillDemoCredentials = () => {
    setEmail("admin@sweets.com");
    setPassword("admin123");
    setError(null);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let user;
      if (isRegisterMode) {
        // Registration logic
        user = await register(email, password, profileName);
        // After successful registration, redirect to profile page
        navigate("/profile");
      } else {
        // Login logic
        user = await login(email, password);

        // Handle role-based routing
        switch (user.user.role) {
          case "admin":
            navigate("/admin");
            break;
          case "user":
            navigate("/profile");
            break;
        }
      }
    } catch (error) {
      setError(
        error.message ||
          (isRegisterMode ? "Registration failed" : "Invalid credentials"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError(null);
    setProfileName("");
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
            {isRegisterMode ? "Join SweetShop" : "Welcome to SweetShop"}
          </h1>
          <p className="text-amber-100">
            {isRegisterMode ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                  ✉️
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(null);
                  }}
                />
              </div>
            </div>

            {/* Profile Name Input - Only shown in registration mode */}
            {isRegisterMode && (
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-2">
                  Profile Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                    👤
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                    placeholder="Your name"
                    value={profileName}
                    onChange={(event) => {
                      setProfileName(event.target.value);
                      setError(null);
                    }}
                  />
                </div>
              </div>
            )}

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
              disabled={isLoading}
              className="w-full py-4 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isRegisterMode ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                <>{isRegisterMode ? "Create Account" : "Sign In"}</>
              )}
            </button>
          </form>

          {/* Demo Credentials Section - Only shown in login mode */}
          {!isRegisterMode && (
            <div className="mt-8 p-5 bg-linear-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-300/30 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-amber-700">🔐</span>
                </div>
                <p className="text-sm font-semibold text-amber-800">
                  Demo Admin Credentials
                </p>
              </div>
              <div className="space-y-2.5 pl-11">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600">📧</span>
                  <div>
                    <p className="text-xs text-amber-500">Email</p>
                    <p className="text-sm font-mono text-amber-700">
                      admin@sweets.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600">🔑</span>
                  <div>
                    <p className="text-xs text-amber-500">Password</p>
                    <p className="text-sm font-mono text-amber-700">admin123</p>
                  </div>
                </div>
              </div>

              {/* Auto-fill button */}
              <div className="mt-4 pt-3 border-t border-amber-300/30">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="w-full py-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors flex items-center justify-center gap-2 group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    ⚡
                  </span>
                  Click to auto-fill demo credentials
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
                <p className="text-xs text-amber-500/80 text-center mt-3">
                  ⚠️ For demonstration only. Use secure authentication in
                  production.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-amber-200 p-4 text-center">
          {/* Toggle between login and register */}
          <div className="mb-3">
            <button
              type="button"
              onClick={toggleMode}
              className="text-amber-600 hover:text-amber-700 transition font-medium"
            >
              {isRegisterMode
                ? "Already have an account? Sign In"
                : "New User? Register Now"}
            </button>
          </div>
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

export default LoginPage;
