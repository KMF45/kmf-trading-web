import { FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

// ── Category accent colors ───────────────────────────────────────────────────
const CAT = {
  forex:       { color: '#4FC3F7', glow: 'rgba(79,195,247,0.14)'  },
  metals:      { color: '#FFD740', glow: 'rgba(255,215,64,0.14)'  },
  crypto:      { color: '#FF9800', glow: 'rgba(255,152,0,0.14)'   },
  indices:     { color: '#26C6DA', glow: 'rgba(38,198,218,0.14)'  },
  commodities: { color: '#FFB74D', glow: 'rgba(255,183,77,0.14)'  },
};

// ── 4 orbital rings, 22 symbols total ───────────────────────────────────────
const ORBIT_RINGS = [
  {
    radius: 130,
    duration: 24,
    deorbitKeyframe: 'kmf-deorbit-130',
    symbols: [
      { name: 'EUR/USD', category: 'forex',   positive: true,  change: '+0.124%' },
      { name: 'GBP/USD', category: 'forex',   positive: false, change: '-0.083%' },
      { name: 'USD/JPY', category: 'forex',   positive: true,  change: '+0.217%' },
      { name: 'USD/CHF', category: 'forex',   positive: false, change: '-0.051%' },
    ],
  },
  {
    radius: 215,
    duration: 38,
    deorbitKeyframe: 'kmf-deorbit-215',
    symbols: [
      { name: 'XAU/USD', category: 'metals',  positive: true,  change: '+0.342%' },
      { name: 'BTC/USD', category: 'crypto',  positive: true,  change: '+1.24%'  },
      { name: 'ETH/USD', category: 'crypto',  positive: false, change: '-0.671%' },
      { name: 'XRP/USD', category: 'crypto',  positive: true,  change: '+2.10%'  },
      { name: 'XAG/USD', category: 'metals',  positive: false, change: '-0.183%' },
    ],
  },
  {
    radius: 300,
    duration: 56,
    deorbitKeyframe: 'kmf-deorbit-300',
    symbols: [
      { name: 'NAS100',  category: 'indices',     positive: true,  change: '+0.451%' },
      { name: 'SPX500',  category: 'indices',     positive: true,  change: '+0.312%' },
      { name: 'DAX40',   category: 'indices',     positive: false, change: '-0.224%' },
      { name: 'DJI30',   category: 'indices',     positive: true,  change: '+0.285%' },
      { name: 'OIL',     category: 'commodities', positive: false, change: '-0.178%' },
    ],
  },
  {
    radius: 385,
    duration: 76,
    deorbitKeyframe: 'kmf-deorbit-385',
    symbols: [
      { name: 'GBP/JPY', category: 'forex',   positive: true,  change: '+0.306%' },
      { name: 'AUD/USD', category: 'forex',   positive: false, change: '-0.142%' },
      { name: 'SOL/USD', category: 'crypto',  positive: true,  change: '+3.21%'  },
      { name: 'EUR/GBP', category: 'forex',   positive: false, change: '-0.067%' },
      { name: 'FTSE100', category: 'indices', positive: true,  change: '+0.196%' },
      { name: 'LTC/USD', category: 'crypto',  positive: false, change: '-0.884%' },
    ],
  },
];

// ── Badge component ──────────────────────────────────────────────────────────
const OrbitSymbol = ({ name, category, positive, change, duration, deorbitKeyframe, index, total }) => {
  const delay   = -(index / total) * duration;
  const cat     = CAT[category];
  const plColor = positive ? '#00C853' : '#FF5252';

  const animBase = {
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDuration:       `${duration}s`,
    animationDelay:          `${delay}s`,
  };

  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%', width: 0, height: 0,
      animationName: 'kmf-orbit', willChange: 'transform', ...animBase,
    }}>
      <div style={{ position: 'absolute', animationName: deorbitKeyframe, willChange: 'transform', ...animBase }}>
        <div style={{ transform: 'translate(-50%, -50%)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            backgroundColor: 'rgba(12,14,18,0.78)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            border: `1px solid ${cat.color}30`,
            borderRadius: 999,
            padding: '4px 10px 4px 7px',
            whiteSpace: 'nowrap',
            boxShadow: `0 0 0 1px ${cat.color}10, 0 0 10px ${cat.glow}, 0 2px 8px rgba(0,0,0,0.45)`,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: cat.color,
              boxShadow: `0 0 5px ${cat.color}90`,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: '#D0DDE3', letterSpacing: '0.04em' }}>
              {name}
            </span>
            <span style={{ width: 1, height: 9, backgroundColor: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />
            <span style={{ fontSize: 9.5, fontWeight: 600, color: plColor, letterSpacing: '0.02em' }}>
              {positive ? '▲' : '▼'} {change}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Background ───────────────────────────────────────────────────────────────
const HeroBackground = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>

    {/* dot grid */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(rgba(79,195,247,0.10) 1px, transparent 1px)',
      backgroundSize: '34px 34px',
      maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
    }} />

    {/* ambient orbs */}
    <div style={{
      position: 'absolute', top: '-8%', left: '-4%', width: 500, height: 500, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(79,195,247,0.09) 0%, transparent 70%)',
      animation: 'kmf-orb-pulse 8s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute', bottom: '-8%', right: '-4%', width: 540, height: 540, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(38,198,218,0.07) 0%, transparent 70%)',
      animation: 'kmf-orb-pulse 10s ease-in-out infinite', animationDelay: '3s',
    }} />
    <div style={{
      position: 'absolute', top: '20%', right: '6%', width: 280, height: 280, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,152,0,0.05) 0%, transparent 70%)',
      animation: 'kmf-orb-pulse 13s ease-in-out infinite', animationDelay: '6s',
    }} />
    <div style={{
      position: 'absolute', bottom: '20%', left: '6%', width: 240, height: 240, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,215,64,0.05) 0%, transparent 70%)',
      animation: 'kmf-orb-pulse 11s ease-in-out infinite', animationDelay: '2s',
    }} />

    {/* dark vignette behind text so symbols don't fight with content */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 42% 52% at 50% 46%, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.55) 45%, transparent 72%)',
    }} />

    {/* orbit rings + symbols */}
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {ORBIT_RINGS.map((ring, ri) => (
        <div key={ri} style={{
          position: 'absolute',
          width: ring.radius * 2, height: ring.radius * 2,
          borderRadius: '50%',
          border: '1px solid rgba(79,195,247,0.06)',
        }} />
      ))}

      {ORBIT_RINGS.map((ring, ri) =>
        ring.symbols.map((sym, si) => (
          <OrbitSymbol
            key={`${ri}-${si}`}
            {...sym}
            duration={ring.duration}
            deorbitKeyframe={ring.deorbitKeyframe}
            index={si}
            total={ring.symbols.length}
          />
        ))
      )}
    </div>
  </div>
);

// ── Stats bar (fills empty bottom area) ─────────────────────────────────────
const stats = [
  { value: '10,000+', label: 'Trades Tracked' },
  { value: '22',      label: 'Instruments'     },
  { value: '8',       label: 'Languages'       },
  { value: '2',       label: 'Platforms'       },
];

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    className="relative min-h-screen flex flex-col items-center justify-center bg-kmf-bg pt-20 overflow-hidden"
    aria-label="K.M.F. Trading Journal introduction"
  >
    <HeroBackground />

    {/* main content */}
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
          href="#download"
          className="px-8 py-4 bg-kmf-accent-bright text-white text-lg font-semibold rounded-lg flex items-center gap-3 hover:shadow-glow transition-all duration-300 hover:scale-105"
        >
          <FaDownload aria-hidden="true" />
          Download App
        </a>
        <a
          href="#features"
          className="px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent flex items-center gap-3 hover:bg-kmf-accent/10 transition-all duration-300"
        >
          <HiSparkles aria-hidden="true" />
          Explore Features
        </a>
      </div>
    </div>

    {/* stats bar — fills empty bottom space */}
    <div className="relative z-10 w-full border-t border-kmf-accent/10 bg-kmf-bg/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-kmf-accent/10">
          {stats.map((s) => (
            <div key={s.label} className="py-5 text-center">
              <p className="text-2xl font-bold gradient-text">{s.value}</p>
              <p className="text-xs text-kmf-text-tertiary mt-0.5 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
