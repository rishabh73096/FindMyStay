
import { useState } from "react"
import { Plus, Minus } from "lucide-react"

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative ">
       <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-transparent to-orange-400/10" />
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl mb-4 border border-white/10">
            <div className="w-6 h-6 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xs">?</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-tight">
            Frequently Asked
            <span className="block font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our platform and services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="grid gap-4">
          {/* FAQ Item 1 */}
          <div className="group">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]">
              <button
                onClick={() => toggleItem(0)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                  How do I place an order?
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems[0] ? (
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
              </button>
              {openItems[0] && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Browse our collection, add items to your cart, and proceed through checkout. Provide your shipping
                    details and payment information to complete your purchase.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="group">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]">
              <button
                onClick={() => toggleItem(1)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                  What payment methods are accepted?
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems[1] ? (
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
              </button>
              {openItems[1] && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed font-light">
                    We accept all major credit cards, debit cards, UPI payments, net banking, and digital wallets. All
                    transactions are secured through trusted payment partners.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="group">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]">
              <button
                onClick={() => toggleItem(2)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                  What are your shipping timeframes?
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems[2] ? (
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
              </button>
              {openItems[2] && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Standard delivery takes 3-5 business days, while express shipping arrives within 1-2 business days.
                    You'll receive tracking information via email.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Item 4 */}
          <div className="group">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]">
              <button
                onClick={() => toggleItem(3)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                  How does your return policy work?
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems[3] ? (
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
              </button>
              {openItems[3] && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed font-light">
                    We offer a 30-day return window for unused items in original packaging. Size and color exchanges are
                    available within 15 days.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Item 5 */}
          <div className="group">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]">
              <button
                onClick={() => toggleItem(4)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                  Can I track my order status?
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems[4] ? (
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
              </button>
              {openItems[4] && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Yes, once shipped you'll receive a tracking number via email. You can also monitor progress through
                    your account dashboard.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Item 6 */}
          <div className="group">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]">
              <button
                onClick={() => toggleItem(5)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                  How can I reach customer support?
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems[5] ? (
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
              </button>
              {openItems[5] && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Our support team is available 24/7 via email at support@example.com, phone at +1-800-123-4567, or
                    through live chat.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.08] p-8">
            <h3 className="text-2xl font-light mb-3 text-white">Still have questions?</h3>
            <p className="text-gray-400 font-light mb-6 max-w-xl mx-auto">
              Our team is here to provide personalized assistance for any specific questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 ">
                Contact Support
              </button>
              <button className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/30">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

