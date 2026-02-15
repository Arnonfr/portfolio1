import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC<{ isInternal?: boolean; onBack?: () => void }> = ({ isInternal, onBack }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Header background only appears after the long Hero section (approx 750vh-800vh)
    const handleScroll = () => {
      if (isInternal) {
        setIsScrolled(window.scrollY > 50);
      } else {
        const threshold = window.innerHeight * 7;
        setIsScrolled(window.scrollY > threshold);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`
      fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-8 transition-all duration-1000
    `}>
      <nav className={`
        max-w-[1440px] mx-auto rounded-2xl h-14 px-8 flex items-center justify-between transition-all duration-700 ease-in-out
        ${isScrolled
          ? 'bg-white/70 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
          : 'bg-transparent border-transparent shadow-none border-0 outline-none'}
      `}>

        {/* Logo Section */}
        <div
          onClick={() => {
            if (isInternal) {
              navigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span className="font-serif text-[20px] md:text-[22px] font-medium text-black group-hover:opacity-60 transition-opacity">
            {isInternal ? '← Back' : 'Arnon Friedman'}
          </span>
          {!isInternal && (
            <span className={`text-[11px] font-sans font-medium tracking-wide mt-1 transition-opacity duration-700 ${isScrolled ? 'text-black/20 opacity-100' : 'text-black/10 opacity-30'}`}>
              — Product Designer
            </span>
          )}
        </div>

        {/* Navigation Section */}
        <div className="flex items-center gap-6 md:gap-8">
          {!isInternal && (
            <Link
              to="/v2"
              className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1 border border-black/10 rounded-full transition-all duration-500 hover:bg-black hover:text-white ${isScrolled ? 'opacity-100' : 'opacity-40'}`}
            >
              V2 Mode
            </Link>
          )}
          {['Work', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => {
                const targetId = item.toLowerCase();
                if (isInternal) {
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                } else {
                  const el = document.getElementById(targetId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`text-[12px] font-sans font-medium transition-all duration-500 ${isScrolled ? 'text-black/50 hover:text-black' : 'text-black/40 hover:text-black'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
