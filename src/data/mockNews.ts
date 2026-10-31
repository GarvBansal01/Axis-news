import { NewsArticle } from '../types';

export const mockNewsArticles: NewsArticle[] = [
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
    bullets: [
      'Active daily users surged past 600 million globally within 90 days, breaking historical consumer technology adoption records.',
      'The heated debate centers on whether closed corporate AI labs or open-source weights should control the next era of frontier intelligence.',
      'Educational institutions in 40+ countries are rewriting computer science curricula to focus on agent orchestration rather than legacy syntax memorization.'
    ],
    publishedAt: '1 hour ago',
    readTime: '45s read',
    tags: ['Google', 'AI Frontier', 'Global Tech', 'Developer Debate'],
    audioScript: 'Google has unveiled its latest next-generation frontier AI architecture, crossing 600 million weekly active users. The release has sparked a fierce worldwide debate among scientists and developers on the future of software engineering and open source access.',
    deepDive: {
      overview: 'The announcement marks a historic inflection point in consumer AI adoption, showcasing autonomous multimodal reasoning capabilities that can plan, execute, and verify code across complex system architectures without human intervention.',
      keyBackground: 'Since late 2023, the global artificial intelligence arms race has seen Silicon Valley giants and international challengers compete for compute supremacy, shifting from simple text generation to real-time agentic execution.',
      timeline: [
        { time: 'June 2025', event: 'Initial multi-agent reasoning benchmarks published at NeurIPS.' },
        { time: 'August 2026', event: 'Global developer beta opens across 160 countries.' },
        { time: 'October 2026', event: 'Official worldwide rollout achieves 600M active user milestone.' }
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
    verificationNote: 'Officially audited by Ministry of Civil Aviation inspection team on Oct 28, 2026.',
    takeaway: 'North Bengal\'s primary aviation hub is expanding to handle 10 million annual passengers with direct Southeast Asian flight corridors.',
    bullets: [
      'New terminal spans 100,000 sq. meters with 16 aero-bridges, modern cargo logistics, and dedicated transit corridors to Darjeeling and Sikkim.',
      'Projected to boost Siliguri\'s regional GDP by 18% through accelerated tourism, IT services, and student exchange mobility.',
      'Target trial commissioning set for Q3 2027, with night landing CAT-II ILS instrument updates already operational.'
    ],
    publishedAt: '2 hours ago',
    readTime: '45s read',
    tags: ['Siliguri', 'Infrastructure', 'Aviation', 'North Bengal'],
    audioScript: 'Bagdogra International Airport expansion has reached 45 percent milestone ahead of schedule. The new terminal will expand capacity to 10 million passengers annually, connecting Siliguri to international student and commercial corridors.',
    deepDive: {
      overview: 'The Bagdogra Airport modernization project represents the single largest civil aviation investment in North Bengal history, addressing severe terminal congestion and opening international connections.',
      keyBackground: 'Currently operating at over 250% design capacity, Bagdogra handled 3.2 million travelers in 2025 despite single-runway and apron bottlenecks.',
      timeline: [
        { time: 'March 2024', event: 'Central Cabinet sanctions ₹1,549 Crore for phase 1 construction.' },
        { time: 'January 2026', event: 'Substructure piling completed across 16 boarding gates.' },
        { time: 'October 2026', event: 'AAI reports 45% structural completion; runway expansion verified.' },
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
    bullets: [
      'Sets mandatory pre-deployment testing for models exceeding 10^26 FLOPs compute training runs.',
      'Explicitly bars monopolistic cloud vendors from outlawing open-source local model fine-tuning.',
      'Establishes an International Scientific Panel on Frontier AI modeled on the IPCC climate body.'
    ],
    publishedAt: '3 hours ago',
    readTime: '40s read',
    tags: ['UN', 'AI Policy', 'Open Source', 'Global Treaty'],
    audioScript: '64 nations in Geneva have signed the Global AI Safety Compact. Crucially, the agreement safeguards open-source software and student research from regulatory capture.',
    deepDive: {
      overview: 'After two years of intense debate between closed-source lobbyists and academic coalitions, the Geneva treaty enshrines a balanced approach to synthetic safety and open science.',
      keyBackground: 'Smaller nations and independent developers feared that aggressive frontier licensing would concentrate AI ownership entirely inside four Silicon Valley corporations.',
      timeline: [
        { time: 'Nov 2023', event: 'Bletchley Park declaration initiates multilateral discussions.' },
        { time: 'Feb 2026', event: 'Seoul Ministerial draft emphasizes open-source protections.' },
        { time: 'Oct 2026', event: 'Geneva Compact ratified by 64 delegations.' }
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
    bullets: [
      'Global trailer views officially crossed 420 million across YouTube and social platforms, the highest in human media history.',
      'Engineered with proprietary neural animation physics and dynamic weather simulations powered by modern GPU ray-tracing.',
      'Industry experts debate whether mega-budget blockbusters are crowding out smaller creative indie developers.'
    ],
    publishedAt: '4 hours ago',
    readTime: '40s read',
    tags: ['GTA 6', 'Gaming Industry', 'Take-Two', 'Global Entertainment'],
    audioScript: 'Grand Theft Auto VI has reaffirmed its global release window. With an estimated two billion dollar budget, it has broken world records for trailer views while sparking debates on the future of gaming development.',
    deepDive: {
      overview: 'GTA VI represents the pinnacle of interactive entertainment production, utilizing groundbreaking computational physics and machine-learning NPC behavioral routines.',
      keyBackground: 'Grand Theft Auto V generated over $8 billion in revenue over 13 years, making its successor the most anticipated media release in global history.',
      timeline: [
        { time: 'Dec 2023', event: 'First official trailer breaks Guinness World Record for 24-hour views.' },
        { time: 'May 2026', event: 'Take-Two confirms final polishing phase across Sony and Microsoft platforms.' },
        { time: 'October 2026', event: 'Global marketing campaign commences worldwide.' }
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
    bullets: [
      'The compute capacity combines NVIDIA H100s and custom indigenous accelerators hosted across Tier-4 Indian data centers.',
      'Colleges and polytechnic institutes in non-metro hubs (including West Bengal, Assam, and Bihar) receive a guaranteed 35% quota.',
      'Applications open via DigiLocker student credentials; grants up to 500 GPU-hours per verified student project.'
    ],
    publishedAt: '5 hours ago',
    readTime: '40s read',
    tags: ['AI Mission', 'Supercomputing', 'Students', 'Open Source'],
    audioScript: 'India AI Mission has opened its 10,000 GPU compute cluster for college students and researchers. Verified students can apply for up to 500 free GPU hours for machine learning and AI research projects.',
    deepDive: {
      overview: 'The ₹10,372 crore IndiaAI Mission aims to eliminate compute inequality, allowing students outside elite institutes to train state-of-the-art foundation models.',
      keyBackground: 'Historically, access to high-end compute was monopolized by venture-backed startups and private Western clouds, limiting Indian academic contributions.',
      timeline: [
        { time: 'July 2025', event: 'IndiaAI Mission tenders finalized with cloud partners.' },
        { time: 'August 2026', event: 'Phase 1 cluster of 5,000 nodes goes live at CDAC Pune.' },
        { time: 'October 2026', event: 'Phase 2 student portal launched with DigiLocker authentication.' }
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
    bullets: [
      'Driven by massive battery storage breakthroughs and high-speed regional grid interconnectors in India, China, and the European Union.',
      'Global carbon emissions from electricity generation dropped by 4.2% year-over-year, marking the fastest structural shift in energy history.',
      'Creates over 4 million new green-engineering jobs globally, with major hiring surges in power electronics and battery chemistry.'
    ],
    publishedAt: '6 hours ago',
    readTime: '40s read',
    tags: ['Clean Energy', 'IEA', 'Climate Tech', 'Global Economy'],
    audioScript: 'In a historic global milestone, renewable wind and solar energy have officially overtaken coal in worldwide electricity production according to the International Energy Agency.',
    deepDive: {
      overview: 'For over 150 years since the industrial revolution, coal formed the backbone of global electricity. In 2026, falling battery storage prices and solar scaling permanently flipped the balance.',
      keyBackground: 'Solar PV installation costs plummeted 88% over the past decade, making new solar farms cheaper to build than simply operating existing coal plants.',
      timeline: [
        { time: '2020', event: 'Solar becomes cheapest electricity in history according to IEA.' },
        { time: '2024', event: 'Renewables match coal generation capacity.' },
        { time: 'Late 2026', event: 'Actual kilowatt-hour production officially surpasses coal globally.' }
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
    bullets: [
      'The greenfield alignment bypasses congested urban choke points in Kishanganj and Islampur with high-speed 120 km/h design.',
      'Special elevated wildlife corridors over the Mahananda wildlife fringe to ensure zero elephant-path disruption.',
      'Expected to cut freight transit costs by 22% and attract automated distribution centers to the Siliguri periphery.'
    ],
    publishedAt: '7 hours ago',
    readTime: '35s read',
    tags: ['Siliguri', 'Highways', 'Connectivity', 'Economy'],
    audioScript: 'The 519 kilometer Siliguri-Gorakhpur expressway has entered final paving. It cuts transit times to six hours, boosting regional commerce and student logistics throughout North Bengal.',
    deepDive: {
      overview: 'The expressway forms a crucial segment of the PM Gati Shakti National Master Plan, connecting the eastern Himalayan foothills directly to northern logistics networks.',
      keyBackground: 'NH-31 and NH-27 had long suffered from severe monsoon bottlenecks and single-lane bridges, paralyzing freight into the Northeast.',
      timeline: [
        { time: '2022', event: 'Feasibility study and environmental clearance approved.' },
        { time: '2024', event: 'Land compensation awarded to 14,000 landholders in WB & Bihar.' },
        { time: 'Late 2026', event: '82% of bridges and overpasses structural work completed.' }
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
    bullets: [
      'Regulatory filing mentions 6 GHz Wi-Fi 7 radio modules and a dual-display optical calibration rig.',
      'Datamines in latest SteamVR beta reveal code strings referencing "Deckard_Onboarding" and ARM-native Proton translation.',
      'Industry analysts predict a potential 2027 standalone gaming device capable of running lightweight PC titles untethered.'
    ],
    publishedAt: '8 hours ago',
    readTime: '30s read',
    tags: ['Gaming', 'Valve', 'Hardware', 'SteamVR'],
    audioScript: 'Regulatory filings in Asia suggest Valve is developing a new standalone SteamOS hardware device. Note that this is currently an unverified industry leak.',
    deepDive: {
      overview: 'While the Steam Deck proved SteamOS could run PC games portably, dataminers have long sought proof of Valve\'s standalone VR / hybrid console ambitions.',
      keyBackground: 'Valve Index remains tethered to PCs since 2019. Fans have anticipated an untethered successor utilizing ARM or low-power x86 APUs.',
      timeline: [
        { time: 'Sept 2023', event: 'First "Galileo" device ID registered in regulatory test.' },
        { time: 'June 2026', event: 'Proton ARM translation layers committed to open-source Git repositories.' },
        { time: 'Oct 2026', event: 'Radio agency certification renewed with production-spec batteries.' }
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
    bullets: [
      'Direct linkage between India\'s UPI and national payment rails in Germany, Japan, Singapore, France, and the UK.',
      'Replaces cumbersome wire transfers that previously took 3–5 business days and charged up to 6% in hidden forex fees.',
      'Includes instantaneous digital receipt generation accepted directly by universities for fee verification.'
    ],
    publishedAt: '10 hours ago',
    readTime: '35s read',
    tags: ['UPI', 'RBI', 'Education', 'Finance'],
    audioScript: 'The Reserve Bank of India has expanded real-time UPI remittances to 18 countries, allowing students to pay overseas tuition fees instantly with zero hidden bank markup.',
    deepDive: {
      overview: 'Cross-border educational remittances have traditionally been a costly pain point for Indian families, burdened by SWIFT charges and unfavorable exchange spreads.',
      keyBackground: 'Over 1.3 million Indian students study abroad annually, remitting an estimated $10 billion in tuition and living costs.',
      timeline: [
        { time: '2023', event: 'UPI-PayNow link launched with Singapore.' },
        { time: '2025', event: 'Bilateral test with UAE and European banks successfully concluded.' },
        { time: 'October 2026', event: 'Full 18-country multilateral live corridor officially activated.' }
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
    bullets: [
      'The new Rust NVMe driver demonstrated zero memory vulnerability crashes in continuous fuzzing benchmarks over 180 days.',
      'Reduces buffer overflow and use-after-free vulnerabilities by an estimated 70% in high-speed network interfaces.',
      'Marks a pivotal shift for computer science students: learning systems programming now fundamentally includes Rust alongside C.'
    ],
    publishedAt: '12 hours ago',
    readTime: '45s read',
    tags: ['Rust', 'Linux', 'Systems Programming', 'Open Source'],
    audioScript: 'Linux Kernel 6.14 has merged production Rust drivers for high speed storage and networking. Memory safety is now a permanent cornerstone of mainline operating systems.',
    deepDive: {
      overview: 'After four years of architectural debates and gradual infrastructure building, Rust in the Linux kernel is now running on production servers worldwide.',
      keyBackground: 'Historically, over 65% of critical security advisories in operating systems originated from memory allocation bugs written in traditional C.',
      timeline: [
        { time: '2020', event: 'Initial RFC proposed by Miguel Ojeda at Linux Plumbers Conference.' },
        { time: '2022', event: 'Linux 6.1 introduces initial experimental Rust infrastructure.' },
        { time: 'October 2026', event: 'Linus Torvalds merges full production NVMe and Apple Silicon drivers.' }
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
    verificationNote: 'Formally inaugurated at Raja Rammohunpur campus on October 25, 2026.',
    takeaway: 'Students in Siliguri, Jalpaiguri, and Darjeeling receive direct seed grants of up to ₹10 Lakhs for regional technology solutions.',
    bullets: [
      'The hub provides free 3D rapid prototyping labs, drone testing grounds, and tea-plantation sensor analytics facilities.',
      'Mentorship partnerships established with IIT Kharagpur and Webel IT Park Siliguri to guide student founders.',
      'First cohort of 30 student-led ventures selected, spanning tea quality computer vision, landslide early warning, and rural fintech.'
    ],
    publishedAt: '14 hours ago',
    readTime: '35s read',
    tags: ['NBU', 'Siliguri', 'Startups', 'Education'],
    audioScript: 'North Bengal University has launched a 25 crore Himalayan Innovation Hub for student startups, offering seed grants of up to 10 Lakhs for AgTech and drone innovation.',
    deepDive: {
      overview: 'Located at the picturesque Raja Rammohunpur campus near Siliguri, the incubator aims to halt the brain drain of North Bengal tech talent to metro cities.',
      keyBackground: 'Despite strong engineering colleges in Siliguri, Jalpaiguri, and Kurseong, students traditionally lacked local venture capital and hardware testing labs.',
      timeline: [
        { time: 'Feb 2025', event: 'State budget announces special North Bengal Startup Corpus.' },
        { time: 'June 2026', event: 'Hardware fabrication and sensor lab fit-out completed.' },
        { time: 'October 2026', event: 'Official inaugural cohort pitch day held in Siliguri.' }
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
