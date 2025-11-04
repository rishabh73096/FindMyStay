"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Hotel } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // ✅ Check login status from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md z-50 border-b border-orange-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Hotel className="text-white" size={20} />
            </div>
            <span className="text-gray-900 font-bold text-xl">Find My Stay</span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link href="/rooms" className="text-gray-800 hover:text-orange-500 transition-colors">
              Rooms
            </Link>
            <Link href="/AboutUs" className="text-gray-800 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="/ContactUs" className="text-gray-800 hover:text-orange-500 transition-colors">
              Contact
            </Link>

            {!isLoggedIn ? (
              <button
                onClick={() => router.push("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-orange-500 flex items-center gap-1"
                >
                  <User size={18} /> My Profile
                </Link>
                <Link
                  href="/bookings"
                  className="text-gray-700 hover:text-orange-500"
                >
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-orange-200 shadow-sm">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/"
              className="block text-gray-800 hover:text-orange-500 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className="block text-gray-800 hover:text-orange-500 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              href="/AboutUs"
              className="block text-gray-800 hover:text-orange-500 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/ContactUs"
              className="block text-gray-800 hover:text-orange-500 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  router.push("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-2"
              >
                Sign In
              </button>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="block text-gray-800 hover:text-orange-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/bookings"
                  className="block text-gray-800 hover:text-orange-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
