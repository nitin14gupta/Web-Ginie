import React from 'react';
import { X, File } from 'lucide-react';
import { FileViewerProps } from '../types/bolt';

export function FileViewer({ file, onClose }: FileViewerProps) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative group w-full max-w-3xl">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-black/90 rounded-xl border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                <div className="relative bg-black rounded-lg p-2">
                  <File className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {file.path}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 overflow-auto max-h-[calc(80vh-4rem)]">
            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
              {file.content || 'No content available'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}