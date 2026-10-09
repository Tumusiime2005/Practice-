import { Challenge, Friend, PracticeTask, ActivityItem } from '../types/dashboard';

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Elton M.',
    role: 'Practice Host',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'coding',
    currentDrill: 'CSS Grid Holy Grail Layout',
    level: 14,
    xp: 5420,
    drillsCompleted: 42,
    bugsSquashed: 18,
    streakDays: 12,
    colorAccent: 'purple',
  },
  {
    id: 'f2',
    name: 'Sarah K.',
    role: 'Frontend Apprentice',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    currentDrill: 'Green Pulse Button Animation',
    level: 13,
    xp: 4890,
    drillsCompleted: 38,
    bugsSquashed: 12,
    streakDays: 9,
    colorAccent: 'green',
  },
  {
    id: 'f3',
    name: 'Alex D.',
    role: 'Bug Hunter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'coding',
    currentDrill: 'Red Banner Overflow Fix',
    level: 11,
    xp: 3920,
    drillsCompleted: 31,
    bugsSquashed: 24,
    streakDays: 6,
    colorAccent: 'red',
  },
  {
    id: 'f4',
    name: 'Jordan P.',
    role: 'CSS Stylist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'break',
    currentDrill: 'Purple Glassmorphic Card',
    level: 10,
    xp: 3450,
    drillsCompleted: 27,
    bugsSquashed: 8,
    streakDays: 4,
    colorAccent: 'purple',
  },
];

export const INITIAL_TASKS: PracticeTask[] = [
  {
    id: 't1',
    title: 'Build Green Status Pill with Pulse Animation',
    description: 'Use pure CSS @keyframes to create a glowing green live status dot with smooth pulse rings.',
    category: 'CSS Animation',
    tagColor: 'green',
    difficulty: 'Easy',
    estimatedMinutes: 15,
    completed: true,
    assignedTo: 'Sarah K.',
    xpReward: 120,
  },
  {
    id: 't2',
    title: 'Squash Red Flexbox Z-Index Overflow Bug',
    description: 'Fix sticky header dropping below red error toast banner when scrolling past 400px.',
    category: 'Bug Fixing',
    tagColor: 'red',
    difficulty: 'Hard',
    estimatedMinutes: 25,
    completed: false,
    assignedTo: 'Alex D.',
    xpReward: 250,
  },
  {
    id: 't3',
    title: 'Design Purple Glassmorphic Squad Card',
    description: 'Style a modern squad member card using backdrop-filter: blur, purple gradient border, and rgba background.',
    category: 'Layout & Effects',
    tagColor: 'purple',
    difficulty: 'Medium',
    estimatedMinutes: 20,
    completed: false,
    assignedTo: 'Jordan P.',
    xpReward: 180,
  },
  {
    id: 't4',
    title: 'Practice HTML Semantic Structure (header, nav, main, footer)',
    description: 'Replace unsemantic div soup with proper accessible landmarks and clean hierarchy.',
    category: 'HTML Semantics',
    tagColor: 'green',
    difficulty: 'Easy',
    estimatedMinutes: 10,
    completed: true,
    assignedTo: 'Elton M.',
    xpReward: 100,
  },
  {
    id: 't5',
    title: 'Implement Red Warning Modal with Backdrop',
    description: 'Build an alert dialog overlay with accessible contrast, red accent rim, and keyboard focus trap.',
    category: 'UI Components',
    tagColor: 'red',
    difficulty: 'Hard',
    estimatedMinutes: 30,
    completed: false,
    assignedTo: 'Alex D.',
    xpReward: 220,
  },
  {
    id: 't6',
    title: 'Create Purple Triad Theme Switcher Demo',
    description: 'Build a 3-button selector allowing users to switch CSS variable accents between green, red, and purple.',
    category: 'CSS Variables',
    tagColor: 'purple',
    difficulty: 'Medium',
    estimatedMinutes: 15,
    completed: false,
    assignedTo: 'Elton M.',
    xpReward: 150,
  },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: '🟢 Green Emerald Button with Glow',
    subtitle: 'Practice CSS transitions, hover transforms & box-shadow glow in emerald green.',
    category: 'CSS Buttons',
    accentColor: 'green',
    instructions: 'Style the button with emerald green background (#10b981), rounded corners, smooth hover scaling, and an emerald glow box-shadow.',
    starterHtml: `<div class="practice-box">
  <button class="btn-green">
    <span class="icon">✓</span> Conquered
  </button>
</div>`,
    starterCss: `.practice-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
  background: #0f172a;
}

.btn-green {
  background: #10b981;
  color: #ffffff;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-green:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}`,
    solutionHints: [
      'Set background to #10b981 or emerald green',
      'Use border-radius: 8px or higher',
      'Add a transition on transform and box-shadow for smooth animation',
    ],
    testRules: [
      {
        id: 'r1',
        description: 'Contains background color using emerald green (#10b981 or rgb)',
        check: (_, css) => /background.*(#10b981|#22c55e|rgb\(16,\s*185,\s*129\)|green|emerald)/i.test(css),
      },
      {
        id: 'r2',
        description: 'Uses border-radius for rounded styling',
        check: (_, css) => /border-radius:\s*[0-9]+px/i.test(css),
      },
      {
        id: 'r3',
        description: 'Includes a hover pseudo-selector with box-shadow or transform',
        check: (_, css) => /:hover[\s\S]*?(box-shadow|transform)/i.test(css),
      },
    ],
  },
  {
    id: 'c2',
    title: '🔴 Red Bug Alert Card',
    subtitle: 'Practice flexbox layouts, crimson borders, and red danger badges.',
    category: 'Component Layout',
    accentColor: 'red',
    instructions: 'Create an alert notification card with a crimson red left accent border (#ef4444), flexbox alignment, and bold title.',
    starterHtml: `<div class="alert-container">
  <div class="bug-card">
    <div class="bug-icon">⚠️</div>
    <div class="bug-content">
      <h4 class="bug-title">Critical Bug #404</h4>
      <p class="bug-desc">Flexbox wrap breaking on mobile viewports. Check width.</p>
    </div>
  </div>
</div>`,
    starterCss: `.alert-container {
  padding: 24px;
  background: #0f172a;
}

.bug-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #1e1b2e;
  border-left: 4px solid #ef4444;
  border-radius: 8px;
  padding: 16px 20px;
  color: #f8fafc;
  font-family: sans-serif;
}

.bug-icon {
  font-size: 24px;
}

.bug-title {
  margin: 0 0 4px 0;
  color: #ef4444;
  font-size: 15px;
  font-weight: 700;
}

.bug-desc {
  margin: 0;
  font-size: 13px;
  color: #cbd5e1;
}`,
    solutionHints: [
      'Use display: flex and gap for clean separation',
      'Set border-left: 4px solid #ef4444 for the red alert accent',
      'Style the title with red color to indicate danger/bug priority',
    ],
    testRules: [
      {
        id: 'r1',
        description: 'Card uses display: flex with gap or alignment',
        check: (_, css) => /display:\s*flex/i.test(css) && /gap:|align-items:/i.test(css),
      },
      {
        id: 'r2',
        description: 'Contains red border or red color (#ef4444 or red)',
        check: (_, css) => /(#ef4444|#dc2626|red|crimson)/i.test(css),
      },
      {
        id: 'r3',
        description: 'Applies border-radius to card',
        check: (_, css) => /border-radius/i.test(css),
      },
    ],
  },
  {
    id: 'c3',
    title: '🟣 Purple Glassmorphic Stat Box',
    subtitle: 'Practice CSS backdrop-filter, royal purple gradients, and semi-transparent alpha colors.',
    category: 'Modern Glass UI',
    accentColor: 'purple',
    instructions: 'Build a purple glassmorphism card with a gradient border, translucent background, and glowing purple XP counter.',
    starterHtml: `<div class="glass-stage">
  <div class="xp-card">
    <div class="xp-badge">SQUAD MASTERY</div>
    <div class="xp-score">5,820 XP</div>
    <div class="xp-caption">Level 14 · CSS Archmage</div>
  </div>
</div>`,
    starterCss: `.glass-stage {
  padding: 32px;
  display: flex;
  justify-content: center;
  background: radial-gradient(circle at center, #2e1065 0%, #09090b 100%);
}

.xp-card {
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 14px;
  padding: 24px 32px;
  text-align: center;
  color: #f8fafc;
  font-family: sans-serif;
  box-shadow: 0 8px 32px rgba(124, 58, 237, 0.25);
}

.xp-badge {
  font-size: 11px;
  letter-spacing: 1.5px;
  color: #c084fc;
  font-weight: 700;
  margin-bottom: 8px;
}

.xp-score {
  font-size: 32px;
  font-weight: 800;
  color: #f3e8ff;
  text-shadow: 0 0 16px rgba(168, 85, 247, 0.6);
}

.xp-caption {
  font-size: 12px;
  color: #d8b4fe;
  margin-top: 4px;
}`,
    solutionHints: [
      'Use backdrop-filter: blur(...) for glass depth',
      'Use purple rgba border like rgba(168, 85, 247, 0.4)',
      'Add subtle text-shadow or box-shadow for purple glow',
    ],
    testRules: [
      {
        id: 'r1',
        description: 'Uses backdrop-filter: blur for glassmorphism',
        check: (_, css) => /backdrop-filter:\s*blur/i.test(css),
      },
      {
        id: 'r2',
        description: 'Uses purple color accents (#8b5cf6, #c084fc, #a855f7, or violet/purple)',
        check: (_, css) => /(#8b5cf6|#a855f7|#c084fc|#2e1065|#7c3aed|purple|violet)/i.test(css),
      },
      {
        id: 'r3',
        description: 'Uses box-shadow or text-shadow for lighting effects',
        check: (_, css) => /(box-shadow|text-shadow)/i.test(css),
      },
    ],
  },
  {
    id: 'c4',
    title: '🟢🔴🟣 Tri-Color Practice Grid',
    subtitle: 'Practice CSS Grid with 3 columns styled in Green, Red, and Purple.',
    category: 'CSS Grid',
    accentColor: 'green',
    instructions: 'Build a responsive 3-column CSS Grid displaying Green (Completed), Red (Alert), and Purple (Mastery) metric panels.',
    starterHtml: `<div class="triad-grid">
  <div class="col col-green">
    <span class="num">42</span>
    <span class="lbl">Passed Drills</span>
  </div>
  <div class="col col-red">
    <span class="num">5</span>
    <span class="lbl">Pending Bugs</span>
  </div>
  <div class="col col-purple">
    <span class="num">98%</span>
    <span class="lbl">Squad Mastery</span>
  </div>
</div>`,
    starterCss: `.triad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
  background: #09090b;
  font-family: sans-serif;
}

.col {
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.num {
  font-size: 26px;
  font-weight: 800;
}

.lbl {
  font-size: 12px;
  opacity: 0.8;
}

.col-green {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid #10b981;
  color: #34d399;
}

.col-red {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid #ef4444;
  color: #f87171;
}

.col-purple {
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid #8b5cf6;
  color: #c084fc;
}`,
    solutionHints: [
      'Use display: grid and grid-template-columns: repeat(3, 1fr)',
      'Style .col-green with green border (#10b981)',
      'Style .col-red with red border (#ef4444)',
      'Style .col-purple with purple border (#8b5cf6)',
    ],
    testRules: [
      {
        id: 'r1',
        description: 'Uses display: grid with grid-template-columns',
        check: (_, css) => /display:\s*grid/i.test(css) && /grid-template-columns/i.test(css),
      },
      {
        id: 'r2',
        description: 'Includes all 3 color accents: green, red, and purple in CSS',
        check: (_, css) => {
          const hasGreen = /(#10b981|#34d399|#22c55e|green)/i.test(css);
          const hasRed = /(#ef4444|#f87171|#dc2626|red)/i.test(css);
          const hasPurple = /(#8b5cf6|#c084fc|#a855f7|purple|violet)/i.test(css);
          return hasGreen && hasRed && hasPurple;
        },
      },
      {
        id: 'r3',
        description: 'Applies gap property between columns',
        check: (_, css) => /gap:\s*[0-9]+px/i.test(css),
      },
    ],
  },
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    user: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    action: 'passed test suite for',
    target: 'Green Signal Button Glow',
    colorTag: 'green',
    timestamp: '8 min ago',
    xpGained: 120,
  },
  {
    id: 'a2',
    user: 'Alex D.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    action: 'isolated and logged',
    target: 'Red Bug #404 (Flex Overflow)',
    colorTag: 'red',
    timestamp: '22 min ago',
    xpGained: 75,
  },
  {
    id: 'a3',
    user: 'Elton M.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'leveled up squad rank to Level 14',
    target: 'Purple Mastery Milestone',
    colorTag: 'purple',
    timestamp: '45 min ago',
    xpGained: 300,
  },
  {
    id: 'a4',
    user: 'Jordan P.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    action: 'completed 25min Pomodoro sprint',
    target: 'CSS Variables Theming',
    colorTag: 'purple',
    timestamp: '1 hr ago',
    xpGained: 150,
  },
];
