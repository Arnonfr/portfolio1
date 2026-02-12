
import React, { useEffect, useRef } from 'react';

interface Tool {
  label: string;
  color: string;
  textColor: string;
  icon?: string;
}

// Physics Object Interface
interface KeyCap {
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  vx: number;
  vy: number;
  // Removed dynamic angle state for locked rotation
  color: string;
  darkColor: string; // Calculated darker shade for 3D side
  label: string;
  textColor: string;
  icon?: HTMLImageElement;
  isDragging: boolean;
  mass: number;
  restitution: number; // Bounciness
}

const toolsData: Tool[] = [
  { label: 'Figma', color: '#0acf83', textColor: '#ffffff', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
  { label: 'React', color: '#20232a', textColor: '#61dafb', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  { label: 'Ps', color: '#001e36', textColor: '#31a8ff', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
  { label: 'Ai', color: '#330000', textColor: '#ff9a00', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg' },
  { label: 'Miro', color: '#ffd02f', textColor: '#050038', icon: 'https://cdn.worldvectorlogo.com/logos/miro-2.svg' },
  { label: 'Jira', color: '#2684ff', textColor: '#ffffff', icon: 'https://cdn.worldvectorlogo.com/logos/jira-3.svg' },
  { label: 'Notion', color: '#ffffff', textColor: '#000000', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png' },
  { label: 'Teams', color: '#5b5fc7', textColor: '#ffffff', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg' },
  { label: 'ChatGPT', color: '#74aa9c', textColor: '#ffffff', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
  { label: 'Gemini', color: '#4E88D4', textColor: '#ffffff', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
  { label: 'Make', color: '#6e3bff', textColor: '#ffffff', icon: 'https://images.seeklogo.com/logo-png/43/2/make-logo-png_seeklogo-434851.png' },
  { label: 'UX Pilot', color: '#2D3748', textColor: '#ffffff', icon: 'https://framerusercontent.com/images/7s82006z793077302.png' }, 
];

// Helper to darken hex color for 3D side
const darkenColor = (hex: string, percent: number) => {
  let num = parseInt(hex.replace("#",""),16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) - amt,
  B = (num >> 8 & 0x00FF) - amt,
  G = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};

interface ToolBubblesProps {
  printerBodyRef?: React.RefObject<HTMLDivElement | null>;
  printerPaperRef?: React.RefObject<HTMLDivElement | null>;
}

export const ToolBubbles: React.FC<ToolBubblesProps> = ({ printerBodyRef, printerPaperRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<KeyCap[]>([]);
  const requestRef = useRef<number>(0);
  const imagesLoadedRef = useRef(false);
  
  // Physics State
  const hasStartedRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, heldKey: null as KeyCap | null });
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Preload Logic
    const init = async () => {
      const loadPromises = toolsData.map(tool => {
        if (!tool.icon) return Promise.resolve(null);
        return new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = tool.icon!;
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null); 
        });
      });

      const loadedImages = await Promise.all(loadPromises);
      
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      const height = containerRef.current?.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Create Key Objects
      keysRef.current = toolsData.map((tool, index) => {
        const img = loadedImages[index];
        const size = 64; // Slightly smaller keycap size for better piling
        return {
          // Start ABOVE the screen
          x: Math.random() * (width - size),
          y: -100 - (Math.random() * 1000), // More spread out vertically for staggered fall
          w: size,
          h: size,
          depth: 10,
          vx: (Math.random() - 0.5) * 2, // Minimal horizontal drift
          vy: 0,
          color: tool.color,
          darkColor: darkenColor(tool.color, 40),
          label: tool.label,
          textColor: tool.textColor,
          icon: img || undefined,
          isDragging: false,
          mass: 1,
          restitution: 0.2, // Low bounce (plastic keys)
        };
      });
      
      imagesLoadedRef.current = true;
    };

    init();

    // 2. Observer to trigger falling
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            hasStartedRef.current = true;
        }
    }, { threshold: 0.2 });
    
    if (containerRef.current) observer.observe(containerRef.current);

    // 3. Input Handlers
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
       const rect = canvas.getBoundingClientRect();
       const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
       const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
       const mx = clientX - rect.left;
       const my = clientY - rect.top;
       
       mouseRef.current.x = mx;
       mouseRef.current.y = my;
       mouseRef.current.isDown = true;

       // Check if clicked on a key
       // Iterate backwards to grab top-most
       for (let i = keysRef.current.length - 1; i >= 0; i--) {
           const key = keysRef.current[i];
           // Simple box check
           const dx = mx - key.x;
           const dy = my - key.y;
           
           if (Math.abs(dx) < key.w/2 + 10 && Math.abs(dy) < key.h/2 + 10) {
               key.isDragging = true;
               mouseRef.current.heldKey = key;
               dragOffsetRef.current = { x: dx, y: dy }; // Grip point offset
               key.vx = 0;
               key.vy = 0;
               return; // Stop after grabbing one
           }
       }
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
       const rect = canvas.getBoundingClientRect();
       const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
       const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
       const mx = clientX - rect.left;
       const my = clientY - rect.top;
       
       mouseRef.current.x = mx;
       mouseRef.current.y = my;
    };

    const handleMouseUp = () => {
        mouseRef.current.isDown = false;
        if (mouseRef.current.heldKey) {
            mouseRef.current.heldKey.isDragging = false;
            mouseRef.current.heldKey = null;
        }
    };

    const resize = () => {
        if (!containerRef.current || !canvasRef.current) return;
        canvasRef.current.width = containerRef.current.offsetWidth;
        canvasRef.current.height = containerRef.current.offsetHeight;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleMouseDown, { passive: false });
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('resize', resize);


    // 4. Game Loop
    const update = () => {
      if (!imagesLoadedRef.current) {
        requestRef.current = requestAnimationFrame(update);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      
      // Get Colliders
      let bodyRect: DOMRect | null = null;
      if (printerBodyRef?.current) bodyRect = printerBodyRef.current.getBoundingClientRect();

      const canvasRect = canvas.getBoundingClientRect();
      
      // Printer bounds relative to canvas
      let printerLeft = width + 100; // Default offscreen
      let printerTop = height;
      if (bodyRect) {
         printerLeft = bodyRect.left - canvasRect.left;
         printerTop = bodyRect.top - canvasRect.top;
      }

      ctx.clearRect(0, 0, width, height);

      // --- PHYSICS STEP ---
      keysRef.current.forEach((key) => {
        
        if (key.isDragging) {
            // Follow Mouse with dampening
            const targetX = mouseRef.current.x - dragOffsetRef.current.x;
            const targetY = mouseRef.current.y - dragOffsetRef.current.y;
            
            // Calculate velocity for "throw" on release
            key.vx = (targetX - key.x) * 0.15; // Lower throw force
            key.vy = (targetY - key.y) * 0.15;
            
            key.x = targetX;
            key.y = targetY;
            return;
        }

        if (!hasStartedRef.current) return; // Don't move until triggered

        // Reduced Gravity (was 0.4)
        key.vy += 0.2; 
        
        // Increased Air friction (was 0.99)
        key.vx *= 0.97;
        key.vy *= 0.97;

        // Apply Velocity
        key.x += key.vx;
        key.y += key.vy;
        
        // --- COLLISIONS ---

        // 1. Floor
        if (key.y + key.h/2 > height) {
            key.y = height - key.h/2;
            key.vy *= -0.3; // Low bounce
            key.vx *= 0.7; // High ground friction
        }

        // 2. Walls
        if (key.x - key.w/2 < 0) {
            key.x = key.w/2;
            key.vx *= -0.4;
        }
        if (key.x + key.w/2 > width) {
            key.x = width - key.w/2;
            key.vx *= -0.4;
        }

        // 3. Printer Body Collision (Right side block)
        if (key.x + key.w/2 > printerLeft && key.y + key.h/2 > printerTop + 20) {
            // Hit left wall of printer
            if (key.x < printerLeft + 20) { 
                key.x = printerLeft - key.w/2;
                key.vx *= -0.5;
            }
        }
        
        // 4. Key vs Key (Circle Approximation for simple stacking)
        // AABB would be better for perfect squares but circle is stable for "piles"
        const r = key.w / 1.9; // Slightly larger radius to keep them apart
        
        keysRef.current.forEach(other => {
            if (key === other) return;
            const dx = other.x - key.x;
            const dy = other.y - key.y;
            const distSq = dx*dx + dy*dy;
            const minDist = r + (other.w/1.9);
            
            if (distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq);
                const overlap = minDist - dist;
                
                // Normal
                const nx = dx / (dist || 1); // Avoid div by zero
                const ny = dy / (dist || 1);
                
                // Position Correction (prevent sinking)
                const correction = overlap / 2;
                key.x -= nx * correction;
                key.y -= ny * correction;
                other.x += nx * correction;
                other.y += ny * correction;
                
                // Velocity Exchange
                const rvx = other.vx - key.vx;
                const rvy = other.vy - key.vy;
                
                // Velocity along normal
                const velAlongNormal = rvx * nx + rvy * ny;
                
                if (velAlongNormal < 0) { // Only resolve if moving towards each other
                     const j = -(1 + key.restitution) * velAlongNormal;
                     const impulseX = j * nx;
                     const impulseY = j * ny;
                     
                     key.vx -= impulseX * 0.5;
                     key.vy -= impulseY * 0.5;
                     other.vx += impulseX * 0.5;
                     other.vy += impulseY * 0.5;
                }
                
                // Apply friction between keys
                const tangentX = -ny;
                const tangentY = nx;
                const velAlongTangent = rvx * tangentX + rvy * tangentY;
                const friction = 0.1;
                const frictionImpulse = -velAlongTangent * friction;
                
                key.vx -= tangentX * frictionImpulse * 0.5;
                key.vy -= tangentY * frictionImpulse * 0.5;
                other.vx += tangentX * frictionImpulse * 0.5;
                other.vy += tangentY * frictionImpulse * 0.5;
            }
        });

      });

      // --- RENDER STEP ---
      keysRef.current.forEach(key => {
         ctx.save();
         ctx.translate(key.x, key.y);
         ctx.rotate(0); // Locked rotation
         
         // 1. Draw 3D Side (The Depth) - Shifts down
         const halfW = key.w / 2;
         const halfH = key.h / 2;
         const r = 8; 
         
         ctx.fillStyle = key.darkColor;
         const d = key.depth;
         ctx.beginPath();
         ctx.roundRect(-halfW, -halfH + d, key.w, key.h, r);
         ctx.fill();

         // 2. Draw Top Face
         ctx.fillStyle = key.color;
         // Simulate button press if dragging
         const pressOffset = key.isDragging ? 4 : 0;
         
         ctx.beginPath();
         ctx.roundRect(-halfW, -halfH + pressOffset, key.w, key.h, r);
         ctx.fill();
         
         // 3. Highlight / Bevel Top Edge (subtle)
         ctx.fillStyle = "rgba(255,255,255,0.2)";
         ctx.beginPath();
         ctx.roundRect(-halfW + 2, -halfH + pressOffset + 2, key.w - 4, key.h/2, [8,8,0,0]);
         ctx.fill();

         // 4. Icon or Text
         if (key.icon) {
             const iconSize = key.w * 0.5;
             ctx.drawImage(key.icon, -iconSize/2, -iconSize/2 + pressOffset, iconSize, iconSize);
         } else {
             ctx.fillStyle = key.textColor;
             ctx.font = "bold 12px Manrope";
             ctx.textAlign = "center";
             ctx.textBaseline = "middle";
             ctx.fillText(key.label, 0, pressOffset);
         }

         ctx.restore();
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [printerBodyRef]); 

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing">
       <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
