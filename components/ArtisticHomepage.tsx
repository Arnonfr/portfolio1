import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '../types';
import { PROJECTS } from '../data';

// Scroll to section helper
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// ───────────────────────────────────────────────────────────
// ARTISTIC HERO - Editorial Cover Style
// Like a magazine cover with full-bleed imagery
// ───────────────────────────────────────────────────────────
const ArtisticHero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#f5f3ef] overflow-hidden">
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content - Editorial layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top masthead */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-6 md:px-12 py-6 flex justify-between items-center border-b border-[#0c0c0a]/10"
        >
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#0c0c0a]">
            Portfolio 2024
          </span>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#0c0c0a]/50">
            Tel Aviv
          </span>
        </motion.header>

        {/* Hero content - Magazine cover layout */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* Large editorial typography */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-8"
            >
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-[#0c0c0a]/50 block mb-6">
                Product Designer & Art Director
              </span>
              
              <h1 className="text-[clamp(4rem,20vw,16rem)] font-bold text-[#0c0c0a] leading-[0.8] tracking-[-0.04em] uppercase">
                <motion.span 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Arnon
                </motion.span>
                <motion.span 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#0c0c0a]/30"
                >
                  Friedman
                </motion.span>
              </h1>
            </motion.div>

            {/* Editorial subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-xl"
            >
              <p className="text-[1.125rem] text-[#2b2926] leading-relaxed mb-8">
                Crafting digital experiences for fintech, insurtech, and enterprise. 
                Nine years of transforming complex systems into human-centered design.
              </p>
              
              {/* Hand-drawn style button */}
              <button 
                onClick={() => scrollToSection('work')}
                className="group relative px-8 py-4 border-2 border-[#0c0c0a] text-[0.8125rem] font-semibold uppercase tracking-[0.15em] hover:bg-[#0c0c0a] hover:text-[#f5f3ef] transition-all duration-300"
              >
                <span className="relative z-10">View Selected Work</span>
                <motion.span 
                  className="absolute bottom-1 left-4 right-4 h-px bg-[#0c0c0a]/20"
                  initial={{ scaleX: 1 }}
                  whileHover={{ scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom editorial strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="px-6 md:px-12 py-6 border-t border-[#0c0c0a]/10"
        >
          <div className="flex justify-between items-center text-[0.6875rem] uppercase tracking-[0.15em] text-[#0c0c0a]/50">
            <span>Available for projects</span>
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute top-24 right-12 w-3 h-3 bg-[#ccff00] hidden md:block"
      />
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// GALLERY WALL - Work presented like an exhibition
// NOT a grid - masonry with varied sizes
// ───────────────────────────────────────────────────────────
const GalleryWall: React.FC<{ onProjectClick: (project: Project) => void }> = ({ 
  onProjectClick 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Varied sizes for gallery feel (not uniform grid)
  const sizeClasses = [
    'col-span-2 row-span-2', // Large
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-2', // Tall
    'col-span-1 row-span-1', // Small
    'col-span-2 row-span-1', // Wide
    'col-span-1 row-span-1', // Small
  ];

  return (
    <section id="work" ref={containerRef} className="w-full bg-[#f5f3ef] py-24 md:py-32">
      {/* Section header - editorial style */}
      <div className="px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-[#0c0c0a]/50 block mb-4">
            Selected Projects
          </span>
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold text-[#0c0c0a] leading-[0.85] tracking-[-0.03em] uppercase">
            Work
          </h2>
        </motion.div>
      </div>

      {/* Gallery wall - masonry style */}
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PROJECTS.slice(0, 6).map((project, index) => (
            <GalleryPiece 
              key={project.id} 
              project={project} 
              index={index}
              sizeClass={sizeClasses[index % sizeClasses.length]}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual gallery piece
const GalleryPiece: React.FC<{
  project: Project;
  index: number;
  sizeClass: string;
  onClick: () => void;
}> = ({ project, index, sizeClass, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${sizeClass} group cursor-pointer relative`}
    >
      <div className="relative w-full h-full min-h-[200px] md:min-h-[300px] overflow-hidden bg-[#e8e6e3]">
        {/* Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Hover overlay - editorial style */}
        <motion.div 
          className="absolute inset-0 bg-[#0c0c0a]/80 flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[#ccff00] mb-2">
            {project.category}
          </span>
          <h3 className="text-[1.25rem] md:text-[1.5rem] font-bold text-[#f5f3ef] leading-tight">
            {project.title}
          </h3>
        </motion.div>

        {/* Hand-drawn border effect on hover */}
        <motion.div 
          className="absolute inset-0 border-2 border-[#0c0c0a] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ 
            transform: isHovered ? 'rotate(-1deg)' : 'rotate(0deg)',
          }}
        />
      </div>
    </motion.article>
  );
};

// ───────────────────────────────────────────────────────────
// MANIFESTO SECTION - Big expressive typography
// Like a full-page editorial spread
// ───────────────────────────────────────────────────────────
const ManifestoSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="w-full bg-[#0c0c0a] py-32 md:py-48 overflow-hidden">
      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Large pull quote style */}
          <blockquote className="text-[clamp(2rem,6vw,5rem)] font-bold text-[#f5f3ef] leading-[1.1] tracking-[-0.02em] mb-12">
            <span className="text-[#ccff00]">"</span>
            Great design is invisible. 
            <br />
            <span className="text-[#f5f3ef]/40">It just works.</span>
            <span className="text-[#ccff00]">"</span>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#f5f3ef]/70 text-lg leading-relaxed"
            >
              For nine years, I've led design teams in fintech and insurtech, 
              transforming complex enterprise systems into experiences that feel 
              effortless.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#f5f3ef]/70 text-lg leading-relaxed"
            >
              My approach combines strategic thinking with hands-on craft. 
              Whether it's a trading terminal or an AI-powered product, 
              I focus on solving real problems for real people.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// ABOUT SECTION - Magazine spread layout
// Photo + text in editorial composition
// ───────────────────────────────────────────────────────────
const AboutSpread: React.FC<{ onExploreSideProjects: () => void }> = ({ onExploreSideProjects }) => {
  return (
    <section id="about" className="w-full bg-[#f5f3ef] py-24 md:py-32">
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left - Large portrait with editorial treatment */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Main portrait */}
              <div className="aspect-[3/4] relative overflow-hidden bg-[#e8e6e3]">
                <img 
                  src="/images/portrait.jpg" 
                  alt="Arnon Friedman"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Tape effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#f5f3ef]/80 rotate-1" />
              </div>
              
              {/* Caption */}
              <div className="mt-4 flex justify-between items-start">
                <span className="text-[0.625rem] uppercase tracking-[0.15em] text-[#0c0c0a]/50">
                  Photo: Tel Aviv, 2024
                </span>
                <span className="text-[0.625rem] uppercase tracking-[0.15em] text-[#0c0c0a]/50">
                  Product Designer
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right - Editorial text layout */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-[#0c0c0a]/50 block mb-6">
                About
              </span>
              
              <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-[#0c0c0a] leading-[0.95] tracking-[-0.02em] uppercase mb-8">
                Design<br />
                <span className="text-[#0c0c0a]/30">Leadership</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-[1.0625rem] text-[#2b2926] leading-[1.7]">
                I'm a Product Designer with over 9 years of experience crafting digital
                products for fintech, insurtech, and enterprise companies. Currently 
                leading design at Novidea, transforming how insurance professionals 
                manage complex claims.
              </p>
              
              <p className="text-[1.0625rem] text-[#2b2926] leading-[1.7]">
                My work combines strategic thinking with hands-on execution. I believe 
                the best design is invisible—it just works. Whether architecting a 
                trading terminal or an AI-powered kitchen companion, I focus on solving 
                real problems for real people.
              </p>
            </motion.div>

            {/* Stats - editorial style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-[#0c0c0a]/10 grid grid-cols-3 gap-8"
            >
              <div>
                <span className="text-[2.5rem] font-bold text-[#0c0c0a] block">9+</span>
                <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-[#0c0c0a]/50">Years</span>
              </div>
              <div>
                <span className="text-[2.5rem] font-bold text-[#0c0c0a] block">50+</span>
                <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-[#0c0c0a]/50">Projects</span>
              </div>
              <div>
                <span className="text-[2.5rem] font-bold text-[#0c0c0a] block">3</span>
                <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-[#0c0c0a]/50">Industries</span>
              </div>
            </motion.div>

            {/* Side projects link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <button
                onClick={onExploreSideProjects}
                className="group inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-[#0c0c0a] hover:text-[#0c0c0a]/60 transition-colors"
              >
                <span>Explore Side Projects</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// CONTACT SECTION - Minimal, typography-focused
// Like the back page of a magazine
// ───────────────────────────────────────────────────────────
const ContactPage: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-[#0c0c0a] py-32 md:py-48">
      <div className="px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-[#f5f3ef]/50 block mb-8"
        >
          Get in Touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(3rem,12vw,10rem)] font-bold text-[#f5f3ef] leading-[0.85] tracking-[-0.03em] uppercase mb-8"
        >
          Let's<br />
          <span className="text-[#ccff00]">Create</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#f5f3ef]/60 text-lg max-w-md mx-auto mb-12"
        >
          Open to new opportunities, collaborations, and interesting conversations 
          about design and technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="mailto:arnon@example.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#f5f3ef] text-[#0c0c0a] text-[0.8125rem] font-semibold uppercase tracking-[0.15em] hover:bg-[#ccff00] transition-colors"
          >
            Send Email
          </a>
          <a 
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#f5f3ef]/30 text-[#f5f3ef] text-[0.8125rem] font-semibold uppercase tracking-[0.15em] hover:bg-[#f5f3ef]/10 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-[#f5f3ef]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.6875rem] uppercase tracking-[0.15em] text-[#f5f3ef]/40"
        >
          <span>© 2024 Arnon Friedman</span>
          <span>Tel Aviv, Israel</span>
        </motion.div>
      </div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────
// MAIN COMPONENT
// ───────────────────────────────────────────────────────────
interface ArtisticHomepageProps {
  onProjectSelect: (project: Project) => void;
  onExploreSideProjects: () => void;
}

export const ArtisticHomepage: React.FC<ArtisticHomepageProps> = ({ 
  onProjectSelect, 
  onExploreSideProjects 
}) => {
  return (
    <div className="w-full bg-[#f5f3ef]">
      {/* Paper texture overlay - global */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <ArtisticHero />
      <GalleryWall onProjectClick={onProjectSelect} />
      <ManifestoSection />
      <AboutSpread onExploreSideProjects={onExploreSideProjects} />
      <ContactPage />
    </div>
  );
};

export default ArtisticHomepage;
