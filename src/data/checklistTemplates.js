// Starter templates for the Pre-Trade Checklist Builder.
// Each template is a complete checklist a trader can load with one click,
// then tweak — rather than starting from a blank slate.
//
// Shape: { id, name, description, categories: [{ name, items: string[] }] }
// When loaded, each string becomes a checklist item with a generated id.

export const STARTER_TEMPLATES = [
  {
    id: 'blank',
    name: 'Start from scratch',
    description: 'Empty checklist. Build it your way using the suggestion library or your own items.',
    categories: [],
  },
  {
    id: 'forex-day',
    name: 'Forex Day Trader',
    description: 'For intraday FX. London/NY sessions, tight risk, fast execution.',
    categories: [
      {
        name: 'Market Context',
        items: [
          'No high-impact news in the next 30 minutes',
          'Trading during the London or NY session',
          'Spread is normal (not pre-news or low-liquidity widening)',
        ],
      },
      {
        name: 'Setup',
        items: [
          'This setup matches my strategy rules 100% — not 80%',
          'Higher-timeframe direction confirms my entry direction',
          'I can describe the entry reason in ONE sentence',
        ],
      },
      {
        name: 'Risk',
        items: [
          'Position size = 1% of account or less',
          'Stop loss is pre-defined, placed at structure',
          'R:R is at least 1:2 before I consider the trade',
        ],
      },
      {
        name: 'Psychology',
        items: [
          'Emotional state right now: calm and focused',
          'Not entering out of FOMO (fear of missing the move)',
        ],
      },
      {
        name: 'Execution',
        items: [
          'Entry, SL, TP, and lot size triple-checked — no typos',
          'Trade rationale logged in the journal before execution',
        ],
      },
    ],
  },
  {
    id: 'swing',
    name: 'Swing Trader',
    description: 'Multi-day to multi-week holds, any market. HTF-first decisions.',
    categories: [
      {
        name: 'Market Context',
        items: [
          'Higher-timeframe bias (daily/weekly) is clear and noted',
          'No major event (earnings, CPI, central bank) inside the trade duration',
        ],
      },
      {
        name: 'Setup',
        items: [
          'At least 2 independent confluences are present',
          'Key levels (S/R, supply/demand) marked on chart',
          'I can describe the entry reason in ONE sentence',
        ],
      },
      {
        name: 'Risk',
        items: [
          'Position size = 1% of account or less',
          'Stop loss is pre-defined, placed at structure',
          'R:R is at least 1:3',
          'Comfortable holding through the weekend if needed',
        ],
      },
      {
        name: 'Post-Trade Plan',
        items: [
          'Management plan decided: set & forget, partials, or trail',
          'I know what invalidates this setup before SL hits',
          'Break-even rule defined (e.g., move to BE only after +1R)',
        ],
      },
      {
        name: 'Psychology',
        items: [
          'Not chasing — the setup formed before I noticed price moving',
          'I am prepared to walk away from the screen after entry',
        ],
      },
    ],
  },
  {
    id: 'prop-firm',
    name: 'Prop Firm Challenge',
    description: 'For funded accounts. Drawdown rules dominate every decision.',
    categories: [
      {
        name: 'Prop Firm Rules',
        items: [
          'This trade keeps me under the daily drawdown limit',
          'This trade keeps me under the total max drawdown limit',
          'Risk per trade is consistent with prior days (no doubling)',
          'No prohibited weekend holding (check firm rules)',
          'No prohibited news trading (check firm rules)',
        ],
      },
      {
        name: 'Setup',
        items: [
          'This setup matches my strategy rules 100% — not 80%',
          'Higher-timeframe direction confirms my entry direction',
        ],
      },
      {
        name: 'Risk',
        items: [
          'Position size = 0.5% of account (conservative mode)',
          'Stop loss is pre-defined and immovable against me',
          'R:R is at least 1:2',
          'No correlated open position that doubles my real exposure',
        ],
      },
      {
        name: 'Psychology',
        items: [
          'Not trying to "catch up" after a bad day',
          'Emotional state right now: calm and focused',
        ],
      },
      {
        name: 'Execution',
        items: [
          'Correct trading account selected (prop, not live or demo)',
          'Triple-checked: direction, size, SL, TP',
        ],
      },
    ],
  },
  {
    id: 'crypto',
    name: 'Crypto Trader',
    description: '24/7 markets, perps, funding rates, gap risk while you sleep.',
    categories: [
      {
        name: 'Market Context',
        items: [
          'Aware crypto trades 24/7 — I have a plan if I sleep through volatility',
          'No major macro event in the next 24 hours',
        ],
      },
      {
        name: 'Setup',
        items: [
          'This setup matches my strategy rules 100% — not 80%',
          'Higher-timeframe direction confirms my entry direction',
          'I can describe the entry reason in ONE sentence',
        ],
      },
      {
        name: 'Crypto Mechanics',
        items: [
          'Funding rate checked (especially for perpetuals)',
          'Liquidation price is far from entry given my leverage',
          'Exchange is the right one for this trade (spot vs perp)',
        ],
      },
      {
        name: 'Risk',
        items: [
          'Position size = 1% of account or less',
          'Stop loss is pre-defined, placed at structure',
          'R:R is at least 1:2',
        ],
      },
      {
        name: 'Psychology',
        items: [
          'Not entering out of FOMO (fear of missing the move)',
          'Emotional state right now: calm and focused',
        ],
      },
    ],
  },
];
