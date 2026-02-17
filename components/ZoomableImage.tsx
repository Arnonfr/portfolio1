import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    zoomLevel?: number;
    enabled?: boolean; // New prop to easily toggle zoom on/off
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
    src,
    alt,
    className = '',
    containerClassName = '',
    zoomLevel = 4, // Increased zoom level
    enabled = true
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Position of the mouse relative to the image (0 to 100)
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    // Smooth movement
    const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

    // detail window stays centered relative to cursor
    const detailX = useTransform(springX, (v) => `${v}%`);
    const detailY = useTransform(springY, (v) => `${v}%`);
    
    // Transform values for the background position inside the detail window
    const backgroundPosition = useTransform(
        [springX, springY],
        ([x, y]) => `${x}% ${y}%`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !enabled) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
        
        mouseX.set(Math.min(Math.max(xPercent, 0), 100));
        mouseY.set(Math.min(Math.max(yPercent, 0), 100));
    };

    if (!enabled) {
        return (
            <div className={`rounded-xl overflow-hidden border border-stone-200 shadow-sm ${containerClassName}`}>
                <img src={src} alt={alt} className={`w-full h-auto block ${className}`} />
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className={`relative cursor-none ${containerClassName}`}
            style={{ isolation: 'isolate' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* The base image */}
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-auto block transition-opacity duration-300 ${isHovered ? 'opacity-30' : 'opacity-100'} ${className}`}
                />
            </div>

            {/* The Floating Detail Window - Centered and larger */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute pointer-events-none z-50 overflow-hidden rounded-2xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] border-4 border-white bg-white"
                        style={{
                            width: '400px', // Larger window
                            height: '400px',
                            left: detailX,
                            top: detailY,
                            x: '-50%',
                            y: '-50%', // Perfectly centered on cursor
                        }}
                    >
                        <motion.div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundSize: `${zoomLevel * 100}%`,
                                backgroundPosition,
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">
                            Detail View ({zoomLevel}x)
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Minimal Targeting Reticle */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute pointer-events-none z-40 w-12 h-12 flex items-center justify-center"
                        style={{
                            left: detailX,
                            top: detailY,
                            x: '-50%',
                            y: '-50%',
                        }}
                    >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        <div className="absolute inset-0 border border-blue-500 rounded-full opacity-30 scale-75" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
