import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WhatIsKmfTradingJournalFr() {
  return (
    <BlogArticleLayout
      slug="what-is-kmf-trading-journal"
      lang="fr"
      title="Qu'est-ce que K.M.F. Trading Journal ? L'app construite par des traders lassés des tableurs"
      metaTitle="K.M.F. Trading Journal : le guide complet de l'app construite par des traders, pour des traders | K.M.F."
      metaDescription="K.M.F. Trading Journal est une application Android gratuite pour les traders forex, actions et crypto. Suivi psychologique, détection de tilt, calculateur de lot et statistiques avancées — construite par des traders qui tradent vraiment."
      date="15 mars 2026"
      dateISO="2026-03-15"
      readTime="10 min de lecture"
      category="Avis Applications"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'best-free-trading-journal-app-android-2026', title: 'Best Free Trading Journal App for Android in 2026', category: 'App Reviews' },
        { slug: 'excel-vs-trading-journal-app', title: 'Why Excel Is Slowly Killing Your Trading Performance', category: 'Improvement' },
        { slug: 'tradingview-kmf-workflow', title: 'TradingView + K.M.F. Journal: The Perfect Workflow for a Modern Trader', category: 'Improvement' },
      ]}
      faqItems={[
        { question: 'K.M.F. Trading Journal est-il gratuit ?', answer: 'Oui. Les fonctions de base du journal sont gratuites — enregistrement des trades (15 trades), historique, statistiques de base, calculateur de lot, checklist, journal et synchronisation cloud avec accès hors ligne. La version Premium (5,99 $/mois ou 49,99 $/an) ajoute les trades illimités, les statistiques avancées, le suivi des émotions et plus encore.' },
        { question: 'Quels marchés K.M.F. prend-il en charge ?', answer: 'K.M.F. prend en charge le forex, les actions, la crypto, les matières premières et les indices. Le calculateur de taille de lot s\'adapte automatiquement aux différentes valeurs de pip et tailles de contrat.' },
        { question: 'K.M.F. se connecte-t-il à mon broker ?', answer: 'Non. K.M.F. utilise uniquement la saisie manuelle des trades. Tes identifiants de broker et tes données de trading restent totalement privés — aucune clé API, aucun accès au compte, aucun partage de données.' },
        { question: 'K.M.F. est-il disponible sur iPhone ?', answer: 'Pour l\'instant, K.M.F. est uniquement disponible sur Android. La version iOS est prévue, mais aucune date de sortie n\'est encore confirmée.' },
        { question: 'Que signifie K.M.F. ?', answer: 'Keep Moving Forward (continue d\'avancer). Cela reflète la philosophie de l\'app — le trading est un chemin d\'amélioration continue, pas une destination.' },
      ]}
    >
      <Intro>
        Il y a deux ans, nous étions exactement là où tu te trouves aujourd'hui. À trader le forex et la crypto, à essayer de progresser, en jonglant entre des tableurs Excel, des captures d'écran rangées dans des dossiers au hasard et des notes tapées sur le téléphone à 2 h du matin après une mauvaise séance. Nous avons essayé toutes les applications de journal du marché. Certaines demandaient 20 à 30 $ par mois et un accès au broker. D'autres n'avaient aucune application mobile. Quelques-unes coûtaient des centaines de dollars d'avance et ne tournaient que sur ordinateur. Aucune ne suivait la psychologie. Aucune ne fonctionnait hors ligne. Aucune ne donnait l'impression d'avoir été construite par des gens qui sont vraiment devant les graphiques tous les jours. Alors nous avons construit K.M.F.
      </Intro>

      <StatsStrip items={[
        { value: 30, decimals: 0, suffix: 's', label: <>temps typique pour enregistrer<br />un trade dans K.M.F. — sans friction</> },
        { value: 7, decimals: 0, label: <>langues prises en charge<br />dans la version gratuite</> },
        { value: 4, decimals: 0, label: <>niveaux de détection de tilt<br />actifs à chaque saisie</> },
      ]} />

      <H2>Ce qu'est réellement K.M.F.</H2>
      <P>
        K.M.F. — Keep Moving Forward — est une application de journal de trading pour Android. Pas un service de signaux. Pas une plateforme de copy-trading. Pas une formation avec un journal greffé dessus. C'est un outil concentré, conçu dans un seul but : enregistrer tes trades, analyser ta performance et comprendre ta propre psychologie de trader.
      </P>
      <P>
        Il fonctionne pour le forex, les actions, la crypto, les matières premières et les indices. Il fonctionne hors ligne. Il n'exige aucune connexion à un broker. Il ne demande ni tes clés API ni tes identifiants de compte. Tes données restent sur ton téléphone, avec une sauvegarde cloud optionnelle si tu le souhaites.
      </P>
      <P>
        Le nom reflète la philosophie : le trading ne consiste pas à être parfait. Il consiste à s'améliorer, un trade à la fois. Keep moving forward — même après une série de pertes, même après une règle brisée, même après la pire semaine de ta carrière. Enregistre-la, apprends-en quelque chose, et prends le prochain trade un peu mieux.
      </P>

      <Divider />

      <H2>Pourquoi nous l'avons construite (la version honnête)</H2>
      <P>
        Nous sommes des traders. Pas une startup de la Silicon Valley qui a lu un rapport d'étude de marché sur « le TAM du journal de trading ». Nous tradons le forex et la crypto. Nous avons cramé des comptes. Nous avons fait du revenge trading après des pertes. Nous avons fixé un tableur rempli de chiffres sans en tirer absolument rien.
      </P>
      <P>
        Le déclic est venu quand l'un de nous a réalisé que ses trois derniers comptes cramés suivaient le même schéma : deux pertes consécutives, suivies d'un trade de revanche surdimensionné, suivi du tilt. La donnée était là — enterrée dans un tableur de 400 lignes, sans aucun moyen de détecter le schéma automatiquement. Un vrai journal l'aurait repérée dès la deuxième semaine. Au lieu de ça, il a fallu six mois et 4 000 $ de pertes.
      </P>
      <P>
        C'est pour ça que K.M.F. existe. Pas parce que le monde avait besoin d'une application de plus, mais parce que nous avions besoin d'un outil qui aide réellement les traders à progresser — pas seulement d'un endroit où déverser des données de trades.
      </P>

      <Callout title="Le principe fondateur" color="#4FC3F7">
        Chaque fonctionnalité de K.M.F. a été construite pour répondre à une seule question : « Est-ce que ça aidera un trader à prendre de meilleures décisions demain ? » Si la réponse était non, nous ne l'avons pas construite. Pas de fils d'actualité sociaux, pas de classements, pas de copy-trading. Ces fonctions rendent les apps plus addictives. Elles ne rendent pas les traders meilleurs.
      </Callout>

      <Divider />

      <H2>Ce qu'il y a à l'intérieur de l'app</H2>
      <P>
        Voici un tour complet de chaque fonctionnalité majeure — ce qu'elle fait, pourquoi elle existe et comment elle t'aide à progresser.
      </P>

      <H3>Saisie de trade intelligente</H3>
      <P>
        Enregistrer un trade prend moins de 30 secondes. Autocomplétion de l'instrument, direction, prix d'entrée et de sortie, stop loss, take profit, taille de lot et une note optionnelle. L'app contrôle ton SL/TP pour détecter les erreurs de saisie avant l'enregistrement. Tu peux aussi joindre une capture d'écran de ton setup (Premium).
      </P>
      <P>
        Pourquoi la vitesse compte : si enregistrer un trade prend 5 minutes, tu auras arrêté dès la deuxième semaine. Nous le savons parce que nous avons nous-mêmes arrêté avec tous les autres outils essayés. Trente secondes, c'est le seuil — en dessous, ça devient une habitude. Au-dessus, ça devient une corvée.
      </P>

      <H3>Tableau de bord en direct</H3>
      <P>
        Le tableau de bord montre ta réalité de trading en un coup d'œil : P/L total, win rate, nombre total de trades, P/L mensuel, drawdown maximum et profit factor. En dessous, une courbe d'évolution du solde, un résumé de performance (gain moyen, perte moyenne, meilleur trade, pire trade) et les positions ouvertes. Aucun remplissage. Aucune citation motivante. Juste tes chiffres.
      </P>

      <H3>Statistiques avancées (Premium)</H3>
      <P>
        C'est là que K.M.F. se démarque d'un tableur. La page de statistiques calcule tout automatiquement à partir de tes données brutes :
      </P>
      <Ul items={[
        'Win rate, profit factor et espérance de gain — les trois chiffres qui te disent si ta stratégie fonctionne vraiment',
        'Distribution des R-multiples — la performance de tes trades par rapport au risque, pas seulement en dollars',
        'P/L par jour de la semaine — est-ce que les lundis tuent ton compte ?',
        'P/L par session — asiatique, Londres, New York. Dans quelle session se trouve ton edge ?',
        'Meilleurs instruments — quelles paires ou quels symboles te font réellement gagner de l\'argent ?',
        'Drawdown maximum et courbe d\'équité — l\'histoire visuelle de ton compte dans le temps',
        'Analyse de durée — gardes-tu tes gagnants assez longtemps ? Coupes-tu tes perdants assez vite ?',
      ]} />
      <P>
        Tout cela se met à jour automatiquement à mesure que tu enregistres tes trades. Aucune formule à construire, aucun tableau croisé dynamique à maintenir, aucune <Link to="/blog/excel-vs-trading-journal-app" className="text-kmf-accent hover:underline">erreur de tableur</Link> qui corrompt silencieusement tes données.
      </P>

      <H3>Calculateur de taille de lot</H3>
      <P>
        Saisis le solde de ton compte, ton pourcentage de risque, ton prix d'entrée et ton niveau de stop loss. Le calculateur sort la taille de lot exacte. Il gère le forex, la crypto et les actions, convertit automatiquement les taux de change et fonctionne hors ligne. Fini le « je trade d'habitude 0,1 lot » — ce n'est pas de la gestion du risque, c'est une estimation qui finira par te mettre dans un trade où 0,1 lot représente 5 % de ton compte.
      </P>

      <H3>Checklist pré-trade</H3>
      <P>
        Une <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">checklist pré-trade</Link> personnalisable que tu parcours avant chaque entrée. Tu définis les critères — direction de tendance confirmée, stop loss à un niveau de structure, risque dans les limites, état émotionnel acceptable. Si une case n'est pas cochée, la checklist est incomplète. C'est un garde-fou mécanique contre les entrées impulsives.
      </P>

      <H3>Revue hebdomadaire</H3>
      <P>
        Chaque semaine, K.M.F. t'invite à examiner ta performance selon cinq indicateurs de discipline. Tu t'auto-évalues, tu écris des notes de réflexion, tu fixes des objectifs pour la semaine suivante. C'est la <Link to="/blog/weekly-trading-review-template" className="text-kmf-accent hover:underline">boucle de feedback</Link> qui fait réellement progresser — pas le trade isolé, mais le schéma à travers les trades.
      </P>

      <H3>Journal de trading</H3>
      <P>
        Un journal libre pour les pensées, leçons et observations qui ne rentrent pas dans une fiche de trade. Analyse pré-marché. Réflexions post-séance. Décompression émotionnelle après une journée difficile. Le journal est séparé des données de trades — c'est ton espace pour réfléchir sur papier.
      </P>

      <Divider />

      <H2>Le moteur psychologique</H2>
      <P>
        C'est la partie qui n'existe dans aucun autre journal de trading que nous avons testé. La plupart des journaux suivent des chiffres. K.M.F. suit l'humain derrière les chiffres.
      </P>

      <H3>Suivi des émotions</H3>
      <P>
        Avant chaque trade, tu enregistres ton état émotionnel : Calme, Confiant, Anxieux, Frustré, Craintif ou Excité. Une fois le trade clôturé, tu l'enregistres à nouveau. Au fil du temps, K.M.F. met en corrélation tes émotions et tes résultats. Tu pourrais découvrir que tu perds de l'argent 73 % du temps quand tu entres en étant anxieux — et cette seule prise de conscience peut changer ta façon de trader.
      </P>

      <H3>Détection de tilt</H3>
      <P>
        K.M.F. surveille quatre signaux en temps réel : pertes consécutives, augmentation des tailles de lot, émotions négatives et fréquence de trades qui s'emballe. Quand il détecte un schéma de tilt en formation, il affiche une bannière d'alerte — du léger rappel jaune à l'alerte rouge « ARRÊTE DE TRADER ». C'est le filet de sécurité qui te rattrape avant que tu ne ruines ta journée, pas après.
      </P>

      <H3>Miroir d'honnêteté (Premium)</H3>
      <P>
        Le Miroir d'honnêteté calcule la corrélation entre ta confiance auto-évaluée et ton P/L réel. Il te dit si tu es en surconfiance (tu te notes très haut sur des trades qui perdent) ou en sous-confiance (tu doutes de trades qui gagnent en réalité). La plupart des traders sont choqués par ce que ça révèle — <Link to="/blog/confidence-vs-overconfidence" className="text-kmf-accent hover:underline">confiance contre surconfiance</Link> est l'une des dynamiques les plus mal comprises du trading.
      </P>

      <H3>Profil de personnalité de trader (Premium)</H3>
      <P>
        À partir de tes données de trading réelles — pas d'un questionnaire — K.M.F. identifie ton type de personnalité de trader : Sniper (peu de trades, grande précision), Stoic (systématique, basé sur des règles), Gambler (impulsif, haute fréquence), Momentum Rider (agressif mais calculé) ou Revenge Trader (réactif, mené par les pertes). Chaque profil vient avec ses forces, ses faiblesses et des suggestions d'amélioration précises.
      </P>

      <H3>Carte de chaleur émotionnelle</H3>
      <P>
        Une vue calendrier qui montre ton état émotionnel au fil des jours de trading. Bascule entre la vue P/L et la vue émotions pour repérer les schémas : tes pires journées sont-elles pilotées par l'émotion ? Tes meilleures semaines coïncident-elles avec des états calmes et concentrés ? Le visuel rend l'invisible visible.
      </P>

      <Callout title="Pourquoi la psychologie compte autant" color="#CE93D8">
        Nous avons construit le moteur psychologique parce que nous avons appris — à la dure — que <Link to="/blog/strategy-is-not-enough" className="text-kmf-accent hover:underline">la stratégie ne représente qu'environ 20 % du jeu</Link>. Les 80 % restants, c'est l'exécution, la discipline et la gestion émotionnelle. Tu peux avoir le meilleur setup du monde, si tu le sautes parce que tu as peur, ou si tu doubles ta taille parce que tu es en colère, la stratégie n'a plus d'importance. K.M.F. rend ces 80 % visibles et mesurables.
      </Callout>

      <Divider />

      <H2>Gamification : XP, succès et paliers de trader</H2>
      <P>
        Tenir un journal, c'est ennuyeux. On le sait. C'est <Link to="/blog/why-traders-fail-at-journaling" className="text-kmf-accent hover:underline">pourquoi 90 % des traders abandonnent en quelques semaines</Link>. Alors nous avons ajouté une couche de gamification — pas pour rendre l'app « fun » de façon superficielle, mais pour créer une boucle de récompense qui renforce les bons comportements.
      </P>
      <Ul items={[
        'De l\'XP pour chaque trade enregistré, chaque checklist complétée, chaque revue hebdomadaire terminée',
        '23 succès répartis sur trois paliers (Bronze, Argent, Or) — de ton premier trade enregistré à une série de 30 jours',
        'Paliers de trader : Novice → Trader Discipliné → Gestionnaire de Risque → Maître Stratège',
        'Le système d\'XP récompense la régularité, pas la rentabilité — parce que c\'est l\'habitude de tenir un journal qui crée la rentabilité avec le temps',
      ]} />

      <Divider />

      <H2>Ce qui rend K.M.F. différent</H2>
      <P>
        Il existe d'autres journaux de trading. Voici ce qui rend K.M.F. différent — honnêtement, sans langage marketing.
      </P>

      <H3>Construit par des traders, pas par des développeurs</H3>
      <P>
        Chaque fonctionnalité a été conçue par des gens qui utilisent l'app quotidiennement sur leurs propres trades. Ça ressemble à une phrase marketing, mais la différence se voit dans les détails : le calculateur de lot utilise des valeurs de pip réalistes, la page de statistiques affiche des métriques que les traders consultent vraiment (pas des graphiques décoratifs), et la détection de tilt est calibrée par des gens qui ont vécu le tilt, pas par des gens qui l'ont lu quelque part.
      </P>

      <H3>Mobile d'abord et hors ligne</H3>
      <P>
        K.M.F. est une application Android native, pas un site web responsive coincé dans une coque mobile. Il fonctionne entièrement hors ligne — tu peux enregistrer des trades dans un avion, en voiture ou dans un bâtiment au Wi-Fi épouvantable. Les données se synchronisent automatiquement à la reconnexion. La plupart des concurrents sont web uniquement, ce qui signifie que loin de ton ordinateur, tu ne tiens plus de journal.
      </P>

      <H3>Aucune connexion au broker requise</H3>
      <P>
        Nous ne te demanderons jamais tes clés API de broker. Tes trades sont saisis manuellement — ce qui prend 30 secondes — et ton compte de broker reste totalement privé. Aucun accès tiers, aucun partage de données, aucun risque d'exposition de compte.
      </P>

      <H3>Approche psychologie d'abord</H3>
      <P>
        La plupart des journaux sont des tableurs avec une interface. K.M.F. est un outil de psychologie qui se trouve aussi enregistrer des trades. Suivi des émotions, détection de tilt, miroir d'honnêteté, profil de personnalité et alertes émotionnelles pré-trade — ces fonctions sont difficiles à trouver dans tout autre journal de trading du marché. Elles existent dans K.M.F. parce que nous croyons que se comprendre soi-même est plus important que comprendre le marché.
      </P>

      <H3>Une version gratuite honnête</H3>
      <P>
        La version gratuite n'est pas une démo. Elle inclut l'enregistrement complet des trades (15 trades), l'historique avec recherche, le P/L et le win rate de base, le calculateur de lot, les checklists pré-trade, le journal de trading, l'accès hors ligne et 7 langues. Après 15 trades, tu peux démarrer un essai gratuit ou passer à Premium.
      </P>

      <Divider />

      <H2>Gratuit contre Premium — le détail honnête</H2>
      <Table
        headers={['Fonctionnalité', 'Gratuit', 'Premium']}
        rows={[
          ['Enregistrement des trades', { value: '15 trades', color: 'gold' }, { value: 'Illimité', color: 'green' }],
          ['Historique et recherche', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['Win rate et P/L de base', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['Calculateur de lot', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['Checklist pré-trade', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['Journal de trading', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['Accès hors ligne', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['7 langues', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['Statistiques avancées', { value: 'Non', color: 'red' }, { value: 'Oui — profit factor, espérance, R-multiple, drawdown, courbe d\'équité', color: 'green' }],
          ['Sync et sauvegarde cloud', { value: 'Oui', color: 'green' }, { value: 'Oui', color: 'green' }],
          ['Suivi émotions et détection de tilt', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Profil de personnalité', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Miroir d\'honnêteté', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Revue hebdo et objectifs', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Succès et XP', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Analyse de sessions', { value: 'Non', color: 'red' }, { value: 'Oui — asiatique, Londres, NY', color: 'green' }],
          ['Ajout de captures d\'écran', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Export (CSV/JSON/PDF)', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Notifications intelligentes', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
          ['Support prioritaire', { value: 'Non', color: 'red' }, { value: 'Oui', color: 'green' }],
        ]}
      />
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Tarif Premium :</strong> 5,99 $/mois ou 49,99 $/an (30 % d'économie). Essai gratuit de 7 jours. Annulable à tout moment via Google Play.
      </P>
      <P>
        Premium vaut-il le coup ? Si tu veux des trades illimités, les fonctions psychologiques (suivi des émotions, détection de tilt, profil de personnalité) ou des statistiques avancées — oui. La version gratuite te donne 15 trades avec synchronisation cloud complète pour découvrir l'app avant de décider.
      </P>

      <Divider />

      <H2>Comment K.M.F. t'aide à grandir en tant que trader</H2>
      <P>
        L'app crée une boucle de feedback qui se renforce avec le temps :
      </P>
      <Ul items={[
        'Enregistre chaque trade avec son contexte — pas seulement des chiffres, mais aussi les émotions, le respect du plan et le type de setup',
        'Les statistiques révèlent des schémas invisibles dans les données brutes — quelle session est ta meilleure, quel jour est ton pire, quel setup a un vrai edge',
        'Le suivi des émotions montre la corrélation entre ton état mental et tes résultats — une donnée qu\'aucun tableur ne peut produire',
        'Les revues hebdomadaires te forcent à affronter ta performance honnêtement et à fixer des objectifs d\'amélioration précis',
        'La détection de tilt repère les schémas destructeurs avant qu\'ils ne te coûtent de l\'argent',
        'Le profil de personnalité te montre qui tu es vraiment en tant que trader — pas qui tu crois être',
      ]} />
      <P>
        Cette boucle — enregistrer, analyser, réfléchir, améliorer — est ce qui sépare les traders qui progressent de ceux qui répètent les mêmes erreurs pendant des années. K.M.F. ne te rend pas rentable. Aucune app ne le peut. Ce qu'il fait, c'est rendre ton trading visible d'une manière qui te permet de progresser plus vite que tu ne le ferais seul.
      </P>

      <Divider />

      <H2>À qui s'adresse K.M.F. (et à qui il ne s'adresse pas)</H2>
      <H3>K.M.F. est fait pour toi si :</H3>
      <Ul items={[
        'Tu trades le forex, les actions, la crypto ou les matières premières et veux progresser de façon systématique',
        'Tu en as marre des tableurs qui cassent, des carnets qui se perdent ou des captures éparpillées dans des dossiers',
        'Tu veux comprendre ta psychologie — pas seulement ton P/L',
        'Tu trades sur mobile et as besoin d\'un journal qui marche sur ton téléphone, hors ligne, en moins de 30 secondes',
        'Tu es un trader de prop firm qui a besoin d\'un suivi strict du risque et d\'outils de discipline',
        'Tu es un trader en développement qui veut un cadre d\'amélioration structuré, pas juste un dépotoir de données',
      ]} />

      <H3>K.M.F. n'est PAS fait pour toi si :</H3>
      <Ul items={[
        'Tu veux l\'import automatique des trades depuis ton broker — K.M.F. utilise uniquement la saisie manuelle',
        'Tu as besoin d\'une app iOS — nous sommes Android uniquement pour l\'instant',
        'Tu veux des fonctions sociales, des classements ou du copy-trading — nous n\'en construisons pas',
        'Tu cherches des signaux de trading ou des recommandations de stratégie — K.M.F. est un journal, pas un conseiller',
      ]} />

      <Callout title="La réponse honnête à « K.M.F. vaut-il le coup ? »" color="#FFB300">
        Si tu tiens ton journal régulièrement — même en version gratuite — tu progresseras plus vite que 90 % des traders qui ne tiennent aucun journal. L'app est l'outil. L'habitude est l'edge. K.M.F. rend l'habitude aussi facile que possible, mais le travail reste le tien.
      </Callout>

      <Divider />

      <H2>Pour commencer</H2>
      <P>
        K.M.F. Trading Journal est disponible dès maintenant sur Google Play. Télécharge-le gratuitement et commence à journaliser tes trades dès aujourd'hui — aucune carte bancaire requise. Les fonctions Premium incluent un essai gratuit de 7 jours.
      </P>
      <Ul items={[
        'Télécharge K.M.F. depuis Google Play',
        'Crée un compte — par e-mail ou via Google Sign-In',
        'Enregistre ton premier trade en moins de 30 secondes',
        'Parcours ta première checklist pré-trade',
        'Après 10 trades, regarde tes statistiques — tu verras déjà des schémas',
        'Après une semaine, fais ta première revue hebdomadaire',
        'Après un mois, les données parleront d\'elles-mêmes',
      ]} />
      <P>
        Des questions ? Écris-nous à <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>contact@kmfjournal.com</strong> — nous lisons et répondons personnellement à chaque e-mail.
      </P>

      <Takeaways items={[
        'K.M.F. (Keep Moving Forward) est une application de journal de trading pour Android, construite par des traders lassés des tableurs et des outils web hors de prix.',
        'Fonctions de base gratuites pour toujours : enregistrement des trades, historique, statistiques de base, calculateur de lot, checklist, journal, accès hors ligne, 7 langues.',
        'Premium (5,99 $/mois ou 49,99 $/an) ajoute les trades illimités, les statistiques avancées, le suivi psychologique, la détection de tilt, les succès et plus encore.',
        'Aucune connexion au broker requise — saisie manuelle uniquement, tes données restent privées.',
        'Le moteur psychologique (suivi des émotions, détection de tilt, miroir d\'honnêteté, profil de personnalité) est ce qui sépare K.M.F. de tous les autres journaux du marché.',
        'L\'app ne te rend pas rentable — elle rend ton trading visible pour que tu progresses plus vite.',
      ]} />
    </BlogArticleLayout>
  );
}
