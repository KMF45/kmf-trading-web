import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WeeklyTradingReviewTemplateDe() {
  return (
    <BlogArticleLayout
      slug="weekly-trading-review-template"
      lang="de"
      title="Wie du ein wöchentliches Trading-Review machst (mit komplettem Template)"
      metaTitle="Wöchentliches Trading-Review: Die 15-Minuten-Routine, die deine Verbesserung verzehnfacht | K.M.F."
      metaDescription="Eine Schritt-für-Schritt-Anleitung, um ein richtiges wöchentliches Trading-Review durchzuführen. Inklusive komplettem Template mit Fragen zur Bewertung von Leistung, Disziplin und Strategie."
      date="16. Januar 2026"
      dateISO="2026-01-16"
      dateModified="2026-03-22"
      readTime="8 Min. Lesezeit"
      category="Verbesserung"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: '10-questions-after-every-trade', title: '10 Questions Every Trader Should Ask After Every Trade', category: 'Improvement' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Wie mache ich ein wöchentliches Trading-Review?', answer: 'Überprüfe jedes Wochenende 5 Bereiche: Ausführungsqualität, Einhaltung des Risikomanagements, emotionale Muster, Marktbedingungen und Strategie-Leistung. Nutze ein strukturiertes Template mit konkreten Fragen für jeden Bereich.' },
        { question: 'Wie lange sollte ein wöchentliches Trading-Review dauern?', answer: '15-30 Minuten reichen, wenn du Trades täglich journalst. Beim wöchentlichen Review geht es um Muster und Trends, nicht um das erneute Analysieren einzelner Trades. Konzentriere dich darauf, was sich diese Woche gegenüber der letzten geändert hat.' },
        { question: 'Welche Fragen sollte ich in einem wöchentlichen Review stellen?', answer: 'Zentrale Fragen sind: Bin ich meinen Regeln gefolgt? Was war mein größter Fehler? Was war mein bestausgeführter Trade? Haben Emotionen Entscheidungen beeinflusst? Was ist die eine Sache, die ich nächste Woche verbessern werde?' },
      ]}
      howToSteps={[
        { name: 'Überprüfe deine Statistiken', text: 'Beginne mit den rohen Zahlen: Trades gesamt, Win Rate, Profit Factor, durchschnittliches R-Vielfaches. Vergleiche mit der Vorwoche und deiner Basis.' },
        { name: 'Bewerte die Ausführungsqualität', text: 'Prüfe jeden Trade auf Plan-Treue. Bist du deinen Einstiegskriterien, deiner Stop-Platzierung und deinen Ausstiegsregeln gefolgt? Bewerte jeden Trade.' },
        { name: 'Analysiere emotionale Muster', text: 'Identifiziere, welche Emotionen deine Entscheidungen beeinflusst haben. Suche nach Mustern: Revenge-Trades nach Verlusten, Selbstüberschätzung nach Gewinnen.' },
        { name: 'Beurteile das Risikomanagement', text: 'Prüfe, ob du Positionsgrößen-Regeln, maximale Tagesverlustgrenzen und Korrelations-Exposure über alle Trades hinweg respektiert hast.' },
        { name: 'Setze ein Verbesserungsziel', text: 'Wähle genau eine konkrete, messbare Verbesserung für nächste Woche. Schreib sie auf und platziere sie dort, wo du sie vor dem Traden siehst.' },
      ]}
    >
      <Intro>
        Der Unterschied zwischen Tradern, die besser werden, und Tradern, die Monat für Monat dieselben Fehler wiederholen, ist fast immer derselbe: Die eine Gruppe überprüft ihre Leistung systematisch, die andere nicht. Ein wöchentliches Trading-Review ist für ernsthafte Entwicklung nicht optional. Es ist der Mechanismus, durch den Muster sichtbar werden, Fehler zu Lektionen werden und Lektionen zu Gewohnheiten.
      </Intro>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>Review-Bereiche: Statistik, Disziplin,<br />Prozess, Psychologie, Ziele</> },
        { value: 1, decimals: 0, label: <>Verbesserungsfokus pro Woche —<br />summiert sich auf 50 pro Jahr</> },
        { value: 30, decimals: 0, suffix: ' Min', label: <>wöchentliches Review-Fenster —<br />genug für Muster, nicht für Rauschen</> },
      ]} />

      <H2>Warum wöchentlich — nicht täglich</H2>
      <P>
        Tägliche Reviews sind nützlich, um Trades zu loggen, solange die Details frisch sind — also deine <Link to="/blog/10-questions-after-every-trade" className="text-kmf-accent hover:underline">Fragen nach dem Trade</Link> zu beantworten — aber sie sind zu nah am Geschehen für Mustererkennung. An einem beliebigen Tag hattest du vielleicht zwei Trades. Das sind nicht genug Daten, um zu bemerken, dass du dienstags konstant überhandelst oder dass deine Montagmorgen-Setups eine deutlich höhere Verlustrate haben.
      </P>
      <P>
        Wöchentliche Reviews bieten die richtige Auflösung. Du hast genug Trades, um kurzfristige Muster zu erkennen, genug Zeit ist vergangen, um Entscheidungen mit emotionalem Abstand zu prüfen, und die Frequenz ist hoch genug, dass du dein Verhalten als Reaktion auf das Gefundene tatsächlich ändern kannst.
      </P>
      <Callout title="Timing-Empfehlung" color="#FFB300">
        Samstagmorgen ist für die meisten Trader die ideale Zeit. Die Märkte sind geschlossen, die Woche ist frisch in Erinnerung, und du hast genug Abstand zur Freitags-Session, um objektiv zu prüfen. Blockiere 30–45 Minuten und behandle es als nicht verhandelbaren Termin.
      </Callout>

      <Divider />

      <H2>Die 5 Bereiche, die du jede Woche überprüfst</H2>

      <H3>1. Statistik-Review</H3>
      <P>
        Beginne mit den Zahlen. Vor jeder qualitativen Analyse sieh dir die Rohdaten der Woche an. Das verankert dein Review in Fakten statt in Eindrücken, die oft durch Recency-Bias verzerrt sind (dein jüngster Trade färbt tendenziell deine Wahrnehmung der ganzen Woche).
      </P>
      <Ul items={[
        'Wie viele Trades habe ich diese Woche gemacht?',
        'Wie waren meine Win Rate, mein Ø-Gewinn, mein Ø-Verlust und mein Profit Factor?',
        'Was waren meine besten und schlechtesten Trades, und was machte sie unterschiedlich?',
      ]} />

      <H3>2. Disziplin-Review</H3>
      <P>
        Disziplin ist messbar. Frag für jeden Trade dieser Woche, ob du deinen Regeln exakt gefolgt bist. Nicht ungefähr. Exakt. Das erzeugt eine „Regeltreue-Rate", eine der nützlichsten Kennzahlen, die ein angehender Trader verfolgen kann.
      </P>
      <Ul items={[
        'Welcher Prozentsatz meiner Trades folgte meinen Einstiegskriterien ohne Abweichung?',
        'Habe ich alle Stop Losses respektiert, oder habe ich einen gegen den Trade verschoben?',
        'Wie viele Trades waren Impuls-Trades außerhalb meiner definierten Setups?',
      ]} />

      <H3>3. Prozess-Review</H3>
      <P>
        Trenne die Qualität deines Prozesses von der Qualität des Ergebnisses. Ein Trade, der deinen Regeln perfekt folgte, aber Geld verlor, ist ein besserer Trade als einer, der deine Regeln brach, aber Geld machte — <Link to="/blog/good-loss-vs-bad-win" className="text-kmf-accent hover:underline">gute Verluste vs schlechte Gewinne</Link> zu verstehen ist hierfür essenziell. Das Prozess-Review trainiert dich, dich an dem zu messen, was du tatsächlich kontrollieren kannst.
      </P>
      <Ul items={[
        'Entsprachen meine Einstiege meinen Setup-Kriterien für Zeitrahmen, Struktur und Bestätigung?',
        'Waren meine Stop Losses auf logischen Niveaus platziert oder willkürlich?',
        'Habe ich offene Trades nach Plan gemanagt oder vorzeitig eingegriffen?',
      ]} />

      <H3>4. Psychologisches Review</H3>
      <P>
        Emotion hinterlässt Fingerabdrücke in deinen Trading-Daten. Größer-als-normale Verluste, ungewöhnlich häufige Trades, Positionsgrößen, die von deinen Regeln abweichen — diese haben oft eine emotionale Ursache. Dieser Abschnitt macht das Unsichtbare sichtbar.
      </P>
      <Ul items={[
        'An welchen Tagen beeinflussten Emotionen meine Entscheidungen am meisten, und was löste es aus?',
        'Gab es Momente von Revenge Trading, FOMO-Einstiegen oder vorzeitigen, von Angst getriebenen Ausstiegen?',
        'Wie war mein allgemeines Stressniveau diese Woche, und wie korrelierte es mit meiner Leistung?',
      ]} />

      <H3>5. Ziele-Review</H3>
      <P>
        Eine Trading-Session ohne Ziel ist nur vor Charts verbrachte Zeit. Ziele geben der Woche Struktur und dem Review etwas Konkretes zum Bewerten. Sie sollten prozessfokussiert sein, nicht ergebnisfokussiert — „meine Checkliste bei jedem Trade befolgen" ist ein nützliches Ziel; „diese Woche $500 machen" nicht, weil es nicht in deiner direkten Kontrolle liegt.
      </P>
      <Ul items={[
        'Habe ich die Prozessziele erreicht, die ich zu Beginn dieser Woche gesetzt habe?',
        'Was ist die eine konkrete Sache, auf deren Verbesserung ich mich nächste Woche konzentriere?',
        'Was ist eine Sache, die ich diese Woche gut gemacht habe und verstärken will?',
      ]} />

      <Divider />

      <H2>Das komplette Wochen-Review-Template</H2>
      <P>
        Nutze diese 15 Fragen als deinen Review-Rahmen. Du musst keinen Roman zu jeder schreiben — ein bis zwei Sätze reichen. Das Ziel ist strukturierte Reflexion, nicht Journaling um seiner selbst willen.
      </P>
      <Table
        headers={['Bereich', 'Frage']}
        rows={[
          ['Statistik', 'Trades gesamt, Gewinne, Verluste, Netto-Gewinn/Verlust der Woche?'],
          ['Statistik', 'Wie waren mein Profit Factor und mein durchschnittliches R-Vielfaches diese Woche?'],
          ['Statistik', 'Was war mein einzelner bester Trade, und warum funktionierte er?'],
          ['Disziplin', 'Welcher Prozentsatz der Trades folgte meinen Einstiegskriterien exakt?'],
          ['Disziplin', 'Habe ich jeden Stop Loss respektiert? Wenn nicht, welche Trades und warum?'],
          ['Disziplin', 'Wie viele Trades lagen außerhalb meiner definierten Setups?'],
          ['Prozess', 'Waren meine Einstiege relativ zu meinen Setup-Kriterien gut getimt?'],
          ['Prozess', 'Waren meine Stop Losses auf strukturellen Niveaus oder willkürlich?'],
          ['Prozess', 'Bin ich nach Plan ausgestiegen, oder trieb Emotion frühe oder späte Ausstiege?'],
          ['Psychologie', 'Welche Session oder welcher Tag war am stärksten von Emotion betroffen?'],
          ['Psychologie', 'Habe ich diese Woche Revenge-getradet, FOMO-eingestiegen oder aus Angst früh ausgestiegen?'],
          ['Psychologie', 'Wie beeinflusste mein Leben außerhalb des Tradings (Schlaf, Stress) meine Leistung?'],
          ['Ziele', 'Habe ich mein Prozessziel aus dem Review der Vorwoche erreicht?'],
          ['Ziele', 'Was ist die EINE Sache, auf deren Verbesserung ich mich nächste Woche konzentriere?'],
          ['Ziele', 'Was ist eine Sache, die ich diese Woche gut gemacht habe und bewusst wiederholen will?'],
        ]}
      />

      <H2>Wie du auf dein Review reagierst</H2>
      <P>
        Der häufigste Fehler, den Trader bei Reviews machen, ist, fünf Probleme zu identifizieren und alle gleichzeitig beheben zu wollen. So funktioniert Skill-Entwicklung nicht. Wähle ein Problem — das wirkungsvollste — und konzentriere dich nächste Woche ganz darauf. Schreib es oben in deinen Trading-Plan. Lies es vor jeder Session. Am Ende der folgenden Woche beurteile, ob du dich bei dieser einen Kennzahl verbessert hast.
      </P>
      <P>
        Eine bedeutende Sache pro Woche zu beheben bedeutet, 50 Dinge pro Jahr zu beheben. Verzinste Verbesserung in diesem Tempo verwandelt Trader.
      </P>

      <H2>Wie lange sollte es dauern?</H2>
      <P>
        Dreißig bis fünfundvierzig Minuten sind die richtige Spanne. Weniger als 30 Minuten deuten darauf hin, dass du zu schnell vorgehst und oberflächlich bist. Mehr als 45 Minuten bedeuten meist, dass du einzelne Trades überanalysierst, statt nach Mustern über die Woche zu suchen. Das Ziel ist nicht, jeden Tick auf jedem Chart erneut zu prüfen — es ist, die drei oder vier zentralen Erkenntnisse herauszuziehen, die nächste Woche besser machen.
      </P>

      <Takeaways items={[
        'Wöchentliche Reviews sind der Hauptmechanismus, durch den Trader tatsächlich besser werden — nicht Bildschirmzeit allein.',
        'Überprüfe jede Woche fünf Bereiche: Statistik, Disziplin, Prozess, Psychologie und Ziele.',
        'Miss deine Regeltreue-Rate — welcher Prozentsatz der Trades folgte deinem Plan exakt.',
        'Trenne Prozessqualität von Ergebnisqualität. Ein perfekter Verlust ist wertvoller als ein glücklicher Gewinn.',
        'Wähle EINE Sache, die du jede Woche verbesserst. Fokussierte Iteration verzinst sich über ein Jahr rapide.',
        '30–45 Minuten am Samstagmorgen sind für die meisten Retail-Trader das optimale Timing.',
      ]} />
    </BlogArticleLayout>
  );
}
