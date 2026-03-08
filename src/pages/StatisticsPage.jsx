import { useTrades } from '../contexts/TradesContext';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { FaChartLine, FaRocket, FaChartBar, FaFire, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calculateRMultiple } from '../utils/models';

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

  // R-Multiple Distribution
  const rMultipleData = (() => {
    const buckets = { '3R+': 0, '2R-3R': 0, '1R-2R': 0, '0R-1R': 0, '-1R-0R': 0, '-2R--1R': 0, '<-2R': 0 };
    closedTrades.forEach(t => {
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

  const disciplineLabel = stats.disciplinePercent >= 80 ? 'CONSISTENT' : stats.disciplinePercent >= 60 ? 'MODERATE' : 'NEEDS WORK';

  // Win rate ring (animated SVG)
  const wr = stats.winRate;
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
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${stats.traderBadge.bg} ${stats.traderBadge.color}`}>
            {stats.traderBadge.badge}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-kmf-accent/15 text-kmf-accent">
            {stats.tradingLevel.label}
          </span>
        </div>
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
          <p className="text-sm text-kmf-text-tertiary mt-3">{stats.closedTrades} Trades</p>
        </div>

        {/* Total P/L + Profit Factor */}
        <div className="glass-card rounded-2xl p-6 hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">TOTAL P/L</p>
          <p className={`text-4xl font-black ${stats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            <AnimatedNumber value={stats.totalPL} prefix={stats.totalPL >= 0 ? '+' : ''} suffix="" decimals={0} />
            <span className="text-lg font-medium text-kmf-text-tertiary ml-2">USD</span>
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1 mb-4">{stats.totalPL >= 0 ? 'net profit' : 'net loss'}</p>

          <div className="border-t border-white/5 pt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-kmf-text-tertiary">Profit Factor</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-kmf-profit">{stats.profitFactor.toFixed(2)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  stats.pfQuality === 'Excellent' ? 'bg-kmf-profit/15 text-kmf-profit' :
                  stats.pfQuality === 'Good' ? 'bg-yellow-500/15 text-yellow-400' :
                  'bg-kmf-loss/15 text-kmf-loss'
                }`}>{stats.pfQuality}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-kmf-text-tertiary">Avg R-Multiple</span>
              <span className={`text-sm font-bold ${stats.avgRMultiple >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {stats.avgRMultiple >= 0 ? '+' : ''}{stats.avgRMultiple.toFixed(2)}R
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expectancy + Discipline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stat-card stat-card-accent p-5 hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">EXPECTANCY</p>
          <p className={`text-3xl font-black ${stats.expectancy >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            <AnimatedNumber value={stats.expectancy} prefix="" decimals={0} />
            <span className="text-lg font-medium text-kmf-text-tertiary ml-1">USD</span>
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1">per trade</p>
          <div className="border-t border-white/5 mt-3 pt-3 space-y-1">
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Win</span><span className="text-xs font-bold text-kmf-profit">+{stats.avgWin.toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Loss</span><span className="text-xs font-bold text-kmf-loss">-{stats.avgLoss.toFixed(0)}</span></div>
          </div>
        </div>

        <div className="stat-card p-5 text-center hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">DISCIPLINE</p>
          {/* Discipline visual ring */}
          <div className="relative w-24 h-24 mx-auto mb-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(26,29,36,0.8)" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none"
                stroke={stats.disciplinePercent >= 70 ? '#00E676' : '#FF5252'}
                strokeWidth="6" strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={(1 - stats.disciplinePercent / 100) * 2 * Math.PI * 42}
                strokeLinecap="round" className="ring-animate"
                style={{ '--ring-circumference': 2 * Math.PI * 42, '--ring-offset': (1 - stats.disciplinePercent / 100) * 2 * Math.PI * 42 }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-black ${stats.disciplinePercent >= 70 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {stats.disciplinePercent.toFixed(0)}%
              </span>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
            stats.disciplinePercent >= 80 ? 'bg-kmf-profit/15 text-kmf-profit' : stats.disciplinePercent >= 60 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-kmf-loss/15 text-kmf-loss'
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
            <AnimatedNumber value={stats.bestTrade} prefix="$" decimals={0} />
          </p>
        </div>
        <div className="stat-card stat-card-loss p-4 hover-tilt">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">WORST</p>
            <FaChartBar className="text-kmf-loss text-xs" />
          </div>
          <p className="text-xl font-black text-kmf-loss">
            <AnimatedNumber value={Math.abs(stats.worstTrade)} prefix="$" decimals={0} />
          </p>
        </div>
        <div className="stat-card p-4 hover-tilt" style={{ borderLeft: '3px solid rgba(251,146,60,0.5)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">STREAK</p>
            <FaFire className="text-orange-400 text-xs" />
          </div>
          <p className="text-xl font-black text-orange-400">{stats.tradingStreak}d</p>
        </div>
      </div>

      {/* Monthly P&L */}
      {stats.monthlyPL.some(m => m.pl !== 0) && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">MONTHLY P&amp;L</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stats.monthlyPL} barSize={28}>
              <XAxis dataKey="month" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={50} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<MonthlyTooltip />} />
              <Bar dataKey="pl" radius={[6, 6, 0, 0]}>
                {stats.monthlyPL.map((entry, i) => (
                  <Cell key={i} fill={entry.pl >= 0 ? '#00E676' : '#FF5252'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top Pairs */}
      {stats.topPairs.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">TOP PAIRS</p>
          <div className="space-y-3">
            {stats.topPairs.map((pair, i) => {
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
