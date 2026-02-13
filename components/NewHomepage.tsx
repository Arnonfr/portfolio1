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
                src={hoveredProject.image}
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
// PROJECT ROW — Text row, hover triggers floating image
// ───────────────────────────────────────────────────────────
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const ProjectRow: React.FC<{
  project: Project;
  index: number;
  onClick: () => void;
  isInView: boolean;
  onHover: (project: Project | null) => void;
}> = ({ project, index, onClick, isInView, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_POWER }}
      onClick={onClick}
      onMouseEnter={() => { setIsHovered(true); onHover(project); }}
      onMouseLeave={() => { setIsHovered(false); onHover(null); }}
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
              animate={{ color: isHovered ? '#c9a87e' : '#a8a39a' }}
              transition={{ duration: 0.3 }}
            >
              0{index + 1}
            </motion.span>

            {/* Title + meta stacked */}
            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-[clamp(1.25rem,3vw,2.25rem)] font-semibold text-[#0c0c0a] tracking-[-0.025em] leading-[1.1]"
              >
                {project.title}
              </motion.h3>

              {/* Meta — visible inline always */}
              <motion.div
                className="flex gap-3 mt-2 text-[0.8125rem] font-mono text-[#a8a39a]"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
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
              className="text-[#a8a39a] ml-2 flex-shrink-0 text-xl"
              animate={{
                x: isHovered ? 4 : 0,
                color: isHovered ? '#c9a87e' : '#a8a39a',
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
// EXPERTISE — Capabilities as actions on dark background
// ───────────────────────────────────────────────────────────
const ExpertiseSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const capabilities = [
    {
      title: 'Product Design',
      description: 'End-to-end design for enterprise SaaS — from research and strategy through shipped product.',
    },
    {
      title: 'Design Systems',
      description: 'Scalable component libraries and design tokens that keep 50+ screens consistent.',
    },
    {
      title: 'UX Strategy',
      description: 'Research-driven decisions. Turning ambiguous problems into clear interfaces with measurable outcomes.',
    },
    {
      title: 'Team Leadership',
      description: 'Mentoring designers, bridging design and engineering, establishing design culture from scratch.',
    },
  ];

  return (
    <section ref={ref} className="w-full bg-[#0c0c0a] py-24 md:py-32 relative px-container">
      <div className="">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_POWER }}
          className="mb-16"
        >
          <ScrambleText
            text="WHAT I DO"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#a8a39a] block"
            delay={0.2}
          />
        </motion.div>

        {/* 2x2 grid with border cells */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_POWER }}
              className={`py-10 md:py-12 ${index % 2 === 0 ? 'md:pr-12 md:border-r md:border-[#2b2926]' : 'md:pl-12'
                } border-b border-[#2b2926] md:last:border-b-0 ${index === 2 ? 'md:border-b-0' : ''} group`}
            >
              <h3 className="text-[1.25rem] font-semibold text-[#f4f3f1] mb-3 tracking-[-0.02em]">
                <HoverScramble text={item.title.toUpperCase()} className="text-[#f4f3f1]" />
              </h3>
              <p className="text-[0.875rem] text-[#a8a39a] leading-[1.6] max-w-sm">
                {item.description}
              </p>
            </motion.div>
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
              Open to design leadership roles, consulting, and collaborations
              on complex product challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                as="a"
                href="mailto:arnon7700@gmail.com"
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
              <MagneticButton
                as="a"
                href="https://www.linkedin.com/in/arnon-friedman-00454867/"
                target="_blank"
                className="btn-secondary border-[#a8a39a] text-[#a8a39a] hover:bg-[#f4f3f1] hover:text-[#0c0c0a] hover:border-[#f4f3f1]"
                strength={0.2}
              >
                LINKEDIN
              </MagneticButton>
            </div>
          </div>

          {/* Right — details */}
          <div className="md:text-right space-y-5">
            <div>
              <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">EMAIL</span>
              <a
                href="mailto:arnon7700@gmail.com"
                className="text-[#f4f3f1] hover:text-[#c9a87e] transition-colors text-[0.9375rem]"
              >
                arnon7700@gmail.com
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
            <div>
              <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">LINKEDIN</span>
              <a
                href="https://www.linkedin.com/in/arnon-friedman-00454867/"
                target="_blank"
                className="text-[#f4f3f1] hover:text-[#c9a87e] transition-colors text-[0.9375rem]"
              >
                Arnon Friedman
              </a>
            </div>
            <div>
              <span className="font-mono text-[0.8125rem] text-[#a8a39a] block mb-1">LOCATION</span>
              <span className="text-[#f4f3f1] text-[0.9375rem]">Tel Aviv, Israel</span>
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
            ARNON FRIEDMAN © 2024
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

      {/* 2. About paragraph */}
      <AboutSection onExploreSideProjects={onExploreSideProjects} />

      {/* 3. Projects */}
      <FeaturedWorkSection onProjectClick={onProjectSelect} />

      {/* 4. Tools (Digital Stack Pile) */}
      <DigitalStack />

      {/* 5. Rest of content */}
      <ExpertiseSection />
      <ContactSection />
    </div>
  );
};

export default NewHomepage;
