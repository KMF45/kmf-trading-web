import { useAuth } from '../contexts/AuthContext';
import { useTrades } from '../contexts/TradesContext';
import { FaChartLine, FaPlus, FaHistory, FaClipboardCheck, FaArrowUp, FaArrowDown, FaSync } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ label, value, subtext, color }) => (
  <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
    <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider text-center mb-1">{label}</p>
    <p className={`text-xl sm:text-2xl font-bold text-center ${color || 'text-kmf-text-primary'}`}>{value}</p>
    {subtext && <p className="text-xs text-kmf-text-tertiary text-center mt-0.5">{subtext}</p>}
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-kmf-panel border border-kmf-accent/30 rounded-lg px-3 py-2 shadow-glow">
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
  const { trades, stats, settings, loading, closedTrades, loadData, syncing, getPnL } = useTrades();

  const balance = settings.accountBalance || 0;
  const plPercent = balance > 0 ? ((stats.totalPL / (balance - stats.totalPL)) * 100) : 0;

  // Balance evolution chart
  const balanceData = (() => {
    if (closedTrades.length === 0) return [];
    const sorted = [...closedTrades].sort((a, b) => (a.tradeDateTime || a.timestamp) - (b.tradeDateTime || b.timestamp));
    let running = balance - stats.totalPL;
    return sorted.map((t) => {
      running += getPnL(t);
      const d = new Date(t.tradeDateTime || t.timestamp);
      return { date: `${d.getDate()} ${d.toLocaleDateString('en', { month: 'short' })}`, balance: parseFloat(running.toFixed(2)) };
    });
  })();

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
    <div className="max-w-7xl mx-auto space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-kmf-text-primary">Dashboard</h1>
        <button onClick={loadData} disabled={syncing} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all disabled:opacity-50">
          <FaSync className={syncing ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Account Balance - large card */}
      <div className="bg-kmf-panel rounded-xl p-6 border-2 border-kmf-accent/30 text-center">
        <p className="text-sm text-kmf-text-tertiary mb-1">Account Balance</p>
        <p className="text-4xl sm:text-5xl font-bold text-kmf-profit">${balance.toFixed(2)}</p>
        <p className="text-sm mt-1">
          <span className={stats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}>
            {stats.totalPL >= 0 ? '+' : ''}${stats.totalPL.toFixed(2)}
          </span>
          {' '}
          <span className="text-kmf-text-tertiary">
            ({plPercent >= 0 ? '+' : ''}{plPercent.toFixed(2)}%)
          </span>
        </p>
      </div>

      {/* Stats Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total P/L" value={`$${stats.totalPL.toFixed(2)}`} color={stats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'} />
        <StatCard label="Win Rate" value={stats.closedTrades > 0 ? `${stats.winRate.toFixed(1)}%` : '--'} color={stats.winRate >= 50 ? 'text-kmf-profit' : stats.winRate > 0 ? 'text-kmf-loss' : undefined} />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Trades" value={stats.totalTrades} />
        <StatCard label="Month P/L" value={`$${stats.monthPL.toFixed(2)}`} color={stats.monthPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'} />
      </div>

      {/* Stats Row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Max Drawdown" value={`${stats.maxDrawdown.percent.toFixed(2)}%`} subtext={`$${stats.maxDrawdown.amount.toFixed(2)}`} color="text-kmf-loss" />
        <StatCard label="Profit Factor" value={stats.profitFactor > 0 ? stats.profitFactor.toFixed(2) : '--'} color="text-kmf-profit" />
      </div>

      {/* Performance Summary */}
      <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
        <h2 className="text-base font-bold text-kmf-accent mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex justify-between"><span className="text-sm text-kmf-text-tertiary">Avg Win</span><span className="text-sm font-bold text-kmf-profit">${stats.avgWin.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-sm text-kmf-text-tertiary">Best Trade</span><span className="text-sm font-bold text-kmf-profit">${stats.bestTrade.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-sm text-kmf-text-tertiary">Avg Loss</span><span className="text-sm font-bold text-kmf-loss">${stats.avgLoss.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-sm text-kmf-text-tertiary">Worst Trade</span><span className="text-sm font-bold text-kmf-loss">${stats.worstTrade.toFixed(2)}</span></div>
        </div>
        <div className="border-t border-kmf-accent/10 mt-3 pt-3 flex justify-between">
          <span className="text-sm text-kmf-text-tertiary">Profit Factor</span>
          <span className="text-sm font-bold text-kmf-profit">{stats.profitFactor > 0 ? stats.profitFactor.toFixed(2) : '--'}</span>
        </div>
      </div>

      {/* Balance Evolution */}
      <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
        <h2 className="text-base font-bold text-kmf-accent mb-4">Balance Evolution</h2>
        {balanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={balanceData}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E676" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="balance" stroke="#00E676" strokeWidth={2} fill="url(#balGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-kmf-text-tertiary text-sm">
            <p>Chart will appear after your first closed trades</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: '/app/add-trade', icon: FaPlus, label: 'New Trade', color: 'from-kmf-accent to-kmf-accent-bright' },
          { to: '/app/history', icon: FaHistory, label: 'History', color: 'from-purple-500 to-pink-500' },
          { to: '/app/statistics', icon: FaChartLine, label: 'Statistics', color: 'from-orange-500 to-red-500' },
          { to: '/app/weekly-review', icon: FaClipboardCheck, label: 'Weekly Review', color: 'from-teal-500 to-cyan-500' },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 hover:border-kmf-accent/40 transition-all hover-lift group text-center">
            <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
              <item.icon className="text-white" />
            </div>
            <p className="text-xs font-medium text-kmf-text-primary">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
