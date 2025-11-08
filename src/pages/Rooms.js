import React from "react";
import { Clock } from "lucide-react";
import wrapper from "../../components/wrapper";

const Rooms = () => {
    return (
        <wrapper>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-[#fffaf5] to-[#f9f4f0] dark:from-[#0f0f0f] dark:to-[#1a1a1a] px-4 text-center transition-all duration-300">
                <div className="bg-white/80 dark:bg-[#222]/80 backdrop-blur-lg p-10 rounded-3xl shadow-lg border border-[#D9AB83]/40">
                    <div className="flex justify-center mb-5">
                        <Clock size={50} className="text-[#D9AB83] animate-pulse" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Rooms Section – Coming Soon
                    </h1>

                    <p className="text-gray-700 dark:text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
                        We're working hard to bring you the best room and PG booking experience.
                        Stay tuned — this feature will be available soon!
                    </p>

                    <button
                        onClick={() => (window.location.href = "/")}
                        className="mt-8 bg-orange-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300"
                    >
                        Back to Home
                    </button>
                </div>

                <footer className="mt-10 text-gray-500 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} Find My Stay. All rights reserved.
                </footer>
            </div>
        </wrapper>
    );
};

export default Rooms;
