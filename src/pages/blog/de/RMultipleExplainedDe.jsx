import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { RMultipleDistribution } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function RMultipleExplainedDe() {
  return (
    <BlogArticleLayout
      slug="r-multiple-explained"
      lang="de"
      title="R-Vielfaches erklärt: Wie du Trade-Qualität misst (nicht nur Gewinn)"
      metaTitle="R-Vielfaches: Die eine Kennzahl, die Gewinner-Trader von Verlierern trennt | K.M.F."
      metaDescription="Das R-Vielfache ist die ehrlichste Art, deine Trades zu bewerten. Lerne, was R bedeutet, wie man es berechnet und warum ein −$50-Trade besser sein kann als ein +$200-Trade."
      date="20. Januar 2026"
      dateISO="2026-01-20"
      readTime="6 Min. Lesezeit"
      category="Statistik"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst', category: 'Improvement' },
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Was ist das R-Vielfache im Trading?', answer: 'Das R-Vielfache misst die Trade-Leistung relativ zum ursprünglichen Risiko (R). Ein Trade, der $100 riskiert und $300 gewinnt, hat ein R-Vielfaches von +3R. Ein Trade, der $100 verliert, ist −1R. Es normiert Ergebnisse über verschiedene Positionsgrößen.' },
        { question: 'Wie berechne ich das R-Vielfache?', answer: 'R-Vielfaches = (Ausstiegspreis − Einstiegspreis) / (Einstiegspreis − Stop-Loss-Preis). Bei Long-Trades bedeutet ein positives Ergebnis Gewinn. Entscheidend ist, dass jeder Trade in Risikoeinheiten gemessen wird, nicht in Dollar.' },
        { question: 'Was ist ein gutes R-Vielfaches?', answer: 'Die meisten profitablen Trader streben über alle Trades ein durchschnittliches R-Vielfaches über +0,5R an. Einzelne gewinnende Trades von +2R bis +3R gelten als exzellent. Die Schlüsselkennzahl ist dein durchschnittliches R über eine große Stichprobe von Trades.' },
      ]}
    >
      <Intro>
        Die meisten Trader bewerten ihre Trades, indem sie auf den Dollar-Gewinn oder -Verlust schauen. Aber der Dollar-Gewinn/Verlust ist eine der am wenigsten aussagekräftigen Kennzahlen, die dir zur Verfügung stehen. Ein $500-Gewinn könnte ein schrecklicher Trade sein. Ein $50-Verlust könnte ein exzellenter Trade sein. Das R-Vielfache ist die Kennzahl, die die Wahrheit enthüllt — es misst nicht, was du gewonnen oder verloren hast, sondern wie gut du relativ zum eingegangenen Risiko ausgeführt hast.
      </Intro>

      <StatsStrip items={[
        { value: 0.5, decimals: 1, suffix: 'R', label: <>durchschnittliches Ziel pro Trade<br />für einen tragfähigen Edge</> },
        { value: 2, decimals: 0, suffix: 'R', label: <>typisches geplantes Ziel<br />bei einem 1:2-R:R-Setup</> },
        { value: 30, decimals: 0, suffix: '+', label: <>Trades minimum,<br />bevor man eine Strategie beurteilt</> },
      ]} />

      <H2>Was ist R?</H2>
      <P>
        R steht für „Risiko" — konkret den genauen Geldbetrag, den du beim Einstieg in den Trade riskiert hast. R wird durch deinen <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">Stop Loss</Link> definiert: es ist der Abstand von deinem Einstieg zu deinem Stop Loss, multipliziert mit deiner Positionsgröße.
      </P>
      <P>
        Bist du mit einem $150-Stop in einen Trade eingestiegen (das heißt, wenn der Trade vollständig gegen dich läuft und den Stop trifft, verlierst du $150), dann ist R = $150 für diesen Trade. Alles andere wird relativ zu dieser Zahl gemessen.
      </P>
      <Callout title="R ist immer trade-spezifisch" color="#4FC3F7">
        R ist kein fester Dollarbetrag. Es ändert sich mit jedem Trade, weil es von deinem Stop-Abstand und deiner Positionsgröße abhängt. Zwei Trades können beide „1 % Risiko" sein, aber unterschiedliche R-Werte haben, wenn die Positionsgrößen sich unterscheiden — in der Praxis ist dein R jedoch über Trades hinweg ähnlich, wenn du konstantes Risikomanagement befolgst.
      </Callout>

      <H2>Wie man das R-Vielfache berechnet</H2>
      <P>
        Sobald du R für einen Trade kennst, ist die Berechnung des R-Vielfachen unkompliziert:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>R-Vielfaches = Tatsächlicher Gewinn/Verlust ÷ Ursprüngliches Risiko (R)</strong>
      </P>
      <P>
        Das ergibt eine Zahl, die das Ergebnis in Einheiten deines ursprünglichen Risikos ausdrückt. Beispiele:
      </P>
      <Ul items={[
        '$100 riskiert, $200 gewonnen → R-Vielfaches = +2R (du hast das Doppelte deines Risikos gemacht)',
        '$100 riskiert, $100 verloren (voller Stop getroffen) → R-Vielfaches = −1R (Standard-Vollverlust)',
        '$100 riskiert, $50 verloren (Stop auf Break-even gezogen, dann Teilverlust) → R-Vielfaches = −0,5R',
        '$100 riskiert, $350 gewonnen → R-Vielfaches = +3,5R (starker Trade, Ziel übertroffen)',
        '$100 riskiert, $40 gewonnen (Gewinn früh mitgenommen) → R-Vielfaches = +0,4R (unter Plan)',
      ]} />

      <H2>Warum das R-Vielfache besser ist als der Dollar-Gewinn/Verlust</H2>
      <H3>Es normiert über Kontogrößen hinweg</H3>
      <P>
        Ein Trader mit einem $5.000-Konto und ein Trader mit einem $500.000-Konto können ihre Dollar-Gewinne nicht sinnvoll vergleichen. Aber sie können R-Vielfache vergleichen. Ein +2R-Trade ist ein +2R-Trade, unabhängig von der Kontogröße. Das macht das R-Vielfache zur universellen Sprache der Trade-Bewertung.
      </P>
      <H3>Es trennt Prozess von Ergebnis</H3>
      <P>
        Betrachte zwei Szenarien. Im ersten gehst du einen Trade ein, der dein 3R-Ziel perfekt erreicht. Du verdienst +3R. Im zweiten gehst du einen Trade ohne klares Ziel ein, hast Glück mit einer großen Bewegung und steigst mit +3R aus. Das Dollar-Ergebnis ist identisch — aber der erste war ein exzellenter Trade und der zweite ein glücklicher.
      </P>
      <P>
        Das R-Vielfache, kombiniert mit deiner Bewertung der Ausführungsqualität, sagt dir, ob du deinem Plan gefolgt bist. Der Dollar-Gewinn/Verlust allein kann das nicht.
      </P>
      <H3>Es deckt frühe Ausstiege und ausgedehnte Verluste auf</H3>
      <P>
        Hatte dein geplanter Trade ein 2R-Ziel, aber du hast bei +0,6R geschlossen, weil du nervös wurdest, erfasst das R-Vielfache genau diese Differenz. Hast du einen Trade über deinen Stop hinaus laufen lassen und bei −1,8R statt −1R geschlossen, zeigt das R-Vielfache den Disziplin-Bruch. Dollarbeträge verschleiern diese Abweichungen; R-Vielfache decken sie auf.
      </P>

      <Divider />

      <H2>Was ist ein gutes durchschnittliches R-Vielfaches?</H2>
      <P>
        Das durchschnittliche R-Vielfache (manchmal Erwartungswert in R-Einheiten genannt) ist die einzige wichtigste Leistungskennzahl deiner Strategie. Es beantwortet: Wie viel verdienst du im Mittel pro riskiertem Dollar, pro Trade?
      </P>
      <Table
        headers={['Win Rate', 'Ø-R-Gewinn', 'Ø-R-Verlust', 'Erwartungswert (R)']}
        rows={[
          ['50 %', '+2,0R', '−1,0R', { value: '+0,50R pro Trade', color: 'green' }],
          ['40 %', '+3,0R', '−1,0R', { value: '+0,60R pro Trade', color: 'green' }],
          ['60 %', '+1,5R', '−1,0R', { value: '+0,50R pro Trade', color: 'green' }],
          ['35 %', '+2,0R', '−1,0R', { value: '+0,05R pro Trade (kaum tragfähig)', color: 'gold' }],
          ['70 %', '+0,8R', '−1,0R', { value: '−0,04R pro Trade (verlierend)', color: 'red' }],
          ['45 %', '+1,8R', '−1,0R', { value: '+0,26R pro Trade', color: 'cyan' }],
        ]}
      />

      <RMultipleDistribution />

      <P>
        Jeder positive Erwartungswert in R-Einheiten ist eine tragfähige Strategie. Ein Erwartungswert über +0,5R pro Trade gilt als gut. Beachte, dass das Beispiel mit 70 % Win Rate in der Tabelle einen negativen Erwartungswert hat — weil die durchschnittlichen Gewinner kleiner sind als die durchschnittlichen Verluste.
      </P>

      <H2>Das R-Vielfache zur Bewertung deiner Strategie nutzen</H2>
      <P>
        Nach 30 oder mehr Trades berechne dein durchschnittliches R-Vielfaches. Ist es negativ, verliert deine Strategie, unabhängig davon, wie es sich in Dollar anfühlt. Ist es positiv, aber unter +0,2R, ist die Strategie geringfügig tragfähig, aber fragil — Slippage, Spreads und Kommissionen können sie auslöschen.
      </P>
      <P>
        Nützlicher noch: Du kannst das R-Vielfache nach Setup-Typ, Instrument, Session oder Wochentag segmentieren. Wenn deine London-Session-Setups im Schnitt +0,8R bringen, deine New-York-Setups aber −0,3R, ist das eine umsetzbare Erkenntnis — fokussiere dich auf London-Sessions und eliminiere oder paper-trade New York, bis du das Problem identifizierst.
      </P>

      <H3>Die Verbindung zum Erwartungswert</H3>
      <P>
        Das R-Vielfache pro Trade, gemittelt über deine Trade-Historie, ist die Grundlage der <Link to="/blog/trading-expectancy-explained" className="text-kmf-accent hover:underline">Erwartungswert-Berechnung</Link> deiner Strategie. Der Erwartungswert sagt dir den erwarteten Wert jedes Trades, den du eingehst. Das R-Vielfach-Denken zu meistern ist der erste Schritt, den Erwartungswert tief zu verstehen. Kombiniert mit dem <Link to="/blog/profit-factor-vs-win-rate" className="text-kmf-accent hover:underline">Profit Factor</Link> geben dir diese Kennzahlen das vollständige Bild der Tragfähigkeit deiner Strategie.
      </P>

      <Takeaways items={[
        'R ist der Betrag, den du pro Trade riskierst, definiert durch deinen Stop-Loss-Abstand und deine Positionsgröße.',
        'R-Vielfaches = tatsächlicher Gewinn/Verlust geteilt durch dein ursprüngliches Risiko (R). Es drückt das Ergebnis in Risikoeinheiten aus.',
        'Das R-Vielfache ist dem Dollar-Gewinn/Verlust überlegen, weil es über Konto- und Positionsgrößen hinweg normiert.',
        'Ein positives durchschnittliches R-Vielfaches über deine Trade-Historie bedeutet, dass deine Strategie einen Edge hat — unabhängig von Dollarbeträgen.',
        'Das R-Vielfache nach Setup, Instrument oder Session zu segmentieren deckt auf, wo dein echter Edge liegt.',
        'Ein durchschnittliches R-Vielfaches über +0,5R gilt allgemein als gute Strategie.',
      ]} />
    </BlogArticleLayout>
  );
}
