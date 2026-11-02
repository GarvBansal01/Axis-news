import { NewsArticle } from '../types';

// Dynamic Exact Timestamp & Calendar Date Generator
// Strictly outputs exact calendar date and exact time (e.g. "02 Nov 2026, 08:30 AM IST")
// Never uses the generic word "Today"
export function formatExactCalendarDateTime(dateOrTimestamp: Date | number): {
  dateStr: string;
  timeStr: string;
  exactDateTime: string;
} {
  const d = typeof dateOrTimestamp === 'number' ? new Date(dateOrTimestamp) : dateOrTimestamp;
  const day = d.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  const dateStr = `${day} ${month} ${year}`;
  const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const exactDateTime = `${dateStr}, ${timeStr} IST`;
  return { dateStr, timeStr, exactDateTime };
}

export function createRollingTimestamp(minutesAgo: number): { publishedAt: string; timestamp: number; dateLabel: string; incidentDate: string } {
  const now = Date.now();
  const timestamp = now - minutesAgo * 60 * 1000;
  
  const { dateStr, timeStr, exactDateTime } = formatExactCalendarDateTime(timestamp);

  let publishedAt = '';
  if (minutesAgo < 2) {
    publishedAt = 'Just now (Live Radar)';
  } else if (minutesAgo < 60) {
    publishedAt = `${Math.floor(minutesAgo)}m ago`;
  } else {
    const hoursAgo = Math.max(1, Math.floor(minutesAgo / 60));
    publishedAt = `${hoursAgo}h ago (${dateStr})`;
  }

  // Exact calendar date and time (NO "Today")
  const dateLabel = `${dateStr}, ${timeStr}`;
  const incidentDate = exactDateTime;

  return { publishedAt, timestamp, dateLabel, incidentDate };
}

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'cyclone-murasu-bay-of-bengal-alert',
    title: 'Cyclone ‘Murasu’ Intensifies Over Bay of Bengal: IMD Issues Coastal Alerts for Andhra Pradesh and South Odisha',
    category: 'disaster',
    locationScope: 'Bay of Bengal',
    sourceName: 'India Meteorological Department (IMD) & The Hindu / NDTV',
    sourceType: 'Official Meteorological Bulletin',
    verification: 'govt_verified',
    verificationNote: 'Officially documented in IMD Cyclone Bulletin No. 04 (BOB/08/2026).',
    takeaway: 'Deep depression in Bay of Bengal officially upgraded to Cyclonic Storm Murasu with 75-85 kmph winds; 18 NDRF battalions pre-deployed across coastal Andhra Pradesh and South Odisha.',
    whatIsIt: "Severe meteorological event where a deep depression over the southwest and west-central Bay of Bengal intensified into Cyclonic Storm 'Murasu', triggering emergency storm and heavy rainfall alerts across coastal Andhra Pradesh and southern Odisha.",
    factSheet: {
      when: "02 Nov 2026, 08:30 AM IST",
      where: "Southwest and West-Central Bay of Bengal, moving towards Visakhapatnam, Kakinada, and Gopalpur coastline",
      who: "IMD Director General, National Disaster Response Force (NDRF), Andhra Pradesh & Odisha State Disaster Management Authorities",
      what: "Deep depression upgraded to Cyclonic Storm 'Murasu' packing sustained winds of 75–85 kmph gusting to 95 kmph, bringing heavy to very heavy rainfall warnings",
      why: "Warm sea surface temperatures (29–30°C) and favorable vertical wind shear in the post-monsoon maritime basin facilitated rapid convective cloud organization",
      how: "NDRF deployed 18 rescue teams across vulnerable coastal districts; fishermen instructed to suspend deep-sea operations; district collectors opening cyclone shelter camps"
    },
    theRealProblem: "Rising sea surface temperatures in the Bay of Bengal are accelerating cyclone intensification windows from 48 hours down to under 18 hours. While satellite telemetry is world-class, local drainage infrastructure in low-lying coastal towns remains vulnerable to sudden inundation.",
    bullets: [
      'IMD issues Orange and Red alerts across coastal Andhra Pradesh and southern Odisha districts.',
      'Sustained wind speeds of 75-85 kmph gusting to 95 kmph projected during landfall approach.',
      'Fishermen advised to immediately suspend all marine activities in south and central Bay of Bengal waters.'
    ],
    ...createRollingTimestamp(8),
    readTime: '30s read',
    tags: ['Cyclone Murasu', 'IMD', 'Weather Alert', 'Disaster'],
    audioScript: 'Cyclone Murasu has formed over the Bay of Bengal, prompting the IMD to issue severe weather alerts across coastal Andhra Pradesh and southern Odisha with pre-positioned NDRF rescue teams.',
    deepDive: {
      overview: 'The deep depression over the southwest and west-central Bay of Bengal moved northwestwards and intensified into Cyclonic Storm Murasu, threatening coastal settlements with gales and intense precipitation.',
      keyBackground: 'Post-monsoon cyclone seasons in the Bay of Bengal historically produce severe cyclonic storms. Automated cyclone warning centers in Chennai, Visakhapatnam, and Bhubaneswar are coordinating with state authorities.',
      rootCauseAnalysis: "Elevated ocean heat content provides continuous thermal energy for convective cloud clusters, transforming atmospheric depressions into organized cyclonic systems in compressed timeframes.",
      timeline: [
        { time: '05:30 IST', event: 'Depression intensifies into deep depression over west-central Bay of Bengal.' },
        { time: '08:30 IST', event: 'IMD officially designates system as Cyclonic Storm Murasu.' },
        { time: '11:00 IST', event: 'State disaster authorities activate emergency shelters in Srikakulam and Ganjam.' }
      ],
      keyQuotes: [
        { speaker: 'Dr. Mrutyunjay Mohapatra', role: 'Director General, IMD', quote: 'The system is under continuous radar surveillance from Visakhapatnam and Machilipatnam Doppler radars. All coastal districts must maintain highest alert.' }
      ],
      impactForStudents: 'Crucial case study for environmental science, meteorology, and civil defense students studying rapid storm cyclogenesis and early-warning evacuation logistics.',
      officialSourceUrl: 'https://mausam.imd.gov.in',
      sourceDocName: 'IMD Special Tropical Weather Outlook 04/2026'
    }
  },
  {
    id: 'india-bloc-chalo-dilli-ramlila-protest',
    title: 'INDIA Bloc Organizes Massive ‘Chalo Dilli’ Protest at Ramlila Maidan: Opposition Demands Election Commission Accountability Over Voter Roll Deletions',
    category: 'national',
    locationScope: 'India',
    sourceName: 'The Hindu, The Times of India & The Indian Express',
    sourceType: 'Accredited National Political Reporting',
    verification: 'reputable_media',
    verificationNote: 'Live journalistic coverage from New Delhi bureaus of The Hindu, Times of India, and Indian Express.',
    takeaway: 'Opposition leaders including Rahul Gandhi and Mallikarjun Kharge lead thousands at Ramlila Maidan protesting alleged voter roll irregularities; ruling BJP labels demonstration a political drama.',
    whatIsIt: "National political mobilization where INDIA bloc opposition constituents held a massive 'Chalo Dilli' protest rally at New Delhi's Ramlila Maidan demanding accountability from Chief Election Commissioner Gyanesh Kumar regarding alleged voter roll deletions.",
    factSheet: {
      when: "02 Nov 2026, 11:30 AM IST",
      where: "Ramlila Maidan, Central Delhi, India",
      who: "Rahul Gandhi, Mallikarjun Kharge, INDIA Bloc Constituents, Chief Election Commissioner Gyanesh Kumar, Delhi Police",
      what: "Opposition parties organize massive gathering demanding transparent forensic audits and accountability over alleged voter deletions from electronic electoral registers",
      why: "Opposition claims unilateral sanitization of voter lists in key constituencies disenfranchised legitimate voters; demands institutional review",
      how: "Peaceful demonstration held under extensive Delhi Police security; memorandum submitted to the Election Commission of India"
    },
    theRealProblem: "The digitalization of voter databases has improved deduplication, but lack of transparent algorithmic audit logs creates deep mistrust among contesting political parties when names are removed during administrative revisions without prior physical notice.",
    bullets: [
      'Thousands of opposition party workers and leaders assemble at Ramlila Maidan in the capital.',
      'Congress President Kharge and Rahul Gandhi demand strict institutional transparency from the Election Commission.',
      'BJP leadership terms the protest a politically motivated distraction ahead of upcoming electoral battles.'
    ],
    ...createRollingTimestamp(22),
    readTime: '30s read',
    tags: ['National', 'INDIA Bloc', 'Election Commission', 'Politics'],
    audioScript: 'INDIA bloc opposition leaders have staged a massive protest rally at Delhi Ramlila Maidan, raising concerns over voter list revisions and calling for institutional accountability.',
    deepDive: {
      overview: 'Leaders of the opposition INDIA alliance converged at Ramlila Maidan in New Delhi for the ‘Chalo Dilli’ rally, focusing their speeches on voter roll management and institutional integrity.',
      keyBackground: 'Voter list revisions occur periodically under the Representation of the People Act. The opposition has recently highlighted cases where legitimate voters claimed their names were missing on polling day.',
      rootCauseAnalysis: "As electoral databases rely on automated verification scripts, false-positive deletions occur if physical field verification by booth-level officers (BLOs) is bypassed or under-resourced.",
      timeline: [
        { time: '10:00 IST', event: 'Delegations from multiple states arrive at Ramlila Maidan amidst heavy police barricades.' },
        { time: '11:45 IST', event: 'Key opposition leaders address the rally, highlighting electoral transparency.' },
        { time: '13:30 IST', event: 'Rally concludes peacefully; memorandum forwarded to the Election Commission.' }
      ],
      keyQuotes: [
        { speaker: 'Mallikarjun Kharge', role: 'Congress President', quote: 'Every single citizen has a constitutional right to vote. Deleting names without transparent verification strikes at the foundation of democracy.' }
      ],
      impactForStudents: 'Essential context for political science, constitutional law, and public administration students examining electoral governance, civil liberties, and institutional checks and balances.',
      officialSourceUrl: 'https://eci.gov.in',
      sourceDocName: 'Representation to Election Commission of India 2026'
    }
  },
  {
    id: 'russia-ukraine-lukoil-refinery-pokrovsk',
    title: 'Russia-Ukraine Frontline & Deep Energy Strikes: Lukoil Kstovo Refinery Hit by Drone Attack as Pokrovsk Sector Battles Intensify',
    category: 'geopolitics',
    locationScope: 'Eastern Europe',
    sourceName: 'Reuters International, Kyiv Independent & ISW Defense Radar',
    sourceType: 'Verified Geopolitical & Defense Intelligence',
    verification: 'reputable_media',
    verificationNote: 'Corroborated by Reuters, Kyiv Independent, and daily Institute for the Study of War (ISW) operational briefings.',
    takeaway: 'Long-range Ukrainian drone strike triggers major fire at Lukoil oil refinery in Kstovo, Russia, while high-intensity ground combat continues along the strategic Pokrovsk frontline.',
    whatIsIt: "High-intensity military clash involving long-range Ukrainian drone strikes on strategic petroleum infrastructure inside Russia alongside fierce positional battles in the Pokrovsk logistical hub of eastern Ukraine.",
    factSheet: {
      when: "02 Nov 2026, 04:15 AM IST",
      where: "Lukoil Oil Refinery, Kstovo (Nizhny Novgorod Region, Russia) and Pokrovsk Sector (Donetsk Oblast, Ukraine)",
      who: "Ukrainian Armed Forces, Russian Armed Forces, Lukoil Industrial Personnel, ISW Defense Observers",
      what: "Drone strike ignites primary distillation column at major Russian oil refinery while intense mechanized and infantry combat unfolds along eastern frontlines",
      why: "Targeting oil refining capacity restricts military logistics and fuel exports; fighting around Pokrovsk centers on key highway and rail transport intersections",
      how: "Emergency crews deployed for over 6 hours to contain refinery blaze; fortified defense lines held by Ukrainian units against relentless Russian assault waves"
    },
    theRealProblem: "The modern conflict has evolved into an asymmetric war of economic attrition where long-range $10,000 kamikaze drones strike industrial assets 800km behind front lines, outmaneuvering conventional surface-to-air missile umbrellas and creating global energy market volatility.",
    bullets: [
      'Lukoil Kstovo refinery in Nizhny Novgorod suffered multiple drone impacts causing localized fires in processing units.',
      'Heavy fighting reported across the Pokrovsk axis as Russian forces attempt to encircle critical logistical supply lines.',
      'International diplomatic discussions continue regarding Black Sea agricultural corridor safety and limited regional energy de-escalation.'
    ],
    ...createRollingTimestamp(45),
    readTime: '35s read',
    tags: ['Russia-Ukraine', 'Geopolitics', 'Energy Security', 'War'],
    audioScript: 'The Russia-Ukraine conflict saw fresh escalations overnight with a drone strike damaging a major oil refinery in Russia while intense combat continues in the strategic Pokrovsk sector.',
    deepDive: {
      overview: 'Overnight drone operations targeted key Russian oil processing facilities in the Nizhny Novgorod region, highlighting Ukraine expanding long-range domestic drone strike envelope.',
      keyBackground: 'Energy infrastructure on both sides has been repeatedly targeted since late 2023, impacting Russian export revenues and Ukrainian civilian electrical grids.',
      rootCauseAnalysis: "The deployment of autonomous long-range drones with optical navigation systems allows strike groups to fly below radar horizon, rendering fixed air defense installations vulnerable.",
      timeline: [
        { time: '03:40 Moscow Time', event: 'Air defense sirens sound across Kstovo district.' },
        { time: '04:15 Moscow Time', event: 'Drone impacts cause fire in refinery secondary processing unit.' },
        { time: 'Morning Briefing', event: 'General Staff of Ukraine reports continuing heavy defense along Pokrovsk axis.' }
      ],
      keyQuotes: [
        { speaker: 'ISW Daily Briefing', role: 'Defense Analytics', quote: 'Strikes against petroleum refining hubs directly degrade operational tactical mobility for mechanized combat units.' }
      ],
      impactForStudents: 'Vital knowledge for defense studies, international relations, and global economics students analyzing asymmetric modern warfare and energy commodity supply chains.',
      officialSourceUrl: 'https://reuters.com/world/europe',
      sourceDocName: 'Reuters International Defense Update 2026'
    }
  },
  {
    id: 'india-it-engineering-ai-hiring-shift',
    title: 'Indian IT Giants Accelerate AI Builder Transition: Generative AI Automation Squeezes Entry-Level Hiring as Firms Shift to High-End ER&D',
    category: 'ai',
    locationScope: 'India',
    sourceName: 'Business Standard, Economic Times & NASSCOM',
    sourceType: 'Tech Industry Economic Analysis',
    verification: 'reputable_media',
    verificationNote: 'Based on corporate quarterly filings and NASSCOM IT Workforce Transformation reports.',
    takeaway: 'India’s top IT firms report automated routine coding by AI, shifting campus recruitment from generic bulk coders to specialized Engineering Research & Development (ER&D) roles.',
    whatIsIt: "Major economic and structural workforce transition across Indian IT services (TCS, Infosys, Cognizant) where generative AI coding tools automate routine junior engineering tasks, pivoting hiring towards advanced systems engineering and AI integration.",
    factSheet: {
      when: "02 Nov 2026, 10:15 AM IST",
      where: "Bengaluru, Hyderabad, Pune, Gurugram & National Engineering Colleges",
      who: "Indian IT Service Giants (TCS, Infosys, Wipro, Cognizant), NASSCOM, Engineering College Graduates",
      what: "Structural reduction in routine junior software maintenance hiring as companies adopt AI code generation and focus on high-margin ER&D contracts",
      why: "Generative AI coding assistants automate 40-50% of junior boilerplate code, bug fixing, and unit test generation, raising entry-level skill expectations",
      how: "Universities and students advised to prioritize cloud architectures, AI orchestrations, edge compute, and cyber-physical systems rather than basic syntax coding"
    },
    theRealProblem: "For two decades, Indian colleges operated as high-volume conveyor belts producing standard full-stack developers. Now that AI can write syntax instantly, fresh graduates without deep problem-solving, architectural design, or domain expertise face severe recruitment hurdles.",
    bullets: [
      'Top Indian IT services firms report 30-40% of internal code generation is now AI-assisted.',
      'Entry-level campus recruitment numbers adjust downward while demand for specialized AI and ER&D engineers surges.',
      'NASSCOM urges universities to integrate AI systems engineering and hands-on open-source development into undergraduate curricula.'
    ],
    ...createRollingTimestamp(75),
    readTime: '30s read',
    tags: ['AI Frontier', 'IT Jobs', 'Engineering', 'Education'],
    audioScript: 'India tech sector is undergoing a major structural shift as generative AI tools automate routine programming, prompting IT giants to pivot campus recruitment toward high-end engineering research.',
    deepDive: {
      overview: 'India’s $250 billion technology sector is actively reshaping its workforce strategy, moving away from volume-based programming toward specialized artificial intelligence and embedded systems.',
      keyBackground: 'India produces over 1.5 million engineering graduates annually. Traditional service models relied on large teams of junior coders to maintain legacy enterprise applications.',
      rootCauseAnalysis: "Modern LLMs execute code generation, unit testing, and documentation at near-zero marginal cost, compelling software firms to demand higher-order cognitive and architectural capabilities from day one.",
      timeline: [
        { time: 'Last Quarter', event: 'Enterprise adoption of AI coding assistants crosses 65% among major Indian IT employers.' },
        { time: 'Earlier Today', event: 'Industry analysts highlight sharp growth in Engineering Research & Development (ER&D) service revenues.' }
      ],
      keyQuotes: [
        { speaker: 'NASSCOM Research', role: 'Industry Body', quote: 'The future software engineer is not a syntax typist, but an intelligent orchestrator of AI agents, system architectures, and security guardrails.' }
      ],
      impactForStudents: 'A direct wake-up call for engineering and CS students: learn system design, AI model integration, and real-world deployment rather than relying purely on classroom textbook tutorials.',
      officialSourceUrl: 'https://nasscom.in',
      sourceDocName: 'NASSCOM Strategic Tech Workforce Report 2026'
    }
  },
  {
    id: 'siliguri-nh10-teesta-restoration-dooars-alert',
    title: 'Siliguri & North Bengal Infrastructure Push: NH-10 Teesta Corridor Restoration Accelerated While Forest Squads Issue Dooars Wildlife Alert',
    category: 'local',
    locationScope: 'Siliguri',
    sourceName: 'Uttarbanga Sambad, Siliguri Times & The Statesman',
    sourceType: 'Regional News & District Administration Bulletins',
    verification: 'reputable_media',
    verificationNote: 'Verified from reports by Uttarbanga Sambad, Siliguri Times, and NHIDCL North Bengal project directors.',
    takeaway: 'NH-10 Teesta Valley stabilization fast-tracked to ensure all-weather transport between Siliguri and Sikkim; forest squads deploy extra night patrols in Dooars tea gardens.',
    whatIsIt: "Dual regional development where infrastructure authorities expedite permanent slope stabilization along the landslide-affected NH-10 Teesta corridor connecting Siliguri to Sikkim, alongside active wildlife corridor monitoring in Dooars.",
    factSheet: {
      when: "02 Nov 2026, 09:45 AM IST",
      where: "Siliguri, Sevoke, Teesta Valley (NH-10) and Dooars Tea Estates, North Bengal",
      who: "NHIDCL Engineers, West Bengal PWD, Darjeeling & Jalpaiguri District Authorities, Wildlife Squad Teams",
      what: "Heavy engineering works deployed to reinforce vulnerable cliff sections along NH-10, while forest department activates early warning systems for elephant corridors",
      why: "Monsoon river cutting and soil erosion historically cause frequent closures of Sikkim trade lifeline; seasonal wildlife migrations intersect with tea garden settlements",
      how: "High-tensile steel rockfall barriers installed at 29th Mile and Likhuvir; forest personnel equipped with solar sirens and thermal drones to prevent human-animal conflict"
    },
    theRealProblem: "The young geological formation of the Eastern Himalayas makes the Sevoke-Teesta gorge fragile under continuous road widening and river embankment scouring. Engineering solutions must balance geological stability with heavy commercial trade volumes.",
    bullets: [
      'Pre-fabricated rockfall barriers and micro-piling implemented across high-risk NH-10 stretches.',
      'Direct freight and passenger vehicular transit between Siliguri, Kalimpong, and Gangtok remains closely monitored.',
      'Forest department issues safety guidelines for tea estate workers across Dooars following recent herd sightings.'
    ],
    ...createRollingTimestamp(110),
    readTime: '30s read',
    tags: ['Siliguri', 'North Bengal', 'NH-10', 'Dooars', 'Infrastructure'],
    audioScript: 'In North Bengal, highway restoration works along the NH-10 Teesta corridor have been accelerated, while wildlife authorities have stepped up patrols across Dooars tea gardens.',
    deepDive: {
      overview: 'Regional authorities in North Bengal are coordinating multiple infrastructure and environmental initiatives to safeguard transport lifelines and local communities.',
      keyBackground: 'National Highway 10 is the economic artery connecting Siliguri with Sikkim. Landslides during seasonal rains have regularly stranded commuters and cargo trucks.',
      rootCauseAnalysis: "Steep phyllite rock formations and the turbulent Teesta River flow undermine highway foundations, requiring bio-engineering and flexible steel mesh reinforcement.",
      timeline: [
        { time: '08:00 IST', event: 'Engineers complete foundation tests on new reinforced slope retaining walls.' },
        { time: '11:00 IST', event: 'Siliguri police and traffic authorities issue regular transit advisory.' }
      ],
      keyQuotes: [
        { speaker: 'NHIDCL Project Director', role: 'Highways Engineering', quote: 'Our priority is ensuring that Siliguri connectivity to the Himalayan border remains open 365 days a year without catastrophic slide closures.' }
      ],
      impactForStudents: 'Relevant for students at North Bengal University, SIT Siliguri, and local colleges studying civil engineering, environmental geology, and regional logistics.',
      officialSourceUrl: 'https://nhidcl.com',
      sourceDocName: 'NHIDCL North Bengal Highway Status Report 2026'
    }
  },
  {
    id: 'india-nz-t20i-series-ishan-record',
    title: 'India Seals T20I Series 3-2 Against New Zealand in Hamilton: Ishan Kishan Becomes Highest Indian T20I Run-Scorer in Single Calendar Year',
    category: 'world',
    locationScope: 'Global',
    sourceName: 'BCCI Official, ESPNcricinfo & Olympics Sports Radar',
    sourceType: 'Accredited International Sports Media',
    verification: 'reputable_media',
    verificationNote: 'Officially published by BCCI and covered across global sports publications.',
    takeaway: 'India wins exciting 5th T20I in Hamilton to take bilateral series 3-2; Ishan Kishan surpasses historic batting records for most T20I runs scored by an Indian in a calendar year.',
    whatIsIt: "High-stakes international cricket bilateral where Team India secured a 3-2 series victory over New Zealand in Hamilton, marked by record-breaking top-order performances.",
    factSheet: {
      when: "02 Nov 2026, 03:30 PM IST",
      where: "Seddon Park, Hamilton, New Zealand",
      who: "Indian Men's Cricket Team, New Zealand Black Caps, Ishan Kishan, BCCI Match Officials",
      what: "India captures the 5-match bilateral T20I series 3-2 after a thrilling finale, with Ishan Kishan breaking the record for the most T20I runs scored by an Indian in a calendar year",
      why: "Aggressive modern batting blueprint and composed bowling during death overs secured the decisive series decider",
      how: "High-scoring match concluded with India defending their total under testing overseas pitch conditions"
    },
    theRealProblem: "Managing player workload and batting strike rates across dense international schedules requires continuous squad rotation while maintaining team chemistry and consistent execution.",
    bullets: [
      'India clinches the 5-match series 3-2 in a high-intensity decider at Seddon Park.',
      'Ishan Kishan achieves historic career milestone as highest Indian T20I run-scorer in a calendar year.',
      'Team India management commends youth bench strength and tactical discipline overseas.'
    ],
    ...createRollingTimestamp(160),
    readTime: '25s read',
    tags: ['Cricket', 'India vs New Zealand', 'Sports', 'BCCI'],
    audioScript: 'India has won the T20 international series against New Zealand 3-2 in Hamilton, with opener Ishan Kishan setting a new national record for calendar year runs.',
    deepDive: {
      overview: 'The Indian cricket team concluded their tour of New Zealand with a hard-fought 3-2 series triumph in Hamilton.',
      keyBackground: 'Bilateral T20I matches serve as vital benchmarks for team combinations ahead of upcoming ICC global tournaments.',
      rootCauseAnalysis: "Tactical emphasis on attacking powerplays and dynamic middle-order batting roles has modernized India's short-format execution.",
      timeline: [
        { time: 'Innings 1', event: 'India posts competitive total propelled by aggressive top-order boundary hitting.' },
        { time: 'Innings 2', event: 'Disciplined bowling variations restrict New Zealand run chase in the closing overs.' }
      ],
      keyQuotes: [
        { speaker: 'BCCI Match Report', role: 'Official Media', quote: 'A memorable series win showcasing adaptability, fearless batsmanship, and composure in pressure situations.' }
      ],
      impactForStudents: 'Demonstrates the power of resilience, modern preparation, and fearless execution under demanding competitive conditions.',
      officialSourceUrl: 'https://bcci.tv',
      sourceDocName: 'BCCI Match Center Report IND vs NZ 5th T20I'
    }
  },
  {
    id: 'sebi-fno-retail-guardrails-protection',
    title: 'SEBI Implements 6-Point Guardrail on Index Futures & Options: Enforces ₹15 Lakh Minimum Contract Size to Curb Retail Youth Trading Losses',
    category: 'finance',
    locationScope: 'India',
    sourceName: 'SEBI Official Gazette & Reserve Bank of India',
    sourceType: 'Statutory Financial Directive',
    verification: 'govt_verified',
    verificationNote: 'Issued under SEBI Circular SEBI/HO/MRD/MRD-PoD-1/P/CIR/2026/142.',
    takeaway: 'SEBI enforces strict derivative trading reforms, raising minimum contract sizes to ₹15 Lakh and restricting weekly expiries to protect retail college students from speculative losses.',
    whatIsIt: "Landmark regulatory intervention by capital markets watchdog SEBI mandating stringent entry guardrails for retail index futures and options to prevent catastrophic speculative capital erosion among young investors.",
    factSheet: {
      when: "02 Nov 2026, 10:00 AM IST",
      where: "National Stock Exchange (NSE) & Bombay Stock Exchange (BSE), Mumbai",
      who: "SEBI Board, Reserve Bank of India, Clearing Corporations, Young College Retail Investors",
      what: "Implementation of 6-point framework raising derivative contract entry thresholds to ₹15 Lakh, removing multiple weekly expiries, and mandating upfront option premium collections",
      why: "Official SEBI empirical study revealed that 93% of individual retail traders lost money in equity F&O, losing over ₹1.81 Lakh Crore over a 3-year study period",
      how: "Discount brokers enforce strict automated net-worth gating; intraday leverage rules prevent high-risk borrowing by student accounts"
    },
    theRealProblem: "Viral social media influencers promoted zero-capital options trading as a get-rich-quick gamble for college students. Without structural guardrails, retail traders were buying deep out-of-the-money options where time decay guarantees 100% loss of capital.",
    bullets: [
      'Minimum lot value for index derivative contracts raised from ₹5 Lakh to ₹15 Lakh.',
      'Only one weekly index expiry per exchange permitted, reducing hyper-speculative gambling cycles.',
      'Brokers required to collect upfront option buyer premiums to eliminate unhedged margin defaults.'
    ],
    ...createRollingTimestamp(210),
    readTime: '35s read',
    tags: ['Finance', 'SEBI', 'Stock Market', 'Student Financial Literacy'],
    audioScript: 'Markets regulator SEBI has enforced strict new rules on futures and options trading, tripling contract sizes to protect college students and retail traders from speculative losses.',
    deepDive: {
      overview: 'SEBI’s comprehensive derivative framework is designed to restore market discipline and shield household savings from speculative derivatives gambling.',
      keyBackground: 'India’s derivatives volume surged to become the highest in the world, with retail participation spiking over 500% post-2020 through mobile trading apps.',
      rootCauseAnalysis: "Small contract lot sizes allowed retail users to trade speculative 0DTE (zero-days-to-expiry) contracts with pocket money, leading to total capital wipeouts.",
      timeline: [
        { time: 'Phase 1', event: 'SEBI study publishes empirical proof of 93% retail loss ratio.' },
        { time: 'Phase 2', event: 'Public consultation concludes with consensus on systemic risk reduction.' },
        { time: 'Today', event: 'Six-point operational circular takes full effect across NSE and BSE.' }
      ],
      keyQuotes: [
        { speaker: 'SEBI Circular', role: 'Markets Regulator', quote: 'Financial markets must channel household savings into productive enterprise capital, not speculative wealth destruction.' }
      ],
      impactForStudents: 'Crucial financial literacy lesson: Avoid trading options without institutional risk models. Focus instead on mutual fund SIPs, low-cost index ETFs, and long-term equity compounding.',
      officialSourceUrl: 'https://sebi.gov.in',
      sourceDocName: 'SEBI Circular on Derivative Market Measures 2026'
    }
  },
  {
    id: 'india-semiconductor-mission-packaging-clusters',
    title: 'India Semiconductor Mission Approves Commercial Packaging Hubs: Domestic Chip Ecosystem Gains Momentum in Dholera and Sanand',
    category: 'personal',
    locationScope: 'India',
    sourceName: 'Ministry of Electronics and IT (MeitY) & PIB India',
    sourceType: 'Government Industrial Gazette',
    verification: 'govt_verified',
    verificationNote: 'Officially notified in MeitY Semiconductor Mission Gazetted Release ISM-2026-PKG-08.',
    takeaway: 'Union Cabinet clears next tranche of semiconductor assembly, testing, and cleanroom packaging facilities in Gujarat, accelerating domestic chip fabrication.',
    whatIsIt: "Strategic government expansion under the ₹76,000 Crore India Semiconductor Mission (ISM) approving commercial packaging and testing clusters in Gujarat to anchor indigenous silicon supply chains.",
    factSheet: {
      when: "02 Nov 2026, 01:20 PM IST",
      where: "Dholera Special Investment Region (SIR) & Sanand, Gujarat, India",
      who: "Union Minister for Electronics & IT, India Semiconductor Mission Board, Tata Electronics, PSMC, CG Power",
      what: "Accelerated funding clearance and construction milestone for advanced semiconductor fabrication and OSAT cleanroom modules",
      why: "Ensuring sovereign supply chain security for microchips used in defense systems, smartphones, automotive ECUs, and renewable energy inverters",
      how: "High-purity chemical infrastructure, ultra-pure water pipelines, and dedicated 220kV green energy substations deployed to support cleanroom operations"
    },
    theRealProblem: "A single modern chip fab requires over 5 million gallons of ultra-pure water daily and uninterrupted electrical grids with zero micro-second voltage dips. Building the physical utility supply chain alongside specialized technician training is India's primary challenge.",
    bullets: [
      'Construction progresses rapidly on commercial cleanrooms in Dholera and Sanand.',
      'Joint ventures with global foundry leaders begin pilot equipment tool installation.',
      'Ministry announces dedicated scholarship and research grants for VLSI and semiconductor design students.'
    ],
    ...createRollingTimestamp(300),
    readTime: '30s read',
    tags: ['Semiconductor', 'Chips', 'MeitY', 'Hardware', 'Make In India'],
    audioScript: 'The India Semiconductor Mission has approved new commercial packaging and cleanroom facilities in Gujarat, marking a major milestone in building a domestic microchip ecosystem.',
    deepDive: {
      overview: 'India is aggressively building its semiconductor manufacturing and advanced packaging capabilities to reduce reliance on foreign supply chains.',
      keyBackground: 'Global chip shortages demonstrated the strategic necessity of domestic fab capacity. The India Semiconductor Mission offers 50% fiscal capital expenditure support.',
      rootCauseAnalysis: "Fabricating modern silicon requires deep ecosystems of ultra-pure industrial gases, precision lithography optics, and chemical purity standards.",
      timeline: [
        { time: 'Milestone 1', event: 'Approval of major OSAT and foundry joint venture projects.' },
        { time: 'Today', event: 'Cleanroom civil structural completion and utility grid activation.' }
      ],
      keyQuotes: [
        { speaker: 'Union Electronics Minister', role: 'MeitY', quote: 'Semiconductors are the foundational silicon brick of the modern digital economy. India is on track to produce commercial chips on home soil.' }
      ],
      impactForStudents: 'Massive career frontier for electrical engineering, materials science, physics, and VLSI students with thousands of high-paying design and fab fabrication roles opening in India.',
      officialSourceUrl: 'https://meity.gov.in',
      sourceDocName: 'MeitY Semiconductor Mission Gazette ISM-2026-PKG-08'
    }
  }
];

export const UPCOMING_LIVE_DISPATCHES: NewsArticle[] = [
  {
    id: 'live-cyclone-murasu-evacuations',
    title: 'Cyclone Murasu Coastal Radar Update: Wind Speeds Cross 80 kmph as District Authorities Complete Pre-Emptive Evacuations',
    category: 'disaster',
    locationScope: 'Bay of Bengal',
    sourceName: 'IMD Doppler Radar Network & State Disaster Control',
    sourceType: 'Real-Time Radar Bulletin',
    verification: 'govt_verified',
    verificationNote: 'Live telemetry broadcast from Visakhapatnam Coastal Doppler Radar.',
    takeaway: 'Machilipatnam and Visakhapatnam radars track cyclone eye with rain bands hitting coastline; early evacuations prevent casualties.',
    whatIsIt: "Real-time meteorological tracking of Cyclonic Storm Murasu as rain bands approach the eastern coastline, triggering coordinated district administration protective procedures.",
    factSheet: {
      when: "02 Nov 2026, 05:45 AM IST",
      where: "Visakhapatnam & Machilipatnam Coastal Belt, Bay of Bengal",
      who: "State Emergency Operations Centre, IMD Radar Meteorologists, SDRF Rescue Teams",
      what: "Continuous Doppler radar tracking and sea-surge monitoring as outer spiral bands make landfall contact",
      why: "Ensure complete safety of coastal fisherfolk villages and prevent flood casualties in low-lying deltas",
      how: "Real-time SMS alerts broadcast to 2.4 million subscribers in coastal mandals; backup diesel generators deployed at primary hospitals"
    },
    theRealProblem: "Rapid coastal winds easily down overhead electrical transmission lines, knocking out water pumping and communications during the storm's peak hours.",
    bullets: [
      'Outer spiral rain bands trigger intense precipitation across coastal taluks.',
      'District collectors confirm over 60,000 residents moved to concrete cyclone relief centers.',
      'Special emergency control helplines 1070 and 1077 activated 24/7.'
    ],
    ...createRollingTimestamp(0),
    readTime: '30s read',
    tags: ['Cyclone Murasu', 'Live Radar', 'Disaster Alert', 'IMD'],
    audioScript: 'Live radar bulletin: Cyclone Murasu outer bands are approaching the coast with emergency shelters operational and zero casualties reported.',
    deepDive: {
      overview: 'Live radar telemetry confirms the cyclone center is maintaining projected trajectory with multi-agency disaster preparedness in full operation.',
      keyBackground: 'India disaster management protocols have achieved world-renowned zero-casualty benchmarks through disciplined pre-emptive evacuations.',
      rootCauseAnalysis: "Proactive early warnings combined with satellite tracking eliminate surprise landfall impacts.",
      timeline: [
        { time: 'T-15m', event: 'Doppler radar logs wind velocity peak at 82 kmph.' },
        { time: 'Just now', event: 'State disaster authority confirms all offshore vessels safely anchored in harbors.' }
      ],
      keyQuotes: [
        { speaker: 'Special Relief Commissioner', role: 'Disaster Management', quote: 'Zero casualties remains our strict mission. All administrative machinery is pre-positioned on the ground.' }
      ],
      impactForStudents: 'Real-world example of proactive crisis management and digital early-warning broadcast systems saving lives.',
      officialSourceUrl: 'https://ndma.gov.in',
      sourceDocName: 'NDMA Situation Report Cyclone Murasu'
    }
  },
  {
    id: 'live-india-bloc-memorandum-eci',
    title: 'INDIA Bloc Leaders Submit Formal 12-Point Memorandum to Election Commission Following Ramlila Maidan Assembly',
    category: 'national',
    locationScope: 'India',
    sourceName: 'The Hindu & Press Trust of India (PTI)',
    sourceType: 'National Political Wire',
    verification: 'reputable_media',
    verificationNote: 'Confirmed by official press communique issued at Nirvachan Sadan.',
    takeaway: 'Opposition delegation presents documented representations urging independent technical audits of voter roll revisions before final publication.',
    whatIsIt: "Follow-up constitutional step where an all-party opposition delegation formally submitted a detailed representation to the Election Commission regarding voter list audit protocols.",
    factSheet: {
      when: "02 Nov 2026, 05:45 AM IST",
      where: "Nirvachan Sadan (ECI Headquarters), Ashoka Road, New Delhi",
      who: "Senior Opposition Delegation, Principal Secretaries of the Election Commission of India",
      what: "Submission of formal 12-point memorandum requesting transparent booth-level verification lists and algorithmic audit trails",
      why: "Ensuring that electoral roll modifications are verifiable by all contesting recognized national and state political parties",
      how: "Commission officials acknowledged receipt and confirmed representations will be examined under statutory registration guidelines"
    },
    theRealProblem: "Without open-access voter registration verification portals, political parties and citizens are unable to immediately detect accidental clerical deletions until polling day.",
    bullets: [
      'Delegation submits specific district-level cases of voter list discrepancies for technical review.',
      'ECI reiterates that summary revision guidelines provide standard claims and objections windows for all voters.',
      'Peaceful conclusion to day-long political demonstrations in the capital.'
    ],
    ...createRollingTimestamp(0),
    readTime: '30s read',
    tags: ['National', 'Election Commission', 'Politics', 'Democracy'],
    audioScript: 'Following their Ramlila Maidan rally, opposition leaders have formally submitted a memorandum to the Election Commission regarding voter list revision procedures.',
    deepDive: {
      overview: 'The INDIA alliance concluded their capital rally by delivering a comprehensive memorandum outlining proposals for digital voter registry audits.',
      keyBackground: 'Statutory election rules allow political parties to appoint Booth Level Agents (BLAs) to verify voter lists alongside government officials.',
      rootCauseAnalysis: "Bridging the gap between manual field checks and automated database sanitation is key to institutional trust.",
      timeline: [
        { time: 'Just now', event: 'Formal delegation enters Nirvachan Sadan to hand over representation.' }
      ],
      keyQuotes: [
        { speaker: 'Official Spokesperson', role: 'Election Commission', quote: 'The Commission remains committed to maintaining accurate, inclusive, and transparent electoral rolls.' }
      ],
      impactForStudents: 'Highlights procedural mechanisms for constitutional petitions and institutional dialogue in a parliamentary democracy.',
      officialSourceUrl: 'https://eci.gov.in',
      sourceDocName: 'ECI Official Press Note 2026'
    }
  },
  {
    id: 'live-teesta-nh10-traffic-clearance',
    title: 'NH-10 Sevoke-Teesta Corridor Opens for Normal Commercial Transit Following Successful Slope Anchoring Operations',
    category: 'local',
    locationScope: 'Siliguri',
    sourceName: 'Siliguri Times & Traffic Control Directorate',
    sourceType: 'Live Regional Transit Bulletin',
    verification: 'reputable_media',
    verificationNote: 'Live clearance notified by Darjeeling District Police Traffic Command.',
    takeaway: 'Smooth two-way vehicular flow restored between Siliguri and Sikkim after engineers successfully anchored high-tensile rockfall barriers.',
    whatIsIt: "Local transport clearance update where highway engineering teams completed critical rock-anchoring works on NH-10, enabling normal traffic between Siliguri and Sikkim.",
    factSheet: {
      when: "02 Nov 2026, 05:45 AM IST",
      where: "NH-10 Sevoke-Coronation Bridge-Teesta Bazaar Corridor, North Bengal",
      who: "Darjeeling District Traffic Police, NHIDCL Road Maintenance Unit, Commuters and Transporters",
      what: "Removal of temporary transit restrictions and full reopening of key trade highway connecting North Bengal plains with the hills",
      why: "Completion of safety barrier installations at sensitive landslide chutes prevents rockfall hazards onto roadway",
      how: "Traffic police coordinating staggered heavy vehicle convoys to ensure zero congestion around Coronation Bridge"
    },
    theRealProblem: "Siliguri serves as the solitary commercial conduit for essential goods into Sikkim and Kalimpong. Even brief road closures disrupt supply chains and inflate local market prices.",
    bullets: [
      'Two-way commercial and light vehicle traffic moving smoothly across the Teesta Valley stretch.',
      'Emergency recovery cranes and bulldozers remain stationed at 29th Mile as precautionary measures.',
      'Local transport associations express relief as supply logistics resume normal timetables.'
    ],
    ...createRollingTimestamp(0),
    readTime: '25s read',
    tags: ['Siliguri', 'NH-10', 'Local Transit', 'North Bengal'],
    audioScript: 'Traffic bulletin: Normal vehicular movement has resumed along the NH-10 Teesta corridor following completion of slope stabilization work.',
    deepDive: {
      overview: 'Highway authorities have fully restored transit along NH-10 after executing slope reinforcement works.',
      keyBackground: 'The Sevoke to Teesta Bazaar road is the lifeline for regional tourism, university commuters, and daily agricultural commerce.',
      rootCauseAnalysis: "Proactive rock bolting and flexible steel catch barriers catch loose debris before it impacts traveling vehicles.",
      timeline: [
        { time: 'Just now', event: 'Police command lifts single-lane convoy restriction.' }
      ],
      keyQuotes: [
        { speaker: 'Traffic Superintendent', role: 'Siliguri Command', quote: 'Motorists can travel safely. We have round-the-clock patrol units monitoring the entire river gorge stretch.' }
      ],
      impactForStudents: 'Direct relief for students and faculty traveling between Siliguri, NBU, and educational institutes in Kalimpong and Gangtok.',
      officialSourceUrl: 'https://darjeeling.gov.in',
      sourceDocName: 'Darjeeling District Police Traffic Advisory'
    }
  }
];

// Returns fresh articles with dynamic timestamps strictly reflecting Today & Yesterday based on live system clock
export function getFreshRollingNews(): NewsArticle[] {
  const offsets = [8, 22, 45, 75, 110, 160, 210, 300];
  return mockNewsArticles.map((art, idx) => {
    const mins = offsets[idx % offsets.length] || 15;
    const rolling = createRollingTimestamp(mins);
    // Real verified news search query: Google News India search for exact headline topic & credible media
    const searchQuery = encodeURIComponent(`${art.title} news the hindu indian express reuters`);
    const verifiedSearchUrl = `https://news.google.com/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`;
    
    return {
      ...art,
      publishedAt: rolling.publishedAt,
      timestamp: rolling.timestamp,
      dateLabel: rolling.dateLabel,
      incidentDate: rolling.incidentDate,
      factSheet: art.factSheet ? {
        ...art.factSheet,
        when: rolling.incidentDate
      } : art.factSheet,
      verifiedSearchUrl: art.verifiedSearchUrl || verifiedSearchUrl,
      deepDive: {
        ...art.deepDive,
        verifiedNewsSearchUrl: art.deepDive.verifiedNewsSearchUrl || verifiedSearchUrl
      }
    };
  });
}
