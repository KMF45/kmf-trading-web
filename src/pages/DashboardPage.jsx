import { useAuth } from '../contexts/AuthContext';
import { useTrades } from '../contexts/TradesContext';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { FaChartLine, FaPlus, FaHistory, FaClipboardCheck, FaSync, FaClock, FaArrowUp, FaArrowDown, FaFire, FaTrophy, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="tooltip-glow rounded-lg px-3 py-2">
        <p className={`text-sm font-bold ${payload[0].value >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
          ${payload[0].value?.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const SkeletonLoader = () => (
  <div className="max-w-7xl mx-auto space-y-5">
    <div className="skeleton h-8 w-40" />
    <div className="skeleton h-40 w-full rounded-2xl" />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}
    </div>
    <div className="skeleton h-72 w-full rounded-xl" />
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const { trades, stats, settings, loading, closedTrades, openTrades, loadData, syncing, getPnL } = useTrades();

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

  if (loading) return <SkeletonLoader />;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  })();

  return (
    <div className="max-w-7xl mx-auto space-y-5 stagger-in">
      {/* Header with greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">{greeting}, <span className="gradient-text">{user?.displayName || 'Trader'}</span></h1>
          <p className="text-sm text-kmf-text-tertiary mt-0.5">Here's your trading overview</p>
        </div>
        <button onClick={loadData} disabled={syncing}
          className="p-2.5 rounded-xl text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all disabled:opacity-50 hover-scale">
          <FaSync className={syncing ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Account Balance — hero card with animated border */}
      <div className="glow-border">
        <div className="glass-card rounded-2xl p-6 sm:p-8 text-center shimmer">
          {/* Ambient orb */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
            style={{ background: stats.totalPL >= 0 ? 'rgba(0,230,118,0.4)' : 'rgba(255,82,82,0.4)' }} />

          <p className="text-sm text-kmf-text-tertiary mb-2 tracking-wider uppercase">Account Balance</p>
          <p className="text-5xl sm:text-6xl font-black tracking-tight">
            <AnimatedNumber value={balance} prefix="$" decimals={2}
              className={balance > 0 ? 'text-kmf-text-primary' : 'text-kmf-loss'} />
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className={`flex items-center gap-1 text-sm font-bold ${stats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
              {stats.totalPL >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
              <AnimatedNumber value={Math.abs(stats.totalPL)} prefix={stats.totalPL >= 0 ? '+$' : '-$'} decimals={2} />
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              plPercent >= 0 ? 'bg-kmf-profit/15 text-kmf-profit' : 'bg-kmf-loss/15 text-kmf-loss'
            }`}>
              {plPercent >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Win Rate', value: stats.closedTrades > 0 ? stats.winRate : 0, suffix: '%', decimals: 1,
            color: stats.winRate >= 50 ? 'text-kmf-profit' : 'text-kmf-loss', icon: FaTrophy, variant: stats.winRate >= 50 ? 'stat-card-profit' : 'stat-card-loss' },
          { label: 'Profit Factor', value: stats.profitFactor, suffix: '', decimals: 2,
            color: 'text-kmf-accent', icon: FaChartLine, variant: 'stat-card-accent' },
          { label: 'Total Trades', value: stats.totalTrades, suffix: '', decimals: 0,
            color: 'text-kmf-text-primary', icon: FaShieldAlt, variant: '' },
          { label: 'Streak', value: stats.tradingStreak, suffix: 'd', decimals: 0,
            color: 'text-orange-400', icon: FaFire, variant: '' },
        ].map((s, i) => (
          <div key={i} className={`stat-card p-4 hover-tilt ${s.variant}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">{s.label}</p>
              <s.icon className={`text-xs ${s.color} opacity-60`} />
            </div>
            <p className={`text-2xl font-black ${s.color}`}>
              <AnimatedNumber value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
          </div>
        ))}
      </div>

      {/* Performance Summary — two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Win/Loss breakdown */}
        <div className="glass-card rounded-2xl p-5">
          <h2 className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">Performance</h2>
          <div className="space-y-3">
            {[
              { label: 'Avg Win', value: stats.avgWin, color: 'text-kmf-profit', prefix: '+$' },
              { label: 'Avg Loss', value: stats.avgLoss, color: 'text-kmf-loss', prefix: '-$' },
              { label: 'Best Trade', value: stats.bestTrade, color: 'text-kmf-profit', prefix: '+$' },
              { label: 'Worst Trade', value: Math.abs(stats.worstTrade), color: 'text-kmf-loss', prefix: '-$' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-sm text-kmf-text-tertiary">{s.label}</span>
                <span className={`text-sm font-bold ${s.color}`}>
                  <AnimatedNumber value={s.value} prefix={s.prefix} decimals={2} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Month P/L + Drawdown */}
        <div className="glass-card rounded-2xl p-5">
          <h2 className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">This Month</h2>
          <div className="text-center mb-4">
            <p className={`text-3xl font-black ${stats.monthPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
              <AnimatedNumber value={stats.monthPL} prefix={stats.monthPL >= 0 ? '+$' : '-$'} decimals={2} />
            </p>
            <p className="text-xs text-kmf-text-tertiary mt-1">month P/L</p>
          </div>
          <div className="border-t border-white/5 pt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-kmf-text-tertiary">Max Drawdown</span>
              <span className="text-sm font-bold text-kmf-loss">{stats.maxDrawdown.percent.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-kmf-text-tertiary">Drawdown Amount</span>
              <span className="text-sm font-bold text-kmf-loss">${stats.maxDrawdown.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-kmf-text-tertiary">Profit Factor</span>
              <span className="text-sm font-bold text-kmf-profit">{stats.profitFactor > 0 ? stats.profitFactor.toFixed(2) : '--'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Evolution Chart */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest">Balance Evolution</h2>
          {balanceData.length > 0 && (
            <span className="text-xs text-kmf-text-tertiary">{balanceData.length} trades</span>
          )}
        </div>
        {balanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={balanceData}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E676" stopOpacity={0.25} />
                  <stop offset="50%" stopColor="#00E676" stopOpacity={0.05} />
                  <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={60} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="balance" stroke="#00E676" strokeWidth={2.5}
                fill="url(#balGrad)" dot={false} activeDot={{ r: 5, fill: '#00E676', stroke: '#0F1115', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-52 flex items-center justify-center">
            <div className="text-center">
              <FaChartLine className="text-kmf-accent/30 text-4xl mx-auto mb-3" />
              <p className="text-kmf-text-tertiary text-sm">Chart appears after your first closed trade</p>
            </div>
          </div>
        )}
      </div>

      {/* Open Positions */}
      {openTrades.length > 0 && (
        <div className="glass-card rounded-2xl p-5 border-yellow-500/20" style={{ borderColor: 'rgba(234,179,8,0.15)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-yellow-400 pulse-dot" />
            <h2 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Open Positions</h2>
            <span className="ml-auto text-xs px-2.5 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400 font-bold">
              {openTrades.length}
            </span>
          </div>
          <div className="space-y-2">
            {openTrades.map((trade) => {
              const dt = new Date(trade.tradeDateTime || trade.timestamp);
              const dateStr = `${dt.getDate()} ${dt.toLocaleDateString('en', { month: 'short' })}`;
              return (
                <Link key={trade.id} to={`/app/add-trade?edit=${trade.id}`}
                  className="flex items-center justify-between p-3 rounded-xl trade-pending hover:bg-yellow-500/5 transition-all group">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${trade.type === 'BUY' ? 'bg-kmf-profit/15 text-kmf-profit' : 'bg-kmf-loss/15 text-kmf-loss'}`}>
                      {trade.type}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-kmf-text-primary group-hover:text-kmf-accent transition-colors">{trade.instrument}</p>
                      <p className="text-xs text-kmf-text-tertiary">{dateStr} · {trade.lotSize} lot</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-kmf-text-tertiary">Entry</p>
                    <p className="text-sm font-bold text-kmf-text-primary">{trade.entryPrice}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { to: '/app/add-trade', icon: FaPlus, label: 'New Trade', gradient: 'from-[#4FC3F7] to-[#03A9F4]', glow: 'rgba(79,195,247,0.3)' },
          { to: '/app/history', icon: FaHistory, label: 'History', gradient: 'from-purple-500 to-pink-500', glow: 'rgba(168,85,247,0.3)' },
          { to: '/app/statistics', icon: FaChartLine, label: 'Statistics', gradient: 'from-orange-500 to-red-500', glow: 'rgba(249,115,22,0.3)' },
          { to: '/app/weekly-review', icon: FaClipboardCheck, label: 'Weekly Review', gradient: 'from-teal-500 to-cyan-500', glow: 'rgba(20,184,166,0.3)' },
        ].map((item) => (
          <Link key={item.to} to={item.to}
            className="glass-card rounded-2xl p-4 text-center hover-lift group cursor-pointer">
            <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3
              group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
              style={{ '--tw-shadow': `0 4px 20px ${item.glow}` }}>
              <item.icon className="text-white text-lg" />
            </div>
            <p className="text-xs font-semibold text-kmf-text-secondary group-hover:text-kmf-text-primary transition-colors">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
