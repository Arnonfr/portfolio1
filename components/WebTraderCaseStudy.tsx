import React from 'react';
import { CaseStudyFooter } from './CaseStudyFooter';

interface WebTraderCaseStudyProps {
    onBack: () => void;
}

const featureBreakdowns = [
    {
        id: '01',
        label: 'Signals List',
        title: 'Turn a signal into an investment proposal',
        feature: 'A scrollable list of cards instead of a table-like signal feed.',
        representation: 'Each signal becomes a compact proposal with asset identity, buy or sell direction, validity, production date, and the key numbers needed for comparison.',
        rationale: 'The user no longer has to interpret which values matter first. The card hierarchy puts the trading decision first, then supports it with timing and context.',
        image: '/images/Group 26812.png',
        alt: 'Figma screenshot showing source fields mapped into the redesigned card header',
    },
    {
        id: '02',
        label: 'Risk Range',
        title: 'Make the risk boundaries visible',
        feature: 'The detail screen turns stop loss, entry price, pivot, support, and resistance into one readable trading range.',
        representation: 'The range uses familiar trading conventions: support and resistance sit on opposite sides, while the current price and recommendation are anchored on the same visual axis.',
        rationale: 'The trader can understand where the signal suggests placing the investment boundaries without calculating the relationship between disconnected numbers.',
        image: '/images/Full1.png',
        alt: 'Figma screenshot showing source signal data transformed into a linear risk range',
    }
];

const processSteps = [
    { id: '01', label: 'Audit', description: 'Map existing data and trading conventions.' },
    { id: '02', label: 'Deconstruct', description: 'Split raw data into discrete information pieces.' },
    { id: '03', label: 'Prioritize', description: 'Rank by what the trader needs first.' },
    { id: '04', label: 'Sketch', description: 'Turn values into a single readable object.' },
    { id: '05', label: 'Validate', description: 'Test with traders under time pressure.' },
    { id: '06', label: 'Deliver', description: 'Each signal reads as a decision.' },
];

export const WebTraderCaseStudy: React.FC<WebTraderCaseStudyProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#f6f2ec] font-sans text-stone-900">
            <section className="relative overflow-hidden border-b border-[#eadfce] bg-white px-container pb-0 pt-32 md:pt-48">
                <div className="absolute inset-0 pointer-events-none">
                    <img src="/images/alt-sky-bg.png" alt="" className="h-[70%] w-full object-cover object-bottom opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
                </div>

                <div className="relative mx-auto flex max-w-[1320px] flex-col items-center text-center">
                    <div className="max-w-[704px]">
                        <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.45em] text-[#9b6a3d]">AvaTrade Case Study</p>
                        <h1 className="mb-8 font-serif text-[56px] leading-none tracking-[-0.03em] text-[#2d2424] md:text-[80px]">
                            Investment
                            <span className="italic text-[#a84127]"> Signals</span>
                        </h1>
                        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#7a6b6b]">
                            A breakdown of how the signals redesign translates trading data into clearer decisions, one feature at a time.
                        </p>
                        <div className="mx-auto mt-12 grid max-w-[620px] grid-cols-2 gap-8 text-sm md:grid-cols-4">
                            {[
                                ['Role', 'Product Designer'],
                                ['Platform', 'Mobile App'],
                                ['Company', 'AvaTrade'],
                                ['Year', '2022'],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-stone-400">{label}</p>
                                    <p className="font-medium text-stone-800">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative mt-20 w-full max-w-[760px] overflow-hidden rounded-t-[2rem]">
                        <img
                            src="/images/Header.png"
                            alt="Figma mockup of the stock signals detail screen"
                            className="h-auto w-full shadow-[0_45px_120px_rgba(36,31,29,0.18)]"
                        />
                    </div>
                </div>
            </section>

            <section className="px-container py-20 md:py-24">
                <div className="mx-auto max-w-[1320px]">
                    {/* Centered header text */}
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-stone-400">Design Logic</p>
                        <h2 className="mb-8 font-serif text-[48px] leading-none text-[#241f1d] md:text-[70px]">
                            Break the redesign into readable moves
                        </h2>
                        <div className="space-y-5 text-lg leading-relaxed text-stone-600">
                            <p>
                                The value of this project is not only the final screen. It is the sequence of design decisions that made the screen easier to understand.
                            </p>
                            <p>
                                Each feature below is presented as a small argument: what changed, how it is represented in the interface, and why that representation makes sense for a trader.
                            </p>
                        </div>
                    </div>

                    {/* Flow chart */}
                    <div className="relative">
                        {/* Horizontal connecting line */}
                        <div className="absolute left-0 right-0 top-[27px] hidden h-[1px] bg-[#d6c4a8]/40 md:block" />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                            {processSteps.map((step, i) => (
                                <div key={step.id} className="relative flex flex-col items-center text-center">
                                    {/* Step number circle */}
                                    <div className="relative z-10 mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#d6c4a8]/50 bg-[#f6f2ec] text-sm font-bold tracking-[0.12em] text-[#9b6a3d]">
                                        {step.id}
                                    </div>
                                    {/* Label */}
                                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-stone-500">
                                        {step.label}
                                    </p>
                                    {/* Description */}
                                    <p className="max-w-[160px] text-xs leading-relaxed text-stone-500">
                                        {step.description}
                                    </p>
                                    {/* Down arrow on mobile */}
                                    {i < processSteps.length - 1 && (
                                        <div className="mt-4 flex h-6 items-center justify-center md:hidden">
                                            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="text-[#d6c4a8]">
                                                <path d="M6 0v18m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="1.2" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#2f2117] px-container py-16 text-[#fff7ea] md:py-24">
                <div className="mx-auto max-w-[1320px]">
                    <div className="mb-6">
                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#e5ad64]">Structure</p>
                        <h2 className="font-serif text-[48px] leading-none md:text-[70px]">
                            Source data, reorganized into a decision flow
                        </h2>
                    </div>

                    <p className="mb-14 max-w-lg text-sm leading-relaxed text-[#e9cfaa]/70">
                        A design process grounded in trading conventions to help users read proposed positions at a glance.
                    </p>

                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
                        <div className="flex flex-col items-center">
                            <p className="mb-6 text-lg font-light tracking-wide text-white/70">Source</p>
                            <img
                                src="/images/wt-signal-source.png"
                                alt="Raw source signal data table"
                                className="block h-auto w-full max-w-[405px]"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="mb-6 text-lg font-light tracking-wide text-white/70">Result</p>
                            <img
                                src="/images/wt-signal-result.png"
                                alt="Redesigned signal card with EURUSD trading data"
                                className="block h-auto w-full max-w-[523px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CARD BREAKDOWN: Part 1 — Header ── */}
            <section className="bg-[#0d1921] px-container py-16 text-[#fff7ea] md:py-24">
                <div className="mx-auto max-w-[1320px]">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
                        {/* Image */}
                        <div className="flex justify-center">
                            <img
                                src="/images/wt-signal-header.png"
                                alt="Signal card header"
                                className="h-auto max-w-sm"
                            />
                        </div>

                        {/* Text */}
                        <div>
                            <h2 className="mb-6 font-serif text-[42px] leading-tight md:text-[56px]">
                                What the top tells you
                            </h2>
                            <p className="mb-8 text-base leading-relaxed text-[#f8e6c8]/70 md:text-lg">
                                Three variables sit at the head of every card: the trading direction (Buy or Sell), the validity window (Daily, Weekly, or Monthly), and the production timestamp. The direction is always dominant — coloured green or red for instant recognition. The rest anchor the recommendation in time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CARD BREAKDOWN: Part 2 — Risk Range Gauge ── */}
            <section className="bg-[#101923] px-container py-16 text-[#fff7ea] md:py-24">
                <div className="mx-auto max-w-[1320px]">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
                        {/* Text */}
                        <div>
                            <h2 className="mb-6 font-serif text-[42px] leading-tight md:text-[56px]">
                                The risk range, at a glance
                            </h2>
                            <p className="text-base leading-relaxed text-[#f8e6c8]/70 md:text-lg">
                                Once a signal is selected, the detail screen unfolds the full picture: where to place the stop loss, where the current price sits, where support and resistance live. All of it mapped onto a single linear gauge so traders see the trading range without calculation.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="flex justify-center">
                            <img
                                src="/images/wt-signal-gauge.png"
                                alt="Linear gauge showing support, resistance, current price, and entry point"
                                className="h-auto max-w-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CARD BREAKDOWN: Part 3 — Comparison ── */}
            <section className="bg-[#0d1921] px-container py-16 text-[#fff7ea] md:py-24">
                <div className="mx-auto max-w-[1320px]">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Image */}
                        <div className="flex justify-center">
                            <div className="group relative max-w-sm">
                                <img
                                    src="/images/wt-signal-batch.png"
                                    alt="Signal cards list"
                                    className="h-auto w-full transition-opacity duration-300"
                                />
                                <img
                                    src="/images/wt-signal-batch-hover.png"
                                    alt="Highlighted comparison areas"
                                    className="absolute inset-0 h-auto w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>
                        </div>

                        {/* Text */}
                        <div>
                            <h2 className="mb-6 font-serif text-[42px] leading-tight md:text-[56px]">
                                Add two variables that improve list scanning
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { label: 'Daily change', desc: 'The percentage movement since market open — tells traders which signals are most active right now.' },
                                    { label: 'P&L gap', desc: 'The distance between stop loss and take profit — the risk/reward ratio visible without math.' },
                                    { label: 'Direction colour', desc: 'Green for Buy, red for Sell — paired with the asset\'s own live movement to show momentum at a glance.' },
                                    { label: 'Profit potential', desc: 'The take profit amount sits alongside stop loss so traders see the trade shape instantly.' },
                                ].map(({ label, desc }) => (
                                    <div key={label} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-[#f4c46f] margin-top-1" />
                                        <div>
                                            <p className="mb-1 text-sm font-bold uppercase tracking-[0.3em] text-[#f4c46f]">{label}</p>
                                            <p className="text-base leading-relaxed text-[#f8e6c8]/65">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PROCESS: ITERATIONS & LEARNING ── */}
            <section className="bg-[#101923] px-container py-20 text-[#fff7ea] md:py-24">
                <div className="mx-auto max-w-[1320px]">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
                        {/* Text on left */}
                        <div>
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-[#f4c46f]">Process</p>
                            <h2 className="mb-8 font-serif text-[42px] leading-tight md:text-[56px]">
                                Learning from alternative approaches
                            </h2>

                            <p className="text-base leading-relaxed text-[#f8e6c8]/70 md:text-lg">
                                Before landing on the linear gauge, we explored other shapes to represent the trading range. Some leaned on conventions traders already knew — candlestick patterns, stacked lists. Others broke from convention entirely. The sketches show two of these attempts. From them, I learned that innovation in fintech is not about inventing a new language. It\'s about knowing which conventions to follow and which to reshape.
                            </p>
                        </div>

                        {/* Images on right */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col items-center">
                                <p className="mb-4 text-sm font-light tracking-wide text-[#f8e6c8]/50">Attempt 1: Familiar structure</p>
                                <div className="overflow-hidden rounded-lg border border-white/10 w-full">
                                    <img
                                        src="/images/wt-iterations-sketch1.png"
                                        alt="Sketch 1: Alternative approach using familiar list structure"
                                        className="h-auto w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="mb-4 text-sm font-light tracking-wide text-[#f8e6c8]/50">Attempt 2: Conventional graph</p>
                                <div className="overflow-hidden rounded-lg border border-white/10 w-full">
                                    <img
                                        src="/images/wt-iterations-sketch2.png"
                                        alt="Sketch 2: Alternative approach using conventional graphing"
                                        className="h-auto w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <CaseStudyFooter projectId={2} onBack={onBack} category="Fintech" />
        </div>
    );
};
