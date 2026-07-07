import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/landing/Navbar';
import Footer from '../../../components/Footer';
import { FaCheck, FaTimes, FaGooglePlay } from 'react-icons/fa';
import blogTranslations from '../../../i18n/blogTranslations';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kmf.tradingjournal';

const SITE = 'https://kmfjournal.com';
const SLUG = 'best-free-trading-journal-app-android-2026';
const PAGE_TITLE = 'La meilleure application de journal de trading gratuite pour Android 2026 | K.M.F.';
const PAGE_DESC = 'Tu cherches la meilleure application de journal de trading gratuite pour Android 2026 ? Compare K.M.F., TraderSync, Tradervue et Edgewonk — fonctionnalités, prix et laquelle est la meilleure pour les traders forex, actions et crypto.';
const PAGE_URL = `${SITE}/blog/fr/${SLUG}`;
const OG_IMAGE = `${SITE}/blog/og/fr-${SLUG}.png`;

function setMeta(name, content, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

export default function BestTradingJournalAndroid2026Fr() {
  // NOTE: No automatic browser-language redirect — it caused Googlebot to flag
  // canonical URLs as "Page with redirect" and blocked indexing. hreflang tags
  // (injected below) handle language alternates; switching is manual.

  useEffect(() => {
    document.title = PAGE_TITLE;
    setMeta('description', PAGE_DESC);

    // html lang
    document.documentElement.lang = 'fr';

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', PAGE_URL);

    // hreflang tags
    const articleTranslations = blogTranslations[SLUG];
    if (articleTranslations && Object.keys(articleTranslations).length > 1) {
      Object.entries(articleTranslations).forEach(([langCode, path]) => {
        const id = `hreflang-${langCode}`;
        if (!document.getElementById(id)) {
          const link = document.createElement('link');
          link.rel = 'alternate';
          link.hreflang = langCode;
          link.href = `${SITE}${path}`;
          link.id = id;
          document.head.appendChild(link);
        }
      });
      if (!document.getElementById('hreflang-x-default')) {
        const xdef = document.createElement('link');
        xdef.rel = 'alternate';
        xdef.hreflang = 'x-default';
        xdef.href = `${SITE}${articleTranslations.en}`;
        xdef.id = 'hreflang-x-default';
        document.head.appendChild(xdef);
      }
    }

    // OG
    setMeta('og:type', 'article', 'property');
    setMeta('og:url', PAGE_URL, 'property');
    setMeta('og:title', PAGE_TITLE, 'property');
    setMeta('og:description', PAGE_DESC, 'property');
    setMeta('og:image', OG_IMAGE, 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:image:alt', PAGE_TITLE, 'property');

    // Twitter
    setMeta('twitter:url', PAGE_URL, 'name');
    setMeta('twitter:title', PAGE_TITLE, 'name');
    setMeta('twitter:description', PAGE_DESC, 'name');
    setMeta('twitter:image', OG_IMAGE, 'name');
    setMeta('twitter:image:alt', PAGE_TITLE, 'name');

    // JSON-LD helper: skip if already exists (from prerender)
    const injectLd = (id, data) => {
      if (document.getElementById(id)) return;
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
    };

    injectLd('ld-article', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'La meilleure application de journal de trading gratuite pour Android 2026',
      description: PAGE_DESC,
      datePublished: '2026-02-20',
      dateModified: '2026-02-27',
      inLanguage: 'fr',
      author: { '@type': 'Organization', name: 'K.M.F. Trading Research', url: SITE },
      publisher: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
      image: OG_IMAGE,
      url: PAGE_URL,
    });

    injectLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: 'La meilleure application de journal de trading gratuite pour Android 2026', item: PAGE_URL },
      ],
    });

    injectLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Quelle est la meilleure application de journal de trading gratuite pour Android ?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal est le meilleur journal de trading gratuit pour Android 2026 : il offre le suivi des émotions, un calculateur de risque, des succès et un support hors ligne — le tout gratuit, avec un plan Premium optionnel.' } },
        { '@type': 'Question', name: 'K.M.F. Trading Journal est-il vraiment gratuit ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. K.M.F. offre un plan gratuit avec 15 trades, des statistiques de base, des calculateurs de risque et la synchronisation cloud. Premium ajoute les trades illimités, l\'analytique avancée et des outils de psychologie comportementale.' } },
        { '@type': 'Question', name: 'Quelle application de journal de trading est la meilleure pour les traders forex ?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal est conçu pour les traders forex, actions et crypto. Il inclut un calculateur de taille de lot, le suivi du stop loss en pips et une analytique adaptée aux sessions du marché forex.' } },
      ],
    });

    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      setMeta('description', 'K.M.F. Trading Journal is a professional trading journal app for forex, stocks & crypto traders.');
      if (canonical) canonical.setAttribute('href', `${SITE}/`);
      setMeta('og:type', 'website', 'property');
      setMeta('og:url', `${SITE}/`, 'property');
      setMeta('og:title', 'K.M.F. Trading Journal – Professional Trade Tracking & Analysis', 'property');
      setMeta('og:description', 'Track your trades, analyze performance with advanced statistics, manage risk with a lot calculator, and improve your trading discipline. Free for Android.', 'property');
      setMeta('og:image', `${SITE}/logo.png`, 'property');
      setMeta('og:image:width', '512', 'property');
      setMeta('og:image:height', '512', 'property');
      setMeta('og:image:alt', 'K.M.F. Trading Journal logo', 'property');
      setMeta('twitter:url', `${SITE}/`, 'name');
      setMeta('twitter:title', 'K.M.F. Trading Journal – Keep Moving Forward', 'name');
      setMeta('twitter:description', 'Professional trading journal for forex, stocks & crypto. Track, analyze and improve your trading performance.', 'name');
      setMeta('twitter:image', `${SITE}/logo.png`, 'name');
      setMeta('twitter:image:alt', 'K.M.F. Trading Journal logo', 'name');
      document.getElementById('ld-article')?.remove();
      document.getElementById('ld-faq')?.remove();
      document.getElementById('ld-breadcrumb')?.remove();
      document.querySelectorAll('[id^="hreflang-"]').forEach(el => el.remove());
      document.documentElement.lang = 'en';
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">

        {/* Article container */}
        <article className="max-w-2xl mx-auto" itemScope itemType="https://schema.org/Article">

          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">La meilleure application de journal de trading gratuite pour Android 2026</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(79,195,247,0.12)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.22)' }}>
              Avis Applications
            </span>
            <time className="text-xs text-kmf-text-tertiary" dateTime="2026-02-20">20 février 2026</time>
            <span className="text-xs text-kmf-text-tertiary">· 6 min de lecture</span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-bold text-kmf-text-primary mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
            itemProp="headline">
            La meilleure application de journal de trading gratuite pour Android 2026
          </h1>

          {/* Intro */}
          <p className="text-lg text-kmf-text-secondary leading-relaxed mb-10"
            style={{ borderLeft: '3px solid rgba(79,195,247,0.40)', paddingLeft: '1.25rem' }}>
            La plupart des traders savent qu'ils devraient tenir un journal. Peu le font vraiment — parce que la plupart des applis de journal sont soit chères, soit uniquement sur le web, soit exigent la connexion de ton compte broker. Voici une comparaison honnête des meilleures options gratuites disponibles sur Android en 2026.
          </p>

          <Divider />

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Pourquoi un journal de trading change tes résultats
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Les études sur la performance de trading montrent constamment une chose : les traders qui journalisent progressent plus vite que ceux qui ne le font pas. Non parce qu'écrire serait magique — mais parce que ça te force à revoir tes décisions, trouver des schémas dans tes pertes et vérifier si tu respectes vraiment tes propres règles.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Le problème, c'est la régularité. Si ton journal est un tableur sur ton ordinateur, tu ne le rempliras pas juste après le trade. Si c'est une appli payante à 30 $/mois, tu l'abandonneras après la première série de pertes. Un bon journal doit être assez rapide, mobile et gratuit pour qu'il n'y ait aucune excuse de ne pas l'utiliser.
          </p>

          <Divider />

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Ce à quoi faire attention dans une appli de journal de trading
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              ['Mobile-first et hors ligne', 'Fonctionne sans internet. Tu peux enregistrer un trade juste après l\'avoir exécuté, pas plus tard au bureau.'],
              ['Analyse au-delà du P/L', 'Le win rate seul ne suffit pas. Cherche le profit factor, le R-multiple, l\'espérance et le drawdown.'],
              ['Outils de discipline', 'Checklists pré-trade, revues hebdomadaires et scores t\'aident à trader ton système, pas tes émotions.'],
              ['Confidentialité des données', 'Les applis qui exigent un accès API au broker exposent ton compte. La saisie manuelle garde tes données chez toi.'],
              ['Un plan gratuit honnête', 'Beaucoup d\'applis « gratuites » verrouillent tout derrière un paywall. Le journal de base devrait être gratuit.'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3">
                <FaCheck style={{ color: '#00C853', fontSize: 13, flexShrink: 0, marginTop: 4 }} />
                <span className="text-kmf-text-secondary"><strong className="text-kmf-text-primary">{title}</strong> — {desc}</span>
              </li>
            ))}
          </ul>

          <Divider />

          {/* Section 3 — The apps */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-8" style={{ letterSpacing: '-0.01em' }}>
            Les meilleures applis de journal de trading pour Android 2026
          </h2>

          {/* App 1 — KMF */}
          <AppCard
            rank="1"
            name="K.M.F. Trading Journal"
            tag="Meilleure option gratuite pour Android"
            tagColor="#4FC3F7"
            url="https://kmfjournal.com"
            description="K.M.F. (Keep Moving Forward) est une application Android native, conçue spécialement pour les traders sérieux qui veulent plus qu'un simple log de P/L. Elle fonctionne entièrement hors ligne, n'exige aucune connexion au broker et met un fort accent sur la discipline — pas seulement sur les chiffres."
            pros={[
              'Application Android native — rapide, hors ligne, sans navigateur',
              'Checklist pré-trade pour vérifier ton setup avant chaque entrée',
              'Suivi du score de discipline sur les trades et les semaines',
              'Revue hebdomadaire avec 5 critères d\'auto-évaluation',
              'Statistiques avancées : profit factor, R-multiple, espérance, drawdown',
              'Calculateur de taille de lot intégré avec prix en direct et R:R',
              'Synchronisation et sauvegarde cloud (tous les plans)',
              '7 langues, dont anglais, français, allemand, roumain, japonais',
              'Fonctions de base gratuites — sans carte bancaire',
            ]}
            cons={[
              'Android uniquement (iOS pas encore disponible)',
              'Récente sur Google Play — gamme de fonctions en croissance avec des mises à jour régulières',
            ]}
            free="15 trades, journal complet, calculateur de lot, checklists"
            premium="Trades illimités, statistiques avancées, revue hebdomadaire, notifications, export, outils de psychologie"
            cta={
              <a href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200' }}>
                <FaGooglePlay style={{ fontSize: 12 }} />
                Télécharger gratuitement sur Google Play
              </a>
            }
          />

          {/* App 2 — TraderSync */}
          <AppCard
            rank="2"
            name="TraderSync"
            tag="Meilleur pour l'import automatique du broker"
            tagColor="#CE93D8"
            description="TraderSync est un journal de trading établi, basé sur le web, avec import automatique du broker. Il est populaire chez les traders d'actions américaines qui veulent connecter directement leur courtier et importer les trades automatiquement."
            pros={[
              'Import automatique du broker (100+ brokers pris en charge)',
              'Bonnes statistiques et rapports',
              'Interface propre et professionnelle',
            ]}
            cons={[
              'Pas d\'application Android native — l\'expérience mobile est limitée',
              'Exige une connexion au broker pour la pleine fonctionnalité',
              'Le plan gratuit est très limité (10 trades/mois)',
              'Les plans payants commencent à 29,95 $/mois',
              'Pas de fonction hors ligne',
            ]}
            free="10 trades/mois, analyse limitée"
            premium="À partir de 29,95 $/mois"
          />

          {/* App 3 — Tradervue */}
          <AppCard
            rank="3"
            name="Tradervue"
            tag="Meilleur pour les day traders (web)"
            tagColor="#FFB300"
            description="Tradervue est l'une des plus anciennes plateformes de journal de trading, uniquement sur le web, axée sur les day traders et les actions. Elle a une forte communauté et des fonctions de partage."
            pros={[
              'Analyse solide pour les day traders',
              'Partage de trades et communauté',
              'Import broker pris en charge',
            ]}
            cons={[
              'Aucune application mobile',
              'Interface vieillissante',
              'Plan gratuit limité à 30 trades/mois, sans statistiques avancées',
              'Plans payants à partir de 29,95 $/mois',
              'Pas de checklist ni de suivi de discipline',
            ]}
            free="30 trades/mois, statistiques de base"
            premium="À partir de 29,95 $/mois"
          />

          {/* App 4 — Edgewonk */}
          <AppCard
            rank="4"
            name="Edgewonk"
            tag="Meilleur journal desktop"
            tagColor="#78909C"
            description="Edgewonk est un journal de trading puissant avec une analyse approfondie, souvent recommandé dans la communauté des traders pros. Il offre maintenant une version cloud en plus de l'appli desktop classique, mais n'a toujours pas d'application mobile dédiée."
            pros={[
              'Analyse et rapports très détaillés',
              'Version cloud désormais disponible (en plus du desktop)',
              'Bon pour les swing traders et investisseurs',
            ]}
            cons={[
              'Pas d\'application mobile dédiée',
              'Abonnement annuel à partir de 169 $/an',
              'Pas de log hors ligne sur mobile',
              'Pas de plan gratuit',
              'Pas de fonctions en temps réel',
            ]}
            free="Pas de plan gratuit"
            premium="À partir de 169 $/an"
          />

          <Divider />

          {/* Comparison table */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-6" style={{ letterSpacing: '-0.01em' }}>
            Comparatif rapide
          </h2>

          <div className="overflow-x-auto rounded-xl mb-10" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(79,195,247,0.06)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['', 'KMF', 'TraderSync', 'Tradervue', 'Edgewonk'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-kmf-text-primary">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Application Android', true,  false, false, false],
                  ['Mode hors ligne',    true,  false, false, false],
                  ['Plan gratuit',       true,  true,  true,  false],
                  ['Sans broker',        true,  false, false, true ],
                  ['Outils de discipline', true, false, false, false],
                  ['Statistiques avancées', true,  true,  true,  true ],
                  ['Prix',               'Gratuit+','30 $/mois','30 $/mois','169 $/an'],
                ].map(([label, ...vals]) => (
                  <tr key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td className="px-4 py-3 text-kmf-text-tertiary font-medium">{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="px-4 py-3">
                        {typeof v === 'boolean'
                          ? v
                            ? <FaCheck style={{ color: '#00C853', fontSize: 13 }} />
                            : <FaTimes style={{ color: '#FF5252', opacity: 0.5, fontSize: 13 }} />
                          : <span className={`font-semibold ${i === 0 ? 'text-kmf-accent' : 'text-kmf-text-secondary'}`}>{v}</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-kmf-text-tertiary mb-6" style={{ opacity: 0.6 }}>
            Prix vérifiés en mars 2026. Vérifie le site de chaque fournisseur pour les prix actuels.
          </p>

          <Divider />

          {/* Verdict */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Verdict
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Si tu trades depuis ton téléphone ou veux enregistrer tes trades juste après les avoir exécutés — <strong className="text-kmf-text-primary">K.M.F. Trading Journal est la seule option Android gratuite</strong> qui combine une vraie analyse avec des outils de discipline, un accès hors ligne et la confidentialité des données.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            TraderSync et Tradervue sont des choix solides si tu trades depuis l'ordinateur et veux l'import automatique du broker — mais leur expérience mobile est faible et les plans gratuits très limités.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-8">
            Edgewonk est excellent pour l'analyse approfondie, mais exige un abonnement de 169 $/an et n'a toujours pas d'application mobile dédiée.
          </p>

          {/* Related Articles */}
          <div className="rounded-xl p-6 mt-10 mb-8" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
            <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-4">Articles similaires</p>
            <ul className="space-y-3">
              {[
                { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
                { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
                { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
              ].map((a) => (
                <li key={a.slug}>
                  <Link to={`/blog/${a.slug}`} className="group flex items-start gap-3">
                    <span className="text-kmf-accent mt-0.5 flex-shrink-0">&rarr;</span>
                    <span>
                      <span className="text-sm font-medium text-kmf-text-primary group-hover:text-kmf-accent transition-colors">{a.title}</span>
                      <span className="text-xs text-kmf-text-tertiary ml-2">({a.category})</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Final CTA */}
          <div className="rounded-2xl p-7 text-center"
            style={{ background: 'rgba(26,22,14,0.95)', border: '1px solid rgba(255,179,0,0.22)' }}>
            <p className="text-lg font-bold text-kmf-text-primary mb-2">
              K.M.F. est disponible sur Google Play
            </p>
            <p className="text-sm text-kmf-text-secondary mb-5">
              Télécharge-la gratuitement et commence à journaliser tes trades dès aujourd'hui. <strong style={{ color: '#FFB300' }}>Essai Premium de 7 jours inclus</strong> — annule avant la fin et rien ne sera facturé.
            </p>
            <a href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}>
              <FaGooglePlay style={{ fontSize: 14 }} />
              Télécharger sur Google Play
            </a>
          </div>

        </article>

        {/* Back to blog */}
        <div className="max-w-2xl mx-auto mt-12">
          <Link to="/blog" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">
            ← Retour au blog
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const Divider = () => (
  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '2.5rem 0' }} />
);

const AppCard = ({ rank, name, tag, tagColor, url, description, pros, cons, free, premium, cta }) => (
  <div className="mb-8 rounded-2xl p-6"
    style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold" style={{ color: tagColor, opacity: 0.7 }}>#{rank}</span>
          <h3 className="text-lg font-bold text-kmf-text-primary">{name}</h3>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="text-xs text-kmf-accent hover:underline hidden sm:inline">↗</a>
          )}
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{ background: `${tagColor}14`, color: tagColor, border: `1px solid ${tagColor}25` }}>
          {tag}
        </span>
      </div>
    </div>

    <p className="text-sm text-kmf-text-secondary leading-relaxed mb-4">{description}</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Avantages</p>
        <ul className="space-y-1.5">
          {pros.map((p) => (
            <li key={p} className="flex gap-2 text-xs text-kmf-text-secondary">
              <FaCheck style={{ color: '#00C853', fontSize: 10, flexShrink: 0, marginTop: 3 }} />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Inconvénients</p>
        <ul className="space-y-1.5">
          {cons.map((c) => (
            <li key={c} className="flex gap-2 text-xs text-kmf-text-secondary">
              <FaTimes style={{ color: '#FF5252', opacity: 0.6, fontSize: 10, flexShrink: 0, marginTop: 3 }} />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="flex flex-wrap gap-3 pt-3 border-t border-white/5 items-center justify-between">
      <div className="flex gap-4 flex-wrap text-xs text-kmf-text-tertiary">
        <span><strong className="text-kmf-text-secondary">Gratuit :</strong> {free}</span>
        <span><strong className="text-kmf-text-secondary">Payant :</strong> {premium}</span>
      </div>
      {cta && <div>{cta}</div>}
    </div>
  </div>
);
