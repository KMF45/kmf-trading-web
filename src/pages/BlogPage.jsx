import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

const posts = [
  {
    slug: 'best-free-trading-journal-app-android-2026',
    title: 'Best Free Trading Journal App for Android in 2026',
    excerpt: 'An honest comparison of K.M.F., TraderSync, Tradervue and Edgewonk — features, pricing, and which is actually best for forex, stock and crypto traders on mobile.',
    category: 'App Reviews',
    date: 'February 20, 2026',
    readTime: '6 min read',
    categoryColor: '#4FC3F7',
  },
];

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Blog | K.M.F. Trading Journal';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content',
      'Trading insights, app guides, and tips for serious traders. The K.M.F. Trading Journal blog.'
    );
    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <Link to="/" className="text-sm text-kmf-text-tertiary hover:text-kmf-accent transition-colors">
              ← Back to home
            </Link>
            <h1 className="text-4xl font-bold text-kmf-text-primary mt-6 mb-3" style={{ letterSpacing: '-0.02em' }}>
              Blog
            </h1>
            <p className="text-kmf-text-tertiary">
              Trading insights, app guides, and tips for serious traders.
            </p>
          </div>

          {/* Posts */}
          <div className="space-y-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block rounded-2xl p-6 border transition-all duration-200 group"
                style={{ background: 'rgba(26,29,36,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,195,247,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
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
