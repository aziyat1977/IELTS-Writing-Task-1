
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';
import { Personality } from '../../types';
import { THEME } from '../../constants';

interface Props {
  type: 'line' | 'bar';
  data: any[];
  title: string;
  onAction: () => void;
  personality: Personality;
}

type ExerciseType = 'fill-blank' | 'mcq';

interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  beforeText?: string;
  afterText?: string;
  options: ExerciseOption[];
}

const InteractiveChartSlide: React.FC<Props> = ({ type, data, title, onAction, personality }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'overview'>('intro');
  const [exercises, setExercises] = useState<{ intro: Exercise[]; overview: Exercise[] }>({ intro: [], overview: [] });
  const [currentIndices, setCurrentIndices] = useState({ intro: 0, overview: 0 });
  const [feedback, setFeedback] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  
  const theme = THEME[personality];

  // Helper to shuffle arrays
  const shuffle = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setFeedback(null);
    setCurrentIndices({ intro: 0, overview: 0 });
    setCompletedIds(new Set());
    setActiveTab('intro');

    // Generic Exercises applicable to any chart
    const introExs: Exercise[] = [
      {
        id: 'i1',
        type: 'fill-blank',
        prompt: 'Task 1 Introduction: Select the most precise academic verb.',
        beforeText: `The ${type === 'line' ? 'line graph' : 'chart'}`,
        afterText: 'data regarding the changes in specific categories over the given period.',
        options: shuffle([
          { id: 'opt1', text: 'illustrates', isCorrect: true },
          { id: 'opt2', text: 'talks about', isCorrect: false },
          { id: 'opt3', text: 'shows up', isCorrect: false }
        ])
      },
      {
        id: 'i2',
        type: 'fill-blank',
        prompt: 'Prepositions of Time: Choose the correct structure.',
        beforeText: 'Data is provided for the period',
        afterText: 'the initial year and the final year.',
        options: shuffle([
          { id: 'opt1', text: 'between', isCorrect: true },
          { id: 'opt2', text: 'from', isCorrect: false },
          { id: 'opt3', text: 'since', isCorrect: false }
        ])
      }
    ];

    const overviewExs: Exercise[] = [
      {
        id: 'o1',
        type: 'mcq',
        prompt: 'The Overview Paragraph: Identify the correct style.',
        options: shuffle([
          { 
            id: 'opt1', 
            text: 'Overall, it is clear that there were significant fluctuations, with most categories showing an upward trend.', 
            isCorrect: true 
          },
          { 
            id: 'opt2', 
            text: 'In the first year, the value was 50, which increased to 100 in the final year.', 
            isCorrect: false 
          }
        ])
      }
    ];

    setExercises({ intro: introExs, overview: overviewExs });

  }, [title, type]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setFeedback({ msg: theme.labels.feedbackGood, type: 'success' });
      onAction();
      
      const currentList = activeTab === 'intro' ? exercises.intro : exercises.overview;
      const currentIndex = activeTab === 'intro' ? currentIndices.intro : currentIndices.overview;
      
      const currentEx = currentList[currentIndex];
      setCompletedIds(prev => new Set(prev).add(currentEx.id));

      setTimeout(() => {
        if(currentIndex < currentList.length - 1) {
           nextExercise();
        }
      }, 1500);

    } else {
      setFeedback({ msg: theme.labels.feedbackBad, type: 'error' });
    }
  };

  const nextExercise = () => {
    setFeedback(null);
    setCurrentIndices(prev => ({
      ...prev,
      [activeTab]: Math.min(prev[activeTab] + 1, (activeTab === 'intro' ? exercises.intro.length : exercises.overview.length) - 1)
    }));
  };

  const prevExercise = () => {
    setFeedback(null);
    setCurrentIndices(prev => ({
      ...prev,
      [activeTab]: Math.max(prev[activeTab] - 1, 0)
    }));
  };

  const currentList = activeTab === 'intro' ? exercises.intro : exercises.overview;
  const currentIndex = activeTab === 'intro' ? currentIndices.intro : currentIndices.overview;
  const currentExercise = currentList[currentIndex];

  if (!currentExercise) return <div className="p-8 text-center text-slate-400 font-bold">Initializing Training Module...</div>;

  return (
    <div className="h-full flex flex-col gap-6 p-8 overflow-y-auto">
      
      {/* Enhanced Header */}
      <div className={`flex flex-col md:flex-row justify-between items-end border-b pb-6 gap-4 ${personality === Personality.INTROVERT ? 'border-slate-800' : 'border-slate-200/60'}`}>
         <div>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme.fontHead} ${theme.textPrimary}`}>{title}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white ${type === 'line' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                {type === 'line' ? 'Dynamic' : 'Static'}
              </span>
              <p className={`font-medium text-sm ${theme.textSecondary}`}>Analyze data patterns and report features.</p>
            </div>
         </div>
         <div className={`flex p-1 ${theme.radius} ${personality === Personality.INTROVERT ? 'bg-slate-800' : 'bg-slate-200/50'}`}>
           <button 
             onClick={() => { setActiveTab('intro'); setFeedback(null); }}
             className={`px-6 py-2.5 ${theme.radius} text-sm font-bold transition-all duration-300 ${activeTab === 'intro' ? theme.buttonPrimary : theme.textSecondary}`}
           >
             1. Introduction
           </button>
           <button 
             onClick={() => { setActiveTab('overview'); setFeedback(null); }}
             className={`px-6 py-2.5 ${theme.radius} text-sm font-bold transition-all duration-300 ${activeTab === 'overview' ? theme.buttonPrimary : theme.textSecondary}`}
           >
             2. Overview
           </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-1 min-h-[500px]">
        
        {/* Left: Enhanced Chart Visuals */}
        <div className={`flex flex-col relative overflow-hidden group p-8 ${theme.cardBg} ${theme.radius}`}>
          {personality !== Personality.INTROVERT && (
             <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white z-0 opacity-50"></div>
          )}
          
          <div className="flex-1 z-10 relative">
            <ResponsiveContainer width="100%" height="100%">
              {type === 'line' ? (
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorV1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray={personality === Personality.INTROVERT ? "1 1" : "3 3"} stroke={personality === Personality.INTROVERT ? "#334155" : "#e2e8f0"} vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '30px' }} iconType="circle" />
                  <Area type="monotone" name="Category A" dataKey="value1" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorV1)" dot={{r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff'}} />
                  <Area type="monotone" name="Category B" dataKey="value2" stroke={personality === Personality.INTROVERT ? "#818cf8" : "#1e293b"} strokeWidth={3} fillOpacity={0} dot={{r: 4}} />
                </AreaChart>
              ) : (
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke={personality === Personality.INTROVERT ? "#334155" : "#e2e8f0"} vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dx={-10} />
                  <Tooltip cursor={{fill: '#f1f5f9', radius: 4}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Legend wrapperStyle={{ paddingTop: '30px' }} iconType="circle" />
                  <Bar name="Item 1" dataKey="value1" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={30} />
                  <Bar name="Item 2" dataKey="value2" fill={personality === Personality.INTROVERT ? "#818cf8" : "#1e293b"} radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Interaction Zone */}
        <div className="flex flex-col gap-5">
           
           {/* Progress Indicator */}
           <div className="flex justify-between items-center px-1">
             <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${theme.textSecondary}`}>
               Exercise {currentIndex + 1} / {currentList.length}
             </span>
           </div>

           {/* Enhanced Card */}
           <div className={`p-8 flex-1 flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-500 ${theme.cardBg} ${theme.radius}`}>
              
              <div className="flex-1 animate-scale-in" key={currentExercise.id}>
                 <div className="flex items-center gap-3 mb-6">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold italic ${personality === Personality.INTROVERT ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-100 text-slate-500'}`}>
                     Q
                   </div>
                   <h3 className={`text-xl font-bold leading-snug ${theme.textPrimary}`}>
                     {currentExercise.prompt}
                   </h3>
                 </div>
                 
                 {currentExercise.type === 'fill-blank' ? (
                   <div className={`p-8 ${theme.radius} border-2 border-dashed text-xl leading-[2.5] font-serif
                      ${personality === Personality.INTROVERT ? 'bg-slate-900/50 border-slate-700 text-slate-300' : 'bg-slate-50/80 border-slate-200 text-slate-700'}
                   `}>
                      <span>{currentExercise.beforeText}</span>
                      <span className="inline-block relative mx-2">
                        <select 
                          className={`appearance-none px-6 py-2 ${theme.radius} border-2 font-sans font-bold text-lg outline-none cursor-pointer transition-all shadow-sm
                            ${completedIds.has(currentExercise.id) 
                              ? 'border-green-500 bg-green-50 text-green-700 pr-10' 
                              : personality === Personality.INTROVERT 
                                ? 'bg-slate-800 border-indigo-500 text-indigo-300' 
                                : 'border-accent bg-white text-accent'
                          }`}
                          onChange={(e) => {
                            const opt = currentExercise.options.find(o => o.text === e.target.value);
                            if (opt) handleAnswer(opt.isCorrect);
                          }}
                          disabled={completedIds.has(currentExercise.id)}
                          value={completedIds.has(currentExercise.id) ? currentExercise.options.find(o => o.isCorrect)?.text : ""}
                        >
                          <option value="" disabled>Select...</option>
                          {currentExercise.options.map(opt => (
                            <option key={opt.id} value={opt.text}>{opt.text}</option>
                          ))}
                        </select>
                      </span>
                      <span>{currentExercise.afterText}</span>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     {currentExercise.options.map((option, idx) => (
                       <button 
                         key={option.id}
                         onClick={() => handleAnswer(option.isCorrect)}
                         disabled={completedIds.has(currentExercise.id)}
                         className={`w-full text-left p-5 ${theme.radius} border-2 transition-all flex items-center gap-5 group relative overflow-hidden
                           ${completedIds.has(currentExercise.id) 
                              ? option.isCorrect 
                                ? 'border-green-500 bg-green-50 text-green-800 shadow-none'
                                : 'opacity-50 grayscale'
                              : personality === Personality.INTROVERT
                                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500'
                                : 'border-slate-100 bg-white hover:border-accent hover:shadow-lg hover:-translate-y-1'
                           }
                         `}
                       >
                         <div className={`w-10 h-10 ${theme.radius} flex items-center justify-center text-sm font-bold transition-all duration-300
                            ${completedIds.has(currentExercise.id) && option.isCorrect 
                               ? 'bg-green-500 text-white' 
                               : personality === Personality.INTROVERT ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}
                         `}>
                           {String.fromCharCode(65 + idx)}
                         </div>
                         <span className={`flex-1 z-10 font-medium ${completedIds.has(currentExercise.id) && option.isCorrect ? 'font-bold' : ''}`}>
                           {option.text}
                         </span>
                       </button>
                     ))}
                   </div>
                 )}
              </div>

              {/* Feedback Toast */}
              {feedback && (
                <div className={`absolute bottom-0 left-0 right-0 p-5 text-center font-bold text-sm transform transition-all duration-500 animate-slide-up
                   ${feedback.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}
                `}>
                  <div className="flex items-center justify-center gap-2">
                    <i className={`fa-solid ${feedback.type === 'success' ? 'fa-check' : 'fa-xmark'} text-lg`}></i> 
                    <span>{feedback.msg}</span>
                  </div>
                </div>
              )}
           </div>

           {/* Navigation Controls */}
           <div className="flex justify-between items-center">
             <button 
                onClick={prevExercise} 
                disabled={currentIndex === 0} 
                className={`w-14 h-14 ${theme.radius} ${theme.buttonSecondary} flex items-center justify-center transition-all`}
             >
               <i className="fa-solid fa-arrow-left"></i>
             </button>
             <button 
                onClick={nextExercise} 
                disabled={currentIndex === currentList.length - 1} 
                className={`w-14 h-14 ${theme.radius} ${theme.buttonPrimary} flex items-center justify-center transition-all`}
             >
               <i className="fa-solid fa-arrow-right"></i>
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default InteractiveChartSlide;