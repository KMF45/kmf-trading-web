import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PositionSizingGuideRo() {
  return (
    <BlogArticleLayout
      slug="position-sizing-guide"
      lang="ro"
      title="Position Sizing: Cât de Mult Ar Trebui Să Tranzacționezi?"
      metaTitle="Formula de Position Sizing: Abilitatea #1 Care Separă Profesioniștii de Conturile Distruse | K.M.F."
      metaDescription="Position sizing-ul e cea mai subevaluată abilitate din trading. Învață formula exactă pentru a calcula cât să tranzacționezi în funcție de mărimea contului, toleranța la risc și distanța stop loss-ului."
      date="10 februarie 2026"
      dateISO="2026-02-10"
      dateModified="2026-03-22"
      readTime="7 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'crypto-vs-forex-journaling', title: 'Crypto vs Forex: Why Your Trading Journal Needs Different Rules for Each Market', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ce este position sizing în trading?', answer: 'Position sizing determină cât capital aloci unui singur trade în funcție de mărimea contului, toleranța la risc și distanța stop loss-ului. E cea mai importantă abilitate de risk management din trading.' },
        { question: 'Cum calculez position size-ul pentru forex?', answer: 'Împarte suma riscată (mărimea contului × procentul de risc) la stop loss-ul în pips × valoarea pip-ului. De exemplu, pe un cont de $10,000 riscând 1% cu un stop loss de 50 pips, position size-ul ar fi 0.20 loturi.' },
        { question: 'Ce procent ar trebui să risc per trade?', answer: 'Cei mai mulți traderi profesioniști riscă între 0.5% și 2% din cont per trade. Regula de 1% e cel mai comun punct de pornire pentru un risk management consistent.' },
      ]}
      howToSteps={[
        { name: 'Stabilește procentul de risc', text: 'Alege cât din cont ești dispus să pierzi pe acest trade. Pornește cu 1% pentru majoritatea setup-urilor.' },
        { name: 'Calculează suma riscată', text: 'Înmulțește soldul contului cu procentul de risc. Pe un cont de $10,000 la 1%, suma riscată e $100.' },
        { name: 'Setează stop loss-ul', text: 'Plasează stop loss-ul la punctul de invalidare tehnică. Măsoară distanța în pips de la intrare la stop.' },
        { name: 'Calculează position size-ul', text: 'Împarte suma riscată la (stop loss în pips × valoarea pip-ului). Asta îți dă mărimea exactă a lotului pentru acest trade.' },
        { name: 'Verifică și intră', text: 'Verifică de două ori dacă position size-ul pare corect față de contul tău. Dacă pare prea mare, redu procentul de risc — niciodată nu lărgi stop-ul.' },
      ]}
    >
      <Intro>
        Ia doi traderi cu strategii identice, setup-uri identice, puncte de intrare și ieșire identice. Unul își crește contul constant ani de zile. Celălalt îl distruge în câteva luni. Diferența e aproape mereu position sizing-ul. Position sizing-ul e singura variabilă cea mai importantă pe care o controlezi direct în trading — și e cea mai constant subestimată de începători.
      </Intro>

      <StatsStrip items={[
        { value: 1, decimals: 0, suffix: '%', label: <>risc standard per trade<br />folosit de profesioniști</> },
        { value: 0.5, decimals: 1, suffix: '%', label: <>recomandat pentru începători<br />până la 50+ trade-uri validate</> },
        { value: 10, decimals: 0, suffix: '$', label: <>per pip pe un lot standard<br />(forex, perechi cotate în USD)</> },
      ]} />

      <H2>Formula Fundamentală</H2>
      <P>
        Position sizing-ul pornește de la un singur principiu: decide cât din cont ești dispus să pierzi pe acest trade, și lasă acea cifră să-ți determine position size-ul. Nu invers.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Position Size = Suma Riscată ÷ Distanța Stop Loss-ului (în termeni de preț)</strong>
      </P>
      <P>
        Fiecare variantă a calculului de position sizing — fie pentru loturi forex, acțiuni, sau unități de crypto — e o variație a acestei formule de bază. Inputurile se schimbă de la piață la piață, dar logica e identică. De reținut că există <Link to="/blog/crypto-vs-forex-journaling" className="text-kmf-accent hover:underline">reguli diferite pentru crypto vs forex</Link> când vine vorba de jurnalizare și risc.
      </P>

      <H2>Proces Pas cu Pas</H2>
      <Ul items={[
        'Pasul 1: Decide procentul de risc (de obicei 1% din cont pentru traderii consacrați, 0.5% pentru începători)',
        'Pasul 2: Calculează suma riscată în dolari: Suma Riscată = Soldul Contului × Risc %',
        'Pasul 3: Identifică nivelul de stop loss pe baza structurii pieței — află mai multe despre <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">cum să-ți setezi corect stop loss-ul</Link> (nu pe comoditate)',
        'Pasul 4: Calculează distanța stop loss-ului în termeni de preț (Prețul de Intrare − Prețul Stop Loss-ului)',
        'Pasul 5: Calculează position size-ul: Position Size = Suma Riscată ÷ Distanța Stop Loss-ului',
      ]} />
      <Callout title="Regula de Aur" color="#00C853">
        Calculează mereu position size-ul din stop loss-ul tău, niciodată nu muta stop loss-ul ca să se potrivească cu position size-ul preferat. Inversarea acestei logici e una dintre cele mai comune — și mai distructive — greșeli din trading-ul retail.
      </Callout>
      <Callout>
        Vrei să sari peste calcule? Folosește <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">calculatorul nostru gratuit de Lot Size</Link> — 340+ instrumente, cursuri valutare în timp real, rezultate instant.
      </Callout>

      <Divider />

      <H2>Exemplu Forex</H2>
      <P>
        Cont: $10,000. Risc per trade: 1% = $100.
        Trade: Long EUR/USD. Intrare: 1.1000. Stop loss: 1.0950 (50 pips sub intrare).
      </P>
      <P>
        Pentru un lot standard de forex (100,000 unități), fiecare pip valorează $10. Deci un stop de 50 pips = $500 risc per lot standard.
        Position Size = $100 ÷ $500 per lot = 0.20 loturi (sau 2 mini loturi).
      </P>
      <P>
        Dacă trade-ul câștigă la un target de 2:1 (100 pips, target la 1.1100): profit = 100 pips × $10 × 0.2 loturi = $200.
        Dacă trade-ul pierde la stop: pierdere = 50 pips × $10 × 0.2 loturi = $100. Exact 1% din cont.
      </P>

      <H2>Exemplu Acțiuni</H2>
      <P>
        Cont: $10,000. Risc per trade: 1% = $100.
        Trade: Long o acțiune la $50 pe acțiune. Stop loss: $48 (o distanță de $2.00 pe acțiune).
      </P>
      <P>
        Position Size = $100 ÷ $2.00 = 50 de acțiuni.
        Valoarea totală a poziției: 50 × $50 = $2,500 (25% din cont în această poziție).
        Dacă stop-ul e atins: 50 de acțiuni × $2.00 pierdere = $100. Exact 1%.
        Dacă target-ul e $54 (2:1 R:R): 50 de acțiuni × $4.00 câștig = $200.
      </P>

      <H2>Exemplu Crypto</H2>
      <P>
        Cont: $10,000. Risc per trade: 1% = $100.
        Trade: Long Bitcoin la $40,000. Stop loss: $39,000 ($1,000 distanță per BTC).
      </P>
      <P>
        Position Size = $100 ÷ $1,000 = 0.10 BTC.
        Valoarea totală a poziției: 0.10 × $40,000 = $4,000.
        Dacă stop-ul e atins: 0.10 BTC × $1,000 = $100. Exact 1%.
        Dacă target-ul e $42,000 (2:1 R:R): 0.10 × $2,000 = $200.
      </P>

      <Divider />

      <H2>Tabel de Referință Position Size</H2>
      <Table
        headers={['Mărime Cont', 'Risc %', 'Sumă Riscată', 'Distanță Stop', 'Position Size (unități)']}
        rows={[
          ['$5,000', { value: '1%', color: 'green' }, '$50', '$2.00 (acțiuni)', { value: '25 acțiuni', color: 'cyan' }],
          ['$10,000', { value: '1%', color: 'green' }, '$100', '$2.00 (acțiuni)', { value: '50 acțiuni', color: 'cyan' }],
          ['$25,000', { value: '1%', color: 'green' }, '$250', '$2.00 (acțiuni)', { value: '125 acțiuni', color: 'cyan' }],
          ['$10,000', { value: '1%', color: 'green' }, '$100', '50 pips (forex)', { value: '0.20 loturi', color: 'cyan' }],
          ['$10,000', { value: '0.5%', color: 'green' }, '$50', '50 pips (forex)', { value: '0.10 loturi', color: 'cyan' }],
          ['$10,000', { value: '2%', color: 'gold' }, '$200', '50 pips (forex)', { value: '0.40 loturi', color: 'gold' }],
        ]}
      />

      <H2>Position Sizing în Piețe Volatile</H2>
      <P>
        În perioadele de volatilitate ridicată — evenimente majore de știri, sezoane de earnings, sau dislocări de piață — distanța stop loss-ului ar trebui să se lărgească ca să țină cont de oscilațiile de preț mai mari decât normalul. Un stop mai larg înseamnă un position size mai mic pentru aceeași sumă riscată. Exact asta trebuie să se întâmple.
      </P>
      <P>
        Mulți traderi fac greșeala de a-și menține position size-ul obișnuit în perioadele volatile, plasând un stop prea strâns pentru condiții, fiind scoși din trade în mod repetat, și presupunând că strategia lor a încetat să funcționeze. Ajustarea corectă e automată dacă urmezi formula de position sizing: stop mai larg → poziție mai mică → același risc în dolari.
      </P>
      <H3>Ajustare practică pentru sesiuni volatile</H3>
      <Ul items={[
        'Verifică ATR-ul înainte de intrare: dacă ATR-ul pe 14 perioade e cu peste 1.5× mai mare decât media lui recentă, ia în calcul să-ți înjumătățești position size-ul ca măsură de precauție.',
        'Evită să tranzacționezi în cele 30 de minute dinainte și după publicările economice majore dacă strategia ta nu e construită pentru acea volatilitate.',
        'În zilele excepțional de volatile (ex. decizii surpriză ale băncilor centrale), ia în calcul să stai pe margine complet sau să folosești position size-uri minime.',
      ]} />

      <H2>Anti-Pattern-ul: Mărimea pe Bază de Feeling</H2>
      <P>
        Mulți traderi — mai ales cei care vin dintr-un fundal de urmărit piețele fără să tranzacționeze — dezvoltă obiceiul de a-și dimensiona pozițiile în funcție de cât de încrezători se simt în legătură cu un setup. „Ăsta arată foarte bine, bag mai mult." Ăsta e anti-pattern-ul.
      </P>
      <P>
        Niciun trade nu e atât de bun încât să justifice încălcarea regulilor tale de risc. <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">Regula de 1% risc</Link> se aplică fiecărui trade, inclusiv celui care pare o certitudine. Piețele sunt incerte prin definiție, iar dimensionarea bazată pe certitudine e un bias, nu un edge. Dimensionarea după formulă, constant, e ce transformă traderii inconsistenți în traderi consistenți.
      </P>

      <Takeaways items={[
        'Position Size = Suma Riscată ÷ Distanța Stop Loss-ului. Această formulă se aplică la forex, acțiuni și crypto — doar unitățile se schimbă.',
        'Stabilește mereu nivelul de stop loss întâi, apoi calculează position size-ul din el. Niciodată invers.',
        'În piețe volatile, stop-urile mai largi reduc automat position size-ul pentru același risc în dolari — ăsta e sistemul funcționând corect.',
        'Un cont de $10,000 care riscă 1% poate pierde doar $100 per trade. Pe 10 pierderi consecutive, contul e tot la $90,451 (nu $90,000, datorită compounding-ului).',
        'Dimensionarea pe bază de feeling sau nivel de încredere introduce unul dintre cele mai periculoase bias-uri din trading. Folosește formula de fiecare dată.',
        'Începătorii ar trebui să folosească 0.5% risc până când strategia lor a fost validată pe cel puțin 50 de trade-uri.',
      ]} />
    </BlogArticleLayout>
  );
}
