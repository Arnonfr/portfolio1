import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data';

interface ProjectNavigationProps {
  currentProjectId: number;
  variant?: 'dark' | 'light';
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentProjectId, variant = 'light' }) => {
  const navigate = useNavigate();
  const currentIndex = PROJECTS.findIndex(p => p.id === currentProjectId);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  if (!prevProject && !nextProject) return null;

  const isDark = variant === 'dark';

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className={`border-t ${isDark ? 'border-white/15' : 'border-stone-200'} pt-12 pb-4`}>
        <div className="flex items-center justify-between gap-6">
          {/* Previous */}
          {prevProject ? (
            <button
              onClick={() => navigate(`/work/${prevProject.id}`)}
              className="group flex items-center gap-4 text-left transition-all duration-300 hover:opacity-70"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`shrink-0 transition-transform duration-300 group-hover:-translate-x-1 ${isDark ? 'text-white/50' : 'text-stone-400'}`}
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <div>
                <p className={`text-[10px] uppercase tracking-[0.3em] mb-1 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                  Previous
                </p>
                <p className={`font-serif text-lg leading-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  {prevProject.title}
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                  {prevProject.category}
                </p>
              </div>
            </button>
          ) : (
            <div />
          )}

          {/* Next */}
          {nextProject ? (
            <button
              onClick={() => navigate(`/work/${nextProject.id}`)}
              className="group flex items-center gap-4 text-right transition-all duration-300 hover:opacity-70 ml-auto"
            >
              <div>
                <p className={`text-[10px] uppercase tracking-[0.3em] mb-1 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                  Next
                </p>
                <p className={`font-serif text-lg leading-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  {nextProject.title}
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                  {nextProject.category}
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isDark ? 'text-white/50' : 'text-stone-400'}`}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
