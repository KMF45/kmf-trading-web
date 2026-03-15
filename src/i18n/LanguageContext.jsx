import { createContext, useContext, useState, useCallback } from 'react';
import { translations } from './translations';

const LANGS = ['en', 'ro', 'ru', 'ja', 'fr', 'de', 'zh'];
const STORAGE_KEY = 'kmf-lang';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.includes(saved)) return saved;
    } catch {}
    return 'en';
  });

  const setLang = useCallback((code) => {
    if (LANGS.includes(code)) {
      setLangState(code);
      try { localStorage.setItem(STORAGE_KEY, code); } catch {}
    }
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
    if (val !== undefined) return val;
    // Fallback to English
    let fallback = translations.en;
    for (const k of keys) {
      fallback = fallback?.[k];
      if (fallback === undefined) break;
    }
    return fallback ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, LANGS }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

export const LANG_LABELS = {
  en: { flag: '🇬🇧', label: 'English' },
  ro: { flag: '🇷🇴', label: 'Română' },
  ru: { flag: '🇷🇺', label: 'Русский' },
  ja: { flag: '🇯🇵', label: '日本語' },
  fr: { flag: '🇫🇷', label: 'Français' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
  zh: { flag: '🇨🇳', label: '中文' },
};
