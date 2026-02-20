import { FaCheck, FaTimes, FaCrown, FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const FREE_FEATURES = [
  'Trade logging',
  '50 trades / month',
  'Trade history & search',
  'Win rate & basic P/L',
  'Lot size calculator',
  'Pre-trade checklist',
  'Offline access',
  '8 languages',
];

const FREE_MISSING = [
  'Unlimited trades',
  'Advanced statistics',
  'Cloud sync (Android + Web)',
  'Weekly review & goals',
  'Smart notifications',
  'Export data (CSV / JSON / PDF)',
];

const PREMIUM_FEATURES = [
  'Everything in Free',
  'Unlimited trades',
  'Advanced statistics',
  'Cloud sync (Android + Web)',
  'Weekly review & goals',
  'Smart notifications',
  'Export data (CSV / JSON / PDF)',
  'Balance curve & drawdown chart',
  'Discipline score tracking',
  'R-multiple & Expectancy',
  'Priority support',
];

const CheckRow = ({ text, included, muted }) => (
  <li className="flex items-center gap-3 py-1.5">
    {included ? (
      <FaCheck style={{ fontSize: 11, color: '#00C853', flexShrink: 0 }} />
    ) : (
      <FaTimes style={{ fontSize: 11, color: '#FF5252', opacity: 0.45, flexShrink: 0 }} />
    )}
    <span
      className="text-sm"
      style={{ color: included ? (muted ? '#7A9BB0' : '#B0BEC5') : '#B0BEC540' }}
    >
      {text}
    </span>
  </li>
);

const Pricing = () => (
  <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Free vs Premium plans">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/[0.025] to-transparent" />

    <div className="container mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 animate-fadeIn">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
            ✦ Simple Pricing
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
          <span className="gradient-text">Free to Start.</span>
          <br />
          <span className="text-kmf-text-primary">Premium to Dominate.</span>
        </h2>
        <p className="text-lg text-kmf-text-tertiary max-w-xl mx-auto leading-relaxed">
          No credit card required to get started. Core journaling is free forever.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

        {/* Free */}
        <div
          className="rounded-2xl p-7 border flex flex-col animate-slideUp"
          style={{
            animationDelay: '0ms',
            animationFillMode: 'both',
            background: 'rgba(26,29,36,0.85)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.20)',
          }}
        >
          {/* Plan header */}
          <div className="mb-6">
            <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest mb-3">Free</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold text-kmf-text-primary" style={{ letterSpacing: '-0.03em' }}>$0</span>
              <span className="text-kmf-text-tertiary mb-1.5 text-sm">/ forever</span>
            </div>
            <p className="text-sm text-kmf-text-tertiary">Perfect to get started and build the habit.</p>
          </div>

          {/* CTA */}
          <a
            href="#download"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm mb-7 transition-all duration-200 hover:scale-[1.02]"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', color: '#B0BEC5' }}
          >
            <FaDownload style={{ fontSize: 13 }} />
            Download Free
          </a>

          {/* Features */}
          <ul className="space-y-0 flex-1">
            {FREE_FEATURES.map((f) => <CheckRow key={f} text={f} included={true} />)}
            <div className="my-2 border-t border-white/5" />
            {FREE_MISSING.map((f) => <CheckRow key={f} text={f} included={false} />)}
          </ul>
        </div>

        {/* Premium */}
        <div
          className="rounded-2xl p-7 flex flex-col relative overflow-hidden animate-slideUp"
          style={{
            animationDelay: '80ms',
            animationFillMode: 'both',
            background: 'rgba(14,18,26,0.97)',
            border: '1px solid rgba(79,195,247,0.28)',
            boxShadow: '0 0 0 1px rgba(79,195,247,0.08), 0 8px 40px rgba(79,195,247,0.08), 0 2px 20px rgba(0,0,0,0.40)',
          }}
        >
          {/* Glow top-right */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Popular badge */}
          <div className="absolute top-5 right-5">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold"
              style={{ background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.30)' }}
            >
              <FaCrown style={{ fontSize: 9 }} />
              PREMIUM
            </span>
          </div>

          {/* Plan header */}
          <div className="mb-6">
            <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-3">Premium</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold text-kmf-text-primary" style={{ letterSpacing: '-0.03em' }}>
                <span className="gradient-text">$X</span>
              </span>
              <span className="text-kmf-text-tertiary mb-1.5 text-sm">/ month</span>
            </div>
            <p className="text-sm text-kmf-text-tertiary">For traders serious about improvement.</p>
          </div>

          {/* CTA */}
          <a
            href="#download"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white mb-7 shadow-glow hover:shadow-glow-hover transition-all duration-200 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #4FC3F7, #03A9F4)' }}
          >
            <HiSparkles style={{ fontSize: 15 }} />
            Get Premium
          </a>

          {/* Features */}
          <ul className="space-y-0 flex-1 relative z-10">
            {PREMIUM_FEATURES.map((f, i) => (
              <CheckRow key={f} text={f} included={true} muted={i > 0} />
            ))}
          </ul>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-kmf-text-tertiary/50 mt-8">
        Prices shown in USD. Billing handled securely via Google Play. Cancel anytime.
      </p>
    </div>
  </section>
);

export default Pricing;
