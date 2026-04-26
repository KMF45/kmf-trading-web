import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider, StatsStrip
} from '../../components/blog/BlogArticleLayout';
import { Link } from 'react-router-dom';

export default function MetatraderPreTradeChecklist() {
  return (
    <BlogArticleLayout
      slug="metatrader-pre-trade-checklist"
      title="How to Build a Pre-Trade Checklist for MetaTrader and cTrader (With 5 Rules That Actually Stick)"
      metaTitle="MetaTrader Pre-Trade Checklist: 5 Rules Before Every Entry | K.M.F."
      metaDescription="A practical, platform-specific pre-trade checklist for MetaTrader 4, MetaTrader 5, and cTrader. Five mandatory checks before every trade entry, with concrete examples."
      date="March 22, 2026"
      dateISO="2026-03-22"
      readTime="8 min read"
      category="Discipline"
      categoryColor="#FFB300"
      relatedArticles={[
        { slug: 'pre-trade-checklist', title: 'The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry', category: 'Discipline' },
        { slug: 'how-to-set-stop-loss', title: 'How to Set a Stop Loss Properly (Not Just Randomly)', category: 'Risk Management' },
        { slug: 'position-sizing-guide', title: 'Position Sizing Guide: How Much Should You Trade?', category: 'Risk Management' },
      ]}
      faqItems={[
        { question: 'What should a MetaTrader pre-trade checklist include?', answer: 'Five mandatory checks: 1) Market context and higher timeframe direction, 2) A specific entry trigger (not just "it looks good"), 3) Stop loss at a structural invalidation point, 4) Position size calculated with a risk calculator, and 5) Minimum 1:2 risk-reward ratio confirmed on the chart.' },
        { question: 'How do I set up a pre-trade checklist in MetaTrader?', answer: 'MetaTrader does not have a built-in checklist feature. Most traders use a physical sticky note on their monitor, a text file open beside their platform, or a dedicated trading journal app like K.M.F. that has a built-in checklist function you complete before logging each trade.' },
        { question: 'What is the difference between a pre-trade checklist for MT4 and cTrader?', answer: 'The checklist itself is the same — market context, entry trigger, stop loss, position size, risk-reward. The only difference is where you calculate: cTrader has better built-in risk tools, while MT4/MT5 traders often need an external calculator or EA for precise lot sizing.' },
        { question: 'How many items should be on a trading checklist?', answer: 'Five. Not ten, not fifteen. Five items that you can verify in under 60 seconds. If your checklist takes longer than a minute, you will skip it on busy days — and those are exactly the days when you need it most.' },
      ]}
      howToSteps={[
        { name: 'Check higher timeframe context', text: 'Open the daily or H4 chart. Identify the current trend or range. Your trade must align with this context or have explicit counter-trend justification.' },
        { name: 'Identify a specific entry trigger', text: 'Define the exact candle pattern, indicator signal, or price level that triggers your entry. "It looks bullish" is not a trigger.' },
        { name: 'Mark your stop loss on the chart', text: 'Place a horizontal line at your stop loss level. It must be at a structural invalidation point — behind support/resistance, beyond an ATR buffer, or below a signal candle.' },
        { name: 'Calculate position size', text: 'Use a position size calculator. Input: account balance, risk percentage (1%), stop loss distance in pips. Output: exact lot size. Never round up.' },
        { name: 'Confirm risk-reward ratio', text: 'Drag a risk-reward tool from entry to stop and target. If the ratio is below 1:2, skip the trade. The math does not support it.' },
      ]}
    >
      <Intro>
        You already know you should have a pre-trade checklist. You have probably even made one before — maybe after reading our <Link to="/blog/pre-trade-checklist" className="text-kmf-accent hover:underline">10-point checklist guide</Link>. It had twelve items, it was thorough, it was professional. You used it for four days and then stopped because checking twelve things before every trade on MetaTrader felt like filling out a tax form while the market moved without you. Sound familiar? You are not lazy. Your checklist was too long.
      </Intro>

      <P>
        This guide is different. Five items. Under 60 seconds. Specific to how MetaTrader (MT4/MT5) and cTrader actually work — with the exact buttons, tools, and calculations you need to use on each platform. No theory. No "consider your emotional state" (that is important, but it belongs in your journal, not in a 60-second checklist). Just five concrete checks that prevent the five most common trading mistakes.
      </P>

      <StatsStrip items={[
        { value: 5, decimals: 0, label: <>checklist items —<br />the sweet-spot for compliance</> },
        { value: 60, decimals: 0, suffix: 's', label: <>maximum time before<br />pressure makes you skip it</> },
        { value: 2, decimals: 0, suffix: 'R', label: <>minimum target — 1:2 R:R<br />or skip the trade</> },
      ]} />

      <Divider />

      <H2>Why Five Items, Not Ten</H2>
      <P>
        There is a reason airplane checklists are short. NASA research on checklist compliance found that completion rates drop sharply after 5-7 items. Surgeons use the WHO Surgical Safety Checklist — it has three sections of 5-7 items each, not one section of 19. The principle: a short checklist you actually use beats a long checklist you abandon.
      </P>
      <P>
        In trading, this matters even more because you are often under time pressure. A breakout is forming. A candle is closing. You feel urgency to enter. A 60-second checklist can survive this pressure. A 5-minute checklist cannot.
      </P>
      <Callout title="The 60-Second Rule" color="#FFB300">
        If your checklist takes more than 60 seconds, it is too long. Cut it. The five items below cover 90% of what goes wrong. The other 10% is not worth losing compliance over.
      </Callout>

      <Divider />

      <H2>The 5-Point Checklist</H2>

      <H3>1. Context: What Is the Higher Timeframe Doing?</H3>
      <P>
        Before looking at your entry timeframe, switch to the daily chart (or H4 if you are a scalper). You are asking one question: is the market trending, ranging, or in transition? Your trade should align with this context.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On MetaTrader:</strong> Click the timeframe buttons (D1 or H4) at the top of the chart toolbar. Spend 10 seconds looking at the last 20-30 candles. Is there a clear direction? Are you trading with it or against it?
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On cTrader:</strong> Same thing — use the timeframe dropdown or keyboard shortcut. cTrader also lets you set up a multi-timeframe layout (View → Multi-Symbol) so the higher timeframe is always visible.
      </P>
      <P>
        If the higher timeframe is choppy or unclear, your trade needs a very strong reason to exist. Most of the time, "the higher timeframe is messy" is a valid reason to skip.
      </P>

      <H3>2. Trigger: What Exactly Am I Waiting For?</H3>
      <P>
        This is where most traders fail. They see a "setup" — price is near support, the RSI is oversold, it "looks good" — and they enter. But "it looks good" is not a trigger. A trigger is a specific, observable event:
      </P>
      <Ul items={[
        'A bullish engulfing candle closing above the support level',
        'A break and close above the descending trendline on the 15-minute chart',
        'A pinbar rejecting the 200 EMA with the wick at least 2x the body',
        'RSI divergence confirmed by a higher low on the oscillator while price makes a lower low',
      ]} />
      <P>
        Write your trigger in your journal or on a sticky note before the trade. If you cannot describe it in one sentence, you do not have a trigger — you have a feeling.
      </P>

      <H3>3. Stop: Where Does My Idea Fail?</H3>
      <P>
        Your stop loss should be at the price level where your trade thesis is invalidated. Not an arbitrary number of pips. Not based on how much money you are willing to lose. The stop goes where the market proves you wrong.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On MetaTrader:</strong> Use the crosshair tool (Ctrl+F) to measure the exact distance from entry to stop in pips. Or drag a horizontal line to your stop level and use the "Data Window" (Ctrl+D) to read the price.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On cTrader:</strong> Right-click → "Measure" or use the built-in <Link to="/blog/how-to-set-stop-loss" className="text-kmf-accent hover:underline">stop loss placement tool</Link> that shows pips and dollar amount simultaneously.
      </P>
      <P>
        Common stop placement methods:
      </P>
      <Table
        headers={['Method', 'Where', 'Best For']}
        rows={[
          ['Structure-based', 'Below the swing low / above swing high + 5-10 pip buffer', 'Swing trades, clear S/R levels'],
          ['ATR-based', '1.5× ATR below entry (buy) or above entry (sell)', 'Volatile markets, news events'],
          ['Candle-based', 'Below signal candle low + spread + small buffer', 'Intraday entries, pin bars'],
        ]}
      />

      <H3>4. Size: How Much Am I Trading?</H3>
      <P>
        This is where most blown accounts originate. Not from bad entries — from wrong position sizes. The formula:
      </P>
      <Callout title="Position Size Formula" color="#4FC3F7">
        Lot Size = (Account Balance × Risk %) ÷ (Stop Loss in Pips × Pip Value)
      </Callout>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On MetaTrader:</strong> MT4/MT5 does not have a built-in risk calculator (yes, really). You need either: an external calculator, a custom EA/indicator that does the calculation, or a trading journal with a <Link to="/blog/position-sizing-guide" className="text-kmf-accent hover:underline">lot size calculator</Link>. K.M.F. has one built into the app — input your account size, risk percentage, stop distance, and it gives you the exact lot size. Faster than doing the math manually every time.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On cTrader:</strong> cTrader has a built-in position size calculator (right-click on the trade ticket → "Risk %"). Set your risk percentage and it automatically calculates the correct lot size based on your stop distance. This is one area where cTrader genuinely outperforms MetaTrader.
      </P>
      <P>
        Rule: if you are doing this calculation in your head, you are doing it wrong. Always use a calculator. Mental math under pressure leads to "close enough" lot sizes, and "close enough" is how 1% risk becomes 3% risk.
      </P>

      <H3>5. Reward: Is This Trade Worth Taking?</H3>
      <P>
        Your target must be at least 2× your stop loss distance. If your stop is 30 pips, your target is at least 60 pips. If the math does not work — if there is a major resistance level between your entry and a 2R target — skip the trade. It is not worth the risk.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On MetaTrader:</strong> Use the Fibonacci or Rectangle tool to visually mark your 1R, 2R, and 3R levels above (or below) your entry. Some traders use the "Trade" level lines in MetaTrader that show entry, SL, and TP with the pip distance.
      </P>
      <P>
        <strong style={{ color: '#F0F4FF' }}>On cTrader:</strong> Use the "Risk/Reward" tool (in the drawing toolbar) to drag from entry to stop and target. It shows the exact ratio.
      </P>
      <P>
        This check prevents the most insidious class of bad trades: the ones that "feel right" but have terrible math. A setup at support with a 50-pip stop and 30 pips to the next resistance is a losing trade even if your analysis is perfect. The risk:reward is 1:0.6. You need to win 63% of these just to break even. Skip it.
      </P>

      <Divider />

      <H2>The Checklist in Practice</H2>
      <Table
        headers={['#', 'Check', 'Time', 'If No']}
        rows={[
          ['1', 'Higher TF context supports trade direction?', '10 sec', { value: 'Skip or need strong counter-trend reason', color: 'red' }],
          ['2', 'Can I describe my entry trigger in one sentence?', '10 sec', { value: 'No trigger = no trade', color: 'red' }],
          ['3', 'Stop loss at structural invalidation + buffer?', '15 sec', { value: 'Find the right level or skip', color: 'gold' }],
          ['4', 'Position size calculated with a tool (not mental math)?', '15 sec', { value: 'Calculate properly first', color: 'gold' }],
          ['5', 'Risk:reward minimum 1:2 confirmed on chart?', '10 sec', { value: 'Skip — the math says no', color: 'red' }],
        ]}
      />
      <P>
        Total time: 60 seconds. Five yes/no answers. If any answer is "no," the trade either gets adjusted or skipped. No exceptions, no "this time is different."
      </P>

      <Divider />

      <H2>Where to Put Your Checklist</H2>
      <P>
        The checklist is useless if it lives in a Google Doc you never open. Here are the three methods that actually work:
      </P>
      <Ul items={[
        'Physical sticky note on your monitor bezel — you cannot avoid seeing it. Replace it weekly when it gets dog-eared.',
        'A custom MT4 comment template — type your 5 checks in the "Comment" field of every trade. Forces you to think before entering.',
        'A trading journal app with a built-in checklist. K.M.F. has this — you check off items before logging each trade. The app tracks your compliance rate over time, so you can see how often you skip the checklist and what happens to your results when you do. (Spoiler: they get worse.)',
      ]} />

      <P>
        Whichever method you choose, the key is that the checklist must be between you and the trade. It should be impossible to enter a trade without encountering the checklist first. If you have to actively seek it out, you will skip it on the days when you need it most — which are the days when you are excited, frustrated, or in a hurry.
      </P>

      <Takeaways items={[
        'Five items, 60 seconds. Checklist compliance drops sharply after 5-7 items. A short list you use beats a long list you abandon.',
        'Context first: 10 seconds on the daily chart prevents most bad trades. If the higher timeframe is messy, your trade needs a very strong reason.',
        'A trigger is a specific event, not a feeling. "Bullish engulfing above support" is a trigger. "It looks good" is not.',
        'Stop loss at invalidation, not at a comfortable dollar amount. Use structure, ATR, or candle-based methods.',
        'Always use a calculator for position size. Mental math under pressure turns 1% risk into 3% risk.',
        'Risk:reward below 1:2 = skip. No matter how good the setup looks, the math says the trade is not worth taking.',
      ]} />
    </BlogArticleLayout>
  );
}
