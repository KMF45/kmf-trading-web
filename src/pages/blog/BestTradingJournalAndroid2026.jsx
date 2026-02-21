import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/Footer';
import { FaCheck, FaTimes, FaEnvelope } from 'react-icons/fa';

const MAILTO = `mailto:contact@kmfjournal.com?subject=Beta%20Tester%20Application%20%E2%80%94%20K.M.F.%20Trading%20Journal`;

const SITE = 'https://kmfjournal.com';
const SLUG = 'best-free-trading-journal-app-android-2026';
const PAGE_TITLE = 'Best Free Trading Journal App for Android in 2026 | K.M.F. Trading Journal';
const PAGE_DESC = 'Looking for the best free trading journal app for Android in 2026? Compare K.M.F., TraderSync, Tradervue and Edgewonk — features, pricing, and which is best for forex, stock and crypto traders.';
const PAGE_URL = `${SITE}/blog/${SLUG}`;
const OG_IMAGE = `${SITE}/blog/og/${SLUG}.png`;

function setMeta(name, content, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

export default function BestTradingJournalAndroid2026() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    setMeta('description', PAGE_DESC);

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', PAGE_URL);

    // OG
    setMeta('og:type', 'article', 'property');
    setMeta('og:url', PAGE_URL, 'property');
    setMeta('og:title', PAGE_TITLE, 'property');
    setMeta('og:description', PAGE_DESC, 'property');
    setMeta('og:image', OG_IMAGE, 'property');

    // Twitter
    setMeta('twitter:url', PAGE_URL, 'name');
    setMeta('twitter:title', PAGE_TITLE, 'name');
    setMeta('twitter:description', PAGE_DESC, 'name');
    setMeta('twitter:image', OG_IMAGE, 'name');

    // JSON-LD: Article
    const articleLd = document.createElement('script');
    articleLd.type = 'application/ld+json';
    articleLd.id = 'ld-article';
    articleLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Best Free Trading Journal App for Android in 2026',
      description: PAGE_DESC,
      datePublished: '2026-02-20',
      author: { '@type': 'Organization', name: 'K.M.F. Dev Team', url: SITE },
      publisher: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
      image: OG_IMAGE,
      url: PAGE_URL,
    });
    document.head.appendChild(articleLd);

    // JSON-LD: BreadcrumbList
    const breadcrumbLd = document.createElement('script');
    breadcrumbLd.type = 'application/ld+json';
    breadcrumbLd.id = 'ld-breadcrumb';
    breadcrumbLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Best Free Trading Journal App for Android 2026', item: PAGE_URL },
      ],
    });
    document.head.appendChild(breadcrumbLd);

    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      setMeta('description', 'K.M.F. Trading Journal is a professional trading journal app for forex, stocks & crypto traders.');
      if (canonical) canonical.setAttribute('href', `${SITE}/`);
      setMeta('og:type', 'website', 'property');
      setMeta('og:url', `${SITE}/`, 'property');
      setMeta('og:title', 'K.M.F. Trading Journal – Professional Trade Tracking & Analysis', 'property');
      setMeta('og:description', 'Track your trades, analyze performance with advanced statistics, manage risk with a lot calculator, and improve your trading discipline. Free for Android & Web.', 'property');
      setMeta('og:image', `${SITE}/logo.png`, 'property');
      setMeta('twitter:url', `${SITE}/`, 'name');
      setMeta('twitter:title', 'K.M.F. Trading Journal – Keep Moving Forward', 'name');
      setMeta('twitter:description', 'Professional trading journal for forex, stocks & crypto. Track, analyze and improve your trading performance.', 'name');
      setMeta('twitter:image', `${SITE}/logo.png`, 'name');
      document.getElementById('ld-article')?.remove();
      document.getElementById('ld-breadcrumb')?.remove();
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
            <Link to="/" className="hover:text-kmf-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">Best Free Trading Journal App for Android 2026</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(79,195,247,0.12)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.22)' }}>
              App Reviews
            </span>
            <time className="text-xs text-kmf-text-tertiary" dateTime="2026-02-20">February 20, 2026</time>
            <span className="text-xs text-kmf-text-tertiary">· 6 min read</span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-bold text-kmf-text-primary mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
            itemProp="headline">
            Best Free Trading Journal App for Android in 2026
          </h1>

          {/* Intro */}
          <p className="text-lg text-kmf-text-secondary leading-relaxed mb-10"
            style={{ borderLeft: '3px solid rgba(79,195,247,0.40)', paddingLeft: '1.25rem' }}>
            Most traders know they should keep a journal. Few actually do — because most journal apps are either expensive, web-only, or require connecting your broker account. Here's an honest comparison of the best free options available for Android in 2026.
          </p>

          <Divider />

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Why a Trading Journal Changes Your Results
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            Studies on trading performance consistently show one thing: traders who journal improve faster than those who don't. Not because writing things down is magic — but because it forces you to review your decisions, spot patterns in your losses, and track whether you're actually following your own rules.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            The problem is consistency. If your journal is a spreadsheet on your laptop, you won't fill it in right after a trade. If it's a paid app that costs $30/month, you'll stop using it after the first losing streak. A good journal needs to be fast, mobile, and free enough that there's no excuse not to use it.
          </p>

          <Divider />

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            What to Look for in a Trading Journal App
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              ['Mobile-first & offline', 'Works without internet. You can log a trade immediately after execution, not later at your desk.'],
              ['Analytics beyond P/L', 'Win rate is not enough. Look for profit factor, R-multiple, expectancy, and drawdown.'],
              ['Discipline tools', 'Pre-trade checklists, weekly reviews, and scoring help you trade your system, not your emotions.'],
              ['Privacy', 'Apps that require broker API access expose your account. Manual entry keeps your data yours.'],
              ['Honest free tier', 'Many "free" apps lock everything behind a paywall. Core journaling should be free.'],
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
            Best Trading Journal Apps for Android in 2026
          </h2>

          {/* App 1 — KMF */}
          <AppCard
            rank="1"
            name="K.M.F. Trading Journal"
            tag="Best Free Android Option"
            tagColor="#4FC3F7"
            url="https://kmfjournal.com"
            description="K.M.F. (Keep Moving Forward) is a native Android app built specifically for serious traders who want more than a P/L log. It works fully offline, doesn't require a broker connection, and focuses heavily on discipline — not just numbers."
            pros={[
              'Native Android app — fast, offline, no browser needed',
              'Pre-trade checklist to verify your setup before every entry',
              'Discipline score tracking across trades and weeks',
              'Weekly review with 5 self-evaluation metrics',
              'Advanced stats: profit factor, R-multiple, expectancy, drawdown',
              'Built-in lot size calculator with live prices and R:R',
              'Cloud sync between Android and Web (Premium)',
              '8 languages including English, Romanian, Russian, Japanese',
              'Free core features — no credit card required',
            ]}
            cons={[
              'Android only (iOS not available yet)',
              'Currently in beta — Google Play launch coming soon',
            ]}
            free="50 trades/month, full journaling, lot calculator, checklists"
            premium="Unlimited trades, cloud sync, advanced statistics, weekly review, notifications, export"
            cta={
              <a href={MAILTO}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200' }}>
                <FaEnvelope style={{ fontSize: 12 }} />
                Join Beta — Get Lifetime Premium Free
              </a>
            }
          />

          {/* App 2 — TraderSync */}
          <AppCard
            rank="2"
            name="TraderSync"
            tag="Best for Broker Auto-Import"
            tagColor="#CE93D8"
            description="TraderSync is a well-established web-based trading journal with automatic broker import. It's popular with US stock traders who want to connect their brokerage directly and have trades imported automatically."
            pros={[
              'Automatic broker import (100+ supported brokers)',
              'Good statistics and reporting',
              'Clean, professional interface',
            ]}
            cons={[
              'No native Android app — mobile experience is limited',
              'Requires broker connection for best functionality',
              'Free plan is very limited (10 trades/month)',
              'Paid plans start at $29.95/month',
              'No offline functionality',
            ]}
            free="10 trades/month, limited analytics"
            premium="From $29.95/month"
          />

          {/* App 3 — Tradervue */}
          <AppCard
            rank="3"
            name="Tradervue"
            tag="Best for Day Traders (Web)"
            tagColor="#FFB300"
            description="Tradervue is one of the oldest trading journal platforms, web-only, focused on day traders and stocks. It has a strong community and sharing features."
            pros={[
              'Strong analytics for day traders',
              'Trade sharing and community',
              'Broker import supported',
            ]}
            cons={[
              'No mobile app at all',
              'Dated interface',
              'Free plan limited to 30 trades/month, no advanced stats',
              'Paid plans from $29.95/month',
              'No checklist or discipline tracking',
            ]}
            free="30 trades/month, basic stats"
            premium="From $29.95/month"
          />

          {/* App 4 — Edgewonk */}
          <AppCard
            rank="4"
            name="Edgewonk"
            tag="Best Desktop Journal"
            tagColor="#78909C"
            description="Edgewonk is a powerful desktop-based trading journal with deep analytics. It's widely recommended in the professional trading community but has no mobile presence."
            pros={[
              'Very deep analytics and reporting',
              'One-time purchase (no subscription)',
              'Good for swing traders and investors',
            ]}
            cons={[
              'No mobile app',
              'Desktop only (Windows/Mac)',
              'No offline mobile logging',
              'One-time cost of $169',
              'No real-time features',
            ]}
            free="No free plan"
            premium="$169 one-time"
          />

          <Divider />

          {/* Comparison table */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-6" style={{ letterSpacing: '-0.01em' }}>
            Quick Comparison
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
                  ['Android app',   true,  false, false, false],
                  ['Offline mode',  true,  false, false, false],
                  ['Free tier',     true,  true,  true,  false],
                  ['No broker req', true,  false, false, true ],
                  ['Discipline tools', true, false, false, false],
                  ['Advanced stats',true,  true,  true,  true ],
                  ['Price',         'Free+','$30/mo','$30/mo','$169'],
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

          <Divider />

          {/* Verdict */}
          <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>
            Verdict
          </h2>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            If you trade on your phone or want to log trades immediately after execution — <strong className="text-kmf-text-primary">K.M.F. Trading Journal is the only free Android option</strong> that combines real analytics with discipline tools, offline access, and privacy.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-4">
            TraderSync and Tradervue are solid choices if you trade from a desktop and want automatic broker import — but their mobile experience is poor and free tiers are very limited.
          </p>
          <p className="text-kmf-text-secondary leading-relaxed mb-8">
            Edgewonk is excellent for deep analysis but requires a $169 investment and offers no mobile functionality at all.
          </p>

          {/* Final CTA */}
          <div className="rounded-2xl p-7 text-center"
            style={{ background: 'rgba(26,22,14,0.95)', border: '1px solid rgba(255,179,0,0.22)' }}>
            <p className="text-lg font-bold text-kmf-text-primary mb-2">
              K.M.F. is currently in beta
            </p>
            <p className="text-sm text-kmf-text-secondary mb-5">
              The first 50 beta testers get <strong style={{ color: '#FFB300' }}>free lifetime Premium access</strong> — all features, forever, no subscription.
            </p>
            <a href={MAILTO}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}>
              <FaEnvelope style={{ fontSize: 14 }} />
              Apply for Beta Access
            </a>
            <p className="text-xs text-kmf-text-tertiary mt-3">contact@kmfjournal.com · 50 spots only</p>
          </div>

        </article>

        {/* Back to blog */}
        <div className="max-w-2xl mx-auto mt-12">
          <Link to="/blog" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">
            ← Back to Blog
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
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Pros</p>
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
        <p className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-wider mb-2">Cons</p>
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
        <span><strong className="text-kmf-text-secondary">Free:</strong> {free}</span>
        <span><strong className="text-kmf-text-secondary">Paid:</strong> {premium}</span>
      </div>
      {cta && <div>{cta}</div>}
    </div>
  </div>
);
