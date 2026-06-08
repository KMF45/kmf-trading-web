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
