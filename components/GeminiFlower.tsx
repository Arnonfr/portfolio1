import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const GeminiFlower = ({ className = "" }: { className?: string }) => {
    const mouseX = useMotionValue(0.5);

    // Spring for the mouse tracking (very subtle to preserve geometry)
    const springX = useSpring(mouseX, { stiffness: 35, damping: 25 });

    // Safe, subtle rotation that gives the illusion of organic turning
    const topRotate = useTransform(springX, [0, 1], [-5, 5]);
    const tipRotate = useTransform(springX, [0, 1], [-8, 8]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX]);

    // Lupine properties
    const flowerNodes = Array.from({ length: 26 }).map((_, i) => {
        const progress = i / 25;

        // Distribute from Y=400 to Y=130
        const y = 400 - (progress * 270);

        // Spread tapers off at the top
        const spread = (1 - Math.pow(progress, 1.5)) * 22;
        const isLeft = i % 2 === 0;
        const x = isLeft ? -spread : spread;

        // Scale tapers at the top
        const scale = 1.1 - (progress * 0.7);

        // Randomize angle slightly for organic look
        const angleBase = isLeft ? -25 : 25;
        const angleTaper = progress * 35;
        const angle = isLeft ? angleBase + angleTaper : angleBase - angleTaper;

        // Top 20% are green buds, rest are indigo flowers
        const isBud = progress > 0.82;

        return (
            <g key={i} transform={`translate(${x}, ${y}) scale(${scale}) rotate(${angle})`}>
                {isBud ? (
                    <g>
                        <path d="M 0 0 C -12 -15, 0 -35, 0 -35 C 0 -35, 12 -15, 0 0" fill="#aecb7b" />
                        <path d="M 0 0 C -5 -10, 0 -20, 0 -20 C 0 -20, 5 -10, 0 0" fill="#c3d999" />
                    </g>
                ) : (
                    <g>
                        {/* Back Petal - broad and round */}
                        <path d="M 0 0 C -30 -25, 0 -50, 0 -50 C 0 -50, 30 -25, 0 0" fill="#5867b3" />
                        {/* Secondary Layer - lighter */}
                        <path d="M 0 0 C -20 -15, 0 -40, 0 -40 C 0 -40, 20 -15, 0 0" fill="#6976bf" />
                        {/* Inner Petal - darker, cup shaped */}
                        <path d="M 0 5 C -15 -10, 0 -25, 0 -25 C 0 -25, 15 -10, 0 5" fill="#435092" />
                        {/* Small lip */}
                        <path d="M -5 -12 C 0 -8, 5 -12, 0 -18 C -5 -12, -5 -12, -5 -12" fill="#8895db" />
                    </g>
                )}
            </g>
        );
    });

    return (
        <div className={`relative ${className} pointer-events-none`}>
            <style>{`
          .lupine-wind {
            transform-origin: 50% 100%;
            animation: lupine-sway 8s ease-in-out infinite alternate;
          }
          @keyframes lupine-sway {
            0% { transform: rotate(-1.5deg); }
            100% { transform: rotate(1.5deg); }
          }
          .lupine-leaf { fill: #84a96b; opacity: 0.95; }
          .lupine-stem { stroke: #84a96b; stroke-width: 9; stroke-linecap: round; fill: none; }
          .lupine-stalk { stroke: #84a96b; stroke-width: 3.5; fill: none; stroke-linecap: round; }
       `}</style>

            <svg viewBox="0 0 400 800" className="w-full h-full overflow-visible lupine-wind">
                {/* Main animated group hooked to mouse */}
                <motion.g
                    style={{ originX: "200px", originY: "800px", rotate: topRotate }}
                >
                    {/* The single sturdy stem */}
                    <path d="M 200 800 Q 200 600 200 400" className="lupine-stem" />

                    {/* Base Leaves - Left Palmate */}
                    <g transform="translate(200, 620)">
                        <path d="M 0 0 Q -40 -15 -80 -20" className="lupine-stalk" />
                        <g transform="translate(-80, -20) scale(1.4)">
                            {[0, 45, 90, 135, 180, 225, 270].map((rot, idx) => (
                                <path key={idx} d="M 0 0 C 8 -25, 0 -60, 0 -60 C 0 -60, -8 -25, 0 0" className="lupine-leaf" transform={`rotate(${rot - 135})`} />
                            ))}
                        </g>
                    </g>

                    {/* Base Leaves - Right Palmate */}
                    <g transform="translate(200, 520)">
                        <path d="M 0 0 Q 30 -15 60 -25" className="lupine-stalk" />
                        <g transform="translate(60, -25) scale(1.1)">
                            {[0, 60, 120, 180, 240, 300].map((rot, idx) => (
                                <path key={idx} d="M 0 0 C 6 -20, 0 -45, 0 -45 C 0 -45, -6 -20, 0 0" className="lupine-leaf" transform={`rotate(${rot - 90})`} />
                            ))}
                        </g>
                    </g>

                    {/* Top flower segment - bends a little more */}
                    <motion.g style={{ originX: "200px", originY: "400px", rotate: tipRotate }}>
                        <path d="M 200 400 L 200 130" className="lupine-stem" strokeWidth="7" />

                        {/* Shift to stem center */}
                        <g transform="translate(200, 0)">
                            {flowerNodes}
                            {/* Very top tip bud */}
                            <path d="M 0 130 C -6 110, 0 95, 0 95 C 0 95, 6 110, 0 130" fill="#aecb7b" />
                            <path d="M 0 130 C -2 115, 0 100, 0 100 C 0 100, 2 115, 0 130" fill="#c3d999" />
                        </g>
                    </motion.g>
                </motion.g>
            </svg>
        </div>
    );
};
