# Anti-Patterns — What to Avoid and Why

This document catalogs common portfolio homepage mistakes organized by severity. Each anti-pattern includes: what it looks like, why it's harmful, and the correct alternative.

---

## Severity Levels

- **FATAL** — Immediately marks the portfolio as amateur or template-based. Fix before anything else.
- **MAJOR** — Significantly weakens the portfolio's impact. Fix in current iteration.
- **MINOR** — Noticeable to design-savvy reviewers. Fix when polishing.

---

## Part 1: Layout Anti-Patterns

### FATAL: The Perfect Symmetry

**What it looks like:**
```
┌─────────┬─────────┬─────────┐
│         │         │         │
│  Card   │  Card   │  Card   │
│         │         │         │
└─────────┴─────────┴─────────┘
```
Three equal columns. Equal spacing. Equal card sizes. Centered heading above.

**Why it's harmful:** This is the default output of every template and AI tool. It communicates zero design intent. A hiring manager sees this pattern 50+ times per week.

**The fix:** Asymmetric splits using golden ratio or intentional imbalance:
```
┌────────────────┬────────┬──────┐
│                │        │      │
│  Large card    │ Medium │ Small│
│                │        │      │
│                │        │      │
└────────────────┴────────┴──────┘
```
Use `grid-template-columns: 1.618fr 1fr 0.618fr` or similar.

---

### FATAL: The Centered Hero

**What it looks like:**
```
          Welcome to my portfolio
              John Designer
           Product Designer at Company
              [View My Work]
```
Everything centered. Generic greeting. Centered CTA button.

**Why it's harmful:** "Welcome to my portfolio" adds zero information. Centered layouts are the default of every website builder. The greeting wastes the most valuable real estate on the page.

**The fix:** Offset layout. No greeting. Name as display type. Role as metadata:
```
ARNON
FRIEDMAN
                      Design Leader · Insurtech
                      8+ Years · Tel Aviv
```

---

### MAJOR: Section Padding Uniformity

**What it looks like:** Every section has `padding: 4rem 0`. Equal spacing between all sections. No visual rhythm.

**Why it's harmful:** Uniform padding makes every section feel equally important. There's no visual hierarchy between chapters. The page feels like a single long column instead of a crafted experience.

**The fix:** Vary spacing dramatically:
- Hero → Projects: tight (2rem) — keep momentum
- Projects → About: dramatic (10rem+) — chapter break
- About → Contact: medium (6rem) — natural transition
- Between project cards: 4rem — grouped but distinct

---

### MAJOR: Container Max-Width Trap

**What it looks like:** Every section constrained to `max-width: 1200px; margin: 0 auto`. Nothing ever breaks the container.

**Why it's harmful:** The page feels like a newspaper column. No edge-to-edge drama. No visual expansion or compression.

**The fix:** Strategic full-bleed sections. Hero can be full-width. Project images can break the container. Dark sections can go edge-to-edge while text stays contained.

---

### MINOR: Footer Overload

**What it looks like:**
```
┌────────┬─────────┬──────────┬─────────┐
│ About  │ Links   │ Social   │ Legal   │
│ Bio    │ Home    │ Twitter  │ Privacy │
│ Resume │ Work    │ LinkedIn │ Terms   │
│ Blog   │ Contact │ Dribbble │ Cookies │
└────────┴─────────┴──────────┴─────────┘
```

**Why it's harmful:** This is a SaaS product footer, not a portfolio footer. Personal portfolios don't need multi-column footers with legal links.

**The fix:** Name. Year. One line. Maybe a subtle link to source code or inspiration.

---

## Part 2: Typography Anti-Patterns

### FATAL: The Gradual Scale

**What it looks like:**
```css
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
p  { font-size: 1rem; }
```
Smooth mathematical progression. Each level barely different from the next.

**Why it's harmful:** No visual drama. Headers and body text feel like the same weight. There's no hierarchy — just a gradient of slightly different sizes.

**The fix:** Violent jumps:
```css
h1 { font-size: clamp(4rem, 15vw, 16rem); }  /* MASSIVE */
h2 { font-size: 1.75rem; }                     /* Normal */
p  { font-size: 0.9375rem; }                   /* Small */
.eyebrow { font-size: 0.6875rem; }             /* Tiny */
```
The ratio between h1 and h2 should be at least 3:1, not 1.25:1.

---

### FATAL: Generic Font Stack

**What it looks like:** Inter, Roboto, Open Sans, or system-ui for everything including display headings.

**Why it's harmful:** These are utility fonts designed to be invisible. Using them for display typography says "I didn't make a typographic choice." Inter is the Comic Sans of 2025 — not because it's bad, but because it's the thoughtless default.

**The fix:** Choose a font with personality for display text. Keep the utility font for body if needed:
- Display: Space Grotesk, Syne, Cabinet Grotesk, Clash Display
- Body: System stack or a clean sans-serif
- Mono: JetBrains Mono, IBM Plex Mono (for metadata and labels)

---

### MAJOR: No Uppercase/Tracking System

**What it looks like:** All text in sentence case. No variation in letter-spacing. Labels and headings treated identically.

**Why it's harmful:** Uppercase + wide tracking is a powerful design tool for labels, metadata, and eyebrow text. Without it, there's no typographic texture — everything reads at the same tone.

**The fix:** Create a clear system:
- Display headings: uppercase, tight tracking (-0.03em)
- Section labels/eyebrows: uppercase, wide tracking (0.08em+), monospace
- Body text: sentence case, normal tracking
- Metadata: uppercase or mono, small size

---

### MINOR: Comfortable Line Heights

**What it looks like:** `line-height: 1.5` on everything — headings, body, display text.

**Why it's harmful:** 1.5 is appropriate for body text readability. On display headings (4rem+), it creates enormous gaps between lines that feel like separate elements instead of one cohesive heading.

**The fix:**
- Display text (4rem+): `line-height: 0.85-0.95`
- Headings (1.5-3rem): `line-height: 1.1-1.2`
- Body text (0.9-1.2rem): `line-height: 1.5-1.7`
- Monospace metadata: `line-height: 1.3-1.4`

---

## Part 3: Animation Anti-Patterns

### FATAL: The Carousel of Everything

**What it looks like:** Auto-playing carousel in the hero with 5-10 slides. No pause control. Arrows on both sides. Dot indicators at the bottom.

**Why it's harmful:** Research consistently shows users rarely interact with carousels past the first slide. Auto-play competes for attention and removes user control. The carousel component itself screams "template."

**The fix:** Pick ONE strong image or interaction. If you need to show multiple items, use a scroll-triggered gallery that the user controls through scrolling.

---

### MAJOR: Animation Overload

**What it looks like:** Every element animates on entry. Text flies in from the left. Images zoom from the right. Cards bounce in from below. Background particles float. Cursor has a trail.

**Why it's harmful:** When everything moves, nothing stands out. Animation should direct attention to specific moments, not create a carnival. Performance tanks. Users with motion sensitivity are excluded.

**The fix:** Budget your animations:
- Maximum 2-3 types of animation on the entire page
- Hero gets the most complex animation (if any)
- Project sections get subtle reveals (opacity + Y translate)
- Everything else: no animation, or minimal fade

---

### MAJOR: Smooth Linear Everything

**What it looks like:** All animations use `ease` or `ease-in-out`. Linear timing. No physics.

**Why it's harmful:** Default easing curves feel digital and lifeless. They don't match how physical objects move. The result is "smooth" but soulless.

**The fix:** Use custom easing curves with character:
- Entries: `[0.16, 1, 0.3, 1]` — fast start, gentle settle
- Interactions: `cubic-bezier(0.34, 1.56, 0.64, 1)` — spring overshoot
- Exits: `[0.4, 0, 1, 1]` — quick departure
- Never use: `ease`, `ease-in-out`, `linear`

---

### MAJOR: Ambient Looping Animations

**What it looks like:** Background particles floating. Gradient blobs slowly morphing. Elements subtly pulsing. Infinite scroll of logos.

**Why it's harmful:** Ambient motion serves no purpose. It's decoration pretending to be design. It burns CPU/GPU constantly. It signals AI-generated or template-based design.

**The fix:** Every animation must respond to user action (scroll, hover, click) or communicate state change. If it loops without user input, remove it.

---

### MINOR: Identical Animation Timing

**What it looks like:** Every element enters the viewport with the same 300ms fade-in. No variation in duration or delay.

**Why it's harmful:** Uniform timing removes the choreography. Good animation is like music — it needs rhythm, not a metronome.

**The fix:** Vary durations based on element weight:
- Small elements (icons, labels): 150-250ms
- Medium elements (cards, images): 400-600ms
- Large elements (sections, heroes): 600-800ms
- Stagger children at 80-150ms intervals

---

## Part 4: Content Anti-Patterns

### FATAL: "Hi, I'm [Name], a passionate [Role]"

**What it looks like:**
> "Hi! I'm Arnon, a passionate product designer who creates seamless digital experiences that delight users."

**Why it's harmful:** Every portfolio opens with this. "Passionate" is meaningless. "Seamless digital experiences" describes nothing. "Delight users" is a cliche. This sentence could belong to any of 100,000 designers.

**The fix:** Either:
1. No greeting — just name + role as data (not prose)
2. A specific statement: "I redesign enterprise software that everyone hates into products people actually choose to use"
3. A fact: "Design Leader. 8 years. Insurance and fintech products."

---

### FATAL: Vague Project Descriptions

**What it looks like:**
> "I redesigned the user interface to create a more intuitive and modern experience."

**Why it's harmful:** Says nothing specific. What was redesigned? What was the original problem? What made it "more intuitive"? This is filler that a hiring manager skips.

**The fix:** Specific and concrete:
> "Redesigned the insurance claim workflow for 200+ companies — reduced claim processing time from 3 days to 4 hours."

---

### MAJOR: Skills Section as Logo Grid

**What it looks like:**
```
Figma  |  Sketch  |  Adobe XD  |  InVision
React  |  HTML    |  CSS       |  JavaScript
```

**Why it's harmful:** Tool proficiency is the least interesting thing about a designer. A logo grid communicates "I use software" — not "I solve problems." Every junior designer has the same grid.

**The fix:** Frame expertise as capabilities, not tools:
- "Product Design — End-to-end design for enterprise SaaS"
- "Design Systems — Scalable component libraries and token systems"
- "UX Strategy — Research-driven design decisions"
- "Team Leadership — Mentoring designers and collaborating with engineering"

---

### MAJOR: No Specificity

**What it looks like:**
> "Experienced designer with a track record of delivering high-quality digital products."

**Why it's harmful:** Zero specific information. Which products? For whom? What made them high quality? "Track record" without evidence is an empty claim.

**The fix:** Replace every vague claim with a specific fact:
- "Experienced" → "8+ years at Novidea and Ava Trade"
- "High-quality" → "Shipped to 200+ insurance companies"
- "Digital products" → "Claim management systems and trading platforms"

---

### MINOR: About Section as LinkedIn Summary

**What it looks like:**
> "Results-driven design leader with 8+ years of experience leveraging user-centered design principles to deliver innovative solutions across multiple industries."

**Why it's harmful:** This is corporate writing, not personal voice. It reads like a recruiter wrote it. No personality, no opinion, no human.

**The fix:** Write like you're explaining your work to a friend:
> "I've spent the last 8 years trying to make insurance software not suck. Before that, I built a trading platform at Ava Trade. I care most about turning the kind of enterprise software people are forced to use into something they'd actually choose."

---

## Part 5: Visual Design Anti-Patterns

### FATAL: Gradient Blob Backgrounds

**What it looks like:** Purple-to-blue or pink-to-orange gradient blobs floating as background decoration. Often with blur filter and low opacity.

**Why it's harmful:** This is the single most recognizable AI-generated design pattern from 2022-2024. It instantly signals "template" or "generated." No human designer in 2025 would choose this as their portfolio background.

**The fix:** Solid colors. Paper/ink palette. If you need visual texture: subtle noise overlay, paper texture, or geometric line art.

---

### FATAL: Pure #000000 and #FFFFFF

**What it looks like:** True black text on true white background. Maximum contrast. No warmth.

**Why it's harmful:** Pure black and white feel digital and harsh. No physical material is pure black or pure white. The anti-slop design system uses warm near-black and warm off-white.

**The fix:**
- White → Paper: `#f4f3f1` or `#f9f9f7`
- Black → Ink: `#0c0c0a` or `#0d0d0b`
- The warmth is subtle but transforms the feel

---

### MAJOR: 12px Border-Radius Everywhere

**What it looks like:** Every card, button, image, and container has `border-radius: 12px`. The universal "friendly" radius.

**Why it's harmful:** 12px radius is the AI/template default. It makes everything look like iOS widgets. Zero personality. Zero intentional choice.

**The fix:** Either:
- `0px` — Sharp, technical, decisive
- `2px` — Barely there, industrial
- `32px+` — Bold, playful, intentional
- NEVER 8-16px unless there's a specific reason

---

### MAJOR: Stock Illustrations

**What it looks like:** Undraw-style flat illustrations, Humaaans, 3D abstract renders, or AI-generated imagery as decoration.

**Why it's harmful:** Stock illustrations are instantly recognizable and shared across thousands of websites. They add visual noise without adding meaning. AI-generated imagery (especially 3D abstract shapes) is now its own cliche.

**The fix:** Use real project screenshots, real photography, or nothing. If you need illustration, it should be custom and specific to the content it accompanies.

---

### MINOR: Drop Shadows on Cards

**What it looks like:** `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` on every card and container.

**Why it's harmful:** Drop shadows are a crutch for visual separation. They add visual weight without information. The material/border approach is cleaner and more intentional.

**The fix:**
- Use borders: `1px solid var(--concrete)` for separation
- Use background shifts: card background slightly different from page background
- Use elevation through z-index + overlap instead of shadow
- Shadow only allowed for interactive states (hover elevation)

---

## Part 6: Structural Anti-Patterns

### FATAL: Too Many Projects

**What it looks like:** 8-15 projects displayed on the homepage, each getting equal treatment. Long scroll. No hierarchy.

**Why it's harmful:** More projects = less curation = less confidence. A senior designer shows 3-5 carefully chosen projects. Showing everything says "I can't decide what's important."

**The fix:** Maximum 5 projects on the homepage. Choose based on:
1. Relevance to target roles
2. Visual quality of case study
3. Diversity of problem types
4. Recency

---

### MAJOR: No Clear Hierarchy Between Projects

**What it looks like:** All project cards identical in size, treatment, and positioning. The first project isn't more prominent than the fifth.

**Why it's harmful:** Flat hierarchy forces the visitor to evaluate all projects equally, creating decision paralysis. The strongest project should grab attention first.

**The fix:**
- First project: 2x the visual space (larger image, more detail)
- Projects 2-3: standard treatment
- Projects 4-5: compact treatment or text-only
- OR: one featured project + grid of remaining projects

---

### MAJOR: No Visual Distinction Between Sections

**What it looks like:** All sections have the same background, same spacing, same text color. Scroll feels like one continuous feed.

**Why it's harmful:** Sections need visual boundaries to create "chapters." Without them, visitors lose track of where they are and what they've seen.

**The fix:** Alternate backgrounds (light/dark), vary spacing between sections, use subtle borders or full-bleed color blocks to create clear breaks.

---

### MINOR: Missing Loading/Empty States

**What it looks like:** Images pop in abruptly. Layout shifts as fonts load. Content appears all at once.

**Why it's harmful:** Cumulative Layout Shift (CLS) damages the perceived quality. If the homepage visually jumps during load, it signals carelessness.

**The fix:**
- Skeleton states or blur-up placeholders for images
- Font-display: swap with appropriate fallbacks
- Fixed aspect ratios on image containers
- Consider a brief intro animation that masks the initial load

---

## The Audit Protocol

Before considering a homepage complete, run through these checks:

### Quick Visual Scan (5 seconds)
1. Look at the homepage at arm's length. Can you identify:
   - One dominant element? (If not: hierarchy problem)
   - Clear sections? (If not: visual rhythm problem)
   - Something unique? (If not: personality problem)

### The Screenshot Test
2. Take a screenshot. Send it to someone with no context:
   - Can they tell what this person does? (If not: content problem)
   - Does it look like a template? (If yes: design problem)
   - Is anything memorable? (If not: signature problem)

### The Swap Test
3. Replace "Arnon Friedman" with any other name:
   - Does the design still make complete sense? (If yes: not personal enough)
   - Would the color palette, layout, and interactions work for anyone? (If yes: not distinctive enough)

### The Technical Test
4. Open DevTools:
   - FCP under 1.5s?
   - No layout shifts?
   - Animations at 60fps?
   - Mobile responsive?
   - Respects prefers-reduced-motion?

### The Content Test
5. Read all the text:
   - Could any sentence appear on another designer's portfolio unchanged? (If yes: rewrite it)
   - Is there a specific point of view? (If not: add one)
   - Are there measurable claims? (If not: add specifics)

---

## Summary: The Three Tests Every Element Must Pass

### 1. The Necessity Test
"If I remove this element, does the page suffer?"
If no → remove it.

### 2. The Specificity Test
"Could this element appear on any other portfolio unchanged?"
If yes → make it specific to Arnon.

### 3. The Intent Test
"Can I articulate WHY this design choice was made?"
If no → it's decoration, not design. Remove or rethink.
