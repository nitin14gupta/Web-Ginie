'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface GlowingInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  onSubmit?: (value: string) => void;
}

export function GlowingInput({ className, onSubmit, ...props }: GlowingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      {/* Glow Effect */}
      <motion.div
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1 : 0.95,
        }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg group-hover:opacity-75 transition-opacity"
      />

      {/* Input Container */}
      <div className="relative flex items-center">
        <input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white placeholder:text-zinc-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent',
            'transition-all duration-300',
            className
          )}
        />
        
        {/* Sparkles Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              rotate: isFocused ? [0, 20, -20, 0] : 0,
              scale: isFocused ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-5 w-5 text-blue-500" />
          </motion.div>
        </div>
      </div>

      {/* Background Beam */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </form>
  );
} 