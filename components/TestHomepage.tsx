import React from 'react';
import { Project } from '../types';

interface TestHomepageProps {
  onProjectSelect: (project: Project) => void;
  onExploreSideProjects: () => void;
}

export const TestHomepage: React.FC<TestHomepageProps> = () => {
  return (
    <div className="w-full min-h-screen bg-[#f4f3f1] flex items-center justify-center">
      <h1 className="text-[5rem] font-bold text-[#0c0c0a]">TEST PAGE</h1>
    </div>
  );
};

export default TestHomepage;
