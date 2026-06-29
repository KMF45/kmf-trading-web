import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function MarketOrderVsLimitOrderFr() {
  return (
    <BlogArticleLayout
      slug="market-order-vs-limit-order"
      lang="fr"
      title="Ordre au marché vs ordre limite : le coût caché qui vide discrètement ton compte"
      metaTitle="Ordre au marché vs ordre limite : le coût caché qui vide ton compte | K.M.F."
      metaDescription="Les ordres au marché semblent rapides, mais ils paient discrètement le spread et le slippage sur chaque trade. Le vrai coût des ordres au marché vs limite — et quand utiliser chacun."
      date="7 juin 2026"
      dateISO="2026-06-07"
      dateModified="2026-06-07"
      readTime="8 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss That Actually Protects You', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Quelle est la différence entre un ordre au marché et un ordre limite ?', answer: 'Un ordre au marché s\'exécute immédiatement au meilleur prix actuellement disponible — l\'exécution est garantie, mais pas un prix précis. Un ordre limite ne s\'exécute qu\'à ton prix choisi ou meilleur — tu contrôles le prix, mais l\'exécution n\'est pas garantie. Le compromis est vitesse contre contrôle du prix.' },
        { question: 'Les ordres limites coûtent-ils moins que les ordres au marché ?', answer: 'Généralement oui — mais pas à cause des commissions. Un ordre au marché paie le spread bid-ask et est exposé au slippage à chaque exécution. Un ordre limite peut éviter le slippage entièrement et, quand tu achètes au bid ou vends à l\'ask, peut même gagner le spread au lieu de le payer. Sur beaucoup d\'exchanges, les ordres limites bénéficient aussi de frais « maker » plus bas.' },
        { question: 'Pourquoi mon ordre limite ne s\'est-il pas exécuté ?', answer: 'Parce que le marché n\'a jamais tradé à ton prix, ou que seule une partie du volume disponible a atteint ton niveau (exécution partielle). Un ordre limite garantit le prix, pas l\'exécution. Si le prix s\'est échappé de ton niveau, ton ordre reste simplement non exécuté jusqu\'à ce qu\'il soit touché ou que tu l\'annules.' },
      ]}
    >
      <Intro>
        Ça ressemble au choix le plus trivial du ticket d'ordre : marché ou limite. La plupart des traders cliquent « marché » sans réfléchir parce que ça semble sûr — tu appuies sur acheter, tu es dedans, terminé. Mais ce clic est l'habitude la plus chère du trading retail. Un ordre au marché paie discrètement un coût sur chaque trade, et sur des centaines de trades ce coût se compose en une part significative de ton compte. Comprendre la différence n'est pas du pédantisme — c'est la différence entre payer le marché et faire payer le marché.
      </Intro>

      <StatsStrip items={[
        { value: 2, decimals: 0, suffix: '×', label: <>le spread est payé aller-retour<br />sur chaque trade au marché</> },
        { value: 10, decimals: 0, prefix: '$', label: <>perdus pour juste 1 pip de slippage<br />sur un ordre au marché d'un lot standard</> },
        { value: 0, decimals: 0, label: <>slippage de prix avec un ordre limite<br />(mais l'exécution n'est pas garantie)</> },
      ]} />

      <H2>Qu'est-ce qu'un ordre au marché ?</H2>
      <P>
        Un ordre au marché est une instruction d'acheter ou vendre immédiatement au meilleur prix actuellement disponible. Sa seule et unique promesse est l'exécution : tu seras exécuté, presque instantanément. Ce qu'il ne promet pas, c'est le prix. Quand tu envoies un achat au marché, tu paies l'ask (le prix le plus haut) ; quand tu envoies une vente au marché, tu reçois le bid (le prix le plus bas). L'écart entre ces deux — le spread bid-ask — est un coût que tu paies au moment où tu entres, avant que le trade ait bougé d'un seul tick.
      </P>
      <P>
        Dans un marché calme et liquide, ce coût est petit et prévisible. Dans un marché rapide — une publication de news, une ouverture de session, un instrument fin — le prix que tu vois et le prix que tu obtiens peuvent être très différents. Cette différence, c'est le slippage, et un ordre au marché l'accepte sans demander.
      </P>

      <H2>Qu'est-ce qu'un ordre limite ?</H2>
      <P>
        Un ordre limite est une instruction d'acheter ou vendre uniquement à un prix précis ou meilleur. Un achat limite s'exécute à ton prix ou plus bas ; une vente limite s'exécute à ton prix ou plus haut. Tu échanges la certitude de l'exécution contre le contrôle du prix. L'ordre reste dans le carnet jusqu'à ce que le marché atteigne ton niveau. S'il ne l'atteint jamais, tu n'es simplement pas exécuté — ce qui est parfois une fonctionnalité, pas un bug, parce que ça te garde hors des trades qui se sont échappés de ton plan.
      </P>

      <Callout title="La taxe du clic" color="#FF5252">
        Chaque ordre au marché paie le spread à l'entrée et le spread encore à la sortie. Sur une stratégie qui trade fréquemment, ce coût aller-retour n'est pas une erreur d'arrondi — c'est un frein permanent sur ton edge qu'aucune quantité d'analyse ne peut récupérer. La façon la plus rapide d'améliorer une stratégie à haute fréquence n'est souvent pas un meilleur signal d'entrée, mais une exécution moins chère.
      </Callout>

      <H2>Le vrai coût : spread et slippage</H2>
      <P>
        Les traders sont obsédés par les commissions parce que le broker leur montre un nombre. Le spread et le slippage sont invisibles par comparaison — ils sont intégrés dans ton prix d'exécution — alors la plupart des gens ne les mesurent jamais. Mais ils sont généralement bien plus grands que la commission.
      </P>
      <P>
        Considère un seul lot standard sur une paire forex majeure, où un pip vaut environ 10 $. Si tu entres avec un ordre au marché pendant un pic de news et obtiens un pip de slippage, c'est 10 $ partis instantanément — en plus du spread déjà payé. Deux pips de slippage sur une position de cinq lots, c'est 100 $, évaporés avant même que le trade commence à fonctionner. Rien de tout ça n'apparaît sur ton relevé de commissions, pourtant ça sort directement de ton espérance.
      </P>

      <Table
        headers={['Facteur', 'Ordre au marché', 'Ordre limite']}
        rows={[
          ['Exécution', { value: 'Exécution garantie', color: 'green' }, { value: 'Non garantie', color: 'gold' }],
          ['Contrôle du prix', { value: 'Aucun — tu prends ce qu\'il y a', color: 'red' }, { value: 'Prix exact ou meilleur', color: 'green' }],
          ['Coût à l\'entrée', { value: 'Paie le spread + slippage possible', color: 'red' }, { value: 'Pas de slippage ; peut gagner le spread', color: 'green' }],
          ['Vitesse', { value: 'Instantané', color: 'green' }, { value: 'Attend ton prix', color: 'gold' }],
          ['Pire cas', { value: 'Exécution affreuse en news ou gap', color: 'red' }, { value: 'Mouvement raté en attendant', color: 'gold' }],
        ]}
      />

      <Divider />

      <H2>Quand un ordre au marché est le bon choix</H2>
      <P>
        Les ordres au marché ne sont pas l'ennemi — les utiliser à l'aveugle, si. Il y a des situations claires où l'exécution garantie vaut le coût :
      </P>
      <Ul items={[
        'Tu dois sortir MAINTENANT : ton stop est touché, les news cassent contre toi, ou tu dois sortir d\'une position perdante avant qu\'elle empire. La certitude d\'exécution bat quelques ticks de prix.',
        'Instruments très liquides avec des spreads ultra-fins, où le risque de slippage est négligeable.',
        'Tu trades un breakout rapide où rater l\'entrée coûte plus que le spread payé pour la chasser.',
      ]} />

      <H2>Quand un ordre limite est le bon choix</H2>
      <P>
        Pour la majorité des entrées planifiées, un ordre limite est le défaut discipliné. Il marche le mieux quand :
      </P>
      <Ul items={[
        'Tu as un niveau d\'entrée prédéfini par ton analyse et tu es prêt à attendre que le marché vienne à toi.',
        'Tu trades des instruments aux spreads plus larges ou à plus faible liquidité, où le slippage sur un ordre au marché serait punitif.',
        'Tu veux que l\'ordre lui-même impose la discipline — si le prix n\'atteint jamais ton niveau, le trade que tu « devais prendre » n\'arrive simplement jamais.',
      ]} />
      <P>
        Ce dernier point est sous-estimé. Un ordre limite est un dispositif d'engagement. Il retire l'impulsion de chasser un prix qui bouge et te force à honorer les <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">niveaux que tu as définis avant que l'émotion commence</Link>.
      </P>

      <H2>Un mot rapide sur les ordres stop</H2>
      <P>
        Il y a un troisième type qui mérite d'être nommé parce qu'il embrouille les débutants : l'ordre stop. Un stop devient un ordre au marché une fois qu'un prix de déclenchement est touché — ce qui signifie que ton stop loss protecteur, quand il est déclenché, s'exécute au marché et est exposé au slippage exactement comme tout autre ordre au marché. Un stop-limite devient plutôt un ordre limite, te donnant le contrôle du prix mais risquant aucune exécution si le prix traverse droit ton niveau. Pour un stop loss, la plupart des traders acceptent le slippage d'un stop simple parce que ne pas être exécuté sur une sortie protectrice est le résultat le plus dangereux.
      </P>

      <H2>La meilleure approche du débutant</H2>
      <P>
        Si tu construis encore ta base, mets par défaut des ordres limites pour les entrées et des ordres stop simples pour les sorties protectrices. Place ton entrée là où ton plan le dit, et laisse le marché soit venir à toi soit avancer sans toi. Puis suis ce qui se passe réellement : enregistre ton exécution prévue contre ton exécution réelle, et tu verras ton coût de slippage en dollars au lieu de le deviner. Une fois que tu sais <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">dimensionner les positions</Link> et mesurer l'exécution honnêtement, la décision marché-contre-limite cesse d'être un réflexe et devient une part délibérée de ton <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">processus de risque</Link>.
      </P>

      <Takeaways items={[
        'Un ordre au marché garantit l\'exécution mais pas le prix — il paie le spread à l\'entrée et à la sortie, plus tout slippage en marché rapide.',
        'Un ordre limite garantit le prix mais pas l\'exécution — il peut éviter le slippage entièrement et parfois gagner le spread au lieu de le payer.',
        'Le spread et le slippage sont généralement plus grands que ta commission, pourtant ils sont invisibles car intégrés dans ton prix d\'exécution. Mesure-les.',
        'Utilise les ordres au marché quand la certitude d\'exécution prime : stops touchés, news qui cassent, ou spreads ultra-fins.',
        'Utilise les ordres limites comme défaut discipliné pour les entrées planifiées — ils agissent aussi comme dispositif d\'engagement contre la chasse au prix.',
        'Un stop loss simple s\'exécute au marché quand déclenché, donc il porte le même risque de slippage ; accepte-le, parce que ne pas exécuter une sortie protectrice est pire.',
      ]} />
    </BlogArticleLayout>
  );
}
