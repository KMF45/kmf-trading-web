import { useAuth } from '../contexts/AuthContext';
import { useTrades } from '../contexts/TradesContext';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { FaChartLine, FaSync, FaArrowUp, FaArrowDown, FaExclamationTriangle } from 'react-icons/fa';
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
    <div className="skeleton h-40 w-full rounded-2xl" />
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}
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

  return (
    <div className="max-w-7xl mx-auto space-y-5 stagger-in">
      {/* Tilt Detection Alert */}
      {stats.tiltStatus.isTilting && (
        <div className={`rounded-2xl p-4 border ${stats.tiltStatus.severity === 'high' ? 'bg-kmf-loss/8 border-kmf-loss/30' : 'bg-orange-500/8 border-orange-500/30'} animate-fadeIn`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${stats.tiltStatus.severity === 'high' ? 'bg-kmf-loss/15' : 'bg-orange-500/15'}`}>
              <FaExclamationTriangle className={`text-lg ${stats.tiltStatus.severity === 'high' ? 'text-kmf-loss' : 'text-orange-400'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold mb-1 ${stats.tiltStatus.severity === 'high' ? 'text-kmf-loss' : 'text-orange-400'}`}>
                Tilt Detected
              </p>
              {stats.tiltStatus.alerts.map((alert, i) => (
                <p key={i} className="text-xs text-kmf-text-secondary mb-0.5">{alert.message}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Account Balance — hero card with animated border */}
      <div className="glow-border">
        <div className="glass-card rounded-2xl p-6 sm:p-8 text-center shimmer">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
            style={{ background: stats.totalPL >= 0 ? 'rgba(0,230,118,0.4)' : 'rgba(255,82,82,0.4)' }} />

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-kmf-text-tertiary tracking-wider uppercase">Account Balance</p>
            <button onClick={loadData} disabled={syncing}
              className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all disabled:opacity-50">
              <FaSync size={14} className={syncing ? 'animate-spin' : ''} />
            </button>
          </div>

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

      {/* Quick Stats — 6 cards matching Android layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total P/L', value: stats.totalPL, prefix: stats.totalPL >= 0 ? '+$' : '-$', displayValue: Math.abs(stats.totalPL), decimals: 2,
            color: stats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss' },
          { label: 'Win Rate', value: stats.closedTrades > 0 ? stats.winRate : 0, suffix: '%', decimals: 1,
            color: stats.winRate >= 50 ? 'text-kmf-profit' : 'text-kmf-loss' },
          { label: 'Total Trades', value: stats.totalTrades, decimals: 0, color: 'text-kmf-text-primary' },
          { label: 'Month P/L', value: stats.monthPL, prefix: stats.monthPL >= 0 ? '+$' : '-$', displayValue: Math.abs(stats.monthPL), decimals: 2,
            color: stats.monthPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss' },
          { label: 'Max Drawdown', value: stats.maxDrawdown.percent, suffix: '%', decimals: 2, color: 'text-kmf-loss' },
          { label: 'Profit Factor', value: stats.profitFactor, decimals: 2, color: stats.profitFactor >= 1 ? 'text-kmf-profit' : 'text-kmf-loss' },
        ].map((s, i) => (
          <div key={i} className="stat-card p-4 hover-tilt">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>
              <AnimatedNumber value={s.displayValue ?? s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.decimals} />
            </p>
          </div>
        ))}
      </div>

      {/* Performance Summary — matching Android */}
      <div className="glass-card rounded-2xl p-5">
        <h2 className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Avg Win', value: stats.avgWin, color: 'text-kmf-profit', prefix: '+$' },
            { label: 'Avg Loss', value: stats.avgLoss, color: 'text-kmf-loss', prefix: '-$' },
            { label: 'Best Trade', value: stats.bestTrade, color: 'text-kmf-profit', prefix: '+$' },
            { label: 'Worst Trade', value: Math.abs(stats.worstTrade), color: 'text-kmf-loss', prefix: '-$' },
          ].map((s, i) => (
            <div key={i} className="bg-kmf-surface/50 rounded-xl p-3">
              <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>
                <AnimatedNumber value={s.value} prefix={s.prefix} decimals={2} />
              </p>
            </div>
          ))}
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
    </div>
  );
};

export default DashboardPage;
