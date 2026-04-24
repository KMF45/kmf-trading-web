import { useEffect, useMemo, useRef, useState } from 'react';
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
  {
    slug: 'static-vs-trailing-drawdown',
    title: 'Static vs Trailing Drawdown: The Prop Firm Rule That Silently Kills Funded Accounts',
    excerpt: 'Most prop firm failures happen because traders don\'t understand the difference between static and trailing drawdown. The math, the trap, and how to survive both.',
    category: 'Risk Management',
    date: 'March 22, 2026',
    readTime: '9 min read',
    categoryColor: '#00C853',
  },
  {
    slug: 'revenge-trading-kill-switch',
    title: 'The Revenge Trading Kill Switch: A Protocol Your Future Self Will Thank You For',
    excerpt: 'Knowing about revenge trading doesn\'t stop it. Cortisol and dopamine override knowledge. A 5-rule pre-programmed protocol that works when willpower doesn\'t.',
    category: 'Psychology',
    date: 'March 22, 2026',
    readTime: '10 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'metatrader-pre-trade-checklist',
    title: 'How to Build a Pre-Trade Checklist for MetaTrader and cTrader (5 Rules That Actually Stick)',
    excerpt: 'Five checks, 60 seconds, specific to MT4/MT5/cTrader. Platform-specific instructions, lot size calculations, and the practical workflow most checklists miss.',
    category: 'Discipline',
    date: 'March 22, 2026',
    readTime: '8 min read',
    categoryColor: '#FFB300',
  },
  {
    slug: 'breakeven-stop-too-early',
    title: 'The $0.01 Gap: Why You Move Your Stop Loss to Breakeven Too Early',
    excerpt: 'You move your stop to breakeven to "protect profits." But the math says you are destroying your expectancy. The psychology behind premature breakeven stops and how to fix it.',
    category: 'Psychology',
    date: 'March 22, 2026',
    readTime: '9 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'scared-money-prop-firm',
    title: "Trading with 'Scared Money': Why Your 100k Prop Account Feels Like a Burden",
    excerpt: 'If you check your balance every 30 seconds, you have already lost the trade. The neuroscience of fear-based trading and how to detach from the money on prop firm accounts.',
    category: 'Psychology',
    date: 'March 22, 2026',
    readTime: '9 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'lotto-ticket-syndrome',
    title: "The 'Lotto Ticket' Syndrome: Why You Increase Risk After a Big Win",
    excerpt: 'After a big win, your brain floods with dopamine and you feel invincible. Then you double your risk and lose a week\'s profit in one trade. The neuroscience of post-win euphoria.',
    category: 'Psychology',
    date: 'March 22, 2026',
    readTime: '9 min read',
    categoryColor: '#CE93D8',
  },
  {
    slug: 'prospect-theory-trading',
    title: 'Why You Close Your Winners Too Early and Let Your Losers Run',
    excerpt: 'Your brain values avoiding a $100 loss 2.25x more than gaining $100. This biological asymmetry is why you cut winners and hold losers. Prospect theory explained for traders.',
    category: 'Psychology',
    date: 'March 22, 2026',
    readTime: '10 min read',
    categoryColor: '#CE93D8',
  },
];

// Fuzzy-ish match: higher score = better match
function matchScore(post, query) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const title = post.title.toLowerCase();
  const cat = post.category.toLowerCase();
  const excerpt = post.excerpt.toLowerCase();

  let score = 0;
  if (title.startsWith(q)) score += 10;
  if (title.includes(q)) score += 6;
  if (cat.includes(q)) score += 3;
  if (excerpt.includes(q)) score += 1;

  const words = q.split(/\s+/).filter((w) => w.length > 1);
  words.forEach((w) => {
    if (title.includes(w)) score += 2;
    else if (cat.includes(w)) score += 1;
    else if (excerpt.includes(w)) score += 0.3;
  });
  return score;
}

function highlight(text, query) {
  const q = query.trim();
  if (!q) return text;
  try {
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${esc})`, 'ig'));
    return parts.map((p, i) =>
      p.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} style={{ background: 'rgba(79,195,247,0.22)', color: '#F0F4FF', padding: '0 2px', borderRadius: 3 }}>{p}</mark>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  } catch {
    return text;
  }
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function onClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return posts;
    return posts
      .map((p) => ({ post: p, score: matchScore(p, q) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.post);
  }, [searchQuery]);

  const autocomplete = filteredPosts.slice(0, 5);

  function handleKeyDown(e) {
    if (!showDropdown || autocomplete.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % autocomplete.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + autocomplete.length) % autocomplete.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = autocomplete[activeIdx];
      if (target) window.location.href = `/blog/${target.slug}`;
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  }

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

          {/* Search */}
          <div ref={searchRef} className="relative mb-6">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ color: searchQuery ? '#4FC3F7' : 'rgba(240,244,255,0.35)' }}
              >
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setActiveIdx(0); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search articles — e.g. profit factor, stop loss, tilt…"
                className="w-full pl-11 pr-10 py-3 rounded-xl text-sm text-kmf-text-primary placeholder:text-kmf-text-tertiary/60 outline-none transition-all"
                style={{
                  background: 'rgba(26,29,36,0.85)',
                  border: `1px solid ${searchQuery || showDropdown ? 'rgba(79,195,247,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: searchQuery || showDropdown ? '0 0 0 3px rgba(79,195,247,0.08)' : 'none',
                }}
                aria-label="Search articles"
                aria-autocomplete="list"
                aria-expanded={showDropdown && autocomplete.length > 0}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setActiveIdx(0); inputRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-kmf-text-tertiary hover:text-kmf-text-primary hover:bg-white/5 transition-colors"
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            {/* Autocomplete dropdown */}
            {showDropdown && searchQuery && autocomplete.length > 0 && (
              <div
                className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-20"
                style={{
                  background: 'rgba(15,17,21,0.98)',
                  border: '1px solid rgba(79,195,247,0.2)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(10px)',
                }}
                role="listbox"
              >
                {autocomplete.map((p, i) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    onClick={() => setShowDropdown(false)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className="flex items-start gap-3 px-4 py-3 transition-colors"
                    style={{
                      background: activeIdx === i ? 'rgba(79,195,247,0.08)' : 'transparent',
                      borderBottom: i < autocomplete.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                    role="option"
                    aria-selected={activeIdx === i}
                  >
                    <span
                      className="flex-shrink-0 mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${p.categoryColor}14`,
                        color: p.categoryColor,
                        border: `1px solid ${p.categoryColor}25`,
                      }}
                    >
                      {p.category}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-kmf-text-primary leading-snug">
                        {highlight(p.title, searchQuery)}
                      </p>
                      <p className="text-xs text-kmf-text-tertiary mt-0.5">{p.readTime} · {p.date}</p>
                    </div>
                  </Link>
                ))}
                {filteredPosts.length > autocomplete.length && (
                  <div
                    className="px-4 py-2 text-[11px] text-kmf-text-tertiary uppercase tracking-widest"
                    style={{ background: 'rgba(79,195,247,0.04)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {filteredPosts.length - autocomplete.length} more result{filteredPosts.length - autocomplete.length === 1 ? '' : 's'} below
                  </div>
                )}
              </div>
            )}

            {showDropdown && searchQuery && autocomplete.length === 0 && (
              <div
                className="absolute left-0 right-0 mt-2 rounded-xl px-4 py-5 text-center text-sm text-kmf-text-tertiary z-20"
                style={{
                  background: 'rgba(15,17,21,0.98)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                No articles match <strong style={{ color: '#F0F4FF' }}>"{searchQuery}"</strong>. Try a different term.
              </div>
            )}
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

          {/* Results count */}
          {searchQuery && (
            <p className="text-xs text-kmf-text-tertiary mb-4">
              {filteredPosts.length === 0
                ? <>No articles match <strong style={{ color: '#F0F4FF' }}>"{searchQuery}"</strong>.</>
                : <>Showing <strong style={{ color: '#4FC3F7' }}>{filteredPosts.length}</strong> result{filteredPosts.length === 1 ? '' : 's'} for <strong style={{ color: '#F0F4FF' }}>"{searchQuery}"</strong>.</>
              }
            </p>
          )}

          {/* Empty state */}
          {searchQuery && filteredPosts.length === 0 && (
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: 'rgba(26,29,36,0.85)', border: '1px dashed rgba(255,255,255,0.1)' }}
            >
              <p className="text-kmf-text-primary font-semibold mb-2">No matching articles</p>
              <p className="text-sm text-kmf-text-tertiary mb-4">
                Try searching for a broader term, or browse by category above.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                style={{ background: 'rgba(79,195,247,0.1)', color: '#4FC3F7', border: '1px solid rgba(79,195,247,0.25)' }}
              >
                Clear search
              </button>
            </div>
          )}

          {/* Posts */}
          <div className="space-y-5">
            {filteredPosts.map((post, idx) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block rounded-2xl border overflow-hidden transition-all duration-200 group"
                style={{ background: 'rgba(26,29,36,0.85)', borderColor: 'rgba(255,255,255,0.07)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,195,247,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <div className="flex flex-col md:flex-row">
                  <div
                    className="md:w-72 md:flex-shrink-0 overflow-hidden relative"
                    style={{ aspectRatio: '1200 / 630', background: 'rgba(15,17,21,0.6)' }}
                  >
                    <img
                      src={`/blog/og/${post.slug}.png`}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <div className="p-6 flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: `${post.categoryColor}14`, color: post.categoryColor, border: `1px solid ${post.categoryColor}25` }}>
                        {post.category}
                      </span>
                      <span className="text-xs text-kmf-text-tertiary">{post.date}</span>
                      <span className="text-xs text-kmf-text-tertiary">· {post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-kmf-text-primary mb-2 group-hover:text-kmf-accent transition-colors"
                      style={{ letterSpacing: '-0.01em' }}>
                      {searchQuery ? highlight(post.title, searchQuery) : post.title}
                    </h2>
                    <p className="text-sm text-kmf-text-tertiary leading-relaxed">
                      {searchQuery ? highlight(post.excerpt, searchQuery) : post.excerpt}
                    </p>
                    <p className="text-xs text-kmf-accent mt-4 font-semibold">Read article →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
