import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function TenQuestionsAfterEveryTradeFr() {
  return (
    <BlogArticleLayout
      slug="10-questions-after-every-trade"
      lang="fr"
      title="10 questions que chaque trader devrait se poser après chaque trade"
      metaTitle="10 questions post-trade : l'habitude de revue qui transforme ton trading | K.M.F."
      metaDescription="Les questions que tu te poses après un trade comptent plus que le résultat. Voici 10 questions de revue post-trade qui accéléreront ton développement de trader."
      date="30 janvier 2026"
      dateISO="2026-01-30"
      readTime="5 min de lecture"
      category="Amélioration"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst', category: 'Improvement' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Que dois-je revoir après chaque trade ?', answer: 'Revois ton déclencheur d\'entrée, l\'exécution de ta sortie, ton état émotionnel, ta gestion du risque et si tu as suivi ton plan. Le but est d\'évaluer la qualité de la prise de décision, pas seulement le P/L.' },
        { question: 'Pourquoi une revue post-trade est-elle importante ?', answer: 'Sans revue structurée, les traders répètent les mêmes erreurs pendant des mois. Une revue post-trade crée une boucle de feedback qui accélère l\'apprentissage et aide à identifier les schémas comportementaux.' },
        { question: 'Combien de temps une revue post-trade doit-elle prendre ?', answer: '2 à 5 minutes par trade suffisent. Réponds à tes questions de revue immédiatement après la clôture du trade, tant que l\'expérience est fraîche.' },
      ]}
    >
      <Intro>
        Le trader retail moyen clôture un trade, regarde le chiffre du profit ou de la perte, et passe à autre chose. Peut-être qu'il se sent bien. Peut-être frustré. Et puis il répète les mêmes schémas la semaine suivante, le mois suivant, et l'année suivante. Les traders qui progressent vite font quelque chose de différent : ils interrogent chaque trade avec des questions précises et structurées qui séparent ce qui s'est passé du pourquoi ça s'est passé.
      </Intro>

      <StatsStrip items={[
        { value: 10, decimals: 0, label: <>questions structurées<br />après chaque trade clôturé</> },
        { value: 2, decimals: 0, suffix: ' min', label: <>temps total de revue<br />pour les 10 questions</> },
        { value: 7, decimals: 0, label: <>seuil de note émotionnelle<br />(1-10) — en dessous = processus dégradé</> },
      ]} />

      <H2>Pourquoi la revue post-trade compte</H2>
      <P>
        Voici la vérité inconfortable sur les résultats des trades : tu peux exécuter un trade parfaitement et perdre de l'argent. Tu peux exécuter un trade affreusement et gagner de l'argent. À court terme, les résultats et la qualité d'exécution ne sont que faiblement corrélés. Le marché introduit du bruit — news inattendues, événements de liquidité, fluctuations de prix aléatoires — qui peut produire n'importe quel résultat quel que soit ton processus.
      </P>
      <P>
        Ça signifie que si tu n'évalues les trades que par leur P/L, tu renforceras parfois de mauvaises habitudes (quand des trades chanceux gagnent) et puniras parfois de bonnes habitudes (quand des trades disciplinés perdent contre le bruit). La revue post-trade, c'est ainsi que tu sépares le signal du bruit et évalues la vraie qualité de tes décisions.
      </P>
      <Callout title="Le principe central" color="#FFB300">
        Un trade perdant exécuté parfaitement selon tes règles est un meilleur trade qu'un trade gagnant pris impulsivement. Les questions post-trade t'aident à voir la différence — et sur des centaines de trades, elles redirigent ton renforcement vers le bon processus plutôt que vers des résultats aléatoires.
      </Callout>

      <Divider />

      <H2>Les 10 questions</H2>

      <H3>1. Ai-je suivi mes critères d'entrée exactement ?</H3>
      <P>
        Pas approximativement — exactement. Tes critères d'entrée existent parce qu'ils définissent les conditions de marché où ta stratégie a un edge. Une correspondance partielle signifie un edge partiel, au mieux. Cette question force une réponse binaire : oui ou non. Si non, qu'est-ce qui était précisément différent, et pourquoi es-tu entré quand même ?
      </P>

      <H3>2. Mon placement de stop loss était-il basé sur la structure ou arbitraire ?</H3>
      <P>
        Un stop loss devrait être placé à un niveau de prix qui invalide définitivement la thèse de ton trade — sous un support, au-dessus d'une résistance, au-delà d'un point de swing. Un stop arbitraire placé parce que « 50 $ semble une perte raisonnable » n'est pas un stop loss. C'est une prière. Cette question vérifie que ton risque était défini par la logique du marché, pas par la commodité. Pour un cadre complet là-dessus, lis notre guide sur <Link to="/blog/how-to-set-stop-loss">comment placer un stop loss correctement</Link>.
      </P>

      <H3>3. Ai-je dimensionné la position correctement pour mes règles de risque ?</H3>
      <P>
        Calcule le pourcentage de risque réel que ce trade représentait. Correspondait-il à ton risque prévu ? Sinon, la déviation était-elle intentionnelle et justifiée, ou as-tu dimensionné au feeling ? Un dimensionnement régulier est l'une des règles les plus importantes — et les plus souvent violées — du trading.
      </P>

      <H3>4. Quel était mon état émotionnel avant d'entrer ?</H3>
      <P>
        Note ton état émotionnel sur une simple échelle de 1 à 10 (1 = extrêmement agité, 10 = complètement calme et concentré). La recherche montre que la qualité de trading se dégrade à mesure que l'activation émotionnelle augmente, particulièrement au-dessus d'un seuil que la plupart des traders situeraient autour de 6 ou 7. Suivre ce nombre dans le temps révèle si ton état émotionnel corrèle avec les résultats dans ton trading spécifique.
      </P>

      <H3>5. Avais-je un plan de sortie clair avant d'entrer ?</H3>
      <P>
        Avant d'entrer dans tout trade, tu devrais savoir exactement où tu sortiras avec une perte (stop loss) et exactement où tu prévois de sortir avec un profit (cible ou conditions). Si l'un des deux était indéfini au moment de l'entrée, c'est un échec de processus significatif. Les sorties indéfinies mènent à des sorties mues par l'émotion en temps réel — exactement la mauvaise condition.
      </P>

      <H3>6. Ai-je déplacé mon stop loss contre mon trade ? Pourquoi ?</H3>
      <P>
        Déplacer un stop loss plus loin de ton entrée pour éviter de te faire stopper est l'un des comportements de trading les plus destructeurs. Si tu l'as fait sur ce trade, note-le honnêtement et examine la justification que tu t'es donnée sur le moment. « Le setup est encore valide » est souvent une rationalisation de l'espoir plutôt qu'une véritable évaluation technique.
      </P>

      <H3>7. La condition de marché était-elle adaptée à cette stratégie ?</H3>
      <P>
        La plupart des stratégies marchent bien dans des conditions de marché précises et mal dans d'autres. Une stratégie de breakout échoue souvent dans des marchés hachés en range. Une stratégie de retour à la moyenne galère pendant les fortes tendances. La condition de marché au moment de l'entrée correspondait-elle aux conditions pour lesquelles ta stratégie est conçue ? Sinon, prendre le trade était-il approprié ?
      </P>

      <H3>8. Qu'aurais-je fait différemment ?</H3>
      <P>
        Il ne s'agit pas de te flageller. Il s'agit d'extraire une leçon précise et exploitable. « J'aurais dû attendre la clôture de la bougie avant d'entrer » est utile. « J'aurais dû être meilleur » ne l'est pas. Un changement comportemental concret par trade, noté par écrit, est la façon dont les compétences se développent réellement dans le temps.
      </P>

      <H3>9. Qu'ai-je bien fait, quel que soit le résultat ?</H3>
      <P>
        Cette question est aussi importante que n'importe quelle autre. Renforcer le bon processus est essentiel, surtout quand le bon processus mène à une perte (ce qui arrivera parfois). Si tu as suivi ta checklist parfaitement, dimensionné correctement, placé un stop logique, et que le trade a quand même perdu — ça mérite d'être noté comme une exécution disciplinée, pas comme un échec.
      </P>

      <H3>10. Quel est mon R-multiple sur ce trade ?</H3>
      <P>
        Calcule le <Link to="/blog/r-multiple-explained">R-multiple</Link> : P/L réel divisé par ton risque initial. Note ce nombre pour chaque trade. Avec le temps, ton R-multiple moyen révèle si ta stratégie a une <Link to="/blog/trading-expectancy-explained">espérance</Link> positive et te dit bien plus sur ta performance que le P/L en dollars.
      </P>

      <Divider />

      <H2>Comment utiliser ces questions</H2>
      <P>
        Tu n'as pas besoin d'écrire une dissertation pour chaque question. Quelques mots ou une phrase suffisent. La discipline de répondre régulièrement à ces questions après chaque trade bâtit une base de connaissance de soi qui devient énormément précieuse avec le temps.
      </P>
      <Table
        headers={['Question', 'Format de réponse', 'Temps requis']}
        rows={[
          ['Critères d\'entrée suivis ?', 'Oui / Non + note brève si Non', '10 secondes'],
          ['Base du stop loss ?', 'Structure / Arbitraire', '5 secondes'],
          ['Taille de position correcte ?', '% réel vs % cible', '15 secondes'],
          ['État émotionnel (1-10) ?', 'Un seul nombre', '5 secondes'],
          ['Plan de sortie défini avant l\'entrée ?', 'Oui / Non', '5 secondes'],
          ['Stop déplacé contre le trade ?', 'Oui / Non + raison si Oui', '10 secondes'],
          ['Condition de marché adaptée ?', 'Oui / Non + description de la condition', '15 secondes'],
          ['Quoi faire différemment ?', 'Un comportement précis', '20 secondes'],
          ['Qu\'as-tu bien fait ?', 'Un comportement précis', '15 secondes'],
          ['R-multiple ?', 'Nombre (ex. : +1,8R)', '15 secondes'],
        ]}
      />
      <P>
        Temps total : environ 2 minutes par trade. Sur une carrière de trading, ces 2 minutes par trade sont la différence entre la stagnation et l'amélioration systématique. Associe ces questions à une <Link to="/blog/weekly-trading-review-template">revue hebdomadaire</Link> structurée et l'effet de composition sur ton trading est énorme.
      </P>

      <Takeaways items={[
        'Évaluer les trades uniquement par le P/L renforce des résultats aléatoires, pas la qualité du processus.',
        'Les questions post-trade séparent ce que tu peux contrôler (l\'exécution) de ce que tu ne peux pas (le résultat du marché).',
        'La note d\'état émotionnel (1-10) par trade, suivie dans le temps, révèle si la psychologie corrèle avec ta performance.',
        'Noter une chose précise à faire différemment par trade crée un journal d\'amélioration exploitable.',
        'La question du R-multiple garantit que chaque trade contribue aux données d\'espérance de ta stratégie.',
        'Deux minutes de revue structurée par trade se composent en une amélioration significative de la performance avec le temps.',
      ]} />
    </BlogArticleLayout>
  );
}
