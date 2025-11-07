"use client";
import { motion } from "motion/react"
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    comment:
      "Amazing experience! The booking process was seamless and the hotel exceeded all expectations. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Rahul Gupta",
    location: "Bangalore",
    rating: 5,
    comment:
      "Find My Stay made our vacation planning so easy. Great prices and excellent customer service!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Anjali Patel",
    location: "Ahmedabad",
    rating: 4,
    comment:
      "Wonderful platform with great variety of hotels. The room was exactly as shown in photos.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Gradient accent background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-transparent to-orange-400/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-white mb-3 tracking-tight"
          >
            What Our Guests Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Hear from travelers who found their perfect stay with us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-5">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold text-lg">{t.name}</h4>
                  <p className="text-gray-400 text-sm">{t.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className={
                      j < t.rating
                        ? "text-orange-400 fill-current"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-300 italic leading-relaxed">
                “{t.comment}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
