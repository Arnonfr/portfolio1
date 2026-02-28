# Handoff — Portfolio Project (Last updated: 2026-02-12)

## What this project is
Personal portfolio for Arnon Friedman, product designer.
React 19 + TypeScript + Vite + Framer Motion + Tailwind CSS.
Dev: `npm run dev` → http://localhost:4000

---

## Current State

### ✅ Done
- **Floral Homepage** — The `/` route now serves `StaticHomeAlternative` (the floral version) permanently instead of A/B testing.
- **TextOnPathHero** — animated SVG text-on-path hero. Two wavy text tracks that resolve into a centered phrase on scroll. Subtle wave amplitude (~±100px). Red secondary track with multiply blend.
- **WebTraderCaseStudy** (`components/WebTraderCaseStudy.tsx`) — full two-part case study:
  - Part 1: Signals (problem → understand your position → mapping data → scan variables → mobile result)
  - Part 2: Web Trader platform (account management → desktop nav → iterations → outcome)
  - All images mapped from `Mockups Images/web trader/` → `public/images/wt-*.png`
- **DigitalStack** (`components/DigitalStack.tsx`) — interactive tool section:
  - Claw machine interaction following mouse X/Y.
  - Organic pile of 25 real SVG logos stacked from the bottom.
  - Interactive DotGrid background (Canvas) with delicate lines connecting grid points near mouse.
  - Collected tools panel on the right with custom animations.
- **vercel.json** — SPA rewrite rule ready for deployment

### 🔲 Not Done / Pending
- **Smart Clauses** (id=3) — uses generic ProjectPage, no dedicated case study component
- **Cookit** (id=4) — uses generic ProjectPage, no dedicated case study component
- **Domain** — arnonfriedman.com bought on Hostinger, not yet connected to Vercel
- **Deployment** — repo not pushed to GitHub / connected to Vercel yet

---

## File Map
```
App.tsx                          — routing, navigation
data.ts                          — PROJECTS array (ids 1–5)
components/
  TextOnPathHero.tsx             — hero SVG animation
  NewHomepage.tsx                — main homepage
  WebTraderCaseStudy.tsx         — Web Trader (id=2) ✅
  ClaimMovementShowcase.tsx      — Claim Movements (id=1)
  ArabicSyntaxCaseStudy.tsx      — Arabic Syntax (id=5)
  ProjectPage.tsx                — generic fallback for id=3,4
public/images/
  wt-*.png                       — Web Trader images
  claim-*.png                    — Claim Movements images
  arabic-syntax-*.png            — Arabic Syntax images
  cooka/                         — Cookit images
Mockups Images/web trader/       — source PNGs (not public, don't serve these)
```

---

## Web Trader Image Map
| public/images/ | Source file |
|---|---|
| wt-hero.png | Header.png |
| wt-signal-before-after.png | Full1.png |
| wt-position-explain.png | Group 26812.png |
| wt-signal-detail.png | Full3.png |
| wt-signal-annotated.png | Component1 with explain.png |
| wt-signals-list.png | Group 24-1.png |
| wt-signal-cards.png | SIde1.png |
| wt-side-menu.png | Side.png |
| wt-account-switcher.png | Full Section.png |
| wt-desktop-nav.png | Side3.png |
| wt-iterations.png | Full - end.png |

---

## TextOnPathHero Notes
- `VB_CY = 500`, viewBox: `-200 -600 2800 2200`
- Wave amplitude intentionally subtle (±90–120px). User was frustrated when curves were too extreme — do NOT increase amplitude.
- Off-screen loop: y ≈ -400 max. Was -800 before, caused too-wild curves.
- Resolved text: letter-spacing lerps -0.01→0.13em, fontSize 62→84px on scroll complete.

---

## Deployment Steps (when ready)
1. `git push` to GitHub repo
2. Connect repo on vercel.com (import project)
3. Vercel auto-detects Vite — no config needed beyond vercel.json
4. Add custom domain arnonfriedman.com in Vercel dashboard
5. In Hostinger DNS: add CNAME record pointing to `cname.vercel-dns.com`
