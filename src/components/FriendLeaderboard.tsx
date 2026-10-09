import React, { useState } from 'react';
import { Trophy, Flame, Bug, CheckCircle2, HandMetal, Sparkles } from 'lucide-react';
import { Friend } from '../types/dashboard';
import { sounds } from '../utils/audio';

interface FriendLeaderboardProps {
  friends: Friend[];
  onCheerFriend: (friendName: string) => void;
}

export const FriendLeaderboard: React.FC<FriendLeaderboardProps> = ({
  friends,
  onCheerFriend,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'today'>('all');
  const [cheeredMap, setCheeredMap] = useState<Record<string, boolean>>({});

  // Sort by XP descending
  const sortedFriends = [...friends].sort((a, b) => b.xp - a.xp);

  const handleHighFive = (friend: Friend) => {
    sounds.playClick();
    setCheeredMap((prev) => ({ ...prev, [friend.id]: true }));
    onCheerFriend(friend.name);

    setTimeout(() => {
      setCheeredMap((prev) => ({ ...prev, [friend.id]: false }));
    }, 1800);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-violet-950/80 border border-violet-500/30 text-violet-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Friend Leaderboard</h3>
            <p className="text-[11px] text-slate-400">Practicing together in real-time</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All-Time XP
          </button>
          <button
            onClick={() => setActiveTab('today')}
            className={`px-2.5 py-1 font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'today' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Today's Sprint
          </button>
        </div>
      </div>

      {/* Friends List */}
      <div className="mt-4 space-y-3 flex-1 overflow-y-auto">
        {sortedFriends.map((friend, idx) => {
          const isCheered = cheeredMap[friend.id];
          return (
            <div
              key={friend.id}
              className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-950 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Left: Avatar, Rank, Name, Drill */}
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    idx === 0
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : idx === 1
                      ? 'bg-slate-300/20 text-slate-300 border border-slate-400/50'
                      : idx === 2
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                      : 'text-slate-500'
                  }`}
                >
                  #{idx + 1}
                </span>

                <div className="relative">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700 shadow-sm"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-950 ${
                      friend.status === 'online' || friend.status === 'coding'
                        ? 'bg-emerald-500 ring-1 ring-emerald-400/60'
                        : friend.status === 'break'
                        ? 'bg-amber-500'
                        : 'bg-slate-500'
                    }`}
                    title={friend.status}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                      {friend.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Lvl {friend.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    Drill: <span className="text-slate-300 font-medium">{friend.currentDrill}</span>
                  </p>
                </div>
              </div>

              {/* Right: Metrics & High-Five button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/50">
                {/* Metrics trio */}
                <div className="flex items-center gap-3 text-xs">
                  {/* Green: Conquered drills */}
                  <div className="flex items-center gap-1 text-emerald-400" title="Completed Drills">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-semibold">{friend.drillsCompleted}</span>
                  </div>

                  {/* Red: Bugs squashed */}
                  <div className="flex items-center gap-1 text-rose-400" title="Bugs Squashed">
                    <Bug className="w-3.5 h-3.5" />
                    <span className="font-semibold">{friend.bugsSquashed}</span>
                  </div>

                  {/* Purple: Total XP */}
                  <div className="flex items-center gap-1 text-violet-300 font-bold" title="Squad XP">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>{friend.xp.toLocaleString()} XP</span>
                  </div>
                </div>

                {/* High Five action */}
                <button
                  onClick={() => handleHighFive(friend)}
                  className={`p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    isCheered
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 scale-105'
                      : 'bg-slate-900 border-slate-800 hover:border-violet-500/50 text-slate-300 hover:text-white'
                  }`}
                  title="High five friend"
                >
                  <HandMetal className={`w-3.5 h-3.5 ${isCheered ? 'text-emerald-400 animate-bounce' : 'text-violet-400'}`} />
                  <span className="text-[11px] hidden sm:inline">
                    {isCheered ? 'High-Five!' : 'Cheer'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <Flame className="w-3.5 h-3.5 fill-emerald-400/20" />
          Top streak: 12 days
        </span>
        <span className="text-slate-400">
          Updated live
        </span>
      </div>
    </div>
  );
};
