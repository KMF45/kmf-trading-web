import { useEffect, useRef } from 'react';
import { FaGooglePlay } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { motion, animate, useReducedMotion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

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
    <div className="kmf-ticker" style={{
      position: 'relative', width: '100%', overflow: 'hidden',
      borderTop: '1px solid rgba(79,195,247,0.08)',
      background: 'rgba(8,10,14,0.75)',
      backdropFilter: 'blur(12px)',
      padding: '10px 0',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 100, height: '100%', background: 'linear-gradient(to right, #0F1115, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: '100%', background: 'linear-gradient(to left, #0F1115, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div className="kmf-ticker-track" style={{ display: 'flex', animation: 'kmf-ticker 32s linear infinite', width: 'max-content', willChange: 'transform' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 22px', flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#8FB3C5', letterSpacing: '0.07em' }}>{item.symbol}</span>
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

// ── Animated equity curve (background) ───────────────────────────────────────
const CURVE_PATH = 'M0 356 L70 340 L130 348 L210 316 L270 330 L350 296 L420 310 L510 264 L590 282 L670 234 L750 250 L830 204 L910 220 L1000 166 L1080 182 L1160 132';

const EquityCurve = () => {
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: '58%', opacity: 0.45 }}
    >
      <defs>
        <linearGradient id="kmf-eq-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00C853" stopOpacity="0" />
          <stop offset="0.18" stopColor="#00C853" stopOpacity="0.5" />
          <stop offset="1" stopColor="#00C853" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <motion.path
        d={CURVE_PATH}
        fill="none"
        stroke="url(#kmf-eq-stroke)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, delay: 0.6, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="1160" cy="132" r="4.5" fill="#00C853"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.5 }}
        style={{ filter: 'drop-shadow(0 0 7px rgba(0,200,83,0.9))' }}
      />
    </svg>
  );
};

// ── Count-up stat ─────────────────────────────────────────────────────────────
const CountUp = ({ to, suffix = '', delay = 1.0 }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const finalText = to.toLocaleString('en-US') + suffix;

  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US') + suffix;
      },
    });
    return () => controls.stop();
  }, [to, suffix, delay, reduced]);

  return <span ref={ref}>{finalText}</span>;
};

// ── Entrance choreography ─────────────────────────────────────────────────────
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const heroLogo = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 170, damping: 16 } },
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { to: 10000, suffix: '+', label: t('hero.stats.trades') },
    { to: 22,    suffix: '',  label: t('hero.stats.instruments') },
    { to: 7,     suffix: '',  label: t('hero.stats.languages') },
  ];

  return (
    <section
      id="hero"
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
        <div style={{ position: 'absolute', top: '-8%', left: '-4%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,195,247,0.09) 0%, transparent 70%)', animation: 'kmf-orb-pulse 8s ease-in-out infinite', willChange: 'transform, opacity', contain: 'layout style paint' }} />
        <div style={{ position: 'absolute', bottom: '-8%', right: '-4%', width: 540, height: 540, borderRadius: '50%', background: 'radial-gradient(circle, rgba(38,198,218,0.07) 0%, transparent 70%)', animation: 'kmf-orb-pulse 10s ease-in-out infinite', animationDelay: '3s', willChange: 'transform, opacity', contain: 'layout style paint' }} />
        <EquityCurve />
        {/* vignette behind text */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 46%, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0.40) 50%, transparent 75%)' }} />
      </div>

      {/* Main content — centered, staggered entrance */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 text-center relative z-10 flex-1 flex flex-col items-center justify-center"
      >
        <motion.div variants={heroLogo} className="mb-8">
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
        </motion.div>

        <motion.h1 variants={heroItem} className="text-6xl font-bold mb-6">
          <span className="logo-text">K.M.F.</span>
          <br />
          <span className="text-kmf-text-primary">Trading Journal</span>
        </motion.h1>

        <motion.p variants={heroItem} className="text-3xl font-semibold text-kmf-text-secondary mb-4">
          {t('hero.tagline')}
        </motion.p>

        <motion.p variants={heroItem} className="text-xl text-kmf-text-tertiary max-w-2xl mx-auto mb-12">
          {t('hero.subtitle')}
        </motion.p>

        <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download K.M.F. Trading Journal on Google Play (opens in new tab)"
            onClick={() => window.gtag?.('event', 'play_store_click', { source: 'hero' })}
            className="relative overflow-hidden px-8 py-4 text-white text-lg font-semibold rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}
          >
            <span aria-hidden="true" className="kmf-cta-shine" />
            <FaGooglePlay aria-hidden="true" />
            {t('hero.ctaPrimary')}
          </a>
          <a
            href="#features"
            className="px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent flex items-center gap-3 hover:bg-kmf-accent/10 transition-all duration-300 active:scale-95"
          >
            <HiSparkles aria-hidden="true" />
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={heroItem} className="grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-kmf-accent/10 w-full max-w-xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold gradient-text">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-xs text-kmf-text-tertiary mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Market ticker — bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 w-full mt-8"
      >
        <MarketTicker />
      </motion.div>
    </section>
  );
};

export default Hero;
