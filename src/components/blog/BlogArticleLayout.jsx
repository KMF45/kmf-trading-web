import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../landing/Navbar';
import Footer from '../Footer';
import { FaXTwitter, FaRedditAlien, FaWhatsapp, FaLinkedinIn, FaLink, FaCheck } from 'react-icons/fa6';
import { FaGooglePlay } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import blogTranslations from '../../i18n/blogTranslations';
import BlogCoverArt from './BlogCoverArt';

const SITE = 'https://kmfjournal.com';
const DEFAULTS = {
  title: 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy',
  description: 'K.M.F. Trading Journal is a professional trading journal app for forex, stocks & crypto traders.',
  ogTitle: 'K.M.F. Trading Journal – Professional Trade Tracking & Analysis',
  ogDescription: 'Track your trades, analyze performance with advanced statistics, manage risk with a lot calculator, and improve your trading discipline. Free for Android.',
  ogImage: `${SITE}/logo.png`,
  ogUrl: `${SITE}/`,
  twitterTitle: 'K.M.F. Trading Journal – Keep Moving Forward',
  twitterDescription: 'Professional trading journal for forex, stocks & crypto. Track, analyze and improve your trading performance.',
};

function setMeta(name, content, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

export default function BlogArticleLayout({ title, metaTitle, metaDescription, slug, lang = 'en', date, dateISO, dateModified, readTime, category, categoryColor = '#4FC3F7', relatedArticles = [], faqItems = [], howToSteps = [], children }) {
  const langPath = lang !== 'en' ? `${lang}/` : '';
  const pageUrl = `${SITE}/blog/${langPath}${slug}`;
  const ogImage = `${SITE}/blog/og/${lang !== 'en' ? `${lang}-` : ''}${slug}.png`;

  useEffect(() => {
    const pageTitle = metaTitle || `${title} | K.M.F. Trading Journal`;

    // Title + description
    document.title = pageTitle;
    setMeta('description', metaDescription || DEFAULTS.description);

    // html lang
    document.documentElement.lang = lang;

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', pageUrl);

    // hreflang tags
    const articleTranslations = blogTranslations[slug];
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
    setMeta('og:url', pageUrl, 'property');
    setMeta('og:title', pageTitle, 'property');
    setMeta('og:description', metaDescription || DEFAULTS.ogDescription, 'property');
    setMeta('og:image', ogImage, 'property');

    // Twitter
    setMeta('twitter:url', pageUrl, 'name');
    setMeta('twitter:title', pageTitle, 'name');
    setMeta('twitter:description', metaDescription || DEFAULTS.twitterDescription, 'name');
    setMeta('twitter:image', ogImage, 'name');

    // JSON-LD helper: only create if not already present (avoids duplicates after prerender)
    const addLd = (id, data) => {
      if (document.getElementById(id)) return;
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
    };

    // JSON-LD: Article
    addLd('ld-article', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: metaDescription,
      datePublished: dateISO,
      dateModified: dateModified || dateISO,
      author: { '@type': 'Organization', name: 'K.M.F. Dev Team', url: `${SITE}/about` },
      publisher: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
      image: ogImage,
      url: pageUrl,
    });

    // JSON-LD: BreadcrumbList
    addLd('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
      ],
    });

    // JSON-LD: FAQPage (for rich snippets in Google)
    if (faqItems.length > 0) {
      addLd('ld-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      });
    }

    // JSON-LD: HowTo (for step-by-step rich results)
    if (howToSteps.length > 0) {
      addLd('ld-howto', {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        description: metaDescription,
        step: howToSteps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      });
    }

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
      document.getElementById('ld-faq')?.remove();
      document.getElementById('ld-howto')?.remove();
      // Remove hreflang
      document.querySelectorAll('[id^="hreflang-"]').forEach(el => el.remove());
      // Restore lang
      document.documentElement.lang = 'en';
    };
  }, [title, metaTitle, metaDescription, slug, dateISO, dateModified, faqItems, howToSteps, lang]);

  return (
    <>
      <ReadingProgressBar />
      <Navbar />
      <StickyPlayBanner />

      {/* Full-width Hero with cover art (matches design article.html) */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(280px, 45vw, 460px)', marginTop: 64 }}
      >
        <div className="absolute inset-0">
          <BlogCoverArt category={category} />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,17,21,0.15) 0%, rgba(15,17,21,0.55) 60%, #0F1115 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ paddingBottom: 36 }}
        >
          <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: 1200 }}>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{
                  background: `${categoryColor}24`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}40`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                {category}
              </span>
              <span className="text-xs text-kmf-text-tertiary">{date}</span>
              <span className="text-xs text-kmf-text-tertiary">·</span>
              <span className="text-xs text-kmf-text-tertiary">{readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="bg-kmf-bg min-h-screen pb-20 px-4 sm:px-6" style={{ paddingTop: 32 }}>
        <div className="mx-auto xl:flex xl:justify-center xl:gap-8" style={{ maxWidth: 1200 }}>
        <div className="w-full max-w-4xl mx-auto xl:mx-0 xl:min-w-0">
        <article itemScope itemType="https://schema.org/Article">
          <nav className="mb-8 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">{title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${categoryColor}18`, color: categoryColor, border: `1px solid ${categoryColor}28` }}>{category}</span>
            <LanguageSwitcher slug={slug} currentLang={lang} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-kmf-text-primary mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }} itemProp="headline">{title}</h1>
          <div className="flex items-start sm:items-center justify-between flex-wrap gap-4 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Organization">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(79,195,247,0.28), rgba(0,200,83,0.2))', border: '1px solid rgba(79,195,247,0.35)' }} aria-hidden="true">
                <span className="text-[10px] font-extrabold tracking-tight" style={{ color: '#E6F8FF' }}>KMF</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-kmf-text-primary leading-tight">
                  <Link to="/about" className="hover:text-kmf-accent transition-colors" itemProp="name">K.M.F. Dev Team</Link>
                </p>
                <p className="text-xs text-kmf-text-tertiary mt-0.5">
                  <time dateTime={dateISO}>{date}</time> · {readTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-kmf-text-tertiary uppercase tracking-wider">Share:</span>
              <ShareButtons title={title} url={pageUrl} compact />
            </div>
          </div>
          <meta itemProp="image" content={ogImage} />
          {children}
          <div className="rounded-xl p-5 mt-10 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-kmf-text-secondary">Found this useful? Share it with a fellow trader.</p>
              <ShareButtons title={title} url={pageUrl} />
            </div>
          </div>

          {/* Author box (matches design .author-box) */}
          <div
            className="rounded-2xl p-6 mt-10 mb-4 flex gap-4 items-start"
            style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                width: 60,
                height: 60,
                background: 'linear-gradient(135deg, #4FC3F7, #26C6DA)',
                color: '#0F1115',
                fontSize: 22,
                fontWeight: 800,
                filter: 'drop-shadow(0 0 10px rgba(79,195,247,0.3))',
              }}
              aria-hidden="true"
            >
              K
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-kmf-text-primary leading-tight">
                <Link to="/about" className="hover:text-kmf-accent transition-colors">K.M.F. Dev Team</Link>
              </p>
              <p
                className="mt-1 mb-2"
                style={{ color: '#4FC3F7', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Trading Education
              </p>
              <p className="text-[13px] text-kmf-text-secondary leading-relaxed">
                The K.M.F. team builds tools and writes content for serious traders — focused on evidence-based psychology, risk management, and performance analysis.
              </p>
            </div>
          </div>
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
        <div className="mt-12">
          <Link to="/blog" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">← Back to Blog</Link>
        </div>
        </div>
        <aside className="hidden xl:block xl:w-[240px] xl:flex-shrink-0" aria-label="Article navigation">
          <div className="sticky" style={{ top: 112 }}>
            <TableOfContents />
          </div>
        </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Share buttons
function ShareButtons({ title, url, compact }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const buttons = [
    { label: 'Share on X', icon: FaXTwitter, href: `https://x.com/intent/tweet?text=${text}&url=${encodedUrl}`, color: '#A0A0A0' },
    { label: 'Share on Reddit', icon: FaRedditAlien, href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${text}`, color: '#FF5700' },
    { label: 'Share on WhatsApp', icon: FaWhatsapp, href: `https://wa.me/?text=${text}%20${encodedUrl}`, color: '#25D366' },
    { label: 'Share on LinkedIn', icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, color: '#0A66C2' },
  ];

  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'flex-wrap'}`}>
      {!compact && <span className="text-xs font-semibold text-kmf-text-tertiary uppercase tracking-wider mr-1">Share</span>}
      {buttons.map((b) => {
        const Icon = b.icon;
        return (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={b.label}
            className="flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
            style={{
              width: compact ? 32 : 36,
              height: compact ? 32 : 36,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#C7D3DD',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = b.color; e.currentTarget.style.borderColor = `${b.color}55`; e.currentTarget.style.background = `${b.color}12`; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#C7D3DD'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            <Icon style={{ fontSize: compact ? 13 : 15 }} />
          </a>
        );
      })}
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className="flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
        style={{
          width: compact ? 32 : 36,
          height: compact ? 32 : 36,
          background: copied ? 'rgba(0,200,83,0.15)' : 'rgba(255,255,255,0.08)',
          border: `1px solid ${copied ? 'rgba(0,200,83,0.35)' : 'rgba(255,255,255,0.14)'}`,
          color: copied ? '#00C853' : '#C7D3DD',
        }}
      >
        {copied ? <FaCheck style={{ fontSize: compact ? 12 : 14 }} /> : <FaLink style={{ fontSize: compact ? 12 : 14 }} />}
      </button>
    </div>
  );
}

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kmf.tradingjournal';

// CTA at end of every article
function ArticleCTA() {
  return (
    <div className="rounded-2xl p-7 mt-10 text-center" style={{ background: 'rgba(26,22,14,0.95)', border: '1px solid rgba(255,179,0,0.22)' }}>
      <p className="text-lg font-bold text-kmf-text-primary mb-2">Track These Metrics Automatically</p>
      <p className="text-sm text-kmf-text-secondary mb-5">
        K.M.F. Trading Journal calculates profit factor, R-multiple, expectancy and more — so you can focus on trading, not spreadsheets.
        <br />
        <strong style={{ color: '#FFB300' }}>Download free with a 7-day Premium trial.</strong>
      </p>
      <a href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.gtag?.('event', 'play_store_click', { source: 'blog_cta' })}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #FFB300, #FF8F00)', color: '#1A1200', boxShadow: '0 4px 20px rgba(255,179,0,0.25)' }}>
        <FaGooglePlay /> Download on Google Play
      </a>
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <Link to="/#features" className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors">See All Features</Link>
        <span className="text-kmf-text-tertiary/40">|</span>
        <Link to="/#pricing" className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors">View Pricing</Link>
        <span className="text-kmf-text-tertiary/40">|</span>
        <Link to="/blog" className="text-kmf-text-tertiary hover:text-kmf-accent transition-colors">More Articles</Link>
      </div>
    </div>
  );
}

// Thin gradient progress bar fixed at the very top of the viewport
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) { setProgress(0); return; }
      const scrolled = (window.scrollY / height) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      style={{ height: 3 }}
      aria-hidden="true"
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #4FC3F7, #00C853)',
          boxShadow: progress > 0 ? '0 0 10px rgba(79,195,247,0.55)' : 'none',
          transition: 'width 80ms linear',
        }}
      />
    </div>
  );
}

// Auto-generated Table of Contents. Scans article H2s on mount, assigns slug IDs,
// runs an IntersectionObserver-based scroll spy. Hidden when there are fewer than 2 headings.
function TableOfContents() {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const slugify = (text) =>
      text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60);

    // Defer one tick so article children are mounted + slugs from first pass don't collide
    const raf = requestAnimationFrame(() => {
      const used = new Set();
      const headings = Array.from(document.querySelectorAll('main article h2'));
      if (headings.length < 2) return;

      const toc = headings.map((h) => {
        let base = slugify(h.textContent || 'section');
        let id = base || 'section';
        let i = 2;
        while (used.has(id) || (document.getElementById(id) && document.getElementById(id) !== h)) {
          id = `${base}-${i++}`;
        }
        used.add(id);
        h.id = id;
        // Offset for sticky navbar when using hash scroll
        h.style.scrollMarginTop = '96px';
        return { id, text: h.textContent || '' };
      });
      setItems(toc);

      // Scroll spy — heading is active while in upper portion of viewport
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveId(e.target.id);
          });
        },
        { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
      );
      headings.forEach((h) => spy.observe(h));

      // Cleanup handled in outer effect return via window reference
      window.__tocSpy = spy;
    });

    return () => {
      cancelAnimationFrame(raf);
      window.__tocSpy?.disconnect();
      delete window.__tocSpy;
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (items.length < 2) return null;

  const activeIdx = items.findIndex((it) => it.id === activeId);

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(26,29,36,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
      }}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#6B7D87', letterSpacing: '0.1em' }}>
        On this page
      </p>
      <ul className="flex flex-col gap-px">
        {items.map((item, idx) => {
          const active = activeId === item.id;
          const done = activeIdx >= 0 && idx < activeIdx;
          const accent = active || done ? '#4FC3F7' : 'rgba(184,202,212,0.55)';
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="flex items-center gap-2 transition-all rounded-lg"
                style={{
                  fontSize: 12,
                  lineHeight: 1.4,
                  color: active ? '#4FC3F7' : done ? 'rgba(143,179,197,0.65)' : 'rgba(143,179,197,0.85)',
                  fontWeight: active ? 600 : 400,
                  borderLeft: `2px solid ${active ? '#4FC3F7' : 'transparent'}`,
                  background: active ? 'rgba(79,195,247,0.06)' : 'transparent',
                  padding: '7px 10px',
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = '#4FC3F7'; e.currentTarget.style.background = 'rgba(79,195,247,0.06)'; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = done ? 'rgba(143,179,197,0.65)' : 'rgba(143,179,197,0.85)'; e.currentTarget.style.background = 'transparent'; } }}
              >
                <span className="flex-1">{item.text}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0, marginLeft: 'auto' }}>
                  <circle cx="6" cy="6" r="5" fill="none" stroke="rgba(79,195,247,0.2)" strokeWidth="2" />
                  <circle
                    cx="6" cy="6" r="5"
                    fill="none"
                    stroke={accent}
                    strokeWidth="2"
                    strokeDasharray={Math.PI * 10}
                    strokeDashoffset={done ? 0 : Math.PI * 10}
                    strokeLinecap="round"
                    transform="rotate(-90 6 6)"
                    style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                  />
                </svg>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Sticky CTA bar — appears after scrolling past 40% of article
function StickyPlayBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.25 && scrolled < 0.92);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="max-w-xl mx-auto px-4 pb-4">
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.gtag?.('event', 'play_store_click', { source: 'blog_sticky' })}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
            color: '#1A1200',
            boxShadow: '0 4px 24px rgba(255,179,0,0.35), 0 -2px 12px rgba(0,0,0,0.3)',
          }}
        >
          <FaGooglePlay />
          Download K.M.F. Trading Journal — Free
        </a>
      </div>
    </div>
  );
}

// Reusable content components — export these so articles can use them
export const Intro = ({ children }) => (
  <p className="text-lg text-kmf-text-secondary leading-relaxed mb-10" style={{ borderLeft: '3px solid rgba(79,195,247,0.35)', paddingLeft: '1.25rem' }}>{children}</p>
);
export const H2 = ({ children }) => (
  <h2
    className="text-2xl font-bold text-kmf-text-primary mt-12 mb-4"
    style={{
      letterSpacing: '-0.01em',
      paddingBottom: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    {children}
  </h2>
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
  <div
    className="rounded-xl p-5 my-6 relative overflow-hidden"
    style={{
      background: `${color}0D`,
      border: `1px solid ${color}22`,
      borderLeft: `3px solid ${color}`,
    }}
  >
    {title && <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>{title}</p>}
    <div className="text-sm text-kmf-text-secondary leading-relaxed">{children}</div>
  </div>
);

function useInView(ref, { once = true, rootMargin = '0px 0px -60px 0px' } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { rootMargin, threshold: 0.1 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, once, rootMargin]);
  return inView;
}

export const Takeaways = ({ items, title = 'Key Takeaways' }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className="rounded-2xl p-6 mt-10 mb-4"
      style={{ background: 'rgba(79,195,247,0.05)', border: '1px solid rgba(79,195,247,0.18)' }}
    >
      <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-4">{title}</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm text-kmf-text-secondary leading-relaxed"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-10px)',
              transition: `opacity 0.45s ease ${i * 90}ms, transform 0.45s ease ${i * 90}ms`,
            }}
          >
            <span style={{ color: '#4FC3F7', flexShrink: 0, marginTop: 2 }}>
              <FaCheck style={{ fontSize: 12 }} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Colored cells: accept plain strings, or { value, color: 'green'|'red'|'cyan'|'gold' }
const TD_COLORS = { green: '#00C853', red: '#FF5252', cyan: '#4FC3F7', gold: '#FFB300' };
export const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-xl my-6" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
    <table className="w-full text-sm">
      <thead>
        <tr style={{ background: 'rgba(79,195,247,0.07)' }}>
          {headers.map(h => (
            <th
              key={h}
              className="px-4 py-3 text-left"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#4FC3F7',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="transition-colors"
            style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(79,195,247,0.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {row.map((cell, j) => {
              const isObj = cell && typeof cell === 'object' && 'value' in cell;
              const val = isObj ? cell.value : cell;
              const col = isObj && cell.color ? TD_COLORS[cell.color] : null;
              return (
                <td
                  key={j}
                  className="px-4 py-3"
                  style={{
                    color: col || '#B8CAD4',
                    fontWeight: col ? 600 : 400,
                  }}
                >
                  {val}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Animated stats strip — 3+ stat boxes with count-up on viewport enter.
// items: [{ value: number, decimals?: 0, suffix?: '%', prefix?: '$', label: string }]
export const StatsStrip = ({ items }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const cols = items.length;
  return (
    <div
      ref={ref}
      className="grid gap-3 my-8"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {items.map((item, i) => (
        <StatBox key={i} item={item} active={inView} delay={i * 120} />
      ))}
    </div>
  );
};

function StatBox({ item, active, delay }) {
  const { value, decimals = 0, suffix = '', prefix = '', label } = item;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1200;
    const from = 0;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start - delay) / duration);
      if (t < 0) { raf = requestAnimationFrame(tick); return; }
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (value - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, delay]);

  return (
    <div
      className="rounded-2xl p-5 text-center transition-colors"
      style={{
        background: 'rgba(26,29,36,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(79,195,247,0.25)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          background: 'linear-gradient(90deg, #4FC3F7, #03A9F4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {prefix}{display.toFixed(decimals)}{suffix}
      </div>
      <div style={{ fontSize: 11, color: '#8FB3C5', marginTop: 6, lineHeight: 1.45 }}>
        {label}
      </div>
    </div>
  );
}
