import { createContext, useState } from "react";
import { isAdminAuthenticated } from "./auth";

const AdminContext = createContext(null);

function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(isAdminAuthenticated());

  const onLogout = () => {
    localStorage.removeItem("isAdmin");
    sessionStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, onLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext, AdminProvider };
