import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../../utils/AuthContext";

function ProtectedLoginRoute({ children }) {
  const { isAdmin } = useContext(AdminContext);
  if (isAdmin) {
    return <Navigate to={"/admin"} replace />;
  }
  return children;
}

export default ProtectedLoginRoute;
