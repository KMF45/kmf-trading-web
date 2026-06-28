import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { DrawdownComparisonChart } from '../../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function StaticVsTrailingDrawdownFr() {
  return (
    <BlogArticleLayout
      slug="static-vs-trailing-drawdown"
      lang="fr"
      title="Static vs trailing drawdown : la règle prop firm qui tue silencieusement les comptes funded"
      metaTitle="Static vs trailing drawdown : pourquoi ton compte funded a vraiment été résilié | K.M.F."
      metaDescription="La plupart des échecs en prop firm arrivent parce que les traders ne comprennent pas la différence entre static et trailing drawdown. Apprends comment chacun se calcule, pourquoi le trailing est un piège, et comment survivre aux deux."
      date="22 mars 2026"
      dateISO="2026-03-22"
      readTime="9 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-daily-drawdown-guide', title: 'How to Never Break the Daily Drawdown Rule Again', category: 'Risk Management' },
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'Quelle est la différence entre static et trailing drawdown ?', answer: 'Le static drawdown est une limite fixe calculée à partir de ton solde initial — elle ne bouge jamais. Le trailing drawdown suit ton solde le plus haut (high-water mark) et monte à mesure que ton compte grandit, mais ne redescend jamais. Le trailing est plus dur à gérer parce que les trades gagnants rétrécissent ton buffer restant.' },
        { question: 'Pourquoi le trailing drawdown est-il plus dur que le static ?', answer: 'Parce qu\'à chaque profit, la limite trailing monte avec toi. Si ton compte de 100K $ atteint un pic à 106K $, ta limite trailing de 5 % est maintenant à 100 700 $ — tu ne peux donc perdre que 5 300 $ depuis ce pic avant la résiliation. Avec le static, ta limite reste à 95 000 $ quel que soit ton profit.' },
        { question: 'Quelles prop firms utilisent le trailing drawdown ?', answer: 'Beaucoup de prop firms récentes utilisent le trailing drawdown pendant la phase de challenge. FTMO utilise le static. E8 Funding, MyFundedFX et plusieurs autres utilisent le trailing dans au moins une de leurs phases. Lis toujours le document de règles attentivement avant de commencer.' },
        { question: 'Le trailing drawdown se calcule-t-il sur le solde ou l\'équité ?', answer: 'Ça dépend de la firme. Certaines calculent sur le solde (trades clôturés seulement), d\'autres sur l\'équité (incluant le P/L flottant non réalisé). Le trailing basé sur l\'équité est le plus dur — un profit flottant qui recule peut déclencher la résiliation même si tu clôtures le trade au breakeven.' },
        { question: 'Le trailing drawdown arrête-t-il un jour de suivre ?', answer: 'La plupart des prop firms verrouillent le trailing une fois que la limite atteint ton solde de départ initial. Par exemple, sur un compte de 100K $ avec 5 % de trailing, une fois que la limite atteint 100 000 $, elle arrête de bouger et devient effectivement static. On appelle parfois ça un watermark lock. Vérifie toujours avec ta firme spécifique.' },
      ]}
      howToSteps={[
        { name: 'Identifie ton type de drawdown', text: 'Lis le document de règles de ta prop firm. Détermine si ton drawdown est static ou trailing, et s\'il se calcule sur le solde ou l\'équité.' },
        { name: 'Calcule ton vrai buffer', text: 'Pour le trailing, soustrais ta limite trailing de ton solde actuel — pas de ton solde initial. C\'est ta vraie marge restante.' },
        { name: 'Fixe une marge de sécurité personnelle', text: 'N\'utilise que 60 % de ton buffer disponible. Si tu as 5 000 $ avant la résiliation, traite 3 000 $ comme ta limite stricte.' },
        { name: 'Suis ton high-water mark', text: 'Après chaque trade gagnant, recalcule ta limite trailing. Écris-la dans ton journal avant la prochaine séance.' },
        { name: 'Réduis la taille après les profits', text: 'Contre-intuitivement, réduis la taille de position après une série profitable sur les comptes à trailing drawdown. Ton buffer a rétréci par rapport à ton solde.' },
      ]}
    >
      <Intro>
        Laisse-moi te raconter l'histoire de deux traders. Tous deux ont passé leur challenge de prop firm. Tous deux ont été funded avec 100 000 $. Tous deux étaient disciplinés. Tous deux ont perdu leur compte en trois semaines. Le premier trader a eu de la malchance — une vraie série de pertes dans un marché haché. Soit. Le second trader était en fait profitable. Il a gagné 6 000 $ les deux premières semaines. Puis il a eu deux mauvaises journées, rendu 5 500 $, et reçu un e-mail qui commençait par « Nous avons le regret de vous informer ». Il a fixé son solde : 100 500 $. Encore en profit. Encore au-dessus de son capital de départ. Compte résilié. Que s'est-il passé ?
      </Intro>

      <P>
        Le trailing drawdown s'est passé. Et si tu ne comprends pas la différence entre trailing et static drawdown — vraiment comprendre, pas juste « j'ai lu les règles » comprendre — tu vas le rejoindre. C'est la règle la plus mal comprise du prop trading, et elle a tué plus de comptes funded que les mauvaises stratégies, la malchance et la mauvaise psychologie réunies.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, suffix: '%', label: <>drawdown max typique<br />sur les comptes prop firm</> },
        { value: 60, decimals: 0, suffix: '%', label: <>du buffer à utiliser comme<br />marge de sécurité personnelle</> },
        { value: 100, decimals: 0, suffix: 'K', prefix: '$', label: <>taille de compte funded<br />standard dans cette analyse</> },
      ]} />

      <Divider />

      <H2>Static drawdown : le simple</H2>
      <P>
        Le static drawdown est ce que la plupart des traders croient que toutes les règles de drawdown sont. Ça marche ainsi :
      </P>
      <Ul items={[
        'Tu commences avec 100 000 $.',
        'Le drawdown maximum est de 10 % (par exemple).',
        'Ton niveau de résiliation est 90 000 $.',
        'Peu importe si ton compte monte à 120 000 $. La limite reste à 90 000 $. Pour toujours.',
      ]} />
      <P>
        Le static drawdown est prévisible. Tu peux calculer ton pire scénario au jour un, et il ne change jamais. Si tu es à 112 000 $ après un excellent mois, tu sais que tu as 22 000 $ de marge. Si tu as une terrible semaine et tombes à 95 000 $, tu sais qu'il te reste 5 000 $. Les maths ne te surprennent jamais.
      </P>
      <Callout title="Static drawdown = ton ami" color="#00C853">
        Avec le static drawdown, chaque dollar gagné augmente ton buffer de sécurité. Mieux tu trades, plus il devient difficile de te faire résilier. C'est ainsi que le drawdown devrait fonctionner.
      </Callout>

      <Divider />

      <H2>Trailing drawdown : le piège</H2>
      <P>
        Le trailing drawdown suit ton solde de compte le plus haut — le <strong>« high-water mark »</strong>. Chaque fois que ton compte atteint un nouveau pic, la limite trailing monte avec lui. <strong>Elle ne monte que, jamais ne descend.</strong>
      </P>
      <P>
        Même exemple :
      </P>
      <Ul items={[
        'Tu commences avec 100 000 $. Limite de trailing drawdown 5 % = 95 000 $.',
        'Tu gagnes 3 000 $. Compte à 103 000 $. Nouvelle limite trailing : 97 850 $ (5 % sous 103K).',
        'Tu gagnes encore 3 000 $. Compte à 106 000 $. Nouvelle limite trailing : 100 700 $.',
        'Maintenant tu as une mauvaise semaine. Tu perds 5 500 $. Compte à 100 500 $.',
        'Tu es encore en profit. Tu es au-dessus de ton solde de départ. Mais 100 500 $ est en dessous de 100 700 $.',
        'Compte résilié.',
      ]} />
      <P>
        Relis ces chiffres. Le trader a gagné 6 000 $, rendu 5 500 $, et était encore net positif. Mais la limite trailing était montée à 100 700 $ pendant la série gagnante — et elle n'est jamais redescendue. Les propres profits du trader ont bâti le mur qui l'a tué.
      </P>

      <Callout title="Important : la plupart des firmes verrouillent le trail au solde de départ" color="#4FC3F7">
        Bonne nouvelle : la majorité des prop firms arrêtent le trailing drawdown une fois que la limite atteint ton solde initial. Dans notre exemple, dès que la limite trailing touche 100 000 $, elle se verrouille là définitivement — devenant effectivement un static drawdown à partir de ce point. Ça signifie que ton premier objectif sur un compte trailing est de générer assez de profit pour que le trail « rattrape » ton solde de départ. Après ça, chaque dollar de profit supplémentaire est un vrai buffer. Vérifie les règles de ta firme — certaines appellent ça un « watermark lock » ou indiquent simplement que le trailing se convertit en static après avoir atteint le solde initial.</Callout>

      <DrawdownComparisonChart />

      <H2>Les maths que personne ne fait</H2>
      <P>
        Voici la partie qui sauvera ton compte. Regardons ce qui arrive à ton vrai buffer — la distance entre ton solde et ton niveau de résiliation — à mesure que ton compte grandit.
      </P>
      <Table
        headers={['Solde', 'Limite static (10 %)', 'Buffer static', 'Limite trailing (5 %)', 'Buffer trailing']}
        rows={[
          ['100 000 $', '90 000 $', { value: '10 000 $', color: 'green' }, '95 000 $', { value: '5 000 $', color: 'gold' }],
          ['103 000 $', '90 000 $', { value: '13 000 $', color: 'green' }, '97 850 $', { value: '5 150 $', color: 'gold' }],
          ['106 000 $', '90 000 $', { value: '16 000 $', color: 'green' }, '100 700 $', { value: '5 300 $', color: 'gold' }],
          ['108 000 $', '90 000 $', { value: '18 000 $', color: 'green' }, '102 600 $', { value: '5 400 $', color: 'gold' }],
          ['104 000 $ (pullback)', '90 000 $', { value: '14 000 $', color: 'green' }, '102 600 $', { value: '1 400 $', color: 'red' }],
        ]}
      />
      <P>
        Regarde la dernière ligne. Après un pullback normal de 108K à 104K, le trader static a encore 14 000 $ de buffer. Le trader trailing a 1 400 $. Un mauvais trade de plus et c'est fini.
      </P>
      <Callout title="Le paradoxe cruel" color="#FF5252">
        Avec le trailing drawdown, mieux tu trades les premières semaines, plus le nœud coulant se resserre. Une grosse série gagnante fait du bien — mais elle relève le plancher sous toi. Puis un pullback normal et inévitable déclenche la résiliation. Ton propre succès a bâti le piège.
      </Callout>

      <Divider />

      <H2>Équité vs solde : le second piège dans le premier piège</H2>
      <P>
        Comme si le trailing drawdown n'était pas assez retors, certaines firmes le calculent sur l'équité, pas le solde. La différence :
      </P>
      <H3>Basé sur le solde</H3>
      <P>
        Seuls les trades clôturés comptent. Si tu as une position à +2 000 $ mais encore ouverte, la limite trailing ne bouge pas. Elle ne bouge que quand tu clôtures le trade et réalises le profit.
      </P>
      <H3>Basé sur l'équité</H3>
      <P>
        Les positions ouvertes comptent. Si ton compte est à 100 000 $ et que tu as un trade ouvert montrant +3 000 $ de profit non réalisé, la limite trailing monte à 5 % sous 103 000 $ = 97 850 $. Si ce trade recule ensuite et que tu clôtures au breakeven, ta limite est toujours à 97 850 $. Ton profit flottant a relevé le plancher, et clôturer au breakeven compte maintenant comme un drawdown de 2 850 $.
      </P>
      <P>
        Oui, c'est aussi brutal que ça en a l'air. Et oui, des traders perdent leurs comptes funded comme ça régulièrement.
      </P>

      <H3>Exemple pratique</H3>
      <Table
        headers={['Heure', 'Action', 'Solde', 'Équité', 'Limite trailing (équité)', 'Buffer']}
        rows={[
          ['9h30', 'Début de séance', '100 000 $', '100 000 $', '95 000 $', { value: '5 000 $', color: 'gold' }],
          ['10h15', 'Achat EUR/USD, flottant +2 800 $', '100 000 $', '102 800 $', '97 660 $', { value: '5 140 $', color: 'gold' }],
          ['11h00', 'Le trade recule, flottant +400 $', '100 000 $', '100 400 $', '97 660 $', { value: '2 740 $', color: 'red' }],
          ['11h30', 'Clôture au breakeven', '100 000 $', '100 000 $', '97 660 $', { value: '2 340 $', color: 'red' }],
          ['12h00', 'Trade suivant, perte −1 200 $', '98 800 $', '98 800 $', '97 660 $', { value: '1 140 $', color: 'red' }],
        ]}
      />
      <P>
        Le trader a commencé la journée avec un buffer de 5 000 $. Il n'a gagné aucun argent. Il a clôturé un trade au breakeven et pris une petite perte. Son buffer est maintenant de 1 140 $. Une perte normale de plus et le compte est mort — parce qu'un profit flottant qu'il n'a jamais réalisé a relevé le plancher définitivement.
      </P>

      <Divider />

      <H2>Comment survivre au trailing drawdown</H2>
      <P>
        Bon, assez d'histoires d'horreur. Voici quoi faire concrètement. Ce ne sont pas des suggestions théoriques — ce sont des règles qui gardent les comptes funded en vie.
      </P>

      <H3>1. Connais ton chiffre chaque matin</H3>
      <P>
        Avant d'ouvrir ta plateforme, écris trois chiffres dans ton journal :
      </P>
      <Ul items={[
        'Solde actuel',
        'Limite trailing actuelle (solde le plus haut × 0,95, ou ton pourcentage)',
        'Buffer restant (solde moins limite trailing)',
      ]} />
      <P>
        Si tu ne connais pas ces chiffres, tu voles à l'aveugle. Et voler à l'aveugle près d'un précipice est exactement la façon dont les comptes se font résilier les journées « normales ».
      </P>

      <H3>2. Réduis la taille après les séries gagnantes</H3>
      <P>
        Ça paraît contre-intuitif. Tu gagnes, donc tu devrais trader plus gros, non ? Faux — du moins avec le trailing drawdown. Chaque nouveau dollar de profit rétrécit ton buffer relatif. Après une série gagnante de 5 000 $ sur un compte de 100K $, ta limite trailing a monté de 4 750 $. Ton buffer n'a augmenté que de 250 $. Trade plus petit pour le protéger.
      </P>

      <H3>3. Sois prudent avec les take profits</H3>
      <P>
        Sur un trailing basé sur l'équité, un trade qui montre +3 000 $ de profit non réalisé puis clôture à +500 $ t'a effectivement coûté du buffer. La limite a monté de 2 850 $ (depuis le plus haut flottant), mais tu n'as réalisé que 500 $. Ton buffer net a diminué de 2 350 $ sur un trade gagnant.
      </P>
      <P>
        Solution : si tu es largement en profit sur un trade, soit prends le profit complet, soit place un <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">trailing stop serré</Link>. Ne laisse pas de gros profits flottants reculer vers le breakeven. Sur les comptes basés sur l'équité, c'est pire que de ne pas avoir pris le trade du tout.
      </P>

      <H3>4. Suis tout</H3>
      <P>
        Le dashboard de ta prop firm montre ton drawdown actuel. Il ne te montre pas les schémas. Il ne te montre pas que tes trois derniers mardis ont tous bien commencé et fini en overtrading agressif. Il ne te montre pas que tu rends régulièrement tes profits entre 11h et midi.
      </P>
      <P>
        C'est à ça que sert un <Link to="/blog/prop-firm-trading-journal" className="text-kmf-accent hover:underline">journal de trading</Link>. K.M.F. suit le max drawdown depuis le solde de pic et montre ta courbe d'évolution du solde — pour que tu voies exactement où les pullbacks arrivent et s'ils s'aggravent. Il suit aussi tes <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multiples</Link>, pour que tu saches si tes trades perdants sont dans le plan ou si tu les laisses courir trop loin. L'app ne peut pas calculer la limite trailing spécifique de ta firme (chaque firme a des règles différentes), mais elle te donne les données brutes pour la calculer toi-même chaque matin. Fais les maths. Écris-les dans ton entrée de journal pré-séance. Ça prend 60 secondes et ça peut sauver ton compte.
      </P>

      <H3>5. Envisage d'abord les firmes à static drawdown</H3>
      <P>
        Si tu obtiens ton premier compte funded, envisage sérieusement de commencer avec une firme qui utilise le static drawdown. Oui, les frais de challenge peuvent être plus élevés. Oui, le profit split peut être légèrement moins bon. Mais la probabilité de garder le compte assez longtemps pour réellement gagner de l'argent est nettement plus haute. Tu pourras passer aux firmes à trailing drawdown une fois que tu auras prouvé que tu peux gérer le risque de façon régulière.
      </P>

      <Divider />

      <H2>L'antisèche</H2>
      <Table
        headers={['', 'Static drawdown', 'Trailing drawdown']}
        rows={[
          ['Limite basée sur', { value: 'Le solde initial', color: 'green' }, { value: 'Le solde le plus haut atteint', color: 'gold' }],
          ['Monte quand tu profites ?', { value: 'Non — reste fixe', color: 'green' }, { value: 'Oui — monte définitivement', color: 'red' }],
          ['Buffer après une série gagnante', { value: 'Augmente', color: 'green' }, { value: 'Augmente à peine (ou diminue relativement)', color: 'red' }],
          ['Niveau de difficulté', { value: 'Prévisible', color: 'green' }, { value: 'Progressivement plus dur', color: 'red' }],
          ['Meilleure stratégie', { value: 'Trading normal, laisse composer', color: 'cyan' }, { value: 'Petits profits réguliers, sécurise les gains tôt', color: 'cyan' }],
          ['Plus grand tueur', { value: 'Revenge trading après les pertes', color: 'red' }, { value: 'Pullback normal après une série gagnante', color: 'red' }],
        ]}
      />

      <Takeaways items={[
        'Le static drawdown est une limite fixe depuis ton solde de départ — elle ne change jamais. Chaque dollar de profit augmente ton buffer de sécurité.',
        'Le trailing drawdown suit ton solde le plus haut et ne redescend jamais. Tes propres profits bâtissent le plancher qui peut te résilier.',
        'Le trailing basé sur l\'équité est le plus dur : même les profits flottants (non réalisés) relèvent la limite définitivement.',
        'Après les séries gagnantes sur les comptes trailing, réduis la taille de position. Ton buffer relatif a rétréci même si ton solde est plus haut.',
        'Connais tes trois chiffres chaque matin : solde actuel, limite trailing, buffer restant. Écris-les dans ton journal avant de trader.',
        'Si tu débutes en prop firm, commence avec une firme à static drawdown. Apprends le jeu avant de jouer en mode difficile.',
      ]} />
    </BlogArticleLayout>
  );
}
