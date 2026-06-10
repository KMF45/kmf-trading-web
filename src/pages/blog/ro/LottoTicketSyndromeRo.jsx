import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { LottoTicketChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function LottoTicketSyndromeRo() {
  return (
    <BlogArticleLayout
      slug="lotto-ticket-syndrome"
      lang="ro"
      title={'Sindromul „Biletului de Loto": De Ce Îți Mărești Riscul După un Câștig Mare'}
      metaTitle="De Ce Îți Dublezi Riscul După un Câștig Mare (Și Pierzi Tot) | K.M.F."
      metaDescription="După un câștig mare, creierul tău se inundă cu dopamină și te simți invincibil. Apoi îți dublezi riscul și pierzi profitul pe o săptămână într-un singur trade. Neuroștiința euforiei de după câștig."
      date="22 martie 2026"
      dateISO="2026-03-22"
      readTime="9 min citire"
      category="Psihologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'confidence-vs-overconfidence', title: 'Confidence vs Overconfidence: The Invisible Line That Separates Winners from Blowups', category: 'Psychology' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'overtrading-checklist', title: 'Overtrading Checklist: 8 Signs You Are Tilting Without Realizing It', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'De ce își măresc traderii riscul după ce câștigă?', answer: 'Dopamina eliberată după un câștig creează un sentiment de invincibilitate. Creierul interpretează câștigul ca dovadă de pricepere (chiar dacă a fost varianță), ducând la supraîncredere. Asta se manifestă prin position size-uri mai mari, reguli de risc mai lejere, și setup-uri pe care în mod normal le-ai sări.' },
        { question: 'Ce este house money effect în trading?', answer: 'House money effect e un bias cognitiv în care oamenii își asumă riscuri mai mari cu banii pe care îi percep ca „câștiguri" în loc de „ai lor". După o săptămână profitabilă, traderii separă mental profitul de capitalul lor și îl tratează ca disponibil, ducând la trade-uri supradimensionate.' },
        { question: 'Cum mă opresc din a risca prea mult după o serie de câștiguri?', answer: 'Aplică o regulă de risc fix care nu se schimbă în funcție de rezultatele recente. Riscă același 1% per trade fie că ești pe o serie de 5 câștiguri, fie pe una de 5 pierderi. Urmărește-ți position size-urile în jurnal și marchează orice trade care îți depășește riscul standard.' },
        { question: 'E periculoasă euforia în trading?', answer: 'Da. Euforia și tilt-ul sunt la fel de periculoase — amândouă anulează luarea rațională de decizii. Euforia duce la poziții supradimensionate și intrări neglijente. Tilt-ul duce la revenge trade-uri și stop-uri abandonate. Starea emoțională ideală pentru trading e neutralitatea calmă, nu entuziasmul.' },
      ]}
      howToSteps={[
        { name: 'Setează un procent de risc fix care nu se schimbă niciodată', text: 'Definește-ți riscul standard (ex. 1% per trade) și scrie-l ca regulă absolută. Acest număr nu crește după câștiguri și nu scade după pierderi. E constant indiferent de performanța recentă.' },
        { name: 'Marchează „trade-urile de euforie" în jurnal', text: 'După fiecare trade, punctează-ți starea emoțională. Orice trade luat cu o auto-evaluare de „entuziasmat" sau „încrezător peste normal" e marcat pentru review ulterior. K.M.F. loghează starea emoțională pre-trade exact în acest scop.' },
        { name: 'Aplică regula de răcire de 24 de ore după câștiguri mari', text: 'După orice trade individual care aduce mai mult de 2R, sau orice zi care aduce o creștere de cont de peste 3%, nu mai tranzacționa pentru restul sesiunii. Revino a doua zi cu niveluri proaspete de cortizol și dopamină.' },
        { name: 'Revizuiește-ți trade-urile marcate lunar', text: 'Filtrează-ți jurnalul pentru trade-urile marcate ca euforie și compară R-multiplii lor cu baseline-ul tău. În aproape fiecare caz, trade-urile de euforie de după câștig performează mai prost decât trade-urile calme. Lasă datele să dovedească pattern-ul.' },
        { name: 'Folosește un calculator de position size la fiecare trade', text: 'Niciodată nu calcula position size-ul în cap sau „pe simțite". Introdu soldul contului, procentul de risc și distanța stop-ului într-un calculator de fiecare dată. K.M.F. are un calculator de lot încorporat care elimină tentația de a rotunji în sus.' },
      ]}
    >
      <Intro>
        Luni dimineața. Două trade-uri curate, ambele ating take profit. +$475. Te simți bine — nu nesăbuit, doar bine. Marți, încă un câștigător. +$410. Ești pe plus aproape o mie de dolari și săptămâna e abia pe jumătate. Aici devine periculos. Miercuri dimineața, vezi un setup care e... ok. Nu grozav. Dar ești pe o serie. Știi ce-ți șoptește creierul? „Acum te joci cu banii casei. Îți permiți să tragi mai mare." Așa că în loc de riscul tău normal de 1%, mergi pe 2.5%. Trade-ul merge împotriva ta. -$625 într-o singură lumânare. Joi încerci să recuperezi — risc de 3.5% de data asta. Altă pierdere. -$1,050. În 48 de ore, ai trecut de la „cea mai bună săptămână" la „mai rău decât unde am pornit". Bun venit la Sindromul Biletului de Loto.
      </Intro>

      <StatsStrip items={[
        { value: 6.25, decimals: 2, suffix: '%', label: <>probabilitatea a 4 câștiguri<br />la rând la 50% win rate</> },
        { value: 3, decimals: 0, suffix: '%', label: <>câștig zilnic care ar trebui<br />să declanșeze oprirea sesiunii</> },
        { value: 24, decimals: 0, suffix: 'h', label: <>normalizarea dopaminei<br />după un câștig mare</> },
      ]} />

      <H2>Capcana Dopaminei</H2>
      <P>
        Când câștigi un trade, creierul tău eliberează dopamină — același neurotransmițător declanșat de câștigurile la gambling, like-urile de pe social media, și da, biletele de loto câștigătoare. Dopamina nu te face să te simți „fericit". Te face să te simți <strong>sigur</strong>. Creează o experiență subiectivă de competență și control care nu are nicio legătură cu nivelul tău real de pricepere.
      </P>
      <P>
        După o serie de câștiguri, nivelurile de dopamină sunt ridicate. Creierul tău începe să caute pattern-uri: „Am câștigat de trei ori la rând, deci am un edge chiar acum." Dar acel „edge" e o iluzie — trei câștiguri consecutive la un win rate de 40% au o probabilitate de 6.4%. E neobișnuit dar complet aleatoriu. Dopaminei nu-i pasă. Îți spune că asta e pricepere.
      </P>

      <Callout title="House Money Effect" color="#CE93D8">
        Economiștii comportamentali îi spun „house money effect": oamenii fac pariuri mai mari cu banii pe care îi percep ca câștiguri în loc de capital câștigat. În trading, asta înseamnă că cei $900 pe care i-ai făcut săptămâna asta par „bani gratis" — așa că să riști $600 din ei pe un trade nu declanșează aceeași alarmă ca să riști $600 din capitalul tău de bază. Dar contul tău nu știe diferența. Un dolar pierdut din câștiguri îți distruge capitalul exact la fel ca un dolar pierdut din depuneri.
      </Callout>

      <LottoTicketChart />

      <P>
        Acest grafic e biografia oricărui trader. Luni e disciplinat. Marți e tot ok dar riscul urcă încet. Până miercuri, același trader care n-ar risca niciodată 2.5% într-o zi normală o face fiindcă „sunt pe plus mare, îmi permit". Creierul face escaladarea să pară logică în acel moment. Nu e.
      </P>

      <Divider />

      <H2>Cele 4 Etape ale Autodistrugerii de După Câștig</H2>
      <Table
        headers={['Etapă', 'Ce Se Întâmplă', 'Ce Îți Spui']}
        rows={[
          ['1. Validare', { value: 'Primele 2-3 câștiguri îți confirmă analiza', color: 'green' }, '„Strategia mea funcționează perfect acum"'],
          ['2. Ridicare', { value: 'Riscul crește „doar puțin"', color: 'gold' }, '„Merg pe 1.5% în loc de 1% — am un buffer"'],
          ['3. Invincibilitate', { value: 'Regulile se lejerează, setup-urile slăbesc', color: 'red' }, '„Simt piața azi. Sunt în zonă."'],
          ['4. Prăbușire', { value: 'O pierdere supradimensionată, apoi trade-uri de panică', color: 'red' }, '„Am nevoie doar de un trade ca să revin unde eram"'],
        ]}
      />
      <P>
        Etapa 4 e unde se produce dauna reală — și nu prima pierdere te omoară. E încercarea de a-ți reveni din acea pierdere folosind același risc umflat care a cauzat-o. Ai luat o lovitură de 2.5%, așa că încerci să recuperezi cu un trade de 3.5%, apoi unul de 4%. Ăsta nu mai e trading. Ăsta e <Link to="/blog/revenge-trading-kill-switch" className="text-kmf-accent hover:underline">revenge trading</Link> cu un chart deschis.
      </P>

      <H2>De Ce Seriile de Câștiguri Sunt Statistic Lipsite de Sens</H2>
      <P>
        Iată matematica pe care creierul tău îmbibat în dopamină refuză să o proceseze: într-o strategie cu un win rate de 50%, probabilitatea de a atinge 4 câștiguri consecutive e 6.25%. Asta înseamnă că la fiecare 100 de trade-uri, vei experimenta cam 6 serii de 4+ câștiguri. Fiecare se va simți ca „a fi în zonă". Fiecare e varianță pură.
      </P>
      <P>
        O <Link to="/blog/confidence-vs-overconfidence" className="text-kmf-accent hover:underline">serie de câștiguri</Link> nu îți spune nimic despre următorul trade. Piața nu are memorie. Ultimele tale trei trade-uri fiind profitabile nu schimbă probabilitatea celui de-al patrulea cu nici măcar un punct procentual. Dar creierul tău — construit pentru recunoașterea pattern-urilor într-o lume de tigri cu colți-sabie — nu poate accepta asta. Insistă că există un pattern. Nu există.
      </P>

      <Callout title="Încrederea Jucătorului" color="#FFB300">
        Cazinourile știu asta mai bine ca oricine. După o serie de câștiguri la masa de blackjack, jucătorii pariază mai mult — cazinoul îi numește „fierbinți". House edge-ul nu se schimbă. Cărțile nu știu ce s-a întâmplat înainte. Dar jucătorul se simte diferit. Birourile de trading funcționează la fel, doar că miza sunt banii tăi de chirie.
      </Callout>

      <Divider />

      <H2>Soluția: Cum Rămâi Plictisitor Cât Faci Bani</H2>
      <H3>1. Regula de Fier a Riscului</H3>
      <P>
        Riscul tău per trade e o constantă. Nu un ghid. Nu un „de obicei". O lege fizică a trading-ului tău. <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">Un procent înseamnă un procent</Link> — fie că ești pe plus $2,000 pe săptămână, fie pe minus $500. În clipa în care procentul tău de risc devine o variabilă care se ajustează în funcție de „cum te simți", ți-ai predat contul sistemului limbic. Nu ți-l va da înapoi.
      </P>
      <H3>2. Regula de Răcire de 24 de Ore</H3>
      <P>
        După orice trade individual care aduce mai mult de 2R, sau orice zi în care contul tău crește cu peste 3%, oprește-te din tranzacționat pentru restul sesiunii. Nu fiindcă faci ceva greșit — ci fiindcă nivelurile tale de dopamină au nevoie de 12-24 de ore ca să se normalizeze. Cel mai bun trade al săptămânii e adesea cel pe care nu îl iei într-o miercure euforică.
      </P>
      <H3>3. Calculator de Fiecare Dată</H3>
      <P>
        Niciodată, dar niciodată, nu calcula position size-ul în cap după o serie de câștiguri. „Matematica ta din cap" va rotunji convenabil în sus. Folosește un calculator — introdu soldul, riscul %, și distanța stop-ului mecanic. K.M.F. are un calculator de lot size încorporat: introduci mărimea contului, procentul de risc, și distanța stop-ului, și îți spune mărimea exactă a lotului. Fără loc de negociere pentru dopamina ta.
      </P>
      <H3>4. Marchează și Revizuiește</H3>
      <P>
        În jurnalul tău, punctează-ți starea emoțională înainte de fiecare trade. Orice trade în care te simți „entuziasmat", „încrezător", sau „în zonă" primește un marcaj. La sfârșitul lunii, filtrează trade-urile marcate și compară R-multiple-ul lor mediu cu trade-urile nemarcate. În aproape fiecare caz, trade-urile de euforie performează mai prost. K.M.F. îți loghează starea emoțională pre-trade automat — poți filtra și compara în vederea de statistici.
      </P>

      <H2>Realizarea Incomodă</H2>
      <P>
        Cel mai bun trading se simte plictisitor. Nu palpitant. Nu emoționant. Plictisitor. Intri. Aștepți. Ieși la nivelul tău. Nu simți nimic — iar acel nimic e cea mai performantă stare emoțională pe care o poți atinge. În clipa în care trading-ul se simte palpitant, nu mai operezi din creierul tău analitic. Operezi din aceeași circuiterie neuronală care îi face pe oameni să cumpere bilete răzuibile la benzinării. Euforia e tilt într-o dispoziție bună. Dauna e identică.
      </P>

      <Takeaways items={[
        'Dopamina din trade-urile câștigătoare creează un fals sentiment de certitudine și control. Trei câștiguri consecutive la 40% win rate au o probabilitate de 6.4% — e varianță, nu pricepere.',
        '„House money effect" te face să tratezi câștigurile ca disponibile, ducând la trade-uri supradimensionate. Contul tău nu știe diferența dintre dolarii depuși și cei câștigați.',
        'Autodistrugerea de după câștig urmează un pattern previzibil în 4 etape: validare, ridicare, invincibilitate, prăbușire. Etapa 4 e unde mor conturile.',
        'Procentul de risc trebuie să fie o constantă, nu o variabilă. 1% înseamnă 1% fie că ești pe plus $2,000, fie pe minus $500.',
        'După orice trade de 2R+ sau o zi de +3%, oprește-te din tranzacționat pentru restul sesiunii. Dopamina ta are nevoie de 12-24 de ore ca să se normalizeze.',
        'Cel mai bun trading se simte plictisitor. Entuziasmul e un semn de avertizare, nu un indicator de performanță. Euforia e tilt cu zâmbet.',
      ]} />
    </BlogArticleLayout>
  );
}
