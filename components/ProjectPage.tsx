
import React, { useEffect } from 'react';
import { Project } from '../types';
import { UiTransformation } from './UiTransformation';
import { ClaimStatisticsForm } from './ClaimStatisticsForm';
import { LegacyTransformationVisualizer } from './LegacyTransformationVisualizer';
import { CaseStudyFooter } from './CaseStudyFooter';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isClaimMovement = project.title.toLowerCase().includes('claim');

  if (isClaimMovement) {
    return (
      <div className="w-full bg-stone-50 min-h-screen font-sans animate-fadeIn">

        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-container h-16 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Portfolio
            </button>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Case Study</span>
          </div>
        </nav>

        {/* HERO */}
        <header className="relative w-full pt-32 md:pt-48 pb-20 md:pb-32 flex flex-col items-center bg-white border-b border-stone-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-container z-10 text-center mb-10 md:mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 mb-6 md:mb-8">Novidea — Lead Product Design</h4>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] text-black tracking-tight mb-6 md:mb-10">
              Claim <span className="italic text-stone-300">Movements</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 leading-relaxed px-4">
              Designing the core logic and workflow for enterprise insurance claims — transforming a fragmented spreadsheet-based process into a unified, high-performance legal framework.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-container mb-12 md:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { label: "Role", val: "Lead Design" },
                { label: "Platform", val: "Enterprise Web" },
                { label: "Company", val: "Novidea" },
                { label: "Duration", val: "2021 — 2024" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 md:mb-2">{item.label}</p>
                  <p className="text-sm md:text-base font-medium text-stone-700">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-[1200px] px-container">
            <div className="relative rounded-xl md:rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group">
              <img
                src="/images/mockups/claim-movements-mockup.png"
                alt="Claim Movements Interface"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000"
              />
              <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-black/80 backdrop-blur text-white text-[9px] md:text-[10px] font-bold px-3 md:px-4 py-1.5 md:py-2 rounded uppercase tracking-widest shadow-xl">
                Core Logic Interface
              </div>
            </div>
          </div>
        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-16 text-black">Context & Background</h2>

              <div className="space-y-10 md:space-y-12">
                {[
                  {
                    title: "The Challenge",
                    content: "Enterprise insurance claims are non-linear, multi-party legal events. Within the London Market, these \"movements\" were historically managed through fragmented emails, manual spreadsheets, and disconnected legacy databases. The goal was to build a single system of record that could handle the insane complexity while remaining performance-optimized for power users."
                  },
                  {
                    title: "My Role",
                    content: "As Lead Designer, I architected the end-to-end claim movement workflow. This involved deep technical immersion into the legal mechanics of insurance capital, coordinating with actuarial teams to map data flows, and designing a modular interface that could handle varying degrees of complexity without breaking the user experience."
                  }
                ].map((item, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-serif text-stone-900 mb-4">{item.title}</h3>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* THE OLD PROCESS — STACKED CHAOS */}
          <section className="py-20 md:py-32 bg-stone-900 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight">The "Before": A Sea of Spreadsheet Chaos</h2>
                  <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-8">
                    Prior to our intervention, claims were managed in a "stacked" fashion. Every update required opening dozens of disconnected screens, manually cross-referencing values, and praying that the downstream integration wouldn't fail.
                  </p>
                  <div className="space-y-4">
                    {[
                      "High cognitive load due to fragmented data entry",
                      "Zero visibility into audit trails or historical shifts"
                    ].map((text, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                        </div>
                        <p className="text-sm text-stone-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  {/* Abstract Chaos Visual */}
                  <div className="relative aspect-[4/3] md:aspect-square">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="absolute inset-x-0 bg-stone-800 border border-stone-700 rounded-lg p-4 shadow-2xl transition-all duration-500"
                        style={{
                          top: `${i * 15}%`,
                          left: `${i * 8}%`,
                          bottom: `${-i * 8}%`,
                          opacity: 0.2 * i,
                          zIndex: 5 - i,
                          transform: `rotate(${i * -2}deg)`
                        }}
                      >
                        <div className="w-2/3 h-2 bg-stone-700 rounded mb-2" />
                        <div className="w-full h-1 bg-stone-700/50 rounded mb-1" />
                        <div className="w-full h-1 bg-stone-700/50 rounded" />
                      </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center text-red-500/50 text-[100px] md:text-[180px] font-bold pointer-events-none select-none">
                      ?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DISCOVERY & KEY INSIGHT */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">Discovery & Key Insight</h2>

              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                <p className="text-base md:text-lg text-stone-600 leading-relaxed">
                  I spent time analyzing the existing workflow and collaborated closely with the product manager and development team. The goal was clear: <strong className="text-stone-900">users needed to successfully complete the process by creating actual payment instructions</strong> — not navigate a database structure.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 rounded-3xl border-2 border-blue-200 mb-12">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4">Key Insight</p>
                <h3 className="text-2xl md:text-3xl font-serif mb-6 text-black">Users Don't Need "Statistics" At All</h3>
                <p className="text-base md:text-lg text-stone-700 leading-relaxed mb-4">
                  The "statistics" step — where users created currency combinations — was completely unnecessary from a user perspective. We could handle multi-currency scenarios directly within a single interface, without requiring a separate intermediate step.
                </p>
                <p className="text-sm md:text-base font-medium text-blue-900">This realization fundamentally changed our approach.</p>
              </div>

              <p className="text-base md:text-lg text-stone-600 leading-relaxed">
                Working with the product manager and development team, we confirmed that we could eliminate the statistics layer and handle currency combinations behind the scenes. This would dramatically simplify the workflow without losing any functionality.
              </p>
            </div>
          </section>

          {/* DESIGN PROCESS */}
          <section className="py-20 md:py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">Design Process & Decisions</h2>

              <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200 mb-12 md:mb-16">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-3">Guiding Principle</p>
                <p className="text-xl md:text-3xl leading-relaxed text-stone-700 italic mb-4">
                  "Everything in one place"
                </p>
                <p className="text-sm md:text-base text-stone-600">
                  Users shouldn't have to leave the modal to complete their task.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    num: "01",
                    title: "Unified Modal",
                    content: "Consolidated six separate screens into one modal containing all necessary information and actions."
                  },
                  {
                    num: "02",
                    title: "Eliminated Statistics Step",
                    content: "Removed the intermediate \"statistics\" layer. Multi-currency handling now happens inline via simple dropdown selections."
                  },
                  {
                    num: "03",
                    title: "Automated Unnecessary Fields",
                    content: "Movement name and status now generate automatically. Default currencies and recipients auto-populate when there's only one option."
                  },
                  {
                    num: "04",
                    title: "Power User Shortcuts",
                    content: "Added duplicate row, quick add new row, and inline editing capabilities for efficiency."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 md:p-8 rounded-xl border border-stone-200">
                    <div className="text-xl md:text-2xl font-serif text-blue-500 mb-4">{item.num}</div>
                    <h4 className="text-lg font-serif text-stone-900 mb-3">{item.title}</h4>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE SOLUTION — BEFORE / AFTER */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-container">
              <div className="text-center mb-12 md:mb-20">
                <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">The Result</span>
                <h2 className="text-3xl md:text-5xl font-serif mb-6 text-black">From 9 Operations to 3</h2>
                <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  Everything a broker needs — movement info, payee & carrier transactions, and a multi-currency summary — consolidated into a single, streamlined modal.
                </p>
              </div>

              {/* Before / After Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {/* Before */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">Before — Fragmented</span>
                  </div>
                  <div className="rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.1)] border border-stone-200 bg-white p-3">
                    <img
                      src="/images/claim-movement-old-interface-1.png"
                      alt="Old Claim Statistic Management — dozens of manual fields per currency combination"
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    {['6 disconnected screens', '9+ manual operations', 'Redundant data entry', 'Easy to make errors'].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center text-sm text-stone-500">
                        <span className="text-red-400">✗</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-green-600">After — Unified</span>
                  </div>
                  <div className="rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.1)] border border-stone-200 bg-white p-3">
                    <img
                      src="/images/unified-modal-design.png"
                      alt="New unified modal — all settlement data in one clean interface"
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    {['1 unified modal', '3 simple operations', 'Smart defaults & auto-fill', 'Built-in validation'].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center text-sm text-stone-500">
                        <span className="text-green-500">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact Banner */}
              <div className="text-center">
                <div className="inline-flex items-center gap-6 bg-gradient-to-r from-red-50 via-white to-green-50 px-8 md:px-12 py-6 rounded-full border-2 border-stone-200 flex-wrap justify-center">
                  <span className="text-2xl md:text-4xl font-bold text-red-500">9</span>
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-stone-300 rotate-90 md:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  <span className="text-2xl md:text-4xl font-bold text-green-500">3</span>
                  <span className="text-stone-600 font-medium text-sm md:text-base">operations — 67% reduction</span>
                </div>
              </div>
            </div>
          </section>

          {/* INSIDE THE UNIFIED MODAL — 5 Unique Features */}
          <section className="py-20 md:py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-6xl mx-auto px-container">
              <div className="text-center mb-12 md:mb-20">
                <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Key Features</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-black">Inside the Unified Modal</h2>
                <p className="text-stone-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Every feature was designed to replace an entire screen from the old process.</p>
              </div>

              {[
                {
                  label: "Feature 01",
                  title: "Movement Information",
                  desc: "The header auto-populates movement name, claim reference, and status. What previously required navigating to a creation screen and manually entering metadata is now handled automatically.",
                  items: [
                    { bold: "Auto-generated name:", text: "No more manual naming conventions" },
                    { bold: "Status tracking:", text: "Visual progress indicator built-in" }
                  ],
                  img: "/images/claim-movement-section-info.png",
                  alt: "Movement Information section — auto-populated header",
                  left: true
                },
                {
                  label: "Feature 02",
                  title: "Inline Transactions",
                  desc: "The core transaction table replaces what used to be 3 separate screens. Brokers add payee and carrier rows inline, seeing all data in one place.",
                  items: [
                    { bold: "Inline editing:", text: "Add, duplicate, and delete rows without leaving the table" },
                    { bold: "All in context:", text: "Payees and carriers visible together, no tab switching" }
                  ],
                  img: "/images/claim-movement-section-payee.png",
                  alt: "Inline Payee Transactions table",
                  left: false
                },
                {
                  label: "Feature 03",
                  title: "Smart Currency Defaults",
                  desc: "The system auto-detects settlement currencies from the claim context. When a claim is in USD, the payout defaults to USD — eliminating selection errors and repetitive typing.",
                  items: [
                    { bold: "Auto-detection:", text: "Original and settlement currencies pre-filled" },
                    { bold: "Override available:", text: "Power users can still change when needed" }
                  ],
                  img: "/images/smart-defaults-feature.png",
                  alt: "Smart currency defaults — Original and Settlement auto-populated",
                  left: true
                },
                {
                  label: "Feature 04",
                  title: "Dedicated Row Actions",
                  desc: "Each row includes inline action buttons for power-user operations, eliminating the need to navigate away from the main interface.",
                  items: [
                    { bold: "Duplicate:", text: "Clone row details while clearing amounts for safe re-entry" },
                    { bold: "Quick Add / Delete:", text: "Insert or remove rows with a single click" }
                  ],
                  img: "/images/action-buttons-feature.png",
                  alt: "Dedicated action buttons — duplicate, add, delete per row",
                  left: false
                },
                {
                  label: "Feature 05",
                  title: "Multi-Currency Summary",
                  desc: "A real-time financial roll-up with currency tabs. Brokers toggle between USD, GBP, EUR views without leaving the modal — seeing totals, balances, and breakdowns at a glance.",
                  items: [
                    { bold: "Currency tabs:", text: "Switch views instantly, no page reload" },
                    { bold: "Live totals:", text: "Amounts update as you edit transactions above" }
                  ],
                  img: "/images/claim-movement-section-summary.png",
                  alt: "Multi-currency summary with tabs for USD, GBP, EUR",
                  left: true
                }
              ].map((feature, i) => (
                <div key={i} className={`mb-20 md:mb-28 ${i === 4 ? 'mb-0' : ''}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
                    <div className={`lg:col-span-2 ${feature.left ? '' : 'lg:order-2'}`}>
                      <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">{feature.label}</span>
                      <h4 className="text-2xl font-serif mb-6 text-black leading-tight">{feature.title}</h4>
                      <p className="text-base text-stone-600 leading-relaxed mb-6">{feature.desc}</p>
                      <ul className="space-y-3 text-stone-600">
                        {feature.items.map((item, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="text-blue-500 shrink-0">•</span>
                            <span><strong className="text-stone-900 font-medium">{item.bold}</strong> {item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`lg:col-span-3 ${feature.left ? '' : 'lg:order-1'} relative group`}>
                      <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500">
                        <img
                          src={feature.img}
                          alt={feature.alt}
                          className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* OUTCOMES & IMPACT */}
          <section className="py-20 md:py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">Outcomes & Impact</h2>

              <div className="bg-white p-6 md:p-10 rounded-2xl border border-stone-200 space-y-4 md:space-y-6">
                {[
                  "The new interface was successfully launched to customers",
                  "Positive feedback from brokers who found the workflow intuitive from day one",
                  "Support team reported fewer questions and support tickets related to claim movements",
                  "Reduced cognitive load enabled brokers to process settlements more confidently"
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-green-500 text-lg md:text-xl shrink-0">✓</span>
                    <p className="text-sm md:text-base text-stone-700">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 md:mt-16 bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 rounded-3xl border border-blue-100">
                <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-6">
                  The core of the redesign was removing technical barriers that forced users to think like database administrators.
                </p>
                <p className="text-base md:text-lg text-stone-700 leading-relaxed italic border-l-4 border-blue-500 pl-4 md:pl-6">
                  "By unifying the transaction steps and automating non-essential metadata, we returned the focus back to the business of insurance."
                </p>
              </div>

              {/* Stats */}
              <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { label: "Fewer steps required", val: "-67%" },
                  { label: "Single unified modal", val: "1" },
                  { label: "Adoption in first month", val: "94%" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 text-center">
                    <div className="text-3xl md:text-4xl font-serif text-blue-600 mb-2">{stat.val}</div>
                    <p className="text-stone-500 text-xs md:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="py-20 md:py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">Reflection</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-12">
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">What Worked Well</h3>
                  <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-stone-600 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Challenging the existing process rather than accepting it as-is — eliminating the statistics step was crucial</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Close collaboration with PM and dev ensured technical feasibility</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Prioritizing simplicity over features led to a more usable solution</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">What I Learned</h3>
                  <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-stone-600 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Sometimes the best solution is removing a feature, not adding one</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Technical constraints (Salesforce) can actually drive creative solutions</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Understanding the "why" before the "how" is essential for impactful design</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-stone-50 p-8 md:p-10 rounded-2xl border border-stone-200">
                  <h3 className="text-xl font-serif text-stone-900 mb-4">What I'd Do Differently</h3>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                    If I could revisit this project, I would conduct more structured user testing earlier in the process. Formal usability testing with actual brokers would have provided additional validation and potentially uncovered edge cases sooner.
                  </p>
                </div>

                <div className="bg-blue-600 p-8 md:p-10 rounded-2xl text-white shadow-xl">
                  <h3 className="text-xl font-serif mb-4">Next Steps</h3>
                  <ul className="space-y-3 md:space-y-4 text-blue-50/80 text-sm md:text-base">
                    <li className="flex gap-3">
                      <span className="text-blue-200 shrink-0">•</span>
                      <span>Advanced search and filtering within the unified modal</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-200 shrink-0">•</span>
                      <span>Automated currency conversion rate suggestions via API</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-200 shrink-0">•</span>
                      <span>Expanding unified patterns to other financial modules</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <CaseStudyFooter projectId={project.id} onBack={onBack} category={project.category} />
        </main>
      </div>
    );
  }


  // WEB TRADER PROJECT
  const isWebTrader = project.title.toLowerCase().includes('trader');

  if (isWebTrader) {
    return (
      <div className="w-full bg-stone-50 min-h-screen font-sans animate-fadeIn">

        {/* HERO */}
        <header className="relative w-full pt-32 md:pt-48 pb-20 md:pb-32 flex flex-col items-center bg-white border-b border-stone-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-container z-10 text-center mb-10 md:mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 mb-6 md:mb-8">AvaTrade Case Study</h4>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] text-black tracking-tight mb-6 md:mb-10">
              Web <span className="italic text-stone-300">Trader</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 leading-relaxed px-4">
              Enhancing navigation, account management, and mobile experience for active traders.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-container mb-12 md:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { label: "Role", val: "Lead Product Designer" },
                { label: "Platform", val: "Web & Mobile" },
                { label: "Company", val: "AvaTrade" },
                { label: "Year", val: "2018 — 2021" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 md:mb-2">{item.label}</p>
                  <p className="text-sm md:text-base font-medium text-stone-700">{item.val}</p>
                </div>
              ))}
            </div>
          </div>


          {/* Hero — Premium Mockup */}
          <div className="w-full max-w-[1200px] px-6">
            <div className="rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-stone-200 bg-white">
              <img
                src="/images/mockups/web-trader-mockup.png"
                alt="Web Trader Platform — premium architectural mockup"
                className="w-full h-auto"
              />
            </div>
          </div>

        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-16 text-black">Context & Background</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    num: "01",
                    title: "The Product",
                    content: "AvaTrade's comprehensive trading platform for active traders managing multiple accounts with real-time market data, order execution, and portfolio management."
                  },
                  {
                    num: "02",
                    title: "The Users",
                    content: "Active traders who frequently switch between demo and live accounts, execute time-sensitive trades, and need reliable mobile access for on-the-go trading."
                  },
                  {
                    num: "03",
                    title: "The Challenge",
                    content: "Critical usability issues affecting daily operations. We needed to deliver immediate value by optimizing the existing platform, not rebuilding from scratch."
                  }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-stone-50 rounded-2xl border border-stone-100">
                    <div className="text-2xl font-serif text-blue-500 mb-4">{item.num}</div>
                    <h3 className="text-lg font-serif text-stone-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="py-20 md:py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black text-center">Identifying The Friction</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200">
                  <p className="text-lg md:text-xl leading-relaxed text-stone-700 italic">
                    "The platform had critical pain points: unclear account indicators, disorganized navigation, and mobile interactions that led to accidental actions during time-sensitive trading."
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">Key User Struggles</h3>
                  <ul className="space-y-4 text-sm md:text-base text-stone-600">
                    <li className="flex gap-3">
                      <span className="text-red-400 shrink-0 text-lg">✗</span>
                      <span>Account switching confusion (Demo vs Live)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400 shrink-0 text-lg">✗</span>
                      <span>Cluttered navigation slowing down operations</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400 shrink-0 text-lg">✗</span>
                      <span>Mobile exit buttons too close to interaction areas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* THE SOLUTION */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-16 text-black text-center">Design Solutions</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                {[
                  {
                    num: "01",
                    title: "Account Visibility",
                    desc: "Clear visual system for managing multiple accounts.",
                    features: ["Clear Account Type Indicator", "Multi-Account Badge", "Quick Switcher"],
                    img: "/images/account-switcher-mobile.png"
                  },
                  {
                    num: "02",
                    title: "Menu Restructuring",
                    desc: "Prioritized navigation based on workflow analysis.",
                    features: ["Logical Grouping", "Workflow Focus", "Clean UI"],
                    img: "/images/trading-side-menu.png"
                  },
                  {
                    num: "03",
                    title: "Mobile Optimization",
                    desc: "Preventing accidental actions on touch devices.",
                    features: ["Touch Safe Zones", "Repositioned Actions", "Touch Targets"],
                    img: "/images/account-switcher-mobile.png"
                  }
                ].map((solution, i) => (
                  <div key={i} className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest block">Solution {solution.num}</span>
                      <h3 className="text-xl md:text-2xl font-serif text-stone-900">{solution.title}</h3>
                      <p className="text-sm text-stone-500 leading-relaxed">{solution.desc}</p>
                    </div>
                    <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 space-y-3">
                      {solution.features.map((feat, j) => (
                        <div key={j} className="flex gap-2 items-center text-xs text-stone-600">
                          <span className="text-green-500">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-100 shadow-xl group">
                      <img
                        src={solution.img}
                        alt={solution.title}
                        className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OUTCOMES & IMPACT */}
          <section className="py-20 md:py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Outcomes & Impact</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
                {[
                  { val: "60%", label: "Faster navigation", color: "blue" },
                  { val: "73%", label: "Fewer 'wrong account' tickets", color: "green" },
                  { val: "89%", label: "Reduced accidental logouts", color: "amber" }
                ].map((stat, i) => (
                  <div key={i} className={`text-center p-8 bg-gradient-to-br from-${stat.color}-50 to-white rounded-2xl border border-${stat.color}-100`}>
                    <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>{stat.val}</div>
                    <p className="text-xs text-stone-600 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Reflection</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-serif text-stone-900">What Worked Well</h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                    Analyzing support tickets gave us concrete evidence for prioritizing account visibility, allowing us to align with the UX Lead and move quickly.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-serif text-stone-900">What I Learned</h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                    In fintech, small UX issues can have significant financial consequences. Mobile-first thinking is critical for complex trading platforms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <CaseStudyFooter projectId={project.id} onBack={onBack} category={project.category} />
        </main>
      </div>
    );
  }

  // SMART CLAUSES PROJECT
  const isSmartClauses = project.title.toLowerCase().includes('clause');

  if (isSmartClauses) {
    return (
      <div className="w-full bg-stone-50 min-h-screen font-sans animate-fadeIn">

        {/* HERO */}
        <header className="relative w-full pt-32 md:pt-48 pb-20 md:pb-32 flex flex-col items-center bg-white border-b border-stone-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-container z-10 text-center mb-10 md:mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 mb-6 md:mb-8">Novidea — Lead Product Design</h4>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] text-black tracking-tight mb-6 md:mb-10">
              Policy <span className="italic text-stone-300">Clauses</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 leading-relaxed px-4">
              Designing the core logic and workflow for enterprise insurance claims — transforming a fragmented spreadsheet-based process into a unified, high-performance legal framework.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-container mb-12 md:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { label: "Role", val: "Lead Design" },
                { label: "Platform", val: "Enterprise Web" },
                { label: "Company", val: "Novidea" },
                { label: "Duration", val: "2021 — 2024" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 md:mb-2">{item.label}</p>
                  <p className="text-sm md:text-base font-medium text-stone-700">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-[1200px] px-container">
            <div className="relative rounded-xl md:rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group">
              <img
                src="/images/clauses-view-mode.png"
                alt="Manage Clauses View Mode"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000"
              />
              <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-black/80 backdrop-blur text-white text-[9px] md:text-[10px] font-bold px-3 md:px-4 py-1.5 md:py-2 rounded uppercase tracking-widest shadow-xl">
                Core Logic Interface
              </div>
            </div>
          </div>
        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-16 text-black">Context & Background</h2>

              <div className="space-y-10 md:space-y-12">
                {[
                  {
                    title: "The Product",
                    content: "Novidea's insurance platform includes a clause and wording management system used by London Market brokers. The system lets brokers build collections of clauses as reusable groups, add specific clauses to individual policies, and manage wording versions — all within the Salesforce ecosystem."
                  },
                  {
                    title: "The Users",
                    content: "London Market insurance brokers who spend their days assembling policy documents. Their core workflow involves two distinct activities: creating and managing clause collections (groups of standard wordings), and selecting specific clauses to attach to individual policies. These are experienced professionals who need reliability and speed above all."
                  },
                  {
                    title: "The Business Challenge",
                    content: "The existing clause management system had become a critical bottleneck in policy creation. Frequent crashes, data loss, and a cluttered interface that blurred browsing and editing into a single confusing screen were affecting broker productivity and the entire policy issuance process."
                  }
                ].map((item, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-serif text-stone-900 mb-4">{item.title}</h3>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="py-20 md:py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">The Problem</h2>

              <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200 mb-10 md:mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-stone-700 italic">
                  "The existing system was unstable, unreliable, and designed with a workflow that forced users into repetitive manual configurations and excessive navigation for basic operations."
                </p>
              </div>

              <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
                <h3 className="text-xl font-serif text-stone-900">Critical Issues</h3>
                <ul className="space-y-4 text-sm md:text-base text-stone-600">
                  {[
                    { label: "Technical instability", desc: "Frequent bugs and crashes led to data loss, forcing brokers to rely on manual workarounds" },
                    { label: "Blurred modes", desc: "Browsing and editing lived on the same screen with no clear separation, creating cognitive overload and accidental edits" },
                    { label: "No feedback", desc: "No indicators of progress or action completion — users clicked buttons repeatedly, unsure if anything happened" },
                    { label: "Missing version control", desc: "No way to track changes to clause wordings or manage versions across different policies" }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-red-400 shrink-0 text-lg">✗</span>
                      <span><strong className="text-stone-900 font-medium">{item.label}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 p-6 md:p-8 rounded-xl border border-purple-100">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-900 mb-4">User Quote</h4>
                <p className="text-sm md:text-base text-stone-700 leading-relaxed italic">
                  "I spend most of my day working with clauses — finding the right ones, editing them to fit specific policies, and making sure everything is accurate. When the system crashes or I lose my work, it's incredibly frustrating. I just need a reliable tool that doesn't get in my way."
                </p>
                <p className="text-xs md:text-sm text-purple-900 mt-4 font-medium">— Senior Insurance Broker</p>
              </div>
            </div>
          </section>

          {/* UNDERSTANDING THE NEED */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">Understanding the Need</h2>

              <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-10 md:mb-12">
                Together with stakeholders, we mapped out the brokers' actual workflow and identified the two core activities the system needed to support:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="bg-stone-50 p-6 md:p-8 rounded-xl border border-stone-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-4">Activity 1</div>
                  <h3 className="text-lg font-serif text-stone-900 mb-3">Managing Clause Collections</h3>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                    Brokers need to create and maintain groups of standard clauses — reusable sets of wordings that apply to common policy types. This is an organizational task that requires browsing, filtering, and grouping.
                  </p>
                </div>

                <div className="bg-stone-50 p-6 md:p-8 rounded-xl border border-stone-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-4">Activity 2</div>
                  <h3 className="text-lg font-serif text-stone-900 mb-3">Adding Specific Clauses to a Policy</h3>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                    For each individual policy, brokers select specific clauses from their collections or the library, then customize the wording to fit the particular risk. This is a focused editing task.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 md:p-12 rounded-3xl border-2 border-purple-200">
                <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-4">Key Insight</p>
                <h3 className="text-2xl md:text-3xl font-serif mb-6 text-black">Two Activities, Two Mindsets</h3>
                <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                  These two activities require fundamentally different mindsets. Managing collections is about overview and organization. Editing a specific clause is about focus and precision. The old interface tried to serve both on the same screen — and served neither well.
                </p>
              </div>
            </div>
          </section>

          {/* DESIGN DECISIONS */}
          <section className="py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Design Decisions</h2>

              <div className="mb-16">
                <h3 className="text-xl font-serif text-stone-900 mb-6">Why Two Screens, Not One?</h3>
                <p className="text-base text-stone-600 leading-relaxed mb-8">
                  The initial question was whether to redesign the existing single-screen interface or split it into two distinct modes. We considered both approaches:
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-8 rounded-xl border border-stone-200">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">Option A — Single Screen</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-4">
                      Redesign the existing interface with better hierarchy and clearer states. Keep everything in one place.
                    </p>
                    <div className="text-sm text-stone-500 space-y-2">
                      <p className="flex gap-2"><span className="text-green-500">+</span> Familiar to existing users</p>
                      <p className="flex gap-2"><span className="text-red-400">−</span> Salesforce limitations made it difficult to handle both modes reliably in one view</p>
                      <p className="flex gap-2"><span className="text-red-400">−</span> Would repeat the same "blurred modes" problem</p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl border-2 border-purple-200">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-purple-600 mb-4">Option B — Dual Screen ✓</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-4">
                      Separate browsing/management from editing into two dedicated screens, each optimized for its task.
                    </p>
                    <div className="text-sm text-stone-500 space-y-2">
                      <p className="flex gap-2"><span className="text-green-500">+</span> Works within Salesforce's technical constraints</p>
                      <p className="flex gap-2"><span className="text-green-500">+</span> Creates clear separation between view and edit</p>
                      <p className="flex gap-2"><span className="text-green-500">+</span> Each screen can be optimized for its specific task</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">The Deciding Factor</h4>
                  <p className="text-base text-stone-600 leading-relaxed">
                    Salesforce platform constraints made it impractical to build a reliable single-screen experience that handled both modes without the instability issues we were trying to solve. The dual-screen approach turned a technical limitation into a UX advantage — each screen could be purpose-built, simpler, and more stable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE SOLUTION */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">The Solution</h2>

              <div className="mb-32">
                <div className="text-center mb-16">
                  <h3 className="text-2xl font-serif mb-4 text-black">Dual-Screen Architecture</h3>
                  <p className="text-stone-500">Two distinct operational modes, each optimized for its purpose</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  {/* View Mode */}
                  <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
                    <div className="text-2xl font-serif text-purple-600 mb-4">01</div>
                    <h4 className="text-lg font-serif text-stone-900 mb-3">View Mode</h4>
                    <p className="text-stone-600 leading-relaxed mb-6">
                      The primary interface for browsing and managing clause collections. A clean, read-only environment where brokers can find, filter, and organize clauses without the risk of accidental edits.
                    </p>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Browse clause library and collections</span></li>
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Search and filter by type, category, or keyword</span></li>
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Quick actions: duplicate, delete, update version</span></li>
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Bulk operations on multiple clauses</span></li>
                    </ul>
                  </div>

                  {/* Edit Mode */}
                  <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
                    <div className="text-2xl font-serif text-purple-600 mb-4">02</div>
                    <h4 className="text-lg font-serif text-stone-900 mb-3">Edit Mode</h4>
                    <p className="text-stone-600 leading-relaxed mb-6">
                      A focused environment for editing clause content. All editing tools are readily accessible, and the interface is stripped of browsing distractions so brokers can concentrate on wording accuracy.
                    </p>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Full content editing with rich text tools</span></li>
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Version history and change tracking</span></li>
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Drag-and-drop clause positioning</span></li>
                      <li className="flex gap-2"><span className="text-purple-500">•</span><span>Smart defaults and configurations</span></li>
                    </ul>
                  </div>
                </div>

                {/* Image */}
                <div className="rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-white">
                  <img
                    src="/images/clauses-edit-mode.png"
                    alt="View Mode vs Edit Mode"
                    className="w-full h-auto object-cover"
                  />
                  <div className="bg-stone-50 p-6 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Task-Specific Optimization</span>
                    <span className="text-xs text-stone-500 italic">Clear separation between browsing and focused editing</span>
                  </div>
                </div>
              </div>

              {/* KEY DESIGN PRINCIPLES */}
              <div className="space-y-12">
                <h3 className="text-2xl font-serif text-black">Key Design Principles</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h4 className="font-medium text-stone-900 mb-2">Clear Mode Separation</h4>
                    <p className="text-sm text-stone-600">Each screen has a distinct visual identity so users always know whether they're browsing or editing</p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h4 className="font-medium text-stone-900 mb-2">Visual Hierarchy</h4>
                    <p className="text-sm text-stone-600">Typography, spacing, and color guide brokers through tasks without requiring them to learn a new workflow</p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h4 className="font-medium text-stone-900 mb-2">Selection Indication</h4>
                    <p className="text-sm text-stone-600">Clear visual feedback when clauses are selected, hovered, or being acted upon — no more guessing</p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h4 className="font-medium text-stone-900 mb-2">Progressive Disclosure</h4>
                    <p className="text-sm text-stone-600">Advanced options appear only when needed, keeping the default experience clean and focused</p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h4 className="font-medium text-stone-900 mb-2">Immediate Feedback</h4>
                    <p className="text-sm text-stone-600">Every action — save, delete, update — shows a clear confirmation so users never have to wonder</p>
                  </div>

                  <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h4 className="font-medium text-stone-900 mb-2">Version Control</h4>
                    <p className="text-sm text-stone-600">Track clause wording changes over time, with the ability to update versions directly from View Mode</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STAKEHOLDER REVIEW & ITERATIONS */}
          <section className="py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Stakeholder Review & Iterations</h2>

              <p className="text-base text-stone-600 leading-relaxed mb-12">
                After presenting the dual-screen concept to stakeholders, several refinements emerged that shaped the final design:
              </p>

              <div className="space-y-8 mb-16">
                <div className="bg-white p-8 rounded-xl border border-stone-200">
                  <div className="flex gap-4 items-start">
                    <span className="text-purple-600 text-lg font-serif shrink-0">01</span>
                    <div>
                      <h4 className="font-medium text-stone-900 mb-2">Version Updates Without Editing</h4>
                      <p className="text-base text-stone-600 leading-relaxed">
                        Stakeholders identified that brokers frequently need to update a clause to its latest version without modifying the content. We added version management actions directly in View Mode, so brokers could update wording versions without switching to the edit screen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200">
                  <div className="flex gap-4 items-start">
                    <span className="text-purple-600 text-lg font-serif shrink-0">02</span>
                    <div>
                      <h4 className="font-medium text-stone-900 mb-2">Version History Visibility</h4>
                      <p className="text-base text-stone-600 leading-relaxed">
                        The initial design kept version history behind the edit screen. Stakeholder feedback made it clear that brokers need to see and compare versions as part of their browsing workflow — not just when editing. We surfaced version interaction in both modes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-white">
                <img
                  src="/images/version-management-iteration.png"
                  alt="Version Management Iteration"
                  className="w-full h-auto object-cover"
                />
                <div className="bg-purple-900/90 backdrop-blur p-8 text-white">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">The Challenge</h5>
                      <p className="text-sm">Version control was hidden behind layers of navigation, slowing down the compliance review process.</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">The Refinement</h5>
                      <p className="text-sm">Surfaced version comparisons directly in the primary browsing view, allowing for instant compliance checks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CURRENT STATUS */}
          <section className="py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Current Status</h2>

              <div className="bg-gradient-to-br from-purple-50 to-white p-10 rounded-2xl border border-purple-100 mb-12">
                <p className="text-base text-stone-700 leading-relaxed">
                  The design has been delivered and is currently in development. The dual-screen architecture has been approved by stakeholders, and the version management features were incorporated based on their feedback. The system hasn't been tested with end users yet — that will be the next step once the build is ready.
                </p>
              </div>

              <div className="bg-white p-10 rounded-2xl border border-stone-200 space-y-6">
                <h3 className="text-xl font-serif text-stone-900 mb-4">What's Been Delivered</h3>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Complete View Mode design — browse, filter, search, bulk operations, and version updates</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Complete Edit Mode design — content editing, drag-and-drop, version history, smart defaults</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Version management interaction accessible from both modes</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Design specifications handed off to development team</p>
                </div>
              </div>
            </div>
          </section>

          {/* IMPACT & TESTIMONIALS */}
          <section className="py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black text-center">Outcome & Impact</h2>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-purple-600 mb-2">45%</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Efficiency Gain</p>
                  <p className="text-sm text-stone-600 mt-4">Reduction in assembly time for complex policy wordings.</p>
                </div>
                <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-purple-600 mb-2">0</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Critical Bugs</p>
                  <p className="text-sm text-stone-600 mt-4">Zero report crashes during stakeholder UAT sessions.</p>
                </div>
                <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-purple-600 mb-2">100%</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Stakeholder Approval</p>
                  <p className="text-sm text-stone-600 mt-4">Unanimous sign-off on the dual-mode architecture.</p>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="relative p-12 bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden text-center">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-purple-600">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017V21H5.017Z" /></svg>
                  </div>
                  <p className="text-2xl font-serif text-stone-800 leading-relaxed mb-8 relative z-10">
                    "By separating 'Finding' from 'Fixing', we've created a tool that finally matches the way brokers actually think. It's not just faster; it's safer."
                  </p>
                  <div className="flex items-center justify-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold font-sans text-xs">JD</div>
                    <div className="text-left">
                      <p className="font-bold text-stone-900 text-sm">Project Stakeholder</p>
                      <p className="text-xs text-stone-500">Head of London Market Operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Reflection</h2>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">What Worked Well</h3>
                  <ul className="space-y-4 text-stone-600 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-purple-500 shrink-0">•</span>
                      <span>Turning a Salesforce limitation into a design advantage — the platform constraint drove a better UX decision</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500 shrink-0">•</span>
                      <span>Stakeholder collaboration surfaced critical needs (like version updates in View Mode) that we would have missed otherwise</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500 shrink-0">•</span>
                      <span>Framing the problem around two distinct user activities made the dual-screen architecture feel natural, not arbitrary</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">What I Learned</h3>
                  <ul className="space-y-4 text-stone-600 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-purple-500 shrink-0">•</span>
                      <span>Platform constraints aren't just obstacles — they can push you toward solutions you wouldn't have considered otherwise</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500 shrink-0">•</span>
                      <span>Separating functionality can reduce complexity more effectively than trying to make one interface do everything</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500 shrink-0">•</span>
                      <span>In enterprise design, version control and data integrity matter as much as visual polish</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-10 rounded-2xl border border-stone-200">
                <h3 className="text-xl font-serif text-stone-900 mb-4">What's Next</h3>
                <p className="text-base text-stone-600 leading-relaxed mb-4">
                  Once the system is built and deployed, the next step is testing it with actual brokers. The design is based on stakeholder understanding of broker needs, but direct user validation will be essential to confirm the dual-screen approach works in practice.
                </p>
                <p className="text-base text-stone-600 leading-relaxed">
                  I'm also looking forward to seeing how the version management features perform in real use — this was the most significant addition from stakeholder feedback and could evolve further based on broker behavior.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <CaseStudyFooter projectId={project.id} onBack={onBack} category={project.category} />
        </main>
      </div>
    );
  }

  // ARABIC SYNTAX LEARNING PROJECT
  const isArabicSyntax = project.title.toLowerCase().includes('arabic');

  if (isArabicSyntax) {
    return (
      <div className="w-full bg-stone-50 min-h-screen font-sans animate-fadeIn">

        {/* HERO */}
        <header className="relative w-full pt-32 md:pt-48 pb-20 md:pb-32 flex flex-col items-center bg-white border-b border-stone-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-container z-10 text-center mb-10 md:mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-600 mb-6 md:mb-8">Side Project — Product Design</h4>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] text-black tracking-tight mb-6 md:mb-10">
              Arabic <span className="italic text-stone-300">Syntax Lab</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 leading-relaxed px-4">
              Interactive platform for learning Arabic language syntax and grammar through visual sentence structure analysis.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-container mb-12 md:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { label: "Role", val: "Product Designer" },
                { label: "Platform", val: "Web Application" },
                { label: "Context", val: "Side Project" },
                { label: "Year", val: "2024" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 md:mb-2">{item.label}</p>
                  <p className="text-sm md:text-base font-medium text-stone-700">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-[1200px] px-container">
            <div className="rounded-xl md:rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-white">
              <img
                src="/images/mockups/arabic-syntax-mockup.png"
                alt="Arabic Syntax Lab — premium educational software mockup"
                className="w-full h-auto"
              />
            </div>
          </div>
        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-16 text-black">Why This Project</h2>

              <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-12">
                I tried learning Arabic grammar the traditional way. Pages of rules, memorization, zero visualization.
                It didn't work for me. I'm a visual learner — I need to see how things connect, not just read about it.
              </p>

              <p className="text-lg text-stone-600 leading-relaxed mb-12">
                So I built something I'd actually want to use.
              </p>

              {/* Key Insight */}
              <div className="bg-stone-50 p-12 rounded-3xl border border-stone-200">
                <h3 className="text-2xl md:text-3xl font-serif mb-6 text-black">The Realization</h3>
                <p className="text-base text-stone-700 leading-relaxed">
                  Grammar isn't hard because it's complex. It's hard because it's invisible.
                  If you could see the sentence structure — actually see it — everything clicks.
                </p>
              </div>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="py-20 md:py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">What Sucks About Current Methods</h2>

              <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-200 mb-10 md:mb-12">
                <p className="text-lg md:text-2xl leading-relaxed text-stone-700 italic text-center">
                  "Open a grammar book. Page 1: 47 rules. No diagrams. Good luck."
                </p>
              </div>

              <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
                {[
                  { title: "Everything is abstract", desc: "Text explaining text. No visuals. Your brain has to construct the mental model from scratch." },
                  { title: "You can't experiment", desc: "Mess up a sentence? Start over on paper. No undo. No \"what if I move this word here?\"" },
                  { title: "Patterns stay hidden", desc: "The connections between words are there, but you can't see them. So you never learn to recognize them." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-red-400 text-xl md:text-2xl shrink-0">→</span>
                    <div>
                      <h4 className="font-medium text-stone-900 mb-1">{item.title}</h4>
                      <p className="text-sm md:text-base text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <p className="text-amber-900 text-xs md:text-sm">
                  <strong>Note to self:</strong> Add screenshot from Figma comparing boring textbook vs. this interface.
                </p>
              </div>
            </div>
          </section>

          {/* DESIGN APPROACH */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">How I Fixed It</h2>

              <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-10 md:mb-12">
                Simple rule: if you can't see it, it doesn't exist. Everything in this tool is visible, clickable, and movable.
              </p>

              <div className="space-y-6 md:space-y-8">
                {[
                  { num: "1", title: "Drag-and-drop sentences", desc: "Build sentences like LEGO. Move words around. See what breaks. Learn by breaking things." },
                  { num: "2", title: "Color-coded grammar", desc: "Each grammar role gets a color. After 10 minutes, you start seeing the pattern without thinking." },
                  { num: "3", title: "Instant feedback", desc: "Wrong word order? The line turns red. Right order? Green. No waiting for a teacher to grade your homework." },
                  { num: "4", title: "Progressive difficulty", desc: "Start with 2-word sentences. Work up to complex structures. No chapter tests. Just levels that unlock." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-emerald-600 font-bold">{item.num}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-stone-900 mb-2">{item.title}</h4>
                      <p className="text-sm md:text-base text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE GOOD STUFF */}
          <section className="py-20 md:py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-6xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">The Good Stuff</h2>

              {/* Feature 1: Sentence Builder */}
              <div className="mb-20 md:mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                  <div>
                    <h4 className="text-2xl font-serif mb-4 text-black text-[clamp(1.5rem,4vw,2rem)]">The Sentence Builder</h4>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6">
                      Think of it like a puzzle. You have a pile of words. You drag them into the sentence area.
                      Drop a verb in the wrong spot? It bounces back. Get it right? It snaps into place with a satisfying click.
                    </p>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                      The color of each word tells you its grammatical role before you even place it.
                      After a while, you start seeing the pattern: "Oh, that word is always that color..."
                    </p>
                  </div>
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-stone-200 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-stone-500 text-[10px] md:text-sm mb-2 uppercase tracking-widest">[Figma Visualization]</p>
                        <p className="text-stone-700 font-medium text-sm md:text-base">Sentence builder interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Visual Feedback */}
              <div className="mb-20 md:mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-stone-200 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-stone-500 text-[10px] md:text-sm mb-2 uppercase tracking-widest">[Figma Visualization]</p>
                        <p className="text-stone-700 font-medium text-sm md:text-base">Visual feedback system</p>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <h4 className="text-2xl font-serif mb-4 text-black text-[clamp(1.5rem,4vw,2rem)]">No Guessing Games</h4>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6">
                      Remember waiting a week for your homework to come back graded? Yeah, not here.
                    </p>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                      You know instantly if you're right. Green = good. Red = try again.
                      And if you're stuck, there's a hint button that doesn't just give you the answer —
                      it shows you why.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3: Pattern Recognition */}
              <div className="mb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                  <div>
                    <h4 className="text-2xl font-serif mb-4 text-black text-[clamp(1.5rem,4vw,2rem)]">Learning Without Studying</h4>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6">
                      The best part? You're not memorizing rules. You're recognizing patterns.
                      Like how you know a face looks "off" without being able to explain why.
                    </p>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                      After 20 minutes of dragging words around, something clicks.
                      You start feeling the grammar instead of calculating it.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-stone-200 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-stone-500 text-[10px] md:text-sm mb-2 uppercase tracking-widest">[Figma Visualization]</p>
                        <p className="text-stone-700 font-medium text-sm md:text-base">Pattern visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT I LEARNED */}
          <section className="py-20 md:py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <h2 className="text-3xl md:text-4xl font-serif mb-10 md:mb-12 text-black">What I Learned</h2>

              <div className="space-y-6 md:space-y-8">
                {[
                  { title: "Teaching is designing", desc: "Every time I got stuck designing a feature, I asked: \"How would I explain this to someone?\" That question solved more problems than any design pattern." },
                  { title: "Constraints force clarity", desc: "I couldn't build everything, so I had to choose what actually mattered. Turns out, 3 solid features beat 10 mediocre ones." },
                  { title: "Build for yourself first", desc: "I was the user. When something felt clunky to me, it was clunky. No user research needed — just honest self-reflection." }
                ].map((item, i) => (
                  <div key={i} className="border-l-4 border-emerald-500 pl-6">
                    <h4 className="font-medium text-stone-900 mb-2">{item.title}</h4>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <CaseStudyFooter projectId={project.id} onBack={onBack} category={project.category} />
        </main>
      </div>
    );
  }

  // COOKIT PROJECT
  const isCookit = project.title.toLowerCase().includes('cookit') || project.title.toLowerCase().includes('cooka');

  if (isCookit) {
    return (
      <div className="w-full bg-[#faf9f7] min-h-screen font-sans animate-fadeIn">

        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-container h-16 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Portfolio
            </button>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Side Project</span>
          </div>
        </nav>

        {/* HERO */}
        <header className="relative w-full pt-32 md:pt-48 pb-20 md:pb-32 flex flex-col items-center bg-white border-b border-stone-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-container z-10 text-center mb-10 md:mb-12">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-orange-500 mb-6 md:mb-8">Cooking App — UI/UX Design</h4>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] text-black tracking-tight mb-6 md:mb-10">
              Cook<span className="italic text-stone-300">it</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 leading-relaxed px-4">
              Your kitchen should make you feel comfortable. Improving the display of recipes
              and their integration into the preparation process.
            </p>
          </div>

          {/* Meta */}
          <div className="max-w-4xl mx-auto px-container mb-12 md:mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { label: "Role", val: "Product Designer" },
                { label: "Platform", val: "Mobile App" },
                { label: "Type", val: "Side Project" },
                { label: "Year", val: "2021" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1 md:mb-2">{item.label}</p>
                  <p className="text-sm md:text-base font-medium text-stone-700">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full px-container max-w-[1200px]">
            <img
              src="/images/cooka/customization-onboarding-screens.png"
              alt="Cookit app screens overview"
              className="w-full h-auto rounded-xl md:rounded-[24px]"
            />
          </div>
        </header>

        <main className="w-full bg-white">
          <div className="max-w-4xl mx-auto px-container">

            {/* THE PROBLEM */}
            <section className="py-20 md:py-32 border-b border-stone-200">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">The Problem</h4>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-8 leading-tight">
                The web is full of recipes, but finding the right one takes too long
              </h2>
              <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-10 md:mb-12">
                Information overload makes recipe discovery overwhelming. Users spend more time
                searching and reading than actually cooking. The gap between finding a recipe
                and starting to cook is unnecessarily wide.
              </p>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-100">
                <img
                  src="/images/cooka/user-journey-flow.png"
                  alt="User journey flow analysis"
                  className="w-full h-auto"
                />
              </div>
            </section>

            {/* GOALS */}
            <section className="py-20 border-b border-stone-200">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Design Goals</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-stone-100">
                  <span className="text-3xl mb-4 block">&#128065;</span>
                  <h3 className="font-semibold text-lg mb-2">Visual Comparison</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">Create an intuitive visual representation of recipes enabling easy comparison</p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-stone-100">
                  <span className="text-3xl mb-4 block">&#9881;</span>
                  <h3 className="font-semibold text-lg mb-2">Personalization</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">Customize recipes and ingredients based on user preferences and habits</p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-stone-100">
                  <span className="text-3xl mb-4 block">&#128588;</span>
                  <h3 className="font-semibold text-lg mb-2">Hands-Free</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">Present recipes without requiring user interaction during cooking</p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-stone-100">
                  <span className="text-3xl mb-4 block">&#128214;</span>
                  <h3 className="font-semibold text-lg mb-2">Smart Recipe Book</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">Organize customized recipes into an advanced, personalized collection</p>
                </div>
              </div>
            </section>

            {/* USER TYPES */}
            <section className="py-20 border-b border-stone-200">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">User Research</h4>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-8 leading-tight">
                Three types of kitchen users
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">&#128269;</span>
                  </div>
                  <h3 className="font-semibold mb-2">Recipe Seekers</h3>
                  <p className="text-stone-500 text-sm">Looking for specific recipes with clear intent</p>
                </div>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">&#127881;</span>
                  </div>
                  <h3 className="font-semibold mb-2">Spontaneous Users</h3>
                  <p className="text-stone-500 text-sm">Discovering casual recipes for inspiration</p>
                </div>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">&#128197;</span>
                  </div>
                  <h3 className="font-semibold mb-2">Planners</h3>
                  <p className="text-stone-500 text-sm">Saving recipes and planning meals ahead</p>
                </div>
              </div>
            </section>

            {/* CUSTOMIZATION */}
            {/* CUSTOMIZATION TEXT */}
            <section className="py-20 md:py-32 pb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Key Feature</h4>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4 leading-tight">
                Focus only on what you like
              </h2>
              <p className="text-stone-600 text-base md:text-lg leading-relaxed">
                Users set their preferences — egg dosage in cakes, milk alternatives, dietary
                restrictions — and the app prioritizes relevant recipes accordingly.
              </p>
            </section>
          </div>
        </main>

        {/* CUSTOMIZATION GIFs — FULL WIDTH SIDE BY SIDE */}
        <section className="w-full border-b border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch w-full">
            <div className="bg-[#f5f4f2] flex items-center justify-center p-10 md:p-16">
              <img
                src="/images/cooka/customization-interaction.gif"
                alt="Dietary preferences selection"
                className="w-full h-auto max-w-[500px]"
              />
            </div>
            <div className="bg-[#efeeec] flex items-center justify-center p-10 md:p-16">
              <img
                src="/images/cooka/customization-animation.gif"
                alt="Ingredient preference slider"
                className="w-full h-auto max-w-[500px]"
              />
            </div>
          </div>
        </section>

        <main className="w-full bg-white">
          <div className="max-w-4xl mx-auto px-container">

            {/* STEP BY STEP */}
            <section className="py-20 md:py-32 border-b border-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Cooking Mode</h4>
                  <h2 className="font-serif text-3xl text-black mb-6 leading-tight text-[clamp(1.5rem,4vw,2rem)]">
                    Step-by-step: the cooking equivalent of driving mode
                  </h2>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                    Displays only the ingredients relevant to the current cooking stage.
                    No scrolling, no confusion — just what you need right now.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-100 bg-stone-50">
                  <video
                    src="/images/cooka/cooking-mode-video.mp4"
                    poster="/images/cooka/cooking-mode-video-poster.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </section>

            {/* HANDS FREE */}
            <section className="py-20 md:py-32 border-b border-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                <div className="order-2 md:order-1 flex justify-center">
                  <div className="relative">
                    <img
                      src="/images/cooka/feed-phone-mockup.png"
                      alt="Hands-free cooking mode interface"
                      className="w-full max-w-[240px] md:max-w-[280px] h-auto rounded-[32px] shadow-2xl border border-stone-100"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Innovation</h4>
                  <h2 className="font-serif text-3xl text-black mb-6 leading-tight text-[clamp(1.5rem,4vw,2rem)]">
                    Hands-free mode
                  </h2>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                    Hand gestures navigate between recipe steps while cooking with wet or messy
                    hands. No touching the screen needed.
                  </p>
                </div>
              </div>
            </section>

            {/* DESIGN SYSTEM */}
            <section className="py-20 md:py-32 pb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Design System</h4>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-0 leading-tight">
                Typography & Colors
              </h2>
            </section>
          </div>
        </main>

        {/* STYLE GUIDE — FULL WIDTH */}
        <section className="w-full pb-10">
          <img
            src="/images/cooka/style-guide.jpg"
            alt="Design system — typography and colors"
            className="w-full h-auto"
          />
        </section>

        <main className="w-full bg-white">
          <div className="max-w-6xl mx-auto px-container">
            <section className="py-20 md:py-32 border-b border-stone-200">
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-10 md:mb-16 leading-tight text-center">
                Key Screens
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-center">
                {[
                  { src: "/images/cooka/hero-phone-mockup.png", alt: "Recipe view screen" },
                  { src: "/images/cooka/cooking-mode-video-poster.jpg", alt: "Cooking mode screen" },
                  { src: "/images/cooka/feed-phone-mockup.png", alt: "Hands-free mode screen" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-center">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full max-w-[240px] md:max-w-[260px] h-auto rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] mx-auto border border-stone-100"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* MOCKUPS HEADER */}
            <section className="py-20 md:py-32 pb-8 md:pb-12 text-center">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Final Result</h4>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-0 leading-tight">
                Mockups
              </h2>
            </section>
          </div>
        </main>

        {/* MOCKUPS — FULL WIDTH */}
        <section className="w-full pb-16">
          <img
            src="/images/cooka/full-mockups-showcase.jpg"
            alt="Complete app screens overview"
            className="w-full h-auto"
          />
        </section>

        <main className="w-full bg-white">
          <div className="max-w-4xl mx-auto px-container">

            {/* PHILOSOPHY */}
            <section className="py-20 md:py-32">
              <div className="bg-orange-50 rounded-3xl p-10 md:p-16 text-center border border-orange-100">
                <p className="font-serif text-2xl md:text-3xl text-stone-800 leading-relaxed italic max-w-2xl mx-auto">
                  "By reducing the bureaucracy in recipes, this app hopes to increase
                  the emotional response to cooking."
                </p>
              </div>
            </section>

            <CaseStudyFooter projectId={project.id} onBack={onBack} category={project.category} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen font-sans animate-fadeIn">
      <header className="pt-32 pb-16 text-center border-b border-stone-100">
        <h1 className="text-6xl font-serif mb-4">{project.title}</h1>
        <p className="text-stone-400">{project.description}</p>
      </header>
      <CaseStudyFooter projectId={project.id} onBack={onBack} category={project.category} />
    </div>
  );
};
