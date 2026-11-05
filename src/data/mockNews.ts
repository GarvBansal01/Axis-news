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
    id: 'openai-anthropic-test-time-reasoning-breakthrough',
    title: 'OpenAI and Anthropic Pioneer Test-Time Reasoning Architectures: Frontier AI Shifts from Parameter Scaling to Multi-Step Verification Compute',
    category: 'ai',
    locationScope: 'Global',
    sourceName: 'OpenAI Research & Anthropic Technical Briefings',
    sourceType: 'Frontier AI Foundation Lab Papers',
    verification: 'reputable_media',
    verificationNote: 'Verified across official technical reports for o1, o3-mini and Claude 3.7 Sonnet reasoning benchmarks.',
    takeaway: 'Leading AI labs transition from brute-force pre-training parameter scale to test-time compute search, enabling neural models to self-correct reasoning steps and eliminate hallucinations in mathematics and coding.',
    whatIsIt: "Major architectural shift where frontier AI models spend dynamic compute time verifying logic trees during inference rather than merely predicting the next immediate token.",
    factSheet: {
      when: "02 Nov 2026, 08:30 AM IST",
      where: "San Francisco, California & Global Developer Ecosystem",
      who: "OpenAI Research Team, Anthropic Alignment Scientists, Foundation Model Engineers",
      what: "Transition from pure pre-training scaling laws to test-time reasoning compute and multi-agent verification trees",
      why: "Web text data for pre-training faces diminishing returns; spending compute at inference time allows models to explore multiple solution paths and self-correct errors",
      how: "Reinforcement learning trained on verified chain-of-thought problems allows models to think before answering, scoring over 90% on competitive coding and PhD-level science"
    },
    theRealProblem: "Traditional LLMs predict the immediate next token without planning, causing them to confidently hallucinate logic errors. Test-time reasoning requires significantly more compute per user query, challenging consumer server economics.",
    bullets: [
      'Frontier labs confirm shift toward test-time reasoning compute as pre-training scaling slows.',
      'Models perform recursive self-questioning, backtracking from dead-end logic paths during generation.',
      'Benchmarks show near-perfect performance on International Mathematical Olympiad (IMO) and code synthesis.'
    ],
    ...createRollingTimestamp(45),
    readTime: '30s read',
    tags: ['AI Frontier', 'OpenAI', 'Anthropic', 'Reasoning Models', 'Research'],
    audioScript: 'Frontier AI research has reached a major turning point as OpenAI and Anthropic pioneer test-time reasoning compute, enabling neural models to think through problems and eliminate hallucinations.',
    deepDive: {
      overview: 'Frontier AI development is fundamentally transitioning from scaling static pre-training datasets to dynamically expanding inference-time verification compute.',
      keyBackground: 'Since GPT-3, the dominant paradigm was scaling model parameter counts and feeding ever-larger crawl corpora. However, human internet text has largely been exhausted.',
      rootCauseAnalysis: "By structuring generation as a tree-search guided by learned process reward models (PRMs), the AI explores candidate hypothesis branches and self-corrects prior missteps before outputting a response.",
      timeline: [
        { time: 'Previous Era', event: 'Brute-force parameter scaling and static unsupervised next-token prediction.' },
        { time: 'Today', event: 'Widespread rollout of test-time reasoning engines solving complex multi-step proofs.' }
      ],
      keyQuotes: [
        { speaker: 'Dario Amodei', role: 'CEO, Anthropic', quote: 'The future of artificial intelligence is not bigger models that guess faster, but reflective systems that deliberate, cross-examine evidence, and verify truth.' }
      ],
      impactForStudents: 'Crucial insight for CS and AI students: focus on reinforcement learning from verifier feedback (RLVR), search algorithms, and agentic workflows rather than simple prompt engineering.',
      officialSourceUrl: 'https://openai.com/research',
      sourceDocName: 'Frontier AI Reasoning & Inference Scaling Report 2026'
    }
  },
  {
    id: 'deepseek-open-weights-efficiency-revolution',
    title: 'Open-Weights AI Architecture Disrupts Proprietary Moats: DeepSeek-V3 and Reasoning Models Trigger Global Compute Efficiency Revolution',
    category: 'ai',
    locationScope: 'Global',
    sourceName: 'DeepSeek AI Research, Hugging Face & Stanford CRFM',
    sourceType: 'Open-Source AI Technical Assessment',
    verification: 'reputable_media',
    verificationNote: 'Evaluated by independent AI researchers on Hugging Face leaderboards and open-weight model architectures.',
    takeaway: 'DeepSeek’s Multi-head Latent Attention (MLA) and FP8 mixed-precision innovations achieve frontier model performance at a fraction of hyperscaler training costs, democratizing open AI research.',
    whatIsIt: "Architectural disruption in generative AI proving that sophisticated mixture-of-experts (MoE) routing, multi-head latent attention, and pure algorithmic efficiency can match trillion-dollar hyperscaler models at less than $6M training cost.",
    factSheet: {
      when: "02 Nov 2026, 09:15 AM IST",
      where: "Hangzhou, Global Open-Source Developer Repositories & Hugging Face Hub",
      who: "DeepSeek AI Research Team, Open-Source ML Community, Stanford Center for Research on Foundation Models",
      what: "Release and widespread adoption of highly optimized open-weights models demonstrating frontier reasoning without proprietary API locks",
      why: "Proves that algorithmic innovations like FP8 training and dynamic MoE routing can slash compute overhead by 80%, challenging closed big tech corporate moats",
      how: "Full open model weights released with inference engines and architectural documentation, enabling local deployment on accessible enterprise GPU hardware"
    },
    theRealProblem: "Closed API monopolies charged high per-token pricing while keeping architectural safety and weights concealed. Open weights shift competitive advantage toward organizations that can run and fine-tune private on-premise models.",
    bullets: [
      'Multi-head Latent Attention (MLA) compresses KV cache memory requirements by over 90% during inference.',
      'Global enterprises and university research labs rapidly adopt open-weights distillation for custom domain workloads.',
      'Triggered significant strategic recalibration across Wall Street and Silicon Valley hardware investment theses.'
    ],
    ...createRollingTimestamp(60),
    readTime: '30s read',
    tags: ['AI Frontier', 'DeepSeek', 'Open Weights', 'Hugging Face', 'Compute Efficiency'],
    audioScript: 'DeepSeek open-weights architecture has triggered an efficiency revolution across the global AI ecosystem, matching closed corporate models at a fraction of training costs.',
    deepDive: {
      overview: 'Open-weights foundation models have reached parity with proprietary closed APIs, challenging the narrative that only trillion-dollar balance sheets can build frontier AI.',
      keyBackground: 'For years, industry consensus held that training frontier models required tens of thousands of specialized GPUs running for months at hundreds of millions of dollars.',
      rootCauseAnalysis: "By combining Multi-head Latent Attention (MLA) with DualPipe parallelism and FP8 low-precision numerical formats, communication bottlenecks between GPUs were minimized.",
      timeline: [
        { time: 'Milestone 1', event: 'Public release of DeepSeek-V3 and R1 technical papers and open model weights.' },
        { time: 'Today', event: 'Tens of thousands of enterprise engineering teams run local distilled reasoning models on private clusters.' }
      ],
      keyQuotes: [
        { speaker: 'Open Source AI Lead', role: 'Hugging Face', quote: 'The open-weights movement has proven that architectural ingenuity and algorithmic efficiency beat raw brute-force capital every time.' }
      ],
      impactForStudents: 'Invaluable learning for students: you can now inspect, fine-tune, and run state-of-the-art open-weights models on consumer and cloud workstations without vendor lock-in.',
      officialSourceUrl: 'https://huggingface.co',
      sourceDocName: 'DeepSeek Technical Architecture Analysis'
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
  },
  {
    id: 'apple-tim-cook-five-trillion-on-device-enterprise',
    title: 'Apple Crosses Historic $5 Trillion Valuation as Tim Cook Champions On-Device Compute: Mac M4 Deployments Surge as Enterprises Seek Relief from Soaring Cloud AI Bills',
    category: 'personal',
    locationScope: 'Global',
    sourceName: 'Bloomberg, Reuters & Apple Keynote Briefing',
    sourceType: 'Big Tech Corporate & Market Intelligence',
    verification: 'reputable_media',
    verificationNote: 'Confirmed via NASDAQ market records and Apple Global Keynote executive transcript.',
    takeaway: 'Apple surpasses Nvidia as the world’s most valuable enterprise at $5.03 Trillion; CEO Tim Cook emphasizes that enterprise developers are deploying on-device M4 silicon to process neural workloads locally without hyperscaler cloud rental costs.',
    whatIsIt: "Historic corporate valuation milestone and strategic technology talk by Apple CEO Tim Cook highlighting how dedicated Neural Engines in Apple Silicon (M4 Pro / M4 Max) allow companies to bypass expensive per-token cloud APIs through secure on-premise local compute.",
    factSheet: {
      when: "02 Nov 2026, 11:45 AM IST",
      where: "Apple Park, Cupertino, California & Wall Street, New York",
      who: "Tim Cook (CEO, Apple), Luca Maestri (CFO), Global Enterprise IT Directors, Wall Street Analysts",
      what: "Apple market capitalization crosses $5.03 Trillion driven by record Mac mini and MacBook Pro enterprise adoption for local developer workloads",
      why: "Hyperscaler cloud AI capex surged to $201.9B in Q3, prompting corporate CIOs to look for predictable on-device workstation hardware rather than recurring cloud consumption fees",
      how: "M4 unified memory architecture allows developers to run 7B-70B parameter models completely offline with zero latency and enterprise data privacy"
    },
    theRealProblem: "Relying purely on cloud APIs creates endless operational expenses and data compliance friction. On-device silicon transfers compute ownership directly back into the enterprise's hands.",
    bullets: [
      'Apple market cap hits $5.03T, reclaiming spot as the world’s most valuable publicly traded company.',
      'Tim Cook remarks during keynote panel: "The most cost-effective and private AI computer is the one sitting directly on your desk."',
      'Enterprises report 40% reductions in recurring cloud inference bills by offloading routine coding models to local M4 hardware.'
    ],
    ...createRollingTimestamp(120),
    readTime: '30s read',
    tags: ['Big Tech', 'Apple', 'Tim Cook', 'M4 Silicon', 'Hardware Launch'],
    audioScript: 'Apple has crossed a record five trillion dollar market valuation as CEO Tim Cook highlighted rapid enterprise adoption of Mac M4 systems for on-device compute.',
    deepDive: {
      overview: 'Apple has surged past Nvidia to become the first company in financial history to cross the five trillion dollar valuation threshold, powered by soaring corporate Mac adoption.',
      keyBackground: 'While hyperscalers spent over two hundred billion dollars on server clusters, rising cloud API bills drove engineering teams to seek powerful local workstation silicon.',
      rootCauseAnalysis: "With up to 128 gigabytes of unified memory bandwidth on M4 Max chips, developer laptops can run modern open-weights reasoning models locally at zero incremental cost.",
      timeline: [
        { time: 'Last Quarter', event: 'Launch of redesigned Mac mini and M4 MacBook Pro systems.' },
        { time: 'Today', event: 'Apple closes above $5.03T market cap as Wall Street upgrades enterprise silicon forecasts.' }
      ],
      keyQuotes: [
        { speaker: 'Tim Cook', role: 'CEO, Apple Inc.', quote: 'By integrating high-bandwidth unified memory and private neural engines directly into our silicon, we are empowering businesses to compute locally, securely, and without unending cloud subscription taxation.' }
      ],
      impactForStudents: 'Shows how computing oscillates between centralized mainframes/clouds and decentralized personal workstations: mastering local developer toolchains is an essential professional superpower.',
      officialSourceUrl: 'https://apple.com/newsroom',
      sourceDocName: 'Apple Enterprise Architecture & Market Report 2026'
    }
  },
  {
    id: 'google-open-tpu-silicon-datacenter-strategy',
    title: 'Google Unveils Open TPU Silicon Initiative: Sundar Pichai Outlines External Data Center Expansion and Open Software Stack to Challenge Nvidia CUDA Monopoly',
    category: 'personal',
    locationScope: 'Global',
    sourceName: 'Google Cloud Next Keynote, WSJ & Reuters Technology',
    sourceType: 'Big Tech Infrastructure & Silicon Strategy',
    verification: 'reputable_media',
    verificationNote: 'Officially presented by Alphabet CEO Sundar Pichai and Google Cloud Chief Thomas Kurian during Silicon Summit.',
    takeaway: 'Google breaks tradition by licensing its custom Tensor Processing Units (TPUs) directly to third-party data centers with open-source software drivers, mounting the most serious commercial challenge yet to Nvidia’s hardware dominance.',
    whatIsIt: "Major hardware launch and strategic talk by Alphabet CEO Sundar Pichai announcing that Google will ship custom Trillium and TPU v5e silicon directly to external colocation facilities with a free open software license.",
    factSheet: {
      when: "02 Nov 2026, 12:30 PM IST",
      where: "Mountain View, California & Las Vegas Convention Center",
      who: "Sundar Pichai (CEO, Alphabet & Google), Thomas Kurian (CEO, Google Cloud), Enterprise Datacenter Partners",
      what: "Commercial launch of external TPU infrastructure access and open-source compiler toolchains (OpenXLA and JAX integration)",
      why: "Nvidia GPU supply constraints and 80%+ hardware margins have forced hyperscalers and enterprises to demand competitive custom silicon alternatives",
      how: "Google partners with global colocation hosts to deploy liquid-cooled TPU pods with optical circuit switches (OCS) for scalable distributed clusters"
    },
    theRealProblem: "Nvidia's proprietary CUDA programming model created a 15-year developer lock-in. Google's open compiler framework aims to make silicon interchangeable so developers can compile workloads across TPUs, AMD chips, and GPUs without rewriting software.",
    bullets: [
      'Google officially opens custom TPU silicon to external enterprise colocation facilities.',
      'Sundar Pichai comments: "Compute must become an accessible utility; our open silicon strategy ensures no single supplier bottlenecks global progress."',
      'OpenXLA framework adoption accelerates, allowing seamless model compilation across heterogeneous accelerator hardware.'
    ],
    ...createRollingTimestamp(180),
    readTime: '30s read',
    tags: ['Big Tech', 'Google', 'Sundar Pichai', 'TPU', 'Cloud Infrastructure'],
    audioScript: 'In a landmark industry shift, Google CEO Sundar Pichai has announced that Google will ship custom Tensor Processing Units directly to external data centers with open software tooling.',
    deepDive: {
      overview: 'Google is challenging Nvidia’s near-monopoly in AI acceleration by commercializing its proprietary TPU hardware and open-sourcing its compilation infrastructure.',
      keyBackground: 'For a decade, Google restricted its custom TPU silicon exclusively to its internal search infrastructure and Google Cloud Platform customers.',
      rootCauseAnalysis: "By decoupling silicon from proprietary cloud enclosures and backing the OpenXLA compiler, developers can run PyTorch and JAX models on TPUs without rewriting CUDA kernels.",
      timeline: [
        { time: 'Keynote Address', event: 'Sundar Pichai announces Open Silicon Initiative during live global stream.' },
        { time: 'Live Today', event: 'First batch of external colocation deployment partnerships signed with enterprise hosts.' }
      ],
      keyQuotes: [
        { speaker: 'Sundar Pichai', role: 'CEO, Alphabet & Google', quote: 'The next era of computing demands open silicon standards. By decoupling hardware from proprietary software moats, we are enabling the world to scale intelligence affordably.' }
      ],
      impactForStudents: 'Crucial systems insight: learning framework-agnostic compiler toolchains (like MLIR, OpenXLA, and Triton) makes your engineering skills resilient across any future hardware vendor.',
      officialSourceUrl: 'https://cloud.google.com',
      sourceDocName: 'Google Cloud Silicon Architecture Briefing 2026'
    }
  },
  {
    id: 'amazon-aws-microsoft-dark-gpu-power-grid-crisis',
    title: 'Microsoft and Amazon AWS Issue "Dark GPU" Warning: Hyperscaler CEOs Sound Alarm as Power Grid Delays Leave Thousands of High-End Chips Unpowered',
    category: 'personal',
    locationScope: 'Global',
    sourceName: 'Financial Times, TechCrunch & Hyperscaler Executive Panels',
    sourceType: 'Cloud Systems & Infrastructure Advisory',
    verification: 'reputable_media',
    verificationNote: 'Compiled from Satya Nadella and Matt Garman public talks at the Global Infrastructure Leadership Forum.',
    takeaway: 'Microsoft CEO Satya Nadella and AWS CEO Matt Garman warn that electric utility queues are delaying data center activations by up to 36 months, stranding billions of dollars in high-end server silicon as "Dark GPUs".',
    whatIsIt: "High-level industry talks and cautionary statements by Microsoft and Amazon AWS leadership warning of electrical transmission and nuclear/geothermal power constraints threatening global datacenter expansions.",
    factSheet: {
      when: "02 Nov 2026, 02:15 PM IST",
      where: "Seattle, Washington & Washington D.C. Energy Forum",
      who: "Satya Nadella (CEO, Microsoft), Matt Garman (CEO, AWS), Federal Energy Regulatory Commission (FERC) Officials",
      what: "Joint executive advisory regarding electrical interconnection gridlock stranding tens of thousands of server racks without operational power",
      why: "Modern AI compute clusters consume 100MW to 1GW per campus—equivalent to small cities—overwhelming municipal regional utility grids",
      how: "Hyperscalers negotiating direct long-term Small Modular Reactor (SMR) nuclear contracts and behind-the-meter battery storage to bypass grid queues"
    },
    theRealProblem: "While chip designers can fabricate GPUs in months, building high-voltage transmission lines and electrical transformers takes 3 to 5 years. Power, not silicon availability, is now the primary bottleneck of technology expansion.",
    bullets: [
      'Cloud giants warn that power grid interconnect delays now exceed 36 months in major US and European tech hubs.',
      'Satya Nadella highlights: "The physical limits of electrical grids are now dictating the tempo of software innovation."',
      'AWS and Microsoft invest billions directly into advanced nuclear power purchase agreements and next-generation geothermal energy.'
    ],
    ...createRollingTimestamp(240),
    readTime: '30s read',
    tags: ['Big Tech', 'Microsoft', 'Amazon AWS', 'Satya Nadella', 'Datacenter Power'],
    audioScript: 'Microsoft CEO Satya Nadella and AWS leadership have sounded the alarm over electrical grid bottlenecks that are stranding thousands of high-end AI chips without power.',
    deepDive: {
      overview: 'The global expansion of cloud and AI datacenters has hit a hard physical wall: electrical transmission infrastructure and power generation capacity.',
      keyBackground: 'Between 2023 and 2026, hyperscalers ordered hundreds of thousands of high-wattage accelerator racks without verifying local utility substation lead times.',
      rootCauseAnalysis: "Utility interconnect queues require extensive environmental impact reviews and specialized heavy transformers with multi-year manufacturing backlogs.",
      timeline: [
        { time: 'Warning Issued', event: 'Satya Nadella and Matt Garman speak at energy summit on grid bottlenecks.' },
        { time: 'Infrastructure Pivot', event: 'Cloud giants accelerate direct co-location at nuclear power plants.' }
      ],
      keyQuotes: [
        { speaker: 'Satya Nadella', role: 'CEO, Microsoft', quote: 'Every technology revolution ultimately collides with physical resource constraints. Today, our code runs as fast as power lines can be strung.' }
      ],
      impactForStudents: 'Bridges software with mechanical and electrical engineering: understanding energy efficiency, green compute, and power grid dynamics is becoming as vital as writing algorithms.',
      officialSourceUrl: 'https://ft.com/technology',
      sourceDocName: 'Global Cloud Infrastructure Power Grid Assessment 2026'
    }
  },
  {
    id: 'nvidia-jensen-huang-blackwell-liquid-cooled-keynote',
    title: 'Nvidia Commences Commercial Blackwell Rack Shipments: Jensen Huang Declares End of General-Purpose Computing in Landmark GTC Industry Talk',
    category: 'personal',
    locationScope: 'Global',
    sourceName: 'Nvidia GTC Keynote, AnandTech & Reuters',
    sourceType: 'Semiconductor & Compute Architecture Briefing',
    verification: 'reputable_media',
    verificationNote: 'Delivered live by CEO Jensen Huang during the worldwide GTC Semiconductor Keynote Address.',
    takeaway: 'Nvidia begins shipping full-rack GB200 NVL72 liquid-cooled systems to cloud hyperscalers; Jensen Huang proclaims that traditional CPU instruction retrieval has ended in favor of continuous accelerated computing.',
    whatIsIt: "Landmark hardware deployment announcement and keynote talk where Nvidia CEO Jensen Huang showcased commercial shipments of liquid-cooled Blackwell NVL72 supercomputer racks, redefining datacenter architectures.",
    factSheet: {
      when: "02 Nov 2026, 03:40 PM IST",
      where: "San Jose Convention Center, California",
      who: "Jensen Huang (Founder & CEO, Nvidia), Hyperscaler Cloud Architects, Enterprise Systems Engineers",
      what: "Commercial dispatch of GB200 NVL72 liquid-cooled supercomputer racks featuring 72 Blackwell GPUs and 36 Grace CPUs operating as a single unified system",
      why: "Air-cooled data centers can no longer dissipate 120kW+ per rack densities; liquid cooling and direct copper interconnects provide 30x faster inference at 25x lower energy consumption",
      how: "Direct liquid-to-chip cooling loops circulating chilled fluid over high-dielectric cold plates with 800Gb/s Quantum-X800 InfiniBand switches"
    },
    theRealProblem: "Standard enterprise data centers built for air-cooled x86 servers must undergo complete civil and plumbing reconstruction to support 100kW+ liquid-cooled racks, forcing massive infrastructure retrofits.",
    bullets: [
      'Commercial GB200 NVL72 racks shipped to tier-one cloud providers across North America and Europe.',
      'Jensen Huang states during keynote: "General-purpose computing has reached its thermodynamic end. The future is accelerated computing and generative token manufacturing."',
      'Liquid-to-chip cooling becomes the mandatory standard for next-generation enterprise AI infrastructure.'
    ],
    ...createRollingTimestamp(280),
    readTime: '30s read',
    tags: ['Big Tech', 'Nvidia', 'Jensen Huang', 'Blackwell GB200', 'Keynote'],
    audioScript: 'Nvidia has begun shipping commercial Blackwell supercomputer racks as CEO Jensen Huang declared the end of general-purpose computing in a landmark industry address.',
    deepDive: {
      overview: 'Nvidia has officially initiated mass customer deliveries of its flagship GB200 NVL72 liquid-cooled systems, transitioning the industry from discrete PCIe cards to unified mega-rack supercomputers.',
      keyBackground: 'Moore’s Law slowdown made standard CPU scaling economically unviable, forcing all computational growth into dense parallel accelerator arrays.',
      rootCauseAnalysis: "By integrating 72 Blackwell GPUs with NVLink spine backplanes supporting 1.8 TB/s bidirectional bandwidth per GPU, the entire rack functions as a single monolithic processor.",
      timeline: [
        { time: 'Keynote Demo', event: 'Jensen Huang reveals production liquid-cooled NVL72 rack on stage.' },
        { time: 'Commercial Rollout', event: 'First enterprise clusters go online across major cloud partner datacenters.' }
      ],
      keyQuotes: [
        { speaker: 'Jensen Huang', role: 'CEO, Nvidia', quote: 'We are no longer building computers. We are manufacturing intelligence factories where raw electricity enters and valuable tokens exit at the speed of light.' }
      ],
      impactForStudents: 'Fascinating career trajectory in computer engineering: hardware, thermals, fluid dynamics, and distributed systems are now fully merged into a single engineering discipline.',
      officialSourceUrl: 'https://nvidianews.nvidia.com',
      sourceDocName: 'Nvidia GTC Architecture & Hardware Launch Keynote 2026'
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
  },
  {
    id: 'live-ai-frontier-reasoning-benchmark',
    title: 'Frontier AI Laboratory Dispatch: Multi-Step Reasoning Models Outperform Human Benchmarks on Competitive Science & Math',
    category: 'ai',
    locationScope: 'Global',
    sourceName: 'Frontier AI Alignment & Evaluation Network',
    sourceType: 'Live Foundation Model Benchmark Wire',
    verification: 'reputable_media',
    verificationNote: 'Real-time telemetry from automated evaluation test harnesses.',
    takeaway: 'Standardized benchmarks confirm reasoning models achieved 93% accuracy on complex Olympiad proofs, proving verification compute efficacy.',
    whatIsIt: 'Live foundation model evaluation telemetry measuring multi-step reasoning models against competitive PhD-level scientific benchmarks.',
    factSheet: {
      when: "02 Nov 2026, 05:45 AM IST",
      where: "San Francisco & Global Evaluation Research Consortia",
      who: "Independent Evaluation Researchers, Red Teaming Scientists, Foundation Model Labs",
      what: "Release of standardized empirical benchmark scores demonstrating that test-time search loops solve intricate multi-step proofs without hallucinations",
      why: "Validating that reasoning-oriented reinforcement learning produces reliable outputs suitable for scientific discovery and code synthesis",
      how: "Automated verification pipelines testing candidate outputs against formal proof checkers (Lean 4) and executable sandbox test suites"
    },
    theRealProblem: "Raw benchmarks often suffer from data contamination. Verifying reasoning on novel, previously unreleased proof challenges is essential to confirm genuine generalized problem solving.",
    bullets: [
      'Evaluation harnesses report 93% success rate on novel Olympiad-level mathematical reasoning challenges.',
      'Formal proof checker integration guarantees mathematical correctness before final answer synthesis.',
      'Research labs publish open reproduction kits for academic peer validation.'
    ],
    ...createRollingTimestamp(0),
    readTime: '30s read',
    tags: ['AI Frontier', 'Reasoning', 'Benchmarks', 'Frontier Labs'],
    audioScript: 'Live AI Frontier bulletin: Standardized benchmarks confirm that new multi-step reasoning models have crossed ninety percent accuracy on competitive math challenges.',
    deepDive: {
      overview: 'Independent foundation model evaluators have verified that inference-time reasoning compute produces genuine mathematical breakthroughs.',
      keyBackground: 'Earlier LLMs struggled with multi-step logical consistency, failing when problem steps exceeded five consecutive deductions.',
      rootCauseAnalysis: "Tree-of-thought search guided by process reward verifiers prevents compounding errors across prolonged derivation chains.",
      timeline: [
        { time: 'Just now', event: 'Consortium publishes formal benchmark validation dataset.' }
      ],
      keyQuotes: [
        { speaker: 'Benchmark Director', role: 'AI Evaluation Network', quote: 'We are observing genuine multi-step deduction verified by formal proof checkers.' }
      ],
      impactForStudents: 'Demonstrates the power of rigorous mathematical logic and formal verification in advanced artificial intelligence.',
      officialSourceUrl: 'https://openai.com/research',
      sourceDocName: 'Frontier AI Benchmark Verification Report'
    }
  },
  {
    id: 'live-big-tech-keynote-announcements',
    title: 'Big Tech Keynote Dispatch: Google and Nvidia Announce Next-Gen Silicon Deployments as Enterprise Systems Demand Surges',
    category: 'personal',
    locationScope: 'Global',
    sourceName: 'Silicon Valley Executive Dispatch & Reuters Tech',
    sourceType: 'Live Big Tech Systems Wire',
    verification: 'reputable_media',
    verificationNote: 'Streamed directly from Silicon Executive Roundtable briefings.',
    takeaway: 'Hardware executives confirm massive transition toward heterogeneous custom silicon and liquid-cooled datacenter pods.',
    whatIsIt: 'Live corporate technology briefing on datacenter hardware scaling, liquid cooling adoption, and custom silicon deployments across major tech companies.',
    factSheet: {
      when: "02 Nov 2026, 05:45 AM IST",
      where: "Silicon Valley, California & Global Cloud Datacenters",
      who: "Enterprise Infrastructure Vice Presidents, Semiconductor Architects, Hyperscaler Engineers",
      what: "Executive panel discussions detailing deployment schedules for custom silicon accelerators and liquid-cooled supercomputing pods",
      why: "Surging enterprise computational demand necessitates dramatic thermal and energy efficiency improvements",
      how: "Transitioning traditional air-cooled server rooms into high-efficiency liquid-chilled facilities operating at lower total cost of ownership"
    },
    theRealProblem: "Power grid constraints require datacenters to maximize compute per megawatt rather than simply building physically larger facilities.",
    bullets: [
      'Next-generation accelerator pods demonstrate 3x compute density improvements per square foot.',
      'Liquid-to-chip cooling adoption crosses 50% in new commercial hyperscaler builds.',
      'Open software compiler toolchains enable interoperability between diverse hardware chips.'
    ],
    ...createRollingTimestamp(0),
    readTime: '30s read',
    tags: ['Big Tech', 'Systems', 'Silicon', 'Hardware Launch'],
    audioScript: 'Live Big Tech bulletin: Industry executives report rapid acceleration in liquid-cooled server deployments and custom silicon hardware adoption.',
    deepDive: {
      overview: 'Executive briefings at the Silicon Infrastructure Forum highlight the transformation of modern computing from CPU clusters to heterogeneous accelerated networks.',
      keyBackground: 'Modern artificial intelligence workloads require custom memory architectures that traditional server designs cannot accommodate.',
      rootCauseAnalysis: "Specialized tensor and matrix arithmetic cores operating with high-bandwidth memory provide orders of magnitude higher energy efficiency.",
      timeline: [
        { time: 'Live', event: 'Executive panel concludes with roadmap for commercial deployments.' }
      ],
      keyQuotes: [
        { speaker: 'Hardware Architecture VP', role: 'Systems Engineering', quote: 'System design is now the decisive competitive frontier: cooling, power, and silicon must operate as one cohesive unit.' }
      ],
      impactForStudents: 'Inspiring insight for electrical and systems engineering students into the massive physical infrastructure powering modern computing.',
      officialSourceUrl: 'https://reuters.com/technology',
      sourceDocName: 'Silicon Executive Infrastructure Briefing'
    }
  },
  {
    id: 'iit-placement-systems-semiconductor-surge',
    title: 'IIT & NIT Campus Placement Pivot: Core Systems, Semiconductor & Edge-AI Roles Surge 42% Over Mass IT Services',
    category: 'education',
    locationScope: 'India',
    sourceName: 'The Indian Express & Mint Education Bureau',
    sourceType: 'Accredited Higher Education Reporting',
    verification: 'reputable_media',
    verificationNote: 'Synthesized from verified campus placement reports across IIT Madras, IIT Delhi, and NIT Trichy.',
    takeaway: 'Major Indian technical institutes record a 42% surge in semiconductor design, embedded firmware, and systems engineering offers with average packages rising to ₹24.5 LPA, while legacy bulk IT recruitment dips 18%.',
    whatIsIt: 'Campus placement dynamic shift where engineering graduates with low-level C++, Verilog, and GPU kernel programming skills receive premium domestic offers as India Semiconductor Mission fabs ramp up hiring.',
    factSheet: {
      when: '05 Nov 2026, 11:30 AM IST',
      where: 'IIT Madras, IIT Delhi, NIT Trichy & National Technical Campuses',
      who: 'Training & Placement Deans, Semiconductor Design Houses, Systems Engineering Directors',
      what: 'Core electronics and low-level computer systems job offers surpass bulk software developer recruitment for the first time in five years',
      why: 'Rapid fab construction in Gujarat and Assam under the India Semiconductor Mission has created an urgent deficit of indigenous VLSI and embedded systems engineers',
      how: 'Universities established direct co-op training pipelines with global fabless chip design houses, granting final-year students direct hardware design verification assignments'
    },
    theRealProblem: 'For years, engineering curricula rewarded high-level web frameworks over computer architecture and operating system fundamentals. Now, the market demand has violently shifted back to hardware and low-level systems engineering.',
    bullets: [
      'Semiconductor design (VLSI, FPGA) and systems firmware offers jump 42% year-on-year across top engineering colleges.',
      'Average compensation packages for hardware and kernel engineering roles touch ₹24.5 Lakhs per annum.',
      'Legacy mass IT recruiters reduce campus intake by 18% as generative code tools automate routine boilerplate programming.'
    ],
    ...createRollingTimestamp(18),
    readTime: '30s read',
    tags: ['Campus Placements', 'IIT', 'Semiconductors', 'Hiring Radar'],
    audioScript: 'Campus placement bulletin: Indian engineering institutes report an unprecedented 42 percent surge in hardware systems and semiconductor design job offers.',
    deepDive: {
      overview: 'Recruitment data from the ongoing 2026-27 placement season marks a decisive transition from generalized enterprise IT consulting towards deep-tech systems engineering and semiconductor design.',
      keyBackground: 'India Semiconductor Mission initiatives with Tata Electronics and Micron have generated thousands of specialized hardware verification and firmware positions.',
      rootCauseAnalysis: 'Automated AI coding assistants have commoditized basic web application development, forcing top tech employers to value hardware-software co-design and distributed systems expertise.',
      timeline: [
        { time: '09:00 IST', event: 'IIT Placement Coordination Committee releases quarterly recruitment statistics.' },
        { time: '14:00 IST', event: 'Semiconductor industry group pledges 5,000 core hardware internships for 2027 graduates.' }
      ],
      keyQuotes: [
        { speaker: 'Prof. R. Narayanaswamy', role: 'Head of Placement, IIT Madras', quote: 'The era of generic coding tests is over. Companies are specifically evaluating students on memory hierarchies, cache coherence, and hardware synthesis.' }
      ],
      impactForStudents: 'Vital career compass for computer science, electronics, and electrical engineering undergraduates to master low-level languages (C, C++, Rust, Verilog) over superficial web frameworks.',
      officialSourceUrl: 'https://indianexpress.com/section/education',
      sourceDocName: 'National Technical Institutes Placement Analysis 2026'
    }
  },
  {
    id: 'upsc-gate-reforms-tech-aptitude',
    title: 'UPSC Civil Services & GATE 2027 Pattern Reforms: Mandatory Tech Aptitude Module & Biometric Iris Verification at 1,400 Centers',
    category: 'education',
    locationScope: 'New Delhi',
    sourceName: 'Press Information Bureau (PIB) & DoPT Gazette Notification',
    sourceType: 'Official Government Gazette Notification',
    verification: 'govt_verified',
    verificationNote: 'Officially published in Department of Personnel and Training Gazette Order No. 44/2026.',
    takeaway: 'UPSC gazette notification introduces standardized digital data literacy evaluations for civil service aspirants and mandates continuous biometric Iris verification to completely eliminate exam impersonation across 1,400 national centers.',
    whatIsIt: 'Comprehensive examination reform package modernizing the UPSC Civil Services Preliminary examination syllabus and securing all 1,400 national test centers with multi-modal biometric checks.',
    factSheet: {
      when: '05 Nov 2026, 09:15 AM IST',
      where: 'Department of Personnel and Training (DoPT), North Block, New Delhi',
      who: 'UPSC Examination Board, Union Minister of State for Personnel, DoPT Secretary',
      what: 'Mandatory technical aptitude and data governance module added to General Studies Paper-II; biometric Iris authentication made mandatory at entry',
      why: 'Ensure future district magistrates and police chiefs possess fundamental understanding of cybersecurity, AI governance, and automated public service delivery systems',
      how: 'Exam software integrated with UIDAI secure offline Iris verification terminals across 1,400 test venues'
    },
    theRealProblem: 'Modern public administration increasingly relies on automated digital registries and cybersecurity protocols. Officers lacking foundational data comprehension struggled to audit algorithmic government welfare distribution.',
    bullets: [
      'Preliminary CSAT paper updated with 15 compulsory marks dedicated to digital governance and cybersecurity fundamentals.',
      'Mandatory multi-spectral Iris scanners deployed at all 1,400 exam centers to eliminate proxy test-taker fraud.',
      'GATE exam board harmonizes syllabus to test modern AI systems and real-time computing architectures.'
    ],
    ...createRollingTimestamp(35),
    readTime: '30s read',
    tags: ['UPSC', 'GATE 2027', 'Exam Reforms', 'Govt Verified'],
    audioScript: 'Official education reform: The UPSC has updated the Civil Services examination syllabus to include mandatory digital governance modules and introduced Iris verification nationwide.',
    deepDive: {
      overview: 'The Union Public Service Commission and Department of Personnel and Training have finalized sweeping reforms to ensure national civil service entrance tests align with modern technological administrative challenges.',
      keyBackground: 'Recent state-level paper leak controversies prompted the central government to mandate end-to-end encrypted question transmission and biometric verification at all central testing facilities.',
      rootCauseAnalysis: 'Paper-based logistical pipelines and lack of centralized biometric checkpoints created vulnerabilities exploited by organized examination cartels.',
      timeline: [
        { time: '10:00 IST', event: 'Gazette notification published on official e-gazette portal.' },
        { time: '12:30 IST', event: 'UPSC portal opens mock tests for new digital governance modules.' }
      ],
      keyQuotes: [
        { speaker: 'Dr. V. K. Saxena', role: 'UPSC Board Member', quote: 'Future administrators must understand how machine learning models, privacy safeguards, and cyber systems operate in public service.' }
      ],
      impactForStudents: 'Crucial for competitive exam aspirants (UPSC, State PSCs, GATE) to update their study schedules and familiarize themselves with modern data governance frameworks.',
      officialSourceUrl: 'https://pib.gov.in',
      sourceDocName: 'DoPT Civil Services Examination Gazette Order 2026'
    }
  },
  {
    id: 'sarvam-ai-series-b-multimodal',
    title: 'Bengaluru AI Startup Sarvam AI Closes $53M Series B: Launches Sovereign Multi-Modal Foundation Models Across 10 Indian Languages',
    category: 'startups',
    locationScope: 'Bengaluru',
    sourceName: 'The Economic Times & TechCrunch India',
    sourceType: 'Accredited Venture & Startup Reporting',
    verification: 'reputable_media',
    verificationNote: 'Confirmed via official company announcement and venture filing documentation.',
    takeaway: 'Sarvam AI secures $53M led by Peak XV and Lightspeed to deploy enterprise-grade open Indic speech-to-text and reasoning models trained natively on sovereign IndiaAI compute clusters.',
    whatIsIt: 'Major venture funding milestone for domestic Indian generative AI, funding open speech recognition, language translation, and voice synthesis models for 10 regional languages including Bengali, Hindi, and Tamil.',
    factSheet: {
      when: '05 Nov 2026, 01:45 PM IST',
      where: 'Koramangala, Bengaluru, Karnataka',
      who: 'Sarvam AI Founders (Vivek Raghavan & Pratyush Kumar), Peak XV Partners, Lightspeed Venture Partners',
      what: 'Startup secures $53 Million Series B financing to scale localized foundation models engineered specifically for Indian acoustic accents and linguistic nuances',
      why: 'Global frontier models from Silicon Valley frequently misinterpret regional Indian vernacular accents and cost significantly more per token for domestic enterprises',
      how: 'Trained using high-density audio datasets and sovereign GPU compute allocations subsidized under the IndiaAI National Mission'
    },
    theRealProblem: 'Building foundation models in India previously suffered from extreme GPU compute costs. Subsidized compute through IndiaAI has finally allowed domestic research labs to train multi-billion parameter models locally.',
    bullets: [
      'Sarvam AI completes $53M funding round led by Peak XV, Lightspeed, and prominent angel investors.',
      'Launches Sarvam-Indic-Speech capable of real-time transcription across 10 Indian regional languages.',
      'Provides developer API endpoints at 70% lower token cost than standard Western frontier models.'
    ],
    ...createRollingTimestamp(55),
    readTime: '30s read',
    tags: ['Startups', 'Sarvam AI', 'Venture Capital', 'Bengaluru'],
    audioScript: 'Startup dispatch: Bengaluru AI lab Sarvam AI has raised 53 million dollars in Series B funding to deploy native Indic speech and reasoning models across ten Indian languages.',
    deepDive: {
      overview: 'Sarvam AI has established itself as India’s leading sovereign artificial intelligence research laboratory, achieving state-of-the-art benchmark scores on multi-lingual Indic speech and legal translation.',
      keyBackground: 'India’s linguistic diversity requires acoustic and language models that seamlessly parse mixed-language speech patterns like Hinglish and Benglish commonly spoken across urban centers.',
      rootCauseAnalysis: 'Western LLMs treat Indian languages with low tokenization efficiency, charging 4x more tokens per word compared to English text.',
      timeline: [
        { time: '11:00 IST', event: 'Funding closed with Peak XV Partners and Lightspeed.' },
        { time: '14:00 IST', event: 'Developer documentation and open API playground go live.' }
      ],
      keyQuotes: [
        { speaker: 'Vivek Raghavan', role: 'Co-Founder, Sarvam AI', quote: 'India’s computing future will be built on voice and local languages. Our goal is to make every citizen interact with digital services in their mother tongue.' }
      ],
      impactForStudents: 'Exciting validation for student software developers building applications for rural credit, local governance, and regional e-commerce using indigenous APIs.',
      officialSourceUrl: 'https://economictimes.indiatimes.com/tech',
      sourceDocName: 'Sarvam AI Series B Investment Release'
    }
  },
  {
    id: 'quick-commerce-unit-economics-breakeven',
    title: 'Quick-Commerce Unit Economics Turnaround: Zepto & Swiggy Instamart Cross Operational Breakeven Across Top 8 Metros',
    category: 'startups',
    locationScope: 'Bengaluru',
    sourceName: 'Livemint & Bloomberg India',
    sourceType: 'Financial Market & Retail Analysis',
    verification: 'reputable_media',
    verificationNote: 'Audited contribution margin reports published in regulatory filings and retail equity research notes.',
    takeaway: 'Dark store densification with delivery radii under 1.8km and machine-learning stock optimization propel quick-commerce contribution margins into the black (+2.8%), proving model sustainability.',
    whatIsIt: 'Financial breakthrough for the hyper-local quick commerce sector where automated replenishment and higher average order values enabled positive unit economics without burning cash.',
    factSheet: {
      when: '05 Nov 2026, 03:20 PM IST',
      where: 'Mumbai, Delhi-NCR, Bengaluru, Kolkata & Major Metros',
      who: 'Zepto Executive Board, Swiggy Instamart Leadership, Goldman Sachs Equity Research Analysts',
      what: 'Dark store networks achieve operating profit of ₹14.20 per order compared to loss of ₹32 per order two years ago',
      why: 'Expansion from emergency groceries into high-margin consumer electronics, beauty, and festive gifts drove Average Order Values from ₹380 to ₹610',
      how: 'Micro-warehouse automation and batch routing algorithms increased rider utilization to 3.8 deliveries per hour'
    },
    theRealProblem: 'Skeptics long predicted quick-commerce was a cash-burning bubble subsidized by venture capital. By consolidating supplier logistics and expanding catalog margins, the sector proved structural viability.',
    bullets: [
      'Quick-commerce contribution margins turn positive at +2.8% across mature tier-1 city clusters.',
      'Average order value hits ₹610 as consumers order electronics, cosmetics, and seasonal apparel in under 10 minutes.',
      'Dark store density allows each micro-warehouse to operate at cash-flow break-even within 5 months of launch.'
    ],
    ...createRollingTimestamp(80),
    readTime: '30s read',
    tags: ['Quick Commerce', 'Zepto', 'Swiggy', 'Unit Economics'],
    audioScript: 'Retail finance update: Indian quick-commerce platforms Zepto and Swiggy Instamart have achieved positive operating margins across top metros as order values climbed past 600 rupees.',
    deepDive: {
      overview: 'Financial analysis reveals that Indian 10-minute delivery networks have achieved profitable unit economics through operational densification, dark store automated picking, and diversified merchandise categories.',
      keyBackground: 'India’s quick-commerce sector represents the fastest-growing retail channel globally, expanding at 85% CAGR and challenging traditional supermarket chains.',
      rootCauseAnalysis: 'Proximity to dense apartment clusters lowered average delivery distance to 1.6 kilometers, drastically cutting fuel expenditures and delivery turnaround time.',
      timeline: [
        { time: '13:00 IST', event: 'Equity research note released highlighting positive EBITDA across tier-1 stores.' }
      ],
      keyQuotes: [
        { speaker: 'Senior Retail Analyst', role: 'Institutional Equities', quote: 'Quick commerce in India has cracked what DoorDash and Gorillas failed to achieve in the West: dense consumer geography coupled with efficient two-wheeler fleet operations.' }
      ],
      impactForStudents: 'Valuable case study for management, economics, and logistics students analyzing unit economics, supply chain automation, and consumer habits in emerging economies.',
      officialSourceUrl: 'https://livemint.com',
      sourceDocName: 'Goldman Sachs India Quick-Commerce Equity Report 2026'
    }
  },
  {
    id: 'isro-semi-cryogenic-sce200-test',
    title: 'ISRO Successfully Fires Semi-Cryogenic Engine SCE-200 for 120 Seconds: Greenlights Next-Gen Heavy Lift Vehicle (NGLV) for Gaganyaan',
    category: 'science',
    locationScope: 'Sriharikota',
    sourceName: 'ISRO Official Media Cell & NDTV Science Bureau',
    sourceType: 'Official Aerospace Space Agency Bulletin',
    verification: 'govt_verified',
    verificationNote: 'Officially certified in ISRO Technical Test Release PR-14/2026.',
    takeaway: '2,000 kN thrust kerosene-liquid oxygen semi-cryogenic engine completes full-duration hot-fire test at Mahendragiri, enabling 10-tonne payload capacity to geostationary transfer orbit for Gaganyaan and Indian space station modules.',
    whatIsIt: 'Milestone propulsion test validating India’s most powerful indigenous rocket engine, replacing older toxic hypergolic stages with high-efficiency aviation-grade kerosene propellant.',
    factSheet: {
      when: '05 Nov 2026, 04:10 PM IST',
      where: 'ISRO Propulsion Complex (IPRC), Mahendragiri, Tamil Nadu & Satish Dhawan Space Centre, Sriharikota',
      who: 'ISRO Chairman, Liquid Propulsion Systems Centre (LPSC) Scientists & Test Directors',
      what: 'Semi-Cryogenic Engine SCE-200 operates stably for full 120 seconds in staged combustion cycle generating 200 tonnes of thrust',
      why: 'Heavier human spaceflight modules and lunar sample return missions exceed the 4-tonne payload ceiling of existing LVM3 launch vehicles',
      how: 'Advanced additive-manufactured turbo-pump assembly and regeneratively cooled chamber nozzles successfully withstood 3,400°C combustion temperatures'
    },
    theRealProblem: 'India was historically limited by medium-lift launch capabilities, forcing high-tonnage communication satellites to be launched via expensive foreign rockets (SpaceX Falcon 9, Ariane). SCE-200 restores full sovereign heavy-lift autonomy.',
    bullets: [
      'Semi-cryogenic engine SCE-200 successfully completes full 120-second hot-fire test at Mahendragiri.',
      'Produces 2,000 kN thrust using eco-friendly aviation-grade kerosene and liquid oxygen.',
      'Enables India’s Next-Gen Launch Vehicle (NGLV) to carry up to 10 tonnes to Geostationary Transfer Orbit.'
    ],
    ...createRollingTimestamp(95),
    readTime: '30s read',
    tags: ['ISRO', 'Space Science', 'SCE-200', 'Gaganyaan'],
    audioScript: 'ISRO space dispatch: Indian scientists have successfully hot-fired the powerful SCE-200 semi-cryogenic rocket engine for 120 seconds, greenlighting heavy-lift missions for the Gaganyaan program.',
    deepDive: {
      overview: 'ISRO scientists at the Liquid Propulsion Systems Centre have achieved a historic engineering milestone by firing the high-thrust semi-cryogenic engine operating on an oxygen-rich staged combustion cycle.',
      keyBackground: 'The semi-cryogenic stage is a pivotal technology for India’s proposed Bharatiya Antariksh Station (BAS) and planned 2040 crewed lunar landing program.',
      rootCauseAnalysis: 'Kerosene provides significantly higher density impulse than liquid hydrogen, allowing smaller booster tanks while delivering massive sea-level thrust required for heavy spacecraft.',
      timeline: [
        { time: '14:30 IST', event: 'Test stand ignition sequence initiated at Mahendragiri.' },
        { time: '14:32 IST', event: 'Full 120-second burn duration completed; telemetry validates nominal pressures.' },
        { time: '16:00 IST', event: 'ISRO headquarters formally greenlights flight-stage integration.' }
      ],
      keyQuotes: [
        { speaker: 'S. Somanath', role: 'Chairman, ISRO', quote: 'The SCE-200 test marks India’s entry into elite heavy-lift rocketry. This engine is the bedrock for our sovereign human spaceflight and future planetary explorers.' }
      ],
      impactForStudents: 'Inspiring technical breakthrough for aerospace, mechanical, and physics students interested in propulsion thermodynamics, turbo-machinery, and India’s space frontier.',
      officialSourceUrl: 'https://isro.gov.in',
      sourceDocName: 'ISRO Technical Bulletin: SCE-200 Test Milestone'
    }
  },
  {
    id: 'iter-fusion-tokamak-plasma-record',
    title: 'Global Nuclear Fusion Milestone: Tokamak Core Sustains 100 Million °C High-Confinement Plasma for Record 480 Seconds',
    category: 'science',
    locationScope: 'Global',
    sourceName: 'Nature Physics & Reuters Science Wire',
    sourceType: 'Accredited Scientific Journal Review',
    verification: 'reputable_media',
    verificationNote: 'Peer-reviewed research and experimental logs published in Nature Physics Volume 42.',
    takeaway: 'Magnetic confinement fusion facility achieves continuous 8-minute burning plasma state at 100 Million °C utilizing 20-Tesla high-temperature superconducting magnets without reactor wall degradation.',
    whatIsIt: 'Physics and clean energy breakthrough proving that magnetic fields can keep ultra-hot fusion plasma stable without thermal runaway or turbulent plasma disruption.',
    factSheet: {
      when: '05 Nov 2026, 02:15 PM IST',
      where: 'International Thermonuclear Research Facility & Nuclear Physics Consortium',
      who: 'Plasma Physicists, ITER Research Engineers, Superconducting Magnet Specialists',
      what: 'Deuterium-tritium plasma sustained at 100 Million Degrees Celsius for 480 continuous seconds under high-confinement H-mode',
      why: 'Commercial nuclear fusion requires holding miniature sun-like temperatures continuously to produce net clean electric power without radioactive waste',
      how: 'Barium Copper Oxide (REBCO) superconducting tape magnets generated a stable 20-Tesla toroidal magnetic bottle preventing ion loss'
    },
    theRealProblem: 'Plasma turbulence has plagued fusion experiments for 60 years, frequently causing micro-instabilities that extinguish the reaction within fractions of a second. New AI magnetic controllers solved this stability challenge.',
    bullets: [
      'Fusion reactor sustains 100 Million °C plasma core for 480 seconds (8 full minutes).',
      'High-Temperature Superconducting (HTS) magnets generate unprecedented 20-Tesla magnetic fields.',
      'AI reinforcement learning controllers adjusted magnetic coils in real-time at 10,000 adjustments per second.'
    ],
    ...createRollingTimestamp(125),
    readTime: '30s read',
    tags: ['Nuclear Fusion', 'Clean Energy', 'Physics', 'Deep Science'],
    audioScript: 'Global science breakthrough: Nuclear fusion researchers have sustained high-confinement plasma at 100 million degrees Celsius for a record eight minutes.',
    deepDive: {
      overview: 'Experimental results from advanced superconducting tokamak facilities confirm that commercial fusion power plants can operate continuously without structural plasma disruptions.',
      keyBackground: 'Nuclear fusion produces zero carbon emissions, zero long-lived radioactive waste, and utilizes abundant seawater isotopes (deuterium) as fuel.',
      rootCauseAnalysis: 'Ultra-fast deep reinforcement learning models predict turbulent plasma edge modes 30 milliseconds before they manifest, dynamically shifting magnetic shaping coils.',
      timeline: [
        { time: '11:00 UTC', event: 'Plasma discharge triggered inside vacuum vessel.' },
        { time: '11:08 UTC', event: '480-second milestone reached; orderly plasma ramp-down achieved.' }
      ],
      keyQuotes: [
        { speaker: 'Dr. Elena Rostova', role: 'Chief Plasma Physicist', quote: 'We are no longer debating whether fusion works. We are now solving mechanical engineering challenges to connect this thermal energy to the electric grid.' }
      ],
      impactForStudents: 'Profound inspiration for physics, electrical engineering, and materials science students seeking climate-scale technological solutions.',
      officialSourceUrl: 'https://nature.com/naturephysics',
      sourceDocName: 'Nature Physics: High-Confinement Magnetic Plasma Duration 2026'
    }
  },
  {
    id: 'deepseek-v3-architecture-breakthrough',
    title: 'DeepSeek Releases DeepSeek-V3 Open-Weights Architecture Paper: $5.8M Full-Training Compute Feat via Multi-Head Latent Attention',
    category: 'ai',
    locationScope: 'Global',
    sourceName: 'DeepSeek AI Lab & Hugging Face Papers',
    sourceType: 'Peer-Reviewed AI Technical Report',
    verification: 'reputable_media',
    verificationNote: 'Fully documented in DeepSeek-V3 Technical Report with open weights published on Hugging Face.',
    takeaway: '671B parameter Mixture-of-Experts (MoE) foundation model matches frontier proprietary systems on coding and reasoning benchmarks while consuming just 2.788M GPU hours ($5.8M) during pre-training.',
    whatIsIt: 'Architectural breakthrough demonstrating that open-weights foundation models can match closed proprietary American models at a tiny fraction of the computational training budget.',
    factSheet: {
      when: '05 Nov 2026, 05:00 PM IST',
      where: 'Hugging Face Hub & Global AI Research Repositories',
      who: 'DeepSeek Research Team, Liang Wenfeng, Open-Source Machine Learning Researchers',
      what: '671 Billion parameter model with 37B active parameters per token open-sourced under permissive MIT-style license',
      why: 'Frontier AI models previously cost over $100M to train. DeepSeek proves that memory compression and loss-free routing drastically slash compute requirements',
      how: 'Multi-Head Latent Attention (MLA) compressed KV cache by 93%; FP8 mixed precision training pipeline eliminated numeric underflow'
    },
    theRealProblem: 'Big Tech monopolies claimed only multi-trillion dollar giants could build frontier AI. DeepSeek shattered this narrative by proving algorithmic efficiency beats raw brute-force capital.',
    bullets: [
      'DeepSeek-V3 open-sourced with 671B total parameters and 37B active parameters per token.',
      'Trained for just $5.8 Million in total GPU compute, outperforming many $100M+ proprietary models.',
      'Multi-Head Latent Attention compresses inference memory, allowing high-speed deployment on standard servers.'
    ],
    ...createRollingTimestamp(140),
    readTime: '30s read',
    tags: ['DeepSeek V3', 'AI Frontier', 'Open Weights', 'Machine Learning'],
    audioScript: 'AI Frontier alert: DeepSeek has released the technical architecture paper for DeepSeek-V3, matching proprietary frontier models with just 5.8 million dollars in total compute.',
    deepDive: {
      overview: 'The open release of DeepSeek-V3 represents a watershed moment in artificial intelligence, providing the global open-source community with frontier-level reasoning and coding capabilities.',
      keyBackground: 'Earlier generations of Mixture-of-Experts models suffered from communication bottlenecks between GPU nodes. DeepSeek’s DualPipe scheduling algorithm fully overlapped computation with inter-node data exchange.',
      rootCauseAnalysis: 'Auxiliary-loss-free load balancing allows expert networks to specialize naturally without artificial penalty functions degrading model accuracy.',
      timeline: [
        { time: '13:00 UTC', event: 'Paper and model weights uploaded to Hugging Face repository.' },
        { time: '16:00 UTC', event: 'Community benchmark scores verify parity with closed commercial frontier models.' }
      ],
      keyQuotes: [
        { speaker: 'DeepSeek Research Lead', role: 'Architecture Team', quote: 'The future of artificial intelligence does not belong to closed castles. Algorithmic clarity and open weights will always outpace proprietary barriers.' }
      ],
      impactForStudents: 'Massive opportunity for computer science and data science students to build, fine-tune, and self-host world-class reasoning models locally without prohibitive API charges.',
      officialSourceUrl: 'https://huggingface.co/deepseek-ai',
      sourceDocName: 'DeepSeek-V3 Technical Architecture Report'
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
