import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { RMultipleDistribution } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function RMultipleExplainedFr() {
  return (
    <BlogArticleLayout
      slug="r-multiple-explained"
      lang="fr"
      title="Le R-multiple expliqué : comment mesurer la qualité d'un trade (pas juste le profit)"
      metaTitle="R-multiple : la métrique qui sépare les traders gagnants des perdants | K.M.F."
      metaDescription="Le R-multiple est la façon la plus honnête d'évaluer tes trades. Apprends ce que signifie R, comment le calculer et pourquoi un trade à −50 $ peut être meilleur qu'un trade à +200 $."
      date="20 janvier 2026"
      dateISO="2026-01-20"
      readTime="6 min de lecture"
      category="Statistiques"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst', category: 'Improvement' },
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce que le R-multiple en trading ?', answer: 'Le R-multiple mesure la performance d\'un trade par rapport au risque initial (R). Un trade qui risque 100 $ et profite de 300 $ a un R-multiple de +3R. Un trade qui perd 100 $ est à −1R. Il normalise les résultats entre différentes tailles de position.' },
        { question: 'Comment calculer le R-multiple ?', answer: 'R-multiple = (Prix de sortie − Prix d\'entrée) / (Prix d\'entrée − Prix du stop loss). Pour les trades long, un résultat positif signifie un profit. L\'essentiel est que chaque trade est mesuré en unités de risque, pas en dollars.' },
        { question: 'Qu\'est-ce qu\'un bon R-multiple ?', answer: 'La plupart des traders rentables visent un R-multiple moyen au-dessus de +0,5R sur tous les trades. Des trades gagnants individuels de +2R à +3R sont considérés comme excellents. La métrique clé est ton R moyen sur un grand échantillon de trades.' },
      ]}
    >
      <Intro>
        La plupart des traders évaluent leurs trades en regardant le profit ou la perte en dollars. Mais le P/L en dollars est l'une des métriques les moins informatives à ta disposition. Un gain de 500 $ peut être un trade affreux. Une perte de 50 $ peut être un excellent trade. Le R-multiple est la métrique qui révèle la vérité — elle ne mesure pas ce que tu as gagné ou perdu, mais à quel point tu as bien exécuté par rapport au risque que tu as accepté.
      </Intro>

      <StatsStrip items={[
        { value: 0.5, decimals: 1, suffix: 'R', label: <>cible moyenne par trade<br />pour un edge viable</> },
        { value: 2, decimals: 0, suffix: 'R', label: <>cible planifiée typique<br />sur un setup R:R 1:2</> },
        { value: 30, decimals: 0, suffix: '+', label: <>trades minimum<br />avant de juger une stratégie</> },
      ]} />

      <H2>Qu'est-ce que R ?</H2>
      <P>
        R signifie « Risque » — précisément, le montant exact que tu as mis en jeu en entrant dans le trade. R est défini par ton <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss</Link> : c'est la distance de ton entrée à ton stop loss, multipliée par ta taille de position.
      </P>
      <P>
        Si tu es entré dans un trade avec un stop de 150 $ (c'est-à-dire que si le trade tourne entièrement contre toi et touche le stop, tu perds 150 $), alors R = 150 $ pour ce trade. Tout le reste se mesure par rapport à ce nombre.
      </P>
      <Callout title="R est toujours spécifique au trade" color="#4FC3F7">
        R n'est pas un montant fixe en dollars. Il change à chaque trade parce qu'il dépend de la distance de ton stop et de ta taille de position. Deux trades peuvent tous deux être à « 1 % de risque » mais avoir des valeurs de R différentes si les tailles de position diffèrent — bien qu'en pratique, si tu suis une gestion du risque régulière, ton R sera similaire d'un trade à l'autre.
      </Callout>

      <H2>Comment calculer le R-multiple</H2>
      <P>
        Une fois que tu connais R pour un trade, calculer le R-multiple est simple :
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>R-multiple = P/L réel ÷ Risque initial (R)</strong>
      </P>
      <P>
        Ça te donne un nombre qui exprime le résultat en unités de ton risque d'origine. Exemples :
      </P>
      <Ul items={[
        'Risqué 100 $, gagné 200 $ → R-multiple = +2R (tu as gagné le double de ton risque)',
        'Risqué 100 $, perdu 100 $ (stop complet touché) → R-multiple = −1R (perte complète standard)',
        'Risqué 100 $, perdu 50 $ (stop déplacé au breakeven puis perte partielle) → R-multiple = −0,5R',
        'Risqué 100 $, gagné 350 $ → R-multiple = +3,5R (trade fort, cible dépassée)',
        'Risqué 100 $, gagné 40 $ (profit pris trop tôt) → R-multiple = +0,4R (en dessous du plan)',
      ]} />

      <H2>Pourquoi le R-multiple est meilleur que le P/L en dollars</H2>
      <H3>Il normalise entre tailles de compte</H3>
      <P>
        Un trader avec un compte de 5 000 $ et un trader avec un compte de 500 000 $ ne peuvent pas comparer utilement leurs gains en dollars. Mais ils peuvent comparer leurs R-multiples. Un trade +2R est un trade +2R quelle que soit la taille du compte. Cela fait du R-multiple le langage universel de l'évaluation des trades.
      </P>
      <H3>Il sépare le processus du résultat</H3>
      <P>
        Considère deux scénarios. Dans le premier, tu prends un trade qui atteint parfaitement ta cible de 3R. Tu gagnes +3R. Dans le second, tu prends un trade sans cible claire, tu tombes par chance sur un grand mouvement et tu sors à +3R. Le résultat en dollars est identique — mais le premier était un excellent trade et le second un coup de chance.
      </P>
      <P>
        Le R-multiple combiné à ta revue de qualité d'exécution te dit si tu as suivi ton plan. Le P/L en dollars seul ne peut pas te le dire.
      </P>
      <H3>Il révèle les sorties prématurées et les pertes prolongées</H3>
      <P>
        Si ton trade planifié avait une cible de 2R mais que tu as clôturé à +0,6R parce que tu as eu peur, le R-multiple enregistre exactement ce manque. Si tu as laissé un trade dépasser ton stop et l'as clôturé à −1,8R au lieu de −1R, le R-multiple montre le manquement de discipline. Les montants en dollars déguisent ces écarts ; les R-multiples les exposent.
      </P>

      <Divider />

      <H2>Qu'est-ce qu'un bon R-multiple moyen ?</H2>
      <P>
        Le R-multiple moyen (parfois appelé espérance en termes de R) est la métrique de performance la plus importante de ta stratégie. Elle répond : en moyenne, combien gagnes-tu par dollar risqué, par trade ?
      </P>
      <Table
        headers={['Win Rate', 'R-Gain moyen', 'R-Perte moyenne', 'Espérance (R)']}
        rows={[
          ['50 %', '+2,0R', '-1,0R', { value: '+0,50R par trade', color: 'green' }],
          ['40 %', '+3,0R', '-1,0R', { value: '+0,60R par trade', color: 'green' }],
          ['60 %', '+1,5R', '-1,0R', { value: '+0,50R par trade', color: 'green' }],
          ['35 %', '+2,0R', '-1,0R', { value: '+0,05R par trade (à peine viable)', color: 'gold' }],
          ['70 %', '+0,8R', '-1,0R', { value: '-0,04R par trade (perdant)', color: 'red' }],
          ['45 %', '+1,8R', '-1,0R', { value: '+0,26R par trade', color: 'cyan' }],
        ]}
      />

      <RMultipleDistribution />

      <P>
        Toute espérance positive en termes de R est une stratégie viable. Une espérance au-dessus de +0,5R par trade est considérée comme bonne. Remarque que l'exemple à 70 % de win rate dans le tableau a une espérance négative — parce que les gagnants moyens sont plus petits que les pertes moyennes.
      </P>

      <H2>Utiliser le R-multiple pour évaluer ta stratégie</H2>
      <P>
        Après 30 trades ou plus, calcule ton R-multiple moyen. S'il est négatif, ta stratégie perd quel que soit le ressenti en dollars. S'il est positif mais en dessous de +0,2R, la stratégie est marginalement viable mais fragile — slippage, spreads et commissions peuvent l'effacer.
      </P>
      <P>
        Plus utile encore, tu peux segmenter le R-multiple par type de setup, instrument, session ou jour de la semaine. Si tes setups de session de Londres font en moyenne +0,8R mais tes setups de New York font −0,3R, c'est un insight exploitable — concentre-toi sur les sessions de Londres et élimine ou trade en démo New York jusqu'à ce que tu identifies le problème.
      </P>

      <H3>Le lien avec l'espérance</H3>
      <P>
        Le R-multiple par trade, moyenné sur ton historique, est la base du calcul de l'<Link to="/blog/trading-expectancy-explained" className="text-kmf-accent hover:underline">espérance</Link> de ta stratégie. L'espérance te dit la valeur attendue de chaque trade que tu prends. Maîtriser la pensée en R-multiple est la première étape pour comprendre l'espérance en profondeur. Combinées au <Link to="/blog/profit-factor-vs-win-rate" className="text-kmf-accent hover:underline">profit factor</Link>, ces métriques te donnent l'image complète de la viabilité de ta stratégie.
      </P>

      <Takeaways items={[
        'R est le montant que tu risques par trade, défini par la distance de ton stop loss et ta taille de position.',
        'R-multiple = P/L réel divisé par ton risque initial (R). Il exprime le résultat en unités de risque.',
        'Le R-multiple est supérieur au P/L en dollars parce qu\'il normalise entre tailles de compte et de position.',
        'Un R-multiple moyen positif sur ton historique signifie que ta stratégie a un edge — peu importe les montants en dollars.',
        'Segmenter le R-multiple par setup, instrument ou session révèle où se trouve ton vrai edge.',
        'Un R-multiple moyen au-dessus de +0,5R est généralement considéré comme une bonne stratégie.',
      ]} />
    </BlogArticleLayout>
  );
}
