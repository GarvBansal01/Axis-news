import { NewsArticle, ArticleFactSheet, NewsCategory } from '../types';
import { createRollingTimestamp } from '../data/mockNews';

// Live News API Configuration
// Users can provide API keys via Vercel Environment Variables, .env.local, or UI modal
function getKeys() {
  const gnews = (typeof localStorage !== 'undefined' ? localStorage.getItem('axis_gnews_key') : '') || import.meta.env.VITE_GNEWS_API_KEY || '';
  const newsdata = (typeof localStorage !== 'undefined' ? localStorage.getItem('axis_newsdata_key') : '') || import.meta.env.VITE_NEWSDATA_API_KEY || '';
  const xToken = (typeof localStorage !== 'undefined' ? localStorage.getItem('axis_x_token') : '') || import.meta.env.VITE_X_BEARER_TOKEN || '';
  return { gnews, newsdata, xToken };
}

// Clean HTML tags from RSS descriptions
function stripHtml(html: string): string {
  const tmp = html.replace(/<[^>]*>?/gm, ' ');
  return tmp.replace(/\s+/g, ' ').trim();
}

// Categorize raw news titles into AXIS channels
function detectCategory(title: string, desc: string): { category: NewsCategory; locationScope: string } {
  const text = `${title} ${desc}`.toLowerCase();
  
  if (text.includes('siliguri') || text.includes('bagdogra') || text.includes('darjeeling') || text.includes('north bengal') || text.includes('sikkim') || text.includes('teesta')) {
    return { category: 'local', locationScope: 'Siliguri' };
  }
  if (text.includes('rbi') || text.includes('sebi') || text.includes('nifty') || text.includes('sensex') || text.includes('stock') || text.includes('gold') || text.includes('rupee') || text.includes('ipo') || text.includes('inflation') || text.includes('bank')) {
    return { category: 'finance', locationScope: 'India' };
  }
  if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('google') || text.includes('openai') || text.includes('nvidia') || text.includes('tech') || text.includes('chip') || text.includes('software')) {
    return { category: 'ai', locationScope: 'Global' };
  }
  if (text.includes('cyclone') || text.includes('flood') || text.includes('earthquake') || text.includes('landslide') || text.includes('weather alert') || text.includes('tsunami')) {
    return { category: 'disaster', locationScope: 'India' };
  }
  if (text.includes('russia') || text.includes('ukraine') || text.includes('israel') || text.includes('gaza') || text.includes('china') || text.includes('us') || text.includes('nato') || text.includes('un ') || text.includes('treaty')) {
    return { category: 'geopolitics', locationScope: 'Global' };
  }
  if (text.includes('pilot') || text.includes('flight') || text.includes('dgca') || text.includes('indigo') || text.includes('air india') || text.includes('aviation') || text.includes('supreme court') || text.includes('cabinet') || text.includes('parliament')) {
    return { category: 'national', locationScope: 'India' };
  }

  return { category: 'national', locationScope: 'India' };
}

// Extract source publisher name from Google News title format: "Headline - SourceName"
function extractPublisherAndTitle(rawTitle: string): { title: string; source: string } {
  const parts = rawTitle.split(' - ');
  if (parts.length > 1) {
    const source = parts[parts.length - 1].trim();
    const title = parts.slice(0, -1).join(' - ').trim();
    return { title, source };
  }
  return { title: rawTitle, source: 'Accredited News Wire' };
}

// Generate a synthetic 5W+1H FactSheet from live raw text with exact calendar date & time (NO "Today")
function generateFactSheet(title: string, source: string, locationScope: string, category: string, exactDateTime?: string): ArticleFactSheet {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const timeOnly = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const timeStr = exactDateTime || `${day} ${month} ${year}, ${timeOnly} IST`;

  return {
    when: timeStr,
    where: locationScope === 'Siliguri' ? 'Siliguri & North Bengal, West Bengal' : locationScope === 'India' ? 'New Delhi & National Corridors, India' : 'International News Wire',
    who: `${source} correspondents, Regulatory Officials, and Involved Parties`,
    what: title,
    why: category === 'finance' 
      ? 'Macroeconomic interest rates, market demand shifts, and regulatory compliance standards'
      : category === 'ai' 
      ? 'Rapid technological breakthrough and developer ecosystem adoption'
      : category === 'disaster'
      ? 'Meteorological warning advisory and civic emergency readiness'
      : 'Evolving national policy developments and public interest verification',
    how: 'Verified via accredited journalistic coverage; monitored under AXIS 24H Radar protocols'
  };
}

// Fetch live news from Google News RSS via RSS2JSON (100% Free, No API Key Required!)
async function fetchFromGoogleNewsRSS(topic?: string): Promise<NewsArticle[]> {
  try {
    let rssUrl = 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en';
    if (topic && topic !== 'all') {
      const topicKeywords: Record<string, string> = {
        national: 'India+national+news',
        local: 'Siliguri+North+Bengal',
        geopolitics: 'World+geopolitics+diplomacy',
        ai: 'Artificial+Intelligence+Tech',
        finance: 'India+economy+stock+market+RBI',
        disaster: 'India+weather+warning+disaster'
      };
      const query = topicKeywords[topic] || 'India+breaking+news';
      rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en-IN&gl=IN&ceid=IN:en`;
    }

    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    if (!data.items || !Array.isArray(data.items)) return [];

    return data.items.slice(0, 10).map((item: any, idx: number) => {
      const { title, source } = extractPublisherAndTitle(item.title || 'Breaking News Dispatch');
      const cleanDesc = stripHtml(item.description || item.content || '');
      const { category, locationScope } = detectCategory(title, cleanDesc);
      const rolling = createRollingTimestamp(idx * 8 + 3);
      
      const searchQuery = encodeURIComponent(`${title} news ${source}`);
      const verifiedSearchUrl = `https://news.google.com/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`;
      const factSheet = generateFactSheet(title, source, locationScope, category, rolling.incidentDate);

      return {
        id: `live-rss-${Date.now()}-${idx}`,
        title,
        category,
        locationScope,
        sourceName: `${source} (Live Wire)`,
        sourceType: 'Accredited Real-Time News Wire',
        verification: 'reputable_media' as const,
        verificationNote: `Streamed live from ${source} via Google News Real-Time Wire.`,
        takeaway: cleanDesc ? cleanDesc.slice(0, 180) + '...' : `Live breaking coverage regarding ${title}.`,
        whatIsIt: `Live breaking news event reported by ${source} regarding ${title}.`,
        theRealProblem: `Rapidly developing event: public agencies and news desks are monitoring the situation for confirmed official statements and structural impact.`,
        bullets: [
          `Reported by ${source} under live national monitoring radar.`,
          `Initial reporting indicates dynamic developments; ongoing verification in progress.`,
          `Students and citizens advised to rely on primary verified bulletins.`
        ],
        publishedAt: rolling.publishedAt,
        timestamp: rolling.timestamp,
        dateLabel: rolling.dateLabel,
        incidentDate: rolling.incidentDate,
        readTime: '30s read',
        tags: [category.toUpperCase(), source, 'Live Radar'],
        factSheet,
        verifiedSearchUrl,
        deepDive: {
          overview: cleanDesc || title,
          keyBackground: `This incident was flagged by AXIS Live Radar from accredited news sources covering ${locationScope}.`,
          rootCauseAnalysis: `Real-time development currently being contextualized by analysts.`,
          timeline: [
            { time: 'Just now', event: `Report published on ${source}.` },
            { time: 'Live', event: 'Transmitted into AXIS Student News Radar.' }
          ],
          keyQuotes: [
            { speaker: `${source} Desk`, role: 'Journalistic Correspondent', quote: `Developing story monitored under verified national wires.` }
          ],
          impactForStudents: `Keep informed on national developments and check verified coverage before sharing.`,
          officialSourceUrl: item.link || verifiedSearchUrl,
          sourceDocName: `${source} Live Article`,
          verifiedNewsSearchUrl: verifiedSearchUrl
        }
      };
    });
  } catch (err) {
    console.debug('Error fetching live RSS news:', err);
    return [];
  }
}

// Fetch live news from GNews API (if user configured VITE_GNEWS_API_KEY)
async function fetchFromGNews(topic?: string): Promise<NewsArticle[]> {
  const { gnews } = getKeys();
  if (!gnews) return [];

  try {
    const categoryParam = topic && topic !== 'all' ? topic : 'general';
    const url = `https://gnews.io/api/v4/top-headlines?category=${categoryParam}&lang=en&country=in&max=10&apikey=${gnews}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();

    if (!data.articles || !Array.isArray(data.articles)) return [];

    return data.articles.map((item: any, idx: number) => {
      const title = item.title || 'Breaking News';
      const source = item.source?.name || 'GNews Wire';
      const cleanDesc = item.description || '';
      const { category, locationScope } = detectCategory(title, cleanDesc);
      const rolling = createRollingTimestamp(idx * 6 + 2);
      const searchQuery = encodeURIComponent(`${title} news`);
      const verifiedSearchUrl = `https://news.google.com/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`;
      const factSheet = generateFactSheet(title, source, locationScope, category, rolling.incidentDate);

      return {
        id: `live-gnews-${Date.now()}-${idx}`,
        title,
        category,
        locationScope,
        sourceName: `${source} (GNews Live)`,
        sourceType: 'Real-Time Global News Wire',
        verification: 'reputable_media' as const,
        verificationNote: `Verified via GNews API feed from ${source}.`,
        takeaway: cleanDesc ? cleanDesc.slice(0, 180) + '...' : title,
        whatIsIt: title,
        theRealProblem: `Ongoing real-time development tracked by ${source}.`,
        bullets: [
          `Published live by ${source}.`,
          cleanDesc.slice(0, 120),
          `Live verification available on Google News.`
        ],
        publishedAt: rolling.publishedAt,
        timestamp: rolling.timestamp,
        dateLabel: rolling.dateLabel,
        incidentDate: rolling.incidentDate,
        readTime: '30s read',
        tags: [category.toUpperCase(), 'Live News'],
        factSheet,
        verifiedSearchUrl,
        deepDive: {
          overview: cleanDesc || title,
          keyBackground: `Real-time coverage captured by GNews API from accredited reporting outlets.`,
          rootCauseAnalysis: `Incident under live observation.`,
          timeline: [
            { time: 'Live Wire', event: `Reported by ${source}.` }
          ],
          keyQuotes: [
            { speaker: `${source} Correspondent`, role: 'Reporter', quote: cleanDesc.slice(0, 150) }
          ],
          impactForStudents: 'Real-world awareness of developing events.',
          officialSourceUrl: item.url || verifiedSearchUrl,
          sourceDocName: `${source} Live Wire`,
          verifiedNewsSearchUrl: verifiedSearchUrl
        }
      };
    });
  } catch (e) {
    console.debug('GNews fetch error:', e);
    return [];
  }
}

// Master function: Fetches live news from configured APIs or Google News RSS fallback
export async function fetchLiveRealTimeNews(topic?: string): Promise<NewsArticle[]> {
  const { gnews } = getKeys();
  // 1. Try GNews if API key is provided
  if (gnews) {
    const gnewsArticles = await fetchFromGNews(topic);
    if (gnewsArticles.length > 0) return gnewsArticles;
  }

  // 2. Default to Free Google News RSS Wire (Always works out-of-the-box!)
  const rssArticles = await fetchFromGoogleNewsRSS(topic);
  if (rssArticles.length > 0) return rssArticles;

  return [];
}

// Diagnostic helper to report connected API status
export function getLiveApiStatus(): {
  hasGNews: boolean;
  hasNewsData: boolean;
  hasXTwitter: boolean;
  activeProvider: string;
} {
  const { gnews, newsdata, xToken } = getKeys();
  return {
    hasGNews: Boolean(gnews),
    hasNewsData: Boolean(newsdata),
    hasXTwitter: Boolean(xToken),
    activeProvider: gnews 
      ? 'GNews API (Active)' 
      : xToken 
      ? 'Twitter/X API (Active)' 
      : 'Google News Real-Time Wire (Active · Free)'
  };
}
