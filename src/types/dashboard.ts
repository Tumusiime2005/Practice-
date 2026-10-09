export type ColorTag = 'green' | 'red' | 'purple';

export interface Friend {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'coding' | 'break' | 'offline';
  currentDrill: string;
  level: number;
  xp: number;
  drillsCompleted: number;
  bugsSquashed: number;
  streakDays: number;
  colorAccent: ColorTag;
}

export interface PracticeTask {
  id: string;
  title: string;
  description: string;
  category: string;
  tagColor: ColorTag;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  completed: boolean;
  assignedTo?: string;
  xpReward: number;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  accentColor: ColorTag;
  instructions: string;
  starterHtml: string;
  starterCss: string;
  solutionHints: string[];
  testRules: {
    id: string;
    description: string;
    check: (html: string, css: string) => boolean;
  }[];
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  colorTag: ColorTag;
  timestamp: string;
  xpGained?: number;
}
