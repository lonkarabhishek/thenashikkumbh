import { majorMelaPeriod, schedule, type ScheduleEvent } from "@/data/verified";
import type { Locale } from "@/i18n/translations";
import { formatDate, localDigits } from "@/lib/dates";

/**
 * Which-day guidance for the major mela. Every date is taken from the
 * verified schedule (the same source as /dates). The three Nashik parva days
 * are named together on one schedule row; they are split here so each day
 * can be coloured. Nothing else is added.
 */

export type Place = "nashik" | "trimbak" | "either";
export type Intent = "snan" | "quiet" | "elderly";
export type Band = "green" | "amber" | "red";

export type DayKind =
  | "outside"
  | "amrit-here"
  | "amrit-elsewhere"
  | "parva"
  | "ceremony"
  | "ordinary";

export type Reason =
  | "outside"
  | "snan-amrit"
  | "snan-elsewhere"
  | "snan-parva"
  | "snan-ceremony"
  | "snan-ordinary"
  | "quiet-amrit"
  | "quiet-elsewhere"
  | "quiet-parva"
  | "quiet-ceremony"
  | "quiet-ordinary";

export interface ListedDay {
  id: string;
  isoDate: string;
  kind: "amrit" | "parva" | "ceremony";
  places: Array<"nashik" | "trimbak">;
  /** Schedule row this day was read from. Parva days share one row. */
  sourceId: string;
}

export interface DayAssessment {
  isoDate: string;
  inMela: boolean;
  kind: DayKind;
  band: Band | null;
  reason: Reason;
  /** Rows that set the colour for the chosen place. */
  matched: ListedDay[];
  /** Same date, listed for the other place only. */
  also: ListedDay[];
}

export interface RangeSummary {
  from: string;
  to: string;
  days: DayAssessment[];
  green: string[];
  amber: string[];
  red: string[];
  outside: string[];
}

export type RangeError = "order" | "invalid" | "long";

const MELA_START = majorMelaPeriod.startIso;
const MELA_END = majorMelaPeriod.endIso;

const PARVA_NAME =
  /^Special Parva Days \(Nashik\): (\d{1,2}), (\d{1,2}) and (\d{1,2}) August (\d{4})$/;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function isRealIso(iso: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return false;
  const y = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1) return false;
  const dt = new Date(Date.UTC(y, month - 1, day));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === month - 1 && dt.getUTCDate() === day;
}

export function diffDays(fromIso: string, toIso: string): number {
  const [fy, fm, fd] = fromIso.split("-").map(Number);
  const [ty, tm, td] = toIso.split("-").map(Number);
  const ms = Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd);
  return Math.round(ms / 86_400_000);
}

export function addIsoDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

function inMela(iso: string): boolean {
  return iso >= MELA_START && iso <= MELA_END;
}

function amritPlaces(event: ScheduleEvent): Array<"nashik" | "trimbak"> {
  if (event.id === "amrit-snan-1" || event.id === "amrit-snan-2") return ["nashik", "trimbak"];
  if (event.id === "amrit-snan-3-nashik") return ["nashik"];
  if (event.id === "amrit-snan-3-trimbak") return ["trimbak"];
  const en = event.location.en.toLowerCase();
  const places: Array<"nashik" | "trimbak"> = [];
  if (en.includes("nashik")) places.push("nashik");
  if (en.includes("trimbak")) places.push("trimbak");
  if (places.length === 0) throw new Error(`Cannot tell where Amrit Snan ${event.id} is held`);
  return places;
}

function ceremonyPlaces(event: ScheduleEvent): Array<"nashik" | "trimbak"> {
  const en = event.location.en.toLowerCase();
  const places: Array<"nashik" | "trimbak"> = [];
  if (en.includes("nashik") || en.includes("sadhugram")) places.push("nashik");
  if (en.includes("trimbak")) places.push("trimbak");
  if (places.length === 0) throw new Error(`Cannot tell where ${event.id} is held`);
  return places;
}

/** Nashik parva days named on the single `parva-august-2027` schedule row. */
export function nashikParvaDates(): string[] {
  const event = schedule.find((e) => e.id === "parva-august-2027");
  if (!event) throw new Error("Verified schedule is missing parva-august-2027");
  const match = event.name.en.match(PARVA_NAME);
  if (!match) {
    throw new Error("parva-august-2027 no longer names three August days in English");
  }
  const year = match[4];
  const dates = [match[1], match[2], match[3]].map((day) => `${year}-08-${pad(Number(day))}`);
  if (!dates.every(isRealIso)) throw new Error("parva-august-2027 names a date that is not a real day");
  if (dates[0] !== event.isoDate) {
    throw new Error(`parva-august-2027 isoDate ${event.isoDate} is not the first named day ${dates[0]}`);
  }
  return dates;
}

function buildBathingDays(): ListedDay[] {
  const amrit: ListedDay[] = schedule
    .filter((event) => event.isAmritSnan)
    .map((event) => ({
      id: event.id,
      isoDate: event.isoDate,
      kind: "amrit",
      places: amritPlaces(event),
      sourceId: event.id,
    }));
  const parva: ListedDay[] = nashikParvaDates().map((isoDate) => ({
    id: isoDate === nashikParvaDates()[0] ? "parva-august-2027" : `parva-august-2027-${isoDate}`,
    isoDate,
    kind: "parva",
    places: ["nashik"],
    sourceId: "parva-august-2027",
  }));
  return [...amrit, ...parva].sort((a, b) => a.isoDate.localeCompare(b.isoDate) || a.id.localeCompare(b.id));
}

function buildCeremonies(): ListedDay[] {
  return schedule
    .filter((event) => !event.isAmritSnan && event.id !== "parva-august-2027" && inMela(event.isoDate))
    .map((event) => ({
      id: event.id,
      isoDate: event.isoDate,
      kind: "ceremony" as const,
      places: ceremonyPlaces(event),
      sourceId: event.id,
    }))
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
}

const BATHING = buildBathingDays();
const CEREMONIES = buildCeremonies();

export function bathingDays(): ListedDay[] {
  return BATHING;
}

export function melaCeremonies(): ListedDay[] {
  return CEREMONIES;
}

export function scheduleEvent(id: string): ScheduleEvent | undefined {
  return schedule.find((event) => event.id === id);
}

export function melaBounds(): { startIso: string; endIso: string; days: number } {
  return { startIso: MELA_START, endIso: MELA_END, days: majorMelaPeriod.days };
}

/** "August 2027" / "अगस्त 2027" / "ऑगस्ट २०२७", using the site's date formatter. */
export function monthLabel(year: number, month: number, locale: Locale): string {
  return formatDate(`${year}-${pad(month)}-01`, locale).replace(/^\S+\s/, "");
}

export function melaMonths(): { year: number; month: number }[] {
  const [startYear, startMonth] = MELA_START.split("-").map(Number);
  const [endYear, endMonth] = MELA_END.split("-").map(Number);
  const months: { year: number; month: number }[] = [];
  let year = startYear;
  let month = startMonth;
  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push({ year, month });
    month += 1;
    if (month === 13) {
      month = 1;
      year += 1;
    }
  }
  return months;
}

/** First month that contains an Amrit Snan, for the picker's opening view. */
export function defaultMonthIndex(): number {
  const first = BATHING.find((day) => day.kind === "amrit");
  if (!first) return 0;
  const [year, month] = first.isoDate.split("-").map(Number);
  const index = melaMonths().findIndex((item) => item.year === year && item.month === month);
  return index === -1 ? 0 : index;
}

/** Days of a calendar month that fall inside the major mela. */
export function clipMonthToMela(year: number, month: number): { from: string; to: string } {
  const start = `${year}-${pad(month)}-01`;
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const end = `${year}-${pad(month)}-${pad(last)}`;
  return {
    from: start < MELA_START ? MELA_START : start,
    to: end > MELA_END ? MELA_END : end,
  };
}

function applies(day: ListedDay, place: Place): boolean {
  return place === "either" || day.places.includes(place);
}

export function reasonFor(intent: Intent, kind: DayKind): Reason {
  if (kind === "outside") return "outside";
  const prefix = intent === "snan" ? "snan" : "quiet";
  const suffix =
    kind === "amrit-here"
      ? "amrit"
      : kind === "amrit-elsewhere"
        ? "elsewhere"
        : kind === "parva"
          ? "parva"
          : kind === "ceremony"
            ? "ceremony"
            : "ordinary";
  return `${prefix}-${suffix}` as Reason;
}

function bandFor(intent: Intent, kind: DayKind): Band | null {
  if (kind === "outside") return null;
  const wantsSnan = intent === "snan";
  if (kind === "amrit-here") return wantsSnan ? "green" : "red";
  if (kind === "amrit-elsewhere" || kind === "parva" || kind === "ceremony") return "amber";
  return wantsSnan ? "red" : "green";
}

function onDate(iso: string): ListedDay[] {
  return [...BATHING, ...CEREMONIES].filter((day) => day.isoDate === iso);
}

export function assessDay(iso: string, place: Place, intent: Intent): DayAssessment {
  if (!isRealIso(iso)) {
    return { isoDate: iso, inMela: false, kind: "outside", band: null, reason: "outside", matched: [], also: [] };
  }
  const listed = onDate(iso);
  if (!inMela(iso)) {
    return { isoDate: iso, inMela: false, kind: "outside", band: null, reason: "outside", matched: [], also: listed };
  }
  const matched = listed.filter((day) => applies(day, place));
  const also = listed.filter((day) => !applies(day, place));
  let kind: DayKind = "ordinary";
  if (matched.some((day) => day.kind === "amrit")) kind = "amrit-here";
  else if (listed.some((day) => day.kind === "amrit")) kind = "amrit-elsewhere";
  else if (matched.some((day) => day.kind === "parva")) kind = "parva";
  else if (matched.some((day) => day.kind === "ceremony")) kind = "ceremony";
  return {
    isoDate: iso,
    inMela: true,
    kind,
    band: bandFor(intent, kind),
    reason: reasonFor(intent, kind),
    matched: matched.filter((day) => {
      if (kind === "amrit-here") return day.kind === "amrit";
      if (kind === "parva") return day.kind === "parva";
      if (kind === "ceremony") return day.kind === "ceremony";
      return false;
    }),
    also,
  };
}

export function summarizeRange(
  from: string,
  to: string,
  place: Place,
  intent: Intent
): RangeSummary | { error: RangeError } {
  if (!isRealIso(from) || !isRealIso(to)) return { error: "invalid" };
  if (to < from) return { error: "order" };
  const span = diffDays(from, to);
  if (span > 200) return { error: "long" };
  const days: DayAssessment[] = [];
  let cursor = from;
  while (cursor <= to) {
    days.push(assessDay(cursor, place, intent));
    cursor = addIsoDays(cursor, 1);
  }
  return {
    from,
    to,
    days,
    green: days.filter((day) => day.band === "green").map((day) => day.isoDate),
    amber: days.filter((day) => day.band === "amber").map((day) => day.isoDate),
    red: days.filter((day) => day.band === "red").map((day) => day.isoDate),
    outside: days.filter((day) => !day.inMela).map((day) => day.isoDate),
  };
}

export function nearestBathing(
  iso: string,
  place: Place,
  limit = 3
): { day: ListedDay; delta: number }[] {
  if (!isRealIso(iso)) return [];
  return BATHING.filter((day) => applies(day, place))
    .map((day) => ({ day, delta: diffDays(iso, day.isoDate) }))
    .sort((a, b) => {
      const distance = Math.abs(a.delta) - Math.abs(b.delta);
      if (distance !== 0) return distance;
      if (a.delta >= 0 !== b.delta >= 0) return a.delta >= 0 ? -1 : 1;
      return a.delta - b.delta;
    })
    .slice(0, limit);
}

function placeWord(places: Array<"nashik" | "trimbak">, locale: Locale): string {
  const both = places.includes("nashik") && places.includes("trimbak");
  if (locale === "hi") {
    if (both) return "नाशिक और त्र्यंबकेश्वर";
    return places[0] === "trimbak" ? "त्र्यंबकेश्वर" : "नाशिक";
  }
  if (locale === "mr") {
    if (both) return "नाशिक आणि त्र्यंबकेश्वर";
    return places[0] === "trimbak" ? "त्र्यंबकेश्वर" : "नाशिक";
  }
  if (both) return "Nashik and Trimbakeshwar";
  return places[0] === "trimbak" ? "Trimbakeshwar" : "Nashik";
}

function joinList(items: string[], locale: Locale): string {
  if (items.length <= 1) return items[0] ?? "";
  const head = items.slice(0, -1).join(", ");
  const last = items[items.length - 1];
  if (locale === "hi") return `${head} और ${last}`;
  if (locale === "mr") return `${head} आणि ${last}`;
  return `${head} and ${last}`;
}

export function amritPhrase(locale: Locale): string {
  const rows = BATHING.filter((day) => day.kind === "amrit").map(
    (day) => `${formatDate(day.isoDate, locale)} (${placeWord(day.places, locale)})`
  );
  return joinList(rows, locale);
}

export function parvaPhrase(locale: Locale): string {
  return joinList(
    nashikParvaDates().map((iso) => formatDate(iso, locale)),
    locale
  );
}

/** One sentence a search engine can quote. Dates come from the schedule. */
export function leadAnswer(locale: Locale): string {
  const start = formatDate(MELA_START, locale);
  const end = formatDate(MELA_END, locale);
  const days = localDigits(String(majorMelaPeriod.days), locale);
  const amrit = amritPhrase(locale);
  const parva = parvaPhrase(locale);
  if (locale === "hi") {
    return `मुख्य मेला अवधि ${start} से ${end} तक ${days} दिन की है। अमृत स्नान (जिसे पहले शाही स्नान कहा जाता था) की पुष्ट तिथियाँ ये हैं: ${amrit}। कम भीड़ वाले दिन के लिए इसी अवधि में इनके अलावा कोई दिन चुनें। नाशिक के विशेष पर्व दिवस ${parva} हैं। ये स्नान के दिन हैं, शाही स्नान नहीं। यह प्रकाशित कार्यक्रम है, भीड़ का पूर्वानुमान नहीं। स्नान के घंटे अभी घोषित नहीं हुए।`;
  }
  if (locale === "mr") {
    return `मुख्य मेळा कालावधी ${start} ते ${end} असा ${days} दिवसांचा आहे. अमृत स्नानाच्या (ज्याला आधी शाही स्नान म्हणत) निश्चित तारखा या आहेत: ${amrit}. कमी गर्दीच्या दिवसासाठी याच काळात यांखेरीजचा दिवस निवडा. नाशिकचे विशेष पर्व दिवस ${parva} आहेत. हे स्नानाचे दिवस आहेत, शाही स्नान नाही. हे प्रकाशित वेळापत्रक आहे, गर्दीचा अंदाज नाही. स्नानाच्या वेळा अजून जाहीर झालेल्या नाहीत.`;
  }
  return `The main mela runs ${days} days, from ${start} to ${end}. The confirmed Amrit Snan dates (the bath still called Shahi Snan) are ${amrit}. For a quieter day, pick any other day in that period. Nashik's special parva days are ${parva}. Those are bathing days, not the royal bath. This is the published schedule, not a crowd forecast. Bathing hours have not been published.`;
}
