
import { SlideData, Personality } from "./types";

export const SLIDES: SlideData[] = [
  // Module 1: Foundations
  { id: 0, title: "Course Introduction", category: "Module 1: Foundations", icon: "fa-door-open", type: "theory" },
  { id: 1, title: "The 4 Pillars", category: "Module 1: Foundations", icon: "fa-columns", type: "theory" },
  { id: 2, title: "The Perfect Structure", category: "Module 1: Foundations", icon: "fa-layer-group", type: "theory" },
  
  // Module 2: The 3 Steps
  { id: 3, title: "Step 1: The Introduction", category: "Module 2: The 3 Steps", icon: "fa-pen-nib", type: "theory" },
  { id: 4, title: "Step 2: The Overview", category: "Module 2: The 3 Steps", icon: "fa-binoculars", type: "theory" },
  { id: 5, title: "Step 3: Body Paragraphs", category: "Module 2: The 3 Steps", icon: "fa-indent", type: "theory" },

  // Module 3: Authentic Practice (2021-2025)
  { id: 6, title: "Line: Internet Access (2024)", category: "Module 3: Practice Bank", icon: "fa-chart-line", type: "chart" },
  { id: 7, title: "Bar: Transport Spend (2023)", category: "Module 3: Practice Bank", icon: "fa-chart-simple", type: "chart" },
  { id: 8, title: "Pie: Energy Sources (2024)", category: "Module 3: Practice Bank", icon: "fa-chart-pie", type: "chart" },
  
  // Visual Tasks
  { id: 9, title: "Process: Olive Oil (2022)", category: "Module 3: Practice Bank", icon: "fa-recycle", type: "theory" },
  { id: 10, title: "Map: Town Changes (2021)", category: "Module 3: Practice Bank", icon: "fa-map-location-dot", type: "theory" },
];

export const INITIAL_XP = 0;
export const LEVEL_THRESHOLD = 100;

// NEW: Surgical Theme Configuration
export const THEME = {
  [Personality.INTROVERT]: {
    appBg: "bg-slate-900",
    sidebarBg: "bg-slate-950 border-r border-slate-800",
    mainBg: "bg-slate-900",
    fontHead: "font-serif",
    fontBody: "font-sans",
    radius: "rounded-md",
    buttonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-none border border-indigo-400/30",
    buttonSecondary: "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700",
    cardBg: "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-200",
    textPrimary: "text-slate-200",
    textSecondary: "text-slate-400",
    accentColor: "text-indigo-400",
    progressGradient: "from-indigo-900 via-blue-800 to-indigo-500",
    labels: {
      xp: "Knowledge Points",
      streak: "Consistency",
      level: "Academic Tier",
      completeBtn: "Conclude Module",
      nextBtn: "Proceed",
      feedbackGood: "Analysis Correct.",
      feedbackBad: "Re-evaluate methodology."
    }
  },
  [Personality.EXTROVERT]: {
    appBg: "bg-orange-50",
    sidebarBg: "bg-gradient-to-b from-orange-600 to-red-600 border-r-0 shadow-[4px_0_0_rgba(0,0,0,0.1)]",
    mainBg: "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]",
    fontHead: "font-fun",
    fontBody: "font-sans",
    radius: "rounded-[2rem]",
    buttonPrimary: "bg-yellow-400 hover:bg-yellow-300 text-black border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1",
    buttonSecondary: "bg-white text-orange-600 border-b-4 border-orange-200 hover:bg-orange-50",
    cardBg: "bg-white shadow-[8px_8px_0_rgba(0,0,0,0.1)] border-2 border-black text-slate-900",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    accentColor: "text-orange-600",
    progressGradient: "from-yellow-400 via-orange-500 to-red-600",
    labels: {
      xp: "POWER LEVEL",
      streak: "FIRE STREAK",
      level: "BOSS LEVEL",
      completeBtn: "SMASH IT! 🔥",
      nextBtn: "LET'S GO! 🚀",
      feedbackGood: "BOOM! CRUSHED IT!",
      feedbackBad: "NOPE! TRY AGAIN!"
    }
  },
  [Personality.AMBIVERT]: {
    appBg: "bg-slate-50",
    sidebarBg: "bg-slate-900 border-r border-white/5",
    mainBg: "bg-slate-50/50",
    fontHead: "font-serif",
    fontBody: "font-sans",
    radius: "rounded-xl",
    buttonPrimary: "bg-primary text-white hover:bg-accent shadow-lg hover:shadow-accent/30",
    buttonSecondary: "bg-white border border-slate-200 text-slate-500 hover:text-primary",
    cardBg: "bg-white shadow-xl border border-slate-100 text-slate-800",
    textPrimary: "text-slate-800",
    textSecondary: "text-slate-500",
    accentColor: "text-accent",
    progressGradient: "from-yellow-400 via-orange-400 to-accent",
    labels: {
      xp: "XP",
      streak: "Day Streak",
      level: "Level",
      completeBtn: "Mark as Mastered",
      nextBtn: "Next Exercise",
      feedbackGood: "Outstanding! +20 XP",
      feedbackBad: "Incorrect. Try again."
    }
  }
};