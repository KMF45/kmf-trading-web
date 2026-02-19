import { FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

// ── Category accent colors ──────────────────────────────────────────────────
const CAT = {
  forex:       { color: '#4FC3F7', glow: 'rgba(79,195,247,0.20)'  },
  metals:      { color: '#FFD740', glow: 'rgba(255,215,64,0.20)'  },
  crypto:      { color: '#FF9800', glow: 'rgba(255,152,0,0.20)'   },
  indices:     { color: '#26C6DA', glow: 'rgba(38,198,218,0.20)'  },
  commodities: { color: '#FFB74D', glow: 'rgba(255,183,77,0.20)'  },
};

// ── Orbit rings ──────────────────────────────────────────────────────────────
const ORBIT_RINGS = [
  {
    radius: 130,
    duration: 24,
    deorbitKeyframe: 'kmf-deorbit-130',
    symbols: [
      { name: 'EUR/USD', category: 'forex',   positive: true,  change: '+0.12%' },
      { name: 'GBP/USD', category: 'forex',   positive: false, change: '-0.08%' },
      { name: 'USD/JPY', category: 'forex',   positive: true,  change: '+0.21%' },
      { name: 'USD/CHF', category: 'forex',   positive: false, change: '-0.05%' },
    ],
  },
  {
    radius: 215,
    duration: 38,
    deorbitKeyframe: 'kmf-deorbit-215',
    symbols: [
      { name: 'XAU/USD', category: 'metals',  positive: true,  change: '+0.34%' },
      { name: 'BTC/USD', category: 'crypto',  positive: true,  change: '+1.24%' },
      { name: 'ETH/USD', category: 'crypto',  positive: false, change: '-0.67%' },
      { name: 'XRP/USD', category: 'crypto',  positive: true,  change: '+2.10%' },
      { name: 'XAG/USD', category: 'metals',  positive: false, change: '-0.18%' },
    ],
  },
  {
    radius: 300,
    duration: 56,
    deorbitKeyframe: 'kmf-deorbit-300',
    symbols: [
      { name: 'NAS100',  category: 'indices',     positive: true,  change: '+0.45%' },
      { name: 'SPX500',  category: 'indices',     positive: true,  change: '+0.31%' },
      { name: 'DAX40',   category: 'indices',     positive: false, change: '-0.22%' },
      { name: 'DJI30',   category: 'indices',     positive: true,  change: '+0.28%' },
      { name: 'OIL',     category: 'commodities', positive: false, change: '-0.18%' },
    ],
  },
];

// ── Single orbiting symbol badge ─────────────────────────────────────────────
const OrbitSymbol = ({ name, category, positive, change, duration, deorbitKeyframe, index, total }) => {
  const delay = -(index / total) * duration;
  const cat   = CAT[category];
  const plColor = positive ? '#00E676' : '#FF5252';

  const animBase = {
    animationTimingFunction:  'linear',
    animationIterationCount:  'infinite',
    animationDuration:        `${duration}s`,
    animationDelay:           `${delay}s`,
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 0, height: 0,
        animationName: 'kmf-orbit',
        willChange: 'transform',
        ...animBase,
      }}
    >
      <div style={{ position: 'absolute', animationName: deorbitKeyframe, willChange: 'transform', ...animBase }}>
        {/* center badge on orbit point */}
        <div style={{ transform: 'translate(-50%, -50%)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(15,17,21,0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${cat.color}40`,
              borderRadius: 999,
              padding: '5px 11px 5px 8px',
              whiteSpace: 'nowrap',
              boxShadow: `0 0 0 1px ${cat.color}15, 0 0 16px ${cat.glow}, 0 4px 12px rgba(0,0,0,0.5)`,
            }}
          >
            {/* category accent dot */}
            <div
              style={{
                width: 7, height: 7,
                borderRadius: '50%',
                backgroundColor: cat.color,
                boxShadow: `0 0 8px ${cat.color}`,
                flexShrink: 0,
              }}
            />
            {/* symbol name */}
            <span style={{ fontSize: 11, fontWeight: 700, color: '#E0E8EC', letterSpacing: '0.04em' }}>
              {name}
            </span>
            {/* divider */}
            <span style={{ width: 1, height: 10, backgroundColor: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
            {/* change indicator */}
            <span style={{ fontSize: 10, fontWeight: 600, color: plColor, letterSpacing: '0.02em' }}>
              {positive ? '▲' : '▼'} {change}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Background layer ─────────────────────────────────────────────────────────
const HeroBackground = () => (
  <div
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
  >
    {/* dot grid */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(rgba(79,195,247,0.13) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
    }} />

    {/* ambient orb — top-left */}
    <div style={{
      position: 'absolute', top: '-10%', left: '-5%',
      width: 480, height: 480,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(79,195,247,0.12) 0%, transparent 70%)',
      animation: 'kmf-orb-pulse 7s ease-in-out infinite',
      animationDelay: '0s',
    }} />

    {/* ambient orb — bottom-right */}
    <div style={{
      position: 'absolute', bottom: '-10%', right: '-5%',
      width: 520, height: 520,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(38,198,218,0.10) 0%, transparent 70%)',
      animation: 'kmf-orb-pulse 9s ease-in-out infinite',
      animationDelay: '3s',
    }} />

    {/* ambient orb — top-right, accent */}
    <div style={{
      position: 'absolute', top: '15%', right: '8%',
      width: 260, height: 260,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,152,0,0.07) 0%, transparent 70%)',
      animation: 'kmf-orb-pulse 11s ease-in-out infinite',
      animationDelay: '5s',
    }} />

    {/* center radial glow (behind logo) */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(79,195,247,0.09) 0%, transparent 65%)',
    }} />

    {/* orbit ring circles + symbols */}
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {ORBIT_RINGS.map((ring, ri) => (
        <div
          key={ri}
          style={{
            position: 'absolute',
            width: ring.radius * 2, height: ring.radius * 2,
            borderRadius: '50%',
            border: '1px solid rgba(79,195,247,0.07)',
          }}
        />
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

// ── Hero section ─────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    className="relative min-h-screen flex items-center justify-center bg-kmf-bg pt-20 overflow-hidden"
    aria-label="K.M.F. Trading Journal introduction"
  >
    <HeroBackground />

    <div className="container mx-auto px-4 text-center relative z-10">
      <div className="mb-8">
        <picture>
          <source srcSet="/logo-320.webp" type="image/webp" />
          <img
            src="/logo-320.png"
            alt="K.M.F. Trading Journal logo"
            className="w-40 h-40 mx-auto drop-shadow-[0_0_28px_rgba(79,195,247,0.65)]"
            width="160"
            height="160"
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

      <p className="text-xl text-kmf-text-tertiary max-w-3xl mx-auto mb-12">
        Professional trading journal for forex, stocks and crypto traders. Track your trades,
        analyze performance, and improve your strategy.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="#download"
          className="px-8 py-4 bg-kmf-accent-bright text-white text-lg font-semibold rounded-lg flex items-center gap-3 hover:shadow-glow transition-all duration-300 hover:scale-105"
          aria-label="Download K.M.F. Trading Journal for Android"
        >
          <FaDownload aria-hidden="true" />
          Download App
        </a>
        <a
          href="#features"
          className="px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent flex items-center gap-3 hover:bg-kmf-accent/10 transition-all duration-300"
          aria-label="Explore K.M.F. Trading Journal features"
        >
          <HiSparkles aria-hidden="true" />
          Explore Features
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
