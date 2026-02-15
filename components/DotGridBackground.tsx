
import React, { useEffect, useRef } from 'react';

export const DotGridBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        const spacing = 45;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            width = parent.clientWidth;
            height = parent.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();

        const draw = (time: number) => {
            ctx.clearRect(0, 0, width, height);
            
            const cols = Math.ceil(width / spacing);
            const rows = Math.ceil(height / spacing);
            const threshold = 180;

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    
                    const dx = x - mouseRef.current.x;
                    const dy = y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Draw dot - smaller, lighter, ethereal blue
                    const active = dist < threshold;
                    const dotPulse = active ? Math.sin(time * 0.005) * 0.3 + 1.2 : 1;
                    
                    ctx.fillStyle = active 
                        ? `rgba(0, 160, 255, 0.6)` 
                        : `rgba(168, 163, 154, 0.2)`;
                        
                    ctx.beginPath();
                    ctx.arc(x, y, (active ? 1.2 : 0.8) * dotPulse, 0, Math.PI * 2);
                    ctx.fill();

                    if (active) {
                        const opacity = (1 - dist / threshold) * 0.4;
                        ctx.strokeStyle = `rgba(0, 140, 255, ${opacity})`;
                        ctx.lineWidth = 0.6;

                        // Connect to neighbors with more "interesting" logic
                        // Only connect if neighbor is also near mouse
                        const neighbors = [[i + 1, j], [i, j + 1], [i + 1, j + 1]];
                        neighbors.forEach(([ni, nj]) => {
                            if (ni <= cols && nj <= rows) {
                                const nx = ni * spacing;
                                const ny = nj * spacing;
                                const ndx = nx - mouseRef.current.x;
                                const ndy = ny - mouseRef.current.y;
                                if (Math.sqrt(ndx * ndx + ndy * ndy) < threshold) {
                                    ctx.beginPath();
                                    ctx.moveTo(x, y);
                                    ctx.lineTo(nx, ny);
                                    ctx.stroke();
                                }
                            }
                        });
                    }
                }
            }
            requestAnimationFrame(draw);
        };

        const rafId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-100 z-0"
        />
    );
};
