export type NewsCategory = 'all' | 'world' | 'ai' | 'local' | 'national' | 'finance' | 'gaming' | 'personal' | 'geopolitics' | 'disaster';

export type VerificationStatus = 'govt_verified' | 'reputable_media' | 'trending_unverified' | 'emergency_alert';

export type LocationScope = 'Siliguri' | 'North Bengal' | 'West Bengal' | 'India' | 'Global' | 'Eastern Europe' | 'Bay of Bengal';

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
}

export interface WisdomItem {
  id: string;
  author: 'Bhagavad Gita' | 'Dr. APJ Abdul Kalam' | 'Swami Vivekananda' | 'Marcus Aurelius';
  reference: string;
  sanskritVerse?: string;
  transliteration?: string;
  translation: string;
  studentTakeaway: string;
  coreTheme: 'Focus' | 'Duty & Action' | 'Overcoming Fear' | 'Self-Discipline' | 'Resilience' | 'Peace of Mind';
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

export interface ContactRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  collegeOrCity: string;
  preferredTime: 'anytime' | 'morning' | 'afternoon' | 'evening';
  reason: 'news_lead' | 'feedback' | 'collaboration' | 'general';
  message: string;
  timestamp: string;
  status: 'pending' | 'called' | 'resolved';
  adminNotes?: string;
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

