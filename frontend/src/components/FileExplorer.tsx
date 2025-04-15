import React, { useState } from 'react';
import { FolderTree, File, ChevronRight, ChevronDown } from 'lucide-react';
import { FileItem, FileExplorerProps } from '../types/bolt';

interface FileNodeProps {
  item: FileItem;
  depth: number;
  onFileClick: (file: FileItem) => void;
}

function FileNode({ item, depth, onFileClick }: FileNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileClick(item);
    }
  };

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded-md cursor-pointer transition-colors duration-200"
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={handleClick}
      >
        {item.type === 'folder' && (
          <span className="text-gray-400">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        {item.type === 'folder' ? (
          <FolderTree className="w-4 h-4 text-blue-400" />
        ) : (
          <File className="w-4 h-4 text-gray-400" />
        )}
        <span className="text-gray-300 text-sm hover:text-white transition-colors duration-200">{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div className="animate-slideDown">
          {item.children.map((child, index) => (
            <FileNode
              key={`${child.path}-${index}`}
              item={child}
              depth={depth + 1}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
            <div className="relative bg-black rounded-lg p-2">
              <FolderTree className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            File Explorer
          </h2>
        </div>
        <div className="space-y-1 overflow-auto max-h-[calc(100%-4rem)]">
          {files.map((file, index) => (
            <FileNode
              key={`${file.path}-${index}`}
              item={file}
              depth={0}
              onFileClick={onFileSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}