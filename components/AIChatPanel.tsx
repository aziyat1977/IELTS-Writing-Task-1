
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, AppMode, Personality } from '../types';
import { generateAIResponse } from '../services/geminiService';
import { THEME } from '../constants';

interface Props {
  mode: AppMode;
  personality: Personality;
  currentSlideTitle: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AIChatPanel: React.FC<Props> = ({ mode, personality, currentSlideTitle, isOpen, onToggle }) => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = THEME[personality];

  // Generate a customized welcome message based on persona
  const getWelcomeMessage = (m: AppMode, p: Personality, title: string) => {
    if (m === AppMode.SIMULATION) return `EXAMINER MODE ACTIVE. I am ready to grade your analysis of "${title}". Please begin.`;
    if (m === AppMode.KAHOOT) return `WELCOME TO THE QUIZ! 🚀 Topic: ${title}. Ready to play?`;
    
    if (p === Personality.EXTROVERT) return `HEY FAM! 🔥 Let's crush this task: "${title}"! Ready?! 🚀`;
    if (p === Personality.INTROVERT) return `Greetings. We shall now conduct a detailed analysis of "${title}". Please proceed when ready.`;
    
    return `Hello! Let's study "${title}" together. How can I help?`;
  };

  useEffect(() => {
    // Reset or contextualize when slide, mode, or personality changes
    setHistory([
      { 
        id: Date.now().toString(), 
        role: 'model', 
        text: getWelcomeMessage(mode, personality, currentSlideTitle)
      }
    ]);
  }, [currentSlideTitle, mode, personality]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history, loading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await generateAIResponse(input, history, mode, personality);
    
    setHistory(prev => [...prev, { id: Date.now().toString(), role: 'model', text: response }]);
    setLoading(false);
  };

  // Styles based on Mode
  const getHeaderStyle = () => {
    if (personality === Personality.INTROVERT) return 'bg-slate-950 border-b border-slate-800';
    if (personality === Personality.EXTROVERT) return 'bg-gradient-to-r from-orange-500 to-red-600';
    
    switch(mode) {
      case AppMode.KAHOOT: return 'bg-gradient-to-r from-kahoot-blue to-blue-600';
      case AppMode.SIMULATION: return 'bg-gradient-to-r from-purple-700 to-indigo-900';
      case AppMode.TEACHER: return 'bg-gradient-to-r from-primary to-slate-800';
      default: return 'bg-gradient-to-r from-secondary to-slate-700';
    }
  };

  // Minimized State
  if (!isOpen) {
    return (
      <div className={`h-full w-16 flex flex-col items-center py-6 shadow-xl z-30 transition-all duration-300 ${personality === Personality.INTROVERT ? 'bg-slate-900' : 'bg-white'}`}>
        <button 
          onClick={onToggle}
          className={`w-10 h-10 ${theme.radius} text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg mb-6 ${getHeaderStyle()}`}
          title="Open AI Chat"
        >
          <i className="fa-solid fa-robot"></i>
        </button>
        <div className="flex-1 w-full flex justify-center">
           <div className="writing-vertical-rl text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] rotate-180 cursor-pointer hover:text-accent transition-colors" onClick={onToggle}>
             AI Assistant Active
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full shadow-2xl w-[400px] relative transition-all duration-300 ${theme.fontBody} ${personality === Personality.INTROVERT ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`p-5 text-white shadow-lg z-10 ${getHeaderStyle()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 ${theme.radius} bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-inner`}>
               <i className={`fa-solid ${mode === AppMode.SIMULATION ? 'fa-user-tie' : 'fa-robot'} text-lg`}></i>
             </div>
             <div>
               <h3 className={`${theme.fontHead} font-bold text-lg leading-tight`}>Gemini</h3>
               <div className="flex items-center gap-1.5 opacity-80">
                  <span className={`w-1.5 h-1.5 rounded-full ${mode === AppMode.SIMULATION ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></span>
                  <span className="text-xs font-medium tracking-wide uppercase">
                    {mode === AppMode.SIMULATION ? 'Examiner' : 'Tutor'}
                  </span>
               </div>
             </div>
          </div>
          <button onClick={onToggle} className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin ${personality === Personality.INTROVERT ? 'bg-slate-900' : 'bg-slate-50'}`} ref={scrollRef}>
        
        {history.map((msg, idx) => {
          const isUser = msg.role === 'user';
          let bubbleClass = '';
          
          if (isUser) {
             if (personality === Personality.INTROVERT) bubbleClass = 'bg-indigo-700 text-white';
             else if (personality === Personality.EXTROVERT) bubbleClass = 'bg-black text-white shadow-[4px_4px_0_rgba(251,146,60,1)]';
             else bubbleClass = 'bg-accent text-white';
          } else {
             if (personality === Personality.INTROVERT) bubbleClass = 'bg-slate-800 text-slate-200 border border-slate-700';
             else if (personality === Personality.EXTROVERT) bubbleClass = 'bg-white text-slate-800 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)]';
             else bubbleClass = 'bg-white text-slate-700 border border-slate-100 shadow-sm';
          }

          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`max-w-[85%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                
                <div className={`px-5 py-3.5 text-sm leading-relaxed relative group ${theme.radius} ${bubbleClass}
                  ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'}
                `}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                  ))}
                </div>
                
                <span className="text-[10px] text-slate-400 mt-1.5 px-1 opacity-50 font-medium">
                  {isUser ? 'You' : 'Gemini'}
                </span>
              </div>
            </div>
          );
        })}
        
        {loading && (
           <div className="flex justify-start animate-slide-up">
             <div className={`${theme.radius} rounded-tl-none px-5 py-4 flex gap-2 items-center
                ${personality === Personality.INTROVERT ? 'bg-slate-800' : 'bg-white shadow-sm border border-slate-100'}
             `}>
               <span className="text-xs font-bold text-slate-400 mr-2">Thinking</span>
               <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${personality === Personality.INTROVERT ? 'bg-indigo-400' : 'bg-accent'}`}></div>
               <div className={`w-1.5 h-1.5 rounded-full animate-bounce delay-75 ${personality === Personality.INTROVERT ? 'bg-indigo-400' : 'bg-accent'}`}></div>
               <div className={`w-1.5 h-1.5 rounded-full animate-bounce delay-150 ${personality === Personality.INTROVERT ? 'bg-indigo-400' : 'bg-accent'}`}></div>
             </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${personality === Personality.INTROVERT ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="relative shadow-sm">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={mode === AppMode.SIMULATION ? "Enter analysis..." : "Ask me anything..."}
            className={`w-full pl-5 pr-12 py-3.5 ${theme.radius} text-sm focus:outline-none focus:ring-2 transition-all
              ${personality === Personality.INTROVERT 
                 ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-indigo-500/50 focus:border-indigo-500' 
                 : 'bg-slate-50 border-slate-200 focus:bg-white focus:ring-accent/20 focus:border-accent'}
            `}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`absolute right-2 top-2 w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-50
              ${personality === Personality.INTROVERT ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-primary text-white hover:bg-accent'}
            `}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin text-xs"></i> : <i className="fa-solid fa-paper-plane text-xs"></i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;