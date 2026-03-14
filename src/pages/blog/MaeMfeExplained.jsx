import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function MaeMfeExplained() {
  return (
    <BlogArticleLayout
      slug="mae-mfe-explained"
      title="MAE & MFE: The Two Numbers That Tell You If You're Leaving Money on the Table"
      metaTitle="MAE & MFE Explained: Are You Leaving Money on the Table? | K.M.F. Trading Journal"
      metaDescription="Maximum Adverse Excursion (MAE) and Maximum Favorable Excursion (MFE) reveal if your stop loss is too wide, if you exit too early, or if your entries are poorly timed. Learn how to use them."
      date="March 14, 2026"
      dateISO="2026-03-14"
      readTime="8 min read"
      category="Statistics"
      categoryColor="#4FC3F7"
      relatedArticles={[
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
        { slug: 'profit-factor-vs-win-rate', title: 'Profit Factor vs Win Rate: Which Metric Actually Predicts Trading Success?', category: 'Statistics' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
      ]}
    >
      <Intro>
        You close a trade with +$80 profit and feel pretty good about yourself. Coffee tastes better, the sun seems brighter, you consider updating your LinkedIn bio to "Professional Trader." But here's what you didn't see: at one point during that trade, you were up $320. You gave back 75% of your potential profit. That's not a win — that's an expensive leak in your strategy. MAE and MFE are the two metrics that catch leaks like this, and most traders have never heard of them.
      </Intro>

      <H2>Wait, What Are MAE and MFE?</H2>
      <P>
        Let's break them down in plain language, because the full names sound like they belong in a medical textbook:
      </P>
      <H3>MAE — Maximum Adverse Excursion</H3>
      <P>
        This is the worst point your trade reached before you closed it. In simple terms: how much was the trade losing at its worst moment? If you bought EURUSD and price dropped 40 pips against you before coming back and hitting your take profit — your MAE for that trade is 40 pips (or the dollar equivalent).
      </P>
      <P>
        Think of it as the "I almost had a heart attack" number. The deeper the trade went against you before recovering, the higher your MAE.
      </P>
      <H3>MFE — Maximum Favorable Excursion</H3>
      <P>
        This is the best point your trade reached before you closed it. How much was the trade winning at its peak? If price went 120 pips in your favor but you closed at +60 pips because you got nervous — your MFE is 120 pips. You captured only half of what the market offered you.
      </P>
      <P>
        Think of it as the "I could have been rich" number. We all have one. Some of us have hundreds.
      </P>

      <Callout title="The Simple Version" color="#4FC3F7">
        MAE tells you how much pain your trades go through before working. MFE tells you how much money you leave on the table by exiting too early. Together, they reveal if your stops are well-placed and if your exits are costing you money.
      </Callout>

      <Divider />

      <H2>Why Should You Care?</H2>
      <P>
        Because win rate and P/L don't tell you the whole story. You can have a 60% win rate and still be making fundamental mistakes in your execution. MAE and MFE expose the two most expensive habits in trading:
      </P>
      <H3>The Stop Loss Problem (MAE reveals this)</H3>
      <P>
        Imagine you discover that across your last 50 trades, winning trades had an average MAE of only 15 pips — meaning price barely went against you before going in your direction. But your stop loss is set at 50 pips. That means you're risking 50 pips on trades that typically only go 15 pips against you.
      </P>
      <P>
        What does that tell you? Your stop is probably too wide. You're risking more than necessary, which hurts your risk:reward ratio on every single trade. A tighter stop at, say, 25 pips would have saved capital on the losers while still holding almost every winner.
      </P>

      <H3>The Early Exit Problem (MFE reveals this)</H3>
      <P>
        Now imagine that your average closed profit is +40 pips, but your average MFE is +110 pips. That means the market was routinely offering you 110 pips, and you were grabbing 40 and running. You're capturing only 36% of the move.
      </P>
      <P>
        This is incredibly common. Fear of giving back profit makes traders exit early. It feels safe. It feels smart. But the data says it's the most expensive habit you have — because over 100 trades, the difference between capturing 40% vs 70% of MFE can be the difference between a mediocre year and a life-changing one.
      </P>

      <Divider />

      <H2>How to Read MAE Data (With Examples)</H2>
      <P>
        The most useful way to analyze MAE is to compare it across your winning and losing trades:
      </P>
      <Table
        headers={['Trade Type', 'Avg MAE', 'Your Stop Loss', 'What It Means']}
        rows={[
          ['Winners', '12 pips', '40 pips', 'Stop is 3x wider than needed for winners — tighten it'],
          ['Losers', '42 pips', '40 pips', 'Losers blow right through the stop — stop placement is correct'],
          ['Winners', '35 pips', '40 pips', 'Winners barely survive — stop is about right, but tight'],
          ['All trades', '8 pips', '50 pips', 'You\'re scared of tiny drawdowns but risking 50 pips — mismatch'],
        ]}
      />
      <P>
        The golden insight: if your winners have very low MAE (meaning they go in your favor almost immediately), your stop can probably be tightened. If your winners have MAE close to your stop level (meaning they dance near your stop before working), your stop is necessary — don't touch it.
      </P>

      <H2>How to Read MFE Data (With Examples)</H2>
      <P>
        MFE analysis answers the question every trader secretly asks: "Am I getting out too early?"
      </P>
      <Table
        headers={['Avg MFE', 'Avg Closed P/L', 'Capture Rate', 'Diagnosis']}
        rows={[
          ['+95 pips', '+88 pips', '93%', 'Excellent — capturing almost everything'],
          ['+120 pips', '+45 pips', '38%', 'Exiting way too early — leaving serious money'],
          ['+60 pips', '+55 pips', '92%', 'Good capture, but MFE is small — consider holding longer'],
          ['+200 pips', '+70 pips', '35%', 'Major leak — you\'re closing winners at 1/3 of potential'],
        ]}
      />
      <P>
        A healthy capture rate — MFE vs actual closed P/L — is somewhere between 60-80%. Below 50% means you're systematically cutting winners short. Above 90% probably means your targets are too tight and you could let more trades run.
      </P>

      <Callout title="The Uncomfortable Truth" color="#FFB300">
        Most traders who analyze their MFE for the first time discover they're capturing less than 40% of the available move. The emotional comfort of taking a small profit feels good in the moment, but over hundreds of trades, it's the biggest source of lost performance. The data doesn't lie, even when your gut does.
      </Callout>

      <Divider />

      <H2>How to Actually Track MAE and MFE</H2>
      <P>
        Here's the thing — most platforms don't calculate this for you automatically. You need a trading journal that records not just your entry and exit, but also the high and low points of each trade while it was open. Here's how to do it:
      </P>
      <Ul items={[
        'When you close a trade, note the worst point it reached against you during the trade (that\'s your MAE)',
        'Note the best point it reached in your favor during the trade (that\'s your MFE)',
        'Record both in pips or dollars alongside your normal trade data',
        'After 30+ trades, calculate averages for winners and losers separately',
        'Compare your average MAE to your stop loss distance — is there a mismatch?',
        'Compare your average closed P/L to your average MFE — what\'s your capture rate?',
      ]} />
      <P>
        A good trading journal calculates this automatically from your entry, stop loss, and the trade's price action. If you're doing it manually, set a reminder to check the chart one last time before logging the trade.
      </P>

      <H2>Three Adjustments MAE/MFE Data Suggests</H2>
      <H3>1. Tighten stops when MAE is consistently low</H3>
      <P>
        If your winners typically have MAE under 15 pips but your stop is at 40, experiment with a 25-pip stop. You'll lose slightly more trades that used to barely survive, but your risk per trade drops by 37%. Run the numbers — the net effect is almost always positive.
      </P>
      <H3>2. Use trailing stops when MFE is high but capture is low</H3>
      <P>
        If the market routinely offers you +100 pips but you close at +40 because you're scared, a trailing stop solves this mechanically. Let the market decide when the move is over. Set a trailing stop that activates after a certain profit level and follows price at a fixed or ATR-based distance.
      </P>
      <H3>3. Consider partial exits</H3>
      <P>
        If your MFE data shows that some trades run +200 but most stop at +80, consider taking half off at +80 (securing profit) and letting the rest ride with a trailing stop. You capture guaranteed profit while staying exposed to the outlier wins that make the real difference.
      </P>

      <Takeaways items={[
        'MAE (Maximum Adverse Excursion) = the worst point your trade reached before you closed it. It tells you if your stop loss is too wide.',
        'MFE (Maximum Favorable Excursion) = the best point your trade reached before you closed it. It tells you if you\'re exiting too early.',
        'If your winners have low MAE, your stop is probably wider than necessary — tighten it to improve risk:reward.',
        'If your capture rate (closed P/L vs MFE) is below 50%, you\'re systematically leaving money on the table by exiting early.',
        'Track MAE and MFE for at least 30 trades before making adjustments — small samples lie.',
        'Three practical fixes: tighter stops (when MAE is low), trailing stops (when MFE is high), and partial exits (when moves vary widely).',
      ]} />
    </BlogArticleLayout>
  );
}
