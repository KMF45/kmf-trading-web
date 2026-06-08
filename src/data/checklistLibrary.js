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

// ─── Romanian overlay (keyed by stable item id; trading terms kept English) ───
const CATEGORY_RO = {
  'Market Context': 'Context de Piață',
  'Setup': 'Setup',
  'Entry': 'Intrare',
  'Risk': 'Risc',
  'Psychology': 'Psihologie',
  'Execution': 'Execuție',
  'Post-Trade Plan': 'Plan Post-Trade',
  'Prop Firm': 'Prop Firm',
  'News Trading': 'Trading pe Știri',
  'Scalping': 'Scalping',
  'Swing & Position': 'Swing & Position',
  'Crypto-Specific': 'Specific Crypto',
  'Stocks-Specific': 'Specific Acțiuni',
};

const ITEMS_RO = {
  'mkt-news-30': 'Fără știri high-impact în următoarele 30 de minute',
  'mkt-news-2h': 'Fără știri high-impact în următoarele 2 ore',
  'mkt-news-24h': 'Fără evenimente economice majore în următoarele 24 de ore',
  'mkt-session': 'Tranzacționez într-o sesiune lichidă pentru acest instrument',
  'mkt-spread': 'Spread-ul e normal (nu lărgit pre-știri sau de lichiditate mică)',
  'mkt-volatility': 'Volatilitatea curentă (ATR) e în range-ul meu normal de trading',
  'mkt-htf-bias': 'Bias-ul pe higher-timeframe (daily/weekly) e clar și notat',
  'mkt-key-levels': 'Nivelurile cheie (S/R, supply/demand, VWAP) sunt marcate pe chart',

  'setup-rules': 'Acest setup respectă regulile strategiei 100% — nu 80%',
  'setup-htf-confirm': 'Direcția pe higher-timeframe confirmă direcția intrării mele',
  'setup-confluence': 'Sunt prezente cel puțin 2 confluențe independente',
  'setup-not-mid-range': 'Prețul nu e blocat la mijlocul range-ului, fără edge clar',
  'setup-rationale': 'Pot descrie motivul intrării într-O singură frază',
  'setup-screenshot-pre': 'Screenshot pre-intrare capturat (HTF + entry TF)',
  'setup-no-chase': 'NU alerg după preț — setup-ul s-a format înainte să observ mișcarea',
  'setup-prior-fail': 'Niciun setup eșuat anterior la exact acest nivel azi',

  'entry-trigger': 'Un trigger specific de intrare s-a declanșat (nu doar „arată bine")',
  'entry-limit-vs-market': 'Tipul de ordin ales conștient (limit vs market vs stop)',
  'entry-slippage': 'Toleranța la slippage e acceptabilă pentru spread-ul curent',
  'entry-time-of-day': 'Ora din zi se potrivește cu momentul când acest setup performează istoric',

  'risk-1pct': 'Position size = 1% din cont sau mai puțin',
  'risk-0_5pct': 'Position size = 0.5% din cont (mod conservator)',
  'risk-sl-defined': 'Stop loss-ul e pre-definit, plasat la structură',
  'risk-sl-immovable': 'NU voi muta stop loss-ul împotriva mea, orice ar fi',
  'risk-rr-1-2': 'R:R e cel puțin 1:2 înainte să iau în calcul trade-ul',
  'risk-rr-1-3': 'R:R e cel puțin 1:3 (mod strict)',
  'risk-daily-dd': 'Daily drawdown-ul rămas e mai mare decât riscul acestui trade',
  'risk-correlation': 'Nicio poziție corelată deschisă care îmi dublează expunerea reală',
  'risk-lot-calc': 'Lot size verificat cu lot calculator-ul (fără calcule în cap)',
  'risk-max-loss': 'Pierderea în dolari în cel mai rău caz e ceva ce pot suporta calm',

  'psy-calm': 'Starea emoțională acum: calm și concentrat',
  'psy-not-tilted': 'Nu sunt pe tilt, nu sunt în revenge, nu alerg după o pierdere anterioară',
  'psy-not-fomo': 'Nu intru din FOMO (frica de a rata mișcarea)',
  'psy-plan-driven': 'Acest trade e condus de plan, nu de „am nevoie de un trade acum"',
  'psy-last-trade': 'Mi-am procesat complet ultimul trade (câștigat, pierdut sau pauză)',
  'psy-break': 'Am luat măcar o pauză scurtă de la ultimul trade',
  'psy-life-state': 'Nicio distragere majoră (lipsă de somn, ceartă, boală)',
  'psy-walk-away': 'Sunt pregătit să mă ridic de la ecran după intrare',

  'exec-tp-set': 'Take profit-ul e setat la un nivel logic (nu aleatoriu)',
  'exec-triple-check': 'Entry, SL, TP și lot size verificate de trei ori — fără greșeli',
  'exec-direction': 'Direcția Buy vs Sell e corectă (am apăsat butonul corect)',
  'exec-account': 'Contul de trading corect selectat (live vs demo vs prop)',
  'exec-instrument': 'Instrumentul corect selectat (ex. EURUSD vs EURJPY)',
  'exec-screenshot': 'Screenshot post-intrare salvat pentru journal',
  'exec-journal': 'Motivul trade-ului logat în journal înainte de execuție',

  'plan-manage': 'Plan de management decis: set & forget, partials sau trail',
  'plan-invalidation': 'Știu ce invalidează acest setup înainte să lovească SL-ul',
  'plan-be-rule': 'Regulă de break-even definită (ex. mută la BE doar după +1R)',
  'plan-partial': 'Niveluri de închidere parțială definite (sau explicit: fără partials)',
  'plan-time-stop': 'Time stop definit dacă ăsta e un setup de momentum',

  'prop-daily-dd': 'Acest trade mă ține sub limita de daily drawdown',
  'prop-max-dd': 'Acest trade mă ține sub limita totală de max drawdown',
  'prop-min-days': 'Cerința de zile minime de trading e pe drumul bun',
  'prop-no-weekend': 'Fără holding interzis peste weekend (verifică regulile firmei)',
  'prop-no-news': 'Fără news trading interzis (verifică regulile firmei)',
  'prop-consistency': 'Riscul per trade e consecvent cu zilele anterioare (fără dublare)',

  'news-decision': 'Decizie luată: tranzacționez prin / fade / stau deoparte — nu „văd ce se întâmplă"',
  'news-spread-widen': 'Conștient de lărgirea spread-ului la momentul publicării',
  'news-stop-runs': 'Conștient de probabile stop runs în ambele direcții',
  'news-position-reduced': 'Position size redus pentru volatilitatea ridicată',

  'scalp-spread-ratio': 'Spread-ul e sub 25% din distanța până la target',
  'scalp-commission': 'Costul de comision luat în calcul în expectancy',
  'scalp-execution-speed': 'Plasarea ordinului e rapidă — fără fâțâială pe trigger',
  'scalp-no-revenge': 'Niciun revenge scalp după o pierdere în ultimele 5 minute',

  'swing-overnight': 'Confortabil să țin poziția peste gap-urile overnight',
  'swing-weekend': 'Confortabil să țin poziția peste weekend dacă e nevoie',
  'swing-swap': 'Costul de swap/finanțare luat în calcul',
  'swing-event-calendar': 'Niciun eveniment major (earnings, CPI, bancă centrală) în durata trade-ului',

  'crypto-funding': 'Funding rate verificat (mai ales pentru perpetuals)',
  'crypto-liquidation': 'Prețul de lichidare e departe de intrare dat fiind leverage-ul meu',
  'crypto-exchange': 'Exchange-ul e cel potrivit pentru acest trade (spot vs perp)',
  'crypto-weekend-ok': 'Conștient că crypto e 24/7 — am un plan dacă dorm peste volatilitate',

  'stocks-earnings': 'Niciun raport de earnings în durata trade-ului',
  'stocks-extended-hours': 'Conștient de riscul de extended-hours (gap-uri, lichiditate mică)',
  'stocks-borrow': 'Pentru short: borrow disponibil și rata e acceptabilă',
  'stocks-sector': 'Trendul sectorului se aliniază cu direcția mea',
};

export function getLibraryCategories(lang) {
  return lang === 'ro' ? LIBRARY_CATEGORIES.map(c => CATEGORY_RO[c] || c) : LIBRARY_CATEGORIES;
}

export function getLibraryItems(lang) {
  if (lang !== 'ro') return LIBRARY_ITEMS;
  return LIBRARY_ITEMS.map(it => ({
    ...it,
    category: CATEGORY_RO[it.category] || it.category,
    text: ITEMS_RO[it.id] || it.text,
  }));
}
