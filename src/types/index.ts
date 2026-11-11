export type NewsCategory = 
  | 'all' 
  | 'trending'
  | 'finance' 
  | 'national' 
  | 'geopolitics' 
  | 'disaster' 
  | 'ai' 
  | 'personal' 
  | 'education' 
  | 'startups' 
  | 'science' 
  | 'world' 
  | 'local' 
  | 'gaming';

export type VerificationStatus = 'govt_verified' | 'reputable_media' | 'trending_unverified' | 'emergency_alert';

export type LocationScope = 'Siliguri' | 'North Bengal' | 'West Bengal' | 'India' | 'Global' | 'Eastern Europe' | 'Bay of Bengal' | 'Bengaluru' | 'Sriharikota' | 'New Delhi';

export interface TrendingScoreBreakdown {
  sourceCount: number;
  distinctSources: string[];
  sourcePoints: number;              // (source_count * 2)
  viewCount: number;                 // view_count_on_axis
  hoursSinceFirstSeen: number;       // hours elapsed since first reported in window
  decayFactor: number;               // decay coefficient per hour
  decayPoints: number;               // (hours_since_first_seen * decay_factor)
  trendingScore: number;             // (source_count * 2) + view_count - (hours * decay)
  windowHours: number;               // 6 hours window
  firstSeenTimestamp: number;
  lastCalculatedAt: number;
}

export interface CachedArticleSummary {
  contentFingerprint: string;
  takeaway: string;
  whatIsIt?: string;
  theRealProblem: string;
  bullets: [string, string, string];
  factSheet?: ArticleFactSheet;
  deepDiveOverview?: string;
  cachedAt: number;
}

export interface ArticleFactSheet {
  when: string;       // Exact Date, Time & Timeline status
  where: string;      // Exact Location, City, Landmark, Geotag
  who: string;        // People, Authorities, Victims, Officials involved
  what: string;       // Concrete summary of the physical event
  why: string;        // Root cause and why it occurred
  how: string;        // How it was resolved or how action was executed
}

export interface DeepDiveContent {
  overview: string;
  keyBackground: string;
  rootCauseAnalysis?: string;
  theRealProblem?: string;
  timeline: { time: string; event: string }[];
  keyQuotes: { speaker: string; role: string; quote: string }[];
  impactForStudents: string;
  officialSourceUrl: string;
  sourceDocName: string;
  verifiedNewsSearchUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: NewsCategory;
  locationScope: LocationScope;
  sourceName: string;
  sourceType: string;
  verification: VerificationStatus;
  verificationNote: string;
  takeaway: string;
  whatIsIt?: string;
  incidentDate?: string;
  theRealProblem: string;
  bullets: [string, string, string];
  publishedAt: string;
  timestamp: number;
  dateLabel?: string;
  readTime: string;
  deepDive: DeepDiveContent;
  audioScript: string;
  tags: string[];
  factSheet?: ArticleFactSheet;
  verifiedSearchUrl?: string;
  targetedSearchQuery?: string;
  trendingScore?: number;
  trendingBreakdown?: TrendingScoreBreakdown;
}

export interface WisdomItem {
  id: string;
  author: string;
  bookOrSource?: string;
  reference: string;
  sanskritVerse?: string;
  originalScript?: string;
  transliteration?: string;
  translation: string;
  studentTakeaway: string;
  coreTheme: string;
}

export interface UserSession {
  email: string;
  name: string;
  avatar: string;
  provider: 'google' | 'student_email';
  universityOrCollege: string;
  loginTimestamp: string;
  ipAddress: string;
  device: string;
  streakDays: number;
}

export interface AppFeedback {
  id: string;
  userEmail: string;
  userName: string;
  rating: number; // 1 to 5
  category: string;
  comment: string;
  timestamp: string;
}

// ================= FINANCE DESK DATA STRUCTURES =================
export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  market: 'NSE' | 'BSE' | 'NASDAQ' | 'NYSE';
  dayHigh: number;
  dayLow: number;
  volume: string;
  category: 'Indian Bluechips' | 'Global Tech' | 'Key Index';
  sparkline: number[]; // mini trend visual
}

export interface CommodityRate {
  id: string;
  name: string;
  unit: string;
  priceINR: number;
  change: number;
  changePercent: number;
  purityOrSpec?: string;
  cityBenchmark: string;
  trend: 'up' | 'down' | 'flat';
  description: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToINR: number; // e.g. 1 USD = 84.18 INR
  change24h: number;
  changePercent: number;
  studentTip: string;
}

export interface IPOItem {
  id: string;
  companyName: string;
  sector: string;
  priceBand: string;
  issueSize: string;
  gmpPercent: number; // e.g. +42%
  gmpPrice: number; // e.g. ₹125
  dates: string;
  status: 'Open Now' | 'Upcoming' | 'Listing Soon' | 'Recently Listed';
  minInvestment: string;
  lotSize: number;
  rating: 'Strong Demand' | 'Moderate' | 'Cautious';
}

