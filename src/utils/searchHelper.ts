import { NewsArticle } from '../types';

/**
 * Generates a concise, high-precision search query for an article.
 * Prevents search engines (especially Google News) from failing due to overly long headline titles.
 */
export function getCleanTargetedQuery(article: Pick<NewsArticle, 'title' | 'targetedSearchQuery'>): string {
  if (article.targetedSearchQuery && article.targetedSearchQuery.trim()) {
    return article.targetedSearchQuery.trim();
  }
  // Strip sub-clauses, punctuation, and pick the first 4-5 high-signal words
  const cleanTopic = article.title
    .split(/[:–—\-]/)[0]
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 5)
    .join(' ');
  return cleanTopic || article.title.slice(0, 40);
}

/**
 * Returns a high-precision Google News search URL for the article.
 */
export function getTargetedGoogleNewsUrl(
  article: Pick<NewsArticle, 'title' | 'targetedSearchQuery' | 'verifiedSearchUrl'>
): string {
  if (article.verifiedSearchUrl && !article.verifiedSearchUrl.includes('the%20hindu%20indian%20express')) {
    return article.verifiedSearchUrl;
  }
  const query = getCleanTargetedQuery(article);
  return `https://news.google.com/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
}

/**
 * Returns a high-precision Google Web Search URL for broader investigative reading.
 */
export function getTargetedGoogleSearchUrl(
  article: Pick<NewsArticle, 'title' | 'targetedSearchQuery'>
): string {
  const query = getCleanTargetedQuery(article);
  return `https://www.google.com/search?q=${encodeURIComponent(query + ' news')}`;
}
