
import { SlideData, Personality, AppMode, MapData } from "./types";

export const INITIAL_XP = 0;
export const LEVEL_THRESHOLD = 100;

// AUTHENTIC MOCK DATASETS

// 1. Line Graph: Radio & TV Audiences (UK)
const LINE_DATA_UK = [
  { name: '6am', value1: 8, value2: 5 },
  { name: '9am', value1: 25, value2: 12 },
  { name: '12pm', value1: 15, value2: 20 },
  { name: '3pm', value1: 12, value2: 18 },
  { name: '6pm', value1: 10, value2: 45 },
  { name: '9pm', value1: 5, value2: 38 },
  { name: '12am', value1: 2, value2: 5 },
];

// 2. Bar Chart: Consumer Spend on Luxury Goods
const BAR_DATA_LUXURY = [
  { name: 'USA', value1: 450, value2: 300 },
  { name: 'China', value1: 300, value2: 550 },
  { name: 'Europe', value1: 400, value2: 380 },
  { name: 'Japan', value1: 200, value2: 220 },
];

// 3. Pie Chart: Online Sales by Sector
const PIE_DATA_SALES = [
  { name: 'Electronics', value1: 45 },
  { name: 'Fashion', value1: 25 },
  { name: 'Home', value1: 20 },
  { name: 'Sports', value1: 10 },
];

// 4. Process: Production of Chocolate
const PROCESS_DATA_CHOCOLATE = [
  { step: 1, label: "Harvesting", description: "Ripe cocoa pods are harvested from cacao trees grown in tropical regions.", icon: "fa-leaf" },
  { step: 2, label: "Fermentation", description: "Beans are removed and fermented for 5-7 days to develop flavor.", icon: "fa-flask" },
  { step: 3, label: "Drying", description: "Beans are spread in the sun to dry completely before shipping.", icon: "fa-sun" },
  { step: 4, label: "Roasting", description: "Beans are roasted at high temperatures (120°C) to enhance aroma.", icon: "fa-fire-burner" },
  { step: 5, label: "Crushing", description: "Outer shells are removed to extract the inner 'nibs'.", icon: "fa-hammer" },
  { step: 6, label: "Liquefaction", description: "Nibs are ground under pressure into liquid chocolate liquor.", icon: "fa-glass-water" },
];

// 5. Map: Isola Village (2000 vs 2024)
const MAP_DATA_VILLAGE: MapData = {
  year1: 2000,
  year2: 2024,
  features: [
    { name: "Farmland", location: "North", status: "removed" },
    { name: "Housing Estate", location: "North", status: "new" },
    { name: "Market Square", location: "Center", status: "unchanged" },
    { name: "Local School", location: "East", status: "expanded" },
    { name: "Ferry Port", location: "South", status: "new" },
    { name: "Fishing Docs", location: "South", status: "removed" }
  ]
};

export const SLIDES: SlideData[] = [
  // Module 1: Foundations
  { 
    id: 0, 
    title: "Course Strategy", 
    category: "Module 1: Foundations", 
    icon: "fa-chess", 
    type: "theory",
    sections: [
      {
        heading: "The 'Analyst' Mindset",
        body: "IELTS Task 1 is not about description; it is about selection. You must act like a Data Analyst.",
        bullets: [
          "Do not list every number.",
          "Group similar data together.",
          "Identify the 'story' (the main trend)."
        ]
      },
      {
        heading: "Time Management",
        body: "You have 20 minutes. Failure to plan is the #1 reason for low scores.",
        highlight: { type: "tip", text: "Plan: 3 min | Write: 15 min | Check: 2 min" }
      }
    ]
  },
  { 
    id: 1, 
    title: "The 4 Pillars (Band 7+)", 
    category: "Module 1: Foundations", 
    icon: "fa-columns", 
    type: "theory",
    sections: [
      {
        heading: "Task Achievement (TA)",
        body: "Did you report the 'Main Features'? If you miss the biggest trend, you cannot score above Band 5.",
        highlight: { type: "warning", text: "Never give your opinion. Stick to the data." }
      },
      {
        heading: "Coherence & Cohesion (CC)",
        body: "Logical flow. Use linking words naturally, not mechanically.",
        example: { label: "Good Linker", text: "Turning to the remaining categories..." }
      },
      {
        heading: "Lexical Resource (LR)",
        body: "Precise vocabulary. Avoid 'big' words if they are wrong. Use collocations.",
        bullets: ["Increase -> Surge, Rocket, Climb", "Decrease -> Plummet, Dwindle, Dip"]
      },
      {
        heading: "Grammatical Range (GRA)",
        body: "Use complex sentences (Although X increased, Y remained stable...).",
      }
    ]
  },
  { 
    id: 2, 
    title: "Structure: The 4-Paragraph Model", 
    category: "Module 1: Foundations", 
    icon: "fa-layer-group", 
    type: "theory",
    sections: [
      {
        heading: "Paragraph 1: Introduction",
        body: "1 sentence. Paraphrase the question prompt."
      },
      {
        heading: "Paragraph 2: Overview",
        body: "2-3 sentences. The most important paragraph. Summarize the main trends (What is highest? What changed the most?). No numbers here."
      },
      {
        heading: "Paragraph 3: Detail Body A",
        body: "Group data logically (e.g., all increasing trends). Give specific numbers."
      },
      {
        heading: "Paragraph 4: Detail Body B",
        body: "The remaining data (e.g., all decreasing trends). Comparisons and contrasts."
      }
    ]
  },
  
  // Module 2: The 3 Steps
  { 
    id: 3, 
    title: "Step 1: The Introduction", 
    category: "Module 2: The 3 Steps", 
    icon: "fa-pen-nib", 
    type: "theory",
    sections: [
      {
        heading: "The Art of Paraphrasing",
        body: "Never copy the question. Change the words and the grammar.",
        example: { 
          label: "Transformation", 
          text: "Question: 'The graph shows data about...'",
          subtext: "Answer: 'The line graph provides information regarding...'"
        }
      },
      {
        heading: "Useful Synonyms",
        body: "Memorize these pairs:",
        bullets: [
          "Shows -> Illustrates / Depicts / Highlights",
          "Information -> Data / Statistics",
          "Proportion -> Percentage / Share",
          "From 2000 to 2010 -> Between 2000 and 2010 / Over a decade"
        ]
      }
    ]
  },
  { 
    id: 4, 
    title: "Step 2: The Overview", 
    category: "Module 2: The 3 Steps", 
    icon: "fa-binoculars", 
    type: "theory",
    sections: [
      {
        heading: "Finding the 'Big Picture'",
        body: "Imagine looking at the chart from across the room. What do you see? Ignore small details.",
        highlight: { type: "vocab", text: "Start with: 'Overall, it is immediately apparent that...'" }
      },
      {
        heading: "What to look for",
        body: "1. Highest/Lowest point throughout.\n2. General Trend (Upward/Downward).\n3. Exceptions/Stability.",
        example: { label: "Example", text: "Overall, car sales increased significantly, while train usage saw a steady decline." }
      }
    ]
  },
  { 
    id: 5, 
    title: "Step 3: Grouping Data", 
    category: "Module 2: The 3 Steps", 
    icon: "fa-indent", 
    type: "theory",
    sections: [
      {
        heading: "Logic is King",
        body: "How you divide your body paragraphs determines your Coherence score.",
        bullets: [
          "Method A: By Time (e.g., 1990-2000 in Para 1, 2000-2010 in Para 2)",
          "Method B: By Category (e.g., Increasing items in Para 1, Decreasing items in Para 2)"
        ]
      },
      {
        heading: "Citation Pattern",
        body: "Feature + Verb + Number + Time.",
        example: { label: "Sentence Formula", text: "The price of oil (Feature) peaked (Verb) at $100 (Number) in 2008 (Time)." }
      }
    ]
  },

  // Module 3: Authentic Practice
  { 
    id: 6, 
    title: "Line: TV vs Radio (UK)", 
    category: "Module 3: Practice Bank", 
    icon: "fa-chart-line", 
    type: "chart",
    chartData: LINE_DATA_UK
  },
  { 
    id: 7, 
    title: "Bar: Luxury Spending", 
    category: "Module 3: Practice Bank", 
    icon: "fa-chart-simple", 
    type: "chart",
    chartData: BAR_DATA_LUXURY
  },
  { 
    id: 8, 
    title: "Pie: Online Sales", 
    category: "Module 3: Practice Bank", 
    icon: "fa-chart-pie", 
    type: "chart",
    chartData: PIE_DATA_SALES
  },
  
  // Visual Tasks
  { 
    id: 9, 
    title: "Process: Making Chocolate", 
    category: "Module 3: Practice Bank", 
    icon: "fa-recycle", 
    type: "process",
    processData: PROCESS_DATA_CHOCOLATE
  },
  { 
    id: 10, 
    title: "Map: Isola Village", 
    category: "Module 3: Practice Bank", 
    icon: "fa-map-location-dot", 
    type: "map",
    mapData: MAP_DATA_VILLAGE
  },
];

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
