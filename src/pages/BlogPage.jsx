import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

const posts = [
  {
    slug: 'profit-factor-vs-win-rate',
    title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?',
    excerpt: 'Most traders obsess over win rate, but profit factor is a far better predictor of long-term success. See the math that reveals why a 70% win rate trader can be losing money while a 40% win rate trader thrives.',
    category: 'Statistics',
    date: 'February 20, 2026',
    readTime: '7 min read',
    categoryColor: '#4FC3F7',
  },
  {
    slug: '1-percent-risk-rule',
    title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive',
    excerpt: 'Learn why professional traders never risk more than 1% per trade, how to calculate exact position sizes using the rule, and how it protects your account during the losing streaks that are mathematically inevitable.',
    category: 'Risk Management',
    date: 'February 20, 2026',
    readTime: '6 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'revenge-trading',
    title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle',
    excerpt: 'Revenge trading is one of the fastest ways to blow a trading account. Understand the psychology of loss aversion and ego that drives it, and learn five practical techniques to stop the cycle before it starts.',
    category: 'Psychology',
    date: 'February 20, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'weekly-trading-review-template',
    title: 'How to Do a Weekly Trading Review (With a Complete Template)',
    excerpt: 'The difference between traders who improve and those who repeat the same mistakes is a systematic weekly review. A step-by-step guide across five areas, with a complete 15-question template you can use immediately.',
    category: 'Improvement',
    date: 'February 20, 2026',
    readTime: '8 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'r-multiple-explained',
    title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)',
    excerpt: 'Dollar P/L is one of the least informative metrics in trading. R-multiple — actual P/L divided by your initial risk — is the honest way to evaluate every trade. Learn how to calculate it and use it to find your real edge.',
    category: 'Statistics',
    date: 'February 20, 2026',
    readTime: '6 min read',
    categoryColor: '#4FC3F7',
  },
  {
    slug: 'why-traders-break-their-rules',
    title: 'Why You Break Your Own Trading Rules — And How to Stop',
    excerpt: 'You wrote the rules yourself. You know they work. So why do you keep breaking them? The science of System 1 vs System 2 thinking explains almost every instance of rule-breaking — and the solutions are practical, not motivational.',
    category: 'Psychology',
    date: 'February 20, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'how-to-recover-from-losing-streak',
    title: 'How to Recover from a Losing Streak Without Blowing Your Account',
    excerpt: 'Losing streaks are mathematically inevitable even in profitable strategies. A step-by-step recovery framework: how to assess whether it is variance or a broken edge, reduce size correctly, and return to full trading gradually.',
    category: 'Psychology',
    date: 'February 20, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: '10-questions-after-every-trade',
    title: '10 Questions Every Trader Should Ask After Every Trade',
    excerpt: 'Most traders check their P/L and move on. The traders who accelerate their development ask deeper questions after every trade. These 10 post-trade review questions separate process quality from random outcomes.',
    category: 'Improvement',
    date: 'February 20, 2026',
    readTime: '5 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'trading-expectancy-explained',
    title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works',
    excerpt: 'Expectancy is the one number that reveals whether your strategy is profitable long-term. Learn the formula, see it applied to different win rate and R:R combinations, and calculate your own expectancy from trade history.',
    category: 'Statistics',
    date: 'February 20, 2026',
    readTime: '6 min read',
    categoryColor: '#4FC3F7',
  },
  {
    slug: 'how-to-set-stop-loss',
    title: 'How to Set a Stop Loss Properly (Not Just Randomly)',
    excerpt: 'Most traders place stop losses based on arbitrary pip counts or dollar amounts. Learn the three professional methods — structure-based, ATR-based, and candle-based — that place stops where the market actually invalidates your trade.',
    category: 'Risk Management',
    date: 'February 20, 2026',
    readTime: '7 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'position-sizing-guide',
    title: 'Position Sizing Guide: How Much Should You Trade?',
    excerpt: 'Two traders, identical strategies, one blows up and one grows consistently. The difference is almost always position sizing. The exact formula for forex, stocks, and crypto — with worked examples for each market.',
    category: 'Risk Management',
    date: 'February 20, 2026',
    readTime: '7 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'pre-trade-checklist',
    title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry',
    excerpt: 'Pilots and surgeons use checklists before every consequential action. Traders should too. A 10-point pre-trade checklist covering technical, risk, and psychological criteria — and why the discipline of skipping trades matters as much as taking them.',
    category: 'Discipline',
    date: 'February 20, 2026',
    readTime: '6 min read',
    categoryColor: '#FFB300',
  },
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
