import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function OvertradingChecklist() {
  return (
    <BlogArticleLayout
      slug="overtrading-checklist"
      title="Overtrading Checklist: 8 Signs You're Tilting Without Realizing It"
      metaTitle="8 Signs You're Overtrading Right Now — Stop Before It's Too Late | K.M.F."
      metaDescription="Overtrading is the silent account killer. Learn 8 concrete warning signs that you're tilting, the psychology behind each one, and how to catch yourself before the damage is done."
      date="March 15, 2026"
      dateISO="2026-03-15"
      readTime="7 min read"
      category="Discipline"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'revenge-trading', title: 'Revenge Trading: What It Is, Why It Happens, and How to Break the Cycle', category: 'Psychology' },
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'why-traders-break-their-rules', title: 'Why You Break Your Own Trading Rules — And How to Stop', category: 'Psychology' },
      ]}
      faqItems={[
        { question: 'What is overtrading in forex and stocks?', answer: 'Overtrading means taking more trades than your strategy calls for, usually driven by emotion rather than setup quality. It includes trading too frequently, sizing up impulsively, or entering setups you have not tested — all of which erode your edge and amplify losses.' },
        { question: 'How do I know if I am overtrading?', answer: 'Key signs include: trading more frequently than your historical average, taking setups outside your plan, increasing position size after losses, dropping to lower timeframes to "find" entries, and feeling unable to stop even when you know you should.' },
        { question: 'How does tilt detection work in KMF Trading Journal?', answer: 'KMF monitors four tilt indicators in real time: consecutive losses, lot size increases relative to your average, negative emotional states logged before trades, and deviation from your normal trade frequency. It displays a 4-level warning banner — from mild caution to a strong recommendation to stop — directly on the trade entry screen.' },
      ]}
    >
      <Intro>
        Overtrading is not about taking a lot of trades. Some strategies require high frequency. Overtrading is about taking trades that your strategy did not generate — trades driven by boredom, frustration, fear of missing out, or the compulsion to recover losses. The dangerous part is that tilt rarely announces itself. You do not sit down and decide to overtrade. It creeps in gradually, and by the time you notice, the damage is already significant.
      </Intro>

      <H2>The 8 Warning Signs</H2>

      <H3>1. Your trade frequency has spiked</H3>
      <P>
        If you normally take 3 to 5 trades per session and today you have taken 9, that is a data point worth examining. Frequency spikes almost always indicate emotional trading — the market did not suddenly produce three times as many valid setups. Your filter loosened because your emotional state changed. Track your average trades per session over time so you have a baseline to compare against.
      </P>

      <H3>2. You are skipping your checklist</H3>
      <P>
        The <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">pre-trade checklist</Link> exists precisely for moments like these. When you start telling yourself "I don't need to check, this one is obvious" or "I'll log it afterward," you are in System 1 territory — fast, emotional, and unreliable. The moment your checklist feels like an obstacle rather than a tool, you are tilting. KMF includes a built-in checklist feature with default and custom templates that appears before every trade entry, making it structurally difficult to skip.
      </P>

      <H3>3. You are dropping to smaller timeframes</H3>
      <P>
        If you normally trade the 4-hour chart and find yourself scrolling through the 15-minute or even the 5-minute chart looking for entries, something has shifted. Lower timeframes produce more signals — most of which are noise, not edge. The psychological driver is usually impatience: your timeframe is not producing setups fast enough, so you go looking where the action is. But the action on lower timeframes is not your strategy. It is just movement.
      </P>

      <H3>4. You are trading news events you normally avoid</H3>
      <P>
        Most experienced traders know which economic releases create unpredictable volatility and choose to sit them out. When you find yourself entering trades during NFP, CPI releases, or central bank announcements that you would normally avoid, the motive is almost certainly emotional. The volatility feels like opportunity, but it is unstructured risk — and your strategy was not built for it.
      </P>

      <H3>5. Your position size is creeping up</H3>
      <P>
        This is one of the most dangerous signs because it compounds every other mistake. After a loss, the instinct to increase size to recover faster is powerful and automatic. It does not feel like a conscious decision — it feels like "adjusting." But if your last three trades were at 0.5 lots and this one is at 1.2 lots, you have not adjusted. You have tripled your risk during a period of poor performance. This is the core mechanism behind <Link to="/blog/revenge-trading" className="text-kmf-accent hover:underline">revenge trading</Link>.
      </P>

      <H3>6. You are taking setups you have never tested</H3>
      <P>
        A tilting trader starts seeing patterns everywhere. "That looks like a double bottom." "This could be a breakout." The setups may be real in theory, but if you have never backtested or traded them in your strategy, they carry zero demonstrated edge. You are gambling with the veneer of technical analysis. Stick to setups in your documented playbook.
      </P>

      <H3>7. You cannot stop looking at the screen</H3>
      <P>
        Healthy trading includes time away from charts. When you find yourself unable to close the platform — refreshing, scrolling, watching every tick — your nervous system is in a hyperaroused state. This is not focus. It is compulsion. The brain has locked onto trading as a source of stimulation, and stepping away feels unbearable. That feeling is itself the strongest signal to step away.
      </P>

      <H3>8. You are telling yourself "just one more trade"</H3>
      <P>
        This phrase is the universal hallmark of tilt. "Just one more" means you have already recognized, at some level, that you should stop — but the emotional pull is overriding your judgment. One more trade becomes two, then four, then a session you regret. If the words "just one more" form in your mind, the session is over. Close the platform.
      </P>

      <Divider />

      <H2>Why Tilt Is Invisible From the Inside</H2>
      <P>
        The fundamental challenge with overtrading is that emotional states distort self-awareness. When your prefrontal cortex is impaired by frustration or excitement, the very faculty you need to recognize tilt is the one that is offline. This is why external guardrails matter more than internal discipline. A rule, a checklist, a tool that flags the pattern — these work when willpower does not.
      </P>

      <Callout title="KMF Tilt Detection" color="#FFB300">
        KMF Trading Journal monitors four tilt indicators automatically: consecutive losses, lot size increases relative to your average, negative emotional states, and trade frequency spikes. It displays a 4-level warning banner directly on the trade entry screen — from a gentle reminder to a strong recommendation to stop trading for the day. The system catches what your emotional brain misses.
      </Callout>

      <H2>What to Do When You Catch Yourself</H2>
      <P>
        If you recognized yourself in two or more of the signs above, the action is simple but not easy: stop trading for the rest of the session. Close the platform. Do something physical — walk, exercise, cook. The cortisol and adrenaline in your system need 20 to 30 minutes to dissipate. When you return tomorrow, review today's trades honestly. Identify which ones were plan-based and which were emotion-based. That review is more valuable than any trade you might have taken. Read more about <Link to="/blog/why-traders-break-their-rules" className="text-kmf-accent hover:underline">why traders break their rules</Link> and how to build systems that prevent it.
      </P>

      <Takeaways items={[
        'Overtrading is not about volume — it is about taking trades your strategy did not generate.',
        'The 8 warning signs: frequency spike, skipping checklist, smaller timeframes, trading news, position size creep, untested setups, screen addiction, and "just one more."',
        'Tilt distorts self-awareness — you cannot reliably detect it from the inside, which is why external tools and rules matter.',
        'KMF\'s tilt detection system monitors consecutive losses, lot size changes, and emotional states to catch overtrading before it escalates.',
        'The correct response to recognizing tilt is always the same: stop, close the platform, and review tomorrow.',
        'A pre-trade checklist that appears before every entry is a structural barrier against impulsive trades.',
      ]} />
    </BlogArticleLayout>
  );
}
