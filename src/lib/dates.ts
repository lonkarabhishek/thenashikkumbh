import type { Locale } from "@/i18n/translations";

/**
 * Deterministic date formatting. Browsers and Node ship different ICU data
 * (e.g. "Sep" vs "Sept"), so toLocaleDateString() can render one string on
 * the server and another in the browser, which breaks hydration. These
 * helpers produce the same text everywhere.
 */

const MONTHS: Record<Locale, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  hi: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
  mr: ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"],
};

const MONTHS_SHORT: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  hi: MONTHS.hi,
  mr: MONTHS.mr,
};

const WEEKDAYS: Record<Locale, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  mr: ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"],
};

const DEVANAGARI = "०१२३४५६७८९";

/** Marathi uses Devanagari digits; Hindi and English use Arabic digits. */
export function localDigits(text: string, locale: Locale): string {
  return locale === "mr" ? text.replace(/\d/g, (d) => DEVANAGARI[Number(d)]) : text;
}

/** "2027-08-02" -> "2 August 2027" (with optional weekday / short month). */
export function formatDate(
  iso: string,
  locale: Locale,
  opts: { weekday?: boolean; short?: boolean } = {}
): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const month = (opts.short ? MONTHS_SHORT : MONTHS)[locale][m - 1];
  let out = `${d} ${month} ${y}`;
  if (opts.weekday) {
    const wd = WEEKDAYS[locale][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
    out = `${wd}, ${out}`;
  }
  return localDigits(out, locale);
}

/** "12:02" -> "12:02 PM" (en) / "दुपारी 12:02" style kept simple and fixed. */
export function formatTime(hhmm: string, locale: Locale): string {
  const [h, min] = hhmm.split(":").map(Number);
  const h12 = ((h + 11) % 12) + 1;
  const mm = String(min).padStart(2, "0");
  if (locale === "en") return `${h12}:${mm} ${h < 12 ? "AM" : "PM"}`;
  const part =
    locale === "hi"
      ? h < 12 ? "सुबह" : h < 17 ? "दोपहर" : "शाम"
      : h < 12 ? "सकाळी" : h < 17 ? "दुपारी" : "सायंकाळी";
  return localDigits(`${part} ${h12}:${mm}`, locale);
}
