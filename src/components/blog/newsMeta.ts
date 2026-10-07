import type { Locale } from "@/i18n/translations";
import type { BlogArticle } from "@/data/blogData";
import { getPhoto, isPhotoAvailable } from "@/data/photos";

/**
 * Shared, server-safe helpers for the news pages: what a story's status is,
 * which photo to show, and how long it takes to read.
 */

export type NewsStatus = "confirmed" | "reported" | null;

/** "reported" if any source is only a media report; null when unsourced. */
export function newsStatus(a: Pick<BlogArticle, "sources">): NewsStatus {
  if (!a.sources || a.sources.length === 0) return null;
  return a.sources.some((s) => s.status === "reported") ? "reported" : "confirmed";
}

export interface NewsThumb {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** False when this is a stand-in picked by category, not the story's own photo. */
  own: boolean;
}

/** A Commons photo per category, for older posts that have none of their own. */
const CATEGORY_PHOTO: Record<string, number> = { kumbh: 26, infra: 48, govt: 38, culture: 32 };

export function newsThumb(a: Pick<BlogArticle, "photoId" | "category">): NewsThumb | null {
  const ownId = a.photoId && isPhotoAvailable(a.photoId) ? a.photoId : undefined;
  const id = ownId ?? CATEGORY_PHOTO[a.category];
  const photo = id && isPhotoAvailable(id) ? getPhoto(id) : undefined;
  if (!photo) return null;
  return { src: photo.file, alt: ownId ? photo.alt : "", width: photo.width, height: photo.height, own: !!ownId };
}

/** Minutes to read one language's body, at about 200 words a minute. */
export function readMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function readingTimes(content: BlogArticle["content"]): Record<Locale, number> {
  return { en: readMinutes(content.en), hi: readMinutes(content.hi), mr: readMinutes(content.mr) };
}
