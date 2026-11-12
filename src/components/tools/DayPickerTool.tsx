"use client";

import { useState } from "react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { DAY_COPY as C, DAY_REASONS, legendFor, rangeCount } from "@/components/tools/dayCopy";
import { scheduleUpdated } from "@/data/verified";
import { formatDate, localDigits } from "@/lib/dates";
import {
  assessDay,
  clipMonthToMela,
  defaultMonthIndex,
  melaBounds,
  melaMonths,
  monthLabel,
  nearestBathing,
  scheduleEvent,
  summarizeRange,
  type Band,
  type Intent,
  type ListedDay,
  type Place,
  type RangeSummary,
} from "@/lib/dayPicker";
import type { Locale } from "@/i18n/translations";

const MONTHS = melaMonths();
const BOUNDS = melaBounds();

const BAND_CLASS: Record<Band, string> = {
  green: "border-river-600 bg-river-50 text-river-900",
  amber: "border-saffron-700 bg-saffron-50 text-saffron-900",
  red: "border-sacred-red bg-red-50 text-sacred-maroon",
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function monthCells(year: number, month: number): (string | null)[] {
  const lead = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: (string | null)[] = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(`${year}-${pad(month)}-${pad(day)}`);
  return cells;
}

function listedText(day: ListedDay, locale: Locale): { name: string; where: string; tithi: string } {
  if (day.kind === "parva") {
    return { name: C.parvaName[locale], where: locale === "en" ? "Nashik" : "नाशिक", tithi: "" };
  }
  const event = scheduleEvent(day.sourceId);
  return {
    name: event ? event.name[locale] : day.id,
    where: event ? event.location[locale] : "",
    tithi: event?.tithi ? event.tithi[locale] : "",
  };
}

function deltaText(delta: number, locale: Locale): string {
  if (delta === 0) return C.sameDay[locale];
  const n = Math.abs(delta);
  const num = rangeCount(n, locale);
  if (locale === "en") {
    const unit = n === 1 ? "day" : "days";
    return delta > 0 ? `${num} ${unit} later` : `${num} ${unit} earlier`;
  }
  return delta > 0 ? `${num} ${C.inDays[locale]}` : `${num} ${C.daysEarlier[locale]}`;
}

function Choice({
  name,
  value,
  current,
  label,
  onPick,
}: {
  name: string;
  value: string;
  current: string;
  label: string;
  onPick: () => void;
}) {
  const on = value === current;
  return (
    <label
      className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold ${
        on ? "border-saffron-700 bg-saffron-50 text-temple-900" : "border-temple-200 bg-white text-temple-700"
      }`}
    >
      <input type="radio" className="sr-only" name={name} value={value} checked={on} onChange={onPick} />
      {label}
    </label>
  );
}

export default function DayPickerTool() {
  const { locale } = useLanguage();
  const [intent, setIntent] = useState<Intent>("quiet");
  const [place, setPlace] = useState<Place>("either");
  const [monthIndex, setMonthIndex] = useState(defaultMonthIndex);
  const [custom, setCustom] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const month = MONTHS[monthIndex] ?? MONTHS[0];
  const clip = clipMonthToMela(month.year, month.month);
  const rangeFrom = custom ? from : clip.from;
  const rangeTo = custom ? to : clip.to;
  const summaryResult =
    rangeFrom && rangeTo ? summarizeRange(rangeFrom, rangeTo, place, intent) : null;
  const summary: RangeSummary | null = summaryResult && !("error" in summaryResult) ? summaryResult : null;
  const rangeError = summaryResult && "error" in summaryResult ? summaryResult.error : null;
  const anchor = selected ?? summary?.from ?? clip.from;
  const focus = selected ? assessDay(selected, place, intent) : null;
  const nearest = nearestBathing(anchor, place, 3);
  const legendIntent = intent === "snan" ? "snan" : "quiet";
  const showCalendar = !custom;
  const showEvery = custom && summary !== null && summary.days.length > 0 && summary.days.length <= 16;

  function openRange() {
    setFrom(clip.from);
    setTo(clip.to);
    setCustom(true);
    setSelected(null);
  }

  return (
    <div className="mt-8">
      <form
        className="space-y-5 rounded-2xl border border-temple-200 bg-white p-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <fieldset>
          <legend className="text-sm font-semibold text-temple-800">{C.intentLegend[locale]}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <Choice name="intent" value="snan" current={intent} label={C.intentSnan[locale]} onPick={() => setIntent("snan")} />
            <Choice name="intent" value="quiet" current={intent} label={C.intentQuiet[locale]} onPick={() => setIntent("quiet")} />
            <Choice name="intent" value="elderly" current={intent} label={C.intentElderly[locale]} onPick={() => setIntent("elderly")} />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-temple-800">{C.placeLegend[locale]}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <Choice name="place" value="nashik" current={place} label={C.placeNashik[locale]} onPick={() => setPlace("nashik")} />
            <Choice name="place" value="trimbak" current={place} label={C.placeTrimbak[locale]} onPick={() => setPlace("trimbak")} />
            <Choice name="place" value="either" current={place} label={C.placeEither[locale]} onPick={() => setPlace("either")} />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-temple-800">{C.scopeLegend[locale]}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <Choice name="scope" value="month" current={custom ? "range" : "month"} label={C.modeMonth[locale]} onPick={() => { setCustom(false); setSelected(null); }} />
            <Choice name="scope" value="range" current={custom ? "range" : "month"} label={C.modeRange[locale]} onPick={openRange} />
          </div>
          {!custom && (
            <div className="mt-3 flex flex-wrap gap-2">
              {MONTHS.map((item, index) => (
                <button
                  key={`${item.year}-${item.month}`}
                  type="button"
                  aria-pressed={index === monthIndex}
                  onClick={() => { setMonthIndex(index); setSelected(null); }}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${
                    index === monthIndex
                      ? "border-temple-900 bg-temple-900 text-cream-50"
                      : "border-temple-200 bg-cream-50 text-temple-800"
                  }`}
                >
                  {monthLabel(item.year, item.month, locale)}
                </button>
              ))}
            </div>
          )}
          {custom && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-temple-800">
                {C.from[locale]}
                <input
                  type="date"
                  value={from}
                  min={BOUNDS.startIso}
                  max={BOUNDS.endIso}
                  onChange={(event) => { setFrom(event.target.value); setSelected(null); }}
                  className="mt-1 w-full rounded-lg border border-temple-300 p-2 font-normal"
                />
              </label>
              <label className="block text-sm font-semibold text-temple-800">
                {C.to[locale]}
                <input
                  type="date"
                  value={to}
                  min={from || BOUNDS.startIso}
                  max={BOUNDS.endIso}
                  onChange={(event) => { setTo(event.target.value); setSelected(null); }}
                  className="mt-1 w-full rounded-lg border border-temple-300 p-2 font-normal"
                />
              </label>
            </div>
          )}
        </fieldset>
      </form>

      <ul className="mt-4 flex flex-col gap-1 text-sm text-temple-700">
        <li>{legendFor(legendIntent, "green")[locale]}</li>
        <li>{legendFor(legendIntent, "amber")[locale]}</li>
        <li>{legendFor(legendIntent, "red")[locale]}</li>
        <li>{C.legendOutside[locale]}</li>
      </ul>

      {rangeError === "order" && <p role="alert" className="mt-4 font-semibold text-sacred-maroon">{C.badRange[locale]}</p>}
      {custom && (!from || !to) && <p className="mt-4 text-temple-600">{C.pickRange[locale]}</p>}

      {summary && (
        <div className="mt-6" aria-live="polite">
          {showCalendar && (
            <div className="overflow-hidden rounded-2xl border border-temple-200 bg-white p-3 sm:p-4">
              <p className="px-1 font-heading text-lg font-bold text-temple-900">{monthLabel(month.year, month.month, locale)}</p>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-temple-500">
                {C.weekdays[locale].map((name) => (
                  <div key={name}>{name}</div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {monthCells(month.year, month.month).map((iso, index) =>
                  iso ? (
                    <DayCell key={iso} iso={iso} locale={locale} place={place} intent={intent} pressed={selected === iso} onPick={setSelected} />
                  ) : (
                    <div key={`pad-${index}`} />
                  )
                )}
              </div>
            </div>
          )}

          <section className="mt-6 rounded-2xl border border-temple-200 bg-cream-50 p-5">
            <h2 className="font-heading text-xl font-bold text-temple-900">{C.summaryH[locale]}</h2>
            <p className="mt-2 text-sm text-temple-600">
              {formatDate(summary.from, locale)} – {formatDate(summary.to, locale)}
              {" · "}
              {rangeCount(summary.green.length, locale)} {C.countGreen[locale]}
              {" · "}
              {rangeCount(summary.amber.length, locale)} {C.countAmber[locale]}
              {" · "}
              {rangeCount(summary.red.length, locale)} {C.countRed[locale]}
            </p>
            <DateGroup
              title={intent === "snan" ? C.goOn[locale] : C.avoid[locale]}
              dates={intent === "snan" ? summary.green : summary.red}
              empty={intent === "snan" ? C.noneGo[locale] : C.noneAvoid[locale]}
              locale={locale}
              onPick={setSelected}
            />
            <DateGroup title={C.caution[locale]} dates={summary.amber} empty="" locale={locale} onPick={setSelected} />
            <p className="mt-3 text-temple-800">
              <strong>{rangeCount(intent === "snan" ? summary.red.length : summary.green.length, locale)}</strong>{" "}
              {intent === "snan" ? C.snanRest[locale] : C.quietRest[locale]}
            </p>
            {showEvery && (
              <ul className="mt-4 space-y-2">
                {summary.days.map((day) => (
                  <li key={day.isoDate}>
                    <button type="button" onClick={() => setSelected(day.isoDate)} className="text-left font-semibold text-saffron-800 underline">
                      {formatDate(day.isoDate, locale, { weekday: true })}
                    </button>
                    <span className="text-temple-700"> · {day.band ? C[day.band === "green" ? "countGreen" : day.band === "amber" ? "countAmber" : "countRed"][locale] : C.legendOutside[locale]}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {focus && (
            <section className={`mt-4 rounded-2xl border p-5 ${focus.band ? BAND_CLASS[focus.band] : "border-temple-200 bg-white text-temple-800"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-heading text-xl font-bold">{C.dayH[locale]}</h2>
                <button type="button" onClick={() => setSelected(null)} className="text-sm font-semibold underline">
                  {C.clearDay[locale]}
                </button>
              </div>
              <p className="mt-2 font-semibold">{formatDate(focus.isoDate, locale, { weekday: true })}</p>
              <p className="mt-2 leading-relaxed">{DAY_REASONS[focus.reason][locale]}</p>
              <ListedList days={focus.matched} locale={locale} />
              {focus.also.length > 0 && (
                <>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-wide">{C.alsoH[locale]}</h3>
                  <ListedList days={focus.also} locale={locale} />
                </>
              )}
            </section>
          )}

          <section className="mt-6">
            <h2 className="font-heading text-xl font-bold text-temple-900">{C.nearestH[locale]}</h2>
            <p className="mt-1 text-sm text-temple-600">{C.nearestNote[locale]}</p>
            <ul className="mt-3 space-y-2">
              {nearest.map(({ day, delta }) => {
                const text = listedText(day, locale);
                return (
                  <li key={day.id}>
                    <button type="button" onClick={() => setSelected(day.isoDate)} className="text-left text-temple-900">
                      <strong>{formatDate(day.isoDate, locale, { weekday: true })}</strong>
                      {" · "}
                      {text.name}
                      {text.where ? ` · ${text.where}` : ""}
                      {" · "}
                      {deltaText(delta, locale)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {intent === "elderly" && <p className="mt-4 leading-relaxed text-temple-700">{C.elderlyNote[locale]}</p>}
          <p className="mt-4 text-sm leading-relaxed text-temple-600">{C.notForecast[locale]}</p>
          <p className="mt-2 text-sm text-temple-600">
            {C.source[locale]}: <time dateTime={scheduleUpdated}>{formatDate(scheduleUpdated, locale)}</time>
            {". "}
            <Link href="/dates" className="font-semibold text-saffron-800 underline">{C.datesLink[locale]}</Link>
          </p>
        </div>
      )}
    </div>
  );
}

function DayCell({
  iso,
  locale,
  place,
  intent,
  pressed,
  onPick,
}: {
  iso: string;
  locale: Locale;
  place: Place;
  intent: Intent;
  pressed: boolean;
  onPick: (iso: string) => void;
}) {
  const day = assessDay(iso, place, intent);
  const mark = day.band === "green" ? C.markYes[locale] : day.band === "amber" ? C.markNote[locale] : day.band === "red" ? C.markNo[locale] : "–";
  const num = localDigits(String(Number(iso.slice(8, 10))), locale);
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={`${formatDate(iso, locale, { weekday: true })}. ${mark}`}
      onClick={() => onPick(iso)}
      className={`min-h-14 rounded-lg border px-1 py-1 text-center ${
        day.band ? BAND_CLASS[day.band] : "border-temple-100 bg-cream-100 text-temple-400"
      } ${pressed ? "ring-2 ring-temple-900" : ""}`}
    >
      <span className="block text-sm font-bold">{num}</span>
      <span className="block text-[0.65rem] font-semibold leading-tight">{mark}</span>
    </button>
  );
}

function DateGroup({
  title,
  dates,
  empty,
  locale,
  onPick,
}: {
  title: string;
  dates: string[];
  empty: string;
  locale: Locale;
  onPick: (iso: string) => void;
}) {
  if (dates.length === 0) {
    return empty ? <p className="mt-3 text-temple-800">{empty}</p> : null;
  }
  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold text-temple-900">{title}</h3>
      <ul className="mt-1 space-y-1">
        {dates.map((iso) => (
          <li key={iso}>
            <button type="button" onClick={() => onPick(iso)} className="font-semibold text-saffron-800 underline">
              {formatDate(iso, locale, { weekday: true })}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListedList({ days, locale }: { days: ListedDay[]; locale: Locale }) {
  if (days.length === 0) return null;
  return (
    <ul className="mt-3 space-y-2">
      {days.map((day) => {
        const text = listedText(day, locale);
        return (
          <li key={day.id}>
            <p className="font-semibold">{text.name}</p>
            {text.tithi ? <p className="text-sm">{text.tithi}</p> : null}
            {text.where ? <p className="text-sm">{text.where}</p> : null}
          </li>
        );
      })}
    </ul>
  );
}
