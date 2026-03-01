---
name: image-to-svg
description: Convert raster image files (PNG, JPG, JPEG, WEBP, BMP, PBM) to SVG vector files. Use when a user asks to vectorize a logo, icon, sketch, screenshot, or any bitmap image into editable/scalable SVG, including monochrome tracing and color-aware tracing.
---

# Image to SVG

Convert bitmap images into SVG vectors with an automatic backend selection.

## Quick Start

1. Run the converter script:
```bash
python3 skills/image-to-svg/scripts/image_to_svg.py --input /absolute/path/image.png
```
2. The script writes `image.svg` next to the input unless `--output` is provided.
3. For color-preserving vectors, prefer:
```bash
python3 skills/image-to-svg/scripts/image_to_svg.py --input logo.png --mode vtracer --color-mode color
```

## Workflow

1. Confirm input path exists and is a supported image format.
2. Choose tracing mode:
- Use `--mode auto` for best available backend.
- Use `--mode potrace` for clean black-and-white logos/icons.
- Use `--mode vtracer` for color-aware vectorization.
3. Tune output if needed:
- `--threshold` for stronger/lighter monochrome tracing.
- `--speckle` to remove tiny noise.
- `--path-precision` to simplify or preserve detail.
4. Return output SVG path and mention which backend was used.

## Script

`skills/image-to-svg/scripts/image_to_svg.py`

Key options:
- `--input`: input bitmap path (required)
- `--output`: output SVG path (optional)
- `--mode`: `auto | vtracer | potrace`
- `--color-mode`: `bw | color` (color requires `vtracer`)
- `--threshold`: `0-100` threshold for monochrome conversion
- `--speckle`: positive integer noise filter
- `--path-precision`: positive float (higher = more detail)

## Dependencies

The script auto-detects installed tools and fails with a clear message if missing.

- `vtracer` (recommended for color vectorization)
- `potrace` + (`magick` or `mkbitmap`) for monochrome tracing

## Troubleshooting

- If output is too detailed, reduce `--path-precision` or increase `--speckle`.
- If thin features disappear, lower `--threshold`.
- If color mode fails, install `vtracer` and rerun with `--mode vtracer`.
