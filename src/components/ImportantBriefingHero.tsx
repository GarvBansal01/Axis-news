import React, { useState } from 'react';
import { 
  Flame, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { NewsArticle } from '../types';
import { speakText, stopSpeech } from '../utils/audioPlayer';

interface ImportantBriefingHeroProps {
  topArticles: NewsArticle[];
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
  onOpenDeepDive: (article: NewsArticle) => void;
}

export const ImportantBriefingHero: React.FC<ImportantBriefingHeroProps> = ({
  topArticles,
  savedArticleIds,
  onToggleSave,
  onOpenDeepDive
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!topArticles || topArticles.length === 0) return null;

  const activeArticle = topArticles[currentIndex % topArticles.length];
  const isSaved = savedArticleIds.includes(activeArticle.id);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    stopSpeech();
    setIsPlayingAudio(true);
    const script = `${activeArticle.title}. Core Takeaway: ${activeArticle.takeaway}. What is really the problem: ${activeArticle.theRealProblem}. Key facts: ${activeArticle.bullets.join('. ')}. Source: ${activeArticle.sourceName}`;
    speakText(
      script,
      1.15,
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const handleShare = () => {
    const text = `⚡ WHAT'S IMPORTANT RIGHT NOW: ${activeArticle.title}\n\n🔍 The Real Problem: ${activeArticle.theRealProblem}\n\n• ${activeArticle.bullets.join('\n• ')}\n\nRead more on AXIS 24H Radar`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNext = () => {
    stopSpeech();
    setIsPlayingAudio(false);
    setCurrentIndex((prev) => (prev + 1) % topArticles.length);
  };

  const handlePrev = () => {
    stopSpeech();
    setIsPlayingAudio(false);
    setCurrentIndex((prev) => (prev - 1 + topArticles.length) % topArticles.length);
  };

  return (
    <section className="mb-6 rounded-2xl border-2 border-amber-500/30 dark:border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] via-white to-orange-500/[0.04] dark:from-amber-950/20 dark:via-zinc-950 dark:to-orange-950/15 p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all font-sans">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

      {/* Top Banner Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase border border-amber-500/25 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-current" />
            <span>What&apos;s Important Right Now</span>
          </span>

          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {activeArticle.locationScope} · {activeArticle.dateLabel || activeArticle.publishedAt}
          </span>
        </div>

        {/* Carousel Switcher for Top Highlights */}
        {topArticles.length > 1 && (
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[11px] text-zinc-400">
              {currentIndex + 1} of {topArticles.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-zinc-600 dark:text-zinc-300"
                aria-label="Previous important story"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-zinc-600 dark:text-zinc-300"
                aria-label="Next important story"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Headline */}
      <div className="pt-3 space-y-2.5">
        <h2 
          onClick={() => onOpenDeepDive(activeArticle)}
          className="text-xl sm:text-2xl font-editorial font-bold text-zinc-900 dark:text-zinc-50 leading-snug tracking-tight hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
        >
          {activeArticle.title}
        </h2>

        {/* 30-Second Executive Summary */}
        <p className="text-sm md:text-[15px] font-editorial italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
          &ldquo;{activeArticle.takeaway}&rdquo;
        </p>

        {/* ================= WHAT IS REALLY THE PROBLEM? (ROOT CAUSE) ================= */}
        <div className="my-3.5 p-3.5 rounded-xl border border-red-500/25 bg-red-500/[0.06] dark:bg-red-950/20 text-xs md:text-sm space-y-1">
          <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-mono font-bold text-[11px] uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>What is Really the Problem? (Root Cause & Reality Check)</span>
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
            {activeArticle.theRealProblem}
          </p>
        </div>

        {/* 3 Key Verified Bullets */}
        <ul className="space-y-1.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-sans pt-1">
          {activeArticle.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Action Controls & Primary "Know More" Button */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            {/* Primary "Know More" Action Button */}
            <button
              onClick={() => onOpenDeepDive(activeArticle)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-md group"
            >
              <span>Know More (Full Deep Dive)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Audio Button */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-800 dark:text-amber-300'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>30s Audio</span>
                </>
              )}
            </button>
          </div>

          {/* Source Provenance & Bookmark / Share */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
            <span className="hidden sm:inline">Source: <strong>{activeArticle.sourceName}</strong></span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onToggleSave(activeArticle.id)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isSaved
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
                title={isSaved ? 'Saved' : 'Save Brief'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                title="Share this briefing"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
