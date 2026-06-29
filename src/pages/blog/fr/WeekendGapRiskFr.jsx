import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WeekendGapRiskFr() {
  return (
    <BlogArticleLayout
      slug="weekend-gap-risk"
      lang="fr"
      title="Risque de gap du week-end : comment protéger ton compte de la surprise du lundi"
      metaTitle="Risque de gap du week-end : le tueur de compte silencieux que tu ignores chaque vendredi | K.M.F."
      metaDescription="Les gaps du week-end peuvent traverser ton stop loss et détruire ton compte du jour au lendemain. Apprends pourquoi ils arrivent, quels instruments gappent le plus, et comment protéger tes positions avant le week-end."
      date="15 mars 2026"
      dateISO="2026-03-15"
      readTime="7 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce qu\'un gap de week-end en trading ?', answer: 'Un gap de week-end se produit quand un instrument ouvre le lundi à un prix nettement différent de sa clôture du vendredi. Ça arrive parce que les news et événements continuent pendant le week-end alors que la plupart des marchés sont fermés, créant une offre ou une demande accumulée qui se résout instantanément à l\'ouverture.' },
        { question: 'Un stop loss peut-il me protéger d\'un gap de week-end ?', answer: 'Non. Un stop loss ne s\'exécute que lorsque le marché est ouvert et trade à ton prix spécifié. Si le marché gappe au-delà de ton stop loss, ton ordre s\'exécute au premier prix disponible — qui pourrait être bien pire que ton niveau de stop prévu. C\'est ce qu\'on appelle le slippage.' },
        { question: 'Dois-je fermer toutes mes positions avant le week-end ?', answer: 'Ça dépend de ta stratégie et de ta tolérance au risque. Les swing traders qui gardent pendant des jours ou semaines acceptent le risque de gap comme partie de leur approche mais réduisent souvent la taille de position pour compenser. Les day traders et scalpeurs ferment typiquement toutes leurs positions avant la clôture du vendredi.' },
      ]}
    >
      <Intro>
        Tu places ton stop loss à −1 % le vendredi après-midi. Tu fermes ton ordinateur et profites du week-end. Le lundi matin, tu ouvres ta plateforme et découvres que ta position a ouvert à −3,5 %, traversant ton stop comme s'il n'existait pas. Ton ordre de stop loss était là — le marché a simplement sauté par-dessus. C'est le risque de gap du week-end, et c'est l'un des dangers les moins compris du trading retail.
      </Intro>

      <StatsStrip items={[
        { value: 48, decimals: 0, suffix: 'h', label: <>fenêtre du week-end où les news<br />bougent pendant que les marchés ferment</> },
        { value: 50, decimals: 0, suffix: '%', label: <>réduction de taille de position<br />recommandée pour les positions du week-end</> },
        { value: 52, decimals: 0, label: <>expositions au gap du week-end<br />accumulées par an</> },
      ]} />

      <H2>Qu'est-ce qui cause les gaps du week-end ?</H2>
      <P>
        La plupart des marchés financiers ferment environ 48 heures chaque week-end. Mais le monde ne s'arrête pas. Événements géopolitiques, annonces de banques centrales, catastrophes naturelles, surprises de résultats d'entreprises et élections politiques continuent tous pendant que les marchés forex, actions et matières premières restent inactifs. Quand ces marchés rouvrent le dimanche soir (forex) ou le lundi matin (actions), toute l'information accumulée se résout instantanément en un nouveau prix — souvent nettement différent de la clôture du vendredi.
      </P>
      <H3>La crypto : l'exception qui confirme la règle</H3>
      <P>
        Les marchés crypto tradent 24/7, ce qui signifie qu'ils ne connaissent pas de gaps de week-end au sens traditionnel. Cependant, le trading continu de la crypto crée une dynamique différente : pendant que les traders forex dorment le week-end, la crypto se reprice activement — et les mouvements crypto peuvent déborder sur les marchés forex et actions corrélés à l'ouverture du lundi. Un krach crypto majeur le samedi peut annoncer un sentiment de fuite du risque dans les actions le lundi.
      </P>

      <Divider />

      <H2>Pourquoi ton stop loss ne peut pas te sauver</H2>
      <P>
        Un stop loss est un ordre conditionnel : « vends quand le prix atteint X ». Mais il ne peut s'exécuter que lorsque le marché est ouvert et trade activement à ce niveau de prix. Si le marché ferme à 1,0800 le vendredi et ouvre à 1,0720 le lundi, ton stop loss à 1,0770 n'a jamais été déclenché — le prix a sauté par-dessus. Ton ordre s'exécute à 1,0720, te donnant 50 pips de slippage au-delà de ton stop prévu. Sur une position dimensionnée pour un stop de 30 pips, c'est presque trois fois ta perte prévue. Un bon <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">placement de stop loss</Link> doit tenir compte de cette réalité.
      </P>

      <Callout title="Le risque invisible" color="#00C853">
        Le risque de gap du week-end est invisible en backtest. La plupart des moteurs de backtest traitent les stops loss comme s'ils s'exécutaient au niveau de prix exact, ignorant entièrement le slippage de gap. Ça signifie que tes résultats de backtest sont systématiquement plus optimistes que la réalité si ta stratégie garde des positions pendant les week-ends.
      </Callout>

      <H2>Tailles moyennes de gap du week-end par instrument</H2>
      <P>
        Tous les instruments ne gappent pas de la même façon. Le tableau ci-dessous montre les tailles moyennes typiques de gap du week-end d'après des données historiques. Les gaps individuels peuvent être nettement plus grands lors d'événements de news à fort impact.
      </P>
      <Table
        headers={['Instrument', 'Taille moyenne du gap', 'Grand gap (top 5 %)', 'Fréquence des gaps']}
        rows={[
          ['EUR/USD', { value: '10-20 pips', color: 'cyan' }, { value: '50-100+ pips', color: 'gold' }, 'La plupart des week-ends'],
          ['GBP/JPY', { value: '25-50 pips', color: 'gold' }, { value: '100-200+ pips', color: 'red' }, 'La plupart des week-ends'],
          ['USD/JPY', { value: '15-30 pips', color: 'cyan' }, { value: '60-150+ pips', color: 'gold' }, 'La plupart des week-ends'],
          ['Or (XAU/USD)', { value: '3-8 $', color: 'gold' }, { value: '15-40+ $', color: 'red' }, 'La plupart des week-ends'],
          ['S&P 500 (ES)', { value: '0,3-0,8 %', color: 'cyan' }, { value: '1,5-3 %+', color: 'gold' }, 'La plupart des week-ends'],
          ['Bitcoin (BTC)', { value: 'Pas de gap (24/7)', color: 'green' }, { value: 'Pas de gap (24/7)', color: 'green' }, 'N/A — continu'],
          ['Actions individuelles', { value: '0,5-2 %', color: 'gold' }, { value: '5-15 %+ (résultats)', color: 'red' }, 'Varie selon le catalyseur'],
        ]}
      />

      <Divider />

      <H2>Règles de sortie du vendredi : un cadre</H2>
      <P>
        La façon dont tu gères le risque du week-end dépend de ton style de trading. Voici trois approches, du plus conservateur au plus agressif :
      </P>
      <H3>1. Fermer toutes les positions avant la clôture du vendredi</H3>
      <P>
        Ça élimine entièrement le risque de gap du week-end. C'est l'approche standard pour les day traders et scalpeurs. Le compromis est que tu rates occasionnellement une ouverture favorable du lundi — mais tu ne te réveilles jamais devant un désastre de gap. Si l'edge de ta stratégie vient des mouvements intraday, il n'y a aucune raison de garder pendant le week-end.
      </P>
      <H3>2. Réduire la taille de position pour les positions du week-end</H3>
      <P>
        Si ta stratégie exige de garder des positions pendant des jours ou semaines, tu peux réduire ta <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">taille de position</Link> le vendredi pour tenir compte du risque de gap. Une approche courante : si ton risque normal est de 1 % par trade, réduis à 0,5 % pour toute position gardée pendant le week-end. Ainsi, même un gap qui double la distance de ton stop loss ne résulte qu'en une perte de 1 % du compte — toujours dans les paramètres normaux.
      </P>
      <H3>3. Couvrir avec des instruments corrélés</H3>
      <P>
        Certains traders couvrent l'exposition du week-end en prenant une position compensatrice sur un instrument corrélé qui trade pendant le week-end (comme la crypto) ou en utilisant des options pour définir la perte maximale. C'est une technique avancée et elle introduit ses propres complexités, notamment la rupture de corrélation pendant les événements de stress — les moments exacts où les gaps sont les plus grands.
      </P>

      <H2>Ajustements de dimensionnement pour le risque du week-end</H2>
      <P>
        Les maths sont simples. Si ton stop loss normal est de 30 pips et que tu acceptes qu'un gap de week-end puisse ajouter 30 pips de slippage supplémentaires, ta distance de risque effective est de 60 pips. Dimensionne ta position pour le pire scénario, pas le meilleur. Ça signifie couper ta taille de position en deux pour les positions du week-end — ou accepter que ton risque réel soit le double de ce que suggère ton stop loss.
      </P>
      <P>
        Cet ajustement n'est pas optionnel. L'ignorer signifie que ta <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">règle des 1 %</Link> devient une règle de 2 % chaque week-end — et sur une année de 52 week-ends, ce risque non comptabilisé se compose dangereusement.
      </P>

      <H2>Quand les gaps sont les plus dangereux</H2>
      <Ul items={[
        'Élections et événements politiques — des résultats annoncés le week-end peuvent bouger les devises de 200+ pips.',
        'Réunions d\'urgence des banques centrales — rares mais dévastatrices quand elles arrivent.',
        'Conflits géopolitiques — actions militaires, sanctions, ou ruptures diplomatiques pendant le week-end.',
        'Saison des résultats (actions) — entreprises qui publient le vendredi après clôture ou le lundi avant ouverture.',
        'Réunions de l\'OPEP et annonces de politique énergétique — peuvent gapper le pétrole et les actions énergétiques significativement.',
        'Fin de mois/trimestre — le rééquilibrage institutionnel peut créer des mouvements démesurés le lundi.',
      ]} />

      <Takeaways items={[
        'Les gaps du week-end arrivent parce que les news et événements continuent pendant que la plupart des marchés sont fermés — créant des sauts de prix à l\'ouverture du lundi.',
        'Les ordres de stop loss ne peuvent pas te protéger des gaps. Le prix saute au-delà de ton stop, et tu t\'exécutes au premier prix disponible.',
        'Les instruments à volatilité croisée comme GBP/JPY gappent le plus ; la crypto ne gappe pas car elle trade 24/7.',
        'Approche conservatrice : fermer toutes les positions avant la clôture du vendredi. Approche modérée : réduire la taille de position de 50 % pour les positions du week-end.',
        'Le backtest ne capture pas le slippage de gap — tes résultats réels seront pires que ton backtest si tu gardes pendant les week-ends.',
        'Dimensionne tes positions pour le pire scénario de gap, pas pour ton seul niveau de stop loss.',
      ]} />
    </BlogArticleLayout>
  );
}
