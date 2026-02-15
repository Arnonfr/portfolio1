import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tool {
    id: string;
    name: string;
    logo: string;
}

const TOOLS: Tool[] = [
    { id: 'figma', name: 'Figma', logo: '/images/tools/figma.svg' },
    { id: 'ps', name: 'Photoshop', logo: '/images/tools/photoshop.svg' },
    { id: 'ai', name: 'Illustrator', logo: '/images/tools/illustrator.svg' },
    { id: 'id', name: 'InDesign', logo: '/images/tools/indesign.svg' },
    { id: 'ae', name: 'After Effects', logo: '/images/tools/aftereffects.svg' },
    { id: 'xd', name: 'Adobe XD', logo: '/images/tools/xd.svg' },
    { id: 'figmamake', name: 'Figma Make', logo: '/images/tools/figmamake.svg' },
    { id: 'cursor', name: 'Cursor', logo: '/images/tools/cursor.svg' },
    { id: 'codex', name: 'Codex', logo: '/images/tools/codex.png' },
    { id: 'chatgpt', name: 'ChatGPT', logo: '/images/tools/chatgpt.svg' },
    { id: 'googleaistudio', name: 'Google AI Studio', logo: '/images/tools/googleaistudio.svg' },
    { id: 'notebooklm', name: 'NotebookLM', logo: '/images/tools/notebooklm.svg' },
    { id: 'vscode', name: 'VS Code', logo: '/images/tools/vscode.svg' },
    { id: 'github', name: 'GitHub', logo: '/images/tools/github.svg' },
    { id: 'tailwind', name: 'Tailwind', logo: '/images/tools/tailwind.svg' },
    { id: 'jira', name: 'Jira', logo: '/images/tools/jira.svg' },
    { id: 'claude', name: 'Claude', logo: '/images/tools/claude.svg' },
    { id: 'webflow', name: 'Webflow', logo: '/images/tools/webflow.svg' },
    { id: 'antigravity', name: 'Antigravity', logo: '/images/tools/antigravity.webp' },
    { id: 'arc', name: 'Arc', logo: '/images/tools/arc.svg' },
    { id: 'slack', name: 'Slack', logo: '/images/tools/slack.svg' },
    { id: 'linear', name: 'Linear', logo: '/images/tools/linear.svg' },
    { id: 'uxpilot', name: 'UX Pilot', logo: '/images/tools/ux-pilot.png' },
    { id: 'framer', name: 'Framer', logo: '/images/tools/framer.svg' },
    { id: 'react', name: 'React', logo: '/images/tools/react.svg' },
];

const ICON_SIZE = 56;
const CONTAINER_H = 500;
const MOBILE_ICON_SIZE = 44;
const MOBILE_CONTAINER_H = 400;

// Seeded pseudo-random for deterministic layout
const rand = (seed: number) => {
    const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
};

// Spread-out pile — items scattered on surface, some leaning against edges
const PILE_POSITIONS = (() => {
    const count = TOOLS.length;
    const positions: { x: number; y: number; rotation: number; zIndex: number }[] = [];

    // Loose layers with wide spread
    const layers: number[] = [];
    let remaining = count;
    let layerSize = Math.round(count * 0.35);
    while (remaining > 0) {
        const n = Math.min(remaining, Math.max(2, layerSize));
        layers.push(n);
        remaining -= n;
        layerSize = Math.max(2, layerSize - 2);
    }
    if (layers.length > 1 && layers[layers.length - 1] === 1) {
        layers[layers.length - 2] += 1;
        layers.pop();
    }

    let idx = 0;
    const totalLayers = layers.length;
    layers.forEach((n, li) => {
        const layerT = li / Math.max(1, totalLayers - 1);

        // Y: bottom at ~93%, top at ~42%
        const yBase = 93 - li * (51 / Math.max(1, totalLayers - 1));

        // Wide spread that narrows slightly toward top
        const halfSpread = 38 * (1 - layerT * 0.45);

        const maxRot = 8 + layerT * 20;

        for (let i = 0; i < n; i++) {
            const t = n > 1 ? i / (n - 1) : 0.5;
            const baseX = 50 - halfSpread + t * halfSpread * 2;
            const xJitter = (rand(idx * 7 + 1) - 0.5) * 10;
            const x = Math.max(8, Math.min(92, baseX + xJitter));

            const yJitter = (rand(idx * 13 + 3) - 0.5) * 6;
            const y = Math.max(35, Math.min(96, yBase + yJitter));

            // Wall lean: items at edges tilt toward center
            const distFromCenter = (x - 50) / 50;
            const wallLean = -distFromCenter * 10;
            const randomRot = (rand(idx * 11 + 7) - 0.5) * maxRot * 2;

            positions.push({
                x,
                y,
                rotation: wallLean + randomRot,
                zIndex: li * 10 + i + 1,
            });
            idx++;
        }
    });

    return positions;
})();

export const DigitalStack: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pickedTools, setPickedTools] = useState<Tool[]>([]);
    const [isClawing, setIsClawing] = useState(false);
    const [isGrabbing, setIsGrabbing] = useState(false); // prongs closed around item
    const [pickedTool, setPickedTool] = useState<Tool | null>(null);
    const [mouseYPercent, setMouseYPercent] = useState(0);
    const [grabTargetY, setGrabTargetY] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    const mouseX = useMotionValue(50);
    const smoothClawX = useSpring(mouseX, { stiffness: 150, damping: 22 });
    const clawLeftPercent = useTransform(smoothClawX, (v: number) => `${v}%`);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const activeIconSize = isMobile ? MOBILE_ICON_SIZE : ICON_SIZE;
    const activeContainerH = isMobile ? MOBILE_CONTAINER_H : CONTAINER_H;

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isClawing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(Math.min(Math.max(x, 5), 95));
        setMouseYPercent(Math.min(Math.max(y, 0), 100));
    }, [isClawing, mouseX]);

    const findClosestTool = useCallback((xPercent: number, yPercent: number): { tool: Tool; index: number } | null => {
        let closest = -1;
        let minDist = Infinity;
        PILE_POSITIONS.forEach((pos, idx) => {
            if (pickedTools.some(t => t.id === TOOLS[idx].id)) return;
            const dx = pos.x - xPercent;
            const dy = pos.y - yPercent;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
                minDist = dist;
                closest = idx;
            }
        });
        if (closest === -1) return null;
        return { tool: TOOLS[closest], index: closest };
    }, [pickedTools]);

    const startClaw = useCallback(() => {
        if (isClawing) return;
        setIsClawing(true);
        setIsGrabbing(false);

        const currentX = smoothClawX.get();
        const currentY = mouseYPercent;
        const result = findClosestTool(currentX, currentY);

        if (!result) {
            setIsClawing(false);
            return;
        }

        const { tool, index } = result;
        const targetPos = PILE_POSITIONS[index];
        // Stop cable so prong tips align with the icon (hub + prongs = ~70px)
        const targetCableLength = Math.max(0, ((targetPos.y / 100) * activeContainerH) - 120);
        setGrabTargetY(targetCableLength);

        // Phase 1: Cable extends down (600ms) — prongs stay open
        setTimeout(() => {
            // Phase 2: Prongs close around the item
            setIsGrabbing(true);
            setPickedTool(tool);

            // Phase 3: After closing (400ms), retract cable with item
            setTimeout(() => {
                setPickedTools(prev => [...prev, tool]);
                setGrabTargetY(0);

                // Phase 4: After retracting (500ms), release
                setTimeout(() => {
                    setIsClawing(false);
                    setIsGrabbing(false);
                    setPickedTool(null);
                }, 500);
            }, 400);
        }, 600);
    }, [isClawing, smoothClawX, mouseYPercent, findClosestTool, activeContainerH]);

    const idleCableLength = Math.max(20, (mouseYPercent / 100) * activeContainerH * 0.4);
    const cableLength = isClawing ? grabTargetY : idleCableLength;

    return (
        <section className="relative w-full bg-[#f4f3f1] py-20 md:py-28 overflow-hidden">
            <div className="relative px-container max-w-7xl mx-auto z-10">
                <div className="mb-12">
                    <span className="font-mono text-[0.6875rem] font-semibold text-[#a8a39a] tracking-[0.2em] uppercase block mb-4">
                        Stack & Expertise
                    </span>
                    <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-[#0c0c0a] leading-[0.9] tracking-[-0.04em] uppercase">
                        My Tools<br />& Skills
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-0">
                    <div className="w-full md:w-3/4 flex-shrink-0">
                        <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onClick={startClaw}
                            className="relative w-full cursor-crosshair pt-8"
                            style={{ height: activeContainerH }}
                        >
                            {/* Rail — brushed metal bar */}
                            <div className="absolute top-10 left-0 right-0 z-40">
                                {/* Top highlight edge */}
                                <div className="h-[1px] bg-white/40" />
                                {/* Main rail body */}
                                <div className="h-3 shadow-md relative overflow-hidden"
                                    style={{ background: 'linear-gradient(180deg, #c8c3ba 0%, #b8b3aa 20%, #9d988f 50%, #8b8680 80%, #7a756e 100%)' }}>
                                    {/* Brushed texture */}
                                    <div className="absolute inset-0 opacity-[0.08]"
                                        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, white 1px, white 2px)' }} />
                                </div>
                                {/* Bottom shadow edge */}
                                <div className="h-[2px] bg-gradient-to-b from-[#6b6660] to-transparent" />
                            </div>

                            <motion.div
                                className="absolute top-8 flex flex-col items-center pointer-events-none"
                                style={{ left: clawLeftPercent, x: '-50%', zIndex: 200 }}
                            >
                                {/* Carriage */}
                                <div className="relative">
                                    <div className="w-12 h-6 bg-gradient-to-b from-[#9d988f] via-[#b8b3aa] to-[#8b8680] rounded-b-lg shadow-lg" />
                                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-gradient-to-b from-[#d4cfc7] to-[#bfbab2] rounded-sm" />
                                    <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-[#6b6660] shadow-inner" />
                                    <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-[#6b6660] shadow-inner" />
                                </div>

                                {/* Cable */}
                                <motion.div
                                    animate={{ height: cableLength }}
                                    transition={{ duration: isClawing ? 0.6 : 0.12, ease: isClawing ? [0.33, 1, 0.68, 1] : 'linear' }}
                                    className="w-[2px] bg-gradient-to-b from-[#8b8680] to-[#6b6660] origin-top shadow-sm"
                                    style={{ minHeight: 24 }}
                                />

                                {/* Claw — 2 prongs */}
                                <motion.div
                                    animate={{ rotate: isGrabbing ? [0, 3, -3, 0] : 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative flex flex-col items-center"
                                >
                                    {/* Hub */}
                                    <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#b8b3aa] via-[#9d988f] to-[#8b8680] shadow-lg">
                                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#d4cfc7] to-[#bfbab2]" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6b6660] shadow-inner" />
                                    </div>

                                    {/* Fingers — spread apart when grabbing to hug icon from sides */}
                                    <div className="flex gap-0.5 -mt-1 relative">
                                        <motion.div
                                            animate={{
                                                rotate: isGrabbing ? 12 : (isClawing ? 35 : 20),
                                                x: isGrabbing ? -16 : 0,
                                            }}
                                            transition={{ type: 'spring', stiffness: 250, damping: 12 }}
                                            className="relative w-[4px] h-12 bg-gradient-to-b from-[#9d988f] to-[#6b6660] rounded-full origin-top shadow-md"
                                        >
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#8b8680] shadow-sm" />
                                        </motion.div>
                                        <motion.div
                                            animate={{
                                                rotate: isGrabbing ? -12 : (isClawing ? -35 : -20),
                                                x: isGrabbing ? 16 : 0,
                                            }}
                                            transition={{ type: 'spring', stiffness: 250, damping: 12 }}
                                            className="relative w-[4px] h-12 bg-gradient-to-b from-[#9d988f] to-[#6b6660] rounded-full origin-top shadow-md"
                                        >
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#8b8680] shadow-sm" />
                                        </motion.div>
                                    </div>

                                    {/* Gripped item — in front of prongs, they hug from sides */}
                                    <AnimatePresence>
                                        {pickedTool && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute bg-white rounded-xl p-2 shadow-xl border border-gray-100 z-10"
                                                style={{ top: '24px' }}
                                            >
                                                <img src={pickedTool.logo} alt={pickedTool.name} className="w-9 h-9 object-contain" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>

                            {TOOLS.map((tool, index) => {
                                const pos = PILE_POSITIONS[index];
                                const isGrabbed = pickedTools.some(t => t.id === tool.id);

                                return (
                                    <motion.div
                                        key={tool.id}
                                        className="absolute group"
                                        style={{
                                            left: `${pos.x}%`,
                                            top: `${pos.y}%`,
                                            width: activeIconSize + 16,
                                            height: activeIconSize + 16,
                                            marginLeft: -(activeIconSize + 16) / 2,
                                            marginTop: -(activeIconSize + 16) / 2,
                                            zIndex: pos.zIndex,
                                        }}
                                        initial={{ opacity: 0, y: 40, rotate: pos.rotation, scale: 0.8 }}
                                        whileInView={{
                                            opacity: isGrabbed ? 0.2 : 1,
                                            y: 0,
                                            rotate: pos.rotation,
                                            scale: 1
                                        }}
                                        viewport={{ once: true }}
                                        animate={{
                                            opacity: isGrabbed ? 0.2 : 1,
                                            scale: isGrabbed ? 0.5 : 1,
                                            filter: isGrabbed ? 'grayscale(100%)' : 'grayscale(0%)',
                                        }}
                                        whileHover={!isGrabbed ? {
                                            scale: 1.15,
                                            rotate: 0,
                                            zIndex: 70,
                                            y: -4,
                                            transition: { duration: 0.2, ease: 'easeOut' }
                                        } : undefined}
                                        transition={{
                                            duration: 0.35,
                                            delay: index * 0.015,
                                            ease: [0.34, 1.56, 0.64, 1]
                                        }}
                                    >
                                        <div className="relative w-full h-full">
                                            <div className="absolute inset-0 bg-black/5 rounded-xl blur-sm translate-y-1" />
                                            <div className="relative w-full h-full bg-white rounded-xl p-2 shadow-lg border border-gray-100 group-hover:shadow-2xl group-hover:border-gray-200 transition-all duration-200">
                                                <img
                                                    src={tool.logo}
                                                    alt={tool.name}
                                                    className="w-full h-full object-contain pointer-events-none"
                                                    draggable={false}
                                                />
                                            </div>
                                            {!isGrabbed && (
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-300 pointer-events-none" />
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full md:w-1/4 flex flex-col items-center justify-end pb-4 md:pl-8 min-h-[200px]">
                        {pickedTools.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-center items-end">
                                {pickedTools.map((tool) => {
                                    // Deterministic "landing" rotation based on tool id
                                    const charSum = tool.id.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
                                    const landRotation = ((charSum * 7) % 30) - 15;

                                    return (
                                        <motion.div
                                            key={tool.id}
                                            initial={{ opacity: 0, y: -300, rotate: landRotation * 2, scale: 0.6 }}
                                            animate={{ opacity: 1, y: 0, rotate: landRotation, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                damping: 12,
                                                stiffness: 120,
                                                mass: 0.8,
                                            }}
                                            className="relative group"
                                        >
                                            <div className="relative w-14 h-14 bg-white rounded-xl p-2 shadow-lg border border-gray-100">
                                                <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                                            </div>
                                            <p className="text-[9px] text-[#8b8680] text-center mt-1 font-mono font-medium truncate max-w-[56px]">
                                                {tool.name}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
