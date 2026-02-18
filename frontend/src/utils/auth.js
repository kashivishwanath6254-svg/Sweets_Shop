import { isUserAuthenticated, getUserRole } from "./jwtUtils";

export function isAdminAuthenticated() {
  const hasToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // Check if user is authenticated and has admin role
  if (isUserAuthenticated() && hasToken) {
    const userRole = getUserRole();
    return userRole === "admin";
  }

  return false;
}
