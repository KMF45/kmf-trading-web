import { useMemo } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { FaChartLine, FaTrophy, FaPercent, FaStar, FaBalanceScale } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts';

const MetricCard = ({ label, value, subtext, color, icon: Icon }) => (
  <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
    <div className="flex items-center gap-2 mb-2">
      {Icon && <Icon className="text-kmf-accent text-sm" />}
      <p className="text-xs font-medium text-kmf-text-tertiary uppercase tracking-wider">{label}</p>
    </div>
    <p className={`text-2xl font-bold ${color || 'text-kmf-text-primary'}`}>{value}</p>
    {subtext && <p className="text-xs text-kmf-text-tertiary mt-1">{subtext}</p>}
  </div>
);

const COLORS = ['#00E676', '#FF5252', '#78909C', '#FFD740'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-kmf-panel border border-kmf-accent/30 rounded-lg px-3 py-2 shadow-glow text-sm">
        <p className="text-kmf-text-tertiary text-xs">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || p.fill }} className="font-medium">{p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const StatisticsPage = () => {
  const { stats, closedTrades, settings } = useTrades();
  const currencySymbol = settings.currency === 'EUR' ? '€' : settings.currency === 'GBP' ? '£' : '$';

  // Win/Loss distribution pie
  const winLossData = useMemo(() => {
    if (closedTrades.length === 0) return [];
    return [
      { name: 'Wins', value: stats.wins, color: '#00E676' },
      { name: 'Losses', value: stats.losses, color: '#FF5252' },
      { name: 'Breakeven', value: stats.breakeven, color: '#78909C' },
    ].filter(d => d.value > 0);
  }, [stats, closedTrades]);

  // Strategy breakdown
  const strategyData = useMemo(() => {
    const map = {};
    closedTrades.forEach(t => {
      const s = t.strategy || 'Unknown';
      if (!map[s]) map[s] = { strategy: s, trades: 0, pl: 0, wins: 0 };
      map[s].trades++;
      map[s].pl += (t.profitLoss || 0);
      if ((t.profitLoss || 0) > 0) map[s].wins++;
    });
    return Object.values(map).sort((a, b) => b.trades - a.trades);
  }, [closedTrades]);

  // Monthly P&L
  const monthlyData = useMemo(() => {
    const map = {};
    closedTrades.forEach(t => {
      const d = new Date(t.closeDate || t.openDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en', { month: 'short', year: '2-digit' });
      if (!map[key]) map[key] = { month: label, pl: 0, trades: 0, sortKey: key };
      map[key].pl += (t.profitLoss || 0);
      map[key].trades++;
    });
    return Object.values(map).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }, [closedTrades]);

  // R-Multiple distribution
  const rMultipleData = useMemo(() => {
    const withR = closedTrades.filter(t => t.rMultiple != null);
    if (withR.length === 0) return [];
    const buckets = { '<-2R': 0, '-2R to -1R': 0, '-1R to 0': 0, '0 to 1R': 0, '1R to 2R': 0, '>2R': 0 };
    withR.forEach(t => {
      const r = t.rMultiple;
      if (r < -2) buckets['<-2R']++;
      else if (r < -1) buckets['-2R to -1R']++;
      else if (r < 0) buckets['-1R to 0']++;
      else if (r < 1) buckets['0 to 1R']++;
      else if (r < 2) buckets['1R to 2R']++;
      else buckets['>2R']++;
    });
    return Object.entries(buckets).map(([range, count]) => ({ range, count })).filter(d => d.count > 0);
  }, [closedTrades]);

  // Discipline average per week
  const disciplineData = useMemo(() => {
    const withD = closedTrades.filter(t => t.discipline > 0);
    if (withD.length < 3) return [];
    const sorted = [...withD].sort((a, b) => new Date(a.openDate) - new Date(b.openDate));
    const result = [];
    for (let i = 0; i < sorted.length; i += 5) {
      const chunk = sorted.slice(i, i + 5);
      const avg = chunk.reduce((s, t) => s + t.discipline, 0) / chunk.length;
      result.push({ group: `#${i + 1}-${i + chunk.length}`, avg: parseFloat(avg.toFixed(1)) });
    }
    return result;
  }, [closedTrades]);

  if (closedTrades.length === 0) {
    return (
      <div className="max-w-7xl mx-auto animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
            <FaChartLine className="text-kmf-accent text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-kmf-text-primary">Statistics</h1>
            <p className="text-sm text-kmf-text-tertiary">Detailed analytics and performance metrics</p>
          </div>
        </div>
        <div className="bg-kmf-panel rounded-xl p-12 border border-kmf-accent/10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-kmf-accent/10 flex items-center justify-center mb-4">
            <FaChartLine className="text-kmf-accent text-2xl" />
          </div>
          <h2 className="text-lg font-semibold text-kmf-text-primary mb-2">No data yet</h2>
          <p className="text-kmf-text-tertiary text-sm">Close some trades to see your statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaChartLine className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Statistics</h1>
          <p className="text-sm text-kmf-text-tertiary">Based on {stats.closedTrades} closed trades</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard label="Win Rate" value={`${stats.winRate.toFixed(1)}%`} color={stats.winRate >= 50 ? 'text-kmf-profit' : 'text-kmf-loss'} icon={FaPercent} />
        <MetricCard label="Profit Factor" value={stats.profitFactor.toFixed(2)} color={stats.profitFactor >= 1.5 ? 'text-kmf-profit' : stats.profitFactor >= 1 ? 'text-kmf-pending' : 'text-kmf-loss'} icon={FaBalanceScale} />
        <MetricCard label="Expectancy" value={`${currencySymbol}${stats.expectancy.toFixed(2)}`} color={stats.expectancy > 0 ? 'text-kmf-profit' : 'text-kmf-loss'} icon={FaTrophy} />
        <MetricCard label="Avg R-Multiple" value={stats.avgRMultiple.toFixed(2)} subtext="R" icon={FaChartLine} />
        <MetricCard label="Best Trade" value={`${currencySymbol}${stats.bestTrade.toFixed(2)}`} color="text-kmf-profit" />
        <MetricCard label="Worst Trade" value={`${currencySymbol}${stats.worstTrade.toFixed(2)}`} color="text-kmf-loss" />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Total P&L" value={`${currencySymbol}${stats.totalPL.toFixed(2)}`} color={stats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'} />
        <MetricCard label="Avg Win" value={`${currencySymbol}${stats.avgWin.toFixed(2)}`} color="text-kmf-profit" />
        <MetricCard label="Avg Loss" value={`${currencySymbol}${stats.avgLoss.toFixed(2)}`} color="text-kmf-loss" />
        <MetricCard label="Avg Discipline" value={stats.avgDiscipline.toFixed(1)} subtext="out of 5" icon={FaStar} />
      </div>

      {/* Charts Row 1: Win/Loss Pie + Monthly P&L */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
          <h3 className="text-base font-semibold text-kmf-text-primary mb-4">Win / Loss Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={winLossData} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                {winLossData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
          <h3 className="text-base font-semibold text-kmf-text-primary mb-4">Monthly P&L</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#90A4AE" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#90A4AE" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pl" name="P&L" radius={[4, 4, 0, 0]}>
                  {monthlyData.map((entry, i) => (
                    <Cell key={i} fill={entry.pl >= 0 ? '#00E676' : '#FF5252'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-kmf-text-tertiary text-sm">Not enough data</div>
          )}
        </div>
      </div>

      {/* Charts Row 2: R-Multiple + Discipline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rMultipleData.length > 0 && (
          <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
            <h3 className="text-base font-semibold text-kmf-text-primary mb-4">R-Multiple Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={rMultipleData}>
                <XAxis dataKey="range" stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#90A4AE" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Trades" fill="#4FC3F7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {disciplineData.length > 0 && (
          <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
            <h3 className="text-base font-semibold text-kmf-text-primary mb-4">Discipline Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={disciplineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#263238" />
                <XAxis dataKey="group" stroke="#90A4AE" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 5]} stroke="#90A4AE" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="avg" name="Discipline" stroke="#FFD740" strokeWidth={2} dot={{ fill: '#FFD740', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Strategy Breakdown Table */}
      {strategyData.length > 0 && (
        <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
          <h3 className="text-base font-semibold text-kmf-text-primary mb-4">Strategy Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-kmf-accent/10">
                  <th className="text-left py-2 px-3 text-kmf-text-tertiary font-medium">Strategy</th>
                  <th className="text-center py-2 px-3 text-kmf-text-tertiary font-medium">Trades</th>
                  <th className="text-center py-2 px-3 text-kmf-text-tertiary font-medium">Win Rate</th>
                  <th className="text-right py-2 px-3 text-kmf-text-tertiary font-medium">P&L</th>
                </tr>
              </thead>
              <tbody>
                {strategyData.map((s) => (
                  <tr key={s.strategy} className="border-b border-kmf-accent/5 hover:bg-kmf-surface/30 transition-colors">
                    <td className="py-2.5 px-3 text-kmf-text-primary font-medium">{s.strategy}</td>
                    <td className="py-2.5 px-3 text-center text-kmf-text-secondary">{s.trades}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={s.wins / s.trades >= 0.5 ? 'text-kmf-profit' : 'text-kmf-loss'}>
                        {((s.wins / s.trades) * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className={`py-2.5 px-3 text-right font-medium ${s.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                      {s.pl >= 0 ? '+' : ''}{currencySymbol}{s.pl.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
