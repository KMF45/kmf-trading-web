import { FaMobileAlt, FaBrain, FaShieldAlt, FaHeart } from 'react-icons/fa';

const items = [
  {
    icon: FaMobileAlt,
    title: 'Mobile-First & Always Offline',
    description:
      'Most trading journals are web-only. KMF is a native Android app — log trades instantly after execution, no laptop needed, no internet required.',
    accent: '#4FC3F7',
    tag: 'vs web-only competitors',
  },
  {
    icon: FaBrain,
    title: 'Psychology Meets Analytics',
    description:
      'Other journals track P/L. KMF tracks discipline. Pre-trade checklists, weekly self-reviews, discipline score, and goal tracking — because mindset makes the difference.',
    accent: '#CE93D8',
    tag: 'beyond the numbers',
  },
  {
    icon: FaShieldAlt,
    title: 'No Broker Connection Needed',
    description:
      'We never ask for API keys or broker credentials. Manual entry means your trading data stays yours — private, secure, and never exposed.',
    accent: '#00C853',
    tag: 'your data stays yours',
  },
  {
    icon: FaHeart,
    title: 'Free to Start, Premium to Scale',
    description:
      'Full journaling, lot calculator, checklists and history — completely free. Upgrade to Premium only when you want cloud sync, advanced stats, and unlimited trades.',
    accent: '#FFB300',
    tag: 'no credit card required',
  },
];

const WhyKMF = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Why choose K.M.F. Trading Journal">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/[0.025] to-transparent" />

    <div className="container mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 animate-fadeIn">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
            ✦ Why KMF?
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
          <span className="gradient-text">Built Different.</span>
          <br />
          <span className="text-kmf-text-primary">For Serious Traders.</span>
        </h2>
        <p className="text-lg text-kmf-text-tertiary max-w-2xl mx-auto leading-relaxed">
          Not another P/L tracker. KMF is the only trading journal that combines analytics, discipline, and privacy in a native mobile app.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="group relative rounded-2xl p-6 border transition-all duration-300 animate-slideUp"
              style={{
                animationDelay: `${i * 80}ms`,
                animationFillMode: 'both',
                background: 'rgba(26,29,36,0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.20)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${item.accent}28`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className="rounded-xl p-3.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.accent}14`, border: `1px solid ${item.accent}28` }}
                >
                  <Icon style={{ fontSize: 22, color: item.accent }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-base font-bold text-kmf-text-primary" style={{ letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${item.accent}14`, color: item.accent, border: `1px solid ${item.accent}22` }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-kmf-text-tertiary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyKMF;
