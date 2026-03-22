import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import en from './lang/en';

const LANGS = ['en', 'ro', 'ru', 'ja', 'fr', 'de', 'zh'];
const STORAGE_KEY = 'kmf-lang';

// Dynamic imports for non-EN languages (code-split)
const loaders = {
  ro: () => import('./lang/ro'),
  fr: () => import('./lang/fr'),
  ru: () => import('./lang/ru'),
  ja: () => import('./lang/ja'),
  de: () => import('./lang/de'),
  zh: () => import('./lang/zh'),
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.includes(saved)) return saved;
    } catch {}
    return 'en';
  });

  // Cache loaded translations
  const cache = useRef({ en });

  const [translations, setTranslations] = useState(() => cache.current[lang] || en);

  useEffect(() => {
    if (cache.current[lang]) {
      setTranslations(cache.current[lang]);
      return;
    }
    if (loaders[lang]) {
      loaders[lang]().then((mod) => {
        cache.current[lang] = mod.default;
        setTranslations(mod.default);
      });
    }
  }, [lang]);

  // Keep <html lang> in sync
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    if (LANGS.includes(code)) {
      setLangState(code);
      try { localStorage.setItem(STORAGE_KEY, code); } catch {}
    }
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let val = translations;
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
    if (val !== undefined) return val;
    // Fallback to English
    let fallback = en;
    for (const k of keys) {
      fallback = fallback?.[k];
      if (fallback === undefined) break;
    }
    return fallback ?? key;
  }, [translations]);

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
