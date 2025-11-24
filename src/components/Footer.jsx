import { NavLink } from "react-router-dom";

function Footer() {
  const links = ["/", "/products", "/about", "/contact"];
  const labels = ["Home", "Products", "About Us", "Contact Us"];

  const socialLinks = [
    { icon: "📘", name: "Facebook", url: "#" },
    { icon: "📷", name: "Instagram", url: "#" },
    { icon: "🐦", name: "Twitter", url: "#" },
    { icon: "💬", name: "WhatsApp", url: "#" },
  ];

  return (
    <footer className="bg-linear-to-b from-amber-900 to-amber-950 text-amber-100 pt-16 pb-8 px-6 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-amber-900 font-bold text-xl">S</span>
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent tracking-wider">
                SweetShop
              </h2>
            </div>
            <p className="text-amber-200/80 leading-relaxed text-sm">
              Premium traditional sweets crafted with generations of expertise,
              love, and authentic recipes since 1990.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-amber-800/50 rounded-lg flex items-center justify-center 
                           hover:bg-amber-700 hover:scale-110 transition-all duration-300 
                           border border-amber-600/30 hover:border-amber-400/50"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-200 mb-6 pb-2 border-b border-amber-500/30 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {links.map((path, index) => (
                <li key={index}>
                  <NavLink
                    to={path}
                    className="text-amber-200/80 hover:text-amber-100 transition-all duration-300 
                              hover:translate-x-2 hover:underline underline-offset-4 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100"></span>
                    {labels[index]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-lg font-semibold text-amber-200 mb-6 pb-2 border-b border-amber-500/30 inline-block">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">📍</span>
                <div>
                  <p className="font-medium text-amber-100">Our Location</p>
                  <p className="text-amber-200/80 text-sm">
                    123 Sweet Street, Delhi, India 110001
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">📞</span>
                <div>
                  <p className="font-medium text-amber-100">Call Us</p>
                  <p className="text-amber-200/80 text-sm">+91 98765 43210</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 mt-1">✉️</span>
                <div>
                  <p className="font-medium text-amber-100">Email Us</p>
                  <p className="text-amber-200/80 text-sm">
                    hello@sweetshop.com
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4 - Hours */}
          <div>
            <h3 className="text-lg font-semibold text-amber-200 mb-6 pb-2 border-b border-amber-500/30 inline-block">
              Opening Hours
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-amber-200/80">
                <span>Mon - Sun</span>
                <span className="text-amber-100">9:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between text-amber-200/80">
                <span>Festivals</span>
                <span className="text-amber-100">7:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-amber-200/80">
                <span>Holidays</span>
                <span className="text-amber-100">Open</span>
              </li>
            </ul>
            {/* Special Offer */}
            <div className="mt-6 p-4 bg-linear-to-r from-amber-600/20 to-amber-500/20 rounded-xl border border-amber-500/30">
              <p className="text-amber-200 text-sm font-semibold">
                🎉 Festival Special!
              </p>
              <p className="text-amber-200/80 text-xs mt-1">
                Extra 10% off on all orders
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-500/20 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-amber-200/70 text-sm">
            © 2025{" "}
            <span className="text-amber-300 font-semibold">SweetShop</span> —
            All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-amber-200/70">
            <a
              href="#"
              className="hover:text-amber-300 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-amber-300 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-amber-300 transition-colors duration-300"
            >
              Shipping Info
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="flex justify-center mt-8">
          <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-amber-400 rounded-full"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
