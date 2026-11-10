import React, { useState } from 'react';
import { Shuffle, Check, Copy, BookOpen, Compass } from 'lucide-react';
import { WisdomItem } from '../types';

interface WisdomBannerProps {
  wisdomList: WisdomItem[];
}

export const WisdomBanner: React.FC<WisdomBannerProps> = ({ wisdomList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeWisdom = wisdomList[currentIndex % wisdomList.length];

  const handleNextWisdom = () => {
    setCurrentIndex((prev) => (prev + 1) % wisdomList.length);
  };

  const copyWisdom = () => {
    const textToCopy = `“${activeWisdom.translation}”\n— ${activeWisdom.author} (${activeWisdom.reference})\n\nFocus Lesson: ${activeWisdom.studentTakeaway}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border border-stone-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-[#FCFBF8] via-white to-[#FAF8F5] dark:from-[#0F131A] dark:via-[#0D1017] dark:to-[#0A0D12] space-y-5 shadow-xs overflow-hidden">
      {/* Subtle decorative watermark quotation mark in background */}
      <div 
        aria-hidden="true" 
        className="absolute -top-3 right-4 text-7xl sm:text-8xl font-editorial font-serif text-stone-200/40 dark:text-zinc-800/30 select-none pointer-events-none leading-none"
      >
        “
      </div>

      {/* Top Provenance & Action Header */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-3 border-b border-stone-200/70 dark:border-zinc-800/80 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-zinc-800 text-stone-800 dark:text-stone-200 text-[11px] font-semibold tracking-wider uppercase">
            <BookOpen className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Bhagavad Gītā</span>
          </span>
          <span aria-hidden="true" className="text-stone-300 dark:text-zinc-700">·</span>
          <span className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">
            {activeWisdom.reference}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleNextWisdom}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-stone-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-400 dark:hover:border-zinc-600 transition-colors cursor-pointer text-[11px] shadow-2xs"
            title="Next verse"
          >
            <Shuffle className="w-3 h-3" />
            <span>Next Verse</span>
          </button>

          <button
            onClick={copyWisdom}
            className="p-1.5 rounded-md border border-stone-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-400 dark:hover:border-zinc-600 transition-colors cursor-pointer shadow-2xs"
            title="Copy reflection"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Sanskrit Sacred Verse & Transliteration */}
      {activeWisdom.sanskritVerse && (
        <div className="space-y-1.5 relative z-10 pt-1">
          <p className="text-base sm:text-lg md:text-xl font-sanskrit font-semibold text-stone-900 dark:text-stone-100 tracking-wide leading-relaxed">
            {activeWisdom.sanskritVerse}
          </p>
          {activeWisdom.transliteration && (
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-editorial italic tracking-normal leading-relaxed">
              {activeWisdom.transliteration}
            </p>
          )}
        </div>
      )}

      {/* Editorial Pull-Quote Block (English Translation) */}
      <div className="relative pl-5 pr-4 py-3.5 rounded-r-xl border-l-2 border-amber-600/80 dark:border-amber-400/80 bg-amber-50/40 dark:bg-amber-950/20 z-10">
        <blockquote className="text-sm sm:text-base md:text-lg font-editorial italic text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
          “{activeWisdom.translation}”
        </blockquote>
        <div className="mt-2 text-[11px] font-mono text-stone-500 dark:text-stone-400 flex items-center gap-1.5 not-italic">
          <span>— {activeWisdom.author}</span>
          <span aria-hidden="true">·</span>
          <span>{activeWisdom.reference}</span>
        </div>
      </div>

      {/* Action Takeaway / Focus Lesson */}
      <div className="p-3.5 rounded-xl border border-stone-200/70 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 space-y-1 z-10 relative">
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <Compass className="w-3 h-3" />
          <span>Practical Directive for Builders & Students</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
          {activeWisdom.studentTakeaway}
        </p>
      </div>
    </div>
  );
};
