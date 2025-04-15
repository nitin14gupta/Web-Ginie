'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wand2, Sparkles, Code2, Rocket } from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from '../../../config';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      router.push(`/dashboard/builder?prompt=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
                <div className="relative bg-black rounded-full p-4">
                  <Wand2 className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Website Builder AI
            </h1>
            
            <p className="text-lg leading-8 text-gray-300 mb-12">
              Describe your dream website, and we'll help you build it step by step using advanced AI technology
            </p>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-black rounded-2xl p-8 ring-1 ring-gray-800/50">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the website you want to build..."
                    className="w-full h-32 p-4 bg-gray-900/50 backdrop-blur-sm text-gray-100 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500 mb-4"
                  />
                  <button
                    type="submit"
                    className="w-full relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></span>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Website Plan
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800">
                <Code2 className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Smart Code Generation</h3>
                <p className="text-gray-400 text-sm text-center">Advanced AI-powered code generation for your website</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800">
                <Wand2 className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Customizable Design</h3>
                <p className="text-gray-400 text-sm text-center">Fully customizable components and styling options</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800">
                <Rocket className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Instant Preview</h3>
                <p className="text-gray-400 text-sm text-center">Real-time preview of your website as you build</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}