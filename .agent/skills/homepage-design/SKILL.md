# Portfolio Homepage Design Skill

## What This Skill Does

This skill is the definitive guide for designing and building Arnon Friedman's portfolio homepage. It encodes deep knowledge of modern portfolio trends (2025-2026), anti-slop design principles, and battle-tested patterns from award-winning designer portfolios.

**Use this skill when:**
- Redesigning or iterating on the portfolio homepage
- Building a new homepage variant or section
- Evaluating whether a homepage design is strong enough
- Deciding on layout, typography, animation, or content strategy for the homepage
- Reviewing a homepage implementation against quality standards

---

## Context: This Portfolio

**Owner:** Arnon Friedman — Design Leader / UX Lead
**Stack:** React 19 + Framer Motion + Tailwind CSS 4 + Vite
**Design System:** Anti-slop (see `anti-slop-skill-v3/`)
**Color Palette:** Paper (#f4f3f1), Ink (#0c0c0a), Ash (#a8a39a), Acid (#ccff00)
**Typography:** Space Grotesk (display) + system stack (body)
**Projects:** 5 main (Claim Movements, Web Trader, Smart Clauses, Cookit, Arabic Syntax Lab) + 2 side projects

**Currently active homepage:** `components/NewHomepage.tsx` at route `/`
**Alternative variants:** Hero.tsx (classic), ArtisticHomepage.tsx, KnightStyleHomepage.tsx, SimpleHome.tsx

---

## Foundational Principles

### 1. The Portfolio IS the Case Study
The homepage itself demonstrates Arnon's design ability. Every layout decision, animation choice, and content hierarchy is a design artifact that hiring managers evaluate. The homepage must be indistinguishable from a senior designer's best project work.

### 2. One Signature Move
Every memorable portfolio has ONE distinctive hook. Bruno Simon has 3D driving. Brittany Chiang has cursor glow. Rauno Freiberg has obsessive micro-interaction polish. Arnon's homepage needs its own recognizable signature — not five competing gimmicks.

### 3. Restraint Over Spectacle
A homepage that does two things exceptionally beats one that does ten things adequately. Remove before adding. Reduce before amplifying. If an element doesn't earn its pixel space, it goes.

### 4. Anti-Slop by Default
Every design decision must pass the anti-slop audit (see `anti-slop-skill-v3/SYSTEM-PROMPT.md`). No pure white/black, no 12px border-radius, no symmetrical grids, no generic Inter/Roboto, no comfortable medium spacing.

### 5. Content-First, Decoration-Last
Words and project work drive the design — not gradients, illustrations, or animations. If the homepage looks empty without decoration, the information architecture is broken.

---

## How to Use This Skill

### Step 1: Understand Patterns
Read `HOMEPAGE-PATTERNS.md` to learn:
- What the best portfolio homepages do (and why)
- Hero section archetypes with pros/cons
- Project showcase strategies
- Navigation approaches
- Content hierarchy models

### Step 2: Design Sections
Read `SECTION-BLUEPRINTS.md` for detailed blueprints:
- Hero section variants (with code structure)
- Featured work section patterns
- About/bio section approaches
- Skills/expertise displays
- Contact/CTA section designs
- Footer strategies

### Step 3: Add Interactions
Read `INTERACTION-COOKBOOK.md` for proven recipes:
- Scroll-triggered animations
- Hover effects for project cards
- Magnetic button implementations
- Text scramble/reveal effects
- Page transition patterns
- Cursor-responsive elements

### Step 4: Audit Against Anti-Patterns
Read `ANTI-PATTERNS.md` to verify:
- No generic template patterns detected
- No AI-generated design smell
- Content is specific, not vague
- Animations are purposeful, not decorative
- Performance budget is respected

---

## Quick Decision Framework

### "What kind of homepage should I build?"

```
What is Arnon's current priority?

├── Active job search / seeking new roles?
│   → IMPACT-FIRST HOMEPAGE
│   → Lead with strongest project + measurable outcomes
│   → Feature 3-5 curated projects max
│   → Clear role statement + availability signal
│   → See: SECTION-BLUEPRINTS.md → "Impact Hero"
│
├── Establishing thought leadership?
│   → EDITORIAL HOMEPAGE
│   → Magazine-style layout with essays alongside projects
│   → Strong point-of-view in copy
│   → Mix of work + writing + speaking
│   → See: HOMEPAGE-PATTERNS.md → "Editorial Model"
│
├── Showcasing design craft?
│   → INTERACTION-FORWARD HOMEPAGE
│   → Homepage itself IS the portfolio piece
│   → One signature interaction executed to perfection
│   → Technical polish demonstrates engineering skill
│   → See: INTERACTION-COOKBOOK.md → "Signature Interactions"
│
└── General professional presence?
    → CONFIDENT-MINIMAL HOMEPAGE
    → Name + role + work. Nothing else.
    → Maximum restraint, maximum quality
    → See: HOMEPAGE-PATTERNS.md → "Minimal Authority"
```

---

## The Homepage Anatomy

Every strong portfolio homepage has these layers (in priority order):

### Layer 1: Identity (WHO) — 0-2 seconds
- Name
- Role / professional identity
- One sentence that encodes point-of-view

### Layer 2: Evidence (WHAT) — 2-10 seconds
- 3-5 featured projects with visual teasers
- Company names / project context
- Quick-scan hierarchy (title → company → category)

### Layer 3: Depth (HOW) — 10-30 seconds
- Expertise areas or skills
- Process indicators
- Years of experience / seniority signals

### Layer 4: Connection (NEXT) — Any time
- Contact CTA (email, LinkedIn)
- Availability signal
- Resume/CV link

### Layer 5: Personality (WHY) — Ambient
- Design choices themselves
- Animation character
- Copy voice and tone
- What's deliberately absent

---

## Quality Gates

A homepage passes review ONLY if:

### The 5-Second Test
A stranger viewing for 5 seconds can tell:
- [ ] Who this person is
- [ ] What they do
- [ ] That they're good at it

### The Scroll Test
Scrolling through once naturally reveals:
- [ ] Projects with enough context to be interesting
- [ ] A clear next action (view project / contact)
- [ ] No dead zones or padding-filler sections

### The Swap Test
- [ ] This homepage could NOT belong to any other designer
- [ ] Removing the name wouldn't make it generic
- [ ] Design choices reflect specific taste

### The Performance Test
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shifts after load
- [ ] Animations run at 60fps
- [ ] Total page weight < 2MB

### The Anti-Slop Test
Run the full audit from `anti-slop-skill-v3/slop-audit.js`:
- [ ] No generic border-radius (12px)
- [ ] No symmetrical grids
- [ ] No comfortable medium spacing
- [ ] No pure #fff / #000
- [ ] No ambient looping animations
- [ ] Typography hierarchy is violent (not gradual)

---

## Files in This Skill

### 1. `SKILL.md` (this file)
**Purpose:** Overview, principles, decision framework, quality gates
**When to read:** First — to understand the skill's scope and philosophy

### 2. `HOMEPAGE-PATTERNS.md`
**Purpose:** Deep analysis of homepage archetypes, what top portfolios do, content strategy
**When to read:** When planning which type of homepage to build

### 3. `SECTION-BLUEPRINTS.md`
**Purpose:** Detailed blueprints for each homepage section with structure, content, and implementation guidance
**When to read:** When designing or building specific sections

### 4. `INTERACTION-COOKBOOK.md`
**Purpose:** Proven animation and interaction recipes with Framer Motion code patterns
**When to read:** When implementing scroll effects, hover states, transitions, micro-interactions

### 5. `ANTI-PATTERNS.md`
**Purpose:** Comprehensive catalog of what to avoid, with before/after examples
**When to read:** When auditing a homepage design or catching common pitfalls

---

## Integration with Other Skills

| Skill | Relationship |
|:------|:-------------|
| `anti-slop-skill-v3/` | Foundation — all homepage design must pass the slop audit |
| `portfolio-case-study-skill/` | Project pages — homepage teasers must lead into strong case studies |
| `figma-mockup/` | Assets — image treatments and mockup contexts for project thumbnails |
| `senior-frontend/` | Implementation — React patterns, performance, accessibility |

---

## Remember

> The homepage is not a gallery of your work.
> It's a **demonstration** of your work.
>
> Every pixel is a portfolio piece.
> Every animation is a case study.
> Every word is a design decision.

The best portfolio homepages don't describe the designer — they **prove** the designer.
