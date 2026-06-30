import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function MetatraderPreTradeChecklistFr() {
  return (
    <BlogArticleLayout
      slug="metatrader-pre-trade-checklist"
      lang="fr"
      title="Comment construire une checklist pré-trade pour MetaTrader et cTrader (avec 5 règles qui tiennent)"
      metaTitle="Checklist pré-trade MetaTrader : 5 règles avant chaque entrée | K.M.F."
      metaDescription="Une checklist pré-trade concrète et propre à la plateforme pour MetaTrader 4, MetaTrader 5 et cTrader. Cinq vérifications obligatoires avant chaque entrée, avec des exemples précis."
      date="22 mars 2026"
      dateISO="2026-03-22"
      readTime="8 min de lecture"
      category="Discipline"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Que doit inclure une checklist pré-trade MetaTrader ?', answer: 'Cinq vérifications obligatoires : 1) Contexte de marché et direction de l\'unité de temps supérieure, 2) Un déclencheur d\'entrée précis (pas juste « ça a l\'air bien »), 3) Stop loss à un point d\'invalidation structurel, 4) Taille de position calculée avec un calculateur de risque, et 5) Ratio risque/rendement minimum 1:2 confirmé sur le graphique.' },
        { question: 'Comment mettre en place une checklist pré-trade dans MetaTrader ?', answer: 'MetaTrader n\'a pas de fonction checklist intégrée. La plupart des traders utilisent un post-it physique sur leur écran, un fichier texte ouvert à côté de la plateforme, ou une appli de journal dédiée comme K.M.F. qui a une fonction checklist intégrée à compléter avant d\'enregistrer chaque trade.' },
        { question: 'Quelle est la différence entre une checklist pour MT4 et cTrader ?', answer: 'La checklist elle-même est la même — contexte de marché, déclencheur d\'entrée, stop loss, taille de position, risque/rendement. La seule différence est où tu calcules : cTrader a de meilleurs outils de risque intégrés, tandis que les traders MT4/MT5 ont souvent besoin d\'un calculateur externe ou d\'un EA pour un dimensionnement de lot précis.' },
        { question: 'Combien d\'éléments doivent figurer sur une checklist de trading ?', answer: 'Cinq. Pas dix, pas quinze. Cinq éléments que tu peux vérifier en moins de 60 secondes. Si ta checklist prend plus d\'une minute, tu la sauteras les jours chargés — et ce sont exactement les jours où tu en as le plus besoin.' },
      ]}
      howToSteps={[
        { name: 'Vérifie le contexte de l\'unité de temps supérieure', text: 'Ouvre le graphique journalier ou H4. Identifie la tendance ou le range actuel. Ton trade doit s\'aligner sur ce contexte ou avoir une justification contre-tendance explicite.' },
        { name: 'Identifie un déclencheur d\'entrée précis', text: 'Définis la figure de bougie, le signal d\'indicateur ou le niveau de prix exact qui déclenche ton entrée. « Ça a l\'air haussier » n\'est pas un déclencheur.' },
        { name: 'Marque ton stop loss sur le graphique', text: 'Place une ligne horizontale à ton niveau de stop loss. Il doit être à un point d\'invalidation structurel — derrière support/résistance, au-delà d\'un buffer ATR, ou sous une bougie de signal.' },
        { name: 'Calcule la taille de position', text: 'Utilise un calculateur de taille de position. Entrée : solde du compte, pourcentage de risque (1 %), distance du stop en pips. Sortie : taille de lot exacte. N\'arrondis jamais vers le haut.' },
        { name: 'Confirme le ratio risque/rendement', text: 'Fais glisser un outil risque/rendement de l\'entrée au stop et à la cible. Si le ratio est sous 1:2, saute le trade. Les maths ne le soutiennent pas.' },
      ]}
    >
      <Intro>
        Tu sais déjà que tu devrais avoir une checklist pré-trade. Tu en as probablement même fait une — peut-être après avoir lu notre <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">guide de checklist en 10 points</Link>. Elle avait douze éléments, elle était complète, elle était professionnelle. Tu l'as utilisée quatre jours puis tu as arrêté parce que vérifier douze choses avant chaque trade sur MetaTrader, c'était comme remplir une déclaration d'impôts pendant que le marché bougeait sans toi. Ça te parle ? Tu n'es pas paresseux. Ta checklist était trop longue.
      </Intro>

      <P>
        Ce guide est différent. Cinq éléments. Moins de 60 secondes. Spécifique à la façon dont MetaTrader (MT4/MT5) et cTrader fonctionnent réellement — avec les boutons, outils et calculs exacts à utiliser sur chaque plateforme. Pas de théorie. Pas de « considère ton état émotionnel » (c'est important, mais ça appartient à ton journal, pas à une checklist de 60 secondes). Juste cinq vérifications concrètes qui préviennent les cinq erreurs de trading les plus courantes.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>éléments de checklist —<br />le point idéal pour le respect</> },
        { value: 60, decimals: 0, suffix: 's', label: <>temps maximum avant que<br />la pression te fasse la sauter</> },
        { value: 2, decimals: 0, suffix: 'R', label: <>cible minimum — 1:2 R:R<br />ou saute le trade</> },
      ]} />

      <Divider />

      <H2>Pourquoi cinq éléments, pas dix</H2>
      <P>
        Il y a une raison pour laquelle les checklists d'avion sont courtes. Les recherches de la NASA sur le respect des checklists ont trouvé que les taux de complétion chutent fortement après 5-7 éléments. Les chirurgiens utilisent la checklist de sécurité chirurgicale de l'OMS — elle a trois sections de 5-7 éléments chacune, pas une section de 19. Le principe : une checklist courte que tu utilises bat une checklist longue que tu abandonnes.
      </P>
      <P>
        En trading, ça compte encore plus parce que tu es souvent sous pression du temps. Un breakout se forme. Une bougie se clôture. Tu ressens l'urgence d'entrer. Une checklist de 60 secondes peut survivre à cette pression. Une checklist de 5 minutes, non.
      </P>
      <Callout title="La règle des 60 secondes" color="#FFB300">
        Si ta checklist prend plus de 60 secondes, elle est trop longue. Coupe. Les cinq éléments ci-dessous couvrent 90 % de ce qui tourne mal. Les 10 % restants ne valent pas la peine de perdre le respect de la checklist.
      </Callout>

      <Divider />

      <H2>La checklist en 5 points</H2>

      <H3>1. Contexte : que fait l'unité de temps supérieure ?</H3>
      <P>
        Avant de regarder ton unité de temps d'entrée, passe au graphique journalier (ou H4 si tu es scalpeur). Tu poses une seule question : le marché est-il en tendance, en range, ou en transition ? Ton trade devrait s'aligner sur ce contexte.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur MetaTrader :</strong> Clique sur les boutons d'unité de temps (D1 ou H4) en haut de la barre d'outils du graphique. Passe 10 secondes à regarder les 20-30 dernières bougies. Y a-t-il une direction claire ? Trades-tu avec ou contre elle ?
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur cTrader :</strong> Pareil — utilise le menu déroulant d'unité de temps ou le raccourci clavier. cTrader te laisse aussi configurer une disposition multi-timeframe (View → Multi-Symbol) pour que l'unité supérieure soit toujours visible.
      </P>
      <P>
        Si l'unité de temps supérieure est hachée ou floue, ton trade a besoin d'une très forte raison d'exister. La plupart du temps, « l'unité de temps supérieure est brouillonne » est une raison valide de sauter.
      </P>

      <H3>2. Déclencheur : qu'est-ce que j'attends exactement ?</H3>
      <P>
        C'est là que la plupart des traders échouent. Ils voient un « setup » — le prix est près d'un support, le RSI est survendu, ça « a l'air bien » — et ils entrent. Mais « ça a l'air bien » n'est pas un déclencheur. Un déclencheur est un événement précis et observable :
      </P>
      <Ul items={[
        'Une bougie englobante haussière qui clôture au-dessus du niveau de support',
        'Une cassure et clôture au-dessus de la trendline descendante sur le graphique 15 minutes',
        'Un pinbar qui rejette la EMA 200 avec la mèche au moins 2× le corps',
        'Une divergence RSI confirmée par un plus haut bas sur l\'oscillateur pendant que le prix fait un plus bas bas',
      ]} />
      <P>
        Écris ton déclencheur dans ton journal ou sur un post-it avant le trade. Si tu ne peux pas le décrire en une phrase, tu n'as pas de déclencheur — tu as un ressenti.
      </P>

      <H3>3. Stop : où mon idée échoue-t-elle ?</H3>
      <P>
        Ton stop loss devrait être au niveau de prix où la thèse de ton trade est invalidée. Pas un nombre arbitraire de pips. Pas basé sur combien d'argent tu es prêt à perdre. Le stop va là où le marché prouve que tu as tort.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur MetaTrader :</strong> Utilise l'outil croix (Ctrl+F) pour mesurer la distance exacte de l'entrée au stop en pips. Ou fais glisser une ligne horizontale à ton niveau de stop et utilise la « Fenêtre de données » (Ctrl+D) pour lire le prix.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur cTrader :</strong> Clic droit → « Measure » ou utilise l'<Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">outil de placement de stop loss</Link> intégré qui montre les pips et le montant en dollars simultanément.
      </P>
      <P>
        Méthodes de placement de stop courantes :
      </P>
      <Table
        headers={['Méthode', 'Où', 'Idéale pour']}
        rows={[
          ['Basée sur la structure', 'Sous le swing low / au-dessus du swing high + buffer de 5-10 pips', 'Swing trades, niveaux S/R clairs'],
          ['Basée sur l\'ATR', '1,5× ATR sous l\'entrée (achat) ou au-dessus (vente)', 'Marchés volatils, événements de news'],
          ['Basée sur la bougie', 'Sous le plus bas de la bougie de signal + spread + petit buffer', 'Entrées intraday, pin bars'],
        ]}
      />

      <H3>4. Taille : combien je trade ?</H3>
      <P>
        C'est là que naissent la plupart des comptes cramés. Pas des mauvaises entrées — des mauvaises tailles de position. La formule :
      </P>
      <Callout title="Formule de taille de position" color="#4FC3F7">
        Taille de lot = (Solde du compte × % de risque) ÷ (Stop loss en pips × Valeur du pip)
      </Callout>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur MetaTrader :</strong> MT4/MT5 n'a pas de calculateur de risque intégré (oui, vraiment). Il te faut soit : un calculateur externe, un EA/indicateur custom qui fait le calcul, ou un journal de trading avec un <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">calculateur de taille de lot</Link>. K.M.F. en a un intégré dans l'app — saisis ta taille de compte, ton pourcentage de risque, ta distance de stop, et il te donne la taille de lot exacte. Plus rapide que de faire les maths à la main à chaque fois.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur cTrader :</strong> cTrader a un calculateur de taille de position intégré (clic droit sur le ticket de trade → « Risk % »). Règle ton pourcentage de risque et il calcule automatiquement la taille de lot correcte selon ta distance de stop. C'est un domaine où cTrader surpasse vraiment MetaTrader.
      </P>
      <P>
        Règle : si tu fais ce calcul de tête, tu le fais mal. Utilise toujours un calculateur. Le calcul mental sous pression mène à des tailles de lot « assez proches », et « assez proche » c'est comment 1 % de risque devient 3 % de risque.
      </P>

      <H3>5. Rendement : ce trade vaut-il la peine ?</H3>
      <P>
        Ta cible doit être au moins 2× la distance de ton stop loss. Si ton stop est de 30 pips, ta cible est d'au moins 60 pips. Si les maths ne marchent pas — s'il y a un niveau de résistance majeur entre ton entrée et une cible de 2R — saute le trade. Ça ne vaut pas le risque.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur MetaTrader :</strong> Utilise l'outil Fibonacci ou Rectangle pour marquer visuellement tes niveaux 1R, 2R et 3R au-dessus (ou en dessous) de ton entrée. Certains traders utilisent les lignes de niveau « Trade » dans MetaTrader qui montrent entrée, SL et TP avec la distance en pips.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>Sur cTrader :</strong> Utilise l'outil « Risk/Reward » (dans la barre de dessin) pour glisser de l'entrée au stop et à la cible. Il montre le ratio exact.
      </P>
      <P>
        Cette vérification prévient la classe la plus insidieuse de mauvais trades : ceux qui « semblent justes » mais ont des maths terribles. Un setup au support avec un stop de 50 pips et 30 pips jusqu'à la prochaine résistance est un trade perdant même si ton analyse est parfaite. Le risque/rendement est de 1:0,6. Tu dois en gagner 63 % juste pour être à l'équilibre. Saute-le.
      </P>

      <Divider />

      <H2>La checklist en pratique</H2>
      <Table
        headers={['#', 'Vérification', 'Temps', 'Si non']}
        rows={[
          ['1', 'Contexte unité supérieure soutient la direction ?', '10 s', { value: 'Saute ou besoin d\'une forte raison contre-tendance', color: 'red' }],
          ['2', 'Puis-je décrire mon déclencheur en une phrase ?', '10 s', { value: 'Pas de déclencheur = pas de trade', color: 'red' }],
          ['3', 'Stop loss à l\'invalidation structurelle + buffer ?', '15 s', { value: 'Trouve le bon niveau ou saute', color: 'gold' }],
          ['4', 'Taille calculée avec un outil (pas de tête) ?', '15 s', { value: 'Calcule correctement d\'abord', color: 'gold' }],
          ['5', 'Risque/rendement minimum 1:2 confirmé sur le graphique ?', '10 s', { value: 'Saute — les maths disent non', color: 'red' }],
        ]}
      />
      <P>
        Temps total : 60 secondes. Cinq réponses oui/non. Si une réponse est « non », le trade est soit ajusté soit sauté. Aucune exception, aucun « cette fois c'est différent ».
      </P>

      <Divider />

      <H2>Où mettre ta checklist</H2>
      <P>
        La checklist est inutile si elle vit dans un Google Doc que tu n'ouvres jamais. Voici les trois méthodes qui marchent vraiment :
      </P>
      <Ul items={[
        'Post-it physique sur le cadre de ton écran — impossible de ne pas le voir. Remplace-le chaque semaine quand il s\'abîme.',
        'Un modèle de commentaire MT4 custom — tape tes 5 vérifications dans le champ « Comment » de chaque trade. Ça te force à réfléchir avant d\'entrer.',
        'Une appli de journal avec checklist intégrée. K.M.F. a ça — tu coches les éléments avant d\'enregistrer chaque trade. L\'app suit ton taux de respect dans le temps, pour que tu voies à quelle fréquence tu sautes la checklist et ce qui arrive à tes résultats quand tu le fais. (Spoiler : ils empirent.)',
      ]} />

      <P>
        Quelle que soit la méthode choisie, la clé est que la checklist doit être entre toi et le trade. Il doit être impossible d'entrer dans un trade sans rencontrer la checklist d'abord. Si tu dois la chercher activement, tu la sauteras les jours où tu en as le plus besoin — ceux où tu es excité, frustré ou pressé.
      </P>

      <Takeaways items={[
        'Cinq éléments, 60 secondes. Le respect de la checklist chute fortement après 5-7 éléments. Une liste courte que tu utilises bat une liste longue que tu abandonnes.',
        'Le contexte d\'abord : 10 secondes sur le graphique journalier préviennent la plupart des mauvais trades. Si l\'unité supérieure est brouillonne, ton trade a besoin d\'une très forte raison.',
        'Un déclencheur est un événement précis, pas un ressenti. « Bougie englobante haussière au-dessus du support » est un déclencheur. « Ça a l\'air bien » non.',
        'Stop loss à l\'invalidation, pas à un montant confortable en dollars. Utilise les méthodes structure, ATR ou bougie.',
        'Utilise toujours un calculateur pour la taille de position. Le calcul mental sous pression transforme 1 % de risque en 3 %.',
        'Risque/rendement sous 1:2 = saute. Peu importe à quel point le setup paraît bon, les maths disent que le trade ne vaut pas la peine.',
      ]} />
    </BlogArticleLayout>
  );
}
