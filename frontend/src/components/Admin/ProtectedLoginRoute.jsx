import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../../utils/auth.js";

function ProtectedLoginRoute({ children }) {
  if (isAdminAuthenticated() === true) {
    return <Navigate to={"/admin"} replace />;
  }
  return children;
}

export default ProtectedLoginRoute;
