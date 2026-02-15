
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface SideProjectsPageProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  onBack: () => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}> = ({ children, className = '', delay = 0, y = 30 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Vibe-coded side projects ──
const VIBE_PROJECTS = [
  {
    title: 'Urbanito',
    category: 'Travel',
    year: '2025',
    image: '/images/Urbanito.png',
    url: 'https://urbanito.live',
    description:
      'An interactive city exploration app that generates walking routes enriched with historical context, cultural notes, and local points of interest. Select a city, set your pace, and get a curated route with stories along the way.',
    builtWith: 'Google AI Studio, Antigravity, Claude Code',
    tags: ['Interactive Map', 'AI Routes', 'City Exploration'],
    gradient: 'from-sky-50 to-blue-100',
  },
  {
    title: 'Woodworking Planner',
    category: 'Tool',
    year: '2025',
    image: '/images/Planer.png',
    url: 'https://woodworking-project-planner-966802127078.us-west1.run.app',
    description:
      'A 3D furniture planning tool with real-time customization. Choose a template, adjust dimensions, and get building instructions and cut diagrams. Built entirely through prompting — from 3D rendering to blueprint generation.',
    builtWith: 'Google AI Studio',
    tags: ['3D Visualization', 'Parametric Design', 'Hebrew UI'],
    gradient: 'from-amber-50 to-orange-100',
  },
  {
    title: 'Cookit',
    category: 'Consumer AI',
    year: '2025',
    image: '/images/cookit 41.png',
    url: 'https://cookit-12-ee42eed7.base44.app',
    description:
      'A recipe extraction and management tool. Paste a URL or upload an image and get a clean, structured recipe — ingredients, steps, and tags. Organize your collection, filter by category, and search across everything.',
    builtWith: 'Base 44',
    tags: ['Recipe Extraction', 'Mobile First', 'Hebrew UI'],
    gradient: 'from-violet-50 to-purple-100',
  },
];

export const SideProjectsPage: React.FC<SideProjectsPageProps> = ({
  onBack,
}) => {
  return (
    <div className="w-full bg-white min-h-screen font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm text-stone-500 hover:text-black transition-colors font-medium flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </button>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
            Side Projects
          </span>
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-32 md:pt-48 pb-20 md:pb-28 px-6 border-b border-stone-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#0066FF] block mb-6">
            Experiments
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] text-black tracking-tight mb-8">
            Built with{' '}
            <span className="italic text-stone-300">Vibe Code</span>
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-2xl leading-relaxed">
            Side projects built entirely through AI tools — from idea to
            deployed product. Each one explores how far prompting can take
            a real product without writing code by hand.
          </p>
        </motion.div>
      </header>

      {/* ZIGZAG PROJECTS */}
      <main className="py-20 md:py-32">
        {VIBE_PROJECTS.map((project, idx) => {
          const imageLeft = idx % 2 === 0;
          return (
            <section
              key={project.title}
              className="px-6 mb-24 md:mb-40 last:mb-0"
            >
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  {/* Image / Preview */}
                  <FadeIn
                    className={imageLeft ? '' : 'lg:order-2'}
                    delay={imageLeft ? 0 : 0.1}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-[24px] border border-stone-200 shadow-[0_30px_80px_rgba(0,0,0,0.08)] group"
                    >
                      <div className={`relative bg-gradient-to-br ${project.gradient}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          onError={(e) => {
                            // Fallback: hide broken image, show gradient only
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-sm font-bold text-stone-700 shadow-lg flex items-center gap-2">
                            Visit Project <ExternalLink size={14} />
                          </span>
                        </div>
                      </div>
                    </a>
                  </FadeIn>

                  {/* Text */}
                  <FadeIn
                    className={imageLeft ? '' : 'lg:order-1'}
                    delay={imageLeft ? 0.1 : 0}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 block mb-4">
                        {project.category} — {project.year}
                      </span>
                      <h2 className="font-serif text-4xl md:text-5xl text-black mb-6 leading-tight">
                        {project.title}
                      </h2>
                      <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Built with */}
                      <p className="text-sm text-stone-400 mb-8">
                        <span className="font-medium text-stone-500">Built with:</span>{' '}
                        {project.builtWith}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-10">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium uppercase tracking-wider text-stone-500 bg-stone-100 px-4 py-1.5 rounded-full border border-stone-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sm font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors group/btn"
                      >
                        <span>Visit Project</span>
                        <ExternalLink
                          size={16}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* BOTTOM CTA */}
      <div className="px-6 pb-8 pt-4">
        <div className="bg-[#f8f7f5] border border-black/5 rounded-[48px] py-24 px-10 text-center">
          <p className="font-serif text-3xl md:text-4xl text-black/85 mb-10 leading-tight max-w-md mx-auto">
            More experiments coming soon.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#0066FF] text-white rounded-full font-bold text-sm tracking-wide hover:bg-[#0052cc] active:scale-95 transition-all shadow-lg shadow-blue-500/20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
