// Trader Personality Test — data + scoring
// Mirrors the archetypes computed in the K.M.F. app (StatisticsViewModel.calculateTraderProfile).
// Each option awards points to archetypes; style (Q1) + holding (Q2) calibrate frequency-based signals.
// The website quiz ESTIMATES the profile the app computes from real trade data — it's a self-report teaser.

// ── Archetype keys ──────────────────────────────────────────────────────────
// SNI Sniper · STO Stoic · CMB Comeback Kid · REV Revenge · GAM Gambler
// OVR Overtrader · HES Overthinker · BAG True Believer · MOM Momentum
// (The app also has an All-Rounder fallback; the web quiz always assigns the
//  dominant real archetype — everyone lands in a concrete category.)

// Tie-break priority (specific → general), matching the app's evaluation order.
export const PRIORITY = ['SNI', 'STO', 'CMB', 'REV', 'GAM', 'OVR', 'HES', 'BAG', 'MOM'];

// ── Questions ───────────────────────────────────────────────────────────────
// Q1 (style) and Q2 (holding) carry no archetype points — they calibrate.
// `styleSensitive: true` → OVR/GAM points from that question are halved for scalpers/day traders.
export const QUESTIONS = [
  // ── Section 1: context / calibration ──
  {
    id: 'style',
    section: 'Your style',
    text: "What's your main trading style?",
    kind: 'style',
    options: [
      { text: 'Scalper — seconds to minutes per trade', style: 'scalper' },
      { text: 'Day trader — a few trades, closed by the session end', style: 'day' },
      { text: 'Swing trader — days to weeks', style: 'swing' },
      { text: 'Position / investor — weeks to months', style: 'position' },
      { text: "Still figuring it out / mixed", style: 'mixed' },
    ],
  },
  {
    id: 'holding',
    section: 'Your style',
    text: 'How long do you usually keep a trade open?',
    kind: 'context',
    options: [
      { text: 'Seconds to minutes', hold: 'scalper' },
      { text: 'Hours — same day', hold: 'day' },
      { text: 'Days', hold: 'swing' },
      { text: 'Weeks to months', hold: 'position' },
    ],
  },

  // ── Section 2: discipline & process ──
  {
    id: 'plan',
    section: 'Discipline',
    text: 'Which ONE describes your trading plan?',
    options: [
      { text: 'Written rules — and I execute them on every trade', scores: { SNI: 2, STO: 1 } },
      { text: 'Written rules — but I override them mid-trade when it "feels right"', scores: { MOM: 2, BAG: 1 } },
      { text: 'No written rules — I trade what I see in the moment', scores: { GAM: 3, OVR: 1 } },
      { text: 'Written rules — but fear often stops me from executing them', scores: { HES: 3 } },
    ],
  },
  {
    id: 'offplan',
    section: 'Discipline',
    styleSensitive: true,
    text: "How often do you take a trade your plan did NOT call for?",
    options: [
      { text: "Almost never — if it's not my setup, I'm out", scores: { SNI: 3 } },
      { text: 'A few times a month — usually out of boredom', scores: { OVR: 2, GAM: 1 } },
      { text: 'A few times a week or more — "almost-setups" included', scores: { OVR: 3, GAM: 2 } },
      { text: 'Never — my problem is skipping setups my plan DID call for', scores: { HES: 3 } },
    ],
  },
  {
    id: 'journal',
    section: 'Discipline',
    text: 'How often do you log / review your trades?',
    options: [
      { text: 'Every trade + a weekly review', scores: { STO: 2, SNI: 1 } },
      { text: 'Sometimes, when I remember', scores: { OVR: 2, MOM: 1 } },
      { text: 'Almost never — I keep it in my head', scores: { GAM: 2, REV: 1 } },
      { text: "I'd like to, but I get stuck on the details", scores: { HES: 2 } },
    ],
  },

  // ── Section 3: emotions ──
  {
    id: 'emotion',
    section: 'Emotions',
    text: 'How do you usually feel BEFORE entering a trade?',
    options: [
      { text: "Calm — it's just an execution", scores: { STO: 3 } },
      { text: 'Excited / confident — I feel it working', scores: { MOM: 3 } },
      { text: 'Anxious — "what if I lose?"', scores: { HES: 3 } },
      { text: 'Frustrated — still thinking about my last loss', scores: { REV: 2, GAM: 1 } },
    ],
  },
  {
    id: 'checkpnl',
    section: 'Emotions',
    styleSensitive: true,
    text: 'WHEN do you look at your P/L?',
    options: [
      { text: 'Once — at the end of the session', scores: { STO: 3 } },
      { text: 'Right after each trade closes, then I move on', scores: { MOM: 1, OVR: 1, REV: 1 } },
      { text: 'Constantly while a trade is open — every tick', scores: { HES: 2, GAM: 1 } },
      { text: "I avoid looking at it while I'm in a losing trade", scores: { BAG: 2, HES: 1 } },
    ],
  },

  // ── Section 4: winners & losers (disposition) ──
  {
    id: 'winner',
    section: 'Winners & losers',
    text: "A trade is at +1.5R but hasn't hit target. What do you do?",
    options: [
      { text: 'Hold to target — that was the plan', scores: { SNI: 3 } },
      { text: 'Close it all now — "profit is profit"', scores: { BAG: 3 } },
      { text: "Add to it — it's going well", scores: { MOM: 3, GAM: 1 } },
      { text: 'Move stop to breakeven and let it run', scores: { CMB: 2, STO: 1 } },
    ],
  },
  {
    id: 'loser',
    section: 'Winners & losers',
    text: 'A trade moves against you, near your stop. What do you do?',
    options: [
      { text: 'Let it hit the stop — that\'s the rule', scores: { SNI: 2, STO: 1 } },
      { text: 'Move the stop further — "it\'ll come back"', scores: { BAG: 4 } },
      { text: "Close early — I can't stand losing", scores: { HES: 2, BAG: 1 } },
      { text: 'Add to lower my average price', scores: { REV: 2, GAM: 2 } },
    ],
  },
  {
    id: 'holdlonger',
    section: 'Winners & losers',
    text: 'Honestly — which do you hold open longer?',
    options: [
      { text: 'Winners — I let them run', scores: { SNI: 2 } },
      { text: "Losers — I hope they recover", scores: { BAG: 4 } },
      { text: "I close both fast — I can't stand the tension", scores: { HES: 2, OVR: 1 } },
      { text: 'About the same, per my plan', scores: { STO: 2 } },
    ],
  },

  // ── Section 5: reactions & risk ──
  {
    id: 'twolosses',
    section: 'Reactions',
    text: 'Two losses in a row today. What do you do in the next few minutes?',
    options: [
      { text: 'Close the platform — done for today', scores: { STO: 3 } },
      { text: 'Jump straight back in to recover', scores: { REV: 3, GAM: 1 } },
      { text: 'Take one more, but smaller — rebuild slowly', scores: { CMB: 3 } },
      { text: "Stay at the screen but can't click", scores: { HES: 3 } },
    ],
  },
  {
    id: 'afterwin',
    section: 'Reactions',
    text: 'Your biggest win of the week just closed. The next trade?',
    options: [
      { text: 'Same size as always — the win changes nothing', scores: { STO: 2, SNI: 1 } },
      { text: 'Same setup rules, but BIGGER size — "house\'s money"', scores: { MOM: 3, GAM: 1 } },
      { text: 'No next trade — done for today, close on green', scores: { SNI: 2, STO: 1 } },
      { text: 'Any next trade — I hunt for one immediately, I\'m on a roll', scores: { OVR: 3 } },
    ],
  },
  {
    id: 'badweek',
    section: 'Reactions',
    text: 'Bad week (drawdown). What do you do on Monday?',
    options: [
      { text: 'Cut size, back to basics, rebuild with discipline', scores: { CMB: 4 } },
      { text: 'Increase risk to recover fast', scores: { REV: 3, GAM: 1 } },
      { text: 'Take a break — afraid to return', scores: { HES: 3 } },
      { text: "Trade the same — it's part of the game", scores: { STO: 2 } },
    ],
  },
  {
    id: 'drawdown',
    section: 'Reactions',
    text: 'Your worst drawdown ever — how did it end?',
    options: [
      { text: 'I rebuilt slowly: smaller size, stricter rules', scores: { CMB: 4 } },
      { text: 'I won it back fast by sizing up', scores: { REV: 2, GAM: 2 } },
      { text: "Haven't had a serious drawdown yet" },
      { text: "I'm still in it", scores: { BAG: 1, HES: 1 } },
    ],
  },
  {
    id: 'fomo',
    section: 'Reactions',
    text: 'A market is flying without you. What do you do?',
    options: [
      { text: 'Nothing — I wait for MY setup, that move was never mine', scores: { SNI: 3 } },
      { text: 'Chase it — I enter late rather than miss it completely', scores: { MOM: 2, GAM: 2 } },
      { text: 'Skip that move, but force a trade somewhere else to make up for it', scores: { REV: 2, OVR: 1 } },
      { text: 'Want in the whole time, but hesitate until it\'s too late', scores: { HES: 3 } },
    ],
  },
  {
    id: 'risk',
    section: 'Reactions',
    text: 'How much do you risk per trade?',
    options: [
      { text: 'A fixed percentage (e.g. 1%), always the same', scores: { STO: 2, SNI: 1 } },
      { text: 'Depends how confident I am', scores: { GAM: 2, MOM: 2 } },
      { text: 'More after losses, to recover', scores: { REV: 3 } },
      { text: "Tiny — I'm afraid to lose", scores: { HES: 2, BAG: 1 } },
    ],
  },
];

// ── Profiles (9) ────────────────────────────────────────────────────────────
export const PROFILES = {
  SNI: {
    key: 'SNI', name: 'The Sniper', slug: 'sniper', emoji: '🎯', color: '#00C853',
    tagline: 'Patient, selective, follows the plan.',
    description: "You wait. You don't need to be in a trade to feel alive — you need the RIGHT trade. Few entries, high conviction, and the discipline to skip 90% of what the market offers. This is the profile most professionals grow into.",
    bias: 'Your edge is patience — but watch that it doesn\'t tip into perfectionism, where no setup is ever "good enough".',
    strengths: ['High discipline', 'Selective, high-conviction entries', 'Consistent plan adherence'],
    weaknesses: ['Can miss valid opportunities', 'Sometimes too cautious', 'Perfectionism creep'],
    tips: ['Track "ghost trades" you skipped — check if your caution is edge or fear.', 'Size up slightly on your A+ setups; you can afford to.', 'Set a minimum trades-per-week floor so patience doesn\'t become paralysis.'],
  },
  STO: {
    key: 'STO', name: 'The Stoic', slug: 'stoic', emoji: '🧘', color: '#4FC3F7',
    tagline: 'Calm and regulated — masters emotion, doesn\'t fake it.',
    description: "The market moves; you don't. Your superpower isn't the absence of emotion — it's regulation. You feel the fear and greed like everyone, but they don't get to touch the mouse. Process over outcome, every session.",
    bias: 'Your calm is real edge. The risk: so much rule-following that you miss intuitive signals a more adaptive trader would catch.',
    strengths: ['Emotional regulation', 'Consistent, mechanical execution', 'Process-driven'],
    weaknesses: ['Can lack adaptability', 'May miss intuitive/discretionary signals', 'Routine can turn rigid'],
    tips: ['Keep a small "discretionary" allocation to test intuition without risking the core.', 'Review whether any rule is costing you more than it protects.', 'Your calm is your asset — protect sleep, health and routine that produce it.'],
  },
  CMB: {
    key: 'CMB', name: 'The Comeback Kid', slug: 'comeback-kid', emoji: '💪', color: '#00C853',
    tagline: 'Bounced back from drawdown with discipline.',
    description: "You've been in the hole — and you climbed out the right way. Not with a hero trade, but by cutting size, returning to basics, and grinding back with process. Resilience is a rarer skill than a good entry.",
    bias: 'Resilience is your edge. The trap ahead is overconfidence once you\'re back — the winning streak that follows recovery is where discipline slips.',
    strengths: ['Resilient under pressure', 'Recovers from losses the right way', 'Disciplined in drawdown'],
    weaknesses: ['Overconfidence after a comeback', 'Can push size too soon', 'Recovery high can cloud judgment'],
    tips: ['Keep reduced size for 3–5 clean wins before scaling back up.', 'Watch the post-recovery streak — that\'s when Momentum/Gambler habits sneak in.', 'Journal what got you out of the hole so you can repeat it.'],
  },
  REV: {
    key: 'REV', name: 'The Revenge Trader', slug: 'revenge-trader', emoji: '🔥', color: '#FF5252',
    tagline: 'Chases losses, trades emotionally.',
    description: "A loss doesn't feel like a loss — it feels personal. So you go get it back, right now, bigger. The problem: research shows a loss hurts about twice as much as an equal gain feels good, and that pain is driving the mouse. This is the fastest-known way to turn a small red day into a blown account.",
    bias: 'Loss aversion + "get-even-itis". The next trade has no memory of your last loss — but your amygdala does.',
    strengths: ['Persistent — never gives up', 'Highly motivated', 'Cares deeply about results'],
    weaknesses: ['Revenge trading after losses', 'Emotional, impulsive decisions', 'Increases risk at the worst time'],
    tips: ['Hard rule: 2 losses = platform closed, 4-hour cool-down. No exceptions.', 'Pre-write your max daily loss as a "business expense" before the session.', 'Read the K.M.F. Revenge Trading Kill Switch — a 5-rule protocol built for this.'],
  },
  GAM: {
    key: 'GAM', name: 'The Gambler', slug: 'gambler', emoji: '🎰', color: '#FF5252',
    tagline: 'Impulsive, emotional trading — no plan.',
    description: "Trading feels like a rush, and that rush is the point. Gut entries, sizing by conviction, and rules that bend whenever the moment feels right. It can win for a while — until the math (and the missing plan) catches up. The line between trading and gambling is a journal you can actually read.",
    bias: 'Sensation-seeking + gambler\'s fallacy. Without a measured edge, "trading" is just betting with extra screens.',
    strengths: ['Takes action fast', 'Comfortable with risk', 'Not paralyzed by fear'],
    weaknesses: ['Low discipline / no plan', 'Emotion-driven decisions', 'No consistent risk sizing'],
    tips: ['Pick ONE strategy with written entry/exit rules and trade only it for 30 days.', 'Fix your risk at a constant % — take the "conviction" adjustment off the table.', 'Journal every trade with a reason; if you can\'t write the reason, don\'t take it.'],
  },
  OVR: {
    key: 'OVR', name: 'The Overtrader', slug: 'overtrader', emoji: '🌀', color: '#FFB300',
    tagline: 'Trades too often — quantity over quality.',
    description: "You're always in something. Not out of revenge or panic — out of an itch to act. But Barber & Odean's landmark study found the most active traders earned 11.4% vs the market's 17.9%: every extra trade beyond your edge is a small tax on your account. More clicks ≠ more money.",
    bias: 'Action bias + overconfidence. Overtrading = taking trades your strategy never generated.',
    strengths: ['Highly active and engaged', 'Never misses a real setup', 'Fast to execute'],
    weaknesses: ['Overtrading dilutes quality', 'Higher costs and slippage', 'Fatigue and tilt from volume'],
    tips: ['Cap your trades per day — a hard number written before the session.', 'Ask before each entry: "Did my strategy generate this, or did I?"', 'Track win rate on plan-trades vs impulse-trades; the gap will shock you.'],
  },
  HES: {
    key: 'HES', name: 'The Overthinker', slug: 'overthinker', emoji: '😬', color: '#FFB300',
    tagline: 'Thinks it through — sometimes past the entry.',
    description: "You see the setup. It's textbook. Your hand is on the mouse... and you freeze, then watch it run without you. The trades you don't take are invisible on your P/L, but they cost you just as much. This isn't caution — it's fear wearing caution's costume.",
    bias: 'Analysis paralysis + fear of being wrong. The cure is almost never more analysis — it\'s smaller size, so a loss stops mattering.',
    strengths: ['Cautious with capital', 'Avoids reckless trades', 'Thoughtful and analytical'],
    weaknesses: ['Misses good entries', 'Fear-driven hesitation', 'Analysis paralysis'],
    tips: ['Cut your size until a loss would be genuinely boring — then clicking gets easy.', 'Turn entries into a yes/no checklist decided before the session, not during.', 'Give yourself a 2-second rule: checklist green → click, before doubt floods in.'],
  },
  BAG: {
    key: 'BAG', name: 'The True Believer', slug: 'true-believer', emoji: '💼', color: '#FFB300',
    tagline: 'Believes in the position — long after the chart stops agreeing.',
    description: "You're patient — with the wrong trades. Winners get closed fast to \"lock it in\"; losers get held, and hoped over, and averaged down. This is the textbook disposition effect (Shefrin & Statman): sell winners too soon, ride losers too long. It quietly inverts your risk:reward.",
    bias: 'Disposition effect + sunk-cost fallacy. You hold losers longer than winners — the exact opposite of what the math rewards.',
    strengths: ['Patient with positions', 'Willing to give trades room to work', 'Conviction — you can sit through noise others panic on'],
    weaknesses: ['Disposition effect', 'Lets losers run', 'Cuts winners early'],
    tips: ['Hard rule: no moving a stop further away. Ever. Not once.', 'Let winners hit target; move stop to breakeven only after +1R.', 'Tag your breakeven/early exits — count how many would have been 2–3R.'],
  },
  MOM: {
    key: 'MOM', name: 'The Momentum Rider', slug: 'momentum-rider', emoji: '📈', color: '#4FC3F7',
    tagline: 'Rides winners but can overextend.',
    description: "When you're hot, you're hot — and you know it. You catch momentum, add to strength, and ride the wave. Your edge is conviction; your risk is the house-money effect: after a win, you feel invincible, size up, and the reversal you didn't respect takes it all back.",
    bias: 'Overconfidence + house-money effect + recency bias. A win streak is variance — the market has no memory of your last five trades.',
    strengths: ['Catches momentum well', 'High confidence, good entries', 'Presses winners'],
    weaknesses: ['Overextends positions', 'FOMO risk', 'Gives back gains from greed'],
    tips: ['After any 2R+ win or a 3%+ day, stop — dopamine needs hours to normalize.', 'Keep risk % constant; do not size up on a "hot" feeling.', 'Treat win streaks as a signal to tighten process, not loosen it.'],
  },
};

// ── Scoring ─────────────────────────────────────────────────────────────────
// answers: { [questionId]: optionIndex }
export function scoreTest(answers) {
  const style = QUESTIONS.find(q => q.id === 'style');
  const chosenStyle = style ? style.options[answers['style']]?.style : 'mixed';
  const styleFactor = (chosenStyle === 'scalper' || chosenStyle === 'day') ? 0.5 : 1;

  const totals = {};
  QUESTIONS.forEach(q => {
    const idx = answers[q.id];
    if (idx == null) return;
    const opt = q.options[idx];
    if (!opt || !opt.scores) return;
    for (const [k, v] of Object.entries(opt.scores)) {
      const val = (q.styleSensitive && (k === 'OVR' || k === 'GAM')) ? v * styleFactor : v;
      totals[k] = (totals[k] || 0) + val;
    }
  });

  // Rank by score, tie-break by PRIORITY order.
  const ranked = PRIORITY
    .map(k => ({ key: k, score: totals[k] || 0 }))
    .sort((a, b) => b.score - a.score || PRIORITY.indexOf(a.key) - PRIORITY.indexOf(b.key));

  const winner = ranked[0];

  // Winner takes it — everyone lands in a real archetype.
  // Ties resolve by PRIORITY order (specific → general), same as the app.
  let resultKey = winner.key;

  // Comeback Kid rule (mirrors the app's condition-based evaluation): a confirmed
  // recovery pattern is a biographical fact, not a tendency — it beats point totals.
  // Requires BOTH: recovered a real drawdown the disciplined way AND still reacts
  // to bad weeks by cutting size. Doesn't fire on revenge-style answers.
  if (answers.drawdown === 0 && answers.badweek === 0) resultKey = 'CMB';

  // Top-3 match % for the animated result bars — the final result always leads
  // at 100%. When the Comeback rule overrides the point winner, the runner-ups
  // are compressed (×0.85) so the display matches the verdict.
  const maxScore = Math.max(1, winner.score);
  const runnerFactor = resultKey === winner.key ? 100 : 85;
  const top = [
    { key: resultKey, score: totals[resultKey] || 0 },
    ...ranked.filter(r => r.key !== resultKey && r.score > 0).slice(0, 2),
  ];
  const breakdown = top.map((r, i) => ({
    key: r.key,
    name: PROFILES[r.key].name,
    emoji: PROFILES[r.key].emoji,
    color: PROFILES[r.key].color,
    pct: i === 0 ? 100 : Math.min(95, Math.round((r.score / maxScore) * runnerFactor)),
  }));

  return { resultKey, profile: PROFILES[resultKey], style: chosenStyle, totals, breakdown };
}

export const TOTAL_QUESTIONS = QUESTIONS.length;

// ── Slug helpers (shareable per-result URLs) ────────────────────────────────
export const SLUG_TO_KEY = Object.fromEntries(
  Object.values(PROFILES).map(p => [p.slug, p.key])
);
export const profileBySlug = (slug) => PROFILES[SLUG_TO_KEY[slug]] || null;
