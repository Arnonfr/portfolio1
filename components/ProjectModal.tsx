
import React, { useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start bg-white/95 backdrop-blur-md overflow-y-auto">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
      >
        <span className="text-xs font-bold uppercase tracking-widest">Close</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="w-full max-w-6xl bg-white min-h-screen shadow-2xl relative animate-fadeInUp pb-24">
        
        {/* New Header Design (White Clean) */}
        <div className="pt-32 pb-16 px-6 md:px-12 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-medium text-gray-900 mb-6 leading-tight">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Hero Image Container */}
        <div className="w-full px-6 md:px-12 mb-24">
           <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-[16/9]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
           </div>
        </div>

        {/* Content Container */}
        <div className="px-6 md:px-16 mx-auto max-w-5xl">
          
          {/* Project Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-100 pb-12 mb-16">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Role</span>
              <span className="text-base font-semibold text-gray-900">{project.role || 'Product Designer'}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Company</span>
              <span className="text-base font-semibold text-gray-900">{project.company || 'Confidential'}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Year</span>
              <span className="text-base font-semibold text-gray-900">{project.year || '2024'}</span>
            </div>
             <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Category</span>
              <span className="text-base font-semibold text-gray-900">{project.category}</span>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-6">Overview</h3>
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Challenge */}
          {project.challenge && (
             <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
               <div className="md:col-span-4">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">The Challenge</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">
                   Identifying friction points and analyzing the legacy workflow issues.
                 </p>
               </div>
               <div className="md:col-span-8">
                 <div className="prose prose-lg text-gray-600">
                    <p className="whitespace-pre-line">{project.challenge}</p>
                 </div>
               </div>
             </div>
          )}

          {/* Process Images Gallery (Top Section) */}
          {project.images && project.images.length > 0 && (
             <div className="space-y-12 mb-24">
                {project.images.slice(0, 2).map((img, idx) => (
                   <div key={idx} className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100">
                      <img src={img} alt={`Process ${idx}`} className="w-full h-auto rounded-lg shadow-sm" />
                   </div>
                ))}
             </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="mb-24">
              <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">The Solution</h3>
              <div className="prose prose-xl max-w-none text-gray-600">
                <p className="whitespace-pre-line leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* Remaining Images */}
          {project.images && project.images.length > 2 && (
             <div className="grid grid-cols-1 gap-12 mb-24">
                {project.images.slice(2).map((img, idx) => (
                   <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-md">
                      <img src={img} alt={`Detail ${idx}`} className="w-full h-auto rounded-lg" />
                   </div>
                ))}
             </div>
          )}

          {/* Impact Stats */}
          {project.impact && (
            <div className="mb-16 bg-black text-white p-8 md:p-16 rounded-3xl">
              <h3 className="text-2xl font-display font-bold mb-12 border-b border-white/20 pb-6">Key Outcomes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {project.impact.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span className="text-4xl font-light text-accent">✦</span>
                    <p className="font-bold text-lg leading-tight">{stat}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Footer Nav */}
          <div className="border-t border-gray-100 pt-12 flex justify-center">
            <button 
              onClick={onClose} 
              className="text-sm font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-black pb-1 transition-all"
            >
              Back to All Projects
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
