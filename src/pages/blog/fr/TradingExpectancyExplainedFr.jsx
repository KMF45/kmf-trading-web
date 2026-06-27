import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { ExpectancyComparisonChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function TradingExpectancyExplainedFr() {
  return (
    <BlogArticleLayout
      slug="trading-expectancy-explained"
      lang="fr"
      title="L'espérance en trading expliquée : la formule qui dit si ta stratégie fonctionne"
      metaTitle="Espérance en trading : la formule qui révèle si ta stratégie fonctionne vraiment | K.M.F."
      metaDescription="L'espérance est le seul nombre qui te dit si ta stratégie est rentable à long terme. Apprends la formule, comment la calculer et ce qu'elle signifie pour ton trading."
      date="3 février 2026"
      dateISO="2026-02-03"
      readTime="6 min de lecture"
      category="Statistiques"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce que l\'espérance en trading ?', answer: 'L\'espérance en trading est le montant moyen que tu peux espérer gagner ou perdre par trade. La formule est : (Win Rate × Gain moyen) − (Taux de perte × Perte moyenne). Un nombre positif signifie que ta stratégie est rentable dans le temps.' },
        { question: 'Comment calculer mon espérance de trading ?', answer: 'À partir de ton journal, trouve ton win rate, ton gain moyen et ta perte moyenne. Multiplie le win rate par le gain moyen, soustrais (taux de perte × perte moyenne). Par exemple : (0,55 × 200 $) − (0,45 × 120 $) = 56 $ par trade.' },
        { question: 'Qu\'est-ce qu\'une bonne espérance de trading ?', answer: 'Toute espérance positive signifie que ta stratégie fonctionne à long terme. L\'essentiel est de calculer l\'espérance sur au moins 50 à 100 trades pour obtenir un résultat statistiquement significatif.' },
      ]}
    >
      <Intro>
        Et si tu pouvais savoir, avec une certitude mathématique, si ta stratégie de trading gagnera de l'argent à long terme — avant de l'avoir tradée pendant des années ? L'espérance est la formule qui te donne exactement ça. C'est le nombre unique qui résume la rentabilité de n'importe quelle stratégie, et tout trader sérieux devrait pouvoir la calculer à partir de son historique en quelques minutes.
      </Intro>

      <StatsStrip items={[
        { value: 0.5, decimals: 1, suffix: 'R', label: <>par trade — seuil<br />d'un edge solide</> },
        { value: 100, decimals: 0, suffix: '+', label: <>trades nécessaires<br />pour une espérance fiable</> },
        { value: 50, decimals: 0, suffix: '%', label: <>le win rate ne dit rien<br />sans le contexte du R:R</> },
      ]} />

      <H2>Qu'est-ce que l'espérance ?</H2>
      <P>
        L'espérance est le montant moyen que tu peux espérer gagner (ou perdre) par trade, en moyenne, sur un grand échantillon de trades. Elle répond à la question : si je prends ce trade mille fois, quel est le résultat moyen par trade ?
      </P>
      <P>
        Une espérance positive signifie que la stratégie est rentable à long terme. Une espérance négative signifie qu'elle perd de l'argent à long terme, peu importe les résultats à court terme. L'ampleur de l'espérance te dit à quel point l'edge est robuste.
      </P>

      <H2>La formule</H2>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Espérance = (Win Rate × Gain moyen) − (Taux de perte × Perte moyenne)</strong>
      </P>
      <P>
        Où :
      </P>
      <Ul items={[
        'Win Rate = pourcentage de trades rentables (ex. : 0,50 pour 50 %)',
        'Gain moyen = profit moyen en dollars sur les trades gagnants',
        'Taux de perte = 1 − Win Rate (pourcentage de trades perdants)',
        'Perte moyenne = perte moyenne en dollars sur les trades perdants (utilise un nombre positif)',
      ]} />

      <H2>Un exemple concret</H2>
      <P>
        Suppose que tes 100 derniers trades montrent : 50 gagnants, 50 perdants. Ton trade gagnant moyen a rapporté 200 $ et ton trade perdant moyen t'a coûté 100 $.
      </P>
      <P>
        Espérance = (0,50 × 200 $) − (0,50 × 100 $) = 100 $ − 50 $ = <strong style={{ color: '#00E676' }}>+50 $ par trade</strong>
      </P>
      <P>
        Cela signifie qu'en moyenne, chaque trade que tu prends avec cette stratégie devrait rapporter 50 $. Sur 200 trades, c'est 10 000 $ de profit attendu. Le nombre ne sera pas exactement celui-là — la variance fait fluctuer les résultats — mais la valeur attendue est un guide fiable à long terme.
      </P>

      <Divider />

      <H2>Espérance positive vs négative</H2>
      <H3>Espérance positive</H3>
      <P>
        Toute stratégie à espérance positive gagnera de l'argent sur un échantillon de trades suffisamment grand, à condition que l'espérance reste stable et que tu exécutes de façon régulière. Même une petite espérance positive — disons 5 $ par trade — se compose de façon significative sur des centaines de trades.
      </P>
      <H3>Espérance négative</H3>
      <P>
        Une stratégie à espérance négative perdra de l'argent dans le temps, c'est garanti. Peu importe la sophistication de la gestion de capital, ou la discipline de l'exécution. Aucune technique de dimensionnement ne peut convertir une espérance négative en système rentable. Les seules solutions sont d'améliorer le win rate, d'augmenter la taille du gain moyen ou de réduire la perte moyenne — et une base solide comme la <Link to="/blog/1-percent-risk-rule">règle des 1 %</Link> garantit que tu survis assez longtemps pour trouver ces solutions.
      </P>
      <Callout title="Le principe du casino" color="#4FC3F7">
        Les casinos gagnent de l'argent non pas parce que chaque joueur perd chaque pari, mais parce que la maison a une légère espérance positive sur chaque jeu. Sur des millions de paris, les maths sont inévitables. Le trading fonctionne pareil — si tu as une espérance positive et que tu prends assez de trades, la rentabilité est une conséquence mathématique, pas une question de chance.
      </Callout>

      <H2>L'espérance selon différentes stratégies</H2>
      <Table
        headers={['Win Rate', 'Gain moyen', 'Perte moyenne', 'Espérance', 'Évaluation']}
        rows={[
          ['60 %', '150 $', '100 $', { value: '+50 $/trade', color: 'green' }, { value: 'Bon — approche équilibrée', color: 'green' }],
          ['40 %', '300 $', '100 $', { value: '+80 $/trade', color: 'green' }, { value: 'Excellent — R:R élevé, win rate bas', color: 'green' }],
          ['70 %', '80 $', '100 $', { value: '-4 $/trade', color: 'red' }, { value: 'Perdant — les commissions aggravent', color: 'red' }],
          ['35 %', '250 $', '100 $', { value: '+22,50 $/trade', color: 'cyan' }, { value: 'Viable — profil suivi de tendance', color: 'cyan' }],
          ['55 %', '120 $', '150 $', { value: '-1,50 $/trade', color: 'red' }, { value: 'Légèrement négatif — améliore le R:R', color: 'red' }],
          ['50 %', '200 $', '100 $', { value: '+50 $/trade', color: 'green' }, { value: 'Bon — R:R standard 2:1', color: 'green' }],
        ]}
      />

      <ExpectancyComparisonChart />

      <P>
        Remarque la ligne à 70 % de win rate : malgré 7 trades gagnants sur 10, la stratégie perd de l'argent parce que les pertes moyennes dépassent les gains moyens. C'est l'illusion classique du win rate — et l'espérance la révèle immédiatement. Pour creuser comment win rate et profit factor interagissent, vois notre guide sur le <Link to="/blog/profit-factor-vs-win-rate">profit factor vs win rate</Link>.
      </P>

      <H2>L'espérance en termes de R-multiple</H2>
      <P>
        L'espérance peut aussi s'exprimer en termes de R-multiple, ce qui est plus utile pour comparer des stratégies entre différentes tailles de compte et de position :
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Espérance (R) = (Win Rate × Gain moyen en R) − (Taux de perte × 1)</strong>
      </P>
      <P>
        Ça se simplifie parce qu'une perte complète est toujours −1R par définition. Exemple : 50 % de win rate, gain moyen de +2R. Espérance = (0,50 × 2) − (0,50 × 1) = 1,0 − 0,5 = <strong style={{ color: '#00E676' }}>+0,5R par trade</strong>. Cela signifie que pour chaque dollar risqué, tu gagnes en moyenne 50 cents. Si les R-multiples sont nouveaux pour toi, notre <Link to="/blog/r-multiple-explained">guide du R-multiple</Link> le décompose étape par étape.
      </P>

      <H2>Comment calculer ta propre espérance</H2>
      <P>
        Sors ton historique de trades de ton journal et calcule :
      </P>
      <Ul items={[
        'Total des trades, gains et pertes',
        'Profit moyen en dollars sur les trades gagnants',
        'Perte moyenne en dollars sur les trades perdants',
        'Applique la formule : Espérance = (Win Rate × Gain moyen) − (Taux de perte × Perte moyenne)',
      ]} />

      <H2>Qu'est-ce qu'une bonne espérance ?</H2>
      <P>
        Tout nombre positif est viable. Cependant, la marge au-dessus de zéro compte parce que le trading réel implique des coûts — spreads, commissions et slippage. Une très petite espérance positive (ex. : 2 $ par trade) peut être effacée par ces coûts. En pratique :
      </P>
      <Ul items={[
        'Espérance positive de toute taille (nette de coûts) — la stratégie est viable',
        'Espérance au-dessus de +0,3R par trade — edge solide avec marge pour les coûts',
        'Espérance au-dessus de +0,5R par trade — edge fort, bonne base',
        'Espérance au-dessus de +1,0R par trade — excellent, mais vérifie avec un grand échantillon',
      ]} />

      <H2>L'importance de la taille d'échantillon</H2>
      <P>
        Une espérance calculée sur 10 trades n'a aucun sens. Même 20 ou 30 trades peuvent être fortement faussés par quelques résultats extrêmes. Au minimum, utilise 30 à 50 trades pour une première estimation, et reconnais qu'il faut 100 trades ou plus pour un chiffre statistiquement fiable. L'espérance fluctuera à mesure que tu ajoutes des trades — et c'est normal. Surveille la stabilisation du nombre dans le temps.
      </P>

      <Takeaways items={[
        'Espérance = (Win Rate × Gain moyen) − (Taux de perte × Perte moyenne). Un nombre positif signifie une rentabilité à long terme.',
        'Une espérance négative ne peut pas se corriger par la seule gestion de capital — la stratégie elle-même doit s\'améliorer.',
        'L\'espérance en termes de R-multiple permet la comparaison entre tailles de compte : (Win Rate × Gain moyen en R) − (Taux de perte × 1).',
        'Un win rate de 70 % avec de petits gains et de grosses pertes produit une espérance négative — le win rate seul ne suffit pas.',
        'Minimum 30 à 50 trades pour un calcul initial ; 100+ pour une fiabilité statistique.',
        'Toute espérance positive nette de coûts est une stratégie viable — optimise à partir de là.',
      ]} />
    </BlogArticleLayout>
  );
}
