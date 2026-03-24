import { Link } from 'react-router-dom';
import { LANG_LABELS } from '../../i18n/LanguageContext';
import blogTranslations from '../../i18n/blogTranslations';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher({ slug, currentLang = 'en' }) {
  const translations = blogTranslations[slug];
  if (!translations || Object.keys(translations).length <= 1) return null;

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANG_LABELS[currentLang];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:border-kmf-accent/30"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#8899A6',
        }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>&#9660;</span>
      </button>
      {open && (
        <div
          className="absolute top-full mt-1 right-0 rounded-lg overflow-hidden z-50 min-w-[140px]"
          style={{
            background: '#1A1D23',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {Object.entries(translations).map(([lang, path]) => {
            const info = LANG_LABELS[lang];
            if (!info) return null;
            const isActive = lang === currentLang;
            return (
              <Link
                key={lang}
                to={path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs transition-colors"
                style={{
                  color: isActive ? '#4FC3F7' : '#8899A6',
                  background: isActive ? 'rgba(79,195,247,0.08)' : 'transparent',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span>{info.flag}</span>
                <span>{info.label}</span>
                {isActive && <span style={{ marginLeft: 'auto', fontSize: 10 }}>&#10003;</span>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
