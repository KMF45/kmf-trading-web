import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PreTradeChecklistDe() {
  return (
    <BlogArticleLayout
      slug="pre-trade-checklist"
      lang="de"
      title="Die Pre-Trade-Checkliste: 10 Dinge, die du vor jedem Einstieg prüfen solltest"
      metaTitle="Pre-Trade-Checkliste: 10 Regeln, die 90 % der schlechten Trades verhindern | K.M.F."
      metaDescription="Eine Pre-Trade-Checkliste ist das wirksamste Werkzeug für konstantes Trading. Hier sind 10 Fragen, die du vor jedem Einstieg prüfen solltest — passe sie an deine eigene Strategie an."
      date="14. Februar 2026"
      dateISO="2026-02-14"
      dateModified="2026-03-22"
      readTime="6 Min. Lesezeit"
      category="Disziplin"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Was sollte auf einer Pre-Trade-Checkliste stehen?', answer: 'Eine vollständige Pre-Trade-Checkliste deckt Marktbedingungen, Trendausrichtung, Einstiegs-Trigger, Stop-Loss-Platzierung, Positionsgröße, Risk-Reward-Verhältnis, emotionalen Zustand, Nachrichtenereignisse und ob der Trade zu deinem Trading-Plan passt.' },
        { question: 'Warum brauchen Trader eine Checkliste?', answer: 'Eine Checkliste erzwingt vor jedem Trade systematisches Denken und verhindert impulsive Einstiege aus FOMO oder Emotion. Piloten und Chirurgen nutzen Checklisten aus demselben Grund — Entscheidungen mit hohem Einsatz brauchen einen Prozess, keinen Instinkt.' },
        { question: 'Wie viele Punkte sollte eine Trading-Checkliste haben?', answer: 'Zwischen 7 und 12 Punkten ist ideal. Weniger als 7 übersieht wichtige Kriterien; mehr als 12 wird unpraktisch und Trader beginnen, Punkte zu überspringen. Jeder Punkt sollte eine klare Ja/Nein-Frage sein.' },
      ]}
      howToSteps={[
        { name: 'Setup-Kriterien prüfen', text: 'Bestätige, dass der Trade deinen definierten Setup-Bedingungen entspricht. Dehnst du die Definition, lehne den Trade ab.' },
        { name: 'Höheren-Zeitrahmen-Trend prüfen', text: 'Stelle sicher, dass der Trend des höheren Zeitrahmens deine Trade-Richtung stützt. Gegen den Trend zu traden erfordert zusätzliche Rechtfertigung.' },
        { name: 'Einstiegs-Trigger identifizieren', text: 'Definiere die exakte Price Action oder das Indikatorsignal, das deinen Einstieg auslöst. Kein Trigger, kein Trade.' },
        { name: 'Stop Loss an der Invalidierung platzieren', text: 'Setze deinen Stop Loss dort, wo deine Trade-Idee invalidiert wird — hinter der Struktur, ATR-basiert oder kerzenbasiert.' },
        { name: 'Positionsgröße berechnen', text: 'Nutze die 1-%-Regel, um die genaue Lot-Größe basierend auf Stop-Loss-Abstand und Kontostand zu berechnen.' },
        { name: 'Risk-Reward-Verhältnis prüfen', text: 'Bestätige, dass dein Ziel mindestens 1:2 Risk-Reward bietet. Wenn nicht, lohnt sich der Trade womöglich nicht.' },
        { name: 'Wirtschaftskalender prüfen', text: 'Vergewissere dich, dass während deiner erwarteten Trade-Dauer keine High-Impact-News geplant sind.' },
        { name: 'Emotionalen Zustand bewerten', text: 'Bewerte deinen emotionalen Zustand ehrlich. Bist du wütend, ängstlich oder euphorisch, geh weg.' },
        { name: 'Plan-Ausrichtung bestätigen', text: 'Vergewissere dich, dass der Trade zu deinem Wochen-/Monatsplan passt und dein tägliches Trade-Limit nicht überschreitet.' },
        { name: 'Trade vor dem Einstieg protokollieren', text: 'Notiere deine These, Einstieg, Stop und Ziel in deinem Journal, bevor du auf den Button klickst.' },
      ]}
    >
      <Intro>
        Vor jedem Linienflug arbeiten Piloten eine standardisierte Pre-Flight-Checkliste ab — nicht, weil erfahrene Piloten vergessen hätten, wie Flugzeuge funktionieren, sondern weil Checklisten systematisch die Fehlerklasse verhindern, die durch Selbstüberschätzung, Ablenkung oder Zeitdruck verursacht wird. Vor komplexen Operationen gehen OP-Teams verbale Checklisten durch, die nachweislich vermeidbare Todesfälle reduziert haben. Trading ist ein Bereich folgenreicher Entscheidungen unter Unsicherheit und emotionalem Druck. Das Argument für Checklisten ist dasselbe.
      </Intro>

      <StatsStrip items={[
        { value: 10, decimals: 0, label: <>Checklistenpunkte, die Setup,<br />Risiko und Psychologie abdecken</> },
        { value: 1.5, decimals: 1, suffix: ':1', label: <>minimales Risk-Reward,<br />bevor ein Trade qualifiziert</> },
        { value: 7, decimals: 0, label: <>minimale Emotionsbewertung<br />(1–10) vor dem Einstieg</> },
      ]} />

      <H2>Warum Checklisten im Trading funktionieren</H2>
      <P>
        Forschung zur Entscheidungsfindung unter Druck zeigt konstant, dass Menschen schlecht darin sind, mehrstufige Bewertungen in Echtzeit durchzuführen — besonders unter Stress oder Zeitdruck. Wir überspringen Schritte, gewichten jüngste Informationen zu stark und lassen den emotionalen Zustand das analytische Urteil verunreinigen.
      </P>
      <P>
        Eine Checkliste externalisiert die Entscheidungskriterien. Statt sich auf dein In-the-Moment-System-1-Denken (schnell, emotional) zu verlassen, um einen Trade richtig zu bewerten, erzwingt eine Checkliste das systematische Einschalten des System-2-Denkens (langsam, überlegt). Sie erzeugt eine verpflichtende Lücke zwischen Impuls und Handlung — und in dieser Lücke wohnt die Disziplin. Das ist auch der Grund, <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">warum Trader ihre eigenen Regeln brechen</Link> — ohne Checkliste gewinnt System 1 jedes Mal.
      </P>
      <Callout title="Die zentrale Erkenntnis" color="#FFB300">
        Eine Checkliste macht dich nicht zu einem besseren Analysten. Sie stellt sicher, dass die Analyse, die du bereits beherrschst, vor jedem Trade tatsächlich durchgeführt wird — nicht nur manchmal, nicht nur wenn du daran denkst, sondern jedes einzelne Mal.
      </Callout>

      <Divider />

      <H2>Die 10-Punkte-Pre-Trade-Checkliste</H2>

      <H3>1. Entspricht dieser Trade meinen definierten Setup-Kriterien?</H3>
      <P>
        Das ist die grundlegende Frage. Deine Setup-Kriterien definieren die spezifischen Bedingungen, unter denen deine Strategie einen Edge gezeigt hat. Erfüllt der aktuelle Trade diese Kriterien nicht klar — dehnst du die Definition, rundest die Ecken ab, redest dir ein „es ist nah genug" — ist das eine Ablehnung. Jede Abweichung von deinen Kriterien stellt einen Trade außerhalb deines Edge dar.
      </P>

      <H3>2. Habe ich den Trend oder die Struktur auf dem höheren Zeitrahmen identifiziert?</H3>
      <P>
        Gegen den dominanten Trend auf dem höheren Zeitrahmen zu traden senkt bei den meisten Strategien die Erfolgswahrscheinlichkeit erheblich. Bevor du einen Trade auf deinem Ausführungszeitrahmen eingehst, prüfe die ein oder zwei Zeitrahmen darüber. Ist der Trend in Richtung deines Trades? Gibt es ein offensichtliches Resistance- oder Support-Niveau über oder unter dem Kurs, das die Bewegung vor deinem Ziel stoppen könnte?
      </P>

      <H3>3. Gibt es ein klares Invalidierungsniveau für meinen Stop Loss?</H3>
      <P>
        Dein Stop Loss sollte auf einem strukturellen Niveau platziert werden — unter dem Support für einen Long, über dem Resistance für einen Short — nicht in einem willkürlichen Abstand. Kannst du keinen konkreten Grund nennen, warum der Kurs, der dieses Niveau erreicht, deinen Trade invalidiert, hast du keinen logischen Stop Loss. Du hast eine Vermutung.
      </P>

      <H3>4. Beträgt das Risk:Reward-Verhältnis mindestens 1:1,5 oder entspricht es meinen Regeln?</H3>
      <P>
        Berechne das tatsächliche Verhältnis: Abstand von Einstieg zu Stop Loss gegenüber Abstand von Einstieg zu Ziel. Ist dein Ziel 60 Pips entfernt und dein Stop 80 Pips, riskierst du mehr, als du gewinnen kannst. Kenne dein minimal akzeptables R:R-Verhältnis, bevor du deine Session beginnst, und lehne jeden Trade ab, der darunter fällt.
      </P>

      <H3>5. Habe ich meine Positionsgröße basierend auf 1 % Risiko berechnet?</H3>
      <P>
        Schätze nicht. Berechne. Risikobetrag = Konto × 0,01. Positionsgröße = Risikobetrag ÷ Stop-Abstand. Das dauert 20 Sekunden und stellt sicher, dass das schlechtest­mögliche Ergebnis dieses Trades — ein Vollverlust — genau 1 % deines Kontos kostet, nicht ungefähr 1 % nach Gefühl. Siehe unseren <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">kompletten Positionsgrößen-Leitfaden</Link> für die genaue Formel über Forex, Aktien und Krypto.
      </P>

      <H3>6. Steht in der nächsten Stunde ein großes Nachrichtenereignis an?</H3>
      <P>
        Große Wirtschaftsveröffentlichungen (NFP, CPI, Zentralbankentscheidungen) erzeugen plötzliche, große Kursbewegungen, die technisch solide Setups sofort invalidieren, Spreads wild ausweiten und Stops jagen können, bevor sie in der ursprünglichen Richtung weiterlaufen. Kenne den Wirtschaftskalender vor deiner Session. Ist ein High-Impact-Ereignis innerhalb der nächsten 60 Minuten geplant, warte bis nach der Veröffentlichung oder lass den Trade aus.
      </P>

      <H3>7. Trade ich aus Langeweile oder FOMO?</H3>
      <P>
        Sei ehrlich. Frage dich: Gehe ich diesen Trade ein, weil es ein echtes Setup gibt, oder weil ich vor dem Bildschirm sitze und das Gefühl habe, etwas tun zu müssen? FOMO-Trades — eingegangen, weil eine Bewegung bereits passiert und du sie nicht verpassen willst — und Langeweile-Trades gehören zu den zuverlässigsten Verlustkategorien. Ist die ehrliche Antwort ja, schließe den Chart und warte. Diese Art impulsiven Einstiegs ist der erste Schritt zum <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">Revenge Trading</Link>.
      </P>

      <H3>8. Bin ich emotional bereit, mit diesem Trade gegen mich umzugehen?</H3>
      <P>
        Bewerte deinen aktuellen emotionalen Zustand auf einer Skala von 1–10 (10 = völlig ruhig). Hattest du gerade einen Verlust-Trade und bist frustriert, hattest du Streit mit jemandem, bist du wegen etwas Trading-Fremdem ängstlich — diese Zustände beeinträchtigen die rationale Verarbeitung, die nötig ist, um einen Trade gut zu managen. Ein Zustand unter 6 oder 7 ist ein Signal, diesen Trade auszulassen.
      </P>

      <H3>9. Habe ich einen klaren Ausstiegsplan (Ziel und Stop)?</H3>
      <P>
        Bevor der Trade eingegangen wird, musst du wissen, wo du mit Verlust aussteigst (Stop-Niveau in Preiseinheiten) und wo du mit Gewinn auszusteigen planst (Zielniveau oder Bedingungen). „Ich sehe, wie es sich entwickelt" ist kein Ausstiegsplan. Einen Trade in Echtzeit ohne vordefinierten Ausstiegsplan zu managen führt zuverlässig zu emotionalen Entscheidungen im schlechtest­möglichen Moment.
      </P>

      <H3>10. Komme ich damit klar, wenn dieser Trade verliert?</H3>
      <P>
        Das ist eine psychologische Prüfung, keine Fangfrage. Jeder Trade, den du eingehst, sollte so dimensioniert und positioniert sein, dass das Ergebnis finanziell akzeptabel und emotional handhabbar ist, falls er verliert. Macht dich der Gedanke, dass dieser Trade verliert, krank oder verzweifelt, ist deine Position zu groß, dein emotionaler Zustand zu erhöht oder beides. Löse das zugrunde liegende Problem vor dem Einstieg.
      </P>

      <Divider />

      <H2>Wie du deine eigene Checkliste baust</H2>
      <P>
        Die 10 obigen Fragen sind ein Ausgangspunkt — passe sie an deine spezifische Strategie an. Die beste Checkliste ist die, die du tatsächlich nutzt, jedes Mal, ohne Ausnahme. Erwäge, deine in drei Kategorien zu gliedern:
      </P>
      <Table
        headers={['Kategorie', 'Fokus', 'Beispielfragen']}
        rows={[
          [{ value: 'Technisch', color: 'cyan' }, 'Ist das Setup valide?', 'Setup-Kriterien, Ausrichtung höherer Zeitrahmen, R:R-Verhältnis, News'],
          [{ value: 'Risiko', color: 'green' }, 'Ist das Risiko gemanagt?', 'Positionsgrößen-Berechnung, Stop-Loss-Logik, Konto-Risiko-%'],
          [{ value: 'Psychologisch', color: 'gold' }, 'Bin ich im richtigen Zustand?', 'Emotionsbewertung, Langeweile/FOMO-Prüfung, Verlustakzeptanz'],
        ]}
      />

      <H2>Digitale vs. Papier-Checkliste</H2>
      <P>
        Beide funktionieren. Das Kriterium ist Beständigkeit. Ein physischer Notizblock neben deiner Tastatur, den du vor jedem Trade physisch abhakst, funktioniert gut, weil das Aufnehmen eines Stifts Reibung erzeugt, die den Impuls bremst. Eine digitale Checkliste in deinem Trading-Journal funktioniert gut, weil sie ein überprüfbares Protokoll erzeugt. Was nicht funktioniert, ist eine mentale Checkliste — dein System-1-Gehirn wird dich überzeugen, dass du die Kästchen „im Grunde" abgehakt hast, wenn es den Trade eingehen will.
      </P>

      <H2>Was tun, wenn du eine Frage mit Nein beantwortest</H2>
      <P>
        Lass den Trade aus. Rationalisiere nicht. Mach keine Ausnahmen für „Setups mit hoher Überzeugung". Der Wert einer Checkliste kommt vollständig aus ihrer bedingungslosen Anwendung. Eine Checkliste, die du übersteuerst, wann immer du ein starkes Gefühl zu einem Trade hast, ist keine Checkliste — sie ist Dekoration.
      </P>
      <P>
        Die Trades, die du nicht eingehst, wenn deine Checkliste Nein sagt, sind genauso wichtig wie die Trades, die du eingehst, wenn sie Ja sagt. Disziplin ist symmetrisch.
      </P>

      <Takeaways items={[
        'Checklisten funktionieren, indem sie vor jedem Trade System-2-Denken (überlegt, analytisch) erzwingen und System-1-Einstiege (emotional, impulsiv) verhindern.',
        'Die 10 Kernbereiche: Setup-Übereinstimmung, höherer Zeitrahmen, Stop-Logik, R:R-Verhältnis, Positionsgröße, News, Langeweile/FOMO, emotionaler Zustand, Ausstiegsplan und Verlustakzeptanz.',
        'Gliedere deine Checkliste in drei Kategorien: Technisch, Risiko und Psychologisch.',
        'Eine physische oder digitale Checkliste erzeugt ein Protokoll. Eine mentale nicht — und das Gehirn wird dich täuschen.',
        'Beantwortest du eine Frage mit Nein, lass den Trade aus. Keine Ausnahmen. Die Disziplin liegt in der bedingungslosen Anwendung.',
        'Ausgelassene Trades, weil die Checkliste Nein sagt, sind keine verpassten Chancen. Sie sind Disziplin in Aktion.',
      ]} />
    </BlogArticleLayout>
  );
}
