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
const LOOP_FONT_SIZE = '68px';
const FONT_FAMILY = "'Space Grotesk', sans-serif";

// ── ViewBox ──
// viewBox="-200 -1200 2800 2200"
// This gives extra room above the viewport for the off-screen loop.
// The visible screen maps roughly to x:[0..2400], y:[0..1000]
// but the path extends up to y:-1000 (off-screen above)
const VB_CY = 500; // vertical center of visible area

type PathPoints = Record<string, [number, number]>;

// ── Path 1: wavy left-to-right with loop going off-screen top ──
//
// Shape description:
// 1. Enter from left off-screen, gentle wave up
// 2. Wave down
// 3. Rise up and EXIT off-screen above (loop goes up to y:-900)
// 4. Come back down from off-screen (text now appears upside-down)
// 5. Wave continues to the right
// 6. Gentle wave, exit right off-screen
//
const complexPath1: PathPoints = {
  m:    [-500, VB_CY + 50],
  c1:   [-200, VB_CY + 50],
  c2:   [0,    VB_CY - 75],
  to1:  [250,  VB_CY - 90],

  c3:   [450,  VB_CY - 100],
  c4:   [550,  VB_CY + 100],
  to2:  [700,  VB_CY + 110],

  c5:   [850,  VB_CY + 120],
  c6:   [900,  VB_CY - 150],
  to3:  [950,  -100],

  c7:   [1000, -400],
  c8:   [1400, -400],
  to4:  [1450, -100],

  c9:   [1500, VB_CY - 150],
  c10:  [1550, VB_CY + 120],
  to5:  [1700, VB_CY + 100],

  c11:  [1850, VB_CY + 80],
  c12:  [1950, VB_CY - 90],
  to6:  [2100, VB_CY - 75],

  c13:  [2250, VB_CY - 60],
  c14:  [2400, VB_CY + 50],
  to7:  [2550, VB_CY + 40],

  c15:  [2700, VB_CY + 30],
  c16:  [2800, VB_CY],
  to8:  [2900, VB_CY],
};

// ── Path 2: reverse direction, slightly offset wave ──
// Enters from right, similar wavy pattern, loop goes off-screen
// at a different X position, exits left
const complexPath2: PathPoints = {
  m:    [2900, VB_CY - 25],
  c1:   [2800, VB_CY - 25],
  c2:   [2700, VB_CY - 25],
  to1:  [2550, VB_CY - 15],

  c3:   [2400, VB_CY - 5],
  c4:   [2250, VB_CY + 100],
  to2:  [2100, VB_CY + 110],

  c5:   [1950, VB_CY + 120],
  c6:   [1900, VB_CY - 100],
  to3:  [1850, -100],

  c7:   [1800, -350],
  c8:   [1400, -350],
  to4:  [1350, -100],

  c9:   [1300, VB_CY - 100],
  c10:  [1250, VB_CY + 100],
  to5:  [1100, VB_CY + 90],

  c11:  [950,  VB_CY + 80],
  c12:  [850,  VB_CY - 100],
  to6:  [700,  VB_CY - 90],

  c13:  [550,  VB_CY - 80],
  c14:  [350,  VB_CY + 75],
  to7:  [150,  VB_CY + 50],

  c15:  [-50,  VB_CY + 25],
  c16:  [-300, VB_CY],
  to8:  [-500, VB_CY],
};

// ── Straight paths (resolved state) ──
const makeStraight = (startX: number, endX: number): PathPoints => {
  const keys = ['m','c1','c2','to1','c3','c4','to2','c5','c6','to3','c7','c8','to4','c9','c10','to5','c11','c12','to6','c13','c14','to7','c15','c16','to8'];
  const pts: PathPoints = {};
  keys.forEach((k, i) => {
    pts[k] = [startX + (endX - startX) * (i / (keys.length - 1)), VB_CY];
  });
  return pts;
};

const simplePath1 = makeStraight(-500, 2900);
const simplePath2 = makeStraight(2900, -500);

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

  return `M ${p('m',0)},${p('m',1)} ` +
    `C ${p('c1',0)},${p('c1',1)} ${p('c2',0)},${p('c2',1)} ${p('to1',0)},${p('to1',1)} ` +
    `C ${p('c3',0)},${p('c3',1)} ${p('c4',0)},${p('c4',1)} ${p('to2',0)},${p('to2',1)} ` +
    `C ${p('c5',0)},${p('c5',1)} ${p('c6',0)},${p('c6',1)} ${p('to3',0)},${p('to3',1)} ` +
    `C ${p('c7',0)},${p('c7',1)} ${p('c8',0)},${p('c8',1)} ${p('to4',0)},${p('to4',1)} ` +
    `C ${p('c9',0)},${p('c9',1)} ${p('c10',0)},${p('c10',1)} ${p('to5',0)},${p('to5',1)} ` +
    `C ${p('c11',0)},${p('c11',1)} ${p('c12',0)},${p('c12',1)} ${p('to6',0)},${p('to6',1)} ` +
    `C ${p('c13',0)},${p('c13',1)} ${p('c14',0)},${p('c14',1)} ${p('to7',0)},${p('to7',1)} ` +
    `C ${p('c15',0)},${p('c15',1)} ${p('c16',0)},${p('c16',1)} ${p('to8',0)},${p('to8',1)}`;
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
  const phraseWidthRef = useRef(0);
  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const rafRef = useRef(0);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Measure one phrase width after fonts load
  useEffect(() => {
    const measure = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.style.fontFamily = FONT_FAMILY;
      text.style.fontSize = LOOP_FONT_SIZE;
      text.style.fontWeight = '600';
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

      // Path morph
      if (path1Ref.current) {
        path1Ref.current.setAttribute('d', generatePathD(complexPath1, simplePath1, progress));
      }
      if (path2Ref.current) {
        path2Ref.current.setAttribute('d', generatePathD(complexPath2, simplePath2, progress));
      }

      // Text flow speed
      const speed = 1.8 * Math.max(0, 1 - progress * 1.5);

      // Path 1
      offset1Ref.current -= speed;
      if (phraseWidthRef.current > 0 && offset1Ref.current <= -phraseWidthRef.current) {
        offset1Ref.current = 0;
      }
      if (textPath1Ref.current) {
        textPath1Ref.current.setAttribute('startOffset', String(offset1Ref.current));
      }

      // Path 2 — slightly different speed
      offset2Ref.current -= speed * 0.8;
      if (phraseWidthRef.current > 0 && offset2Ref.current <= -phraseWidthRef.current) {
        offset2Ref.current = 0;
      }
      if (textPath2Ref.current) {
        textPath2Ref.current.setAttribute('startOffset', String(offset2Ref.current));
      }

      // Cross-fade
      const flowingOpacity = Math.max(0, 1 - (progress - 0.65) / 0.2);
      const resolvedOpacity = Math.min(1, Math.max(0, (progress - 0.70) / 0.2));

      // Animate resolved text — letter-spacing + font-size expand as it arrives
      const resolvedProgress = Math.min(1, Math.max(0, (progress - 0.70) / 0.28));
      if (resolvedTextRef.current) {
        const ls = lerp(-0.01, 0.13, resolvedProgress);
        resolvedTextRef.current.style.letterSpacing = `${ls}em`;
        const fs = lerp(62, 84, resolvedProgress);
        resolvedTextRef.current.style.fontSize = `${fs}px`;
      }

      if (flowingGroupRef.current) {
        flowingGroupRef.current.style.opacity = String(flowingOpacity);
      }
      if (resolvedGroupRef.current) {
        resolvedGroupRef.current.style.opacity = String(resolvedOpacity);
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
          {/* SVG takes the full sticky viewport; slice ensures edge-to-edge text */}
          <svg
            viewBox="-200 -600 2800 2200"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <path ref={path1Ref} id="heroTextPath1" d={generatePathD(complexPath1, simplePath1, 0)} />
              <path ref={path2Ref} id="heroTextPath2" d={generatePathD(complexPath2, simplePath2, 0)} />
            </defs>

            {/* Flowing text on both paths */}
            <g ref={flowingGroupRef}>
              {/* Path 1 — primary direction */}
              <text
                className="select-none pointer-events-none"
                style={{
                  fill: '#0c0c0a',
                  fontFamily: FONT_FAMILY,
                  fontSize: LOOP_FONT_SIZE,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                <textPath ref={textPath1Ref} href="#heroTextPath1">
                  {INFINITE_TEXT}
                </textPath>
              </text>

              {/* Path 2 — reverse direction, red multiply */}
              <text
                className="select-none pointer-events-none"
                style={{
                  fill: '#FF2010',
                  fontFamily: FONT_FAMILY,
                  fontSize: LOOP_FONT_SIZE,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  opacity: 0.15,
                  mixBlendMode: 'multiply',
                }}
              >
                <textPath ref={textPath2Ref} href="#heroTextPath2">
                  {INFINITE_TEXT}
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
                  fontSize: '62px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                {CORE_PHRASE}
              </text>
            </g>
          </svg>

          {/* ── Scroll hint at bottom of screen ── */}
          <div
            ref={scrollHintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none"
          >
            {/* Half mouse wheel — side view, top half clipped */}
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
        </motion.div>
      </div>
    </section>
  );
};
