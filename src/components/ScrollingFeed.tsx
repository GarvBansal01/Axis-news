import React, { useState } from 'react';
import { 
  Bookmark, 
  Share2, 
  FileText, 
  Check,
  ArrowUp
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

  const handleShare = (article: NewsArticle) => {
    const shareText = `⚡ ${article.title}\n\n"${article.takeaway}"\n\n• ${article.bullets.join('\n• ')}\n\nSource: ${article.sourceName} · via AXIS 24H Radar`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
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

          return (
            <article
              key={article.id}
              className="py-5 space-y-3 transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-900/30 px-2 sm:px-3 rounded-xl"
            >
              {/* Top Source & Timestamp Meta */}
              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {article.sourceName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-400">{article.locationScope}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-400">{article.publishedAt}</span>
                </div>

                <span className="text-[11px] text-zinc-400">{article.readTime}</span>
              </div>

              {/* Headline */}
              <h2
                onClick={() => onOpenDeepDive(article)}
                className="text-base md:text-lg font-editorial font-bold text-zinc-900 dark:text-zinc-100 leading-snug hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {article.title}
              </h2>

              {/* 1-Sentence Takeaway */}
              <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border-l-2 border-zinc-900 dark:border-zinc-100 text-xs md:text-sm text-zinc-800 dark:text-zinc-200 font-editorial italic leading-relaxed">
                "{article.takeaway}"
              </div>

              {/* 3 Synthesized Bullets */}
              <ul className="space-y-1.5 text-xs md:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-0.5">
                {article.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenDeepDive(article)}
                  className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full Context</span>
                </button>

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
