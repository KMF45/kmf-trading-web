import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { calculateLotSize } from '../utils/calculations';
import { CATEGORIES, ALL_INSTRUMENTS, CUSTOM_INSTRUMENT } from '../data/instruments';

const LEVERAGE_OPTIONS = [1, 2, 5, 10, 20, 25, 30, 50, 100, 200, 300, 400, 500];
const ACCOUNT_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD'];
const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CHF: 'CHF ', AUD: 'A$', CAD: 'C$', NZD: 'NZ$' };

const PAGE_TITLE = 'Free Lot Size Calculator — Forex, Crypto, Stocks, Indices | K.M.F.';
const PAGE_DESC = 'Calculate the perfect lot size for any trade. 340+ instruments, real-time exchange rates, risk management built in. Free, no signup required.';
const OG_IMAGE = 'https://kmfjournal.com/tools/og/lot-size-calculator.png';
const PAGE_URL = 'https://kmfjournal.com/tools/lot-size-calculator';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'favorites', label: 'Favorites' },
  { key: 'forex-majors', label: 'Majors' },
  { key: 'forex-crosses', label: 'Crosses' },
  { key: 'forex-exotics', label: 'Exotics' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'metals', label: 'Metals' },
  { key: 'indices', label: 'Indices' },
  { key: 'energy', label: 'Energy' },
  { key: 'stocks', label: 'Stocks' },
  { key: 'agriculture', label: 'Agriculture' },
  { key: 'bonds', label: 'Bonds' },
  { key: 'etfs', label: 'ETFs' },
];

// Fetch exchange rates (cached 1h in localStorage)
async function fetchExchangeRates() {
  const CACHE_KEY = 'kmf_exchange_rates';
  const CACHE_TTL = 3600000;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return data;
    }
  } catch {}
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const json = await res.json();
    if (json.result === 'success' && json.rates) {
      const rates = {};
      for (const [currency, rate] of Object.entries(json.rates)) {
        rates[`USD/${currency}`] = { rate };
        if (rate > 0) rates[`${currency}/USD`] = { rate: 1 / rate };
      }
      const crossPairs = [
        ['EUR','GBP'],['EUR','JPY'],['EUR','CHF'],['EUR','AUD'],['EUR','CAD'],['EUR','NZD'],
        ['GBP','JPY'],['GBP','CHF'],['GBP','AUD'],['GBP','CAD'],['GBP','NZD'],
        ['AUD','JPY'],['AUD','CHF'],['AUD','CAD'],['AUD','NZD'],
        ['NZD','JPY'],['NZD','CHF'],['NZD','CAD'],['CAD','JPY'],['CAD','CHF'],['CHF','JPY'],
      ];
      for (const [a, b] of crossPairs) {
        const rA = json.rates[a], rB = json.rates[b];
        if (rA && rB) { rates[`${a}/${b}`] = { rate: rB / rA }; rates[`${b}/${a}`] = { rate: rA / rB }; }
      }
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: rates, timestamp: Date.now() })); } catch {}
      return rates;
    }
  } catch {}
  return {};
}

/* ─── Risk Slider ─── */
function RiskSlider({ value, onChange }) {
  const color = value <= 2 ? '#00E676' : value <= 5 ? '#FFB300' : '#FF5252';
  const label = value <= 1 ? 'Conservative' : value <= 2 ? 'Standard' : value <= 5 ? 'Moderate' : 'Aggressive';
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-kmf-text-secondary">Risk per Trade</label>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>{label}</span>
          <div className="flex items-center bg-kmf-panel rounded-lg border border-white/5">
            <input type="number" value={value} onChange={e => onChange(Math.max(0.1, Math.min(100, parseFloat(e.target.value) || 0.1)))} className="w-16 bg-transparent text-right text-sm text-kmf-text-primary px-2 py-1 outline-none" step="0.1" min="0.1" max="100" />
            <span className="text-kmf-text-tertiary text-sm pr-2">%</span>
          </div>
        </div>
      </div>
      <input type="range" min="0.1" max="10" step="0.1" value={Math.min(value, 10)} onChange={e => onChange(parseFloat(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ background: 'linear-gradient(to right, #00E676 0%, #00E676 20%, #FFB300 50%, #FF5252 100%)', accentColor: color }} />
      <div className="flex justify-between text-[10px] text-kmf-text-tertiary mt-1"><span>0.1%</span><span>2%</span><span>5%</span><span>10%</span></div>
    </div>
  );
}

/* ─── Symbol Picker (inline dropdown panel) ─── */
function SymbolPickerPanel({ selected, onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kmf_fav_symbols') || '[]'); } catch { return []; }
  });
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const [highlightIdx, setHighlightIdx] = useState(-1);
  const listRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const handler = (e) => { if (panelRef.current && !panelRef.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && highlightIdx >= 0 && filtered[highlightIdx]) { onSelect(filtered[highlightIdx]); onClose(); }
    else if (e.key === 'Escape') onClose();
  }, [filtered, highlightIdx, onSelect, onClose]);

  useEffect(() => { setHighlightIdx(-1); }, [search, activeTab]);

  useEffect(() => {
    if (highlightIdx >= 0 && listRef.current) {
      const el = listRef.current.children[highlightIdx];
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIdx]);

  const toggleFav = (symbol) => {
    const next = favorites.includes(symbol) ? favorites.filter(s => s !== symbol) : [...favorites, symbol];
    setFavorites(next);
    try { localStorage.setItem('kmf_fav_symbols', JSON.stringify(next)); } catch {}
  };

  const filtered = useMemo(() => {
    let list;
    if (activeTab === 'all') list = ALL_INSTRUMENTS;
    else if (activeTab === 'favorites') list = ALL_INSTRUMENTS.filter(i => favorites.includes(i.symbol));
    else list = CATEGORIES[activeTab]?.instruments || [];

    if (search.trim()) {
      const q = search.replace('/', '').toLowerCase();
      list = list.filter(i => i.symbol.replace('/', '').toLowerCase().includes(q) || i.label.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeTab, favorites]);

  return (
    <div ref={panelRef} className="absolute z-50 left-0 right-0 mt-2 rounded-2xl overflow-hidden animate-fadeIn flex flex-col" style={{ background: 'rgba(15,17,21,0.98)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', maxHeight: 420 }}>
      {/* Search */}
      <div className="p-3 pb-0">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kmf-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input ref={inputRef} type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search 340+ instruments..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-kmf-panel text-kmf-text-primary outline-none placeholder:text-kmf-text-tertiary border border-white/5 focus:border-kmf-accent/30 transition-colors" />
        </div>
      </div>

      {/* Tabs (scrollable) */}
      <div className="flex gap-1 overflow-x-auto px-3 py-2 scrollbar-hide">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full transition-colors font-medium whitespace-nowrap"
            style={tab.key === activeTab
              ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' }
              : { color: '#8899A6' }}>
            {tab.label}{tab.key !== 'all' && tab.key !== 'favorites' && CATEGORIES[tab.key] ? ` ${CATEGORIES[tab.key].instruments.length}` : ''}
          </button>
        ))}
      </div>

      {/* List */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-2 pb-2" style={{ maxHeight: 300 }}>
        {filtered.length === 0 ? (
          <p className="text-center text-kmf-text-tertiary text-xs py-8">{activeTab === 'favorites' ? 'No favorites yet. Tap the heart to add.' : 'No instruments found'}</p>
        ) : filtered.map((inst, idx) => {
          const isFav = favorites.includes(inst.symbol);
          const isSel = selected?.symbol === inst.symbol;
          const isHl = idx === highlightIdx;
          const cat = Object.entries(CATEGORIES).find(([, c]) => c.instruments.includes(inst));
          const catColor = cat ? cat[1].color : '#4FC3F7';
          const catLabel = cat ? cat[1].label : '';
          return (
            <button key={inst.symbol} onClick={() => { onSelect(inst); onClose(); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 transition-all text-left hover:bg-white/[0.04]"
              style={isSel ? { background: 'rgba(79,195,247,0.08)' } : isHl ? { background: 'rgba(255,255,255,0.06)' } : {}}>
              {/* Favorite heart */}
              <span onClick={e => { e.stopPropagation(); toggleFav(inst.symbol); }} className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/5 cursor-pointer">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={isFav ? '#FF5252' : 'none'} stroke={isFav ? '#FF5252' : '#555'} strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </span>
              <span className="text-sm font-semibold text-kmf-text-primary w-24 flex-shrink-0">{inst.symbol}</span>
              <span className="text-xs text-kmf-text-tertiary flex-1 truncate">{inst.label !== inst.symbol ? inst.label : ''}</span>
              <span className="text-[10px] font-medium flex-shrink-0" style={{ color: catColor }}>{catLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Number Input ─── */
function NumberInput({ label, value, onChange, placeholder, suffix, step = 'any', min = 0 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-kmf-text-secondary mb-2">{label}</label>
      <div className="flex items-center rounded-xl overflow-hidden" style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <input type="number" inputMode="decimal" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} step={step} min={min} className="flex-1 bg-transparent px-4 py-3 text-sm text-kmf-text-primary outline-none placeholder:text-kmf-text-tertiary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
        {suffix && <span className="text-kmf-text-tertiary text-sm pr-4">{suffix}</span>}
      </div>
    </div>
  );
}

/* ─── Result Stat ─── */
function ResultStat({ label, value, sub, color = '#4FC3F7' }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: `${color}08`, border: `1px solid ${color}15` }}>
      <p className="text-[11px] text-kmf-text-tertiary mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold" style={{ color, letterSpacing: '-0.02em' }}>{value}</p>
      {sub && <p className="text-[10px] text-kmf-text-tertiary mt-0.5">{sub}</p>}
    </div>
  );
}

/* ─── FAQ Data ─── */
const FAQ_DATA = [
  { q: 'What is lot size in trading?', a: 'A lot is a standardized unit of measurement for a trading position. In forex, 1 standard lot = 100,000 units of the base currency. Mini lot = 10,000 units (0.1 lots), micro lot = 1,000 units (0.01 lots). Proper lot sizing is the foundation of risk management.' },
  { q: 'How do you calculate lot size?', a: 'Lot Size = Risk Amount ÷ (Stop Loss in Pips × Pip Value per Lot). First determine how much you\'re willing to risk (e.g., 1% of $10,000 = $100), then divide by the dollar value of your stop loss distance. This calculator automates the entire process.' },
  { q: 'What is the difference between standard, mini, and micro lots?', a: 'Standard lot = 1.00 (100,000 units), Mini lot = 0.10 (10,000 units), Micro lot = 0.01 (1,000 units). Smaller lots allow tighter risk control. Most brokers support micro lots (0.01) as the minimum.' },
  { q: 'Why does this calculator use truncation instead of rounding?', a: 'We truncate (floor) lot sizes to avoid over-risking. If the math says 0.837 lots, rounding up to 0.84 would increase your actual risk beyond your intended percentage. Truncating to 0.83 keeps you at or below your target risk — always.' },
  { q: 'What risk percentage should I use?', a: 'Professional traders typically risk 0.5%–2% per trade. The 1% rule is the industry standard: never risk more than 1% of your account on a single trade. Above 2% is moderate risk, above 5% is aggressive and not recommended.' },
  { q: 'How does leverage affect lot size?', a: 'Leverage doesn\'t change the lot size calculation — it affects margin required. With 1:100 leverage, a $100,000 position needs $1,000 margin instead of the full amount. Higher leverage means less margin, but your risk per pip stays the same.' },
];

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function LotCalculatorPage() {
  const [balance, setBalance] = useState('10000');
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [riskPercent, setRiskPercent] = useState(1.0);
  const [instrument, setInstrument] = useState(ALL_INSTRUMENTS[0]);
  const [isCustom, setIsCustom] = useState(false);
  const [customContract, setCustomContract] = useState('100000');
  const [customPipSize, setCustomPipSize] = useState('0.0001');
  const [customQuote, setCustomQuote] = useState('USD');
  const [entry, setEntry] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [leverage, setLeverage] = useState(100);
  const [exchangeRates, setExchangeRates] = useState({});
  const [ratesLoaded, setRatesLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [rateSource, setRateSource] = useState('loading');
  useEffect(() => {
    fetchExchangeRates().then(r => {
      setExchangeRates(r);
      setRatesLoaded(true);
      setRateSource(Object.keys(r).length > 20 ? 'live' : 'fallback');
    });
  }, []);

  // SEO
  useEffect(() => {
    document.title = PAGE_TITLE;
    const set = (s, a, v) => { const el = document.querySelector(s); if (el) el.setAttribute(a, v); };
    set('meta[name="description"]', 'content', PAGE_DESC);
    set('link[rel="canonical"]', 'href', PAGE_URL);
    set('meta[property="og:url"]', 'content', PAGE_URL);
    set('meta[property="og:title"]', 'content', PAGE_TITLE);
    set('meta[property="og:description"]', 'content', PAGE_DESC);
    set('meta[property="og:image"]', 'content', OG_IMAGE);
    set('meta[property="og:type"]', 'content', 'website');
    set('meta[name="twitter:image"]', 'content', OG_IMAGE);
    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      set('link[rel="canonical"]', 'href', 'https://kmfjournal.com/');
      set('meta[property="og:url"]', 'content', 'https://kmfjournal.com/');
    };
  }, []);

  const activeSymbol = useMemo(() => {
    if (isCustom) return { ...CUSTOM_INSTRUMENT, contractSize: parseFloat(customContract) || 100000, pipSize: parseFloat(customPipSize) || 0.0001, quoteCurrency: customQuote };
    return instrument;
  }, [isCustom, instrument, customContract, customPipSize, customQuote]);

  const result = useMemo(() => calculateLotSize({
    balance: parseFloat(balance) || 0, accountCurrency, riskPercent,
    entry: parseFloat(entry) || 0, stopLoss: parseFloat(stopLoss) || 0,
    takeProfit: takeProfit ? parseFloat(takeProfit) : null,
    symbol: activeSymbol, leverage, exchangeRates,
  }), [balance, accountCurrency, riskPercent, entry, stopLoss, takeProfit, activeSymbol, leverage, exchangeRates]);

  const hasResult = result.lotSize > 0 && !result.hasError;
  const cs = CURRENCY_SYMBOLS[accountCurrency] || accountCurrency + ' ';
  const trackedRef = useRef(false);
  useEffect(() => {
    if (hasResult && !trackedRef.current) {
      trackedRef.current = true;
      window.gtag?.('event', 'calculator_used', { instrument: activeSymbol.symbol, account_currency: accountCurrency });
    }
  }, [hasResult, activeSymbol.symbol, accountCurrency]);

  const handleReset = useCallback(() => {
    setBalance('10000'); setAccountCurrency('USD'); setRiskPercent(1.0);
    setInstrument(ALL_INSTRUMENTS[0]); setIsCustom(false);
    setEntry(''); setStopLoss(''); setTakeProfit(''); setLeverage(100);
    trackedRef.current = false;
  }, []);

  const handleCopyResults = useCallback(() => {
    if (!hasResult) return;
    const text = `Lot Size: ${result.lotSize.toFixed(2)} | Risk: ${cs}${result.riskAmount.toFixed(2)} | Pip Value: ${cs}${result.pipValue.toFixed(2)} | Margin: ${cs}${result.marginRequired.toFixed(2)} | SL: ${result.stopLossPips.toFixed(1)} pips${result.takeProfitPips > 0 ? ` | TP: ${result.takeProfitPips.toFixed(1)} pips | R:R 1:${result.riskRewardRatio.toFixed(2)}` : ''} — ${activeSymbol.symbol} | kmfjournal.com/tools/lot-size-calculator`;
    navigator.clipboard.writeText(text).catch(() => {});
    window.gtag?.('event', 'calculator_share', { instrument: activeSymbol.symbol });
  }, [hasResult, result, cs, activeSymbol.symbol]);

  return (
    <>
      <Navbar />

      {/* JSON-LD schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'K.M.F. Lot Size Calculator', url: PAGE_URL, description: PAGE_DESC, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, author: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_DATA.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com/' }, { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kmfjournal.com/tools' }, { '@type': 'ListItem', position: 3, name: 'Lot Size Calculator', item: PAGE_URL }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Lot Size for Trading', description: 'Calculate the correct position size using the lot size formula to manage risk properly.', step: [{ '@type': 'HowToStep', name: 'Enter your account balance and currency', text: 'Input your trading account balance and select the account currency (USD, EUR, GBP, etc.).' }, { '@type': 'HowToStep', name: 'Set your risk percentage', text: 'Choose how much of your account you want to risk per trade. The standard recommendation is 1-2%.' }, { '@type': 'HowToStep', name: 'Select the instrument', text: 'Pick the trading instrument from 340+ options across forex, crypto, stocks, indices, and commodities.' }, { '@type': 'HowToStep', name: 'Enter entry price and stop loss', text: 'Input your planned entry price and stop loss level. Optionally add a take profit target.' }, { '@type': 'HowToStep', name: 'Read the calculated lot size', text: 'The calculator instantly shows the optimal lot size, pip value, margin required, and risk/reward ratio.' }], tool: [{ '@type': 'HowToTool', name: 'K.M.F. Lot Size Calculator' }] }) }} />

      <main id="main-content" className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">Tools</span>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">Lot Size Calculator</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-10 animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              <span className="gradient-text">Lot Size</span>{' '}
              <span className="text-kmf-text-primary">Calculator</span>
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto text-lg">
              Calculate the exact position size for any trade across <strong className="text-kmf-text-primary">340+ instruments</strong>. Forex, crypto, stocks, indices, commodities — with real-time exchange rates.
            </p>
          </div>

          {/* ═══ CALCULATOR ═══ */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'rgba(26,29,36,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Top: Inputs + Results side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* LEFT: Inputs */}
              <div className="p-6 lg:p-8 space-y-5 lg:border-r border-white/5">

                {/* Balance + Currency */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <NumberInput label="Account Balance" value={balance} onChange={setBalance} placeholder="10000" suffix={accountCurrency} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-kmf-text-secondary mb-2">Currency</label>
                    <select value={accountCurrency} onChange={e => setAccountCurrency(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-kmf-text-primary outline-none appearance-none cursor-pointer" style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {ACCOUNT_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Risk */}
                <RiskSlider value={riskPercent} onChange={setRiskPercent} />

                {/* Instrument */}
                <div>
                  <label className="block text-sm font-medium text-kmf-text-secondary mb-2">Instrument</label>
                  <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => setIsCustom(false)} className="text-xs px-3 py-1 rounded-full transition-colors" style={!isCustom ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.08)' }}>Preset</button>
                    <button onClick={() => setIsCustom(true)} className="text-xs px-3 py-1 rounded-full transition-colors" style={isCustom ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.08)' }}>Custom</button>
                  </div>

                  {!isCustom ? (
                    <div className="relative">
                      <button onClick={() => setShowPicker(!showPicker)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all hover:border-white/12" style={{ background: 'rgba(26,29,36,0.85)', border: `1px solid ${showPicker ? 'rgba(79,195,247,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                        <div>
                          <p className={instrument ? 'text-sm font-medium text-kmf-text-primary' : 'text-sm text-kmf-text-tertiary'}>
                            {instrument ? `${instrument.symbol} — ${instrument.label}` : 'Select instrument...'}
                          </p>
                        </div>
                        <svg className={`w-4 h-4 text-kmf-text-tertiary transition-transform ${showPicker ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {showPicker && <SymbolPickerPanel selected={instrument} onSelect={i => { setInstrument(i); trackedRef.current = false; window.gtag?.('event', 'instrument_selected', { instrument: i.symbol }); }} onClose={() => setShowPicker(false)} />}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.1)' }}>
                      <NumberInput label="Contract Size" value={customContract} onChange={setCustomContract} placeholder="100000" />
                      <NumberInput label="Pip Size" value={customPipSize} onChange={setCustomPipSize} placeholder="0.0001" />
                      <div>
                        <label className="block text-sm font-medium text-kmf-text-secondary mb-2">Quote Ccy</label>
                        <select value={customQuote} onChange={e => setCustomQuote(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-kmf-text-primary outline-none appearance-none cursor-pointer" style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {ACCOUNT_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Entry / SL / TP */}
                <div className="grid grid-cols-3 gap-3">
                  <NumberInput label="Entry Price" value={entry} onChange={setEntry} placeholder="1.08500" />
                  <NumberInput label="Stop Loss" value={stopLoss} onChange={setStopLoss} placeholder="1.08200" />
                  <NumberInput label="Take Profit" value={takeProfit} onChange={setTakeProfit} placeholder="1.09100" />
                </div>

                {/* Leverage */}
                <div>
                  <label className="block text-sm font-medium text-kmf-text-secondary mb-2">Leverage</label>
                  <div className="flex flex-wrap gap-1.5">
                    {LEVERAGE_OPTIONS.map(lev => (
                      <button key={lev} onClick={() => setLeverage(lev)} className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={lev === leverage ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.06)' }}>
                        1:{lev}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rate status */}
                <div className="flex items-center gap-2 text-xs text-kmf-text-tertiary">
                  <div className={`w-2 h-2 rounded-full ${rateSource === 'live' ? 'bg-green-400' : rateSource === 'fallback' ? 'bg-yellow-400' : 'bg-yellow-400 animate-pulse'}`} />
                  {rateSource === 'live' ? 'Live exchange rates (cached 1h)' : rateSource === 'fallback' ? 'Using fallback rates — API unavailable' : 'Loading exchange rates...'}
                </div>
              </div>

              {/* RIGHT: Results */}
              <div className="p-6 lg:p-8">
                {!entry || !stopLoss ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 lg:py-0">
                    <div className="text-5xl mb-4 opacity-20">📐</div>
                    <p className="text-kmf-text-tertiary text-sm">Enter entry price and stop loss to calculate</p>
                  </div>
                ) : result.hasError ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 lg:py-0">
                    <div className="text-4xl mb-3">⚠️</div>
                    <p className="text-red-400 text-sm font-medium text-center">{result.errorMessage}</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Hero: LOT SIZE */}
                    <div className="text-center py-4">
                      <p className="text-xs text-kmf-text-tertiary uppercase tracking-[0.2em] mb-2">Position Size</p>
                      <p className="text-6xl sm:text-7xl font-extrabold gradient-text" style={{ letterSpacing: '-0.04em' }}>
                        {result.lotSize.toFixed(2)}
                      </p>
                      <p className="text-kmf-text-tertiary text-sm mt-2">standard lots</p>
                    </div>

                    {/* Lot breakdown: Standard / Mini / Micro */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.12)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">Standard</p>
                        <p className="text-xl font-bold text-kmf-accent">{result.standardLots.toFixed(2)}</p>
                        <p className="text-[10px] text-kmf-text-tertiary">lots</p>
                      </div>
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(38,198,218,0.06)', border: '1px solid rgba(38,198,218,0.12)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">Mini</p>
                        <p className="text-xl font-bold" style={{ color: '#26C6DA' }}>{result.miniLots.toFixed(1)}</p>
                        <p className="text-[10px] text-kmf-text-tertiary">lots</p>
                      </div>
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(0,188,212,0.06)', border: '1px solid rgba(0,188,212,0.12)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">Micro</p>
                        <p className="text-xl font-bold" style={{ color: '#00BCD4' }}>{result.microLots.toFixed(0)}</p>
                        <p className="text-[10px] text-kmf-text-tertiary">lots</p>
                      </div>
                    </div>

                    {/* Key metrics grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <ResultStat label="Risk Amount" value={`${cs}${result.riskAmount.toFixed(2)}`} color="#FF5252" />
                      <ResultStat label="Margin Required" value={`${cs}${result.marginRequired.toFixed(2)}`} color="#FFB300" />
                      <ResultStat label="Pip Value" value={`${cs}${result.pipValue.toFixed(2)}`} color="#4FC3F7" />
                      <ResultStat label="SL Distance" value={`${result.stopLossPips.toFixed(1)} pips`} color="#CE93D8" />
                    </div>

                    {/* TP / R:R */}
                    {result.takeProfitPips > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        <ResultStat label="TP Distance" value={`${result.takeProfitPips.toFixed(1)} pips`} color="#00E676" />
                        <ResultStat label="R:R Ratio" value={`1:${result.riskRewardRatio.toFixed(2)}`} color="#00E676" />
                        <ResultStat label="Potential Win" value={`${cs}${(result.balanceAfterWin - (parseFloat(balance) || 0)).toFixed(2)}`} color="#00E676" />
                      </div>
                    )}

                    {/* Balance after */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,82,82,0.05)', border: '1px solid rgba(255,82,82,0.1)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary mb-0.5">Balance After Loss</p>
                        <p className="text-sm font-bold text-red-400">{cs}{result.balanceAfterLoss.toFixed(2)}</p>
                      </div>
                      {result.balanceAfterWin > 0 && (
                        <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.1)' }}>
                          <p className="text-[10px] text-kmf-text-tertiary mb-0.5">Balance After Win</p>
                          <p className="text-sm font-bold text-green-400">{cs}{result.balanceAfterWin.toFixed(2)}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions: Copy + Reset */}
                    <div className="flex gap-2">
                      <button onClick={handleCopyResults} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-kmf-text-secondary transition-all hover:text-kmf-accent" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.1)' }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        Copy Results
                      </button>
                      <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-kmf-text-secondary transition-all hover:text-red-400" style={{ background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.1)' }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Reset
                      </button>
                    </div>

                    {/* Warning */}
                    {result.warningMessage && (
                      <div className="p-3 rounded-xl text-xs text-yellow-300" style={{ background: 'rgba(255,179,0,0.06)', border: '1px solid rgba(255,179,0,0.12)' }}>
                        {result.warningMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom bar: CTA */}
            <div className="flex justify-center py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <a href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal" target="_blank" rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'play_store_click', { source: 'calculator' })}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, rgba(255,179,0,0.12), rgba(255,143,0,0.06))', border: '1px solid rgba(255,179,0,0.2)' }}>
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#FFB300"><path d="M3 20.5v-17c0-.83.52-1.28 1-1.5l9 9-9 9c-.48-.22-1-.67-1-1.5zm14.5-7.5L6.27 2.96l8.97 5.18L17.5 13zm-10.77 9.54l8.97-5.18-2.46-1.42L6.73 22.54zM21 12l-3.5-2-2.74 1.58L17.5 13 21 12z" /></svg>
                <span className="text-sm" style={{ color: '#FFB300' }}><strong>Want this on mobile?</strong> <span className="text-kmf-text-tertiary">Free on Google Play</span></span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg flex-shrink-0" style={{ background: 'rgba(255,179,0,0.15)', color: '#FFB300' }}>Download</span>
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-kmf-text-tertiary mt-4 max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0.6 }}>
            This calculator is provided for informational and educational purposes only.
            It does not constitute financial advice. Always verify position sizes and risk
            parameters with your broker before placing any trade.
          </p>

          {/* ═══ EDUCATIONAL CONTENT ═══ */}
          <div className="max-w-3xl mx-auto mb-16 mt-16">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>How to Use the Lot Size Calculator</h2>
            <div className="space-y-4 text-kmf-text-secondary text-sm leading-relaxed">
              <p>Position sizing is the <strong className="text-kmf-text-primary">single most important risk management skill</strong> in trading. A perfect entry with wrong lot size can blow your account. A mediocre entry with correct lot size keeps you in the game.</p>
              <h3 className="text-lg font-bold text-kmf-text-primary mt-6">The Formula</h3>
              <div className="rounded-xl p-4 font-mono text-sm" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.12)', color: '#4FC3F7' }}>
                Lot Size = Risk Amount ÷ (Stop Loss Pips × Pip Value per Lot)
              </div>
              <p>Where <strong className="text-kmf-text-primary">Risk Amount</strong> = Account Balance × Risk Percentage. If you have a $10,000 account and risk 1%, your risk amount is $100.</p>
              <h3 className="text-lg font-bold text-kmf-text-primary mt-6">Why Truncation, Not Rounding?</h3>
              <p>This calculator uses <strong className="text-kmf-text-primary">truncation (floor)</strong> instead of rounding. If the math says 0.837 lots, we output 0.83 — not 0.84. Rounding up would mean risking <em>more</em> than your intended percentage. Professional risk management always errs on the side of caution.</p>
              <h3 className="text-lg font-bold text-kmf-text-primary mt-6">The 1% Rule</h3>
              <p>Never risk more than 1-2% of your account on a single trade. With 1% risk, you can lose 10 trades in a row and still have 90% of your capital. With 5% risk, 10 losses leaves you with only 60% — a 67% gain needed just to break even.</p>
            </div>
          </div>

          {/* ═══ FAQ ═══ */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6" style={{ letterSpacing: '-0.02em' }}>Frequently Asked Questions</h2>
            <div className="space-y-2">
              {FAQ_DATA.map((faq, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'rgba(26,29,36,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                    <span className="text-sm font-medium text-kmf-text-primary">{faq.q}</span>
                    <svg className={`w-4 h-4 text-kmf-text-tertiary flex-shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openFaq === i && <div className="px-5 pb-4 text-sm text-kmf-text-secondary leading-relaxed animate-fadeIn">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* ═══ RELATED ARTICLES ═══ */}
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-xl font-bold text-kmf-text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: Why It\'s Non-Negotiable', cat: 'Risk Management', color: '#00C853' },
                { slug: 'position-sizing-guide', title: 'Position Sizing Guide: The Math Behind Survival', cat: 'Risk Management', color: '#00C853' },
                { slug: 'how-to-set-stop-loss', title: 'How to Set Stop Loss Without Getting Stopped Out', cat: 'Risk Management', color: '#00C853' },
                { slug: 'prop-firm-daily-drawdown-guide', title: 'Prop Firm Daily Drawdown Guide', cat: 'Risk Management', color: '#00C853' },
              ].map(a => (
                <Link key={a.slug} to={`/blog/${a.slug}`} className="block rounded-xl p-4 transition-all hover:border-white/10 group" style={{ background: 'rgba(26,29,36,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${a.color}14`, color: a.color }}>{a.cat}</span>
                  <p className="text-sm font-medium text-kmf-text-primary mt-2 group-hover:text-kmf-accent transition-colors">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />

    </>
  );
}
