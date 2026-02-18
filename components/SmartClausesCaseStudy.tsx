
import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudyFooterTangle } from './CaseStudyFooterTangle';


interface SmartClausesCaseStudyProps {
    onBack: () => void;
}

export const SmartClausesCaseStudy: React.FC<SmartClausesCaseStudyProps> = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen font-sans text-stone-900">

            {/* NAVIGATION */}


            {/* ── HERO ── */}
            <header className="relative min-h-[90vh] flex items-end justify-start overflow-hidden">
                <img  
                    src="/images/wording/main-modal.png"
                    alt="Policy Clauses Management System"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/30 to-transparent" />
                <div className="relative z-10 max-w-[1400px] w-full mx-auto px-10 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-blue-300 mb-5">
                            Novidea London &middot; Redesign
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-6">
                            Policy Clauses
                        </h1>
                        <p className="text-lg text-stone-300 max-w-xl leading-relaxed">
                            Optimizing policy document workflows effectively &mdash; redesigning the wording and clauses management system for London Market insurance brokers.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Edit Mode vs View Mode Visual */}
            <section className="py-28 bg-white">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative bg-white rounded-2xl p-3 border border-stone-200 shadow-2xl overflow-hidden">
                            <img  
                                src="/images/wording/main-modal.png"
                                alt="Modern Wording Management Interface"
                                className="w-full h-auto rounded-lg"
                            />
                            {/* Enterprise Badge */}
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">Enterprise Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                NEW FEATURES & REFINEMENTS
            ══════════════════════════════════════════ */}
            <section className="py-28 bg-stone-50 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-indigo-500 mb-5">Refined Interaction</p>
                        <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                            Advanced Management Logic
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Status Logic */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 flex flex-col group">
                            <h4 className="text-xl font-serif mb-4 group-hover:text-blue-600 transition-colors">Status Logic</h4>
                            <p className="text-sm text-stone-500 mb-8 leading-relaxed">
                                Automated status indicators (Active/Inactive) that respond dynamically to date ranges and versioning, reducing manual compliance checks.
                            </p>
                            <div className="mt-auto rounded-xl overflow-hidden border border-stone-100 shadow-sm">
                                <img   src="/images/wording/status-logic.png" alt="Status Logic" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>

                        {/* Version Indicators */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 flex flex-col group">
                            <h4 className="text-xl font-serif mb-4 group-hover:text-blue-600 transition-colors">Smart Indicators</h4>
                            <p className="text-sm text-stone-500 mb-8 leading-relaxed">
                                Visual alerts for outdated clauses, highlighting items that require broker attention or immediate version updates.
                            </p>
                            <div className="mt-auto rounded-xl overflow-hidden border border-stone-100 shadow-sm">
                                <img   src="/images/wording/version-indicators.png" alt="Version Indicators" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>

                        {/* Selection System */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 flex flex-col group">
                            <h4 className="text-xl font-serif mb-4 group-hover:text-blue-600 transition-colors">Bulk Selection</h4>
                            <p className="text-sm text-stone-500 mb-8 leading-relaxed">
                                Intuitive pill-based selection indicator that tracks multiple clause selections across different product categories.
                            </p>
                            <div className="mt-auto rounded-xl overflow-hidden border border-stone-100 shadow-sm">
                                <img   src="/images/wording/selection-pills.png" alt="Selection Pills" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coverage Form Support */}
            <section className="py-28 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-indigo-500 mb-5">Architecture Expansion</p>
                            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
                                Coverage Form Selection
                            </h2>
                            <p className="text-lg text-stone-600 leading-relaxed mb-6">
                                We expanded the system to support higher-level grouping through "Coverage Forms." Brokers can now select entire pre-defined forms in addition to individual clauses, significantly accelerating the policy document generation process.
                            </p>
                            <div className="flex items-center gap-4 py-4 px-6 bg-blue-50 border border-blue-100 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">!</div>
                                <p className="text-sm text-blue-800 font-medium">Added capability: Multi-level hierarchy support for complex London Market structures.</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
                                <img  
                                    src="/images/wording/coverage-form-selection.png"
                                    alt="Coverage Form Selection Logic"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── METADATA — gradient bridge from hero ── */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-white" />
                <div className="relative max-w-[1400px] mx-auto px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-3">Role</p>
                        <p className="text-base font-semibold">UX Research & Design</p>
                        <p className="text-stone-500 text-sm mt-1">Novidea London</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-3">Scope</p>
                        <p className="text-base font-semibold">UI / UX</p>
                        <p className="text-stone-500 text-sm mt-1">Figma / Coda</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-3">Timeline</p>
                        <p className="text-base font-semibold">18 Months</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-3">Domain</p>
                        <p className="text-base font-semibold">Insurtech &middot; London Market</p>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                BACKGROUND
            ══════════════════════════════════════════ */}
            <section className="py-28 border-b border-stone-100">
                <div className="max-w-3xl mx-auto px-10">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-indigo-500 mb-5">Background</p>
                    <h2 className="text-3xl md:text-4xl font-serif leading-snug mb-10">
                        Wording & Clauses Management System
                    </h2>
                    <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                        <p>
                            This project focused on redesigning the wording and clauses management system for a London Market insurance platform used by brokers to manage insurance policies. It plays a vital role in policy creation, offering access to pre-built components called clauses and wordings.
                        </p>
                        <p>
                            The redesign was prompted by urgent usability issues and technical instabilities affecting broker productivity and the policy issuance process. The project aimed to resolve these technical problems while enhancing the user experience to support modern workflows, introducing features like version control, agency-level automation, and precise clause positioning.
                        </p>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                THE PROBLEM — deep indigo instead of flat black
            ══════════════════════════════════════════ */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#1e1b4b] to-[#312e81]" />
                <div className="relative max-w-3xl mx-auto px-10 text-white">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-rose-400 mb-5">The Problem</p>
                    <h2 className="text-3xl md:text-4xl font-serif leading-snug mb-10">
                        A Major Bottleneck in Policy Creation
                    </h2>
                    <p className="text-lg text-indigo-200/70 leading-relaxed mb-16">
                        The current wording and clauses management system has become a major bottleneck in policy creation, causing critical pain points that impact daily operations and user satisfaction.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">Technical Instability</h4>
                            <p className="text-indigo-200/60 leading-relaxed">
                                Frequent bugs and crashes leading to unreliable workflows and diminished user confidence. Brokers faced data loss and unpredictable behavior, forcing them to rely on workarounds.
                            </p>
                        </div>
                        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">Workflow Inefficiency</h4>
                            <p className="text-indigo-200/60 leading-relaxed">
                                Excessive clicks and navigation for simple tasks like adding a clause or updating content, which slowed down policy creation significantly.
                            </p>
                        </div>
                        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">Poor Visibility</h4>
                            <p className="text-indigo-200/60 leading-relaxed">
                                No clear indicators of progress or whether actions were completed, leading to confusion and repeated clicks that introduced errors.
                            </p>
                        </div>
                        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-3">Missing Functionality</h4>
                            <p className="text-indigo-200/60 leading-relaxed">
                                No version control, no agency-level configurations, and no clause positioning control &mdash; forcing users to manually set the same preferences repeatedly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                SOLUTION DESIGN — soft gradient wash
            ══════════════════════════════════════════ */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-violet-50/40" />
                <div className="relative max-w-3xl mx-auto px-10">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-violet-500 mb-5">Insights</p>
                    <h2 className="text-3xl md:text-4xl font-serif leading-snug mb-10">
                        Solution Design
                    </h2>
                    <p className="text-lg text-stone-600 leading-relaxed mb-12">
                        The redesign initiative took a holistic approach to addressing both the immediate usability crisis and the long-term functional requirements of London Market brokers. The solution centered on creating a unified, intuitive interface that consolidates all clause management operations while addressing technical constraints through strategic architectural decisions.
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                DUAL-SCREEN ARCHITECTURE
            ══════════════════════════════════════════ */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-slate-50/80 to-white" />
                <div className="relative max-w-[1400px] mx-auto px-10">
                    <div className="max-w-3xl mb-16">
                        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-indigo-500 mb-5">Architecture</p>
                        <h2 className="text-3xl md:text-4xl font-serif leading-snug mb-8">
                            Dual-Screen Architecture
                        </h2>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            Following comprehensive user research and detailed needs mapping sessions with brokers, a critical architectural decision emerged that would fundamentally shape the user experience. Functionality was separated into two distinct operational modes, each optimized for specific user tasks and mental models.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* View Mode */}
                        <div>
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 rounded-full mb-4">View Mode</span>
                                <h3 className="text-xl font-serif mb-3">Read-Only Browsing</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    The primary interface for browsing, reviewing, and performing basic management operations on clauses. This read-only environment presents a clean, uncluttered interface that eliminates editing complexity and cognitive load for users who simply need to review policy components or search for specific clauses.
                                </p>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(79,70,229,0.08)] border border-indigo-100">
                                <img  
                                    src="/images/wc-view-mode-overview.png"
                                    alt="View Mode Screen architecture diagram"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        {/* Edit Mode */}
                        <div>
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-100/60 rounded-full mb-4">Edit Mode</span>
                                <h3 className="text-xl font-serif mb-3">Dedicated Editing</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    A dedicated editing environment accessed through a modal, containing comprehensive tools for modifying clause content. This creates a controlled space that prevents accidental modifications while giving editors a focused workspace.
                                </p>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(124,58,237,0.08)] border border-violet-100">
                                <img  
                                    src="/images/wc-edit-mode-overview.png"
                                    alt="Edit Mode Screen architecture diagram"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                FEATURE 1 — VIEW TABLE
            ══════════════════════════════════════════ */}
            <section className="py-28 border-b border-indigo-50">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                        <div className="lg:col-span-2">
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500 mb-5">Feature 01</p>
                            <h3 className="text-2xl md:text-3xl font-serif leading-snug mb-6">
                                Dual-View Table
                            </h3>
                            <p className="text-base text-stone-600 leading-relaxed mb-6">
                                We implemented a dual-view approach &mdash; a pattern we had already successfully applied elsewhere in the system &mdash; and brought it into the W&C display screen as well. Users can view the same data from two different perspectives, depending on their immediate need, and switch between them effortlessly.
                            </p>
                            <ul className="space-y-3 text-stone-600">
                                <li className="flex gap-3">
                                    <span className="text-blue-500 shrink-0 font-bold">&bull;</span>
                                    <span><strong className="text-stone-900">Product View</strong> &mdash; showing the concrete products included in the policy</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-500 shrink-0 font-bold">&bull;</span>
                                    <span><strong className="text-stone-900">Coverage Form View</strong> &mdash; grouping items by broader collections of clauses</span>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(79,70,229,0.08)] border border-indigo-100">
                                <img  
                                    src="/images/wc-dual-view-table.png"
                                    alt="Dual-view table with Coverage Form and Product grouping"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                FEATURE 2 — MANAGE CLAUSES MODAL
            ══════════════════════════════════════════ */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-slate-50/60 to-blue-50/30" />
                <div className="relative max-w-[1400px] mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                        <div className="lg:col-span-3 lg:order-1">
                            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(124,58,237,0.08)] border border-violet-100">
                                <img  
                                    src="/images/wc-manage-clauses-modal.png"
                                    alt="Manage Clauses modal with advanced filtering"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:order-2">
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-violet-500 mb-5">Feature 02</p>
                            <h3 className="text-2xl md:text-3xl font-serif leading-snug mb-6">
                                Manage Clauses Modal
                            </h3>
                            <p className="text-base text-stone-600 leading-relaxed mb-6">
                                A centralized management hub consolidating all clause operations in one interface, eliminating fragmented navigation. Features sophisticated search and filtering by Coverage Form, Legal Entity, Country, Insurer, Product, Date, Policy Type, and Taxes.
                            </p>
                            <ul className="space-y-3 text-stone-600">
                                <li className="flex gap-3">
                                    <span className="text-violet-500 shrink-0 font-bold">&bull;</span>
                                    <span><strong className="text-stone-900">Multi-filter support:</strong> Narrow results by any combination of attributes</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-violet-500 shrink-0 font-bold">&bull;</span>
                                    <span><strong className="text-stone-900">Bulk operations:</strong> Select All / Clear Selection for batch actions</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                FEATURE 3 — SELECTION INDICATION
            ══════════════════════════════════════════ */}
            <section className="py-28 border-b border-indigo-50">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                        <div className="lg:col-span-2">
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-indigo-500 mb-5">Feature 03</p>
                            <h3 className="text-2xl md:text-3xl font-serif leading-snug mb-6">
                                Selection Indication
                            </h3>
                            <p className="text-base text-stone-600 leading-relaxed mb-6">
                                We introduced a two-level indication system to improve clarity during selection. When a user selects an entire Coverage Form, they are shown a single consolidated chip representing the full selection. However, when they choose an individual Clause within a Coverage Form, the chip reflects only that specific clause &mdash; providing a more precise and transparent indication of their choice.
                            </p>
                            <p className="text-base text-stone-600 leading-relaxed">
                                This approach was necessary because users often switch between different Coverage Forms and selectively pick individual clauses rather than choosing a full form at once. Without clear differentiation, it would be difficult to track mixed selections, leading to confusion and potential errors.
                            </p>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(79,70,229,0.08)] border border-indigo-100">
                                <img  
                                    src="/images/wc-selection-indication.png"
                                    alt="Two-level selection indication with Coverage Form and individual Clause chips"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                FEATURE 4 — ACTION & INDICATION
            ══════════════════════════════════════════ */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-slate-50/60 to-indigo-50/30" />
                <div className="relative max-w-[1400px] mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                        <div className="lg:col-span-3 lg:order-1">
                            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(79,70,229,0.08)] border border-blue-100">
                                <img  
                                    src="/images/wc-view-table-card.png"
                                    alt="View table with action buttons and status indicators"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:order-2">
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500 mb-5">Feature 04</p>
                            <h3 className="text-2xl md:text-3xl font-serif leading-snug mb-6">
                                Action & Indication
                            </h3>
                            <p className="text-base text-stone-600 leading-relaxed mb-6">
                                From either view, users can easily access additional information about each clause, such as version history or jump directly into edit mode. This flexibility ensures that both high-level overviews and granular details are always just one click away.
                            </p>
                            <ul className="space-y-3 text-stone-600">
                                <li className="flex gap-3">
                                    <span className="text-blue-500 shrink-0 font-bold">&bull;</span>
                                    <span><strong className="text-stone-900">Version tracking:</strong> See version numbers and status at a glance</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-500 shrink-0 font-bold">&bull;</span>
                                    <span><strong className="text-stone-900">Inline status:</strong> Active/Inactive states with visual warnings</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-500 shrink-0 font-bold">&bull;</span>
                                    <span><strong className="text-stone-900">Clause behavior:</strong> Standalone, Regular, and Header & Footer modes clearly labeled</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                FEATURE 5 — EDIT MODE
            ══════════════════════════════════════════ */}
            <section className="py-28 border-b border-violet-50">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="max-w-3xl mb-12">
                        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-violet-500 mb-5">Feature 05</p>
                        <h3 className="text-2xl md:text-3xl font-serif leading-snug mb-6">
                            Edit Mode Screen
                        </h3>
                        <p className="text-base text-stone-600 leading-relaxed">
                            A dedicated editing environment accessed through a modal, containing comprehensive tools for modifying clause content. This separation reduces cognitive load by showing only relevant functionality, prevents unintended edits, and accommodates different user needs. Quick actions like version updates bridge both modes for workflow efficiency.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(124,58,237,0.08)] border border-violet-100">
                        <img  
                            src="/images/wc-edit-mode-screen.png"
                            alt="Edit Mode — full clause editing interface with filters and search"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                IMPACT — gradient echo of the hero
            ══════════════════════════════════════════ */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-violet-50/50" />
                <div className="relative max-w-3xl mx-auto px-10">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-indigo-500 mb-5">Impact</p>
                    <h2 className="text-3xl md:text-4xl font-serif leading-snug mb-12">
                        Outcomes & Results
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 text-center">
                            <div className="text-4xl font-serif text-indigo-600 mb-2">-60%</div>
                            <p className="text-stone-500 text-sm">Fewer clicks per workflow</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 text-center">
                            <div className="text-4xl font-serif text-indigo-600 mb-2">2</div>
                            <p className="text-stone-500 text-sm">Focused operational modes</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 text-center">
                            <div className="text-4xl font-serif text-indigo-600 mb-2">1</div>
                            <p className="text-stone-500 text-sm">Unified management hub</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex gap-3 items-start">
                            <span className="text-indigo-500 text-lg shrink-0 mt-0.5">&#10003;</span>
                            <p className="text-base text-stone-700">The dual-screen architecture eliminates confusion by presenting appropriately scoped interfaces</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="text-indigo-500 text-lg shrink-0 mt-0.5">&#10003;</span>
                            <p className="text-base text-stone-700">Version control and agency configurations systematize compliance and consistency</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="text-indigo-500 text-lg shrink-0 mt-0.5">&#10003;</span>
                            <p className="text-base text-stone-700">Streamlined interactions reduced policy creation time, directly impacting throughput and costs</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="text-indigo-500 text-lg shrink-0 mt-0.5">&#10003;</span>
                            <p className="text-base text-stone-700">Comprehensive validation catches errors early, significantly reducing error rates and rework</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <CaseStudyFooterTangle projectId={3} projectTitle="Policy Clauses" onBack={onBack} category="Enterprise" />
        </div>
    );
};
