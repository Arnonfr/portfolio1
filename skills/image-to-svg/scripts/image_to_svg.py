#!/usr/bin/env python3
"""Convert raster images to SVG using vtracer or potrace."""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".pbm"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert raster image to SVG")
    parser.add_argument("--input", required=True, help="Path to input raster image")
    parser.add_argument("--output", help="Path to output SVG (default: <input>.svg)")
    parser.add_argument(
        "--mode",
        choices=["auto", "vtracer", "potrace"],
        default="auto",
        help="Tracing backend",
    )
    parser.add_argument(
        "--color-mode",
        choices=["bw", "color"],
        default="bw",
        help="Output color mode (color requires vtracer)",
    )
    parser.add_argument(
        "--threshold",
        type=int,
        default=55,
        help="Monochrome threshold 0-100 (used by potrace flow)",
    )
    parser.add_argument(
        "--speckle",
        type=int,
        default=4,
        help="Filter tiny artifacts (higher removes more small shapes)",
    )
    parser.add_argument(
        "--path-precision",
        type=float,
        default=2.0,
        help="Path precision/detail (higher preserves more detail)",
    )
    return parser.parse_args()


def require_file(path: Path) -> None:
    if not path.exists() or not path.is_file():
        raise FileNotFoundError(f"Input file not found: {path}")
    if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
        raise ValueError(
            f"Unsupported input extension '{path.suffix}'. "
            f"Supported: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
        )


def choose_backend(mode: str, color_mode: str) -> str:
    has_vtracer = shutil.which("vtracer") is not None
    has_potrace = shutil.which("potrace") is not None

    if mode == "vtracer":
        if not has_vtracer:
            raise RuntimeError("'vtracer' is not installed or not in PATH")
        return "vtracer"

    if mode == "potrace":
        if not has_potrace:
            raise RuntimeError("'potrace' is not installed or not in PATH")
        if color_mode == "color":
            raise RuntimeError("Color output is not supported in potrace mode")
        return "potrace"

    if color_mode == "color":
        if has_vtracer:
            return "vtracer"
        raise RuntimeError("Color mode requires 'vtracer', but it was not found")

    if has_potrace:
        return "potrace"
    if has_vtracer:
        return "vtracer"
    raise RuntimeError("No supported backend found. Install 'potrace' or 'vtracer'")


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        stderr = proc.stderr.strip()
        stdout = proc.stdout.strip()
        details = stderr or stdout or "Unknown error"
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{details}")


def to_pbm(input_path: Path, output_pbm: Path, threshold: int) -> None:
    if input_path.suffix.lower() == ".pbm":
        output_pbm.write_bytes(input_path.read_bytes())
        return

    magick = shutil.which("magick")
    mkbitmap = shutil.which("mkbitmap")

    if magick:
        run(
            [
                magick,
                str(input_path),
                "-alpha",
                "off",
                "-colorspace",
                "Gray",
                "-threshold",
                f"{threshold}%",
                f"pbm:{output_pbm}",
            ]
        )
        return

    if mkbitmap:
        mk_threshold = max(0.0, min(1.0, threshold / 100.0))
        run(
            [
                mkbitmap,
                "-x",
                "-t",
                f"{mk_threshold:.3f}",
                str(input_path),
                "-o",
                str(output_pbm),
            ]
        )
        return

    raise RuntimeError(
        "potrace mode requires PBM input or one of: 'magick' / 'mkbitmap' to preprocess"
    )


def convert_with_potrace(
    input_path: Path, output_path: Path, threshold: int, speckle: int, path_precision: float
) -> None:
    with tempfile.TemporaryDirectory(prefix="image-to-svg-") as tmp:
        pbm_path = Path(tmp) / "input.pbm"
        to_pbm(input_path, pbm_path, threshold)

        alphamax = max(0.0, min(4.0, path_precision))
        turdsize = max(0, speckle)

        run(
            [
                "potrace",
                str(pbm_path),
                "-s",
                "-o",
                str(output_path),
                "--turdsize",
                str(turdsize),
                "--alphamax",
                f"{alphamax:.2f}",
            ]
        )


def convert_with_vtracer(
    input_path: Path, output_path: Path, color_mode: str, speckle: int, path_precision: float
) -> None:
    colormode = "color" if color_mode == "color" else "binary"
    run(
        [
            "vtracer",
            "--input",
            str(input_path),
            "--output",
            str(output_path),
            "--colormode",
            colormode,
            "--filter_speckle",
            str(max(0, speckle)),
            "--mode",
            "spline",
            "--path_precision",
            f"{max(0.1, path_precision):.2f}",
        ]
    )


def main() -> int:
    args = parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_path = (
        Path(args.output).expanduser().resolve()
        if args.output
        else input_path.with_suffix(".svg")
    )

    try:
        require_file(input_path)

        if not 0 <= args.threshold <= 100:
            raise ValueError("--threshold must be between 0 and 100")
        if args.speckle < 0:
            raise ValueError("--speckle must be >= 0")
        if args.path_precision <= 0:
            raise ValueError("--path-precision must be > 0")

        output_path.parent.mkdir(parents=True, exist_ok=True)
        backend = choose_backend(args.mode, args.color_mode)

        if backend == "potrace":
            convert_with_potrace(
                input_path,
                output_path,
                args.threshold,
                args.speckle,
                args.path_precision,
            )
        else:
            convert_with_vtracer(
                input_path,
                output_path,
                args.color_mode,
                args.speckle,
                args.path_precision,
            )

        print(f"Backend: {backend}")
        print(f"Output: {output_path}")
        return 0
    except Exception as exc:  # pragma: no cover
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
