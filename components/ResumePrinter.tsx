
import React, { useEffect, useRef, useState } from 'react';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  desc?: string;
}

const experienceData: ExperienceItem[] = [
  { role: 'Product Designer', company: 'Novidea', period: '2024 - Pres.', type: 'Full-time', desc: 'Insurtech Systems' },
  { role: 'UX Designer', company: 'Ava Trade', period: '2022 - 2024', type: 'Full-time', desc: 'Fintech Trading' },
  { role: 'Art Director', company: 'Brish Galey', period: '2020 - 2022', type: 'Agency', desc: 'Advertising Lead' },
  { role: 'Designer', company: 'Leomek Hatodaa', period: '2018 - 2020', type: 'Agency', desc: 'Print & Digital' },
  { role: 'Partner Mgmt.', company: 'Pardes Chaya', period: '2015 - Pres.', type: 'Volunteer', desc: 'NPO Operations' },
];

interface ResumePrinterProps {
  // Use React.Ref to support both RefObject and RefCallback
  bodyRef?: React.Ref<HTMLDivElement>;
  paperRef?: React.Ref<HTMLDivElement>;
}

export const ResumePrinter: React.FC<ResumePrinterProps> = ({ bodyRef, paperRef }) => {
  const [printState, setPrintState] = useState<'idle' | 'printing' | 'completed'>('idle');
  const [dragY, setDragY] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag refs
  const isDragging = useRef(false);
  const startY = useRef(0);
  const initialDragY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && printState === 'idle') {
          // Slight delay before printing starts for dramatic effect
          setTimeout(() => {
            setPrintState('printing');
            // Duration matches CSS transition (6000ms)
            setTimeout(() => {
              setPrintState('completed');
            }, 6000); 
          }, 500);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [printState]);

  // --- Drag Logic ---
  const handleStart = (y: number) => {
    if (printState !== 'completed') return;
    isDragging.current = true;
    startY.current = y;
    initialDragY.current = dragY;
  };

  const handleMove = (y: number) => {
    if (!isDragging.current) return;
    const delta = y - startY.current;
    
    // Apply bounds: 
    // Max drag up (negative): -200px (pulling receipt out)
    // Max drag down (positive): 200px (viewing top history)
    const newY = initialDragY.current + delta;
    const dampenedY = Math.max(Math.min(newY, 200), -200);
    
    setDragY(dampenedY);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  // Mouse Events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    handleStart(e.clientY);
  };
  const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
  const onMouseUp = () => handleEnd();

  // Touch Events
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientY);
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);
  const onTouchEnd = () => handleEnd();

  useEffect(() => {
    if (printState === 'completed') {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
       window.removeEventListener('mousemove', onMouseMove);
       window.removeEventListener('mouseup', onMouseUp);
       window.removeEventListener('touchmove', onTouchMove);
       window.removeEventListener('touchend', onTouchEnd);
    }
  }, [printState]);


  return (
    <div className="relative flex flex-col items-center justify-end w-full max-w-[500px] h-full select-none">
      
      {/* Background Glow for Printer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

      <div className="absolute top-12 left-0 w-full text-center z-10 px-4">
          <h2 className="text-white font-display text-3xl font-bold mb-2">Experience Log</h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">
            {printState === 'completed' ? 'Drag receipt to view history' : 'Processing data...'}
          </p>
      </div>

      {/* --- PAPER STRIP --- */}
      {/* Mask container to hide paper at bottom */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full pb-[10px] overflow-hidden" style={{ maxHeight: 'calc(100% - 140px)' }}>
          
          <div 
            ref={paperRef}
            className={`w-[260px] md:w-[280px] bg-[#f3f4f6] text-gray-900 font-mono text-xs shadow-2xl origin-bottom relative
                ${printState === 'printing' ? 'transition-transform duration-[6000ms] ease-linear' : ''}
                ${printState === 'completed' ? 'cursor-grab active:cursor-grabbing' : ''}
            `}
            style={{
                // 100% pushes it down (hidden), 0% is natural extruded position
                transform: printState === 'idle' 
                    ? 'translateY(100%)' 
                    : printState === 'printing' 
                        ? 'translateY(0%)' 
                        : `translateY(${dragY}px)`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
             {/* Jagged Top Edge */}
             <div className="absolute -top-3 left-0 w-full h-3 bg-[#f3f4f6] jagged-edge"></div>

             <div className="p-5 pb-10 flex flex-col items-center">
                 {/* Receipt Header */}
                <div className="text-center border-b-2 border-dashed border-gray-300 w-full pb-3 mb-3">
                    <div className="font-black text-lg tracking-tighter uppercase mb-1">CAREER_LOG</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest">Auth: Arnon Friedman</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">
                    {new Date().toLocaleDateString('en-GB')}
                    </div>
                </div>

                {/* Receipt Body */}
                <div className="w-full space-y-4 mb-6">
                    {experienceData.map((job, idx) => (
                        <div key={idx} className="flex justify-between items-start gap-2">
                            <div className="flex flex-col text-left max-w-[65%]">
                                <span className="font-bold uppercase leading-tight text-xs">{job.role}</span>
                                <span className="text-gray-600 text-[9px] uppercase tracking-wide">@{job.company}</span>
                                {job.desc && <span className="text-[8px] text-gray-400 italic mt-0.5">{job.desc}</span>}
                            </div>
                            <div className="flex flex-col items-end shrink-0 text-right">
                                <span className="font-bold text-[10px]">{job.period}</span>
                                <span className="text-[8px] text-gray-400 uppercase tracking-wider">{job.type}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Receipt Footer */}
                <div className="border-t-2 border-dashed border-gray-300 w-full pt-3 mt-auto text-center">
                    <div className="text-[9px] text-gray-500 uppercase mb-1">Total Experience</div>
                    <div className="text-xl font-black mb-2">7+ YEARS</div>
                    <div className="h-6 w-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/2560px-UPC-A-036000291452.svg.png')] bg-cover bg-center grayscale opacity-60"></div>
                    <div className="mt-1 text-[7px] tracking-[0.2em] text-center">THANK YOU</div>
                </div>
             </div>
             
             {/* Fade gradient at bottom to simulate entering printer - Masked by parent now */}
             <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none"></div>
          </div>
      </div>

      {/* --- PRINTER BODY (Foreground) --- */}
      <div 
        ref={(el) => {
            containerRef.current = el;
            // Handle bodyRef correctly based on its type (function or object)
            if (typeof bodyRef === 'function') {
                bodyRef(el);
            } else if (bodyRef && typeof bodyRef === 'object' && 'current' in bodyRef) {
                (bodyRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }
        }}
        className="relative z-20 w-[300px] md:w-[340px] -mt-2 shrink-0"
      >
         {/* Top Slot Cover */}
         <div className="h-4 bg-black w-[260px] md:w-[290px] mx-auto rounded-full relative z-30 shadow-[0_2px_10px_black]"></div>

         {/* Main Box */}
         <div className="bg-[#1a1a1a] rounded-t-[30px] rounded-b-[16px] p-6 pb-8 shadow-2xl relative z-20 border-t border-white/10">
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-8 right-8 h-12 bg-gradient-to-b from-white/5 to-transparent rounded-full opacity-30"></div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                   <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${printState === 'printing' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-green-900'}`}></div>
                   <div className="w-2 h-2 rounded-full bg-red-900"></div>
                </div>

                <div className="bg-black/50 px-3 py-1 rounded border border-white/5">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em]">Pix-Jet</span>
                </div>
            </div>
            
            {/* Big Button */}
            <div className="mt-6 flex justify-center">
                 <button 
                   onClick={() => {
                       if(printState === 'completed') {
                           setPrintState('idle'); // Reset
                           setDragY(0);
                       } else if (printState === 'idle') {
                           setPrintState('printing');
                           setTimeout(() => setPrintState('completed'), 6000);
                       }
                   }}
                   className={`w-12 h-12 rounded-full border-4 border-[#2a2a2a] shadow-[0_5px_15px_black] active:scale-95 transition-all
                      ${printState === 'printing' ? 'bg-orange-500' : 'bg-[#333] hover:bg-[#444]'}
                   `}
                 >
                 </button>
            </div>
            <div className="text-center mt-2 text-[8px] text-gray-600 uppercase font-bold tracking-widest">
               {printState === 'completed' ? 'Reset' : 'Power'}
            </div>

         </div>
         {/* Printer Feet/Shadow */}
         <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black rounded-full blur-lg opacity-80 z-0"></div>
      </div>

    </div>
  );
};
