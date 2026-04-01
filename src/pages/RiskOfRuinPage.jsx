import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

const PAGE_TITLE = 'Risk of Ruin Calculator — Monte Carlo Simulation | K.M.F.';
const PAGE_DESC = 'Calculate your probability of blowing your trading account. Monte Carlo simulation with equity curves, scenario analysis, and the math behind survival. Free, no signup.';
const OG_IMAGE = 'https://kmfjournal.com/tools/og/risk-of-ruin.png';
const PAGE_URL = 'https://kmfjournal.com/tools/risk-of-ruin';

/* ─── Monte Carlo Engine ─── */
function runMonteCarlo(winRate, avgWin, avgLoss, riskPct, numTrades, ruinThreshold, numSims = 1000) {
  const results = [];
  let ruinCount = 0;
  const samplePaths = [];
  const numSample = Math.min(numSims, 50);
  const W = winRate / 100;

  for (let s = 0; s < numSims; s++) {
    let equity = 100;
    const path = s < numSample ? [100] : null;
    let ruined = false;
    let maxEquity = 100;
    let maxDrawdown = 0;

    for (let t = 0; t < numTrades; t++) {
      if (equity <= 0) { ruined = true; break; }
      const riskAmount = equity * (riskPct / 100);
      if (Math.random() < W) {
        equity += riskAmount * avgWin;
      } else {
        equity -= riskAmount * avgLoss;
      }
      if (equity < 0) equity = 0;
      if (path) path.push(equity);

      // Track max drawdown
      if (equity > maxEquity) maxEquity = equity;
      const dd = ((maxEquity - equity) / maxEquity) * 100;
      if (dd > maxDrawdown) maxDrawdown = dd;

      // Check ruin (equity dropped ruinThreshold% from starting balance)
      if (equity <= (100 - ruinThreshold)) {
        ruined = true;
        if (path) {
          for (let r = t + 2; r <= numTrades; r++) path.push(equity);
        }
        break;
      }
    }

    if (ruined) ruinCount++;
    results.push({ finalEquity: equity, maxDrawdown });
    if (path) samplePaths.push(path);
  }

  // Build chart data
  const step = numTrades > 200 ? Math.floor(numTrades / 200) : 1;
  const chartData = [];
  for (let i = 0; i <= numTrades; i += step) {
    const point = { trade: i };
    for (let s = 0; s < samplePaths.length; s++) {
      point[`s${s}`] = samplePaths[s][Math.min(i, samplePaths[s].length - 1)];
    }
    chartData.push(point);
  }
  if (chartData.length === 0 || chartData[chartData.length - 1].trade !== numTrades) {
    const point = { trade: numTrades };
    for (let s = 0; s < samplePaths.length; s++) {
      point[`s${s}`] = samplePaths[s][samplePaths[s].length - 1];
    }
    chartData.push(point);
  }

  // Stats
  const equities = results.map(r => r.finalEquity);
  const drawdowns = results.map(r => r.maxDrawdown);
  const sorted = equities.slice().sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const avgFinal = equities.reduce((a, b) => a + b, 0) / equities.length;
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];
  const avgMaxDD = drawdowns.reduce((a, b) => a + b, 0) / drawdowns.length;

  return {
    riskOfRuin: (ruinCount / numSims) * 100,
    median,
    avgFinal,
    worst,
    best,
    avgMaxDD,
    chartData,
    numSample: samplePaths.length,
    numSims,
  };
}

/* ─── Scenario presets ─── */
const SCENARIOS = [
  { label: 'Conservative', desc: '55% WR, 1.5:1 R:R, 0.5% risk', winRate: 55, avgWin: 1.5, avgLoss: 1, riskPct: 0.5, trades: 500, ruin: 30 },
  { label: 'Standard', desc: '50% WR, 2:1 R:R, 1% risk', winRate: 50, avgWin: 2, avgLoss: 1, riskPct: 1, trades: 500, ruin: 30 },
  { label: 'Aggressive', desc: '45% WR, 3:1 R:R, 2% risk', winRate: 45, avgWin: 3, avgLoss: 1, riskPct: 2, trades: 500, ruin: 30 },
  { label: 'Scalper', desc: '65% WR, 0.8:1 R:R, 1% risk', winRate: 65, avgWin: 0.8, avgLoss: 1, riskPct: 1, trades: 1000, ruin: 20 },
  { label: 'Swing Trader', desc: '40% WR, 3:1 R:R, 1% risk', winRate: 40, avgWin: 3, avgLoss: 1, riskPct: 1, trades: 200, ruin: 30 },
];

/* ─── FAQ Data ─── */
const FAQ_ITEMS = [
  {
    q: 'What is Risk of Ruin in trading?',
    a: 'Risk of Ruin is the probability that a trader will lose a specified percentage of their account (e.g., 30%) given their win rate, average win/loss ratio, and risk per trade. It quantifies how likely your account is to suffer a catastrophic drawdown based on your trading statistics.',
  },
  {
    q: 'Where do I find my win rate and average R:R?',
    a: 'If you use a trading journal (like the K.M.F. Trading Journal app), these stats are calculated automatically from your trade history. Without a journal, you can calculate manually: Win Rate = (winning trades ÷ total trades) × 100. Average R:R = average profit on winners ÷ average loss on losers. You need at least 30-50 trades for meaningful statistics.',
  },
  {
    q: 'How does the Monte Carlo simulation work?',
    a: 'The simulator runs 1,000 random trading sequences using your input statistics. Each simulation randomly determines whether each trade wins or loses (based on your win rate), then calculates the P&L (based on your R:R and risk %). By running many simulations, we see the full range of possible outcomes — including the probability of ruin.',
  },
  {
    q: 'What is a good Risk of Ruin percentage?',
    a: 'Professional traders aim for a Risk of Ruin below 1%. Under 5% is acceptable for most strategies. Anything above 10% means your risk parameters need adjustment — typically by reducing risk per trade or improving your win rate / R:R ratio.',
  },
  {
    q: 'What does "Average Win in R" mean?',
    a: 'R is your risk unit — the amount you risk on a single trade. If you risk $100 and your average winning trade makes $200, your average win is 2R (you made 2x your risk). If your average loss is $100, that is 1R. Most traders who use fixed stop losses have an average loss close to 1R.',
  },
  {
    q: 'Can I have a positive expectancy and still go broke?',
    a: 'Yes. A strategy with positive expectancy can still produce ruin if the risk per trade is too high. Even a strategy that wins 60% of the time with 2:1 R:R can blow up if you risk 10% per trade — a sequence of 5-6 losses (which will eventually happen) wipes out half the account.',
  },
  {
    q: 'How many trades should I simulate?',
    a: 'For most traders, 200-500 trades is realistic (that is roughly 1-2 years of active trading). If you are a scalper taking multiple trades per day, simulate 1,000+. The more trades you simulate, the more accurate the probability estimate becomes.',
  },
];

/* ─── Color helpers ─── */
function ruinColor(pct) {
  if (pct <= 1) return '#00E676';
  if (pct <= 5) return '#66BB6A';
  if (pct <= 10) return '#FFB300';
  if (pct <= 25) return '#FF9800';
  return '#FF5252';
}

function ruinLabel(pct) {
  if (pct <= 1) return 'Excellent — very safe';
  if (pct <= 5) return 'Good — acceptable risk';
  if (pct <= 10) return 'Moderate — consider reducing risk';
  if (pct <= 25) return 'Risky — reduce risk per trade';
  return 'Dangerous — high chance of blowing account';
}

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const values = payload.map(p => p.value).filter(v => v != null);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return (
    <div className="rounded-lg px-3 py-2 text-xs" style={{ background: 'rgba(15,17,21,0.95)', border: '1px solid rgba(79,195,247,0.2)' }}>
      <p className="text-kmf-text-tertiary mb-1">After trade #{label}</p>
      <p className="text-green-400">Best path: {max.toFixed(1)}% of starting balance</p>
      <p className="text-kmf-accent">Average: {avg.toFixed(1)}%</p>
      <p className="text-red-400">Worst path: {min.toFixed(1)}%</p>
    </div>
  );
}

/* ─── Input Component ─── */
function InputField({ label, value, onChange, suffix, min, max, step = 1, hint, example }) {
  return (
    <div>
      <label className="text-sm font-medium text-kmf-text-secondary block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full rounded-lg px-3 py-2.5 text-sm text-kmf-text-primary outline-none transition-all focus:ring-1 focus:ring-kmf-accent/40"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-kmf-text-tertiary">{suffix}</span>}
      </div>
      {hint && <p className="text-[11px] text-kmf-text-tertiary mt-1">{hint}</p>}
      {example && <p className="text-[11px] mt-0.5" style={{ color: 'rgba(79,195,247,0.6)' }}>{example}</p>}
    </div>
  );
}

/* ─── Scenario Comparison Table ─── */
function ScenarioTable({ winRate, avgWin, avgLoss, ruinThreshold, currentRiskPct }) {
  const rows = useMemo(() => {
    const W = winRate / 100;
    const L = 1 - W;
    return [0.25, 0.5, 1, 2, 3, 5].map(riskPct => {
      // Quick analytical approximation using classic formula
      const expectancy = W * avgWin - L * avgLoss;
      let ror;
      if (expectancy <= 0) {
        ror = 100;
      } else {
        const ratio = (L * avgLoss) / (W * avgWin);
        const units = ruinThreshold / riskPct;
        if (ratio >= 1) ror = 100;
        else if (ratio <= 0) ror = 0;
        else ror = Math.min(Math.pow(ratio, units) * 100, 100);
      }
      return { riskPct, ror };
    });
  }, [winRate, avgWin, avgLoss, ruinThreshold]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-kmf-text-tertiary text-xs uppercase tracking-wider">
            <th className="text-left py-2 px-3">Risk Per Trade</th>
            <th className="text-right py-2 px-3">Approx. Risk of Ruin</th>
            <th className="text-right py-2 px-3 hidden sm:table-cell">Assessment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => {
            const isCurrentRow = s.riskPct === currentRiskPct;
            return (
              <tr key={i} className="border-t border-white/5" style={isCurrentRow ? { background: 'rgba(79,195,247,0.06)' } : {}}>
                <td className="py-2.5 px-3 font-medium text-kmf-text-primary">
                  {s.riskPct}%
                  {isCurrentRow && <span className="text-[10px] text-kmf-accent ml-1.5">(your setting)</span>}
                </td>
                <td className="py-2.5 px-3 text-right font-bold" style={{ color: ruinColor(s.ror) }}>
                  {s.ror < 0.01 ? '< 0.01%' : s.ror > 99.9 ? '> 99%' : `${s.ror.toFixed(1)}%`}
                </td>
                <td className="py-2.5 px-3 text-right text-xs text-kmf-text-tertiary hidden sm:table-cell">
                  {s.ror <= 1 ? 'Very safe' : s.ror <= 5 ? 'Acceptable' : s.ror <= 15 ? 'Caution' : s.ror <= 50 ? 'Dangerous' : 'Almost certain ruin'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── "What is this?" explainer box ─── */
function ExplainerBox() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden mb-10" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(79,195,247,0.15)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#4FC3F7"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          </div>
          <span className="text-sm font-semibold text-kmf-accent">What is this tool and how does it help me?</span>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="#4FC3F7"
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none', opacity: 0.6 }}
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 text-sm text-kmf-text-secondary leading-relaxed animate-fadeIn">
          <p>
            <strong className="text-kmf-text-primary">The problem:</strong> Even profitable traders can blow their accounts. A 60% win rate with great entries means nothing if one bad week of overleveraged trades wipes out months of gains. Most traders only find this out after it happens.
          </p>
          <p>
            <strong className="text-kmf-text-primary">What this tool does:</strong> It simulates your next 200-1,000+ trades using your actual statistics (win rate, reward:risk ratio, and how much you risk per trade). Instead of guessing, you see the probability of your account dropping below a level you can't recover from — before it happens.
          </p>
          <p>
            <strong className="text-kmf-text-primary">How it helps:</strong> If your risk of ruin is above 5%, the tool shows you exactly which parameter to change (usually: risk less per trade). You can test different scenarios instantly — "What if I risk 0.5% instead of 2%?" — and find the sweet spot between growth and survival.
          </p>
          <p>
            <strong className="text-kmf-text-primary">Where to find your numbers:</strong> If you use a trading journal (like the <Link to="/" className="text-kmf-accent hover:underline">K.M.F. app</Link>), your win rate and average R:R are calculated automatically. Without a journal, review your last 30+ trades and calculate: Win Rate = wins ÷ total trades × 100. Avg R:R = average profit on wins ÷ average loss on losses. If you're not sure, start with a preset below.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function RiskOfRuinPage() {
  const [winRate, setWinRate] = useState('50');
  const [avgWin, setAvgWin] = useState('2');
  const [avgLoss, setAvgLoss] = useState('1');
  const [riskPct, setRiskPct] = useState('1');
  const [numTrades, setNumTrades] = useState('500');
  const [ruinThreshold, setRuinThreshold] = useState('30');
  const [openFaq, setOpenFaq] = useState(null);

  // Parse inputs
  const params = useMemo(() => ({
    winRate: Math.min(99, Math.max(1, parseFloat(winRate) || 50)),
    avgWin: Math.max(0.1, parseFloat(avgWin) || 2),
    avgLoss: Math.max(0.1, parseFloat(avgLoss) || 1),
    riskPct: Math.min(20, Math.max(0.1, parseFloat(riskPct) || 1)),
    numTrades: Math.min(5000, Math.max(50, parseInt(numTrades) || 500)),
    ruinThreshold: Math.min(100, Math.max(5, parseFloat(ruinThreshold) || 30)),
  }), [winRate, avgWin, avgLoss, riskPct, numTrades, ruinThreshold]);

  // Run simulation
  const result = useMemo(() => {
    return runMonteCarlo(params.winRate, params.avgWin, params.avgLoss, params.riskPct, params.numTrades, params.ruinThreshold);
  }, [params]);

  // Expectancy
  const expectancy = useMemo(() => {
    const W = params.winRate / 100;
    return W * params.avgWin - (1 - W) * params.avgLoss;
  }, [params.winRate, params.avgWin, params.avgLoss]);

  // Load preset
  const loadPreset = useCallback((preset) => {
    setWinRate(String(preset.winRate));
    setAvgWin(String(preset.avgWin));
    setAvgLoss(String(preset.avgLoss));
    setRiskPct(String(preset.riskPct));
    setNumTrades(String(preset.trades));
    setRuinThreshold(String(preset.ruin));
  }, []);

  // GA4 event
  const trackedRef = useCallback(() => {
    window.gtag?.('event', 'risk_of_ruin_calculated', {
      win_rate: params.winRate,
      rr_ratio: params.avgWin,
      risk_pct: params.riskPct,
      ruin_result: result?.riskOfRuin?.toFixed(1),
    });
  }, [params, result]);

  useEffect(() => {
    if (result) trackedRef();
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  // SEO
  useEffect(() => {
    document.title = PAGE_TITLE;
    const setMeta = (attr, val, content) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', PAGE_DESC);
    setMeta('property', 'og:title', PAGE_TITLE);
    setMeta('property', 'og:description', PAGE_DESC);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:url', PAGE_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', PAGE_TITLE);
    setMeta('name', 'twitter:description', PAGE_DESC);
    setMeta('name', 'twitter:image', OG_IMAGE);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', PAGE_URL);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Risk of Ruin Calculator',
          url: PAGE_URL,
          description: PAGE_DESC,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          creator: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kmfjournal.com/tools' },
            { '@type': 'ListItem', position: 3, name: 'Risk of Ruin Calculator', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('ror-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'ror-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); link?.remove(); };
  }, []);

  // Path colors
  const pathColors = useMemo(() => {
    if (!result) return [];
    const colors = [];
    for (let i = 0; i < result.numSample; i++) {
      const t = i / Math.max(result.numSample - 1, 1);
      const hue = 120 + t * 240;
      colors.push(`hsl(${hue % 360}, 60%, 55%)`);
    }
    return colors;
  }, [result]);

  // Plain-language summary
  const summary = useMemo(() => {
    if (!result) return '';
    const ror = result.riskOfRuin;
    if (ror < 0.5) return `With these stats, your account is very safe. Out of 1,000 simulated trading sequences, almost none ended in ruin.`;
    if (ror < 5) return `There's a small but real chance (${ror.toFixed(1)}%) your account could hit a ${params.ruinThreshold}% drawdown. This is within acceptable range for most traders.`;
    if (ror < 15) return `About ${Math.round(ror)} out of 100 possible futures end with your account losing ${params.ruinThreshold}%+. Consider reducing your risk per trade from ${params.riskPct}% to see how it improves.`;
    if (ror < 40) return `This is a dangerous level. In roughly ${Math.round(ror)} out of 100 simulated futures, your account hits a ${params.ruinThreshold}% drawdown. Reduce your risk per trade — see the table below.`;
    return `Your account has a very high probability of blowing up. In ${Math.round(ror)} out of 100 simulated futures, the account loses ${params.ruinThreshold}%+. You need to significantly reduce your risk per trade.`;
  }, [result, params.ruinThreshold, params.riskPct]);

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Free Trading Tool
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-kmf-accent to-cyan-300 bg-clip-text text-transparent">Risk of Ruin</span> Calculator
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto text-base">
              Will your trading account survive the next 500 trades? Enter your stats below and find out. The simulator runs 1,000 random trading sequences to show you the probability of a catastrophic drawdown.
            </p>
          </div>

          {/* Explainer */}
          <ExplainerBox />

          {/* Presets */}
          <div className="mb-8">
            <p className="text-xs text-kmf-text-tertiary text-center mb-3">Don't know your stats yet? Start with a preset:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SCENARIOS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => loadPreset(s)}
                  className="group px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}
                  title={s.desc}
                >
                  <span className="block font-semibold">{s.label}</span>
                  <span className="block text-[10px] text-kmf-text-tertiary mt-0.5 group-hover:text-kmf-text-secondary transition-colors">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inputs */}
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-sm font-semibold text-kmf-text-primary mb-1 uppercase tracking-wider">Your Trading Statistics</h2>
                <p className="text-[11px] text-kmf-text-tertiary mb-4">Find these in your trading journal or calculate from your last 30+ trades</p>
                <div className="space-y-4">
                  <InputField
                    label="Win Rate"
                    value={winRate}
                    onChange={setWinRate}
                    suffix="%"
                    min={1}
                    max={99}
                    step={1}
                    hint="How many of your trades are winners?"
                    example="Ex: 50 winning trades out of 100 total = 50%"
                  />
                  <InputField
                    label="Average Win Size"
                    value={avgWin}
                    onChange={setAvgWin}
                    suffix="× risk"
                    min={0.1}
                    max={20}
                    step={0.1}
                    hint="How much do you make on average when you win, as a multiple of what you risked?"
                    example="Ex: Risk $100 per trade, avg win = $200 → enter 2"
                  />
                  <InputField
                    label="Average Loss Size"
                    value={avgLoss}
                    onChange={setAvgLoss}
                    suffix="× risk"
                    min={0.1}
                    max={5}
                    step={0.1}
                    hint="How much do you lose on average when a trade fails? Usually 1 if you use fixed stops."
                    example="Ex: Risk $100, avg loss = $100 → enter 1"
                  />
                  <InputField
                    label="Risk Per Trade"
                    value={riskPct}
                    onChange={setRiskPct}
                    suffix="%"
                    min={0.1}
                    max={20}
                    step={0.25}
                    hint="What percentage of your account do you risk on each trade?"
                    example="Ex: $10,000 account, risk $100 per trade = 1%"
                  />

                  <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider font-semibold mb-3">Simulation Settings</p>
                    <div className="space-y-4">
                      <InputField
                        label="Number of Trades to Simulate"
                        value={numTrades}
                        onChange={setNumTrades}
                        min={50}
                        max={5000}
                        step={50}
                        hint="How many trades into the future to simulate"
                        example="500 trades ≈ 1-2 years for most traders"
                      />
                      <InputField
                        label="Ruin Threshold"
                        value={ruinThreshold}
                        onChange={setRuinThreshold}
                        suffix="% loss"
                        min={5}
                        max={100}
                        step={5}
                        hint="What drawdown level = 'ruin' for you?"
                        example="30% = account drops from $10,000 to $7,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Expectancy indicator */}
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-kmf-text-tertiary">Expectancy per trade</span>
                    <span className="font-bold" style={{ color: expectancy > 0 ? '#00E676' : expectancy === 0 ? '#FFB300' : '#FF5252' }}>
                      {expectancy > 0 ? '+' : ''}{expectancy.toFixed(2)}R
                    </span>
                  </div>
                  <p className="text-[11px] text-kmf-text-tertiary mt-1">
                    {expectancy > 0.3
                      ? `Strong edge — on average you gain ${expectancy.toFixed(2)}× your risk per trade`
                      : expectancy > 0
                        ? `Slight edge — you make money over time, but slowly. ${expectancy < 0.1 ? 'Consider improving entries or R:R.' : ''}`
                        : expectancy === 0
                          ? 'Breakeven — your strategy doesn\'t make or lose money long-term'
                          : `Losing strategy — on average you lose ${Math.abs(expectancy).toFixed(2)}× your risk per trade. No amount of risk management saves a negative edge.`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Risk of Ruin Result */}
              {result && (
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-center">
                    <p className="text-sm text-kmf-text-tertiary mb-2">
                      Probability of losing {params.ruinThreshold}% of your account
                    </p>
                    <div className="text-5xl sm:text-6xl font-bold mb-2" style={{ color: ruinColor(result.riskOfRuin) }}>
                      {result.riskOfRuin < 0.1 ? '< 0.1' : result.riskOfRuin.toFixed(1)}%
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: `${ruinColor(result.riskOfRuin)}18`, color: ruinColor(result.riskOfRuin), border: `1px solid ${ruinColor(result.riskOfRuin)}30` }}>
                      {ruinLabel(result.riskOfRuin)}
                    </div>
                  </div>
                  {/* Plain language summary */}
                  <p className="text-sm text-kmf-text-secondary text-center leading-relaxed mt-2 max-w-lg mx-auto">
                    {summary}
                  </p>
                </div>
              )}

              {/* Equity Curve Chart */}
              {result && result.chartData.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h2 className="text-sm font-semibold text-kmf-text-primary mb-1 uppercase tracking-wider">Simulated Equity Curves</h2>
                  <p className="text-[11px] text-kmf-text-tertiary mb-4">
                    Each line = one possible future. Green lines grow, red lines that cross the dotted red line = ruin. Starting balance = 100%.
                  </p>
                  <div className="h-[300px] sm:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                          dataKey="trade"
                          stroke="#6B7280"
                          tick={{ fill: '#6B7280', fontSize: 11 }}
                          tickLine={false}
                          label={{ value: 'Trade #', position: 'insideBottomRight', offset: -5, fill: '#6B7280', fontSize: 11 }}
                        />
                        <YAxis
                          stroke="#6B7280"
                          tick={{ fill: '#6B7280', fontSize: 11 }}
                          tickLine={false}
                          label={{ value: 'Account %', angle: -90, position: 'insideLeft', offset: 10, fill: '#6B7280', fontSize: 11 }}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <ReferenceLine y={100} stroke="rgba(79,195,247,0.3)" strokeDasharray="4 4" label={{ value: 'Start', fill: 'rgba(79,195,247,0.5)', fontSize: 10, position: 'right' }} />
                        <ReferenceLine y={100 - params.ruinThreshold} stroke="rgba(255,82,82,0.4)" strokeDasharray="4 4" label={{ value: `Ruin (${100 - params.ruinThreshold}%)`, fill: '#FF5252', fontSize: 10, position: 'right' }} />
                        {Array.from({ length: result.numSample }, (_, i) => (
                          <Line
                            key={i}
                            type="monotone"
                            dataKey={`s${i}`}
                            stroke={pathColors[i]}
                            dot={false}
                            strokeWidth={1}
                            opacity={0.35}
                            isAnimationActive={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              {result && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Median Outcome', value: `${result.median.toFixed(1)}%`, color: result.median >= 100 ? '#00E676' : '#FF5252', hint: 'Half of simulations end above this' },
                    { label: 'Average Outcome', value: `${result.avgFinal.toFixed(1)}%`, color: result.avgFinal >= 100 ? '#00E676' : '#FF5252', hint: 'Mean final balance across all sims' },
                    { label: 'Best Case', value: `${result.best.toFixed(0)}%`, color: '#00E676', hint: 'Luckiest simulation path' },
                    { label: 'Avg Max Drawdown', value: `${result.avgMaxDD.toFixed(1)}%`, color: result.avgMaxDD > params.ruinThreshold * 0.7 ? '#FF5252' : '#FFB300', hint: 'Average worst dip per simulation' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[11px] text-kmf-text-tertiary mb-1">{s.label}</p>
                      <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-kmf-text-tertiary mt-0.5">{s.hint}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scenario Comparison Table */}
          <div className="mt-10 rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-kmf-text-primary mb-1 uppercase tracking-wider">How Risk Per Trade Changes Everything</h2>
            <p className="text-xs text-kmf-text-tertiary mb-4">
              Same win rate ({params.winRate}%) and same R:R ({params.avgWin}:{params.avgLoss}) — only changing how much you risk per trade. See how dramatically it affects your survival.
            </p>
            <ScenarioTable winRate={params.winRate} avgWin={params.avgWin} avgLoss={params.avgLoss} ruinThreshold={params.ruinThreshold} currentRiskPct={params.riskPct} />
            <p className="text-[11px] text-kmf-text-tertiary mt-3 italic">
              * Analytical approximation. Monte Carlo results above are more accurate because they account for compounding effects.
            </p>
          </div>

          {/* Cross-link to Lot Calculator */}
          <div className="mt-8 rounded-2xl p-5 text-center" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.1)' }}>
            <p className="text-sm text-kmf-text-secondary mb-3">
              Found your ideal risk per trade? Calculate the exact position size for your next trade.
            </p>
            <Link
              to="/tools/lot-size-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)', color: '#0F1115' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm3-4H7v-2h8v2zm2-4H7V7h10v2z"/></svg>
              Open Lot Size Calculator
            </Link>
          </div>

          {/* Educational Content */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6">Understanding Risk of Ruin: The Math That Keeps You Alive</h2>

            <div className="space-y-6 text-kmf-text-secondary leading-relaxed">
              <p>
                Every trader thinks about how much they could make. Almost no one thinks about how likely they are to lose everything first. Risk of Ruin answers the question every trader should ask before placing their next trade: <strong className="text-kmf-text-primary">"Given my actual statistics, what is the probability that my account hits a drawdown I cannot recover from?"</strong>
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">A Real Example</h3>
              <p>
                Imagine two traders with identical strategies: 50% win rate, 2:1 reward-to-risk ratio. Both have positive expectancy. Trader A risks 1% per trade. Trader B risks 5% per trade. After 500 trades:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-kmf-text-primary">Trader A (1% risk)</strong>: Risk of ruin ≈ 0%. Account grows steadily. Losing streaks happen but are absorbable.</li>
                <li><strong className="text-kmf-text-primary">Trader B (5% risk)</strong>: Risk of ruin ≈ 25-40%. There is a very real chance this account doesn't survive the year. Same exact strategy.</li>
              </ul>
              <p>
                The difference is not the strategy. It's the position sizing. This is the single most important lesson in trading risk management.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">Why Positive Expectancy Isn't Enough</h3>
              <p>
                A positive expectancy means your strategy makes money on average, over infinite trades. But you don't trade infinite trades — you trade in finite sequences, and those sequences include losing streaks. The question isn't <em>if</em> you'll have a losing streak, but <em>when</em>, and whether your account can survive it. This is why <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">the 1% risk rule</Link> exists.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">How to Read the Equity Curve Chart</h3>
              <p>
                The chart shows 50 simulated "possible futures" for your account. Each line starts at 100% (your current balance) and shows what could happen over {params.numTrades} trades. The horizontal dotted red line marks your ruin threshold. Lines that cross below it = ruined accounts. The more lines that cross below, the higher your risk of ruin.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">The Three Levers You Control</h3>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-kmf-text-primary">Win rate</strong> — improved through better entries, <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklists</Link>, and pattern refinement</li>
                <li><strong className="text-kmf-text-primary">Reward:Risk ratio</strong> — improved through better <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss placement</Link> and target selection</li>
                <li><strong className="text-kmf-text-primary">Risk per trade</strong> — the most impactful lever; calculated using <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">proper position sizing</Link></li>
              </ul>
              <p>
                Of these three, risk per trade has the most dramatic effect. Even small changes (1% → 2%) can multiply your risk of ruin by 5-10×.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">What Your Results Mean</h3>
              <ul className="space-y-2 pl-2">
                <li><span className="font-semibold" style={{ color: '#00E676' }}>Below 1%</span> — Your risk management is solid. Keep doing what you're doing.</li>
                <li><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5%</span> — Acceptable for most traders, but consider reducing risk per trade for extra safety.</li>
                <li><span className="font-semibold" style={{ color: '#FFB300' }}>5-10%</span> — You're operating with thin margins. A bad week could spiral.</li>
                <li><span className="font-semibold" style={{ color: '#FF9800' }}>10-25%</span> — Significant danger. Reduce risk per trade immediately.</li>
                <li><span className="font-semibold" style={{ color: '#FF5252' }}>Above 25%</span> — Your account is at serious risk. This is not a matter of if, but when.</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-kmf-text-primary hover:text-kmf-accent transition-colors"
                  >
                    {faq.q}
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                      className="shrink-0 ml-3 transition-transform duration-200"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', opacity: 0.5 }}
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-kmf-text-secondary leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-kmf-text-tertiary text-sm mb-4">Part of the K.M.F. free trading tools suite</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/tools/lot-size-calculator"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
              >
                Lot Size Calculator
              </Link>
              <Link
                to="/blog"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#8FB3C5', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Trading Blog
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
