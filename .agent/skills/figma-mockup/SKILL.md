---
name: Figma & Mockup Specialist
description: Guidelines for working with Figma assets, browser-based design tools, and generating context-aware mockups.
---

# Figma & Mockup Specialist Skill

This skill outlines the best practices for handling design assets, interacting with Figma in the browser, and creating professional mockups when high-res assets are unavailable.

## 1. Working with Figma in the Browser

When a user provides a Figma link:
1.  **Direct Interaction:** The browser agent can attempt to visit the link. Note that most Figma files require authentication.
    *   *If public/view-only:* Use the browser agent to navigate, zoom (mouse_wheel), and capture screenshots of specific frames.
    *   *If private:* Ask the USER to "Export the frame as PNG/JPG" and upload it, or provide a public "Prototype" link which is often easier to view.
2.  **Navigation Logic:**
    *   Use `browser_mouse_wheel` to pan around the canvas.
    *   Look for "Play" icons to enter Prototype mode for cleaner screenshots without UI clutter.

## 2. Generating Context-Aware Mockups

When you cannot access the raw design file, or when you need to present a raw screenshot in a premium way, follow these "Mockup Generation" rules.

### A. The "Container" Rule
**NEVER** just dump a raw screenshot into a page unless it's a wireframe. Always wrap it in a context:
*   **Browser Window:** Wrap web app screenshots in a simple browser frame (dots on top left, shadow).
*   **Mobile Device:** Wrap mobile screenshots in a clean phone bezel.
*   **Perspective Tilt:** If the design feels flat, use CSS transforms (perspective, rotateY) to add 3D depth.

### B. Creating Synthetic Assets (When Assets are Missing)
If a visual is missing (e.g., "Signals Dashboard"), **do not** use a "Missing Image" placeholder text. Instead, generate a High-Fidelity Mockup using `generate_image` or build a CSS representation.

**Option 1: CSS Composition (preferred for text/data clarity)**
Build a "Skeleton" or "Abstract" version of the UI in code.
*   *Technique:* Use `div`s with gray backgrounds to represent layout blocks. Add "shimmer" effects.
*   *Goal:* Show the *structure* of the missing data (e.g., a list of signals) even if real data is missing.

**Option 2: AI Image Generation**
Use `generate_image` to create a *representation* of the concept.
*   *Prompt Structure:* `[UI Style] interface of [Subject], [Color Palette], high fidelity, vector style, flat design, white background`.
*   *Example:* "Dashboard interface of a crypto trading signal app, dark mode, neon blue accents, clean graphs, high quality UI design."
*   *Context:* Place this generated image inside a CSS-styled container (e.g., a "Glassmorphism" card).

## 3. Visual QA & Polish

Before finalizing any visual component:
*   **Collision Check:** Does the mockup overlap with sticky headers or global navigation? (See "The Huge Flaw" below).
*   **Contrast Check:** Is the text on top of the mockup readable?
*   **Padding:** Does the mockup have room to breathe?

## 4. Troubleshooting Common "Flaws"
*   **Double Headers:** If a custom project page has its own navigation, **HIDE** the global app header.
*   **Z-Index Wars:** Ensure modals and sticky navs have correct z-index hierarchy.
*   **Cut-off Content:** Ensure proper `padding-top` is added to the body or main container if a header is explicitly `fixed`.
