/**
 * Interactive Recharts visualizations for blog articles.
 * Dark-themed to match KMF design system.
 */
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';

const COLORS = {
  cyan: '#4FC3F7',
  green: '#00C853',
  red: '#FF5252',
  gold: '#FFB300',
  purple: '#CE93D8',
  bg: '#0F1115',
  cardBg: '#1A1D24',
  gridLine: '#2A2D35',
  text: '#A0A8C0',
  textPrimary: '#F0F4FF',
};

const chartMargin = { top: 10, right: 10, left: 0, bottom: 5 };

function ChartWrapper({ title, children }) {
  return (
    <div style={{
      background: COLORS.cardBg,
      borderRadius: 12,
      padding: '20px 16px 12px',
      margin: '24px 0',
      border: `1px solid ${COLORS.gridLine}`,
    }}>
      {title && (
        <p style={{
          color: COLORS.textPrimary,
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 16,
          textAlign: 'center',
        }}>{title}</p>
      )}
      {children}
    </div>
  );
}

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#12151B',
      border: `1px solid ${COLORS.gridLine}`,
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 13,
    }}>
      <p style={{ color: COLORS.text, marginBottom: 4 }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color, margin: 0 }}>
          {entry.name}: {formatter ? formatter(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── 1% Risk Rule: Equity Curve Drawdown ───
export function RiskRuleEquityCurve() {
  // Simulate 20 trades with a losing streak from trade 6-12
  const generateEquity = (riskPct) => {
    let balance = 10000;
    const data = [{ trade: 0, balance }];
    // win/loss sequence: some wins, then a 7-trade losing streak, then recovery
    const outcomes = [1, 1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, 1, -1, 1];
    for (let i = 0; i < outcomes.length; i++) {
      const risk = balance * (riskPct / 100);
      // winners get 2R, losers get -1R
      balance += outcomes[i] === 1 ? risk * 2 : -risk;
      data.push({ trade: i + 1, balance: Math.round(balance) });
    }
    return data;
  };

  const data1 = generateEquity(1);
  const data2 = generateEquity(3);
  const data5 = generateEquity(5);

  // Merge into single dataset
  const merged = data1.map((d, i) => ({
    trade: d.trade,
    '1% Risk': d.balance,
    '3% Risk': data2[i].balance,
    '5% Risk': data5[i].balance,
  }));

  return (
    <ChartWrapper title="Equity Curve: 1% vs 3% vs 5% Risk Per Trade (7-Trade Losing Streak)">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={merged} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis
            dataKey="trade"
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            label={{ value: 'Trade #', position: 'insideBottom', offset: -2, fill: COLORS.text, fontSize: 12 }}
          />
          <YAxis
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            tickFormatter={v => `$${(v / 1000).toFixed(1)}k`}
            domain={['dataMin - 500', 'dataMax + 500']}
          />
          <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
          <Legend wrapperStyle={{ fontSize: 12, color: COLORS.text }} />
          <ReferenceLine y={10000} stroke={COLORS.text} strokeDasharray="5 5" strokeOpacity={0.4} />
          <Line type="monotone" dataKey="1% Risk" stroke={COLORS.green} strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="3% Risk" stroke={COLORS.gold} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="5% Risk" stroke={COLORS.red} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// ─── Profit Factor vs Win Rate: 3 Trader Profiles ───
export function ProfitFactorBarChart() {
  const data = [
    { name: 'Scalper A', winRate: 75, profitFactor: 0.75, result: -1500, color: COLORS.red },
    { name: 'Swing B', winRate: 45, profitFactor: 2.06, result: 5750, color: COLORS.green },
    { name: 'Trend C', winRate: 35, profitFactor: 2.33, result: 11250, color: COLORS.cyan },
  ];

  return (
    <ChartWrapper title="Net Result After 100 Trades: High Win Rate ≠ Profit">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={chartMargin} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="name" stroke={COLORS.text} tick={{ fontSize: 12 }} />
          <YAxis
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            tickFormatter={v => `$${v >= 0 ? '' : ''}${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
          <ReferenceLine y={0} stroke={COLORS.text} strokeOpacity={0.5} />
          <Bar dataKey="result" name="Net P/L" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8, fontSize: 12, color: COLORS.text }}>
        {data.map(d => (
          <span key={d.name}>{d.name}: <span style={{ color: d.color }}>{d.winRate}% WR</span> · PF {d.profitFactor}</span>
        ))}
      </div>
    </ChartWrapper>
  );
}

// ─── Revenge Trading: Disciplined vs Revenge Day ───
export function RevengeTradingEquityCurve() {
  // Disciplined day: 4 trades, proper risk, small loss then recovery
  const disciplined = [
    { trade: 'Start', Disciplined: 10000, 'Revenge Day': 10000 },
    { trade: 'Trade 1', Disciplined: 10200, 'Revenge Day': 10200 },
    { trade: 'Trade 2', Disciplined: 10100, 'Revenge Day': 10100 },
    { trade: 'Trade 3', Disciplined: 10300, 'Revenge Day': 9800 },
    { trade: 'Trade 4', Disciplined: 10200, 'Revenge Day': 9400 },
    { trade: 'Trade 5', Disciplined: 10200, 'Revenge Day': 9000 },
    { trade: 'Trade 6', Disciplined: 10200, 'Revenge Day': 8400 },
    { trade: 'End of Day', Disciplined: 10200, 'Revenge Day': 8400 },
  ];
  // Disciplined trader stops at trade 4 (daily loss limit), revenge trader keeps going with bigger size

  return (
    <ChartWrapper title="Same Starting Loss — Two Different Outcomes">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={disciplined} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="trade" stroke={COLORS.text} tick={{ fontSize: 11 }} />
          <YAxis
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            tickFormatter={v => `$${(v / 1000).toFixed(1)}k`}
            domain={[8000, 10600]}
          />
          <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
          <Legend wrapperStyle={{ fontSize: 12, color: COLORS.text }} />
          <ReferenceLine y={10000} stroke={COLORS.text} strokeDasharray="5 5" strokeOpacity={0.4} />
          <Line type="monotone" dataKey="Disciplined" stroke={COLORS.green} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.green }} />
          <Line type="monotone" dataKey="Revenge Day" stroke={COLORS.red} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.red }} />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        The disciplined trader stops after hitting the daily loss limit. The revenge trader doubles down and loses 16% by end of day.
      </p>
    </ChartWrapper>
  );
}

// ─── R-Multiple Distribution Histogram ───
export function RMultipleDistribution() {
  // Simulated distribution of 30 trades
  const data = [
    { range: '-2R+', count: 2, color: COLORS.red },
    { range: '-1R', count: 8, color: COLORS.red },
    { range: '-0.5R', count: 3, color: '#FF8A80' },
    { range: '0R', count: 2, color: COLORS.text },
    { range: '+0.5R', count: 3, color: '#69F0AE' },
    { range: '+1R', count: 4, color: COLORS.green },
    { range: '+2R', count: 5, color: COLORS.green },
    { range: '+3R+', count: 3, color: COLORS.cyan },
  ];

  return (
    <ChartWrapper title="R-Multiple Distribution (30 Trades — Avg R: +0.52R)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={chartMargin} barCategoryGap="15%">
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="range" stroke={COLORS.text} tick={{ fontSize: 12 }} />
          <YAxis
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            allowDecimals={false}
            label={{ value: 'Trades', angle: -90, position: 'insideLeft', fill: COLORS.text, fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip formatter={v => `${v} trades`} />} />
          <Bar dataKey="count" name="Trades" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        A healthy distribution: most losses are capped at -1R, while winners extend to +2R and +3R.
      </p>
    </ChartWrapper>
  );
}

// ─── Trading Expectancy Comparison ───
export function ExpectancyComparisonChart() {
  const data = [
    { strategy: '60% WR / $150 win', expectancy: 50, color: COLORS.green },
    { strategy: '40% WR / $300 win', expectancy: 80, color: COLORS.cyan },
    { strategy: '70% WR / $80 win', expectancy: -4, color: COLORS.red },
    { strategy: '35% WR / $250 win', expectancy: 22.5, color: COLORS.gold },
    { strategy: '55% WR / $120 win', expectancy: -1.5, color: COLORS.red },
    { strategy: '50% WR / $200 win', expectancy: 50, color: COLORS.green },
  ];

  return (
    <ChartWrapper title="Expectancy Per Trade — Higher Win Rate ≠ Higher Expectancy">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ ...chartMargin, left: 10 }} layout="vertical" barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} horizontal={false} />
          <XAxis
            type="number"
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            tickFormatter={v => `$${v}`}
          />
          <YAxis
            type="category"
            dataKey="strategy"
            stroke={COLORS.text}
            tick={{ fontSize: 11 }}
            width={140}
          />
          <Tooltip content={<CustomTooltip formatter={v => `$${v} per trade`} />} />
          <ReferenceLine x={0} stroke={COLORS.text} strokeOpacity={0.5} />
          <Bar dataKey="expectancy" name="Expectancy" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// ─── Static vs Trailing Drawdown Comparison ───
export function DrawdownComparisonChart() {
  // 12-trade sequence on a $100k account. Trader wins, loses, wins, then has a bad day.
  const trades = [
    { trade: 'Start', balance: 100000 },
    { trade: '1', balance: 101500 },  // +1.5k
    { trade: '2', balance: 103200 },  // +1.7k (new high)
    { trade: '3', balance: 102000 },  // -1.2k
    { trade: '4', balance: 104100 },  // +2.1k (new high)
    { trade: '5', balance: 105800 },  // +1.7k (new high)
    { trade: '6', balance: 104200 },  // -1.6k
    { trade: '7', balance: 102800 },  // -1.4k
    { trade: '8', balance: 101000 },  // -1.8k (bad streak)
    { trade: '9', balance: 99500 },   // -1.5k
    { trade: '10', balance: 100800 }, // +1.3k
    { trade: '11', balance: 99200 },  // -1.6k
    { trade: '12', balance: 98000 },  // -1.2k
  ];

  // Static: 5% from initial balance = $95,000 always
  // Trailing: 5% from highest balance reached. Ratchets up but never down.
  let highWater = 100000;
  const data = trades.map(t => {
    if (t.balance > highWater) highWater = t.balance;
    return {
      ...t,
      'Static Limit': 95000,
      'Trailing Limit': Math.round(highWater * 0.95),
    };
  });

  return (
    <ChartWrapper title="Static vs Trailing Drawdown — Same Trades, Different Kill Zone">
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="trade" stroke={COLORS.text} tick={{ fontSize: 12 }} />
          <YAxis
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
            domain={[93000, 107000]}
          />
          <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
          <Legend wrapperStyle={{ fontSize: 12, color: COLORS.text }} />
          <Line type="monotone" dataKey="balance" name="Balance" stroke={COLORS.cyan} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.cyan }} />
          <Line type="stepAfter" dataKey="Static Limit" stroke={COLORS.green} strokeWidth={2} strokeDasharray="8 4" dot={false} />
          <Line type="stepAfter" dataKey="Trailing Limit" stroke={COLORS.red} strokeWidth={2} strokeDasharray="8 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        The trailing limit (red) ratchets up with each new high — making it progressively easier to breach.
        The static limit (green) stays fixed at 5% below your starting balance.
      </p>
    </ChartWrapper>
  );
}

// ─── Scaling Out vs Full TP: Equity Over 30 Trades ───
export function ScalingOutEquityCurve() {
  // Same 30 trades, 40% win rate, 3:1 R:R, risk $100 per trade
  const outcomes = [
    -1,-1,3,-1,-1,3,-1,3,-1,-1,  // trades 1-10
    3,-1,-1,-1,3,-1,3,-1,-1,3,   // trades 11-20
    -1,-1,3,-1,3,-1,-1,3,-1,3,   // trades 21-30
  ];

  let fullTP = 10000;
  let scaleOut = 10000;
  const data = [{ trade: 0, 'Full TP (3R)': fullTP, 'Scale Out (1R+3R)': scaleOut }];

  outcomes.forEach((r, i) => {
    if (r > 0) {
      fullTP += 100 * 3;          // full 3R win
      scaleOut += 100 * (0.5 * 1 + 0.5 * 3); // 50% at 1R + 50% at 3R = 2R effective
    } else {
      fullTP -= 100;
      scaleOut -= 100;
    }
    data.push({
      trade: i + 1,
      'Full TP (3R)': Math.round(fullTP),
      'Scale Out (1R+3R)': Math.round(scaleOut),
    });
  });

  return (
    <ChartWrapper title="Same 30 Trades, Same Win Rate — Different Exit Strategy">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="trade" stroke={COLORS.text} tick={{ fontSize: 12 }} label={{ value: 'Trade #', position: 'insideBottom', offset: -2, fill: COLORS.text, fontSize: 12 }} />
          <YAxis stroke={COLORS.text} tick={{ fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} />
          <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
          <Legend wrapperStyle={{ fontSize: 12, color: COLORS.text }} />
          <ReferenceLine y={10000} stroke={COLORS.text} strokeDasharray="5 5" strokeOpacity={0.4} />
          <Area type="monotone" dataKey="Full TP (3R)" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.1} strokeWidth={2.5} dot={false} />
          <Area type="monotone" dataKey="Scale Out (1R+3R)" stroke={COLORS.gold} fill={COLORS.gold} fillOpacity={0.1} strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        After 30 trades, scaling out leaves $600 on the table — a 33% reduction in profit from the same trades.
      </p>
    </ChartWrapper>
  );
}

// ─── Revenge Trading: Performance Degradation After Consecutive Losses ───
export function ConsecutiveLossImpact() {
  const data = [
    { state: 'Baseline', quality: 100, winRate: 48, color: COLORS.cyan },
    { state: 'After 1 Loss', quality: 85, winRate: 42, color: COLORS.green },
    { state: 'After 2 Losses', quality: 62, winRate: 34, color: COLORS.gold },
    { state: 'After 3 Losses', quality: 38, winRate: 24, color: '#FF8A80' },
    { state: '"One More Trade"', quality: 15, winRate: 12, color: COLORS.red },
  ];

  return (
    <ChartWrapper title="Decision Quality vs Consecutive Losses">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={chartMargin} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="state" stroke={COLORS.text} tick={{ fontSize: 11 }} />
          <YAxis
            stroke={COLORS.text}
            tick={{ fontSize: 12 }}
            tickFormatter={v => `${v}%`}
            domain={[0, 110]}
          />
          <Tooltip content={<CustomTooltip formatter={v => `${v}%`} />} />
          <Bar dataKey="quality" name="Decision Quality" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        By the 4th consecutive loss, your decision-making is operating at 15% capacity.
        That "one more trade" is not trading — it is gambling with cortisol.
      </p>
    </ChartWrapper>
  );
}

// ── Breakeven Stop Too Early ──────────────────────────────────────────────────
export function BreakevenExpectancyChart() {
  const data = [
    { trade: '10', full: 1200, be: 1200 },
    { trade: '20', full: 2800, be: 1900 },
    { trade: '30', full: 4600, be: 2400 },
    { trade: '40', full: 6100, be: 2700 },
    { trade: '50', full: 8200, be: 3100 },
    { trade: '60', full: 9800, be: 3200 },
    { trade: '70', full: 12100, be: 3500 },
    { trade: '80', full: 14500, be: 3600 },
    { trade: '90', full: 16200, be: 3400 },
    { trade: '100', full: 18800, be: 3700 },
  ];
  return (
    <ChartWrapper title="Cumulative P/L: Full Take Profit vs Premature Breakeven Stop">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="trade" stroke={COLORS.text} tick={{ fontSize: 12 }} label={{ value: 'Trades', position: 'insideBottom', offset: -2, fill: COLORS.text, fontSize: 12 }} />
          <YAxis stroke={COLORS.text} tick={{ fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip formatter={v => `$${v.toLocaleString()}`} />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="full" name="Full TP (3R target)" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.15} strokeWidth={2} />
          <Area type="monotone" dataKey="be" name="Breakeven Stop at +0.5R" stroke={COLORS.gold} fill={COLORS.gold} fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        Same strategy, same entries, same win rate. The only difference: moving your stop to breakeven too early
        costs you 80% of your profits over 100 trades.
      </p>
    </ChartWrapper>
  );
}

// ── Scared Money Performance ──────────────────────────────────────────────────
export function ScaredMoneyChart() {
  const data = [
    { week: 'Wk 1', calm: 2.1, scared: 1.8 },
    { week: 'Wk 2', calm: 1.5, scared: 0.3 },
    { week: 'Wk 3', calm: -0.8, scared: -2.1 },
    { week: 'Wk 4', calm: 2.4, scared: -0.5 },
    { week: 'Wk 5', calm: 1.1, scared: -1.8 },
    { week: 'Wk 6', calm: -0.3, scared: -3.2 },
    { week: 'Wk 7', calm: 1.9, scared: -0.9 },
    { week: 'Wk 8', calm: 2.7, scared: 0.4 },
  ];
  return (
    <ChartWrapper title="Weekly Returns: Calm Execution vs 'Scared Money' Trading">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="week" stroke={COLORS.text} tick={{ fontSize: 12 }} />
          <YAxis stroke={COLORS.text} tick={{ fontSize: 12 }} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip formatter={v => `${v}%`} />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <ReferenceLine y={0} stroke={COLORS.text} strokeOpacity={0.3} />
          <Bar dataKey="calm" name="Calm Execution" fill={COLORS.green} radius={[4, 4, 0, 0]} />
          <Bar dataKey="scared" name="Scared Money" fill={COLORS.red} radius={[4, 4, 0, 0]} opacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        Same strategy, same market. The scared trader exits winners early, hesitates on entries,
        and panic-closes during normal drawdowns. Result: +10.6% vs -6.0% over 8 weeks.
      </p>
    </ChartWrapper>
  );
}

// ── Lotto Ticket Risk Escalation ──────────────────────────────────────────────
export function LottoTicketChart() {
  const data = [
    { trade: 'Mon AM', risk: 1, pnl: 280, fill: COLORS.green },
    { trade: 'Mon PM', risk: 1, pnl: 195, fill: COLORS.green },
    { trade: 'Tue AM', risk: 1.5, pnl: 410, fill: COLORS.green },
    { trade: 'Tue PM', risk: 2, pnl: 520, fill: COLORS.gold },
    { trade: 'Wed AM', risk: 2.5, pnl: -625, fill: COLORS.red },
    { trade: 'Wed PM', risk: 3, pnl: -890, fill: COLORS.red },
    { trade: 'Thu AM', risk: 3.5, pnl: -1050, fill: COLORS.red },
  ];
  return (
    <ChartWrapper title="The Lotto Ticket Cycle: How a Winning Week Becomes a Losing One">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis dataKey="trade" stroke={COLORS.text} tick={{ fontSize: 11 }} />
          <YAxis stroke={COLORS.text} tick={{ fontSize: 12 }} tickFormatter={v => `$${v}`} />
          <Tooltip content={<CustomTooltip formatter={v => `$${v}`} />} />
          <ReferenceLine y={0} stroke={COLORS.text} strokeOpacity={0.3} />
          <Bar dataKey="pnl" name="P/L per Trade" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        Monday: disciplined 1% risk, +$475. By Wednesday: 2.5% risk, -$625 in one trade.
        The dopamine from winning made the risk invisible.
      </p>
    </ChartWrapper>
  );
}

// ── Prospect Theory Value Function ────────────────────────────────────────────
export function ProspectTheoryChart() {
  const data = [];
  for (let x = -100; x <= 100; x += 5) {
    let value;
    if (x >= 0) {
      value = Math.pow(x, 0.65);
    } else {
      value = -2.25 * Math.pow(Math.abs(x), 0.65);
    }
    data.push({ x, value: Math.round(value * 10) / 10 });
  }
  return (
    <ChartWrapper title="Kahneman's Prospect Theory: How Your Brain Values Gains vs Losses">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
          <XAxis
            dataKey="x"
            stroke={COLORS.text}
            tick={{ fontSize: 11 }}
            label={{ value: 'Actual P/L ($)', position: 'insideBottom', offset: -12, fill: COLORS.text, fontSize: 12 }}
          />
          <YAxis
            stroke={COLORS.text}
            tick={{ fontSize: 11 }}
            label={{ value: 'Perceived Value', angle: -90, position: 'insideLeft', fill: COLORS.text, fontSize: 12, dx: -5 }}
          />
          <Tooltip content={<CustomTooltip formatter={v => v.toFixed(1)} />} />
          <ReferenceLine x={0} stroke={COLORS.text} strokeOpacity={0.4} />
          <ReferenceLine y={0} stroke={COLORS.text} strokeOpacity={0.4} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={COLORS.purple}
            fill={COLORS.purple}
            fillOpacity={0.1}
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p style={{ textAlign: 'center', color: COLORS.text, fontSize: 12, marginTop: 8 }}>
        A $100 loss hurts 2.25x more than a $100 gain feels good. That asymmetry is why
        you close winners at +$50 but hold losers past -$200 hoping they come back.
      </p>
    </ChartWrapper>
  );
}
