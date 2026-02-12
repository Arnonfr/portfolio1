
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ProjectNavigation } from './ProjectNavigation';

interface WebTraderCaseStudyProps {
    onBack: () => void;
}

export const WebTraderCaseStudy: React.FC<WebTraderCaseStudyProps> = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen font-sans text-stone-900">

            {/* NAVIGATION */}
            <nav className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-difference text-white">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft size={24} />
                    <span className="text-sm font-bold tracking-widest uppercase">Back</span>
                </button>
            </nav>

            {/* ── HERO ── */}
            <header className="relative h-screen flex items-end justify-start bg-[#0a1628] overflow-hidden">
                <img
                    src="/images/wt-hero.png"
                    alt="Web Trader"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />
                <div className="relative z-10 max-w-[1400px] w-full mx-auto px-10 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-blue-400 mb-5">
                            AvaTrade · 2023
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.05] mb-6">
                            Web Trader
                        </h1>
                        <p className="text-lg text-stone-300 max-w-xl leading-relaxed">
                            Redesigning a retail trading terminal — turning raw signal data into readable investment proposals, then unifying them with execution and account management.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* ── METADATA ── */}
            <section className="border-b border-stone-100">
                <div className="max-w-[1400px] mx-auto px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Role</p>
                        <p className="text-base font-semibold">Product Designer</p>
                        <p className="text-stone-500 text-sm mt-1">AvaTrade</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Scope</p>
                        <p className="text-base font-semibold">UX + UI</p>
                        <p className="text-stone-500 text-sm mt-1">Mobile + Desktop</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Year</p>
                        <p className="text-base font-semibold">2023</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Domain</p>
                        <p className="text-base font-semibold">Fintech · Trading</p>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                PART 1 — SIGNALS
            ══════════════════════════════════════════ */}

            {/* ── THE PROBLEM ── */}
            <section className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500 mb-4 block">Part 1 · Signals</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                                Trading signals were a wall of numbers
                            </h2>
                            <div className="space-y-5 text-lg text-stone-500 leading-relaxed">
                                <p>
                                    AvaTrade's signals arrived as raw data tables — signal produced time, type, entry price, stop loss, take profit, key levels. Traders had to mentally decode each row before making any decision.
                                </p>
                                <p>
                                    The challenge: turn that raw data into something a retail trader could read at a glance and act on confidently.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
                            <img
                                src="/images/wt-signal-before-after.png"
                                alt="Source data table vs redesigned signal card"
                                className="w-full h-auto"
                            />
                            <div className="px-6 py-4 border-t border-stone-100">
                                <p className="text-xs text-stone-400 font-medium">Source data → redesigned signal card</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── UNDERSTAND YOUR POSITION — sticky hole ── */}
            {/*
                The image doesn't scroll — it's pinned between two white sections.
                height: 200vh container gives 100vh of scroll where the image holds.
            */}
            <div style={{ height: '200vh', position: 'relative' }}>
                <div
                    style={{
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                        overflow: 'hidden',
                        backgroundColor: '#EEF4FF',
                    }}
                >
                    <img
                        src="/images/wt-position-explain.png"
                        alt="Signal detail — Understand your position"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />

                    {/* Text panel overlaid on right side */}
                    <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
                        <div className="w-full max-w-[1400px] mx-auto px-10 flex justify-end">
                            <div className="max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl pointer-events-auto">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-4 block">Design Decision · 1</span>
                                <h2 className="text-2xl font-serif mb-4 leading-snug">Understand your position</h2>
                                <p className="text-stone-600 leading-relaxed text-sm">
                                    Not the conventional trading chart. We simplified the data linearly — stop loss, entry, and take profit on one axis. Traders see instantly how much is at risk vs. how much can be gained.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAPPING & PRIORITISING ── */}
            <section className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="max-w-2xl mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Design Decision · 2</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                            Mapping and prioritising data
                        </h2>
                        <p className="text-lg text-stone-500 leading-relaxed">
                            We isolated the buy/sell recommendation — a binary decision — and made it visually dominant with colour. Every other data point was ranked by how often traders needed it and placed accordingly.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-lg">
                        <img
                            src="/images/wt-signal-detail.png"
                            alt="Mapping and prioritising signal data"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* ── DESIGN DECISION 3: TWO NUMBERS ── */}
            <section className="py-32 bg-stone-50">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <div className="pt-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Design Decision · 3</span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                                Two numbers that changed scanning behaviour
                            </h2>
                            <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                                <p>
                                    To help traders differentiate between signals at a glance, two key variables were added directly on the card face:
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 border-l-2 border-amber-400 pl-4">
                                        <div>
                                            <p className="font-bold text-stone-900">The daily change</p>
                                            <p className="text-stone-500 text-base mt-1">The % movement since market open — lets traders quickly rank which signals are most active.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 border-l-2 border-amber-400 pl-4">
                                        <div>
                                            <p className="font-bold text-stone-900">The profit and loss gap</p>
                                            <p className="text-stone-500 text-base mt-1">The distance between stop loss and take profit — the risk/reward ratio made visible without calculations.</p>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Traders could now rank all signals at a glance — without opening a single one.
                                </p>
                            </div>
                        </div>

                        {/* Annotated signal card image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/images/wt-signal-cards.png"
                                alt="Signal cards — annotated"
                                className="w-full h-auto block"
                            />

                            {/*
                                SVG annotation overlay — viewBox matches SIde1.png native size (591 × 902)
                                Lines point from key card elements to label tags.
                                preserveAspectRatio="none" scales lines with the image.
                            */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                viewBox="0 0 591 902"
                                preserveAspectRatio="none"
                            >
                                {/* Daily change — points to % badge top-right of card */}
                                <line x1="468" y1="198" x2="555" y2="170" stroke="#F59E0B" strokeWidth="2" />
                                <circle cx="468" cy="198" r="5" fill="#F59E0B" />

                                {/* P&L gap — points to stop loss / take profit row */}
                                <line x1="440" y1="445" x2="555" y2="420" stroke="#F59E0B" strokeWidth="2" />
                                <circle cx="440" cy="445" r="5" fill="#F59E0B" />
                            </svg>

                            {/* Label: daily change — positioned at ~18% from top, right edge */}
                            <div
                                className="absolute pointer-events-none"
                                style={{ top: '16%', right: '3%' }}
                            >
                                <div className="bg-white rounded-lg px-3 py-2 shadow-md border-l-2 border-amber-400">
                                    <p className="text-[11px] font-bold text-stone-800 whitespace-nowrap">Daily change</p>
                                </div>
                            </div>

                            {/* Label: P&L gap — positioned at ~43% from top, right edge */}
                            <div
                                className="absolute pointer-events-none"
                                style={{ top: '42%', right: '3%' }}
                            >
                                <div className="bg-white rounded-lg px-3 py-2 shadow-md border-l-2 border-amber-400">
                                    <p className="text-[11px] font-bold text-stone-800 whitespace-nowrap">P&L gap</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SIGNAL RESULT — dark section, all 3 mobile views ── */}
            <section className="py-32 bg-[#0a1628] text-white">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="max-w-2xl mb-16">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400 mb-4 block">Result · Signals</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                            From a data table to a clear proposal
                        </h2>
                        <p className="text-lg text-stone-400 leading-relaxed">
                            Each signal became a self-contained investment card — entry, exit, profit gap, and confidence, all readable in seconds.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#0f1e35] p-4">
                            <img
                                src="/images/wt-signals-mobile.png"
                                alt="Signal list — mobile"
                                className="max-h-[580px] w-auto object-contain"
                            />
                        </div>
                        <div className="rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#0f1e35] p-4">
                            <img
                                src="/images/wt-signals-list.png"
                                alt="Signal cards list"
                                className="max-h-[580px] w-auto object-contain"
                            />
                        </div>
                        <div className="rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#0f1e35] p-4">
                            <img
                                src="/images/wt-signal-cards.png"
                                alt="Signal card components"
                                className="max-h-[580px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                PART 2 — WEB TRADER PLATFORM
            ══════════════════════════════════════════ */}

            <section className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-4 block">Part 2 · Web Trader Platform</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                            Bringing signals inside the terminal
                        </h2>
                        <p className="text-lg text-stone-500 leading-relaxed">
                            Once the signal format was solved, the next challenge was embedding it into the trading terminal — so traders could act immediately without switching apps.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── ACCOUNT MANAGEMENT ── */}
            <section className="py-32 bg-stone-50">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="max-w-2xl mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Account Management</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Fixing the mobile safety issues first</h2>
                        <p className="text-lg text-stone-500 leading-relaxed">
                            Research showed mobile users were accidentally logging out during high-volatility moments. We restructured the account panel before touching anything else.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img src="/images/wt-side-menu.png" alt="Redesigned account side menu" className="w-full h-auto" />
                            <div className="bg-white px-6 py-4 border-t border-stone-100">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Mobile</p>
                                <p className="text-sm font-medium text-stone-700">Restructured account panel — Log Out moved away from thumb zone</p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img src="/images/wt-account-switcher.png" alt="Account switcher — Demo vs Real" className="w-full h-auto" />
                            <div className="bg-white px-6 py-4 border-t border-stone-100">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Desktop + Mobile</p>
                                <p className="text-sm font-medium text-stone-700">Demo / Real account switching — zero ambiguity on active wallet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DESKTOP PLATFORM ── */}
            <section className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="max-w-2xl mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-4 block">Desktop</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Navigation hierarchy for power users</h2>
                        <p className="text-lg text-stone-500 leading-relaxed">
                            Desktop users needed deep filtering and quick symbol switching without leaving the chart. We split the left rail into execution tools (top) and settings (bottom).
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-100">
                        <img src="/images/wt-desktop-nav.png" alt="Desktop platform navigation" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* ── ITERATIONS ── */}
            <section className="py-32 bg-[#0a1628]">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="max-w-2xl mb-16">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-4 block">Process</span>
                        <h2 className="text-4xl font-serif text-white mb-4">Several directions were tested</h2>
                        <p className="text-stone-400 text-lg leading-relaxed">Across multiple iterations of signal format, layout density, and colour system before landing on the final direction.</p>
                    </div>
                    <div className="rounded-3xl overflow-hidden border border-white/10">
                        <img src="/images/wt-iterations.png" alt="Design iterations" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* ── OUTCOME ── */}
            <section className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Outcome</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">One platform. No switching.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Signals traders could read', body: 'Turning a raw data table into a visual investment proposal made signals accessible to retail traders who think in intuition, not spreadsheets.' },
                            { title: 'Zero context-switching', body: 'Signals, execution, and account management live in the same terminal. Traders never need to leave to act on an opportunity.' },
                            { title: 'Mobile-safe by design', body: 'Accidental logouts eliminated. The account panel restructuring addressed the top mobile pain point without adding friction.' },
                        ].map((item) => (
                            <div key={item.title} className="border-t-2 border-stone-100 pt-8 space-y-3">
                                <h4 className="text-xl font-serif font-bold">{item.title}</h4>
                                <p className="text-stone-500 leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <section className="py-24 bg-stone-50 text-center border-t border-stone-100">
                <button
                    onClick={onBack}
                    className="px-10 py-4 bg-black text-white rounded-full font-bold text-sm tracking-wide hover:bg-stone-800 transition-all"
                >
                    ← Back to Projects
                </button>
                <div className="mt-16">
                    <ProjectNavigation currentProjectId={2} variant="light" />
                </div>
            </section>
        </div>
    );
};
