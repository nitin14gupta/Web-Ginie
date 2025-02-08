'use client';
import { ProtectedRoute } from '@/lib/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';
import { motion } from 'framer-motion';
import { Search, Plus, Settings, Star, Clock, Layout, Link } from 'lucide-react';
import { GlowingInput } from '@/components/ui/glowing-input';
import { CodeEditor } from '@/components/editor/code-editor';
import { SearchPanel } from '@/components/editor/search-panel';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePromptSubmit = (value: string) => {
    setIsEditorVisible(true);
    setHasSearched(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        {/* Top Gradient */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-500/10 to-transparent" />

        {/* Header */}
        <header className="border-b border-zinc-800 bg-zinc-900/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold">WebGenie</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard/settings">
                  <button className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                    <Settings className="h-5 w-5" />
                  </button>
                </Link>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  {user?.firstName?.[0] || 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={cn(
          "relative transition-all duration-300",
          hasSearched ? "ml-[470px]" : "ml-[70px]"
        )}>
          {/* Header Section */}
          <div className="pt-8 px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto text-center max-w-4xl"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                What do you want to build?
              </h1>
              <p className="text-zinc-400 mb-8">
                Prompt, run, edit, and deploy full-stack web apps.
              </p>

              {!hasSearched && (
                <div className="max-w-2xl mx-auto">
                  <GlowingInput
                    placeholder="Describe your project idea..."
                    onSubmit={handlePromptSubmit}
                  />
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Search Panel - Only show after search */}
        {hasSearched && (
          <SearchPanel onSearch={handlePromptSubmit} />
        )}

        {/* Code Editor */}
        <CodeEditor
          isVisible={isEditorVisible}
          onClose={() => setIsEditorVisible(false)}
        />
      </div>
    </ProtectedRoute>
  );
} 