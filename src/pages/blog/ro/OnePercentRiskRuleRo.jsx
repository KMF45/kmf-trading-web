import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { RiskRuleEquityCurve } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function OnePercentRiskRuleRo() {
  return (
    <BlogArticleLayout
      slug="1-percent-risk-rule"
      lang="ro"
      title="Regula de 1% Risc: Regula Care Ține Traderii Profesioniști în Viață"
      metaTitle="Regula de 1%: De Ce Pro Nu Riscă Niciodată Mai Mult (Și Nici Tu n-ar Trebui) | K.M.F."
      metaDescription="Învață de ce traderii profesioniști nu riscă niciodată mai mult de 1% per trade, cum o calculezi și cum îți protejează contul în timpul seriilor de pierderi."
      date="9 ianuarie 2026"
      dateISO="2026-01-09"
      readTime="6 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ce este regula de 1% risc în trading?', answer: 'Regula de 1% înseamnă să nu riști niciodată mai mult de 1% din soldul total al contului pe un singur trade. Pe un cont de $10.000, pierderea ta maximă per trade ar fi $100, indiferent de instrument sau timeframe.' },
        { question: 'Cum aplic regula de 1%?', answer: 'Calculează 1% din soldul contului, stabilește distanța până la stop loss, apoi împarte suma riscată la distanța de stop loss ca să obții position size-ul. Asta asigură că fiecare trade are același risc, indiferent de piață.' },
        { question: 'Pot risca mai mult de 1% per trade?', answer: 'Unii traderi experimentați folosesc 2% per trade, dar a depăși asta e periculos. Cu 1% risc, chiar și 10 pierderi consecutive îți scad contul cu doar vreo 9.5%. Cu 5% risc, 10 pierderi ar lua 40% din cont.' },
      ]}
    >
      <Intro>
        Cei mai mulți traderi retail care își distrug conturile nu pierd din cauza unei strategii proaste. Pierd din cauza unui risk management prost. Găsesc un setup care le place, intră prea mare, și un singur trade — sau o singură săptămână proastă — le ia 30%, 50% sau tot capitalul. Regula de 1% risc e cea mai simplă și mai fiabilă apărare împotriva acestui rezultat.
      </Intro>

      <StatsStrip items={[
        { value: 1, decimals: 0, suffix: '%', label: <>risc maxim per trade<br />(standard din industrie)</> },
        { value: 100, decimals: 0, suffix: '%', label: <>câștig necesar ca să-ți revii<br />dintr-un drawdown de 50%</> },
        { value: 50, decimals: 0, suffix: '+', label: <>trade-uri ca să validezi<br />că o strategie funcționează</> },
      ]} />

      <H2>Ce Este Regula de 1% Risc?</H2>
      <P>
        Regula de 1% risc spune că, pe orice trade individual, n-ar trebui să riști niciodată mai mult de 1% din contul tău total. Riscul aici înseamnă suma maximă pe care ești dispus să o pierzi dacă trade-ul merge complet împotriva ta și lovește stop loss-ul.
      </P>
      <P>
        Dacă ai un cont de $10.000, nu riști mai mult de $100 per trade. Dacă ai un cont de $50.000, nu riști mai mult de $500. Ideea cheie e că acest număr derivă din mărimea contului tău, nu dintr-o sumă fixă în dolari — așa că se scalează cu echitatea ta și scade natural în timpul drawdown-urilor.
      </P>

      <H2>Matematica Ruinei: De Ce Procentul de Risc Contează Mai Mult Decât Crezi</H2>
      <P>
        Seriile de pierderi sunt o certitudine matematică, chiar și cu o strategie profitabilă. Întrebarea nu e dacă vei înfrunta o serie de pierderi, ci dacă contul tău o supraviețuiește destul cât să ajungă la următoarea fază câștigătoare. A înțelege strategii de <Link to="/blog/how-to-recover-from-losing-streak" className="text-kmf-accent hover:underline">supraviețuire a seriilor de pierderi</Link> e la fel de important ca a avea o metodă bună de intrare.
      </P>
      <P>
        Uită-te la ce fac pierderile consecutive contului tău la niveluri diferite de risc:
      </P>
      <Table
        headers={['Pierderi consecutive', '1% risc', '2% risc', '5% risc', '10% risc']}
        rows={[
          ['5 pierderi', { value: '−4.9%', color: 'green' }, { value: '−9.6%', color: 'cyan' }, { value: '−22.6%', color: 'gold' }, { value: '−41.0%', color: 'red' }],
          ['10 pierderi', { value: '−9.6%', color: 'green' }, { value: '−18.3%', color: 'cyan' }, { value: '−40.1%', color: 'red' }, { value: '−65.1%', color: 'red' }],
          ['15 pierderi', { value: '−14.0%', color: 'cyan' }, { value: '−26.1%', color: 'gold' }, { value: '−53.7%', color: 'red' }, { value: '−79.4%', color: 'red' }],
          ['20 pierderi', { value: '−18.2%', color: 'cyan' }, { value: '−33.2%', color: 'gold' }, { value: '−64.2%', color: 'red' }, { value: '−87.8%', color: 'red' }],
        ]}
      />

      <RiskRuleEquityCurve />

      <P>
        La 5% risc per trade, o serie de 10 pierderi — care e complet în varianța normală pentru un sistem cu 50% win rate — distruge 40% din contul tău. În acel punct, ai nevoie de un câștig de 67% doar ca să ajungi la break-even. La 1% risc, aceeași serie te lasă cu 90% din capital intact, iar un simplu câștig de 11% te readuce la punctul de pornire.
      </P>
      <Callout title="Matematica Recuperării" color="#00C853">
        Un drawdown de 50% cere un câștig de 100% ca să recuperezi. Un drawdown de 20% cere doar un câștig de 25%. Protecția împotriva drawdown-urilor mari nu e conservatorism — e esențială matematic pentru supraviețuirea pe termen lung.
      </Callout>

      <H2>Cum Calculezi Position Size-ul Folosind Regula de 1%</H2>
      <P>
        Formula are doi pași:
      </P>
      <Ul items={[
        'Pasul 1 — Calculează suma riscată: Sumă riscată = Sold cont × 0.01',
        'Pasul 2 — Calculează position size-ul: Position Size = Sumă riscată ÷ (Entry Price − Preț Stop Loss)',
      ]} />
      <P>
        <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">Plasarea stop loss-ului</Link> vine prima. Identifici punctul logic de invalidare a trade-ului, măsori distanța până la intrarea ta, apoi folosești acea distanță ca să determini cât de mare ar trebui să fie poziția. Nu plasezi niciodată un stop loss în funcție de ce <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">position sizing</Link> vrei să iei — funcționează exact invers.
      </P>

      <H3>Exemplu Lucrat: Forex</H3>
      <P>
        Cont: $10.000. Risc per trade: 1% = $100.
        Intrare: EUR/USD la 1.0800. Stop loss: 1.0750 (50 pips sub intrare).
        Pentru un standard lot, 1 pip = $10. Deci 50 pips = $500 per lot.
        Position size = $100 ÷ $500 = 0.20 lots (un mini lot și două micro lots).
      </P>
      <P>
        Dacă acest trade câștigă la un target 2:1 (100 pips peste intrare, la 1.0900), câștigul e $200 — un rezultat curat de 2R. Dacă pierde la stop, pierderea e exact $100, adică 1% din cont.
      </P>
      <Callout>
        Sari peste matematică — folosește <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">Lot Size Calculator-ul nostru gratuit</Link> ca să obții position size-ul exact pentru orice instrument în câteva secunde.
      </Callout>

      <Divider />

      <H2>Obiecții Frecvente — cu Răspuns</H2>
      <H3>„Câștigurile mele sunt prea mici la 1%"</H3>
      <P>
        Această obiecție vine de obicei din compararea sumelor în dolari în loc de procente. Un câștig de $100 pe un cont de $10.000 e 1%. Pe 100 de trade-uri cu un profit factor de 2.0 și 50% win rate, asta se compune semnificativ. Scopul în trading nu e trade-urile individuale mari — e creșterea constantă, compusă, pe sute de trade-uri.
      </P>
      <H3>„Am un win rate de 90% — pot risca mai mult"</H3>
      <P>
        Chiar și un sistem cu 90% win rate va produce mai multe pierderi consecutive la un moment dat. O serie susținută de 5–7 pierderi la 5% risc fiecare poate produce un drawdown insuportabil emoțional și periculos funcțional. Regula de 1% e asigurare împotriva varianței, nu o reflectare a încrederii tale într-un trade anume.
      </P>

      <H2>Ajustarea Regulii pentru Situația Ta</H2>
      <Ul items={[
        '0.5% per trade — Recomandat pentru traderii noi care încă își validează strategia, sau într-o perioadă de subperformanță. Ține pierderile gestionabile cât înveți.',
        '1% per trade — Standardul pentru traderii retail experimentați. Echilibrează creșterea cu protecția împotriva drawdown-ului.',
        '2% per trade — Limita superioară pentru traderii experimentați cu o strategie dovedită, bine testată, și încredere mare în edge-ul lor. N-ar trebui să fie default-ul.',
        'Peste 2% — Teritoriu speculativ. Potrivit doar pentru situații foarte scurte, cu convingere mare, și n-ar trebui să fie procedura standard.',
      ]} />

      <Takeaways items={[
        'Regula de 1% risc îți limitează pierderea maximă pe orice trade individual la 1% din soldul total al contului.',
        'Se calculează din distanța până la stop loss, nu se alege arbitrar — position size-ul derivă din regulă.',
        'La 1% risc, o serie de 10 pierderi te costă mai puțin de 10% din cont, ceea ce e recuperabil.',
        'Începătorii ar trebui să ia în calcul să pornească la 0.5% până când strategia le e validată cu cel puțin 50 de trade-uri.',
        'Regula se compune în favoarea ta: un cont care crește înseamnă poziții mai mari, iar un cont care scade înseamnă poziții mai mici, protejându-te automat în timpul drawdown-urilor.',
      ]} />
    </BlogArticleLayout>
  );
}
