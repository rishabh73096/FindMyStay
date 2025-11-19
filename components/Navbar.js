"use client";
import React, { useState, useEffect, useContext } from "react";
import { Menu, X, User, LogOut, Hotel, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userContext } from "@/pages/_app";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [user, setUser] = useContext(userContext)


  useEffect(() => {
    // const token = localStorage.getItem("token");
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const userInitial = user?.name ? user?.name.charAt(0).toUpperCase() : "U";

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
            <Link href="/Rooms" className="text-gray-800 hover:text-orange-500 transition-colors">
              Rooms
            </Link>
            <Link href="/AboutUs" className="text-gray-800 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="/ContactUs" className="text-gray-800 hover:text-orange-500 transition-colors">
              Contact
            </Link>

            <div className="relative">
              {/* If NOT logged in */}
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    router.push("/login");
                    setIsMenuOpen(false);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                >
                  Sign In
                </button>
              ) : (
                <>
                  {/* Avatar Button */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-10 h-10 flex cursor-pointer items-center justify-center bg-orange-500 text-white rounded-full font-bold"
                  >
                    {userInitial}
                  </button>

               
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl border border-gray-200 p-2 z-50">

                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-all"
                      >
                        <User size={18} className="text-orange-500" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/bookings"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-all"
                      >
                        <CalendarCheck size={18} className="text-orange-500" />
                        <span>My Bookings</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-1"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>

                    </div>
                  )}

                </>
              )}
            </div>
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
              href="/Rooms"
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


            <div className="relative">
              {/* If NOT logged in */}
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    router.push("/login");
                    setIsMenuOpen(false);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                >
                  Sign In
                </button>
              ) : (
                <>
                  {/* Avatar Button */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold"
                  >
                    {userInitial}
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border p-2 z-50">
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
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
