import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const highlights = [
  {
    slug: 'profit-factor-vs-win-rate',
    title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?',
    excerpt: 'Most traders obsess over win rate, but profit factor is a far better predictor of long-term success.',
    category: 'Statistics',
    categoryColor: '#4FC3F7',
  },
  {
    slug: '1-percent-risk-rule',
    title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive',
    excerpt: 'Learn why professional traders never risk more than 1% per trade and how to calculate exact position sizes.',
    category: 'Risk Management',
    categoryColor: '#00C853',
  },
  {
    slug: 'revenge-trading',
    title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle',
    excerpt: 'Understand the psychology of loss aversion that drives revenge trading and learn how to stop it.',
    category: 'Psychology',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'pre-trade-checklist',
    title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry',
    excerpt: 'Pilots and surgeons use checklists. Traders should too. A 10-point checklist covering technical, risk, and psychology.',
    category: 'Discipline',
    categoryColor: '#FFB300',
  },
];

const BlogHighlights = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-label="Featured blog articles">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-kmf-accent/[0.015] to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-14 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-kmf-accent/10 text-kmf-accent rounded-full text-sm font-semibold border border-kmf-accent/25">
              ✦ {t('blogHighlights.badge')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
            <span className="gradient-text">{t('blogHighlights.heading1')}</span>{' '}
            <span className="text-kmf-text-primary">{t('blogHighlights.heading2')}</span>
          </h2>
          <p className="text-lg text-kmf-text-tertiary max-w-xl mx-auto leading-relaxed">
            {t('blogHighlights.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {highlights.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block rounded-2xl p-6 border transition-all duration-200 group animate-slideUp"
              style={{
                animationDelay: `${i * 80}ms`,
                animationFillMode: 'both',
                background: 'rgba(26,29,36,0.85)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,195,247,0.22)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mb-3"
                style={{ background: `${post.categoryColor}14`, color: post.categoryColor, border: `1px solid ${post.categoryColor}25` }}
              >
                {post.category}
              </span>
              <h3 className="text-base font-bold text-kmf-text-primary mb-2 group-hover:text-kmf-accent transition-colors" style={{ letterSpacing: '-0.01em' }}>
                {post.title}
              </h3>
              <p className="text-sm text-kmf-text-tertiary leading-relaxed">{post.excerpt}</p>
              <p className="text-xs text-kmf-accent mt-3 font-semibold">{t('blogHighlights.readArticle')}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{ background: 'rgba(79,195,247,0.08)', border: '1px solid rgba(79,195,247,0.20)', color: '#4FC3F7' }}
          >
            {t('blogHighlights.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
