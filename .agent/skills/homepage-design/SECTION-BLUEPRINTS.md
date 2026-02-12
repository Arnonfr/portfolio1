# Section Blueprints — Detailed Construction Guides

Each homepage section below includes: purpose, content requirements, structural layout, implementation notes, and quality criteria.

---

## Section 1: Hero

### Purpose
Establish identity and create immediate interest within 3 seconds. The hero answers: "Who is this person and why should I care?"

### Content Requirements

**Required elements:**
- Full name (display typography)
- Professional title / role descriptor
- Domain or context signal (industries, companies, years)

**Optional elements:**
- One-sentence philosophy or statement
- Availability indicator ("Open to opportunities" — only if true)
- Location
- Scroll indicator

### Blueprint A: Dramatic Name Hero

```
Layout structure:

┌─────────────────────────────────────────────┐
│ nav: sticky / transparent                    │
├─────────────────────────────────────────────┤
│                                              │
│  ┌─ eyebrow (monospace, uppercase) ─────┐   │
│  │  DESIGN LEADER · INSURTECH · FINTECH │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  ┌─ display name ───────────────────────┐   │
│  │  ARNON                                │   │
│  │  FRIEDMAN                             │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  ┌─ descriptor (smaller, offset right) ─┐   │
│  │  Turning complex enterprise workflows │   │
│  │  into clear, usable products.         │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  ┌─ meta row ──────────────────────────┐    │
│  │  8+ Years  ·  Tel Aviv  ·  Available │    │
│  └─────────────────────────────────────┘    │
│                                              │
└─────────────────────────────────────────────┘
```

**Implementation notes:**
- Name should use `clamp(4.5rem, 15vw, 16rem)` for fluid scaling
- Eyebrow text in monospace, 0.6875rem, uppercase, letter-spacing 0.1em
- Descriptor text offset to the right (60% from left) — NOT centered with the name
- Meta row at bottom uses monospace, small size, spaced with `·` separators
- Viewport height should be 90-100vh
- Consider ScrambleText for the name reveal on load

**Quality criteria:**
- [ ] Name dominates the viewport visually
- [ ] Supporting text is drastically smaller (5:1 scale ratio)
- [ ] Layout is asymmetric — nothing perfectly centered
- [ ] Empty space is intentional and generous
- [ ] Works on mobile (name scales down to 8vw minimum)

---

### Blueprint B: Split Hero with Visual

```
Layout structure:

┌──────────────────────────────────────────────┐
│                                               │
│  ┌──── Left 55% ─────┬──── Right 45% ────┐  │
│  │                    │                    │  │
│  │  ARNON             │  ┌────────────┐   │  │
│  │  FRIEDMAN          │  │            │   │  │
│  │                    │  │  Portrait / │   │  │
│  │  Design Leader     │  │  Featured   │   │  │
│  │  8+ Years          │  │  Project    │   │  │
│  │                    │  │            │   │  │
│  │  [View Work →]     │  └────────────┘   │  │
│  │                    │                    │  │
│  └────────────────────┴────────────────────┘  │
│                                               │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- Use CSS Grid: `grid-template-columns: 1.2fr 1fr` (golden ratio bias)
- Image/visual on right should break the container slightly (overflow visible)
- Left text block vertically centered within its column
- Image can be: portrait photo, featured project screenshot in device mockup, or abstract visual
- On mobile: stack vertically, image moves above or below text

**Quality criteria:**
- [ ] Columns are NOT 50/50 — asymmetric split
- [ ] Image has context (device frame, perspective tilt, not raw screenshot)
- [ ] Text side has clear vertical hierarchy
- [ ] Neither column feels empty

---

### Blueprint C: Statement Hero

```
Layout structure:

┌──────────────────────────────────────────────┐
│                                               │
│                                               │
│  I make complex enterprise                    │
│  software feel simple.                        │
│                                               │
│                                               │
│               ── Arnon Friedman               │
│                  Design Leader                 │
│                  Tel Aviv                      │
│                                               │
│                                               │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- Statement text: `clamp(2rem, 5vw, 4.5rem)`, line-height 1.15
- Statement should NOT be centered — left-aligned or offset
- Attribution block: monospace, small, positioned below with dramatic spacing (4rem+)
- Full viewport height with statement vertically centered
- Consider TextReveal animation: statement reveals line-by-line on load

**Quality criteria:**
- [ ] Statement is specific to Arnon (not transferable to another designer)
- [ ] Statement encodes a point of view (not a job description)
- [ ] Attribution is subdued — the statement does the heavy lifting
- [ ] Spacing between statement and attribution is dramatic (not comfortable)

---

## Section 2: Featured Work / Projects

### Purpose
Show evidence of professional capability through curated project examples. Create enough interest to click into case studies.

### Content Requirements Per Project

**Required:**
- Project title
- Company / client name
- Category or industry
- One hero image (in context — device mockup, browser frame)
- Year or time period

**Optional (recommended):**
- One-sentence description
- Key metric or outcome
- Role indicator

### Blueprint A: Full-Width Alternating Sections

```
┌──────────────────────────────────────────────┐
│ 01                                            │
│ ┌────────────────────┐                       │
│ │                    │  CLAIM MOVEMENTS       │
│ │    Project image   │  Insurtech · Novidea   │
│ │                    │  2021-Present           │
│ │                    │                         │
│ └────────────────────┘  Redesigned insurance  │
│                          claim workflows →     │
├──────────────────────────────────────────────┤
│                                        02     │
│                       ┌────────────────────┐  │
│  WEB TRADER           │                    │  │
│  Fintech · Ava Trade  │  Project image     │  │
│  2018-2021            │                    │  │
│                       │                    │  │
│  Built a trading      └────────────────────┘  │
│  platform for →                               │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- Use CSS Grid with 12-column layout
- Odd projects: image columns 1-7, text columns 8-12
- Even projects: text columns 1-5, image columns 6-12
- Image aspect ratio: 16:10 or 3:2 for screenshots
- Project number (01, 02) in monospace, small, positioned at top-left of section
- Generous vertical spacing between projects: `clamp(6rem, 12vw, 16rem)`
- Images should be grayscale by default, subtle color on hover (or full color — pick one approach)

**Hover behavior:**
- Image: subtle scale (1.02) with overflow hidden on container
- Title: color shift or underline animation
- CTA arrow: translate right by 8px

**Quality criteria:**
- [ ] Alternating layout creates visual rhythm
- [ ] Each project section feels distinct but part of a system
- [ ] Image quality is high and contextual (not raw screenshots)
- [ ] Text hierarchy is scannable: title → company → description → CTA

---

### Blueprint B: Compact Grid

```
┌─────────────────┬─────────────────┐
│                 │                  │
│  ┌───────────┐  │  ┌───────────┐  │
│  │ Image     │  │  │ Image     │  │
│  │           │  │  │           │  │
│  └───────────┘  │  └───────────┘  │
│  Claim Movements│  Web Trader     │
│  Insurtech      │  Fintech        │
│  2021-Present   │  2018-2021      │
│                 │                  │
├─────────────────┼─────────────────┤
│                 │                  │
│  ┌───────────┐  │  ┌───────────┐  │
│  │ Image     │  │  │ Image     │  │
│  └───────────┘  │  └───────────┘  │
│  Smart Clauses  │  Cookit         │
│  Enterprise     │  Consumer AI    │
└─────────────────┴─────────────────┘
```

**Implementation notes:**
- Grid: `grid-template-columns: 1fr 1.1fr` (subtle asymmetry)
- Gap: `2rem` horizontal, `4rem` vertical
- Images: 4:3 aspect ratio, object-fit cover, grayscale filter
- On hover: image goes full color, card gets subtle background shift
- Title in bold, category in mono/uppercase, year in muted color
- Consider staggered reveal on scroll (0.1s delay per card)

**Hover behavior:**
- Image transitions from `grayscale(100%)` to `grayscale(0%)`
- Scale to 1.03 within container (overflow hidden)
- Title shifts from ink to acid color (or underline draws in)

---

### Blueprint C: Text List with Magnetic Images

```
┌──────────────────────────────────────────────┐
│                                               │
│  SELECTED WORK                                │
│  ─────────────────────────────────────────    │
│                                               │
│  Claim Movements    Insurtech    2021-Now  →  │
│  ─────────────────────────────────────────    │
│  Web Trader         Fintech     2018-2021  →  │
│  ─────────────────────────────────────────    │
│  Smart Clauses      Enterprise  2015-2018  →  │
│  ─────────────────────────────────────────    │
│  Cookit             Consumer AI 2024-Now   →  │
│  ─────────────────────────────────────────    │
│                                               │
│         ┌──────────┐  ← image appears         │
│         │ Project  │    on hover, follows      │
│         │ Preview  │    mouse position          │
│         └──────────┘                           │
│                                               │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- Full-width rows separated by 1px horizontal rules (border-bottom)
- Each row: flex with `justify-content: space-between`
- Columns: project name (bold), category (mono), year (muted), arrow
- On hover: image element appears, positioned relative to mouse
- Image follows cursor with spring physics (Framer Motion `useMotionValue`)
- Image size: ~400x300px, with slight rotation (2-3deg)

**Hover behavior:**
- Row background: subtle shift (paper → concrete)
- Text: subtle color shift
- Image: fades in with scale from 0.8 to 1.0, spring easing
- Arrow: translates right

**Quality criteria:**
- [ ] Rows are perfectly aligned (monospace helps)
- [ ] Hover image is high quality and relevant
- [ ] Image animation is smooth (spring physics, not linear)
- [ ] Works without hover (mobile shows images inline)

---

## Section 3: About / Bio

### Purpose
Add human dimension. Show the person behind the projects. Build connection and memorability.

### Content Requirements

**Required:**
- Brief professional summary (3-5 sentences)
- Current role context
- Areas of expertise/focus

**Optional:**
- Photo (portrait or environmental)
- Personal detail that differentiates
- Companies worked with (logos or names)
- Link to full about page

### Blueprint: Asymmetric About

```
┌──────────────────────────────────────────────┐
│                                               │
│  ┌── Left 40% ──┐  ┌──── Right 55% ─────┐   │
│  │               │  │                     │   │
│  │  ┌─────────┐  │  │  ABOUT              │   │
│  │  │         │  │  │                     │   │
│  │  │ Portrait│  │  │  I've spent 8+      │   │
│  │  │         │  │  │  years turning       │   │
│  │  │         │  │  │  complex enterprise  │   │
│  │  └─────────┘  │  │  software into       │   │
│  │               │  │  products people     │   │
│  │  Tel Aviv     │  │  actually use.       │   │
│  │  2016-Present │  │                     │   │
│  │               │  │  Currently leading   │   │
│  │               │  │  design at Novidea...│   │
│  │               │  │                     │   │
│  │               │  │  Previously at       │   │
│  │               │  │  Ava Trade...        │   │
│  └───────────────┘  └─────────────────────┘   │
│                                               │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- Grid: `grid-template-columns: 0.7fr 1fr` with 4rem gap
- Photo: slightly overlapping its column (negative margin) — friction
- Photo treatment: duotone, grayscale, or with a subtle overlay
- Text: `font-size: 1.125rem`, generous line-height (1.65)
- "ABOUT" label: eyebrow style (mono, uppercase, small)
- Company names can be bold or highlighted inline

**Quality criteria:**
- [ ] Bio sounds like Arnon talking, not a LinkedIn summary
- [ ] Photo adds personality (not corporate headshot)
- [ ] Layout is asymmetric
- [ ] Information flows naturally: who → what → where → when

---

## Section 4: Expertise / Skills

### Purpose
Signal competency areas without resorting to skill bars or logo grids. Encode domain knowledge, not tool proficiency.

### Content Requirements

**Required (choose one approach):**
- 3-5 expertise areas with descriptions
- OR domain-specific skill categories
- OR "What I Do" framed as capabilities

### Blueprint: Expertise Grid

```
┌──────────────────────────────────────────────┐
│                                               │
│  WHAT I DO                                    │
│                                               │
│  ┌──────────────────┬───────────────────────┐ │
│  │                  │                       │ │
│  │  Product Design  │  Design Systems       │ │
│  │                  │                       │ │
│  │  End-to-end      │  Building scalable    │ │
│  │  product design  │  component libraries  │ │
│  │  for enterprise  │  and design tokens    │ │
│  │  software        │  for consistency      │ │
│  │                  │                       │ │
│  ├──────────────────┼───────────────────────┤ │
│  │                  │                       │ │
│  │  UX Strategy     │  Team Leadership      │ │
│  │                  │                       │ │
│  │  Research-driven │  Mentoring designers  │ │
│  │  design strategy │  and bridging design  │ │
│  │  and information │  with engineering     │ │
│  │  architecture    │  teams                │ │
│  │                  │                       │ │
│  └──────────────────┴───────────────────────┘ │
│                                               │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- 2-column grid with border-separated cells (not cards with backgrounds)
- Each cell: title (bold, 1.25rem) + description (muted, 0.875rem)
- Border style: 1px solid concrete
- Dark background variant: ink bg, paper text — creates section break
- Consider hover effect: cell background shifts subtly

**Anti-pattern warning:**
- NO skill bars (skill: 85% means nothing)
- NO logo grids of tools (Figma, Sketch, etc.)
- NO star ratings
- Focus on CAPABILITIES, not tools

**Quality criteria:**
- [ ] Each expertise area is described in action terms (what you DO, not what you KNOW)
- [ ] Descriptions are specific to Arnon's actual experience
- [ ] Grid creates clear visual structure without feeling like a dashboard
- [ ] Section has its own visual identity (background shift, spacing break)

---

## Section 5: Contact / CTA

### Purpose
Make it effortless to reach out. Create urgency or warmth that converts interest into action.

### Content Requirements

**Required:**
- Email address (clickable mailto)
- LinkedIn profile link
- Clear invitation to connect

**Optional:**
- Phone number
- Location
- Availability status
- Resume/CV download link

### Blueprint: Bold Contact Section

```
┌──────────────────────────────────────────────┐
│  ┌────────────────── dark bg ──────────────┐  │
│  │                                          │  │
│  │  LET'S                                   │  │
│  │  WORK                                    │  │
│  │  TOGETHER                                │  │
│  │                                          │  │
│  │  arnon@email.com              LinkedIn → │  │
│  │                               Resume →   │  │
│  │                                          │  │
│  │  ──────────────────────────────────────  │  │
│  │  Based in Tel Aviv · Open to remote      │  │
│  │                                          │  │
│  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- Dark background (ink) with paper text — strong visual break
- Large display text for the CTA heading (same scale as hero name)
- Email should be a large, clickable link (not hidden in a paragraph)
- Links on the right side, small, with arrow indicators
- Meta info (location, availability) at the bottom in monospace, muted
- Consider MagneticButton for the email link

**Quality criteria:**
- [ ] Contact info is immediately scannable (no hunting for email)
- [ ] Visual contrast with previous section (background color switch)
- [ ] CTA text is confident but not aggressive
- [ ] All links work and open correctly (mailto, LinkedIn URL)

---

## Section 6: Footer

### Purpose
Close the page with professionalism. Secondary navigation and legal if needed.

### Blueprint: Minimal Footer

```
┌──────────────────────────────────────────────┐
│                                               │
│  Arnon Friedman                               │
│  Design Leader                                │
│                                               │
│  Made with intent · 2024                      │
│                                               │
└──────────────────────────────────────────────┘
```

**Implementation notes:**
- Same background as contact section (dark) or return to paper
- Minimal content: name, tagline, year
- Optional: GitHub link, Dribbble link
- No complex multi-column footer — this is a portfolio, not a SaaS product
- Font size: small (0.75rem), monospace for technical feel

**Quality criteria:**
- [ ] Footer doesn't introduce new information or distraction
- [ ] Consistent with overall page design language
- [ ] Clean close — visitor leaves with positive impression

---

## Section Ordering Strategy

### Recommended Default Order
```
1. Hero (identity)
2. Featured Work (evidence)
3. About (person)
4. Contact (action)
5. Footer (close)
```

### Extended Order (if needed)
```
1. Hero (identity)
2. Featured Work (evidence)
3. Expertise (capabilities)
4. About (person)
5. Testimonials (social proof) — only if genuine
6. Contact (action)
7. Footer (close)
```

### Experimental Order
```
1. Statement Hero (philosophy)
2. About + Photo (person first)
3. Featured Work (evidence)
4. Contact (action)
```

**Principle:** Every section must earn its place. If removing a section doesn't hurt the page, remove it. A 3-section homepage that's exceptional beats a 7-section homepage that's adequate.

---

## Cross-Section Design Rules

### Visual Rhythm Between Sections
- Alternate between light and dark backgrounds to create clear chapter breaks
- Use dramatic vertical spacing between sections: `clamp(8rem, 15vw, 16rem)`
- Each section should feel self-contained (could be understood without context)

### Scroll Animation Cadence
- Stagger section reveals: each section animates in as it enters viewport
- Animation should be subtle: `y: 30px → 0, opacity: 0 → 1` over 600ms
- Use `useInView` with `once: true` — animations play once, not on every scroll
- Section animations should feel like a curtain rising, not a carnival ride

### Typography Consistency
- H1 only in hero section
- H2 for section titles (but NOT all H2s are the same size — hero is dramatically larger)
- Body text consistent across all sections (1rem or 0.9375rem)
- Monospace for metadata, labels, and technical details throughout

### Color Transitions
```
Hero:      paper background, ink text
Projects:  paper background, ink text (continuity)
Expertise: ink background, paper text (break)
About:     paper background, ink text (return)
Contact:   ink background, paper text (break)
Footer:    ink background, ash text (continuation)
```
This light → light → dark → light → dark pattern creates visual breathing.
