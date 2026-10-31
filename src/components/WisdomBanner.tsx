import React, { useState } from 'react';
import { Shuffle, Check, Copy } from 'lucide-react';
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
    const textToCopy = `"${activeWisdom.translation}"\n— ${activeWisdom.author} (${activeWisdom.reference})\n\nFocus Lesson: ${activeWisdom.studentTakeaway}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-950 space-y-3.5 shadow-2xs">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-2 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            Daily Reflection
          </span>
          <span aria-hidden="true">·</span>
          <span>{activeWisdom.author}</span>
          <span aria-hidden="true">·</span>
          <span>{activeWisdom.reference}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleNextWisdom}
            className="flex items-center gap-1 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer text-[11px]"
            title="Next verse"
          >
            <Shuffle className="w-3 h-3" />
            <span>Next</span>
          </button>

          <button
            onClick={copyWisdom}
            className="p-1 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            title="Copy reflection"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Sanskrit Verse & Transliteration */}
      {activeWisdom.sanskritVerse && (
        <div className="space-y-1">
          <p className="text-sm md:text-base font-editorial font-medium text-zinc-900 dark:text-zinc-100 tracking-wide leading-relaxed">
            {activeWisdom.sanskritVerse}
          </p>
          {activeWisdom.transliteration && (
            <p className="text-[11px] text-zinc-400 font-mono italic">
              {activeWisdom.transliteration}
            </p>
          )}
        </div>
      )}

      {/* English Translation */}
      <blockquote className="text-xs md:text-sm font-editorial italic text-zinc-700 dark:text-zinc-300 leading-relaxed border-l-2 border-zinc-300 dark:border-zinc-700 pl-3">
        "{activeWisdom.translation}"
      </blockquote>

      {/* Student Action Takeaway */}
      <div className="text-xs text-zinc-500 pt-0.5">
        <strong className="text-zinc-700 dark:text-zinc-300 font-mono uppercase tracking-wider block text-[10px] mb-0.5">
          Focus Lesson:
        </strong>
        <span>{activeWisdom.studentTakeaway}</span>
      </div>
    </div>
  );
};
