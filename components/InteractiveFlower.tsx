import React, { useEffect, useMemo, useRef, useState } from 'react';

type FlowerRig = {
  mode: 'quick' | 'split';
  rootSelector: string;
  stemSelector: string;
  bloomSelector: string;
  pivot: {
    x: number;
    y: number;
  };
};

const DEFAULT_RIG: FlowerRig = {
  mode: 'quick',
  rootSelector: 'svg',
  stemSelector: '#stem',
  bloomSelector: '#bloom',
  pivot: { x: 0.5, y: 0.98 },
};

interface InteractiveFlowerProps {
  name: string;
  size?: number | string;
  amplitudeDeg?: number;
  durationMs?: number;
  enableParallaxBloom?: boolean;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return reduced;
}

function safeRig(input: Partial<FlowerRig> | null): FlowerRig {
  if (!input) return DEFAULT_RIG;
  const x = typeof input.pivot?.x === 'number' ? input.pivot.x : DEFAULT_RIG.pivot.x;
  const y = typeof input.pivot?.y === 'number' ? input.pivot.y : DEFAULT_RIG.pivot.y;

  return {
    mode: input.mode === 'split' ? 'split' : 'quick',
    rootSelector: input.rootSelector || DEFAULT_RIG.rootSelector,
    stemSelector: input.stemSelector || DEFAULT_RIG.stemSelector,
    bloomSelector: input.bloomSelector || DEFAULT_RIG.bloomSelector,
    pivot: {
      x: Math.min(1, Math.max(0, x)),
      y: Math.min(1, Math.max(0, y)),
    },
  };
}

function animateSway(
  el: Element,
  angle: number,
  duration: number
) {
  (el as HTMLElement).animate(
    [
      { transform: 'rotate(0deg)' },
      { transform: `rotate(${angle * 1.04}deg)` },
      { transform: `rotate(${angle}deg)` },
    ],
    {
      duration,
      fill: 'forwards',
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }
  );
}

function animateSettle(el: Element, angle: number, duration: number) {
  (el as HTMLElement).animate(
    [
      { transform: `rotate(${angle}deg)` },
      { transform: `rotate(${angle * -0.18}deg)` },
      { transform: 'rotate(0deg)' },
    ],
    {
      duration,
      fill: 'forwards',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }
  );
}

export const InteractiveFlower: React.FC<InteractiveFlowerProps> = ({
  name,
  size = 320,
  amplitudeDeg = 7,
  durationMs = 900,
  enableParallaxBloom = true,
}) => {
  const [svgMarkup, setSvgMarkup] = useState('');
  const [sanitizedMarkup, setSanitizedMarkup] = useState('');
  const [rig, setRig] = useState<FlowerRig>(DEFAULT_RIG);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTouchPulse, setIsTouchPulse] = useState(false);
  const [useImgFallback, setUseImgFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;
    setIsLoaded(false);

    const svgUrl = `/images/flowers/${name}.svg`;
    const rigUrl = `/images/flowers/${name}.rig.json`;

    Promise.all([
      fetch(svgUrl).then((r) => {
        if (!r.ok) throw new Error(`SVG not found: ${svgUrl}`);
        return r.text();
      }),
      fetch(rigUrl)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([svg, loadedRig]) => {
        if (!mounted) return;
        setSvgMarkup(svg);
        // Some exported SVGs include XML prolog/doctype that can break innerHTML injection.
        const sanitized = svg
          .replace(/<\?xml[\s\S]*?\?>/gi, '')
          .replace(/<!doctype[\s\S]*?>/gi, '')
          .trim();
        setSanitizedMarkup(sanitized);
        setUseImgFallback(false);
        setRig(safeRig(loadedRig));
        setIsLoaded(true);
      })
      .catch((error) => {
        if (!mounted) return;
        console.warn(`InteractiveFlower "${name}" load failed:`, error);
        setSvgMarkup('');
        setSanitizedMarkup('');
        setRig(DEFAULT_RIG);
        setUseImgFallback(true);
        setIsLoaded(false);
      });

    return () => {
      mounted = false;
    };
  }, [name]);

  useEffect(() => {
    if (!sanitizedMarkup || !containerRef.current) return;

    const rootSvg = containerRef.current.querySelector('svg');
    if (!rootSvg) {
      setUseImgFallback(true);
      return;
    }

    (rootSvg as unknown as HTMLElement).style.width = '100%';
    (rootSvg as unknown as HTMLElement).style.height = 'auto';
    (rootSvg as unknown as HTMLElement).style.display = 'block';

    const rootEl = rootSvg.matches(rig.rootSelector)
      ? rootSvg
      : rootSvg.querySelector(rig.rootSelector) || rootSvg;

    const stemEl = rootSvg.querySelector(rig.stemSelector);
    const bloomEl = rootSvg.querySelector(rig.bloomSelector);

    if (rig.mode === 'split' && (!stemEl || !bloomEl)) {
      console.warn(
        `InteractiveFlower "${name}": split selectors missing, falling back to quick mode.`
      );
      setRig((prev) => ({ ...prev, mode: 'quick' }));
    }

    const target = rig.mode === 'split' && stemEl ? stemEl : rootEl;
    if (!target) return;

    (target as HTMLElement).style.transformBox = 'fill-box';
    (target as HTMLElement).style.transformOrigin = `${rig.pivot.x * 100}% ${rig.pivot.y * 100}%`;

    if (bloomEl) {
      (bloomEl as HTMLElement).style.transformBox = 'fill-box';
      (bloomEl as HTMLElement).style.transformOrigin = `${rig.pivot.x * 100}% ${Math.min(
        1,
        rig.pivot.y + 0.04
      ) * 100}%`;
    }
  }, [sanitizedMarkup, rig, name]);

  const styleSize = useMemo(
    () => (typeof size === 'number' ? `${size}px` : size),
    [size]
  );

  const runEnter = () => {
    if (!containerRef.current || !isLoaded) return;
    if (reducedMotion) return;

    const rootSvg = containerRef.current.querySelector('svg');
    if (!rootSvg) return;

    const rootEl = rootSvg.matches(rig.rootSelector)
      ? rootSvg
      : rootSvg.querySelector(rig.rootSelector) || rootSvg;
    const stemEl = rootSvg.querySelector(rig.stemSelector);
    const bloomEl = rootSvg.querySelector(rig.bloomSelector);
    const target = rig.mode === 'split' && stemEl ? stemEl : rootEl;
    if (!target) return;

    animateSway(target, amplitudeDeg, durationMs);

    if (enableParallaxBloom && bloomEl) {
      (bloomEl as HTMLElement).animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: `rotate(${amplitudeDeg * 0.7}deg)` },
          { transform: `rotate(${amplitudeDeg * 0.85}deg)` },
        ],
        {
          duration: Math.round(durationMs * 1.25),
          fill: 'forwards',
          easing: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
        }
      );
    }
  };

  const runExit = () => {
    if (!containerRef.current || !isLoaded) return;

    const rootSvg = containerRef.current.querySelector('svg');
    if (!rootSvg) return;
    const rootEl = rootSvg.matches(rig.rootSelector)
      ? rootSvg
      : rootSvg.querySelector(rig.rootSelector) || rootSvg;
    const stemEl = rootSvg.querySelector(rig.stemSelector);
    const bloomEl = rootSvg.querySelector(rig.bloomSelector);
    const target = rig.mode === 'split' && stemEl ? stemEl : rootEl;
    if (!target) return;

    if (reducedMotion) {
      (target as HTMLElement).style.transform = 'rotate(0deg)';
      if (bloomEl) (bloomEl as HTMLElement).style.transform = 'rotate(0deg)';
      return;
    }

    animateSettle(target, amplitudeDeg, Math.min(1200, durationMs));
    if (enableParallaxBloom && bloomEl) {
      (bloomEl as HTMLElement).animate(
        [
          { transform: `rotate(${amplitudeDeg * 0.85}deg)` },
          { transform: `rotate(${amplitudeDeg * -0.1}deg)` },
          { transform: 'rotate(0deg)' },
        ],
        {
          duration: Math.min(1200, Math.round(durationMs * 1.2)),
          fill: 'forwards',
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }
      );
    }
  };

  return (
    <div
      role="img"
      aria-label={`${name} interactive flower`}
      style={{
        width: styleSize,
        maxWidth: '100%',
        opacity: reducedMotion ? 0.98 : 1,
        transition: 'opacity 220ms ease',
      }}
      onMouseEnter={runEnter}
      onMouseLeave={runExit}
      onPointerDown={() => {
        if (reducedMotion) return;
        setIsTouchPulse(true);
        runEnter();
      }}
      onPointerUp={() => {
        setIsTouchPulse(false);
        runExit();
      }}
      onPointerCancel={() => {
        setIsTouchPulse(false);
        runExit();
      }}
    >
      {!useImgFallback ? (
        <div
          ref={containerRef}
          style={{
            width: '100%',
            willChange: 'transform, opacity',
            opacity: isLoaded ? 1 : 0,
            transform: isTouchPulse ? 'scale(0.997)' : 'scale(1)',
            transition: 'opacity 200ms ease, transform 130ms ease',
          }}
          dangerouslySetInnerHTML={sanitizedMarkup ? { __html: sanitizedMarkup } : undefined}
        />
      ) : (
        <div
          style={{
            width: '100%',
            willChange: 'transform, opacity',
            opacity: 1,
            transform: isTouchPulse ? 'scale(0.997)' : 'scale(1)',
            transition: 'transform 130ms ease',
          }}
        >
          <img
            src={`/images/flowers/${name}.svg`}
            alt={`${name} flower`}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      )}
    </div>
  );
};
