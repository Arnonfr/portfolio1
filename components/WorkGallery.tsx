
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';
import { PROJECTS } from '../data';

export const WorkGallery: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="py-24 px-6 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.5em] text-black/20 block mb-6">Selected Works</span>
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#111] tracking-tight">Cases & Products</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/work/${project.id}`)}
          />
        ))}
      </div>
    </section>
  );
};
