import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ExpectancyComparisonChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function TradingExpectancyExplainedRo() {
  return (
    <BlogArticleLayout
      slug="trading-expectancy-explained"
      lang="ro"
      title="Trading Expectancy Explicat: Formula Care Îți Spune Dacă Strategia Ta Funcționează"
      metaTitle="Trading Expectancy: Formula Care Dezvăluie Dacă Strategia Ta Chiar Funcționează | K.M.F."
      metaDescription="Expectancy e singurul număr care-ți spune dacă strategia ta de trading e profitabilă pe termen lung. Învață formula, cum o calculezi și ce înseamnă pentru trading-ul tău."
      date="3 februarie 2026"
      dateISO="2026-02-03"
      readTime="6 min citire"
      category="Statistici"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Ce este trading expectancy?', answer: 'Trading expectancy e suma medie pe care te aștepți să o câștigi sau să o pierzi per trade. Formula e: (Win Rate × Câștig Mediu) − (Loss Rate × Pierdere Medie). Un număr pozitiv înseamnă că strategia ta e profitabilă în timp.' },
        { question: 'Cum îmi calculez trading expectancy-ul?', answer: 'Din trading journal-ul tău, găsește win rate-ul, trade-ul mediu câștigător și trade-ul mediu pierzător. Înmulțește win rate cu câștigul mediu, scade (loss rate × pierdere medie). De exemplu: (0.55 × $200) − (0.45 × $120) = $56 per trade.' },
        { question: 'Ce înseamnă un expectancy bun?', answer: 'Orice expectancy pozitiv înseamnă că strategia ta funcționează pe termen lung. Cheia e să calculezi expectancy pe cel puțin 50-100 de trade-uri ca să obții un rezultat semnificativ statistic.' },
      ]}
    >
      <Intro>
        Ce-ar fi dacă ai putea ști, cu certitudine matematică, dacă strategia ta de trading va face bani pe termen lung — înainte să o tranzacționezi ani de zile? Expectancy e formula care îți dă exact asta. E singurul număr care rezumă profitabilitatea oricărei strategii, iar orice trader serios ar trebui să-l poată calcula din istoricul trade-urilor în câteva minute.
      </Intro>

      <StatsStrip items={[
        { value: 0.5, decimals: 1, suffix: 'R', label: <>per trade — pragul<br />pentru un edge puternic</> },
        { value: 100, decimals: 0, suffix: '+', label: <>trade-uri necesare<br />pentru un expectancy de încredere</> },
        { value: 50, decimals: 0, suffix: '%', label: <>win rate-ul e irelevant<br />fără contextul R:R</> },
      ]} />

      <H2>Ce Este Expectancy?</H2>
      <P>
        Expectancy e suma medie de bani pe care te poți aștepta să o câștigi (sau să o pierzi) per trade, în medie, pe un eșantion mare de trade-uri. Răspunde la întrebarea: dacă iau acest trade de o mie de ori, care e rezultatul mediu per trade?
      </P>
      <P>
        Un expectancy pozitiv înseamnă că strategia e profitabilă pe termen lung. Un expectancy negativ înseamnă că pierde bani pe termen lung, indiferent de rezultatele pe termen scurt. Mărimea expectancy-ului îți spune cât de robust e edge-ul.
      </P>

      <H2>Formula</H2>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Expectancy = (Win Rate × Câștig Mediu) − (Loss Rate × Pierdere Medie)</strong>
      </P>
      <P>
        Unde:
      </P>
      <Ul items={[
        'Win Rate = procentul de trade-uri profitabile (ex. 0.50 pentru 50%)',
        'Câștig Mediu = profitul mediu în dolari pe trade-urile câștigătoare',
        'Loss Rate = 1 − Win Rate (procentul de trade-uri pierzătoare)',
        'Pierdere Medie = pierderea medie în dolari pe trade-urile pierzătoare (folosește număr pozitiv)',
      ]} />

      <H2>Un Exemplu Lucrat</H2>
      <P>
        Să presupunem că ultimele tale 100 de trade-uri arată: 50 câștigătoare, 50 pierzătoare. Trade-ul tău mediu câștigător a făcut $200, iar cel mediu pierzător te-a costat $100.
      </P>
      <P>
        Expectancy = (0.50 × $200) − (0.50 × $100) = $100 − $50 = <strong style={{ color: '#00E676' }}>+$50 per trade</strong>
      </P>
      <P>
        Asta înseamnă că, în medie, fiecare trade pe care îl iei cu această strategie e de așteptat să aducă $50. Pe 200 de trade-uri, ăsta e un profit așteptat de $10.000. Numărul nu va fi exact ăla — varianța face ca rezultatele să fluctueze — dar valoarea așteptată e un ghid de încredere pe termen lung.
      </P>

      <Divider />

      <H2>Expectancy Pozitiv vs Negativ</H2>
      <H3>Expectancy Pozitiv</H3>
      <P>
        Orice strategie cu expectancy pozitiv va face bani pe un eșantion suficient de mare de trade-uri, presupunând că expectancy-ul rămâne stabil și execuți constant. Chiar și un expectancy pozitiv mic — să zicem, $5 per trade — se compune semnificativ pe sute de trade-uri.
      </P>
      <H3>Expectancy Negativ</H3>
      <P>
        O strategie cu expectancy negativ va pierde bani în timp, garantat. Nu contează cât de sofisticat e money management-ul, sau cât de disciplinată e execuția. Nicio tehnică de position sizing nu poate transforma un expectancy negativ într-un sistem profitabil. Singurele fix-uri sunt să îmbunătățești win rate-ul, să îmbunătățești mărimea câștigului mediu sau să reduci mărimea pierderii medii — iar o fundație solidă ca <Link to="/blog/1-percent-risk-rule">regula de 1% risc</Link> te asigură că supraviețuiești destul cât să găsești acele fix-uri.
      </P>
      <Callout title="Principiul Cazinoului" color="#4FC3F7">
        Cazinourile fac bani nu fiindcă fiecare jucător pierde fiecare pariu, ci fiindcă casa are un expectancy ușor pozitiv la fiecare joc. Pe milioane de pariuri, matematica e inevitabilă. Trading-ul funcționează la fel — dacă ai expectancy pozitiv și iei destule trade-uri, profitabilitatea e o consecință matematică, nu o chestiune de noroc.
      </Callout>

      <H2>Expectancy pe Diferite Strategii</H2>
      <Table
        headers={['Win Rate', 'Câștig Mediu', 'Pierdere Medie', 'Expectancy', 'Evaluare']}
        rows={[
          ['60%', '$150', '$100', { value: '+$50/trade', color: 'green' }, { value: 'Bun — abordare echilibrată', color: 'green' }],
          ['40%', '$300', '$100', { value: '+$80/trade', color: 'green' }, { value: 'Excelent — R:R mare, win rate mic', color: 'green' }],
          ['70%', '$80', '$100', { value: '−$4/trade', color: 'red' }, { value: 'Pierzător — comisioanele înrăutățesc', color: 'red' }],
          ['35%', '$250', '$100', { value: '+$22.50/trade', color: 'cyan' }, { value: 'Viabil — profil trend following', color: 'cyan' }],
          ['55%', '$120', '$150', { value: '−$1.50/trade', color: 'red' }, { value: 'Ușor negativ — îmbunătățește R:R', color: 'red' }],
          ['50%', '$200', '$100', { value: '+$50/trade', color: 'green' }, { value: 'Bun — R:R standard 2:1', color: 'green' }],
        ]}
      />

      <ExpectancyComparisonChart />

      <P>
        Observă rândul cu 70% win rate: deși câștigă 7 din 10 trade-uri, strategia pierde bani fiindcă pierderile medii depășesc câștigurile medii. Asta e iluzia clasică a win rate-ului — iar expectancy o dezvăluie imediat. Pentru o privire mai amănunțită asupra felului în care interacționează win rate-ul și profit factor-ul, vezi ghidul nostru despre <Link to="/blog/profit-factor-vs-win-rate">profit factor vs win rate</Link>.
      </P>

      <H2>Expectancy în Termeni de R-Multiple</H2>
      <P>
        Expectancy poate fi exprimat și în termeni de R-multiple, ceea ce e mai util pentru a compara strategii pe diferite mărimi de cont și de poziție:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Expectancy (R) = (Win Rate × Câștig Mediu R) − (Loss Rate × 1)</strong>
      </P>
      <P>
        Asta se simplifică fiindcă o pierdere completă e mereu −1R prin definiție. Exemplu: 50% win rate, câștigul mediu e +2R. Expectancy = (0.50 × 2) − (0.50 × 1) = 1.0 − 0.5 = <strong style={{ color: '#00E676' }}>+0.5R per trade</strong>. Asta înseamnă că pentru fiecare dolar riscat, câștigi în medie 50 de cenți. Dacă R-multiple-urile sunt noi pentru tine, <Link to="/blog/r-multiple-explained">ghidul nostru R-multiple</Link> le explică pas cu pas.
      </P>

      <H2>Cum Îți Calculezi Propriul Expectancy</H2>
      <P>
        Scoate-ți istoricul trade-urilor din journal și calculează:
      </P>
      <Ul items={[
        'Total trade-uri, câștiguri și pierderi',
        'Profitul mediu în dolari pe trade-urile câștigătoare',
        'Pierderea medie în dolari pe trade-urile pierzătoare',
        'Aplică formula: Expectancy = (Win Rate × Câștig Mediu) − (Loss Rate × Pierdere Medie)',
      ]} />

      <H2>Ce Înseamnă un Expectancy Bun?</H2>
      <P>
        Orice număr pozitiv e viabil. Totuși, marja peste zero contează fiindcă trading-ul real implică costuri — spread-uri, comisioane și slippage. Un expectancy pozitiv foarte mic (ex. $2 per trade) poate fi mâncat de aceste costuri. În practică:
      </P>
      <Ul items={[
        'Expectancy pozitiv de orice mărime (net de costuri) — strategia e viabilă',
        'Expectancy peste +0.3R per trade — edge solid cu marjă pentru costuri',
        'Expectancy peste +0.5R per trade — edge puternic, fundație bună',
        'Expectancy peste +1.0R per trade — excelent, dar verifică pe un eșantion mare',
      ]} />

      <H2>Importanța Mărimii Eșantionului</H2>
      <P>
        Expectancy calculat din 10 trade-uri nu înseamnă nimic. Chiar și 20 sau 30 de trade-uri pot fi distorsionate puternic de câteva rezultate extreme. Ca minim, folosește 30 până la 50 de trade-uri pentru o estimare inițială și recunoaște că ai nevoie de 100 sau mai multe pentru o cifră de încredere statistic. Expectancy-ul va fluctua pe măsură ce adaugi mai multe trade-uri — și asta e normal. Urmărește numărul să se stabilizeze în timp.
      </P>

      <Takeaways items={[
        'Expectancy = (Win Rate × Câștig Mediu) − (Loss Rate × Pierdere Medie). Un număr pozitiv înseamnă profitabilitate pe termen lung.',
        'Expectancy-ul negativ nu poate fi reparat doar prin money management — strategia în sine trebuie să se îmbunătățească.',
        'Expectancy în termeni de R-multiple permite comparația pe diferite mărimi de cont: (Win Rate × Câștig Mediu R) − (Loss Rate × 1).',
        'Un win rate de 70% cu câștiguri mici și pierderi mari produce expectancy negativ — win rate-ul singur nu e suficient.',
        'Minimum 30–50 de trade-uri pentru calculul inițial; 100+ pentru încredere statistică.',
        'Orice expectancy pozitiv net de costuri e o strategie viabilă — optimizează de acolo.',
      ]} />
    </BlogArticleLayout>
  );
}
