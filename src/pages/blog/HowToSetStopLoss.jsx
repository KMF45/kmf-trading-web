import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function HowToSetStopLoss() {
  return (
    <BlogArticleLayout
      slug="how-to-set-stop-loss"
      title="How to Set a Stop Loss Properly (Not Just Randomly)"
      metaTitle="How to Set a Stop Loss Properly: 3 Professional Methods | K.M.F. Trading Journal"
      metaDescription="Most traders set stop losses based on dollar amounts or round numbers. Learn the three professional methods for placing stop losses where the market actually invalidates your trade."
      date="February 6, 2026"
      dateISO="2026-02-06"
      readTime="7 min read"
      category="Risk Management"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'crypto-vs-forex-journaling', title: 'Crypto vs Forex: Why Your Trading Journal Needs Different Rules for Each Market', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
    >
      <Intro>
        A poorly placed stop loss is often worse than no stop loss at all. Not because the concept of a stop loss is wrong, but because stops placed in the wrong location consistently stop you out of trades that would have been profitable — while providing false security that you have managed your risk. Stop loss placement is a skill, and most retail traders have never been taught it properly.
      </Intro>

      <H2>The Two Fundamental Mistakes</H2>
      <H3>Too tight</H3>
      <P>
        A stop loss that is too close to your entry will be hit by normal market noise — the routine fluctuations that occur within any trend or setup, before the actual move develops. You get stopped out for a full loss, the market then moves in your original direction, and you missed the trade entirely while absorbing a loss. This is one of the most frustrating experiences in trading and it happens almost entirely because of poor stop placement.
      </P>
      <H3>Too wide</H3>
      <P>
        A stop loss that is too far from your entry means that when the trade fails, the damage is disproportionate. If your stop is 200 pips away on a trade where the expected move is 80 pips, your risk:reward is inverted. You are risking more than you can realistically gain. Wide stops also force you to reduce position size so severely that winning trades make minimal impact on your account.
      </P>

      <H2>The Wrong Ways to Set a Stop Loss</H2>
      <Ul items={[
        'Choosing a round number ("I\'ll stop out if it goes to 1.0800") without structural reason',
        'Setting a fixed pip distance for all trades regardless of setup or volatility (e.g., "always 20 pips")',
        'Choosing a stop loss based on the dollar amount you are willing to lose, then placing it at that exact distance',
        'Placing a stop at the entry price (zero-risk illusion) before the trade has had space to develop',
        'Not setting a stop at all because "I\'ll watch it manually"',
      ]} />
      <Callout title="Critical Principle" color="#00C853">
        The correct process is: identify your logical stop loss level first based on market structure, then calculate your position size from that distance. Never start with a position size and place a stop to fit it. That inverts the logic entirely and guarantees poor stop placement.
      </Callout>

      <Divider />

      <H2>The 3 Professional Methods</H2>

      <H3>1. Structure-Based Stop Loss</H3>
      <P>
        Structure-based stop placement is the most important method and the foundation of professional risk management. The idea is that your stop loss should be placed at a price level where, if reached, the trade thesis is definitively wrong.
      </P>
      <P>
        For a long trade: place the stop below the relevant support level, below the swing low, or below the most recent significant low. If price breaks below that level, the upward structure is broken, and your reason for being long no longer exists.
      </P>
      <P>
        For a short trade: place the stop above the relevant resistance level, above the swing high, or above the most recent significant high.
      </P>
      <P>
        The key is "beyond" — not at the level, but a few pips or points beyond it to account for wicks, liquidity sweeps, and normal volatility around key levels. Placing a stop exactly at a round number or exactly at a swing point almost guarantees getting stopped out by a wick before the actual move.
      </P>

      <H3>2. ATR-Based Stop Loss</H3>
      <P>
        Average True Range (ATR) is a technical indicator that measures the average range of price movement over a specified period, typically 14 periods. It is one of the most useful objective measures of current market volatility.
      </P>
      <P>
        <strong style={{ color: 'var(--kmf-text-primary, #F0F4FF)' }}>Formula:</strong> Stop Distance = ATR(14) × Multiplier
      </P>
      <P>
        A common multiplier is 1.5× to 2× the ATR. If EUR/USD has an ATR of 60 pips, your stop would be 90–120 pips from entry. This automatically adjusts your stop for current volatility — wider during high-volatility periods, tighter during low-volatility periods.
      </P>
      <P>
        ATR-based stops are particularly useful during earnings seasons, major news events, or highly volatile instruments where structure-based stops may not be sufficient to avoid normal noise.
      </P>
      <Table
        headers={['Instrument', 'ATR (14)', 'Multiplier', 'Stop Distance', 'When Appropriate']}
        rows={[
          ['EUR/USD', '65 pips', '1.5×', '97 pips', 'Normal conditions'],
          ['EUR/USD', '110 pips', '1.5×', '165 pips', 'High-volatility week (NFP etc.)'],
          ['S&P 500', '28 points', '2.0×', '56 points', 'Intraday swing trade'],
          ['Bitcoin', '$1,800', '1.5×', '$2,700', 'Daily chart position'],
        ]}
      />

      <H3>3. Candle-Based Stop Loss</H3>
      <P>
        For pattern-based entries — pin bars, engulfing candles, inside bars, and similar price action setups — the stop loss is logically placed beyond the high or low of the signal candle itself.
      </P>
      <P>
        For a bullish pin bar at support: stop goes below the low of the pin bar's wick, plus a small buffer. The pin bar low represents the price the market tested and rejected. If price returns below that level, the rejection has failed and the setup is invalidated.
      </P>
      <P>
        For a bearish engulfing candle at resistance: stop goes above the high of the engulfing candle, plus buffer.
      </P>
      <P>
        Candle-based stops are clean and logical, but they can be too tight on higher timeframes where individual candles represent large price ranges. Always cross-reference with structural levels to confirm the stop makes sense in context.
      </P>

      <Divider />

      <H2>When to Move Your Stop to Breakeven</H2>
      <P>
        Moving your stop loss to the entry price — breakeven — is a useful risk management technique, but only when the trade has developed enough to justify it. A common rule of thumb: once the trade reaches 1R in profit (i.e., has moved the same distance toward the target as the initial stop loss distance), consider moving the stop to breakeven.
      </P>
      <P>
        The benefit is obvious: you eliminate the possibility of a full loss on a trade that was working. The cost is also real: you increase the probability of being stopped out for zero gain on trades that need room to breathe before continuing in your direction. Use breakeven stops selectively, not as a default for every trade.
      </P>

      <H2>Moving Stops Against the Trade: A Discipline Problem</H2>
      <P>
        The practice of moving a stop loss further away when the trade goes against you — to avoid being stopped out — is not a stop loss adjustment strategy. It is a discipline failure. Your original stop was placed for a reason: it represented the price at which your trade thesis fails. Moving it away from your entry does not change that reality. It only increases the amount you will lose when the thesis finally fails.
      </P>

      <Takeaways items={[
        'Stop losses should be placed at structural levels where the trade thesis is invalidated — not based on arbitrary pip counts or dollar amounts.',
        'The correct order: identify stop level first, then calculate position size. Never reverse this.',
        'Structure-based stops (below support / above resistance) are the most logically sound and widely applicable method.',
        'ATR-based stops (1.5–2× the 14-period ATR) adapt automatically to market volatility.',
        'Candle-based stops are clean for price action setups but should be cross-referenced with structure.',
        'Moving a stop loss against your trade is a discipline problem, not a strategy adjustment.',
      ]} />
    </BlogArticleLayout>
  );
}
