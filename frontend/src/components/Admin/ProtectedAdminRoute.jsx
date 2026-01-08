import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../../utils/auth.js";

function ProtectedAdminRoute({ children }) {
  if (isAdminAuthenticated() !== true) {
    return <Navigate to={"/admin/login"} replace />;
  }
  return children;
}

export default ProtectedAdminRoute;
