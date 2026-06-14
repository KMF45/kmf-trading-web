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

// ─── German overlay (keyed by stable item id; trading terms kept English) ───
const CATEGORY_DE = {
  'Market Context': 'Marktkontext',
  'Setup': 'Setup',
  'Entry': 'Einstieg',
  'Risk': 'Risiko',
  'Psychology': 'Psychologie',
  'Execution': 'Ausführung',
  'Post-Trade Plan': 'Plan nach dem Trade',
  'Prop Firm': 'Prop Firm',
  'News Trading': 'News-Trading',
  'Scalping': 'Scalping',
  'Swing & Position': 'Swing & Position',
  'Crypto-Specific': 'Krypto-spezifisch',
  'Stocks-Specific': 'Aktien-spezifisch',
};

const ITEMS_DE = {
  'mkt-news-30': 'Keine High-Impact-News in den nächsten 30 Minuten',
  'mkt-news-2h': 'Keine High-Impact-News in den nächsten 2 Stunden',
  'mkt-news-24h': 'Keine großen Wirtschaftsereignisse in den nächsten 24 Stunden',
  'mkt-session': 'Ich trade in einer liquiden Session für dieses Instrument',
  'mkt-spread': 'Der Spread ist normal (nicht vor News oder durch geringe Liquidität geweitet)',
  'mkt-volatility': 'Die aktuelle Volatilität (ATR) liegt in meiner normalen Trading-Spanne',
  'mkt-htf-bias': 'Der Higher-Timeframe-Bias (Daily/Weekly) ist klar und notiert',
  'mkt-key-levels': 'Schlüsselzonen (S/R, Supply/Demand, VWAP) sind im Chart markiert',

  'setup-rules': 'Dieses Setup erfüllt meine Strategie-Regeln zu 100% — nicht zu 80%',
  'setup-htf-confirm': 'Die Higher-Timeframe-Richtung bestätigt meine Einstiegsrichtung',
  'setup-confluence': 'Mindestens 2 unabhängige Konfluenzen sind vorhanden',
  'setup-not-mid-range': 'Der Preis steckt nicht ohne klaren Edge in der Mitte der Range',
  'setup-rationale': 'Ich kann den Einstiegsgrund in EINEM Satz beschreiben',
  'setup-screenshot-pre': 'Screenshot vor dem Einstieg erfasst (HTF + Einstiegs-TF)',
  'setup-no-chase': 'Ich jage NICHT — das Setup bildete sich, bevor ich die Bewegung bemerkte',
  'setup-prior-fail': 'Heute kein zuvor gescheitertes Setup auf genau diesem Level',

  'entry-trigger': 'Ein konkreter Einstiegs-Trigger hat ausgelöst (nicht nur „sieht gut aus")',
  'entry-limit-vs-market': 'Order-Typ bewusst gewählt (Limit vs Market vs Stop)',
  'entry-slippage': 'Slippage-Toleranz für den aktuellen Spread akzeptabel',
  'entry-time-of-day': 'Die Uhrzeit passt dazu, wann dieses Setup historisch funktioniert',

  'risk-1pct': 'Positionsgröße = 1% des Kontos oder weniger',
  'risk-0_5pct': 'Positionsgröße = 0.5% des Kontos (konservativer Modus)',
  'risk-sl-defined': 'Der Stop Loss ist vordefiniert, an der Struktur platziert',
  'risk-sl-immovable': 'Ich werde den Stop Loss NICHT gegen mich verschieben, egal was passiert',
  'risk-rr-1-2': 'Das R:R ist mindestens 1:2, bevor ich den Trade in Betracht ziehe',
  'risk-rr-1-3': 'Das R:R ist mindestens 1:3 (strenger Modus)',
  'risk-daily-dd': 'Der verbleibende Daily Drawdown ist größer als das Risiko dieses Trades',
  'risk-correlation': 'Keine korrelierte offene Position, die mein echtes Exposure verdoppelt',
  'risk-lot-calc': 'Lot-Size mit dem Lot-Rechner geprüft (kein Kopfrechnen)',
  'risk-max-loss': 'Den Worst-Case-Dollarverlust kann ich ruhig verkraften',

  'psy-calm': 'Emotionaler Zustand jetzt: ruhig und fokussiert',
  'psy-not-tilted': 'Nicht auf Tilt, nicht aus Rache, jage keinem vorherigen Verlust hinterher',
  'psy-not-fomo': 'Ich steige nicht aus FOMO ein (Angst, die Bewegung zu verpassen)',
  'psy-plan-driven': 'Dieser Trade ist planbasiert, nicht „ich brauche jetzt einen Trade"',
  'psy-last-trade': 'Ich habe meinen letzten Trade vollständig verarbeitet (gewonnen, verloren oder Pause)',
  'psy-break': 'Ich habe seit meinem letzten Trade mindestens eine kurze Pause gemacht',
  'psy-life-state': 'Keine große Ablenkung im Leben (Schlafmangel, Streit, Krankheit)',
  'psy-walk-away': 'Ich bin bereit, nach dem Einstieg vom Bildschirm wegzugehen',

  'exec-tp-set': 'Take Profit ist auf einem logischen Level gesetzt (nicht zufällig)',
  'exec-triple-check': 'Einstieg, SL, TP und Lot-Size dreifach geprüft — keine Tippfehler',
  'exec-direction': 'Richtung Buy vs Sell ist korrekt (richtigen Button geklickt)',
  'exec-account': 'Richtiges Trading-Konto ausgewählt (Live vs Demo vs Prop)',
  'exec-instrument': 'Richtiges Instrument ausgewählt (z. B. EURUSD vs EURJPY)',
  'exec-screenshot': 'Screenshot nach dem Einstieg fürs Journal gespeichert',
  'exec-journal': 'Trade-Begründung vor der Ausführung im Journal festgehalten',

  'plan-manage': 'Management-Plan festgelegt: Set & Forget, Teilverkäufe oder Trailing',
  'plan-invalidation': 'Ich weiß, was dieses Setup ungültig macht, bevor der SL greift',
  'plan-be-rule': 'Break-even-Regel definiert (z. B. erst nach +1R auf BE ziehen)',
  'plan-partial': 'Levels für Teilschließungen definiert (oder ausdrücklich: keine Teilverkäufe)',
  'plan-time-stop': 'Time-Stop definiert, falls dies ein Momentum-Setup ist',

  'prop-daily-dd': 'Dieser Trade hält mich unter dem Daily-Drawdown-Limit',
  'prop-max-dd': 'Dieser Trade hält mich unter dem gesamten Max-Drawdown-Limit',
  'prop-min-days': 'Die Anforderung an die Mindesthandelstage ist auf Kurs',
  'prop-no-weekend': 'Kein verbotenes Halten über das Wochenende (Firmenregeln prüfen)',
  'prop-no-news': 'Kein verbotenes News-Trading (Firmenregeln prüfen)',
  'prop-consistency': 'Risiko pro Trade ist konsistent mit den Vortagen (kein Verdoppeln)',

  'news-decision': 'Entscheidung getroffen: durchtraden / faden / aussetzen — nicht „mal sehen, was passiert"',
  'news-spread-widen': 'Mir der Spread-Ausweitung zum Veröffentlichungszeitpunkt bewusst',
  'news-stop-runs': 'Mir wahrscheinlicher Stop Runs in beide Richtungen bewusst',
  'news-position-reduced': 'Positionsgröße für die erhöhte Volatilität reduziert',

  'scalp-spread-ratio': 'Der Spread ist kleiner als 25% des Ziel-Abstands',
  'scalp-commission': 'Kommissionskosten im Erwartungswert berücksichtigt',
  'scalp-execution-speed': 'Order-Platzierung ist schnell — kein Gefummel am Trigger',
  'scalp-no-revenge': 'Kein Revenge-Scalp nach einem Verlust in den letzten 5 Minuten',

  'swing-overnight': 'Komfortabel, über Overnight-Gaps zu halten',
  'swing-weekend': 'Komfortabel, bei Bedarf über das Wochenende zu halten',
  'swing-swap': 'Swap-/Finanzierungskosten berücksichtigt',
  'swing-event-calendar': 'Kein großes Ereignis (Earnings, CPI, Zentralbank) innerhalb der Trade-Dauer',

  'crypto-funding': 'Funding Rate geprüft (besonders bei Perpetuals)',
  'crypto-liquidation': 'Der Liquidationspreis ist angesichts meines Leverage weit vom Einstieg entfernt',
  'crypto-exchange': 'Die Exchange ist die richtige für diesen Trade (Spot vs Perp)',
  'crypto-weekend-ok': 'Mir bewusst, dass Krypto 24/7 läuft — ich habe einen Plan, falls ich durch Volatilität schlafe',

  'stocks-earnings': 'Keine Earnings-Veröffentlichung innerhalb der Trade-Dauer',
  'stocks-extended-hours': 'Mir des Extended-Hours-Risikos bewusst (Gaps, geringe Liquidität)',
  'stocks-borrow': 'Für Short: Borrow verfügbar und die Rate ist akzeptabel',
  'stocks-sector': 'Der Sektor-Trend deckt sich mit meiner Richtung',
};

// ─── French overlay (keyed by stable item id; trading terms kept English) ───
const CATEGORY_FR = {
  'Market Context': 'Contexte de marché',
  'Setup': 'Setup',
  'Entry': 'Entrée',
  'Risk': 'Risque',
  'Psychology': 'Psychologie',
  'Execution': 'Exécution',
  'Post-Trade Plan': 'Plan post-trade',
  'Prop Firm': 'Prop Firm',
  'News Trading': 'Trading sur news',
  'Scalping': 'Scalping',
  'Swing & Position': 'Swing & Position',
  'Crypto-Specific': 'Spécifique crypto',
  'Stocks-Specific': 'Spécifique actions',
};

const ITEMS_FR = {
  'mkt-news-30': 'Aucune news à fort impact dans les 30 prochaines minutes',
  'mkt-news-2h': 'Aucune news à fort impact dans les 2 prochaines heures',
  'mkt-news-24h': 'Aucun événement économique majeur dans les 24 prochaines heures',
  'mkt-session': 'Je trade pendant une session liquide pour cet instrument',
  'mkt-spread': 'Le spread est normal (pas élargi avant news ou par faible liquidité)',
  'mkt-volatility': 'La volatilité actuelle (ATR) est dans ma plage de trading normale',
  'mkt-htf-bias': 'Le biais en higher-timeframe (daily/weekly) est clair et noté',
  'mkt-key-levels': 'Les niveaux clés (S/R, supply/demand, VWAP) sont marqués sur le graphique',

  'setup-rules': 'Ce setup respecte mes règles de stratégie à 100 % — pas à 80 %',
  'setup-htf-confirm': 'La direction en higher-timeframe confirme ma direction d\'entrée',
  'setup-confluence': 'Au moins 2 confluences indépendantes sont présentes',
  'setup-not-mid-range': 'Le prix n\'est pas coincé au milieu du range sans avantage clair',
  'setup-rationale': 'Je peux décrire la raison de l\'entrée en UNE seule phrase',
  'setup-screenshot-pre': 'Capture avant entrée prise (HTF + TF d\'entrée)',
  'setup-no-chase': 'Je ne cours PAS après le prix — le setup s\'est formé avant que je remarque le mouvement',
  'setup-prior-fail': 'Aucun setup échoué auparavant à ce niveau exact aujourd\'hui',

  'entry-trigger': 'Un déclencheur d\'entrée précis s\'est activé (pas seulement « ça a l\'air bien »)',
  'entry-limit-vs-market': 'Type d\'ordre choisi consciemment (limit vs market vs stop)',
  'entry-slippage': 'La tolérance au slippage est acceptable pour le spread actuel',
  'entry-time-of-day': 'L\'heure de la journée correspond au moment où ce setup performe historiquement',

  'risk-1pct': 'Taille de position = 1 % du compte ou moins',
  'risk-0_5pct': 'Taille de position = 0.5 % du compte (mode conservateur)',
  'risk-sl-defined': 'Le stop loss est prédéfini, placé sur la structure',
  'risk-sl-immovable': 'Je ne déplacerai PAS le stop loss contre moi, quoi qu\'il arrive',
  'risk-rr-1-2': 'Le R:R est d\'au moins 1:2 avant que je considère le trade',
  'risk-rr-1-3': 'Le R:R est d\'au moins 1:3 (mode strict)',
  'risk-daily-dd': 'Le daily drawdown restant est supérieur au risque de ce trade',
  'risk-correlation': 'Aucune position corrélée ouverte qui double mon exposition réelle',
  'risk-lot-calc': 'Taille de lot vérifiée avec le calculateur de lot (pas de calcul mental)',
  'risk-max-loss': 'La perte en dollars dans le pire cas est quelque chose que je peux encaisser calmement',

  'psy-calm': 'État émotionnel maintenant : calme et concentré',
  'psy-not-tilted': 'Pas sur le tilt, pas dans la revanche, je ne cours pas après une perte précédente',
  'psy-not-fomo': 'Je n\'entre pas par FOMO (peur de rater le mouvement)',
  'psy-plan-driven': 'Ce trade est guidé par le plan, pas par « j\'ai besoin d\'un trade maintenant »',
  'psy-last-trade': 'J\'ai pleinement digéré mon dernier trade (gagné, perdu ou pause)',
  'psy-break': 'J\'ai pris au moins une courte pause depuis mon dernier trade',
  'psy-life-state': 'Aucune distraction majeure dans la vie (manque de sommeil, dispute, maladie)',
  'psy-walk-away': 'Je suis prêt à m\'éloigner de l\'écran après l\'entrée',

  'exec-tp-set': 'Le take profit est placé à un niveau logique (pas au hasard)',
  'exec-triple-check': 'Entrée, SL, TP et taille de lot vérifiés trois fois — aucune faute de frappe',
  'exec-direction': 'La direction Achat vs Vente est correcte (bon bouton cliqué)',
  'exec-account': 'Bon compte de trading sélectionné (live vs démo vs prop)',
  'exec-instrument': 'Bon instrument sélectionné (ex. EURUSD vs EURJPY)',
  'exec-screenshot': 'Capture après entrée enregistrée pour le journal',
  'exec-journal': 'Raison du trade consignée dans le journal avant l\'exécution',

  'plan-manage': 'Plan de gestion décidé : set & forget, partiels ou trailing',
  'plan-invalidation': 'Je sais ce qui invalide ce setup avant que le SL ne soit touché',
  'plan-be-rule': 'Règle de break-even définie (ex. passer à BE seulement après +1R)',
  'plan-partial': 'Niveaux de clôture partielle définis (ou explicitement : pas de partiels)',
  'plan-time-stop': 'Time stop défini si c\'est un setup de momentum',

  'prop-daily-dd': 'Ce trade me maintient sous la limite de daily drawdown',
  'prop-max-dd': 'Ce trade me maintient sous la limite totale de max drawdown',
  'prop-min-days': 'L\'exigence de jours de trading minimum est sur la bonne voie',
  'prop-no-weekend': 'Aucune détention interdite le week-end (vérifier les règles de la firme)',
  'prop-no-news': 'Aucun trading sur news interdit (vérifier les règles de la firme)',
  'prop-consistency': 'Le risque par trade est cohérent avec les jours précédents (pas de doublement)',

  'news-decision': 'Décision prise : trader à travers / fader / rester à l\'écart — pas « on verra bien »',
  'news-spread-widen': 'Conscient de l\'élargissement du spread au moment de la publication',
  'news-stop-runs': 'Conscient des probables chasses aux stops dans les deux sens',
  'news-position-reduced': 'Taille de position réduite pour la volatilité élevée',

  'scalp-spread-ratio': 'Le spread est inférieur à 25 % de la distance cible',
  'scalp-commission': 'Coût des commissions pris en compte dans l\'espérance',
  'scalp-execution-speed': 'Le passage d\'ordre est rapide — pas de tâtonnement sur le déclencheur',
  'scalp-no-revenge': 'Aucun scalp de revanche après une perte dans les 5 dernières minutes',

  'swing-overnight': 'À l\'aise pour tenir à travers les gaps overnight',
  'swing-weekend': 'À l\'aise pour tenir le week-end si nécessaire',
  'swing-swap': 'Coût de swap/financement pris en compte',
  'swing-event-calendar': 'Aucun événement majeur (earnings, CPI, banque centrale) pendant la durée du trade',

  'crypto-funding': 'Funding rate vérifié (surtout pour les perpetuals)',
  'crypto-liquidation': 'Le prix de liquidation est loin de l\'entrée compte tenu de mon levier',
  'crypto-exchange': 'L\'exchange est le bon pour ce trade (spot vs perp)',
  'crypto-weekend-ok': 'Conscient que la crypto se trade 24/7 — j\'ai un plan si je dors pendant la volatilité',

  'stocks-earnings': 'Aucune publication de résultats pendant la durée du trade',
  'stocks-extended-hours': 'Conscient du risque des heures étendues (gaps, faible liquidité)',
  'stocks-borrow': 'Pour un short : emprunt disponible et taux acceptable',
  'stocks-sector': 'La tendance du secteur s\'aligne avec ma direction',
};

// ─── Russian overlay (keyed by stable item id; trading terms kept English) ───
const CATEGORY_RU = {
  'Market Context': 'Контекст рынка',
  'Setup': 'Setup',
  'Entry': 'Вход',
  'Risk': 'Риск',
  'Psychology': 'Психология',
  'Execution': 'Исполнение',
  'Post-Trade Plan': 'План после сделки',
  'Prop Firm': 'Prop Firm',
  'News Trading': 'Торговля на новостях',
  'Scalping': 'Скальпинг',
  'Swing & Position': 'Свинг и позиция',
  'Crypto-Specific': 'Специфика крипто',
  'Stocks-Specific': 'Специфика акций',
};

const ITEMS_RU = {
  'mkt-news-30': 'Нет важных новостей в ближайшие 30 минут',
  'mkt-news-2h': 'Нет важных новостей в ближайшие 2 часа',
  'mkt-news-24h': 'Нет крупных экономических событий в ближайшие 24 часа',
  'mkt-session': 'Я торгую в ликвидную сессию для этого инструмента',
  'mkt-spread': 'Спред в норме (не расширен перед новостями или из-за низкой ликвидности)',
  'mkt-volatility': 'Текущая волатильность (ATR) в моём нормальном торговом диапазоне',
  'mkt-htf-bias': 'Bias на старшем таймфрейме (daily/weekly) ясен и отмечен',
  'mkt-key-levels': 'Ключевые уровни (S/R, supply/demand, VWAP) отмечены на графике',

  'setup-rules': 'Этот setup соответствует правилам стратегии на 100% — не на 80%',
  'setup-htf-confirm': 'Направление на старшем таймфрейме подтверждает моё направление входа',
  'setup-confluence': 'Присутствуют хотя бы 2 независимых конфлюенса',
  'setup-not-mid-range': 'Цена не застряла в середине диапазона без явного преимущества',
  'setup-rationale': 'Я могу описать причину входа ОДНИМ предложением',
  'setup-screenshot-pre': 'Скриншот до входа сделан (HTF + таймфрейм входа)',
  'setup-no-chase': 'Я НЕ гонюсь за ценой — setup сформировался до того, как я заметил движение',
  'setup-prior-fail': 'Сегодня нет ранее неудавшегося setup на точно этом уровне',

  'entry-trigger': 'Сработал конкретный триггер входа (не просто «выглядит хорошо»)',
  'entry-limit-vs-market': 'Тип ордера выбран осознанно (limit vs market vs stop)',
  'entry-slippage': 'Допуск проскальзывания приемлем для текущего спреда',
  'entry-time-of-day': 'Время суток соответствует тому, когда этот setup исторически работает',

  'risk-1pct': 'Размер позиции = 1% счёта или меньше',
  'risk-0_5pct': 'Размер позиции = 0.5% счёта (консервативный режим)',
  'risk-sl-defined': 'Stop loss задан заранее, размещён на структуре',
  'risk-sl-immovable': 'Я НЕ буду двигать stop loss против себя, что бы ни случилось',
  'risk-rr-1-2': 'R:R не менее 1:2, прежде чем я рассмотрю сделку',
  'risk-rr-1-3': 'R:R не менее 1:3 (строгий режим)',
  'risk-daily-dd': 'Оставшийся daily drawdown больше риска этой сделки',
  'risk-correlation': 'Нет коррелирующей открытой позиции, удваивающей мою реальную экспозицию',
  'risk-lot-calc': 'Размер лота проверен калькулятором лота (без расчётов в уме)',
  'risk-max-loss': 'Худший долларовый убыток — это то, что я могу спокойно перенести',

  'psy-calm': 'Эмоциональное состояние сейчас: спокоен и сосредоточен',
  'psy-not-tilted': 'Не на тильте, не в отыгрыше, не гонюсь за предыдущим убытком',
  'psy-not-fomo': 'Я не вхожу из-за FOMO (страх упустить движение)',
  'psy-plan-driven': 'Эта сделка управляется планом, а не «мне нужна сделка прямо сейчас»',
  'psy-last-trade': 'Я полностью обработал свою последнюю сделку (выиграл, проиграл или пауза)',
  'psy-break': 'Я сделал хотя бы короткий перерыв после последней сделки',
  'psy-life-state': 'Нет крупных жизненных отвлечений (недосып, ссора, болезнь)',
  'psy-walk-away': 'Я готов отойти от экрана после входа',

  'exec-tp-set': 'Take profit установлен на логичном уровне (не случайно)',
  'exec-triple-check': 'Вход, SL, TP и размер лота проверены трижды — без опечаток',
  'exec-direction': 'Направление Buy vs Sell верное (нажата правильная кнопка)',
  'exec-account': 'Выбран правильный торговый счёт (live vs demo vs prop)',
  'exec-instrument': 'Выбран правильный инструмент (напр. EURUSD vs EURJPY)',
  'exec-screenshot': 'Скриншот после входа сохранён для журнала',
  'exec-journal': 'Причина сделки записана в журнал до исполнения',

  'plan-manage': 'План управления выбран: set & forget, частичные закрытия или трейл',
  'plan-invalidation': 'Я знаю, что инвалидирует этот setup до срабатывания SL',
  'plan-be-rule': 'Правило безубытка задано (напр. перенос в BE только после +1R)',
  'plan-partial': 'Уровни частичного закрытия заданы (или явно: без частичных)',
  'plan-time-stop': 'Time stop задан, если это momentum-setup',

  'prop-daily-dd': 'Эта сделка удерживает меня под лимитом daily drawdown',
  'prop-max-dd': 'Эта сделка удерживает меня под общим лимитом max drawdown',
  'prop-min-days': 'Требование по минимальным торговым дням выполняется',
  'prop-no-weekend': 'Нет запрещённого удержания на выходных (проверь правила фирмы)',
  'prop-no-news': 'Нет запрещённой торговли на новостях (проверь правила фирмы)',
  'prop-consistency': 'Риск на сделку согласован с предыдущими днями (без удвоения)',

  'news-decision': 'Решение принято: торговать насквозь / fade / стоять в стороне — не «посмотрим, что будет»',
  'news-spread-widen': 'Осознаю расширение спреда в момент выхода новости',
  'news-stop-runs': 'Осознаю вероятные сборы стопов в обе стороны',
  'news-position-reduced': 'Размер позиции снижен под повышенную волатильность',

  'scalp-spread-ratio': 'Спред меньше 25% от дистанции до цели',
  'scalp-commission': 'Стоимость комиссии учтена в матожидании',
  'scalp-execution-speed': 'Выставление ордера быстрое — без возни на триггере',
  'scalp-no-revenge': 'Нет отыгрышного скальпа после убытка за последние 5 минут',

  'swing-overnight': 'Комфортно держать через ночные гэпы',
  'swing-weekend': 'Комфортно держать через выходные при необходимости',
  'swing-swap': 'Стоимость свопа/финансирования учтена',
  'swing-event-calendar': 'Нет крупного события (earnings, CPI, центробанк) внутри срока сделки',

  'crypto-funding': 'Funding rate проверена (особенно для перпетуалов)',
  'crypto-liquidation': 'Цена ликвидации далеко от входа с учётом моего плеча',
  'crypto-exchange': 'Биржа подходящая для этой сделки (spot vs perp)',
  'crypto-weekend-ok': 'Осознаю, что крипто торгуется 24/7 — у меня есть план, если просплю волатильность',

  'stocks-earnings': 'Нет публикации отчётности внутри срока сделки',
  'stocks-extended-hours': 'Осознаю риск расширенных часов (гэпы, низкая ликвидность)',
  'stocks-borrow': 'Для шорта: доступен borrow и ставка приемлема',
  'stocks-sector': 'Тренд сектора совпадает с моим направлением',
};

// ─── Japanese overlay (keyed by stable item id; trading terms kept English) ───
const CATEGORY_JA = {
  'Market Context': 'マーケット環境',
  'Setup': 'Setup',
  'Entry': 'エントリー',
  'Risk': 'リスク',
  'Psychology': '心理',
  'Execution': '執行',
  'Post-Trade Plan': 'トレード後の計画',
  'Prop Firm': 'Prop Firm',
  'News Trading': 'ニューストレード',
  'Scalping': 'スキャルピング',
  'Swing & Position': 'スイング & ポジション',
  'Crypto-Specific': '仮想通貨向け',
  'Stocks-Specific': '株式向け',
};

const ITEMS_JA = {
  'mkt-news-30': '今後30分以内に高インパクトのニュースがない',
  'mkt-news-2h': '今後2時間以内に高インパクトのニュースがない',
  'mkt-news-24h': '今後24時間以内に主要な経済イベントがない',
  'mkt-session': 'この銘柄にとって流動性のあるセッションでトレードしている',
  'mkt-spread': 'スプレッドが正常（ニュース前や低流動性での拡大がない）',
  'mkt-volatility': '現在のボラティリティ（ATR）が通常のトレード範囲内',
  'mkt-htf-bias': '上位足（daily/weekly）のバイアスが明確で記録済み',
  'mkt-key-levels': '主要レベル（S/R、supply/demand、VWAP）がチャートに記されている',

  'setup-rules': 'このsetupは戦略ルールに100%合致 — 80%ではない',
  'setup-htf-confirm': '上位足の方向がエントリー方向を裏付けている',
  'setup-confluence': '少なくとも2つの独立したコンフルエンスがある',
  'setup-not-mid-range': '価格が明確なエッジなくレンジ中央で停滞していない',
  'setup-rationale': 'エントリー理由を1文で説明できる',
  'setup-screenshot-pre': 'エントリー前のスクショ取得済み（HTF + エントリー足）',
  'setup-no-chase': '価格を追っていない — 動きに気づく前にsetupが形成された',
  'setup-prior-fail': '今日この同じレベルで失敗したsetupが先にない',

  'entry-trigger': '具体的なエントリートリガーが点灯した（単に「良さそう」ではない）',
  'entry-limit-vs-market': '注文タイプを意識的に選択（limit vs market vs stop）',
  'entry-slippage': '現在のスプレッドに対しスリッページ許容が妥当',
  'entry-time-of-day': '時間帯がこのsetupが歴史的に機能する時と一致',

  'risk-1pct': 'ポジションサイズ = 口座の1%以下',
  'risk-0_5pct': 'ポジションサイズ = 口座の0.5%（保守モード）',
  'risk-sl-defined': 'Stop lossは事前設定済み、構造に配置',
  'risk-sl-immovable': '何があってもstop lossを自分に不利に動かさない',
  'risk-rr-1-2': 'トレードを検討する前にR:Rが最低1:2',
  'risk-rr-1-3': 'R:Rが最低1:3（厳格モード）',
  'risk-daily-dd': '残りのdaily drawdownがこのトレードのリスクより大きい',
  'risk-correlation': '実際のエクスポージャーを倍にする相関した建玉がない',
  'risk-lot-calc': 'ロットサイズをロット計算機で確認（暗算なし）',
  'risk-max-loss': '最悪のドル損失を冷静に受け入れられる',

  'psy-calm': '今の感情状態：冷静で集中している',
  'psy-not-tilted': 'ティルトしていない、リベンジでない、前の損失を追っていない',
  'psy-not-fomo': 'FOMO（動きを逃す恐怖）でエントリーしていない',
  'psy-plan-driven': 'このトレードは計画主導、「今トレードが必要」ではない',
  'psy-last-trade': '前のトレードを完全に処理した（勝ち・負け・休止）',
  'psy-break': '前のトレードから少なくとも短い休憩を取った',
  'psy-life-state': '大きな生活上の妨げがない（睡眠不足、口論、病気）',
  'psy-walk-away': 'エントリー後に画面から離れる準備ができている',

  'exec-tp-set': 'Take profitが論理的なレベルに設定（ランダムでない）',
  'exec-triple-check': 'エントリー、SL、TP、ロットサイズを3回確認 — 入力ミスなし',
  'exec-direction': 'Buy vs Sellの方向が正しい（正しいボタンをクリック）',
  'exec-account': '正しいトレード口座を選択（live vs demo vs prop）',
  'exec-instrument': '正しい銘柄を選択（例：EURUSD vs EURJPY）',
  'exec-screenshot': 'エントリー後のスクショをジャーナル用に保存',
  'exec-journal': '執行前にトレード理由をジャーナルに記録',

  'plan-manage': '管理計画を決定：set & forget、部分決済、またはトレール',
  'plan-invalidation': 'SLが当たる前にこのsetupを無効にするものを知っている',
  'plan-be-rule': '建値ルールを定義（例：+1Rの後にのみBEへ）',
  'plan-partial': '部分決済レベルを定義（または明示的に：部分なし）',
  'plan-time-stop': 'momentum setupならtime stopを定義',

  'prop-daily-dd': 'このトレードでdaily drawdown上限を下回ったままにできる',
  'prop-max-dd': 'このトレードで総max drawdown上限を下回ったままにできる',
  'prop-min-days': '最低トレード日数の要件が順調',
  'prop-no-weekend': '禁止された週末保有がない（会社ルールを確認）',
  'prop-no-news': '禁止されたニューストレードがない（会社ルールを確認）',
  'prop-consistency': '1トレードあたりのリスクが前日と一貫（倍増なし）',

  'news-decision': '決断済み：突っ込む / フェード / 見送る —「様子を見る」ではない',
  'news-spread-widen': '発表時のスプレッド拡大を認識している',
  'news-stop-runs': '両方向の可能性のあるストップ狩りを認識している',
  'news-position-reduced': '高まるボラティリティに合わせポジションサイズを縮小',

  'scalp-spread-ratio': 'スプレッドがターゲット距離の25%未満',
  'scalp-commission': '手数料コストを期待値に織り込み済み',
  'scalp-execution-speed': '注文発注が速い — トリガーで手間取らない',
  'scalp-no-revenge': '直近5分以内の損失後のリベンジ・スキャルプがない',

  'swing-overnight': 'オーバーナイトのギャップを越えて保有できる',
  'swing-weekend': '必要なら週末を越えて保有できる',
  'swing-swap': 'スワップ/金利コストを織り込み済み',
  'swing-event-calendar': 'トレード期間内に主要イベント（earnings、CPI、中央銀行）がない',

  'crypto-funding': 'Funding rateを確認済み（特にperpetuals）',
  'crypto-liquidation': '自分のレバレッジを踏まえ清算価格がエントリーから遠い',
  'crypto-exchange': 'このトレードに適した取引所（spot vs perp）',
  'crypto-weekend-ok': '仮想通貨は24/7と認識 — ボラティリティ中に寝ても計画がある',

  'stocks-earnings': 'トレード期間内に決算発表がない',
  'stocks-extended-hours': '時間外取引のリスクを認識（ギャップ、低流動性）',
  'stocks-borrow': 'ショートの場合：借株が利用可能で金利が妥当',
  'stocks-sector': 'セクターのトレンドが自分の方向と一致',
};

// ─── Chinese overlay (keyed by stable item id; trading terms kept English) ───
const CATEGORY_ZH = {
  'Market Context': '市场环境',
  'Setup': 'Setup',
  'Entry': '入场',
  'Risk': '风险',
  'Psychology': '心理',
  'Execution': '执行',
  'Post-Trade Plan': '交易后计划',
  'Prop Firm': 'Prop Firm',
  'News Trading': '新闻交易',
  'Scalping': '剥头皮',
  'Swing & Position': '波段与头寸',
  'Crypto-Specific': '加密货币专属',
  'Stocks-Specific': '股票专属',
};

const ITEMS_ZH = {
  'mkt-news-30': '未来 30 分钟内没有高影响新闻',
  'mkt-news-2h': '未来 2 小时内没有高影响新闻',
  'mkt-news-24h': '未来 24 小时内没有重大经济事件',
  'mkt-session': '我在该品种流动性充足的时段交易',
  'mkt-spread': '点差正常（没有新闻前或低流动性的扩大）',
  'mkt-volatility': '当前波动率（ATR）在我正常的交易区间内',
  'mkt-htf-bias': '高周期（daily/weekly）偏向清晰且已记录',
  'mkt-key-levels': '关键位（S/R、supply/demand、VWAP）已在图上标出',

  'setup-rules': '此 setup 100% 符合我的策略规则 — 不是 80%',
  'setup-htf-confirm': '高周期方向确认了我的入场方向',
  'setup-confluence': '至少存在 2 个独立的共振',
  'setup-not-mid-range': '价格没有卡在区间中部、缺乏明确优势',
  'setup-rationale': '我能用一句话描述入场理由',
  'setup-screenshot-pre': '已截取入场前截图（HTF + 入场周期）',
  'setup-no-chase': '我没有追价 — setup 在我注意到价格变动之前就已形成',
  'setup-prior-fail': '今天在这个确切价位之前没有失败的 setup',

  'entry-trigger': '具体的入场触发已出现（不只是「看起来不错」）',
  'entry-limit-vs-market': '已有意识地选择订单类型（limit vs market vs stop）',
  'entry-slippage': '对当前点差而言滑点容忍度可接受',
  'entry-time-of-day': '一天中的时段与此 setup 历史上有效的时间相符',

  'risk-1pct': '仓位大小 = 账户的 1% 或更少',
  'risk-0_5pct': '仓位大小 = 账户的 0.5%（保守模式）',
  'risk-sl-defined': 'Stop loss 已预先设定，放在结构处',
  'risk-sl-immovable': '无论如何我都不会把 stop loss 往不利方向移动',
  'risk-rr-1-2': '在考虑这笔交易之前 R:R 至少为 1:2',
  'risk-rr-1-3': 'R:R 至少为 1:3（严格模式）',
  'risk-daily-dd': '剩余的 daily drawdown 大于这笔交易的风险',
  'risk-correlation': '没有使我真实敞口翻倍的相关持仓',
  'risk-lot-calc': '已用手数计算器核实手数（不靠心算）',
  'risk-max-loss': '最坏情况下的美元亏损是我能冷静承受的',

  'psy-calm': '此刻的情绪状态：冷静且专注',
  'psy-not-tilted': '没有上头，不在报复，不在追逐之前的亏损',
  'psy-not-fomo': '我不是因为 FOMO（怕错过行情）而入场',
  'psy-plan-driven': '这笔交易由计划驱动，而非「我现在需要一笔交易」',
  'psy-last-trade': '我已完全消化上一笔交易（赢、输或暂停）',
  'psy-break': '自上一笔交易以来我至少短暂休息过',
  'psy-life-state': '没有重大生活干扰（睡眠不足、争吵、生病）',
  'psy-walk-away': '我准备好在入场后离开屏幕',

  'exec-tp-set': 'Take profit 设在合理价位（不是随意）',
  'exec-triple-check': '入场、SL、TP 和手数已三次核对 — 没有输入错误',
  'exec-direction': '买/卖方向正确（点了正确的按钮）',
  'exec-account': '已选择正确的交易账户（live vs demo vs prop）',
  'exec-instrument': '已选择正确的品种（例如 EURUSD vs EURJPY）',
  'exec-screenshot': '入场后截图已保存到日志',
  'exec-journal': '执行前交易理由已记入日志',

  'plan-manage': '已决定管理计划：set & forget、分批或移动止损',
  'plan-invalidation': '我知道在 SL 触发前什么会使此 setup 失效',
  'plan-be-rule': '已定义保本规则（例如仅在 +1R 后移到 BE）',
  'plan-partial': '已定义分批平仓价位（或明确：不分批）',
  'plan-time-stop': '若这是动量 setup，已定义时间止损',

  'prop-daily-dd': '这笔交易让我保持在 daily drawdown 上限之下',
  'prop-max-dd': '这笔交易让我保持在总 max drawdown 上限之下',
  'prop-min-days': '最低交易天数要求进展正常',
  'prop-no-weekend': '没有被禁止的周末持仓（查看公司规则）',
  'prop-no-news': '没有被禁止的新闻交易（查看公司规则）',
  'prop-consistency': '单笔风险与前几天一致（没有翻倍）',

  'news-decision': '已做决定：穿越交易 / 反向 / 观望 — 而非「看看会怎样」',
  'news-spread-widen': '清楚发布时点差会扩大',
  'news-stop-runs': '清楚两个方向都可能扫止损',
  'news-position-reduced': '已为升高的波动率缩小仓位',

  'scalp-spread-ratio': '点差小于目标距离的 25%',
  'scalp-commission': '手续费成本已计入期望值',
  'scalp-execution-speed': '下单迅速 — 触发时不手忙脚乱',
  'scalp-no-revenge': '最近 5 分钟内亏损后没有报复性剥头皮',

  'swing-overnight': '能安心持仓穿越隔夜跳空',
  'swing-weekend': '必要时能安心持仓过周末',
  'swing-swap': '已计入掉期/融资成本',
  'swing-event-calendar': '交易持续期内没有重大事件（earnings、CPI、央行）',

  'crypto-funding': '已查看资金费率（尤其是 perpetuals）',
  'crypto-liquidation': '考虑到我的杠杆，强平价远离入场',
  'crypto-exchange': '该交易所适合这笔交易（spot vs perp）',
  'crypto-weekend-ok': '清楚加密货币 24/7 — 若我睡过波动，我有计划',

  'stocks-earnings': '交易持续期内没有财报发布',
  'stocks-extended-hours': '清楚盘后交易的风险（跳空、低流动性）',
  'stocks-borrow': '做空时：可借券且利率可接受',
  'stocks-sector': '板块趋势与我的方向一致',
};

const CATEGORY_OVERLAYS = { ro: CATEGORY_RO, de: CATEGORY_DE, fr: CATEGORY_FR, ru: CATEGORY_RU, ja: CATEGORY_JA, zh: CATEGORY_ZH };
const ITEMS_OVERLAYS = { ro: ITEMS_RO, de: ITEMS_DE, fr: ITEMS_FR, ru: ITEMS_RU, ja: ITEMS_JA, zh: ITEMS_ZH };

export function getLibraryCategories(lang) {
  const cat = CATEGORY_OVERLAYS[lang];
  return cat ? LIBRARY_CATEGORIES.map(c => cat[c] || c) : LIBRARY_CATEGORIES;
}

export function getLibraryItems(lang) {
  const cat = CATEGORY_OVERLAYS[lang];
  const items = ITEMS_OVERLAYS[lang];
  if (!cat && !items) return LIBRARY_ITEMS;
  return LIBRARY_ITEMS.map(it => ({
    ...it,
    category: (cat && cat[it.category]) || it.category,
    text: (items && items[it.id]) || it.text,
  }));
}
