
import React, { useEffect, useRef } from 'react';

interface ReactiveLetterProps {
  letter: string;
}

export const ReactiveLetter: React.FC<ReactiveLetterProps> = ({ letter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    };
    
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current || !glassRef.current || !sheenRef.current || !rectRef.current) return;

      const rect = rectRef.current;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const maxDist = 280;
      
      if (distance < maxDist) {
        const rawIntensity = 1 - Math.min(distance / maxDist, 1);
        const intensity = Math.pow(rawIntensity, 1.2);
        
        // 1. Text Transformations
        const skewX = (distanceX / maxDist) * -12; 
        const weight = 100 + (intensity * 800); 
        const scale = 1 + (intensity * 0.1);
        
        textRef.current.style.transform = `skewX(${skewX}deg) scale(${scale})`;
        textRef.current.style.fontWeight = Math.floor(weight).toString();
        textRef.current.style.color = `rgba(0,0,0, ${0.1 + intensity * 0.9})`;
        
        // 2. Glass Background Effect
        glassRef.current.style.opacity = (intensity * 0.8).toString();
        glassRef.current.style.transform = `scale(${0.8 + intensity * 0.4}) translateY(${intensity * -10}px)`;
        glassRef.current.style.backdropFilter = `blur(${intensity * 12}px)`;
        
        // 3. Sheen Interaction
        sheenRef.current.style.opacity = (intensity * 0.6).toString();
        sheenRef.current.style.transform = `translateX(${intensity * 100}%) skewX(-20deg)`;

      } else {
        // Smooth Reset
        if (parseFloat(glassRef.current.style.opacity) > 0) {
            textRef.current.style.transform = 'none';
            textRef.current.style.fontWeight = '100';
            textRef.current.style.color = 'rgba(0,0,0, 0.08)';
            
            glassRef.current.style.opacity = '0';
            glassRef.current.style.transform = 'scale(0.8) translateY(0)';
            
            sheenRef.current.style.opacity = '0';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center px-1 py-4 md:px-2">
      {/* Glass Tile Layer */}
      <div 
        ref={glassRef}
        className="absolute inset-x-[-10%] inset-y-0 bg-white/30 border border-white/60 rounded-xl pointer-events-none opacity-0 transition-opacity duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        style={{ transform: 'scale(0.8)' }}
      >
        {/* Metal Sheen Layer */}
        <div 
          ref={sheenRef}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent w-[200%] h-full opacity-0 pointer-events-none"
          style={{ transform: 'translateX(-100%) skewX(-20deg)' }}
        />
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.7)] pointer-events-none"></div>
      </div>

      {/* Reactive Letter */}
      <span 
        ref={textRef} 
        className="relative z-10 inline-block will-change-transform cursor-default select-none transition-[font-weight,transform,color] duration-500 ease-out mix-blend-darken"
        style={{ fontWeight: 100, color: 'rgba(0,0,0, 0.08)' }}
      >
        {letter}
      </span>
    </div>
  );
};
