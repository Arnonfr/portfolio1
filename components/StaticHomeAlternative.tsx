import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, animate, useMotionValue, useSpring } from 'framer-motion';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ScrambleText, HoverScramble } from './ScrambleText';
import { DigitalStack } from './DigitalStack';
import FlowingMenu from './FlowingMenu';

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

// ───────────────────────────────────────────────────────────
// HERO — Video/Image background with serif text overlay
// ───────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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
    mouseX.set(-cx * 80);
    mouseY.set(-cy * 50);
    // Spotlight follows cursor (percentage position)
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
      className="relative w-full h-[100dvh] overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video background — shifts with mouse */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/alt-hero.webp"
        className="absolute inset-[-50px] w-[calc(100%+100px)] h-[calc(100%+100px)] object-cover"
        style={{ x: bgX, y: bgY }}
      >
        <source src="/images/alt-hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Mouse spotlight — brighter where cursor is */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 400px at ${spotlightPos.x}% ${spotlightPos.y}%, transparent 0%, rgba(0,0,0,0.12) 100%)`,
        }}
      />

      {/* Text content */}
      <motion.div
        style={{ y: yText, opacity: scrollOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center -mt-8 md:-mt-12"
      >
        <p
          className="text-xs md:text-sm tracking-[0.2em] uppercase mb-6 font-sans animate-fade"
          style={{ color: 'rgba(90, 64, 64, 0.6)', animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          Product Designer
        </p>

        <div
          className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-tight whitespace-nowrap animate-fade flex flex-row justify-center py-4"
          style={{ color: '#4a3333', animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          {Array.from("Let's simplify complex things.").map((char, i) => (
            <BubbleCharacter key={i} char={char} />
          ))}
        </div>

        <div
          className="mt-16 md:mt-20 animate-fade"
          style={{ animationDelay: '1.2s', animationFillMode: 'both' }}
        >
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(90, 64, 64, 0.4)' }}
          >
            <span className="text-[0.65rem] tracking-[0.2em] uppercase font-sans">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8"
              style={{ background: 'rgba(90, 64, 64, 0.3)' }}
            />
          </button>
        </div>
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

  return (
    <section id="about" ref={ref} className="w-full py-24 md:py-32 relative overflow-hidden px-container" style={{ background: P.bg }}>
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-3"
          >
            <ScrambleText text="ABOUT" className="eyebrow block mb-4" delay={0.2} />
            <div className="w-12 h-px" style={{ background: P.border }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="lg:col-span-7 lg:col-start-5"
          >
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.55] mb-8" style={{ color: P.text }}>
              I love simplifying complex processes.
              With <strong className="font-semibold" style={{ color: P.dark }}>4 years in product design</strong> + past experience in advertising,
              I've spent my time trying to understand how people think — through
              research, interviews, tools, and a lot of curiosity.
            </p>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.55] mb-8" style={{ color: P.text }}>
              I'm a lecturer at{' '}
              <strong className="font-semibold" style={{ color: P.dark }}>Triolla College</strong>,
              I love to bake, and I have a broad understanding of{' '}
              <strong className="font-semibold" style={{ color: P.dark }}>AI tools for designers</strong>{' '}
              and beyond. I've also built several{' '}
              <button
                onClick={onExploreSideProjects}
                className="underline underline-offset-4 hover:opacity-70 transition-opacity font-semibold"
                style={{ textDecorationColor: P.rose, color: P.dark }}
              >
                side projects
              </button>{' '}
              exploring these tools.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t" style={{ borderColor: P.border }}>
              <div>
                <span className="font-mono text-[0.8125rem] block mb-1" style={{ color: P.textMuted }}>EXPERIENCE</span>
                <span className="text-[0.9375rem] font-medium" style={{ color: P.dark }}>4 years</span>
              </div>
              <div>
                <span className="font-mono text-[0.8125rem] block mb-1" style={{ color: P.textMuted }}>DOMAINS</span>
                <span className="text-[0.9375rem] font-medium" style={{ color: P.dark }}>Insurtech, Fintech, AI, EdTech</span>
              </div>
              <div>
                <span className="font-mono text-[0.8125rem] block mb-1" style={{ color: P.textMuted }}>TEACHING</span>
                <span className="text-[0.9375rem] font-medium" style={{ color: P.dark }}>Triolla College</span>
              </div>
            </div>
          </motion.div>
        </div>
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
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
              className="relative group md:aspect-square flex flex-col p-8 md:p-10 overflow-hidden"
              style={{ background: P.dark }}
            >
              {/* Circular text hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full scale-150">
                  <defs>
                    <path id={`alt-path-${index}`} d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
                  </defs>
                  <text className="text-[18px] font-bold uppercase tracking-[0.2em]" fill={item.accent}>
                    <textPath href={`#alt-path-${index}`} startOffset="0%">
                      {item.title} · {item.title} · {item.title} · {item.title} ·
                      <animate attributeName="startOffset" from="0%" to="100%" dur="10s" repeatCount="indefinite" />
                    </textPath>
                  </text>
                </svg>
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
          ))}
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

      // Interaction radius: narrower so it targets fewer letters directly
      const maxDist = 120;
      const normalized = Math.min(distance / maxDist, 1);
      const dxNorm = Math.max(-1, Math.min(1, dx / maxDist));

      setHoverState({ dist: normalized, dxNorm });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // dist represents proximity (0 is exact cursor match, 1 is far away)

  // Categorize the state for clearer logic
  // "Direct Hover": within an extremely close radius (e.g., dist < 0.25)
  // "Adjacent": within the max radius but not direct (0.25 <= dist < 1.0)
  // "Default": Far away (dist === 1)

  const isDirectlyHovered = hoverState.dist < 0.25;
  const isAdjacent = hoverState.dist >= 0.25 && hoverState.dist < 1.0;

  // Weight: Bold (800) only when directly hovered. Otherwise light (400)
  const weight = isDirectlyHovered ? 800 : 400;

  // Lift: slightly hop up when directly hovered
  let lift = 0;
  if (isDirectlyHovered) {
    lift = -8;
  } else if (isAdjacent) {
    // A subtle curve up towards the directly hovered element
    lift = -8 * (1 - hoverState.dist);
  }

  // Tilt logic:
  // Default: tilted right (arbitrarily 12deg right)
  // Direct Hover: straight up (0 deg)
  // Adjacent: Lean towards the cursor. 
  //   - hoverState.dxNorm > 0 => cursor is to the RIGHT, so this letter leans RIGHT (positive tilt)
  //   - hoverState.dxNorm < 0 => cursor is to the LEFT, so this letter leans LEFT (negative tilt)
  let tilt = 12; // Default right tilt

  if (isDirectlyHovered) {
    tilt = 0; // straight
  } else if (isAdjacent) {
    // Lean towards mouse up to 18 deg
    tilt = hoverState.dxNorm * 18;
  }

  // Color logic:
  // Base color: #4a3333 (rgb: 74, 51, 51)
  // Hover color: vibrant rose (#c9899a / rgb: 201, 137, 154) or custom
  let r = 74; let g = 51; let b = 51;
  let shadow = 'none';

  if (isDirectlyHovered) {
    // Colorful and glowing
    r = 201; g = 137; b = 154;
    shadow = `0px 4px 12px rgba(${r},${g},${b}, 0.4)`;
  } else if (isPink) {
    // Period defaults to pink
    r = 201; g = 137; b = 154;
  }

  const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  const isItalic = !isDirectlyHovered; // Always italic unless directly hovered

  return (
    <motion.span
      ref={elementRef}
      className={`text-[1em] select-none inline-block origin-bottom transition-all duration-300 ${isItalic ? 'italic' : ''}`}
      style={{
        color: color,
        fontWeight: weight,
        y: lift,
        rotateZ: tilt,
        cursor: 'default',
        willChange: 'transform, font-weight, color',
        textShadow: shadow
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};
