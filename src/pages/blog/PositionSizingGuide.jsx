import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function PositionSizingGuide() {
  return (
    <BlogArticleLayout
      slug="position-sizing-guide"
      title="Position Sizing Guide: How Much Should You Trade?"
      metaTitle="Position Sizing Guide: The Exact Formula for Every Market | K.M.F. Trading Journal"
      metaDescription="Position sizing is the most underrated skill in trading. Learn the exact formula to calculate how much to trade based on your account size, risk tolerance, and stop loss distance."
      date="February 20, 2026"
      dateISO="2026-02-20"
      readTime="7 min read"
      category="Risk Management"
      categoryColor="#00C853"
    >
      <Intro>
        Take two traders with identical strategies, identical setups, identical entry and exit points. One grows their account consistently for years. The other blows up within months. The difference is almost always position sizing. Position sizing is the single most important variable you directly control in trading — and it is the one most consistently underestimated by beginners.
      </Intro>

      <H2>The Fundamental Formula</H2>
      <P>
        Position sizing starts from a single principle: decide how much of your account you are willing to lose on this trade, and let that number determine your position size. Not the other way around.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Position Size = Risk Amount ÷ Stop Loss Distance (in price terms)</strong>
      </P>
      <P>
        Every version of position sizing calculation — whether for forex lots, stock shares, or crypto units — is a variation of this core formula. The inputs change by market, but the logic is identical.
      </P>

      <H2>Step-by-Step Process</H2>
      <Ul items={[
        'Step 1: Decide your risk percentage (typically 1% of account for established traders, 0.5% for beginners)',
        'Step 2: Calculate your risk amount in dollars: Risk Amount = Account Balance × Risk %',
        'Step 3: Identify your stop loss level based on market structure (not on convenience)',
        'Step 4: Calculate the stop loss distance in price terms (Entry Price − Stop Loss Price)',
        'Step 5: Calculate position size: Position Size = Risk Amount ÷ Stop Loss Distance',
      ]} />
      <Callout title="The Golden Rule" color="#00C853">
        Always calculate position size from your stop loss, never move your stop loss to fit your preferred position size. Inverting this logic is one of the most common — and most destructive — mistakes in retail trading.
      </Callout>

      <Divider />

      <H2>Forex Example</H2>
      <P>
        Account: $10,000. Risk per trade: 1% = $100.
        Trade: Long EUR/USD. Entry: 1.1000. Stop loss: 1.0950 (50 pips below entry).
      </P>
      <P>
        For a standard forex lot (100,000 units), each pip is worth $10. So a 50-pip stop = $500 risk per standard lot.
        Position Size = $100 ÷ $500 per lot = 0.20 lots (or 2 mini lots).
      </P>
      <P>
        If the trade wins at a 2:1 target (100 pips, target at 1.1100): profit = 100 pips × $10 × 0.2 lots = $200.
        If the trade loses at the stop: loss = 50 pips × $10 × 0.2 lots = $100. Exactly 1% of account.
      </P>

      <H2>Stocks Example</H2>
      <P>
        Account: $10,000. Risk per trade: 1% = $100.
        Trade: Long a stock at $50 per share. Stop loss: $48 (a $2.00 distance per share).
      </P>
      <P>
        Position Size = $100 ÷ $2.00 = 50 shares.
        Total position value: 50 × $50 = $2,500 (25% of account in this position).
        If stop is hit: 50 shares × $2.00 loss = $100. Exactly 1%.
        If target is $54 (2:1 R:R): 50 shares × $4.00 gain = $200.
      </P>

      <H2>Crypto Example</H2>
      <P>
        Account: $10,000. Risk per trade: 1% = $100.
        Trade: Long Bitcoin at $40,000. Stop loss: $39,000 ($1,000 distance per BTC).
      </P>
      <P>
        Position Size = $100 ÷ $1,000 = 0.10 BTC.
        Total position value: 0.10 × $40,000 = $4,000.
        If stop is hit: 0.10 BTC × $1,000 = $100. Exactly 1%.
        If target is $42,000 (2:1 R:R): 0.10 × $2,000 = $200.
      </P>

      <Divider />

      <H2>Position Size Reference Table</H2>
      <Table
        headers={['Account Size', 'Risk %', 'Risk Amount', 'Stop Distance', 'Position Size (units)']}
        rows={[
          ['$5,000', '1%', '$50', '$2.00 (stocks)', '25 shares'],
          ['$10,000', '1%', '$100', '$2.00 (stocks)', '50 shares'],
          ['$25,000', '1%', '$250', '$2.00 (stocks)', '125 shares'],
          ['$10,000', '1%', '$100', '50 pips (forex)', '0.20 lots'],
          ['$10,000', '0.5%', '$50', '50 pips (forex)', '0.10 lots'],
          ['$10,000', '2%', '$200', '50 pips (forex)', '0.40 lots'],
        ]}
      />

      <H2>Position Sizing in Volatile Markets</H2>
      <P>
        During periods of elevated volatility — major news events, earnings seasons, or market dislocations — your stop loss distance should widen to account for larger-than-normal price swings. A wider stop means a smaller position size for the same risk amount. This is exactly what should happen.
      </P>
      <P>
        Many traders make the mistake of maintaining their usual position size during volatile periods, placing a stop that is too tight for the conditions, getting stopped out repeatedly, and assuming their strategy has stopped working. The correct adjustment is automatic if you follow the position sizing formula: wider stop → smaller position → same dollar risk.
      </P>
      <H3>Practical adjustment for volatile sessions</H3>
      <Ul items={[
        'Check ATR before entry: if the 14-period ATR is more than 1.5× its recent average, consider halving your position size as a precaution.',
        'Avoid trading in the 30 minutes before and after major economic releases if your strategy is not designed for that volatility.',
        'During exceptionally volatile days (e.g., surprise central bank decisions), consider sitting out entirely or using minimum position sizes.',
      ]} />

      <H2>The Anti-Pattern: Sizing by Feel</H2>
      <P>
        Many traders — especially those coming from a background of watching markets without trading — develop a habit of sizing positions based on how confident they feel about a setup. "This looks really good, I'll put more in." This is the anti-pattern.
      </P>
      <P>
        No trade is so good that it justifies violating your risk rules. The 1% rule applies to every trade, including the one that looks like a certainty. Markets are uncertain by definition, and certainty-based position sizing is a bias, not an edge. Sizing by formula, consistently, is what transforms inconsistent traders into consistent ones.
      </P>

      <Takeaways items={[
        'Position Size = Risk Amount ÷ Stop Loss Distance. This formula applies to forex, stocks, and crypto — only the units change.',
        'Always determine your stop loss level first, then calculate position size from it. Never reverse this.',
        'In volatile markets, wider stops automatically reduce position size for the same dollar risk — this is the system working correctly.',
        'A $10,000 account risking 1% can only lose $100 per trade. Over 10 consecutive losses, the account is still at $90,451 (not $90,000 due to compounding).',
        'Sizing by feel or by confidence level introduces one of the most dangerous biases in trading. Use the formula every time.',
        'Beginners should use 0.5% risk until their strategy has been validated over at least 50 trades.',
      ]} />
    </BlogArticleLayout>
  );
}
