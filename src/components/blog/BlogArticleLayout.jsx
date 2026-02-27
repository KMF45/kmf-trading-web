import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../landing/Navbar';
import Footer from '../Footer';

const SITE = 'https://kmfjournal.com';
const DEFAULTS = {
  title: 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy',
  description: 'K.M.F. Trading Journal is a professional trading journal app for forex, stocks & crypto traders.',
  ogTitle: 'K.M.F. Trading Journal – Professional Trade Tracking & Analysis',
  ogDescription: 'Track your trades, analyze performance with advanced statistics, manage risk with a lot calculator, and improve your trading discipline. Free for Android & Web.',
  ogImage: `${SITE}/logo.png`,
  ogUrl: `${SITE}/`,
  twitterTitle: 'K.M.F. Trading Journal – Keep Moving Forward',
  twitterDescription: 'Professional trading journal for forex, stocks & crypto. Track, analyze and improve your trading performance.',
};

function setMeta(name, content, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

export default function BlogArticleLayout({ title, metaTitle, metaDescription, slug, date, dateISO, readTime, category, categoryColor = '#4FC3F7', relatedArticles = [], children }) {
  useEffect(() => {
    const pageTitle = metaTitle || `${title} | K.M.F. Trading Journal`;
    const pageUrl = `${SITE}/blog/${slug}`;
    const ogImage = `${SITE}/blog/og/${slug}.png`;

    // Title + description
    document.title = pageTitle;
    setMeta('description', metaDescription || DEFAULTS.description);

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', pageUrl);

    // OG
    setMeta('og:type', 'article', 'property');
    setMeta('og:url', pageUrl, 'property');
    setMeta('og:title', pageTitle, 'property');
    setMeta('og:description', metaDescription || DEFAULTS.ogDescription, 'property');
    setMeta('og:image', ogImage, 'property');

    // Twitter
    setMeta('twitter:url', pageUrl, 'name');
    setMeta('twitter:title', pageTitle, 'name');
    setMeta('twitter:description', metaDescription || DEFAULTS.twitterDescription, 'name');
    setMeta('twitter:image', ogImage, 'name');

    // JSON-LD: Article
    const articleLd = document.createElement('script');
    articleLd.type = 'application/ld+json';
    articleLd.id = 'ld-article';
    articleLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: metaDescription,
      datePublished: dateISO,
      author: { '@type': 'Organization', name: 'K.M.F. Dev Team', url: SITE },
      publisher: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
      image: ogImage,
      url: pageUrl,
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
        { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
      ],
    });
    document.head.appendChild(breadcrumbLd);

    return () => {
      // Restore defaults
      document.title = DEFAULTS.title;
      setMeta('description', DEFAULTS.description);
      if (canonical) canonical.setAttribute('href', `${SITE}/`);
      setMeta('og:type', 'website', 'property');
      setMeta('og:url', DEFAULTS.ogUrl, 'property');
      setMeta('og:title', DEFAULTS.ogTitle, 'property');
      setMeta('og:description', DEFAULTS.ogDescription, 'property');
      setMeta('og:image', DEFAULTS.ogImage, 'property');
      setMeta('twitter:url', DEFAULTS.ogUrl, 'name');
      setMeta('twitter:title', DEFAULTS.twitterTitle, 'name');
      setMeta('twitter:description', DEFAULTS.twitterDescription, 'name');
      setMeta('twitter:image', DEFAULTS.ogImage, 'name');
      // Remove JSON-LD
      document.getElementById('ld-article')?.remove();
      document.getElementById('ld-breadcrumb')?.remove();
    };
  }, [title, metaTitle, metaDescription, slug, dateISO]);

  return (
    <>
      <Navbar />
      <main className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <article className="max-w-2xl mx-auto" itemScope itemType="https://schema.org/Article">
          <nav className="mb-8 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">{title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${categoryColor}18`, color: categoryColor, border: `1px solid ${categoryColor}28` }}>{category}</span>
            <time className="text-xs text-kmf-text-tertiary" dateTime={dateISO}>{date}</time>
            <span className="text-xs text-kmf-text-tertiary">· {readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-kmf-text-primary mb-8 leading-tight" style={{ letterSpacing: '-0.02em' }} itemProp="headline">{title}</h1>
          {children}
          {relatedArticles.length > 0 && (
            <div className="rounded-xl p-6 mt-10 mb-4" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
              <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-4">Related Articles</p>
              <ul className="space-y-3">
                {relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/blog/${a.slug}`} className="group flex items-start gap-3">
                      <span className="text-kmf-accent mt-0.5 flex-shrink-0">→</span>
                      <span>
                        <span className="text-sm font-medium text-kmf-text-primary group-hover:text-kmf-accent transition-colors">{a.title}</span>
                        {a.category && <span className="text-xs text-kmf-text-tertiary ml-2">({a.category})</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ArticleCTA />
        </article>
        <div className="max-w-2xl mx-auto mt-12">
          <Link to="/blog" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">← Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

// CTA at end of every article
const MAILTO = `mailto:contact@kmfjournal.com?subject=Beta%20Tester%20Application%20%E2%80%94%20K.M.F.%20Trading%20Journal`;

function ArticleCTA() {
  return (
    <div className="rounded-2xl p-7 mt-10 text-center" style={{ background: 'rgba(26,22,14,0.95)', border: '1px solid rgba(255,179,0,0.22)' }}>
      <p className="text-lg font-bold text-kmf-text-primary mb-2">Track These Metrics Automatically</p>
      <p className="text-sm text-kmf-text-secondary mb-5">
        K.M.F. Trading Journal calculates profit factor, R-multiple, expectancy and more — so you can focus on trading, not spreadsheets.
        <br />
        <strong style={{ color: '#FFB300' }}>Join the beta and get free lifetime Premium access.</strong>
      </p>
      <a href={MAILTO}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}>
        Apply for Beta Access →
      </a>
    </div>
  );
}

// Reusable content components — export these so articles can use them
export const Intro = ({ children }) => (
  <p className="text-lg text-kmf-text-secondary leading-relaxed mb-10" style={{ borderLeft: '3px solid rgba(79,195,247,0.35)', paddingLeft: '1.25rem' }}>{children}</p>
);
export const H2 = ({ children }) => (
  <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>{children}</h2>
);
export const H3 = ({ children }) => (
  <h3 className="text-lg font-bold text-kmf-text-primary mt-6 mb-3">{children}</h3>
);
export const P = ({ children }) => (
  <p className="text-kmf-text-secondary leading-relaxed mb-4">{children}</p>
);
export const Divider = () => (
  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '2.5rem 0' }} />
);
export const Ul = ({ items }) => (
  <ul className="space-y-2 mb-6">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-kmf-text-secondary text-sm leading-relaxed">
        <span style={{ color: '#4FC3F7', flexShrink: 0, marginTop: 2 }}>→</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
export const Callout = ({ title, children, color = '#4FC3F7' }) => (
  <div className="rounded-xl p-5 my-6" style={{ background: `${color}0D`, border: `1px solid ${color}22` }}>
    {title && <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>{title}</p>}
    <div className="text-sm text-kmf-text-secondary leading-relaxed">{children}</div>
  </div>
);
export const Takeaways = ({ items }) => (
  <div className="rounded-xl p-6 mt-10 mb-4" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.18)' }}>
    <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-3">Key Takeaways</p>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-kmf-text-secondary">
          <span style={{ color: '#4FC3F7', flexShrink: 0 }}>✓</span>{item}
        </li>
      ))}
    </ul>
  </div>
);
export const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-xl my-6" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
    <table className="w-full text-sm">
      <thead>
        <tr style={{ background: 'rgba(79,195,247,0.06)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {headers.map(h => <th key={h} className="px-4 py-3 text-left font-semibold text-kmf-text-primary">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {row.map((cell, j) => <td key={j} className="px-4 py-3 text-kmf-text-secondary">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
