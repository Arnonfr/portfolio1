import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useReducedMotion, AnimatePresence, animate } from 'framer-motion';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { ScrambleText, HoverScramble } from './ScrambleText';
import { TextOnPathHero } from './TextOnPathHero';
import { DigitalStack } from './DigitalStack';
import { DotGridBackground } from './DotGridBackground';

// ───────────────────────────────────────────────────────────
// SHARED ANIMATION CONFIG
// ───────────────────────────────────────────────────────────
const EASE_POWER: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ───────────────────────────────────────────────────────────
// MAGNETIC BUTTON — Pulls toward cursor
// ───────────────────────────────────────────────────────────
const MagneticButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
}> = ({ children, onClick, className = '', strength = 0.25, as = 'button', href, target }) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
  };

  const props = {
    ref: ref as any,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
    style: { x, y },
  };

  if (as === 'a') {
    return <motion.a {...props} href={href} target={target}>{children}</motion.a>;
  }
  return <motion.button {...props}>{children}</motion.button>;
};

// ───────────────────────────────────────────────────────────
// TEXT REVEAL — Line by line mask animation
// ───────────────────────────────────────────────────────────
const TextReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: EASE_POWER }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────
// SCROLL TO SECTION
// ───────────────────────────────────────────────────────────
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ───────────────────────────────────────────────────────────
// HERO — Text on Path (imported from TextOnPathHero.tsx)
// ───────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────
// SELECTED WORK — Text list with floating image on hover
// ───────────────────────────────────────────────────────────
const FeaturedWorkSection: React.FC<{ onProjectClick: (project: Project) => void }> = ({
  onProjectClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseY(e.clientY);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full bg-[#f4f3f1] pt-8 pb-24 md:pb-32 relative px-container"
      onMouseMove={handleMouseMove}
    >
      <div className="">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_POWER }}
          className="mb-12 md:mb-16"
        >
          <ScrambleText
            text="SELECTED WORK"
            className="eyebrow block"
            delay={0.1}
          />
        </motion.div>

        {/* Project rows */}
        <div className="space-y-2">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onClick={() => onProjectClick(project)}
              isInView={isInView}
              onHover={setHoveredProject}
              hoveredId={hoveredProject?.id ?? null}
            />
          ))}
        </div>
      </div>

      {/* Floating image — overlays on top of everything, positioned right */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key={hoveredProject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE_POWER }}
            className="fixed right-8 md:right-12 lg:right-16 pointer-events-none hidden md:block"
            style={{
              top: Math.max(80, Math.min(mouseY - 200, window.innerHeight - 480)),
              zIndex: 50,
              width: '45vw',
              maxWidth: '700px',
            }}
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/15">
              <img
                src={hoveredProject.id === 3 ? '/images/wording/main-modal.png' : hoveredProject.image}
                alt={hoveredProject.title}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '55vh' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section >
  );
};

// ───────────────────────────────────────────────────────────
// DISTORTED TITLE — 5 different effects for non-hovered rows
// ───────────────────────────────────────────────────────────

// Effect 0: Wave — letters undulate vertically like a sine wave
// Effect 1: Arc — letters rotate along a circular arc path
// Effect 2: Scatter — letters drift apart with random rotation
// Effect 3: Squeeze — horizontal compression with vertical stretch
// Effect 4: Skew — italic-like progressive skew with fade

const DistortedTitle: React.FC<{
  text: string;
  effectIndex: number;
  isDistorted: boolean;
}> = ({ text, effectIndex, isDistorted }) => {
  const chars = text.split('');
  const len = chars.length;

  const getCharStyle = (i: number): React.CSSProperties => {
    if (!isDistorted) return { display: 'inline-block', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' };

    const norm = len > 1 ? i / (len - 1) : 0; // 0..1
    const fromCenter = (norm - 0.5) * 2; // -1..1

    switch (effectIndex % 5) {
      case 0: // Wave
        return {
          display: 'inline-block',
          transform: `translateY(${Math.sin(norm * Math.PI * 2.5) * 12}px)`,
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          opacity: 0.4,
        };
      case 1: // Arc
        return {
          display: 'inline-block',
          transform: `translateY(${Math.pow(fromCenter, 2) * -18}px) rotate(${fromCenter * -8}deg)`,
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          opacity: 0.35,
        };
      case 2: // Scatter
        return {
          display: 'inline-block',
          transform: `translateY(${(Math.random() - 0.5) * 0.1}px) translateX(${fromCenter * 6}px) rotate(${fromCenter * 5}deg)`,
          letterSpacing: '0.15em',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          opacity: 0.3,
        };
      case 3: // Squeeze
        return {
          display: 'inline-block',
          transform: `scaleX(0.6) scaleY(1.3) translateY(${fromCenter * 4}px)`,
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          opacity: 0.35,
        };
      case 4: // Skew
        return {
          display: 'inline-block',
          transform: `skewX(${-15 + norm * 5}deg) translateX(${fromCenter * 8}px)`,
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          opacity: 0.3,
        };
      default:
        return { display: 'inline-block', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' };
    }
  };

  return (
    <span className="inline-flex" aria-label={text}>
      {chars.map((char, i) => (
        <span key={i} style={getCharStyle(i)}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

// ───────────────────────────────────────────────────────────
// PROJECT ROW — Text row, hover triggers floating image
// ───────────────────────────────────────────────────────────
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const ProjectRow: React.FC<{
  project: Project;
  index: number;
  onClick: () => void;
  isInView: boolean;
  onHover: (project: Project | null) => void;
  hoveredId: number | null;
}> = ({ project, index, onClick, isInView, onHover, hoveredId }) => {
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== project.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_POWER }}
      onClick={onClick}
      onMouseEnter={() => { onHover(project); }}
      onMouseLeave={() => { onHover(null); }}
      className="group cursor-pointer relative"
    >
      <motion.div
        animate={{
          backgroundColor: isHovered ? '#ebe8e4' : 'rgba(0,0,0,0)',
          borderRadius: isHovered ? 20 : 0,
        }}
        transition={{ duration: 0.4, ease: EASE_POWER }}
        className="overflow-hidden relative"
      >
        {/* Main row: text content */}
        <div className="flex items-center">
          <motion.div
            className="py-6 md:py-7 px-4 md:px-6 flex items-center gap-4 min-w-0 w-full"
          >
            {/* Number */}
            <motion.span
              className="font-mono text-[0.8125rem] w-10 flex-shrink-0 text-center"
              animate={{ color: isHovered ? '#0055ff' : '#a8a39a' }} // Blue on hover
              transition={{ duration: 0.3 }}
            >
              0{index + 1}
            </motion.span>

            {/* Title + meta stacked */}
            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-[clamp(1.25rem,3vw,2.25rem)] font-semibold tracking-[-0.025em] leading-[1.1]"
                animate={{ color: isHovered ? '#0055ff' : '#0c0c0a' }} // Title turns Blue
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>

              {/* Meta — visible inline always */}
              <motion.div
                className="flex gap-3 mt-2 text-[0.8125rem] font-mono text-[#a8a39a]"
                animate={{ opacity: isHovered ? 1 : isOtherHovered ? 0.3 : 0.7 }}
              >
                <span>{project.company}</span>
                <span className="hidden md:inline">·</span>
                <span className="hidden md:inline">{project.category}</span>
                <span>·</span>
                <span>{project.year}</span>
              </motion.div>
            </div>

            {/* Arrow */}
            <motion.span
              className="ml-2 flex-shrink-0 text-xl"
              animate={{
                x: isHovered ? 4 : 0,
                color: isHovered ? '#ff00aa' : '#a8a39a', // Arrow turns Pink
              }}
              transition={{ duration: 0.3, ease: EASE_SPRING }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider — fades out on hover */}
      <motion.div
        className="mx-2 h-px bg-[#d9d6d1]"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.article>
  );
};

// ───────────────────────────────────────────────────────────
// ABOUT — Conversational voice, asymmetric layout
// ───────────────────────────────────────────────────────────
const AboutSection: React.FC<{ onExploreSideProjects: () => void }> = ({ onExploreSideProjects }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="w-full bg-[#f4f3f1] py-24 md:py-32 relative overflow-hidden px-container">
      <DotGridBackground />
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Label — narrow left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_POWER }}
            className="lg:col-span-3"
          >
            <ScrambleText
              text="ABOUT"
              className="eyebrow block mb-4"
              delay={0.2}
            />
            <div className="w-12 h-px bg-[#d9d6d1]" />
          </motion.div>

          {/* Content — offset right for asymmetry */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_POWER }}
            className="lg:col-span-7 lg:col-start-5"
          >
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-[#2b2926] leading-[1.55] mb-8">
              I love simplifying complex processes.
              With <strong className="font-semibold text-[#0c0c0a]">4 years in product design</strong> + past experience in advertising,
              I've spent my time trying to understand how people think — through
              research, interviews, tools, and a lot of curiosity.
            </p>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-[#2b2926] leading-[1.55] mb-8">
              I'm a lecturer at{' '}
              <strong className="font-semibold text-[#0c0c0a]">Triolla College</strong>,
              I love to bake, and I have a broad understanding of{' '}
              <strong className="font-semibold text-[#0c0c0a]">AI tools for designers</strong>{' '}
              and beyond. I've also built several{' '}
              <button
                onClick={onExploreSideProjects}
                className="underline underline-offset-4 decoration-[#c9a87e] hover:text-[#c9a87e] transition-colors font-semibold text-[#0c0c0a]"
              >
                side projects
              </button>{' '}
              exploring these tools.
            </p>

            {/* Compact facts */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-[#d9d6d1]">
              <div>
                <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">EXPERIENCE</span>
                <span className="text-[0.9375rem] font-medium text-[#0c0c0a]">4 years</span>
              </div>
              <div>
                <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">DOMAINS</span>
                <span className="text-[0.9375rem] font-medium text-[#0c0c0a]">Insurtech, Fintech, AI, EdTech</span>
              </div>
              <div>
                <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">TEACHING</span>
                <span className="text-[0.9375rem] font-medium text-[#0c0c0a]">Triolla College</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// EXPERTISE — Capabilities as interactive squares with text-on-path hover
// ───────────────────────────────────────────────────────────
const ExpertiseSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const capabilities = [
    {
      title: 'UX Strategy',
      description: 'I turn complex business goals into clear user-centered strategies. Design starts with understanding the problem.',
    },
    {
      title: 'Product Design',
      description: 'Crafting end-to-end digital experiences for complex systems, bridging user needs and business logic.',
    },
    {
      title: 'AI-Driven Design',
      description: 'Leveraging advanced AI tools to accelerate workflows and create smarter, future-proof interfaces.',
    },
    {
      title: 'Teaching',
      description: 'Sharing passion for design by mentoring students and simplifying complex concepts for the next generation.',
    },
  ];

  return (
    <section ref={ref} className="w-full bg-[#0c0c0a] py-24 md:py-32 relative px-container overflow-hidden">
      <div className="">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_POWER }}
          className="mb-16"
        >
          <ScrambleText
            text="CORE FOCUS"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#a8a39a] block"
            delay={0.2}
          />
        </motion.div>

        {/* 2x2 grid with interactive "Text on Path" hover cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2b2926] border border-[#2b2926]">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_POWER }}
              className="relative group bg-[#0c0c0a] aspect-square flex flex-col p-8 md:p-10 overflow-hidden"
            >
              {/* Text on Path Hover Effect - matching Hero style with continuous motion */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full scale-150">
                  <defs>
                    <path
                      id={`path-${index}`}
                      d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
                    />
                  </defs>
                  <text className="text-[18px] font-bold uppercase tracking-[0.2em]" fill="white">
                    <textPath href={`#path-${index}`} startOffset="0%">
                      {item.title} · {item.title} · {item.title} · {item.title} ·
                      <animate attributeName="startOffset" from="0%" to="100%" dur="10s" repeatCount="indefinite" />
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[0.625rem] font-mono text-[#a8a39a] mb-6 opacity-50">
                  0{index + 1}
                </span>

                <h3 className="text-[1.125rem] font-bold text-[#f4f3f1] mb-4 tracking-[-0.02em] group-hover:text-[#0066FF] transition-colors duration-300 uppercase">
                  {item.title}
                </h3>

                <p className="text-[0.8125rem] text-[#a8a39a] leading-relaxed group-hover:text-[#f4f3f1] transition-colors duration-300">
                  {item.description}
                </p>

                {/* Corner detail */}
                <div className="mt-auto flex justify-end">
                  <div className="w-6 h-6 border-r border-b border-[#2b2926] group-hover:border-[#0066FF] transition-colors duration-500" />
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
// INSTAGRAM STRIP — Recent posts from @ux_issues
// ───────────────────────────────────────────────────────────
const INSTAGRAM_POSTS = [
  { src: '/images/instagram/post1.jpg', alt: 'UX Issues post 1' },
  { src: '/images/instagram/post2.jpg', alt: 'UX Issues post 2' },
  { src: '/images/instagram/post3.jpg', alt: 'UX Issues post 3' },
  { src: '/images/instagram/post4.jpg', alt: 'UX Issues post 4' },
];

const InstagramSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="w-full bg-[#f4f3f1] py-24 md:py-32 px-container">
      <div className="">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_POWER }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <ScrambleText
              text="INSTAGRAM"
              className="eyebrow block mb-3"
              delay={0.1}
            />
            <p className="text-[#a8a39a] text-[0.9375rem] font-mono">
              @ux_issues
            </p>
          </div>
          <MagneticButton
            as="a"
            href="https://www.instagram.com/ux_issues/"
            target="_blank"
            className="btn-secondary border-[#0c0c0a] text-[#0c0c0a] hover:bg-[#0c0c0a] hover:text-[#f4f3f1] text-[0.75rem]"
            strength={0.15}
          >
            FOLLOW
          </MagneticButton>
        </motion.div>

        {/* Posts grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {INSTAGRAM_POSTS.map((post, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/ux_issues/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_POWER }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#e8e6e1]"
            >
              <img
                src={post.src}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider uppercase">
                  View
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// CONTACT — Bold display CTA on dark section
// ───────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="w-full bg-[#0c0c0a] py-24 md:py-32 relative px-container">
      <div className="">
        {/* Large CTA heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_POWER }}
          className="mb-16 md:mb-20"
        >
          <TextReveal delay={0.1}>
            <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold text-[#f4f3f1] leading-[0.9] tracking-[-0.04em] uppercase">
              LET'S WORK
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold text-[#a8a39a] leading-[0.9] tracking-[-0.04em] uppercase">
              TOGETHER
            </h2>
          </TextReveal>
        </motion.div>

        {/* Two-column contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_POWER }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-[#2b2926]"
        >
          {/* Left — buttons */}
          <div>
            <p className="text-[#a8a39a] text-[0.9375rem] leading-[1.6] mb-8 max-w-md">
              Open to product design roles, consulting, and collaborations
              on complex product challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                as="a"
                href="mailto:arnono7700@gmail.com"
                className="btn-primary bg-[#f4f3f1] text-[#0c0c0a] border-[#f4f3f1] hover:bg-[#c9a87e] hover:border-[#c9a87e] hover:text-[#0c0c0a]"
                strength={0.2}
              >
                SEND EMAIL
              </MagneticButton>
              <MagneticButton
                as="a"
                href="https://wa.me/9720556697319"
                target="_blank"
                className="btn-secondary border-[#a8a39a] text-[#a8a39a] hover:bg-[#25D366] hover:text-[#fff] hover:border-[#25D366]"
                strength={0.2}
              >
                WHATSAPP
              </MagneticButton>
            </div>
          </div>

          {/* Right — details */}
          <div className="md:text-right space-y-5">
            <div>
              <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">EMAIL</span>
              <a
                href="mailto:arnono7700@gmail.com"
                className="text-[#f4f3f1] hover:text-[#c9a87e] transition-colors text-[0.9375rem]"
              >
                arnono7700@gmail.com
              </a>
            </div>
            <div>
              <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">LINKEDIN</span>
              <a
                href="https://www.linkedin.com/in/arnon-friedman-00454867/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f4f3f1] hover:text-[#c9a87e] transition-colors text-[0.9375rem]"
              >
                Arnon Friedman
              </a>
            </div>
            <div>
              <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">WHATSAPP</span>
              <a
                href="https://wa.me/9720556697319"
                target="_blank"
                className="text-[#f4f3f1] hover:text-[#c9a87e] transition-colors text-[0.9375rem]"
              >
                055-6697319
              </a>
            </div>
          </div>
        </motion.div>

        {/* Minimal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 pt-6 border-t border-[#2b2926] flex justify-between items-center"
        >
          <span className="text-[0.75rem] font-mono text-[#a8a39a] tracking-[0.02em]">
            ARNON FRIEDMAN © 2025
          </span>
          <span className="text-[0.75rem] font-mono text-[#a8a39a] tracking-[0.02em]">
            BUILT WITH INTENT
          </span>
        </motion.div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// MAIN COMPONENT
// ───────────────────────────────────────────────────────────
interface NewHomepageProps {
  onProjectSelect: (project: Project) => void;
  onExploreSideProjects: () => void;
}

export const NewHomepage: React.FC<NewHomepageProps> = ({
  onProjectSelect,
  onExploreSideProjects,
}) => {
  return (
    <div className="w-full">
      <div className="noise-overlay" />

      {/* 1. Header with letters */}
      <TextOnPathHero />

      {/* 2. Projects */}
      <FeaturedWorkSection onProjectClick={onProjectSelect} />

      {/* 3. About paragraph */}
      <AboutSection onExploreSideProjects={onExploreSideProjects} />

      {/* 4. Tools (Digital Stack Pile) */}
      <DigitalStack />

      {/* 5. Instagram */}
      <InstagramSection />

      {/* 6. Rest of content */}
      <ExpertiseSection />
      <ContactSection />
    </div>
  );
};

export default NewHomepage;
