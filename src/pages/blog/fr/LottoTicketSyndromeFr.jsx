import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { LottoTicketChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function LottoTicketSyndromeFr() {
  return (
    <BlogArticleLayout
      slug="lotto-ticket-syndrome"
      lang="fr"
      title="Le syndrome du « ticket de loto » : pourquoi tu augmentes ton risque après un gros gain"
      metaTitle="Pourquoi tu doubles ton risque après un gros gain (et perds tout) | K.M.F."
      metaDescription="Après un gros gain, ton cerveau est inondé de dopamine et tu te sens invincible. Puis tu doubles ton risque et perds le profit d'une semaine en un trade. La neuroscience de l'euphorie post-gain."
      date="22 mars 2026"
      dateISO="2026-03-22"
      readTime="9 min de lecture"
      category="Psychologie"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'confidence-vs-overconfidence', title: 'Confidence vs Overconfidence: The Invisible Line That Separates Winners from Blowups', category: 'Psychology' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'overtrading-checklist', title: 'Overtrading Checklist: 8 Signs You Are Tilting Without Realizing It', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'Pourquoi les traders augmentent-ils leur risque après avoir gagné ?', answer: 'La dopamine libérée après un gain crée une sensation d\'invincibilité. Le cerveau interprète le gain comme une preuve de compétence (même si c\'était de la variance), menant à la surconfiance. Ça se manifeste par des tailles de position plus grandes, des règles de risque plus lâches, et des setups que tu sauterais normalement.' },
        { question: 'Qu\'est-ce que l\'effet d\'argent de la maison en trading ?', answer: 'L\'effet d\'argent de la maison est un biais cognitif où les gens prennent de plus gros risques avec de l\'argent perçu comme des « gains » plutôt que comme « le leur ». Après une semaine rentable, les traders séparent mentalement le profit de leur capital et le traitent comme jetable, menant à des trades surdimensionnés.' },
        { question: 'Comment arrêter de sur-risquer après une série gagnante ?', answer: 'Mets en place une règle de risque fixe qui ne change pas selon les résultats récents. Risque les mêmes 1 % par trade que tu sois sur une série de 5 gains ou de 5 pertes. Suis tes tailles de position dans ton journal et signale tout trade qui dépasse ton risque standard.' },
        { question: 'L\'euphorie est-elle dangereuse en trading ?', answer: 'Oui. L\'euphorie et le tilt sont aussi dangereux l\'un que l\'autre — les deux écrasent la prise de décision rationnelle. L\'euphorie mène à des positions surdimensionnées et des entrées bâclées. Le tilt mène à des revenge trades et des stops abandonnés. L\'état émotionnel idéal pour trader est la neutralité calme, pas l\'excitation.' },
      ]}
      howToSteps={[
        { name: 'Fixe un pourcentage de risque fixe qui ne change jamais', text: 'Définis ton risque standard (ex. : 1 % par trade) et écris-le comme une règle absolue. Ce nombre n\'augmente pas après les gains ni ne diminue après les pertes. Il est constant quelle que soit la performance récente.' },
        { name: 'Signale les « trades d\'euphorie » dans ton journal', text: 'Après chaque trade, note ton état émotionnel. Tout trade pris avec une auto-note « excité » ou « confiant au-delà du normal » est signalé pour revue ultérieure. K.M.F. enregistre l\'état émotionnel pré-trade exactement pour ça.' },
        { name: 'Applique la règle de refroidissement de 24 heures après les gros gains', text: 'Après tout trade qui rapporte plus de 2R, ou toute journée à plus de 3 % de croissance du compte, ne trade pas pour le reste de la séance. Reviens le lendemain avec des niveaux de cortisol et de dopamine frais.' },
        { name: 'Revois tes trades signalés chaque mois', text: 'Filtre ton journal pour les trades signalés « euphorie » et compare leurs R-multiples à ta base. Dans presque tous les cas, les trades d\'euphorie post-gain sous-performent les trades calmes. Laisse les données prouver le schéma.' },
        { name: 'Utilise un calculateur de taille à chaque trade', text: 'Ne calcule jamais la taille de position dans ta tête ou « au feeling ». Saisis ton solde, ton pourcentage de risque et la distance du stop dans un calculateur à chaque fois. K.M.F. a un calculateur de lot intégré qui retire la tentation d\'arrondir vers le haut.' },
      ]}
    >
      <Intro>
        Lundi matin. Deux trades propres, tous deux atteignent le take profit. +475 $. Tu te sens bien — pas imprudent, juste bien. Mardi, un autre gagnant. +410 $. Tu es en hausse de presque mille dollars et la semaine n'est qu'à moitié faite. Et c'est là que ça devient dangereux. Mercredi matin, tu vois un setup qui est... correct. Pas génial. Mais tu es sur une série. Tu sais ce que ton cerveau murmure ? « Tu joues avec l'argent de la maison maintenant. Tu peux te permettre de tenter un plus gros coup. » Alors au lieu de ton risque normal de 1 %, tu mets 2,5 %. Le trade part contre toi. −625 $ en une seule bougie. Jeudi tu essaies de te refaire — 3,5 % de risque cette fois. Encore une perte. −1 050 $. En 48 heures, tu es passé de « meilleure semaine de tous les temps » à « pire qu'au départ ». Bienvenue au syndrome du ticket de loto.
      </Intro>

      <StatsStrip items={[
        { value: 6.25, decimals: 2, suffix: '%', label: <>probabilité de 4 gains<br />d'affilée à 50 % de win rate</> },
        { value: 3, decimals: 0, suffix: '%', label: <>gain journalier qui devrait<br />déclencher un arrêt de séance</> },
        { value: 24, decimals: 0, suffix: 'h', label: <>normalisation de la dopamine<br />après un gros gain</> },
      ]} />

      <H2>Le piège de la dopamine</H2>
      <P>
        Quand tu gagnes un trade, ton cerveau libère de la dopamine — le même neurotransmetteur déclenché par les gains au jeu, les likes sur les réseaux sociaux, et oui, les tickets de loto gagnants. La dopamine ne te rend pas « heureux ». Elle te rend <strong>certain</strong>. Elle crée une expérience subjective de compétence et de contrôle qui n'a rien à voir avec ton vrai niveau de compétence.
      </P>
      <P>
        Après une série gagnante, les niveaux de dopamine sont élevés. Ton cerveau commence à reconnaître des schémas : « J'ai gagné trois fois d'affilée, donc j'ai un edge là maintenant. » Mais cet « edge » est une illusion — trois gains consécutifs à 40 % de win rate ont une probabilité de 6,4 %. C'est rare mais complètement aléatoire. La dopamine s'en moque. Elle te dit que c'est de la compétence.
      </P>

      <Callout title="L'effet d'argent de la maison" color="#CE93D8">
        Les économistes comportementaux l'appellent « l'effet d'argent de la maison » : les gens prennent de plus gros paris avec de l'argent perçu comme des gains plutôt que comme du capital gagné. En trading, ça signifie que les 900 $ gagnés cette semaine ressemblent à de « l'argent gratuit » — alors risquer 600 $ dessus sur un trade ne déclenche pas la même alarme que risquer 600 $ de ton capital de base. Mais ton compte ne connaît pas la différence. Un dollar perdu de gains détruit ton équité exactement autant qu'un dollar perdu de dépôts.
      </Callout>

      <LottoTicketChart />

      <P>
        Ce graphique est la biographie de chaque trader. Lundi est discipliné. Mardi est encore correct mais le risque grimpe. Le mercredi, le même trader qui ne risquerait jamais 2,5 % un jour normal le fait parce que « je suis en hausse, je peux me le permettre ». Le cerveau fait paraître l'escalade logique sur le moment. Elle ne l'est pas.
      </P>

      <Divider />

      <H2>Les 4 étapes de l'autodestruction post-gain</H2>
      <Table
        headers={['Étape', 'Ce qui se passe', 'Ce que tu te dis']}
        rows={[
          ['1. Validation', { value: 'Les 2-3 premiers gains confirment ton analyse', color: 'green' }, '« Ma stratégie marche parfaitement là maintenant »'],
          ['2. Élévation', { value: 'Le risque augmente « juste un peu »', color: 'gold' }, '« Je vais mettre 1,5 % au lieu de 1 % — j\'ai un buffer »'],
          ['3. Invincibilité', { value: 'Les règles se relâchent, les setups s\'affaiblissent', color: 'red' }, '« Je sens le marché aujourd\'hui. Je suis dans la zone. »'],
          ['4. Cratère', { value: 'Une perte surdimensionnée, puis des trades de panique', color: 'red' }, '« J\'ai juste besoin d\'un trade pour revenir où j\'étais »'],
        ]}
      />
      <P>
        L'étape 4 est où les vrais dégâts arrivent — et ce n'est pas la première perte qui te tue. C'est la tentative de récupérer de cette perte en utilisant le même risque gonflé qui l'a causée. Tu as pris un coup de 2,5 %, alors tu essaies de te refaire avec un trade de 3,5 %, puis de 4 %. Ce n'est plus du trading. C'est du <Link to="/blog/revenge-trading-kill-switch" className="text-kmf-accent hover:underline">revenge trading</Link> avec un graphique ouvert.
      </P>

      <H2>Pourquoi les séries gagnantes sont statistiquement insignifiantes</H2>
      <P>
        Voici les maths que ton cerveau gorgé de dopamine refuse de traiter : dans une stratégie à 50 % de win rate, la probabilité d'atteindre 4 gagnants consécutifs est de 6,25 %. Ça signifie que sur chaque 100 trades, tu vivras environ 6 séries de 4+ gains. Chacune ressemblera à « être dans la zone ». Chacune est de la pure variance.
      </P>
      <P>
        Une <Link to="/blog/confidence-vs-overconfidence" className="text-kmf-accent hover:underline">série gagnante</Link> ne te dit rien sur le prochain trade. Le marché n'a pas de mémoire. Tes trois derniers trades rentables ne changent pas la probabilité du quatrième d'un seul point de pourcentage. Mais ton cerveau — câblé pour la reconnaissance de schémas dans un monde de tigres à dents de sabre — ne peut pas l'accepter. Il insiste qu'il y a un schéma. Il n'y en a pas.
      </P>

      <Callout title="La confiance du parieur" color="#FFB300">
        Les casinos le savent mieux que quiconque. Après une série de gains à la table de blackjack, les joueurs misent plus gros — le casino les dit « chauds ». L'avantage de la maison ne change pas. Les cartes ne savent pas ce qui s'est passé avant. Mais le joueur se sent différent. Les bureaux de trading fonctionnent pareil, sauf que les enjeux sont ton argent de loyer.
      </Callout>

      <Divider />

      <H2>La solution : comment rester ennuyeux tout en gagnant de l'argent</H2>
      <H3>1. La règle de risque de fer</H3>
      <P>
        Ton risque par trade est une constante. Pas une recommandation. Pas un « d'habitude ». Une loi physique de ton trading. <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">Un pour cent signifie un pour cent</Link> — que tu sois en hausse de 2 000 $ pour la semaine ou en baisse de 500 $. Au moment où ton pourcentage de risque devient une variable qui s'ajuste selon « comment tu te sens », tu as remis ton compte à ton système limbique. Il ne te le rendra pas.
      </P>
      <H3>2. La règle de refroidissement de 24 heures</H3>
      <P>
        Après tout trade qui rapporte plus de 2R, ou toute journée où ton compte croît de plus de 3 %, arrête de trader pour le reste de la séance. Non parce que tu fais quelque chose de mal — mais parce que tes niveaux de dopamine ont besoin de 12 à 24 heures pour se normaliser. Le meilleur trade de la semaine est souvent celui que tu ne prends pas un mercredi après-midi euphorique.
      </P>
      <H3>3. Le calculateur à chaque fois</H3>
      <P>
        Ne calcule jamais, au grand jamais, la taille de position dans ta tête après une série gagnante. Ton « calcul de tête » arrondira commodément vers le haut. Utilise un calculateur — saisis le solde, le risque %, et la distance du stop mécaniquement. K.M.F. a un calculateur de taille de lot intégré : tu mets ta taille de compte, ton pourcentage de risque et la distance du stop, et il te dit la taille de lot exacte. Aucune marge pour que ta dopamine négocie.
      </P>
      <H3>4. Signale et revois</H3>
      <P>
        Dans ton journal, note ton état émotionnel avant chaque trade. Tout trade où tu te sens « excité », « confiant » ou « dans la zone » reçoit un signalement. À la fin du mois, filtre les trades signalés et compare leur R-multiple moyen à tes trades non signalés. Dans presque tous les cas, les trades d'euphorie sous-performent. K.M.F. enregistre ton état émotionnel pré-trade automatiquement — tu peux filtrer et comparer dans la vue statistiques.
      </P>

      <H2>La réalisation inconfortable</H2>
      <P>
        Le meilleur trading est ennuyeux. Pas excitant. Pas palpitant. Ennuyeux. Tu entres. Tu attends. Tu sors à ton niveau. Tu ne ressens rien — et ce rien est l'état émotionnel le plus performant que tu puisses atteindre. Au moment où le trading devient excitant, tu n'opères plus depuis ton cerveau analytique. Tu opères depuis le même circuit neuronal qui pousse les gens à acheter des tickets à gratter dans les stations-service. L'euphorie, c'est le tilt de bonne humeur. Les dégâts sont identiques.
      </P>

      <Takeaways items={[
        'La dopamine des trades gagnants crée un faux sentiment de certitude et de contrôle. Trois gains consécutifs à 40 % de win rate ont une probabilité de 6,4 % — c\'est de la variance, pas de la compétence.',
        'L\'« effet d\'argent de la maison » te pousse à traiter les gains comme jetables, menant à des trades surdimensionnés. Ton compte ne connaît pas la différence entre dollars déposés et gagnés.',
        'L\'autodestruction post-gain suit un schéma prévisible en 4 étapes : validation, élévation, invincibilité, cratère. L\'étape 4 est où les comptes meurent.',
        'Le pourcentage de risque doit être une constante, pas une variable. 1 % signifie 1 % que tu sois en hausse de 2 000 $ ou en baisse de 500 $.',
        'Après tout trade à 2R+ ou tout rendement journalier de 3 %+, arrête de trader pour le reste de la séance. Ta dopamine a besoin de 12 à 24 heures pour se normaliser.',
        'Le meilleur trading est ennuyeux. L\'excitation est un signal d\'alerte, pas un indicateur de performance. L\'euphorie, c\'est le tilt qui sourit.',
      ]} />
    </BlogArticleLayout>
  );
}
