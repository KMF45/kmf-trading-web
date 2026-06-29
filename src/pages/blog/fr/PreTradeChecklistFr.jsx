import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PreTradeChecklistFr() {
  return (
    <BlogArticleLayout
      slug="pre-trade-checklist"
      lang="fr"
      title="La checklist pré-trade : 10 choses à vérifier avant chaque entrée"
      metaTitle="Checklist pré-trade : 10 règles qui évitent 90 % des mauvais trades | K.M.F."
      metaDescription="Une checklist pré-trade est l'outil le plus efficace pour un trading régulier. Voici 10 questions à vérifier avant d'entrer dans tout trade — adapte-les à ta propre stratégie."
      date="14 février 2026"
      dateISO="2026-02-14"
      dateModified="2026-03-22"
      readTime="6 min de lecture"
      category="Discipline"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Que doit contenir une checklist pré-trade ?', answer: 'Une checklist pré-trade complète couvre les conditions de marché, l\'alignement de tendance, le déclencheur d\'entrée, le placement du stop loss, la taille de position, le ratio risque/rendement, l\'état émotionnel, les événements de news, et si le trade correspond à ton plan.' },
        { question: 'Pourquoi les traders ont-ils besoin d\'une checklist ?', answer: 'Une checklist force une pensée systématique avant chaque trade, évitant les entrées impulsives mues par la FOMO ou l\'émotion. Les pilotes et les chirurgiens utilisent des checklists pour la même raison — les décisions à fort enjeu ont besoin d\'un processus, pas de l\'instinct.' },
        { question: 'Combien d\'éléments une checklist de trading doit-elle avoir ?', answer: 'Entre 7 et 12 éléments est idéal. Moins de 7 rate des critères importants ; plus de 12 devient impraticable et les traders commencent à sauter des éléments. Chaque élément doit être une question oui/non claire.' },
      ]}
      howToSteps={[
        { name: 'Vérifie les critères du setup', text: 'Confirme que le trade correspond à tes conditions de setup définies. Si tu étires la définition, rejette le trade.' },
        { name: 'Vérifie la tendance de l\'unité de temps supérieure', text: 'Assure-toi que la tendance de l\'unité de temps supérieure soutient ta direction. Trader contre la tendance demande une justification supplémentaire.' },
        { name: 'Identifie le déclencheur d\'entrée', text: 'Définis le price action exact ou le signal d\'indicateur qui déclenchera ton entrée. Pas de déclencheur, pas de trade.' },
        { name: 'Place le stop loss à l\'invalidation', text: 'Place ton stop loss là où ton idée de trade est invalidée — derrière la structure, basé sur l\'ATR, ou sur la bougie.' },
        { name: 'Calcule la taille de position', text: 'Utilise la règle des 1 % pour calculer la taille de lot exacte selon la distance du stop et le solde du compte.' },
        { name: 'Vérifie le ratio risque/rendement', text: 'Confirme que ta cible donne au moins 1:2 risque/rendement. Sinon, le trade ne vaut peut-être pas la peine.' },
        { name: 'Vérifie le calendrier économique', text: 'Vérifie qu\'aucun événement de news à fort impact n\'est prévu pendant la durée attendue de ton trade.' },
        { name: 'Évalue ton état émotionnel', text: 'Note ton état émotionnel honnêtement. Si tu es en colère, anxieux ou euphorique, éloigne-toi.' },
        { name: 'Confirme l\'alignement avec le plan', text: 'Vérifie que le trade correspond à ton plan hebdo/mensuel et ne dépasse pas ta limite journalière de trades.' },
        { name: 'Enregistre le trade avant l\'entrée', text: 'Écris ta thèse, ton entrée, ton stop et ta cible dans ton journal avant de cliquer sur le bouton.' },
      ]}
    >
      <Intro>
        Avant chaque vol commercial, les pilotes parcourent une checklist pré-vol standardisée — non parce que les pilotes expérimentés ont oublié comment fonctionnent les avions, mais parce que les checklists évitent systématiquement la classe d'erreur causée par la surconfiance, la distraction ou la pression du temps. Avant les chirurgies complexes, les équipes opératoires font des checklists verbales qui ont prouvé réduire les décès évitables. Le trading est un domaine de décisions importantes prises sous incertitude et pression émotionnelle. L'argument pour les checklists est le même.
      </Intro>

      <StatsStrip items={[
        { value: 10, decimals: 0, label: <>éléments de checklist couvrant<br />setup, risque et psychologie</> },
        { value: 1.5, decimals: 1, suffix: ':1', label: <>risque/rendement minimum<br />avant qu'un trade qualifie</> },
        { value: 7, decimals: 0, label: <>note émotionnelle minimum<br />(1-10) avant l'entrée</> },
      ]} />

      <H2>Pourquoi les checklists fonctionnent en trading</H2>
      <P>
        La recherche sur la prise de décision sous pression montre régulièrement que les humains sont mauvais pour réaliser des évaluations en plusieurs étapes en temps réel — surtout sous stress ou pression du temps. On saute des étapes, on pondère trop fortement l'information récente, et on laisse l'état émotionnel contaminer le jugement analytique.
      </P>
      <P>
        Une checklist externalise les critères de décision. Plutôt que de compter sur ta pensée Système 1 (rapide, émotionnelle) du moment pour évaluer un trade correctement, une checklist force l'engagement systématique de la pensée Système 2 (lente, délibérée). Elle crée un écart obligatoire entre l'impulsion et l'action — et c'est dans cet écart que vit la discipline. C'est aussi <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">pourquoi les traders enfreignent leurs propres règles</Link> — sans checklist, le Système 1 gagne à chaque fois.
      </P>
      <Callout title="L'idée clé" color="#FFB300">
        Une checklist ne fait pas de toi un meilleur analyste. Elle garantit que l'analyse que tu sais déjà faire est réellement effectuée avant chaque trade — pas seulement parfois, pas seulement quand tu y penses, mais chaque fois.
      </Callout>

      <Divider />

      <H2>La checklist pré-trade en 10 points</H2>

      <H3>1. Ce trade correspond-il à mes critères de setup définis ?</H3>
      <P>
        C'est la question fondatrice. Tes critères de setup définissent les conditions précises où ta stratégie a démontré un edge. Si le trade actuel ne remplit pas clairement ces critères — si tu étires la définition, arrondis les angles, te dis « c'est assez proche » — c'est un rejet. Chaque déviation de tes critères représente un trade pris en dehors de ton edge.
      </P>

      <H3>2. Ai-je identifié la tendance ou la structure sur l'unité de temps supérieure ?</H3>
      <P>
        Trader contre la tendance dominante sur l'unité de temps supérieure réduit nettement la probabilité de succès sur la plupart des stratégies. Avant d'entrer dans tout trade sur ton unité de temps d'exécution, vérifie les une ou deux unités au-dessus. La tendance est-elle dans la direction de ton trade ? Y a-t-il un niveau évident de résistance ou de support au-dessus ou en dessous du prix qui pourrait stopper le mouvement avant ta cible ?
      </P>

      <H3>3. Y a-t-il un niveau clair d'invalidation pour mon stop loss ?</H3>
      <P>
        Ton stop loss devrait être placé à un niveau structurel — sous le support pour un long, au-dessus de la résistance pour un short — pas à une distance arbitraire. Si tu ne peux pas désigner une raison précise pour laquelle le prix atteignant ce niveau invalide ton trade, tu n'as pas un stop loss logique. Tu as une supposition.
      </P>

      <H3>4. Le ratio risque/rendement est-il d'au moins 1:1,5, ou selon mes règles ?</H3>
      <P>
        Calcule le ratio réel : distance de l'entrée au stop loss contre distance de l'entrée à la cible. Si ta cible est à 60 pips et ton stop à 80 pips, tu risques plus que ce que tu peux gagner. Connais ton R:R minimum acceptable avant de commencer ta séance et rejette tout trade qui tombe en dessous.
      </P>

      <H3>5. Ai-je calculé ma taille de position sur la base de 1 % de risque ?</H3>
      <P>
        N'estime pas. Calcule. Montant de risque = Compte × 0,01. Taille de position = Montant de risque ÷ Distance du stop. Ça prend 20 secondes et garantit que le pire résultat possible sur ce trade — une perte complète — coûte exactement 1 % de ton compte, pas environ 1 % au feeling. Vois notre <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">guide complet du dimensionnement</Link> pour la formule exacte en forex, actions et crypto.
      </P>

      <H3>6. Y a-t-il un événement de news majeur dans l'heure qui vient ?</H3>
      <P>
        Les publications économiques majeures (NFP, CPI, décisions de banque centrale) créent des mouvements de prix soudains et larges qui peuvent instantanément invalider des setups techniquement solides, élargir les spreads sauvagement, et chasser les stops avant de continuer dans la direction d'origine. Connais le calendrier économique avant ta séance. Si un événement à fort impact est prévu dans les 60 prochaines minutes, soit attends après la publication, soit passe le trade.
      </P>

      <H3>7. Est-ce que je trade par ennui ou par FOMO ?</H3>
      <P>
        Sois honnête. Demande-toi : est-ce que j'entre dans ce trade parce qu'il y a un vrai setup, ou parce que je suis assis devant l'écran et que j'ai l'impression de devoir faire quelque chose ? Les trades de FOMO — pris parce qu'un mouvement a déjà lieu et que tu ne veux pas le rater — et les trades d'ennui sont parmi les catégories de trade les plus fiablement perdantes. Si la réponse honnête est oui, ferme le graphique et attends. Ce genre d'entrée impulsive est le premier pas vers le <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">revenge trading</Link>.
      </P>

      <H3>8. Suis-je émotionnellement prêt à gérer ce trade s'il part contre moi ?</H3>
      <P>
        Note ton état émotionnel actuel sur une échelle de 1 à 10 (10 = complètement calme). Si tu viens d'avoir un trade perdant et te sens frustré, si tu t'es disputé avec quelqu'un, si tu es anxieux pour quelque chose sans rapport avec le trading — ces états altèrent le traitement rationnel requis pour bien gérer un trade. Un état en dessous de 6 ou 7 est un drapeau qui justifie de passer ce trade.
      </P>

      <H3>9. Ai-je un plan de sortie clair (cible et stop) ?</H3>
      <P>
        Avant que le trade soit entré, tu dois savoir où tu sortiras avec une perte (niveau de stop en termes de prix) et où tu prévois de sortir avec un profit (niveau de cible ou ensemble de conditions). « Je verrai comment ça évolue » n'est pas un plan de sortie. Gérer un trade en temps réel sans plan de sortie prédéfini mène fiablement à des décisions émotionnelles aux pires moments.
      </P>

      <H3>10. Suis-je d'accord si ce trade perd ?</H3>
      <P>
        C'est un contrôle psychologique, pas une question piège. Chaque trade que tu prends devrait être dimensionné et positionné de sorte que s'il perd, le résultat est financièrement acceptable et émotionnellement gérable. Si l'idée que ce trade perde te rend malade ou désespéré, ta position est trop grande, ton état émotionnel trop élevé, ou les deux. Résous le problème sous-jacent avant d'entrer.
      </P>

      <Divider />

      <H2>Comment construire ta propre checklist</H2>
      <P>
        Les 10 questions ci-dessus sont un point de départ — adapte-les à ta stratégie spécifique. La meilleure checklist est celle que tu utilises réellement, à chaque fois, sans exception. Pense à organiser la tienne en trois catégories :
      </P>
      <Table
        headers={['Catégorie', 'Focus', 'Exemples de questions']}
        rows={[
          [{ value: 'Technique', color: 'cyan' }, 'Le setup est-il valide ?', 'Critères de setup, alignement unité de temps supérieure, ratio R:R, news'],
          [{ value: 'Risque', color: 'green' }, 'Le risque est-il géré ?', 'Calcul de taille de position, logique du stop loss, % de risque du compte'],
          [{ value: 'Psychologique', color: 'gold' }, 'Suis-je dans le bon état ?', 'Note émotionnelle, check ennui/FOMO, acceptation de la perte'],
        ]}
      />

      <H2>Checklist numérique vs papier</H2>
      <P>
        Les deux fonctionnent. Le critère est la régularité. Un bloc-notes physique à côté de ton clavier que tu coches physiquement avant chaque trade marche bien parce que l'acte de prendre un stylo crée une friction qui ralentit l'impulsion. Une checklist numérique dans ton journal marche bien parce qu'elle crée un registre que tu peux revoir. Ce qui ne marche pas, c'est une checklist mentale — ton cerveau Système 1 te convaincra que tu as « essentiellement » coché les cases quand il veut prendre le trade.
      </P>

      <H2>Quoi faire si tu réponds non à une question</H2>
      <P>
        Saute le trade. Ne rationalise pas. Ne fais pas d'exceptions pour les setups « à haute confiance ». La valeur d'une checklist vient entièrement de son application inconditionnelle. Une checklist que tu écrases dès que tu as un fort ressenti sur un trade n'est pas une checklist — c'est une décoration.
      </P>
      <P>
        Les trades que tu ne prends pas quand ta checklist dit non sont aussi importants que ceux que tu prends quand elle dit oui. La discipline est symétrique.
      </P>

      <Takeaways items={[
        'Les checklists fonctionnent en forçant la pensée Système 2 (délibérée, analytique) avant chaque trade, évitant les entrées Système 1 (émotionnelles, impulsives).',
        'Les 10 domaines clés : correspondance du setup, unité de temps supérieure, logique du stop, ratio R:R, taille de position, news, ennui/FOMO, état émotionnel, plan de sortie, et acceptation de la perte.',
        'Organise ta checklist en trois catégories : Technique, Risque et Psychologique.',
        'Une checklist physique ou numérique crée un registre. Une checklist mentale, non — et le cerveau te trompera.',
        'Si tu réponds non à une question, saute le trade. Aucune exception. La discipline est dans l\'application inconditionnelle.',
        'Les trades sautés parce que la checklist dit non ne sont pas des occasions manquées. C\'est la discipline en action.',
      ]} />
    </BlogArticleLayout>
  );
}
