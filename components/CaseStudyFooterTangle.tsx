
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ProjectNavigation } from './ProjectNavigation';

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
// ViewBox: 0 0 1400 500 — taller to give room for two separate path zones
// Path 1 runs through the UPPER zone (~y:80–180)
// Path 2 runs through the LOWER zone (~y:320–420)
// Center (~y:200–300) stays clear for content

const AMP = 50;

// Path 1 (L→R) — upper zone
const P1_CY = 110;
const path1Straight: Pt[] = [
    [-200, P1_CY],
    [0, P1_CY], [200, P1_CY], [350, P1_CY],
    [500, P1_CY], [650, P1_CY], [700, P1_CY],
    [750, P1_CY], [900, P1_CY], [1050, P1_CY],
    [1200, P1_CY], [1400, P1_CY], [1600, P1_CY],
];
const path1Wavy: Pt[] = [
    [-200, P1_CY],
    [0, P1_CY - AMP], [200, P1_CY + AMP], [350, P1_CY],
    [450, P1_CY - AMP], [600, P1_CY + AMP * 0.7], [700, P1_CY - AMP * 0.3],
    [800, P1_CY + AMP], [950, P1_CY - AMP], [1050, P1_CY],
    [1150, P1_CY + AMP * 0.6], [1350, P1_CY - AMP * 0.4], [1600, P1_CY],
];

// Path 2 (R→L) — lower zone
const P2_CY = 390;
const path2Straight: Pt[] = [
    [1600, P2_CY],
    [1400, P2_CY], [1200, P2_CY], [1050, P2_CY],
    [900, P2_CY], [750, P2_CY], [700, P2_CY],
    [650, P2_CY], [500, P2_CY], [350, P2_CY],
    [200, P2_CY], [0, P2_CY], [-200, P2_CY],
];
const path2Wavy: Pt[] = [
    [1600, P2_CY],
    [1400, P2_CY + AMP * 0.5], [1200, P2_CY - AMP], [1050, P2_CY],
    [950, P2_CY + AMP], [800, P2_CY - AMP * 0.7], [700, P2_CY + AMP * 0.3],
    [600, P2_CY - AMP], [450, P2_CY + AMP], [350, P2_CY],
    [250, P2_CY - AMP * 0.6], [50, P2_CY + AMP * 0.4], [-200, P2_CY],
];

const SEPARATOR = '  \u00b7  ';

export const CaseStudyFooterTangle: React.FC<Props> = ({
    projectId,
    projectTitle,
    onBack,
    category,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

    const pathD1 = useTransform(smoothProgress, (p) => {
        const t = Math.min(1, Math.max(0, p));
        return buildCubicPath(interpolatePoints(path1Straight, path1Wavy, t));
    });

    const pathD2 = useTransform(smoothProgress, (p) => {
        const t = Math.min(1, Math.max(0, p));
        return buildCubicPath(interpolatePoints(path2Straight, path2Wavy, t));
    });

    const textOpacity1 = useTransform(smoothProgress, [0, 0.15, 1], [0, 0.06, 0.1]);
    const textOpacity2 = useTransform(smoothProgress, [0, 0.15, 1], [0, 0.05, 0.12]);

    const text1 = (projectTitle + SEPARATOR).repeat(20);
    const text2 = ('thanks for reading' + SEPARATOR).repeat(20);

    return (
        <div className="px-6 pb-8 pt-4" ref={ref}>
            {/* Subtle light footer */}
            <div
                className="rounded-[48px] py-28 px-10 text-center relative overflow-hidden border border-black/5"
                style={{ background: '#f8f7f5' }}
            >

                {/* SVG text-on-path — paths in upper & lower zones, center clear */}
                <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03]" aria-hidden>
                    <svg
                        viewBox="0 0 1400 500"
                        className="w-full h-full"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <motion.path id="tangle-path-1" d={pathD1} />
                            <motion.path id="tangle-path-2" d={pathD2} />
                        </defs>

                        {/* Path 1 — project title, upper zone, serif */}
                        <motion.text
                            fill="#000000"
                            style={{ opacity: 0.8 }}
                            fontSize="48"
                            fontFamily="Georgia, 'Times New Roman', serif"
                            fontWeight="400"
                            fontStyle="italic"
                            letterSpacing="0.02em"
                        >
                            <textPath href="#tangle-path-1">
                                {text1}
                            </textPath>
                        </motion.text>

                        {/* Path 2 — "thanks for reading", lower zone, red with multiply */}
                        <motion.text
                            fill="#0066FF"
                            style={{ opacity: 0.6 }}
                            fontSize="48"
                            fontFamily="Georgia, 'Times New Roman', serif"
                            fontWeight="400"
                            fontStyle="italic"
                            letterSpacing="0.02em"
                        >
                            <textPath href="#tangle-path-2">
                                {text2}
                            </textPath>
                        </motion.text>
                    </svg>
                </div>

                {/* Large decorative project number */}
                <span
                    className="absolute inset-0 flex items-center justify-center text-[22rem] font-serif font-bold leading-none text-black/[0.015] select-none pointer-events-none"
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
                    <p className="font-serif text-4xl md:text-5xl text-black/85 mb-14 leading-tight">
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

            {/* Project navigation */}
            <div className="mt-12 max-w-4xl mx-auto px-4">
                <ProjectNavigation currentProjectId={projectId} variant="light" />
            </div>
        </div>
    );
};
