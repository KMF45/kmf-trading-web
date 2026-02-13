import { useState, useMemo } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { FaClipboardCheck, FaChevronLeft, FaChevronRight, FaStar, FaTrophy } from 'react-icons/fa';

const getWeekRange = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
};

const formatDate = (d) => d.toLocaleDateString('en', { day: 'numeric', month: 'short' });

const WeeklyReviewPage = () => {
  const { closedTrades, settings } = useTrades();
  const [weekOffset, setWeekOffset] = useState(0);

  const currencySymbol = settings.currency === 'EUR' ? '€' : settings.currency === 'GBP' ? '£' : '$';

  const currentWeek = useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() - weekOffset * 7);
    return getWeekRange(now);
  }, [weekOffset]);

  const weekTrades = useMemo(() => {
    return closedTrades.filter(t => {
      const d = new Date(t.closeDate || t.openDate);
      return d >= currentWeek.start && d <= currentWeek.end;
    });
  }, [closedTrades, currentWeek]);

  const weekStats = useMemo(() => {
    if (weekTrades.length === 0) return null;
    const wins = weekTrades.filter(t => (t.profitLoss || 0) > 0);
    const losses = weekTrades.filter(t => (t.profitLoss || 0) < 0);
    const totalPL = weekTrades.reduce((s, t) => s + (t.profitLoss || 0), 0);
    const avgDiscipline = weekTrades.reduce((s, t) => s + (t.discipline || 0), 0) / weekTrades.length;
    return {
      total: weekTrades.length,
      wins: wins.length,
      losses: losses.length,
      winRate: (wins.length / weekTrades.length * 100).toFixed(1),
      totalPL: totalPL.toFixed(2),
      avgDiscipline: avgDiscipline.toFixed(1),
      bestTrade: Math.max(...weekTrades.map(t => t.profitLoss || 0)).toFixed(2),
      worstTrade: Math.min(...weekTrades.map(t => t.profitLoss || 0)).toFixed(2),
    };
  }, [weekTrades]);

  const isCurrentWeek = weekOffset === 0;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-kmf-accent/15 flex items-center justify-center">
          <FaClipboardCheck className="text-kmf-accent text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Weekly Review</h1>
          <p className="text-sm text-kmf-text-tertiary">Self-evaluation and performance tracking</p>
        </div>
      </div>

      {/* Week Navigator */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 mb-6 flex items-center justify-between">
        <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all">
          <FaChevronLeft />
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold text-kmf-text-primary">
            {formatDate(currentWeek.start)} - {formatDate(currentWeek.end)}
          </p>
          <p className="text-xs text-kmf-text-tertiary">
            {isCurrentWeek ? 'This Week' : `${weekOffset} week${weekOffset > 1 ? 's' : ''} ago`}
          </p>
        </div>
        <button
          onClick={() => setWeekOffset(w => Math.max(0, w - 1))}
          disabled={isCurrentWeek}
          className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FaChevronRight />
        </button>
      </div>

      {weekStats ? (
        <div className="space-y-6">
          {/* Week Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 text-center">
              <p className="text-xs text-kmf-text-tertiary uppercase mb-1">Trades</p>
              <p className="text-2xl font-bold text-kmf-text-primary">{weekStats.total}</p>
              <p className="text-xs text-kmf-text-tertiary">{weekStats.wins}W / {weekStats.losses}L</p>
            </div>
            <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 text-center">
              <p className="text-xs text-kmf-text-tertiary uppercase mb-1">Win Rate</p>
              <p className={`text-2xl font-bold ${parseFloat(weekStats.winRate) >= 50 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>{weekStats.winRate}%</p>
            </div>
            <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 text-center">
              <p className="text-xs text-kmf-text-tertiary uppercase mb-1">P&L</p>
              <p className={`text-2xl font-bold ${parseFloat(weekStats.totalPL) >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {currencySymbol}{weekStats.totalPL}
              </p>
            </div>
            <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10 text-center">
              <p className="text-xs text-kmf-text-tertiary uppercase mb-1">Discipline</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <p className="text-2xl font-bold text-kmf-star">{weekStats.avgDiscipline}</p>
                <FaStar className="text-kmf-star text-sm" />
              </div>
            </div>
          </div>

          {/* Trade Details */}
          <div className="bg-kmf-panel rounded-xl p-6 border border-kmf-accent/10">
            <h3 className="text-sm font-semibold text-kmf-accent uppercase tracking-wider mb-4">Week Trades</h3>
            <div className="space-y-2">
              {weekTrades.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-kmf-surface/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-8 rounded-full ${t.type === 'BUY' ? 'bg-kmf-profit' : 'bg-kmf-loss'}`}></div>
                    <div>
                      <p className="text-sm font-medium text-kmf-text-primary">{t.symbol}</p>
                      <p className="text-xs text-kmf-text-tertiary">{t.type} · {t.strategy || '--'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${(t.profitLoss || 0) >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                      {(t.profitLoss || 0) >= 0 ? '+' : ''}{currencySymbol}{(t.profitLoss || 0).toFixed(2)}
                    </p>
                    <div className="flex gap-0.5 justify-end">
                      {[1,2,3,4,5].map(s => (
                        <FaStar key={s} size={7} className={s <= (t.discipline || 0) ? 'text-kmf-star' : 'text-kmf-text-tertiary/20'} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best / Worst */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-profit/20">
              <p className="text-xs text-kmf-text-tertiary uppercase mb-1">Best Trade</p>
              <p className="text-xl font-bold text-kmf-profit">+{currencySymbol}{weekStats.bestTrade}</p>
            </div>
            <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-loss/20">
              <p className="text-xs text-kmf-text-tertiary uppercase mb-1">Worst Trade</p>
              <p className="text-xl font-bold text-kmf-loss">{currencySymbol}{weekStats.worstTrade}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-kmf-panel rounded-xl p-12 border border-kmf-accent/10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-kmf-accent/10 flex items-center justify-center mb-4">
            <FaClipboardCheck className="text-kmf-accent text-2xl" />
          </div>
          <h2 className="text-lg font-semibold text-kmf-text-primary mb-2">No trades this week</h2>
          <p className="text-kmf-text-tertiary text-sm">Navigate to a week with closed trades or add new trades</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyReviewPage;
