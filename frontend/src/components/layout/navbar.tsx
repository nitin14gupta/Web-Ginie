"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-black/50 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
              <div className="relative bg-black rounded-lg w-full h-full flex items-center justify-center">
                <span className="text-blue-500 text-xl font-bold">A</span>
              </div>
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              AIGen
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white font-medium transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-gray-300 hover:text-white font-medium transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white font-medium transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-white font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <button className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <span className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></span>
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">
              Home
            </Link>
            <Link href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">
              Features
            </Link>
            <Link href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">
              Pricing
            </Link>
            <Link href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <Link href="/login" className="block w-full px-3 py-2 text-center rounded-md text-gray-300 hover:text-white font-medium">
                Login
              </Link>
              <Link href="/signup" className="block w-full px-3 py-2 text-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 