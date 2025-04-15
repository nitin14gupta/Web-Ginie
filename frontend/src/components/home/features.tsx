'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Pencil, Rocket, Layout, Search, Smartphone } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      iconBg: "from-blue-600 to-blue-400",
      title: "Code Generation",
      description: "Generate clean, production-ready code"
    },
    {
      icon: <Pencil className="w-6 h-6" />,
      iconBg: "from-purple-600 to-purple-400",
      title: "Live Editing",
      description: "Edit your website in real-time"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      iconBg: "from-green-600 to-green-400",
      title: "One-Click Deployment",
      description: "Deploy instantly to the cloud"
    },
    {
      icon: <Layout className="w-6 h-6" />,
      iconBg: "from-orange-600 to-orange-400",
      title: "Multiple Frameworks",
      description: "Support for popular frameworks"
    },
    {
      icon: <Search className="w-6 h-6" />,
      iconBg: "from-teal-600 to-teal-400",
      title: "SEO Optimization",
      description: "Built-in SEO best practices"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      iconBg: "from-pink-600 to-pink-400",
      title: "Responsive Design",
      description: "Looks great on all devices"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 inline-block mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to build and deploy your next project, powered by cutting-edge AI technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
              <Card className="relative bg-black border-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
    </section>
  );
} 