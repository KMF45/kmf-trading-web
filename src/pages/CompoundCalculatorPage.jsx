import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

const PAGE_TITLE = 'KMF Compound Vision — Trading Compound Growth Calculator | K.M.F.';
const PAGE_DESC = 'Visualize how disciplined monthly returns compound your trading account over time. Free calculator with interactive chart, milestone markers, and drawdown recovery warnings.';
const OG_IMAGE = 'https://kmfjournal.com/tools/og/compound-calculator.png';
const PAGE_URL = 'https://kmfjournal.com/tools/compound-calculator';

/* ─── Compound Engine ─── */
function calculateCompound(startBalance, monthlyPct, months, monthlyDeposit = 0) {
  const data = [];
  let balance = startBalance;
  let totalDeposits = startBalance;
  let linearBalance = startBalance;
  const milestones = [];
  const milestoneTargets = [2, 3, 5, 10];
  const milestonesHit = new Set();

  for (let m = 0; m <= months; m++) {
    const profit = m === 0 ? 0 : balance * (monthlyPct / 100);
    const deposit = m === 0 ? 0 : monthlyDeposit;

    if (m > 0) {
      balance += profit + deposit;
      totalDeposits += deposit;
      linearBalance += (startBalance * monthlyPct / 100) + deposit;
    }

    const principal = Math.min(totalDeposits, balance);
    const compoundProfit = Math.max(0, balance - totalDeposits);

    data.push({
      month: m,
      balance: Math.round(balance * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      profit: Math.round(compoundProfit * 100) / 100,
      linear: Math.round(linearBalance * 100) / 100,
      monthlyProfit: Math.round(profit * 100) / 100,
      deposit,
    });

    // Check milestones
    const multiple = balance / startBalance;
    for (const target of milestoneTargets) {
      if (multiple >= target && !milestonesHit.has(target)) {
        milestonesHit.add(target);
        milestones.push({ month: m, multiple: target, balance: Math.round(balance) });
      }
    }
  }

  const finalBalance = data[data.length - 1].balance;
  const totalProfit = finalBalance - totalDeposits;
  const growthMultiple = finalBalance / startBalance;
  const linearFinal = data[data.length - 1].linear;
  const compoundAdvantage = finalBalance - linearFinal;

  return { data, milestones, finalBalance, totalProfit, totalDeposits, growthMultiple, compoundAdvantage, linearFinal };
}

/* ─── Drawdown Recovery Table ─── */
const DRAWDOWN_RECOVERY = [
  { loss: 10, recovery: 11.1 },
  { loss: 20, recovery: 25.0 },
  { loss: 30, recovery: 42.9 },
  { loss: 40, recovery: 66.7 },
  { loss: 50, recovery: 100.0 },
  { loss: 60, recovery: 150.0 },
  { loss: 70, recovery: 233.3 },
  { loss: 80, recovery: 400.0 },
  { loss: 90, recovery: 900.0 },
];

/* ─── Presets ─── */
const PRESETS = [
  { label: 'Conservative', desc: '$10k, 3%/mo, 12 months', balance: 10000, pct: 3, months: 12, deposit: 0 },
  { label: 'Realistic', desc: '$10k, 5%/mo, 24 months', balance: 10000, pct: 5, months: 24, deposit: 0 },
  { label: 'Ambitious', desc: '$10k, 8%/mo, 24 months', balance: 10000, pct: 8, months: 24, deposit: 0 },
  { label: 'DCA + Trading', desc: '$5k, 5%/mo + $500/mo deposit', balance: 5000, pct: 5, months: 24, deposit: 500 },
  { label: 'Prop Firm', desc: '$100k, 3%/mo, 12 months', balance: 100000, pct: 3, months: 12, deposit: 0 },
];

/* ─── FAQ Data ─── */
const FAQ_ITEMS = [
  {
    q: 'What is compound growth in trading?',
    a: 'Compound growth means reinvesting your trading profits so they generate additional returns. Instead of withdrawing profits each month, you trade with a larger account. Over time, this creates exponential growth — your profits earn their own profits. A 5% monthly return on $10,000 is $500 in month 1, but $814 by month 12 because the account has grown.',
  },
  {
    q: 'Is 5% per month realistic in trading?',
    a: 'Consistently achieving 5% per month puts you in the top tier of traders worldwide. Most hedge funds average 10-20% per year. A consistent 3-5% monthly return requires excellent risk management, a proven strategy, and strong emotional discipline. Start by tracking your actual monthly returns in a trading journal before projecting forward.',
  },
  {
    q: 'Why does this calculator show linear vs compound growth?',
    a: 'The linear line shows what happens if you make the same dollar amount each month (no reinvestment). The compound curve shows what happens when profits are reinvested. The gap between them — the "compound advantage" — grows exponentially over time. This visualization helps you understand why consistency matters more than occasional big wins.',
  },
  {
    q: 'What happens if I have a losing month?',
    a: 'A single losing month can set back compound growth significantly because you lose not just that month\'s potential profit, but all the compound returns those profits would have generated. A 20% loss requires a 25% gain just to break even. This is why risk management and capital preservation are more important than maximizing returns.',
  },
  {
    q: 'How do I know if my target return is sustainable?',
    a: 'Use this calculator alongside the Risk of Ruin Calculator to check if your expected monthly return is achievable without excessive risk. If you need 8% per month but your strategy\'s risk of ruin is above 10%, the compound projections are meaningless — you\'ll likely blow the account before reaching the target.',
  },
];

/* ─── Reality Check Messages ─── */
function getRealityCheck(monthlyPct) {
  if (monthlyPct <= 2) return { text: 'Very conservative. Achievable with proper risk management and a solid strategy.', color: '#00E676' };
  if (monthlyPct <= 4) return { text: 'Realistic for experienced traders. Requires consistency and discipline.', color: '#66BB6A' };
  if (monthlyPct <= 6) return { text: 'Ambitious. Only top-tier traders sustain this. Track your actual returns first.', color: '#FFB300' };
  if (monthlyPct <= 10) return { text: 'Very aggressive. Most traders who aim for this blow their accounts instead.', color: '#FF9800' };
  return { text: 'Unrealistic for sustained trading. This is gambling territory — expect drawdowns.', color: '#FF5252' };
}

/* ─── Format Currency ─── */
function fmt(n, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="rounded-lg px-3 py-2.5 text-xs" style={{ background: 'rgba(15,17,21,0.95)', border: '1px solid rgba(79,195,247,0.2)' }}>
      <p className="text-kmf-text-tertiary mb-1.5 font-semibold">Month {label}</p>
      <p className="text-kmf-accent">Balance: <span className="font-bold">{fmt(d.balance)}</span></p>
      <p style={{ color: '#00E676' }}>Compound profit: {fmt(d.profit)}</p>
      <p className="text-kmf-text-tertiary">Linear would be: {fmt(d.linear)}</p>
      {d.monthlyProfit > 0 && <p className="text-kmf-text-secondary mt-1">This month's profit: {fmt(d.monthlyProfit)}</p>}
      {d.deposit > 0 && <p className="text-kmf-text-secondary">+ {fmt(d.deposit)} deposit</p>}
    </div>
  );
}

/* ─── Input Component ─── */
function InputField({ label, value, onChange, prefix, suffix, min, max, step = 1, hint }) {
  return (
    <div>
      <label className="text-sm font-medium text-kmf-text-secondary block mb-1.5">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-kmf-text-tertiary">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full rounded-lg py-2.5 text-sm text-kmf-text-primary outline-none transition-all focus:ring-1 focus:ring-kmf-accent/40"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            paddingLeft: prefix ? '1.75rem' : '0.75rem',
            paddingRight: suffix ? '2.5rem' : '0.75rem',
          }}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-kmf-text-tertiary">{suffix}</span>}
      </div>
      {hint && <p className="text-[11px] text-kmf-text-tertiary mt-1">{hint}</p>}
    </div>
  );
}

/* ─── Slider Component ─── */
function SliderField({ label, value, onChange, min, max, step, suffix, hint, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-kmf-text-secondary">{label}</label>
        <span className="text-sm font-bold" style={{ color: color || '#4FC3F7' }}>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color || '#4FC3F7'} 0%, ${color || '#4FC3F7'} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
      {hint && <p className="text-[11px] text-kmf-text-tertiary mt-1">{hint}</p>}
    </div>
  );
}

/* ─── Explainer Box ─── */
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
            <strong className="text-kmf-text-primary">The problem:</strong> Most traders either set unrealistic profit targets (leading to overleveraging and blowing accounts) or don't understand how powerful consistency is (leading to impatience and strategy-hopping).
          </p>
          <p>
            <strong className="text-kmf-text-primary">What this tool does:</strong> It shows you exactly how your trading account grows over time if you maintain a consistent monthly return. The chart compares compound growth (reinvesting profits) versus linear growth (same fixed amount each month) so you can see why discipline compounds.
          </p>
          <p>
            <strong className="text-kmf-text-primary">How it helps:</strong> Set a realistic monthly target, see what's possible in 12-36 months, and stay motivated when individual trades feel small. If you're tempted to increase risk, look at this chart — small, consistent gains beat occasional big wins every time.
          </p>
          <p>
            <strong className="text-kmf-text-primary">Reality check:</strong> This calculator assumes consistent returns with no losing months. Real trading has drawdowns. Use the <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin Calculator</Link> alongside this tool to ensure your targets are sustainable.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function CompoundCalculatorPage() {
  const [balance, setBalance] = useState('10000');
  const [monthlyPct, setMonthlyPct] = useState('5');
  const [months, setMonths] = useState('24');
  const [deposit, setDeposit] = useState('0');
  const [showDeposit, setShowDeposit] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Parse inputs
  const params = useMemo(() => ({
    balance: Math.max(100, parseFloat(balance) || 10000),
    monthlyPct: Math.min(30, Math.max(0.5, parseFloat(monthlyPct) || 5)),
    months: Math.min(60, Math.max(3, parseInt(months) || 24)),
    deposit: Math.max(0, parseFloat(deposit) || 0),
  }), [balance, monthlyPct, months, deposit]);

  // Calculate
  const result = useMemo(() => {
    return calculateCompound(params.balance, params.monthlyPct, params.months, params.deposit);
  }, [params]);

  const realityCheck = useMemo(() => getRealityCheck(params.monthlyPct), [params.monthlyPct]);

  // Load preset
  const loadPreset = useCallback((preset) => {
    setBalance(String(preset.balance));
    setMonthlyPct(String(preset.pct));
    setMonths(String(preset.months));
    setDeposit(String(preset.deposit));
    setShowDeposit(preset.deposit > 0);
  }, []);

  // GA4 event
  useEffect(() => {
    window.gtag?.('event', 'compound_calculator_viewed', {
      starting_balance: params.balance,
      monthly_pct: params.monthlyPct,
      months: params.months,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          name: 'KMF Compound Vision — Trading Compound Growth Calculator',
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
            { '@type': 'ListItem', position: 3, name: 'Compound Calculator', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('compound-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'compound-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); link?.remove(); };
  }, []);

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
              <span className="bg-gradient-to-r from-kmf-accent to-cyan-300 bg-clip-text text-transparent">Compound Vision</span>
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto text-base">
              See what disciplined, consistent trading can build over time. Enter your balance and a realistic monthly target — and watch compounding do the heavy lifting.
            </p>
          </div>

          {/* Explainer */}
          <ExplainerBox />

          {/* Presets */}
          <div className="mb-8">
            <p className="text-xs text-kmf-text-tertiary text-center mb-3">Quick start with a scenario:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {PRESETS.map((s) => (
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

          {/* Main grid: inputs + results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* Inputs */}
            <div className="rounded-2xl p-5 space-y-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider">Your Numbers</h2>

              <InputField
                label="Starting Balance"
                value={balance}
                onChange={setBalance}
                prefix="$"
                min={100}
                max={10000000}
                step={100}
                hint="Your current trading account balance"
              />

              <SliderField
                label="Monthly Return"
                value={monthlyPct}
                onChange={setMonthlyPct}
                min={0.5}
                max={15}
                step={0.5}
                suffix="%"
                color={realityCheck.color}
              />
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg" style={{ background: `${realityCheck.color}10`, border: `1px solid ${realityCheck.color}25` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={realityCheck.color} className="shrink-0 mt-0.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p className="text-[11px] leading-relaxed" style={{ color: realityCheck.color }}>{realityCheck.text}</p>
              </div>

              <SliderField
                label="Timeframe"
                value={months}
                onChange={setMonths}
                min={3}
                max={60}
                step={1}
                suffix=" months"
                color="#4FC3F7"
              />

              {/* Monthly deposit toggle */}
              <div>
                <button
                  onClick={() => setShowDeposit(!showDeposit)}
                  className="text-xs text-kmf-accent hover:underline flex items-center gap-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: showDeposit ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                  </svg>
                  {showDeposit ? 'Hide monthly deposit' : 'Add monthly deposit (optional)'}
                </button>
                {showDeposit && (
                  <div className="mt-3">
                    <InputField
                      label="Monthly Deposit"
                      value={deposit}
                      onChange={setDeposit}
                      prefix="$"
                      min={0}
                      max={100000}
                      step={50}
                      hint="Extra capital added each month"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Result Cards */}
            <div className="lg:col-span-2 space-y-4">
              {/* Big result */}
              <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-sm text-kmf-text-tertiary mb-2">Projected balance after {params.months} months</p>
                <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ color: '#4FC3F7' }}>
                  {fmt(result.finalBalance)}
                </div>
                <p className="text-sm text-kmf-text-tertiary">
                  Starting from {fmt(params.balance)}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Total Profit', value: fmt(result.totalProfit), color: '#00E676', hint: 'Pure compound earnings' },
                  { label: 'Growth', value: `${result.growthMultiple.toFixed(1)}x`, color: '#4FC3F7', hint: 'Your money multiplied by' },
                  { label: 'Compound Advantage', value: `+${fmt(result.compoundAdvantage)}`, color: '#FFB300', hint: 'Extra vs. linear growth' },
                  { label: 'Month ' + params.months + ' Profit', value: fmt(result.data[result.data.length - 1]?.monthlyProfit || 0), color: '#00E676', hint: 'Last month\'s profit alone' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[11px] text-kmf-text-tertiary mb-1">{s.label}</p>
                    <p className="text-base sm:text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px] text-kmf-text-tertiary mt-0.5">{s.hint}</p>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              {result.milestones.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.milestones.map((m) => (
                    <div
                      key={m.multiple}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(79,195,247,0.08)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {m.multiple}x at month {m.month} ({fmt(m.balance)})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl p-5 mb-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider">Growth Projection</h2>
              <div className="flex items-center gap-4 text-[11px] text-kmf-text-tertiary">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#4FC3F7' }} /> Principal</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#00E676' }} /> Compound Profit</span>
                <span className="flex items-center gap-1"><span className="w-3 h-px" style={{ background: 'rgba(255,255,255,0.3)', borderTop: '2px dashed rgba(255,255,255,0.3)' }} /> Linear</span>
              </div>
            </div>
            <p className="text-[11px] text-kmf-text-tertiary mb-4">
              The shaded area shows your balance split between what you put in and what compounding generated. The dashed line = if you earned the same fixed amount every month.
            </p>
            <div className="h-[320px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4FC3F7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#4FC3F7" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E676" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#00E676" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                    label={{ value: 'Month', position: 'insideBottomRight', offset: -5, fill: '#6B7280', fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                    tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
                  />
                  <Tooltip content={<ChartTooltip />} />

                  {/* Milestone reference lines */}
                  {result.milestones.map((m) => (
                    <ReferenceLine
                      key={m.multiple}
                      y={params.balance * m.multiple}
                      stroke="rgba(79,195,247,0.2)"
                      strokeDasharray="4 4"
                      label={{ value: `${m.multiple}x`, fill: 'rgba(79,195,247,0.4)', fontSize: 10, position: 'right' }}
                    />
                  ))}

                  {/* Stacked areas */}
                  <Area
                    type="monotone"
                    dataKey="principal"
                    stackId="1"
                    stroke="#4FC3F7"
                    strokeWidth={0}
                    fill="url(#gradPrincipal)"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="1"
                    stroke="#00E676"
                    strokeWidth={2}
                    fill="url(#gradProfit)"
                  />

                  {/* Linear reference line */}
                  <Area
                    type="monotone"
                    dataKey="linear"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3 Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Consistency */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(0,230,118,0.04)', border: '1px solid rgba(0,230,118,0.12)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(0,230,118,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#00E676"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-kmf-text-primary mb-2">The Power of Consistency</h3>
              <p className="text-xs text-kmf-text-secondary leading-relaxed">
                A steady 5% per month beats alternating between +20% and -15%. The volatile trader ends up with less after 12 months because losses hurt more than equivalent gains help. Compounding rewards boring, consistent execution.
              </p>
            </div>

            {/* Small edges */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(79,195,247,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#4FC3F7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-kmf-text-primary mb-2">Why Small Edges Compound</h3>
              <p className="text-xs text-kmf-text-secondary leading-relaxed">
                The difference between 3% and 5% monthly seems small. Over 24 months: 3% turns $10k into $20,328 while 5% turns it into $32,251. That's 59% more — from just 2% extra per month. Small improvements in your edge have massive long-term impact.
              </p>
            </div>

            {/* Drawdown warning */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,82,82,0.04)', border: '1px solid rgba(255,82,82,0.12)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(255,82,82,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF5252"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-kmf-text-primary mb-2">The Real Enemy: Drawdown</h3>
              <p className="text-xs text-kmf-text-secondary leading-relaxed">
                A 50% loss requires a 100% gain to recover. Drawdowns don't just erase profit — they destroy the compounding engine. Capital preservation is the #1 priority. Every dollar you don't lose keeps compounding forever.
              </p>
            </div>
          </div>

          {/* Drawdown Recovery Table */}
          <div className="rounded-2xl p-5 mb-10" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider mb-1">Drawdown Recovery Table</h2>
            <p className="text-[11px] text-kmf-text-tertiary mb-4">How much you need to gain after a loss just to get back to breakeven.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-kmf-text-tertiary text-xs uppercase tracking-wider">
                    <th className="text-left py-2 px-3">Account Loss</th>
                    <th className="text-right py-2 px-3">Gain Needed to Recover</th>
                    <th className="text-right py-2 px-3 hidden sm:table-cell">Months to Recover at {params.monthlyPct}%/mo</th>
                  </tr>
                </thead>
                <tbody>
                  {DRAWDOWN_RECOVERY.map((row) => {
                    const monthsToRecover = params.monthlyPct > 0 ? Math.ceil(Math.log(1 + row.recovery / 100) / Math.log(1 + params.monthlyPct / 100)) : Infinity;
                    const dangerLevel = row.loss >= 50 ? '#FF5252' : row.loss >= 30 ? '#FF9800' : row.loss >= 20 ? '#FFB300' : '#8FB3C5';
                    return (
                      <tr key={row.loss} className="border-t border-white/5">
                        <td className="py-2.5 px-3 font-medium" style={{ color: dangerLevel }}>-{row.loss}%</td>
                        <td className="py-2.5 px-3 text-right font-bold" style={{ color: dangerLevel }}>+{row.recovery.toFixed(1)}%</td>
                        <td className="py-2.5 px-3 text-right text-kmf-text-secondary hidden sm:table-cell">
                          {monthsToRecover === Infinity ? '—' : `${monthsToRecover} months`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Breakdown Table */}
          <div className="rounded-2xl p-5 mb-10" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider mb-1">Monthly Breakdown</h2>
            <p className="text-[11px] text-kmf-text-tertiary mb-4">Detailed month-by-month projection.</p>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0" style={{ background: '#0F1115' }}>
                  <tr className="text-kmf-text-tertiary text-xs uppercase tracking-wider">
                    <th className="text-left py-2 px-3">Month</th>
                    <th className="text-right py-2 px-3">Balance Start</th>
                    <th className="text-right py-2 px-3">Profit</th>
                    {params.deposit > 0 && <th className="text-right py-2 px-3">Deposit</th>}
                    <th className="text-right py-2 px-3">Balance End</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.slice(1).map((row, i) => {
                    const prevBalance = result.data[i].balance;
                    return (
                      <tr key={row.month} className="border-t border-white/5" style={i % 2 === 0 ? { background: 'rgba(255,255,255,0.01)' } : {}}>
                        <td className="py-2 px-3 text-kmf-text-secondary">{row.month}</td>
                        <td className="py-2 px-3 text-right text-kmf-text-secondary">{fmt(prevBalance)}</td>
                        <td className="py-2 px-3 text-right font-medium" style={{ color: '#00E676' }}>+{fmt(row.monthlyProfit)}</td>
                        {params.deposit > 0 && <td className="py-2 px-3 text-right text-kmf-text-secondary">+{fmt(row.deposit)}</td>}
                        <td className="py-2 px-3 text-right font-bold text-kmf-text-primary">{fmt(row.balance)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Content */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6">Understanding Compound Growth in Trading</h2>

            <div className="space-y-6 text-kmf-text-secondary leading-relaxed">
              <p>
                Albert Einstein reportedly called compound interest "the eighth wonder of the world." In trading, compounding is even more powerful — because unlike savings accounts with fixed rates, a skilled trader can aim for significantly higher monthly returns.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">The Math That Changes Everything</h3>
              <p>
                A trader making 5% per month on a $10,000 account earns $500 in the first month. But by month 12, that same 5% generates $814 — because the account has grown to $16,289. By month 24, the monthly profit is $1,326 on a balance of $32,251. The percentage stays the same. The dollars grow exponentially.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">Why Most Traders Never Experience This</h3>
              <p>
                The compound growth curve above assumes consistent monthly returns with no major drawdowns. In reality, most traders sabotage their compounding by:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-kmf-text-primary">Overleveraging</strong> — chasing faster growth, then losing 20-30% in a bad week</li>
                <li><strong className="text-kmf-text-primary">Withdrawing too early</strong> — pulling profits instead of letting them compound</li>
                <li><strong className="text-kmf-text-primary">Strategy hopping</strong> — switching strategies before compounding has time to work</li>
                <li><strong className="text-kmf-text-primary">Revenge trading</strong> — after a loss, increasing risk to "make it back quickly"</li>
              </ul>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">The Realistic Approach</h3>
              <p>
                Use this calculator as a <em>motivational north star</em>, not a guarantee. Set a conservative target (3-5%), focus on <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">proper risk management</Link>, and track your actual results in a <Link to="/" className="text-kmf-accent hover:underline">trading journal</Link>. If your real monthly returns are consistently positive, compounding will work for you — even at lower rates than projected.
              </p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">Pair This With Risk Management</h3>
              <p>
                Compounding only works if you protect your capital. Use the <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin Calculator</Link> to ensure your strategy won't blow up before the compound effect kicks in. Check the <Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">Win Rate vs R:R Matrix</Link> to verify your edge is positive.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-16">
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
          <div className="text-center">
            <p className="text-kmf-text-tertiary text-sm mb-4">Part of the K.M.F. free trading tools suite</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/tools/risk-of-ruin"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
              >
                Risk of Ruin Calculator
              </Link>
              <Link
                to="/tools/win-rate-rr-matrix"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
              >
                Win Rate vs R:R Matrix
              </Link>
              <Link
                to="/tools/lot-size-calculator"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#8FB3C5', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Lot Size Calculator
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
