'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  const steps = [
    {
      icon: "✏️",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      step: "Step 1",
      title: "Describe Your Idea",
      description: "Tell us what you want to build"
    },
    {
      icon: "🔄",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      step: "Step 2",
      title: "AI Processes",
      description: "Our AI analyzes your requirements"
    },
    {
      icon: "👁️",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      step: "Step 3",
      title: "Preview Result",
      description: "See your website come to life"
    },
    {
      icon: "🚀",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      step: "Step 4",
      title: "Deploy Site",
      description: "Launch your website instantly"
    }
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
              <CardContent className="pt-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${step.iconBg} ${step.iconColor} flex items-center justify-center text-xl`}>
                  {step.icon}
                </div>
                <div className="text-blue-600 text-sm font-medium mb-2">{step.step}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 