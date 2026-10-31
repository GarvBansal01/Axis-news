import React from 'react';
import { ShieldCheck, Flame, Info, Bookmark, FileText, Volume2 } from 'lucide-react';
import { NewsArticle } from '../types';

interface BroadsheetGridProps {
  articles: NewsArticle[];
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
  onOpenDeepDive: (article: NewsArticle) => void;
  onPlayAudio: (text: string) => void;
}

export const BroadsheetGrid: React.FC<BroadsheetGridProps> = ({
  articles,
  savedArticleIds,
  onToggleSave,
  onOpenDeepDive,
  onPlayAudio
}) => {
  if (articles.length === 0) {
    return (
      <div className="py-16 text-center text-stone-500">
        <p className="text-base font-editorial">No stories found matching your criteria.</p>
      </div>
    );
  }

  // Lead story + secondary grid
  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1);

  return (
    <div className="py-6 space-y-6">
      {/* Lead Story Feature Card */}
      {leadArticle && (
        <article className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 font-mono-nums">
                  LEAD STORY · {leadArticle.locationScope}
                </span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-stone-600 dark:text-stone-400 font-mono-nums">{leadArticle.readTime}</span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                {leadArticle.verification === 'govt_verified' ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Govt Verified
                  </span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> Hot Topic
                  </span>
                )}
              </div>

              <h2
                onClick={() => onOpenDeepDive(leadArticle)}
                className="text-2xl md:text-3xl font-editorial font-bold text-stone-900 dark:text-stone-100 hover:text-indigo-900 dark:hover:text-indigo-400 transition-colors cursor-pointer leading-tight"
              >
                {leadArticle.title}
              </h2>

              <p className="text-sm md:text-base font-editorial italic text-stone-700 dark:text-stone-300 border-l-2 border-stone-300 dark:border-stone-700 pl-3">
                "{leadArticle.takeaway}"
              </p>

              <ul className="space-y-2 text-xs md:text-sm text-stone-700 dark:text-stone-300 pt-2">
                {leadArticle.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 mt-1.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions for Lead */}
            <div className="flex lg:flex-col items-center justify-end lg:justify-start gap-2 pt-4 lg:pt-0 lg:border-l lg:border-stone-100 dark:lg:border-stone-800 lg:pl-6 shrink-0">
              <button
                onClick={() => onOpenDeepDive(leadArticle)}
                className="px-4 py-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Full Deep Dive</span>
              </button>

              <button
                onClick={() => onPlayAudio(`${leadArticle.title}. ${leadArticle.takeaway}`)}
                className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs flex items-center gap-1 cursor-pointer"
                title="Listen"
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Audio</span>
              </button>

              <button
                onClick={() => onToggleSave(leadArticle.id)}
                className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 cursor-pointer"
                title="Save"
              >
                <Bookmark className={`w-3.5 h-3.5 ${savedArticleIds.includes(leadArticle.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>
            </div>
          </div>
        </article>
      )}

      {/* Secondary Broadsheet Multi-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {secondaryArticles.map((article) => {
          const isSaved = savedArticleIds.includes(article.id);
          return (
            <article
              key={article.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 flex flex-col justify-between shadow-2xs hover:border-stone-400 dark:hover:border-stone-700 transition-all"
            >
              <div className="space-y-2.5">
                {/* Micro meta */}
                <div className="flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-400">
                  <span className="font-semibold uppercase tracking-wider font-mono-nums">
                    {article.locationScope}
                  </span>
                  {article.verification === 'govt_verified' ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  ) : article.verification === 'reputable_media' ? (
                    <span className="text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Media
                    </span>
                  ) : (
                    <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Hot Topic
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3
                  onClick={() => onOpenDeepDive(article)}
                  className="text-base font-editorial font-bold text-stone-900 dark:text-stone-100 hover:text-indigo-900 dark:hover:text-indigo-400 transition-colors cursor-pointer leading-snug"
                >
                  {article.title}
                </h3>

                {/* Bullets Preview */}
                <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-1">
                  {article.bullets.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-stone-500 mt-1.5 shrink-0" />
                      <span className="line-clamp-2">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Controls */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                <span className="font-mono-nums">{article.readTime}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenDeepDive(article)}
                    className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors font-medium cursor-pointer"
                  >
                    Detail
                  </button>

                  <button
                    onClick={() => onToggleSave(article.id)}
                    className="p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    title={isSaved ? 'Remove Bookmark' : 'Bookmark'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
