import { CachedArticleSummary, ArticleFactSheet } from '../types';

const CACHE_STORAGE_KEY = 'axis_summary_cache_v1';
const MAX_CACHE_ENTRIES = 250;
const CACHE_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

// In-memory fallback / cache
const memoryCache = new Map<string, CachedArticleSummary>();

// Compute deterministic content fingerprint from title, source, and text content
export function computeContentFingerprint(title: string, source: string, content: string): string {
  const normalized = `${title.trim()}|${source.trim()}|${content.trim().slice(0, 300)}`.toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `fp_${Math.abs(hash)}_${normalized.length}`;
}

// Load cache from localStorage
function loadCache(): Record<string, CachedArticleSummary> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, CachedArticleSummary>;
  } catch (err) {
    console.debug('Failed to load summary cache from localStorage:', err);
    return {};
  }
}

// Save cache to localStorage
function saveCache(cache: Record<string, CachedArticleSummary>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.debug('Failed to save summary cache to localStorage:', err);
  }
}

/**
 * Summary Cache Service
 * Guarantees that AI / synthetic summarization is never invoked repeatedly on every page load
 * for identical source content. Re-summarization occurs ONLY when new source content is detected.
 */
export const summaryCacheService = {
  /**
   * Check if a valid, up-to-date summary exists for the given content key and fingerprint
   */
  has(contentKey: string, currentFingerprint: string): boolean {
    const cached = this.get(contentKey, currentFingerprint);
    return cached !== null;
  },

  /**
   * Retrieve cached summary if fingerprint matches and not expired
   */
  get(contentKey: string, currentFingerprint: string): CachedArticleSummary | null {
    // Check memory first
    if (memoryCache.has(contentKey)) {
      const item = memoryCache.get(contentKey)!;
      if (item.contentFingerprint === currentFingerprint && Date.now() - item.cachedAt < CACHE_TTL_MS) {
        return item;
      }
    }

    // Check localStorage
    const persistent = loadCache();
    const item = persistent[contentKey];
    if (item && item.contentFingerprint === currentFingerprint && Date.now() - item.cachedAt < CACHE_TTL_MS) {
      memoryCache.set(contentKey, item);
      return item;
    }

    return null;
  },

  /**
   * Store newly generated summary in persistent cache
   */
  set(
    contentKey: string,
    contentFingerprint: string,
    summary: {
      takeaway: string;
      whatIsIt?: string;
      theRealProblem: string;
      bullets: [string, string, string];
      factSheet?: ArticleFactSheet;
      deepDiveOverview?: string;
    }
  ): void {
    const record: CachedArticleSummary = {
      ...summary,
      contentFingerprint,
      cachedAt: Date.now()
    };

    memoryCache.set(contentKey, record);

    const persistent = loadCache();
    persistent[contentKey] = record;

    // Maintain size limits
    const keys = Object.keys(persistent);
    if (keys.length > MAX_CACHE_ENTRIES) {
      // Evict oldest entries
      keys.sort((a, b) => persistent[a].cachedAt - persistent[b].cachedAt);
      const toRemove = keys.slice(0, keys.length - MAX_CACHE_ENTRIES);
      for (const k of toRemove) {
        delete persistent[k];
        memoryCache.delete(k);
      }
    }

    saveCache(persistent);
  },

  /**
   * Get stats on cache size and efficiency
   */
  getStats(): { cachedCount: number; memoryCount: number } {
    const persistent = loadCache();
    return {
      cachedCount: Object.keys(persistent).length,
      memoryCount: memoryCache.size
    };
  },

  /**
   * Clear expired cache items
   */
  prune(): void {
    const persistent = loadCache();
    const now = Date.now();
    let changed = false;
    for (const key of Object.keys(persistent)) {
      if (now - persistent[key].cachedAt > CACHE_TTL_MS) {
        delete persistent[key];
        memoryCache.delete(key);
        changed = true;
      }
    }
    if (changed) {
      saveCache(persistent);
    }
  }
};
