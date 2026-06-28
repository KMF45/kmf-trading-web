import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function GhostTradesFr() {
  return (
    <BlogArticleLayout
      slug="ghost-trades-journaling-missed-opportunities"
      lang="fr"
      title="Ghost trades : pourquoi les trades que tu ne prends pas te coûtent plus que ceux que tu perds"
      metaTitle="Ghost trades : pourquoi les trades que tu sautes coûtent plus que tes pertes | K.M.F."
      metaDescription="Les trades que tu sautes par peur ou hésitation surperforment souvent ceux que tu prends. Apprends à journaliser les occasions manquées et à transformer les ghost trades en ton plus grand edge."
      date="25 février 2026"
      dateISO="2026-02-25"
      readTime="8 min de lecture"
      category="Psychologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'execution-gap-backtest-vs-live-trading', title: 'The Execution Gap: Why Your Strategy Works in Backtesting But Fails Live', category: 'Psychology' },
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce qu\'un ghost trade ?', answer: 'Un ghost trade est un setup valide que tu as identifié mais n\'as pas pris — généralement par peur, hésitation ou à cause de pertes récentes. Les suivre révèle des schémas d\'occasions manquées qui peuvent être plus grands que tes vraies pertes.' },
        { question: 'Dois-je journaliser les trades que je n\'ai pas pris ?', answer: 'Oui. Enregistrer les occasions manquées avec l\'entrée, le stop loss et le résultat final t\'aide à mesurer le coût de l\'hésitation. Beaucoup de traders découvrent que leurs ghost trades surperforment leurs vrais trades.' },
        { question: 'Comment arrêter de rater de bons trades ?', answer: 'Réduis la taille de position pour baisser les enjeux émotionnels, utilise une checklist pour que les entrées semblent systématiques plutôt qu\'émotionnelles, et place des alertes pour être prévenu quand le prix atteint ta zone d\'entrée.' },
      ]}
    >
      <Intro>
        Mardi, 9h47. Tu observes GBP/USD en 1 heure. Pullback propre dans la EMA 50. Le 15 minutes montre une bougie englobante haussière avec volume croissant. Ta checklist dit de le prendre. Ton intuition dit d'attendre. Tu regardes une bougie de plus. Puis une autre. Quinze minutes plus tard, le prix a bougé de 35 pips sans toi. Tu fixes l'écran et murmures ce que chaque trader a murmuré au moins une fois : « Je le savais. » Ce trade vient de devenir un fantôme — et il va te hanter le reste de la semaine.
      </Intro>

      <StatsStrip items={[
        { value: 10, decimals: 0, suffix: 'R', label: <>« taxe d'exécution » typique perdue<br />quand tu sautes la moitié de tes setups</> },
        { value: 31, decimals: 0, label: <>setups dans un mois — le trader<br />retail moyen n'en enregistre que 18</> },
        { value: 1, decimals: 0, label: <>checklist entre l'hésitation<br />et les ghost trades inutiles</> },
      ]} />

      <H2>Qu'est-ce qu'un ghost trade ?</H2>
      <P>
        Un ghost trade est un setup valide qui a rempli tes critères d'entrée mais que tu n'as pas pris. Ce n'est pas un trade raté parce que tu étais loin de l'écran. C'est un trade que tu as vu, reconnu, et consciemment choisi de ne pas prendre — généralement par peur, hésitation, ou un vague sentiment que « quelque chose n'allait pas ».
      </P>
      <P>
        Les ghost trades sont invisibles dans ton journal. Ils n'apparaissent pas dans ton P/L. Ils n'apparaissent pas dans tes statistiques. Ce sont la matière noire de ton univers de trading — tu ne peux pas les voir, mais ils déforment tout autour d'eux. Et si tu ne commences pas à les suivre, tu ne comprendras jamais pourquoi tes résultats réels ne correspondent pas à ton backtest.
      </P>

      <Divider />

      <H2>Le vrai coût de ne pas trader</H2>
      <P>
        La plupart des traders sont obsédés par leurs pertes. Ils rejouent les trades perdants dans leur tête, les journalisent obsessionnellement, essaient de comprendre ce qui a mal tourné. Mais voici ce que personne ne te dit : les trades que tu sautes te coûtent souvent plus que les trades que tu perds.
      </P>
      <P>
        Considère une stratégie avec 60 % de win rate et un gagnant moyen de 2R. Si la stratégie génère 20 setups par mois et que tu prends les 20, tu attends environ 12 gagnants (24R) et 8 perdants (8R) — soit un net de +16R. Maintenant imagine que tu ne prends que 12 de ces 20 setups parce que les 8 autres « semblaient louches ». Si les trades sautés avaient le même win rate de 60 %, tu viens de laisser environ 10R sur la table. C'est plus que les 8R perdus sur tes vrais trades perdants.
      </P>
      <P>
        Les maths sont claires : l'exécution sélective d'un système éprouvé détruit l'edge plus vite que les trades perdants.
      </P>

      <Callout title="Le piège de la sélectivité" color="#CE93D8">
        Quand tu sautes des setups en te basant sur des sensations, tu n'es pas « sélectif » — tu ajoutes un filtre aléatoire à un système conçu et testé sans ce filtre. Ton backtest n'incluait pas de variable « intuition ». Chaque setup que tu sautes fait diverger davantage tes résultats réels de tes résultats attendus.
      </Callout>

      <Divider />

      <H2>Pourquoi on saute des setups valides</H2>

      <H3>1. L'effet de la perte fraîche</H3>
      <P>
        Tu viens de perdre un trade. Le setup était valide, l'exécution propre, mais le marché est parti contre toi. Maintenant un autre setup valide apparaît. Il ressemble exactement à celui qui vient de perdre. Ton cerveau crie : « Ce schéma vient d'échouer. Ne le refais pas. » Alors tu le sautes. Le setup marche. Tu viens de transformer une perte en deux — la vraie perte et le gain manqué.
      </P>
      <P>
        C'est le biais de récence à son plus destructeur. Ton cerveau traite le dernier résultat comme une prédiction du suivant, même si chaque trade est statistiquement indépendant. Une pièce qui vient de tomber sur face n'est pas plus susceptible de tomber sur pile. Un setup qui vient de se faire stopper n'est pas plus susceptible de se faire stopper à nouveau.
      </P>

      <H3>2. Le filtre de perfection</H3>
      <P>
        Après une série de pertes, beaucoup de traders relèvent inconsciemment leur barre d'entrée. Le setup doit être « parfait ». Ils commencent à exiger plus de confluence — une confirmation d'indicateur supplémentaire, une entrée plus précise, un risque/rendement légèrement meilleur. Le setup qui aurait été une entrée claire la semaine dernière doit maintenant être un chef-d'œuvre. Ce filtre ressemble à de la discipline, mais c'est en fait de la peur déguisée en discipline.
      </P>

      <H3>3. La paralysie de l'analyse</H3>
      <P>
        Tu vois le setup en 1 heure. Tu vérifies le 4 heures — ça a l'air bon. Tu vérifies le journalier — toujours bien. Tu vérifies le calendrier économique — rien de majeur. Tu vérifies la corrélation avec le DXY — neutre. Tu vérifies Twitter — quelqu'un d'autre voit le même setup. Le temps de l'avoir validé sous tous les angles possibles, la fenêtre d'entrée s'est fermée. Tu n'as pas sauté le trade exprès. Tu l'as analysé à mort.
      </P>

      <H3>4. Le paradoxe de la FOMO</H3>
      <P>
        Celui-ci est contre-intuitif. La peur de rater pousse en général les traders à entrer dans trop de trades. Mais après quelques pertes dues à la FOMO, certains traders basculent à l'extrême opposé. Ils deviennent si effrayés par les entrées impulsives qu'ils remettent en question chaque décision — y compris les valides. Le remède à la FOMO devient pire que le mal.
      </P>

      <Divider />

      <H2>Comment journaliser les ghost trades</H2>
      <P>
        La solution est simple en concept et difficile en pratique : commence à enregistrer chaque setup valide que tu vois, que tu le prennes ou non. C'est l'habitude la plus puissante que tu puisses ajouter à ton journal.
      </P>

      <H3>Étape 1 : définis « setup valide » par écrit</H3>
      <P>
        Avant de pouvoir journaliser les ghost trades, il te faut une définition objective de ce qui qualifie comme setup. Écris tes critères exacts. Pas « le price action a l'air bon » — des critères précis et vérifiables. « Le prix fait un pullback vers la EMA 50 en 1H, le 15M clôture haussier avec un corps plus grand que la mèche, volume au-dessus de la moyenne sur 20 périodes. » Si tu ne peux pas le définir précisément, tu ne peux pas évaluer honnêtement si tu aurais dû le prendre.
      </P>

      <H3>Étape 2 : enregistre-le en temps réel</H3>
      <P>
        Quand tu vois un setup valide et décides de ne pas le prendre, ouvre ton journal immédiatement et enregistre-le. Écris :
      </P>
      <Ul items={[
        'La paire, l\'unité de temps et la direction',
        'Pourquoi il qualifiait selon tes règles',
        'Pourquoi tu as choisi de ne pas entrer — la raison honnête, pas celle rationalisée',
        'Ce qu\'auraient été ton entrée, ton stop loss et ton take profit',
      ]} />
      <P>
        La raison honnête est la partie difficile. « Le spread était trop large » est une raison légitime. « J'avais un mauvais pressentiment » est de la peur. « Je voulais plus de confirmation » est de l'hésitation. Sois impitoyable avec toi-même. Le journal ne marche que si tu es honnête.
      </P>

      <H3>Étape 3 : suis le résultat</H3>
      <P>
        Reviens après la séance — ou le lendemain — et vérifie ce qui s'est passé. Le ghost trade a-t-il atteint ton take profit ? S'est-il fait stopper ? Enregistre le résultat comme si tu l'avais pris. Avec le temps, ça crée un registre de performance parallèle : ce que tu as réellement gagné contre ce que tu aurais gagné si tu avais pris chaque setup valide.
      </P>

      <Callout title="Comment K.M.F. aide" color="#4FC3F7">
        K.M.F. Trading Journal te permet d'enregistrer et de taguer les setups manqués à côté de tes vrais trades. Dans ta revue hebdomadaire, tu peux comparer la performance des trades pris contre les trades sautés — et voir exactement combien l'exécution sélective te coûte. Quand les données montrent que tes ghost trades gagnent au même taux que tes vrais trades, l'hésitation perd son pouvoir.
      </Callout>

      <Divider />

      <H2>Le problème de ghost trades de Daniel</H2>
      <P>
        Daniel tradait une simple stratégie breakout-pullback sur EUR/USD et GBP/USD. Son backtest montrait un win rate de 58 % avec un gagnant moyen de 1,7R. Edge solide. Mais après quatre mois de trading réel, son compte était plat. Pas perdant — juste pas en croissance. Son win rate réel était de 54 %, ce qui aurait dû suffire, mais quelque chose clochait.
      </P>
      <P>
        Son mentor a suggéré de suivre les ghost trades. Daniel a résisté au début — ça semblait inutile d'enregistrer des trades qu'il n'avait pas pris. Mais il s'y est engagé pendant un mois. À la fin du mois, les données étaient choquantes. Il avait vu 31 setups valides. Il en a pris 18 et sauté 13. Les 18 pris avaient un win rate de 50 %. Les 13 sautés avaient un win rate de 69 %.
      </P>
      <P>
        Daniel ne sautait pas les trades au hasard. Il sautait systématiquement ceux qui semblaient incertains — les setups aux niveaux clés où le marché pouvait aller dans les deux sens. C'étaient précisément les trades aux meilleurs ratios risque/rendement, parce que l'incertitude du marché se reflétait dans la structure du prix. Les trades « sûrs » qu'il préférait étaient les évidents, à cibles plus serrées et gain plus faible.
      </P>
      <P>
        Une fois les données vues, Daniel a fait une règle : si le setup passe la checklist, il le prend. Pas de vérification au feeling. Pas de confirmation supplémentaire. Checklist complète, entrée. Trois mois plus tard, son win rate correspondait à son backtest, et son compte grandissait.
      </P>

      <Divider />

      <H2>Transformer les ghost trades en edge</H2>
      <P>
        Les ghost trades ne sont pas qu'un problème à corriger. Ce sont une source d'information que presque aucun trader retail n'utilise. Quand tu as trois mois de données de ghost trades, tu peux répondre à des questions qui seraient autrement impossibles :
      </P>
      <Ul items={[
        'Les setups que je saute sont-ils réellement pires que ceux que je prends ? (Généralement non.)',
        'Quel état émotionnel corrèle avec le fait de sauter ? (Généralement post-perte ou anxieux.)',
        'Y a-t-il un moment précis de la journée où je saute plus de setups ? (Souvent oui — fatigue de fin de séance.)',
        'Est-ce que je saute plus sur certaines paires ? (Certains traders hésitent sur les paires volatiles mais prennent chaque setup sur les paires « confortables ».)',
      ]} />
      <P>
        Ces données transforment ton journal d'un registre de ce qui s'est passé en un outil de diagnostic du pourquoi tes résultats divergent de ton attente. Et une fois que tu connais le « pourquoi », la solution est généralement simple.
      </P>

      <H3>La revue hebdomadaire des ghost trades</H3>
      <P>
        Ajoute une section à ta revue hebdomadaire : « Trades que je n'ai pas pris ». Liste chaque ghost trade de la semaine. Vérifie le résultat. Calcule à quoi aurait ressemblé ta semaine si tu avais pris chaque setup valide. L'écart entre ton P/L réel et le P/L complet est ta taxe d'exécution — le coût de laisser les émotions filtrer ton système.
      </P>
      <P>
        Certaines semaines, la taxe d'exécution sera nulle. Ce sont les semaines où tu as tradé comme une machine. D'autres semaines, la taxe sera plus grande que tes vraies pertes. Ce sont les semaines qui comptent le plus — non parce qu'elles étaient mauvaises, mais parce qu'elles te montrent exactement où va ton argent.
      </P>

      <Takeaways items={[
        'Les ghost trades — setups valides que tu vois mais ne prends pas — sont invisibles dans ton P/L mais coûtent souvent plus que tes vraies pertes.',
        'L\'exécution sélective détruit l\'edge. Ton backtest supposait que tu prends chaque setup valide. Chaque saut fait diverger tes résultats réels des résultats attendus.',
        'Enregistre chaque setup valide en temps réel, y compris ceux que tu sautes. Écris la raison honnête — peur, hésitation et « mauvais pressentiment » ne sont pas la même chose que des setups invalides.',
        'Suis les résultats des ghost trades et compare-les à tes trades pris. Les données montrent généralement que les setups sautés performent aussi bien ou mieux que ceux pris.',
        'Ajoute une section « trades que je n\'ai pas pris » à ta revue hebdomadaire. L\'écart entre le P/L réel et complet est ta taxe d\'exécution.',
      ]} />
    </BlogArticleLayout>
  );
}
