import { LearningModule } from '../types';

export const builderModules: LearningModule[] = [
  {
    id: 'module-1-architecture',
    title: '1. Frontend State Machine & Zero-Reload Filtering',
    subtitle: 'How React manages what you see on the screen instantly',
    plainEnglishConcept: 'Think of React like a smart digital TV channel tuner. Instead of tearing down the entire TV and re-building it every time you switch from "World News" to "Siliguri Local", React holds a small variable in memory called `activeCategory`. When you click a tab, only the news cards update in less than 5 milliseconds!',
    realCodeExplanation: 'We use React `useState` hooks to track the stream filter, search queries, active card indexes, and audio playback. Combined with `useMemo`, we filter 1,000+ news articles with zero lag on mobile phones.',
    codeSnippet: `// 1. Define active filter state
const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

// 2. High-speed client-side filtering without server roundtrips
const filteredArticles = useMemo(() => {
  return articles.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesVerified = !verifiedOnly || item.verification === 'govt_verified';
    return matchesCategory && matchesVerified;
  });
}, [articles, activeCategory, verifiedOnly]);`,
    studentQuiz: {
      question: 'Why do we use useMemo when filtering through news articles on a student\'s smartphone?',
      options: [
        'To prevent recalculating the filter on every single unrelated render, keeping the phone smooth and battery efficient',
        'Because React requires useMemo for all buttons and tabs to work',
        'To save the news articles to an external database on the internet',
        'To translate the articles from English to Bengali automatically'
      ],
      correctIndex: 0,
      explanation: 'useMemo caches the filtered list so the phone doesn\'t waste processor cycles re-filtering the entire array when you type in an unrelated input or scroll.'
    }
  },
  {
    id: 'module-2-verification',
    title: '2. Source Transparency & Fact Verification Architecture',
    subtitle: 'How to separate Govt & Official Gazettes from unverified internet buzz',
    plainEnglishConcept: 'In standard social media, a random rumor spreads as fast as an official govt gazette. In our app, every article entity carries a strict `verification` schema. If a story comes from PIB, NHAI, or a university gazette, it is tagged `govt_verified`. If it is an unverified leak (like Valve\'s new device), the system flags it as `trending_unverified` with a warning note so students never get misled before exams.',
    realCodeExplanation: 'Each article object has a strict TypeScript contract (`verification: \'govt_verified\' | \'reputable_media\' | \'trending_unverified\'`). We render accessible visual cues with explicit explanatory tooltips.',
    codeSnippet: `// Source Verification Badging Logic
{article.verification === 'govt_verified' ? (
  <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium text-xs">
    <CheckCircle2 className="w-3.5 h-3.5" />
    Govt / Official Verified
  </span>
) : (
  <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-medium text-xs">
    <Flame className="w-3.5 h-3.5" />
    Hot Topic · Unverified
  </span>
)}`,
    studentQuiz: {
      question: 'What is the primary benefit of embedding verification notes and original source links directly in the news model?',
      options: [
        'It allows students to verify claims against original primary documents and prevents misinformation',
        'It makes the code file 50% smaller to download',
        'It prevents the user from taking screenshots of the app',
        'It forces the user to sign up with a paid subscription'
      ],
      correctIndex: 0,
      explanation: 'Source transparency builds trust. Linking directly to PIB, RBI circulars, or university notices empowers students to verify the primary source themselves.'
    }
  },
  {
    id: 'module-3-web-speech',
    title: '3. Web Speech Synthesis (In-Browser Audio Reader)',
    subtitle: 'How the 30-second audio recap works without paying $50/month for cloud voice APIs',
    plainEnglishConcept: 'Did you know every modern smartphone and laptop already has high-quality speech engines built right into the browser? Instead of paying expensive third-party AI voice APIs, we use the native `window.speechSynthesis` API. It loads instantly, works offline, and costs $0.00!',
    realCodeExplanation: 'We create a `SpeechSynthesisUtterance` object with the article\'s `audioScript`. We adjust speech rate (1x, 1.25x, 1.5x) and handle pause/resume states smoothly.',
    codeSnippet: `// Native Browser Audio Narrator
const speakArticle = (text: string, rate: number = 1.0) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // Stop any ongoing audio
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // 1x, 1.25x speed
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
};`,
    studentQuiz: {
      question: 'Why is the native Web Speech API ideal for a zero-budget student startup project?',
      options: [
        'It runs directly on the user\'s client device for free with zero server API charges',
        'It only works if you have an active credit card connected to AWS',
        'It replaces the need for HTML and CSS entirely',
        'It automatically sends text messages to the student\'s phone'
      ],
      correctIndex: 0,
      explanation: 'Native Web APIs run locally on the user\'s CPU or phone, saving thousands of dollars in cloud computing costs while building your MVP!'
    }
  },
  {
    id: 'module-4-notifications',
    title: '4. Web Push & Phone Notifications Engine',
    subtitle: 'How to send breaking news alerts to phones without building an Android APK',
    plainEnglishConcept: 'You do not always need to build a heavy Android or iOS app to notify users. Modern Progressive Web Apps (PWAs) use the Web Notifications API and Service Workers. Once the student taps "Enable Alerts", your web app can ping their phone\'s notification tray just like WhatsApp or Twitter!',
    realCodeExplanation: 'We check `Notification.permission`. If not granted, we trigger `Notification.requestPermission()`. In this app, we also build an in-app fallback notification drawer with audio chimes so it works even inside restricted web frames.',
    codeSnippet: `// Requesting & Triggering Notifications
async function sendBreakingAlert(title: string, body: string) {
  if (!('Notification' in window)) return;
  
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/badge.png'
    });
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, { body });
    }
  }
}`,
    studentQuiz: {
      question: 'What is the main requirement before a website can trigger a push alert on a user\'s phone or browser?',
      options: [
        'The user must explicitly grant permission via a native browser prompt',
        'The student must pay an annual Google Play license fee',
        'The phone must be connected to a high-speed WiFi network only',
        'The user must disable their phone\'s security settings'
      ],
      correctIndex: 0,
      explanation: 'Browsers strictly protect user privacy by requiring explicit user permission before any website can show notifications.'
    }
  },
  {
    id: 'module-5-ai-moderation',
    title: '5. Automated AI Content Moderation for Memes',
    subtitle: 'How to keep a community forum 100% wholesome and campus-safe',
    plainEnglishConcept: 'Whenever you let users submit content (like memes or comments), you need a gatekeeper to prevent abuse, offensive language, or vulgarity. Our AI verifier analyzes the text structure and semantics before granting a "Verified Safe by AI" badge and publishing it to the campus stream.',
    realCodeExplanation: 'Submissions are passed through a deterministic sentiment and profanity analyzer paired with safety bounds. Approved content is stored in local state with an audit score.',
    codeSnippet: `// Student Meme Moderation Pipeline
const evaluation = verifyMemeSubmission(submission.title, submission.punchline);
if (!evaluation.approved) {
  setFeedbackMessage(\`Submission rejected: \${evaluation.reason}\`);
} else {
  publishMeme({ ...submission, aiVerifiedClean: true });
}`,
    studentQuiz: {
      question: 'What is the primary danger of launching a student user-generated board without an automated moderation filter?',
      options: [
        'Bad actors can post vulgar, abusive, or inappropriate content that damages community trust and school safety',
        'The database will instantly run out of memory',
        'Search engines will refuse to index the website completely',
        'The font sizes will automatically shrink'
      ],
      correctIndex: 0,
      explanation: 'Automated moderation safeguards community trust and ensures the app remains safe for classrooms, hostels, and families.'
    }
  }
];

export const deploymentGuide = {
  title: 'Complete Student Deployment & Publishing Masterclass',
  subtitle: 'How to deploy this website live to the world for $0.00 and manage backend & database',
  sections: [
    {
      step: 'Step 1: Where to Deploy the Frontend & Full-Stack App',
      summary: 'Vercel, Google Cloud Run, or Netlify (Free Tier)',
      details: [
        '**Vercel (Easiest for React/Vite)**: Connect your GitHub repository to Vercel.com. Whenever you run `git push origin main`, Vercel automatically runs `npm run build` and gives you a free HTTPS URL (e.g. `briefly-student.vercel.app`) in under 60 seconds.',
        '**Google Cloud Run (Best for Full-Stack Node/Express)**: Packages your app into a lightweight container. Cloud Run scales down to zero instances when no one is visiting, meaning you pay zero dollars for idle server time!',
        '**Custom Domain (e.g. `brieflynews.in` or `dailybrief.student`)**: You can purchase a `.in` or `.com` domain for ₹400–₹800/year on Namecheap or Cloudflare, and point DNS records in 2 clicks.'
      ]
    },
    {
      step: 'Step 2: Backend & Database Essentials',
      summary: 'PostgreSQL on Supabase or Neon + Firebase Auth',
      details: [
        '**Supabase (Free Managed PostgreSQL)**: Gives you a real relational SQL database with 500MB free storage. Perfect for storing news bookmarks, user profiles, and upvotes.',
        '**Node.js / Express Server**: If you want automated web scrapers (fetching PIB feeds or RSS news daily), create a lightweight Express cron job that runs once every 6 hours and updates the database.',
        '**Environment Variables (`.env`)**: Never commit API keys or database passwords to GitHub! Store them in Vercel or Cloud Run environment settings under secure secrets.'
      ]
    },
    {
      step: 'Step 3: Ethical Student Monetization Roadmap',
      summary: 'How to generate revenue without annoying paywalls or scam ads',
      details: [
        '**1. Student Tech & EdTech Sponsorships (Best Path)**: Partner with local coaching institutes, laptop repair centers in Siliguri, or coding bootcamps to feature a discrete, dignified "Sponsored Opportunity of the Week" card in the feed.',
        '**2. Curated Exam & Book Affiliate Links**: When recommending key books (like Dr. Kalam\'s *Wings of Fire* or syllabus guides), use Amazon Associate affiliate links. When a student buys a book, you earn 4–8% commission.',
        '**3. "Buy Me a Chai" / Student Micro-Donations**: Add a friendly UPI QR code / BuyMeACoffee link. Satisfied students and alumni often contribute ₹50 or ₹100 to support local student infrastructure.',
        '**4. Low-Cost Premium Study Packs (Later Stage)**: Keep daily news 100% free forever. If you later build AI-generated UPSC/WBJEE flashcard packs or mock interview questions, you can offer them for a symbolic ₹49/month.'
      ]
    }
  ]
};
