
import React, { useState, useMemo } from 'react';
import { SLIDES, THEME } from '../constants';
import { Personality } from '../types';

interface Props {
  activeSlide: number;
  onNavigate: (id: number) => void;
  personality: Personality;
  completedSlides: number[];
}

const Sidebar: React.FC<Props> = ({ activeSlide, onNavigate, personality, completedSlides }) => {
  const theme = THEME[personality];

  // Group slides by category
  const categories = useMemo(() => {
    const groups: { [key: string]: typeof SLIDES } = {};
    SLIDES.forEach(slide => {
      if (!groups[slide.category]) groups[slide.category] = [];
      groups[slide.category].push(slide);
    });
    return Object.entries(groups);
  }, []);

  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map(([cat]) => cat)
  );

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <aside className={`h-full flex flex-col transition-all duration-500 relative overflow-hidden ${theme.sidebarBg} ${theme.fontBody}`}>
      
      {/* Brand Header */}
      <div className={`p-8 border-b border-white/10 relative overflow-hidden group ${personality === Personality.EXTROVERT ? 'text-white' : 'text-slate-200'}`}>
        {personality === Personality.EXTROVERT && (
          <div className="absolute top-0 right-0 p-4 opacity-10 animate-pulse">
             <i className="fa-solid fa-bolt text-9xl"></i>
          </div>
        )}
        
        <h1 className={`${theme.fontHead} text-2xl font-bold tracking-wide relative z-10 flex items-center gap-3`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-lg ${personality === Personality.INTROVERT ? 'bg-indigo-500 text-white' : personality === Personality.EXTROVERT ? 'bg-white text-orange-600 rotate-12' : 'bg-accent text-primary'}`}>
             <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <span className="tracking-tight">IELTS<span className={personality === Personality.INTROVERT ? 'text-indigo-400' : 'text-current'}>.AI</span></span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] mt-3 opacity-60 relative z-10 pl-11 font-bold">
          {personality === Personality.EXTROVERT ? 'Hype Edition ⚡️' : 'Masterclass v2.0'}
        </p>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
        {categories.map(([category, slides]) => {
          const isExpanded = expandedCategories.includes(category);
          
          return (
            <div key={category} className="select-none">
              <button 
                onClick={() => toggleCategory(category)}
                className={`flex items-center justify-between w-full text-[11px] font-bold uppercase tracking-[0.2em] mb-4 px-2 transition-colors group ${
                  personality === Personality.EXTROVERT ? 'text-white/80 hover:text-white' : 
                  isExpanded ? 'text-indigo-300' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>{category}</span>
                <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 opacity-50 group-hover:opacity-100 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}></i>
              </button>

              <div className={`space-y-2 transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {slides.map((slide) => {
                  const isActive = activeSlide === slide.id;
                  const isCompleted = completedSlides.includes(slide.id);

                  let activeClass = '';
                  let inactiveClass = '';

                  if (personality === Personality.INTROVERT) {
                    activeClass = 'bg-slate-800 text-indigo-300 border-l-2 border-indigo-400 pl-3';
                    inactiveClass = 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200';
                  } else if (personality === Personality.EXTROVERT) {
                    activeClass = 'bg-white text-orange-600 shadow-[4px_4px_0_rgba(0,0,0,0.2)] -translate-y-1 font-black transform scale-105';
                    inactiveClass = 'text-white/70 hover:bg-black/10 hover:text-white';
                  } else {
                    activeClass = 'bg-gradient-to-r from-accent/90 to-orange-600 text-white shadow-lg shadow-orange-500/20 translate-x-1 border-white/10';
                    inactiveClass = 'hover:bg-white/5 hover:text-white hover:border-white/5 text-slate-400';
                  }

                  return (
                    <button
                      key={slide.id}
                      onClick={() => onNavigate(slide.id)}
                      className={`w-full text-left px-4 py-3.5 ${theme.radius} flex items-center gap-3.5 transition-all duration-200 relative group overflow-hidden ${isActive ? activeClass : inactiveClass}`}
                    >
                      <i className={`fa-solid ${slide.icon} w-5 text-center text-sm transition-colors ${isActive ? '' : 'opacity-70'}`}></i>
                      
                      <span className={`text-[13px] font-medium flex-1 truncate ${isActive ? 'font-bold tracking-wide' : ''}`}>
                        {slide.title}
                      </span>

                      {isCompleted && (
                        <i className={`fa-solid fa-circle-check text-xs ${personality === Personality.EXTROVERT ? 'text-yellow-300' : 'text-green-500'}`}></i>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / User Profile */}
      <div className={`p-4 mx-4 mb-4 backdrop-blur-md border-t border-white/5 relative overflow-hidden ${theme.radius} ${personality === Personality.INTROVERT ? 'bg-slate-800/50' : 'bg-black/10'}`}>
        <div className="flex items-center gap-3 relative z-10">
          <div className={`w-10 h-10 ${theme.radius} flex items-center justify-center text-lg shadow-lg ring-1 ring-white/10
            ${personality === Personality.EXTROVERT ? 'bg-yellow-400 text-black animate-bounce' : 
              personality === Personality.INTROVERT ? 'bg-slate-700 text-indigo-300' : 'bg-gradient-to-br from-purple-400 to-pink-500 text-white'
            }`}>
            {personality === Personality.EXTROVERT ? '🦁' : personality === Personality.INTROVERT ? '🦉' : '🦄'}
          </div>
          <div>
            <p className={`text-[9px] uppercase font-bold tracking-wider ${personality === Personality.EXTROVERT ? 'text-white/70' : 'text-slate-500'}`}>Persona</p>
            <p className={`text-sm font-bold tracking-wide ${personality === Personality.EXTROVERT ? 'text-white' : 'text-slate-200'}`}>{personality}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;