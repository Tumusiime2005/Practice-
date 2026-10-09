import React, { useState } from 'react';
import { Users, Volume2, VolumeX, Sparkles, Plus, Check } from 'lucide-react';
import { Friend } from '../types/dashboard';
import { sounds } from '../utils/audio';

interface NavbarProps {
  friends: Friend[];
  onAddFriend: (friend: Omit<Friend, 'id'>) => void;
  activeRoom: string;
  setActiveRoom: (room: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  friends,
  onAddFriend,
  activeRoom,
  setActiveRoom,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendRole, setNewFriendRole] = useState('Frontend Learner');
  const [newFriendColor, setNewFriendColor] = useState<'green' | 'red' | 'purple'>('purple');
  const [roomDropdown, setRoomDropdown] = useState(false);

  const rooms = [
    'Frontend & CSS Drills',
    'HTML Semantics & Accessibility',
    'Speedrun Practice Arena',
  ];

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.setEnabled(nextState);
    if (nextState) sounds.playClick();
  };

  const handleCreateFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;

    onAddFriend({
      name: newFriendName.trim(),
      role: newFriendRole,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newFriendName)}`,
      status: 'online',
      currentDrill: 'Warmup Exercises',
      level: 1,
      xp: 150,
      drillsCompleted: 1,
      bugsSquashed: 0,
      streakDays: 1,
      colorAccent: newFriendColor,
    });

    sounds.playSuccess();
    setNewFriendName('');
    setShowAddModal(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand with green, red, purple triad dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" title="Green: Solved Drills" />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444]" title="Red: Bug Squash" />
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]" title="Purple: Squad Mastery" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-lg">
                DEV<span className="text-violet-400">SQUAD</span>
              </span>
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 hidden sm:inline">
                Practice Lab
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span className="text-emerald-400 font-medium">Practice</span>
              <span aria-hidden="true">·</span>
              <span className="text-rose-400 font-medium">Squash</span>
              <span aria-hidden="true">·</span>
              <span className="text-violet-400 font-medium">Master</span>
            </p>
          </div>
        </div>

        {/* Room Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setRoomDropdown(!roomDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800/80 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Room: {activeRoom}</span>
            <span className="text-slate-500 text-[10px]">▼</span>
          </button>

          {roomDropdown && (
            <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                Switch Practice Room
              </div>
              {rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => {
                    setActiveRoom(room);
                    setRoomDropdown(false);
                    sounds.playClick();
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    activeRoom === room
                      ? 'bg-violet-950/60 text-violet-300 font-medium'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{room}</span>
                  {activeRoom === room && <Check className="w-3.5 h-3.5 text-violet-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Friend avatars & quick controls */}
        <div className="flex items-center gap-3">
          {/* Active squad friends facepile */}
          <div className="flex items-center -space-x-2 mr-1">
            {friends.slice(0, 4).map((friend) => (
              <div
                key={friend.id}
                className="relative group cursor-pointer"
                title={`${friend.name} (${friend.status}) - ${friend.currentDrill}`}
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-8 h-8 rounded-full border-2 border-slate-950 object-cover ring-1 ring-slate-800 transition-transform group-hover:scale-110 group-hover:z-10"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                    friend.status === 'online' || friend.status === 'coding'
                      ? 'bg-emerald-500 ring-1 ring-emerald-400/50'
                      : friend.status === 'break'
                      ? 'bg-amber-500'
                      : 'bg-slate-500'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Add Friend Button */}
          <button
            onClick={() => {
              setShowAddModal(true);
              sounds.playClick();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-violet-200 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 rounded-lg transition-all cursor-pointer"
            title="Invite friend to practice"
          >
            <Plus className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden sm:inline">Add Friend</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-slate-900 border-slate-700 text-emerald-400 hover:text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Sound enabled (click to mute)' : 'Sound muted (click to enable)'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Add Friend Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-400" />
                <h3 className="text-base font-bold text-white">Invite Practice Friend</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Add your friend to the dashboard to practice HTML & CSS drills together, squash bugs, and track squad XP.
            </p>

            <form onSubmit={handleCreateFriend} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Friend's Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan, Mia, Chris"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Squad Role / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. CSS Apprentice, Layout Wizard"
                  value={newFriendRole}
                  onChange={(e) => setNewFriendRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Color Focus
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewFriendColor('green')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      newFriendColor === 'green'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Green (Solved)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFriendColor('red')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      newFriendColor === 'red'
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Red (Bugs)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFriendColor('purple')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      newFriendColor === 'purple'
                        ? 'bg-violet-950/60 border-violet-500 text-violet-300 ring-1 ring-violet-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    Purple (XP)
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-violet-900/40"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Join Squad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
