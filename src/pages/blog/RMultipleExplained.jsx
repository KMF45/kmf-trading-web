import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function RMultipleExplained() {
  return (
    <BlogArticleLayout
      slug="r-multiple-explained"
      title="R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)"
      metaTitle="R-Multiple Explained: Measure Trade Quality Beyond Dollar P/L | K.M.F. Trading Journal"
      metaDescription="R-multiple is the most honest way to evaluate your trades. Learn what R means, how to calculate it, and why a -$50 trade can be better than a +$200 trade."
      date="February 20, 2026"
      dateISO="2026-02-20"
      readTime="6 min read"
      category="Statistics"
      categoryColor="#4FC3F7"
    >
      <Intro>
        Most traders evaluate their trades by looking at the dollar profit or loss. But dollar P/L is one of the least informative metrics available to you. A $500 win might be a terrible trade. A $50 loss might be an excellent trade. R-multiple is the metric that reveals the truth — it measures not what you made or lost, but how well you executed relative to the risk you accepted.
      </Intro>

      <H2>What Is R?</H2>
      <P>
        R stands for "Risk" — specifically, the exact amount of money you put at risk when you entered the trade. R is defined by your stop loss: it is the distance from your entry to your stop loss, multiplied by your position size.
      </P>
      <P>
        If you entered a trade with a $150 stop (meaning if the trade goes fully against you and hits the stop, you lose $150), then R = $150 for that trade. Everything else is measured relative to that number.
      </P>
      <Callout title="R is always trade-specific" color="#4FC3F7">
        R is not a fixed dollar amount. It changes with every trade because it depends on your stop distance and position size. Two trades can both be "1% risk" but have different R values if the position sizes differ — though in practice, if you follow consistent risk management, your R will be similar across trades.
      </Callout>

      <H2>How to Calculate R-Multiple</H2>
      <P>
        Once you know R for a trade, calculating R-multiple is straightforward:
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>R-Multiple = Actual P/L ÷ Initial Risk (R)</strong>
      </P>
      <P>
        This gives you a number that expresses the outcome in units of your original risk. Examples:
      </P>
      <Ul items={[
        'Risked $100, gained $200 → R-multiple = +2R (you made twice what you risked)',
        'Risked $100, lost $100 (full stop hit) → R-multiple = -1R (standard full loss)',
        'Risked $100, lost $50 (moved stop to breakeven then partial loss) → R-multiple = -0.5R',
        'Risked $100, gained $350 → R-multiple = +3.5R (strong trade, target exceeded)',
        'Risked $100, gained $40 (took profit early) → R-multiple = +0.4R (below plan)',
      ]} />

      <H2>Why R-Multiple Is Better Than Dollar P/L</H2>
      <H3>It normalizes across account sizes</H3>
      <P>
        A trader with a $5,000 account and a trader with a $500,000 account cannot meaningfully compare their dollar gains. But they can compare R-multiples. A +2R trade is a +2R trade regardless of account size. This makes R-multiple the universal language of trade evaluation.
      </P>
      <H3>It separates process from outcome</H3>
      <P>
        Consider two scenarios. In the first, you take a trade that reaches your 3R target perfectly. You earn +3R. In the second, you take a trade with no clear target, luck into a large move, and exit with +3R. The dollar outcome is identical — but the first was an excellent trade and the second was a lucky one.
      </P>
      <P>
        R-multiple combined with your execution quality review tells you whether you followed your plan. Dollar P/L alone cannot tell you that.
      </P>
      <H3>It reveals early exits and extended losses</H3>
      <P>
        If your planned trade had a 2R target but you closed at +0.6R because you got nervous, the R-multiple records exactly that shortfall. If you let a trade run past your stop and closed it at -1.8R instead of -1R, R-multiple shows the discipline breakdown. Dollar amounts disguise these deviations; R-multiples expose them.
      </P>

      <Divider />

      <H2>What Is a Good Average R-Multiple?</H2>
      <P>
        The average R-multiple (sometimes called expectancy in R terms) is the single most important performance metric for your strategy. It answers: on average, how much do you earn per dollar risked, per trade?
      </P>
      <Table
        headers={['Win Rate', 'Avg R-Win', 'Avg R-Loss', 'Expectancy (R)']}
        rows={[
          ['50%', '+2.0R', '-1.0R', '+0.50R per trade'],
          ['40%', '+3.0R', '-1.0R', '+0.60R per trade'],
          ['60%', '+1.5R', '-1.0R', '+0.50R per trade'],
          ['35%', '+2.0R', '-1.0R', '+0.05R per trade (barely viable)'],
          ['70%', '+0.8R', '-1.0R', '-0.04R per trade (losing)'],
          ['45%', '+1.8R', '-1.0R', '+0.26R per trade'],
        ]}
      />
      <P>
        Any positive expectancy in R terms is a viable strategy. An expectancy above +0.5R per trade is considered good. Notice that the 70% win rate example in the table has negative expectancy — because average winners are smaller than average losses.
      </P>

      <H2>Using R-Multiple to Evaluate Your Strategy</H2>
      <P>
        After 30 or more trades, calculate your average R-multiple. If it is negative, your strategy is losing regardless of how it feels in dollar terms. If it is positive but below +0.2R, the strategy is marginally viable but fragile — slippage, spreads, and commissions may erase it.
      </P>
      <P>
        More usefully, you can segment R-multiple by setup type, instrument, session, or day of week. If your London-session setups average +0.8R but your New York setups average -0.3R, that is an actionable insight — focus on London sessions and eliminate or paper-trade New York until you identify the problem.
      </P>

      <H3>The Connection to Expectancy</H3>
      <P>
        R-multiple per trade, averaged over your trade history, is the foundation of your strategy's expectancy calculation. Expectancy tells you the expected value of each trade you take. Mastering R-multiple thinking is the first step to understanding expectancy deeply — which is the topic we explore fully in our article on trading expectancy.
      </P>

      <Takeaways items={[
        'R is the amount you risk per trade, defined by your stop loss distance and position size.',
        'R-multiple = Actual P/L divided by your initial risk (R). It expresses outcome in units of risk.',
        'R-multiple is superior to dollar P/L because it normalizes across account sizes and position sizes.',
        'A positive average R-multiple across your trade history means your strategy has edge — regardless of dollar amounts.',
        'Segmenting R-multiple by setup, instrument, or session reveals where your real edge lies.',
        'An average R-multiple above +0.5R is generally considered a good strategy.',
      ]} />
    </BlogArticleLayout>
  );
}
