"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  return (
    <nav className="fixed w-full top-0 bg-black border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-blue-500 text-2xl font-semibold">
            AIGen
          </a>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white font-medium">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white font-medium">
              Features
            </a>
            <a href="#" className="text-gray-300 hover:text-white font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-300 hover:text-white font-medium">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-6">
            <Link href="/login">
              <button className="text-gray-300 hover:text-white font-medium">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 