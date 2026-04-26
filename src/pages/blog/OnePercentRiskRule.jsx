import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../components/blog/BlogArticleLayout';
import { RiskRuleEquityCurve } from '../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function OnePercentRiskRule() {
  return (
    <BlogArticleLayout
      slug="1-percent-risk-rule"
      title="The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive"
      metaTitle="The 1% Rule: Why Pro Traders Never Risk More (And Neither Should You) | K.M.F."
      metaDescription="Learn why professional traders never risk more than 1% per trade, how to calculate it, and how it protects your account during losing streaks."
      date="January 9, 2026"
      dateISO="2026-01-09"
      readTime="6 min read"
      category="Risk Management"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'What is the 1% risk rule in trading?', answer: 'The 1% rule means never risking more than 1% of your total account balance on a single trade. On a $10,000 account, your maximum loss per trade would be $100, regardless of the instrument or timeframe.' },
        { question: 'How do I apply the 1% rule?', answer: 'Calculate 1% of your account balance, determine your stop loss distance, then divide the risk amount by the stop loss distance to get your position size. This ensures every trade has the same risk regardless of market.' },
        { question: 'Can I risk more than 1% per trade?', answer: 'Some experienced traders use 2% per trade, but exceeding that is dangerous. With 1% risk, even 10 consecutive losses only draw down your account by about 9.5%. With 5% risk, 10 losses would lose 40% of your account.' },
      ]}
    >
      <Intro>
        Most retail traders who blow their accounts do not lose because of a bad strategy. They lose because of bad risk management. They find a setup they love, size in too large, and one trade — or one bad week — takes out 30%, 50%, or all of their capital. The 1% risk rule is the simplest, most reliable defense against that outcome.
      </Intro>

      <StatsStrip items={[
        { value: 1, decimals: 0, suffix: '%', label: <>max risk per trade<br />(industry standard)</> },
        { value: 100, decimals: 0, suffix: '%', label: <>gain needed to recover<br />from a 50% drawdown</> },
        { value: 50, decimals: 0, suffix: '+', label: <>trades to validate<br />a strategy works</> },
      ]} />

      <H2>What Is the 1% Risk Rule?</H2>
      <P>
        The 1% risk rule states that on any single trade, you should never risk more than 1% of your total trading account. Risk here means the maximum amount you are willing to lose if the trade goes entirely against you and hits your stop loss.
      </P>
      <P>
        If your account is $10,000, you risk no more than $100 per trade. If your account is $50,000, you risk no more than $500. The key insight is that this number is derived from your account size, not from a fixed dollar amount — so it scales with your equity and naturally shrinks during drawdowns.
      </P>

      <H2>The Math of Ruin: Why Risk % Matters More Than You Think</H2>
      <P>
        Losing streaks are a mathematical certainty, even with a profitable strategy. The question is not whether you will face a run of losses, but whether your account survives it long enough to reach the next winning phase. Understanding strategies for <Link to="/blog/how-to-recover-from-losing-streak" className="text-kmf-accent hover:underline">surviving losing streaks</Link> is just as important as having a good entry method.
      </P>
      <P>
        Look at what consecutive losses do to your account at different risk levels:
      </P>
      <Table
        headers={['Consecutive Losses', '1% Risk', '2% Risk', '5% Risk', '10% Risk']}
        rows={[
          ['5 losses', { value: '-4.9%', color: 'green' }, { value: '-9.6%', color: 'cyan' }, { value: '-22.6%', color: 'gold' }, { value: '-41.0%', color: 'red' }],
          ['10 losses', { value: '-9.6%', color: 'green' }, { value: '-18.3%', color: 'cyan' }, { value: '-40.1%', color: 'red' }, { value: '-65.1%', color: 'red' }],
          ['15 losses', { value: '-14.0%', color: 'cyan' }, { value: '-26.1%', color: 'gold' }, { value: '-53.7%', color: 'red' }, { value: '-79.4%', color: 'red' }],
          ['20 losses', { value: '-18.2%', color: 'cyan' }, { value: '-33.2%', color: 'gold' }, { value: '-64.2%', color: 'red' }, { value: '-87.8%', color: 'red' }],
        ]}
      />

      <RiskRuleEquityCurve />

      <P>
        At 5% risk per trade, a 10-trade losing streak — which is entirely within normal variance for a 50% win rate system — destroys 40% of your account. At that point, you need a 67% gain just to break even. At 1% risk, the same streak leaves you with 90% of your capital intact, and a simple 11% gain restores you to your starting point.
      </P>
      <Callout title="The Recovery Math" color="#00C853">
        A 50% drawdown requires a 100% gain to recover. A 20% drawdown only requires a 25% gain. Protecting against large drawdowns is not conservative — it is mathematically essential for long-term survival.
      </Callout>

      <H2>How to Calculate Position Size Using the 1% Rule</H2>
      <P>
        The formula has two steps:
      </P>
      <Ul items={[
        'Step 1 — Calculate your risk amount: Risk Amount = Account Balance × 0.01',
        'Step 2 — Calculate position size: Position Size = Risk Amount ÷ (Entry Price − Stop Loss Price)',
      ]} />
      <P>
        The <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss placement</Link> comes first. You identify the logical invalidation point for your trade, measure the distance to your entry, and then use that distance to determine how large your position should be. You never place a stop loss based on what <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">position sizing</Link> you want to take — it works the other way around.
      </P>

      <H3>Worked Example: Forex</H3>
      <P>
        Account: $10,000. Risk per trade: 1% = $100.
        Entry: EUR/USD at 1.0800. Stop loss: 1.0750 (50 pips below entry).
        For a standard lot, 1 pip = $10. So 50 pips = $500 per lot.
        Position size = $100 ÷ $500 = 0.20 lots (a mini lot and two micro lots).
      </P>
      <P>
        If this trade wins at a 2:1 target (100 pips above entry at 1.0900), the gain is $200 — a clean 2R outcome. If it loses at the stop, the loss is exactly $100, or 1% of the account.
      </P>
      <Callout>
        Skip the math — use our <Link to="/tools/lot-size-calculator" className="text-kmf-accent underline hover:text-white transition-colors">free Lot Size Calculator</Link> to get the exact position size for any instrument in seconds.
      </Callout>

      <Divider />

      <H2>Common Objections — Answered</H2>
      <H3>"My gains are too small at 1%"</H3>
      <P>
        This objection usually comes from comparing dollar amounts rather than percentages. A $100 gain on a $10,000 account is 1%. Over 100 trades with a profit factor of 2.0 and 50% win rate, that compounds significantly. The goal in trading is not large individual trades — it is consistent, compounding growth over hundreds of trades.
      </P>
      <H3>"I have a 90% win rate — I can risk more"</H3>
      <P>
        Even a 90% win rate system will produce multiple consecutive losses eventually. A sustained run of 5–7 losses at 5% risk each can produce a drawdown that is emotionally unbearable and functionally dangerous. The 1% rule is insurance against variance, not a reflection of your confidence in any specific trade.
      </P>

      <H2>Adjusting the Rule for Your Situation</H2>
      <Ul items={[
        '0.5% per trade — Recommended for new traders still validating their strategy, or during a period of underperformance. Keeps losses manageable while learning.',
        '1% per trade — The standard for experienced retail traders. Balances growth with drawdown protection.',
        '2% per trade — Upper limit for experienced traders with a proven, well-tested strategy and high confidence in their edge. Should not be the default.',
        'Above 2% — Speculative territory. Appropriate only for very short-term, high-conviction situations and should not represent standard operating procedure.',
      ]} />

      <Takeaways items={[
        'The 1% risk rule limits your maximum loss on any single trade to 1% of your total account balance.',
        'It is calculated from your stop loss distance, not chosen arbitrarily — position size is derived from the rule.',
        'At 1% risk, a 10-trade losing streak costs you less than 10% of your account, which is recoverable.',
        'Beginners should consider starting at 0.5% until their strategy is validated with at least 50 trades.',
        'The rule compounds in your favor: a growing account means growing position sizes, and a shrinking account means smaller positions, protecting you during drawdowns automatically.',
      ]} />
    </BlogArticleLayout>
  );
}
