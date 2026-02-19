/**
 * models.js — KMF Trading Journal
 * Trade models, enums, and calculation helpers matching Android app exactly
 */

// ============ ENUMS ============

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

// ============ HELPERS ============

/** Get final P/L from a trade (matches Android getFinalPnL) */
export const getFinalPnL = (trade) => trade.actualPnL ?? trade.pnlAmount ?? 0;

/**
 * Calculate R-Multiple dynamically — matches Android trade.calculateRMultiple()
 * If stored rMultiple exists and != 0, use it. Otherwise calculate from entry/SL/PnL.
 */
export const calculateRMultiple = (trade) => {
  if (trade.rMultiple && trade.rMultiple !== 0) return trade.rMultiple;
  const entryPrice = trade.entryPrice || 0;
  const stopLoss = trade.stopLoss || entryPrice;
  const lotSize = trade.lotSize || 0;
  const risk = Math.abs((entryPrice - stopLoss) * lotSize);
  if (risk > 0) return getFinalPnL(trade) / risk;
  return 0;
};

/**
 * Check if a goal has excessive carry-overs — matches Android hasExcessiveCarryOvers()
 */
export const hasExcessiveCarryOvers = (goal) => (goal.carryOverCount || 0) >= 3;
