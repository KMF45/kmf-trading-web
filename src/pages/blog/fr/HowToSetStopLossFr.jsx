import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function HowToSetStopLossFr() {
  return (
    <BlogArticleLayout
      slug="how-to-set-stop-loss"
      lang="fr"
      title="Comment placer un stop loss correctement (pas au hasard)"
      metaTitle="Placement du stop loss : 3 méthodes pro que la plupart des traders ignorent | K.M.F."
      metaDescription="La plupart des traders placent leurs stops loss selon des montants en dollars ou des chiffres ronds. Apprends les trois méthodes professionnelles pour placer ton stop là où le marché invalide réellement ton trade."
      date="6 février 2026"
      dateISO="2026-02-06"
      dateModified="2026-03-22"
      readTime="7 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'crypto-vs-forex-journaling', title: 'Crypto vs Forex: Why Your Trading Journal Needs Different Rules for Each Market', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Où dois-je placer mon stop loss ?', answer: 'Place ton stop loss à un niveau où ton idée de trade est invalidée — derrière la structure (support/résistance), au-delà d\'un multiple d\'ATR, ou sous/au-dessus d\'une bougie clé. N\'utilise jamais de nombres de pips arbitraires ou de montants en dollars.' },
        { question: 'Quelles sont les 3 méthodes professionnelles de stop loss ?', answer: 'Les trois méthodes sont : basée sur la structure (derrière les niveaux clés de support/résistance), basée sur l\'ATR (en utilisant l\'Average True Range comme mesure de volatilité) et basée sur la bougie (au-delà du plus haut/plus bas d\'une bougie de signal).' },
        { question: 'Un stop loss plus serré est-il meilleur ?', answer: 'Pas nécessairement. Un stop loss trop serré est touché par le bruit normal du marché, réduisant ton win rate. Le meilleur stop loss équilibre la protection contre l\'invalidation avec assez d\'espace pour que le trade respire.' },
      ]}
      howToSteps={[
        { name: 'Identifie le niveau d\'invalidation', text: 'Détermine le niveau de prix où ton idée de trade n\'est plus valide. C\'est là où la structure de marché se brise ou ton setup échoue.' },
        { name: 'Choisis une méthode de placement', text: 'Sélectionne basée sur la structure (derrière support/résistance), basée sur l\'ATR (1,5 à 2× l\'ATR depuis l\'entrée) ou basée sur la bougie (au-delà du plus haut/plus bas de la bougie de signal).' },
        { name: 'Ajoute une marge', text: 'Place le stop quelques pips au-delà du niveau d\'invalidation pour tenir compte du spread, du slippage et des mèches de chasse aux stops.' },
        { name: 'Calcule la taille de position à partir de la distance du stop', text: 'Utilise la distance de ton stop loss pour calculer la taille de position exacte avec la règle des 1 %. N\'ajuste jamais le stop pour l\'adapter à une taille de position.' },
        { name: 'Place le stop avant d\'entrer', text: 'Place l\'ordre de stop loss avant ou en même temps que ton entrée. N\'entre jamais dans un trade en prévoyant d\'ajouter le stop plus tard.' },
      ]}
    >
      <Intro>
        Un stop loss mal placé est souvent pire que pas de stop loss du tout. Non parce que le concept du stop loss est mauvais, mais parce que des stops placés au mauvais endroit te sortent régulièrement de trades qui auraient été rentables — tout en te donnant la fausse sécurité d'avoir géré ton risque. Le placement du stop loss est une compétence, et la plupart des traders retail n'ont jamais appris à le faire correctement.
      </Intro>

      <StatsStrip items={[
        { value: 1.5, decimals: 1, suffix: '×', label: <>multiplicateur d'ATR — standard<br />pour les stops basés sur la volatilité</> },
        { value: 14, decimals: 0, label: <>périodes — fenêtre ATR<br />par défaut pour dimensionner le stop</> },
        { value: 1, decimals: 0, suffix: 'R', label: <>profit avant d'envisager<br />un passage au breakeven</> },
      ]} />

      <H2>Les deux erreurs fondamentales</H2>
      <H3>Trop serré</H3>
      <P>
        Un stop loss trop proche de ton entrée sera touché par le bruit normal du marché — les fluctuations routinières qui se produisent dans toute tendance ou setup, avant que le vrai mouvement ne se développe. Tu te fais stopper pour une perte complète, le marché part ensuite dans ta direction d'origine, et tu as raté le trade tout en encaissant une perte. C'est l'une des expériences les plus frustrantes du trading et elle arrive presque entièrement à cause d'un mauvais placement de stop.
      </P>
      <H3>Trop large</H3>
      <P>
        Un stop loss trop loin de ton entrée signifie que quand le trade échoue, les dégâts sont disproportionnés. Si ton stop est à 200 pips sur un trade où le mouvement attendu est de 80 pips, ton risque/rendement est inversé. Tu risques plus que ce que tu peux réalistement gagner. Les stops larges te forcent aussi à réduire la taille de position si fortement que les trades gagnants ont un impact minimal sur ton compte.
      </P>

      <H2>Les mauvaises façons de placer un stop loss</H2>
      <Ul items={[
        'Choisir un chiffre rond (« je sors si ça atteint 1,0800 ») sans raison structurelle',
        'Mettre une distance de pips fixe pour tous les trades quel que soit le setup ou la volatilité (ex. : « toujours 20 pips »)',
        'Choisir un stop loss selon le montant en dollars que tu es prêt à perdre, puis le placer à cette distance exacte',
        'Placer un stop au prix d\'entrée (illusion du risque zéro) avant que le trade ait eu l\'espace de se développer',
        'Ne pas mettre de stop du tout parce que « je vais le surveiller manuellement »',
      ]} />
      <Callout title="Principe critique" color="#00C853">
        Le bon processus est : identifie d'abord ton niveau de stop loss logique selon la structure de marché, puis calcule ta taille de position avec la <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">formule de dimensionnement</Link> à partir de cette distance. Ne commence jamais par une taille de position pour placer un stop qui s'y adapte. Ça inverse entièrement la logique et garantit un mauvais placement de stop.
      </Callout>

      <Divider />

      <H2>Les 3 méthodes professionnelles</H2>

      <H3>1. Stop loss basé sur la structure</H3>
      <P>
        Le placement basé sur la structure est la méthode la plus importante et le fondement de la gestion professionnelle du risque. L'idée est que ton stop loss devrait être placé à un niveau de prix où, s'il est atteint, la thèse du trade est définitivement fausse.
      </P>
      <P>
        Pour un trade long : place le stop sous le niveau de support pertinent, sous le swing low, ou sous le plus bas significatif le plus récent. Si le prix casse sous ce niveau, la structure haussière est brisée, et ta raison d'être long n'existe plus.
      </P>
      <P>
        Pour un trade short : place le stop au-dessus du niveau de résistance pertinent, au-dessus du swing high, ou au-dessus du plus haut significatif le plus récent.
      </P>
      <P>
        La clé, c'est « au-delà » — pas au niveau, mais quelques pips ou points au-delà pour tenir compte des mèches, des balayages de liquidité et de la volatilité normale autour des niveaux clés. Placer un stop exactement à un chiffre rond ou exactement à un point de swing garantit presque de se faire stopper par une mèche avant le vrai mouvement.
      </P>

      <H3>2. Stop loss basé sur l'ATR</H3>
      <P>
        L'Average True Range (ATR) est un indicateur technique qui mesure l'amplitude moyenne du mouvement de prix sur une période donnée, typiquement 14 périodes. C'est l'une des mesures objectives les plus utiles de la volatilité actuelle du marché.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Formule :</strong> Distance du stop = ATR(14) × Multiplicateur
      </P>
      <P>
        Un multiplicateur courant est de 1,5× à 2× l'ATR. Si EUR/USD a un ATR de 60 pips, ton stop serait à 90–120 pips de l'entrée. Ça ajuste automatiquement ton stop à la volatilité actuelle — plus large en période de forte volatilité, plus serré en période de faible volatilité.
      </P>
      <P>
        Les stops basés sur l'ATR sont particulièrement utiles pendant les saisons de résultats, les événements majeurs ou sur les instruments très volatils où les stops basés sur la structure peuvent ne pas suffire à éviter le bruit normal.
      </P>
      <Table
        headers={['Instrument', 'ATR (14)', 'Multiplicateur', 'Distance du stop', 'Quand c\'est approprié']}
        rows={[
          ['EUR/USD', '65 pips', '1,5×', '97 pips', 'Conditions normales'],
          ['EUR/USD', '110 pips', '1,5×', '165 pips', 'Semaine très volatile (NFP, etc.)'],
          ['S&P 500', '28 points', '2,0×', '56 points', 'Swing trade intraday'],
          ['Bitcoin', '1 800 $', '1,5×', '2 700 $', 'Position en graphique journalier'],
        ]}
      />

      <H3>3. Stop loss basé sur la bougie</H3>
      <P>
        Pour les entrées basées sur des figures — pin bars, bougies englobantes, inside bars et autres setups de price action — le stop loss est logiquement placé au-delà du plus haut ou du plus bas de la bougie de signal elle-même.
      </P>
      <P>
        Pour un pin bar haussier au support : le stop va sous le plus bas de la mèche du pin bar, plus une petite marge. Le plus bas du pin bar représente le prix que le marché a testé et rejeté. Si le prix revient sous ce niveau, le rejet a échoué et le setup est invalidé.
      </P>
      <P>
        Pour une bougie englobante baissière à la résistance : le stop va au-dessus du plus haut de la bougie englobante, plus une marge.
      </P>
      <P>
        Les stops basés sur la bougie sont propres et logiques, mais ils peuvent être trop serrés sur les unités de temps supérieures où chaque bougie représente une large amplitude de prix. Recoupe toujours avec les niveaux structurels pour confirmer que le stop a du sens dans le contexte.
      </P>

      <Divider />

      <H2>Quand déplacer ton stop au breakeven</H2>
      <P>
        Déplacer ton stop loss au prix d'entrée — le breakeven — est une technique utile de gestion du risque, mais seulement quand le trade s'est assez développé pour le justifier. Une règle empirique courante : une fois que le trade atteint 1R de profit (c'est-à-dire qu'il a parcouru la même distance vers la cible que la distance initiale du stop loss), envisage de déplacer le stop au breakeven.
      </P>
      <P>
        Le bénéfice est évident : tu élimines la possibilité d'une perte complète sur un trade qui fonctionnait. Le coût est réel aussi : tu augmentes la probabilité de te faire stopper pour zéro gain sur des trades qui ont besoin d'espace pour respirer avant de continuer dans ta direction. Utilise les stops au breakeven de façon sélective, pas par défaut sur chaque trade.
      </P>

      <H2>Déplacer le stop contre le trade : un problème de discipline</H2>
      <P>
        La pratique consistant à déplacer un stop loss plus loin quand le trade tourne contre toi — pour éviter de te faire stopper — n'est pas une stratégie d'ajustement de stop. C'est un échec de discipline. Ton stop initial avait été placé pour une raison : il représentait le prix auquel la thèse de ton trade échoue. L'éloigner de ton entrée ne change pas cette réalité. Ça augmente seulement le montant que tu perdras quand la thèse finira par échouer.
      </P>

      <Callout>
        Une fois ton niveau de stop loss défini, utilise notre <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">calculateur de taille de lot gratuit</Link> pour obtenir la taille de position exacte instantanément — 340+ instruments pris en charge.
      </Callout>

      <Takeaways items={[
        'Les stops loss devraient être placés à des niveaux structurels où la thèse du trade est invalidée — pas selon des nombres de pips arbitraires ou des montants en dollars.',
        'Le bon ordre : identifie d\'abord le niveau du stop, puis calcule la taille de position. Ne fais jamais l\'inverse.',
        'Les stops basés sur la structure (sous le support / au-dessus de la résistance) sont la méthode la plus logique et la plus largement applicable.',
        'Les stops basés sur l\'ATR (1,5 à 2× l\'ATR sur 14 périodes) s\'adaptent automatiquement à la volatilité du marché.',
        'Les stops basés sur la bougie sont propres pour les setups de price action mais doivent être recoupés avec la structure.',
        'Déplacer un stop loss contre ton trade est un problème de discipline, pas un ajustement de stratégie.',
      ]} />
    </BlogArticleLayout>
  );
}
