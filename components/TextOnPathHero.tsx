import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ───────────────────────────────────────────────────────────
// TEXT ON PATH HERO
// Auto-plays on first visit: complex paths → single straight line
// Returning users: start at resolved state immediately
// Wheel-up at top: reverse back to complex
// Single text element throughout (clip path narrows at end)
// ───────────────────────────────────────────────────────────

const CORE_PHRASE = "Let's simplify complex things";
const SEPARATOR = "  ·  ";
const FULL_UNIT = CORE_PHRASE + SEPARATOR;
const REPEAT_COUNT = 40;
const LOOP_FONT_SIZE = 150;
const FONT_FAMILY = "'Space Grotesk', sans-serif";
const FONT_WEIGHT = 800;
const VB_CY = 620;
const AUTOPLAY_DURATION = 3500; // ms — pace of simplification
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

const complexPath2: PathPoints = {
  m: [5000, VB_CY + 30],
  c1: [4600, VB_CY + 30],
  c2: [4000, VB_CY],
  to1: [3500, VB_CY - 50],
  c3: [3200, VB_CY - 80],
  c4: [3050, 450],
  to2: [2918, 435],
  c5: [2726, 619],
  c6: [2246, 1036],
  to3: [1858, 1234],
  c7: [1373, 1481],
  c8: [1097, 193],
  to4: [531, -130],
  c9: [-35, -453],
  c10: [-572, 782],
  to5: [-600, 763],
  c11: [-750, 740],
  c12: [-1100, VB_CY],
  to6: [-1500, VB_CY],
  c13: [-1800, VB_CY],
  c14: [-2100, VB_CY],
  to7: [-2300, VB_CY],
  c15: [-2500, VB_CY],
  c16: [-2700, VB_CY],
  to8: [-2900, VB_CY],
};

const makeStraight = (startX: number, endX: number): PathPoints => {
  const keys = ['m', 'c1', 'c2', 'to1', 'c3', 'c4', 'to2', 'c5', 'c6', 'to3', 'c7', 'c8', 'to4', 'c9', 'c10', 'to5', 'c11', 'c12', 'to6', 'c13', 'c14', 'to7', 'c15', 'c16', 'to8'];
  const pts: PathPoints = {};
  keys.forEach((k, i) => { pts[k] = [startX + (endX - startX) * (i / (keys.length - 1)), VB_CY]; });
  return pts;
};

const simplePath1 = makeStraight(-2200, 5700);
const simplePath2 = makeStraight(5000, -2900);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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
  const path2Ref = useRef<SVGPathElement>(null);
  const textPath1Ref = useRef<SVGTextPathElement>(null);
  const textPath2Ref = useRef<SVGTextPathElement>(null);
  const flowingGroupRef = useRef<SVGGElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cornerLabelRef = useRef<HTMLDivElement>(null);

  const text1Ref = useRef<SVGTextElement>(null);
  const togetherSpanRef = useRef<HTMLSpanElement>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [animDone, setAnimDone] = useState(false);
  const animDoneRef = useRef(false);
  const typedTextRef = useRef('');
  const phraseWidthRef = useRef(0);
  const coreWidthFinalRef = useRef(0);
  const togetherWidthRef = useRef(0);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const rafRef = useRef(0);

  // Animation progress: 0 = complex, 1 = simple straight line
  const animProgressRef = useRef(0);
  const isAutoPlayingRef = useRef(false);
  const autoPlayStartRef = useRef(performance.now());

  const tspans1Ref = useRef<(SVGTSpanElement | null)[]>([]);
  const tspans2Ref = useRef<(SVGTSpanElement | null)[]>([]);
  const loopIndices = Array.from({ length: REPEAT_COUNT }, (_, i) => i);

  const shouldReduce = useReducedMotion();

  const dispatchHeroProgress = useCallback((progress: number) => {
    window.dispatchEvent(new CustomEvent('hero-scroll-progress', { detail: { progress } }));
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

      const textTogether = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textTogether.style.fontFamily = FONT_FAMILY;
      textTogether.style.fontSize = `${LOOP_FONT_SIZE * 1.08}px`; // Slightly larger for optical balance
      textTogether.style.fontWeight = '900';
      textTogether.textContent = ' together.';
      svg.appendChild(textTogether);
      togetherWidthRef.current = textTogether.getComputedTextLength();

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
        const delta = Math.abs(e.deltaY) * 0.0008;
        animProgressRef.current = Math.max(0, animProgressRef.current - delta);
        if (animDoneRef.current) {
          animDoneRef.current = false;
          setAnimDone(false);
          typedTextRef.current = '';
          if (togetherSpanRef.current) togetherSpanRef.current.textContent = '';
        }
      } else if (e.deltaY > 0 && animProgressRef.current < 1) {
        e.preventDefault();
        const delta = e.deltaY * 0.0008;
        animProgressRef.current = Math.min(1, animProgressRef.current + delta);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY > 80) return;
      (window as any)._touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 80) return;
      const deltaY = ((window as any)._touchStartY || 0) - e.touches[0].clientY;
      (window as any)._touchStartY = e.touches[0].clientY;

      if (deltaY < 0) {
        if (animProgressRef.current > 0) e.preventDefault();
        isAutoPlayingRef.current = false;
        const delta = Math.abs(deltaY) * 0.003;
        animProgressRef.current = Math.max(0, animProgressRef.current - delta);
        if (animDoneRef.current) {
          animDoneRef.current = false;
          setAnimDone(false);
          typedTextRef.current = '';
          if (togetherSpanRef.current) togetherSpanRef.current.textContent = '';
        }
      } else if (deltaY > 0 && animProgressRef.current < 1) {
        e.preventDefault();
        const delta = deltaY * 0.003;
        animProgressRef.current = Math.min(1, animProgressRef.current + delta);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [dispatchHeroProgress]);

  useEffect(() => {
    if (!animDone) { typedTextRef.current = ''; return; }
    const word = ' together.';
    let i = 0;
    const interval = setInterval(() => {
      i++;
      typedTextRef.current = word.slice(0, i);
      if (togetherSpanRef.current) togetherSpanRef.current.textContent = typedTextRef.current;
      if (i >= word.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [animDone]);

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

      if (path1Ref.current) path1Ref.current.setAttribute('d', generatePathD(complexPath1, simplePath1, progress));
      if (path2Ref.current) path2Ref.current.setAttribute('d', generatePathD(complexPath2, simplePath2, progress));

      const speed = 1.8 * Math.max(0, 1 - progress * 1.6);
      offset1Ref.current -= speed;
      offset2Ref.current -= speed * 0.8;
      if (phraseWidthRef.current > 0) {
        if (offset1Ref.current <= -phraseWidthRef.current) offset1Ref.current = 0;
        if (offset2Ref.current <= -phraseWidthRef.current) offset2Ref.current = 0;
      }

      const totalWidthAtEnd = coreWidthFinalRef.current + togetherWidthRef.current;
      const finalBlueOffset = isMobile
        ? (3400 - coreWidthFinalRef.current / 2)
        : (3400 - totalWidthAtEnd / 2);

      const snapT = easeInOutCubic(Math.max(0, (progress - 0.72) / 0.28));
      const currentOffset1 = snapT > 0 ? lerp(offset1Ref.current, finalBlueOffset, snapT) : offset1Ref.current;

      if (textPath1Ref.current) textPath1Ref.current.setAttribute('startOffset', String(currentOffset1));
      if (textPath2Ref.current) {
        textPath2Ref.current.setAttribute('startOffset', String(offset2Ref.current));
        textPath2Ref.current.style.opacity = String(Math.max(0, 1 - progress * 2.2));
      }

      if (clipRectRef.current && phraseWidthRef.current > 0) {
        const clipT = easeInOutCubic(Math.max(0, (progress - 0.80) / 0.20));
        const fullW = 5000;
        const targetW = isMobile ? coreWidthFinalRef.current + 20 : totalWidthAtEnd + 60;
        const w = lerp(fullW, targetW, clipT);
        clipRectRef.current.setAttribute('x', String(1200 - w / 2));
        clipRectRef.current.setAttribute('width', String(w));
      }

      const repetitionsOpacity = progress > 0.8 ? Math.max(0, 1 - (progress - 0.8) / 0.12) : 1;
      tspans1Ref.current.forEach((tspan, i) => { if (tspan) tspan.style.opacity = i === 0 ? '1' : String(repetitionsOpacity); });
      tspans2Ref.current.forEach((tspan, i) => { if (tspan) tspan.style.opacity = i === 0 ? '1' : String(repetitionsOpacity); });

      if (text1Ref.current) {
        const fontT = easeInOutCubic(Math.max(0, (progress - 0.82) / 0.18));
        if (fontT > 0) {
          text1Ref.current.style.fontWeight = String(Math.round(lerp(800, 300, fontT)));
          text1Ref.current.style.letterSpacing = `${lerp(-0.02, 0.13, fontT).toFixed(3)}em`;
        }
      }

      if (togetherSpanRef.current) {
        togetherSpanRef.current.style.opacity = animDoneRef.current ? '1' : '0';
        if (!isMobile) {
          const viewPortWidth = window.innerWidth;
          // Center shift: together starts after blue text. 
          // Together's center should be shifted by half of blue text length relative to global center if combined is centered.
          const offsetX = (coreWidthFinalRef.current / 3600) * viewPortWidth * 0.51;
          togetherSpanRef.current.style.transform = `translate(calc(-50% + ${offsetX}px), -50%)`;
          togetherSpanRef.current.style.top = '51dvh';
        } else {
          togetherSpanRef.current.style.transform = 'translate(-50%, 0)';
          togetherSpanRef.current.style.top = '55dvh';
        }
      }

      if (scrollHintRef.current) scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 6));
      if (cornerLabelRef.current) cornerLabelRef.current.style.opacity = String(Math.max(0, 1 - progress * 6));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldReduce, dispatchHeroProgress, isMobile]);

  if (shouldReduce) {
    return (
      <section className="relative w-full h-screen bg-[#f4f3f1] flex items-center justify-center">
        <h1 className="sr-only">{CORE_PHRASE}</h1>
        <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-[#0055ff] text-center px-6">{CORE_PHRASE}</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative w-full h-dvh bg-[#f4f3f1]">
      <h1 className="sr-only">{CORE_PHRASE}</h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE_POWER }} className="w-full h-full relative overflow-hidden">
        <svg viewBox="-600 -400 3600 2000" style={{ position: 'absolute', left: '-2%', top: 0, width: '104%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
          <defs>
            <path ref={path1Ref} id="heroTextPath1" d={generatePathD(complexPath1, simplePath1, 0)} />
            <path ref={path2Ref} id="heroTextPath2" d={generatePathD(complexPath2, simplePath2, 0)} />
            <clipPath id="heroTextClip"><rect ref={clipRectRef} x="-600" y="-600" width="3600" height="2200" /></clipPath>
          </defs>
          <g ref={flowingGroupRef} clipPath="url(#heroTextClip)">
            <text ref={text1Ref} className="select-none pointer-events-none" style={{ fill: '#0055ff', fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT, letterSpacing: '-0.02em' }}>
              <textPath ref={textPath1Ref} href="#heroTextPath1">
                <tspan ref={el => { tspans1Ref.current[0] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{CORE_PHRASE}</tspan>
                {loopIndices.slice(1).map(i => <tspan key={i} ref={el => { tspans1Ref.current[i] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{SEPARATOR + CORE_PHRASE}</tspan>)}
              </textPath>
            </text>
            <text className="select-none pointer-events-none" style={{ fill: '#ff00aa', fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT, letterSpacing: '-0.02em', mixBlendMode: 'multiply' }}>
              <textPath ref={textPath2Ref} href="#heroTextPath2">
                <tspan ref={el => { tspans2Ref.current[0] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{CORE_PHRASE}</tspan>
                {loopIndices.slice(1).map(i => <tspan key={i} ref={el => { tspans2Ref.current[i] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{SEPARATOR + CORE_PHRASE}</tspan>)}
              </textPath>
            </text>
          </g>
        </svg>

        <span
          ref={togetherSpanRef}
          className="absolute left-1/2 pointer-events-none select-none z-20"
          style={{
            opacity: 0,
            fontFamily: FONT_FAMILY,
            fontWeight: 900,
            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2rem, 4.1vw, 5rem)',
            color: '#ff00aa',
            letterSpacing: '0.01em',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            textAlign: 'center',
            maxWidth: isMobile ? '80vw' : 'none',
            lineHeight: 1.1,
            transition: 'opacity 0.3s ease',
          }}
        />

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
