import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/landing/Navbar';
import Footer from '../../../components/Footer';
import { FaCheck, FaTimes, FaGooglePlay } from 'react-icons/fa';
import blogTranslations from '../../../i18n/blogTranslations';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kmf.tradingjournal';

const SITE = 'https://kmfjournal.com';
const SLUG = 'best-free-trading-journal-app-android-2026';
const PAGE_TITLE = 'Die beste kostenlose Trading-Journal-App für Android 2026 | K.M.F.';
const PAGE_DESC = 'Suchst du die beste kostenlose Trading-Journal-App für Android 2026? Vergleiche K.M.F., TraderSync, Tradervue und Edgewonk — Funktionen, Preise und welche die beste für Forex-, Aktien- und Krypto-Trader ist.';
const PAGE_URL = `${SITE}/blog/de/${SLUG}`;
const OG_IMAGE = `${SITE}/blog/og/de-${SLUG}.png`;

function setMeta(name, content, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

export default function BestTradingJournalAndroid2026De() {
  // NOTE: No automatic browser-language redirect — it caused Googlebot to flag
  // canonical URLs as "Page with redirect" and blocked indexing. hreflang tags
  // (injected below) handle language alternates; switching is manual.

  useEffect(() => {
    document.title = PAGE_TITLE;
    setMeta('description', PAGE_DESC);

    // html lang
    document.documentElement.lang = 'de';

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
      headline: 'Die beste kostenlose Trading-Journal-App für Android 2026',
      description: PAGE_DESC,
      datePublished: '2026-02-20',
      dateModified: '2026-02-27',
      inLanguage: 'de',
      author: { '@type': 'Organization', name: 'K.M.F. Trading Research', url: SITE },
      publisher: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
      image: OG_IMAGE,
      url: PAGE_URL,
    });

    injectLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Die beste kostenlose Trading-Journal-App für Android 2026', item: PAGE_URL },
      ],
    });

    injectLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Was ist die beste kostenlose Trading-Journal-App für Android?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal ist das beste kostenlose Trading-Journal für Android 2026 und bietet Emotions-Tracking, Risikorechner, Achievements und Offline-Unterstützung — alles kostenlos, mit einem optionalen Premium-Plan.' } },
        { '@type': 'Question', name: 'Ist K.M.F. Trading Journal wirklich kostenlos?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. K.M.F. bietet einen kostenlosen Plan mit 15 Trades, Basis-Statistiken, Risikorechnern und Cloud-Synchronisation. Premium ergänzt unbegrenzte Trades, erweiterte Analytik und Tools für Verhaltenspsychologie.' } },
        { '@type': 'Question', name: 'Welche Trading-Journal-App ist die beste für Forex-Trader?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal ist für Forex-, Aktien- und Krypto-Trader gebaut. Es enthält einen Lot-Size-Rechner, Stop-Loss-Tracking in Pips und auf Forex-Marktsessions zugeschnittene Analytik.' } },
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
            <Link to="/" className="hover:text-kmf-accent transition-colors">Startseite</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">Die beste kostenlose Trading-Journal-App für Android 2026</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(79,195,247,0.12)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.22)' }}>
              App-Reviews
            </span>
            <time className="text-xs text-kmf-text-tertiary" dateTime="2026-02-20">20. Februar 2026</time>
            <span className="text-xs text-kmf-text-tertiary">· 6 Min. Lesezeit</span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-bold text-kmf-text-primary mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
            itemProp="headline">
            Die beste kostenlose Trading-Journal-App für Android 2026
          </h1>

          {/* Intro */}
          <p className="text-lg text-kmf-text-secondary leading-relaxed mb-10"
            style={{ borderLeft: '3px solid rgba(79,195,247,0.40)', paddingLeft: '1.25rem' }}>
            Die meisten Trader wissen, dass sie ein Journal führen sollten. Wenige tun es wirklich — weil die meisten Journal-Apps entweder teuer, nur im Web verfügbar sind oder die Verbindung deines Broker-Kontos verlangen. Hier ist ein ehrlicher Vergleich der besten kostenlosen Optionen, die 2026 für Android verfügbar sind.
          </p>

          <Divider />

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Warum ein Trading-Journal deine Ergebnisse verändert
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Studien zur Trading-Performance zeigen konstant eine Sache: Trader, die journalen, machen schneller Fortschritte als die, die es nicht tun. Nicht weil Schreiben magisch wäre — sondern weil es dich zwingt, deine Entscheidungen zu reviewen, Muster in Verlusten zu finden und zu verfolgen, ob du wirklich deine eigenen Regeln einhältst.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Das Problem ist Konstanz. Wenn dein Journal ein Spreadsheet auf dem Laptop ist, wirst du es nicht direkt nach dem Trade ausfüllen. Wenn es eine bezahlte App ist, die 30 $/Monat kostet, wirst du sie nach der ersten Verlustserie aufgeben. Ein gutes Journal muss schnell, mobil und kostenlos genug sein, damit es keine Ausrede gibt, es nicht zu nutzen.
          </p>

          <Divider />

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Worauf du bei einer Trading-Journal-App achten solltest
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              ['Mobile-first & offline', 'Funktioniert ohne Internet. Du kannst einen Trade direkt nach der Ausführung loggen, nicht später am Schreibtisch.'],
              ['Analyse jenseits der P/L', 'Win Rate allein reicht nicht. Achte auf Profit Factor, R-Vielfaches, Erwartungswert und Drawdown.'],
              ['Disziplin-Tools', 'Pre-Trade-Checklisten, wöchentliche Reviews und Scores helfen dir, dein System zu traden, nicht deine Emotionen.'],
              ['Datenschutz', 'Apps, die API-Zugriff auf den Broker verlangen, legen dein Konto offen. Manuelle Eingabe hält deine Daten bei dir.'],
              ['Ehrlicher kostenloser Plan', 'Viele „kostenlose" Apps sperren alles hinter einer Paywall. Basis-Journaling sollte kostenlos sein.'],
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
            Die besten Trading-Journal-Apps für Android 2026
          </h2>

          {/* App 1 — KMF */}
          <AppCard
            rank="1"
            name="K.M.F. Trading Journal"
            tag="Beste kostenlose Option für Android"
            tagColor="#4FC3F7"
            url="https://kmfjournal.com"
            description="K.M.F. (Keep Moving Forward) ist eine native Android-App, speziell für ernsthafte Trader gebaut, die mehr wollen als ein P/L-Log. Sie funktioniert komplett offline, verlangt keine Broker-Verbindung und legt starken Fokus auf Disziplin — nicht nur auf Zahlen."
            pros={[
              'Native Android-App — schnell, offline, ohne Browser',
              'Pre-Trade-Checkliste, um dein Setup vor jedem Einstieg zu prüfen',
              'Disziplin-Score-Tracking über Trades und Wochen',
              'Wöchentliches Review mit 5 Selbstbewertungs-Kriterien',
              'Erweiterte Statistiken: Profit Factor, R-Vielfaches, Erwartungswert, Drawdown',
              'Integrierter Lot-Size-Rechner mit Live-Preisen und R:R',
              'Cloud-Synchronisation & Backup (alle Pläne)',
              '7 Sprachen, inklusive Englisch, Deutsch, Rumänisch, Japanisch',
              'Basis-Funktionen kostenlos — keine Kreditkarte',
            ]}
            cons={[
              'Nur Android (iOS noch nicht verfügbar)',
              'Neu bei Google Play — wachsender Funktionsumfang mit regelmäßigen Updates',
            ]}
            free="15 Trades, vollständiges Journaling, Lot-Rechner, Checklisten"
            premium="Unbegrenzte Trades, erweiterte Statistiken, wöchentliches Review, Benachrichtigungen, Export, Psychologie-Tools"
            cta={
              <a href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'play_store_click', { source: 'blog_best_journal_card' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200' }}>
                <FaGooglePlay style={{ fontSize: 12 }} />
                Kostenlos bei Google Play laden
              </a>
            }
          />

          {/* App 2 — TraderSync */}
          <AppCard
            rank="2"
            name="TraderSync"
            tag="Am besten für automatischen Broker-Import"
            tagColor="#CE93D8"
            description="TraderSync ist ein etabliertes, webbasiertes Trading-Journal mit automatischem Broker-Import. Es ist beliebt bei US-Aktien-Tradern, die ihr Brokerage direkt verbinden und Trades automatisch importieren lassen wollen."
            pros={[
              'Automatischer Broker-Import (100+ Broker unterstützt)',
              'Gute Statistiken und Reports',
              'Saubere, professionelle Oberfläche',
            ]}
            cons={[
              'Keine native Android-App — die mobile Erfahrung ist eingeschränkt',
              'Verlangt Broker-Verbindung für volle Funktionalität',
              'Der kostenlose Plan ist sehr begrenzt (10 Trades/Monat)',
              'Bezahlte Pläne beginnen bei 29,95 $/Monat',
              'Keine Offline-Funktion',
            ]}
            free="10 Trades/Monat, begrenzte Analyse"
            premium="Ab 29,95 $/Monat"
          />

          {/* App 3 — Tradervue */}
          <AppCard
            rank="3"
            name="Tradervue"
            tag="Am besten für Day-Trader (Web)"
            tagColor="#FFB300"
            description="Tradervue ist eine der ältesten Trading-Journal-Plattformen, nur im Web, fokussiert auf Day-Trader und Aktien. Es hat eine starke Community und Share-Funktionen."
            pros={[
              'Solide Analyse für Day-Trader',
              'Trade-Sharing und Community',
              'Broker-Import unterstützt',
            ]}
            cons={[
              'Gar keine Mobile-App',
              'Veraltete Oberfläche',
              'Kostenloser Plan auf 30 Trades/Monat begrenzt, ohne erweiterte Statistiken',
              'Bezahlte Pläne ab 29,95 $/Monat',
              'Keine Checkliste oder Disziplin-Tracking',
            ]}
            free="30 Trades/Monat, Basis-Statistiken"
            premium="Ab 29,95 $/Monat"
          />

          {/* App 4 — Edgewonk */}
          <AppCard
            rank="4"
            name="Edgewonk"
            tag="Bestes Desktop-Journal"
            tagColor="#78909C"
            description="Edgewonk ist ein leistungsstarkes Trading-Journal mit tiefer Analyse, das häufig in der Profi-Trader-Community empfohlen wird. Es bietet jetzt neben der klassischen Desktop-App auch eine Cloud-Version, hat aber immer noch keine dedizierte Mobile-App."
            pros={[
              'Sehr detaillierte Analyse und Reports',
              'Cloud-Version jetzt verfügbar (neben Desktop)',
              'Gut für Swing-Trader und Investoren',
            ]}
            cons={[
              'Keine dedizierte Mobile-App',
              'Jahresabo ab 169 $/Jahr',
              'Kein Offline-Logging auf Mobilgeräten',
              'Kein kostenloser Plan',
              'Keine Echtzeit-Funktionen',
            ]}
            free="Kein kostenloser Plan"
            premium="Ab 169 $/Jahr"
          />

          <Divider />

          {/* Comparison table */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-6" style={{ letterSpacing: '-0.01em' }}>
            Schnellvergleich
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
                  ['Android-App',   true,  false, false, false],
                  ['Offline-Modus',  true,  false, false, false],
                  ['Kostenloser Plan',     true,  true,  true,  false],
                  ['Ohne Broker', true,  false, false, true ],
                  ['Disziplin-Tools', true, false, false, false],
                  ['Erweiterte Statistiken',true,  true,  true,  true ],
                  ['Preis',         'Kostenlos+','30 $/Monat','30 $/Monat','169 $/Jahr'],
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
            Preise im März 2026 geprüft. Prüfe die Website jedes Anbieters für aktuelle Preise.
          </p>

          <Divider />

          {/* Verdict */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Fazit
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Wenn du vom Handy tradest oder Trades direkt nach der Ausführung loggen willst — <strong className="text-kmf-text-primary">K.M.F. Trading Journal ist die einzige kostenlose Android-Option</strong>, die echte Analyse mit Disziplin-Tools, Offline-Zugriff und Datenschutz kombiniert.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            TraderSync und Tradervue sind solide Wahlen, wenn du vom Desktop tradest und automatischen Broker-Import willst — aber ihre mobile Erfahrung ist schwach und die kostenlosen Pläne sind sehr begrenzt.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-8">
            Edgewonk ist exzellent für tiefe Analyse, verlangt aber ein Abo von 169 $/Jahr und hat immer noch keine dedizierte Mobile-App.
          </p>

          {/* Related Articles */}
          <div className="rounded-xl p-6 mt-10 mb-8" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
            <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-4">Ähnliche Artikel</p>
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
              K.M.F. ist bei Google Play verfügbar
            </p>
            <p className="text-sm text-kmf-text-secondary mb-5">
              Lade sie kostenlos und beginne noch heute, deine Trades zu journalen. <strong style={{ color: '#FFB300' }}>7-Tage-Premium-Trial inklusive</strong> — kündige vor Ablauf und es wird nichts berechnet.
            </p>
            <a href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.gtag?.('event', 'play_store_click', { source: 'blog_best_journal_bottom' })}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}>
              <FaGooglePlay style={{ fontSize: 14 }} />
              Bei Google Play laden
            </a>
          </div>

        </article>

        {/* Back to blog */}
        <div className="max-w-2xl mx-auto mt-12">
          <Link to="/blog" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">
            ← Zurück zum Blog
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
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Vorteile</p>
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
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Nachteile</p>
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
        <span><strong className="text-kmf-text-secondary">Kostenlos:</strong> {free}</span>
        <span><strong className="text-kmf-text-secondary">Bezahlt:</strong> {premium}</span>
      </div>
      {cta && <div>{cta}</div>}
    </div>
  </div>
);
