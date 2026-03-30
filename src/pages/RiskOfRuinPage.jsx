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
function runMonteCarlo(winRate, avgWin, avgLoss, riskPct, numTrades, ruinThreshold, numSims = 500) {
  const results = [];
  let ruinCount = 0;
  const samplePaths = [];
  const numSample = Math.min(numSims, 50); // paths to chart

  for (let s = 0; s < numSims; s++) {
    let equity = 100; // normalized to 100%
    const path = s < numSample ? [100] : null;
    let ruined = false;

    for (let t = 0; t < numTrades; t++) {
      if (equity <= 0) { ruined = true; break; }
      const riskAmount = equity * (riskPct / 100);
      if (Math.random() < winRate / 100) {
        equity += riskAmount * avgWin;
      } else {
        equity -= riskAmount * avgLoss;
      }
      if (equity < 0) equity = 0;
      if (path) path.push(equity);

      // Check ruin
      if (equity <= (100 - ruinThreshold)) {
        ruined = true;
        if (path) {
          // Fill remaining with same value
          for (let r = t + 2; r <= numTrades; r++) path.push(equity);
        }
        break;
      }
    }

    if (ruined) ruinCount++;
    results.push(equity);
    if (path) samplePaths.push(path);
  }

  // Build chart data from sample paths
  const step = numTrades > 200 ? Math.floor(numTrades / 200) : 1;
  const chartData = [];
  for (let i = 0; i <= numTrades; i += step) {
    const point = { trade: i };
    for (let s = 0; s < samplePaths.length; s++) {
      point[`s${s}`] = samplePaths[s][Math.min(i, samplePaths[s].length - 1)];
    }
    chartData.push(point);
  }
  // Ensure last point
  if (chartData.length === 0 || chartData[chartData.length - 1].trade !== numTrades) {
    const point = { trade: numTrades };
    for (let s = 0; s < samplePaths.length; s++) {
      point[`s${s}`] = samplePaths[s][samplePaths[s].length - 1];
    }
    chartData.push(point);
  }

  // Stats
  const sorted = results.slice().sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const avgFinal = results.reduce((a, b) => a + b, 0) / results.length;
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];
  const p10 = sorted[Math.floor(sorted.length * 0.1)];
  const p90 = sorted[Math.floor(sorted.length * 0.9)];

  return {
    riskOfRuin: (ruinCount / numSims) * 100,
    median,
    avgFinal,
    worst,
    best,
    p10,
    p90,
    chartData,
    numSample: samplePaths.length,
    numSims,
  };
}

/* ─── Analytical Risk of Ruin (Kelly-based approximation) ─── */
function analyticalRoR(winRate, avgWin, avgLoss, riskPct, ruinThreshold) {
  const W = winRate / 100;
  const L = 1 - W;
  if (W <= 0 || L <= 0) return 100;

  const expectancy = W * avgWin - L * avgLoss;
  if (expectancy <= 0) return 100; // negative expectancy = guaranteed ruin eventually

  // Simple approximation: RoR ≈ ((1-edge)/(1+edge))^(units)
  // where edge = expectancy per unit risked, units = drawdown / risk
  const edgePerTrade = expectancy;
  const units = ruinThreshold / riskPct;

  if (edgePerTrade >= 1) return 0; // massive edge
  const ratio = (L * avgLoss) / (W * avgWin);
  if (ratio >= 1) return 100;

  const ror = Math.pow(ratio, units);
  return Math.min(ror * 100, 100);
}

/* ─── Scenario presets ─── */
const SCENARIOS = [
  { label: 'Conservative', winRate: 55, avgWin: 1.5, avgLoss: 1, riskPct: 0.5, trades: 500, ruin: 30 },
  { label: 'Standard', winRate: 50, avgWin: 2, avgLoss: 1, riskPct: 1, trades: 500, ruin: 30 },
  { label: 'Aggressive', winRate: 45, avgWin: 3, avgLoss: 1, riskPct: 2, trades: 500, ruin: 30 },
  { label: 'Scalper', winRate: 65, avgWin: 0.8, avgLoss: 1, riskPct: 1, trades: 1000, ruin: 20 },
  { label: 'Swing Trader', winRate: 40, avgWin: 3, avgLoss: 1, riskPct: 1, trades: 200, ruin: 30 },
];

/* ─── FAQ Data ─── */
const FAQ_ITEMS = [
  {
    q: 'What is Risk of Ruin in trading?',
    a: 'Risk of Ruin is the probability that a trader will lose a specified percentage of their account (e.g., 30%) given their win rate, average win/loss ratio, and risk per trade. It quantifies how likely your account is to suffer a catastrophic drawdown based on your trading statistics.',
  },
  {
    q: 'How does the Monte Carlo simulation work?',
    a: 'The simulator runs hundreds of random trading sequences using your input statistics (win rate, R:R, risk %). Each simulation randomly determines whether each trade wins or loses, then tracks the equity curve. By running many simulations, we can estimate the probability distribution of outcomes — including the chance of ruin.',
  },
  {
    q: 'What is a good Risk of Ruin percentage?',
    a: 'Professional traders aim for a Risk of Ruin below 1%. Under 5% is acceptable for most strategies. Anything above 10% means your risk parameters need adjustment — typically by reducing risk per trade or improving your win rate / R:R ratio.',
  },
  {
    q: 'How does risk per trade affect Risk of Ruin?',
    a: 'Risk per trade is the single largest factor in Risk of Ruin. Doubling your risk per trade can increase your probability of ruin by 10x or more. This is why the 1% rule exists — it keeps ruin probability near zero for any strategy with a positive expectancy.',
  },
  {
    q: 'Can I have a positive expectancy and still go broke?',
    a: 'Yes. A strategy with positive expectancy can still produce ruin if the risk per trade is too high. Even a strategy that wins 60% of the time with 2:1 R:R can blow up if you risk 10% per trade — a sequence of 5-6 losses (which will eventually happen) wipes out half the account.',
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
  if (pct <= 1) return 'Excellent';
  if (pct <= 5) return 'Good';
  if (pct <= 10) return 'Moderate';
  if (pct <= 25) return 'Risky';
  return 'Dangerous';
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
      <p className="text-kmf-text-tertiary mb-1">Trade #{label}</p>
      <p className="text-green-400">Best: {max.toFixed(1)}%</p>
      <p className="text-kmf-accent">Avg: {avg.toFixed(1)}%</p>
      <p className="text-red-400">Worst: {min.toFixed(1)}%</p>
    </div>
  );
}

/* ─── Input Component ─── */
function Input({ label, value, onChange, suffix, min, max, step = 1, hint }) {
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
    </div>
  );
}

/* ─── Scenario Table ─── */
function ScenarioTable({ current }) {
  const scenarios = useMemo(() => {
    const base = { winRate: current.winRate, avgWin: current.avgWin, avgLoss: current.avgLoss, riskPct: current.riskPct, ruinThreshold: current.ruinThreshold };
    const rows = [];
    // Vary risk per trade
    for (const r of [0.25, 0.5, 1, 2, 3, 5]) {
      const ror = analyticalRoR(base.winRate, base.avgWin, base.avgLoss, r, base.ruinThreshold);
      rows.push({ riskPct: r, winRate: base.winRate, avgWin: base.avgWin, ror });
    }
    return rows;
  }, [current.winRate, current.avgWin, current.avgLoss, current.ruinThreshold, current.riskPct]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-kmf-text-tertiary text-xs uppercase tracking-wider">
            <th className="text-left py-2 px-3">Risk/Trade</th>
            <th className="text-left py-2 px-3">Win Rate</th>
            <th className="text-left py-2 px-3">R:R</th>
            <th className="text-right py-2 px-3">Risk of Ruin</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s, i) => (
            <tr key={i} className="border-t border-white/5" style={s.riskPct === current.riskPct ? { background: 'rgba(79,195,247,0.06)' } : {}}>
              <td className="py-2 px-3 font-medium text-kmf-text-primary">{s.riskPct}%</td>
              <td className="py-2 px-3 text-kmf-text-secondary">{s.winRate}%</td>
              <td className="py-2 px-3 text-kmf-text-secondary">1:{s.avgWin.toFixed(1)}</td>
              <td className="py-2 px-3 text-right font-bold" style={{ color: ruinColor(s.ror) }}>
                {s.ror < 0.01 ? '< 0.01%' : s.ror > 99.9 ? '> 99%' : `${s.ror.toFixed(1)}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    winRate: parseFloat(winRate) || 50,
    avgWin: parseFloat(avgWin) || 2,
    avgLoss: parseFloat(avgLoss) || 1,
    riskPct: parseFloat(riskPct) || 1,
    numTrades: parseInt(numTrades) || 500,
    ruinThreshold: parseFloat(ruinThreshold) || 30,
  }), [winRate, avgWin, avgLoss, riskPct, numTrades, ruinThreshold]);

  // Run simulation
  const result = useMemo(() => {
    if (params.winRate <= 0 || params.winRate >= 100 || params.riskPct <= 0 || params.numTrades <= 0) return null;
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
  const trackCalc = useCallback(() => {
    window.gtag?.('event', 'risk_of_ruin_calculated', {
      win_rate: params.winRate,
      rr_ratio: params.avgWin,
      risk_pct: params.riskPct,
      ruin_result: result?.riskOfRuin?.toFixed(1),
    });
  }, [params, result]);

  useEffect(() => {
    if (result) trackCalc();
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

    // JSON-LD
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

    return () => {
      script?.remove();
      link?.remove();
    };
  }, []);

  // Path colors — gradient from green to red
  const pathColors = useMemo(() => {
    if (!result) return [];
    const colors = [];
    for (let i = 0; i < result.numSample; i++) {
      const t = i / Math.max(result.numSample - 1, 1);
      // Spread across hue range (120=green → 0=red)
      const hue = 120 + t * 240; // full spectrum
      colors.push(`hsl(${hue % 360}, 60%, 55%)`);
    }
    return colors;
  }, [result]);

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Free Trading Tool
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-kmf-accent to-cyan-300 bg-clip-text text-transparent">Risk of Ruin</span> Calculator
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto">
              How likely is your trading account to blow up? Run a Monte Carlo simulation with your actual statistics to find out — before the market does it for real.
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {SCENARIOS.map((s) => (
              <button
                key={s.label}
                onClick={() => loadPreset(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inputs */}
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-sm font-semibold text-kmf-text-primary mb-4 uppercase tracking-wider">Your Statistics</h2>
                <div className="space-y-4">
                  <Input label="Win Rate" value={winRate} onChange={setWinRate} suffix="%" min={1} max={99} step={0.5} hint="Percentage of trades that hit TP" />
                  <Input label="Average Win (in R)" value={avgWin} onChange={setAvgWin} suffix="R" min={0.1} max={20} step={0.1} hint="Avg profit ÷ risk amount (e.g., 2R = 2x your risk)" />
                  <Input label="Average Loss (in R)" value={avgLoss} onChange={setAvgLoss} suffix="R" min={0.1} max={5} step={0.1} hint="Usually 1R if you use fixed stops" />
                  <Input label="Risk Per Trade" value={riskPct} onChange={setRiskPct} suffix="%" min={0.1} max={20} step={0.25} hint="% of account risked on each trade" />
                  <Input label="Number of Trades" value={numTrades} onChange={setNumTrades} min={50} max={5000} step={50} hint="How many trades to simulate" />
                  <Input label="Ruin = Drawdown of" value={ruinThreshold} onChange={setRuinThreshold} suffix="%" min={5} max={100} step={5} hint="Max drawdown before 'ruin' (e.g., 30% = account drops to 70%)" />
                </div>

                {/* Expectancy indicator */}
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-kmf-text-tertiary">Expectancy</span>
                    <span className="font-bold" style={{ color: expectancy > 0 ? '#00E676' : expectancy === 0 ? '#FFB300' : '#FF5252' }}>
                      {expectancy > 0 ? '+' : ''}{expectancy.toFixed(2)}R
                    </span>
                  </div>
                  <p className="text-[11px] text-kmf-text-tertiary mt-1">
                    {expectancy > 0 ? 'Positive edge — your strategy makes money over time' : expectancy === 0 ? 'Breakeven — no statistical edge' : 'Negative edge — this strategy loses money over time'}
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Risk of Ruin Result */}
              {result && (
                <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-sm text-kmf-text-tertiary mb-2">Probability of Ruin ({params.ruinThreshold}% drawdown)</p>
                  <div className="text-5xl sm:text-6xl font-bold mb-2" style={{ color: ruinColor(result.riskOfRuin) }}>
                    {result.riskOfRuin < 0.1 ? '< 0.1' : result.riskOfRuin.toFixed(1)}%
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${ruinColor(result.riskOfRuin)}18`, color: ruinColor(result.riskOfRuin), border: `1px solid ${ruinColor(result.riskOfRuin)}30` }}>
                    {ruinLabel(result.riskOfRuin)}
                  </div>
                  <p className="text-xs text-kmf-text-tertiary mt-3">
                    Based on {result.numSims} simulated sequences of {params.numTrades} trades each
                  </p>
                </div>
              )}

              {/* Equity Curve Chart */}
              {result && result.chartData.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h2 className="text-sm font-semibold text-kmf-text-primary mb-4 uppercase tracking-wider">Equity Curves ({result.numSample} Simulations)</h2>
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
                          label={{ value: 'Equity %', angle: -90, position: 'insideLeft', offset: 10, fill: '#6B7280', fontSize: 11 }}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <ReferenceLine y={100} stroke="rgba(79,195,247,0.3)" strokeDasharray="4 4" />
                        <ReferenceLine y={100 - params.ruinThreshold} stroke="rgba(255,82,82,0.4)" strokeDasharray="4 4" label={{ value: 'Ruin', fill: '#FF5252', fontSize: 10 }} />
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
                    { label: 'Median Final', value: `${result.median.toFixed(1)}%`, color: result.median >= 100 ? '#00E676' : '#FF5252' },
                    { label: 'Average Final', value: `${result.avgFinal.toFixed(1)}%`, color: result.avgFinal >= 100 ? '#00E676' : '#FF5252' },
                    { label: 'Best Case', value: `${result.best.toFixed(0)}%`, color: '#00E676' },
                    { label: 'Worst Case', value: `${result.worst.toFixed(1)}%`, color: '#FF5252' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[11px] text-kmf-text-tertiary mb-1">{s.label}</p>
                      <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scenario Comparison Table */}
          <div className="mt-10 rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-kmf-text-primary mb-1 uppercase tracking-wider">How Risk Per Trade Changes Everything</h2>
            <p className="text-xs text-kmf-text-tertiary mb-4">Your current stats at different risk levels (analytical approximation)</p>
            <ScenarioTable current={params} />
          </div>

          {/* Cross-link to Lot Calculator */}
          <div className="mt-8 rounded-2xl p-5 text-center" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.1)' }}>
            <p className="text-sm text-kmf-text-secondary mb-3">
              Know your risk of ruin? Now calculate the exact lot size to stay within it.
            </p>
            <Link
              to="/tools/lot-size-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)', color: '#0F1115' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm3-4H7v-2h8v2zm2-4H7V7h10v2z"/></svg>
              Lot Size Calculator
            </Link>
          </div>

          {/* Educational Content */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6">Understanding Risk of Ruin: The Math That Keeps You Alive</h2>

            <div className="space-y-6 text-kmf-text-secondary leading-relaxed">
              <p>
                Every trader thinks about how much they could make. Almost no one thinks about how likely they are to lose everything first. Risk of Ruin answers the question every trader should ask before placing their next trade: <strong className="text-kmf-text-primary">"Given my actual statistics, what is the probability that my account hits a drawdown I cannot recover from?"</strong>
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">Why Positive Expectancy Isn't Enough</h3>
              <p>
                A positive expectancy means your strategy makes money on average, over infinite trades. But you don't trade infinite trades — you trade in finite sequences, and those sequences include losing streaks. The question isn't <em>if</em> you'll have a losing streak, but <em>when</em>, and whether your account can survive it.
              </p>
              <p>
                A trader with a 55% win rate, 2:1 R:R, and 1% risk per trade has a near-zero risk of ruin. The same trader at 5% risk per trade has a significant probability of blowing up. The strategy didn't change — only the position sizing did. This is why <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">the 1% risk rule</Link> exists.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">How Monte Carlo Simulation Works</h3>
              <p>
                Instead of using a single formula (which requires assumptions about trade distributions), Monte Carlo simulation takes the brute-force approach: it runs your trading statistics through hundreds of random sequences and counts what percentage of them end in ruin.
              </p>
              <p>
                Each simulation randomly assigns wins and losses based on your win rate, calculates the P&L based on your average win/loss ratio and risk per trade, and tracks the equity curve. After running 500+ simulations, we get a reliable distribution of possible outcomes — including the probability of hitting your maximum drawdown threshold.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">The Three Levers You Control</h3>
              <p>
                There are only three variables that determine your risk of ruin, and you directly control all of them:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-kmf-text-primary">Win rate</strong> — improved through better entries, <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklists</Link>, and pattern refinement</li>
                <li><strong className="text-kmf-text-primary">Risk:Reward ratio</strong> — improved through better <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss placement</Link> and target selection</li>
                <li><strong className="text-kmf-text-primary">Risk per trade</strong> — the most impactful lever; calculated using <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">proper position sizing</Link></li>
              </ul>
              <p>
                Of these three, risk per trade has the most dramatic effect on ruin probability. Even small changes (1% → 2%) can multiply your risk of ruin by 5-10x.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">What Your Results Mean</h3>
              <ul className="space-y-2 pl-2">
                <li><span className="font-semibold" style={{ color: '#00E676' }}>Below 1%</span> — Your risk management is solid. Keep doing what you're doing.</li>
                <li><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5%</span> — Acceptable for most traders, but consider reducing risk per trade for extra safety.</li>
                <li><span className="font-semibold" style={{ color: '#FFB300' }}>5-10%</span> — You're operating with thin margins. A bad week could spiral into a blown account.</li>
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
