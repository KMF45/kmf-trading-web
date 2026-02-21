import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function WeeklyTradingReviewTemplate() {
  return (
    <BlogArticleLayout
      slug="weekly-trading-review-template"
      title="How to Do a Weekly Trading Review (With a Complete Template)"
      metaTitle="How to Do a Weekly Trading Review: Complete Template | K.M.F. Trading Journal"
      metaDescription="A step-by-step guide to conducting a proper weekly trading review. Includes a complete template with questions to evaluate your performance, discipline, and strategy."
      date="February 20, 2026"
      dateISO="2026-02-20"
      readTime="8 min read"
      category="Improvement"
      categoryColor="#FFB300"
    >
      <Intro>
        The difference between traders who improve and traders who repeat the same mistakes month after month is almost always the same: one group reviews their performance systematically, and the other does not. A weekly trading review is not optional for serious development. It is the mechanism through which patterns become visible, mistakes become lessons, and lessons become habits.
      </Intro>

      <H2>Why Weekly — Not Daily</H2>
      <P>
        Daily reviews are useful for logging trades while details are fresh, but they are too close to the action for pattern recognition. On any given day, you might have had two trades. That is not enough data to notice that you consistently overtrade on Tuesdays, or that your Monday morning setups have a significantly higher loss rate.
      </P>
      <P>
        Weekly reviews offer the right resolution. You have enough trades to spot short-term patterns, enough time has passed to review decisions with emotional distance, and the cadence is frequent enough that you can actually change your behavior in response to what you find.
      </P>
      <Callout title="Timing Recommendation" color="#FFB300">
        Saturday morning is the ideal time for most traders. Markets are closed, the week is fresh in memory, and you have enough distance from Friday's session to review objectively. Block 30–45 minutes and treat it as a non-negotiable appointment.
      </Callout>

      <Divider />

      <H2>The 5 Areas to Review Every Week</H2>

      <H3>1. Statistics Review</H3>
      <P>
        Start with the numbers. Before any qualitative analysis, look at the raw data from the week. This grounds your review in facts rather than impressions, which are often distorted by recency bias (your most recent trade tends to color your perception of the entire week).
      </P>
      <Ul items={[
        'How many trades did I take this week?',
        'What was my win rate, average win, average loss, and profit factor?',
        'What were my best and worst trades, and what made them different?',
      ]} />

      <H3>2. Discipline Review</H3>
      <P>
        Discipline is measurable. For every trade this week, ask whether you followed your rules exactly. Not roughly. Exactly. This creates a "rule-following rate" which is one of the most useful metrics a developing trader can track.
      </P>
      <Ul items={[
        'What percentage of my trades followed my entry criteria without deviation?',
        'Did I respect all stop losses, or did I move any against the trade?',
        'How many trades were impulse trades outside my defined setups?',
      ]} />

      <H3>3. Process Review</H3>
      <P>
        Separate the quality of your process from the quality of the outcome. A trade that followed your rules perfectly but lost money is a better trade than one that broke your rules but made money. Process review trains you to evaluate yourself on what you can actually control.
      </P>
      <Ul items={[
        'Did my entries match my setup criteria for timeframe, structure, and confirmation?',
        'Were my stop losses placed at logical levels, or were they arbitrary?',
        'Did I manage open trades according to my plan, or did I interfere prematurely?',
      ]} />

      <H3>4. Psychological Review</H3>
      <P>
        Emotion leaves fingerprints on your trading data. Larger-than-normal losses, unusually frequent trades, position sizes that deviate from your rules — these often have an emotional cause. This section makes the invisible visible.
      </P>
      <Ul items={[
        'On which days did emotions most affect my decision-making, and what triggered it?',
        'Were there any moments of revenge trading, FOMO entries, or premature exits driven by fear?',
        'What was my overall stress level this week, and how did it correlate with my performance?',
      ]} />

      <H3>5. Goals Review</H3>
      <P>
        A trading session without a goal is just time spent in front of charts. Goals give the week structure and give the review something concrete to evaluate. They should be process-focused, not outcome-focused — "follow my checklist on every trade" is a useful goal; "make $500 this week" is not, because it is not within your direct control.
      </P>
      <Ul items={[
        'Did I achieve the process goals I set at the start of this week?',
        'What one specific thing will I focus on improving next week?',
        'What is one thing I did well this week that I want to reinforce?',
      ]} />

      <Divider />

      <H2>The Complete Weekly Review Template</H2>
      <P>
        Use these 15 questions as your review framework. You do not need to write a novel for each — a sentence or two is enough. The goal is structured reflection, not journaling for its own sake.
      </P>
      <Table
        headers={['Area', 'Question']}
        rows={[
          ['Statistics', 'Total trades, wins, losses, net P/L for the week?'],
          ['Statistics', 'What was my profit factor and average R-multiple this week?'],
          ['Statistics', 'What was my single best trade, and why did it work?'],
          ['Discipline', 'What percentage of trades followed my entry criteria exactly?'],
          ['Discipline', 'Did I respect every stop loss? If not, which trades and why?'],
          ['Discipline', 'How many trades were outside my defined setups?'],
          ['Process', 'Were my entries timed well relative to my setup criteria?'],
          ['Process', 'Were my stop losses placed at structural levels or were they arbitrary?'],
          ['Process', 'Did I exit according to plan, or did emotion drive early or late exits?'],
          ['Psychology', 'Which session or day was most affected by emotion?'],
          ['Psychology', 'Did I revenge-trade, FOMO-enter, or exit early out of fear this week?'],
          ['Psychology', 'How did my life outside trading (sleep, stress) affect my performance?'],
          ['Goals', 'Did I achieve my process goal from last week\'s review?'],
          ['Goals', 'What is the ONE thing I will focus on improving next week?'],
          ['Goals', 'What is one thing I did well this week that I want to consciously repeat?'],
        ]}
      />

      <H2>How to Act on Your Review</H2>
      <P>
        The most common mistake traders make with reviews is identifying five problems and trying to fix all of them simultaneously. This is not how skill development works. Pick one issue — the most impactful one — and focus entirely on it for the next week. Write it down at the top of your trading plan. Review it before each session. At the end of the following week, assess whether you improved on that single metric.
      </P>
      <P>
        Fixing one meaningful thing per week means fixing 50 things per year. Compound improvement at that rate transforms traders.
      </P>

      <H2>How Long Should It Take?</H2>
      <P>
        Thirty to forty-five minutes is the right range. Less than 30 minutes suggests you are moving too quickly and being superficial. More than 45 minutes usually means you are over-analyzing individual trades rather than looking for patterns across the week. The goal is not to re-examine every tick on every chart — it is to extract the three or four key insights that will make next week better.
      </P>

      <Takeaways items={[
        'Weekly reviews are the primary mechanism through which traders actually improve — not screen time alone.',
        'Review five areas every week: Statistics, Discipline, Process, Psychology, and Goals.',
        'Measure your rule-following rate — what percentage of trades followed your plan exactly.',
        'Separate process quality from outcome quality. A perfect loss is more valuable than a lucky win.',
        'Pick ONE thing to improve each week. Focused iteration compounds rapidly over a year.',
        '30–45 minutes on Saturday mornings is the optimal timing for most retail traders.',
      ]} />
    </BlogArticleLayout>
  );
}
