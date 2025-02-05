"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  return (
    <nav className="fixed w-full top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-[#2563EB] text-2xl font-semibold">
            AIGen
          </a>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Features
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Pricing
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => router.push("/login")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Login
            </button>
            <button 
              onClick={() => router.push("/signup")}
              className="bg-[#2563EB] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 