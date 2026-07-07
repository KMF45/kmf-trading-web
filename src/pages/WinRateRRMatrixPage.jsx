import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';

const PAGE_URL = 'https://kmfjournal.com/tools/win-rate-rr-matrix';
const OG_IMAGE = 'https://kmfjournal.com/tools/og/win-rate-rr-matrix.png';

const T = {
  en: {
    pageTitle: 'Win Rate vs R:R Matrix — Find Your Profitable Zone | K.M.F.',
    pageDesc: 'Interactive heatmap showing every combination of win rate and reward:risk ratio. Instantly see which setups are profitable and where your trading strategy sits on the profitability spectrum.',
    ogAlt: 'Win Rate vs R:R Matrix — Find Your Profitable Zone',
    badge: 'Free Trading Tool',
    heroP: <>Every cell shows your <strong className="text-kmf-text-primary">expectancy per trade</strong>. Green = profitable long-term. Red = losing money no matter how disciplined you are.</>,
    howToTitle: 'How to read this:',
    howToBody: <>Find your win rate on the horizontal axis and your average R:R on the vertical axis. The cell where they meet shows your <strong className="text-kmf-text-primary">expectancy</strong> — how much you earn per $1 risked, on average. <strong className="text-kmf-accent">+0.5R</strong> means you gain $50 for every $100 risked over time. <strong style={{ color: '#FF5252' }}>−0.3R</strong> means you lose $30 per $100 risked — no strategy will save you.</>,
    formula: 'Formula: Expectancy = (Win Rate × Avg Win) − (Loss Rate × Avg Loss). Loss is always normalized to 1R.',
    yourStrategy: 'Your Strategy',
    winRate: 'Win Rate',
    avgRr: 'Average R:R',
    wrHints: ['Low win rate — needs high R:R to be profitable', 'Below 50% — still profitable with good R:R', 'Solid win rate — even moderate R:R works', 'High win rate — can afford lower R:R targets'],
    rrHints: ['Below 1:1 — win rate must be very high to compensate', 'Moderate — typical for scalpers, requires high win rate', 'Good R:R — gives you margin for lower win rate', 'Excellent R:R — even 30% win rate can be profitable'],
    yourExpectancy: 'Your Expectancy',
    perTrade: 'per trade',
    resStrong: (v) => <><strong>Strong edge.</strong> On every $1,000 risked, you earn ~${v} on average.</>,
    resSlight: (v) => <><strong>Slight edge.</strong> Profitable, but thin. Every $1,000 risked earns ~${v}. Improve R:R or win rate to widen the margin.</>,
    resBreak: <><strong>Break-even.</strong> No edge. Commissions alone will make you unprofitable. Push R:R higher.</>,
    resLosing: (v) => <><strong>Losing strategy.</strong> Every $1,000 risked loses ~${v}. No position sizing fix will save a negative expectancy.</>,
    heatmap: 'Expectancy Heatmap',
    legendLosing: 'Losing', legendBreak: 'Break-even', legendProfit: 'Profitable',
    axisLabel: 'R:R ↓ / WR →',
    tipWinRate: 'Win Rate:', tipRr: 'R:R:', tipExpectancy: 'Expectancy:', tipPer: 'Per $1,000 risked:',
    edgeLabels: { strong: 'Strong edge', slight: 'Slight edge', breakeven: 'Break-even', weak: 'Weak negative', strongLose: 'Strong losing' },
    cards: [
      { title: 'The Win Rate Trap', body: 'A 70% win rate sounds impressive — but if your average loss is 3× bigger than your average win, you lose money. R:R is more important than win rate.' },
      { title: 'The Break-Even Diagonal', body: 'The yellow cells form a diagonal line. This is the break-even frontier. Every combination on it earns nothing. You need to be above it to survive long-term.' },
      { title: 'The Professional Zone', body: 'Most full-time traders operate between 40–55% win rate with 1.5:1–3:1 R:R. Boring? Yes. Sustainably profitable? Also yes.' },
    ],
    eduTitle: 'Why Most Traders Think About This Wrong',
    eduP: [
      <>Beginners fixate on win rate. They want to be "right" most of the time. But trading isn't a test — it's a business. The only metric that matters is: <strong className="text-kmf-text-primary">does your strategy make money over a large sample of trades?</strong></>,
      <>That's what expectancy measures. It strips away all the noise — the hot streaks, the bad days, the lucky trades — and tells you what your strategy actually earns per unit of risk. A positive expectancy means the edge is real. A negative expectancy means no amount of discipline, psychology work, or risk management will save you.</>,
      <><strong className="text-kmf-text-primary">The matrix above shows every possible combination.</strong> Notice how the green zone covers a wide diagonal band — there are many paths to profitability. A scalper with 70% win rate and 0.75:1 R:R is in the same green band as a swing trader with 35% win rate and 3:1 R:R. Different styles, same math.</>,
      <>The red zone is unforgiving. Once you're there, no trick saves you. If you recognize your numbers in the red, the fix is one of two things: improve your entries (win rate) or improve your exits (R:R). Usually improving R:R is easier — it doesn't require you to be more "right," just more patient with winners and faster with losers.</>,
    ],
    eduNote: <>Don't know your win rate or R:R? That's exactly why a <Link to="/" className="text-kmf-accent hover:underline">trading journal</Link> exists. After 30–50 logged trades, you'll have statistically meaningful numbers — and you'll be able to find your exact cell in this matrix.</>,
    linkRuinTitle: 'Risk of Ruin Calculator →',
    linkRuinDesc: 'See if your account can survive long losing streaks',
    linkLotTitle: 'Lot Size Calculator →',
    linkLotDesc: 'Size your positions to match your target R:R',
    ctaLine1: "Don't know your real win rate or R:R?",
    ctaLine2: 'Track your trades. Your stats will find their cell automatically.',
    ctaButton: 'Download Free on Google Play',
    faqHeading: 'Frequently Asked Questions',
    faq: [
      { q: 'What does the matrix show?', a: 'Each cell shows the expectancy — how much you earn (or lose) on average per unit of risk. A value of +0.5R means for every $100 you risk, you gain $50 on average over many trades. Negative values mean you lose money long-term regardless of how selective you are.' },
      { q: 'Why can a 40% win rate be profitable?', a: 'Because it depends on how much you make when you win vs lose. With a 40% win rate and 3:1 R:R, your expectancy is +0.6R — strongly profitable. You lose 60% of trades but your winners are 3× bigger than losers. This is why R:R matters more than win rate alone.' },
      { q: 'Where do I find my win rate and R:R?', a: 'From your trading journal. Win rate = wins ÷ total trades × 100. R:R = average profit on winning trades ÷ average loss on losing trades. You need at least 30–50 trades for the numbers to be meaningful.' },
      { q: 'What R:R should I target?', a: 'Most professional traders target at least 1.5:1. This gives you a comfortable buffer — you can be wrong 40% of the time and still be profitable. Higher R:R (2:1, 3:1) means you can afford an even lower win rate, which is realistic for swing and position traders.' },
      { q: 'Is a green cell enough to be profitable?', a: "It's necessary but not sufficient. You also need consistent execution, proper position sizing, and enough trades for the statistics to play out. A strategy with +0.3R expectancy can still lose money short-term due to variance. But without positive expectancy, nothing else matters." },
    ],
  },
  ro: {
    pageTitle: 'Win Rate vs R:R Matrix — Găsește-ți Zona Profitabilă | K.M.F.',
    pageDesc: 'Heatmap interactiv care arată fiecare combinație de win rate și raport reward:risk. Vezi instant ce setup-uri sunt profitabile și unde se află strategia ta pe spectrul profitabilității.',
    ogAlt: 'Win Rate vs R:R Matrix — Găsește-ți Zona Profitabilă',
    badge: 'Unealtă gratuită',
    heroP: <>Fiecare celulă arată <strong className="text-kmf-text-primary">expectancy per trade</strong>. Verde = profitabil pe termen lung. Roșu = pierzi bani indiferent cât de disciplinat ești.</>,
    howToTitle: 'Cum citești asta:',
    howToBody: <>Găsește-ți win rate-ul pe axa orizontală și R:R-ul mediu pe axa verticală. Celula unde se întâlnesc arată <strong className="text-kmf-text-primary">expectancy-ul</strong> — cât câștigi în medie per $1 riscat. <strong className="text-kmf-accent">+0.5R</strong> înseamnă că primești $50 pentru fiecare $100 riscați, în timp. <strong style={{ color: '#FF5252' }}>−0.3R</strong> înseamnă că pierzi $30 per $100 riscați — nicio strategie nu te salvează.</>,
    formula: 'Formula: Expectancy = (Win Rate × Câștig Mediu) − (Loss Rate × Pierdere Medie). Pierderea e mereu normalizată la 1R.',
    yourStrategy: 'Strategia ta',
    winRate: 'Win Rate',
    avgRr: 'R:R Mediu',
    wrHints: ['Win rate mic — are nevoie de R:R mare ca să fie profitabil', 'Sub 50% — încă profitabil cu un R:R bun', 'Win rate solid — merge chiar și cu R:R moderat', 'Win rate mare — îți permite ținte R:R mai mici'],
    rrHints: ['Sub 1:1 — win rate-ul trebuie să fie foarte mare ca să compenseze', 'Moderat — tipic pentru scalperi, cere win rate mare', 'R:R bun — îți dă marjă pentru un win rate mai mic', 'R:R excelent — chiar și 30% win rate poate fi profitabil'],
    yourExpectancy: 'Expectancy-ul tău',
    perTrade: 'per trade',
    resStrong: (v) => <><strong>Edge puternic.</strong> La fiecare $1.000 riscați, câștigi în medie ~${v}.</>,
    resSlight: (v) => <><strong>Edge ușor.</strong> Profitabil, dar subțire. Fiecare $1.000 riscați aduc ~${v}. Îmbunătățește R:R-ul sau win rate-ul ca să lărgești marja.</>,
    resBreak: <><strong>La break-even.</strong> Fără edge. Doar comisioanele te fac neprofitabil. Crește R:R-ul.</>,
    resLosing: (v) => <><strong>Strategie pierzătoare.</strong> Fiecare $1.000 riscați pierd ~${v}. Niciun fix de position sizing nu salvează o expectancy negativă.</>,
    heatmap: 'Heatmap Expectancy',
    legendLosing: 'Pierzător', legendBreak: 'Break-even', legendProfit: 'Profitabil',
    axisLabel: 'R:R ↓ / WR →',
    tipWinRate: 'Win Rate:', tipRr: 'R:R:', tipExpectancy: 'Expectancy:', tipPer: 'Per $1.000 riscați:',
    edgeLabels: { strong: 'Edge puternic', slight: 'Edge ușor', breakeven: 'Break-even', weak: 'Negativ ușor', strongLose: 'Pierzător puternic' },
    cards: [
      { title: 'Capcana Win Rate-ului', body: 'Un win rate de 70% sună impresionant — dar dacă pierderea ta medie e de 3× mai mare decât câștigul mediu, pierzi bani. R:R-ul e mai important decât win rate-ul.' },
      { title: 'Diagonala de Break-Even', body: 'Celulele galbene formează o linie diagonală. Asta e frontiera de break-even. Orice combinație de pe ea nu câștigă nimic. Trebuie să fii deasupra ei ca să supraviețuiești pe termen lung.' },
      { title: 'Zona Profesionistă', body: 'Cei mai mulți traderi full-time operează între 40–55% win rate cu R:R 1.5:1–3:1. Plictisitor? Da. Profitabil sustenabil? Tot da.' },
    ],
    eduTitle: 'De Ce Cei Mai Mulți Traderi Gândesc Greșit Asta',
    eduP: [
      <>Începătorii se fixează pe win rate. Vor să aibă „dreptate" de cele mai multe ori. Dar trading-ul nu e un test — e o afacere. Singura metrică ce contează e: <strong className="text-kmf-text-primary">strategia ta face bani pe un eșantion mare de trade-uri?</strong></>,
      <>Asta măsoară expectancy. Curăță tot zgomotul — seriile bune, zilele proaste, trade-urile norocoase — și îți spune cât câștigă de fapt strategia ta per unitate de risc. O expectancy pozitivă înseamnă că edge-ul e real. O expectancy negativă înseamnă că nicio disciplină, muncă psihologică sau risk management nu te salvează.</>,
      <><strong className="text-kmf-text-primary">Matricea de mai sus arată fiecare combinație posibilă.</strong> Observă cum zona verde acoperă o bandă diagonală largă — există multe drumuri spre profitabilitate. Un scalper cu 70% win rate și R:R 0.75:1 e în aceeași bandă verde ca un swing trader cu 35% win rate și R:R 3:1. Stiluri diferite, aceeași matematică.</>,
      <>Zona roșie e neiertătoare. Odată ajuns acolo, niciun truc nu te salvează. Dacă îți recunoști cifrele în roșu, fix-ul e unul din două: îmbunătățește intrările (win rate) sau ieșirile (R:R). De obicei e mai ușor să îmbunătățești R:R-ul — nu îți cere să ai mai des „dreptate", doar să fii mai răbdător cu câștigurile și mai rapid cu pierderile.</>,
    ],
    eduNote: <>Nu-ți știi win rate-ul sau R:R-ul? Exact de asta există un <Link to="/" className="text-kmf-accent hover:underline">trading journal</Link>. După 30–50 de trade-uri logate, vei avea cifre semnificative statistic — și îți vei putea găsi celula exactă din această matrice.</>,
    linkRuinTitle: 'Risk of Ruin Calculator →',
    linkRuinDesc: 'Vezi dacă contul tău poate supraviețui seriilor lungi de pierderi',
    linkLotTitle: 'Lot Size Calculator →',
    linkLotDesc: 'Dimensionează-ți pozițiile ca să se potrivească cu R:R-ul țintă',
    ctaLine1: 'Nu-ți știi win rate-ul sau R:R-ul real?',
    ctaLine2: 'Loghează-ți trade-urile. Statisticile tale își vor găsi celula automat.',
    ctaButton: 'Descarcă gratuit din Google Play',
    faqHeading: 'Întrebări Frecvente',
    faq: [
      { q: 'Ce arată matricea?', a: 'Fiecare celulă arată expectancy — cât câștigi (sau pierzi) în medie per unitate de risc. O valoare de +0.5R înseamnă că pentru fiecare $100 riscați, câștigi în medie $50 pe multe trade-uri. Valorile negative înseamnă că pierzi bani pe termen lung, oricât de selectiv ai fi.' },
      { q: 'De ce poate fi profitabil un win rate de 40%?', a: 'Fiindcă depinde de cât faci când câștigi vs când pierzi. Cu un win rate de 40% și R:R 3:1, expectancy-ul tău e +0.6R — puternic profitabil. Pierzi 60% din trade-uri, dar câștigurile sunt de 3× mai mari decât pierderile. De asta R:R-ul contează mai mult decât win rate-ul singur.' },
      { q: 'Unde îmi găsesc win rate-ul și R:R-ul?', a: 'Din trading journal-ul tău. Win rate = câștiguri ÷ total trade-uri × 100. R:R = profitul mediu pe trade-urile câștigătoare ÷ pierderea medie pe cele pierzătoare. Ai nevoie de cel puțin 30–50 de trade-uri ca cifrele să însemne ceva.' },
      { q: 'Ce R:R ar trebui să țintesc?', a: 'Cei mai mulți traderi profesioniști țintesc cel puțin 1.5:1. Asta îți dă o marjă confortabilă — poți greși 40% din timp și tot să fii profitabil. Un R:R mai mare (2:1, 3:1) înseamnă că îți permiți un win rate și mai mic, ceea ce e realist pentru swing și position traderi.' },
      { q: 'E suficientă o celulă verde ca să fii profitabil?', a: 'E necesară, dar nu suficientă. Mai ai nevoie de execuție consecventă, position sizing corect și destule trade-uri ca statistica să se manifeste. O strategie cu expectancy +0.3R poate tot pierde bani pe termen scurt din cauza varianței. Dar fără expectancy pozitivă, nimic altceva nu contează.' },
    ],
  },
  de: {
    pageTitle: 'Win Rate vs R:R Matrix — Finde deine profitable Zone | K.M.F.',
    pageDesc: 'Interaktive Heatmap mit jeder Kombination aus Win Rate und Reward:Risk-Verhältnis. Sieh sofort, welche Setups profitabel sind und wo deine Trading-Strategie auf dem Profitabilitätsspektrum liegt.',
    ogAlt: 'Win Rate vs R:R Matrix — Finde deine profitable Zone',
    badge: 'Kostenloses Trading-Tool',
    heroP: <>Jede Zelle zeigt deinen <strong className="text-kmf-text-primary">Erwartungswert pro Trade</strong>. Grün = langfristig profitabel. Rot = du verlierst Geld, egal wie diszipliniert du bist.</>,
    howToTitle: 'So liest du das:',
    howToBody: <>Finde deine Win Rate auf der horizontalen Achse und dein durchschnittliches R:R auf der vertikalen Achse. Die Zelle, in der sie sich treffen, zeigt deinen <strong className="text-kmf-text-primary">Erwartungswert</strong> — wie viel du im Schnitt pro $1 Risiko verdienst. <strong className="text-kmf-accent">+0.5R</strong> bedeutet, du gewinnst über die Zeit $50 für jeden riskierten $100. <strong style={{ color: '#FF5252' }}>−0.3R</strong> bedeutet, du verlierst $30 pro riskiertem $100 — keine Strategie rettet dich.</>,
    formula: 'Formel: Erwartungswert = (Win Rate × Ø-Gewinn) − (Verlustrate × Ø-Verlust). Der Verlust wird immer auf 1R normiert.',
    yourStrategy: 'Deine Strategie',
    winRate: 'Win Rate',
    avgRr: 'Durchschnittliches R:R',
    wrHints: ['Niedrige Win Rate — braucht hohes R:R, um profitabel zu sein', 'Unter 50% — mit gutem R:R weiterhin profitabel', 'Solide Win Rate — funktioniert auch mit moderatem R:R', 'Hohe Win Rate — kann sich niedrigere R:R-Ziele leisten'],
    rrHints: ['Unter 1:1 — Win Rate muss sehr hoch sein, um auszugleichen', 'Moderat — typisch für Scalper, erfordert hohe Win Rate', 'Gutes R:R — gibt dir Spielraum für eine niedrigere Win Rate', 'Exzellentes R:R — selbst 30% Win Rate kann profitabel sein'],
    yourExpectancy: 'Dein Erwartungswert',
    perTrade: 'pro Trade',
    resStrong: (v) => <><strong>Starker Edge.</strong> Für jeden riskierten $1.000 verdienst du im Schnitt ~${v}.</>,
    resSlight: (v) => <><strong>Leichter Edge.</strong> Profitabel, aber knapp. Jeder riskierte $1.000 bringt ~${v}. Verbessere R:R oder Win Rate, um die Marge zu vergrößern.</>,
    resBreak: <><strong>Break-even.</strong> Kein Edge. Schon die Gebühren machen dich unprofitabel. Erhöhe das R:R.</>,
    resLosing: (v) => <><strong>Verlierende Strategie.</strong> Jeder riskierte $1.000 verliert ~${v}. Keine Anpassung der Positionsgröße rettet einen negativen Erwartungswert.</>,
    heatmap: 'Erwartungswert-Heatmap',
    legendLosing: 'Verlierend', legendBreak: 'Break-even', legendProfit: 'Profitabel',
    axisLabel: 'R:R ↓ / WR →',
    tipWinRate: 'Win Rate:', tipRr: 'R:R:', tipExpectancy: 'Erwartungswert:', tipPer: 'Pro $1.000 Risiko:',
    edgeLabels: { strong: 'Starker Edge', slight: 'Leichter Edge', breakeven: 'Break-even', weak: 'Leicht negativ', strongLose: 'Stark verlierend' },
    cards: [
      { title: 'Die Win-Rate-Falle', body: 'Eine Win Rate von 70% klingt beeindruckend — aber wenn dein Ø-Verlust 3× größer ist als dein Ø-Gewinn, verlierst du Geld. Das R:R ist wichtiger als die Win Rate.' },
      { title: 'Die Break-even-Diagonale', body: 'Die gelben Zellen bilden eine diagonale Linie. Das ist die Break-even-Grenze. Jede Kombination auf ihr verdient nichts. Du musst darüber liegen, um langfristig zu überleben.' },
      { title: 'Die Profi-Zone', body: 'Die meisten Vollzeit-Trader arbeiten zwischen 40–55% Win Rate mit 1.5:1–3:1 R:R. Langweilig? Ja. Nachhaltig profitabel? Auch ja.' },
    ],
    eduTitle: 'Warum die meisten Trader das falsch sehen',
    eduP: [
      <>Anfänger fixieren sich auf die Win Rate. Sie wollen meistens „recht" haben. Aber Trading ist kein Test — es ist ein Geschäft. Die einzige Kennzahl, die zählt, ist: <strong className="text-kmf-text-primary">Verdient deine Strategie über eine große Stichprobe von Trades Geld?</strong></>,
      <>Genau das misst der Erwartungswert. Er entfernt das ganze Rauschen — die Glückssträhnen, die schlechten Tage, die glücklichen Trades — und sagt dir, was deine Strategie tatsächlich pro Risikoeinheit verdient. Ein positiver Erwartungswert bedeutet, der Edge ist real. Ein negativer Erwartungswert bedeutet, dass dich keine Disziplin, keine Psychologie-Arbeit und kein Risikomanagement rettet.</>,
      <><strong className="text-kmf-text-primary">Die Matrix oben zeigt jede mögliche Kombination.</strong> Beachte, wie die grüne Zone ein breites diagonales Band abdeckt — es gibt viele Wege zur Profitabilität. Ein Scalper mit 70% Win Rate und 0.75:1 R:R liegt im selben grünen Band wie ein Swing-Trader mit 35% Win Rate und 3:1 R:R. Unterschiedliche Stile, dieselbe Mathematik.</>,
      <>Die rote Zone ist unerbittlich. Bist du erst einmal dort, rettet dich kein Trick. Erkennst du deine Zahlen im Roten, ist die Lösung eines von zwei Dingen: verbessere deine Einstiege (Win Rate) oder deine Ausstiege (R:R). Meist ist es einfacher, das R:R zu verbessern — es verlangt nicht, öfter „recht" zu haben, nur geduldiger mit Gewinnern und schneller mit Verlierern zu sein.</>,
    ],
    eduNote: <>Kennst du deine Win Rate oder dein R:R nicht? Genau dafür gibt es ein <Link to="/" className="text-kmf-accent hover:underline">Trading-Journal</Link>. Nach 30–50 protokollierten Trades hast du statistisch aussagekräftige Zahlen — und kannst deine genaue Zelle in dieser Matrix finden.</>,
    linkRuinTitle: 'Risk-of-Ruin-Rechner →',
    linkRuinDesc: 'Sieh, ob dein Konto lange Verlustserien übersteht',
    linkLotTitle: 'Lot-Size-Rechner →',
    linkLotDesc: 'Dimensioniere deine Positionen passend zu deinem Ziel-R:R',
    ctaLine1: 'Kennst du deine echte Win Rate oder dein echtes R:R nicht?',
    ctaLine2: 'Protokolliere deine Trades. Deine Statistiken finden ihre Zelle automatisch.',
    ctaButton: 'Kostenlos bei Google Play herunterladen',
    faqHeading: 'Häufige Fragen',
    faq: [
      { q: 'Was zeigt die Matrix?', a: 'Jede Zelle zeigt den Erwartungswert — wie viel du im Schnitt pro Risikoeinheit gewinnst (oder verlierst). Ein Wert von +0.5R bedeutet, dass du für jeden riskierten $100 über viele Trades im Schnitt $50 gewinnst. Negative Werte bedeuten, dass du langfristig Geld verlierst, egal wie selektiv du bist.' },
      { q: 'Warum kann eine Win Rate von 40% profitabel sein?', a: 'Weil es darauf ankommt, wie viel du bei Gewinnen vs. Verlusten machst. Mit 40% Win Rate und 3:1 R:R liegt dein Erwartungswert bei +0.6R — stark profitabel. Du verlierst 60% der Trades, aber deine Gewinner sind 3× größer als die Verlierer. Deshalb zählt das R:R mehr als die Win Rate allein.' },
      { q: 'Wo finde ich meine Win Rate und mein R:R?', a: 'Aus deinem Trading-Journal. Win Rate = Gewinne ÷ Trades gesamt × 100. R:R = durchschnittlicher Gewinn bei Gewinner-Trades ÷ durchschnittlicher Verlust bei Verlierer-Trades. Du brauchst mindestens 30–50 Trades, damit die Zahlen aussagekräftig sind.' },
      { q: 'Welches R:R sollte ich anstreben?', a: 'Die meisten professionellen Trader streben mindestens 1.5:1 an. Das gibt dir einen komfortablen Puffer — du kannst in 40% der Fälle falschliegen und bist trotzdem profitabel. Ein höheres R:R (2:1, 3:1) bedeutet, dass du dir eine noch niedrigere Win Rate leisten kannst, was für Swing- und Positions-Trader realistisch ist.' },
      { q: 'Reicht eine grüne Zelle, um profitabel zu sein?', a: 'Sie ist notwendig, aber nicht ausreichend. Du brauchst außerdem konsequente Ausführung, die richtige Positionsgröße und genügend Trades, damit sich die Statistik durchsetzt. Eine Strategie mit +0.3R Erwartungswert kann kurzfristig durch Varianz trotzdem Geld verlieren. Aber ohne positiven Erwartungswert zählt nichts anderes.' },
    ],
  },
  fr: {
    pageTitle: 'Matrice Win Rate vs R:R — Trouvez votre zone rentable | K.M.F.',
    pageDesc: 'Heatmap interactive montrant chaque combinaison de win rate et de ratio gain:risque. Voyez instantanément quels setups sont rentables et où se situe votre stratégie sur le spectre de la rentabilité.',
    ogAlt: 'Matrice Win Rate vs R:R — Trouvez votre zone rentable',
    badge: 'Outil de trading gratuit',
    heroP: <>Chaque case montre votre <strong className="text-kmf-text-primary">espérance par trade</strong>. Vert = rentable à long terme. Rouge = vous perdez de l\'argent quelle que soit votre discipline.</>,
    howToTitle: 'Comment lire ceci :',
    howToBody: <>Trouvez votre win rate sur l\'axe horizontal et votre R:R moyen sur l\'axe vertical. La case où ils se croisent montre votre <strong className="text-kmf-text-primary">espérance</strong> — combien vous gagnez par 1 $ risqué, en moyenne. <strong className="text-kmf-accent">+0.5R</strong> signifie que vous gagnez 50 $ pour chaque 100 $ risqués dans le temps. <strong style={{ color: '#FF5252' }}>−0.3R</strong> signifie que vous perdez 30 $ par 100 $ risqués — aucune stratégie ne vous sauvera.</>,
    formula: 'Formule : Espérance = (Win Rate × Gain moyen) − (Taux de perte × Perte moyenne). La perte est toujours normalisée à 1R.',
    yourStrategy: 'Votre stratégie',
    winRate: 'Win Rate',
    avgRr: 'R:R moyen',
    wrHints: ['Win rate faible — nécessite un R:R élevé pour être rentable', 'Sous 50% — encore rentable avec un bon R:R', 'Win rate solide — fonctionne même avec un R:R modéré', 'Win rate élevé — permet des cibles R:R plus basses'],
    rrHints: ['Sous 1:1 — le win rate doit être très élevé pour compenser', 'Modéré — typique des scalpers, exige un win rate élevé', 'Bon R:R — vous donne de la marge pour un win rate plus bas', 'R:R excellent — même 30% de win rate peut être rentable'],
    yourExpectancy: 'Votre espérance',
    perTrade: 'par trade',
    resStrong: (v) => <><strong>Avantage solide.</strong> Pour chaque 1 000 $ risqués, vous gagnez ~${v} en moyenne.</>,
    resSlight: (v) => <><strong>Léger avantage.</strong> Rentable, mais mince. Chaque 1 000 $ risqués rapporte ~${v}. Améliorez le R:R ou le win rate pour élargir la marge.</>,
    resBreak: <><strong>À l\'équilibre.</strong> Aucun avantage. Les seules commissions vous rendront non rentable. Augmentez le R:R.</>,
    resLosing: (v) => <><strong>Stratégie perdante.</strong> Chaque 1 000 $ risqués perd ~${v}. Aucun ajustement du dimensionnement ne sauve une espérance négative.</>,
    heatmap: 'Heatmap d\'espérance',
    legendLosing: 'Perdant', legendBreak: 'Équilibre', legendProfit: 'Rentable',
    axisLabel: 'R:R ↓ / WR →',
    tipWinRate: 'Win Rate :', tipRr: 'R:R :', tipExpectancy: 'Espérance :', tipPer: 'Par 1 000 $ risqués :',
    edgeLabels: { strong: 'Avantage solide', slight: 'Léger avantage', breakeven: 'Équilibre', weak: 'Légèrement négatif', strongLose: 'Fortement perdant' },
    cards: [
      { title: 'Le piège du win rate', body: 'Un win rate de 70 % semble impressionnant — mais si votre perte moyenne est 3× plus grande que votre gain moyen, vous perdez de l\'argent. Le R:R est plus important que le win rate.' },
      { title: 'La diagonale de l\'équilibre', body: 'Les cases jaunes forment une ligne diagonale. C\'est la frontière de l\'équilibre. Toute combinaison dessus ne rapporte rien. Vous devez être au-dessus pour survivre à long terme.' },
      { title: 'La zone professionnelle', body: 'La plupart des traders à plein temps opèrent entre 40 et 55 % de win rate avec un R:R de 1.5:1 à 3:1. Ennuyeux ? Oui. Durablement rentable ? Aussi oui.' },
    ],
    eduTitle: 'Pourquoi la plupart des traders se trompent là-dessus',
    eduP: [
      <>Les débutants se fixent sur le win rate. Ils veulent avoir « raison » la plupart du temps. Mais le trading n\'est pas un examen — c\'est une entreprise. La seule métrique qui compte est : <strong className="text-kmf-text-primary">votre stratégie gagne-t-elle de l\'argent sur un grand échantillon de trades ?</strong></>,
      <>C\'est ce que mesure l\'espérance. Elle élimine tout le bruit — les séries chanceuses, les mauvais jours, les trades chanceux — et vous dit ce que votre stratégie gagne réellement par unité de risque. Une espérance positive signifie que l\'avantage est réel. Une espérance négative signifie qu\'aucune discipline, travail psychologique ou gestion du risque ne vous sauvera.</>,
      <><strong className="text-kmf-text-primary">La matrice ci-dessus montre toutes les combinaisons possibles.</strong> Remarquez comme la zone verte couvre une large bande diagonale — il y a de nombreux chemins vers la rentabilité. Un scalper avec 70 % de win rate et un R:R de 0.75:1 est dans la même bande verte qu\'un swing trader avec 35 % de win rate et un R:R de 3:1. Styles différents, mêmes maths.</>,
      <>La zone rouge est impitoyable. Une fois dedans, aucune astuce ne vous sauve. Si vous reconnaissez vos chiffres dans le rouge, la solution est l\'une de deux choses : améliorer vos entrées (win rate) ou vos sorties (R:R). Améliorer le R:R est généralement plus facile — cela ne demande pas d\'avoir plus souvent « raison », juste d\'être plus patient avec les gagnants et plus rapide avec les perdants.</>,
    ],
    eduNote: <>Vous ne connaissez pas votre win rate ou votre R:R ? C\'est exactement pour ça qu\'un <Link to="/" className="text-kmf-accent hover:underline">journal de trading</Link> existe. Après 30 à 50 trades enregistrés, vous aurez des chiffres statistiquement significatifs — et vous pourrez trouver votre case exacte dans cette matrice.</>,
    linkRuinTitle: 'Calculateur de Risk of Ruin →',
    linkRuinDesc: 'Voyez si votre compte peut survivre à de longues séries de pertes',
    linkLotTitle: 'Calculateur de lot →',
    linkLotDesc: 'Dimensionnez vos positions selon votre R:R cible',
    ctaLine1: 'Vous ne connaissez pas votre vrai win rate ou R:R ?',
    ctaLine2: 'Enregistrez vos trades. Vos statistiques trouveront leur case automatiquement.',
    ctaButton: 'Télécharger gratuitement sur Google Play',
    faqHeading: 'Questions fréquentes',
    faq: [
      { q: 'Que montre la matrice ?', a: 'Chaque case montre l\'espérance — combien vous gagnez (ou perdez) en moyenne par unité de risque. Une valeur de +0.5R signifie que pour chaque 100 $ risqués, vous gagnez 50 $ en moyenne sur de nombreux trades. Les valeurs négatives signifient que vous perdez de l\'argent à long terme, quelle que soit votre sélectivité.' },
      { q: 'Pourquoi un win rate de 40 % peut-il être rentable ?', a: 'Parce que cela dépend de combien vous gagnez quand vous gagnez vs perdez. Avec un win rate de 40 % et un R:R de 3:1, votre espérance est de +0.6R — fortement rentable. Vous perdez 60 % des trades mais vos gagnants sont 3× plus gros que les perdants. C\'est pourquoi le R:R compte plus que le win rate seul.' },
      { q: 'Où trouver mon win rate et mon R:R ?', a: 'Dans votre journal de trading. Win rate = gains ÷ total des trades × 100. R:R = gain moyen des trades gagnants ÷ perte moyenne des trades perdants. Il faut au moins 30 à 50 trades pour que les chiffres soient significatifs.' },
      { q: 'Quel R:R devrais-je viser ?', a: 'La plupart des traders professionnels visent au moins 1.5:1. Cela vous donne une marge confortable — vous pouvez vous tromper 40 % du temps et rester rentable. Un R:R plus élevé (2:1, 3:1) signifie que vous pouvez vous permettre un win rate encore plus bas, ce qui est réaliste pour les swing et position traders.' },
      { q: 'Une case verte suffit-elle pour être rentable ?', a: 'Elle est nécessaire mais pas suffisante. Il vous faut aussi une exécution cohérente, un bon dimensionnement de position et assez de trades pour que la statistique se réalise. Une stratégie à +0.3R d\'espérance peut quand même perdre de l\'argent à court terme à cause de la variance. Mais sans espérance positive, rien d\'autre ne compte.' },
    ],
  },
  ru: {
    pageTitle: 'Матрица Win Rate vs R:R — найдите свою прибыльную зону | K.M.F.',
    pageDesc: 'Интерактивная тепловая карта, показывающая каждую комбинацию win rate и соотношения прибыль:риск. Мгновенно увидьте, какие сетапы прибыльны и где ваша стратегия на спектре прибыльности.',
    ogAlt: 'Матрица Win Rate vs R:R — найдите свою прибыльную зону',
    badge: 'Бесплатный торговый инструмент',
    heroP: <>Каждая ячейка показывает ваше <strong className="text-kmf-text-primary">матожидание на сделку</strong>. Зелёный = прибыльно в долгосроке. Красный = вы теряете деньги, как бы дисциплинированы вы ни были.</>,
    howToTitle: 'Как это читать:',
    howToBody: <>Найдите свой win rate на горизонтальной оси и средний R:R на вертикальной. Ячейка их пересечения показывает ваше <strong className="text-kmf-text-primary">матожидание</strong> — сколько вы зарабатываете на $1 риска, в среднем. <strong className="text-kmf-accent">+0.5R</strong> означает, что со временем вы получаете $50 на каждые $100 риска. <strong style={{ color: '#FF5252' }}>−0.3R</strong> означает, что вы теряете $30 на $100 риска — никакая стратегия вас не спасёт.</>,
    formula: 'Формула: Матожидание = (Win Rate × Средняя прибыль) − (Доля убытков × Средний убыток). Убыток всегда нормализован к 1R.',
    yourStrategy: 'Ваша стратегия',
    winRate: 'Win Rate',
    avgRr: 'Средний R:R',
    wrHints: ['Низкий win rate — нужен высокий R:R для прибыльности', 'Ниже 50% — ещё прибыльно при хорошем R:R', 'Солидный win rate — работает даже при умеренном R:R', 'Высокий win rate — позволяет более низкие цели R:R'],
    rrHints: ['Ниже 1:1 — win rate должен быть очень высоким для компенсации', 'Умеренный — типично для скальперов, требует высокого win rate', 'Хороший R:R — даёт запас для более низкого win rate', 'Отличный R:R — даже 30% win rate может быть прибыльным'],
    yourExpectancy: 'Ваше матожидание',
    perTrade: 'на сделку',
    resStrong: (v) => <><strong>Сильное преимущество.</strong> На каждые $1 000 риска вы в среднем получаете ~${v}.</>,
    resSlight: (v) => <><strong>Лёгкое преимущество.</strong> Прибыльно, но тонко. Каждые $1 000 риска приносят ~${v}. Улучшите R:R или win rate, чтобы расширить запас.</>,
    resBreak: <><strong>В безубытке.</strong> Нет преимущества. Одни только комиссии сделают вас убыточным. Повысьте R:R.</>,
    resLosing: (v) => <><strong>Убыточная стратегия.</strong> Каждые $1 000 риска теряют ~${v}. Никакая настройка размера позиции не спасёт отрицательное матожидание.</>,
    heatmap: 'Тепловая карта матожидания',
    legendLosing: 'Убыточно', legendBreak: 'Безубыток', legendProfit: 'Прибыльно',
    axisLabel: 'R:R ↓ / WR →',
    tipWinRate: 'Win Rate:', tipRr: 'R:R:', tipExpectancy: 'Матожидание:', tipPer: 'На $1 000 риска:',
    edgeLabels: { strong: 'Сильное преимущество', slight: 'Лёгкое преимущество', breakeven: 'Безубыток', weak: 'Слабо отрицательно', strongLose: 'Сильно убыточно' },
    cards: [
      { title: 'Ловушка win rate', body: 'Win rate 70% звучит впечатляюще — но если ваш средний убыток в 3× больше средней прибыли, вы теряете деньги. R:R важнее win rate.' },
      { title: 'Диагональ безубытка', body: 'Жёлтые ячейки образуют диагональную линию. Это граница безубытка. Любая комбинация на ней не приносит ничего. Нужно быть выше неё, чтобы выжить в долгосроке.' },
      { title: 'Профессиональная зона', body: 'Большинство трейдеров на полной занятости работают между 40–55% win rate с R:R 1.5:1–3:1. Скучно? Да. Устойчиво прибыльно? Тоже да.' },
    ],
    eduTitle: 'Почему большинство трейдеров думают об этом неправильно',
    eduP: [
      <>Новички зацикливаются на win rate. Они хотят быть «правыми» большую часть времени. Но трейдинг — не экзамен, это бизнес. Единственная метрика, которая имеет значение: <strong className="text-kmf-text-primary">зарабатывает ли ваша стратегия деньги на большой выборке сделок?</strong></>,
      <>Именно это измеряет матожидание. Оно убирает весь шум — удачные серии, плохие дни, везучие сделки — и говорит, сколько ваша стратегия реально зарабатывает на единицу риска. Положительное матожидание означает, что преимущество реально. Отрицательное матожидание означает, что никакая дисциплина, психологическая работа или риск-менеджмент вас не спасут.</>,
      <><strong className="text-kmf-text-primary">Матрица выше показывает все возможные комбинации.</strong> Заметьте, как зелёная зона покрывает широкую диагональную полосу — есть много путей к прибыльности. Скальпер с 70% win rate и R:R 0.75:1 в той же зелёной полосе, что и свинг-трейдер с 35% win rate и R:R 3:1. Разные стили, та же математика.</>,
      <>Красная зона беспощадна. Попав туда, вас не спасёт никакой трюк. Если вы узнаёте свои цифры в красном, решение одно из двух: улучшить входы (win rate) или выходы (R:R). Обычно улучшить R:R проще — это не требует быть чаще «правым», лишь быть терпеливее с прибылью и быстрее с убытками.</>,
    ],
    eduNote: <>Не знаете свой win rate или R:R? Именно для этого существует <Link to="/" className="text-kmf-accent hover:underline">торговый журнал</Link>. После 30–50 записанных сделок у вас будут статистически значимые цифры — и вы сможете найти свою точную ячейку в этой матрице.</>,
    linkRuinTitle: 'Калькулятор Risk of Ruin →',
    linkRuinDesc: 'Посмотрите, переживёт ли ваш счёт длинные серии убытков',
    linkLotTitle: 'Калькулятор лота →',
    linkLotDesc: 'Подбирайте размер позиций под ваш целевой R:R',
    ctaLine1: 'Не знаете свой реальный win rate или R:R?',
    ctaLine2: 'Записывайте свои сделки. Ваша статистика найдёт свою ячейку автоматически.',
    ctaButton: 'Скачать бесплатно в Google Play',
    faqHeading: 'Частые вопросы',
    faq: [
      { q: 'Что показывает матрица?', a: 'Каждая ячейка показывает матожидание — сколько вы в среднем зарабатываете (или теряете) на единицу риска. Значение +0.5R означает, что на каждые $100 риска вы в среднем получаете $50 за много сделок. Отрицательные значения означают, что вы теряете деньги в долгосроке, как бы избирательны вы ни были.' },
      { q: 'Почему win rate 40% может быть прибыльным?', a: 'Потому что это зависит от того, сколько вы зарабатываете при выигрыше против проигрыша. При win rate 40% и R:R 3:1 ваше матожидание +0.6R — сильно прибыльно. Вы проигрываете 60% сделок, но ваши выигрыши в 3× больше убытков. Поэтому R:R важнее одного только win rate.' },
      { q: 'Где найти мой win rate и R:R?', a: 'В вашем торговом журнале. Win rate = выигрыши ÷ всего сделок × 100. R:R = средняя прибыль на прибыльных сделках ÷ средний убыток на убыточных. Нужно минимум 30–50 сделок, чтобы цифры были значимыми.' },
      { q: 'Какой R:R мне выбрать?', a: 'Большинство профессиональных трейдеров целятся минимум в 1.5:1. Это даёт комфортный запас — вы можете ошибаться 40% времени и оставаться прибыльным. Более высокий R:R (2:1, 3:1) означает, что вы можете позволить себе ещё более низкий win rate, что реалистично для свинг- и позиционных трейдеров.' },
      { q: 'Достаточно ли зелёной ячейки для прибыльности?', a: 'Она необходима, но недостаточна. Вам также нужны последовательное исполнение, правильный размер позиции и достаточно сделок, чтобы статистика проявилась. Стратегия с матожиданием +0.3R всё равно может терять деньги в краткосроке из-за дисперсии. Но без положительного матожидания ничто другое не имеет значения.' },
    ],
  },
  ja: {
    pageTitle: 'Win Rate vs R:R マトリックス — 利益が出るゾーンを見つける | K.M.F.',
    pageDesc: '勝率とリワード:リスク比のあらゆる組み合わせを示すインタラクティブなヒートマップ。どのセットアップが利益を生むか、あなたの戦略が収益性スペクトルのどこにあるかを即座に確認。',
    ogAlt: 'Win Rate vs R:R マトリックス — 利益が出るゾーンを見つける',
    badge: '無料トレードツール',
    heroP: <>各セルはあなたの<strong className="text-kmf-text-primary">1トレードあたりの期待値</strong>を示します。緑 = 長期的に利益。赤 = どれだけ規律正しくてもお金を失います。</>,
    howToTitle: 'これの読み方：',
    howToBody: <>横軸で勝率、縦軸で平均R:Rを見つけます。交差するセルがあなたの<strong className="text-kmf-text-primary">期待値</strong>を示します — 1ドルのリスクあたり平均でいくら稼ぐか。<strong className="text-kmf-accent">+0.5R</strong>は、時間をかければ$100のリスクごとに$50得るという意味。<strong style={{ color: '#FF5252' }}>−0.3R</strong>は$100のリスクごとに$30失う — どんな戦略も救えません。</>,
    formula: '計算式：期待値 =（勝率 × 平均利益）−（負け率 × 平均損失）。損失は常に1Rに正規化されます。',
    yourStrategy: 'あなたの戦略',
    winRate: '勝率',
    avgRr: '平均R:R',
    wrHints: ['勝率が低い — 利益を出すには高いR:Rが必要', '50%未満 — 良いR:Rならまだ利益が出る', '堅実な勝率 — 中程度のR:Rでも機能', '高い勝率 — より低いR:Rターゲットでも可'],
    rrHints: ['1:1未満 — 補うには勝率が非常に高い必要', '中程度 — スキャルパーに典型的、高い勝率が必要', '良いR:R — 低い勝率への余裕を与える', '優れたR:R — 勝率30%でも利益が出うる'],
    yourExpectancy: 'あなたの期待値',
    perTrade: '1トレードあたり',
    resStrong: (v) => <><strong>強いエッジ。</strong>$1,000のリスクごとに平均で約${v}稼ぎます。</>,
    resSlight: (v) => <><strong>わずかなエッジ。</strong>利益は出るが薄い。$1,000のリスクごとに約${v}。R:Rか勝率を改善してマージンを広げましょう。</>,
    resBreak: <><strong>損益均衡。</strong>エッジなし。手数料だけで利益が出なくなります。R:Rを上げましょう。</>,
    resLosing: (v) => <><strong>負け戦略。</strong>$1,000のリスクごとに約${v}失います。どんなポジションサイジングの調整もマイナスの期待値は救えません。</>,
    heatmap: '期待値ヒートマップ',
    legendLosing: '負け', legendBreak: '損益均衡', legendProfit: '利益',
    axisLabel: 'R:R ↓ / 勝率 →',
    tipWinRate: '勝率：', tipRr: 'R:R：', tipExpectancy: '期待値：', tipPer: '$1,000のリスクあたり：',
    edgeLabels: { strong: '強いエッジ', slight: 'わずかなエッジ', breakeven: '損益均衡', weak: 'わずかにマイナス', strongLose: '大きく負け' },
    cards: [
      { title: '勝率の罠', body: '勝率70%は印象的に聞こえます — しかし平均損失が平均利益の3倍なら、お金を失います。R:Rは勝率より重要です。' },
      { title: '損益均衡の対角線', body: '黄色のセルは対角線を形成します。これが損益均衡の境界です。その上のどの組み合わせも何も稼ぎません。長期的に生き残るにはその上にいる必要があります。' },
      { title: 'プロフェッショナルゾーン', body: 'ほとんどの専業トレーダーは勝率40〜55%、R:R 1.5:1〜3:1で運用します。退屈？はい。持続的に利益が出る？それも、はい。' },
    ],
    eduTitle: 'なぜほとんどのトレーダーはこれを誤解するのか',
    eduP: [
      <>初心者は勝率に固執します。ほとんどの時間「正しく」ありたいのです。しかしトレードは試験ではなく、ビジネスです。唯一重要な指標は：<strong className="text-kmf-text-primary">あなたの戦略は大きなトレードのサンプルで利益を出すか？</strong>です。</>,
      <>それを測るのが期待値です。ノイズ — 好調な連勝、悪い日、運の良いトレード — をすべて取り除き、リスク1単位あたり戦略が実際にいくら稼ぐかを教えます。プラスの期待値はエッジが本物だという意味。マイナスの期待値は、どんな規律も心理ワークもリスク管理も救えないという意味です。</>,
      <><strong className="text-kmf-text-primary">上のマトリックスはあらゆる組み合わせを示します。</strong>緑のゾーンが広い対角の帯を覆うことに注目 — 利益への道は多数あります。勝率70%・R:R 0.75:1のスキャルパーは、勝率35%・R:R 3:1のスイングトレーダーと同じ緑の帯にいます。スタイルは違えど、数学は同じです。</>,
      <>赤のゾーンは容赦ありません。そこに入れば、どんな小細工も救いません。自分の数字が赤にあると気づいたら、解決策は2つのうち1つ：エントリー（勝率）を改善するか、出口（R:R）を改善する。通常はR:Rの改善の方が簡単です — より頻繁に「正しく」ある必要はなく、勝ちに辛抱強く、負けに素早くなるだけです。</>,
    ],
    eduNote: <>勝率やR:Rを知らない？まさにそのために<Link to="/" className="text-kmf-accent hover:underline">トレードジャーナル</Link>があります。30〜50トレードを記録すれば、統計的に意味のある数字が得られ — このマトリックスで自分の正確なセルを見つけられます。</>,
    linkRuinTitle: 'Risk of Ruin 計算機 →',
    linkRuinDesc: '口座が長い連敗を生き残れるか確認',
    linkLotTitle: 'ロットサイズ計算機 →',
    linkLotDesc: '目標R:Rに合わせてポジションサイズを調整',
    ctaLine1: '本当の勝率やR:Rを知らない？',
    ctaLine2: 'トレードを記録しましょう。あなたの統計が自動でセルを見つけます。',
    ctaButton: 'Google Playで無料ダウンロード',
    faqHeading: 'よくある質問',
    faq: [
      { q: 'マトリックスは何を示す？', a: '各セルは期待値 — リスク1単位あたり平均でいくら稼ぐ（または失う）かを示します。+0.5Rの値は、$100のリスクごとに多数のトレードで平均$50稼ぐという意味。マイナスの値は、どれだけ選別しても長期的にお金を失うという意味です。' },
      { q: 'なぜ勝率40%でも利益が出る？', a: '勝つときと負けるときでいくら稼ぐかによるからです。勝率40%・R:R 3:1なら期待値は+0.6R — 大きく利益。トレードの60%は負けますが、勝ちは負けの3倍大きい。だからR:Rは勝率単独より重要なのです。' },
      { q: '勝率とR:Rはどこで見つける？', a: 'トレードジャーナルから。勝率 = 勝ち ÷ 総トレード × 100。R:R = 勝ちトレードの平均利益 ÷ 負けトレードの平均損失。数字が意味を持つには最低30〜50トレードが必要です。' },
      { q: 'どのR:Rを目指すべき？', a: 'ほとんどのプロは最低1.5:1を目指します。これは快適な余裕を与えます — 40%の確率で間違えても利益を出せます。より高いR:R（2:1、3:1）なら、さらに低い勝率でもよく、スイングやポジショントレーダーには現実的です。' },
      { q: '緑のセルなら利益が出る？', a: '必要だが十分ではありません。一貫した執行、適切なポジションサイジング、統計が現れるだけのトレード数も必要です。期待値+0.3Rの戦略でも、分散により短期的にはお金を失いえます。しかしプラスの期待値がなければ、他の何も意味を持ちません。' },
    ],
  },
  zh: {
    pageTitle: 'Win Rate vs R:R 矩阵 — 找到你的盈利区 | K.M.F.',
    pageDesc: '展示胜率与盈亏比每种组合的交互式热力图。即时看清哪些 setup 盈利，以及你的交易策略处于盈利能力谱系的何处。',
    ogAlt: 'Win Rate vs R:R 矩阵 — 找到你的盈利区',
    badge: '免费交易工具',
    heroP: <>每个格子显示你的<strong className="text-kmf-text-primary">每笔期望值</strong>。绿色 = 长期盈利。红色 = 无论你多有纪律都在亏钱。</>,
    howToTitle: '如何阅读：',
    howToBody: <>在横轴找到你的胜率，在纵轴找到你的平均 R:R。它们相交的格子显示你的<strong className="text-kmf-text-primary">期望值</strong> — 平均每冒险 $1 你赚多少。<strong className="text-kmf-accent">+0.5R</strong> 意味着长期每冒险 $100 你赚 $50。<strong style={{ color: '#FF5252' }}>−0.3R</strong> 意味着每冒险 $100 你亏 $30 — 没有策略能救你。</>,
    formula: '公式：期望值 =（胜率 × 平均盈利）−（亏损率 × 平均亏损）。亏损始终归一化为 1R。',
    yourStrategy: '你的策略',
    winRate: '胜率',
    avgRr: '平均 R:R',
    wrHints: ['胜率低 — 需要高 R:R 才能盈利', '低于 50% — 配好 R:R 仍可盈利', '胜率稳健 — 即使中等 R:R 也行', '胜率高 — 可承受更低的 R:R 目标'],
    rrHints: ['低于 1:1 — 胜率必须很高才能弥补', '中等 — 剥头皮者典型，需要高胜率', '良好 R:R — 给你更低胜率的余地', '出色 R:R — 即使 30% 胜率也能盈利'],
    yourExpectancy: '你的期望值',
    perTrade: '每笔',
    resStrong: (v) => <><strong>强优势。</strong>每冒险 $1,000，你平均赚约 ${v}。</>,
    resSlight: (v) => <><strong>轻微优势。</strong>盈利，但很薄。每冒险 $1,000 赚约 ${v}。改进 R:R 或胜率以扩大余量。</>,
    resBreak: <><strong>盈亏平衡。</strong>没有优势。仅手续费就会让你不盈利。提高 R:R。</>,
    resLosing: (v) => <><strong>亏损策略。</strong>每冒险 $1,000 亏约 ${v}。任何仓位管理调整都救不了负期望值。</>,
    heatmap: '期望值热力图',
    legendLosing: '亏损', legendBreak: '盈亏平衡', legendProfit: '盈利',
    axisLabel: 'R:R ↓ / 胜率 →',
    tipWinRate: '胜率：', tipRr: 'R:R：', tipExpectancy: '期望值：', tipPer: '每冒险 $1,000：',
    edgeLabels: { strong: '强优势', slight: '轻微优势', breakeven: '盈亏平衡', weak: '轻微负', strongLose: '严重亏损' },
    cards: [
      { title: '胜率陷阱', body: '70% 的胜率听起来令人印象深刻 — 但如果你的平均亏损是平均盈利的 3 倍，你在亏钱。R:R 比胜率更重要。' },
      { title: '盈亏平衡对角线', body: '黄色格子形成一条对角线。这是盈亏平衡边界。线上的每种组合都不赚不亏。你必须在它之上才能长期生存。' },
      { title: '专业区', body: '大多数全职交易者在 40–55% 胜率、R:R 1.5:1–3:1 之间运作。无聊吗？是的。可持续盈利吗？也是的。' },
    ],
    eduTitle: '为什么大多数交易者想错了',
    eduP: [
      <>新手执着于胜率。他们想大部分时间「正确」。但交易不是考试 — 它是生意。唯一重要的指标是：<strong className="text-kmf-text-primary">你的策略在大样本交易上赚钱吗？</strong></>,
      <>这就是期望值衡量的东西。它剥离所有噪音 — 连胜、坏日子、走运的交易 — 告诉你策略每单位风险实际赚多少。正期望值意味着优势是真实的。负期望值意味着任何纪律、心理功课或风险管理都救不了你。</>,
      <><strong className="text-kmf-text-primary">上面的矩阵展示了每种可能的组合。</strong>注意绿色区如何覆盖一条宽阔的对角带 — 通往盈利的路径有很多。胜率 70%、R:R 0.75:1 的剥头皮者，与胜率 35%、R:R 3:1 的波段交易者处于同一条绿带。风格不同，数学相同。</>,
      <>红色区毫不留情。一旦进入，没有任何花招能救你。如果你在红色中认出自己的数字，解决办法是二者之一：改进入场（胜率）或出场（R:R）。通常改进 R:R 更容易 — 它不要求你更频繁地「正确」，只要求对盈利更有耐心、对亏损更果断。</>,
    ],
    eduNote: <>不知道你的胜率或 R:R？这正是<Link to="/" className="text-kmf-accent hover:underline">交易日志</Link>存在的原因。记录 30–50 笔交易后，你将拥有统计上有意义的数字 — 并能在这个矩阵中找到你的确切格子。</>,
    linkRuinTitle: 'Risk of Ruin 计算器 →',
    linkRuinDesc: '看看你的账户能否挺过长连亏',
    linkLotTitle: '手数计算器 →',
    linkLotDesc: '根据你的目标 R:R 调整仓位大小',
    ctaLine1: '不知道你真实的胜率或 R:R？',
    ctaLine2: '记录你的交易。你的统计数据会自动找到它的格子。',
    ctaButton: '在 Google Play 免费下载',
    faqHeading: '常见问题',
    faq: [
      { q: '矩阵显示什么？', a: '每个格子显示期望值 — 平均每单位风险你赚（或亏）多少。+0.5R 的值意味着每冒险 $100，在多笔交易上平均赚 $50。负值意味着无论你多挑剔，长期都在亏钱。' },
      { q: '为什么 40% 的胜率能盈利？', a: '因为这取决于你赢时与输时各赚多少。以 40% 胜率和 R:R 3:1，你的期望值是 +0.6R — 强盈利。你输掉 60% 的交易，但盈利是亏损的 3 倍大。这就是 R:R 比单看胜率更重要的原因。' },
      { q: '在哪里找到我的胜率和 R:R？', a: '在你的交易日志中。胜率 = 盈利 ÷ 总交易 × 100。R:R = 盈利交易的平均利润 ÷ 亏损交易的平均损失。你需要至少 30–50 笔交易，数字才有意义。' },
      { q: '我应该追求什么样的 R:R？', a: '大多数专业交易者追求至少 1.5:1。这给你舒适的缓冲 — 你可以 40% 的时间出错仍然盈利。更高的 R:R（2:1、3:1）意味着你能承受更低的胜率，这对波段和头寸交易者很现实。' },
      { q: '绿色格子就足以盈利吗？', a: '它必要但不充分。你还需要一致的执行、正确的仓位管理，以及足够的交易让统计显现。期望值 +0.3R 的策略，因方差短期内仍可能亏钱。但没有正期望值，其他一切都无关紧要。' },
    ],
  },
};

// Win rate columns: 20% → 80% (step 5)
const WIN_RATES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
// R:R rows: 0.3 → 5.0
const RR_VALUES = [5.0, 4.0, 3.0, 2.5, 2.0, 1.5, 1.25, 1.0, 0.75, 0.5, 0.3];

function calcExpectancy(winRate, rr) {
  const w = winRate / 100;
  return w * rr - (1 - w) * 1;
}

// Color: deep red → neutral gray → emerald green
function expectancyColor(e) {
  if (e > 0) {
    // green intensity
    const t = Math.min(e / 1.5, 1);
    const r = Math.round(0 + t * 0);
    const g = Math.round(40 + t * 165);
    const b = Math.round(30 + t * 65);
    return { bg: `rgba(${r},${g},${b},${0.25 + t * 0.55})`, text: t > 0.4 ? '#00E676' : '#4CAF50', border: `rgba(0,${140 + Math.round(t * 100)},${50 + Math.round(t * 50)},${0.3 + t * 0.4})` };
  } else if (e === 0) {
    return { bg: 'rgba(255,179,0,0.18)', text: '#FFB300', border: 'rgba(255,179,0,0.35)' };
  } else {
    const t = Math.min(Math.abs(e) / 1.2, 1);
    return { bg: `rgba(${Math.round(120 + t * 135)},${Math.round(30 - t * 10)},${Math.round(30 - t * 10)},${0.2 + t * 0.5})`, text: t > 0.5 ? '#FF5252' : '#EF9A9A', border: `rgba(${Math.round(180 + t * 75)},50,50,${0.25 + t * 0.35})` };
  }
}

const CARD_STYLES = [
  { color: '#FF5252', bg: 'rgba(255,82,82,0.08)', border: 'rgba(255,82,82,0.2)', icon: '⚠' },
  { color: '#4FC3F7', bg: 'rgba(79,195,247,0.08)', border: 'rgba(79,195,247,0.2)', icon: '⚡' },
  { color: '#00E676', bg: 'rgba(0,230,118,0.08)', border: 'rgba(0,230,118,0.2)', icon: '✓' },
];

export default function WinRateRRMatrixPage() {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const [winRate, setWinRate] = useState(50);
  const [rr, setRr] = useState(2.0);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const matrixRef = useRef(null);

  // Animate cells in on mount
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const winRateNum = useMemo(() => {
    const n = parseFloat(winRate);
    return isNaN(n) ? 50 : Math.min(99, Math.max(1, n));
  }, [winRate]);

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
          name: 'Win Rate vs R:R Matrix',
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
            { '@type': 'ListItem', position: 3, name: 'Win Rate vs R:R Matrix', item: PAGE_URL },
          ],
        },
      ],
    };
    let script = document.getElementById('matrix-jsonld');
    if (!script) { script = document.createElement('script'); script.id = 'matrix-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); };
  }, [t]);

  // GA4 tracking
  const tracked = useRef(false);
  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      window.gtag?.('event', 'win_rate_rr_matrix_viewed', { win_rate: winRateNum, rr });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const myExpectancy = useMemo(() => calcExpectancy(winRateNum, rr), [winRateNum, rr]);

  // Find closest cell indices for the marker
  const markerCol = useMemo(() => {
    let idx = 0, minD = Infinity;
    WIN_RATES.forEach((w, i) => { const d = Math.abs(w - winRateNum); if (d < minD) { minD = d; idx = i; } });
    return idx;
  }, [winRateNum]);
  const markerRow = useMemo(() => {
    let idx = 0, minD = Infinity;
    RR_VALUES.forEach((r, i) => { const d = Math.abs(r - rr); if (d < minD) { minD = d; idx = i; } });
    return idx;
  }, [rr]);

  const handleSlider = useCallback((setter) => (e) => {
    setter(parseFloat(e.target.value));
  }, []);

  const handleWinRateInput = useCallback((e) => {
    const val = e.target.value;
    if (val === '') { setWinRate(''); return; }
    const n = parseFloat(val);
    if (!isNaN(n)) setWinRate(Math.min(99, Math.max(1, n)));
  }, []);

  const myColor = expectancyColor(myExpectancy);
  const wrVal = parseFloat(winRate) || 50;
  const wrHint = wrVal < 35 ? t.wrHints[0] : wrVal < 50 ? t.wrHints[1] : wrVal < 65 ? t.wrHints[2] : t.wrHints[3];
  const rrHint = rr < 0.8 ? t.rrHints[0] : rr < 1.5 ? t.rrHints[1] : rr < 2.5 ? t.rrHints[2] : t.rrHints[3];

  return (
    <div className="min-h-screen bg-kmf-bg text-kmf-text-primary">
      <Navbar />

      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-10" style={{ animation: 'kmf-fadeIn 0.5s ease both' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
              </svg>
              {t.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Win Rate vs{' '}
              <span className="gradient-text">R:R Matrix</span>
            </h1>
            <p className="text-kmf-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.heroP}
            </p>
          </div>

          {/* Explainer box */}
          <div className="rounded-2xl p-5 mb-8"
            style={{ background: 'rgba(79,195,247,0.05)', border: '1px solid rgba(79,195,247,0.15)', animation: 'kmf-fadeIn 0.6s ease 0.1s both' }}>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ background: 'rgba(79,195,247,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#4FC3F7">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <div>
                <p className="text-kmf-text-secondary text-sm leading-relaxed">
                  <strong className="text-kmf-text-primary">{t.howToTitle}</strong> {t.howToBody}
                </p>
                <p className="text-kmf-text-tertiary text-xs mt-2">
                  {t.formula}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-2xl p-6 mb-8"
            style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(255,255,255,0.07)', animation: 'kmf-fadeIn 0.6s ease 0.15s both' }}>
            <p className="text-sm font-semibold text-kmf-text-secondary mb-5 uppercase tracking-wider">{t.yourStrategy}</p>
            <div className="grid sm:grid-cols-2 gap-8">

              {/* Win Rate slider + input */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-kmf-text-primary">{t.winRate}</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-lg overflow-hidden"
                      style={{ border: '1px solid rgba(79,195,247,0.3)', background: 'rgba(79,195,247,0.07)' }}>
                      <input
                        type="number"
                        min="1" max="99" step="1"
                        value={winRate}
                        onChange={handleWinRateInput}
                        onBlur={() => {
                          const n = parseFloat(winRate);
                          if (isNaN(n) || winRate === '') setWinRate(50);
                          else setWinRate(Math.min(99, Math.max(1, n)));
                        }}
                        className="w-14 text-center text-lg font-bold bg-transparent outline-none py-1 tabular-nums"
                        style={{ color: '#4FC3F7' }}
                        aria-label="Win rate percentage"
                      />
                      <span className="pr-2.5 text-sm font-semibold" style={{ color: '#4FC3F7' }}>%</span>
                    </div>
                  </div>
                </div>
                <input
                  type="range" min="1" max="99" step="1"
                  value={isNaN(parseFloat(winRate)) ? 50 : Math.min(99, Math.max(1, parseFloat(winRate)))}
                  onChange={handleSlider(setWinRate)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#4FC3F7', background: `linear-gradient(to right, #4FC3F7 ${((Math.min(99, Math.max(1, parseFloat(winRate) || 50))-1)/98)*100}%, rgba(79,195,247,0.15) 0%)` }}
                />
                <div className="flex justify-between text-xs text-kmf-text-tertiary mt-1.5">
                  <span>1%</span><span>50%</span><span>99%</span>
                </div>
                <p className="text-xs text-kmf-text-tertiary mt-2">
                  {wrHint}
                </p>
              </div>

              {/* R:R slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-kmf-text-primary">{t.avgRr}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold" style={{ color: '#4FC3F7' }}>1:{rr.toFixed(2)}</span>
                  </div>
                </div>
                <input
                  type="range" min="0.3" max="5.0" step="0.05"
                  value={rr}
                  onChange={handleSlider(setRr)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#4FC3F7', background: `linear-gradient(to right, #4FC3F7 ${((rr-0.3)/4.7)*100}%, rgba(79,195,247,0.15) 0%)` }}
                />
                <div className="flex justify-between text-xs text-kmf-text-tertiary mt-1.5">
                  <span>0.3</span><span>2.5</span><span>5.0</span>
                </div>
                <p className="text-xs text-kmf-text-tertiary mt-2">
                  {rrHint}
                </p>
              </div>
            </div>

            {/* Your result card */}
            <div className="mt-6 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: myExpectancy > 0 ? 'rgba(0,200,83,0.08)' : myExpectancy === 0 ? 'rgba(255,179,0,0.08)' : 'rgba(255,82,82,0.08)', border: `1px solid ${myColor.border}`, transition: 'all 0.3s ease' }}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: myColor.text }}>
                  {t.yourExpectancy}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tabular-nums" style={{ color: myColor.text }}>
                    {myExpectancy > 0 ? '+' : ''}{myExpectancy.toFixed(3)}R
                  </span>
                  <span className="text-sm text-kmf-text-tertiary">{t.perTrade}</span>
                </div>
              </div>
              <div className="text-sm text-kmf-text-secondary max-w-xs" style={{ color: myColor.text }}>
                {myExpectancy > 0.5
                  ? t.resStrong((myExpectancy * 1000).toFixed(0))
                  : myExpectancy > 0
                  ? t.resSlight((myExpectancy * 1000).toFixed(0))
                  : myExpectancy === 0
                  ? t.resBreak
                  : t.resLosing((Math.abs(myExpectancy) * 1000).toFixed(0))
                }
              </div>
            </div>
          </div>

          {/* Matrix */}
          <div className="rounded-2xl overflow-hidden mb-8"
            style={{ background: 'rgba(20,23,30,0.9)', border: '1px solid rgba(255,255,255,0.07)', animation: 'kmf-fadeIn 0.6s ease 0.2s both' }}
            ref={matrixRef}>

            {/* Legend */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-sm font-semibold text-kmf-text-primary">{t.heatmap}</p>
              <div className="flex items-center gap-4 text-xs text-kmf-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(220,50,50,0.6)' }}></span> {t.legendLosing}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(255,179,0,0.5)' }}></span> {t.legendBreak}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(0,180,80,0.6)' }}></span> {t.legendProfit}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div style={{ minWidth: 600, padding: '16px 12px 12px' }}>

                {/* Column headers (Win Rate) */}
                <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(13, 1fr)', gap: 3, marginBottom: 4 }}>
                  <div className="text-xs text-kmf-text-tertiary text-center flex items-end justify-center pb-1">
                    {t.axisLabel}
                  </div>
                  {WIN_RATES.map(w => (
                    <div key={w}
                      className="text-center text-xs font-semibold pb-1 rounded-t-md transition-colors"
                      style={{
                        color: Math.abs(w - winRateNum) < 3 ? '#4FC3F7' : 'rgba(143,179,197,0.7)',
                        background: Math.abs(w - winRateNum) < 3 ? 'rgba(79,195,247,0.08)' : 'transparent',
                      }}>
                      {w}%
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {RR_VALUES.map((rrRow, rowIdx) => (
                  <div key={rrRow} style={{ display: 'grid', gridTemplateColumns: '56px repeat(13, 1fr)', gap: 3, marginBottom: 3 }}>

                    {/* Row header (R:R) */}
                    <div className="flex items-center justify-end pr-2 text-xs font-semibold"
                      style={{
                        color: Math.abs(rrRow - rr) < 0.15 ? '#4FC3F7' : 'rgba(143,179,197,0.7)',
                      }}>
                      1:{rrRow}
                    </div>

                    {/* Cells */}
                    {WIN_RATES.map((wr, colIdx) => {
                      const e = calcExpectancy(wr, rrRow);
                      const colors = expectancyColor(e);
                      const isMarker = rowIdx === markerRow && colIdx === markerCol;
                      const isHovered = hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
                      const delay = revealed ? 0 : (rowIdx * WIN_RATES.length + colIdx) * 12;

                      return (
                        <div key={wr}
                          onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx, e, wr, rr: rrRow })}
                          onMouseLeave={() => setHoveredCell(null)}
                          style={{
                            background: colors.bg,
                            border: `1px solid ${isMarker ? '#4FC3F7' : isHovered ? colors.border : 'transparent'}`,
                            borderRadius: 6,
                            height: 38,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'default',
                            position: 'relative',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                            transform: isHovered ? 'scale(1.08)' : isMarker ? 'scale(1.04)' : 'scale(1)',
                            boxShadow: isMarker
                              ? `0 0 0 2px #4FC3F7, 0 0 16px rgba(79,195,247,0.4)`
                              : isHovered
                              ? `0 4px 16px rgba(0,0,0,0.4), 0 0 8px ${colors.border}`
                              : 'none',
                            zIndex: isMarker || isHovered ? 10 : 1,
                            animation: revealed ? 'none' : `kmf-cell-appear 0.3s ease ${delay}ms both`,
                          }}>
                          <span style={{ color: colors.text, fontWeight: 700, fontSize: 'clamp(8px, 1vw, 12px)', fontVariantNumeric: 'tabular-nums' }}>
                            {e > 0 ? '+' : ''}{e.toFixed(2)}R
                          </span>

                          {/* Marker dot */}
                          {isMarker && (
                            <div style={{
                              position: 'absolute',
                              top: -4,
                              right: -4,
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              background: '#4FC3F7',
                              border: '2px solid #0F1115',
                              animation: 'kmf-marker-pulse 1.8s ease-in-out infinite',
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Hover tooltip */}
            {hoveredCell && (
              <div className="mx-3 mb-3 rounded-xl px-4 py-3 flex flex-wrap gap-x-6 gap-y-1 items-center"
                style={{ background: 'rgba(30,33,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', animation: 'kmf-fadeIn 0.15s ease both' }}>
                <span className="text-xs text-kmf-text-tertiary">{t.tipWinRate} <strong className="text-kmf-text-primary">{hoveredCell.wr}%</strong></span>
                <span className="text-xs text-kmf-text-tertiary">{t.tipRr} <strong className="text-kmf-text-primary">1:{hoveredCell.rr}</strong></span>
                <span className="text-xs text-kmf-text-tertiary">{t.tipExpectancy} <strong style={{ color: expectancyColor(hoveredCell.e).text }}>{hoveredCell.e > 0 ? '+' : ''}{hoveredCell.e.toFixed(4)}R</strong></span>
                <span className="text-xs text-kmf-text-tertiary">{t.tipPer} <strong style={{ color: expectancyColor(hoveredCell.e).text }}>{hoveredCell.e > 0 ? '+' : ''}${(hoveredCell.e * 1000).toFixed(0)}</strong></span>
                <span className="text-xs ml-auto" style={{ color: expectancyColor(hoveredCell.e).text }}>
                  {hoveredCell.e > 0.5 ? t.edgeLabels.strong : hoveredCell.e > 0 ? t.edgeLabels.slight : hoveredCell.e === 0 ? t.edgeLabels.breakeven : hoveredCell.e > -0.5 ? t.edgeLabels.weak : t.edgeLabels.strongLose}
                </span>
              </div>
            )}
          </div>

          {/* Key insight cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10" style={{ animation: 'kmf-fadeIn 0.6s ease 0.3s both' }}>
            {t.cards.map((card, i) => (
              <div key={i} className="rounded-2xl p-5"
                style={{ background: CARD_STYLES[i].bg, border: `1px solid ${CARD_STYLES[i].border}` }}>
                <div className="text-2xl mb-3" style={{ color: CARD_STYLES[i].color }}>{CARD_STYLES[i].icon}</div>
                <h3 className="font-bold text-kmf-text-primary mb-2 text-sm">{card.title}</h3>
                <p className="text-kmf-text-secondary text-xs leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Educational content */}
          <div className="rounded-2xl p-6 sm:p-8 mb-10"
            style={{ background: 'rgba(26,29,36,0.6)', border: '1px solid rgba(255,255,255,0.07)', animation: 'kmf-fadeIn 0.6s ease 0.35s both' }}>
            <h2 className="text-xl font-bold text-kmf-text-primary mb-6">{t.eduTitle}</h2>

            <div className="space-y-5 text-kmf-text-secondary text-sm leading-relaxed">
              {t.eduP.map((p, i) => <p key={i}>{p}</p>)}
              <p className="text-kmf-text-tertiary text-xs">
                {t.eduNote}
              </p>
            </div>
          </div>

          {/* Cross-links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10" style={{ animation: 'kmf-fadeIn 0.6s ease 0.4s both' }}>
            <Link to="/tools/risk-of-ruin" className="group rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(79,195,247,0.12)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(79,195,247,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4FC3F7">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-kmf-text-primary text-sm group-hover:text-kmf-accent transition-colors">{t.linkRuinTitle}</p>
                <p className="text-xs text-kmf-text-tertiary mt-0.5">{t.linkRuinDesc}</p>
              </div>
            </Link>
            <Link to="/tools/lot-size-calculator" className="group rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(79,195,247,0.12)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(79,195,247,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4FC3F7">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm3-4H7v-2h8v2zm2-4H7V7h10v2z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-kmf-text-primary text-sm group-hover:text-kmf-accent transition-colors">{t.linkLotTitle}</p>
                <p className="text-xs text-kmf-text-tertiary mt-0.5">{t.linkLotDesc}</p>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center mb-10"
            style={{ background: 'linear-gradient(135deg, rgba(79,195,247,0.08) 0%, rgba(0,200,83,0.06) 100%)', border: '1px solid rgba(79,195,247,0.15)', animation: 'kmf-fadeIn 0.6s ease 0.45s both' }}>
            <p className="text-kmf-text-secondary text-sm mb-1">{t.ctaLine1}</p>
            <p className="text-kmf-text-primary font-semibold text-base mb-4">{t.ctaLine2}</p>
            <a href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #4FC3F7, #0288D1)', color: '#fff', boxShadow: '0 4px 20px rgba(79,195,247,0.3)' }}
              aria-label="Download K.M.F. Trading Journal on Google Play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.86l1.308.756c.884.512.884 1.791 0 2.303l-1.308.756-2.543-2.543 2.543-2.272zm-12.49-7.205L15.145 9.98l-2.302 2.302-8.635-8.64z"/>
              </svg>
              {t.ctaButton}
            </a>
          </div>

          {/* FAQ */}
          <div style={{ animation: 'kmf-fadeIn 0.6s ease 0.5s both' }}>
            <h2 className="text-xl font-bold text-kmf-text-primary mb-5">{t.faqHeading}</h2>
            <div className="space-y-3">
              {t.faq.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden"
                  style={{ background: 'rgba(26,29,36,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    aria-expanded={openFaq === i}>
                    <span className="font-medium text-kmf-text-primary text-sm pr-4">{item.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      className="flex-shrink-0 text-kmf-text-tertiary transition-transform"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}
                      strokeWidth="2" strokeLinecap="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-kmf-text-secondary text-sm leading-relaxed border-t"
                      style={{ borderColor: 'rgba(255,255,255,0.05)', animation: 'kmf-fadeIn 0.2s ease both' }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
