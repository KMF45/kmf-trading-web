import { useAuth } from '../contexts/AuthContext';
import { useTrades } from '../contexts/TradesContext';
import { FaChartLine, FaPlus, FaHistory, FaClipboardCheck, FaTrophy, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const QuickAction = ({ to, icon: Icon, label, color }) => (
  <Link to={to} className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10 hover:border-kmf-accent/40 transition-all duration-300 hover-lift group">
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
      <Icon className="text-white text-xl" />
    </div>
    <p className="text-sm font-medium text-kmf-text-primary">{label}</p>
  </Link>
);

const StatCard = ({ label, value, subtext, color, icon: Icon }) => (
  <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10 hover:border-kmf-accent/20 transition-all">
    <div className="flex items-center justify-between mb-1">
      <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider">{label}</p>
      {Icon && <Icon className="text-kmf-text-tertiary text-sm" />}
    </div>
    <p className={`text-2xl font-bold ${color || 'text-kmf-text-primary'}`}>{value}</p>
    {subtext && <p className="text-xs text-kmf-text-tertiary mt-1">{subtext}</p>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-kmf-panel border border-kmf-accent/30 rounded-lg px-3 py-2 shadow-glow">
        <p className="text-xs text-kmf-text-tertiary">{label}</p>
        <p className={`text-sm font-bold ${payload[0].value >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
          ${payload[0].value?.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { trades, stats, settings, loading, closedTrades } = useTrades();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Trader';

  const currencySymbol = settings.currency === 'EUR' ? '€' : settings.currency === 'GBP' ? '£' : '$';

  // Build balance evolution data
  const balanceData = (() => {
    if (closedTrades.length === 0) return [];
    const sorted = [...closedTrades]
      .sort((a, b) => new Date(a.closeDate || a.openDate) - new Date(b.closeDate || b.openDate));
    let balance = settings.accountBalance - stats.totalPL;
    return sorted.map((t) => {
      balance += (t.profitLoss || 0);
      const d = new Date(t.closeDate || t.openDate);
      return {
        date: `${d.getDate()}/${d.getMonth() + 1}`,
        balance: parseFloat(balance.toFixed(2)),
      };
    });
  })();

  // Recent trades (last 5)
  const recentTrades = trades.slice(0, 5);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright animate-pulse mb-3"></div>
          <p className="text-kmf-text-secondary text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-kmf-text-primary">
          Welcome, <span className="gradient-text">{displayName}</span>
        </h1>
        <p className="text-kmf-text-tertiary mt-1">Here is your trading overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total Trades"
          value={stats.totalTrades}
          subtext={stats.openTrades > 0 ? `${stats.openTrades} open` : undefined}
          icon={FaChartLine}
        />
        <StatCard
          label="Win Rate"
          value={stats.closedTrades > 0 ? `${stats.winRate.toFixed(1)}%` : '--'}
          subtext={stats.closedTrades > 0 ? `${stats.wins}W / ${stats.losses}L` : 'Start trading'}
          color={stats.winRate >= 50 ? 'text-kmf-profit' : stats.winRate > 0 ? 'text-kmf-loss' : undefined}
        />
        <StatCard
          label="Total P&L"
          value={`${currencySymbol}${stats.totalPL.toFixed(2)}`}
          color={stats.totalPL > 0 ? 'text-kmf-profit' : stats.totalPL < 0 ? 'text-kmf-loss' : 'text-kmf-text-secondary'}
          icon={stats.totalPL >= 0 ? FaArrowUp : FaArrowDown}
        />
        <StatCard
          label="Profit Factor"
          value={stats.profitFactor > 0 ? stats.profitFactor.toFixed(2) : '--'}
          subtext={stats.expectancy !== 0 ? `Exp: ${currencySymbol}${stats.expectancy.toFixed(2)}` : undefined}
          icon={FaTrophy}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-kmf-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickAction to="/app/add-trade" icon={FaPlus} label="New Trade" color="from-kmf-accent to-kmf-accent-bright" />
          <QuickAction to="/app/history" icon={FaHistory} label="Trade History" color="from-purple-500 to-pink-500" />
          <QuickAction to="/app/statistics" icon={FaChartLine} label="Statistics" color="from-orange-500 to-red-500" />
          <QuickAction to="/app/weekly-review" icon={FaClipboardCheck} label="Weekly Review" color="from-teal-500 to-cyan-500" />
        </div>
      </div>

      {/* Balance Evolution Chart */}
      <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
        <h2 className="text-lg font-semibold text-kmf-text-primary mb-4">Balance Evolution</h2>
        {balanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={balanceData}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4FC3F7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4FC3F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#90A4AE" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#90A4AE" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${currencySymbol}${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="balance" stroke="#4FC3F7" strokeWidth={2} fill="url(#balanceGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-kmf-text-tertiary">
            <p>Chart will appear after your first closed trades</p>
          </div>
        )}
      </div>

      {/* Recent Trades */}
      <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-kmf-text-primary">Recent Trades</h2>
          {trades.length > 0 && (
            <Link to="/app/history" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">
              View all
            </Link>
          )}
        </div>
        {recentTrades.length > 0 ? (
          <div className="space-y-2">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-kmf-surface/50 hover:bg-kmf-surface transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${trade.type === 'BUY' ? 'bg-kmf-profit' : 'bg-kmf-loss'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-kmf-text-primary">{trade.symbol || 'Unknown'}</p>
                    <p className="text-xs text-kmf-text-tertiary">
                      {trade.type} · {trade.lotSize || '--'} lots
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${
                    trade.status === 'OPEN' ? 'text-kmf-pending' :
                    (trade.profitLoss || 0) > 0 ? 'text-kmf-profit' :
                    (trade.profitLoss || 0) < 0 ? 'text-kmf-loss' : 'text-kmf-text-secondary'
                  }`}>
                    {trade.status === 'OPEN' ? 'OPEN' : `${currencySymbol}${(trade.profitLoss || 0).toFixed(2)}`}
                  </p>
                  <p className="text-xs text-kmf-text-tertiary">
                    {new Date(trade.openDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-kmf-text-tertiary">
            <p className="mb-2">No trades yet</p>
            <Link to="/app/add-trade" className="text-kmf-accent hover:text-kmf-accent-bright text-sm">
              Add your first trade
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
