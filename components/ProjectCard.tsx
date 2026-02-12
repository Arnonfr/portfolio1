
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative w-full h-[580px] bg-white/25 backdrop-blur-md rounded-[40px] border border-white/40 p-10 cursor-pointer transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden animate-fade"
    >
      {/* Header Section: Matches the Austin Knight layout */}
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-white/60 backdrop-blur border border-black/5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-center p-2">
            <img 
              src={project.logo || 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'} 
              alt="" 
              className="w-full h-full object-contain mix-blend-multiply opacity-80" 
            />
          </div>
          <h3 className="font-serif text-3xl font-medium tracking-tight text-[#111]">
            {project.title}
          </h3>
        </div>

        <div className="text-right">
          <span className="block text-[13px] font-bold text-[#111] mb-0.5 tracking-tight font-sans">
            {project.role}
          </span>
          <span className="block text-[10px] font-semibold text-black/25 uppercase tracking-[0.15em] font-sans">
            {project.company && `${project.company} — `}{project.year}
          </span>
        </div>
      </div>

      {/* Main Image Content */}
      <div className="flex-1 relative mt-12 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[95%] h-full rounded-[32px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-white/20">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      </div>

      {/* Subtle overlay for interaction feedback */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      {/* Action Hover */}
      <div className="absolute bottom-10 right-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <div className="bg-black text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
};
