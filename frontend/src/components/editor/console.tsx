import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, X, ChevronDown, ChevronRight, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsoleProps {
  visible: boolean;
  onClose: () => void;
}

interface LogMessage {
  type: 'log' | 'error' | 'info' | 'warn';
  content: string;
  timestamp: Date;
}

export function Console({ visible, onClose }: ConsoleProps) {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [filter, setFilter] = useState<LogMessage['type'][]>(['log', 'error', 'info', 'warn']);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Override console methods to capture logs
    const originalConsole = { ...console };
    const logTypes: LogMessage['type'][] = ['log', 'error', 'info', 'warn'];

    logTypes.forEach(type => {
      console[type] = (...args: any[]) => {
        originalConsole[type](...args);
        setLogs(prev => [...prev, {
          type,
          content: args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '),
          timestamp: new Date()
        }]);
      };
    });

    return () => {
      // Restore original console methods
      Object.assign(console, originalConsole);
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new logs are added
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const clearLogs = () => setLogs([]);

  const getLogStyle = (type: LogMessage['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'warn':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-white';
    }
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isCollapsed ? 40 : 300 }}
      className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-zinc-400" />
          <span className="text-sm text-zinc-400">Console</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearLogs}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
          >
            <Trash className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
          >
            {isCollapsed ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Log Messages */}
      {!isCollapsed && (
        <div className="h-[calc(100%-2.5rem)] overflow-auto font-mono text-sm p-4">
          {logs
            .filter(log => filter.includes(log.type))
            .map((log, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 text-xs">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className={cn('whitespace-pre-wrap', getLogStyle(log.type))}>
                    {log.content}
                  </span>
                </div>
              </div>
            ))}
          <div ref={consoleEndRef} />
        </div>
      )}
    </motion.div>
  );
} 