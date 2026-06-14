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

// ─── German templates (trading terms kept English; texts match the DE library) ───
const STARTER_TEMPLATES_DE = [
  {
    id: 'blank',
    name: 'Bei null anfangen',
    description: 'Leere Checkliste. Bau sie nach deinem Geschmack — aus der Vorschlagsbibliothek oder mit eigenen Punkten.',
    categories: [],
  },
  {
    id: 'forex-day',
    name: 'Forex Day-Trader',
    description: 'Für Intraday-FX. London-/NY-Sessions, enges Risiko, schnelle Ausführung.',
    categories: [
      { name: 'Marktkontext', items: [
        'Keine High-Impact-News in den nächsten 30 Minuten',
        'Ich trade in der London- oder NY-Session',
        'Der Spread ist normal (nicht vor News oder durch geringe Liquidität geweitet)',
      ] },
      { name: 'Setup', items: [
        'Dieses Setup erfüllt meine Strategie-Regeln zu 100% — nicht zu 80%',
        'Die Higher-Timeframe-Richtung bestätigt meine Einstiegsrichtung',
        'Ich kann den Einstiegsgrund in EINEM Satz beschreiben',
      ] },
      { name: 'Risiko', items: [
        'Positionsgröße = 1% des Kontos oder weniger',
        'Der Stop Loss ist vordefiniert, an der Struktur platziert',
        'Das R:R ist mindestens 1:2, bevor ich den Trade in Betracht ziehe',
      ] },
      { name: 'Psychologie', items: [
        'Emotionaler Zustand jetzt: ruhig und fokussiert',
        'Ich steige nicht aus FOMO ein (Angst, die Bewegung zu verpassen)',
      ] },
      { name: 'Ausführung', items: [
        'Einstieg, SL, TP und Lot-Size dreifach geprüft — keine Tippfehler',
        'Trade-Begründung vor der Ausführung im Journal festgehalten',
      ] },
    ],
  },
  {
    id: 'swing',
    name: 'Swing-Trader',
    description: 'Haltedauer von mehreren Tagen bis Wochen, jeder Markt. HTF-zuerst-Entscheidungen.',
    categories: [
      { name: 'Marktkontext', items: [
        'Der Higher-Timeframe-Bias (Daily/Weekly) ist klar und notiert',
        'Kein großes Ereignis (Earnings, CPI, Zentralbank) innerhalb der Trade-Dauer',
      ] },
      { name: 'Setup', items: [
        'Mindestens 2 unabhängige Konfluenzen sind vorhanden',
        'Schlüsselzonen (S/R, Supply/Demand) im Chart markiert',
        'Ich kann den Einstiegsgrund in EINEM Satz beschreiben',
      ] },
      { name: 'Risiko', items: [
        'Positionsgröße = 1% des Kontos oder weniger',
        'Der Stop Loss ist vordefiniert, an der Struktur platziert',
        'Das R:R ist mindestens 1:3',
        'Komfortabel, bei Bedarf über das Wochenende zu halten',
      ] },
      { name: 'Plan nach dem Trade', items: [
        'Management-Plan festgelegt: Set & Forget, Teilverkäufe oder Trailing',
        'Ich weiß, was dieses Setup ungültig macht, bevor der SL greift',
        'Break-even-Regel definiert (z. B. erst nach +1R auf BE ziehen)',
      ] },
      { name: 'Psychologie', items: [
        'Ich jage NICHT — das Setup bildete sich, bevor ich die Bewegung bemerkte',
        'Ich bin bereit, nach dem Einstieg vom Bildschirm wegzugehen',
      ] },
    ],
  },
  {
    id: 'prop-firm',
    name: 'Prop-Firm-Challenge',
    description: 'Für Funded-Konten. Drawdown-Regeln dominieren jede Entscheidung.',
    categories: [
      { name: 'Prop-Firm-Regeln', items: [
        'Dieser Trade hält mich unter dem Daily-Drawdown-Limit',
        'Dieser Trade hält mich unter dem gesamten Max-Drawdown-Limit',
        'Risiko pro Trade ist konsistent mit den Vortagen (kein Verdoppeln)',
        'Kein verbotenes Halten über das Wochenende (Firmenregeln prüfen)',
        'Kein verbotenes News-Trading (Firmenregeln prüfen)',
      ] },
      { name: 'Setup', items: [
        'Dieses Setup erfüllt meine Strategie-Regeln zu 100% — nicht zu 80%',
        'Die Higher-Timeframe-Richtung bestätigt meine Einstiegsrichtung',
      ] },
      { name: 'Risiko', items: [
        'Positionsgröße = 0.5% des Kontos (konservativer Modus)',
        'Der Stop Loss ist vordefiniert und gegen mich unverrückbar',
        'Das R:R ist mindestens 1:2',
        'Keine korrelierte offene Position, die mein echtes Exposure verdoppelt',
      ] },
      { name: 'Psychologie', items: [
        'Ich versuche nicht, nach einem schlechten Tag „aufzuholen"',
        'Emotionaler Zustand jetzt: ruhig und fokussiert',
      ] },
      { name: 'Ausführung', items: [
        'Richtiges Trading-Konto ausgewählt (Prop, nicht Live oder Demo)',
        'Dreifach geprüft: Richtung, Size, SL, TP',
      ] },
    ],
  },
  {
    id: 'crypto',
    name: 'Krypto-Trader',
    description: '24/7-Märkte, Perps, Funding Rates, Gap-Risiko, während du schläfst.',
    categories: [
      { name: 'Marktkontext', items: [
        'Mir bewusst, dass Krypto 24/7 läuft — ich habe einen Plan, falls ich durch Volatilität schlafe',
        'Kein großes Makro-Ereignis in den nächsten 24 Stunden',
      ] },
      { name: 'Setup', items: [
        'Dieses Setup erfüllt meine Strategie-Regeln zu 100% — nicht zu 80%',
        'Die Higher-Timeframe-Richtung bestätigt meine Einstiegsrichtung',
        'Ich kann den Einstiegsgrund in EINEM Satz beschreiben',
      ] },
      { name: 'Krypto-Mechanik', items: [
        'Funding Rate geprüft (besonders bei Perpetuals)',
        'Der Liquidationspreis ist angesichts meines Leverage weit vom Einstieg entfernt',
        'Die Exchange ist die richtige für diesen Trade (Spot vs Perp)',
      ] },
      { name: 'Risiko', items: [
        'Positionsgröße = 1% des Kontos oder weniger',
        'Der Stop Loss ist vordefiniert, an der Struktur platziert',
        'Das R:R ist mindestens 1:2',
      ] },
      { name: 'Psychologie', items: [
        'Ich steige nicht aus FOMO ein (Angst, die Bewegung zu verpassen)',
        'Emotionaler Zustand jetzt: ruhig und fokussiert',
      ] },
    ],
  },
];

// ─── French templates (trading terms kept English; texts match the FR library) ───
const STARTER_TEMPLATES_FR = [
  {
    id: 'blank',
    name: 'Partir de zéro',
    description: 'Checklist vide. Construisez-la à votre façon, depuis la bibliothèque de suggestions ou avec vos propres éléments.',
    categories: [],
  },
  {
    id: 'forex-day',
    name: 'Day Trader Forex',
    description: 'Pour le FX intraday. Sessions London/NY, risque serré, exécution rapide.',
    categories: [
      { name: 'Contexte de marché', items: [
        'Aucune news à fort impact dans les 30 prochaines minutes',
        'Je trade pendant la session London ou NY',
        'Le spread est normal (pas élargi avant news ou par faible liquidité)',
      ] },
      { name: 'Setup', items: [
        'Ce setup respecte mes règles de stratégie à 100 % — pas à 80 %',
        'La direction en higher-timeframe confirme ma direction d\'entrée',
        'Je peux décrire la raison de l\'entrée en UNE seule phrase',
      ] },
      { name: 'Risque', items: [
        'Taille de position = 1 % du compte ou moins',
        'Le stop loss est prédéfini, placé sur la structure',
        'Le R:R est d\'au moins 1:2 avant que je considère le trade',
      ] },
      { name: 'Psychologie', items: [
        'État émotionnel maintenant : calme et concentré',
        'Je n\'entre pas par FOMO (peur de rater le mouvement)',
      ] },
      { name: 'Exécution', items: [
        'Entrée, SL, TP et taille de lot vérifiés trois fois — aucune faute de frappe',
        'Raison du trade consignée dans le journal avant l\'exécution',
      ] },
    ],
  },
  {
    id: 'swing',
    name: 'Swing Trader',
    description: 'Détentions de plusieurs jours à plusieurs semaines, tout marché. Décisions HTF d\'abord.',
    categories: [
      { name: 'Contexte de marché', items: [
        'Le biais en higher-timeframe (daily/weekly) est clair et noté',
        'Aucun événement majeur (earnings, CPI, banque centrale) pendant la durée du trade',
      ] },
      { name: 'Setup', items: [
        'Au moins 2 confluences indépendantes sont présentes',
        'Les niveaux clés (S/R, supply/demand) marqués sur le graphique',
        'Je peux décrire la raison de l\'entrée en UNE seule phrase',
      ] },
      { name: 'Risque', items: [
        'Taille de position = 1 % du compte ou moins',
        'Le stop loss est prédéfini, placé sur la structure',
        'Le R:R est d\'au moins 1:3',
        'À l\'aise pour tenir le week-end si nécessaire',
      ] },
      { name: 'Plan post-trade', items: [
        'Plan de gestion décidé : set & forget, partiels ou trailing',
        'Je sais ce qui invalide ce setup avant que le SL ne soit touché',
        'Règle de break-even définie (ex. passer à BE seulement après +1R)',
      ] },
      { name: 'Psychologie', items: [
        'Je ne cours PAS après le prix — le setup s\'est formé avant que je remarque le mouvement',
        'Je suis prêt à m\'éloigner de l\'écran après l\'entrée',
      ] },
    ],
  },
  {
    id: 'prop-firm',
    name: 'Challenge Prop Firm',
    description: 'Pour les comptes funded. Les règles de drawdown dominent chaque décision.',
    categories: [
      { name: 'Règles Prop Firm', items: [
        'Ce trade me maintient sous la limite de daily drawdown',
        'Ce trade me maintient sous la limite totale de max drawdown',
        'Le risque par trade est cohérent avec les jours précédents (pas de doublement)',
        'Aucune détention interdite le week-end (vérifier les règles de la firme)',
        'Aucun trading sur news interdit (vérifier les règles de la firme)',
      ] },
      { name: 'Setup', items: [
        'Ce setup respecte mes règles de stratégie à 100 % — pas à 80 %',
        'La direction en higher-timeframe confirme ma direction d\'entrée',
      ] },
      { name: 'Risque', items: [
        'Taille de position = 0.5 % du compte (mode conservateur)',
        'Le stop loss est prédéfini et inamovible contre moi',
        'Le R:R est d\'au moins 1:2',
        'Aucune position corrélée ouverte qui double mon exposition réelle',
      ] },
      { name: 'Psychologie', items: [
        'Je n\'essaie pas de « rattraper » après une mauvaise journée',
        'État émotionnel maintenant : calme et concentré',
      ] },
      { name: 'Exécution', items: [
        'Bon compte de trading sélectionné (prop, pas live ni démo)',
        'Vérifié trois fois : direction, taille, SL, TP',
      ] },
    ],
  },
  {
    id: 'crypto',
    name: 'Trader Crypto',
    description: 'Marchés 24/7, perps, funding rates, risque de gap pendant que vous dormez.',
    categories: [
      { name: 'Contexte de marché', items: [
        'Conscient que la crypto se trade 24/7 — j\'ai un plan si je dors pendant la volatilité',
        'Aucun événement macro majeur dans les 24 prochaines heures',
      ] },
      { name: 'Setup', items: [
        'Ce setup respecte mes règles de stratégie à 100 % — pas à 80 %',
        'La direction en higher-timeframe confirme ma direction d\'entrée',
        'Je peux décrire la raison de l\'entrée en UNE seule phrase',
      ] },
      { name: 'Mécanique crypto', items: [
        'Funding rate vérifié (surtout pour les perpetuals)',
        'Le prix de liquidation est loin de l\'entrée compte tenu de mon levier',
        'L\'exchange est le bon pour ce trade (spot vs perp)',
      ] },
      { name: 'Risque', items: [
        'Taille de position = 1 % du compte ou moins',
        'Le stop loss est prédéfini, placé sur la structure',
        'Le R:R est d\'au moins 1:2',
      ] },
      { name: 'Psychologie', items: [
        'Je n\'entre pas par FOMO (peur de rater le mouvement)',
        'État émotionnel maintenant : calme et concentré',
      ] },
    ],
  },
];

// ─── Russian templates (trading terms kept English; texts match the RU library) ───
const STARTER_TEMPLATES_RU = [
  {
    id: 'blank',
    name: 'Начать с нуля',
    description: 'Пустой чек-лист. Соберите его по-своему из библиотеки подсказок или своими пунктами.',
    categories: [],
  },
  {
    id: 'forex-day',
    name: 'Форекс дей-трейдер',
    description: 'Для внутридневного FX. Сессии London/NY, жёсткий риск, быстрое исполнение.',
    categories: [
      { name: 'Контекст рынка', items: [
        'Нет важных новостей в ближайшие 30 минут',
        'Я торгую в сессию London или NY',
        'Спред в норме (не расширен перед новостями или из-за низкой ликвидности)',
      ] },
      { name: 'Setup', items: [
        'Этот setup соответствует правилам стратегии на 100% — не на 80%',
        'Направление на старшем таймфрейме подтверждает моё направление входа',
        'Я могу описать причину входа ОДНИМ предложением',
      ] },
      { name: 'Риск', items: [
        'Размер позиции = 1% счёта или меньше',
        'Stop loss задан заранее, размещён на структуре',
        'R:R не менее 1:2, прежде чем я рассмотрю сделку',
      ] },
      { name: 'Психология', items: [
        'Эмоциональное состояние сейчас: спокоен и сосредоточен',
        'Я не вхожу из-за FOMO (страх упустить движение)',
      ] },
      { name: 'Исполнение', items: [
        'Вход, SL, TP и размер лота проверены трижды — без опечаток',
        'Причина сделки записана в журнал до исполнения',
      ] },
    ],
  },
  {
    id: 'swing',
    name: 'Свинг-трейдер',
    description: 'Удержание от нескольких дней до нескольких недель, любой рынок. Решения от старшего таймфрейма.',
    categories: [
      { name: 'Контекст рынка', items: [
        'Bias на старшем таймфрейме (daily/weekly) ясен и отмечен',
        'Нет крупного события (earnings, CPI, центробанк) внутри срока сделки',
      ] },
      { name: 'Setup', items: [
        'Присутствуют хотя бы 2 независимых конфлюенса',
        'Ключевые уровни (S/R, supply/demand) отмечены на графике',
        'Я могу описать причину входа ОДНИМ предложением',
      ] },
      { name: 'Риск', items: [
        'Размер позиции = 1% счёта или меньше',
        'Stop loss задан заранее, размещён на структуре',
        'R:R не менее 1:3',
        'Комфортно держать через выходные при необходимости',
      ] },
      { name: 'План после сделки', items: [
        'План управления выбран: set & forget, частичные закрытия или трейл',
        'Я знаю, что инвалидирует этот setup до срабатывания SL',
        'Правило безубытка задано (напр. перенос в BE только после +1R)',
      ] },
      { name: 'Психология', items: [
        'Я НЕ гонюсь за ценой — setup сформировался до того, как я заметил движение',
        'Я готов отойти от экрана после входа',
      ] },
    ],
  },
  {
    id: 'prop-firm',
    name: 'Челлендж Prop Firm',
    description: 'Для funded-счетов. Правила drawdown доминируют над каждым решением.',
    categories: [
      { name: 'Правила Prop Firm', items: [
        'Эта сделка удерживает меня под лимитом daily drawdown',
        'Эта сделка удерживает меня под общим лимитом max drawdown',
        'Риск на сделку согласован с предыдущими днями (без удвоения)',
        'Нет запрещённого удержания на выходных (проверь правила фирмы)',
        'Нет запрещённой торговли на новостях (проверь правила фирмы)',
      ] },
      { name: 'Setup', items: [
        'Этот setup соответствует правилам стратегии на 100% — не на 80%',
        'Направление на старшем таймфрейме подтверждает моё направление входа',
      ] },
      { name: 'Риск', items: [
        'Размер позиции = 0.5% счёта (консервативный режим)',
        'Stop loss задан заранее и неподвижен против меня',
        'R:R не менее 1:2',
        'Нет коррелирующей открытой позиции, удваивающей мою реальную экспозицию',
      ] },
      { name: 'Психология', items: [
        'Я не пытаюсь «отыграться» после плохого дня',
        'Эмоциональное состояние сейчас: спокоен и сосредоточен',
      ] },
      { name: 'Исполнение', items: [
        'Выбран правильный торговый счёт (prop, не live и не demo)',
        'Проверено трижды: направление, размер, SL, TP',
      ] },
    ],
  },
  {
    id: 'crypto',
    name: 'Крипто-трейдер',
    description: 'Рынки 24/7, перпетуалы, funding rates, риск гэпа, пока вы спите.',
    categories: [
      { name: 'Контекст рынка', items: [
        'Осознаю, что крипто торгуется 24/7 — у меня есть план, если просплю волатильность',
        'Нет крупного макрособытия в ближайшие 24 часа',
      ] },
      { name: 'Setup', items: [
        'Этот setup соответствует правилам стратегии на 100% — не на 80%',
        'Направление на старшем таймфрейме подтверждает моё направление входа',
        'Я могу описать причину входа ОДНИМ предложением',
      ] },
      { name: 'Механика крипто', items: [
        'Funding rate проверена (особенно для перпетуалов)',
        'Цена ликвидации далеко от входа с учётом моего плеча',
        'Биржа подходящая для этой сделки (spot vs perp)',
      ] },
      { name: 'Риск', items: [
        'Размер позиции = 1% счёта или меньше',
        'Stop loss задан заранее, размещён на структуре',
        'R:R не менее 1:2',
      ] },
      { name: 'Психология', items: [
        'Я не вхожу из-за FOMO (страх упустить движение)',
        'Эмоциональное состояние сейчас: спокоен и сосредоточен',
      ] },
    ],
  },
];

// ─── Japanese templates (trading terms kept English; texts match the JA library) ───
const STARTER_TEMPLATES_JA = [
  {
    id: 'blank',
    name: 'ゼロから始める',
    description: '空のチェックリスト。提案ライブラリや自分の項目で、好きなように作りましょう。',
    categories: [],
  },
  {
    id: 'forex-day',
    name: 'FX デイトレーダー',
    description: '日中のFX向け。London/NYセッション、タイトなリスク、速い執行。',
    categories: [
      { name: 'マーケット環境', items: [
        '今後30分以内に高インパクトのニュースがない',
        'London または NY セッションでトレードしている',
        'スプレッドが正常（ニュース前や低流動性での拡大がない）',
      ] },
      { name: 'Setup', items: [
        'このsetupは戦略ルールに100%合致 — 80%ではない',
        '上位足の方向がエントリー方向を裏付けている',
        'エントリー理由を1文で説明できる',
      ] },
      { name: 'リスク', items: [
        'ポジションサイズ = 口座の1%以下',
        'Stop lossは事前設定済み、構造に配置',
        'トレードを検討する前にR:Rが最低1:2',
      ] },
      { name: '心理', items: [
        '今の感情状態：冷静で集中している',
        'FOMO（動きを逃す恐怖）でエントリーしていない',
      ] },
      { name: '執行', items: [
        'エントリー、SL、TP、ロットサイズを3回確認 — 入力ミスなし',
        '執行前にトレード理由をジャーナルに記録',
      ] },
    ],
  },
  {
    id: 'swing',
    name: 'スイングトレーダー',
    description: '数日〜数週間の保有、あらゆる市場。上位足優先の判断。',
    categories: [
      { name: 'マーケット環境', items: [
        '上位足（daily/weekly）のバイアスが明確で記録済み',
        'トレード期間内に主要イベント（earnings、CPI、中央銀行）がない',
      ] },
      { name: 'Setup', items: [
        '少なくとも2つの独立したコンフルエンスがある',
        '主要レベル（S/R、supply/demand）がチャートに記されている',
        'エントリー理由を1文で説明できる',
      ] },
      { name: 'リスク', items: [
        'ポジションサイズ = 口座の1%以下',
        'Stop lossは事前設定済み、構造に配置',
        'R:Rが最低1:3',
        '必要なら週末を越えて保有できる',
      ] },
      { name: 'トレード後の計画', items: [
        '管理計画を決定：set & forget、部分決済、またはトレール',
        'SLが当たる前にこのsetupを無効にするものを知っている',
        '建値ルールを定義（例：+1Rの後にのみBEへ）',
      ] },
      { name: '心理', items: [
        '価格を追っていない — 動きに気づく前にsetupが形成された',
        'エントリー後に画面から離れる準備ができている',
      ] },
    ],
  },
  {
    id: 'prop-firm',
    name: 'Prop Firm チャレンジ',
    description: 'Funded口座向け。drawdownルールがすべての判断を支配する。',
    categories: [
      { name: 'Prop Firm ルール', items: [
        'このトレードでdaily drawdown上限を下回ったままにできる',
        'このトレードで総max drawdown上限を下回ったままにできる',
        '1トレードあたりのリスクが前日と一貫（倍増なし）',
        '禁止された週末保有がない（会社ルールを確認）',
        '禁止されたニューストレードがない（会社ルールを確認）',
      ] },
      { name: 'Setup', items: [
        'このsetupは戦略ルールに100%合致 — 80%ではない',
        '上位足の方向がエントリー方向を裏付けている',
      ] },
      { name: 'リスク', items: [
        'ポジションサイズ = 口座の0.5%（保守モード）',
        'Stop lossは事前設定済みで自分に不利に動かない',
        'R:Rが最低1:2',
        '実際のエクスポージャーを倍にする相関した建玉がない',
      ] },
      { name: '心理', items: [
        '悪い日の後に「取り戻そう」としていない',
        '今の感情状態：冷静で集中している',
      ] },
      { name: '執行', items: [
        '正しいトレード口座を選択（prop、liveやdemoでない）',
        '3回確認：方向、サイズ、SL、TP',
      ] },
    ],
  },
  {
    id: 'crypto',
    name: '仮想通貨トレーダー',
    description: '24/7の市場、perps、funding rates、寝ている間のギャップリスク。',
    categories: [
      { name: 'マーケット環境', items: [
        '仮想通貨は24/7と認識 — ボラティリティ中に寝ても計画がある',
        '今後24時間以内に主要なマクロイベントがない',
      ] },
      { name: 'Setup', items: [
        'このsetupは戦略ルールに100%合致 — 80%ではない',
        '上位足の方向がエントリー方向を裏付けている',
        'エントリー理由を1文で説明できる',
      ] },
      { name: '仮想通貨の仕組み', items: [
        'Funding rateを確認済み（特にperpetuals）',
        '自分のレバレッジを踏まえ清算価格がエントリーから遠い',
        'このトレードに適した取引所（spot vs perp）',
      ] },
      { name: 'リスク', items: [
        'ポジションサイズ = 口座の1%以下',
        'Stop lossは事前設定済み、構造に配置',
        'R:Rが最低1:2',
      ] },
      { name: '心理', items: [
        'FOMO（動きを逃す恐怖）でエントリーしていない',
        '今の感情状態：冷静で集中している',
      ] },
    ],
  },
];

// ─── Chinese templates (trading terms kept English; texts match the ZH library) ───
const STARTER_TEMPLATES_ZH = [
  {
    id: 'blank',
    name: '从零开始',
    description: '空白检查清单。用建议库或你自己的条目，按你的方式构建。',
    categories: [],
  },
  {
    id: 'forex-day',
    name: '外汇日内交易者',
    description: '用于日内 FX。London/NY 时段，严格风险，快速执行。',
    categories: [
      { name: '市场环境', items: [
        '未来 30 分钟内没有高影响新闻',
        '我在 London 或 NY 时段交易',
        '点差正常（没有新闻前或低流动性的扩大）',
      ] },
      { name: 'Setup', items: [
        '此 setup 100% 符合我的策略规则 — 不是 80%',
        '高周期方向确认了我的入场方向',
        '我能用一句话描述入场理由',
      ] },
      { name: '风险', items: [
        '仓位大小 = 账户的 1% 或更少',
        'Stop loss 已预先设定，放在结构处',
        '在考虑这笔交易之前 R:R 至少为 1:2',
      ] },
      { name: '心理', items: [
        '此刻的情绪状态：冷静且专注',
        '我不是因为 FOMO（怕错过行情）而入场',
      ] },
      { name: '执行', items: [
        '入场、SL、TP 和手数已三次核对 — 没有输入错误',
        '执行前交易理由已记入日志',
      ] },
    ],
  },
  {
    id: 'swing',
    name: '波段交易者',
    description: '持仓数天到数周，任何市场。以高周期为先的决策。',
    categories: [
      { name: '市场环境', items: [
        '高周期（daily/weekly）偏向清晰且已记录',
        '交易持续期内没有重大事件（earnings、CPI、央行）',
      ] },
      { name: 'Setup', items: [
        '至少存在 2 个独立的共振',
        '关键位（S/R、supply/demand）已在图上标出',
        '我能用一句话描述入场理由',
      ] },
      { name: '风险', items: [
        '仓位大小 = 账户的 1% 或更少',
        'Stop loss 已预先设定，放在结构处',
        'R:R 至少为 1:3',
        '必要时能安心持仓过周末',
      ] },
      { name: '交易后计划', items: [
        '已决定管理计划：set & forget、分批或移动止损',
        '我知道在 SL 触发前什么会使此 setup 失效',
        '已定义保本规则（例如仅在 +1R 后移到 BE）',
      ] },
      { name: '心理', items: [
        '我没有追价 — setup 在我注意到价格变动之前就已形成',
        '我准备好在入场后离开屏幕',
      ] },
    ],
  },
  {
    id: 'prop-firm',
    name: 'Prop Firm 挑战',
    description: '用于 funded 账户。drawdown 规则主导每个决策。',
    categories: [
      { name: 'Prop Firm 规则', items: [
        '这笔交易让我保持在 daily drawdown 上限之下',
        '这笔交易让我保持在总 max drawdown 上限之下',
        '单笔风险与前几天一致（没有翻倍）',
        '没有被禁止的周末持仓（查看公司规则）',
        '没有被禁止的新闻交易（查看公司规则）',
      ] },
      { name: 'Setup', items: [
        '此 setup 100% 符合我的策略规则 — 不是 80%',
        '高周期方向确认了我的入场方向',
      ] },
      { name: '风险', items: [
        '仓位大小 = 账户的 0.5%（保守模式）',
        'Stop loss 已预先设定且不会往不利方向移动',
        'R:R 至少为 1:2',
        '没有使我真实敞口翻倍的相关持仓',
      ] },
      { name: '心理', items: [
        '我没有在糟糕的一天后试图「赶回来」',
        '此刻的情绪状态：冷静且专注',
      ] },
      { name: '执行', items: [
        '已选择正确的交易账户（prop，不是 live 或 demo）',
        '已三次核对：方向、大小、SL、TP',
      ] },
    ],
  },
  {
    id: 'crypto',
    name: '加密货币交易者',
    description: '24/7 市场、perps、资金费率、睡觉时的跳空风险。',
    categories: [
      { name: '市场环境', items: [
        '清楚加密货币 24/7 — 若我睡过波动，我有计划',
        '未来 24 小时内没有重大宏观事件',
      ] },
      { name: 'Setup', items: [
        '此 setup 100% 符合我的策略规则 — 不是 80%',
        '高周期方向确认了我的入场方向',
        '我能用一句话描述入场理由',
      ] },
      { name: '加密货币机制', items: [
        '已查看资金费率（尤其是 perpetuals）',
        '考虑到我的杠杆，强平价远离入场',
        '该交易所适合这笔交易（spot vs perp）',
      ] },
      { name: '风险', items: [
        '仓位大小 = 账户的 1% 或更少',
        'Stop loss 已预先设定，放在结构处',
        'R:R 至少为 1:2',
      ] },
      { name: '心理', items: [
        '我不是因为 FOMO（怕错过行情）而入场',
        '此刻的情绪状态：冷静且专注',
      ] },
    ],
  },
];

const TEMPLATE_SETS = { ro: STARTER_TEMPLATES_RO, de: STARTER_TEMPLATES_DE, fr: STARTER_TEMPLATES_FR, ru: STARTER_TEMPLATES_RU, ja: STARTER_TEMPLATES_JA, zh: STARTER_TEMPLATES_ZH };

export function getStarterTemplates(lang) {
  return TEMPLATE_SETS[lang] || STARTER_TEMPLATES;
}
