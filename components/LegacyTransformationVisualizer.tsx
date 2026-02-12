
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const LegacyTransformationVisualizer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation variants
    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 0.6,
            transition: { duration: 1.5, delay: i * 0.5, ease: "easeInOut" },
        }),
    };

    const dotVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: { duration: 0.3, delay: i * 0.5 },
        }),
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-stone-900 rounded-2xl overflow-hidden p-8 md:p-12 shadow-2xl"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.5),rgba(0,0,0,0.8))]" />

            <h3 className="relative z-10 text-center text-white font-serif text-2xl md:text-3xl mb-12">
                Consolidating the Workflow
            </h3>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* LEFT: LEGACY */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-red-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-stone-800 rounded-lg p-2 border border-stone-700 shadow-xl transform rotate-1 transition-transform duration-500 hover:rotate-0">
                        <div className="absolute -top-3 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                            Legacy Interface
                        </div>
                        <img
                            src="/images/legacy-claim-real.png"
                            alt="Legacy Interface"
                            className="w-full h-auto rounded opacity-80"
                        />
                        {/* Highlights similar to user request "take from here" */}
                        <div className="absolute top-[30%] left-[10%] w-[80%] h-[15%] border-2 border-red-500/50 rounded bg-red-500/10 backdrop-blur-[1px]" />
                        <div className="absolute top-[50%] left-[50%] w-[40%] h-[10%] border-2 border-red-500/50 rounded bg-red-500/10 backdrop-blur-[1px]" />
                    </div>
                </div>

                {/* RIGHT: CONNECTING SVG LINES OVERLAY */}
                {/* Note: In a real app we'd calculate coordinates dynamicall. 
             Here we fake the 'flow' with predefined SVG curves connecting the sides visually */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    <svg className="w-full h-full">
                        <defs>
                            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                            </linearGradient>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" fillOpacity="0.8" />
                            </marker>
                        </defs>

                        {/* Line 1: From Top-Left block to Top-Right block */}
                        <motion.path
                            d="M 25% 40% C 40% 40%, 60% 30%, 75% 30%"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                            variants={lineVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={1}
                        />
                        <motion.circle cx="25%" cy="40%" r="4" fill="#ef4444" variants={dotVariants} initial="hidden" whileInView="visible" custom={1} />

                        {/* Line 2: Middle-ish */}
                        <motion.path
                            d="M 35% 55% C 45% 55%, 55% 50%, 75% 50%"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                            variants={lineVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={2}
                        />
                        <motion.circle cx="35%" cy="55%" r="4" fill="#ef4444" variants={dotVariants} initial="hidden" whileInView="visible" custom={2} />

                        {/* Line 3: Bottom-ish */}
                        <motion.path
                            d="M 30% 65% C 40% 65%, 60% 80%, 75% 70%"
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                            variants={lineVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={3}
                        />
                        <motion.circle cx="30%" cy="65%" r="4" fill="#ef4444" variants={dotVariants} initial="hidden" whileInView="visible" custom={3} />

                    </svg>
                </div>


                {/* RIGHT: NEW */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-white rounded-lg p-2 border border-stone-200 shadow-xl transform -rotate-1 transition-transform duration-500 hover:rotate-0">
                        <div className="absolute -top-3 right-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg z-10">
                            Unified Interface
                        </div>
                        {/* Placeholder for the New Interface - Using an image of your previous work or generic */}
                        <div className="w-full h-auto rounded overflow-hidden border border-stone-100 bg-stone-50">
                            {/* 
                    Ideally we take a screenshot of the coded component. 
                    For now, illustrating it with the component layout we have 
                    or the user can swap this image.
                */}
                            <img
                                src="/images/unified-modal-design.png"
                                alt="Unified Interface"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Highlights on destination */}
                        <div className="absolute top-[25%] right-[10%] w-[80%] h-[15%] border-2 border-blue-500/50 rounded bg-blue-500/10 backdrop-blur-[1px]" />
                        <div className="absolute top-[45%] right-[20%] w-[60%] h-[20%] border-2 border-blue-500/50 rounded bg-blue-500/10 backdrop-blur-[1px]" />
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-12 text-center">
                <p className="text-stone-400 text-sm max-w-lg mx-auto">
                    Visualizing the data migration: Scattered fields from multiple legacy tabs were identified, grouped by context, and mapped directly into the new unified modal structure.
                </p>
            </div>
        </div>
    );
};
