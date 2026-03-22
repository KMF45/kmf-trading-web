import { FaGooglePlay, FaCheckCircle, FaLock, FaGlobe, FaCloud, FaShieldAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { useLanguage } from '../i18n/LanguageContext';

const TRUST_ICONS = [FaShieldAlt, FaLock, FaGlobe, FaCloud];
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kmf.tradingjournal';

const Download = () => {
  const { t } = useLanguage();
  const trustBadges = t('download.trustBadges');

  return (
    <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Download K.M.F. Trading Journal for Android">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3OSwxOTUsMjQ3LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kmf-accent/20 rounded-full blur-3xl animate-pulse" style={{ willChange: 'opacity' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kmf-accent-bright/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', willChange: 'opacity' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto animate-fadeIn">
          <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-kmf-accent/30
                        shadow-glow-strong overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-kmf-accent/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-kmf-accent-bright/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-kmf-accent/20 text-kmf-accent
                             rounded-full text-sm font-semibold border border-kmf-accent/50 shadow-glow">
                  <HiSparkles className="text-lg" aria-hidden="true" />
                  {t('download.badge')}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
                <span className="gradient-text">{t('download.heading')}</span>
              </h2>

              <p className="text-xl text-kmf-text-secondary text-center mb-8 max-w-2xl mx-auto">
                {t('download.subtitle')}
              </p>

              {/* Google Play button */}
              <div className="flex justify-center mb-12">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download K.M.F. Trading Journal on Google Play (opens in new tab)"
                  onClick={() => window.gtag?.('event', 'play_store_click', { source: 'download' })}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}
                >
                  <FaGooglePlay className="text-xl" aria-hidden="true" />
                  {t('download.submitBtn')}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {t('download.features').map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-kmf-text-secondary"
                  >
                    <FaCheckCircle className="text-kmf-profit text-xl flex-shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-12 text-center">
                <p className="text-sm text-kmf-text-tertiary mb-4">
                  {t('download.trustLine')}
                </p>
                <div className="flex justify-center gap-8 flex-wrap">
                  {trustBadges.map((badge, i) => {
                    const Icon = TRUST_ICONS[i];
                    return (
                      <div key={badge} className="flex items-center gap-2 text-kmf-text-tertiary">
                        <Icon className="text-xl text-kmf-accent" aria-hidden="true" />
                        <span>{badge}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
