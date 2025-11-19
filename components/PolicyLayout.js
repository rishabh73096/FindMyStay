// components/PolicyLayout.jsx
import React from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PolicyLayout({ title, children }) {
    return (
        <>
            
            <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-12 mt-16">
                    <header className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold mt-2">{title}</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </header>

                    <main className="prose dark:prose-invert prose-lg max-w-none">{children}</main>

                    <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                            Questions? Contact us at{" "}
                            <Link className="text-orange-600 dark:text-orange-400" href="mailto:support@findmystay.example">
                                support@findmystay.example
                            </Link>

                        </p>
                    </footer>
                </div>
            </div>
            
        </>
    );
}
