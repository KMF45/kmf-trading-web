import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function OvertradingChecklistRo() {
  return (
    <BlogArticleLayout
      slug="overtrading-checklist"
      lang="ro"
      title="Checklist de Overtrading: 8 Semne Că Ești pe Tilt Fără Să-ți Dai Seama"
      metaTitle="8 Semne Că Faci Overtrading Chiar Acum — Oprește-te Înainte Să Fie Prea Târziu | K.M.F."
      metaDescription="Overtrading-ul e ucigașul tăcut de conturi. Învață 8 semne de avertizare concrete că ești pe tilt, psihologia din spatele fiecăruia, și cum să te prinzi înainte să fie făcută dauna."
      date="15 martie 2026"
      dateISO="2026-03-15"
      readTime="7 min citire"
      category="Disciplină"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Ce este overtrading-ul în forex și acțiuni?', answer: 'Overtrading înseamnă să iei mai multe trade-uri decât cere strategia ta, de obicei condus de emoție în loc de calitatea setup-ului. Include tranzacționarea prea frecventă, mărirea impulsivă, sau intrarea în setup-uri pe care nu le-ai testat — toate îți erodează edge-ul și amplifică pierderile.' },
        { question: 'Cum știu dacă fac overtrading?', answer: 'Semne cheie: tranzacționezi mai frecvent decât media ta istorică, iei setup-uri în afara planului, îți mărești position size-ul după pierderi, cobori la timeframe-uri mai mici ca să „găsești" intrări, și simți că nu te poți opri chiar și când știi că ar trebui.' },
        { question: 'Cum funcționează detecția de tilt în K.M.F. Trading Journal?', answer: 'K.M.F. monitorizează patru indicatori de tilt în timp real: pierderi consecutive, creșteri de lot size față de media ta, stări emoționale negative logate înainte de trade-uri, și deviația de la frecvența ta normală de tranzacționare. Afișează un banner de avertizare pe 4 niveluri — de la prudență ușoară la o recomandare puternică de a te opri — direct pe ecranul de intrare în trade.' },
      ]}
    >
      <Intro>
        Overtrading-ul nu e despre a lua multe trade-uri. Unele strategii cer frecvență mare. Overtrading-ul e despre a lua trade-uri pe care strategia ta nu le-a generat — trade-uri conduse de plictiseală, frustrare, frica de a rata, sau compulsia de a recupera pierderi. Partea periculoasă e că tilt-ul rar se anunță. Nu te așezi și decizi să faci overtrading. Se strecoară treptat, și până observi, dauna e deja semnificativă.
      </Intro>

      <StatsStrip items={[
        { value: 8, decimals: 0, label: <>semne de avertizare de tilt<br />de monitorizat în fiecare sesiune</> },
        { value: 4, decimals: 0, label: <>niveluri de detecție de tilt<br />pe care K.M.F. le urmărește automat</> },
        { value: 30, decimals: 0, suffix: ' min', label: <>eliminarea cortizolului după<br />închiderea platformei</> },
      ]} />

      <H2>Cele 8 Semne de Avertizare</H2>

      <H3>1. Frecvența ta de tranzacționare a crescut brusc</H3>
      <P>
        Dacă în mod normal iei 3 până la 5 trade-uri pe sesiune și azi ai luat 9, ăsta e un punct de date care merită examinat. Vârfurile de frecvență indică aproape mereu tranzacționare emoțională — piața nu a produs brusc de trei ori mai multe setup-uri valide. Filtrul tău s-a lejerat fiindcă starea ta emoțională s-a schimbat. Urmărește-ți media de trade-uri pe sesiune în timp ca să ai un baseline cu care să compari.
      </P>

      <H3>2. Sari peste checklist-ul tău</H3>
      <P>
        <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">Pre-trade checklist-ul</Link> există exact pentru momente ca acestea. Când începi să-ți spui „nu trebuie să verific, ăsta e evident" sau „îl loghez după", ești în teritoriul Sistemului 1 — rapid, emoțional, și nesigur. În clipa în care checklist-ul tău se simte ca un obstacol în loc de o unealtă, ești pe tilt. K.M.F. include o funcție de checklist încorporată cu template-uri implicite și custom care apare înainte de fiecare intrare în trade, făcând-o structural greu de sărit.
      </P>

      <H3>3. Cobori la timeframe-uri mai mici</H3>
      <P>
        Dacă în mod normal tranzacționezi chart-ul de 4 ore și te trezești derulând prin cel de 15 minute sau chiar 5 minute căutând intrări, ceva s-a schimbat. Timeframe-urile mai mici produc mai multe semnale — majoritatea fiind zgomot, nu edge. Driverul psihologic e de obicei nerăbdarea: timeframe-ul tău nu produce setup-uri destul de repede, așa că mergi să cauți unde e acțiunea. Dar acțiunea pe timeframe-urile mai mici nu e strategia ta. E doar mișcare.
      </P>

      <H3>4. Tranzacționezi evenimente de știri pe care în mod normal le eviți</H3>
      <P>
        Cei mai mulți traderi experimentați știu ce publicări economice creează volatilitate imprevizibilă și aleg să stea pe margine. Când te trezești intrând în trade-uri în timpul NFP, publicărilor CPI, sau anunțurilor băncilor centrale pe care în mod normal le-ai evita, motivul e aproape sigur emoțional. Volatilitatea pare oportunitate, dar e risc nestructurat — iar strategia ta nu a fost construită pentru ea.
      </P>

      <H3>5. Position size-ul tău crește încet</H3>
      <P>
        Ăsta e unul dintre cele mai periculoase semne fiindcă compune fiecare altă greșeală. După o pierdere, instinctul de a mări mărimea ca să recuperezi mai repede e puternic și automat. Nu se simte ca o decizie conștientă — se simte ca o „ajustare". Dar dacă ultimele tale trei trade-uri au fost la 0.5 loturi și ăsta e la 1.2 loturi, n-ai ajustat. Ți-ai triplat riscul într-o perioadă de performanță slabă. Ăsta e mecanismul de bază din spatele <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">revenge trading-ului</Link>.
      </P>

      <H3>6. Iei setup-uri pe care nu le-ai testat niciodată</H3>
      <P>
        Un trader pe tilt începe să vadă pattern-uri peste tot. „Aia arată ca un double bottom." „Ăsta ar putea fi un breakout." Setup-urile pot fi reale în teorie, dar dacă nu le-ai backtestat sau tranzacționat niciodată în strategia ta, au zero edge demonstrat. Faci gambling cu vernisul analizei tehnice. Rămâi la setup-urile din playbook-ul tău documentat.
      </P>

      <H3>7. Nu te poți opri din a te uita la ecran</H3>
      <P>
        Trading-ul sănătos include timp departe de chart-uri. Când te trezești incapabil să închizi platforma — dând refresh, derulând, urmărind fiecare tick — sistemul tău nervos e într-o stare de hiperexcitare. Asta nu e concentrare. E compulsie. Creierul s-a fixat pe trading ca sursă de stimulare, iar a te depărta se simte insuportabil. Acea senzație e ea însăși cel mai puternic semnal de a te depărta.
      </P>

      <H3>8. Îți spui „doar încă un trade"</H3>
      <P>
        Această frază e marca universală a tilt-ului. „Doar încă unul" înseamnă că ai recunoscut deja, la un anumit nivel, că ar trebui să te oprești — dar atracția emoțională îți domină judecata. Încă un trade devine două, apoi patru, apoi o sesiune pe care o regreți. Dacă cuvintele „doar încă unul" se formează în mintea ta, sesiunea s-a terminat. Închide platforma.
      </P>

      <Divider />

      <H2>De Ce Tilt-ul E Invizibil din Interior</H2>
      <P>
        Provocarea fundamentală cu overtrading-ul e că stările emoționale distorsionează conștientizarea de sine. Când cortexul tău prefrontal e afectat de frustrare sau entuziasm, exact facultatea de care ai nevoie ca să recunoști tilt-ul e cea care e offline. De-asta gardurile externe contează mai mult decât disciplina internă. O regulă, un checklist, o unealtă care marchează pattern-ul — astea funcționează când voința nu o face.
      </P>

      <Callout title="Detecția de Tilt K.M.F." color="#FFB300">
        K.M.F. Trading Journal monitorizează patru indicatori de tilt automat: pierderi consecutive, creșteri de lot size față de media ta, stări emoționale negative, și vârfuri de frecvență de tranzacționare. Afișează un banner de avertizare pe 4 niveluri direct pe ecranul de intrare în trade — de la o reamintire blândă la o recomandare puternică de a te opri din tranzacționat pentru ziua respectivă. Sistemul prinde ce ratează creierul tău emoțional.
      </Callout>

      <H2>Ce Să Faci Când Te Prinzi</H2>
      <P>
        Dacă te-ai recunoscut în două sau mai multe dintre semnele de mai sus, acțiunea e simplă dar nu ușoară: oprește-te din tranzacționat pentru restul sesiunii. Închide platforma. Fă ceva fizic — plimbă-te, fă mișcare, gătește. Cortizolul și adrenalina din sistemul tău au nevoie de 20 până la 30 de minute ca să se disipeze. Când revii mâine, revizuiește cinstit trade-urile de azi. Identifică pe care au fost pe bază de plan și care pe bază de emoție. Acel review e mai valoros decât orice trade ai fi putut lua. Citește mai multe despre <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">de ce traderii își încalcă regulile</Link> și cum să construiești sisteme care previn asta.
      </P>

      <Takeaways items={[
        'Overtrading-ul nu e despre volum — e despre a lua trade-uri pe care strategia ta nu le-a generat.',
        'Cele 8 semne de avertizare: vârf de frecvență, săritul peste checklist, timeframe-uri mai mici, tranzacționarea de știri, creșterea position size-ului, setup-uri netestate, dependența de ecran, și „doar încă unul".',
        'Tilt-ul distorsionează conștientizarea de sine — nu îl poți detecta sigur din interior, de-asta uneltele și regulile externe contează.',
        'Sistemul de detecție de tilt al K.M.F. monitorizează pierderile consecutive, schimbările de lot size, și stările emoționale ca să prindă overtrading-ul înainte să escaladeze.',
        'Răspunsul corect la recunoașterea tilt-ului e mereu același: oprește-te, închide platforma, și revizuiește mâine.',
        'Un pre-trade checklist care apare înainte de fiecare intrare e o barieră structurală împotriva trade-urilor impulsive.',
      ]} />
    </BlogArticleLayout>
  );
}
