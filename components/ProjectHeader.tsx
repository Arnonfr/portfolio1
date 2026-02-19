import React from 'react';

interface ProjectHeaderProps {
    title: string;
    subtitle: string;
    description: string;
    role: string;
    platform: string;
    company: string;
    year: string;
    imageSrc: string;
    imageAlt: string;
    topLabel?: string;
    topLabelColorClass?: string;
    isImageContained?: boolean; // new prop to control fit mode if needed, defaulting to cover
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
    title,
    subtitle,
    description,
    role,
    platform,
    company,
    year,
    imageSrc,
    imageAlt,
    topLabel = 'Product Design',
    topLabelColorClass = 'text-blue-600',
    isImageContained = false,
}) => {
    return (
        <header className="relative w-full pt-32 md:pt-48 pb-20 md:pb-32 flex flex-col items-center bg-white border-b border-stone-100 overflow-hidden animate-fadeIn">
            {/* Title & Description */}
            <div className="max-w-5xl mx-auto px-container z-10 text-center mb-10 md:mb-16">
                <p className={`text-[10px] font-bold uppercase tracking-[0.5em] ${topLabelColorClass} mb-6 md:mb-8`}>
                    {topLabel}
                </p>
                <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] text-black tracking-tight mb-6 md:mb-10">
                    {title} <span className="italic text-stone-300">{subtitle}</span>
                </h1>
                <p className="max-w-xl mx-auto text-base md:text-lg text-stone-400 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Project Meta */}
            <div className="max-w-4xl mx-auto px-container mb-14 md:mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                    {[
                        { label: "Role", val: role },
                        { label: "Platform", val: platform },
                        { label: "Company", val: company },
                        { label: "Year", val: year }
                    ].map((item, i) => (
                        <div key={i}>
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 md:mb-2">{item.label}</p>
                            <p className="text-sm md:text-base font-medium text-stone-700">{item.val}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full max-w-[1100px] px-container">
                <div className="relative rounded-2xl md:rounded-[28px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-stone-50">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        fetchPriority="high"
                        className={`w-full h-auto ${isImageContained ? 'object-contain bg-stone-100' : 'object-cover'}`}
                    />
                </div>
            </div>
        </header>
    );
};
