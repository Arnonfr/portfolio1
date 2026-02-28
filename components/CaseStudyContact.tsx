
import React from 'react';

export const CaseStudyContact: React.FC = () => {
  return (
    <section className="w-full bg-[#0c0c0a] py-24 md:py-32 relative px-6 md:px-10 overflow-hidden">
      {/* Blended ambient video */}
      <video
        autoPlay loop muted playsInline
        poster="/images/alt-hero.png"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        style={{ mixBlendMode: 'screen' }}
      >
        <source src="/images/alt-footer.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold text-[#f4f3f1] leading-[0.9] tracking-[-0.04em] uppercase">
            LET'S WORK
          </h2>
          <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold text-[#a8a39a] leading-[0.9] tracking-[-0.04em] uppercase">
            TOGETHER
          </h2>
        </div>

        {/* Two-column contact info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-[#2b2926]">
          {/* Left — buttons */}
          <div>
            <p className="text-[#a8a39a] text-[0.9375rem] leading-[1.6] mb-8 max-w-md">
              Open to product design roles, consulting, and collaborations
              on complex product challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:arnono7700@gmail.com"
                className="h-12 px-8 flex items-center justify-center bg-[#f4f3f1] text-[#0c0c0a] text-[11px] font-bold uppercase tracking-widest hover:bg-[#c9a87e] transition-colors"
              >
                SEND EMAIL
              </a>
              <a
                href="https://wa.me/9720556697319"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 flex items-center justify-center border border-[#2b2926] text-[#a8a39a] text-[11px] font-bold uppercase tracking-widest hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
              >
                WHATSAPP
              </a>
              <a
                href="https://www.linkedin.com/in/arnon-friedman-00454867/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 flex items-center justify-center border border-[#2b2926] text-[#a8a39a] text-[11px] font-bold uppercase tracking-widest hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all"
              >
                LINKEDIN
              </a>
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
                rel="noopener noreferrer"
                className="text-[#f4f3f1] hover:text-[#c9a87e] transition-colors text-[0.9375rem]"
              >
                055-6697319
              </a>
            </div>
          </div>
        </div>

        {/* Minimal footer */}
        <div className="mt-24 pt-6 border-t border-[#2b2926] flex justify-between items-center">
          <span className="text-[0.75rem] font-mono text-[#a8a39a] tracking-[0.02em]">
            ARNON FRIEDMAN © 2025
          </span>
          <span className="text-[0.75rem] font-mono text-[#a8a39a] tracking-[0.02em]">
            BUILT WITH INTENT
          </span>
        </div>
      </div>
    </section>
  );
};
