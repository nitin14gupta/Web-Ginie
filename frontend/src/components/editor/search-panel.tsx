'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Step } from '@/types/bolt';
import { CodeService } from '@/services/code';
import { parseArtifact, processArtifact } from '@/utils/xml-parser';

interface SearchPanelProps {
  onSearch: (value: string) => void;
}

export function SearchPanel({ onSearch }: SearchPanelProps) {
  const [searchValue, setSearchValue] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await CodeService.getTemplate(searchValue);
      const artifact = parseArtifact(response.uiPrompts[0]);
      const { steps } = processArtifact(artifact);
      setSteps(steps);
      onSearch(searchValue);
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to process search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[400px] bg-zinc-900 border-r border-zinc-800 p-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to build?"
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-zinc-500" />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-4 text-zinc-400 text-sm">
          Processing your request...
        </div>
      )}

      {/* Steps */}
      {steps.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-medium text-white">Build Steps</h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="p-3 bg-zinc-800/50 rounded-lg text-sm text-zinc-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{step.title}</div>
                    {step.command && (
                      <div className="mt-2 p-2 bg-black/30 rounded font-mono text-xs text-zinc-400">
                        $ {step.command}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}