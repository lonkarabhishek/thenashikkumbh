import type { Locale } from "@/i18n/translations";
import commons from "./commons.json";
import available from "./available.json";

/**
 * 50 freely licensed Wikimedia Commons photos (see /credits).
 *
 * The files are self-hosted under public/images/commons (never hotlinked) and
 * imported with scripts/import-commons-photos.mjs, which also writes
 * available.json. A photo only renders once its file is listed there, so the
 * site never shows a broken image while files are pending.
 *
 * Captions and alt text come from the source data unchanged: never add a year
 * or event to a caption that is not in the file.
 */
export interface CommonsPhoto {
  id: number;
  topic: string;
  /** Public path of the self-hosted WebP. */
  file: string;
  /** File title on Wikimedia Commons. */
  title: string;
  sourcePage: string;
  author: string;
  license: string;
  licenseUrl: string;
  alt: string;
  caption: string;
  dateOnSource: string;
  width: number;
  height: number;
  /** 1280px source URL, used only by the import script. */
  webUrl: string;
  requirements: string;
}

export const photos: CommonsPhoto[] = commons;

const availableIds = new Set<number>(available as number[]);

export function getPhoto(id: number): CommonsPhoto | undefined {
  return photos.find((p) => p.id === id);
}

/** True once the photo's file has been imported into public/images/commons. */
export function isPhotoAvailable(id: number): boolean {
  return availableIds.has(id);
}

export const availablePhotos = photos.filter((p) => availableIds.has(p.id));

/** Public-domain and CC0 files need no credit, but we still show one. */
export function needsAttribution(p: CommonsPhoto): boolean {
  return !/^(CC0|Public domain)/i.test(p.license);
}

/** Topic display order for the gallery. */
export const PHOTO_TOPICS = [
  "Ramkund & Godavari ghats",
  "Snan crowds",
  "Sadhus, akharas & processions",
  "Trimbakeshwar & Kushavarta",
  "Panchavati temples",
  "Night & aarti",
  "Nashik city & landmarks",
  "Simhastha 2027 preparations",
] as const;

/** Topic names as shown to readers. Keys match the photo data's `topic`. */
export const TOPIC_LABEL: Record<string, Record<Locale, string>> = {
  "Ramkund & Godavari ghats": { en: "Ramkund & Godavari ghats", hi: "रामकुंड और गोदावरी घाट", mr: "रामकुंड व गोदावरी घाट" },
  "Snan crowds": { en: "Snan crowds", hi: "स्नान की भीड़", mr: "स्नानाची गर्दी" },
  "Sadhus, akharas & processions": { en: "Sadhus, akhadas & processions", hi: "साधु, अखाड़े और शोभायात्राएँ", mr: "साधू, आखाडे व मिरवणुका" },
  "Trimbakeshwar & Kushavarta": { en: "Trimbakeshwar & Kushavarta", hi: "त्र्यंबकेश्वर और कुशावर्त", mr: "त्र्यंबकेश्वर व कुशावर्त" },
  "Panchavati temples": { en: "Panchavati temples", hi: "पंचवटी के मंदिर", mr: "पंचवटीतील मंदिरे" },
  "Night & aarti": { en: "Night & aarti", hi: "रात और आरती", mr: "रात्र व आरती" },
  "Nashik city & landmarks": { en: "Nashik city & landmarks", hi: "नाशिक शहर और स्थल", mr: "नाशिक शहर व स्थळे" },
  "Simhastha 2027 preparations": { en: "Simhastha 2027 preparations", hi: "सिंहस्थ 2027 की तैयारी", mr: "सिंहस्थ 2027 ची तयारी" },
};
