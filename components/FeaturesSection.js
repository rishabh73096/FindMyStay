"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Shield, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Best Price Guarantee",
    desc: "Found a lower price elsewhere? We’ll match it instantly.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    link: "/offers",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    desc: "Your data and payments are encrypted with top-tier security.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    link: "/security",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Need help? Our friendly team is available round the clock.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    link: "/support",
  },
  {
    icon: CheckCircle,
    title: "Easy Cancellation",
    desc: "Change of plans? Modify or cancel bookings with ease.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    link: "/cancellation",
  },
];

const FeaturesSection = () => (
  <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
    {/* Decorative background */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10"></div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Why Choose <span className="text-orange-500">Find My Stay?</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover comfort, security, and savings — all in one seamless booking experience.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
          >
            {/* Feature Image */}
            <div className="relative w-full h-40">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20"></div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 mb-4">{feature.desc}</p>

              <Link
                href={feature.link}
                className="inline-block text-orange-400 font-medium hover:text-orange-300 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
