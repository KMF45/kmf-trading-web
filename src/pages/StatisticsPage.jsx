import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTrades } from '../contexts/TradesContext';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { FaChartLine, FaRocket, FaChartBar, FaFire, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTrophy } from 'react-icons/fa';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell as PieCell, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { calculateRMultiple } from '../utils/models';
import { getTradingSession, TradingSession, EmotionMeta } from '../data/models';

const TIME_RANGES = [
  { key: '7d', label: '7 Days' },
  { key: '30d', label: '30 Days' },
  { key: '3m', label: '3 Months' },
  { key: 'ytd', label: 'YTD' },
  { key: 'all', label: 'All Time' },
];

const getTimeRangeStart = (key) => {
  const now = new Date();
  switch (key) {
    case '7d': return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime();
    case '30d': return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).getTime();
    case '3m': return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).getTime();
    case 'ytd': return new Date(now.getFullYear(), 0, 1).getTime();
    default: return 0;
  }
};

const PIE_COLORS = ['#4FC3F7', '#00E676', '#FF5252', '#FFB300', '#CE93D8', '#FF9800', '#26A69A', '#EF5350', '#AB47BC', '#42A5F5'];

const MonthlyTooltip = ({ active, payload, label }) => {
  if (active && payload?.[0]) {
    const val = payload[0].value;
    return (
      <div className="tooltip-glow rounded-lg px-3 py-2">
        <p className="text-xs text-kmf-text-tertiary mb-0.5">{label}</p>
        <p className={`text-sm font-bold ${val >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
          {val >= 0 ? '+' : ''}${val.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

// Trader personality engine — matches Android TraderPersonality
const getTraderPersonality = (stats, closedTrades) => {
  const { winRate, profitFactor, disciplinePercent, avgRMultiple } = stats;
  const total = closedTrades.length;
  if (total < 5) return null;

  const emotionCounts = {};
  closedTrades.forEach(t => {
    if (t.emotionBefore) emotionCounts[t.emotionBefore] = (emotionCounts[t.emotionBefore] || 0) + 1;
  });
  const dominantEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
  const emotionKeys = Object.keys(emotionCounts);
  const stability = emotionKeys.length > 0 ? Math.round((1 - (emotionKeys.length - 1) / 6) * 100) : 50;

  const profitable = profitFactor >= 1.0;
  const disciplined = disciplinePercent >= 70;
  const consistent = winRate >= 45;
  const riskAware = avgRMultiple >= -0.5;

  let name, subtitle, icon, strengths, weaknesses;

  if (disciplined && profitable && consistent) {
    name = 'THE SNIPER';
    subtitle = 'Precise and calculated';
    icon = '🎯';
    strengths = ['Strong discipline', 'Consistent execution', 'Good risk management'];
    weaknesses = winRate < 60 ? ['Could improve entry timing'] : ['May miss opportunities by being too selective'];
  } else if (!disciplined && profitable) {
    name = 'THE WAVE RIDER';
    subtitle = 'Flexible but inconsistent';
    icon = '🌊';
    strengths = ['Adaptable', 'Open to learning', 'Balanced approach'];
    weaknesses = ['Inconsistent execution', 'Needs more structure'];
  } else if (disciplined && !profitable) {
    name = 'THE STUDENT';
    subtitle = 'Disciplined but still learning';
    icon = '📚';
    strengths = ['Great discipline', 'Follows rules', 'Systematic approach'];
    weaknesses = ['Strategy needs refinement', 'Edge not yet developed'];
  } else if (!disciplined && !profitable && !riskAware) {
    name = 'THE GAMBLER';
    subtitle = 'High risk, low discipline';
    icon = '🎰';
    strengths = ['Brave', 'Not afraid to take action'];
    weaknesses = ['Poor risk management', 'No clear strategy', 'Emotional trading'];
  } else if (consistent && !disciplined) {
    name = 'THE INTUITIVE';
    subtitle = 'Good instincts, loose rules';
    icon = '🔮';
    strengths = ['Good market feel', 'Profitable instincts'];
    weaknesses = ['Relies too much on gut feeling', 'Inconsistent process'];
  } else {
    name = 'THE EXPLORER';
    subtitle = 'Finding your style';
    icon = '🧭';
    strengths = ['Open to experimentation', 'Learning from mistakes'];
    weaknesses = ['No defined style yet', 'Needs more experience'];
  }

  const progressLabel = disciplined && profitable ? 'Disciplined & Profitable'
    : disciplined ? 'Disciplined, Improving'
    : profitable ? 'Profitable, Needs Discipline'
    : 'Building Foundation';

  return {
    name, subtitle, icon, strengths, weaknesses, progressLabel,
    dominantEmotion: dominantEmotion ? { key: dominantEmotion[0], count: dominantEmotion[1] } : null,
    stability,
  };
};

const StatisticsPage = () => {
  const { stats, closedTrades, getPnL, settings } = useTrades();
  const [timeRange, setTimeRange] = useState('all');

  // Filter trades by time range
  const filteredTrades = useMemo(() => {
    if (timeRange === 'all') return closedTrades;
    const start = getTimeRangeStart(timeRange);
    return closedTrades.filter(t => (t.tradeDateTime || t.timestamp) >= start);
  }, [closedTrades, timeRange]);

  // Filtered stats
  const fStats = useMemo(() => {
    const trades = filteredTrades;
    const wins = trades.filter(t => t.result === 'PROFIT');
    const losses = trades.filter(t => t.result === 'LOSS');
    const totalPL = trades.reduce((s, t) => s + getPnL(t), 0);
    const winRate = trades.length > 0 ? (wins.length / trades.length) * 100 : 0;
    const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + getPnL(t), 0) / wins.length : 0;
    const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + getPnL(t), 0) / losses.length) : 0;
    const totalWinAmt = wins.reduce((s, t) => s + getPnL(t), 0);
    const totalLossAmt = Math.abs(losses.reduce((s, t) => s + getPnL(t), 0));
    const profitFactor = totalLossAmt > 0 ? totalWinAmt / totalLossAmt : totalWinAmt;
    const expectancy = trades.length > 0 ? ((winRate / 100) * avgWin) - ((1 - winRate / 100) * avgLoss) : 0;
    const avgRMul = trades.length > 0 ? trades.reduce((s, t) => s + calculateRMultiple(t), 0) / trades.length : 0;
    const bestTrade = trades.length > 0 ? Math.max(...trades.map(t => getPnL(t))) : 0;
    const worstTrade = trades.length > 0 ? Math.min(...trades.map(t => getPnL(t))) : 0;
    return { totalPL, winRate, avgWin, avgLoss, profitFactor, expectancy, avgRMultiple: avgRMul, bestTrade, worstTrade, closedTrades: trades.length, wins: wins.length, losses: losses.length, pfQuality: profitFactor >= 2 ? 'Excellent' : profitFactor >= 1 ? 'Good' : 'Poor' };
  }, [filteredTrades, getPnL]);

  const displayStats = timeRange === 'all' ? stats : { ...stats, ...fStats };
  const displayTrades = filteredTrades;
  const currency = settings?.currency || 'USD';

  // R-Multiple Distribution
  const rMultipleData = useMemo(() => {
    const buckets = { '3R+': 0, '2R-3R': 0, '1R-2R': 0, '0R-1R': 0, '-1R-0R': 0, '-2R--1R': 0, '<-2R': 0 };
    displayTrades.forEach(t => {
      const r = calculateRMultiple(t);
      if (r >= 3) buckets['3R+']++;
      else if (r >= 2) buckets['2R-3R']++;
      else if (r >= 1) buckets['1R-2R']++;
      else if (r >= 0) buckets['0R-1R']++;
      else if (r >= -1) buckets['-1R-0R']++;
      else if (r >= -2) buckets['-2R--1R']++;
      else buckets['<-2R']++;
    });
    return Object.entries(buckets).filter(([, v]) => v > 0).map(([name, count]) => ({ name, count }));
  }, [displayTrades]);

  // Equity Curve data
  const equityCurve = useMemo(() => {
    if (displayTrades.length === 0) return [];
    const sorted = [...displayTrades].sort((a, b) => (a.tradeDateTime || a.timestamp) - (b.tradeDateTime || b.timestamp));
    let running = 0;
    return sorted.map((t, i) => {
      running += getPnL(t);
      const d = new Date(t.tradeDateTime || t.timestamp);
      return { trade: i + 1, date: `${d.getDate()} ${d.toLocaleDateString('en', { month: 'short' })}`, equity: parseFloat(running.toFixed(2)) };
    });
  }, [displayTrades, getPnL]);

  // P&L by Day of Week — matches Android screenshot
  const plByDay = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = days.map(d => ({ day: d, pl: 0, count: 0 }));
    displayTrades.forEach(t => {
      const dt = new Date(t.tradeDateTime || t.timestamp);
      const dayIdx = dt.getDay(); // 0=Sun, 1=Mon...6=Sat
      if (dayIdx >= 1 && dayIdx <= 6) {
        data[dayIdx - 1].pl += getPnL(t);
        data[dayIdx - 1].count++;
      }
    });
    return data.filter(d => d.count > 0);
  }, [displayTrades, getPnL]);

  // P&L by Session — Asian/London/NY with flags
  const plBySession = useMemo(() => {
    const sessions = {
      [TradingSession.ASIAN]: { name: 'Asian', flag: '🌏', pl: 0, trades: 0, wins: 0 },
      [TradingSession.LONDON]: { name: 'London', flag: '🇬🇧', pl: 0, trades: 0, wins: 0 },
      [TradingSession.NEW_YORK]: { name: 'New York', flag: '🇺🇸', pl: 0, trades: 0, wins: 0 },
    };
    displayTrades.forEach(t => {
      const session = getTradingSession(t);
      sessions[session].pl += getPnL(t);
      sessions[session].trades++;
      if (t.result === 'PROFIT') sessions[session].wins++;
    });
    const result = Object.values(sessions);
    const bestSession = result.filter(s => s.trades > 0).sort((a, b) => {
      const wrA = a.trades > 0 ? (a.wins / a.trades) * 100 : 0;
      const wrB = b.trades > 0 ? (b.wins / b.trades) * 100 : 0;
      return wrB - wrA;
    })[0];
    return { sessions: result, bestSession };
  }, [displayTrades, getPnL]);

  // Top Pairs P/L for PIE CHART
  const topPairsPie = useMemo(() => {
    const map = {};
    displayTrades.forEach(t => {
      const inst = t.instrument || 'Unknown';
      if (!map[inst]) map[inst] = { instrument: inst, pl: 0, trades: 0, wins: 0 };
      map[inst].pl += getPnL(t);
      map[inst].trades++;
      if (t.result === 'PROFIT') map[inst].wins++;
    });
    return Object.values(map).sort((a, b) => Math.abs(b.pl) - Math.abs(a.pl));
  }, [displayTrades, getPnL]);

  // Emotion Stats — distribution of emotionBefore
  const emotionStats = useMemo(() => {
    const counts = {};
    let total = 0;
    displayTrades.forEach(t => {
      if (t.emotionBefore) {
        counts[t.emotionBefore] = (counts[t.emotionBefore] || 0) + 1;
        total++;
      }
    });
    return Object.entries(counts).map(([key, count]) => ({
      key,
      meta: EmotionMeta[key],
      count,
      percent: total > 0 ? Math.round((count / total) * 100) : 0,
    })).sort((a, b) => b.count - a.count);
  }, [displayTrades]);

  // Emotional Journey — before→after transitions
  const emotionalJourney = useMemo(() => {
    const transitions = {};
    displayTrades.forEach(t => {
      if (t.emotionBefore && t.emotionAfter) {
        const key = `${t.emotionBefore}→${t.emotionAfter}`;
        transitions[key] = (transitions[key] || 0) + 1;
      }
    });
    return Object.entries(transitions)
      .map(([key, count]) => {
        const [before, after] = key.split('→');
        return { before, after, count, beforeMeta: EmotionMeta[before], afterMeta: EmotionMeta[after] };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [displayTrades]);

  // Honesty Mirror — rating analysis for winners vs losers
  const honestyMirror = useMemo(() => {
    const wins = displayTrades.filter(t => t.result === 'PROFIT');
    const losses = displayTrades.filter(t => t.result === 'LOSS');
    const avgRatingWins = wins.length > 0 ? wins.reduce((s, t) => s + (t.rating || 0), 0) / wins.length : 0;
    const avgRatingLosses = losses.length > 0 ? losses.reduce((s, t) => s + (t.rating || 0), 0) / losses.length : 0;
    const overconfident = wins.filter(t => (t.rating || 0) <= 2).length;
    const underconfident = losses.filter(t => (t.rating || 0) >= 4).length;
    const totalRated = displayTrades.filter(t => t.rating > 0).length;
    const honestyScore = totalRated > 0
      ? Math.round(100 - ((overconfident + underconfident) / totalRated) * 100)
      : 100;
    return { avgRatingWins, avgRatingLosses, overconfident, underconfident, honestyScore };
  }, [displayTrades]);

  // Duration Stats — avg trade duration
  const durationStats = useMemo(() => {
    const tradesWithClose = displayTrades.filter(t => t.closeDateTime && t.tradeDateTime);
    if (tradesWithClose.length === 0) {
      // Fallback: use all trades and estimate duration as time between consecutive trades
      return null;
    }
    const durations = tradesWithClose.map(t => t.closeDateTime - t.tradeDateTime);
    const winDurations = tradesWithClose.filter(t => t.result === 'PROFIT').map(t => t.closeDateTime - t.tradeDateTime);
    const lossDurations = tradesWithClose.filter(t => t.result === 'LOSS').map(t => t.closeDateTime - t.tradeDateTime);
    const avg = durations.reduce((s, d) => s + d, 0) / durations.length;
    const avgWin = winDurations.length > 0 ? winDurations.reduce((s, d) => s + d, 0) / winDurations.length : 0;
    const avgLoss = lossDurations.length > 0 ? lossDurations.reduce((s, d) => s + d, 0) / lossDurations.length : 0;
    return { avg, avgWin, avgLoss };
  }, [displayTrades]);

  // Trader Personality
  const personality = useMemo(() => getTraderPersonality(displayStats, displayTrades), [displayStats, displayTrades]);

  // Heatmap
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const HOURS = ['00-03', '04-07', '08-11', '12-15', '16-19', '20-23'];
  const heatmapData = useMemo(() => {
    const grid = {};
    DAYS.forEach(d => { grid[d] = {}; HOURS.forEach(h => { grid[d][h] = { pl: 0, count: 0 }; }); });
    displayTrades.forEach(t => {
      const dt = new Date(t.tradeDateTime || t.timestamp);
      const dayIdx = dt.getDay();
      const day = DAYS[dayIdx === 0 ? 6 : dayIdx - 1];
      const hour = dt.getHours();
      const hourBlock = HOURS[Math.floor(hour / 4)];
      grid[day][hourBlock].pl += getPnL(t);
      grid[day][hourBlock].count++;
    });
    return grid;
  }, [displayTrades, getPnL]);

  const heatmapRange = useMemo(() => {
    let min = 0, max = 0;
    DAYS.forEach(d => HOURS.forEach(h => {
      const v = heatmapData[d]?.[h]?.pl || 0;
      if (v < min) min = v;
      if (v > max) max = v;
    }));
    return { min, max };
  }, [heatmapData]);

  const getHeatColor = (val) => {
    if (val === 0) return 'rgba(255,255,255,0.03)';
    if (val > 0) {
      const intensity = heatmapRange.max > 0 ? Math.min(val / heatmapRange.max, 1) : 0;
      return `rgba(0,230,118,${0.1 + intensity * 0.5})`;
    }
    const intensity = heatmapRange.min < 0 ? Math.min(Math.abs(val) / Math.abs(heatmapRange.min), 1) : 0;
    return `rgba(255,82,82,${0.1 + intensity * 0.5})`;
  };

  const disciplineLabel = displayStats.disciplinePercent >= 80 ? 'CONSISTENT' : displayStats.disciplinePercent >= 60 ? 'MODERATE' : 'NEEDS WORK';

  // Win rate ring
  const wr = displayStats.winRate;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (wr / 100) * circumference;

  const formatDuration = (ms) => {
    if (!ms || ms <= 0) return '--';
    const totalMin = Math.floor(ms / 60000);
    const days = Math.floor(totalMin / 1440);
    const hours = Math.floor((totalMin % 1440) / 60);
    const mins = totalMin % 60;
    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (closedTrades.length === 0) {
    return (
      <div className="max-w-7xl mx-auto animate-fadeIn">
        <h1 className="text-2xl font-bold text-kmf-text-primary mb-6">Statistics</h1>
        <div className="glass-card rounded-2xl p-12 text-center">
          <FaChartLine className="text-kmf-accent/30 text-4xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-kmf-text-primary mb-1">No closed trades yet</h2>
          <p className="text-kmf-text-tertiary text-sm">Statistics will appear after you close your first trade</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5 stagger-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Statistics</h1>
          <p className="text-sm text-kmf-text-tertiary">Performance Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/app/profile" className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold ${stats.traderBadge.bg} ${stats.traderBadge.color} hover:opacity-80 transition-opacity`}>
            <FaTrophy size={10} /> {stats.traderBadge.badge}
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-kmf-accent/15 text-kmf-accent">
            {stats.tradingLevel.label}
          </span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 flex-wrap">
        {TIME_RANGES.map((tr) => (
          <button key={tr.key} onClick={() => setTimeRange(tr.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium hover-scale transition-all ${
              timeRange === tr.key
                ? 'bg-kmf-accent/20 text-kmf-accent border border-kmf-accent/40'
                : 'bg-kmf-surface/50 border border-white/5 text-kmf-text-tertiary hover:border-kmf-accent/20'
            }`}>
            {tr.label}
          </button>
        ))}
      </div>

      {/* Insights */}
      {stats.insights.length > 0 && (
        <div className="space-y-2">
          {stats.insights.map((insight, i) => (
            <div key={i} className={`glass-card rounded-xl p-3 flex items-start gap-3 ${
              insight.type === 'CRITICAL' ? 'border-kmf-loss/30' :
              insight.type === 'WARNING' ? 'border-yellow-500/30' :
              insight.type === 'SUCCESS' ? 'border-kmf-profit/30' : 'border-blue-500/30'
            }`} style={{ borderWidth: 1 }}>
              {insight.type === 'CRITICAL' && <FaExclamationTriangle className="text-red-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'WARNING' && <FaExclamationTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'SUCCESS' && <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" />}
              {insight.type === 'INFO' && <FaInfoCircle className="text-blue-400 mt-0.5 flex-shrink-0" />}
              <p className="text-xs text-kmf-text-secondary">{insight.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Win Rate + Total P/L */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Win Rate Circle */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">WIN RATE</p>
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(26,29,36,0.8)" strokeWidth="8" />
              <circle cx="60" cy="60" r={radius} fill="none"
                stroke="url(#winRateGradient)" strokeWidth="8"
                strokeDasharray={circumference}
                strokeLinecap="round"
                className="ring-animate"
                style={{ '--ring-circumference': circumference, '--ring-offset': circumference - strokeDash }} />
              <defs>
                <linearGradient id="winRateGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00E676" />
                  <stop offset="100%" stopColor="#4FC3F7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-kmf-profit">
                <AnimatedNumber value={wr} decimals={0} />%
              </span>
              <span className="text-[10px] text-kmf-text-tertiary mt-0.5">win rate</span>
            </div>
          </div>
          <p className="text-sm text-kmf-text-tertiary mt-3">{displayStats.closedTrades} Trades</p>
        </div>

        {/* Total P/L + Profit Factor */}
        <div className="glass-card rounded-2xl p-6 hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">TOTAL P/L</p>
          <p className={`text-4xl font-black ${displayStats.totalPL >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            <AnimatedNumber value={displayStats.totalPL} prefix={displayStats.totalPL >= 0 ? '+' : ''} suffix="" decimals={0} />
            <span className="text-lg font-medium text-kmf-text-tertiary ml-2">{currency}</span>
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1 mb-4">{displayStats.totalPL >= 0 ? 'net profit' : 'net loss'}</p>
          <div className="border-t border-white/5 pt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-kmf-text-tertiary">Profit Factor</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-kmf-profit">{displayStats.profitFactor.toFixed(2)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  displayStats.pfQuality === 'Excellent' ? 'bg-kmf-profit/15 text-kmf-profit' :
                  displayStats.pfQuality === 'Good' ? 'bg-yellow-500/15 text-yellow-400' :
                  'bg-kmf-loss/15 text-kmf-loss'
                }`}>{displayStats.pfQuality}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-kmf-text-tertiary">Avg R-Multiple</span>
              <span className={`text-sm font-bold ${displayStats.avgRMultiple >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {displayStats.avgRMultiple >= 0 ? '+' : ''}{displayStats.avgRMultiple.toFixed(2)}R
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expectancy + Discipline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stat-card stat-card-accent p-5 hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">EXPECTANCY</p>
          <p className={`text-3xl font-black ${displayStats.expectancy >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
            <AnimatedNumber value={displayStats.expectancy} prefix="" decimals={0} />
            <span className="text-lg font-medium text-kmf-text-tertiary ml-1">{currency}</span>
          </p>
          <p className="text-xs text-kmf-text-tertiary mt-1">per trade</p>
          <div className="border-t border-white/5 mt-3 pt-3 space-y-1">
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Win</span><span className="text-xs font-bold text-kmf-profit">+{displayStats.avgWin.toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-xs text-kmf-text-tertiary">Avg Loss</span><span className="text-xs font-bold text-kmf-loss">-{displayStats.avgLoss.toFixed(0)}</span></div>
          </div>
        </div>

        <div className="stat-card p-5 text-center hover-tilt">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-2">DISCIPLINE</p>
          <div className="relative w-24 h-24 mx-auto mb-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(26,29,36,0.8)" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none"
                stroke={displayStats.disciplinePercent >= 70 ? '#00E676' : '#FF5252'}
                strokeWidth="6" strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={(1 - displayStats.disciplinePercent / 100) * 2 * Math.PI * 42}
                strokeLinecap="round" className="ring-animate"
                style={{ '--ring-circumference': 2 * Math.PI * 42, '--ring-offset': (1 - displayStats.disciplinePercent / 100) * 2 * Math.PI * 42 }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-black ${displayStats.disciplinePercent >= 70 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                {displayStats.disciplinePercent.toFixed(0)}%
              </span>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
            displayStats.disciplinePercent >= 80 ? 'bg-kmf-profit/15 text-kmf-profit' : displayStats.disciplinePercent >= 60 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-kmf-loss/15 text-kmf-loss'
          }`}>{disciplineLabel}</span>
        </div>
      </div>

      {/* R-Multiple Distribution */}
      {rMultipleData.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">R-MULTIPLE DISTRIBUTION</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={rMultipleData} layout="vertical">
              <XAxis type="number" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={80} />
              <Tooltip content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  return (
                    <div className="tooltip-glow rounded-lg px-3 py-2">
                      <p className="text-sm text-kmf-text-primary">{payload[0].payload.name}: <b className="text-kmf-accent">{payload[0].value}</b></p>
                    </div>
                  );
                }
                return null;
              }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {rMultipleData.map((entry, i) => (
                  <Cell key={i} fill={entry.name.includes('-') || entry.name.includes('<') ? '#FF5252' : '#4FC3F7'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Best / Worst / Streak */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card stat-card-profit p-4 hover-tilt">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">BEST</p>
            <FaRocket className="text-kmf-profit text-xs" />
          </div>
          <p className="text-lg font-black text-kmf-profit">
            <AnimatedNumber value={displayStats.bestTrade} prefix="+" decimals={0} />
          </p>
          <p className="text-[10px] text-kmf-text-tertiary">{currency}</p>
        </div>
        <div className="stat-card stat-card-loss p-4 hover-tilt">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">WORST</p>
            <FaChartBar className="text-kmf-loss text-xs" />
          </div>
          <p className="text-lg font-black text-kmf-loss">
            <AnimatedNumber value={Math.abs(displayStats.worstTrade)} prefix="" decimals={0} />
          </p>
          <p className="text-[10px] text-kmf-text-tertiary">{currency}</p>
        </div>
        <div className="stat-card p-4 hover-tilt" style={{ borderLeft: '3px solid rgba(251,146,60,0.5)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">STREAK</p>
            <FaFire className="text-orange-400 text-xs" />
          </div>
          <p className="text-lg font-black text-orange-400">{displayStats.tradingStreak}d</p>
        </div>
      </div>

      {/* P&L by Day — bar chart matching Android */}
      {plByDay.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">P&L BY DAY</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={plByDay} barSize={36}>
              <XAxis dataKey="day" stroke="#546E7A" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={50} tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v}`} />
              <Tooltip content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  const v = payload[0].value;
                  return (
                    <div className="tooltip-glow rounded-lg px-3 py-2">
                      <p className="text-xs text-kmf-text-tertiary mb-0.5">{payload[0].payload.day}</p>
                      <p className={`text-sm font-bold ${v >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                        {v >= 0 ? '+' : ''}{v.toFixed(0)} {currency}
                      </p>
                    </div>
                  );
                }
                return null;
              }} />
              <Bar dataKey="pl" radius={[6, 6, 0, 0]}>
                {plByDay.map((entry, i) => (
                  <Cell key={i} fill={entry.pl >= 0 ? '#00E676' : '#FF5252'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* P&L by Session — Asian/London/NY */}
      {displayTrades.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">P&L BY SESSION</p>
          <div className="space-y-3">
            {plBySession.sessions.map((s, i) => {
              const wr = s.trades > 0 ? Math.round((s.wins / s.trades) * 100) : 0;
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-kmf-surface/30">
                  <span className="text-2xl">{s.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-kmf-text-primary">{s.name}</p>
                    <p className="text-xs text-kmf-text-tertiary">{s.trades} trades · {wr}% WR</p>
                  </div>
                  <p className={`text-sm font-bold ${s.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                    {s.pl >= 0 ? '+' : ''}{s.pl.toFixed(0)}
                  </p>
                </div>
              );
            })}
          </div>
          {plBySession.bestSession && plBySession.bestSession.trades > 0 && (
            <p className="text-xs text-kmf-accent mt-3 font-medium">
              Best: {plBySession.bestSession.name} ({Math.round((plBySession.bestSession.wins / plBySession.bestSession.trades) * 100)}% WR)
            </p>
          )}
        </div>
      )}

      {/* Top Pairs P/L — Pie Chart */}
      {topPairsPie.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">TOP PAIRS P/L</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={240} className="sm:w-1/2">
              <PieChart>
                <Pie data={topPairsPie} dataKey="pl" nameKey="instrument" cx="50%" cy="50%"
                  outerRadius={90} innerRadius={0} label={({ instrument, pl }) => `${instrument}`}
                  labelLine={false} fontSize={10}>
                  {topPairsPie.map((_, i) => (
                    <PieCell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} fillOpacity={0.85} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (active && payload?.[0]) {
                    const d = payload[0].payload;
                    return (
                      <div className="tooltip-glow rounded-lg px-3 py-2">
                        <p className="text-xs font-bold text-kmf-text-primary">{d.instrument}</p>
                        <p className={`text-sm font-bold ${d.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                          {d.pl >= 0 ? '+' : ''}{d.pl.toFixed(0)} {currency}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 w-full sm:w-1/2">
              {topPairsPie.map((pair, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-xs text-kmf-text-primary flex-1">{pair.instrument}</span>
                  <span className={`text-xs font-bold ${pair.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                    {pair.pl >= 0 ? '+' : ''}{pair.pl.toFixed(0)} {currency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emotion Stats */}
      {emotionStats.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">EMOTION STATS</p>
          <div className="space-y-3">
            {emotionStats.map(({ key, meta, count, percent }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-lg">{meta.icon}</span>
                <span className="text-xs text-kmf-text-primary w-20">{meta.label}</span>
                <div className="flex-1 h-2.5 rounded-full bg-kmf-surface overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%`, backgroundColor: meta.color }} />
                </div>
                <span className="text-xs font-bold" style={{ color: meta.color }}>{percent}%</span>
                <span className="text-[10px] text-kmf-text-tertiary">({count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emotional Journey — before → after transitions */}
      {emotionalJourney.length > 0 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">EMOTIONAL JOURNEY</p>
          <p className="text-xs text-kmf-text-tertiary mb-3">Most common emotion transitions</p>
          <div className="space-y-2">
            {emotionalJourney.map(({ before, after, count, beforeMeta, afterMeta }, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-kmf-surface/30">
                <span className="text-lg">{beforeMeta?.icon}</span>
                <span className="text-xs text-kmf-text-secondary">{beforeMeta?.label}</span>
                <span className="text-kmf-accent text-xs">→</span>
                <span className="text-lg">{afterMeta?.icon}</span>
                <span className="text-xs text-kmf-text-secondary">{afterMeta?.label}</span>
                <span className="ml-auto text-xs font-bold text-kmf-text-tertiary">×{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Honesty Mirror */}
      {displayTrades.length >= 3 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">HONESTY MIRROR</p>
          <div className="text-center mb-4">
            <p className="text-4xl font-black text-kmf-accent">{honestyMirror.honestyScore}%</p>
            <p className="text-xs text-kmf-text-tertiary mt-1">Honesty Score</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-kmf-surface/50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-kmf-text-tertiary uppercase mb-1">Avg Rating Winners</p>
              <p className="text-lg font-bold text-kmf-profit">{honestyMirror.avgRatingWins.toFixed(1)}/5</p>
            </div>
            <div className="bg-kmf-surface/50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-kmf-text-tertiary uppercase mb-1">Avg Rating Losers</p>
              <p className="text-lg font-bold text-kmf-loss">{honestyMirror.avgRatingLosses.toFixed(1)}/5</p>
            </div>
            <div className="bg-kmf-surface/50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-kmf-text-tertiary uppercase mb-1">Overconfident</p>
              <p className="text-lg font-bold text-yellow-400">{honestyMirror.overconfident}</p>
              <p className="text-[9px] text-kmf-text-tertiary">high rating + loss</p>
            </div>
            <div className="bg-kmf-surface/50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-kmf-text-tertiary uppercase mb-1">Underconfident</p>
              <p className="text-lg font-bold text-purple-400">{honestyMirror.underconfident}</p>
              <p className="text-[9px] text-kmf-text-tertiary">low rating + win</p>
            </div>
          </div>
        </div>
      )}

      {/* Trader Personality */}
      {personality && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">TRADER PERSONALITY</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{personality.icon}</span>
            <div>
              <h3 className="text-lg font-black text-kmf-accent">{personality.name}</h3>
              <p className="text-xs text-kmf-text-tertiary">{personality.subtitle}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-3">
            {personality.dominantEmotion && EmotionMeta[personality.dominantEmotion.key] && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-kmf-accent/15 text-kmf-accent">
                Dominant Emotion: {EmotionMeta[personality.dominantEmotion.key].label}
              </span>
            )}
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-kmf-accent/15 text-kmf-accent">
              Stability: {personality.stability}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-8 rounded-lg bg-kmf-profit/20 flex items-center px-3 mb-4">
            <span className="text-xs font-bold text-kmf-profit">{personality.progressLabel}</span>
          </div>

          {/* Strengths */}
          <p className="text-xs font-bold text-kmf-profit mb-2">Strengths</p>
          <div className="space-y-1.5 mb-4">
            {personality.strengths.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-kmf-profit text-xs">✓</span>
                <span className="text-xs text-kmf-text-secondary">{s}</span>
              </div>
            ))}
          </div>

          {/* Weaknesses */}
          <p className="text-xs font-bold text-kmf-loss mb-2">Weaknesses</p>
          <div className="space-y-1.5">
            {personality.weaknesses.map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-kmf-loss text-xs">✕</span>
                <span className="text-xs text-kmf-text-secondary">{w}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duration Stats */}
      {durationStats && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">DURATION STATS</p>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-sm text-kmf-text-secondary">Avg Duration</span>
              <span className="text-sm font-bold text-kmf-text-primary">{formatDuration(durationStats.avg)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-sm text-kmf-text-secondary">Avg Win Duration</span>
              <span className="text-sm font-bold text-kmf-profit">{formatDuration(durationStats.avgWin)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-kmf-text-secondary">Avg Loss Duration</span>
              <span className="text-sm font-bold text-kmf-loss">{formatDuration(durationStats.avgLoss)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Monthly P&L */}
      {displayStats.monthlyPL.some(m => m.pl !== 0) && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">MONTHLY P&amp;L</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={displayStats.monthlyPL} barSize={28}>
              <XAxis dataKey="month" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={50} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<MonthlyTooltip />} />
              <Bar dataKey="pl" radius={[6, 6, 0, 0]}>
                {displayStats.monthlyPL.map((entry, i) => (
                  <Cell key={i} fill={entry.pl >= 0 ? '#00E676' : '#FF5252'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Equity Curve */}
      {equityCurve.length > 1 && (
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">EQUITY CURVE</p>
            <span className={`text-xs font-bold ${equityCurve[equityCurve.length - 1].equity >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
              {equityCurve[equityCurve.length - 1].equity >= 0 ? '+' : ''}${equityCurve[equityCurve.length - 1].equity.toFixed(2)}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={equityCurve}>
              <defs>
                <linearGradient id="eqGradProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E676" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eqGradLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis stroke="#546E7A" fontSize={10} tickLine={false} axisLine={false} width={55} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  const v = payload[0].value;
                  return (
                    <div className="tooltip-glow rounded-lg px-3 py-2">
                      <p className="text-xs text-kmf-text-tertiary mb-0.5">Trade #{payload[0].payload.trade}</p>
                      <p className={`text-sm font-bold ${v >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                        {v >= 0 ? '+' : ''}${v.toFixed(2)}
                      </p>
                    </div>
                  );
                }
                return null;
              }} />
              <Area type="monotone" dataKey="equity"
                stroke={equityCurve[equityCurve.length - 1].equity >= 0 ? '#00E676' : '#FF5252'}
                strokeWidth={2.5}
                fill={equityCurve[equityCurve.length - 1].equity >= 0 ? 'url(#eqGradProfit)' : 'url(#eqGradLoss)'}
                dot={false}
                activeDot={{ r: 5, stroke: '#0F1115', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Performance Heatmap */}
      {displayTrades.length >= 3 && (
        <div className="glass-card rounded-2xl p-5">
          <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">PERFORMANCE HEATMAP</p>
          <p className="text-xs text-kmf-text-tertiary mb-3">P/L by day of week and time of day</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr>
                  <th className="text-[10px] text-kmf-text-tertiary font-medium pb-2 text-left w-12"></th>
                  {HOURS.map(h => (
                    <th key={h} className="text-[10px] text-kmf-text-tertiary font-medium pb-2 text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAYS.map(day => (
                  <tr key={day}>
                    <td className="text-[10px] text-kmf-text-tertiary font-medium py-0.5 pr-2">{day}</td>
                    {HOURS.map(hour => {
                      const cell = heatmapData[day]?.[hour] || { pl: 0, count: 0 };
                      return (
                        <td key={hour} className="p-0.5">
                          <div className="rounded-lg h-10 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-default relative group"
                            style={{ backgroundColor: getHeatColor(cell.pl) }}>
                            {cell.count > 0 && (
                              <>
                                <span className={`text-[10px] font-bold ${cell.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                                  {cell.pl >= 0 ? '+' : ''}{cell.pl.toFixed(0)}
                                </span>
                                <span className="text-[8px] text-kmf-text-tertiary">{cell.count}t</span>
                              </>
                            )}
                            {cell.count > 0 && (
                              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 tooltip-glow rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                <p className="text-[10px] text-kmf-text-tertiary">{day} {hour}</p>
                                <p className={`text-xs font-bold ${cell.pl >= 0 ? 'text-kmf-profit' : 'text-kmf-loss'}`}>
                                  {cell.pl >= 0 ? '+' : ''}${cell.pl.toFixed(2)} ({cell.count} trades)
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(255,82,82,0.4)' }} />
              <span className="text-[10px] text-kmf-text-tertiary">Loss</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <span className="text-[10px] text-kmf-text-tertiary">No trades</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: 'rgba(0,230,118,0.4)' }} />
              <span className="text-[10px] text-kmf-text-tertiary">Profit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
