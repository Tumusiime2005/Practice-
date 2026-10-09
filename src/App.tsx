import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroMetrics } from './components/HeroMetrics';
import { HtmlCssSandbox } from './components/HtmlCssSandbox';
import { FriendLeaderboard } from './components/FriendLeaderboard';
import { PracticeTaskBoard } from './components/PracticeTaskBoard';
import { SquadPomodoro } from './components/SquadPomodoro';
import { SquadActivity } from './components/SquadActivity';
import { ColorPaletteBar } from './components/ColorPaletteBar';
import {
  INITIAL_FRIENDS,
  INITIAL_TASKS,
  INITIAL_CHALLENGES,
  INITIAL_ACTIVITY,
} from './data/initialData';
import { Friend, PracticeTask, Challenge, ActivityItem, ColorTag } from './types/dashboard';

export default function App() {
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [tasks, setTasks] = useState<PracticeTask[]>(INITIAL_TASKS);
  const [challenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITY);

  const [activeRoom, setActiveRoom] = useState<string>('Frontend & CSS Drills');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeColorFilter, setActiveColorFilter] = useState<ColorTag | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Metrics calculations
  const completedDrills = tasks.filter((t) => t.completed).length;
  const totalDrills = tasks.length;
  const pendingBugs = tasks.filter((t) => !t.completed && t.tagColor === 'red').length;

  const totalFriendsXp = friends.reduce((acc, f) => acc + f.xp, 0);
  const squadLevel = Math.max(1, Math.floor(totalFriendsXp / 1200));

  // Add friend
  const handleAddFriend = (newFriendData: Omit<Friend, 'id'>) => {
    const newFriend: Friend = {
      ...newFriendData,
      id: `f-${Date.now()}`,
    };
    setFriends((prev) => [newFriend, ...prev]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      user: newFriend.name,
      avatar: newFriend.avatar,
      action: 'joined the practice squad',
      target: `#${activeRoom}`,
      colorTag: newFriend.colorAccent,
      timestamp: 'just now',
      xpGained: 50,
    };
    setActivities((prev) => [newActivity, ...prev]);
    showToast(`🎉 ${newFriend.name} joined the squad!`);
  };

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            // Reward XP to first friend or random active friend
            setFriends((fList) =>
              fList.map((f, idx) => (idx === 0 ? { ...f, xp: f.xp + t.xpReward, drillsCompleted: f.drillsCompleted + 1 } : f))
            );

            // Log activity
            const newAct: ActivityItem = {
              id: `act-${Date.now()}`,
              user: t.assignedTo || 'Squad member',
              avatar: friends[0]?.avatar || '',
              action: 'completed drill',
              target: t.title,
              colorTag: t.tagColor,
              timestamp: 'just now',
              xpGained: t.xpReward,
            };
            setActivities((acts) => [newAct, ...acts]);
            showToast(`✨ Completed "${t.title}" (+${t.xpReward} XP)`);
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  // Add custom drill task
  const handleAddTask = (newTaskData: Omit<PracticeTask, 'id' | 'completed'>) => {
    const newTask: PracticeTask = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: 'Squad Host',
      avatar: friends[0]?.avatar || '',
      action: 'queued practice challenge',
      target: newTask.title,
      colorTag: newTask.tagColor,
      timestamp: 'just now',
    };
    setActivities((prev) => [newAct, ...prev]);
    showToast(`📋 Added new ${newTask.tagColor.toUpperCase()} drill to queue!`);
  };

  // Challenge passed from Live Sandbox
  const handleChallengePassed = (challenge: Challenge, xpEarned: number) => {
    setFriends((fList) =>
      fList.map((f, idx) => (idx === 0 ? { ...f, xp: f.xp + xpEarned, drillsCompleted: f.drillsCompleted + 1 } : f))
    );

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: friends[0]?.name || 'You',
      avatar: friends[0]?.avatar || '',
      action: 'passed live challenge',
      target: challenge.title,
      colorTag: challenge.accentColor,
      timestamp: 'just now',
      xpGained: xpEarned,
    };
    setActivities((prev) => [newAct, ...prev]);
    showToast(`🏆 Cleared "${challenge.title}"! (+${xpEarned} XP)`);
  };

  // Pomodoro sprint completed
  const handleSprintCompleted = (modeName: string, xpEarned: number) => {
    setFriends((fList) =>
      fList.map((f, idx) => (idx === 0 ? { ...f, xp: f.xp + xpEarned } : f))
    );

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: 'Practice Squad',
      avatar: friends[0]?.avatar || '',
      action: 'completed focus sprint',
      target: modeName,
      colorTag: modeName.includes('Deep') ? 'purple' : modeName.includes('Break') ? 'green' : 'red',
      timestamp: 'just now',
      xpGained: xpEarned,
    };
    setActivities((prev) => [newAct, ...prev]);
    showToast(`⏱️ ${modeName} completed! Squad earned +${xpEarned} XP`);
  };

  const handleCheerFriend = (friendName: string) => {
    showToast(`🙌 High-five sent to ${friendName}! Keep practicing!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-violet-500/30 selection:text-violet-200">
      {/* Top Navigation */}
      <Navbar
        friends={friends}
        onAddFriend={handleAddFriend}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome Sub-Bar with Practice Objective */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Squad Room Active
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                {friends.length} Friends Online
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-0.5 tracking-tight">
              HTML & CSS Collaborative Practice Arena
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Sharpen your HTML & CSS craft with friends. Conquered drills glow in{' '}
              <span className="text-emerald-400 font-semibold">Green</span>, critical bugs & sprints are highlighted in{' '}
              <span className="text-rose-400 font-semibold">Red</span>, and collective mastery is tracked in{' '}
              <span className="text-violet-400 font-semibold">Purple</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            {activeColorFilter && (
              <button
                onClick={() => setActiveColorFilter(null)}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 cursor-pointer"
              >
                Clear Filter ({activeColorFilter})
              </button>
            )}
          </div>
        </div>

        {/* 1. TRIAD STATS (Green, Red, Purple) */}
        <HeroMetrics
          completedDrills={completedDrills}
          totalDrills={totalDrills}
          streakDays={12}
          pendingBugs={pendingBugs}
          squadXp={totalFriendsXp}
          squadLevel={squadLevel}
          onFilterByColor={(color) => setActiveColorFilter(color)}
          activeColorFilter={activeColorFilter}
        />

        {/* 2. LIVE HTML & CSS PRACTICE SANDBOX */}
        <section aria-label="Practice Sandbox">
          <HtmlCssSandbox
            challenges={challenges}
            onChallengePassed={handleChallengePassed}
          />
        </section>

        {/* 3. TWO-COLUMN LAYOUT: Task Board + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Practice Drills Queue (7 cols on lg) */}
          <div className="lg:col-span-7">
            <PracticeTaskBoard
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              activeColorFilter={activeColorFilter}
              setActiveColorFilter={setActiveColorFilter}
            />
          </div>

          {/* Right Column: Friend Leaderboard (5 cols on lg) */}
          <div className="lg:col-span-5">
            <FriendLeaderboard
              friends={friends}
              onCheerFriend={handleCheerFriend}
            />
          </div>
        </div>

        {/* 4. PRACTICE TOOLS ROW: Pomodoro Focus Timer + Activity Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Pomodoro Focus Timer (5 cols on lg) */}
          <div className="lg:col-span-5">
            <SquadPomodoro onSprintCompleted={handleSprintCompleted} />
          </div>

          {/* Activity Heatmap & Recent Milestones (7 cols on lg) */}
          <div className="lg:col-span-7">
            <SquadActivity activities={activities} />
          </div>
        </div>

        {/* 5. COLOR PALETTE QUICK-COPY & REFERENCE */}
        <section aria-label="Color Palette Reference">
          <ColorPaletteBar />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="font-semibold text-slate-400">DevSquad Practice Dashboard</span>
            <span>· Practice HTML & CSS with friends</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Colors: Emerald Green (#10b981) · Crimson Red (#ef4444) · Royal Purple (#8b5cf6)
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/95 border border-violet-500/50 text-white text-xs font-semibold shadow-2xl shadow-violet-950 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
