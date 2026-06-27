import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { RiskRuleEquityCurve } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function OnePercentRiskRuleFr() {
  return (
    <BlogArticleLayout
      slug="1-percent-risk-rule"
      lang="fr"
      title="La règle des 1 % : la règle de trading qui garde les professionnels en vie"
      metaTitle="La règle des 1 % : pourquoi les pros ne risquent jamais plus (et toi non plus) | K.M.F."
      metaDescription="Découvre pourquoi les traders professionnels ne risquent jamais plus de 1 % par trade, comment le calculer et comment ça protège ton compte pendant les séries de pertes."
      date="9 janvier 2026"
      dateISO="2026-01-09"
      readTime="6 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce que la règle des 1 % en trading ?', answer: 'La règle des 1 % signifie ne jamais risquer plus de 1 % de ton solde total sur un seul trade. Sur un compte de 10 000 $, ta perte maximale par trade serait de 100 $, peu importe l\'instrument ou l\'unité de temps.' },
        { question: 'Comment appliquer la règle des 1 % ?', answer: 'Calcule 1 % de ton solde, détermine la distance de ton stop loss, puis divise le montant de risque par la distance du stop loss pour obtenir ta taille de position. Ainsi, chaque trade porte le même risque quel que soit le marché.' },
        { question: 'Puis-je risquer plus de 1 % par trade ?', answer: 'Certains traders expérimentés utilisent 2 % par trade, mais dépasser cela est dangereux. Avec 1 % de risque, même 10 pertes consécutives ne font baisser ton compte que d\'environ 9,5 %. Avec 5 % de risque, 10 pertes feraient perdre 40 % du compte.' },
      ]}
    >
      <Intro>
        La plupart des traders retail qui crament leur compte ne perdent pas à cause d'une mauvaise stratégie. Ils perdent à cause d'une mauvaise gestion du risque. Ils trouvent un setup qu'ils adorent, entrent trop gros, et un trade — ou une mauvaise semaine — efface 30 %, 50 % ou la totalité de leur capital. La règle des 1 % est la défense la plus simple et la plus fiable contre ce résultat.
      </Intro>

      <StatsStrip items={[
        { value: 1, decimals: 0, suffix: '%', label: <>risque max par trade<br />(standard du secteur)</> },
        { value: 100, decimals: 0, suffix: '%', label: <>gain nécessaire pour récupérer<br />d'un drawdown de 50 %</> },
        { value: 50, decimals: 0, suffix: '+', label: <>trades pour valider<br />qu'une stratégie fonctionne</> },
      ]} />

      <H2>Qu'est-ce que la règle des 1 % ?</H2>
      <P>
        La règle des 1 % stipule que sur un seul trade, tu ne devrais jamais risquer plus de 1 % de ton compte total. Le risque désigne ici le montant maximal que tu es prêt à perdre si le trade tourne entièrement contre toi et touche ton stop loss.
      </P>
      <P>
        Si ton compte est de 10 000 $, tu ne risques pas plus de 100 $ par trade. S'il est de 50 000 $, tu ne risques pas plus de 500 $. L'idée clé, c'est que ce nombre est dérivé de la taille de ton compte, pas d'un montant fixe en dollars — il s'adapte donc à ton capital et rétrécit naturellement pendant les drawdowns.
      </P>

      <H2>Les maths de la ruine : pourquoi le % de risque compte plus que tu ne crois</H2>
      <P>
        Les séries de pertes sont une certitude mathématique, même avec une stratégie rentable. La question n'est pas de savoir si tu affronteras une suite de pertes, mais si ton compte y survit assez longtemps pour atteindre la prochaine phase gagnante. Comprendre les stratégies pour <Link to="/blog/how-to-recover-from-losing-streak" className="text-kmf-accent hover:underline">survivre aux séries de pertes</Link> est tout aussi important que d'avoir une bonne méthode d'entrée.
      </P>
      <P>
        Regarde ce que des pertes consécutives font à ton compte selon différents niveaux de risque :
      </P>
      <Table
        headers={['Pertes consécutives', '1 % de risque', '2 % de risque', '5 % de risque', '10 % de risque']}
        rows={[
          ['5 pertes', { value: '-4,9 %', color: 'green' }, { value: '-9,6 %', color: 'cyan' }, { value: '-22,6 %', color: 'gold' }, { value: '-41,0 %', color: 'red' }],
          ['10 pertes', { value: '-9,6 %', color: 'green' }, { value: '-18,3 %', color: 'cyan' }, { value: '-40,1 %', color: 'red' }, { value: '-65,1 %', color: 'red' }],
          ['15 pertes', { value: '-14,0 %', color: 'cyan' }, { value: '-26,1 %', color: 'gold' }, { value: '-53,7 %', color: 'red' }, { value: '-79,4 %', color: 'red' }],
          ['20 pertes', { value: '-18,2 %', color: 'cyan' }, { value: '-33,2 %', color: 'gold' }, { value: '-64,2 %', color: 'red' }, { value: '-87,8 %', color: 'red' }],
        ]}
      />

      <RiskRuleEquityCurve />

      <P>
        À 5 % de risque par trade, une série de 10 pertes — ce qui est entièrement dans la variance normale d'un système à 50 % de win rate — détruit 40 % de ton compte. À ce stade, il te faut un gain de 67 % juste pour revenir à l'équilibre. À 1 % de risque, la même série te laisse avec 90 % de ton capital intact, et un simple gain de 11 % te ramène à ton point de départ.
      </P>
      <Callout title="Les maths de la récupération" color="#00C853">
        Un drawdown de 50 % exige un gain de 100 % pour être récupéré. Un drawdown de 20 % n'exige qu'un gain de 25 %. Se protéger des gros drawdowns n'est pas être conservateur — c'est mathématiquement essentiel pour la survie à long terme.
      </Callout>

      <H2>Comment calculer la taille de position avec la règle des 1 %</H2>
      <P>
        La formule a deux étapes :
      </P>
      <Ul items={[
        'Étape 1 — Calcule ton montant de risque : Montant de risque = Solde du compte × 0,01',
        'Étape 2 — Calcule la taille de position : Taille de position = Montant de risque ÷ (Prix d\'entrée − Prix du stop loss)',
      ]} />
      <P>
        Le <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">placement du stop loss</Link> vient en premier. Tu identifies le point d'invalidation logique de ton trade, tu mesures la distance jusqu'à ton entrée, puis tu utilises cette distance pour déterminer la taille de ta position. Tu ne places jamais un stop loss en fonction du <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">dimensionnement</Link> que tu veux prendre — ça marche dans l'autre sens.
      </P>

      <H3>Exemple concret : forex</H3>
      <P>
        Compte : 10 000 $. Risque par trade : 1 % = 100 $.
        Entrée : EUR/USD à 1,0800. Stop loss : 1,0750 (50 pips sous l'entrée).
        Pour un lot standard, 1 pip = 10 $. Donc 50 pips = 500 $ par lot.
        Taille de position = 100 $ ÷ 500 $ = 0,20 lot (un mini lot et deux micro lots).
      </P>
      <P>
        Si ce trade gagne sur une cible 2:1 (100 pips au-dessus de l'entrée à 1,0900), le gain est de 200 $ — un résultat propre de 2R. S'il perd au stop, la perte est exactement de 100 $, soit 1 % du compte.
      </P>
      <Callout>
        Évite le calcul — utilise notre <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">calculateur de taille de lot gratuit</Link> pour obtenir la taille de position exacte de n'importe quel instrument en quelques secondes.
      </Callout>

      <Divider />

      <H2>Objections courantes — répondues</H2>
      <H3>« Mes gains sont trop petits à 1 % »</H3>
      <P>
        Cette objection vient en général de comparer des montants en dollars plutôt que des pourcentages. Un gain de 100 $ sur un compte de 10 000 $ représente 1 %. Sur 100 trades avec un profit factor de 2,0 et un win rate de 50 %, ça se compose de façon significative. Le but en trading n'est pas de gros trades individuels — c'est une croissance régulière et composée sur des centaines de trades.
      </P>
      <H3>« J'ai 90 % de win rate — je peux risquer plus »</H3>
      <P>
        Même un système à 90 % de win rate produira un jour plusieurs pertes consécutives. Une suite soutenue de 5 à 7 pertes à 5 % de risque chacune peut produire un drawdown émotionnellement insupportable et fonctionnellement dangereux. La règle des 1 % est une assurance contre la variance, pas un reflet de ta confiance dans un trade précis.
      </P>

      <H2>Adapter la règle à ta situation</H2>
      <Ul items={[
        '0,5 % par trade — Recommandé pour les nouveaux traders qui valident encore leur stratégie, ou pendant une période de sous-performance. Garde les pertes gérables pendant l\'apprentissage.',
        '1 % par trade — Le standard pour les traders retail expérimentés. Équilibre croissance et protection contre le drawdown.',
        '2 % par trade — Limite haute pour les traders expérimentés avec une stratégie éprouvée et bien testée, et une forte confiance dans leur edge. Ne devrait pas être la valeur par défaut.',
        'Au-dessus de 2 % — Territoire spéculatif. Approprié seulement pour des situations très court terme à forte conviction, et ne devrait pas représenter le fonctionnement standard.',
      ]} />

      <Takeaways items={[
        'La règle des 1 % limite ta perte maximale sur un seul trade à 1 % de ton solde total.',
        'Elle se calcule à partir de la distance de ton stop loss, pas choisie arbitrairement — la taille de position en découle.',
        'À 1 % de risque, une série de 10 pertes te coûte moins de 10 % de ton compte, ce qui est récupérable.',
        'Les débutants devraient envisager de commencer à 0,5 % jusqu\'à ce que leur stratégie soit validée sur au moins 50 trades.',
        'La règle se compose en ta faveur : un compte qui grandit signifie des positions plus grandes, et un compte qui rétrécit signifie des positions plus petites, te protégeant automatiquement pendant les drawdowns.',
      ]} />
    </BlogArticleLayout>
  );
}
