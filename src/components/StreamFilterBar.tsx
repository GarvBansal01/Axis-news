import React from 'react';
import { Search, Clock } from 'lucide-react';
import { NewsCategory } from '../types';

interface StreamFilterBarProps {
  activeCategory: NewsCategory;
  setActiveCategory: (cat: NewsCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCount: number;
  lastUpdatedText: string;
}

export const StreamFilterBar: React.FC<StreamFilterBarProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  totalCount,
  lastUpdatedText
}) => {
  const categories: { id: NewsCategory; label: string }[] = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'ai', label: 'AI Frontier' },
    { id: 'world', label: 'World Affairs' },
    { id: 'personal', label: 'Tech & Systems' },
    { id: 'local', label: 'Siliguri & Regional' },
    { id: 'gaming', label: 'Gaming' }
  ];

  return (
    <div className="pt-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80 space-y-3">
      {/* Top Search & Telemetry Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Minimal Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, topics, sources..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Updated indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
          <Clock className="w-3 h-3 text-zinc-400" />
          <span>Updated {lastUpdatedText}</span>
        </div>
      </div>

      {/* Clean Editorial Filter Line */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
