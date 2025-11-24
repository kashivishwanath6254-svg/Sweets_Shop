function About() {
  return (
    <section className="bg-linear-to-br from-amber-50 to-amber-100 text-amber-900 py-20 px-6">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-1 bg-amber-400 rounded-full"></div>
        </div>
        <h1 className="text-6xl font-bold mb-6 bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-xl text-amber-600/80 max-w-2xl mx-auto leading-relaxed">
          Crafting sweetness since 1990 — with love, tradition, and purity.
        </p>
      </div>

      {/* Image + Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
        <div className="relative group">
          <div className="h-80 bg-linear-to-br from-amber-200 to-amber-100 rounded-2xl shadow-xl flex items-center justify-center border border-amber-200 relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23d97706%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
            <img
              src="https://www.saladplate.com/wp-content/uploads/2024/02/BSS-11-1024x761.jpg"
              alt="Our sweet Kitchen"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          </div>
          {/* Decorative corner accents */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-8 bg-amber-500 rounded-full"></div>
            <h2 className="text-4xl font-bold text-amber-800">Our Story</h2>
          </div>
          <p className="text-lg leading-relaxed text-amber-700/90">
            We began as a small family-run sweet shop with one goal — to deliver
            authentic Indian sweets made with pure ingredients and traditional
            recipes passed down through generations.
          </p>
          <p className="text-lg leading-relaxed text-amber-700/90">
            Today, we continue serving happiness through handcrafted sweets
            prepared daily, using premium ingredients and time-tested methods
            that have stood the test of time.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex-1 h-0.5 bg-amber-200"></div>
            <span className="text-amber-500 font-semibold text-sm">
              Since 1990
            </span>
            <div className="flex-1 h-0.5 bg-amber-200"></div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-800 mb-4">
            Our Promise
          </h2>
          <p className="text-amber-600/80 max-w-2xl mx-auto">
            Quality and tradition in every bite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🌿",
              title: "Freshly Made",
              description:
                "Made in small batches every day with the finest ingredients",
              color: "from-green-400 to-amber-400",
            },
            {
              icon: "✨",
              title: "100% Pure",
              description:
                "No artificial colors, flavors, or preservatives ever",
              color: "from-blue-400 to-amber-400",
            },
            {
              icon: "👑",
              title: "Traditional Taste",
              description:
                "Authentic recipes preserved from generations of mastery",
              color: "from-amber-500 to-orange-400",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-amber-100"
            >
              <div
                className={`text-4xl mb-4 w-16 h-16 rounded-full bg-linear-to-r ${value.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
              >
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-amber-800 text-center mb-3">
                {value.title}
              </h3>
              <p className="text-amber-600/90 text-center leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Founder Quote */}
        <div className="mt-16 p-8 bg-linear-to-r from-amber-500 to-amber-400 rounded-2xl text-center text-white shadow-xl">
          <div className="text-6xl mb-4">❝</div>
          <p className="text-xl font-light italic mb-4 max-w-3xl mx-auto">
            "Sweetness is not just in our products, but in the love and
            tradition we pour into every creation."
          </p>
          <p className="font-semibold">— Family Founders</p>
        </div>
      </div>
    </section>
  );
}

export default About;
