import { useAuth } from '../contexts/AuthContext';
import { FaChartLine, FaPlus, FaHistory, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QuickAction = ({ to, icon: Icon, label, color }) => (
  <Link to={to} className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10 hover:border-kmf-accent/40 transition-all duration-300 hover-lift group">
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
      <Icon className="text-white text-xl" />
    </div>
    <p className="text-sm font-medium text-kmf-text-primary">{label}</p>
  </Link>
);

const StatCard = ({ label, value, subtext, color }) => (
  <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
    <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color || 'text-kmf-text-primary'}`}>{value}</p>
    {subtext && <p className="text-xs text-kmf-text-tertiary mt-1">{subtext}</p>}
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Trader';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-kmf-text-primary">
          Welcome, <span className="gradient-text">{displayName}</span>
        </h1>
        <p className="text-kmf-text-tertiary mt-1">Here's your trading overview</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Trades" value="0" subtext="No trades yet" />
        <StatCard label="Win Rate" value="--" subtext="Start trading" />
        <StatCard label="Total P&L" value="$0.00" color="text-kmf-text-secondary" />
        <StatCard label="Profit Factor" value="--" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-kmf-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickAction to="/app/add-trade" icon={FaPlus} label="New Trade" color="from-kmf-accent to-kmf-accent-bright" />
          <QuickAction to="/app/history" icon={FaHistory} label="Trade History" color="from-purple-500 to-pink-500" />
          <QuickAction to="/app/statistics" icon={FaChartLine} label="Statistics" color="from-orange-500 to-red-500" />
          <QuickAction to="/app/weekly-review" icon={FaClipboardCheck} label="Weekly Review" color="from-teal-500 to-cyan-500" />
        </div>
      </div>

      <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
        <h2 className="text-lg font-semibold text-kmf-text-primary mb-2">Balance Evolution</h2>
        <div className="h-64 flex items-center justify-center text-kmf-text-tertiary">
          <p>Chart will appear after your first trades</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
