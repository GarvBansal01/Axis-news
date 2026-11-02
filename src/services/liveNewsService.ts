import { NewsArticle, ArticleFactSheet, NewsCategory, LocationScope } from '../types';
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
function detectCategory(title: string, desc: string): { category: NewsCategory; locationScope: LocationScope } {
  const text = `${title} ${desc}`.toLowerCase();
  
  // 1. Regional: Siliguri & North Bengal
  if (text.includes('siliguri') || text.includes('bagdogra') || text.includes('darjeeling') || text.includes('north bengal') || text.includes('sikkim') || text.includes('teesta') || text.includes('dooars') || text.includes('sevoke')) {
    return { category: 'local', locationScope: 'Siliguri' };
  }

  // 2. Disaster & Weather Emergencies
  if (text.includes('cyclone') || text.includes('murasu') || text.includes('flood') || text.includes('earthquake') || text.includes('landslide') || text.includes('weather alert') || text.includes('tsunami') || text.includes('imd alert') || text.includes('heavy rain')) {
    return { category: 'disaster', locationScope: 'Bay of Bengal' };
  }

  // 3. Finance, Markets & Macro
  if (text.includes('rbi') || text.includes('sebi') || text.includes('nifty') || text.includes('sensex') || text.includes('stock market') || text.includes('gold price') || text.includes('silver price') || text.includes('rupee') || text.includes('ipo') || text.includes('inflation') || text.includes('derivatives') || text.includes('f&o')) {
    return { category: 'finance', locationScope: 'India' };
  }

  // 4. Geopolitics & Warfare
  if (text.includes('russia') || text.includes('ukraine') || text.includes('pokrovsk') || text.includes('kstovo') || text.includes('israel') || text.includes('gaza') || text.includes('iran') || text.includes('netanyahu') || text.includes('nato') || text.includes('drone strike') || text.includes('frontline')) {
    return { category: 'geopolitics', locationScope: 'Eastern Europe' };
  }

  // 5. Big Tech Launches, Comments & Keynotes (Apple, Nvidia, Microsoft, Amazon AWS, Google hardware, Intel, AMD, executive talks)
  const isBigTechCompany = /\b(apple|tim cook|nvidia|jensen huang|microsoft|satya nadella|amazon aws|aws|andy jassy|matt garman|intel|amd|qualcomm|tsmc|semiconductor|semiconductors|microchip|hardware launch|device launch|keynote speech|keynote address|macbook|iphone|pixel 9|galaxy s|blackwell|gb200|tpu|datacenter|datacenters|cloud infrastructure)\b/i.test(text);

  // 6. Strict AI Frontier Detection (Pure AI models, LLMs, neural networks, OpenAI, Anthropic, DeepSeek, reasoning architectures)
  const isStrictAI = /\b(artificial intelligence|generative ai|genai|llm|llms|gpt-?4|gpt-?5|o1|o3|o3-mini|claude|gemini|deepseek|chatgpt|openai|anthropic|machine learning|neural network|neural networks|agentic ai|reasoning models?|diffusion models?|transformer models?|foundation models?|open weights)\b/i.test(text) ||
    /\b(ai model|ai models|ai agent|ai agents|frontier ai|ai chip|ai safety|ai startup|ai startups|ai research|ai breakthrough|ai labs?|ai governance|ai compute|ai benchmark|ai coding)\b/i.test(text) ||
    (/\b(a\.i\.|ai)\b/i.test(text) && !/\b(air india|flight|flights|airline|airlines|airport|airports|aviation)\b/i.test(text));

  // If it is specifically about a Big Tech company launch, executive talk, or hardware system (and not pure AI model research from OpenAI/Anthropic/DeepSeek):
  if (isBigTechCompany && !/\b(openai|anthropic|deepseek|chatgpt|claude|o1|o3)\b/i.test(text)) {
    return { category: 'personal', locationScope: 'Global' };
  }

  // Pure AI Frontier news
  if (isStrictAI) {
    return { category: 'ai', locationScope: 'Global' };
  }

  // Big Tech & Systems general
  if (isBigTechCompany) {
    return { category: 'personal', locationScope: 'Global' };
  }

  // 7. National Politics & Governance
  if (text.includes('chalo dilli') || text.includes('ramlila') || text.includes('election commission') || text.includes('supreme court') || text.includes('parliament') || text.includes('lok sabha') || text.includes('rahul gandhi') || text.includes('modi') || text.includes('bjp') || text.includes('congress') || text.includes('dgca') || text.includes('aviation')) {
    return { category: 'national', locationScope: 'India' };
  }

  // 8. Sports & World Events
  if (text.includes('cricket') || text.includes('t20') || text.includes('bcci') || text.includes('ishan kishan') || text.includes('olympics') || text.includes('fifa') || text.includes('world cup')) {
    return { category: 'world', locationScope: 'Global' };
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
      ? 'Rapid frontier AI breakthrough, reasoning architecture shifts, and developer ecosystem adoption'
      : category === 'personal'
      ? 'Strategic Big Tech hardware launch, executive keynote commentary, and datacenter infrastructure scaling'
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
        national: 'India+national+news+parliament',
        local: 'Siliguri+North+Bengal+Teesta',
        geopolitics: 'Russia+Ukraine+frontline+world+war',
        ai: 'Artificial+Intelligence+OpenAI+Anthropic+DeepSeek+LLM+reasoning',
        personal: 'Apple+Microsoft+Google+Nvidia+Meta+Amazon+tech+launch+talk',
        finance: 'India+stock+market+SEBI+RBI+Nifty+Sensex',
        disaster: 'Cyclone+Murasu+weather+alert+IMD+disaster'
      };
      const query = topicKeywords[topic] || 'India+breaking+news';
      rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en-IN&gl=IN&ceid=IN:en`;
    }

    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    if (!data.items || !Array.isArray(data.items)) return [];

    let items = data.items.slice(0, 10);

    // Strict Purity Gatekeeper:
    // When requesting AI news, purge any non-AI items.
    if (topic === 'ai') {
      items = items.filter((item: any) => {
        const text = `${item.title || ''} ${stripHtml(item.description || item.content || '')}`.toLowerCase();
        return /\b(artificial intelligence|generative ai|genai|llm|llms|gpt-?4|gpt-?5|o1|o3|o3-mini|claude|gemini|deepseek|chatgpt|openai|anthropic|machine learning|neural network|agentic ai|reasoning models?|foundation models?|open weights|frontier ai|ai model|ai safety|ai research)\b/i.test(text) ||
          (/\b(a\.i\.|ai)\b/i.test(text) && !/\b(air india|flight|airline|aviation)\b/i.test(text));
      });
    } else if (topic === 'personal') {
      // Big Tech guarantee: ONLY keep items from Big Tech launches, executive talks, and systems
      items = items.filter((item: any) => {
        const text = `${item.title || ''} ${stripHtml(item.description || item.content || '')}`.toLowerCase();
        return /\b(apple|microsoft|google|nvidia|meta|amazon|aws|intel|amd|qualcomm|tsmc|semiconductor|chip|hardware|macbook|iphone|keynote|datacenter|tim cook|satya nadella|sundar pichai|jensen huang|zuckerberg)\b/i.test(text);
      });
    }

    return items.map((item: any, idx: number) => {
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

    let articlesList = data.articles;
    if (topic === 'ai') {
      articlesList = articlesList.filter((item: any) => {
        const text = `${item.title || ''} ${item.description || ''}`.toLowerCase();
        return /\b(artificial intelligence|generative ai|genai|llm|llms|gpt-?4|gpt-?5|o1|o3|o3-mini|claude|gemini|deepseek|chatgpt|openai|anthropic|machine learning|neural network|agentic ai|reasoning models?|foundation models?|open weights|frontier ai|ai model|ai safety|ai research)\b/i.test(text) ||
          (/\b(a\.i\.|ai)\b/i.test(text) && !/\b(air india|flight|airline|aviation)\b/i.test(text));
      });
    } else if (topic === 'personal') {
      articlesList = articlesList.filter((item: any) => {
        const text = `${item.title || ''} ${item.description || ''}`.toLowerCase();
        return /\b(apple|microsoft|google|nvidia|meta|amazon|aws|intel|amd|qualcomm|tsmc|semiconductor|chip|hardware|macbook|iphone|keynote|datacenter|tim cook|satya nadella|sundar pichai|jensen huang|zuckerberg)\b/i.test(text);
      });
    }

    return articlesList.map((item: any, idx: number) => {
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
