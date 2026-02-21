import BlogArticleLayout, {
  Intro, H2, H3, P, Ul, Callout, Takeaways, Table, Divider
} from '../../components/blog/BlogArticleLayout';

export default function PreTradeChecklist() {
  return (
    <BlogArticleLayout
      slug="pre-trade-checklist"
      title="The Pre-Trade Checklist: 10 Things to Verify Before Every Trade Entry"
      metaTitle="Pre-Trade Checklist: 10 Things to Verify Before Every Entry | K.M.F. Trading Journal"
      metaDescription="A pre-trade checklist is the most effective tool for consistent trading. Here are 10 questions to verify before you enter any trade — adapt them to your own strategy."
      date="February 20, 2026"
      dateISO="2026-02-20"
      readTime="6 min read"
      category="Discipline"
      categoryColor="#FFB300"
    >
      <Intro>
        Before every commercial flight, pilots work through a standardized pre-flight checklist — not because experienced pilots have forgotten how planes work, but because checklists systematically prevent the class of error caused by overconfidence, distraction, or time pressure. Before complex surgeries, operating teams run verbal checklists that have demonstrably reduced preventable deaths. Trading is a domain of consequential decisions made under uncertainty and emotional pressure. The case for checklists is the same.
      </Intro>

      <H2>Why Checklists Work in Trading</H2>
      <P>
        Research on decision-making under pressure consistently shows that humans are poor at performing multi-step evaluations in real time — especially when under stress or time pressure. We skip steps, weight recent information too heavily, and allow emotional state to contaminate analytical judgment.
      </P>
      <P>
        A checklist externalizes the decision criteria. Rather than relying on your in-the-moment System 1 (fast, emotional) thinking to evaluate a trade correctly, a checklist forces systematic engagement of System 2 (slow, deliberate) thinking. It creates a mandatory gap between impulse and action — and in that gap is where discipline lives.
      </P>
      <Callout title="The Key Insight" color="#FFB300">
        A checklist does not make you a better analyst. It ensures that the analysis you already know how to do is actually performed before every trade — not just sometimes, not just when you remember, but every single time.
      </Callout>

      <Divider />

      <H2>The 10-Point Pre-Trade Checklist</H2>

      <H3>1. Does this trade match my defined setup criteria?</H3>
      <P>
        This is the foundational question. Your setup criteria define the specific conditions under which your strategy has demonstrated edge. If the current trade does not clearly meet those criteria — if you are stretching the definition, rounding the corners, telling yourself "it's close enough" — that is a rejection. Every deviation from your criteria represents a trade taken outside your edge.
      </P>

      <H3>2. Have I identified the trend or structure on the higher timeframe?</H3>
      <P>
        Trading against the dominant trend on the higher timeframe significantly reduces the probability of success on most strategies. Before entering any trade on your execution timeframe, check the one or two timeframes above it. Is the trend in the direction of your trade? Is there an obvious resistance or support level above or below price that could stop the move short of your target?
      </P>

      <H3>3. Is there a clear level of invalidation for my stop loss?</H3>
      <P>
        Your stop loss should be placed at a structural level — below support for a long, above resistance for a short — not at an arbitrary distance. If you cannot point to a specific reason why price reaching that level invalidates your trade, you do not have a logical stop loss. You have a guess.
      </P>

      <H3>4. Is the risk:reward ratio at least 1:1.5, or per my rules?</H3>
      <P>
        Calculate the actual ratio: distance from entry to stop loss versus distance from entry to target. If your target is 60 pips away and your stop is 80 pips away, you are risking more than you can gain. Know your minimum acceptable R:R ratio before you start your session and reject any trade that falls below it.
      </P>

      <H3>5. Have I calculated my position size based on 1% risk?</H3>
      <P>
        Do not estimate. Calculate. Risk Amount = Account × 0.01. Position Size = Risk Amount ÷ Stop Distance. This takes 20 seconds and ensures that the worst possible outcome on this trade — a full loss — costs exactly 1% of your account, not approximately 1% based on feel.
      </P>

      <H3>6. Is there a major news event in the next hour?</H3>
      <P>
        Major economic releases (NFP, CPI, central bank decisions) create sudden, large price movements that can instantly invalidate technically sound setups, spread wildly, and stop-hunt before continuing in the original direction. Know the economic calendar before your session. If a high-impact event is scheduled within the next 60 minutes, either wait until after the release or pass on the trade.
      </P>

      <H3>7. Am I trading out of boredom or FOMO?</H3>
      <P>
        Be honest. Ask yourself: am I entering this trade because there is a genuine setup, or because I am sitting in front of the screen and feel like I should be doing something? FOMO trades — entered because a move is already happening and you do not want to miss it — and boredom trades are among the most reliably losing categories of trade. If the honest answer is yes, close the chart and wait.
      </P>

      <H3>8. Am I emotionally ready to handle this trade going against me?</H3>
      <P>
        Rate your current emotional state on a scale of 1–10 (10 = completely calm). If you just had a losing trade and are feeling frustrated, if you had a fight with someone, if you are anxious about something unrelated to trading — these states impair the rational processing required to manage a trade well. A state below 6 or 7 is a flag that warrants passing on this trade.
      </P>

      <H3>9. Do I have a clear exit plan (target and stop)?</H3>
      <P>
        Before the trade is entered, you must know where you will exit with a loss (stop level in price terms) and where you plan to exit with a profit (target level or set of conditions). "I'll see how it develops" is not an exit plan. Managing a trade in real time without a pre-defined exit plan reliably leads to emotional decisions at the worst possible moments.
      </P>

      <H3>10. Am I okay if this trade loses?</H3>
      <P>
        This is a psychological check, not a trick question. Every trade you take should be sized and positioned such that if it loses, the outcome is financially acceptable and emotionally manageable. If the thought of this trade losing makes you feel sick or desperate, your position is too large, your emotional state is too elevated, or both. Resolve the underlying issue before entering.
      </P>

      <Divider />

      <H2>How to Build Your Own Checklist</H2>
      <P>
        The 10 questions above are a starting point — adapt them to your specific strategy. The best checklist is one you actually use, every time, without exception. Consider organizing yours into three categories:
      </P>
      <Table
        headers={['Category', 'Focus', 'Example Questions']}
        rows={[
          ['Technical', 'Is the setup valid?', 'Setup criteria, higher timeframe alignment, R:R ratio, news events'],
          ['Risk', 'Is the risk managed?', 'Position size calculation, stop loss logic, account risk %'],
          ['Psychological', 'Am I in the right state?', 'Emotional rating, boredom/FOMO check, loss acceptance'],
        ]}
      />

      <H2>Digital vs Paper Checklist</H2>
      <P>
        Both work. The criterion is consistency. A physical notepad next to your keyboard that you physically tick before every trade works well because the act of picking up a pen creates friction that slows impulse. A digital checklist in your trading journal works well because it creates a record you can review. What does not work is a mental checklist — your System 1 brain will convince you that you have "essentially" checked the boxes when it wants to take the trade.
      </P>

      <H2>What to Do If You Answer No to Any Question</H2>
      <P>
        Skip the trade. Do not rationalize. Do not make exceptions for "high-confidence" setups. The value of a checklist comes entirely from its unconditional application. A checklist that you override whenever you feel strongly about a trade is not a checklist — it is a decoration.
      </P>
      <P>
        The trades you do not take when your checklist says no are as important as the trades you take when it says yes. Discipline is symmetric.
      </P>

      <Takeaways items={[
        'Checklists work by forcing System 2 (deliberate, analytical) thinking before every trade, preventing System 1 (emotional, impulsive) entries.',
        'The 10 core areas: setup match, higher timeframe, stop logic, R:R ratio, position size, news events, boredom/FOMO, emotional state, exit plan, and loss acceptance.',
        'Organize your checklist into three categories: Technical, Risk, and Psychological.',
        'A physical or digital checklist creates a record. A mental checklist does not — and the brain will deceive you.',
        'If you answer no to any question, skip the trade. No exceptions. The discipline is in the unconditional application.',
        'Skipped trades because the checklist says no are not missed opportunities. They are discipline in action.',
      ]} />
    </BlogArticleLayout>
  );
}
