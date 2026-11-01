import React, { useState } from 'react';
import { X, ExternalLink, Volume2, VolumeX, Bookmark, Share2, Check } from 'lucide-react';
import { NewsArticle } from '../types';
import { speakText, stopSpeech } from '../utils/audioPlayer';

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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!article) return null;

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const narrationText = `${article.title}. Summary: ${article.deepDive.overview}. Historical Context: ${article.deepDive.keyBackground}. Student Impact: ${article.deepDive.impactForStudents}`;
    
    setIsPlayingAudio(true);
    speakText(
      narrationText,
      1.0,
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const handleShare = () => {
    const text = `📰 ${article.title}\n\n${article.deepDive.overview}\n\nSource: ${article.deepDive.officialSourceUrl}`;
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
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{article.dateLabel || article.publishedAt}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-editorial font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              {article.title}
            </h2>
          </div>

          <button
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source & Filing Provenance */}
        <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-1 text-xs">
          <div className="flex items-center justify-between text-zinc-500 font-mono">
            <span>Primary Source & Origin:</span>
            <strong className="text-zinc-900 dark:text-zinc-100">{article.sourceName}</strong>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            {article.verificationNote}
          </p>
          <div className="text-[11px] text-zinc-500 font-mono pt-0.5">
            Document Record: <strong className="text-zinc-700 dark:text-zinc-300">{article.deepDive.sourceDocName}</strong>
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
              onClick={toggleAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium cursor-pointer"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Aloud</span>
                </>
              )}
            </button>

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
              title="Copy Summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={article.deepDive.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-mono text-xs hover:underline"
          >
            <span>Original Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
