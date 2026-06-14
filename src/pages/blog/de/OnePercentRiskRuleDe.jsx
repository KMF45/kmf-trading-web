import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { RiskRuleEquityCurve } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function OnePercentRiskRuleDe() {
  return (
    <BlogArticleLayout
      slug="1-percent-risk-rule"
      lang="de"
      title="Die 1-%-Risikoregel: Die Trading-Regel, die professionelle Trader am Leben hält"
      metaTitle="Die 1-%-Regel: Warum Profis nie mehr riskieren (und du auch nicht solltest) | K.M.F."
      metaDescription="Erfahre, warum professionelle Trader nie mehr als 1 % pro Trade riskieren, wie man es berechnet und wie es dein Konto in Verlustserien schützt."
      date="9. Januar 2026"
      dateISO="2026-01-09"
      readTime="6 Min. Lesezeit"
      category="Risikomanagement"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Was ist die 1-%-Risikoregel im Trading?', answer: 'Die 1-%-Regel bedeutet, niemals mehr als 1 % deines gesamten Kontostands bei einem einzelnen Trade zu riskieren. Auf einem $10.000-Konto wäre dein maximaler Verlust pro Trade $100, unabhängig vom Instrument oder Zeitrahmen.' },
        { question: 'Wie wende ich die 1-%-Regel an?', answer: 'Berechne 1 % deines Kontostands, bestimme deinen Stop-Loss-Abstand, und teile dann den Risikobetrag durch den Stop-Loss-Abstand, um deine Positionsgröße zu erhalten. So hat jeder Trade dasselbe Risiko, unabhängig vom Markt.' },
        { question: 'Darf ich mehr als 1 % pro Trade riskieren?', answer: 'Manche erfahrene Trader nutzen 2 % pro Trade, aber mehr ist gefährlich. Mit 1 % Risiko ziehen selbst 10 Verluste in Folge dein Konto nur um etwa 9,5 % zurück. Mit 5 % Risiko würden 10 Verluste 40 % deines Kontos kosten.' },
      ]}
    >
      <Intro>
        Die meisten Retail-Trader, die ihr Konto sprengen, verlieren nicht wegen einer schlechten Strategie. Sie verlieren wegen schlechtem Risikomanagement. Sie finden ein Setup, das sie lieben, gehen zu groß rein, und ein Trade — oder eine schlechte Woche — nimmt 30 %, 50 % oder ihr gesamtes Kapital. Die 1-%-Risikoregel ist die einfachste, zuverlässigste Verteidigung gegen dieses Ergebnis.
      </Intro>

      <StatsStrip items={[
        { value: 1, decimals: 0, suffix: '%', label: <>max. Risiko pro Trade<br />(Branchenstandard)</> },
        { value: 100, decimals: 0, suffix: '%', label: <>Gewinn nötig zur Erholung<br />von 50 % Drawdown</> },
        { value: 50, decimals: 0, suffix: '+', label: <>Trades, um zu validieren,<br />dass eine Strategie funktioniert</> },
      ]} />

      <H2>Was ist die 1-%-Risikoregel?</H2>
      <P>
        Die 1-%-Risikoregel besagt, dass du bei keinem einzelnen Trade mehr als 1 % deines gesamten Trading-Kontos riskieren solltest. Risiko bedeutet hier den maximalen Betrag, den du zu verlieren bereit bist, wenn der Trade vollständig gegen dich läuft und deinen Stop Loss trifft.
      </P>
      <P>
        Ist dein Konto $10.000 groß, riskierst du nicht mehr als $100 pro Trade. Ist es $50.000 groß, riskierst du nicht mehr als $500. Die zentrale Erkenntnis: Diese Zahl leitet sich aus deiner Kontogröße ab, nicht aus einem festen Dollarbetrag — sie skaliert also mit deinem Kapital und schrumpft in Drawdowns von selbst.
      </P>

      <H2>Die Mathematik des Ruins: Warum das Risiko-% wichtiger ist, als du denkst</H2>
      <P>
        Verlustserien sind eine mathematische Gewissheit, selbst bei einer profitablen Strategie. Die Frage ist nicht, ob du eine Serie von Verlusten erlebst, sondern ob dein Konto sie lange genug übersteht, um die nächste Gewinnphase zu erreichen. Strategien zum <Link to="/blog/how-to-recover-from-losing-streak" className="text-kmf-accent hover:underline">Überstehen von Verlustserien</Link> zu verstehen ist genauso wichtig wie eine gute Einstiegsmethode.
      </P>
      <P>
        Sieh dir an, was aufeinanderfolgende Verluste bei verschiedenen Risikoniveaus mit deinem Konto machen:
      </P>
      <Table
        headers={['Verluste in Folge', '1 % Risiko', '2 % Risiko', '5 % Risiko', '10 % Risiko']}
        rows={[
          ['5 Verluste', { value: '−4,9 %', color: 'green' }, { value: '−9,6 %', color: 'cyan' }, { value: '−22,6 %', color: 'gold' }, { value: '−41,0 %', color: 'red' }],
          ['10 Verluste', { value: '−9,6 %', color: 'green' }, { value: '−18,3 %', color: 'cyan' }, { value: '−40,1 %', color: 'red' }, { value: '−65,1 %', color: 'red' }],
          ['15 Verluste', { value: '−14,0 %', color: 'cyan' }, { value: '−26,1 %', color: 'gold' }, { value: '−53,7 %', color: 'red' }, { value: '−79,4 %', color: 'red' }],
          ['20 Verluste', { value: '−18,2 %', color: 'cyan' }, { value: '−33,2 %', color: 'gold' }, { value: '−64,2 %', color: 'red' }, { value: '−87,8 %', color: 'red' }],
        ]}
      />

      <RiskRuleEquityCurve />

      <P>
        Bei 5 % Risiko pro Trade vernichtet eine 10er-Verlustserie — die für ein System mit 50 % Win Rate völlig im Rahmen normaler Varianz liegt — 40 % deines Kontos. An diesem Punkt brauchst du 67 % Gewinn, nur um wieder bei null zu sein. Bei 1 % Risiko lässt dieselbe Serie dir 90 % deines Kapitals intakt, und ein einfacher Gewinn von 11 % bringt dich zum Ausgangspunkt zurück.
      </P>
      <Callout title="Die Erholungs-Mathematik" color="#00C853">
        Ein Drawdown von 50 % erfordert 100 % Gewinn zur Erholung. Ein Drawdown von 20 % erfordert nur 25 % Gewinn. Sich gegen große Drawdowns zu schützen ist nicht konservativ — es ist mathematisch essenziell für langfristiges Überleben.
      </Callout>

      <H2>Wie man die Positionsgröße mit der 1-%-Regel berechnet</H2>
      <P>
        Die Formel hat zwei Schritte:
      </P>
      <Ul items={[
        'Schritt 1 — Berechne deinen Risikobetrag: Risikobetrag = Kontostand × 0,01',
        'Schritt 2 — Berechne die Positionsgröße: Positionsgröße = Risikobetrag ÷ (Einstiegspreis − Stop-Loss-Preis)',
      ]} />
      <P>
        Die <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">Stop-Loss-Platzierung</Link> kommt zuerst. Du identifizierst den logischen Invalidierungspunkt für deinen Trade, misst den Abstand zu deinem Einstieg und nutzt dann diesen Abstand, um zu bestimmen, wie groß deine Position sein sollte. Du platzierst einen Stop Loss nie nach der gewünschten <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">Positionsgröße</Link> — es funktioniert genau andersherum.
      </P>

      <H3>Durchgerechnetes Beispiel: Forex</H3>
      <P>
        Konto: $10.000. Risiko pro Trade: 1 % = $100.
        Einstieg: EUR/USD bei 1,0800. Stop Loss: 1,0750 (50 Pips unter dem Einstieg).
        Für einen Standard-Lot ist 1 Pip = $10. Also 50 Pips = $500 pro Lot.
        Positionsgröße = $100 ÷ $500 = 0,20 Lots (ein Mini-Lot und zwei Micro-Lots).
      </P>
      <P>
        Gewinnt dieser Trade an einem 2:1-Ziel (100 Pips über dem Einstieg bei 1,0900), beträgt der Gewinn $200 — ein sauberes 2R-Ergebnis. Verliert er am Stop, ist der Verlust genau $100, also 1 % des Kontos.
      </P>
      <Callout>
        Spar dir das Rechnen — nutze unseren <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">kostenlosen Lot-Size-Rechner</Link>, um in Sekunden die genaue Positionsgröße für jedes Instrument zu bekommen.
      </Callout>

      <Divider />

      <H2>Häufige Einwände — beantwortet</H2>
      <H3>„Meine Gewinne sind bei 1 % zu klein"</H3>
      <P>
        Dieser Einwand kommt meist daher, Dollarbeträge statt Prozentsätze zu vergleichen. Ein Gewinn von $100 auf einem $10.000-Konto sind 1 %. Über 100 Trades mit einem Profit Factor von 2,0 und 50 % Win Rate summiert sich das erheblich. Das Ziel im Trading sind keine großen Einzeltrades — es ist konstantes, sich verzinsendes Wachstum über Hunderte Trades.
      </P>
      <H3>„Ich habe 90 % Win Rate — ich kann mehr riskieren"</H3>
      <P>
        Selbst ein System mit 90 % Win Rate wird irgendwann mehrere Verluste in Folge produzieren. Eine anhaltende Serie von 5–7 Verlusten bei je 5 % Risiko kann einen Drawdown erzeugen, der emotional unerträglich und funktional gefährlich ist. Die 1-%-Regel ist eine Versicherung gegen Varianz, kein Spiegelbild deines Vertrauens in einen bestimmten Trade.
      </P>

      <H2>Die Regel an deine Situation anpassen</H2>
      <Ul items={[
        '0,5 % pro Trade — Empfohlen für neue Trader, die ihre Strategie noch validieren, oder in einer Phase schwacher Performance. Hält Verluste beim Lernen überschaubar.',
        '1 % pro Trade — Der Standard für erfahrene Retail-Trader. Balanciert Wachstum und Drawdown-Schutz.',
        '2 % pro Trade — Obergrenze für erfahrene Trader mit einer bewährten, gut getesteten Strategie und hohem Vertrauen in ihren Edge. Sollte nicht der Standard sein.',
        'Über 2 % — Spekulatives Territorium. Nur für sehr kurzfristige Situationen mit hoher Überzeugung angebracht und sollte nicht das normale Vorgehen sein.',
      ]} />

      <Takeaways items={[
        'Die 1-%-Risikoregel begrenzt deinen maximalen Verlust bei jedem einzelnen Trade auf 1 % deines gesamten Kontostands.',
        'Sie wird aus deinem Stop-Loss-Abstand berechnet, nicht willkürlich gewählt — die Positionsgröße leitet sich aus der Regel ab.',
        'Bei 1 % Risiko kostet dich eine 10er-Verlustserie weniger als 10 % deines Kontos, was erholbar ist.',
        'Anfänger sollten erwägen, bei 0,5 % zu beginnen, bis ihre Strategie über mindestens 50 Trades validiert ist.',
        'Die Regel verzinst sich zu deinen Gunsten: Ein wachsendes Konto bedeutet wachsende Positionsgrößen, ein schrumpfendes kleinere Positionen — das schützt dich in Drawdowns automatisch.',
      ]} />
    </BlogArticleLayout>
  );
}
