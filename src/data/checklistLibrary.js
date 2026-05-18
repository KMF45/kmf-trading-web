// Suggestion library for the Pre-Trade Checklist Builder.
// Users click an item to add it to their builder. Items are grouped by
// category — when added, they go into the matching category in the user's
// checklist (the category is created if it doesn't exist).
//
// All items are written in second person ("Have I…?" / "Did I…?") so they
// read naturally on a paper or PDF checklist beside a checkbox.

export const LIBRARY_CATEGORIES = [
  'Market Context',
  'Setup',
  'Entry',
  'Risk',
  'Psychology',
  'Execution',
  'Post-Trade Plan',
  'Prop Firm',
  'News Trading',
  'Scalping',
  'Swing & Position',
  'Crypto-Specific',
  'Stocks-Specific',
];

export const LIBRARY_ITEMS = [
  // Market Context
  { id: 'mkt-news-30', category: 'Market Context', text: 'No high-impact news in the next 30 minutes' },
  { id: 'mkt-news-2h', category: 'Market Context', text: 'No high-impact news in the next 2 hours' },
  { id: 'mkt-news-24h', category: 'Market Context', text: 'No major economic events in the next 24 hours' },
  { id: 'mkt-session', category: 'Market Context', text: 'Trading during a liquid session for this instrument' },
  { id: 'mkt-spread', category: 'Market Context', text: 'Spread is normal (not pre-news or low-liquidity widening)' },
  { id: 'mkt-volatility', category: 'Market Context', text: 'Current volatility (ATR) is within my normal trading range' },
  { id: 'mkt-htf-bias', category: 'Market Context', text: 'Higher-timeframe bias (daily/weekly) is clear and noted' },
  { id: 'mkt-key-levels', category: 'Market Context', text: 'Key levels (S/R, supply/demand, VWAP) are marked on chart' },

  // Setup
  { id: 'setup-rules', category: 'Setup', text: 'This setup matches my strategy rules 100% — not 80%' },
  { id: 'setup-htf-confirm', category: 'Setup', text: 'Higher-timeframe direction confirms my entry direction' },
  { id: 'setup-confluence', category: 'Setup', text: 'At least 2 independent confluences are present' },
  { id: 'setup-not-mid-range', category: 'Setup', text: 'Price is not stuck mid-range with no clear edge' },
  { id: 'setup-rationale', category: 'Setup', text: 'I can describe the entry reason in ONE sentence' },
  { id: 'setup-screenshot-pre', category: 'Setup', text: 'Pre-entry screenshot captured (HTF + entry TF)' },
  { id: 'setup-no-chase', category: 'Setup', text: 'I am NOT chasing — the setup formed before I noticed price moving' },
  { id: 'setup-prior-fail', category: 'Setup', text: 'No prior failed setup at this exact level today' },

  // Entry
  { id: 'entry-trigger', category: 'Entry', text: 'A specific entry trigger has fired (not just "looks good")' },
  { id: 'entry-limit-vs-market', category: 'Entry', text: 'Order type chosen consciously (limit vs market vs stop)' },
  { id: 'entry-slippage', category: 'Entry', text: 'Slippage tolerance acceptable for current spread' },
  { id: 'entry-time-of-day', category: 'Entry', text: 'Time of day matches when this setup historically performs' },

  // Risk
  { id: 'risk-1pct', category: 'Risk', text: 'Position size = 1% of account or less' },
  { id: 'risk-0_5pct', category: 'Risk', text: 'Position size = 0.5% of account (conservative mode)' },
  { id: 'risk-sl-defined', category: 'Risk', text: 'Stop loss is pre-defined, placed at structure' },
  { id: 'risk-sl-immovable', category: 'Risk', text: 'I will NOT move the stop loss against me, no matter what' },
  { id: 'risk-rr-1-2', category: 'Risk', text: 'R:R is at least 1:2 before I consider the trade' },
  { id: 'risk-rr-1-3', category: 'Risk', text: 'R:R is at least 1:3 (strict mode)' },
  { id: 'risk-daily-dd', category: 'Risk', text: 'Daily drawdown remaining is greater than this trade\'s risk' },
  { id: 'risk-correlation', category: 'Risk', text: 'No correlated open position that doubles my real exposure' },
  { id: 'risk-lot-calc', category: 'Risk', text: 'Lot size verified with the lot calculator (no math in head)' },
  { id: 'risk-max-loss', category: 'Risk', text: 'Worst-case dollar loss is something I can stomach calmly' },

  // Psychology
  { id: 'psy-calm', category: 'Psychology', text: 'Emotional state right now: calm and focused' },
  { id: 'psy-not-tilted', category: 'Psychology', text: 'Not tilted, not revenge-driven, not chasing a previous loss' },
  { id: 'psy-not-fomo', category: 'Psychology', text: 'Not entering out of FOMO (fear of missing the move)' },
  { id: 'psy-plan-driven', category: 'Psychology', text: 'This trade is plan-driven, not "I need a trade right now"' },
  { id: 'psy-last-trade', category: 'Psychology', text: 'I have processed (won, lost, or paused) my last trade fully' },
  { id: 'psy-break', category: 'Psychology', text: 'I took at least a short break since my last trade' },
  { id: 'psy-life-state', category: 'Psychology', text: 'No major life distraction (sleep deprivation, argument, sickness)' },
  { id: 'psy-walk-away', category: 'Psychology', text: 'I am prepared to walk away from the screen after entry' },

  // Execution
  { id: 'exec-tp-set', category: 'Execution', text: 'Take profit is set at a logical level (not random)' },
  { id: 'exec-triple-check', category: 'Execution', text: 'Entry, SL, TP, and lot size triple-checked — no typos' },
  { id: 'exec-direction', category: 'Execution', text: 'Buy vs Sell direction is correct (clicked the right button)' },
  { id: 'exec-account', category: 'Execution', text: 'Correct trading account selected (live vs demo vs prop)' },
  { id: 'exec-instrument', category: 'Execution', text: 'Correct instrument selected (e.g., EURUSD vs EURJPY)' },
  { id: 'exec-screenshot', category: 'Execution', text: 'Post-entry screenshot saved for the journal' },
  { id: 'exec-journal', category: 'Execution', text: 'Trade rationale logged in the journal before execution' },

  // Post-Trade Plan
  { id: 'plan-manage', category: 'Post-Trade Plan', text: 'Management plan decided: set & forget, partials, or trail' },
  { id: 'plan-invalidation', category: 'Post-Trade Plan', text: 'I know what invalidates this setup before SL hits' },
  { id: 'plan-be-rule', category: 'Post-Trade Plan', text: 'Break-even rule defined (e.g., move to BE only after +1R)' },
  { id: 'plan-partial', category: 'Post-Trade Plan', text: 'Partial close levels defined (or explicitly: no partials)' },
  { id: 'plan-time-stop', category: 'Post-Trade Plan', text: 'Time stop defined if this is a momentum setup' },

  // Prop Firm
  { id: 'prop-daily-dd', category: 'Prop Firm', text: 'This trade keeps me under the daily drawdown limit' },
  { id: 'prop-max-dd', category: 'Prop Firm', text: 'This trade keeps me under the total max drawdown limit' },
  { id: 'prop-min-days', category: 'Prop Firm', text: 'Minimum trading days requirement is on track' },
  { id: 'prop-no-weekend', category: 'Prop Firm', text: 'No prohibited weekend holding (check firm rules)' },
  { id: 'prop-no-news', category: 'Prop Firm', text: 'No prohibited news trading (check firm rules)' },
  { id: 'prop-consistency', category: 'Prop Firm', text: 'Risk per trade is consistent with prior days (no doubling)' },

  // News Trading
  { id: 'news-decision', category: 'News Trading', text: 'Decision made: trade through / fade / stand aside — not "see what happens"' },
  { id: 'news-spread-widen', category: 'News Trading', text: 'Aware of spread widening at release time' },
  { id: 'news-stop-runs', category: 'News Trading', text: 'Aware of likely stop runs both directions' },
  { id: 'news-position-reduced', category: 'News Trading', text: 'Position size reduced for the elevated volatility' },

  // Scalping
  { id: 'scalp-spread-ratio', category: 'Scalping', text: 'Spread is less than 25% of the target distance' },
  { id: 'scalp-commission', category: 'Scalping', text: 'Commission cost accounted for in expectancy' },
  { id: 'scalp-execution-speed', category: 'Scalping', text: 'Order placement is fast — no fumbling on the trigger' },
  { id: 'scalp-no-revenge', category: 'Scalping', text: 'No revenge scalp after a loss within the last 5 minutes' },

  // Swing & Position
  { id: 'swing-overnight', category: 'Swing & Position', text: 'Comfortable holding through overnight gaps' },
  { id: 'swing-weekend', category: 'Swing & Position', text: 'Comfortable holding through the weekend if needed' },
  { id: 'swing-swap', category: 'Swing & Position', text: 'Swap/financing cost accounted for' },
  { id: 'swing-event-calendar', category: 'Swing & Position', text: 'No major event (earnings, CPI, central bank) inside the trade duration' },

  // Crypto-Specific
  { id: 'crypto-funding', category: 'Crypto-Specific', text: 'Funding rate checked (especially for perpetuals)' },
  { id: 'crypto-liquidation', category: 'Crypto-Specific', text: 'Liquidation price is far from entry given my leverage' },
  { id: 'crypto-exchange', category: 'Crypto-Specific', text: 'Exchange is the right one for this trade (spot vs perp)' },
  { id: 'crypto-weekend-ok', category: 'Crypto-Specific', text: 'Aware crypto trades 24/7 — I have a plan if I sleep through volatility' },

  // Stocks-Specific
  { id: 'stocks-earnings', category: 'Stocks-Specific', text: 'No earnings release inside the trade duration' },
  { id: 'stocks-extended-hours', category: 'Stocks-Specific', text: 'Aware of extended-hours risk (gaps, low liquidity)' },
  { id: 'stocks-borrow', category: 'Stocks-Specific', text: 'For short: borrow available and rate is acceptable' },
  { id: 'stocks-sector', category: 'Stocks-Specific', text: 'Sector trend aligns with my direction' },
];
