import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-8xl font-display font-bold leading-none mb-8">
            Let's work<br/>together.
          </h2>
          <a href="mailto:hello@irfan.com" className="text-2xl md:text-4xl text-gray-400 hover:text-accent transition-colors border-b border-gray-600 pb-2 inline-block">
            hello@irfankhan.me
          </a>
        </div>
        
        <div className="flex flex-col gap-4 text-right">
          <span className="text-gray-500 uppercase text-xs tracking-widest">Socials</span>
          <div className="flex gap-6 text-lg font-bold">
             <a href="#" className="hover:text-accent">LinkedIn</a>
             <a href="#" className="hover:text-accent">Dribbble</a>
             <a href="#" className="hover:text-accent">Behance</a>
             <a href="#" className="hover:text-accent">Twitter</a>
          </div>
        </div>
      </div>

      <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
        <span>© 2024 Irfan Khan Portfolio</span>
        <span>Made with React & Tailwind</span>
      </div>
    </footer>
  );
};