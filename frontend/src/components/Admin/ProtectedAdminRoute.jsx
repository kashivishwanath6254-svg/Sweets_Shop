import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../utils/AuthContext.jsx";

function ProtectedAdminRoute({ children }) {
  const { isAdmin } = useContext(AdminContext);
  if (!isAdmin) {
    return <Navigate to={"/admin/login"} replace />;
  }
  return children;
}

export default ProtectedAdminRoute;
