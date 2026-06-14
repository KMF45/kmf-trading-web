import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ProfitFactorBarChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function ProfitFactorVsWinRateDe() {
  return (
    <BlogArticleLayout
      slug="profit-factor-vs-win-rate"
      lang="de"
      title="Profit Factor vs Win Rate: Welche Kennzahl sagt den Trading-Erfolg wirklich voraus?"
      metaTitle="Profit Factor vs Win Rate: Die Kennzahl, die wirklich vorhersagt, ob du Geld verdienst | K.M.F."
      metaDescription="Die meisten Trader sind besessen von der Win Rate. Aber der Profit Factor ist ein weit besserer Prädiktor für langfristigen Erfolg. Lerne, was beide Kennzahlen bedeuten, wie man sie berechnet und welche du optimieren solltest."
      date="6. Januar 2026"
      dateISO="2026-01-06"
      readTime="7 Min. Lesezeit"
      category="Statistik"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Was ist der Profit Factor im Trading?', answer: 'Der Profit Factor ist der gesamte Bruttogewinn geteilt durch den gesamten Bruttoverlust. Ein Profit Factor über 1,0 bedeutet, dass du profitabel bist. Die meisten konstant profitablen Trader haben einen Profit Factor zwischen 1,5 und 2,5.' },
        { question: 'Was ist wichtiger, Win Rate oder Profit Factor?', answer: 'Der Profit Factor ist wichtiger, weil er sowohl die Win Rate ALS AUCH die Größe der Gewinne gegenüber den Verlusten berücksichtigt. Ein Trader mit 40 % Win Rate, aber großen Gewinnern kann einen höheren Profit Factor haben als ein Trader mit 70 % Win Rate und kleinen Gewinnern.' },
        { question: 'Was ist ein guter Profit Factor?', answer: 'Ein Profit Factor von 1,5+ ist gut, 2,0+ ist exzellent und 3,0+ ist außergewöhnlich und über große Stichproben selten. Unter 1,0 bedeutet, dass du Geld verlierst. Zwischen 1,0 und 1,3 ist dein Edge dünn und anfällig für Slippage und Gebühren.' },
      ]}
    >
      <Intro>
        Frag die meisten Trader, was ein gutes System ausmacht, und sie sagen etwas wie „Ich gewinne 70 % meiner Trades". Die Win Rate fühlt sich gut an. Sie ist intuitiv, leicht zu erklären und emotional befriedigend. Aber die Win Rate allein sagt dir fast nichts darüber, ob eine Strategie profitabel ist — und das Jagen einer hohen Win Rate ist einer der häufigsten Fehler, die angehende Trader machen.
      </Intro>

      <StatsStrip items={[
        { value: 1.5, decimals: 1, label: <>Minimaler Profit Factor<br />für eine robuste Strategie</> },
        { value: 70, decimals: 0, suffix: '%', label: <>der Retail-Trader<br />sind unprofitabel (ESMA-Daten)</> },
        { value: 2.1, decimals: 1, label: <>Durchschnittlicher Profit Factor<br />der Top-10%-Prop-Trader</> },
      ]} />

      <H2>Was ist die Win Rate?</H2>
      <P>
        Die Win Rate ist der Prozentsatz deiner geschlossenen Trades, die mit Gewinn endeten. Wenn du 100 Trades gemacht hast und 60 Gewinner waren, beträgt deine Win Rate 60 %.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Formel:</strong> Win Rate = (Anzahl gewinnender Trades / Trades gesamt) × 100
      </P>
      <P>
        Die Schwäche ist offensichtlich, sobald man darüber nachdenkt: Die Win Rate sagt nichts darüber, wie viel du gewinnst, wenn du gewinnst, oder wie viel du verlierst, wenn du verlierst. Ein Trader, der bei jedem Gewinner $10 gewinnt und bei jedem Verlierer $500 verliert, hätte eine Win Rate von 60 % und würde sich rasch der Null nähern.
      </P>

      <H2>Was ist der Profit Factor?</H2>
      <P>
        Der Profit Factor ist das Verhältnis deines gesamten Bruttogewinns zu deinem gesamten Bruttoverlust, berechnet über alle Trades. Er beantwortet eine vollständigere Frage: Für jeden Dollar, den du verlierst, wie viele Dollar verdienst du?
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Formel:</strong> Profit Factor = Bruttogewinn / Bruttoverlust
      </P>
      <P>
        Ein Profit Factor von 1,0 bedeutet, dass du break-even bist. Ein Profit Factor von 2,0 bedeutet, dass du für jeden $1, den du insgesamt verlierst, $2 verdienst. Ein Profit Factor unter 1,0 bedeutet, dass deine Strategie insgesamt Geld verliert.
      </P>
      <P>
        Anders als die Win Rate erfasst der Profit Factor sowohl, wie oft du gewinnst, als auch, wie viel du pro Trade gewinnst oder verlierst. Es ist ein vollständiges Bild in einer einzigen Zahl.
      </P>

      <Divider />

      <H2>Die Mathematik, die die Schwäche der Win Rate aufdeckt</H2>
      <P>
        Betrachte zwei Trader. Trader A hat eine Win Rate von 70 %. Trader B hat nur 40 %. Die meisten würden annehmen, dass Trader A erfolgreicher ist. Aber sieh dir die tatsächlichen Zahlen an:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Trader A:</strong> 100 Trades, 70 Gewinner mit $50 Ø-Gewinn, 30 Verlierer mit $200 Ø-Verlust.
        Gesamtgewinn: $3.500. Gesamtverlust: $6.000. Nettoergebnis: −$2.500. Profit Factor: 0,58.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Trader B:</strong> 100 Trades, 40 Gewinner mit $300 Ø-Gewinn, 60 Verlierer mit $100 Ø-Verlust.
        Gesamtgewinn: $12.000. Gesamtverlust: $6.000. Nettoergebnis: +$6.000. Profit Factor: 2,0.
      </P>
      <P>
        Trader A verliert konstant Geld. Trader B verdoppelt seinen Bruttoverlust als Gewinn. Die Win Rate erzählte die falsche Geschichte. Der Profit Factor erzählte die Wahrheit.
      </P>

      <H2>Drei Trader-Profile im Vergleich</H2>
      <Table
        headers={['Profil', 'Win Rate', 'Ø-Gewinn', 'Ø-Verlust', 'Profit Factor', 'Ergebnis (100 Trades)']}
        rows={[
          ['Scalper A', '75%', '$30', '$120', { value: '0,75', color: 'red' }, { value: '−$1.500 (verlierend)', color: 'red' }],
          ['Swing-Trader B', '45%', '$250', '$100', { value: '2,06', color: 'cyan' }, { value: '+$5.750 (profitabel)', color: 'green' }],
          ['Trend-Trader C', '35%', '$600', '$150', { value: '2,33', color: 'cyan' }, { value: '+$11.250 (profitabel)', color: 'green' }],
        ]}
      />

      <ProfitFactorBarChart />

      <P>
        Beachte, dass beide profitablen Profile Win Rates unter 50 % haben. Das ist im professionellen Trading üblich, besonders bei trendfolgenden und Swing-Trading-Ansätzen. Der Edge liegt vollständig in der Größe der Gewinne relativ zu den Verlusten.
      </P>

      <H2>Was ist ein guter Profit Factor?</H2>
      <Ul items={[
        'Unter 1,0 — Verlierende Strategie. Du zahlst dafür, traden zu dürfen.',
        '1,0 bis 1,5 — Break-even-Zone. Gebühren und Spreads drücken das wahrscheinlich ins Negative. Verbesserung nötig.',
        '1,5 bis 2,0 — Gut. Eine tragfähige, handelbare Strategie mit konstantem Edge.',
        '2,0 und mehr — Exzellent. Dieses Niveau ist nachhaltig und deutet auf starke Risk:Reward-Disziplin hin.',
        'Über 3,0 — Herausragend, aber mit großer Stichprobe verifizieren. Kann bei kleinen Stichproben Curve-Fitting widerspiegeln.',
      ]} />
      <Callout title="Wichtiger Kontext" color="#4FC3F7">
        Ein aus nur 15 oder 20 Trades berechneter Profit Factor ist statistisch nicht aussagekräftig. Du brauchst mindestens 30 bis 50 Trades, idealerweise 100 oder mehr, bevor sich die Zahl stabilisiert. Prüfe immer deine Stichprobengröße, bevor du Schlüsse ziehst.
      </Callout>

      <H2>Warum die Win Rate allein in die Irre führt</H2>
      <P>
        Viele Anfänger entwerfen Strategien gezielt so, dass sie häufiger gewinnen, was oft bedeutet, kleine Gewinne schnell mitzunehmen (Gewinner zu früh zu schneiden), während Verluste laufen gelassen werden in der Hoffnung, der Trade komme zurück. Dieses Verhalten erzeugt durch eine hohe Win Rate die Illusion einer guten Strategie, während es durch schlechtes Risk:Reward systematisch Kapital vernichtet.
      </P>
      <P>
        Der Instinkt, Gewinner schnell zu schließen und Verlierer zu halten, kommt von der Verlustaversion — der psychische Schmerz eines Verlusts ist etwa doppelt so stark wie die Freude über einen gleich großen Gewinn. Gegen diesen Instinkt zu traden ist eine der schwierigsten Fähigkeiten, und genau deshalb ist der Profit Factor eine so nützliche externe Kontrolle.
      </P>

      <H2>Wie du deinen Profit Factor verbesserst</H2>
      <H3>Verlierer schneller schneiden</H3>
      <P>
        Der direkteste Hebel auf den Profit Factor ist der Nenner: dein Bruttoverlust. Jedes Mal, wenn du einen Stop Loss weiter wegschiebst, um nicht ausgestoppt zu werden, erhöhst du deinen durchschnittlichen Verlust und drückst deinen Profit Factor. Respektiere deine ursprüngliche <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">Stop-Loss-Platzierung</Link>. Ein kleinerer durchschnittlicher Verlust hat über die Zeit einen enormen Zinseszinseffekt auf den Profit Factor.
      </P>
      <H3>Gewinner laufen lassen</H3>
      <P>
        Der Zähler — der Bruttogewinn — steigt, wenn du gewinnende Trades länger hältst. Das bedeutet nicht, unbegrenzt zu halten. Es bedeutet, ein vordefiniertes Ziel zu haben, das deutlich größer ist als dein Risiko, und nicht vorzeitig auszusteigen, weil der Trade gestreckt aussieht. Viele Trader fangen 40 % einer Bewegung ein und fragen sich, warum ihr Profit Factor mittelmäßig ist.
      </P>
      <H3>Prüfe dein R:R vor jedem Trade</H3>
      <P>
        Bevor du in einen Trade einsteigst, berechne den Abstand von Einstieg zu Stop Loss und von Einstieg zu Ziel. Liegt das Verhältnis nicht bei mindestens 1,5:1, braucht der Trade eine höhere Wahrscheinlichkeit, um das Eingehen zu rechtfertigen. Allein das Herausfiltern von Setups mit niedrigem R:R kann den Profit Factor spürbar verbessern, ohne deine Strategie überhaupt zu ändern. Jeden Trade in <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-Vielfachen</Link> zu messen, macht diese Bewertung automatisch.
      </P>

      <Divider />

      <Takeaways items={[
        'Win Rate ohne Kontext ist bedeutungslos — eine Win Rate von 70 % kann trotzdem eine verlierende Strategie sein.',
        'Profit Factor = Bruttogewinn / Bruttoverlust. Alles über 1,5 ist tragfähig; über 2,0 ist exzellent.',
        'Die profitabelsten professionellen Strategien haben oft Win Rates unter 50 %, weil sie groß gewinnen und klein verlieren.',
        'Den Profit Factor zu verbessern erfordert zwei Disziplinen: Verlierer am geplanten Stop zu schneiden und Gewinner ihr Ziel erreichen zu lassen.',
        'Berechne den Profit Factor immer mit mindestens 30–50 Trades. Kleinere Stichproben sind statistisch unzuverlässig.',
      ]} />
    </BlogArticleLayout>
  );
}
