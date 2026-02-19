import { FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const ORBIT_RINGS = [
  {
    radius: 135,
    duration: 22,
    deorbitKeyframe: 'kmf-deorbit-135',
    symbols: [
      { name: 'EUR/USD', positive: true },
      { name: 'GBP/USD', positive: false },
      { name: 'USD/JPY', positive: true },
    ],
  },
  {
    radius: 215,
    duration: 35,
    deorbitKeyframe: 'kmf-deorbit-215',
    symbols: [
      { name: 'XAU/USD', positive: true },
      { name: 'BTC/USD', positive: true },
      { name: 'ETH/USD', positive: false },
      { name: 'OIL',     positive: false },
    ],
  },
  {
    radius: 295,
    duration: 52,
    deorbitKeyframe: 'kmf-deorbit-295',
    symbols: [
      { name: 'NAS100', positive: true },
      { name: 'SPX500', positive: true },
      { name: 'DAX40',  positive: false },
    ],
  },
];

const OrbitSymbol = ({ name, positive, duration, deorbitKeyframe, index, total }) => {
  const delay = -(index / total) * duration;
  const dotColor   = positive ? '#00E676' : '#FF5252';
  const borderColor = positive ? 'rgba(0,230,118,0.25)' : 'rgba(255,82,82,0.25)';
  const glowColor   = positive ? 'rgba(0,230,118,0.12)' : 'rgba(255,82,82,0.12)';

  const animBase = {
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        animationName: 'kmf-orbit',
        willChange: 'transform',
        ...animBase,
      }}
    >
      <div
        style={{
          position: 'absolute',
          animationName: deorbitKeyframe,
          willChange: 'transform',
          ...animBase,
        }}
      >
        {/* center the badge on the orbit point */}
        <div style={{ transform: 'translate(-50%, -50%)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'rgba(15,17,21,0.90)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${borderColor}`,
              borderRadius: 999,
              padding: '4px 10px',
              whiteSpace: 'nowrap',
              boxShadow: `0 0 14px ${glowColor}, 0 2px 8px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: dotColor,
                boxShadow: `0 0 6px ${dotColor}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#B0BEC5',
                letterSpacing: '0.04em',
              }}
            >
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrbitalBackground = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    {/* Orbit ring circles */}
    {ORBIT_RINGS.map((ring, ri) => (
      <div
        key={ri}
        style={{
          position: 'absolute',
          width: ring.radius * 2,
          height: ring.radius * 2,
          borderRadius: '50%',
          border: '1px solid rgba(79,195,247,0.08)',
        }}
      />
    ))}

    {/* Orbiting symbols */}
    {ORBIT_RINGS.map((ring, ri) =>
      ring.symbols.map((sym, si) => (
        <OrbitSymbol
          key={`${ri}-${si}`}
          name={sym.name}
          positive={sym.positive}
          duration={ring.duration}
          deorbitKeyframe={ring.deorbitKeyframe}
          index={si}
          total={ring.symbols.length}
        />
      ))
    )}
  </div>
);

const Hero = () => (
  <section
    className="relative min-h-screen flex items-center justify-center bg-kmf-bg pt-20 overflow-hidden"
    aria-label="K.M.F. Trading Journal introduction"
  >
    {/* Orbital symbols background */}
    <OrbitalBackground />

    {/* Center radial glow */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(79,195,247,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />

    {/* Hero content */}
    <div className="container mx-auto px-4 text-center relative z-10">
      <div className="mb-8">
        <picture>
          <source srcSet="/logo-320.webp" type="image/webp" />
          <img
            src="/logo-320.png"
            alt="K.M.F. Trading Journal logo - Professional trading journal for forex, stocks and crypto traders"
            className="w-40 h-40 mx-auto drop-shadow-[0_0_20px_rgba(79,195,247,0.6)]"
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
