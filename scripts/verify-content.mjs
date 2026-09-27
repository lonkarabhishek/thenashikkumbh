#!/usr/bin/env node
// Content-integrity check.
//
// Deterministic, dependency-free. Reads the source tree with `fs`, greps for
// patterns that must not appear in production, and exits non-zero if any are
// found. Ran locally and wired into the Vercel build.
//
// This is deliberately narrow: it enforces the specific facts we have already
// gotten wrong once. It is not a substitute for editorial review — it catches
// regressions, not new fabrications.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");

/** File extensions we scan. Binary and generated files are excluded. */
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".json"]);

/** Paths under src/ that are allowed to mention forbidden strings in context.
 *  - `blogData.ts` reproduces attributed wire-service copy; that is journalism,
 *    not a first-party claim.
 *  - `chatbotEngine.ts` and `chatbotKnowledgeBase.ts` list keywords/questions
 *    the engine matches on — they mention the strings without asserting them.
 *  - `SchemaMarkup.tsx` documents *why* the FAQ schema was removed.
 *  - `changelog/page.tsx` records past corrections; that is the whole point.
 *  - `verified/index.ts` is the registry; correctly-dated facts live here.
 *  - This script itself must be able to name what it is looking for.
 */
const ALLOWLIST = new Set([
  "src/data/blogData.ts",
  "src/data/chatbotKnowledgeBase.ts",
  "src/lib/chatbotEngine.ts",
  "src/components/SchemaMarkup.tsx",
  "src/app/[locale]/changelog/page.tsx",
  "src/data/verified/index.ts",
  "scripts/verify-content.mjs",
]);

/**
 * Forbidden patterns.
 *
 * If the string appears anywhere outside the allowlist, the build fails. Keep
 * the messages actionable — the failure output should tell an editor how to
 * fix it, not just what tripped.
 */
const FORBIDDEN = [
  {
    pattern: /\+91[- ]?9999999999/g,
    message:
      "Fabricated organisation phone number (+91 99999 99999). Use the NTKMA phone from src/data/verified/index.ts.",
  },
  {
    pattern: /info@thenashikkumbh\.com/gi,
    message:
      "Placeholder contact email. Use the NTKMA email from src/data/verified/index.ts, or omit.",
  },
  {
    pattern: /1800-XXX-XXXX/gi,
    message:
      "Placeholder toll-free number. Use verified helplines (112, 108, 101, 1091, 1098) from the registry.",
  },
  {
    pattern: /Bhadrapad Purnima/g,
    message:
      "Wrong second Amrit Snan tithi. Correct value is Shravan Amavasya (31 Aug 2027).",
  },
  {
    pattern: /Aug(?:ust)? 20,? 2027/g,
    message:
      "Invented first Amrit Snan date. Correct date is 2 August 2027 (Ashadh Somvati Amavasya).",
  },
  {
    pattern: /(?:Sep(?:tember)? 3|Sep(?:tember)? 17|Oct(?:ober)? 2|Oct(?:ober)? 17)[, ]+2027/g,
    message:
      "Invented Amrit Snan date from the pre-correction 'five Shahi Snans' list. Only three Amrit Snans are officially confirmed for 2027.",
  },
  {
    pattern: /five Shahi Snans/gi,
    message:
      "Three Amrit Snans are officially confirmed for 2027. If you are describing historical Kumbhs, say so explicitly.",
  },
  {
    pattern: /AI-powered CCTV/gi,
    message:
      "Unsourced surveillance claim asserted as fact. Attribute to a source or remove.",
  },
  {
    pattern: /Kumbh War Room/gi,
    message:
      "Unsourced facility claim asserted as fact. Attribute to a source or remove.",
  },
];

/** Files reachable under `src/`. */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const s = statSync(abs);
    if (s.isDirectory()) {
      // node_modules and .next never reach this scanner because we only enter
      // `src/`, but this guard makes the function safe to point elsewhere.
      if (entry === "node_modules" || entry === ".next") continue;
      walk(abs, out);
    } else if (EXTS.has(abs.slice(abs.lastIndexOf(".")))) {
      out.push(abs);
    }
  }
  return out;
}

const files = [
  ...walk(SRC),
  join(ROOT, "scripts/verify-content.mjs"), // include self so allowlist test works
];

let failed = 0;
for (const abs of files) {
  const rel = relative(ROOT, abs);
  if (ALLOWLIST.has(rel)) continue;
  const text = readFileSync(abs, "utf8");
  for (const rule of FORBIDDEN) {
    const matches = text.match(rule.pattern);
    if (!matches) continue;
    failed++;
    console.error(`✗ ${rel}`);
    console.error(`  ${rule.message}`);
    console.error(`  matched: ${matches.slice(0, 3).join(", ")}${matches.length > 3 ? " …" : ""}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} content-integrity check(s) failed.`);
  process.exit(1);
} else {
  console.log(`✓ Content integrity check passed (${files.length} files scanned).`);
}
