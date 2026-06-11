import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ConsecutiveLossImpact } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function RevengeTradingKillSwitchRo() {
  return (
    <BlogArticleLayout
      slug="revenge-trading-kill-switch"
      lang="ro"
      title="Kill Switch-ul pentru Revenge Trading: Un Protocol pentru Care Eul Tău Viitor Îți Va Mulțumi"
      metaTitle="Kill Switch pentru Revenge Trading: Protocolul în 5 Reguli Care Oprește Spirala | K.M.F."
      metaDescription="Un protocol concret, pre-programat pentru a opri revenge trading-ul înainte să înceapă. Bazat pe cercetarea despre cortizol, cu reguli automate pe care le setezi când ești calm și le urmezi când ești pe tilt."
      date="22 martie 2026"
      dateISO="2026-03-22"
      readTime="10 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
        { slug: 'tilt-recovery-protocol', title: 'Tilt Recovery Protocol: What Top Traders Do After a Big Loss', category: 'Psychology' },
        { slug: 'overtrading-checklist', title: 'Overtrading Checklist: 8 Signs You\'re Tilting Without Realizing It', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'Ce este un kill switch pentru revenge trading?', answer: 'Un kill switch e un set de reguli pre-programate care îți opresc automat sesiunea de trading când sunt îndeplinite condiții specifice — ca 2 pierderi consecutive sau atingerea unei limite de P/L zilnic. Scrii regulile când ești calm, și le urmezi mecanic când ești emoțional.' },
        { question: 'Cum afectează cortizolul deciziile de trading?', answer: 'După o pierdere, cortizolul (hormonul de stres) crește brusc și are nevoie de 3-4 ore ca să revină la normal. În această perioadă, evaluarea riscului e afectată, recunoașterea pattern-urilor se deteriorează, iar creierul prioritizează acțiunea imediată în detrimentul analizei atente. De-asta „încă un trade" după pierderi aproape mereu eșuează.' },
        { question: 'Câte pierderi consecutive înainte să mă opresc din tranzacționat?', answer: 'Cercetarea și consensul traderilor profesioniști sugerează oprirea după 2 pierderi consecutive. La a treia pierdere, nivelurile tale de cortizol sunt destul de ridicate cât să-ți afecteze măsurabil luarea deciziilor. Numărul specific contează mai puțin decât a avea o regulă și a o urma consistent.' },
        { question: 'Poate un trading journal să ajute la prevenirea revenge trading-ului?', answer: 'Da — dar doar dacă are funcțiile potrivite. Caută tracking emoțional (pre-trade și post-trade), detecție de tilt care te avertizează când pattern-ul tău arată ca revenge trading, și un pre-trade checklist care forțează o pauză între impuls și trade.' },
      ]}
      howToSteps={[
        { name: 'Scrie regulile kill switch-ului când ești calm', text: 'Într-o duminică, scrie exact ce îți va declanșa oprirea tranzacționării: 2 pierderi consecutive, pierdere zilnică de 2%, sau o stare emoțională specifică. Fii specific.' },
        { name: 'Printează-le și lipește-le pe monitor', text: 'Regulile trebuie să fie vizibile fizic. Când ești pe tilt, nu vei deschide un document ca să le verifici. Trebuie să-ți fie în față.' },
        { name: 'Setează alerte pe platformă', text: 'Folosește alertele de pierdere zilnică ale platformei tale. Setează-le la 60% din toleranța ta maximă. Alerta nu e limita ta — e avertismentul tău.' },
        { name: 'Loghează-ți starea emoțională înainte de fiecare trade', text: 'Punctează-te 1-5 înainte să apeși. Dacă obții 3 sau mai puțin, trade-ul nu se întâmplă. Fără excepții.' },
        { name: 'Exersează protocolul întâi pe zile mici', text: 'Urmează kill switch-ul într-o zi când miza e mică. Asta construiește memoria musculară ca să se activeze automat când miza e mare.' },
      ]}
    >
      <Intro>
        Știi ce e revenge trading-ul. Ai citit despre el. Probabil ai dat din cap aprobator la un articol care explica loss aversion și ego și recency bias. Ai înțeles fiecare cuvânt. Și apoi joi la 11:37, după două stop-out-uri la rând, ai intrat într-un al treilea trade care nu era în planul tău, cu un position size care nu era în regulile tale, pe o pereche pe care nu o analizaseși — și ai pierdut din nou. A ști ce e revenge trading-ul nu îl oprește. A avea un protocol o face.
      </Intro>

      <P>
        Acest articol e diferit de <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">prezentarea noastră a psihologiei revenge trading-ului</Link> și de <Link to="/blog/tilt-recovery-protocol" className="text-kmf-accent hover:underline">protocolul nostru de recuperare din tilt</Link>. Acelea explică de ce-ul. Ăsta e cum-ul — un set concret, pre-programat de reguli pe care le construiești când ești calm și rațional, și apoi le urmezi mecanic când nu ești. Gândește-te la el ca la o procedură de urgență. Piloții nu își dau seama ce să facă în timpul unui incendiu de motor în timp real. Urmează un checklist scris de oameni care nu erau în panică în acel moment.
      </P>

      <StatsStrip items={[
        { value: 4, decimals: 0, suffix: 'h', label: <>timpul de eliminare a cortizolului<br />după o pierdere stresantă</> },
        { value: 2, decimals: 0, label: <>pierderi consecutive înainte<br />ca kill switch-ul să se declanșeze</> },
        { value: 60, decimals: 0, suffix: '%', label: <>din calitatea deciziilor de bază<br />după a doua pierdere</> },
      ]} />

      <Divider />

      <H2>De Ce „Pur și Simplu Nu O Face" Nu Funcționează</H2>
      <P>
        Fiecare carte de trading spune o variantă a lui „nu face revenge trading". Sfat grozav. Inutil în practică. Iată de ce:
      </P>

      <H3>Creierul Tău pe Cortizol</H3>
      <P>
        Când iei o pierdere, corpul tău eliberează cortizol — hormonul de stres. Asta nu e o metaforă. E biochimie măsurabilă. Cortizolul face trei lucruri care sunt catastrofale pentru trading:
      </P>
      <Ul items={[
        'Îți îngustează atenția. În loc să scanezi toată piața, te fixezi pe instrumentul și timeframe-ul unde tocmai ai pierdut. Vezi „setup-uri" peste tot fiindcă creierul tău caută răscumpărare, nu oportunitate.',
        'Îți afectează evaluarea riscului. Cortexul prefrontal — partea din creier responsabilă de cântărirea consecințelor — e suprimată. Literalmente nu poți evalua riscul corect. Trade-ul care „pare o idee bună" chiar acum ți-ar părea o nebunie într-o duminică după-amiaza.',
        'Îți crește urgența. Cortizolul declanșează un răspuns fight-or-flight. În trading, „fight" înseamnă „ia imediat alt trade". Corpul tău vrea acțiune — a sta locului se simte fizic inconfortabil. Mâncărimea de a apăsa nu e slăbiciune. E biochimie.',
      ]} />
      <P>
        Iată partea care contează cel mai mult: cortizolul are nevoie de 3 până la 4 ore ca să revină la nivelurile de bază după un eveniment stresant. Nu minute. Ore. Ceea ce înseamnă că abordarea „am nevoie doar de 10 minute să mă calmez" e biochimic inadecvată. S-ar putea să te simți mai calm după 10 minute, dar cortizolul tău e încă ridicat, iar evaluarea riscului tău e încă afectată.
      </P>

      <H3>Dopamina Înrăutățește Lucrurile</H3>
      <P>
        Între timp, sistemul tău de dopamină — cel care conduce comportamentul de căutare a recompensei — intervine cu o întorsătură crudă. După o pierdere, creierul tău tânjește după shot-ul de dopamină al unui trade câștigător. Nu banii. Senzația. Ușurarea. Ăsta e același mecanism care conduce gambling-ul problematic: nu e despre câștig, e despre urmărirea recompensei neurochimice.
      </P>
      <P>
        Deci ai cortizolul spunând „acționează acum, gândește mai târziu" și dopamina spunând „următorul trade ar putea fi cel care le face pe toate bune". Împotriva acestor două forțe neurochimice, „pur și simplu nu o face" e ca a-i spune cuiva cu piciorul rupt să „meargă normal".
      </P>

      <ConsecutiveLossImpact />

      <Callout title="Adevărul Incomod" color="#CE93D8">
        Nu ești slab fiindcă faci revenge trading. Ești om. Dar a fi om nu e o scuză — e motivul pentru care ai nevoie de un sistem care funcționează în ciuda faptului că ești om.
      </Callout>

      <Divider />

      <H2>Protocolul Kill Switch</H2>
      <P>
        Un kill switch nu e o sugestie. E un pre-angajament — un set de reguli pe care le scrii când cortizolul tău e la nivelul de bază (duminică seara, după o plimbare, cu o cafea, într-o dispoziție bună) și apoi le urmezi mecanic când nu e. Regulile sunt nenegociabile. Nu evaluezi dacă se aplică „în această situație". Se aplică mereu. Ăsta e ideea.
      </P>

      <H3>Regula 1: Două Pierderi Consecutive = Sesiunea S-a Terminat</H3>
      <P>
        Nu trei. Nu „două pe aceeași pereche". Două pierderi la rând, pe orice, și ai terminat pentru sesiune. Închide platforma. Nu o minimiza. Închide-o.
      </P>
      <P>
        De ce două? Fiindcă după o pierdere, cei mai mulți traderi sunt încă rezonabil de raționali. Vârful de cortizol e gestionabil. După două, intervine efectul de compunere — a doua pierdere se simte semnificativ mai rău decât prima, chiar dacă e aceeași sumă în dolari. Până iei în calcul un al treilea trade, calitatea deciziilor tale a scăzut la aproximativ 60% din nivelul de bază. Asta nu e destul de bine pentru un job unde edge-urile marginale determină totul.
      </P>
      <P>
        „Dar dacă al treilea setup e cel mai bun din zi?" Poate că e. Nu vei ști niciodată. Și ăsta e ideea — nu poți avea încredere în evaluarea ta chiar acum. Setup-ul care arată perfect la 11 dimineața după două pierderi e același setup pe lângă care ai trece la 9:30 cu mintea limpede. Recunoașterea ta de pattern-uri e compromisă. Acceptă asta.
      </P>

      <H3>Regula 2: Limita de Pierdere Zilnică = 2% din Cont</H3>
      <P>
        Dacă pierderile tale combinate pe zi ajung la 2% din soldul contului, ziua s-a terminat. Asta include trade-urile deschise. Niciun „hai să văd doar dacă ăsta își revine".
      </P>
      <P>
        De ce 2%? Fiindcă două trade-uri la 1% risc fiecare sunt exact 2%. Dacă amândouă pierd, ți-ai atins limita zilnică înainte ca ciclul de revenge să înceapă măcar. Pe un <Link to="/blog/prop-firm-daily-drawdown-guide" className="text-kmf-accent hover:underline">cont de prop firm cu o regulă de drawdown zilnic de 5%</Link>, 2% îți dă un buffer de siguranță masiv. Pe un cont personal, 2% înseamnă că până și cinci zile proaste consecutive te costă doar 10%.
      </P>

      <H3>Regula 3: Perioadă Obligatorie de Răcire de 4 Ore</H3>
      <P>
        După ce atingi fie Regula 1, fie Regula 2, timpul minim înainte să poți tranzacționa din nou e de 4 ore. Nu 30 de minute. Nu „până mă simt mai bine". Patru ore. Asta nu e arbitrar — e aproximativ cât îi ia cortizolului să revină la nivelul de bază după un eveniment stresant.
      </P>
      <P>
        În timpul acelor 4 ore:
      </P>
      <Ul items={[
        'Închide complet platforma de trading.',
        'Nu verifica chart-uri pe telefon.',
        'Fă ceva fizic — plimbă-te, sală, gătit, curățenie. Activitatea fizică accelerează eliminarea cortizolului.',
        'Nu „cerceta" trade-uri pentru mâine. Creierul tău va găsi o cale să te convingă că e cercetare și nu revenge.',
      ]} />

      <H3>Regula 4: Reintrarea Cere un Plan Scris</H3>
      <P>
        După perioada de răcire de 4 ore, poți lua în calcul să tranzacționezi din nou — dar doar dacă scrii întâi un plan complet de trade. Nu în cap. Pe hârtie sau în jurnal. Planul trebuie să includă:
      </P>
      <Ul items={[
        'Criterii de setup specifice îndeplinite (cu dovezi)',
        'Prețul exact de intrare',
        'Prețul exact de stop loss și motivul structural pentru care e acolo',
        'Position size calculat din calculatorul de risc',
        'Raport risk:reward — minimum 1:2',
        'Un răspuns cinstit la: „Aș lua acest trade dacă aș avea zero pierderi azi?"',
      ]} />
      <P>
        Dacă nu poți completa toate cele șase puncte, nu tranzacționezi. Scrisul nu e muncă de umplutură — forțează cortexul tău prefrontal să se angajeze. Dacă trade-ul tot arată bine după ce ai scris toate astea, ar putea fi de fapt o oportunitate validă. Dacă nu te poți obosi să completezi planul, asta îți spune ceva important despre motivația ta.
      </P>

      <H3>Regula 5: Jumătate de Mărime pe Trade-ul de Revenire</H3>
      <P>
        Dacă treci de Regula 4 și decizi să tranzacționezi din nou după o sesiune pe pierdere, position size-ul tău e 50% din normal. Nenegociabil. Asta realizează două lucruri: îți limitează dauna dacă trade-ul de revenire pierde și el, și reduce intensitatea emoțională ca să poți executa de fapt corect.
      </P>
      <P>
        După un trade câștigător la jumătate de mărime, poți reveni la mărime completă. Gândește-te la el ca la o încălzire — n-ai sprinta imediat după ce ai stat pe canapea 4 ore.
      </P>

      <Divider />

      <H2>Cum Faci Kill Switch-ul Automat</H2>
      <P>
        Cea mai mare provocare cu orice sistem bazat pe reguli e să-l urmezi în momentul în care tot ce e în corpul tău țipă să-l încalci. Iată cum să faci conformitatea mai ușoară:
      </P>

      <H3>Bariere Fizice</H3>
      <Ul items={[
        'Printează regulile kill switch-ului și lipește-le în partea de jos a monitorului. Le vei vedea de fiecare dată când te uiți la un chart.',
        'Setează o alertă de pierdere zilnică pe platforma ta de trading la limita ta de 2%.',
        'Spune-i partenerului de trading, soțului/soției, sau prietenului de responsabilizare regulile tale. Faptul că știi că altcineva știe face mai greu să trișezi.',
      ]} />

      <H3>Urmărește-ți Conformitatea</H3>
      <P>
        În jurnalul tău de trading, adaugă un câmp pentru fiecare sesiune: „Am urmat kill switch-ul azi? Da / Nu / Nedeclanșat."
      </P>
      <P>
        K.M.F. Trading Journal are un sistem de detecție de tilt încorporat care îți monitorizează pattern-urile de tranzacționare — pierderi consecutive, position size-uri în creștere, log-uri de emoție negativă — și marchează când comportamentul tău se potrivește cu pattern-urile de revenge trading. Afișează o avertizare pe 4 niveluri (de la „Ai grijă" la „Oprește-te din tranzacționat acum") pe baza datelor tale reale, nu a auto-evaluării tale. Fiindcă toată problema cu revenge trading-ul e că nu-ți dai seama că o faci până e prea târziu. Un sistem care veghează pentru tine e mai sigur decât o promisiune făcută ție însuți.
      </P>
      <P>
        Aplicația îți loghează și <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">starea emoțională pre-trade</Link> — Calm, Încrezător, Anxios, Frustrat, Speriat, Entuziasmat — înainte și după fiecare trade. După o lună, poți vedea exact ce stări emoționale se corelează cu cele mai proaste trade-uri ale tale. Cei mai mulți traderi descoperă că emoțiile pre-trade „Frustrat" sau „Anxios" au un win rate cu 15-25% mai mic decât intrările „Calm". Aia nu e o senzație. Aia e dată. Iar datele sunt mai greu de contrazis decât intențiile.
      </P>

      <Divider />

      <H2>Despre Ce Este de Fapt Kill Switch-ul</H2>
      <P>
        Kill switch-ul nu e despre evitarea pierderilor. Pierderile sunt parte din trading. Vei avea zile pe pierdere, săptămâni pe pierdere, și luni pe pierdere — chiar și cu o strategie profitabilă. Kill switch-ul e despre prevenirea pierderii catastrofale. Cea care transformă o zi de -2% într-una de -8%. Cea care aruncă în aer un cont de prop firm. Cea care îți ia două luni să-ți revii psihologic fiindcă știi — știi — că ți-ai făcut-o singur.
      </P>
      <P>
        Fiecare trader profesionist are o variantă a acestui protocol. Nu toți îl numesc „kill switch". Unii îi spun „regula mea de a pleca". Unii îi spun „întrerupătorul". Un trader pe care îl cunosc îi spune „protocolul canapelei" fiindcă atunci când atinge două pierderi, literalmente se duce și stă pe canapea 4 ore. E funded de trei ani.
      </P>
      <P>
        Numele nu contează. A avea regulile — și a le urma — e totul.
      </P>

      <Takeaways items={[
        'A ști despre revenge trading nu îl previne. Cortizolul și dopamina anulează cunoștința. Ai nevoie de un protocol pre-programat, nu de voință.',
        'Două pierderi consecutive = sesiunea s-a terminat. Calitatea deciziilor tale scade la ~60% după două pierderi. „Setup-ul grozav" pe care îl vezi e creierul tău compromis căutând răscumpărare.',
        'Limita de pierdere zilnică de 2% încheie ziua. Două trade-uri la 1% risc e maximul tău înainte ca ciclul de revenge să poată începe.',
        'Perioada de răcire de 4 ore e biochimie, nu arbitrară. Cortizolul are nevoie de 3-4 ore ca să revină la nivelul de bază. A te simți mai bine după 10 minute e o iluzie.',
        'Reintrarea cere un plan scris cu 6 puncte specifice. Dacă nu îl poți scrie, motivația ta e emoțională, nu analitică.',
        'Urmărește-ți conformitatea cu kill switch-ul în jurnal. Traderii care urmează protocolul consistent sunt cei care încă tranzacționează peste un an.',
      ]} />
    </BlogArticleLayout>
  );
}
