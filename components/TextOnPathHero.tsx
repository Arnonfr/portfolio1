import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

// ───────────────────────────────────────────────────────────
// TEXT ON PATH HERO
// Simplified complex things -> let's simplify complex [Enamel Pin]
// ───────────────────────────────────────────────────────────

const CORE_PHRASE = "Let's simplify complex";
const SEPARATOR = "  ·  ";
const FULL_UNIT = CORE_PHRASE + SEPARATOR;
const REPEAT_COUNT = 40;
const LOOP_FONT_SIZE = 150;
const FONT_FAMILY = "'Space Grotesk', sans-serif";
const FONT_WEIGHT = 800;
const VB_CY = 620;
const AUTOPLAY_DURATION = 3500;
const EASE_POWER: [number, number, number, number] = [0.16, 1, 0.3, 1];

type PathPoints = Record<string, [number, number]>;

const complexPath1: PathPoints = {
  m: [-2200, VB_CY],
  c1: [-1800, VB_CY],
  c2: [-1000, 400],
  to1: [-600, 329],
  c3: [-282, 641],
  c4: [89, 1573],
  to2: [653, 1273],
  c5: [946, 1116],
  c6: [1651, 586],
  to3: [1486, 208],
  c7: [1437, 99],
  c8: [815, -639],
  to4: [325, 246],
  c9: [-164, 1130],
  c10: [3426, 410],
  to5: [2997, 1386],
  c11: [2914, 1575],
  c12: [2528, 1416],
  to6: [2433, 1341],
  c13: [1880, 906],
  c14: [2551, 328],
  to7: [2948, -55],
  c15: [3500, 200],
  c16: [5000, VB_CY],
  to8: [5700, VB_CY],
};

const makeStraight = (startX: number, endX: number): PathPoints => {
  const keys = ['m', 'c1', 'c2', 'to1', 'c3', 'c4', 'to2', 'c5', 'c6', 'to3', 'c7', 'c8', 'to4', 'c9', 'c10', 'to5', 'c11', 'c12', 'to6', 'c13', 'c14', 'to7', 'c15', 'c16', 'to8'];
  const pts: PathPoints = {};
  keys.forEach((k, i) => { pts[k] = [startX + (endX - startX) * (i / (keys.length - 1)), VB_CY]; });
  return pts;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function generatePathD(complexP: PathPoints, simpleP: PathPoints, rawProgress: number): string {
  const t = easeInOutCubic(Math.min(rawProgress / 0.85, 1));
  const p = (key: string, idx: number) => lerp(complexP[key][idx], simpleP[key][idx], t);
  return `M ${p('m', 0)},${p('m', 1)} ` +
    `C ${p('c1', 0)},${p('c1', 1)} ${p('c2', 0)},${p('c2', 1)} ${p('to1', 0)},${p('to1', 1)} ` +
    `C ${p('c3', 0)},${p('c3', 1)} ${p('c4', 0)},${p('c4', 1)} ${p('to2', 0)},${p('to2', 1)} ` +
    `C ${p('c5', 0)},${p('c5', 1)} ${p('c6', 0)},${p('c6', 1)} ${p('to3', 0)},${p('to3', 1)} ` +
    `C ${p('c7', 0)},${p('c7', 1)} ${p('c8', 0)},${p('c8', 1)} ${p('to4', 0)},${p('to4', 1)} ` +
    `C ${p('c9', 0)},${p('c9', 1)} ${p('c10', 0)},${p('c10', 1)} ${p('to5', 0)},${p('to5', 1)} ` +
    `C ${p('c11', 0)},${p('c11', 1)} ${p('c12', 0)},${p('c12', 1)} ${p('to6', 0)},${p('to6', 1)} ` +
    `C ${p('c13', 0)},${p('c13', 1)} ${p('c14', 0)},${p('c14', 1)} ${p('to7', 0)},${p('to7', 1)} ` +
    `C ${p('c15', 0)},${p('c15', 1)} ${p('c16', 0)},${p('c16', 1)} ${p('to8', 0)},${p('to8', 1)}`;
}

/**
 * Hyper-Realistic Enamel Pin Component
 * Simulates a physical die-struck pin:
 * 1. Gold Metal Base (Die-struck mold)
 * 2. Recessed Enamel Fill (Pink liquid resin)
 * 3. Raised Gold Lettering
 */
const EnamelPin: React.FC = () => (
  <motion.div
    initial={{ y: 25, opacity: 0, scale: 0.9, rotateX: 30, rotateY: -5 }}
    animate={{ y: 0, opacity: 1, scale: 1, rotateX: 15, rotateY: 0 }}
    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 48px',
      borderRadius: '100px',
      // Multi-stop gradient for anisotropic metal reflection
      background: 'linear-gradient(165deg, #f0d080 0%, #d4af37 15%, #b8860b 40%, #8a6d3b 55%, #d4af37 85%, #fff9ae 100%)',
      transformStyle: 'preserve-3d',
      boxShadow: `
        0 1px 1px rgba(255,255,255,0.6), /* Rim top highlight */
        0 2px 4px rgba(0,0,0,0.5),      /* Hard contact shadow */
        0 10px 20px rgba(0,0,0,0.15),   /* Mid-range core shadow */
        0 25px 50px rgba(0,0,0,0.1)     /* Soft penumbra */
      `,
    }}
  >
    {/* Highlight Bead */}
    <div style={{
      position: 'absolute',
      inset: '0.5px',
      borderRadius: '99px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      filter: 'blur(0.3px)',
      opacity: 0.5,
      zIndex: 10,
      pointerEvents: 'none'
    }} />

    {/* The Enamel Pool */}
    <div style={{
      position: 'absolute',
      inset: '5px',
      borderRadius: '99px',
      background: '#ff1493',
      zIndex: 1,
      boxShadow: `
        inset 0 4px 8px rgba(0,0,0,0.4),
        inset 0 -2px 4px rgba(255,255,255,0.2)
      `
    }}>
      {/* Liquid Resin Gloss */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 55%)',
        opacity: 0.8
      }} />
    </div>

    {/* Brilliant Gold Text */}
    <span style={{
      fontFamily: FONT_FAMILY,
      fontWeight: 950,
      fontSize: '0.85em',
      textTransform: 'lowercase',
      letterSpacing: '-0.04em',
      position: 'relative',
      zIndex: 5,
      background: 'linear-gradient(to bottom, #fff9ae 0%, #d4af37 35%, #b8860b 80%, #8a6d3b 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0 1px 1.5px rgba(0,0,0,0.4))',
      transform: 'translateZ(6px)',
      // Text Highlight Bead
      textShadow: '0 -0.5px 0.5px rgba(255,255,255,0.4)'
    }}>
      system
    </span>

    {/* Surface Glaze Layer */}
    <div style={{
      position: 'absolute',
      inset: '5px',
      borderRadius: '99px',
      zIndex: 15,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 55%, rgba(255,255,255,0.1) 100%)',
      mixBlendMode: 'overlay',
      pointerEvents: 'none'
    }} />

    {/* Specular Flare */}
    <div style={{
      position: 'absolute',
      top: '12%',
      left: '18%',
      width: '35%',
      height: '25%',
      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 75%)',
      transform: 'rotate(-20deg)',
      zIndex: 20,
      opacity: 0.8,
      filter: 'blur(3px)',
      pointerEvents: 'none'
    }} />
  </motion.div>
);



const MouseWheelIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M 4 28 L 4 12 C 4 5.4 8.4 1 14 1 C 19.6 1 24 5.4 24 12 L 24 28"
      stroke="#a8a39a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <ellipse cx="14" cy="11" rx="2.5" ry="4"
      stroke="#a8a39a" strokeWidth="1.5" fill="none" />
  </svg>
);

export const TextOnPathHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const textPath1Ref = useRef<SVGTextPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cornerLabelRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [animDone, setAnimDone] = useState(false);

  const animDoneRef = useRef(false);
  const phraseWidthRef = useRef(0);
  const coreWidthFinalRef = useRef(0);
  const offset1Ref = useRef(0);
  const rafRef = useRef(0);

  const animProgressRef = useRef(0);
  const isAutoPlayingRef = useRef(false);
  const autoPlayStartRef = useRef(performance.now());

  const tspans1Ref = useRef<(SVGTSpanElement | null)[]>([]);
  const loopIndices = Array.from({ length: REPEAT_COUNT }, (_, i) => i);
  const shouldReduce = useReducedMotion();

  const dispatchHeroProgress = useCallback((progress: number) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hero-scroll-progress', { detail: { progress } }));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const measure = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.style.fontFamily = FONT_FAMILY;
      text.style.fontSize = `${LOOP_FONT_SIZE}px`;
      text.style.fontWeight = String(FONT_WEIGHT);
      text.textContent = FULL_UNIT;
      svg.appendChild(text);
      document.body.appendChild(svg);
      phraseWidthRef.current = text.getComputedTextLength();

      const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text2.style.fontFamily = FONT_FAMILY;
      text2.style.fontSize = `${LOOP_FONT_SIZE}px`;
      text2.style.fontWeight = '300';
      text2.style.letterSpacing = '0.13em';
      text2.textContent = CORE_PHRASE;
      svg.appendChild(text2);
      coreWidthFinalRef.current = text2.getComputedTextLength();

      document.body.removeChild(svg);
    };
    document.fonts.ready.then(measure);
  }, []);

  useEffect(() => {
    animProgressRef.current = 0;
    isAutoPlayingRef.current = true;
    autoPlayStartRef.current = performance.now();

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 80) return;
      if (e.deltaY < 0) {
        e.preventDefault();
        isAutoPlayingRef.current = false;
        animProgressRef.current = Math.max(0, animProgressRef.current - (Math.abs(e.deltaY) * 0.0008));
        if (animDoneRef.current) {
          animDoneRef.current = false;
          setAnimDone(false);
        }
      } else if (e.deltaY > 0 && animProgressRef.current < 1) {
        e.preventDefault();
        animProgressRef.current = Math.min(1, animProgressRef.current + (e.deltaY * 0.0008));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (shouldReduce) {
      animProgressRef.current = 1;
      dispatchHeroProgress(1);
      return;
    }

    const tick = () => {
      if (isAutoPlayingRef.current) {
        const elapsed = performance.now() - autoPlayStartRef.current;
        const rawT = Math.min(1, elapsed / AUTOPLAY_DURATION);
        animProgressRef.current = easeInOutCubic(rawT);
        if (rawT >= 1) {
          isAutoPlayingRef.current = false;
          if (!animDoneRef.current) {
            animDoneRef.current = true;
            setAnimDone(true);
          }
        }
      }

      const progress = animProgressRef.current;
      dispatchHeroProgress(progress);

      if (path1Ref.current) path1Ref.current.setAttribute('d', generatePathD(complexPath1, makeStraight(-2200, 5700), progress));

      const speed = 1.8 * Math.max(0, 1 - progress * 1.6);
      offset1Ref.current -= speed;
      if (phraseWidthRef.current > 0) {
        if (offset1Ref.current <= -phraseWidthRef.current) offset1Ref.current = 0;
      }

      const finalBlueOffset = 3400 - coreWidthFinalRef.current / 2;
      const snapT = easeInOutCubic(Math.max(0, (progress - 0.72) / 0.28));
      const currentOffset1 = snapT > 0 ? lerp(offset1Ref.current, finalBlueOffset, snapT) : offset1Ref.current;

      if (textPath1Ref.current) textPath1Ref.current.setAttribute('startOffset', String(currentOffset1));

      if (clipRectRef.current && phraseWidthRef.current > 0) {
        const clipT = easeInOutCubic(Math.max(0, (progress - 0.80) / 0.20));
        const fullW = 5000;
        const targetW = coreWidthFinalRef.current + 100;
        const w = lerp(fullW, targetW, clipT);
        clipRectRef.current.setAttribute('x', String(1200 - w / 2));
        clipRectRef.current.setAttribute('width', String(w));
      }

      const repetitionsOpacity = progress > 0.8 ? Math.max(0, 1 - (progress - 0.8) / 0.12) : 1;
      tspans1Ref.current.forEach((tspan, i) => { if (tspan) tspan.style.opacity = i === 0 ? '1' : String(repetitionsOpacity); });

      if (scrollHintRef.current) scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 6));
      if (cornerLabelRef.current) cornerLabelRef.current.style.opacity = String(Math.max(0, 1 - progress * 6));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldReduce, dispatchHeroProgress]);

  return (
    <section ref={sectionRef} className="relative w-full h-dvh bg-[#ffffff]">
      <h1 className="sr-only">{CORE_PHRASE}</h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE_POWER }} className="w-full h-full relative overflow-hidden">

        {/* ANIMATION LAYER: SVG */}
        {!animDone && <svg
          viewBox="-600 -400 3600 2000"
          style={{
            position: 'absolute',
            left: '0', top: 0, width: '100%', height: '100%',
            opacity: animDone ? 0 : 1,
            transition: 'opacity 0.6s ease',
            zIndex: 10
          }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <path ref={path1Ref} id="heroTextPath1" d={generatePathD(complexPath1, makeStraight(-2200, 5700), 0)} />
            <clipPath id="heroTextClip"><rect ref={clipRectRef} x="-600" y="-600" width="3600" height="2200" /></clipPath>
          </defs>
          <g clipPath="url(#heroTextClip)">
            <text className="select-none pointer-events-none" style={{ fill: '#0055ff', fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT, letterSpacing: '-0.02em' }}>
              <textPath ref={textPath1Ref} href="#heroTextPath1">
                <tspan ref={el => { tspans1Ref.current[0] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{CORE_PHRASE}</tspan>
                {loopIndices.slice(1).map(i => <tspan key={i} ref={el => { tspans1Ref.current[i] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{SEPARATOR + CORE_PHRASE}</tspan>)}
              </textPath>
            </text>
          </g>
        </svg>}

        {/* FINAL STATE LAYER: HTML WITH ENAMEL PIN */}
        <AnimatePresence>
          {animDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none select-none px-6"
            >
              <div
                className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-4"
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.8rem)' : 'clamp(2.5rem, 4.4vw, 5.2rem)',
                  width: '100%',
                  perspective: '1500px'
                }}
              >
                <div style={{ fontWeight: 300, color: '#0055ff', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  Let's simplify complex
                </div>

                <div style={{
                  display: 'inline-flex',
                  minWidth: isMobile ? 'auto' : '360px',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  height: '1.4em',
                  alignItems: 'center'
                }}>
                  <EnamelPin />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Labels and Hints */}
        <div ref={cornerLabelRef} className="absolute top-8 right-8 z-50 pointer-events-none text-[#0c0c0a] hidden md:flex items-start gap-3">
          <span className="font-bold text-[0.875rem] uppercase tracking-wider leading-none pt-1">Arnon Friedman</span>
          <div className="flex flex-col items-center">
            <span className="h-px w-6 bg-[#0c0c0a] mb-2" />
            <span className="font-medium text-[0.75rem] uppercase tracking-[0.2em] origin-top-left translate-x-2" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Portfolio</span>
          </div>
        </div>

        <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none z-10">
          <div className="overflow-hidden" style={{ height: 28 }}><MouseWheelIcon /></div>
          <span style={{ fontFamily: FONT_FAMILY, fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: '#a8a39a', textTransform: 'uppercase' }}>scroll to simplify</span>
        </div>
      </motion.div>
    </section>
  );
};
