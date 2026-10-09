import React from 'react';
import { Activity, Radio, Sparkles } from 'lucide-react';
import { ActivityItem } from '../types/dashboard';

interface SquadActivityProps {
  activities: ActivityItem[];
}

export const SquadActivity: React.FC<SquadActivityProps> = ({ activities }) => {
  // 7-day practice heatmap simulation (Days of week × 4 time slots)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];

  // Seeded intensities for visual heat: 'green' | 'red' | 'purple' | 'empty'
  const heatmapData = [
    ['purple', 'green', 'empty', 'purple'],
    ['green', 'empty', 'green', 'red'],
    ['purple', 'purple', 'green', 'empty'],
    ['green', 'red', 'purple', 'green'],
    ['empty', 'green', 'purple', 'purple'],
    ['green', 'purple', 'red', 'green'],
    ['purple', 'green', 'red', 'purple'],
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-white">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Squad Practice Heatmap</h3>
              <p className="text-[11px] text-slate-400">Weekly activity distribution across 3 disciplines</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Live Sync
          </span>
        </div>

        {/* Heatmap Grid */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {days.map((day, dIdx) => (
              <div key={day} className="flex flex-col gap-1.5 items-center">
                <span className="text-[10px] font-medium text-slate-400">{day}</span>
                {heatmapData[dIdx].map((slot, sIdx) => {
                  const colorClass =
                    slot === 'green'
                      ? 'bg-emerald-500/80 hover:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.5)]'
                      : slot === 'red'
                      ? 'bg-rose-500/80 hover:bg-rose-400 shadow-[0_0_6px_rgba(239,68,68,0.5)]'
                      : slot === 'purple'
                      ? 'bg-violet-500/80 hover:bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.5)]'
                      : 'bg-slate-900 border border-slate-800';

                  return (
                    <div
                      key={sIdx}
                      className={`w-full h-4 sm:h-5 rounded-md transition-transform hover:scale-110 cursor-pointer ${colorClass}`}
                      title={`${day} ${timeSlots[sIdx]}: ${
                        slot === 'green'
                          ? 'Passed Drills'
                          : slot === 'red'
                          ? 'Bug Squash'
                          : slot === 'purple'
                          ? 'Deep Session'
                          : 'Rest'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
            <span className="text-slate-400">Intensity Legend:</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-emerald-500" />
                <span>Drills</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-rose-500" />
                <span>Bugs</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-violet-500" />
                <span>XP Sprint</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stream feed */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          Recent Squad Milestones
        </h4>
        <div className="space-y-2">
          {activities.slice(0, 3).map((act) => (
            <div
              key={act.id}
              className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={act.avatar}
                  alt={act.user}
                  className="w-5 h-5 rounded-full object-cover shrink-0"
                />
                <p className="text-slate-300 truncate">
                  <span className="font-semibold text-white">{act.user}</span>{' '}
                  <span className="text-slate-400">{act.action}</span>{' '}
                  <span
                    className={`font-medium ${
                      act.colorTag === 'green'
                        ? 'text-emerald-400'
                        : act.colorTag === 'red'
                        ? 'text-rose-400'
                        : 'text-violet-400'
                    }`}
                  >
                    {act.target}
                  </span>
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 text-[11px] text-slate-400">
                {act.xpGained && (
                  <span className="font-semibold text-violet-300">+{act.xpGained} XP</span>
                )}
                <span>· {act.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
