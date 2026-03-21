import { FaRocket, FaEnvelope, FaInfinity, FaBell } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { useLanguage } from '../i18n/LanguageContext';

const PERK_ICONS = [FaInfinity, FaBell, FaEnvelope];

const MAILTO = `mailto:contact@kmfjournal.com?subject=${encodeURIComponent('Beta Tester Application — K.M.F. Trading Journal')}&body=${encodeURIComponent(`Hi K.M.F. Team,

I'd like to apply for the beta testing program.

Name:
Trading experience (beginner / intermediate / advanced):
Markets I trade (forex / stocks / crypto):
Current journal method (spreadsheet / app / none):

Looking forward to testing K.M.F.!
`)}`;

const BetaBanner = () => {
  const { t } = useLanguage();

  const perks = t('beta.perks');
  const statBlocks = t('beta.statBlocks');

  return (
    <section
      id="beta"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-label="Beta tester program"
    >
      {/* Background glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,179,0,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden animate-fadeIn"
          style={{
            background: 'rgba(26,22,14,0.95)',
            border: '1px solid rgba(255,179,0,0.22)',
            boxShadow: '0 0 0 1px rgba(255,179,0,0.06), 0 8px 50px rgba(0,0,0,0.40), 0 0 60px rgba(255,179,0,0.05)',
          }}
        >
          {/* Corner glow */}
          <div aria-hidden="true" style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">

            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full"
                style={{ background: 'rgba(255,179,0,0.12)', border: '1px solid rgba(255,179,0,0.28)', color: '#FFB300' }}>
                <FaRocket style={{ fontSize: 11 }} aria-hidden="true" />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t('beta.badge')}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                <span style={{ color: '#FFB300' }}>{t('beta.heading1')}</span>
                <br />
                <span className="text-kmf-text-primary">{t('beta.heading2')}</span>
              </h2>

              <p className="text-kmf-text-secondary leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                {t('beta.description')}{' '}
                <strong style={{ color: '#FFB300' }}>{t('beta.descHighlight')}</strong>
                {t('beta.descEnd')}
              </p>

              {/* Perks */}
              <ul className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {perks.map((text, i) => {
                  const Icon = PERK_ICONS[i];
                  return (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,179,0,0.14)', border: '1px solid rgba(255,179,0,0.25)' }}>
                        <Icon style={{ fontSize: 12, color: '#FFB300' }} aria-hidden="true" />
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#D4C0A0' }}>{text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Apply button */}
              <a
                href={MAILTO}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
                  color: '#1A1200',
                  boxShadow: '0 4px 20px rgba(255,179,0,0.30)',
                }}
              >
                <HiSparkles style={{ fontSize: 14 }} aria-hidden="true" />
                {t('beta.submitBtn')}
              </a>
              <p className="text-xs mt-3 text-center lg:text-left" style={{ color: '#9A8060' }}>
                contact@kmfjournal.com · {t('beta.descHighlight')}
              </p>
            </div>

            {/* Right: Visual stat block */}
            <div
              className="hidden lg:flex flex-col gap-4 flex-shrink-0"
              style={{ width: 220 }}
            >
              {statBlocks.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: 'rgba(255,179,0,0.06)',
                    border: '1px solid rgba(255,179,0,0.14)',
                  }}
                >
                  <p className="text-2xl font-extrabold mb-1" style={{ color: '#FFB300', letterSpacing: '-0.02em' }}>{s.value}</p>
                  <p className="text-xs font-semibold" style={{ color: '#D4C0A0' }}>{s.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#9A8060' }}>{s.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaBanner;
