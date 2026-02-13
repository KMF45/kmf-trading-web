import { useState, useEffect, useMemo } from 'react';
import { useTrades } from '../contexts/TradesContext';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaPlus, FaCheck, FaTimes, FaTrash, FaSync } from 'react-icons/fa';

const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const getWeekRange = (weekNum, year) => {
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  const firstMonday = new Date(jan4);
  firstMonday.setDate(jan4.getDate() - dayOfWeek + 1);
  const start = new Date(firstMonday);
  start.setDate(firstMonday.getDate() + (weekNum - 1) * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};

const formatDate = (d) => `${d.getDate()} ${d.toLocaleDateString('en', { month: 'short' })}., ${d.getFullYear()}`;

const WeeklyReviewPage = () => {
  const { trades, closedTrades, weeklyReviews, weeklyGoals, saveWeeklyReview, addWeeklyGoal, updateGoal, removeGoal, syncing, getPnL, loadData } = useTrades();

  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const currentYear = now.getFullYear();

  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [newGoalText, setNewGoalText] = useState('');

  // Self-evaluation state
  const existingReview = weeklyReviews.find(r => r.weekNumber === selectedWeek && r.year === selectedYear);
  const [evaluation, setEvaluation] = useState({
    disciplineScore: 5, planScore: 5, emotionScore: 5, motivationScore: 5, satisfactionScore: 5,
    noteGood: '', noteBad: '', noteLearning: '',
  });

  useEffect(() => {
    if (existingReview) {
      setEvaluation({
        disciplineScore: existingReview.disciplineScore || 5,
        planScore: existingReview.planScore || 5,
        emotionScore: existingReview.emotionScore || 5,
        motivationScore: existingReview.motivationScore || 5,
        satisfactionScore: existingReview.satisfactionScore || 5,
        noteGood: existingReview.noteGood || '',
        noteBad: existingReview.noteBad || '',
        noteLearning: existingReview.noteLearning || '',
      });
    } else {
      setEvaluation({ disciplineScore: 5, planScore: 5, emotionScore: 5, motivationScore: 5, satisfactionScore: 5, noteGood: '', noteBad: '', noteLearning: '' });
    }
  }, [selectedWeek, selectedYear, existingReview]);

  const { start, end } = getWeekRange(selectedWeek, selectedYear);
  const isCurrentWeek = selectedWeek === currentWeek && selectedYear === currentYear;
  const isFuture = selectedYear > currentYear || (selectedYear === currentYear && selectedWeek > currentWeek);

  // Weekly trades
  const weekTrades = useMemo(() => {
    const s = start.getTime();
    const e = end.getTime() + 86400000;
    return trades.filter(t => {
      const ts = t.tradeDateTime || t.timestamp;
      return ts >= s && ts < e;
    });
  }, [trades, start, end]);

  const weekClosed = weekTrades.filter(t => t.result === 'PROFIT' || t.result === 'LOSS');
  const weekWins = weekTrades.filter(t => t.result === 'PROFIT');
  const weekLosses = weekTrades.filter(t => t.result === 'LOSS');
  const weekPL = weekClosed.reduce((s, t) => s + getPnL(t), 0);
  const weekWinRate = weekClosed.length > 0 ? ((weekWins.length / weekClosed.length) * 100).toFixed(0) : '0';
  const weekAvgWin = weekWins.length > 0 ? weekWins.reduce((s, t) => s + getPnL(t), 0) / weekWins.length : 0;
  const weekAvgLoss = weekLosses.length > 0 ? Math.abs(weekLosses.reduce((s, t) => s + getPnL(t), 0) / weekLosses.length) : 0;
  const weekTotalProfit = weekWins.reduce((s, t) => s + getPnL(t), 0);
  const weekTotalLoss = Math.abs(weekLosses.reduce((s, t) => s + getPnL(t), 0));
  const bestInstrument = (() => {
    const map = {};
    weekClosed.forEach(t => {
      const inst = t.instrument || 'Unknown';
      map[inst] = (map[inst] || 0) + getPnL(t);
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || '--';
  })();
  const weekBest = weekClosed.length > 0 ? Math.max(...weekClosed.map(t => getPnL(t))) : 0;
  const weekWorst = weekClosed.length > 0 ? Math.min(...weekClosed.map(t => getPnL(t))) : 0;

  // Goals for next week
  const nextWeek = selectedWeek >= 52 ? 1 : selectedWeek + 1;
  const nextYear = selectedWeek >= 52 ? selectedYear + 1 : selectedYear;
  const goalsForNextWeek = weeklyGoals.filter(g => g.weekNumber === nextWeek && g.year === nextYear);

  const navigate = (dir) => {
    if (dir === 'prev') {
      if (selectedWeek <= 1) { setSelectedWeek(52); setSelectedYear(selectedYear - 1); }
      else setSelectedWeek(selectedWeek - 1);
    } else {
      if (isFuture) return;
      if (selectedWeek >= 52) { setSelectedWeek(1); setSelectedYear(selectedYear + 1); }
      else setSelectedWeek(selectedWeek + 1);
    }
  };

  const handleSaveReview = async () => {
    const overallScore = ((evaluation.disciplineScore + evaluation.planScore + evaluation.emotionScore + evaluation.motivationScore + evaluation.satisfactionScore) / 5);
    await saveWeeklyReview({
      weekNumber: selectedWeek,
      year: selectedYear,
      ...evaluation,
      overallScore,
      createdAt: existingReview?.createdAt || Date.now(),
    });
  };

  const handleAddGoal = async () => {
    if (!newGoalText.trim()) return;
    await addWeeklyGoal({
      weekNumber: nextWeek,
      year: nextYear,
      goalText: newGoalText.trim(),
      status: 'PENDING',
      carryOverCount: 0,
      createdAt: Date.now(),
    });
    setNewGoalText('');
  };

  const sliders = [
    { key: 'disciplineScore', label: 'How disciplined were you?' },
    { key: 'planScore', label: 'How well did you follow your plan?' },
    { key: 'emotionScore', label: 'How well did you control emotions?' },
    { key: 'motivationScore', label: 'How motivated did you feel?' },
    { key: 'satisfactionScore', label: 'How satisfied are you with results?' },
  ];

  const inputClass = "w-full bg-kmf-surface border border-kmf-accent/20 rounded-lg px-4 py-2.5 text-kmf-text-primary text-sm placeholder:text-kmf-text-tertiary/50 focus:outline-none focus:border-kmf-accent transition-all";

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-kmf-text-primary">Weekly Review</h1>
        <button onClick={loadData} disabled={syncing} className="p-2 rounded-lg text-kmf-text-tertiary hover:text-kmf-accent hover:bg-kmf-accent/10 transition-all disabled:opacity-50">
          <FaSync className={syncing ? 'animate-spin' : ''} size={14} />
        </button>
      </div>

      {/* Week Navigator */}
      <div className="bg-kmf-panel rounded-xl p-4 border border-kmf-accent/10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('prev')} className="p-2 rounded-lg text-kmf-accent hover:bg-kmf-accent/10 transition-all"><FaChevronLeft /></button>
          <div className="text-center">
            <p className="text-lg font-bold text-kmf-text-primary">Week {selectedWeek}</p>
            <p className="text-xs text-kmf-text-tertiary">{formatDate(start)} – {formatDate(end)}</p>
          </div>
          <button onClick={() => navigate('next')} disabled={isFuture} className="p-2 rounded-lg text-kmf-accent hover:bg-kmf-accent/10 transition-all disabled:opacity-30"><FaChevronRight /></button>
        </div>
        {isCurrentWeek && (
          <p className="text-center mt-2"><span className="text-xs text-kmf-accent">📅 Current Week</span></p>
        )}
      </div>

      {/* Weekly Statistics */}
      <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
        <h2 className="text-sm font-bold text-kmf-text-primary mb-4">📊 Weekly Statistics</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Trades', value: weekTrades.length, color: '' },
            { label: 'Win Rate', value: `${weekWinRate}%`, color: '' },
            { label: 'Wins', value: weekWins.length, color: 'text-kmf-profit' },
            { label: 'Losses', value: weekLosses.length, color: 'text-kmf-loss' },
            { label: 'Total Profit', value: `+${weekTotalProfit.toFixed(2)} USD`, color: 'text-kmf-profit' },
            { label: 'Total Loss', value: `${weekTotalLoss.toFixed(2)} USD`, color: 'text-kmf-loss' },
            { label: 'Total P/L', value: `${weekPL >= 0 ? '+' : ''}${weekPL.toFixed(2)} USD`, color: weekPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss' },
            { label: 'Most Profitable', value: bestInstrument, color: '' },
            { label: 'Avg Win', value: `${weekAvgWin.toFixed(2)} USD`, color: 'text-kmf-profit' },
            { label: 'Avg Loss', value: `${weekAvgLoss.toFixed(2)} USD`, color: 'text-kmf-loss' },
            { label: 'Best Trade', value: `+${weekBest.toFixed(2)} USD`, color: 'text-kmf-profit' },
            { label: 'Worst Trade', value: `${weekWorst.toFixed(2)} USD`, color: 'text-kmf-loss' },
          ].map((s, i) => (
            <div key={i} className="bg-kmf-surface/50 rounded-lg p-3 border border-kmf-accent/5">
              <p className="text-xs text-kmf-text-tertiary">{s.label}</p>
              <p className={`text-sm font-bold ${s.color || 'text-kmf-text-primary'}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Evaluation */}
      <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
        <h2 className="text-sm font-bold text-kmf-text-primary mb-4">🧠 Self-Evaluation</h2>
        <div className="space-y-4">
          {sliders.map(({ key, label }) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-kmf-text-secondary">{label}</span>
                <span className="text-xs font-bold text-kmf-accent">{evaluation[key]}/10</span>
              </div>
              <input type="range" min="1" max="10" value={evaluation[key]}
                onChange={(e) => setEvaluation(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                className="w-full accent-kmf-accent h-2 rounded-lg appearance-none bg-kmf-surface cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      {/* Reflection Notes */}
      <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
        <h2 className="text-sm font-bold text-kmf-text-primary mb-4">💭 Reflection Notes</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-kmf-text-secondary mb-1 block">What did I do well?</label>
            <textarea className={`${inputClass} min-h-[60px] resize-y`} placeholder="Write what went well this week..."
              value={evaluation.noteGood} onChange={(e) => setEvaluation(p => ({ ...p, noteGood: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-kmf-text-secondary mb-1 block">What can I improve?</label>
            <textarea className={`${inputClass} min-h-[60px] resize-y`} placeholder="Write what you need to improve..."
              value={evaluation.noteBad} onChange={(e) => setEvaluation(p => ({ ...p, noteBad: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs text-kmf-text-secondary mb-1 block">What did I learn?</label>
            <textarea className={`${inputClass} min-h-[60px] resize-y`} placeholder="Write what you learned this week..."
              value={evaluation.noteLearning} onChange={(e) => setEvaluation(p => ({ ...p, noteLearning: e.target.value }))} />
          </div>
        </div>
      </div>

      {/* Save Review */}
      <button onClick={handleSaveReview} disabled={syncing}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-kmf-accent to-kmf-accent-bright text-white font-bold text-sm hover:shadow-glow transition-all disabled:opacity-50">
        {syncing ? 'Saving...' : existingReview ? 'Update Review' : 'Save Review'}
      </button>

      {/* Goals for Next Week */}
      <div className="bg-kmf-panel rounded-xl p-5 border border-kmf-accent/10">
        <h2 className="text-sm font-bold text-kmf-text-primary mb-4">🚀 Goals for Next Week (Week {nextWeek})</h2>
        <div className="flex gap-2 mb-4">
          <input type="text" className={`${inputClass} flex-1`} placeholder="Add a new goal..."
            value={newGoalText} onChange={(e) => setNewGoalText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()} />
          <button onClick={handleAddGoal} disabled={!newGoalText.trim() || syncing}
            className="w-10 h-10 rounded-lg bg-kmf-accent text-white flex items-center justify-center hover:bg-kmf-accent-bright transition-all disabled:opacity-50">
            <FaPlus size={14} />
          </button>
        </div>
        {goalsForNextWeek.length > 0 ? (
          <div className="space-y-2">
            {goalsForNextWeek.map((goal) => (
              <div key={goal.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                goal.status === 'COMPLETED' ? 'bg-kmf-profit/5 border-kmf-profit/20' : goal.status === 'CANCELLED' ? 'bg-kmf-loss/5 border-kmf-loss/20 opacity-50' : 'bg-kmf-surface/50 border-kmf-accent/10'
              }`}>
                <button onClick={() => updateGoal(goal.id, { status: goal.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' })}
                  className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center transition-all ${
                    goal.status === 'COMPLETED' ? 'bg-kmf-profit text-white' : 'border border-kmf-text-tertiary/30 hover:border-kmf-accent'
                  }`}>
                  {goal.status === 'COMPLETED' && <FaCheck size={10} />}
                </button>
                <span className={`flex-1 text-sm ${goal.status === 'COMPLETED' ? 'line-through text-kmf-text-tertiary' : 'text-kmf-text-primary'}`}>{goal.goalText}</span>
                <button onClick={() => removeGoal(goal.id)} className="p-1.5 rounded text-kmf-text-tertiary hover:text-kmf-loss transition-all"><FaTrash size={11} /></button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-kmf-text-tertiary text-center py-2">No goals for next week yet</p>
        )}
      </div>
    </div>
  );
};

export default WeeklyReviewPage;
