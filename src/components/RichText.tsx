"use client";

import { Fragment, type ReactNode } from "react";
import Link from "@/components/LocaleLink";

/**
 * Renders the light markup used by news posts and info pages:
 *   - blank-line separated paragraphs
 *   - "## Heading" and "### Subheading"
 *   - "- item" bullet lines (consecutive lines form one list)
 *   - [text](href) links: internal hrefs ("/dates") keep the reader's
 *     language; external links open in a new tab
 *   - **bold**
 * Anything else is plain text, so copy can never inject HTML.
 */

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of Array.from(text.matchAll(INLINE))) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-${i++}`;
    if (m[1] !== undefined) {
      const href = m[2];
      out.push(
        href.startsWith("/") ? (
          <Link key={key} href={href} className="rich-link">
            {m[1]}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="rich-link">
            {m[1]}
          </a>
        )
      );
    } else {
      out.push(<strong key={key}>{m[3]}</strong>);
    }
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function RichText({
  text,
  tone = "dark",
  compact = false,
}: {
  text: string;
  /** "dark" for pages on the navy background, "light" for cream pages. */
  tone?: "dark" | "light";
  /** Chat-bubble sizing: small type, tight spacing, no top margin on headings. */
  compact?: boolean;
}) {
  const p = compact
    ? "mb-2.5 last:mb-0 text-[0.9375rem] leading-relaxed text-temple-800"
    : tone === "dark"
      ? "mb-6 text-base leading-relaxed text-cream-300/80 md:text-lg"
      : "mb-6 text-[1.0625rem] leading-[1.8] text-temple-800 md:text-[1.1875rem]";
  const h = tone === "dark" ? "text-cream-100" : "text-temple-900";
  const marker = tone === "dark" ? "marker:text-gold-400" : "marker:text-saffron-500";
  const blocks = text.trim().split(/\n\s*\n/);
  const out: ReactNode[] = [];

  blocks.forEach((block, bi) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    // A block can mix a lead-in line, a heading and "- " bullets ("The work
    // includes:" followed by a list). Split it into runs so the bullets
    // become a real list instead of one run-on paragraph.
    let i = 0;
    let run = 0;
    while (i < lines.length) {
      const key = `b${bi}-${run++}`;
      const line = lines[i];
      if (line.startsWith("## ")) {
        out.push(
          <h2 key={key} className={compact ? `mb-1.5 mt-3 font-semibold ${h}` : `mb-4 mt-12 font-heading text-2xl font-bold leading-snug md:text-[1.75rem] ${h}`}>
            {inline(line.slice(3), key)}
          </h2>
        );
        i++;
      } else if (line.startsWith("### ")) {
        out.push(
          <h3 key={key} className={compact ? `mb-1.5 mt-3 font-semibold ${h}` : `mb-3 mt-8 font-heading text-xl font-bold ${h}`}>
            {inline(line.slice(4), key)}
          </h3>
        );
        i++;
      } else if (line.startsWith("- ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
        out.push(
          <ul key={key} className={`${p} list-disc ${compact ? "space-y-1 pl-5" : "space-y-2.5 pl-6"} ${marker}`}>
            {items.map((item, li) => (
              <li key={li} className="pl-1">
                {inline(item, `${key}-${li}`)}
              </li>
            ))}
          </ul>
        );
      } else {
        const para: string[] = [];
        while (i < lines.length && !/^(## |### |- )/.test(lines[i])) para.push(lines[i++]);
        out.push(
          <p key={key} className={p}>
            {para.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && " "}
                {inline(l, `${key}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      }
    }
  });

  return <div className={`rich-text rich-text-${compact ? "light" : tone}`}>{out}</div>;
}
