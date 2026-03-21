import { useState } from "react";
import { useEffect } from "react";
import API_BASE_URL from "../config/api.js";
import ProductCard from "../components/ProductCard.jsx";

function Products() {
  const [products, setProducts] = useState({ categories: [] });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducts(result);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="text-amber-900 py-16 px-6 bg-amber-50 min-h-screen">
      <h1 className="text-5xl font-extrabold tracking-wider mb-4 text-center text-amber-700 drop-shadow-lg">
        Our Products
      </h1>
      <p className="text-lg text-center mb-14 text-amber-600/80">
        Celebrate sweetness with our freshly made delights.
      </p>

      {products.categories.map((category) => (
        <div key={category.category} className="mb-20">
          <h2
            className="text-3xl font-bold mb-10 pb-2 inline-block
                    border-b-4 border-amber-500 tracking-wide text-amber-800"
          >
            {category.category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.items.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Products;
