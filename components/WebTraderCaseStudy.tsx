
import React from 'react';
import { motion } from 'framer-motion';
import { ZoomableImage } from './ZoomableImage';
import { CaseStudyFooterDiverge } from './CaseStudyFooterDiverge';


interface WebTraderCaseStudyProps {
    onBack: () => void;
}

export const WebTraderCaseStudy: React.FC<WebTraderCaseStudyProps> = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen font-sans text-stone-900">

            {/* NAVIGATION */}


            {/* ── HERO ── */}
            <header className="relative h-screen flex items-end justify-start bg-[#0a1628] overflow-hidden">
                <img  
                    src="/images/wt-hero.png"
                    alt="Web Trader"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />
                <div className="relative z-10 max-w-[1400px] w-full mx-auto px-container pb-16 md:pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >
                        <p className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-blue-400 mb-4 md:mb-5">
                            AvaTrade · 2023
                        </p>
                        <h1 className="text-[clamp(2.5rem,10vw,4.5rem)] font-serif text-white leading-[1.05] mb-6">
                            Web Trader
                        </h1>
                        <p className="text-base md:text-lg text-stone-300 max-w-xl leading-relaxed">
                            Redesigning a retail trading terminal — turning raw signal data into readable investment proposals, then unifying them with execution and account management.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* ── METADATA ── */}
            <section className="border-b border-stone-100 px-container">
                <div className="max-w-[1400px] mx-auto py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 md:mb-3">Role</p>
                        <p className="text-sm md:text-base font-semibold">Product Designer</p>
                        <p className="text-stone-500 text-[12px] md:text-sm mt-1">AvaTrade</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 md:mb-3">Scope</p>
                        <p className="text-sm md:text-base font-semibold">UX + UI</p>
                        <p className="text-stone-500 text-[12px] md:text-sm mt-1">Mobile + Desktop</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 md:mb-3">Year</p>
                        <p className="text-sm md:text-base font-semibold">2023</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 md:mb-3">Domain</p>
                        <p className="text-sm md:text-base font-semibold">Fintech · Trading</p>
                    </div>
                </div>
            </section>

            {/* ── ATMOSPHERIC SCROLL IMAGE ── */}
            <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-stone-100">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
                    style={{ 
                        backgroundImage: 'url(/images/wt-signal-detail.png)',
                    }}
                />
            </section>

            {/* ══════════════════════════════════════════
                PART 1 — SIGNALS
            ══════════════════════════════════════════ */}

            {/* ── THE PROBLEM ── */}
            <section className="py-24 md:py-32 bg-white px-container">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500 mb-4 block">Part 1 · Signals</span>
                            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-8 leading-tight">
                                Trading signals were a wall of numbers
                            </h2>
                            <div className="space-y-5 text-base md:text-lg text-stone-500 leading-relaxed">
                                <p>
                                    AvaTrade's signals arrived as raw data tables — signal produced time, type, entry price, stop loss, take profit, key levels. Traders had to mentally decode each row before making any decision.
                                </p>
                                <p>
                                    The challenge: turn that raw data into something a retail trader could read at a glance and act on confidently.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start relative z-10">
                            <div className="max-w-xl">
                                <ZoomableImage
                                    src="/images/wt-signal-before-after.png"
                                    alt="Source data table vs redesigned signal card"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="mt-4">
                                <p className="text-xs text-stone-400 font-medium italic">Source data → redesigned signal card</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── UNDERSTAND YOUR POSITION — sticky hole ── */}
            <div className="relative md:h-[200vh] z-10">
                <div className="md:sticky top-0 md:h-[100vh] bg-[#EEF4FF] overflow-visible">
                    <div className="w-full h-full flex items-center justify-center p-8 md:p-24">
                        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                            <ZoomableImage
                                src="/images/wt-position-explain.png"
                                alt="Signal detail — Understand your position"
                                className="w-full h-auto max-h-[70vh] object-contain shadow-2xl rounded-xl"
                            />
                            
                            {/* Text panel — moved back to a clear spot since zoom is now an overlay */}
                            <div className="absolute -bottom-8 right-0 md:-bottom-12 md:right-8 z-20">
                                <div className="max-w-[280px] bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 mb-4 block">Design Decision · 1</span>
                                    <h2 className="text-xl md:text-2xl font-serif mb-4 leading-snug">Understand your position</h2>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        Not the conventional trading chart. We simplified the data linearly — stop loss, entry, and take profit on one axis. Traders see instantly how much is at risk vs. how much can be gained.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAPPING & PRIORITISING ── */}
            <section className="py-24 md:py-32 bg-white px-container">
                <div className="max-w-[1400px] mx-auto">
                    <div className="max-w-2xl mb-12 md:mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Design Decision · 2</span>
                        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-6 leading-tight">
                            Mapping and prioritising data
                        </h2>
                        <p className="text-base md:text-lg text-stone-500 leading-relaxed">
                            We isolated the buy/sell recommendation — a binary decision — and made it visually dominant with colour. Every other data point was ranked by how often traders needed it and placed accordingly.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── DESIGN DECISION 3: TWO NUMBERS ── */}
            <section className="py-24 md:py-32 bg-stone-50 px-container overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">

                        {/* Annotated signal card — LEFT */}
                        <div className="relative rounded-2xl overflow-visible shadow-xl group max-w-md mx-auto lg:mx-0">
                            <img  
                                src="/images/wt-signal1-clean.png"
                                alt="Signal cards"
                                className="w-full h-auto block rounded-2xl"
                            />
                            {/* ... SVG annotations and labels same but responsive ... */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                viewBox="0 0 475 902"
                                preserveAspectRatio="none"
                            >
                                <rect x="288" y="228" width="94" height="38" rx="7" fill="none" stroke="#F59E0B" strokeWidth="2" />
                                <path d="M 335,266 V 295 H 470" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="24" y="400" width="88" height="42" rx="7" fill="none" stroke="#F59E0B" strokeWidth="2" />
                                <rect x="353" y="400" width="88" height="42" rx="7" fill="none" stroke="#F59E0B" strokeWidth="2" />
                                <line x1="112" y1="421" x2="353" y2="421" stroke="#F59E0B" strokeWidth="1.5" />
                                <line x1="441" y1="421" x2="470" y2="421" stroke="#F59E0B" strokeWidth="1.5" />
                            </svg>

                            {/* Label: Daily change */}
                            <div className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-[30%] -right-[10%] md:-right-[18%]">
                                <div className="bg-white rounded-lg px-2 py-1.5 md:px-3 md:py-2 shadow-md border-l-2 border-amber-400">
                                    <p className="text-[9px] md:text-[11px] font-bold text-stone-800 whitespace-nowrap">Daily change</p>
                                </div>
                            </div>

                            {/* Label: P&L gap */}
                            <div className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-[45%] -right-[8%] md:-right-[14%]">
                                <div className="bg-white rounded-lg px-2 py-1.5 md:px-3 md:py-2 shadow-md border-l-2 border-amber-400">
                                    <p className="text-[9px] md:text-[11px] font-bold text-stone-800 whitespace-nowrap">P&L gap</p>
                                </div>
                            </div>
                        </div>

                        {/* Text — RIGHT */}
                        <div className="lg:pl-16 text-center lg:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Design Decision · 3</span>
                            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-8 leading-tight">
                                Two numbers that changed scanning behaviour
                            </h2>
                            <div className="space-y-6 text-base md:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                <p>
                                    To help traders differentiate between signals at a glance, two key variables were added directly on the card face:
                                </p>
                                <div className="space-y-4 text-left">
                                    <div className="border-l-2 border-amber-400 pl-4">
                                        <p className="font-bold text-stone-900">The daily change</p>
                                        <p className="text-stone-500 text-sm md:text-base mt-1">The % movement since market open — lets traders quickly rank which signals are most active.</p>
                                    </div>
                                    <div className="border-l-2 border-amber-400 pl-4">
                                        <p className="font-bold text-stone-900">The profit and loss gap</p>
                                        <p className="text-stone-500 text-sm md:text-base mt-1">The distance between stop loss and take profit — the risk/reward ratio made visible without calculations.</p>
                                    </div>
                                </div>
                                <p>Traders could now rank all signals at a glance — without opening a single one.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SIGNAL RESULT — dark section ── */}
            <section className="py-24 md:py-32 bg-[#0a1628] text-white px-container">
                <div className="max-w-[1400px] mx-auto">
                    <div className="max-w-2xl mb-12 md:mb-16">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400 mb-4 block">Result · Signals</span>
                        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-6 leading-tight">
                            From a data table to a clear proposal
                        </h2>
                        <p className="text-base md:text-lg text-stone-400 leading-relaxed">
                            Each signal became a self-contained investment card — entry, exit, profit gap, and confidence, all readable in seconds.
                        </p>
                    </div>

                    {/* Full before/after image */}
                    <div className="rounded-3xl overflow-hidden border border-white/10 mb-8">
                        <img  
                            src="/images/wt-signal-before-after.png"
                            alt="From raw data table to redesigned signal card"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* 3 mobile mockups below */}
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

            <section className="py-24 md:py-32 bg-white px-container overflow-visible">
                <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
                    <div className="max-w-3xl mb-16 md:mb-24">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-4 block">Part 2 · Web Trader Platform</span>
                        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-serif mb-8 leading-tight">
                            Bringing signals inside the terminal
                        </h2>
                        <p className="text-base md:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
                            Once the signal format was solved, the next challenge was embedding it into the trading terminal — so traders could act immediately without switching apps.
                        </p>
                    </div>
                    
                    <div className="w-full relative z-20">
                        <ZoomableImage
                            src="/images/wt-full-platform.png"
                            alt="Full Web Trader platform with integrated signals"
                            className="w-full h-auto rounded-2xl shadow-2xl border border-stone-100"
                            zoomLevel={2}
                        />
                    </div>
                </div>
            </section>

            {/* ── ACCOUNT MANAGEMENT ── */}
            <section className="py-24 md:py-32 bg-stone-50 px-container">
                <div className="max-w-[1400px] mx-auto">
                    <div className="max-w-2xl mb-12 md:mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Account Management</span>
                        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-6 leading-tight">Fixing the mobile safety issues first</h2>
                        <p className="text-base md:text-lg text-stone-500 leading-relaxed">
                            Research showed mobile users were accidentally logging out during high-volatility moments. We restructured the account panel before touching anything else.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img   src="/images/wt-side-menu.png" alt="Redesigned account side menu" className="w-full h-auto" />
                            <div className="bg-white px-6 py-4 border-t border-stone-100">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Mobile</p>
                                <p className="text-sm font-medium text-stone-700">Restructured account panel — Log Out moved away from thumb zone</p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img   src="/images/wt-account-switcher.png" alt="Account switcher — Demo vs Real" className="w-full h-auto" />
                            <div className="bg-white px-6 py-4 border-t border-stone-100">
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Desktop + Mobile</p>
                                <p className="text-sm font-medium text-stone-700">Demo / Real account switching — zero ambiguity on active wallet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DESKTOP PLATFORM ── */}
            <section className="py-24 md:py-32 bg-white px-container">
                <div className="max-w-[1400px] mx-auto">
                    <div className="max-w-2xl mb-12 md:mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-4 block">Desktop</span>
                        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-6 leading-tight">Navigation hierarchy for power users</h2>
                        <p className="text-base md:text-lg text-stone-500 leading-relaxed">
                            Desktop users needed deep filtering and quick symbol switching without leaving the chart. We split the left rail into execution tools (top) and settings (bottom).
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-100">
                        <img   src="/images/wt-desktop-nav.png" alt="Desktop platform navigation" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* ── ITERATIONS ── */}
            <section className="py-24 md:py-32 bg-[#0a1628] px-container">
                <div className="max-w-[1400px] mx-auto">
                    <div className="max-w-2xl mb-12 md:mb-16">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-4 block">Process</span>
                        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif text-white mb-4">Several directions were tested</h2>
                        <p className="text-stone-400 text-base md:text-lg leading-relaxed">Across multiple iterations of signal format, layout density, and colour system before landing on the final direction.</p>
                    </div>
                    <div className="rounded-3xl overflow-hidden border border-white/10">
                        <img   src="/images/wt-iterations.png" alt="Design iterations" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* ── OUTCOME ── */}
            <section className="py-24 md:py-32 bg-white px-container">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-4 block">Outcome</span>
                        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-6">One platform. No switching.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { title: 'Signals traders could read', body: 'Turning a raw data table into a visual investment proposal made signals accessible to retail traders who think in intuition, not spreadsheets.' },
                            { title: 'Zero context-switching', body: 'Signals, execution, and account management live in the same terminal. Traders never need to leave to act on an opportunity.' },
                            { title: 'Mobile-safe by design', body: 'Accidental logouts eliminated. The account panel restructuring addressed the top mobile pain point without adding friction.' },
                        ].map((item) => (
                            <div key={item.title} className="border-t-2 border-stone-100 pt-8 space-y-3">
                                <h4 className="text-lg md:text-xl font-serif font-bold">{item.title}</h4>
                                <p className="text-sm md:text-base text-stone-500 leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CaseStudyFooterDiverge projectId={2} projectTitle="Web Trader" onBack={onBack} category="Fintech · Trading" />
        </div>
    );
};
