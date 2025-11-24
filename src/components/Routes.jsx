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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="products" element={<Products />} />
    </Route>
  )
);

export default router;
