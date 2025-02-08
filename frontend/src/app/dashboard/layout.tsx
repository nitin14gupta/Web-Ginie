'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { motion } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="ml-[70px] min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
} 