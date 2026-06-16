import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { DrawdownComparisonChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function StaticVsTrailingDrawdownDe() {
  return (
    <BlogArticleLayout
      slug="static-vs-trailing-drawdown"
      lang="de"
      title="Static vs Trailing Drawdown: Die Prop-Firm-Regel, die Funded-Konten leise tötet"
      metaTitle="Static vs Trailing Drawdown: Warum dein Funded-Konto wirklich gekündigt wurde | K.M.F."
      metaDescription="Die meisten Prop-Firm-Fehlschläge passieren, weil Trader den Unterschied zwischen Static und Trailing Drawdown nicht verstehen. Lerne, wie jeder berechnet wird, warum Trailing Drawdown eine Falle ist und wie man beide überlebt."
      date="22. März 2026"
      dateISO="2026-03-22"
      readTime="9 Min. Lesezeit"
      category="Risikomanagement"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-daily-drawdown-guide', title: 'How to Never Break the Daily Drawdown Rule Again', category: 'Risk Management' },
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Was ist der Unterschied zwischen Static und Trailing Drawdown?', answer: 'Static Drawdown ist ein festes Limit, berechnet aus deinem Anfangskontostand — es bewegt sich nie. Trailing Drawdown folgt deinem höchsten Kontostand (High-Water-Mark) und steigt mit deinem Kontowachstum, geht aber nie wieder runter. Trailing Drawdown ist schwerer zu managen, weil gewinnende Trades deinen verbleibenden Puffer schrumpfen lassen.' },
        { question: 'Warum ist Trailing Drawdown schwerer als Static Drawdown?', answer: 'Weil sich das Trailing-Limit jedes Mal, wenn du Gewinn machst, mit dir nach oben bewegt. Erreicht dein $100K-Konto einen Höchststand von $106K, ist dein Trailing-5-%-Limit jetzt $100.700 — du kannst also nur $5.300 von diesem Höchststand verlieren, bevor gekündigt wird. Beim Static Drawdown bleibt dein Limit bei $95.000, egal wie viel Gewinn du machst.' },
        { question: 'Welche Prop Firms nutzen Trailing Drawdown?', answer: 'Viele neuere Prop Firms nutzen Trailing Drawdown während der Challenge-Phase. FTMO nutzt Static Drawdown. E8 Funding, MyFundedFX und mehrere andere nutzen Trailing Drawdown in mindestens einer ihrer Challenge-Phasen. Lies immer das Regelwerk sorgfältig, bevor du startest.' },
        { question: 'Wird Trailing Drawdown auf Balance oder Equity berechnet?', answer: 'Das hängt von der Firma ab. Manche berechnen auf Balance (nur geschlossene Trades), andere auf Equity (inklusive offenem, unrealisiertem Gewinn/Verlust). Equity-basierter Trailing Drawdown ist am härtesten — ein schwebender Gewinn, der zurückkommt, kann die Kündigung auslösen, selbst wenn du den Trade bei Break-even schließt.' },
        { question: 'Hört Trailing Drawdown jemals auf zu trailen?', answer: 'Die meisten Prop Firms sperren den Trailing Drawdown, sobald das Limit deinen Anfangskontostand erreicht. Beispiel: Auf einem $100K-Konto mit 5 % Trailing Drawdown bewegt sich das Limit, sobald es $100.000 erreicht, nicht mehr und wird effektiv static. Das wird manchmal Watermark-Lock genannt. Verifiziere das immer mit deiner konkreten Firma.' },
      ]}
      howToSteps={[
        { name: 'Identifiziere deinen Drawdown-Typ', text: 'Lies das Regelwerk deiner Prop Firm. Bestimme, ob dein Drawdown static oder trailing ist und ob er auf Balance oder Equity berechnet wird.' },
        { name: 'Berechne deinen echten Puffer', text: 'Für Trailing Drawdown ziehe dein Trailing-Limit von deinem aktuellen Kontostand ab — nicht von deinem Anfangskontostand. Das ist dein tatsächlich verbleibender Raum.' },
        { name: 'Setze eine persönliche Sicherheitsmarge', text: 'Nutze nur 60 % deines verfügbaren Puffers. Hast du $5.000 vor der Kündigung, behandle $3.000 als dein hartes Limit.' },
        { name: 'Verfolge deinen High-Water-Mark', text: 'Berechne nach jedem gewinnenden Trade dein Trailing-Limit neu. Schreib es vor der nächsten Session in dein Journal.' },
        { name: 'Reduziere die Größe nach Gewinnen', text: 'Kontraintuitiv: Reduziere die Positionsgröße nach einer profitablen Serie auf Trailing-Drawdown-Konten. Dein Puffer ist relativ zu deinem Kontostand geschrumpft.' },
      ]}
    >
      <Intro>
        Lass mich dir die Geschichte zweier Trader erzählen. Beide bestanden ihre Prop-Firm-Challenge. Beide wurden mit $100.000 funded. Beide waren diszipliniert. Beide verloren ihre Konten innerhalb von drei Wochen. Der erste Trader hatte Pech — eine legitime Verlustserie in einem zerklüfteten Markt. Fair genug. Der zweite Trader war tatsächlich profitabel. Er machte $6.000 in den ersten zwei Wochen. Dann hatte er zwei schlechte Tage, gab $5.500 zurück und bekam eine E-Mail, die mit „Wir bedauern, Ihnen mitteilen zu müssen" begann. Er starrte auf seinen Kontostand: $100.500. Immer noch im Plus. Immer noch über seinem Startkapital. Konto gekündigt. Was war passiert?
      </Intro>

      <P>
        Trailing Drawdown war passiert. Und wenn du den Unterschied zwischen Trailing und Static Drawdown nicht verstehst — wirklich verstehst, nicht nur „ich habe die Regeln gelesen"-verstehst — wirst du dich ihm anschließen. Es ist die am meisten missverstandene Regel im Prop-Firm-Trading, und sie hat mehr Funded-Konten getötet als schlechte Strategien, Pech und schlechte Psychologie zusammen.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, suffix: '%', label: <>typischer Max-Drawdown<br />auf Prop-Firm-Konten</> },
        { value: 60, decimals: 0, suffix: '%', label: <>des Puffers als persönliche<br />Sicherheitsmarge nutzen</> },
        { value: 100, decimals: 0, suffix: 'K', prefix: '$', label: <>Standard-Funded-Konto-<br />Größe in dieser Analyse</> },
      ]} />

      <Divider />

      <H2>Static Drawdown: Der Einfache</H2>
      <P>
        Static Drawdown ist das, was die meisten Trader glauben, dass alle Drawdown-Regeln sind. Es funktioniert so:
      </P>
      <Ul items={[
        'Du startest mit $100.000.',
        'Der maximale Drawdown ist 10 % (zum Beispiel).',
        'Dein Kündigungsniveau ist $90.000.',
        'Es spielt keine Rolle, ob dein Konto auf $120.000 steigt. Das Limit bleibt bei $90.000. Für immer.',
      ]} />
      <P>
        Static Drawdown ist vorhersehbar. Du kannst dein Worst-Case-Szenario an Tag eins berechnen, und es ändert sich nie. Bist du nach einem großartigen Monat bei $112.000, weißt du, dass du $22.000 Raum hast. Hast du eine schreckliche Woche und fällst auf $95.000, weißt du, dass dir $5.000 bleiben. Die Mathematik überrascht dich nie.
      </P>
      <Callout title="Static Drawdown = Dein Freund" color="#00C853">
        Beim Static Drawdown erhöht jeder Dollar, den du machst, deinen Sicherheitspuffer. Je besser du tradest, desto schwerer wird es, gekündigt zu werden. So sollte Drawdown funktionieren.
      </Callout>

      <Divider />

      <H2>Trailing Drawdown: Die Falle</H2>
      <P>
        Trailing Drawdown folgt deinem höchsten Kontostand — dem <strong>„High-Water-Mark".</strong> Jedes Mal, wenn dein Konto einen neuen Höchststand erreicht, bewegt sich das Trailing-Limit mit ihm nach oben. <strong>Es bewegt sich nur nach oben, nie nach unten.</strong>
      </P>
      <P>
        Dasselbe Beispiel:
      </P>
      <Ul items={[
        'Du startest mit $100.000. Trailing-Drawdown-Limit ist 5 % = $95.000.',
        'Du machst $3.000. Konto ist $103.000. Neues Trailing-Limit: $97.850 (5 % unter $103K).',
        'Du machst weitere $3.000. Konto ist $106.000. Neues Trailing-Limit: $100.700.',
        'Jetzt hast du eine schlechte Woche. Du verlierst $5.500. Konto ist $100.500.',
        'Du bist immer noch im Plus. Du bist über deinem Startkontostand. Aber $100.500 ist unter $100.700.',
        'Konto gekündigt.',
      ]} />
      <P>
        Lies diese Zahlen noch einmal. Der Trader machte $6.000, gab $5.500 zurück und war immer noch netto positiv. Aber das Trailing-Limit war während der Gewinnserie auf $100.700 gestiegen — und es kam nie wieder runter. Die eigenen Gewinne des Traders bauten die Mauer, die ihn tötete.
      </P>

      <Callout title="Wichtig: Die meisten Firmen sperren den Trail beim Startkontostand" color="#4FC3F7">
        Gute Nachricht: Die Mehrheit der Prop Firms stoppt den Trailing Drawdown, sobald das Limit deinen Anfangskontostand erreicht. In unserem Beispiel sperrt sich das Trailing-Limit dauerhaft, sobald es $100.000 erreicht — und wird ab diesem Punkt effektiv static. Das bedeutet, dein erstes Ziel auf einem Trailing-Konto ist, genug Gewinn aufzubauen, dass der Trail zu deinem Startkontostand „aufholt". Danach ist jeder zusätzliche Dollar Gewinn echter Puffer. Prüfe die Regeln deiner Firma — manche nennen das „Watermark-Lock" oder geben einfach an, dass der Trailing-Stopp nach Erreichen des Anfangskontostands zu static wird.
      </Callout>

      <DrawdownComparisonChart />

      <H2>Die Mathematik, die niemand macht</H2>
      <P>
        Hier ist der Teil, der dein Konto rettet. Sehen wir uns an, was mit deinem tatsächlichen Puffer — dem Abstand zwischen deinem Kontostand und deinem Kündigungsniveau — passiert, während dein Konto wächst.
      </P>
      <Table
        headers={['Kontostand', 'Static-Limit (10 %)', 'Static-Puffer', 'Trailing-Limit (5 %)', 'Trailing-Puffer']}
        rows={[
          ['$100.000', '$90.000', { value: '$10.000', color: 'green' }, '$95.000', { value: '$5.000', color: 'gold' }],
          ['$103.000', '$90.000', { value: '$13.000', color: 'green' }, '$97.850', { value: '$5.150', color: 'gold' }],
          ['$106.000', '$90.000', { value: '$16.000', color: 'green' }, '$100.700', { value: '$5.300', color: 'gold' }],
          ['$108.000', '$90.000', { value: '$18.000', color: 'green' }, '$102.600', { value: '$5.400', color: 'gold' }],
          ['$104.000 (Pullback)', '$90.000', { value: '$14.000', color: 'green' }, '$102.600', { value: '$1.400', color: 'red' }],
        ]}
      />
      <P>
        Sieh dir die letzte Zeile an. Nach einem normalen Pullback von $108K auf $104K hat der Static-Trader immer noch $14.000 Puffer. Der Trailing-Trader hat $1.400. Ein schlechter Trade mehr und es ist vorbei.
      </P>
      <Callout title="Das grausame Paradox" color="#FF5252">
        Beim Trailing Drawdown wird die Schlinge umso enger, je besser du in den ersten Wochen tradest. Eine große Gewinnserie fühlt sich großartig an — aber sie hebt den Boden unter dir an. Dann löst ein normaler, unvermeidlicher Pullback die Kündigung aus. Dein eigener Erfolg baute die Falle.
      </Callout>

      <Divider />

      <H2>Equity vs Balance: Die zweite Falle in der ersten Falle</H2>
      <P>
        Als wäre Trailing Drawdown nicht knifflig genug, berechnen ihn manche Firmen auf Equity, nicht auf Balance. Der Unterschied:
      </P>
      <H3>Balance-basiert</H3>
      <P>
        Nur geschlossene Trades zählen. Hast du eine Position, die $2.000 im Plus, aber noch offen ist, bewegt sich das Trailing-Limit nicht. Es bewegt sich nur, wenn du den Trade schließt und den Gewinn realisierst.
      </P>
      <H3>Equity-basiert</H3>
      <P>
        Offene Positionen zählen. Ist dein Konto bei $100.000 und du hast einen offenen Trade mit +$3.000 unrealisiertem Gewinn, bewegt sich das Trailing-Limit auf 5 % unter $103.000 = $97.850. Kommt dieser Trade dann zurück und du schließt bei Break-even, ist dein Limit immer noch bei $97.850. Dein schwebender Gewinn hob den Boden an, und ein Schließen bei Break-even zählt jetzt als $2.850 Drawdown.
      </P>
      <P>
        Ja, das ist so brutal, wie es klingt. Und ja, Trader verlieren Funded-Konten regelmäßig auf diese Weise.
      </P>

      <H3>Praktisches Beispiel</H3>
      <Table
        headers={['Zeit', 'Aktion', 'Balance', 'Equity', 'Trailing-Limit (Equity)', 'Puffer']}
        rows={[
          ['9:30 Uhr', 'Session-Start', '$100.000', '$100.000', '$95.000', { value: '$5.000', color: 'gold' }],
          ['10:15 Uhr', 'Kauf EUR/USD, schwebend +$2.800', '$100.000', '$102.800', '$97.660', { value: '$5.140', color: 'gold' }],
          ['11:00 Uhr', 'Trade kommt zurück, schwebend +$400', '$100.000', '$100.400', '$97.660', { value: '$2.740', color: 'red' }],
          ['11:30 Uhr', 'Schließen bei Break-even', '$100.000', '$100.000', '$97.660', { value: '$2.340', color: 'red' }],
          ['12:00 Uhr', 'Nächster Trade, Verlust −$1.200', '$98.800', '$98.800', '$97.660', { value: '$1.140', color: 'red' }],
        ]}
      />
      <P>
        Der Trader startete den Tag mit einem $5.000-Puffer. Er machte kein Geld. Er schloss einen Trade bei Break-even und nahm einen kleinen Verlust. Sein Puffer ist jetzt $1.140. Ein normaler Verlust mehr und das Konto ist tot — weil ein schwebender Gewinn, den er nie realisierte, den Boden dauerhaft anhob.
      </P>

      <Divider />

      <H2>Wie man Trailing Drawdown überlebt</H2>
      <P>
        Okay, genug Horrorgeschichten. Hier ist, was man tatsächlich dagegen tut. Das sind keine theoretischen Vorschläge — es sind Regeln, die Funded-Konten am Leben halten.
      </P>

      <H3>1. Kenne deine Zahl jeden einzelnen Morgen</H3>
      <P>
        Bevor du deine Trading-Plattform öffnest, schreib drei Zahlen in dein Journal:
      </P>
      <Ul items={[
        'Aktueller Kontostand',
        'Aktuelles Trailing-Limit (höchster Kontostand × 0,95, oder welcher Prozentsatz auch immer)',
        'Verbleibender Puffer (Kontostand minus Trailing-Limit)',
      ]} />
      <P>
        Kennst du diese Zahlen nicht, fliegst du blind. Und blind nahe einer Klippe zu fliegen ist genau, wie Konten an „normalen" Tagen gekündigt werden.
      </P>

      <H3>2. Reduziere die Größe nach Gewinnserien</H3>
      <P>
        Das fühlt sich kontraintuitiv an. Du gewinnst, also solltest du größer traden, oder? Falsch — zumindest beim Trailing Drawdown. Jeder neue Dollar Gewinn schrumpft deinen relativen Puffer. Nach einer $5.000-Gewinnserie auf einem $100K-Konto ist dein Trailing-Limit $4.750 nach oben gewandert. Dein Puffer ist nur um $250 gestiegen. Trade kleiner, um ihn zu schützen.
      </P>

      <H3>3. Sei vorsichtig mit Take-Profit-Zielen</H3>
      <P>
        Beim equity-basierten Trailing Drawdown hat ein Trade, der +$3.000 unrealisierten Gewinn zeigt und dann bei +$500 schließt, dich effektiv Puffer gekostet. Das Limit stieg um $2.850 (vom schwebenden Hoch), aber du hast nur $500 realisiert. Dein Netto-Puffer sank um $2.350 durch einen gewinnenden Trade.
      </P>
      <P>
        Lösung: Bist du auf einem Trade deutlich im Plus, nimm entweder vollen Gewinn oder setze einen <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">engen Trailing Stop</Link>. Lass große schwebende Gewinne nicht auf nahe Break-even zurückkommen. Auf equity-basierten Konten ist das schlimmer, als den Trade gar nicht zu haben.
      </P>

      <H3>4. Verfolge alles</H3>
      <P>
        Das Dashboard deiner Prop Firm zeigt deinen aktuellen Drawdown. Es zeigt dir keine Muster. Es zeigt dir nicht, dass deine letzten drei Dienstage alle gut begannen und mit aggressivem Overtrading endeten. Es zeigt dir nicht, dass du konstant zwischen 11 Uhr und Mittag Gewinne zurückgibst.
      </P>
      <P>
        Dafür ist ein <Link to="/blog/prop-firm-trading-journal" className="text-kmf-accent hover:underline">Trading-Journal</Link> da. K.M.F. verfolgt den Max-Drawdown vom Höchstkontostand und zeigt deine Saldo-Verlaufsgrafik — sodass du genau siehst, wo die Pullbacks passieren und ob sie schlimmer werden. Es verfolgt auch deine <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-Vielfache</Link>, sodass du weißt, ob deine Verlust-Trades im Plan liegen oder ob du sie zu weit laufen lässt. Die App kann das spezifische Trailing-Drawdown-Limit deiner Firma nicht berechnen (jede Firma hat andere Regeln), aber sie gibt dir die Rohdaten, um es jeden Morgen selbst zu berechnen. Mach die Mathematik. Schreib sie in deinen Vor-Session-Journal-Eintrag. Es dauert 60 Sekunden und könnte dein Konto retten.
      </P>

      <H3>5. Erwäge zuerst Static-Drawdown-Firmen</H3>
      <P>
        Bekommst du dein erstes Funded-Konto, erwäge ernsthaft, mit einer Firma zu starten, die Static Drawdown nutzt. Ja, die Challenge-Gebühr mag höher sein. Ja, der Profit-Split mag etwas schlechter sein. Aber die Wahrscheinlichkeit, das Konto lange genug zu behalten, um tatsächlich Geld zu verdienen, ist deutlich höher. Du kannst zu Trailing-Drawdown-Firmen aufsteigen, sobald du bewiesen hast, dass du Risiko konstant managen kannst.
      </P>

      <Divider />

      <H2>Der Spickzettel</H2>
      <Table
        headers={['', 'Static Drawdown', 'Trailing Drawdown']}
        rows={[
          ['Limit basiert auf', { value: 'Anfangskontostand', color: 'green' }, { value: 'Höchstem erreichtem Kontostand', color: 'gold' }],
          ['Steigt, wenn du Gewinn machst?', { value: 'Nein — bleibt fest', color: 'green' }, { value: 'Ja — steigt dauerhaft', color: 'red' }],
          ['Puffer nach einer Gewinnserie', { value: 'Steigt', color: 'green' }, { value: 'Steigt kaum (oder sinkt relativ)', color: 'red' }],
          ['Schwierigkeitsgrad', { value: 'Vorhersehbar', color: 'green' }, { value: 'Progressiv schwerer', color: 'red' }],
          ['Beste Strategie', { value: 'Normales Traden, verzinsen lassen', color: 'cyan' }, { value: 'Kleine, beständige Gewinne, früh sichern', color: 'cyan' }],
          ['Größter Killer', { value: 'Revenge Trading nach Verlusten', color: 'red' }, { value: 'Normaler Pullback nach einer Gewinnserie', color: 'red' }],
        ]}
      />

      <Takeaways items={[
        'Static Drawdown ist ein festes Limit von deinem Startkontostand — es ändert sich nie. Jeder Dollar Gewinn erhöht deinen Sicherheitspuffer.',
        'Trailing Drawdown folgt deinem höchsten Kontostand und kommt nie wieder runter. Deine eigenen Gewinne bauen den Boden, der dich kündigen kann.',
        'Equity-basierter Trailing Drawdown ist am härtesten: Selbst schwebende (unrealisierte) Gewinne heben das Limit dauerhaft an.',
        'Reduziere nach Gewinnserien auf Trailing-Konten die Positionsgröße. Dein relativer Puffer ist geschrumpft, obwohl dein Kontostand höher ist.',
        'Kenne deine drei Zahlen jeden Morgen: aktueller Kontostand, Trailing-Limit, verbleibender Puffer. Schreib sie vor dem Traden in dein Journal.',
        'Bist du neu bei Prop Firms, starte mit einer Static-Drawdown-Firma. Lerne das Spiel, bevor du auf Hard Mode spielst.',
      ]} />
    </BlogArticleLayout>
  );
}
