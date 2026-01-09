import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AdminContext } from "../utils/AuthContext";

function Navbar() {
  const { isAdmin, onLogout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleLogout = () => {
    onLogout();
    navigate("/admin/login");
  };

  const [isOpen, setIsOpen] = useState(false);

  // const links = ["/", "/products", "/about", "/contact", "/admin"];
  // const labels = ["Home", "Products", "About Us", "Contact Us", "Admin"];
  const links = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
    ...(isAdmin ? [{ path: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="bg-linear-to-r from-amber-900 to-amber-800 shadow-2xl sticky top-0 w-full z-50 border-b border-amber-500/30">
      <div className="flex justify-between items-center px-6 lg:px-12 py-4">
        {/* LOGO - Enhanced */}
        <NavLink to="/" className="group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-amber-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-amber-900 font-bold text-lg">S</span>
            </div>
            <div className="text-2xl font-bold bg-linear-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent tracking-wider drop-shadow-lg">
              SweetShop
            </div>
          </div>
        </NavLink>

        {/* Desktop Links - Enhanced */}
        <ul className="hidden md:flex gap-8 text-lg">
          {links.map((path, index) => (
            <li key={index}>
              <NavLink
                to={path.path}
                className={({ isActive }) =>
                  `relative transition-all duration-500 pb-2 font-medium
                  ${
                    isActive
                      ? "text-amber-100 [text-shadow:0_0_10px_rgba(251,191,36,0.8)]"
                      : "text-amber-200/90 hover:text-amber-100 hover:scale-105"
                  }
                  after:content-[''] after:absolute after:left-0 after:bottom-0 
                  after:h-0.5 after:w-full after:bg-linear-to-r after:from-amber-400 after:to-amber-300 
                  after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                  ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}`
                }
              >
                {path.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Login/Logout Button */}
        <div className="hidden md:flex">
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-400 text-amber-50 font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 hover:scale-105 border border-amber-300/30"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-400 text-amber-50 font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 hover:scale-105 border border-amber-300/30"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger (mobile) - Enhanced */}
        <button
          className="flex flex-col gap-1.5 md:hidden group z-51 p-2 rounded-lg hover:bg-amber-700/50 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-amber-200 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-amber-200 transition-all duration-300 ${
              isOpen ? "opacity-0 -translate-x-4" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-amber-200 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Backdrop overlay for mobile - ONLY this has blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer - NO backdrop blur here */}
      <div
        className={`fixed top-0 right-0 h-full w-80 
        bg-linear-to-b from-amber-900 to-amber-800
        border-l border-amber-500/20 shadow-2xl
        flex flex-col gap-8 pt-32 px-8
        transform transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:hidden z-50`}
      >
        {/* Decorative elements */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-amber-400/50 rounded-tl-lg"></div>
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-amber-400/50 rounded-br-lg"></div>

        {links.map((path, index) => (
          <NavLink
            key={index}
            to={path.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-amber-100 text-xl font-medium tracking-wide transition-all duration-300 py-3 px-4 rounded-xl
              ${
                isActive
                  ? "bg-amber-700/50 text-amber-50 shadow-inner border border-amber-500/30"
                  : "hover:bg-amber-700/30 hover:scale-105 hover:shadow-lg"
              }`
            }
          >
            {path.label}
          </NavLink>
        ))}

        {/* Mobile CTA Button */}
        {isAdmin ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-400 text-amber-50 font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 hover:scale-105 border border-amber-300/30"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-400 text-amber-50 font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 hover:scale-105 border border-amber-300/30"
          >
            Login
          </button>
        )}

        {/* Contact info in mobile drawer */}
        <div className="mt-auto mb-8 p-4 bg-amber-800/50 rounded-xl border border-amber-500/20">
          <p className="text-amber-200 text-sm">📞 +91 98765 43210</p>
          <p className="text-amber-200/80 text-xs mt-1">Mon-Sun: 9AM - 9PM</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
