import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Filter, Clock, Flame, Sparkles } from 'lucide-react';
import { PracticeTask, ColorTag } from '../types/dashboard';
import { sounds } from '../utils/audio';

interface PracticeTaskBoardProps {
  tasks: PracticeTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<PracticeTask, 'id' | 'completed'>) => void;
  activeColorFilter: ColorTag | null;
  setActiveColorFilter: (tag: ColorTag | null) => void;
}

export const PracticeTaskBoard: React.FC<PracticeTaskBoardProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  activeColorFilter,
  setActiveColorFilter,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('CSS Styling');
  const [newColor, setNewColor] = useState<ColorTag>('green');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newMinutes, setNewMinutes] = useState(15);

  const filteredTasks = tasks.filter((t) => {
    if (!activeColorFilter) return true;
    return t.tagColor === activeColorFilter;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Collaborative squad practice drill.',
      category: newCategory,
      tagColor: newColor,
      difficulty: newDifficulty,
      estimatedMinutes: Number(newMinutes) || 15,
      xpReward: newDifficulty === 'Easy' ? 100 : newDifficulty === 'Medium' ? 180 : 250,
      assignedTo: 'Practice Squad',
    });

    sounds.playSuccess();
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>Squad Practice Queue</span>
            <span className="text-xs font-normal text-slate-400">
              ({tasks.filter((t) => t.completed).length}/{tasks.length} done)
            </span>
          </h3>
          <p className="text-[11px] text-slate-400">HTML & CSS challenges, bug squashes, and layout drills</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Drill Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Drill</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs matching Green, Red, Purple */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto text-xs border-b border-slate-800/80">
        <button
          onClick={() => setActiveColorFilter(null)}
          className={`px-3 py-1 font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeColorFilter === null
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Filter className="w-3 h-3 text-slate-400" />
          All ({tasks.length})
        </button>

        <button
          onClick={() => setActiveColorFilter('green')}
          className={`px-3 py-1 font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeColorFilter === 'green'
              ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Green Drills ({tasks.filter((t) => t.tagColor === 'green').length})
        </button>

        <button
          onClick={() => setActiveColorFilter('red')}
          className={`px-3 py-1 font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeColorFilter === 'red'
              ? 'bg-rose-950/80 border border-rose-500 text-rose-300'
              : 'text-slate-400 hover:text-rose-300'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          Red Bugs ({tasks.filter((t) => t.tagColor === 'red').length})
        </button>

        <button
          onClick={() => setActiveColorFilter('purple')}
          className={`px-3 py-1 font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeColorFilter === 'purple'
              ? 'bg-violet-950/80 border border-violet-500 text-violet-300'
              : 'text-slate-400 hover:text-violet-300'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          Purple Mastery ({tasks.filter((t) => t.tagColor === 'purple').length})
        </button>
      </div>

      {/* Inline Add Task Form */}
      {showAddForm && (
        <form onSubmit={handleCreateTask} className="my-3 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              New Practice Challenge
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div>
            <input
              type="text"
              required
              placeholder="e.g. Center a modal with pure CSS Grid"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Color Category</label>
              <select
                value={newColor}
                onChange={(e) => setNewColor(e.target.value as ColorTag)}
                className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
              >
                <option value="green">🟢 Green (Solved/Warmup)</option>
                <option value="red">🔴 Red (Bug/Urgent)</option>
                <option value="purple">🟣 Purple (Deep/XP)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Difficulty</label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
              >
                <option value="Easy">Easy (+100 XP)</option>
                <option value="Medium">Medium (+180 XP)</option>
                <option value="Hard">Hard (+250 XP)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Est. Minutes</label>
              <input
                type="number"
                min={5}
                max={90}
                value={newMinutes}
                onChange={(e) => setNewMinutes(Number(e.target.value))}
                className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
              >
              </input>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg cursor-pointer"
            >
              Add to Queue
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="mt-2 space-y-2.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No practice tasks found for this filter.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isGreen = task.tagColor === 'green';
            const isRed = task.tagColor === 'red';

            return (
              <div
                key={task.id}
                onClick={() => {
                  onToggleTask(task.id);
                  sounds.playClick();
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 group ${
                  task.completed
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : isGreen
                    ? 'bg-slate-950/70 border-emerald-900/40 hover:border-emerald-600/60'
                    : isRed
                    ? 'bg-slate-950/70 border-rose-900/40 hover:border-rose-600/60'
                    : 'bg-slate-950/70 border-violet-900/40 hover:border-violet-600/60'
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  className="mt-0.5 text-slate-500 group-hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark completed'}
                >
                  {task.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-semibold ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-100'
                      }`}
                    >
                      {task.title}
                    </span>

                    {/* Color dot */}
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isGreen ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : isRed ? 'bg-rose-400 shadow-[0_0_6px_#ef4444]' : 'bg-violet-400 shadow-[0_0_6px_#8b5cf6]'
                      }`}
                      title={`${task.tagColor} category`}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <span className="text-slate-400">{task.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {task.estimatedMinutes}m
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-violet-300 font-semibold">+{task.xpReward} XP</span>
                    {task.assignedTo && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-400">{task.assignedTo}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Click any drill to mark completed & award squad XP</span>
        <span className="text-emerald-400 font-semibold">
          +{tasks.filter((t) => t.completed).reduce((acc, c) => acc + c.xpReward, 0)} XP Earned
        </span>
      </div>
    </div>
  );
};
