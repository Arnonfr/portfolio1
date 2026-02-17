import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, useMotionValue, useReducedMotion, AnimatePresence, animate } from 'framer-motion';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { ScrambleText, HoverScramble } from './ScrambleText';
import { TextOnPathHero } from './TextOnPathHero';
import { DigitalStack } from './DigitalStack';
import { DotGridBackground } from './DotGridBackground';
import FlowingMenu from './FlowingMenu';

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
  const location = useLocation();

  // Scroll to hash on mount or hash change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Wait slightly for layout if needed, or scroll immediately
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);
  return (
    <div className="w-full">
      <div className="noise-overlay" />

      {/* 1. Header with letters */}
      <TextOnPathHero />

      {/* 2. Projects */}
      <section id="work" className="w-full bg-[#0c0c0a]">
        <div className="px-container pt-16 pb-6">
          <span className="eyebrow block text-[#666]">SELECTED WORK</span>
        </div>
        <div className="h-[clamp(350px,65dvh,600px)] relative">
          <FlowingMenu
            items={PROJECTS.map(p => ({
              link: `/work/${p.id}`,
              text: p.title,
              image: p.image,
              description: p.description,
            }))}
            speed={15}
            textColor="#f4f3f1"
            bgColor="#0c0c0a"
            marqueeBgColor="#f4f3f1"
            marqueeTextColor="#0c0c0a"
            borderColor="#333"
            onItemClick={(link) => onProjectSelect(PROJECTS.find(p => `/work/${p.id}` === link)!)}
          />
        </div>
      </section>

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
