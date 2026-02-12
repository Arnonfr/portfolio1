
import React, { useEffect, useRef } from 'react';

export const MagneticLines: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineOffsets = useRef<{x: number, y: number}[]>([]);
  const containerRectRef = useRef<DOMRect | null>(null);
  
  const mouseRef = useRef({ x: -1000, y: -1000 }); 
  const ballRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 }); 
  const lineStates = useRef<{force: number, angle: number}[]>([]);
  const rafRef = useRef<number>(0);
  const ballElementRef = useRef<HTMLDivElement>(null);

  const rows = 12; // Reduced slightly for better mobile performance
  const cols = 18;
  const totalLines = rows * cols;

  useEffect(() => {
    if (lineStates.current.length !== totalLines) {
        lineStates.current = new Array(totalLines).fill(0).map(() => ({ force: 0, angle: 0 }));
    }

    const calculateLayout = () => {
      if (!linesRef.current.length || !containerRef.current) return;
      containerRectRef.current = containerRef.current.getBoundingClientRect();
      const containerRect = containerRectRef.current;
      
      lineOffsets.current = linesRef.current.map(line => {
        if (!line) return { x: 0, y: 0 };
        const rect = line.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      });
    };

    const timeoutId = setTimeout(calculateLayout, 200);
    window.addEventListener('resize', calculateLayout);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (ballRef.current.x === -1000) {
        ballRef.current.x = e.clientX;
        ballRef.current.y = e.clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      if (!containerRectRef.current) {
        rafRef.current = requestAnimationFrame(update);
        return;
      }
      
      const containerRect = containerRectRef.current;
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Adjusted stiffness as per user request
      const stiffness = 0.05; 
      const damping = 0.85;   

      const dx = targetX - ballRef.current.x;
      const dy = targetY - ballRef.current.y;

      ballRef.current.vx += dx * stiffness;
      ballRef.current.vy += dy * stiffness;
      ballRef.current.vx *= damping;
      ballRef.current.vy *= damping;
      ballRef.current.x += ballRef.current.vx;
      ballRef.current.y += ballRef.current.vy;

      if (ballElementRef.current) {
         const ballX = ballRef.current.x - containerRect.left;
         const ballY = ballRef.current.y - containerRect.top;
         ballElementRef.current.style.transform = `translate3d(${ballX}px, ${ballY}px, 0) translate(-50%, -50%)`;
      }

      for (let i = 0; i < totalLines; i++) {
        const line = linesRef.current[i];
        if (!line) continue;
        
        const offset = lineOffsets.current[i];
        if (!offset) continue;

        const lineX = containerRect.left + offset.x;
        const lineY = containerRect.top + offset.y;

        const lx = lineX - ballRef.current.x;
        const ly = lineY - ballRef.current.y;
        const distSq = lx * lx + ly * ly;
        
        // Adjusted radius as per user request
        const radius = 450; 
        const radiusSq = radius * radius;

        let targetForce = 0;
        let targetAngle = lineStates.current[i].angle;

        if (distSq < radiusSq) {
           const dist = Math.sqrt(distSq);
           targetForce = 1 - (dist / radius); 
           targetAngle = Math.atan2(ly, lx); 
        }

        const currentState = lineStates.current[i];
        const attackSpeed = 0.15; 
        const decaySpeed = 0.03;

        if (targetForce > currentState.force) {
            currentState.force += (targetForce - currentState.force) * attackSpeed;
        } else {
            currentState.force += (targetForce - currentState.force) * decaySpeed;
        }

        if (distSq < radiusSq) currentState.angle = targetAngle;

        const force = currentState.force;
        if (force > 0.01) {
            const rot = (currentState.angle - Math.PI / 2) * force;
            const tilt = force * 30; 
            const scale = 0.2 + (force * 0.7);
            
            line.style.transform = `rotateZ(${rot}rad) rotateX(${tilt}deg) scaleY(${scale})`;
            line.style.opacity = (0.2 + force * 0.6).toString();
            line.style.backgroundColor = `rgb(${11 + force*100}, ${30 + force*120}, ${59 + force*150})`;
        } else {
           line.style.transform = 'rotateZ(0rad) rotateX(0deg) scaleY(0.2)';
           line.style.opacity = '0.2';
           line.style.backgroundColor = '#0B1E3B';
        }
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateLayout);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
      <div ref={ballElementRef} className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500 opacity-20 blur-[120px] will-change-transform" />
      <div 
        className="w-full h-full grid relative z-10"
        style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            perspective: '1200px',
        }}
      >
        {Array.from({ length: totalLines }).map((_, i) => (
            <div key={i} className="flex items-center justify-center w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                <div 
                    ref={(el) => { linesRef.current[i] = el; }}
                    className="w-[1.5px] h-10 bg-[#0B1E3B] origin-center rounded-full will-change-transform"
                    style={{ transform: 'scaleY(0.2)', opacity: 0.2 }}
                />
            </div>
        ))}
      </div>
    </div>
  );
};
