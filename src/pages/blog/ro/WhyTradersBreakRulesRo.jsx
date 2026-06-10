import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WhyTradersBreakRulesRo() {
  return (
    <BlogArticleLayout
      slug="why-traders-break-their-rules"
      lang="ro"
      title="De Ce Îți Încalci Propriile Reguli de Trading — Și Cum Te Oprești"
      metaTitle="De Ce Îți Tot Încalci Regulile de Trading (Psihologia Despre Care Nimeni Nu Vorbește) | K.M.F."
      metaDescription="Știi regulile. Le-ai scris chiar tu. Atunci de ce le tot încalci? Psihologia încălcării regulilor în trading și soluții practice."
      date="23 ianuarie 2026"
      dateISO="2026-01-23"
      readTime="7 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'ghost-trades-journaling-missed-opportunities', title: 'Ghost Trades: Why the Trades You Don\'t Take Are Costing You More Than the Ones You Lose', category: 'Psychology' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'De ce își încalcă traderii propriile reguli?', answer: 'Încălcarea regulilor în trading e condusă de gândirea Sistemului 1 (rapidă, emoțională) care domină gândirea Sistemului 2 (lentă, rațională). Sub stres, frica de a rata, sau după pierderi, creierul revine la decizii impulsive care îți încalcă planul.' },
        { question: 'Cum mă opresc din a-mi încălca regulile de trading?', answer: 'Folosește un pre-trade checklist fizic sau digital, setează stop loss-uri automate înainte să intri, stabilește un daily loss limit, și jurnalizează fiecare încălcare a regulilor cu emoția pe care ai simțit-o. Conștientizarea pattern-ului e primul pas.' },
        { question: 'E normal să îți încalci regulile de trading?', answer: 'Da — aproape fiecare trader se luptă cu asta, mai ales în primii 1-2 ani. Diferența dintre profesioniști și amatori nu e că profesioniștii nu simt niciodată impulsul, ci că au sisteme puse la punct ca să prevină acțiunea pe baza lui.' },
      ]}
    >
      <Intro>
        Aproape fiecare trader serios are un plan de trading scris. A petrecut timp definindu-și setup-urile, regulile de risc, criteriile de intrare și ieșire. Și aproape fiecare trader serios își încalcă regulat acel plan. Nu fiindcă a uitat regulile. Nu fiindcă crede că regulile sunt greșite. Ci fiindcă ceva, în acel moment, domină regulile — iar înțelegerea exactă a ce e acel ceva e primul pas spre a-l opri.
      </Intro>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>cele mai încălcate reguli: intrare,<br />stop, mărime, zile fără trade, ieșire</> },
        { value: 2, decimals: 0, label: <>sisteme cognitive<br />(Kahneman: rapid vs lent)</> },
        { value: 1, decimals: 0, label: <>checklist între impuls<br />și introducerea ordinului</> },
      ]} />

      <H2>Creierul Din Spatele Cedării: Sistemul 1 vs Sistemul 2</H2>
      <P>
        Cercetarea lui Daniel Kahneman, popularizată în cartea lui „Thinking, Fast and Slow", descrie două sisteme de gândire care operează în creierul uman. Înțelegerea lor explică aproape fiecare caz de încălcare a regulilor în trading.
      </P>
      <H3>Sistemul 1: Rapid și Emoțional</H3>
      <P>
        Sistemul 1 e automat, intuitiv, și operează sub nivelul conștiinței. Procesează informația rapid și generează răspunsuri emoționale imediate. E sistemul care te face să tresari înainte să înregistrezi conștient un zgomot puternic. În trading, e sistemul care generează impulsul de a cumpăra un activ care urcă rapid înainte să fi avut timp să-l analizezi.
      </P>
      <H3>Sistemul 2: Lent și Rațional</H3>
      <P>
        Sistemul 2 e deliberat, analitic, și cere efort. E sistemul pe care îl folosești când faci o împărțire lungă sau când revizuiești cu atenție un setup pe chart față de criteriile tale. E și leneș — revine la Sistemul 1 ori de câte ori poate, mai ales sub stres, presiune de timp, sau activare emoțională.
      </P>
      <P>
        Regulile tale de trading au fost scrise de Sistemul 2 când erai calm și obiectiv. Încălcarea regulilor se întâmplă când Sistemul 1 domină Sistemul 2 în timp real. Soluția, prin urmare, nu e să scrii reguli mai bune — e să-ți schimbi mediul ca impulsurile Sistemului 1 să fie mai greu de pus în practică.
      </P>

      <Divider />

      <H2>Cele 5 Reguli Pe Care Traderii Le Încalcă Cel Mai Des — și De Ce</H2>

      <H3>1. Reguli de Intrare (FOMO)</H3>
      <P>
        Frica de a rata (FOMO) e răspunsul Sistemului 1 la a vedea o mișcare întâmplându-se fără tine. Vezi o pereche valutară sau o acțiune urcând, iar creierul interpretează inacțiunea ca pierdere. Așa că cumperi — fără un setup corect, adesea în cel mai prost moment posibil (târziu într-o mișcare, lângă resistance). Regula de intrare există ca să prevină exact asta. Dar cere ca Sistemul 2 să domine un semnal emoțional puternic.
      </P>

      <H3>2. Reguli de Stop Loss (Speranța)</H3>
      <P>
        Mutarea unui stop loss mai departe — sau scoaterea lui complet — e cel mai autodistructiv comportament din trading. Stop loss-ul e ieșirea pe care ți-ai stabilit-o dinainte, când gândeai limpede. Dar în acel moment, când trade-ul merge împotriva ta, speranța pare mai logică decât disciplina. „O să revină." Uneori revine. Mai des nu, și ce ar fi fost o pierdere controlată de $100 devine o ieșire de urgență de $400.
      </P>

      <H3>3. Reguli de Position Size (Supraîncrederea)</H3>
      <P>
        După o serie de câștiguri, încrederea poate aluneca în supraîncredere — credința greșită că succesul recent indică o pricepere ridicată sau un mediu de piață unic de favorabil. Asta se manifestă adesea prin mărirea position size-ului peste regula de 1%. Problema e că seriile de câștiguri se termină, iar pozițiile supradimensionate în trade-ul care încheie seria provoacă daune disproporționate.
      </P>

      <H3>4. Reguli de Zile Fără Trade (Plictiseala și Compulsia)</H3>
      <P>
        Mulți traderi experimentați desemnează zile sau sesiuni în care nu tranzacționează — poate fiindcă piața se mișcă istoric în pattern-uri cu volum mic și erratice în acele perioade. Dar să stai în fața unui ecran fără nimic de făcut creează presiune psihologică să acționezi. Plictiseala se simte ca inactivitate, iar inactivitatea într-o piață care se mișcă rapid generează anxietate. Așa că se plasează un trade nu fiindcă există un setup, ci fiindcă statul degeaba a devenit inconfortabil.
      </P>

      <H3>5. Reguli de Ieșire (Lăcomia și Frica)</H3>
      <P>
        Regulile de ieșire sunt încălcate în ambele direcții. Lăcomia îi face pe traderi să țină pozițiile câștigătoare peste target-ul lor, sperând la mai mult, până când poziția întoarce și un trade de +3R devine unul de +0.5R. Frica îi face pe traderi să iasă prea devreme — prinzând 30% din mișcarea intenționată fiindcă poziția a coborât puțin și i-a cuprins panica. Ambele comportamente, aplicate constant, reduc dramatic valoarea așteptată a unei strategii.
      </P>

      <Divider />

      <H2>Mediul Contează Mai Mult Decât Voința</H2>
      <P>
        Voința e o resursă limitată. Cercetările arată constant că a te baza doar pe voință ca să-ți schimbi comportamentul e ineficient pe termen lung. Ce schimbă cu adevărat comportamentul e schimbarea mediului, astfel încât comportamentul dorit să fie mai ușor, iar cel nedorit mai greu.
      </P>
      <Callout title="Proiectează-ți Mediul" color="#CE93D8">
        Gândește-te la setup-ul tău de trading. Calculatorul tău de position size e la un click distanță, sau îngropat într-un spreadsheet? Ai feed-uri de știri deschise lângă chart-uri, creând zgomot emoțional? E platforma ta de trading configurată să permită intrări dintr-un click care îți sar peste checklist? Fiecare punct de fricțiune pe care îl adaugi comportamentului prost îi reduce frecvența — fără să ceară voință.
      </Callout>

      <H2>Soluții Practice</H2>
      <H3>1. Pre-trade checklist</H3>
      <P>
        Un <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklist</Link> scris, pe care trebuie să-l verifici fizic înainte să atingi un ordin, forțează Sistemul 2 în buclă. Creează o pauză obligatorie între impuls și acțiune. Checklist-ul ar trebui să acopere criteriile setup-ului, nivelul de stop loss, position size-ul și starea emoțională. Dacă vreo căsuță e nebifată, nu se ia niciun trade.
      </P>
      <H3>2. Redu fricțiunea pentru comportamentul bun</H3>
      <P>
        Ai nivelul de stop loss calculat și pregătit înainte să introduci ordinul. Dacă platforma ta permite ordine bracket (intrare + stop + target trimise simultan), folosește-le. Stop loss-ul ar trebui plasat în momentul intrării, nu ca un pas separat pe care plănuiești să-l faci „odată ce văd cum se dezvoltă".
      </P>
      <H3>3. Crește fricțiunea pentru comportamentul prost</H3>
      <P>
        Dezactivează trading-ul dintr-un click dacă platforma ta o permite. Adaugă un dialog de confirmare pentru trimiterea ordinelor. Dezabonează-te de la feed-urile de știri financiare în orele de trading. Cu cât e mai greu să acționezi impulsiv, cu atât o vei face mai rar.
      </P>
      <H3>4. Sistem de responsabilizare</H3>
      <P>
        Să-ți împărtășești jurnalul de trading cu un partener de trading de încredere — cineva care îți poate vedea trade-urile și îți poate atrage atenția când ai deviat de la plan — adaugă responsabilizare socială. Faptul că știi că cineva te va întreba despre acel trade impulsiv schimbă comportamentul mai sigur decât o hotărâre luată în privat.
      </P>
      <H3>5. Review săptămânal ca să identifici pattern-uri</H3>
      <P>
        Încălcarea regulilor nu e întâmplătoare. Probabil încalci aceleași reguli, în aceleași circumstanțe, la aceleași ore din zi. Un <Link to="/blog/weekly-trading-review-template" className="text-kmf-accent hover:underline">review săptămânal</Link> disciplinat dezvăluie aceste pattern-uri ca să poți adresa cauza de la rădăcină în loc să te hotărăști doar să „te descurci mai bine". Fără această buclă de feedback, ești blocat în <Link to="/blog/execution-gap-backtest-vs-live-trading" className="text-kmf-accent hover:underline">execution gap</Link> — știi ce ai de făcut dar nu reușești să o faci constant.
      </P>

      <Takeaways items={[
        'Încălcarea regulilor în trading e cauzată de Sistemul 1 (emoțional, rapid) care domină Sistemul 2 (rațional, deliberat) în timp real.',
        'Cele mai des încălcate cinci reguli sunt regulile de intrare (FOMO), stop loss-urile (speranța), position sizing-ul (supraîncrederea), regulile de zile fără trade (plictiseala) și regulile de ieșire (lăcomia/frica).',
        'Voința de una singură nu e suficientă — trebuie să-ți proiectezi mediul ca să faci comportamentul prost mai greu.',
        'Un pre-trade checklist e cel mai eficient instrument pentru a forța analiza rațională înainte de intrare.',
        'Reducerea fricțiunii pentru comportamentul bun (ordine bracket, stop-uri pre-calculate) și adăugarea de fricțiune pentru comportamentul prost (dezactivarea trading-ului dintr-un click) funcționează mai bine decât disciplina de una singură.',
        'Recunoașterea pattern-urilor prin review-uri săptămânale e modul în care identifici ce reguli anume încalci, în ce circumstanțe, și de ce.',
      ]} />
    </BlogArticleLayout>
  );
}
