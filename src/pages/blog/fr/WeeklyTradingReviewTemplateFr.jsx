import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WeeklyTradingReviewTemplateFr() {
  return (
    <BlogArticleLayout
      slug="weekly-trading-review-template"
      lang="fr"
      title="Comment faire une revue de trading hebdomadaire (avec un modèle complet)"
      metaTitle="Revue de trading hebdomadaire : la routine de 15 min qui décuple ta progression | K.M.F."
      metaDescription="Un guide étape par étape pour mener une vraie revue de trading hebdomadaire. Inclut un modèle complet avec des questions pour évaluer ta performance, ta discipline et ta stratégie."
      date="16 janvier 2026"
      dateISO="2026-01-16"
      dateModified="2026-03-22"
      readTime="8 min de lecture"
      category="Amélioration"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: '10-questions-after-every-trade', title: '10 Questions Every Trader Should Ask After Every Trade', category: 'Improvement' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'trading-expectancy-explained', title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works', category: 'Statistics' },
      ]}
      faqItems={[
        { question: 'Comment faire une revue de trading hebdomadaire ?', answer: 'Revois 5 domaines chaque week-end : qualité d\'exécution des trades, respect de la gestion du risque, schémas émotionnels, conditions de marché et performance de la stratégie. Utilise un modèle structuré avec des questions précises pour chaque domaine.' },
        { question: 'Combien de temps une revue hebdomadaire doit-elle prendre ?', answer: '15 à 30 minutes suffisent si tu journalises tes trades quotidiennement. La revue hebdomadaire porte sur les schémas et tendances, pas sur la ré-analyse de trades individuels. Concentre-toi sur ce qui a changé cette semaine par rapport à la précédente.' },
        { question: 'Quelles questions poser dans une revue hebdomadaire ?', answer: 'Questions clés : ai-je suivi mes règles ? Quelle a été ma plus grosse erreur ? Quel a été mon trade le mieux exécuté ? Les émotions ont-elles affecté des décisions ? Quelle est la seule chose que j\'améliorerai la semaine prochaine ?' },
      ]}
      howToSteps={[
        { name: 'Revois tes statistiques', text: 'Commence par les chiffres bruts : total des trades, win rate, profit factor, R-multiple moyen. Compare à la semaine dernière et à ta base.' },
        { name: 'Évalue la qualité d\'exécution', text: 'Revois chaque trade pour le respect du plan. As-tu suivi tes critères d\'entrée, le placement du stop et les règles de sortie ? Note chaque trade.' },
        { name: 'Analyse les schémas émotionnels', text: 'Identifie quelles émotions ont influencé tes décisions. Cherche des schémas : revenge trades après les pertes, surconfiance après les gains.' },
        { name: 'Évalue la gestion du risque', text: 'Vérifie si tu as respecté les règles de dimensionnement, les limites de perte journalière maximale et l\'exposition aux corrélations sur tous les trades.' },
        { name: 'Fixe un seul objectif d\'amélioration', text: 'Choisis exactement une amélioration précise et mesurable pour la semaine prochaine. Écris-la et place-la là où tu la verras avant de trader.' },
      ]}
    >
      <Intro>
        La différence entre les traders qui progressent et ceux qui répètent les mêmes erreurs mois après mois est presque toujours la même : un groupe revoit sa performance systématiquement, l'autre non. Une revue de trading hebdomadaire n'est pas optionnelle pour un développement sérieux. C'est le mécanisme par lequel les schémas deviennent visibles, les erreurs deviennent des leçons, et les leçons deviennent des habitudes.
      </Intro>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>domaines de revue : stats, discipline,<br />processus, psychologie, objectifs</> },
        { value: 1, decimals: 0, label: <>focus d'amélioration par semaine —<br />se compose à 50 par an</> },
        { value: 30, decimals: 0, suffix: ' min', label: <>fenêtre de revue hebdo —<br />assez pour les schémas, pas le bruit</> },
      ]} />

      <H2>Pourquoi hebdomadaire — pas quotidien</H2>
      <P>
        Les revues quotidiennes sont utiles pour enregistrer les trades tant que les détails sont frais — en répondant à tes <Link to="/blog/10-questions-after-every-trade" className="text-kmf-accent hover:underline">questions de revue post-trade</Link> — mais elles sont trop proches de l'action pour la reconnaissance de schémas. Un jour donné, tu as peut-être eu deux trades. Ce n'est pas assez de données pour remarquer que tu fais régulièrement de l'overtrading le mardi, ou que tes setups du lundi matin ont un taux de perte nettement plus élevé.
      </P>
      <P>
        Les revues hebdomadaires offrent la bonne résolution. Tu as assez de trades pour repérer des schémas à court terme, assez de temps a passé pour revoir les décisions avec une distance émotionnelle, et la cadence est assez fréquente pour que tu puisses réellement changer ton comportement en réponse à ce que tu trouves.
      </P>
      <Callout title="Recommandation de timing" color="#FFB300">
        Le samedi matin est le moment idéal pour la plupart des traders. Les marchés sont fermés, la semaine est fraîche en mémoire, et tu as assez de distance avec la séance du vendredi pour revoir objectivement. Bloque 30 à 45 minutes et traite-le comme un rendez-vous non négociable.
      </Callout>

      <Divider />

      <H2>Les 5 domaines à revoir chaque semaine</H2>

      <H3>1. Revue des statistiques</H3>
      <P>
        Commence par les chiffres. Avant toute analyse qualitative, regarde les données brutes de la semaine. Ça ancre ta revue dans les faits plutôt que dans les impressions, souvent déformées par le biais de récence (ton trade le plus récent a tendance à colorer ta perception de toute la semaine).
      </P>
      <Ul items={[
        'Combien de trades ai-je pris cette semaine ?',
        'Quel était mon win rate, mon gain moyen, ma perte moyenne et mon profit factor ?',
        'Quels ont été mes meilleurs et pires trades, et qu\'est-ce qui les distinguait ?',
      ]} />

      <H3>2. Revue de la discipline</H3>
      <P>
        La discipline est mesurable. Pour chaque trade de la semaine, demande si tu as suivi tes règles exactement. Pas grossièrement. Exactement. Ça crée un « taux de respect des règles » qui est l'une des métriques les plus utiles qu'un trader en développement puisse suivre.
      </P>
      <Ul items={[
        'Quel pourcentage de mes trades a suivi mes critères d\'entrée sans déviation ?',
        'Ai-je respecté tous les stops loss, ou en ai-je déplacé un contre le trade ?',
        'Combien de trades étaient des trades impulsifs hors de mes setups définis ?',
      ]} />

      <H3>3. Revue du processus</H3>
      <P>
        Sépare la qualité de ton processus de la qualité du résultat. Un trade qui a parfaitement suivi tes règles mais a perdu de l'argent est un meilleur trade qu'un qui a enfreint tes règles mais a gagné — comprendre les <Link to="/blog/good-loss-vs-bad-win" className="text-kmf-accent hover:underline">bonnes pertes vs mauvais gains</Link> est essentiel pour ça. La revue du processus t'entraîne à t'évaluer sur ce que tu peux réellement contrôler.
      </P>
      <Ul items={[
        'Mes entrées correspondaient-elles à mes critères de setup pour l\'unité de temps, la structure et la confirmation ?',
        'Mes stops loss étaient-ils placés à des niveaux logiques, ou étaient-ils arbitraires ?',
        'Ai-je géré les trades ouverts selon mon plan, ou ai-je interféré prématurément ?',
      ]} />

      <H3>4. Revue psychologique</H3>
      <P>
        L'émotion laisse des empreintes sur tes données de trading. Des pertes plus grandes que la normale, des trades inhabituellement fréquents, des tailles de position qui dévient de tes règles — ça a souvent une cause émotionnelle. Cette section rend l'invisible visible.
      </P>
      <Ul items={[
        'Quels jours les émotions ont-elles le plus affecté ma prise de décision, et qu\'est-ce qui l\'a déclenché ?',
        'Y a-t-il eu des moments de revenge trading, d\'entrées FOMO, ou de sorties prématurées mues par la peur ?',
        'Quel était mon niveau de stress global cette semaine, et comment a-t-il corrélé avec ma performance ?',
      ]} />

      <H3>5. Revue des objectifs</H3>
      <P>
        Une séance de trading sans objectif n'est que du temps passé devant les graphiques. Les objectifs donnent une structure à la semaine et donnent à la revue quelque chose de concret à évaluer. Ils devraient être axés sur le processus, pas sur le résultat — « suivre ma checklist sur chaque trade » est un objectif utile ; « gagner 500 $ cette semaine » ne l'est pas, parce que ce n'est pas sous ton contrôle direct.
      </P>
      <Ul items={[
        'Ai-je atteint les objectifs de processus que je m\'étais fixés au début de cette semaine ?',
        'Quelle seule chose précise vais-je me concentrer à améliorer la semaine prochaine ?',
        'Quelle est une chose que j\'ai bien faite cette semaine et que je veux renforcer ?',
      ]} />

      <Divider />

      <H2>Le modèle complet de revue hebdomadaire</H2>
      <P>
        Utilise ces 15 questions comme cadre de revue. Tu n'as pas besoin d'écrire un roman pour chacune — une phrase ou deux suffisent. Le but est une réflexion structurée, pas du journal pour le journal.
      </P>
      <Table
        headers={['Domaine', 'Question']}
        rows={[
          ['Statistiques', 'Total des trades, gains, pertes, P/L net de la semaine ?'],
          ['Statistiques', 'Quel était mon profit factor et mon R-multiple moyen cette semaine ?'],
          ['Statistiques', 'Quel a été mon meilleur trade, et pourquoi a-t-il marché ?'],
          ['Discipline', 'Quel pourcentage de trades a suivi mes critères d\'entrée exactement ?'],
          ['Discipline', 'Ai-je respecté chaque stop loss ? Sinon, quels trades et pourquoi ?'],
          ['Discipline', 'Combien de trades étaient hors de mes setups définis ?'],
          ['Processus', 'Mes entrées étaient-elles bien chronométrées par rapport à mes critères ?'],
          ['Processus', 'Mes stops loss étaient-ils à des niveaux de structure ou arbitraires ?'],
          ['Processus', 'Suis-je sorti selon le plan, ou l\'émotion a-t-elle causé des sorties précoces ou tardives ?'],
          ['Psychologie', 'Quelle séance ou journée a été la plus affectée par l\'émotion ?'],
          ['Psychologie', 'Ai-je fait du revenge trade, des entrées FOMO, ou des sorties par peur cette semaine ?'],
          ['Psychologie', 'Comment ma vie hors trading (sommeil, stress) a-t-elle affecté ma performance ?'],
          ['Objectifs', 'Ai-je atteint mon objectif de processus de la revue de la semaine dernière ?'],
          ['Objectifs', 'Quelle est la SEULE chose que je me concentrerai à améliorer la semaine prochaine ?'],
          ['Objectifs', 'Quelle est une chose que j\'ai bien faite cette semaine et que je veux consciemment répéter ?'],
        ]}
      />

      <H2>Comment agir sur ta revue</H2>
      <P>
        L'erreur la plus courante que les traders font avec les revues est d'identifier cinq problèmes et d'essayer de tous les corriger simultanément. Ce n'est pas ainsi que le développement de compétences fonctionne. Choisis un problème — le plus impactant — et concentre-toi entièrement dessus la semaine suivante. Écris-le en haut de ton plan de trading. Revois-le avant chaque séance. À la fin de la semaine suivante, évalue si tu t'es amélioré sur cette seule métrique.
      </P>
      <P>
        Corriger une chose significative par semaine, c'est corriger 50 choses par an. L'amélioration composée à ce rythme transforme les traders.
      </P>

      <H2>Combien de temps cela devrait-il prendre ?</H2>
      <P>
        Trente à quarante-cinq minutes est la bonne fourchette. Moins de 30 minutes suggère que tu vas trop vite et restes superficiel. Plus de 45 minutes signifie généralement que tu sur-analyses des trades individuels au lieu de chercher des schémas sur la semaine. Le but n'est pas de réexaminer chaque tick de chaque graphique — c'est d'extraire les trois ou quatre insights clés qui rendront la semaine prochaine meilleure.
      </P>

      <Takeaways items={[
        'Les revues hebdomadaires sont le mécanisme principal par lequel les traders progressent réellement — pas le temps d\'écran seul.',
        'Revois cinq domaines chaque semaine : Statistiques, Discipline, Processus, Psychologie et Objectifs.',
        'Mesure ton taux de respect des règles — quel pourcentage de trades a suivi ton plan exactement.',
        'Sépare la qualité du processus de la qualité du résultat. Une perte parfaite vaut plus qu\'un gain chanceux.',
        'Choisis UNE chose à améliorer chaque semaine. L\'itération ciblée se compose rapidement sur un an.',
        '30 à 45 minutes le samedi matin est le timing optimal pour la plupart des traders retail.',
      ]} />
    </BlogArticleLayout>
  );
}
