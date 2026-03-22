import { createContext, useState, useEffect } from "react";
import { AuthApi } from "../services/AuthApi";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  // 🔹 Restore session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await AuthApi.getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔹 Login
  const login = async (email, password) => {
    const data = await AuthApi.login(email, password);
    setUser(data.user); // Set full user data from backend
    return data;
  };

  // 🔹 Register
  const register = async (email, password, profileName) => {
    const data = await AuthApi.register(email, password, profileName);
    setUser(data.user); // Set full user data from backend
    return data;
  };

  // 🔹 Logout
  const logout = async () => {
    await AuthApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
