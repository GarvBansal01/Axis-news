import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Masthead } from './components/Masthead';
import { StreamFilterBar } from './components/StreamFilterBar';
import { ScrollingFeed } from './components/ScrollingFeed';
import { WisdomBanner } from './components/WisdomBanner';
import { DeepDiveModal } from './components/DeepDiveModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';

import { mockNewsArticles, UPCOMING_LIVE_DISPATCHES, getFreshRollingNews, createRollingTimestamp } from './data/mockNews';
import { wisdomCollection } from './data/wisdomData';
import { NewsArticle, NewsCategory, UserSession, AppFeedback } from './types';
import { playAudioChime } from './utils/audioPlayer';
import { FlashcardDeck } from './components/FlashcardDeck';
import { ImportantBriefingHero } from './components/ImportantBriefingHero';
import { FinanceHub } from './components/FinanceHub';
import { ApiConfigModal } from './components/ApiConfigModal';
import { fetchLiveRealTimeNews, getLiveApiStatus } from './services/liveNewsService';
import { 
  Sparkles, 
  TrendingUp, 
  CloudSun, 
  Clock, 
  Bookmark, 
  Layers, 
  MapPin, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Send,
  Coins,
  Star
} from 'lucide-react';

const INITIAL_FEEDBACKS: AppFeedback[] = [
  {
    id: 'fb-1',
    userEmail: 'priyanjit@nbu.ac.in',
    userName: 'Priyanjit Sarkar (NBU)',
    rating: 5,
    category: 'Siliguri Local Coverage',
    comment: 'The Bagdogra airport and North Bengal University updates are super relevant for students here in Siliguri! Zero clickbait.',
    timestamp: '2 hours ago'
  },
  {
    id: 'fb-2',
    userEmail: 'dev.student@sit.ac.in',
    userName: 'Ananya Roy (SIT Siliguri)',
    rating: 5,
    category: 'App Speed & Zero Clutter',
    comment: 'The 30-second bullet summaries save me 45 minutes of doom-scrolling before morning lectures. Best student app.',
    timestamp: 'Yesterday'
  },
  {
    id: 'fb-3',
    userEmail: 'mangalent.slg@gmail.com',
    userName: 'Siliguri Tech Enthusiast',
    rating: 5,
    category: 'Daily Wisdom',
    comment: 'Starting the morning with the Bhagavad Gita sloka followed by global AI frontier news gives incredible focus and peace of mind.',
    timestamp: 'Yesterday'
  }
];

export default function App() {
  const [articles, setArticles] = useState<NewsArticle[]>(() => getFreshRollingNews());
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSavedOnly, setIsSavedOnly] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [newDispatchAlert, setNewDispatchAlert] = useState<string | null>(null);

  // Modals & Drawers
  const [activeDeepDiveArticle, setActiveDeepDiveArticle] = useState<NewsArticle | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalTab, setContactModalTab] = useState<'contact' | 'rate'>('rate');
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState<number>(3);

  const openReviewModal = () => {
    setContactModalTab('rate');
    setIsContactModalOpen(true);
  };

  const openContactModal = () => {
    setContactModalTab('contact');
    setIsContactModalOpen(true);
  };

  const [viewMode, setViewMode] = useState<'stream' | 'flashcards'>('stream');
  const [secondsToNextRefresh, setSecondsToNextRefresh] = useState<number>(60);
  const incomingIndexRef = useRef<number>(0);

  // References
  const shlokaSectionRef = useRef<HTMLDivElement>(null);

  // Persistence: Bookmarks
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('axis_saved_ids');
      return stored ? JSON.parse(stored) : ['google-next-gen-ai-frontier', 'siliguri-bagdogra-terminal-2026'];
    } catch {
      return ['google-next-gen-ai-frontier', 'siliguri-bagdogra-terminal-2026'];
    }
  });

  // Persistence: User Session & History
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('axis_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [sessionHistory, setSessionHistory] = useState<UserSession[]>(() => {
    try {
      const stored = localStorage.getItem('axis_sessions');
      return stored ? JSON.parse(stored) : [
        {
          email: 'mangalent.slg@gmail.com',
          name: 'Student Scholar',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
          provider: 'google',
          universityOrCollege: 'North Bengal University (NBU), Siliguri',
          loginTimestamp: 'Today, 08:30 AM IST',
          ipAddress: '103.220.12.44 (Siliguri, WB)',
          device: 'Android Chrome Mobile',
          streakDays: 4
        }
      ];
    } catch {
      return [];
    }
  });

  // Persistence: Feedbacks
  const [feedbacks, setFeedbacks] = useState<AppFeedback[]>(() => {
    try {
      const stored = localStorage.getItem('axis_feedbacks');
      return stored ? JSON.parse(stored) : INITIAL_FEEDBACKS;
    } catch {
      return INITIAL_FEEDBACKS;
    }
  });

  // Theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('axis_theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('axis_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('axis_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('axis_saved_ids', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  useEffect(() => {
    localStorage.setItem('axis_sessions', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  useEffect(() => {
    localStorage.setItem('axis_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleToggleSave = (id: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLogin = (session: UserSession) => {
    setCurrentUser(session);
    setSessionHistory((prev) => [session, ...prev.slice(0, 15)]);
    localStorage.setItem('axis_user', JSON.stringify(session));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('axis_user');
  };

  const handleSubmitFeedback = (fb: AppFeedback) => {
    setFeedbacks((prev) => [fb, ...prev]);
  };

  // Initial mount: Fetch fresh real-time RSS / GNews dispatches to prepend to feed
  useEffect(() => {
    let isMounted = true;
    fetchLiveRealTimeNews('all')
      .then((liveItems) => {
        if (!isMounted || !liveItems || liveItems.length === 0) return;
        setArticles((prev) => {
          const existingTitles = new Set(prev.map((a) => a.title.toLowerCase().trim()));
          const novelItems = liveItems.filter(
            (item) => !existingTitles.has(item.title.toLowerCase().trim())
          );
          if (novelItems.length > 0) {
            return [...novelItems, ...prev];
          }
          return prev;
        });
      })
      .catch((err) => {
        console.debug('Initial live news wire fetch note:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Automated 60-Second Live Radar Auto-Update Engine (Pulls genuine live RSS/API news or rolls queue)
  const triggerLiveMinuteUpdate = async () => {
    try {
      // 1. Attempt to fetch genuine live breaking news from Google News RSS Wire / GNews / X
      const liveItems = await fetchLiveRealTimeNews(activeCategory);
      if (liveItems && liveItems.length > 0) {
        let addedArticle: NewsArticle | null = null;
        setArticles((prev) => {
          const existingTitles = new Set(prev.map((a) => a.title.toLowerCase().trim()));
          const novel = liveItems.find(
            (item) => !existingTitles.has(item.title.toLowerCase().trim())
          );
          if (novel) {
            addedArticle = novel;
            return [novel, ...prev];
          }
          return prev;
        });

        if (addedArticle) {
          const titleSummary = (addedArticle as NewsArticle).title.slice(0, 52);
          setNewDispatchAlert(`⚡ Live Wire Alert: ${titleSummary}...`);
          setUnreadAlertsCount((prev) => prev + 1);
          playAudioChime();

          if ('Notification' in window && Notification.permission === 'granted') {
            try {
              new Notification(`⚡ AXIS ALERT: ${(addedArticle as NewsArticle).locationScope}`, {
                body: `${(addedArticle as NewsArticle).title}\n\n${(addedArticle as NewsArticle).takeaway}`,
                icon: '/favicon.ico'
              });
            } catch (e) {
              console.debug('Notification push note:', e);
            }
          }

          setTimeout(() => setNewDispatchAlert(null), 5000);
          return;
        }
      }
    } catch (e) {
      console.debug('Live wire fetch notice:', e);
    }

    // 2. Seamless Fallback: Roll the upcoming curated dispatches queue
    const template = UPCOMING_LIVE_DISPATCHES[incomingIndexRef.current % UPCOMING_LIVE_DISPATCHES.length];
    incomingIndexRef.current += 1;

    const rolling = createRollingTimestamp(0);
    const freshDispatch: NewsArticle = {
      ...template,
      id: `${template.id}-${Date.now()}`,
      publishedAt: 'Just now (Live Radar)',
      timestamp: rolling.timestamp,
      dateLabel: rolling.dateLabel,
      incidentDate: rolling.incidentDate,
      factSheet: template.factSheet ? {
        ...template.factSheet,
        when: rolling.incidentDate
      } : template.factSheet
    };

    setArticles((prev) => [freshDispatch, ...prev]);
    setNewDispatchAlert(`⚡ 1-Min Radar Alert: ${freshDispatch.title.slice(0, 52)}...`);
    setUnreadAlertsCount((prev) => prev + 1);
    playAudioChime();

    // Native browser push notification if enabled
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`⚡ AXIS ALERT: ${freshDispatch.locationScope}`, {
          body: `${freshDispatch.title}\n\n${freshDispatch.takeaway}`,
          icon: '/favicon.ico'
        });
      } catch (e) {
        console.debug('Notification error:', e);
      }
    }

    setTimeout(() => setNewDispatchAlert(null), 5000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsToNextRefresh((prev) => {
        if (prev <= 1) {
          triggerLiveMinuteUpdate();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeCategory]);

  // Manual Feed Sync Button Handler
  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    setSecondsToNextRefresh(60);
    
    try {
      const liveItems = await fetchLiveRealTimeNews(activeCategory);
      if (liveItems && liveItems.length > 0) {
        setArticles((prev) => {
          const existingTitles = new Set(prev.map((a) => a.title.toLowerCase().trim()));
          const novelItems = liveItems.filter(
            (item) => !existingTitles.has(item.title.toLowerCase().trim())
          );
          if (novelItems.length > 0) {
            setNewDispatchAlert(`⚡ Wire Synced: ${novelItems.length} fresh breaking reports loaded`);
            setTimeout(() => setNewDispatchAlert(null), 4000);
            return [...novelItems, ...prev];
          }
          return prev;
        });
      }
    } catch (e) {
      console.debug('Refresh feed wire note:', e);
    }

    triggerLiveMinuteUpdate();
    setArticles((prev) => {
      return prev.map((art) => {
        const minutesAgo = Math.max(0, (Date.now() - (art.timestamp || Date.now())) / (60 * 1000));
        const dynamic = createRollingTimestamp(minutesAgo);
        return {
          ...art,
          publishedAt: art.publishedAt.includes('1-Min') || art.publishedAt.includes('Live Radar') ? art.publishedAt : dynamic.publishedAt,
          dateLabel: dynamic.dateLabel,
          incidentDate: dynamic.incidentDate,
          factSheet: art.factSheet ? {
            ...art.factSheet,
            when: dynamic.incidentDate
          } : art.factSheet
        };
      });
    });
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const scrollToContact = () => {
    openReviewModal();
  };

  const scrollToShloka = () => {
    if (shlokaSectionRef.current) {
      shlokaSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered articles with 24-Hour Auto-Purge Engine
  const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

  const filteredArticles = useMemo(() => {
    const now = Date.now();
    return articles.filter((article) => {
      // 24-Hour Auto-Purge: Excludes news older than 24 hours from the live stream
      const isWithin24Hours = (now - (article.timestamp || now)) <= TWENTY_FOUR_HOURS_MS;
      if (!isSavedOnly && !isWithin24Hours) {
        return false; // automatically purged after 24 hrs
      }

      const matchesCategory =
        activeCategory === 'all' || article.category === activeCategory;

      const matchesSaved = !isSavedOnly || savedArticleIds.includes(article.id);

      const matchesSearch =
        !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.takeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.theRealProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.locationScope.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSaved && matchesSearch;
    });
  }, [articles, activeCategory, isSavedOnly, savedArticleIds, searchQuery]);

  // Top Critical Spotlight Articles (Dynamically prioritized from real live dispatches)
  const topCriticalArticles = useMemo(() => {
    const disaster = articles.find((a) => a.category === 'disaster');
    const national = articles.find((a) => a.category === 'national');
    const geopolitics = articles.find((a) => a.category === 'geopolitics');
    const ai = articles.find((a) => a.category === 'ai');

    const topList: NewsArticle[] = [];
    if (disaster) topList.push(disaster);
    if (national) topList.push(national);
    if (geopolitics) topList.push(geopolitics);
    if (ai) topList.push(ai);

    for (const art of articles) {
      if (!topList.some((t) => t.id === art.id)) {
        topList.push(art);
      }
      if (topList.length >= 4) break;
    }

    return topList.slice(0, 4);
  }, [articles]);

  const categories: { id: NewsCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Dispatches', count: articles.length },
    { id: 'finance', label: '📈 Finance & Rates', count: articles.filter(a => a.category === 'finance').length },
    { id: 'education', label: '🎓 Campus & Hiring', count: articles.filter(a => a.category === 'education').length },
    { id: 'startups', label: '🚀 Startups & VC', count: articles.filter(a => a.category === 'startups').length },
    { id: 'science', label: '🔬 Space & Science', count: articles.filter(a => a.category === 'science').length },
    { id: 'national', label: '🇮🇳 India National', count: articles.filter(a => a.category === 'national').length },
    { id: 'ai', label: '🤖 AI Frontier', count: articles.filter(a => a.category === 'ai').length },
    { id: 'personal', label: '💻 Big Tech & Systems', count: articles.filter(a => a.category === 'personal').length },
    { id: 'geopolitics', label: '🌐 Geopolitics & War', count: articles.filter(a => a.category === 'geopolitics').length },
    { id: 'disaster', label: '🚨 Disaster & Alerts', count: articles.filter(a => a.category === 'disaster').length },
    { id: 'local', label: '📍 Siliguri & Regional', count: articles.filter(a => a.category === 'local').length },
    { id: 'world', label: '🌍 World Affairs', count: articles.filter(a => a.category === 'world').length },
    { id: 'gaming', label: '🎮 Gaming & Hardware', count: articles.filter(a => a.category === 'gaming').length }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-zinc-200 dark:selection:bg-zinc-800">
      {/* Sleek App Navigation Header */}
      <Masthead
        savedCount={savedArticleIds.length}
        unreadAlertsCount={unreadAlertsCount}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenContact={openReviewModal}
        onRefreshFeed={handleRefreshFeed}
        isRefreshing={isRefreshing}
        currentUser={currentUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onToggleSavedOnly={() => setIsSavedOnly(!isSavedOnly)}
        isSavedOnly={isSavedOnly}
      />

      {/* Balanced 3-Column Desktop Layout (Solves Empty Left & Right Spaces) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-center gap-8">
          {/* ================= LEFT RAIL (DESKTOP) ================= */}
          <aside className="w-56 shrink-0 hidden lg:block sticky top-20 self-start space-y-4">
            {/* Navigation Channels */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block px-2 mb-2 font-bold">
                Radar Desks
              </span>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id && !isSavedOnly;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (isSavedOnly) setIsSavedOnly(false);
                      setActiveCategory(cat.id);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-2xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="font-mono text-[10px] text-zinc-400">{cat.count}</span>
                  </button>
                );
              })}
            </div>

            {/* Student Efficiency Hub Card */}
            <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                Student Intel Hub
              </span>
              <div className="space-y-1.5 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>~45 min daily doomscroll saved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>100% Accredited Sources</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>1-Min Live Radar Active</span>
                </div>
              </div>
            </div>

            {/* Bookmarks Filter */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block px-2 mb-1.5 font-bold">
                Saved Notes
              </span>
              <button
                onClick={() => setIsSavedOnly(!isSavedOnly)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  isSavedOnly
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bookmarked</span>
                </div>
                <span className="font-mono text-[10px]">{savedArticleIds.length}</span>
              </button>
            </div>

            {/* Quick Review & Feedback Action */}
            <div className="p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/10 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 block font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                Review & Feedback
              </span>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">
                Reviewing AXIS? Rate it, report bugs, or tell Garv what features to add next!
              </p>
              <button
                onClick={openReviewModal}
                className="w-full py-1.5 px-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>Give Review & Ideas</span>
              </button>
            </div>
          </aside>

          {/* ================= CENTER COLUMN (MAIN STREAM) ================= */}
          <main className="flex-1 min-w-0 max-w-2xl">
            {/* Stream Filter Bar (Search + Categories + View Mode Switcher) */}
            <StreamFilterBar
              activeCategory={activeCategory}
              setActiveCategory={(cat) => {
                if (isSavedOnly) setIsSavedOnly(false);
                setActiveCategory(cat);
              }}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalCount={filteredArticles.length}
              lastUpdatedText={secondsToNextRefresh === 60 ? 'Just now' : `${60 - secondsToNextRefresh}s ago`}
              viewMode={viewMode}
              setViewMode={setViewMode}
              secondsToNextRefresh={secondsToNextRefresh}
              onOpenApiConfig={() => setIsApiModalOpen(true)}
            />

            {/* Live Incoming Dispatch Banner */}
            {newDispatchAlert && (
              <div className="my-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center justify-between animate-fade-in shadow-2xs">
                <span className="font-medium">{newDispatchAlert}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">#LiveRadar</span>
              </div>
            )}

            {/* Saved Items Filter Indicator */}
            {isSavedOnly && (
              <div className="my-3 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono flex items-center justify-between">
                <span>Showing Bookmarked Briefs ({filteredArticles.length})</span>
                <button
                  onClick={() => setIsSavedOnly(false)}
                  className="text-zinc-600 dark:text-zinc-300 underline cursor-pointer"
                >
                  Show All Dispatches
                </button>
              </div>
            )}

            {/* Dynamic View: ⚡ 30-Second Flashcards Deck vs Stream Feed */}
            {viewMode === 'flashcards' ? (
              <div className="py-2">
                <div className="mb-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-800 dark:text-amber-300 flex items-center justify-between">
                  <span className="font-bold">⚡ 30-Second Student Card Mode Active</span>
                  <span className="text-[10px]">Navigate with ← / → keys or buttons</span>
                </div>
                <FlashcardDeck
                  articles={filteredArticles}
                  savedArticleIds={savedArticleIds}
                  onToggleSave={handleToggleSave}
                  onOpenDeepDive={(art) => setActiveDeepDiveArticle(art)}
                />
              </div>
            ) : (
              <>
                {/* WHAT'S IMPORTANT RIGHT NOW (CRITICAL SPOTLIGHT HERO) */}
                {!isSavedOnly && !searchQuery.trim() && activeCategory === 'all' && (
                  <ImportantBriefingHero
                    topArticles={topCriticalArticles}
                    savedArticleIds={savedArticleIds}
                    onToggleSave={handleToggleSave}
                    onOpenDeepDive={(art) => setActiveDeepDiveArticle(art)}
                  />
                )}

                {/* FINANCE & RATES RADAR HUB (Full interactive hub when finance desk selected) */}
                {activeCategory === 'finance' && !isSavedOnly && (
                  <FinanceHub />
                )}

                {/* Quick Finance Bar in All Dispatches Mode */}
                {!isSavedOnly && !searchQuery.trim() && activeCategory === 'all' && (
                  <div className="mb-4 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-mono">
                      <span className="p-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold shrink-0">
                        📈 Rates
                      </span>
                      <span className="text-zinc-500 shrink-0">Gold 24K: <strong className="text-zinc-900 dark:text-zinc-100">₹79,450/10g</strong></span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-zinc-500 shrink-0">Silver: <strong className="text-zinc-900 dark:text-zinc-100">₹96,500/kg</strong></span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-zinc-500 shrink-0">1 USD: <strong className="text-zinc-900 dark:text-zinc-100">₹84.18</strong></span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-zinc-500 shrink-0">NIFTY: <strong className="text-zinc-900 dark:text-zinc-100">24,180</strong></span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveCategory('finance');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer shrink-0 flex items-center gap-1 self-end sm:self-auto"
                    >
                      <span>Open Finance Desk</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <ScrollingFeed
                  articles={filteredArticles}
                  savedArticleIds={savedArticleIds}
                  onToggleSave={handleToggleSave}
                  onOpenDeepDive={(art) => setActiveDeepDiveArticle(art)}
                />
              </>
            )}

            {/* BHAGAVAD GITA SHLOKA (PLACED AT THE LAST AS REQUESTED) */}
            <div ref={shlokaSectionRef} className="pt-8">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 pb-2">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                <span>Daily Reflection & Focus</span>
              </div>
              <WisdomBanner wisdomList={wisdomCollection} />
            </div>

            {/* REVIEW / FEEDBACK TRIGGER BAR */}
            <div className="pt-6 pb-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span className="text-zinc-600 dark:text-zinc-300 font-medium">
                    Testing AXIS? Tell Garv what works, what's broken, or what to add!
                  </span>
                </div>
                <button
                  onClick={openReviewModal}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs"
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>Give Review</span>
                </button>
              </div>
            </div>
          </main>

          {/* ================= RIGHT RAIL (DESKTOP) ================= */}
          <aside className="w-72 shrink-0 hidden xl:block sticky top-20 self-start space-y-4">
            {/* Siliguri Regional Weather & Air Quality */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Siliguri, WB</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">AQI 42 (Good)</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <CloudSun className="w-7 h-7 text-amber-500" />
                <div>
                  <span className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">24°C</span>
                  <span className="text-xs text-zinc-500 ml-1.5">Himalayan Foothills</span>
                </div>
              </div>
            </div>

            {/* Live Market Pulse (Gold, Silver, USD/INR, NIFTY) */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-zinc-100 dark:border-zinc-900 pb-2">
                <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wider">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>Market Pulse</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● Live IST</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Gold 24K (10g)</span>
                  <div className="text-right">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">₹79,450</span>
                    <span className="text-[10px] text-emerald-600 ml-1 font-bold">+0.4%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-1.5">
                  <span className="text-zinc-500">Silver (1 kg)</span>
                  <div className="text-right">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">₹96,500</span>
                    <span className="text-[10px] text-emerald-600 ml-1 font-bold">+1.3%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-1.5">
                  <span className="text-zinc-500">USD / INR</span>
                  <div className="text-right">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">₹84.18</span>
                    <span className="text-[10px] text-emerald-600 ml-1 font-bold">+0.1%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-1.5">
                  <span className="text-zinc-500">NIFTY 50</span>
                  <div className="text-right">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">24,180.80</span>
                    <span className="text-[10px] text-emerald-600 ml-1 font-bold">+0.6%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isSavedOnly) setIsSavedOnly(false);
                  setActiveCategory('finance');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Explore Finance & Rates Hub</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Trending Radar Topics (Fast Facts) */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-900 pb-2">
                <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
                <span>Trending Fast</span>
              </div>

              <div className="space-y-3 text-xs">
                <div 
                  onClick={() => setActiveDeepDiveArticle(articles.find(a => a.id === 'pilot-attacked-safe-emergency-landing') || articles[0])}
                  className="space-y-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">1 · Aviation Emergency</span>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                    IndiGo pilot attacked mid-flight; safe emergency landing executed
                  </h4>
                </div>

                <div 
                  onClick={() => setActiveDeepDiveArticle(articles.find(a => a.id === 'russia-ukraine-high-tech-frontline-grain-pact') || articles[1])}
                  className="space-y-0.5 cursor-pointer hover:opacity-80 transition-opacity border-t border-zinc-100 dark:border-zinc-900 pt-2"
                >
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">2 · Geopolitics & War</span>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                    Russia-Ukraine drone frontline & Black Sea grain safety accord
                  </h4>
                </div>

                <div 
                  onClick={() => setActiveDeepDiveArticle(articles.find(a => a.id === 'bay-of-bengal-supercyclone-evacuation-zero-casualties') || articles[2])}
                  className="space-y-0.5 cursor-pointer hover:opacity-80 transition-opacity border-t border-zinc-100 dark:border-zinc-900 pt-2"
                >
                  <span className="text-[10px] font-mono text-red-600 dark:text-red-400 font-bold uppercase">3 · Disaster Alert</span>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                    Bay of Bengal cyclone alert: 450,000 sheltered with zero casualties
                  </h4>
                </div>

                <div 
                  onClick={() => setActiveDeepDiveArticle(articles.find(a => a.id === 'frontier-ai-researcher-x-leak-verified') || articles[3])}
                  className="space-y-0.5 cursor-pointer hover:opacity-80 transition-opacity border-t border-zinc-100 dark:border-zinc-900 pt-2"
                >
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase">4 · AI Leaks</span>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                    Viral X (Twitter) researcher leaks verified: open reasoning models
                  </h4>
                </div>
              </div>
            </div>

            {/* Quick Review Formspree Card */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Review & Suggestions</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Share your rating or request custom data feeds directly. Submissions go straight to the creator.
              </p>
              <button
                onClick={openReviewModal}
                className="w-full mt-1 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-xs flex items-center justify-center gap-1 shadow-2xs"
              >
                <span>Write Review / Suggestion</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Clean Minimalist Footer */}
      <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 py-10 px-4 md:px-6 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <p className="font-bold text-zinc-900 dark:text-zinc-100 tracking-wider">
              AXIS · NEWS INTELLIGENCE
            </p>
            <p className="text-[11px] text-zinc-400">
              Zero social noise. Factual, synthesized dispatches for students.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={scrollToShloka}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Daily Shloka
            </button>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
            <button
              onClick={openReviewModal}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
              <span>Review & Feedback</span>
            </button>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <DeepDiveModal
        article={activeDeepDiveArticle}
        onClose={() => setActiveDeepDiveArticle(null)}
        isSaved={activeDeepDiveArticle ? savedArticleIds.includes(activeDeepDiveArticle.id) : false}
        onToggleSave={handleToggleSave}
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        articles={articles}
        onSelectArticle={(art) => setActiveDeepDiveArticle(art)}
        unreadCount={unreadAlertsCount}
        onMarkAllRead={() => setUnreadAlertsCount(0)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        sessionHistory={sessionHistory}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        feedbacks={feedbacks}
        onSubmitFeedback={handleSubmitFeedback}
        currentUserEmail={currentUser?.email}
        initialTab={contactModalTab}
      />

      <ApiConfigModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onKeysUpdated={() => {
          triggerLiveMinuteUpdate();
        }}
      />

      {/* Discreet Floating Review & Feedback Button (Mobile & Desktop) */}
      <button
        onClick={openReviewModal}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/95 hover:bg-zinc-900 text-white dark:bg-zinc-100/95 dark:hover:bg-zinc-100 dark:text-zinc-950 font-sans text-xs font-semibold shadow-lg backdrop-blur-md transition-all hover:scale-105 cursor-pointer border border-zinc-700/50 dark:border-zinc-300/50"
        title="Leave feedback, rating, or feature suggestion"
      >
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span>Review / Ideas</span>
      </button>
    </div>
  );
}
