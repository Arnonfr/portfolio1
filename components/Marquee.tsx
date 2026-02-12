import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  speed = 30, 
  direction = 'left',
  className = '',
  pauseOnHover = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate text for seamless loop
  const duplicatedText = `${text} ${text} ${text} ${text} `;

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="inline-flex"
        animate={{
          x: direction === 'left' ? [0, '-50%'] : ['-50%', 0],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        <span className="inline-block">{duplicatedText}</span>
        <span className="inline-block">{duplicatedText}</span>
      </motion.div>
    </div>
  );
};

// Scrolling text strip with scroll velocity
export const VelocityMarquee: React.FC<{ 
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYVelocity } = useScroll();
  
  const x = useTransform(scrollYVelocity, [-1000, 1000], [200, -200]);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap py-4 ${className}`}
    >
      <motion.div 
        className="inline-flex"
        style={{ x }}
      >
        <span className="text-[8rem] md:text-[12rem] font-bold text-[#0c0c0a]/5 uppercase tracking-[-0.04em] mx-8">
          {text}
        </span>
        <span className="text-[8rem] md:text-[12rem] font-bold text-[#0c0c0a]/5 uppercase tracking-[-0.04em] mx-8">
          {text}
        </span>
        <span className="text-[8rem] md:text-[12rem] font-bold text-[#0c0c0a]/5 uppercase tracking-[-0.04em] mx-8">
          {text}
        </span>
      </motion.div>
    </div>
  );
};

export default Marquee;
