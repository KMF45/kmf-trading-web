/**
 * models.js — KMF Trading Journal
 * Mirrors Android enums: TradeType, TradeResult, SyncStatus, GoalStatus, TradingSession
 */

// ============ ENUMS ============

export const TradeType = { BUY: 'BUY', SELL: 'SELL' };

export const TradeResult = {
  PROFIT: 'PROFIT',
  LOSS: 'LOSS',
  BREAKEVEN: 'BREAKEVEN',
  PENDING: 'PENDING',
};

export const GoalStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const TradingSession = {
  ASIAN: 'ASIAN',
  LONDON: 'LONDON',
  NEW_YORK: 'NEW_YORK',
};

// ============ TRADE HELPERS ============

/** Get final P/L (actualPnL if exists, else pnlAmount) — mirrors Trade.getFinalPnL() */
export const getFinalPnL = (trade) => trade.actualPnL ?? trade.pnlAmount ?? 0;

/** Calculate R-Multiple — mirrors Trade.calculateRMultiple() */
export const calculateRMultiple = (trade) => {
  if (trade.rMultiple && trade.rMultiple !== 0) return trade.rMultiple;
  const risk = Math.abs((trade.entryPrice - (trade.stopLoss || trade.entryPrice)) * trade.lotSize);
  if (risk > 0) {
    return getFinalPnL(trade) / risk;
  }
  return 0;
};

/** Get trade hour in UTC — mirrors Trade.getTradeHour() */
export const getTradeHour = (trade) => {
  const d = new Date(trade.tradeDateTime || trade.timestamp);
  return d.getUTCHours();
};

/** Get trading session — mirrors Trade.getTradingSession() */
export const getTradingSession = (trade) => {
  const hour = getTradeHour(trade);
  if (hour >= 0 && hour <= 8) return TradingSession.ASIAN;
  if (hour >= 9 && hour <= 12) return TradingSession.LONDON;
  return TradingSession.NEW_YORK;
};

/** Get session display label */
export const getSessionLabel = (session) => {
  const map = {
    [TradingSession.ASIAN]: '🌏 Asian',
    [TradingSession.LONDON]: '🇬🇧 London',
    [TradingSession.NEW_YORK]: '🇺🇸 New York',
  };
  return map[session] || session;
};

/** Check if goal has excessive carry-overs — mirrors WeeklyGoal.hasExcessiveCarryOvers() */
export const hasExcessiveCarryOvers = (goal) => (goal.carryOverCount || 0) >= 3;

/** Create new trade object with defaults */
export const createTrade = (overrides = {}) => ({
  instrument: '',
  type: TradeType.BUY,
  entryPrice: 0,
  stopLoss: null,
  takeProfit: null,
  lotSize: 0,
  pnlAmount: null,
  actualPnL: null,
  result: TradeResult.PENDING,
  rating: 3,
  notes: '',
  photoUri: null,
  completedTasks: [],
  timestamp: Date.now(),
  tradeDateTime: Date.now(),
  followedPlan: true,
  rMultiple: 0,
  ...overrides,
});

/** Create new weekly review with defaults */
export const createWeeklyReview = (weekNumber, year, overrides = {}) => ({
  weekNumber,
  year,
  disciplineScore: 5,
  planScore: 5,
  emotionScore: 5,
  motivationScore: 5,
  satisfactionScore: 5,
  noteGood: '',
  noteBad: '',
  noteLearning: '',
  overallScore: 5.0,
  createdAt: Date.now(),
  ...overrides,
});

/** Create new weekly goal with defaults */
export const createWeeklyGoal = (weekNumber, year, goalText, overrides = {}) => ({
  weekNumber,
  year,
  goalText,
  status: GoalStatus.PENDING,
  carryOverCount: 0,
  createdAt: Date.now(),
  ...overrides,
});

export default {
  TradeType,
  TradeResult,
  GoalStatus,
  TradingSession,
  getFinalPnL,
  calculateRMultiple,
  getTradingSession,
};
