
import { useState } from "react"
import { Apple, BookOpen, ChevronUp, Heart } from "lucide-react"

export default function FooterMinimal() {
  const [isVisible, setIsVisible] = useState(false)

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Essential navigation links
  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Support", href: "#support" },
    { name: "About", href: "#about" },
  ]

  // Legal links
  const legalLinks = [
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
  ]

  return (
    <footer className="relative bg-black border-t border-neutral-800">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Brand Section */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Chaicode</span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-wrap justify-center sm:justify-start gap-6">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-neutral-400 hover:text-orange-400 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
              <button className="group flex items-center justify-center space-x-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 text-white font-medium text-sm rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <Apple className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs text-neutral-400 leading-none">Download on</div>
                  <div className="text-sm font-semibold leading-none">App Store</div>
                </div>
              </button>

              <button className="group flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium text-sm rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xs">▶</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-green-100 leading-none">Get it on</div>
                  <div className="text-sm font-semibold leading-none">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            {/* Copyright & Love */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <p className="text-neutral-500 text-sm">© 2024 StudyMate. All rights reserved.</p>
              <div className="flex items-center justify-center sm:justify-start space-x-1 text-neutral-500 text-sm">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span>for students</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex justify-center sm:justify-end space-x-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-neutral-500 hover:text-orange-400 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top Button - Only show on scroll */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-orange-500 text-neutral-400 hover:text-orange-400 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-20"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  )
}
