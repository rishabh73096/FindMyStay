"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Api } from "../../services/service";
import { motion } from "framer-motion";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FeedbackForm = (props) => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    query: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Only letters and spaces allowed";
        if (value.trim().split(/\s+/).length < 2)
          return "Please enter both first and last name";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "phoneNumber":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
        return "";
      case "query":
        if (!value.trim()) return "This field is required";
        if (value.length < 10)
          return "Message should be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName" && /[0-9]/.test(value)) return;
    if (name === "phoneNumber" && value && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const submitFeedback = (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        formValid = false;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (!formValid) {
      // props.toaster({
      //   type: "error",
      //   message: "Please fix the errors in the form",
      // });
      return;
    }

    props.loader(true);

    Api("post", "createFeedback", formData).then(
      (res) => {
        props.loader(false);
        if (res?.status) {
          props.toaster({
            type: "success",
            message: "Query submitted successfully",
          });
          setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            query: "",
          });
          router.push("/");
        } else {
          props.toaster({
            type: "error",
            message: res?.data?.message || "Failed to submit feedback",
          });
        }
      },
      (err) => {
        props.loader(false);
        props.toaster({
          type: "error",
          message: err?.data?.message || "Failed to submit feedback",
        });
      }
    );
  };

  return (
    <>
      <Head>
        <title>Contact Us | Find My Stay</title>
      </Head>
      <Navbar />
      <div className="min-h-[600px] md:mt-5 mt-14 md:mb-0 pb-10 bg-slate-900 pt-14">
         <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 via-transparent to-orange-400/10" />
        <div className="container mx-auto px-4 py-2 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">

            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col justify-start"
            >
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2 font-poppins">
                  Home › {("Contact Us")}
                </p>
                <h1 className="text-white font-poppins font-light text-[72px] leading-[90px] tracking-normal">
                  {("Get in-touch")}
                  <br />
                  {("with us")}!
                </h1>
              </div>

              <p className="text-gray-700 text-base mb-8 font-poppins">
                {(
                  "We're here to help! Whether you have a question about our services or need assistance with your account or want to provide feedback, our team is ready to assist you"
                )}
                .
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 font-medium mb-1">
                    {("Email")}:
                  </p>
                  <a
                    href="mailto:contact@bachhoahouston.com"
                    className="text-orange-600 text-lg font-poppins hover:text-orange-700 transition"
                  >
                    contact@bachhoahouston.com
                  </a>
                </div>

                <div>
                  <p className="text-gray-700 font-medium mb-1">
                    {("Phone No")}:
                  </p>
                  <a
                    href="tel:8322309288"
                    className="text-orange-600 text-lg hover:text-orange-700 transition"
                  >
                    832-230-9288
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex items-start lg:items-center"
            >
              <form
                className="bg-orange-100/20 border border-orange-200 backdrop-blur-sm p-6 md:p-8 rounded-3xl w-full shadow-md"
                onSubmit={submitFeedback}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-poppins text-orange-700 font-medium text-sm block mb-2">
                      {("Full Name")}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full font-poppins px-4 py-3 text-gray-800 bg-white rounded-full outline-none border ${errors.fullName
                        ? "border-red-500"
                        : "border-transparent"
                        } focus:ring-2 focus:ring-orange-500`}
                      placeholder={("Enter your name")}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-poppins text-orange-700 font-medium text-sm block mb-2">
                      {("Phone No")}
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={10}
                      className={`w-full px-4 font-poppins py-3 text-gray-800 bg-white rounded-full outline-none border ${errors.phoneNumber
                        ? "border-red-500"
                        : "border-transparent"
                        } focus:ring-2 focus:ring-orange-500`}
                      placeholder={("Enter your phone number")}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-orange-700 font-medium text-sm block mb-2">
                    {("Email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 text-gray-800 bg-white rounded-full outline-none border ${errors.email
                      ? "border-red-500"
                      : "border-transparent"
                      } focus:ring-2 focus:ring-orange-500`}
                    placeholder={("Enter your email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-orange-700 font-medium text-sm block mb-2">
                    {("Message")}
                  </label>
                  <textarea
                    name="query"
                    rows="4"
                    value={formData.query}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 text-gray-800 bg-white rounded-3xl outline-none resize-none border ${errors.query
                      ? "border-red-500"
                      : "border-transparent"
                      } focus:ring-2 focus:ring-orange-500`}
                    placeholder={("Enter your message")}
                  ></textarea>
                  {errors.query && (
                    <p className="text-red-500 text-sm mt-1">{errors.query}</p>
                  )}
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
                  >
                    {("Send Message")}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackForm;
