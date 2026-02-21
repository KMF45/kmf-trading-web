import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBookOpen, FaRocket, FaQuestionCircle } from 'react-icons/fa';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page Not Found | K.M.F. Trading Journal';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'This page doesn\'t exist. Browse our trading blog or join the K.M.F. Trading Journal beta program.');
    let robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', 'noindex, nofollow');
    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      if (desc) desc.setAttribute('content', 'K.M.F. Trading Journal is a professional trading journal app for forex, stocks & crypto traders.');
      if (robots) robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    };
  }, []);

  return (
    <main className="min-h-screen bg-kmf-bg flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <img src="/logo-320.webp" alt="K.M.F. Trading Journal" className="w-20 h-20 mx-auto mb-6 opacity-50" width="80" height="80" />

        <h1 className="text-6xl font-bold text-kmf-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-kmf-text-primary mb-2">Page Not Found</h2>
        <p className="text-kmf-text-tertiary mb-8">
          The page you're looking for doesn't exist or has been moved. Check out our blog or head back home.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
          <Link to="/" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaHome className="text-kmf-accent" /> Home
          </Link>
          <Link to="/blog" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaBookOpen className="text-kmf-accent" /> Blog
          </Link>
          <Link to="/#beta" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaRocket className="text-kmf-accent" /> Join Beta
          </Link>
          <Link to="/#faq" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaQuestionCircle className="text-kmf-accent" /> FAQ
          </Link>
        </div>

        <p className="text-xs text-kmf-text-tertiary">
          K.M.F. Trading Journal – Professional trading journal for forex, stocks & crypto traders
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
