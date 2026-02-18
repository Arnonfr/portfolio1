
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HomeAlternative: React.FC = () => {
    return (
        <div className="bg-[#f9f9f7] min-h-screen text-[#0d0d0b] font-sans selection:bg-[#0d0d0b] selection:text-[#f9f9f7] overflow-x-hidden">
            {/* ASYMMETRIC HEADER */}
            <nav className="p-8 flex justify-between items-baseline border-b-2 border-[#0d0d0b]">
                <h2 className="text-2xl font-bold tracking-tighter">ARNON.</h2>
                <div className="flex gap-12 text-sm font-bold uppercase tracking-widest">
                    <Link to="/" className="hover:line-through">[ V1 ]</Link>
                    <a href="#work" className="hover:line-through">WORK</a>
                    <a href="#about" className="hover:line-through">INFO</a>
                </div>
            </nav>

            {/* ABUSIVE HERO */}
            <section className="relative pt-32 pb-48 px-8 grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-12 items-end">
                <div>
                    <motion.h1
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                        className="text-[clamp(4rem,15vw,18rem)] leading-[0.85] tracking-[-0.05em] font-serif"
                    >
                        DESIGN<br />LEADER
                    </motion.h1>
                    <div className="mt-12 max-w-xl">
                        <p className="text-2xl leading-tight font-medium">
                            I build high-stakes fintech systems and insurtech architectures. Author of human-centric interfaces in an automated world.
                        </p>
                    </div>
                </div>
                <div className="lg:border-l-2 lg:border-[#0d0d0b] lg:pl-12 lg:pb-12">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-stone-400">// CURRENT FOCUS</p>
                    <p className="text-lg leading-relaxed mb-8">
                        Leading product at Novidea. Simplifying the complex legacy workflows of global insurance markets.
                    </p>
                    <Link to="/work/2" className="inline-block bg-[#0d0d0b] text-[#f9f9f7] px-8 py-4 font-bold uppercase tracking-widest hover:scale-[1.05] transition-transform">
                        [ VIEW LATEST WORK ]
                    </Link>
                </div>
            </section>

            {/* RECENT WORK - INTENTIONAL FRICTION */}
            <section id="work" className="border-t-2 border-[#0d0d0b] pt-24 pb-48 px-8">
                <div className="flex justify-between items-baseline mb-24">
                    <h2 className="text-6xl font-serif">Selected Artifacts</h2>
                    <span className="text-xs font-bold tracking-[0.5em] text-stone-400">01 — 03</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-48">
                    {/* WEB TRADER */}
                    <div className="group relative">
                        <Link to="/work/2">
                            <div className="aspect-[4/5] bg-stone-200 overflow-hidden mb-8 border-2 border-[#0d0d0b]">
                                <img  
                                    src="/images/web-trader-hero.png"
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    alt="Web Trader"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-4xl font-serif mb-2 group-hover:italic transition-all">Web Trader</h3>
                                    <p className="text-sm font-bold uppercase tracking-widest text-stone-500">Ava Trade / 2018 — 2021</p>
                                </div>
                                <span className="text-2xl font-serif">/02</span>
                            </div>
                        </Link>
                    </div>

                    {/* CLAIM MOVEMENTS - OVERLAP */}
                    <div className="lg:mt-64 group relative">
                        <Link to="/work/1">
                            <div className="aspect-square bg-stone-200 overflow-hidden mb-8 border-2 border-[#0d0d0b] relative z-10">
                                <img  
                                    src="/images/claim-movements-hero.png"
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    alt="Claim Movements"
                                />
                            </div>
                            <div className="absolute -top-12 -right-12 w-64 h-64 border-2 border-[#0d0d0b] -z-0 bg-[#0d0d0b]/5 pointer-events-none group-hover:rotate-12 transition-transform duration-700"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-4xl font-serif mb-2 group-hover:italic transition-all">Claim Movements</h3>
                                    <p className="text-sm font-bold uppercase tracking-widest text-stone-500">Novidea / 2023</p>
                                </div>
                                <span className="text-2xl font-serif">/01</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER - TECHNICAL */}
            <footer className="bg-[#0d0d0b] text-[#f9f9f7] p-12 text-center border-t-2 border-[#0d0d0b]">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-5xl md:text-8xl font-serif leading-none italic">Let's build something specifically meaningful.</h2>
                    <div className="flex flex-wrap justify-center gap-12 font-bold uppercase tracking-[0.2em] text-sm">
                        <a href="mailto:arnon7700@gmail.com" className="hover:line-through underline decoration-stone-500 underline-offset-8">Email</a>
                        <a href="#" className="hover:line-through underline decoration-stone-500 underline-offset-8">LinkedIn</a>
                        <a href="#" className="hover:line-through underline decoration-stone-500 underline-offset-8">CV.PDF</a>
                    </div>
                    <p className="text-[10px] tracking-[0.5em] text-stone-500 mt-24">© 2024 ARNON FRIEDMAN // BUILT TO LAST</p>
                </div>
            </footer>
        </div>
    );
};
