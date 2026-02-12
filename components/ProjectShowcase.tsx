
import React, { useEffect, useRef, useState } from 'react';

interface Metric {
  label: string;
  value: string;
}

interface ProjectShowcaseProps {
  id: string;
  category: string;
  title: string[]; 
  description: string;
  metaphor: string;
  bgColor: string;
  accentColor: string;
  metrics: Metric[];
  mockupContent: React.ReactNode;
  footerCredit: string;
  onViewCaseStudy?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  id,
  category,
  title,
  description,
  metaphor,
  bgColor,
  accentColor,
  metrics,
  mockupContent,
  footerCredit,
  onViewCaseStudy,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 0.9 + (scrollProgress * 0.1);
  const borderRadius = 60 * (1 - scrollProgress);
  const contentOpacity = Math.min(Math.max((scrollProgress - 0.1) / 0.5, 0), 1);

  return (
    <section 
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center transition-colors duration-1000 snap-section"
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className="relative w-full h-full flex flex-col px-6 md:px-16 py-12 md:py-20 transition-all duration-300 ease-out"
        style={{ 
          transform: `scale(${scale})`,
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden'
        }}
      >
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-black"></div>
        </div>

        <div 
          className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between"
          style={{ opacity: contentOpacity, transform: `translateY(${(1 - contentOpacity) * 20}px)` }}
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center h-full">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-6 h-[1.5px]" style={{ backgroundColor: accentColor }}></div>
                 <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] font-mono">{category}</span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-[90px] font-display font-black text-white leading-[0.85] tracking-tighter mb-6">
                <span className="block title-shine">{title[0]}</span>
                <span className="flex items-center gap-4 title-shine">
                   {title[1]}
                   <div className="w-10 h-1.5 md:w-16 md:h-2 rounded-full mt-2" style={{ backgroundColor: accentColor }}></div>
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white font-sans font-light mb-4 italic opacity-80">
                "{metaphor}"
              </p>
              
              <p className="text-white/40 text-xs md:text-sm max-w-sm leading-relaxed mb-8 font-sans">
                {description}
              </p>

              <button 
                onClick={onViewCaseStudy}
                className="group flex items-center gap-4 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300 btn-sparkle"
              >
                 <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] font-mono">Case Study</span>
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                 </div>
              </button>
            </div>

            <div className="relative flex justify-center items-center perspective-1000">
               <div 
                  className="w-full max-w-[500px] bg-[#0c0c0c] rounded-[40px] p-2.5 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.9)] border border-white/5 relative z-10 transition-transform duration-1000"
                  style={{ transform: `rotateX(${8 - scrollProgress * 4}deg) rotateY(${-8 + scrollProgress * 4}deg)` }}
               >
                  <div className="bg-white rounded-[32px] overflow-hidden aspect-[1.3/1] relative">
                     {mockupContent}
                  </div>
               </div>
               <div 
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[100px] rounded-full opacity-20 transition-opacity"
                  style={{ backgroundColor: accentColor, opacity: contentOpacity * 0.2 }}
               ></div>
            </div>
          </div>

          <div className="relative z-30 w-full pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
             {metrics.map((m, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-white text-2xl font-display font-bold">{m.value}</span>
                  <span className="text-white/30 text-[9px] uppercase tracking-widest font-black font-mono">{m.label}</span>
                </div>
             ))}
             <div className="hidden md:flex flex-col gap-1 text-right justify-center">
                <span className="text-white/10 text-[8px] uppercase tracking-[0.6em] font-black font-mono">{footerCredit}</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
