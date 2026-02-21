import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data';

interface CaseStudyFooterProps {
    projectId: number;
    onBack: () => void;
    category?: string;
}

export const CaseStudyFooter: React.FC<CaseStudyFooterProps> = ({
    projectId,
    onBack,
    category,
}) => {
    const navigate = useNavigate();
    const currentIndex = PROJECTS.findIndex(p => p.id === projectId);
    const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
    const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

    return (
        <div className="px-6 pb-8 pt-4">
            <div className="bg-[#f8f7f5] border border-black/5 rounded-[48px] overflow-hidden">

                {/* Large decorative project number */}
                <div className="relative py-24 px-10 text-center overflow-hidden">
                    <span
                        className="absolute inset-0 flex items-center justify-center text-[22rem] font-serif font-bold leading-none text-black/[0.015] select-none pointer-events-none"
                        aria-hidden
                    >
                        {String(projectId).padStart(2, '0')}
                    </span>

                    <div className="relative z-10 max-w-lg mx-auto">
                        {category && (
                            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 mb-8">
                                {category}
                            </p>
                        )}
                        <p className="font-serif text-4xl md:text-5xl text-black/90 mb-10 leading-tight">
                            Thanks for reading.
                        </p>
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-stone-400 hover:text-stone-700 transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to Portfolio
                        </button>
                    </div>
                </div>

                {/* Prev / Next navigation */}
                {(prevProject || nextProject) && (
                    <div className="border-t border-black/5 px-10 py-6 flex items-center justify-between">
                        {prevProject ? (
                            <button
                                onClick={() => navigate(`/work/${prevProject.id}`)}
                                className="group flex items-center gap-3 text-left hover:opacity-60 transition-opacity"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-400 group-hover:-translate-x-0.5 transition-transform">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-0.5">Previous</p>
                                    <p className="font-serif text-sm text-stone-700">{prevProject.title}</p>
                                </div>
                            </button>
                        ) : <div />}
                        {nextProject ? (
                            <button
                                onClick={() => navigate(`/work/${nextProject.id}`)}
                                className="inline-flex items-center gap-3 px-6 py-3 bg-[#0c0c0a] text-[#f4f3f1] text-[0.6875rem] font-semibold uppercase tracking-[0.1em] hover:bg-[#c9a87e] hover:text-[#0c0c0a] transition-colors"
                            >
                                {nextProject.title}
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        ) : <div />}
                    </div>
                )}
            </div>
        </div>
    );
};
