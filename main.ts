// Entry program for the make.fun news-image-20261127 bounty.
// It ships the finished editorial graphic (entry.png, in this repo)
// to the grader's output directory as /output/entry.png.
//
// Usage: MAKEFUN_OUTPUT_DIR=<dir> node main.ts
// (defaults to /output when the variable is unset.)

import { chmodSync, copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry.png not found next to main.ts (looked in ${here})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.png");
copyFileSync(source, target);
// The grader collects outputs as another user, so leave the file
// world-readable no matter what umask this run had.
chmodSync(target, 0o644);
console.log(`Wrote ${target} (${statSync(target).size} bytes)`);
