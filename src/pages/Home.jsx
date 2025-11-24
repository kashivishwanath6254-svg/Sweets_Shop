import { NavLink } from "react-router-dom";

function Home() {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/8887061/pexels-photo-8887061.jpeg')",
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-900/40 via-amber-800/30 to-amber-900/50"></div>

      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="max-w-3xl">
          {/* Decorative elements */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-1 bg-amber-400 rounded-full"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-linear-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
              SHOP NAME
            </span>
          </h1>

          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 border-t-2  border-l-2 border-amber-400 transform rotate-45"></div>
          </div>

          <p className="text-2xl md:text-3xl font-light text-amber-100 mb-10 leading-relaxed drop-shadow-lg">
            Traditional sweets crafted with{" "}
            <span className="text-amber-300 font-semibold">love</span>,
            <span className="text-amber-300 font-semibold"> heritage</span>, and
            <span className="text-amber-300 font-semibold"> passion</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-10 py-4 text-lg font-semibold bg-linear-to-r from-amber-500 to-amber-400 text-amber-50 rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform">
              <NavLink to="/products" className="flex items-center gap-2">
                View Products
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </NavLink>
            </button>

            <button className="px-8 py-4 text-lg font-semibold border-2 border-amber-300 text-amber-100 rounded-xl hover:bg-amber-300/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <NavLink to="/about">Our Story</NavLink>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-amber-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Home;
