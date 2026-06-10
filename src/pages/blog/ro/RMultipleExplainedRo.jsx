import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { RMultipleDistribution } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function RMultipleExplainedRo() {
  return (
    <BlogArticleLayout
      slug="r-multiple-explained"
      lang="ro"
      title="R-Multiple Explicat: Cum Măsori Calitatea unui Trade (Nu Doar Profitul)"
      metaTitle="R-Multiple: Singura Metrică Ce Separă Traderii Câștigători de Cei Pierzători | K.M.F."
      metaDescription="R-multiple e cel mai onest mod de a-ți evalua trade-urile. Învață ce înseamnă R, cum îl calculezi și de ce un trade de -$50 poate fi mai bun decât unul de +$200."
      date="20 ianuarie 2026"
      dateISO="2026-01-20"
      readTime="6 min citire"
      category="Statistici"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst', category: 'Improvement' },
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Ce este R-multiple în trading?', answer: 'R-multiple măsoară performanța unui trade raportat la riscul inițial (R). Un trade care riscă $100 și aduce $300 profit are un R-multiple de +3R. Un trade care pierde $100 e -1R. Normalizează rezultatele indiferent de mărimea poziției.' },
        { question: 'Cum calculez R-multiple?', answer: 'R-Multiple = P/L Real ÷ Riscul Inițial (R). Pentru trade-urile long, un rezultat pozitiv înseamnă profit. Ideea de bază e că fiecare trade e măsurat în unități de risc, nu în dolari.' },
        { question: 'Ce înseamnă un R-multiple bun?', answer: 'Cei mai mulți traderi profitabili țintesc un R-multiple mediu peste +0.5R pe toate trade-urile. Trade-urile câștigătoare individuale de +2R până la +3R sunt considerate excelente. Metrica cheie e R-ul tău mediu pe un eșantion mare de trade-uri.' },
      ]}
    >
      <Intro>
        Cei mai mulți traderi își evaluează trade-urile uitându-se la profitul sau pierderea în dolari. Dar P/L-ul în dolari e una dintre cele mai puțin informative metrici pe care le ai la dispoziție. Un câștig de $500 poate fi un trade groaznic. O pierdere de $50 poate fi un trade excelent. R-multiple e metrica ce dezvăluie adevărul — măsoară nu cât ai câștigat sau pierdut, ci cât de bine ai executat raportat la riscul pe care l-ai acceptat.
      </Intro>

      <StatsStrip items={[
        { value: 0.5, decimals: 1, suffix: 'R', label: <>target mediu per trade<br />pentru un edge viabil</> },
        { value: 2, decimals: 0, suffix: 'R', label: <>target planificat tipic<br />pe un setup 1:2 R:R</> },
        { value: 30, decimals: 0, suffix: '+', label: <>trade-uri minimum<br />înainte să judeci o strategie</> },
      ]} />

      <H2>Ce Este R?</H2>
      <P>
        R vine de la „Risc" — mai exact, suma exactă de bani pe care ai pus-o la risc când ai intrat în trade. R e definit de <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss-ul</Link> tău: e distanța de la intrarea ta la stop loss, înmulțită cu position size-ul.
      </P>
      <P>
        Dacă ai intrat într-un trade cu un stop de $150 (adică dacă trade-ul merge complet împotriva ta și atinge stop-ul, pierzi $150), atunci R = $150 pentru acel trade. Tot restul e măsurat raportat la acea cifră.
      </P>
      <Callout title="R e mereu specific trade-ului" color="#4FC3F7">
        R nu e o sumă fixă în dolari. Se schimbă la fiecare trade fiindcă depinde de distanța stop-ului și de position size. Două trade-uri pot fi amândouă „1% risc" dar să aibă valori R diferite dacă position size-urile diferă — deși în practică, dacă urmezi un risk management consistent, R-ul tău va fi similar de la un trade la altul.
      </Callout>

      <H2>Cum Calculezi R-Multiple</H2>
      <P>
        Odată ce știi R pentru un trade, calcularea R-multiple e simplă:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>R-Multiple = P/L Real ÷ Riscul Inițial (R)</strong>
      </P>
      <P>
        Asta îți dă un număr care exprimă rezultatul în unități din riscul tău inițial. Exemple:
      </P>
      <Ul items={[
        'Riscat $100, câștigat $200 → R-multiple = +2R (ai făcut dublu față de cât ai riscat)',
        'Riscat $100, pierdut $100 (stop atins complet) → R-multiple = -1R (pierdere completă standard)',
        'Riscat $100, pierdut $50 (mutat stop-ul la breakeven apoi pierdere parțială) → R-multiple = -0.5R',
        'Riscat $100, câștigat $350 → R-multiple = +3.5R (trade puternic, target depășit)',
        'Riscat $100, câștigat $40 (luat profit prea devreme) → R-multiple = +0.4R (sub plan)',
      ]} />

      <H2>De Ce R-Multiple E Mai Bun Decât P/L-ul în Dolari</H2>
      <H3>Normalizează între mărimi de cont diferite</H3>
      <P>
        Un trader cu un cont de $5,000 și un trader cu un cont de $500,000 nu își pot compara util câștigurile în dolari. Dar își pot compara R-multiplii. Un trade de +2R e un trade de +2R indiferent de mărimea contului. Asta face din R-multiple limbajul universal al evaluării trade-urilor.
      </P>
      <H3>Separă procesul de rezultat</H3>
      <P>
        Ia în calcul două scenarii. În primul, iei un trade care îți atinge perfect target-ul de 3R. Câștigi +3R. În al doilea, iei un trade fără target clar, nimerești din noroc o mișcare mare, și ieși cu +3R. Rezultatul în dolari e identic — dar primul a fost un trade excelent, iar al doilea a fost unul norocos.
      </P>
      <P>
        R-multiple combinat cu evaluarea calității execuției îți spune dacă ți-ai urmat planul. P/L-ul în dolari de unul singur nu poate să-ți spună asta.
      </P>
      <H3>Dezvăluie ieșirile premature și pierderile întinse</H3>
      <P>
        Dacă trade-ul tău planificat avea un target de 2R dar l-ai închis la +0.6R fiindcă te-ai emoționat, R-multiple înregistrează exact acea lipsă. Dacă ai lăsat un trade să treacă de stop și l-ai închis la -1.8R în loc de -1R, R-multiple arată cedarea de disciplină. Sumele în dolari maschează aceste abateri; R-multiplii le scot la iveală.
      </P>

      <Divider />

      <H2>Ce Înseamnă un R-Multiple Mediu Bun?</H2>
      <P>
        R-multiple-ul mediu (numit uneori expectancy în termeni de R) e cea mai importantă metrică de performanță pentru strategia ta. Răspunde la întrebarea: în medie, cât câștigi per dolar riscat, per trade?
      </P>
      <Table
        headers={['Win Rate', 'R-Win Mediu', 'R-Loss Mediu', 'Expectancy (R)']}
        rows={[
          ['50%', '+2.0R', '-1.0R', { value: '+0.50R per trade', color: 'green' }],
          ['40%', '+3.0R', '-1.0R', { value: '+0.60R per trade', color: 'green' }],
          ['60%', '+1.5R', '-1.0R', { value: '+0.50R per trade', color: 'green' }],
          ['35%', '+2.0R', '-1.0R', { value: '+0.05R per trade (abia viabil)', color: 'gold' }],
          ['70%', '+0.8R', '-1.0R', { value: '-0.04R per trade (pe pierdere)', color: 'red' }],
          ['45%', '+1.8R', '-1.0R', { value: '+0.26R per trade', color: 'cyan' }],
        ]}
      />

      <RMultipleDistribution />

      <P>
        Orice expectancy pozitiv în termeni de R e o strategie viabilă. Un expectancy peste +0.5R per trade e considerat bun. Observă că exemplul cu 70% win rate din tabel are expectancy negativ — fiindcă câștigătorii medii sunt mai mici decât pierderile medii.
      </P>

      <H2>Cum Folosești R-Multiple ca Să-ți Evaluezi Strategia</H2>
      <P>
        După 30 sau mai multe trade-uri, calculează-ți R-multiple-ul mediu. Dacă e negativ, strategia ta pierde indiferent cum se simte în termeni de dolari. Dacă e pozitiv dar sub +0.2R, strategia e marginal viabilă dar fragilă — slippage-ul, spread-urile și comisioanele o pot șterge.
      </P>
      <P>
        Și mai util, poți segmenta R-multiple pe tip de setup, instrument, sesiune, sau zi a săptămânii. Dacă setup-urile tale din sesiunea London au în medie +0.8R dar cele din New York au în medie -0.3R, ăsta e un insight pe care poți acționa — concentrează-te pe sesiunile London și elimină sau fă paper-trading pe New York până identifici problema.
      </P>

      <H3>Legătura cu Expectancy</H3>
      <P>
        R-multiple per trade, mediat pe istoricul tău de trade-uri, e fundamentul <Link to="/blog/trading-expectancy-explained" className="text-kmf-accent hover:underline">calculului de expectancy</Link> al strategiei tale. Expectancy îți spune valoarea așteptată a fiecărui trade pe care îl iei. Stăpânirea gândirii în R-multiple e primul pas spre înțelegerea profundă a expectancy-ului. Combinat cu <Link to="/blog/profit-factor-vs-win-rate" className="text-kmf-accent hover:underline">profit factor</Link>, aceste metrici îți dau imaginea completă a viabilității strategiei tale.
      </P>

      <Takeaways items={[
        'R e suma pe care o riști per trade, definită de distanța stop loss-ului și de position size.',
        'R-multiple = P/L Real împărțit la riscul tău inițial (R). Exprimă rezultatul în unități de risc.',
        'R-multiple e superior P/L-ului în dolari fiindcă normalizează între mărimi de cont și position size-uri diferite.',
        'Un R-multiple mediu pozitiv pe istoricul tău de trade-uri înseamnă că strategia ta are edge — indiferent de sumele în dolari.',
        'Segmentarea R-multiple pe setup, instrument, sau sesiune dezvăluie unde stă edge-ul tău real.',
        'Un R-multiple mediu peste +0.5R e în general considerat o strategie bună.',
      ]} />
    </BlogArticleLayout>
  );
}
