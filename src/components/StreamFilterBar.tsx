import React from 'react';
import { Search, Clock, Layers, Zap, Radio } from 'lucide-react';
import { NewsCategory } from '../types';

interface StreamFilterBarProps {
  activeCategory: NewsCategory;
  setActiveCategory: (cat: NewsCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCount: number;
  lastUpdatedText: string;
  viewMode: 'stream' | 'flashcards';
  setViewMode: (mode: 'stream' | 'flashcards') => void;
  secondsToNextRefresh: number;
}

export const StreamFilterBar: React.FC<StreamFilterBarProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  totalCount,
  lastUpdatedText,
  viewMode,
  setViewMode,
  secondsToNextRefresh
}) => {
  const categories: { id: NewsCategory; label: string }[] = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'national', label: '🇮🇳 India National' },
    { id: 'geopolitics', label: '🌐 Geopolitics & War' },
    { id: 'disaster', label: '🚨 Disaster & Alerts' },
    { id: 'ai', label: '🤖 AI Frontier' },
    { id: 'world', label: '🌍 World' },
    { id: 'local', label: '📍 Siliguri & Regional' },
    { id: 'personal', label: '💻 Tech & Systems' },
    { id: 'gaming', label: '🎮 Gaming' }
  ];

  return (
    <div className="pt-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80 space-y-3">
      {/* Top Search & View Mode Switcher Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Minimal Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Russia, pilot, AI, Siliguri, cyclone..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Switcher & Live 1-Minute Update Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Segmented View Mode Controller */}
          <div className="p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center text-xs">
            <button
              onClick={() => setViewMode('stream')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'stream'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 shadow-2xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
              title="Continuous scrolling dispatches"
            >
              <Layers className="w-3 h-3" />
              <span>Stream</span>
            </button>

            <button
              onClick={() => setViewMode('flashcards')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'flashcards'
                  ? 'bg-amber-500 text-white dark:bg-amber-400 dark:text-zinc-950 shadow-2xs font-bold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
              title="Quick 30s preview cards for busy students"
            >
              <Zap className="w-3 h-3" />
              <span>⚡ 30s Preview</span>
            </button>
          </div>

          {/* 1-Minute Live Radar Telemetry Indicator */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-700 dark:text-emerald-400"
            title="Auto-scans and updates breaking news dispatches every 60 seconds"
          >
            <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
            <span className="hidden md:inline font-semibold">1-Min Radar:</span>
            <span>{secondsToNextRefresh}s</span>
          </div>
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
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-2xs'
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

