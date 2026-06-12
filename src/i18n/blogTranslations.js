// Maps article slug → available language versions
// Used by BlogArticleLayout to show LanguageSwitcher and inject hreflang tags
const blogTranslations = {
  'what-is-kmf-trading-journal': {
    en: '/blog/what-is-kmf-trading-journal',
    ro: '/blog/ro/what-is-kmf-trading-journal',
  },
  'trading-vs-gambling': {
    en: '/blog/trading-vs-gambling',
    ro: '/blog/ro/trading-vs-gambling',
  },
  'analysis-paralysis-trading': {
    en: '/blog/analysis-paralysis-trading',
    ro: '/blog/ro/analysis-paralysis-trading',
  },
  'is-100-enough-to-start-forex': {
    en: '/blog/is-100-enough-to-start-forex',
    ro: '/blog/ro/is-100-enough-to-start-forex',
  },
  'revenge-trading': {
    en: '/blog/revenge-trading',
    ro: '/blog/ro/revenge-trading',
  },
  'trading-expectancy-explained': {
    en: '/blog/trading-expectancy-explained',
    ro: '/blog/ro/trading-expectancy-explained',
  },
  '1-percent-risk-rule': {
    en: '/blog/1-percent-risk-rule',
    ro: '/blog/ro/1-percent-risk-rule',
  },
  'how-to-recover-from-losing-streak': {
    en: '/blog/how-to-recover-from-losing-streak',
    ro: '/blog/ro/how-to-recover-from-losing-streak',
  },
  'profit-factor-vs-win-rate': {
    en: '/blog/profit-factor-vs-win-rate',
    ro: '/blog/ro/profit-factor-vs-win-rate',
  },
  'position-sizing-guide': {
    en: '/blog/position-sizing-guide',
    ro: '/blog/ro/position-sizing-guide',
  },
  'how-to-set-stop-loss': {
    en: '/blog/how-to-set-stop-loss',
    ro: '/blog/ro/how-to-set-stop-loss',
  },
  'r-multiple-explained': {
    en: '/blog/r-multiple-explained',
    ro: '/blog/ro/r-multiple-explained',
  },
  'crypto-vs-forex-journaling': {
    en: '/blog/crypto-vs-forex-journaling',
    ro: '/blog/ro/crypto-vs-forex-journaling',
  },
  'why-traders-break-their-rules': {
    en: '/blog/why-traders-break-their-rules',
    ro: '/blog/ro/why-traders-break-their-rules',
  },
  'good-loss-vs-bad-win': {
    en: '/blog/good-loss-vs-bad-win',
    ro: '/blog/ro/good-loss-vs-bad-win',
  },
  'weekend-gap-risk': {
    en: '/blog/weekend-gap-risk',
    ro: '/blog/ro/weekend-gap-risk',
  },
  'pre-trade-checklist': {
    en: '/blog/pre-trade-checklist',
    ro: '/blog/ro/pre-trade-checklist',
  },
  '10-questions-after-every-trade': {
    en: '/blog/10-questions-after-every-trade',
    ro: '/blog/ro/10-questions-after-every-trade',
  },
  'weekly-trading-review-template': {
    en: '/blog/weekly-trading-review-template',
    ro: '/blog/ro/weekly-trading-review-template',
  },
  'execution-gap-backtest-vs-live-trading': {
    en: '/blog/execution-gap-backtest-vs-live-trading',
    ro: '/blog/ro/execution-gap-backtest-vs-live-trading',
  },
  'ghost-trades-journaling-missed-opportunities': {
    en: '/blog/ghost-trades-journaling-missed-opportunities',
    ro: '/blog/ro/ghost-trades-journaling-missed-opportunities',
  },
  'prospect-theory-trading': {
    en: '/blog/prospect-theory-trading',
    ro: '/blog/ro/prospect-theory-trading',
  },
  'confidence-vs-overconfidence': {
    en: '/blog/confidence-vs-overconfidence',
    ro: '/blog/ro/confidence-vs-overconfidence',
  },
  'tilt-recovery-protocol': {
    en: '/blog/tilt-recovery-protocol',
    ro: '/blog/ro/tilt-recovery-protocol',
  },
  'lotto-ticket-syndrome': {
    en: '/blog/lotto-ticket-syndrome',
    ro: '/blog/ro/lotto-ticket-syndrome',
  },
  'breakeven-stop-too-early': {
    en: '/blog/breakeven-stop-too-early',
    ro: '/blog/ro/breakeven-stop-too-early',
  },
  'excel-vs-trading-journal-app': {
    en: '/blog/excel-vs-trading-journal-app',
    ro: '/blog/ro/excel-vs-trading-journal-app',
  },
  'ai-trade-review': {
    en: '/blog/ai-trade-review',
    ro: '/blog/ro/ai-trade-review',
  },
  'tradingview-kmf-workflow': {
    en: '/blog/tradingview-kmf-workflow',
    ro: '/blog/ro/tradingview-kmf-workflow',
  },
  'strategy-is-not-enough': {
    en: '/blog/strategy-is-not-enough',
    ro: '/blog/ro/strategy-is-not-enough',
  },
  'why-traders-fail-at-journaling': {
    en: '/blog/why-traders-fail-at-journaling',
    ro: '/blog/ro/why-traders-fail-at-journaling',
  },
  'overtrading-checklist': {
    en: '/blog/overtrading-checklist',
    ro: '/blog/ro/overtrading-checklist',
  },
  'revenge-trading-kill-switch': {
    en: '/blog/revenge-trading-kill-switch',
    ro: '/blog/ro/revenge-trading-kill-switch',
  },
  'market-order-vs-limit-order': {
    en: '/blog/market-order-vs-limit-order',
    ro: '/blog/ro/market-order-vs-limit-order',
  },
  'scaling-in-vs-scaling-out': {
    en: '/blog/scaling-in-vs-scaling-out',
    ro: '/blog/ro/scaling-in-vs-scaling-out',
  },
  'monday-effect-trading': {
    en: '/blog/monday-effect-trading',
    ro: '/blog/ro/monday-effect-trading',
  },
  'worst-trading-excuses': {
    en: '/blog/worst-trading-excuses',
    ro: '/blog/ro/worst-trading-excuses',
  },
  'metatrader-pre-trade-checklist': {
    en: '/blog/metatrader-pre-trade-checklist',
    ro: '/blog/ro/metatrader-pre-trade-checklist',
  },
  'static-vs-trailing-drawdown': {
    en: '/blog/static-vs-trailing-drawdown',
    ro: '/blog/ro/static-vs-trailing-drawdown',
  },
  'prop-firm-trading-journal': {
    en: '/blog/prop-firm-trading-journal',
    ro: '/blog/ro/prop-firm-trading-journal',
  },
  'prop-firm-daily-drawdown-guide': {
    en: '/blog/prop-firm-daily-drawdown-guide',
    ro: '/blog/ro/prop-firm-daily-drawdown-guide',
  },
  'scared-money-prop-firm': {
    en: '/blog/scared-money-prop-firm',
    ro: '/blog/ro/scared-money-prop-firm',
  },
};

export default blogTranslations;
