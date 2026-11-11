import { NewsArticle, TrendingScoreBreakdown } from '../types';

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
const DEFAULT_DECAY_FACTOR = 0.6; // Score decay points per hour
const VIEWS_STORAGE_KEY = 'axis_article_views_v1';
const TRENDING_STORAGE_KEY = 'axis_trending_cache_v1';

// Base simulated view counts seeded from editorial importance to initialize realistic trending on first visit
const INITIAL_VIEW_SEED: Record<string, number> = {
  'farmers-dilli-chalo-msp-shambhu-protest': 185,
  'us-presidential-election-trump-victory-tariffs': 210,
  'maharashtra-jharkhand-assembly-elections-mandate': 165,
  'japan-uk-global-elections-coalition-shifts': 135,
  'cyclone-murasu-bay-of-bengal-alert': 124,
  'deepseek-v3-architecture-technical-breakthrough': 148,
  'isro-sce200-semicryogenic-hotfire-milestone': 112,
  'iit-nit-hardware-semiconductor-placements-surge': 98,
  'upsc-gate-reforms-digital-governance-iris-biometrics': 88,
  'zepto-swiggy-instamart-quick-commerce-breakeven': 76,
  'iter-nuclear-fusion-tokamak-record-plasma': 84,
  'sarvam-ai-series-b-indic-voice-reasoning': 72,
  'sebi-fno-derivatives-speculation-curb': 65,
  'apple-five-trillion-market-cap-m4-enterprise': 58,
  'google-tpu-datacenter-silicon-open-source': 54,
  'microsoft-aws-power-grid-datacenter-bottleneck': 50,
  'nvidia-blackwell-supercomputing-racks-shipped': 62,
  'russia-ukraine-high-tech-frontline-grain-pact': 52,
  'siliguri-teesta-nh10-highway-dooars-elephant-corridor': 36,
  'cricket-t20-series-win-ishan-kishan-record': 42
};

// Canonical entity clusters for matching related dispatches reporting the same event
const KNOWN_EVENT_SIGNATURES: { key: string; keywords: string[] }[] = [
  { key: 'farmers-dilli-chalo', keywords: ['farmers', 'dilli chalo', 'shambhu', 'msp', 'swaminathan', 'khanauri', 'kisan'] },
  { key: 'us-election-trump', keywords: ['us election', 'trump', 'presidential', 'swing states', 'tariffs', 'electoral'] },
  { key: 'maharashtra-election', keywords: ['maharashtra', 'mahayuti', 'ladki bahin', 'assembly election', 'jharkhand', 'hemant soren'] },
  { key: 'japan-uk-elections', keywords: ['japan', 'ldp', 'ishiba', 'uk election', 'labour', 'starmer'] },
  { key: 'cyclone-murasu', keywords: ['cyclone', 'murasu', 'bay of bengal', 'andhra', 'odisha', 'imd'] },
  { key: 'deepseek-v3', keywords: ['deepseek', 'v3', 'moe', 'architecture', '671b', 'open weights', 'reasoning'] },
  { key: 'isro-sce200', keywords: ['isro', 'sce-200', 'sce200', 'semicryogenic', 'cryogenic', 'gaganyaan', 'mahendragiri'] },
  { key: 'iit-nit-placements', keywords: ['placement', 'placements', 'iit', 'nit', 'semiconductor', 'hardware systems', 'core engineering'] },
  { key: 'upsc-gate-reforms', keywords: ['upsc', 'gate', 'civil services', 'iris', 'biometric', 'admit card', 'examination reform'] },
  { key: 'zepto-swiggy', keywords: ['zepto', 'swiggy', 'instamart', 'quick commerce', 'ebitda', '10-minute', 'delivery'] },
  { key: 'fusion-tokamak', keywords: ['iter', 'nuclear fusion', 'fusion', 'tokamak', 'plasma', '100 million'] },
  { key: 'sarvam-ai', keywords: ['sarvam', 'series b', 'indic', 'indic llm', 'vernacular', 'bengaluru'] },
  { key: 'sebi-fno', keywords: ['sebi', 'futures and options', 'f&o', 'retail trading', 'contract size', 'derivatives'] },
  { key: 'apple-valuation', keywords: ['apple', 'five trillion', '5 trillion', 'tim cook', 'm4 mac'] },
  { key: 'google-tpu', keywords: ['google', 'tpu', 'sundar pichai', 'custom silicon', 'tensor processing unit'] },
  { key: 'microsoft-aws-power', keywords: ['microsoft', 'aws', 'power grid', 'electrical grid', 'datacenter power', 'satya nadella'] },
  { key: 'nvidia-blackwell', keywords: ['nvidia', 'blackwell', 'gb200', 'jensen huang', 'accelerated computing'] },
  { key: 'india-bloc-protest', keywords: ['india bloc', 'ramlila maidan', 'voter list', 'election commission'] },
  { key: 'russia-ukraine', keywords: ['russia', 'ukraine', 'refinery', 'drone strike', 'pokrovsk', 'kstovo'] },
  { key: 'teesta-nh10', keywords: ['teesta', 'nh-10', 'nh10', 'siliguri', 'sevoke', 'dooars', 'darjeeling'] }
];

/**
 * Extract clean publisher names from compound source string
 * (e.g. "India Meteorological Department (IMD) & The Hindu / NDTV" -> ["IMD", "The Hindu", "NDTV"])
 */
export function extractDistinctPublishers(sourceName: string): string[] {
  if (!sourceName) return ['Accredited Wire'];
  const cleaned = sourceName
    .replace(/\(.*?\)/g, '') // remove parentheticals like (Live Wire)
    .replace(/\b(Live Wire|GNews Live|Bulletin|Wire|Desk)\b/gi, '')
    .trim();

  const parts = cleaned.split(/&|\/|,|\band\b|\bvia\b|\+/i);
  const distinct = new Set<string>();

  for (const p of parts) {
    const s = p.trim().replace(/^[-–—\s]+|[-–—\s]+$/g, '');
    if (s.length >= 2 && !/^(the|and|or|in|of)$/i.test(s)) {
      distinct.add(s);
    }
  }

  if (distinct.size === 0) {
    distinct.add(sourceName.slice(0, 30));
  }

  return Array.from(distinct);
}

/**
 * Compute an event cluster key for an article based on known event signatures or keyword extraction
 */
export function getEventClusterKey(article: NewsArticle): string {
  const text = `${article.title} ${article.takeaway} ${article.tags.join(' ')}`.toLowerCase();

  for (const sig of KNOWN_EVENT_SIGNATURES) {
    let matchCount = 0;
    for (const kw of sig.keywords) {
      if (text.includes(kw)) {
        matchCount++;
      }
    }
    if (matchCount >= 2) {
      return sig.key;
    }
  }

  // Fallback: category + first two significant title tokens
  const tokens = article.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['with', 'from', 'over', 'that', 'this', 'after', 'under'].includes(w))
    .slice(0, 3)
    .join('-');

  return `${article.category}-${tokens || article.id}`;
}

/**
 * Load user view counts from localStorage
 */
export function getStoredViewCounts(): Record<string, number> {
  if (typeof window === 'undefined') return { ...INITIAL_VIEW_SEED };
  try {
    const raw = localStorage.getItem(VIEWS_STORAGE_KEY);
    if (!raw) return { ...INITIAL_VIEW_SEED };
    const parsed = JSON.parse(raw);
    return { ...INITIAL_VIEW_SEED, ...parsed };
  } catch {
    return { ...INITIAL_VIEW_SEED };
  }
}

/**
 * Record a user reading/viewing an article on AXIS and save to localStorage
 */
export function recordArticleView(articleId: string): number {
  if (typeof window === 'undefined') return 1;
  try {
    const counts = getStoredViewCounts();
    const current = counts[articleId] || INITIAL_VIEW_SEED[articleId] || 12;
    const next = current + 1;
    counts[articleId] = next;
    localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(counts));
    return next;
  } catch {
    return 1;
  }
}

/**
 * Core Algorithm:
 * 1. Track distinct sources reporting the same event within a 6-hour window
 * 2. Calculate trending_score = (source_count * 2) + (view_count_on_axis) - (hours_since_first_seen * decay_factor)
 * 3. Return articles enriched with TrendingScoreBreakdown and sorted by trending_score
 */
export function calculateTrendingMetrics(
  articles: NewsArticle[],
  options?: {
    decayFactor?: number;
    currentTime?: number;
  }
): {
  rankedArticles: NewsArticle[];
  top5Trending: NewsArticle[];
  top5: NewsArticle[];
  lastCalculatedAt: number;
} {
  const now = options?.currentTime || Date.now();
  const decayFactor = options?.decayFactor ?? DEFAULT_DECAY_FACTOR;
  const viewCounts = getStoredViewCounts();

  // Step 1: Group articles by event cluster
  const clusters = new Map<string, NewsArticle[]>();
  for (const article of articles) {
    const key = getEventClusterKey(article);
    if (!clusters.has(key)) {
      clusters.set(key, []);
    }
    clusters.get(key)!.push(article);
  }

  // Step 2: For each article, evaluate distinct sources reporting within a 6-hour window
  const scoredArticles: NewsArticle[] = articles.map((article) => {
    const clusterKey = getEventClusterKey(article);
    const relatedArticles = clusters.get(clusterKey) || [article];

    // Find all reports of this event within the 6-hour window of this article's occurrence
    const reportsInWindow = relatedArticles.filter((other) => {
      const timeDiff = Math.abs(article.timestamp - other.timestamp);
      return timeDiff <= SIX_HOURS_MS;
    });

    // Collect distinct source publishers across all reports in the 6-hour window
    const distinctSourcesSet = new Set<string>();
    for (const report of reportsInWindow) {
      const pubs = extractDistinctPublishers(report.sourceName);
      for (const p of pubs) {
        distinctSourcesSet.add(p);
      }
    }

    // Always include publishers from current article's sourceName
    for (const p of extractDistinctPublishers(article.sourceName)) {
      distinctSourcesSet.add(p);
    }

    const distinctSources = Array.from(distinctSourcesSet);
    const sourceCount = Math.max(1, distinctSources.length);

    // Determine when this event was first seen within the window
    const earliestTimestamp = Math.min(...reportsInWindow.map((r) => r.timestamp), article.timestamp);
    const hoursSinceFirstSeen = Math.max(0.1, (now - earliestTimestamp) / (1000 * 60 * 60));

    // Get current view count on AXIS
    const viewCount = viewCounts[article.id] || INITIAL_VIEW_SEED[article.id] || 25;

    // Mathematical formula requested:
    // trending_score = (source_count * 2) + (view_count_on_axis) - (hours_since_first_seen * decay_factor)
    const sourcePoints = sourceCount * 2;
    const decayPoints = hoursSinceFirstSeen * decayFactor;
    const rawScore = sourcePoints + viewCount - decayPoints;
    const trendingScore = Math.round(Math.max(1, rawScore) * 10) / 10;

    const breakdown: TrendingScoreBreakdown = {
      sourceCount,
      distinctSources,
      sourcePoints,
      viewCount,
      hoursSinceFirstSeen: Math.round(hoursSinceFirstSeen * 10) / 10,
      decayFactor,
      decayPoints: Math.round(decayPoints * 10) / 10,
      trendingScore,
      windowHours: 6,
      firstSeenTimestamp: earliestTimestamp,
      lastCalculatedAt: now
    };

    return {
      ...article,
      trendingScore,
      trendingBreakdown: breakdown
    };
  });

  // Step 3: Sort descending by trending_score
  const rankedArticles = [...scoredArticles].sort((a, b) => {
    return (b.trendingScore || 0) - (a.trendingScore || 0);
  });

  // Step 4: Extract Top 5 distinct stories
  const top5Trending = rankedArticles.slice(0, 5);

  // Cache latest calculation
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        TRENDING_STORAGE_KEY,
        JSON.stringify({
          lastCalculatedAt: now,
          top5Ids: top5Trending.map((t) => t.id)
        })
      );
    } catch {
      // ignore
    }
  }

  return {
    rankedArticles,
    top5Trending,
    top5: top5Trending,
    lastCalculatedAt: now
  };
}

/**
 * 15-Minute Scheduled Job Manager
 * Automatically recalculates trending scores every 15 minutes,
 * and allows immediate manual triggers or listeners.
 */
export class TrendingJobScheduler {
  private timerId: any = null;
  private intervalMs: number = FIFTEEN_MINUTES_MS;
  private onRecalculateCallback?: (result: { rankedArticles: NewsArticle[]; top5: NewsArticle[]; calculatedAt: number }) => void;
  private articlesProvider?: () => NewsArticle[];
  private lastRunTime: number = Date.now();

  constructor(articlesProvider?: () => NewsArticle[], intervalMs: number = FIFTEEN_MINUTES_MS) {
    this.articlesProvider = articlesProvider;
    this.intervalMs = intervalMs;
  }

  start(callback: (result: { rankedArticles: NewsArticle[]; top5: NewsArticle[]; calculatedAt: number }) => void): void {
    this.onRecalculateCallback = callback;
    this.stop();

    // Run initial calculation immediately
    this.triggerNow();

    // Schedule every 15 minutes
    this.timerId = setInterval(() => {
      this.triggerNow();
    }, this.intervalMs);
  }

  stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  triggerNow(): void {
    if (!this.articlesProvider) return;
    const currentArticles = this.articlesProvider();
    if (!currentArticles || currentArticles.length === 0) return;

    this.lastRunTime = Date.now();
    const { rankedArticles, top5Trending, lastCalculatedAt } = calculateTrendingMetrics(currentArticles, {
      currentTime: this.lastRunTime
    });

    if (this.onRecalculateCallback) {
      this.onRecalculateCallback({
        rankedArticles,
        top5: top5Trending,
        calculatedAt: lastCalculatedAt
      });
    }
  }

  getLastRunTime(): number {
    return this.lastRunTime;
  }

  getNextRunRemainingSeconds(): number {
    const elapsed = Date.now() - this.lastRunTime;
    const remaining = Math.max(0, this.intervalMs - elapsed);
    return Math.floor(remaining / 1000);
  }
}
