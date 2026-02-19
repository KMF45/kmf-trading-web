import { useTrades } from '../contexts/TradesContext';
import { FaChartLine, FaRocket, FaChartBar, FaFire, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calculateRMultiple } from '../utils/models';

const MonthlyTooltip = ({ active, payload, label }) => {
  if (active && payload?.[0]) {
    const val = payload[0].value;
    return (
      <div className="bg-kmf-panel border border-kmf-accent/30 rounded-lg px-3 py-2 shadow-glow">
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

  // Fix 1.4: R-Multiple Distribution using calculateRMultiple() — bucket names match Android
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

  // Discipline label
  const disciplineLabel = stats.disciplinePercent >= 80 ? 'CONSISTENT' : stats.disciplinePercent >= 60 ? 'MODERATE' : 'NEEDS WORK';

  // Win rate circle
  const wr = stats.winRate;
  const circumference = 2 * Math.PI * 55;
  const strokeDash = (wr / 100) * circumference;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      return (
        <div className="bg-kmf-panel border border-kmf-accent/30 rounded-lg px-3 py-2">
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
        <div className="bg-kmf-panel rounded-xl p-12 border border-kmf-accent/10 text-center">
          <FaChartLine className="text-kmf-accent text-3xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-kmf-text-primary mb-1">No closed trades yet</h2>
          <p className="text-kmf-text-tertiary text-sm">Statistics will appear after you close your first trade</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Statistics</h1>
          <p className="text-sm text-kmf-text-tertiary">Performance Overview</p>
        </div>
        {/* Trading Level Badge */}
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${stats.traderBadge.bg} ${stats.traderBadge.color}`}>
            {stats.traderBadge.badge}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-kmf-accent/15 text-kmf-accent">
            {stats.tradingLevel.label}
          </span>
        </div>
      </div>

      {/* Insights/Alerts */}
      {stats.insights.length > 0 && (
        <div className="space-y-2">
          {stats.insights.map((insight, i) => (
            <div key={i} className={`rounded-xl p-3 border flex items-start gap-3 ${
              insight.type === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30' :
              insight.type === 'WARNING' ? 'bg-yellow-500/10 border-yellow-500/30' :
              insight.type === 'SUCCESS' ? 'bg-green-500/10 border-green-500/30' :
              'bg-blue-500/10 border-blue-500/30'
            }`}>
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
      <div className="grid grid-cols-2 gap-4">
        {/* Win Rate Circle */}
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10 flex flex-col items-center">
          <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-3">WIN RATE</p>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="55" fill="none" stroke="#1A1D24" strokeWidth="8" />
              <circle cx="60" cy="60" r="55" fill="none" stroke="#00E676" strokeWidth="8"
                strokeDasharray={circumference} strokeDashoffset={circumference - strokeDash} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-kmf-profit">{wr.toFixed(0)}%</span>
              <span className="text-xs text-kmf-text-tertiary">win rate</span>
            </div>
          </div>
          <p className="text-sm text-kmf-text-tertiary mt-2">{stats.closedTrades} Trades</p>
        </div>

        {/* Total P/L */}
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-2">TOTAL P/L</p>
          <p className={`text-3xl font-bold ${stats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            USD {stats.totalPL.toFixed(0)}
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1">{stats.totalPL >= 0 ? 'profit' : 'loss'}</p>
          <div className="border-t border-kmf-accent/10 mt-3 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-kmf-text-tertiary">Profit Factor</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-kmf-profit">{stats.profitFactor.toFixed(2)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  stats.pfQuality === 'Excellent' ? 'bg-kmf-profit/15 text-kmf-profit' :
                  stats.pfQuality === 'Good' ? 'bg-yellow-500/15 text-yellow-400' :
                  'bg-kmf-loss/15 text-kmf-loss'
                }`}>{stats.pfQuality}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expectancy + Discipline */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-2">EXPECTANCY</p>
          <p className={`text-3xl font-bold ${stats.expectancy >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            USD {stats.expectancy.toFixed(0)}
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1">per trade</p>
          <div className="border-t border-kmf-accent/10 mt-3 pt-3 space-y-1">
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Win</span><span className="text-xs font-bold text-kmf-profit">+{stats.avgWin.toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Loss</span><span className="text-xs font-bold text-kmf-loss">-{stats.avgLoss.toFixed(0)}</span></div>
          </div>
        </div>

        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10 text-center">
          <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-2">DISCIPLINE</p>
          <p className={`text-3xl font-bold ${stats.disciplinePercent >= 70 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            {stats.disciplinePercent.toFixed(0)}%
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1">plan adherence</p>
          <div className="mt-3">
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              stats.disciplinePercent >= 80 ? 'bg-kmf-profit/15 text-kmf-profit' : stats.disciplinePercent >= 60 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-kmf-loss/15 text-kmf-loss'
            }`}>{disciplineLabel}</span>
          </div>
        </div>
      </div>

      {/* R-Multiple Distribution */}
      {rMultipleData.length > 0 && (
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-4">R-MULTIPLE DISTRIBUTION</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={rMultipleData} layout="vertical">
              <XAxis type="number" stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {rMultipleData.map((entry, i) => (
                  <Cell key={i} fill={entry.name.includes('-') || entry.name.includes('<') ? '#FF5252' : '#4FC3F7'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Best / Worst Trade + Streak */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider">BEST</p>
            <FaRocket className="text-kmf-profit text-sm" />
          </div>
          <p className="text-xl font-bold text-kmf-profit">${stats.bestTrade.toFixed(0)}</p>
        </div>
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider">WORST</p>
            <FaChartBar className="text-kmf-loss text-sm" />
          </div>
          <p className="text-xl font-bold text-kmf-loss">${stats.worstTrade.toFixed(0)}</p>
        </div>
        <div className="bg-kmf-panel rounded-xl p-5 border border-orange-500/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider">STREAK</p>
            <FaFire className="text-orange-400 text-sm" />
          </div>
          <p className="text-xl font-bold text-orange-400">{stats.tradingStreak}d</p>
        </div>
      </div>

      {/* Monthly P&L */}
      {stats.monthlyPL.some(m => m.pl !== 0) && (
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-4">MONTHLY P&amp;L</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={stats.monthlyPL} barSize={24}>
              <XAxis dataKey="month" stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} width={50} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<MonthlyTooltip />} />
              <Bar dataKey="pl" radius={[4, 4, 0, 0]}>
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
        <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
          <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider mb-4">TOP PAIRS</p>
          <div className="space-y-3">
            {stats.topPairs.map((pair, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-kmf-text-primary">{pair.instrument}</p>
                  <p className="text-xs text-kmf-text-tertiary">{pair.trades} trades • {pair.trades > 0 ? ((pair.wins / pair.trades) * 100).toFixed(0) : 0}% WR</p>
                </div>
                <p className={`text-sm font-bold ${pair.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                  {pair.pl >= 0 ? '+' : ''}{pair.pl.toFixed(0)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
