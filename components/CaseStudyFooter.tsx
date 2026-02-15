import React from 'react';
import { ProjectNavigation } from './ProjectNavigation';

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
    return (
        <div className="px-6 pb-8 pt-4">
            {/* Subtle light footer */}
            <div className="bg-[#f8f7f5] border border-black/5 rounded-[48px] py-28 px-10 text-center text-black relative overflow-hidden">

                {/* Large decorative project number — very subtle backdrop */}
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
                    <p className="font-serif text-4xl md:text-5xl text-black/90 mb-14 leading-tight">
                        Thanks for reading.
                    </p>
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-[#0066FF] text-white rounded-full font-bold text-sm tracking-wide hover:bg-[#0052cc] active:scale-95 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Portfolio
                    </button>
                </div>
            </div>

            {/* Project navigation — outside the dark pill */}
            <div className="mt-12 max-w-4xl mx-auto px-4">
                <ProjectNavigation currentProjectId={projectId} variant="light" />
            </div>
        </div>
    );
};
