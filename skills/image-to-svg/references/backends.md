# Backends

## vtracer

Use for color-aware vectorization and smoother shapes from logos/illustrations.

Example:
```bash
vtracer --input input.png --output output.svg --colormode color --filter_speckle 4 --mode spline
```

## potrace

Use for clean monochrome vectors.

If source is not PBM, first convert it to PBM (via `magick` or `mkbitmap`) and then trace:
```bash
potrace input.pbm -s -o output.svg
```

## Selection Rule

- Prefer `vtracer` for color output.
- Prefer `potrace` for high-contrast black/white output.
