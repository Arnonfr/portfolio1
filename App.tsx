
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { NewHeader } from './components/NewHeader';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkGallery } from './components/WorkGallery';
import { Footer } from './components/Footer';
import { ProjectPage } from './components/ProjectPage';
import { WebTraderCaseStudy } from './components/WebTraderCaseStudy';
import { ArabicSyntaxCaseStudy } from './components/ArabicSyntaxCaseStudy';
import { SmartClausesCaseStudy } from './components/SmartClausesCaseStudy';
import { SideProjectsPage } from './components/SideProjectsPage';
import { HomeAlternative } from './components/HomeAlternative';
import { NewHomepage } from './components/NewHomepage';
import { ClassicThemeWrapper } from './components/ClassicThemeWrapper';
import { PROJECTS, SIDE_PROJECTS } from './data';
import type { Project } from './types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const ProjectRouteHandler = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === Number(id));

  if (!project) {
    return <div>Project not found</div>;
  }



  return (
    <ProjectPage
      project={project}
      onBack={() => navigate('/')}
    />
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isInternal = location.pathname !== '/' && location.pathname !== '/v2' && location.pathname !== '/classic';
  const [heroProgress, setHeroProgress] = useState(0);

  // Listen for hero scroll progress to show/hide navbar on homepage
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setHeroProgress(detail.progress);
    };
    window.addEventListener('hero-scroll-progress', handler);
    return () => window.removeEventListener('hero-scroll-progress', handler);
  }, []);

  // Determine which header to use
  const useNewDesign = location.pathname === '/' || location.pathname === '/new';
  const isHomepage = location.pathname === '/';
  // On homepage, only show navbar after hero is mostly done (progress > 0.85)
  const showNavbar = !isHomepage || heroProgress > 0.85;

  const handleProjectSelect = (project: Project) => {
    navigate(`/work/${project.id}`);
  };

  return (
    <main className="w-full min-h-screen font-sans selection:bg-[#c9a87e] selection:text-[#0c0c0a]">
      {/* <CustomCursor /> */}
      <ScrollToTop />

      {/* Header — hidden on homepage during hero, fades in after */}
      {!(location.pathname === '/work/1' || location.pathname === '/work/4') && (
        <div
          style={{
            opacity: showNavbar ? 1 : 0,
            pointerEvents: showNavbar ? 'auto' : 'none',
            transition: 'opacity 0.5s ease',
          }}
        >
          {useNewDesign ? (
            <NewHeader
              isInternal={isInternal}
              onBack={() => navigate('/')}
            />
          ) : (
            <Header
              isInternal={isInternal}
              onBack={() => navigate('/')}
            />
          )}
        </div>
      )}

      <Routes>
        {/* New Homepage (Default) */}
        <Route path="/" element={
          <NewHomepage
            onProjectSelect={handleProjectSelect}
            onExploreSideProjects={() => navigate('/side-projects')}
          />
        } />

        {/* Classic Homepage */}
        <Route path="/classic" element={
          <ClassicThemeWrapper>
            <Hero />
            <div id="work" className="pb-32">
              <WorkGallery />
            </div>
            <About onExploreSideProjects={() => navigate('/side-projects')} />
            <div id="contact">
              <Footer />
            </div>
          </ClassicThemeWrapper>
        } />

        <Route path="/v2" element={<HomeAlternative />} />

        <Route path="/side-projects" element={
          <SideProjectsPage
            projects={SIDE_PROJECTS}
            onProjectSelect={(p) => navigate(`/work/${p.id}`)}
            onBack={() => navigate('/')}
          />
        } />

        <Route path="/work/:id" element={<ProjectRouteHandler />} />
      </Routes>

      {/* Global Footer (only on sub-pages where appropriate) */}
      {(location.pathname === '/side-projects') && <Footer />}
    </main>
  );
}

export default App;
