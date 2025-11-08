"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Hotel } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-orange-800/30 pt-16 pb-8 relative overflow-hidden">
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-slate-900 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Link
                href={"/"}>
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg flex items-center justify-center"

                >
                  <span className="text-white font-bold text-lg"><Hotel /></span>
                </div>
              </Link>
              <span className="text-white font-bold text-xl">Find My Stay</span>
            </div>
            <p className="text-gray-300 mb-6">
              Your trusted travel partner for finding cozy and affordable stays
              wherever you go. Discover comfort with a click.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Quick Links
              <div className="w-10 h-[2px] bg-orange-500 mt-2 rounded-full"></div>
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link href="/AboutUs" className="text-gray-300 hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link href="/ContactUs" className="text-gray-300 hover:text-orange-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Support
              <div className="w-10 h-[2px] bg-orange-500 mt-2 rounded-full"></div>
            </h3>
            <ul className="space-y-2">
              <li><Link href="/UseTerms" className="text-gray-300 hover:text-orange-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/PrivacyPolicy" className="text-gray-300 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/CancilationPolicy" className="text-gray-300 hover:text-orange-400 transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Contact Info
              <div className="w-10 h-[2px] bg-orange-500 mt-2 rounded-full"></div>
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-orange-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-orange-400" />
                <span>help@findmystay.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-orange-400" />
                <span>Indore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Find My Stay</span>. All rights reserved.
            <br />
            <span className="text-orange-400">Made with ❤️ in India</span>
          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
