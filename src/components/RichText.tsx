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
}: {
  text: string;
  /** "dark" for pages on the navy background, "light" for cream pages. */
  tone?: "dark" | "light";
}) {
  const p = tone === "dark" ? "text-cream-300/80" : "text-temple-700";
  const h = tone === "dark" ? "text-cream-100" : "text-temple-900";
  const blocks = text.trim().split(/\n\s*\n/);

  return (
    <div className={`rich-text rich-text-${tone}`}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const key = `b${bi}`;
        if (lines.length === 0) return null;

        if (lines[0].startsWith("## ") && lines.length === 1) {
          return (
            <h2 key={key} className={`mb-4 mt-10 font-heading text-2xl font-bold ${h}`}>
              {inline(lines[0].slice(3), key)}
            </h2>
          );
        }
        if (lines[0].startsWith("### ") && lines.length === 1) {
          return (
            <h3 key={key} className={`mb-3 mt-8 font-heading text-xl font-bold ${h}`}>
              {inline(lines[0].slice(4), key)}
            </h3>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={key} className={`mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed md:text-lg ${p}`}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.slice(2), `${key}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={key} className={`mb-6 text-base leading-relaxed md:text-lg ${p}`}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && " "}
                {inline(l, `${key}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
