import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function PropFirmDailyDrawdownFr() {
  return (
    <BlogArticleLayout
      slug="prop-firm-daily-drawdown-guide"
      lang="fr"
      title="Comment ne plus jamais dépasser le daily drawdown : un guide de survie prop firm"
      metaTitle="Daily drawdown prop firm : un système en 5 règles pour ne plus jamais le dépasser | K.M.F."
      metaDescription="La règle du daily drawdown tue plus de comptes prop firm que les mauvais trades. Apprends à utiliser un journal de trading avec checklists et gestion du risque pour protéger ton compte funded."
      date="14 mars 2026"
      dateISO="2026-03-14"
      readTime="9 min de lecture"
      category="Gestion du risque"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'Qu\'est-ce que la règle du daily drawdown en prop firm ?', answer: 'La règle du daily drawdown limite combien tu peux perdre en une seule journée, typiquement 4-5 % de ton solde journalier de départ. La dépasser entraîne la résiliation immédiate du compte.' },
        { question: 'Comment éviter de dépasser le daily drawdown ?', answer: 'Fixe une limite de perte journalière personnelle à 60-70 % de la limite de la firme, utilise un maximum de 2-3 trades par jour, réduis la taille après chaque perte, et arrête de trader immédiatement quand tu atteins ta limite personnelle.' },
        { question: 'Que se passe-t-il si je dépasse le daily drawdown ?', answer: 'La plupart des prop firms résilient ton compte instantanément sans seconde chance. Tu perds l\'accès au compte funded et dois payer une nouvelle évaluation.' },
      ]}
    >
      <Intro>
        Tu as étudié pendant des semaines. Tu t'es entraîné en démo. Tu as passé la Phase 1 avec une belle courbe d'équité. Phase 2 — passée aussi. L'e-mail arrive : « Félicitations, votre compte funded est prêt. » Tu as l'impression d'y être arrivé. Tu es un professionnel maintenant. Six jours de trading plus tard, tu reçois un autre e-mail : « Votre compte a été résilié pour violation du daily drawdown. » Tu fixes l'écran. Tu ne sais pas si tu veux pleurer, balancer le laptop, ou les deux. Le pire ? Ce n'est pas un mauvais trade qui t'a tué. C'étaient trois trades moyens, à la suite, un mardi après-midi où tu étais frustré par le premier. Bienvenue au club du daily drawdown. Presque tout le monde y adhère au moins une fois.
      </Intro>

      <StatsStrip items={[
        { value: 5, decimals: 0, suffix: '%', label: <>limite typique de daily drawdown<br />dans la plupart des prop firms</> },
        { value: 3, decimals: 0, suffix: '%', label: <>stop journalier personnel<br />(60 % de la limite de la firme)</> },
        { value: 3, decimals: 0, label: <>trades maximum par jour<br />pour la sécurité du compte funded</> },
      ]} />

      <H2>Qu'est-ce que la règle du daily drawdown (et pourquoi existe-t-elle) ?</H2>
      <P>
        Si tu débutes en prop firm — aussi appelées sociétés de trading propriétaire — voici la version courte : ces sociétés te donnent leur argent à trader. En retour, elles prennent un pourcentage de tes profits. Le hic ? Tu dois suivre leurs règles, ou elles reprennent le compte. Deal simple.
      </P>
      <P>
        La règle du daily drawdown est la plus importante. Elle dit : tu ne peux pas perdre plus d'un pourcentage fixe de ton compte (ou du solde de départ du jour) en une seule journée de trading. Limites courantes :
      </P>
      <Table
        headers={['Prop firm', 'Limite de daily drawdown', 'Méthode de calcul']}
        rows={[
          ['FTMO', { value: '5 %', color: 'gold' }, 'Sur le solde de début de journée (ou l\'équité, le plus haut des deux)'],
          ['MyFundedFX', { value: '5 %', color: 'gold' }, 'Sur le solde de début de journée'],
          ['The Funded Trader', { value: '5 %', color: 'gold' }, 'Sur le solde initial du compte'],
          ['True Forex Funds', { value: '5 %', color: 'gold' }, 'Sur l\'équité de début de journée'],
          ['E8 Funding', { value: '5 %', color: 'gold' }, 'Sur le solde de début de journée'],
        ]}
      />
      <P>
        Sur un compte funded de 100 000 $ avec une limite de daily drawdown de 5 %, tu ne peux pas perdre plus de 5 000 $ en une seule journée. Ça paraît beaucoup ? Non. Trois trades perdants à 1,5 % de risque chacun te mettent à −4,5 % — un trade de plus et c'est fini. Deux trades à 2 % de risque chacun plus un troisième qui gappe à travers ton stop ? Fini. Un trade surlevéragé sur les NFP ? Très fini.
      </P>
      <Callout title="Pourquoi les prop firms ont cette règle" color="#00C853">
        Ce n'est pas pour te punir. C'est de la gestion du risque — le même genre que tu devrais faire de toute façon. Un trader qui peut cramer 5 % en une journée peut cramer 20 % en une mauvaise semaine. Les prop firms l'ont appris à leurs dépens. La règle du daily drawdown existe parce que sans elle, une seule mauvaise journée d'un seul trader pourrait coûter à la firme plus que toute une carrière de profits de ce trader.
      </Callout>

      <Divider />

      <H2>Pourquoi les traders continuent de la dépasser (indice : ce ne sont pas les maths)</H2>
      <P>
        Si la règle est simple — « ne perds pas plus de 5 % aujourd'hui » — pourquoi tant de traders funded la dépassent-ils ? Les maths sont évidentes. Une calculatrice existe. Et pourtant, les données des prop firms suggèrent que les violations de daily drawdown sont la raison n°1 de résiliation des comptes, devant le drawdown global et l'expiration du délai.
      </P>
      <P>
        La raison est psychologique, pas mathématique. Voici la séquence typique :
      </P>
      <H3>Le schéma du mardi après-midi</H3>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>9h30 :</strong> Premier trade. Setup propre, bonne entrée. Touche le stop loss. −1,2 %. Pas grave. C'est le trading.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>10h15 :</strong> Deuxième trade. Setup valide aussi, mais peut-être que tu ne l'aurais pas pris si le premier n'avait pas perdu. C'est juste un peu plus agressif que tes entrées habituelles. Stop touché. −1,5 %. Bon, maintenant tu es à −2,7 % sur la journée.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>11h00 :</strong> Tu te dis que tu vas « juste regarder ». Tu regardes 20 minutes. Puis tu vois une figure de bougie qui ressemble à un setup si tu plisses les yeux. Tu entres. Pas de checklist, pas de calcul de taille de lot, pas de plan écrit. Tu trades sur la frustration déguisée en confiance. Stop touché. −1,8 %.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>11h30 :</strong> Tu es maintenant à −4,5 %. Ta limite journalière est 5 %. Un trade de plus — n'importe lequel — et tu risques la résiliation. Mais la partie rationnelle de ton cerveau est rentrée à 10h45. Le revenge trader est aux commandes maintenant. Tu entres encore une fois.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>11h47 :</strong> E-mail de la prop firm.
      </P>
      <P>
        Les maths étaient simples. La discipline ne l'était pas.
      </P>

      <Divider />

      <H2>Le système en cinq règles qui évite les violations de daily drawdown</H2>
      <P>
        Voici un système concret que tu peux mettre en place aujourd'hui. Il ne demande pas de volonté — il demande un pré-engagement. Tu fixes les règles quand tu es calme et rationnel, et tu les suis mécaniquement quand tu ne l'es pas.
      </P>

      <H3>Règle 1 : maximum 3 trades par jour</H3>
      <P>
        Si ton risque par trade est de 1 %, trois trades te mettent à −3 % maximum sur une journée de pertes complètes. C'est 2 % en dessous de ta limite de 5 % — un buffer de sécurité qui tient compte du slippage, des gaps, et du fait que ton troisième trade d'une journée perdante est statistiquement ton pire.
      </P>
      <P>
        « Mais si je vois un setup parfait après trois trades ? » Alors tu le prends demain. Le setup reviendra. Ton compte funded, non.
      </P>

      <H3>Règle 2 : limite de perte journalière à 60 % de la règle de drawdown</H3>
      <P>
        Si ta limite de daily drawdown est 5 %, fixe un hard stop personnel à 3 %. Quand tu atteins −3 % pour la journée, la journée de trading est finie. Pas « je vais juste regarder ». Pas « un trade de plus pour revenir à l'équilibre ». Finie. Ferme la plateforme. Va marcher. Appelle ta mère. Fais n'importe quoi qui n'est pas du trading.
      </P>
      <P>
        Le buffer de 40 % existe parce que les marchés peuvent gapper, les stops peuvent slipper, et ton état mental à −3 % est nettement pire qu'à 0 %. Le buffer te protège de toi-même.
      </P>

      <H3>Règle 3 : risque par trade ≤ 1 % du compte</H3>
      <P>
        Sur un compte de 100 000 $, c'est 1 000 $ par trade. Maximum. Ce n'est pas conservateur — c'est professionnel. Ça signifie que même trois pertes complètes consécutives (−3 %) te laissent avec un compte de 97 000 $ et un lendemain.
      </P>
      <P>
        Certains traders utilisent 0,5 % sur les comptes funded, surtout le premier mois. Oui, les profits sont plus petits. Le compte dure aussi beaucoup, beaucoup plus longtemps. Que veux-tu : un gain de 200 $ aujourd'hui ou un compte funded qui produit un revenu pendant des années ?
      </P>

      <H3>Règle 4 : checklist pré-trade (chaque trade)</H3>
      <P>
        Avant chaque trade sur un compte funded, passe une checklist en 5 questions :
      </P>
      <Ul items={[
        'Est-ce que ça correspond à mes critères de setup définis ? (Pas « à peu près » — exactement)',
        'Ai-je calculé ma taille de lot exacte avec un calculateur de risque ?',
        'Quelle est ma perte totale aujourd\'hui jusqu\'ici ? Ce trade dépassera-t-il ma limite journalière personnelle s\'il perd ?',
        'Est-ce que j\'entre parce que je vois un setup, ou parce que je veux récupérer des pertes ?',
        'Si ce trade perd, vais-je l\'accepter et m\'arrêter pour la journée — ou en voudrai-je un autre ?',
      ]} />
      <P>
        Si tu ne peux pas répondre « oui » honnêtement aux cinq questions, ne prends pas le trade. La checklist prend 30 secondes. Le compte funded a pris des semaines à gagner.
      </P>

      <H3>Règle 5 : journalise chaque trade en temps réel</H3>
      <P>
        Enregistre le trade au moment où tu entres. Pas plus tard. Pas « en fin de journée ». Maintenant. Pourquoi ? Parce que l'acte de journaliser te force à ralentir, documenter ton raisonnement et confronter ton état émotionnel. C'est très dur de faire du revenge trade quand tu dois écrire « État émotionnel : frustré, j'entre parce que je veux récupérer des pertes » puis cliquer sur enregistrer.
      </P>
      <P>
        Ton journal devient un partenaire de responsabilisation en temps réel. Quand tu vois trois trades enregistrés avec deux pertes, le registre visuel rend l'impulsion du « un trade de plus » bien plus difficile à justifier.
      </P>

      <Divider />

      <H2>La routine du matin qui protège ton compte</H2>
      <P>
        Avant d'ouvrir un seul graphique, passe 5 minutes là-dessus :
      </P>
      <Ul items={[
        'Vérifie le P/L d\'hier dans ton journal — où en es-tu pour la semaine ?',
        'Note le calendrier économique du jour — des événements à fort impact ? Ajuste le risque en conséquence',
        'Écris ta limite journalière : « Aujourd\'hui, ma perte maximale est de X $. Si j\'atteins Y $ (60 %), j\'arrête. »',
        'Fixe ton nombre maximum de trades : « Aujourd\'hui, je prendrai un maximum de 3 trades. »',
        'Note ton état émotionnel de 1 à 10. En dessous de 7 ? Réduis le risque à 0,5 % ou reste à l\'écart entièrement.',
      ]} />
      <P>
        Écris-le. Dans ton journal, sur un post-it, sur ton front — ce qui marche. Le but, c'est le pré-engagement. Tu prends les décisions difficiles maintenant, avant que le marché ouvre et que tes émotions aient voix au chapitre.
      </P>

      <Callout title="Les maths de la survie" color="#4FC3F7">
        Un trader funded qui risque 1 % par trade, prend maximum 3 trades par jour et s'arrête à −3 % de perte journalière survivra à environ 16 jours perdants consécutifs avant d'atteindre un drawdown global de 50 % (que la plupart des firmes n'autorisent même pas). L'idée : avec un risque par trade correct, la règle du daily drawdown est presque impossible à dépasser par accident. Tu dois activement choisir d'être imprudent. Le système empêche ce choix.
      </Callout>

      <Divider />

      <H2>Quoi faire après l'avoir dépassé (oui, ça peut quand même arriver)</H2>
      <P>
        Si tu dépasses le daily drawdown — et ça arrive aux meilleurs — ne gaspille pas la leçon chère payée :
      </P>
      <Ul items={[
        'Prends 24-48 heures de pause. N\'achète pas immédiatement un autre challenge. Tu y porterais les dégâts émotionnels.',
        'Revois la journée trade par trade dans ton journal. Identifie le moment exact où tu es passé du trading au pari. Il est toujours là.',
        'Calcule : si tu avais suivi la limite de 3 trades, aurais-tu quand même été résilié ? (Généralement la réponse est non.)',
        'Demande : avais-je une checklist ? L\'ai-je utilisée ? Si oui et que tu as quand même dépassé la règle, la checklist doit être plus stricte. Si non — voilà ta réponse.',
        'Ne prends un nouveau compte funded que quand tu peux décrire exactement ce que tu feras différemment. « Je serai plus discipliné » ne compte pas. Des règles précises comptent.',
      ]} />

      <H2>L'état d'esprit du trader funded</H2>
      <P>
        Voici le changement d'état d'esprit qui sépare les traders qui gardent leurs comptes funded de ceux qui les enchaînent : <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>un compte funded n'est pas une occasion de gagner de l'argent. C'est un permis de trader, et il peut être révoqué.</strong>
      </P>
      <P>
        Tu ne griller­ais pas tous les feux rouges juste parce que tu as un permis de conduire. Tu conduirais prudemment, parce que perdre le permis coûte plus que le temps gagné en grillant les feux. La même logique s'applique. Une semaine conservatrice qui produit 500 $ de profit et garde le compte en vie vaut infiniment mieux qu'une journée agressive qui produit 2 000 $ et déclenche la résiliation.
      </P>
      <P>
        La règle du daily drawdown n'est pas ton ennemie. C'est ton garde-fou. Construis ton trading autour d'elle au lieu de tester à quel point tu peux t'en approcher sans la toucher.
      </P>

      <Callout>
        Calcule ta taille de position exacte pour tout compte prop firm avec notre <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">calculateur de taille de lot gratuit</Link> — reste dans les limites de drawdown à chaque fois.
      </Callout>

      <Takeaways items={[
        'La règle du daily drawdown (typiquement 5 %) est la raison n°1 de résiliation des comptes prop firm — devant le drawdown global.',
        'La plupart des violations ne viennent pas d\'une grosse perte — elles viennent de 3-4 trades qui escaladent, mus par la frustration et le revenge trading.',
        'Fixe une limite de perte journalière personnelle à 60 % de la règle de la prop firm (ex. : 3 % si la limite est 5 %) comme buffer de sécurité.',
        'Limite-toi à 3 trades maximum par jour à 1 % de risque chacun — ça rend une violation de daily drawdown quasi impossible.',
        'Utilise une checklist pré-trade en 5 questions avant chaque trade sur un compte funded. Les 30 secondes valent des semaines de temps d\'évaluation.',
        'Journalise chaque trade en temps réel — le registre visuel des pertes rend le revenge trading psychologiquement plus dur.',
        'Un compte funded est un permis de trader, pas une invitation à devenir riche vite. La régularité conservatrice bat la volatilité agressive.',
      ]} />
    </BlogArticleLayout>
  );
}
