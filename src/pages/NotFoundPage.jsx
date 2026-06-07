import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBookOpen, FaGooglePlay, FaQuestionCircle } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

const T = {
  en: {
    metaTitle: 'Page Not Found | K.M.F. Trading Journal',
    metaDesc: "This page doesn't exist. Browse our trading blog or download K.M.F. Trading Journal from Google Play.",
    heading: 'Page Not Found',
    body: "The page you're looking for doesn't exist or has been moved. Check out our blog or head back home.",
    home: 'Home', blog: 'Blog', download: 'Download App', faq: 'FAQ',
    tagline: 'K.M.F. Trading Journal – Professional trading journal for forex, stocks & crypto traders',
  },
  ro: {
    metaTitle: 'Pagină negăsită | K.M.F. Trading Journal',
    metaDesc: 'Această pagină nu există. Citește blogul nostru de trading sau descarcă K.M.F. Trading Journal din Google Play.',
    heading: 'Pagină negăsită',
    body: 'Pagina pe care o cauți nu există sau a fost mutată. Aruncă un ochi pe blog sau întoarce-te acasă.',
    home: 'Acasă', blog: 'Blog', download: 'Descarcă aplicația', faq: 'FAQ',
    tagline: 'K.M.F. Trading Journal – Trading journal pentru traderii de forex, acțiuni și crypto',
  },
};

const NotFoundPage = () => {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;

  useEffect(() => {
    document.title = t.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.metaDesc);
    let robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', 'noindex, nofollow');
    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      if (desc) desc.setAttribute('content', 'K.M.F. Trading Journal is a professional trading journal app for forex, stocks & crypto traders.');
      if (robots) robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    };
  }, [t]);

  return (
    <main id="main-content" className="min-h-screen bg-kmf-bg flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <img src="/logo-320.webp" alt="K.M.F. Trading Journal" className="w-20 h-20 mx-auto mb-6 opacity-50" width="80" height="80" />

        <h1 className="text-6xl font-bold text-kmf-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-kmf-text-primary mb-2">{t.heading}</h2>
        <p className="text-kmf-text-tertiary mb-8">
          {t.body}
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
          <Link to="/" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaHome className="text-kmf-accent" /> {t.home}
          </Link>
          <Link to="/blog" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaBookOpen className="text-kmf-accent" /> {t.blog}
          </Link>
          <a href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaGooglePlay className="text-kmf-accent" /> {t.download}
          </a>
          <Link to="/#faq" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaQuestionCircle className="text-kmf-accent" /> {t.faq}
          </Link>
        </div>

        <p className="text-xs text-kmf-text-tertiary">
          {t.tagline}
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
