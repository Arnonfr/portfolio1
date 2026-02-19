
import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { UiTransformation } from './UiTransformation';
import { ClaimStatisticsForm } from './ClaimStatisticsForm';
import { LegacyTransformationVisualizer } from './LegacyTransformationVisualizer';
import { CaseStudyFooter } from './CaseStudyFooter';


interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

import { ProjectHeader } from './ProjectHeader';

export const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isClaimMovement = project.title.toLowerCase().includes('claim');
  const [hoveredStep, setHoveredStep] = useState(0);

  if (isClaimMovement) {
    return (
      <div className="w-full bg-white min-h-screen font-sans animate-fadeIn">

        {/* HERO */}
        <ProjectHeader
          title="Claim"
          subtitle="Movements"
          description="Redesigning the workflow for processing insurance claim settlements — from six fragmented screens to one unified modal."
          role="Product Designer"
          platform="Salesforce"
          company="Novidea"
          year="2023"
          imageSrc="/images/claim-movement-modal-body.png"
          imageAlt="Claim Movements — New Unified Modal with all 4 sections"
          topLabel="Novidea — Product Design"
          topLabelColorClass="text-blue-600"
        />

        <main className="w-full bg-white">

          {/* CONTEXT */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-5">The Challenge</p>
                  <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black leading-snug">Insurance claims are complex, multi-party legal events</h2>
                  <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                    Within the London Market, a "movement" is a financial settlement instruction — potentially spanning multiple currencies, payees, and carriers. The existing system required brokers to navigate six separate Salesforce screens to complete a single movement.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-5">My Role</p>
                  <h2 className="text-2xl md:text-3xl font-serif mb-6 text-black leading-snug">End-to-end product design</h2>
                  <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                    I owned the full design process — from mapping the existing workflow with the PM and engineering team, through wireframes and prototyping, to the final Salesforce-native implementation. The core challenge was understanding the legal and financial mechanics well enough to simplify them.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE OLD PROCESS */}
          <section className="py-20 md:py-32 bg-stone-950 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-container">
              <div className="mb-12 md:mb-16">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-5">Before</p>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight max-w-xl">Six screens. One by one. Repeated per currency.</h2>
                <p className="text-stone-400 text-base leading-relaxed max-w-2xl">
                  The old process forced brokers to first create a "Claim Statistics" record for each currency combination — a separate 20-field form per currency — before they could even begin entering payee or carrier data. Each payee and carrier was then added via a separate popup, one at a time.
                </p>
              </div>

              {(() => {
                const steps = [
                  { step: "01", label: "Create movement", note: "New Salesforce record", image: "/images/claim-movement-old-step-1.png" },
                  { step: "02", label: "Create statistics", note: "20+ fields × per currency", image: "/images/claim-movement-old-step-2.png" },
                  { step: "03", label: "Add payees", note: "Popup × per payee", image: "/images/claim-movement-old-step-3.png" },
                  { step: "04", label: "Add carriers", note: "Popup × per carrier", image: "/images/claim-movement-old-step-4.png" },
                  { step: "05", label: "Review totals", note: "Separate summary screen", image: "/images/claim-movement-old-step-5.png" },
                  { step: "06", label: "Complete", note: "6 screens later", image: "/images/claim-movement-old-step-5.png" },
                ];
                return (
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    {/* Steps list */}
                    <div className="flex flex-col gap-2 w-full md:w-72 shrink-0">
                      {steps.map((s, i) => (
                        <div
                          key={i}
                          className={`border rounded-xl p-4 flex items-start gap-4 cursor-default transition-all duration-200 ${hoveredStep === i
                            ? 'border-stone-500 bg-stone-900'
                            : 'border-stone-800 hover:border-stone-700'
                            }`}
                          onMouseEnter={() => setHoveredStep(i)}
                        >
                          <span className={`font-mono text-xs shrink-0 mt-0.5 transition-colors ${hoveredStep === i ? 'text-stone-300' : 'text-stone-600'}`}>{s.step}</span>
                          <div>
                            <p className={`text-sm font-medium mb-0.5 transition-colors ${hoveredStep === i ? 'text-white' : 'text-stone-300'}`}>{s.label}</p>
                            <p className="text-stone-500 text-xs">{s.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Preview image */}
                    <div className="flex-1 rounded-xl overflow-hidden border border-stone-800 hidden md:block">
                      <img
                        key={hoveredStep}
                        src={steps[hoveredStep].image}
                        alt={steps[hoveredStep].label}
                        className="w-full h-auto block animate-fadeIn"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Old user flow diagram */}
              <div className="mt-12 md:mt-16">
                <p className="text-stone-600 text-xs uppercase tracking-widest mb-4 text-center">Old user flow</p>
                <div className="rounded-2xl overflow-hidden border border-stone-800">
                  <img src="/images/claim-flow-old.png" alt="Old user flow — branching across currencies, payees, and carriers" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* KEY INSIGHT */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-container">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-5">Key Insight</p>
              <h2 className="text-3xl md:text-4xl font-serif mb-10 text-black leading-snug max-w-2xl">
                Users don't create "statistics".<br />They settle claims.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-14 md:mb-20">
                <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                  The "Claim Statistics" concept was an internal database abstraction — not a real user task. By working closely with the PM and engineering team, we confirmed we could eliminate this layer entirely and handle currency combinations automatically in the background.
                </p>
                <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                  This single realization unlocked the entire redesign. Instead of redesigning six screens, we could collapse them into one modal — letting the system handle the complexity that was previously pushed onto the user.
                </p>
              </div>

              {/* Simplified flow — after */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">Simplified flow</p>
                <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                  <img src="/images/claim-flow-new.png" alt="New simplified user flow" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* THE SOLUTION */}
          <section className="py-20 md:py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-6xl mx-auto px-container">
              <div className="mb-16 md:mb-20">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-5">The Solution</p>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-black">One modal. Four sections. Everything in context.</h2>
                <p className="text-stone-500 text-base max-w-2xl leading-relaxed">
                  The new "New Movement" modal consolidates the entire workflow: movement metadata, payee transactions, carrier transactions, and a live financial summary — all without leaving the screen.
                </p>
              </div>

              {/* Full modal showcase */}
              <div className="rounded-2xl md:rounded-[28px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-stone-200 bg-stone-50 mb-16 md:mb-24">
                <img
                  src="/images/claim-movement-modal-body.png"
                  alt="New Movement modal — unified interface"
                  className="w-full h-auto"
                />
              </div>

              {/* 3 key design decisions */}
              {[
                {
                  num: "01",
                  title: "Movement Information",
                  desc: "A single collapsible section handles movement type, section classification, additional details, and reporting flags. Replaced a dedicated creation screen.",
                  img: "/images/claim-movement-section-info.png",
                  alt: "Movement Information section",
                  left: true,
                },
                {
                  num: "02",
                  title: "Inline Payee & Carrier Transactions",
                  desc: "Both payees and carriers are managed as inline table rows — with per-row actions (duplicate, add, delete) built into the interface. No more popups. No more context-switching.",
                  img: "/images/claim-movement-section-payee.png",
                  alt: "Payee Transactions table with inline row actions",
                  left: false,
                },
                {
                  num: "03",
                  title: "Multi-Currency Summary with Tabs",
                  desc: "Instead of creating a separate statistics record per currency, the Summary section uses tabs to show financial breakdowns per currency pair. The system auto-detects currencies from the claim context.",
                  img: "/images/claim-movement-section-summary.png",
                  alt: "Summary section with USD and GBP currency tabs",
                  left: true,
                },
                {
                  num: "04",
                  title: "Efficiency Focused Actions",
                  desc: "Common tasks like duplicating a row or adding new entries are accessible via quick-action icons, significantly reducing the average time to complete a movement.",
                  img: "/images/action-buttons-feature.png",
                  alt: "Inline action buttons for duplicate and add",
                  left: false,
                },
              ].map((item, i) => (
                <div key={i} className={`mb-20 md:mb-32 ${i === 3 ? 'mb-0' : ''}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className={`lg:col-span-4 ${item.left ? '' : 'lg:order-2'}`}>
                      <span className="text-blue-500 font-mono font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">{item.num}</span>
                      <h3 className="text-2xl md:text-3xl font-serif mb-5 text-black leading-tight">{item.title}</h3>
                      <p className="text-stone-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
                    </div>
                    <div className={`lg:col-span-8 ${item.left ? '' : 'lg:order-1'}`}>
                      <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.07)] border border-stone-200 bg-white">
                        <img
                          src={item.img}
                          alt={item.alt}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BEFORE / AFTER */}
          <section className="py-20 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-container">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-5">Before vs After</p>
              <h2 className="text-3xl md:text-4xl font-serif mb-14 text-black">The same task. Radically simplified.</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500">Before</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                    <img src="/images/claim-movement-old-interface-1.png" alt="Old Claim Statistics screen" className="w-full h-auto" />
                  </div>
                  <ul className="mt-5 space-y-2">
                    {['6 screens', 'Separate record per currency', 'Popup per payee, per carrier', 'No summary until end'].map((t, i) => (
                      <li key={i} className="flex gap-2 items-center text-sm text-stone-400">
                        <span className="text-red-400 text-xs">×</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">After</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-50">
                    <img src="/images/claim-movement-modal-body.png" alt="New unified modal" className="w-full h-auto" />
                  </div>
                  <ul className="mt-5 space-y-2">
                    {['1 modal', 'Currency handled automatically', 'Inline rows, no popups', 'Live summary always visible'].map((t, i) => (
                      <li key={i} className="flex gap-2 items-center text-sm text-stone-500">
                        <span className="text-emerald-500 text-xs">✓</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* OUTCOMES & IMPACT */}
          <section className="py-20 md:py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-container">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-5">Outcomes</p>
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Shipped and adopted</h2>

              <div className="space-y-4 mb-16">
                {[
                  "Successfully launched to production and adopted by the broker team",
                  "Positive feedback on day one — brokers found the flow intuitive without onboarding",
                  "Support tickets related to claim movements dropped significantly",
                  "The modal pattern was adopted as a template for other financial modules"
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-start py-4 border-b border-stone-200 last:border-0">
                    <span className="text-emerald-500 shrink-0 text-sm">✓</span>
                    <p className="text-stone-700 text-sm md:text-base">{text}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { label: "Screens consolidated", val: "6 → 1" },
                  { label: "Statistics step eliminated", val: "0" },
                  { label: "Team adoption", val: "Full" }
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
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-5">Reflection</p>
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">What I learned</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12">
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-4">What worked</p>
                  <ul className="space-y-4 text-stone-600 text-sm md:text-base leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-blue-400 shrink-0">—</span>
                      <span>Challenging the premise. The statistics step was accepted as "just how it works" — questioning it unlocked the entire redesign.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 shrink-0">—</span>
                      <span>Working closely with PM and engineers early to validate feasibility before committing to a direction.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 shrink-0">—</span>
                      <span>Designing for the power user. Brokers process dozens of movements per day — every saved click matters at that volume.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-4">What I'd do differently</p>
                  <ul className="space-y-4 text-stone-600 text-sm md:text-base leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-stone-300 shrink-0">—</span>
                      <span>Run structured usability testing with real brokers earlier. Most validation was done through PM proxy — direct user sessions would have caught edge cases sooner.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-stone-300 shrink-0">—</span>
                      <span>Document the old flow more rigorously before starting. Mapping it properly would have revealed more simplification opportunities from the start.</span>
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
                { label: "Role", val: "Product Designer" },
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
                src="/images/mockups/web-trader-mockup.webp"
                alt="Web Trader Platform — premium architectural mockup"
                fetchPriority="high"
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
                  { val: "Significant", label: "Faster navigation", color: "blue" },
                  { val: "Vast", label: "Fewer 'wrong account' tickets", color: "green" },
                  { val: "Total", label: "Reduced accidental logouts", color: "amber" }
                ].map((stat, i) => (
                  <div key={i} className={`text-center p-8 bg-gradient-to-br from-${stat.color}-50 to-white rounded-2xl border border-${stat.color}-100`}>
                    <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.val}</div>
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
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 mb-6 md:mb-8">Novidea — Product Design</h4>
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
                { label: "Role", val: "Product Design" },
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
                fetchPriority="high"
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
                  <div className="text-4xl font-serif text-purple-600 mb-2">High</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Efficiency Gain</p>
                  <p className="text-sm text-stone-600 mt-4">Significant reduction in assembly time for complex policy wordings.</p>
                </div>
                <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-purple-600 mb-2">Zero</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Critical Bugs</p>
                  <p className="text-sm text-stone-600 mt-4">No report crashes during stakeholder UAT sessions.</p>
                </div>
                <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-purple-600 mb-2">Full</div>
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
                src="/images/mockups/arabic-syntax-mockup.webp"
                alt="Arabic Syntax Lab — premium educational software mockup"
                fetchPriority="high"
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
              fetchPriority="high"
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

