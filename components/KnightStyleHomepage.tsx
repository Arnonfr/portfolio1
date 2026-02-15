import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '../types';
import { PROJECTS } from '../data';

// ───────────────────────────────────────────────────────────
// HERO - Bold typographic statement like Austin Knight
// Giant tagline, minimal everything else
// ───────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#fafafa] flex flex-col justify-center px-6 md:px-12 lg:px-24">
      {/* Main tagline - Massive, centered, the ONLY thing that matters */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl"
      >
        <h1 className="text-[clamp(3rem,12vw,10rem)] font-bold text-[#1a1a1a] leading-[0.9] tracking-[-0.03em]">
          <span className="block">design</span>
          <span className="block">that</span>
          <span className="block text-[#1a1a1a]/20">works.</span>
        </h1>
      </motion.div>

      {/* Minimal nav at bottom */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex justify-between items-end"
      >
        <div className="text-[0.8125rem] text-[#1a1a1a]/60 leading-relaxed">
          <span className="block font-medium text-[#1a1a1a]">Arnon Friedman</span>
          <span className="block">Product Designer</span>
          <span className="block">Tel Aviv</span>
        </div>

        <div className="flex gap-8 text-[0.8125rem] text-[#1a1a1a]/60">
          <a href="#work" className="hover:text-[#1a1a1a] transition-colors">Work</a>
          <a href="#about" className="hover:text-[#1a1a1a] transition-colors">About</a>
          <a href="mailto:arnon@example.com" className="hover:text-[#1a1a1a] transition-colors">Contact</a>
        </div>
      </motion.nav>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// SELECTED WORK - Clean list like Knight's essays/projects
// No thumbnails, just text
// ───────────────────────────────────────────────────────────
const SelectedWork: React.FC<{ onProjectClick: (project: Project) => void }> = ({ 
  onProjectClick 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" ref={ref} className="w-full bg-[#fafafa] py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[0.8125rem] text-[#1a1a1a]/40 uppercase tracking-[0.2em]">Selected Work</span>
        </motion.div>

        {/* Work list - text only, like Knight's essays */}
        <div className="space-y-0">
          {PROJECTS.slice(0, 6).map((project, index) => (
            <WorkItem 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual work item - minimal text row
const WorkItem: React.FC<{
  project: Project;
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group border-t border-[#1a1a1a]/10 py-6 md:py-8 cursor-pointer flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8"
    >
      <div className="flex-1">
        <h3 
          className="text-[1.5rem] md:text-[2rem] font-semibold text-[#1a1a1a] tracking-[-0.02em] transition-all duration-300"
          style={{
            transform: isHovered ? 'translateX(12px)' : 'translateX(0)',
          }}
        >
          {project.title}
        </h3>
      </div>
      
      <div className="flex items-center gap-6 md:gap-12 text-[0.8125rem] text-[#1a1a1a]/40">
        <span className="hidden md:block">{project.category}</span>
        <span>{project.company}</span>
        <span className="text-[#1a1a1a]/20">→</span>
      </div>
    </motion.article>
  );
};

// ───────────────────────────────────────────────────────────
// ABOUT - Simple text section
// ───────────────────────────────────────────────────────────
const AboutSection: React.FC<{ onExploreSideProjects: () => void }> = ({ onExploreSideProjects }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="w-full bg-[#fafafa] py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[0.8125rem] text-[#1a1a1a]/40 uppercase tracking-[0.2em] block mb-12"
        >
          About
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 text-[1.25rem] md:text-[1.5rem] text-[#1a1a1a]/80 leading-[1.6] font-light"
        >
          <p>
            I'm a Product Designer with over 9 years of experience building digital products
            for fintech, insurtech, and enterprise companies.
          </p>
          
          <p>
            Currently leading design at Novidea, where I'm transforming how insurance 
            professionals manage complex claims. Previously at Ava Trade, designing 
            trading platforms used by millions.
          </p>

          <p>
            My approach combines strategic thinking with hands-on craft. I believe 
            the best design is invisible—it just works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-[#1a1a1a]/10"
        >
          <button
            onClick={onExploreSideProjects}
            className="text-[0.8125rem] text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
          >
            Side projects →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// SPEAKING & PODCASTS - Like Knight's other activities
// ───────────────────────────────────────────────────────────
const SpeakingSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const talks = [
    { title: "Design Systems at Scale", location: "Tel Aviv UX Meetup", year: "2024" },
    { title: "Fintech UX Patterns", location: "Design Matters", year: "2023" },
    { title: "Leading Design Teams", location: "UX Salon", year: "2023" },
  ];

  return (
    <section ref={ref} className="w-full bg-[#fafafa] py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[0.8125rem] text-[#1a1a1a]/40 uppercase tracking-[0.2em] block mb-16"
        >
          Speaking & Field Research
        </motion.span>

        <div className="space-y-0">
          {talks.map((talk, index) => (
            <motion.div
              key={talk.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-[#1a1a1a]/10 py-6 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2"
            >
              <h4 className="text-[1.25rem] font-medium text-[#1a1a1a]">{talk.title}</h4>
              <div className="flex items-center gap-6 text-[0.8125rem] text-[#1a1a1a]/40">
                <span>{talk.location}</span>
                <span>{talk.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// FOOTER - Minimal contact
// ───────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#fafafa] py-24 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="text-[2rem] md:text-[3rem] font-bold text-[#1a1a1a] tracking-[-0.02em] mb-4">
            Let's work together.
          </h2>
          <a 
            href="mailto:arnon@example.com"
            className="text-[0.8125rem] text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
          >
            arnon@example.com
          </a>
        </div>

        <div className="flex gap-6 text-[0.8125rem] text-[#1a1a1a]/40">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors">Twitter</a>
          <span>© 2024</span>
        </div>
      </div>
    </footer>
  );
};

// ───────────────────────────────────────────────────────────
// MAIN COMPONENT
// ───────────────────────────────────────────────────────────
interface KnightStyleHomepageProps {
  onProjectSelect: (project: Project) => void;
  onExploreSideProjects: () => void;
}

export const KnightStyleHomepage: React.FC<KnightStyleHomepageProps> = ({ 
  onProjectSelect, 
  onExploreSideProjects 
}) => {
  return (
    <div className="w-full bg-[#fafafa]">
      <Hero />
      <SelectedWork onProjectClick={onProjectSelect} />
      <AboutSection onExploreSideProjects={onExploreSideProjects} />
      <SpeakingSection />
      <Footer />
    </div>
  );
};

export default KnightStyleHomepage;
