/**
 * Interactive Recharts visualizations for blog articles.
 * Dark-themed to match KMF design system.
 */
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
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
