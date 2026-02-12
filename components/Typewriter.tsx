
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ToolKey {
  label: string;
  icon?: string;
  emoji?: string;
  color: string;
  content: string[];
}

const TOOLS: ToolKey[] = [
  { 
    label: 'Novidea', 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Webflow_logo.svg', 
    color: '#0055FF',
    content: [
      "PRODUCT DESIGNER @ NOVIDEA",
      "CORE: INSURANCE PRODUCT INNOVATION",
      "REDESIGNING COMPLEX SYSTEM PROCESSES",
      "IMPROVING OPERATIONAL EFFICIENCY"
    ]
  },
  { 
    label: 'Triola', 
    emoji: '🎓',
    color: '#FF3366',
    content: [
      "LECTURER @ TRIOLA ACADEMY",
      "TEACHING PRACTICAL UX METHODOLOGIES",
      "TEAMWORK & REAL-WORLD CYCLES"
    ]
  },
  { 
    label: 'AvaTrade', 
    icon: 'https://www.vectorlogo.zone/logos/tradingview/tradingview-icon.svg',
    color: '#31A8FF',
    content: [
      "UX DESIGNER @ AVATRADE",
      "PARTNERING WITH PRODUCT MANAGERS",
      "ENSURING SMOOTH EXECUTION"
    ]
  },
  { 
    label: 'Figma', 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    color: '#F24E1E',
    content: ["ARNON FRIEDMAN // DESIGN LEADER", "CRAFTING SCALABLE DESIGN SYSTEMS"]
  },
  { 
    label: 'Xd', 
    icon: 'https://www.vectorlogo.zone/logos/adobe_xd/adobe_xd-icon.svg',
    color: '#FF61F6',
    content: ["PROTOTYPING_LOG", "HIGH_FIDELITY_FLOWS", "INTERACTIVE_SPECS"]
  },
  { 
    label: 'Ps', 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
    color: '#31A8FF',
    content: ["PIXEL_CRAFT", "VISUAL_STORYTELLING", "DIGITAL_IMAGERY"]
  },
  { 
    label: 'Ae', 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    color: '#CF96FD',
    content: ["MOTION_SYSTEMS", "UI_CHOREOGRAPHY"]
  },
  { 
    label: 'Framer', 
    icon: 'https://www.vectorlogo.zone/logos/framer/framer-icon.svg',
    color: '#0055FF',
    content: ["INTERACTIVE_CANVAS", "DESIGN_TO_PRODUCTION"]
  },
  { 
    label: 'Elementor', 
    icon: 'https://www.vectorlogo.zone/logos/elementor/elementor-icon.svg',
    color: '#92003B',
    content: ["LAYOUT_EFFICIENCY", "VISUAL_BUILDING"]
  },
  { 
    label: 'Strategy', 
    emoji: '🧠',
    color: '#8B5CF6',
    content: ["COGNITIVE_UX", "USER_RESEARCH", "BEHAVIORAL_LOGIC"]
  },
  { 
    label: 'Collab', 
    emoji: '🤝',
    color: '#F59E0B',
    content: ["CROSS_TEAM_SYNC", "STAKEHOLDER_ALIGN"]
  }
];

export const Typewriter: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [lastLabel, setLastLabel] = useState<string | null>(null);
  
  const audioContext = useRef<AudioContext | null>(null);

  const playClick = useCallback((type: 'down' | 'up' = 'down') => {
    try {
      if (!audioContext.current) audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioContext.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      const freq = type === 'down' ? 120 : 260;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }, []);

  const handleKeyClick = (tool: ToolKey) => {
    if (tool.label === lastLabel) return;
    
    setPressedKey(tool.label);
    setLastLabel(tool.label);
    playClick('down');
    
    setQueue(prev => [...prev, "---", ...tool.content]);
    
    setTimeout(() => {
      setPressedKey(null);
      playClick('up');
    }, 100);
  };

  useEffect(() => {
    if (!isTyping && queue.length > 0) {
      const nextLine = queue[0];
      setQueue(prev => prev.slice(1));
      setIsTyping(true);
      
      setTimeout(() => {
        setLines(prev => [...prev, nextLine]);
        playClick('down');
        setIsTyping(false);
      }, 80); 
    }
  }, [queue, isTyping, playClick]);

  const hasContent = lines.length > 0;

  return (
    <div className="relative w-full max-w-[480px] h-[600px] flex flex-col items-center justify-end overflow-visible">
      
      {/* 1. PAPER OUTPUT - Grows Upwards and can exit top */}
      <div className="absolute bottom-40 w-full flex flex-col items-center justify-end h-[800px] pointer-events-none">
        <div 
          className={`
            w-[82%] bg-[#FAF9F6] border-x border-t border-stone-200/60 rounded-t-sm relative flex flex-col py-8 px-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${hasContent ? 'shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)]' : 'shadow-none'}
          `}
          style={{ 
            height: hasContent ? 'auto' : '0px',
            transform: hasContent ? 'translateY(10px)' : 'translateY(100px)',
            maxHeight: 'none', // Allow it to grow freely
          }}
        >
          {/* Paper Texture */}
          <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none"></div>
          
          <div className="w-full flex flex-col gap-2 font-serif text-[12px] md:text-[13px] text-stone-800 tracking-wide leading-relaxed">
            {lines.map((line, idx) => (
              <p key={idx} className={`opacity-70 mix-blend-multiply italic animate-fade-in-quick ${line === '---' ? 'text-stone-300' : ''}`}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MACHINE BODY */}
      <div className="relative z-20 w-full mb-0">
        {/* Metal Slot Rim */}
        <div className="w-full h-10 bg-gradient-to-b from-stone-200 to-stone-300 rounded-xl shadow-lg border border-stone-400/30 flex items-center justify-between px-8 relative overflow-hidden">
          <div className="w-full h-[1.5px] bg-black/20 rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.7)]"></div>
          
          <button 
            onClick={() => { setLines([]); setQueue([]); setLastLabel(null); setIsTyping(false); playClick('down'); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-sm pointer-events-auto"
            title="Wipe Print Memory"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

        {/* Main Chassis */}
        <div className="w-full bg-[#EAEAEA] border-t border-stone-300 mt-[-18px] rounded-b-[45px] shadow-[0_50px_130px_-40px_rgba(0,0,0,0.22)] pt-16 pb-14 px-8 md:px-10 flex flex-col items-center relative">
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
             <span className="font-serif italic text-stone-400/40 text-[9px] tracking-[1.2em] uppercase select-none">
                System_Log_Unit
             </span>
          </div>

          {/* 3. KEYBOARD GRID */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 w-full justify-items-center mt-4">
            {TOOLS.map((tool) => (
              <button
                key={tool.label}
                onMouseDown={() => handleKeyClick(tool)}
                title={tool.label}
                className={`
                  relative w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-150 group
                  ${pressedKey === tool.label 
                    ? 'bg-stone-200 translate-y-1 shadow-inner scale-95' 
                    : 'bg-white shadow-[0_6px_14px_-5px_rgba(0,0,0,0.18),inset_0_1px_1px_white] border border-stone-200/50 hover:bg-stone-50 hover:-translate-y-1 active:translate-y-1'}
                `}
              >
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.08] transition-opacity pointer-events-none" 
                  style={{ backgroundColor: tool.color }}
                ></div>

                {tool.icon ? (
                  <img 
                    src={tool.icon} 
                    className={`w-6 h-6 md:w-7 md:h-7 object-contain transition-all pointer-events-none ${pressedKey === tool.label ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} 
                    alt={tool.label} 
                  />
                ) : (
                  <span className={`text-xl md:text-2xl transition-all pointer-events-none ${pressedKey === tool.label ? 'scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'}`}>
                    {tool.emoji}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="mt-12 flex items-center gap-3 bg-stone-900/5 px-5 py-2 rounded-full border border-black/5">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isTyping ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)] animate-pulse' : 'bg-stone-300'}`}></div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Mechanical_Buffer</span>
          </div>
        </div>

        {/* Shadow Overlay */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/10 blur-3xl rounded-full -z-10"></div>
      </div>

      <style>{`
        @keyframes fade-in-quick {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 0.7; transform: translateY(0); }
        }
        .animate-fade-in-quick {
          animation: fade-in-quick 0.35s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
