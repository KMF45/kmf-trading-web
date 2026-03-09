import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTrades } from '../contexts/TradesContext';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { FaChartLine, FaRocket, FaChartBar, FaFire, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTrophy } from 'react-icons/fa';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calculateRMultiple } from '../utils/models';
import { getTradingSession } from '../data/models';

const TIME_RANGES = [
  { key: '7d', label: '7 Days' },
  { key: '30d', label: '30 Days' },
  { key: '3m', label: '3 Months' },
  { key: 'ytd', label: 'YTD' },
  { key: 'all', label: 'All Time' },
];

const getTimeRangeStart = (key) => {
  const now = new Date();
  switch (key) {
    case '7d': return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime();
    case '30d': return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).getTime();
    case '3m': return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).getTime();
    case 'ytd': return new Date(now.getFullYear(), 0, 1).getTime();
    default: return 0;
  }
};

const MonthlyTooltip = ({ active, payload, label }) => {
  if (active && payload?.[0]) {
    const val = payload[0].value;
    return (
      <div className="tooltip-glow rounded-lg px-3 py-2">
        <p className="text-xs text-kmf-text-tertiary mb-0.5">{label}</p>
        <p className={`text-sm font-bold ${val >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
          {val >= 0 ? '+' : ''}${val.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const StatisticsPage = () => {
  const { stats, closedTrades, getPnL } = useTrades();
  const [timeRange, setTimeRange] = useState('all');

  // Filter trades by time range
  const filteredTrades = useMemo(() => {
    if (timeRange === 'all') return closedTrades;
    const start = getTimeRangeStart(timeRange);
    return closedTrades.filter(t => (t.tradeDateTime || t.timestamp) >= start);
  }, [closedTrades, timeRange]);

  // Filtered stats
  const fStats = useMemo(() => {
    const trades = filteredTrades;
    const wins = trades.filter(t => t.result === 'PROFIT');
    const losses = trades.filter(t => t.result === 'LOSS');
    const totalPL = trades.reduce((s, t) => s + getPnL(t), 0);
    const winRate = trades.length > 0 ? (wins.length / trades.length) * 100 : 0;
    const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + getPnL(t), 0) / wins.length : 0;
    const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + getPnL(t), 0) / losses.length) : 0;
    const totalWinAmt = wins.reduce((s, t) => s + getPnL(t), 0);
    const totalLossAmt = Math.abs(losses.reduce((s, t) => s + getPnL(t), 0));
    const profitFactor = totalLossAmt > 0 ? totalWinAmt / totalLossAmt : totalWinAmt;
    const expectancy = trades.length > 0 ? ((winRate / 100) * avgWin) - ((1 - winRate / 100) * avgLoss) : 0;
    const avgRMul = trades.length > 0 ? trades.reduce((s, t) => s + calculateRMultiple(t), 0) / trades.length : 0;
    const bestTrade = trades.length > 0 ? Math.max(...trades.map(t => getPnL(t))) : 0;
    const worstTrade = trades.length > 0 ? Math.min(...trades.map(t => getPnL(t))) : 0;
    return { totalPL, winRate, avgWin, avgLoss, profitFactor, expectancy, avgRMultiple: avgRMul, bestTrade, worstTrade, closedTrades: trades.length, wins: wins.length, losses: losses.length, pfQuality: profitFactor >= 2 ? 'Excellent' : profitFactor >= 1 ? 'Good' : 'Poor' };
  }, [filteredTrades, getPnL]);

  // Use filtered trades for all charts when not 'all', otherwise use global stats
  const displayStats = timeRange === 'all' ? stats : { ...stats, ...fStats };
  const displayTrades = filteredTrades;

  // R-Multiple Distribution
  const rMultipleData = (() => {
    const buckets = { '3R+': 0, '2R-3R': 0, '1R-2R': 0, '0R-1R': 0, '-1R-0R': 0, '-2R--1R': 0, '<-2R': 0 };
    displayTrades.forEach(t => {
      const r = calculateRMultiple(t);
      if (r >= 3) buckets['3R+']++;
      else if (r >= 2) buckets['2R-3R']++;
      else if (r >= 1) buckets['1R-2R']++;
      else if (r >= 0) buckets['0R-1R']++;
      else if (r >= -1) buckets['-1R-0R']++;
      else if (r >= -2) buckets['-2R--1R']++;
      else buckets['<-2R']++;
    });
    return Object.entries(buckets).filter(([, v]) => v > 0).map(([name, count]) => ({ name, count }));
  })();

  // Equity Curve data
  const equityCurve = (() => {
    if (displayTrades.length === 0) return [];
    const sorted = [...displayTrades].sort((a, b) => (a.tradeDateTime || a.timestamp) - (b.tradeDateTime || b.timestamp));
    let running = 0;
    return sorted.map((t, i) => {
      running += getPnL(t);
      const d = new Date(t.tradeDateTime || t.timestamp);
      return {
        trade: i + 1,
        date: `${d.getDate()} ${d.toLocaleDateString('en', { month: 'short' })}`,
        equity: parseFloat(running.toFixed(2)),
      };
    });
  })();

  // Heatmap: performance by day of week × hour block
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const HOURS = ['00-03', '04-07', '08-11', '12-15', '16-19', '20-23'];
  const heatmapData = (() => {
    const grid = {};
    DAYS.forEach(d => { grid[d] = {}; HOURS.forEach(h => { grid[d][h] = { pl: 0, count: 0 }; }); });
    displayTrades.forEach(t => {
      const dt = new Date(t.tradeDateTime || t.timestamp);
      const dayIdx = dt.getDay(); // 0=Sun
      const day = DAYS[dayIdx === 0 ? 6 : dayIdx - 1]; // shift to Mon-first
      const hour = dt.getHours();
      const hourBlock = HOURS[Math.floor(hour / 4)];
      grid[day][hourBlock].pl += getPnL(t);
      grid[day][hourBlock].count++;
    });
    return grid;
  })();

  // Find min/max P/L for heatmap color scaling
  const heatmapRange = (() => {
    let min = 0, max = 0;
    DAYS.forEach(d => HOURS.forEach(h => {
      const v = heatmapData[d]?.[h]?.pl || 0;
      if (v < min) min = v;
      if (v > max) max = v;
    }));
    return { min, max };
  })();

  const getHeatColor = (val) => {
    if (val === 0) return 'rgba(255,255,255,0.03)';
    if (val > 0) {
      const intensity = heatmapRange.max > 0 ? Math.min(val / heatmapRange.max, 1) : 0;
      return `rgba(0,230,118,${0.1 + intensity * 0.5})`;
    }
    const intensity = heatmapRange.min < 0 ? Math.min(Math.abs(val) / Math.abs(heatmapRange.min), 1) : 0;
    return `rgba(255,82,82,${0.1 + intensity * 0.5})`;
  };

  const disciplineLabel = displayStats.disciplinePercent >= 80 ? 'CONSISTENT' : displayStats.disciplinePercent >= 60 ? 'MODERATE' : 'NEEDS WORK';

  // Win rate ring (animated SVG)
  const wr = displayStats.winRate;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (wr / 100) * circumference;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      return (
        <div className="tooltip-glow rounded-lg px-3 py-2">
          <p className="text-sm text-kmf-text-primary">{payload[0].payload.name}: <b className="text-kmf-accent">{payload[0].value}</b></p>
        </div>
      );
    }
    return null;
  };

  if (closedTrades.length === 0) {
    return (
      <div className="max-w-7xl mx-auto animate-fadeIn">
        <h1 className="text-2xl font-bold text-kmf-text-primary mb-6">Statistics</h1>
        <div className="glass-card rounded-2xl p-12 text-center">
          <FaChartLine className="text-kmf-accent/30 text-4xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-kmf-text-primary mb-1">No closed trades yet</h2>
          <p className="text-kmf-text-tertiary text-sm">Statistics will appear after you close your first trade</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5 stagger-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Statistics</h1>
          <p className="text-sm text-kmf-text-tertiary">Performance Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/app/profile" className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold ${stats.traderBadge.bg} ${stats.traderBadge.color} hover:opacity-80 transition-opacity`}>
            <FaTrophy size={10} /> {stats.traderBadge.badge}
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-kmf-accent/15 text-kmf-accent">
            {stats.tradingLevel.label}
          </span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 flex-wrap">
        {TIME_RANGES.map((tr) => (
          <button key={tr.key} onClick={() => setTimeRange(tr.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium hover-scale transition-all ${
              timeRange === tr.key
                ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                : 'bg-kmf-surface/50 border border-white/5 text-kmf-text-tertiary hover:border-kmf-accent/20'
            }`}>
            {tr.label}
          </button>
        ))}
      </div>

      {/* Insights */}
      {stats.insights.length > 0 && (
        <div className="space-y-2">
          {stats.insights.map((insight, i) => (
            <div key={i} className={`glass-card rounded-xl p-3 flex items-start gap-3 ${
              insight.type === 'CRITICAL' ? 'border-kmf-loss/30' :
              insight.type === 'WARNING' ? 'border-yellow-500/30' :
              insight.type === 'SUCCESS' ? 'border-kmf-profit/30' : 'border-blue-500/30'
            }`} style={{ borderWidth: 1 }}>
              {insight.type === 'CRITICAL' && <FaExclamationTriangle className="text-red-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'WARNING' && <FaExclamationTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'SUCCESS' && <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'INFO' && <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />}
              <p className="text-xs text-kmf-text-secondary">{insight.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Win Rate + Total P/L */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Win Rate Circle — animated */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">WIN RATE</p>
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(26,29,36,0.8)" strokeWidth="8" />
              <circle cx="60" cy="60" r={radius} fill="none"
                stroke="url(#winRateGradient)" strokeWidth="8"
                strokeDasharray={circumference}
                strokeLinecap="round"
                className="ring-animate"
                style={{ '--ring-circumference': circumference, '--ring-offset': circumference - strokeDash }} />
              <defs>
                <linearGradient id="winRateGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00E676" />
                  <stop offset="100%" stopColor="#4FC3F7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-kmf-profit">
                <AnimatedNumber value={wr} decimals={0} />%
              </span>
              <span className="text-[10px] text-kmf-text-tertiary mt-0.5">win rate</span>
            </div>
          </div>
          <p className="text-sm text-kmf-text-tertiary mt-3">{displayStats.closedTrades} Trades</p>
        </div>

        {/* Total P/L + Profit Factor */}
        <div className="glass-card rounded-2xl p-6 hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">TOTAL P/L</p>
          <p className={`text-4xl font-black ${displayStats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            <AnimatedNumber value={displayStats.totalPL} prefix={displayStats.totalPL >= 0 ? '+' : ''} suffix="" decimals={0} />
            <span className="text-lg font-medium text-kmf-text-tertiary ml-2">USD</span>
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1 mb-4">{displayStats.totalPL >= 0 ? 'net profit' : 'net loss'}</p>

          <div className="border-t border-white/5 pt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-kmf-text-tertiary">Profit Factor</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-kmf-profit">{displayStats.profitFactor.toFixed(2)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  displayStats.pfQuality === 'Excellent' ? 'bg-kmf-profit/15 text-kmf-profit' :
                  displayStats.pfQuality === 'Good' ? 'bg-yellow-500/15 text-yellow-400' :
                  'bg-kmf-loss/15 text-kmf-loss'
                }`}>{displayStats.pfQuality}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-kmf-text-tertiary">Avg R-Multiple</span>
              <span className={`text-sm font-bold ${displayStats.avgRMultiple >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {displayStats.avgRMultiple >= 0 ? '+' : ''}{displayStats.avgRMultiple.toFixed(2)}R
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expectancy + Discipline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stat-card stat-card-accent p-5 hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">EXPECTANCY</p>
          <p className={`text-3xl font-black ${displayStats.expectancy >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            <AnimatedNumber value={displayStats.expectancy} prefix="" decimals={0} />
            <span className="text-lg font-medium text-kmf-text-tertiary ml-1">USD</span>
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1">per trade</p>
          <div className="border-t border-white/5 mt-3 pt-3 space-y-1">
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Win</span><span className="text-xs font-bold text-kmf-profit">+{displayStats.avgWin.toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Loss</span><span className="text-xs font-bold text-kmf-loss">-{displayStats.avgLoss.toFixed(0)}</span></div>
          </div>
        </div>

        <div className="stat-card p-5 text-center hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">DISCIPLINE</p>
          {/* Discipline visual ring */}
          <div className="relative w-24 h-24 mx-auto mb-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(26,29,36,0.8)" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none"
                stroke={displayStats.disciplinePercent >= 70 ? '#00E676' : '#FF5252'}
                strokeWidth="6" strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={(1 - displayStats.disciplinePercent / 100) * 2 * Math.PI * 42}
                strokeLinecap="round" className="ring-animate"
                style={{ '--ring-circumference': 2 * Math.PI * 42, '--ring-offset': (1 - displayStats.disciplinePercent / 100) * 2 * Math.PI * 42 }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-black ${displayStats.disciplinePercent >= 70 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {displayStats.disciplinePercent.toFixed(0)}%
              </span>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
            displayStats.disciplinePercent >= 80 ? 'bg-kmf-profit/15 text-kmf-profit' : displayStats.disciplinePercent >= 60 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-kmf-loss/15 text-kmf-loss'
          }`}>{disciplineLabel}</span>
        </div>
      </div>

      {/* R-Multiple Distribution */}
      {rMultipleData.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">R-MULTIPLE DISTRIBUTION</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={rMultipleData} layout="vertical">
              <XAxis type="number" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {rMultipleData.map((entry, i) => (
                  <Cell key={i} fill={entry.name.includes('-') || entry.name.includes('<') ? '#FF5252' : '#4FC3F7'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Best / Worst / Streak */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card stat-card-profit p-4 hover-tilt">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">BEST</p>
            <FaRocket className="text-kmf-profit text-xs" />
          </div>
          <p className="text-xl font-black text-kmf-profit">
            <AnimatedNumber value={displayStats.bestTrade} prefix="$" decimals={0} />
          </p>
        </div>
        <div className="stat-card stat-card-loss p-4 hover-tilt">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">WORST</p>
            <FaChartBar className="text-kmf-loss text-xs" />
          </div>
          <p className="text-xl font-black text-kmf-loss">
            <AnimatedNumber value={Math.abs(displayStats.worstTrade)} prefix="$" decimals={0} />
          </p>
        </div>
        <div className="stat-card p-4 hover-tilt" style={{ borderLeft: '3px solid rgba(251,146,60,0.5)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">STREAK</p>
            <FaFire className="text-orange-400 text-xs" />
          </div>
          <p className="text-xl font-black text-orange-400">{displayStats.tradingStreak}d</p>
        </div>
      </div>

      {/* Monthly P&L */}
      {displayStats.monthlyPL.some(m => m.pl !== 0) && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">MONTHLY P&amp;L</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={displayStats.monthlyPL} barSize={28}>
              <XAxis dataKey="month" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={50} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<MonthlyTooltip />} />
              <Bar dataKey="pl" radius={[6, 6, 0, 0]}>
                {displayStats.monthlyPL.map((entry, i) => (
                  <Cell key={i} fill={entry.pl >= 0 ? '#00E676' : '#FF5252'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Equity Curve */}
      {equityCurve.length > 1 && (
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">EQUITY CURVE</p>
            <span className={`text-xs font-bold ${equityCurve[equityCurve.length - 1].equity >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
              {equityCurve[equityCurve.length - 1].equity >= 0 ? '+' : ''}${equityCurve[equityCurve.length - 1].equity.toFixed(2)}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={equityCurve}>
              <defs>
                <linearGradient id="eqGradProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E676" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eqGradLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={55} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  const v = payload[0].value;
                  return (
                    <div className="tooltip-glow rounded-lg px-3 py-2">
                      <p className="text-xs text-kmf-text-tertiary mb-0.5">Trade #{payload[0].payload.trade}</p>
                      <p className={`text-sm font-bold ${v >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                        {v >= 0 ? '+' : ''}${v.toFixed(2)}
                      </p>
                    </div>
                  );
                }
                return null;
              }} />
              <Area type="monotone" dataKey="equity"
                stroke={equityCurve[equityCurve.length - 1].equity >= 0 ? '#00E676' : '#FF5252'}
                strokeWidth={2.5}
                fill={equityCurve[equityCurve.length - 1].equity >= 0 ? 'url(#eqGradProfit)' : 'url(#eqGradLoss)'}
                dot={false}
                activeDot={{ r: 5, stroke: '#0F1115', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Performance Heatmap — Day × Hour */}
      {displayTrades.length >= 3 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">PERFORMANCE HEATMAP</p>
          <p className="text-xs text-kmf-text-tertiary mb-3">P/L by day of week and time of day</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr>
                  <th className="text-[10px] text-kmf-text-tertiary font-medium pb-2 text-left w-12"></th>
                  {HOURS.map(h => (
                    <th key={h} className="text-[10px] text-kmf-text-tertiary font-medium pb-2 text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAYS.map(day => (
                  <tr key={day}>
                    <td className="text-[10px] text-kmf-text-tertiary font-medium py-0.5 pr-2">{day}</td>
                    {HOURS.map(hour => {
                      const cell = heatmapData[day]?.[hour] || { pl: 0, count: 0 };
                      return (
                        <td key={hour} className="p-0.5">
                          <div className="rounded-lg h-10 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-default relative group"
                            style={{ backgroundColor: getHeatColor(cell.pl) }}>
                            {cell.count > 0 && (
                              <>
                                <span className={`text-[10px] font-bold ${cell.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                                  {cell.pl >= 0 ? '+' : ''}{cell.pl.toFixed(0)}
                                </span>
                                <span className="text-[8px] text-kmf-text-tertiary">{cell.count}t</span>
                              </>
                            )}
                            {/* Tooltip on hover */}
                            {cell.count > 0 && (
                              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 tooltip-glow rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                <p className="text-[10px] text-kmf-text-tertiary">{day} {hour}</p>
                                <p className={`text-xs font-bold ${cell.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                                  {cell.pl >= 0 ? '+' : ''}${cell.pl.toFixed(2)} ({cell.count} trades)
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(255,82,82,0.4)' }} />
              <span className="text-[10px] text-kmf-text-tertiary">Loss</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <span className="text-[10px] text-kmf-text-tertiary">No trades</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(0,230,118,0.4)' }} />
              <span className="text-[10px] text-kmf-text-tertiary">Profit</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Pairs */}
      {displayStats.topPairs.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">TOP PAIRS</p>
          <div className="space-y-3">
            {displayStats.topPairs.map((pair, i) => {
              const pairWR = pair.trades > 0 ? ((pair.wins / pair.trades) * 100) : 0;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-kmf-accent w-5">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-kmf-text-primary">{pair.instrument}</p>
                      <p className={`text-sm font-bold ${pair.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                        {pair.pl >= 0 ? '+' : ''}{pair.pl.toFixed(0)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-kmf-text-tertiary">{pair.trades} trades</span>
                      <div className="flex-1 h-1.5 rounded-full bg-kmf-surface overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-kmf-accent to-kmf-profit progress-animate"
                          style={{ '--progress-width': `${pairWR}%` }} />
                      </div>
                      <span className="text-xs font-bold text-kmf-text-secondary">{pairWR.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
