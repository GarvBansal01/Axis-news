export type NewsCategory = 'all' | 'world' | 'ai' | 'local' | 'national' | 'gaming' | 'personal' | 'geopolitics' | 'disaster';

export type VerificationStatus = 'govt_verified' | 'reputable_media' | 'trending_unverified' | 'emergency_alert';

export type LocationScope = 'Siliguri' | 'North Bengal' | 'West Bengal' | 'India' | 'Global' | 'Eastern Europe' | 'Bay of Bengal';

export interface DeepDiveContent {
  overview: string;
  keyBackground: string;
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
  bullets: [string, string, string];
  publishedAt: string;
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

export interface MemeItem {
  id: string;
  title: string;
  punchline: string;
  category: 'exams' | 'coding' | 'campus_life' | 'ai_humor';
  author: string;
  upvotes: number;
  aiVerifiedClean: boolean;
  aiVerificationReason: string;
  createdAt: string;
  tag: string;
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

export interface LearningModule {
  id: string;
  title: string;
  subtitle: string;
  plainEnglishConcept: string;
  realCodeExplanation: string;
  codeSnippet: string;
  studentQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
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


