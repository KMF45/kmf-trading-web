import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';
import { posts } from './BlogPage';

const CATEGORIES = {
  'psychology': { label: 'Psychology', color: '#CE93D8', desc: 'Master the mental game of trading. Articles on tilt, revenge trading, confidence, discipline, and the psychological patterns that separate winners from blowups.' },
  'risk-management': { label: 'Risk Management', color: '#00C853', desc: 'Protect your capital first, grow it second. Position sizing, stop loss placement, drawdown rules, and the math that keeps professional traders alive.' },
  'statistics': { label: 'Statistics', color: '#4FC3F7', desc: 'Measure what matters. Profit factor, expectancy, R-multiple, win rate — the metrics that reveal whether your strategy actually works.' },
  'improvement': { label: 'Improvement', color: '#FFB300', desc: 'Get better every week. Trade reviews, journaling workflows, AI-assisted analysis, and the habits that compound into consistent profitability.' },
  'discipline': { label: 'Discipline', color: '#FFB300', desc: 'Build the systems that keep you on track. Pre-trade checklists, overtrading prevention, and rule-following frameworks for serious traders.' },
  'app-reviews': { label: 'App Reviews', color: '#4FC3F7', desc: 'Honest comparisons and in-depth reviews of trading journal apps. Features, pricing, and which tools actually help traders improve.' },
};

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

export default function BlogCategoryPage() {
  const { category } = useParams();
  const cat = CATEGORIES[category];

  if (!cat) return <Navigate to="/blog" replace />;

  const filtered = posts.filter(p => slugifyCategory(p.category) === category);

  useEffect(() => {
    const pageTitle = `${cat.label} Articles | K.M.F. Trading Journal Blog`;
    const pageUrl = `https://kmfjournal.com/blog/category/${category}`;
    document.title = pageTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', cat.desc);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', pageUrl);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', pageUrl);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      if (canonical) canonical.setAttribute('href', 'https://kmfjournal.com/');
      if (ogUrl) ogUrl.setAttribute('content', 'https://kmfjournal.com/');
    };
  }, [category, cat]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">{cat.label}</span>
          </nav>

          <div className="mb-10">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: `${cat.color}14`, color: cat.color, border: `1px solid ${cat.color}25` }}>
              {filtered.length} articles
            </span>
            <h1 className="text-4xl font-bold text-kmf-text-primary mb-3" style={{ letterSpacing: '-0.02em' }}>
              {cat.label}
            </h1>
            <p className="text-kmf-text-tertiary max-w-2xl">{cat.desc}</p>
          </div>

          {/* Category nav */}
          <div className="flex flex-wrap gap-2 mb-10 text-xs">
            {Object.entries(CATEGORIES).map(([slug, c]) => (
              <Link key={slug} to={`/blog/category/${slug}`}
                className="px-3 py-1.5 rounded-full transition-colors"
                style={slug === category
                  ? { background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.08)' }
                }>
                {c.label}
              </Link>
            ))}
            <Link to="/blog" className="px-3 py-1.5 rounded-full transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#8899A6', border: '1px solid rgba(255,255,255,0.08)' }}>
              All Articles
            </Link>
          </div>

          <div className="space-y-5">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}
                className="block rounded-2xl p-6 border transition-all duration-200 group"
                style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,195,247,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: `${post.categoryColor}14`, color: post.categoryColor, border: `1px solid ${post.categoryColor}25` }}>
                    {post.category}
                  </span>
                  <span className="text-xs text-kmf-text-tertiary">{post.date}</span>
                  <span className="text-xs text-kmf-text-tertiary">· {post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-kmf-text-primary mb-2 group-hover:text-kmf-accent transition-colors"
                  style={{ letterSpacing: '-0.01em' }}>
                  {post.title}
                </h2>
                <p className="text-sm text-kmf-text-tertiary leading-relaxed">{post.excerpt}</p>
                <p className="text-xs text-kmf-accent mt-4 font-semibold">Read article →</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
