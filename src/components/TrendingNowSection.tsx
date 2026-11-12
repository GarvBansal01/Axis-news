import React, { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Layers, 
  RefreshCw,
  ShieldCheck,
  Zap,
  Info,
  GraduationCap
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';

interface TrendingNowSectionProps {
  top5Articles?: NewsArticle[];
  topArticles?: NewsArticle[];
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
  onOpenDeepDive: (article: NewsArticle) => void;
  lastCalculatedAt?: number;
  secondsToNextRecalc?: number;
  onManualRecalculate?: () => void;
}

export const TrendingNowSection: React.FC<TrendingNowSectionProps> = ({
  top5Articles,
  topArticles,
  savedArticleIds,
  onToggleSave,
  onOpenDeepDive,
  lastCalculatedAt = Date.now(),
  secondsToNextRecalc = 15 * 60,
  onManualRecalculate
}) => {
  const articlesToDisplay = (top5Articles || topArticles || []).slice(0, 5);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);
  const [showFormulaInfo, setShowFormulaInfo] = useState<boolean>(false);

  const handleManualRecalc = () => {
    if (isRecalculating || !onManualRecalculate) return;
    setIsRecalculating(true);
    onManualRecalculate();
    setTimeout(() => setIsRecalculating(false), 600);
  };

  const handleShare = async (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `🔥 TRENDING ON AXIS: ${article.title}\n\n"${article.takeaway}"\n\nTrending Score: ${article.trendingScore || 0} (Reported across ${article.trendingBreakdown?.sourceCount || 1} distinct sources within 6h).\n\nRead more on AXIS News Radar`;

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
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/20 shadow-md',
          border: 'border-amber-500/30 dark:border-amber-500/40',
          pill: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        };
      case 2:
        return {
          bg: 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/20 shadow-md',
          border: 'border-rose-500/30 dark:border-rose-500/40',
          pill: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
        };
      case 3:
        return {
          bg: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20 shadow-md',
          border: 'border-purple-500/30 dark:border-purple-500/40',
          pill: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
        };
      default:
        return {
          bg: 'bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900',
          border: 'border-zinc-200 dark:border-zinc-800',
          pill: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
        };
    }
  };

  const getCategoryColor = (category: NewsCategory) => {
    switch (category) {
      case 'education': return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40';
      case 'startups': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40';
      case 'ai': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40';
      case 'science': return 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40';
      case 'disaster': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/40';
      case 'national': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40';
      case 'geopolitics': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40';
      default: return 'text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800';
    }
  };

  if (!articlesToDisplay || articlesToDisplay.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-xs text-zinc-500">
        Aggregating multi-source news clusters within the 6-hour window...
      </div>
    );
  }

  return (
    <section className="space-y-6 animate-fade-in" aria-label="Trending News Detection Radar">
      {/* Editorial Header & Scheduled Recalculation Bar */}
      <div className="p-5 sm:p-6 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-gradient-to-br from-rose-50/60 via-white to-amber-50/40 dark:from-rose-950/20 dark:via-zinc-950 dark:to-amber-950/20 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-mono font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                <span>Trending Now Radar</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                Top 5 High-Velocity Stories
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Algorithmic Trending Detection
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Calculated using multi-source reporting across accredited wires within a 6-hour window, weighted by student view velocity and logarithmic time decay.
            </p>
          </div>

          {/* 15-Minute Scheduled Job Status Pill */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-zinc-200/60 dark:border-zinc-800/60 pt-3 sm:pt-0">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">15m Scheduled Job</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>Next recalc in: <strong className="text-zinc-800 dark:text-zinc-200 font-bold">{formatCountdown(secondsToNextRecalc)}</strong></span>
              {onManualRecalculate && (
                <button
                  onClick={handleManualRecalc}
                  disabled={isRecalculating}
                  className="ml-1 p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
                  title="Manually trigger trending score recalculation"
                >
                  <RefreshCw className={`w-3 h-3 ${isRecalculating ? 'animate-spin text-rose-500' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Formula Transparency Drawer Toggle */}
        <div className="pt-2 border-t border-rose-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Info className="w-3 h-3 text-rose-500" />
            <span>Formula: <code className="bg-white/80 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-800 dark:text-zinc-200">(source_count × 2) + view_count - (hours_ago × 0.6)</code></span>
          </div>
          <button
            onClick={() => setShowFormulaInfo(!showFormulaInfo)}
            className="text-rose-600 dark:text-rose-400 hover:underline cursor-pointer font-medium"
          >
            {showFormulaInfo ? 'Hide Details ▲' : 'Inspect Algorithm ▼'}
          </button>
        </div>

        {showFormulaInfo && (
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-xs font-mono space-y-2 text-zinc-600 dark:text-zinc-400 animate-fade-in">
            <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>How the AXIS Trending Detection Pipeline Operates:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] leading-relaxed">
              <li><strong>6-Hour Cross-Source Corroboration</strong>: The system clusters articles reporting the same event. If Reuters, The Hindu, BBC, and IMD all publish within 6 hours, <code>source_count = 4</code> (earning 8 baseline points).</li>
              <li><strong>Active Reader Engagement</strong>: Each time readers open or read a story on AXIS, <code>view_count_on_axis</code> increases by +1 point.</li>
              <li><strong>Time Decay Penalty</strong>: Older stories naturally decay by <code>0.6 points per hour</code> since the first source publication, ensuring breaking developments outrank stale news.</li>
              <li><strong>15-Minute Automated Reindexing</strong>: The cron/interval scheduler refreshes all scores every 15 minutes, promoting the hottest real-time stories.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Top 5 Ranked Stories List */}
      <div className="space-y-4">
        {articlesToDisplay.map((article, index) => {
          const rank = index + 1;
          const rankStyle = getRankBadge(rank);
          const breakdown = article.trendingBreakdown;
          const isSaved = savedArticleIds.includes(article.id);
          const categoryStyle = getCategoryColor(article.category);

          return (
            <article
              key={article.id}
              onClick={() => onOpenDeepDive(article)}
              className="group relative p-5 sm:p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  {/* Rank Badge */}
                  <span className={`flex items-center justify-center w-7 h-7 rounded-lg font-bold text-sm ${rankStyle.bg}`}>
                    #{rank}
                  </span>

                  {/* Category Pill */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${categoryStyle}`}>
                    {article.category.toUpperCase()}
                  </span>

                  {/* Verification Pill */}
                  {article.verification === 'govt_verified' ? (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      <ShieldCheck className="w-3 h-3" />
                      Govt Verified
                    </span>
                  ) : (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                      Accredited Wire
                    </span>
                  )}
                </div>

                {/* Trending Score Pill with Flame */}
                <div className="flex items-center gap-1.5">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${rankStyle.pill}`}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Score: {article.trendingScore || breakdown?.trendingScore || 0}</span>
                  </span>
                </div>
              </div>

              {/* Headline */}
              {article.keyStat && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold tracking-tight">
                    <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400 fill-current" />
                    <span>Key Stat: {article.keyStat}</span>
                  </span>
                </div>
              )}

              <h3 className="text-base sm:text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {article.title}
              </h3>

              {/* 30s Takeaway Summary */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                {article.takeaway}
              </p>

              {/* Why This Matters For You (Career & Real-World Edge) */}
              {article.deepDive?.impactForStudents && (
                <div className="p-3 rounded-lg border border-purple-500/25 bg-purple-500/[0.04] dark:bg-purple-950/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 font-mono font-bold text-[10.5px] uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>Why This Matters For You (Career & Real-World Edge)</span>
                  </div>
                  <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
                    {article.deepDive.impactForStudents}
                  </p>
                </div>
              )}

              {/* Bullets */}
              <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                {article.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="line-clamp-1">
                    • {bullet}
                  </li>
                ))}
              </ul>

              {/* Algorithm Calculation Breakdown Strip */}
              {breakdown && (
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/70 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-zinc-800 dark:text-zinc-200 font-medium">
                      <Layers className="w-3 h-3 text-rose-500" />
                      <strong>{breakdown.sourceCount} Sources</strong> in 6h:
                      <span className="text-zinc-600 dark:text-zinc-400 font-normal truncate max-w-[240px]">
                        {breakdown.distinctSources.slice(0, 3).join(', ')}{breakdown.distinctSources.length > 3 ? '...' : ''}
                      </span>
                    </span>

                    <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                      <Eye className="w-3 h-3 text-indigo-500" />
                      <strong>{breakdown.viewCount}</strong> views
                    </span>

                    <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {breakdown.hoursSinceFirstSeen}h ago (-{breakdown.decayPoints} decay)
                    </span>
                  </div>

                  <span className="text-[10px] text-zinc-400">
                    Formula: ({breakdown.sourceCount}×2)+{breakdown.viewCount}-{breakdown.decayPoints} = <strong>{breakdown.trendingScore}</strong>
                  </span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900/80 text-xs font-mono text-zinc-500">
                <span className="text-[11px] text-zinc-400">
                  {article.incidentDate || article.dateLabel}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleShare(article, e)}
                    className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Share trending dispatch"
                  >
                    {copiedId === article.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Share</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(article.id);
                    }}
                    className={`p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1 text-[11px] ${
                      isSaved ? 'text-amber-500 font-bold' : 'text-zinc-500'
                    }`}
                    title={isSaved ? 'Remove bookmark' : 'Bookmark story'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDeepDive(article);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 font-sans font-semibold text-xs flex items-center gap-1 transition-all hover:gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Read FactSheet</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
