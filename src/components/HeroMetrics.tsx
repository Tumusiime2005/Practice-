import React from 'react';
import { CheckCircle2, Flame, Bug, AlertTriangle, Sparkles, Trophy, ArrowUpRight } from 'lucide-react';
import { ColorTag } from '../types/dashboard';

interface HeroMetricsProps {
  completedDrills: number;
  totalDrills: number;
  streakDays: number;
  pendingBugs: number;
  squadXp: number;
  squadLevel: number;
  onFilterByColor?: (color: ColorTag | null) => void;
  activeColorFilter?: ColorTag | null;
}

export const HeroMetrics: React.FC<HeroMetricsProps> = ({
  completedDrills,
  totalDrills,
  streakDays,
  pendingBugs,
  squadXp,
  squadLevel,
  onFilterByColor,
  activeColorFilter,
}) => {
  const percentCompleted = Math.round((completedDrills / Math.max(totalDrills, 1)) * 100);
  const xpForNextLevel = 6000;
  const currentLvlProgress = Math.min(Math.round(((squadXp % 1000) / 1000) * 100), 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {/* 1. GREEN CARD - CONQUERED DRILLS & STREAKS */}
      <div
        onClick={() => onFilterByColor?.(activeColorFilter === 'green' ? null : 'green')}
        className={`relative overflow-hidden rounded-2xl border p-5 transition-all cursor-pointer group ${
          activeColorFilter === 'green'
            ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.2)]'
            : 'bg-slate-900/90 hover:bg-slate-900 border-emerald-900/50 hover:border-emerald-600/60 shadow-lg'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Green Metric · Victories
              </span>
              <h3 className="text-sm font-semibold text-slate-200">Passed Practice Drills</h3>
            </div>
          </div>
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
            <Flame className="w-3.5 h-3.5 fill-emerald-400/20" />
            {streakDays}d Streak
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {completedDrills}
          </span>
          <span className="text-sm text-slate-400">
            / {totalDrills} completed ({percentCompleted}%)
          </span>
        </div>

        {/* Progress bar in emerald green */}
        <div className="mt-3 w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${percentCompleted}%` }}
          />
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            +6 solved today with squad
          </span>
          <span className="text-slate-500 font-mono text-[11px]">#10b981</span>
        </div>
      </div>

      {/* 2. RED CARD - BUG SQUASH & FOCUS SPRINT */}
      <div
        onClick={() => onFilterByColor?.(activeColorFilter === 'red' ? null : 'red')}
        className={`relative overflow-hidden rounded-2xl border p-5 transition-all cursor-pointer group ${
          activeColorFilter === 'red'
            ? 'bg-slate-900 border-rose-500 ring-2 ring-rose-500/40 shadow-[0_0_24px_rgba(239,68,68,0.2)]'
            : 'bg-slate-900/90 hover:bg-slate-900 border-rose-900/50 hover:border-rose-600/60 shadow-lg'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-400">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                Red Metric · Critical Focus
              </span>
              <h3 className="text-sm font-semibold text-slate-200">Tricky Bugs & Edge Cases</h3>
            </div>
          </div>
          <span className="text-xs text-rose-400 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
            <AlertTriangle className="w-3.5 h-3.5" />
            Needs Review
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {pendingBugs}
          </span>
          <span className="text-sm text-rose-300/80">
            critical issues in queue
          </span>
        </div>

        {/* Urgency indicators */}
        <div className="mt-3 flex gap-1.5 h-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-full ${
                idx < pendingBugs
                  ? 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_6px_#ef4444]'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="text-rose-300 flex items-center gap-1">
            <span>Next squad triage:</span>
            <span className="font-semibold text-white">45 min</span>
          </span>
          <span className="text-slate-500 font-mono text-[11px]">#ef4444</span>
        </div>
      </div>

      {/* 3. PURPLE CARD - SQUAD XP & MASTERY LEVEL */}
      <div
        onClick={() => onFilterByColor?.(activeColorFilter === 'purple' ? null : 'purple')}
        className={`relative overflow-hidden rounded-2xl border p-5 transition-all cursor-pointer group ${
          activeColorFilter === 'purple'
            ? 'bg-slate-900 border-violet-500 ring-2 ring-violet-500/40 shadow-[0_0_24px_rgba(139,92,246,0.2)]'
            : 'bg-slate-900/90 hover:bg-slate-900 border-violet-900/50 hover:border-violet-600/60 shadow-lg'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-950/80 border border-violet-500/30 text-violet-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                Purple Metric · Squad Mastery
              </span>
              <h3 className="text-sm font-semibold text-slate-200">Collective Squad XP</h3>
            </div>
          </div>
          <span className="text-xs text-violet-300 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
            <Trophy className="w-3.5 h-3.5 text-violet-400" />
            Level {squadLevel}
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {squadXp.toLocaleString()}
          </span>
          <span className="text-sm text-violet-300/80">
            XP (CSS Archmage rank)
          </span>
        </div>

        {/* Level progress bar in royal violet */}
        <div className="mt-3 w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full transition-all duration-500"
            style={{ width: `${currentLvlProgress}%` }}
          />
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="text-violet-300 flex items-center gap-1">
            <span>Next rank in</span>
            <span className="font-semibold text-white">{xpForNextLevel - squadXp} XP</span>
          </span>
          <span className="text-slate-500 font-mono text-[11px]">#8b5cf6</span>
        </div>
      </div>
    </div>
  );
};
