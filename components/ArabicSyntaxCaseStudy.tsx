
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CaseStudyFooter } from './CaseStudyFooter';

interface ArabicSyntaxCaseStudyProps {
  onBack: () => void;
}

const EASE_POWER: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ───────────────────────────────────────────────────────────
// FADE IN — Scroll-triggered fade + slide
// ───────────────────────────────────────────────────────────
const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}> = ({ children, className = '', delay = 0, y = 30 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE_POWER }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ───────────────────────────────────────────────────────────
// TEXT REVEAL — Mask animation for headings
// ───────────────────────────────────────────────────────────
const TextReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: EASE_POWER }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────
// FRAMED IMAGE — Mockup-style with rounded corners + shadow
// ───────────────────────────────────────────────────────────
const FramedImage: React.FC<{
  src: string;
  alt: string;
  label?: string;
  large?: boolean;
  dark?: boolean;
  className?: string;
}> = ({ src, alt, label, large = false, dark = false, className = '' }) => (
  <div className={`relative group ${className}`}>
    <div
      className={`overflow-hidden bg-white ${large ? 'rounded-[24px]' : 'rounded-2xl'
        } ${dark
          ? 'shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-stone-700'
          : large
            ? 'shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-stone-200'
            : 'shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-stone-200'
        } transition-all duration-500 ${!dark ? 'group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)]' : ''
        }`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
      />
    </div>
    {label && (
      <div className="absolute top-6 right-6 bg-black/80 backdrop-blur text-white text-[10px] font-bold px-4 py-2 rounded uppercase tracking-widest shadow-xl">
        {label}
      </div>
    )}
  </div>
);

// ───────────────────────────────────────────────────────────
// ZIGZAG FEATURE BLOCK
// ───────────────────────────────────────────────────────────
const ZigzagFeature: React.FC<{
  index: number;
  title: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
  imageLeft: boolean;
}> = ({ index, title, image, imageAlt, children, imageLeft }) => (
  <div className="mb-24 md:mb-32">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
      {/* Text side — 2 cols */}
      <div className={`lg:col-span-2 ${!imageLeft ? '' : 'lg:order-2'}`}>
        <FadeIn delay={imageLeft ? 0.1 : 0}>
          <span className="text-teal-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">
            Feature {String(index).padStart(2, '0')}
          </span>
          <h4 className="text-2xl font-serif mb-6 text-black leading-tight">
            {title}
          </h4>
          <div className="text-base text-stone-600 leading-relaxed space-y-4">
            {children}
          </div>
        </FadeIn>
      </div>

      {/* Image side — 3 cols */}
      <div className={`lg:col-span-3 ${!imageLeft ? 'lg:order-2' : ''}`}>
        <FadeIn delay={imageLeft ? 0 : 0.1}>
          <FramedImage src={image} alt={imageAlt} />
        </FadeIn>
      </div>
    </div>
  </div>
);


// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export const ArabicSyntaxCaseStudy: React.FC<ArabicSyntaxCaseStudyProps> = ({ onBack }) => {
  return (
    <div className="w-full bg-stone-50 min-h-screen font-sans">

      {/* ─── S1: NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-container py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm text-stone-500 hover:text-black transition-colors font-medium flex items-center gap-2"
          >
            <span className="text-lg">←</span> Back to Portfolio
          </button>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
            Case Study
          </span>
        </div>
      </nav>


      {/* ═══════════════════════════════════════════════════════════
          S2: HERO — Centered, Serif (Policy Clauses style)
          ═══════════════════════════════════════════════════════════ */}
      <header className="relative w-full pt-32 md:pt-48 pb-20 md:pb-32 flex flex-col items-center bg-white border-b border-stone-100 px-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_POWER }}
          className="max-w-6xl mx-auto z-10 text-center mb-16"
        >
          <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-teal-600 mb-6 md:mb-8">
            Side Project — EdTech
          </h4>
          <h1 className="font-serif text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.9] text-black tracking-tight mb-8 md:mb-10">
            Arabic <span className="italic text-stone-300">Syntax Lab</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 leading-relaxed">
            A friend teaches Arabic grammar from a composition notebook.
            Students copy sentences, mark diacritics by hand, and wait days for feedback.
            I built this to see if the pen-and-paper process could become something
            that actually teaches back.
          </p>
        </motion.div>

        {/* Meta grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_POWER }}
          className="max-w-4xl mx-auto px-6 mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Role</p>
              <p className="font-medium text-stone-700">Product Designer</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Platform</p>
              <p className="font-medium text-stone-700">Web · RTL · Bilingual</p>
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
        </motion.div>

        {/* Hero image — framed */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE_POWER }}
          className="w-full max-w-[1200px] px-6"
        >
          <FramedImage
            src="/images/arabic-syntax-sentence.png"
            alt="The sentence analysis workspace — where students break down Arabic grammar"
            label="Sentence Workspace"
            large
          />
        </motion.div>
      </header>


      <main className="w-full bg-white">

        {/* ═══════════════════════════════════════════════════════════
            S3: THE BACKSTORY
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-white px-container">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-12 md:mb-16 text-black">The Backstory</h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-8 text-base text-stone-600 leading-relaxed">
                <p className="text-xl md:text-2xl text-stone-700 leading-relaxed">
                  I'rab (إعراب) is the foundational skill in classical Arabic — the practice of
                  analyzing every word in a sentence for its grammatical role, vowel marking,
                  and syntactic relationship. It's how you prove you understand the language,
                  not just read it.
                </p>

                <p>
                  The process hasn't changed in centuries. Students write sentences in
                  composition notebooks, mark each word by hand with diacritics, translate,
                  identify parts of speech, and hand it in. The instructor collects a stack
                  of notebooks, reviews every sentence manually, writes margin notes,
                  and returns them a week later.
                </p>

                {/* Pull quote */}
                <div className="bg-teal-50 p-8 rounded-xl border border-teal-100 my-12">
                  <p className="text-xl md:text-2xl leading-relaxed text-stone-700 italic">
                    "My students make the same three mistakes on every sentence.
                    By the time I return their notebooks, they've already moved on."
                  </p>
                  <p className="text-sm text-teal-700 mt-4 font-medium">— Arabic Grammar Instructor</p>
                </div>

                <p>
                  There's no feedback loop. No way for a student to check their
                  own work before submitting. No way for the instructor to batch-review
                  identical patterns instead of re-reading the same exercise thirty times.
                  The tool had to preserve the pedagogical depth of pen-and-paper
                  while closing the gap between attempt and response.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            S4: SOLUTION OVERVIEW — Dashboard
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-stone-50 border-y border-stone-100 px-container">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-4 text-black">Two Roles, One Workspace</h2>
                <p className="text-stone-500 max-w-2xl mx-auto">
                  Students and instructors share the same data model but see it
                  differently. The student works through sentences — analyzing,
                  marking diacritics, translating. The instructor sees every submission,
                  reviews work at the word level, and sends feedback inline.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="max-w-[1200px] mx-auto">
                <FramedImage
                  src="/images/arabic-syntax-dashboard.png"
                  alt="Student dashboard — courses, submissions, messaging in one connected view"
                  label="Student Dashboard"
                  large
                />
              </div>
            </FadeIn>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            S5: CORE FEATURES — Zigzag Layout
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-white px-container">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-20">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-teal-600 mb-6">Core Features</h4>
                <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif text-black leading-tight">
                  The Sentence Page Is the Entire Product
                </h2>
              </div>
            </FadeIn>

            {/* Feature 1: Diacritics Picker — Image LEFT */}
            <ZigzagFeature
              index={1}
              title="Diacritics Picker"
              image="/images/arabic-syntax-diacritics.png"
              imageAlt="Diacritics picker — vowel marks applied to individual Arabic letters"
              imageLeft={true}
            >
              <p>
                Arabic vowel marks sit above or below individual letters —
                Fatha, Damma, Kasra, Sukun, Shadda — each changing the word's
                meaning and grammatical function.
              </p>
              <p>
                Instead of requiring a specialized keyboard layout, the picker
                appears inline when a student selects a word. They tap the
                mark they want, see it applied in real-time on the Arabic text,
                and move to the next word.
              </p>
              <ul className="space-y-2 text-stone-500">
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Font size controls (א+/א−) for zooming into diacritical clusters</span></li>
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Real-time preview on the Arabic text</span></li>
              </ul>
            </ZigzagFeature>

            {/* Feature 2: Syntax Tree — Image RIGHT */}
            <ZigzagFeature
              index={2}
              title="Interactive Syntax Tree"
              image="/images/arabic-syntax-tree.png"
              imageAlt="Interactive syntax tree diagram with grammatical role nodes"
              imageLeft={false}
            >
              <p>
                The analysis tab renders an interactive tree diagram above the sentence.
                Students drag and connect grammatical roles — subject, predicate, object,
                modifier — building a visual map of the sentence structure.
              </p>
              <p>
                During review, the instructor can mark each node as correct or incorrect
                with a single tap, creating precise per-word feedback without re-grading
                the entire exercise.
              </p>
              <ul className="space-y-2 text-stone-500">
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Drag-and-connect interaction for building trees</span></li>
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Per-node review checkmarks for instructors</span></li>
              </ul>
            </ZigzagFeature>

            {/* Feature 3: Auto-Check — Image LEFT */}
            <ZigzagFeature
              index={3}
              title="Automatic Checking"
              image="/images/arabic-syntax-autocheck-detail.png"
              imageAlt="Auto-check results showing correct and incorrect answers side by side"
              imageLeft={true}
            >
              <p>
                When an exercise has a pre-defined solution, the system can automatically
                check student work. The comparison view shows the student's answer
                alongside the correct solution, highlighting differences at the word level.
              </p>
              <p>
                This eliminates the instructor bottleneck for routine exercises. Students get
                instant feedback. Instructors focus their time on edge cases and qualitative
                review instead of re-reading identical answers.
              </p>
              <ul className="space-y-2 text-stone-500">
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Word-level diff between student answer and solution</span></li>
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Instructor can selectively override any auto-checked result</span></li>
              </ul>
            </ZigzagFeature>

            {/* Feature 4: Instructor Review — Image RIGHT */}
            <ZigzagFeature
              index={4}
              title="Instructor Review Mode"
              image="/images/arabic-syntax-instructor-review.png"
              imageAlt="Instructor review mode — syntax tree with interactive checkmarks and margin annotations"
              imageLeft={false}
            >
              <p>
                The instructor sees every submission in a unified review workspace.
                They can mark individual words right or wrong in the syntax tree,
                highlight specific parts of a translation, and add contextual
                notes the student sees inline.
              </p>
              <p>
                The "mark as reviewed" action auto-advances to the next pending
                submission, creating an efficient batch-review flow. No clicking back,
                no searching the list.
              </p>
              <ul className="space-y-2 text-stone-500">
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Per-word override when auto-check exists</span></li>
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Auto-advance to next pending submission</span></li>
              </ul>
            </ZigzagFeature>

            {/* Feature 5: Notes & Messaging — Image LEFT */}
            <ZigzagFeature
              index={5}
              title="Notes & Messaging"
              image="/images/arabic-syntax-messaging.png"
              imageAlt="Notes and messaging panel for student-instructor communication"
              imageLeft={true}
            >
              <p>
                Students can add personal notes and questions on each exercise.
                Instructors see these inline and respond directly. A built-in
                messaging system supports course-level communication without
                leaving the platform.
              </p>
              <p>
                The notes panel lives in the sidebar, always accessible
                while working on a sentence. Questions and answers are threaded
                per exercise, keeping context attached to the work.
              </p>
              <ul className="space-y-2 text-stone-500">
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Per-exercise threaded notes and questions</span></li>
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Course-level messaging for announcements</span></li>
              </ul>
            </ZigzagFeature>

            {/* Feature 6: Progress — Image RIGHT */}
            <ZigzagFeature
              index={6}
              title="Progress Tracking"
              image="/images/arabic-syntax-progress.png"
              imageAlt="Student progress — course cards with completion tracking"
              imageLeft={false}
            >
              <p>
                The dashboard gives students a clear overview of their enrolled
                courses, pending exercises, and submission history. Each course
                card shows completion status at a glance.
              </p>
              <p>
                Multiple attempts are supported and versioned. Students can duplicate
                a previous attempt as a starting point, compare them side by side,
                and see exactly where their understanding changed between tries.
              </p>
              <ul className="space-y-2 text-stone-500">
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Versioned attempts with full state preservation</span></li>
                <li className="flex gap-3"><span className="text-teal-500 shrink-0">—</span><span>Side-by-side comparison between attempts</span></li>
              </ul>
            </ZigzagFeature>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            S6: INSTRUCTOR SECTION — Dark
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-stone-900 text-white py-24 md:py-32 px-container">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="mb-16">
                <TextReveal>
                  <h2 className="text-[clamp(2rem,6vw,4rem)] font-serif leading-tight">
                    The Instructor
                  </h2>
                </TextReveal>
                <TextReveal delay={0.1}>
                  <h2 className="text-4xl md:text-5xl font-serif leading-tight text-stone-500">
                    Sees Everything
                  </h2>
                </TextReveal>
              </div>
            </FadeIn>

            {/* Inverted golden ratio — text left, image right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-12 lg:gap-20 items-start mb-20">
              <FadeIn>
                <div className="space-y-6 text-base text-stone-400 leading-relaxed">
                  <p className="text-stone-300">
                    The submissions hub gives instructors a complete overview of pending work.
                    Filterable by course, student, and status — with aggregate statistics
                    showing active tasks and pending reviews at a glance.
                  </p>
                  <p>
                    When an exercise has a pre-defined solution, automatic checking handles
                    the routine work. The instructor focuses on edge cases and qualitative
                    feedback — marking specific words right or wrong in the syntax tree.
                  </p>

                  {/* Pull quote */}
                  <div className="border-l-4 border-teal-400 pl-6 my-8">
                    <p className="text-xl italic text-stone-300 leading-relaxed font-serif">
                      The key decision: when auto-check exists, the instructor can
                      selectively override specific answers rather than re-grading everything.
                      The system does the bulk. Humans handle the nuance.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <FramedImage
                  src="/images/arabic-syntax-submissions.png"
                  alt="Submissions management — batch review with status tracking"
                  dark
                />
              </FadeIn>
            </div>

            {/* Two images — instructor review + course */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeIn delay={0}>
                <FramedImage
                  src="/images/arabic-syntax-instructor-review.png"
                  alt="Instructor review — syntax tree with checkmarks"
                  dark
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mt-4">
                  Per-Word Review
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <FramedImage
                  src="/images/arabic-syntax-course.png"
                  alt="Course management — chapters, sentences, participants"
                  dark
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mt-4">
                  Course Management
                </p>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            S7: COURSE CREATION FLOW
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-stone-50 border-y border-stone-100 px-container">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-teal-600 mb-6">Creation Flow</h4>
                <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-4 text-black">
                  Creating a Course Takes 30 Seconds
                </h2>
                <p className="text-stone-500 max-w-2xl mx-auto">
                  Instructors build course → chapter → sentence hierarchies. Each sentence
                  becomes an exercise with structured tabs. The creation modals are
                  intentionally simple — name it, add it, get back to teaching.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn delay={0}>
                <FramedImage
                  src="/images/arabic-syntax-creation-flow.png"
                  alt="Course creation flow — chapters and sentences structure"
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-4 text-center">
                  Course Structure
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <FramedImage
                  src="/images/arabic-syntax-modal.png"
                  alt="Creation modal — add new sentence to a chapter"
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-4 text-center">
                  Creation Modal
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <FramedImage
                  src="/images/arabic-syntax-create-course.png"
                  alt="Course creation — new course setup"
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-4 text-center">
                  Course Setup
                </p>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            S8: REFLECTION
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-white px-container">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-serif mb-12 md:mb-16 text-black">Reflection</h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-8 text-base text-stone-600 leading-relaxed">
                <p>
                  This project forced me to design for a domain I didn't know.
                  I spent the first two weeks just sitting in on lessons, watching
                  how the instructor marks notebooks, learning what diacritics
                  actually mean vs. what they look like. The interface had to
                  respect that complexity — not flatten it into a quiz app.
                </p>
                <p>
                  The hardest constraint was RTL. Not just flipping layouts,
                  but rethinking how breadcrumbs, tree diagrams, and form
                  validations flow when the entire reading direction reverses.
                  Every component was built RTL-first, then adapted for LTR
                  UI chrome like buttons and modals.
                </p>
                <p>
                  The thing I'm most proud of is the per-word override in
                  instructor review. When auto-check marks a sentence,
                  the instructor can tap any individual word to agree or
                  disagree — without re-grading the whole exercise.
                  It's a small interaction that saved the project
                  from becoming just another homework submission tool.
                </p>
              </div>
            </FadeIn>

            {/* Closing display line */}
            <div className="mt-24">
              <TextReveal>
                <p className="text-3xl md:text-5xl font-serif text-stone-300 leading-tight">
                  From notebooks to{' '}
                  <span className="text-teal-600">structured</span>{' '}
                  learning.
                </p>
              </TextReveal>
            </div>
          </div>
        </section>


        <CaseStudyFooter projectId={5} onBack={onBack} category="EdTech · Side Project" />
      </main>
    </div>
  );
};

export default ArabicSyntaxCaseStudy;
