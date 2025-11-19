import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBed, FaUserFriends, FaShieldAlt, FaMapMarkedAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const features = [
  {
    icon: <FaBed className="text-4xl mb-3 text-orange-400" />,
    title: "Find Verified PGs & Hostels",
    description:
      "Discover comfortable and verified PGs and hostels in Indore with real images, amenities, and rent details — all in one place.",
  },
  {
    icon: <FaUserFriends className="text-4xl mb-3 text-orange-400" />,
    title: "Connect with Owners Directly",
    description:
      "Skip the brokers! Talk directly with PG or hostel owners, clarify doubts, and finalize your stay easily and transparently.",
  },
  {
    icon: <FaShieldAlt className="text-4xl mb-3 text-orange-400" />,
    title: "Safe & Reliable Experience",
    description:
      "Every listing is verified for safety, cleanliness, and comfort — so you can stay worry-free during your student or working life.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl mb-3 text-orange-400" />,
    title: "Explore Prime Indore Locations",
    description:
      "Browse PGs and hostels across popular areas like Vijay Nagar, Palasia, Geeta Bhawan, and more — right from your screen.",
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
        <title>About Us | Find My Stay - PGs & Hostels in Indore</title>
        <meta
          name="description"
          content="Find My Stay helps students and professionals easily discover verified PGs and Hostels in Indore. Book visits, connect directly with owners, and stay hassle-free."
        />
      </Head>

   

      <div className="relative py-16 bg-slate-900 text-white overflow-hidden">
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
                Welcome to{" "}
                <span className="text-orange-500">Find My Stay – Indore</span>
              </h1>
              <p className="text-gray-300 text-[16px] leading-relaxed mb-6">
                Find My Stay is Indore’s most trusted PG and Hostel discovery
                platform. Whether you're a student or working professional, we
                make it easy to find a comfortable, safe, and affordable place
                to live — without middlemen.
              </p>
              <p className="text-gray-300 text-[16px] leading-relaxed mb-6">
                From single rooms to shared accommodations, explore verified
                stays, check amenities, and even book a visit directly with
                owners — all in just a few clicks.
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
              Our mission is to simplify PG and hostel finding in Indore. We
              envision a trusted community where students and working
              professionals can find verified stays easily and safely. Your
              comfort and convenience are our top priorities.
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
              Find Your Perfect Stay in Indore
            </h3>
            <p className="text-gray-300 mb-6">
              Explore verified PGs and hostels near your college or workplace.
              Book a visit now and move in stress-free!
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg text-[15px] hover:bg-orange-700 transition-all shadow-md shadow-orange-500/30"
            >
              Book a Visit
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
