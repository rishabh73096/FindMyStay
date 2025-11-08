"use client";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Aarav Singh",
    location: "Vijay Nagar, Indore",
    rating: 5,
    comment:
      "The PG I booked through Find My Stay was exactly as shown — clean rooms, friendly owners, and safe locality. Totally worth it!",
    avatar:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Neha Verma",
    location: "Bhawarkua, Indore",
    rating: 5,
    comment:
      "Best platform for finding girls’ PGs in Indore! Verified listings and quick response from landlords made my move super easy.",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rohit Patel",
    location: "Palasia, Indore",
    rating: 4,
    comment:
      "Smooth booking experience and good PG options under budget. Would love to see more food-inclusive stays listed soon.",
    avatar:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80",
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
            What Our Residents Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Honest feedback from students and professionals living in Indore PGs through Find My Stay.
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
                <div className="relative w-14 h-14 mr-5">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
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
