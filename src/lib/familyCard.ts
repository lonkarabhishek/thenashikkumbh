import type { Locale } from "@/i18n/translations";

/** User-perceived character caps. Keeps the QR code scannable when printed. */
export const FIELD_LIMITS = { name: 40, meeting: 48, stay: 48, note: 80 } as const;

export type FieldError = "name" | "phone";

export interface FamilyCardInput {
  name: string;
  phone: string;
  stay?: string;
  meeting?: string;
  note?: string;
}

export interface FamilyCard {
  name: string;
  /** Dialable international form, no spaces, e.g. +919876543210. */
  phone: string;
  phoneDisplay: string;
  stay: string;
  meeting: string;
  note: string;
  /** Plain text encoded in the QR: name, phone, meeting point. */
  qrText: string;
  whatsappText: (toolUrl: string) => string;
}

const LABELS: Record<
  Locale,
  { qrTitle: string; name: string; phone: string; meet: string; stay: string; note: string; privacy: string }
> = {
  en: {
    qrTitle: "KHOYA-PAYA",
    name: "Name",
    phone: "Call",
    meet: "Meet",
    stay: "Staying",
    note: "Note",
    privacy: "This is not uploaded or saved on our servers.",
  },
  hi: {
    qrTitle: "खोया-पाया",
    name: "नाम",
    phone: "फोन",
    meet: "मिलें",
    stay: "ठहरना",
    note: "नोट",
    privacy: "यह हमारे सर्वर पर अपलोड या सेव नहीं होता।",
  },
  mr: {
    qrTitle: "खोया-पाया",
    name: "नाव",
    phone: "फोन",
    meet: "भेट",
    stay: "राहणे",
    note: "टीप",
    privacy: "हे आमच्या सर्व्हरवर अपलोड किंवा सेव्ह होत नाही.",
  },
};

function clean(value: string | undefined, max: number): string {
  const flat = (value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
  return Array.from(flat).slice(0, max).join("");
}

/**
 * A number a finder can dial. Ten-digit mobiles are treated as Indian (+91),
 * which is the crowd this card is for. Numbers that already include a country
 * code are kept.
 */
export function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  if (!hasPlus && digits.length === 10) return `+91${digits}`;
  if (!hasPlus && digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (!hasPlus && digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (hasPlus) return `+${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return null;
}

export function displayPhone(phone: string): string {
  const indian = phone.match(/^\+91(\d{10})$/);
  if (!indian) return phone;
  const n = indian[1];
  return `+91 ${n.slice(0, 5)} ${n.slice(5)}`;
}

export function buildFamilyCard(
  input: FamilyCardInput,
  locale: Locale
): { card: FamilyCard | null; errors: FieldError[] } {
  const name = clean(input.name, FIELD_LIMITS.name);
  const phone = normalizePhone(input.phone);
  const errors: FieldError[] = [];
  if (!name) errors.push("name");
  if (!phone) errors.push("phone");
  if (!name || !phone) return { card: null, errors };

  const meeting = clean(input.meeting, FIELD_LIMITS.meeting);
  const stay = clean(input.stay, FIELD_LIMITS.stay);
  const note = clean(input.note, FIELD_LIMITS.note);
  const labels = LABELS[locale];
  const lines = [labels.qrTitle, `${labels.name}: ${name}`, `${labels.phone}: ${phone}`];
  if (meeting) lines.push(`${labels.meet}: ${meeting}`);

  const card: FamilyCard = {
    name,
    phone,
    phoneDisplay: displayPhone(phone),
    stay,
    meeting,
    note,
    qrText: lines.join("\n"),
    whatsappText(toolUrl: string) {
      const body = [labels.qrTitle, `${labels.name}: ${name}`, `${labels.phone}: ${displayPhone(phone)}`];
      if (meeting) body.push(`${labels.meet}: ${meeting}`);
      if (stay) body.push(`${labels.stay}: ${stay}`);
      if (note) body.push(`${labels.note}: ${note}`);
      body.push("", labels.privacy, toolUrl);
      return body.join("\n");
    },
  };
  return { card, errors: [] };
}
