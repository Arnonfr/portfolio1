
import React from 'react';
import { Project } from '../types';

interface SideProjectsPageProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  onBack: () => void;
}

export const SideProjectsPage: React.FC<SideProjectsPageProps> = ({ projects, onProjectSelect, onBack }) => {
  return (
    <div className="w-full bg-transparent min-h-screen font-sans animate-fadeIn">
      <header className="pt-48 pb-20 px-6 max-w-[1440px] mx-auto">
        <div className="mb-20">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.5em] text-black/20 block mb-6">Experiments</span>
          <h1 className="font-serif text-6xl md:text-[120px] leading-[0.9] text-[#111] tracking-tight mb-8">
            Built with <span className="italic">Vibe Code</span>
          </h1>
          <p className="text-stone-400 text-xl max-w-xl leading-relaxed">
            Experimental side projects exploring the intersection of artificial intelligence and human utility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className="group relative bg-white/20 backdrop-blur-xl border border-white/60 rounded-[40px] p-10 cursor-pointer hover:bg-white/40 hover:scale-[1.02] transition-all duration-700 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.03)]"
            >
              <div className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center mb-8 p-2.5 border border-black/5">
                <img src={project.logo} className="w-full h-full object-contain mix-blend-multiply" alt="" />
              </div>
              <h3 className="font-serif text-4xl mb-2">{project.title}</h3>
              <p className="text-[11px] uppercase font-bold tracking-[0.2em] text-black/30 mb-8">{project.subtitle}</p>
              
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden mb-8 border border-white/40">
                <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s] ease-out" alt="" />
              </div>

              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                <span>View Full Experiment</span>
                <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center group-hover:translate-x-1 transition-transform border border-black/5">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 border-t border-black/5 pt-12 text-center">
            <button 
              onClick={onBack}
              className="px-12 py-5 bg-black text-white rounded-full font-sans font-bold uppercase text-[11px] tracking-[0.3em] hover:scale-105 active:scale-95 transition-all"
            >
               Back to Main Portfolio
            </button>
        </div>
      </header>
    </div>
  );
};
