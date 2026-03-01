import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function TenQuestionsAfterEveryTrade() {
  return (
    <BlogArticleLayout
      slug="10-questions-after-every-trade"
      title="10 Questions Every Trader Should Ask After Every Trade"
      metaTitle="10 Post-Trade Review Questions Every Trader Should Ask | K.M.F. Trading Journal"
      metaDescription="The questions you ask after a trade matter more than the result. Here are 10 post-trade review questions that will accelerate your development as a trader."
      date="January 30, 2026"
      dateISO="2026-01-30"
      readTime="5 min read"
      category="Improvement"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'good-loss-vs-bad-win', title: 'Good Losses, Bad Wins: Why the Trade You\'re Proud of Might Be Your Worst', category: 'Improvement' },
        { slug: 'weekly-trading-review-template', title: 'How to Do a Weekly Trading Review (With a Complete Template)', category: 'Improvement' },
        { slug: 'r-multiple-explained', title: 'R-Multiple Explained: How to Measure Trade Quality (Not Just Profit)', category: 'Statistics' },
      ]}
    >
      <Intro>
        The average retail trader closes a trade, checks the profit or loss number, and moves on. Maybe they feel good. Maybe they feel frustrated. And then they repeat the same patterns next week, next month, and next year. The traders who improve rapidly do something different: they interrogate every trade with specific, structured questions that separate what happened from why it happened.
      </Intro>

      <H2>Why Post-Trade Review Matters</H2>
      <P>
        Here is the uncomfortable truth about trade outcomes: you can execute a trade perfectly and lose money. You can execute a trade terribly and make money. In the short term, outcomes and quality of execution are only loosely correlated. The market introduces noise — unexpected news, liquidity events, random price fluctuations — that can produce any outcome regardless of your process.
      </P>
      <P>
        This means that if you only evaluate trades by their P/L, you will sometimes reinforce bad habits (when lucky trades win) and sometimes punish good habits (when disciplined trades lose to noise). Post-trade review is how you separate signal from noise and evaluate the actual quality of your decisions.
      </P>
      <Callout title="The Core Principle" color="#FFB300">
        A losing trade executed perfectly according to your rules is a better trade than a winning trade taken impulsively. Post-trade questions help you see the difference — and over hundreds of trades, they redirect your reinforcement toward good process rather than random outcomes.
      </Callout>

      <Divider />

      <H2>The 10 Questions</H2>

      <H3>1. Did I follow my entry criteria exactly?</H3>
      <P>
        Not approximately — exactly. Your entry criteria exist because they define the market conditions under which your strategy has edge. A partial match means partial edge, at best. This question forces a binary answer: yes or no. If no, what specifically was different, and why did you enter anyway?
      </P>

      <H3>2. Was my stop loss placement based on structure or arbitrary?</H3>
      <P>
        A stop loss should be placed at a price level that definitively invalidates your trade thesis — below a support level, above a resistance level, beyond a swing point. An arbitrary stop placed because "$50 feels like a reasonable loss" is not a stop loss. It is a prayer. This question verifies that your risk was defined by market logic, not convenience.
      </P>

      <H3>3. Did I size the position correctly for my risk rules?</H3>
      <P>
        Calculate the actual risk percentage this trade represented. Did it match your intended risk? If not, was the deviation intentional and justified, or did you size by feel? Consistent position sizing is one of the most important — and most often violated — rules in trading.
      </P>

      <H3>4. What was my emotional state before entering?</H3>
      <P>
        Rate your emotional state on a simple 1–10 scale (1 = extremely agitated, 10 = completely calm and focused). Research shows that trading quality degrades as emotional arousal increases, particularly above a threshold most traders would rate around 6 or 7. Tracking this number over time reveals whether emotional state correlates with outcomes in your specific trading.
      </P>

      <H3>5. Did I have a clear exit plan before entering?</H3>
      <P>
        Before you enter any trade, you should know exactly where you will exit with a loss (stop loss) and exactly where you plan to exit with a profit (target or conditions). If either was undefined at the time of entry, that is a significant process failure. Undefined exits lead to exits driven by emotion in real time — exactly the wrong condition.
      </P>

      <H3>6. Did I move my stop loss against my trade? Why?</H3>
      <P>
        Moving a stop loss further away from your entry to avoid being stopped out is one of the most destructive trading behaviors. If you did it on this trade, record it honestly and examine the justification you gave yourself in the moment. "The setup is still valid" is often a rationalization for hope rather than a genuine technical assessment.
      </P>

      <H3>7. Was the market condition suitable for this strategy?</H3>
      <P>
        Most strategies work well in specific market conditions and poorly in others. A breakout strategy often fails in choppy, range-bound markets. A mean-reversion strategy struggles during strong trends. Did the market condition at the time of entry match the conditions for which your strategy is designed? If not, was taking the trade appropriate?
      </P>

      <H3>8. What would I do differently?</H3>
      <P>
        This is not about beating yourself up. It is about extracting a specific, actionable lesson. "I should have waited for the candle to close before entering" is useful. "I should have been better" is not. One concrete behavioral change per trade, recorded in writing, is how skills actually develop over time.
      </P>

      <H3>9. What did I do well, regardless of outcome?</H3>
      <P>
        This question is as important as any other. Reinforcing good process is essential, especially when good process leads to a loss (which it sometimes will). If you followed your checklist perfectly, sized correctly, placed a logical stop, and the trade still lost — that deserves to be noted as a disciplined execution, not a failure.
      </P>

      <H3>10. What is my R-multiple on this trade?</H3>
      <P>
        Calculate the R-multiple: actual P/L divided by your initial risk. Record this number for every trade. Over time, your average R-multiple reveals whether your strategy has positive expectancy and tells you far more about your performance than dollar P/L.
      </P>

      <Divider />

      <H2>How to Use These Questions</H2>
      <P>
        You do not need to write an essay for each question. A few words or a sentence is enough. The discipline of consistently answering these questions after every trade builds a database of self-knowledge that becomes enormously valuable over time.
      </P>
      <Table
        headers={['Question', 'Answer Format', 'Time Required']}
        rows={[
          ['Entry criteria followed?', 'Yes / No + brief note if No', '10 seconds'],
          ['Stop loss basis?', 'Structure / Arbitrary', '5 seconds'],
          ['Position size correct?', 'Actual % vs target %', '15 seconds'],
          ['Emotional state (1–10)?', 'Single number', '5 seconds'],
          ['Exit plan defined before entry?', 'Yes / No', '5 seconds'],
          ['Stop moved against trade?', 'Yes / No + reason if Yes', '10 seconds'],
          ['Market condition suitable?', 'Yes / No + condition description', '15 seconds'],
          ['What to do differently?', 'One specific behavior', '20 seconds'],
          ['What was done well?', 'One specific behavior', '15 seconds'],
          ['R-multiple?', 'Number (e.g., +1.8R)', '15 seconds'],
        ]}
      />
      <P>
        Total time: approximately 2 minutes per trade. Over a trading career, that 2 minutes per trade is the difference between stagnation and systematic improvement.
      </P>

      <Takeaways items={[
        'Evaluating trades only by P/L reinforces random outcomes, not quality of process.',
        'Post-trade questions separate what you can control (execution) from what you cannot (market outcome).',
        'The emotional state rating (1–10) per trade, tracked over time, reveals whether psychology correlates with your performance.',
        'Recording one specific thing to do differently per trade creates an actionable improvement log.',
        'The R-multiple question ensures every trade contributes to your strategy\'s expectancy data.',
        'Two minutes of structured review per trade compounds into significant performance improvement over time.',
      ]} />
    </BlogArticleLayout>
  );
}
