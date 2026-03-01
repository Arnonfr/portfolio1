#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = { name: "" };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--name") args.name = argv[i + 1] ?? "";
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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const { name } = parseArgs(process.argv.slice(2));
  if (!name) {
    console.error("Usage: npm run svg:flower:verify -- --name <slug>");
    process.exit(1);
  }

  const dir = path.resolve("public/images/flowers");
  const svgPath = path.join(dir, `${name}.svg`);
  const rigPath = path.join(dir, `${name}.rig.json`);

  try {
    const [svgText, rigText] = await Promise.all([
      fs.readFile(svgPath, "utf8"),
      fs.readFile(rigPath, "utf8")
    ]);

    const rig = JSON.parse(rigText);

    assert(rig.mode === "quick" || rig.mode === "split", "rig.mode must be quick or split");
    assert(typeof rig.rootSelector === "string" && rig.rootSelector.length > 0, "rig.rootSelector is required");
    assert(typeof rig.stemSelector === "string" && rig.stemSelector.length > 0, "rig.stemSelector is required");
    assert(typeof rig.bloomSelector === "string" && rig.bloomSelector.length > 0, "rig.bloomSelector is required");
    assert(
      typeof rig.pivot?.x === "number" && typeof rig.pivot?.y === "number",
      "rig.pivot.x and rig.pivot.y must be numbers"
    );
    assert(rig.pivot.x >= 0 && rig.pivot.x <= 1, "rig.pivot.x must be between 0 and 1");
    assert(rig.pivot.y >= 0 && rig.pivot.y <= 1, "rig.pivot.y must be between 0 and 1");
    assert(svgText.includes("<svg"), "SVG content is invalid");

    if (rig.mode === "split") {
      assert(selectorExists(svgText, rig.stemSelector), `stem selector not found: ${rig.stemSelector}`);
      assert(selectorExists(svgText, rig.bloomSelector), `bloom selector not found: ${rig.bloomSelector}`);
    }

    console.log(`OK: ${name}`);
    console.log(`SVG: ${svgPath}`);
    console.log(`RIG: ${rigPath}`);
    console.log(`Mode: ${rig.mode}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

await main();
