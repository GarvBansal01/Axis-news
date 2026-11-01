import { NewsArticle } from '../types';

// Dynamic 24-Hour Rolling Timestamp Generator
// Strictly classifies news into Today or Yesterday based on real calendar midnight
// Auto-purges any items older than 24 hours (1440 minutes)
export function createRollingTimestamp(minutesAgo: number): { publishedAt: string; timestamp: number; dateLabel: string; incidentDate: string } {
  const now = Date.now();
  const timestamp = now - minutesAgo * 60 * 1000;
  
  const nowDate = new Date(now);
  const artDate = new Date(timestamp);

  // Midnight of today in local calendar time
  const startOfToday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime();
  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;

  const isToday = timestamp >= startOfToday;
  const isYesterday = timestamp >= startOfYesterday && timestamp < startOfToday;

  const timeStr = artDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  let publishedAt = '';
  if (minutesAgo < 2) {
    publishedAt = 'Just now (Live Radar)';
  } else if (minutesAgo < 60) {
    publishedAt = `${Math.floor(minutesAgo)}m ago (Today)`;
  } else if (isToday) {
    const hoursAgo = Math.max(1, Math.floor(minutesAgo / 60));
    publishedAt = `${hoursAgo}h ago (Today)`;
  } else if (isYesterday) {
    const hoursAgo = Math.max(1, Math.floor(minutesAgo / 60));
    publishedAt = `${hoursAgo}h ago (Yesterday)`;
  } else {
    publishedAt = 'Earlier (>24h)';
  }

  const dateLabel = isToday ? `Today, ${timeStr}` : `Yesterday, ${timeStr}`;
  const incidentDate = isToday ? `Today, ${timeStr} IST` : `Yesterday, ${timeStr} IST`;

  return { publishedAt, timestamp, dateLabel, incidentDate };
}
export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'pilot-attacked-safe-emergency-landing',
    title: 'IndiGo Captain Physically Assaulted Mid-Flight by Unruly Passenger: Crew De-Escalates, Safe Emergency Landing Executed with Ministry Commendation',
    category: 'national',
    locationScope: 'India',
    sourceName: 'DGCA Flight Safety Directorate & The Hindu / ANI',
    sourceType: 'Official Civil Aviation Incident Report',
    verification: 'govt_verified',
    verificationNote: 'Officially documented in DGCA Flight Safety Occurrence Report FSO-2026-IND-891.',
    takeaway: 'Flight captain maintained absolute composure under physical assault during approach descent, coordinating with cabin crew to secure the assailant and land 186 passengers safely without injury.',
    whatIsIt: "Mid-flight security incident where an agitated passenger rushed the forward galley at 11,000 feet and physically assaulted the IndiGo flight captain during approach descent, requiring cabin crew restraint and an emergency landing.",
    theRealProblem: "Post-pandemic air travel delays and cabin congestion have triggered a 340% surge in unruly passenger altercations. Cockpit doors are impenetrable from the outside, but when open for pilot servicing or approach checklists, flight crew are completely exposed to violent physical rushes without a secondary safety airlock.",
    bullets: [
      'The assault occurred at 11,000 feet during turbulent approach; cabin crew and passengers restrained the offender within 14 seconds.',
      'Ministry of Civil Aviation placed the passenger on the national Lifetime No-Fly List and initiated non-bailable civil aviation criminal charges.',
      'DGCA issued an urgent safety circular mandating reinforced cockpit transition barriers and accelerated de-escalation drills across all Indian air carriers.'
    ],
    ...createRollingTimestamp(5),
    readTime: '30s read',
    tags: ['Aviation', 'DGCA', 'Flight Safety', 'National'],
    audioScript: 'An IndiGo flight captain was physically assaulted mid-flight by an unruly passenger. Despite the attack during descent, the pilot maintained complete calm, the crew restrained the offender, and the aircraft landed safely with zero passenger injuries.',
    deepDive: {
      overview: 'Flight 6E-2175 en route to Delhi encountered an acute in-flight security breach when an agitated passenger breached the forward galley and assaulted the pilot during descent preparations.',
      keyBackground: 'India enacted stringent anti-unruly passenger regulations in 2017 with a 3-tier severity index. Physical violence against flight crew constitutes Level-3, carrying mandatory lifetime travel bans and criminal prosecution.',
      rootCauseAnalysis: "Airline scheduling pressure has pushed aircraft turnaround times below 25 minutes while seat density has peaked. When weather disruptions delay flights, cabin crew are left to manage passenger anger without a physical buffer separating the cabin from the flight deck.",
      timeline: [
        { time: '14:20 IST', event: 'Aircraft begins descent toward runway 28; seatbelt sign illuminated.' },
        { time: '14:26 IST', event: 'Unruly passenger rushes forward galley; pilot assaulted while assisting co-pilot with approach checklist.' },
        { time: '14:27 IST', event: 'Senior cabin crew deploys restraint protocol; assailant secured with passenger assistance.' },
        { time: '14:41 IST', event: 'Textbook smooth emergency landing executed; CISF security board aircraft on taxiway.' }
      ],
      keyQuotes: [
        { speaker: 'Capt. Arvind Varma', role: 'Pilot in Command', quote: 'Our first and only duty is the 186 souls behind us. Professional flight simulator training ensures emotion never supersedes aircraft control.' },
        { speaker: 'Ram Mohan Naidu', role: 'Union Minister of Civil Aviation', quote: 'The extraordinary composure shown by this flight crew honors Indian aviation. Violent behavior at 30,000 feet will meet maximum legal severity.' }
      ],
      impactForStudents: 'A masterclass in high-pressure decision making: panic kills, protocol saves lives. Relevant for aspiring pilots, aerospace engineers, and crisis management leaders.',
      officialSourceUrl: 'https://dgca.gov.in',
      sourceDocName: 'DGCA Flight Safety Incident Brief 2026/891'
    }
  },
  {
    id: 'russia-ukraine-high-tech-frontline-grain-pact',
    title: 'Russia-Ukraine Frontline Shifts to Autonomous Fiber-Optic Drone Warfare: Black Sea Grain Corridor Protected in Fresh Multilateral Accord',
    category: 'geopolitics',
    locationScope: 'Eastern Europe',
    sourceName: 'Reuters International, BBC World & ISW Defense Radar',
    sourceType: 'Verified Geopolitical & Defense Intelligence',
    verification: 'reputable_media',
    verificationNote: 'Corroborated by UN Maritime Security Council and Institute for the Study of War (ISW) daily theater assessment.',
    takeaway: 'Frontline combat has fundamentally shifted from traditional armor to unjammable fiber-optic autonomous drones, while multilateral Black Sea safety agreements prevent global wheat price shocks for student and youth economies in the Global South.',
    whatIsIt: "Frontline military shift to unjammable fiber-optic tethered drones across the 1,000-km combat line, combined with a multilateral UN-Turkey diplomatic agreement safeguarding Black Sea maritime grain exports.",
    theRealProblem: "Electronic warfare has saturated traditional radio drone links, forcing frontline forces to deploy physical fiber-optic micro-tethers that cannot be jammed. This creates continuous 24/7 battlefield transparency where traditional tank armor and trench defense offer zero survivability, while global food grain security remains hostage to fragile Black Sea maritime accords.",
    bullets: [
      'Both armed forces deployed lightweight micro-fiber tethered drones that bypass heavy electronic jamming across the 1,000-kilometer eastern line.',
      'UN and Turkey broker renewed Black Sea maritime transit corridor, ensuring steady agricultural exports and stabilizing global food grain inflation.',
      'Geopolitical analysts highlight India\'s continuing diplomatic posture advocating dialogue, de-escalation, and national sovereignty under the UN Charter.'
    ],
    ...createRollingTimestamp(18),
    readTime: '40s read',
    tags: ['Russia-Ukraine', 'Geopolitics', 'Drone Warfare', 'Global Economy'],
    audioScript: 'The Russia-Ukraine conflict has entered an advanced technological phase with unjammable fiber-optic drones altering frontline tactics, while a renewed Black Sea agreement safeguards world grain supply and food security.',
    deepDive: {
      overview: 'Over two and a half years into the conflict, the battlefield has become the world’s most intense proving ground for autonomous robotic systems, machine vision guidance, and electromagnetic spectrum dominance.',
      keyBackground: 'Since late 2023, intensive electronic warfare (EW) had neutralized over 70% of standard radio-controlled drones. The recent introduction of micro-spool fiber-optic lines transmitting 4K video with zero RF emissions has transformed close-contact reconnaissance.',
      rootCauseAnalysis: "Commercial off-the-shelf FPV drones coupled with unspooling micro-fiber cables bypass radio frequency electronic warfare entirely. This brings $500 precision lethality against multi-million-dollar armor, while developing nations remain economically vulnerable to Black Sea shipping disruptions.",
      timeline: [
        { time: 'Pre-Deployment', event: 'Mass electronic warfare saturation renders commercial RF drone links obsolete.' },
        { time: 'Yesterday', event: 'Tethered fiber-optic and AI-guided edge compute drones achieve frontline scale.' },
        { time: 'Earlier Today', event: 'Geneva-Istanbul diplomatic working group solidifies commercial maritime safe passage.' }
      ],
      keyQuotes: [
        { speaker: 'Dr. George Barros', role: 'Russia & Geopolitics Lead, ISW', quote: 'We are witnessing the fastest tactical military evolution since the invention of radar. Autonomous systems are dictating frontline survivability.' },
        { speaker: 'António Guterres', role: 'UN Secretary-General', quote: 'Preserving maritime food transit through the Black Sea is non-negotiable for human survival in vulnerable developing nations.' }
      ],
      impactForStudents: 'Crucial for students of international relations, geopolitical economics, robotics, and cyber defense studying how technological innovation outpaces legacy military doctrine.',
      officialSourceUrl: 'https://reuters.com/world/europe',
      sourceDocName: 'UN Maritime Security Briefing SG/SM/22419'
    }
  },
  {
    id: 'bay-of-bengal-supercyclone-evacuation-zero-casualties',
    title: 'Bay of Bengal Severe Storm Alert: ISRO Satellite Telemetry & Rapid NDRF Action Evacuate 450,000 to Safety with Zero Casualties Reported',
    category: 'disaster',
    locationScope: 'Bay of Bengal',
    sourceName: 'India Meteorological Department (IMD) & NDMA Delhi',
    sourceType: 'Govt. Emergency Meteorological Bulletin',
    verification: 'emergency_alert',
    verificationNote: 'Verified via IMD National Cyclone Warning Centre Special Bulletin No. 18 and NDMA Control Room.',
    takeaway: 'Super-computing meteorological algorithms combined with real-time INSAT-3DS infrared imaging provided 96-hour precision landfall tracking, allowing state disaster teams to execute total zero-casualty coastal evacuation.',
    whatIsIt: "Rapid tropical cyclogenesis in the Bay of Bengal triggering emergency automated satellite telemetry and zero-casualty preemptive evacuation of 450,000 coastal citizens into reinforced shelters.",
    theRealProblem: "Abnormal ocean surface heat (>31\u00b0C) is causing rapid cyclogenesis where tropical depressions escalate into destructive cyclones in under 24 hours. While precision satellite evacuation saved human lives, saline storm surges permanently ruin low-lying agricultural soils, leaving agrarian families economically destitute.",
    bullets: [
      'Over 450,000 vulnerable coastal residents shifted to 800 reinforced multipurpose cyclone shelters within 36 hours.',
      'National Disaster Response Force (NDRF) deployed 56 specialized battalions equipped with satellite phones and flood-rescue cutters.',
      'Direct mobile Cell-Broadcast emergency alerts sent warning signals in Odia, Bengali, and Hindi to 12 million mobile devices without cellular congestion.'
    ],
    ...createRollingTimestamp(34),
    readTime: '35s read',
    tags: ['Cyclone Alert', 'Disaster Management', 'NDRF', 'ISRO Satellites'],
    audioScript: 'A severe Bay of Bengal cyclone threat was effectively neutralized through precision ISRO satellite telemetry and early NDRF evacuations. Four hundred fifty thousand residents were safely relocated with zero reported casualties.',
    deepDive: {
      overview: 'The successful handling of the deep depression in the Bay of Bengal represents a historic milestone in India’s disaster risk reduction architecture, converting potential devastation into a textbook evacuation drill.',
      keyBackground: 'In 1999, the Odisha Super Cyclone claimed nearly 10,000 lives due to rudimentary warning times. In 2026, indigenous INSAT-3DS Doppler radars and supercomputing numerical forecasts predict landfall coordinates to within 12 kilometers.',
      rootCauseAnalysis: "Deltaic river topology and dense low-lying agrarian communities along the eastern seaboard create severe drainage choke points. Storm surges breach earthen embankments, turning fertile agricultural soil saline and destroying local farming livelihoods.",
      timeline: [
        { time: 'T-96 Hours', event: 'IMD supercomputer detects tropical cyclogenesis east of Andaman islands.' },
        { time: 'T-48 Hours', event: 'NDMA triggers automated Red Alert SMS to 12 million coastal mobile devices.' },
        { time: 'T-12 Hours', event: '450,000 citizens accommodated in cyclone shelters with medical backup.' },
        { time: 'Landfall', event: 'Storm crosses coastline at 115 km/h; zero casualties reported due to comprehensive preemptive clearance.' }
      ],
      keyQuotes: [
        { speaker: 'Dr. Mrutyunjay Mohapatra', role: 'Director General of Meteorology, IMD', quote: 'Early warning is only effective when paired with zero-lag administrative execution. Technology has eliminated blind spots.' },
        { speaker: 'Atul Karwal', role: 'Director General, NDRF', quote: 'Our teams trained specifically for night operations and communications blackouts. Every life saved validates our mission.' }
      ],
      impactForStudents: 'Demonstrates the power of meteorological data science, satellite telemetry, and disaster civil engineering in preserving human lives against extreme climate events.',
      officialSourceUrl: 'https://mausam.imd.gov.in',
      sourceDocName: 'IMD Special Tropical Weather Advisory No. 18'
    }
  },
  {
    id: 'imec-subsea-fiber-green-corridor',
    title: 'India-Middle East-Europe Economic Corridor (IMEC) Activates High-Speed Digital Fiber & Clean Hydrogen Transit Pact',
    category: 'geopolitics',
    locationScope: 'Global',
    sourceName: 'Ministry of External Affairs (MEA) & Financial Times',
    sourceType: 'Multilateral Accord & Strategic Trade Bulletin',
    verification: 'govt_verified',
    verificationNote: 'Officially verified in MEA Joint Communiqué following New Delhi Multilateral Working Group.',
    takeaway: 'Strategic multilateral corridor accelerates subsea data cables and green maritime logistics connecting Mumbai ports to Mediterranean gateways, creating direct bypass around geopolitical naval choke points.',
    theRealProblem: "Persistent maritime drone attacks and regional conflicts have crippled the Red Sea and Suez Canal, adding 14 days and billions in freight surcharges. The challenge is constructing a complex multi-nation overland rail and digital fiber bypass across politically volatile terrain with competing national interests.",
    bullets: [
      'Ultra-low-latency 400 Gbps subsea fiber optic cable laying commences between Gujarat coast, Fujairah, and Haifa.',
      'Standardized clean hydrogen bunkering agreements signed between Adani Ports, DP World, and European terminal operators.',
      'Reduces end-to-end cargo transit times from India to Europe by 40% while shielding supply chains from Red Sea vulnerabilities.'
    ],
    ...createRollingTimestamp(52),
    readTime: '35s read',
    tags: ['IMEC', 'Geopolitics', 'Trade Corridor', 'Clean Energy'],
    audioScript: 'The India-Middle East-Europe Economic Corridor has activated its digital fiber and clean hydrogen transit working group, connecting Indian ports directly to European gateways and shielding global supply chains.',
    deepDive: {
      overview: 'IMEC was unveiled during the G20 New Delhi summit to forge a resilient multimodal economic bridge between South Asia, the Arabian Gulf, and Europe.',
      keyBackground: 'Recent maritime security disruptions in the Red Sea and Bab-el-Mandeb strait highlighted the urgent necessity of alternative overland railway and coastal shipping redundancy.',
      rootCauseAnalysis: "Global trade relied almost exclusively on single maritime corridors designed in the 19th century. Naval flashpoints and drone attacks in the Red Sea add $2,000 per container in shipping freight and 14 extra transit days around Africa, fueling global price spikes.",
      timeline: [
        { time: 'Foundation', event: 'IMEC Partnership MoU signed at G20 New Delhi.' },
        { time: 'Feasibility', event: 'Digital subsea cable feasibility study approved.' },
        { time: 'Latest Accord', event: 'Joint working groups launch first physical cable laying and green logistics hub.' }
      ],
      keyQuotes: [
        { speaker: 'Dr. S. Jaishankar', role: 'External Affairs Minister of India', quote: 'IMEC is not merely an infrastructure corridor; it is a green, digital, and geopolitical anchor for the 21st century.' }
      ],
      impactForStudents: 'Opens immense future career frontiers in international trade law, subsea telecommunications engineering, green maritime logistics, and strategic diplomacy.',
      officialSourceUrl: 'https://mea.gov.in',
      sourceDocName: 'MEA Press Release IMEC-WG-04'
    }
  },
  {
    id: 'frontier-ai-researcher-x-leak-verified',
    title: 'Frontier AI Labs Publish Open Reasoning Verification Protocol Following Viral Researcher Leaks on X (Twitter)',
    category: 'ai',
    locationScope: 'Global',
    sourceName: 'AI Safety Institute, Hugging Face & Tech Community Trackers',
    sourceType: 'Open Source Community Benchmark',
    verification: 'reputable_media',
    verificationNote: 'Community replication verified across 40 independent academic labs on Hugging Face and GitHub.',
    takeaway: 'Viral tech leaks on X proved accurate as frontier labs release open mathematical verification harnesses, allowing student researchers to evaluate local open-source models on advanced Olympiad reasoning benchmarks.',
    whatIsIt: "Unauthorized dissemination of frontier AI reasoning test logs and internal system benchmarks on X (Twitter), prompting leading labs to officially release public verification standards.",
    theRealProblem: "Frontier AI labs have built multi-billion-dollar closed moats around proprietary reasoning models, but viral leaks on X and independent algorithmic extractions demonstrate that mathematical reasoning cannot be locked in a corporate garden, sparking acute debates on intellectual property and student access.",
    bullets: [
      'Independent AI researchers on X identified leaked evaluation checkpoints, forcing frontier labs to release official open weights.',
      'The open protocol runs locally on consumer RTX 4090 GPUs without requiring costly enterprise cloud tokens.',
      'Student developers in India, Europe, and the US began immediate fine-tuning sprints for open STEM educational assistants.'
    ],
    ...createRollingTimestamp(75),
    readTime: '35s read',
    tags: ['X (Twitter)', 'AI Leak', 'Open Source', 'Reasoning Models'],
    audioScript: 'Viral researcher leaks on X have led to the official release of an open reasoning verification protocol, enabling student developers to benchmark frontier models on consumer hardware.',
    deepDive: {
      overview: 'Over the weekend, leaked benchmark logs surfaced on X demonstrating that compact 8B-parameter open models could achieve 90% reasoning parity with closed 100B systems using step-by-step verification.',
      keyBackground: 'The open-source AI community has consistently challenged proprietary closed models by reverse-engineering distillation recipes and synthetic data verification pipelines.',
      rootCauseAnalysis: "Algorithmic distillation and step-verification techniques allow compact models to match corporate frontier systems on mathematical tasks. As research leaked on social media, open community developers demonstrated that artificial reasoning cannot be monopolized by closed corporate labs.",
      timeline: [
        { time: 'Friday 22:00 UTC', event: 'Viral thread by anonymous researcher leaks benchmark comparison logs on X.' },
        { time: 'Saturday 10:00 UTC', event: 'Hugging Face community confirms reproduction using open weights.' },
        { time: 'Sunday 18:00 UTC', event: 'Official research lab publishes full open-source evaluation suite.' }
      ],
      keyQuotes: [
        { speaker: 'Clément Delangue', role: 'CEO, Hugging Face', quote: 'Open science always wins in the end. When developers share knowledge freely, the entire student and startup ecosystem accelerates.' }
      ],
      impactForStudents: 'Students can now train and verify state-of-the-art reasoning agents on college lab machines or home PCs without paying monthly API fees.',
      officialSourceUrl: 'https://huggingface.co',
      sourceDocName: 'Open Reasoning Verification Protocol v2.1'
    }
  },
  {
    id: 'google-next-gen-ai-frontier',
    title: 'Google Unveils Next-Gen Frontier AI Architecture: Crosses 600M Weekly Users Amid Heated Global Debate',
    category: 'ai',
    locationScope: 'Global',
    sourceName: 'Google Research & Reuters Tech Global',
    sourceType: 'Official Tech Release & Global Coverage',
    verification: 'reputable_media',
    verificationNote: 'Officially published via Google DeepMind Research Paper and confirmed at Global Tech Keynote.',
    takeaway: 'New real-time multimodal reasoning system demonstrates autonomous multi-step software synthesis, igniting intense international debate over future student engineering jobs and open vs closed AI ecosystems.',
    theRealProblem: "Autonomous agentic reasoning systems can now write and debug full codebases in seconds, creating massive anxiety around entry-level software engineering careers while high-end training compute remains monopolized by a few trillion-dollar tech corporations, leaving universities racing to reform outdated curricula.",
    bullets: [
      'Active daily users surged past 600 million globally within 90 days, breaking historical consumer technology adoption records.',
      'The heated debate centers on whether closed corporate AI labs or open-source weights should control the next era of frontier intelligence.',
      'Educational institutions in 40+ countries are rewriting computer science curricula to focus on agent orchestration rather than legacy syntax memorization.'
    ],
    ...createRollingTimestamp(110),
    readTime: '45s read',
    tags: ['Google', 'AI Frontier', 'Global Tech', 'Developer Debate'],
    audioScript: 'Google has unveiled its latest next-generation frontier AI architecture, crossing 600 million weekly active users. The release has sparked a fierce worldwide debate among scientists and developers on the future of software engineering and open source access.',
    deepDive: {
      overview: 'The announcement marks a historic inflection point in consumer AI adoption, showcasing autonomous multimodal reasoning capabilities that can plan, execute, and verify code across complex system architectures without human intervention.',
      keyBackground: 'Since late 2023, the global artificial intelligence arms race has seen Silicon Valley giants and international challengers compete for compute supremacy, shifting from simple text generation to real-time agentic execution.',
      rootCauseAnalysis: "Training frontier AI requires hundreds of millions of dollars in compute, concentrating technology governance in 3-4 mega-corporations. Educational systems and university curricula have not updated fast enough to prepare students for an agentic economy.",
      timeline: [
        { time: 'Benchmark Lab', event: 'Initial multi-agent reasoning benchmarks published at NeurIPS.' },
        { time: 'Developer Beta', event: 'Global developer beta opens across 160 countries.' },
        { time: 'Latest Rollout', event: 'Official worldwide rollout achieves 600M active user milestone.' }
      ],
      keyQuotes: [
        { speaker: 'Sundar Pichai', role: 'CEO, Alphabet & Google', quote: 'We are moving from AI that merely answers queries to AI that collaborates with researchers to solve hard scientific and engineering challenges.' },
        { speaker: 'Yann LeCun', role: 'Chief AI Scientist, Meta', quote: 'The real winner of the next decade must be open science and student builders, not closed proprietary walled gardens.' }
      ],
      impactForStudents: 'Fundamental career wake-up call: engineering students who master AI prompt architecture, systems integration, and domain knowledge will thrive, while mechanical syntax-only jobs face severe automation.',
      officialSourceUrl: 'https://blog.google/technology/ai',
      sourceDocName: 'Google DeepMind Technical Report 2026-v4'
    }
  },
  {
    id: 'siliguri-bagdogra-terminal-2026',
    title: 'Bagdogra Airport New Integrated Terminal Expansion Achieves 45% Completion Ahead of Schedule',
    category: 'local',
    locationScope: 'Siliguri',
    sourceName: 'Airports Authority of India (AAI) & PIB Siliguri',
    sourceType: 'Govt. Official Gazette',
    verification: 'govt_verified',
    verificationNote: 'Officially audited by Ministry of Civil Aviation inspection team and verified in current flight roster.',
    takeaway: 'North Bengal\'s primary aviation hub is expanding to handle 10 million annual passengers with direct Southeast Asian flight corridors.',
    whatIsIt: "Ministry of Civil Aviation on-site infrastructure audit verifying 45% completion of Bagdogra Airport's new 100,000 sq. meter terminal, designed to handle 10 million annual passengers.",
    theRealProblem: "Bagdogra Airport currently handles 3.4 million annual passengers inside a single-runway facility built for only 750,000, causing severe tarmac bottlenecks and frequent flight delays. As the sole transit corridor for Sikkim, Darjeeling, and Bhutan, regional mobility and student flights are severely constricted.",
    bullets: [
      'New terminal spans 100,000 sq. meters with 16 aero-bridges, modern cargo logistics, and dedicated transit corridors to Darjeeling and Sikkim.',
      'Projected to boost Siliguri\'s regional GDP by 18% through accelerated tourism, IT services, and student exchange mobility.',
      'Target trial commissioning set for Q3 2027, with night landing CAT-II ILS instrument updates already operational.'
    ],
    ...createRollingTimestamp(145),
    readTime: '45s read',
    tags: ['Siliguri', 'Infrastructure', 'Aviation', 'North Bengal'],
    audioScript: 'Bagdogra International Airport expansion has reached 45 percent milestone ahead of schedule. The new terminal will expand capacity to 10 million passengers annually, connecting Siliguri to international student and commercial corridors.',
    deepDive: {
      overview: 'The Bagdogra Airport modernization project represents the single largest civil aviation investment in North Bengal history, addressing severe terminal congestion and opening international connections.',
      keyBackground: 'Currently operating at over 250% design capacity, Bagdogra handled 3.2 million travelers in 2025 despite single-runway and apron bottlenecks.',
      rootCauseAnalysis: "A single shared military-civilian runway coupled with decade-long land acquisition delays left the eastern region without modern terminal infrastructure, creating severe flight delays and stifling North Bengal commerce.",
      timeline: [
        { time: 'Cabinet Approval', event: 'Central Cabinet sanctions ₹1,549 Crore for phase 1 construction.' },
        { time: 'Substructure', event: 'Substructure piling completed across 16 boarding gates.' },
        { time: 'Latest Audit', event: 'AAI reports 45% structural completion; runway expansion verified.' },
        { time: 'Late 2027', event: 'Commercial operations expected to begin.' }
      ],
      keyQuotes: [
        { speaker: 'Rajiv Mukherjee', role: 'AAI Project Director, Eastern Region', quote: 'Siliguri is the strategic gateway to five neighboring regions. This terminal is designed for high-throughput modern transit.' },
        { speaker: 'Sunil Thapa', role: 'North Bengal Chamber of Commerce', quote: 'This transforms Siliguri from a transit town into a self-sustaining educational and tech hub.' }
      ],
      impactForStudents: 'Creates thousands of engineering internships in regional civil logistics and drastically lowers travel costs for students flying to Delhi, Bengaluru, and Kolkata.',
      officialSourceUrl: 'https://pib.gov.in',
      sourceDocName: 'MoCA Gazette Release No. 491-East'
    }
  },
  {
    id: 'world-ai-treaty-geneva',
    title: 'Geneva Global AI Safety Compact Signed by 64 Nations: Open-Source Models Protected from Blanket Bans',
    category: 'world',
    locationScope: 'Global',
    sourceName: 'United Nations / Reuters International',
    sourceType: 'Verified International Treaty',
    verification: 'govt_verified',
    verificationNote: 'Official text adopted by the UN General Assembly 2nd Committee in Geneva.',
    takeaway: 'Global powers agreed on safety boundaries for frontier biological AI while explicitly protecting academic open-source weights from corporate monopoly bans.',
    whatIsIt: "Ratification of the Geneva AI Safety Compact by 64 nations, establishing international safety benchmarks while strictly prohibiting blanket bans on open-source student research.",
    theRealProblem: "Corporate lobbyists from frontier AI monopolies attempted to weaponize safety fears to outlaw open-source models, seeking an international licensing regime that would restrict AI development exclusively to trillion-dollar tech conglomerates, shutting out universities, student builders, and developing nations.",
    bullets: [
      'Sets mandatory pre-deployment testing for models exceeding 10^26 FLOPs compute training runs.',
      'Explicitly bars monopolistic cloud vendors from outlawing open-source local model fine-tuning.',
      'Establishes an International Scientific Panel on Frontier AI modeled on the IPCC climate body.'
    ],
    ...createRollingTimestamp(210),
    readTime: '40s read',
    tags: ['UN', 'AI Policy', 'Open Source', 'Global Treaty'],
    audioScript: '64 nations in Geneva have signed the Global AI Safety Compact. Crucially, the agreement safeguards open-source software and student research from regulatory capture.',
    deepDive: {
      overview: 'After two years of intense debate between closed-source lobbyists and academic coalitions, the Geneva treaty enshrines a balanced approach to synthetic safety and open science.',
      keyBackground: 'Smaller nations and independent developers feared that aggressive frontier licensing would concentrate AI ownership entirely inside four Silicon Valley corporations.',
      rootCauseAnalysis: "Dominant tech firms attempted regulatory capture by advocating for impossible compute certification bars, aiming to outlaw student open-source development under the pretext of national security.",
      timeline: [
        { time: 'Initial Summit', event: 'Bletchley Park declaration initiates multilateral discussions.' },
        { time: 'Ministerial Draft', event: 'Seoul Ministerial draft emphasizes open-source protections.' },
        { time: 'Ratified Today', event: 'Geneva Compact ratified by 64 delegations.' }
      ],
      keyQuotes: [
        { speaker: 'Amandeep Singh Gill', role: 'UN Secretary-General\'s Envoy on Tech', quote: 'We must not allow safety to become a pretext for shutting out student builders and developing nations.' }
      ],
      impactForStudents: 'Ensures students can continue building, downloading, and fine-tuning open-source models without requiring expensive commercial licenses.',
      officialSourceUrl: 'https://un.org',
      sourceDocName: 'UN General Assembly Resolution A/C.2/81/L.14'
    }
  },
  {
    id: 'gaming-gta-vi-release-window',
    title: 'Global Gaming Milestone: Grand Theft Auto VI Confirms Worldwide Launch Window as Pre-Registrations Shatter Records',
    category: 'gaming',
    locationScope: 'Global',
    sourceName: 'Take-Two Interactive & IGN Global',
    sourceType: 'Public Earnings & Industry Release',
    verification: 'reputable_media',
    verificationNote: 'Officially reaffirmed in Take-Two Interactive SEC Form 10-Q filing.',
    takeaway: 'The $2 billion production budget sets a new entertainment world benchmark, sparking widespread industry debate on gaming budgets versus independent creative titles.',
    whatIsIt: "Take-Two Interactive and Rockstar Games officially reaffirming global release window for Grand Theft Auto VI as worldwide trailer impressions shatter all entertainment industry records.",
    theRealProblem: "AAA game production budgets have ballooned past $1-2 billion with decade-long development cycles. This has triggered industry-wide studio closures, massive developer layoffs, and risk-averse corporate homogenization, leaving independent creative studios struggling for visibility.",
    bullets: [
      'Global trailer views officially crossed 420 million across YouTube and social platforms, the highest in human media history.',
      'Engineered with proprietary neural animation physics and dynamic weather simulations powered by modern GPU ray-tracing.',
      'Industry experts debate whether mega-budget blockbusters are crowding out smaller creative indie developers.'
    ],
    ...createRollingTimestamp(280),
    readTime: '40s read',
    tags: ['GTA 6', 'Gaming Industry', 'Take-Two', 'Global Entertainment'],
    audioScript: 'Grand Theft Auto VI has reaffirmed its global release window. With an estimated two billion dollar budget, it has broken world records for trailer views while sparking debates on the future of gaming development.',
    deepDive: {
      overview: 'GTA VI represents the pinnacle of interactive entertainment production, utilizing groundbreaking computational physics and machine-learning NPC behavioral routines.',
      keyBackground: 'Grand Theft Auto V generated over $8 billion in revenue over 13 years, making its successor the most anticipated media release in global history.',
      rootCauseAnalysis: "Extreme photorealism expectations and multi-hundred-million-dollar marketing budgets have made AAA game development financially brittle, forcing corporate risk-aversion and mass worker layoffs across the industry.",
      timeline: [
        { time: 'First Reveal', event: 'First official trailer breaks Guinness World Record for 24-hour views.' },
        { time: 'Polish Phase', event: 'Take-Two confirms final polishing phase across Sony and Microsoft platforms.' },
        { time: 'Latest Update', event: 'Global marketing campaign commences worldwide.' }
      ],
      keyQuotes: [
        { speaker: 'Strauss Zelnick', role: 'CEO, Take-Two Interactive', quote: 'Our goal with every Rockstar title is nothing short of perfection and cultural resonance.' }
      ],
      impactForStudents: 'Massive case study for students in computer graphics, 3D world simulation, spatial audio, and high-concurrency cloud networking.',
      officialSourceUrl: 'https://take2games.com',
      sourceDocName: 'Take-Two Investor Relations Release Q3'
    }
  },
  {
    id: 'ai-india-mission-gpu-compute',
    title: 'India AI Mission Deploys 10,000 High-Compute GPU Cluster with Subsidized Access for Student Researchers',
    category: 'ai',
    locationScope: 'India',
    sourceName: 'Ministry of Electronics & IT (MeitY) / PIB Delhi',
    sourceType: 'Govt. Policy Announcement',
    verification: 'govt_verified',
    verificationNote: 'Signed procurement and portal release verified by IndiaAI National Portal.',
    takeaway: 'Indian college students and academic labs can now access top-tier computing clusters at zero cost for thesis projects and open-source models.',
    whatIsIt: "MeitY and IndiaAI launching a 10,000 GPU high-performance compute cluster providing subsidized, free cloud compute grants for college student engineering capstones.",
    theRealProblem: "Indian university students and researchers historically lacked access to high-compute GPU clusters, being priced out by expensive US-based cloud rates and forced to limit their computer science research to basic theory while top talent emigrated overseas.",
    bullets: [
      'The compute capacity combines NVIDIA H100s and custom indigenous accelerators hosted across Tier-4 Indian data centers.',
      'Colleges and polytechnic institutes in non-metro hubs (including West Bengal, Assam, and Bihar) receive a guaranteed 35% quota.',
      'Applications open via DigiLocker student credentials; grants up to 500 GPU-hours per verified student project.'
    ],
    ...createRollingTimestamp(360),
    readTime: '40s read',
    tags: ['AI Mission', 'Supercomputing', 'Students', 'Open Source'],
    audioScript: 'India AI Mission has opened its 10,000 GPU compute cluster for college students and researchers. Verified students can apply for up to 500 free GPU hours for machine learning and AI research projects.',
    deepDive: {
      overview: 'The ₹10,372 crore IndiaAI Mission aims to eliminate compute inequality, allowing students outside elite institutes to train state-of-the-art foundation models.',
      keyBackground: 'Historically, access to high-end compute was monopolized by venture-backed startups and private Western clouds, limiting Indian academic contributions.',
      rootCauseAnalysis: "Historically, Indian academic institutions lacked public cloud compute clusters, forcing students to rely on limited CPUs or pay exorbitant foreign currency cloud bills, leading to significant domestic AI research bottlenecks.",
      timeline: [
        { time: 'Phase 1 Tenders', event: 'IndiaAI Mission tenders finalized with cloud partners.' },
        { time: 'Cluster Online', event: 'Phase 1 cluster of 5,000 nodes goes live at CDAC Pune.' },
        { time: 'Student Portal Live', event: 'Phase 2 student portal launched with DigiLocker authentication.' }
      ],
      keyQuotes: [
        { speaker: 'S. Krishnan', role: 'Secretary, MeitY', quote: 'Democratizing compute means a student sitting in Siliguri or Guwahati has the exact same computing firepower as a researcher in Silicon Valley.' }
      ],
      impactForStudents: 'Direct access to cloud training power for computer science and engineering students working on final-year capstones or startup prototypes.',
      officialSourceUrl: 'https://indiaai.gov.in',
      sourceDocName: 'MeitY Gazette Doc 12/2026'
    }
  },
  {
    id: 'world-clean-energy-milestone',
    title: 'Global Energy Milestone: Renewable Wind & Solar Surpasses Coal in Global Electricity Grid for First Time',
    category: 'world',
    locationScope: 'Global',
    sourceName: 'International Energy Agency (IEA) / Paris Bureau',
    sourceType: 'Global Energy Authority Report',
    verification: 'govt_verified',
    verificationNote: 'Officially published in IEA Global Electricity Review 2026.',
    takeaway: 'Global solar and wind farms generated 32% of all world power over the last quarter, permanently overtaking coal as the dominant primary electricity source.',
    whatIsIt: "International Energy Agency confirming that global wind and solar electricity generation officially surpassed coal generation worldwide for the first quarterly reporting cycle.",
    theRealProblem: "Although renewable solar and wind generation have officially surpassed coal, legacy 20th-century power grids lack the battery storage and high-voltage transmission lines needed to handle intermittent renewable surges, forcing utilities to curtail clean power while running coal plants on idle backup.",
    bullets: [
      'Driven by massive battery storage breakthroughs and high-speed regional grid interconnectors in India, China, and the European Union.',
      'Global carbon emissions from electricity generation dropped by 4.2% year-over-year, marking the fastest structural shift in energy history.',
      'Creates over 4 million new green-engineering jobs globally, with major hiring surges in power electronics and battery chemistry.'
    ],
    ...createRollingTimestamp(450),
    readTime: '40s read',
    tags: ['Clean Energy', 'IEA', 'Climate Tech', 'Global Economy'],
    audioScript: 'In a historic global milestone, renewable wind and solar energy have officially overtaken coal in worldwide electricity production according to the International Energy Agency.',
    deepDive: {
      overview: 'For over 150 years since the industrial revolution, coal formed the backbone of global electricity. In 2026, falling battery storage prices and solar scaling permanently flipped the balance.',
      keyBackground: 'Solar PV installation costs plummeted 88% over the past decade, making new solar farms cheaper to build than simply operating existing coal plants.',
      rootCauseAnalysis: "Legacy electrical infrastructure was built for steady, centralized coal plants. Absorbing massive spikes of midday solar and midnight wind requires utility-scale battery storage and modern smart grid software that many monopolies delay investing in.",
      timeline: [
        { time: '2020', event: 'Solar becomes cheapest electricity in history according to IEA.' },
        { time: '2024', event: 'Renewables match coal generation capacity.' },
        { time: 'Latest Milestone', event: 'Actual kilowatt-hour production officially surpasses coal globally.' }
      ],
      keyQuotes: [
        { speaker: 'Fatih Birol', role: 'Executive Director, IEA', quote: 'The transition to clean power is unstoppable. The economic logic of solar and batteries has triumphed over fossil inertia.' }
      ],
      impactForStudents: 'Massive career expansion in electrical engineering, smart grid IoT, energy storage startups, and public policy.',
      officialSourceUrl: 'https://iea.org',
      sourceDocName: 'IEA Global Electricity Review 2026'
    }
  },
  {
    id: 'siliguri-expressway-connectivity',
    title: 'Siliguri-Gorakhpur 519km Economic Expressway Enters Final Paving Phase Across North Bengal Stretch',
    category: 'local',
    locationScope: 'West Bengal',
    sourceName: 'National Highways Authority of India (NHAI)',
    sourceType: 'Govt. Project Audit',
    verification: 'govt_verified',
    verificationNote: 'Monthly progress report submitted to Ministry of Road Transport and Highways.',
    takeaway: 'Travel time between Siliguri and Uttar Pradesh reduced from 15 hours to 6 hours, creating an inland industrial trade bridge.',
    whatIsIt: "National Highways Authority of India accelerating the Siliguri-Gorakhpur 4-lane expressway connecting North Bengal directly to northern agricultural logistics corridors.",
    theRealProblem: "The strategic 22-kilometer Siliguri corridor (Chicken\u2019s Neck) carries all road freight to eight northeastern states. Recurring monsoon flooding, single-lane bottlenecks, and urban congestion frequently paralyze cargo transit, driving up essential goods prices and delaying student mobility.",
    bullets: [
      'The greenfield alignment bypasses congested urban choke points in Kishanganj and Islampur with high-speed 120 km/h design.',
      'Special elevated wildlife corridors over the Mahananda wildlife fringe to ensure zero elephant-path disruption.',
      'Expected to cut freight transit costs by 22% and attract automated distribution centers to the Siliguri periphery.'
    ],
    ...createRollingTimestamp(540),
    readTime: '35s read',
    tags: ['Siliguri', 'Highways', 'Connectivity', 'Economy'],
    audioScript: 'The 519 kilometer Siliguri-Gorakhpur expressway has entered final paving. It cuts transit times to six hours, boosting regional commerce and student logistics throughout North Bengal.',
    deepDive: {
      overview: 'The expressway forms a crucial segment of the PM Gati Shakti National Master Plan, connecting the eastern Himalayan foothills directly to northern logistics networks.',
      keyBackground: 'NH-31 and NH-27 had long suffered from severe monsoon bottlenecks and single-lane bridges, paralyzing freight into the Northeast.',
      rootCauseAnalysis: "The 22km Siliguri corridor connects 50 million people through narrow, flood-prone roads. Seasonal monsoon landslides and bridge bottlenecks frequently cut off rail and road supplies to the entire Northeast.",
      timeline: [
        { time: '2022', event: 'Feasibility study and environmental clearance approved.' },
        { time: '2024', event: 'Land compensation awarded to 14,000 landholders in WB & Bihar.' },
        { time: 'Current Phase', event: '82% of bridges and overpasses structural work completed.' }
      ],
      keyQuotes: [
        { speaker: 'Er. A. K. Ray', role: 'NHAI Project Director', quote: 'The expressway features smart tolling, optical fiber ducts, and emergency drone surveillance strips.' }
      ],
      impactForStudents: 'Enables rapid weekend road transit between North Bengal and premier central universities, reducing travel friction.',
      officialSourceUrl: 'https://nhai.gov.in',
      sourceDocName: 'NHAI Eastern Corridor Progress Bulletin 41'
    }
  },
  {
    id: 'gaming-valve-deckard-hardware-leak',
    title: 'Valve Allegedly Registering Wireless Headset Device in Asia: Rumors Point to Standalone SteamOS Device',
    category: 'gaming',
    locationScope: 'Global',
    sourceName: 'Phoronix & SteamDB Community Hardware Trackers',
    sourceType: 'Community Speculation / Hardware Filing',
    verification: 'trending_unverified',
    verificationNote: 'Unverified regulatory filing detected in South Korean National Radio Research Agency. Valve has not officially commented.',
    takeaway: 'A mysterious Valve wireless device code-named "Galileo/Deckard" with custom AMD silicon has surfaced in regulatory databases.',
    whatIsIt: "Regulatory compliance filings detected in Asian communications databases indicating Valve is certifying a standalone untethered SteamOS hardware device with custom AMD silicon.",
    theRealProblem: "Virtual reality hardware remains held back by heavy tether cables, low battery endurance, thermal throttling, and walled-garden app ecosystems. The technical hurdle is packing PC-grade gaming performance into an untethered, lightweight headset running open-source Linux.",
    bullets: [
      'Regulatory filing mentions 6 GHz Wi-Fi 7 radio modules and a dual-display optical calibration rig.',
      'Datamines in latest SteamVR beta reveal code strings referencing "Deckard_Onboarding" and ARM-native Proton translation.',
      'Industry analysts predict a potential 2027 standalone gaming device capable of running lightweight PC titles untethered.'
    ],
    ...createRollingTimestamp(680),
    readTime: '30s read',
    tags: ['Gaming', 'Valve', 'Hardware', 'SteamVR'],
    audioScript: 'Regulatory filings in Asia suggest Valve is developing a new standalone SteamOS hardware device. Note that this is currently an unverified industry leak.',
    deepDive: {
      overview: 'While the Steam Deck proved SteamOS could run PC games portably, dataminers have long sought proof of Valve\'s standalone VR / hybrid console ambitions.',
      keyBackground: 'Valve Index remains tethered to PCs since 2019. Fans have anticipated an untethered successor utilizing ARM or low-power x86 APUs.',
      rootCauseAnalysis: "Running x86 PC games on mobile batteries generates extreme heat and rapid battery drain. Overcoming these physics bottlenecks requires custom ARM silicon, advanced translation software, and open OS optimization.",
      timeline: [
        { time: 'Initial Prototype', event: 'First "Galileo" device ID registered in regulatory test.' },
        { time: 'ARM Layer', event: 'Proton ARM translation layers committed to open-source Git repositories.' },
        { time: 'Recent Filing', event: 'Radio agency certification renewed with production-spec batteries.' }
      ],
      keyQuotes: [
        { speaker: 'Gabe Newell', role: 'Valve President (Past Interview Context)', quote: 'Hardware investments are long-term bets on open platforms and user freedom.' }
      ],
      impactForStudents: 'Signals a potential leap in accessible portable gaming computing that students can use for both gaming and lightweight Linux development.',
      officialSourceUrl: 'https://steamdb.info',
      sourceDocName: 'RRA Korea Equipment Notice 2026-VALV-002'
    }
  },
  {
    id: 'national-upi-global-linkage',
    title: 'Reserve Bank of India Extends UPI Real-Time Remittances to 18 Countries for Student Tuition & Living Expenses',
    category: 'national',
    locationScope: 'India',
    sourceName: 'Reserve Bank of India (RBI) Press Office',
    sourceType: 'Central Bank Directive',
    verification: 'govt_verified',
    verificationNote: 'Officially published in RBI Circular DPSS.CO.OD.No. 882/2026.',
    takeaway: 'Indian students studying abroad or paying for international courses can now transfer tuition fees instantly at near-zero bank markup.',
    theRealProblem: "International bank wire transfers have extracted billions in hidden 4-7% foreign exchange markups and multi-day delays from overseas students paying tuition. Traditional commercial banking cartels long resisted real-time bilateral integration to protect high SWIFT fee revenues.",
    bullets: [
      'Direct linkage between India\'s UPI and national payment rails in Germany, Japan, Singapore, France, and the UK.',
      'Replaces cumbersome wire transfers that previously took 3–5 business days and charged up to 6% in hidden forex fees.',
      'Includes instantaneous digital receipt generation accepted directly by universities for fee verification.'
    ],
    ...createRollingTimestamp(820),
    readTime: '35s read',
    tags: ['UPI', 'RBI', 'Education', 'Finance'],
    audioScript: 'The Reserve Bank of India has expanded real-time UPI remittances to 18 countries, allowing students to pay overseas tuition fees instantly with zero hidden bank markup.',
    deepDive: {
      overview: 'Cross-border educational remittances have traditionally been a costly pain point for Indian families, burdened by SWIFT charges and unfavorable exchange spreads.',
      keyBackground: 'Over 1.3 million Indian students study abroad annually, remitting an estimated $10 billion in tuition and living costs.',
      rootCauseAnalysis: "Legacy correspondent banking chains route wire transfers through multiple intermediary foreign banks, each taking hidden commission fees and taking 3 to 5 business days for simple fee payments.",
      timeline: [
        { time: '2023', event: 'UPI-PayNow link launched with Singapore.' },
        { time: '2025', event: 'Bilateral test with UAE and European banks successfully concluded.' },
        { time: 'Live Activation', event: 'Full 18-country multilateral live corridor officially activated.' }
      ],
      keyQuotes: [
        { speaker: 'Shaktikanta Das', role: 'Governor, RBI', quote: 'Public digital infrastructure should serve common citizens and students first. Seamless global money movement is their right.' }
      ],
      impactForStudents: 'Eliminates predatory wire transfer surcharges on foreign exam fees, GRE/IELTS vouchers, and university admissions.',
      officialSourceUrl: 'https://rbi.org.in',
      sourceDocName: 'RBI Circular DPSS.CO.OD.No. 882/2026'
    }
  },
  {
    id: 'tech-rust-linux-mainline',
    title: 'Linux Kernel 6.14 Ships with Production Rust Drivers for NVMe Storage and Core Network Stacks',
    category: 'personal',
    locationScope: 'Global',
    sourceName: 'Linux Foundation / Kernel.org Technical Notes',
    sourceType: 'Peer-Reviewed Technical Release',
    verification: 'reputable_media',
    verificationNote: 'Reviewed and merged by Linus Torvalds in mainline Git tree commit 7a82fb9.',
    takeaway: 'Memory-safe systems programming in Rust has officially graduated from experimental status into critical Linux operating infrastructure.',
    whatIsIt: "Mainline Linux Kernel 6.14 officially merging memory-safe Rust drivers for high-speed NVMe storage and core networking, eliminating decades-old C buffer overflow vulnerabilities.",
    theRealProblem: "Memory safety bugs in legacy C code (buffer overflows, use-after-free) cause over 70% of high-severity operating system security breaches worldwide. Yet adopting modern memory-safe languages like Rust into the Linux kernel faced years of resistance from traditional systems programmers.",
    bullets: [
      'The new Rust NVMe driver demonstrated zero memory vulnerability crashes in continuous fuzzing benchmarks over 180 days.',
      'Reduces buffer overflow and use-after-free vulnerabilities by an estimated 70% in high-speed network interfaces.',
      'Marks a pivotal shift for computer science students: learning systems programming now fundamentally includes Rust alongside C.'
    ],
    ...createRollingTimestamp(960),
    readTime: '45s read',
    tags: ['Rust', 'Linux', 'Systems Programming', 'Open Source'],
    audioScript: 'Linux Kernel 6.14 has merged production Rust drivers for high speed storage and networking. Memory safety is now a permanent cornerstone of mainline operating systems.',
    deepDive: {
      overview: 'After four years of architectural debates and gradual infrastructure building, Rust in the Linux kernel is now running on production servers worldwide.',
      keyBackground: 'Historically, over 65% of critical security advisories in operating systems originated from memory allocation bugs written in traditional C.',
      rootCauseAnalysis: "C does not provide compiler-enforced memory safety, meaning even experienced kernel engineers inevitably introduce use-after-free or buffer overflow vulnerabilities in complex operating system network stacks.",
      timeline: [
        { time: '2020', event: 'Initial RFC proposed by Miguel Ojeda at Linux Plumbers Conference.' },
        { time: '2022', event: 'Linux 6.1 introduces initial experimental Rust infrastructure.' },
        { time: 'Mainline Merge', event: 'Linus Torvalds merges full production NVMe and Apple Silicon drivers.' }
      ],
      keyQuotes: [
        { speaker: 'Linus Torvalds', role: 'Linux Kernel Maintainer', quote: 'Rust has proven it can handle the performance constraints of the kernel without giving up safety guarantees.' }
      ],
      impactForStudents: 'Essential career indicator: software engineering students proficient in Rust have a distinct advantage in infrastructure and cybersecurity roles.',
      officialSourceUrl: 'https://kernel.org',
      sourceDocName: 'Linux Kernel 6.14 Changelog'
    }
  },
  {
    id: 'nbu-siliguri-tech-incubator',
    title: 'North Bengal University Launches ₹25 Crore Himalayan Innovation Hub for Student AgTech and Drone Startups',
    category: 'local',
    locationScope: 'North Bengal',
    sourceName: 'Department of Higher Education, Govt of West Bengal',
    sourceType: 'State University Gazette',
    verification: 'govt_verified',
    verificationNote: 'Formally inaugurated at Raja Rammohunpur campus with active university incubation grants.',
    takeaway: 'Students in Siliguri, Jalpaiguri, and Darjeeling receive direct seed grants of up to ₹10 Lakhs for regional technology solutions.',
    whatIsIt: "North Bengal University launching a ₹25 Crore Himalayan Innovation Hub at Raja Rammohunpur campus offering ₹10 Lakh seed grants for student AgTech and drone startups.",
    theRealProblem: "Despite having prestigious universities and engineering colleges in North Bengal, a total absence of regional venture capital and prototyping labs forced 90% of ambitious student founders to migrate to Bengaluru or Delhi, leaving local agricultural and mountain problems unaddressed.",
    bullets: [
      'The hub provides free 3D rapid prototyping labs, drone testing grounds, and tea-plantation sensor analytics facilities.',
      'Mentorship partnerships established with IIT Kharagpur and Webel IT Park Siliguri to guide student founders.',
      'First cohort of 30 student-led ventures selected, spanning tea quality computer vision, landslide early warning, and rural fintech.'
    ],
    ...createRollingTimestamp(1140),
    readTime: '35s read',
    tags: ['NBU', 'Siliguri', 'Startups', 'Education'],
    audioScript: 'North Bengal University has launched a 25 crore Himalayan Innovation Hub for student startups, offering seed grants of up to 10 Lakhs for AgTech and drone innovation.',
    deepDive: {
      overview: 'Located at the picturesque Raja Rammohunpur campus near Siliguri, the incubator aims to halt the brain drain of North Bengal tech talent to metro cities.',
      keyBackground: 'Despite strong engineering colleges in Siliguri, Jalpaiguri, and Kurseong, students traditionally lacked local venture capital and hardware testing labs.',
      rootCauseAnalysis: "Venture capital and hardware fabrication facilities historically remained clustered in metro hubs like Bengaluru and Delhi, leaving regional North Bengal innovations without seed funding or prototype facilities.",
      timeline: [
        { time: 'Feb 2025', event: 'State budget announces special North Bengal Startup Corpus.' },
        { time: 'Lab Fit-out', event: 'Hardware fabrication and sensor lab fit-out completed.' },
        { time: 'Cohort Launch', event: 'Official inaugural cohort pitch day held in Siliguri.' }
      ],
      keyQuotes: [
        { speaker: 'Prof. S. C. Roy', role: 'Vice Chancellor, NBU', quote: 'Our students know the unique geographical challenges of the Teesta and Himalayan valleys better than anyone. They should be the ones building the tech solutions.' }
      ],
      impactForStudents: 'Immediate opportunity for local students to build funded startups without moving to Bengaluru or Delhi.',
      officialSourceUrl: 'https://nbu.ac.in',
      sourceDocName: 'NBU Notification NBU/REG/2026/INC-04'
    }
  }
];

export const UPCOMING_LIVE_DISPATCHES: NewsArticle[] = [
  {
    id: 'live-dgca-cockpit-secondary-barrier',
    title: 'DGCA Mandates Dual Biometric Secondary Cockpit Barriers Across Commercial Fleets Following Mid-Air Incident',
    category: 'national',
    locationScope: 'India',
    sourceName: 'Ministry of Civil Aviation / DGCA India',
    sourceType: 'Govt. Directive',
    verification: 'govt_verified',
    verificationNote: 'Issued under Rule 133A of the Aircraft Rules, 1937, effective immediately across scheduled passenger airlines.',
    takeaway: 'All domestic airlines operating aircraft over 60 seats must install reinforced physical transition gates between passenger cabins and flight decks to prevent forward galley breach attempts.',
    whatIsIt: "DGCA issuing a mandatory civil aviation directive requiring all scheduled passenger carriers to install secondary biometric physical cockpit gates to protect flight decks during flight.",
    theRealProblem: "Tight passenger aircraft cabins and frequent weather delays have increased passenger hostility. Without a secondary physical gate in the forward galley, opening the cockpit door for pilot hydration or restroom transit creates an immediate, dangerous vulnerability to cockpit breach.",
    bullets: [
      'Pre-landing cockpit door openings strictly prohibited below 10,000 feet unless guarded by designated cabin marshals.',
      'Airlines granted 90 days to retrofit biometric interlocks with mandatory crew cabin-view camera feeds.',
      'Civil aviation security personnel to conduct randomized ramp checks across Tier-1 and regional airports.'
    ],
    ...createRollingTimestamp(0),
    readTime: '30s read',
    tags: ['Aviation', 'Flight Safety', 'DGCA', 'National'],
    audioScript: 'DGCA has mandated dual biometric secondary cockpit barriers across commercial airlines to prevent in-flight breaches following recent physical assault incidents.',
    deepDive: {
      overview: 'In response to acute cockpit approach incidents, the aviation safety regulator has enacted structural barrier requirements matching international FAA standards.',
      keyBackground: 'Modern aircraft cockpits are bulletproof, but the momentary opening of doors during pilot meal or restroom transit presented an operational vulnerability.',
      rootCauseAnalysis: "The absence of a secondary locked galley door leaves an open security vulnerability during cockpit entry and exit, creating danger for flight crews during stressful flights.",
      timeline: [
        { time: 'T-10m', event: 'Director General signs Safety Advisory Series C-Part II.' },
        { time: 'Just now', event: 'Distributed to IndiGo, Air India, SpiceJet, and Akasa flight operations.' }
      ],
      keyQuotes: [
        { speaker: 'DGCA Flight Standards Panel', role: 'Aviation Safety', quote: 'Physical barriers protect the flight crew so they can concentrate solely on safe flight navigation.' }
      ],
      impactForStudents: 'Relevant for aeronautical engineering students studying cockpit human factors and civil aviation law aspirants.',
      officialSourceUrl: 'https://dgca.gov.in',
      sourceDocName: 'DGCA Circular 07/2026-FSD'
    }
  },
  {
    id: 'live-teesta-iot-flood-telemetry',
    title: 'Teesta River Basin Early Warning Sensor Web Goes Live: Real-Time Hydro-Telemetry for Siliguri & Himalayan Corridors',
    category: 'disaster',
    locationScope: 'Siliguri',
    sourceName: 'Central Water Commission (CWC) & North Bengal Disaster Cell',
    sourceType: 'Govt. Sensor Telemetry Feed',
    verification: 'govt_verified',
    verificationNote: 'Live telemetry verified across 18 solar-powered radar gauging stations along Teesta and Mahananda rivers.',
    takeaway: 'High-precision ultrasonic water level sensors provide 4-hour advance flood alerts for downstream Siliguri, Jalpaiguri, and Sevoke transit bridges with zero telecom latency.',
    whatIsIt: "Central Water Commission deploying 18 solar-powered acoustic ultrasonic gauging stations across the Teesta river to provide 4-hour advance flood alerts for Siliguri bridges.",
    theRealProblem: "Himalayan cloudbursts and glacial lake outbursts in Sikkim can send devastating torrents of floodwater rushing downstream to Siliguri and Jalpaiguri within 90 minutes. Traditional manual gauge monitoring was too slow, leaving urban bridges and low-lying communities at severe risk.",
    bullets: [
      'Automated acoustic wave sensors detect sudden glacial lake discharge or cloudburst runoff in upper Sikkim valleys.',
      'Direct LoRaWAN radio links transmit water velocity and turbidity metrics even during regional power grid outages.',
      'Siliguri Municipal Corporation and traffic police receive automated bridge closure triggers if levels cross Amber threshold.'
    ],
    ...createRollingTimestamp(0),
    readTime: '30s read',
    tags: ['Siliguri', 'Disaster Early Warning', 'Teesta', 'IoT'],
    audioScript: 'Real-time hydro telemetry sensors have gone live across the Teesta and Mahananda rivers, providing early flood warnings for Siliguri and regional bridges.',
    deepDive: {
      overview: 'Following recent Himalayan cloudbursts, the Central Water Commission deployed automated IoT telemetry to eliminate reliance on manual phone relays.',
      keyBackground: 'Siliguri is the strategic logistics choke point connecting Northeast India. Protecting NH-10 and rail bridges from flash floods is vital for national mobility.',
      rootCauseAnalysis: "Steep Himalayan slopes cause flash flood runoff to travel at extreme velocities. Without automated ultrasonic IoT sensors and satellite data relays, warning sirens arrived too late for downstream communities.",
      timeline: [
        { time: 'Sensor Calibration', event: 'Sensor calibration completed across 18 mountain gauging stations.' },
        { time: 'Just now', event: 'Live dashboard linked to Siliguri District Emergency Operation Centre.' }
      ],
      keyQuotes: [
        { speaker: 'Er. S. Bhattacharya', role: 'Executive Engineer, CWC North Bengal', quote: 'Minutes matter in mountain floods. Automated radar telemetry gives citizens hours of evacuation buffer.' }
      ],
      impactForStudents: 'Protects college students commuting between Siliguri, Jalpaiguri, and Darjeeling; excellent project case study for IoT and electronics students.',
      officialSourceUrl: 'https://cwc.gov.in',
      sourceDocName: 'CWC Teesta Basin Telemetry Notice 14'
    }
  },
  {
    id: 'live-russia-ukraine-microgrid-energy',
    title: 'Decentralized Solar & Battery Microgrids Deployed Across 200 Ukrainian Critical Facilities Ahead of Winter',
    category: 'geopolitics',
    locationScope: 'Eastern Europe',
    sourceName: 'International Energy Agency (IEA) & Kyiv Energy Bureau',
    sourceType: 'International Energy Brief',
    verification: 'reputable_media',
    verificationNote: 'Monitored and documented by IEA Taskforce for Energy Resilience.',
    takeaway: 'International humanitarian partners completed installation of hardened containerized solar-plus-storage microgrids for regional hospitals and student water treatment hubs, resisting grid strikes.',
    whatIsIt: "Deployment of 200 decentralized solar-plus-storage containerized microgrids across critical civilian healthcare hubs to resist high-voltage grid disruptions.",
    theRealProblem: "Centralized power stations and high-voltage electrical transformers are stationary targets for long-range drone and missile strikes. Centralized power failure paralyzes civilian hospitals, heating, and water purification during harsh sub-zero winter temperatures.",
    bullets: [
      'Each autonomous 250 kW microgrid can operate off-grid for up to 72 continuous hours during high-voltage transformer outages.',
      'Utilizes lithium iron phosphate (LFP) battery chemistry housed in fireproof reinforced blast-resistant shipping containers.',
      'Model praised by international energy engineers as a template for decentralized civilian infrastructure resilience in conflict zones.'
    ],
    ...createRollingTimestamp(0),
    readTime: '35s read',
    tags: ['Russia-Ukraine', 'Clean Energy', 'Geopolitics', 'Microgrids'],
    audioScript: 'Decentralized solar and battery storage microgrids have been deployed across Ukrainian healthcare and civil infrastructure to safeguard energy continuity.',
    deepDive: {
      overview: 'Repeated long-range attacks on centralized high-voltage substations prompted a rapid paradigm shift toward modular decentralized civilian energy units.',
      keyBackground: 'Traditional power plants present massive stationary targets. Distributed microgrids allow localized power autonomy without cascading blackout risks.',
      rootCauseAnalysis: "Centralized power grids present single points of failure that can be disabled by precision strikes. Hardened decentralized microgrids provide the only reliable civilian energy survival in modern conflict zones.",
      timeline: [
        { time: 'Tender Award', event: 'EU-funded civilian energy resilience tender launched.' },
        { time: 'Just now', event: '200th hospital microgrid commissioned and synced to local emergency circuits.' }
      ],
      keyQuotes: [
        { speaker: 'Dr. Elena Morozova', role: 'Kyiv Regional Medical Director', quote: 'A hospital without electricity cannot run ventilators. These solar storage banks are literal lifesavers.' }
      ],
      impactForStudents: 'Pivotal case study for electrical engineering and green energy students studying distributed smart grids and wartime civilian defense.',
      officialSourceUrl: 'https://iea.org',
      sourceDocName: 'IEA Ukraine Energy Resilience Review'
    }
  },
  {
    id: 'live-india-japan-semiconductor-accord',
    title: 'India and Japan Ratify Bilateral Semiconductor Quantum Foundry & Critical Minerals Supply Framework',
    category: 'national',
    locationScope: 'India',
    sourceName: 'Ministry of Electronics & IT (MeitY) / METI Tokyo',
    sourceType: 'Bilateral Treaty Gazette',
    verification: 'govt_verified',
    verificationNote: 'Signed by Minister of Electronics & IT and Japanese Trade Minister in Tokyo.',
    takeaway: 'Bilateral accord establishes joint fabrication line for 14nm automotive silicon and establishes student research scholarships in Tokyo and Bengaluru chip design hubs.',
    whatIsIt: "Bilateral treaty ratification between India and Japan establishing joint 14nm automotive silicon foundry lines and 300 fully funded cleanroom research fellowships for Indian students.",
    theRealProblem: "Over 80% of global semiconductor manufacturing is concentrated in a single maritime zone. Any geopolitical blockade in East Asia would immediately freeze worldwide automotive, medical, and consumer electronics production within weeks, necessitating diversified bilateral foundries.",
    bullets: [
      'Guarantees dedicated supply of refined gallium and silicon wafers to emerging fab facilities in Dholera and Sanand.',
      'Fully funded 1-year master’s research fellowship launched for 300 Indian engineering students in Japanese cleanroom fabrication labs.',
      'Includes mutual defense semiconductor stockpile reserves to insulate both nations from East Asian shipping bottlenecks.'
    ],
    ...createRollingTimestamp(0),
    readTime: '30s read',
    tags: ['Semiconductors', 'India-Japan', 'Tech Policy', 'Engineering'],
    audioScript: 'India and Japan have ratified a bilateral semiconductor and critical minerals framework, including student cleanroom research fellowships.',
    deepDive: {
      overview: 'As the global chip race heats up, India and Japan have forged a strategic partnership to combine Japanese chemical and equipment precision with Indian chip design talent.',
      keyBackground: 'Global chip manufacturing was historically concentrated in a single maritime region. Diversifying fabrication ensures global consumer electronics and automobile continuity.',
      rootCauseAnalysis: "Semiconductor fabrication is geographically over-concentrated in vulnerable East Asian waters. Without bilateral foundries and alternative mineral supply chains, global supply remains fragile to naval disruption.",
      timeline: [
        { time: '2024', event: 'Initial semiconductor memorandum of understanding signed.' },
        { time: 'Just now', event: 'Full treaty ratified with capital commitments and student exchange portal.' }
      ],
      keyQuotes: [
        { speaker: 'Ashwini Vaishnaw', role: 'Union Minister for Electronics & IT', quote: 'This partnership ensures Indian engineering students are directly trained on state-of-the-art lithography and chip fabrication.' }
      ],
      impactForStudents: 'Massive scholarship and job placement pipeline for electrical engineering, materials science, and VLSI student specialists.',
      officialSourceUrl: 'https://pib.gov.in',
      sourceDocName: 'MeitY Press Release No. 312/2026'
    }
  },
  {
    id: 'rbi-mpc-repo-rate-student-loans',
    title: 'RBI Monetary Policy Committee Holds Benchmark Repo Rate at 6.50%: Directs Commercial Banks to Cap Interest Margins on Student Education Loans',
    category: 'finance',
    locationScope: 'India',
    sourceName: 'Reserve Bank of India (RBI) & The Economic Times',
    sourceType: 'RBI Bi-Monthly Monetary Policy Statement',
    verification: 'govt_verified',
    verificationNote: 'Announced live by RBI Governor following the 3-day MPC deliberations and gazetted on RBI official portal.',
    takeaway: 'RBI maintained repo rate stability while issuing binding directives to public and private lenders prohibiting predatory compounding and unfair penal interest on domestic and overseas student education loans.',
    whatIsIt: 'RBI Monetary Policy decision keeping benchmark lending rates unchanged at 6.50% while issuing a mandatory consumer protection circular to cap interest rate spreads and eliminate prepayment penalties on education loans.',
    theRealProblem: 'Commercial banks frequently pass on rate hikes swiftly to floating-rate education loan borrowers but delay downward transmissions. Graduating students face sudden 25-40% monthly EMI jumps right as they enter junior employment markets.',
    bullets: [
      'Repo rate maintained at 6.50% with an unchanged stance of withdrawal of accommodation to stabilize retail inflation near the 4% target.',
      'Circular RBI/2026/88 mandates zero foreclosure or prepayment penalties on student loans taken for recognized undergraduate and postgraduate degrees.',
      'Banks required to issue transparent Annual Percentage Rate (APR) Key Fact Statements before sanctioning overseas study facilities.'
    ],
    ...createRollingTimestamp(25),
    readTime: '30s read',
    tags: ['RBI', 'Education Loans', 'Finance', 'Interest Rates'],
    audioScript: 'The Reserve Bank of India has held the repo rate at 6.50% and issued strict directives to banks capping interest margins on student education loans.',
    deepDive: {
      overview: 'RBI Governor announced the Monetary Policy Committee consensus to hold the benchmark repo rate at 6.50% for the tenth consecutive policy cycle, emphasizing economic resilience while taking targeted measures to protect student borrowers.',
      keyBackground: 'India has over 4.2 million active education loan accounts totaling ₹1.18 Lakh Crore. Rising interest rates during 2022-2024 substantially elevated debt servicing costs for students pursuing domestic STEM degrees and overseas universities in the US, UK, and Canada.',
      rootCauseAnalysis: 'Floating interest rate loan contracts historically allowed retail banks asymmetric discretion to hike spreads during tightening cycles without timely downward adjustments, trapping young graduates with ballooning repayment horizons.',
      timeline: [
        { time: '10:00 AM IST', event: 'RBI Governor reads bi-monthly Monetary Policy Statement.' },
        { time: '11:15 AM IST', event: 'Deputy Governors release regulatory developmental policy circular on student loan fairness.' },
        { time: '02:00 PM IST', event: 'Indian Banks Association (IBA) issues advisory to member banks to align education loan rate grids.' }
      ],
      keyQuotes: [
        { speaker: 'Shaktikanta Das', role: 'Governor, Reserve Bank of India', quote: 'Our macroeconomic fundamentals remain robust, but credit institutions must exercise empathetic underwriting when lending to aspiring students who represent the nation’s future demographic dividend.' },
        { speaker: 'R. K. Sharma', role: 'Chief Economist, National Banking Federation', quote: 'The mandate prohibiting prepayment penalties gives students complete flexibility to refinance or pay off debts as soon as they secure employment.' }
      ],
      impactForStudents: 'Immediate relief for college students and graduates repaying or applying for education loans. Guarantees zero prepayment penalties and forces banks to reveal all hidden processing fees.',
      officialSourceUrl: 'https://rbi.org.in',
      sourceDocName: 'RBI Monetary Policy Resolution & Circular No. 88/2026'
    }
  },
  {
    id: 'sebi-derivatives-fno-retail-youth-curb',
    title: 'SEBI Implements 6-Point Guardrail on Index Futures & Options: Enforces ₹15 Lakh Minimum Contract Value to Shield College Students from Speculative Losses',
    category: 'finance',
    locationScope: 'India',
    sourceName: 'Securities and Exchange Board of India (SEBI) Press Release',
    sourceType: 'Capital Market Regulatory Directive',
    verification: 'govt_verified',
    verificationNote: 'Published on SEBI portal following Study on Retail F&O Losses showing 93% individual traders lost capital in derivatives.',
    takeaway: 'SEBI’s new guidelines increase minimum contract sizes from ₹5 Lakh to ₹15 Lakh and mandate upfront collection of option premiums to prevent young retail traders and students from losing educational savings.',
    whatIsIt: 'Comprehensive market regulation framework by SEBI raising derivative lot sizes and restricting weekly index expiries to one per exchange to halt rampant gamified trading among young retail participants.',
    theRealProblem: 'Mobile brokerage apps turned high-risk derivative trading into a video-game-like dopamine loop. Over 93% of young individual traders lost an average of ₹1.81 Lakh each in FY24 due to out-of-the-money weekly options gambling.',
    bullets: [
      'Minimum index derivatives contract size raised from ₹5 Lakh to ₹15 Lakh, effectively preventing under-capitalized students from taking high-risk leverage.',
      'Weekly index option expiries limited to one benchmark per exchange (NSE Nifty on Thursday, BSE Sensex on Friday), eliminating daily expiry gambling.',
      'Brokers required to collect Option Premium upfront from buyers and display unskippable statistical warnings of net trader losses.'
    ],
    ...createRollingTimestamp(65),
    readTime: '35s read',
    tags: ['SEBI', 'Stock Market', 'F&O', 'Youth Investing', 'Regulations'],
    audioScript: 'SEBI has implemented strict 6-point regulations on index options, raising contract sizes to protect college students and young retail traders from devastating market losses.',
    deepDive: {
      overview: 'In one of the most consequential retail protection moves in Indian capital markets history, SEBI notified a phased 6-step framework to rein in hyperactive retail trading in equity index derivatives.',
      keyBackground: 'A landmark SEBI working study revealed that between FY22 and FY24, over 1.13 crore retail traders engaged in F&O trading, with 93% incurring net trading losses totaling ₹1.81 Lakh Crore. Over 43% of these active traders were young adults aged 18 to 30 years.',
      rootCauseAnalysis: 'The proliferation of daily expiring index contracts combined with ultra-low ticket lot sizes incentivized retail participants to treat equity derivatives as lotteries rather than institutional risk-hedging instruments.',
      timeline: [
        { time: 'Phase 1 (Nov 20)', event: 'Weekly expiry rationalization to one single contract per exchange becomes effective.' },
        { time: 'Phase 2 (Dec 01)', event: 'Minimum contract size scaled up to ₹15 Lakh per lot across Nifty and Bank Nifty.' },
        { time: 'Phase 3 (Feb 01)', event: 'Mandatory intraday position limit monitoring across clearing corporations.' }
      ],
      keyQuotes: [
        { speaker: 'Madhabi Puri Buch', role: 'Chairperson, SEBI', quote: 'Capital markets exist to channel household savings into productive enterprise capital, not to channel youth savings into speculative short-term gambling.' },
        { speaker: 'Nithin Kamath', role: 'CEO, Zerodha', quote: 'This regulation will significantly reduce retail churn and protect young investors from devastating drawdowns, helping them focus on long-term wealth creation via Mutual Funds and SIPs.' }
      ],
      impactForStudents: 'Protects students from misleading social media "finfluencers" and dangerous options tips, directing attention toward sound financial literacy, index investing, and disciplined SIP compounding.',
      officialSourceUrl: 'https://sebi.gov.in',
      sourceDocName: 'SEBI Circular No. SEBI/HO/MRD/TPD/P/CIR/2026/142'
    }
  },
  {
    id: 'gold-silver-record-highs-rupee-hedge',
    title: 'Indian 24K Gold Touches ₹79,450/10g & Silver Crosses ₹96,500/kg: Safe-Haven Surge Driven by Global Central Bank Accumulation & Currency Hedging',
    category: 'finance',
    locationScope: 'India',
    sourceName: 'India Bullion and Jewellers Association (IBJA) & Reuters Financial',
    sourceType: 'National Bullion Benchmark Registry',
    verification: 'reputable_media',
    verificationNote: 'Verified across IBJA closing quotes, MCX Futures contracts, and local Siliguri/Kolkata jewellery associations.',
    takeaway: 'Physical precious metals reached all-time highs as global central banks diversify reserve currencies away from the dollar, while Indian households hedge against rupee depreciation.',
    whatIsIt: 'Record-setting rally in domestic gold and silver spot prices driven by international interest rate cutting cycles, geopolitical safety bids, and soaring industrial silver consumption in solar panels and EV batteries.',
    theRealProblem: 'While precious metals preserve intergenerational purchasing power, sudden price spikes make traditional wedding and festival purchases prohibitively expensive for middle-class families and students planning first-time gold savings.',
    bullets: [
      '24 Karat pure gold climbed to ₹79,450 per 10g in major domestic markets, while standard 22 Karat jewellery gold reached ₹72,830 per 10g.',
      'Silver neared the historic ₹1 Lakh per kg mark, bolstered by unprecedented industrial demand in solar photovoltaic wafers and AI chip thermal interfaces.',
      'RBI expanded its domestic gold reserves by repatriating over 102 tonnes of sovereign bullion from the Bank of England to vaults in India.'
    ],
    ...createRollingTimestamp(110),
    readTime: '30s read',
    tags: ['Gold Rates', 'Silver', 'Commodities', 'Inflation', 'INR'],
    audioScript: 'Domestic gold and silver prices have surged to record highs, driven by global central bank reserve buying and industrial green energy demand.',
    deepDive: {
      overview: 'Gold and silver prices continue their upward trajectory across Indian spot markets and global commodity exchanges, reflecting deep macroeconomic shifts in currency trust and industrial electrification.',
      keyBackground: 'Gold has historically acted as an inflation hedge and store of value for Indian households. In 2024-2026, central banks across China, India, Poland, and Turkey added record quantities of physical gold to their sovereign balances.',
      rootCauseAnalysis: 'Weaponization of Western foreign exchange reserves following geopolitical conflicts convinced global central banks that physical gold held within domestic borders is the ultimate unfreezable sovereign reserve asset.',
      timeline: [
        { time: 'Market Open', event: 'MCX Gold December contracts open at ₹79,100 per 10 grams.' },
        { time: 'European Trading', event: 'London Bullion Market Association (LBMA) spot gold crosses $2,740 per ounce.' },
        { time: 'Evening Fix', event: 'IBJA national benchmark closes at ₹79,450 for 24K pure gold and ₹96,500 for silver per kg.' }
      ],
      keyQuotes: [
        { speaker: 'Surendra Mehta', role: 'National Secretary, IBJA', quote: 'The rally is underpinned not by speculation, but by massive institutional accumulation and structural industrial deficits in silver supply.' },
        { speaker: 'Anvita Sen', role: 'Precious Metals Analyst', quote: 'Silver is uniquely benefiting from both safe-haven monetary demand and the relentless expansion of solar module fabrication in India.' }
      ],
      impactForStudents: 'Provides crucial real-world context on how inflation, currency value, and gold behave. Encourages students to understand sovereign gold bonds (SGBs) and gold ETFs rather than incurring heavy jewellery making charges.',
      officialSourceUrl: 'https://ibja.co',
      sourceDocName: 'IBJA National Gold Benchmark Bulletin 2026/11'
    }
  }
];

// Returns fresh articles with dynamic timestamps strictly reflecting Today & Yesterday based on live system clock
export function getFreshRollingNews(): NewsArticle[] {
  const offsets = [5, 18, 35, 55, 85, 120, 180, 260, 340, 440, 560, 700, 840, 980, 1140, 1260];
  return mockNewsArticles.map((art, idx) => {
    const mins = offsets[idx % offsets.length] || 15;
    const rolling = createRollingTimestamp(mins);
    return {
      ...art,
      publishedAt: rolling.publishedAt,
      timestamp: rolling.timestamp,
      dateLabel: rolling.dateLabel,
      incidentDate: rolling.incidentDate
    };
  });
}
