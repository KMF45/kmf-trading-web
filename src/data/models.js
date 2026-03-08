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

export const TradeEmotion = {
  CALM: 'CALM',
  CONFIDENT: 'CONFIDENT',
  ANXIOUS: 'ANXIOUS',
  FRUSTRATED: 'FRUSTRATED',
  FEARFUL: 'FEARFUL',
  EXCITED: 'EXCITED',
};

export const EmotionMeta = {
  CALM:       { label: 'Calm',       icon: '😌', color: '#4FC3F7', positive: true },
  CONFIDENT:  { label: 'Confident',  icon: '💪', color: '#00E676', positive: true },
  ANXIOUS:    { label: 'Anxious',    icon: '😰', color: '#FFB300', positive: false },
  FRUSTRATED: { label: 'Frustrated', icon: '😤', color: '#FF5252', positive: false },
  FEARFUL:    { label: 'Fearful',    icon: '😨', color: '#CE93D8', positive: false },
  EXCITED:    { label: 'Excited',    icon: '🤩', color: '#FF9800', positive: false },
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
  emotionBefore: null,
  emotionAfter: null,
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

/** Create new diary entry with defaults */
export const createDiaryEntry = (overrides = {}) => ({
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  mood: 3, // 1-5 scale
  preMarketNotes: '',
  postMarketNotes: '',
  lessonsLearned: '',
  gratitude: '',
  emotionState: null, // TradeEmotion
  createdAt: Date.now(),
  ...overrides,
});

// ============ GAMIFICATION CONSTANTS ============

export const XP_VALUES = {
  TRADE_WIN: 50,
  TRADE_LOSS: 20,
  TRADE_BREAKEVEN: 15,
  BONUS_FOLLOWED_PLAN: 10,
  BONUS_CHECKLIST_COMPLETE: 10,
  BONUS_HAS_NOTES: 5,
  BONUS_HAS_STOP_LOSS: 5,
  DIARY_ENTRY: 15,
  WEEKLY_REVIEW: 25,
};

export const LEVELS = [
  { level: 1,  title: 'Novice',       xpRequired: 0,     color: '#9E9E9E' },
  { level: 2,  title: 'Beginner',     xpRequired: 100,   color: '#8D6E63' },
  { level: 3,  title: 'Apprentice',   xpRequired: 300,   color: '#78909C' },
  { level: 4,  title: 'Trader',       xpRequired: 600,   color: '#66BB6A' },
  { level: 5,  title: 'Skilled',      xpRequired: 1000,  color: '#42A5F5' },
  { level: 6,  title: 'Experienced',  xpRequired: 1500,  color: '#AB47BC' },
  { level: 7,  title: 'Advanced',     xpRequired: 2200,  color: '#FFA726' },
  { level: 8,  title: 'Expert',       xpRequired: 3000,  color: '#EF5350' },
  { level: 9,  title: 'Master',       xpRequired: 4000,  color: '#FFD700' },
  { level: 10, title: 'Legend',       xpRequired: 5500,  color: '#E040FB' },
];

export const getLevelForXP = (xp) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) return LEVELS[i];
  }
  return LEVELS[0];
};

export const getXPProgress = (xp) => {
  const current = getLevelForXP(xp);
  const nextIdx = LEVELS.findIndex(l => l.level === current.level) + 1;
  if (nextIdx >= LEVELS.length) return { current, next: null, progress: 100, xpInLevel: 0, xpNeeded: 0 };
  const next = LEVELS[nextIdx];
  const xpInLevel = xp - current.xpRequired;
  const xpNeeded = next.xpRequired - current.xpRequired;
  return { current, next, progress: (xpInLevel / xpNeeded) * 100, xpInLevel, xpNeeded };
};

// 23 Achievements — tiered Bronze/Silver/Gold
export const ACHIEVEMENTS = [
  // Trade milestones
  { id: 'first_trade', title: 'First Step', desc: 'Complete your first trade', icon: '🎯', tier: 'bronze', check: (s) => s.closedTrades >= 1 },
  { id: 'trades_10', title: 'Getting Started', desc: 'Complete 10 trades', icon: '📊', tier: 'bronze', check: (s) => s.closedTrades >= 10 },
  { id: 'trades_50', title: 'Committed', desc: 'Complete 50 trades', icon: '📈', tier: 'silver', check: (s) => s.closedTrades >= 50 },
  { id: 'trades_100', title: 'Centurion', desc: 'Complete 100 trades', icon: '🏅', tier: 'gold', check: (s) => s.closedTrades >= 100 },
  // Win streaks
  { id: 'win_streak_3', title: 'Hot Hand', desc: '3 consecutive wins', icon: '🔥', tier: 'bronze', check: (s) => s.maxWinStreak >= 3 },
  { id: 'win_streak_5', title: 'On Fire', desc: '5 consecutive wins', icon: '💥', tier: 'silver', check: (s) => s.maxWinStreak >= 5 },
  { id: 'win_streak_10', title: 'Unstoppable', desc: '10 consecutive wins', icon: '⚡', tier: 'gold', check: (s) => s.maxWinStreak >= 10 },
  // Win rate
  { id: 'winrate_50', title: 'Above Average', desc: 'Win rate above 50%', icon: '📉', tier: 'bronze', check: (s) => s.winRate >= 50 && s.closedTrades >= 10 },
  { id: 'winrate_60', title: 'Sharp Shooter', desc: 'Win rate above 60%', icon: '🎯', tier: 'silver', check: (s) => s.winRate >= 60 && s.closedTrades >= 20 },
  { id: 'winrate_70', title: 'Precision Master', desc: 'Win rate above 70%', icon: '💎', tier: 'gold', check: (s) => s.winRate >= 70 && s.closedTrades >= 30 },
  // Profit factor
  { id: 'pf_1', title: 'Breaking Even', desc: 'Profit Factor above 1.0', icon: '⚖️', tier: 'bronze', check: (s) => s.profitFactor >= 1.0 && s.closedTrades >= 10 },
  { id: 'pf_2', title: 'Profitable System', desc: 'Profit Factor above 2.0', icon: '💰', tier: 'silver', check: (s) => s.profitFactor >= 2.0 && s.closedTrades >= 20 },
  { id: 'pf_3', title: 'Money Machine', desc: 'Profit Factor above 3.0', icon: '🏆', tier: 'gold', check: (s) => s.profitFactor >= 3.0 && s.closedTrades >= 30 },
  // Discipline
  { id: 'discipline_70', title: 'Rule Follower', desc: 'Discipline above 70%', icon: '📋', tier: 'bronze', check: (s) => s.disciplinePercent >= 70 },
  { id: 'discipline_85', title: 'Disciplined', desc: 'Discipline above 85%', icon: '🛡️', tier: 'silver', check: (s) => s.disciplinePercent >= 85 },
  { id: 'discipline_95', title: 'Iron Will', desc: 'Discipline above 95%', icon: '⚔️', tier: 'gold', check: (s) => s.disciplinePercent >= 95 },
  // Streak
  { id: 'streak_3', title: 'Consistent', desc: '3-day trading streak', icon: '📅', tier: 'bronze', check: (s) => s.tradingStreak >= 3 },
  { id: 'streak_7', title: 'Dedicated', desc: '7-day trading streak', icon: '🗓️', tier: 'silver', check: (s) => s.tradingStreak >= 7 },
  { id: 'streak_14', title: 'Relentless', desc: '14-day trading streak', icon: '🔄', tier: 'gold', check: (s) => s.tradingStreak >= 14 },
  // Journal
  { id: 'notes_10', title: 'Documenter', desc: '10 trades with notes', icon: '✍️', tier: 'bronze', check: (s) => s.tradesWithNotes >= 10 },
  { id: 'notes_50', title: 'Journalist', desc: '50 trades with notes', icon: '📝', tier: 'silver', check: (s) => s.tradesWithNotes >= 50 },
  // Risk management
  { id: 'sl_always', title: 'Risk Manager', desc: '20 trades all with stop-loss', icon: '🛑', tier: 'silver', check: (s) => s.tradesWithSL >= 20 && s.slRate >= 95 },
  { id: 'r_positive', title: 'R-Positive', desc: 'Average R-Multiple above 1.0', icon: '📐', tier: 'gold', check: (s) => s.avgRMultiple >= 1.0 && s.closedTrades >= 20 },
];

export default {
  TradeType,
  TradeResult,
  GoalStatus,
  TradingSession,
  TradeEmotion,
  EmotionMeta,
  getFinalPnL,
  calculateRMultiple,
  getTradingSession,
};
