'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import { Bell, Shield, Palette, Globe, CreditCard, Key } from 'lucide-react';

const settingsSections = [
  {
    id: 'profile',
    name: 'Profile Settings',
    description: 'Manage your personal information and account settings',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'Configure how you want to receive notifications',
    icon: Bell,
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Manage your password and security settings',
    icon: Shield,
  },
  {
    id: 'appearance',
    name: 'Appearance',
    description: 'Customize the look and feel of your dashboard',
    icon: Palette,
  },
  {
    id: 'billing',
    name: 'Billing & Plans',
    description: 'Manage your subscription and billing information',
    icon: CreditCard,
  },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-zinc-400">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {section.icon && <section.icon className="h-5 w-5 mr-3" />}
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              {activeSection === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                      {user?.firstName?.[0] || 'U'}
                    </div>
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-colors">
                      Change Avatar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">First Name</label>
                      <input
                        type="text"
                        defaultValue={user?.firstName}
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Last Name</label>
                      <input
                        type="text"
                        defaultValue={user?.lastName}
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Username</label>
                      <input
                        type="text"
                        placeholder="Choose a username"
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Add other sections content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 