import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { toPng } from 'html-to-image';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';

const OG_IMAGE = 'https://kmfjournal.com/tools/og/compound-calculator.png';
const PAGE_URL = 'https://kmfjournal.com/tools/compound-calculator';

const T = {
  en: {
    pageTitle: 'KMF Compound Vision — Trading Compound Growth Calculator | K.M.F.',
    pageDesc: 'Visualize how disciplined monthly returns compound your trading account over time. Free calculator with interactive chart, milestone markers, and drawdown recovery warnings.',
    ogAlt: 'KMF Compound Vision — Trading Compound Growth Calculator',
    badge: 'Free Trading Tool',
    heroP: 'See what disciplined, consistent trading can build over time. Enter your balance and a realistic monthly target — and watch compounding do the heavy lifting.',
    explainerToggle: 'What is this tool and how does it help me?',
    explainer: [
      <><strong className="text-kmf-text-primary">The problem:</strong> Most traders either set unrealistic profit targets (leading to overleveraging and blowing accounts) or don't understand how powerful consistency is (leading to impatience and strategy-hopping).</>,
      <><strong className="text-kmf-text-primary">What this tool does:</strong> It shows you exactly how your trading account grows over time if you maintain a consistent monthly return. The chart compares compound growth (reinvesting profits) versus linear growth (same fixed amount each month) so you can see why discipline compounds.</>,
      <><strong className="text-kmf-text-primary">How it helps:</strong> Set a realistic monthly target, see what's possible in 12-36 months, and stay motivated when individual trades feel small. If you're tempted to increase risk, look at this chart — small, consistent gains beat occasional big wins every time.</>,
      <><strong className="text-kmf-text-primary">Reality check:</strong> This calculator assumes consistent returns with no losing months. Real trading has drawdowns. Use the <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin Calculator</Link> alongside this tool to ensure your targets are sustainable.</>,
    ],
    presetsPrompt: 'Quick start with a scenario:',
    presets: [
      { label: 'Conservative', desc: '$10k, 3%/mo, 12 months' },
      { label: 'Realistic', desc: '$10k, 5%/mo, 24 months' },
      { label: 'Ambitious', desc: '$10k, 8%/mo, 24 months' },
      { label: 'DCA + Trading', desc: '$5k, 5%/mo + $500/mo deposit' },
      { label: 'Living Off Trading', desc: '$50k, 5%/mo, -$1k/mo withdrawal' },
      { label: 'Prop Firm', desc: '$100k, 3%/mo, 12 months' },
    ],
    yourNumbers: 'Your Numbers',
    startBalance: 'Starting Balance', startBalanceHint: 'Your current trading account balance',
    monthlyReturn: 'Monthly Return',
    timeframe: 'Timeframe', monthsSuffix: ' months',
    addDeposit: 'Add monthly deposit (optional)', hideDeposit: 'Hide monthly deposit',
    monthlyDeposit: 'Monthly Deposit', monthlyDepositHint: 'Extra capital added each month',
    addWithdrawal: 'Add monthly withdrawal (optional)', hideWithdrawal: 'Hide monthly withdrawal',
    monthlyWithdrawal: 'Monthly Withdrawal', monthlyWithdrawalHint: 'Amount you take out each month',
    reality: [
      'Very conservative. Achievable with proper risk management and a solid strategy.',
      'Realistic for experienced traders. Requires consistency and discipline.',
      'Ambitious. Only top-tier traders sustain this. Track your actual returns first.',
      'Very aggressive. Most traders who aim for this blow their accounts instead.',
      'Unrealistic for sustained trading. This is gambling territory — expect drawdowns.',
    ],
    bustedTitle: (m) => `Account depleted at month ${m}`,
    bustedBody: (w) => `Your monthly withdrawal (${w}) exceeds the account's growth. Reduce withdrawal or increase your return target.`,
    projectedAfter: (m) => `Projected balance after ${m} months`,
    startingFrom: (b) => `Starting from ${b}`,
    statTotalProfit: 'Total Profit', statTotalProfitHint: 'Pure compound earnings',
    statGrowth: 'Growth', statGrowthHint: 'Your money multiplied by',
    statAdvantage: 'Compound Advantage', statAdvantageHint: 'Extra vs. linear growth',
    statMonthProfit: (m) => `Month ${m} Profit`, statMonthProfitHint: "Last month's profit alone",
    statWithdrawn: 'Total Withdrawn', statWithdrawnHint: 'Income taken out',
    milestoneAt: (mult, month, bal) => `${mult}x at month ${month} (${bal})`,
    share: 'Share Results', sharing: 'Generating...',
    growthProjection: 'Growth Projection',
    legendPrincipal: 'Principal', legendProfit: 'Compound Profit', legendLinear: 'Linear',
    chartSub: 'The shaded area shows your balance split between what you put in and what compounding generated. The dashed line = if you earned the same fixed amount every month.',
    chartMonthAxis: 'Month',
    tipMonth: (l) => `Month ${l}`,
    tipBalance: 'Balance:', tipCompoundProfit: (v) => `Compound profit: ${v}`, tipLinearWould: (v) => `Linear would be: ${v}`,
    tipThisMonth: (v) => `This month's profit: ${v}`, tipDeposit: (v) => `+ ${v} deposit`, tipWithdrawal: (v) => `- ${v} withdrawal`,
    cards: [
      { title: 'The Power of Consistency', body: 'A steady 5% per month beats alternating between +20% and -15%. The volatile trader ends up with less after 12 months because losses hurt more than equivalent gains help. Compounding rewards boring, consistent execution.' },
      { title: 'Why Small Edges Compound', body: "The difference between 3% and 5% monthly seems small. Over 24 months: 3% turns $10k into $20,328 while 5% turns it into $32,251. That's 59% more — from just 2% extra per month. Small improvements in your edge have massive long-term impact." },
      { title: 'The Real Enemy: Drawdown', body: "A 50% loss requires a 100% gain to recover. Drawdowns don't just erase profit — they destroy the compounding engine. Capital preservation is the #1 priority. Every dollar you don't lose keeps compounding forever." },
    ],
    ddTitle: 'Drawdown Recovery Table',
    ddSub: 'How much you need to gain after a loss just to get back to breakeven.',
    ddLoss: 'Account Loss', ddGain: 'Gain Needed to Recover',
    ddMonths: (pct) => `Months to Recover at ${pct}%/mo`, monthsLabel: (m) => `${m} months`,
    breakdownTitle: 'Monthly Breakdown', breakdownSub: 'Detailed month-by-month projection.',
    bMonth: 'Month', bStart: 'Balance Start', bProfit: 'Profit', bDeposit: 'Deposit', bWithdrawal: 'Withdrawal', bEnd: 'Balance End',
    eduTitle: 'Understanding Compound Growth in Trading',
    eduP1: 'Albert Einstein reportedly called compound interest "the eighth wonder of the world." In trading, compounding is even more powerful — because unlike savings accounts with fixed rates, a skilled trader can aim for significantly higher monthly returns.',
    eduMathTitle: 'The Math That Changes Everything',
    eduMathP: 'A trader making 5% per month on a $10,000 account earns $500 in the first month. But by month 12, that same 5% generates $814 — because the account has grown to $16,289. By month 24, the monthly profit is $1,326 on a balance of $32,251. The percentage stays the same. The dollars grow exponentially.',
    eduNeverTitle: 'Why Most Traders Never Experience This',
    eduNeverP: 'The compound growth curve above assumes consistent monthly returns with no major drawdowns. In reality, most traders sabotage their compounding by:',
    eduNeverList: [
      <><strong className="text-kmf-text-primary">Overleveraging</strong> — chasing faster growth, then losing 20-30% in a bad week</>,
      <><strong className="text-kmf-text-primary">Withdrawing too early</strong> — pulling profits instead of letting them compound</>,
      <><strong className="text-kmf-text-primary">Strategy hopping</strong> — switching strategies before compounding has time to work</>,
      <><strong className="text-kmf-text-primary">Revenge trading</strong> — after a loss, increasing risk to "make it back quickly"</>,
    ],
    eduRealTitle: 'The Realistic Approach',
    eduRealP: <>Use this calculator as a <em>motivational north star</em>, not a guarantee. Set a conservative target (3-5%), focus on <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">proper risk management</Link>, and track your actual results in a <Link to="/" className="text-kmf-accent hover:underline">trading journal</Link>. If your real monthly returns are consistently positive, compounding will work for you — even at lower rates than projected.</>,
    eduPairTitle: 'Pair This With Risk Management',
    eduPairP: <>Compounding only works if you protect your capital. Use the <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin Calculator</Link> to ensure your strategy won't blow up before the compound effect kicks in. Check the <Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">Win Rate vs R:R Matrix</Link> to verify your edge is positive.</>,
    faqHeading: 'Frequently Asked Questions',
    bottomSuite: 'Part of the K.M.F. free trading tools suite',
    bottomRuin: 'Risk of Ruin Calculator', bottomMatrix: 'Win Rate vs R:R Matrix', bottomLot: 'Lot Size Calculator',
    faq: [
      { q: 'What is compound growth in trading?', a: 'Compound growth means reinvesting your trading profits so they generate additional returns. Instead of withdrawing profits each month, you trade with a larger account. Over time, this creates exponential growth — your profits earn their own profits. A 5% monthly return on $10,000 is $500 in month 1, but $814 by month 12 because the account has grown.' },
      { q: 'Is 5% per month realistic in trading?', a: 'Consistently achieving 5% per month puts you in the top tier of traders worldwide. Most hedge funds average 10-20% per year. A consistent 3-5% monthly return requires excellent risk management, a proven strategy, and strong emotional discipline. Start by tracking your actual monthly returns in a trading journal before projecting forward.' },
      { q: 'Why does this calculator show linear vs compound growth?', a: 'The linear line shows what happens if you make the same dollar amount each month (no reinvestment). The compound curve shows what happens when profits are reinvested. The gap between them — the "compound advantage" — grows exponentially over time. This visualization helps you understand why consistency matters more than occasional big wins.' },
      { q: 'What happens if I have a losing month?', a: "A single losing month can set back compound growth significantly because you lose not just that month's potential profit, but all the compound returns those profits would have generated. A 20% loss requires a 25% gain just to break even. This is why risk management and capital preservation are more important than maximizing returns." },
      { q: 'How do I know if my target return is sustainable?', a: "Use this calculator alongside the Risk of Ruin Calculator to check if your expected monthly return is achievable without excessive risk. If you need 8% per month but your strategy's risk of ruin is above 10%, the compound projections are meaningless — you'll likely blow the account before reaching the target." },
    ],
  },
  ro: {
    pageTitle: 'KMF Compound Vision — Calculator de Creștere Compusă în Trading | K.M.F.',
    pageDesc: 'Vizualizează cum return-urile lunare disciplinate îți compun contul de trading în timp. Calculator gratuit cu grafic interactiv, marcaje de etape și avertismente de recuperare a drawdown-ului.',
    ogAlt: 'KMF Compound Vision — Calculator de Creștere Compusă în Trading',
    badge: 'Unealtă gratuită',
    heroP: 'Vezi ce poate construi în timp un trading disciplinat și constant. Introdu soldul și o țintă lunară realistă — și lasă compunerea să facă munca grea.',
    explainerToggle: 'Ce e această unealtă și cum mă ajută?',
    explainer: [
      <><strong className="text-kmf-text-primary">Problema:</strong> Cei mai mulți traderi ori își pun ținte de profit nerealiste (ducând la suprariscare și conturi distruse), ori nu înțeleg cât de puternică e consecvența (ducând la nerăbdare și sărit de la o strategie la alta).</>,
      <><strong className="text-kmf-text-primary">Ce face această unealtă:</strong> Îți arată exact cum crește contul tău de trading în timp dacă menții un return lunar constant. Graficul compară creșterea compusă (reinvestind profiturile) cu cea liniară (aceeași sumă fixă în fiecare lună) ca să vezi de ce se compune disciplina.</>,
      <><strong className="text-kmf-text-primary">Cum te ajută:</strong> Pune o țintă lunară realistă, vezi ce e posibil în 12-36 de luni și rămâi motivat când trade-urile individuale par mici. Dacă ești tentat să crești riscul, uită-te la acest grafic — câștigurile mici și constante bat câștigurile mari ocazionale de fiecare dată.</>,
      <><strong className="text-kmf-text-primary">Reality check:</strong> Acest calculator presupune return-uri constante, fără luni pe pierdere. Trading-ul real are drawdown-uri. Folosește <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin Calculator</Link> alături de această unealtă ca să te asiguri că țintele tale sunt sustenabile.</>,
    ],
    presetsPrompt: 'Pornește rapid de la un scenariu:',
    presets: [
      { label: 'Conservator', desc: '$10k, 3%/lună, 12 luni' },
      { label: 'Realist', desc: '$10k, 5%/lună, 24 luni' },
      { label: 'Ambițios', desc: '$10k, 8%/lună, 24 luni' },
      { label: 'DCA + Trading', desc: '$5k, 5%/lună + $500/lună depozit' },
      { label: 'Trăind din Trading', desc: '$50k, 5%/lună, -$1k/lună retragere' },
      { label: 'Prop Firm', desc: '$100k, 3%/lună, 12 luni' },
    ],
    yourNumbers: 'Cifrele tale',
    startBalance: 'Sold de pornire', startBalanceHint: 'Soldul curent al contului tău de trading',
    monthlyReturn: 'Return lunar',
    timeframe: 'Perioadă', monthsSuffix: ' luni',
    addDeposit: 'Adaugă depozit lunar (opțional)', hideDeposit: 'Ascunde depozitul lunar',
    monthlyDeposit: 'Depozit lunar', monthlyDepositHint: 'Capital în plus adăugat în fiecare lună',
    addWithdrawal: 'Adaugă retragere lunară (opțional)', hideWithdrawal: 'Ascunde retragerea lunară',
    monthlyWithdrawal: 'Retragere lunară', monthlyWithdrawalHint: 'Suma pe care o scoți în fiecare lună',
    reality: [
      'Foarte conservator. Realizabil cu risk management corect și o strategie solidă.',
      'Realist pentru traderi experimentați. Cere consecvență și disciplină.',
      'Ambițios. Doar traderii de top susțin asta. Urmărește-ți întâi return-urile reale.',
      'Foarte agresiv. Cei mai mulți traderi care țintesc asta își distrug conturile.',
      'Nerealist pentru un trading susținut. E teritoriu de gambling — așteaptă-te la drawdown-uri.',
    ],
    bustedTitle: (m) => `Cont epuizat în luna ${m}`,
    bustedBody: (w) => `Retragerea ta lunară (${w}) depășește creșterea contului. Redu retragerea sau crește ținta de return.`,
    projectedAfter: (m) => `Sold proiectat după ${m} luni`,
    startingFrom: (b) => `Pornind de la ${b}`,
    statTotalProfit: 'Profit total', statTotalProfitHint: 'Câștiguri pur compuse',
    statGrowth: 'Creștere', statGrowthHint: 'De câte ori ți s-au înmulțit banii',
    statAdvantage: 'Avantaj compunere', statAdvantageHint: 'În plus față de creșterea liniară',
    statMonthProfit: (m) => `Profit luna ${m}`, statMonthProfitHint: 'Doar profitul ultimei luni',
    statWithdrawn: 'Total retras', statWithdrawnHint: 'Venit scos',
    milestoneAt: (mult, month, bal) => `${mult}x în luna ${month} (${bal})`,
    share: 'Distribuie rezultatele', sharing: 'Se generează...',
    growthProjection: 'Proiecție de creștere',
    legendPrincipal: 'Principal', legendProfit: 'Profit compus', legendLinear: 'Liniar',
    chartSub: 'Zona umbrită arată soldul tău împărțit între ce ai pus și ce a generat compunerea. Linia punctată = dacă ai câștiga aceeași sumă fixă în fiecare lună.',
    chartMonthAxis: 'Lună',
    tipMonth: (l) => `Luna ${l}`,
    tipBalance: 'Sold:', tipCompoundProfit: (v) => `Profit compus: ${v}`, tipLinearWould: (v) => `Liniar ar fi: ${v}`,
    tipThisMonth: (v) => `Profitul lunii: ${v}`, tipDeposit: (v) => `+ ${v} depozit`, tipWithdrawal: (v) => `- ${v} retragere`,
    cards: [
      { title: 'Puterea consecvenței', body: 'Un 5% constant pe lună bate alternanța dintre +20% și -15%. Traderul volatil ajunge cu mai puțin după 12 luni fiindcă pierderile dor mai mult decât ajută câștigurile echivalente. Compunerea răsplătește execuția plictisitoare și constantă.' },
      { title: 'De ce se compun edge-urile mici', body: 'Diferența dintre 3% și 5% lunar pare mică. Pe 24 de luni: 3% transformă $10k în $20.328, iar 5% îl face $32.251. Asta e cu 59% mai mult — din doar 2% în plus pe lună. Îmbunătățirile mici ale edge-ului tău au un impact uriaș pe termen lung.' },
      { title: 'Adevăratul dușman: drawdown-ul', body: 'O pierdere de 50% cere un câștig de 100% ca să recuperezi. Drawdown-urile nu doar șterg profitul — distrug motorul compunerii. Conservarea capitalului e prioritatea #1. Fiecare dolar pe care nu-l pierzi continuă să se compună la nesfârșit.' },
    ],
    ddTitle: 'Tabel de recuperare a drawdown-ului',
    ddSub: 'Cât trebuie să câștigi după o pierdere doar ca să revii la break-even.',
    ddLoss: 'Pierdere cont', ddGain: 'Câștig necesar pentru recuperare',
    ddMonths: (pct) => `Luni de recuperare la ${pct}%/lună`, monthsLabel: (m) => `${m} luni`,
    breakdownTitle: 'Detaliere lunară', breakdownSub: 'Proiecție detaliată lună de lună.',
    bMonth: 'Lună', bStart: 'Sold start', bProfit: 'Profit', bDeposit: 'Depozit', bWithdrawal: 'Retragere', bEnd: 'Sold final',
    eduTitle: 'Înțelegerea creșterii compuse în trading',
    eduP1: 'Albert Einstein ar fi numit dobânda compusă „a opta minune a lumii". În trading, compunerea e și mai puternică — fiindcă, spre deosebire de conturile de economii cu rate fixe, un trader priceput poate ținti return-uri lunare semnificativ mai mari.',
    eduMathTitle: 'Matematica ce schimbă totul',
    eduMathP: 'Un trader care face 5% pe lună pe un cont de $10.000 câștigă $500 în prima lună. Dar până în luna 12, același 5% generează $814 — fiindcă contul a crescut la $16.289. Până în luna 24, profitul lunar e $1.326 pe un sold de $32.251. Procentul rămâne același. Dolarii cresc exponențial.',
    eduNeverTitle: 'De ce cei mai mulți traderi nu experimentează asta',
    eduNeverP: 'Curba de creștere compusă de mai sus presupune return-uri lunare constante, fără drawdown-uri majore. În realitate, cei mai mulți traderi își sabotează compunerea prin:',
    eduNeverList: [
      <><strong className="text-kmf-text-primary">Suprariscare</strong> — urmărind o creștere mai rapidă, apoi pierzând 20-30% într-o săptămână proastă</>,
      <><strong className="text-kmf-text-primary">Retragere prea devreme</strong> — scoțând profiturile în loc să le lase să se compună</>,
      <><strong className="text-kmf-text-primary">Sărit de la o strategie la alta</strong> — schimbând strategiile înainte ca compunerea să aibă timp să funcționeze</>,
      <><strong className="text-kmf-text-primary">Revenge trading</strong> — după o pierdere, crescând riscul ca să „recuperezi repede"</>,
    ],
    eduRealTitle: 'Abordarea realistă',
    eduRealP: <>Folosește acest calculator ca o <em>stea polară motivațională</em>, nu ca o garanție. Pune o țintă conservatoare (3-5%), concentrează-te pe <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">risk management corect</Link> și urmărește-ți rezultatele reale într-un <Link to="/" className="text-kmf-accent hover:underline">trading journal</Link>. Dacă return-urile tale lunare reale sunt constant pozitive, compunerea va lucra pentru tine — chiar și la rate mai mici decât cele proiectate.</>,
    eduPairTitle: 'Combină asta cu risk management',
    eduPairP: <>Compunerea funcționează doar dacă îți protejezi capitalul. Folosește <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin Calculator</Link> ca să te asiguri că strategia ta nu explodează înainte să se activeze efectul de compunere. Verifică <Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">Win Rate vs R:R Matrix</Link> ca să confirmi că edge-ul tău e pozitiv.</>,
    faqHeading: 'Întrebări Frecvente',
    bottomSuite: 'Parte din suita gratuită de unelte de trading K.M.F.',
    bottomRuin: 'Risk of Ruin Calculator', bottomMatrix: 'Win Rate vs R:R Matrix', bottomLot: 'Lot Size Calculator',
    faq: [
      { q: 'Ce este creșterea compusă în trading?', a: 'Creșterea compusă înseamnă să reinvestești profiturile din trading ca să genereze return-uri suplimentare. În loc să retragi profiturile în fiecare lună, tranzacționezi cu un cont mai mare. În timp, asta creează o creștere exponențială — profiturile tale își câștigă propriile profituri. Un return de 5% lunar pe $10.000 e $500 în luna 1, dar $814 până în luna 12 fiindcă contul a crescut.' },
      { q: 'E realist 5% pe lună în trading?', a: 'Să atingi constant 5% pe lună te pune în elita traderilor din lume. Majoritatea hedge fund-urilor fac în medie 10-20% pe an. Un return lunar constant de 3-5% cere risk management excelent, o strategie dovedită și o disciplină emoțională puternică. Începe prin a-ți urmări return-urile lunare reale într-un trading journal înainte să proiectezi în viitor.' },
      { q: 'De ce arată acest calculator creșterea liniară vs compusă?', a: 'Linia liniară arată ce se întâmplă dacă faci aceeași sumă în dolari în fiecare lună (fără reinvestire). Curba compusă arată ce se întâmplă când profiturile sunt reinvestite. Decalajul dintre ele — „avantajul compunerii" — crește exponențial în timp. Această vizualizare te ajută să înțelegi de ce consecvența contează mai mult decât câștigurile mari ocazionale.' },
      { q: 'Ce se întâmplă dacă am o lună pe pierdere?', a: 'O singură lună pe pierdere poate da înapoi semnificativ creșterea compusă fiindcă pierzi nu doar profitul potențial al acelei luni, ci toate return-urile compuse pe care le-ar fi generat acele profituri. O pierdere de 20% cere un câștig de 25% doar ca să ajungi la break-even. De asta risk management-ul și conservarea capitalului sunt mai importante decât maximizarea return-urilor.' },
      { q: 'Cum știu dacă ținta mea de return e sustenabilă?', a: 'Folosește acest calculator alături de Risk of Ruin Calculator ca să verifici dacă return-ul lunar așteptat e realizabil fără risc excesiv. Dacă ai nevoie de 8% pe lună, dar risk of ruin-ul strategiei tale e peste 10%, proiecțiile compuse sunt fără sens — probabil vei distruge contul înainte să atingi ținta.' },
    ],
  },
  de: {
    pageTitle: 'KMF Compound Vision — Zinseszins-Rechner fürs Trading | K.M.F.',
    pageDesc: 'Visualisiere, wie disziplinierte monatliche Renditen dein Trading-Konto über die Zeit verzinsen. Kostenloser Rechner mit interaktivem Diagramm, Meilenstein-Markierungen und Drawdown-Warnungen.',
    ogAlt: 'KMF Compound Vision — Zinseszins-Rechner fürs Trading',
    badge: 'Kostenloses Trading-Tool',
    heroP: 'Sieh, was diszipliniertes, konstantes Trading über die Zeit aufbauen kann. Gib deinen Saldo und ein realistisches Monatsziel ein — und lass den Zinseszins die schwere Arbeit machen.',
    explainerToggle: 'Was ist dieses Tool und wie hilft es mir?',
    explainer: [
      <><strong className="text-kmf-text-primary">Das Problem:</strong> Die meisten Trader setzen entweder unrealistische Gewinnziele (was zu Überhebelung und gesprengten Konten führt) oder verstehen nicht, wie mächtig Beständigkeit ist (was zu Ungeduld und ständigem Strategiewechsel führt).</>,
      <><strong className="text-kmf-text-primary">Was dieses Tool tut:</strong> Es zeigt dir genau, wie dein Trading-Konto über die Zeit wächst, wenn du eine konstante Monatsrendite hältst. Das Diagramm vergleicht das Zinseszins-Wachstum (Gewinne reinvestieren) mit dem linearen Wachstum (jeden Monat derselbe feste Betrag), damit du siehst, warum sich Disziplin verzinst.</>,
      <><strong className="text-kmf-text-primary">Wie es hilft:</strong> Setze ein realistisches Monatsziel, sieh, was in 12-36 Monaten möglich ist, und bleib motiviert, wenn einzelne Trades klein wirken. Bist du versucht, das Risiko zu erhöhen, sieh dir dieses Diagramm an — kleine, konstante Gewinne schlagen jedes Mal gelegentliche große Gewinne.</>,
      <><strong className="text-kmf-text-primary">Realitätscheck:</strong> Dieser Rechner setzt konstante Renditen ohne Verlustmonate voraus. Echtes Trading hat Drawdowns. Nutze den <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk-of-Ruin-Rechner</Link> zusammen mit diesem Tool, um sicherzustellen, dass deine Ziele tragfähig sind.</>,
    ],
    presetsPrompt: 'Schnellstart mit einem Szenario:',
    presets: [
      { label: 'Konservativ', desc: '$10k, 3%/Mon., 12 Monate' },
      { label: 'Realistisch', desc: '$10k, 5%/Mon., 24 Monate' },
      { label: 'Ambitioniert', desc: '$10k, 8%/Mon., 24 Monate' },
      { label: 'DCA + Trading', desc: '$5k, 5%/Mon. + $500/Mon. Einzahlung' },
      { label: 'Vom Trading leben', desc: '$50k, 5%/Mon., -$1k/Mon. Auszahlung' },
      { label: 'Prop Firm', desc: '$100k, 3%/Mon., 12 Monate' },
    ],
    yourNumbers: 'Deine Zahlen',
    startBalance: 'Startsaldo', startBalanceHint: 'Der aktuelle Saldo deines Trading-Kontos',
    monthlyReturn: 'Monatsrendite',
    timeframe: 'Zeitraum', monthsSuffix: ' Monate',
    addDeposit: 'Monatliche Einzahlung hinzufügen (optional)', hideDeposit: 'Monatliche Einzahlung ausblenden',
    monthlyDeposit: 'Monatliche Einzahlung', monthlyDepositHint: 'Zusätzliches Kapital, das jeden Monat hinzukommt',
    addWithdrawal: 'Monatliche Auszahlung hinzufügen (optional)', hideWithdrawal: 'Monatliche Auszahlung ausblenden',
    monthlyWithdrawal: 'Monatliche Auszahlung', monthlyWithdrawalHint: 'Betrag, den du jeden Monat entnimmst',
    reality: [
      'Sehr konservativ. Erreichbar mit richtigem Risikomanagement und einer soliden Strategie.',
      'Realistisch für erfahrene Trader. Erfordert Beständigkeit und Disziplin.',
      'Ambitioniert. Nur Top-Trader halten das durch. Verfolge zuerst deine echten Renditen.',
      'Sehr aggressiv. Die meisten Trader, die das anstreben, sprengen stattdessen ihre Konten.',
      'Unrealistisch für nachhaltiges Trading. Das ist Glücksspiel-Territorium — rechne mit Drawdowns.',
    ],
    bustedTitle: (m) => `Konto aufgebraucht in Monat ${m}`,
    bustedBody: (w) => `Deine monatliche Auszahlung (${w}) übersteigt das Wachstum des Kontos. Reduziere die Auszahlung oder erhöhe dein Renditeziel.`,
    projectedAfter: (m) => `Prognostizierter Saldo nach ${m} Monaten`,
    startingFrom: (b) => `Ausgehend von ${b}`,
    statTotalProfit: 'Gesamtgewinn', statTotalProfitHint: 'Reine Zinseszins-Erträge',
    statGrowth: 'Wachstum', statGrowthHint: 'Dein Geld vervielfacht um',
    statAdvantage: 'Zinseszins-Vorteil', statAdvantageHint: 'Mehr gegenüber linearem Wachstum',
    statMonthProfit: (m) => `Gewinn Monat ${m}`, statMonthProfitHint: 'Nur der Gewinn des letzten Monats',
    statWithdrawn: 'Gesamt ausgezahlt', statWithdrawnHint: 'Entnommenes Einkommen',
    milestoneAt: (mult, month, bal) => `${mult}x in Monat ${month} (${bal})`,
    share: 'Ergebnisse teilen', sharing: 'Wird erstellt...',
    growthProjection: 'Wachstumsprognose',
    legendPrincipal: 'Kapital', legendProfit: 'Zinseszins-Gewinn', legendLinear: 'Linear',
    chartSub: 'Die schattierte Fläche zeigt deinen Saldo, aufgeteilt zwischen dem, was du eingezahlt hast, und dem, was der Zinseszins erzeugt hat. Die gestrichelte Linie = wenn du jeden Monat denselben festen Betrag verdienen würdest.',
    chartMonthAxis: 'Monat',
    tipMonth: (l) => `Monat ${l}`,
    tipBalance: 'Saldo:', tipCompoundProfit: (v) => `Zinseszins-Gewinn: ${v}`, tipLinearWould: (v) => `Linear wäre: ${v}`,
    tipThisMonth: (v) => `Gewinn dieses Monats: ${v}`, tipDeposit: (v) => `+ ${v} Einzahlung`, tipWithdrawal: (v) => `- ${v} Auszahlung`,
    cards: [
      { title: 'Die Macht der Beständigkeit', body: 'Stetige 5% pro Monat schlagen den Wechsel zwischen +20% und -15%. Der volatile Trader endet nach 12 Monaten mit weniger, weil Verluste mehr schmerzen, als gleich große Gewinne helfen. Der Zinseszins belohnt langweilige, konstante Ausführung.' },
      { title: 'Warum sich kleine Edges verzinsen', body: 'Der Unterschied zwischen 3% und 5% monatlich wirkt klein. Über 24 Monate: 3% machen aus $10k $20.328, während 5% daraus $32.251 machen. Das sind 59% mehr — aus nur 2% extra pro Monat. Kleine Verbesserungen deines Edges haben langfristig enorme Wirkung.' },
      { title: 'Der wahre Feind: Drawdown', body: 'Ein Verlust von 50% erfordert 100% Gewinn zur Erholung. Drawdowns löschen nicht nur Gewinn — sie zerstören den Zinseszins-Motor. Kapitalerhalt ist Priorität Nr. 1. Jeder Dollar, den du nicht verlierst, verzinst sich für immer weiter.' },
    ],
    ddTitle: 'Drawdown-Erholungstabelle',
    ddSub: 'Wie viel du nach einem Verlust gewinnen musst, nur um wieder bei null zu sein.',
    ddLoss: 'Kontoverlust', ddGain: 'Nötiger Gewinn zur Erholung',
    ddMonths: (pct) => `Monate bis zur Erholung bei ${pct}%/Mon.`, monthsLabel: (m) => `${m} Monate`,
    breakdownTitle: 'Monatliche Aufschlüsselung', breakdownSub: 'Detaillierte Prognose Monat für Monat.',
    bMonth: 'Monat', bStart: 'Saldo Start', bProfit: 'Gewinn', bDeposit: 'Einzahlung', bWithdrawal: 'Auszahlung', bEnd: 'Saldo Ende',
    eduTitle: 'Zinseszins-Wachstum im Trading verstehen',
    eduP1: 'Albert Einstein soll den Zinseszins „das achte Weltwunder" genannt haben. Im Trading ist der Zinseszins noch mächtiger — denn anders als Sparkonten mit festen Zinssätzen kann ein geschickter Trader deutlich höhere Monatsrenditen anstreben.',
    eduMathTitle: 'Die Mathematik, die alles verändert',
    eduMathP: 'Ein Trader, der 5% pro Monat auf einem $10.000-Konto macht, verdient im ersten Monat $500. Aber bis Monat 12 erzeugen dieselben 5% schon $814 — weil das Konto auf $16.289 gewachsen ist. Bis Monat 24 beträgt der Monatsgewinn $1.326 bei einem Saldo von $32.251. Der Prozentsatz bleibt gleich. Die Dollar wachsen exponentiell.',
    eduNeverTitle: 'Warum die meisten Trader das nie erleben',
    eduNeverP: 'Die Zinseszins-Wachstumskurve oben setzt konstante Monatsrenditen ohne größere Drawdowns voraus. In Wirklichkeit sabotieren die meisten Trader ihren Zinseszins durch:',
    eduNeverList: [
      <><strong className="text-kmf-text-primary">Überhebelung</strong> — schnelleres Wachstum jagen und dann in einer schlechten Woche 20-30% verlieren</>,
      <><strong className="text-kmf-text-primary">Zu frühes Auszahlen</strong> — Gewinne entnehmen, statt sie sich verzinsen zu lassen</>,
      <><strong className="text-kmf-text-primary">Strategie-Hopping</strong> — Strategien wechseln, bevor der Zinseszins Zeit hatte zu wirken</>,
      <><strong className="text-kmf-text-primary">Revenge Trading</strong> — nach einem Verlust das Risiko erhöhen, um es „schnell zurückzuholen"</>,
    ],
    eduRealTitle: 'Der realistische Ansatz',
    eduRealP: <>Nutze diesen Rechner als <em>motivierenden Nordstern</em>, nicht als Garantie. Setze ein konservatives Ziel (3-5%), konzentriere dich auf <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">richtiges Risikomanagement</Link> und verfolge deine echten Ergebnisse in einem <Link to="/" className="text-kmf-accent hover:underline">Trading-Journal</Link>. Sind deine echten Monatsrenditen konstant positiv, wird der Zinseszins für dich arbeiten — auch bei niedrigeren Raten als prognostiziert.</>,
    eduPairTitle: 'Kombiniere das mit Risikomanagement',
    eduPairP: <>Der Zinseszins funktioniert nur, wenn du dein Kapital schützt. Nutze den <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk-of-Ruin-Rechner</Link>, um sicherzustellen, dass deine Strategie nicht sprengt, bevor der Zinseszins-Effekt einsetzt. Prüfe die <Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">Win Rate vs R:R Matrix</Link>, um zu bestätigen, dass dein Edge positiv ist.</>,
    faqHeading: 'Häufige Fragen',
    bottomSuite: 'Teil der kostenlosen K.M.F.-Trading-Tool-Suite',
    bottomRuin: 'Risk-of-Ruin-Rechner', bottomMatrix: 'Win Rate vs R:R Matrix', bottomLot: 'Lot-Size-Rechner',
    faq: [
      { q: 'Was ist Zinseszins-Wachstum im Trading?', a: 'Zinseszins-Wachstum bedeutet, deine Trading-Gewinne zu reinvestieren, damit sie zusätzliche Renditen erzeugen. Statt die Gewinne jeden Monat zu entnehmen, tradest du mit einem größeren Konto. Über die Zeit entsteht exponentielles Wachstum — deine Gewinne verdienen ihre eigenen Gewinne. Eine Monatsrendite von 5% auf $10.000 sind $500 in Monat 1, aber $814 bis Monat 12, weil das Konto gewachsen ist.' },
      { q: 'Sind 5% pro Monat im Trading realistisch?', a: 'Konstant 5% pro Monat zu erreichen, bringt dich in die weltweite Spitzengruppe der Trader. Die meisten Hedgefonds machen im Schnitt 10-20% pro Jahr. Eine konstante Monatsrendite von 3-5% erfordert exzellentes Risikomanagement, eine bewährte Strategie und starke emotionale Disziplin. Beginne damit, deine echten Monatsrenditen in einem Trading-Journal zu verfolgen, bevor du in die Zukunft projizierst.' },
      { q: 'Warum zeigt dieser Rechner lineares vs. Zinseszins-Wachstum?', a: 'Die lineare Linie zeigt, was passiert, wenn du jeden Monat denselben Dollar-Betrag machst (keine Reinvestition). Die Zinseszins-Kurve zeigt, was passiert, wenn Gewinne reinvestiert werden. Die Lücke dazwischen — der „Zinseszins-Vorteil" — wächst exponentiell über die Zeit. Diese Visualisierung hilft dir zu verstehen, warum Beständigkeit mehr zählt als gelegentliche große Gewinne.' },
      { q: 'Was passiert, wenn ich einen Verlustmonat habe?', a: 'Ein einzelner Verlustmonat kann das Zinseszins-Wachstum erheblich zurückwerfen, weil du nicht nur den potenziellen Gewinn dieses Monats verlierst, sondern alle Zinseszins-Renditen, die diese Gewinne erzeugt hätten. Ein Verlust von 20% erfordert 25% Gewinn, nur um wieder bei null zu sein. Deshalb sind Risikomanagement und Kapitalerhalt wichtiger als das Maximieren der Renditen.' },
      { q: 'Woran erkenne ich, ob mein Renditeziel tragfähig ist?', a: 'Nutze diesen Rechner zusammen mit dem Risk-of-Ruin-Rechner, um zu prüfen, ob deine erwartete Monatsrendite ohne übermäßiges Risiko erreichbar ist. Wenn du 8% pro Monat brauchst, aber der Risk of Ruin deiner Strategie über 10% liegt, sind die Zinseszins-Prognosen bedeutungslos — du sprengst wahrscheinlich das Konto, bevor du das Ziel erreichst.' },
    ],
  },
  fr: {
    pageTitle: 'KMF Compound Vision — Calculateur de croissance composée en trading | K.M.F.',
    pageDesc: 'Visualisez comment des rendements mensuels disciplinés font croître votre compte de trading dans le temps. Calculateur gratuit avec graphique interactif, jalons et avertissements de récupération de drawdown.',
    ogAlt: 'KMF Compound Vision — Calculateur de croissance composée en trading',
    badge: 'Outil de trading gratuit',
    heroP: 'Voyez ce qu\'un trading discipliné et constant peut bâtir dans le temps. Saisissez votre solde et un objectif mensuel réaliste — et laissez la capitalisation faire le gros du travail.',
    explainerToggle: 'Qu\'est-ce que cet outil et comment m\'aide-t-il ?',
    explainer: [
      <><strong className="text-kmf-text-primary">Le problème :</strong> la plupart des traders fixent soit des objectifs de profit irréalistes (menant au sur-levier et à des comptes explosés), soit ne comprennent pas la puissance de la constance (menant à l\'impatience et au saut de stratégie en stratégie).</>,
      <><strong className="text-kmf-text-primary">Ce que fait cet outil :</strong> il vous montre exactement comment votre compte de trading croît dans le temps si vous maintenez un rendement mensuel constant. Le graphique compare la croissance composée (réinvestir les profits) à la croissance linéaire (le même montant fixe chaque mois) pour que vous voyiez pourquoi la discipline se capitalise.</>,
      <><strong className="text-kmf-text-primary">Comment il aide :</strong> fixez un objectif mensuel réaliste, voyez ce qui est possible en 12-36 mois et restez motivé quand les trades individuels semblent petits. Si vous êtes tenté d\'augmenter le risque, regardez ce graphique — de petits gains constants battent les gros gains occasionnels à chaque fois.</>,
      <><strong className="text-kmf-text-primary">Retour à la réalité :</strong> ce calculateur suppose des rendements constants sans mois perdants. Le trading réel a des drawdowns. Utilisez le <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">calculateur de Risk of Ruin</Link> avec cet outil pour vous assurer que vos objectifs sont tenables.</>,
    ],
    presetsPrompt: 'Démarrage rapide avec un scénario :',
    presets: [
      { label: 'Conservateur', desc: '10k$, 3%/mois, 12 mois' },
      { label: 'Réaliste', desc: '10k$, 5%/mois, 24 mois' },
      { label: 'Ambitieux', desc: '10k$, 8%/mois, 24 mois' },
      { label: 'DCA + Trading', desc: '5k$, 5%/mois + 500$/mois de dépôt' },
      { label: 'Vivre du trading', desc: '50k$, 5%/mois, -1k$/mois de retrait' },
      { label: 'Prop Firm', desc: '100k$, 3%/mois, 12 mois' },
    ],
    yourNumbers: 'Vos chiffres',
    startBalance: 'Solde de départ', startBalanceHint: 'Le solde actuel de votre compte de trading',
    monthlyReturn: 'Rendement mensuel',
    timeframe: 'Période', monthsSuffix: ' mois',
    addDeposit: 'Ajouter un dépôt mensuel (optionnel)', hideDeposit: 'Masquer le dépôt mensuel',
    monthlyDeposit: 'Dépôt mensuel', monthlyDepositHint: 'Capital supplémentaire ajouté chaque mois',
    addWithdrawal: 'Ajouter un retrait mensuel (optionnel)', hideWithdrawal: 'Masquer le retrait mensuel',
    monthlyWithdrawal: 'Retrait mensuel', monthlyWithdrawalHint: 'Montant que vous retirez chaque mois',
    reality: [
      'Très conservateur. Réalisable avec une bonne gestion du risque et une stratégie solide.',
      'Réaliste pour les traders expérimentés. Exige constance et discipline.',
      'Ambitieux. Seuls les traders d\'élite tiennent cela. Suivez d\'abord vos rendements réels.',
      'Très agressif. La plupart des traders qui visent cela font plutôt exploser leur compte.',
      'Irréaliste pour un trading durable. C\'est le territoire du jeu — attendez-vous à des drawdowns.',
    ],
    bustedTitle: (m) => `Compte épuisé au mois ${m}`,
    bustedBody: (w) => `Votre retrait mensuel (${w}) dépasse la croissance du compte. Réduisez le retrait ou augmentez votre objectif de rendement.`,
    projectedAfter: (m) => `Solde projeté après ${m} mois`,
    startingFrom: (b) => `À partir de ${b}`,
    statTotalProfit: 'Profit total', statTotalProfitHint: 'Gains purement composés',
    statGrowth: 'Croissance', statGrowthHint: 'Votre argent multiplié par',
    statAdvantage: 'Avantage de la capitalisation', statAdvantageHint: 'En plus de la croissance linéaire',
    statMonthProfit: (m) => `Profit du mois ${m}`, statMonthProfitHint: 'Le profit du dernier mois seul',
    statWithdrawn: 'Total retiré', statWithdrawnHint: 'Revenu retiré',
    milestoneAt: (mult, month, bal) => `${mult}x au mois ${month} (${bal})`,
    share: 'Partager les résultats', sharing: 'Génération...',
    growthProjection: 'Projection de croissance',
    legendPrincipal: 'Capital', legendProfit: 'Profit composé', legendLinear: 'Linéaire',
    chartSub: 'La zone ombrée montre votre solde réparti entre ce que vous avez investi et ce que la capitalisation a généré. La ligne pointillée = si vous gagniez le même montant fixe chaque mois.',
    chartMonthAxis: 'Mois',
    tipMonth: (l) => `Mois ${l}`,
    tipBalance: 'Solde :', tipCompoundProfit: (v) => `Profit composé : ${v}`, tipLinearWould: (v) => `Linéaire serait : ${v}`,
    tipThisMonth: (v) => `Profit de ce mois : ${v}`, tipDeposit: (v) => `+ ${v} dépôt`, tipWithdrawal: (v) => `- ${v} retrait`,
    cards: [
      { title: 'La puissance de la constance', body: 'Un 5 % stable par mois bat l\'alternance entre +20 % et -15 %. Le trader volatil finit avec moins après 12 mois car les pertes font plus mal que les gains équivalents n\'aident. La capitalisation récompense une exécution ennuyeuse et constante.' },
      { title: 'Pourquoi les petits avantages se capitalisent', body: 'La différence entre 3 % et 5 % par mois semble faible. Sur 24 mois : 3 % transforme 10k$ en 20 328 $, tandis que 5 % en fait 32 251 $. C\'est 59 % de plus — à partir de seulement 2 % de plus par mois. De petites améliorations de votre avantage ont un impact énorme à long terme.' },
      { title: 'Le vrai ennemi : le drawdown', body: 'Une perte de 50 % nécessite un gain de 100 % pour récupérer. Les drawdowns n\'effacent pas seulement le profit — ils détruisent le moteur de la capitalisation. La préservation du capital est la priorité n°1. Chaque dollar que vous ne perdez pas continue de se capitaliser pour toujours.' },
    ],
    ddTitle: 'Tableau de récupération de drawdown',
    ddSub: 'Combien vous devez gagner après une perte juste pour revenir à l\'équilibre.',
    ddLoss: 'Perte du compte', ddGain: 'Gain nécessaire pour récupérer',
    ddMonths: (pct) => `Mois pour récupérer à ${pct}%/mois`, monthsLabel: (m) => `${m} mois`,
    breakdownTitle: 'Détail mensuel', breakdownSub: 'Projection détaillée mois par mois.',
    bMonth: 'Mois', bStart: 'Solde début', bProfit: 'Profit', bDeposit: 'Dépôt', bWithdrawal: 'Retrait', bEnd: 'Solde fin',
    eduTitle: 'Comprendre la croissance composée en trading',
    eduP1: 'Albert Einstein aurait qualifié les intérêts composés de « huitième merveille du monde ». En trading, la capitalisation est encore plus puissante — car contrairement aux comptes d\'épargne à taux fixe, un trader compétent peut viser des rendements mensuels nettement plus élevés.',
    eduMathTitle: 'Les maths qui changent tout',
    eduMathP: 'Un trader qui fait 5 % par mois sur un compte de 10 000 $ gagne 500 $ le premier mois. Mais au mois 12, ces mêmes 5 % génèrent 814 $ — car le compte a grandi jusqu\'à 16 289 $. Au mois 24, le profit mensuel est de 1 326 $ sur un solde de 32 251 $. Le pourcentage reste le même. Les dollars croissent exponentiellement.',
    eduNeverTitle: 'Pourquoi la plupart des traders ne vivent jamais cela',
    eduNeverP: 'La courbe de croissance composée ci-dessus suppose des rendements mensuels constants sans drawdowns majeurs. En réalité, la plupart des traders sabotent leur capitalisation en :',
    eduNeverList: [
      <><strong className="text-kmf-text-primary">Sur-leviérant</strong> — en cherchant une croissance plus rapide, puis en perdant 20-30 % en une mauvaise semaine</>,
      <><strong className="text-kmf-text-primary">Retirant trop tôt</strong> — en retirant les profits au lieu de les laisser se capitaliser</>,
      <><strong className="text-kmf-text-primary">Sautant de stratégie</strong> — en changeant de stratégie avant que la capitalisation ait eu le temps d\'agir</>,
      <><strong className="text-kmf-text-primary">Revenge trading</strong> — après une perte, en augmentant le risque pour « tout récupérer vite »</>,
    ],
    eduRealTitle: 'L\'approche réaliste',
    eduRealP: <>Utilisez ce calculateur comme une <em>étoile polaire motivante</em>, pas comme une garantie. Fixez un objectif conservateur (3-5 %), concentrez-vous sur une <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">bonne gestion du risque</Link> et suivez vos résultats réels dans un <Link to="/" className="text-kmf-accent hover:underline">journal de trading</Link>. Si vos rendements mensuels réels sont constamment positifs, la capitalisation travaillera pour vous — même à des taux inférieurs aux projections.</>,
    eduPairTitle: 'Associez ceci à la gestion du risque',
    eduPairP: <>La capitalisation ne fonctionne que si vous protégez votre capital. Utilisez le <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">calculateur de Risk of Ruin</Link> pour vous assurer que votre stratégie n\'explosera pas avant que l\'effet de capitalisation ne s\'enclenche. Vérifiez la <Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">matrice Win Rate vs R:R</Link> pour confirmer que votre avantage est positif.</>,
    faqHeading: 'Questions fréquentes',
    bottomSuite: 'Fait partie de la suite gratuite d\'outils de trading K.M.F.',
    bottomRuin: 'Calculateur de Risk of Ruin', bottomMatrix: 'Matrice Win Rate vs R:R', bottomLot: 'Calculateur de lot',
    faq: [
      { q: 'Qu\'est-ce que la croissance composée en trading ?', a: 'La croissance composée consiste à réinvestir vos profits de trading pour qu\'ils génèrent des rendements supplémentaires. Au lieu de retirer les profits chaque mois, vous tradez avec un compte plus grand. Avec le temps, cela crée une croissance exponentielle — vos profits gagnent leurs propres profits. Un rendement de 5 % par mois sur 10 000 $ donne 500 $ au mois 1, mais 814 $ au mois 12 car le compte a grandi.' },
      { q: '5 % par mois est-il réaliste en trading ?', a: 'Atteindre 5 % par mois de façon constante vous place dans l\'élite mondiale des traders. La plupart des hedge funds font en moyenne 10-20 % par an. Un rendement mensuel constant de 3-5 % exige une excellente gestion du risque, une stratégie éprouvée et une forte discipline émotionnelle. Commencez par suivre vos rendements mensuels réels dans un journal avant de projeter.' },
      { q: 'Pourquoi ce calculateur montre-t-il la croissance linéaire vs composée ?', a: 'La ligne linéaire montre ce qui se passe si vous gagnez le même montant en dollars chaque mois (sans réinvestissement). La courbe composée montre ce qui se passe quand les profits sont réinvestis. L\'écart entre les deux — « l\'avantage de la capitalisation » — croît exponentiellement dans le temps. Cette visualisation vous aide à comprendre pourquoi la constance compte plus que les gros gains occasionnels.' },
      { q: 'Que se passe-t-il si j\'ai un mois perdant ?', a: 'Un seul mois perdant peut faire reculer sensiblement la croissance composée car vous perdez non seulement le profit potentiel de ce mois, mais tous les rendements composés que ces profits auraient générés. Une perte de 20 % nécessite un gain de 25 % juste pour revenir à l\'équilibre. C\'est pourquoi la gestion du risque et la préservation du capital sont plus importantes que la maximisation des rendements.' },
      { q: 'Comment savoir si mon objectif de rendement est tenable ?', a: 'Utilisez ce calculateur avec le calculateur de Risk of Ruin pour vérifier si votre rendement mensuel attendu est atteignable sans risque excessif. Si vous avez besoin de 8 % par mois mais que le risk of ruin de votre stratégie dépasse 10 %, les projections composées n\'ont aucun sens — vous ferez probablement exploser le compte avant d\'atteindre l\'objectif.' },
    ],
  },
  ru: {
    pageTitle: 'KMF Compound Vision — калькулятор сложного роста в трейдинге | K.M.F.',
    pageDesc: 'Визуализируйте, как дисциплинированная месячная доходность наращивает ваш торговый счёт со временем. Бесплатный калькулятор с интерактивным графиком, отметками этапов и предупреждениями о восстановлении после просадки.',
    ogAlt: 'KMF Compound Vision — калькулятор сложного роста в трейдинге',
    badge: 'Бесплатный торговый инструмент',
    heroP: 'Посмотрите, что может построить со временем дисциплинированный, стабильный трейдинг. Введите свой баланс и реалистичную месячную цель — и пусть сложный процент сделает тяжёлую работу.',
    explainerToggle: 'Что это за инструмент и как он мне помогает?',
    explainer: [
      <><strong className="text-kmf-text-primary">Проблема:</strong> большинство трейдеров либо ставят нереалистичные цели по прибыли (что ведёт к избыточному плечу и слитым счетам), либо не понимают, насколько мощна стабильность (что ведёт к нетерпению и перескакиванию между стратегиями).</>,
      <><strong className="text-kmf-text-primary">Что делает этот инструмент:</strong> он показывает точно, как ваш торговый счёт растёт со временем, если вы держите стабильную месячную доходность. График сравнивает сложный рост (реинвестирование прибыли) с линейным (одна и та же фиксированная сумма каждый месяц), чтобы вы увидели, почему дисциплина накапливается.</>,
      <><strong className="text-kmf-text-primary">Как он помогает:</strong> поставьте реалистичную месячную цель, посмотрите, что возможно за 12-36 месяцев, и оставайтесь мотивированными, когда отдельные сделки кажутся мелкими. Если вы хотите повысить риск, посмотрите на этот график — мелкие стабильные прибыли каждый раз бьют редкие большие выигрыши.</>,
      <><strong className="text-kmf-text-primary">Проверка реальностью:</strong> этот калькулятор предполагает стабильную доходность без убыточных месяцев. В реальном трейдинге есть просадки. Используйте <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">калькулятор Risk of Ruin</Link> вместе с этим инструментом, чтобы убедиться, что ваши цели устойчивы.</>,
    ],
    presetsPrompt: 'Быстрый старт со сценарием:',
    presets: [
      { label: 'Консервативный', desc: '$10k, 3%/мес, 12 месяцев' },
      { label: 'Реалистичный', desc: '$10k, 5%/мес, 24 месяца' },
      { label: 'Амбициозный', desc: '$10k, 8%/мес, 24 месяца' },
      { label: 'DCA + трейдинг', desc: '$5k, 5%/мес + $500/мес пополнение' },
      { label: 'Жить с трейдинга', desc: '$50k, 5%/мес, -$1k/мес вывод' },
      { label: 'Prop Firm', desc: '$100k, 3%/мес, 12 месяцев' },
    ],
    yourNumbers: 'Ваши цифры',
    startBalance: 'Стартовый баланс', startBalanceHint: 'Текущий баланс вашего торгового счёта',
    monthlyReturn: 'Месячная доходность',
    timeframe: 'Период', monthsSuffix: ' месяцев',
    addDeposit: 'Добавить месячное пополнение (опц.)', hideDeposit: 'Скрыть месячное пополнение',
    monthlyDeposit: 'Месячное пополнение', monthlyDepositHint: 'Дополнительный капитал, добавляемый каждый месяц',
    addWithdrawal: 'Добавить месячный вывод (опц.)', hideWithdrawal: 'Скрыть месячный вывод',
    monthlyWithdrawal: 'Месячный вывод', monthlyWithdrawalHint: 'Сумма, которую вы выводите каждый месяц',
    reality: [
      'Очень консервативно. Достижимо при правильном риск-менеджменте и надёжной стратегии.',
      'Реалистично для опытных трейдеров. Требует стабильности и дисциплины.',
      'Амбициозно. Только трейдеры топ-уровня выдерживают это. Сначала отслеживайте свою реальную доходность.',
      'Очень агрессивно. Большинство трейдеров, целящихся в это, вместо этого сливают счета.',
      'Нереалистично для устойчивого трейдинга. Это территория азарта — ждите просадок.',
    ],
    bustedTitle: (m) => `Счёт исчерпан на месяце ${m}`,
    bustedBody: (w) => `Ваш месячный вывод (${w}) превышает рост счёта. Уменьшите вывод или повысьте целевую доходность.`,
    projectedAfter: (m) => `Прогнозируемый баланс через ${m} мес.`,
    startingFrom: (b) => `Начиная с ${b}`,
    statTotalProfit: 'Общая прибыль', statTotalProfitHint: 'Чисто сложные доходы',
    statGrowth: 'Рост', statGrowthHint: 'Ваши деньги умножены на',
    statAdvantage: 'Преимущество сложного процента', statAdvantageHint: 'Сверх линейного роста',
    statMonthProfit: (m) => `Прибыль месяца ${m}`, statMonthProfitHint: 'Только прибыль последнего месяца',
    statWithdrawn: 'Всего выведено', statWithdrawnHint: 'Выведенный доход',
    milestoneAt: (mult, month, bal) => `${mult}x на месяце ${month} (${bal})`,
    share: 'Поделиться результатами', sharing: 'Генерация...',
    growthProjection: 'Прогноз роста',
    legendPrincipal: 'Основной капитал', legendProfit: 'Сложная прибыль', legendLinear: 'Линейно',
    chartSub: 'Затенённая область показывает ваш баланс, разделённый между тем, что вы вложили, и тем, что создал сложный процент. Пунктирная линия = если бы вы зарабатывали одну фиксированную сумму каждый месяц.',
    chartMonthAxis: 'Месяц',
    tipMonth: (l) => `Месяц ${l}`,
    tipBalance: 'Баланс:', tipCompoundProfit: (v) => `Сложная прибыль: ${v}`, tipLinearWould: (v) => `Линейно было бы: ${v}`,
    tipThisMonth: (v) => `Прибыль этого месяца: ${v}`, tipDeposit: (v) => `+ ${v} пополнение`, tipWithdrawal: (v) => `- ${v} вывод`,
    cards: [
      { title: 'Сила стабильности', body: 'Стабильные 5% в месяц бьют чередование +20% и -15%. Волатильный трейдер заканчивает с меньшим после 12 месяцев, потому что убытки бьют сильнее, чем помогают равные прибыли. Сложный процент вознаграждает скучное, стабильное исполнение.' },
      { title: 'Почему малые преимущества накапливаются', body: 'Разница между 3% и 5% в месяц кажется малой. За 24 месяца: 3% превращают $10k в $20 328, а 5% — в $32 251. Это на 59% больше — всего из 2% доп. в месяц. Малые улучшения вашего преимущества дают огромный долгосрочный эффект.' },
      { title: 'Настоящий враг: просадка', body: 'Убыток 50% требует прибыли 100% для восстановления. Просадки не просто стирают прибыль — они разрушают двигатель сложного процента. Сохранение капитала — приоритет №1. Каждый доллар, который вы не теряете, продолжает накапливаться вечно.' },
    ],
    ddTitle: 'Таблица восстановления после просадки',
    ddSub: 'Сколько нужно заработать после убытка, просто чтобы вернуться в безубыток.',
    ddLoss: 'Убыток счёта', ddGain: 'Нужная прибыль для восстановления',
    ddMonths: (pct) => `Месяцев на восстановление при ${pct}%/мес`, monthsLabel: (m) => `${m} мес.`,
    breakdownTitle: 'Помесячная разбивка', breakdownSub: 'Детальный прогноз месяц за месяцем.',
    bMonth: 'Месяц', bStart: 'Баланс начало', bProfit: 'Прибыль', bDeposit: 'Пополнение', bWithdrawal: 'Вывод', bEnd: 'Баланс конец',
    eduTitle: 'Понимание сложного роста в трейдинге',
    eduP1: 'Альберт Эйнштейн, по преданию, называл сложный процент «восьмым чудом света». В трейдинге сложный процент ещё мощнее — потому что, в отличие от сберегательных счетов с фиксированными ставками, умелый трейдер может целиться в значительно более высокую месячную доходность.',
    eduMathTitle: 'Математика, которая меняет всё',
    eduMathP: 'Трейдер, делающий 5% в месяц на счёте $10 000, зарабатывает $500 в первый месяц. Но к месяцу 12 те же 5% дают $814 — потому что счёт вырос до $16 289. К месяцу 24 месячная прибыль составляет $1 326 на балансе $32 251. Процент остаётся тем же. Доллары растут экспоненциально.',
    eduNeverTitle: 'Почему большинство трейдеров этого никогда не испытывают',
    eduNeverP: 'Кривая сложного роста выше предполагает стабильную месячную доходность без крупных просадок. На деле большинство трейдеров саботируют свой сложный процент через:',
    eduNeverList: [
      <><strong className="text-kmf-text-primary">Избыточное плечо</strong> — гонясь за быстрым ростом, затем теряя 20-30% за плохую неделю</>,
      <><strong className="text-kmf-text-primary">Слишком ранний вывод</strong> — снимая прибыль вместо того, чтобы дать ей накапливаться</>,
      <><strong className="text-kmf-text-primary">Перескакивание стратегий</strong> — меняя стратегии до того, как сложный процент успеет сработать</>,
      <><strong className="text-kmf-text-primary">Revenge trading</strong> — после убытка повышая риск, чтобы «быстро отыграться»</>,
    ],
    eduRealTitle: 'Реалистичный подход',
    eduRealP: <>Используйте этот калькулятор как <em>мотивирующую путеводную звезду</em>, а не гарантию. Поставьте консервативную цель (3-5%), сосредоточьтесь на <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">правильном риск-менеджменте</Link> и отслеживайте свои реальные результаты в <Link to="/" className="text-kmf-accent hover:underline">торговом журнале</Link>. Если ваша реальная месячная доходность стабильно положительна, сложный процент будет работать на вас — даже при ставках ниже прогнозируемых.</>,
    eduPairTitle: 'Сочетайте это с риск-менеджментом',
    eduPairP: <>Сложный процент работает, только если вы защищаете капитал. Используйте <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">калькулятор Risk of Ruin</Link>, чтобы убедиться, что ваша стратегия не взорвётся до того, как сработает эффект сложного процента. Проверьте <Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">матрицу Win Rate vs R:R</Link>, чтобы подтвердить, что ваше преимущество положительно.</>,
    faqHeading: 'Частые вопросы',
    bottomSuite: 'Часть бесплатного набора торговых инструментов K.M.F.',
    bottomRuin: 'Калькулятор Risk of Ruin', bottomMatrix: 'Матрица Win Rate vs R:R', bottomLot: 'Калькулятор лота',
    faq: [
      { q: 'Что такое сложный рост в трейдинге?', a: 'Сложный рост — это реинвестирование торговой прибыли, чтобы она приносила дополнительный доход. Вместо вывода прибыли каждый месяц вы торгуете с большим счётом. Со временем это создаёт экспоненциальный рост — ваша прибыль зарабатывает собственную прибыль. Доходность 5% в месяц на $10 000 — это $500 в месяц 1, но $814 к месяцу 12, потому что счёт вырос.' },
      { q: 'Реалистичны ли 5% в месяц в трейдинге?', a: 'Стабильно достигать 5% в месяц — значит входить в мировую элиту трейдеров. Большинство хедж-фондов делают в среднем 10-20% в год. Стабильная месячная доходность 3-5% требует отличного риск-менеджмента, проверенной стратегии и сильной эмоциональной дисциплины. Начните с отслеживания своей реальной месячной доходности в журнале перед прогнозами.' },
      { q: 'Почему этот калькулятор показывает линейный против сложного роста?', a: 'Линейная линия показывает, что происходит, если вы делаете одну и ту же сумму в долларах каждый месяц (без реинвестирования). Сложная кривая показывает, что происходит при реинвестировании прибыли. Разрыв между ними — «преимущество сложного процента» — растёт экспоненциально со временем. Эта визуализация помогает понять, почему стабильность важнее редких больших выигрышей.' },
      { q: 'Что произойдёт, если у меня будет убыточный месяц?', a: 'Один убыточный месяц может значительно отбросить сложный рост назад, потому что вы теряете не только потенциальную прибыль того месяца, но и весь сложный доход, который эта прибыль создала бы. Убыток 20% требует прибыли 25% просто чтобы выйти в безубыток. Поэтому риск-менеджмент и сохранение капитала важнее максимизации доходности.' },
      { q: 'Как понять, устойчива ли моя цель по доходности?', a: 'Используйте этот калькулятор вместе с калькулятором Risk of Ruin, чтобы проверить, достижима ли ваша ожидаемая месячная доходность без чрезмерного риска. Если вам нужно 8% в месяц, но risk of ruin вашей стратегии выше 10%, сложные прогнозы бессмысленны — вы, вероятно, сольёте счёт до достижения цели.' },
    ],
  },
  ja: {
    pageTitle: 'KMF Compound Vision — トレード複利成長計算機 | K.M.F.',
    pageDesc: '規律ある月次リターンが時間とともにトレード口座をどう複利成長させるかを可視化。インタラクティブなグラフ、マイルストーン、ドローダウン回復の警告を備えた無料計算機。',
    ogAlt: 'KMF Compound Vision — トレード複利成長計算機',
    badge: '無料トレードツール',
    heroP: '規律ある一貫したトレードが時間をかけて何を築けるかを見ましょう。残高と現実的な月次目標を入力し、複利に重労働を任せましょう。',
    explainerToggle: 'このツールは何で、どう役立つ？',
    explainer: [
      <><strong className="text-kmf-text-primary">問題：</strong>ほとんどのトレーダーは、非現実的な利益目標を設定する（過剰レバレッジと口座破綻につながる）か、一貫性の力を理解していない（焦りと戦略の乗り換えにつながる）かのどちらかです。</>,
      <><strong className="text-kmf-text-primary">このツールがすること：</strong>一定の月次リターンを維持した場合に、トレード口座が時間とともにどう成長するかを正確に示します。グラフは複利成長（利益を再投資）と線形成長（毎月同じ固定額）を比較し、なぜ規律が複利で効くのかを見せます。</>,
      <><strong className="text-kmf-text-primary">どう役立つか：</strong>現実的な月次目標を設定し、12〜36か月で何が可能かを見て、個々のトレードが小さく感じても意欲を保ちましょう。リスクを上げたくなったら、このグラフを見てください — 小さく一貫した利益は、たまの大勝ちに毎回勝ります。</>,
      <><strong className="text-kmf-text-primary">現実チェック：</strong>この計算機は負けの月がない一定のリターンを前提とします。実際のトレードにはドローダウンがあります。<Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin 計算機</Link>をこのツールと併用し、目標が持続可能か確認しましょう。</>,
    ],
    presetsPrompt: 'シナリオでクイックスタート：',
    presets: [
      { label: '保守的', desc: '$10k, 月3%, 12か月' },
      { label: '現実的', desc: '$10k, 月5%, 24か月' },
      { label: '野心的', desc: '$10k, 月8%, 24か月' },
      { label: 'DCA + トレード', desc: '$5k, 月5% + 月$500入金' },
      { label: 'トレードで生活', desc: '$50k, 月5%, 月-$1k出金' },
      { label: 'Prop Firm', desc: '$100k, 月3%, 12か月' },
    ],
    yourNumbers: 'あなたの数字',
    startBalance: '開始残高', startBalanceHint: 'トレード口座の現在残高',
    monthlyReturn: '月次リターン',
    timeframe: '期間', monthsSuffix: 'か月',
    addDeposit: '月次入金を追加（任意）', hideDeposit: '月次入金を隠す',
    monthlyDeposit: '月次入金', monthlyDepositHint: '毎月追加する追加資金',
    addWithdrawal: '月次出金を追加（任意）', hideWithdrawal: '月次出金を隠す',
    monthlyWithdrawal: '月次出金', monthlyWithdrawalHint: '毎月引き出す金額',
    reality: [
      '非常に保守的。適切なリスク管理と堅実な戦略で達成可能。',
      '経験豊富なトレーダーには現実的。一貫性と規律が必要。',
      '野心的。トップ層のトレーダーだけが維持できる。まず実際のリターンを記録しましょう。',
      '非常に積極的。これを目指すトレーダーの多くは、代わりに口座を破綻させます。',
      '持続的なトレードには非現実的。これはギャンブルの領域 — ドローダウンを覚悟しましょう。',
    ],
    bustedTitle: (m) => `${m}か月目で口座が枯渇`,
    bustedBody: (w) => `月次出金（${w}）が口座の成長を上回っています。出金を減らすか、リターン目標を上げてください。`,
    projectedAfter: (m) => `${m}か月後の予測残高`,
    startingFrom: (b) => `${b}から開始`,
    statTotalProfit: '総利益', statTotalProfitHint: '純粋な複利収益',
    statGrowth: '成長', statGrowthHint: 'お金が何倍に',
    statAdvantage: '複利の優位', statAdvantageHint: '線形成長に対する上乗せ',
    statMonthProfit: (m) => `${m}か月目の利益`, statMonthProfitHint: '最終月の利益のみ',
    statWithdrawn: '総出金額', statWithdrawnHint: '引き出した収入',
    milestoneAt: (mult, month, bal) => `${month}か月目で${mult}倍（${bal}）`,
    share: '結果を共有', sharing: '生成中...',
    growthProjection: '成長予測',
    legendPrincipal: '元本', legendProfit: '複利利益', legendLinear: '線形',
    chartSub: '網掛けの領域は、投入した分と複利が生み出した分に分けた残高を示します。破線 = 毎月同じ固定額を稼いだ場合。',
    chartMonthAxis: '月',
    tipMonth: (l) => `${l}か月目`,
    tipBalance: '残高：', tipCompoundProfit: (v) => `複利利益：${v}`, tipLinearWould: (v) => `線形なら：${v}`,
    tipThisMonth: (v) => `今月の利益：${v}`, tipDeposit: (v) => `+ ${v} 入金`, tipWithdrawal: (v) => `- ${v} 出金`,
    cards: [
      { title: '一貫性の力', body: '安定した月5%は、+20%と-15%の交互を上回ります。変動の激しいトレーダーは12か月後に少なくなります — 損失は同等の利益が助ける以上に痛むからです。複利は退屈で一貫した執行を報います。' },
      { title: 'なぜ小さなエッジが複利で効くか', body: '月3%と5%の差は小さく見えます。24か月で：3%は$10kを$20,328に、5%は$32,251にします。59%多い — 月たった2%の差から。エッジの小さな改善が長期で巨大な影響を持ちます。' },
      { title: '本当の敵：ドローダウン', body: '50%の損失は回復に100%の利益を要します。ドローダウンは利益を消すだけでなく、複利のエンジンを壊します。資金保全が最優先。失わなかった1ドルは永遠に複利で増え続けます。' },
    ],
    ddTitle: 'ドローダウン回復表',
    ddSub: '損失後、損益均衡に戻すだけにいくら稼ぐ必要があるか。',
    ddLoss: '口座の損失', ddGain: '回復に必要な利益',
    ddMonths: (pct) => `月${pct}%で回復にかかる月数`, monthsLabel: (m) => `${m}か月`,
    breakdownTitle: '月次内訳', breakdownSub: '月ごとの詳細予測。',
    bMonth: '月', bStart: '開始残高', bProfit: '利益', bDeposit: '入金', bWithdrawal: '出金', bEnd: '終了残高',
    eduTitle: 'トレードにおける複利成長を理解する',
    eduP1: 'アルベルト・アインシュタインは複利を「世界の8番目の不思議」と呼んだと言われます。トレードでは複利はさらに強力です — 固定金利の貯蓄口座と違い、熟練したトレーダーは大幅に高い月次リターンを目指せるからです。',
    eduMathTitle: 'すべてを変える数学',
    eduMathP: '$10,000の口座で月5%を出すトレーダーは、初月に$500稼ぎます。しかし12か月目には同じ5%が$814を生みます — 口座が$16,289に成長したからです。24か月目には、$32,251の残高に対し月次利益は$1,326。割合は同じ。ドルは指数関数的に増えます。',
    eduNeverTitle: 'なぜほとんどのトレーダーはこれを経験しないか',
    eduNeverP: '上の複利成長カーブは、大きなドローダウンのない一定の月次リターンを前提とします。実際には、ほとんどのトレーダーは次の方法で複利を台無しにします：',
    eduNeverList: [
      <><strong className="text-kmf-text-primary">過剰レバレッジ</strong> — より速い成長を追い、悪い1週間で20〜30%を失う</>,
      <><strong className="text-kmf-text-primary">早すぎる出金</strong> — 複利させる代わりに利益を引き出す</>,
      <><strong className="text-kmf-text-primary">戦略の乗り換え</strong> — 複利が効く時間を持つ前に戦略を切り替える</>,
      <><strong className="text-kmf-text-primary">リベンジトレード</strong> — 損失の後、「早く取り戻す」ためにリスクを上げる</>,
    ],
    eduRealTitle: '現実的なアプローチ',
    eduRealP: <>この計算機を<em>やる気を引き出す北極星</em>として使い、保証としては使わないでください。保守的な目標（3〜5%）を設定し、<Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">適切なリスク管理</Link>に集中し、実際の結果を<Link to="/" className="text-kmf-accent hover:underline">トレードジャーナル</Link>で記録しましょう。実際の月次リターンが一貫してプラスなら、複利はあなたのために働きます — 予測より低い率でも。</>,
    eduPairTitle: 'これをリスク管理と組み合わせる',
    eduPairP: <>複利は資金を守ってこそ機能します。<Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin 計算機</Link>で、複利効果が効き始める前に戦略が破綻しないことを確認しましょう。<Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">Win Rate vs R:R マトリックス</Link>でエッジがプラスか確認しましょう。</>,
    faqHeading: 'よくある質問',
    bottomSuite: 'K.M.F. 無料トレードツール群の一部',
    bottomRuin: 'Risk of Ruin 計算機', bottomMatrix: 'Win Rate vs R:R マトリックス', bottomLot: 'ロットサイズ計算機',
    faq: [
      { q: 'トレードにおける複利成長とは？', a: '複利成長とは、トレード利益を再投資して追加のリターンを生ませることです。毎月利益を引き出す代わりに、より大きな口座でトレードします。時間とともに指数関数的な成長を生み — 利益が自らの利益を稼ぎます。$10,000に対し月5%のリターンは初月$500ですが、口座が成長するため12か月目には$814になります。' },
      { q: 'トレードで月5%は現実的？', a: '月5%を一貫して達成するのは世界のトップ層のトレーダーに入ることです。ほとんどのヘッジファンドは年平均10〜20%。一貫した月3〜5%のリターンには、優れたリスク管理、実証済みの戦略、強い感情の規律が必要です。予測の前に、まず実際の月次リターンをジャーナルで記録しましょう。' },
      { q: 'なぜこの計算機は線形と複利成長を示す？', a: '線形の線は、毎月同じドル額を稼ぐ場合（再投資なし）を示します。複利のカーブは利益を再投資した場合を示します。両者の差 —「複利の優位」— は時間とともに指数関数的に拡大します。この可視化は、なぜ一貫性がたまの大勝ちより重要かを理解する助けになります。' },
      { q: '負けの月があったらどうなる？', a: '1回の負けの月でも複利成長を大きく後退させえます — その月の潜在利益だけでなく、その利益が生んだはずの複利リターンすべてを失うからです。20%の損失は、損益均衡に戻すだけで25%の利益を要します。だからこそリスク管理と資金保全はリターンの最大化より重要です。' },
      { q: 'リターン目標が持続可能か、どう分かる？', a: 'この計算機を Risk of Ruin 計算機と併用し、期待する月次リターンが過剰なリスクなしに達成可能か確認しましょう。月8%が必要でも戦略のrisk of ruinが10%超なら、複利予測は無意味です — 目標到達前に口座を破綻させる可能性が高いです。' },
    ],
  },
  zh: {
    pageTitle: 'KMF Compound Vision — 交易复利增长计算器 | K.M.F.',
    pageDesc: '可视化有纪律的月度回报如何随时间复利增长你的交易账户。免费计算器，配交互式图表、里程碑标记和回撤恢复提醒。',
    ogAlt: 'KMF Compound Vision — 交易复利增长计算器',
    badge: '免费交易工具',
    heroP: '看看有纪律、稳定的交易随时间能建立什么。输入你的余额和一个现实的月度目标 — 让复利来挑重担。',
    explainerToggle: '这个工具是什么，对我有什么帮助？',
    explainer: [
      <><strong className="text-kmf-text-primary">问题：</strong>大多数交易者要么设定不切实际的盈利目标（导致过度杠杆和爆仓），要么不理解一致性的威力（导致急躁和频繁换策略）。</>,
      <><strong className="text-kmf-text-primary">这个工具的作用：</strong>它准确显示如果你维持稳定的月度回报，交易账户随时间如何增长。图表对比复利增长（再投资利润）与线性增长（每月相同固定金额），让你看清为何纪律会复利。</>,
      <><strong className="text-kmf-text-primary">它如何帮助：</strong>设定现实的月度目标，看看 12-36 个月内有何可能，并在单笔交易显得渺小时保持动力。如果你想提高风险，看看这张图 — 小而稳定的盈利每次都胜过偶尔的大赢。</>,
      <><strong className="text-kmf-text-primary">现实核对：</strong>本计算器假设稳定回报、没有亏损月份。真实交易有回撤。请将 <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin 计算器</Link>与本工具配合使用，确保你的目标可持续。</>,
    ],
    presetsPrompt: '用情景快速开始：',
    presets: [
      { label: '保守', desc: '$10k, 月3%, 12 个月' },
      { label: '现实', desc: '$10k, 月5%, 24 个月' },
      { label: '雄心', desc: '$10k, 月8%, 24 个月' },
      { label: 'DCA + 交易', desc: '$5k, 月5% + 每月 $500 存入' },
      { label: '靠交易生活', desc: '$50k, 月5%, 每月 -$1k 取出' },
      { label: 'Prop Firm', desc: '$100k, 月3%, 12 个月' },
    ],
    yourNumbers: '你的数字',
    startBalance: '起始余额', startBalanceHint: '你交易账户的当前余额',
    monthlyReturn: '月度回报',
    timeframe: '期限', monthsSuffix: ' 个月',
    addDeposit: '添加每月存入（可选）', hideDeposit: '隐藏每月存入',
    monthlyDeposit: '每月存入', monthlyDepositHint: '每月增加的额外资金',
    addWithdrawal: '添加每月取出（可选）', hideWithdrawal: '隐藏每月取出',
    monthlyWithdrawal: '每月取出', monthlyWithdrawalHint: '你每月取出的金额',
    reality: [
      '非常保守。配适当的风险管理和稳健的策略可实现。',
      '对有经验的交易者现实。需要一致性和纪律。',
      '雄心勃勃。只有顶级交易者能维持。先记录你的真实回报。',
      '非常激进。大多数瞄准它的交易者反而爆掉账户。',
      '对持续交易不现实。这是赌博的领域 — 预期回撤。',
    ],
    bustedTitle: (m) => `账户在第 ${m} 个月耗尽`,
    bustedBody: (w) => `你的每月取出（${w}）超过了账户的增长。请减少取出或提高你的回报目标。`,
    projectedAfter: (m) => `${m} 个月后的预计余额`,
    startingFrom: (b) => `从 ${b} 起`,
    statTotalProfit: '总利润', statTotalProfitHint: '纯复利收益',
    statGrowth: '增长', statGrowthHint: '你的钱翻了',
    statAdvantage: '复利优势', statAdvantageHint: '相比线性增长的额外部分',
    statMonthProfit: (m) => `第 ${m} 个月利润`, statMonthProfitHint: '仅最后一个月的利润',
    statWithdrawn: '总取出', statWithdrawnHint: '取出的收入',
    milestoneAt: (mult, month, bal) => `第 ${month} 个月达到 ${mult}x（${bal}）`,
    share: '分享结果', sharing: '生成中...',
    growthProjection: '增长预测',
    legendPrincipal: '本金', legendProfit: '复利利润', legendLinear: '线性',
    chartSub: '阴影区域显示你的余额，分为你投入的部分和复利产生的部分。虚线 = 如果你每月赚相同的固定金额。',
    chartMonthAxis: '月',
    tipMonth: (l) => `第 ${l} 个月`,
    tipBalance: '余额：', tipCompoundProfit: (v) => `复利利润：${v}`, tipLinearWould: (v) => `线性则为：${v}`,
    tipThisMonth: (v) => `本月利润：${v}`, tipDeposit: (v) => `+ ${v} 存入`, tipWithdrawal: (v) => `- ${v} 取出`,
    cards: [
      { title: '一致性的威力', body: '稳定的每月 5% 胜过 +20% 与 -15% 的交替。波动大的交易者 12 个月后反而更少 — 因为亏损的伤害大于等量盈利的帮助。复利奖励无聊、一致的执行。' },
      { title: '为什么小优势会复利', body: '每月 3% 与 5% 的差距看似很小。24 个月后：3% 把 $10k 变成 $20,328，而 5% 变成 $32,251。多出 59% — 仅来自每月多 2%。你优势的小改进有巨大的长期影响。' },
      { title: '真正的敌人：回撤', body: '50% 的亏损需要 100% 的盈利来恢复。回撤不仅抹掉利润 — 它摧毁复利的引擎。资金保全是第一要务。你没亏掉的每一美元都会永远继续复利。' },
    ],
    ddTitle: '回撤恢复表',
    ddSub: '亏损后，仅为回到盈亏平衡你需要赚多少。',
    ddLoss: '账户亏损', ddGain: '恢复所需盈利',
    ddMonths: (pct) => `按月 ${pct}% 恢复所需月数`, monthsLabel: (m) => `${m} 个月`,
    breakdownTitle: '逐月明细', breakdownSub: '逐月详细预测。',
    bMonth: '月', bStart: '起始余额', bProfit: '利润', bDeposit: '存入', bWithdrawal: '取出', bEnd: '结束余额',
    eduTitle: '理解交易中的复利增长',
    eduP1: '据说阿尔伯特·爱因斯坦把复利称为「世界第八大奇迹」。在交易中，复利更为强大 — 因为不同于固定利率的储蓄账户，技术娴熟的交易者能瞄准显著更高的月度回报。',
    eduMathTitle: '改变一切的数学',
    eduMathP: '一个在 $10,000 账户上每月做 5% 的交易者，第一个月赚 $500。但到第 12 个月，同样的 5% 产生 $814 — 因为账户已增长到 $16,289。到第 24 个月，月利润在 $32,251 的余额上为 $1,326。百分比不变，美元指数级增长。',
    eduNeverTitle: '为什么大多数交易者从未体验到这点',
    eduNeverP: '上面的复利增长曲线假设稳定的月度回报、没有重大回撤。现实中，大多数交易者通过以下方式破坏自己的复利：',
    eduNeverList: [
      <><strong className="text-kmf-text-primary">过度杠杆</strong> — 追求更快增长，然后在糟糕的一周亏掉 20-30%</>,
      <><strong className="text-kmf-text-primary">过早取出</strong> — 抽走利润而非让其复利</>,
      <><strong className="text-kmf-text-primary">频繁换策略</strong> — 在复利有时间生效前就更换策略</>,
      <><strong className="text-kmf-text-primary">报复性交易</strong> — 亏损后提高风险以「快速赚回」</>,
    ],
    eduRealTitle: '现实的方法',
    eduRealP: <>把这个计算器当作<em>激励性的北极星</em>，而非保证。设定保守目标（3-5%），专注于<Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">正确的风险管理</Link>，并在<Link to="/" className="text-kmf-accent hover:underline">交易日志</Link>中记录你的真实结果。如果你的真实月度回报持续为正，复利会为你工作 — 即使在低于预测的回报率下。</>,
    eduPairTitle: '把它与风险管理结合',
    eduPairP: <>复利只有在你保护资金时才有效。使用 <Link to="/tools/risk-of-ruin" className="text-kmf-accent hover:underline">Risk of Ruin 计算器</Link> 确保你的策略不会在复利效应启动前爆仓。查看 <Link to="/tools/win-rate-rr-matrix" className="text-kmf-accent hover:underline">Win Rate vs R:R 矩阵</Link> 以确认你的优势为正。</>,
    faqHeading: '常见问题',
    bottomSuite: 'K.M.F. 免费交易工具套件的一部分',
    bottomRuin: 'Risk of Ruin 计算器', bottomMatrix: 'Win Rate vs R:R 矩阵', bottomLot: '手数计算器',
    faq: [
      { q: '交易中的复利增长是什么？', a: '复利增长意味着把你的交易利润再投资，让它们产生额外回报。你不是每月取出利润，而是用更大的账户交易。随着时间推移，这创造指数级增长 — 你的利润赚取它们自己的利润。$10,000 上每月 5% 的回报，第 1 个月是 $500，但到第 12 个月是 $814，因为账户已增长。' },
      { q: '交易中每月 5% 现实吗？', a: '持续达到每月 5% 会让你跻身全球顶级交易者之列。大多数对冲基金年均 10-20%。持续的月 3-5% 回报需要出色的风险管理、经过验证的策略和强大的情绪纪律。在向前预测之前，先在交易日志中记录你的真实月度回报。' },
      { q: '为什么这个计算器显示线性与复利增长？', a: '线性的线显示如果你每月赚相同美元金额（不再投资）会发生什么。复利曲线显示利润再投资时会发生什么。两者之间的差距 —「复利优势」— 随时间指数级扩大。这种可视化帮助你理解为何一致性比偶尔的大赢更重要。' },
      { q: '如果我有一个亏损月份会怎样？', a: '单个亏损月份可能显著拖累复利增长，因为你不仅失去那个月的潜在利润，还失去这些利润本会产生的所有复利回报。20% 的亏损仅为回到盈亏平衡就需要 25% 的盈利。这就是为什么风险管理和资金保全比最大化回报更重要。' },
      { q: '我怎么知道我的回报目标可持续？', a: '把这个计算器与 Risk of Ruin 计算器配合使用，检查你预期的月度回报是否能在不过度冒险的情况下实现。如果你需要每月 8% 但你策略的 risk of ruin 高于 10%，复利预测就毫无意义 — 你很可能在达到目标前就爆掉账户。' },
    ],
  },
};

/* ─── Compound Engine ─── */
function calculateCompound(startBalance, monthlyPct, months, monthlyDeposit = 0, monthlyWithdrawal = 0) {
  const data = [];
  let balance = startBalance;
  let totalDeposits = startBalance;
  let totalWithdrawn = 0;
  let linearBalance = startBalance;
  const milestones = [];
  const milestoneTargets = [2, 3, 5, 10];
  const milestonesHit = new Set();
  let bustedMonth = null;

  for (let m = 0; m <= months; m++) {
    const profit = m === 0 ? 0 : balance * (monthlyPct / 100);
    const deposit = m === 0 ? 0 : monthlyDeposit;
    const withdrawal = m === 0 ? 0 : monthlyWithdrawal;

    if (m > 0) {
      balance += profit + deposit - withdrawal;
      totalDeposits += deposit;
      totalWithdrawn += withdrawal;
      linearBalance += (startBalance * monthlyPct / 100) + deposit - withdrawal;

      if (balance <= 0) {
        balance = 0;
        linearBalance = Math.max(0, linearBalance);
        bustedMonth = bustedMonth || m;
      }
    }

    const principal = Math.min(totalDeposits - totalWithdrawn, balance);
    const compoundProfit = Math.max(0, balance - Math.max(0, totalDeposits - totalWithdrawn));

    data.push({
      month: m,
      balance: Math.round(balance * 100) / 100,
      principal: Math.round(Math.max(0, principal) * 100) / 100,
      profit: Math.round(compoundProfit * 100) / 100,
      linear: Math.round(Math.max(0, linearBalance) * 100) / 100,
      monthlyProfit: Math.round(profit * 100) / 100,
      deposit,
      withdrawal,
    });

    if (balance > 0) {
      const multiple = balance / startBalance;
      for (const target of milestoneTargets) {
        if (multiple >= target && !milestonesHit.has(target)) {
          milestonesHit.add(target);
          milestones.push({ month: m, multiple: target, balance: Math.round(balance) });
        }
      }
    }

    if (bustedMonth) break;
  }

  const finalBalance = data[data.length - 1].balance;
  const totalProfit = finalBalance - (totalDeposits - totalWithdrawn);
  const growthMultiple = finalBalance / startBalance;
  const linearFinal = data[data.length - 1].linear;
  const compoundAdvantage = finalBalance - linearFinal;

  return { data, milestones, finalBalance, totalProfit, totalDeposits, totalWithdrawn, growthMultiple, compoundAdvantage, linearFinal, bustedMonth };
}

/* ─── Drawdown Recovery Table ─── */
const DRAWDOWN_RECOVERY = [
  { loss: 10, recovery: 11.1 },
  { loss: 20, recovery: 25.0 },
  { loss: 30, recovery: 42.9 },
  { loss: 40, recovery: 66.7 },
  { loss: 50, recovery: 100.0 },
  { loss: 60, recovery: 150.0 },
  { loss: 70, recovery: 233.3 },
  { loss: 80, recovery: 400.0 },
  { loss: 90, recovery: 900.0 },
];

/* ─── Presets (numeric data) ─── */
const PRESET_DATA = [
  { balance: 10000, pct: 3, months: 12, deposit: 0, withdrawal: 0 },
  { balance: 10000, pct: 5, months: 24, deposit: 0, withdrawal: 0 },
  { balance: 10000, pct: 8, months: 24, deposit: 0, withdrawal: 0 },
  { balance: 5000, pct: 5, months: 24, deposit: 500, withdrawal: 0 },
  { balance: 50000, pct: 5, months: 24, deposit: 0, withdrawal: 1000 },
  { balance: 100000, pct: 3, months: 12, deposit: 0, withdrawal: 0 },
];

/* ─── Reality Check ─── */
function getRealityCheck(monthlyPct, t) {
  if (monthlyPct <= 2) return { text: t.reality[0], color: '#00E676' };
  if (monthlyPct <= 4) return { text: t.reality[1], color: '#66BB6A' };
  if (monthlyPct <= 6) return { text: t.reality[2], color: '#FFB300' };
  if (monthlyPct <= 10) return { text: t.reality[3], color: '#FF9800' };
  return { text: t.reality[4], color: '#FF5252' };
}

/* ─── Format Currency ─── */
function fmt(n, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label, t }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="rounded-lg px-3 py-2.5 text-xs" style={{ background: 'rgba(15,17,21,0.95)', border: '1px solid rgba(79,195,247,0.2)' }}>
      <p className="text-kmf-text-tertiary mb-1.5 font-semibold">{t.tipMonth(label)}</p>
      <p className="text-kmf-accent">{t.tipBalance} <span className="font-bold">{fmt(d.balance)}</span></p>
      <p style={{ color: '#00E676' }}>{t.tipCompoundProfit(fmt(d.profit))}</p>
      <p className="text-kmf-text-tertiary">{t.tipLinearWould(fmt(d.linear))}</p>
      {d.monthlyProfit > 0 && <p className="text-kmf-text-secondary mt-1">{t.tipThisMonth(fmt(d.monthlyProfit))}</p>}
      {d.deposit > 0 && <p className="text-kmf-text-secondary">{t.tipDeposit(fmt(d.deposit))}</p>}
      {d.withdrawal > 0 && <p style={{ color: '#FF5252' }}>{t.tipWithdrawal(fmt(d.withdrawal))}</p>}
    </div>
  );
}

/* ─── Input Component ─── */
function InputField({ label, value, onChange, prefix, suffix, min, max, step = 1, hint }) {
  return (
    <div>
      <label className="text-sm font-medium text-kmf-text-secondary block mb-1.5">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-kmf-text-tertiary">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full rounded-lg py-2.5 text-sm text-kmf-text-primary outline-none transition-all focus:ring-1 focus:ring-kmf-accent/40"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            paddingLeft: prefix ? '1.75rem' : '0.75rem',
            paddingRight: suffix ? '2.5rem' : '0.75rem',
          }}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-kmf-text-tertiary">{suffix}</span>}
      </div>
      {hint && <p className="text-[11px] text-kmf-text-tertiary mt-1">{hint}</p>}
    </div>
  );
}

/* ─── Slider Component ─── */
function SliderField({ label, value, onChange, min, max, step, suffix, hint, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-kmf-text-secondary">{label}</label>
        <span className="text-sm font-bold" style={{ color: color || '#4FC3F7' }}>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color || '#4FC3F7'} 0%, ${color || '#4FC3F7'} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
      {hint && <p className="text-[11px] text-kmf-text-tertiary mt-1">{hint}</p>}
    </div>
  );
}

/* ─── Explainer Box ─── */
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
export default function CompoundCalculatorPage() {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const [balance, setBalance] = useState('10000');
  const [monthlyPct, setMonthlyPct] = useState('5');
  const [months, setMonths] = useState('24');
  const [deposit, setDeposit] = useState('0');
  const [withdrawal, setWithdrawal] = useState('0');
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [sharing, setSharing] = useState(false);
  const resultsRef = useRef(null);

  // Parse inputs
  const params = useMemo(() => ({
    balance: Math.max(100, parseFloat(balance) || 10000),
    monthlyPct: Math.min(30, Math.max(0.5, parseFloat(monthlyPct) || 5)),
    months: Math.min(60, Math.max(3, parseInt(months) || 24)),
    deposit: Math.max(0, parseFloat(deposit) || 0),
    withdrawal: Math.max(0, parseFloat(withdrawal) || 0),
  }), [balance, monthlyPct, months, deposit, withdrawal]);

  // Calculate
  const result = useMemo(() => {
    return calculateCompound(params.balance, params.monthlyPct, params.months, params.deposit, params.withdrawal);
  }, [params]);

  const realityCheck = useMemo(() => getRealityCheck(params.monthlyPct, t), [params.monthlyPct, t]);

  // Load preset
  const loadPreset = useCallback((preset) => {
    setBalance(String(preset.balance));
    setMonthlyPct(String(preset.pct));
    setMonths(String(preset.months));
    setDeposit(String(preset.deposit));
    setWithdrawal(String(preset.withdrawal));
    setShowDeposit(preset.deposit > 0);
    setShowWithdrawal(preset.withdrawal > 0);
  }, []);

  // GA4 event
  useEffect(() => {
    window.gtag?.('event', 'compound_calculator_viewed', {
      starting_balance: params.balance,
      monthly_pct: params.monthlyPct,
      months: params.months,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          name: 'KMF Compound Vision — Trading Compound Growth Calculator',
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
            { '@type': 'ListItem', position: 3, name: 'Compound Calculator', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('compound-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'compound-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); link?.remove(); };
  }, [t]);

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
              <span className="bg-gradient-to-r from-kmf-accent to-cyan-300 bg-clip-text text-transparent">Compound Vision</span>
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
              {PRESET_DATA.map((s, i) => (
                <button
                  key={i}
                  onClick={() => loadPreset(s)}
                  className="group px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8FB3C5' }}
                  title={t.presets[i].desc}
                >
                  <span className="block font-semibold">{t.presets[i].label}</span>
                  <span className="block text-[10px] text-kmf-text-tertiary mt-0.5 group-hover:text-kmf-text-secondary transition-colors">{t.presets[i].desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main grid: inputs + results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* Inputs */}
            <div className="rounded-2xl p-5 space-y-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider">{t.yourNumbers}</h2>

              <InputField label={t.startBalance} value={balance} onChange={setBalance} prefix="$" min={100} max={10000000} step={100} hint={t.startBalanceHint} />

              <SliderField label={t.monthlyReturn} value={monthlyPct} onChange={setMonthlyPct} min={0.5} max={15} step={0.5} suffix="%" color={realityCheck.color} />
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg" style={{ background: `${realityCheck.color}10`, border: `1px solid ${realityCheck.color}25` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={realityCheck.color} className="shrink-0 mt-0.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p className="text-[11px] leading-relaxed" style={{ color: realityCheck.color }}>{realityCheck.text}</p>
              </div>

              <SliderField label={t.timeframe} value={months} onChange={setMonths} min={3} max={60} step={1} suffix={t.monthsSuffix} color="#4FC3F7" />

              {/* Monthly deposit toggle */}
              <div>
                <button
                  onClick={() => setShowDeposit(!showDeposit)}
                  className="text-xs text-kmf-accent hover:underline flex items-center gap-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: showDeposit ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                  </svg>
                  {showDeposit ? t.hideDeposit : t.addDeposit}
                </button>
                {showDeposit && (
                  <div className="mt-3">
                    <InputField label={t.monthlyDeposit} value={deposit} onChange={setDeposit} prefix="$" min={0} max={100000} step={50} hint={t.monthlyDepositHint} />
                  </div>
                )}
              </div>

              {/* Monthly withdrawal toggle */}
              <div>
                <button
                  onClick={() => setShowWithdrawal(!showWithdrawal)}
                  className="text-xs hover:underline flex items-center gap-1"
                  style={{ color: '#FF9800' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: showWithdrawal ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                  </svg>
                  {showWithdrawal ? t.hideWithdrawal : t.addWithdrawal}
                </button>
                {showWithdrawal && (
                  <div className="mt-3">
                    <InputField label={t.monthlyWithdrawal} value={withdrawal} onChange={setWithdrawal} prefix="$" min={0} max={1000000} step={100} hint={t.monthlyWithdrawalHint} />
                  </div>
                )}
              </div>
            </div>

            {/* Result Cards */}
            <div className="lg:col-span-2 space-y-4" ref={resultsRef}>
              {/* Busted warning */}
              {result.bustedMonth && (
                <div className="flex items-start gap-3 rounded-2xl p-4" style={{ background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.25)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF5252" className="shrink-0 mt-0.5"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#FF5252' }}>{t.bustedTitle(result.bustedMonth)}</p>
                    <p className="text-xs text-kmf-text-secondary mt-1">{t.bustedBody(fmt(params.withdrawal))}</p>
                  </div>
                </div>
              )}

              {/* Big result */}
              <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-sm text-kmf-text-tertiary mb-2">{t.projectedAfter(result.bustedMonth ? result.bustedMonth : params.months)}</p>
                <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ color: result.bustedMonth ? '#FF5252' : '#4FC3F7' }}>
                  {fmt(result.finalBalance)}
                </div>
                <p className="text-sm text-kmf-text-tertiary">
                  {t.startingFrom(fmt(params.balance))}
                </p>
              </div>

              {/* Stats grid */}
              <div className={`grid grid-cols-2 ${params.withdrawal > 0 ? 'sm:grid-cols-5' : 'sm:grid-cols-4'} gap-3`}>
                {[
                  { label: t.statTotalProfit, value: fmt(result.totalProfit), color: '#00E676', hint: t.statTotalProfitHint },
                  { label: t.statGrowth, value: `${result.growthMultiple.toFixed(1)}x`, color: '#4FC3F7', hint: t.statGrowthHint },
                  { label: t.statAdvantage, value: `+${fmt(result.compoundAdvantage)}`, color: '#FFB300', hint: t.statAdvantageHint },
                  { label: t.statMonthProfit(result.bustedMonth || params.months), value: fmt(result.data[result.data.length - 1]?.monthlyProfit || 0), color: '#00E676', hint: t.statMonthProfitHint },
                  ...(params.withdrawal > 0 ? [{ label: t.statWithdrawn, value: fmt(result.totalWithdrawn), color: '#FF9800', hint: t.statWithdrawnHint }] : []),
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[11px] text-kmf-text-tertiary mb-1">{s.label}</p>
                    <p className="text-base sm:text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px] text-kmf-text-tertiary mt-0.5">{s.hint}</p>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              {result.milestones.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.milestones.map((m) => (
                    <div
                      key={m.multiple}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(79,195,247,0.08)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {t.milestoneAt(m.multiple, m.month, fmt(m.balance))}
                    </div>
                  ))}
                </div>
              )}

              {/* Share button */}
              <div className="flex justify-end">
                <button
                  onClick={async () => {
                    if (!resultsRef.current || sharing) return;
                    setSharing(true);
                    try {
                      const dataUrl = await toPng(resultsRef.current, {
                        backgroundColor: '#0F1115',
                        pixelRatio: 2,
                        style: { padding: '20px' },
                      });
                      const link = document.createElement('a');
                      link.download = `kmf-compound-${fmt(params.balance).replace(/[^0-9]/g, '')}-${params.monthlyPct}pct-${params.months}mo.png`;
                      link.href = dataUrl;
                      link.click();
                      window.gtag?.('event', 'compound_results_shared', {
                        starting_balance: params.balance,
                        monthly_pct: params.monthlyPct,
                        months: params.months,
                      });
                    } catch {
                      const text = `KMF Compound Vision\n${fmt(params.balance)} → ${fmt(result.finalBalance)} in ${params.months} months at ${params.monthlyPct}%/mo\nTotal profit: ${fmt(result.totalProfit)} | Growth: ${result.growthMultiple.toFixed(1)}x\nhttps://kmfjournal.com/tools/compound-calculator`;
                      await navigator.clipboard?.writeText(text).catch(() => {});
                    } finally {
                      setSharing(false);
                    }
                  }}
                  disabled={sharing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105 disabled:opacity-50"
                  style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}
                >
                  {sharing ? (
                    <div className="w-3.5 h-3.5 border-2 border-kmf-accent/30 border-t-kmf-accent rounded-full animate-spin" />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                  )}
                  {sharing ? t.sharing : t.share}
                </button>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl p-5 mb-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider">{t.growthProjection}</h2>
              <div className="flex items-center gap-4 text-[11px] text-kmf-text-tertiary">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#4FC3F7' }} /> {t.legendPrincipal}</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#00E676' }} /> {t.legendProfit}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-px" style={{ background: 'rgba(255,255,255,0.3)', borderTop: '2px dashed rgba(255,255,255,0.3)' }} /> {t.legendLinear}</span>
              </div>
            </div>
            <p className="text-[11px] text-kmf-text-tertiary mb-4">
              {t.chartSub}
            </p>
            <div className="h-[320px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4FC3F7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#4FC3F7" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E676" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#00E676" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                    label={{ value: t.chartMonthAxis, position: 'insideBottomRight', offset: -5, fill: '#6B7280', fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                    tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
                  />
                  <Tooltip content={<ChartTooltip t={t} />} />

                  {result.milestones.map((m) => (
                    <ReferenceLine
                      key={m.multiple}
                      y={params.balance * m.multiple}
                      stroke="rgba(79,195,247,0.2)"
                      strokeDasharray="4 4"
                      label={{ value: `${m.multiple}x`, fill: 'rgba(79,195,247,0.4)', fontSize: 10, position: 'right' }}
                    />
                  ))}

                  <Area type="monotone" dataKey="principal" stackId="1" stroke="#4FC3F7" strokeWidth={0} fill="url(#gradPrincipal)" />
                  <Area type="monotone" dataKey="profit" stackId="1" stroke="#00E676" strokeWidth={2} fill="url(#gradProfit)" />
                  <Area type="monotone" dataKey="linear" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} strokeDasharray="6 4" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3 Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(0,230,118,0.04)', border: '1px solid rgba(0,230,118,0.12)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(0,230,118,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#00E676"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-kmf-text-primary mb-2">{t.cards[0].title}</h3>
              <p className="text-xs text-kmf-text-secondary leading-relaxed">{t.cards[0].body}</p>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(79,195,247,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#4FC3F7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-kmf-text-primary mb-2">{t.cards[1].title}</h3>
              <p className="text-xs text-kmf-text-secondary leading-relaxed">{t.cards[1].body}</p>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,82,82,0.04)', border: '1px solid rgba(255,82,82,0.12)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(255,82,82,0.15)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF5252"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              </div>
              <h3 className="text-sm font-semibold text-kmf-text-primary mb-2">{t.cards[2].title}</h3>
              <p className="text-xs text-kmf-text-secondary leading-relaxed">{t.cards[2].body}</p>
            </div>
          </div>

          {/* Drawdown Recovery Table */}
          <div className="rounded-2xl p-5 mb-10" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider mb-1">{t.ddTitle}</h2>
            <p className="text-[11px] text-kmf-text-tertiary mb-4">{t.ddSub}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-kmf-text-tertiary text-xs uppercase tracking-wider">
                    <th className="text-left py-2 px-3">{t.ddLoss}</th>
                    <th className="text-right py-2 px-3">{t.ddGain}</th>
                    <th className="text-right py-2 px-3 hidden sm:table-cell">{t.ddMonths(params.monthlyPct)}</th>
                  </tr>
                </thead>
                <tbody>
                  {DRAWDOWN_RECOVERY.map((row) => {
                    const monthsToRecover = params.monthlyPct > 0 ? Math.ceil(Math.log(1 + row.recovery / 100) / Math.log(1 + params.monthlyPct / 100)) : Infinity;
                    const dangerLevel = row.loss >= 50 ? '#FF5252' : row.loss >= 30 ? '#FF9800' : row.loss >= 20 ? '#FFB300' : '#8FB3C5';
                    return (
                      <tr key={row.loss} className="border-t border-white/5">
                        <td className="py-2.5 px-3 font-medium" style={{ color: dangerLevel }}>-{row.loss}%</td>
                        <td className="py-2.5 px-3 text-right font-bold" style={{ color: dangerLevel }}>+{row.recovery.toFixed(1)}%</td>
                        <td className="py-2.5 px-3 text-right text-kmf-text-secondary hidden sm:table-cell">
                          {monthsToRecover === Infinity ? '—' : t.monthsLabel(monthsToRecover)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Breakdown Table */}
          <div className="rounded-2xl p-5 mb-10" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-semibold text-kmf-text-primary uppercase tracking-wider mb-1">{t.breakdownTitle}</h2>
            <p className="text-[11px] text-kmf-text-tertiary mb-4">{t.breakdownSub}</p>
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0" style={{ background: '#0F1115' }}>
                  <tr className="text-kmf-text-tertiary text-xs uppercase tracking-wider">
                    <th className="text-left py-2 px-3">{t.bMonth}</th>
                    <th className="text-right py-2 px-3">{t.bStart}</th>
                    <th className="text-right py-2 px-3">{t.bProfit}</th>
                    {params.deposit > 0 && <th className="text-right py-2 px-3">{t.bDeposit}</th>}
                    {params.withdrawal > 0 && <th className="text-right py-2 px-3">{t.bWithdrawal}</th>}
                    <th className="text-right py-2 px-3">{t.bEnd}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.slice(1).map((row, i) => {
                    const prevBalance = result.data[i].balance;
                    return (
                      <tr key={row.month} className="border-t border-white/5" style={i % 2 === 0 ? { background: 'rgba(255,255,255,0.01)' } : {}}>
                        <td className="py-2 px-3 text-kmf-text-secondary">{row.month}</td>
                        <td className="py-2 px-3 text-right text-kmf-text-secondary">{fmt(prevBalance)}</td>
                        <td className="py-2 px-3 text-right font-medium" style={{ color: '#00E676' }}>+{fmt(row.monthlyProfit)}</td>
                        {params.deposit > 0 && <td className="py-2 px-3 text-right text-kmf-text-secondary">+{fmt(row.deposit)}</td>}
                        {params.withdrawal > 0 && <td className="py-2 px-3 text-right" style={{ color: '#FF9800' }}>-{fmt(row.withdrawal)}</td>}
                        <td className="py-2 px-3 text-right font-bold text-kmf-text-primary">{fmt(row.balance)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Content */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6">{t.eduTitle}</h2>

            <div className="space-y-6 text-kmf-text-secondary leading-relaxed">
              <p>{t.eduP1}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.eduMathTitle}</h3>
              <p>{t.eduMathP}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.eduNeverTitle}</h3>
              <p>{t.eduNeverP}</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {t.eduNeverList.map((li, i) => <li key={i}>{li}</li>)}
              </ul>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.eduRealTitle}</h3>
              <p>{t.eduRealP}</p>

              <h3 className="text-lg font-semibold text-kmf-text-primary pt-4">{t.eduPairTitle}</h3>
              <p>{t.eduPairP}</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-16">
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
          <div className="text-center">
            <p className="text-kmf-text-tertiary text-sm mb-4">{t.bottomSuite}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/tools/risk-of-ruin" className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105" style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
                {t.bottomRuin}
              </Link>
              <Link to="/tools/win-rate-rr-matrix" className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105" style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
                {t.bottomMatrix}
              </Link>
              <Link to="/tools/lot-size-calculator" className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.04)', color: '#8FB3C5', border: '1px solid rgba(255,255,255,0.08)' }}>
                {t.bottomLot}
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
