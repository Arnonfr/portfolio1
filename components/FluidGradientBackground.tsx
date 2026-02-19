
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const FluidGradientBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse values - increased range for more visibility
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs - slightly faster for more responsive "push"
    const springX = useSpring(mouseX, { stiffness: 60, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 15 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Increased multiplier for much more visible movement
            const x = (e.clientX - rect.left - rect.width / 2) / 10;
            const y = (e.clientY - rect.top - rect.height / 2) / 10;

            mouseX.set(-x);
            mouseY.set(-y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Stronger parallax transforms
    const moveX1 = useTransform(springX, (v) => v * 2.5);
    const moveY1 = useTransform(springY, (v) => v * 2.5);

    const moveX2 = useTransform(springX, (v) => v * -1.8);
    const moveY2 = useTransform(springY, (v) => v * -1.8);

    const moveX3 = useTransform(springX, (v) => v * 1.2);
    const moveY3 = useTransform(springY, (v) => v * 1.2);

    // Higher contrast colors for better visibility
    const BLOB_1_COLOR = '#d6d1c7'; // Darker sand
    const BLOB_2_COLOR = '#abbfdc'; // Muted classic blue
    const BLOB_3_COLOR = '#c2baa6'; // Earthy olive/gold hint

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            style={{ backgroundColor: '#f4f3f1' }}
        >
            {/* 1. Procedural Noise Overlay - Guaranteed to work offline/anywhere */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-overlay z-20 pointer-events-none">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            {/* 2. Glass Shine Overlay */}
            <div className="absolute inset-0 z-30 opacity-[0.1] bg-gradient-to-br from-white via-transparent to-black pointer-events-none" />

            {/* Blob 1 */}
            <motion.div
                className="absolute -top-[20%] -left-[10%] w-[90%] h-[90%] rounded-full opacity-[0.75] mix-blend-multiply"
                style={{
                    x: moveX1,
                    y: moveY1,
                    background: `radial-gradient(circle, ${BLOB_1_COLOR} 0%, rgba(244, 243, 241, 0) 75%)`,
                    filter: 'blur(60px)',
                }}
            />

            {/* Blob 2 */}
            <motion.div
                className="absolute top-[10%] -right-[10%] w-[80%] h-[80%] rounded-full opacity-[0.6] mix-blend-multiply"
                style={{
                    x: moveX2,
                    y: moveY2,
                    background: `radial-gradient(circle, ${BLOB_2_COLOR} 0%, rgba(244, 243, 241, 0) 75%)`,
                    filter: 'blur(90px)',
                }}
            />

            {/* Blob 3 */}
            <motion.div
                className="absolute -bottom-[20%] left-[10%] w-[75%] h-[75%] rounded-full opacity-[0.55] mix-blend-multiply"
                style={{
                    x: moveX3,
                    y: moveY3,
                    background: `radial-gradient(circle, ${BLOB_3_COLOR} 0%, rgba(244, 243, 241, 0) 75%)`,
                    filter: 'blur(70px)',
                }}
            />
        </div>
    );
};
