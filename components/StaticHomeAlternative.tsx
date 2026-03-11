import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, animate, useMotionValue, useSpring } from 'framer-motion';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ScrambleText, HoverScramble } from './ScrambleText';
import { DigitalStack } from './DigitalStack';
import FlowingMenu from './FlowingMenu';
import { GeminiFlower } from './GeminiFlower';
import { TOP_FLOWERS } from './TopDownFlowers';

// ───────────────────────────────────────────────────────────
// FLOWER SCROLL SEQUENCE — 240 frames from /flower1/
// ───────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;

const FlowerScrollSequence: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.1'],
  });

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const n = String(i).padStart(3, '0');
      img.src = `/flower1/ezgif-frame-${n}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Update frame on scroll
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const frame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(v * (TOTAL_FRAMES - 1))));
      setCurrentFrame(frame);
    });
  }, [scrollYProgress]);

  // Draw frame on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[currentFrame];
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, [currentFrame, loaded]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin opacity-20" />
        </div>
      )}
    </div>
  );
};

// ───────────────────────────────────────────────────────────
// PALETTE — derived from the floral hero image
// ───────────────────────────────────────────────────────────
const P = {
  bg: '#f9f5f0',       // warm cream
  bgDeep: '#f0ebe4',       // slightly deeper cream
  text: '#2d2424',       // warm dark brown
  textMuted: '#7a6b6b',       // muted mauve-brown
  accent: '#b08d9e',       // dusty rose
  lavender: '#9e8fb8',       // soft lavender
  sage: '#7a9e7a',       // muted sage green
  rose: '#c9899a',       // soft pink
  border: '#e0d5cc',       // warm border
  dark: '#2d2424',       // dark section bg
  darkMuted: '#aa9999',       // dark section muted text (WCAG passing over #2d2424)
  darkBorder: '#4a3f3f',      // dark section border
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ───────────────────────────────────────────────────────────
// MAGNETIC BUTTON
// ───────────────────────────────────────────────────────────
const MagneticButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties | any;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
}> = ({ children, onClick, className = '', style, strength = 0.25, as = 'button', href, target }) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const handleMouseLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
  };
  const props = { ref: ref as any, onClick, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, className, style: { ...style, x, y } };

  if (as === 'a') return <motion.a {...props} href={href} target={target}>{children}</motion.a>;
  return <motion.button {...props}>{children}</motion.button>;
};

// ───────────────────────────────────────────────────────────
// TEXT REVEAL
// ───────────────────────────────────────────────────────────
const TextReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: '110%' }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 0.8, delay, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
};

// ─── BUBBLE CHARACTER COMPONENT ──────────────────────────────────
const BubbleCharacter: React.FC<{ char: string; isPink?: boolean }> = ({ char, isPink }) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Interaction radius for bolding
      setIsHovered(distance < 35);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Use the font's native bold weight (700) on hover
  const weight = isHovered ? 700 : 400;

  // Color logic: darker brown on hover, base color otherwise
  const baseColor = isPink ? '#c9899a' : '#4a3333';
  const hoverColor = '#231818'; // Darker color
  const color = isHovered ? hoverColor : baseColor;

  return (
    <motion.span
      ref={elementRef}
      className="text-[1em] select-none inline-block origin-bottom transition-all duration-300"
      style={{
        color: color,
        fontWeight: weight,
        rotateZ: 6, // Reduced base tilt
        cursor: 'default',
        willChange: 'font-weight, color'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

// ───────────────────────────────────────────────────────────
// HERO — Video background with italic serif text + scroll effects
// ───────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Text parallax & fade
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Scroll-driven video zoom & blur
  const videoScale = useTransform(scrollYProgress, [0, 0.6], [1.05, 1.25]);
  const videoBlur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  // Scroll-driven overlay darkening
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.4]);

  // Scroll indicator fade out quickly
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Mouse-driven parallax + spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const bgY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(-cx * 40);
    mouseY.set(-cy * 25);
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlightPos({ x: 50, y: 50 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[75dvh] md:h-[100dvh] overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video background with scroll-driven zoom + blur */}
      <motion.div
        className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)]"
        style={{ x: bgX, y: bgY, scale: videoScale, filter: useTransform(videoBlur, (v) => `blur(${v}px)`) }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/alt-hero.png"
          className="w-full h-full object-cover"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Scroll-driven darkening overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#000', opacity: overlayOpacity }}
      />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 500px at ${spotlightPos.x}% ${spotlightPos.y}%, transparent 0%, rgba(0,0,0,0.15) 100%)`,
        }}
      />

      {/* Scroll-driven wrapper (parallax + fade) */}
      <motion.div
        style={{ y: yText, opacity: scrollOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pt-8 md:pt-12"
      >
        {/* Staggered entrance children */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.2em] uppercase mb-6 font-sans"
          style={{ color: 'rgba(90, 64, 64, 0.65)' }}
        >
          Product Designer
        </motion.p>

        <div
          className="font-serif italic text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-tight whitespace-nowrap flex flex-row justify-center py-4"
          style={{ color: '#4a3333' }}
        >
          {Array.from("Let's simplify complex things.").map((char, i) => (
            <BubbleCharacter key={i} char={char} isPink={char === '.'} />
          ))}
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20"
        >
          <motion.button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(90, 64, 64, 0.4)', opacity: scrollIndicatorOpacity } as any}
          >
            <span className="text-[0.65rem] tracking-[0.2em] uppercase font-sans">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8"
              style={{ background: 'rgba(90, 64, 64, 0.3)' }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};



// ───────────────────────────────────────────────────────────
// ABOUT — Same structure, floral palette
// ───────────────────────────────────────────────────────────
const AboutSection: React.FC<{ onExploreSideProjects: () => void }> = ({ onExploreSideProjects }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Exact bg color sampled from flower jpg corner: rgb(243,242,237)
  const FLOWER_BG = '#F3F2ED';

  return (
    <section id="about" ref={ref} className="w-full relative overflow-hidden" style={{ background: FLOWER_BG }}>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 680 }}>

        {/* LEFT — flower shifted left, bleeds to edge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex items-center overflow-hidden"
          style={{ background: FLOWER_BG }}
        >
          {/* Flower pushed ~8% to the left so it partially bleeds */}
          <div style={{ width: '100%', transform: 'translateX(-8%)' }}>
            <FlowerScrollSequence className="w-full" />
          </div>
        </motion.div>

        {/* RIGHT — text starts flush at the divider */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="flex flex-col justify-center py-20 pr-8 md:pr-16 lg:pr-20"
          style={{ paddingLeft: 40, background: FLOWER_BG }}
        >
          <ScrambleText text="ABOUT" className="eyebrow block mb-4" delay={0.2} />
          <div className="w-12 h-px mb-10" style={{ background: '#a89888' }} />

          <p className="text-[clamp(1rem,1.7vw,1.3rem)] leading-[1.65] mb-7" style={{ color: '#2d2424' }}>
            I love simplifying complex processes.
            With <strong className="font-semibold">4 years in product design</strong> + past experience in advertising,
            I've spent my time trying to understand how people think — through
            research, interviews, tools, and a lot of curiosity.
          </p>
          <p className="text-[clamp(1rem,1.7vw,1.3rem)] leading-[1.65] mb-10" style={{ color: '#2d2424' }}>
            I'm a lecturer at{' '}
            <strong className="font-semibold">Triolla College</strong>,
            I love to bake, and I have a broad understanding of{' '}
            <strong className="font-semibold">AI tools for designers</strong>{' '}
            and beyond. I've also built several{' '}
            <button
              onClick={onExploreSideProjects}
              className="underline underline-offset-4 hover:opacity-70 transition-opacity font-semibold"
              style={{ textDecorationColor: '#c9566a' }}
            >
              side projects
            </button>{' '}
            exploring these tools.
          </p>

          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t" style={{ borderColor: '#a89888' }}>
            <div>
              <span className="font-mono text-[0.8rem] block mb-1" style={{ color: '#7a6b6b' }}>EXPERIENCE</span>
              <span className="text-[0.9375rem] font-medium" style={{ color: '#2d2424' }}>4 years</span>
            </div>
            <div>
              <span className="font-mono text-[0.8rem] block mb-1" style={{ color: '#7a6b6b' }}>DOMAINS</span>
              <span className="text-[0.9375rem] font-medium" style={{ color: '#2d2424' }}>Insurtech, Fintech, AI, EdTech</span>
            </div>
            <div>
              <span className="font-mono text-[0.8rem] block mb-1" style={{ color: '#7a6b6b' }}>TEACHING</span>
              <span className="text-[0.9375rem] font-medium" style={{ color: '#2d2424' }}>Triolla College</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// EXPERTISE — Floral palette version
// ───────────────────────────────────────────────────────────
const ExpertiseSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const capabilities = [
    {
      title: 'UX Strategy',
      description: 'I turn complex business goals into clear user-centered strategies. Design starts with understanding the problem.',
      accent: P.lavender,
    },
    {
      title: 'Product Design',
      description: 'Crafting end-to-end digital experiences for complex systems, bridging user needs and business logic.',
      accent: P.rose,
    },
    {
      title: 'AI-Driven Design',
      description: 'Leveraging advanced AI tools to accelerate workflows and create smarter, future-proof interfaces.',
      accent: P.sage,
    },
    {
      title: 'Teaching',
      description: 'Sharing passion for design by mentoring students and simplifying complex concepts for the next generation.',
      accent: P.accent,
    },
  ];

  return (
    <section ref={ref} className="w-full py-16 md:py-32 relative px-container overflow-hidden" style={{ background: P.dark }}>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16"
        >
          <ScrambleText
            text="CORE FOCUS"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#8a7a7a] block"
            delay={0.2}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: P.darkBorder, border: `1px solid ${P.darkBorder}` }}>
          {capabilities.map((item, index) => {
            const TopFlower = TOP_FLOWERS[index % TOP_FLOWERS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                className="relative group md:aspect-square flex flex-col p-8 md:p-10 overflow-hidden"
                style={{ background: P.dark }}
              >
                {/* Spinning top-down flower hover effect - top right corner */}
                <div className="absolute top-6 right-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen">
                  <div className="w-16 h-16 group-hover:animate-[spin_20s_linear_infinite]">
                    <TopFlower className="w-full h-full" />
                  </div>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <span className="text-[0.625rem] font-mono mb-6 opacity-50" style={{ color: P.darkMuted }}>
                    0{index + 1}
                  </span>
                  <h3
                    className="text-[1.125rem] font-bold mb-4 tracking-[-0.02em] uppercase transition-colors duration-300"
                    style={{ color: '#f0ebe4' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = item.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#f0ebe4')}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[0.8125rem] leading-relaxed group-hover:text-[#f0ebe4] transition-colors duration-300" style={{ color: P.darkMuted }}>
                    {item.description}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <div className="w-6 h-6 border-r border-b transition-colors duration-500" style={{ borderColor: P.darkBorder }} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// CONTACT — Dark section with blended video background
// ───────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="w-full py-24 md:py-32 relative px-container overflow-hidden" style={{ background: P.dark }}>
      {/* Blended video background — subtle, multiply */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/alt-hero.png"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
        style={{ mixBlendMode: 'screen' }}
      >
        <source src="/images/alt-footer.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <TextReveal delay={0.1}>
            <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] uppercase" style={{ color: '#f0ebe4' }}>
              LET'S WORK
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] uppercase" style={{ color: P.darkMuted }}>
              TOGETHER
            </h2>
          </TextReveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t"
          style={{ borderColor: P.darkBorder }}
        >
          <div>
            <p className="text-[0.9375rem] leading-[1.6] mb-8 max-w-md" style={{ color: P.darkMuted }}>
              Open to product design roles, consulting, and collaborations
              on complex product challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                as="a" href="mailto:arnono7700@gmail.com"
                className="h-12 px-8 flex items-center justify-center text-[11px] font-bold uppercase tracking-widest transition-colors"
                style={{ background: '#f0ebe4', color: P.dark } as any}
                strength={0.2}
              >
                SEND EMAIL
              </MagneticButton>
              <MagneticButton
                as="a" href="https://wa.me/9720556697319" target="_blank"
                className="h-12 px-8 flex items-center justify-center border text-[11px] font-bold uppercase tracking-widest hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
                style={{ borderColor: P.darkBorder, color: P.darkMuted } as any}
                strength={0.2}
              >
                WHATSAPP
              </MagneticButton>
              <MagneticButton
                as="a" href="https://www.linkedin.com/in/arnon-friedman-00454867/" target="_blank"
                className="h-12 px-8 flex items-center justify-center border text-[11px] font-bold uppercase tracking-widest hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all"
                style={{ borderColor: P.darkBorder, color: P.darkMuted } as any}
                strength={0.2}
              >
                LINKEDIN
              </MagneticButton>
            </div>
          </div>

          <div className="md:text-right space-y-5">
            <div>
              <span className="font-mono text-[0.8125rem] block mb-1" style={{ color: P.darkMuted }}>EMAIL</span>
              <a href="mailto:arnono7700@gmail.com" className="hover:opacity-70 transition-opacity text-[0.9375rem]" style={{ color: '#f0ebe4' }}>
                arnono7700@gmail.com
              </a>
            </div>
            <div>
              <span className="font-mono text-[0.8125rem] block mb-1" style={{ color: P.darkMuted }}>LINKEDIN</span>
              <a href="https://www.linkedin.com/in/arnon-friedman-00454867/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity text-[0.9375rem]" style={{ color: '#f0ebe4' }}>
                Arnon Friedman
              </a>
            </div>
            <div>
              <span className="font-mono text-[0.8125rem] block mb-1" style={{ color: P.darkMuted }}>WHATSAPP</span>
              <a href="https://wa.me/9720556697319" target="_blank" className="hover:opacity-70 transition-opacity text-[0.9375rem]" style={{ color: '#f0ebe4' }}>
                055-6697319
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 pt-6 border-t flex justify-between items-center"
          style={{ borderColor: P.darkBorder }}
        >
          <span className="text-[0.75rem] font-mono tracking-[0.02em]" style={{ color: P.darkMuted }}>
            ARNON FRIEDMAN &copy; 2025
          </span>
        </motion.div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// MAIN EXPORT
// ───────────────────────────────────────────────────────────
interface StaticHomeProps {
  onProjectSelect: (project: Project) => void;
  onExploreSideProjects: () => void;
}

export const StaticHomeAlternative: React.FC<StaticHomeProps> = ({
  onProjectSelect,
  onExploreSideProjects,
}) => {
  const [showMoreWork, setShowMoreWork] = useState(false);

  return (
    <div className="w-full" style={{ background: P.bg }}>
      {/* 1. Hero */}
      <HeroSection />

      {/* Pre-cache project images */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        {PROJECTS.map(p => <img key={p.id} src={p.image} alt="" />)}
      </div>

      {/* 2. Selected Work — same FlowingMenu, floral palette */}
      <section id="work" className="w-full" style={{ background: P.dark }}>
        <div className="px-container pt-8 md:pt-16 pb-4 md:pb-6">
          <span className="eyebrow block" style={{ color: P.darkMuted }}>SELECTED WORK</span>
        </div>

        <div className="h-[clamp(320px,58dvh,500px)] md:h-[clamp(385px,71.5dvh,660px)] relative">
          <FlowingMenu
            items={PROJECTS.slice(0, 3).map(p => ({
              link: `/work/${p.id}`,
              text: p.title,
              image: p.image,
              description: p.description,
            }))}
            speed={15}
            textColor="#f0ebe4"
            bgColor={P.dark}
            marqueeBgColor="#f0ebe4"
            marqueeTextColor={P.dark}
            borderColor={P.darkBorder}
            onItemClick={(link) => onProjectSelect(PROJECTS.find(p => `/work/${p.id}` === link)!)}
          />
        </div>

        {showMoreWork && (
          <div className="h-[clamp(220px,40dvh,360px)] md:h-[clamp(257px,47.7dvh,440px)] relative">
            <FlowingMenu
              items={PROJECTS.slice(3).map(p => ({
                link: `/work/${p.id}`,
                text: p.title,
                image: p.image,
                description: p.description,
              }))}
              speed={15}
              textColor="#f0ebe4"
              bgColor={P.dark}
              marqueeBgColor="#f0ebe4"
              marqueeTextColor={P.dark}
              borderColor={P.darkBorder}
              onItemClick={(link) => onProjectSelect(PROJECTS.find(p => `/work/${p.id}` === link)!)}
            />
          </div>
        )}

        {!showMoreWork && (
          <button
            onClick={() => setShowMoreWork(true)}
            className="w-full flex items-center justify-center gap-3 py-5 border-t transition-colors duration-300 hover:text-[#f0ebe4]"
            style={{
              borderColor: P.darkBorder,
              color: P.darkMuted,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              background: 'none',
              cursor: 'pointer',
            }}
          >
            <span>Show more projects</span>
            <span style={{ fontSize: '0.9rem' }}>&#8595;</span>
          </button>
        )}
      </section>

      {/* 3. About */}
      <AboutSection onExploreSideProjects={onExploreSideProjects} />

      {/* 4. Tools */}
      <DigitalStack />

      {/* 5. Expertise */}
      <ExpertiseSection />

      {/* 6. Contact (with blended video bg) */}
      <ContactSection />
    </div>
  );
};

export default StaticHomeAlternative;
