import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function WeekendGapRisk() {
  return (
    <BlogArticleLayout
      slug="weekend-gap-risk"
      title="Weekend Gap Risk: How to Protect Your Account From Monday's Opening Surprise"
      metaTitle="Weekend Gap Risk: The Silent Account Killer You're Ignoring Every Friday | K.M.F."
      metaDescription="Weekend gaps can blow through your stop loss and destroy your account overnight. Learn why they happen, which instruments gap most, and how to protect your positions before the weekend."
      date="March 15, 2026"
      dateISO="2026-03-15"
      readTime="7 min read"
      category="Risk Management"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'What is a weekend gap in trading?', answer: 'A weekend gap occurs when an instrument opens on Monday at a significantly different price than its Friday close. This happens because news and events continue over the weekend while most markets are closed, creating pent-up supply or demand that resolves instantly at the open.' },
        { question: 'Can a stop loss protect me from a weekend gap?', answer: 'No. A stop loss only executes when the market is open and trading at your specified price. If the market gaps past your stop loss, your order fills at the first available price — which could be far worse than your intended stop level. This is called slippage.' },
        { question: 'Should I close all positions before the weekend?', answer: 'It depends on your strategy and risk tolerance. Swing traders who hold for days or weeks accept gap risk as part of their approach but often reduce position size to compensate. Day traders and scalpers typically close all positions before Friday close.' },
      ]}
    >
      <Intro>
        You set your stop loss at -1% on Friday afternoon. You close your laptop and enjoy the weekend. On Monday morning, you open your platform and discover your position opened at -3.5%, blowing through your stop as if it did not exist. Your stop loss order was there — the market simply jumped over it. This is weekend gap risk, and it is one of the least understood dangers in retail trading.
      </Intro>

      <StatsStrip items={[
        { value: 48, decimals: 0, suffix: 'h', label: <>weekend window where<br />news moves while markets close</> },
        { value: 50, decimals: 0, suffix: '%', label: <>position-size reduction<br />recommended for weekend holds</> },
        { value: 52, decimals: 0, label: <>weekend gap exposures<br />accumulated per year</> },
      ]} />

      <H2>What Causes Weekend Gaps?</H2>
      <P>
        Most financial markets close for approximately 48 hours every weekend. But the world does not pause. Geopolitical events, central bank announcements, natural disasters, corporate earnings surprises, and political elections all continue while the forex, stock, and commodity markets sit idle. When these markets reopen on Sunday evening (forex) or Monday morning (equities), all of the accumulated information resolves instantly into a new price — often significantly different from Friday's close.
      </P>
      <H3>Crypto: The Exception That Proves the Rule</H3>
      <P>
        Cryptocurrency markets trade 24/7, which means they do not experience weekend gaps in the traditional sense. However, crypto's continuous trading creates a different dynamic: while forex traders sleep over the weekend, crypto is actively repricing — and crypto moves can spill over into correlated forex and equity markets at Monday's open. A major crypto crash on Saturday can foreshadow risk-off sentiment in equities on Monday.
      </P>

      <Divider />

      <H2>Why Your Stop Loss Cannot Save You</H2>
      <P>
        A stop loss is a conditional order: "sell when price reaches X." But it can only execute when the market is open and actively trading at that price level. If the market closes at 1.0800 on Friday and opens at 1.0720 on Monday, your stop loss at 1.0770 was never triggered — the price jumped past it. Your order fills at 1.0720, giving you 50 pips of slippage beyond your intended stop. On a position sized for a 30-pip stop, that is nearly three times your planned loss. Proper <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss placement</Link> must account for this reality.
      </P>

      <Callout title="The Invisible Risk" color="#00C853">
        Weekend gap risk is invisible in backtesting. Most backtesting engines process stop losses as if they execute at the exact price level, ignoring gap slippage entirely. This means your backtest results are systematically more optimistic than reality if your strategy holds positions over weekends.
      </Callout>

      <H2>Average Weekend Gap Sizes by Instrument</H2>
      <P>
        Not all instruments gap equally. The table below shows typical average weekend gap sizes based on historical data. Individual gaps can be significantly larger during high-impact news events.
      </P>
      <Table
        headers={['Instrument', 'Average Gap Size', 'Large Gap (Top 5%)', 'Gap Frequency']}
        rows={[
          ['EUR/USD', { value: '10–20 pips', color: 'cyan' }, { value: '50–100+ pips', color: 'gold' }, 'Most weekends'],
          ['GBP/JPY', { value: '25–50 pips', color: 'gold' }, { value: '100–200+ pips', color: 'red' }, 'Most weekends'],
          ['USD/JPY', { value: '15–30 pips', color: 'cyan' }, { value: '60–150+ pips', color: 'gold' }, 'Most weekends'],
          ['Gold (XAU/USD)', { value: '$3–8', color: 'gold' }, { value: '$15–40+', color: 'red' }, 'Most weekends'],
          ['S&P 500 (ES)', { value: '0.3–0.8%', color: 'cyan' }, { value: '1.5–3%+', color: 'gold' }, 'Most weekends'],
          ['Bitcoin (BTC)', { value: 'No gap (24/7)', color: 'green' }, { value: 'No gap (24/7)', color: 'green' }, 'N/A — continuous'],
          ['Individual stocks', { value: '0.5–2%', color: 'gold' }, { value: '5–15%+ (earnings)', color: 'red' }, 'Varies by catalyst'],
        ]}
      />

      <Divider />

      <H2>Friday Exit Rules: A Framework</H2>
      <P>
        How you handle weekend risk depends on your trading style. Here are three approaches, ordered from most conservative to most aggressive:
      </P>
      <H3>1. Close all positions before Friday close</H3>
      <P>
        This eliminates weekend gap risk entirely. It is the standard approach for day traders and scalpers. The trade-off is that you occasionally miss a favorable Monday open — but you also never wake up to a gap disaster. If your strategy's edge comes from intraday moves, there is no reason to hold over the weekend.
      </P>
      <H3>2. Reduce position size for weekend holds</H3>
      <P>
        If your strategy requires holding positions for days or weeks, you can reduce your <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">position size</Link> on Friday to account for gap risk. A common approach: if your normal risk is 1% per trade, reduce to 0.5% for any position held over the weekend. This way, even a gap that doubles your stop loss distance only results in a 1% account loss — still within normal parameters.
      </P>
      <H3>3. Hedge with correlated instruments</H3>
      <P>
        Some traders hedge weekend exposure by taking an offsetting position in a correlated instrument that trades over the weekend (such as crypto) or by using options to define maximum loss. This is an advanced technique and introduces its own complexities, including correlation breakdown during stress events — the exact moments when gaps are largest.
      </P>

      <H2>Position Sizing Adjustments for Weekend Risk</H2>
      <P>
        The math is straightforward. If your normal stop loss is 30 pips and you accept that a weekend gap could add 30 additional pips of slippage, your effective risk distance is 60 pips. Size your position for the worst-case scenario, not the best case. This means cutting your position size in half for weekend holds — or accepting that your actual risk is double what your stop loss suggests.
      </P>
      <P>
        This adjustment is not optional. Ignoring it means your <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">1% risk rule</Link> becomes a 2% rule every weekend — and over a year of 52 weekends, that unaccounted risk compounds dangerously.
      </P>

      <H2>When Gaps Are Most Dangerous</H2>
      <Ul items={[
        'Elections and political events — results announced over weekends can move currencies 200+ pips.',
        'Central bank emergency meetings — rare but devastating when they occur.',
        'Geopolitical conflicts — military actions, sanctions, or diplomatic breakdowns over the weekend.',
        'Earnings season (equities) — companies reporting on Friday after close or Monday before open.',
        'OPEC meetings and energy policy announcements — can gap oil and energy stocks significantly.',
        'End of month/quarter — institutional rebalancing can create outsized Monday moves.',
      ]} />

      <Takeaways items={[
        'Weekend gaps occur because news and events continue while most markets are closed — creating price jumps at Monday\'s open.',
        'Stop loss orders cannot protect you from gaps. Price jumps past your stop, and you fill at the first available price.',
        'Cross-pair volatility instruments like GBP/JPY gap the most; crypto does not gap because it trades 24/7.',
        'Conservative approach: close all positions before Friday close. Moderate approach: reduce position size by 50% for weekend holds.',
        'Backtesting does not capture gap slippage — your live results will be worse than your backtest if you hold over weekends.',
        'Size your positions for the worst-case gap scenario, not your stop loss level alone.',
      ]} />
    </BlogArticleLayout>
  );
}
