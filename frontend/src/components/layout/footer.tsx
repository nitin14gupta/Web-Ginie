'use client'
import React from 'react'
import { Twitter, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = {
    Product: ['Features', 'Templates', 'Examples', 'Pricing'],
    Resources: ['Documentation', 'Blog', 'Support', 'API'],
    Company: ['About', 'Careers', 'Contact', 'Partners'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies']
  };

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Github className="h-5 w-5" />, href: '#', label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, text: 'contact@aigen.com' },
    { icon: <Phone className="h-5 w-5" />, text: '+1 (555) 123-4567' },
    { icon: <MapPin className="h-5 w-5" />, text: 'San Francisco, CA' }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                <div className="relative bg-black rounded-lg w-full h-full flex items-center justify-center">
                  <span className="text-blue-500 text-xl font-bold">A</span>
                </div>
              </div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AIGen
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Making website creation accessible to everyone through the power of AI. Build your next project faster and smarter.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-400">
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {Object.entries(sections).map(([title, items]) => (
            <div key={title} className="col-span-1">
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © {currentYear} AIGen. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 