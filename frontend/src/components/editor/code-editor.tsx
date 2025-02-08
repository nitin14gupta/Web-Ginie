'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Play, Terminal, Eye, Files, X, Plus,
  Folder, ChevronRight, ChevronDown, Trash2,
  Edit2, Save, FileUp, RefreshCw, FolderPlus,
  Search, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Console } from './console';
import { CodeService, ChatMessage } from '@/services/code';
import { parseArtifact, processArtifact } from '@/utils/xml-parser';
import { EditorService } from '@/services/editor';

interface FileStructure {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: string;
  content?: string;
  children?: FileStructure[];
}

interface CodeEditorProps {
  isVisible: boolean;
  onClose: () => void;
}

export function CodeEditor({ isVisible, onClose }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [activeFile, setActiveFile] = useState<FileStructure | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1']));
  const [files, setFiles] = useState<FileStructure[]>([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FileStructure[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [consoleVisible, setConsoleVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const tabs = [
    {
      id: 'code',
      label: 'Code',
      icon: Code2,
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: Eye,
    },
  ];

  useEffect(() => {
    if (activeFile?.content) {
      setEditedContent(activeFile.content);
      Prism.highlightAll();
    }
  }, [activeFile]);

  // Load initial files
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const initialFiles = await EditorService.getInitialFiles();
        setFiles(initialFiles);
      } catch (error) {
        console.error('Failed to load files:', error);
      }
    };
    loadFiles();
  }, []);

  // Update terminal command handling
  const handleTerminalCommand = async (command: string) => {
    setTerminalHistory(prev => [...prev, `$ ${command}`]);
    setCommandHistory(prev => [...prev, command]);

    try {
      const { output, error } = await EditorService.executeCommand(command);
      if (error) {
        setTerminalHistory(prev => [...prev, `Error: ${error}`]);
      } else {
        setTerminalHistory(prev => [...prev, ...output]);
      }
    } catch (error) {
      console.error('Command execution failed:', error);
      setTerminalHistory(prev => [...prev, `Error executing command: ${error}`]);
    }
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTerminalCommand(terminalInput);
      setTerminalInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  // Update file operations
  const createNewFile = async (parentId: string | null = null) => {
    if (!newFileName) return;

    try {
      const path = parentId ? `${getParentPath(parentId)}/${newFileName}` : newFileName;
      const newFile = await EditorService.createFile(path, '');
      
      setFiles(prevFiles => {
        const updateFilesRecursively = (files: FileStructure[]): FileStructure[] => {
          return files.map(file => {
            if (file.id === parentId) {
              return {
                ...file,
                children: [...(file.children || []), newFile],
              };
            }
            if (file.children) {
              return {
                ...file,
                children: updateFilesRecursively(file.children),
              };
            }
            return file;
          });
        };

        return parentId ? updateFilesRecursively(prevFiles) : [...prevFiles, newFile];
      });

      setNewFileName('');
      setShowNewFileModal(false);
    } catch (error) {
      console.error('Failed to create file:', error);
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      const filePath = getFilePath(fileId);
      await EditorService.deleteFile(filePath);

      setFiles(prevFiles => {
        const deleteFileRecursively = (files: FileStructure[]): FileStructure[] => {
          return files.filter(file => {
            if (file.id === fileId) return false;
            if (file.children) {
              file.children = deleteFileRecursively(file.children);
            }
            return true;
          });
        };

        return deleteFileRecursively(prevFiles);
      });

      if (activeFile?.id === fileId) {
        setActiveFile(null);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const saveFile = async () => {
    if (!activeFile) return;

    try {
      const filePath = getFilePath(activeFile.id);
      const updatedFile = await EditorService.updateFile(filePath, editedContent);
      
      setFiles(prevFiles => {
        const updateFilesRecursively = (files: FileStructure[]): FileStructure[] => {
          return files.map(file => {
            if (file.id === activeFile.id) {
              return {
                ...file,
                content: editedContent,
              };
            }
            if (file.children) {
              return {
                ...file,
                children: updateFilesRecursively(file.children),
              };
            }
            return file;
          });
        };

        return updateFilesRecursively(prevFiles);
      });

      setIsEditing(false);
      setUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  };

  // Add helper function to get file path
  const getFilePath = (fileId: string): string => {
    const findPath = (files: FileStructure[], path: string = ''): string => {
      for (const file of files) {
        const currentPath = path ? `${path}/${file.name}` : file.name;
        if (file.id === fileId) return currentPath;
        if (file.children) {
          const childPath = findPath(file.children, currentPath);
          if (childPath) return childPath;
        }
      }
      return '';
    };
    return findPath(files);
  };

  const getParentPath = (folderId: string): string => {
    return getFilePath(folderId);
  };

  // Update search functionality
  const searchFiles = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await EditorService.searchFiles(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (items: FileStructure[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} style={{ paddingLeft: `${level * 1}rem` }}>
        {item.type === 'folder' ? (
          <div className="relative group">
            <button
              onClick={() => toggleFolder(item.id)}
              className={cn(
                'w-full flex items-center py-1 px-2 rounded-lg text-sm transition-colors group',
                'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              {expandedFolders.has(item.id) ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              <Folder className="h-4 w-4 mr-2" />
              <span>{item.name}</span>

              <div className="hidden group-hover:flex items-center gap-1 ml-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFolderId(item.id);
                    setShowNewFileModal(true);
                  }}
                  className="p-1 hover:bg-zinc-700 rounded"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </button>
            {expandedFolders.has(item.id) && item.children && (
              <div className="mt-1">
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <div className="group relative">
            <button
              onClick={() => setActiveFile(item)}
              className={cn(
                'w-full flex items-center py-1 px-2 rounded-lg text-sm transition-colors',
                activeFile?.id === item.id
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <Code2 className="h-4 w-4 mr-2" />
              <span>{item.name}</span>

              <div className="hidden group-hover:flex items-center gap-1 ml-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="p-1 hover:bg-zinc-700 rounded"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFile(item.id);
                  }}
                  className="p-1 hover:bg-zinc-700 rounded"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </button>
          </div>
        )}
      </div>
    ));
  };

  // Handle drag and drop
  const moveFile = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    setFiles(prevFiles => {
      const findAndRemoveFile = (files: FileStructure[]): [FileStructure | null, FileStructure[]] => {
        let draggedFile: FileStructure | null = null;
        const newFiles = files.filter(file => {
          if (file.id === draggedId) {
            draggedFile = file;
            return false;
          }
          if (file.children) {
            const [found, newChildren] = findAndRemoveFile(file.children);
            if (found) {
              draggedFile = found;
              file.children = newChildren;
            }
          }
          return true;
        });
        return [draggedFile, newFiles];
      };

      const addFileToTarget = (files: FileStructure[], draggedFile: FileStructure): FileStructure[] => {
        return files.map(file => {
          if (file.id === targetId) {
            if (file.type === 'folder') {
              return {
                ...file,
                children: [...(file.children || []), draggedFile],
              };
            }
          }
          if (file.children) {
            return {
              ...file,
              children: addFileToTarget(file.children, draggedFile),
            };
          }
          return file;
        });
      };

      const [draggedFile, filesWithoutDragged] = findAndRemoveFile(prevFiles);
      if (!draggedFile) return prevFiles;

      return addFileToTarget(filesWithoutDragged, draggedFile);
    });
  };

  // Enhanced file editing
  const handleContentChange = (newContent: string) => {
    setEditedContent(newContent);
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    saveFile();
    setUnsavedChanges(false);
  };

  const handleCloseFile = () => {
    if (unsavedChanges) {
      setShowUnsavedWarning(true);
    } else {
      setActiveFile(null);
    }
  };

  // Function to handle code generation from template
  const handleTemplateGeneration = async (prompt: string) => {
    try {
      const response = await CodeService.getTemplate(prompt);
      const artifact = parseArtifact(response.uiPrompts[0]);
      const { files } = processArtifact(artifact);
      
      // Update file structure with generated files
      const newFiles = files.map(file => ({
        id: Date.now().toString(),
        name: file.path.split('/').pop() || '',
        type: 'file' as const,
        language: file.path.split('.').pop() || '',
        content: file.content,
      }));

      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      console.info('Generated files from template:', newFiles.map(f => f.name));
    } catch (error) {
      console.error('Failed to generate template:', error);
    }
  };

  // Function to handle chat with AI
  const handleChat = async (message: string) => {
    try {
      const newMessage: ChatMessage = { role: 'user', content: message };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);

      const response = await CodeService.chat(newMessages);
      const assistantMessage: ChatMessage = { role: 'assistant', content: response.response };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  // Add message handler for preview iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        const { method, args } = event.data;
        if (method in console && typeof console[method as keyof Console] === 'function') {
          (console[method as keyof Console] as Function)(...args);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update handlePreview function
  const handlePreview = async () => {
    try {
      // Convert files to record format
      const fileRecord: Record<string, string> = {};
      const processFiles = (items: FileStructure[]) => {
        items.forEach(item => {
          if (item.type === 'file') {
            fileRecord[item.name] = item.content || '';
          }
          if (item.children) {
            processFiles(item.children);
          }
        });
      };
      processFiles(files);

      const previewHtml = await CodeService.compileAndPreview(fileRecord);
      const blob = new Blob([previewHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(url);

      console.info('Preview generated successfully');
    } catch (error) {
      console.error('Preview generation failed:', error);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <DndProvider backend={HTML5Backend}>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={cn(
                "fixed right-0 top-0 bottom-0 bg-black border-l border-zinc-800 z-50",
                "w-full md:w-[85%] lg:w-3/4"
              )}
            >
              {/* Header */}
              <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                  {activeFile && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400">{activeFile.name}</span>
                      {unsavedChanges && (
                        <span className="text-xs text-yellow-500">●</span>
                      )}
                      {isEditing && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm flex items-center gap-1"
                          >
                            <Save className="h-3 w-3" />
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 hover:bg-zinc-800 rounded text-zinc-400 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'code' | 'preview')}
                        className={cn(
                          'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        )}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreview}
                    className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Play className="h-5 w-5" />
                    <span className="hidden sm:inline">Run</span>
                  </button>
                  <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              {showSearch && (
                <div className="border-b border-zinc-800 p-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        searchFiles(e.target.value);
                      }}
                      placeholder="Search files..."
                      className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500" />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {searchResults.map(file => (
                        <button
                          key={file.id}
                          onClick={() => {
                            setActiveFile(file);
                            setShowSearch(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white text-sm"
                        >
                          {file.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Main Content */}
              <div className="flex h-[calc(100vh-4rem)]">
                {/* File Explorer */}
                <div className="w-64 border-r border-zinc-800">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-white">Files</h3>
                      <button
                        onClick={() => {
                          setSelectedFolderId(null);
                          setShowNewFileModal(true);
                        }}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {renderFileTree(files)}
                    </div>
                  </div>
                </div>

                {/* Editor/Preview Area */}
                <div className="flex-1 flex flex-col">
                  {/* Code Area */}
                  <div className="flex-1 bg-zinc-900/50 p-4 overflow-auto">
                    {activeTab === 'code' ? (
                      activeFile ? (
                        isEditing ? (
                          <textarea
                            value={editedContent}
                            onChange={(e) => handleContentChange(e.target.value)}
                            className="w-full h-full bg-transparent text-white font-mono text-sm focus:outline-none resize-none"
                          />
                        ) : (
                          <pre className="!bg-transparent">
                            <code className={`language-${activeFile.language}`}>
                              {activeFile.content}
                            </code>
                          </pre>
                        )
                      ) : (
                        <div className="h-full flex items-center justify-center text-zinc-400">
                          Select a file to edit
                        </div>
                      )
                    ) : (
                      <div className="flex-1 bg-white">
                        {previewUrl ? (
                          <iframe
                            src={previewUrl}
                            className="w-full h-full border-none"
                            sandbox="allow-scripts allow-same-origin"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-zinc-400">
                            Click "Run" to preview your code
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Terminal */}
                  {terminalVisible && (
                    <div className="h-64 border-t border-zinc-800">
                      <div className="flex items-center justify-between p-2 border-b border-zinc-800 bg-zinc-900/50">
                        <div className="flex items-center space-x-2 text-sm text-zinc-400">
                          <Terminal className="h-4 w-4" />
                          <span>Terminal</span>
                        </div>
                        <button
                          onClick={() => setTerminalVisible(false)}
                          className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-4 font-mono text-sm text-zinc-300 h-[calc(100%-2.5rem)] overflow-auto">
                        {terminalHistory.map((line, i) => (
                          <div key={i} className="whitespace-pre-wrap">{line}</div>
                        ))}
                        <div className="flex items-center mt-2">
                          <span className="text-green-500 mr-2">$</span>
                          <input
                            type="text"
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            onKeyDown={handleTerminalKeyDown}
                            className="flex-1 bg-transparent focus:outline-none"
                            placeholder="Type a command..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terminal Toggle */}
                  {!terminalVisible && (
                    <button
                      onClick={() => setTerminalVisible(true)}
                      className="p-2 border-t border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center"
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      <span>Show Terminal</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* New File Modal */}
            {showNewFileModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-zinc-900 p-6 rounded-lg w-96">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Create New {selectedFolderId ? 'File in Folder' : 'File/Folder'}
                  </h3>
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="Enter name (add extension for file)"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white mb-4"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowNewFileModal(false)}
                      className="px-4 py-2 text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => createNewFile(selectedFolderId)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Unsaved Changes Warning */}
            {showUnsavedWarning && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-zinc-900 p-6 rounded-lg w-96">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-yellow-500" />
                    <h3 className="text-lg font-medium text-white">
                      Unsaved Changes
                    </h3>
                  </div>
                  <p className="text-zinc-400 mb-6">
                    You have unsaved changes. Would you like to save them before closing?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setShowUnsavedWarning(false);
                        setActiveFile(null);
                        setUnsavedChanges(false);
                      }}
                      className="px-4 py-2 text-zinc-400 hover:text-white"
                    >
                      Don't Save
                    </button>
                    <button
                      onClick={() => {
                        handleSave();
                        setShowUnsavedWarning(false);
                        setActiveFile(null);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Console */}
            <Console
              visible={consoleVisible}
              onClose={() => setConsoleVisible(false)}
            />

            {/* Add Console Toggle Button */}
            {!consoleVisible && (
              <button
                onClick={() => setConsoleVisible(true)}
                className="fixed bottom-4 right-4 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Terminal className="h-4 w-4" />
                <span>Show Console</span>
              </button>
            )}
          </>
        )}
      </AnimatePresence>
    </DndProvider>
  );
} 