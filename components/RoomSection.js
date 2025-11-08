"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, ArrowRight } from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Comfort PG for Boys",
    price: "₹6,499",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "3 Meals", "Laundry", "Study Table"],
    location: "Vijay Nagar, Indore",
  },
  {
    id: 2,
    name: "Cozy Girls Hostel",
    price: "₹7,999",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1590303200076-8dac38dde3ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    amenities: ["Security 24/7", "AC Rooms", "Common Kitchen", "Gym Access"],
    location: "Bhawarkua, Indore",
  },
  {
    id: 3,
    name: "Student PG with Balcony",
    price: "₹5,999",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1719530678751-83dcf8e1e899?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    amenities: ["Attached Washroom", "Parking", "CCTV", "Housekeeping"],
    location: "Geeta Bhawan, Indore",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function PGSection() {
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
            Explore affordable and comfortable stays for students & professionals
          </motion.p>
        </div>

        {/* PG Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {room.location}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{room.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="text-orange-400 fill-current" size={16} />
                    <span className="text-white text-sm">{room.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {room.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-gray-300 text-sm flex items-center"
                    >
                      <CheckCircle className="text-green-400 mr-1" size={12} />
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-orange-400">
                      {room.price}
                    </span>
                    <span className="text-gray-300 text-sm">/month</span>
                  </div>

                  <Link href={`/`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/rooms">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg transition-all duration-300"
            >
              View All PGs
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
