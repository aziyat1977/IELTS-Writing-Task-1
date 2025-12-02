
import React from 'react';
import { SlideData, Personality } from '../../types';
import { THEME } from '../../constants';

interface Props {
  slide: SlideData;
  onComplete: () => void;
  isCompleted: boolean;
  personality: Personality;
}

const TheorySlide: React.FC<Props> = ({ slide, onComplete, isCompleted, personality }) => {
  const theme = THEME[personality];
  
  const titleClass = theme.textPrimary;
  const subTitleClass = personality === Personality.INTROVERT ? 'text-indigo-400' : 'text-accent';
  const bodyClass = theme.textSecondary;
  const cardClass = theme.cardBg;
  const radius = theme.radius;

  // Helper styles based on highlight type
  const getHighlightStyle = (type: string) => {
    switch(type) {
      case 'warning': return 'bg-red-50 text-red-700 border-red-200';
      case 'vocab': return 'bg-green-50 text-green-700 border-green-200';
      case 'tip': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12 scrollbar-thin">
       <div className="max-w-4xl mx-auto pb-10">
         
         {/* Slide Header */}
         <div className="flex items-center gap-4 mb-8 animate-slide-up">
            <div className={`w-14 h-14 flex-shrink-0 ${radius} flex items-center justify-center text-2xl shadow-lg 
               ${personality === Personality.INTROVERT ? 'bg-indigo-900 text-indigo-300' : 'bg-primary text-white'}
            `}>
              <i className={`fa-solid ${slide.icon}`}></i>
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${theme.fontHead} ${titleClass}`}>{slide.title}</h1>
              <span className={`font-bold uppercase tracking-widest text-xs ${subTitleClass}`}>{slide.category}</span>
            </div>
         </div>

         {/* Sections Renderer */}
         <div className="space-y-6">
            {slide.sections?.map((section, idx) => (
              <div 
                key={idx} 
                className={`p-8 border ${radius} ${cardClass} animate-slide-up`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className={`text-xl font-bold mb-3 ${titleClass} flex items-center gap-2`}>
                  {section.heading}
                </h3>
                
                <p className={`leading-relaxed text-lg mb-4 ${bodyClass}`}>
                  {section.body}
                </p>

                {/* Bullets */}
                {section.bullets && (
                  <ul className="space-y-2 mb-4">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={`flex items-start gap-3 ${bodyClass}`}>
                        <i className={`fa-solid fa-check mt-1.5 text-sm ${personality === Personality.INTROVERT ? 'text-indigo-500' : 'text-green-500'}`}></i>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Example Box */}
                {section.example && (
                  <div className={`mt-4 p-5 rounded-lg border-l-4 ${personality === Personality.INTROVERT ? 'bg-slate-900 border-indigo-500' : 'bg-slate-50 border-accent'}`}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">{section.example.label}</div>
                    <div className={`font-serif italic text-lg ${titleClass}`}>"{section.example.text}"</div>
                    {section.example.subtext && (
                      <div className={`mt-2 text-sm ${bodyClass}`}>{section.example.subtext}</div>
                    )}
                  </div>
                )}

                {/* Highlights (Tip/Warning) */}
                {section.highlight && (
                  <div className={`mt-4 p-4 rounded-lg border flex items-center gap-4 ${getHighlightStyle(section.highlight.type)}`}>
                    <i className={`text-xl fa-solid ${
                      section.highlight.type === 'warning' ? 'fa-triangle-exclamation' : 
                      section.highlight.type === 'vocab' ? 'fa-book' : 'fa-lightbulb'
                    }`}></i>
                    <span className="font-bold text-sm">{section.highlight.text}</span>
                  </div>
                )}
              </div>
            ))}
         </div>

         {/* Completion Footer */}
         <div className="mt-8 flex justify-end">
            <button 
              className={`px-8 py-4 font-bold transition-all transform hover:scale-105 flex items-center gap-3 ${radius}
                ${isCompleted 
                  ? 'bg-green-100 text-green-700 cursor-default opacity-50' 
                  : theme.buttonPrimary}`
              }
              onClick={onComplete}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <>Completed <i className="fa-solid fa-check"></i></>
              ) : (
                <>{theme.labels.completeBtn} <span className="opacity-70 text-xs ml-1">(+10 XP)</span></>
              )}
            </button>
         </div>

       </div>
    </div>
  );
};

export default TheorySlide;
