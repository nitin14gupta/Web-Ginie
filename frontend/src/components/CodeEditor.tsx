import React from 'react';
import Editor from '@monaco-editor/react';
import { CodeEditorProps } from '../types/bolt';
import { Code2 } from 'lucide-react';

export function CodeEditor({ file }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 bg-black/50 backdrop-blur-sm rounded-xl border border-gray-800/50">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
          <div className="relative bg-black rounded-full p-4">
            <Code2 className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Select a file to view its contents
        </p>
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl overflow-hidden border border-gray-800/50 bg-black/50 backdrop-blur-sm">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={file.content || ''}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'all',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          contextmenu: false,
        }}
        loading={
          <div className="h-full flex items-center justify-center text-gray-400">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}