
import React from 'react';
import { UserState, AppMode, Personality } from '../types';
import { LEVEL_THRESHOLD, THEME } from '../constants';

interface Props {
  userState: UserState;
  onModeChange: (mode: AppMode) => void;
  onPersonalityChange: (p: Personality) => void;
}

const GamificationBar: React.FC<Props> = ({ userState, onModeChange, onPersonalityChange }) => {
  const theme = THEME[userState.personality];
  const progress = (userState.xp % LEVEL_THRESHOLD) / LEVEL_THRESHOLD * 100;

  // Introvert styles are cleaner, Extrovert styles are wilder
  const containerClass = userState.personality === Personality.EXTROVERT
    ? "bg-orange-600 text-white shadow-xl border-b-4 border-orange-800"
    : userState.personality === Personality.INTROVERT
    ? "bg-slate-950 border-b border-slate-800 text-slate-300"
    : "glass-panel border-b border-white/20"; // Ambivert/Default

  return (
    <div className={`${containerClass} h-[88px] flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-500`}>
      
      {/* Controls Container */}
      <div className="flex items-center gap-10">
        
        {/* Personality Control */}
        <div className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-bold uppercase tracking-wider pl-1 ${userState.personality === Personality.EXTROVERT ? 'text-white/60' : 'text-slate-500'}`}>
             Matrix
          </span>
          <div className={`flex p-1 ${theme.radius} ${userState.personality === Personality.INTROVERT ? 'bg-slate-900 border border-slate-800' : 'bg-black/10 backdrop-blur-md'}`}>
            {Object.values(Personality).map((p) => (
              <button
                key={p}
                onClick={() => onPersonalityChange(p)}
                className={`px-4 py-2 text-xs font-bold ${theme.radius} transition-all duration-300 ${
                  userState.personality === p 
                    ? userState.personality === Personality.EXTROVERT ? 'bg-white text-orange-600 shadow-lg scale-110' : 
                      userState.personality === Personality.INTROVERT ? 'bg-slate-800 text-indigo-300 shadow-sm' : 'bg-white text-primary shadow-sm'
                    : 'text-current opacity-50 hover:opacity-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-col gap-1.5">
          <span className={`text-[10px] font-bold uppercase tracking-wider pl-1 ${userState.personality === Personality.EXTROVERT ? 'text-white/60' : 'text-slate-500'}`}>
            Mode
          </span>
          <div className={`flex items-center gap-2 p-1 ${theme.radius} ${userState.personality === Personality.INTROVERT ? 'bg-slate-900 border border-slate-800' : 'bg-black/10 backdrop-blur-md'}`}>
            {Object.values(AppMode).map((m) => {
              const isActive = userState.mode === m;
              let icon = "fa-graduation-cap";
              
              if (m === AppMode.TEACHER) icon = "fa-chalkboard-user";
              if (m === AppMode.KAHOOT) icon = "fa-bolt";
              if (m === AppMode.SIMULATION) icon = "fa-vr-cardboard";

              let activeStyle = "";
              if (userState.personality === Personality.EXTROVERT) {
                 activeStyle = isActive ? "bg-yellow-400 text-black shadow-[0_4px_0_rgba(0,0,0,0.2)] -translate-y-1" : "text-white/50 hover:text-white";
              } else if (userState.personality === Personality.INTROVERT) {
                 activeStyle = isActive ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300";
              } else {
                 activeStyle = isActive ? "bg-white text-primary shadow-md" : "text-slate-400 hover:bg-white/60";
              }

              return (
                <button
                  key={m}
                  onClick={() => onModeChange(m)}
                  className={`w-10 h-9 flex items-center justify-center transition-all duration-300 relative group ${theme.radius} ${activeStyle}`}
                  title={m}
                >
                  <i className={`fa-solid ${icon} ${isActive && userState.personality === Personality.EXTROVERT ? 'animate-bounce' : ''}`}></i>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Stats Container */}
      <div className="flex items-center gap-8">
        
        {/* XP Progress - Styling drastically changes */}
        <div className="flex flex-col items-end min-w-[200px]">
          <div className={`flex items-center justify-between w-full font-bold text-xs mb-1.5 px-1 ${theme.fontHead}`}>
            <span className="uppercase tracking-widest text-[10px] opacity-70">{theme.labels.level} {userState.level}</span>
            <span className={userState.personality === Personality.EXTROVERT ? 'text-yellow-300' : theme.accentColor}>
              {Math.floor(progress)}% {theme.labels.xp}
            </span>
          </div>
          <div className={`w-full h-3.5 ${userState.personality === Personality.INTROVERT ? 'bg-slate-800' : 'bg-black/10'} ${theme.radius} overflow-hidden`}>
            <div 
              className={`h-full bg-gradient-to-r ${theme.progressGradient} relative transition-all duration-1000 ease-out ${theme.radius}`} 
              style={{ width: `${progress}%` }}
            >
              {userState.personality === Personality.EXTROVERT && (
                 <div className="absolute inset-0 bg-white/30 animate-[pulse-fast_0.5s_infinite]"></div>
              )}
            </div>
          </div>
        </div>

        {/* Streak & Avatar */}
        <div className={`flex items-center gap-5 pl-8 border-l ${userState.personality === Personality.EXTROVERT ? 'border-white/20' : 'border-slate-200/20'}`}>
          <div className={`text-center group cursor-pointer ${userState.personality === Personality.EXTROVERT ? 'hover:scale-125 transition-transform' : ''}`}>
             <div className={`text-2xl font-black leading-none flex items-center justify-center gap-1 ${userState.personality === Personality.EXTROVERT ? 'text-white drop-shadow-md' : theme.textPrimary}`}>
               <i className={`fa-solid fa-fire text-lg ${userState.personality === Personality.EXTROVERT ? 'animate-bounce text-yellow-300' : 'text-orange-500'}`}></i> {userState.streak}
             </div>
             <div className="text-[9px] font-bold opacity-50 uppercase tracking-widest mt-1">{theme.labels.streak}</div>
          </div>

          <div className="relative group cursor-pointer">
            <div className={`w-12 h-12 ${theme.radius} ${userState.personality === Personality.EXTROVERT ? 'bg-yellow-400 border-4 border-white' : 'bg-gradient-to-br from-slate-700 to-slate-800'} flex items-center justify-center shadow-lg overflow-hidden`}>
               <i className={`fa-solid ${userState.personality === Personality.EXTROVERT ? 'fa-bolt text-2xl text-orange-600' : 'fa-user-astronaut text-xl text-white'}`}></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GamificationBar;