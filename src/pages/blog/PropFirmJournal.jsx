import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Divider
} from '../../components/blog/BlogArticleLayout';

export default function PropFirmJournal() {
  return (
    <BlogArticleLayout
      slug="prop-firm-trading-journal"
      title="Prop Firm Killers: How a Trading Journal Saves Your Funded Account"
      metaTitle="Prop Firm Trading Journal: How to Pass Evaluations & Keep Your Funded Account | K.M.F."
      metaDescription="Most prop firm failures aren't bad trades — they're broken rules. Learn how a trading journal with risk calculator and checklists prevents daily drawdown breaches and keeps your funded account alive."
      date="February 23, 2026"
      dateISO="2026-02-23"
      readTime="9 min read"
      category="Risk Management"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
      ]}
    >
      <Intro>
        You spent two weeks passing Phase 1. Another two weeks grinding through Phase 2. You finally get the funded account — $50,000, real money, real rules. On day four, you take a slightly oversized position on GBP/JPY. It goes against you 80 pips. You're down 3.2% on the day. The daily drawdown limit is 4%. One more bad candle and it's over. Everything you worked for — gone in four days. This isn't a hypothetical. This is the most common prop firm story in existence.
      </Intro>

      <H2>Why Prop Firms Are Different</H2>
      <P>
        Trading a personal account and trading a prop firm account are fundamentally different games. With your own money, a 5% drawdown day is painful but survivable. With a prop firm, a 5% drawdown day means you lose the account. Period. No second chances. No "I'll make it back tomorrow." The account is closed, and if you want to try again, you pay another evaluation fee.
      </P>
      <P>
        Most prop firm rules look something like this: maximum daily loss of 4-5%, maximum total drawdown of 8-10%, minimum trading days, no holding through news events. These rules are strict, unforgiving, and absolute. And they are designed to catch exactly the kind of impulsive, undisciplined behavior that most retail traders default to under pressure.
      </P>
      <P>
        The traders who pass evaluations and keep funded accounts are not the ones with the best strategies. They are the ones with the best discipline systems. And a well-configured trading journal is the most effective discipline system you can build.
      </P>

      <Divider />

      <H2>The Three Ways Traders Lose Funded Accounts</H2>

      <H3>1. The Oversized Revenge Trade</H3>
      <P>
        It starts with a normal loss. -0.8% on the day. Fine. Then another: -0.5%. Now you're down 1.3% and feeling the pressure. Instead of stopping, you double your next position to "get it back fast." That trade goes against you. Suddenly you're at -3.5% and one stop loss away from breach. This escalation pattern is the single most common account killer in prop trading.
      </P>

      <H3>2. The Position Sizing Mistake</H3>
      <P>
        On a $100,000 FTMO account with a 5% daily drawdown limit, your maximum daily loss is $5,000. If you take three trades, each can risk a maximum of ~$1,650. But most traders calculate lot size based on "what feels right" rather than on the actual drawdown limit. They risk $2,500 per trade, take three trades, and one bad session wipes them out. The math was wrong before the first trade was even placed.
      </P>

      <H3>3. The "Just One More Trade" Spiral</H3>
      <P>
        You've hit your daily loss limit — or you're dangerously close. The rational move is to close the platform. But there's a perfect setup forming. Just one more. This time it'll work. It doesn't. And now the account is breached not because of bad trading, but because you didn't have a system to force you to stop.
      </P>

      <Callout title="The pattern" color="#FF5252">
        Notice that none of these failures are about strategy. They're about risk management and discipline. The trade setups were often perfectly valid. The position sizes, the emotional escalation, and the inability to stop — those were the killers.
      </Callout>

      <Divider />

      <H2>Building a Prop Firm Survival System</H2>
      <P>
        Here is how to structure your trading journal to protect your funded account. Think of it as a safety net that catches you before you breach — not after.
      </P>

      <H3>Pre-Session: Know Your Numbers</H3>
      <P>
        Before you open a single chart, calculate three numbers for today:
      </P>
      <Ul items={[
        'Maximum daily loss in dollars (account size × daily drawdown % — e.g., $50,000 × 4% = $2,000)',
        'Maximum risk per trade in dollars (daily max ÷ planned number of trades — e.g., $2,000 ÷ 3 = $666)',
        'Current buffer to total drawdown (how much room you have left before the trailing max drawdown is breached)',
      ]} />
      <P>
        Write these numbers in your journal before the session. They are your boundaries. Every decision for the rest of the day must fit within them.
      </P>

      <H3>Pre-Trade: The Prop Firm Checklist</H3>
      <P>
        Your pre-trade checklist for a funded account should include two additional items that personal accounts don't need:
      </P>
      <Ul items={[
        '"If this trade hits stop loss, am I still within my daily drawdown limit?" — If the answer is no, the trade cannot be taken, regardless of how good the setup is.',
        '"How many trades have I already taken today, and what is my P/L so far?" — This prevents the "just one more" spiral by forcing you to confront your current position before adding risk.',
      ]} />

      <Callout title="How K.M.F. handles this" color="#4FC3F7">
        K.M.F.'s lot size calculator computes exact position sizes based on your account balance, risk percentage, and stop loss distance. For a prop firm account, set your risk to 1-1.5% maximum per trade. The pre-trade checklist verifies that every entry meets your criteria — including the risk criteria — before you place the order. If you skip a checkbox, the checklist is incomplete. It's a mechanical safeguard against impulsive execution.
      </Callout>

      <Divider />

      <H3>During the Session: The Hard Stop Rule</H3>
      <P>
        Decide in advance: "If I reach X% daily loss, I close the platform. Not after the next trade. Now." For most prop firm accounts, this should be set at 60-70% of the allowed daily drawdown. If the limit is 5%, your hard stop is at 3%. This gives you a buffer zone — because the moment you hit your self-imposed limit and walk away, you still have 2% of breathing room in case of slippage or a gap on an open position.
      </P>
      <P>
        Log this rule in your journal. After the session, write down whether you honored it. If you didn't — if you kept trading after hitting your limit — that's the most important data point of the day. Not the P/L. The discipline breach.
      </P>

      <H3>Post-Session: The Daily Audit</H3>
      <P>
        At the end of every trading day, log three things in your journal:
      </P>
      <Ul items={[
        'Daily P/L as a percentage of the account — not in dollars. Percentages keep the drawdown rules in focus.',
        'Number of trades taken vs. planned maximum — if you planned 3 trades and took 6, that\'s a discipline failure regardless of the outcome.',
        'Emotional state at each entry — were any of today\'s trades driven by frustration, revenge, or boredom rather than a valid setup?',
      ]} />

      <Divider />

      <H2>Maria's Story: How Journaling Saved a $100K Account</H2>
      <P>
        Maria passed her FTMO evaluation on the second attempt. She had already lost one funded account in her first month — two revenge trades on a single Thursday wiped out her daily drawdown. This time, she was determined to do it differently.
      </P>
      <P>
        She set up a strict routine: every morning, she wrote her daily max loss ($5,000) and her per-trade risk ($1,200) in her journal. She ran every setup through her checklist. After two losses in a day, she closed the platform — no exceptions. She logged her emotional state before every trade: confident, neutral, anxious, frustrated.
      </P>
      <P>
        After six weeks, something remarkable showed up in her data. On days she marked "anxious," her win rate was 31%. On days she marked "confident" or "neutral," it was 62%. The strategy was the same. The setups were the same. The only variable was her. Armed with that data, she made a rule: if her pre-session emotional check came back as anxious or frustrated, she traded half-size or didn't trade at all.
      </P>
      <P>
        Three months later, she's still funded. Not because she found a better strategy, but because she built a system that protects the account from herself.
      </P>

      <Divider />

      <H2>The Prop Firm Mindset</H2>
      <P>
        The traders who keep funded accounts long-term share one mental model: they treat the prop firm's rules not as restrictions, but as their trading strategy. The daily drawdown limit isn't an obstacle — it's the most important rule in their plan. The position size limit isn't a constraint — it's a risk management feature they couldn't impose on themselves before.
      </P>
      <P>
        A trading journal transforms these external rules into internal habits. When you log every trade against the drawdown limit, when you run every setup through a checklist, when you review every week whether you honored your hard stop — the rules become automatic. And that's when prop trading stops being a stress test and starts being a career.
      </P>

      <Takeaways items={[
        'Most prop firm failures come from position sizing errors, revenge trading, and inability to stop — not from bad strategies.',
        'Calculate your daily max loss and per-trade risk before every session. Write them down. They are your absolute boundaries.',
        'Add two prop-specific items to your pre-trade checklist: "Am I within daily drawdown?" and "How many trades have I taken today?"',
        'Set a hard stop at 60-70% of the allowed daily drawdown. Close the platform when you hit it. Log whether you honored it.',
        'Track emotional state per trade. The correlation between emotions and outcomes is the most valuable data a prop trader can have.',
      ]} />
    </BlogArticleLayout>
  );
}
