"use client";
import { useRouter } from "next/navigation";
import { Sparkles, Code, Rocket, Wand2 } from 'lucide-react';

export function Hero() {
  const router = useRouter();

  const handleGenerate = () => {
    router.push("/login");
  };

  return (
    <div className="relative isolate">
      {/* Background effects */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center space-x-4 mb-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
              <div className="relative bg-black rounded-full p-4">
                <Wand2 className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Generate a Website from a Simple Prompt
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Transform your ideas into reality with AI-powered website generation. Just describe what you want, and watch as your website comes to life.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
              <div className="relative flex bg-black rounded-xl">
                <input
                  type="text"
                  placeholder="Describe your website idea..."
                  className="flex-1 px-4 py-3 bg-transparent border-0 text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                />
                <button 
                  onClick={handleGenerate}
                  className="relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] m-1"
                >
                  <span className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></span>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Window */}
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="rounded-xl bg-zinc-900 shadow-2xl ring-1 ring-gray-900/10">
              <div className="bg-zinc-800/80 px-4 py-3 border-b border-zinc-700 flex items-center space-x-1.5 rounded-t-xl">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
              </div>
              <div className="aspect-[16/9] overflow-hidden rounded-b-xl">
                <div className="bg-gradient-to-br from-gray-900 to-black w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 w-full max-w-4xl">
                    <div className="flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                      <Code className="w-8 h-8 text-blue-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Smart Code</h3>
                      <p className="text-gray-400 text-sm text-center">AI-powered code generation</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                      <Wand2 className="w-8 h-8 text-purple-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Magic Design</h3>
                      <p className="text-gray-400 text-sm text-center">Beautiful UI components</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                      <Rocket className="w-8 h-8 text-pink-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Quick Deploy</h3>
                      <p className="text-gray-400 text-sm text-center">Instant deployment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
} 