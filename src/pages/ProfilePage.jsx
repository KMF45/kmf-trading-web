import { useTrades } from '../contexts/TradesContext';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { ACHIEVEMENTS, LEVELS } from '../data/models';
import { FaTrophy, FaStar, FaFire, FaLock, FaMedal, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const TIER_STYLE = {
  bronze: { bg: 'bg-orange-900/20', border: 'border-orange-700/30', text: 'text-orange-400', glow: 'rgba(194,120,62,0.2)' },
  silver: { bg: 'bg-gray-400/10', border: 'border-gray-400/30', text: 'text-gray-300', glow: 'rgba(156,163,175,0.2)' },
  gold: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'rgba(234,179,8,0.2)' },
};

const ProfilePage = () => {
  const { stats } = useTrades();
  const { totalXP, xpProgress, currentLevel, unlockedAchievements, lockedAchievements, tradingStreak, traderBadge, tradingLevel } = stats;

  return (
    <div className="max-w-3xl mx-auto space-y-5 stagger-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/20">
          <FaTrophy className="text-yellow-400 text-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-kmf-text-primary">Profile & XP</h1>
          <p className="text-xs text-kmf-text-tertiary">Track your trading journey</p>
        </div>
      </div>

      {/* XP & Level Card */}
      <div className="glow-border">
        <div className="glass-card rounded-2xl p-6 text-center shimmer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10"
            style={{ background: currentLevel.color }} />

          {/* Level badge */}
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 border-2"
            style={{ borderColor: currentLevel.color, background: `${currentLevel.color}15` }}>
            <span className="text-3xl font-black" style={{ color: currentLevel.color }}>{currentLevel.level}</span>
          </div>

          <p className="text-lg font-bold text-kmf-text-primary">{currentLevel.title}</p>
          <p className="text-sm text-kmf-text-tertiary mt-0.5">Level {currentLevel.level}</p>

          {/* XP bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-kmf-text-tertiary">
                <AnimatedNumber value={totalXP} decimals={0} /> XP
              </span>
              {xpProgress.next && (
                <span className="text-kmf-text-tertiary">
                  {xpProgress.next.xpRequired} XP
                </span>
              )}
            </div>
            <div className="h-3 bg-kmf-surface rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.min(xpProgress.progress, 100)}%`,
                  background: `linear-gradient(90deg, ${currentLevel.color}, ${xpProgress.next?.color || currentLevel.color})`,
                  boxShadow: `0 0 12px ${currentLevel.color}40`,
                }} />
            </div>
            {xpProgress.next && (
              <p className="text-[10px] text-kmf-text-tertiary mt-1">
                {xpProgress.xpNeeded - xpProgress.xpInLevel} XP to {xpProgress.next.title}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Trader Badge', value: traderBadge.badge, icon: FaMedal, color: traderBadge.color },
          { label: 'Trading Level', value: tradingLevel.title, icon: FaChartLine, color: 'text-kmf-accent' },
          { label: 'Streak', value: `${tradingStreak}d`, icon: FaFire, color: 'text-orange-400' },
          { label: 'Discipline', value: `${stats.disciplinePercent.toFixed(0)}%`, icon: FaShieldAlt, color: 'text-green-400' },
        ].map((s, i) => (
          <div key={i} className="glass-card rounded-xl p-3 hover-tilt">
            <div className="flex items-center gap-1.5 mb-1">
              <s.icon className={`text-xs ${s.color} opacity-60`} />
              <p className="text-[10px] font-bold text-kmf-text-tertiary uppercase tracking-widest">{s.label}</p>
            </div>
            <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Level Progression */}
      <div className="glass-card rounded-2xl p-5">
        <h2 className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest mb-4">Level Progression</h2>
        <div className="space-y-2">
          {LEVELS.map((lvl) => {
            const isUnlocked = totalXP >= lvl.xpRequired;
            const isCurrent = currentLevel.level === lvl.level;
            return (
              <div key={lvl.level}
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                  isCurrent ? 'bg-white/5 border border-white/10' : ''
                } ${!isUnlocked ? 'opacity-40' : ''}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: `${lvl.color}20`, color: lvl.color, border: isCurrent ? `2px solid ${lvl.color}` : 'none' }}>
                  {lvl.level}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-kmf-text-primary">{lvl.title}</p>
                  <p className="text-[10px] text-kmf-text-tertiary">{lvl.xpRequired} XP required</p>
                </div>
                {isUnlocked && !isCurrent && <span className="text-kmf-profit text-xs">✓</span>}
                {isCurrent && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${lvl.color}20`, color: lvl.color }}>Current</span>}
                {!isUnlocked && <FaLock className="text-kmf-text-tertiary text-xs" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements — Unlocked */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest">
            Achievements
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-kmf-accent/15 text-kmf-accent font-bold">
            {unlockedAchievements.length}/{ACHIEVEMENTS.length}
          </span>
        </div>

        {unlockedAchievements.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {unlockedAchievements.map((a) => {
              const tier = TIER_STYLE[a.tier];
              return (
                <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl ${tier.bg} border ${tier.border} hover-glow transition-all`}
                  style={{ '--hover-glow-color': tier.glow }}>
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-kmf-text-primary">{a.title}</p>
                    <p className="text-[10px] text-kmf-text-tertiary truncate">{a.desc}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${tier.text}`}>{a.tier}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Locked */}
        {lockedAchievements.length > 0 && (
          <>
            <p className="text-[10px] text-kmf-text-tertiary uppercase tracking-widest mb-2 mt-2">Locked</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lockedAchievements.map((a) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-kmf-surface/30 border border-white/5 opacity-50">
                  <span className="text-2xl grayscale">🔒</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-kmf-text-tertiary">{a.title}</p>
                    <p className="text-[10px] text-kmf-text-tertiary truncate">{a.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-kmf-text-tertiary">{a.tier}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* XP Breakdown */}
      <div className="glass-card rounded-2xl p-5 mb-6">
        <h2 className="text-xs font-bold text-kmf-text-tertiary uppercase tracking-widest mb-3">How to Earn XP</h2>
        <div className="space-y-2">
          {[
            { label: 'Win a trade', xp: '+50 XP', icon: '✅' },
            { label: 'Lose a trade (still learning!)', xp: '+20 XP', icon: '📉' },
            { label: 'Breakeven trade', xp: '+15 XP', icon: '⚖️' },
            { label: 'Follow your trading plan', xp: '+10 XP', icon: '📋' },
            { label: 'Complete checklist (3+ items)', xp: '+10 XP', icon: '✍️' },
            { label: 'Add trade notes', xp: '+5 XP', icon: '📝' },
            { label: 'Set stop loss', xp: '+5 XP', icon: '🛑' },
            { label: 'Write diary entry', xp: '+15 XP', icon: '📖' },
            { label: 'Complete weekly review', xp: '+25 XP', icon: '📊' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <span className="text-sm text-kmf-text-secondary">{item.icon} {item.label}</span>
              <span className="text-xs font-bold text-kmf-accent">{item.xp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
