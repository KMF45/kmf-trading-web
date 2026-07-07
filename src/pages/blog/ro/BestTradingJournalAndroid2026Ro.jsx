import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/landing/Navbar';
import Footer from '../../../components/Footer';
import { FaCheck, FaTimes, FaGooglePlay } from 'react-icons/fa';
import blogTranslations from '../../../i18n/blogTranslations';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kmf.tradingjournal';

const SITE = 'https://kmfjournal.com';
const SLUG = 'best-free-trading-journal-app-android-2026';
const PAGE_TITLE = 'Cea Mai Bună Aplicație Gratuită de Trading Journal pentru Android în 2026 | K.M.F.';
const PAGE_DESC = 'Cauți cea mai bună aplicație gratuită de trading journal pentru Android în 2026? Compară K.M.F., TraderSync, Tradervue și Edgewonk — funcții, prețuri și care e cea mai bună pentru traderii de forex, acțiuni și crypto.';
const PAGE_URL = `${SITE}/blog/ro/${SLUG}`;
const OG_IMAGE = `${SITE}/blog/og/ro-${SLUG}.png`;

function setMeta(name, content, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

export default function BestTradingJournalAndroid2026Ro() {
  // NOTE: No automatic browser-language redirect — it caused Googlebot to flag
  // canonical URLs as "Page with redirect" and blocked indexing. hreflang tags
  // (injected below) handle language alternates; switching is manual.

  useEffect(() => {
    document.title = PAGE_TITLE;
    setMeta('description', PAGE_DESC);

    // html lang
    document.documentElement.lang = 'ro';

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
      headline: 'Cea Mai Bună Aplicație Gratuită de Trading Journal pentru Android în 2026',
      description: PAGE_DESC,
      datePublished: '2026-02-20',
      dateModified: '2026-02-27',
      inLanguage: 'ro',
      author: { '@type': 'Organization', name: 'K.M.F. Trading Research', url: SITE },
      publisher: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
      image: OG_IMAGE,
      url: PAGE_URL,
    });

    injectLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Cea Mai Bună Aplicație Gratuită de Trading Journal pentru Android 2026', item: PAGE_URL },
      ],
    });

    injectLd('ld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Care e cea mai bună aplicație gratuită de trading journal pentru Android?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal e cel mai bun trading journal gratuit pentru Android în 2026, oferind tracking emoțional, calculatoare de risc, realizări și suport offline — toate gratuit, cu un plan Premium opțional.' } },
        { '@type': 'Question', name: 'K.M.F. Trading Journal e cu adevărat gratuit?', acceptedAnswer: { '@type': 'Answer', text: 'Da. K.M.F. oferă un plan gratuit cu 15 trade-uri, statistici de bază, calculatoare de risc și sincronizare în cloud. Premium adaugă trade-uri nelimitate, analiză avansată și unelte de psihologie comportamentală.' } },
        { '@type': 'Question', name: 'Care aplicație de trading journal e cea mai bună pentru traderii de forex?', acceptedAnswer: { '@type': 'Answer', text: 'K.M.F. Trading Journal e construit pentru traderii de forex, acțiuni și crypto. Include un calculator de lot size, urmărirea stop loss-ului în pips și analiză adaptată sesiunilor piețelor forex.' } },
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
            <Link to="/" className="hover:text-kmf-accent transition-colors">Acasă</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">Cea Mai Bună Aplicație Gratuită de Trading Journal pentru Android 2026</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(79,195,247,0.12)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.22)' }}>
              Recenzii Aplicații
            </span>
            <time className="text-xs text-kmf-text-tertiary" dateTime="2026-02-20">20 februarie 2026</time>
            <span className="text-xs text-kmf-text-tertiary">· 6 min citire</span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-bold text-kmf-text-primary mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
            itemProp="headline">
            Cea Mai Bună Aplicație Gratuită de Trading Journal pentru Android în 2026
          </h1>

          {/* Intro */}
          <p className="text-lg text-kmf-text-secondary leading-relaxed mb-10"
            style={{ borderLeft: '3px solid rgba(79,195,247,0.40)', paddingLeft: '1.25rem' }}>
            Majoritatea traderilor știu că ar trebui să țină un jurnal. Puțini o fac cu adevărat — pentru că majoritatea aplicațiilor de jurnal sunt fie scumpe, fie doar pe web, fie cer conectarea contului de broker. Iată o comparație onestă a celor mai bune opțiuni gratuite disponibile pentru Android în 2026.
          </p>

          <Divider />

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            De Ce un Trading Journal Îți Schimbă Rezultatele
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Studiile despre performanța în trading arată constant un lucru: traderii care jurnalizează progresează mai repede decât cei care nu o fac. Nu pentru că scrisul ar fi magic — ci pentru că te forțează să-ți revizuiești deciziile, să găsești pattern-uri în pierderi și să urmărești dacă îți respecți cu adevărat propriile reguli.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Problema e consistența. Dacă jurnalul tău e un spreadsheet pe laptop, nu o să-l completezi imediat după trade. Dacă e o aplicație plătită care costă $30/lună, o să renunți la ea după prima serie de pierderi. Un jurnal bun trebuie să fie rapid, pe mobil și destul de gratuit încât să nu existe nicio scuză să nu-l folosești.
          </p>

          <Divider />

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Ce să Cauți într-o Aplicație de Trading Journal
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              ['Mobile-first & offline', 'Funcționează fără internet. Poți loga un trade imediat după execuție, nu mai târziu la birou.'],
              ['Analiză dincolo de P/L', 'Win rate-ul nu e de ajuns. Caută profit factor, R-multiple, expectancy și drawdown.'],
              ['Unelte de disciplină', 'Checklist-uri pre-trade, review-uri săptămânale și scoruri te ajută să-ți tranzacționezi sistemul, nu emoțiile.'],
              ['Confidențialitate', 'Aplicațiile care cer acces API la broker îți expun contul. Introducerea manuală îți păstrează datele ale tale.'],
              ['Plan gratuit onest', 'Multe aplicații „gratuite" blochează totul în spatele unui paywall. Jurnalizarea de bază ar trebui să fie gratuită.'],
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
            Cele Mai Bune Aplicații de Trading Journal pentru Android în 2026
          </h2>

          {/* App 1 — KMF */}
          <AppCard
            rank="1"
            name="K.M.F. Trading Journal"
            tag="Cea Mai Bună Opțiune Gratuită pe Android"
            tagColor="#4FC3F7"
            url="https://kmfjournal.com"
            description="K.M.F. (Keep Moving Forward) e o aplicație nativă de Android construită special pentru traderii serioși care vor mai mult decât un log de P/L. Funcționează complet offline, nu cere conexiune la broker și pune accent puternic pe disciplină — nu doar pe cifre."
            pros={[
              'Aplicație nativă Android — rapidă, offline, fără browser',
              'Checklist pre-trade ca să-ți verifici setup-ul înainte de fiecare intrare',
              'Urmărirea scorului de disciplină pe trade-uri și săptămâni',
              'Review săptămânal cu 5 criterii de autoevaluare',
              'Statistici avansate: profit factor, R-multiple, expectancy, drawdown',
              'Calculator de lot size integrat, cu prețuri live și R:R',
              'Sincronizare cloud & backup (toate planurile)',
              '7 limbi, inclusiv engleză, română, rusă, japoneză',
              'Funcțiile de bază gratuite — fără card bancar',
            ]}
            cons={[
              'Doar Android (iOS nu e disponibil încă)',
              'Nouă pe Google Play — set de funcții în creștere, cu update-uri regulate',
            ]}
            free="15 trade-uri, jurnalizare completă, calculator de lot, checklist-uri"
            premium="Trade-uri nelimitate, statistici avansate, review săptămânal, notificări, export, unelte de psihologie"
            cta={
              <a href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200' }}>
                <FaGooglePlay style={{ fontSize: 12 }} />
                Descarcă Gratuit de pe Google Play
              </a>
            }
          />

          {/* App 2 — TraderSync */}
          <AppCard
            rank="2"
            name="TraderSync"
            tag="Cel Mai Bun pentru Import Automat de la Broker"
            tagColor="#CE93D8"
            description="TraderSync e un trading journal consacrat, bazat pe web, cu import automat de la broker. E popular printre traderii americani de acțiuni care vor să-și conecteze direct brokerajul și să aibă trade-urile importate automat."
            pros={[
              'Import automat de la broker (100+ brokeri suportați)',
              'Statistici și rapoarte bune',
              'Interfață curată, profesionistă',
            ]}
            cons={[
              'Fără aplicație nativă Android — experiența pe mobil e limitată',
              'Cere conexiune la broker pentru funcționalitate completă',
              'Planul gratuit e foarte limitat (10 trade-uri/lună)',
              'Planurile plătite încep de la $29.95/lună',
              'Fără funcționare offline',
            ]}
            free="10 trade-uri/lună, analiză limitată"
            premium="De la $29.95/lună"
          />

          {/* App 3 — Tradervue */}
          <AppCard
            rank="3"
            name="Tradervue"
            tag="Cel Mai Bun pentru Day Traderi (Web)"
            tagColor="#FFB300"
            description="Tradervue e una dintre cele mai vechi platforme de trading journal, doar pe web, concentrată pe day traderi și acțiuni. Are o comunitate puternică și funcții de share."
            pros={[
              'Analiză solidă pentru day traderi',
              'Share de trade-uri și comunitate',
              'Import de la broker suportat',
            ]}
            cons={[
              'Fără nicio aplicație de mobil',
              'Interfață învechită',
              'Planul gratuit limitat la 30 trade-uri/lună, fără statistici avansate',
              'Planuri plătite de la $29.95/lună',
              'Fără checklist sau urmărirea disciplinei',
            ]}
            free="30 trade-uri/lună, statistici de bază"
            premium="De la $29.95/lună"
          />

          {/* App 4 — Edgewonk */}
          <AppCard
            rank="4"
            name="Edgewonk"
            tag="Cel Mai Bun Jurnal de Desktop"
            tagColor="#78909C"
            description="Edgewonk e un trading journal puternic, cu analiză profundă, recomandat frecvent în comunitatea traderilor profesioniști. Oferă acum și o versiune cloud pe lângă aplicația clasică de desktop, dar tot nu are o aplicație dedicată de mobil."
            pros={[
              'Analiză și rapoarte foarte detaliate',
              'Versiune cloud disponibilă acum (pe lângă desktop)',
              'Bun pentru swing traderi și investitori',
            ]}
            cons={[
              'Fără aplicație dedicată de mobil',
              'Abonament anual de la $169/an',
              'Fără logare offline pe mobil',
              'Fără plan gratuit',
              'Fără funcții în timp real',
            ]}
            free="Fără plan gratuit"
            premium="De la $169/an"
          />

          <Divider />

          {/* Comparison table */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-6" style={{ letterSpacing: '-0.01em' }}>
            Comparație Rapidă
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
                  ['Aplicație Android',   true,  false, false, false],
                  ['Mod offline',  true,  false, false, false],
                  ['Plan gratuit',     true,  true,  true,  false],
                  ['Fără broker', true,  false, false, true ],
                  ['Unelte de disciplină', true, false, false, false],
                  ['Statistici avansate',true,  true,  true,  true ],
                  ['Preț',         'Gratuit+','$30/lună','$30/lună','$169/an'],
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
            Prețuri verificate în martie 2026. Verifică site-ul fiecărui furnizor pentru prețurile la zi.
          </p>

          <Divider />

          {/* Verdict */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Verdict
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Dacă tranzacționezi de pe telefon sau vrei să loghezi trade-urile imediat după execuție — <strong className="text-kmf-text-primary">K.M.F. Trading Journal e singura opțiune gratuită de Android</strong> care combină analiză reală cu unelte de disciplină, acces offline și confidențialitate.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            TraderSync și Tradervue sunt alegeri solide dacă tranzacționezi de pe desktop și vrei import automat de la broker — dar experiența lor pe mobil e slabă și planurile gratuite sunt foarte limitate.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-8">
            Edgewonk e excelent pentru analiză profundă, dar cere un abonament de $169/an și tot nu are o aplicație dedicată de mobil.
          </p>

          {/* Related Articles */}
          <div className="rounded-xl p-6 mt-10 mb-8" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
            <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-4">Articole Similare</p>
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
              K.M.F. e disponibilă pe Google Play
            </p>
            <p className="text-sm text-kmf-text-secondary mb-5">
              Descarcă gratuit și începe să-ți jurnalizezi trade-urile de azi. <strong style={{ color: '#FFB300' }}>Trial Premium de 7 zile inclus</strong> — anulează înainte să expire și nu ești taxat.
            </p>
            <a href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}>
              <FaGooglePlay style={{ fontSize: 14 }} />
              Descarcă de pe Google Play
            </a>
          </div>

        </article>

        {/* Back to blog */}
        <div className="max-w-2xl mx-auto mt-12">
          <Link to="/blog" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">
            ← Înapoi la Blog
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
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Avantaje</p>
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
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Dezavantaje</p>
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
        <span><strong className="text-kmf-text-secondary">Gratuit:</strong> {free}</span>
        <span><strong className="text-kmf-text-secondary">Plătit:</strong> {premium}</span>
      </div>
      {cta && <div>{cta}</div>}
    </div>
  </div>
);
