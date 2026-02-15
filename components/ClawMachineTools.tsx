
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion';

interface Tool {
    id: string;
    name: string;
    context: string;
    icon: string;
    color: string;
}


const TOOLS: Tool[] = [
    { id: 'ps', name: 'Photoshop', context: 'Expert image manipulation, production assets, and digital retouching.', icon: 'Ps', color: 'hsl(210, 50%, 25%)' },
    { id: 'id', name: 'InDesign', context: 'Advanced desktop publishing, complex layouts, and print-ready production.', icon: 'Id', color: 'hsl(215, 45%, 35%)' },
    { id: 'cursor', name: 'Cursor', context: 'Primary development environment for AI-assisted engineering and rapid prototyping.', icon: 'Cu', color: 'hsl(220, 60%, 45%)' },
    { id: 'figma', name: 'Figma', context: 'Unified platform for UI/UX design, prototyping, and maintaining scalable design systems.', icon: 'Fi', color: 'hsl(225, 65%, 55%)' },
    { id: 'cloud-code', name: 'Cloud Code', context: 'Streamlining cloud-native development and managing serverless architectures efficiently.', icon: 'Cc', color: 'hsl(200, 70%, 50%)' },
    { id: 'antigravity', name: 'Antigravity (Google)', context: 'Harnessing advanced AI agents for autonomous coding and architectural problem-solving.', icon: 'Ag', color: 'hsl(210, 80%, 60%)' },
    { id: 'chatgpt', name: 'ChatGPT', context: 'Sophisticated AI utility for deep research, strategic ideation, and technical drafting.', icon: 'Gp', color: 'hsl(190, 60%, 75%)' },
    { id: 'figma-make', name: 'Figma Make', context: 'Integrating generative AI workflows to accelerate high-fidelity design output.', icon: 'Fm', color: 'hsl(210, 40%, 85%)' },
    { id: 'notebook-lm', name: 'Notebook LM', context: 'AI-driven synthesis for complex document analysis and research processing.', icon: 'Nb', color: 'hsl(220, 30%, 20%)' },
];

export const ClawMachineTools: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [isClawing, setIsClawing] = useState(false);
    const [pickedTool, setPickedTool] = useState<Tool | null>(null);

    const mouseX = useMotionValue(0);
    const smoothClawX = useSpring(mouseX, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isClawing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        mouseX.set(Math.min(Math.max(x, 15), 85));
    };

    const startClaw = () => {
        if (isClawing) return;
        setIsClawing(true);

        const currentX = smoothClawX.get();
        const targetTool = TOOLS.reduce((prev, curr, idx) => {
            const xPrev = 15 + (idx - 1) / (TOOLS.length - 1) * 70;
            const xCurr = 15 + idx / (TOOLS.length - 1) * 70;
            return Math.abs(xCurr - currentX) < Math.abs((15 + (TOOLS.indexOf(prev) / (TOOLS.length - 1)) * 70) - currentX) ? curr : prev;
        });

        setTimeout(() => {
            setPickedTool(targetTool);
            setSelectedTool(targetTool);
            setTimeout(() => {
                setIsClawing(false);
                setPickedTool(null);
            }, 1200);
        }, 800);
    };

    return (
        <section className="w-full bg-[#f4f3f1] py-24 md:py-32 overflow-hidden selection:bg-blue-100">
            <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="font-mono text-[0.6875rem] font-semibold text-[#a8a39a] tracking-[0.2em] uppercase block mb-4">Stack & Expertise</span>
                        <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-[#0c0c0a] leading-[0.9] tracking-[-0.04em] uppercase">
                            The Digital<br />Toolbox
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-[#a8a39a] font-mono text-sm leading-relaxed">
                            An interactive collection of the tools I use to build, design, and automate. Use the claw to explore the stack.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    {/* Machine Outer Frame */}
                    <div className="absolute -inset-4 bg-white rounded-[40px] shadow-2xl border border-blue-900/5 pointer-events-none" />

                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onClick={startClaw}
                        className="relative w-full h-[550px] bg-[#ebf4ff] rounded-[32px] overflow-hidden cursor-crosshair group shadow-inner"
                    >
                        {/* Ambient background circles */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />

                        {/* Glass Glare */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/5 pointer-events-none z-30" />
                        <div className="absolute top-8 left-8 w-24 h-[400px] bg-white/20 skew-x-[-15deg] blur-2xl pointer-events-none z-30" />

                        {/* The Claw Mechanism */}
                        <motion.div
                            style={{ left: `${smoothClawX.get()}%` }}
                            className="absolute top-0 -translate-x-1/2 flex flex-col items-center z-20"
                        >
                            {/* Rails */}
                            <div className="absolute top-0 w-[2000px] h-3 bg-blue-900/10 -translate-x-1/2 left-1/2" />

                            {/* Carriage */}
                            <div className="w-16 h-8 bg-blue-900 rounded-b-xl shadow-lg relative z-20">
                                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            </div>

                            {/* Extended Cable */}
                            <motion.div
                                animate={{ height: isClawing ? 380 : 30 }}
                                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                className="w-1.5 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 shadow-sm"
                            />

                            {/* Mechanical Claw - Detail */}
                            <motion.div
                                initial={false}
                                animate={{
                                    rotate: isClawing ? [0, 5, -5, 0] : 0,
                                    scale: isClawing ? 1.1 : 1
                                }}
                                className="relative flex items-center justify-center"
                            >
                                {/* Base pivot */}
                                <div className="w-12 h-12 bg-blue-800 rounded-full border-4 border-blue-900 shadow-md flex items-center justify-center">
                                    <div className="w-4 h-4 bg-blue-400 rounded-full blur-[2px]" />
                                </div>

                                {/* Fingers */}
                                <div className="absolute pt-8 flex gap-8">
                                    <motion.div
                                        animate={{
                                            rotate: isClawing ? [30, 10, 30] : 10,
                                        }}
                                        className="w-3 h-14 bg-blue-900 rounded-full origin-top shadow-md border-r border-white/10"
                                    />
                                    <motion.div
                                        animate={{
                                            rotate: isClawing ? [-30, -10, -30] : -10,
                                        }}
                                        className="w-3 h-14 bg-blue-900 rounded-full origin-top shadow-md border-l border-white/10"
                                    />
                                </div>

                                {/* Gripped Item */}
                                <AnimatePresence>
                                    {pickedTool && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5, y: 0 }}
                                            animate={{ opacity: 1, scale: 1, y: 20 }}
                                            exit={{ opacity: 0, scale: 0.5, y: 10 }}
                                            className="absolute mt-24 p-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center font-bold text-blue-900 border-2 border-blue-900/10 min-w-[64px] min-h-[64px]"
                                        >
                                            <span className="text-xl tracking-tight">{pickedTool.icon}</span>
                                            <div className="absolute -inset-1 bg-blue-400/20 blur-xl rounded-full animate-pulse pointer-events-none" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>

                        {/* Bottom "Bin" for Tools */}
                        <div className="absolute bottom-0 left-0 w-full h-40 bg-white/40 backdrop-blur-md border-t border-blue-100 z-10">
                            <div className="relative w-full h-full flex items-center justify-center gap-6 px-12">
                                {TOOLS.map((tool, index) => {
                                    const isActive = pickedTool?.id === tool.id;
                                    const xPos = 15 + (index / (TOOLS.length - 1)) * 70;

                                    return (
                                        <motion.div
                                            key={tool.id}
                                            style={{
                                                position: 'absolute',
                                                left: `${xPos}%`,
                                                bottom: '24px'
                                            }}
                                            animate={{
                                                opacity: isActive ? 0 : 1,
                                                y: isActive ? -200 : 0,
                                                scale: isActive ? 0.8 : 1,
                                                rotate: (index % 2 === 0 ? 5 : -5)
                                            }}
                                            whileHover={{ scale: 1.1, rotate: 0, y: -5 }}
                                            className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-blue-100 flex items-center justify-center font-bold text-blue-900 group/item transition-shadow hover:shadow-2xl cursor-pointer"
                                        >
                                            <div
                                                className="absolute inset-2 rounded-xl opacity-0 group-hover/item:opacity-10 transition-opacity"
                                                style={{ backgroundColor: tool.color }}
                                            />
                                            <span className="text-lg relative z-10">{tool.icon}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Machine Decorative Elements */}
                        <div className="absolute top-6 right-6 flex gap-3 z-40">
                            <div className="w-12 h-4 bg-green-400/40 rounded-full blur-sm animate-pulse" />
                            <div className="w-12 h-4 bg-blue-400/40 rounded-full blur-sm" />
                        </div>
                    </div>

                    {/* Machine Controls Underneath (Visual only) */}
                    <div className="mt-8 flex justify-center items-center gap-12">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center p-3">
                                <div className="w-full h-full rounded-full bg-red-500 shadow-inner flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white/30" />
                                </div>
                            </div>
                            <span className="font-mono text-[10px] text-[#a8a39a] uppercase tracking-widest">Action</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-6 bg-white rounded-full shadow-inner relative">
                                <motion.div
                                    style={{ left: `${smoothClawX.get()}%` }}
                                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0c0c0a] shadow-lg flex items-center justify-center"
                                >
                                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                                </motion.div>
                            </div>
                            <span className="font-mono text-[10px] text-[#a8a39a] uppercase tracking-widest">Navigation</span>
                        </div>
                    </div>
                </div>

                {/* Dynamic Detail Card */}
                <div className="mt-16 md:mt-24 min-h-[160px]">
                    <AnimatePresence mode="wait">
                        {selectedTool ? (
                            <motion.div
                                key={selectedTool.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-center bg-white p-8 md:p-12 rounded-[32px] shadow-xl border border-blue-50"
                            >
                                <div
                                    className="w-24 h-24 md:w-full md:h-auto md:aspect-square rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl relative overflow-hidden"
                                    style={{ backgroundColor: selectedTool.color }}
                                >
                                    {selectedTool.name[0]}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <h3 className="text-3xl font-bold text-[#0c0c0a]">{selectedTool.name}</h3>
                                        <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                                            Standard
                                        </div>
                                    </div>
                                    <p className="text-xl text-[#2b2926] leading-relaxed max-w-3xl font-medium">
                                        {selectedTool.context}
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-1 h-12 bg-blue-100 rounded-full mb-6" />
                                <p className="text-[#a8a39a] font-mono text-sm uppercase tracking-[0.3em] font-medium">
                                    Operate the machine to view specs
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
