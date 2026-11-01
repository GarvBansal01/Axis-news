import React, { useState } from 'react';
import { 
  Flame, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Calendar,
  Zap,
  MapPin,
  Clock,
  Users,
  Target,
  ExternalLink
} from 'lucide-react';
import { NewsArticle } from '../types';

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
  const [copied, setCopied] = useState(false);

  if (!topArticles || topArticles.length === 0) return null;

  const activeArticle = topArticles[currentIndex % topArticles.length];
  const isSaved = savedArticleIds.includes(activeArticle.id);

  const handleShare = () => {
    const text = `⚡ WHAT'S IMPORTANT RIGHT NOW: ${activeArticle.title}\n\n🔍 The Real Problem: ${activeArticle.theRealProblem}\n\n• ${activeArticle.bullets.join('\n• ')}\n\nRead more on AXIS 24H Radar`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % topArticles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + topArticles.length) % topArticles.length);
  };

  return (
    <section className="mb-6 rounded-2xl border-2 border-amber-500/30 dark:border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] via-white to-orange-500/[0.04] dark:from-amber-950/20 dark:via-zinc-950 dark:to-orange-950/15 p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all font-sans">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

      {/* Top Banner Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase border border-amber-500/25 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-current" />
            <span>What&apos;s Important Right Now</span>
          </span>

          {/* Exact Incident Date & Time */}
          <span className="flex items-center gap-1 text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
            <span>Incident: <strong>{activeArticle.incidentDate || activeArticle.dateLabel || activeArticle.publishedAt}</strong></span>
          </span>

          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {activeArticle.locationScope} · {activeArticle.sourceName}
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

        {/* ================= WHAT IS THE INCIDENT? (INCIDENT OVERVIEW & TIMING) ================= */}
        <div className="my-2.5 p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/[0.04] dark:bg-blue-950/20 text-xs md:text-sm space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-1 text-blue-700 dark:text-blue-400 font-mono font-bold text-[11px] uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>What Is The Incident?</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-normal">
              <Calendar className="w-3 h-3 text-blue-500 shrink-0" />
              <span>Date: <strong>{activeArticle.incidentDate || activeArticle.dateLabel}</strong></span>
            </div>
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
            {activeArticle.whatIsIt || activeArticle.takeaway}
          </p>
        </div>

        {/* ================= 5W+1H INCIDENT INTEL (WHERE · WHEN · WHO · WHAT · WHY · HOW) ================= */}
        {activeArticle.factSheet && (
          <div className="rounded-xl border border-blue-500/25 bg-blue-500/[0.03] dark:bg-blue-950/20 p-3.5 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-blue-500/15 pb-2">
              <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-mono font-bold text-[11px] uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Incident Intel & Granular Verification</span>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                Verified Facts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Where (Location)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{activeArticle.factSheet.where}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">When (Date & Time)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{activeArticle.factSheet.when}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Who (Entities Involved)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{activeArticle.factSheet.who}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <Zap className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">What (Factual Event)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{activeArticle.factSheet.what}</span>
                </div>
              </div>
            </div>

            {/* Why & How */}
            <div className="space-y-1.5 pt-1 border-t border-blue-500/10">
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5">Why</span>
                <span className="leading-relaxed">{activeArticle.factSheet.why}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 shrink-0 mt-0.5">How / Action</span>
                <span className="leading-relaxed">{activeArticle.factSheet.how}</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= WHAT IS REALLY THE PROBLEM? (ROOT CAUSE) ================= */}
        <div className="my-2.5 p-3.5 rounded-xl border border-red-500/25 bg-red-500/[0.06] dark:bg-red-950/20 text-xs md:text-sm space-y-1">
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
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary "Know More" Action Button */}
            <button
              onClick={() => onOpenDeepDive(activeArticle)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-md group"
            >
              <span>Know More (Full Deep Dive)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Direct Verified Google News Link */}
            <a
              href={activeArticle.verifiedSearchUrl || `https://news.google.com/search?q=${encodeURIComponent(activeArticle.title + ' news')}&hl=en-IN&gl=IN&ceid=IN:en`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 font-semibold px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
              title="Read live verified articles from The Hindu, Indian Express, BBC, Reuters"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Verify on Google News</span>
            </a>
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
