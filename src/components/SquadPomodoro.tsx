import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ColorTag } from '../types/dashboard';
import { sounds } from '../utils/audio';

interface SquadPomodoroProps {
  onSprintCompleted: (modeName: string, xpEarned: number) => void;
}

type TimerMode = 'deep' | 'break' | 'sprint';

interface ModeConfig {
  name: string;
  minutes: number;
  color: ColorTag;
  desc: string;
}

const MODES: Record<TimerMode, ModeConfig> = {
  deep: {
    name: 'Deep Practice',
    minutes: 25,
    color: 'purple',
    desc: 'Focused HTML/CSS layout crafting with squad',
  },
  break: {
    name: 'Short Break',
    minutes: 5,
    color: 'green',
    desc: 'Stretch, hydrate, review recent code wins',
  },
  sprint: {
    name: 'Speed Sprint',
    minutes: 10,
    color: 'red',
    desc: 'Fast-paced bug squash or CSS quiz drill',
  },
};

export const SquadPomodoro: React.FC<SquadPomodoroProps> = ({ onSprintCompleted }) => {
  const [activeMode, setActiveMode] = useState<TimerMode>('deep');
  const [timeLeft, setTimeLeft] = useState<number>(MODES.deep.minutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(3);

  const currentMode = MODES[activeMode];
  const totalSeconds = currentMode.minutes * 60;
  const progressPercent = Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100);

  // Switch mode
  const switchMode = (mode: TimerMode) => {
    setIsRunning(false);
    setActiveMode(mode);
    setTimeLeft(MODES[mode].minutes * 60);
    sounds.playClick();
  };

  // Timer tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      sounds.playAlert();
      setCompletedCycles((c) => c + 1);
      const earnedXp = activeMode === 'deep' ? 200 : activeMode === 'sprint' ? 120 : 50;
      onSprintCompleted(currentMode.name, earnedXp);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, activeMode]);

  const toggleStart = () => {
    setIsRunning(!isRunning);
    sounds.playClick();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentMode.minutes * 60);
    sounds.playClick();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const themeColors = {
    green: {
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bgGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      gradient: 'from-emerald-500 to-teal-400',
      activeTab: 'bg-emerald-950/80 border-emerald-500 text-emerald-300',
    },
    red: {
      text: 'text-rose-400',
      border: 'border-rose-500/40',
      bgGlow: 'shadow-[0_0_25px_rgba(239,68,68,0.25)]',
      gradient: 'from-rose-500 to-red-400',
      activeTab: 'bg-rose-950/80 border-rose-500 text-rose-300',
    },
    purple: {
      text: 'text-violet-400',
      border: 'border-violet-500/40',
      bgGlow: 'shadow-[0_0_25px_rgba(139,92,246,0.25)]',
      gradient: 'from-violet-500 to-fuchsia-400',
      activeTab: 'bg-violet-950/80 border-violet-500 text-violet-300',
    },
  }[currentMode.color];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Practice Focus Timer</h3>
              <p className="text-[11px] text-slate-400">Sync drills with Pomodoro intervals</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {completedCycles} Sprints Done
          </span>
        </div>

        {/* 3 Color Mode Selector (Purple, Green, Red) */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => switchMode('deep')}
            className={`py-1.5 px-2 font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeMode === 'deep'
                ? MODES.deep.color === 'purple' ? 'bg-violet-950/80 border border-violet-500 text-violet-300' : ''
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span>25m Deep</span>
          </button>

          <button
            onClick={() => switchMode('break')}
            className={`py-1.5 px-2 font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeMode === 'break'
                ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>5m Break</span>
          </button>

          <button
            onClick={() => switchMode('sprint')}
            className={`py-1.5 px-2 font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeMode === 'sprint'
                ? 'bg-rose-950/80 border border-rose-500 text-rose-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>10m Sprint</span>
          </button>
        </div>
      </div>

      {/* Digital Timer Display & Circular Bar */}
      <div className="py-6 flex flex-col items-center justify-center">
        <div className={`text-5xl sm:text-6xl font-black tracking-tight font-mono ${themeColors.text} drop-shadow-md`}>
          {formattedTime}
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
          {currentMode.desc}
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mt-4 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className={`h-full bg-gradient-to-r ${themeColors.gradient} transition-all duration-300`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleStart}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/50'
              : currentMode.color === 'green'
              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/50'
              : currentMode.color === 'red'
              ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-950/50'
              : 'bg-violet-600 hover:bg-violet-500 shadow-violet-950/50'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause Focus</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Start Timer</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
