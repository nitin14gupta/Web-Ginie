import React from 'react';
import { Code2, Eye } from 'lucide-react';
import { TabViewProps } from '../types/bolt';

export function TabView({ activeTab, onTabChange }: TabViewProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
      <div className="relative flex p-1 space-x-1 bg-black/80 backdrop-blur-xl rounded-xl border border-gray-800/50">
        <button
          onClick={() => onTabChange('code')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'code'
              ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          <Code2 className="w-4 h-4" />
          Code
        </button>
        <button
          onClick={() => onTabChange('preview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'preview'
              ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>
    </div>
  );
}