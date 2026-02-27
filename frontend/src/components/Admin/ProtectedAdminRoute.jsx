import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.jsx";

function ProtectedAdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "admin") {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}

export default ProtectedAdminRoute;
