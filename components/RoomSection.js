"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function PGSection({ rooms }) {
  const router = useRouter();

  return (
    <section id="rooms" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Orange gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-transparent to-orange-400/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-white mb-3 tracking-tight"
          >
            Featured PGs & Hostels in Indore
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Explore affordable and comfortable stays for students &
            professionals
          </motion.p>
        </div>

        {/* PG Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room._id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={room.images?.[0] || "/pg-placeholder.jpg"}
                  alt={room.propertyName}
                  width={800}
                  height={400}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => router.push(`/rooms-details/${room._id}`)}
                />

                {/* Room Type */}
                <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {room.roomType}
                </span>

                {/* Gender */}
                <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {room.genderAllowed}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                  {room.propertyName}
                </h3>

                {/* Location */}
                <p className="text-gray-400 text-sm mb-3">
                  {room.address}, {room.city}, {room.state}
                </p>

                {/* Beds Info */}
                <div className="flex justify-between text-sm text-gray-300 mb-3">
                  <span>
                    Beds:{" "}
                    <span className="text-white font-medium">
                      {room.availableBeds}/{room.totalBeds}
                    </span>
                  </span>
                  <span
                    className={`font-medium ${
                      room.availableBeds > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {room.availableBeds > 0 ? "Available" : "Full"}
                  </span>
                </div>

                {/* Description */}
                {room.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {room.description}
                  </p>
                )}

                {/* Price + CTA */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-orange-400">
                      ₹{room.pricePerMonth}
                    </span>
                    <span className="text-gray-400 text-sm"> / month</span>
                  </div>

                  <Link href={`/rooms-details/${room._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="bg-transparent border-2 cursor-pointer border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg transition-all duration-300"
            onClick={() => router.push("/Rooms")}
          >
            View All PGs
          </button>
        </div>
      </div>
    </section>
  );
}
