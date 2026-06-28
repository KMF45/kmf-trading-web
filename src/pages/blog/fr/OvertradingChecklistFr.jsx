import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function OvertradingChecklistFr() {
  return (
    <BlogArticleLayout
      slug="overtrading-checklist"
      lang="fr"
      title="Checklist de l'overtrading : 8 signes que tu es en tilt sans t'en rendre compte"
      metaTitle="8 signes que tu fais de l'overtrading maintenant — arrête avant qu'il soit trop tard | K.M.F."
      metaDescription="L'overtrading est le tueur de compte silencieux. Apprends 8 signes d'alerte concrets que tu es en tilt, la psychologie derrière chacun, et comment te rattraper avant que le mal soit fait."
      date="15 mars 2026"
      dateISO="2026-03-15"
      readTime="7 min de lecture"
      category="Discipline"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce que l\'overtrading en forex et en actions ?', answer: 'L\'overtrading signifie prendre plus de trades que ce que ta stratégie demande, généralement mû par l\'émotion plutôt que par la qualité du setup. Ça inclut trader trop souvent, grossir impulsivement, ou entrer dans des setups non testés — tout ce qui érode ton edge et amplifie les pertes.' },
        { question: 'Comment savoir si je fais de l\'overtrading ?', answer: 'Les signes clés : trader plus souvent que ta moyenne historique, prendre des setups hors plan, augmenter la taille après des pertes, descendre sur des unités de temps plus basses pour « trouver » des entrées, et te sentir incapable d\'arrêter même quand tu sais que tu devrais.' },
        { question: 'Comment fonctionne la détection de tilt dans K.M.F. Trading Journal ?', answer: 'K.M.F. surveille quatre indicateurs de tilt en temps réel : pertes consécutives, augmentations de taille de lot par rapport à ta moyenne, états émotionnels négatifs notés avant les trades, et déviation de ta fréquence de trades normale. Il affiche une bannière d\'avertissement à 4 niveaux — d\'une légère prudence à une forte recommandation d\'arrêter — directement sur l\'écran de saisie du trade.' },
      ]}
    >
      <Intro>
        L'overtrading n'est pas une question de prendre beaucoup de trades. Certaines stratégies exigent une haute fréquence. L'overtrading, c'est prendre des trades que ta stratégie n'a pas générés — des trades mus par l'ennui, la frustration, la peur de rater, ou la compulsion de récupérer des pertes. Le dangereux, c'est que le tilt s'annonce rarement. Tu ne t'assieds pas pour décider de faire de l'overtrading. Il s'installe progressivement, et le temps que tu le remarques, le mal est déjà significatif.
      </Intro>

      <StatsStrip items={[
        { value: 8, decimals: 0, label: <>signes d'alerte de tilt<br />à surveiller chaque séance</> },
        { value: 4, decimals: 0, label: <>niveaux de détection de tilt<br />que K.M.F. suit automatiquement</> },
        { value: 30, decimals: 0, suffix: ' min', label: <>élimination du cortisol après<br />avoir fermé la plateforme</> },
      ]} />

      <H2>Les 8 signes d'alerte</H2>

      <H3>1. Ta fréquence de trades a explosé</H3>
      <P>
        Si tu prends normalement 3 à 5 trades par séance et qu'aujourd'hui tu en as pris 9, c'est un point de donnée qui mérite examen. Les pics de fréquence indiquent presque toujours du trading émotionnel — le marché n'a pas soudain produit trois fois plus de setups valides. Ton filtre s'est relâché parce que ton état émotionnel a changé. Suis ta moyenne de trades par séance dans le temps pour avoir une base de comparaison.
      </P>

      <H3>2. Tu sautes ta checklist</H3>
      <P>
        La <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">checklist pré-trade</Link> existe précisément pour des moments comme ceux-ci. Quand tu commences à te dire « je n'ai pas besoin de vérifier, celui-là est évident » ou « je le noterai après », tu es en territoire Système 1 — rapide, émotionnel et peu fiable. Au moment où ta checklist ressemble à un obstacle plutôt qu'à un outil, tu es en tilt. K.M.F. inclut une fonction checklist intégrée avec modèles par défaut et personnalisés qui apparaît avant chaque entrée, rendant structurellement difficile de la sauter.
      </P>

      <H3>3. Tu descends sur des unités de temps plus petites</H3>
      <P>
        Si tu trades normalement le graphique 4 heures et que tu te retrouves à faire défiler le 15 minutes ou même le 5 minutes en cherchant des entrées, quelque chose a changé. Les unités de temps plus basses produisent plus de signaux — dont la plupart sont du bruit, pas de l'edge. Le moteur psychologique est généralement l'impatience : ton unité de temps ne produit pas de setups assez vite, alors tu vas chercher où l'action est. Mais l'action sur les unités de temps plus basses n'est pas ta stratégie. C'est juste du mouvement.
      </P>

      <H3>4. Tu trades des news que tu évites normalement</H3>
      <P>
        La plupart des traders expérimentés savent quelles publications économiques créent une volatilité imprévisible et choisissent de les laisser passer. Quand tu te retrouves à entrer dans des trades pendant les NFP, les publications du CPI, ou les annonces de banque centrale que tu éviterais normalement, le motif est presque certainement émotionnel. La volatilité ressemble à une opportunité, mais c'est du risque non structuré — et ta stratégie n'a pas été bâtie pour ça.
      </P>

      <H3>5. Ta taille de position grimpe doucement</H3>
      <P>
        C'est l'un des signes les plus dangereux parce qu'il aggrave chaque autre erreur. Après une perte, l'instinct d'augmenter la taille pour récupérer plus vite est puissant et automatique. Ça ne ressemble pas à une décision consciente — ça ressemble à « ajuster ». Mais si tes trois derniers trades étaient à 0,5 lot et celui-ci à 1,2 lot, tu n'as pas ajusté. Tu as triplé ton risque pendant une période de mauvaise performance. C'est le mécanisme central derrière le <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">revenge trading</Link>.
      </P>

      <H3>6. Tu prends des setups que tu n'as jamais testés</H3>
      <P>
        Un trader en tilt commence à voir des schémas partout. « Ça ressemble à un double bottom. » « Ça pourrait être un breakout. » Les setups peuvent être réels en théorie, mais si tu ne les as jamais backtestés ou tradés dans ta stratégie, ils portent un edge démontré nul. Tu paries avec le vernis de l'analyse technique. Reste aux setups de ton playbook documenté.
      </P>

      <H3>7. Tu ne peux pas arrêter de regarder l'écran</H3>
      <P>
        Le trading sain inclut du temps loin des graphiques. Quand tu te retrouves incapable de fermer la plateforme — rafraîchir, faire défiler, regarder chaque tick — ton système nerveux est dans un état d'hyperéveil. Ce n'est pas de la concentration. C'est de la compulsion. Le cerveau s'est verrouillé sur le trading comme source de stimulation, et s'en éloigner semble insupportable. Cette sensation est elle-même le signal le plus fort pour s'éloigner.
      </P>

      <H3>8. Tu te dis « juste un trade de plus »</H3>
      <P>
        Cette phrase est la marque universelle du tilt. « Juste un de plus » signifie que tu as déjà reconnu, à un certain niveau, que tu devrais t'arrêter — mais l'attraction émotionnelle prend le dessus sur ton jugement. Un trade de plus en devient deux, puis quatre, puis une séance que tu regrettes. Si les mots « juste un de plus » se forment dans ton esprit, la séance est finie. Ferme la plateforme.
      </P>

      <Divider />

      <H2>Pourquoi le tilt est invisible de l'intérieur</H2>
      <P>
        Le défi fondamental de l'overtrading, c'est que les états émotionnels déforment la conscience de soi. Quand ton cortex préfrontal est altéré par la frustration ou l'excitation, la faculté même dont tu as besoin pour reconnaître le tilt est celle qui est hors ligne. C'est pourquoi les garde-fous externes comptent plus que la discipline interne. Une règle, une checklist, un outil qui signale le schéma — ça marche quand la volonté ne marche pas.
      </P>

      <Callout title="Détection de tilt K.M.F." color="#FFB300">
        K.M.F. Trading Journal surveille quatre indicateurs de tilt automatiquement : pertes consécutives, augmentations de taille de lot par rapport à ta moyenne, états émotionnels négatifs, et pics de fréquence de trades. Il affiche une bannière d'avertissement à 4 niveaux directement sur l'écran de saisie du trade — d'un léger rappel à une forte recommandation d'arrêter de trader pour la journée. Le système attrape ce que ton cerveau émotionnel rate.
      </Callout>

      <H2>Quoi faire quand tu te rattrapes</H2>
      <P>
        Si tu t'es reconnu dans deux signes ou plus ci-dessus, l'action est simple mais pas facile : arrête de trader pour le reste de la séance. Ferme la plateforme. Fais quelque chose de physique — marche, sport, cuisine. Le cortisol et l'adrénaline dans ton système ont besoin de 20 à 30 minutes pour se dissiper. Quand tu reviens demain, revois honnêtement les trades d'aujourd'hui. Identifie lesquels étaient basés sur le plan et lesquels étaient basés sur l'émotion. Cette revue vaut plus que n'importe quel trade que tu aurais pu prendre. Lis-en plus sur <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">pourquoi les traders enfreignent leurs règles</Link> et comment bâtir des systèmes qui l'empêchent.
      </P>

      <Takeaways items={[
        'L\'overtrading n\'est pas une question de volume — c\'est prendre des trades que ta stratégie n\'a pas générés.',
        'Les 8 signes d\'alerte : pic de fréquence, checklist sautée, unités de temps plus petites, trading des news, taille de position qui grimpe, setups non testés, addiction à l\'écran, et « juste un de plus ».',
        'Le tilt déforme la conscience de soi — tu ne peux pas le détecter de façon fiable de l\'intérieur, c\'est pourquoi les outils et règles externes comptent.',
        'Le système de détection de tilt de K.M.F. surveille les pertes consécutives, les changements de taille de lot et les états émotionnels pour attraper l\'overtrading avant qu\'il n\'escalade.',
        'La bonne réponse à la reconnaissance du tilt est toujours la même : arrête, ferme la plateforme, et revois demain.',
        'Une checklist pré-trade qui apparaît avant chaque entrée est une barrière structurelle contre les trades impulsifs.',
      ]} />
    </BlogArticleLayout>
  );
}
