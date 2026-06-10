import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PreTradeChecklistRo() {
  return (
    <BlogArticleLayout
      slug="pre-trade-checklist"
      lang="ro"
      title="Pre-Trade Checklist: 10 Lucruri de Verificat Înainte de Fiecare Intrare"
      metaTitle="Pre-Trade Checklist: 10 Reguli Care Previn 90% din Trade-urile Proaste | K.M.F."
      metaDescription="Un pre-trade checklist e cel mai eficient instrument pentru un trading consistent. Iată 10 întrebări de verificat înainte să intri în orice trade — adaptează-le la strategia ta."
      date="14 februarie 2026"
      dateISO="2026-02-14"
      dateModified="2026-03-22"
      readTime="6 min citire"
      category="Disciplină"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Ce ar trebui să fie pe un pre-trade checklist?', answer: 'Un pre-trade checklist complet acoperă condițiile de piață, alinierea cu trendul, trigger-ul de intrare, plasarea stop loss-ului, position size-ul, raportul risk-reward, starea emoțională, evenimentele de știri și dacă trade-ul se potrivește cu planul tău de trading.' },
        { question: 'De ce au traderii nevoie de un checklist?', answer: 'Un checklist forțează gândirea sistematică înainte de fiecare trade, prevenind intrările impulsive conduse de FOMO sau emoție. Piloții și chirurgii folosesc checklist-uri din același motiv — deciziile cu miză mare au nevoie de un proces, nu de instinct.' },
        { question: 'Câte puncte ar trebui să aibă un checklist de trading?', answer: 'Între 7 și 12 puncte e ideal. Mai puțin de 7 ratează criterii importante; mai mult de 12 devine impractic și traderii încep să sară peste puncte. Fiecare punct ar trebui să fie o întrebare clară de tip da/nu.' },
      ]}
      howToSteps={[
        { name: 'Verifică criteriile setup-ului', text: 'Confirmă că trade-ul se potrivește cu condițiile setup-ului tău definit. Dacă întinzi definiția, respinge trade-ul.' },
        { name: 'Verifică trendul pe timeframe-ul superior', text: 'Asigură-te că trendul de pe timeframe-ul superior susține direcția trade-ului tău. Tranzacționarea împotriva trendului cere justificare în plus.' },
        { name: 'Identifică trigger-ul de intrare', text: 'Definește exact price action-ul sau semnalul de indicator care îți va declanșa intrarea. Niciun trigger, niciun trade.' },
        { name: 'Plasează stop loss-ul la invalidare', text: 'Setează-ți stop loss-ul acolo unde ideea ta de trade e invalidată — în spatele structurii, pe bază de ATR, sau pe bază de lumânare.' },
        { name: 'Calculează position size-ul', text: 'Folosește regula de 1% ca să calculezi mărimea exactă a lotului pe baza distanței stop loss-ului și a soldului contului.' },
        { name: 'Verifică raportul risk-reward', text: 'Confirmă că target-ul tău dă cel puțin 1:2 risk-reward. Dacă nu, trade-ul poate să nu merite luat.' },
        { name: 'Verifică calendarul economic', text: 'Verifică să nu fie programate evenimente de știri cu impact mare în timpul duratei așteptate a trade-ului.' },
        { name: 'Evaluează-ți starea emoțională', text: 'Punctează-ți starea emoțională cinstit. Dacă ești furios, anxios, sau euforic, depărtează-te.' },
        { name: 'Confirmă alinierea cu planul', text: 'Verifică că trade-ul se potrivește cu planul tău săptămânal/lunar și nu îți depășește limita zilnică de trade-uri.' },
        { name: 'Jurnalizează trade-ul înainte de intrare', text: 'Notează-ți teza, intrarea, stop-ul și target-ul în jurnal înainte să apeși pe buton.' },
      ]}
    >
      <Intro>
        Înainte de fiecare zbor comercial, piloții parcurg un checklist pre-zbor standardizat — nu fiindcă piloții experimentați au uitat cum funcționează avioanele, ci fiindcă checklist-urile previn sistematic clasa de erori cauzate de supraîncredere, distragere, sau presiune de timp. Înainte de operații complexe, echipele de chirurgie rulează checklist-uri verbale care au redus demonstrabil decesele care se puteau preveni. Trading-ul e un domeniu de decizii cu consecințe luate sub incertitudine și presiune emoțională. Argumentul pentru checklist-uri e același.
      </Intro>

      <StatsStrip items={[
        { value: 10, decimals: 0, label: <>puncte de checklist ce acoperă<br />setup, risc și psihologie</> },
        { value: 1.5, decimals: 1, suffix: ':1', label: <>risk-to-reward minim<br />înainte ca un trade să califice</> },
        { value: 7, decimals: 0, label: <>rating emoțional minim<br />(1–10) înainte de intrare</> },
      ]} />

      <H2>De Ce Funcționează Checklist-urile în Trading</H2>
      <P>
        Cercetarea despre luarea deciziilor sub presiune arată constant că oamenii sunt slabi la a face evaluări în mai mulți pași în timp real — mai ales sub stres sau presiune de timp. Sărim peste pași, dăm prea multă greutate informației recente, și lăsăm starea emoțională să contamineze judecata analitică.
      </P>
      <P>
        Un checklist externalizează criteriile de decizie. În loc să te bazezi pe gândirea ta de moment, Sistemul 1 (rapid, emoțional), ca să evaluezi corect un trade, un checklist forțează angajarea sistematică a Sistemului 2 (lent, deliberat). Creează o pauză obligatorie între impuls și acțiune — iar în acea pauză trăiește disciplina. Ăsta e și motivul <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">pentru care traderii își încalcă propriile reguli</Link> — fără un checklist, Sistemul 1 câștigă de fiecare dată.
      </P>
      <Callout title="Ideea Cheie" color="#FFB300">
        Un checklist nu te face un analist mai bun. Se asigură că analiza pe care deja știi să o faci e chiar efectuată înainte de fiecare trade — nu doar uneori, nu doar când îți amintești, ci de fiecare dată.
      </Callout>

      <Divider />

      <H2>Pre-Trade Checklist-ul în 10 Puncte</H2>

      <H3>1. Se potrivește acest trade cu criteriile setup-ului meu definit?</H3>
      <P>
        Asta e întrebarea fundamentală. Criteriile setup-ului tău definesc condițiile specifice în care strategia ta a demonstrat edge. Dacă trade-ul curent nu îndeplinește clar acele criterii — dacă întinzi definiția, rotunjești colțurile, îți spui „e destul de aproape" — ăsta e un refuz. Fiecare abatere de la criteriile tale reprezintă un trade luat în afara edge-ului tău.
      </P>

      <H3>2. Am identificat trendul sau structura pe timeframe-ul superior?</H3>
      <P>
        Tranzacționarea împotriva trendului dominant de pe timeframe-ul superior reduce semnificativ probabilitatea de succes pe majoritatea strategiilor. Înainte să intri în orice trade pe timeframe-ul tău de execuție, verifică unul sau două timeframe-uri de deasupra lui. E trendul în direcția trade-ului tău? Există un nivel evident de resistance sau support deasupra sau dedesubtul prețului care ar putea opri mișcarea înainte de target-ul tău?
      </P>

      <H3>3. Există un nivel clar de invalidare pentru stop loss-ul meu?</H3>
      <P>
        Stop loss-ul tău ar trebui plasat la un nivel structural — sub support pentru un long, peste resistance pentru un short — nu la o distanță arbitrară. Dacă nu poți arăta un motiv specific pentru care prețul ajungând la acel nivel îți invalidează trade-ul, nu ai un stop loss logic. Ai o presupunere.
      </P>

      <H3>4. E raportul risk:reward cel puțin 1:1.5, sau conform regulilor mele?</H3>
      <P>
        Calculează raportul real: distanța de la intrare la stop loss față de distanța de la intrare la target. Dacă target-ul tău e la 60 pips și stop-ul la 80 pips, riști mai mult decât poți câștiga. Cunoaște-ți raportul R:R minim acceptabil înainte să-ți începi sesiunea și respinge orice trade care cade sub el.
      </P>

      <H3>5. Mi-am calculat position size-ul pe baza a 1% risc?</H3>
      <P>
        Nu estima. Calculează. Suma Riscată = Cont × 0.01. Position Size = Suma Riscată ÷ Distanța Stop-ului. Asta durează 20 de secunde și asigură că cel mai prost rezultat posibil pe acest trade — o pierdere completă — costă exact 1% din contul tău, nu aproximativ 1% pe bază de feeling. Vezi <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">ghidul nostru complet de position sizing</Link> pentru formula exactă pe forex, acțiuni și crypto.
      </P>

      <H3>6. E vreun eveniment major de știri în următoarea oră?</H3>
      <P>
        Publicările economice majore (NFP, CPI, decizii ale băncilor centrale) creează mișcări de preț bruște și mari care pot invalida instant setup-uri solide tehnic, lărgi spread-urile sălbatic, și vâna stop-urile înainte să continue în direcția inițială. Cunoaște calendarul economic înainte de sesiunea ta. Dacă un eveniment cu impact mare e programat în următoarele 60 de minute, fie așteaptă până după publicare, fie renunță la trade.
      </P>

      <H3>7. Tranzacționez din plictiseală sau FOMO?</H3>
      <P>
        Fii cinstit. Întreabă-te: intru în acest trade fiindcă există un setup real, sau fiindcă stau în fața ecranului și simt că ar trebui să fac ceva? Trade-urile de FOMO — luate fiindcă o mișcare se întâmplă deja și nu vrei să o ratezi — și trade-urile de plictiseală sunt printre cele mai sigure categorii pe pierdere. Dacă răspunsul cinstit e da, închide chart-ul și așteaptă. Acest fel de intrare impulsivă e primul pas spre <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">revenge trading</Link>.
      </P>

      <H3>8. Sunt pregătit emoțional să gestionez acest trade dacă merge împotriva mea?</H3>
      <P>
        Punctează-ți starea emoțională curentă pe o scară de la 1 la 10 (10 = complet calm). Dacă tocmai ai avut un trade pe pierdere și ești frustrat, dacă te-ai certat cu cineva, dacă ești anxios din cauza a ceva fără legătură cu trading-ul — aceste stări afectează procesarea rațională necesară ca să gestionezi bine un trade. O stare sub 6 sau 7 e un semnal că merită să renunți la acest trade.
      </P>

      <H3>9. Am un plan de ieșire clar (target și stop)?</H3>
      <P>
        Înainte să intri în trade, trebuie să știi unde vei ieși cu o pierdere (nivelul de stop în termeni de preț) și unde plănuiești să ieși cu un profit (nivelul de target sau un set de condiții). „O să văd cum se dezvoltă" nu e un plan de ieșire. Gestionarea unui trade în timp real fără un plan de ieșire pre-definit duce sigur la decizii emoționale în cele mai proaste momente posibile.
      </P>

      <H3>10. Sunt în regulă dacă acest trade pierde?</H3>
      <P>
        Asta e o verificare psihologică, nu o întrebare-capcană. Fiecare trade pe care îl iei ar trebui dimensionat și poziționat astfel încât, dacă pierde, rezultatul să fie acceptabil financiar și gestionabil emoțional. Dacă gândul că acest trade pierde te face să te simți groaznic sau disperat, poziția ta e prea mare, starea ta emoțională e prea ridicată, sau ambele. Rezolvă problema de fond înainte să intri.
      </P>

      <Divider />

      <H2>Cum Îți Construiești Propriul Checklist</H2>
      <P>
        Cele 10 întrebări de mai sus sunt un punct de pornire — adaptează-le la strategia ta specifică. Cel mai bun checklist e cel pe care chiar îl folosești, de fiecare dată, fără excepție. Ia în calcul să-l organizezi în trei categorii:
      </P>
      <Table
        headers={['Categorie', 'Focus', 'Întrebări Exemplu']}
        rows={[
          [{ value: 'Tehnic', color: 'cyan' }, 'E setup-ul valid?', 'Criteriile setup-ului, alinierea cu timeframe-ul superior, raportul R:R, evenimente de știri'],
          [{ value: 'Risc', color: 'green' }, 'E riscul gestionat?', 'Calcularea position size-ului, logica stop loss-ului, % risc pe cont'],
          [{ value: 'Psihologic', color: 'gold' }, 'Sunt în starea potrivită?', 'Rating emoțional, verificare plictiseală/FOMO, acceptarea pierderii'],
        ]}
      />

      <H2>Checklist Digital vs pe Hârtie</H2>
      <P>
        Amândouă funcționează. Criteriul e consistența. Un carnețel fizic lângă tastatură pe care îl bifezi fizic înainte de fiecare trade funcționează bine fiindcă actul de a lua pixul creează o fricțiune care încetinește impulsul. Un checklist digital în jurnalul tău de trading funcționează bine fiindcă creează o înregistrare pe care o poți revizui. Ce nu funcționează e un checklist mintal — creierul tău din Sistemul 1 te va convinge că ai „cam" bifat căsuțele când vrea să ia trade-ul.
      </P>

      <H2>Ce Să Faci Dacă Răspunzi Nu la Vreo Întrebare</H2>
      <P>
        Sari peste trade. Nu raționaliza. Nu face excepții pentru setup-urile „cu încredere mare". Valoarea unui checklist vine în întregime din aplicarea lui necondiționată. Un checklist pe care îl ignori ori de câte ori simți puternic în legătură cu un trade nu e un checklist — e o decorațiune.
      </P>
      <P>
        Trade-urile pe care nu le iei când checklist-ul tău spune nu sunt la fel de importante ca trade-urile pe care le iei când spune da. Disciplina e simetrică.
      </P>

      <Takeaways items={[
        'Checklist-urile funcționează forțând gândirea Sistemului 2 (deliberat, analitic) înainte de fiecare trade, prevenind intrările Sistemului 1 (emoțional, impulsiv).',
        'Cele 10 zone de bază: potrivirea setup-ului, timeframe-ul superior, logica stop-ului, raportul R:R, position size-ul, evenimentele de știri, plictiseala/FOMO, starea emoțională, planul de ieșire și acceptarea pierderii.',
        'Organizează-ți checklist-ul în trei categorii: Tehnic, Risc și Psihologic.',
        'Un checklist fizic sau digital creează o înregistrare. Unul mintal nu — iar creierul te va înșela.',
        'Dacă răspunzi nu la vreo întrebare, sari peste trade. Fără excepții. Disciplina stă în aplicarea necondiționată.',
        'Trade-urile sărite fiindcă checklist-ul spune nu nu sunt oportunități ratate. Sunt disciplină în acțiune.',
      ]} />
    </BlogArticleLayout>
  );
}
