import { FaMobileAlt, FaBrain, FaShieldAlt, FaHeart } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

const ICONS = [FaMobileAlt, FaBrain, FaShieldAlt, FaHeart];
const ACCENTS = ['#4FC3F7', '#CE93D8', '#00C853', '#FFB300'];

const WhyKMF = () => {
  const { t } = useLanguage();
  const items = t('whyKmf.items');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Why choose K.M.F. Trading Journal">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/[0.025] to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
              ✦ {t('whyKmf.badge')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
            <span className="gradient-text">{t('whyKmf.heading1')}</span>
            <br />
            <span className="text-kmf-text-primary">{t('whyKmf.heading2')}</span>
          </h2>
          <p className="text-lg text-kmf-text-tertiary max-w-2xl mx-auto leading-relaxed">
            {t('whyKmf.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}28`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="rounded-xl p-3.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${accent}14`, border: `1px solid ${accent}28` }}
                  >
                    <Icon style={{ fontSize: 22, color: accent }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-base font-bold text-kmf-text-primary" style={{ letterSpacing: '-0.01em' }}>
                        {item.title}
                      </h3>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}22` }}
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
};

export default WhyKMF;
