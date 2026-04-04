import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

const PAGE_TITLE = 'Win Rate vs R:R Matrix — Find Your Profitable Zone | K.M.F.';
const PAGE_DESC = 'Interactive heatmap showing every combination of win rate and reward:risk ratio. Instantly see which setups are profitable and where your trading strategy sits on the profitability spectrum.';
const PAGE_URL = 'https://kmfjournal.com/tools/win-rate-rr-matrix';
const OG_IMAGE = 'https://kmfjournal.com/og/win-rate-rr-matrix.jpg';

// Win rate columns: 20% → 80% (step 5)
const WIN_RATES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
// R:R rows: 0.3 → 5.0
const RR_VALUES = [5.0, 4.0, 3.0, 2.5, 2.0, 1.5, 1.25, 1.0, 0.75, 0.5, 0.3];

function calcExpectancy(winRate, rr) {
  const w = winRate / 100;
  return w * rr - (1 - w) * 1;
}

// Color: deep red → neutral gray → emerald green
function expectancyColor(e) {
  if (e > 0) {
    // green intensity
    const t = Math.min(e / 1.5, 1);
    const r = Math.round(0 + t * 0);
    const g = Math.round(40 + t * 165);
    const b = Math.round(30 + t * 65);
    return { bg: `rgba(${r},${g},${b},${0.25 + t * 0.55})`, text: t > 0.4 ? '#00E676' : '#4CAF50', border: `rgba(0,${140 + Math.round(t * 100)},${50 + Math.round(t * 50)},${0.3 + t * 0.4})` };
  } else if (e === 0) {
    return { bg: 'rgba(255,179,0,0.18)', text: '#FFB300', border: 'rgba(255,179,0,0.35)' };
  } else {
    const t = Math.min(Math.abs(e) / 1.2, 1);
    return { bg: `rgba(${Math.round(120 + t * 135)},${Math.round(30 - t * 10)},${Math.round(30 - t * 10)},${0.2 + t * 0.5})`, text: t > 0.5 ? '#FF5252' : '#EF9A9A', border: `rgba(${Math.round(180 + t * 75)},50,50,${0.25 + t * 0.35})` };
  }
}

function ExpectancyLabel({ e }) {
  const sign = e > 0 ? '+' : '';
  const abs = Math.abs(e);
  return (
    <span className="font-bold tabular-nums" style={{ fontSize: 'clamp(9px, 1.1vw, 13px)' }}>
      {sign}{e.toFixed(2)}R
    </span>
  );
}

const FAQ_ITEMS = [
  {
    q: 'What does the matrix show?',
    a: 'Each cell shows the expectancy — how much you earn (or lose) on average per unit of risk. A value of +0.5R means for every $100 you risk, you gain $50 on average over many trades. Negative values mean you lose money long-term regardless of how selective you are.',
  },
  {
    q: 'Why can a 40% win rate be profitable?',
    a: 'Because it depends on how much you make when you win vs lose. With a 40% win rate and 3:1 R:R, your expectancy is +0.6R — strongly profitable. You lose 60% of trades but your winners are 3× bigger than losers. This is why R:R matters more than win rate alone.',
  },
  {
    q: 'Where do I find my win rate and R:R?',
    a: 'From your trading journal. Win rate = wins ÷ total trades × 100. R:R = average profit on winning trades ÷ average loss on losing trades. You need at least 30–50 trades for the numbers to be meaningful.',
  },
  {
    q: 'What R:R should I target?',
    a: 'Most professional traders target at least 1.5:1. This gives you a comfortable buffer — you can be wrong 40% of the time and still be profitable. Higher R:R (2:1, 3:1) means you can afford an even lower win rate, which is realistic for swing and position traders.',
  },
  {
    q: 'Is a green cell enough to be profitable?',
    a: 'It\'s necessary but not sufficient. You also need consistent execution, proper position sizing, and enough trades for the statistics to play out. A strategy with +0.3R expectancy can still lose money short-term due to variance. But without positive expectancy, nothing else matters.',
  },
];

export default function WinRateRRMatrixPage() {
  const [winRate, setWinRate] = useState(50);
  const [rr, setRr] = useState(2.0);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const matrixRef = useRef(null);
  const animFrameRef = useRef(null);

  // Animate cells in on mount
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
          name: 'Win Rate vs R:R Matrix',
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
            { '@type': 'ListItem', position: 3, name: 'Win Rate vs R:R Matrix', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('matrix-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'matrix-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); };
  }, []);

  // GA4 tracking
  const tracked = useRef(false);
  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      window.gtag?.('event', 'win_rate_rr_matrix_viewed', { win_rate: winRateNum, rr });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const winRateNum = useMemo(() => {
    const n = parseFloat(winRate);
    return isNaN(n) ? 50 : Math.min(99, Math.max(1, n));
  }, [winRate]);

  const myExpectancy = useMemo(() => calcExpectancy(winRateNum, rr), [winRateNum, rr]);

  // Find closest cell indices for the marker
  const markerCol = useMemo(() => {
    let idx = 0, minD = Infinity;
    WIN_RATES.forEach((w, i) => { const d = Math.abs(w - winRateNum); if (d < minD) { minD = d; idx = i; } });
    return idx;
  }, [winRateNum]);
  const markerRow = useMemo(() => {
    let idx = 0, minD = Infinity;
    RR_VALUES.forEach((r, i) => { const d = Math.abs(r - rr); if (d < minD) { minD = d; idx = i; } });
    return idx;
  }, [rr]);

  const handleSlider = useCallback((setter) => (e) => {
    setter(parseFloat(e.target.value));
  }, []);

  const handleWinRateInput = useCallback((e) => {
    const val = e.target.value;
    if (val === '') { setWinRate(''); return; }
    const n = parseFloat(val);
    if (!isNaN(n)) setWinRate(Math.min(99, Math.max(1, n)));
  }, []);

  const myColor = expectancyColor(myExpectancy);

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-10" style={{ animation: 'kmf-fadeIn 0.5s ease both' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
              </svg>
              Free Trading Tool
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Win Rate vs{' '}
              <span className="gradient-text">R:R Matrix</span>
            </h1>
            <p className="text-kmf-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every cell shows your <strong className="text-kmf-text-primary">expectancy per trade</strong>. Green = profitable long-term. Red = losing money no matter how disciplined you are.
            </p>
          </div>

          {/* Explainer box */}
          <div className="rounded-2xl p-5 mb-8"
            style={{ background: 'rgba(79,195,247,0.05)', border: '1px solid rgba(79,195,247,0.15)', animation: 'kmf-fadeIn 0.6s ease 0.1s both' }}>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ background: 'rgba(79,195,247,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#4FC3F7">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <div>
                <p className="text-kmf-text-secondary text-sm leading-relaxed">
                  <strong className="text-kmf-text-primary">How to read this:</strong> Find your win rate on the horizontal axis and your average R:R on the vertical axis. The cell where they meet shows your <strong className="text-kmf-text-primary">expectancy</strong> — how much you earn per $1 risked, on average. <strong className="text-kmf-accent">+0.5R</strong> means you gain $50 for every $100 risked over time. <strong style={{ color: '#FF5252' }}>−0.3R</strong> means you lose $30 per $100 risked — no strategy will save you.
                </p>
                <p className="text-kmf-text-tertiary text-xs mt-2">
                  Formula: Expectancy = (Win Rate × Avg Win) − (Loss Rate × Avg Loss). Loss is always normalized to 1R.
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-2xl p-6 mb-8"
            style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(255,255,255,0.07)', animation: 'kmf-fadeIn 0.6s ease 0.15s both' }}>
            <p className="text-sm font-semibold text-kmf-text-secondary mb-5 uppercase tracking-wider">Your Strategy</p>
            <div className="grid sm:grid-cols-2 gap-8">

              {/* Win Rate slider + input */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-kmf-text-primary">Win Rate</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-lg overflow-hidden"
                      style={{ border: '1px solid rgba(79,195,247,0.3)', background: 'rgba(79,195,247,0.07)' }}>
                      <input
                        type="number"
                        min="1" max="99" step="1"
                        value={winRate}
                        onChange={handleWinRateInput}
                        onBlur={() => {
                          const n = parseFloat(winRate);
                          if (isNaN(n) || winRate === '') setWinRate(50);
                          else setWinRate(Math.min(99, Math.max(1, n)));
                        }}
                        className="w-14 text-center text-lg font-bold bg-transparent outline-none py-1 tabular-nums"
                        style={{ color: '#4FC3F7' }}
                        aria-label="Win rate percentage"
                      />
                      <span className="pr-2.5 text-sm font-semibold" style={{ color: '#4FC3F7' }}>%</span>
                    </div>
                  </div>
                </div>
                <input
                  type="range" min="1" max="99" step="1"
                  value={isNaN(parseFloat(winRate)) ? 50 : Math.min(99, Math.max(1, parseFloat(winRate)))}
                  onChange={handleSlider(setWinRate)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#4FC3F7', background: `linear-gradient(to right, #4FC3F7 ${((Math.min(99, Math.max(1, parseFloat(winRate) || 50))-1)/98)*100}%, rgba(79,195,247,0.15) 0%)` }}
                />
                <div className="flex justify-between text-xs text-kmf-text-tertiary mt-1.5">
                  <span>1%</span><span>50%</span><span>99%</span>
                </div>
                <p className="text-xs text-kmf-text-tertiary mt-2">
                  {(parseFloat(winRate) || 50) < 35 ? 'Low win rate — needs high R:R to be profitable'
                    : (parseFloat(winRate) || 50) < 50 ? 'Below 50% — still profitable with good R:R'
                    : (parseFloat(winRate) || 50) < 65 ? 'Solid win rate — even moderate R:R works'
                    : 'High win rate — can afford lower R:R targets'}
                </p>
              </div>

              {/* R:R slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-kmf-text-primary">Average R:R</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold" style={{ color: '#4FC3F7' }}>1:{rr.toFixed(2)}</span>
                  </div>
                </div>
                <input
                  type="range" min="0.3" max="5.0" step="0.05"
                  value={rr}
                  onChange={handleSlider(setRr)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#4FC3F7', background: `linear-gradient(to right, #4FC3F7 ${((rr-0.3)/4.7)*100}%, rgba(79,195,247,0.15) 0%)` }}
                />
                <div className="flex justify-between text-xs text-kmf-text-tertiary mt-1.5">
                  <span>0.3</span><span>2.5</span><span>5.0</span>
                </div>
                <p className="text-xs text-kmf-text-tertiary mt-2">
                  {rr < 0.8 ? 'Below 1:1 — win rate must be very high to compensate'
                    : rr < 1.5 ? 'Moderate — typical for scalpers, requires high win rate'
                    : rr < 2.5 ? 'Good R:R — gives you margin for lower win rate'
                    : 'Excellent R:R — even 30% win rate can be profitable'}
                </p>
              </div>
            </div>

            {/* Your result card */}
            <div className="mt-6 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: myExpectancy > 0 ? 'rgba(0,200,83,0.08)' : myExpectancy === 0 ? 'rgba(255,179,0,0.08)' : 'rgba(255,82,82,0.08)', border: `1px solid ${myColor.border}`, transition: 'all 0.3s ease' }}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: myColor.text }}>
                  Your Expectancy
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tabular-nums" style={{ color: myColor.text }}>
                    {myExpectancy > 0 ? '+' : ''}{myExpectancy.toFixed(3)}R
                  </span>
                  <span className="text-sm text-kmf-text-tertiary">per trade</span>
                </div>
              </div>
              <div className="text-sm text-kmf-text-secondary max-w-xs">
                {myExpectancy > 0.5
                  ? <><strong style={{ color: myColor.text }}>Strong edge.</strong> On every $1,000 risked, you earn ~${(myExpectancy * 1000).toFixed(0)} on average.</>
                  : myExpectancy > 0
                  ? <><strong style={{ color: myColor.text }}>Slight edge.</strong> Profitable, but thin. Every $1,000 risked earns ~${(myExpectancy * 1000).toFixed(0)}. Improve R:R or win rate to widen the margin.</>
                  : myExpectancy === 0
                  ? <><strong style={{ color: myColor.text }}>Break-even.</strong> No edge. Commissions alone will make you unprofitable. Push R:R higher.</>
                  : <><strong style={{ color: myColor.text }}>Losing strategy.</strong> Every $1,000 risked loses ~${(Math.abs(myExpectancy) * 1000).toFixed(0)}. No position sizing fix will save a negative expectancy.</>
                }
              </div>
            </div>
          </div>

          {/* Matrix */}
          <div className="rounded-2xl overflow-hidden mb-8"
            style={{ background: 'rgba(20,23,30,0.9)', border: '1px solid rgba(255,255,255,0.07)', animation: 'kmf-fadeIn 0.6s ease 0.2s both' }}
            ref={matrixRef}>

            {/* Legend */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-sm font-semibold text-kmf-text-primary">Expectancy Heatmap</p>
              <div className="flex items-center gap-4 text-xs text-kmf-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(220,50,50,0.6)' }}></span> Losing
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(255,179,0,0.5)' }}></span> Break-even
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(0,180,80,0.6)' }}></span> Profitable
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div style={{ minWidth: 600, padding: '16px 12px 12px' }}>

                {/* Column headers (Win Rate) */}
                <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(13, 1fr)', gap: 3, marginBottom: 4 }}>
                  <div className="text-xs text-kmf-text-tertiary text-center flex items-end justify-center pb-1">
                    R:R ↓ / WR →
                  </div>
                  {WIN_RATES.map(w => (
                    <div key={w}
                      className="text-center text-xs font-semibold pb-1 rounded-t-md transition-colors"
                      style={{
                        color: Math.abs(w - winRateNum) < 3 ? '#4FC3F7' : 'rgba(143,179,197,0.7)',
                        background: Math.abs(w - winRateNum) < 3 ? 'rgba(79,195,247,0.08)' : 'transparent',
                      }}>
                      {w}%
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {RR_VALUES.map((rrVal, rowIdx) => (
                  <div key={rrVal} style={{ display: 'grid', gridTemplateColumns: '56px repeat(13, 1fr)', gap: 3, marginBottom: 3 }}>

                    {/* Row header (R:R) */}
                    <div className="flex items-center justify-end pr-2 text-xs font-semibold"
                      style={{
                        color: Math.abs(rrVal - rr) < 0.15 ? '#4FC3F7' : 'rgba(143,179,197,0.7)',
                      }}>
                      1:{rrVal}
                    </div>

                    {/* Cells */}
                    {WIN_RATES.map((wrVal, colIdx) => {
                      const e = calcExpectancy(wrVal, rrVal);
                      const colors = expectancyColor(e);
                      const isMarker = rowIdx === markerRow && colIdx === markerCol;
                      const isHovered = hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
                      const delay = revealed ? 0 : (rowIdx * WIN_RATES.length + colIdx) * 12;

                      return (
                        <div key={wrVal}
                          onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx, e, wr: wrVal, rr: rrVal })}
                          onMouseLeave={() => setHoveredCell(null)}
                          style={{
                            background: colors.bg,
                            border: `1px solid ${isMarker ? '#4FC3F7' : isHovered ? colors.border : 'transparent'}`,
                            borderRadius: 6,
                            height: 38,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'default',
                            position: 'relative',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                            transform: isHovered ? 'scale(1.08)' : isMarker ? 'scale(1.04)' : 'scale(1)',
                            boxShadow: isMarker
                              ? `0 0 0 2px #4FC3F7, 0 0 16px rgba(79,195,247,0.4)`
                              : isHovered
                              ? `0 4px 16px rgba(0,0,0,0.4), 0 0 8px ${colors.border}`
                              : 'none',
                            zIndex: isMarker || isHovered ? 10 : 1,
                            animation: revealed ? 'none' : `kmf-cell-appear 0.3s ease ${delay}ms both`,
                          }}>
                          <span style={{ color: colors.text, fontWeight: 700, fontSize: 'clamp(8px, 1vw, 12px)', fontVariantNumeric: 'tabular-nums' }}>
                            {e > 0 ? '+' : ''}{e.toFixed(2)}R
                          </span>

                          {/* Marker dot */}
                          {isMarker && (
                            <div style={{
                              position: 'absolute',
                              top: -4,
                              right: -4,
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              background: '#4FC3F7',
                              border: '2px solid #0F1115',
                              animation: 'kmf-marker-pulse 1.8s ease-in-out infinite',
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Hover tooltip */}
            {hoveredCell && (
              <div className="mx-3 mb-3 rounded-xl px-4 py-3 flex flex-wrap gap-x-6 gap-y-1 items-center"
                style={{ background: 'rgba(30,33,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', animation: 'kmf-fadeIn 0.15s ease both' }}>
                <span className="text-xs text-kmf-text-tertiary">Win Rate: <strong className="text-kmf-text-primary">{hoveredCell.wr}%</strong></span>
                <span className="text-xs text-kmf-text-tertiary">R:R: <strong className="text-kmf-text-primary">1:{hoveredCell.rr}</strong></span>
                <span className="text-xs text-kmf-text-tertiary">Expectancy: <strong style={{ color: expectancyColor(hoveredCell.e).text }}>{hoveredCell.e > 0 ? '+' : ''}{hoveredCell.e.toFixed(4)}R</strong></span>
                <span className="text-xs text-kmf-text-tertiary">Per $1,000 risked: <strong style={{ color: expectancyColor(hoveredCell.e).text }}>{hoveredCell.e > 0 ? '+' : ''}${(hoveredCell.e * 1000).toFixed(0)}</strong></span>
                <span className="text-xs ml-auto" style={{ color: expectancyColor(hoveredCell.e).text }}>
                  {hoveredCell.e > 0.5 ? 'Strong edge' : hoveredCell.e > 0 ? 'Slight edge' : hoveredCell.e === 0 ? 'Break-even' : hoveredCell.e > -0.5 ? 'Weak negative' : 'Strong losing'}
                </span>
              </div>
            )}
          </div>

          {/* Key insight cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10" style={{ animation: 'kmf-fadeIn 0.6s ease 0.3s both' }}>
            {[
              {
                color: '#FF5252',
                bg: 'rgba(255,82,82,0.08)',
                border: 'rgba(255,82,82,0.2)',
                icon: '⚠',
                title: 'The Win Rate Trap',
                body: 'A 70% win rate sounds impressive — but if your average loss is 3× bigger than your average win, you lose money. R:R is more important than win rate.',
              },
              {
                color: '#4FC3F7',
                bg: 'rgba(79,195,247,0.08)',
                border: 'rgba(79,195,247,0.2)',
                icon: '⚡',
                title: 'The Break-Even Diagonal',
                body: 'The yellow cells form a diagonal line. This is the break-even frontier. Every combination on it earns nothing. You need to be above it to survive long-term.',
              },
              {
                color: '#00E676',
                bg: 'rgba(0,230,118,0.08)',
                border: 'rgba(0,230,118,0.2)',
                icon: '✓',
                title: 'The Professional Zone',
                body: 'Most full-time traders operate between 40–55% win rate with 1.5:1–3:1 R:R. Boring? Yes. Sustainably profitable? Also yes.',
              },
            ].map((card, i) => (
              <div key={i} className="rounded-2xl p-5"
                style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                <div className="text-2xl mb-3" style={{ color: card.color }}>{card.icon}</div>
                <h3 className="font-bold text-kmf-text-primary mb-2 text-sm">{card.title}</h3>
                <p className="text-kmf-text-secondary text-xs leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Educational content */}
          <div className="rounded-2xl p-6 sm:p-8 mb-10"
            style={{ background: 'rgba(26,29,36,0.6)', border: '1px solid rgba(255,255,255,0.07)', animation: 'kmf-fadeIn 0.6s ease 0.35s both' }}>
            <h2 className="text-xl font-bold text-kmf-text-primary mb-6">Why Most Traders Think About This Wrong</h2>

            <div className="space-y-5 text-kmf-text-secondary text-sm leading-relaxed">
              <p>
                Beginners fixate on win rate. They want to be "right" most of the time. But trading isn't a test — it's a business. The only metric that matters is: <strong className="text-kmf-text-primary">does your strategy make money over a large sample of trades?</strong>
              </p>
              <p>
                That's what expectancy measures. It strips away all the noise — the hot streaks, the bad days, the lucky trades — and tells you what your strategy actually earns per unit of risk. A positive expectancy means the edge is real. A negative expectancy means no amount of discipline, psychology work, or risk management will save you.
              </p>
              <p>
                <strong className="text-kmf-text-primary">The matrix above shows every possible combination.</strong> Notice how the green zone covers a wide diagonal band — there are many paths to profitability. A scalper with 70% win rate and 0.75:1 R:R is in the same green band as a swing trader with 35% win rate and 3:1 R:R. Different styles, same math.
              </p>
              <p>
                The red zone is unforgiving. Once you're there, no trick saves you. If you recognize your numbers in the red, the fix is one of two things: improve your entries (win rate) or improve your exits (R:R). Usually improving R:R is easier — it doesn't require you to be more "right," just more patient with winners and faster with losers.
              </p>
              <p className="text-kmf-text-tertiary text-xs">
                Don't know your win rate or R:R? That's exactly why a <Link to="/" className="text-kmf-accent hover:underline">trading journal</Link> exists. After 30–50 logged trades, you'll have statistically meaningful numbers — and you'll be able to find your exact cell in this matrix.
              </p>
            </div>
          </div>

          {/* Cross-links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10" style={{ animation: 'kmf-fadeIn 0.6s ease 0.4s both' }}>
            <Link to="/tools/risk-of-ruin" className="group rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(79,195,247,0.12)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(79,195,247,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4FC3F7">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-kmf-text-primary text-sm group-hover:text-kmf-accent transition-colors">Risk of Ruin Calculator →</p>
                <p className="text-xs text-kmf-text-tertiary mt-0.5">See if your account can survive long losing streaks</p>
              </div>
            </Link>
            <Link to="/tools/lot-size-calculator" className="group rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(79,195,247,0.12)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(79,195,247,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4FC3F7">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm3-4H7v-2h8v2zm2-4H7V7h10v2z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-kmf-text-primary text-sm group-hover:text-kmf-accent transition-colors">Lot Size Calculator →</p>
                <p className="text-xs text-kmf-text-tertiary mt-0.5">Size your positions to match your target R:R</p>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center mb-10"
            style={{ background: 'linear-gradient(135deg, rgba(79,195,247,0.08) 0%, rgba(0,200,83,0.06) 100%)', border: '1px solid rgba(79,195,247,0.15)', animation: 'kmf-fadeIn 0.6s ease 0.45s both' }}>
            <p className="text-kmf-text-secondary text-sm mb-1">Don't know your real win rate or R:R?</p>
            <p className="text-kmf-text-primary font-semibold text-base mb-4">Track your trades. Your stats will find their cell automatically.</p>
            <a href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal"
              target="_blank" rel="noopener noreferrer"
              onClick={() => window.gtag?.('event', 'play_store_click', { source: 'win_rate_rr_matrix_cta' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #4FC3F7, #0288D1)', color: '#fff', boxShadow: '0 4px 20px rgba(79,195,247,0.3)' }}
              aria-label="Download K.M.F. Trading Journal on Google Play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.86l1.308.756c.884.512.884 1.791 0 2.303l-1.308.756-2.543-2.543 2.543-2.272zm-12.49-7.205L15.145 9.98l-2.302 2.302-8.635-8.64z"/>
              </svg>
              Download Free on Google Play
            </a>
          </div>

          {/* FAQ */}
          <div style={{ animation: 'kmf-fadeIn 0.6s ease 0.5s both' }}>
            <h2 className="text-xl font-bold text-kmf-text-primary mb-5">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden"
                  style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    aria-expanded={openFaq === i}>
                    <span className="font-medium text-kmf-text-primary text-sm pr-4">{item.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      className="flex-shrink-0 text-kmf-text-tertiary transition-transform"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                      strokeWidth="2" strokeLinecap="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-kmf-text-secondary text-sm leading-relaxed border-t"
                      style={{ borderColor: 'rgba(255,255,255,0.05)', animation: 'kmf-fadeIn 0.2s ease both' }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
