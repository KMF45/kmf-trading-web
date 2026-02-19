const steps = [
  {
    number: '01',
    title: 'Log Your Trade',
    description: 'Enter instrument, entry price, SL/TP, lot size, and tick your pre-trade checklist. Takes under 30 seconds.',
    icon: '📝',
    color: 'from-kmf-accent to-blue-400',
  },
  {
    number: '02',
    title: 'Analyze Performance',
    description: 'View win rate, profit factor, R-multiple distribution, drawdown, and discipline score — all computed automatically.',
    icon: '📊',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Improve Your Edge',
    description: 'Complete weekly reviews, set goals, and follow your plan. Watch your discipline score and profitability grow.',
    icon: '🚀',
    color: 'from-orange-500 to-yellow-400',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="How it works">
    <div className="absolute inset-0 bg-gradient-to-b from-kmf-accent/5 via-transparent to-transparent" />

    <div className="container mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-14 animate-fadeIn">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/30">
            🔄 Simple Workflow
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="gradient-text">How It Works</span>
        </h2>
        <p className="text-lg text-kmf-text-tertiary max-w-xl mx-auto">
          Three simple steps to go from a raw trade to real insight.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Connecting line (hidden on mobile) */}
        <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-kmf-accent/30 via-purple-500/30 to-orange-500/30" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group animate-slideUp"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'both' }}>

              {/* Number bubble */}
              <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300 z-10`}>
                <span className="text-2xl">{step.icon}</span>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-kmf-bg border-2 border-kmf-accent/40 flex items-center justify-center text-[10px] font-bold text-kmf-accent">
                  {step.number}
                </span>
              </div>

              {/* Card */}
              <div className="bg-kmf-panel rounded-2xl p-6 border border-kmf-accent/10 hover:border-kmf-accent/30 transition-all duration-300 w-full">
                <h3 className="text-lg font-bold text-kmf-text-primary mb-2 group-hover:text-kmf-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-kmf-text-tertiary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 animate-fadeIn">
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
