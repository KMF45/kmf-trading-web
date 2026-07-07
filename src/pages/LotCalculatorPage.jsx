import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { calculateLotSize } from '../utils/calculations';
import { CATEGORIES, ALL_INSTRUMENTS, CUSTOM_INSTRUMENT } from '../data/instruments';
import { useLanguage } from '../i18n/LanguageContext';

const LEVERAGE_OPTIONS = [1, 2, 5, 10, 20, 25, 30, 50, 100, 200, 300, 400, 500];
const ACCOUNT_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD'];
const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CHF: 'CHF ', AUD: 'A$', CAD: 'C$', NZD: 'NZ$' };

const OG_IMAGE = 'https://kmfjournal.com/tools/og/lot-size-calculator.png';
const PAGE_URL = 'https://kmfjournal.com/tools/lot-size-calculator';

const TAB_KEYS = ['all', 'favorites', 'forex-majors', 'forex-crosses', 'forex-exotics', 'crypto', 'metals', 'indices', 'energy', 'stocks', 'agriculture', 'bonds', 'etfs'];

const T = {
  en: {
    pageTitle: 'Free Lot Size Calculator — Forex, Crypto, Stocks, Indices | K.M.F.',
    pageDesc: 'Calculate the perfect lot size for any trade. 340+ instruments, real-time exchange rates, risk management built in. Free, no signup required.',
    ogAlt: 'Free Lot Size Calculator — 340+ Instruments',
    home: 'Home', tools: 'Tools', breadcrumbTool: 'Lot Size Calculator',
    heroP: <>Calculate the exact position size for any trade across <strong className="text-kmf-text-primary">340+ instruments</strong>. Forex, crypto, stocks, indices, commodities — with real-time exchange rates.</>,
    accountBalance: 'Account Balance', currency: 'Currency', instrument: 'Instrument',
    preset: 'Preset', custom: 'Custom', contractSize: 'Contract Size', pipSize: 'Pip Size', quoteCcy: 'Quote Ccy',
    entryPrice: 'Entry Price', stopLoss: 'Stop Loss', takeProfit: 'Take Profit', leverage: 'Leverage',
    selectInstrument: 'Select instrument...',
    ratesLive: 'Live exchange rates (cached 1h)', ratesLoading: 'Loading exchange rates...',
    emptyPrompt: 'Enter entry price and stop loss to calculate',
    positionSize: 'Position Size', standardLotsSub: 'standard lots',
    risking: 'Risking', toMake: 'to make',
    standard: 'Standard', mini: 'Mini', micro: 'Micro', lots: 'lots',
    riskAmount: 'Risk Amount', marginRequired: 'Margin Required', pipValue: 'Pip Value', slDistance: 'SL Distance',
    tpDistance: 'TP Distance', rrRatio: 'R:R Ratio', potentialWin: 'Potential Win',
    balanceAfterLoss: 'Balance After Loss', balanceAfterWin: 'Balance After Win',
    copyResults: 'Copy Results', reset: 'Reset',
    wantMobile: 'Want this on mobile?', freeOnPlay: 'Free on Google Play', download: 'Download',
    disclaimer: 'This calculator is provided for informational and educational purposes only. It does not constitute financial advice. Always verify position sizes and risk parameters with your broker before placing any trade.',
    eduTitle: 'How to Use the Lot Size Calculator',
    eduP1: <>Position sizing is the <strong className="text-kmf-text-primary">single most important risk management skill</strong> in trading. A perfect entry with wrong lot size can blow your account. A mediocre entry with correct lot size keeps you in the game.</>,
    formulaTitle: 'The Formula',
    formula: 'Lot Size = Risk Amount ÷ (Stop Loss Pips × Pip Value per Lot)',
    eduP2: <>Where <strong className="text-kmf-text-primary">Risk Amount</strong> = Account Balance × Risk Percentage. If you have a $10,000 account and risk 1%, your risk amount is $100.</>,
    truncTitle: 'Why Truncation, Not Rounding?',
    eduP3: <>This calculator uses <strong className="text-kmf-text-primary">truncation (floor)</strong> instead of rounding. If the math says 0.837 lots, we output 0.83 — not 0.84. Rounding up would mean risking <em>more</em> than your intended percentage. Professional risk management always errs on the side of caution.</>,
    ruleTitle: 'The 1% Rule',
    eduP4: 'Never risk more than 1-2% of your account on a single trade. With 1% risk, you can lose 10 trades in a row and still have 90% of your capital. With 5% risk, 10 losses leaves you with only 60% — a 67% gain needed just to break even.',
    faqHeading: 'Frequently Asked Questions',
    relatedHeading: 'Related Articles',
    riskPerTrade: 'Risk per Trade',
    riskLabels: { conservative: 'Conservative', standard: 'Standard', moderate: 'Moderate', aggressive: 'Aggressive' },
    searchPlaceholder: 'Search 340+ instruments...',
    noFavorites: 'No favorites yet. Tap the heart to add.', noInstruments: 'No instruments found',
    tabs: { all: 'All', favorites: 'Favorites', 'forex-majors': 'Majors', 'forex-crosses': 'Crosses', 'forex-exotics': 'Exotics', crypto: 'Crypto', metals: 'Metals', indices: 'Indices', energy: 'Energy', stocks: 'Stocks', agriculture: 'Agriculture', bonds: 'Bonds', etfs: 'ETFs' },
    faq: [
      { q: 'What is lot size in trading?', a: 'A lot is a standardized unit of measurement for a trading position. In forex, 1 standard lot = 100,000 units of the base currency. Mini lot = 10,000 units (0.1 lots), micro lot = 1,000 units (0.01 lots). Proper lot sizing is the foundation of risk management.' },
      { q: 'How do you calculate lot size?', a: "Lot Size = Risk Amount ÷ (Stop Loss in Pips × Pip Value per Lot). First determine how much you're willing to risk (e.g., 1% of $10,000 = $100), then divide by the dollar value of your stop loss distance. This calculator automates the entire process." },
      { q: 'What is the difference between standard, mini, and micro lots?', a: 'Standard lot = 1.00 (100,000 units), Mini lot = 0.10 (10,000 units), Micro lot = 0.01 (1,000 units). Smaller lots allow tighter risk control. Most brokers support micro lots (0.01) as the minimum.' },
      { q: 'Why does this calculator use truncation instead of rounding?', a: 'We truncate (floor) lot sizes to avoid over-risking. If the math says 0.837 lots, rounding up to 0.84 would increase your actual risk beyond your intended percentage. Truncating to 0.83 keeps you at or below your target risk — always.' },
      { q: 'What risk percentage should I use?', a: 'Professional traders typically risk 0.5%–2% per trade. The 1% rule is the industry standard: never risk more than 1% of your account on a single trade. Above 2% is moderate risk, above 5% is aggressive and not recommended.' },
      { q: 'How does leverage affect lot size?', a: "Leverage doesn't change the lot size calculation — it affects margin required. With 1:100 leverage, a $100,000 position needs $1,000 margin instead of the full amount. Higher leverage means less margin, but your risk per pip stays the same." },
    ],
  },
  ro: {
    pageTitle: 'Lot Size Calculator Gratuit — Forex, Crypto, Acțiuni, Indici | K.M.F.',
    pageDesc: 'Calculează lot size-ul perfect pentru orice trade. 340+ instrumente, cursuri valutare în timp real, risk management inclus. Gratuit, fără înregistrare.',
    ogAlt: 'Lot Size Calculator Gratuit — 340+ Instrumente',
    home: 'Acasă', tools: 'Tools', breadcrumbTool: 'Lot Size Calculator',
    heroP: <>Calculează dimensiunea exactă a poziției pentru orice trade pe <strong className="text-kmf-text-primary">340+ instrumente</strong>. Forex, crypto, acțiuni, indici, mărfuri — cu cursuri valutare în timp real.</>,
    accountBalance: 'Sold cont', currency: 'Monedă', instrument: 'Instrument',
    preset: 'Preset', custom: 'Custom', contractSize: 'Mărime contract', pipSize: 'Mărime pip', quoteCcy: 'Monedă cotare',
    entryPrice: 'Entry Price', stopLoss: 'Stop Loss', takeProfit: 'Take Profit', leverage: 'Leverage',
    selectInstrument: 'Alege instrumentul...',
    ratesLive: 'Cursuri în timp real (cache 1h)', ratesLoading: 'Se încarcă cursurile...',
    emptyPrompt: 'Introdu entry price și stop loss ca să calculezi',
    positionSize: 'Mărime poziție', standardLotsSub: 'standard lots',
    risking: 'Riști', toMake: 'ca să faci',
    standard: 'Standard', mini: 'Mini', micro: 'Micro', lots: 'lots',
    riskAmount: 'Sumă riscată', marginRequired: 'Margin necesar', pipValue: 'Pip Value', slDistance: 'Distanță SL',
    tpDistance: 'Distanță TP', rrRatio: 'Raport R:R', potentialWin: 'Câștig potențial',
    balanceAfterLoss: 'Sold după pierdere', balanceAfterWin: 'Sold după câștig',
    copyResults: 'Copiază rezultatele', reset: 'Resetează',
    wantMobile: 'Vrei asta pe mobil?', freeOnPlay: 'Gratuit pe Google Play', download: 'Descarcă',
    disclaimer: 'Acest calculator e oferit doar în scop informativ și educativ. Nu reprezintă sfat financiar. Verifică mereu mărimea pozițiilor și parametrii de risc cu brokerul tău înainte să deschizi un trade.',
    eduTitle: 'Cum folosești Lot Size Calculator-ul',
    eduP1: <>Position sizing-ul e <strong className="text-kmf-text-primary">cel mai important skill de risk management</strong> din trading. O intrare perfectă cu un lot size greșit îți poate distruge contul. O intrare mediocră cu lot size corect te ține în joc.</>,
    formulaTitle: 'Formula',
    formula: 'Lot Size = Risk Amount ÷ (Stop Loss Pips × Pip Value per Lot)',
    eduP2: <>Unde <strong className="text-kmf-text-primary">Risk Amount</strong> = Sold cont × Procent de risc. Dacă ai un cont de $10.000 și riști 1%, suma riscată e $100.</>,
    truncTitle: 'De ce trunchiere, nu rotunjire?',
    eduP3: <>Acest calculator folosește <strong className="text-kmf-text-primary">trunchierea (floor)</strong> în loc de rotunjire. Dacă matematica zice 0.837 lots, afișăm 0.83 — nu 0.84. Rotunjirea în sus ar însemna să riști <em>mai mult</em> decât procentul dorit. Risk management-ul profesionist greșește mereu în favoarea prudenței.</>,
    ruleTitle: 'Regula de 1%',
    eduP4: 'Nu risca niciodată mai mult de 1-2% din cont pe un singur trade. Cu 1% risc, poți pierde 10 trade-uri la rând și tot îți rămâne 90% din capital. Cu 5% risc, 10 pierderi te lasă cu doar 60% — ai nevoie de un câștig de 67% doar ca să ajungi la break-even.',
    faqHeading: 'Întrebări Frecvente',
    relatedHeading: 'Articole Conexe',
    riskPerTrade: 'Risc per Trade',
    riskLabels: { conservative: 'Conservator', standard: 'Standard', moderate: 'Moderat', aggressive: 'Agresiv' },
    searchPlaceholder: 'Caută 340+ instrumente...',
    noFavorites: 'Niciun favorit încă. Apasă inima ca să adaugi.', noInstruments: 'Niciun instrument găsit',
    tabs: { all: 'Toate', favorites: 'Favorite', 'forex-majors': 'Majors', 'forex-crosses': 'Crosses', 'forex-exotics': 'Exotics', crypto: 'Crypto', metals: 'Metale', indices: 'Indici', energy: 'Energie', stocks: 'Acțiuni', agriculture: 'Agricultură', bonds: 'Obligațiuni', etfs: 'ETFs' },
    faq: [
      { q: 'Ce este lot size în trading?', a: 'Un lot e o unitate standardizată de măsură pentru o poziție. În forex, 1 standard lot = 100.000 de unități din moneda de bază. Mini lot = 10.000 de unități (0.1 lots), micro lot = 1.000 de unități (0.01 lots). Dimensionarea corectă a lot-ului e fundamentul risk management-ului.' },
      { q: 'Cum calculezi lot size-ul?', a: 'Lot Size = Sumă riscată ÷ (Stop Loss în pips × Pip Value per lot). Întâi stabilești cât ești dispus să riști (ex. 1% din $10.000 = $100), apoi împarți la valoarea în dolari a distanței până la stop loss. Acest calculator automatizează tot procesul.' },
      { q: 'Care e diferența dintre standard, mini și micro lots?', a: 'Standard lot = 1.00 (100.000 unități), Mini lot = 0.10 (10.000 unități), Micro lot = 0.01 (1.000 unități). Lot-urile mai mici permit un control mai fin al riscului. Majoritatea brokerilor suportă micro lots (0.01) ca minim.' },
      { q: 'De ce folosește acest calculator trunchiere în loc de rotunjire?', a: 'Trunchiem (floor) lot size-urile ca să evităm riscul în exces. Dacă matematica zice 0.837 lots, rotunjirea în sus la 0.84 ți-ar crește riscul real peste procentul dorit. Trunchierea la 0.83 te ține la sau sub riscul țintă — mereu.' },
      { q: 'Ce procent de risc ar trebui să folosesc?', a: 'Traderii profesioniști riscă de obicei 0.5%–2% per trade. Regula de 1% e standardul din industrie: nu risca niciodată mai mult de 1% din cont pe un singur trade. Peste 2% e risc moderat, peste 5% e agresiv și nerecomandat.' },
      { q: 'Cum afectează leverage-ul lot size-ul?', a: 'Leverage-ul nu schimbă calculul lot size-ului — afectează margin-ul necesar. Cu leverage 1:100, o poziție de $100.000 are nevoie de $1.000 margin în loc de suma totală. Leverage mai mare înseamnă margin mai mic, dar riscul tău per pip rămâne același.' },
    ],
  },
  de: {
    pageTitle: 'Kostenloser Lot-Size-Rechner — Forex, Krypto, Aktien, Indizes | K.M.F.',
    pageDesc: 'Berechne die perfekte Lot-Size für jeden Trade. 340+ Instrumente, Echtzeit-Wechselkurse, Risikomanagement integriert. Kostenlos, ohne Anmeldung.',
    ogAlt: 'Kostenloser Lot-Size-Rechner — 340+ Instrumente',
    home: 'Start', tools: 'Tools', breadcrumbTool: 'Lot-Size-Rechner',
    heroP: <>Berechne die genaue Positionsgröße für jeden Trade über <strong className="text-kmf-text-primary">340+ Instrumente</strong>. Forex, Krypto, Aktien, Indizes, Rohstoffe — mit Echtzeit-Wechselkursen.</>,
    accountBalance: 'Kontostand', currency: 'Währung', instrument: 'Instrument',
    preset: 'Voreinstellung', custom: 'Eigene', contractSize: 'Kontraktgröße', pipSize: 'Pip-Größe', quoteCcy: 'Notierungswährung',
    entryPrice: 'Entry Price', stopLoss: 'Stop Loss', takeProfit: 'Take Profit', leverage: 'Leverage',
    selectInstrument: 'Instrument wählen...',
    ratesLive: 'Echtzeit-Wechselkurse (1h zwischengespeichert)', ratesLoading: 'Wechselkurse werden geladen...',
    emptyPrompt: 'Entry Price und Stop Loss eingeben, um zu berechnen',
    positionSize: 'Positionsgröße', standardLotsSub: 'Standard-Lots',
    risking: 'Du riskierst', toMake: 'um zu gewinnen',
    standard: 'Standard', mini: 'Mini', micro: 'Micro', lots: 'Lots',
    riskAmount: 'Risikobetrag', marginRequired: 'Erforderliche Margin', pipValue: 'Pip-Wert', slDistance: 'SL-Abstand',
    tpDistance: 'TP-Abstand', rrRatio: 'R:R-Verhältnis', potentialWin: 'Möglicher Gewinn',
    balanceAfterLoss: 'Saldo nach Verlust', balanceAfterWin: 'Saldo nach Gewinn',
    copyResults: 'Ergebnisse kopieren', reset: 'Zurücksetzen',
    wantMobile: 'Willst du das mobil?', freeOnPlay: 'Kostenlos bei Google Play', download: 'Herunterladen',
    disclaimer: 'Dieser Rechner dient nur zu Informations- und Bildungszwecken. Er stellt keine Finanzberatung dar. Überprüfe Positionsgrößen und Risikoparameter immer mit deinem Broker, bevor du einen Trade eröffnest.',
    eduTitle: 'So nutzt du den Lot-Size-Rechner',
    eduP1: <>Die Positionsgröße ist die <strong className="text-kmf-text-primary">wichtigste Fähigkeit im Risikomanagement</strong> beim Trading. Ein perfekter Einstieg mit falscher Lot-Size kann dein Konto sprengen. Ein mittelmäßiger Einstieg mit richtiger Lot-Size hält dich im Spiel.</>,
    formulaTitle: 'Die Formel',
    formula: 'Lot-Size = Risikobetrag ÷ (Stop-Loss-Pips × Pip-Wert pro Lot)',
    eduP2: <>Dabei ist <strong className="text-kmf-text-primary">Risikobetrag</strong> = Kontostand × Risikoprozentsatz. Bei einem Konto von $10.000 und 1 % Risiko beträgt dein Risikobetrag $100.</>,
    truncTitle: 'Warum Abschneiden statt Runden?',
    eduP3: <>Dieser Rechner verwendet <strong className="text-kmf-text-primary">Abschneiden (Floor)</strong> statt Runden. Wenn die Rechnung 0.837 Lots ergibt, zeigen wir 0.83 — nicht 0.84. Aufrunden würde bedeuten, <em>mehr</em> als deinen gewünschten Prozentsatz zu riskieren. Professionelles Risikomanagement entscheidet immer zugunsten der Vorsicht.</>,
    ruleTitle: 'Die 1-%-Regel',
    eduP4: 'Riskiere niemals mehr als 1–2 % deines Kontos bei einem einzelnen Trade. Mit 1 % Risiko kannst du 10 Trades in Folge verlieren und hast immer noch 90 % deines Kapitals. Mit 5 % Risiko bleiben dir nach 10 Verlusten nur 60 % — du brauchst 67 % Gewinn, nur um wieder bei null zu sein.',
    faqHeading: 'Häufige Fragen',
    relatedHeading: 'Verwandte Artikel',
    riskPerTrade: 'Risiko pro Trade',
    riskLabels: { conservative: 'Konservativ', standard: 'Standard', moderate: 'Moderat', aggressive: 'Aggressiv' },
    searchPlaceholder: '340+ Instrumente suchen...',
    noFavorites: 'Noch keine Favoriten. Tippe auf das Herz, um hinzuzufügen.', noInstruments: 'Keine Instrumente gefunden',
    tabs: { all: 'Alle', favorites: 'Favoriten', 'forex-majors': 'Majors', 'forex-crosses': 'Crosses', 'forex-exotics': 'Exotics', crypto: 'Krypto', metals: 'Metalle', indices: 'Indizes', energy: 'Energie', stocks: 'Aktien', agriculture: 'Agrar', bonds: 'Anleihen', etfs: 'ETFs' },
    faq: [
      { q: 'Was ist die Lot-Size im Trading?', a: 'Ein Lot ist eine standardisierte Maßeinheit für eine Trading-Position. Im Forex sind 1 Standard-Lot = 100.000 Einheiten der Basiswährung. Mini-Lot = 10.000 Einheiten (0.1 Lots), Micro-Lot = 1.000 Einheiten (0.01 Lots). Die richtige Lot-Size ist die Grundlage des Risikomanagements.' },
      { q: 'Wie berechnet man die Lot-Size?', a: 'Lot-Size = Risikobetrag ÷ (Stop Loss in Pips × Pip-Wert pro Lot). Lege zuerst fest, wie viel du riskieren willst (z. B. 1 % von $10.000 = $100), und teile dann durch den Dollar-Wert deines Stop-Loss-Abstands. Dieser Rechner automatisiert den gesamten Vorgang.' },
      { q: 'Was ist der Unterschied zwischen Standard-, Mini- und Micro-Lots?', a: 'Standard-Lot = 1.00 (100.000 Einheiten), Mini-Lot = 0.10 (10.000 Einheiten), Micro-Lot = 0.01 (1.000 Einheiten). Kleinere Lots ermöglichen eine genauere Risikokontrolle. Die meisten Broker unterstützen Micro-Lots (0.01) als Minimum.' },
      { q: 'Warum verwendet dieser Rechner Abschneiden statt Runden?', a: 'Wir schneiden die Lot-Size ab (Floor), um ein Überrisiko zu vermeiden. Wenn die Rechnung 0.837 Lots ergibt, würde das Aufrunden auf 0.84 dein tatsächliches Risiko über deinen gewünschten Prozentsatz hinaus erhöhen. Das Abschneiden auf 0.83 hält dich immer auf oder unter deinem Zielrisiko.' },
      { q: 'Welchen Risikoprozentsatz sollte ich verwenden?', a: 'Professionelle Trader riskieren typischerweise 0,5 %–2 % pro Trade. Die 1-%-Regel ist der Branchenstandard: Riskiere niemals mehr als 1 % deines Kontos bei einem einzelnen Trade. Über 2 % ist moderates Risiko, über 5 % ist aggressiv und nicht empfohlen.' },
      { q: 'Wie wirkt sich Leverage auf die Lot-Size aus?', a: 'Leverage ändert die Lot-Size-Berechnung nicht — es beeinflusst die erforderliche Margin. Bei 1:100-Leverage benötigt eine Position von $100.000 nur $1.000 Margin statt des vollen Betrags. Mehr Leverage bedeutet weniger Margin, aber dein Risiko pro Pip bleibt gleich.' },
    ],
  },
  fr: {
    pageTitle: 'Calculateur de lot gratuit — Forex, crypto, actions, indices | K.M.F.',
    pageDesc: 'Calculez la taille de lot parfaite pour chaque trade. 340+ instruments, taux de change en temps réel, gestion du risque intégrée. Gratuit, sans inscription.',
    ogAlt: 'Calculateur de lot gratuit — 340+ instruments',
    home: 'Accueil', tools: 'Outils', breadcrumbTool: 'Calculateur de lot',
    heroP: <>Calculez la taille de position exacte pour chaque trade sur <strong className="text-kmf-text-primary">340+ instruments</strong>. Forex, crypto, actions, indices, matières premières — avec des taux de change en temps réel.</>,
    accountBalance: 'Solde du compte', currency: 'Devise', instrument: 'Instrument',
    preset: 'Préréglage', custom: 'Perso.', contractSize: 'Taille du contrat', pipSize: 'Taille du pip', quoteCcy: 'Devise de cotation',
    entryPrice: 'Prix d\'entrée', stopLoss: 'Stop Loss', takeProfit: 'Take Profit', leverage: 'Levier',
    selectInstrument: 'Choisir un instrument...',
    ratesLive: 'Taux de change en temps réel (cache 1h)', ratesLoading: 'Chargement des taux de change...',
    emptyPrompt: 'Saisissez le prix d\'entrée et le stop loss pour calculer',
    positionSize: 'Taille de position', standardLotsSub: 'lots standard',
    risking: 'Vous risquez', toMake: 'pour gagner',
    standard: 'Standard', mini: 'Mini', micro: 'Micro', lots: 'lots',
    riskAmount: 'Montant risqué', marginRequired: 'Marge requise', pipValue: 'Valeur du pip', slDistance: 'Distance SL',
    tpDistance: 'Distance TP', rrRatio: 'Ratio R:R', potentialWin: 'Gain potentiel',
    balanceAfterLoss: 'Solde après perte', balanceAfterWin: 'Solde après gain',
    copyResults: 'Copier les résultats', reset: 'Réinitialiser',
    wantMobile: 'Vous le voulez sur mobile ?', freeOnPlay: 'Gratuit sur Google Play', download: 'Télécharger',
    disclaimer: 'Ce calculateur est fourni à des fins d\'information et d\'éducation uniquement. Il ne constitue pas un conseil financier. Vérifiez toujours les tailles de position et les paramètres de risque auprès de votre courtier avant de passer un trade.',
    eduTitle: 'Comment utiliser le calculateur de lot',
    eduP1: <>Le dimensionnement de position est la <strong className="text-kmf-text-primary">compétence de gestion du risque la plus importante</strong> en trading. Une entrée parfaite avec une mauvaise taille de lot peut faire exploser votre compte. Une entrée médiocre avec la bonne taille de lot vous maintient dans le jeu.</>,
    formulaTitle: 'La formule',
    formula: 'Taille de lot = Montant risqué ÷ (Pips de stop loss × Valeur du pip par lot)',
    eduP2: <>Où <strong className="text-kmf-text-primary">Montant risqué</strong> = Solde du compte × Pourcentage de risque. Avec un compte de 10 000 $ et un risque de 1 %, votre montant risqué est de 100 $.</>,
    truncTitle: 'Pourquoi la troncature plutôt que l\'arrondi ?',
    eduP3: <>Ce calculateur utilise la <strong className="text-kmf-text-primary">troncature (plancher)</strong> plutôt que l\'arrondi. Si le calcul donne 0.837 lots, nous affichons 0.83 — pas 0.84. Arrondir au-dessus reviendrait à risquer <em>plus</em> que le pourcentage visé. La gestion du risque professionnelle penche toujours du côté de la prudence.</>,
    ruleTitle: 'La règle des 1 %',
    eduP4: 'Ne risquez jamais plus de 1 à 2 % de votre compte sur un seul trade. Avec 1 % de risque, vous pouvez perdre 10 trades d\'affilée et conserver 90 % de votre capital. Avec 5 % de risque, 10 pertes ne vous laissent que 60 % — il faut alors un gain de 67 % juste pour revenir à l\'équilibre.',
    faqHeading: 'Questions fréquentes',
    relatedHeading: 'Articles liés',
    riskPerTrade: 'Risque par trade',
    riskLabels: { conservative: 'Conservateur', standard: 'Standard', moderate: 'Modéré', aggressive: 'Agressif' },
    searchPlaceholder: 'Rechercher 340+ instruments...',
    noFavorites: 'Aucun favori pour l\'instant. Touchez le cœur pour ajouter.', noInstruments: 'Aucun instrument trouvé',
    tabs: { all: 'Tous', favorites: 'Favoris', 'forex-majors': 'Majeures', 'forex-crosses': 'Croisées', 'forex-exotics': 'Exotiques', crypto: 'Crypto', metals: 'Métaux', indices: 'Indices', energy: 'Énergie', stocks: 'Actions', agriculture: 'Agriculture', bonds: 'Obligations', etfs: 'ETF' },
    faq: [
      { q: 'Qu\'est-ce que la taille de lot en trading ?', a: 'Un lot est une unité de mesure standardisée pour une position de trading. En forex, 1 lot standard = 100 000 unités de la devise de base. Mini lot = 10 000 unités (0.1 lot), micro lot = 1 000 unités (0.01 lot). Un dimensionnement correct du lot est le fondement de la gestion du risque.' },
      { q: 'Comment calcule-t-on la taille de lot ?', a: 'Taille de lot = Montant risqué ÷ (Stop loss en pips × Valeur du pip par lot). Déterminez d\'abord combien vous êtes prêt à risquer (par ex. 1 % de 10 000 $ = 100 $), puis divisez par la valeur en dollars de la distance de votre stop loss. Ce calculateur automatise tout le processus.' },
      { q: 'Quelle est la différence entre lots standard, mini et micro ?', a: 'Lot standard = 1.00 (100 000 unités), mini lot = 0.10 (10 000 unités), micro lot = 0.01 (1 000 unités). Des lots plus petits permettent un contrôle du risque plus fin. La plupart des courtiers prennent en charge les micro lots (0.01) comme minimum.' },
      { q: 'Pourquoi ce calculateur utilise-t-il la troncature plutôt que l\'arrondi ?', a: 'Nous tronquons (plancher) les tailles de lot pour éviter de sur-risquer. Si le calcul donne 0.837 lots, arrondir à 0.84 augmenterait votre risque réel au-delà du pourcentage visé. Tronquer à 0.83 vous maintient toujours à votre risque cible ou en dessous.' },
      { q: 'Quel pourcentage de risque utiliser ?', a: 'Les traders professionnels risquent généralement 0,5 % à 2 % par trade. La règle des 1 % est la norme du secteur : ne risquez jamais plus de 1 % de votre compte sur un seul trade. Au-dessus de 2 %, le risque est modéré ; au-dessus de 5 %, il est agressif et déconseillé.' },
      { q: 'Comment le levier affecte-t-il la taille de lot ?', a: 'Le levier ne change pas le calcul de la taille de lot — il affecte la marge requise. Avec un levier de 1:100, une position de 100 000 $ nécessite 1 000 $ de marge au lieu du montant total. Plus de levier signifie moins de marge, mais votre risque par pip reste le même.' },
    ],
  },
  ru: {
    pageTitle: 'Бесплатный калькулятор лота — форекс, крипто, акции, индексы | K.M.F.',
    pageDesc: 'Рассчитайте идеальный размер лота для любой сделки. 340+ инструментов, курсы валют в реальном времени, встроенный риск-менеджмент. Бесплатно, без регистрации.',
    ogAlt: 'Бесплатный калькулятор лота — 340+ инструментов',
    home: 'Главная', tools: 'Инструменты', breadcrumbTool: 'Калькулятор лота',
    heroP: <>Рассчитайте точный размер позиции для любой сделки по <strong className="text-kmf-text-primary">340+ инструментам</strong>. Форекс, крипто, акции, индексы, сырьё — с курсами валют в реальном времени.</>,
    accountBalance: 'Баланс счёта', currency: 'Валюта', instrument: 'Инструмент',
    preset: 'Пресет', custom: 'Свой', contractSize: 'Размер контракта', pipSize: 'Размер пипа', quoteCcy: 'Валюта котировки',
    entryPrice: 'Цена входа', stopLoss: 'Stop Loss', takeProfit: 'Take Profit', leverage: 'Плечо',
    selectInstrument: 'Выбрать инструмент...',
    ratesLive: 'Курсы в реальном времени (кэш 1ч)', ratesLoading: 'Загрузка курсов...',
    emptyPrompt: 'Введите цену входа и stop loss для расчёта',
    positionSize: 'Размер позиции', standardLotsSub: 'стандартных лотов',
    risking: 'Вы рискуете', toMake: 'чтобы заработать',
    standard: 'Стандарт', mini: 'Мини', micro: 'Микро', lots: 'лотов',
    riskAmount: 'Сумма риска', marginRequired: 'Требуемая маржа', pipValue: 'Стоимость пипа', slDistance: 'Дистанция SL',
    tpDistance: 'Дистанция TP', rrRatio: 'Соотношение R:R', potentialWin: 'Потенциальная прибыль',
    balanceAfterLoss: 'Баланс после убытка', balanceAfterWin: 'Баланс после прибыли',
    copyResults: 'Копировать результаты', reset: 'Сбросить',
    wantMobile: 'Хотите это на мобильном?', freeOnPlay: 'Бесплатно в Google Play', download: 'Скачать',
    disclaimer: 'Этот калькулятор предоставляется только в информационных и образовательных целях. Он не является финансовой консультацией. Всегда проверяйте размеры позиций и параметры риска у своего брокера перед открытием сделки.',
    eduTitle: 'Как пользоваться калькулятором лота',
    eduP1: <>Определение размера позиции — это <strong className="text-kmf-text-primary">самый важный навык риск-менеджмента</strong> в трейдинге. Идеальный вход с неправильным размером лота может уничтожить счёт. Посредственный вход с правильным размером лота держит вас в игре.</>,
    formulaTitle: 'Формула',
    formula: 'Размер лота = Сумма риска ÷ (Пипы stop loss × Стоимость пипа за лот)',
    eduP2: <>Где <strong className="text-kmf-text-primary">Сумма риска</strong> = Баланс счёта × Процент риска. Если у вас счёт $10 000 и риск 1%, ваша сумма риска — $100.</>,
    truncTitle: 'Почему усечение, а не округление?',
    eduP3: <>Этот калькулятор использует <strong className="text-kmf-text-primary">усечение (floor)</strong> вместо округления. Если расчёт даёт 0.837 лота, мы показываем 0.83 — не 0.84. Округление вверх означало бы риск <em>больше</em> желаемого процента. Профессиональный риск-менеджмент всегда склоняется в сторону осторожности.</>,
    ruleTitle: 'Правило 1%',
    eduP4: 'Никогда не рискуйте более чем 1–2% счёта в одной сделке. При риске 1% вы можете проиграть 10 сделок подряд и сохранить 90% капитала. При риске 5% 10 убытков оставят вам лишь 60% — потребуется прибыль 67% только чтобы выйти в ноль.',
    faqHeading: 'Частые вопросы',
    relatedHeading: 'Связанные статьи',
    riskPerTrade: 'Риск на сделку',
    riskLabels: { conservative: 'Консервативный', standard: 'Стандартный', moderate: 'Умеренный', aggressive: 'Агрессивный' },
    searchPlaceholder: 'Поиск 340+ инструментов...',
    noFavorites: 'Пока нет избранного. Нажмите на сердце, чтобы добавить.', noInstruments: 'Инструменты не найдены',
    tabs: { all: 'Все', favorites: 'Избранное', 'forex-majors': 'Мажоры', 'forex-crosses': 'Кроссы', 'forex-exotics': 'Экзотика', crypto: 'Крипто', metals: 'Металлы', indices: 'Индексы', energy: 'Энергия', stocks: 'Акции', agriculture: 'Агро', bonds: 'Облигации', etfs: 'ETF' },
    faq: [
      { q: 'Что такое размер лота в трейдинге?', a: 'Лот — это стандартизированная единица измерения торговой позиции. В форексе 1 стандартный лот = 100 000 единиц базовой валюты. Мини-лот = 10 000 единиц (0.1 лота), микро-лот = 1 000 единиц (0.01 лота). Правильный размер лота — основа риск-менеджмента.' },
      { q: 'Как рассчитать размер лота?', a: 'Размер лота = Сумма риска ÷ (Stop loss в пипах × Стоимость пипа за лот). Сначала определите, сколько готовы рискнуть (например, 1% от $10 000 = $100), затем разделите на долларовую стоимость дистанции stop loss. Этот калькулятор автоматизирует весь процесс.' },
      { q: 'В чём разница между стандартными, мини и микро лотами?', a: 'Стандартный лот = 1.00 (100 000 единиц), мини-лот = 0.10 (10 000 единиц), микро-лот = 0.01 (1 000 единиц). Меньшие лоты позволяют точнее контролировать риск. Большинство брокеров поддерживают микро-лоты (0.01) как минимум.' },
      { q: 'Почему этот калькулятор использует усечение вместо округления?', a: 'Мы усекаем (floor) размеры лота, чтобы избежать избыточного риска. Если расчёт даёт 0.837 лота, округление до 0.84 увеличило бы ваш реальный риск сверх желаемого процента. Усечение до 0.83 всегда держит вас на целевом риске или ниже.' },
      { q: 'Какой процент риска использовать?', a: 'Профессиональные трейдеры обычно рискуют 0,5%–2% на сделку. Правило 1% — отраслевой стандарт: никогда не рискуйте более 1% счёта в одной сделке. Выше 2% — умеренный риск, выше 5% — агрессивный и не рекомендуется.' },
      { q: 'Как плечо влияет на размер лота?', a: 'Плечо не меняет расчёт размера лота — оно влияет на требуемую маржу. При плече 1:100 позиция $100 000 требует $1 000 маржи вместо полной суммы. Большее плечо означает меньшую маржу, но ваш риск на пип остаётся прежним.' },
    ],
  },
  ja: {
    pageTitle: '無料ロットサイズ計算機 — FX・仮想通貨・株式・指数 | K.M.F.',
    pageDesc: 'あらゆるトレードに最適なロットサイズを計算。340以上の銘柄、リアルタイム為替レート、リスク管理を内蔵。無料・登録不要。',
    ogAlt: '無料ロットサイズ計算機 — 340以上の銘柄',
    home: 'ホーム', tools: 'ツール', breadcrumbTool: 'ロットサイズ計算機',
    heroP: <><strong className="text-kmf-text-primary">340以上の銘柄</strong>について、あらゆるトレードの正確なポジションサイズを計算します。FX、仮想通貨、株式、指数、商品 — リアルタイム為替レート付き。</>,
    accountBalance: '口座残高', currency: '通貨', instrument: '銘柄',
    preset: 'プリセット', custom: 'カスタム', contractSize: '契約サイズ', pipSize: 'pipサイズ', quoteCcy: 'クォート通貨',
    entryPrice: 'エントリー価格', stopLoss: 'Stop Loss', takeProfit: 'Take Profit', leverage: 'レバレッジ',
    selectInstrument: '銘柄を選択...',
    ratesLive: 'リアルタイム為替レート（1時間キャッシュ）', ratesLoading: '為替レートを読み込み中...',
    emptyPrompt: 'エントリー価格とstop lossを入力して計算',
    positionSize: 'ポジションサイズ', standardLotsSub: '標準ロット',
    risking: 'リスク', toMake: '目標利益',
    standard: '標準', mini: 'ミニ', micro: 'マイクロ', lots: 'ロット',
    riskAmount: 'リスク額', marginRequired: '必要証拠金', pipValue: 'pip価値', slDistance: 'SL距離',
    tpDistance: 'TP距離', rrRatio: 'R:R比', potentialWin: '想定利益',
    balanceAfterLoss: '損失後の残高', balanceAfterWin: '利益後の残高',
    copyResults: '結果をコピー', reset: 'リセット',
    wantMobile: 'モバイルでも使いたい？', freeOnPlay: 'Google Playで無料', download: 'ダウンロード',
    disclaimer: 'この計算機は情報提供および教育目的でのみ提供されます。金融アドバイスではありません。トレードを行う前に、必ずブローカーでポジションサイズとリスクパラメータを確認してください。',
    eduTitle: 'ロットサイズ計算機の使い方',
    eduP1: <>ポジションサイジングは、トレードにおける<strong className="text-kmf-text-primary">最も重要なリスク管理スキル</strong>です。完璧なエントリーでもロットサイズを間違えれば口座を破綻させかねません。平凡なエントリーでも正しいロットサイズなら、あなたをゲームに残します。</>,
    formulaTitle: '計算式',
    formula: 'ロットサイズ = リスク額 ÷（Stop Lossのpips × 1ロットあたりのpip価値）',
    eduP2: <>ここで<strong className="text-kmf-text-primary">リスク額</strong> = 口座残高 × リスク率。口座が $10,000 でリスクが1%なら、リスク額は $100 です。</>,
    truncTitle: 'なぜ四捨五入ではなく切り捨て？',
    eduP3: <>この計算機は四捨五入ではなく<strong className="text-kmf-text-primary">切り捨て（floor）</strong>を使います。計算結果が0.837ロットなら、0.84ではなく0.83を表示します。切り上げると目標とした割合<em>より多く</em>リスクを取ることになります。プロのリスク管理は常に慎重な側に倒します。</>,
    ruleTitle: '1%ルール',
    eduP4: '1回のトレードで口座の1〜2%を超えるリスクは決して取らないこと。リスク1%なら、10連敗しても資金の90%が残ります。リスク5%なら、10連敗で60%しか残らず、損益均衡に戻すだけで67%の利益が必要になります。',
    faqHeading: 'よくある質問',
    relatedHeading: '関連記事',
    riskPerTrade: '1トレードあたりのリスク',
    riskLabels: { conservative: '保守的', standard: '標準', moderate: '中程度', aggressive: '積極的' },
    searchPlaceholder: '340以上の銘柄を検索...',
    noFavorites: 'まだお気に入りがありません。ハートをタップして追加。', noInstruments: '銘柄が見つかりません',
    tabs: { all: 'すべて', favorites: 'お気に入り', 'forex-majors': 'メジャー', 'forex-crosses': 'クロス', 'forex-exotics': 'エキゾチック', crypto: '仮想通貨', metals: '貴金属', indices: '指数', energy: 'エネルギー', stocks: '株式', agriculture: '農産物', bonds: '債券', etfs: 'ETF' },
    faq: [
      { q: 'トレードにおけるロットサイズとは？', a: 'ロットはトレードポジションの標準化された測定単位です。FXでは1標準ロット = 基軸通貨10万単位。ミニロット = 1万単位（0.1ロット）、マイクロロット = 1,000単位（0.01ロット）。適切なロットサイジングはリスク管理の基礎です。' },
      { q: 'ロットサイズはどう計算する？', a: 'ロットサイズ = リスク額 ÷（Stop Lossのpips × 1ロットあたりのpip価値）。まずいくらリスクを取るか決め（例：$10,000の1% = $100）、stop loss距離のドル価値で割ります。この計算機が全工程を自動化します。' },
      { q: '標準・ミニ・マイクロロットの違いは？', a: '標準ロット = 1.00（10万単位）、ミニロット = 0.10（1万単位）、マイクロロット = 0.01（1,000単位）。小さいロットほどリスクを細かく制御できます。ほとんどのブローカーは最小単位としてマイクロロット（0.01）に対応しています。' },
      { q: 'なぜこの計算機は四捨五入ではなく切り捨てを使う？', a: '過剰なリスクを避けるためロットサイズを切り捨て（floor）ます。計算が0.837ロットなら、0.84に切り上げると実際のリスクが目標割合を超えてしまいます。0.83に切り捨てれば、常に目標リスク以下に保てます。' },
      { q: 'どのリスク率を使うべき？', a: 'プロのトレーダーは通常1トレードあたり0.5%〜2%のリスクを取ります。1%ルールは業界標準です：1回のトレードで口座の1%を超えるリスクは決して取らないこと。2%超は中程度、5%超は積極的で推奨されません。' },
      { q: 'レバレッジはロットサイズにどう影響する？', a: 'レバレッジはロットサイズの計算を変えません — 必要証拠金に影響します。1:100のレバレッジでは、$100,000のポジションに全額ではなく$1,000の証拠金が必要です。レバレッジが高いほど証拠金は少なくなりますが、pipあたりのリスクは変わりません。' },
    ],
  },
  zh: {
    pageTitle: '免费手数计算器 — 外汇、加密货币、股票、指数 | K.M.F.',
    pageDesc: '为任何交易计算完美的手数。340+ 个品种，实时汇率，内置风险管理。免费，无需注册。',
    ogAlt: '免费手数计算器 — 340+ 个品种',
    home: '首页', tools: '工具', breadcrumbTool: '手数计算器',
    heroP: <>为 <strong className="text-kmf-text-primary">340+ 个品种</strong> 的任何交易计算精确的仓位大小。外汇、加密货币、股票、指数、商品 — 配实时汇率。</>,
    accountBalance: '账户余额', currency: '货币', instrument: '品种',
    preset: '预设', custom: '自定义', contractSize: '合约规模', pipSize: 'pip 大小', quoteCcy: '报价货币',
    entryPrice: '入场价', stopLoss: 'Stop Loss', takeProfit: 'Take Profit', leverage: '杠杆',
    selectInstrument: '选择品种...',
    ratesLive: '实时汇率（缓存 1 小时）', ratesLoading: '正在加载汇率...',
    emptyPrompt: '输入入场价和 stop loss 进行计算',
    positionSize: '仓位大小', standardLotsSub: '标准手',
    risking: '您冒险', toMake: '以赚取',
    standard: '标准', mini: '迷你', micro: '微型', lots: '手',
    riskAmount: '风险金额', marginRequired: '所需保证金', pipValue: 'pip 价值', slDistance: 'SL 距离',
    tpDistance: 'TP 距离', rrRatio: 'R:R 比率', potentialWin: '潜在盈利',
    balanceAfterLoss: '亏损后余额', balanceAfterWin: '盈利后余额',
    copyResults: '复制结果', reset: '重置',
    wantMobile: '想在手机上使用？', freeOnPlay: 'Google Play 免费', download: '下载',
    disclaimer: '本计算器仅供信息和教育用途，不构成财务建议。在下单前，请务必向您的经纪商核实仓位大小和风险参数。',
    eduTitle: '如何使用手数计算器',
    eduP1: <>仓位管理是交易中<strong className="text-kmf-text-primary">最重要的风险管理技能</strong>。完美的入场配上错误的手数，也可能爆掉你的账户。平庸的入场配上正确的手数，能让你留在场内。</>,
    formulaTitle: '公式',
    formula: '手数 = 风险金额 ÷（Stop Loss 点数 × 每手 pip 价值）',
    eduP2: <>其中<strong className="text-kmf-text-primary">风险金额</strong> = 账户余额 × 风险百分比。如果你有 $10,000 的账户、冒险 1%，你的风险金额是 $100。</>,
    truncTitle: '为什么是截断而非四舍五入？',
    eduP3: <>本计算器使用<strong className="text-kmf-text-primary">截断（向下取整）</strong>而非四舍五入。如果计算得出 0.837 手，我们显示 0.83 — 而不是 0.84。向上取整意味着冒险<em>超过</em>你想要的百分比。专业的风险管理总是偏向谨慎一侧。</>,
    ruleTitle: '1% 法则',
    eduP4: '单笔交易冒险绝不超过账户的 1-2%。以 1% 风险，你可以连续亏损 10 笔仍保有 90% 的资金。以 5% 风险，10 次亏损只剩 60% — 仅为回到盈亏平衡就需要 67% 的盈利。',
    faqHeading: '常见问题',
    relatedHeading: '相关文章',
    riskPerTrade: '单笔风险',
    riskLabels: { conservative: '保守', standard: '标准', moderate: '适中', aggressive: '激进' },
    searchPlaceholder: '搜索 340+ 个品种...',
    noFavorites: '暂无收藏。点击爱心添加。', noInstruments: '未找到品种',
    tabs: { all: '全部', favorites: '收藏', 'forex-majors': '主要货币', 'forex-crosses': '交叉货币', 'forex-exotics': '异国货币', crypto: '加密货币', metals: '金属', indices: '指数', energy: '能源', stocks: '股票', agriculture: '农产品', bonds: '债券', etfs: 'ETF' },
    faq: [
      { q: '交易中的手数是什么？', a: '手是交易仓位的标准化计量单位。在外汇中，1 标准手 = 10 万单位基础货币。迷你手 = 1 万单位（0.1 手），微型手 = 1,000 单位（0.01 手）。正确的手数是风险管理的基础。' },
      { q: '如何计算手数？', a: '手数 = 风险金额 ÷（Stop Loss 点数 × 每手 pip 价值）。先确定你愿意冒多少险（例如 $10,000 的 1% = $100），再除以你 stop loss 距离的美元价值。本计算器将整个过程自动化。' },
      { q: '标准、迷你和微型手有什么区别？', a: '标准手 = 1.00（10 万单位），迷你手 = 0.10（1 万单位），微型手 = 0.01（1,000 单位）。更小的手数能更精细地控制风险。大多数经纪商支持微型手（0.01）作为最小单位。' },
      { q: '为什么本计算器使用截断而非四舍五入？', a: '我们截断（向下取整）手数以避免过度冒险。如果计算得出 0.837 手，向上取整到 0.84 会让你的实际风险超过想要的百分比。截断到 0.83 始终让你保持在目标风险或以下。' },
      { q: '我应该使用多大的风险百分比？', a: '专业交易者通常每笔冒险 0.5%–2%。1% 法则是行业标准：单笔交易绝不冒险超过账户的 1%。超过 2% 为适中风险，超过 5% 为激进且不推荐。' },
      { q: '杠杆如何影响手数？', a: '杠杆不改变手数计算 — 它影响所需保证金。在 1:100 杠杆下，$100,000 的仓位只需 $1,000 保证金而非全额。杠杆越高，保证金越少，但你每 pip 的风险保持不变。' },
    ],
  },
};

// Fetch exchange rates (cached 1h in localStorage)
async function fetchExchangeRates() {
  const CACHE_KEY = 'kmf_exchange_rates';
  const CACHE_TTL = 3600000;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return data;
    }
  } catch {}
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const json = await res.json();
    if (json.result === 'success' && json.rates) {
      const rates = {};
      for (const [currency, rate] of Object.entries(json.rates)) {
        rates[`USD/${currency}`] = { rate };
        if (rate > 0) rates[`${currency}/USD`] = { rate: 1 / rate };
      }
      const crossPairs = [
        ['EUR','GBP'],['EUR','JPY'],['EUR','CHF'],['EUR','AUD'],['EUR','CAD'],['EUR','NZD'],
        ['GBP','JPY'],['GBP','CHF'],['GBP','AUD'],['GBP','CAD'],['GBP','NZD'],
        ['AUD','JPY'],['AUD','CHF'],['AUD','CAD'],['AUD','NZD'],
        ['NZD','JPY'],['NZD','CHF'],['NZD','CAD'],['CAD','JPY'],['CAD','CHF'],['CHF','JPY'],
      ];
      for (const [a, b] of crossPairs) {
        const rA = json.rates[a], rB = json.rates[b];
        if (rA && rB) { rates[`${a}/${b}`] = { rate: rB / rA }; rates[`${b}/${a}`] = { rate: rA / rB }; }
      }
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: rates, timestamp: Date.now() })); } catch {}
      return rates;
    }
  } catch {}
  return {};
}

/* ─── Risk Slider ─── */
function RiskSlider({ value, onChange, t }) {
  const color = value <= 2 ? '#00E676' : value <= 5 ? '#FFB300' : '#FF5252';
  const label = value <= 1 ? t.riskLabels.conservative : value <= 2 ? t.riskLabels.standard : value <= 5 ? t.riskLabels.moderate : t.riskLabels.aggressive;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-kmf-text-secondary">{t.riskPerTrade}</label>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>{label}</span>
          <div className="flex items-center bg-kmf-panel rounded-lg border border-white/5">
            <input type="number" value={value} onChange={e => onChange(Math.max(0.1, Math.min(100, parseFloat(e.target.value) || 0.1)))} className="w-16 bg-transparent text-right text-sm text-kmf-text-primary px-2 py-1 outline-none" step="0.1" min="0.1" max="100" />
            <span className="text-kmf-text-tertiary text-sm pr-2">%</span>
          </div>
        </div>
      </div>
      <input type="range" min="0.1" max="10" step="0.1" value={Math.min(value, 10)} onChange={e => onChange(parseFloat(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ background: 'linear-gradient(to right, #00E676 0%, #00E676 20%, #FFB300 50%, #FF5252 100%)', accentColor: color }} />
      <div className="flex justify-between text-[10px] text-kmf-text-tertiary mt-1"><span>0.1%</span><span>2%</span><span>5%</span><span>10%</span></div>
    </div>
  );
}

/* ─── Symbol Picker (inline dropdown panel) ─── */
function SymbolPickerPanel({ selected, onSelect, onClose, t }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kmf_fav_symbols') || '[]'); } catch { return []; }
  });
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const [highlightIdx, setHighlightIdx] = useState(-1);
  const listRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const handler = (e) => { if (panelRef.current && !panelRef.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const toggleFav = (symbol) => {
    const next = favorites.includes(symbol) ? favorites.filter(s => s !== symbol) : [...favorites, symbol];
    setFavorites(next);
    try { localStorage.setItem('kmf_fav_symbols', JSON.stringify(next)); } catch {}
  };

  const filtered = useMemo(() => {
    let list;
    if (activeTab === 'all') list = ALL_INSTRUMENTS;
    else if (activeTab === 'favorites') list = ALL_INSTRUMENTS.filter(i => favorites.includes(i.symbol));
    else list = CATEGORIES[activeTab]?.instruments || [];

    if (search.trim()) {
      const q = search.replace('/', '').toLowerCase();
      list = list.filter(i => i.symbol.replace('/', '').toLowerCase().includes(q) || i.label.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeTab, favorites]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && highlightIdx >= 0 && filtered[highlightIdx]) { onSelect(filtered[highlightIdx]); onClose(); }
    else if (e.key === 'Escape') onClose();
  }, [filtered, highlightIdx, onSelect, onClose]);

  useEffect(() => { setHighlightIdx(-1); }, [search, activeTab]);

  useEffect(() => {
    if (highlightIdx >= 0 && listRef.current) {
      const el = listRef.current.children[highlightIdx];
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIdx]);

  return (
    <div ref={panelRef} className="absolute z-50 left-0 right-0 mt-2 rounded-2xl overflow-hidden animate-fadeIn flex flex-col" style={{ background: 'rgba(15,17,21,0.98)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', maxHeight: 420 }}>
      {/* Search */}
      <div className="p-3 pb-0">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kmf-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input ref={inputRef} type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder={t.searchPlaceholder} className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-kmf-panel text-kmf-text-primary outline-none placeholder:text-kmf-text-tertiary border border-white/5 focus:border-kmf-accent/30 transition-colors" />
        </div>
      </div>

      {/* Tabs (scrollable) */}
      <div className="flex gap-1 overflow-x-auto px-3 py-2 scrollbar-hide">
        {TAB_KEYS.map(key => (
          <button key={key} onClick={() => setActiveTab(key)} className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full transition-colors font-medium whitespace-nowrap"
            style={key === activeTab
              ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' }
              : { color: '#8899A6' }}>
            {t.tabs[key]}{key !== 'all' && key !== 'favorites' && CATEGORIES[key] ? ` ${CATEGORIES[key].instruments.length}` : ''}
          </button>
        ))}
      </div>

      {/* List */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-2 pb-2" style={{ maxHeight: 300 }}>
        {filtered.length === 0 ? (
          <p className="text-center text-kmf-text-tertiary text-xs py-8">{activeTab === 'favorites' ? t.noFavorites : t.noInstruments}</p>
        ) : filtered.map((inst, idx) => {
          const isFav = favorites.includes(inst.symbol);
          const isSel = selected?.symbol === inst.symbol;
          const isHl = idx === highlightIdx;
          const cat = Object.entries(CATEGORIES).find(([, c]) => c.instruments.includes(inst));
          const catColor = cat ? cat[1].color : '#4FC3F7';
          const catLabel = cat ? cat[1].label : '';
          return (
            <button key={inst.symbol} onClick={() => { onSelect(inst); onClose(); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 transition-all text-left hover:bg-white/[0.04]"
              style={isSel ? { background: 'rgba(79,195,247,0.08)' } : isHl ? { background: 'rgba(255,255,255,0.06)' } : {}}>
              {/* Favorite heart */}
              <span onClick={e => { e.stopPropagation(); toggleFav(inst.symbol); }} className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/5 cursor-pointer">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={isFav ? '#FF5252' : 'none'} stroke={isFav ? '#FF5252' : '#555'} strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </span>
              <span className="text-sm font-semibold text-kmf-text-primary w-24 flex-shrink-0">{inst.symbol}</span>
              <span className="text-xs text-kmf-text-tertiary flex-1 truncate">{inst.label !== inst.symbol ? inst.label : ''}</span>
              <span className="text-[10px] font-medium flex-shrink-0" style={{ color: catColor }}>{catLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Number Input ─── */
function NumberInput({ label, value, onChange, placeholder, suffix, step = 'any', min = 0 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-kmf-text-secondary mb-2">{label}</label>
      <div className="flex items-center rounded-xl overflow-hidden" style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <input type="number" inputMode="decimal" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} step={step} min={min} className="flex-1 bg-transparent px-4 py-3 text-sm text-kmf-text-primary outline-none placeholder:text-kmf-text-tertiary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
        {suffix && <span className="text-kmf-text-tertiary text-sm pr-4">{suffix}</span>}
      </div>
    </div>
  );
}

/* ─── Result Stat ─── */
function ResultStat({ label, value, sub, color = '#4FC3F7' }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: `${color}08`, border: `1px solid ${color}15` }}>
      <p className="text-[11px] text-kmf-text-tertiary mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold" style={{ color, letterSpacing: '-0.02em' }}>{value}</p>
      {sub && <p className="text-[10px] text-kmf-text-tertiary mt-0.5">{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function LotCalculatorPage() {
  const { lang } = useLanguage();
  const t = T[lang] || T.en;
  const [balance, setBalance] = useState('10000');
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [riskPercent, setRiskPercent] = useState(1.0);
  const [instrument, setInstrument] = useState(ALL_INSTRUMENTS[0]);
  const [isCustom, setIsCustom] = useState(false);
  const [customContract, setCustomContract] = useState('100000');
  const [customPipSize, setCustomPipSize] = useState('0.0001');
  const [customQuote, setCustomQuote] = useState('USD');
  const [entry, setEntry] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [leverage, setLeverage] = useState(100);
  const [exchangeRates, setExchangeRates] = useState({});
  const [ratesLoaded, setRatesLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [rateSource, setRateSource] = useState('loading');
  useEffect(() => {
    fetchExchangeRates().then(r => {
      setExchangeRates(r);
      setRatesLoaded(true);
      setRateSource(Object.keys(r).length > 20 ? 'live' : 'fallback');
    });
  }, []);

  // SEO
  useEffect(() => {
    document.title = t.pageTitle;
    const set = (s, a, v) => { const el = document.querySelector(s); if (el) el.setAttribute(a, v); };
    set('meta[name="description"]', 'content', t.pageDesc);
    set('link[rel="canonical"]', 'href', PAGE_URL);
    set('meta[property="og:url"]', 'content', PAGE_URL);
    set('meta[property="og:title"]', 'content', t.pageTitle);
    set('meta[property="og:description"]', 'content', t.pageDesc);
    set('meta[property="og:image"]', 'content', OG_IMAGE);
    set('meta[property="og:image:width"]', 'content', '1200');
    set('meta[property="og:image:height"]', 'content', '630');
    set('meta[property="og:image:alt"]', 'content', t.ogAlt);
    set('meta[property="og:type"]', 'content', 'website');
    set('meta[name="twitter:card"]', 'content', 'summary_large_image');
    set('meta[name="twitter:url"]', 'content', PAGE_URL);
    set('meta[name="twitter:title"]', 'content', t.pageTitle);
    set('meta[name="twitter:description"]', 'content', t.pageDesc);
    set('meta[name="twitter:image"]', 'content', OG_IMAGE);
    set('meta[name="twitter:image:alt"]', 'content', t.ogAlt);
    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      set('link[rel="canonical"]', 'href', 'https://kmfjournal.com/');
      set('meta[property="og:url"]', 'content', 'https://kmfjournal.com/');
      set('meta[name="twitter:url"]', 'content', 'https://kmfjournal.com/');
      set('meta[name="twitter:title"]', 'content', 'K.M.F. Trading Journal – Keep Moving Forward');
      set('meta[name="twitter:description"]', 'content', 'Professional trading journal for forex, stocks & crypto. Track, analyze and improve your trading performance.');
    };
  }, [t]);

  const activeSymbol = useMemo(() => {
    if (isCustom) return { ...CUSTOM_INSTRUMENT, contractSize: parseFloat(customContract) || 100000, pipSize: parseFloat(customPipSize) || 0.0001, quoteCurrency: customQuote };
    return instrument;
  }, [isCustom, instrument, customContract, customPipSize, customQuote]);

  const result = useMemo(() => calculateLotSize({
    balance: parseFloat(balance) || 0, accountCurrency, riskPercent,
    entry: parseFloat(entry) || 0, stopLoss: parseFloat(stopLoss) || 0,
    takeProfit: takeProfit ? parseFloat(takeProfit) : null,
    symbol: activeSymbol, leverage, exchangeRates,
  }), [balance, accountCurrency, riskPercent, entry, stopLoss, takeProfit, activeSymbol, leverage, exchangeRates]);

  const hasResult = result.lotSize > 0 && !result.hasError;
  const cs = CURRENCY_SYMBOLS[accountCurrency] || accountCurrency + ' ';
  const trackedRef = useRef(false);
  useEffect(() => {
    if (hasResult && !trackedRef.current) {
      trackedRef.current = true;
      window.gtag?.('event', 'calculator_used', { instrument: activeSymbol.symbol, account_currency: accountCurrency });
    }
  }, [hasResult, activeSymbol.symbol, accountCurrency]);

  const handleReset = useCallback(() => {
    setBalance('10000'); setAccountCurrency('USD'); setRiskPercent(1.0);
    setInstrument(ALL_INSTRUMENTS[0]); setIsCustom(false);
    setEntry(''); setStopLoss(''); setTakeProfit(''); setLeverage(100);
    trackedRef.current = false;
  }, []);

  const handleCopyResults = useCallback(() => {
    if (!hasResult) return;
    const text = `Lot Size: ${result.lotSize.toFixed(2)} | Risk: ${cs}${result.riskAmount.toFixed(2)} | Pip Value: ${cs}${result.pipValue.toFixed(2)} | Margin: ${cs}${result.marginRequired.toFixed(2)} | SL: ${result.stopLossPips.toFixed(1)} pips${result.takeProfitPips > 0 ? ` | TP: ${result.takeProfitPips.toFixed(1)} pips | R:R 1:${result.riskRewardRatio.toFixed(2)}` : ''} — ${activeSymbol.symbol} | kmfjournal.com/tools/lot-size-calculator`;
    navigator.clipboard.writeText(text).catch(() => {});
    window.gtag?.('event', 'calculator_share', { instrument: activeSymbol.symbol });
  }, [hasResult, result, cs, activeSymbol.symbol]);

  return (
    <>
      <Navbar />

      {/* JSON-LD schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'K.M.F. Lot Size Calculator', url: PAGE_URL, description: t.pageDesc, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, author: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com' } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com/' }, { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kmfjournal.com/tools' }, { '@type': 'ListItem', position: 3, name: 'Lot Size Calculator', item: PAGE_URL }] }) }} />

      <main id="main-content" className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">{t.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">{t.tools}</span>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">{t.breadcrumbTool}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-10 animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
              <span className="gradient-text">Lot Size</span>{' '}
              <span className="text-kmf-text-primary">Calculator</span>
            </h1>
            <p className="text-kmf-text-secondary max-w-2xl mx-auto text-lg">
              {t.heroP}
            </p>
          </div>

          {/* ═══ CALCULATOR ═══ */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'rgba(26,29,36,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Top: Inputs + Results side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* LEFT: Inputs */}
              <div className="p-6 lg:p-8 space-y-5 lg:border-r border-white/5">

                {/* Balance + Currency */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <NumberInput label={t.accountBalance} value={balance} onChange={setBalance} placeholder="10000" suffix={accountCurrency} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-kmf-text-secondary mb-2">{t.currency}</label>
                    <select value={accountCurrency} onChange={e => setAccountCurrency(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-kmf-text-primary outline-none appearance-none cursor-pointer" style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {ACCOUNT_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Risk */}
                <RiskSlider value={riskPercent} onChange={setRiskPercent} t={t} />

                {/* Instrument */}
                <div>
                  <label className="block text-sm font-medium text-kmf-text-secondary mb-2">{t.instrument}</label>
                  <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => setIsCustom(false)} className="text-xs px-3 py-1 rounded-full transition-colors" style={!isCustom ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.08)' }}>{t.preset}</button>
                    <button onClick={() => setIsCustom(true)} className="text-xs px-3 py-1 rounded-full transition-colors" style={isCustom ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.08)' }}>{t.custom}</button>
                  </div>

                  {!isCustom ? (
                    <div className="relative">
                      <button onClick={() => setShowPicker(!showPicker)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all hover:border-white/12" style={{ background: 'rgba(26,29,36,0.85)', border: `1px solid ${showPicker ? 'rgba(79,195,247,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                        <div>
                          <p className={instrument ? 'text-sm font-medium text-kmf-text-primary' : 'text-sm text-kmf-text-tertiary'}>
                            {instrument ? `${instrument.symbol} — ${instrument.label}` : t.selectInstrument}
                          </p>
                        </div>
                        <svg className={`w-4 h-4 text-kmf-text-tertiary transition-transform ${showPicker ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {showPicker && <SymbolPickerPanel selected={instrument} onSelect={i => { setInstrument(i); trackedRef.current = false; window.gtag?.('event', 'instrument_selected', { instrument: i.symbol }); }} onClose={() => setShowPicker(false)} t={t} />}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.1)' }}>
                      <NumberInput label={t.contractSize} value={customContract} onChange={setCustomContract} placeholder="100000" />
                      <NumberInput label={t.pipSize} value={customPipSize} onChange={setCustomPipSize} placeholder="0.0001" />
                      <div>
                        <label className="block text-sm font-medium text-kmf-text-secondary mb-2">{t.quoteCcy}</label>
                        <select value={customQuote} onChange={e => setCustomQuote(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm text-kmf-text-primary outline-none appearance-none cursor-pointer" style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {ACCOUNT_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Entry / SL / TP */}
                <div className="grid grid-cols-3 gap-3">
                  <NumberInput label={t.entryPrice} value={entry} onChange={setEntry} placeholder="1.08500" />
                  <NumberInput label={t.stopLoss} value={stopLoss} onChange={setStopLoss} placeholder="1.08200" />
                  <NumberInput label={t.takeProfit} value={takeProfit} onChange={setTakeProfit} placeholder="1.09100" />
                </div>

                {/* Leverage */}
                <div>
                  <label className="block text-sm font-medium text-kmf-text-secondary mb-2">{t.leverage}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {LEVERAGE_OPTIONS.map(lev => (
                      <button key={lev} onClick={() => setLeverage(lev)} className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={lev === leverage ? { background: 'rgba(79,195,247,0.15)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.06)' }}>
                        1:{lev}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rate status — hidden on fallback (don't advertise unreliable rates) */}
                {rateSource !== 'fallback' && (
                  <div className="flex items-center gap-2 text-xs text-kmf-text-tertiary">
                    <div className={`w-2 h-2 rounded-full ${rateSource === 'live' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
                    {rateSource === 'live' ? t.ratesLive : t.ratesLoading}
                  </div>
                )}
              </div>

              {/* RIGHT: Results */}
              <div className="p-6 lg:p-8">
                {!entry || !stopLoss ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 lg:py-0">
                    <div className="text-5xl mb-4 opacity-20">📐</div>
                    <p className="text-kmf-text-tertiary text-sm">{t.emptyPrompt}</p>
                  </div>
                ) : result.hasError ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 lg:py-0">
                    <div className="text-4xl mb-3">⚠️</div>
                    <p className="text-red-400 text-sm font-medium text-center">{result.errorMessage}</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Hero: LOT SIZE */}
                    <div className="text-center py-4">
                      <p className="text-xs text-kmf-text-tertiary uppercase tracking-[0.2em] mb-2">{t.positionSize}</p>
                      <p className="text-6xl sm:text-7xl font-extrabold gradient-text" style={{ letterSpacing: '-0.04em' }}>
                        {result.lotSize.toFixed(2)}
                      </p>
                      <p className="text-kmf-text-tertiary text-sm mt-2">{t.standardLotsSub}</p>
                    </div>

                    {/* Risk Summary — "Risking X to make Y" */}
                    <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.1)' }}>
                      <p className="text-sm text-kmf-text-secondary">
                        {t.risking} <span className="font-bold text-red-400">{cs}{result.riskAmount.toFixed(2)}</span>
                        {result.takeProfitPips > 0 && (
                          <> {t.toMake} <span className="font-bold text-green-400">{cs}{(result.balanceAfterWin - (parseFloat(balance) || 0)).toFixed(2)}</span>
                          <span className="text-kmf-text-tertiary ml-1.5 text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0,230,118,0.1)', color: '#00E676' }}>R:R 1:{result.riskRewardRatio.toFixed(1)}</span></>
                        )}
                      </p>
                    </div>

                    {/* Lot breakdown: Standard / Mini / Micro */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.12)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">{t.standard}</p>
                        <p className="text-xl font-bold text-kmf-accent">{result.standardLots.toFixed(2)}</p>
                        <p className="text-[10px] text-kmf-text-tertiary">{t.lots}</p>
                      </div>
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(38,198,218,0.06)', border: '1px solid rgba(38,198,218,0.12)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">{t.mini}</p>
                        <p className="text-xl font-bold" style={{ color: '#26C6DA' }}>{result.miniLots.toFixed(1)}</p>
                        <p className="text-[10px] text-kmf-text-tertiary">{t.lots}</p>
                      </div>
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(0,188,212,0.06)', border: '1px solid rgba(0,188,212,0.12)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-wider mb-1">{t.micro}</p>
                        <p className="text-xl font-bold" style={{ color: '#00BCD4' }}>{result.microLots.toFixed(0)}</p>
                        <p className="text-[10px] text-kmf-text-tertiary">{t.lots}</p>
                      </div>
                    </div>

                    {/* Key metrics grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <ResultStat label={t.riskAmount} value={`${cs}${result.riskAmount.toFixed(2)}`} color="#FF5252" />
                      <ResultStat label={t.marginRequired} value={`${cs}${result.marginRequired.toFixed(2)}`} color="#FFB300" />
                      <ResultStat label={t.pipValue} value={`${cs}${result.pipValue.toFixed(2)}`} color="#4FC3F7" />
                      <ResultStat label={t.slDistance} value={`${result.stopLossPips.toFixed(1)} pips`} color="#CE93D8" />
                    </div>

                    {/* TP / R:R */}
                    {result.takeProfitPips > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        <ResultStat label={t.tpDistance} value={`${result.takeProfitPips.toFixed(1)} pips`} color="#00E676" />
                        <ResultStat label={t.rrRatio} value={`1:${result.riskRewardRatio.toFixed(2)}`} color="#00E676" />
                        <ResultStat label={t.potentialWin} value={`${cs}${(result.balanceAfterWin - (parseFloat(balance) || 0)).toFixed(2)}`} color="#00E676" />
                      </div>
                    )}

                    {/* Balance after */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,82,82,0.05)', border: '1px solid rgba(255,82,82,0.1)' }}>
                        <p className="text-[10px] text-kmf-text-tertiary mb-0.5">{t.balanceAfterLoss}</p>
                        <p className="text-sm font-bold text-red-400">{cs}{result.balanceAfterLoss.toFixed(2)}</p>
                      </div>
                      {result.balanceAfterWin > 0 && (
                        <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.1)' }}>
                          <p className="text-[10px] text-kmf-text-tertiary mb-0.5">{t.balanceAfterWin}</p>
                          <p className="text-sm font-bold text-green-400">{cs}{result.balanceAfterWin.toFixed(2)}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions: Copy + Reset */}
                    <div className="flex gap-2">
                      <button onClick={handleCopyResults} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-kmf-text-secondary transition-all hover:text-kmf-accent" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.1)' }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        {t.copyResults}
                      </button>
                      <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-kmf-text-secondary transition-all hover:text-red-400" style={{ background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.1)' }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        {t.reset}
                      </button>
                    </div>

                    {/* Warning */}
                    {result.warningMessage && (
                      <div className="p-3 rounded-xl text-xs text-yellow-300" style={{ background: 'rgba(255,179,0,0.06)', border: '1px solid rgba(255,179,0,0.12)' }}>
                        {result.warningMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom bar: CTA */}
            <div className="flex justify-center py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <a href="https://play.google.com/store/apps/details?id=com.kmf.tradingjournal" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, rgba(255,179,0,0.12), rgba(255,143,0,0.06))', border: '1px solid rgba(255,179,0,0.2)' }}>
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#FFB300"><path d="M3 20.5v-17c0-.83.52-1.28 1-1.5l9 9-9 9c-.48-.22-1-.67-1-1.5zm14.5-7.5L6.27 2.96l8.97 5.18L17.5 13zm-10.77 9.54l8.97-5.18-2.46-1.42L6.73 22.54zM21 12l-3.5-2-2.74 1.58L17.5 13 21 12z" /></svg>
                <span className="text-sm" style={{ color: '#FFB300' }}><strong>{t.wantMobile}</strong> <span className="text-kmf-text-tertiary">{t.freeOnPlay}</span></span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg flex-shrink-0" style={{ background: 'rgba(255,179,0,0.15)', color: '#FFB300' }}>{t.download}</span>
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-kmf-text-tertiary mt-4 max-w-2xl mx-auto leading-relaxed" style={{ opacity: 0.6 }}>
            {t.disclaimer}
          </p>

          {/* ═══ EDUCATIONAL CONTENT ═══ */}
          <div className="max-w-3xl mx-auto mb-16 mt-16">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>{t.eduTitle}</h2>
            <div className="space-y-4 text-kmf-text-secondary text-sm leading-relaxed">
              <p>{t.eduP1}</p>
              <h3 className="text-lg font-bold text-kmf-text-primary mt-6">{t.formulaTitle}</h3>
              <div className="rounded-xl p-4 font-mono text-sm" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.12)', color: '#4FC3F7' }}>
                {t.formula}
              </div>
              <p>{t.eduP2}</p>
              <h3 className="text-lg font-bold text-kmf-text-primary mt-6">{t.truncTitle}</h3>
              <p>{t.eduP3}</p>
              <h3 className="text-lg font-bold text-kmf-text-primary mt-6">{t.ruleTitle}</h3>
              <p>{t.eduP4}</p>
            </div>
          </div>

          {/* ═══ FAQ ═══ */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-kmf-text-primary mb-6" style={{ letterSpacing: '-0.02em' }}>{t.faqHeading}</h2>
            <div className="space-y-2">
              {t.faq.map((faq, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: 'rgba(26,29,36,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                    <span className="text-sm font-medium text-kmf-text-primary">{faq.q}</span>
                    <svg className={`w-4 h-4 text-kmf-text-tertiary flex-shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openFaq === i && <div className="px-5 pb-4 text-sm text-kmf-text-secondary leading-relaxed animate-fadeIn">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* ═══ RELATED ARTICLES ═══ */}
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-xl font-bold text-kmf-text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>{t.relatedHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { slug: '1-percent-risk-rule', title: "The 1% Risk Rule: Why It's Non-Negotiable", cat: 'Risk Management', color: '#00C853' },
                { slug: 'position-sizing-guide', title: 'Position Sizing Guide: The Math Behind Survival', cat: 'Risk Management', color: '#00C853' },
                { slug: 'how-to-set-stop-loss', title: 'How to Set Stop Loss Without Getting Stopped Out', cat: 'Risk Management', color: '#00C853' },
                { slug: 'prop-firm-daily-drawdown-guide', title: 'Prop Firm Daily Drawdown Guide', cat: 'Risk Management', color: '#00C853' },
              ].map(a => (
                <Link key={a.slug} to={`/blog/${a.slug}`} className="block rounded-xl p-4 transition-all hover:border-white/10 group" style={{ background: 'rgba(26,29,36,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${a.color}14`, color: a.color }}>{a.cat}</span>
                  <p className="text-sm font-medium text-kmf-text-primary mt-2 group-hover:text-kmf-accent transition-colors">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />

    </>
  );
}
