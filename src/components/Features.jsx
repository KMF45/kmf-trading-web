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
  },
  {
    icon: FaHome,
    title: 'Live Dashboard',
    description: 'Real-time balance evolution chart, monthly P/L, open trades, and trader badge — your performance at a glance.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaCalculator,
    title: 'Lot Size Calculator',
    description: 'Risk-based position sizing with live prices, exchange rate conversion, leverage options, and R:R analysis.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FaClipboardCheck,
    title: 'Weekly Review',
    description: 'Self-evaluation with 5 discipline metrics, reflection notes, and weekly goal tracking for continuous improvement.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: FaPlus,
    title: 'Smart Trade Entry',
    description: 'Fast entry with instrument autocomplete, SL/TP cross-validation, pre-trade checklist, and P/L tracking.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaHistory,
    title: 'Trade History',
    description: 'Full history with search, result filters, finalize pending trades, edit date/time, and delete confirmation.',
    color: 'from-purple-500 to-pink-500',
  },
];

const secondaryFeatures = [
  { icon: FaTasks, title: 'Custom Checklists', description: 'Build and manage your own pre-trade checklists' },
  { icon: FaBell, title: 'Smart Notifications', description: 'Daily reminders and weekly review alerts' },
  { icon: FaDatabase, title: 'Export Data', description: 'Export trades to JSON or CSV anytime' },
  { icon: FaGlobe, title: '8 Languages', description: 'EN, RO, RU, JA, FR, DE, ZH and more' },
];

const PrimaryCard = ({ feature, index }) => {
  const Icon = feature.icon;
  return (
    <div
      className="group relative animate-slideUp"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-kmf-accent to-kmf-accent-bright rounded-2xl opacity-0
                    group-hover:opacity-100 blur transition duration-500 group-hover:duration-200" />
      <div className="relative bg-kmf-panel rounded-2xl p-6 border border-kmf-accent/20
                    hover:border-kmf-accent/60 transition-all duration-300 hover-lift h-full flex flex-col">
        <div className="relative mb-5 inline-block">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-xl opacity-40 rounded-full`} />
          <div className="relative bg-kmf-surface rounded-xl p-3.5 group-hover:scale-110 transition-transform duration-300 w-fit">
            <Icon className="text-2xl text-kmf-accent group-hover:text-kmf-accent-bright transition-colors" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-kmf-text-primary mb-2 group-hover:text-kmf-accent transition-colors">
          {feature.title}
        </h3>
        <p className="text-sm text-kmf-text-tertiary leading-relaxed flex-1">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const SecondaryCard = ({ feature }) => {
  const Icon = feature.icon;
  return (
    <div className="flex items-start gap-4 bg-kmf-panel/60 rounded-xl p-4 border border-kmf-accent/10 hover:border-kmf-accent/30 transition-all duration-300">
      <div className="bg-kmf-surface rounded-lg p-2.5 flex-shrink-0">
        <Icon className="text-kmf-accent text-lg" />
      </div>
      <div>
        <p className="text-sm font-semibold text-kmf-text-primary">{feature.title}</p>
        <p className="text-xs text-kmf-text-tertiary mt-0.5">{feature.description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Trading Journal Features">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/30">
              ✨ Powerful Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Everything You Need to</span>
            <br />
            <span className="text-kmf-text-primary">Trade with Discipline</span>
          </h2>
          <p className="text-lg text-kmf-text-tertiary max-w-2xl mx-auto">
            Professional tools for forex, stock, and crypto traders — from trade tracking to advanced analytics and risk management.
          </p>
        </div>

        {/* Primary features — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {primaryFeatures.map((feature, index) => (
            <PrimaryCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Secondary features — 4 columns horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
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
