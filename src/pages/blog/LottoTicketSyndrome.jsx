import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../components/blog/BlogArticleLayout';
import { LottoTicketChart } from '../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function LottoTicketSyndrome() {
  return (
    <BlogArticleLayout
      slug="lotto-ticket-syndrome"
      title="The 'Lotto Ticket' Syndrome: Why You Increase Risk After a Big Win"
      metaTitle="Why You Double Your Risk After a Big Win (And Lose Everything) | K.M.F."
      metaDescription="After a big win, your brain floods with dopamine and you feel invincible. Then you double your risk and lose a week's profit in one trade. The neuroscience of post-win euphoria."
      date="March 22, 2026"
      dateISO="2026-03-22"
      readTime="9 min read"
      category="Psychology"
      categoryColor="#CE93D8"
      relatedArticles={[
        { slug: 'confidence-vs-overconfidence', title: 'Confidence vs Overconfidence: The Invisible Line That Separates Winners from Blowups', category: 'Psychology' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
        { slug: 'overtrading-checklist', title: 'Overtrading Checklist: 8 Signs You Are Tilting Without Realizing It', category: 'Discipline' },
      ]}
      faqItems={[
        { question: 'Why do traders increase risk after winning?', answer: 'Dopamine released after a win creates a feeling of invincibility. The brain interprets the win as evidence of skill (even if it was variance), leading to overconfidence. This manifests as larger position sizes, looser risk rules, and trading setups you would normally skip.' },
        { question: 'What is house money effect in trading?', answer: 'The house money effect is a cognitive bias where people take bigger risks with money they perceive as "winnings" rather than "theirs." After a profitable week, traders mentally separate the profit from their capital and treat it as disposable, leading to oversized trades.' },
        { question: 'How do I stop over-risking after a winning streak?', answer: 'Implement a fixed risk rule that does not change based on recent results. Risk the same 1% per trade whether you are on a 5-trade win streak or a 5-trade losing streak. Track your position sizes in your journal and flag any trade that exceeds your standard risk.' },
        { question: 'Is euphoria dangerous in trading?', answer: 'Yes. Euphoria and tilt are equally dangerous — both override rational decision-making. Euphoria leads to oversized positions and sloppy entries. Tilt leads to revenge trades and abandoned stops. The ideal emotional state for trading is calm neutrality, not excitement.' },
      ]}
      howToSteps={[
        { name: 'Set a fixed risk percentage that never changes', text: 'Define your standard risk (e.g., 1% per trade) and write it as an absolute rule. This number does not increase after wins or decrease after losses. It is constant regardless of recent performance.' },
        { name: 'Flag "euphoria trades" in your journal', text: 'After every trade, rate your emotional state. Any trade taken with a self-rating of "excited" or "confident beyond normal" gets flagged for later review. K.M.F. logs pre-trade emotional state for exactly this purpose.' },
        { name: 'Implement the 24-hour cooling rule after big wins', text: 'After any single trade that returns more than 2R, or any day that returns more than 3% account growth, do not trade for the remainder of the session. Return the next day with fresh cortisol and dopamine levels.' },
        { name: 'Review your flagged trades monthly', text: 'Filter your journal for euphoria-flagged trades and compare their R-multiples to your baseline. In almost every case, post-win euphoria trades underperform calm trades. Let the data prove the pattern.' },
        { name: 'Use a position size calculator every single trade', text: 'Never calculate position size in your head or "feel" the right amount. Input your account balance, risk percentage, and stop distance into a calculator every time. K.M.F. has a built-in lot calculator that removes the temptation to round up.' },
      ]}
    >
      <Intro>
        Monday morning. Two clean trades, both hit take profit. +$475. You feel good — not reckless, just good. Tuesday, another winner. +$410. You are up almost a thousand dollars and the week is only half done. Now here is where it gets dangerous. Wednesday morning, you see a setup that is... okay. Not great. But you are on a streak. You know what your brain whispers? "You are playing with house money now. You can afford to take a bigger shot." So instead of your normal 1% risk, you go 2.5%. The trade goes against you. -$625 in a single candle. Thursday you try to make it back — 3.5% risk this time. Another loss. -$1,050. In 48 hours, you went from "best week ever" to "worse than where I started." Welcome to the Lotto Ticket Syndrome.
      </Intro>

      <StatsStrip items={[
        { value: 6.25, decimals: 2, suffix: '%', label: <>probability of 4 wins<br />in a row at 50% win rate</> },
        { value: 3, decimals: 0, suffix: '%', label: <>daily gain that should<br />trigger a session stop</> },
        { value: 24, decimals: 0, suffix: 'h', label: <>dopamine normalization<br />after a big win</> },
      ]} />

      <H2>The Dopamine Trap</H2>
      <P>
        When you win a trade, your brain releases dopamine — the same neurotransmitter triggered by gambling wins, social media likes, and yes, winning lottery tickets. Dopamine does not make you feel "happy." It makes you feel <strong>certain</strong>. It creates a subjective experience of competence and control that has nothing to do with your actual skill level.
      </P>
      <P>
        After a winning streak, dopamine levels are elevated. Your brain starts pattern-matching: "I won three in a row, therefore I have an edge right now." But that "edge" is an illusion — three consecutive wins at a 40% win rate have a 6.4% probability. It is uncommon but completely random. The dopamine does not care. It tells you this is skill.
      </P>

      <Callout title="The House Money Effect" color="#CE93D8">
        Behavioral economists call it the "house money effect": people take bigger gambles with money they perceive as winnings rather than earned capital. In trading, this means the $900 you made this week feels like "free money" — so risking $600 of it on one trade does not trigger the same alarm as risking $600 of your base capital. But your account does not know the difference. A dollar lost from winnings destroys your equity exactly as much as a dollar lost from deposits.
      </Callout>

      <LottoTicketChart />

      <P>
        This chart is every trader's biography. Monday is disciplined. Tuesday is still okay but the risk is creeping up. By Wednesday, the same trader who would never risk 2.5% on a normal day is doing it because "I am up big, I can afford it." The brain makes the escalation feel logical in the moment. It is not.
      </P>

      <Divider />

      <H2>The 4 Stages of Post-Win Self-Destruction</H2>
      <Table
        headers={['Stage', 'What Happens', 'What You Tell Yourself']}
        rows={[
          ['1. Validation', { value: 'First 2-3 wins confirm your analysis', color: 'green' }, '"My strategy is working perfectly right now"'],
          ['2. Elevation', { value: 'Risk increases "just a little"', color: 'gold' }, '"I will go 1.5% instead of 1% — I have a buffer"'],
          ['3. Invincibility', { value: 'Rules loosen, setups get weaker', color: 'red' }, '"I can feel the market today. I am in the zone."'],
          ['4. Crater', { value: 'One oversized loss, then panic trades', color: 'red' }, '"I just need one trade to get back to where I was"'],
        ]}
      />
      <P>
        Stage 4 is where the real damage happens — and it is not the first loss that kills you. It is the attempt to recover from that loss using the same inflated risk that caused it. You took a 2.5% hit, so you try to make it back with a 3.5% trade, then a 4% trade. This is no longer trading. This is <Link to="/blog/revenge-trading-kill-switch" className="text-kmf-accent hover:underline">revenge trading</Link> with a chart open.
      </P>

      <H2>Why Win Streaks Are Statistically Meaningless</H2>
      <P>
        Here is the math your dopamine-soaked brain refuses to process: in a strategy with a 50% win rate, the probability of hitting 4 consecutive winners is 6.25%. That means in every 100 trades, you will experience roughly 6 runs of 4+ wins. Each one will feel like "being in the zone." Each one is pure variance.
      </P>
      <P>
        A <Link to="/blog/confidence-vs-overconfidence" className="text-kmf-accent hover:underline">winning streak</Link> tells you nothing about the next trade. The market has no memory. Your last three trades being profitable does not change the probability of the fourth trade by a single percentage point. But your brain — wired for pattern recognition in a world of saber-toothed tigers — cannot accept this. It insists there is a pattern. There is not.
      </P>

      <Callout title="The Gambler's Confidence" color="#FFB300">
        Casinos know this better than anyone. After a run of wins at the blackjack table, players bet bigger — the casino calls them "hot." The house edge does not change. The cards do not know what happened before. But the player feels different. Trading desks work the same way, except the stakes are your rent money.
      </Callout>

      <Divider />

      <H2>The Fix: How to Stay Boring While Making Money</H2>
      <H3>1. The Iron Risk Rule</H3>
      <P>
        Your risk per trade is a constant. Not a guideline. Not a "usually." A physical law of your trading. <Link to="/blog/1-percent-risk-rule" className="text-kmf-accent hover:underline">One percent means one percent</Link> — whether you are up $2,000 for the week or down $500. The moment your risk percentage becomes a variable that adjusts based on "how you feel," you have handed your account to your limbic system. It will not give it back.
      </P>
      <H3>2. The 24-Hour Cooling Rule</H3>
      <P>
        After any single trade that returns more than 2R, or any day where your account grows more than 3%, stop trading for the rest of the session. Not because you are doing anything wrong — but because your dopamine levels need 12-24 hours to normalize. The best trade of the week is often the one you do not take on a euphoric Wednesday afternoon.
      </P>
      <H3>3. Calculator Every Single Time</H3>
      <P>
        Never, ever calculate position size in your head after a winning streak. Your "head math" will conveniently round up. Use a calculator — input balance, risk %, and stop distance mechanically. K.M.F. has a lot size calculator built in: you put in your account size, risk percentage, and stop distance, and it tells you the exact lot size. No room for your dopamine to negotiate.
      </P>
      <H3>4. Flag and Review</H3>
      <P>
        In your journal, rate your emotional state before every trade. Any trade where you feel "excited," "confident," or "in the zone" gets a flag. At the end of the month, filter for flagged trades and compare their average R-multiple against your unflagged trades. In almost every case, the euphoria trades underperform. K.M.F. logs your pre-trade emotional state automatically — you can filter and compare in the statistics view.
      </P>

      <H2>The Uncomfortable Realization</H2>
      <P>
        The best trading feels boring. Not exciting. Not thrilling. Boring. You enter. You wait. You exit at your level. You feel nothing — and that nothing is the highest-performance emotional state you can achieve. The moment trading feels exciting, you are no longer operating from your analytical brain. You are operating from the same neural circuitry that makes people buy scratch tickets at gas stations. Euphoria is tilt in a good mood. The damage is identical.
      </P>

      <Takeaways items={[
        'Dopamine from winning trades creates a false sense of certainty and control. Three consecutive wins at 40% win rate have a 6.4% probability — it is variance, not skill.',
        'The "house money effect" makes you treat winnings as disposable, leading to oversized trades. Your account does not know the difference between deposited and earned dollars.',
        'Post-win self-destruction follows a predictable 4-stage pattern: validation, elevation, invincibility, crater. Stage 4 is where accounts die.',
        'Risk percentage must be a constant, not a variable. 1% means 1% whether you are up $2,000 or down $500.',
        'After any 2R+ trade or 3%+ daily return, stop trading for the remainder of the session. Your dopamine needs 12-24 hours to normalize.',
        'The best trading feels boring. Excitement is a warning sign, not a performance indicator. Euphoria is tilt wearing a smile.',
      ]} />
    </BlogArticleLayout>
  );
}
