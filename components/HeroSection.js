"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center text-white max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect{" "}
            <span className="block text-orange-500">Stay</span>
          </h1>

          <p className="text-lg md:text-2xl mb-12 text-gray-200">
            Discover beautiful hotels and resorts around the world at the best
            prices.
          </p>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Destination */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-300" size={20} />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:border-orange-400 focus:outline-none"
                />
              </div>

              {/* Check-in */}
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-300" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:border-orange-400 focus:outline-none"
                />
              </div>

              {/* Check-out */}
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-300" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:border-orange-400 focus:outline-none"
                />
              </div>

              {/* Guests */}
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-300" size={20} />
                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:border-orange-400 focus:outline-none">
                  <option value="">Guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <Search size={20} />
              <span>Search Hotels</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
