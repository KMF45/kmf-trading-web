import { FaClock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

// ── Market ticker ─────────────────────────────────────────────────────────────
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
      <div style={{ display: 'flex', animation: 'kmf-ticker 32s linear infinite', width: 'max-content', willChange: 'transform' }}>
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
    className="relative min-h-screen flex flex-col items-center justify-center bg-kmf-bg pt-20 overflow-hidden"
    aria-label="K.M.F. Trading Journal introduction"
  >
    {/* Background */}
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(79,195,247,0.08) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />
      <div style={{ position: 'absolute', top: '-8%', left: '-4%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,195,247,0.09) 0%, transparent 70%)', animation: 'kmf-orb-pulse 8s ease-in-out infinite', willChange: 'transform, opacity' }} />
      <div style={{ position: 'absolute', bottom: '-8%', right: '-4%', width: 540, height: 540, borderRadius: '50%', background: 'radial-gradient(circle, rgba(38,198,218,0.07) 0%, transparent 70%)', animation: 'kmf-orb-pulse 10s ease-in-out infinite', animationDelay: '3s', willChange: 'transform, opacity' }} />
      <div style={{ position: 'absolute', top: '20%', right: '6%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,152,0,0.05) 0%, transparent 70%)', animation: 'kmf-orb-pulse 13s ease-in-out infinite', animationDelay: '6s', willChange: 'transform, opacity' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '6%', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,64,0.05) 0%, transparent 70%)', animation: 'kmf-orb-pulse 11s ease-in-out infinite', animationDelay: '2s', willChange: 'transform, opacity' }} />
      {/* vignette behind text */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 46%, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0.40) 50%, transparent 75%)' }} />
    </div>

    {/* Main content — centered */}
    <div className="container mx-auto px-4 text-center relative z-10 flex-1 flex flex-col items-center justify-center">
      <div className="mb-8">
        <picture>
          <source srcSet="/logo-320.webp" type="image/webp" />
          <img
            src="/logo-320.png"
            alt="K.M.F. Trading Journal logo"
            className="w-40 h-40 mx-auto drop-shadow-[0_0_24px_rgba(79,195,247,0.55)]"
            width="160" height="160"
            fetchpriority="high"
          />
        </picture>
      </div>

      <h1 className="text-6xl font-bold mb-6">
        <span className="logo-text">K.M.F.</span>
        <br />
        <span className="text-kmf-text-primary">Trading Journal</span>
      </h1>

      <p className="text-3xl font-semibold text-kmf-text-secondary mb-4">
        KEEP MOVING FORWARD
      </p>

      <p className="text-xl text-kmf-text-tertiary max-w-2xl mx-auto mb-12">
        Professional trading journal for forex, stocks and crypto traders. Track your trades,
        analyze performance, and improve your strategy.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <a
          href="#beta"
          className="px-8 py-4 text-white text-lg font-semibold rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}
        >
          <FaClock aria-hidden="true" />
          Coming Soon — Join Beta
        </a>
        <a
          href="#features"
          className="px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent flex items-center gap-3 hover:bg-kmf-accent/10 transition-all duration-300"
        >
          <HiSparkles aria-hidden="true" />
          Explore Features
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 pt-8 border-t border-kmf-accent/10 w-full max-w-2xl mx-auto">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold gradient-text">{s.value}</p>
            <p className="text-xs text-kmf-text-tertiary mt-1 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Market ticker — bottom strip */}
    <div className="relative z-10 w-full mt-8">
      <MarketTicker />
    </div>
  </section>
);

export default Hero;
