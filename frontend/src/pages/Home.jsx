import { NavLink } from "react-router-dom";
import { HeroSection } from "../components/ui/Layout";
import Button from "../components/ui/Button";

function Home() {
  return (
    <HeroSection 
      title="SHOP NAME"
      subtitle="Traditional sweets crafted with love, heritage, and passion."
      backgroundImage="https://images.pexels.com/photos/8887061/pexels-photo-8887061.jpeg"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button variant="primary" className="group px-10 py-4 text-lg">
          <NavLink to="/products" className="flex items-center gap-2">
            View Products
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </NavLink>
        </Button>

        <Button variant="secondary" className="px-8 py-4 text-lg">
          <NavLink to="/about">Our Story</NavLink>
        </Button>
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
    </HeroSection>
  );
}

export default Home;
