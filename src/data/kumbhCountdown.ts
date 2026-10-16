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

/**
 * Index of the nearest upcoming target at `nowMs` (epoch ms), or -1 when every
 * date has passed. Targets are sorted by instant and compared as absolute
 * instants (each carries an explicit +05:30 offset), so the result does not
 * depend on the viewer's time zone. Nothing here is hard-coded: the "next"
 * date moves on by itself as time passes.
 */
export function nearestTargetIndex(nowMs: number, targets: CountdownTarget[] = countdownTargets): number {
  return targets.findIndex((t) => new Date(t.targetIso).getTime() > nowMs);
}
