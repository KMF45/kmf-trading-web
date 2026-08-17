import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PositionSizeCeilingRo() {
  return (
    <BlogArticleLayout
      slug="position-size-psychological-ceiling"
      lang="ro"
      title="Plafonul psihologic al mărimii poziției: de ce 1% se simte diferit la $10k și la $100k"
      metaTitle="Plafonul Psihologic de Mărime a Poziției: De Ce Creșterea Îți Strică Execuția | K.M.F."
      metaDescription="Procentul tău de risc e identic. Strategia e identică. Atunci de ce ți se prăbușește execuția când tranzacționezi mai mare? Neuroștiința plafonului de mărime și cum îl ridici fără să-ți distrugi contul."
      date="17 august 2026"
      dateISO="2026-08-17"
      readTime="11 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'drawdown-after-profitability', title: "The Profitable Trader's Drawdown: Why Losing Hurts More After You've Won", category: 'Psychology' },
        { slug: 'confidence-vs-overconfidence', title: 'Confidence vs Overconfidence: The Invisible Line That Separates Winners from Blowups', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'De ce îmi merge trading-ul mai prost când cresc mărimea poziției?', answer: 'Fiindcă procentul tău de risc și riscul pe care îl simți sunt două mărimi diferite. Creierul tău rațional înțelege că 1% e 1% la orice mărime de cont, dar răspunsul tău la stres reacționează la suma absolută pusă în joc. Să riști $500 produce o reacție fiziologică mai puternică decât să riști $100, chiar dacă ambele sunt 1%. Reacția aia degradează exact funcțiile de care trading-ul are nevoie: răbdare, respectarea regulilor și toleranță la profit deschis.' },
        { question: 'Ce este un plafon psihologic de mărime a poziției?', answer: 'E mărimea poziției peste care calitatea execuției tale se degradează constant, indiferent cât încerci să te obișnuiești. Sub plafon îți respecți planul; peste el tai câștigătorii devreme, sari peste setup-uri valide și muți stop-urile. Plafonul e personal, nu e o trăsătură fixă de personalitate și poate fi ridicat deliberat în timp.' },
        { question: 'Cu cât ar trebui să cresc mărimea poziției dintr-o dată?', answer: 'O regulă folosită pe scară largă e maximum 25% pe pas — de la $100 risc per trade la $125, nu la $200. Apoi ții mărimea aia pentru un eșantion semnificativ, tipic minim 30 de trade-uri, și îți verifici respectarea planului înainte să urci din nou. Scopul e ca fiecare creștere să fie destul de mică încât sistemul tău nervos abia s-o observe.' },
        { question: 'Care e cel mai prost moment să cresc mărimea poziției?', answer: 'În timpul unei serii câștigătoare. Seria e momentul în care creșterea pare cel mai justificată și e cel mai probabil să fie o reacție la varianță, nu la dovezi. Crește mărimea într-o perioadă normală, mixtă — niște câștiguri, niște pierderi — când decizia e plictisitoare, nu palpitantă.' },
      ]}
      howToSteps={[
        { name: 'Stabilește-ți calitatea execuției de referință', text: 'Înainte să schimbi ceva, măsoară-ți respectarea planului, pierderea medie în R și rata erorilor de execuție la mărimea actuală. Fără o valoare de referință nu poți ști dacă o mărime mai mare îți face rău.' },
        { name: 'Crește cu maximum 25% pe pas', text: 'Ridică riscul per trade cu un sfert, nu cu un multiplu. De la $100 la $125. Pasul ar trebui să pară aproape imperceptibil — ăsta e scopul, nu o limitare.' },
        { name: 'Ține noua mărime minim 30 de trade-uri', text: 'O săptămână bună la o mărime mai mare nu demonstrează nimic. Ține noul nivel pentru un eșantion complet, ca să apară atât secvențe câștigătoare, cât și pierzătoare la mărimea aia.' },
        { name: 'Compară execuția, nu profitul, înainte să urci din nou', text: 'Verifică respectarea planului și pierderea medie în R la noua mărime față de referința ta. Dacă respectarea a scăzut sau pierderile depășesc planul, ți-ai găsit plafonul actual. Coboară un pas.' },
        { name: 'Coboară fără să tratezi asta ca pe un eșec', text: 'Întoarcerea la o mărime mai mică după o creștere eșuată e un experiment reușit, nu o înfrângere. Tranzacționează mărimea mai mică până când execuția redevine curată, apoi reîncearcă creșterea mai târziu, cu un pas mai mic.' },
      ]}
    >
      <Intro>
        Ai tranzacționat un cont de $10.000 timp de un an, cu risc de 1%. Adică $100 per trade. Execuția ta e chiar bună: iei setup-urile, lași stop-urile în pace, lași câștigătorii să ajungă la target. Apoi contul ajunge la $50.000 — prin profit, printr-un depozit, printr-un cont finanțat, nu contează. Aceeași strategie. Același 1%. Singurul lucru care s-a schimbat e suma pe care o reprezintă acel 1%: de la $100 la $500. În două săptămâni închizi câștigătorii la +0.4R, sari peste setup-uri care corespund exact criteriilor tale și găsești motive să muți stop-urile. Nimic din edge-ul tău nu s-a schimbat. Nimic din procentul tău de risc nu s-a schimbat. Tot ce ține de capacitatea ta de a executa s-a schimbat. Ai atins plafonul psihologic al mărimii poziției, și aproape nimeni nu te avertizează că există.
      </Intro>

      <StatsStrip items={[
        { value: 25, decimals: 0, suffix: '%', label: <>creșterea maximă de mărime<br />pe pas, când urci</> },
        { value: 30, decimals: 0, suffix: '+', label: <>trade-uri la o mărime nouă<br />înainte să crești din nou</> },
        { value: 2, decimals: 0, suffix: '×', label: <>oscilația absolută când dublezi mărimea<br />— deși procentul de risc rămâne identic</> },
      ]} />

      <H2>Matematica spune că nu s-a schimbat nimic</H2>
      <P>
        Riscul procentual există tocmai ca strategia să poată fi scalată fără să-i schimbi caracteristicile matematice. Riști 1% și strategia devine invariantă la scară: aceeași succesiune de trade-uri produce aceeași formă a curbei de capital fie că e un cont de $10.000 sau de $10.000.000. R-multiplii tăi rămân aceiași indiferent de mărimea contului. La fel și speranța matematică. La fel și win rate-ul.
      </P>
      <P>
        Din punct de vedere matematic totul e corect, și ăsta e motivul pentru care majoritatea traderilor nu planifică niciodată tranziția. Dacă matematica spune că nu s-a schimbat nimic, atunci orice dificultate trebuie să fie o problemă de disciplină, o problemă de mentalitate, o slăbiciune personală. Așa că traderul care se prăbușește la $500 per trade concluzionează că pur și simplu nu e destul de serios, se străduiește mai tare și eșuează din nou — fiindcă voința nu a fost niciodată constrângerea.
      </P>
      <P>
        Problema e că iei în calcul două tipuri de risc simultan, iar doar unul dintre ele e exprimat în procente.
      </P>

      <H2>De ce sistemul tău nervos nu e de acord</H2>
      <P>
        Cortexul tău prefrontal se ocupă de procent. Înțelege rapoarte, normalizează între mărimi de cont și concluzionează corect că 1% la $50.000 e aceeași expunere relativă ca 1% la $10.000. Partea rațională a creierului tău face calculul corect.
      </P>
      <P>
        Răspunsul tău la stres nu consultă procente. El reacționează la magnitudine — la ce înseamnă numărul în lumea în care chiar trăiești. $500 înseamnă cumpărăturile pe o săptămână, o factură la utilități, un bilet de avion spre casă. $100 nu înseamnă nimic din toate astea. Nicio cantitate de înțelegere a rapoartelor nu transformă una în cealaltă, fiindcă sistemul care reacționează la stres nu evaluează situația în procente.
      </P>
      <P>
        Există dovezi directe pentru asta, obținute într-o sală reală de tranzacționare, nu într-un laborator. În 2008, John Coates și Joe Herbert au publicat în <em>PNAS</em> un studiu care a măsurat hormoni steroizi la 17 traderi bărbați din City of London, de-a lungul a opt zile de tranzacționare. Una dintre descoperirile centrale: cortizolul unui trader creștea odată cu varianța propriilor rezultate și cu volatilitatea pieței. Cortizolul urmărea mărimea oscilațiilor pe care le trăia — nu procentul lor raportat la capital.
      </P>
      <P>
        Eșantionul e mic și e un singur studiu, deci nu trebuie supralicitat. Dar indică ceva ce orice trader care și-a crescut mărimea recunoaște imediat: reacția fiziologică devine mai puternică pe măsură ce cresc sumele implicate, iar când îți dublezi mărimea, dublezi acea magnitudine. Procentul tău de risc a rămas 1%, dar oscilațiile pe care corpul tău trebuie să le digere s-au dublat.
      </P>
      <P>
        Cortizolul și stresul pot influența procesele cognitive și comportamentale, iar când reacția de stres devine persistentă poate afecta felul în care evaluezi riscul și incertitudinea. Studiul nu demonstrează direct legătura cu un comportament anume, dar mecanismul e consistent cu ce descriu traderii: la o mărime mai mare, ținerea unui câștigător până la target devine mai greu de suportat.
      </P>

      <Callout title="Nu e un defect de caracter" color="#CE93D8">
        Un plafon de mărime nu e dovada că îți lipsește disciplina. E dovada că ești om, nu o mașină care calculează procente. Tratarea lui ca pe o slăbiciune morală e motivul pentru care majoritatea traderilor reacționează încercând să forțeze trecerea prin el — singura abordare care sigur nu funcționează.
      </Callout>

      <H2>Simptomele atingerii plafonului</H2>
      <P>
        Plafonul rareori se anunță ca frică. Vine deghizat în decizii care par perfect raționale, ceea ce îl face atât de greu de prins în timp real. Pattern-ul concret:
      </P>
      <Ul items={[
        'Iei profit devreme și numești asta „management al riscului". Contextul nu s-a schimbat; s-a schimbat suma în dolari de pe ecran.',
        'Sari peste setup-uri valide și ulterior nu poți articula ce le-a descalificat. Dacă criteriile sunt scrise și setup-ul le îndeplinea, decizia de a-l evita a venit din reacția emoțională, nu din criteriile analitice.',
        'Începi să urmărești pozițiile deschise tick cu tick, după luni în care puneai ordinele și plecai.',
        <>Muți stop-urile la breakeven mult mai devreme decât specifică planul — semnalul clasic, tratat în detaliu în <Link to="/blog/ro/breakeven-stop-too-early" className="text-kmf-accent hover:underline">de ce îți muți stop-ul la breakeven prea devreme</Link>.</>,
        'Pierderea ta medie depășește discret riscul planificat, fiindcă ieșirea la stop-ul real a devenit ceva ce negociezi.',
        'Simți ușurare când un trade se închide, indiferent de rezultat. Ușurarea la un câștig e cel mai clar semnal că mărimea îți depășește capacitatea actuală.',
      ]} />
      <P>
        Observă că niciunul dintre astea nu apare inițial ca o serie de pierderi. Ele apar ca un avantaj statistic care începe să se erodeze discret, în timp ce traderul crede că e prudent. De asta plafonul e diagnosticat de obicei cu luni întârziere, din datele jurnalului, în loc să fie recunoscut în ziua în care a fost depășit.
      </P>

      <H2>De ce o serie câștigătoare e cel mai prost moment să crești</H2>
      <P>
        Aproape toată lumea crește mărimea după o serie de câștiguri. Pare momentul responsabil — tocmai ai demonstrat competență, contul e la maxim, încrederea e la cote ridicate. Fiecare parte din asta e o capcană.
      </P>
      <P>
        O serie câștigătoare e punctul de suprapunere maximă între pricepere reală și varianță favorabilă, și nu le poți separa cât timp ești în mijlocul seriei. Deci crești mărimea pe baza unor dovezi care sunt parțial zgomot. Mai rău, o faci în momentul în care evaluarea ta a riscului e cel mai puțin calibrată, exact mecanismul descris în <Link to="/blog/ro/confidence-vs-overconfidence" className="text-kmf-accent hover:underline">încredere vs supraîncredere</Link>.
      </P>
      <P>
        Momentul corect pentru a crește mărimea e unul plictisitor. O perioadă mixtă — niște câștiguri, niște pierderi, nimic remarcabil — în care decizia e condusă de o regulă scrisă și de un eșantion de trade-uri, nu de cum s-au simțit ultimele două săptămâni. Dacă creșterea mărimii ți se pare palpitantă, senzația aia e informație, iar informația e: încă nu.
      </P>

      <Divider />

      <H2>Cum îți găsești plafonul real</H2>
      <P>
        Plafonul tău e un număr concret și îl poți localiza, dar numai dacă ai urmărit calitatea execuției, nu doar profitul. Auditul e simplu: grupează-ți trade-urile după suma în dolari riscată, apoi compară metricile de proces între grupe.
      </P>
      <P>
        Iată cum arată de obicei un astfel de audit. Cifrele de mai jos sunt ilustrative — ce contează e forma pattern-ului, nu valorile exacte:
      </P>

      <Table
        headers={['Risc per trade', 'Respectarea planului', 'Pierdere medie vs plan', 'Verdict']}
        rows={[
          ['$100', { value: '94%', color: 'green' }, { value: '−1.0R', color: 'green' }, { value: 'Confortabil — loc de creștere', color: 'green' }],
          ['$125', { value: '92%', color: 'green' }, { value: '−1.0R', color: 'green' }, { value: 'Curat — poți crește din nou', color: 'green' }],
          ['$250', { value: '88%', color: 'green' }, { value: '−1.1R', color: 'green' }, { value: 'Încă solid', color: 'green' }],
          ['$500', { value: '71%', color: 'gold' }, { value: '−1.4R', color: 'gold' }, { value: 'Plafonul se apropie', color: 'gold' }],
          ['$1.000', { value: '52%', color: 'red' }, { value: '−2.1R', color: 'red' }, { value: 'Mult peste plafonul tău', color: 'red' }],
        ]}
      />

      <P>
        Citește a treia coloană cu atenție, fiindcă ea e cea care costă bani. La $1.000 risc, traderul ăsta nu doar încalcă reguli — pierderile lui reale sunt de peste două ori mai mari decât riscul planificat. Riscul lui declarat e 1%, dar riscul efectiv e mult mai mare — în practică rulează cam 2% per trade și nu știe, fiindcă măsoară intenția în loc de rezultat.
      </P>
      <P>
        Ăsta e adevăratul pericol al tranzacționării peste plafon. Nu e că te simți inconfortabil. E că managementul riscului se degradează fără să fie evident în statisticile tale, în timp ce toate tabelele zic în continuare 1%.
      </P>

      <Callout title="De ce auditul ăsta are nevoie de jurnal" color="#4FC3F7">
        Comparația asta e imposibilă dintr-un extras de broker, care înregistrează doar P/L. Ai nevoie de respectarea planului și de riscul planificat vs real, notate per trade. K.M.F. Trading Journal le urmărește pe ambele alături de R-multipli, ca să poți filtra după mărimea poziției și să vezi exact la ce nivel de mărime începe să ți se degradeze execuția.
      </Callout>

      <H2>Regula de 25%: cum ridici plafonul</H2>
      <P>
        Plafonul nu e fix. Se mișcă odată cu expunerea — dar numai dacă creșterile sunt suficient de mici încât corpul și mintea să se adapteze treptat la noua expunere. Ăsta e același principiu din spatele oricărui protocol eficient de desensibilizare: creșterea trebuie să fie abia perceptibilă și trebuie ținută destul cât să devină banală.
      </P>

      <H3>Crește cu un sfert, nu cu un multiplu</H3>
      <P>
        De la $100 la $125, nu de la $100 la $200. Un pas de 25% e destul de mic încât diferența de miză resimțită să fie marginală, iar tocmai gradualitatea asta face metoda eficientă. Traderii resping metoda asta ca fiind prea lentă, apoi petrec doi ani eșuând repetat la $500 — ceea ce e considerabil mai lent.
      </P>

      <H3>Ține fiecare nivel pentru un eșantion complet</H3>
      <P>
        Minim 30 de trade-uri, ca noua mărime să fie trăită atât în secvențe câștigătoare, cât și pierzătoare. O mărime mai mare pare în regulă într-o săptămână bună. Ceea ce contează e cum execuți la acea mărime în timpul unei serii de patru pierderi, și nu poți ști până nu se întâmplă una.
      </P>

      <H3>Crește mărimea în funcție de execuție, nu de profit</H3>
      <P>
        Criteriul pentru a urca un pas e că respectarea planului s-a menținut și pierderea medie a rămas la riscul planificat. Profitul la noul nivel nu e dovadă — poți fi profitabil la o mărime care îți degradează execuția, iar combinația asta e cea mai periculoasă dintre toate, fiindcă finanțează obiceiul în timp ce îi ascunde costul.
      </P>

      <H3>Coboară fără ceremonie</H3>
      <P>
        Dacă respectarea planului scade, întoarce-te la ultima mărime curată. Nu e un eșec; e experimentul funcționând așa cum a fost gândit. Tranzacționează acolo până când execuția redevine plictisitoare, apoi reîncearcă cu un pas mai mic. Traderii care tratează un pas înapoi ca pe o umilință refuză să-l facă, apoi își distrug contul apărându-și orgoliul la o mărime pe care încă nu o pot duce.
      </P>

      <H2>Când să NU crești deloc</H2>
      <P>
        Trei cazuri în care nu crești deloc mărimea, indiferent cât de bine arată rezultatele recente:
      </P>
      <Ul items={[
        'Ești în drawdown. Creșterea mărimii ca să recuperezi mai repede e cel mai sigur mod de a transforma un drawdown normal într-unul serios.',
        'Edge-ul tău nu e încă stabilit pe un eșantion semnificativ. Dacă ai sub 100 de trade-uri de performanță validată, constrângerea nu e mărimea ta — e că încă nu știi ce ai.',
        'S-a schimbat ceva important în afara trading-ului. Somn, presiune financiară, stres familial, sănătate. Plafonul tău scade când nivelul general de stres crește, și scade fără să te anunțe.',
      ]} />
      <P>
        Al treilea e cel mai frecvent ratat. Un plafon nu e un atribut permanent al traderului; e o funcție a încărcăturii totale. Mărimea pe care ai dus-o confortabil trimestrul trecut poate fi peste plafonul tău în trimestrul acesta, din motive care n-au nicio legătură cu piețele.
      </P>

      <Callout title="Ce cedează primul sub presiunea mărimii?" color="#FFB300">
        Traderii diferiți cedează diferit la plafonul lor — unii taie câștigătorii, alții sar peste intrări, alții își gestionează excesiv pozițiile. <Link to="/tools/trader-personality-test" className="text-kmf-accent hover:underline">Testul gratuit de personalitate a traderului</Link> îți identifică bias-ul dominant în 16 întrebări, ca să știi ce simptom să urmărești pe măsură ce crești.
      </Callout>

      <Takeaways items={[
        'Procentul de risc rămâne același indiferent de mărimea contului. Reacția ta la suma în joc, însă, nu — de asta 1% la $500 per trade nu se simte deloc ca 1% la $100 per trade.',
        'Coates & Herbert (PNAS, 2008) au găsit că nivelul de cortizol al traderilor creștea odată cu varianța rezultatelor lor și cu volatilitatea pieței — urmărind mărimea oscilațiilor, nu procentul lor din capital. Când dublezi mărimea, dublezi și suma absolută pe care corpul și mintea trebuie s-o proceseze, chiar dacă procentul de risc rămâne identic.',
        'Plafonul nu vine ca frică. Vine ca prudență care sună rezonabil: iei profit devreme, sari peste setup-uri valide, muți stop-uri. Ușurarea când se închide un câștigător e cel mai clar semnal.',
        'Costul real nu e disconfortul. Peste plafon, pierderea ta medie depășește discret riscul planificat, așa că „riscul de 1%" devine ficțiune în timp ce tabelul tău zice în continuare 1%.',
        'Nu crește niciodată mărimea în timpul unei serii câștigătoare — ăsta e momentul în care priceperea și norocul sunt cel mai greu de separat. Crește într-o perioadă plictisitoare, mixtă, pe baza unei reguli scrise.',
        'Crește cu 25% pe pas, ține minim 30 de trade-uri per nivel și avansează pe respectarea planului, nu pe profit. Faptul că ești profitabil la o mărime care îți degradează execuția e cea mai periculoasă combinație posibilă.',
        'Un pas înapoi e un experiment reușit, nu o înfrângere. Plafonul tău nu e fix — crește cu expunere graduală și scade când încărcătura din viața ta crește.',
      ]} />
    </BlogArticleLayout>
  );
}
