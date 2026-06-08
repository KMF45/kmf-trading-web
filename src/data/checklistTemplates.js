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

// ─── Romanian templates (trading terms kept English; texts match the RO library) ───
const STARTER_TEMPLATES_RO = [
  {
    id: 'blank',
    name: 'Începe de la zero',
    description: 'Checklist gol. Construiește-l cum vrei tu, din librăria de sugestii sau cu items proprii.',
    categories: [],
  },
  {
    id: 'forex-day',
    name: 'Day Trader Forex',
    description: 'Pentru FX intraday. Sesiunile London/NY, risc strâns, execuție rapidă.',
    categories: [
      { name: 'Context de Piață', items: [
        'Fără știri high-impact în următoarele 30 de minute',
        'Tranzacționez în sesiunea London sau NY',
        'Spread-ul e normal (nu lărgit pre-știri sau de lichiditate mică)',
      ] },
      { name: 'Setup', items: [
        'Acest setup respectă regulile strategiei 100% — nu 80%',
        'Direcția pe higher-timeframe confirmă direcția intrării mele',
        'Pot descrie motivul intrării într-O singură frază',
      ] },
      { name: 'Risc', items: [
        'Position size = 1% din cont sau mai puțin',
        'Stop loss-ul e pre-definit, plasat la structură',
        'R:R e cel puțin 1:2 înainte să iau în calcul trade-ul',
      ] },
      { name: 'Psihologie', items: [
        'Starea emoțională acum: calm și concentrat',
        'Nu intru din FOMO (frica de a rata mișcarea)',
      ] },
      { name: 'Execuție', items: [
        'Entry, SL, TP și lot size verificate de trei ori — fără greșeli',
        'Motivul trade-ului logat în journal înainte de execuție',
      ] },
    ],
  },
  {
    id: 'swing',
    name: 'Swing Trader',
    description: 'Dețineri de la câteva zile la câteva săptămâni, orice piață. Decizii HTF-first.',
    categories: [
      { name: 'Context de Piață', items: [
        'Bias-ul pe higher-timeframe (daily/weekly) e clar și notat',
        'Niciun eveniment major (earnings, CPI, bancă centrală) în durata trade-ului',
      ] },
      { name: 'Setup', items: [
        'Sunt prezente cel puțin 2 confluențe independente',
        'Nivelurile cheie (S/R, supply/demand) marcate pe chart',
        'Pot descrie motivul intrării într-O singură frază',
      ] },
      { name: 'Risc', items: [
        'Position size = 1% din cont sau mai puțin',
        'Stop loss-ul e pre-definit, plasat la structură',
        'R:R e cel puțin 1:3',
        'Confortabil să țin poziția peste weekend dacă e nevoie',
      ] },
      { name: 'Plan Post-Trade', items: [
        'Plan de management decis: set & forget, partials sau trail',
        'Știu ce invalidează acest setup înainte să lovească SL-ul',
        'Regulă de break-even definită (ex. mută la BE doar după +1R)',
      ] },
      { name: 'Psihologie', items: [
        'NU alerg după preț — setup-ul s-a format înainte să observ mișcarea',
        'Sunt pregătit să mă ridic de la ecran după intrare',
      ] },
    ],
  },
  {
    id: 'prop-firm',
    name: 'Provocare Prop Firm',
    description: 'Pentru conturi funded. Regulile de drawdown domină fiecare decizie.',
    categories: [
      { name: 'Reguli Prop Firm', items: [
        'Acest trade mă ține sub limita de daily drawdown',
        'Acest trade mă ține sub limita totală de max drawdown',
        'Riscul per trade e consecvent cu zilele anterioare (fără dublare)',
        'Fără holding interzis peste weekend (verifică regulile firmei)',
        'Fără news trading interzis (verifică regulile firmei)',
      ] },
      { name: 'Setup', items: [
        'Acest setup respectă regulile strategiei 100% — nu 80%',
        'Direcția pe higher-timeframe confirmă direcția intrării mele',
      ] },
      { name: 'Risc', items: [
        'Position size = 0.5% din cont (mod conservator)',
        'Stop loss-ul e pre-definit și de neclintit împotriva mea',
        'R:R e cel puțin 1:2',
        'Nicio poziție corelată deschisă care îmi dublează expunerea reală',
      ] },
      { name: 'Psihologie', items: [
        'Nu încerc să „recuperez" după o zi proastă',
        'Starea emoțională acum: calm și concentrat',
      ] },
      { name: 'Execuție', items: [
        'Contul de trading corect selectat (prop, nu live sau demo)',
        'Verificat de trei ori: direcție, size, SL, TP',
      ] },
    ],
  },
  {
    id: 'crypto',
    name: 'Trader Crypto',
    description: 'Piețe 24/7, perps, funding rates, risc de gap cât dormi.',
    categories: [
      { name: 'Context de Piață', items: [
        'Conștient că crypto e 24/7 — am un plan dacă dorm peste volatilitate',
        'Niciun eveniment macro major în următoarele 24 de ore',
      ] },
      { name: 'Setup', items: [
        'Acest setup respectă regulile strategiei 100% — nu 80%',
        'Direcția pe higher-timeframe confirmă direcția intrării mele',
        'Pot descrie motivul intrării într-O singură frază',
      ] },
      { name: 'Mecanică Crypto', items: [
        'Funding rate verificat (mai ales pentru perpetuals)',
        'Prețul de lichidare e departe de intrare dat fiind leverage-ul meu',
        'Exchange-ul e cel potrivit pentru acest trade (spot vs perp)',
      ] },
      { name: 'Risc', items: [
        'Position size = 1% din cont sau mai puțin',
        'Stop loss-ul e pre-definit, plasat la structură',
        'R:R e cel puțin 1:2',
      ] },
      { name: 'Psihologie', items: [
        'Nu intru din FOMO (frica de a rata mișcarea)',
        'Starea emoțională acum: calm și concentrat',
      ] },
    ],
  },
];

export function getStarterTemplates(lang) {
  return lang === 'ro' ? STARTER_TEMPLATES_RO : STARTER_TEMPLATES;
}
