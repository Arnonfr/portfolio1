import React from 'react';
import { ArrowLeft, Mail, Phone, Globe, Linkedin, Download, MapPin, User, Calendar } from 'lucide-react';

interface ResumePageProps {
  onBack: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4f3f1] font-sans text-black selection:bg-black selection:text-white">
      {/* Navigation & Actions — hidden on print */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/20 backdrop-blur-xl z-50 px-6 print:hidden">
        <div className="max-w-[794px] mx-auto h-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-3 px-6 py-2.5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 print:pt-0 print:pb-0 print:px-0">
        {/* Main Resume Container — Designed for A4 (794px width) */}
        <div className="max-w-[794px] mx-auto bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] print:shadow-none min-h-[1123px] flex flex-col">
          
          {/* Main Layout Grid */}
          <div className="flex-1 grid grid-cols-[280px_1fr] print:grid-cols-[260px_1fr]">
            
            {/* Left Sidebar */}
            <aside className="bg-[#1a1a1a] text-white p-10 print:p-8 flex flex-col gap-10">
              
              {/* Profile Image Area */}
              <div className="relative">
                <div className="w-full aspect-square rounded-full bg-[#2a2a2a] overflow-hidden border border-white/10">
                   {/* Placeholder for Arnon's Profile Image */}
                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#222] to-[#111]">
                      <span className="text-4xl font-serif italic text-white/10 uppercase tracking-widest">AF</span>
                   </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Contact</h3>
                <ul className="flex flex-col gap-4 text-[12px] font-light text-white/60">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      <Phone size={10} className="text-white/40" />
                    </div>
                    <span>055-669-7319</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      <Mail size={10} className="text-white/40" />
                    </div>
                    <span className="break-all text-[11px]">arnono7700@gmail.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      <Globe size={10} className="text-white/40" />
                    </div>
                    <span>arnonfriedman.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      <Linkedin size={10} className="text-white/40" />
                    </div>
                    <span>arnon-friedman</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      <MapPin size={10} className="text-white/40" />
                    </div>
                    <span>Givat Shmuel, Israel</span>
                  </li>
                </ul>
              </div>

              {/* Personal Info */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Personal info</h3>
                <ul className="flex flex-col gap-4 text-[12px] font-light text-white/60">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      <User size={10} className="text-white/40" />
                    </div>
                    <span>ID: 204362143</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                      <Calendar size={10} className="text-white/40" />
                    </div>
                    <span>17.03.1994</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-10 border-t border-white/5">
                 <p className="text-[10px] text-white/20 leading-relaxed font-light">
                   Designed & documented with technical precision.
                 </p>
              </div>

            </aside>

            {/* Right Main Content */}
            <main className="p-14 print:p-10 flex flex-col gap-12 bg-white">
              
              {/* Header: Name & Role */}
              <header className="flex flex-col gap-2">
                <h1 className="font-serif text-6xl print:text-5xl leading-none text-[#111] tracking-tight">
                  Arnon Friedman
                </h1>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-black/10"></div>
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">
                    Product Designer
                  </h2>
                </div>
              </header>

              {/* Experience Section */}
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                   <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#1a1a1a]">Work Experience</h3>
                   <div className="flex-1 h-px bg-black/5"></div>
                </div>

                <div className="flex flex-col gap-10">
                  {/* Novidea */}
                  <div className="grid grid-cols-[100px_1fr] gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-bold text-[#111]">Current</span>
                      <span className="text-[10px] uppercase tracking-wider text-black/30 font-bold">2024</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[15px] font-bold text-[#111]">Product Designer</h4>
                        <span className="text-[12px] text-black/40 italic">Novidea, Insurtech Platform</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-[12px] text-black/60 leading-relaxed font-light list-disc pl-4 marker:text-black/10">
                        <li>Directed UX strategies for complex B2B insurance brokerage workflows</li>
                        <li>Transformed multi-layered business logic into intuitive operational dashboards</li>
                        <li>Facilitated cross-functional collaboration between engineering and key stakeholders</li>
                      </ul>
                    </div>
                  </div>

                  {/* AvaTrade */}
                  <div className="grid grid-cols-[100px_1fr] gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-bold text-[#111]">2 Years</span>
                      <span className="text-[10px] uppercase tracking-wider text-black/30 font-bold">2022</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[15px] font-bold text-[#111]">UX Designer</h4>
                        <span className="text-[12px] text-black/40 italic">AvaTrade, Fintech Trading Platform</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-[12px] text-black/60 leading-relaxed font-light list-disc pl-4 marker:text-black/10">
                        <li>Conceptualized and shipped end-to-end trading features with a focus on data clarity</li>
                        <li>Designed complex informational systems and real-time visualization tools</li>
                        <li>Created high-fidelity interactive prototypes for rigorous user testing & validation</li>
                      </ul>
                    </div>
                  </div>

                  {/* Brish Galey */}
                  <div className="grid grid-cols-[100px_1fr] gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-bold text-[#111]">2 Years</span>
                      <span className="text-[10px] uppercase tracking-wider text-black/30 font-bold">2020</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[15px] font-bold text-[#111]">Art Director</h4>
                        <span className="text-[12px] text-black/40 italic">Brish Galey, Advertising Agency</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-[12px] text-black/60 leading-relaxed font-light list-disc pl-4 marker:text-black/10">
                        <li>Architected visual identities and branding strategies for leading market players</li>
                        <li>Symphonized design teams to deliver high-impact digital and analog campaigns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Grid for Bottom sections */}
              <div className="grid grid-cols-2 gap-12">
                 {/* Education */}
                 <section className="flex flex-col gap-6">
                    <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#1a1a1a]">Education</h3>
                    <div className="flex flex-col gap-4">
                       <div className="flex flex-col gap-1">
                          <h4 className="text-[13px] font-bold text-[#111]">B.Des Visual Communication</h4>
                          <span className="text-[11px] text-black/40 italic">HIT, Holon Institute of Technology</span>
                          <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest mt-1">2016 – 2020</span>
                       </div>
                    </div>
                 </section>

                 {/* Skills & Tools */}
                 <section className="flex flex-col gap-6">
                    <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#1a1a1a]">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                       {['Figma', 'UX Strategy', 'Product Design', 'B2B', 'Fintech', 'Design Systems', 'Prototyping'].map(skill => (
                         <span key={skill} className="px-3 py-1 bg-[#f8f8f8] border border-black/5 text-[10px] font-bold text-black/40 tracking-wider uppercase rounded-md">
                            {skill}
                         </span>
                       ))}
                    </div>
                 </section>
              </div>

              {/* Languages */}
              <section className="mt-auto pt-10 border-t border-black/5">
                <div className="flex items-center gap-10">
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">Hebrew</span>
                      <div className="flex gap-1">
                         {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-black/60"></div>)}
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">English</span>
                      <div className="flex gap-1">
                         {[1,2,3,4].map(i => <div key={i} className={`w-1 h-1 rounded-full ${i <= 4 ? 'bg-black/60' : 'bg-black/10'}`}></div>)}
                      </div>
                   </div>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>

      <style>{`
        @font-face {
          font-family: 'Instrument Serif';
          src: url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        }

        @media print {
          body { 
            margin: 0; 
            padding: 0; 
            background: white;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
          }
          nav { display: none !important; }
          .pt-32 { padding-top: 0 !important; }
          .pb-20 { padding-bottom: 0 !important; }
          .px-6 { padding-left: 0 !important; padding-right: 0 !important; }
          .max-w-[794px] { 
            max-width: none !important; 
            width: 100% !important; 
            margin: 0 !important;
            box-shadow: none !important;
          }
          aside { width: 260px !important; }
          @page {
            size: A4;
            margin: 0;
          }
           /* Force background colors in PDF output */
          aside { background-color: #1a1a1a !important; color: white !important; }
          .bg-[#1a1a1a] { background-color: #1a1a1a !important; }
          .text-white { color: white !important; }
          .text-white\\/60 { color: rgba(255,255,255,0.6) !important; }
          .text-white\\/30 { color: rgba(255,255,255,0.3) !important; }
        }
      `}</style>
    </div>
  );
};
