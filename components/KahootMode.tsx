
import React, { useState, useEffect } from 'react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion } from '../types';

interface Props {
  topic: string;
  onCorrect: () => void;
  onIncorrect: () => void;
  onClose: () => void;
}

const KahootMode: React.FC<Props> = ({ topic, onCorrect, onIncorrect, onClose }) => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const fetchQuiz = async () => {
      const jsonStr = await generateQuiz(topic);
      try {
        if (!jsonStr) throw new Error("Empty response");
        const q = JSON.parse(jsonStr);
        setQuestion(q);
        setLoading(false);
      } catch (e) {
        console.warn("Failed to parse quiz JSON, using fallback:", e);
        // Fallback
        setQuestion({
          question: "Which academic verb implies a rapid decrease?",
          options: ["Plummeted", "Rocketed", "Soared", "Plateaued"],
          correctIndex: 0,
          explanation: "'Plummet' means to fall straight down at high speed."
        });
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic]);

  useEffect(() => {
    if (loading || answered !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAnswered(-1); // Time out
          onIncorrect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, answered]);

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === question?.correctIndex) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  // Loading State
  if (loading) return (
    <div className="absolute inset-0 z-50 bg-primary flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
      <div className="text-6xl font-fun font-bold animate-bounce mb-8 tracking-widest text-shadow-lg">GET READY</div>
      <div className="w-24 h-24 border-8 border-accent border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-8 font-bold text-accent text-xl animate-pulse">Generating AI Challenge...</p>
    </div>
  );

  if (!question) return null;

  return (
    <div className="absolute inset-0 z-50 bg-primary flex flex-col p-6 overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>
       </div>

       {/* Top Bar */}
       <div className="w-full flex justify-between items-center text-white relative z-10 mb-8">
          <div className="flex items-center gap-4">
             <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl border-4 border-white/20
               ${timeLeft < 5 ? 'bg-red-500 animate-ping' : 'bg-purple-600'}
             `}>
               {answered === null ? timeLeft : <i className="fa-solid fa-flag-checkered"></i>}
             </div>
             <div className="text-sm font-bold opacity-70 uppercase tracking-widest">Seconds Remaining</div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 text-4xl">
            <i className="fa-solid fa-xmark"></i>
          </button>
       </div>

       {/* Question Area */}
       <div className="bg-white text-primary px-12 py-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-5xl mx-auto text-center relative z-10 animate-slide-up mb-8 border-b-8 border-slate-200">
         <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">{question.question}</h2>
       </div>

       {/* Options Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto flex-1 relative z-10 pb-12">
          {question.options.map((opt, idx) => {
            let bgClass = '';
            let shadowClass = '';
            let icon = '';
            
            if (idx === 0) { bgClass = 'bg-kahoot-red'; shadowClass = 'shadow-[0_8px_0_#9f122a]'; icon = 'fa-play'; }
            else if (idx === 1) { bgClass = 'bg-kahoot-blue'; shadowClass = 'shadow-[0_8px_0_#0d4890]'; icon = 'fa-diamond'; }
            else if (idx === 2) { bgClass = 'bg-kahoot-yellow'; shadowClass = 'shadow-[0_8px_0_#976e00]'; icon = 'fa-circle'; }
            else { bgClass = 'bg-kahoot-green'; shadowClass = 'shadow-[0_8px_0_#1a5f08]'; icon = 'fa-square'; }

            const isCorrect = idx === question.correctIndex;
            const isSelected = idx === answered;

            // Post-answer state
            if (answered !== null) {
              if (isCorrect) {
                bgClass = 'bg-green-500 scale-105 z-20 ring-4 ring-white';
                shadowClass = 'shadow-[0_10px_20px_rgba(0,255,0,0.4)]';
              } else if (isSelected) {
                 bgClass = 'bg-red-500 opacity-80';
                 shadowClass = '';
              } else {
                 bgClass = 'bg-slate-700 opacity-20 grayscale';
                 shadowClass = '';
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={answered !== null}
                className={`${bgClass} ${shadowClass} rounded-2xl text-white font-bold text-2xl transition-all active:translate-y-2 active:shadow-none flex items-center p-8 relative overflow-hidden group h-full`}
              >
                {/* Background Shape */}
                <i className={`fa-solid ${icon} absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:scale-110 transition-transform`}></i>
                
                <div className="w-12 h-12 flex items-center justify-center mr-6 border-2 border-white/30 rounded-full text-xl flex-shrink-0">
                   <i className={`fa-solid ${icon}`}></i>
                </div>
                <span className="text-left leading-tight drop-shadow-md">{opt}</span>

                {answered !== null && isCorrect && (
                   <div className="absolute top-4 right-4 bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center animate-bounce">
                      <i className="fa-solid fa-check"></i>
                   </div>
                )}
              </button>
            )
          })}
       </div>

       {/* Explanation / Result Overlay */}
       {answered !== null && (
         <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-scale-in p-6">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full text-center shadow-2xl border-4 border-white">
               <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-4 ${answered === question.correctIndex ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                 <i className={`fa-solid ${answered === question.correctIndex ? 'fa-trophy' : 'fa-face-dizzy'}`}></i>
               </div>
               <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter text-primary">
                 {answered === question.correctIndex ? "Correct Answer!" : "Wrong Answer!"}
               </h3>
               <div className="w-full h-1 bg-slate-100 my-4 rounded-full"></div>
               <p className="text-lg text-slate-600 font-serif leading-relaxed mb-8">
                 {question.explanation}
               </p>
               <button onClick={onClose} className="bg-primary text-white text-xl font-bold px-10 py-4 rounded-full shadow-lg hover:bg-accent hover:scale-105 transition-all">
                 Next Challenge <i className="fa-solid fa-arrow-right ml-2"></i>
               </button>
            </div>
         </div>
       )}
    </div>
  );
};

export default KahootMode;
