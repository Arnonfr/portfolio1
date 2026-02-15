
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data';

interface Props {
    projectId: number;
    projectTitle: string;
    onBack: () => void;
    category?: string;
}

// ── Helpers ──
function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

type Pt = [number, number];

function buildCubicPath(points: Pt[]): string {
    // points: [M, C1, C2, End, C1, C2, End, ...]
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i += 3) {
        d += ` C ${points[i][0]} ${points[i][1]}, ${points[i + 1][0]} ${points[i + 1][1]}, ${points[i + 2][0]} ${points[i + 2][1]}`;
    }
    return d;
}

function interpolatePoints(a: Pt[], b: Pt[], t: number): Pt[] {
    return a.map((p, i) => [lerp(p[0], b[i][0], t), lerp(p[1], b[i][1], t)] as Pt);
}

// ── Path definitions ──
// ViewBox: 0 0 1400 300
const CY = 150;

// Path A — diverges from center toward upper-left
const pathAStraight: Pt[] = [
    [700, CY],
    [550, CY], [350, CY], [100, CY],
    [-50, CY], [-150, CY], [-300, CY],
];
const pathACurved: Pt[] = [
    [700, CY],
    [550, CY - 30], [300, CY - 80], [50, CY - 120],
    [-80, CY - 140], [-200, CY - 155], [-400, CY - 170],
];

// Path B — diverges from center toward lower-right
const pathBStraight: Pt[] = [
    [700, CY],
    [850, CY], [1050, CY], [1300, CY],
    [1450, CY], [1550, CY], [1700, CY],
];
const pathBCurved: Pt[] = [
    [700, CY],
    [850, CY + 30], [1100, CY + 80], [1350, CY + 120],
    [1480, CY + 140], [1600, CY + 155], [1800, CY + 170],
];

const SEPARATOR = '  \u00b7  ';

export const CaseStudyFooterDiverge: React.FC<Props> = ({
    projectId,
    projectTitle,
    onBack,
    category,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const currentIndex = PROJECTS.findIndex(p => p.id === projectId);
    const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
    const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    const pathA = useTransform(smoothProgress, (p) => {
        const t = Math.min(1, Math.max(0, p));
        return buildCubicPath(interpolatePoints(pathAStraight, pathACurved, t));
    });
    const pathB = useTransform(smoothProgress, (p) => {
        const t = Math.min(1, Math.max(0, p));
        return buildCubicPath(interpolatePoints(pathBStraight, pathBCurved, t));
    });
    const textOpacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 0.5, 0.8]);

    const repeatedText = (projectTitle + SEPARATOR).repeat(30);

    return (
        <div className="px-6 pb-8 pt-4" ref={ref}>
            {/* Subtle light footer */}
            <div className="bg-[#f8f7f5] border border-black/5 rounded-[48px] overflow-hidden text-black">
            <div className="py-28 px-10 text-center relative overflow-hidden">

                {/* SVG text-on-path — diverging split */}
                <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03]" aria-hidden>
                    <svg
                        viewBox="0 0 1400 300"
                        className="w-full h-full"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <motion.path id="diverge-path-a" d={pathA} />
                            <motion.path id="diverge-path-b" d={pathB} />
                        </defs>

                        <motion.text
                            fill="white"
                            style={{ opacity: textOpacity }}
                            fontSize="24"
                            fontFamily="'Space Grotesk', sans-serif"
                            fontWeight="700"
                            letterSpacing="0.05em"
                        >
                            <textPath href="#diverge-path-a">
                                {repeatedText}
                            </textPath>
                        </motion.text>

                        <motion.text
                            fill="white"
                            style={{ opacity: textOpacity }}
                            fontSize="24"
                            fontFamily="'Space Grotesk', sans-serif"
                            fontWeight="700"
                            letterSpacing="0.05em"
                        >
                            <textPath href="#diverge-path-b">
                                {repeatedText}
                            </textPath>
                        </motion.text>
                    </svg>
                </div>

                {/* Large decorative project number */}
                <span
                    className="absolute inset-0 flex items-center justify-center text-[22rem] font-serif font-bold leading-none text-white/[0.015] select-none pointer-events-none"
                    aria-hidden
                >
                    {String(projectId).padStart(2, '0')}
                </span>

                {/* Main content */}
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

            {/* Prev / Next navigation — inside the pill */}
            {(prevProject || nextProject) && (
                <div className="border-t border-black/5 px-10 py-6 flex items-center justify-between">
                    {prevProject ? (
                        <button onClick={() => navigate(`/work/${prevProject.id}`)} className="group flex items-center gap-3 text-left hover:opacity-60 transition-opacity">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-400 group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-0.5">Previous</p>
                                <p className="font-serif text-sm text-stone-700">{prevProject.title}</p>
                            </div>
                        </button>
                    ) : <div />}
                    {nextProject ? (
                        <button onClick={() => navigate(`/work/${nextProject.id}`)} className="group flex items-center gap-3 text-right hover:opacity-60 transition-opacity">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-0.5">Next</p>
                                <p className="font-serif text-sm text-stone-700">{nextProject.title}</p>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-400 group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    ) : <div />}
                </div>
            )}
            </div>
        </div>
    );
};
