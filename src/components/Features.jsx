import {
  FaHome, FaPlus, FaHistory, FaChartLine, FaClipboardCheck,
  FaTasks, FaCalculator, FaBell, FaDatabase, FaGlobe,
  FaBrain, FaTrophy, FaBook, FaClock
} from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

const PRIMARY_ICONS = [FaChartLine, FaHome, FaCalculator, FaClipboardCheck, FaPlus, FaBrain, FaTrophy, FaHistory];
const PRIMARY_COLORS = [
  { color: 'from-orange-500 to-red-500', accentColor: '#FF7043' },
  { color: 'from-blue-500 to-cyan-500', accentColor: '#4FC3F7' },
  { color: 'from-yellow-500 to-orange-500', accentColor: '#FFB300' },
  { color: 'from-teal-500 to-cyan-500', accentColor: '#26C6DA' },
  { color: 'from-green-500 to-emerald-500', accentColor: '#00C853' },
  { color: 'from-purple-500 to-pink-500', accentColor: '#CE93D8' },
  { color: 'from-yellow-400 to-amber-500', accentColor: '#FFB300' },
  { color: 'from-rose-500 to-red-500', accentColor: '#FF5252' },
];

const SECONDARY_ICONS = [FaTasks, FaBell, FaBook, FaClock, FaDatabase, FaGlobe];

const PrimaryCard = ({ feature, index }) => {
  const Icon = PRIMARY_ICONS[index];
  const style = PRIMARY_COLORS[index];
  return (
    <div
      className="group relative animate-slideUp"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
        style={{ background: `linear-gradient(135deg, ${style.accentColor}22, transparent 60%)` }} />
      <div className="relative bg-kmf-panel rounded-2xl p-6 border border-white/5
                    hover:border-white/10 transition-all duration-300 h-full flex flex-col"
        style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.25)' }}>

        <div className="mb-5">
          <div className="rounded-xl p-3.5 w-fit transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${style.accentColor}14`,
              border: `1px solid ${style.accentColor}28`,
            }}>
            <Icon style={{ fontSize: 22, color: style.accentColor }} />
          </div>
        </div>

        <h3 className="text-base font-bold text-kmf-text-primary mb-2 transition-colors duration-200"
          style={{ letterSpacing: '-0.01em' }}>
          {feature.title}
        </h3>

        <p className="text-sm text-kmf-text-tertiary leading-relaxed flex-1 mb-4">
          {feature.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${style.accentColor}14`,
                color: style.accentColor,
                border: `1px solid ${style.accentColor}25`,
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
  const Icon = SECONDARY_ICONS[feature._idx];
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
  const { t } = useLanguage();

  const primaryFeatures = t('features.primary');
  const secondaryFeatures = t('features.secondary').map((f, i) => ({ ...f, _idx: i }));

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Trading Journal Features">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/[0.03] to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
              ✦ {t('features.badge')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
            <span className="gradient-text">{t('features.heading1')}</span>
            <br />
            <span className="text-kmf-text-primary">{t('features.heading2')}</span>
          </h2>
          <p className="text-lg text-kmf-text-tertiary max-w-2xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Primary features — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {primaryFeatures.map((feature, index) => (
            <PrimaryCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Secondary features — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
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
            {t('features.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
