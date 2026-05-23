import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, setConsent, dntEnabled } from '../utils/consent';
import { useLanguage } from '../i18n/LanguageContext';

const OPEN_EVENT = 'kmf:open-consent';

// Allow other components (e.g., Footer "Cookie Preferences" link) to reopen the banner.
export function openCookieBanner() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dntEnabled()) return; // Honor Do Not Track — no banner at all
    if (!getConsent()) setVisible(true);
    const onOpen = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  if (!visible) return null;

  const accept = () => { setConsent('accepted'); setVisible(false); };
  const reject = () => { setConsent('rejected'); setVisible(false); };

  return (
    <div
      role="dialog"
      aria-label={t('consent.title')}
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl border shadow-2xl"
        style={{
          pointerEvents: 'auto',
          background: 'rgba(15,17,21,0.98)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(79,195,247,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-4">
            <span
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(79,195,247,0.1)',
                border: '1px solid rgba(79,195,247,0.25)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4FC3F7">
                <path d="M21.95 10.99c-.05 0-.1 0-.16.01-.81.1-1.46.74-1.59 1.55-.18 1.17-1.17 2-2.36 2-1.32 0-2.4-1.08-2.4-2.4 0-1.18.83-2.18 2-2.36.81-.13 1.45-.78 1.55-1.59.01-.05.01-.1.01-.16 0-.94-.84-1.69-1.78-1.55-2.21.33-3.92 2.19-3.97 4.46-.06 2.73 2.16 5.04 4.88 5.1.05 0 .11.01.16.01 2.25 0 4.13-1.65 4.46-3.86.15-.96-.6-1.81-1.55-1.81-.08 0-.16 0-.25.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.34 0 .67-.02 1-.05-1.74-.7-3.04-2.27-3.4-4.13-2.4-.31-4.25-2.35-4.25-4.82 0-1.42.61-2.7 1.58-3.59-.59-1.13-.93-2.41-.93-3.78V5.4C7.69 4.6 9.78 4 12 4c.86 0 1.7.09 2.5.27.34-.95.97-1.76 1.78-2.34C15.4 1.55 13.74 2 12 2zm0 0c-1.34 0-2.63.26-3.79.74C9.81 2.27 10.9 2 12 2z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white mb-1" style={{ letterSpacing: '-0.01em' }}>
                {t('consent.title')}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#B8CAD4' }}>
                {t('consent.body')}{' '}
                <Link
                  to="/privacy-policy"
                  className="underline transition-colors"
                  style={{ color: '#4FC3F7' }}
                >
                  {t('consent.learnMore')}
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
            <button
              type="button"
              onClick={reject}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#B8CAD4',
              }}
            >
              {t('consent.reject')}
            </button>
            <button
              type="button"
              onClick={accept}
              className="px-4 py-2 rounded-lg text-sm font-bold transition-transform duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #4FC3F7, #03A9F4)',
                color: '#0F1115',
                boxShadow: '0 4px 14px rgba(79,195,247,0.4)',
              }}
            >
              {t('consent.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
