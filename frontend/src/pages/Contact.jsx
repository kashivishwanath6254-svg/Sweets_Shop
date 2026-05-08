import { GradientBackground, SectionHeader } from "../components/ui/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input, { Textarea } from "../components/ui/Input";
import { AccentLine } from "../components/ui/Decorative";
function Contact() {
  return (
    <GradientBackground className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title="Contact Us"
          subtitle="We'd love to hear from you. Reach out to us for any inquiries, orders, or just to say hello!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card variant="section">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-3">
              <AccentLine variant="small" />
              Send us a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="First Name"
                  type="text"
                  placeholder="John"
                  variant="form"
                />
                <Input 
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  variant="form"
                />
              </div>

              <Input 
                label="Email"
                type="email"
                placeholder="john@example.com"
                variant="form"
              />

              <Input 
                label="Subject"
                type="text"
                placeholder="How can we help you?"
                variant="form"
              />

              <Textarea 
                label="Message"
                placeholder="Tell us more about your inquiry..."
                variant="form"
              />

              <Button variant="fullWidth" type="submit">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-3">
                <AccentLine variant="small" />
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
    </GradientBackground>
  );
}

export default Contact;
