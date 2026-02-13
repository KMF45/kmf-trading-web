import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getTrades, addTrade as addTradeService, updateTrade as updateTradeService,
  deleteTrade as deleteTradeService, getUserSettings, updateUserSettings,
  getWeeklyReviews, saveWeeklyReview as saveWeeklyReviewService,
  getWeeklyGoals, saveWeeklyGoal as saveWeeklyGoalService,
  updateWeeklyGoal as updateWeeklyGoalService, deleteWeeklyGoal as deleteWeeklyGoalService,
} from '../services/firestore';

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
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadData = useCallback(async () => {
    if (!user) {
      setTrades([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [tradesData, settingsData, reviewsData, goalsData] = await Promise.all([
        getTrades(user.uid),
        getUserSettings(user.uid),
        getWeeklyReviews(user.uid),
        getWeeklyGoals(user.uid),
      ]);
      setTrades(tradesData);
      setSettings(settingsData);
      setWeeklyReviews(reviewsData);
      setWeeklyGoals(goalsData);
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

  // ============ COMPUTED STATS (matching Android field names) ============
  const closedTrades = trades.filter(t => t.result === 'PROFIT' || t.result === 'LOSS');
  const openTrades = trades.filter(t => t.result === 'PENDING');
  const wins = closedTrades.filter(t => t.result === 'PROFIT');
  const losses = closedTrades.filter(t => t.result === 'LOSS');

  const getPnL = (t) => t.actualPnL ?? t.pnlAmount ?? 0;

  const totalPL = closedTrades.reduce((sum, t) => sum + getPnL(t), 0);
  const winRate = closedTrades.length > 0 ? (wins.length / closedTrades.length) * 100 : 0;
  const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + getPnL(t), 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + getPnL(t), 0) / losses.length) : 0;
  const totalWinAmount = wins.reduce((s, t) => s + getPnL(t), 0);
  const totalLossAmount = Math.abs(losses.reduce((s, t) => s + getPnL(t), 0));
  const profitFactor = totalLossAmount > 0 ? totalWinAmount / totalLossAmount : totalWinAmount > 0 ? totalWinAmount : 0;
  const expectancy = closedTrades.length > 0
    ? ((winRate / 100) * avgWin) - ((1 - winRate / 100) * avgLoss)
    : 0;

  const avgRMultiple = closedTrades.length > 0
    ? closedTrades.reduce((s, t) => s + (t.rMultiple || 0), 0) / closedTrades.length
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

  // Discipline as percentage (rating is 0-5, Android shows as %)
  const avgDiscipline = closedTrades.length > 0
    ? closedTrades.reduce((s, t) => s + (t.rating || 0), 0) / closedTrades.length
    : 0;
  const disciplinePercent = (avgDiscipline / 5) * 100;

  const stats = {
    totalTrades: trades.length,
    closedTrades: closedTrades.length,
    openTrades: openTrades.length,
    wins: wins.length,
    losses: losses.length,
    totalPL,
    winRate,
    avgWin,
    avgLoss,
    profitFactor,
    expectancy,
    avgRMultiple,
    bestTrade: closedTrades.length > 0 ? Math.max(...closedTrades.map(t => getPnL(t))) : 0,
    worstTrade: closedTrades.length > 0 ? Math.min(...closedTrades.map(t => getPnL(t))) : 0,
    avgDiscipline,
    disciplinePercent,
    maxDrawdown,
    monthPL,
    topPairs,
  };

  const value = {
    trades, settings, loading, syncing, stats,
    closedTrades, openTrades, weeklyReviews, weeklyGoals,
    addTrade, editTrade, removeTrade, saveSettings, loadData,
    saveWeeklyReview, addWeeklyGoal, updateGoal, removeGoal,
    getPnL,
  };

  return (
    <TradesContext.Provider value={value}>
      {children}
    </TradesContext.Provider>
  );
};
