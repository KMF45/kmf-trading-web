import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getTrades, addTrade as addTradeService, updateTrade as updateTradeService,
  deleteTrade as deleteTradeService, getUserSettings, updateUserSettings
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
  const [settings, setSettings] = useState({
    accountBalance: 10000,
    currency: 'USD',
    language: 'en',
    riskPerTrade: 1,
    defaultLotSize: 0.01,
  });
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
      const [tradesData, settingsData] = await Promise.all([
        getTrades(user.uid),
        getUserSettings(user.uid),
      ]);
      setTrades(tradesData);
      setSettings(settingsData);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addTrade = async (trade) => {
    if (!user) return;
    setSyncing(true);
    try {
      const newTrade = await addTradeService(user.uid, trade);
      setTrades(prev => [{ ...trade, id: newTrade.id, openDate: new Date(trade.openDate) }, ...prev]);
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
      setTrades(prev => prev.map(t => t.id === tradeId ? {
        ...t, ...updates,
        openDate: updates.openDate ? new Date(updates.openDate) : t.openDate,
        closeDate: updates.closeDate ? new Date(updates.closeDate) : t.closeDate,
      } : t));
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

  // ============ COMPUTED STATS ============
  const closedTrades = trades.filter(t => t.status === 'CLOSED');
  const openTrades = trades.filter(t => t.status === 'OPEN');
  const wins = closedTrades.filter(t => (t.profitLoss || 0) > 0);
  const losses = closedTrades.filter(t => (t.profitLoss || 0) < 0);

  const totalPL = closedTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0);
  const winRate = closedTrades.length > 0 ? (wins.length / closedTrades.length) * 100 : 0;
  const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + (t.profitLoss || 0), 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + (t.profitLoss || 0), 0) / losses.length) : 0;
  const profitFactor = avgLoss > 0 ? (avgWin * wins.length) / (avgLoss * losses.length) : 0;
  const expectancy = closedTrades.length > 0
    ? ((winRate / 100) * avgWin) - ((1 - winRate / 100) * avgLoss)
    : 0;

  const avgRMultiple = closedTrades.length > 0
    ? closedTrades.reduce((s, t) => s + (t.rMultiple || 0), 0) / closedTrades.length
    : 0;

  const stats = {
    totalTrades: trades.length,
    closedTrades: closedTrades.length,
    openTrades: openTrades.length,
    wins: wins.length,
    losses: losses.length,
    breakeven: closedTrades.filter(t => (t.profitLoss || 0) === 0).length,
    totalPL,
    winRate,
    avgWin,
    avgLoss,
    profitFactor,
    expectancy,
    avgRMultiple,
    bestTrade: closedTrades.length > 0 ? Math.max(...closedTrades.map(t => t.profitLoss || 0)) : 0,
    worstTrade: closedTrades.length > 0 ? Math.min(...closedTrades.map(t => t.profitLoss || 0)) : 0,
    avgDiscipline: closedTrades.length > 0
      ? closedTrades.reduce((s, t) => s + (t.discipline || 0), 0) / closedTrades.length
      : 0,
  };

  const value = {
    trades, settings, loading, syncing, stats,
    closedTrades, openTrades,
    addTrade, editTrade, removeTrade, saveSettings, loadData,
  };

  return (
    <TradesContext.Provider value={value}>
      {children}
    </TradesContext.Provider>
  );
};
