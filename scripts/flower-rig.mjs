#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_RIG = {
  mode: "quick",
  rootSelector: "svg",
  stemSelector: "#stem",
  bloomSelector: "#bloom",
  pivot: { x: 0.5, y: 0.98 }
};

function parseArgs(argv) {
  const args = {
    name: "",
    stemSelector: "",
    bloomSelector: ""
  };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--name") args.name = argv[i + 1] ?? "";
    if (token === "--stem-selector") args.stemSelector = argv[i + 1] ?? "";
    if (token === "--bloom-selector") args.bloomSelector = argv[i + 1] ?? "";
  }
  return args;
}

function selectorExists(svgText, selector) {
  if (!selector) return false;
  if (selector.startsWith("#")) {
    const id = selector.slice(1);
    return new RegExp(`id=["']${id}["']`).test(svgText);
  }
  if (selector.startsWith(".")) {
    const className = selector.slice(1);
    return new RegExp(`class=["'][^"']*\\b${className}\\b[^"']*["']`).test(svgText);
  }
  return new RegExp(`<${selector}[\\s>]`, "i").test(svgText);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.name) {
    console.error("Usage: npm run svg:flower:rig -- --name <slug> --stem-selector \"<css>\" --bloom-selector \"<css>\"");
    process.exit(1);
  }

  const outputDir = path.resolve("public/images/flowers");
  const svgPath = path.join(outputDir, `${args.name}.svg`);
  const rigPath = path.join(outputDir, `${args.name}.rig.json`);

  let svgText = "";
  try {
    svgText = await fs.readFile(svgPath, "utf8");
  } catch {
    console.error(`Error: SVG file not found: ${svgPath}`);
    process.exit(1);
  }

  let rig = { ...DEFAULT_RIG };
  try {
    const existingRig = JSON.parse(await fs.readFile(rigPath, "utf8"));
    rig = { ...DEFAULT_RIG, ...existingRig, pivot: { ...DEFAULT_RIG.pivot, ...existingRig.pivot } };
  } catch {
    // Missing or invalid rig: regenerate from defaults.
  }

  const requestedStem = args.stemSelector || rig.stemSelector;
  const requestedBloom = args.bloomSelector || rig.bloomSelector;
  const wantsSplit = Boolean(args.stemSelector && args.bloomSelector);

  if (!wantsSplit) {
    rig.mode = "quick";
    rig.stemSelector = requestedStem;
    rig.bloomSelector = requestedBloom;
  } else {
    const stemFound = selectorExists(svgText, requestedStem);
    const bloomFound = selectorExists(svgText, requestedBloom);
    if (!stemFound || !bloomFound) {
      console.warn(
        `Warning: invalid split selectors. stem(${requestedStem})=${stemFound}, bloom(${requestedBloom})=${bloomFound}. Falling back to quick mode.`
      );
      rig.mode = "quick";
      rig.stemSelector = requestedStem;
      rig.bloomSelector = requestedBloom;
    } else {
      rig.mode = "split";
      rig.stemSelector = requestedStem;
      rig.bloomSelector = requestedBloom;
    }
  }

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(rigPath, `${JSON.stringify(rig, null, 2)}\n`, "utf8");

  console.log(`RIG: ${rigPath}`);
  console.log(`Mode: ${rig.mode}`);
}

await main();
