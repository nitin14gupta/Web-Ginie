'use client';

import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'SaaS Landing Page',
    description: 'Modern landing page template for SaaS products',
    category: 'Landing Page',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'E-commerce Dashboard',
    description: 'Complete dashboard for e-commerce businesses',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Portfolio Website',
    description: 'Showcase your work with this portfolio template',
    category: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Blog Platform',
    description: 'Start your blog with this modern template',
    category: 'Blog',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop',
  },
  // Add more templates as needed
];

const categories = ['All', 'Landing Page', 'Dashboard', 'Portfolio', 'Blog', 'E-commerce'];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Templates</h1>
          <p className="text-zinc-400">Choose from our collection of pre-built templates</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 pl-10 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:bg-zinc-800 transition-colors">
              <Filter className="h-5 w-5" />
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:bg-zinc-800 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all"
            >
              {/* Template Image */}
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="text-sm text-blue-500 mb-2">{template.category}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-zinc-400 mb-4">{template.description}</p>
                
                <button className="flex items-center text-blue-500 hover:text-blue-400 transition-colors">
                  <span>Use Template</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
                    Preview Template
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 