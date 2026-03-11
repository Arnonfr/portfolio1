import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const TulipIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Elegant, organic palmate leaf
    const renderLeaf = (cx: number, cy: number, scale: number, rotation: number) => {
        // 7 leaflets per cluster
        const angles = [0, 51, 102, 153, 204, 255, 306];
        return (
            <g transform={`translate(${cx}, ${cy}) rotate(${rotation}) scale(${scale})`}>
                {angles.map((angle, i) => (
                    <path
                        key={i}
                        d="M 0 0 C 5 -25, 2 -55, 0 -70 C -2 -55, -5 -25, 0 0 Z"
                        fill="#8fa37a"
                        transform={`rotate(${angle - 153})`}
                    />
                ))}
                {angles.map((angle, i) => (
                    <path
                        key={`detail-${i}`}
                        d="M 0 0 L 0 -60"
                        stroke="#758a62"
                        strokeWidth="1"
                        fill="none"
                        transform={`rotate(${angle - 153})`}
                    />
                ))}
            </g>
        );
    };

    // Structured flower cluster
    const renderFlowers = () => {
        const flowers = [];
        const rows = 18;
        for (let r = 0; r < rows; r++) {
            const progress = r / (rows - 1);
            const y = 300 - progress * 220;
            const width = 28 * Math.cos(progress * Math.PI / 2);

            const count = Math.max(1, Math.floor(5 * Math.cos(progress * Math.PI / 2)));

            for (let i = 0; i < count; i++) {
                const xProg = count > 1 ? (i / (count - 1)) : 0.5;
                const x = -width + (xProg * width * 2);
                // Stagger/jitter x based on row for an organic look
                const jitterX = Math.sin(r * 4 + i) * 3;
                const finalX = x + jitterX;

                const scale = 0.5 + (0.5 * (1 - progress));
                const isBud = progress > 0.85;
                const angle = (finalX / 28) * 35;

                if (isBud) {
                    flowers.push(
                        <g key={`bud-${r}-${i}`} transform={`translate(${finalX}, ${y}) scale(${scale}) rotate(${angle})`}>
                            <path d="M 0 0 C -4 -8, -4 -16, 0 -22 C 4 -16, 4 -8, 0 0" fill="#a4ba8c" />
                            <path d="M 0 0 C -2 -6, -2 -12, 0 -16 C 2 -12, 2 -6, 0 0" fill="#7d91af" />
                        </g>
                    );
                } else {
                    const primaryColor = (r % 3 === 0) ? '#4a569d' : '#5f6db3';
                    const innerColor = '#8b96d4';
                    const shadowColor = '#3a4478';

                    flowers.push(
                        <g key={`fl-${r}-${i}`} transform={`translate(${finalX}, ${y}) scale(${scale}) rotate(${angle})`}>
                            {/* Main petal */}
                            <path d="M 0 0 C -20 -10, -25 -30, -10 -40 C 0 -45, 15 -30, 0 0" fill={primaryColor} />
                            {/* Inner lighter petal */}
                            <path d="M 0 0 C -12 -5, -16 -20, -6 -28 C 2 -35, 10 -20, 0 0" fill={innerColor} />
                            {/* Center darker detail */}
                            <path d="M 0 -2 C -5 -8, -6 -16, -2 -22 C 2 -26, 6 -16, 0 -2" fill={shadowColor} />
                        </g>
                    );
                }
            }
        }

        // Top-most tip
        flowers.push(
            <g key="tip" transform="translate(0, 75)">
                <path d="M 0 0 C -3 -8, -2 -12, 0 -18 C 2 -12, 3 -8, 0 0" fill="#a4ba8c" />
            </g>
        );

        return flowers;
    };

    return (
        <div ref={ref} className={`relative group pointer-events-auto cursor-pointer flex items-center justify-center ${className}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -3 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full origin-bottom"
            >
                <motion.div
                    animate={{ rotate: [0, 2, -1, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full flex items-center justify-center origin-bottom transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:scale-[0.85] group-hover:-rotate-4"
                >
                    <svg viewBox="0 0 240 600" className="w-[85%] h-full" style={{ overflow: 'visible', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.08))' }}>
                        {/* Stalk */}
                        <path d="M 120 600 Q 125 350 120 80" fill="none" stroke="#7e9e62" strokeWidth="5" strokeLinecap="round" />

                        {/* Leaves */}
                        {/* Left lower leaf */}
                        <path d="M 121 480 Q 80 460 60 470" fill="none" stroke="#7e9e62" strokeWidth="3" />
                        {renderLeaf(60, 470, 0.7, -30)}

                        {/* Right upper leaf */}
                        <path d="M 122 380 Q 160 350 180 340" fill="none" stroke="#7e9e62" strokeWidth="2.5" />
                        {renderLeaf(180, 340, 0.55, 45)}

                        {/* Flower Cluster */}
                        <g transform="translate(120, 0)">
                            {renderFlowers()}
                        </g>
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};
