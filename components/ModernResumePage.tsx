import React from 'react';
import { Mail, Phone, Globe, Linkedin, Download, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResumePageProps {
  onBack: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans">
      {/* Header controls - Hidden in Print */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
          >
            <span className="text-lg">←</span> Back to Portfolio
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white text-sm font-semibold rounded-full hover:bg-[#1e40af] transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="pt-24 pb-12 px-6 print:pt-0 print:pb-0 print:px-0">
        {/* Paper Container - A4 aspect ratio 210mm x 297mm */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[1000px] mx-auto bg-white shadow-2xl shadow-slate-200/50 print:shadow-none print:max-w-none overflow-hidden rounded-2xl print:rounded-none flex flex-col md:flex-row min-h-[1200px]"
        >
          {/* LEFT SIDEBAR (Narrow) */}
          <aside className="w-full md:w-[320px] bg-slate-50 border-r border-slate-100 flex flex-col print:bg-slate-50">
            {/* Header for Mobile only - hidden on Desktop/Print */}
            <div className="md:hidden p-8 text-center border-b border-slate-200">
                <div className="w-32 h-32 rounded-full bg-slate-200 mx-auto mb-6 overflow-hidden">
                    <img src="/images/arnon_friedman.webp" alt="Arnon Friedman" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Arnon Friedman</h1>
                <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mt-2">Senior Product Designer</p>
            </div>

            {/* Content within Sidebar */}
            <div className="p-8 space-y-10 flex-1">
              {/* Profile Image - Desktop/Print only */}
              <div className="hidden md:block mb-4">
                  <div className="w-48 h-48 rounded-2xl bg-white shadow-inner border border-slate-200 overflow-hidden mx-auto p-1">
                    <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img src="/images/arnon_friedman.webp" alt="Arnon Friedman" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        <span className="text-4xl font-bold text-slate-300">AF</span>
                    </div>
                  </div>
              </div>

              {/* Contact Section */}
              <section>
                <h3 className="text-[12px] font-extrabold text-[#111] uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-2">Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-blue-600">
                        <Phone size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Phone</p>
                        <p className="text-sm font-medium">+972 55 669 7319</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-blue-600">
                        <Mail size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email</p>
                        <p className="text-sm font-medium">arnono7700@gmail.com</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-blue-600">
                        <MapPin size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Location</p>
                        <p className="text-sm font-medium">Israel</p>
                    </div>
                  </li>
                </ul>
              </section>

              {/* Links Section */}
              <section>
                <h3 className="text-[12px] font-extrabold text-[#111] uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-2">Links</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-blue-600">
                        <Linkedin size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">LinkedIn</p>
                        <a href="https://linkedin.com/in/arnon-friedman" className="text-sm font-medium hover:text-blue-600 transition-colors">/arnon-friedman</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 text-blue-600">
                        <Globe size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Website</p>
                        <a href="https://arnonfriedman.com" className="text-sm font-medium hover:text-blue-600 transition-colors">arnonfriedman.com</a>
                    </div>
                  </li>
                </ul>
              </section>

              {/* Skills Highlights */}
              <section>
                <h3 className="text-[12px] font-extrabold text-[#111] uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-2">Skill Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'User Research', 'Usability Testing', 'Wireframing', 'Prototyping', 'Design Systems', 'Interaction Design', 'UI Design', 'Product Strategy'
                  ].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white text-slate-600 text-[11px] font-semibold border border-slate-200 rounded-full shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section>
                <h3 className="text-[12px] font-extrabold text-[#111] uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-2">Languages</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hebrew</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Native</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">English</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fluent</span>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="p-8 pt-0 mt-auto opacity-30 text-[9px] font-medium uppercase tracking-[0.1em]">
              REF: 07700.ARN.2025
            </div>
          </aside>

          {/* RIGHT CONTENT (Main) */}
          <main className="flex-1 p-8 md:p-14 space-y-12">
            {/* Name & Title Header - Hidden on Mobile sidebar has it */}
            <div className="hidden md:block">
                <div className="flex justify-between items-start">
                    <div>
                        <motion.h1 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl font-black text-[#111] tracking-tighter leading-tight"
                        >
                            Arnon<br/>Friedman
                        </motion.h1>
                        <div className="h-1.5 w-24 bg-blue-600 mt-4 rounded-full"></div>
                    </div>
                </div>
                <p className="text-lg font-bold text-slate-400 uppercase tracking-[0.3em] mt-8">Senior Product Designer</p>
            </div>

            {/* Summary */}
            <section className="space-y-4">
              <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">Profile</h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light italic">
                Product Designer with 4+ years of experience specialized in building end-to-end user experiences for complex enterprise platforms across Insurtech and Fintech.
              </p>
              <p className="text-slate-600 leading-relaxed">
                I specialize in transforming complex business workflows into seamless digital products. My approach is rooted in user research and structured data, ensuring that every design decision serves both the user's needs and the organization's strategic goals. Robust collaborator with engineers and product owners to deliver pixel-perfect, accessible, and scalable design systems.
              </p>
            </section>

            {/* Experience */}
            <section className="space-y-8">
              <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">Experience</h3>
              
              <div className="space-y-10">
                {/* Job 1 */}
                <div className="group relative">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Product Designer</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-md font-semibold text-slate-500">Novidea</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="text-sm text-slate-400">Insurtech Platform</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 md:mt-0">2024 — PRESENT</p>
                  </div>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>Led the full design lifecycle for enterprise-grade insurance management software, streamlining complex B2B brokerage workflows.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>Spearheaded the evolution of the company's design system, implementing reusable components that reduced design-to-development handoff time by 30%.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>Conducted longitudinal user studies and usability testing sessions with international insurance brokers to validate feature architectures.</span>
                    </li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="group relative">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">UX Designer</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-md font-semibold text-slate-500">AvaTrade</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="text-sm text-slate-400">Fintech / Trading Platform</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 md:mt-0">2022 — 2024</p>
                  </div>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shrink-0"></span>
                      <span>Visualized complex multi-asset trading data into intuitive dashboards, enhancing real-time decision-making for retail traders.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shrink-0"></span>
                      <span>Optimized mobile application flows for onboarding and KYC processes, resulting in a measurable increase in conversion rates.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shrink-0"></span>
                      <span>Collaborated directly with engineering teams to ensure pixel-perfect implementation of interactive chart systems and dark-mode UI.</span>
                    </li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div className="group relative">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Art Director</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-md font-semibold text-slate-500">Brish Galey</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="text-sm text-slate-400">Advertising Agency</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 md:mt-0">2020 — 2022</p>
                  </div>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex gap-4">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors shrink-0"></span>
                      <span>Defined brand identities and visual languages for diverse client portfolios across print and social media.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-6">
              <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">Education</h3>
              <div className="flex flex-col md:flex-row md:items-baseline justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Bezalel Academy of Arts and Design</h4>
                  <p className="text-slate-500 font-medium mt-1">Bachelor of Design (B.Des)</p>
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 md:mt-0">2014 — 2018</p>
              </div>
            </section>
          </main>
        </motion.div>
      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:px-0 { padding: 0 !important; }
          .print\\:pt-0 { padding-top: 0 !important; }
          .print\\:pb-0 { padding-bottom: 0 !important; }
          .print\\:bg-slate-50 { background-color: #f8fafc !important; }
          aside { width: 30% !important; border-right: 1px solid #f1f5f9 !important; }
          main { width: 70% !important; padding: 2rem !important; }
          .shadow-2xl { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};
