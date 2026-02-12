# Interaction Cookbook — Animation & Micro-Interaction Recipes

All recipes use Framer Motion (the project's animation library) unless noted otherwise. Each recipe includes: what it does, when to use it, implementation pattern, and performance notes.

---

## Part 1: Page-Level Animations

### Recipe 1.1: Section Reveal on Scroll

**What:** Sections fade up and become visible as they enter the viewport.
**When:** Default behavior for every major section. Creates progressive disclosure.

```tsx
// Pattern: useInView wrapper for section animation
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,        // Animate only once
    margin: "-100px"   // Trigger 100px before entering viewport
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]  // Power ease-out
      }}
    >
      {children}
    </motion.section>
  );
}
```

**Performance notes:**
- `once: true` prevents re-animation on scroll back (better perf)
- Use `will-change: transform, opacity` sparingly (only during animation)
- Avoid animating `height`, `width`, or `top/left` — stick to `transform` and `opacity`

---

### Recipe 1.2: Staggered Children Reveal

**What:** Child elements within a section animate in sequentially with a delay.
**When:** Lists of project cards, expertise tiles, or any group of similar items.

```tsx
// Pattern: staggerChildren with variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,  // 120ms between each child
      delayChildren: 0.1      // Wait 100ms before starting
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

function ProjectGrid({ projects }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {projects.map(project => (
        <motion.div key={project.id} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**Tuning guide:**
- 3-4 items: `staggerChildren: 0.15` (noticeable cascade)
- 5-8 items: `staggerChildren: 0.08` (quick cascade)
- 8+ items: `staggerChildren: 0.05` (wave effect)

---

### Recipe 1.3: Parallax Scroll Effect

**What:** Elements move at different speeds relative to scroll position.
**When:** Hero section backgrounds, decorative elements, section transitions.

```tsx
import { motion, useScroll, useTransform } from 'framer-motion';

function ParallaxHero() {
  const { scrollY } = useScroll();

  // Foreground moves at normal speed, background moves slower
  const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-cover"
      />
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10"
      >
        <h1>ARNON FRIEDMAN</h1>
      </motion.div>
    </div>
  );
}
```

**Performance notes:**
- `useScroll` + `useTransform` runs on Framer Motion's animation thread
- NEVER use `window.addEventListener('scroll')` for parallax — use Framer Motion's hooks
- Disable on mobile: parallax feels janky on touch devices
- Keep transform values small (< 200px displacement)

---

### Recipe 1.4: Horizontal Scroll Section

**What:** A section that scrolls horizontally while the page scrolls vertically.
**When:** Project carousel, timeline, or showcasing a series of related items.

```tsx
function HorizontalScroll({ items }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(items.length - 1) * 100}%`]
  );

  return (
    <div ref={containerRef} style={{ height: `${items.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {items.map(item => (
            <div key={item.id} className="min-w-full h-full flex-shrink-0">
              {/* Item content */}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
```

**Usage warning:** Horizontal scroll is high-risk. Only use if:
- There are 3-5 items (not more)
- Each item fills the full viewport
- There's a clear visual indicator of horizontal progress
- The content genuinely benefits from horizontal layout

---

## Part 2: Text Animations

### Recipe 2.1: ScrambleText (Already in Project)

The project already has `ScrambleText` component. Use it for:
- Hero name reveal on page load
- Section titles on scroll
- Hover-triggered text effects

**Usage pattern:**
```tsx
<ScrambleText
  text="ARNON FRIEDMAN"
  trigger="inView"     // or "delay" or "hover"
  delay={200}          // ms before starting
  speed={50}           // ms per character resolve
  chars="!@#$%^&*()"  // characters to cycle through
/>
```

---

### Recipe 2.2: Line-by-Line Text Reveal (Mask)

**What:** Text reveals line by line, as if a curtain is lifting from each line.
**When:** Statement/philosophy text, about section paragraphs, large body copy.

```tsx
// Pattern: split text into lines, animate each with mask
function TextReveal({ text, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const lines = text.split('\n');

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.1  // Stagger per line
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
```

**Key detail:** The outer `div` has `overflow: hidden` — this creates the mask. The inner `div` slides up from below the mask, revealing the text.

---

### Recipe 2.3: Character-by-Character Stagger

**What:** Each letter animates in individually with a stagger delay.
**When:** Hero name (maximum impact), section headlines.

```tsx
function StaggerText({ text, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.h1
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.03 } },
        hidden: {}
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1, y: 0,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
            }
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
```

**Performance note:** For strings > 20 characters, this creates many DOM nodes. Use sparingly — only for short display text.

---

### Recipe 2.4: Counter Animation

**What:** Numbers count up from 0 to target value.
**When:** Stats section, years of experience, project count, metrics.

```tsx
import { useSpring, animated } from 'framer-motion';

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1]
      });
    }
  }, [isInView]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

// Usage: <AnimatedCounter value={8} suffix="+" />
```

---

## Part 3: Hover & Cursor Effects

### Recipe 3.1: Magnetic Button

**What:** Button subtly moves toward cursor when mouse is within proximity.
**When:** CTAs, project links, contact links. Use for 2-3 key interactive elements — not everything.

```tsx
function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.button>
  );
}
```

**Tuning guide:**
- `strength: 0.2` — Subtle pull (recommended for most uses)
- `strength: 0.4` — Noticeable magnetic effect
- `strength: 0.6+` — Too much — feels broken

---

### Recipe 3.2: Project Card Hover with Image Scale

**What:** Card image scales slightly on hover with overflow hidden.
**When:** Every project card in a grid.

```tsx
function ProjectCard({ project }) {
  return (
    <Link to={`/work/${project.id}`} className="group block">
      {/* Image container with overflow hidden */}
      <div className="overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
          whileHover={{ scale: 1.04 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      </div>

      {/* Text below image */}
      <div className="mt-4">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-sm text-ash mt-1">{project.category}</p>
      </div>
    </Link>
  );
}
```

**Key details:**
- Container has `overflow: hidden` — image scales but never breaks boundaries
- Use `group` / `group-hover` for coordinated text effects
- Grayscale → color transition on hover creates strong contrast
- Duration 500-700ms for image transitions (slower than button hovers)

---

### Recipe 3.3: Cursor-Following Project Image (Text List Hover)

**What:** When hovering over text-only project list items, an image appears near the cursor.
**When:** Text list project showcase (Blueprint C in SECTION-BLUEPRINTS.md).

```tsx
function ProjectList({ projects }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {projects.map(project => (
        <div
          key={project.id}
          onMouseEnter={() => setHoveredProject(project)}
          onMouseLeave={() => setHoveredProject(null)}
          className="border-b border-concrete py-6 flex justify-between cursor-pointer"
        >
          <span className="font-bold">{project.title}</span>
          <span className="text-ash font-mono text-sm">{project.category}</span>
        </div>
      ))}

      {/* Floating image that follows cursor */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              left: mouseX,
              top: mouseY,
              x: 20,   // Offset from cursor
              y: -100   // Above cursor
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
              className="w-80 h-60 object-cover shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Performance notes:**
- Use `pointer-events-none` on the floating image to prevent hover interference
- `fixed` positioning with motion values is more performant than updating state
- Use `AnimatePresence` for smooth entry/exit transitions
- Consider throttling `mouseX`/`mouseY` updates at 60fps

---

### Recipe 3.4: Link Underline Animation

**What:** Link underline draws in from left to right on hover, or expands from center.
**When:** Navigation links, project CTAs, any inline link.

```css
/* CSS-only approach — more performant than JS */
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.link-underline:hover::after {
  transform: scaleX(1);
}
```

**Variants:**
- `transform-origin: left` — draws from left to right
- `transform-origin: center` — expands from center
- `transform-origin: right` — draws from right (for back navigation)

---

### Recipe 3.5: Cursor Glow Effect

**What:** A radial gradient glow follows the cursor across the page.
**When:** Dark sections only. Creates ambient depth. Use as background effect, not foreground.

```tsx
function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(204, 255, 0, 0.06),
            transparent 80%
          )
        `
      }}
    />
  );
}
```

**Usage rules:**
- Opacity must be very low (0.03-0.08) — subtle, not a spotlight
- Only on dark backgrounds (invisible on light backgrounds)
- Disable on mobile (no cursor)
- Use `pointer-events-none` to prevent blocking clicks

---

## Part 4: Page Transitions

### Recipe 4.1: Route Transition (React Router + Framer Motion)

**What:** Smooth crossfade or slide when navigating between pages.
**When:** Between homepage and project pages.

```tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          {/* routes here */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
```

**Advanced variant:** Shared element transition where a project card image expands into the case study hero. This requires `layoutId` in Framer Motion:

```tsx
// On homepage card:
<motion.img layoutId={`project-${id}`} src={image} />

// On project page hero:
<motion.img layoutId={`project-${id}`} src={image} />
```

Framer Motion automatically animates between the two positions.

---

## Part 5: Scroll-Driven Visual Effects

### Recipe 5.1: Scroll Progress Indicator

**What:** A thin line at the top of the page that fills as user scrolls.
**When:** Long pages, especially case study pages.

```tsx
function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-acid z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

---

### Recipe 5.2: Text Opacity Linked to Scroll

**What:** Statement text gradually becomes more opaque as user scrolls into view.
**When:** Philosophy statements, large quotes, hero subtext.

```tsx
function ScrollRevealText({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
```

---

### Recipe 5.3: Image Reveal on Scroll (Clip-Path Wipe)

**What:** Image reveals progressively as user scrolls, using clip-path.
**When:** Hero images, project images, about section portrait.

```tsx
function ScrollRevealImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "inset(100% 0% 0% 0%)",   // Fully hidden (clipped from top)
      "inset(0% 0% 0% 0%)"      // Fully visible
    ]
  );

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      style={{ clipPath }}
      className="w-full h-auto"
    />
  );
}
```

---

## Part 6: Performance & Accessibility

### Animation Performance Rules

1. **Only animate `transform` and `opacity`** — these are GPU-composited and don't trigger layout
2. **Avoid animating:** `width`, `height`, `top`, `left`, `padding`, `margin`, `border-radius`
3. **Use `will-change` sparingly** — only on elements currently animating
4. **Disable animations for `prefers-reduced-motion`:**

```tsx
// Check in React
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In Framer Motion — use reduced motion hook
import { useReducedMotion } from 'framer-motion';

function AnimatedSection({ children }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.7 }}
    >
      {children}
    </motion.div>
  );
}
```

5. **Mobile performance budget:**
   - Maximum 3 simultaneous animations at any scroll position
   - No parallax on mobile
   - No cursor effects on touch devices
   - Simplified hover states → visible by default

### Accessibility Checklist for Animations

- [ ] All animations respect `prefers-reduced-motion`
- [ ] No content is hidden behind hover-only interactions (mobile fallback)
- [ ] Animated text is readable (not moving too fast)
- [ ] Focus indicators work on all interactive elements
- [ ] Screen readers can access all content regardless of animation state
- [ ] No flashing content (< 3 flashes per second)

---

## Easing Reference

| Name | Value | Use Case |
|:-----|:------|:---------|
| Power Ease-Out | `[0.16, 1, 0.3, 1]` | Section reveals, content entering |
| Spring Recoil | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Button hovers, interactive feedback |
| Material | `[0.4, 0, 0.2, 1]` | Subtle UI transitions |
| Smooth Decel | `[0, 0, 0.2, 1]` | Menu reveals, overlays |
| Sharp | `[0.4, 0, 1, 1]` | Exit animations, closing |

### Timing Guidelines
| Element Type | Duration | Notes |
|:-------------|:---------|:------|
| Buttons | 150-250ms | Must feel instant |
| Cards | 300-500ms | Noticeable but quick |
| Sections | 500-800ms | Deliberate entrance |
| Page transitions | 300-500ms | Fast — users are navigating |
| Text reveals | 400-700ms | Per line, with stagger |
| Image reveals | 600-1000ms | Dramatic but not slow |
