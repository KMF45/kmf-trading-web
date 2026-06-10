import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function HowToSetStopLossRo() {
  return (
    <BlogArticleLayout
      slug="how-to-set-stop-loss"
      lang="ro"
      title="Cum Să Setezi Corect un Stop Loss (Nu Doar la Întâmplare)"
      metaTitle="Plasarea Stop Loss-ului: 3 Metode Profesioniste Pe Care Majoritatea Traderilor Nu Le Știu | K.M.F. Trading Journal"
      metaDescription="Majoritatea traderilor setează stop loss-ul pe baza unor sume în dolari sau cifre rotunde. Învață cele trei metode profesioniste de a plasa stop loss-ul acolo unde piața chiar îți invalidează trade-ul."
      date="6 februarie 2026"
      dateISO="2026-02-06"
      dateModified="2026-03-22"
      readTime="7 min citire"
      category="Managementul Riscului"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'crypto-vs-forex-journaling', title: 'Crypto vs Forex: Why Your Trading Journal Needs Different Rules for Each Market', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Unde ar trebui să-mi plasez stop loss-ul?', answer: 'Plasează stop loss-ul la un nivel unde ideea ta de trade e invalidată — în spatele structurii (support/resistance), dincolo de un multiplu ATR, sau sub/peste o lumânare cheie. Niciodată nu folosi un număr arbitrar de pips sau sume în dolari.' },
        { question: 'Care sunt cele 3 metode profesioniste de stop loss?', answer: 'Cele trei metode sunt: pe bază de structură (în spatele nivelurilor cheie de support/resistance), pe bază de ATR (folosind Average True Range ca măsură a volatilității), și pe bază de lumânare (dincolo de high/low-ul unei lumânări de semnal).' },
        { question: 'E mai bun un stop loss mai strâns?', answer: 'Nu neapărat. Un stop loss prea strâns e atins de zgomotul normal al pieței, reducându-ți win rate-ul. Cel mai bun stop loss echilibrează protecția împotriva invalidării cu destul spațiu cât trade-ul să respire.' },
      ]}
      howToSteps={[
        { name: 'Identifică nivelul de invalidare', text: 'Determină nivelul de preț la care ideea ta de trade nu mai e validă. Acolo unde structura pieței se rupe sau setup-ul tău eșuează.' },
        { name: 'Alege o metodă de plasare', text: 'Selectează pe bază de structură (în spatele support/resistance), pe bază de ATR (1.5-2x ATR de la intrare), sau pe bază de lumânare (dincolo de high/low-ul lumânării de semnal).' },
        { name: 'Adaugă un buffer', text: 'Plasează stop-ul câțiva pips dincolo de nivelul de invalidare ca să ții cont de spread, slippage și wick-urile de stop hunting.' },
        { name: 'Calculează position size-ul din distanța stop-ului', text: 'Folosește distanța stop loss-ului ca să calculezi position size-ul exact cu regula de 1% risc. Niciodată nu ajusta stop-ul ca să se potrivească cu un position size.' },
        { name: 'Setează stop-ul înainte să intri', text: 'Plasează ordinul de stop loss înainte sau simultan cu intrarea. Niciodată nu intra într-un trade plănuind să adaugi stop-ul mai târziu.' },
      ]}
    >
      <Intro>
        Un stop loss prost plasat e adesea mai rău decât niciun stop loss. Nu fiindcă ideea de stop loss e greșită, ci fiindcă stop-urile plasate în locul greșit te scot constant din trade-uri care ar fi fost profitabile — oferindu-ți în același timp o falsă siguranță că ți-ai gestionat riscul. Plasarea stop loss-ului e o abilitate, iar majoritatea traderilor retail n-au învățat-o niciodată cum trebuie.
      </Intro>

      <StatsStrip items={[
        { value: 1.5, decimals: 1, suffix: '×', label: <>multiplicator ATR — standard<br />pentru stop-uri pe bază de volatilitate</> },
        { value: 14, decimals: 0, label: <>perioade — fereastra ATR<br />implicită pentru dimensionarea stop-ului</> },
        { value: 1, decimals: 0, suffix: 'R', label: <>profit înainte să iei în calcul<br />o mutare la breakeven</> },
      ]} />

      <H2>Cele Două Greșeli Fundamentale</H2>
      <H3>Prea strâns</H3>
      <P>
        Un stop loss prea aproape de intrarea ta va fi atins de zgomotul normal al pieței — fluctuațiile de rutină care apar în orice trend sau setup, înainte ca mișcarea reală să se dezvolte. Ești scos din trade cu o pierdere completă, piața se mișcă apoi în direcția ta inițială, iar tu ratezi trade-ul complet în timp ce absorbi o pierdere. E una dintre cele mai frustrante experiențe din trading și se întâmplă aproape în întregime din cauza plasării proaste a stop-ului.
      </P>
      <H3>Prea larg</H3>
      <P>
        Un stop loss prea departe de intrarea ta înseamnă că, atunci când trade-ul eșuează, dauna e disproporționată. Dacă stop-ul tău e la 200 pips pe un trade unde mișcarea așteptată e de 80 pips, risk:reward-ul tău e inversat. Riști mai mult decât poți câștiga realist. Stop-urile largi te forțează și să-ți reduci position size-ul atât de sever încât trade-urile câștigătoare au impact minim pe cont.
      </P>

      <H2>Modurile Greșite de a Seta un Stop Loss</H2>
      <Ul items={[
        'Alegerea unui număr rotund („ies din trade dacă ajunge la 1.0800") fără motiv structural',
        'Setarea unei distanțe fixe în pips pentru toate trade-urile indiferent de setup sau volatilitate (ex. „mereu 20 pips")',
        'Alegerea unui stop loss pe baza sumei în dolari pe care ești dispus să o pierzi, apoi plasarea lui la exact acea distanță',
        'Plasarea unui stop la prețul de intrare (iluzia riscului zero) înainte ca trade-ul să aibă spațiu să se dezvolte',
        'Să nu setezi deloc un stop fiindcă „îl urmăresc manual"',
      ]} />
      <Callout title="Principiu Critic" color="#00C853">
        Procesul corect e: identifică-ți întâi nivelul logic de stop loss pe baza structurii pieței, apoi calculează position size-ul folosind <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">formula de position sizing</Link> din acea distanță. Niciodată nu porni de la un position size și să plasezi un stop ca să i se potrivească. Asta inversează complet logica și garantează o plasare proastă a stop-ului.
      </Callout>

      <Divider />

      <H2>Cele 3 Metode Profesioniste</H2>

      <H3>1. Stop Loss pe Bază de Structură</H3>
      <P>
        Plasarea stop-ului pe bază de structură e cea mai importantă metodă și fundamentul risk management-ului profesionist. Ideea e că stop loss-ul tău ar trebui plasat la un nivel de preț unde, dacă e atins, teza trade-ului e categoric greșită.
      </P>
      <P>
        Pentru un trade long: plasează stop-ul sub nivelul relevant de support, sub swing low, sau sub cel mai recent low semnificativ. Dacă prețul rupe sub acel nivel, structura ascendentă e ruptă, iar motivul tău de a fi long nu mai există.
      </P>
      <P>
        Pentru un trade short: plasează stop-ul peste nivelul relevant de resistance, peste swing high, sau peste cel mai recent high semnificativ.
      </P>
      <P>
        Cheia e „dincolo" — nu la nivel, ci câțiva pips sau puncte dincolo de el ca să ții cont de wick-uri, liquidity sweeps și volatilitatea normală din jurul nivelurilor cheie. Plasarea unui stop exact la o cifră rotundă sau exact la un swing point aproape garantează că vei fi scos din trade de un wick înainte de mișcarea reală.
      </P>

      <H3>2. Stop Loss pe Bază de ATR</H3>
      <P>
        Average True Range (ATR) e un indicator tehnic care măsoară range-ul mediu al mișcării de preț pe o perioadă specificată, de obicei 14 perioade. E una dintre cele mai utile măsuri obiective ale volatilității curente a pieței.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Formula:</strong> Distanță Stop = ATR(14) × Multiplicator
      </P>
      <P>
        Un multiplicator comun e 1.5× până la 2× ATR-ul. Dacă EUR/USD are un ATR de 60 pips, stop-ul tău ar fi la 90–120 pips de la intrare. Asta îți ajustează automat stop-ul pentru volatilitatea curentă — mai larg în perioadele de volatilitate mare, mai strâns în cele de volatilitate mică.
      </P>
      <P>
        Stop-urile pe bază de ATR sunt utile mai ales în sezoanele de earnings, evenimentele majore de știri, sau pe instrumente foarte volatile unde stop-urile pe bază de structură s-ar putea să nu fie suficiente ca să evite zgomotul normal.
      </P>
      <Table
        headers={['Instrument', 'ATR (14)', 'Multiplicator', 'Distanță Stop', 'Când E Potrivit']}
        rows={[
          ['EUR/USD', '65 pips', '1.5×', '97 pips', 'Condiții normale'],
          ['EUR/USD', '110 pips', '1.5×', '165 pips', 'Săptămână volatilă (NFP etc.)'],
          ['S&P 500', '28 puncte', '2.0×', '56 puncte', 'Swing trade intraday'],
          ['Bitcoin', '$1,800', '1.5×', '$2,700', 'Poziție pe chart daily'],
        ]}
      />

      <H3>3. Stop Loss pe Bază de Lumânare</H3>
      <P>
        Pentru intrările pe bază de pattern — pin bars, lumânări engulfing, inside bars și setup-uri similare de price action — stop loss-ul e plasat logic dincolo de high-ul sau low-ul lumânării de semnal în sine.
      </P>
      <P>
        Pentru un pin bar bullish la support: stop-ul merge sub low-ul wick-ului pin bar-ului, plus un buffer mic. Low-ul pin bar-ului reprezintă prețul pe care piața l-a testat și respins. Dacă prețul revine sub acel nivel, respingerea a eșuat și setup-ul e invalidat.
      </P>
      <P>
        Pentru o lumânare engulfing bearish la resistance: stop-ul merge peste high-ul lumânării engulfing, plus buffer.
      </P>
      <P>
        Stop-urile pe bază de lumânare sunt curate și logice, dar pot fi prea strânse pe timeframe-uri mai mari unde lumânările individuale reprezintă range-uri mari de preț. Verifică mereu și cu nivelurile structurale ca să confirmi că stop-ul are sens în context.
      </P>

      <Divider />

      <H2>Când Să-ți Muți Stop-ul la Breakeven</H2>
      <P>
        Mutarea stop loss-ului la prețul de intrare — breakeven — e o tehnică utilă de risk management, dar doar când trade-ul s-a dezvoltat destul cât să o justifice. O regulă comună: odată ce trade-ul atinge 1R în profit (adică s-a mișcat aceeași distanță spre target cât distanța inițială a stop loss-ului), ia în calcul să muți stop-ul la breakeven.
      </P>
      <P>
        Beneficiul e evident: elimini posibilitatea unei pierderi complete pe un trade care funcționa. Costul e și el real: crești probabilitatea de a fi scos din trade pentru zero câștig pe trade-uri care au nevoie de spațiu să respire înainte să continue în direcția ta. Folosește stop-urile la breakeven selectiv, nu ca setare implicită pentru fiecare trade.
      </P>

      <H2>Mutarea Stop-urilor Împotriva Trade-ului: O Problemă de Disciplină</H2>
      <P>
        Practica de a muta un stop loss mai departe când trade-ul merge împotriva ta — ca să eviți să fii scos din trade — nu e o strategie de ajustare a stop loss-ului. E un eșec de disciplină. Stop-ul tău inițial a fost plasat dintr-un motiv: reprezenta prețul la care teza trade-ului tău eșuează. Mutarea lui mai departe de intrare nu schimbă acea realitate. Doar crește suma pe care o vei pierde când teza eșuează în cele din urmă.
      </P>

      <Callout>
        Odată ce ai nivelul de stop loss, folosește <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">calculatorul nostru gratuit de Lot Size</Link> ca să obții position size-ul exact instant — 340+ instrumente suportate.
      </Callout>

      <Takeaways items={[
        'Stop loss-urile ar trebui plasate la niveluri structurale unde teza trade-ului e invalidată — nu pe baza unor numere arbitrare de pips sau sume în dolari.',
        'Ordinea corectă: identifică nivelul de stop întâi, apoi calculează position size-ul. Niciodată invers.',
        'Stop-urile pe bază de structură (sub support / peste resistance) sunt metoda cea mai logică și mai larg aplicabilă.',
        'Stop-urile pe bază de ATR (1.5–2× ATR-ul pe 14 perioade) se adaptează automat la volatilitatea pieței.',
        'Stop-urile pe bază de lumânare sunt curate pentru setup-urile de price action dar ar trebui verificate și cu structura.',
        'Mutarea unui stop loss împotriva trade-ului tău e o problemă de disciplină, nu o ajustare de strategie.',
      ]} />
    </BlogArticleLayout>
  );
}
