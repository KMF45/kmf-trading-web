import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function TradingExpectancyExplained() {
  return (
    <BlogArticleLayout
      title="Trading Expectancy Explained: The Formula That Tells If Your Strategy Works"
      metaTitle="Trading Expectancy Explained: The Formula Every Trader Must Know | K.M.F. Trading Journal"
      metaDescription="Expectancy is the one number that tells you if your trading strategy is profitable long-term. Learn the formula, how to calculate it, and what it means for your trading."
      date="February 20, 2026"
      dateISO="2026-02-20"
      readTime="6 min read"
      category="Statistics"
      categoryColor="#4FC3F7"
    >
      <Intro>
        What if you could know, with mathematical certainty, whether your trading strategy will make money over the long term — before you have traded it for years? Expectancy is the formula that gives you exactly that. It is the single number that summarizes the profitability of any strategy, and every serious trader should be able to calculate it from their trade history within minutes.
      </Intro>

      <H2>What Is Expectancy?</H2>
      <P>
        Expectancy is the average amount of money you can expect to win (or lose) per trade, on average, over a large sample of trades. It answers the question: if I take this trade one thousand times, what is the average outcome per trade?
      </P>
      <P>
        A positive expectancy means the strategy is profitable long-term. A negative expectancy means it loses money long-term, regardless of short-term results. The magnitude of the expectancy tells you how robust the edge is.
      </P>

      <H2>The Formula</H2>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Expectancy = (Win Rate × Average Win) − (Loss Rate × Average Loss)</strong>
      </P>
      <P>
        Where:
      </P>
      <Ul items={[
        'Win Rate = percentage of trades that are profitable (e.g., 0.50 for 50%)',
        'Average Win = average dollar profit on winning trades',
        'Loss Rate = 1 − Win Rate (percentage of trades that are losers)',
        'Average Loss = average dollar loss on losing trades (use positive number)',
      ]} />

      <H2>A Worked Example</H2>
      <P>
        Suppose your last 100 trades show: 50 winners, 50 losers. Your average winning trade made $200 and your average losing trade cost you $100.
      </P>
      <P>
        Expectancy = (0.50 × $200) − (0.50 × $100) = $100 − $50 = <strong style={{ color: '#00E676' }}>+$50 per trade</strong>
      </P>
      <P>
        This means that on average, every trade you take with this strategy is expected to return $50. Over 200 trades, that is $10,000 in expected profit. The number will not be exactly that — variance ensures results fluctuate — but the expected value is a reliable long-term guide.
      </P>

      <Divider />

      <H2>Positive vs Negative Expectancy</H2>
      <H3>Positive Expectancy</H3>
      <P>
        Any strategy with a positive expectancy will make money over a sufficiently large sample of trades, assuming the expectancy remains stable and you execute consistently. Even a small positive expectancy — say, $5 per trade — compounds meaningfully over hundreds of trades.
      </P>
      <H3>Negative Expectancy</H3>
      <P>
        A strategy with negative expectancy will lose money over time, guaranteed. It does not matter how sophisticated the money management is, or how disciplined the execution. No position sizing technique can convert a negative expectancy into a profitable system. The only fixes are to improve win rate, improve average win size, or reduce average loss size.
      </P>
      <Callout title="The Casino Principle" color="#4FC3F7">
        Casinos make money not because every player loses every bet, but because the house has a slight positive expectancy on every game. Over millions of bets, the math is inevitable. Trading works the same way — if you have positive expectancy and take enough trades, profitability is a mathematical consequence, not a matter of luck.
      </Callout>

      <H2>Expectancy Across Different Strategies</H2>
      <Table
        headers={['Win Rate', 'Avg Win', 'Avg Loss', 'Expectancy', 'Assessment']}
        rows={[
          ['60%', '$150', '$100', '+$50/trade', 'Good — balanced approach'],
          ['40%', '$300', '$100', '+$80/trade', 'Excellent — high R:R, low win rate'],
          ['70%', '$80', '$100', '-$4/trade', 'Losing — commissions make it worse'],
          ['35%', '$250', '$100', '+$22.50/trade', 'Viable — trend following profile'],
          ['55%', '$120', '$150', '-$1.50/trade', 'Slightly negative — improve R:R'],
          ['50%', '$200', '$100', '+$50/trade', 'Good — standard 2:1 R:R'],
        ]}
      />
      <P>
        Notice the 70% win rate entry: despite winning 7 out of 10 trades, the strategy loses money because average losses exceed average wins. This is the classic illusion of win rate — and expectancy reveals it immediately.
      </P>

      <H2>Expectancy in R-Multiple Terms</H2>
      <P>
        Expectancy can also be expressed in R-multiple terms, which is more useful for comparing strategies across different account sizes and position sizes:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Expectancy (R) = (Win Rate × Average R-Win) − (Loss Rate × 1)</strong>
      </P>
      <P>
        This simplifies because a full loss is always -1R by definition. Example: 50% win rate, average win is +2R. Expectancy = (0.50 × 2) − (0.50 × 1) = 1.0 − 0.5 = <strong style={{ color: '#00E676' }}>+0.5R per trade</strong>. This means for every dollar you risk, you earn 50 cents on average.
      </P>

      <H2>How to Calculate Your Own Expectancy</H2>
      <P>
        Pull your trade history from your journal and calculate:
      </P>
      <Ul items={[
        'Total trades, wins, and losses',
        'Average dollar profit on winning trades',
        'Average dollar loss on losing trades',
        'Apply the formula: Expectancy = (Win Rate × Avg Win) − (Loss Rate × Avg Loss)',
      ]} />

      <H2>What Is a Good Expectancy?</H2>
      <P>
        Any positive number is viable. However, the margin above zero matters because real trading involves costs — spreads, commissions, and slippage. A very small positive expectancy (e.g., $2 per trade) may be wiped out by these costs. In practice:
      </P>
      <Ul items={[
        'Positive expectancy of any size (net of costs) — strategy is viable',
        'Expectancy above +0.3R per trade — solid edge with margin for costs',
        'Expectancy above +0.5R per trade — strong edge, good foundation',
        'Expectancy above +1.0R per trade — excellent, but verify with a large sample',
      ]} />

      <H2>The Importance of Sample Size</H2>
      <P>
        Expectancy calculated from 10 trades is meaningless. Even 20 or 30 trades can be heavily distorted by a few outlier results. As a minimum, use 30 to 50 trades for an initial estimate, and recognize that 100 or more trades are needed for a statistically reliable figure. The expectancy will fluctuate as you add more trades — and that is normal. Watch for the number to stabilize over time.
      </P>

      <Takeaways items={[
        'Expectancy = (Win Rate × Avg Win) − (Loss Rate × Avg Loss). A positive number means long-term profitability.',
        'Negative expectancy cannot be fixed by money management alone — the strategy itself must improve.',
        'Expectancy in R-multiple terms allows comparison across different account sizes: (Win Rate × Avg R-Win) − (Loss Rate × 1).',
        'A 70% win rate with small wins and large losses produces negative expectancy — win rate is insufficient alone.',
        'Minimum 30–50 trades for initial calculation; 100+ for statistical reliability.',
        'Any positive expectancy net of costs is a viable strategy — optimize from there.',
      ]} />
    </BlogArticleLayout>
  );
}
