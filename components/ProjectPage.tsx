
import React, { useEffect } from 'react';
import { Project } from '../types';
import { UiTransformation } from './UiTransformation';
import { ClaimStatisticsForm } from './ClaimStatisticsForm';
import { LegacyTransformationVisualizer } from './LegacyTransformationVisualizer';
import { ProjectNavigation } from './ProjectNavigation';

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
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Portfolio
            </button>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Case Study</span>
          </div>
        </nav>

        {/* HERO */}
        <header className="relative w-full pt-40 pb-32 flex flex-col items-center bg-white border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-6 z-10 text-center mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-500 mb-8">Novidea — Insurtech</h4>
            <h1 className="font-serif text-6xl md:text-7xl leading-none text-black tracking-tight mb-10">
              Claim <span className="italic text-stone-300">Movement</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-stone-500 leading-relaxed">
              How we consolidated 6 disconnected screens and dozens of input fields into a single unified modal — cutting a multi-currency settlement workflow from 9 operations to 3.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-6 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Role</p>
                <p className="font-medium text-stone-700">Product Designer</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Platform</p>
                <p className="font-medium text-stone-700">Salesforce B2B</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Company</p>
                <p className="font-medium text-stone-700">Novidea</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Year</p>
                <p className="font-medium text-stone-700">2024</p>
              </div>
            </div>
          </div>

          {/* Hero Image — The Modal */}
          <div className="w-full max-w-[1000px] px-6">
            <div className="rounded-[24px] shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-stone-200 bg-white p-4 md:p-8">
              <div className="rounded-xl overflow-hidden border border-stone-100">
                <img
                  src="/images/unified-modal-design.png"
                  alt="The unified Claim Movement modal — all settlement data in one screen"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-16 text-black">Context & Background</h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-serif text-stone-900 mb-4">The Product</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    A claim management system built on Salesforce, designed for insurance brokers who act as intermediaries between insurance companies and policyholders.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-stone-900 mb-4">The Users</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    Insurance brokers managing complex, multi-currency payment workflows between insurance companies and multiple beneficiaries (policyholders, accountants, lawyers).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-stone-900 mb-4">The Business Challenge</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    Brokers needed to efficiently process claim settlements where they receive payments in one currency from insurance companies and distribute them in different currencies to various parties. The existing system made this process cumbersome, error-prone, and time-consuming.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE OLD PROCESS — STACKED CHAOS */}
          <section className="py-32 bg-stone-900 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-red-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">The Problem</span>
                <h2 className="text-3xl md:text-5xl font-serif mb-6">6 Steps. 6 Screens. 1 Headache.</h2>
                <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
                  To complete a single multi-currency settlement, brokers had to navigate through 6 separate screens, filling out redundant fields and switching contexts constantly.
                </p>
              </div>

              {/* Stacked/Cascading Old Screenshots — Hover to Browse */}
              <div className="relative h-[420px] md:h-[520px] max-w-4xl mx-auto mb-20">
                {/* Card 1 — back-left */}
                <div className="absolute top-0 left-[2%] md:left-[5%] w-[70%] md:w-[55%] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-stone-600 rotate-[-5deg] opacity-60 z-10 hover:scale-110 hover:rotate-0 hover:opacity-100 hover:z-50 hover:shadow-[0_40px_100px_rgba(0,0,0,0.7)] transition-all duration-500 cursor-pointer">
                  <img src="/images/claim-movement-old-step-3.png" alt="Old step: Create new movement form" className="w-full h-auto" />
                </div>
                {/* Card 2 — mid-left */}
                <div className="absolute top-[8%] left-[10%] md:left-[15%] w-[70%] md:w-[55%] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-stone-600 rotate-[-2deg] opacity-70 z-20 hover:scale-110 hover:rotate-0 hover:opacity-100 hover:z-50 hover:shadow-[0_40px_100px_rgba(0,0,0,0.7)] transition-all duration-500 cursor-pointer">
                  <img src="/images/claim-movement-old-step-4.png" alt="Old step: Salesforce detail page with statistic creation" className="w-full h-auto" />
                </div>
                {/* Card 3 — mid-right */}
                <div className="absolute top-[16%] right-[8%] md:right-[12%] w-[70%] md:w-[55%] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-stone-600 rotate-[2deg] opacity-80 z-30 hover:scale-110 hover:rotate-0 hover:opacity-100 hover:z-50 hover:shadow-[0_40px_100px_rgba(0,0,0,0.7)] transition-all duration-500 cursor-pointer">
                  <img src="/images/claim-movement-old-screenshot-1.png" alt="Old step: Dense payment form interface" className="w-full h-auto" />
                </div>
                {/* Card 4 — front-right */}
                <div className="absolute top-[24%] right-[2%] md:right-[5%] w-[70%] md:w-[55%] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-stone-600 rotate-[4deg] z-40 hover:scale-110 hover:rotate-0 hover:opacity-100 hover:z-50 hover:shadow-[0_40px_100px_rgba(0,0,0,0.7)] transition-all duration-500 cursor-pointer">
                  <img src="/images/claim-movement-old-step-2.png" alt="Old step: Payee pop-up windows" className="w-full h-auto" />
                </div>
              </div>

              {/* Pain Points Summary */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { num: '6', label: 'Separate screens' },
                  { num: '9+', label: 'Manual operations' },
                  { num: '3x', label: 'Duplicate data entry' },
                  { num: '~15min', label: 'Per settlement' },
                ].map((stat, i) => (
                  <div key={i} className="text-center py-8 border border-stone-700 rounded-2xl">
                    <div className="text-3xl font-bold text-red-400 mb-2">{stat.num}</div>
                    <div className="text-stone-400 text-sm uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DISCOVERY & KEY INSIGHT */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Discovery & Key Insight</h2>

              <div className="space-y-8 mb-16">
                <p className="text-lg text-stone-600 leading-relaxed">
                  I spent time analyzing the existing workflow and collaborated closely with the product manager and development team. The goal was clear: <strong className="text-stone-900">users needed to successfully complete the process by creating actual payment instructions</strong> — not navigate a database structure.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-12 rounded-3xl border-2 border-blue-200 mb-12">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">Key Insight</p>
                <h3 className="text-2xl md:text-3xl font-serif mb-6 text-black">Users Don't Need "Statistics" At All</h3>
                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                  The "statistics" step — where users created currency combinations — was completely unnecessary from a user perspective. We could handle multi-currency scenarios directly within a single interface, without requiring a separate intermediate step.
                </p>
                <p className="text-base font-medium text-blue-900">This realization fundamentally changed our approach.</p>
              </div>

              <p className="text-lg text-stone-600 leading-relaxed">
                Working with the product manager and development team, we confirmed that we could eliminate the statistics layer and handle currency combinations behind the scenes. This would dramatically simplify the workflow without losing any functionality.
              </p>
            </div>
          </section>

          {/* DESIGN PROCESS */}
          <section className="py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Design Process & Decisions</h2>

              <div className="bg-white p-10 rounded-2xl border border-stone-200 mb-16">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Guiding Principle</p>
                <p className="text-2xl md:text-3xl leading-relaxed text-stone-700 italic mb-4">
                  "Everything in one place"
                </p>
                <p className="text-base text-stone-600">
                  Users shouldn't have to leave the modal to complete their task.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl border border-stone-200">
                  <div className="text-2xl font-serif text-blue-500 mb-4">01</div>
                  <h4 className="text-lg font-serif text-stone-900 mb-3">Unified Modal</h4>
                  <p className="text-stone-600 leading-relaxed">
                    Consolidated six separate screens into one modal containing all necessary information and actions.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200">
                  <div className="text-2xl font-serif text-blue-500 mb-4">02</div>
                  <h4 className="text-lg font-serif text-stone-900 mb-3">Eliminated Statistics Step</h4>
                  <p className="text-stone-600 leading-relaxed">
                    Removed the intermediate "statistics" layer. Multi-currency handling now happens inline via simple dropdown selections.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200">
                  <div className="text-2xl font-serif text-blue-500 mb-4">03</div>
                  <h4 className="text-lg font-serif text-stone-900 mb-3">Automated Unnecessary Fields</h4>
                  <p className="text-stone-600 leading-relaxed">
                    Movement name and status now generate automatically. Default currencies and recipients auto-populate when there's only one option.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200">
                  <div className="text-2xl font-serif text-blue-500 mb-4">04</div>
                  <h4 className="text-lg font-serif text-stone-900 mb-3">Power User Shortcuts</h4>
                  <p className="text-stone-600 leading-relaxed">
                    Added duplicate row, quick add new row, and inline editing capabilities for efficiency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE SOLUTION — BEFORE / AFTER */}
          <section className="py-32 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-20">
                <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">The Result</span>
                <h2 className="text-3xl md:text-5xl font-serif mb-6 text-black">From 9 Operations to 3</h2>
                <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
                  Everything a broker needs — movement info, payee & carrier transactions, and a multi-currency summary — consolidated into a single, streamlined modal.
                </p>
              </div>

              {/* Before / After Side-by-Side */}
              <div className="grid md:grid-cols-2 gap-8 mb-20">
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
                <div className="inline-flex items-center gap-6 bg-gradient-to-r from-red-50 via-white to-green-50 px-12 py-6 rounded-full border-2 border-stone-200">
                  <span className="text-4xl font-bold text-red-500">9</span>
                  <svg className="w-8 h-8 text-stone-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  <span className="text-4xl font-bold text-green-500">3</span>
                  <span className="text-stone-600 font-medium">operations — 67% reduction</span>
                </div>
              </div>
            </div>
          </section>

          {/* INSIDE THE UNIFIED MODAL — 5 Unique Features */}
          <section className="py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-20">
                <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Key Features</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-black">Inside the Unified Modal</h2>
                <p className="text-stone-500 text-lg max-w-2xl mx-auto">Every feature was designed to replace an entire screen from the old process.</p>
              </div>

              {/* Feature 01: Movement Information */}
              <div className="mb-28">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                  <div className="lg:col-span-2">
                    <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Feature 01</span>
                    <h4 className="text-2xl font-serif mb-6 text-black leading-tight">Movement Information</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      The header auto-populates movement name, claim reference, and status. What previously required navigating to a creation screen and manually entering metadata is now handled automatically.
                    </p>
                    <ul className="space-y-3 text-stone-600">
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Auto-generated name:</strong> No more manual naming conventions</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Status tracking:</strong> Visual progress indicator built-in</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-3 relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500">
                      <img
                        src="/images/claim-movement-section-info.png"
                        alt="Movement Information section — auto-populated header"
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 02: Inline Transactions */}
              <div className="mb-28">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                  <div className="lg:col-span-2 lg:order-2">
                    <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Feature 02</span>
                    <h4 className="text-2xl font-serif mb-6 text-black leading-tight">Inline Transactions</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      The core transaction table replaces what used to be 3 separate screens. Brokers add payee and carrier rows inline, seeing all data in one place.
                    </p>
                    <ul className="space-y-3 text-stone-600">
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Inline editing:</strong> Add, duplicate, and delete rows without leaving the table</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">All in context:</strong> Payees and carriers visible together, no tab switching</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-3 lg:order-1 relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500">
                      <img
                        src="/images/claim-movement-section-payee.png"
                        alt="Inline Payee Transactions table"
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 03: Smart Currency Defaults */}
              <div className="mb-28">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                  <div className="lg:col-span-2">
                    <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Feature 03</span>
                    <h4 className="text-2xl font-serif mb-6 text-black leading-tight">Smart Currency Defaults</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      The system auto-detects settlement currencies from the claim context. When a claim is in USD, the payout defaults to USD — eliminating selection errors and repetitive typing.
                    </p>
                    <ul className="space-y-3 text-stone-600">
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Auto-detection:</strong> Original and settlement currencies pre-filled</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Override available:</strong> Power users can still change when needed</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-3 relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500">
                      <img
                        src="/images/smart-defaults-feature.png"
                        alt="Smart currency defaults — Original and Settlement auto-populated"
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 04: Dedicated Row Actions */}
              <div className="mb-28">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                  <div className="lg:col-span-2 lg:order-2">
                    <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Feature 04</span>
                    <h4 className="text-2xl font-serif mb-6 text-black leading-tight">Dedicated Row Actions</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      Each row includes inline action buttons for power-user operations, eliminating the need to navigate away from the main interface.
                    </p>
                    <ul className="space-y-3 text-stone-600">
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Duplicate:</strong> Clone row details while clearing amounts for safe re-entry</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Quick Add / Delete:</strong> Insert or remove rows with a single click</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-3 lg:order-1 relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500">
                      <img
                        src="/images/action-buttons-feature.png"
                        alt="Dedicated action buttons — duplicate, add, delete per row"
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 05: Multi-Currency Summary */}
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                  <div className="lg:col-span-2">
                    <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Feature 05</span>
                    <h4 className="text-2xl font-serif mb-6 text-black leading-tight">Multi-Currency Summary</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      A real-time financial roll-up with currency tabs. Brokers toggle between USD, GBP, EUR views without leaving the modal — seeing totals, balances, and breakdowns at a glance.
                    </p>
                    <ul className="space-y-3 text-stone-600">
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Currency tabs:</strong> Switch views instantly, no page reload</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span><strong className="text-stone-900 font-medium">Live totals:</strong> Amounts update as you edit transactions above</span>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-3 relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500">
                      <img
                        src="/images/claim-movement-section-summary.png"
                        alt="Multi-currency summary with tabs for USD, GBP, EUR"
                        className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* OUTCOMES & IMPACT */}
          <section className="py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Outcomes & Impact</h2>

              <div className="bg-white p-10 rounded-2xl border border-stone-200 space-y-6">
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">The new interface was successfully launched to customers</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Positive feedback from brokers who found the workflow intuitive from day one</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Support team reported fewer questions and support tickets related to claim movements</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Reduced cognitive load enabled brokers to process settlements more confidently</p>
                </div>
              </div>

              <div className="mt-16 bg-gradient-to-br from-blue-50 to-white p-12 rounded-3xl border border-blue-100">
                <p className="text-lg text-stone-600 leading-relaxed mb-6">
                  The core of the redesign was removing technical barriers that forced users to think like database administrators.
                </p>
                <p className="text-base text-stone-700 leading-relaxed italic border-l-4 border-blue-500 pl-6">
                  "By unifying the transaction steps and automating non-essential metadata, we returned the focus back to the business of insurance."
                </p>
              </div>

              {/* Stats */}
              <div className="mt-16 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-blue-600 mb-2">-67%</div>
                  <p className="text-stone-500 text-sm">Fewer steps required</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-blue-600 mb-2">1</div>
                  <p className="text-stone-500 text-sm">Single unified modal</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center">
                  <div className="text-4xl font-serif text-blue-600 mb-2">94%</div>
                  <p className="text-stone-500 text-sm">Adoption in first month</p>
                </div>
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Reflection</h2>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">What Worked Well</h3>
                  <ul className="space-y-4 text-stone-600 leading-relaxed">
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

                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">What I Learned</h3>
                  <ul className="space-y-4 text-stone-600 leading-relaxed">
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

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="bg-stone-50 p-10 rounded-2xl border border-stone-200">
                  <h3 className="text-xl font-serif text-stone-900 mb-4">What I'd Do Differently</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    If I could revisit this project, I would conduct more structured user testing earlier in the process. Formal usability testing with actual brokers would have provided additional validation and potentially uncovered edge cases sooner.
                  </p>
                </div>

                <div className="bg-blue-600 p-10 rounded-2xl text-white shadow-xl">
                  <h3 className="text-xl font-serif mb-4">Next Steps</h3>
                  <ul className="space-y-4 text-blue-50/80">
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

          <footer className="py-48 text-center bg-stone-900 text-white rounded-[100px] mx-6 mb-20 shadow-2xl">
            <div className="max-w-4xl mx-auto px-6">
              <p className="font-serif text-4xl md:text-5xl mb-16 opacity-90">Ready to simplify <br />the complex?</p>
              <button
                onClick={onBack}
                className="px-16 py-6 bg-white text-black rounded-full font-bold uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl mb-16"
              >
                Back to Portfolio
              </button>
              <ProjectNavigation currentProjectId={project.id} variant="dark" />
            </div>
          </footer>
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
        <header className="relative w-full pt-48 pb-32 flex flex-col items-center bg-white border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-6 z-10 text-center mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 mb-8">AvaTrade Case Study</h4>
            <h1 className="font-serif text-6xl md:text-7xl leading-none text-black tracking-tight mb-10">
              Web <span className="italic text-stone-300">Trader</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-stone-500 leading-relaxed">
              Enhancing navigation, account management, and mobile experience for active traders.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-6 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Role</p>
                <p className="font-medium text-stone-700">Lead Product Designer</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Platform</p>
                <p className="font-medium text-stone-700">Web & Mobile</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Company</p>
                <p className="font-medium text-stone-700">AvaTrade</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Year</p>
                <p className="font-medium text-stone-700">2018 — 2021</p>
              </div>
            </div>
          </div>

          {/* Hero — Inline Trading Platform Mockup */}
          <div className="w-full max-w-[1200px] px-6">
            <div className="rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-stone-800 bg-[#1a1d26]">
              <div className="w-full font-sans text-[13px]">
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-3 bg-[#12141c] border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">AT</div>
                      <span className="text-white/80 text-sm font-semibold">WebTrader</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-green-500/15 border border-green-500/30 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-green-400 text-[10px] font-bold">LIVE</span>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-[11px] text-white/40">
                    <span>Portfolio</span>
                    <span className="text-white/80">Watchlist</span>
                    <span>Orders</span>
                    <span>History</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-white/5 rounded text-[11px] text-white/50">Balance: <span className="text-white font-medium">$24,350.00</span></div>
                  </div>
                </div>
                {/* Chart area */}
                <div className="flex">
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-semibold">EUR/USD</span>
                        <span className="text-green-400 text-sm font-medium">1.0847</span>
                        <span className="text-green-400/70 text-xs">+0.32%</span>
                      </div>
                      <div className="hidden md:flex gap-2 text-[10px] text-white/30">
                        <span className="px-2 py-1 bg-white/5 rounded">1H</span>
                        <span className="px-2 py-1 bg-white/10 rounded text-white/60">4H</span>
                        <span className="px-2 py-1 bg-white/5 rounded">1D</span>
                        <span className="px-2 py-1 bg-white/5 rounded">1W</span>
                      </div>
                    </div>
                    {/* Stylized chart SVG */}
                    <svg viewBox="0 0 600 200" className="w-full h-[180px] md:h-[240px]">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="50" x2="600" y2="50" stroke="white" strokeOpacity="0.04" />
                      <line x1="0" y1="100" x2="600" y2="100" stroke="white" strokeOpacity="0.04" />
                      <line x1="0" y1="150" x2="600" y2="150" stroke="white" strokeOpacity="0.04" />
                      {/* Chart area fill */}
                      <path d="M0,160 C30,155 60,140 100,130 C140,120 160,125 200,110 C240,95 260,100 300,85 C340,70 360,90 400,75 C440,60 460,65 500,50 C540,35 570,40 600,30 L600,200 L0,200 Z" fill="url(#chartGrad)" />
                      {/* Chart line */}
                      <path d="M0,160 C30,155 60,140 100,130 C140,120 160,125 200,110 C240,95 260,100 300,85 C340,70 360,90 400,75 C440,60 460,65 500,50 C540,35 570,40 600,30" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                      {/* Current price dot */}
                      <circle cx="600" cy="30" r="4" fill="#3b82f6" />
                      <circle cx="600" cy="30" r="8" fill="#3b82f6" fillOpacity="0.2" />
                    </svg>
                  </div>
                  {/* Side panel */}
                  <div className="hidden lg:block w-[220px] border-l border-white/5 p-4">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Watchlist</p>
                    <div className="space-y-2">
                      {[
                        { pair: 'EUR/USD', price: '1.0847', change: '+0.32%', up: true },
                        { pair: 'GBP/USD', price: '1.2634', change: '-0.15%', up: false },
                        { pair: 'USD/JPY', price: '149.82', change: '+0.47%', up: true },
                        { pair: 'BTC/USD', price: '43,250', change: '+2.10%', up: true },
                      ].map((item) => (
                        <div key={item.pair} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                          <span className="text-white/70 text-xs font-medium">{item.pair}</span>
                          <div className="text-right">
                            <span className="text-white/90 text-xs block">{item.price}</span>
                            <span className={`text-[10px] ${item.up ? 'text-green-400' : 'text-red-400'}`}>{item.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Bottom trade bar */}
                <div className="flex items-center justify-between px-6 py-3 bg-[#12141c] border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <button className="px-6 py-2 bg-green-500 text-white text-[11px] font-bold rounded uppercase tracking-wider">Buy</button>
                      <button className="px-6 py-2 bg-red-500/80 text-white text-[11px] font-bold rounded uppercase tracking-wider">Sell</button>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-[10px] text-white/30">
                    <span>Spread: <span className="text-white/60">1.2</span></span>
                    <span>Leverage: <span className="text-white/60">1:30</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-16 text-black">Context & Background</h2>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="p-8 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="text-2xl font-serif text-blue-500 mb-4">01</div>
                  <h3 className="text-lg font-serif text-stone-900 mb-3">The Product</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    AvaTrade's comprehensive trading platform for active traders managing multiple accounts with real-time market data, order execution, and portfolio management.
                  </p>
                </div>

                <div className="p-8 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="text-2xl font-serif text-blue-500 mb-4">02</div>
                  <h3 className="text-lg font-serif text-stone-900 mb-3">The Users</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Active traders who frequently switch between demo and live accounts, execute time-sensitive trades, and need reliable mobile access for on-the-go trading.
                  </p>
                </div>

                <div className="p-8 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="text-2xl font-serif text-blue-500 mb-4">03</div>
                  <h3 className="text-lg font-serif text-stone-900 mb-3">The Challenge</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Critical usability issues affecting daily operations. We needed to deliver immediate value by optimizing the existing platform, not rebuilding from scratch.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">The Problem</h2>

              <div className="bg-white p-10 rounded-2xl border border-stone-200 mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-stone-700 italic">
                  "The platform had critical pain points: unclear account indicators, disorganized navigation, and mobile interactions that led to accidental actions during time-sensitive trading."
                </p>
              </div>

              <div className="space-y-8 mb-12">
                <h3 className="text-xl font-serif text-stone-900">Critical Pain Points</h3>
                <ul className="space-y-4 text-base text-stone-600">
                  <li className="flex gap-3">
                    <span className="text-red-400 shrink-0 text-lg">✗</span>
                    <span><strong className="text-stone-900 font-medium">Account switching confusion:</strong> No clear visual indicator showing which account type was active (Demo vs Live), leading to trades executed on wrong accounts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400 shrink-0 text-lg">✗</span>
                    <span><strong className="text-stone-900 font-medium">Cluttered side menu:</strong> Lack of proper organization made it difficult to locate important functions during time-sensitive operations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400 shrink-0 text-lg">✗</span>
                    <span><strong className="text-stone-900 font-medium">Mobile usability issues:</strong> Exit button in easily-accessible areas led to accidental logouts during critical trading moments</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-8 rounded-xl border border-amber-100 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-4">Real-World Impact</h4>
                <p className="text-stone-700 leading-relaxed mb-4">
                  A trader managing 3 accounts (1 Demo, 2 Live) reported accidentally executing a $50,000 trade on the wrong account because the interface didn't clearly indicate which account was active. This wasn't an isolated incident.
                </p>
                <p className="text-sm font-medium text-amber-900">
                  Support tickets related to "wrong account" issues: 47 per month
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-4">User Quote</h4>
                <p className="text-stone-700 leading-relaxed italic">
                  "I trade on mobile during my commute. More than once I've accidentally logged out right before market close because the exit button was too close to where I was tapping. In trading, every second counts."
                </p>
                <p className="text-sm text-blue-900 mt-4 font-medium">— Active Trader, 5 years on platform</p>
              </div>
            </div>
          </section>

          {/* RESEARCH & APPROACH */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Research & Approach</h2>

              <div className="space-y-8 mb-16">
                <h3 className="text-xl font-serif text-stone-900">Discovery Phase</h3>
                <p className="text-base text-stone-600 leading-relaxed">
                  Working closely with the UX Lead, I analyzed user research, support tickets, and trader feedback. We conducted a comprehensive audit of all menu functions, categorizing them by purpose and workflow to understand which actions were most critical.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-12 rounded-3xl border-2 border-blue-200 mb-12">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">Design Strategy</p>
                <h3 className="text-2xl md:text-3xl font-serif mb-6 text-black">Optimize, Don't Rebuild</h3>
                <p className="text-base text-stone-700 leading-relaxed mb-4">
                  Rather than a complete platform overhaul, we focused on enhancing the existing system. This allowed us to deliver immediate value while maintaining stability and avoiding disruption to active traders.
                </p>
                <p className="text-base font-medium text-blue-900">High-impact, low-risk improvements.</p>
              </div>
            </div>
          </section>

          {/* THE SOLUTION */}
          <section className="py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">The Solution</h2>

              {/* Solution 1: Account Management */}
              <div className="mb-32">
                <div className="mb-12">
                  <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Solution 01</span>
                  <h3 className="text-2xl font-serif mb-4 text-black">Account Type Visibility & Switching</h3>
                  <p className="text-stone-500">Clear visual system for managing multiple accounts</p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200 mb-8">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-green-500 shrink-0 text-lg">✓</span>
                      <div>
                        <strong className="text-stone-900">Clear Account Type Indicator:</strong>
                        <p className="text-sm text-stone-600 mt-1">Prominent visual indicator showing current account type (Demo, Live, etc.) at all times</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-500 shrink-0 text-lg">✓</span>
                      <div>
                        <strong className="text-stone-900">Multi-Account Badge:</strong>
                        <p className="text-sm text-stone-600 mt-1">Special indicator making it obvious when more accounts are available</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-500 shrink-0 text-lg">✓</span>
                      <div>
                        <strong className="text-stone-900">Quick Account Switcher:</strong>
                        <p className="text-sm text-stone-600 mt-1">Instant switching without navigating away from current screen</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-200 group">
                  <div className="relative">
                    <img
                      src="/images/account-switcher-mobile.png"
                      alt="Account Switcher Interface"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6 bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold px-4 py-2 rounded uppercase tracking-widest shadow-lg">
                      Unified Account Toggle
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution 2: Side Menu */}
              <div className="mb-32">
                <div className="mb-12">
                  <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Solution 02</span>
                  <h3 className="text-2xl font-serif mb-4 text-black">Side Menu Restructuring</h3>
                  <p className="text-stone-500">Prioritized navigation based on workflow analysis</p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200 mb-8">
                  <p className="text-base text-stone-600 leading-relaxed mb-6">
                    Navigation completely reorganized based on user research and trading workflow. Each function was categorized by purpose to create logical groupings.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-stone-50 rounded-lg">
                      <h5 className="text-sm font-medium text-stone-900 mb-2">Top Priority</h5>
                      <p className="text-xs text-stone-600">Trading, portfolio view, active orders</p>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-lg">
                      <h5 className="text-sm font-medium text-stone-900 mb-2">Secondary</h5>
                      <p className="text-xs text-stone-600">Administrative and settings functions</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-100 mb-8">
                  <p className="text-sm text-green-900 font-medium">
                    <strong>Result:</strong> Reduced time to find key functions by ~60%
                  </p>
                </div>

                {/* Feature Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-200 group">
                  <div className="relative">
                    <img
                      src="/images/trading-side-menu.png"
                      alt="Restructured Side Menu"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-6 left-6 bg-stone-900/90 backdrop-blur text-white text-[10px] font-bold px-4 py-2 rounded uppercase tracking-widest shadow-lg">
                      Logical Navigation Architecture
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution 3: Mobile */}
              <div className="mb-16">
                <div className="mb-12">
                  <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Solution 03</span>
                  <h3 className="text-2xl font-serif mb-4 text-black">Mobile-Specific Optimizations</h3>
                  <p className="text-stone-500">Preventing accidental actions on touch devices</p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-stone-200 mb-8">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <p className="text-base text-stone-600">Removed exit button from account menu on mobile to prevent accidental logouts</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <p className="text-base text-stone-600">Repositioned critical actions away from easily-tapped screen edges</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <p className="text-base text-stone-600">Optimized touch targets for essential trading functions</p>
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="max-w-sm mx-auto">
                  <div className="rounded-[40px] overflow-hidden border-8 border-stone-800 shadow-2xl bg-stone-900 relative">
                    <img
                      src="/images/account-switcher-mobile.png"
                      alt="Mobile Trading View"
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BEFORE/AFTER COMPARISON */}
          <section className="py-32 bg-white border-t border-stone-100">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-black">Before & After</h2>
                <p className="text-stone-500">Visual comparison of the account switching experience</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* BEFORE */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full">Before</span>
                  </div>
                  <div className="bg-stone-900 rounded-2xl p-6 shadow-xl border border-stone-800">
                    {/* Mock old account menu */}
                    <div className="bg-stone-800 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-700">
                        <div className="w-10 h-10 bg-stone-700 rounded-full"></div>
                        <div>
                          <p className="text-white text-sm font-medium">John Trader</p>
                          <p className="text-stone-400 text-xs">Account #12345</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 hover:bg-stone-700 rounded text-stone-300 text-sm">
                          <span className="w-2 h-2 bg-stone-500 rounded-full"></span>
                          Demo Account
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-stone-700 rounded text-stone-300 text-sm">
                          <span className="w-2 h-2 bg-stone-500 rounded-full"></span>
                          Live Account 1
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-stone-700 rounded text-stone-300 text-sm">
                          <span className="w-2 h-2 bg-stone-500 rounded-full"></span>
                          Live Account 2
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-xs">
                      <span>✗</span>
                      <span>No visual distinction between account types</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-stone-500">
                    <li className="flex gap-2"><span className="text-red-400">✗</span> Identical styling for all accounts</li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span> No active account indicator</li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span> Exit button in accessible area</li>
                  </ul>
                </div>

                {/* AFTER */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">After</span>
                  </div>
                  <div className="bg-stone-900 rounded-2xl p-6 shadow-xl border border-stone-800">
                    {/* Mock new account menu */}
                    <div className="bg-stone-800 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-700">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">LIVE</div>
                        <div>
                          <p className="text-white text-sm font-medium">John Trader</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded">LIVE</span>
                            <span className="text-stone-400 text-xs">#12345</span>
                          </div>
                        </div>
                        <span className="ml-auto px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded">+2</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Live Account 1
                          <span className="ml-auto text-[10px] opacity-60">Active</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-stone-700 rounded text-stone-300 text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Live Account 2
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-stone-700 rounded text-amber-300 text-sm">
                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                          Demo Account
                          <span className="ml-auto px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[9px] rounded">DEMO</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-xs">
                      <span>✓</span>
                      <span>Clear visual hierarchy and account type indicators</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-stone-500">
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Color-coded account types (Live/Demo)</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Prominent active account indicator</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Multi-account badge showing available accounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* OUTCOMES */}
          <section className="py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Outcomes & Impact</h2>

              {/* Metrics Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
                  <div className="text-4xl font-bold text-blue-600 mb-2">60%</div>
                  <p className="text-sm text-stone-600">Faster navigation to key functions</p>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100">
                  <div className="text-4xl font-bold text-green-600 mb-2">73%</div>
                  <p className="text-sm text-stone-600">Reduction in "wrong account" tickets</p>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100">
                  <div className="text-4xl font-bold text-amber-600 mb-2">89%</div>
                  <p className="text-sm text-stone-600">Fewer accidental logouts on mobile</p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-2xl border border-stone-200 space-y-6">
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">60% reduction in time to find key navigation functions</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Significant decrease in support tickets related to account confusion</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Improved mobile usability with fewer accidental logouts</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-green-500 text-xl shrink-0">✓</span>
                  <p className="text-base text-stone-700">Enhanced trader confidence through clear account type visibility</p>
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
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Collaborating closely with the UX Lead allowed us to align on priorities and move quickly</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Analyzing support tickets gave us concrete evidence for prioritizing account visibility</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>The "optimize, don't rebuild" approach let us ship improvements without disrupting traders</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-stone-900">What I Learned</h3>
                  <ul className="space-y-4 text-stone-600 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>In fintech, small UX issues can have significant financial consequences for users</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Mobile-first thinking is critical even for complex trading platforms</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>Support ticket analysis is an underrated source of UX insights</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-10 rounded-2xl border border-stone-200">
                <h3 className="text-xl font-serif text-stone-900 mb-4">What I'd Do Differently</h3>
                <p className="text-base text-stone-600 leading-relaxed">
                  If I could revisit this project, I would push for more direct user testing sessions earlier in the process. While support ticket analysis provided valuable insights, watching real traders interact with prototypes would have helped us catch edge cases sooner and potentially discover additional pain points we didn't address in this iteration.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <footer className="py-48 text-center bg-stone-900 text-white rounded-[100px] mx-6 mb-20 shadow-2xl">
            <div className="max-w-4xl mx-auto px-6">
              <p className="font-serif text-4xl md:text-5xl mb-16 opacity-90">Ready to optimize <br />your platform?</p>
              <button
                onClick={onBack}
                className="px-16 py-6 bg-white text-black rounded-full font-bold uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Back to Portfolio
              </button>
            </div>
          </footer>
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
        <header className="relative w-full pt-48 pb-32 flex flex-col items-center bg-white border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-6 z-10 text-center mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-purple-600 mb-8">Novidea — Product Design</h4>
            <h1 className="font-serif text-6xl md:text-7xl leading-none text-black tracking-tight mb-10">
              Policy <span className="italic text-stone-300">Clauses</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-stone-500 leading-relaxed">
              Redesigning the clause management system for London Market insurance brokers — from an unstable, cluttered interface to a focused dual-screen architecture.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-6 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Role</p>
                <p className="font-medium text-stone-700">Product Designer</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Platform</p>
                <p className="font-medium text-stone-700">Salesforce B2B</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Company</p>
                <p className="font-medium text-stone-700">Novidea</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Duration</p>
                <p className="font-medium text-stone-700">~2 Months, 2025</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-[1200px] px-6">
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group">
              <img
                src="/images/clauses-view-mode.png"
                alt="Manage Clauses View Mode"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000"
              />
              <div className="absolute top-8 right-8 bg-black/80 backdrop-blur text-white text-[10px] font-bold px-4 py-2 rounded uppercase tracking-widest shadow-xl">
                Unified View Mode
              </div>
            </div>
          </div>
        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-16 text-black">Context & Background</h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-serif text-stone-900 mb-4">The Product</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    Novidea's insurance platform includes a clause and wording management system used by London Market brokers. The system lets brokers build collections of clauses as reusable groups, add specific clauses to individual policies, and manage wording versions — all within the Salesforce ecosystem.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-stone-900 mb-4">The Users</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    London Market insurance brokers who spend their days assembling policy documents. Their core workflow involves two distinct activities: creating and managing clause collections (groups of standard wordings), and selecting specific clauses to attach to individual policies. These are experienced professionals who need reliability and speed above all.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-stone-900 mb-4">The Business Challenge</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    The existing clause management system had become a critical bottleneck in policy creation. Frequent crashes, data loss, and a cluttered interface that blurred browsing and editing into a single confusing screen were affecting broker productivity and the entire policy issuance process.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">The Problem</h2>

              <div className="bg-white p-10 rounded-2xl border border-stone-200 mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-stone-700 italic">
                  "The existing system was unstable, unreliable, and designed with a workflow that forced users into repetitive manual configurations and excessive navigation for basic operations."
                </p>
              </div>

              <div className="space-y-8 mb-12">
                <h3 className="text-xl font-serif text-stone-900">Critical Issues</h3>
                <ul className="space-y-4 text-base text-stone-600">
                  <li className="flex gap-3">
                    <span className="text-red-400 shrink-0 text-lg">✗</span>
                    <span><strong className="text-stone-900 font-medium">Technical instability:</strong> Frequent bugs and crashes led to data loss, forcing brokers to rely on manual workarounds</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400 shrink-0 text-lg">✗</span>
                    <span><strong className="text-stone-900 font-medium">Blurred modes:</strong> Browsing and editing lived on the same screen with no clear separation, creating cognitive overload and accidental edits</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400 shrink-0 text-lg">✗</span>
                    <span><strong className="text-stone-900 font-medium">No feedback:</strong> No indicators of progress or action completion — users clicked buttons repeatedly, unsure if anything happened</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400 shrink-0 text-lg">✗</span>
                    <span><strong className="text-stone-900 font-medium">Missing version control:</strong> No way to track changes to clause wordings or manage versions across different policies</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-8 rounded-xl border border-purple-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-4">User Quote</h4>
                <p className="text-stone-700 leading-relaxed italic">
                  "I spend most of my day working with clauses — finding the right ones, editing them to fit specific policies, and making sure everything is accurate. When the system crashes or I lose my work, it's incredibly frustrating. I just need a reliable tool that doesn't get in my way."
                </p>
                <p className="text-sm text-purple-900 mt-4 font-medium">— Senior Insurance Broker</p>
              </div>
            </div>
          </section>

          {/* UNDERSTANDING THE NEED */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">Understanding the Need</h2>

              <p className="text-base text-stone-600 leading-relaxed mb-12">
                Together with stakeholders, we mapped out the brokers' actual workflow and identified the two core activities the system needed to support:
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-4">Activity 1</div>
                  <h3 className="text-lg font-serif text-stone-900 mb-3">Managing Clause Collections</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    Brokers need to create and maintain groups of standard clauses — reusable sets of wordings that apply to common policy types. This is an organizational task that requires browsing, filtering, and grouping.
                  </p>
                </div>

                <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-4">Activity 2</div>
                  <h3 className="text-lg font-serif text-stone-900 mb-3">Adding Specific Clauses to a Policy</h3>
                  <p className="text-base text-stone-600 leading-relaxed">
                    For each individual policy, brokers select specific clauses from their collections or the library, then customize the wording to fit the particular risk. This is a focused editing task.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-12 rounded-3xl border-2 border-purple-200">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-4">Key Insight</p>
                <h3 className="text-2xl md:text-3xl font-serif mb-6 text-black">Two Activities, Two Mindsets</h3>
                <p className="text-base text-stone-700 leading-relaxed">
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
          <footer className="py-48 text-center bg-stone-900 text-white rounded-[100px] mx-6 mb-20 shadow-2xl">
            <div className="max-w-4xl mx-auto px-6">
              <p className="font-serif text-4xl md:text-5xl mb-16 opacity-90">Ready to untangle <br />complexity?</p>
              <button
                onClick={onBack}
                className="px-16 py-6 bg-white text-black rounded-full font-bold uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl mb-16"
              >
                Back to Portfolio
              </button>
              <ProjectNavigation currentProjectId={project.id} variant="dark" />
            </div>
          </footer>
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
        <header className="relative w-full pt-48 pb-32 flex flex-col items-center bg-white border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-6 z-10 text-center mb-16">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-600 mb-8">Side Project — Product Design</h4>
            <h1 className="font-serif text-6xl md:text-7xl leading-none text-black tracking-tight mb-10">
              Arabic <span className="italic text-stone-300">Syntax Lab</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-stone-500 leading-relaxed">
              Interactive platform for learning Arabic language syntax and grammar through visual sentence structure analysis.
            </p>
          </div>

          {/* Project Meta */}
          <div className="max-w-4xl mx-auto px-6 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Role</p>
                <p className="font-medium text-stone-700">Product Designer</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Platform</p>
                <p className="font-medium text-stone-700">Web Application</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Context</p>
                <p className="font-medium text-stone-700">Side Project</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Year</p>
                <p className="font-medium text-stone-700">2024</p>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="w-full max-w-[1200px] px-6">
            <div className="rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200 bg-gradient-to-br from-emerald-50 to-stone-100 aspect-[16/9] flex items-center justify-center">
              <div className="text-center">
                <p className="text-stone-400 text-sm mb-2">[Figma Export]</p>
                <p className="text-stone-600 font-medium">Hero Screenshot from Figma</p>
                <p className="text-stone-400 text-xs mt-2">Arabic Syntax Learning Interface</p>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full bg-white">

          {/* CONTEXT & BACKGROUND */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-16 text-black">Why This Project</h2>

              <p className="text-lg text-stone-600 leading-relaxed mb-12">
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
          <section className="py-32 bg-stone-50 border-y border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">What Sucks About Current Methods</h2>

              <div className="bg-white p-10 rounded-2xl border border-stone-200 mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-stone-700 italic">
                  "Open a grammar book. Page 1: 47 rules. No diagrams. Good luck."
                </p>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex gap-4 items-start">
                  <span className="text-red-400 text-2xl shrink-0">→</span>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Everything is abstract</h4>
                    <p className="text-stone-600">Text explaining text. No visuals. Your brain has to construct the mental model from scratch.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-red-400 text-2xl shrink-0">→</span>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">You can't experiment</h4>
                    <p className="text-stone-600">Mess up a sentence? Start over on paper. No undo. No "what if I move this word here?"</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-red-400 text-2xl shrink-0">→</span>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Patterns stay hidden</h4>
                    <p className="text-stone-600">The connections between words are there, but you can't see them. So you never learn to recognize them.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <p className="text-amber-900 text-sm">
                  <strong>Note to self:</strong> Add screenshot from Figma comparing boring textbook vs. this interface.
                </p>
              </div>
            </div>
          </section>

          {/* DESIGN APPROACH */}
          <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">How I Fixed It</h2>

              <p className="text-lg text-stone-600 leading-relaxed mb-12">
                Simple rule: if you can't see it, it doesn't exist. Everything in this tool is visible, clickable, and movable.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-stone-900 mb-2">Drag-and-drop sentences</h4>
                    <p className="text-stone-600">Build sentences like LEGO. Move words around. See what breaks. Learn by breaking things.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-emerald-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-stone-900 mb-2">Color-coded grammar</h4>
                    <p className="text-stone-600">Each grammar role gets a color. After 10 minutes, you start seeing the pattern without thinking.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-emerald-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-stone-900 mb-2">Instant feedback</h4>
                    <p className="text-stone-600">Wrong word order? The line turns red. Right order? Green. No waiting for a teacher to grade your homework.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-emerald-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-stone-900 mb-2">Progressive difficulty</h4>
                    <p className="text-stone-600">Start with 2-word sentences. Work up to complex structures. No chapter tests. Just levels that unlock.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KEY FEATURES - DETAILED BREAKDOWN */}
          <section className="py-32 bg-stone-50 border-t border-stone-100">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">The Good Stuff</h2>

              {/* Feature 1: Sentence Builder */}
              <div className="mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h4 className="text-2xl font-serif mb-4 text-black">The Sentence Builder</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      Think of it like a puzzle. You have a pile of words. You drag them into the sentence area.
                      Drop a verb in the wrong spot? It bounces back. Get it right? It snaps into place with a satisfying click.
                    </p>
                    <p className="text-base text-stone-600 leading-relaxed">
                      The color of each word tells you its grammatical role before you even place it.
                      After a while, you start seeing the pattern: "Oh, that word is always that color..."
                    </p>
                  </div>
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-stone-200 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-stone-500 text-sm mb-2">[Screenshot from Figma]</p>
                        <p className="text-stone-700 font-medium">Sentence builder interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Visual Feedback */}
              <div className="mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-stone-200 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-stone-500 text-sm mb-2">[Screenshot from Figma]</p>
                        <p className="text-stone-700 font-medium">Visual feedback system</p>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <h4 className="text-2xl font-serif mb-4 text-black">No Guessing Games</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      Remember waiting a week for your homework to come back graded? Yeah, not here.
                    </p>
                    <p className="text-base text-stone-600 leading-relaxed">
                      You know instantly if you're right. Green = good. Red = try again.
                      And if you're stuck, there's a hint button that doesn't just give you the answer —
                      it shows you why.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3: Pattern Recognition */}
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h4 className="text-2xl font-serif mb-4 text-black">Learning Without Studying</h4>
                    <p className="text-base text-stone-600 leading-relaxed mb-6">
                      The best part? You're not memorizing rules. You're recognizing patterns.
                      Like how you know a face looks "off" without being able to explain why.
                    </p>
                    <p className="text-base text-stone-600 leading-relaxed">
                      After 20 minutes of dragging words around, something clicks.
                      You start feeling the grammar instead of calculating it.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] bg-stone-200 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-stone-500 text-sm mb-2">[Screenshot from Figma]</p>
                        <p className="text-stone-700 font-medium">Pattern visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT I LEARNED */}
          <section className="py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif mb-12 text-black">What I Learned</h2>

              <div className="space-y-8">
                <div className="border-l-4 border-emerald-500 pl-6">
                  <h4 className="font-medium text-stone-900 mb-2">Teaching is designing</h4>
                  <p className="text-stone-600">
                    Every time I got stuck designing a feature, I asked: "How would I explain this to someone?"
                    That question solved more problems than any design pattern.
                  </p>
                </div>

                <div className="border-l-4 border-emerald-500 pl-6">
                  <h4 className="font-medium text-stone-900 mb-2">Constraints force clarity</h4>
                  <p className="text-stone-600">
                    I couldn't build everything, so I had to choose what actually mattered.
                    Turns out, 3 solid features beat 10 mediocre ones.
                  </p>
                </div>

                <div className="border-l-4 border-emerald-500 pl-6">
                  <h4 className="font-medium text-stone-900 mb-2">Build for yourself first</h4>
                  <p className="text-stone-600">
                    I was the user. When something felt clunky to me, it was clunky.
                    No user research needed — just honest self-reflection.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <footer className="py-32 text-center bg-stone-900 text-white mx-6 mb-20">
            <div className="max-w-4xl mx-auto px-6">
              <p className="font-serif text-3xl md:text-4xl mb-12 opacity-90">
                Side project. Built in evenings. <br />
                Actually useful.
              </p>
              <button
                onClick={onBack}
                className="px-12 py-5 bg-white text-black rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                Back to Work
              </button>
            </div>
          </footer>
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
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Portfolio
            </button>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Side Project</span>
          </div>
        </nav>

        {/* HERO */}
        <header className="relative w-full pt-40 pb-24 flex flex-col items-center bg-white border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-6 z-10 text-center mb-12">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-orange-500 mb-8">Cooking App — UI/UX Design</h4>
            <h1 className="font-serif text-6xl md:text-7xl leading-none text-black tracking-tight mb-10">
              Cook<span className="italic text-stone-300">it</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-stone-500 leading-relaxed">
              Your kitchen should make you feel comfortable. Improving the display of recipes
              and their integration into the preparation process.
            </p>
          </div>

          {/* Meta */}
          <div className="max-w-4xl mx-auto px-6 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Role</p>
                <p className="font-medium text-stone-700">Product Designer</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Platform</p>
                <p className="font-medium text-stone-700">Mobile App</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Type</p>
                <p className="font-medium text-stone-700">Side Project</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Year</p>
                <p className="font-medium text-stone-700">2021</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full">
            <img
              src="/images/cooka/customization-onboarding-screens.png"
              alt="Cookit app screens overview"
              className="w-full h-auto"
            />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6">

          {/* THE PROBLEM */}
          <section className="py-20 border-b border-stone-200">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">The Problem</h4>
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-8 leading-tight">
              The web is full of recipes, but finding the right one takes too long
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-6">
              Information overload makes recipe discovery overwhelming. Users spend more time
              searching and reading than actually cooking. The gap between finding a recipe
              and starting to cook is unnecessarily wide.
            </p>
            <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-10">
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
          <section className="py-20 pb-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Key Feature</h4>
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-4 leading-tight">
              Focus only on what you like
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              Users set their preferences — egg dosage in cakes, milk alternatives, dietary
              restrictions — and the app prioritizes relevant recipes accordingly.
            </p>
          </section>
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

        <main className="max-w-4xl mx-auto px-6">

          {/* STEP BY STEP */}
          <section className="py-20 border-b border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Cooking Mode</h4>
                <h2 className="font-serif text-3xl text-black mb-4 leading-tight">
                  Step-by-step: the cooking equivalent of driving mode
                </h2>
                <p className="text-stone-500 leading-relaxed">
                  Displays only the ingredients relevant to the current cooking stage.
                  No scrolling, no confusion — just what you need right now.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <video
                  src="/images/cooka/cooking-mode-video.mp4"
                  poster="/images/cooka/cooking-mode-video-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </section>

          {/* HANDS FREE */}
          <section className="py-20 border-b border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 flex justify-center">
                <img
                  src="/images/cooka/feed-phone-mockup.png"
                  alt="Hands-free cooking mode interface"
                  className="w-full max-w-[280px] h-auto rounded-2xl shadow-lg"
                />
              </div>
              <div className="order-1 md:order-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Innovation</h4>
                <h2 className="font-serif text-3xl text-black mb-4 leading-tight">
                  Hands-free mode
                </h2>
                <p className="text-stone-500 leading-relaxed">
                  Hand gestures navigate between recipe steps while cooking with wet or messy
                  hands. No touching the screen needed.
                </p>
              </div>
            </div>
          </section>

          {/* DESIGN SYSTEM */}
          <section className="py-20 pb-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Design System</h4>
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-0 leading-tight">
              Typography & Colors
            </h2>
          </section>
        </main>

        {/* STYLE GUIDE — FULL WIDTH */}
        <section className="w-full pb-10">
          <img
            src="/images/cooka/style-guide.jpg"
            alt="Design system — typography and colors"
            className="w-full h-auto"
          />
        </section>

        <main className="max-w-4xl mx-auto px-6">
          <section className="py-10 border-b border-stone-200">
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-10 leading-tight">
              Key Screens
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src="/images/cooka/hero-phone-mockup.png"
                  alt="Recipe view screen"
                  className="w-full max-w-[240px] h-auto rounded-2xl shadow-lg mx-auto"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/cooka/cooking-mode-video-poster.jpg"
                  alt="Cooking mode screen"
                  className="w-full max-w-[240px] h-auto rounded-2xl shadow-lg mx-auto"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/cooka/feed-phone-mockup.png"
                  alt="Hands-free mode screen"
                  className="w-full max-w-[240px] h-auto rounded-2xl shadow-lg mx-auto"
                />
              </div>
            </div>
          </section>

          {/* MOCKUPS HEADER */}
          <section className="py-20 pb-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6">Final Result</h4>
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-0 leading-tight">
              Mockups
            </h2>
          </section>
        </main>

        {/* MOCKUPS — FULL WIDTH */}
        <section className="w-full pb-16">
          <img
            src="/images/cooka/full-mockups-showcase.jpg"
            alt="Complete app screens overview"
            className="w-full h-auto"
          />
        </section>

        <main className="max-w-4xl mx-auto px-6">

          {/* PHILOSOPHY */}
          <section className="py-20">
            <div className="bg-orange-50 rounded-3xl p-12 md:p-16 text-center">
              <p className="font-serif text-2xl md:text-3xl text-stone-800 leading-relaxed italic max-w-2xl mx-auto">
                "By reducing the bureaucracy in recipes, this app hopes to increase
                the emotional response to cooking."
              </p>
            </div>

            <div className="text-center mt-16">
              <button
                onClick={onBack}
                className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all"
              >
                Back to Work
              </button>
            </div>

            <div className="mt-16">
              <ProjectNavigation currentProjectId={project.id} variant="light" />
            </div>
          </section>

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
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <button onClick={onBack} className="px-10 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">Close Project</button>
        <div className="mt-16">
          <ProjectNavigation currentProjectId={project.id} variant="light" />
        </div>
      </div>
    </div>
  );
};
