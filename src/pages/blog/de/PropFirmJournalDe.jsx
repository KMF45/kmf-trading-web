import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PropFirmJournalDe() {
  return (
    <BlogArticleLayout
      slug="prop-firm-trading-journal"
      lang="de"
      title="Prop-Firm-Killer: Wie ein Trading-Journal dein Funded-Konto rettet"
      metaTitle="Prop-Firm-Journal: Das System, das dein Funded-Konto am Leben hält | K.M.F."
      metaDescription="Die meisten Prop-Firm-Fehlschläge sind keine schlechten Trades — es sind gebrochene Regeln. Lerne, wie ein Trading-Journal mit Risikorechner und Checklisten Daily-Drawdown-Verstöße verhindert und dein Funded-Konto am Leben hält."
      date="23. Februar 2026"
      dateISO="2026-02-23"
      readTime="9 Min. Lesezeit"
      category="Risikomanagement"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'Warum scheitern die meisten Prop-Firm-Trader?', answer: 'Die meisten Fehlschläge kommen nicht von schlechten Strategien, sondern von Regelverstößen — das Überschreiten von Daily-Drawdown-Limits, Overtrading nach Verlusten und das Nicht-Verfolgen des Risikos in Echtzeit.' },
        { question: 'Was sollte ein Prop-Firm-Trading-Journal verfolgen?', answer: 'Verfolge deinen täglichen Gewinn/Verlust gegen dein Drawdown-Limit, die Anzahl Trades pro Tag, die Einhaltung der Positionsgröße, Regelverstöße und den emotionalen Zustand.' },
        { question: 'Wie hilft ein Journal, Prop-Firm-Evaluationen zu bestehen?', answer: 'Ein Journal erzwingt Beständigkeit, indem es jede Regel der Evaluationskriterien verfolgt: maximaler Tagesverlust, maximaler Gesamt-Drawdown, Mindesthandelstage und Fortschritt beim Profitziel.' },
      ]}
    >
      <Intro>
        Du hast zwei Wochen damit verbracht, Phase 1 zu bestehen. Weitere zwei Wochen, dich durch Phase 2 zu kämpfen. Endlich bekommst du das Funded-Konto — $50.000, echtes Geld, echte Regeln. An Tag vier gehst du eine leicht überdimensionierte Position auf GBP/JPY ein. Sie läuft 80 Pips gegen dich. Du bist am Tag 3,2 % im Minus. Das Daily-Drawdown-Limit ist 4 %. Eine schlechte Kerze mehr und es ist vorbei. Alles, wofür du gearbeitet hast — weg in vier Tagen. Das ist nicht hypothetisch. Das ist die häufigste Prop-Firm-Geschichte, die es gibt.
      </Intro>

      <StatsStrip items={[
        { value: 4, decimals: 0, suffix: '%', label: <>typisches Daily-Drawdown-<br />Limit auf Funded-Konten</> },
        { value: 60, decimals: 0, suffix: '%', label: <>des Firmenlimits —<br />dein persönlicher harter Stopp</> },
        { value: 1.5, decimals: 1, suffix: '%', label: <>maximales Risiko pro Trade<br />auf einem Prop-Firm-Konto</> },
      ]} />

      <H2>Warum Prop Firms anders sind</H2>
      <P>
        Ein persönliches Konto zu traden und ein Prop-Firm-Konto zu traden sind grundlegend verschiedene Spiele. Mit deinem eigenen Geld ist ein 5-%-Drawdown-Tag schmerzhaft, aber überlebbar. Bei einer Prop Firm bedeutet ein 5-%-Drawdown-Tag, dass du das Konto verlierst. Punkt. Keine zweite Chance. Kein „Ich hol's morgen zurück". Das Konto ist geschlossen, und willst du es nochmal versuchen, zahlst du eine weitere Evaluationsgebühr.
      </P>
      <P>
        Die meisten Prop-Firm-Regeln sehen etwa so aus: maximaler Tagesverlust von 4-5 %, maximaler Gesamt-Drawdown von 8-10 %, Mindesthandelstage, kein Halten durch Nachrichtenereignisse. Diese Regeln sind streng, unerbittlich und absolut. Und sie sind darauf ausgelegt, genau die Art impulsiven, undisziplinierten Verhaltens zu fangen, in das die meisten Retail-Trader unter Druck verfallen.
      </P>
      <P>
        Die Trader, die Evaluationen bestehen und Funded-Konten behalten, sind nicht die mit den besten Strategien. Es sind die mit den besten Disziplin-Systemen. Und ein gut konfiguriertes Trading-Journal ist das wirksamste Disziplin-System, das du bauen kannst.
      </P>

      <Divider />

      <H2>Die drei Arten, wie Trader Funded-Konten verlieren</H2>

      <H3>1. Der überdimensionierte Revenge-Trade</H3>
      <P>
        Es beginnt mit einem normalen Verlust. −0,8 % am Tag. In Ordnung. Dann ein weiterer: −0,5 %. Jetzt bist du 1,3 % im Minus und spürst den Druck. Statt aufzuhören, verdoppelst du deine nächste Position, um „es schnell zurückzuholen". Dieser Trade läuft gegen dich. Plötzlich bist du bei −3,5 % und einen Stop Loss vom Verstoß entfernt. Das ist lehrbuchmäßiges <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">Revenge Trading</Link> — der mit Abstand häufigste Konto-Killer im Prop-Trading.
      </P>

      <H3>2. Der Positionsgrößen-Fehler</H3>
      <P>
        Auf einem $100.000-FTMO-Konto mit einem 5-%-Daily-Drawdown-Limit beträgt dein maximaler Tagesverlust $5.000. Machst du drei Trades, kann jeder maximal ~$1.650 riskieren. Aber die meisten Trader berechnen die Lot-Size danach, „was sich richtig anfühlt", statt nach dem tatsächlichen Drawdown-Limit. Sie riskieren $2.500 pro Trade, machen drei Trades, und eine schlechte Session löscht sie aus. Die Mathematik war falsch, bevor der erste Trade überhaupt platziert war. Ein richtiges <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">Positionsgrößen-System</Link> verhindert das vollständig.
      </P>

      <H3>3. Die „Nur noch ein Trade"-Spirale</H3>
      <P>
        Du hast dein Tagesverlustlimit erreicht — oder bist gefährlich nah dran. Der rationale Zug ist, die Plattform zu schließen. Aber da formt sich ein perfektes Setup. Nur noch eins. Diesmal funktioniert es. Tut es nicht. Und jetzt ist das Konto verletzt, nicht wegen schlechten Tradings, sondern weil du kein System hattest, das dich zum Aufhören zwingt.
      </P>

      <Callout title="Das Muster" color="#FF5252">
        Beachte, dass keiner dieser Fehlschläge mit der Strategie zu tun hat. Sie gehen um Risikomanagement und Disziplin. Die Trade-Setups waren oft völlig valide. Die Positionsgrößen, die emotionale Eskalation und die Unfähigkeit aufzuhören — das waren die Killer.
      </Callout>

      <Divider />

      <H2>Ein Prop-Firm-Überlebenssystem bauen</H2>
      <P>
        So strukturierst du dein Trading-Journal, um dein Funded-Konto zu schützen. Sieh es als Sicherheitsnetz, das dich vor dem Verstoß fängt — nicht danach.
      </P>

      <H3>Vor der Session: Kenne deine Zahlen</H3>
      <P>
        Bevor du einen einzigen Chart öffnest, berechne drei Zahlen für heute:
      </P>
      <Ul items={[
        'Maximaler Tagesverlust in Dollar (Kontogröße × Daily-Drawdown-% — z. B. $50.000 × 4 % = $2.000)',
        'Maximales Risiko pro Trade in Dollar (Tagesmaximum ÷ geplante Anzahl Trades — z. B. $2.000 ÷ 3 = $666)',
        'Aktueller Puffer zum Gesamt-Drawdown (wie viel Raum dir bleibt, bevor der Trailing-Max-Drawdown verletzt wird)',
      ]} />
      <P>
        Schreib diese Zahlen vor der Session in dein Journal. Sie sind deine Grenzen. Jede Entscheidung für den Rest des Tages muss in sie passen.
      </P>

      <H3>Vor dem Trade: Die Prop-Firm-Checkliste</H3>
      <P>
        Deine Pre-Trade-Checkliste für ein Funded-Konto sollte zwei zusätzliche Punkte enthalten, die persönliche Konten nicht brauchen:
      </P>
      <Ul items={[
        '„Wenn dieser Trade den Stop Loss trifft, bin ich noch innerhalb meines Daily-Drawdown-Limits?" — Ist die Antwort nein, kann der Trade nicht genommen werden, egal wie gut das Setup ist.',
        '„Wie viele Trades habe ich heute schon gemacht, und was ist mein bisheriger Gewinn/Verlust?" — Das verhindert die „nur noch einer"-Spirale, indem es dich zwingt, deine aktuelle Lage zu konfrontieren, bevor du Risiko hinzufügst.',
      ]} />

      <Callout title="Wie K.M.F. das handhabt" color="#4FC3F7">
        K.M.F.s Lot-Size-Rechner berechnet exakte Positionsgrößen basierend auf Kontostand, Risikoprozentsatz und Stop-Loss-Abstand. Für ein Prop-Firm-Konto setze dein Risiko auf maximal 1-1,5 % pro Trade. Die Pre-Trade-Checkliste verifiziert, dass jeder Einstieg deine Kriterien erfüllt — einschließlich der Risikokriterien — bevor du die Order platzierst. Überspringst du ein Kästchen, ist die Checkliste unvollständig. Es ist ein mechanischer Schutz gegen impulsive Ausführung.
      </Callout>

      <Divider />

      <H3>Während der Session: Die Hard-Stop-Regel</H3>
      <P>
        Entscheide im Voraus: „Wenn ich X % Tagesverlust erreiche, schließe ich die Plattform. Nicht nach dem nächsten Trade. Jetzt." Für eine detaillierte Aufschlüsselung dieses Ansatzes siehe unseren <Link to="/blog/prop-firm-daily-drawdown-guide" className="text-kmf-accent hover:underline">Daily-Drawdown-Leitfaden</Link>. Für die meisten Prop-Firm-Konten sollte das bei 60-70 % des erlaubten Daily Drawdown gesetzt sein. Ist das Limit 5 %, liegt dein Hard Stop bei 3 %. Das gibt dir eine Pufferzone — denn in dem Moment, in dem du dein selbst gesetztes Limit erreichst und weggehst, hast du noch 2 % Atemraum für den Fall von Slippage oder einem Gap auf einer offenen Position.
      </P>
      <P>
        Logge diese Regel in dein Journal. Schreib nach der Session auf, ob du sie eingehalten hast. Wenn nicht — wenn du nach Erreichen deines Limits weitergetradet hast — ist das der wichtigste Datenpunkt des Tages. Nicht der Gewinn/Verlust. Der Disziplin-Verstoß.
      </P>

      <H3>Nach der Session: Das tägliche Audit</H3>
      <P>
        Logge am Ende jedes Trading-Tages drei Dinge in dein Journal:
      </P>
      <Ul items={[
        'Täglichen Gewinn/Verlust als Prozentsatz des Kontos — nicht in Dollar. Prozentsätze halten die Drawdown-Regeln im Fokus.',
        'Anzahl genommener Trades vs. geplantes Maximum — hast du 3 Trades geplant und 6 gemacht, ist das ein Disziplin-Versagen, unabhängig vom Ergebnis.',
        'Emotionaler Zustand bei jedem Einstieg — war einer der heutigen Trades von Frust, Rache oder Langeweile getrieben statt von einem validen Setup?',
      ]} />

      <Divider />

      <H2>Marias Geschichte: Wie Journaling ein $100K-Konto rettete</H2>
      <P>
        Maria bestand ihre FTMO-Evaluation im zweiten Versuch. Sie hatte bereits ein Funded-Konto in ihrem ersten Monat verloren — zwei Revenge-Trades an einem einzigen Donnerstag löschten ihren Daily Drawdown aus. Diesmal war sie entschlossen, es anders zu machen.
      </P>
      <P>
        Sie richtete eine strenge Routine ein: Jeden Morgen schrieb sie ihren maximalen Tagesverlust ($5.000) und ihr Risiko pro Trade ($1.200) in ihr Journal. Sie ließ jedes Setup durch ihre Checkliste laufen. Nach zwei Verlusten an einem Tag schloss sie die Plattform — keine Ausnahmen. Sie loggte ihren emotionalen Zustand vor jedem Trade: selbstbewusst, neutral, ängstlich, frustriert.
      </P>
      <P>
        Nach sechs Wochen tauchte etwas Bemerkenswertes in ihren Daten auf. An Tagen, die sie als „ängstlich" markierte, war ihre Win Rate 31 %. An Tagen, die sie als „selbstbewusst" oder „neutral" markierte, war sie 62 %. Die Strategie war dieselbe. Die Setups waren dieselben. Die einzige Variable war sie. Mit diesen Daten machte sie eine Regel: Kam ihr emotionaler Vor-Session-Check als ängstlich oder frustriert zurück, tradete sie halbe Größe oder gar nicht.
      </P>
      <P>
        Drei Monate später ist sie immer noch funded. Nicht, weil sie eine bessere Strategie fand, sondern weil sie ein System baute, das das Konto vor ihr selbst schützt.
      </P>

      <Divider />

      <H2>Die Prop-Firm-Denkweise</H2>
      <P>
        Die Trader, die Funded-Konten langfristig behalten, teilen ein mentales Modell: Sie behandeln die Regeln der Prop Firm nicht als Einschränkungen, sondern als ihre Trading-Strategie. Das Daily-Drawdown-Limit ist kein Hindernis — es ist die wichtigste Regel in ihrem Plan. Das Positionsgrößen-Limit ist keine Beschränkung — es ist eine Risikomanagement-Funktion, die sie sich vorher nicht selbst auferlegen konnten.
      </P>
      <P>
        Ein Trading-Journal verwandelt diese externen Regeln in interne Gewohnheiten. Wenn du jeden Trade gegen das Drawdown-Limit loggst, wenn du jedes Setup durch eine Checkliste laufen lässt, wenn du jede Woche überprüfst, ob du deinen Hard Stop eingehalten hast — werden die Regeln automatisch. Und dann hört Prop-Trading auf, ein Stresstest zu sein, und wird eine Karriere.
      </P>

      <Takeaways items={[
        'Die meisten Prop-Firm-Fehlschläge kommen von Positionsgrößen-Fehlern, Revenge Trading und der Unfähigkeit aufzuhören — nicht von schlechten Strategien.',
        'Berechne deinen maximalen Tagesverlust und dein Risiko pro Trade vor jeder Session. Schreib sie auf. Sie sind deine absoluten Grenzen.',
        'Füge deiner Pre-Trade-Checkliste zwei prop-spezifische Punkte hinzu: „Bin ich innerhalb des Daily Drawdown?" und „Wie viele Trades habe ich heute gemacht?"',
        'Setze einen Hard Stop bei 60-70 % des erlaubten Daily Drawdown. Schließe die Plattform, wenn du ihn erreichst. Logge, ob du ihn eingehalten hast.',
        'Verfolge den emotionalen Zustand pro Trade. Die Korrelation zwischen Emotionen und Ergebnissen ist die wertvollsten Daten, die ein Prop-Trader haben kann.',
      ]} />
    </BlogArticleLayout>
  );
}
