import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage, LANG_LABELS } from '../../i18n/LanguageContext';

const LangSwitcher = () => {
  const { lang, setLang, LANGS } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5"
        style={{ color: '#8FB3C5', border: '1px solid rgba(79,195,247,0.15)' }}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span style={{ fontSize: 15 }}>{LANG_LABELS[lang].flag}</span>
        <span className="hidden sm:inline text-xs">{lang.toUpperCase()}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" style={{ opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden animate-fadeIn z-50"
          style={{
            background: 'rgba(20,23,30,0.97)',
            border: '1px solid rgba(79,195,247,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            minWidth: 150,
          }}
        >
          {LANGS.map((code) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 text-left"
              style={{
                color: code === lang ? '#4FC3F7' : '#8FB3C5',
                background: code === lang ? 'rgba(79,195,247,0.08)' : 'transparent',
              }}
              onMouseEnter={(e) => { if (code !== lang) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={(e) => { if (code !== lang) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 16 }}>{LANG_LABELS[code].flag}</span>
              <span className="font-medium">{LANG_LABELS[code].label}</span>
              {code === lang && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto">
                  <path d="M3 7l3 3 5-5" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const navLinks = [
    { href: '/#features', label: t('nav.features') },
    { href: '/#pricing', label: t('nav.pricing') },
    { href: '/#download', label: t('nav.download') },
    { href: '/#faq', label: t('nav.faq') },
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-kmf-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        Skip to content
      </a>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-kmf-bg/95 backdrop-blur-md border-b border-kmf-accent/20 shadow-[0_0_20px_rgba(79,195,247,0.1)]' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <picture>
                <source srcSet="/logo-80.webp" type="image/webp" />
                <img src="/logo-80.png" alt="K.M.F. Trading Journal" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(79,195,247,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(79,195,247,0.6)] transition-all" width="40" height="40" loading="eager" fetchPriority="high" />
              </picture>
              <span className="text-lg font-bold logo-text hidden sm:block">K.M.F.</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium">{link.label}</a>
              ))}
              <Link to="/blog" className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium">{t('nav.blog')}</Link>
              <LangSwitcher />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <LangSwitcher />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-kmf-text-secondary hover:text-kmf-accent transition-colors p-2"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-6 border-t border-kmf-accent/10 mt-2 pt-4 animate-fadeIn" role="navigation" aria-label="Mobile navigation">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium px-2 py-1">{link.label}</a>
                ))}
                <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-kmf-text-secondary hover:text-kmf-accent transition-colors text-sm font-medium px-2 py-1">{t('nav.blog')}</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
