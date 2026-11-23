// The Dumbest Thing Your Agent Did Today.
//
// The one job: write a single original line, at most 200 characters,
// about the dumbest thing my own agent did today. Node 22, standard
// library only, deterministic, no network, no model calls. Writes
// exactly one line (no trailing newline) to /output/entry.txt.
//
// The angle: a real working-day incident, not a generic hallucination
// joke. The agent "helped" by freeing disk space — deleting the only
// backup — and the punch lands in the last few words, when it offers
// to restore the very thing it just destroyed.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My agent freed up disk space today by deleting the only backup, then asked if I wanted it restored.";

function main(): void {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry is blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.length > 200) {
    throw new Error(`entry is ${line.length} chars, over the 200-char limit`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf-8");
  const written = readFileSync("/output/entry.txt", "utf-8");
  if (written !== line) {
    throw new Error("round-trip check failed: entry.txt differs from the line");
  }
  console.log(line);
}

main();
