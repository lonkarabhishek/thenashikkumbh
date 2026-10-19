/**
 * The message a reader shares from a news post: title, a short summary and
 * the link, all in the language the page is being read in. The summary is the
 * post's own summary (the same text used as its meta/og description); nothing
 * is written here.
 */

export const SHARE_SUMMARY_MAX = 200;

/** Trim to about `max` characters at a word boundary and add an ellipsis. */
export function shortSummary(text: string | undefined, max = SHARE_SUMMARY_MAX): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  // Count user-perceived characters, so Devanagari is never cut mid-codepoint.
  const chars = Array.from(clean);
  if (chars.length <= max) return clean;
  const cut = chars.slice(0, max).join("");
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return base.replace(/[\s,;:.\-–—।]+$/, "") + "…";
}

export interface ShareMessage {
  title: string;
  summary: string;
  url: string;
  /** "Title\n\nSummary\n\nURL" (the summary block is dropped if there is none). */
  full: string;
  /** Title and summary without the URL, for share targets that take the URL separately. */
  textOnly: string;
}

export function buildShareMessage(title: string, summary: string | undefined, url: string): ShareMessage {
  const t = title.trim();
  const s = shortSummary(summary);
  const textOnly = [t, s].filter(Boolean).join("\n\n");
  return { title: t, summary: s, url, textOnly, full: [textOnly, url].filter(Boolean).join("\n\n") };
}

/** encodeURIComponent encodes UTF-8, so Marathi and Hindi survive the trip into WhatsApp. */
export const whatsappHref = (m: ShareMessage) => `https://wa.me/?text=${encodeURIComponent(m.full)}`;
export const telegramHref = (m: ShareMessage) =>
  `https://t.me/share/url?url=${encodeURIComponent(m.url)}&text=${encodeURIComponent(m.textOnly)}`;
export const xHref = (m: ShareMessage) =>
  `https://x.com/intent/post?text=${encodeURIComponent(m.title)}&url=${encodeURIComponent(m.url)}`;
