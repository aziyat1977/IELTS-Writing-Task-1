export enum AppMode {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  KAHOOT = 'Kahoot',
  SIMULATION = 'Simulation'
}

export enum Personality {
  INTROVERT = 'Introvert',
  EXTROVERT = 'Extrovert',
  AMBIVERT = 'Ambivert'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface SlideData {
  id: number;
  title: string;
  category: string;
  icon: string;
  type: 'theory' | 'chart' | 'map' | 'process';
  content?: any;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserState {
  xp: number;
  level: number;
  streak: number;
  mode: AppMode;
  personality: Personality;
  completedSlides: number[];
}
