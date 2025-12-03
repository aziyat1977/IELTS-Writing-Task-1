
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GamificationBar from './components/GamificationBar';
import AIChatPanel from './components/AIChatPanel';
import InteractiveChartSlide from './components/slides/InteractiveChartSlide';
import TheorySlide from './components/slides/TheorySlide';
import KahootMode from './components/KahootMode';
import { SLIDES, LEVEL_THRESHOLD, THEME } from './constants';
import { AppMode, Personality, UserState } from './types';

const App: React.FC = () => {
  const [activeSlideId, setActiveSlideId] = useState(0);
  const [userState, setUserState] = useState<UserState>({
    xp: 0,
    level: 1,
    streak: 3,
    mode: AppMode.STUDENT,
    personality: Personality.INTROVERT, // Default to Introvert as requested
    completedSlides: []
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const currentSlide = SLIDES.find(s => s.id === activeSlideId) || SLIDES[0];
  const theme = THEME[userState.personality];

  const handleXP = (amount: number) => {
    setUserState(prev => {
      const newXP = prev.xp + amount;
      let updatedCompleted = prev.completedSlides;
      if (amount >= 10 && !prev.completedSlides.includes(activeSlideId)) {
        updatedCompleted = [...prev.completedSlides, activeSlideId];
      }
      return {
        ...prev,
        xp: newXP,
        level: Math.floor(newXP / LEVEL_THRESHOLD) + 1,
        completedSlides: updatedCompleted
      };
    });

    if (amount > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const getSlideData = () => {
    if (currentSlide.type === 'process') return currentSlide.processData;
    if (currentSlide.type === 'map') return currentSlide.mapData;
    return currentSlide.chartData;
  };

  return (
    <div className={`flex h-screen ${theme.appBg} ${theme.textPrimary} ${theme.fontBody} overflow-hidden transition-colors duration-700`}>
      
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 z-30">
        <Sidebar 
          activeSlide={activeSlideId} 
          onNavigate={setActiveSlideId} 
          personality={userState.personality}
          completedSlides={userState.completedSlides}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <GamificationBar 
          userState={userState} 
          onModeChange={(m) => setUserState(prev => ({ ...prev, mode: m }))}
          onPersonalityChange={(p) => setUserState(prev => ({ ...prev, personality: p }))}
        />

        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 flex justify-center items-start pt-20">
            <div className="text-6xl animate-bounce">🎉</div>
            <div className="text-6xl animate-bounce delay-100">✨</div>
            {userState.personality === Personality.EXTROVERT && (
               <div className="text-8xl animate-ping absolute top-1/3">🔥</div>
            )}
          </div>
        )}

        <main className={`flex-1 relative overflow-hidden ${theme.mainBg} transition-all duration-700`}>
          {userState.mode === AppMode.KAHOOT && (
            <KahootMode 
              topic={currentSlide.title} 
              onCorrect={() => handleXP(50)}
              onIncorrect={() => handleXP(5)}
              onClose={() => setUserState(prev => ({ ...prev, mode: AppMode.STUDENT }))}
            />
          )}

          {currentSlide.type === 'theory' ? (
            <TheorySlide 
              slide={currentSlide}
              onComplete={() => handleXP(10)}
              isCompleted={userState.completedSlides.includes(activeSlideId)}
              personality={userState.personality}
            />
          ) : (
            <InteractiveChartSlide 
              type={currentSlide.type as 'chart' | 'map' | 'process'}
              data={getSlideData()}
              title={currentSlide.title}
              onAction={() => handleXP(20)}
              personality={userState.personality}
            />
          )}
        </main>
      </div>

      {/* AI Panel */}
      <div className={`flex-shrink-0 z-30 h-full border-l transition-all duration-300 ease-in-out ${isChatOpen ? 'w-[400px]' : 'w-14'} 
         ${userState.personality === Personality.INTROVERT ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
        <AIChatPanel 
          mode={userState.mode} 
          personality={userState.personality}
          currentSlideTitle={currentSlide.title}
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
        />
      </div>

    </div>
  );
};

export default App;
