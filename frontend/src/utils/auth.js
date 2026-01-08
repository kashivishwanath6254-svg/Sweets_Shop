export function isAdminAuthenticated() {
  return (
    localStorage.getItem("isAdmin") === "true" ||
    sessionStorage.getItem("isAdmin") === "true"
  );
}
