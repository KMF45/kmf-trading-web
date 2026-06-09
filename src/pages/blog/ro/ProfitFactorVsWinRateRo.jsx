import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ProfitFactorBarChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function ProfitFactorVsWinRateRo() {
  return (
    <BlogArticleLayout
      slug="profit-factor-vs-win-rate"
      lang="ro"
      title="Profit Factor vs Win Rate: Care Metrică Prezice de Fapt Succesul în Trading?"
      metaTitle="Profit Factor vs Win Rate: Metrica Care Îți Spune Cu Adevărat Dacă Faci Bani | K.M.F."
      metaDescription="Majoritatea traderilor sunt obsedați de win rate. Dar profit factor e un predictor mult mai bun al succesului pe termen lung. Învață ce înseamnă ambele metrici, cum le calculezi și pe care să o optimizezi."
      date="6 ianuarie 2026"
      dateISO="2026-01-06"
      readTime="7 min citire"
      category="Statistics"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ce este profit factor în trading?', answer: 'Profit factor e profitul brut total împărțit la pierderea brută totală. Un profit factor peste 1.0 înseamnă că ești profitabil. Cei mai mulți traderi profitabili constant au un profit factor între 1.5 și 2.5.' },
        { question: 'Ce contează mai mult, win rate sau profit factor?', answer: 'Profit factor contează mai mult fiindcă ține cont și de win rate, ȘI de mărimea câștigurilor față de pierderi. Un trader cu 40% win rate dar cu câștiguri mari poate avea un profit factor mai mare decât un trader cu 70% win rate și câștiguri mici.' },
        { question: 'Ce înseamnă un profit factor bun?', answer: 'Un profit factor de 1.5+ e bun, 2.0+ e excelent, iar 3.0+ e excepțional și rar pe eșantioane mari. Sub 1.0 înseamnă că pierzi bani. Între 1.0 și 1.3 înseamnă că edge-ul tău e subțire și vulnerabil la slippage și comisioane.' },
      ]}
    >
      <Intro>
        Întreabă majoritatea traderilor ce face un sistem bun și îți vor spune ceva de genul „câștig 70% din trade-uri". Win rate-ul sună bine. E intuitiv, ușor de explicat și satisfăcător emoțional. Dar win rate-ul de unul singur nu îți spune aproape nimic despre cât de profitabilă e o strategie — iar goana după un win rate mare e una dintre cele mai comune greșeli pe care le fac traderii în formare.
      </Intro>

      <StatsStrip items={[
        { value: 1.5, decimals: 1, label: <>Profit factor minim<br />pentru o strategie solidă</> },
        { value: 70, decimals: 0, suffix: '%', label: <>din traderii retail<br />sunt pe pierdere (date ESMA)</> },
        { value: 2.1, decimals: 1, label: <>Profit factor mediu<br />al top 10% traderi de prop</> },
      ]} />

      <H2>Ce Este Win Rate?</H2>
      <P>
        Win rate-ul e procentul de trade-uri închise care s-au terminat pe profit. Dacă ai luat 100 de trade-uri și 60 au fost câștigătoare, win rate-ul tău e 60%.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Formula:</strong> Win Rate = (Numărul de Trade-uri Câștigătoare / Total Trade-uri) × 100
      </P>
      <P>
        Limitarea e evidentă odată ce te gândești la ea: win rate-ul nu spune nimic despre cât câștigi când câștigi, sau cât pierzi când pierzi. Un trader care câștigă $10 la fiecare trade câștigător și pierde $500 la fiecare pierzător ar avea un win rate de 60% și ar fi rapid pe drum spre zero.
      </P>

      <H2>Ce Este Profit Factor?</H2>
      <P>
        Profit factor e raportul dintre profitul tău brut total și pierderea ta brută totală, calculat pe toate trade-urile. Răspunde la o întrebare mai completă: pentru fiecare dolar pe care îl pierzi, câți dolari faci?
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Formula:</strong> Profit Factor = Profit Brut / Pierdere Brută
      </P>
      <P>
        Un profit factor de 1.0 înseamnă că ești pe zero. Un profit factor de 2.0 înseamnă că pentru fiecare $1 pe care îl pierzi în total, câștigi $2. Un profit factor sub 1.0 înseamnă că strategia ta pierde bani în ansamblu.
      </P>
      <P>
        Spre deosebire de win rate, profit factor surprinde și cât de des câștigi, și cât câștigi sau pierzi per trade. E o imagine completă într-un singur număr.
      </P>

      <Divider />

      <H2>Matematica Ce Demască Defectul Win Rate-ului</H2>
      <P>
        Ia în calcul doi traderi. Trader A are un win rate de 70%. Trader B are doar 40%. Cei mai mulți ar presupune că Trader A are mai mult succes. Dar uită-te la cifrele reale:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Trader A:</strong> 100 de trade-uri, 70 câștigătoare cu $50 câștig mediu, 30 pierzătoare cu $200 pierdere medie.
        Profit total: $3,500. Pierdere totală: $6,000. Rezultat net: -$2,500. Profit factor: 0.58.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Trader B:</strong> 100 de trade-uri, 40 câștigătoare cu $300 câștig mediu, 60 pierzătoare cu $100 pierdere medie.
        Profit total: $12,000. Pierdere totală: $6,000. Rezultat net: +$6,000. Profit factor: 2.0.
      </P>
      <P>
        Trader A pierde bani constant. Trader B își dublează pierderea brută în profit. Win rate-ul a spus povestea greșită. Profit factor a spus adevărul.
      </P>

      <H2>Trei Profiluri de Trader Comparate</H2>
      <Table
        headers={['Profil', 'Win Rate', 'Câștig Mediu', 'Pierdere Medie', 'Profit Factor', 'Rezultat (100 trade-uri)']}
        rows={[
          ['Scalper A', '75%', '$30', '$120', { value: '0.75', color: 'red' }, { value: '−$1,500 (pe pierdere)', color: 'red' }],
          ['Swing Trader B', '45%', '$250', '$100', { value: '2.06', color: 'cyan' }, { value: '+$5,750 (profitabil)', color: 'green' }],
          ['Trend Trader C', '35%', '$600', '$150', { value: '2.33', color: 'cyan' }, { value: '+$11,250 (profitabil)', color: 'green' }],
        ]}
      />

      <ProfitFactorBarChart />

      <P>
        Observă că ambele profiluri profitabile au win rate sub 50%. Asta e comun în trading-ul profesionist, mai ales la abordările trend-following și swing-trading. Edge-ul stă în întregime în mărimea câștigurilor față de pierderi.
      </P>

      <H2>Ce Înseamnă un Profit Factor Bun?</H2>
      <Ul items={[
        'Sub 1.0 — Strategie pe pierdere. Plătești ca să tranzacționezi.',
        '1.0 până la 1.5 — Zona de break-even. Comisioanele și spread-urile probabil împing asta în teritoriu negativ. Are nevoie de îmbunătățiri.',
        '1.5 până la 2.0 — Bun. O strategie viabilă, tranzacționabilă, cu edge consistent.',
        '2.0 și peste — Excelent. Acest nivel e sustenabil și sugerează o disciplină solidă de risk:reward.',
        'Peste 3.0 — Remarcabil, dar verifică pe un eșantion mare. Poate reflecta curve-fitting pe eșantioane mici.',
      ]} />
      <Callout title="Context Important" color="#4FC3F7">
        Un profit factor calculat din doar 15 sau 20 de trade-uri nu e relevant statistic. Ai nevoie de minimum 30 până la 50 de trade-uri, ideal 100 sau mai multe, înainte ca cifra să se stabilizeze. Verifică mereu mărimea eșantionului înainte să tragi concluzii.
      </Callout>

      <H2>De Ce Win Rate-ul de Unul Singur Te Induce în Eroare</H2>
      <P>
        Mulți începători își construiesc strategiile special ca să câștige mai des, ceea ce de multe ori înseamnă să ia profituri mici repede (taie câștigătorii din scurt) lăsând în același timp pierderile să curgă, în speranța că trade-ul revine. Acest comportament creează iluzia unei strategii bune printr-un win rate mare, în timp ce distruge sistematic capitalul printr-un risk:reward prost.
      </P>
      <P>
        Instinctul de a închide câștigătorii repede și de a ține pierzătorii vine din loss aversion — durerea psihologică a unei pierderi e de aproximativ două ori mai puternică decât plăcerea unui câștig echivalent. Să tranzacționezi împotriva acestui instinct e una dintre cele mai grele abilități de dezvoltat, și de-asta profit factor e o verificare externă atât de utilă.
      </P>

      <H2>Cum Îți Îmbunătățești Profit Factor-ul</H2>
      <H3>Taie pierzătorii mai repede</H3>
      <P>
        Cea mai directă pârghie pe profit factor e numitorul: pierderea ta brută. De fiecare dată când muți un stop loss mai departe ca să eviți să fii scos din trade, îți mărești pierderea medie și îți tragi în jos profit factor-ul. Respectă <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">plasarea inițială a stop loss-ului</Link>. O pierdere medie mai mică are un efect uriaș de compounding pe profit factor în timp.
      </P>
      <H3>Lasă câștigătorii să curgă</H3>
      <P>
        Numărătorul — profitul brut — crește când ții trade-urile câștigătoare mai mult. Asta nu înseamnă să le ții la nesfârșit. Înseamnă să ai un target pre-definit care e semnificativ mai mare decât riscul tău, și să nu ieși prematur fiindcă trade-ul pare întins. Mulți traderi prind 40% dintr-o mișcare și se întreabă de ce profit factor-ul lor e mediocru.
      </P>
      <H3>Verifică-ți R:R-ul înainte de fiecare trade</H3>
      <P>
        Înainte să intri în orice trade, calculează distanța de la intrare la stop loss și de la intrare la target. Dacă raportul nu e cel puțin 1.5:1, trade-ul are nevoie de o probabilitate mai mare ca să justifice luarea lui. Doar filtrând setup-urile cu R:R mic poți îmbunătăți semnificativ profit factor-ul fără să-ți schimbi deloc strategia. Măsurarea fiecărui trade în <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multipli</Link> face evaluarea asta automată.
      </P>

      <Divider />

      <Takeaways items={[
        'Win rate-ul fără context nu înseamnă nimic — un win rate de 70% poate fi tot o strategie pe pierdere.',
        'Profit Factor = Profit Brut / Pierdere Brută. Orice peste 1.5 e viabil; peste 2.0 e excelent.',
        'Cele mai profitabile strategii profesioniste au adesea win rate sub 50% fiindcă câștigă mult și pierd puțin.',
        'Îmbunătățirea profit factor-ului cere două discipline: să tai pierzătorii la stop-ul planificat și să lași câștigătorii să-și atingă target-ul.',
        'Calculează mereu profit factor cu minimum 30–50 de trade-uri. Eșantioanele mai mici nu sunt sigure statistic.',
      ]} />
    </BlogArticleLayout>
  );
}
