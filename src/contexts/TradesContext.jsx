import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getTrades, addTrade as addTradeService, updateTrade as updateTradeService,
  deleteTrade as deleteTradeService, getUserSettings, updateUserSettings,
  getWeeklyReviews, saveWeeklyReview as saveWeeklyReviewService,
  getWeeklyGoals, saveWeeklyGoal as saveWeeklyGoalService,
  updateWeeklyGoal as updateWeeklyGoalService, deleteWeeklyGoal as deleteWeeklyGoalService,
  getChecklists, saveChecklist as saveChecklistService,
  updateChecklist as updateChecklistService, deleteChecklist as deleteChecklistService,
} from '../services/firestore';
import { calculateRMultiple } from '../utils/models';

const TradesContext = createContext(null);

export const useTrades = () => {
  const context = useContext(TradesContext);
  if (!context) throw new Error('useTrades must be used within TradesProvider');
  return context;
};

export const TradesProvider = ({ children }) => {
  const { user } = useAuth();
  const [trades, setTrades] = useState([]);
  const [settings, setSettings] = useState({ accountBalance: 10000 });
  const [weeklyReviews, setWeeklyReviews] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadData = useCallback(async () => {
    if (!user) {
      setTrades([]);
      setChecklists([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [tradesData, settingsData, reviewsData, goalsData, checklistsData] = await Promise.all([
        getTrades(user.uid),
        getUserSettings(user.uid),
        getWeeklyReviews(user.uid),
        getWeeklyGoals(user.uid),
        getChecklists(user.uid),
      ]);
      setTrades(tradesData);
      setSettings(settingsData);
      setWeeklyReviews(reviewsData);
      setWeeklyGoals(goalsData);
      setChecklists(checklistsData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ============ TRADE OPERATIONS ============

  const addTrade = async (trade) => {
    if (!user) return;
    setSyncing(true);
    try {
      const newTrade = await addTradeService(user.uid, trade);
      setTrades(prev => [newTrade, ...prev]);
      return newTrade;
    } finally {
      setSyncing(false);
    }
  };

  const editTrade = async (tradeId, updates) => {
    if (!user) return;
    setSyncing(true);
    try {
      await updateTradeService(user.uid, tradeId, updates);
      setTrades(prev => prev.map(t => t.id === tradeId ? { ...t, ...updates } : t));
    } finally {
      setSyncing(false);
    }
  };

  const removeTrade = async (tradeId) => {
    if (!user) return;
    setSyncing(true);
    try {
      await deleteTradeService(user.uid, tradeId);
      setTrades(prev => prev.filter(t => t.id !== tradeId));
    } finally {
      setSyncing(false);
    }
  };

  // ============ SETTINGS ============

  const saveSettings = async (newSettings) => {
    if (!user) return;
    setSyncing(true);
    try {
      await updateUserSettings(user.uid, newSettings);
      setSettings(prev => ({ ...prev, ...newSettings }));
    } finally {
      setSyncing(false);
    }
  };

  // ============ WEEKLY REVIEWS ============

  const saveWeeklyReview = async (review) => {
    if (!user) return;
    setSyncing(true);
    try {
      await saveWeeklyReviewService(user.uid, review);
      setWeeklyReviews(prev => {
        const idx = prev.findIndex(r => r.weekNumber === review.weekNumber && r.year === review.year);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], ...review };
          return updated;
        }
        return [...prev, review];
      });
    } finally {
      setSyncing(false);
    }
  };

  // ============ WEEKLY GOALS ============

  const addWeeklyGoal = async (goal) => {
    if (!user) return;
    setSyncing(true);
    try {
      const docId = await saveWeeklyGoalService(user.uid, goal);
      setWeeklyGoals(prev => [...prev, { ...goal, id: docId }]);
    } finally {
      setSyncing(false);
    }
  };

  const updateGoal = async (goalId, updates) => {
    if (!user) return;
    setSyncing(true);
    try {
      await updateWeeklyGoalService(user.uid, goalId, updates);
      setWeeklyGoals(prev => prev.map(g => g.id === goalId ? { ...g, ...updates } : g));
    } finally {
      setSyncing(false);
    }
  };

  const removeGoal = async (goalId) => {
    if (!user) return;
    setSyncing(true);
    try {
      await deleteWeeklyGoalService(user.uid, goalId);
      setWeeklyGoals(prev => prev.filter(g => g.id !== goalId));
    } finally {
      setSyncing(false);
    }
  };

  // ============ CHECKLISTS ============

  const addChecklist = async (checklist) => {
    if (!user) return;
    setSyncing(true);
    try {
      const docId = await saveChecklistService(user.uid, checklist);
      const newChecklist = { ...checklist, id: docId };
      setChecklists(prev => [...prev, newChecklist]);
      return newChecklist;
    } finally {
      setSyncing(false);
    }
  };

  const editChecklist = async (checklistId, updates) => {
    if (!user) return;
    setSyncing(true);
    try {
      await updateChecklistService(user.uid, checklistId, updates);
      setChecklists(prev => prev.map(c => c.id === checklistId ? { ...c, ...updates } : c));
    } finally {
      setSyncing(false);
    }
  };

  const removeChecklist = async (checklistId) => {
    if (!user) return;
    setSyncing(true);
    try {
      await deleteChecklistService(user.uid, checklistId);
      setChecklists(prev => prev.filter(c => c.id !== checklistId));
    } finally {
      setSyncing(false);
    }
  };

  const setDefaultChecklist = async (checklistId) => {
    if (!user) return;
    setSyncing(true);
    try {
      const updates = checklists.map(c => ({
        id: c.id,
        isDefault: c.id === checklistId,
      }));
      await Promise.all(updates.map(u => updateChecklistService(user.uid, u.id, { isDefault: u.isDefault })));
      setChecklists(prev => prev.map(c => ({ ...c, isDefault: c.id === checklistId })));
    } finally {
      setSyncing(false);
    }
  };

  // ============ COMPUTED STATS (matching Android field names) ============
  // Fix 1.1: Include BREAKEVEN in closedTrades (Android: result != PENDING)
  const closedTrades = trades.filter(t => t.result !== 'PENDING');
  const openTrades = trades.filter(t => t.result === 'PENDING');
  const wins = closedTrades.filter(t => t.result === 'PROFIT');
  const losses = closedTrades.filter(t => t.result === 'LOSS');
  const breakevenTrades = closedTrades.filter(t => t.result === 'BREAKEVEN');

  const getPnL = (t) => t.actualPnL ?? t.pnlAmount ?? 0;

  const totalPL = closedTrades.reduce((sum, t) => sum + getPnL(t), 0);
  const winRate = closedTrades.length > 0 ? (wins.length / closedTrades.length) * 100 : 0;
  const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + getPnL(t), 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + getPnL(t), 0) / losses.length) : 0;
  const totalWinAmount = wins.reduce((s, t) => s + getPnL(t), 0);
  const totalLossAmount = Math.abs(losses.reduce((s, t) => s + getPnL(t), 0));
  // Fix 1.2: profitFactor when loss = 0 matches Android (return totalWins, not 0)
  const profitFactor = totalLossAmount > 0 ? totalWinAmount / totalLossAmount : totalWinAmount;
  const expectancy = closedTrades.length > 0
    ? ((winRate / 100) * avgWin) - ((1 - winRate / 100) * avgLoss)
    : 0;

  // Fix 1.3: Use calculateRMultiple() for dynamic calculation
  const avgRMultiple = closedTrades.length > 0
    ? closedTrades.reduce((s, t) => s + calculateRMultiple(t), 0) / closedTrades.length
    : 0;

  // Max Drawdown calculation
  const maxDrawdown = (() => {
    if (closedTrades.length === 0) return { percent: 0, amount: 0 };
    const sorted = [...closedTrades].sort((a, b) => (a.tradeDateTime || a.timestamp) - (b.tradeDateTime || b.timestamp));
    let balance = settings.accountBalance || 10000;
    let startBalance = balance - totalPL;
    let peak = startBalance;
    let maxDD = 0;
    let maxDDAmount = 0;
    let running = startBalance;
    sorted.forEach(t => {
      running += getPnL(t);
      if (running > peak) peak = running;
      const dd = peak > 0 ? ((peak - running) / peak) * 100 : 0;
      const ddAmt = peak - running;
      if (dd > maxDD) { maxDD = dd; maxDDAmount = ddAmt; }
    });
    return { percent: maxDD, amount: maxDDAmount };
  })();

  // Month P/L
  const monthPL = (() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return closedTrades
      .filter(t => (t.tradeDateTime || t.timestamp) >= monthStart)
      .reduce((s, t) => s + getPnL(t), 0);
  })();

  // Top pairs
  const topPairs = (() => {
    const map = {};
    closedTrades.forEach(t => {
      const inst = t.instrument || 'Unknown';
      if (!map[inst]) map[inst] = { instrument: inst, trades: 0, pl: 0, wins: 0 };
      map[inst].trades++;
      map[inst].pl += getPnL(t);
      if (t.result === 'PROFIT') map[inst].wins++;
    });
    return Object.values(map).sort((a, b) => b.pl - a.pl);
  })();

  // Discipline: keep avgDiscipline (rating-based) for display
  const avgDiscipline = closedTrades.length > 0
    ? closedTrades.reduce((s, t) => s + (t.rating || 0), 0) / closedTrades.length
    : 0;

  // Phase 2: Discipline Score — 3-component weighted formula matching Android
  const disciplinePercent = (() => {
    if (closedTrades.length === 0) return 0;
    // Component 1: Plan Adherence (50%) — trades where followedPlan === true
    const planRate = (closedTrades.filter(t => t.followedPlan === true).length / closedTrades.length) * 100;
    // Component 2: Checklist Completion (25%) — avg of (completedTasks.length / 5 * 100)
    const checklistRate = closedTrades.reduce((s, t) => {
      const completed = (t.completedTasks || []).length;
      return s + (completed / 5) * 100;
    }, 0) / closedTrades.length;
    // Component 3: Risk Discipline (25%) — losing trades with R-Multiple >= -1.2
    const losingTrades = closedTrades.filter(t => t.result === 'LOSS');
    const riskDiscipline = losingTrades.length > 0
      ? (losingTrades.filter(t => calculateRMultiple(t) >= -1.2).length / losingTrades.length) * 100
      : 100;
    return (planRate * 0.5) + (checklistRate * 0.25) + (riskDiscipline * 0.25);
  })();

  // Phase 4.1: Trading Level — based on totalTrades (matches Android)
  const tradingLevel = (() => {
    const total = closedTrades.length;
    if (total >= 100) return { level: 5, label: 'LVL 5', title: 'Master Trader' };
    if (total >= 50) return { level: 4, label: 'LVL 4', title: 'Advanced Trader' };
    if (total >= 25) return { level: 3, label: 'LVL 3', title: 'Intermediate Trader' };
    if (total >= 10) return { level: 2, label: 'LVL 2', title: 'Apprentice Trader' };
    return { level: 1, label: 'LVL 1', title: 'Beginner Trader' };
  })();

  // Phase 4.2: Trader Badge — exact Android logic
  const traderBadge = (() => {
    const planRate = closedTrades.length > 0
      ? (closedTrades.filter(t => t.followedPlan === true).length / closedTrades.length) * 100
      : 0;
    const pf = profitFactor;
    const total = closedTrades.length;

    if (planRate >= 90 && pf >= 2.0 && total >= 30) return { badge: 'ELITE', color: 'text-yellow-400', bg: 'bg-yellow-400/15' };
    if (planRate >= 80 && pf >= 1.5 && total >= 20) return { badge: 'PROFESSIONAL', color: 'text-blue-400', bg: 'bg-blue-400/15' };
    if (planRate >= 80 && pf >= 1.0) return { badge: 'CONSISTENT', color: 'text-green-400', bg: 'bg-green-400/15' };
    if (planRate >= 80 && pf < 1.0) return { badge: 'LEARNING', color: 'text-purple-400', bg: 'bg-purple-400/15' };
    if (planRate < 70 && pf >= 1.5) return { badge: 'EMOTIONAL', color: 'text-orange-400', bg: 'bg-orange-400/15' };
    if (planRate < 50 && pf < 1.0) return { badge: 'GAMBLER', color: 'text-red-400', bg: 'bg-red-400/15' };
    if (total < 20) return { badge: 'BEGINNER', color: 'text-gray-400', bg: 'bg-gray-400/15' };
    return { badge: 'TRADER', color: 'text-kmf-accent', bg: 'bg-kmf-accent/15' };
  })();

  // Phase 4.3: Trading Insights/Alerts — 6 types matching Android
  const insights = (() => {
    const result = [];
    const total = closedTrades.length;
    if (total < 30) {
      result.push({ type: 'INFO', icon: 'info', message: `Low sample size (${total} trades). Need at least 30 trades for reliable statistics.` });
    }
    if (profitFactor < 1.0 && total >= 10) {
      result.push({ type: 'CRITICAL', icon: 'error', message: `Losing system detected! Profit Factor is ${profitFactor.toFixed(2)}. Review your strategy.` });
    }
    if (profitFactor >= 2.0 && total >= 20) {
      result.push({ type: 'SUCCESS', icon: 'success', message: `Profitable system! Profit Factor ${profitFactor.toFixed(2)} with ${total} trades.` });
    }
    if (avgRMultiple < -1.2 && total > 0) {
      result.push({ type: 'WARNING', icon: 'warning', message: `Excessive losses. Average R-Multiple is ${avgRMultiple.toFixed(2)}. Tighten your risk management.` });
    }
    if (disciplinePercent < 70 && total > 0) {
      result.push({ type: 'WARNING', icon: 'warning', message: `Low discipline score (${disciplinePercent.toFixed(0)}%). Focus on following your trading plan.` });
    }
    if (expectancy < 0 && total >= 10) {
      result.push({ type: 'INFO', icon: 'info', message: `Negative expectancy ($${expectancy.toFixed(2)}/trade). Your edge needs improvement.` });
    }
    return result;
  })();

  // Monthly P&L — last 6 months
  const monthlyPL = (() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = d.getTime();
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
      const pl = closedTrades
        .filter(t => { const ts = t.tradeDateTime || t.timestamp; return ts >= start && ts < end; })
        .reduce((s, t) => s + getPnL(t), 0);
      months.push({
        month: d.toLocaleDateString('en', { month: 'short' }),
        pl: parseFloat(pl.toFixed(2)),
      });
    }
    return months;
  })();

  // Trading streak — consecutive calendar days with at least one closed trade (ending today)
  const tradingStreak = (() => {
    if (closedTrades.length === 0) return 0;
    const tradeDays = new Set(
      closedTrades.map(t => {
        const d = new Date(t.tradeDateTime || t.timestamp);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    );
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (tradeDays.has(key)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  })();

  // Profit Factor quality indicator
  const pfQuality = profitFactor >= 2.0 ? 'Excellent' : profitFactor >= 1.0 ? 'Good' : 'Poor';

  const stats = {
    totalTrades: trades.length,
    closedTrades: closedTrades.length,
    openTrades: openTrades.length,
    wins: wins.length,
    losses: losses.length,
    breakevens: breakevenTrades.length,
    totalPL,
    winRate,
    avgWin,
    avgLoss,
    profitFactor,
    pfQuality,
    expectancy,
    avgRMultiple,
    bestTrade: closedTrades.length > 0 ? Math.max(...closedTrades.map(t => getPnL(t))) : 0,
    worstTrade: closedTrades.length > 0 ? Math.min(...closedTrades.map(t => getPnL(t))) : 0,
    avgDiscipline,
    disciplinePercent,
    maxDrawdown,
    monthPL,
    monthlyPL,
    tradingStreak,
    topPairs,
    tradingLevel,
    traderBadge,
    insights,
  };

  const value = {
    trades, settings, loading, syncing, stats,
    closedTrades, openTrades, weeklyReviews, weeklyGoals, checklists,
    addTrade, editTrade, removeTrade, saveSettings, loadData,
    saveWeeklyReview, addWeeklyGoal, updateGoal, removeGoal,
    addChecklist, editChecklist, removeChecklist, setDefaultChecklist,
    getPnL,
  };

  return (
    <TradesContext.Provider value={value}>
      {children}
    </TradesContext.Provider>
  );
};
