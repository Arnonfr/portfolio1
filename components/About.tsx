
import React from 'react';
import { Typewriter } from './Typewriter';

interface AboutProps {
  onExploreSideProjects: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreSideProjects }) => {
  return (
    <section id="about" className="relative w-full py-40 md:py-60 bg-transparent border-y border-black/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-end">
        
        {/* Left Side: Editorial Bio */}
        <div className="order-2 lg:order-1 max-w-xl pb-10">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-black/20 block mb-10">Continuous Craft</span>
          
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-12 tracking-tight text-[#111]">
             Mastering tools to <span className="italic text-black/30">simplify</span> the complex.
          </h2>
          
          <div className="space-y-8 text-[#555] text-lg md:text-xl leading-relaxed font-normal">
            <p>
              I use tools, learn them deeply, and teach them to others to create meaningful impact. My process is fueled by a relentless curiosity for new technology and how it can serve human needs.
            </p>
            <p>
              I love experimenting with AI tools to supercharge my workflow and bring experimental side projects to life, blending cutting-edge tech with established design principles.
            </p>
          </div>

          <div className="mt-12">
            <button 
              onClick={onExploreSideProjects}
              className="bg-white/30 backdrop-blur-xl border border-white/60 px-8 py-3.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:bg-white/50 hover:scale-105 active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/60 group-hover:text-black">Explore Side Projects</span>
                <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center border border-black/5 group-hover:translate-x-1 transition-transform">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-20 flex items-center gap-6 opacity-20">
            <div className="w-12 h-px bg-black"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Learn // Experiment // Build</span>
          </div>
        </div>

        {/* Right Side: The Typewriter Artisan Component */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade overflow-visible" style={{ animationDelay: '300ms' }}>
           <Typewriter />
        </div>
        
      </div>
    </section>
  );
};
