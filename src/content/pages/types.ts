import type { NewsSource } from "@/data/blogData";

type L10n = { en: string; hi: string; mr: string };

/**
 * A long-form evergreen page (Trimbakeshwar guide, how to reach, etc.).
 * Section bodies use the same light markup as news posts: blank-line
 * separated paragraphs, "## " / "### " headings, "- " bullets and
 * [text](href) links.
 */
export interface InfoPageContent {
  /** Route path without language prefix, e.g. "/how-to-reach". */
  path: string;
  /** Search title (under ~60 characters). */
  seoTitle: L10n;
  /** Meta description (under ~155 characters). */
  description: L10n;
  h1: L10n;
  intro: L10n;
  sections: { heading: L10n; body: L10n }[];
  sources: NewsSource[];
  /** Last material update, YYYY-MM-DD. Shown as "Last updated". */
  updated: string;
  /** Breadcrumb label. */
  crumb: L10n;
  /** Wikimedia photo ids (src/data/photos.ts) to show when the files exist. */
  photoIds?: number[];
  /**
   * Dated live updates, newest first. Append a new object at the top of the
   * array to add an update. `time` is ISO 8601 with offset, e.g.
   * "2026-10-31T12:05:00+05:30". Rendered as a live feed and emitted as
   * LiveBlogPosting JSON-LD when `liveEvent` is set.
   */
  liveUpdates?: LiveUpdate[];
  /** The event the live feed covers (LiveBlogPosting coverage window). */
  liveEvent?: { name: L10n; start: string; end: string; location: string };
  /** Optional Q&A shown after the sections and emitted as FAQPage JSON-LD. */
  faq?: { q: L10n; a: L10n }[];
  /** Optional per-language 1200x630 share image, used as og:image. */
  shareImage?: L10n;
}

export interface LiveUpdate {
  /** ISO 8601 with +05:30 offset. */
  time: string;
  headline: L10n;
  body: L10n;
  status: "confirmed" | "reported";
  /** Short source name(s) shown under the update. */
  source: string;
}
