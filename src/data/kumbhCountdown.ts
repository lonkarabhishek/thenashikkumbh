import { schedule, scheduleUpdated, type ScheduleEvent } from "@/data/verified";

/**
 * Dates the /kumbh-countdown tool counts down to.
 *
 * There is NO date typed in this file. Every date, time, name and place is
 * read from `schedule` in src/data/verified/index.ts, the same registry that
 * feeds /dates, so the two pages cannot disagree. To add or drop a countdown
 * row, change the id list below.
 */
export const COUNTDOWN_IDS = [
  "dhwajarohan",
  "amrit-snan-1",
  "amrit-snan-2",
  "amrit-snan-3-nashik",
  "amrit-snan-3-trimbak",
  "conclusion-trimbak",
  "conclusion",
] as const;

export interface CountdownTarget {
  event: ScheduleEvent;
  /** Instant we count down to, in IST. Uses the official start time only when one is published. */
  targetIso: string;
  hasOfficialTime: boolean;
}

export const countdownTargets: CountdownTarget[] = COUNTDOWN_IDS.map((id) => {
  const event = schedule.find((e) => e.id === id);
  if (!event) throw new Error(`kumbhCountdown: schedule has no event "${id}"`);
  const time = event.startTime ?? "00:00";
  return { event, targetIso: `${event.isoDate}T${time}:00+05:30`, hasOfficialTime: !!event.startTime };
}).sort((a, b) => a.targetIso.localeCompare(b.targetIso));

export const countdownDataUpdated = scheduleUpdated;
