import type { Locale } from "@/i18n/translations";

/**
 * Browser side of /api/sahayak. Streams the answer piece by piece and tells
 * the caller when to fall back to the built-in keyword engine (no API key,
 * daily budget spent, rate limit, or an error before any text arrived).
 */

export type AiTurn = { role: "user" | "assistant"; content: string };

export type AiResult =
  | { kind: "done"; text: string }
  | { kind: "fallback"; reason: string }
  /** The stream broke after some text had arrived. */
  | { kind: "partial"; text: string };

export async function askAi(
  locale: Locale,
  turns: AiTurn[],
  onDelta: (text: string) => void,
  signal?: AbortSignal
): Promise<AiResult> {
  let text = "";
  try {
    const res = await fetch("/api/sahayak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, messages: turns }),
      signal,
    });
    if (!res.ok || !res.body) return { kind: "fallback", reason: `http_${res.status}` };

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let nl: number;
      while ((nl = buffer.indexOf("\n")) >= 0) {
        const raw = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!raw) continue;
        let event: { type: string; text?: string; reason?: string };
        try {
          event = JSON.parse(raw);
        } catch {
          continue;
        }
        if (event.type === "delta" && event.text) {
          text += event.text;
          onDelta(text);
        } else if (event.type === "fallback") {
          return text ? { kind: "partial", text } : { kind: "fallback", reason: event.reason ?? "unknown" };
        } else if (event.type === "error") {
          return text ? { kind: "partial", text } : { kind: "fallback", reason: "error" };
        } else if (event.type === "done") {
          return { kind: "done", text };
        }
      }
    }
    return text ? { kind: "done", text } : { kind: "fallback", reason: "empty" };
  } catch {
    return text ? { kind: "partial", text } : { kind: "fallback", reason: "network" };
  }
}
