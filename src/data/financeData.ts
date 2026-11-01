import { StockQuote, CommodityRate, CurrencyRate, IPOItem } from '../types';

export const STOCK_QUOTES: StockQuote[] = [
  // Key Indices
  {
    symbol: 'NIFTY 50',
    name: 'National Stock Exchange Benchmark Index',
    price: 24180.80,
    currency: '₹',
    change: 156.40,
    changePercent: 0.65,
    market: 'NSE',
    dayHigh: 24245.30,
    dayLow: 24090.15,
    volume: '28.4 Cr',
    category: 'Key Index',
    sparkline: [24090, 24110, 24150, 24130, 24190, 24160, 24180.8]
  },
  {
    symbol: 'SENSEX',
    name: 'BSE 30 Premier Blue-chip Benchmark',
    price: 79402.30,
    currency: '₹',
    change: 458.70,
    changePercent: 0.58,
    market: 'BSE',
    dayHigh: 79620.00,
    dayLow: 79150.40,
    volume: '14.2 Cr',
    category: 'Key Index',
    sparkline: [79150, 79240, 79350, 79280, 79420, 79380, 79402.3]
  },
  {
    symbol: 'BANK NIFTY',
    name: 'Nifty Banking Sector 12 Heavyweights',
    price: 51620.10,
    currency: '₹',
    change: 215.30,
    changePercent: 0.42,
    market: 'NSE',
    dayHigh: 51780.00,
    dayLow: 51430.20,
    volume: '18.9 Cr',
    category: 'Key Index',
    sparkline: [51430, 51490, 51580, 51540, 51650, 51600, 51620.1]
  },

  // Indian Bluechips & Gen-Z Tech Favorites
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd (Energy & Jio)',
    price: 2695.50,
    currency: '₹',
    change: 24.80,
    changePercent: 0.93,
    market: 'NSE',
    dayHigh: 2712.00,
    dayLow: 2678.10,
    volume: '62.4 L',
    category: 'Indian Bluechips',
    sparkline: [2678, 2685, 2692, 2688, 2701, 2690, 2695.5]
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd (EV, Passenger & JLR)',
    price: 835.40,
    currency: '₹',
    change: -6.20,
    changePercent: -0.74,
    market: 'NSE',
    dayHigh: 846.50,
    dayLow: 831.00,
    volume: '88.1 L',
    category: 'Indian Bluechips',
    sparkline: [845, 842, 838, 836, 833, 837, 835.4]
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd (IT Services & Enterprise AI)',
    price: 1855.20,
    currency: '₹',
    change: 18.60,
    changePercent: 1.01,
    market: 'NSE',
    dayHigh: 1864.00,
    dayLow: 1840.50,
    volume: '44.3 L',
    category: 'Indian Bluechips',
    sparkline: [1840, 1845, 1850, 1848, 1860, 1853, 1855.2]
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd (Retail & Corporate Banking)',
    price: 1742.00,
    currency: '₹',
    change: 11.40,
    changePercent: 0.66,
    market: 'NSE',
    dayHigh: 1749.80,
    dayLow: 1732.00,
    volume: '1.12 Cr',
    category: 'Indian Bluechips',
    sparkline: [1732, 1736, 1740, 1738, 1745, 1740, 1742.0]
  },
  {
    symbol: 'ZOMATO',
    name: 'Zomato Ltd (Food Delivery & Blinkit)',
    price: 262.40,
    currency: '₹',
    change: 8.90,
    changePercent: 3.51,
    market: 'NSE',
    dayHigh: 266.00,
    dayLow: 254.20,
    volume: '3.4 Cr',
    category: 'Indian Bluechips',
    sparkline: [254, 256, 260, 258, 264, 261, 262.4]
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    price: 3980.50,
    currency: '₹',
    change: 32.10,
    changePercent: 0.81,
    market: 'NSE',
    dayHigh: 3995.00,
    dayLow: 3952.00,
    volume: '19.8 L',
    category: 'Indian Bluechips',
    sparkline: [3952, 3960, 3972, 3968, 3985, 3978, 3980.5]
  },

  // Global Tech / US Stocks (Gen-Z & Student Interest)
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation (AI Compute & GPUs)',
    price: 141.50,
    currency: '$',
    change: 3.32,
    changePercent: 2.40,
    market: 'NASDAQ',
    dayHigh: 142.80,
    dayLow: 138.60,
    volume: '54.2 M',
    category: 'Global Tech',
    sparkline: [138.6, 139.4, 140.2, 139.8, 141.9, 141.0, 141.5]
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc. (Apple Intelligence & Devices)',
    price: 232.80,
    currency: '$',
    change: 1.85,
    changePercent: 0.80,
    market: 'NASDAQ',
    dayHigh: 234.10,
    dayLow: 231.20,
    volume: '41.8 M',
    category: 'Global Tech',
    sparkline: [231.2, 231.8, 232.4, 232.0, 233.5, 232.5, 232.8]
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. (Google Search & DeepMind)',
    price: 171.20,
    currency: '$',
    change: 1.90,
    changePercent: 1.12,
    market: 'NASDAQ',
    dayHigh: 172.50,
    dayLow: 169.80,
    volume: '26.4 M',
    category: 'Global Tech',
    sparkline: [169.8, 170.3, 170.9, 170.5, 171.8, 171.0, 171.2]
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation (Azure & OpenAI)',
    price: 428.10,
    currency: '$',
    change: 2.95,
    changePercent: 0.69,
    market: 'NASDAQ',
    dayHigh: 430.40,
    dayLow: 425.80,
    volume: '21.5 M',
    category: 'Global Tech',
    sparkline: [425.8, 426.5, 427.3, 427.0, 429.0, 427.8, 428.1]
  }
];

export const COMMODITY_RATES: CommodityRate[] = [
  {
    id: 'gold-24k',
    name: 'Gold (24 Karat · Pure 99.9%)',
    unit: 'per 10 Grams',
    priceINR: 79450,
    change: 350,
    changePercent: 0.44,
    purityOrSpec: '999 Fine Pure Bullion',
    cityBenchmark: 'Siliguri / Kolkata Benchmark (WB)',
    trend: 'up',
    description: 'Investment grade pure gold coins and bars. Excludes 3% GST and local making charges.'
  },
  {
    id: 'gold-22k',
    name: 'Gold (22 Karat · Standard 91.6%)',
    unit: 'per 10 Grams',
    priceINR: 72830,
    change: 320,
    changePercent: 0.44,
    purityOrSpec: 'BIS Hallmark 916 Standard',
    cityBenchmark: 'Siliguri & North Bengal Jewellers Association',
    trend: 'up',
    description: 'The standard purity used across Indian bridal and everyday jewellery. Subject to hallmark fee + 3% GST.'
  },
  {
    id: 'silver-kg',
    name: 'Silver (999 Fine Pure)',
    unit: 'per 1 Kilogram (1000g)',
    priceINR: 96500,
    change: 1200,
    changePercent: 1.26,
    purityOrSpec: '99.9% Fine Silver Bar',
    cityBenchmark: 'MCX Spot / West Bengal Benchmark',
    trend: 'up',
    description: 'Surging due to massive industrial demand for solar photovoltaic panels, electric vehicles, and semiconductors.'
  },
  {
    id: 'platinum-10g',
    name: 'Platinum (950 Purity)',
    unit: 'per 10 Grams',
    priceINR: 32400,
    change: -150,
    changePercent: -0.46,
    purityOrSpec: 'Pt 950 Certified',
    cityBenchmark: 'India Bullion & Jewellers Association (IBJA)',
    trend: 'down',
    description: 'Precious metal favored for understated rings and catalytic industrial applications.'
  },
  {
    id: 'diamond-solitaire',
    name: 'Diamond Benchmark (1.0 Carat Solitaire)',
    unit: 'per 1 Carat (0.20g)',
    priceINR: 485000,
    change: 0,
    changePercent: 0.00,
    purityOrSpec: 'Round Brilliant · VVS1 Clarity · E Color · Excellent Cut',
    cityBenchmark: 'GIA / Surat Diamond Bourse Benchmark',
    trend: 'flat',
    description: 'Benchmark certified natural solitaire. Lab-grown CVD equivalents trade at ~85% discount (₹55,000/ct).'
  },
  {
    id: 'brent-crude',
    name: 'Brent Crude Oil',
    unit: 'per Barrel (159 Litres)',
    priceINR: 6180, // ~$73.40 @ ₹84.18
    change: -45,
    changePercent: -0.72,
    purityOrSpec: 'Light Sweet Global Crude ($73.40/bbl)',
    cityBenchmark: 'Global Intercontinental Exchange (ICE)',
    trend: 'down',
    description: 'Directly impacts Indian petrol, diesel, logistics inflation, and airfare surcharges.'
  },
  {
    id: 'copper-mcx',
    name: 'Copper (Industrial Grade)',
    unit: 'per 1 Kilogram',
    priceINR: 815.50,
    change: 4.80,
    changePercent: 0.59,
    purityOrSpec: 'Grade A Cathodes',
    cityBenchmark: 'MCX Mumbai Spot',
    trend: 'up',
    description: 'Known as "Dr. Copper" as its price signals global manufacturing, electronics, and power grid health.'
  }
];

export const CURRENCY_RATES: CurrencyRate[] = [
  {
    code: 'USD',
    name: 'United States Dollar',
    symbol: '$',
    flag: '🇺🇸',
    rateToINR: 84.18,
    change24h: 0.08,
    changePercent: 0.10,
    studentTip: 'Crucial for US university applications, GRE ($220 ≈ ₹18,520), TOEFL ($205 ≈ ₹17,257), and GitHub/OpenAI subscriptions.'
  },
  {
    code: 'EUR',
    name: 'European Union Euro',
    symbol: '€',
    flag: '🇪🇺',
    rateToINR: 91.45,
    change24h: -0.12,
    changePercent: -0.13,
    studentTip: 'Relevant for Germany (TU9 universities), France, DAAD stipends, and Schengen visa requirements.'
  },
  {
    code: 'GBP',
    name: 'British Pound Sterling',
    symbol: '£',
    flag: '🇬🇧',
    rateToINR: 109.20,
    change24h: 0.25,
    changePercent: 0.23,
    studentTip: 'Key metric for UK master’s degrees (Russell Group), IELTS registration, and British Council certifications.'
  },
  {
    code: 'AED',
    name: 'United Arab Emirates Dirham',
    symbol: 'د.إ',
    flag: '🇦🇪',
    rateToINR: 22.92,
    change24h: 0.02,
    changePercent: 0.09,
    studentTip: 'Pegged to USD. Vital for family remittances from Dubai/Abu Dhabi and transit flights via Emirates/Flydubai.'
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: '🇨🇦',
    rateToINR: 60.65,
    change24h: -0.05,
    changePercent: -0.08,
    studentTip: 'Used for Canadian study permits, SDS college tuition, and mandatory GIC account deposits (C$20,635 ≈ ₹12.51 Lakh).'
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: '🇦🇺',
    rateToINR: 55.40,
    change24h: 0.14,
    changePercent: 0.25,
    studentTip: 'Key for Group of Eight Australian university admissions, Melbourne/Sydney living costs, and student visa subclass 500.'
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    flag: '🇸🇬',
    rateToINR: 63.85,
    change24h: 0.06,
    changePercent: 0.09,
    studentTip: 'Essential for NUS, NTU tech internships, ASEAN scholarships, and South-East Asia student exchanges.'
  },
  {
    code: 'JPY',
    name: 'Japanese Yen (per 100 ¥)',
    symbol: '¥',
    flag: '🇯🇵',
    rateToINR: 55.30, // 100 JPY = ₹55.30 (1 JPY = ₹0.553)
    change24h: -0.18,
    changePercent: -0.32,
    studentTip: 'Quoted per 100 Yen. Essential for MEXT Japanese government scholarships, Tokyo internships, and electronics imports.'
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan Renminbi',
    symbol: '¥',
    flag: '🇨🇳',
    rateToINR: 11.82,
    change24h: 0.01,
    changePercent: 0.08,
    studentTip: 'Key exchange rate for student hardware components, Arduino/Raspberry Pi boards, and Asian tech supply chains.'
  }
];

export const IPO_ITEMS: IPOItem[] = [
  {
    id: 'waaree-energies',
    companyName: 'Waaree Energies Ltd',
    sector: 'Solar PV Modules & Clean Energy',
    priceBand: '₹1,427 – ₹1,503',
    issueSize: '₹4,321 Crore',
    gmpPercent: 87.8,
    gmpPrice: 1320,
    dates: 'Listed on Oct 28, 2024',
    status: 'Recently Listed',
    minInvestment: '₹13,527 (9 Shares)',
    lotSize: 9,
    rating: 'Strong Demand'
  },
  {
    id: 'swiggy-ipo',
    companyName: 'Swiggy Limited',
    sector: 'Food Delivery & Quick Commerce (Instamart)',
    priceBand: '₹371 – ₹390',
    issueSize: '₹11,327 Crore',
    gmpPercent: 4.6,
    gmpPrice: 18,
    dates: 'Nov 06 – Nov 08, 2024',
    status: 'Upcoming',
    minInvestment: '₹14,820 (38 Shares)',
    lotSize: 38,
    rating: 'Moderate'
  },
  {
    id: 'ntpc-green-energy',
    companyName: 'NTPC Green Energy Ltd',
    sector: 'PSU Renewable Power Generation',
    priceBand: '₹102 – ₹108',
    issueSize: '₹10,000 Crore',
    gmpPercent: 11.1,
    gmpPrice: 12,
    dates: 'Nov 19 – Nov 22, 2024',
    status: 'Open Now',
    minInvestment: '₹14,904 (138 Shares)',
    lotSize: 138,
    rating: 'Strong Demand'
  },
  {
    id: 'hyundai-motor-india',
    companyName: 'Hyundai Motor India Ltd',
    sector: 'Automobile Manufacturing & SUVs',
    priceBand: '₹1,865 – ₹1,960',
    issueSize: '₹27,870 Crore',
    gmpPercent: -0.5,
    gmpPrice: -10,
    dates: 'Listed on Oct 22, 2024',
    status: 'Recently Listed',
    minInvestment: '₹13,720 (7 Shares)',
    lotSize: 7,
    rating: 'Cautious'
  },
  {
    id: 'zinka-logistics',
    companyName: 'Zinka Logistics Solutions (BlackBuck)',
    sector: 'Digital Trucking & Freight Logistics Platform',
    priceBand: '₹259 – ₹273',
    issueSize: '₹1,114 Crore',
    gmpPercent: 8.8,
    gmpPrice: 24,
    dates: 'Nov 13 – Nov 18, 2024',
    status: 'Upcoming',
    minInvestment: '₹14,742 (54 Shares)',
    lotSize: 54,
    rating: 'Moderate'
  }
];
