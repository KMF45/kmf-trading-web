import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WeeklyTradingReviewTemplateRo() {
  return (
    <BlogArticleLayout
      slug="weekly-trading-review-template"
      lang="ro"
      title="Cum Faci un Review Săptămânal de Trading (Cu un Template Complet)"
      metaTitle="Review Săptămânal de Trading: Rutina de 15 Minute Care Îți Înmulțește Progresul | K.M.F."
      metaDescription="Un ghid pas cu pas pentru a face un review săptămânal de trading corect. Include un template complet cu întrebări pentru a-ți evalua performanța, disciplina și strategia."
      date="16 ianuarie 2026"
      dateISO="2026-01-16"
      dateModified="2026-03-22"
      readTime="8 min citire"
      category="Progres"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: '10-questions-after-every-trade', title: '10 Questions Every Trader Should Ask After Every Trade', category: 'Improvement' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Cum fac un review săptămânal de trading?', answer: 'Revizuiește 5 zone în fiecare weekend: calitatea execuției trade-urilor, respectarea risk management-ului, pattern-urile emoționale, condițiile de piață și performanța strategiei. Folosește un template structurat cu întrebări specifice pentru fiecare zonă.' },
        { question: 'Cât ar trebui să dureze un review săptămânal?', answer: '15-30 de minute sunt de ajuns dacă îți jurnalizezi trade-urile zilnic. Review-ul săptămânal e despre pattern-uri și tendințe, nu despre re-analizarea trade-urilor individuale. Concentrează-te pe ce s-a schimbat săptămâna asta față de săptămâna trecută.' },
        { question: 'Ce întrebări ar trebui să-mi pun într-un review săptămânal?', answer: 'Întrebări cheie: Mi-am urmat regulile? Care a fost cea mai mare greșeală? Care a fost trade-ul cel mai bine executat? Au afectat emoțiile vreo decizie? Care e un lucru pe care îl voi îmbunătăți săptămâna viitoare?' },
      ]}
      howToSteps={[
        { name: 'Revizuiește-ți statisticile', text: 'Începe cu cifrele brute: total trade-uri, win rate, profit factor, R-multiple mediu. Compară cu săptămâna trecută și cu baseline-ul tău.' },
        { name: 'Evaluează calitatea execuției', text: 'Revizuiește fiecare trade pentru respectarea planului. Ți-ai urmat criteriile de intrare, plasarea stop-ului și regulile de ieșire? Punctează fiecare trade.' },
        { name: 'Analizează pattern-urile emoționale', text: 'Identifică ce emoții ți-au influențat deciziile. Caută pattern-uri: trade-uri de revenge după pierderi, supraîncredere după câștiguri.' },
        { name: 'Evaluează risk management-ul', text: 'Verifică dacă ai respectat regulile de position sizing, limitele de pierdere zilnică maximă și expunerea la corelație pe toate trade-urile.' },
        { name: 'Setează un singur obiectiv de îmbunătățire', text: 'Alege exact o singură îmbunătățire specifică, măsurabilă, pentru săptămâna viitoare. Scrie-o și pune-o unde o vei vedea înainte să tranzacționezi.' },
      ]}
    >
      <Intro>
        Diferența dintre traderii care se îmbunătățesc și traderii care repetă aceleași greșeli lună după lună e aproape mereu aceeași: un grup își revizuiește performanța sistematic, iar celălalt nu. Un review săptămânal de trading nu e opțional pentru o dezvoltare serioasă. E mecanismul prin care pattern-urile devin vizibile, greșelile devin lecții, iar lecțiile devin obiceiuri.
      </Intro>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>zone de review: stats, disciplină,<br />proces, psihologie, obiective</> },
        { value: 1, decimals: 0, label: <>focus de îmbunătățire pe săptămână —<br />se acumulează la 50 pe an</> },
        { value: 30, decimals: 0, suffix: ' min', label: <>fereastra review-ului săptămânal —<br />destul pentru pattern-uri, nu zgomot</> },
      ]} />

      <H2>De Ce Săptămânal — Nu Zilnic</H2>
      <P>
        Review-urile zilnice sunt utile pentru a jurnaliza trade-urile cât detaliile sunt proaspete — răspunzând la <Link to="/blog/10-questions-after-every-trade" className="text-kmf-accent hover:underline">întrebările de review post-trade</Link> — dar sunt prea aproape de acțiune pentru recunoașterea pattern-urilor. Într-o zi anume, poate ai avut două trade-uri. Nu sunt destule date cât să observi că supratranzacționezi constant marțea, sau că setup-urile tale de luni dimineața au o rată de pierdere semnificativ mai mare.
      </P>
      <P>
        Review-urile săptămânale oferă rezoluția potrivită. Ai destule trade-uri cât să prinzi pattern-uri pe termen scurt, a trecut destul timp cât să revizuiești deciziile cu distanță emoțională, iar cadența e destul de frecventă cât să-ți poți chiar schimba comportamentul ca răspuns la ce găsești.
      </P>
      <Callout title="Recomandare de Timing" color="#FFB300">
        Sâmbătă dimineața e momentul ideal pentru majoritatea traderilor. Piețele sunt închise, săptămâna e proaspătă în memorie, și ai destulă distanță față de sesiunea de vineri cât să revizuiești obiectiv. Blochează 30–45 de minute și tratează asta ca pe o întâlnire nenegociabilă.
      </Callout>

      <Divider />

      <H2>Cele 5 Zone de Revizuit în Fiecare Săptămână</H2>

      <H3>1. Review-ul Statisticilor</H3>
      <P>
        Începe cu cifrele. Înainte de orice analiză calitativă, uită-te la datele brute din săptămână. Asta îți ancorează review-ul în fapte, nu în impresii, care sunt adesea distorsionate de recency bias (cel mai recent trade tinde să-ți coloreze percepția asupra întregii săptămâni).
      </P>
      <Ul items={[
        'Câte trade-uri am luat săptămâna asta?',
        'Care au fost win rate-ul, câștigul mediu, pierderea medie și profit factor-ul?',
        'Care au fost cele mai bune și cele mai proaste trade-uri ale mele, și ce le-a făcut diferite?',
      ]} />

      <H3>2. Review-ul Disciplinei</H3>
      <P>
        Disciplina e măsurabilă. Pentru fiecare trade din această săptămână, întreabă-te dacă ți-ai urmat regulile exact. Nu aproximativ. Exact. Asta creează o „rată de respectare a regulilor" care e una dintre cele mai utile metrici pe care un trader în formare le poate urmări.
      </P>
      <Ul items={[
        'Ce procent din trade-urile mele au urmat criteriile de intrare fără abatere?',
        'Am respectat toate stop loss-urile, sau am mutat vreunul împotriva trade-ului?',
        'Câte trade-uri au fost trade-uri de impuls în afara setup-urilor mele definite?',
      ]} />

      <H3>3. Review-ul Procesului</H3>
      <P>
        Separă calitatea procesului de calitatea rezultatului. Un trade care ți-a urmat regulile perfect dar a pierdut bani e un trade mai bun decât unul care ți-a încălcat regulile dar a făcut bani — înțelegerea diferenței dintre <Link to="/blog/good-loss-vs-bad-win" className="text-kmf-accent hover:underline">pierderi bune și câștiguri proaste</Link> e esențială pentru asta. Review-ul de proces te antrenează să te evaluezi pe ce poți controla cu adevărat.
      </P>
      <Ul items={[
        'S-au potrivit intrările mele cu criteriile setup-ului pe timeframe, structură și confirmare?',
        'Au fost stop loss-urile plasate la niveluri logice, sau au fost arbitrare?',
        'Am gestionat trade-urile deschise conform planului, sau am intervenit prematur?',
      ]} />

      <H3>4. Review-ul Psihologic</H3>
      <P>
        Emoția lasă amprente pe datele tale de trading. Pierderi mai mari decât normalul, trade-uri neobișnuit de frecvente, position size-uri care se abat de la regulile tale — astea au adesea o cauză emoțională. Această secțiune face vizibil ce e invizibil.
      </P>
      <Ul items={[
        'În ce zile au afectat emoțiile cel mai mult deciziile mele, și ce le-a declanșat?',
        'Au fost momente de revenge trading, intrări de FOMO, sau ieșiri premature conduse de frică?',
        'Care a fost nivelul meu general de stres săptămâna asta, și cum s-a corelat cu performanța mea?',
      ]} />

      <H3>5. Review-ul Obiectivelor</H3>
      <P>
        O sesiune de trading fără un obiectiv e doar timp petrecut în fața chart-urilor. Obiectivele dau săptămânii structură și dau review-ului ceva concret de evaluat. Ar trebui să fie concentrate pe proces, nu pe rezultat — „urmează-mi checklist-ul la fiecare trade" e un obiectiv util; „fă $500 săptămâna asta" nu e, fiindcă nu e în controlul tău direct.
      </P>
      <Ul items={[
        'Mi-am atins obiectivele de proces pe care le-am setat la începutul acestei săptămâni?',
        'Pe ce lucru specific mă voi concentra să-l îmbunătățesc săptămâna viitoare?',
        'Care e un lucru pe care l-am făcut bine săptămâna asta și pe care vreau să-l întăresc?',
      ]} />

      <Divider />

      <H2>Template-ul Complet de Review Săptămânal</H2>
      <P>
        Folosește aceste 15 întrebări ca pe cadrul tău de review. Nu trebuie să scrii un roman pentru fiecare — o propoziție sau două sunt de ajuns. Scopul e reflecție structurată, nu jurnalizare de dragul ei.
      </P>
      <Table
        headers={['Zonă', 'Întrebare']}
        rows={[
          ['Statistici', 'Total trade-uri, câștiguri, pierderi, P/L net pe săptămână?'],
          ['Statistici', 'Care au fost profit factor-ul și R-multiple-ul mediu săptămâna asta?'],
          ['Statistici', 'Care a fost cel mai bun trade al meu, și de ce a funcționat?'],
          ['Disciplină', 'Ce procent din trade-uri au urmat criteriile mele de intrare exact?'],
          ['Disciplină', 'Am respectat fiecare stop loss? Dacă nu, care trade-uri și de ce?'],
          ['Disciplină', 'Câte trade-uri au fost în afara setup-urilor mele definite?'],
          ['Proces', 'Au fost intrările mele bine cronometrate față de criteriile setup-ului?'],
          ['Proces', 'Au fost stop loss-urile plasate la niveluri structurale sau au fost arbitrare?'],
          ['Proces', 'Am ieșit conform planului, sau emoția a condus ieșiri premature sau întârziate?'],
          ['Psihologie', 'Care sesiune sau zi a fost cel mai afectată de emoție?'],
          ['Psihologie', 'Am făcut revenge trade, am intrat din FOMO, sau am ieșit prea devreme din frică săptămâna asta?'],
          ['Psihologie', 'Cum mi-a afectat viața din afara trading-ului (somn, stres) performanța?'],
          ['Obiective', 'Mi-am atins obiectivul de proces din review-ul de săptămâna trecută?'],
          ['Obiective', 'Care e SINGURUL lucru pe care mă voi concentra să-l îmbunătățesc săptămâna viitoare?'],
          ['Obiective', 'Care e un lucru pe care l-am făcut bine săptămâna asta și pe care vreau să-l repet conștient?'],
        ]}
      />

      <H2>Cum Acționezi pe Baza Review-ului Tău</H2>
      <P>
        Cea mai comună greșeală pe care o fac traderii cu review-urile e să identifice cinci probleme și să încerce să le repare pe toate simultan. Nu așa funcționează dezvoltarea abilităților. Alege o singură problemă — cea mai cu impact — și concentrează-te complet pe ea în săptămâna următoare. Scrie-o în capul planului tău de trading. Revizuiește-o înainte de fiecare sesiune. La sfârșitul săptămânii următoare, evaluează dacă te-ai îmbunătățit la acea singură metrică.
      </P>
      <P>
        Să repari un lucru important pe săptămână înseamnă să repari 50 de lucruri pe an. Îmbunătățirea cumulată în acel ritm transformă traderii.
      </P>

      <H2>Cât Ar Trebui Să Dureze?</H2>
      <P>
        Treizeci până la patruzeci și cinci de minute e intervalul potrivit. Mai puțin de 30 de minute sugerează că te miști prea repede și ești superficial. Mai mult de 45 de minute înseamnă de obicei că supraanalizezi trade-uri individuale în loc să cauți pattern-uri pe parcursul săptămânii. Scopul nu e să reexaminezi fiecare tick de pe fiecare chart — e să extragi cele trei sau patru insight-uri cheie care vor face săptămâna viitoare mai bună.
      </P>

      <Takeaways items={[
        'Review-urile săptămânale sunt mecanismul principal prin care traderii chiar se îmbunătățesc — nu timpul petrecut în fața ecranului de unul singur.',
        'Revizuiește cinci zone în fiecare săptămână: Statistici, Disciplină, Proces, Psihologie și Obiective.',
        'Măsoară-ți rata de respectare a regulilor — ce procent din trade-uri au urmat planul exact.',
        'Separă calitatea procesului de calitatea rezultatului. O pierdere perfectă e mai valoroasă decât un câștig norocos.',
        'Alege UN lucru de îmbunătățit în fiecare săptămână. Iterația concentrată se acumulează rapid pe parcursul unui an.',
        '30–45 de minute sâmbătă dimineața e timing-ul optim pentru majoritatea traderilor retail.',
      ]} />
    </BlogArticleLayout>
  );
}
