import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ScalingOutEquityCurve } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function ScalingInVsScalingOutRo() {
  return (
    <BlogArticleLayout
      slug="scaling-in-vs-scaling-out"
      lang="ro"
      title="Scaling In vs Scaling Out: Care Metodă Distruge Mai Puține Conturi?"
      metaTitle="Scaling In vs Scaling Out: De Ce Se Simte Mai Bine Dar E Matematic Mai Rău | K.M.F."
      metaDescription="De ce scaling out se simte mai bine dar e matematic mai rău pentru majoritatea traderilor. Matematica ascunsă a adăugării la poziții, luării de profituri parțiale, și ce funcționează de fapt."
      date="15 martie 2026"
      dateISO="2026-03-15"
      dateModified="2026-03-22"
      readTime="8 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: Why Measuring Trades in Dollars Is a Mistake', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Care e diferența dintre scaling in și scaling out?', answer: 'Scaling in înseamnă să adaugi la poziție după intrarea inițială — fie adăugând la câștigători pe măsură ce se mișcă în favoarea ta, fie adăugând la pierzători ca să-ți îmbunătățești prețul mediu. Scaling out înseamnă să-ți închizi poziția în părți, luând profituri parțiale la niveluri diferite în loc să ieși tot deodată.' },
        { question: 'E vreodată o idee bună să faci scaling in pe un trade pe pierdere?', answer: 'Aproape niciodată pentru traderii retail. Scaling in pe pierzători (averaging down) e una dintre cele mai comune cauze ale conturilor distruse. Îți crește expunerea la un trade care îți dovedește deja că greșești. Traderii profesioniști care fac asta au reguli stricte și mult mai mult capital ca să absoarbă riscul.' },
        { question: 'Ar trebui ca începătorii să folosească scaling in sau scaling out?', answer: 'Niciuna. Începătorii ar trebui să folosească position sizing fix — intrare completă, ieșire completă — până au cel puțin 100 de trade-uri de date care confirmă că strategia lor funcționează. Adăugarea de complexitate la managementul poziției înainte ca fundația să fie solidă introduce erori imposibil de diagnosticat.' },
      ]}
    >
      <Intro>
        Majoritatea educației de trading se concentrează pe intrări și ieșiri ca evenimente binare: ești înăuntru sau ești afară. Dar în practică, mulți traderi își gestionează pozițiile în bucăți — adăugând la o poziție pe măsură ce se dezvoltă (scaling in) sau luând profituri parțiale pe parcurs (scaling out). Ambele metode îți schimbă profilul de risc în moduri care nu sunt imediat evidente, iar greșirea matematicii poate transforma o strategie câștigătoare într-una pe pierdere.
      </Intro>

      <StatsStrip items={[
        { value: 67, decimals: 0, suffix: '%', label: <>expectancy pierdut când<br />faci scaling out pe o strategie 3:1</> },
        { value: 100, decimals: 0, suffix: '+', label: <>trade-uri minimum înainte<br />de a adăuga complexitate de poziție</> },
        { value: 1, decimals: 0, suffix: '%', label: <>plafon de risc cumulat<br />pe toate scale-in-urile</> },
      ]} />

      <H2>Scaling In: Adăugarea la Poziția Ta</H2>
      <P>
        Scaling in înseamnă să intri într-o poziție în mai multe etape în loc de tot deodată. Există două versiuni fundamental diferite ale acestui lucru, iar confundarea lor e unde se distrug conturile.
      </P>
      <H3>Scaling In pe Câștigători</H3>
      <P>
        Asta înseamnă să adaugi la o poziție care se mișcă deja în favoarea ta. Intri cu o poziție parțială, aștepți ca piața să-ți confirme teza, și apoi adaugi mai mult. Avantajul e că angajezi capital complet doar după ce primești confirmare. Dezavantajul e că prețul tău mediu de intrare se înrăutățește cu fiecare adăugare, așa că o inversare îți lovește poziția mai mare la o medie mai proastă. Făcut corect cu reguli stricte, asta poate funcționa — dar cere disciplină pe care cei mai mulți traderi nu o au.
      </P>
      <H3>Scaling In pe Pierzători (Averaging Down)</H3>
      <P>
        Asta înseamnă să adaugi la o poziție care se mișcă împotriva ta — cumpărând mai mult pe măsură ce prețul scade, sperând să-ți cobori prețul mediu de intrare. Asta e cea mai periculoasă tehnică de management al poziției din trading-ul retail. Transformă o pierdere controlată într-una necontrolată. Piața îți spune că greșești, iar răspunsul tău e să pariezi mai mult că ai dreptate.
      </P>

      <Callout title="Capcana Averaging Down" color="#00C853">
        Fiecare cont distrus are aceeași poveste la bază: „Am adăugat la poziție fiindcă eram sigur că își va reveni." Averaging down funcționează până nu mai funcționează — și când eșuează, eșuează catastrofal fiindcă poziția ta e la mărime maximă în cel mai prost moment posibil.
      </Callout>

      <H2>Riscul Cumulat: Matematica Pe Care Majoritatea Traderilor O Greșesc</H2>
      <P>
        Când faci scaling in, riscul tău total nu e ce ai planificat la prima intrare. E suma tuturor intrărilor combinate. Cei mai mulți traderi calculează riscul pe fiecare adăugare individuală dar nu reușesc să calculeze expunerea totală. Iată cum arată de fapt riscul cumulat când faci scaling in pe un trade pe pierdere:
      </P>
      <Table
        headers={['Acțiune', 'Preț Intrare', 'Mărime Poziție', 'Expunere Totală', 'Pierdere dacă Prețul Atinge $90']}
        rows={[
          ['Cumpărare inițială', '$100', '100 acțiuni', '$10,000', { value: '-$1,000 (1% din cont de $100K)', color: 'green' }],
          ['Adaugă la $97', '$97', '100 acțiuni', '$19,700', { value: '-$1,600 (1.6%)', color: 'gold' }],
          ['Adaugă la $94', '$94', '100 acțiuni', '$29,100', { value: '-$1,900 (1.9%)', color: 'gold' }],
          ['Adaugă la $91', '$91', '100 acțiuni', '$38,200', { value: '-$2,000 (2.0%)', color: 'red' }],
          ['Prețul atinge $90', '—', '400 acțiuni total', '$38,200', { value: '-$2,200 (2.2%)', color: 'red' }],
        ]}
      />
      <P>
        Ce a început ca un trade cu 1% risc a devenit un trade cu 2.2% risc — iar traderul tot crede că „gestionează riscul" fiindcă fiecare intrare individuală a fost „mică". Expunerea totală a contului s-a cvadruplat în timp ce trade-ul se mișca împotriva lor. Dacă acțiunea face gap la $80 peste noapte, pierderea e $5,400 — peste 5% din cont dintr-o singură idee.
      </P>

      <Divider />

      <H2>Scaling Out: Luarea de Profituri Parțiale</H2>
      <P>
        Scaling out înseamnă să-ți închizi poziția în etape — de exemplu, vânzând jumătate la primul target și ținând restul pentru o mișcare mai mare. Asta e atrăgător psihologic fiindcă blochează ceva profit în timp ce păstrează expunere la upside. Dar are consecințe matematice reale.
      </P>
      <H3>Avantajele</H3>
      <Ul items={[
        'Blochează profit parțial, reducând șansa ca un câștigător să se transforme în pierzător.',
        'Reduce presiunea psihologică — ai pus deja ceva în bancă.',
        'Îți permite să lași poziția rămasă să curgă cu un stop la breakeven pe rest.',
      ]} />
      <H3>Dezavantajele</H3>
      <Ul items={[
        'Îți taie câștigătorii din scurt. Dacă ieși 50% la 1R și trade-ul aleargă la 3R, R-multiple-ul tău efectiv e doar 2R în loc de 3R.',
        'Îți reduce expectancy-ul matematic al strategiei pe parcursul a sute de trade-uri.',
        'Creează o iluzie de profitabilitate — simți că câștigi mai des, dar câștigul tău mediu e mai mic.',
      ]} />
      <P>
        Ia în calcul acest exemplu: o strategie cu un win rate de 40% și un reward-to-risk de 3:1. Ieșirea completă a poziției dă un expectancy de 0.40 × 3 - 0.60 × 1 = +0.60R per trade. Dacă faci scaling out 50% la 1R și ții 50% pentru 3R, expectancy-ul tău scade la 0.40 × (0.5 + 1.5) - 0.60 × 1 = +0.20R per trade. Asta e o reducere de 67% a expectancy-ului — din aceeași strategie, aceleași intrări, același win rate. Diferența e în întregime în cum gestionezi ieșirea.
      </P>

      <ScalingOutEquityCurve />

      <Divider />

      <H2>Când Funcționează de Fapt Fiecare Metodă?</H2>
      <H3>Scaling in pe câștigători funcționează când:</H3>
      <Ul items={[
        'Ai un plan clar, pre-definit pentru fiecare adăugare (niveluri de preț, mărime totală maximă).',
        'Riscul tău cumulat total nu depășește niciodată limita ta maximă de risc per trade.',
        'Adaugi doar după confirmare reală a pieței — nu doar fiindcă poziția e verde.',
        'Ai testat această abordare pe 100+ trade-uri și ai confirmat că îți îmbunătățește rezultatele față de mărimea fixă.',
      ]} />
      <H3>Scaling out funcționează când:</H3>
      <Ul items={[
        'Strategia ta are un win rate mare (60%+) dar rapoarte reward-to-risk relativ mici.',
        'Beneficiul psihologic al blocării profiturilor parțiale te ține în trade-uri din care altfel ai ieși complet prea devreme.',
        'Tranzacționezi într-o piață agitată, blocată într-un range, unde câștigătorii întregi rar ating target-uri extinse.',
      ]} />

      <H2>Ideea Cheie</H2>
      <P>
        Scaling in pe pierzători omoară conturi. Asta nu e de dezbătut — e o certitudine matematică dat fiind destul timp. Îți crești expunerea la o teză pe care piața o invalidează activ. Fiecare adăugare îți crește riscul total în timp ce probabilitatea de revenire scade.
      </P>
      <P>
        Scaling in pe câștigători poate funcționa, dar doar cu reguli stricte: un număr maxim de adăugări, niveluri pre-definite, și un plafon de risc cumulat care nu depășește niciodată <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">limita ta standard de risc per trade</Link>. Fără aceste reguli, până și adăugarea la câștigători devine supraexpunere deghizată.
      </P>
      <P>
        Scaling out e un compromis, nu o masă gratis. Reduce varianța în detrimentul expectancy-ului. Dacă acel compromis merită depinde de win rate-ul strategiei tale și de profilul tău psihologic. Măsoară-l cu <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multipli</Link> — nu ghici.
      </P>

      <H2>Cea Mai Bună Abordare a Începătorului</H2>
      <P>
        Dacă ai mai puțin de 100 de trade-uri logate cu date consistente, folosește <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">position sizing</Link> fix: intrare completă, ieșire completă. Niciun scaling in, niciun scaling out. Asta nu e fiindcă aceste tehnici sunt proaste — e fiindcă nu poți evalua dacă ajută sau dăunează până nu ai un baseline. Trebuie să știi ce face strategia ta cu execuție simplă înainte să adaugi complexitate. Adăugarea de variabile la un sistem nedovedit face imposibil să diagnostichezi ce funcționează și ce nu.
      </P>

      <Takeaways items={[
        'Scaling in pe pierzători (averaging down) e cea mai periculoasă tehnică de management al poziției din trading-ul retail — crește expunerea în timp ce piața îți dovedește că greșești.',
        'Riscul cumulat din mai multe intrări de scale-in e aproape mereu mai mare decât realizează traderii. Un trade cu „1% risc" poate deveni un trade cu 3–5% risc după trei adăugări.',
        'Scaling out reduce presiunea psihologică dar matematic îți taie expectancy-ul — o strategie 3:1 poate pierde 67% din edge-ul ei când iei profituri parțiale la 1R.',
        'Scaling in pe câștigători funcționează doar cu reguli pre-definite: adăugări maxime, trigger-e de confirmare, și un plafon de risc cumulat.',
        'Începătorii ar trebui să folosească position sizing fix (tot înăuntru, tot afară) până au 100+ trade-uri de date de baseline cu care să compare.',
        'Măsoară impactul oricărei tehnici de management al poziției cu date reale pe un eșantion mare — nu te baza niciodată pe cum „se simte".',
      ]} />
    </BlogArticleLayout>
  );
}
