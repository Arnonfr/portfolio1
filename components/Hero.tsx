import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textPath1Ref = useRef<SVGTextPathElement>(null);
  const textPath2Ref = useRef<SVGTextPathElement>(null);
  const phraseWidthRef = useRef<number>(0);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const animFrameRef = useRef<number>(0);

  const corePhrase = "let's simplify some complex things";
  const separator = "  ·  ";
  const fullUnit = corePhrase + separator;
  const loopFontSize = "88px";

  // Measure phrase width once (using off-screen SVG to get accurate text length)
  useEffect(() => {
    const measure = () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.style.fontFamily = "'Instrument Serif', serif";
      text.style.fontSize = loopFontSize;
      text.style.fontStyle = "italic";
      text.textContent = fullUnit;
      svg.appendChild(text);
      document.body.appendChild(svg);
      phraseWidthRef.current = text.getComputedTextLength();
      document.body.removeChild(svg);
    };
    // Wait for fonts to load before measuring
    document.fonts.ready.then(measure);
  }, []);

  // Animation loop — direct DOM attribute updates, no React re-renders
  useEffect(() => {
    const animate = () => {
      const speed = 1.2;

      offset1Ref.current -= speed;
      if (phraseWidthRef.current > 0 && offset1Ref.current <= -phraseWidthRef.current) {
        offset1Ref.current = 0;
      }

      offset2Ref.current += speed * 1.3;
      if (phraseWidthRef.current > 0 && offset2Ref.current >= phraseWidthRef.current) {
        offset2Ref.current = 0;
      }

      if (textPath1Ref.current) {
        textPath1Ref.current.setAttribute('startOffset', String(offset1Ref.current));
      }
      if (textPath2Ref.current) {
        textPath2Ref.current.setAttribute('startOffset', String(offset2Ref.current));
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Path Geometry ---
  const startX = -800;
  const endX = 2400;
  const centerY = 500;

  // Clockwise spiral path
  const complex1 = {
    m: [startX, centerY],
    c1: [startX + 150, centerY - 700],
    c2: [startX + 600, centerY - 700],
    to1: [startX + 900, centerY - 200],
    c3: [startX + 1050, centerY - 50],
    c4: [startX + 1200, centerY + 300],
    to2: [startX + 1500, centerY + 800],
    c5: [startX + 1650, centerY + 900],
    c6: [startX + 1800, centerY + 700],
    to3: [startX + 1950, centerY + 300],
    c7: [startX + 2100, centerY + 100],
    c8: [startX + 2250, centerY],
    to4: [endX, centerY]
  };

  // Counter-clockwise spiral path
  const complex2 = {
    m: [startX, centerY],
    c1: [startX + 150, centerY + 700],
    c2: [startX + 600, centerY + 700],
    to1: [startX + 900, centerY + 200],
    c3: [startX + 1050, centerY + 50],
    c4: [startX + 1200, centerY - 300],
    to2: [startX + 1500, centerY - 800],
    c5: [startX + 1650, centerY - 900],
    c6: [startX + 1800, centerY - 700],
    to3: [startX + 1950, centerY - 300],
    c7: [startX + 2100, centerY - 100],
    c8: [startX + 2250, centerY],
    to4: [endX, centerY]
  };

  // Straight horizontal line (target)
  const simple = {
    m: [startX, centerY],
    c1: [startX + 300, centerY],
    c2: [startX + 600, centerY],
    to1: [startX + 900, centerY],
    c3: [startX + 1000, centerY],
    c4: [startX + 1100, centerY],
    to2: [startX + 1200, centerY],
    c5: [startX + 1400, centerY],
    c6: [startX + 1600, centerY],
    to3: [startX + 1800, centerY],
    c7: [startX + 2000, centerY],
    c8: [startX + 2200, centerY],
    to4: [endX, centerY]
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const generatePath = (complex: any, t: number) => {
    const untangleProgress = Math.min(t / 0.75, 1);
    const eased = untangleProgress < 0.5
      ? 2 * untangleProgress ** 2
      : 1 - Math.pow(-2 * untangleProgress + 2, 2) / 2;

    const p = (key: string, idx: number) => lerp(complex[key][idx], simple[key][idx], eased);

    return `M ${p('m', 0)},${p('m', 1)} C ${p('c1', 0)},${p('c1', 1)} ${p('c2', 0)},${p('c2', 1)} ${p('to1', 0)},${p('to1', 1)} C ${p('c3', 0)},${p('c3', 1)} ${p('c4', 0)},${p('c4', 1)} ${p('to2', 0)},${p('to2', 1)} C ${p('c5', 0)},${p('c5', 1)} ${p('c6', 0)},${p('c6', 1)} ${p('to3', 0)},${p('to3', 1)} C ${p('c7', 0)},${p('c7', 1)} ${p('c8', 0)},${p('c8', 1)} ${p('to4', 0)},${p('to4', 1)}`;
  };

  const untanglePath = generatePath(complex1, scrollProgress);
  const untanglePathPurple = generatePath(complex2, scrollProgress);
  const infiniteText = fullUnit.repeat(50);

  // Cross-fade opacities
  const complexOpacity = Math.max(0, 1 - (scrollProgress - 0.65) / 0.2);
  const resolvedOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.70) / 0.2));

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] bg-[#F9E8B3]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        <svg
          viewBox="-400 -400 3200 1800"
          className="w-full h-full relative z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <path id="pathRed" d={untanglePath} />
            <path id="pathPurple" d={untanglePathPurple} />
          </defs>

          {/* Phase 1: Looping text on tangled paths */}
          <g style={{ opacity: complexOpacity }}>
            <text
              className="select-none pointer-events-none"
              style={{
                fill: '#D62B00',
                fontFamily: "'Instrument Serif', serif",
                fontSize: loopFontSize,
                fontStyle: 'italic',
              }}
            >
              <textPath ref={textPath1Ref} href="#pathRed">{infiniteText}</textPath>
            </text>

            <text
              className="select-none pointer-events-none"
              style={{
                fill: '#9D22A3',
                fontFamily: "'Instrument Serif', serif",
                fontSize: loopFontSize,
                fontStyle: 'italic',
                opacity: 0.5,
              }}
            >
              <textPath ref={textPath2Ref} href="#pathPurple">{infiniteText}</textPath>
            </text>
          </g>

          {/* Phase 2: Resolved clean phrase */}
          <g style={{ opacity: resolvedOpacity }}>
            <text
              x="1200"
              y="500"
              textAnchor="middle"
              dominantBaseline="middle"
              className="select-none pointer-events-none"
              style={{
                fill: '#D62B00',
                fontFamily: "'Instrument Serif', serif",
                fontSize: '72px',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
              }}
            >
              {corePhrase}
            </text>
          </g>
        </svg>

        {/* Phase 3: Transition to Signature V2 */}
        <div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 transition-all duration-1000"
          style={{
            opacity: Math.max(0, (scrollProgress - 0.9) * 10),
            pointerEvents: scrollProgress > 0.9 ? 'auto' : 'none'
          }}
        >
          <Link
            to="/v2"
            className="px-10 py-4 bg-[#D62B00] text-white font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
          >
            [ Switch to Signature V2 ]
          </Link>
        </div>

        {/* Scroll Hint */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-700 pointer-events-none z-20"
          style={{
            opacity: 1 - scrollProgress * 6,
            transform: `translate(-50%, ${scrollProgress * 150}px)`
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#D62B00]/40 font-sans">Scroll to simplify</span>
          <div className="w-px h-24 bg-gradient-to-b from-[#D62B00]/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
