import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WhenToWithdrawProfitsRo() {
  return (
    <BlogArticleLayout
      slug="when-to-withdraw-trading-profits"
      lang="ro"
      title="Când Să-ți Retragi Profitul din Trading (Și De Ce Faptul Că Nu Retragi Niciodată Îți Distruge Disciplina)"
      metaTitle="Când Să Retragi Profitul din Trading: Argumentul Disciplinei | K.M.F."
      metaDescription="Banii pe care nu-i atingi niciodată încetează să pară bani. Devin puncte pe un ecran — și riști cu punctele lucruri cu care n-ai risca niciodată cu cash. De ce retragerea te face un trader mai bun, nu doar mai bogat."
      date="17 august 2026"
      dateISO="2026-08-17"
      readTime="10 min citire"
      category="Disciplină"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'position-size-psychological-ceiling', title: 'The Size Ceiling: Why You Trade 1% Perfectly at $10k and Fall Apart at $100k', category: 'Psychology' },
        { slug: 'trading-vs-gambling', title: 'When Trading Becomes Gambling (And How to Avoid It)', category: 'Psychology' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ar trebui să-mi retrag profitul din contul de trading?', answer: 'Da, după un program, din două motive. Financiar, retragerea transformă capitalul de pe ecran într-un rezultat care nu mai poate fi returnat pieței. Psihologic, menține soldul contului conectat la bani reali — iar banii care par reali sunt tratați cu grija cuvenită. Traderii care nu retrag niciodată tind să alunece spre a trata soldul ca pe niște puncte într-un joc.' },
        { question: 'Cât de des ar trebui un trader să-și retragă profitul?', answer: 'Lunar sau trimestrial, după un program fix decis din timp, e abordarea cea mai comună. Programul contează mai mult decât frecvența: retragerea pe regulă scoate decizia din starea ta emoțională, în timp ce retragerea când ai chef înseamnă că vei retrage după câștiguri și vei sări peste după pierderi — ceea ce e exact pe dos.' },
        { question: 'Retragerea profitului strică efectul de compunere?', answer: 'Matematic, da — fiecare dolar retras încetează să se compună. Dar calculul care arată compunerea pură ca fiind optimă presupune că nivelul execuției tale nu e afectat de mărimea contului, ceea ce e fals pentru aproape toată lumea. Un cont ceva mai mic pe care îl tranzacționezi corect bate un cont mai mare pe care îl tranzacționezi prost. În plus, retragerile protejează câștigurile de a fi returnate pieței, lucru pe care niciun model de compunere nu îl ia în calcul.' },
        { question: 'Ce este efectul „house money" în trading?', answer: 'Termen introdus de Richard Thaler, descrie tendința de a-ți asuma riscuri mai mari cu banii percepuți ca fiind câștiguri, nu ca fiind capitalul tău. Thaler și Johnson au demonstrat că oamenii care tocmai câștigaseră bani erau mai dispuși să-i parieze decât cei cărora li se dăduse pur și simplu aceeași sumă. În trading, profitul lăsat în cont e clasat mental ca „banii pieței" și e riscat mult mai lejer decât capitalul depus.' },
      ]}
      howToSteps={[
        { name: 'Decide programul înainte să ai nevoie de el', text: 'Alege o cadență fixă — lunară sau trimestrială — și scrie-o cât ești calm. Un program stabilit din timp e o regulă; o retragere decisă pe moment e o stare de spirit.' },
        { name: 'Retrage un procent din profit, nu o sumă fixă', text: 'Ia o cotă stabilită din profitul perioadei (frecvent 20-50%), ca retragerile să scaleze cu performanța și ca o lună neutră să nu te forțeze să consumi din capital.' },
        { name: 'Separă banii fizic', text: 'Mută-i într-un cont pe care nu-l folosești pentru trading și pe care nu-l verifici zilnic. Banii care pot fi returnați în contul de trading din două click-uri nu au fost retrași cu adevărat.' },
        { name: 'Retrage și după perioade pe pierdere, dacă asta spune regula', text: 'Dacă regula ta e o cotă din profit, o perioadă pe pierdere pur și simplu nu produce nicio retragere — dar nu sări niciodată peste o retragere programată după o perioadă profitabilă fiindcă simți că vine o serie bună. Exact impulsul ăsta există programul ca să-l anuleze.' },
        { name: 'Notează fiecare retragere în jurnal', text: 'Înregistrează data și suma alături de datele tale de trading, ca retragerile să se reflecte în curba de capital. Altfel istoricul tău de performanță devine imposibil de citit și nu mai poți deosebi profitul de depuneri.' },
      ]}
    >
      <Intro>
        Întreabă un trader cum i-a mers anul și îți va spune că e pe plus 40%. Întreabă-l câți bani a scos efectiv din cont și de obicei urmează o pauză. Pentru mulți, răspunsul sincer e niciunul — nicio retragere de la ziua în care au alimentat contul. Soldul a crescut, iar asta a fost tratată ca fiind același lucru cu a face bani. Nu e, iar diferența dintre cele două nu e doar o subtilitate contabilă. Banii care nu părăsesc niciodată ecranul încetează treptat să mai fie bani. Devin un scor. Iar oamenii riscă scoruri în feluri în care n-ar risca niciodată cash.
      </Intro>

      <StatsStrip items={[
        { value: 30, decimals: 0, suffix: '%', label: <>o cotă frecventă de retragere<br />din profitul fiecărei perioade</> },
        { value: 100, decimals: 0, suffix: '%', label: <>din profitul neretras<br />rămâne expus pieței</> },
        { value: 0, decimals: 0, label: <>retrageri făcute de majoritatea traderilor<br />— un default, nu o decizie</> },
      ]} />

      <H2>Problema Punctelor de pe Ecran</H2>
      <P>
        Un cont de trading e un loc neobișnuit de abstract în care să-ți ții banii. Nu poți cheltui din el, nu atingi niciodată bancnotele, iar numărul se schimbă singur în timp ce dormi. Fiecare element de design al interfeței te încurajează să citești numărul ăla ca pe un scor într-un joc, nu ca pe economiile tale.
      </P>
      <P>
        Abstractizarea asta e utilă în doze mici. Gândirea în R-multipli în loc de dolari o exploatează deliberat, fiindcă scoate greutatea emoțională din trade-urile individuale și îți permite să execuți curat. Dar aceeași detașare care te ajută să încasezi o pierdere de −1R fără să tresari te va ajuta, pe o perioadă destul de lungă, să-ți asumi riscuri pe care le-ai refuza dacă banii ar părea reali.
      </P>
      <P>
        Testul e simplu și incomod. Imaginează-ți că-ți retragi tot soldul în numerar, îl stivuiești pe masă, și apoi ți se cere să riști 3% din grămada aia pe următorul setup. Majoritatea traderilor care cresc vesel mărimea pe ecran n-ar împinge bancnotele fizice înainte. Aceiași bani, același trade, decizie complet diferită — ceea ce îți spune că varianta de pe ecran nu era evaluată ca bani.
      </P>

      <H2>House Money: De Ce Profitul E Riscat Altfel</H2>
      <P>
        Economia comportamentală a numit fenomenul ăsta acum decenii. Richard Thaler a introdus termenul <em>house money effect</em> pentru a descrie tendința de a-ți asuma riscuri mai mari cu bani percepuți ca fiind câștiguri decât cu bani percepuți ca fiind ai tăi. Thaler și Johnson l-au demonstrat direct: participanții cărora li s-a spus că tocmai câștigaseră $30 erau mai dispuși să parieze o parte decât participanții cărora li s-au dat pur și simplu $30 și li s-a oferit exact același pariu. Aceeași valoare așteptată, aceleași sume, disponibilitate diferită — determinată exclusiv de sertarul mental în care fuseseră clasați banii.
      </P>
      <P>
        Ăsta e un caz particular a ceea ce Thaler a numit <em>mental accounting</em>: banii sunt fungibili în teorie, dar oamenii îi sortează în sertare mentale separate și aplică reguli diferite fiecăruia. Capitalul tău depus stă într-un sertar marcat „banii mei". Profitul tău din trading stă în unul marcat mai degrabă „banii pieței, temporar la mine".
      </P>
      <P>
        Consecința pentru un trader profitabil e precisă și scumpă. Pe măsură ce profitul se acumulează în cont, o parte tot mai mare din soldul tău stă în sertarul păzit slab. Nu decizi conștient să-ți asumi mai mult risc. Îți aplici disciplina normală de risc pe capitalul inițial și o disciplină mult mai slabă pe tot ce e peste el — iar al doilea număr crește.
      </P>

      <Callout title="Semnalul" color="#FFB300">
        Dacă ai ezita să adaugi bani proaspeți din contul bancar ca să finanțezi o poziție mai mare, dar te simți confortabil să rulezi aceeași poziție mai mare fiindcă „oricum e tot profit", atunci tranzacționezi două politici de risc diferite dintr-un singur cont. Doar una dintre ele e cea pe care ai scris-o.
      </Callout>

      <H2>Ce Îți Aduce De Fapt Retragerea</H2>
      <P>
        Argumentul financiar e evident — banii ieșiți din cont nu mai pot fi returnați pieței. Mai interesante sunt efectele pe care traderii nu le anticipează.
      </P>

      <H3>Închide bucla</H3>
      <P>
        Trading-ul e neobișnuit printre activitățile care cer pricepere prin faptul că îl poți practica bine ani la rând fără să experimentezi vreodată un rezultat tangibil. Retragerea e momentul în care abstracțiunea se transformă în ceva real: o factură plătită, o cheltuială acoperită, bani care există în afara platformei. Fără momentul ăla, întreaga întreprindere rămâne ipotetică, iar în privința muncii ipotetice e greu să rămâi disciplinat la nesfârșit.
      </P>

      <H3>Transformă un istoric în dovadă</H3>
      <P>
        Cu o curbă de capital se poate polemiza. Cu un istoric de retrageri, nu. Când ești într-un <Link to="/blog/ro/drawdown-after-profitability" className="text-kmf-accent hover:underline">drawdown și te întrebi dacă ai fost vreodată cu adevărat bun la asta</Link>, un registru cu bani care au părăsit efectiv contul și au intrat în viața ta e cea mai solidă contra-dovadă disponibilă.
      </P>

      <H3>Reancorează soldul în realitate</H3>
      <P>
        Fiecare retragere reconectează forțat numărul de pe ecran la putere de cumpărare reală. Conexiunea aia e fundația pe care ți-ai construit inițial disciplina de risc, și se degradează fără reînnoire periodică.
      </P>

      <H3>Limitează problema plafonului de mărime</H3>
      <P>
        Fiindcă riscul e procentual, un cont care doar crește îți împinge riscul absolut per trade constant în sus — adesea mai repede decât urcă <Link to="/blog/ro/position-size-psychological-ceiling" className="text-kmf-accent hover:underline">plafonul tău psihologic de mărime</Link>. Retragerile regulate încetinesc deriva asta, ceea ce e un beneficiu real și rar menționat: îți țin riscul în dolari în intervalul pe care chiar îl poți executa.
      </P>

      <Divider />

      <H2>Trei Modele de Retragere</H2>
      <P>
        Nu există o politică universal corectă, dar există trei coerente. Modul de eșec nu e alegerea modelului greșit — e să nu ai niciun model.
      </P>

      <Table
        headers={['Model', 'Cum funcționează', 'Potrivit pentru', 'Slăbiciunea principală']}
        rows={[
          [
            { value: 'Procent fix din profit', color: 'cyan' },
            'Retragi o cotă stabilită (ex. 30%) din profitul fiecărei perioade; nimic în perioadele pe pierdere',
            { value: 'Majoritatea traderilor — scalează natural', color: 'green' },
            'Are nevoie de o perioadă profitabilă ca să producă ceva',
          ],
          [
            { value: 'Sumă fixă, programată', color: 'cyan' },
            'Retragi aceeași sumă în fiecare lună, indiferent de rezultate',
            { value: 'Traderii care trăiesc din trading', color: 'green' },
            { value: 'Consumă din capital în lunile pe pierdere', color: 'gold' },
          ],
          [
            { value: 'Prag / high-water', color: 'cyan' },
            'Retragi tot ce depășește o mărime-țintă a contului, menținând contul la un nivel ales',
            { value: 'Traderii aflați la sau lângă plafonul lor de mărime', color: 'green' },
            { value: 'Plafonează complet compunerea, prin construcție', color: 'gold' },
          ],
          [
            { value: 'Fără nicio politică', color: 'red' },
            'Retragi când ți se pare potrivit, sau niciodată',
            { value: 'Nimeni', color: 'red' },
            { value: 'Garantează că vei retrage emoțional, sau deloc', color: 'red' },
          ],
        ]}
      />

      <P>
        Modelul cu prag merită mai multă atenție decât primește. Un trader care știe că execuția lui se degradează peste $500 risc per trade poate pur și simplu să-și țină contul la nivelul la care 1% înseamnă o mărime pe care o tranzacționează bine, și să retragă tot ce e peste. A schimbat conștient o parte din compunere pentru o execuție constant corectă — ceea ce, pentru un trader care operează lângă plafonul lui, e de obicei târgul mai bun.
      </P>

      <H2>Obiecția cu Compunerea</H2>
      <P>
        Argumentul standard împotriva retragerii e că fiecare dolar scos încetează să se compună, iar compunerea e locul unde se fac banii adevărați. Aritmetica e corectă. Presupunerea pe care se sprijină, însă, nu e.
      </P>
      <P>
        Modelele de compunere presupun că performanța ta e independentă de mărimea contului — că un trader care produce 3% pe lună la $20.000 va produce 3% pe lună la $200.000. Pentru o minoritate de traderi, asta se confirmă. Pentru majoritatea, nu, fiindcă nivelul execuției se degradează pe măsură ce miza absolută crește, iar un randament mai mic pe un cont mai mare poate însemna lejer mai puțini bani decât un randament mai mare pe un cont mai mic.
      </P>
      <P>
        Mai e o omisiune. Modelele de compunere presupun că profitul persistă. În realitate, profitul neretras rămâne complet expus: un trader care e pe plus 60% și dă totul înapoi într-un trimestru prost n-a câștigat nimic, în timp ce un trader care a retras 30% pe parcurs a păstrat ceva, indiferent ce a urmat. Retragerea nu e doar venit — e singurul mecanism care face un câștig permanent.
      </P>
      <P>
        Nimic din toate astea nu pledează pentru retragerea a tot. Creșterea contului e un obiectiv legitim, iar compunerea e reală. Pledează pentru faptul că „reinvestesc 100%, la nesfârșit, implicit" e o decizie pe care majoritatea traderilor n-au luat-o niciodată de fapt — pur și simplu n-au ales altceva.
      </P>

      <H2>Când Să NU Retragi</H2>
      <Ul items={[
        <>Contul tău e sub mărimea la care 1% risc înseamnă ceva. Să retragi dintr-un cont de $500 nu e disciplină, e demontare. Construiește întâi — vezi analiza noastră despre <Link to="/blog/ro/is-100-enough-to-start-forex" className="text-kmf-accent hover:underline">dacă $100 sunt suficienți pentru forex</Link>.</>,
        'Retragi ca să scapi dintr-un drawdown. Să scoți bani fiindcă ești speriat e o decizie de mărime deghizată în retragere. Redu mărimea poziției în schimb, deliberat și consemnat.',
        'Retragi în afara programului, după un câștig mare. Ăsta e efectul house money rulând invers, și antrenează exact impulsivitatea pe care programul există ca s-o elimine.',
        'Conturile de prop firm urmează regulile de payout ale firmei, nu pe ale tale. Psihologia din articolul ăsta se aplică în continuare, dar mecanismul e ciclul firmei — planifică în jurul lui, nu împotriva lui.',
      ]} />

      <Callout title="Ține retragerile în evidențe" color="#4FC3F7">
        O retragere nenotată îți corupe datele de performanță — depunerile și retragerile amestecate într-o curbă de capital fac imposibilă deosebirea rezultatelor de trading de mișcările de numerar. Notează fiecare transfer cu dată și sumă alături de trade-uri, ca istoricul tău să rămână lizibil și peste ani.
      </Callout>

      <H2>Adevăratul Punct</H2>
      <P>
        Retragerea e discutată de obicei ca o decizie financiară: cât iei, cât lași, cât costă în compunere. Încadrarea asta ratează ce contează cu adevărat.
      </P>
      <P>
        Motivul pentru care retragi după un program e că asta te ține onest. Menține conexiunea dintre numerele pe care le riști și viața căreia îi aparțin numerele alea, iar conexiunea aia e fundația pe care e construită orice altă bucată de disciplină de risc. Un trader care n-a scos bani de trei ani nu face neapărat nimic greșit încă — dar a încetat discret să mai joace pentru bani și a început să joace pentru un număr, iar cele două produc decizii diferite exact în momentele în care deciziile contează cel mai mult.
      </P>

      <Takeaways items={[
        'Banii care nu părăsesc niciodată contul încetează să fie trăiți ca bani. Devin un scor — iar oamenii riscă scoruri în feluri în care n-ar risca niciodată cash.',
        'Efectul house money (Thaler): profitul din cont e clasat mental ca „banii pieței" și e riscat mult mai lejer decât capitalul depus. Pe măsură ce profitul crește, o parte tot mai mare din sold stă în sertarul păzit slab.',
        'Retragerea e singurul mecanism care face un câștig permanent. Profitul neretras e complet expus — pe plus 60% și apoi dat înapoi înseamnă că n-ai câștigat nimic.',
        'Modelele de compunere presupun că performanța e independentă de mărimea contului. Nu e, pentru majoritatea: un randament mai mic pe un cont mare pe care îl tranzacționezi prost poate însemna mai puțini bani decât un randament mai mare pe un cont mic pe care îl tranzacționezi bine.',
        'Retragerile regulate încetinesc deriva riscului tău absolut în dolari, ținând mărimea poziției în intervalul pe care execuția ta îl poate duce cu adevărat.',
        'Alege un model — procent din profit, sumă fixă sau prag high-water — și stabilește programul la rece. Modul de eșec nu e alegerea modelului greșit; e să nu ai niciunul și să retragi după stare.',
        'Nu retrage niciodată ca să scapi dintr-un drawdown. Aia e o decizie de mărime a poziției deghizată; redu mărimea deliberat în schimb.',
      ]} />
    </BlogArticleLayout>
  );
}
