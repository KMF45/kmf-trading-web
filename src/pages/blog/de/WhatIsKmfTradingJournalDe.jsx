import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WhatIsKmfTradingJournalDe() {
  return (
    <BlogArticleLayout
      slug="what-is-kmf-trading-journal"
      lang="de"
      title="Was ist K.M.F. Trading Journal? Die App, gebaut von Tradern, die genug von Tabellen hatten"
      metaTitle="K.M.F. Trading Journal: Der komplette Leitfaden zur App, gebaut von Tradern für Trader | K.M.F."
      metaDescription="K.M.F. Trading Journal ist eine kostenlose Android-App für Forex-, Aktien- & Krypto-Trader. Psychologie-Tracking, Tilt-Erkennung, Lot-Rechner und fortgeschrittene Statistiken — gebaut von Tradern, die wirklich traden."
      date="15. März 2026"
      dateISO="2026-03-15"
      readTime="10 Min. Lesezeit"
      category="App-Tests"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'best-free-trading-journal-app-android-2026', title: 'Best Free Trading Journal App for Android in 2026', category: 'App Reviews' },
        { slug: 'excel-vs-trading-journal-app', title: 'Why Excel Is Slowly Killing Your Trading Performance', category: 'Improvement' },
        { slug: 'tradingview-kmf-workflow', title: 'TradingView + K.M.F. Journal: The Perfect Workflow for a Modern Trader', category: 'Improvement' },
      ]}
      faqItems={[
        { question: 'Ist K.M.F. Trading Journal kostenlos?', answer: 'Ja. Die Kern-Journaling-Funktionen sind kostenlos — Trade-Erfassung (15 Trades), Historie, Basis-Statistiken, Lot-Rechner, Checkliste, Tagebuch, Cloud-Sync und Offline-Zugriff. Premium ($5,99/Monat oder $49,99/Jahr) ergänzt unbegrenzte Trades, fortgeschrittene Statistiken, Emotions-Tracking und mehr.' },
        { question: 'Welche Märkte unterstützt K.M.F.?', answer: 'K.M.F. unterstützt Forex, Aktien, Krypto, Rohstoffe und Indizes. Der Lot-Size-Rechner passt sich automatisch an unterschiedliche Pip-Werte und Kontraktgrößen an.' },
        { question: 'Verbindet sich K.M.F. mit meinem Broker?', answer: 'Nein. K.M.F. nutzt ausschließlich manuelle Trade-Eingabe. Deine Broker-Zugangsdaten und Trading-Daten bleiben völlig privat — keine API-Keys, kein Kontozugriff, kein Datenaustausch.' },
        { question: 'Ist K.M.F. auf dem iPhone verfügbar?', answer: 'Aktuell ist K.M.F. nur für Android. iOS ist geplant, es gibt aber noch kein bestätigtes Veröffentlichungsdatum.' },
        { question: 'Wofür steht K.M.F.?', answer: 'Keep Moving Forward. Es spiegelt die Philosophie hinter der App wider — Trading ist eine Reise der ständigen Verbesserung, kein Ziel.' },
      ]}
    >
      <Intro>
        Vor zwei Jahren waren wir genau dort, wo du jetzt bist. Forex und Krypto traden, versuchen besser zu werden, und eine Mischung aus Excel-Tabellen, in zufälligen Ordnern gespeicherten Screenshots und um 2 Uhr morgens nach einer schlechten Session ins Handy getippten Notizen nutzen. Wir haben jede Journal-App auf dem Markt probiert. Manche wollten $20–30 pro Monat und verlangten Broker-Zugriff. Andere hatten gar keine mobile App. Ein paar kosteten Hunderte Dollar im Voraus und liefen nur auf dem Desktop. Keine trackte Psychologie. Keine funktionierte offline. Keine fühlte sich an, als wäre sie von Menschen gebaut, die wirklich jeden Tag vor Charts sitzen. Also bauten wir K.M.F.
      </Intro>

      <StatsStrip items={[
        { value: 30, decimals: 0, suffix: 's', label: <>typische Zeit, einen Trade in<br />K.M.F. zu loggen — gewohnheitsfreundlich</> },
        { value: 7, decimals: 0, label: <>Sprachen unterstützt<br />in der kostenlosen Version</> },
        { value: 4, decimals: 0, label: <>Tilt-Erkennungsstufen<br />bei jedem Einstieg aktiv</> },
      ]} />

      <H2>Was K.M.F. tatsächlich ist</H2>
      <P>
        K.M.F. — Keep Moving Forward — ist eine Trading-Journal-App für Android. Kein Signaldienst. Keine Copy-Trading-Plattform. Kein Kurs mit angehängtem Journal. Es ist ein fokussiertes, zweckgebautes Werkzeug, um Trades zu loggen, die Leistung zu analysieren und die eigene Psychologie als Trader zu verstehen.
      </P>
      <P>
        Es funktioniert für Forex, Aktien, Krypto, Rohstoffe und Indizes. Es funktioniert offline. Es benötigt keine Broker-Verbindung. Es fragt nicht nach deinen API-Keys oder Kontodaten. Deine Daten bleiben auf deinem Handy, mit optionalem Cloud-Backup, wenn du es willst.
      </P>
      <P>
        Der Name spiegelt die Philosophie wider: Beim Trading geht es nicht darum, perfekt zu sein. Es geht darum, besser zu werden, ein Trade nach dem anderen. Keep moving forward — auch nach einer Verlustserie, auch nach einem gebrochenen Regel, auch nach der schlimmsten Woche deiner Trading-Karriere. Logge es, lerne daraus und mach den nächsten Trade besser.
      </P>

      <Divider />

      <H2>Warum wir sie gebaut haben (die ehrliche Version)</H2>
      <P>
        Wir sind Trader. Kein Silicon-Valley-Startup, das einen Marktforschungsbericht über „den TAM für Trading-Journale" gelesen hat. Wir traden Forex und Krypto. Wir haben Konten gesprengt. Wir haben nach Verlusten Revenge-Trading betrieben. Wir haben auf eine Tabelle voller Zahlen gestarrt und absolut nichts daraus gelernt.
      </P>
      <P>
        Der Wendepunkt kam, als einer von uns erkannte, dass seine letzten drei gesprengten Konten dasselbe Muster hatten: zwei Verluste in Folge, gefolgt von einem überdimensionierten Revenge-Trade, gefolgt von Tilt. Die Daten waren da — vergraben in einer Tabelle mit 400 Zeilen und ohne Möglichkeit, das Muster automatisch zu erkennen. Ein richtiges Journal hätte es in Woche zwei gefangen. Stattdessen dauerte es sechs Monate und $4.000 an Verlusten.
      </P>
      <P>
        Deshalb existiert K.M.F. Nicht, weil die Welt noch eine App brauchte, sondern weil wir ein Werkzeug brauchten, das Tradern wirklich beim Besserwerden hilft — nicht nur ein Ort, um Trade-Daten abzuladen.
      </P>

      <Callout title="Das Kernprinzip" color="#4FC3F7">
        Jede Funktion in K.M.F. wurde gebaut, um eine Frage zu beantworten: „Hilft das einem Trader, morgen bessere Entscheidungen zu treffen?" War die Antwort nein, haben wir es nicht gebaut. Wir haben keine Social Feeds, keine Bestenlisten, kein Copy-Trading. Diese Funktionen machen Apps klebriger. Sie machen Trader nicht besser.
      </Callout>

      <Divider />

      <H2>Was in der App steckt</H2>
      <P>
        Hier ist ein kompletter Rundgang durch jede wichtige Funktion — was sie tut, warum sie existiert und wie sie dir hilft, besser zu werden.
      </P>

      <H3>Smarte Trade-Eingabe</H3>
      <P>
        Einen Trade zu loggen dauert unter 30 Sekunden. Instrument-Autovervollständigung, Richtung, Ein- und Ausstiegspreise, Stop Loss, Take Profit, Lot-Size und eine optionale Notiz. Die App prüft deinen SL/TP gegen, um Eingabefehler vor dem Speichern zu fangen. Du kannst auch einen Screenshot deines Chart-Setups anhängen (Premium).
      </P>
      <P>
        Warum Geschwindigkeit zählt: Wenn das Loggen eines Trades 5 Minuten dauert, hörst du in Woche zwei damit auf. Wir wissen das, weil wir es bei jedem anderen Werkzeug, das wir probierten, selbst aufgegeben haben. Dreißig Sekunden sind die Schwelle — darunter wird es zur Gewohnheit. Darüber wird es zur Pflicht.
      </P>

      <H3>Live-Dashboard</H3>
      <P>
        Das Dashboard zeigt deine Trading-Realität auf einen Blick: Gesamt-Gewinn/Verlust, Win Rate, Trades gesamt, monatlicher Gewinn/Verlust, maximaler Drawdown und Profit Factor. Darunter eine Saldo-Verlaufsgrafik, Leistungsübersicht (Ø-Gewinn, Ø-Verlust, bester Trade, schlechtester Trade) und offene Positionen. Kein Schnickschnack. Keine Motivationssprüche. Nur deine Zahlen.
      </P>

      <H3>Fortgeschrittene Statistiken (Premium)</H3>
      <P>
        Hier hebt sich K.M.F. von einer Tabelle ab. Die Statistikseite berechnet alles automatisch aus deinen rohen Trade-Daten:
      </P>
      <Ul items={[
        'Win Rate, Profit Factor und Trading-Erwartungswert — die drei Zahlen, die dir sagen, ob deine Strategie wirklich funktioniert',
        'R-Vielfach-Verteilung — wie deine Trades relativ zum Risiko performen, nicht nur in Dollar',
        'Gewinn/Verlust nach Wochentag — bringen Montage dein Konto um?',
        'Gewinn/Verlust nach Session — Asien, London, New York. In welcher Session liegt dein Edge?',
        'Top-Instrumente — welche Paare oder Symbole bringen dir wirklich Geld?',
        'Maximaler Drawdown und Equity-Kurve — die visuelle Geschichte deines Kontos über die Zeit',
        'Dauer-Analyse — hältst du Gewinner lange genug? Schneidest du Verlierer schnell genug?',
      ]} />
      <P>
        All das aktualisiert sich automatisch, während du Trades loggst. Keine Formeln zu bauen, keine Pivot-Tabellen zu pflegen, keine <Link to="/blog/excel-vs-trading-journal-app" className="text-kmf-accent hover:underline">Tabellenfehler</Link>, die deine Daten still verfälschen.
      </P>

      <H3>Lot-Size-Rechner</H3>
      <P>
        Gib deinen Kontostand, deinen Risikoprozentsatz, deinen Einstiegspreis und dein Stop-Loss-Niveau ein. Der Rechner gibt die genaue Lot-Size aus. Er unterstützt Forex, Krypto und Aktien, übernimmt Wechselkursumrechnungen automatisch und funktioniert offline. Kein „Ich trade meist 0,1 Lots" mehr — das ist kein Risikomanagement, sondern eine Schätzung, die dich irgendwann in einen Trade bringt, in dem 0,1 Lots 5 % deines Kontos darstellen.
      </P>

      <H3>Pre-Trade-Checkliste</H3>
      <P>
        Eine anpassbare <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">Pre-Trade-Checkliste</Link>, die du vor jedem Einstieg durchgehst. Du definierst die Kriterien — Trendrichtung bestätigt, Stop Loss auf Strukturniveau, Risiko innerhalb der Grenzen, emotionaler Zustand akzeptabel. Ist ein Kästchen nicht angehakt, ist die Checkliste unvollständig. Es ist ein mechanischer Schutz gegen impulsive Einstiege.
      </P>

      <H3>Wöchentliches Review</H3>
      <P>
        Jede Woche fordert dich K.M.F. auf, deine Leistung anhand von fünf Disziplin-Kennzahlen zu überprüfen. Du bewertest dich selbst, schreibst Reflexionsnotizen, setzt Ziele für die nächste Woche. Das ist die <Link to="/blog/weekly-trading-review-template" className="text-kmf-accent hover:underline">Feedback-Schleife</Link>, die wirklich Verbesserung antreibt — nicht der einzelne Trade, sondern das Muster über die Trades hinweg.
      </P>

      <H3>Trading-Tagebuch</H3>
      <P>
        Ein freies Journal für Gedanken, Lektionen und Beobachtungen, die nicht in eine Trade-Eingabe passen. Vor-Markt-Analyse. Reflexionen nach der Session. Emotionale Verarbeitung nach einem harten Tag. Das Tagebuch ist getrennt von den Trade-Daten — es ist dein Raum, um auf Papier zu denken.
      </P>

      <Divider />

      <H2>Die Psychologie-Engine</H2>
      <P>
        Das ist der Teil, den es in keinem anderen Trading-Journal gibt, das wir getestet haben. Die meisten Journale tracken Zahlen. K.M.F. trackt den Menschen hinter den Zahlen.
      </P>

      <H3>Emotions-Tracking</H3>
      <P>
        Vor jedem Trade loggst du deinen emotionalen Zustand: Ruhig, Selbstbewusst, Ängstlich, Frustriert, Furchtsam oder Aufgeregt. Nachdem der Trade schließt, loggst du ihn erneut. Über die Zeit korreliert K.M.F. deine Emotionen mit deinen Ergebnissen. Du könntest entdecken, dass du in 73 % der Fälle Geld verlierst, wenn du ängstlich in Trades einsteigst — und allein diese Erkenntnis kann ändern, wie du tradest.
      </P>

      <H3>Tilt-Erkennung</H3>
      <P>
        K.M.F. überwacht vier Signale in Echtzeit: Verluste in Folge, steigende Lot-Sizes, negative Emotionen und schnelle Trade-Frequenz. Wenn es ein entstehendes Tilt-Muster erkennt, zeigt es ein Warnbanner — von einem sanften gelben Hinweis bis zu einem roten „STOPP TRADEN"-Alarm. Es ist das Sicherheitsnetz, das dich fängt, bevor du den Tag sprengst, nicht danach.
      </P>

      <H3>Honesty Mirror (Premium)</H3>
      <P>
        Der Honesty Mirror berechnet die Korrelation zwischen deinem selbst bewerteten Selbstvertrauen und deinem tatsächlichen Gewinn/Verlust. Er sagt dir, ob du überheblich bist (dich bei verlierenden Trades hoch bewertest) oder zu wenig Vertrauen hast (an Trades zweifelst, die tatsächlich gewinnen). Die meisten Trader sind schockiert von dem, was das offenbart — <Link to="/blog/confidence-vs-overconfidence" className="text-kmf-accent hover:underline">Selbstvertrauen vs Selbstüberschätzung</Link> ist eine der am meisten missverstandenen Dynamiken im Trading.
      </P>

      <H3>Trader Personality Profile (Premium)</H3>
      <P>
        Basierend auf deinen tatsächlichen Trading-Daten — nicht auf einem Quiz — identifiziert K.M.F. deinen Trader-Persönlichkeitstyp: Sniper (wenige Trades, hohe Treffsicherheit), Wave Rider (Trendfolger), Robot (systematisch), Gambler (impulsiv, hohe Frequenz), Momentum Rider (aggressiv, aber kalkuliert) oder Revenge Trader (reaktiv, verlustgetrieben). Jedes Profil kommt mit Stärken, Schwächen und konkreten Verbesserungsvorschlägen.
      </P>

      <H3>Emotions-Heatmap</H3>
      <P>
        Eine Kalenderansicht, die deinen emotionalen Zustand über die Trading-Tage zeigt. Wechsle zwischen Gewinn/Verlust-Ansicht und Emotions-Ansicht, um Muster zu sehen: Sind deine schlechtesten Tage emotional getrieben? Korrelieren deine besten Wochen mit ruhigen, fokussierten Zuständen? Das Visuelle macht das Unsichtbare sichtbar.
      </P>

      <Callout title="Warum Psychologie so sehr zählt" color="#CE93D8">
        Wir bauten die Psychologie-Engine, weil wir — auf die harte Tour — gelernt haben, dass <Link to="/blog/strategy-is-not-enough" className="text-kmf-accent hover:underline">die Strategie nur etwa 20 % des Spiels ist</Link>. Die anderen 80 % sind Ausführung, Disziplin und emotionales Management. Du kannst das beste Setup der Welt haben, und wenn du es auslässt, weil du Angst hast, oder deine Größe verdoppelst, weil du wütend bist, ist die Strategie irrelevant. K.M.F. macht diese 80 % sichtbar und messbar.
      </Callout>

      <Divider />

      <H2>Gamification: XP, Erfolge und Trader-Stufen</H2>
      <P>
        Journaling ist langweilig. Wir wissen es. Deshalb <Link to="/blog/why-traders-fail-at-journaling" className="text-kmf-accent hover:underline">hören 90 % der Trader innerhalb von Wochen auf</Link>. Also fügten wir eine Schicht Gamification hinzu — nicht, um die App auf seichte Weise „lustig" zu machen, sondern um eine Belohnungsschleife zu schaffen, die die richtigen Verhaltensweisen verstärkt.
      </P>
      <Ul items={[
        'XP für jeden geloggten Trade, jede abgeschlossene Checkliste, jedes beendete wöchentliche Review',
        '23 Erfolge über drei Stufen (Bronze, Silber, Gold) — vom Loggen deines ersten Trades bis zum Abschluss einer 30-Tage-Serie',
        'Trader-Stufen: Novize → Disziplinierter Trader → Risikomanager → Meisterstratege',
        'Das XP-System belohnt Beständigkeit, nicht Profitabilität — denn die Gewohnheit des Journalings ist es, die über die Zeit Profitabilität schafft',
      ]} />

      <Divider />

      <H2>Was K.M.F. anders macht</H2>
      <P>
        Es gibt andere Trading-Journale. Hier ist, was K.M.F. anders macht — ehrlich, ohne Marketing-Sprache.
      </P>

      <H3>Gebaut von Tradern, nicht von Entwicklern</H3>
      <P>
        Jede Funktion wurde von Menschen entworfen, die die App täglich für ihre eigenen Trades nutzen. Das klingt nach einer Marketing-Zeile, aber der Unterschied zeigt sich in den Details: Der Lot-Size-Rechner nutzt realistische Pip-Werte, die Statistikseite zeigt Kennzahlen, die Trader wirklich prüfen (keine Vanity-Charts), und die Tilt-Erkennung ist von Menschen abgestimmt, die Tilt erlebt haben, nicht von Menschen, die darüber gelesen haben.
      </P>

      <H3>Mobile-First und offline</H3>
      <P>
        K.M.F. ist eine native Android-App, keine responsive Website, die in eine mobile Hülle gequetscht wurde. Sie funktioniert vollständig offline — du kannst Trades im Flugzeug, im Auto oder in einem Gebäude mit furchtbarem WLAN loggen. Die Daten synchronisieren automatisch, wenn du dich wieder verbindest. Die meisten Konkurrenten sind nur web-basiert, was bedeutet: Bist du weg vom Laptop, journalst du nicht.
      </P>

      <H3>Keine Broker-Verbindung nötig</H3>
      <P>
        Wir werden nie nach deinen Broker-API-Keys fragen. Deine Trades werden manuell eingegeben — was 30 Sekunden dauert — und dein Broker-Konto bleibt völlig privat. Kein Drittanbieterzugriff, kein Datenaustausch, kein Risiko der Kontooffenlegung.
      </P>

      <H3>Psychologie-First-Ansatz</H3>
      <P>
        Die meisten Journale sind Tabellen mit einer Oberfläche. K.M.F. ist ein Psychologie-Werkzeug, das zufällig Trades trackt. Emotions-Tracking, Tilt-Erkennung, Honesty Mirror, Persönlichkeitsprofilierung und emotionale Pre-Trade-Warnungen — diese Funktionen sind in keinem anderen Trading-Journal am Markt leicht zu finden. Sie existieren in K.M.F., weil wir glauben, dass dich selbst zu verstehen wichtiger ist, als den Markt zu verstehen.
      </P>

      <H3>Ehrliche kostenlose Version</H3>
      <P>
        Die kostenlose Version ist keine Demo. Sie umfasst volle Trade-Erfassung (15 Trades), Trade-Historie mit Suche, Basis-Gewinn/Verlust und Win Rate, den Lot-Size-Rechner, Pre-Trade-Checklisten, Trading-Tagebuch, Offline-Zugriff und 7 Sprachen. Nach 15 Trades kannst du eine kostenlose Testphase starten oder auf Premium upgraden.
      </P>

      <Divider />

      <H2>Kostenlos vs Premium — die ehrliche Aufschlüsselung</H2>
      <Table
        headers={['Funktion', 'Kostenlos', 'Premium']}
        rows={[
          ['Trade-Erfassung', { value: '15 Trades', color: 'gold' }, { value: 'Unbegrenzt', color: 'green' }],
          ['Trade-Historie & Suche', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['Win Rate & Basis-Gewinn/Verlust', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['Lot-Size-Rechner', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['Pre-Trade-Checkliste', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['Trading-Tagebuch', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['Offline-Zugriff', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['7 Sprachen', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['Fortgeschrittene Statistiken', { value: 'Nein', color: 'red' }, { value: 'Ja — Profit Factor, Erwartungswert, R-Vielfaches, Drawdown, Equity-Kurve', color: 'green' }],
          ['Cloud-Sync & Backup', { value: 'Ja', color: 'green' }, { value: 'Ja', color: 'green' }],
          ['Emotions-Tracking & Tilt-Erkennung', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Trader-Persönlichkeitsprofil', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Honesty Mirror', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Wöchentliches Review & Ziele', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Erfolge & XP', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Session-Analyse', { value: 'Nein', color: 'red' }, { value: 'Ja — Asien, London, NY', color: 'green' }],
          ['Screenshot-Upload', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Export (CSV/JSON/PDF)', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Smarte Benachrichtigungen', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
          ['Priority-Support', { value: 'Nein', color: 'red' }, { value: 'Ja', color: 'green' }],
        ]}
      />
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Premium-Preis:</strong> $5,99/Monat oder $49,99/Jahr (30 % Ersparnis). 7-tägige kostenlose Testphase — kündige vor Ablauf über Google Play und es wird dir nichts berechnet.
      </P>
      <P>
        Lohnt sich Premium? Wenn du unbegrenzte Trades, die Psychologie-Funktionen (Emotions-Tracking, Tilt-Erkennung, Persönlichkeitsprofil) oder fortgeschrittene Statistiken willst — ja. Die kostenlose Version gibt dir 15 Trades mit vollem Cloud-Sync, um die App vor der Entscheidung zu erleben.
      </P>

      <Divider />

      <H2>Wie K.M.F. dir hilft, als Trader zu wachsen</H2>
      <P>
        Die App schafft eine Feedback-Schleife, die sich über die Zeit verzinst:
      </P>
      <Ul items={[
        'Logge jeden Trade mit Kontext — nicht nur Zahlen, sondern Emotionen, Plan-Treue und Setup-Typ',
        'Statistiken offenbaren Muster, die du in Rohdaten nicht siehst — welche Session deine beste ist, welcher Tag dein schlechtester, welches Setup echten Edge hat',
        'Emotions-Tracking zeigt die Korrelation zwischen deinem mentalen Zustand und deinen Ergebnissen — Daten, die keine Tabelle erzeugen kann',
        'Wöchentliche Reviews zwingen dich, deine Leistung ehrlich zu konfrontieren und konkrete Verbesserungsziele zu setzen',
        'Tilt-Erkennung fängt zerstörerische Muster, bevor sie dich Geld kosten',
        'Das Persönlichkeitsprofil zeigt dir, wer du als Trader tatsächlich bist — nicht, wer du zu sein glaubst',
      ]} />
      <P>
        Diese Schleife — loggen, analysieren, reflektieren, verbessern — ist es, was Trader, die besser werden, von Tradern trennt, die jahrelang dieselben Fehler wiederholen. K.M.F. macht dich nicht profitabel. Keine App kann das. Was es tut, ist, dein Trading so für dich sichtbar zu machen, dass du schneller besser werden kannst, als du es allein würdest.
      </P>

      <Divider />

      <H2>Für wen K.M.F. ist (und für wen nicht)</H2>
      <H3>K.M.F. ist für dich, wenn:</H3>
      <Ul items={[
        'Du Forex, Aktien, Krypto oder Rohstoffe tradest und dich systematisch verbessern willst',
        'Du müde bist von Tabellen, die kaputtgehen, Notizbüchern, die verloren gehen, oder Screenshots, die über Ordner verstreut sind',
        'Du deine Psychologie verstehen willst — nicht nur deinen Gewinn/Verlust',
        'Du mobil tradest und ein Journal brauchst, das auf deinem Handy, offline, in unter 30 Sekunden funktioniert',
        'Du ein Prop-Firm-Trader bist, der striktes Risiko-Tracking und Disziplin-Werkzeuge braucht',
        'Du ein angehender Trader bist, der einen strukturierten Verbesserungsrahmen will, nicht nur einen Datenabwurf',
      ]} />

      <H3>K.M.F. ist NICHT für dich, wenn:</H3>
      <Ul items={[
        'Du automatischen Trade-Import von deinem Broker willst — K.M.F. nutzt nur manuelle Eingabe',
        'Du eine iOS-App brauchst — wir sind vorerst nur für Android',
        'Du Social-Funktionen, Bestenlisten oder Copy-Trading willst — die bauen wir nicht',
        'Du Trading-Signale oder Strategie-Empfehlungen suchst — K.M.F. ist ein Journal, kein Berater',
      ]} />

      <Callout title={'Die ehrliche Antwort auf „Lohnt sich K.M.F.?"'} color="#FFB300">
        Wenn du konstant journalst — selbst in der kostenlosen Version — wirst du schneller besser als 90 % der Trader, die gar nicht journalen. Die App ist das Werkzeug. Die Gewohnheit ist der Edge. K.M.F. macht die Gewohnheit so einfach wie möglich, aber die Arbeit bleibt deine.
      </Callout>

      <Divider />

      <H2>Loslegen</H2>
      <P>
        K.M.F. Trading Journal ist jetzt bei Google Play verfügbar. Lade es kostenlos herunter und beginne noch heute, deine Trades zu journalen — keine Kreditkarte für die kostenlose Version nötig. Premium bietet eine 7-tägige kostenlose Testphase.
      </P>
      <Ul items={[
        'Lade K.M.F. bei Google Play herunter',
        'Erstelle ein Konto — E-Mail oder Google-Anmeldung',
        'Logge deinen ersten Trade in unter 30 Sekunden',
        'Geh deine erste Pre-Trade-Checkliste durch',
        'Nach 10 Trades prüfe deine Statistiken — du wirst bereits Muster sehen',
        'Nach einer Woche mach dein erstes wöchentliches Review',
        'Nach einem Monat sprechen die Daten für sich',
      ]} />
      <P>
        Fragen? Erreiche uns unter <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>contact@kmfjournal.com</strong> — wir lesen und beantworten jede E-Mail persönlich.
      </P>

      <Takeaways items={[
        'K.M.F. (Keep Moving Forward) ist eine Trading-Journal-App für Android, gebaut von Tradern, die genug von Tabellen und teuren reinen Web-Tools hatten.',
        'Kernfunktionen für immer kostenlos: Trade-Erfassung, Historie, Basis-Statistiken, Lot-Rechner, Checkliste, Tagebuch, Offline-Zugriff, 7 Sprachen.',
        'Premium ($5,99/Monat oder $49,99/Jahr) ergänzt unbegrenzte Trades, fortgeschrittene Statistiken, Psychologie-Tracking, Tilt-Erkennung, Erfolge und mehr.',
        'Keine Broker-Verbindung nötig — nur manuelle Eingabe, deine Daten bleiben privat.',
        'Die Psychologie-Engine (Emotions-Tracking, Tilt-Erkennung, Honesty Mirror, Persönlichkeitsprofilierung) ist es, was K.M.F. von jedem anderen Journal am Markt trennt.',
        'Die App macht dich nicht profitabel — sie macht dein Trading sichtbar, damit du schneller besser wirst.',
      ]} />
    </BlogArticleLayout>
  );
}
