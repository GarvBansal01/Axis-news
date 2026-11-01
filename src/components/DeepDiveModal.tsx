import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Check, 
  Calendar, 
  Zap, 
  AlertCircle,
  MapPin,
  Clock,
  Users,
  Target
} from 'lucide-react';
import { NewsArticle } from '../types';

interface DeepDiveModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const DeepDiveModal: React.FC<DeepDiveModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    const verifiedUrl = article.verifiedSearchUrl || article.deepDive.verifiedNewsSearchUrl || `https://news.google.com/search?q=${encodeURIComponent(article.title + ' news')}&hl=en-IN&gl=IN&ceid=IN:en`;
    const text = `📰 ${article.title}\n\n${article.deepDive.overview}\n\nIncident Date: ${article.incidentDate || article.dateLabel}\nVerified Live Coverage: ${verifiedUrl}\nOfficial Filing: ${article.deepDive.officialSourceUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-6 md:p-8 space-y-5 max-h-[90vh] overflow-y-auto font-sans">
        {/* Top Header & Close Trigger */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="uppercase font-semibold text-zinc-900 dark:text-zinc-100">
                {article.locationScope}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.category.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{article.incidentDate || article.dateLabel || article.publishedAt}</span>
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-editorial font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              {article.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source & Filing Provenance */}
        <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-1 text-xs">
          <div className="flex items-center justify-between text-zinc-500 font-mono">
            <span>Primary Reporting & Source:</span>
            <strong className="text-zinc-900 dark:text-zinc-100">{article.sourceName}</strong>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            {article.verificationNote}
          </p>
          <div className="text-[11px] text-zinc-500 font-mono pt-0.5">
            Official Document / Gazette: <strong className="text-zinc-700 dark:text-zinc-300">{article.deepDive.sourceDocName}</strong>
          </div>
        </div>

        {/* Executive Overview */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
            Executive Brief
          </h3>
          <p className="text-sm md:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed font-editorial">
            {article.deepDive.overview}
          </p>
        </div>

        {/* ================= WHAT IS THE INCIDENT? ================= */}
        <div className="p-4 rounded-xl border border-blue-500/25 bg-blue-500/[0.04] dark:bg-blue-950/20 space-y-1.5 text-xs md:text-sm">
          <div className="flex flex-wrap items-center justify-between gap-1 text-blue-700 dark:text-blue-400 font-mono font-bold text-xs uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600 shrink-0" />
              <span>What Is The Incident?</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
              <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Occurred: <strong>{article.incidentDate || article.dateLabel}</strong></span>
            </div>
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
            {article.whatIsIt || article.takeaway}
          </p>
        </div>

        {/* ================= 5W+1H INCIDENT INTEL (WHERE · WHEN · WHO · WHAT · WHY · HOW) ================= */}
        {article.factSheet && (
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/[0.03] dark:bg-blue-950/25 p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-blue-500/15 pb-2">
              <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-mono font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Incident Intel & Granular Verification</span>
              </div>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Factsheet (5W+1H)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans">
              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Where (Location)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{article.factSheet.where}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">When (Date & Time)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{article.factSheet.when}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <Users className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Who (Entities Involved)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{article.factSheet.who}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                <Zap className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">What (Factual Action)</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium text-xs leading-tight block">{article.factSheet.what}</span>
                </div>
              </div>
            </div>

            {/* Why & How */}
            <div className="space-y-1.5 pt-1.5 border-t border-blue-500/10">
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5">Why</span>
                <span className="leading-relaxed">{article.factSheet.why}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 shrink-0 mt-0.5">How / Action</span>
                <span className="leading-relaxed">{article.factSheet.how}</span>
              </div>
            </div>
          </div>
        )}

        {/* What is Really the Problem & Root Cause Breakdown */}
        {(article.theRealProblem || article.deepDive.rootCauseAnalysis) && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/[0.05] dark:bg-red-950/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
              <span>🔍 What is Really the Problem? (Root Cause & Reality Check)</span>
            </div>
            {article.theRealProblem && (
              <p className="text-xs md:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                {article.theRealProblem}
              </p>
            )}
            {article.deepDive.rootCauseAnalysis && (
              <div className="pt-2 border-t border-red-500/15 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5 font-mono text-[11px] uppercase">
                  Underlying Conflict / Systemic Failure:
                </strong>
                {article.deepDive.rootCauseAnalysis}
              </div>
            )}
          </div>
        )}

        {/* Key Background */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
            Background & Structural Context
          </h3>
          <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {article.deepDive.keyBackground}
          </p>
        </div>

        {/* Chronological Timeline */}
        {article.deepDive.timeline.length > 0 && (
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Timeline of Events
            </h3>
            <div className="space-y-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              {article.deepDive.timeline.map((item, idx) => (
                <div key={idx} className="relative pl-3 space-y-0.5">
                  <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.time}
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Authority Quotes */}
        {article.deepDive.keyQuotes.length > 0 && (
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Key Statements & Direct Testimony
            </h3>
            <div className="space-y-3">
              {article.deepDive.keyQuotes.map((q, idx) => (
                <blockquote
                  key={idx}
                  className="relative pl-4 pr-3 py-3 rounded-r-xl border-l-2 border-stone-700 dark:border-stone-300 bg-stone-50/80 dark:bg-zinc-900/60 text-stone-900 dark:text-stone-100 font-editorial text-sm md:text-base leading-relaxed"
                >
                  <p className="italic font-normal">
                    “{q.quote}”
                  </p>
                  <footer className="mt-2 not-italic font-mono text-[11px] text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{q.speaker}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-500">{q.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        {/* Student Impact Note */}
        <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 space-y-1">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            Takeaway for Students & Career Growth
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-300">
            {article.deepDive.impactForStudents}
          </p>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(article.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                isSaved
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent'
                  : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 cursor-pointer"
              title="Copy Summary & Links"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Dual Verified Source Options: Live Google News Coverage + Official Regulatory Filing */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={article.verifiedSearchUrl || article.deepDive.verifiedNewsSearchUrl || `https://news.google.com/search?q=${encodeURIComponent(article.title + ' news')}&hl=en-IN&gl=IN&ceid=IN:en`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-xs shadow-xs transition-colors cursor-pointer"
              title="Verify live reporting across The Hindu, Indian Express, BBC, Reuters"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify Coverage (Google News)</span>
            </a>

            <a
              href={article.deepDive.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Official Agency / Government Portal Record"
            >
              <span>Filing: {article.deepDive.sourceDocName || 'Official Source'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
