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
}
