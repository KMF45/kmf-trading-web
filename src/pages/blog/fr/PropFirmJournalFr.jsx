import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PropFirmJournalFr() {
  return (
    <BlogArticleLayout
      slug="prop-firm-trading-journal"
      lang="fr"
      title="Tueurs de prop firms : comment un journal de trading sauve ton compte funded"
      metaTitle="Journal prop firm : le système qui garde ton compte funded en vie | K.M.F."
      metaDescription="La plupart des échecs en prop firm ne sont pas de mauvais trades — ce sont des règles enfreintes. Apprends comment un journal avec calculateur de risque et checklists évite les dépassements de daily drawdown et garde ton compte funded en vie."
      date="23 février 2026"
      dateISO="2026-02-23"
      readTime="9 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'Pourquoi la plupart des traders de prop firm échouent-ils ?', answer: 'La plupart des échecs ne viennent pas de mauvaises stratégies mais de violations de règles — dépasser les limites de daily drawdown, faire de l\'overtrading après des pertes, et ne pas suivre le risque en temps réel.' },
        { question: 'Que doit suivre un journal de trading prop firm ?', answer: 'Suis ton P/L journalier par rapport à ta limite de drawdown, le nombre de trades par jour, le respect de la taille de position, les violations de règles et l\'état émotionnel.' },
        { question: 'Comment un journal aide-t-il à passer les évaluations prop firm ?', answer: 'Un journal impose la régularité en suivant chaque règle des critères d\'évaluation : perte journalière max, drawdown total max, jours de trading minimum et progression vers l\'objectif de profit.' },
      ]}
    >
      <Intro>
        Tu as passé deux semaines à valider la Phase 1. Encore deux semaines à galérer en Phase 2. Tu obtiens enfin le compte funded — 50 000 $, de l'argent réel, des règles réelles. Au jour quatre, tu prends une position légèrement surdimensionnée sur GBP/JPY. Elle part contre toi de 80 pips. Tu es à −3,2 % sur la journée. La limite de daily drawdown est de 4 %. Une bougie de plus et c'est fini. Tout ce pour quoi tu as travaillé — parti en quatre jours. Ce n'est pas un cas hypothétique. C'est l'histoire de prop firm la plus courante qui existe.
      </Intro>

      <StatsStrip items={[
        { value: 4, decimals: 0, suffix: '%', label: <>limite typique de daily drawdown<br />sur les comptes funded</> },
        { value: 60, decimals: 0, suffix: '%', label: <>de la limite de la firme —<br />ton hard stop personnel</> },
        { value: 1.5, decimals: 1, suffix: '%', label: <>risque maximum par trade<br />sur un compte prop firm</> },
      ]} />

      <H2>Pourquoi les prop firms sont différentes</H2>
      <P>
        Trader un compte personnel et trader un compte prop firm sont des jeux fondamentalement différents. Avec ton propre argent, une journée à −5 % de drawdown est douloureuse mais survivable. Avec une prop firm, une journée à −5 % de drawdown signifie que tu perds le compte. Point. Pas de seconde chance. Pas de « je vais me refaire demain ». Le compte est fermé, et si tu veux réessayer, tu paies une nouvelle évaluation.
      </P>
      <P>
        La plupart des règles de prop firm ressemblent à ceci : perte journalière maximale de 4-5 %, drawdown total maximum de 8-10 %, jours de trading minimum, pas de positions gardées à travers les news. Ces règles sont strictes, impitoyables et absolues. Et elles sont conçues pour attraper exactement le genre de comportement impulsif et indiscipliné vers lequel la plupart des traders retail basculent sous pression.
      </P>
      <P>
        Les traders qui passent les évaluations et gardent leurs comptes funded ne sont pas ceux qui ont les meilleures stratégies. Ce sont ceux qui ont les meilleurs systèmes de discipline. Et un journal de trading bien configuré est le système de discipline le plus efficace que tu puisses construire.
      </P>

      <Divider />

      <H2>Les trois façons dont les traders perdent leurs comptes funded</H2>

      <H3>1. Le revenge trade surdimensionné</H3>
      <P>
        Ça commence par une perte normale. −0,8 % sur la journée. Bon. Puis une autre : −0,5 %. Maintenant tu es à −1,3 % et tu sens la pression. Au lieu de t'arrêter, tu doubles ta prochaine position pour « te refaire vite ». Ce trade part contre toi. Soudain tu es à −3,5 % et à un stop loss du dépassement. C'est du <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">revenge trading</Link> d'école — le tueur de compte numéro un en prop trading.
      </P>

      <H3>2. L'erreur de dimensionnement</H3>
      <P>
        Sur un compte FTMO de 100 000 $ avec une limite de daily drawdown de 5 %, ta perte journalière maximale est de 5 000 $. Si tu prends trois trades, chacun peut risquer au maximum ~1 650 $. Mais la plupart des traders calculent la taille de lot selon « ce qui leur semble bien » plutôt que sur la vraie limite de drawdown. Ils risquent 2 500 $ par trade, prennent trois trades, et une mauvaise séance les efface. Les maths étaient fausses avant même le premier trade. Un vrai <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">système de dimensionnement</Link> évite ça entièrement.
      </P>

      <H3>3. La spirale du « juste un trade de plus »</H3>
      <P>
        Tu as atteint ta limite de perte journalière — ou tu en es dangereusement proche. Le geste rationnel est de fermer la plateforme. Mais un setup parfait se forme. Juste un de plus. Cette fois ça marchera. Non. Et maintenant le compte est dépassé non à cause de mauvais trading, mais parce que tu n'avais pas de système pour te forcer à t'arrêter.
      </P>

      <Callout title="Le schéma" color="#FF5252">
        Remarque qu'aucun de ces échecs ne concerne la stratégie. Ils concernent la gestion du risque et la discipline. Les setups étaient souvent parfaitement valides. Les tailles de position, l'escalade émotionnelle et l'incapacité à s'arrêter — voilà les tueurs.
      </Callout>

      <Divider />

      <H2>Construire un système de survie prop firm</H2>
      <P>
        Voici comment structurer ton journal de trading pour protéger ton compte funded. Pense-le comme un filet de sécurité qui te rattrape avant le dépassement — pas après.
      </P>

      <H3>Pré-séance : connais tes chiffres</H3>
      <P>
        Avant d'ouvrir un seul graphique, calcule trois chiffres pour aujourd'hui :
      </P>
      <Ul items={[
        'Perte journalière maximale en dollars (taille du compte × % de daily drawdown — ex. : 50 000 $ × 4 % = 2 000 $)',
        'Risque maximum par trade en dollars (max journalier ÷ nombre de trades prévus — ex. : 2 000 $ ÷ 3 = 666 $)',
        'Buffer actuel jusqu\'au drawdown total (combien de marge il te reste avant que le trailing max drawdown soit dépassé)',
      ]} />
      <P>
        Écris ces chiffres dans ton journal avant la séance. Ce sont tes limites. Chaque décision du reste de la journée doit tenir à l'intérieur.
      </P>

      <H3>Pré-trade : la checklist prop firm</H3>
      <P>
        Ta checklist pré-trade pour un compte funded devrait inclure deux éléments supplémentaires dont les comptes personnels n'ont pas besoin :
      </P>
      <Ul items={[
        '« Si ce trade touche le stop loss, suis-je encore dans ma limite de daily drawdown ? » — Si la réponse est non, le trade ne peut pas être pris, quelle que soit la qualité du setup.',
        '« Combien de trades ai-je déjà pris aujourd\'hui, et quel est mon P/L jusqu\'ici ? » — Ça évite la spirale du « juste un de plus » en te forçant à confronter ta position actuelle avant d\'ajouter du risque.',
      ]} />

      <Callout title="Comment K.M.F. gère ça" color="#4FC3F7">
        Le calculateur de taille de lot de K.M.F. calcule des tailles de position exactes à partir de ton solde, ton pourcentage de risque et la distance de ton stop loss. Pour un compte prop firm, règle ton risque à 1-1,5 % maximum par trade. La checklist pré-trade vérifie que chaque entrée remplit tes critères — y compris les critères de risque — avant que tu places l'ordre. Si tu sautes une case, la checklist est incomplète. C'est un garde-fou mécanique contre l'exécution impulsive.
      </Callout>

      <Divider />

      <H3>Pendant la séance : la règle du hard stop</H3>
      <P>
        Décide à l'avance : « Si j'atteins X % de perte journalière, je ferme la plateforme. Pas après le prochain trade. Maintenant. » Pour un détail complet de cette approche, vois notre <Link to="/blog/prop-firm-daily-drawdown-guide" className="text-kmf-accent hover:underline">guide du daily drawdown</Link>. Pour la plupart des comptes prop firm, ça devrait être réglé à 60-70 % du daily drawdown autorisé. Si la limite est 5 %, ton hard stop est à 3 %. Ça te donne une zone tampon — parce qu'au moment où tu atteins ta limite auto-imposée et que tu pars, tu as encore 2 % de marge en cas de slippage ou de gap sur une position ouverte.
      </P>
      <P>
        Note cette règle dans ton journal. Après la séance, écris si tu l'as honorée. Sinon — si tu as continué à trader après avoir atteint ta limite — c'est le point de donnée le plus important de la journée. Pas le P/L. La transgression de discipline.
      </P>

      <H3>Post-séance : l'audit journalier</H3>
      <P>
        À la fin de chaque journée de trading, note trois choses dans ton journal :
      </P>
      <Ul items={[
        'P/L journalier en pourcentage du compte — pas en dollars. Les pourcentages gardent les règles de drawdown en focus.',
        'Nombre de trades pris vs maximum prévu — si tu prévoyais 3 trades et en as pris 6, c\'est un échec de discipline quel que soit le résultat.',
        'État émotionnel à chaque entrée — certains des trades d\'aujourd\'hui étaient-ils mus par la frustration, la revanche ou l\'ennui plutôt que par un setup valide ?',
      ]} />

      <Divider />

      <H2>L'histoire de Maria : comment le journal a sauvé un compte de 100 000 $</H2>
      <P>
        Maria a passé son évaluation FTMO à la deuxième tentative. Elle avait déjà perdu un compte funded son premier mois — deux revenge trades un seul jeudi avaient effacé son daily drawdown. Cette fois, elle était déterminée à faire différemment.
      </P>
      <P>
        Elle a mis en place une routine stricte : chaque matin, elle écrivait sa perte journalière max (5 000 $) et son risque par trade (1 200 $) dans son journal. Elle passait chaque setup par sa checklist. Après deux pertes dans une journée, elle fermait la plateforme — sans exception. Elle notait son état émotionnel avant chaque trade : confiante, neutre, anxieuse, frustrée.
      </P>
      <P>
        Après six semaines, quelque chose de remarquable est apparu dans ses données. Les jours où elle marquait « anxieuse », son win rate était de 31 %. Les jours « confiante » ou « neutre », il était de 62 %. La stratégie était la même. Les setups étaient les mêmes. La seule variable, c'était elle. Armée de cette donnée, elle a fait une règle : si son check émotionnel pré-séance revenait anxieux ou frustré, elle tradait en demi-taille ou ne tradait pas du tout.
      </P>
      <P>
        Trois mois plus tard, elle est toujours funded. Non parce qu'elle a trouvé une meilleure stratégie, mais parce qu'elle a bâti un système qui protège le compte d'elle-même.
      </P>

      <Divider />

      <H2>L'état d'esprit prop firm</H2>
      <P>
        Les traders qui gardent leurs comptes funded à long terme partagent un modèle mental : ils traitent les règles de la prop firm non comme des restrictions, mais comme leur stratégie de trading. La limite de daily drawdown n'est pas un obstacle — c'est la règle la plus importante de leur plan. La limite de taille de position n'est pas une contrainte — c'est une fonction de gestion du risque qu'ils ne pouvaient pas s'imposer avant.
      </P>
      <P>
        Un journal de trading transforme ces règles externes en habitudes internes. Quand tu enregistres chaque trade contre la limite de drawdown, quand tu passes chaque setup par une checklist, quand tu revois chaque semaine si tu as honoré ton hard stop — les règles deviennent automatiques. Et c'est là que le prop trading cesse d'être un test de stress et commence à être une carrière.
      </P>

      <Takeaways items={[
        'La plupart des échecs en prop firm viennent d\'erreurs de dimensionnement, de revenge trading et de l\'incapacité à s\'arrêter — pas de mauvaises stratégies.',
        'Calcule ta perte journalière max et ton risque par trade avant chaque séance. Écris-les. Ce sont tes limites absolues.',
        'Ajoute deux éléments propres au prop à ta checklist pré-trade : « Suis-je dans le daily drawdown ? » et « Combien de trades ai-je pris aujourd\'hui ? »',
        'Fixe un hard stop à 60-70 % du daily drawdown autorisé. Ferme la plateforme quand tu l\'atteins. Note si tu l\'as honoré.',
        'Suis l\'état émotionnel par trade. La corrélation entre émotions et résultats est la donnée la plus précieuse qu\'un trader prop puisse avoir.',
      ]} />
    </BlogArticleLayout>
  );
}
