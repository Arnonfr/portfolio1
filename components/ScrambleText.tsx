import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = '',
  delay = 0,
  duration = 1.5,
  once = true
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || (once && hasAnimated)) return;

    let iteration = 0;
    const maxIterations = text.length * 3;
    const intervalDuration = (duration * 1000) / maxIterations;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 3) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration += 1;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setHasAnimated(true);
        }
      }, intervalDuration);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay, duration, once, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={`${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
    >
      {displayText}
    </motion.span>
  );
};

// Hover scramble effect
export const HoverScramble: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    const maxIterations = text.length * 2;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 30);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span
      className={`${className} cursor-hover`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
