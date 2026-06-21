import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function MetatraderPreTradeChecklistDe() {
  return (
    <BlogArticleLayout
      slug="metatrader-pre-trade-checklist"
      lang="de"
      title="Wie du eine Pre-Trade-Checkliste für MetaTrader und cTrader baust (mit 5 Regeln, die wirklich haften)"
      metaTitle="MetaTrader Pre-Trade-Checkliste: 5 Regeln vor jedem Einstieg | K.M.F."
      metaDescription="Eine praktische, plattformspezifische Pre-Trade-Checkliste für MetaTrader 4, MetaTrader 5 und cTrader. Fünf verpflichtende Checks vor jedem Trade-Einstieg, mit konkreten Beispielen."
      date="22. März 2026"
      dateISO="2026-03-22"
      readTime="8 Min. Lesezeit"
      category="Disziplin"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Was sollte eine MetaTrader-Pre-Trade-Checkliste enthalten?', answer: 'Fünf verpflichtende Checks: 1) Marktkontext und Higher-Timeframe-Richtung, 2) Ein spezifischer Entry-Trigger (nicht nur „sieht gut aus"), 3) Stop Loss an einem strukturellen Invalidierungspunkt, 4) Positionsgröße mit einem Risikorechner berechnet und 5) Minimum 1:2 Risk-Reward-Verhältnis auf dem Chart bestätigt.' },
        { question: 'Wie richte ich eine Pre-Trade-Checkliste in MetaTrader ein?', answer: 'MetaTrader hat keine eingebaute Checklisten-Funktion. Die meisten Trader nutzen einen physischen Klebezettel am Monitor, eine offene Textdatei neben der Plattform oder eine dedizierte Trading-Journal-App wie K.M.F. mit eingebauter Checklisten-Funktion, die du vor dem Loggen jedes Trades abschließt.' },
        { question: 'Was ist der Unterschied zwischen einer Pre-Trade-Checkliste für MT4 und cTrader?', answer: 'Die Checkliste selbst ist dieselbe — Marktkontext, Entry-Trigger, Stop Loss, Positionsgröße, Risk-Reward. Der einzige Unterschied ist, wo du rechnest: cTrader hat bessere eingebaute Risiko-Tools, während MT4/MT5-Trader oft einen externen Rechner oder EA für präzise Lot-Berechnung brauchen.' },
        { question: 'Wie viele Punkte sollten auf einer Trading-Checkliste stehen?', answer: 'Fünf. Nicht zehn, nicht fünfzehn. Fünf Punkte, die du in unter 60 Sekunden prüfen kannst. Wenn deine Checkliste länger als eine Minute dauert, wirst du sie an hektischen Tagen überspringen — und das sind genau die Tage, an denen du sie am meisten brauchst.' },
      ]}
      howToSteps={[
        { name: 'Higher-Timeframe-Kontext prüfen', text: 'Öffne den Tages- oder H4-Chart. Identifiziere den aktuellen Trend oder die Range. Dein Trade muss zu diesem Kontext passen oder eine explizite Counter-Trend-Begründung haben.' },
        { name: 'Einen spezifischen Entry-Trigger identifizieren', text: 'Definiere das exakte Candle-Muster, Indikator-Signal oder Preisniveau, das deinen Einstieg auslöst. „Sieht bullisch aus" ist kein Trigger.' },
        { name: 'Deinen Stop Loss auf dem Chart markieren', text: 'Platziere eine horizontale Linie auf deinem Stop-Loss-Niveau. Sie muss an einem strukturellen Invalidierungspunkt sein — hinter Support/Resistance, jenseits eines ATR-Puffers oder unter einer Signal-Kerze.' },
        { name: 'Positionsgröße berechnen', text: 'Nutze einen Positionsgrößen-Rechner. Eingabe: Kontostand, Risikoprozentsatz (1 %), Stop-Loss-Distanz in Pips. Ausgabe: exakte Lot-Size. Niemals aufrunden.' },
        { name: 'Risk-Reward-Verhältnis bestätigen', text: 'Ziehe ein Risk-Reward-Tool von Entry zu Stop und Target. Wenn das Verhältnis unter 1:2 liegt, überspringe den Trade. Die Mathematik unterstützt ihn nicht.' },
      ]}
    >
      <Intro>
        Du weißt bereits, dass du eine Pre-Trade-Checkliste haben solltest. Du hast wahrscheinlich sogar schon mal eine erstellt — vielleicht nach dem Lesen unseres <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">10-Punkte-Checklisten-Leitfadens</Link>. Sie hatte zwölf Punkte, sie war gründlich, sie war professionell. Du hast sie vier Tage lang genutzt und dann aufgehört, weil zwölf Dinge vor jedem Trade in MetaTrader zu prüfen sich anfühlte wie eine Steuererklärung auszufüllen, während der Markt ohne dich weiterzog. Klingt vertraut? Du bist nicht faul. Deine Checkliste war zu lang.
      </Intro>

      <P>
        Dieser Leitfaden ist anders. Fünf Punkte. Unter 60 Sekunden. Spezifisch dafür, wie MetaTrader (MT4/MT5) und cTrader tatsächlich funktionieren — mit den exakten Buttons, Tools und Berechnungen, die du auf jeder Plattform brauchst. Keine Theorie. Kein „berücksichtige deinen emotionalen Zustand" (das ist wichtig, aber es gehört in dein Journal, nicht in eine 60-Sekunden-Checkliste). Nur fünf konkrete Checks, die die fünf häufigsten Trading-Fehler verhindern.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>Checklisten-Punkte —<br />der Sweet-Spot für Einhaltung</> },
        { value: 60, decimals: 0, suffix: 's', label: <>maximale Zeit, bevor Druck<br />dich zum Überspringen bringt</> },
        { value: 2, decimals: 0, suffix: 'R', label: <>Minimum-Target — 1:2 R:R<br />oder überspringe den Trade</> },
      ]} />

      <Divider />

      <H2>Warum fünf Punkte, nicht zehn</H2>
      <P>
        Es gibt einen Grund, warum Flugzeug-Checklisten kurz sind. NASA-Forschung zur Checklisten-Einhaltung fand, dass die Abschlussraten nach 5-7 Punkten stark fallen. Chirurgen nutzen die WHO Surgical Safety Checklist — sie hat drei Abschnitte mit je 5-7 Punkten, nicht einen Abschnitt mit 19. Das Prinzip: Eine kurze Checkliste, die du tatsächlich nutzt, schlägt eine lange Checkliste, die du aufgibst.
      </P>
      <P>
        Im Trading zählt das noch mehr, weil du oft unter Zeitdruck stehst. Ein Breakout formt sich. Eine Kerze schließt. Du fühlst Dringlichkeit einzusteigen. Eine 60-Sekunden-Checkliste kann diesen Druck überleben. Eine 5-Minuten-Checkliste nicht.
      </P>
      <Callout title="Die 60-Sekunden-Regel" color="#FFB300">
        Wenn deine Checkliste mehr als 60 Sekunden dauert, ist sie zu lang. Kürze sie. Die fünf Punkte unten decken 90 % dessen ab, was schiefgeht. Die anderen 10 % sind es nicht wert, die Einhaltung zu verlieren.
      </Callout>

      <Divider />

      <H2>Die 5-Punkte-Checkliste</H2>

      <H3>1. Kontext: Was macht der Higher Timeframe?</H3>
      <P>
        Bevor du auf deinen Entry-Timeframe schaust, wechsle zum Tages-Chart (oder H4, wenn du Scalper bist). Du stellst eine Frage: Trendet der Markt, ist er in einer Range oder im Übergang? Dein Trade sollte zu diesem Kontext passen.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf MetaTrader:</strong> Klicke die Timeframe-Buttons (D1 oder H4) oben in der Chart-Toolbar. Verbringe 10 Sekunden mit dem Blick auf die letzten 20-30 Kerzen. Gibt es eine klare Richtung? Tradest du mit ihr oder gegen sie?
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf cTrader:</strong> Dasselbe — nutze das Timeframe-Dropdown oder den Tastatur-Shortcut. cTrader erlaubt dir auch, ein Multi-Timeframe-Layout einzurichten (View → Multi-Symbol), sodass der Higher Timeframe immer sichtbar ist.
      </P>
      <P>
        Wenn der Higher Timeframe choppig oder unklar ist, braucht dein Trade einen sehr starken Grund zu existieren. Meistens ist „der Higher Timeframe ist unübersichtlich" ein valider Grund zu überspringen.
      </P>

      <H3>2. Trigger: Worauf genau warte ich?</H3>
      <P>
        Hier scheitern die meisten Trader. Sie sehen ein „Setup" — der Preis ist nahe Support, der RSI ist überverkauft, es „sieht gut aus" — und sie steigen ein. Aber „sieht gut aus" ist kein Trigger. Ein Trigger ist ein spezifisches, beobachtbares Ereignis:
      </P>
      <Ul items={[
        'Eine bullische Engulfing-Kerze, die über dem Support-Niveau schließt',
        'Ein Bruch und Schluss über der absteigenden Trendlinie im 15-Minuten-Chart',
        'Ein Pinbar, der den 200 EMA abweist, mit dem Docht mindestens 2x dem Body',
        'RSI-Divergenz bestätigt durch ein höheres Tief am Oszillator, während der Preis ein tieferes Tief macht',
      ]} />
      <P>
        Schreibe deinen Trigger in dein Journal oder auf einen Klebezettel vor dem Trade. Wenn du ihn nicht in einem Satz beschreiben kannst, hast du keinen Trigger — du hast ein Gefühl.
      </P>

      <H3>3. Stop: Wo scheitert meine Idee?</H3>
      <P>
        Dein Stop Loss sollte auf dem Preisniveau sein, wo deine Trade-These invalidiert wird. Nicht eine willkürliche Anzahl von Pips. Nicht basierend darauf, wie viel Geld du zu verlieren bereit bist. Der Stop kommt dorthin, wo der Markt beweist, dass du falsch liegst.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf MetaTrader:</strong> Nutze das Fadenkreuz-Tool (Strg+F), um die exakte Distanz von Entry zu Stop in Pips zu messen. Oder ziehe eine horizontale Linie zu deinem Stop-Niveau und nutze das „Data Window" (Strg+D), um den Preis abzulesen.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf cTrader:</strong> Rechtsklick → „Measure" oder nutze das eingebaute <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">Stop-Loss-Platzierungs-Tool</Link>, das Pips und Dollar-Betrag gleichzeitig zeigt.
      </P>
      <P>
        Gängige Methoden der Stop-Platzierung:
      </P>
      <Table
        headers={['Methode', 'Wo', 'Am besten für']}
        rows={[
          ['Struktur-basiert', 'Unter dem Swing-Tief / über dem Swing-Hoch + 5-10 Pip Puffer', 'Swing-Trades, klare S/R-Niveaus'],
          ['ATR-basiert', '1,5× ATR unter Entry (Kauf) oder über Entry (Verkauf)', 'Volatile Märkte, News-Ereignisse'],
          ['Candle-basiert', 'Unter dem Tief der Signal-Kerze + Spread + kleiner Puffer', 'Intraday-Einstiege, Pin Bars'],
        ]}
      />

      <H3>4. Size: Wie viel trade ich?</H3>
      <P>
        Hier entstehen die meisten gesprengten Konten. Nicht durch schlechte Einstiege — durch falsche Positionsgrößen. Die Formel:
      </P>
      <Callout title="Positionsgrößen-Formel" color="#4FC3F7">
        Lot-Size = (Kontostand × Risiko %) ÷ (Stop Loss in Pips × Pip-Wert)
      </Callout>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf MetaTrader:</strong> MT4/MT5 hat keinen eingebauten Risikorechner (ja, wirklich). Du brauchst entweder: einen externen Rechner, einen eigenen EA/Indikator, der die Berechnung macht, oder ein Trading-Journal mit einem <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">Lot-Size-Rechner</Link>. K.M.F. hat einen in die App eingebaut — gib deine Kontogröße, deinen Risikoprozentsatz und deine Stop-Distanz ein, und er gibt dir die exakte Lot-Size. Schneller, als jedes Mal manuell zu rechnen.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf cTrader:</strong> cTrader hat einen eingebauten Positionsgrößen-Rechner (Rechtsklick auf das Trade-Ticket → „Risk %"). Stelle deinen Risikoprozentsatz ein, und er berechnet automatisch die korrekte Lot-Size basierend auf deiner Stop-Distanz. Das ist ein Bereich, in dem cTrader MetaTrader wirklich übertrifft.
      </P>
      <P>
        Regel: Wenn du diese Berechnung im Kopf machst, machst du sie falsch. Nutze immer einen Rechner. Kopfrechnen unter Druck führt zu „nah genug"-Lot-Sizes, und „nah genug" ist, wie aus 1 % Risiko 3 % Risiko wird.
      </P>

      <H3>5. Reward: Ist dieser Trade es wert?</H3>
      <P>
        Dein Target muss mindestens 2× deine Stop-Loss-Distanz sein. Wenn dein Stop 30 Pips ist, ist dein Target mindestens 60 Pips. Wenn die Mathematik nicht aufgeht — wenn es ein großes Resistance-Niveau zwischen deinem Entry und einem 2R-Target gibt — überspringe den Trade. Er ist das Risiko nicht wert.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf MetaTrader:</strong> Nutze das Fibonacci- oder Rechteck-Tool, um deine 1R-, 2R- und 3R-Niveaus über (oder unter) deinem Entry visuell zu markieren. Manche Trader nutzen die „Trade"-Niveaulinien in MetaTrader, die Entry, SL und TP mit der Pip-Distanz zeigen.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Auf cTrader:</strong> Nutze das „Risk/Reward"-Tool (in der Zeichen-Toolbar), um von Entry zu Stop und Target zu ziehen. Es zeigt das exakte Verhältnis.
      </P>
      <P>
        Dieser Check verhindert die heimtückischste Klasse schlechter Trades: die, die sich „richtig anfühlen", aber schreckliche Mathematik haben. Ein Setup am Support mit einem 50-Pip-Stop und 30 Pips zum nächsten Resistance ist ein verlierender Trade, selbst wenn deine Analyse perfekt ist. Das Risk:Reward ist 1:0,6. Du musst 63 % davon gewinnen, nur um die Null zu erreichen. Überspringe ihn.
      </P>

      <Divider />

      <H2>Die Checkliste in der Praxis</H2>
      <Table
        headers={['#', 'Check', 'Zeit', 'Falls Nein']}
        rows={[
          ['1', 'Higher TF Kontext unterstützt Trade-Richtung?', '10 Sek', { value: 'Überspringen oder starker Counter-Trend-Grund nötig', color: 'red' }],
          ['2', 'Kann ich meinen Entry-Trigger in einem Satz beschreiben?', '10 Sek', { value: 'Kein Trigger = kein Trade', color: 'red' }],
          ['3', 'Stop Loss an struktureller Invalidierung + Puffer?', '15 Sek', { value: 'Richtiges Niveau finden oder überspringen', color: 'gold' }],
          ['4', 'Positionsgröße mit einem Tool berechnet (kein Kopfrechnen)?', '15 Sek', { value: 'Erst korrekt berechnen', color: 'gold' }],
          ['5', 'Risk:Reward Minimum 1:2 auf dem Chart bestätigt?', '10 Sek', { value: 'Überspringen — die Mathematik sagt nein', color: 'red' }],
        ]}
      />
      <P>
        Gesamtzeit: 60 Sekunden. Fünf Ja/Nein-Antworten. Wenn eine Antwort „nein" ist, wird der Trade entweder angepasst oder übersprungen. Keine Ausnahmen, kein „diesmal ist es anders".
      </P>

      <Divider />

      <H2>Wo du deine Checkliste platzierst</H2>
      <P>
        Die Checkliste ist nutzlos, wenn sie in einem Google Doc lebt, das du nie öffnest. Hier sind die drei Methoden, die tatsächlich funktionieren:
      </P>
      <Ul items={[
        'Physischer Klebezettel am Monitor-Rahmen — du kannst nicht vermeiden, ihn zu sehen. Ersetze ihn wöchentlich, wenn er abgegriffen wird.',
        'Eine eigene MT4-Kommentar-Vorlage — tippe deine 5 Checks in das „Comment"-Feld jedes Trades. Zwingt dich, vor dem Einstieg zu denken.',
        'Eine Trading-Journal-App mit eingebauter Checkliste. K.M.F. hat das — du hakst Punkte ab, bevor du jeden Trade loggst. Die App verfolgt deine Einhaltungsrate über die Zeit, sodass du sehen kannst, wie oft du die Checkliste überspringst und was mit deinen Ergebnissen passiert, wenn du es tust. (Spoiler: Sie werden schlechter.)',
      ]} />

      <P>
        Welche Methode du auch wählst, der Schlüssel ist, dass die Checkliste zwischen dir und dem Trade sein muss. Es sollte unmöglich sein, einen Trade einzugehen, ohne zuerst auf die Checkliste zu stoßen. Wenn du sie aktiv suchen musst, wirst du sie an den Tagen überspringen, an denen du sie am meisten brauchst — den Tagen, an denen du aufgeregt, frustriert oder in Eile bist.
      </P>

      <Takeaways items={[
        'Fünf Punkte, 60 Sekunden. Checklisten-Einhaltung fällt nach 5-7 Punkten stark. Eine kurze Liste, die du nutzt, schlägt eine lange Liste, die du aufgibst.',
        'Kontext zuerst: 10 Sekunden auf dem Tages-Chart verhindern die meisten schlechten Trades. Wenn der Higher Timeframe unübersichtlich ist, braucht dein Trade einen sehr starken Grund.',
        'Ein Trigger ist ein spezifisches Ereignis, kein Gefühl. „Bullische Engulfing über Support" ist ein Trigger. „Sieht gut aus" nicht.',
        'Stop Loss an der Invalidierung, nicht an einem bequemen Dollar-Betrag. Nutze Struktur-, ATR- oder Candle-basierte Methoden.',
        'Nutze immer einen Rechner für die Positionsgröße. Kopfrechnen unter Druck verwandelt 1 % Risiko in 3 % Risiko.',
        'Risk:Reward unter 1:2 = überspringen. Egal wie gut das Setup aussieht, die Mathematik sagt, der Trade ist es nicht wert.',
      ]} />
    </BlogArticleLayout>
  );
}
