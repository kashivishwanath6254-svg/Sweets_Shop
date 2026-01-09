import { useState } from "react";
import { useEffect } from "react";
// import products from "../json/products.json";

function Products() {
  const [products, setProducts] = useState({ categories: [] });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white shadow-lg
                       hover:shadow-2xl hover:shadow-amber-200/50
                       hover:scale-[1.02] transition-all duration-300 border border-amber-200 flex flex-col h-full"
              >
                <div className="h-48 bg-linear-to-br from-amber-100 to-amber-50 rounded-xl mb-5 flex items-center justify-center border border-amber-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      item.image ? "hidden" : "flex"
                    }`}
                  >
                    <span className="text-amber-400 italic text-center px-4">
                      {item.name}
                      <br />
                      <span className="text-sm">(Image coming soon)</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 tracking-wide text-amber-800">
                  {item.name}
                </h3>

                <p className="text-amber-600/90 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <span className="text-2xl font-extrabold bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                  ₹{item.price}/Kg
                </span>

                <button
                  className="mt-auto w-full py-3 rounded-xl bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold
                               hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Add to Cart
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Products;
