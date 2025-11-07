import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHome, FaUsers, FaHandshake, FaMapMarkedAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const features = [
  {
    icon: <FaHome className="text-4xl mb-3 text-orange-400" />,
    title: "Easy Property Discovery",
    description:
      "Find verified rental homes, apartments, and PGs with accurate details, images, and owner information – all in one place.",
  },
  {
    icon: <FaUsers className="text-4xl mb-3 text-orange-400" />,
    title: "Connecting Owners & Tenants",
    description:
      "We simplify communication between owners and tenants through a transparent, reliable, and user-friendly platform.",
  },
  {
    icon: <FaHandshake className="text-4xl mb-3 text-orange-400" />,
    title: "Secure & Hassle-Free Deals",
    description:
      "Our platform ensures that every stay or property deal is handled safely and efficiently, with clear rental terms.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl mb-3 text-orange-400" />,
    title: "Verified Listings Only",
    description:
      "All listings are verified to help you rent or stay confidently, without worrying about fake or outdated information.",
  },
];

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us | Find My Stay</title>
        <meta
          name="description"
          content="Find My Stay helps users easily discover verified rental homes and properties. We connect tenants and owners directly for secure and stress-free stays."
        />
      </Head>

      <Navbar />

      <div className="relative py-16 bg-slate-900 text-white overflow-hidden">
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-transparent to-orange-400/10" />

        <div className="relative px-4 max-w-7xl mx-auto py-16">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn(0.1)}
            className="flex flex-col lg:flex-row items-center gap-10 mb-16"
          >
            <div className="flex-1">
              <h1 className="text-[28px] md:text-[36px] font-bold mb-4 leading-tight">
                Welcome to <span className="text-orange-500">Find My Stay</span>
              </h1>
              <p className="text-gray-300 text-[16px] leading-relaxed mb-6">
                Find My Stay is a trusted online platform that connects tenants and
                property owners directly. Whether you’re looking for a room,
                apartment, or house, our mission is to make finding your ideal stay
                simple, transparent, and secure.
              </p>
              <p className="text-gray-300 text-[16px] leading-relaxed mb-6">
                We believe in empowering people to make confident rental decisions
                through verified listings, real photos, and direct communication
                between owners and tenants.
              </p>
            </div>
            <motion.div
              variants={fadeIn(0.3)}
              className="flex-1 w-full h-[350px] mb-16"
            >
              <Image
                src="https://images.pexels.com/photos/34549303/pexels-photo-34549303.jpeg"
                alt="Find My Stay platform"
                width={600}
                height={400}
                className="object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn(0.2)}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn(index * 0.1)}
                className="bg-slate-800 rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-orange-400/10 transition-all duration-300 hover:-translate-y-1 border border-slate-700"
              >
                <div className="flex flex-col items-center justify-center">
                  {item.icon}
                  <h3 className="text-[18px] font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn(0.2)}
            className="bg-slate-800/70 border border-slate-700 rounded-3xl p-10 lg:p-16 text-center mb-20 shadow-lg shadow-orange-400/10"
          >
            <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-300 text-[16px] leading-relaxed max-w-3xl mx-auto">
              Our mission is to make renting homes and finding stays effortless.
              We aim to create a community where every user — tenant or owner —
              can connect easily, trust confidently, and live comfortably.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn(0.3)}
            className="text-center"
          >
            <h3 className="text-[24px] font-semibold text-white mb-3">
              Start Your Journey with Find My Stay
            </h3>
            <p className="text-gray-300 mb-6">
              Discover verified homes and connect directly with owners today.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg text-[15px] hover:bg-orange-700 transition-all shadow-md shadow-orange-500/30"
            >
              Explore Now
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
