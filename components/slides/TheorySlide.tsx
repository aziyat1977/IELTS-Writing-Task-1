
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
  
  // Dynamic text classes based on theme
  const titleClass = theme.textPrimary;
  const subTitleClass = personality === Personality.INTROVERT ? 'text-indigo-400' : 'text-accent';
  const bodyClass = theme.textSecondary;
  const highlightBoxClass = personality === Personality.INTROVERT ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm';

  const renderContent = () => {
    switch (slide.id) {
      case 0: // Course Intro
        return (
          <div className="space-y-8 animate-slide-up">
            <div className={`p-6 rounded-2xl border ${personality === Personality.INTROVERT ? 'bg-indigo-900/30 border-indigo-800' : 'bg-blue-50 border-blue-100'}`}>
              <h3 className={`text-xl font-bold mb-2 ${personality === Personality.INTROVERT ? 'text-indigo-200' : 'text-blue-900'}`}>Welcome to the Masterclass</h3>
              <p className={`leading-relaxed ${personality === Personality.INTROVERT ? 'text-indigo-200/80' : 'text-blue-800/80'}`}>
                This course is designed around the <strong>official band descriptors</strong>. Our goal is to move you from a Band 6.0 "Descriptive" style to a Band 8.0+ "Analytical" style.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl border ${highlightBoxClass}`}>
                <i className={`fa-solid fa-clock text-3xl mb-4 ${theme.accentColor}`}></i>
                <h4 className={`font-bold mb-2 ${titleClass}`}>Timing Strategy</h4>
                <p className={`text-sm ${bodyClass}`}>You have 20 minutes. Spend 3-4 minutes planning and 15 minutes writing.</p>
              </div>
              <div className={`p-6 rounded-2xl border ${highlightBoxClass}`}>
                <i className={`fa-solid fa-pen-ruler text-3xl mb-4 ${theme.accentColor}`}></i>
                <h4 className={`font-bold mb-2 ${titleClass}`}>Word Count</h4>
                <p className={`text-sm ${bodyClass}`}>Minimum 150 words. Ideal: 160-180 words. Quality over quantity.</p>
              </div>
            </div>
          </div>
        );

      case 1: // The 4 Pillars
        return (
          <div className="space-y-8 animate-slide-up">
             <p className={`lead text-lg font-light ${bodyClass}`}>To score Band 7+, you must satisfy the four marking criteria equally.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: "1. Task Achievement", sub: "Content", color: "purple", desc: "Cover all requirements. Clear Overview." },
                 { title: "2. Coherence & Cohesion", sub: "Organization", color: "blue", desc: "Logical paragraphing. Natural linkers." },
                 { title: "3. Lexical Resource", sub: "Vocabulary", color: "green", desc: "Precision over complexity. Collocations." },
                 { title: "4. Grammatical Range", sub: "Grammar", color: "orange", desc: "Mix of simple/complex sentences. Accuracy." }
               ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-2xl border-l-4 border-${item.color}-500 ${highlightBoxClass}`}>
                    <h3 className={`text-lg font-bold mb-1 ${titleClass}`}>{item.title}</h3>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-3 text-${item.color}-600`}>{item.sub}</p>
                    <p className={`text-sm ${bodyClass}`}>{item.desc}</p>
                  </div>
               ))}
             </div>
          </div>
        );

      default:
        return <div className={bodyClass}>Content loading...</div>;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-8 md:p-12 scrollbar-thin">
       <div className="max-w-4xl mx-auto">
         {/* Header */}
         <div className="flex items-center gap-4 mb-8">
            <div className={`w-14 h-14 ${theme.radius} flex items-center justify-center text-2xl shadow-lg 
               ${personality === Personality.INTROVERT ? 'bg-indigo-900 text-indigo-300' : 'bg-primary text-white'}
            `}>
              <i className={`fa-solid ${slide.icon}`}></i>
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${theme.fontHead} ${theme.textPrimary}`}>{slide.title}</h1>
              <span className={`font-bold uppercase tracking-widest text-xs ${subTitleClass}`}>{slide.category}</span>
            </div>
         </div>

         {/* Dynamic Content */}
         <div className={`p-8 ${theme.radius} ${theme.cardBg} max-w-none mb-8`}>
            {renderContent()}

            <hr className={`my-8 ${personality === Personality.INTROVERT ? 'border-slate-700' : 'border-slate-100'}`} />
            
            <div className="flex justify-end">
              <button 
                className={`px-8 py-4 font-bold transition-all transform hover:scale-105 flex items-center gap-3 ${theme.radius}
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
    </div>
  );
};

export default TheorySlide;