import { FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

// ── Market ticker data ────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { symbol: 'EUR/USD', change: '+0.124%', positive: true },
  { symbol: 'GBP/USD', change: '-0.083%', positive: false },
  { symbol: 'XAU/USD', change: '+0.342%', positive: true },
  { symbol: 'BTC/USD', change: '+1.240%', positive: true },
  { symbol: 'NAS100',  change: '+0.451%', positive: true },
  { symbol: 'SPX500',  change: '+0.312%', positive: true },
  { symbol: 'USD/JPY', change: '+0.217%', positive: true },
  { symbol: 'ETH/USD', change: '-0.671%', positive: false },
  { symbol: 'OIL',     change: '-0.178%', positive: false },
  { symbol: 'DAX40',   change: '-0.224%', positive: false },
  { symbol: 'XAG/USD', change: '-0.183%', positive: false },
  { symbol: 'SOL/USD', change: '+3.210%', positive: true },
  { symbol: 'GBP/JPY', change: '+0.306%', positive: true },
  { symbol: 'AUD/USD', change: '-0.142%', positive: false },
];

// ── Scrolling market ticker ───────────────────────────────────────────────────
const MarketTicker = () => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      position: 'relative', width: '100%', overflow: 'hidden',
      borderTop: '1px solid rgba(79,195,247,0.08)',
      background: 'rgba(8,10,14,0.75)',
      backdropFilter: 'blur(12px)',
      padding: '10px 0',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 100, height: '100%', background: 'linear-gradient(to right, #0F1115, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: '100%', background: 'linear-gradient(to left, #0F1115, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', animation: 'kmf-ticker 32s linear infinite', width: 'max-content' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 22px', flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#7A9BB0', letterSpacing: '0.07em' }}>{item.symbol}</span>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: item.positive ? '#00C853' : '#FF5252' }}>
              {item.positive ? '▲' : '▼'} {item.change}
            </span>
            <span style={{ width: 1, height: 10, background: 'rgba(79,195,247,0.12)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Mock app preview card ─────────────────────────────────────────────────────
const AppPreview = () => (
  <div
    className="animate-float"
    style={{
      background: 'rgba(14, 18, 26, 0.97)',
      border: '1px solid rgba(79,195,247,0.16)',
      borderRadius: 20,
      padding: '22px',
      width: 310,
      boxShadow: '0 0 0 1px rgba(79,195,247,0.04), 0 24px 70px rgba(0,0,0,0.60), 0 0 60px rgba(79,195,247,0.05)',
    }}
  >
    {/* Titlebar */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#4FC3F7', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        K.M.F. Dashboard
      </span>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#FF5252', '#FFD740', '#00E676'].map((c, i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.55 }} />
        ))}
      </div>
    </div>

    {/* Balance */}
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 9.5, color: '#3D5A6A', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        Account Balance
      </p>
      <p style={{ fontSize: 27, fontWeight: 800, color: '#DFF0F8', letterSpacing: '-0.02em', lineHeight: 1 }}>
        $12,450<span style={{ color: '#4FC3F7', fontSize: 21 }}>.32</span>
      </p>
      <p style={{ fontSize: 11, color: '#00C853', fontWeight: 600, marginTop: 5, display: 'flex', alignItems: 'center', gap: 3 }}>
        <span>▲</span> +$1,234.50 this month
      </p>
    </div>

    {/* Metrics row */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, marginBottom: 14 }}>
      {[
        { label: 'Win Rate', value: '68%', color: '#00C853' },
        { label: 'Profit Factor', value: '2.1', color: '#4FC3F7' },
        { label: 'Max DD', value: '4.2%', color: '#FFD740' },
      ].map((s) => (
        <div key={s.label} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.055)',
          borderRadius: 10,
          padding: '9px 6px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
          <p style={{ fontSize: 8.5, color: '#3D5A6A', marginTop: 4, lineHeight: 1.2 }}>{s.label}</p>
        </div>
      ))}
    </div>

    {/* Sparkline */}
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 9.5, color: '#3D5A6A', fontWeight: 700, marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        Balance Curve
      </p>
      <svg width="100%" height="44" viewBox="0 0 266 44" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C18,38 30,35 50,31 S78,24 100,20 S128,15 152,13 S190,9 214,7 S244,5 266,3"
          fill="none" stroke="#4FC3F7" strokeWidth="1.8" strokeLinecap="round"
        />
        <path
          d="M0,40 C18,38 30,35 50,31 S78,24 100,20 S128,15 152,13 S190,9 214,7 S244,5 266,3 L266,44 L0,44 Z"
          fill="url(#sg)"
        />
      </svg>
    </div>

    {/* Recent trades */}
    <div>
      <p style={{ fontSize: 9.5, color: '#3D5A6A', fontWeight: 700, marginBottom: 9, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        Recent Trades
      </p>
      {[
        { symbol: 'EUR/USD', type: 'LONG',  result: 'WIN',  pnl: '+$124.50' },
        { symbol: 'XAU/USD', type: 'SHORT', result: 'WIN',  pnl: '+$89.20'  },
        { symbol: 'BTC/USD', type: 'LONG',  result: 'LOSS', pnl: '-$45.30'  },
      ].map((t, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 0',
          borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.045)' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.result === 'WIN' ? '#00C853' : '#FF5252', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#C0D5E2' }}>{t.symbol}</span>
            <span style={{ fontSize: 8.5, color: '#3D5A6A', background: 'rgba(255,255,255,0.055)', padding: '1px 5px', borderRadius: 4, fontWeight: 600 }}>{t.type}</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: t.pnl.startsWith('+') ? '#00C853' : '#FF5252' }}>{t.pnl}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: '10,000+', label: 'Trades Tracked' },
  { value: '22',      label: 'Instruments'    },
  { value: '8',       label: 'Languages'      },
  { value: '2',       label: 'Platforms'      },
];

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    className="relative min-h-screen flex flex-col bg-kmf-bg pt-20 overflow-hidden"
    aria-label="K.M.F. Trading Journal introduction"
  >
    {/* Background */}
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(79,195,247,0.075) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 90% 85% at 50% 48%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 48%, black 0%, transparent 100%)',
      }} />
      <div style={{ position: 'absolute', top: '-8%', left: '-4%', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,195,247,0.07) 0%, transparent 70%)', animation: 'kmf-orb-pulse 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-8%', right: '-4%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(38,198,218,0.05) 0%, transparent 70%)', animation: 'kmf-orb-pulse 11s ease-in-out infinite', animationDelay: '3s' }} />
      <div style={{ position: 'absolute', top: '35%', right: '8%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,195,247,0.04) 0%, transparent 70%)', animation: 'kmf-orb-pulse 14s ease-in-out infinite', animationDelay: '6s' }} />
    </div>

    {/* Main content — split layout */}
    <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center py-16">

        {/* Left: Text */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-kmf-accent/10 rounded-full border border-kmf-accent/25">
            <HiSparkles className="text-kmf-accent text-sm" aria-hidden="true" />
            <span className="text-kmf-accent text-sm font-semibold">Professional Trading Journal</span>
          </div>

          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-6">
            <picture>
              <source srcSet="/logo-80.webp" type="image/webp" />
              <img
                src="/logo.png"
                alt="K.M.F. Trading Journal logo"
                className="w-20 h-20 drop-shadow-[0_0_20px_rgba(79,195,247,0.50)]"
                width="80" height="80"
                fetchpriority="high"
              />
            </picture>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
            <span className="logo-text">K.M.F.</span>
            <br />
            <span className="text-kmf-text-primary">Trading Journal</span>
          </h1>

          <p className="text-lg font-semibold text-kmf-accent mb-5 tracking-[0.22em] uppercase">
            Keep Moving Forward
          </p>

          <p className="text-lg text-kmf-text-tertiary max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Professional trading journal for forex, stocks and crypto. Track trades,
            analyze performance, and build real discipline — from your phone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <a
              href="#download"
              className="px-8 py-4 bg-kmf-accent-bright text-white text-lg font-semibold rounded-lg flex items-center justify-center gap-3 hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <FaDownload aria-hidden="true" />
              Download App
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent flex items-center justify-center gap-3 hover:bg-kmf-accent/10 transition-all duration-300"
            >
              <HiSparkles aria-hidden="true" />
              Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-kmf-accent/10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold gradient-text">{s.value}</p>
                <p className="text-xs text-kmf-text-tertiary mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: App preview (desktop only) */}
        <div className="hidden lg:flex justify-center xl:justify-end">
          <AppPreview />
        </div>
      </div>
    </div>

    {/* Market ticker */}
    <div className="relative z-10">
      <MarketTicker />
    </div>
  </section>
);

export default Hero;
