import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PositionSizingGuideFr() {
  return (
    <BlogArticleLayout
      slug="position-sizing-guide"
      lang="fr"
      title="Guide du dimensionnement de position : combien dois-tu trader ?"
      metaTitle="Formule de dimensionnement : la compétence n°1 qui sépare les pros des comptes cramés | K.M.F."
      metaDescription="Le dimensionnement de position est la compétence la plus sous-estimée du trading. Apprends la formule exacte pour calculer combien trader selon la taille de ton compte, ta tolérance au risque et la distance de ton stop loss."
      date="10 février 2026"
      dateISO="2026-02-10"
      dateModified="2026-03-22"
      readTime="7 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'crypto-vs-forex-journaling', title: 'Crypto vs Forex: Why Your Trading Journal Needs Different Rules for Each Market', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce que le dimensionnement de position en trading ?', answer: 'Le dimensionnement de position détermine combien de capital allouer à un seul trade selon la taille de ton compte, ta tolérance au risque et la distance de ton stop loss. C\'est la compétence de gestion du risque la plus importante du trading.' },
        { question: 'Comment calculer la taille de position en forex ?', answer: 'Divise ton montant de risque (taille du compte × pourcentage de risque) par ton stop loss en pips × la valeur du pip. Par exemple, sur un compte de 10 000 $ risquant 1 % avec un stop de 50 pips, ta taille de position serait de 0,20 lot.' },
        { question: 'Quel pourcentage dois-je risquer par trade ?', answer: 'La plupart des traders professionnels risquent entre 0,5 % et 2 % de leur compte par trade. La règle des 1 % est le point de départ le plus courant pour une gestion du risque régulière.' },
      ]}
      howToSteps={[
        { name: 'Détermine ton pourcentage de risque', text: 'Choisis combien de ton compte tu es prêt à perdre sur ce trade. Commence à 1 % pour la plupart des setups.' },
        { name: 'Calcule ton montant de risque', text: 'Multiplie ton solde par ton pourcentage de risque. Sur un compte de 10 000 $ à 1 %, ton montant de risque est de 100 $.' },
        { name: 'Place ton stop loss', text: 'Place ton stop loss au point d\'invalidation technique. Mesure la distance en pips de ton entrée à ton stop.' },
        { name: 'Calcule la taille de position', text: 'Divise le montant de risque par (stop loss en pips × valeur du pip). Cela te donne la taille de lot exacte pour ce trade.' },
        { name: 'Vérifie et entre', text: 'Vérifie deux fois que la taille de position te semble correcte par rapport à ton compte. Si elle paraît trop grande, réduis le pourcentage de risque — n\'élargis jamais le stop.' },
      ]}
    >
      <Intro>
        Prends deux traders aux stratégies identiques, aux setups identiques, aux points d'entrée et de sortie identiques. L'un fait croître son compte régulièrement pendant des années. L'autre explose en quelques mois. La différence, c'est presque toujours le dimensionnement de position. Le dimensionnement est la variable la plus importante que tu contrôles directement en trading — et c'est celle que les débutants sous-estiment le plus systématiquement.
      </Intro>

      <StatsStrip items={[
        { value: 1, decimals: 0, suffix: '%', label: <>risque standard par trade<br />utilisé par les professionnels</> },
        { value: 0.5, decimals: 1, suffix: '%', label: <>recommandé pour les débutants<br />jusqu'à 50+ trades validés</> },
        { value: 10, decimals: 0, suffix: '$', label: <>par pip sur un lot standard<br />(forex, paires en USD)</> },
      ]} />

      <H2>La formule fondamentale</H2>
      <P>
        Le dimensionnement de position part d'un seul principe : décide combien de ton compte tu es prêt à perdre sur ce trade, et laisse ce nombre déterminer ta taille de position. Pas l'inverse.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Taille de position = Montant de risque ÷ Distance du stop loss (en termes de prix)</strong>
      </P>
      <P>
        Chaque version du calcul de dimensionnement — que ce soit pour des lots forex, des actions ou des unités de crypto — est une variation de cette formule de base. Les entrées changent selon le marché, mais la logique est identique. Note qu'il y a <Link to="/blog/crypto-vs-forex-journaling" className="text-kmf-accent hover:underline">des règles différentes pour la crypto et le forex</Link> en matière de journal et de risque.
      </P>

      <H2>Processus étape par étape</H2>
      <Ul items={[
        'Étape 1 : Décide ton pourcentage de risque (typiquement 1 % du compte pour les traders confirmés, 0,5 % pour les débutants)',
        'Étape 2 : Calcule ton montant de risque en dollars : Montant de risque = Solde du compte × % de risque',
        'Étape 3 : Identifie ton niveau de stop loss selon la structure du marché — place-le au point d\'invalidation technique, pas par commodité',
        'Étape 4 : Calcule la distance du stop loss en termes de prix (Prix d\'entrée − Prix du stop loss)',
        'Étape 5 : Calcule la taille de position : Taille de position = Montant de risque ÷ Distance du stop loss',
      ]} />
      <Callout title="La règle d'or" color="#00C853">
        Calcule toujours la taille de position à partir de ton stop loss, ne déplace jamais ton stop loss pour l'adapter à ta taille de position préférée. Inverser cette logique est l'une des erreurs les plus courantes — et les plus destructrices — du trading retail.
      </Callout>
      <Callout>
        Tu veux éviter le calcul ? Utilise notre <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">calculateur de taille de lot gratuit</Link> — 340+ instruments, taux de change en temps réel, résultats instantanés.
      </Callout>

      <Divider />

      <H2>Exemple forex</H2>
      <P>
        Compte : 10 000 $. Risque par trade : 1 % = 100 $.
        Trade : Long EUR/USD. Entrée : 1,1000. Stop loss : 1,0950 (50 pips sous l'entrée).
      </P>
      <P>
        Pour un lot forex standard (100 000 unités), chaque pip vaut 10 $. Donc un stop de 50 pips = 500 $ de risque par lot standard.
        Taille de position = 100 $ ÷ 500 $ par lot = 0,20 lot (ou 2 mini lots).
      </P>
      <P>
        Si le trade gagne sur une cible 2:1 (100 pips, cible à 1,1100) : profit = 100 pips × 10 $ × 0,2 lot = 200 $.
        S'il perd au stop : perte = 50 pips × 10 $ × 0,2 lot = 100 $. Exactement 1 % du compte.
      </P>

      <H2>Exemple actions</H2>
      <P>
        Compte : 10 000 $. Risque par trade : 1 % = 100 $.
        Trade : Long une action à 50 $ l'action. Stop loss : 48 $ (une distance de 2,00 $ par action).
      </P>
      <P>
        Taille de position = 100 $ ÷ 2,00 $ = 50 actions.
        Valeur totale de la position : 50 × 50 $ = 2 500 $ (25 % du compte dans cette position).
        Si le stop est touché : 50 actions × 2,00 $ de perte = 100 $. Exactement 1 %.
        Si la cible est à 54 $ (R:R 2:1) : 50 actions × 4,00 $ de gain = 200 $.
      </P>

      <H2>Exemple crypto</H2>
      <P>
        Compte : 10 000 $. Risque par trade : 1 % = 100 $.
        Trade : Long Bitcoin à 40 000 $. Stop loss : 39 000 $ (1 000 $ de distance par BTC).
      </P>
      <P>
        Taille de position = 100 $ ÷ 1 000 $ = 0,10 BTC.
        Valeur totale de la position : 0,10 × 40 000 $ = 4 000 $.
        Si le stop est touché : 0,10 BTC × 1 000 $ = 100 $. Exactement 1 %.
        Si la cible est à 42 000 $ (R:R 2:1) : 0,10 × 2 000 $ = 200 $.
      </P>

      <Divider />

      <H2>Tableau de référence des tailles de position</H2>
      <Table
        headers={['Taille du compte', 'Risque %', 'Montant de risque', 'Distance du stop', 'Taille de position (unités)']}
        rows={[
          ['5 000 $', { value: '1 %', color: 'green' }, '50 $', '2,00 $ (actions)', { value: '25 actions', color: 'cyan' }],
          ['10 000 $', { value: '1 %', color: 'green' }, '100 $', '2,00 $ (actions)', { value: '50 actions', color: 'cyan' }],
          ['25 000 $', { value: '1 %', color: 'green' }, '250 $', '2,00 $ (actions)', { value: '125 actions', color: 'cyan' }],
          ['10 000 $', { value: '1 %', color: 'green' }, '100 $', '50 pips (forex)', { value: '0,20 lot', color: 'cyan' }],
          ['10 000 $', { value: '0,5 %', color: 'green' }, '50 $', '50 pips (forex)', { value: '0,10 lot', color: 'cyan' }],
          ['10 000 $', { value: '2 %', color: 'gold' }, '200 $', '50 pips (forex)', { value: '0,40 lot', color: 'gold' }],
        ]}
      />

      <H2>Le dimensionnement dans les marchés volatils</H2>
      <P>
        Pendant les périodes de volatilité élevée — événements majeurs, saisons de résultats ou dislocations de marché — la distance de ton stop loss devrait s'élargir pour tenir compte de mouvements de prix plus grands que la normale. Un stop plus large signifie une position plus petite pour le même montant de risque. C'est exactement ce qui doit arriver.
      </P>
      <P>
        Beaucoup de traders font l'erreur de garder leur taille de position habituelle pendant les périodes volatiles, plaçant un stop trop serré pour les conditions, se faisant stopper à répétition, et concluant que leur stratégie a cessé de fonctionner. L'ajustement correct est automatique si tu suis la formule de dimensionnement : stop plus large → position plus petite → même risque en dollars.
      </P>
      <H3>Ajustement pratique pour les séances volatiles</H3>
      <Ul items={[
        'Vérifie l\'ATR avant l\'entrée : si l\'ATR sur 14 périodes est plus de 1,5× sa moyenne récente, envisage de réduire ta position de moitié par précaution.',
        'Évite de trader dans les 30 minutes avant et après les publications économiques majeures si ta stratégie n\'est pas conçue pour cette volatilité.',
        'Pendant les journées exceptionnellement volatiles (ex. : décisions surprises de banque centrale), envisage de rester à l\'écart entièrement ou d\'utiliser des tailles de position minimales.',
      ]} />

      <H2>L'anti-pattern : dimensionner au feeling</H2>
      <P>
        Beaucoup de traders — surtout ceux qui viennent d'un passé d'observation des marchés sans trader — prennent l'habitude de dimensionner leurs positions selon leur degré de confiance dans un setup. « Celui-là a l'air vraiment bon, je vais en mettre plus. » C'est l'anti-pattern.
      </P>
      <P>
        Aucun trade n'est assez bon pour justifier de violer tes règles de risque. <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">La règle des 1 %</Link> s'applique à chaque trade, y compris celui qui ressemble à une certitude. Les marchés sont incertains par définition, et dimensionner selon la certitude est un biais, pas un edge. Dimensionner par formule, de façon régulière, c'est ce qui transforme les traders irréguliers en traders réguliers.
      </P>

      <Takeaways items={[
        'Taille de position = Montant de risque ÷ Distance du stop loss. Cette formule s\'applique au forex, aux actions et à la crypto — seules les unités changent.',
        'Détermine toujours ton niveau de stop loss d\'abord, puis calcule la taille de position à partir de lui. Ne fais jamais l\'inverse.',
        'Dans les marchés volatils, des stops plus larges réduisent automatiquement la taille de position pour le même risque en dollars — c\'est le système qui fonctionne correctement.',
        'Un compte de 10 000 $ risquant 1 % ne peut perdre que 100 $ par trade. Sur 10 pertes consécutives, le compte garde environ 90,4 % de son capital (pas 90 % pile, grâce à la composition).',
        'Dimensionner au feeling ou selon le niveau de confiance introduit l\'un des biais les plus dangereux du trading. Utilise la formule à chaque fois.',
        'Les débutants devraient utiliser 0,5 % de risque jusqu\'à ce que leur stratégie ait été validée sur au moins 50 trades.',
      ]} />
    </BlogArticleLayout>
  );
}
