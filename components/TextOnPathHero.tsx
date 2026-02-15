import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';

// ───────────────────────────────────────────────────────────
// TEXT ON PATH HERO — "let's simplify complex things"
// Two intertwined text paths: wavy lines with a loop that
// goes off-screen above the viewport, so text appears to
// come back upside-down from the top. On scroll both paths
// gradually straighten into a single horizontal line.
// ───────────────────────────────────────────────────────────

const CORE_PHRASE = "let's simplify complex things";
const SEPARATOR = "  ·  ";
const FULL_UNIT = CORE_PHRASE + SEPARATOR;
const INFINITE_TEXT = FULL_UNIT.repeat(80);
const LOOP_FONT_SIZE = 120; // SVG units — scales with viewBox
const FONT_FAMILY = "'Space Grotesk', sans-serif";
const FONT_WEIGHT = 800; // Bolder font

// ── ViewBox ──
// viewBox="-200 -1200 2800 2200"
// This gives extra room above the viewport for the off-screen loop.
// The visible screen maps roughly to x:[0..2400], y:[0..1000]
// but the path extends up to y:-1000 (off-screen above)
const VB_CY = 620; // slightly below center to account for wave amplitude above

type PathPoints = Record<string, [number, number]>;

// ── Path 1: L→R with 2 real loops ──
// A cubic bezier loop is created when C2 is to the LEFT of the segment start —
// the path folds back on itself, creating a visible crossing/loop.
const complexPath1: PathPoints = {
  // ── PATH 1: Left-Heavy Loop (Upward) ──
  // Starts Left, big loop on the left side, then flows straight-ish to right.

  // 1. Enter from left
  m: [-2200, VB_CY],
  c1: [-1200, VB_CY],
  c2: [-600, VB_CY + 200],
  to1: [-100, VB_CY + 200],

  // 2. The Big Left Loop (Upward)
  c3: [600, VB_CY + 200],   // Push right
  c4: [800, VB_CY - 1000],  // Pull WAY up
  to2: [300, VB_CY - 800],   // Apex top-left

  // 3. Loop Back & Cross
  c5: [-200, VB_CY - 600],   // Pull back left
  c6: [200, VB_CY + 800],   // Dive down to cross
  to3: [1200, VB_CY + 400],   // Land center-ish low

  // 4. Recovery to Center Line
  c7: [1800, VB_CY + 150],
  c8: [2200, VB_CY],
  to4: [2600, VB_CY],

  // 5. Exit Right (Smooth)
  c9: [3000, VB_CY],
  c10: [3400, VB_CY],
  to5: [3800, VB_CY],

  c11: [4200, VB_CY],
  c12: [4600, VB_CY],
  to6: [5000, VB_CY],

  c13: [5200, VB_CY],
  c14: [5300, VB_CY],
  to7: [5400, VB_CY],

  c15: [5500, VB_CY],
  c16: [5600, VB_CY],
  to8: [5700, VB_CY],
};

// ── PATH 2: Right-Heavy Loop (Downward) ──
// Symmetrical to Path 1 but on the right side and looping downwards.
const complexPath2: PathPoints = {
  // 1. Enter from Right (Flowing Left)
  m: [5000, VB_CY],
  c1: [4000, VB_CY],
  c2: [3400, VB_CY - 200],
  to1: [2900, VB_CY - 200],

  // 2. The Big Right Loop (Downward)
  c3: [2200, VB_CY - 200],   // Push left
  c4: [2000, VB_CY + 1000],  // Pull WAY down
  to2: [2500, VB_CY + 800],   // Apex bottom-right

  // 3. Loop Back & Cross
  c5: [3000, VB_CY + 600],   // Pull back right
  c6: [2600, VB_CY - 800],   // Fly up to cross
  to3: [1600, VB_CY - 400],   // Land center-ish high

  // 4. Recovery to Center Line
  c7: [1000, VB_CY - 150],
  c8: [600, VB_CY],
  to4: [200, VB_CY],

  // 5. Exit Left (Smooth)
  c9: [-200, VB_CY],
  c10: [-600, VB_CY],
  to5: [-1000, VB_CY],

  c11: [-1400, VB_CY],
  c12: [-1800, VB_CY],
  to6: [-2200, VB_CY],

  c13: [-2400, VB_CY],
  c14: [-2500, VB_CY],
  to7: [-2600, VB_CY],

  c15: [-2700, VB_CY],
  c16: [-2800, VB_CY],
  to8: [-2900, VB_CY],
};

// ── Straight paths (resolved state) ──
const makeStraight = (startX: number, endX: number): PathPoints => {
  const keys = ['m', 'c1', 'c2', 'to1', 'c3', 'c4', 'to2', 'c5', 'c6', 'to3', 'c7', 'c8', 'to4', 'c9', 'c10', 'to5', 'c11', 'c12', 'to6', 'c13', 'c14', 'to7', 'c15', 'c16', 'to8'];
  const pts: PathPoints = {};
  keys.forEach((k, i) => {
    pts[k] = [startX + (endX - startX) * (i / (keys.length - 1)), VB_CY];
  });
  return pts;
};

const simplePath1 = makeStraight(-2200, 5700);
const simplePath2 = makeStraight(5000, -2900);

// ── Utilities ──

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function generatePathD(
  complexP: PathPoints,
  simpleP: PathPoints,
  rawProgress: number,
): string {
  const t = easeInOutCubic(Math.min(rawProgress / 0.75, 1));
  const p = (key: string, idx: number) =>
    lerp(complexP[key][idx], simpleP[key][idx], t);

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

const EASE_POWER: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Half mouse-wheel SVG (side view, top half only) ──
const MouseWheelIcon: React.FC = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    {/* Outer shell — top half of mouse body, side view */}
    <path
      d="M 4 28 L 4 12 C 4 5.4 8.4 1 14 1 C 19.6 1 24 5.4 24 12 L 24 28"
      stroke="#a8a39a"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Scroll wheel — small oval near the top */}
    <ellipse
      cx="14"
      cy="11"
      rx="2.5"
      ry="4"
      stroke="#a8a39a"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

// ── Component ──
export const TextOnPathHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const textPath1Ref = useRef<SVGTextPathElement>(null);
  const textPath2Ref = useRef<SVGTextPathElement>(null);
  const flowingGroupRef = useRef<SVGGElement>(null);
  const resolvedGroupRef = useRef<SVGGElement>(null);
  const resolvedTextRef = useRef<SVGTextElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const cornerLabelRef = useRef<HTMLDivElement>(null);

  const phraseWidthRef = useRef(0);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const rafRef = useRef(0);

  // Refs for individual phrase tspans
  const tspans1Ref = useRef<(SVGTSpanElement | null)[]>([]);
  const tspans2Ref = useRef<(SVGTSpanElement | null)[]>([]);

  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Number of repetitions - fewer handles but enough to fill screen + flow
  // 30 repeats * ~1500 width = 45000 total width. Plenty.
  const REPEAT_COUNT = 40;
  const loopIndices = Array.from({ length: REPEAT_COUNT }, (_, i) => i);

  // Measure one phrase width after fonts load
  useEffect(() => {
    const measure = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.style.fontFamily = FONT_FAMILY;
      text.style.fontSize = `${LOOP_FONT_SIZE}px`; // Base size calculation
      text.style.fontWeight = String(FONT_WEIGHT);
      text.textContent = FULL_UNIT;
      svg.appendChild(text);
      document.body.appendChild(svg);
      phraseWidthRef.current = text.getComputedTextLength();
      document.body.removeChild(svg);
    };
    document.fonts.ready.then(measure);
  }, []);

  // Dispatch custom event so App.tsx can show/hide navbar
  const dispatchHeroProgress = useCallback((progress: number) => {
    window.dispatchEvent(new CustomEvent('hero-scroll-progress', {
      detail: { progress },
    }));
  }, []);

  // Animation loop
  useEffect(() => {
    if (shouldReduce) return;

    const tick = () => {
      const progress = scrollYProgress.get();
      dispatchHeroProgress(progress);

      // 1. Path Morphing
      if (path1Ref.current) {
        path1Ref.current.setAttribute('d', generatePathD(complexPath1, simplePath1, progress));
      }
      if (path2Ref.current) {
        path2Ref.current.setAttribute('d', generatePathD(complexPath2, simplePath2, progress));
      }

      // 2. Base Speed Calculation
      const speed = 1.8 * Math.max(0, 1 - progress * 1.5);

      // 3. Offset Updates
      // We move the offsets continuously. 
      // Note: We don't reset to 0 abruptly because we are scaling individual items, visual jumps might occur if sizing isn't uniform at wrap point.
      // However, with 40 repeats and huge buffer, straight continuous scroll is fine for a while.
      offset1Ref.current -= speed;
      offset2Ref.current -= speed * 0.8;

      // Wrap-around logic (optional, dependent on visual smoothness)
      // If we know total strip length, we can modulo.
      const totalStripW = phraseWidthRef.current * REPEAT_COUNT;
      if (phraseWidthRef.current > 0) {
        if (offset1Ref.current < -totalStripW / 2) offset1Ref.current += phraseWidthRef.current;
        if (offset2Ref.current < -totalStripW / 2) offset2Ref.current += phraseWidthRef.current;
      }

      // 4. Transition & Centering Logic
      const transitionStart = 0.7;
      const transitionEnd = 0.95;
      const tProgress = Math.min(1, Math.max(0, (progress - transitionStart) / (transitionEnd - transitionStart)));

      const targetOffset = 1200 - (phraseWidthRef.current / 2);
      const currentOffset1 = tProgress > 0 ? lerp(offset1Ref.current, targetOffset, tProgress) : offset1Ref.current;
      const currentOffset2 = tProgress > 0 ? lerp(offset2Ref.current, targetOffset, tProgress) : offset2Ref.current;

      if (textPath1Ref.current) {
        textPath1Ref.current.setAttribute('startOffset', String(currentOffset1));
        const isNearEnd = progress > 0.92;
        textPath1Ref.current.style.fill = isNearEnd ? '#0c0c0a' : '#0055ff';
      }
      if (textPath2Ref.current) {
        textPath2Ref.current.setAttribute('startOffset', String(currentOffset2));
        textPath2Ref.current.style.opacity = String(0.5 * (1 - tProgress * 1.5));
      }

      // 5. DYNAMIC FONT SIZING (The "Rollercoaster" size effect)
      // Effect strength fades out as we scroll down (becomes uniform)
      // scaleEffect = 1.0 (strong) -> 0.0 (none/uniform)
      const scaleEffectStrength = Math.max(0, 1 - progress * 2.5);

      if (phraseWidthRef.current > 0 && scaleEffectStrength > 0.01) {
        // Center of the viewBox X-wise is approx 1200
        const VIEW_CENTER_X = 1200;
        const VIEW_WIDTH = 2400; // Roughly the visible area

        // Helper to update tspans
        const updateTspans = (
          tspans: (SVGTSpanElement | null)[],
          baseOffset: number
        ) => {
          tspans.forEach((tspan, i) => {
            if (!tspan) return;

            // Estimated position of this phrase along the path
            // (Strictly linear estimate, but sufficient for visual wave)
            const phraseCenterOnPath = baseOffset + (i * phraseWidthRef.current) + (phraseWidthRef.current / 2);

            // Distance from center of "stage"
            // We normalize this to -1..0..1 range roughly across strict visible area
            let distNorm = (phraseCenterOnPath - VIEW_CENTER_X) / (VIEW_WIDTH / 1.5);

            // Clamp roughly
            // We want: Center (0) -> Small, Edges (+/- 1) -> Large
            // Parabola: y = x^2 (0 at center, 1 at edges)
            // Or Cosine: cos(0) = 1 (Big center? No we want small center).
            // Let's use |x| or x^2.
            // Let's use a nice curve: 1.0 (Base) + Strength * (|distNorm|^1.5)

            const distAbs = Math.abs(distNorm);
            const sizeMultiplier = 1 + (scaleEffectStrength * 0.85 * Math.pow(distAbs, 1.5));

            // Clamp min/max scaling just in case
            const finalScale = Math.max(0.6, Math.min(2.5, sizeMultiplier));

            tspan.style.fontSize = `${LOOP_FONT_SIZE * finalScale}px`;
          });
        };

        updateTspans(tspans1Ref.current, currentOffset1);
        updateTspans(tspans2Ref.current, currentOffset2);

      } else {
        // Reset to uniform if effect is off/done (performance optimization)
        // Only reset once when reaching threshold to avoid DOM thrashing? 
        // For smoothness, we continue to run it or just check if we need to reset.
        // If we passed the threshold recently, forcing 120px is safe.
        // Let's just set it to base size if progress is high.
        if (progress > 0.5) {
          const reset = (tspans: (SVGTSpanElement | null)[]) => {
            tspans.forEach(t => { if (t && t.style.fontSize !== `${LOOP_FONT_SIZE}px`) t.style.fontSize = `${LOOP_FONT_SIZE}px`; });
          };
          reset(tspans1Ref.current);
          reset(tspans2Ref.current);
        }
      }

      // 6. Cross-fade groups
      const flowingOpacity = Math.max(0, 1 - (progress - 0.95) / 0.05);
      const resolvedOpacity = Math.min(1, Math.max(0, (progress - 0.98) / 0.02));

      if (flowingGroupRef.current) {
        flowingGroupRef.current.style.opacity = String(flowingOpacity);
      }
      if (resolvedGroupRef.current) {
        resolvedGroupRef.current.style.opacity = String(resolvedOpacity);
      }

      // Animate resolved text
      const resolvedProgress = Math.min(1, Math.max(0, (progress - 0.88) / 0.12));
      if (resolvedTextRef.current) {
        const ls = lerp(-0.02, 0.13, resolvedProgress);
        resolvedTextRef.current.style.letterSpacing = `${ls}em`;
      }

      // Corner Label fade (fade out by 20% scroll)
      if (cornerLabelRef.current) {
        cornerLabelRef.current.style.opacity = String(Math.max(0, 1 - progress * 5));
      }

      // Scroll hint fade
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 5));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldReduce, scrollYProgress, dispatchHeroProgress]);

  if (shouldReduce) {
    return (
      <section className="relative w-full min-h-screen bg-[#f4f3f1] flex items-center justify-center">
        <h1 className="sr-only">{CORE_PHRASE}</h1>
        <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-semibold text-[#0c0c0a] tracking-[-0.02em] text-center px-6">
          {CORE_PHRASE}
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative w-full h-[400vh] bg-[#f4f3f1]">
      <h1 className="sr-only">{CORE_PHRASE}</h1>

      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE_POWER }}
          className="w-full h-full relative"
        >
          {/* SVG */}
          <svg
            viewBox="-600 -600 3600 2200"
            style={{ position: 'absolute', left: '-2%', top: 0, width: '104%', height: '100%' }}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <path ref={path1Ref} id="heroTextPath1" d={generatePathD(complexPath1, simplePath1, 0)} />
              <path ref={path2Ref} id="heroTextPath2" d={generatePathD(complexPath2, simplePath2, 0)} />

              {/* Mask for Variable Size Effect: White at edges (show large text), Black in middle (hide large text) */}
              <mask id="sizeMask">
                <rect x="-2000" y="-1000" width="8000" height="4000" fill="black" />
                <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="20%" stopColor="white" stopOpacity="1" />
                  <stop offset="45%" stopColor="black" stopOpacity="1" />
                  <stop offset="55%" stopColor="black" stopOpacity="1" />
                  <stop offset="80%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="1" />
                </linearGradient>
                <rect x="-2000" y="-1000" width="8000" height="4000" fill="url(#edgeGradient)" />
              </mask>
            </defs>

            {/* Flowing text group */}
            <g ref={flowingGroupRef}>

              {/* Path 1 — Bright Blue */}
              <text
                className="select-none pointer-events-none transition-colors duration-500"
                style={{
                  fill: '#0055ff',
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHT,
                  letterSpacing: '-0.02em',
                }}
              >
                <textPath ref={textPath1Ref} href="#heroTextPath1">
                  {loopIndices.map(i => (
                    <tspan
                      key={i}
                      ref={el => { tspans1Ref.current[i] = el }}
                      // Initial size to avoid FOUC
                      style={{ fontSize: LOOP_FONT_SIZE }}
                    >
                      {FULL_UNIT}
                    </tspan>
                  ))}
                </textPath>
              </text>

              {/* Path 2 — Pink Multiply */}
              <text
                className="select-none pointer-events-none"
                style={{
                  fill: '#ff00aa',
                  fontFamily: FONT_FAMILY,
                  fontWeight: FONT_WEIGHT,
                  letterSpacing: '-0.02em',
                  mixBlendMode: 'multiply',
                }}
              >
                <textPath ref={textPath2Ref} href="#heroTextPath2">
                  {loopIndices.map(i => (
                    <tspan
                      key={i}
                      ref={el => { tspans2Ref.current[i] = el }}
                      style={{ fontSize: LOOP_FONT_SIZE }}
                    >
                      {FULL_UNIT}
                    </tspan>
                  ))}
                </textPath>
              </text>
            </g>

            {/* Resolved centered text */}
            <g ref={resolvedGroupRef} style={{ opacity: 0 }}>
              <text
                ref={resolvedTextRef}
                x="1200"
                y={VB_CY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="select-none pointer-events-none"
                style={{
                  fill: '#0c0c0a',
                  fontFamily: FONT_FAMILY,
                  fontSize: 100,
                  fontWeight: FONT_WEIGHT,
                  letterSpacing: '-0.02em',
                }}
              >
                {CORE_PHRASE}
              </text>
            </g>
          </svg>

        </motion.div>

        {/* Top Right Corner Label (English, Layout: Name + Vertical 'Portfolio') */}
        <div
          ref={cornerLabelRef}
          className="absolute top-8 right-8 z-50 pointer-events-none text-[#0c0c0a] flex items-start gap-3"
        >
          {/* Horizontal Name */}
          <span className="font-bold text-[0.875rem] uppercase tracking-wider leading-none pt-1">
            Arnon Friedman
          </span>

          {/* Vertical Portfolio Label */}
          <div className="flex flex-col items-center">
            <span className="h-px w-6 bg-[#0c0c0a] mb-2" /> {/* Decorative line */}
            <span
              className="font-medium text-[0.75rem] uppercase tracking-[0.2em] origin-top-left translate-x-2"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Portfolio
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none z-10"
        >
          <div className="overflow-hidden" style={{ height: 20 }}>
            <MouseWheelIcon />
          </div>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              color: '#a8a39a',
              textTransform: 'uppercase',
            }}
          >
            scroll to simplify
          </span>
        </div>
      </div>
    </section>
  );
};
