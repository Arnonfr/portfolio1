import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#f8f7f5] text-black py-24 px-6 md:px-12 relative overflow-hidden border-t border-black/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 mb-8">Get in touch</p>
          <h2 className="text-5xl md:text-8xl font-serif font-bold leading-none mb-8">
            Let's work<br/>together.
          </h2>
          <a href="mailto:arnonf@gmail.com" className="text-2xl md:text-4xl text-stone-400 hover:text-black transition-colors border-b border-black/10 pb-2 inline-block font-serif">
            arnonf@gmail.com
          </a>
        </div>
        
        <div className="flex flex-col gap-4 text-right">
          <span className="text-stone-400 uppercase text-[10px] font-bold tracking-[0.2em]">Socials</span>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
             <a href="https://linkedin.com/in/arnon-friedman" target="_blank" rel="noopener noreferrer" className="hover:text-[#0066FF] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">
        <span>© 2024 Arnon Friedman</span>
        <span>Designed & Built by Hand</span>
      </div>
    </footer>
  );
};