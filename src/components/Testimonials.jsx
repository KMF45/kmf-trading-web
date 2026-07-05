import { FaStar } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { revealProps } from './common/Reveal';

const NAMES = ['Alex M.', 'Radu T.', 'Sara K.'];
const INITIALS = ['AM', 'RT', 'SK'];
const COLORS = ['#4FC3F7', '#CE93D8', '#00C853'];

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: count }).map((_, i) => (
      <FaStar key={i} style={{ fontSize: 12, color: '#FFD740' }} />
    ))}
  </div>
);

const Testimonials = () => {
  const { t } = useLanguage();
  const items = t('testimonials.items');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="What traders say about K.M.F.">
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div {...revealProps()} className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
              ✦ {t('testimonials.badge')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
            <span className="gradient-text">{t('testimonials.heading1')}</span>
            <br />
            <span className="text-kmf-text-primary">{t('testimonials.heading2')}</span>
          </h2>
          <p className="text-lg text-kmf-text-tertiary max-w-xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              {...revealProps(i * 0.1)}
              className="rounded-2xl p-6 border transition-all duration-300 flex flex-col"
              style={{
                background: 'rgba(26,29,36,0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.20)',
              }}
            >
              <Stars count={5} />

              <p className="text-sm text-kmf-text-secondary leading-relaxed flex-1 mb-5">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${COLORS[i]}20`, color: COLORS[i], border: `1px solid ${COLORS[i]}30` }}
                >
                  {INITIALS[i]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-kmf-text-primary">{NAMES[i]}</p>
                  <p className="text-xs text-kmf-text-tertiary">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-kmf-text-tertiary/40 mt-8">
          {t('testimonials.note')}
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
