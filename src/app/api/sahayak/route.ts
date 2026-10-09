import Anthropic from "@anthropic-ai/sdk";
import { LOCALES } from "@/i18n/locales";
import type { Locale } from "@/i18n/translations";
import { coreFacts, retrieve } from "@/lib/ai/knowledge";
import { rules } from "@/lib/ai/prompt";
import { costMicros, settle, take, visitorHash } from "@/lib/ai/limits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/sahayak: answers a chat turn with Claude Haiku, grounded in the
 * site's knowledge pack, streamed back as newline-delimited JSON:
 *   {"type":"delta","text":"..."}   pieces of the answer, in order
 *   {"type":"done","stop":"end_turn"}
 *   {"type":"fallback","reason":"disabled|daily_cap|visitor_day|visitor_minute|unavailable|error|refusal"}
 * On "fallback" the browser answers from its built-in keyword engine instead,
 * so the chat keeps working when the key is missing or the daily cap is hit.
 */

const MODEL = "claude-haiku-5-5";
const MAX_TURNS = 10;
const MAX_QUESTION_CHARS = 600;
const MAX_HISTORY_CHARS = 1500;

type Turn = { role: "user" | "assistant"; content: string };

function clean(text: string, max: number): string {
  // Drop control characters, collapse whitespace, cap the length.
  return text.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

function parseBody(body: unknown): { locale: Locale; turns: Turn[] } | null {
  if (!body || typeof body !== "object") return null;
  const { locale, messages } = body as { locale?: unknown; messages?: unknown };
  if (typeof locale !== "string" || !(LOCALES as readonly string[]).includes(locale)) return null;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const turns: Turn[] = [];
  for (const m of messages.slice(-MAX_TURNS)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = clean(content, role === "user" ? MAX_QUESTION_CHARS : MAX_HISTORY_CHARS);
    if (text) turns.push({ role, content: text });
  }
  // The API needs the first turn to be the user's; the last must be the question.
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (turns.length === 0 || turns[turns.length - 1].role !== "user") return null;
  return { locale: locale as Locale, turns };
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data) + "\n", {
    status,
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });

export async function POST(req: Request): Promise<Response> {
  let parsed: ReturnType<typeof parseBody> = null;
  try {
    parsed = parseBody(await req.json());
  } catch {
    parsed = null;
  }
  if (!parsed) return json({ type: "fallback", reason: "error" }, 400);

  if (!process.env.ANTHROPIC_API_KEY) return json({ type: "fallback", reason: "disabled" });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const visitor = visitorHash(ip, req.headers.get("user-agent") ?? "");
  const limit = await take(visitor);
  if (!limit.allowed) return json({ type: "fallback", reason: limit.reason });

  const { locale, turns } = parsed;
  const client = new Anthropic({ maxRetries: 1, timeout: 45_000 });

  // Only the passages that match this question travel with the request, so
  // a turn costs about 2k to 3k input tokens instead of the whole site.
  const question = turns[turns.length - 1].content;
  const previous = [...turns].reverse().find((t, i) => i > 0 && t.role === "user")?.content ?? "";
  const context = retrieve(locale, question, previous);
  const system = [
    { type: "text" as const, text: rules(locale) },
    { type: "text" as const, text: `# Core facts\n${coreFacts(locale)}` },
    {
      type: "text" as const,
      text: context
        ? `# Passages from the site that match this question\n${context}`
        : "# No passage on this site matches the question. Answer only from the core facts above, or say the site does not cover it.",
    },
  ];

  const encoder = new TextEncoder();
  const line = (data: unknown) => encoder.encode(JSON.stringify(data) + "\n");

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false;
      try {
        const run = client.messages.stream({
          model: MODEL,
          max_tokens: 500,
          output_config: { effort: "low" },
          system,
          messages: turns,
        });

        for await (const event of run) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            sent = true;
            controller.enqueue(line({ type: "delta", text: event.delta.text }));
          }
        }

        const final = await run.finalMessage();
        void settle(costMicros(final.usage));

        if (final.stop_reason === "refusal" && !sent) {
          controller.enqueue(line({ type: "fallback", reason: "refusal" }));
        } else {
          controller.enqueue(line({ type: "done", stop: final.stop_reason }));
        }
      } catch (err) {
        if (err instanceof Anthropic.APIError) {
          console.error(`[sahayak] API error ${err.status}: ${err.message}`);
        } else {
          console.error("[sahayak] error", err);
        }
        controller.enqueue(line(sent ? { type: "error" } : { type: "fallback", reason: "error" }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
