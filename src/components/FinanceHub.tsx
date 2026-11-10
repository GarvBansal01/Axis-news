import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Coins, 
  DollarSign, 
  Rocket, 
  BarChart3, 
  Calculator, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Info,
  ArrowRightLeft,
  Search
} from 'lucide-react';
import { STOCK_QUOTES, COMMODITY_RATES, CURRENCY_RATES, IPO_ITEMS } from '../data/financeData';
import { StockQuote, CommodityRate, CurrencyRate, IPOItem } from '../types';

type FinanceTab = 'stocks' | 'commodities' | 'currencies' | 'ipos';

export const FinanceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FinanceTab>('stocks');
  const [stockCategoryFilter, setStockCategoryFilter] = useState<'all' | 'Key Index' | 'Indian Bluechips' | 'Global Tech'>('all');
  const [searchStock, setSearchStock] = useState<string>('');

  // Currency Converter State
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [convertDirection, setConvertDirection] = useState<'foreignToINR' | 'inrToForeign'>('foreignToINR');

  const selectedCurrency = useMemo(() => {
    return CURRENCY_RATES.find(c => c.code === selectedCurrencyCode) || CURRENCY_RATES[0];
  }, [selectedCurrencyCode]);

  const convertedResult = useMemo(() => {
    if (!calcAmount || isNaN(calcAmount)) return 0;
    const rate = selectedCurrency.rateToINR;
    if (selectedCurrency.code === 'JPY') {
      // JPY is per 100 yen in the quote table (100 JPY = ₹55.30)
      const perOneYen = rate / 100;
      return convertDirection === 'foreignToINR' ? calcAmount * perOneYen : calcAmount / perOneYen;
    }
    return convertDirection === 'foreignToINR' ? calcAmount * rate : calcAmount / rate;
  }, [calcAmount, selectedCurrency, convertDirection]);

  // Filtered stocks
  const filteredStocks = useMemo(() => {
    return STOCK_QUOTES.filter(stock => {
      const matchesCategory = stockCategoryFilter === 'all' || stock.category === stockCategoryFilter;
      const matchesSearch = stock.symbol.toLowerCase().includes(searchStock.toLowerCase()) || 
                            stock.name.toLowerCase().includes(searchStock.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stockCategoryFilter, searchStock]);

  return (
    <div className="mb-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs">
      {/* ================= HEADER SECTION ================= */}
      <div className="p-4 md:p-6 border-b border-zinc-100 dark:border-zinc-900 bg-linear-to-b from-zinc-50/80 to-white dark:from-zinc-900/40 dark:to-zinc-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight text-zinc-950 dark:text-zinc-50">
                Finance & Rates Radar
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold animate-pulse">
                ● Live Desks
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Indian & Global Stocks · Siliguri/National Gold & Silver · Currency Exchange to INR · Primary IPO Watch
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>Quotes cached at IST Market Close</span>
            </span>
          </div>
        </div>

        {/* Live Running Marquee Ticker Strip */}
        <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-x-auto scrollbar-none flex items-center gap-4 text-xs font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">
            Pulse:
          </span>

          {/* NIFTY 50 */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">NIFTY 50</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">24,180.80</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center font-bold text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> +0.65%
            </span>
          </div>

          {/* SENSEX */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">SENSEX</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">79,402.30</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center font-bold text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> +0.58%
            </span>
          </div>

          {/* Gold 24K */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300">
            <span className="font-semibold">Gold 24K (10g)</span>
            <span className="font-bold">₹79,450</span>
            <span className="flex items-center font-bold text-[11px] text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3 h-3" /> +₹350
            </span>
          </div>

          {/* Silver */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Silver (1kg)</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">₹96,500</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center font-bold text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> +1.26%
            </span>
          </div>

          {/* USD / INR */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">1 USD</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">₹84.18</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center font-bold text-[11px]">
              <ArrowUpRight className="w-3 h-3" /> +0.10%
            </span>
          </div>

          {/* EUR / INR */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">1 EUR</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">₹91.45</span>
            <span className="text-rose-600 dark:text-rose-400 flex items-center font-bold text-[11px]">
              <ArrowDownRight className="w-3 h-3" /> -0.13%
            </span>
          </div>

          {/* IPO GMP */}
          <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-300">
            <span className="font-semibold">NTPC Green IPO</span>
            <span className="font-bold">GMP +11.1%</span>
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Open</span>
          </div>
        </div>
      </div>

      {/* ================= 4 DESK TABS SWITCHER ================= */}
      <div className="px-4 md:px-6 pt-3 pb-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('stocks')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'stocks'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Stocks & Key Indices</span>
          <span className="text-[10px] font-mono opacity-70">({STOCK_QUOTES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('commodities')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'commodities'
              ? 'bg-amber-500 text-white dark:bg-amber-400 dark:text-zinc-950 font-bold shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>Gold, Silver & Metals</span>
          <span className="text-[10px] font-mono opacity-70">({COMMODITY_RATES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('currencies')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'currencies'
              ? 'bg-emerald-600 text-white dark:bg-emerald-400 dark:text-zinc-950 font-bold shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Dollar & Currencies (INR)</span>
          <span className="text-[10px] font-mono px-1 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('ipos')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'ipos'
              ? 'bg-purple-600 text-white dark:bg-purple-400 dark:text-zinc-950 font-bold shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800'
          }`}
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>IPOs Radar</span>
          <span className="text-[10px] font-mono opacity-70">({IPO_ITEMS.length})</span>
        </button>
      </div>

      {/* ================= TAB 1: STOCKS & INDICES ================= */}
      {activeTab === 'stocks' && (
        <div className="p-4 md:p-6 space-y-4">
          {/* Sub Filters & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
              {(['all', 'Key Index', 'Indian Bluechips', 'Global Tech'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setStockCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    stockCategoryFilter === cat
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {cat === 'all' ? 'All Stocks' : cat}
                </button>
              ))}
            </div>

            <div className="relative max-w-xs">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchStock}
                onChange={(e) => setSearchStock(e.target.value)}
                placeholder="Filter NIFTY, Reliance, NVIDIA..."
                className="w-full pl-8 pr-3 py-1 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Stocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredStocks.map((stock) => {
              const isPositive = stock.change >= 0;
              return (
                <div
                  key={stock.symbol}
                  className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-zinc-950 dark:text-zinc-50">
                          {stock.symbol}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold">
                          {stock.market}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Vol: {stock.volume}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                      {stock.name}
                    </p>
                  </div>

                  {/* Price & Change */}
                  <div className="flex items-baseline justify-between pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
                    <div>
                      <span className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {stock.currency}{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className={`flex items-center gap-0.5 text-xs font-mono font-bold ${
                      isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                    </div>
                  </div>

                  {/* Day High / Day Low mini bar */}
                  <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between pt-0.5">
                    <span>L: {stock.currency}{stock.dayLow.toLocaleString('en-IN')}</span>
                    <div className="flex-1 mx-2 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div 
                        className={`h-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        style={{
                          width: `${Math.min(100, Math.max(10, ((stock.price - stock.dayLow) / (stock.dayHigh - stock.dayLow || 1)) * 100))}%`
                        }}
                      />
                    </div>
                    <span>H: {stock.currency}{stock.dayHigh.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Student Advisory Box on Stock Markets */}
          <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-200">Student & Gen-Z Wealth Rule:</strong>
              <p className="mt-0.5 leading-relaxed">
                93% of active retail derivative traders lose money (SEBI FY24 Data). For students, wealth is built through compounding broad-market index funds (NIFTY 50 / S&P 500) via monthly SIPs (Systematic Investment Plans) rather than intraday leverage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: GOLD, SILVER & COMMODITIES ================= */}
      {activeTab === 'commodities' && (
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                <span>Precious Metals & Stones Benchmark (Siliguri & National)</span>
              </h3>
              <p className="text-xs text-zinc-500">
                Official quotes sourced from India Bullion & Jewellers Association (IBJA) and regional merchant guilds.
              </p>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
              BIS Hallmark 916 & 999 Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {COMMODITY_RATES.map((item) => {
              const isUp = item.trend === 'up';
              const isDown = item.trend === 'down';
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-amber-400/50 dark:hover:border-amber-500/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-500">
                        <span>{item.unit}</span>
                        {item.purityOrSpec && (
                          <span className="px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            {item.purityOrSpec}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-lg font-bold text-zinc-950 dark:text-zinc-50">
                        ₹{item.priceINR.toLocaleString('en-IN')}
                      </div>
                      <div className={`text-xs font-mono font-bold flex items-center justify-end gap-0.5 ${
                        isUp ? 'text-emerald-600 dark:text-emerald-400' : isDown ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500'
                      }`}>
                        {isUp && <ArrowUpRight className="w-3.5 h-3.5" />}
                        {isDown && <ArrowDownRight className="w-3.5 h-3.5" />}
                        <span>{isUp ? '+' : ''}₹{item.change.toLocaleString('en-IN')} ({item.changePercent.toFixed(2)}%)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-2">
                    {item.description}
                  </p>

                  <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between pt-1">
                    <span>Benchmark: {item.cityBenchmark}</span>
                    <span className="text-zinc-500 font-medium">Excl. 3% GST</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gold Buying Fact for Students */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-950 dark:text-amber-100">Gold Buying Wisdom: 24K vs 22K</strong>
              <p className="mt-0.5 leading-relaxed">
                <strong>24K (99.9% Pure)</strong> is for pure investment bars/coins or Sovereign Gold Bonds (SGBs) where you don't pay 10-25% jeweller making charges. <strong>22K (91.6% BIS Hallmark)</strong> mixes 8.4% copper/silver alloy to provide structural hardness for wearable ornaments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: CURRENCY CONVERTER & INR RATES ================= */}
      {activeTab === 'currencies' && (
        <div className="p-4 md:p-6 space-y-6">
          {/* INTERACTIVE STUDENT CURRENCY TO RUPEE CALCULATOR */}
          <div className="p-4 md:p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
                  <Calculator className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold font-mono text-zinc-950 dark:text-zinc-50">
                    Interactive Student Currency Converter
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Instantly calculate foreign tuition fees, exam costs, and living stipends in Indian Rupees (INR)
                  </p>
                </div>
              </div>

              {/* Reverse direction toggle */}
              <button
                onClick={() => setConvertDirection(prev => prev === 'foreignToINR' ? 'inrToForeign' : 'foreignToINR')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span>{convertDirection === 'foreignToINR' ? 'Foreign → INR' : 'INR → Foreign'}</span>
              </button>
            </div>

            {/* Input & Output Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* Input side */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 block uppercase font-bold">
                  {convertDirection === 'foreignToINR' ? `Enter Amount (${selectedCurrency.code})` : 'Enter Amount in Indian Rupee (₹ INR)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-zinc-400">
                    {convertDirection === 'foreignToINR' ? selectedCurrency.symbol : '₹'}
                  </span>
                  <input
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(parseFloat(e.target.value) || 0)}
                    min="1"
                    className="w-full pl-8 pr-28 py-2.5 text-base font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  {/* Currency Picker Inside Input */}
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                    <select
                      value={selectedCurrencyCode}
                      onChange={(e) => setSelectedCurrencyCode(e.target.value)}
                      className="px-2 py-1 text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer focus:outline-none"
                    >
                      {CURRENCY_RATES.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.flag} {curr.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-500/20 flex flex-col justify-center">
                <span className="text-[11px] font-mono uppercase font-bold text-zinc-400">
                  {convertDirection === 'foreignToINR' ? 'Equivalent Value in Indian Rupees (₹)' : `Equivalent in ${selectedCurrency.name}`}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    {convertDirection === 'foreignToINR' 
                      ? `₹${convertedResult.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
                      : `${selectedCurrency.symbol}${convertedResult.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })} ${selectedCurrency.code}`}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                  Reference: 1 {selectedCurrency.code} = ₹{selectedCurrency.rateToINR} INR (RBI Reference)
                </span>
              </div>
            </div>

            {/* Quick Student Preset Chips */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                Student Quick Calculations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedCurrencyCode('USD'); setCalcAmount(220); setConvertDirection('foreignToINR'); }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer"
                >
                  🇺🇸 GRE Exam ($220)
                </button>
                <button
                  onClick={() => { setSelectedCurrencyCode('USD'); setCalcAmount(205); setConvertDirection('foreignToINR'); }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer"
                >
                  🇺🇸 TOEFL Exam ($205)
                </button>
                <button
                  onClick={() => { setSelectedCurrencyCode('CAD'); setCalcAmount(20635); setConvertDirection('foreignToINR'); }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer"
                >
                  🇨🇦 Canada GIC Account (C$20,635)
                </button>
                <button
                  onClick={() => { setSelectedCurrencyCode('GBP'); setCalcAmount(15000); setConvertDirection('foreignToINR'); }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer"
                >
                  🇬🇧 UK Tuition Fee (£15,000)
                </button>
                <button
                  onClick={() => { setSelectedCurrencyCode('EUR'); setCalcAmount(11208); setConvertDirection('foreignToINR'); }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer"
                >
                  🇩🇪 Germany Blocked Account (€11,208)
                </button>
                <button
                  onClick={() => { setSelectedCurrencyCode('AED'); setCalcAmount(1000); setConvertDirection('foreignToINR'); }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer"
                >
                  🇦🇪 Dubai Remittance (1,000 AED)
                </button>
              </div>
            </div>
          </div>

          {/* Complete Foreign Currency vs INR Rates Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
              Live Currency Exchange Rates Compared to Indian Rupee (₹ INR)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {CURRENCY_RATES.map((curr) => {
                const isUp = curr.change24h >= 0;
                return (
                  <div
                    key={curr.code}
                    className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500/40 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{curr.flag}</span>
                        <div>
                          <span className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">
                            1 {curr.code}
                          </span>
                          <span className="text-[11px] text-zinc-400 block line-clamp-1">
                            {curr.name}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-base text-zinc-950 dark:text-zinc-50">
                          ₹{curr.rateToINR.toFixed(2)}
                        </div>
                        <div className={`text-[10px] font-mono font-bold flex items-center justify-end ${
                          isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {isUp ? '+' : ''}{curr.change24h.toFixed(2)} ({isUp ? '+' : ''}{curr.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-2 leading-relaxed">
                      💡 <strong>Student Intel:</strong> {curr.studentTip}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: IPOS RADAR ================= */}
      {activeTab === 'ipos' && (
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" />
                <span>Indian Primary Market & IPO Radar</span>
              </h3>
              <p className="text-xs text-zinc-500">
                Track price bands, lot size minimums, subscription status, and live Grey Market Premium (GMP).
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20 font-semibold self-start sm:self-auto">
              SEBI ASBA / UPI Mandate
            </span>
          </div>

          <div className="space-y-3">
            {IPO_ITEMS.map((ipo) => {
              const isGmpPositive = ipo.gmpPrice >= 0;
              return (
                <div
                  key={ipo.id}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-purple-400/50 dark:hover:border-purple-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {ipo.companyName}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        ipo.status === 'Open Now'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 animate-pulse'
                          : ipo.status === 'Upcoming'
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                      }`}>
                        {ipo.status}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        {ipo.sector}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 flex-wrap">
                      <span>Price Band: <strong className="text-zinc-900 dark:text-zinc-100">{ipo.priceBand}</strong></span>
                      <span>•</span>
                      <span>Min Investment: <strong className="text-zinc-900 dark:text-zinc-100">{ipo.minInvestment}</strong></span>
                      <span>•</span>
                      <span>Issue Size: <strong>{ipo.issueSize}</strong></span>
                      <span>•</span>
                      <span>Timeline: {ipo.dates}</span>
                    </div>
                  </div>

                  {/* Right side: Live GMP Badge */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-zinc-100 dark:border-zinc-800">
                    <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-right min-w-[130px]">
                      <span className="text-[10px] font-mono text-zinc-400 block uppercase font-bold">
                        Grey Market Premium
                      </span>
                      <div className={`font-mono text-sm font-bold flex items-center justify-end gap-1 ${
                        isGmpPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {isGmpPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        <span>{isGmpPositive ? '+' : ''}₹{ipo.gmpPrice} ({ipo.gmpPercent}%)</span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-400 block">
                        Rating: {ipo.rating}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Student Guide on IPO Applications */}
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 space-y-1">
            <strong className="text-purple-950 dark:text-purple-100 flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
              How College Students Can Safely Apply for IPOs (ASBA via UPI):
            </strong>
            <p className="leading-relaxed">
              When applying for an Indian retail IPO (lot size ~₹14,000–₹15,000), your funds <strong>never leave your bank account</strong> until shares are officially allotted. The amount is simply placed on hold via UPI ASBA mandate. If not allotted, the hold is automatically released within 24–48 hours without any fees.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
