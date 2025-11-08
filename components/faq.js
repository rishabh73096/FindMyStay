import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "How can I book a PG in Indore?",
      answer:
        "Browse through available PGs, select your preferred location and room type, and click on 'Book Now'. Fill in your details and confirm your booking instantly.",
    },
    {
      question: "What types of PGs are available?",
      answer:
        "You can find options like boys’ PGs, girls’ PGs, co-living spaces, and hostels. Each property includes details such as meals, Wi-Fi, laundry, and other facilities.",
    },
    {
      question: "Is food included in the rent?",
      answer:
        "Most PGs in Indore offer food-inclusive rent, usually two or three meals per day. You can check the amenities section on each property page to confirm.",
    },
    {
      question: "What is the cancellation or refund policy?",
      answer:
        "You can cancel your booking before check-in. Refunds depend on the property’s policy — most PGs provide partial refunds if canceled within a specific period.",
    },
    {
      question: "Can I visit the PG before booking?",
      answer:
        "Yes, you can schedule a visit through our platform. Contact the listed property owner, and they’ll arrange a convenient time for you to visit.",
    },
    {
      question: "How can I contact support for help?",
      answer:
        "Our support team is available 24/7. You can reach us through the Contact Us page, live chat, or email at support@findmystay.com.",
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-transparent to-orange-400/10" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
            Everything you need to know about PGs and hostels in Indore.
          </p>
        </div>

        {/* FAQ List */}
        <div className="grid gap-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="group bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/10 transition-all duration-500 hover:bg-white/[0.04]"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white group-hover:text-gray-100 transition-colors duration-300">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openItems[index] ? (
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  )}
                </div>
              </button>

              {openItems[index] && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed font-light">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/[0.08] p-8">
            <h3 className="text-2xl font-light mb-3 text-white">
              Still have questions?
            </h3>
            <p className="text-gray-400 font-light mb-6 max-w-xl mx-auto">
              Our team is here to help you find the perfect PG or hostel in Indore.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ContactUs"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Contact Support
              </Link>
              <button className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/30">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
