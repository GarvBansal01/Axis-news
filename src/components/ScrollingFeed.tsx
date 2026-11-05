import React, { useState } from 'react';
import { 
  Bookmark, 
  Share2, 
  FileText, 
  Check,
  ArrowUp,
  AlertTriangle,
  ShieldCheck,
  Globe,
  Calendar,
  Zap,
  MapPin,
  Clock,
  Users,
  Target,
  ExternalLink
} from 'lucide-react';
import { NewsArticle } from '../types';

interface ScrollingFeedProps {
  articles: NewsArticle[];
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
  onOpenDeepDive: (article: NewsArticle) => void;
}

export const ScrollingFeed: React.FC<ScrollingFeedProps> = ({
  articles,
  savedArticleIds,
  onToggleSave,
  onOpenDeepDive
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (article: NewsArticle) => {
    const shareText = `⚡ ${article.title}\n\n"${article.takeaway}"\n\n• ${article.bullets.join('\n• ')}\n\nSource: ${article.sourceName} · via AXIS 24H Radar`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: shareText,
          url: window.location.origin
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopiedId(article.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        // Ignore
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (articles.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500 space-y-2">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          No dispatches match your current filter.
        </p>
        <p className="text-xs">
          Try clearing search keywords or selecting another category.
        </p>
      </div>
    );
  }

  return (
    <div className="py-2 space-y-3">
      {/* Dispatches List */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80 border-y border-zinc-200 dark:border-zinc-800/80">
        {articles.map((article) => {
          const isSaved = savedArticleIds.includes(article.id);
          const isEmergency = article.verification === 'emergency_alert' || article.category === 'disaster';
          const isGeopolitics = article.category === 'geopolitics';

          return (
            <article
              key={article.id}
              className={`py-5 space-y-3 transition-colors px-2 sm:px-3 rounded-xl ${
                isEmergency 
                  ? 'bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 dark:border-red-900/40 my-2' 
                  : 'hover:bg-zinc-50/60 dark:hover:bg-zinc-900/30'
              }`}
            >
              {/* Top Source, Category Badge & Timestamp Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 font-mono">
                <div className="flex items-center gap-2">
                  {isEmergency && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
                      <AlertTriangle className="w-3 h-3" />
                      <span>DISASTER ALERT</span>
                    </span>
                  )}
                  {isGeopolitics && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                      <Globe className="w-3 h-3" />
                      <span>GEOPOLITICS</span>
                    </span>
                  )}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {article.sourceName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-400">{article.locationScope}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-500 inline shrink-0" />
                    <span>{article.incidentDate || article.dateLabel || article.publishedAt}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {article.verification === 'govt_verified' && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Govt Verified</span>
                    </span>
                  )}
                  <span className="text-[11px] text-zinc-400">{article.readTime}</span>
                </div>
              </div>

              {/* Headline */}
              <h2
                onClick={() => onOpenDeepDive(article)}
                className="text-lg md:text-xl font-editorial font-bold text-stone-900 dark:text-stone-100 leading-snug tracking-tight hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
              >
                {article.title}
              </h2>

              {/* Editorial Synthesis Takeaway (Quoted Text) */}
              <div className={`relative pl-4 pr-3 py-2.5 rounded-r-lg border-l-2 text-xs md:text-sm font-editorial leading-relaxed ${
                isEmergency 
                  ? 'border-red-600 bg-red-500/10 text-red-950 dark:text-red-200' 
                  : 'border-amber-600/80 dark:border-amber-400/80 bg-amber-500/5 dark:bg-amber-400/5 text-stone-800 dark:text-stone-200'
              }`}>
                <span className={`block text-[10px] font-mono font-semibold uppercase tracking-wider mb-0.5 ${
                  isEmergency ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'
                }`}>
                  Core Takeaway (30s)
                </span>
                <p className="italic font-normal text-stone-900 dark:text-stone-100 text-sm md:text-[15px]">
                  “{article.takeaway}”
                </p>
              </div>

              {/* What Is The Incident & Timing Breakdown */}
              <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/[0.04] dark:bg-blue-950/20 text-xs space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1 text-blue-700 dark:text-blue-400 font-mono font-bold text-[10.5px] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>What Is The Incident?</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-normal">
                    {article.incidentDate || article.dateLabel}
                  </span>
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
                  {article.whatIsIt || article.takeaway}
                </p>
              </div>

              {/* ================= 5W+1H INCIDENT INTEL (WHERE · WHEN · WHO · WHAT · WHY · HOW) ================= */}
              {article.factSheet && (
                <div className="rounded-xl border border-blue-500/25 bg-blue-500/[0.03] dark:bg-blue-950/20 p-3.5 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-blue-500/15 pb-2">
                    <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-mono font-bold text-[11px] uppercase tracking-wider">
                      <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Incident Intel & Verification</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                      Where · When · Who · Why · How
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
                    <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Where (Location)</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium text-[11.5px] leading-tight block">{article.factSheet.where}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">When (Date & Time)</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium text-[11.5px] leading-tight block">{article.factSheet.when}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                      <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Who (Entities Involved)</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium text-[11.5px] leading-tight block">{article.factSheet.who}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                      <Zap className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">What (Factual Action)</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium text-[11.5px] leading-tight block">{article.factSheet.what}</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How / Resolution */}
                  <div className="space-y-1.5 pt-1 border-t border-blue-500/10">
                    <div className="flex items-start gap-2 text-[11.5px] text-zinc-700 dark:text-zinc-300">
                      <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5">Why</span>
                      <span className="leading-relaxed">{article.factSheet.why}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[11.5px] text-zinc-700 dark:text-zinc-300">
                      <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 shrink-0 mt-0.5">How / Action</span>
                      <span className="leading-relaxed">{article.factSheet.how}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* The Real Problem & Root Cause Box */}
              {article.theRealProblem && (
                <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-900/60 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-mono font-bold text-[10.5px] uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>What is Really the Problem?</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {article.theRealProblem}
                  </p>
                </div>
              )}

              {/* 3 Synthesized Bullets */}
              <ul className="space-y-1.5 text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pt-0.5 font-sans">
                {article.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-600 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Action Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onOpenDeepDive(article)}
                    className="flex items-center gap-1.5 text-xs text-zinc-900 dark:text-zinc-100 hover:text-white dark:hover:text-zinc-950 font-semibold px-3 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-100 transition-colors cursor-pointer shadow-2xs group"
                  >
                    <span>Know More</span>
                    <FileText className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
                  </button>

                  {/* Direct Verified Google News Link */}
                  <a
                    href={article.verifiedSearchUrl || `https://news.google.com/search?q=${encodeURIComponent(article.title + ' news')}&hl=en-IN&gl=IN&ceid=IN:en`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
                    title="Read live verified articles from The Hindu, Indian Express, BBC, Reuters"
                  >
                    <ExternalLink className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span>Verify on Google News</span>
                  </a>
                </div>

                {/* Right controls: Bookmark, Share */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleSave(article.id)}
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      isSaved
                        ? 'text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                    }`}
                    title={isSaved ? 'Saved in bookmarks' : 'Save'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => handleShare(article)}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Copy bullets"
                  >
                    {copiedId === article.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Back to top */}
      <div className="flex justify-center pt-6">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 transition-all cursor-pointer"
        >
          <ArrowUp className="w-3 h-3" />
          <span>Top</span>
        </button>
      </div>
    </div>
  );
};
