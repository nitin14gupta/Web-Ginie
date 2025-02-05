"use client";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  const handleGenerate = () => {
    router.push("/login");
  };

  return (
    <div className="pt-24 pb-16 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Generate a Website from a Simple Prompt
        </h1>
        
        {/* Subheading */}
        <p className="text-gray-600 mb-8">
          Describe your idea, and we'll generate the code for you.
        </p>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Describe your website idea..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleGenerate}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Preview Window */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
            {/* Window Controls */}
            <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
            </div>
            {/* Preview Content */}
            <div className="aspect-[16/10] bg-gray-50 flex items-center justify-center text-gray-400">
              Preview Window
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 