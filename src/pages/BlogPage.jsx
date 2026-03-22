import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/Footer';

export const posts = [
  {
    slug: 'profit-factor-vs-win-rate',
    title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?',
    excerpt: 'Most traders obsess over win rate, but profit factor is a far better predictor of long-term success. See the math that reveals why a 70% win rate trader can be losing money while a 40% win rate trader thrives.',
    category: 'Statistics',
    date: 'January 6, 2026',
    readTime: '7 min read',
    categoryColor: '#4FC3F7',
  },
  {
    slug: '1-percent-risk-rule',
    title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive',
    excerpt: 'Learn why professional traders never risk more than 1% per trade, how to calculate exact position sizes using the rule, and how it protects your account during the losing streaks that are mathematically inevitable.',
    category: 'Risk Management',
    date: 'January 9, 2026',
    readTime: '6 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'revenge-trading',
    title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle',
    excerpt: 'Revenge trading is one of the fastest ways to blow a trading account. Understand the psychology of loss aversion and ego that drives it, and learn five practical techniques to stop the cycle before it starts.',
    category: 'Psychology',
    date: 'January 13, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'weekly-trading-review-template',
    title: 'How to Do a Weekly Trading Review (With a Complete Template)',
    excerpt: 'The difference between traders who improve and those who repeat the same mistakes is a systematic weekly review. A step-by-step guide across five areas, with a complete 15-question template you can use immediately.',
    category: 'Improvement',
    date: 'January 16, 2026',
    readTime: '8 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'r-multiple-explained',
    title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)',
    excerpt: 'Dollar P/L is one of the least informative metrics in trading. R-multiple — actual P/L divided by your initial risk — is the honest way to evaluate every trade. Learn how to calculate it and use it to find your real edge.',
    category: 'Statistics',
    date: 'January 20, 2026',
    readTime: '6 min read',
    categoryColor: '#4FC3F7',
  },
  {
    slug: 'why-traders-break-their-rules',
    title: 'Why You Break Your Own Trading Rules — And How to Stop',
    excerpt: 'You wrote the rules yourself. You know they work. So why do you keep breaking them? The science of System 1 vs System 2 thinking explains almost every instance of rule-breaking — and the solutions are practical, not motivational.',
    category: 'Psychology',
    date: 'January 23, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'how-to-recover-from-losing-streak',
    title: 'How to Recover from a Losing Streak Without Blowing Your Account',
    excerpt: 'Losing streaks are mathematically inevitable even in profitable strategies. A step-by-step recovery framework: how to assess whether it is variance or a broken edge, reduce size correctly, and return to full trading gradually.',
    category: 'Psychology',
    date: 'January 27, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: '10-questions-after-every-trade',
    title: '10 Questions Every Trader Should Ask After Every Trade',
    excerpt: 'Most traders check their P/L and move on. The traders who accelerate their development ask deeper questions after every trade. These 10 post-trade review questions separate process quality from random outcomes.',
    category: 'Improvement',
    date: 'January 30, 2026',
    readTime: '5 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'trading-expectancy-explained',
    title: 'Trading Expectancy Explained: The Formula That Tells If Your Strategy Works',
    excerpt: 'Expectancy is the one number that reveals whether your strategy is profitable long-term. Learn the formula, see it applied to different win rate and R:R combinations, and calculate your own expectancy from trade history.',
    category: 'Statistics',
    date: 'February 3, 2026',
    readTime: '6 min read',
    categoryColor: '#4FC3F7',
  },
  {
    slug: 'how-to-set-stop-loss',
    title: 'How to Set a Stop Loss Properly (Not Just Randomly)',
    excerpt: 'Most traders place stop losses based on arbitrary pip counts or dollar amounts. Learn the three professional methods — structure-based, ATR-based, and candle-based — that place stops where the market actually invalidates your trade.',
    category: 'Risk Management',
    date: 'February 6, 2026',
    readTime: '7 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'position-sizing-guide',
    title: 'Position Sizing Guide: How Much Should You Trade?',
    excerpt: 'Two traders, identical strategies, one blows up and one grows consistently. The difference is almost always position sizing. The exact formula for forex, stocks, and crypto — with worked examples for each market.',
    category: 'Risk Management',
    date: 'February 10, 2026',
    readTime: '7 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'pre-trade-checklist',
    title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry',
    excerpt: 'Pilots and surgeons use checklists before every consequential action. Traders should too. A 10-point pre-trade checklist covering technical, risk, and psychological criteria — and why the discipline of skipping trades matters as much as taking them.',
    category: 'Discipline',
    date: 'February 14, 2026',
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
  {
    slug: 'execution-gap-backtest-vs-live-trading',
    title: 'The Execution Gap: Why Your Strategy Works in Backtesting But Fails Live',
    excerpt: 'Your backtested strategy has a 70% win rate. Live, you\'re at 40%. The problem isn\'t the strategy — it\'s the gap between knowing and doing. Here\'s how to close it.',
    category: 'Psychology',
    date: 'February 22, 2026',
    readTime: '8 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'prop-firm-trading-journal',
    title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account',
    excerpt: 'Most prop firm failures aren\'t bad trades — they\'re broken rules. Learn how a trading journal with risk calculator and checklists prevents daily drawdown breaches and keeps your funded account alive.',
    category: 'Risk Management',
    date: 'February 23, 2026',
    readTime: '9 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'good-loss-vs-bad-win',
    title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst',
    excerpt: 'A disciplined stop loss can be your best trade of the week. A lucky take profit with no plan can be your worst. Learn how to evaluate trade quality beyond P/L.',
    category: 'Improvement',
    date: 'February 24, 2026',
    readTime: '7 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'ghost-trades-journaling-missed-opportunities',
    title: 'Ghost Trades: Why the Trades You Don\'t Take Are Costing You More Than the Ones You Lose',
    excerpt: 'The trades you skip out of fear or hesitation often outperform the ones you take. Learn how to journal missed opportunities and turn ghost trades into your biggest edge.',
    category: 'Psychology',
    date: 'February 25, 2026',
    readTime: '8 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'crypto-vs-forex-journaling',
    title: 'Crypto vs Forex: Why Your Trading Journal Needs Different Rules for Each Market',
    excerpt: 'Forex and crypto look similar on a chart but behave completely differently. Your journal, position sizing, and risk rules need to adapt — or you\'ll blow an account learning why.',
    category: 'Risk Management',
    date: 'February 26, 2026',
    readTime: '8 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'tradingview-kmf-workflow',
    title: 'TradingView + K.M.F. Journal: The Perfect Workflow for a Modern Trader',
    excerpt: 'Analyze on TradingView, execute on your broker, journal in K.M.F. — the step-by-step workflow that turns random trades into a compounding feedback loop.',
    category: 'Improvement',
    date: 'March 14, 2026',
    readTime: '7 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'excel-vs-trading-journal-app',
    title: 'Why Excel Is Slowly Killing Your Trading Performance',
    excerpt: 'Your spreadsheet has errors you don\'t know about, columns you stopped filling in, and formulas that break every time you add a row. Here\'s why a dedicated journal app wins.',
    category: 'Improvement',
    date: 'March 14, 2026',
    readTime: '7 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'strategy-is-not-enough',
    title: 'The Perfect Strategy Myth: Why the Same Setup Makes One Trader Rich and Another Broke',
    excerpt: 'Two traders, same strategy, opposite results. Strategy is only 20% of the game — the other 80% is psychology, habits, and the ability to execute under pressure. Here\'s what actually makes traders profitable.',
    category: 'Psychology',
    date: 'March 14, 2026',
    readTime: '9 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'prop-firm-daily-drawdown-guide',
    title: 'How to Never Break the Daily Drawdown Rule Again: A Prop Firm Survival Guide',
    excerpt: 'The daily drawdown rule kills more funded accounts than bad strategies. A 5-rule system with checklists and journaling that makes violations nearly impossible.',
    category: 'Risk Management',
    date: 'March 14, 2026',
    readTime: '9 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'why-traders-fail-at-journaling',
    title: 'Why 90% of Traders Fail at Journaling (And How to Be in the 10%)',
    excerpt: 'Most traders know journaling works but quit within weeks. The 5 psychological barriers that kill the habit — and practical solutions that make journaling take 60 seconds, not 15 minutes.',
    category: 'Psychology',
    date: 'March 15, 2026',
    readTime: '8 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'overtrading-checklist',
    title: 'Overtrading Checklist: 8 Signs You\'re Tilting Without Realizing It',
    excerpt: 'Tilt doesn\'t announce itself. It creeps in through skipped checklists, smaller timeframes, and "just one more trade." Here are 8 concrete warning signs and what to do when you spot them.',
    category: 'Discipline',
    date: 'March 15, 2026',
    readTime: '7 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'tilt-recovery-protocol',
    title: 'Tilt Recovery Protocol: What Top Traders Do in the First 60 Minutes After a Big Loss',
    excerpt: 'The 60 minutes after a big loss are the most dangerous in your trading day. A step-by-step protocol: close the platform, name the emotion, review objectively, and decide whether to continue.',
    category: 'Psychology',
    date: 'March 15, 2026',
    readTime: '8 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'worst-trading-excuses',
    title: 'The 7 Worst Excuses Traders Tell Themselves (And How Your Journal Exposes Them)',
    excerpt: '"The market was manipulated." "I was right, just wrong on timing." Every losing trader has a favorite excuse. Here\'s why they\'re all nonsense — and what the data actually shows.',
    category: 'Psychology',
    date: 'March 15, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'ai-trade-review',
    title: 'How to Use AI for Trade Review (Without Losing Control of Your Process)',
    excerpt: 'ChatGPT and Claude can find patterns in your trading data that you never could alone. Practical prompts, workflows, and the line between AI-augmented analysis and AI dependency.',
    category: 'Improvement',
    date: 'March 15, 2026',
    readTime: '8 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'monday-effect-trading',
    title: 'The Monday Effect: Why Monday Is the Worst Day to Trade Aggressively',
    excerpt: 'Lower volume, wider spreads, weekend FOMO, and pressure to start strong — Monday combines the worst market conditions with the worst psychological state. Here\'s what to do instead.',
    category: 'Psychology',
    date: 'March 15, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'confidence-vs-overconfidence',
    title: 'Confidence vs Overconfidence: The Invisible Line That Separates Winners from Blowups',
    excerpt: 'Confidence built on data makes you profitable. Overconfidence built on win streaks blows your account. The Dunning-Kruger effect in trading and how to track where you stand.',
    category: 'Psychology',
    date: 'March 15, 2026',
    readTime: '7 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'weekend-gap-risk',
    title: 'Weekend Gap Risk: How to Protect Your Account From Monday\'s Opening Surprise',
    excerpt: 'Your stop loss cannot save you from a weekend gap. Learn why gaps happen, which instruments gap most, and the Friday exit rules that prevent Monday morning disasters.',
    category: 'Risk Management',
    date: 'March 15, 2026',
    readTime: '7 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'what-is-kmf-trading-journal',
    title: 'What Is K.M.F. Trading Journal? The App Built by Traders Who Got Tired of Spreadsheets',
    excerpt: 'A complete guide to K.M.F. — what it is, what it contains, how it helps you grow as a trader, and an honest breakdown of free vs premium. Built by traders, for traders.',
    category: 'App Reviews',
    date: 'March 15, 2026',
    readTime: '10 min read',
    categoryColor: '#4FC3F7',
  },
  {
    slug: 'scaling-in-vs-scaling-out',
    title: 'Scaling In vs Scaling Out: Which Method Destroys Fewer Accounts?',
    excerpt: 'Adding to positions and taking partial profits both change your risk in ways most traders don\'t understand. The math of cumulative risk, the averaging down trap, and when each method actually works.',
    category: 'Risk Management',
    date: 'March 15, 2026',
    readTime: '8 min read',
    categoryColor: '#00C853',
  },
];

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Blog | K.M.F. Trading Journal';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content',
      'Trading insights, app guides, and tips for serious traders. The K.M.F. Trading Journal blog.'
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://kmfjournal.com/blog');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', 'https://kmfjournal.com/blog');

    // JSON-LD helper: skip if already present (avoids duplicates after prerender)
    const addLd = (id, data) => {
      if (document.getElementById(id)) return;
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
    };

    addLd('ld-collection', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'K.M.F. Trading Journal Blog',
      description: 'Trading insights, app guides, and tips for serious traders.',
      url: 'https://kmfjournal.com/blog',
      publisher: { '@type': 'Organization', name: 'K.M.F. Trading Journal', url: 'https://kmfjournal.com', logo: { '@type': 'ImageObject', url: 'https://kmfjournal.com/logo.png' } },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://kmfjournal.com/blog/${p.slug}`,
          name: p.title,
        })),
      },
    });

    addLd('ld-blog-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kmfjournal.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://kmfjournal.com/blog' },
      ],
    });

    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      if (canonical) canonical.setAttribute('href', 'https://kmfjournal.com/');
      if (ogUrl) ogUrl.setAttribute('content', 'https://kmfjournal.com/');
      document.getElementById('ld-collection')?.remove();
      document.getElementById('ld-blog-breadcrumb')?.remove();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

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

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6 text-xs">
            <Link to="/blog/category/psychology" className="px-3 py-1.5 rounded-full transition-colors" style={{ background: 'rgba(206,147,216,0.08)', color: '#CE93D8', border: '1px solid rgba(206,147,216,0.15)' }}>Psychology</Link>
            <Link to="/blog/category/risk-management" className="px-3 py-1.5 rounded-full transition-colors" style={{ background: 'rgba(0,200,83,0.08)', color: '#00C853', border: '1px solid rgba(0,200,83,0.15)' }}>Risk Management</Link>
            <Link to="/blog/category/statistics" className="px-3 py-1.5 rounded-full transition-colors" style={{ background: 'rgba(79,195,247,0.08)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.15)' }}>Statistics</Link>
            <Link to="/blog/category/improvement" className="px-3 py-1.5 rounded-full transition-colors" style={{ background: 'rgba(255,179,0,0.08)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.15)' }}>Improvement</Link>
            <Link to="/blog/category/discipline" className="px-3 py-1.5 rounded-full transition-colors" style={{ background: 'rgba(255,179,0,0.08)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.15)' }}>Discipline</Link>
            <Link to="/blog/category/app-reviews" className="px-3 py-1.5 rounded-full transition-colors" style={{ background: 'rgba(79,195,247,0.08)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.15)' }}>App Reviews</Link>
          </div>

          {/* Internal links for SEO */}
          <div className="flex flex-wrap gap-3 mb-10 text-xs">
            <Link to="/#features" className="px-3 py-1.5 rounded-full bg-kmf-accent/8 text-kmf-text-tertiary hover:text-kmf-accent border border-kmf-accent/15 transition-colors">Features</Link>
            <Link to="/#pricing" className="px-3 py-1.5 rounded-full bg-kmf-accent/8 text-kmf-text-tertiary hover:text-kmf-accent border border-kmf-accent/15 transition-colors">Pricing</Link>
            <Link to="/#download" className="px-3 py-1.5 rounded-full bg-kmf-accent/8 text-kmf-text-tertiary hover:text-kmf-accent border border-kmf-accent/15 transition-colors">Download</Link>
            <Link to="/#faq" className="px-3 py-1.5 rounded-full bg-kmf-accent/8 text-kmf-text-tertiary hover:text-kmf-accent border border-kmf-accent/15 transition-colors">FAQ</Link>
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
