import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NewHeaderProps {
  isInternal?: boolean;
  onBack?: () => void;
}

export const NewHeader: React.FC<NewHeaderProps> = ({ isInternal, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isInternal) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'WORK', id: 'work' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#f4f3f1]/95 backdrop-blur-sm' : 'bg-transparent'
          }`}
      >
        <div className="px-container">
          <nav className="flex items-center justify-between py-4 md:py-5 border-b border-[#d9d6d1]">
            {/* Logo - Sharp, Technical */}
            <button
              onClick={() => {
                if (isInternal && onBack) {
                  onBack();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-3 group"
            >
              {isInternal ? (
                <>
                  <span className="text-[0.8125rem] text-[#a8a39a] group-hover:text-[#0c0c0a] transition-colors">
                    ← BACK
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[0.9375rem] font-semibold text-[#0c0c0a] tracking-[-0.02em]">
                    ARNON FRIEDMAN
                  </span>
                  {isScrolled && (
                    <span className="hidden md:inline-block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#a8a39a] ml-2">
                      DESIGN
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Desktop Navigation - Mechanical Style */}
            <div className="hidden md:flex items-center gap-1">
              {!isInternal && navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#a8a39a] hover:text-[#0c0c0a] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#0c0c0a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}

              {/* CTA Button - Sharp, No Radius */}
              {!isInternal && (
                <button
                  onClick={() => scrollToSection('contact')}
                  className="ml-4 px-5 py-2.5 bg-[#0c0c0a] text-[#f4f3f1] text-[0.6875rem] font-semibold uppercase tracking-[0.1em] hover:bg-[#c9a87e] hover:text-[#0c0c0a] transition-colors"
                >
                  LET'S TALK
                </button>
              )}
            </div>

            {/* Mobile Menu Button - Sharp Lines */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-[#0c0c0a] block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 24 }}
                transition={{ duration: 0.2 }}
                className="h-0.5 bg-[#0c0c0a] block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-[#0c0c0a] block"
              />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu - Full Screen, Sharp */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[#f4f3f1] md:hidden flex flex-col"
          >
            {/* Close button area at top */}
            <div className="h-20" />

            {/* Menu Items */}
            <div className="flex flex-col px-container pt-8 flex-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-6 border-b border-[#d9d6d1] group"
                >
                  <span className="text-[clamp(1.5rem,8vw,2.5rem)] font-semibold text-[#0c0c0a] tracking-[-0.03em] group-hover:text-[#a8a39a] transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ delay: 0.24, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollToSection('contact')}
                className="mt-8 px-6 py-4 bg-[#0c0c0a] text-[#f4f3f1] text-[0.8125rem] font-semibold uppercase tracking-[0.1em] w-full"
              >
                LET'S TALK
              </motion.button>
            </div>

            {/* Bottom Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-container pb-8"
            >
              <div className="flex justify-between text-[0.6875rem] text-[#a8a39a]">
                <span>TEL AVIV, IL</span>
                <span>GMT+2</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewHeader;
