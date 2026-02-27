import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../data/App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Products from "../pages/Products";
import AdminPanel from "../pages/AdminPanel";
import LoginPage from "./Admin/LoginPage";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";
import ProtectedLoginRoute from "./Admin/ProtectedLoginRoute";
import ProfilePage from "../pages/ProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="products" element={<Products />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route
        path="admin"
        element={
          <ProtectedAdminRoute>
            <AdminPanel />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedLoginRoute>
            <LoginPage />
          </ProtectedLoginRoute>
        }
      />
    </Route>,
  ),
);

export default router;
