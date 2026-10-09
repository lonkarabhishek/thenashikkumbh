import { createHash } from "node:crypto";

/**
 * Spend protection for the AI assistant.
 *
 * Counters live in Supabase (schema kumbh_ai, see supabase/migrations). Each
 * request first "takes" an estimated cost; after the answer streams we settle
 * the real cost. Three caps: a global daily dollar cap, a per-visitor daily
 * message cap and a per-visitor per-minute burst cap.
 *
 * Visitors are identified by a one-way hash of IP + user agent + the day, so
 * nothing stored can be traced back to a person, and the buckets are deleted
 * after two days. No question text is ever stored.
 *
 * If Supabase is not configured, a per-instance in-memory limiter is used.
 * That is weak on serverless (each instance counts alone), so production
 * should always have Supabase set.
 */

/**
 * Budget: about 200 rupees a month, roughly $2.30 at 87 rupees per dollar,
 * so about $0.075 a day. A typical answer costs around $0.0005, so that is
 * roughly 150 answers a day. Set AI_DAILY_CAP_USD in Vercel to change it.
 */
const DAILY_CAP_USD = Number(process.env.AI_DAILY_CAP_USD ?? 0.075);
const VISITOR_DAY_CAP = Number(process.env.AI_VISITOR_DAY_CAP ?? 25);
const VISITOR_MINUTE_CAP = Number(process.env.AI_VISITOR_MINUTE_CAP ?? 5);
/** Pre-charged per request, settled to the real cost afterwards. */
export const ESTIMATE_MICROS = 600; // $0.0006

export type LimitResult = { allowed: true } | { allowed: false; reason: "daily_cap" | "visitor_day" | "visitor_minute" | "unavailable" };

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

export const limitsConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

function istNow(): Date {
  // Buckets roll over at midnight IST, the site's time zone.
  return new Date(Date.now() + 5.5 * 3600 * 1000);
}

function dayKey(d = istNow()): string {
  return d.toISOString().slice(0, 10);
}

function minuteKey(d = istNow()): string {
  return d.toISOString().slice(0, 16);
}

export function visitorHash(ip: string, userAgent: string): string {
  const salt = process.env.AI_VISITOR_SALT ?? "";
  return createHash("sha256").update(`${ip}|${userAgent}|${dayKey()}|${salt}`).digest("hex").slice(0, 24);
}

async function rpc(fn: string, body: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY!,
      Authorization: `Bearer ${SUPABASE_KEY!}`,
      "Content-Profile": "kumbh_ai",
    },
    body: JSON.stringify(body),
    // A slow limiter must not hold the chat hostage.
    signal: AbortSignal.timeout(2500),
  });
  if (!res.ok) throw new Error(`Supabase ${fn}: HTTP ${res.status}`);
  return res.json();
}

/* ---- In-memory fallback (per instance) ---- */
const mem = new Map<string, { count: number; micros: number }>();
function memBump(key: string, micros: number): { count: number; micros: number } {
  const cur = mem.get(key) ?? { count: 0, micros: 0 };
  cur.count += 1;
  cur.micros += micros;
  mem.set(key, cur);
  if (mem.size > 5000) mem.clear();
  return cur;
}

/** Reserve capacity for one request. */
export async function take(visitor: string): Promise<LimitResult> {
  const day = dayKey();
  const minute = minuteKey();
  const dayCapMicros = Math.round(DAILY_CAP_USD * 1_000_000);

  if (!limitsConfigured) {
    if (memBump(`m:${visitor}:${minute}`, 0).count > VISITOR_MINUTE_CAP) return { allowed: false, reason: "visitor_minute" };
    if (memBump(`v:${visitor}:${day}`, 0).count > VISITOR_DAY_CAP) return { allowed: false, reason: "visitor_day" };
    if (memBump(`day:${day}`, ESTIMATE_MICROS).micros > dayCapMicros) return { allowed: false, reason: "daily_cap" };
    return { allowed: true };
  }

  try {
    const out = (await rpc("ai_take", {
      p_visitor: visitor,
      p_day: day,
      p_minute: minute,
      p_est_micros: ESTIMATE_MICROS,
      p_day_cap_micros: dayCapMicros,
      p_visitor_day_cap: VISITOR_DAY_CAP,
      p_minute_cap: VISITOR_MINUTE_CAP,
    })) as { allowed: boolean; reason?: string };
    if (out.allowed) return { allowed: true };
    const reason = out.reason as Exclude<LimitResult, { allowed: true }>["reason"];
    return { allowed: false, reason: reason ?? "unavailable" };
  } catch (err) {
    console.error("[ai limits] take failed", err);
    // Fail closed: if we cannot count, we do not spend.
    return { allowed: false, reason: "unavailable" };
  }
}

/** Replace the estimate with the real cost of the request. */
export async function settle(actualMicros: number): Promise<void> {
  const delta = Math.round(actualMicros - ESTIMATE_MICROS);
  if (!limitsConfigured) {
    memBump(`day:${dayKey()}`, delta).count -= 1;
    return;
  }
  try {
    await rpc("ai_settle", { p_day: dayKey(), p_delta_micros: delta });
  } catch (err) {
    console.error("[ai limits] settle failed", err);
  }
}

/** Claude Haiku 5.5 list prices, in micro-dollars per token. */
const PRICE = { input: 0.1, cacheRead: 0.01, cacheWrite: 0.125, output: 0.5 };

export function costMicros(usage: {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
}): number {
  return (
    usage.input_tokens * PRICE.input +
    (usage.cache_read_input_tokens ?? 0) * PRICE.cacheRead +
    (usage.cache_creation_input_tokens ?? 0) * PRICE.cacheWrite +
    usage.output_tokens * PRICE.output
  );
}
