import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';

const OG_IMAGE = 'https://kmfjournal.com/tools/og/risk-of-ruin.png';
const PAGE_URL = 'https://kmfjournal.com/tools/risk-of-ruin';

const T = {
  en: {
    pageTitle: 'Risk of Ruin Calculator — Monte Carlo Simulation | K.M.F.',
    pageDesc: 'Calculate your probability of blowing your trading account. Monte Carlo simulation with equity curves, scenario analysis, and the math behind survival. Free, no signup.',
    ogAlt: 'Risk of Ruin Calculator — Monte Carlo Simulation',
    badge: 'Free Trading Tool',
    heroP: 'Will your trading account survive the next 500 trades? Enter your stats below and find out. The simulator runs 1,000 random trading sequences to show you the probability of a catastrophic drawdown.',
    presetsPrompt: "Don't know your stats yet? Start with a preset:",
    scenarios: [
      { label: 'Conservative', desc: '55% WR, 1.5:1 R:R, 0.5% risk' },
      { label: 'Standard', desc: '50% WR, 2:1 R:R, 1% risk' },
      { label: 'Aggressive', desc: '45% WR, 3:1 R:R, 2% risk' },
      { label: 'Scalper', desc: '65% WR, 0.8:1 R:R, 1% risk' },
      { label: 'Swing Trader', desc: '40% WR, 3:1 R:R, 1% risk' },
    ],
    statsTitle: 'Your Trading Statistics',
    statsSub: 'Find these in your trading journal or calculate from your last 30+ trades',
    winRate: 'Win Rate', winRateHint: 'How many of your trades are winners?', winRateEx: 'Ex: 50 winning trades out of 100 total = 50%',
    avgWin: 'Average Win Size', avgWinSuffix: '× risk', avgWinHint: 'How much do you make on average when you win, as a multiple of what you risked?', avgWinEx: 'Ex: Risk $100 per trade, avg win = $200 → enter 2',
    avgLoss: 'Average Loss Size', avgLossHint: 'How much do you lose on average when a trade fails? Usually 1 if you use fixed stops.', avgLossEx: 'Ex: Risk $100, avg loss = $100 → enter 1',
    riskPerTrade: 'Risk Per Trade', riskHint: 'What percentage of your account do you risk on each trade?', riskEx: 'Ex: $10,000 account, risk $100 per trade = 1%',
    simSettings: 'Simulation Settings',
    numTrades: 'Number of Trades to Simulate', numTradesHint: 'How many trades into the future to simulate', numTradesEx: '500 trades ≈ 1-2 years for most traders',
    ruinThreshold: 'Ruin Threshold', ruinSuffix: '% loss', ruinHint: "What drawdown level = 'ruin' for you?", ruinEx: '30% = account drops from $10,000 to $7,000',
    expPerTrade: 'Expectancy per trade',
    expStrong: (v) => `Strong edge — on average you gain ${v}× your risk per trade`,
    expSlight: (v, low) => `Slight edge — you make money over time, but slowly. ${low ? 'Consider improving entries or R:R.' : ''}`,
    expBreak: "Breakeven — your strategy doesn't make or lose money long-term",
    expLosing: (v) => `Losing strategy — on average you lose ${v}× your risk per trade. No amount of risk management saves a negative edge.`,
    probLabel: (thr) => `Probability of losing ${thr}% of your account`,
    ruinLabels: { excellent: 'Excellent — very safe', good: 'Good — acceptable risk', moderate: 'Moderate — consider reducing risk', risky: 'Risky — reduce risk per trade', dangerous: 'Dangerous — high chance of blowing account' },
    summary: (ror, thr, risk) => {
      if (ror < 0.5) return 'With these stats, your account is very safe. Out of 1,000 simulated trading sequences, almost none ended in ruin.';
      if (ror < 5) return `There's a small but real chance (${ror.toFixed(1)}%) your account could hit a ${thr}% drawdown. This is within acceptable range for most traders.`;
      if (ror < 15) return `About ${Math.round(ror)} out of 100 possible futures end with your account losing ${thr}%+. Consider reducing your risk per trade from ${risk}% to see how it improves.`;
      if (ror < 40) return `This is a dangerous level. In roughly ${Math.round(ror)} out of 100 simulated futures, your account hits a ${thr}% drawdown. Reduce your risk per trade — see the table below.`;
      return `Your account has a very high probability of blowing up. In ${Math.round(ror)} out of 100 simulated futures, the account loses ${thr}%+. You need to significantly reduce your risk per trade.`;
    },
    curvesTitle: 'Simulated Equity Curves',
    curvesSub: 'Each line = one possible future. Green lines grow, red lines that cross the dotted red line = ruin. Starting balance = 100%.',
    chartTradeAxis: 'Trade #', chartAcctAxis: 'Account %', chartStart: 'Start',
    chartRuin: (v) => `Ruin (${v}%)`,
    tipAfter: (l) => `After trade #${l}`,
    tipBest: (v) => `Best path: ${v}% of starting balance`,
    tipAvg: (v) => `Average: ${v}%`,
    tipWorst: (v) => `Worst path: ${v}%`,
    stats: { median: 'Median Outcome', medianHint: 'Half of simulations end above this', average: 'Average Outcome', averageHint: 'Mean final balance across all sims', best: 'Best Case', bestHint: 'Luckiest simulation path', dd: 'Avg Max Drawdown', ddHint: 'Average worst dip per simulation' },
    tableTitle: 'How Risk Per Trade Changes Everything',
    tableSub: (wr, aw, al) => `Same win rate (${wr}%) and same R:R (${aw}:${al}) — only changing how much you risk per trade. See how dramatically it affects your survival.`,
    thRisk: 'Risk Per Trade', thRor: 'Approx. Risk of Ruin', thAssess: 'Assessment',
    yourSetting: '(your setting)',
    assess: { safe: 'Very safe', acceptable: 'Acceptable', caution: 'Caution', dangerous: 'Dangerous', ruin: 'Almost certain ruin' },
    tableNote: '* Analytical approximation. Monte Carlo results above are more accurate because they account for compounding effects.',
    crossPrompt: 'Found your ideal risk per trade? Calculate the exact position size for your next trade.',
    crossButton: 'Open Lot Size Calculator',
    explainerToggle: 'What is this tool and how does it help me?',
    explainer: [
      <><strong className="text-kmf-text-primary">The problem:</strong> Even profitable traders can blow their accounts. A 60% win rate with great entries means nothing if one bad week of overleveraged trades wipes out months of gains. Most traders only find this out after it happens.</>,
      <><strong className="text-kmf-text-primary">What this tool does:</strong> It simulates your next 200-1,000+ trades using your actual statistics (win rate, reward:risk ratio, and how much you risk per trade). Instead of guessing, you see the probability of your account dropping below a level you can't recover from — before it happens.</>,
      <><strong className="text-kmf-text-primary">How it helps:</strong> If your risk of ruin is above 5%, the tool shows you exactly which parameter to change (usually: risk less per trade). You can test different scenarios instantly — "What if I risk 0.5% instead of 2%?" — and find the sweet spot between growth and survival.</>,
      <><strong className="text-kmf-text-primary">Where to find your numbers:</strong> If you use a trading journal (like the <Link to="/" className="text-kmf-accent hover:underline">K.M.F. app</Link>), your win rate and average R:R are calculated automatically. Without a journal, review your last 30+ trades and calculate: Win Rate = wins ÷ total trades × 100. Avg R:R = average profit on wins ÷ average loss on losses. If you're not sure, start with a preset below.</>,
    ],
    eduTitle: 'Understanding Risk of Ruin: The Math That Keeps You Alive',
    eduIntro: <>Every trader thinks about how much they could make. Almost no one thinks about how likely they are to lose everything first. Risk of Ruin answers the question every trader should ask before placing their next trade: <strong className="text-kmf-text-primary">"Given my actual statistics, what is the probability that my account hits a drawdown I cannot recover from?"</strong></>,
    exampleTitle: 'A Real Example',
    exampleP: 'Imagine two traders with identical strategies: 50% win rate, 2:1 reward-to-risk ratio. Both have positive expectancy. Trader A risks 1% per trade. Trader B risks 5% per trade. After 500 trades:',
    exampleA: <><strong className="text-kmf-text-primary">Trader A (1% risk)</strong>: Risk of ruin ≈ 0%. Account grows steadily. Losing streaks happen but are absorbable.</>,
    exampleB: <><strong className="text-kmf-text-primary">Trader B (5% risk)</strong>: Risk of ruin ≈ 25-40%. There is a very real chance this account doesn't survive the year. Same exact strategy.</>,
    exampleConcl: "The difference is not the strategy. It's the position sizing. This is the single most important lesson in trading risk management.",
    posExpTitle: "Why Positive Expectancy Isn't Enough",
    posExpP: <>A positive expectancy means your strategy makes money on average, over infinite trades. But you don't trade infinite trades — you trade in finite sequences, and those sequences include losing streaks. The question isn't <em>if</em> you'll have a losing streak, but <em>when</em>, and whether your account can survive it. This is why <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">the 1% risk rule</Link> exists.</>,
    chartReadTitle: 'How to Read the Equity Curve Chart',
    chartReadP: (n) => <>The chart shows 50 simulated "possible futures" for your account. Each line starts at 100% (your current balance) and shows what could happen over {n} trades. The horizontal dotted red line marks your ruin threshold. Lines that cross below it = ruined accounts. The more lines that cross below, the higher your risk of ruin.</>,
    leversTitle: 'The Three Levers You Control',
    lever1: <><strong className="text-kmf-text-primary">Win rate</strong> — improved through better entries, <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklists</Link>, and pattern refinement</>,
    lever2: <><strong className="text-kmf-text-primary">Reward:Risk ratio</strong> — improved through better <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss placement</Link> and target selection</>,
    lever3: <><strong className="text-kmf-text-primary">Risk per trade</strong> — the most impactful lever; calculated using <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">proper position sizing</Link></>,
    leversConcl: 'Of these three, risk per trade has the most dramatic effect. Even small changes (1% → 2%) can multiply your risk of ruin by 5-10×.',
    resultsTitle: 'What Your Results Mean',
    results: [
      <><span className="font-semibold" style={{ color: '#00E676' }}>Below 1%</span> — Your risk management is solid. Keep doing what you're doing.</>,
      <><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5%</span> — Acceptable for most traders, but consider reducing risk per trade for extra safety.</>,
      <><span className="font-semibold" style={{ color: '#FFB300' }}>5-10%</span> — You're operating with thin margins. A bad week could spiral.</>,
      <><span className="font-semibold" style={{ color: '#FF9800' }}>10-25%</span> — Significant danger. Reduce risk per trade immediately.</>,
      <><span className="font-semibold" style={{ color: '#FF5252' }}>Above 25%</span> — Your account is at serious risk. This is not a matter of if, but when.</>,
    ],
    faqHeading: 'Frequently Asked Questions',
    bottomSuite: 'Part of the K.M.F. free trading tools suite',
    bottomLot: 'Lot Size Calculator', bottomBlog: 'Trading Blog',
    faq: [
      { q: 'What is Risk of Ruin in trading?', a: 'Risk of Ruin is the probability that a trader will lose a specified percentage of their account (e.g., 30%) given their win rate, average win/loss ratio, and risk per trade. It quantifies how likely your account is to suffer a catastrophic drawdown based on your trading statistics.' },
      { q: 'Where do I find my win rate and average R:R?', a: 'If you use a trading journal (like the K.M.F. Trading Journal app), these stats are calculated automatically from your trade history. Without a journal, you can calculate manually: Win Rate = (winning trades ÷ total trades) × 100. Average R:R = average profit on winners ÷ average loss on losers. You need at least 30-50 trades for meaningful statistics.' },
      { q: 'How does the Monte Carlo simulation work?', a: 'The simulator runs 1,000 random trading sequences using your input statistics. Each simulation randomly determines whether each trade wins or loses (based on your win rate), then calculates the P&L (based on your R:R and risk %). By running many simulations, we see the full range of possible outcomes — including the probability of ruin.' },
      { q: 'What is a good Risk of Ruin percentage?', a: 'Professional traders aim for a Risk of Ruin below 1%. Under 5% is acceptable for most strategies. Anything above 10% means your risk parameters need adjustment — typically by reducing risk per trade or improving your win rate / R:R ratio.' },
      { q: 'What does "Average Win in R" mean?', a: 'R is your risk unit — the amount you risk on a single trade. If you risk $100 and your average winning trade makes $200, your average win is 2R (you made 2x your risk). If your average loss is $100, that is 1R. Most traders who use fixed stop losses have an average loss close to 1R.' },
      { q: 'Can I have a positive expectancy and still go broke?', a: 'Yes. A strategy with positive expectancy can still produce ruin if the risk per trade is too high. Even a strategy that wins 60% of the time with 2:1 R:R can blow up if you risk 10% per trade — a sequence of 5-6 losses (which will eventually happen) wipes out half the account.' },
      { q: 'How many trades should I simulate?', a: 'For most traders, 200-500 trades is realistic (that is roughly 1-2 years of active trading). If you are a scalper taking multiple trades per day, simulate 1,000+. The more trades you simulate, the more accurate the probability estimate becomes.' },
    ],
  },
  ro: {
    pageTitle: 'Risk of Ruin Calculator — Simulare Monte Carlo | K.M.F.',
    pageDesc: 'Calculează probabilitatea de a-ți distruge contul de trading. Simulare Monte Carlo cu curbe de echitate, analiză de scenarii și matematica supraviețuirii. Gratuit, fără înregistrare.',
    ogAlt: 'Risk of Ruin Calculator — Simulare Monte Carlo',
    badge: 'Unealtă gratuită',
    heroP: 'Va supraviețui contul tău următoarelor 500 de trade-uri? Introdu statisticile mai jos și află. Simulatorul rulează 1.000 de secvențe aleatorii de trading ca să-ți arate probabilitatea unui drawdown catastrofal.',
    presetsPrompt: 'Nu-ți știi încă statisticile? Pornește de la un preset:',
    scenarios: [
      { label: 'Conservator', desc: '55% WR, 1.5:1 R:R, 0.5% risc' },
      { label: 'Standard', desc: '50% WR, 2:1 R:R, 1% risc' },
      { label: 'Agresiv', desc: '45% WR, 3:1 R:R, 2% risc' },
      { label: 'Scalper', desc: '65% WR, 0.8:1 R:R, 1% risc' },
      { label: 'Swing Trader', desc: '40% WR, 3:1 R:R, 1% risc' },
    ],
    statsTitle: 'Statisticile tale de trading',
    statsSub: 'Le găsești în trading journal-ul tău sau le calculezi din ultimele 30+ trade-uri',
    winRate: 'Win Rate', winRateHint: 'Câte dintre trade-urile tale sunt câștigătoare?', winRateEx: 'Ex: 50 de trade-uri câștigătoare din 100 totale = 50%',
    avgWin: 'Câștig mediu', avgWinSuffix: '× risc', avgWinHint: 'Cât faci în medie când câștigi, ca multiplu al sumei riscate?', avgWinEx: 'Ex: Riști $100 per trade, câștig mediu = $200 → pune 2',
    avgLoss: 'Pierdere medie', avgLossHint: 'Cât pierzi în medie când un trade eșuează? De obicei 1 dacă folosești stop-uri fixe.', avgLossEx: 'Ex: Riști $100, pierdere medie = $100 → pune 1',
    riskPerTrade: 'Risc per Trade', riskHint: 'Ce procent din cont riști pe fiecare trade?', riskEx: 'Ex: cont de $10.000, riști $100 per trade = 1%',
    simSettings: 'Setări simulare',
    numTrades: 'Număr de trade-uri de simulat', numTradesHint: 'Câte trade-uri în viitor să simulăm', numTradesEx: '500 de trade-uri ≈ 1-2 ani pentru majoritatea traderilor',
    ruinThreshold: 'Prag de ruină', ruinSuffix: '% pierdere', ruinHint: 'Ce nivel de drawdown înseamnă ruină pentru tine?', ruinEx: '30% = contul scade de la $10.000 la $7.000',
    expPerTrade: 'Expectancy per trade',
    expStrong: (v) => `Edge puternic — în medie câștigi de ${v}× riscul tău per trade`,
    expSlight: (v, low) => `Edge ușor — faci bani în timp, dar încet. ${low ? 'Ia în calcul îmbunătățirea intrărilor sau a R:R.' : ''}`,
    expBreak: 'La break-even — strategia ta nu face și nu pierde bani pe termen lung',
    expLosing: (v) => `Strategie pierzătoare — în medie pierzi de ${v}× riscul tău per trade. Niciun risk management nu salvează un edge negativ.`,
    probLabel: (thr) => `Probabilitatea de a pierde ${thr}% din cont`,
    ruinLabels: { excellent: 'Excelent — foarte sigur', good: 'Bun — risc acceptabil', moderate: 'Moderat — ia în calcul reducerea riscului', risky: 'Riscant — redu riscul per trade', dangerous: 'Periculos — șansă mare să-ți distrugi contul' },
    summary: (ror, thr, risk) => {
      if (ror < 0.5) return 'Cu aceste statistici, contul tău e foarte sigur. Din 1.000 de secvențe simulate, aproape niciuna n-a ajuns la ruină.';
      if (ror < 5) return `Există o șansă mică, dar reală (${ror.toFixed(1)}%) ca contul tău să atingă un drawdown de ${thr}%. E în limita acceptabilă pentru majoritatea traderilor.`;
      if (ror < 15) return `Cam ${Math.round(ror)} din 100 de viitoruri posibile se termină cu contul pierzând ${thr}%+. Ia în calcul reducerea riscului per trade de la ${risk}% ca să vezi cum se îmbunătățește.`;
      if (ror < 40) return `Ăsta e un nivel periculos. În aproximativ ${Math.round(ror)} din 100 de viitoruri simulate, contul tău atinge un drawdown de ${thr}%. Redu riscul per trade — vezi tabelul de mai jos.`;
      return `Contul tău are o probabilitate foarte mare să explodeze. În ${Math.round(ror)} din 100 de viitoruri simulate, contul pierde ${thr}%+. Trebuie să reduci semnificativ riscul per trade.`;
    },
    curvesTitle: 'Curbe de echitate simulate',
    curvesSub: 'Fiecare linie = un viitor posibil. Liniile verzi cresc, cele roșii care trec de linia roșie punctată = ruină. Soldul de pornire = 100%.',
    chartTradeAxis: 'Trade #', chartAcctAxis: 'Cont %', chartStart: 'Start',
    chartRuin: (v) => `Ruină (${v}%)`,
    tipAfter: (l) => `După trade-ul #${l}`,
    tipBest: (v) => `Cel mai bun drum: ${v}% din soldul de pornire`,
    tipAvg: (v) => `Medie: ${v}%`,
    tipWorst: (v) => `Cel mai prost drum: ${v}%`,
    stats: { median: 'Rezultat median', medianHint: 'Jumătate din simulări se termină peste asta', average: 'Rezultat mediu', averageHint: 'Soldul final mediu pe toate simulările', best: 'Cel mai bun caz', bestHint: 'Cel mai norocos drum simulat', dd: 'Drawdown maxim mediu', ddHint: 'Cea mai proastă scădere medie per simulare' },
    tableTitle: 'Cum schimbă totul riscul per trade',
    tableSub: (wr, aw, al) => `Același win rate (${wr}%) și același R:R (${aw}:${al}) — schimbând doar cât riști per trade. Vezi cât de dramatic îți afectează supraviețuirea.`,
    thRisk: 'Risc per Trade', thRor: 'Risk of Ruin aprox.', thAssess: 'Evaluare',
    yourSetting: '(setarea ta)',
    assess: { safe: 'Foarte sigur', acceptable: 'Acceptabil', caution: 'Atenție', dangerous: 'Periculos', ruin: 'Ruină aproape sigură' },
    tableNote: '* Aproximare analitică. Rezultatele Monte Carlo de mai sus sunt mai exacte fiindcă țin cont de efectele de compunere.',
    crossPrompt: 'Ți-ai găsit riscul ideal per trade? Calculează mărimea exactă a poziției pentru următorul trade.',
    crossButton: 'Deschide Lot Size Calculator',
    explainerToggle: 'Ce e această unealtă și cum mă ajută?',
    explainer: [
      <><strong className="text-kmf-text-primary">Problema:</strong> Chiar și traderii profitabili își pot distruge conturile. Un win rate de 60% cu intrări grozave nu valorează nimic dacă o săptămână proastă de trade-uri suprariscante șterge luni de câștiguri. Cei mai mulți traderi află asta abia după ce se întâmplă.</>,
      <><strong className="text-kmf-text-primary">Ce face această unealtă:</strong> Simulează următoarele tale 200-1.000+ trade-uri folosind statisticile tale reale (win rate, raport reward:risk și cât riști per trade). În loc să ghicești, vezi probabilitatea ca contul tău să scadă sub un nivel din care nu-ți poți reveni — înainte să se întâmple.</>,
      <><strong className="text-kmf-text-primary">Cum te ajută:</strong> Dacă risk of ruin-ul tău e peste 5%, unealta îți arată exact ce parametru să schimbi (de obicei: riscă mai puțin per trade). Poți testa instant scenarii diferite — „Ce-ar fi dacă risc 0.5% în loc de 2%?" — și să găsești echilibrul dintre creștere și supraviețuire.</>,
      <><strong className="text-kmf-text-primary">Unde îți găsești cifrele:</strong> Dacă folosești un trading journal (ca <Link to="/" className="text-kmf-accent hover:underline">aplicația K.M.F.</Link>), win rate-ul și R:R-ul mediu se calculează automat. Fără journal, uită-te la ultimele 30+ trade-uri și calculează: Win Rate = câștiguri ÷ total trade-uri × 100. R:R mediu = profit mediu pe câștiguri ÷ pierdere medie pe pierderi. Dacă nu ești sigur, pornește de la un preset mai jos.</>,
    ],
    eduTitle: 'Înțelegerea Risk of Ruin: Matematica ce te ține în viață',
    eduIntro: <>Fiecare trader se gândește la cât ar putea face. Aproape nimeni nu se gândește la cât de probabil e să piardă tot mai întâi. Risk of Ruin răspunde la întrebarea pe care fiecare trader ar trebui s-o pună înainte de următorul trade: <strong className="text-kmf-text-primary">„Date fiind statisticile mele reale, care e probabilitatea ca contul meu să atingă un drawdown din care nu-mi pot reveni?"</strong></>,
    exampleTitle: 'Un exemplu real',
    exampleP: 'Imaginează-ți doi traderi cu strategii identice: 50% win rate, raport reward-to-risk 2:1. Ambii au expectancy pozitivă. Traderul A riscă 1% per trade. Traderul B riscă 5% per trade. După 500 de trade-uri:',
    exampleA: <><strong className="text-kmf-text-primary">Traderul A (1% risc)</strong>: Risk of ruin ≈ 0%. Contul crește constant. Seriile de pierderi apar, dar sunt absorbabile.</>,
    exampleB: <><strong className="text-kmf-text-primary">Traderul B (5% risc)</strong>: Risk of ruin ≈ 25-40%. E o șansă foarte reală ca acest cont să nu supraviețuiască anului. Exact aceeași strategie.</>,
    exampleConcl: 'Diferența nu e strategia. E position sizing-ul. Asta e cea mai importantă lecție din risk management-ul de trading.',
    posExpTitle: 'De ce expectancy pozitivă nu e suficientă',
    posExpP: <>O expectancy pozitivă înseamnă că strategia ta face bani în medie, pe trade-uri infinite. Dar tu nu tranzacționezi trade-uri infinite — tranzacționezi în secvențe finite, iar acele secvențe includ serii de pierderi. Întrebarea nu e <em>dacă</em> vei avea o serie de pierderi, ci <em>când</em>, și dacă contul tău poate supraviețui. De asta există <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">regula de 1%</Link>.</>,
    chartReadTitle: 'Cum citești graficul curbelor de echitate',
    chartReadP: (n) => <>Graficul arată 50 de „viitoruri posibile" simulate pentru contul tău. Fiecare linie pornește de la 100% (soldul tău curent) și arată ce s-ar putea întâmpla pe {n} trade-uri. Linia roșie punctată orizontală marchează pragul tău de ruină. Liniile care trec sub ea = conturi distruse. Cu cât trec mai multe linii sub ea, cu atât risk of ruin-ul tău e mai mare.</>,
    leversTitle: 'Cele trei pârghii pe care le controlezi',
    lever1: <><strong className="text-kmf-text-primary">Win rate</strong> — îmbunătățit prin intrări mai bune, <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklists</Link> și rafinarea pattern-urilor</>,
    lever2: <><strong className="text-kmf-text-primary">Raportul Reward:Risk</strong> — îmbunătățit prin <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">plasarea mai bună a stop loss-ului</Link> și alegerea target-urilor</>,
    lever3: <><strong className="text-kmf-text-primary">Risc per trade</strong> — pârghia cu cel mai mare impact; calculată prin <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">position sizing corect</Link></>,
    leversConcl: 'Dintre cele trei, riscul per trade are cel mai dramatic efect. Chiar și schimbări mici (1% → 2%) îți pot înmulți risk of ruin-ul de 5-10×.',
    resultsTitle: 'Ce înseamnă rezultatele tale',
    results: [
      <><span className="font-semibold" style={{ color: '#00E676' }}>Sub 1%</span> — Risk management-ul tău e solid. Continuă ce faci.</>,
      <><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5%</span> — Acceptabil pentru majoritatea traderilor, dar ia în calcul reducerea riscului per trade pentru siguranță în plus.</>,
      <><span className="font-semibold" style={{ color: '#FFB300' }}>5-10%</span> — Operezi cu marje subțiri. O săptămână proastă ar putea scăpa de sub control.</>,
      <><span className="font-semibold" style={{ color: '#FF9800' }}>10-25%</span> — Pericol semnificativ. Redu imediat riscul per trade.</>,
      <><span className="font-semibold" style={{ color: '#FF5252' }}>Peste 25%</span> — Contul tău e în pericol serios. Nu e o chestiune de dacă, ci de când.</>,
    ],
    faqHeading: 'Întrebări Frecvente',
    bottomSuite: 'Parte din suita gratuită de unelte de trading K.M.F.',
    bottomLot: 'Lot Size Calculator', bottomBlog: 'Blog de Trading',
    faq: [
      { q: 'Ce este Risk of Ruin în trading?', a: 'Risk of Ruin e probabilitatea ca un trader să piardă un anumit procent din cont (ex. 30%) dat fiind win rate-ul, raportul mediu câștig/pierdere și riscul per trade. Cuantifică cât de probabil e ca contul tău să sufere un drawdown catastrofal pe baza statisticilor tale de trading.' },
      { q: 'Unde îmi găsesc win rate-ul și R:R-ul mediu?', a: 'Dacă folosești un trading journal (ca aplicația K.M.F. Trading Journal), aceste statistici se calculează automat din istoricul trade-urilor. Fără journal, le poți calcula manual: Win Rate = (trade-uri câștigătoare ÷ total trade-uri) × 100. R:R mediu = profit mediu pe câștiguri ÷ pierdere medie pe pierderi. Ai nevoie de cel puțin 30-50 de trade-uri pentru statistici semnificative.' },
      { q: 'Cum funcționează simularea Monte Carlo?', a: 'Simulatorul rulează 1.000 de secvențe aleatorii de trading folosind statisticile tale. Fiecare simulare determină aleatoriu dacă fiecare trade câștigă sau pierde (pe baza win rate-ului), apoi calculează P&L-ul (pe baza R:R-ului și a riscului %). Rulând multe simulări, vedem întregul interval de rezultate posibile — inclusiv probabilitatea de ruină.' },
      { q: 'Ce procent de Risk of Ruin e bun?', a: 'Traderii profesioniști țintesc un Risk of Ruin sub 1%. Sub 5% e acceptabil pentru majoritatea strategiilor. Orice peste 10% înseamnă că parametrii tăi de risc au nevoie de ajustare — de obicei reducând riscul per trade sau îmbunătățind win rate-ul / raportul R:R.' },
      { q: 'Ce înseamnă „Câștig mediu în R"?', a: 'R e unitatea ta de risc — suma riscată pe un singur trade. Dacă riști $100 și trade-ul tău mediu câștigător face $200, câștigul tău mediu e 2R (ai făcut de 2x riscul). Dacă pierderea ta medie e $100, asta e 1R. Cei mai mulți traderi care folosesc stop loss-uri fixe au o pierdere medie apropiată de 1R.' },
      { q: 'Pot avea expectancy pozitivă și tot să dau faliment?', a: 'Da. O strategie cu expectancy pozitivă poate tot duce la ruină dacă riscul per trade e prea mare. Chiar și o strategie care câștigă 60% din timp cu R:R 2:1 poate exploda dacă riști 10% per trade — o secvență de 5-6 pierderi (care se va întâmpla la un moment dat) șterge jumătate din cont.' },
      { q: 'Câte trade-uri ar trebui să simulez?', a: 'Pentru majoritatea traderilor, 200-500 de trade-uri e realist (cam 1-2 ani de trading activ). Dacă ești scalper și faci mai multe trade-uri pe zi, simulează 1.000+. Cu cât simulezi mai multe trade-uri, cu atât estimarea probabilității devine mai exactă.' },
    ],
  },
  de: {
    pageTitle: 'Risk-of-Ruin-Rechner — Monte-Carlo-Simulation | K.M.F.',
    pageDesc: 'Berechne die Wahrscheinlichkeit, dein Trading-Konto zu sprengen. Monte-Carlo-Simulation mit Equity-Kurven, Szenarioanalyse und der Mathematik des Überlebens. Kostenlos, ohne Anmeldung.',
    ogAlt: 'Risk-of-Ruin-Rechner — Monte-Carlo-Simulation',
    badge: 'Kostenloses Trading-Tool',
    heroP: 'Übersteht dein Trading-Konto die nächsten 500 Trades? Gib unten deine Statistiken ein und finde es heraus. Der Simulator führt 1.000 zufällige Trading-Sequenzen aus, um dir die Wahrscheinlichkeit eines katastrophalen Drawdowns zu zeigen.',
    presetsPrompt: 'Kennst du deine Statistiken noch nicht? Starte mit einer Voreinstellung:',
    scenarios: [
      { label: 'Konservativ', desc: '55% WR, 1.5:1 R:R, 0.5% Risiko' },
      { label: 'Standard', desc: '50% WR, 2:1 R:R, 1% Risiko' },
      { label: 'Aggressiv', desc: '45% WR, 3:1 R:R, 2% Risiko' },
      { label: 'Scalper', desc: '65% WR, 0.8:1 R:R, 1% Risiko' },
      { label: 'Swing-Trader', desc: '40% WR, 3:1 R:R, 1% Risiko' },
    ],
    statsTitle: 'Deine Trading-Statistiken',
    statsSub: 'Du findest sie in deinem Trading-Journal oder berechnest sie aus deinen letzten 30+ Trades',
    winRate: 'Win Rate', winRateHint: 'Wie viele deiner Trades sind Gewinner?', winRateEx: 'Bsp.: 50 gewinnende Trades von 100 insgesamt = 50%',
    avgWin: 'Durchschnittlicher Gewinn', avgWinSuffix: '× Risiko', avgWinHint: 'Wie viel gewinnst du im Schnitt, als Vielfaches deines Risikos?', avgWinEx: 'Bsp.: $100 Risiko pro Trade, Ø-Gewinn = $200 → gib 2 ein',
    avgLoss: 'Durchschnittlicher Verlust', avgLossHint: 'Wie viel verlierst du im Schnitt, wenn ein Trade scheitert? Meist 1 bei festen Stops.', avgLossEx: 'Bsp.: $100 Risiko, Ø-Verlust = $100 → gib 1 ein',
    riskPerTrade: 'Risiko pro Trade', riskHint: 'Wie viel Prozent deines Kontos riskierst du pro Trade?', riskEx: 'Bsp.: $10.000 Konto, $100 Risiko pro Trade = 1%',
    simSettings: 'Simulationseinstellungen',
    numTrades: 'Anzahl der zu simulierenden Trades', numTradesHint: 'Wie viele Trades in die Zukunft simuliert werden', numTradesEx: '500 Trades ≈ 1-2 Jahre für die meisten Trader',
    ruinThreshold: 'Ruin-Schwelle', ruinSuffix: '% Verlust', ruinHint: 'Welcher Drawdown bedeutet für dich „Ruin"?', ruinEx: '30% = Konto fällt von $10.000 auf $7.000',
    expPerTrade: 'Erwartungswert pro Trade',
    expStrong: (v) => `Starker Edge — im Schnitt gewinnst du das ${v}-Fache deines Risikos pro Trade`,
    expSlight: (v, low) => `Leichter Edge — du verdienst über die Zeit Geld, aber langsam. ${low ? 'Verbessere ggf. Einstiege oder R:R.' : ''}`,
    expBreak: 'Break-even — deine Strategie gewinnt und verliert langfristig kein Geld',
    expLosing: (v) => `Verlierende Strategie — im Schnitt verlierst du das ${v}-Fache deines Risikos pro Trade. Kein Risikomanagement rettet einen negativen Edge.`,
    probLabel: (thr) => `Wahrscheinlichkeit, ${thr}% deines Kontos zu verlieren`,
    ruinLabels: { excellent: 'Ausgezeichnet — sehr sicher', good: 'Gut — akzeptables Risiko', moderate: 'Moderat — Risiko ggf. reduzieren', risky: 'Riskant — Risiko pro Trade senken', dangerous: 'Gefährlich — hohe Chance, das Konto zu sprengen' },
    summary: (ror, thr, risk) => {
      if (ror < 0.5) return 'Mit diesen Statistiken ist dein Konto sehr sicher. Von 1.000 simulierten Trading-Sequenzen endete fast keine im Ruin.';
      if (ror < 5) return `Es besteht eine kleine, aber reale Chance (${ror.toFixed(1)}%), dass dein Konto einen Drawdown von ${thr}% erreicht. Das liegt im akzeptablen Bereich für die meisten Trader.`;
      if (ror < 15) return `Etwa ${Math.round(ror)} von 100 möglichen Zukünften enden damit, dass dein Konto ${thr}%+ verliert. Reduziere ggf. dein Risiko pro Trade von ${risk}%, um zu sehen, wie es sich verbessert.`;
      if (ror < 40) return `Das ist ein gefährliches Niveau. In rund ${Math.round(ror)} von 100 simulierten Zukünften erreicht dein Konto einen Drawdown von ${thr}%. Senke dein Risiko pro Trade — siehe Tabelle unten.`;
      return `Dein Konto hat eine sehr hohe Wahrscheinlichkeit zu sprengen. In ${Math.round(ror)} von 100 simulierten Zukünften verliert das Konto ${thr}%+. Du musst dein Risiko pro Trade deutlich senken.`;
    },
    curvesTitle: 'Simulierte Equity-Kurven',
    curvesSub: 'Jede Linie = eine mögliche Zukunft. Grüne Linien wachsen, rote Linien, die die gepunktete rote Linie kreuzen = Ruin. Startsaldo = 100%.',
    chartTradeAxis: 'Trade #', chartAcctAxis: 'Konto %', chartStart: 'Start',
    chartRuin: (v) => `Ruin (${v}%)`,
    tipAfter: (l) => `Nach Trade #${l}`,
    tipBest: (v) => `Bester Pfad: ${v}% des Startsaldos`,
    tipAvg: (v) => `Durchschnitt: ${v}%`,
    tipWorst: (v) => `Schlechtester Pfad: ${v}%`,
    stats: { median: 'Median-Ergebnis', medianHint: 'Die Hälfte der Simulationen endet darüber', average: 'Durchschnittsergebnis', averageHint: 'Mittlerer Endsaldo über alle Simulationen', best: 'Bester Fall', bestHint: 'Glücklichster Simulationspfad', dd: 'Ø max. Drawdown', ddHint: 'Durchschnittlich schlimmster Einbruch pro Simulation' },
    tableTitle: 'Wie das Risiko pro Trade alles verändert',
    tableSub: (wr, aw, al) => `Gleiche Win Rate (${wr}%) und gleiches R:R (${aw}:${al}) — nur die Höhe des Risikos pro Trade ändert sich. Sieh, wie dramatisch das dein Überleben beeinflusst.`,
    thRisk: 'Risiko pro Trade', thRor: 'Ungefährer Risk of Ruin', thAssess: 'Bewertung',
    yourSetting: '(deine Einstellung)',
    assess: { safe: 'Sehr sicher', acceptable: 'Akzeptabel', caution: 'Vorsicht', dangerous: 'Gefährlich', ruin: 'Fast sicherer Ruin' },
    tableNote: '* Analytische Näherung. Die Monte-Carlo-Ergebnisse oben sind genauer, da sie Zinseszinseffekte berücksichtigen.',
    crossPrompt: 'Dein ideales Risiko pro Trade gefunden? Berechne die genaue Positionsgröße für deinen nächsten Trade.',
    crossButton: 'Lot-Size-Rechner öffnen',
    explainerToggle: 'Was ist dieses Tool und wie hilft es mir?',
    explainer: [
      <><strong className="text-kmf-text-primary">Das Problem:</strong> Selbst profitable Trader können ihre Konten sprengen. Eine Win Rate von 60% mit großartigen Einstiegen ist nichts wert, wenn eine schlechte Woche überhebelter Trades Monate an Gewinnen auslöscht. Die meisten Trader merken das erst, nachdem es passiert ist.</>,
      <><strong className="text-kmf-text-primary">Was dieses Tool tut:</strong> Es simuliert deine nächsten 200-1.000+ Trades anhand deiner tatsächlichen Statistiken (Win Rate, Reward:Risk-Verhältnis und wie viel du pro Trade riskierst). Statt zu raten, siehst du die Wahrscheinlichkeit, dass dein Konto unter ein Niveau fällt, von dem du dich nicht erholen kannst — bevor es passiert.</>,
      <><strong className="text-kmf-text-primary">Wie es hilft:</strong> Liegt dein Risk of Ruin über 5%, zeigt dir das Tool genau, welchen Parameter du ändern solltest (meist: weniger pro Trade riskieren). Du kannst sofort verschiedene Szenarien testen — „Was, wenn ich 0.5% statt 2% riskiere?" — und den optimalen Punkt zwischen Wachstum und Überleben finden.</>,
      <><strong className="text-kmf-text-primary">Wo du deine Zahlen findest:</strong> Wenn du ein Trading-Journal nutzt (wie die <Link to="/" className="text-kmf-accent hover:underline">K.M.F.-App</Link>), werden deine Win Rate und dein durchschnittliches R:R automatisch berechnet. Ohne Journal: sieh dir deine letzten 30+ Trades an und berechne: Win Rate = Gewinne ÷ Trades gesamt × 100. Ø-R:R = durchschnittlicher Gewinn bei Gewinnern ÷ durchschnittlicher Verlust bei Verlierern. Unsicher? Starte mit einer Voreinstellung unten.</>,
    ],
    eduTitle: 'Risk of Ruin verstehen: Die Mathematik, die dich am Leben hält',
    eduIntro: <>Jeder Trader denkt darüber nach, wie viel er verdienen könnte. Fast niemand denkt daran, wie wahrscheinlich es ist, vorher alles zu verlieren. Risk of Ruin beantwortet die Frage, die sich jeder Trader vor seinem nächsten Trade stellen sollte: <strong className="text-kmf-text-primary">„Wie hoch ist angesichts meiner tatsächlichen Statistiken die Wahrscheinlichkeit, dass mein Konto einen Drawdown erreicht, von dem ich mich nicht erholen kann?"</strong></>,
    exampleTitle: 'Ein echtes Beispiel',
    exampleP: 'Stell dir zwei Trader mit identischen Strategien vor: 50% Win Rate, Reward-to-Risk-Verhältnis 2:1. Beide haben einen positiven Erwartungswert. Trader A riskiert 1% pro Trade. Trader B riskiert 5% pro Trade. Nach 500 Trades:',
    exampleA: <><strong className="text-kmf-text-primary">Trader A (1% Risiko)</strong>: Risk of Ruin ≈ 0%. Das Konto wächst stetig. Verlustserien treten auf, sind aber verkraftbar.</>,
    exampleB: <><strong className="text-kmf-text-primary">Trader B (5% Risiko)</strong>: Risk of Ruin ≈ 25-40%. Es besteht eine sehr reale Chance, dass dieses Konto das Jahr nicht übersteht. Exakt dieselbe Strategie.</>,
    exampleConcl: 'Der Unterschied ist nicht die Strategie. Es ist die Positionsgröße. Das ist die wichtigste Lektion im Trading-Risikomanagement.',
    posExpTitle: 'Warum ein positiver Erwartungswert nicht genügt',
    posExpP: <>Ein positiver Erwartungswert bedeutet, dass deine Strategie im Schnitt Geld verdient, über unendlich viele Trades. Aber du tradest keine unendlichen Trades — du tradest in endlichen Sequenzen, und diese enthalten Verlustserien. Die Frage ist nicht, <em>ob</em> du eine Verlustserie haben wirst, sondern <em>wann</em>, und ob dein Konto sie übersteht. Genau dafür gibt es <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">die 1-%-Regel</Link>.</>,
    chartReadTitle: 'So liest du das Equity-Kurven-Diagramm',
    chartReadP: (n) => <>Das Diagramm zeigt 50 simulierte „mögliche Zukünfte" für dein Konto. Jede Linie startet bei 100% (dein aktueller Saldo) und zeigt, was über {n} Trades passieren könnte. Die horizontale gepunktete rote Linie markiert deine Ruin-Schwelle. Linien, die darunter fallen = ruinierte Konten. Je mehr Linien darunter fallen, desto höher dein Risk of Ruin.</>,
    leversTitle: 'Die drei Hebel, die du kontrollierst',
    lever1: <><strong className="text-kmf-text-primary">Win Rate</strong> — verbessert durch bessere Einstiege, <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">Pre-Trade-Checklisten</Link> und das Verfeinern von Mustern</>,
    lever2: <><strong className="text-kmf-text-primary">Reward:Risk-Verhältnis</strong> — verbessert durch bessere <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">Stop-Loss-Platzierung</Link> und Zielauswahl</>,
    lever3: <><strong className="text-kmf-text-primary">Risiko pro Trade</strong> — der wirkungsvollste Hebel; berechnet über <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">die richtige Positionsgröße</Link></>,
    leversConcl: 'Von diesen dreien hat das Risiko pro Trade den dramatischsten Effekt. Selbst kleine Änderungen (1% → 2%) können deinen Risk of Ruin um das 5-10-Fache erhöhen.',
    resultsTitle: 'Was deine Ergebnisse bedeuten',
    results: [
      <><span className="font-semibold" style={{ color: '#00E676' }}>Unter 1%</span> — Dein Risikomanagement ist solide. Mach weiter so.</>,
      <><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5%</span> — Akzeptabel für die meisten Trader, aber erwäge, das Risiko pro Trade für extra Sicherheit zu senken.</>,
      <><span className="font-semibold" style={{ color: '#FFB300' }}>5-10%</span> — Du arbeitest mit dünnen Margen. Eine schlechte Woche könnte außer Kontrolle geraten.</>,
      <><span className="font-semibold" style={{ color: '#FF9800' }}>10-25%</span> — Erhebliche Gefahr. Senke das Risiko pro Trade sofort.</>,
      <><span className="font-semibold" style={{ color: '#FF5252' }}>Über 25%</span> — Dein Konto ist ernsthaft in Gefahr. Es ist keine Frage des Ob, sondern des Wann.</>,
    ],
    faqHeading: 'Häufige Fragen',
    bottomSuite: 'Teil der kostenlosen K.M.F.-Trading-Tool-Suite',
    bottomLot: 'Lot-Size-Rechner', bottomBlog: 'Trading-Blog',
    faq: [
      { q: 'Was ist Risk of Ruin im Trading?', a: 'Risk of Ruin ist die Wahrscheinlichkeit, dass ein Trader einen bestimmten Prozentsatz seines Kontos verliert (z. B. 30%), gegeben durch Win Rate, durchschnittliches Gewinn/Verlust-Verhältnis und Risiko pro Trade. Es quantifiziert, wie wahrscheinlich es ist, dass dein Konto auf Basis deiner Trading-Statistiken einen katastrophalen Drawdown erleidet.' },
      { q: 'Wo finde ich meine Win Rate und mein durchschnittliches R:R?', a: 'Wenn du ein Trading-Journal nutzt (wie die K.M.F.-Trading-Journal-App), werden diese Statistiken automatisch aus deinem Trade-Verlauf berechnet. Ohne Journal kannst du sie manuell berechnen: Win Rate = (gewinnende Trades ÷ Trades gesamt) × 100. Durchschnittliches R:R = durchschnittlicher Gewinn bei Gewinnern ÷ durchschnittlicher Verlust bei Verlierern. Du brauchst mindestens 30-50 Trades für aussagekräftige Statistiken.' },
      { q: 'Wie funktioniert die Monte-Carlo-Simulation?', a: 'Der Simulator führt 1.000 zufällige Trading-Sequenzen anhand deiner Eingabestatistiken aus. Jede Simulation bestimmt zufällig, ob jeder Trade gewinnt oder verliert (basierend auf deiner Win Rate), und berechnet dann den Gewinn/Verlust (basierend auf deinem R:R und Risiko-%). Durch viele Simulationen sehen wir die gesamte Bandbreite möglicher Ergebnisse — einschließlich der Ruin-Wahrscheinlichkeit.' },
      { q: 'Was ist ein guter Risk-of-Ruin-Prozentsatz?', a: 'Professionelle Trader streben einen Risk of Ruin unter 1% an. Unter 5% ist für die meisten Strategien akzeptabel. Alles über 10% bedeutet, dass deine Risikoparameter angepasst werden müssen — typischerweise durch Senken des Risikos pro Trade oder Verbessern von Win Rate / R:R-Verhältnis.' },
      { q: 'Was bedeutet „Durchschnittlicher Gewinn in R"?', a: 'R ist deine Risikoeinheit — der Betrag, den du bei einem einzelnen Trade riskierst. Wenn du $100 riskierst und dein durchschnittlicher Gewinner-Trade $200 macht, beträgt dein Ø-Gewinn 2R (du hast das Doppelte deines Risikos gemacht). Ist dein Ø-Verlust $100, sind das 1R. Die meisten Trader mit festen Stop Losses haben einen Ø-Verlust nahe 1R.' },
      { q: 'Kann ich einen positiven Erwartungswert haben und trotzdem pleitegehen?', a: 'Ja. Eine Strategie mit positivem Erwartungswert kann trotzdem zum Ruin führen, wenn das Risiko pro Trade zu hoch ist. Selbst eine Strategie, die in 60% der Fälle mit 2:1-R:R gewinnt, kann sprengen, wenn du 10% pro Trade riskierst — eine Serie von 5-6 Verlusten (die irgendwann eintritt) löscht das halbe Konto aus.' },
      { q: 'Wie viele Trades sollte ich simulieren?', a: 'Für die meisten Trader sind 200-500 Trades realistisch (das sind etwa 1-2 Jahre aktives Trading). Wenn du Scalper bist und mehrere Trades pro Tag machst, simuliere 1.000+. Je mehr Trades du simulierst, desto genauer wird die Wahrscheinlichkeitsschätzung.' },
    ],
  },
  fr: {
    pageTitle: 'Calculateur de Risk of Ruin — Simulation Monte-Carlo | K.M.F.',
    pageDesc: 'Calculez la probabilité de faire exploser votre compte de trading. Simulation Monte-Carlo avec courbes de capital, analyse de scénarios et les maths de la survie. Gratuit, sans inscription.',
    ogAlt: 'Calculateur de Risk of Ruin — Simulation Monte-Carlo',
    badge: 'Outil de trading gratuit',
    heroP: 'Votre compte de trading survivra-t-il aux 500 prochains trades ? Saisissez vos statistiques ci-dessous et découvrez-le. Le simulateur exécute 1 000 séquences de trading aléatoires pour vous montrer la probabilité d\'un drawdown catastrophique.',
    presetsPrompt: 'Vous ne connaissez pas encore vos statistiques ? Commencez avec un préréglage :',
    scenarios: [
      { label: 'Conservateur', desc: '55% WR, 1.5:1 R:R, 0.5% risque' },
      { label: 'Standard', desc: '50% WR, 2:1 R:R, 1% risque' },
      { label: 'Agressif', desc: '45% WR, 3:1 R:R, 2% risque' },
      { label: 'Scalper', desc: '65% WR, 0.8:1 R:R, 1% risque' },
      { label: 'Swing Trader', desc: '40% WR, 3:1 R:R, 1% risque' },
    ],
    statsTitle: 'Vos statistiques de trading',
    statsSub: 'Trouvez-les dans votre journal de trading ou calculez-les à partir de vos 30+ derniers trades',
    winRate: 'Win Rate', winRateHint: 'Combien de vos trades sont gagnants ?', winRateEx: 'Ex : 50 trades gagnants sur 100 au total = 50%',
    avgWin: 'Gain moyen', avgWinSuffix: '× risque', avgWinHint: 'Combien gagnez-vous en moyenne quand vous gagnez, en multiple de votre risque ?', avgWinEx: 'Ex : 100 $ de risque par trade, gain moyen = 200 $ → saisissez 2',
    avgLoss: 'Perte moyenne', avgLossHint: 'Combien perdez-vous en moyenne quand un trade échoue ? En général 1 avec des stops fixes.', avgLossEx: 'Ex : 100 $ de risque, perte moyenne = 100 $ → saisissez 1',
    riskPerTrade: 'Risque par trade', riskHint: 'Quel pourcentage de votre compte risquez-vous par trade ?', riskEx: 'Ex : compte de 10 000 $, 100 $ de risque par trade = 1%',
    simSettings: 'Réglages de simulation',
    numTrades: 'Nombre de trades à simuler', numTradesHint: 'Combien de trades dans le futur simuler', numTradesEx: '500 trades ≈ 1-2 ans pour la plupart des traders',
    ruinThreshold: 'Seuil de ruine', ruinSuffix: '% de perte', ruinHint: 'Quel niveau de drawdown = « ruine » pour vous ?', ruinEx: '30% = le compte passe de 10 000 $ à 7 000 $',
    expPerTrade: 'Espérance par trade',
    expStrong: (v) => `Avantage solide — en moyenne vous gagnez ${v}× votre risque par trade`,
    expSlight: (v, low) => `Léger avantage — vous gagnez de l\'argent dans le temps, mais lentement. ${low ? 'Envisagez d\'améliorer les entrées ou le R:R.' : ''}`,
    expBreak: 'À l\'équilibre — votre stratégie ne gagne ni ne perd d\'argent à long terme',
    expLosing: (v) => `Stratégie perdante — en moyenne vous perdez ${v}× votre risque par trade. Aucune gestion du risque ne sauve un avantage négatif.`,
    probLabel: (thr) => `Probabilité de perdre ${thr}% de votre compte`,
    ruinLabels: { excellent: 'Excellent — très sûr', good: 'Bon — risque acceptable', moderate: 'Modéré — envisagez de réduire le risque', risky: 'Risqué — réduisez le risque par trade', dangerous: 'Dangereux — forte chance de faire exploser le compte' },
    summary: (ror, thr, risk) => {
      if (ror < 0.5) return 'Avec ces statistiques, votre compte est très sûr. Sur 1 000 séquences de trading simulées, presque aucune ne s\'est terminée par la ruine.';
      if (ror < 5) return `Il existe une chance faible mais réelle (${ror.toFixed(1)}%) que votre compte atteigne un drawdown de ${thr}%. C\'est dans la fourchette acceptable pour la plupart des traders.`;
      if (ror < 15) return `Environ ${Math.round(ror)} futurs possibles sur 100 se terminent avec votre compte perdant ${thr}%+. Envisagez de réduire votre risque par trade de ${risk}% pour voir l\'amélioration.`;
      if (ror < 40) return `C\'est un niveau dangereux. Dans environ ${Math.round(ror)} futurs simulés sur 100, votre compte atteint un drawdown de ${thr}%. Réduisez votre risque par trade — voir le tableau ci-dessous.`;
      return `Votre compte a une très forte probabilité d\'exploser. Dans ${Math.round(ror)} futurs simulés sur 100, le compte perd ${thr}%+. Vous devez réduire fortement votre risque par trade.`;
    },
    curvesTitle: 'Courbes de capital simulées',
    curvesSub: 'Chaque ligne = un futur possible. Les lignes vertes croissent, les lignes rouges qui franchissent la ligne rouge pointillée = ruine. Solde de départ = 100%.',
    chartTradeAxis: 'Trade #', chartAcctAxis: 'Compte %', chartStart: 'Départ',
    chartRuin: (v) => `Ruine (${v}%)`,
    tipAfter: (l) => `Après le trade #${l}`,
    tipBest: (v) => `Meilleur chemin : ${v}% du solde de départ`,
    tipAvg: (v) => `Moyenne : ${v}%`,
    tipWorst: (v) => `Pire chemin : ${v}%`,
    stats: { median: 'Résultat médian', medianHint: 'La moitié des simulations finissent au-dessus', average: 'Résultat moyen', averageHint: 'Solde final moyen sur toutes les simulations', best: 'Meilleur cas', bestHint: 'Chemin de simulation le plus chanceux', dd: 'Drawdown max moyen', ddHint: 'Pire baisse moyenne par simulation' },
    tableTitle: 'Comment le risque par trade change tout',
    tableSub: (wr, aw, al) => `Même win rate (${wr}%) et même R:R (${aw}:${al}) — on ne change que le risque par trade. Voyez à quel point cela affecte votre survie.`,
    thRisk: 'Risque par trade', thRor: 'Risk of Ruin approx.', thAssess: 'Évaluation',
    yourSetting: '(votre réglage)',
    assess: { safe: 'Très sûr', acceptable: 'Acceptable', caution: 'Prudence', dangerous: 'Dangereux', ruin: 'Ruine quasi certaine' },
    tableNote: '* Approximation analytique. Les résultats Monte-Carlo ci-dessus sont plus précis car ils tiennent compte des effets de capitalisation.',
    crossPrompt: 'Vous avez trouvé votre risque idéal par trade ? Calculez la taille de position exacte pour votre prochain trade.',
    crossButton: 'Ouvrir le calculateur de lot',
    explainerToggle: 'Qu\'est-ce que cet outil et comment m\'aide-t-il ?',
    explainer: [
      <><strong className="text-kmf-text-primary">Le problème :</strong> même des traders rentables peuvent faire exploser leur compte. Un win rate de 60 % avec d\'excellentes entrées ne vaut rien si une mauvaise semaine de trades sur-leviérés efface des mois de gains. La plupart des traders ne le découvrent qu\'après coup.</>,
      <><strong className="text-kmf-text-primary">Ce que fait cet outil :</strong> il simule vos 200 à 1 000+ prochains trades à partir de vos statistiques réelles (win rate, ratio gain:risque et risque par trade). Au lieu de deviner, vous voyez la probabilité que votre compte tombe sous un niveau dont vous ne pouvez pas vous remettre — avant que cela n\'arrive.</>,
      <><strong className="text-kmf-text-primary">Comment il aide :</strong> si votre risk of ruin dépasse 5 %, l\'outil vous montre exactement quel paramètre changer (en général : risquer moins par trade). Vous pouvez tester instantanément différents scénarios — « Et si je risque 0.5 % au lieu de 2 % ? » — et trouver l\'équilibre entre croissance et survie.</>,
      <><strong className="text-kmf-text-primary">Où trouver vos chiffres :</strong> si vous utilisez un journal de trading (comme l\'<Link to="/" className="text-kmf-accent hover:underline">app K.M.F.</Link>), votre win rate et votre R:R moyen sont calculés automatiquement. Sans journal, examinez vos 30+ derniers trades et calculez : Win Rate = gains ÷ total des trades × 100. R:R moyen = gain moyen des gagnants ÷ perte moyenne des perdants. En cas de doute, commencez avec un préréglage ci-dessous.</>,
    ],
    eduTitle: 'Comprendre le Risk of Ruin : les maths qui vous gardent en vie',
    eduIntro: <>Chaque trader pense à combien il pourrait gagner. Presque personne ne pense à la probabilité de tout perdre d\'abord. Le Risk of Ruin répond à la question que tout trader devrait se poser avant son prochain trade : <strong className="text-kmf-text-primary">« Compte tenu de mes statistiques réelles, quelle est la probabilité que mon compte atteigne un drawdown dont je ne peux pas me remettre ? »</strong></>,
    exampleTitle: 'Un exemple réel',
    exampleP: 'Imaginez deux traders avec des stratégies identiques : 50 % de win rate, ratio gain-risque de 2:1. Les deux ont une espérance positive. Le trader A risque 1 % par trade. Le trader B risque 5 % par trade. Après 500 trades :',
    exampleA: <><strong className="text-kmf-text-primary">Trader A (1 % de risque)</strong> : risk of ruin ≈ 0 %. Le compte croît régulièrement. Les séries de pertes arrivent mais sont absorbables.</>,
    exampleB: <><strong className="text-kmf-text-primary">Trader B (5 % de risque)</strong> : risk of ruin ≈ 25-40 %. Il y a une chance bien réelle que ce compte ne survive pas à l\'année. Exactement la même stratégie.</>,
    exampleConcl: 'La différence n\'est pas la stratégie. C\'est le dimensionnement de position. C\'est la leçon la plus importante de la gestion du risque en trading.',
    posExpTitle: 'Pourquoi une espérance positive ne suffit pas',
    posExpP: <>Une espérance positive signifie que votre stratégie gagne de l\'argent en moyenne, sur un nombre infini de trades. Mais vous ne tradez pas un nombre infini de trades — vous tradez en séquences finies, et ces séquences incluent des séries de pertes. La question n\'est pas <em>si</em> vous aurez une série de pertes, mais <em>quand</em>, et si votre compte peut y survivre. C\'est pourquoi <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">la règle des 1 %</Link> existe.</>,
    chartReadTitle: 'Comment lire le graphique des courbes de capital',
    chartReadP: (n) => <>Le graphique montre 50 « futurs possibles » simulés pour votre compte. Chaque ligne part de 100 % (votre solde actuel) et montre ce qui pourrait se passer sur {n} trades. La ligne rouge pointillée horizontale marque votre seuil de ruine. Les lignes qui passent en dessous = comptes ruinés. Plus il y a de lignes en dessous, plus votre risk of ruin est élevé.</>,
    leversTitle: 'Les trois leviers que vous contrôlez',
    lever1: <><strong className="text-kmf-text-primary">Win rate</strong> — amélioré par de meilleures entrées, des <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">checklists pré-trade</Link> et l\'affinage des schémas</>,
    lever2: <><strong className="text-kmf-text-primary">Ratio gain:risque</strong> — amélioré par un meilleur <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">placement du stop loss</Link> et le choix des cibles</>,
    lever3: <><strong className="text-kmf-text-primary">Risque par trade</strong> — le levier le plus impactant ; calculé via un <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">dimensionnement de position correct</Link></>,
    leversConcl: 'Parmi les trois, le risque par trade a l\'effet le plus spectaculaire. Même de petits changements (1 % → 2 %) peuvent multiplier votre risk of ruin par 5 à 10.',
    resultsTitle: 'Ce que signifient vos résultats',
    results: [
      <><span className="font-semibold" style={{ color: '#00E676' }}>Sous 1 %</span> — Votre gestion du risque est solide. Continuez ainsi.</>,
      <><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5 %</span> — Acceptable pour la plupart des traders, mais envisagez de réduire le risque par trade pour plus de sûreté.</>,
      <><span className="font-semibold" style={{ color: '#FFB300' }}>5-10 %</span> — Vous opérez avec des marges minces. Une mauvaise semaine pourrait dégénérer.</>,
      <><span className="font-semibold" style={{ color: '#FF9800' }}>10-25 %</span> — Danger important. Réduisez le risque par trade immédiatement.</>,
      <><span className="font-semibold" style={{ color: '#FF5252' }}>Au-dessus de 25 %</span> — Votre compte est en sérieux danger. Ce n\'est pas une question de si, mais de quand.</>,
    ],
    faqHeading: 'Questions fréquentes',
    bottomSuite: 'Fait partie de la suite gratuite d\'outils de trading K.M.F.',
    bottomLot: 'Calculateur de lot', bottomBlog: 'Blog de trading',
    faq: [
      { q: 'Qu\'est-ce que le Risk of Ruin en trading ?', a: 'Le Risk of Ruin est la probabilité qu\'un trader perde un pourcentage donné de son compte (par ex. 30 %) compte tenu de son win rate, de son ratio gain/perte moyen et de son risque par trade. Il quantifie la probabilité que votre compte subisse un drawdown catastrophique sur la base de vos statistiques de trading.' },
      { q: 'Où trouver mon win rate et mon R:R moyen ?', a: 'Si vous utilisez un journal de trading (comme l\'app K.M.F. Trading Journal), ces statistiques sont calculées automatiquement à partir de votre historique. Sans journal, calculez manuellement : Win Rate = (trades gagnants ÷ total des trades) × 100. R:R moyen = gain moyen des gagnants ÷ perte moyenne des perdants. Il faut au moins 30 à 50 trades pour des statistiques significatives.' },
      { q: 'Comment fonctionne la simulation Monte-Carlo ?', a: 'Le simulateur exécute 1 000 séquences de trading aléatoires à partir de vos statistiques. Chaque simulation détermine au hasard si chaque trade gagne ou perd (selon votre win rate), puis calcule le P&L (selon votre R:R et votre % de risque). En exécutant de nombreuses simulations, on observe toute la gamme des résultats possibles — y compris la probabilité de ruine.' },
      { q: 'Quel est un bon pourcentage de Risk of Ruin ?', a: 'Les traders professionnels visent un Risk of Ruin inférieur à 1 %. En dessous de 5 %, c\'est acceptable pour la plupart des stratégies. Tout ce qui dépasse 10 % signifie que vos paramètres de risque doivent être ajustés — généralement en réduisant le risque par trade ou en améliorant votre win rate / ratio R:R.' },
      { q: 'Que signifie « Gain moyen en R » ?', a: 'R est votre unité de risque — le montant que vous risquez sur un seul trade. Si vous risquez 100 $ et que votre trade gagnant moyen rapporte 200 $, votre gain moyen est de 2R (vous avez fait 2× votre risque). Si votre perte moyenne est de 100 $, c\'est 1R. La plupart des traders qui utilisent des stops fixes ont une perte moyenne proche de 1R.' },
      { q: 'Puis-je avoir une espérance positive et faire faillite quand même ?', a: 'Oui. Une stratégie à espérance positive peut quand même mener à la ruine si le risque par trade est trop élevé. Même une stratégie qui gagne 60 % du temps avec un R:R de 2:1 peut exploser si vous risquez 10 % par trade — une série de 5-6 pertes (qui finira par arriver) efface la moitié du compte.' },
      { q: 'Combien de trades devrais-je simuler ?', a: 'Pour la plupart des traders, 200 à 500 trades est réaliste (soit environ 1 à 2 ans de trading actif). Si vous êtes scalper et prenez plusieurs trades par jour, simulez 1 000+. Plus vous simulez de trades, plus l\'estimation de probabilité devient précise.' },
    ],
  },
  ru: {
    pageTitle: 'Калькулятор Risk of Ruin — симуляция Монте-Карло | K.M.F.',
    pageDesc: 'Рассчитайте вероятность слить торговый счёт. Симуляция Монте-Карло с кривыми капитала, анализом сценариев и математикой выживания. Бесплатно, без регистрации.',
    ogAlt: 'Калькулятор Risk of Ruin — симуляция Монте-Карло',
    badge: 'Бесплатный торговый инструмент',
    heroP: 'Переживёт ли ваш торговый счёт следующие 500 сделок? Введите свою статистику ниже и узнайте. Симулятор прогоняет 1 000 случайных торговых последовательностей, чтобы показать вероятность катастрофической просадки.',
    presetsPrompt: 'Ещё не знаете свою статистику? Начните с пресета:',
    scenarios: [
      { label: 'Консервативный', desc: '55% WR, 1.5:1 R:R, 0.5% риск' },
      { label: 'Стандартный', desc: '50% WR, 2:1 R:R, 1% риск' },
      { label: 'Агрессивный', desc: '45% WR, 3:1 R:R, 2% риск' },
      { label: 'Скальпер', desc: '65% WR, 0.8:1 R:R, 1% риск' },
      { label: 'Свинг-трейдер', desc: '40% WR, 3:1 R:R, 1% риск' },
    ],
    statsTitle: 'Ваша торговая статистика',
    statsSub: 'Найдите её в своём торговом журнале или рассчитайте по последним 30+ сделкам',
    winRate: 'Win Rate', winRateHint: 'Сколько ваших сделок прибыльные?', winRateEx: 'Напр.: 50 прибыльных сделок из 100 = 50%',
    avgWin: 'Средняя прибыль', avgWinSuffix: '× риск', avgWinHint: 'Сколько вы зарабатываете в среднем при выигрыше, в кратном вашему риску?', avgWinEx: 'Напр.: риск $100 на сделку, средняя прибыль = $200 → введите 2',
    avgLoss: 'Средний убыток', avgLossHint: 'Сколько вы теряете в среднем при неудаче? Обычно 1 при фиксированных стопах.', avgLossEx: 'Напр.: риск $100, средний убыток = $100 → введите 1',
    riskPerTrade: 'Риск на сделку', riskHint: 'Какой процент счёта вы рискуете в каждой сделке?', riskEx: 'Напр.: счёт $10 000, риск $100 на сделку = 1%',
    simSettings: 'Настройки симуляции',
    numTrades: 'Количество сделок для симуляции', numTradesHint: 'Сколько сделок в будущее симулировать', numTradesEx: '500 сделок ≈ 1-2 года для большинства трейдеров',
    ruinThreshold: 'Порог разорения', ruinSuffix: '% убытка', ruinHint: 'Какой уровень просадки = «разорение» для вас?', ruinEx: '30% = счёт падает с $10 000 до $7 000',
    expPerTrade: 'Матожидание на сделку',
    expStrong: (v) => `Сильное преимущество — в среднем вы получаете ${v}× вашего риска на сделку`,
    expSlight: (v, low) => `Лёгкое преимущество — вы зарабатываете со временем, но медленно. ${low ? 'Рассмотрите улучшение входов или R:R.' : ''}`,
    expBreak: 'В безубытке — ваша стратегия не зарабатывает и не теряет деньги в долгосроке',
    expLosing: (v) => `Убыточная стратегия — в среднем вы теряете ${v}× вашего риска на сделку. Никакой риск-менеджмент не спасёт отрицательное преимущество.`,
    probLabel: (thr) => `Вероятность потерять ${thr}% вашего счёта`,
    ruinLabels: { excellent: 'Отлично — очень безопасно', good: 'Хорошо — приемлемый риск', moderate: 'Умеренно — стоит снизить риск', risky: 'Рискованно — снизьте риск на сделку', dangerous: 'Опасно — высокий шанс слить счёт' },
    summary: (ror, thr, risk) => {
      if (ror < 0.5) return 'С такой статистикой ваш счёт очень безопасен. Из 1 000 симулированных торговых последовательностей почти ни одна не закончилась разорением.';
      if (ror < 5) return `Существует небольшой, но реальный шанс (${ror.toFixed(1)}%), что ваш счёт достигнет просадки ${thr}%. Это в приемлемом диапазоне для большинства трейдеров.`;
      if (ror < 15) return `Примерно ${Math.round(ror)} из 100 возможных будущих заканчиваются тем, что ваш счёт теряет ${thr}%+. Рассмотрите снижение риска на сделку с ${risk}%, чтобы увидеть улучшение.`;
      if (ror < 40) return `Это опасный уровень. Примерно в ${Math.round(ror)} из 100 симулированных будущих ваш счёт достигает просадки ${thr}%. Снизьте риск на сделку — см. таблицу ниже.`;
      return `У вашего счёта очень высокая вероятность взорваться. В ${Math.round(ror)} из 100 симулированных будущих счёт теряет ${thr}%+. Вам нужно значительно снизить риск на сделку.`;
    },
    curvesTitle: 'Симулированные кривые капитала',
    curvesSub: 'Каждая линия = одно возможное будущее. Зелёные линии растут, красные линии, пересекающие красную пунктирную линию = разорение. Стартовый баланс = 100%.',
    chartTradeAxis: 'Сделка #', chartAcctAxis: 'Счёт %', chartStart: 'Старт',
    chartRuin: (v) => `Разорение (${v}%)`,
    tipAfter: (l) => `После сделки #${l}`,
    tipBest: (v) => `Лучший путь: ${v}% стартового баланса`,
    tipAvg: (v) => `Среднее: ${v}%`,
    tipWorst: (v) => `Худший путь: ${v}%`,
    stats: { median: 'Медианный результат', medianHint: 'Половина симуляций заканчивается выше', average: 'Средний результат', averageHint: 'Средний итоговый баланс по всем симуляциям', best: 'Лучший случай', bestHint: 'Самый удачный путь симуляции', dd: 'Ср. макс. просадка', ddHint: 'В среднем худшее падение за симуляцию' },
    tableTitle: 'Как риск на сделку меняет всё',
    tableSub: (wr, aw, al) => `Тот же win rate (${wr}%) и тот же R:R (${aw}:${al}) — меняется только риск на сделку. Посмотрите, как сильно это влияет на ваше выживание.`,
    thRisk: 'Риск на сделку', thRor: 'Прибл. Risk of Ruin', thAssess: 'Оценка',
    yourSetting: '(ваша настройка)',
    assess: { safe: 'Очень безопасно', acceptable: 'Приемлемо', caution: 'Осторожно', dangerous: 'Опасно', ruin: 'Почти верное разорение' },
    tableNote: '* Аналитическое приближение. Результаты Монте-Карло выше точнее, так как учитывают эффекты сложного процента.',
    crossPrompt: 'Нашли свой идеальный риск на сделку? Рассчитайте точный размер позиции для следующей сделки.',
    crossButton: 'Открыть калькулятор лота',
    explainerToggle: 'Что это за инструмент и как он мне помогает?',
    explainer: [
      <><strong className="text-kmf-text-primary">Проблема:</strong> даже прибыльные трейдеры могут слить свои счета. Win rate 60% с отличными входами ничего не значит, если одна плохая неделя сделок с избыточным плечом сотрёт месяцы прибыли. Большинство трейдеров узнаёт это лишь после того, как это случилось.</>,
      <><strong className="text-kmf-text-primary">Что делает этот инструмент:</strong> он симулирует ваши следующие 200-1 000+ сделок на основе вашей реальной статистики (win rate, соотношение прибыль:риск и риск на сделку). Вместо догадок вы видите вероятность того, что ваш счёт упадёт ниже уровня, с которого вы не сможете восстановиться — до того, как это произойдёт.</>,
      <><strong className="text-kmf-text-primary">Как он помогает:</strong> если ваш risk of ruin выше 5%, инструмент показывает точно, какой параметр изменить (обычно: рисковать меньше на сделку). Вы можете мгновенно тестировать разные сценарии — «Что если я рискну 0.5% вместо 2%?» — и найти баланс между ростом и выживанием.</>,
      <><strong className="text-kmf-text-primary">Где найти свои цифры:</strong> если вы используете торговый журнал (например, <Link to="/" className="text-kmf-accent hover:underline">приложение K.M.F.</Link>), ваш win rate и средний R:R рассчитываются автоматически. Без журнала просмотрите последние 30+ сделок и рассчитайте: Win Rate = прибыльные ÷ всего сделок × 100. Средний R:R = средняя прибыль на выигрышах ÷ средний убыток на проигрышах. Если не уверены, начните с пресета ниже.</>,
    ],
    eduTitle: 'Понимание Risk of Ruin: математика, которая держит вас в живых',
    eduIntro: <>Каждый трейдер думает о том, сколько он мог бы заработать. Почти никто не думает о том, насколько вероятно сначала потерять всё. Risk of Ruin отвечает на вопрос, который каждый трейдер должен задать перед следующей сделкой: <strong className="text-kmf-text-primary">«С учётом моей реальной статистики, какова вероятность, что мой счёт достигнет просадки, с которой я не смогу восстановиться?»</strong></>,
    exampleTitle: 'Реальный пример',
    exampleP: 'Представьте двух трейдеров с одинаковыми стратегиями: 50% win rate, соотношение прибыль-риск 2:1. У обоих положительное матожидание. Трейдер A рискует 1% на сделку. Трейдер B рискует 5% на сделку. После 500 сделок:',
    exampleA: <><strong className="text-kmf-text-primary">Трейдер A (1% риск)</strong>: risk of ruin ≈ 0%. Счёт стабильно растёт. Серии убытков случаются, но поглощаемы.</>,
    exampleB: <><strong className="text-kmf-text-primary">Трейдер B (5% риск)</strong>: risk of ruin ≈ 25-40%. Есть весьма реальный шанс, что этот счёт не переживёт год. Точно та же стратегия.</>,
    exampleConcl: 'Разница не в стратегии. Она в размере позиции. Это самый важный урок риск-менеджмента в трейдинге.',
    posExpTitle: 'Почему положительного матожидания недостаточно',
    posExpP: <>Положительное матожидание означает, что ваша стратегия в среднем зарабатывает деньги, на бесконечном числе сделок. Но вы торгуете не бесконечно — вы торгуете конечными последовательностями, и эти последовательности включают серии убытков. Вопрос не <em>будет ли</em> у вас серия убытков, а <em>когда</em>, и переживёт ли её ваш счёт. Именно поэтому существует <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">правило 1%</Link>.</>,
    chartReadTitle: 'Как читать график кривых капитала',
    chartReadP: (n) => <>График показывает 50 симулированных «возможных будущих» для вашего счёта. Каждая линия начинается со 100% (ваш текущий баланс) и показывает, что может произойти за {n} сделок. Горизонтальная красная пунктирная линия отмечает ваш порог разорения. Линии, которые опускаются ниже = разорённые счета. Чем больше линий уходит ниже, тем выше ваш risk of ruin.</>,
    leversTitle: 'Три рычага, которые вы контролируете',
    lever1: <><strong className="text-kmf-text-primary">Win rate</strong> — улучшается лучшими входами, <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">чек-листами перед сделкой</Link> и доработкой паттернов</>,
    lever2: <><strong className="text-kmf-text-primary">Соотношение прибыль:риск</strong> — улучшается лучшим <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">размещением stop loss</Link> и выбором целей</>,
    lever3: <><strong className="text-kmf-text-primary">Риск на сделку</strong> — самый влиятельный рычаг; рассчитывается через <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">правильный размер позиции</Link></>,
    leversConcl: 'Из этих трёх риск на сделку имеет самый драматичный эффект. Даже небольшие изменения (1% → 2%) могут умножить ваш risk of ruin в 5-10 раз.',
    resultsTitle: 'Что означают ваши результаты',
    results: [
      <><span className="font-semibold" style={{ color: '#00E676' }}>Ниже 1%</span> — Ваш риск-менеджмент надёжен. Продолжайте в том же духе.</>,
      <><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5%</span> — Приемлемо для большинства трейдеров, но стоит снизить риск на сделку для дополнительной безопасности.</>,
      <><span className="font-semibold" style={{ color: '#FFB300' }}>5-10%</span> — Вы работаете с тонкими запасами. Плохая неделя может выйти из-под контроля.</>,
      <><span className="font-semibold" style={{ color: '#FF9800' }}>10-25%</span> — Значительная опасность. Немедленно снизьте риск на сделку.</>,
      <><span className="font-semibold" style={{ color: '#FF5252' }}>Выше 25%</span> — Ваш счёт в серьёзной опасности. Это вопрос не если, а когда.</>,
    ],
    faqHeading: 'Частые вопросы',
    bottomSuite: 'Часть бесплатного набора торговых инструментов K.M.F.',
    bottomLot: 'Калькулятор лота', bottomBlog: 'Блог о трейдинге',
    faq: [
      { q: 'Что такое Risk of Ruin в трейдинге?', a: 'Risk of Ruin — это вероятность того, что трейдер потеряет определённый процент счёта (например, 30%) с учётом win rate, среднего соотношения прибыль/убыток и риска на сделку. Он количественно оценивает, насколько вероятно, что ваш счёт понесёт катастрофическую просадку на основе вашей торговой статистики.' },
      { q: 'Где найти мой win rate и средний R:R?', a: 'Если вы используете торговый журнал (например, приложение K.M.F. Trading Journal), эта статистика рассчитывается автоматически из истории сделок. Без журнала можно рассчитать вручную: Win Rate = (прибыльные сделки ÷ всего сделок) × 100. Средний R:R = средняя прибыль на выигрышах ÷ средний убыток на проигрышах. Для значимой статистики нужно минимум 30-50 сделок.' },
      { q: 'Как работает симуляция Монте-Карло?', a: 'Симулятор прогоняет 1 000 случайных торговых последовательностей на основе вашей статистики. Каждая симуляция случайно определяет, выигрывает или проигрывает каждая сделка (по вашему win rate), затем рассчитывает P&L (по вашему R:R и % риска). Прогоняя множество симуляций, мы видим весь диапазон возможных исходов — включая вероятность разорения.' },
      { q: 'Какой Risk of Ruin считается хорошим?', a: 'Профессиональные трейдеры стремятся к Risk of Ruin ниже 1%. Ниже 5% приемлемо для большинства стратегий. Всё выше 10% означает, что ваши параметры риска нуждаются в корректировке — обычно за счёт снижения риска на сделку или улучшения win rate / соотношения R:R.' },
      { q: 'Что означает «Средняя прибыль в R»?', a: 'R — это ваша единица риска, сумма, которой вы рискуете в одной сделке. Если вы рискуете $100, а ваша средняя прибыльная сделка приносит $200, ваша средняя прибыль — 2R (вы заработали 2× риска). Если средний убыток $100, это 1R. У большинства трейдеров с фиксированными stop loss средний убыток близок к 1R.' },
      { q: 'Могу ли я иметь положительное матожидание и всё равно разориться?', a: 'Да. Стратегия с положительным матожиданием всё равно может привести к разорению, если риск на сделку слишком велик. Даже стратегия, выигрывающая в 60% случаев с R:R 2:1, может взорваться, если вы рискуете 10% на сделку — серия из 5-6 убытков (которая в итоге случится) сотрёт половину счёта.' },
      { q: 'Сколько сделок мне симулировать?', a: 'Для большинства трейдеров реалистично 200-500 сделок (примерно 1-2 года активной торговли). Если вы скальпер и делаете несколько сделок в день, симулируйте 1 000+. Чем больше сделок вы симулируете, тем точнее оценка вероятности.' },
    ],
  },
  ja: {
    pageTitle: 'Risk of Ruin 計算機 — モンテカルロ・シミュレーション | K.M.F.',
    pageDesc: 'トレード口座が破綻する確率を計算。エクイティカーブ、シナリオ分析、生存の数学を備えたモンテカルロ・シミュレーション。無料・登録不要。',
    ogAlt: 'Risk of Ruin 計算機 — モンテカルロ・シミュレーション',
    badge: '無料トレードツール',
    heroP: 'あなたのトレード口座は次の500トレードを生き残れるか？以下に統計を入力して確かめましょう。シミュレーターは1,000本のランダムなトレード列を実行し、壊滅的なドローダウンの確率を示します。',
    presetsPrompt: 'まだ統計が分からない？プリセットから始めましょう：',
    scenarios: [
      { label: '保守的', desc: '勝率55%, 1.5:1 R:R, リスク0.5%' },
      { label: '標準', desc: '勝率50%, 2:1 R:R, リスク1%' },
      { label: '積極的', desc: '勝率45%, 3:1 R:R, リスク2%' },
      { label: 'スキャルパー', desc: '勝率65%, 0.8:1 R:R, リスク1%' },
      { label: 'スイングトレーダー', desc: '勝率40%, 3:1 R:R, リスク1%' },
    ],
    statsTitle: 'あなたのトレード統計',
    statsSub: 'トレードジャーナル、または直近30トレード以上から算出',
    winRate: '勝率', winRateHint: 'トレードのうち勝ちはどれくらい？', winRateEx: '例：100トレード中50勝 = 50%',
    avgWin: '平均利益', avgWinSuffix: '× リスク', avgWinHint: '勝つとき平均でいくら稼ぐか、リスクの倍数で？', avgWinEx: '例：1トレードあたりリスク$100、平均利益$200 → 2を入力',
    avgLoss: '平均損失', avgLossHint: '負けるとき平均でいくら失うか？固定ストップなら通常1。', avgLossEx: '例：リスク$100、平均損失$100 → 1を入力',
    riskPerTrade: '1トレードあたりのリスク', riskHint: '各トレードで口座の何%をリスクに？', riskEx: '例：口座$10,000、1トレードあたりリスク$100 = 1%',
    simSettings: 'シミュレーション設定',
    numTrades: 'シミュレーションするトレード数', numTradesHint: '将来何トレード分をシミュレーションするか', numTradesEx: '500トレード ≈ ほとんどのトレーダーで1〜2年',
    ruinThreshold: '破綻しきい値', ruinSuffix: '% 損失', ruinHint: 'どのドローダウン水準があなたにとって「破綻」？', ruinEx: '30% = 口座が$10,000から$7,000へ',
    expPerTrade: '1トレードあたりの期待値',
    expStrong: (v) => `強いエッジ — 平均で1トレードあたりリスクの${v}倍を得ています`,
    expSlight: (v, low) => `わずかなエッジ — 時間をかければ稼げますが、ゆっくりです。${low ? 'エントリーかR:Rの改善を検討してください。' : ''}`,
    expBreak: '損益均衡 — あなたの戦略は長期的に稼ぎも損もしません',
    expLosing: (v) => `負け戦略 — 平均で1トレードあたりリスクの${v}倍を失っています。どんなリスク管理もマイナスのエッジは救えません。`,
    probLabel: (thr) => `口座の${thr}%を失う確率`,
    ruinLabels: { excellent: '優秀 — 非常に安全', good: '良好 — 許容範囲のリスク', moderate: '中程度 — リスク低減を検討', risky: 'リスキー — 1トレードあたりのリスクを下げる', dangerous: '危険 — 口座破綻の可能性が高い' },
    summary: (ror, thr, risk) => {
      if (ror < 0.5) return 'この統計なら、あなたの口座は非常に安全です。1,000本のシミュレーションのうち、破綻に至ったものはほぼありません。';
      if (ror < 5) return `口座が${thr}%のドローダウンに達する小さいが現実的な可能性（${ror.toFixed(1)}%）があります。これはほとんどのトレーダーにとって許容範囲です。`;
      if (ror < 15) return `100の可能な未来のうち約${Math.round(ror)}で、口座が${thr}%以上を失います。1トレードあたりのリスクを${risk}%から下げて改善を確認しましょう。`;
      if (ror < 40) return `これは危険な水準です。100のシミュレーション未来のうち約${Math.round(ror)}で、口座が${thr}%のドローダウンに達します。1トレードあたりのリスクを下げてください — 下の表を参照。`;
      return `あなたの口座は破綻する確率が非常に高いです。100のシミュレーション未来のうち${Math.round(ror)}で、口座は${thr}%以上を失います。1トレードあたりのリスクを大幅に下げる必要があります。`;
    },
    curvesTitle: 'シミュレーションされたエクイティカーブ',
    curvesSub: '各線 = 1つの可能な未来。緑の線は成長、赤い点線を割る赤い線 = 破綻。開始残高 = 100%。',
    chartTradeAxis: 'トレード #', chartAcctAxis: '口座 %', chartStart: '開始',
    chartRuin: (v) => `破綻 (${v}%)`,
    tipAfter: (l) => `トレード #${l} の後`,
    tipBest: (v) => `最良の経路：開始残高の${v}%`,
    tipAvg: (v) => `平均：${v}%`,
    tipWorst: (v) => `最悪の経路：${v}%`,
    stats: { median: '中央値の結果', medianHint: 'シミュレーションの半分はこれより上で終了', average: '平均の結果', averageHint: '全シミュレーションの平均最終残高', best: '最良ケース', bestHint: '最も幸運なシミュレーション経路', dd: '平均最大ドローダウン', ddHint: 'シミュレーションごとの平均最悪の下落' },
    tableTitle: '1トレードあたりのリスクがすべてを変える',
    tableSub: (wr, aw, al) => `同じ勝率（${wr}%）、同じR:R（${aw}:${al}）— 変えるのは1トレードあたりのリスクだけ。これが生存にどれほど劇的に影響するかをご覧ください。`,
    thRisk: '1トレードあたりのリスク', thRor: 'おおよそのRisk of Ruin', thAssess: '評価',
    yourSetting: '（あなたの設定）',
    assess: { safe: '非常に安全', acceptable: '許容範囲', caution: '注意', dangerous: '危険', ruin: 'ほぼ確実な破綻' },
    tableNote: '※ 解析的な近似値。上のモンテカルロ結果は複利効果を考慮するためより正確です。',
    crossPrompt: '理想の1トレードあたりリスクが見つかった？次のトレードの正確なポジションサイズを計算しましょう。',
    crossButton: 'ロットサイズ計算機を開く',
    explainerToggle: 'このツールは何で、どう役立つ？',
    explainer: [
      <><strong className="text-kmf-text-primary">問題：</strong>利益を出しているトレーダーでも口座を破綻させることがあります。勝率60%で素晴らしいエントリーでも、過剰レバレッジの悪い1週間が数か月の利益を消せば意味がありません。ほとんどのトレーダーは、それが起きた後にしか気づきません。</>,
      <><strong className="text-kmf-text-primary">このツールがすること：</strong>あなたの実際の統計（勝率、リワード:リスク比、1トレードあたりのリスク）を使って次の200〜1,000以上のトレードをシミュレーションします。推測する代わりに、回復できない水準まで口座が落ちる確率を、実際に起きる前に確認できます。</>,
      <><strong className="text-kmf-text-primary">どう役立つか：</strong>あなたのrisk of ruinが5%を超えていれば、ツールはどのパラメータを変えるべきか（通常：1トレードあたりのリスクを減らす）を正確に示します。さまざまなシナリオを即座にテストでき — 「2%でなく0.5%リスクならどうか？」— 成長と生存の最適点を見つけられます。</>,
      <><strong className="text-kmf-text-primary">数字をどこで見つけるか：</strong>トレードジャーナル（<Link to="/" className="text-kmf-accent hover:underline">K.M.F.アプリ</Link>など）を使えば、勝率と平均R:Rは自動計算されます。ジャーナルがなければ、直近30トレード以上を見直して計算：勝率 = 勝ち ÷ 総トレード × 100。平均R:R = 勝ちの平均利益 ÷ 負けの平均損失。不安なら下のプリセットから始めましょう。</>,
    ],
    eduTitle: 'Risk of Ruin を理解する：あなたを生かす数学',
    eduIntro: <>どのトレーダーもいくら稼げるかを考えます。先に全てを失う可能性を考える人はほとんどいません。Risk of Ruin は、すべてのトレーダーが次のトレードの前に問うべき問いに答えます：<strong className="text-kmf-text-primary">「実際の統計を踏まえて、回復できないドローダウンに口座が達する確率はどれくらいか？」</strong></>,
    exampleTitle: '実例',
    exampleP: '同じ戦略を持つ2人のトレーダーを想像してください：勝率50%、リワード対リスク比2:1。両者とも期待値はプラス。トレーダーAは1トレードあたり1%リスク。トレーダーBは5%リスク。500トレード後：',
    exampleA: <><strong className="text-kmf-text-primary">トレーダーA（1%リスク）</strong>：risk of ruin ≈ 0%。口座は着実に成長。連敗は起きますが吸収可能です。</>,
    exampleB: <><strong className="text-kmf-text-primary">トレーダーB（5%リスク）</strong>：risk of ruin ≈ 25〜40%。この口座が年を越せない非常に現実的な可能性があります。まったく同じ戦略です。</>,
    exampleConcl: '違いは戦略ではありません。ポジションサイジングです。これがトレードのリスク管理で最も重要な教訓です。',
    posExpTitle: 'なぜプラスの期待値だけでは足りないのか',
    posExpP: <>プラスの期待値とは、戦略が無限のトレードにわたり平均して稼ぐという意味です。しかしあなたは無限にトレードしません — 有限の列でトレードし、その列には連敗が含まれます。問題は連敗が起きる<em>かどうか</em>ではなく、<em>いつ</em>起きるか、そして口座が生き残れるかです。だからこそ<Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">1%ルール</Link>が存在します。</>,
    chartReadTitle: 'エクイティカーブのグラフの読み方',
    chartReadP: (n) => <>グラフは口座の50の「可能な未来」をシミュレーションして示します。各線は100%（現在の残高）から始まり、{n}トレードで何が起きうるかを示します。水平の赤い点線があなたの破綻しきい値です。それを下回る線 = 破綻した口座。下回る線が多いほど、risk of ruin は高くなります。</>,
    leversTitle: 'あなたが制御できる3つのレバー',
    lever1: <><strong className="text-kmf-text-primary">勝率</strong> — より良いエントリー、<Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">プレトレード・チェックリスト</Link>、パターンの洗練で改善</>,
    lever2: <><strong className="text-kmf-text-primary">リワード:リスク比</strong> — より良い<Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss の配置</Link>とターゲット選定で改善</>,
    lever3: <><strong className="text-kmf-text-primary">1トレードあたりのリスク</strong> — 最も影響の大きいレバー。<Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">適切なポジションサイジング</Link>で算出</>,
    leversConcl: 'この3つのうち、1トレードあたりのリスクが最も劇的な効果を持ちます。わずかな変化（1% → 2%）でもrisk of ruinを5〜10倍にできます。',
    resultsTitle: '結果の意味',
    results: [
      <><span className="font-semibold" style={{ color: '#00E676' }}>1%未満</span> — リスク管理は堅実。今のまま続けましょう。</>,
      <><span className="font-semibold" style={{ color: '#66BB6A' }}>1〜5%</span> — ほとんどのトレーダーに許容範囲ですが、安全のため1トレードあたりのリスク低減を検討。</>,
      <><span className="font-semibold" style={{ color: '#FFB300' }}>5〜10%</span> — 薄いマージンで運用しています。悪い1週間が連鎖しかねません。</>,
      <><span className="font-semibold" style={{ color: '#FF9800' }}>10〜25%</span> — 重大な危険。直ちに1トレードあたりのリスクを下げてください。</>,
      <><span className="font-semibold" style={{ color: '#FF5252' }}>25%超</span> — あなたの口座は深刻な危険にあります。起きるかどうかではなく、いつ起きるかの問題です。</>,
    ],
    faqHeading: 'よくある質問',
    bottomSuite: 'K.M.F. 無料トレードツール群の一部',
    bottomLot: 'ロットサイズ計算機', bottomBlog: 'トレードブログ',
    faq: [
      { q: 'トレードにおける Risk of Ruin とは？', a: 'Risk of Ruin は、勝率・平均勝ち負け比・1トレードあたりのリスクを踏まえ、トレーダーが口座の特定割合（例：30%）を失う確率です。あなたのトレード統計に基づき、口座が壊滅的なドローダウンに陥る可能性を数値化します。' },
      { q: '勝率と平均R:Rはどこで見つける？', a: 'トレードジャーナル（K.M.F. Trading Journal アプリなど）を使えば、これらの統計はトレード履歴から自動計算されます。ジャーナルがなければ手動で計算：勝率 =（勝ちトレード ÷ 総トレード）× 100。平均R:R = 勝ちの平均利益 ÷ 負けの平均損失。意味のある統計には最低30〜50トレードが必要です。' },
      { q: 'モンテカルロ・シミュレーションはどう機能する？', a: 'シミュレーターは入力統計を使って1,000本のランダムなトレード列を実行します。各シミュレーションは各トレードの勝敗を（勝率に基づき）ランダムに決め、損益を（R:Rとリスク%に基づき）計算します。多数のシミュレーションにより、破綻確率を含む可能な結果の全範囲が見えます。' },
      { q: '良い Risk of Ruin の割合は？', a: 'プロのトレーダーは Risk of Ruin 1%未満を目指します。5%未満ならほとんどの戦略で許容範囲。10%超はリスクパラメータの調整が必要 — 通常は1トレードあたりのリスクを下げるか、勝率/R:R比を改善します。' },
      { q: '「Rでの平均利益」とは？', a: 'Rはあなたのリスク単位 — 1トレードでリスクに晒す金額です。$100リスクで平均勝ちトレードが$200稼ぐなら、平均利益は2R（リスクの2倍）。平均損失が$100なら1R。固定stop lossを使うトレーダーの多くは平均損失が1Rに近いです。' },
      { q: 'プラスの期待値でも破産しうる？', a: 'はい。プラスの期待値の戦略でも、1トレードあたりのリスクが大きすぎれば破綻しえます。勝率60%・R:R 2:1の戦略でも、1トレードで10%リスクを取れば破綻しえます — 5〜6連敗（いずれ起きます）が口座の半分を消します。' },
      { q: '何トレードをシミュレーションすべき？', a: 'ほとんどのトレーダーには200〜500トレードが現実的（およそ1〜2年の活発なトレード）。1日に複数トレードするスキャルパーなら1,000以上をシミュレーション。シミュレーションするトレードが多いほど、確率の推定は正確になります。' },
    ],
  },
  zh: {
    pageTitle: 'Risk of Ruin 计算器 — 蒙特卡洛模拟 | K.M.F.',
    pageDesc: '计算爆掉交易账户的概率。带资金曲线、情景分析和生存数学的蒙特卡洛模拟。免费，无需注册。',
    ogAlt: 'Risk of Ruin 计算器 — 蒙特卡洛模拟',
    badge: '免费交易工具',
    heroP: '你的交易账户能挺过接下来的 500 笔交易吗？在下方输入你的统计数据来一探究竟。模拟器运行 1,000 条随机交易序列，向你展示灾难性回撤的概率。',
    presetsPrompt: '还不知道自己的统计数据？从预设开始：',
    scenarios: [
      { label: '保守', desc: '胜率55%, 1.5:1 R:R, 风险0.5%' },
      { label: '标准', desc: '胜率50%, 2:1 R:R, 风险1%' },
      { label: '激进', desc: '胜率45%, 3:1 R:R, 风险2%' },
      { label: '剥头皮', desc: '胜率65%, 0.8:1 R:R, 风险1%' },
      { label: '波段交易者', desc: '胜率40%, 3:1 R:R, 风险1%' },
    ],
    statsTitle: '你的交易统计',
    statsSub: '在交易日志中查找，或根据最近 30+ 笔交易计算',
    winRate: '胜率', winRateHint: '你的交易中有多少是盈利的？', winRateEx: '例：100 笔中 50 笔盈利 = 50%',
    avgWin: '平均盈利', avgWinSuffix: '× 风险', avgWinHint: '盈利时平均赚多少，以风险的倍数计？', avgWinEx: '例：每笔风险 $100，平均盈利 $200 → 输入 2',
    avgLoss: '平均亏损', avgLossHint: '交易失败时平均亏多少？用固定止损通常为 1。', avgLossEx: '例：风险 $100，平均亏损 $100 → 输入 1',
    riskPerTrade: '单笔风险', riskHint: '每笔交易冒险账户的百分之几？', riskEx: '例：账户 $10,000，每笔风险 $100 = 1%',
    simSettings: '模拟设置',
    numTrades: '要模拟的交易数', numTradesHint: '向未来模拟多少笔交易', numTradesEx: '500 笔 ≈ 大多数交易者 1-2 年',
    ruinThreshold: '破产阈值', ruinSuffix: '% 亏损', ruinHint: '哪个回撤水平对你而言是"破产"？', ruinEx: '30% = 账户从 $10,000 跌到 $7,000',
    expPerTrade: '每笔期望值',
    expStrong: (v) => `强优势 — 平均每笔交易你获得 ${v}× 的风险`,
    expSlight: (v, low) => `轻微优势 — 长期能赚钱，但很慢。${low ? '可考虑改进入场或 R:R。' : ''}`,
    expBreak: '盈亏平衡 — 你的策略长期不赚不亏',
    expLosing: (v) => `亏损策略 — 平均每笔交易你亏损 ${v}× 的风险。任何风险管理都救不了负优势。`,
    probLabel: (thr) => `亏掉账户 ${thr}% 的概率`,
    ruinLabels: { excellent: '优秀 — 非常安全', good: '良好 — 可接受的风险', moderate: '适中 — 可考虑降低风险', risky: '冒险 — 降低单笔风险', dangerous: '危险 — 爆仓概率很高' },
    summary: (ror, thr, risk) => {
      if (ror < 0.5) return '以这些统计数据，你的账户非常安全。在 1,000 条模拟交易序列中，几乎没有以破产告终的。';
      if (ror < 5) return `你的账户达到 ${thr}% 回撤的可能性虽小但真实（${ror.toFixed(1)}%）。这在大多数交易者的可接受范围内。`;
      if (ror < 15) return `约 100 个可能的未来中有 ${Math.round(ror)} 个以账户亏掉 ${thr}%+ 告终。可考虑将单笔风险从 ${risk}% 降低，看看改善情况。`;
      if (ror < 40) return `这是危险水平。在约 100 个模拟未来中的 ${Math.round(ror)} 个里，你的账户达到 ${thr}% 回撤。请降低单笔风险 — 见下表。`;
      return `你的账户爆仓概率非常高。在 100 个模拟未来中的 ${Math.round(ror)} 个里，账户亏掉 ${thr}%+。你需要大幅降低单笔风险。`;
    },
    curvesTitle: '模拟的资金曲线',
    curvesSub: '每条线 = 一个可能的未来。绿线增长，越过红色虚线的红线 = 破产。起始余额 = 100%。',
    chartTradeAxis: '交易 #', chartAcctAxis: '账户 %', chartStart: '起点',
    chartRuin: (v) => `破产 (${v}%)`,
    tipAfter: (l) => `第 ${l} 笔交易后`,
    tipBest: (v) => `最佳路径：起始余额的 ${v}%`,
    tipAvg: (v) => `平均：${v}%`,
    tipWorst: (v) => `最差路径：${v}%`,
    stats: { median: '中位数结果', medianHint: '一半的模拟在此之上结束', average: '平均结果', averageHint: '所有模拟的平均最终余额', best: '最佳情况', bestHint: '最幸运的模拟路径', dd: '平均最大回撤', ddHint: '每次模拟平均最严重的下跌' },
    tableTitle: '单笔风险如何改变一切',
    tableSub: (wr, aw, al) => `相同的胜率（${wr}%）和相同的 R:R（${aw}:${al}）— 仅改变单笔风险。看看它对你的生存影响有多剧烈。`,
    thRisk: '单笔风险', thRor: '大约 Risk of Ruin', thAssess: '评估',
    yourSetting: '（你的设置）',
    assess: { safe: '非常安全', acceptable: '可接受', caution: '谨慎', dangerous: '危险', ruin: '几乎必然破产' },
    tableNote: '* 解析近似值。上方的蒙特卡洛结果更准确，因为它们考虑了复利效应。',
    crossPrompt: '找到了理想的单笔风险？为你的下一笔交易计算精确的仓位大小。',
    crossButton: '打开手数计算器',
    explainerToggle: '这个工具是什么，对我有什么帮助？',
    explainer: [
      <><strong className="text-kmf-text-primary">问题：</strong>即使是盈利的交易者也可能爆掉账户。60% 的胜率配上出色的入场毫无意义，如果过度杠杆的一个坏周抹掉数月的盈利。大多数交易者只有在事情发生后才明白。</>,
      <><strong className="text-kmf-text-primary">这个工具的作用：</strong>它用你的真实统计数据（胜率、盈亏比和单笔风险）模拟你接下来的 200-1,000+ 笔交易。无需猜测，你能在事情发生前看到账户跌破无法恢复水平的概率。</>,
      <><strong className="text-kmf-text-primary">它如何帮助：</strong>如果你的 risk of ruin 高于 5%，工具会准确显示该改哪个参数（通常是：每笔少冒险）。你可以即时测试不同情景 —「如果我冒险 0.5% 而非 2% 会怎样？」— 并找到增长与生存之间的最佳点。</>,
      <><strong className="text-kmf-text-primary">在哪里找到你的数字：</strong>如果你使用交易日志（如 <Link to="/" className="text-kmf-accent hover:underline">K.M.F. 应用</Link>），你的胜率和平均 R:R 会自动计算。没有日志的话，回顾你最近 30+ 笔交易并计算：胜率 = 盈利 ÷ 总交易 × 100。平均 R:R = 盈利的平均利润 ÷ 亏损的平均损失。如果不确定，从下方的预设开始。</>,
    ],
    eduTitle: '理解 Risk of Ruin：让你活下来的数学',
    eduIntro: <>每个交易者都在想能赚多少。几乎没人想过先失去一切的可能性有多大。Risk of Ruin 回答了每个交易者在下一笔交易前都该问的问题：<strong className="text-kmf-text-primary">「鉴于我的真实统计数据，我的账户达到无法恢复的回撤的概率是多少？」</strong></>,
    exampleTitle: '一个真实例子',
    exampleP: '想象两个策略相同的交易者：胜率 50%，盈亏比 2:1。两者都有正期望值。交易者 A 每笔冒险 1%。交易者 B 每笔冒险 5%。500 笔交易后：',
    exampleA: <><strong className="text-kmf-text-primary">交易者 A（1% 风险）</strong>：risk of ruin ≈ 0%。账户稳定增长。连亏会发生，但可吸收。</>,
    exampleB: <><strong className="text-kmf-text-primary">交易者 B（5% 风险）</strong>：risk of ruin ≈ 25-40%。这个账户很有可能熬不过这一年。完全相同的策略。</>,
    exampleConcl: '区别不在策略，而在仓位管理。这是交易风险管理中最重要的一课。',
    posExpTitle: '为什么正期望值还不够',
    posExpP: <>正期望值意味着你的策略在无限笔交易中平均赚钱。但你不会做无限笔交易 — 你在有限的序列中交易，而这些序列包含连亏。问题不是你<em>是否</em>会连亏，而是<em>何时</em>，以及你的账户能否挺过去。这就是<Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">1% 法则</Link>存在的原因。</>,
    chartReadTitle: '如何读懂资金曲线图',
    chartReadP: (n) => <>图表展示了你账户的 50 个模拟「可能的未来」。每条线从 100%（你当前的余额）开始，显示在 {n} 笔交易中可能发生什么。水平的红色虚线标记你的破产阈值。跌破它的线 = 破产的账户。越多线跌破它，你的 risk of ruin 越高。</>,
    leversTitle: '你能控制的三个杠杆',
    lever1: <><strong className="text-kmf-text-primary">胜率</strong> — 通过更好的入场、<Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">交易前检查清单</Link>和形态打磨来提升</>,
    lever2: <><strong className="text-kmf-text-primary">盈亏比</strong> — 通过更好的 <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss 设置</Link>和目标选择来提升</>,
    lever3: <><strong className="text-kmf-text-primary">单笔风险</strong> — 影响最大的杠杆；通过<Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">正确的仓位管理</Link>计算</>,
    leversConcl: '在这三者中，单笔风险的效果最为剧烈。即使是很小的变化（1% → 2%）也能让你的 risk of ruin 翻 5-10 倍。',
    resultsTitle: '你的结果意味着什么',
    results: [
      <><span className="font-semibold" style={{ color: '#00E676' }}>低于 1%</span> — 你的风险管理很稳健。保持下去。</>,
      <><span className="font-semibold" style={{ color: '#66BB6A' }}>1-5%</span> — 对大多数交易者可接受，但可考虑降低单笔风险以获得额外安全。</>,
      <><span className="font-semibold" style={{ color: '#FFB300' }}>5-10%</span> — 你在用很薄的余量运作。一个坏周可能失控。</>,
      <><span className="font-semibold" style={{ color: '#FF9800' }}>10-25%</span> — 重大危险。立即降低单笔风险。</>,
      <><span className="font-semibold" style={{ color: '#FF5252' }}>高于 25%</span> — 你的账户处于严重危险中。这不是会不会，而是何时。</>,
    ],
    faqHeading: '常见问题',
    bottomSuite: 'K.M.F. 免费交易工具套件的一部分',
    bottomLot: '手数计算器', bottomBlog: '交易博客',
    faq: [
      { q: '交易中的 Risk of Ruin 是什么？', a: 'Risk of Ruin 是在给定胜率、平均盈亏比和单笔风险的情况下，交易者亏掉账户特定百分比（例如 30%）的概率。它量化了基于你的交易统计数据，你的账户遭受灾难性回撤的可能性。' },
      { q: '在哪里找到我的胜率和平均 R:R？', a: '如果你使用交易日志（如 K.M.F. Trading Journal 应用），这些统计数据会从你的交易历史自动计算。没有日志的话，可手动计算：胜率 =（盈利交易 ÷ 总交易）× 100。平均 R:R = 盈利的平均利润 ÷ 亏损的平均损失。需要至少 30-50 笔交易才能得到有意义的统计。' },
      { q: '蒙特卡洛模拟如何运作？', a: '模拟器用你输入的统计数据运行 1,000 条随机交易序列。每次模拟随机决定每笔交易输赢（基于你的胜率），再计算盈亏（基于你的 R:R 和风险 %）。通过运行大量模拟，我们看到全部可能结果的范围 — 包括破产的概率。' },
      { q: '多大的 Risk of Ruin 才算好？', a: '专业交易者追求 Risk of Ruin 低于 1%。低于 5% 对大多数策略可接受。任何高于 10% 都意味着你的风险参数需要调整 — 通常是降低单笔风险或提升胜率/R:R 比。' },
      { q: '"以 R 计的平均盈利"是什么意思？', a: 'R 是你的风险单位 — 单笔交易冒险的金额。如果你冒险 $100 而平均盈利交易赚 $200，你的平均盈利是 2R（赚了 2 倍风险）。如果平均亏损是 $100，那是 1R。大多数使用固定 stop loss 的交易者，平均亏损接近 1R。' },
      { q: '我能有正期望值却仍然破产吗？', a: '能。如果单笔风险过高，正期望值的策略仍可能导致破产。即使一个 60% 胜率、R:R 2:1 的策略，如果每笔冒险 10%，也可能爆仓 — 一串 5-6 次亏损（最终会发生）会抹掉一半账户。' },
      { q: '我应该模拟多少笔交易？', a: '对大多数交易者，200-500 笔较为现实（约 1-2 年的活跃交易）。如果你是每天做多笔交易的剥头皮者，模拟 1,000+。你模拟的交易越多，概率估计越准确。' },
    ],
  },
};

const SCENARIO_DATA = [
  { winRate: 55, avgWin: 1.5, avgLoss: 1, riskPct: 0.5, trades: 500, ruin: 30 },
  { winRate: 50, avgWin: 2, avgLoss: 1, riskPct: 1, trades: 500, ruin: 30 },
  { winRate: 45, avgWin: 3, avgLoss: 1, riskPct: 2, trades: 500, ruin: 30 },
  { winRate: 65, avgWin: 0.8, avgLoss: 1, riskPct: 1, trades: 1000, ruin: 20 },
  { winRate: 40, avgWin: 3, avgLoss: 1, riskPct: 1, trades: 200, ruin: 30 },
];

/* ─── Monte Carlo Engine ─── */
function runMonteCarlo(winRate, avgWin, avgLoss, riskPct, numTrades, ruinThreshold, numSims = 1000) {
  const results = [];
  let ruinCount = 0;
  const samplePaths = [];
  const numSample = Math.min(numSims, 50);
  const W = winRate / 100;

  for (let s = 0; s < numSims; s++) {
    let equity = 100;
    const path = s < numSample ? [100] : null;
    let ruined = false;
    let maxEquity = 100;
    let maxDrawdown = 0;

    for (let t = 0; t < numTrades; t++) {
      if (equity <= 0) { ruined = true; break; }
      const riskAmount = equity * (riskPct / 100);
      if (Math.random() < W) {
        equity += riskAmount * avgWin;
      } else {
        equity -= riskAmount * avgLoss;
      }
      if (equity < 0) equity = 0;
      if (path) path.push(equity);

      // Track max drawdown
      if (equity > maxEquity) maxEquity = equity;
      const dd = ((maxEquity - equity) / maxEquity) * 100;
      if (dd > maxDrawdown) maxDrawdown = dd;

      // Check ruin (equity dropped ruinThreshold% from starting balance)
      if (equity <= (100 - ruinThreshold)) {
        ruined = true;
        if (path) {
          for (let r = t + 2; r <= numTrades; r++) path.push(equity);
        }
        break;
      }
    }

    if (ruined) ruinCount++;
    results.push({ finalEquity: equity, maxDrawdown });
    if (path) samplePaths.push(path);
  }

  // Build chart data
  const step = numTrades > 200 ? Math.floor(numTrades / 200) : 1;
  const chartData = [];
  for (let i = 0; i <= numTrades; i += step) {
    const point = { trade: i };
    for (let s = 0; s < samplePaths.length; s++) {
      point[`s${s}`] = samplePaths[s][Math.min(i, samplePaths[s].length - 1)];
    }
    chartData.push(point);
  }
  if (chartData.length === 0 || chartData[chartData.length - 1].trade !== numTrades) {
    const point = { trade: numTrades };
    for (let s = 0; s < samplePaths.length; s++) {
      point[`s${s}`] = samplePaths[s][samplePaths[s].length - 1];
    }
    chartData.push(point);
  }

  // Stats
  const equities = results.map(r => r.finalEquity);
  const drawdowns = results.map(r => r.maxDrawdown);
  const sorted = equities.slice().sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const avgFinal = equities.reduce((a, b) => a + b, 0) / equities.length;
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];
  const avgMaxDD = drawdowns.reduce((a, b) => a + b, 0) / drawdowns.length;

  return {
    riskOfRuin: (ruinCount / numSims) * 100,
    median,
    avgFinal,
    worst,
    best,
    avgMaxDD,
    chartData,
    numSample: samplePaths.length,
    numSims,
  };
}

/* ─── Color helpers ─── */
function ruinColor(pct) {
  if (pct <= 1) return '#00E676';
  if (pct <= 5) return '#66BB6A';
  if (pct <= 10) return '#FFB300';
  if (pct <= 25) return '#FF9800';
  return '#FF5252';
}

function ruinLabel(pct, t) {
  if (pct <= 1) return t.ruinLabels.excellent;
  if (pct <= 5) return t.ruinLabels.good;
  if (pct <= 10) return t.ruinLabels.moderate;
  if (pct <= 25) return t.ruinLabels.risky;
  return t.ruinLabels.dangerous;
}

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label, t }) {
  if (!active || !payload?.length) return null;
  const values = payload.map(p => p.value).filter(v => v != null);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return (
    <div className="rounded-lg px-3 py-2 text-xs" style={{ background: 'rgba(15,17,21,0.95)', border: '1px solid rgba(79,195,247,0.2)' }}>
      <p className="text-kmf-text-tertiary mb-1">{t.tipAfter(label)}</p>
      <p className="text-green-400">{t.tipBest(max.toFixed(1))}</p>
      <p className="text-kmf-accent">{t.tipAvg(avg.toFixed(1))}</p>
      <p className="text-red-400">{t.tipWorst(min.toFixed(1))}</p>
    </div>
  );
}

/* ─── Input Component ─── */
function InputField({ label, value, onChange, suffix, min, max, step = 1, hint, example }) {
  return (
    <div>
      <label className="text-sm font-medium text-kmf-text-secondary block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full rounded-lg px-3 py-2.5 text-sm text-kmf-text-primary outline-none transition-all focus:ring-1 focus:ring-kmf-accent/40"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-kmf-text-tertiary">{suffix}</span>}
      </div>
      {hint && <p className="text-[11px] text-kmf-text-tertiary mt-1">{hint}</p>}
      {example && <p className="text-[11px] mt-0.5" style={{ color: 'rgba(79,195,247,0.6)' }}>{example}</p>}
    </div>
  );
}

/* ─── Scenario Comparison Table ─── */
function ScenarioTable({ winRate, avgWin, avgLoss, ruinThreshold, currentRiskPct, t }) {
  const rows = useMemo(() => {
    const W = winRate / 100;
    const L = 1 - W;
    return [0.25, 0.5, 1, 2, 3, 5].map(riskPct => {
      const expectancy = W * avgWin - L * avgLoss;
      let ror;
      if (expectancy <= 0) {
        ror = 100;
      } else {
        const ratio = (L * avgLoss) / (W * avgWin);
        const units = ruinThreshold / riskPct;
        if (ratio >= 1) ror = 100;
        else if (ratio <= 0) ror = 0;
        else ror = Math.min(Math.pow(ratio, units) * 100, 100);
      }
      return { riskPct, ror };
    });
  }, [winRate, avgWin, avgLoss, ruinThreshold]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-kmf-text-tertiary text-xs uppercase tracking-wider">
            <th className="text-left py-2 px-3">{t.thRisk}</th>
            <th className="text-right py-2 px-3">{t.thRor}</th>
            <th className="text-right py-2 px-3 hidden sm:table-cell">{t.thAssess}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => {
            const isCurrentRow = s.riskPct === currentRiskPct;
            return (
              <tr key={i} className="border-t border-white/5" style={isCurrentRow ? { background: 'rgba(79,195,247,0.06)' } : {}}>
                <td className="py-2.5 px-3 font-medium text-kmf-text-primary">
                  {s.riskPct}%
                  {isCurrentRow && <span className="text-[10px] text-kmf-accent ml-1.5">{t.yourSetting}</span>}
                </td>
                <td className="py-2.5 px-3 text-right font-bold" style={{ color: ruinColor(s.ror) }}>
                  {s.ror < 0.01 ? '< 0.01%' : s.ror > 99.9 ? '> 99%' : `${s.ror.toFixed(1)}%`}
                </td>
                <td className="py-2.5 px-3 text-right text-xs text-kmf-text-tertiary hidden sm:table-cell">
                  {s.ror <= 1 ? t.assess.safe : s.ror <= 5 ? t.assess.acceptable : s.ror <= 15 ? t.assess.caution : s.ror <= 50 ? t.assess.dangerous : t.assess.ruin}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── "What is this?" explainer box ─── */
function ExplainerBox({ t }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden mb-10" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(79,195,247,0.15)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#4FC3F7"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          </div>
          <span className="text-sm font-semibold text-kmf-accent">{t.explainerToggle}</span>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="#4FC3F7"
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none', opacity: 0.6 }}
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 text-sm text-kmf-text-secondary leading-relaxed animate-fadeIn">
          {t.explainer.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function RiskOfRuinPage() {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const [winRate, setWinRate] = useState('50');
  const [avgWin, setAvgWin] = useState('2');
  const [avgLoss, setAvgLoss] = useState('1');
  const [riskPct, setRiskPct] = useState('1');
  const [numTrades, setNumTrades] = useState('500');
  const [ruinThreshold, setRuinThreshold] = useState('30');
  const [openFaq, setOpenFaq] = useState(null);

  // Parse inputs
  const params = useMemo(() => ({
    winRate: Math.min(99, Math.max(1, parseFloat(winRate) || 50)),
    avgWin: Math.max(0.1, parseFloat(avgWin) || 2),
    avgLoss: Math.max(0.1, parseFloat(avgLoss) || 1),
    riskPct: Math.min(20, Math.max(0.1, parseFloat(riskPct) || 1)),
    numTrades: Math.min(5000, Math.max(50, parseInt(numTrades) || 500)),
    ruinThreshold: Math.min(100, Math.max(5, parseFloat(ruinThreshold) || 30)),
  }), [winRate, avgWin, avgLoss, riskPct, numTrades, ruinThreshold]);

  // Run simulation
  const result = useMemo(() => {
    return runMonteCarlo(params.winRate, params.avgWin, params.avgLoss, params.riskPct, params.numTrades, params.ruinThreshold);
  }, [params]);

  // Expectancy
  const expectancy = useMemo(() => {
    const W = params.winRate / 100;
    return W * params.avgWin - (1 - W) * params.avgLoss;
  }, [params.winRate, params.avgWin, params.avgLoss]);

  // Load preset
  const loadPreset = useCallback((preset) => {
    setWinRate(String(preset.winRate));
    setAvgWin(String(preset.avgWin));
    setAvgLoss(String(preset.avgLoss));
    setRiskPct(String(preset.riskPct));
    setNumTrades(String(preset.trades));
    setRuinThreshold(String(preset.ruin));
  }, []);

  // GA4 event
  const trackedRef = useCallback(() => {
    window.gtag?.('event', 'risk_of_ruin_calculated', {
      win_rate: params.winRate,
      rr_ratio: params.avgWin,
      risk_pct: params.riskPct,
      ruin_result: result?.riskOfRuin?.toFixed(1),
    });
  }, [params, result]);

  useEffect(() => {
    if (result) trackedRef();
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  // SEO
  useEffect(() => {
    document.title = t.pageTitle;
    const setMeta = (attr, val, content) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', t.pageDesc);
    setMeta('property', 'og:title', t.pageTitle);
    setMeta('property', 'og:description', t.pageDesc);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', t.ogAlt);
    setMeta('property', 'og:url', PAGE_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', t.pageTitle);
    setMeta('name', 'twitter:description', t.pageDesc);
    setMeta('name', 'twitter:image', OG_IMAGE);
    setMeta('name', 'twitter:image:alt', t.ogAlt);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', PAGE_URL);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'Risk of Ruin Calculator',
          url: PAGE_URL,
          description: t.pageDesc,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          creator: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: t.faq.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kmfjournal.com/tools' },
            { '@type': 'ListItem', position: 3, name: 'Risk of Ruin Calculator', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('ror-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'ror-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); link?.remove(); };
  }, [t]);

  // Path colors
  const pathColors = useMemo(() => {
    if (!result) return [];
    const colors = [];
    for (let i = 0; i < result.numSample; i++) {
      const ti = i / Math.max(result.numSample - 1, 1);
      const hue = 120 + ti * 240;
      colors.push(`hsl(${hue % 360}, 60%, 55%)`);
    }
    return colors;
  }, [result]);

  // Plain-language summary
  const summary = useMemo(() => {
    if (!result) return '';
    return t.summary(result.riskOfRuin, params.ruinThreshold, params.riskPct);
  }, [result, params.ruinThreshold, params.riskPct, t]);

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              {t.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-kmf-accent to-cyan-300 bg-clip-text text-transparent">Risk of Ruin</span> Calculator
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto text-base">
              {t.heroP}
            </p>
          </div>

          {/* Explainer */}
          <ExplainerBox t={t} />

          {/* Presets */}
          <div className="mb-8">
            <p className="text-xs text-kmf-text-tertiary text-center mb-3">{t.presetsPrompt}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SCENARIO_DATA.map((s, i) => (
                <button
                  key={i}
                  onClick={() => loadPreset(s)}
                  className="group px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}
                  title={t.scenarios[i].desc}
                >
                  <span className="block font-semibold">{t.scenarios[i].label}</span>
                  <span className="block text-[10px] text-kmf-text-tertiary mt-0.5 group-hover:text-kmf-text-secondary transition-colors">{t.scenarios[i].desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inputs */}
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-sm font-semibold text-kmf-text-primary mb-1 uppercase tracking-wider">{t.statsTitle}</h2>
                <p className="text-[11px] text-kmf-text-tertiary mb-4">{t.statsSub}</p>
                <div className="space-y-4">
                  <InputField label={t.winRate} value={winRate} onChange={setWinRate} suffix="%" min={1} max={99} step={1} hint={t.winRateHint} example={t.winRateEx} />
                  <InputField label={t.avgWin} value={avgWin} onChange={setAvgWin} suffix={t.avgWinSuffix} min={0.1} max={20} step={0.1} hint={t.avgWinHint} example={t.avgWinEx} />
                  <InputField label={t.avgLoss} value={avgLoss} onChange={setAvgLoss} suffix={t.avgWinSuffix} min={0.1} max={5} step={0.1} hint={t.avgLossHint} example={t.avgLossEx} />
                  <InputField label={t.riskPerTrade} value={riskPct} onChange={setRiskPct} suffix="%" min={0.1} max={20} step={0.25} hint={t.riskHint} example={t.riskEx} />

                  <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider font-semibold mb-3">{t.simSettings}</p>
                    <div className="space-y-4">
                      <InputField label={t.numTrades} value={numTrades} onChange={setNumTrades} min={50} max={5000} step={50} hint={t.numTradesHint} example={t.numTradesEx} />
                      <InputField label={t.ruinThreshold} value={ruinThreshold} onChange={setRuinThreshold} suffix={t.ruinSuffix} min={5} max={100} step={5} hint={t.ruinHint} example={t.ruinEx} />
                    </div>
                  </div>
                </div>

                {/* Expectancy indicator */}
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-kmf-text-tertiary">{t.expPerTrade}</span>
                    <span className="font-bold" style={{ color: expectancy > 0 ? '#00E676' : expectancy === 0 ? '#FFB300' : '#FF5252' }}>
                      {expectancy > 0 ? '+' : ''}{expectancy.toFixed(2)}R
                    </span>
                  </div>
                  <p className="text-[11px] text-kmf-text-tertiary mt-1">
                    {expectancy > 0.3
                      ? t.expStrong(expectancy.toFixed(2))
                      : expectancy > 0
                        ? t.expSlight(expectancy.toFixed(2), expectancy < 0.1)
                        : expectancy === 0
                          ? t.expBreak
                          : t.expLosing(Math.abs(expectancy).toFixed(2))
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Risk of Ruin Result */}
              {result && (
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-center">
                    <p className="text-sm text-kmf-text-tertiary mb-2">
                      {t.probLabel(params.ruinThreshold)}
                    </p>
                    <div className="text-5xl sm:text-6xl font-bold mb-2" style={{ color: ruinColor(result.riskOfRuin) }}>
                      {result.riskOfRuin < 0.1 ? '< 0.1' : result.riskOfRuin.toFixed(1)}%
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: `${ruinColor(result.riskOfRuin)}18`, color: ruinColor(result.riskOfRuin), border: `1px solid ${ruinColor(result.riskOfRuin)}30` }}>
                      {ruinLabel(result.riskOfRuin, t)}
                    </div>
                  </div>
                  {/* Plain language summary */}
                  <p className="text-sm text-kmf-text-secondary text-center leading-relaxed mt-2 max-w-lg mx-auto">
                    {summary}
                  </p>
                </div>
              )}

              {/* Equity Curve Chart */}
              {result && result.chartData.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h2 className="text-sm font-semibold text-kmf-text-primary mb-1 uppercase tracking-wider">{t.curvesTitle}</h2>
                  <p className="text-[11px] text-kmf-text-tertiary mb-4">
                    {t.curvesSub}
                  </p>
                  <div className="h-[300px] sm:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                          dataKey="trade"
                          stroke="#6B7280"
                          tick={{ fill: '#6B7280', fontSize: 11 }}
                          tickLine={false}
                          label={{ value: t.chartTradeAxis, position: 'insideBottomRight', offset: -5, fill: '#6B7280', fontSize: 11 }}
                        />
                        <YAxis
                          stroke="#6B7280"
                          tick={{ fill: '#6B7280', fontSize: 11 }}
                          tickLine={false}
                          label={{ value: t.chartAcctAxis, angle: -90, position: 'insideLeft', offset: 10, fill: '#6B7280', fontSize: 11 }}
                        />
                        <Tooltip content={<ChartTooltip t={t} />} />
                        <ReferenceLine y={100} stroke="rgba(79,195,247,0.3)" strokeDasharray="4 4" label={{ value: t.chartStart, fill: 'rgba(79,195,247,0.5)', fontSize: 10, position: 'right' }} />
                        <ReferenceLine y={100 - params.ruinThreshold} stroke="rgba(255,82,82,0.4)" strokeDasharray="4 4" label={{ value: t.chartRuin(100 - params.ruinThreshold), fill: '#FF5252', fontSize: 10, position: 'right' }} />
                        {Array.from({ length: result.numSample }, (_, i) => (
                          <Line
                            key={i}
                            type="monotone"
                            dataKey={`s${i}`}
                            stroke={pathColors[i]}
                            dot={false}
                            strokeWidth={1}
                            opacity={0.35}
                            isAnimationActive={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              {result && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: t.stats.median, value: `${result.median.toFixed(1)}%`, color: result.median >= 100 ? '#00E676' : '#FF5252', hint: t.stats.medianHint },
                    { label: t.stats.average, value: `${result.avgFinal.toFixed(1)}%`, color: result.avgFinal >= 100 ? '#00E676' : '#FF5252', hint: t.stats.averageHint },
                    { label: t.stats.best, value: `${result.best.toFixed(0)}%`, color: '#00E676', hint: t.stats.bestHint },
                    { label: t.stats.dd, value: `${result.avgMaxDD.toFixed(1)}%`, color: result.avgMaxDD > params.ruinThreshold * 0.7 ? '#FF5252' : '#FFB300', hint: t.stats.ddHint },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[11px] text-kmf-text-tertiary mb-1">{s.label}</p>
                      <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[10px] text-kmf-text-tertiary mt-0.5">{s.hint}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scenario Comparison Table */}
          <div className="mt-10 rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-kmf-text-primary mb-1 uppercase tracking-wider">{t.tableTitle}</h2>
            <p className="text-xs text-kmf-text-tertiary mb-4">
              {t.tableSub(params.winRate, params.avgWin, params.avgLoss)}
            </p>
            <ScenarioTable winRate={params.winRate} avgWin={params.avgWin} avgLoss={params.avgLoss} ruinThreshold={params.ruinThreshold} currentRiskPct={params.riskPct} t={t} />
            <p className="text-[11px] text-kmf-text-tertiary mt-3 italic">
              {t.tableNote}
            </p>
          </div>

          {/* Cross-link to Lot Calculator */}
          <div className="mt-8 rounded-2xl p-5 text-center" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.1)' }}>
            <p className="text-sm text-kmf-text-secondary mb-3">
              {t.crossPrompt}
            </p>
            <Link
              to="/tools/lot-size-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)', color: '#0F1115' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm3-4H7v-2h8v2zm2-4H7V7h10v2z"/></svg>
              {t.crossButton}
            </Link>
          </div>

          {/* Educational Content */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6">{t.eduTitle}</h2>

            <div className="space-y-6 text-kmf-text-secondary leading-relaxed">
              <p>{t.eduIntro}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.exampleTitle}</h3>
              <p>{t.exampleP}</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>{t.exampleA}</li>
                <li>{t.exampleB}</li>
              </ul>
              <p>{t.exampleConcl}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.posExpTitle}</h3>
              <p>{t.posExpP}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.chartReadTitle}</h3>
              <p>{t.chartReadP(params.numTrades)}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.leversTitle}</h3>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>{t.lever1}</li>
                <li>{t.lever2}</li>
                <li>{t.lever3}</li>
              </ul>
              <p>{t.leversConcl}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.resultsTitle}</h3>
              <ul className="space-y-2 pl-2">
                {t.results.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6">{t.faqHeading}</h2>
            <div className="space-y-3">
              {t.faq.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-kmf-text-primary hover:text-kmf-accent transition-colors"
                  >
                    {faq.q}
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                      className="shrink-0 ml-3 transition-transform duration-200"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', opacity: 0.5 }}
                    >
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-kmf-text-secondary leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-kmf-text-tertiary text-sm mb-4">{t.bottomSuite}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/tools/lot-size-calculator"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
              >
                {t.bottomLot}
              </Link>
              <Link
                to="/blog"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#8FB3C5', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {t.bottomBlog}
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
