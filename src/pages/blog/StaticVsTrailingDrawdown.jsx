import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../components/blog/BlogArticleLayout';
import { DrawdownComparisonChart } from '../../components/blog/BlogCharts';
import { Link } from 'react-router-dom';

export default function StaticVsTrailingDrawdown() {
  return (
    <BlogArticleLayout
      slug="static-vs-trailing-drawdown"
      title="Static vs Trailing Drawdown: The Prop Firm Rule That Silently Kills Funded Accounts"
      metaTitle="Static vs Trailing Drawdown: Why Your Funded Account Really Got Terminated | K.M.F."
      metaDescription="Most prop firm failures happen because traders don't understand the difference between static and trailing drawdown. Learn how each is calculated, why trailing drawdown is a trap, and how to survive both."
      date="March 22, 2026"
      dateISO="2026-03-22"
      readTime="9 min read"
      category="Risk Management"
      categoryColor="#00C853"
      relatedArticles={[
        { slug: 'prop-firm-daily-drawdown-guide', title: 'How to Never Break the Daily Drawdown Rule Again', category: 'Risk Management' },
        { slug: 'prop-firm-trading-journal', title: 'Prop Firm Killers: How a Trading Journal Saves Your Funded Account', category: 'Risk Management' },
        { slug: '1-percent-risk-rule', title: 'The 1% Risk Rule: The Trading Rule That Keeps Professional Traders Alive', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'What is the difference between static and trailing drawdown?', answer: 'Static drawdown is a fixed limit calculated from your initial account balance — it never moves. Trailing drawdown follows your highest balance (high-water mark) and ratchets up as your account grows, but never moves back down. Trailing drawdown is harder to manage because winning trades shrink your remaining buffer.' },
        { question: 'Why is trailing drawdown harder than static drawdown?', answer: 'Because every time you make profit, the trailing limit moves up with you. If your $100K account peaks at $106K, your trailing 5% limit is now $100,700 — meaning you can only lose $5,300 from that peak before termination. With static drawdown, your limit stays at $95,000 regardless of how much profit you make.' },
        { question: 'Which prop firms use trailing drawdown?', answer: 'Many newer prop firms use trailing drawdown during the challenge phase. FTMO uses static drawdown. E8 Funding, MyFundedFX, and several others use trailing drawdown in at least one of their challenge phases. Always read the rules document carefully before starting.' },
        { question: 'Is trailing drawdown calculated on balance or equity?', answer: 'It depends on the firm. Some calculate on balance (closed trades only), others on equity (including open unrealized P/L). Equity-based trailing drawdown is the hardest — a floating profit that pulls back can trigger termination even if you close the trade at breakeven.' },
        { question: 'Does trailing drawdown ever stop trailing?', answer: 'Most prop firms lock the trailing drawdown once the limit reaches your initial starting balance. For example, on a $100K account with 5% trailing drawdown, once the limit reaches $100,000, it stops moving and effectively becomes static. This is sometimes called a watermark lock. Always verify this with your specific firm.' },
      ]}
      howToSteps={[
        { name: 'Identify your drawdown type', text: 'Read your prop firm rules document. Determine whether your drawdown is static or trailing, and whether it is calculated on balance or equity.' },
        { name: 'Calculate your real buffer', text: 'For trailing drawdown, subtract your trailing limit from your current balance — not from your initial balance. This is your actual remaining room.' },
        { name: 'Set a personal safety margin', text: 'Use only 60% of your available buffer. If you have $5,000 before termination, treat $3,000 as your hard limit.' },
        { name: 'Track your high-water mark', text: 'After every winning trade, recalculate your trailing limit. Write it down in your journal before the next session.' },
        { name: 'Reduce size after profits', text: 'Counterintuitively, reduce position size after a profitable streak on trailing drawdown accounts. Your buffer has shrunk relative to your balance.' },
      ]}
    >
      <Intro>
        Let me tell you the story of two traders. Both passed their prop firm challenge. Both got funded with $100,000. Both were disciplined. Both lost their accounts within three weeks. The first trader was unlucky — a legitimate losing streak in a choppy market. Fair enough. The second trader was actually profitable. He made $6,000 in the first two weeks. Then he had two bad days, gave back $5,500, and got an email that started with "We regret to inform you." He stared at his balance: $100,500. Still in profit. Still above his starting capital. Account terminated. What happened?
      </Intro>

      <P>
        Trailing drawdown happened. And if you do not understand the difference between trailing and static drawdown — really understand it, not just "I read the rules" understand it — you are going to join him. It is the single most misunderstood rule in prop firm trading, and it has killed more funded accounts than bad strategies, bad luck, and bad psychology combined.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, suffix: '%', label: <>typical max drawdown<br />on prop firm accounts</> },
        { value: 60, decimals: 0, suffix: '%', label: <>of buffer to use as<br />a personal safety margin</> },
        { value: 100, decimals: 0, suffix: 'K', prefix: '$', label: <>standard funded account<br />size in this analysis</> },
      ]} />

      <Divider />

      <H2>Static Drawdown: The Simple One</H2>
      <P>
        Static drawdown is what most traders think all drawdown rules are. It works like this:
      </P>
      <Ul items={[
        'You start with $100,000.',
        'The maximum drawdown is 10% (for example).',
        'Your termination level is $90,000.',
        'It does not matter if your account goes to $120,000. The limit stays at $90,000. Forever.',
      ]} />
      <P>
        Static drawdown is predictable. You can calculate your worst-case scenario on day one, and it never changes. If you are at $112,000 after a great month, you know you have $22,000 of room. If you have a terrible week and drop to $95,000, you know you have $5,000 left. The math never surprises you.
      </P>
      <Callout title="Static Drawdown = Your Friend" color="#00C853">
        With static drawdown, every dollar you make increases your safety buffer. The better you trade, the harder it becomes to get terminated. This is how drawdown should work.
      </Callout>

      <Divider />

      <H2>Trailing Drawdown: The Trap</H2>
      <P>
        Trailing drawdown follows your highest account balance — the <strong>"high-water mark."</strong> Every time your account reaches a new peak, the trailing limit moves up with it. <strong>It only moves up, never down.</strong>
      </P>
      <P>
        Same example:
      </P>
      <Ul items={[
        'You start with $100,000. Trailing drawdown limit is 5% = $95,000.',
        'You make $3,000. Account is $103,000. New trailing limit: $97,850 (5% below $103K).',
        'You make another $3,000. Account is $106,000. New trailing limit: $100,700.',
        'Now you have a bad week. You lose $5,500. Account is $100,500.',
        'You are still in profit. You are above your starting balance. But $100,500 is below $100,700.',
        'Account terminated.',
      ]} />
      <P>
        Read those numbers again. The trader made $6,000, gave back $5,500, and was still net positive. But the trailing limit had moved up to $100,700 during the winning streak — and it never came back down. The trader's own profits built the wall that killed him.
      </P>

      <Callout title="Important: Most Firms Lock the Trail at Starting Balance" color="#4FC3F7">
        Good news: the majority of prop firms stop the trailing drawdown once the limit reaches your initial balance. In our example, once the trailing limit hits $100,000, it locks there permanently — effectively becoming static drawdown from that point. This means your first goal on a trailing account is to grow enough profit that the trail "catches up" to your starting balance. After that, every additional dollar of profit is genuine buffer. Check your firm's rules — some call this a "watermark lock" or simply state that the trailing stop converts to static after reaching the initial balance.</Callout>

      <DrawdownComparisonChart />

      <H2>The Math That Nobody Does</H2>
      <P>
        Here is the part that will save your account. Let us look at what happens to your actual buffer — the distance between your balance and your termination level — as your account grows.
      </P>
      <Table
        headers={['Balance', 'Static Limit (10%)', 'Static Buffer', 'Trailing Limit (5%)', 'Trailing Buffer']}
        rows={[
          ['$100,000', '$90,000', { value: '$10,000', color: 'green' }, '$95,000', { value: '$5,000', color: 'gold' }],
          ['$103,000', '$90,000', { value: '$13,000', color: 'green' }, '$97,850', { value: '$5,150', color: 'gold' }],
          ['$106,000', '$90,000', { value: '$16,000', color: 'green' }, '$100,700', { value: '$5,300', color: 'gold' }],
          ['$108,000', '$90,000', { value: '$18,000', color: 'green' }, '$102,600', { value: '$5,400', color: 'gold' }],
          ['$104,000 (pullback)', '$90,000', { value: '$14,000', color: 'green' }, '$102,600', { value: '$1,400', color: 'red' }],
        ]}
      />
      <P>
        Look at the last row. After a normal pullback from $108K to $104K, the static trader still has $14,000 of buffer. The trailing trader has $1,400. One more bad trade and it is over.
      </P>
      <Callout title="The Cruel Paradox" color="#FF5252">
        With trailing drawdown, the better you trade in the first few weeks, the tighter the noose becomes. A big winning streak feels great — but it raises the floor beneath you. Then a normal, inevitable pullback triggers termination. Your own success built the trap.
      </Callout>

      <Divider />

      <H2>Equity vs Balance: The Second Trap Inside the First Trap</H2>
      <P>
        As if trailing drawdown was not tricky enough, some firms calculate it on equity, not balance. The difference:
      </P>
      <H3>Balance-based</H3>
      <P>
        Only closed trades count. If you have a position that is up $2,000 but still open, the trailing limit does not move. It only moves when you close the trade and realize the profit.
      </P>
      <H3>Equity-based</H3>
      <P>
        Open positions count. If your account is at $100,000 and you have an open trade showing +$3,000 unrealized profit, the trailing limit moves to 5% below $103,000 = $97,850. If that trade then pulls back and you close at breakeven, your limit is still at $97,850. Your floating profit raised the floor, and closing at breakeven now counts as a $2,850 drawdown.
      </P>
      <P>
        Yes, this is as brutal as it sounds. And yes, traders lose funded accounts this way regularly.
      </P>

      <H3>Practical Example</H3>
      <Table
        headers={['Time', 'Action', 'Balance', 'Equity', 'Trailing Limit (Equity)', 'Buffer']}
        rows={[
          ['9:30 AM', 'Session start', '$100,000', '$100,000', '$95,000', { value: '$5,000', color: 'gold' }],
          ['10:15 AM', 'Buy EUR/USD, floating +$2,800', '$100,000', '$102,800', '$97,660', { value: '$5,140', color: 'gold' }],
          ['11:00 AM', 'Trade pulls back, floating +$400', '$100,000', '$100,400', '$97,660', { value: '$2,740', color: 'red' }],
          ['11:30 AM', 'Close at breakeven', '$100,000', '$100,000', '$97,660', { value: '$2,340', color: 'red' }],
          ['12:00 PM', 'Next trade, loss -$1,200', '$98,800', '$98,800', '$97,660', { value: '$1,140', color: 'red' }],
        ]}
      />
      <P>
        The trader started the day with a $5,000 buffer. He made no money. He closed one trade at breakeven and took one small loss. His buffer is now $1,140. One more normal loss and the account is dead — because a floating profit that he never realized raised the floor permanently.
      </P>

      <Divider />

      <H2>How to Survive Trailing Drawdown</H2>
      <P>
        Okay, enough horror stories. Here is what to actually do about it. These are not theoretical suggestions — they are rules that keep funded accounts alive.
      </P>

      <H3>1. Know Your Number Every Single Morning</H3>
      <P>
        Before you open your trading platform, write down three numbers in your journal:
      </P>
      <Ul items={[
        'Current balance',
        'Current trailing limit (highest balance × 0.95, or whatever your percentage is)',
        'Remaining buffer (balance minus trailing limit)',
      ]} />
      <P>
        If you do not know these numbers, you are flying blind. And flying blind near a cliff edge is exactly how accounts get terminated on "normal" days.
      </P>

      <H3>2. Reduce Size After Winning Streaks</H3>
      <P>
        This feels counterintuitive. You are winning, so you should trade bigger, right? Wrong — at least with trailing drawdown. Every new dollar of profit shrinks your relative buffer. After a $5,000 winning streak on a $100K account, your trailing limit has moved up $4,750. Your buffer has only increased by $250. Trade smaller to protect it.
      </P>

      <H3>3. Be Careful With Take Profit Targets</H3>
      <P>
        On equity-based trailing drawdown, a trade that shows +$3,000 unrealized profit and then closes at +$500 has effectively cost you buffer. The limit moved up by $2,850 (from the floating high), but you only realized $500. Your net buffer decreased by $2,350 from a winning trade.
      </P>
      <P>
        Solution: if you are up significantly on a trade, either take full profit or set a <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">tight trailing stop</Link>. Do not let large floating profits pull back to near-breakeven. On equity-based accounts, that is worse than not having the trade at all.
      </P>

      <H3>4. Track Everything</H3>
      <P>
        Your prop firm dashboard shows your current drawdown. It does not show you patterns. It does not show you that your last three Tuesdays all started well and ended with aggressive overtrading. It does not show you that you consistently give back profits between 11 AM and noon.
      </P>
      <P>
        That is what a <Link to="/blog/prop-firm-trading-journal" className="text-kmf-accent hover:underline">trading journal</Link> is for. K.M.F. tracks max drawdown from peak balance and shows your balance evolution chart — so you can see exactly where the pullbacks happen and whether they are getting worse. It also tracks your <Link to="/blog/r-multiple-explained" className="text-kmf-accent hover:underline">R-multiples</Link>, so you know whether your losing trades are within plan or whether you are letting them run too far. The app cannot calculate your firm's specific trailing drawdown limit (every firm has different rules), but it gives you the raw data to calculate it yourself every morning. Do the math. Write it in your pre-session journal entry. It takes 60 seconds and it might save your account.
      </P>

      <H3>5. Consider Static Drawdown Firms First</H3>
      <P>
        If you are getting your first funded account, seriously consider starting with a firm that uses static drawdown. Yes, the challenge fee might be higher. Yes, the profit split might be slightly worse. But the probability of keeping the account long enough to actually make money is significantly higher. You can graduate to trailing drawdown firms once you have proven you can manage risk consistently.
      </P>

      <Divider />

      <H2>The Cheat Sheet</H2>
      <Table
        headers={['', 'Static Drawdown', 'Trailing Drawdown']}
        rows={[
          ['Limit based on', { value: 'Initial balance', color: 'green' }, { value: 'Highest balance reached', color: 'gold' }],
          ['Moves up when you profit?', { value: 'No — stays fixed', color: 'green' }, { value: 'Yes — ratchets up permanently', color: 'red' }],
          ['Buffer after a winning streak', { value: 'Increases', color: 'green' }, { value: 'Barely increases (or decreases relatively)', color: 'red' }],
          ['Difficulty level', { value: 'Predictable', color: 'green' }, { value: 'Progressively harder', color: 'red' }],
          ['Best strategy', { value: 'Normal trading, let it compound', color: 'cyan' }, { value: 'Small, consistent profits, lock in gains early', color: 'cyan' }],
          ['Biggest killer', { value: 'Revenge trading after losses', color: 'red' }, { value: 'Normal pullback after a winning streak', color: 'red' }],
        ]}
      />

      <Takeaways items={[
        'Static drawdown is a fixed limit from your starting balance — it never changes. Every dollar you profit increases your safety buffer.',
        'Trailing drawdown follows your highest balance and never comes back down. Your own profits build the floor that can terminate you.',
        'Equity-based trailing drawdown is the hardest: even floating (unrealized) profits raise the limit permanently.',
        'After winning streaks on trailing accounts, reduce position size. Your relative buffer has shrunk even though your balance is higher.',
        'Know your three numbers every morning: current balance, trailing limit, remaining buffer. Write them in your journal before trading.',
        'If you are new to prop firms, start with a static drawdown firm. Learn the game before playing on hard mode.',
      ]} />
    </BlogArticleLayout>
  );
}
