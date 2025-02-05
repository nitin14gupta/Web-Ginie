'use client'
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      icon: "⌨️",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Code Generation",
      description: "Generate clean, production-ready code"
    },
    {
      icon: "✏️",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      title: "Live Editing",
      description: "Edit your website in real-time"
    },
    {
      icon: "🚀",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      title: "One-Click Deployment",
      description: "Deploy instantly to the cloud"
    },
    {
      icon: "📱",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      title: "Multiple Frameworks",
      description: "Support for popular frameworks"
    },
    {
      icon: "🔍",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      title: "SEO Optimization",
      description: "Built-in SEO best practices"
    },
    {
      icon: "📐",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      title: "Responsive Design",
      description: "Looks great on all devices"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 mb-4 rounded-full ${feature.iconBg} ${feature.iconColor} flex items-center justify-center text-xl`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 