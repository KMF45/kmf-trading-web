import { FaPen, FaChartBar, FaTrophy } from 'react-icons/fa';

const steps = [
  {
    number: '01',
    icon: FaPen,
    title: 'Log Your Trade',
    description: 'Enter instrument, entry price, SL/TP, lot size, and tick your pre-trade checklist. Takes under 30 seconds.',
    color: '#4FC3F7',
    glow: 'rgba(79,195,247,0.15)',
    gradient: 'from-cyan-500 to-blue-500',
    detail: 'Instrument autocomplete · SL/TP validation · Pre-trade checklist',
  },
  {
    number: '02',
    icon: FaChartBar,
    title: 'Analyze Performance',
    description: 'View win rate, profit factor, R-multiple distribution, drawdown, and discipline score — all computed automatically.',
    color: '#CE93D8',
    glow: 'rgba(206,147,216,0.15)',
    gradient: 'from-purple-500 to-pink-500',
    detail: 'Win Rate · Profit Factor · Drawdown · R-Avg',
  },
  {
    number: '03',
    icon: FaTrophy,
    title: 'Improve Your Edge',
    description: 'Complete weekly reviews, set goals, and follow your plan. Watch your discipline score and profitability grow.',
    color: '#FFB300',
    glow: 'rgba(255,179,0,0.15)',
    gradient: 'from-orange-400 to-yellow-400',
    detail: 'Weekly Review · Goals · Discipline Score',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="How it works">
    <div className="absolute inset-0 bg-gradient-to-b from-kmf-accent/[0.03] via-transparent to-transparent" />

    <div className="container mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 animate-fadeIn">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
            ✦ Simple Workflow
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
          <span className="gradient-text">How It Works</span>
        </h2>
        <p className="text-lg text-kmf-text-tertiary max-w-xl mx-auto leading-relaxed">
          Three steps — from a raw trade to real insight.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px"
          style={{ background: 'linear-gradient(to right, rgba(79,195,247,0.20), rgba(206,147,216,0.20), rgba(255,179,0,0.20))' }} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative flex flex-col items-center text-center group animate-slideUp"
                style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'both' }}
              >
                {/* Number + icon bubble */}
                <div className="relative mb-6 z-10">
                  <div
                    className={`w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    style={{ boxShadow: `0 0 0 1px ${step.color}30, 0 8px 30px ${step.glow}` }}
                  >
                    <Icon style={{ fontSize: 26, color: '#fff' }} />
                  </div>
                  {/* Step number badge */}
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: '#0F1115',
                      border: `1.5px solid ${step.color}50`,
                      color: step.color,
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="w-full rounded-2xl p-6 border transition-all duration-300 flex flex-col gap-3"
                  style={{
                    background: 'rgba(26,29,36,0.90)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.25)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${step.color}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  <h3 className="text-base font-bold text-kmf-text-primary" style={{ letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-kmf-text-tertiary leading-relaxed">
                    {step.description}
                  </p>
                  {/* Detail chips */}
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[10px] font-semibold tracking-wide" style={{ color: step.color, opacity: 0.85 }}>
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-14 animate-fadeIn">
        <a
          href="#download"
          className="inline-block px-8 py-4 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright
                     text-white font-semibold rounded-lg shadow-glow hover:shadow-glow-hover
                     transition-all duration-300 hover:scale-105"
        >
          Start Journaling Now
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorks;
