import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type GrainientProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const createNoiseDataUrl = (grainAmount: number) => {
  if (typeof document === 'undefined') return '';
  const amount = clamp(grainAmount, 0, 1);
  const size = 96;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const alpha = Math.floor(Math.random() * 255 * amount);
    data[i] = 160;
    data[i + 1] = 160;
    data[i + 2] = 160;
    data[i + 3] = alpha;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

const Grainient: React.FC<GrainientProps> = ({
  color1 = '#adbdcc',
  color2 = '#ffffff',
  color3 = '#3366ff',
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Slightly lagging spring creates a "dragging" feel with the cursor.
  const smoothX = useSpring(mouseX, { stiffness: 38, damping: 16, mass: 0.9 });
  const smoothY = useSpring(mouseY, { stiffness: 38, damping: 16, mass: 0.9 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const amp = warpAmplitude * clamp(warpStrength, 0, 3);
      mouseX.set(nx * amp);
      mouseY.set(ny * amp);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, warpAmplitude, warpStrength]);

  const layer1X = useTransform(smoothX, (v) => v * 0.22);
  const layer1Y = useTransform(smoothY, (v) => v * 0.22);
  const layer2X = useTransform(smoothX, (v) => v * -0.17);
  const layer2Y = useTransform(smoothY, (v) => v * -0.17);
  const layer3X = useTransform(smoothX, (v) => v * 0.11);
  const layer3Y = useTransform(smoothY, (v) => v * 0.11);
  const noiseX = useTransform(smoothX, (v) => v * 0.35);
  const noiseY = useTransform(smoothY, (v) => v * 0.35);

  const noiseDataUrl = useMemo(() => createNoiseDataUrl(grainAmount), [grainAmount]);

  const balance = clamp(colorBalance, -1, 1);
  const soft = clamp(blendSoftness, 0.01, 0.8);
  const blendStopA = clamp(45 + balance * 22, 15, 78);
  const blendStopB = clamp(blendStopA + soft * 35, blendStopA + 3, 95);
  const filter = `contrast(${Math.max(0.4, contrast)}) saturate(${Math.max(0, saturation)}) brightness(${Math.max(0.4, gamma)})`;

  const xBias = clamp(centerX, -1, 1) * 14;
  const yBias = clamp(centerY, -1, 1) * 14;

  const rotationDelta = clamp(rotationAmount / 1200, 0, 8);
  const baseDuration = Math.max(18, 120 / Math.max(0.1, timeSpeed + warpSpeed * 0.2 + warpFrequency * 0.05));
  const zoomScale = clamp(zoom, 0.6, 1.4);
  const noiseSize = `${Math.max(18, Math.round(140 / Math.max(0.5, grainScale * noiseScale)))}px`;

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: color2,
          filter,
          transform: `scale(${zoomScale})`,
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          inset: '-24%',
          x: layer1X,
          y: layer1Y,
          background: `radial-gradient(circle at ${34 + xBias}% ${32 + yBias}%, ${color1} 0%, transparent 64%)`,
          mixBlendMode: 'multiply',
          opacity: 0.62,
          filter: `blur(${42 + warpFrequency * 2}px)`,
        }}
        animate={{ rotate: [0, rotationDelta] }}
        transition={{ duration: baseDuration, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        style={{
          position: 'absolute',
          inset: '-24%',
          x: layer2X,
          y: layer2Y,
          background: `radial-gradient(circle at ${66 - xBias}% ${58 - yBias}%, ${color3} 0%, transparent 62%)`,
          mixBlendMode: 'screen',
          opacity: 0.38,
          filter: `blur(${56 + warpFrequency * 2}px)`,
        }}
        animate={{ rotate: [0, -rotationDelta * 1.4] }}
        transition={{ duration: baseDuration * 0.92, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          x: layer3X,
          y: layer3Y,
          background: `linear-gradient(${blendAngle}deg, ${color2} 0%, ${color2} ${blendStopA}%, ${color1} ${blendStopB}%, ${color3} 100%)`,
          mixBlendMode: 'soft-light',
          opacity: 0.28,
        }}
      />

      {noiseDataUrl && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            x: noiseX,
            y: noiseY,
            backgroundImage: `url(${noiseDataUrl})`,
            backgroundSize: noiseSize,
            opacity: clamp(grainAmount * 1.35, 0.02, 0.22),
            mixBlendMode: 'multiply',
          }}
          animate={grainAnimated ? { backgroundPositionX: ['0px', '120px'] } : undefined}
          transition={grainAnimated ? { duration: 2.8, repeat: Infinity, ease: 'linear' } : undefined}
        />
      )}
    </div>
  );
};

export default Grainient;
