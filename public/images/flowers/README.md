# Flower SVG Workflow

Convert any flower image to an animatable SVG and generate rig metadata for web hover animation.

## 1) Convert image -> SVG + default quick rig

```bash
npm run svg:flower -- --input /absolute/path/to/flower.png --name my-flower
```

Output files:

- `public/images/flowers/my-flower.svg`
- `public/images/flowers/my-flower.rig.json`

## 2) Optional split rig (stem + bloom selectors)

Use this when your SVG contains separate elements for stem and bloom:

```bash
npm run svg:flower:rig -- --name my-flower --stem-selector "#stem" --bloom-selector "#bloom"
```

If selectors are invalid, the script prints a warning and automatically falls back to `quick`.

## 3) Validate files and rig

```bash
npm run svg:flower:verify -- --name my-flower
```

## 4) React usage

```tsx
import { InteractiveFlower } from './components/InteractiveFlower';

<InteractiveFlower
  name="my-flower"
  size={320}
  amplitudeDeg={7}
  durationMs={900}
  enableParallaxBloom
/>
```

## Notes

- Input supports: `png`, `jpg`, `jpeg`, `webp`, `bmp`, `pbm`.
- The converter uses `skills/image-to-svg/scripts/image_to_svg.py` in color mode via `vtracer`.
- Animation respects `prefers-reduced-motion`.
