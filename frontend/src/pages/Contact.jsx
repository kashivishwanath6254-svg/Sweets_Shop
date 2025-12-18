function Contact() {
  return (
    <section className="bg-linear-to-br from-amber-50 to-amber-100 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-1 bg-amber-400 rounded-full"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-amber-600/80 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out to us for any inquiries,
            orders, or just to say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              Send us a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-amber-700 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-amber-700 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-amber-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-amber-700 font-medium">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-amber-700 font-medium">Message</label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-amber-50/50 resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                Get in Touch
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Visit Our Shop",
                    details: ["123 Sweet Street", "Delhi, India 110001"],
                    color: "from-amber-400 to-orange-400",
                  },
                  {
                    icon: "📞",
                    title: "Call Us",
                    details: ["+91 98765 43210", "+91 98765 43211"],
                    color: "from-green-400 to-amber-400",
                  },
                  {
                    icon: "✉️",
                    title: "Email Us",
                    details: ["hello@sweetshop.com", "orders@sweetshop.com"],
                    color: "from-blue-400 to-amber-400",
                  },
                  {
                    icon: "🕒",
                    title: "Opening Hours",
                    details: [
                      "Mon-Sun: 9:00 AM - 9:00 PM",
                      "Festivals: 7:00 AM - 11:00 PM",
                    ],
                    color: "from-purple-400 to-amber-400",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-r ${item.color} flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-800 mb-1">
                        {item.title}
                      </h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-amber-600/90 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-linear-to-r from-amber-500 to-amber-400 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center gap-4">
                {[
                  { icon: "📘", label: "Facebook" },
                  { icon: "📷", label: "Instagram" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "💬", label: "WhatsApp" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
