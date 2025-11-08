"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import Image from "next/image";

const heroImages = [
  "https://images.unsplash.com/photo-1587135899865-a4f9880a0892?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // PG interior
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // hostel common room
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", // student PG building
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative w-full h-screen">
              <Image
                src={image}
                alt={`Hero PG Slide ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                sizes="100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center text-white max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your Ideal <span className="text-orange-500">PG / Hostel in Indore</span>
          </h1>

          <p className="text-lg md:text-2xl mb-12 text-gray-200">
            Comfortable, affordable PGs and hostels in Indore city — all verified for your peace of mind.
          </p>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Location (fixed to Indore) */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-300" size={20} />
                <input
                  type="text"
                  placeholder="Indore, MP"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-orange-500 focus:outline-none placeholder-gray-300"
                  disabled
                />
              </div>

              {/* Check-in */}
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-300" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Check-out */}
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-300" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Guests */}
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-300" size={20} />
                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-orange-500 focus:outline-none">
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
              <span>Search PGs/ hostels </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
