import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ExpectancyComparisonChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function TradingExpectancyExplainedDe() {
  return (
    <BlogArticleLayout
      slug="trading-expectancy-explained"
      lang="de"
      title="Trading-Erwartungswert erklärt: Die Formel, die zeigt, ob deine Strategie funktioniert"
      metaTitle="Trading-Erwartungswert: Die Formel, die zeigt, ob deine Strategie wirklich funktioniert | K.M.F."
      metaDescription="Der Erwartungswert ist die eine Zahl, die dir sagt, ob deine Trading-Strategie langfristig profitabel ist. Lerne die Formel, wie man sie berechnet und was sie für dein Trading bedeutet."
      date="3. Februar 2026"
      dateISO="2026-02-03"
      readTime="6 Min. Lesezeit"
      category="Statistik"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Was ist der Trading-Erwartungswert?', answer: 'Der Trading-Erwartungswert ist der durchschnittliche Betrag, den du pro Trade zu gewinnen oder zu verlieren erwartest. Die Formel lautet: (Win Rate × Ø-Gewinn) − (Verlustrate × Ø-Verlust). Eine positive Zahl bedeutet, dass deine Strategie über die Zeit profitabel ist.' },
        { question: 'Wie berechne ich meinen Trading-Erwartungswert?', answer: 'Ermittle aus deinem Trade-Journal deine Win Rate, deinen durchschnittlichen Gewinner-Trade und deinen durchschnittlichen Verlierer-Trade. Multipliziere die Win Rate mit dem Ø-Gewinn, ziehe (Verlustrate × Ø-Verlust) ab. Beispiel: (0,55 × $200) − (0,45 × $120) = $56 pro Trade.' },
        { question: 'Was ist ein guter Trading-Erwartungswert?', answer: 'Jeder positive Erwartungswert bedeutet, dass deine Strategie langfristig funktioniert. Entscheidend ist, den Erwartungswert über mindestens 50–100 Trades zu berechnen, um ein statistisch aussagekräftiges Ergebnis zu erhalten.' },
      ]}
    >
      <Intro>
        Was, wenn du mit mathematischer Gewissheit wissen könntest, ob deine Trading-Strategie langfristig Geld verdient — bevor du sie jahrelang gehandelt hast? Der Erwartungswert ist die Formel, die dir genau das gibt. Es ist die eine Zahl, die die Profitabilität jeder Strategie zusammenfasst, und jeder ernsthafte Trader sollte sie innerhalb von Minuten aus seiner Trade-Historie berechnen können.
      </Intro>

      <StatsStrip items={[
        { value: 0.5, decimals: 1, suffix: 'R', label: <>pro Trade — Schwelle<br />für einen starken Edge</> },
        { value: 100, decimals: 0, suffix: '+', label: <>Trades nötig<br />für verlässlichen Erwartungswert</> },
        { value: 50, decimals: 0, suffix: '%', label: <>Win Rate ist irrelevant<br />ohne R:R-Kontext</> },
      ]} />

      <H2>Was ist der Erwartungswert?</H2>
      <P>
        Der Erwartungswert ist der durchschnittliche Geldbetrag, den du pro Trade zu gewinnen (oder zu verlieren) erwarten kannst, im Mittel über eine große Stichprobe von Trades. Er beantwortet die Frage: Wenn ich diesen Trade tausendmal eingehe, was ist das durchschnittliche Ergebnis pro Trade?
      </P>
      <P>
        Ein positiver Erwartungswert bedeutet, die Strategie ist langfristig profitabel. Ein negativer Erwartungswert bedeutet, sie verliert langfristig Geld, unabhängig von kurzfristigen Ergebnissen. Die Größe des Erwartungswerts sagt dir, wie robust der Edge ist.
      </P>

      <H2>Die Formel</H2>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Erwartungswert = (Win Rate × Ø-Gewinn) − (Verlustrate × Ø-Verlust)</strong>
      </P>
      <P>
        Dabei gilt:
      </P>
      <Ul items={[
        'Win Rate = Prozentsatz der profitablen Trades (z. B. 0,50 für 50 %)',
        'Ø-Gewinn = durchschnittlicher Dollar-Gewinn bei Gewinner-Trades',
        'Verlustrate = 1 − Win Rate (Prozentsatz der Verlierer-Trades)',
        'Ø-Verlust = durchschnittlicher Dollar-Verlust bei Verlierer-Trades (positive Zahl verwenden)',
      ]} />

      <H2>Ein durchgerechnetes Beispiel</H2>
      <P>
        Angenommen, deine letzten 100 Trades zeigen: 50 Gewinner, 50 Verlierer. Dein durchschnittlicher Gewinner-Trade machte $200 und dein durchschnittlicher Verlierer-Trade kostete dich $100.
      </P>
      <P>
        Erwartungswert = (0,50 × $200) − (0,50 × $100) = $100 − $50 = <strong style={{ color: '#00E676' }}>+$50 pro Trade</strong>
      </P>
      <P>
        Das bedeutet, dass im Mittel jeder Trade, den du mit dieser Strategie eingehst, voraussichtlich $50 zurückbringt. Über 200 Trades sind das $10.000 erwarteter Gewinn. Die Zahl wird nicht exakt so ausfallen — Varianz sorgt dafür, dass Ergebnisse schwanken — aber der Erwartungswert ist ein verlässlicher langfristiger Leitwert.
      </P>

      <Divider />

      <H2>Positiver vs negativer Erwartungswert</H2>
      <H3>Positiver Erwartungswert</H3>
      <P>
        Jede Strategie mit positivem Erwartungswert verdient über eine ausreichend große Stichprobe von Trades Geld, vorausgesetzt der Erwartungswert bleibt stabil und du führst konstant aus. Selbst ein kleiner positiver Erwartungswert — sagen wir $5 pro Trade — verzinst sich über Hunderte Trades spürbar.
      </P>
      <H3>Negativer Erwartungswert</H3>
      <P>
        Eine Strategie mit negativem Erwartungswert verliert über die Zeit Geld, garantiert. Es spielt keine Rolle, wie ausgefeilt das Money Management ist oder wie diszipliniert die Ausführung. Keine Technik zur Positionsgrößenbestimmung kann einen negativen Erwartungswert in ein profitables System verwandeln. Die einzigen Auswege sind, die Win Rate zu verbessern, den durchschnittlichen Gewinn zu vergrößern oder den durchschnittlichen Verlust zu verringern — und ein solides Fundament wie die <Link to="/blog/1-percent-risk-rule">1-%-Risikoregel</Link> sorgt dafür, dass du lange genug überlebst, um diese Auswege zu finden.
      </P>
      <Callout title="Das Casino-Prinzip" color="#4FC3F7">
        Casinos verdienen nicht, weil jeder Spieler jede Wette verliert, sondern weil das Haus bei jedem Spiel einen leicht positiven Erwartungswert hat. Über Millionen Wetten ist die Mathematik unausweichlich. Trading funktioniert genauso — hast du einen positiven Erwartungswert und gehst genug Trades ein, ist Profitabilität eine mathematische Konsequenz, keine Glückssache.
      </Callout>

      <H2>Erwartungswert über verschiedene Strategien</H2>
      <Table
        headers={['Win Rate', 'Ø-Gewinn', 'Ø-Verlust', 'Erwartungswert', 'Bewertung']}
        rows={[
          ['60 %', '$150', '$100', { value: '+$50/Trade', color: 'green' }, { value: 'Gut — ausgewogener Ansatz', color: 'green' }],
          ['40 %', '$300', '$100', { value: '+$80/Trade', color: 'green' }, { value: 'Exzellent — hohes R:R, niedrige Win Rate', color: 'green' }],
          ['70 %', '$80', '$100', { value: '−$4/Trade', color: 'red' }, { value: 'Verlierend — Gebühren machen es schlimmer', color: 'red' }],
          ['35 %', '$250', '$100', { value: '+$22,50/Trade', color: 'cyan' }, { value: 'Tragfähig — Trendfolge-Profil', color: 'cyan' }],
          ['55 %', '$120', '$150', { value: '−$1,50/Trade', color: 'red' }, { value: 'Leicht negativ — R:R verbessern', color: 'red' }],
          ['50 %', '$200', '$100', { value: '+$50/Trade', color: 'green' }, { value: 'Gut — Standard 2:1 R:R', color: 'green' }],
        ]}
      />

      <ExpectancyComparisonChart />

      <P>
        Beachte den Eintrag mit 70 % Win Rate: Obwohl 7 von 10 Trades gewonnen werden, verliert die Strategie Geld, weil die durchschnittlichen Verluste die durchschnittlichen Gewinne übersteigen. Das ist die klassische Illusion der Win Rate — und der Erwartungswert deckt sie sofort auf. Für einen tieferen Einblick, wie Win Rate und Profit Factor zusammenspielen, siehe unseren Leitfaden zu <Link to="/blog/profit-factor-vs-win-rate">Profit Factor vs Win Rate</Link>.
      </P>

      <H2>Erwartungswert in R-Vielfachen</H2>
      <P>
        Der Erwartungswert lässt sich auch in R-Vielfachen ausdrücken, was für den Vergleich von Strategien über verschiedene Kontogrößen und Positionsgrößen nützlicher ist:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Erwartungswert (R) = (Win Rate × Ø-R-Gewinn) − (Verlustrate × 1)</strong>
      </P>
      <P>
        Das vereinfacht sich, weil ein voller Verlust per Definition immer −1R ist. Beispiel: 50 % Win Rate, durchschnittlicher Gewinn ist +2R. Erwartungswert = (0,50 × 2) − (0,50 × 1) = 1,0 − 0,5 = <strong style={{ color: '#00E676' }}>+0,5R pro Trade</strong>. Das bedeutet, für jeden Dollar, den du riskierst, verdienst du im Mittel 50 Cent. Wenn R-Vielfache neu für dich sind, erklärt unser <Link to="/blog/r-multiple-explained">R-Vielfach-Leitfaden</Link> es Schritt für Schritt.
      </P>

      <H2>Wie du deinen eigenen Erwartungswert berechnest</H2>
      <P>
        Hol deine Trade-Historie aus deinem Journal und berechne:
      </P>
      <Ul items={[
        'Gesamte Trades, Gewinner und Verlierer',
        'Durchschnittlicher Dollar-Gewinn bei Gewinner-Trades',
        'Durchschnittlicher Dollar-Verlust bei Verlierer-Trades',
        'Wende die Formel an: Erwartungswert = (Win Rate × Ø-Gewinn) − (Verlustrate × Ø-Verlust)',
      ]} />

      <H2>Was ist ein guter Erwartungswert?</H2>
      <P>
        Jede positive Zahl ist tragfähig. Allerdings ist der Abstand über null wichtig, weil echtes Trading Kosten verursacht — Spreads, Kommissionen und Slippage. Ein sehr kleiner positiver Erwartungswert (z. B. $2 pro Trade) kann von diesen Kosten aufgezehrt werden. In der Praxis:
      </P>
      <Ul items={[
        'Positiver Erwartungswert jeder Größe (nach Kosten) — Strategie ist tragfähig',
        'Erwartungswert über +0,3R pro Trade — solider Edge mit Spielraum für Kosten',
        'Erwartungswert über +0,5R pro Trade — starker Edge, gutes Fundament',
        'Erwartungswert über +1,0R pro Trade — exzellent, aber mit großer Stichprobe verifizieren',
      ]} />

      <H2>Die Bedeutung der Stichprobengröße</H2>
      <P>
        Ein aus 10 Trades berechneter Erwartungswert ist bedeutungslos. Selbst 20 oder 30 Trades können durch einige wenige Ausreißer stark verzerrt sein. Verwende als Minimum 30 bis 50 Trades für eine erste Schätzung und erkenne, dass 100 oder mehr Trades für eine statistisch verlässliche Zahl nötig sind. Der Erwartungswert wird schwanken, während du mehr Trades hinzufügst — und das ist normal. Achte darauf, dass sich die Zahl über die Zeit stabilisiert.
      </P>

      <Takeaways items={[
        'Erwartungswert = (Win Rate × Ø-Gewinn) − (Verlustrate × Ø-Verlust). Eine positive Zahl bedeutet langfristige Profitabilität.',
        'Ein negativer Erwartungswert kann nicht allein durch Money Management behoben werden — die Strategie selbst muss besser werden.',
        'Der Erwartungswert in R-Vielfachen erlaubt Vergleiche über verschiedene Kontogrößen: (Win Rate × Ø-R-Gewinn) − (Verlustrate × 1).',
        'Eine Win Rate von 70 % mit kleinen Gewinnen und großen Verlusten ergibt einen negativen Erwartungswert — die Win Rate allein reicht nicht.',
        'Mindestens 30–50 Trades für die erste Berechnung; 100+ für statistische Verlässlichkeit.',
        'Jeder positive Erwartungswert nach Kosten ist eine tragfähige Strategie — optimiere von dort aus.',
      ]} />
    </BlogArticleLayout>
  );
}
