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
import AdminLogin from "./Admin/AdminLogin";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";
import ProtectedLoginRoute from "./Admin/ProtectedLoginRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="products" element={<Products />} />
      <Route
        path="admin"
        element={
          <ProtectedAdminRoute>
            <AdminPanel />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="admin/login"
        element={
          <ProtectedLoginRoute>
            <AdminLogin />
          </ProtectedLoginRoute>
        }
      />
    </Route>,
  ),
);

export default router;
