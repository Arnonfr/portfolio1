# Anti-AI Slop Skill V3.0
## The Human Signature Framework

### 🎯 Purpose

In an era of generative design, where AI produces "clean" and "modern" interfaces that all look the same, this skill enforces **human intent** over algorithmic averages.

**Core Philosophy:**
> If a design element can be moved to another product with zero loss of meaning, it is slop.

This framework helps you create interfaces that feel **authored**, not generated — with fingerprints, tension, and radical choices.

---

## 📦 What's Included

### 1. `SYSTEM-PROMPT.md`
The complete design philosophy and rules. Feed this to your AI collaborator (Claude, ChatGPT, etc.) to enforce anti-slop principles during generation.

**Use case:** When generating React components, HTML/CSS, or design artifacts.

### 2. `human-signature.css`
Production-ready CSS framework with:
- Material-based color system (Paper, Ink, Concrete)
- Dramatic typography scale
- Asymmetric layout utilities
- Physical button interactions
- Technical form styling
- Friction elements (overlaps, collisions)

**Use case:** Import into your project as a foundation or reference.

### 3. `slop-audit.js`
JavaScript auditor that detects AI slop patterns in live interfaces.

**Checks for:**
- Generic border-radius (12px = instant slop)
- Symmetrical layouts
- Weak typography hierarchy
- Pure white/black colors
- Generic icon libraries
- Default gradients
- Ambient animations
- Uniform spacing

**Use case:** Run in browser console before shipping designs.

---

## 🚀 Quick Start

### For AI-Assisted Design

1. **Feed the System Prompt:**
   ```
   Copy SYSTEM-PROMPT.md content into your AI chat:
   "Here's a design system you must follow..."
   ```

2. **Request with intent:**
   ```
   "Create a landing page for [product] following the 
   Anti-AI Slop principles. Use asymmetric layouts, 
   dramatic typography, and the paper/ink/acid color system."
   ```

3. **Audit the output:**
   ```javascript
   // In browser console
   SlopAuditor.check();
   ```

### For Manual Development

1. **Import the CSS:**
   ```html
   <link rel="stylesheet" href="human-signature.css">
   ```

2. **Use the utilities:**
   ```html
   <section class="grid-broken">
     <div class="card-hero">
       <h1 class="display-text">Your Product</h1>
       <p class="text-large">Specific value proposition</p>
       <button class="btn-primary">[ Get Started ]</button>
     </div>
   </section>
   ```

3. **Audit before shipping:**
   ```javascript
   <script src="slop-audit.js"></script>
   <script>
     SlopAuditor.generateReport();
   </script>
   ```

---

## 🎨 The Three Pillars

### 1. Asymmetry Over Balance
**Balance is boring. Tension is memorable.**

```css
/* ❌ AI Slop */
.grid {
  grid-template-columns: repeat(3, 1fr);
}

/* ✅ Human Signature */
.grid-broken {
  grid-template-columns: 1.618fr 1fr; /* Golden ratio */
}
```

### 2. Typography as Structure
**If the type isn't doing the heavy lifting, the design is weak.**

```css
/* ❌ AI Slop */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }

/* ✅ Human Signature */
h1 { 
  font-size: clamp(4rem, 15vw, 18rem); /* Abusive scale */
  line-height: 0.85;
  letter-spacing: -0.05em;
}
```

### 3. Intentional Friction
**We don't want "seamless." We want "meaningful."**

```css
/* ❌ AI Slop */
.card { margin-top: 2rem; }

/* ✅ Human Signature */
.friction-overlap {
  margin-top: -10%; /* Invades previous section */
  z-index: 10;
}
```

---

## 🛠️ Usage Examples

### Example 1: Hero Section

```html
<section class="container mt-2xl">
  <div class="grid-broken">
    <div class="stack-loose">
      <h4 class="eyebrow">Introducing</h4>
      <h1 class="display-text">Urbanito</h1>
      <p class="text-large">
        AI-powered walking routes through your city's hidden stories.
        Not a generic tour app.
      </p>
      <div class="cluster">
        <button class="btn-primary">[ Start Exploring ]</button>
        <button class="btn-ghost">Learn More →</button>
      </div>
    </div>
    
    <div class="friction-overlap bg-ink p-xl">
      <p class="text-paper text-small text-technical">
        // Route Generation
        Location → History → Narrative
      </p>
    </div>
  </div>
</section>
```

### Example 2: Card Grid

```html
<div class="grid-broken-3 mt-xl">
  <!-- Hero Card -->
  <div class="card-hero">
    <h3 class="text-paper">Regional Routes</h3>
    <p class="text-paper">Explore neighborhoods through curated historical narratives.</p>
  </div>
  
  <!-- Standard Cards -->
  <div class="card">
    <h3>Street Tours</h3>
    <p>Deep dives into single streets with rich histories.</p>
  </div>
  
  <div class="card">
    <h3>Custom Paths</h3>
    <p>Build routes based on your interests and time.</p>
  </div>
</div>
```

### Example 3: Form with Personality

```html
<form class="stack-standard">
  <div>
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      placeholder="name@example.com"
    >
  </div>
  
  <div>
    <label for="city">Your City</label>
    <input 
      type="text" 
      id="city" 
      placeholder="Tel Aviv"
    >
  </div>
  
  <button class="btn-primary" type="submit">
    [ Get Early Access ]
  </button>
</form>
```

---

## 🔍 The Slop Audit Process

### Step 1: Run Basic Check
```javascript
SlopAuditor.check();
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     HUMAN SIGNATURE AUDITOR V3.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Border Radius Check
✅ No generic border-radius detected

🔍 Symmetry Check
❌ Found symmetrical 3-column grid

[Score: 7/8 checks passed]
```

### Step 2: Generate Full Report
```javascript
SlopAuditor.generateReport();
```

**Output includes:**
- Detailed issues found
- Specific recommendations
- Code examples for fixes
- Priority order

### Step 3: Fix and Re-audit
Make changes based on recommendations, then run check again until all tests pass.

---

## 📋 The Slop vs. Signature Cheat Sheet

| AI Slop Pattern | Human Signature Replacement |
|:----------------|:----------------------------|
| 12px border-radius everywhere | 0px (sharp) or 2px (technical) or 32px+ (bold) |
| Symmetrical 3-card grid | 1.618:1:0.8 asymmetric splits |
| Centered hero section | 60/40 off-center with bleed |
| Uniform padding (2rem) | Varied rhythm (0.5rem vs 8rem) |
| Inter/Roboto headers | High-contrast serifs or idiosyncratic grotesques |
| Pure #fff and #000 | #f9f9f7 (paper) and #0d0d0b (ink) |
| Generic Heroicons | Modified stroke-width (1.73px) or text labels |
| 135deg gradient | 160deg with brand-specific colors |
| `ease` transitions | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Drop shadows on cards | Borders or elevation via background shift |

---

## 🎯 Evaluation Gates

**Your design FAILS if:**
1. It could be mistaken for a Webflow template
2. Comments are generic ("clean", "modern", "nice")
3. Elements can swap products unchanged
4. Optimized for screenshots, not use
5. Feels "safe" with no controversial choices

**Your design PASSES if:**
1. It provokes specific reactions
2. It feels authored by someone with taste
3. It has fingerprints: intentional imperfections
4. It requires hard choices
5. It's recognizable without the logo

---

## 🧰 Advanced Techniques

### The Bracket Convention
Replace vague icon buttons with mechanical text:

```html
<!-- ❌ Slop -->
<button><IconMenu /></button>

<!-- ✅ Signature -->
<button class="btn-mechanical">MENU</button>
<!-- Renders as: [ MENU ] -->
```

### The Collision Principle
Create visual tension through overlap:

```css
.section-two {
  margin-top: -15%;
  position: relative;
  z-index: 10;
  background: var(--paper);
  padding: var(--space-xl);
}
```

### The Swiss Ratio
Dramatic typography jumps:

```
Display: 15vw (240px at 1600px)
    ↓ 8.57x jump
H2:     1.75rem (28px)
    ↓ 1.6x jump  
H3:     1.09rem (17.5px)
```

### The Recoil Effect
Physics-based interactions:

```css
.btn:hover {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}
```

---

## 🎓 Learning Resources

### Study These Sites
**Studios with anti-slop mastery:**
- [Resn](https://resn.co.nz) - Asymmetric layouts, intentional friction
- [Active Theory](https://activetheory.net) - Typography as structure
- [Resonate](https://resonate.co) - Limited, intense color systems
- [Aristide Benoist](https://aristidebenoist.com) - Controlled tension

### What They Do Differently
- Asymmetric layouts with purpose
- Limited color systems (3-5 colors max)
- Typography as primary design element
- Motion tied to narrative
- Unique component structures
- Zero generic stock anything

---

## 🔧 Integration with Existing Projects

### With Tailwind CSS
You can use this alongside Tailwind:

```html
<!-- Use Tailwind for utility, but override with signature classes -->
<div class="container mx-auto">
  <h1 class="display-text"><!-- Overrides Tailwind typography --></h1>
  <button class="btn-primary"><!-- Custom component --></button>
</div>
```

### With Component Libraries
Override generic components:

```jsx
// Instead of:
<Button variant="primary">Submit</Button>

// Use:
<button className="btn-primary">[ SUBMIT ]</button>
```

### With Design Systems
Augment your design system tokens:

```css
/* Extend your design system */
@import 'your-design-system.css';
@import 'human-signature.css';

/* Override specific tokens */
:root {
  --ds-color-background: var(--paper);
  --ds-color-text: var(--ink);
  --ds-spacing-lg: var(--space-xl);
}
```

---

## 🚨 Common Mistakes

### Mistake 1: Applying Everything Everywhere
**Wrong:** Making every element asymmetric and overlapping
**Right:** Strategic tension in key moments

### Mistake 2: Ignoring Hierarchy
**Wrong:** "Abusive" typography on body text
**Right:** Violent scale for display, restraint for content

### Mistake 3: Over-decoration
**Wrong:** Adding friction for visual interest
**Right:** Adding friction to encode meaning

### Mistake 4: Ignoring Accessibility
**Wrong:** Removing focus indicators because they're not "aesthetic"
**Right:** Custom focus states that fit the signature

---

## 📝 Checklist Before Shipping

```
Visual Audit:
□ No 12px border-radius
□ No perfectly centered heroes
□ No symmetrical 3-column grids
□ No uniform padding
□ No generic gradients
□ No unmodified icon libraries

Typography Audit:
□ H1 is "violent" (4rem+)
□ Clear hierarchy (not ±2px)
□ Max 2 font families
□ Display text has negative letter-spacing
□ No orphaned headings

Color Audit:
□ No pure #fff or #000
□ Accent < 5% visual area
□ Colors have material names
□ Max 5 colors total

Component Audit:
□ Buttons have distinct structures
□ Cards have internal hierarchy
□ Forms feel technical
□ Icons < 12 symbols

Animation Audit:
□ No ambient motion
□ Semantic purpose only
□ Custom easing functions
□ Respects prefers-reduced-motion

Content Audit:
□ No buzzwords without specificity
□ Headings contain ideas
□ Copy is product-specific
```

---

## 💬 Philosophy & Principles

### Why This Exists
AI design tools optimize for the **average of all human designs**. This creates a convergence toward bland, safe, template-like outputs.

Human designers make **controversial choices** that:
- Break conventions intentionally
- Create memorable tension
- Encode specific meaning
- Reflect individual taste

This skill is the immune system that rejects the average.

### Core Beliefs

1. **Intent > Decoration**
   Every element must answer: "Why does this exist?"

2. **Restraint > Abundance**
   Silence is better than meaningless decoration.

3. **Tension > Comfort**
   Memorable designs embrace controlled imbalance.

4. **Specificity > Universality**
   If it works everywhere, it belongs nowhere.

5. **Authorship > Automation**
   Algorithms produce output. Humans create design.

---

## 🤝 Contributing

This is a living document. If you discover new AI slop patterns or better anti-slop techniques:

1. Document the pattern with examples
2. Provide specific detection rules
3. Suggest concrete replacements
4. Show before/after

---

## 📄 License

**Public Domain / CC0**

Use this however you want. The goal is to raise the bar for web design, not to own the process.

---

## 🎯 Final Mantra

> **"If it can be done by an algorithm, it's not design — it's output."**

Human design requires:
- **Taste** (subjective judgment)
- **Restraint** (knowing what to remove)
- **Courage** (making controversial choices)
- **Intent** (every element earns its place)

Your role is to be the immune system that rejects the average.

---

**Version:** 3.0  
**Last Updated:** January 2026  
**Author:** Human designers fighting the convergence
