import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PositionSizingGuideDe() {
  return (
    <BlogArticleLayout
      slug="position-sizing-guide"
      lang="de"
      title="Positionsgrößen-Leitfaden: Wie viel solltest du traden?"
      metaTitle="Positionsgrößen-Formel: Die Fähigkeit Nr. 1, die Profis von gesprengten Konten trennt | K.M.F."
      metaDescription="Die Positionsgröße ist die am meisten unterschätzte Fähigkeit im Trading. Lerne die genaue Formel, um zu berechnen, wie viel du basierend auf Kontogröße, Risikotoleranz und Stop-Loss-Abstand traden solltest."
      date="10. Februar 2026"
      dateISO="2026-02-10"
      dateModified="2026-03-22"
      readTime="7 Min. Lesezeit"
      category="Risikomanagement"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'crypto-vs-forex-journaling', title: 'Crypto vs Forex: Why Your Trading Journal Needs Different Rules for Each Market', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Was ist Positionsgrößenbestimmung im Trading?', answer: 'Die Positionsgrößenbestimmung legt fest, wie viel Kapital du einem einzelnen Trade zuteilst, basierend auf Kontogröße, Risikotoleranz und Stop-Loss-Abstand. Es ist die wichtigste Risikomanagement-Fähigkeit im Trading.' },
        { question: 'Wie berechne ich die Positionsgröße für Forex?', answer: 'Teile deinen Risikobetrag (Kontogröße × Risikoprozentsatz) durch deinen Stop Loss in Pips × Pip-Wert. Beispiel: Auf einem $10.000-Konto mit 1 % Risiko und 50-Pip-Stop-Loss wäre deine Positionsgröße 0,20 Lots.' },
        { question: 'Welchen Prozentsatz sollte ich pro Trade riskieren?', answer: 'Die meisten professionellen Trader riskieren zwischen 0,5 % und 2 % ihres Kontos pro Trade. Die 1-%-Regel ist der häufigste Ausgangspunkt für konstantes Risikomanagement.' },
      ]}
      howToSteps={[
        { name: 'Bestimme deinen Risikoprozentsatz', text: 'Wähle, wie viel deines Kontos du bei diesem Trade zu verlieren bereit bist. Beginne mit 1 % für die meisten Setups.' },
        { name: 'Berechne deinen Risikobetrag', text: 'Multipliziere deinen Kontostand mit deinem Risikoprozentsatz. Auf einem $10.000-Konto bei 1 % ist dein Risikobetrag $100.' },
        { name: 'Setze deinen Stop Loss', text: 'Platziere deinen Stop Loss am technischen Invalidierungspunkt. Miss den Abstand in Pips von deinem Einstieg zu deinem Stop.' },
        { name: 'Berechne die Positionsgröße', text: 'Teile den Risikobetrag durch (Stop Loss in Pips × Pip-Wert). Das ergibt die genaue Lot-Größe für diesen Trade.' },
        { name: 'Prüfen und einsteigen', text: 'Vergewissere dich, dass die Positionsgröße relativ zu deinem Konto stimmig wirkt. Wirkt sie zu groß, reduziere den Risikoprozentsatz — verbreitere nie den Stop.' },
      ]}
    >
      <Intro>
        Nimm zwei Trader mit identischen Strategien, identischen Setups, identischen Ein- und Ausstiegspunkten. Der eine baut sein Konto über Jahre konstant auf. Der andere sprengt es innerhalb von Monaten. Der Unterschied ist fast immer die Positionsgröße. Die Positionsgröße ist die einzige wichtigste Variable, die du im Trading direkt kontrollierst — und die von Anfängern am konstantesten unterschätzt wird.
      </Intro>

      <StatsStrip items={[
        { value: 1, decimals: 0, suffix: '%', label: <>Standard-Risiko pro Trade<br />von Profis genutzt</> },
        { value: 0.5, decimals: 1, suffix: '%', label: <>empfohlen für Anfänger,<br />bis 50+ Trades validiert sind</> },
        { value: 10, decimals: 0, suffix: '$', label: <>pro Pip bei einem Standard-Lot<br />(Forex, USD-notierte Paare)</> },
      ]} />

      <H2>Die grundlegende Formel</H2>
      <P>
        Die Positionsgrößenbestimmung beginnt mit einem einzigen Prinzip: Entscheide, wie viel deines Kontos du bei diesem Trade zu verlieren bereit bist, und lass diese Zahl deine Positionsgröße bestimmen. Nicht umgekehrt.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Positionsgröße = Risikobetrag ÷ Stop-Loss-Abstand (in Preiseinheiten)</strong>
      </P>
      <P>
        Jede Variante der Positionsgrößenberechnung — ob für Forex-Lots, Aktien-Stücke oder Krypto-Einheiten — ist eine Abwandlung dieser Kernformel. Die Eingaben ändern sich je nach Markt, aber die Logik ist identisch. Beachte, dass es <Link to="/blog/crypto-vs-forex-journaling" className="text-kmf-accent hover:underline">unterschiedliche Regeln für Krypto vs Forex</Link> gibt, wenn es um Journaling und Risiko geht.
      </P>

      <H2>Schritt-für-Schritt-Prozess</H2>
      <Ul items={[
        'Schritt 1: Entscheide deinen Risikoprozentsatz (typisch 1 % des Kontos für etablierte Trader, 0,5 % für Anfänger)',
        'Schritt 2: Berechne deinen Risikobetrag in Dollar: Risikobetrag = Kontostand × Risiko-%',
        'Schritt 3: Identifiziere dein Stop-Loss-Level anhand der Marktstruktur — platziere es am technischen Invalidierungspunkt, nicht nach Bequemlichkeit',
        'Schritt 4: Berechne den Stop-Loss-Abstand in Preiseinheiten (Einstiegspreis − Stop-Loss-Preis)',
        'Schritt 5: Berechne die Positionsgröße: Positionsgröße = Risikobetrag ÷ Stop-Loss-Abstand',
      ]} />
      <Callout title="Die goldene Regel" color="#00C853">
        Berechne die Positionsgröße immer aus deinem Stop Loss, verschiebe nie deinen Stop Loss, um deine bevorzugte Positionsgröße passend zu machen. Diese Logik umzudrehen ist einer der häufigsten — und zerstörerischsten — Fehler im Retail-Trading.
      </Callout>
      <Callout>
        Willst du dir das Rechnen sparen? Nutze unseren <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">kostenlosen Lot-Size-Rechner</Link> — 340+ Instrumente, Echtzeit-Wechselkurse, sofortige Ergebnisse.
      </Callout>

      <Divider />

      <H2>Forex-Beispiel</H2>
      <P>
        Konto: $10.000. Risiko pro Trade: 1 % = $100.
        Trade: Long EUR/USD. Einstieg: 1,1000. Stop Loss: 1,0950 (50 Pips unter dem Einstieg).
      </P>
      <P>
        Für einen Standard-Forex-Lot (100.000 Einheiten) ist jeder Pip $10 wert. Also ein 50-Pip-Stop = $500 Risiko pro Standard-Lot.
        Positionsgröße = $100 ÷ $500 pro Lot = 0,20 Lots (oder 2 Mini-Lots).
      </P>
      <P>
        Gewinnt der Trade an einem 2:1-Ziel (100 Pips, Ziel bei 1,1100): Gewinn = 100 Pips × $10 × 0,2 Lots = $200.
        Verliert der Trade am Stop: Verlust = 50 Pips × $10 × 0,2 Lots = $100. Genau 1 % des Kontos.
      </P>

      <H2>Aktien-Beispiel</H2>
      <P>
        Konto: $10.000. Risiko pro Trade: 1 % = $100.
        Trade: Long eine Aktie zu $50 pro Stück. Stop Loss: $48 (ein Abstand von $2,00 pro Stück).
      </P>
      <P>
        Positionsgröße = $100 ÷ $2,00 = 50 Aktien.
        Gesamter Positionswert: 50 × $50 = $2.500 (25 % des Kontos in dieser Position).
        Wird der Stop getroffen: 50 Aktien × $2,00 Verlust = $100. Genau 1 %.
        Liegt das Ziel bei $54 (2:1 R:R): 50 Aktien × $4,00 Gewinn = $200.
      </P>

      <H2>Krypto-Beispiel</H2>
      <P>
        Konto: $10.000. Risiko pro Trade: 1 % = $100.
        Trade: Long Bitcoin bei $40.000. Stop Loss: $39.000 ($1.000 Abstand pro BTC).
      </P>
      <P>
        Positionsgröße = $100 ÷ $1.000 = 0,10 BTC.
        Gesamter Positionswert: 0,10 × $40.000 = $4.000.
        Wird der Stop getroffen: 0,10 BTC × $1.000 = $100. Genau 1 %.
        Liegt das Ziel bei $42.000 (2:1 R:R): 0,10 × $2.000 = $200.
      </P>

      <Divider />

      <H2>Positionsgrößen-Referenztabelle</H2>
      <Table
        headers={['Kontogröße', 'Risiko %', 'Risikobetrag', 'Stop-Abstand', 'Positionsgröße (Einheiten)']}
        rows={[
          ['$5.000', { value: '1 %', color: 'green' }, '$50', '$2,00 (Aktien)', { value: '25 Aktien', color: 'cyan' }],
          ['$10.000', { value: '1 %', color: 'green' }, '$100', '$2,00 (Aktien)', { value: '50 Aktien', color: 'cyan' }],
          ['$25.000', { value: '1 %', color: 'green' }, '$250', '$2,00 (Aktien)', { value: '125 Aktien', color: 'cyan' }],
          ['$10.000', { value: '1 %', color: 'green' }, '$100', '50 Pips (Forex)', { value: '0,20 Lots', color: 'cyan' }],
          ['$10.000', { value: '0,5 %', color: 'green' }, '$50', '50 Pips (Forex)', { value: '0,10 Lots', color: 'cyan' }],
          ['$10.000', { value: '2 %', color: 'gold' }, '$200', '50 Pips (Forex)', { value: '0,40 Lots', color: 'gold' }],
        ]}
      />

      <H2>Positionsgröße in volatilen Märkten</H2>
      <P>
        In Phasen erhöhter Volatilität — große Nachrichtenereignisse, Earnings-Saisons oder Marktverwerfungen — sollte sich dein Stop-Loss-Abstand vergrößern, um größere als normale Kursschwankungen zu berücksichtigen. Ein breiterer Stop bedeutet eine kleinere Positionsgröße bei gleichem Risikobetrag. Genau das soll passieren.
      </P>
      <P>
        Viele Trader machen den Fehler, in volatilen Phasen ihre übliche Positionsgröße beizubehalten, einen für die Bedingungen zu engen Stop zu setzen, wiederholt ausgestoppt zu werden und anzunehmen, ihre Strategie funktioniere nicht mehr. Die richtige Anpassung erfolgt automatisch, wenn du der Positionsgrößen-Formel folgst: breiterer Stop → kleinere Position → gleiches Dollar-Risiko.
      </P>
      <H3>Praktische Anpassung für volatile Sessions</H3>
      <Ul items={[
        'Prüfe den ATR vor dem Einstieg: Liegt der 14-Perioden-ATR mehr als 1,5× über seinem jüngsten Durchschnitt, erwäge vorsorglich, deine Positionsgröße zu halbieren.',
        'Vermeide das Traden in den 30 Minuten vor und nach großen Wirtschaftsmeldungen, wenn deine Strategie nicht für diese Volatilität ausgelegt ist.',
        'An außergewöhnlich volatilen Tagen (z. B. überraschende Zentralbankentscheidungen) erwäge, ganz auszusetzen oder minimale Positionsgrößen zu nutzen.',
      ]} />

      <H2>Das Anti-Muster: Größe nach Gefühl</H2>
      <P>
        Viele Trader — besonders die, die aus einem Hintergrund des Marktbeobachtens ohne Traden kommen — entwickeln die Gewohnheit, Positionen danach zu dimensionieren, wie überzeugt sie von einem Setup sind. „Das sieht richtig gut aus, ich setze mehr ein." Das ist das Anti-Muster.
      </P>
      <P>
        Kein Trade ist so gut, dass er rechtfertigt, deine Risikoregeln zu verletzen. <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">Die 1-%-Risikoregel</Link> gilt für jeden Trade, auch für den, der wie eine sichere Sache aussieht. Märkte sind per Definition ungewiss, und überzeugungsbasierte Positionsgrößen sind ein Bias, kein Edge. Konstant nach Formel zu dimensionieren ist das, was inkonstante Trader in konstante verwandelt.
      </P>

      <Takeaways items={[
        'Positionsgröße = Risikobetrag ÷ Stop-Loss-Abstand. Diese Formel gilt für Forex, Aktien und Krypto — nur die Einheiten ändern sich.',
        'Bestimme immer zuerst dein Stop-Loss-Level, dann berechne daraus die Positionsgröße. Niemals umgekehrt.',
        'In volatilen Märkten reduzieren breitere Stops automatisch die Positionsgröße bei gleichem Dollar-Risiko — das ist das System, das korrekt arbeitet.',
        'Ein $10.000-Konto mit 1 % Risiko kann pro Trade nur $100 verlieren. Über 10 Verluste in Folge steht das Konto noch bei $90.451 (nicht $90.000, dank Verzinsung).',
        'Größe nach Gefühl oder Überzeugungsgrad führt einen der gefährlichsten Bias im Trading ein. Nutze jedes Mal die Formel.',
        'Anfänger sollten 0,5 % Risiko nutzen, bis ihre Strategie über mindestens 50 Trades validiert ist.',
      ]} />
    </BlogArticleLayout>
  );
}
