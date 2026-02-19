import React, { useRef, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

// ───────────────────────────────────────────────────────────
// TEXT ON PATH HERO
// Simplified complex things -> let's simplify complex
// ───────────────────────────────────────────────────────────

const CORE_PHRASE = "Let's simplify complex things";
const SEPARATOR = "  ·  ";
const FULL_UNIT = CORE_PHRASE + SEPARATOR;
const REPEAT_COUNT = 40;
const LOOP_FONT_SIZE = 150;
const FONT_FAMILY = "'Space Grotesk', sans-serif";
const FONT_WEIGHT = 800;
const VB_CY = 620;
const AUTOPLAY_DURATION = 5600;
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
  m: [3500, VB_CY - 100],
  c1: [3200, VB_CY - 100],
  c2: [3000, VB_CY - 150],
  to1: [2800, VB_CY - 160],
  c3: [2400, VB_CY - 200],
  c4: [2200, VB_CY + 400],
  to2: [2000, VB_CY + 350],
  c5: [1800, VB_CY + 300],
  c6: [1600, VB_CY - 300],
  to3: [1400, VB_CY - 250],
  c7: [1200, VB_CY - 200],
  c8: [1000, VB_CY + 200],
  to4: [800, VB_CY + 150],
  c9: [600, VB_CY + 100],
  c10: [400, VB_CY - 100],
  to5: [200, VB_CY - 80],
  c11: [0, VB_CY - 60],
  c12: [-200, VB_CY + 60],
  to6: [-400, VB_CY + 50],
  c13: [-800, VB_CY + 40],
  c14: [-1200, VB_CY - 40],
  to7: [-1600, VB_CY - 20],
  c15: [-2000, VB_CY],
  c16: [-2200, VB_CY],
  to8: [-2400, VB_CY],
};

const makeStraight = (startX: number, endX: number): PathPoints => {
  const keys = ['m', 'c1', 'c2', 'to1', 'c3', 'c4', 'to2', 'c5', 'c6', 'to3', 'c7', 'c8', 'to4', 'c9', 'c10', 'to5', 'c11', 'c12', 'to6', 'c13', 'c14', 'to7', 'c15', 'c16', 'to8'];
  const pts: PathPoints = {};
  keys.forEach((k, i) => { pts[k] = [startX + (endX - startX) * (i / (keys.length - 1)), VB_CY]; });
  return pts;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// Gentler quintic easing for the path morph specifically
const easeInOutQuint = (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

// Start immediately, then spend more time in the simplification middle phase
const mapMorphTiming = (t: number) => {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped <= 0.18) {
    return clamped * 1.5;
  }
  if (clamped <= 0.82) {
    const mid = (clamped - 0.18) / 0.64;
    return 0.27 + easeInOutCubic(mid) * 0.58;
  }
  return 0.85 + (clamped - 0.82) * (0.15 / 0.18);
};

function generatePathD(complexP: PathPoints, simpleP: PathPoints, rawProgress: number): string {
  // Path doesn't fully straighten until 95% progress.
  // Timing map starts immediately and slows through the middle.
  const t = mapMorphTiming(Math.min(rawProgress / 0.95, 1));
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


// Add global declaration
declare global {
  interface Window {
    hasPlayedHeroAnimation?: boolean;
  }
}

export const TextOnPathHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const textPath1Ref = useRef<SVGTextPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const textPath2Ref = useRef<SVGTextPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const scrollHintRef = useRef<HTMLButtonElement>(null);
  const cornerLabelRef = useRef<HTMLDivElement>(null);
  const subtitleWrapRef = useRef<HTMLDivElement>(null);
  const finalTitleRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, r: 0 });
  const [finalInteractiveReady, setFinalInteractiveReady] = useState(false);
  const [titleHoverActive, setTitleHoverActive] = useState(false);

  // Initialize from window state to skip animation on navigation
  const [animDone, setAnimDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!window.hasPlayedHeroAnimation;
    }
    return false;
  });

  const animDoneRef = useRef(animDone);
  const phraseWidthRef = useRef(0);
  const coreWidthFinalRef = useRef(0);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const rafRef = useRef(0);

  const animProgressRef = useRef(animDone ? 1 : 0);
  const isAutoPlayingRef = useRef(!animDone);
  const autoPlayStartRef = useRef(performance.now());

  const tspans1Ref = useRef<(SVGTSpanElement | null)[]>([]);
  const tspans2Ref = useRef<(SVGTSpanElement | null)[]>([]);
  const loopIndices = Array.from({ length: REPEAT_COUNT }, (_, i) => i);
  const shouldReduce = useReducedMotion();

  const dispatchHeroProgress = useCallback((progress: number) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hero-scroll-progress', { detail: { progress } }));
    }
  }, []);

  const applyFinalVisualState = useCallback(() => {
    if (isMobile) return;

    if (path1Ref.current) {
      path1Ref.current.setAttribute('d', generatePathD(complexPath1, makeStraight(-2200, 5700), 1));
    }
    if (path2Ref.current) {
      path2Ref.current.setAttribute('d', generatePathD(complexPath2, makeStraight(-2200, 5700), 1));
    }

    const finalBlueOffset = 3600 - coreWidthFinalRef.current / 2;
    if (textPath1Ref.current) textPath1Ref.current.setAttribute('startOffset', String(finalBlueOffset));
    if (textPath2Ref.current) textPath2Ref.current.setAttribute('startOffset', String(finalBlueOffset));

    if (clipRectRef.current) {
      const targetW = coreWidthFinalRef.current + 500;
      clipRectRef.current.setAttribute('x', String(1400 - targetW / 2));
      clipRectRef.current.setAttribute('width', String(targetW));
    }

    tspans1Ref.current.forEach((tspan, i) => {
      if (tspan) tspan.style.opacity = i === 0 ? '1' : '0';
    });
    tspans2Ref.current.forEach((tspan) => {
      if (tspan) tspan.style.opacity = '0';
    });

    if (scrollHintRef.current) scrollHintRef.current.style.opacity = '0';
    if (cornerLabelRef.current) cornerLabelRef.current.style.opacity = '0';
  }, [isMobile]);

  useEffect(() => {
    // If we start with animation done, dispatch immediate progress 1
    if (animDone) {
      dispatchHeroProgress(1);
    }
  }, [animDone, dispatchHeroProgress]);

  useEffect(() => {
    if (!animDone) return;
    applyFinalVisualState();
  }, [animDone, applyFinalVisualState]);

  useEffect(() => {
    if (!animDone) {
      setFinalInteractiveReady(false);
      setTitleHoverActive(false);
      return;
    }
    const t = window.setTimeout(() => setFinalInteractiveReady(true), isMobile ? 0 : 380);
    return () => window.clearTimeout(t);
  }, [animDone, isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y, r: x * 0.1 });
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // ... [measure font logic remains same] ...

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
      text2.style.fontWeight = String(FONT_WEIGHT);
      text2.style.letterSpacing = '-0.02em';
      text2.textContent = CORE_PHRASE;
      svg.appendChild(text2);
      coreWidthFinalRef.current = text2.getComputedTextLength();

      document.body.removeChild(svg);
    };
    document.fonts.ready.then(() => {
      measure();
      if (animDoneRef.current) applyFinalVisualState();
    });
  }, [applyFinalVisualState]);

  // On mobile: skip SVG, show final state after brief delay
  useEffect(() => {
    if (!isMobile) return;
    const frame = window.requestAnimationFrame(() => {
      animProgressRef.current = 1;
      animDoneRef.current = true;
      setAnimDone(true);
      if (typeof window !== 'undefined') window.hasPlayedHeroAnimation = true;
      dispatchHeroProgress(1);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isMobile, dispatchHeroProgress]);

  useEffect(() => {
    if (isMobile) return;

    // If animation is already done (navigation return), skip logic
    if (animDoneRef.current) return;

    animProgressRef.current = 0;
    isAutoPlayingRef.current = true;
    autoPlayStartRef.current = performance.now();

    const handleWheel = (e: WheelEvent) => {
      if (animDoneRef.current) return;
      if (window.scrollY > 80) return;
      if (e.deltaY > 0 && animProgressRef.current < 1) {
        e.preventDefault();
        isAutoPlayingRef.current = false;
        animProgressRef.current = Math.min(1, animProgressRef.current + (e.deltaY * 0.0006));
        if (animProgressRef.current >= 1) {
          animDoneRef.current = true;
          setAnimDone(true);
          if (typeof window !== 'undefined') window.hasPlayedHeroAnimation = true;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  useEffect(() => {
    if (shouldReduce || isMobile || animDone) {
      if (!animDone) {
        // Force finish if reduced motion or mobile but allow render to catch up
        // This block is mostly fallback
      }
      return;
    }

    const tick = () => {
      if (isAutoPlayingRef.current) {
        const elapsed = performance.now() - autoPlayStartRef.current;
        const rawT = Math.min(1, elapsed / AUTOPLAY_DURATION);
        animProgressRef.current = rawT;
        if (rawT >= 1) {
          isAutoPlayingRef.current = false;
          if (!animDoneRef.current) {
            animDoneRef.current = true;
            setAnimDone(true);
            if (typeof window !== 'undefined') window.hasPlayedHeroAnimation = true;
          }
        }
      }

      const progress = animProgressRef.current;
      dispatchHeroProgress(progress);

      if (path1Ref.current) path1Ref.current.setAttribute('d', generatePathD(complexPath1, makeStraight(-2200, 5700), progress));
      if (path2Ref.current) path2Ref.current.setAttribute('d', generatePathD(complexPath2, makeStraight(-2200, 5700), progress));

      const speed = 1.8 * Math.max(0, 1 - progress * 1.6);
      offset1Ref.current -= speed;
      offset2Ref.current += speed * 1.15;

      if (phraseWidthRef.current > 0) {
        if (offset1Ref.current <= -phraseWidthRef.current) offset1Ref.current = 0;
        if (offset2Ref.current >= phraseWidthRef.current) offset2Ref.current = 0;
      }

      const finalBlueOffset = 3600 - coreWidthFinalRef.current / 2;
      const snapT = easeInOutQuint(Math.max(0, (progress - 0.60) / 0.35));
      const currentOffset1 = snapT > 0 ? lerp(offset1Ref.current, finalBlueOffset, snapT) : offset1Ref.current;

      if (textPath1Ref.current) textPath1Ref.current.setAttribute('startOffset', String(currentOffset1));

      const currentOffset2 = snapT > 0 ? lerp(offset2Ref.current, finalBlueOffset, snapT) : offset2Ref.current;
      if (textPath2Ref.current) textPath2Ref.current.setAttribute('startOffset', String(currentOffset2));

      if (clipRectRef.current && phraseWidthRef.current > 0) {
        const clipT = easeInOutQuint(Math.max(0, (progress - 0.90) / 0.10));
        const fullW = 5000;
        const targetW = coreWidthFinalRef.current + 500;
        const w = lerp(fullW, targetW, clipT);
        clipRectRef.current.setAttribute('x', String(1400 - w / 2));
        clipRectRef.current.setAttribute('width', String(w));
      }

      const repetitionsOpacity = progress > 0.65 ? Math.max(0, 1 - (progress - 0.65) / 0.25) : 1;
      const path2Opacity = progress > 0.75 ? Math.max(0, 1 - (progress - 0.75) / 0.15) : 0.8;

      tspans1Ref.current.forEach((tspan, i) => { if (tspan) tspan.style.opacity = i === 0 ? '1' : String(repetitionsOpacity); });
      tspans2Ref.current.forEach((tspan, i) => { if (tspan) tspan.style.opacity = String(path2Opacity * (i === 0 ? 1 : repetitionsOpacity)); });

      if (scrollHintRef.current) scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 6));
      if (cornerLabelRef.current) cornerLabelRef.current.style.opacity = String(Math.max(0, 1 - progress * 6));

      if (!animDoneRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldReduce, dispatchHeroProgress, animDone]);

  useLayoutEffect(() => {
    const subtitleEl = subtitleWrapRef.current;
    const titleEl = finalTitleRef.current;
    const section = sectionRef.current;
    if (!subtitleEl && !titleEl) return;

    if (subtitleEl) {
      subtitleEl.style.position = '';
      subtitleEl.style.left = '';
      subtitleEl.style.top = '';
      subtitleEl.style.transform = '';
    }
    if (titleEl) {
      titleEl.style.position = '';
      titleEl.style.left = '';
      titleEl.style.top = '';
      titleEl.style.fontSize = '';
      titleEl.style.transform = '';
      titleEl.style.transformOrigin = '';
      titleEl.style.width = '';
    }

    if (!animDone || isMobile || !section) {
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const tspanRect = tspans1Ref.current[0]?.getBoundingClientRect();
    const vw = section.clientWidth;
    const vh = section.clientHeight;
    const scale = Math.max(vw / 3600, vh / 1800);
    const finalFontSize = LOOP_FONT_SIZE * scale;

    const canUseTspanRect = !!(
      tspanRect &&
      tspanRect.width > 1 &&
      tspanRect.height > 1 &&
      tspanRect.height < finalFontSize * 1.8 &&
      tspanRect.width < sectionRect.width * 0.95
    );

    if (canUseTspanRect && tspanRect) {
      if (titleEl) {
        titleEl.style.position = 'absolute';
        titleEl.style.left = `${tspanRect.left - sectionRect.left}px`;
        titleEl.style.top = `${tspanRect.top - sectionRect.top + (tspanRect.height - finalFontSize) / 2}px`;
        titleEl.style.fontSize = `${finalFontSize}px`;
        titleEl.style.transform = 'none';
        titleEl.style.transformOrigin = 'top left';
        titleEl.style.width = 'max-content';
      }
      if (subtitleEl) {
        const gap = Math.max(22, Math.min(44, tspanRect.height * 0.24));
        subtitleEl.style.position = 'absolute';
        subtitleEl.style.left = `${tspanRect.left - sectionRect.left + tspanRect.width / 2}px`;
        subtitleEl.style.top = `${tspanRect.bottom - sectionRect.top + gap}px`;
        subtitleEl.style.transform = 'translateX(-50%)';
      }
      return;
    }

    if (titleEl) {
      titleEl.style.position = 'absolute';
      titleEl.style.left = '50%';
      titleEl.style.top = `${(VB_CY + 20) * scale}px`;
      titleEl.style.fontSize = `${finalFontSize}px`;
      titleEl.style.transform = 'translateX(-50%)';
      titleEl.style.transformOrigin = 'center top';
      titleEl.style.width = 'max-content';
    }
    if (subtitleEl) {
      subtitleEl.style.position = 'absolute';
      subtitleEl.style.left = '50%';
      subtitleEl.style.top = `${(VB_CY + 20) * scale + LOOP_FONT_SIZE * scale + 34 * scale}px`;
      subtitleEl.style.transform = 'translateX(-50%)';
    }
  }, [animDone, isMobile, titleHoverActive]);


  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-white overflow-hidden ${isMobile ? 'h-[68dvh] min-h-[380px] max-h-[560px]' : 'h-dvh'}`}
    >
      <h1 className="sr-only">{CORE_PHRASE}</h1>

      <motion.div
        style={{
          x: mousePos.x,
          y: mousePos.y,
          rotateX: -mousePos.y * 0.5,
          rotateY: mousePos.x * 0.5
        }}
        className="absolute inset-0 w-full h-full"
      >
        {!isMobile && (
          <svg
            viewBox="-400 -200 3600 1800"
            style={{
              position: 'absolute',
              left: '0', top: 0, width: '100%', height: '100%',
              zIndex: 10,
              pointerEvents: 'none',
              opacity: 1,
            }}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <path ref={path1Ref} id="heroTextPath1" d={generatePathD(complexPath1, makeStraight(-2200, 5700), 0)} />
              <path ref={path2Ref} id="heroTextPath2" d={generatePathD(complexPath2, makeStraight(-2200, 5700), 0)} />
              <clipPath id="heroTextClip"><rect ref={clipRectRef} x="-400" y="-400" width="4000" height="2000" /></clipPath>
            </defs>
            <g clipPath="url(#heroTextClip)">
              {/* Path 2 — Pink Accent (was Beige) */}
              <text className="select-none pointer-events-none" style={{ fill: '#D62B00', opacity: animDone && !isMobile ? 0 : 0.72, mixBlendMode: 'multiply', transition: 'opacity 0.14s ease', fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT, letterSpacing: '-0.02em' }}>
                <textPath ref={textPath2Ref} href="#heroTextPath2">
                  {loopIndices.map(i => (
                    <tspan key={i} ref={el => { tspans2Ref.current[i] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{(i === 0 ? "" : SEPARATOR) + CORE_PHRASE + "."}</tspan>
                  ))}
                </textPath>
              </text>

              {/* Path 1 — Blue Primary (was Black) */}
              <text
                className="select-none pointer-events-none"
                style={{
                  fill: '#0055ff',
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHT,
                  letterSpacing: '-0.02em',
                  opacity: animDone && !isMobile && titleHoverActive ? 0 : 1,
                  transition: 'opacity 0.14s ease',
                }}
              >
                <textPath ref={textPath1Ref} href="#heroTextPath1">
                  <tspan ref={el => { tspans1Ref.current[0] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{CORE_PHRASE}</tspan>
                  <tspan style={{ fontSize: LOOP_FONT_SIZE, fill: '#ff00aa' }}>.</tspan>
                  {loopIndices.slice(1).map(i => (
                    <tspan key={i} ref={el => { tspans1Ref.current[i] = el; }} style={{ fontSize: LOOP_FONT_SIZE }}>{SEPARATOR + CORE_PHRASE + "."}</tspan>
                  ))}
                </textPath>
              </text>
            </g>
          </svg>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {animDone && (
          <motion.div
            key="final-text"
            initial={isMobile ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none px-4"
          >
            {!isMobile && (
              <div
                ref={finalTitleRef}
                onMouseEnter={() => setTitleHoverActive(true)}
                onMouseLeave={() => setTitleHoverActive(false)}
                className="pointer-events-auto whitespace-nowrap"
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHT,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  opacity: titleHoverActive ? 1 : 0,
                  transition: 'opacity 0.14s ease',
                }}
              >
                {Array.from(`${CORE_PHRASE}.`).map((char, index) => (
                  <BubbleCharacter key={`final-char-${index}`} char={char} isPink={char === '.'} />
                ))}
              </div>
            )}

            {isMobile && (
              <div
                className="flex flex-col justify-center items-center text-center"
                style={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHT,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: '#0055ff',
                  display: 'flex',
                  pointerEvents: 'auto'
                }}
              >
                <span className="text-[#0055ff] text-[clamp(2.2rem,12vw,3.8rem)] leading-[0.95]">
                  <span className="block">{"Let's simplify"}</span>
                  <span className="block">
                    {'complex things'}
                    <span className="text-[#ff00aa]">.</span>
                  </span>
                </span>
              </div>
            )}

            {/* Subtitle - Centered below */}
            <div ref={subtitleWrapRef} className="mt-8 md:mt-12 flex flex-col items-center w-full max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: finalInteractiveReady ? 1 : 0, y: finalInteractiveReady ? 0 : 20 }}
                transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
                className="text-[#000088] text-base md:text-3xl lg:text-4xl leading-relaxed italic font-serif text-center"
              >
                I love understanding people, designing products, data, and simplifying complex systems.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Labels and Hints (Static) */}
      <div ref={cornerLabelRef} className="absolute top-8 right-8 z-50 pointer-events-none text-[#0c0c0a] hidden md:flex items-start gap-3">
        <span className="font-bold text-[0.875rem] uppercase tracking-wider leading-none pt-1">Arnon Friedman</span>
        <div className="flex flex-col items-center">
          <span className="h-px w-6 bg-[#0c0c0a] mb-2" />
          <span className="font-medium text-[0.75rem] uppercase tracking-[0.2em] origin-top-left translate-x-2" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Portfolio</span>
        </div>
      </div>

      <motion.button
        ref={scrollHintRef}
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20 cursor-pointer select-none"
        style={{ background: 'none', border: 'none', padding: 0 }}
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
      >
        <span style={{ fontFamily: FONT_FAMILY, fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', color: '#aaa', textTransform: 'uppercase' }}>My Work</span>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <line x1="9" y1="1" x2="9" y2="17" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 3 12 L 9 18 L 15 12" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </section>
  );
};

// ─── BUBBLE CHARACTER COMPONENT ──────────────────────────────────
const BubbleCharacter: React.FC<{ char: string; isPink?: boolean }> = ({ char, isPink }) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hoverState, setHoverState] = useState({ dist: 1, dxNorm: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Interaction radius: 200px (tighter for individual letters)
      const maxDist = 200;
      const normalized = Math.min(distance / maxDist, 1);
      const dxNorm = Math.max(-1, Math.min(1, dx / maxDist));

      setHoverState({ dist: normalized, dxNorm });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // dist: 0 (close) -> 1 (far)

  // Weight: lighter near cursor
  const weight = 290 + (hoverState.dist * 520);

  // Lift: per-letter hop
  const lift = (1 - hoverState.dist) * -28;

  // Non-hovered letters lean toward cursor side (left/right)
  const tilt = hoverState.dxNorm * (0.4 + hoverState.dist * 0.6) * 9;
  const driftX = hoverState.dxNorm * hoverState.dist * 6;

  // Blue base -> accent (pink/purple) near cursor
  let r, g, b;
  const proximity = 1 - hoverState.dist;
  const sideMix = (hoverState.dxNorm + 1) / 2; // left->right

  const accentR = 255 + (119 - 255) * sideMix;
  const accentG = 0;
  const accentB = 170 + (255 - 170) * sideMix;

  if (isPink) {
    // Dot stays pink by default and drifts slightly purple by side + proximity
    r = 255 + (119 - 255) * (sideMix * (0.25 + proximity * 0.75));
    g = 0;
    b = 170 + (255 - 170) * (sideMix * (0.25 + proximity * 0.75));
  } else {
    r = 0 + (accentR - 0) * proximity;
    g = 85 + (accentG - 85) * proximity;
    b = 255 + (accentB - 255) * proximity;
  }

  const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

  return (
    <motion.span
      ref={elementRef}
      className="text-[1em] select-none"
      style={{
        display: 'inline-block',
        color: color,
        fontWeight: weight,
        y: lift,
        x: driftX,
        rotateZ: tilt,
        transition: 'color 0.1s, font-weight 0.1s, transform 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
        cursor: 'default',
        willChange: 'transform, font-weight, color',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};
