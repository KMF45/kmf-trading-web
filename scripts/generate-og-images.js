/**
 * Generate OG images (1200x630) for each blog article.
 * Uses @napi-rs/canvas for zero-system-dependency image generation.
 *
 * Run: node scripts/generate-og-images.js
 */

import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'blog', 'og');

const articles = [
  { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate:\nWhich Metric Actually\nPredicts Trading Success?', category: 'Statistics', color: '#4FC3F7' },
  { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule:\nThe Trading Rule That Keeps\nProfessional Traders Alive', category: 'Risk Management', color: '#00C853' },
  { slug: 'revenge-trading', title: 'Revenge Trading:\nWhat It Is, Why It Happens,\nand How to Break the Cycle', category: 'Psychology', color: '#CE93D8' },
  { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly\nTrading Review\n(With a Complete Template)', category: 'Improvement', color: '#FFB300' },
  { slug: 'r-multiple-explained', title: 'R-Multiple Explained:\nHow to Measure Trade Quality\n(Not Just Profit)', category: 'Statistics', color: '#4FC3F7' },
  { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own\nTrading Rules —\nAnd How to Stop', category: 'Psychology', color: '#CE93D8' },
  { slug: 'how-to-recover-from-losing-streak', title: 'How to Recover from\na Losing Streak Without\nBlowing Your Account', category: 'Psychology', color: '#CE93D8' },
  { slug: '10-questions-after-every-trade', title: '10 Questions Every Trader\nShould Ask After\nEvery Trade', category: 'Improvement', color: '#FFB300' },
  { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained:\nThe Formula That Tells\nIf Your Strategy Works', category: 'Statistics', color: '#4FC3F7' },
  { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss\nProperly\n(Not Just Randomly)', category: 'Risk Management', color: '#00C853' },
  { slug: 'position-sizing-guide', title: 'Position Sizing Guide:\nHow Much Should\nYou Trade?', category: 'Risk Management', color: '#00C853' },
  { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist:\n10 Things to Verify\nBefore Every Trade Entry', category: 'Discipline', color: '#FFB300' },
  { slug: 'best-free-trading-journal-app-android-2026', title: 'Best Free Trading Journal\nApp for Android\nin 2026', category: 'App Reviews', color: '#4FC3F7' },
  { slug: 'execution-gap-backtest-vs-live-trading', title: 'The Execution Gap:\nWhy Your Strategy Works\nin Backtesting But Fails Live', category: 'Psychology', color: '#CE93D8' },
  { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers:\nHow a Trading Journal\nSaves Your Funded Account', category: 'Risk Management', color: '#00C853' },
  { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins:\nWhy the Trade You\'re Proud of\nMight Be Your Worst', category: 'Improvement', color: '#FFB300' },
  { slug: 'ghost-trades-journaling-missed-opportunities', title: 'Ghost Trades:\nWhy the Trades You Don\'t Take\nCost You More Than Losses', category: 'Psychology', color: '#CE93D8' },
  { slug: 'crypto-vs-forex-journaling', title: 'Crypto vs Forex:\nWhy Your Trading Journal\nNeeds Different Rules', category: 'Risk Management', color: '#00C853' },
  { slug: 'tradingview-kmf-workflow', title: 'TradingView + K.M.F.:\nThe Complete Trade\nJournaling Workflow', category: 'Improvement', color: '#FFB300' },
  { slug: 'excel-vs-trading-journal-app', title: 'Excel vs Trading Journal App:\nWhy Spreadsheets Are\nKilling Your Progress', category: 'Improvement', color: '#FFB300' },
  { slug: 'prop-firm-daily-drawdown-guide', title: 'Prop Firm Daily Drawdown:\nThe Complete Guide\nto Not Getting Cut', category: 'Risk Management', color: '#00C853' },
  { slug: 'strategy-is-not-enough', title: 'Strategy Is Not Enough:\nWhy Execution Separates\nWinners from Losers', category: 'Psychology', color: '#CE93D8' },
  { slug: 'why-traders-fail-at-journaling', title: 'Why Traders Fail\nat Journaling —\nAnd How to Actually Stick', category: 'Improvement', color: '#FFB300' },
  { slug: 'overtrading-checklist', title: 'The Overtrading Checklist:\nAre You Trading Too Much\nWithout Realizing It?', category: 'Discipline', color: '#FFB300' },
  { slug: 'tilt-recovery-protocol', title: 'Tilt Recovery Protocol:\nHow to Reset Your Mind\nAfter a Bad Trade', category: 'Psychology', color: '#CE93D8' },
  { slug: 'worst-trading-excuses', title: 'The Worst Trading Excuses:\nLies Traders Tell\nThemselves Every Day', category: 'Psychology', color: '#CE93D8' },
  { slug: 'ai-trade-review', title: 'AI Trade Review:\nHow Artificial Intelligence\nCan Analyze Your Trades', category: 'Statistics', color: '#4FC3F7' },
  { slug: 'monday-effect-trading', title: 'The Monday Effect:\nIs Monday Really\nthe Worst Day to Trade?', category: 'Statistics', color: '#4FC3F7' },
  { slug: 'confidence-vs-overconfidence', title: 'Confidence vs Overconfidence:\nThe Fine Line That\nDestroys Trading Accounts', category: 'Psychology', color: '#CE93D8' },
  { slug: 'weekend-gap-risk', title: 'Weekend Gap Risk:\nHow to Protect Your\nPositions Over the Weekend', category: 'Risk Management', color: '#00C853' },
  { slug: 'scaling-in-vs-scaling-out', title: 'Scaling In vs Scaling Out:\nWhich Position Management\nStrategy Works Better?', category: 'Risk Management', color: '#00C853' },
  { slug: 'market-order-vs-limit-order', title: 'Market Order vs Limit Order:\nThe Hidden Cost That\nQuietly Drains Your Account', category: 'Risk Management', color: '#00C853' },
  { slug: 'analysis-paralysis-trading', title: 'Analysis Paralysis:\nWhy You Can\'t\nPull the Trigger', category: 'Psychology', color: '#CE93D8' },
  { slug: 'what-is-kmf-trading-journal', title: 'What Is K.M.F.\nTrading Journal?\nEverything You Need to Know', category: 'App Reviews', color: '#4FC3F7' },
  { slug: 'static-vs-trailing-drawdown', title: 'Static vs Trailing Drawdown:\nThe Prop Firm Rule That\nKills Most Funded Accounts', category: 'Risk Management', color: '#00C853' },
  { slug: 'revenge-trading-kill-switch', title: 'The Revenge Trading\nKill Switch:\n5 Rules to Stop the Bleed', category: 'Psychology', color: '#CE93D8' },
  { slug: 'metatrader-pre-trade-checklist', title: 'MetaTrader Pre-Trade\nChecklist: 5 Things to Check\nBefore Every MT4/MT5 Trade', category: 'Discipline', color: '#FFB300' },
  { slug: 'breakeven-stop-too-early', title: 'The $0.01 Gap:\nWhy You Move Your Stop\nto Breakeven Too Early', category: 'Psychology', color: '#CE93D8' },
  { slug: 'scared-money-prop-firm', title: 'Trading with Scared Money:\nWhy Your 100k Prop Account\nFeels Like a Burden', category: 'Psychology', color: '#CE93D8' },
  { slug: 'lotto-ticket-syndrome', title: 'The Lotto Ticket Syndrome:\nWhy You Increase Risk\nAfter a Big Win', category: 'Psychology', color: '#CE93D8' },
  { slug: 'prospect-theory-trading', title: 'Why You Close Winners\nToo Early and Let\nYour Losers Run', category: 'Psychology', color: '#CE93D8' },
  { slug: 'is-100-enough-to-start-forex', title: 'Is $100 Enough\nto Trade Forex?\nThe Brutal Truth', category: 'Risk Management', color: '#00C853' },
  { slug: 'trading-vs-gambling', title: 'When Trading Becomes\nGambling\n(And How to Avoid It)', category: 'Psychology', color: '#CE93D8' },
  { slug: 'ro-what-is-kmf-trading-journal', title: 'Ce este K.M.F.\nTrading Journal?\nAplicatia construita de traderi', category: 'Recenzii Aplicatii', color: '#4FC3F7' },
  { slug: 'ro-trading-vs-gambling', title: 'Cand Trading-ul\nDevine Gambling\n(Si Cum Sa Eviti)', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-analysis-paralysis-trading', title: 'Analysis Paralysis:\nDe Ce Nu Poti\nApasa pe Tragaci', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-is-100-enough-to-start-forex', title: 'Sunt $100 de Ajuns\nca Sa Tranzactionezi\nForex?', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-revenge-trading', title: 'Revenge Trading:\nCe Este, De Ce Apare\nsi Cum Rupi Ciclul', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-trading-expectancy-explained', title: 'Trading Expectancy:\nFormula Care Iti Spune\nDaca Strategia Merge', category: 'Statistici', color: '#4FC3F7' },
  { slug: 'ro-1-percent-risk-rule', title: 'Regula de 1% Risc:\nRegula Care Tine Traderii\nProfesionisti in Viata', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-how-to-recover-from-losing-streak', title: 'Cum Iti Revii\nDintr-o Serie de Pierderi\nFara Sa-ti Distrugi Contul', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate:\nCare Metrica Prezice\nSuccesul in Trading?', category: 'Statistici', color: '#4FC3F7' },
  { slug: 'ro-position-sizing-guide', title: 'Position Sizing:\nCat de Mult Ar Trebui\nSa Tranzactionezi?', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-how-to-set-stop-loss', title: 'Cum Sa Setezi Corect\nun Stop Loss\n(Nu la Intamplare)', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-r-multiple-explained', title: 'R-Multiple Explicat:\nCum Masori Calitatea\nunui Trade', category: 'Statistici', color: '#4FC3F7' },
  { slug: 'ro-crypto-vs-forex-journaling', title: 'Crypto vs Forex:\nReguli Diferite\npentru Fiecare Piata', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-why-traders-break-their-rules', title: 'De Ce Iti Incalci\nPropriile Reguli\nde Trading', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-good-loss-vs-bad-win', title: 'Pierderi Bune, Castiguri\nProaste: De Ce Cel Mai Bun\nTrade Poate Fi Cel Mai Prost', category: 'Progres', color: '#FFB300' },
  { slug: 'ro-weekend-gap-risk', title: 'Riscul de Gap in Weekend:\nCum Iti Protejezi Pozitiile\nde Surpriza de Luni', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-pre-trade-checklist', title: 'Pre-Trade Checklist:\n10 Lucruri de Verificat\nInainte de Fiecare Intrare', category: 'Disciplina', color: '#FFB300' },
  { slug: 'ro-10-questions-after-every-trade', title: '10 Intrebari de Pus\nDupa Fiecare Trade', category: 'Progres', color: '#FFB300' },
  { slug: 'ro-weekly-trading-review-template', title: 'Cum Faci un Review\nSaptamanal de Trading\n(Cu Template Complet)', category: 'Progres', color: '#FFB300' },
  { slug: 'ro-execution-gap-backtest-vs-live-trading', title: 'Execution Gap:\nDe Ce Strategia Merge in Backtest\nDar Esueaza Live', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-ghost-trades-journaling-missed-opportunities', title: 'Ghost Trades:\nDe Ce Trade-urile Pe Care Le Sari\nTe Costa Mai Mult', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-prospect-theory-trading', title: 'De Ce Iti Inchizi Castigatorii\nPrea Devreme si Iti Lasi\nPierzatorii Sa Curga', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-confidence-vs-overconfidence', title: 'Incredere vs Supraincredere:\nLinia Care Separa Castigatorii\nde Conturile Distruse', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-tilt-recovery-protocol', title: 'Protocol de Recuperare din Tilt:\nCe Fac Traderii de Top\nin Primele 60 de Minute', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-lotto-ticket-syndrome', title: 'Sindromul Biletului de Loto:\nDe Ce Iti Maresti Riscul\nDupa un Castig Mare', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-breakeven-stop-too-early', title: 'Gap-ul de $0.01:\nDe Ce Iti Muti Stop-ul\nla Breakeven Prea Devreme', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-excel-vs-trading-journal-app', title: 'De Ce Excel Iti Omoara\nIncet Performanta\nde Trading', category: 'Progres', color: '#FFB300' },
  { slug: 'ro-ai-trade-review', title: 'Cum Folosesti AI pentru\nReview-ul Trade-urilor\n(Fara Sa Pierzi Controlul)', category: 'Progres', color: '#FFB300' },
  { slug: 'ro-tradingview-kmf-workflow', title: 'TradingView + K.M.F.:\nWorkflow-ul Perfect pentru\nun Trader Modern', category: 'Progres', color: '#FFB300' },
  { slug: 'ro-strategy-is-not-enough', title: 'Mitul Strategiei Perfecte:\nDe Ce Acelasi Setup Face Unul\nBogat si Pe Altul Falit', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-why-traders-fail-at-journaling', title: 'De Ce 90% Dintre Traderi\nEsueaza la Jurnalizare\n(Si Cum Sa Fii in Cei 10%)', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-overtrading-checklist', title: 'Checklist de Overtrading:\n8 Semne Ca Esti pe Tilt\nFara Sa-ti Dai Seama', category: 'Disciplina', color: '#FFB300' },
  { slug: 'ro-revenge-trading-kill-switch', title: 'Kill Switch pentru\nRevenge Trading:\nProtocolul in 5 Reguli', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-market-order-vs-limit-order', title: 'Market Order vs Limit Order:\nCostul Ascuns Care\nIti Goleste Contul', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-scaling-in-vs-scaling-out', title: 'Scaling In vs Scaling Out:\nCare Metoda Distruge\nMai Putine Conturi?', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-monday-effect-trading', title: 'Efectul de Luni:\nDe Ce Luni E Cea Mai Proasta\nZi Sa Tranzactionezi Agresiv', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-worst-trading-excuses', title: 'Cele 7 Cele Mai Proaste\nScuze Pe Care Si Le Spun\nTraderii', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-metatrader-pre-trade-checklist', title: 'Pre-Trade Checklist pentru\nMetaTrader si cTrader:\n5 Reguli Care Chiar Raman', category: 'Disciplina', color: '#FFB300' },
  { slug: 'ro-static-vs-trailing-drawdown', title: 'Static vs Trailing Drawdown:\nRegula Prop Firm Care Omoara\nConturile Finantate', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-prop-firm-trading-journal', title: 'Ucigasii de Conturi Prop Firm:\nCum un Jurnal Iti Salveaza\nContul Finantat', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-prop-firm-daily-drawdown-guide', title: 'Daily Drawdown la Prop Firm:\nSistemul in 5 Reguli\nca sa Nu-l Mai Incalci', category: 'Managementul Riscului', color: '#00C853' },
  { slug: 'ro-scared-money-prop-firm', title: 'Trading cu Scared Money:\nDe Ce Contul Prop de 100k\nSe Simte ca o Povara', category: 'Psihologie', color: '#CE93D8' },
  { slug: 'ro-best-free-trading-journal-app-android-2026', title: 'Cea Mai Buna Aplicatie\nGratuita de Trading Journal\npentru Android in 2026', category: 'Recenzii Aplicatii', color: '#4FC3F7' },
  { slug: 'de-profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate:\nWelche Kennzahl sagt den\nTrading-Erfolg wirklich voraus?', category: 'Statistik', color: '#4FC3F7' },
  { slug: 'de-market-order-vs-limit-order', title: 'Market Order vs Limit Order:\nDie versteckten Kosten, die\ndein Konto leer saugen', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-scaling-in-vs-scaling-out', title: 'Scaling In vs Scaling Out:\nWelche Methode des Positions-\nmanagements ist besser?', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-1-percent-risk-rule', title: 'Die 1-%-Risikoregel:\nDie Regel, die Profi-Trader\nam Leben haelt', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-position-sizing-guide', title: 'Positionsgroessen-Leitfaden:\nWie viel solltest\ndu traden?', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-trading-expectancy-explained', title: 'Trading-Erwartungswert:\nDie Formel, die zeigt, ob\ndeine Strategie funktioniert', category: 'Statistik', color: '#4FC3F7' },
  { slug: 'de-revenge-trading', title: 'Revenge Trading:\nWas es ist, warum es passiert\nund wie du es stoppst', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-why-traders-break-their-rules', title: 'Warum du deine eigenen\nTrading-Regeln brichst —\nund wie du aufhoerst', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-how-to-recover-from-losing-streak', title: 'Wie du dich von einer\nVerlustserie erholst, ohne\ndein Konto zu sprengen', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-r-multiple-explained', title: 'R-Vielfaches erklaert:\nWie du Trade-Qualitaet misst\n(nicht nur Gewinn)', category: 'Statistik', color: '#4FC3F7' },
  { slug: 'de-how-to-set-stop-loss', title: 'Wie man einen Stop Loss\nrichtig setzt\n(nicht einfach willkuerlich)', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-pre-trade-checklist', title: 'Die Pre-Trade-Checkliste:\n10 Dinge vor jedem\nEinstieg pruefen', category: 'Disziplin', color: '#FFB300' },
  { slug: 'de-prospect-theory-trading', title: 'Warum du Gewinner zu frueh\nschliesst und Verlierer\nlaufen laesst', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-good-loss-vs-bad-win', title: 'Gute Verluste, schlechte\nGewinne: Warum dein bester\nTrade dein schlechtester ist', category: 'Verbesserung', color: '#FFB300' },
  { slug: 'de-crypto-vs-forex-journaling', title: 'Krypto vs Forex: Warum dein\nJournal fuer jeden Markt\nandere Regeln braucht', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-what-is-kmf-trading-journal', title: 'Was ist K.M.F.\nTrading Journal? Die App\nvon Tradern gebaut', category: 'App-Tests', color: '#4FC3F7' },
  { slug: 'de-trading-vs-gambling', title: 'Wann Trading zu\nGluecksspiel wird\n(und wie du es vermeidest)', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-analysis-paralysis-trading', title: 'Analyse-Paralyse:\nWarum du nicht\nabdruecken kannst', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-weekly-trading-review-template', title: 'Woechentliches Trading-Review:\nDie 15-Minuten-Routine, die\ndeine Verbesserung verzehnfacht', category: 'Verbesserung', color: '#FFB300' },
  { slug: 'de-execution-gap-backtest-vs-live-trading', title: 'Die Ausfuehrungsluecke:\nWarum deine Strategie im Backtest\nfunktioniert, aber live scheitert', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-confidence-vs-overconfidence', title: 'Selbstvertrauen vs\nSelbstueberschaetzung: Die Linie,\ndie Gewinner von Sprengungen trennt', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-ghost-trades-journaling-missed-opportunities', title: 'Ghost Trades: Warum die Trades,\ndie du nicht nimmst, mehr kosten\nals die, die du verlierst', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-breakeven-stop-too-early', title: 'Die $0,01-Luecke:\nWarum du deinen Stop zu frueh\nauf Break-even ziehst', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-revenge-trading-kill-switch', title: 'Der Revenge-Trading-Kill-Switch:\nDas 5-Regeln-Protokoll, das\ndie Spirale stoppt', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-tilt-recovery-protocol', title: 'Tilt-Recovery-Protokoll:\nWas Top-Trader in den ersten\n60 Minuten nach einem Verlust tun', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-overtrading-checklist', title: 'Overtrading-Checkliste:\n8 Anzeichen, dass du auf Tilt\nbist, ohne es zu merken', category: 'Disziplin', color: '#FFB300' },
  { slug: 'de-lotto-ticket-syndrome', title: 'Das Lotto-Ticket-Syndrom:\nWarum du nach einem grossen\nGewinn das Risiko erhoehst', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-prop-firm-trading-journal', title: 'Prop-Firm-Killer:\nWie ein Trading-Journal\ndein Funded-Konto rettet', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-static-vs-trailing-drawdown', title: 'Static vs Trailing Drawdown:\nDie Prop-Firm-Regel, die\nFunded-Konten toetet', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-prop-firm-daily-drawdown-guide', title: 'Prop-Firm-Daily-Drawdown:\nEin 5-Regel-System, um sie\nnie wieder zu brechen', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-why-traders-fail-at-journaling', title: 'Warum 90 % der Trader\nam Journaling scheitern\n(und wie du dazugehoerst)', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-excel-vs-trading-journal-app', title: 'Warum Excel deine\nTrading-Performance\nlangsam ruiniert', category: 'Verbesserung', color: '#FFB300' },
  { slug: 'de-ai-trade-review', title: 'Wie du KI fuers\nTrade-Review nutzt\n(ohne Kontrollverlust)', category: 'Verbesserung', color: '#FFB300' },
  { slug: 'de-10-questions-after-every-trade', title: '10 Fragen, die du dir\nnach jedem Trade\nstellen solltest', category: 'Verbesserung', color: '#FFB300' },
  { slug: 'de-strategy-is-not-enough', title: 'Der Mythos der perfekten\nStrategie: Warum 80 % nichts\nmit Strategie zu tun haben', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-tradingview-kmf-workflow', title: 'TradingView + K.M.F.:\nDer perfekte Workflow\nfuer moderne Trader', category: 'Verbesserung', color: '#FFB300' },
  { slug: 'de-is-100-enough-to-start-forex', title: 'Reichen 100 $, um\nForex zu traden?\nDie brutale Wahrheit', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-weekend-gap-risk', title: 'Weekend-Gap-Risiko:\nWie du dein Konto vor\nMontags Ueberraschung schuetzt', category: 'Risikomanagement', color: '#00C853' },
  { slug: 'de-monday-effect-trading', title: 'Der Montags-Effekt:\nWarum Montag der schlechteste\nTag zum aggressiven Traden ist', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-worst-trading-excuses', title: 'Die 7 schlimmsten Ausreden,\ndie Trader sich erzaehlen\n(und wie dein Journal sie entlarvt)', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-metatrader-pre-trade-checklist', title: 'MetaTrader-Checkliste:\n5 Regeln vor jedem\nEinstieg, die wirklich haften', category: 'Disziplin', color: '#FFB300' },
  { slug: 'de-scared-money-prop-firm', title: 'Scared Money: Warum sich\ndein 100k-Prop-Konto\nwie eine Last anfuehlt', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'de-best-free-trading-journal-app-android-2026', title: 'Die beste kostenlose\nTrading-Journal-App\nfuer Android 2026', category: 'App-Reviews', color: '#4FC3F7' },
  // French
  { slug: 'fr-what-is-kmf-trading-journal', title: 'Qu\'est-ce que K.M.F.\nTrading Journal ? L\'app\nconstruite par des traders', category: 'Avis Applications', color: '#4FC3F7' },
  { slug: 'fr-excel-vs-trading-journal-app', title: 'Pourquoi Excel tue\nlentement ta performance\nde trading', category: 'Amelioration', color: '#FFB300' },
  { slug: 'fr-tradingview-kmf-workflow', title: 'TradingView + K.M.F. :\nle workflow parfait\ndu trader moderne', category: 'Amelioration', color: '#FFB300' },
  { slug: 'fr-revenge-trading', title: 'Le revenge trading :\nle tueur de comptes n1\net comment l\'arreter', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-trading-vs-gambling', title: 'Quand le trading\ndevient un pari\n(et comment l\'eviter)', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-analysis-paralysis-trading', title: 'Paralysie d\'analyse :\npourquoi tu n\'arrives pas\na appuyer sur la gachette', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-1-percent-risk-rule', title: 'La regle des 1 % :\nce qui garde les pros\nen vie', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-position-sizing-guide', title: 'Dimensionnement :\ncombien dois-tu\ntrader ?', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate :\nquelle metrique predit\nvraiment le succes ?', category: 'Statistiques', color: '#4FC3F7' },
  { slug: 'fr-trading-expectancy-explained', title: 'L\'esperance en trading :\nla formule qui dit si\nta strategie fonctionne', category: 'Statistiques', color: '#4FC3F7' },
  { slug: 'fr-r-multiple-explained', title: 'Le R-multiple explique :\nmesurer la qualite d\'un trade\n(pas juste le profit)', category: 'Statistiques', color: '#4FC3F7' },
  { slug: 'fr-how-to-set-stop-loss', title: 'Comment placer un\nstop loss correctement\n(pas au hasard)', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-good-loss-vs-bad-win', title: 'Bonnes pertes, mauvais gains :\npourquoi le trade dont tu es\nfier est peut-etre le pire', category: 'Amelioration', color: '#FFB300' },
  { slug: 'fr-why-traders-fail-at-journaling', title: 'Pourquoi 90 % des traders\nechouent a tenir un journal\n(et comment etre dans les 10 %)', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-confidence-vs-overconfidence', title: 'Confiance vs surconfiance :\nla ligne invisible qui separe\nles gagnants des comptes crames', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-ghost-trades-journaling-missed-opportunities', title: 'Ghost trades : pourquoi les\ntrades que tu ne prends pas\ncoutent plus que tes pertes', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-why-traders-break-their-rules', title: 'Pourquoi tu enfreins tes\npropres regles de trading\n(et comment arreter)', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-how-to-recover-from-losing-streak', title: 'Comment se remettre\nd\'une serie de pertes\nsans cramer ton compte', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-prop-firm-trading-journal', title: 'Tueurs de prop firms :\ncomment un journal sauve\nton compte funded', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-static-vs-trailing-drawdown', title: 'Static vs trailing drawdown :\nla regle prop firm qui tue\nles comptes funded', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-prop-firm-daily-drawdown-guide', title: 'Daily drawdown : un systeme\nen 5 regles pour ne plus\njamais le depasser', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-revenge-trading-kill-switch', title: 'Le kill switch anti-revenge :\nle protocole en 5 regles\nqui stoppe la spirale', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-tilt-recovery-protocol', title: 'Recuperation du tilt :\nles 60 premieres minutes\napres une grosse perte', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-overtrading-checklist', title: 'Overtrading : 8 signes\nque tu es en tilt\nsans t\'en rendre compte', category: 'Discipline', color: '#FFB300' },
  { slug: 'fr-execution-gap-backtest-vs-live-trading', title: 'L\'ecart d\'execution :\npourquoi ta strategie marche\nen backtest mais echoue en reel', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-10-questions-after-every-trade', title: '10 questions que chaque\ntrader devrait se poser\napres chaque trade', category: 'Amelioration', color: '#FFB300' },
  { slug: 'fr-weekly-trading-review-template', title: 'Revue de trading hebdo :\nla routine de 15 min qui\ndecuple ta progression', category: 'Amelioration', color: '#FFB300' },
  { slug: 'fr-prospect-theory-trading', title: 'Pourquoi tu clotures tes\ngagnants trop tot et laisses\ncourir tes perdants', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-lotto-ticket-syndrome', title: 'Le syndrome du ticket de loto :\npourquoi tu augmentes ton\nrisque apres un gros gain', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-breakeven-stop-too-early', title: 'Pourquoi tu deplaces ton\nstop au breakeven trop tot\n(et detruis ton esperance)', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-pre-trade-checklist', title: 'La checklist pre-trade :\n10 choses a verifier\navant chaque entree', category: 'Discipline', color: '#FFB300' },
  { slug: 'fr-scaling-in-vs-scaling-out', title: 'Scaling in vs scaling out :\nquelle methode detruit\nle moins de comptes ?', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-strategy-is-not-enough', title: 'Le mythe de la strategie\nparfaite : pourquoi 80 % n\'a\nrien a voir avec la strategie', category: 'Psychologie', color: '#CE93D8' },
  { slug: 'fr-ai-trade-review', title: 'Comment utiliser l\'IA\npour la revue de tes trades\n(sans perdre le controle)', category: 'Amelioration', color: '#FFB300' },
  { slug: 'fr-crypto-vs-forex-journaling', title: 'Crypto vs forex : pourquoi\nton journal a besoin de regles\ndifferentes pour chaque marche', category: 'Gestion du risque', color: '#00C853' },
  { slug: 'fr-market-order-vs-limit-order', title: 'Ordre au marche vs ordre limite :\nle cout cache qui vide\ndiscretement ton compte', category: 'Gestion du risque', color: '#00C853' },
];

// Tools OG images (output to /public/tools/og/)
const toolsOutDir = join(__dirname, '..', 'public', 'tools', 'og');
const tools = [
  { slug: 'lot-size-calculator', title: 'Free Lot Size Calculator\n340+ Instruments\nReal-Time Exchange Rates', category: 'Trading Tool', color: '#4FC3F7' },
  { slug: 'risk-of-ruin', title: 'Risk of Ruin Calculator\nMonte Carlo Simulation\nKnow Before You Blow', category: 'Trading Tool', color: '#FF5252' },
  { slug: 'win-rate-rr-matrix', title: 'Win Rate vs R:R Matrix\nFind Your Profitable Zone\nInstant Expectancy Heatmap', category: 'Trading Tool', color: '#00C853' },
  { slug: 'compound-calculator', title: 'KMF Compound Vision\nTrading Compound Growth\nVisualize Your Equity Curve', category: 'Trading Tool', color: '#FFB300' },
  { slug: 'pre-trade-checklist', title: 'Pre-Trade Checklist\nBuilder\nPersonalized for Your Strategy', category: 'Trading Tool', color: '#4FC3F7' },
];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function generate(article, outDir = OUT_DIR) {
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F1115';
  ctx.fillRect(0, 0, W, H);

  // Accent bar (left side)
  const [r, g, b] = hexToRgb(article.color);
  ctx.fillStyle = article.color;
  ctx.fillRect(0, 0, 6, H);

  // Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.06)`);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Category badge
  ctx.fillStyle = `rgba(${r},${g},${b},0.15)`;
  const catText = article.category.toUpperCase();
  ctx.font = 'bold 16px sans-serif';
  const catWidth = ctx.measureText(catText).width + 24;
  const catX = 60, catY = 60;
  ctx.beginPath();
  ctx.roundRect(catX, catY, catWidth, 32, 16);
  ctx.fill();
  ctx.fillStyle = article.color;
  ctx.fillText(catText, catX + 12, catY + 22);

  // Title text
  ctx.fillStyle = '#E8EAED';
  ctx.font = 'bold 48px sans-serif';
  const lines = article.title.split('\n');
  let y = 150;
  for (const line of lines) {
    ctx.fillText(line, 60, y);
    y += 62;
  }

  // Bottom branding
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, H - 70, W, 1);
  ctx.fillStyle = '#9AA0A6';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('K.M.F. Trading Journal', 60, H - 28);
  ctx.fillStyle = '#6B7280';
  ctx.font = '16px sans-serif';
  ctx.fillText('kmfjournal.com', W - 60 - ctx.measureText('kmfjournal.com').width, H - 28);

  const buf = canvas.toBuffer('image/png');
  const outPath = join(outDir, `${article.slug}.png`);
  writeFileSync(outPath, buf);
  console.log(`  ✓ ${article.slug}.png`);
}

mkdirSync(OUT_DIR, { recursive: true });
console.log('Generating OG images...');
for (const article of articles) {
  generate(article, OUT_DIR);
}
console.log(`Done — ${articles.length} blog images in public/blog/og/`);

mkdirSync(toolsOutDir, { recursive: true });
for (const tool of tools) {
  generate(tool, toolsOutDir);
}
console.log(`Done — ${tools.length} tool images in public/tools/og/`);
