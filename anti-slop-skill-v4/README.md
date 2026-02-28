# Anti-AI Slop Skill V4.0
## Principles Over Formulas

---

## 🎯 What Changed in V4.0

### The Problem with V3.0:
V3.0 accidentally created a **new template**:
- Every project → Purple/Teal/Black
- Every project → Noto Sans
- Every project → `[ BRACKETS ]`
- Every project → Same "violent" typography

**This defeated the entire purpose.**

### V4.0 Solution:
**Principles, not recipes.**

Instead of: "Always use these colors"  
Now: "Choose colors based on brand personality"

Instead of: "Always use Golden Ratio grids"  
Now: "Choose grid structure based on content hierarchy"

Instead of: "Always use aggressive typography"  
Now: "Match typography energy to brand energy"

---

## 🎨 Core Philosophy

> **Design is contextual.**  
> What works for a law firm doesn't work for a skateboard shop.  
> What works for a meditation app doesn't work for a crypto exchange.

**The Goal:** Create designs that are **specific to their context**, not designs that follow a formula.

---

## 📚 What's Included

### 1. `SYSTEM-PROMPT.md` (Completely Rewritten)
Now organized around **frameworks for decision-making**, not fixed rules.

**Key Sections:**
- **Project-Specific Questions** - Ask these BEFORE designing
- **Color Framework** - How to choose colors (not which colors to use)
- **Typography Framework** - Matching type to brand energy
- **Layout Framework** - Grid based on content, not formula
- **Animation Framework** - Motion that reflects personality
- **Anti-Formula Checklist** - Ensuring variety across projects

### 2. `human-signature.css` (Reference, Not Template)
CSS examples showing **approaches**, not a system to copy.

**Use it as:**
- Inspiration for structure
- Examples of techniques
- Reference for implementation

**Don't use it as:**
- A drop-in stylesheet
- The only way to write CSS
- A style guide for every project

### 3. `slop-audit.js` (Updated Logic)
Now checks for **formula application**, not just AI patterns.

**New Checks:**
- Are you using the same colors across projects?
- Are all your grids 1.618fr 1fr?
- Do all buttons have the same interaction?

---

## 🚀 How to Use V4.0

### Step 1: Answer Project-Specific Questions

Before touching code, answer:

```
Brand Energy: 1-10 (Calm → Energetic)
Brand Formality: 1-10 (Casual → Formal)
Brand Personality: (3 adjectives)
Industry Context: (What do competitors do?)

Content Type: Text-heavy? Data-heavy? Visual-heavy?
Primary Action: What should users DO?
Update Frequency: Static or dynamic?
```

**Example: Meditation App**
```
Energy: 2/10
Formality: 3/10
Personality: Calm, Warm, Minimal
Competitors: Bright, playful (Headspace), clinical (Calm)

→ Design Direction: Soft blues, simple serif, slow animations, lots of space
```

**Example: Crypto Trading Platform**
```
Energy: 9/10
Formality: 8/10
Personality: Bold, Technical, Confident
Competitors: Dark, data-dense

→ Design Direction: Dark mode, monospace, instant feedback, high contrast
```

### Step 2: Choose Approach Based on Context

**Don't start with "I'll use the Golden Ratio."**

**Do start with "This content has X hierarchy, so I need Y grid."**

**Examples:**

```css
/* Blog with equal-weight posts */
grid-template-columns: 1fr 1fr 1fr;

/* Article + sidebar */
grid-template-columns: 2fr 1fr;

/* Dashboard with primary metric */
grid-template-columns: 3fr 1fr 1fr;
```

### Step 3: Vary Your Approach Across Projects

**Intentional Diversity:**

If your last project was:
- Bold typography → Next: Refined typography
- Bright colors → Next: Muted tones
- Playful animations → Next: Minimal motion
- Asymmetric layouts → Next: Structured grid

**Your portfolio should show RANGE.**

---

## 📊 Decision Frameworks

### Color Selection Framework

**Step 1: Brand Emotion**
- Trust → Blues, teals
- Energy → Reds, oranges
- Growth → Greens
- Luxury → Deep purples, golds, blacks

**Step 2: Number of Colors**
- Minimalist: 2-3
- Expressive: 4-6
- Complex systems: Up to 8

**Step 3: Meaningful Names**

❌ `--primary`, `--secondary`  
✅ `--forest`, `--sky`, `--earth` (for nature brand)  
✅ `--midnight`, `--neon`, `--slate` (for tech brand)

### Typography Selection Framework

**Step 1: Brand Character**
| Character | Font Approach |
|:----------|:--------------|
| Technical | Monospace or geometric sans |
| Traditional | Serif (Freight, Tiempos) |
| Modern | Sans (Inter, Space Grotesk) |
| Playful | Rounded sans or display fonts |

**Step 2: Hierarchy Strategy**

Pick ONE per project:
- **Violent Scale:** h1 massive, h2 tiny (editorial)
- **Weight Contrast:** Same size, different weights (refined)
- **All-Caps Labels:** Small caps headings (luxury)
- **Monospace:** Technical documentation

**Step 3: Scale Based on Content**

Not "always 8vw" but:
- Hero statements → Large (4-8vw)
- Section headings → Medium (2-3rem)
- Labels → Small (0.75-1rem)

### Animation Selection Framework

**Brand Energy → Motion Style**

| Energy Level | Timing | Easing |
|:-------------|:-------|:-------|
| Very calm (1-3) | 0.4-0.6s | Linear or slow ease |
| Balanced (4-7) | 0.2-0.3s | Ease-out |
| Energetic (8-10) | 0.1-0.15s | Spring/bounce |

---

## ✅ Quality Checklist (Updated)

### Anti-Slop Checks:
- [ ] No 12px border-radius everywhere
- [ ] No pure #fff or #000
- [ ] No default Heroicons unchanged
- [ ] No symmetrical grids without reason
- [ ] No ambient animations

### Anti-Formula Checks (NEW):
- [ ] **Colors different from my last project**
- [ ] **Typography approach different from my last project**
- [ ] **Layout strategy different from my last project**
- [ ] **Can explain WHY this brand needs THIS specific approach**
- [ ] **Design would break if applied to different brand**
- [ ] **At least 3 decisions were contextual, not habitual**

### Contextual Fit Checks (NEW):
- [ ] **Colors match brand personality (not my preference)**
- [ ] **Typography matches content type**
- [ ] **Spacing reflects information hierarchy**
- [ ] **Animations match brand energy**
- [ ] **Grid serves content, not formula**

---

## 🎯 Examples: Same Principle, Different Outcomes

### Principle: "Create Visual Hierarchy"

**Applied to Law Firm:**
```css
h1 { 
  font-size: 2.5rem; 
  font-weight: 300;
  font-family: 'Freight Text', serif;
  color: var(--charcoal);
}
```
→ Refined, authoritative, traditional

**Applied to Gaming Site:**
```css
h1 { 
  font-size: 8vw; 
  font-weight: 900;
  font-family: 'Space Grotesk', sans-serif;
  text-transform: uppercase;
  color: var(--neon);
}
```
→ Bold, energetic, modern

**Applied to Meditation App:**
```css
h1 { 
  font-size: 3rem; 
  font-weight: 400;
  font-family: 'Lora', serif;
  color: var(--soft-blue);
  line-height: 1.4;
}
```
→ Calm, readable, spacious

**Same principle → 3 completely different executions.**

---

## 🚫 What NOT To Do

### ❌ Template Thinking:

```
"I'll use Purple/Teal because the framework says so"
"I'll make h1 15vw because that's the rule"
"I'll add [ BRACKETS ] to all buttons"
"I'll use 1.618fr 1fr grid everywhere"
```

### ✅ Contextual Thinking:

```
"This nonprofit needs warm, accessible colors → oranges and teals"
"This data dashboard needs readable headings → 2rem max"
"This technical product needs mechanical buttons → monospace labels"
"This blog has equal-weight posts → 1fr 1fr 1fr grid"
```

---

## 🎨 Variety Examples

If you use this framework properly, projects should look **completely different**:

**Project A: Nonprofit (Warm, Accessible)**
- Colors: Orange, Teal, Cream
- Typography: Open Sans, friendly
- Grid: Asymmetric, humanistic
- Motion: Smooth, gentle

**Project B: Finance (Professional, Bold)**
- Colors: Navy, Gold, White
- Typography: Freight Text, authoritative
- Grid: Structured, data-focused
- Motion: Quick, precise

**Project C: Creative Studio (Playful, Expressive)**
- Colors: Pink, Yellow, Purple
- Typography: Syne, quirky
- Grid: Broken, experimental
- Motion: Bouncy, rewarding

**Project D: SaaS Tool (Minimal, Functional)**
- Colors: System grays + Blue accent
- Typography: System fonts
- Grid: Clean, predictable
- Motion: Instant, minimal

**All use the same PRINCIPLES.  
None use the same EXECUTION.**

---

## 🔧 Integration with AI Tools

### Prompting for Contextual Design:

**❌ Bad Prompt:**
```
"Create a website using the Anti-Slop framework"
```
→ This will give you the V3.0 template (Purple/Teal/Brackets)

**✅ Good Prompt:**
```
"I'm designing for [brand type]. 

Brand personality: [3 adjectives]
Energy level: [1-10]
Industry context: [what competitors do]

Using Anti-Slop V4.0 principles:
1. Suggest a color palette that fits THIS brand
2. Suggest typography that matches THIS energy
3. Suggest a grid that serves THIS content type

Explain WHY each choice fits this specific context."
```

---

## 📖 Migration from V3.0 to V4.0

If you've been using V3.0:

### Keep:
- ✅ Avoiding 12px border-radius everywhere
- ✅ Avoiding pure #fff and #000
- ✅ Creating strong hierarchy
- ✅ Avoiding generic icon libraries
- ✅ Intentional spacing

### Change:
- 🔄 **Stop using same colors for every project**
- 🔄 **Stop using same typography scale for every project**
- 🔄 **Stop using brackets `[ ]` unless brand is technical**
- 🔄 **Start with brand questions, not design patterns**
- 🔄 **Choose approaches based on context, not habit**

---

## 🎓 Learning Path

### Beginner (Following Formulas):
- Uses same approach for every project
- Copies examples directly
- Focuses on "what looks good"

### Intermediate (Understanding Principles):
- Asks "why does this work?"
- Adapts examples to context
- Starts making contextual choices

### Advanced (Applying Contextually):
- Every project looks different
- Decisions based on brand/content
- Can explain every choice
- Creates variety across portfolio

**V4.0 pushes you from Beginner → Advanced.**

---

## 🎯 Success Criteria

Your use of this framework is successful when:

✅ **Your last 3 projects look visibly different from each other**  
✅ **You can explain why EACH project needed THAT specific approach**  
✅ **Someone couldn't guess your "style" by looking at your portfolio**  
✅ **Each design feels authored for that specific brand, not templated**  
✅ **You're making decisions based on context, not copying patterns**

---

## 📝 Quick Reference

### Before Every Project:

1. ❓ **Ask:** What's the brand personality? (3 adjectives)
2. ❓ **Ask:** What's the energy level? (1-10)
3. ❓ **Ask:** What do competitors look like? (differentiate)
4. ❓ **Ask:** What's the content type? (text/data/visual)
5. 🎨 **Then:** Choose colors that fit THIS brand
6. ✍️ **Then:** Choose typography that fits THIS energy
7. 📐 **Then:** Choose grid that serves THIS content
8. 🎬 **Then:** Choose motion that reflects THIS personality

### During Design:

9. ✅ **Check:** Can I explain WHY I chose X over Y?
10. ✅ **Check:** Would this work for a different brand? (Should be NO)
11. ✅ **Check:** Is this different from my last project?

### Before Shipping:

12. ✅ **Audit:** No AI slop patterns (12px radius, etc.)
13. ✅ **Audit:** No formula application (same colors as last project)
14. ✅ **Audit:** Contextually appropriate (matches brand)

---

## 🌟 Final Thought

> **V3.0 told you WHAT to do.**  
> **V4.0 teaches you HOW to think.**

The goal isn't to follow rules.  
The goal is to **make better decisions** based on context.

Every brand is different.  
Every project needs a unique solution.  
Your job is to **think**, not to **template**.

**Now go make something that couldn't exist for anyone else.** 🚀

---

**Version:** 4.0  
**Philosophy:** Principles Over Formulas  
**Goal:** Contextual, Authored, Diverse Design
