'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Plus,
  Settings,
  Layout,
  Code,
  FileText,
  Star,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

const sidebarLinks = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Templates', icon: Layout, href: '/dashboard/templates' },
  { name: 'Components', icon: FileText, href: '/dashboard/components' },
  { name: 'Projects', icon: FileText, href: '/dashboard/projects' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <motion.div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      animate={{ width: isExpanded ? 240 : 70 }}
      className="fixed left-0 top-0 h-screen bg-black border-r border-zinc-800 z-50"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-zinc-800">
          <motion.div
            animate={{ scale: isExpanded ? 1 : 0.9 }}
            className="text-xl font-bold text-white"
          >
            {isExpanded ? 'WebGenie' : 'W'}
          </motion.div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-8 px-3 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg transition-all group relative',
                    isActive
                      ? 'text-white bg-blue-600'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <motion.span
                    animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                    className="ml-3 overflow-hidden whitespace-nowrap"
                  >
                    {link.name}
                  </motion.span>
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
                      {link.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="p-3 border-t border-zinc-800">
          <Link href="/dashboard/settings">
            <div className="flex items-center px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <Settings className="h-5 w-5" />
              <motion.span
                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                className="ml-3 overflow-hidden whitespace-nowrap"
              >
                Settings
              </motion.span>
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-full mt-2 flex items-center px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <motion.span
              animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              Logout
            </motion.span>
          </button>
          {isExpanded && (
            <div className="mt-4 px-3 py-2">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  {user?.firstName?.[0] || 'U'}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-zinc-400">{user?.email}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 