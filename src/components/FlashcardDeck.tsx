import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  FileText, 
  ShieldCheck, 
  Flame, 
  Info, 
  Check, 
  FastForward,
  AlertTriangle
} from 'lucide-react';
import { NewsArticle } from '../types';

interface FlashcardDeckProps {
  articles: NewsArticle[];
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
  onOpenDeepDive: (article: NewsArticle) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  articles,
  savedArticleIds,
  onToggleSave,
  onOpenDeepDive
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [copied, setCopied] = useState(false);

  // Bounds check
  const safeIndex = articles.length === 0 ? 0 : Math.min(currentIndex, articles.length - 1);
  const currentArticle = articles[safeIndex];

  // Stop audio when changing article
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const handlePrev = () => {
    stopAudio();
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    } else {
      setCurrentIndex(articles.length - 1); // loop
    }
  };

  const handleNext = () => {
    stopAudio();
    if (safeIndex < articles.length - 1) {
      setCurrentIndex(safeIndex + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, articles.length]);

  // Audio speech synthesis
  const toggleAudio = () => {
    if (!('speechSynthesis' in window) || !currentArticle) return;

    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `${currentArticle.title}. Key Takeaway: ${currentArticle.takeaway}. Context: ${currentArticle.bullets.join('. ')}. Source: ${currentArticle.sourceName}`;
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = playbackRate;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const cyclePlaybackRate = () => {
    const rates = [1.0, 1.25, 1.5];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (isPlayingAudio) {
      stopAudio();
      setTimeout(toggleAudio, 100);
    }
  };

  const handleShare = () => {
    if (!currentArticle) return;
    const shareText = `📰 ${currentArticle.title}\n\n💡 TAKEAWAY: ${currentArticle.takeaway}\n\n📌 KEY POINTS:\n• ${currentArticle.bullets.join('\n• ')}\n\n🔍 Source: ${currentArticle.sourceName} (${currentArticle.verification === 'govt_verified' ? 'Govt Verified' : 'Community Radar'})\n— Shared via The Daily Brief (Siliguri Student Edition)`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!currentArticle) {
    return (
      <div className="py-16 text-center text-stone-500">
        <p className="text-base font-editorial">No stories match your current filter.</p>
        <p className="text-xs mt-1">Try resetting the category or unchecking "Govt Verified Only".</p>
      </div>
    );
  }

  const isSaved = savedArticleIds.includes(currentArticle.id);

  return (
    <div className="py-6 max-w-3xl mx-auto">
      {/* Progress & Deck Navigation Ribbon */}
      <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 mb-3 px-1 font-mono-nums">
        <span className="font-medium">
          STORY {safeIndex + 1} OF {articles.length}
        </span>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs mx-4 h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 dark:bg-stone-100 transition-all duration-300"
            style={{ width: `${((safeIndex + 1) / articles.length) * 100}%` }}
          />
        </div>

        <span className="hidden sm:inline">Use ← / → keys to flip</span>
      </div>

      {/* Hero Flashcard Container */}
      <article className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-stone-800/80 text-xs">
          {/* Category & Location */}
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 font-mono-nums">
              {currentArticle.locationScope}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="capitalize text-stone-600 dark:text-stone-400">
              {currentArticle.category === 'local' 
                ? 'Siliguri & Regional' 
                : currentArticle.category === 'geopolitics' 
                ? 'Geopolitics & War' 
                : currentArticle.category === 'disaster' 
                ? 'Disaster & Alerts' 
                : currentArticle.category === 'national' 
                ? 'India National' 
                : currentArticle.category}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-stone-600 dark:text-stone-400 font-mono-nums">{currentArticle.readTime}</span>
          </div>

          {/* Source Verification Marker */}
          {currentArticle.verification === 'emergency_alert' ? (
            <div
              className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-bold text-xs bg-red-50 dark:bg-red-950/50 px-2.5 py-1 rounded-md border border-red-300 dark:border-red-800 animate-pulse"
              title={currentArticle.verificationNote}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Emergency / Disaster Alert</span>
            </div>
          ) : currentArticle.verification === 'govt_verified' ? (
            <div
              className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium text-xs bg-emerald-50/80 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200/80 dark:border-emerald-800/60"
              title={currentArticle.verificationNote}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Govt / Official Verified</span>
            </div>
          ) : currentArticle.verification === 'reputable_media' ? (
            <div
              className="flex items-center gap-1.5 text-blue-800 dark:text-blue-300 font-medium text-xs bg-blue-50/80 dark:bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-200/80 dark:border-blue-800/60"
              title={currentArticle.verificationNote}
            >
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Peer / Agency Verified</span>
            </div>
          ) : (
            <div
              className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-medium text-xs bg-amber-50/80 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200/80 dark:border-amber-800/60"
              title={currentArticle.verificationNote}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Hot Topic · Unverified Leak</span>
            </div>
          )}
        </div>

        {/* Headline */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-snug mt-4">
          {currentArticle.title}
        </h2>

        {/* 1-Sentence Punchy Takeaway */}
        <div className="my-4 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 font-mono-nums mb-1">
            KEY TAKEAWAY
          </p>
          <p className="text-sm md:text-base font-editorial italic text-stone-900 dark:text-stone-100 leading-relaxed">
            "{currentArticle.takeaway}"
          </p>
        </div>

        {/* 3 Synthesized Bullets */}
        <div className="space-y-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 font-mono-nums">
            WHAT YOU NEED TO KNOW
          </p>
          <ul className="space-y-2.5 text-sm md:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
            {currentArticle.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 mt-2 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Source Attestation Line */}
        <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-1.5">
            <span>Source:</span>
            <strong className="text-stone-800 dark:text-stone-200 font-medium">
              {currentArticle.sourceName}
            </strong>
            <span aria-hidden="true">·</span>
            <span>{currentArticle.publishedAt}</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400">
            {currentArticle.tags.map((tag) => (
              <span key={tag} className="hover:underline">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
          {/* Audio Reader Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 text-indigo-700 dark:text-indigo-300'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
              title="Read 30s summary aloud via Web Speech API"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Listen (30s)</span>
                </>
              )}
            </button>

            {/* Playback Speed Multiplier */}
            <button
              onClick={cyclePlaybackRate}
              className="px-2 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-mono-nums text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 cursor-pointer"
              title="Adjust speech playback speed"
            >
              <FastForward className="w-3 h-3" />
              <span>{playbackRate}x</span>
            </button>
          </div>

          {/* Deep-Dive, Bookmark & Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDeepDive(currentArticle)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer shadow-xs"
              title="Open full timeline, quotes, and primary documents"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Detail</span>
            </button>

            <button
              onClick={() => onToggleSave(currentArticle.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-700 dark:text-amber-400'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save for exam or study notes'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
              title="Copy bullet points summary to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </article>

      {/* Flip Card Controls (Left & Right Arrow Buttons) */}
      <div className="flex items-center justify-between mt-5 px-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Brief</span>
        </button>

        <span className="text-xs text-stone-600 dark:text-stone-400 font-mono-nums">
          Card {safeIndex + 1} of {articles.length}
        </span>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
        >
          <span>Next Brief</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
