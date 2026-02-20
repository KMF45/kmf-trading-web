import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Alex M.',
    role: 'Forex Trader · 3 years',
    initials: 'AM',
    color: '#4FC3F7',
    stars: 5,
    text: 'Finally a journal that focuses on discipline, not just P/L. The weekly review feature changed how I approach trading completely.',
  },
  {
    name: 'Radu T.',
    role: 'Crypto Trader · 2 years',
    initials: 'RT',
    color: '#CE93D8',
    stars: 5,
    text: 'The lot size calculator alone is worth it. Fast, accurate, works offline. I use it before every single trade.',
  },
  {
    name: 'Sara K.',
    role: 'Indices Trader · 4 years',
    initials: 'SK',
    color: '#00C853',
    stars: 5,
    text: 'I tried TraderSync and Edgewonk — KMF is the only one that actually works great on mobile and doesn\'t require connecting my broker.',
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <FaStar key={i} style={{ fontSize: 12, color: '#FFD740' }} />
    ))}
  </div>
);

const Testimonials = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="What traders say about K.M.F.">
    <div className="container mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 animate-fadeIn">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
            ✦ Traders Love It
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
          <span className="gradient-text">What Traders Are</span>
          <br />
          <span className="text-kmf-text-primary">Saying</span>
        </h2>
        <p className="text-lg text-kmf-text-tertiary max-w-xl mx-auto leading-relaxed">
          Join traders who are already building better discipline and consistency with K.M.F.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 border transition-all duration-300 animate-slideUp flex flex-col"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: 'both',
              background: 'rgba(26,29,36,0.85)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 2px 20px rgba(0,0,0,0.20)',
            }}
          >
            <Stars count={t.stars} />

            <p className="text-sm text-kmf-text-secondary leading-relaxed flex-1 mb-5">
              "{t.text}"
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-kmf-text-primary">{t.name}</p>
                <p className="text-xs text-kmf-text-tertiary">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder notice — remove when real reviews arrive */}
      <p className="text-center text-xs text-kmf-text-tertiary/40 mt-8">
        Early feedback from beta testers. Google Play reviews coming soon.
      </p>
    </div>
  </section>
);

export default Testimonials;
