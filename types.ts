
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

// Content Types for Theory Slides
export interface ContentSection {
  heading: string;
  body: string;
  bullets?: string[];
  example?: {
    label: string;
    text: string;
    subtext?: string;
  };
  highlight?: {
    type: 'tip' | 'warning' | 'vocab';
    text: string;
  };
}

// Data Types for Charts/Visuals
export interface ChartDataPoint {
  name: string;
  value1: number;
  value2?: number;
  value3?: number;
}

export interface ProcessStep {
  step: number;
  label: string;
  description: string;
  icon: string;
}

export interface MapFeature {
  name: string;
  location: string;
  status: 'unchanged' | 'expanded' | 'removed' | 'new';
}

export interface MapData {
  year1: number;
  year2: number;
  features: MapFeature[];
}

export interface SlideData {
  id: number;
  title: string;
  category: string;
  icon: string;
  type: 'theory' | 'chart' | 'map' | 'process';
  // Theory content
  sections?: ContentSection[];
  // Interactive content
  chartData?: ChartDataPoint[];
  processData?: ProcessStep[];
  mapData?: MapData;
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
