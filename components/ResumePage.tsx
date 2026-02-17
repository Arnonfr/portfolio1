import React from 'react';
import { ArrowLeft, Mail, Phone, Globe, Linkedin, Download } from 'lucide-react';

interface ResumePageProps {
  onBack: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#e8e6e1]">
      {/* Download Button - Visible on screen, hidden in print */}
      <div className="print:hidden pt-24 pb-4 max-w-[794px] mx-auto px-6 flex justify-end">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[#0c0c0a] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a28] transition-colors shadow-lg"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* A4 Paper — 794×1123px at 96dpi */}
      <div className="max-w-[794px] mx-auto mb-8 print:my-0 print:max-w-none">
        <div className="bg-white shadow-2xl print:shadow-none" style={{ maxHeight: '1123px', overflow: 'hidden' }}>
          <div className="grid grid-cols-[230px_1fr] print:grid-cols-[210px_1fr] h-[1123px]">

            {/* ===== LEFT COLUMN — Dark sidebar ===== */}
            <div className="bg-[#1a1a1a] text-white px-5 py-6 print:px-4 print:py-5 flex flex-col overflow-hidden">

              {/* Photo placeholder */}
              <div className="w-20 h-20 rounded-full bg-[#2a2a2a] border-2 border-[#3a3a3a] mx-auto mb-4 flex items-center justify-center overflow-hidden shrink-0">
                <span className="text-2xl font-bold text-[#555] select-none">AF</span>
              </div>

              {/* Name */}
              <h1 className="text-lg font-bold tracking-tight text-center mb-0.5">Arnon Friedman</h1>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-[0.2em] mb-5">Product Designer</p>

              {/* Contact */}
              <div className="mb-5">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-2">Contact</h3>
                <div className="space-y-1.5 text-[10px]">
                  <a href="mailto:arnono7700@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Mail size={10} className="text-gray-500 shrink-0" />
                    arnono7700@gmail.com
                  </a>
                  <a href="tel:+972556697319" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Phone size={10} className="text-gray-500 shrink-0" />
                    055-669-7319
                  </a>
                  <a href="https://arnonfriedman.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Globe size={10} className="text-gray-500 shrink-0" />
                    arnonfriedman.com
                  </a>
                  <a href="https://www.linkedin.com/in/arnon-friedman-00454867/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Linkedin size={10} className="text-gray-500 shrink-0" />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-5">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-2">Skills</h3>
                <div className="space-y-1">
                  {[
                    'User Research & Usability Testing',
                    'Wireframing & Prototyping',
                    'Interaction Design',
                    'Information Architecture',
                    'Design Systems',
                    'User Flows & Journey Mapping',
                    'Responsive & Mobile Design',
                    'Accessibility (WCAG)',
                    'A/B Testing & Data-Driven Design',
                    'Cross-Functional Collaboration',
                    'Stakeholder Management',
                  ].map((skill) => (
                    <div key={skill} className="text-[10px] text-gray-300 flex items-start gap-1.5 leading-tight">
                      <span className="w-1 h-1 rounded-full bg-gray-500 mt-[4px] shrink-0" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-5">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-2">Tools</h3>
                <div className="flex flex-wrap gap-1">
                  {[
                    'Figma', 'Webflow',
                    'Adobe CC', 'Miro', 'Jira',
                    'VS Code',
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="px-1.5 py-0.5 bg-[#2a2a2a] text-[9px] text-gray-400 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-2">Languages</h3>
                <div className="space-y-1 text-[10px] text-gray-300">
                  <div className="flex justify-between">
                    <span>Hebrew</span>
                    <span className="text-gray-500">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span>English</span>
                    <span className="text-gray-500">Fluent</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ===== RIGHT COLUMN — Main content ===== */}
            <div className="px-7 py-6 print:px-6 print:py-5 flex flex-col relative overflow-hidden">

              {/* Portfolio link — top right corner */}
              <a
                href="https://arnonfriedman.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-5 right-5 print:top-4 print:right-4 px-3 py-1 bg-[#0c0c0a] text-white text-[10px] font-semibold uppercase tracking-[0.15em] rounded-md hover:bg-[#2a2a28] transition-colors"
              >
                View Portfolio
              </a>

              {/* Summary */}
              <div className="mb-5">
                <h2 className="text-[15px] font-bold text-[#0c0c0a] uppercase tracking-wide mb-2">Profile</h2>
                <div className="w-8 h-[2px] bg-[#0c0c0a] mb-3" />
                <p className="text-[11px] text-gray-600 leading-[1.6]">
                  Product Designer with 4+ years of experience creating user-centered digital products across fintech, insurtech, and SaaS industries.
                  Skilled in translating complex business requirements into intuitive interfaces through research-driven design.
                  Strong collaborator who bridges design, product, and engineering to ship solutions that measurably improve user satisfaction and business outcomes.
                </p>
              </div>

              {/* Experience */}
              <div className="flex-1">
                <h2 className="text-[15px] font-bold text-[#0c0c0a] uppercase tracking-wide mb-2">Experience</h2>
                <div className="w-8 h-[2px] bg-[#0c0c0a] mb-4" />

                <div className="space-y-4">
                  {/* Novidea */}
                  <div className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-[#0c0c0a]" />
                    <div className="flex items-baseline justify-between mb-0.5">
                      <h3 className="text-[12px] font-bold text-[#0c0c0a]">Product Designer</h3>
                      <span className="text-[9px] text-gray-400 shrink-0 ml-3">2024 – Present</span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">Novidea &middot; Insurtech Platform</p>
                    <ul className="space-y-0.5 text-[10.5px] text-gray-600 leading-[1.5]">
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Led end-to-end UX design for complex B2B workflows, from discovery to delivery</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Conducted user research and usability testing to validate design decisions</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Planned and maintained a design system to ensure consistency across the platform</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Collaborated cross-functionally with PMs, engineers, and stakeholders</li>
                    </ul>
                  </div>

                  {/* AvaTrade */}
                  <div className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-[#0c0c0a]" />
                    <div className="flex items-baseline justify-between mb-0.5">
                      <h3 className="text-[12px] font-bold text-[#0c0c0a]">UX Designer</h3>
                      <span className="text-[9px] text-gray-400 shrink-0 ml-3">2022 – 2024</span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">AvaTrade &middot; Fintech / Trading Platform</p>
                    <ul className="space-y-0.5 text-[10.5px] text-gray-600 leading-[1.5]">
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Redesigned core platform experiences, improving usability and engagement</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Designed data visualizations and responsive layouts for complex information</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Created user flows, wireframes, and high-fidelity prototypes for mobile and desktop</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Translated analytics and user feedback into actionable UX improvements</li>
                    </ul>
                  </div>

                  {/* Brish Galey */}
                  <div className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-[#0c0c0a]" />
                    <div className="flex items-baseline justify-between mb-0.5">
                      <h3 className="text-[12px] font-bold text-[#0c0c0a]">Art Director</h3>
                      <span className="text-[9px] text-gray-400 shrink-0 ml-3">2020 – 2022</span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">Brish Galey &middot; Advertising Agency</p>
                    <ul className="space-y-0.5 text-[10.5px] text-gray-600 leading-[1.5]">
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Directed visual design across branding, print, and digital campaigns</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Managed design projects end-to-end, from concept to production delivery</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Mentored junior designers and established design standards</li>
                    </ul>
                  </div>

                  {/* Leomek Hatodaa */}
                  <div className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-[#0c0c0a]" />
                    <div className="flex items-baseline justify-between mb-0.5">
                      <h3 className="text-[12px] font-bold text-[#0c0c0a]">Designer</h3>
                      <span className="text-[9px] text-gray-400 shrink-0 ml-3">2018 – 2020</span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">Leomek Hatodaa &middot; Design Agency</p>
                    <ul className="space-y-0.5 text-[10.5px] text-gray-600 leading-[1.5]">
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Designed print and digital materials including brochures, websites, and social campaigns</li>
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Collaborated with clients to define visual identity and brand guidelines</li>
                    </ul>
                  </div>

                  {/* Pardes Chaya */}
                  <div className="relative pl-4 border-l-2 border-gray-200">
                    <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-gray-300" />
                    <div className="flex items-baseline justify-between mb-0.5">
                      <h3 className="text-[12px] font-bold text-[#0c0c0a]">Partner Manager</h3>
                      <span className="text-[9px] text-gray-400 shrink-0 ml-3">2015 – Present</span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">Pardes Chaya &middot; Non-Profit (Volunteer)</p>
                    <ul className="space-y-0.5 text-[10.5px] text-gray-600 leading-[1.5]">
                      <li className="flex gap-1.5"><span className="text-gray-400 shrink-0">--</span>Managing partnerships and operational workflows for a community organization</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:my-0 { margin-top: 0 !important; margin-bottom: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
          .print\\:py-5 { padding-top: 1.25rem !important; padding-bottom: 1.25rem !important; }
          .print\\:px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .print\\:top-4 { top: 1rem !important; }
          .print\\:right-4 { right: 1rem !important; }
          .print\\:grid-cols-\\[210px_1fr\\] { grid-template-columns: 210px 1fr !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
};
