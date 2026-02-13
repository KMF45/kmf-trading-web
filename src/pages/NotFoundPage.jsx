import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaPlus, FaQuestionCircle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-kmf-bg flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <img src="/logo-320.webp" alt="K.M.F. Trading Journal" className="w-20 h-20 mx-auto mb-6 opacity-50" width="80" height="80" />

        <h1 className="text-6xl font-bold text-kmf-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-kmf-text-primary mb-2">Page Not Found</h2>
        <p className="text-kmf-text-tertiary mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
          <Link to="/" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaHome className="text-kmf-accent" /> Home
          </Link>
          <Link to="/app" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaChartLine className="text-kmf-accent" /> Dashboard
          </Link>
          <Link to="/app/add-trade" className="flex items-center gap-2 px-4 py-3 bg-kmf-panel border border-kmf-accent/20 rounded-xl text-kmf-text-primary text-sm font-medium hover:border-kmf-accent/50 transition-all">
            <FaPlus className="text-kmf-accent" /> Add Trade
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
