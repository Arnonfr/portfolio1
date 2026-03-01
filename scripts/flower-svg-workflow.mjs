#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { optimize } from "svgo";

const DEFAULT_RIG = {
  mode: "quick",
  rootSelector: "svg",
  stemSelector: "#stem",
  bloomSelector: "#bloom",
  pivot: { x: 0.5, y: 0.98 }
};

function parseArgs(argv) {
  const args = { input: "", name: "" };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--input") args.input = argv[i + 1] ?? "";
    if (token === "--name") args.name = argv[i + 1] ?? "";
  }
  return args;
}

function ensureSlug(name) {
  return /^[a-z0-9-]+$/.test(name);
}

function runPythonConvert(inputPath, outputPath) {
  const cmd = [
    "skills/image-to-svg/scripts/image_to_svg.py",
    "--input",
    inputPath,
    "--output",
    outputPath,
    "--mode",
    "vtracer",
    "--color-mode",
    "color",
    "--speckle",
    "4",
    "--path-precision",
    "2.2"
  ];

  const result = spawnSync("python3", cmd, { stdio: "pipe", encoding: "utf8" });
  if (result.status !== 0) {
    const errorText = (result.stderr || result.stdout || "image_to_svg failed").trim();
    throw new Error(errorText);
  }
  return (result.stdout || "").trim();
}

function optimizeSvg(svgText) {
  const optimized = optimize(svgText, {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupIds: false,
            convertPathData: false
          }
        }
      }
    ]
  });

  if ("data" in optimized && optimized.data) {
    return optimized.data;
  }

  throw new Error("SVGO optimization failed");
}

async function main() {
  const { input, name } = parseArgs(process.argv.slice(2));
  if (!input || !name) {
    console.error("Usage: npm run svg:flower -- --input <absolute-image-path> --name <slug>");
    process.exit(1);
  }
  if (!path.isAbsolute(input)) {
    console.error("Error: --input must be an absolute path.");
    process.exit(1);
  }
  if (!ensureSlug(name)) {
    console.error("Error: --name must be lowercase slug format (a-z, 0-9, -).");
    process.exit(1);
  }

  const resolvedInput = path.resolve(input);
  try {
    await fs.access(resolvedInput);
  } catch {
    console.error(`Error: input file not found: ${resolvedInput}`);
    process.exit(1);
  }

  const outputDir = path.resolve("public/images/flowers");
  await fs.mkdir(outputDir, { recursive: true });

  const svgPath = path.join(outputDir, `${name}.svg`);
  const rigPath = path.join(outputDir, `${name}.rig.json`);

  try {
    const convertLog = runPythonConvert(resolvedInput, svgPath);
    const rawSvg = await fs.readFile(svgPath, "utf8");
    const optimized = optimizeSvg(rawSvg);
    await fs.writeFile(svgPath, optimized, "utf8");

    await fs.writeFile(rigPath, `${JSON.stringify(DEFAULT_RIG, null, 2)}\n`, "utf8");

    if (convertLog) {
      console.log(convertLog);
    }
    console.log(`SVG: ${svgPath}`);
    console.log(`RIG: ${rigPath}`);
    console.log("Mode: quick");
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

await main();
