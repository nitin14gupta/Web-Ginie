'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { PenLine, Cpu, Eye, Rocket } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <PenLine className="w-6 h-6" />,
      iconBg: "from-blue-600 to-blue-400",
      step: "01",
      title: "Describe Your Idea",
      description: "Tell us what you want to build"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      iconBg: "from-purple-600 to-purple-400",
      step: "02",
      title: "AI Processes",
      description: "Our AI analyzes your requirements"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      iconBg: "from-pink-600 to-pink-400",
      step: "03",
      title: "Preview Result",
      description: "See your website come to life"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      iconBg: "from-orange-600 to-orange-400",
      step: "04",
      title: "Deploy Site",
      description: "Launch your website instantly"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 inline-block mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Build your website in four simple steps using our advanced AI technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
              <Card className="relative h-full bg-black border-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center text-white shadow-lg mb-4`}>
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium text-blue-400 mb-2">{step.step}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Connecting lines between steps */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 transform -translate-y-1/2 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-0 -translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 right-0 translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
    </section>
  );
} 