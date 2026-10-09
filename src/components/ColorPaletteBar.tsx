import React, { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';
import { sounds } from '../utils/audio';

export const ColorPaletteBar: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    {
      name: 'Emerald Green',
      role: 'Solved Drills & Daily Streaks',
      hex: '#10b981',
      rgb: 'rgb(16, 185, 129)',
      badgeClass: 'bg-emerald-500',
      borderClass: 'border-emerald-500/50 hover:border-emerald-400',
      textClass: 'text-emerald-400',
    },
    {
      name: 'Crimson Red',
      role: 'Bug Squash & Critical Alerts',
      hex: '#ef4444',
      rgb: 'rgb(239, 68, 68)',
      badgeClass: 'bg-rose-500',
      borderClass: 'border-rose-500/50 hover:border-rose-400',
      textClass: 'text-rose-400',
    },
    {
      name: 'Royal Purple',
      role: 'Squad Mastery & Level XP',
      hex: '#8b5cf6',
      rgb: 'rgb(139, 92, 246)',
      badgeClass: 'bg-violet-500',
      borderClass: 'border-violet-500/50 hover:border-violet-400',
      textClass: 'text-violet-400',
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    sounds.playClick();
    setTimeout(() => setCopiedColor(null), 1800);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-violet-400">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Squad Practice Tri-Color Tokens
            </h3>
            <p className="text-[11px] text-slate-400">
              Click any color swatch to copy hex code directly into your CSS practice exercises
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          CSS Palette: Green · Red · Purple
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {colors.map((c) => {
          const isCopied = copiedColor === c.hex;
          return (
            <div
              key={c.hex}
              onClick={() => handleCopy(c.hex)}
              className={`p-3 rounded-xl border bg-slate-950/70 transition-all cursor-pointer flex items-center justify-between group ${c.borderClass}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg ${c.badgeClass} shadow-md flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{c.name}</span>
                    <span className={`text-[11px] font-mono font-semibold ${c.textClass}`}>
                      {c.hex}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {c.role}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white transition-colors"
                title={`Copy ${c.hex}`}
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
