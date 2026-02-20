import {
  FaHome, FaPlus, FaHistory, FaChartLine, FaClipboardCheck,
  FaTasks, FaCalculator, FaBell, FaDatabase, FaGlobe
} from 'react-icons/fa';

const primaryFeatures = [
  {
    icon: FaChartLine,
    title: 'Advanced Statistics',
    description: 'Win rate, profit factor, expectancy, R-multiple distribution, max drawdown, and discipline score — all calculated automatically.',
    color: 'from-orange-500 to-red-500',
    accentColor: '#FF7043',
    tags: ['Win Rate', 'Profit Factor', 'R-Multiple', 'Expectancy'],
  },
  {
    icon: FaHome,
    title: 'Live Dashboard',
    description: 'Real-time balance evolution chart, monthly P/L, open trades, and trader badge — your performance at a glance.',
    color: 'from-blue-500 to-cyan-500',
    accentColor: '#4FC3F7',
    tags: ['Balance Curve', 'Monthly P/L', 'Open Trades', 'Trader Badge'],
  },
  {
    icon: FaCalculator,
    title: 'Lot Size Calculator',
    description: 'Risk-based position sizing with live prices, exchange rate conversion, leverage options, and R:R analysis.',
    color: 'from-yellow-500 to-orange-500',
    accentColor: '#FFB300',
    tags: ['Risk %', 'Live Prices', 'Leverage', 'R:R Ratio'],
  },
  {
    icon: FaClipboardCheck,
    title: 'Weekly Review',
    description: 'Self-evaluation with 5 discipline metrics, reflection notes, and weekly goal tracking for continuous improvement.',
    color: 'from-teal-500 to-cyan-500',
    accentColor: '#26C6DA',
    tags: ['Discipline Score', 'Goals', 'Reflection Notes'],
  },
  {
    icon: FaPlus,
    title: 'Smart Trade Entry',
    description: 'Fast entry with instrument autocomplete, SL/TP cross-validation, pre-trade checklist, and P/L tracking.',
    color: 'from-green-500 to-emerald-500',
    accentColor: '#00C853',
    tags: ['< 30 sec entry', 'SL/TP Validation', 'Checklist'],
  },
  {
    icon: FaHistory,
    title: 'Trade History',
    description: 'Full history with search, result filters, finalize pending trades, edit date/time, and delete confirmation.',
    color: 'from-purple-500 to-pink-500',
    accentColor: '#CE93D8',
    tags: ['Search', 'Filter by Result', 'Edit & Delete'],
  },
];

const secondaryFeatures = [
  { icon: FaTasks,    title: 'Custom Checklists',    description: 'Build and manage your own pre-trade checklists' },
  { icon: FaBell,     title: 'Smart Notifications',  description: 'Daily reminders and weekly review alerts' },
  { icon: FaDatabase, title: 'Export Data',           description: 'Export trades to JSON, CSV or PDF anytime' },
  { icon: FaGlobe,    title: '8 Languages',           description: 'EN, RO, RU, JA, FR, DE, ZH and more' },
];

const PrimaryCard = ({ feature, index }) => {
  const Icon = feature.icon;
  return (
    <div
      className="group relative animate-slideUp"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
        style={{ background: `linear-gradient(135deg, ${feature.accentColor}22, transparent 60%)` }} />
      <div className="relative bg-kmf-panel rounded-2xl p-6 border border-white/5
                    hover:border-white/10 transition-all duration-300 h-full flex flex-col"
        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.25)' }}>

        {/* Icon */}
        <div className="relative mb-5 inline-block">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-xl opacity-30 rounded-full`} />
          <div className="relative rounded-xl p-3.5 w-fit transition-transform duration-300 group-hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <Icon style={{ fontSize: 22, color: feature.accentColor }} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-kmf-text-primary mb-2 transition-colors duration-200"
          style={{ letterSpacing: '-0.01em' }}>
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-kmf-text-tertiary leading-relaxed flex-1 mb-4">
          {feature.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${feature.accentColor}14`,
                color: feature.accentColor,
                border: `1px solid ${feature.accentColor}25`,
                letterSpacing: '0.02em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SecondaryCard = ({ feature }) => {
  const Icon = feature.icon;
  return (
    <div className="flex items-start gap-4 bg-kmf-panel/60 rounded-xl p-4 border border-white/5
                  hover:border-kmf-accent/20 hover:bg-kmf-panel transition-all duration-300 group">
      <div className="rounded-lg p-2.5 flex-shrink-0 transition-colors duration-200 group-hover:bg-kmf-accent/10"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <Icon className="text-kmf-accent" style={{ fontSize: 17 }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-kmf-text-primary group-hover:text-kmf-accent transition-colors">{feature.title}</p>
        <p className="text-xs text-kmf-text-tertiary mt-0.5 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Trading Journal Features">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/[0.03] to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
              ✦ Powerful Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
            <span className="gradient-text">Everything You Need to</span>
            <br />
            <span className="text-kmf-text-primary">Trade with Discipline</span>
          </h2>
          <p className="text-lg text-kmf-text-tertiary max-w-2xl mx-auto leading-relaxed">
            Professional tools for forex, stock, and crypto traders — from trade tracking to advanced analytics and risk management.
          </p>
        </div>

        {/* Primary features — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {primaryFeatures.map((feature, index) => (
            <PrimaryCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Secondary features — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
          {secondaryFeatures.map((feature, index) => (
            <SecondaryCard key={index} feature={feature} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fadeIn">
          <a
            href="#download"
            className="inline-block px-8 py-4 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright
                     text-white font-semibold rounded-lg shadow-glow hover:shadow-glow-hover
                     transition-all duration-300 hover:scale-105"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
