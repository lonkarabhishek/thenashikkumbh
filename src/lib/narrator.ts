import { Locale } from "@/i18n/translations";

/**
 * Speech narration for the Yatra trails.
 *
 * Uses the device's own speech synthesis, so there is nothing to download and
 * no per-play cost. Two browser quirks shape the design:
 *
 *  1. Chrome silently stops a long utterance after roughly fifteen seconds, so
 *     narration is split into sentences and queued one at a time.
 *  2. The voice list is populated asynchronously, so callers must be able to
 *     start before `getVoices()` returns anything useful.
 *
 * When recorded audio exists for a stop the player uses an <audio> element
 * instead and never touches this module.
 */

export type NarratorStatus = "idle" | "playing" | "paused" | "unsupported";

export interface NarratorState {
  status: NarratorStatus;
  /** Index of the sentence currently being spoken. */
  chunkIndex: number;
  totalChunks: number;
  /** 0–1, by sentence count. Good enough for a progress bar. */
  progress: number;
}

type Listener = (state: NarratorState) => void;

const VOICE_PREFERENCE: Record<Locale, string[]> = {
  en: ["en-in", "en-gb", "en-au", "en-us", "en"],
  hi: ["hi-in", "hi"],
  // Marathi voices ship on very few devices. A Hindi voice reads Devanagari
  // correctly enough to stay useful, so it is the fallback rather than English.
  mr: ["mr-in", "mr", "hi-in", "hi"],
};

/**
 * Rough quality rank from the voice name. Browsers and OSes mark their
 * neural voices this way (Edge "Online (Natural)", Chrome "Google …",
 * Apple "Enhanced"/"Premium"); compact or eSpeak voices sound robotic.
 */
function voiceQuality(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  let score = 0;
  if (/natural|neural|online/.test(name)) score += 3;
  if (/premium|enhanced/.test(name)) score += 2;
  if (/google/.test(name)) score += 1;
  if (/compact|espeak/.test(name)) score -= 2;
  return score;
}

const BCP47: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
};

export function isNarrationSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

const TERMINATORS = new Set(["।", "॥", ".", "!", "?"]);

/**
 * Split narration into sentences, handling the Devanagari danda alongside Latin
 * punctuation. Written as a scan rather than a lookbehind regex because Safari
 * only gained lookbehind support in 16.4, and plenty of pilgrims are on older
 * phones.
 */
export function toChunks(text: string): string[] {
  const chunks: string[] = [];
  let current = "";

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    current += char;

    const next = text[i + 1];
    const atParagraphBreak = char === "\n" && next === "\n";
    const endsSentence =
      TERMINATORS.has(char) && (next === undefined || /\s/.test(next));

    if (endsSentence || atParagraphBreak) {
      const trimmed = current.trim();
      if (trimmed) chunks.push(trimmed);
      current = "";
    }
  }

  const tail = current.trim();
  if (tail) chunks.push(tail);

  return chunks;
}

export class Narrator {
  private chunks: string[] = [];
  private index = 0;
  private status: NarratorStatus = "idle";
  private listeners = new Set<Listener>();
  private locale: Locale = "en";
  private rate = 0.95;
  private keepAlive: ReturnType<typeof setInterval> | null = null;
  /** Guards against an `onend` from a cancelled utterance advancing the queue. */
  private token = 0;

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.snapshot());
    return () => {
      this.listeners.delete(fn);
    };
  }

  private snapshot(): NarratorState {
    return {
      status: this.status,
      chunkIndex: this.index,
      totalChunks: this.chunks.length,
      progress: this.chunks.length ? this.index / this.chunks.length : 0,
    };
  }

  private emit() {
    const state = this.snapshot();
    this.listeners.forEach((fn) => fn(state));
  }

  private pickVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    for (const tag of VOICE_PREFERENCE[this.locale]) {
      const matches = voices.filter((v) =>
        v.lang.toLowerCase().replace("_", "-").startsWith(tag)
      );
      if (matches.length) {
        // Within a language, take the most natural-sounding voice the device
        // offers; the first listed is often a robotic compact voice.
        return matches.reduce((best, v) => (voiceQuality(v) > voiceQuality(best) ? v : best));
      }
    }
    return null;
  }

  setRate(rate: number) {
    this.rate = rate;
    // Applies from the next sentence; restarting mid-sentence would be jarring.
  }

  getRate() {
    return this.rate;
  }

  /** Begin narrating `text`, replacing anything currently queued. */
  play(text: string, locale: Locale) {
    if (!isNarrationSupported()) {
      this.status = "unsupported";
      this.emit();
      return;
    }

    this.stop();
    this.locale = locale;
    this.chunks = toChunks(text);
    this.index = 0;

    if (!this.chunks.length) return;

    this.status = "playing";
    this.emit();
    this.speakCurrent();
    this.startKeepAlive();
  }

  private speakCurrent() {
    const chunk = this.chunks[this.index];
    if (chunk === undefined) {
      this.finish();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = BCP47[this.locale];
    utterance.rate = this.rate;
    utterance.pitch = 1;

    const voice = this.pickVoice();
    if (voice) utterance.voice = voice;

    const token = this.token;

    utterance.onend = () => {
      if (token !== this.token || this.status !== "playing") return;
      this.index += 1;
      this.emit();
      this.speakCurrent();
    };

    utterance.onerror = (event) => {
      if (token !== this.token) return;
      // "interrupted"/"canceled" are the expected result of stop() and pause().
      if (event.error === "interrupted" || event.error === "canceled") return;
      this.finish();
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Chrome pauses its own synthesis engine when a tab has been speaking for a
   * while. A no-op resume on a timer keeps it running.
   */
  private startKeepAlive() {
    this.stopKeepAlive();
    this.keepAlive = setInterval(() => {
      if (this.status === "playing" && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 9000);
  }

  private stopKeepAlive() {
    if (this.keepAlive) {
      clearInterval(this.keepAlive);
      this.keepAlive = null;
    }
  }

  pause() {
    if (!isNarrationSupported() || this.status !== "playing") return;
    window.speechSynthesis.pause();
    this.status = "paused";
    this.stopKeepAlive();
    this.emit();
  }

  resume() {
    if (!isNarrationSupported() || this.status !== "paused") return;
    window.speechSynthesis.resume();
    this.status = "playing";
    this.startKeepAlive();
    this.emit();
  }

  /** Jump to a sentence index and continue from there. */
  seekChunk(index: number) {
    if (!this.chunks.length) return;
    const next = Math.max(0, Math.min(index, this.chunks.length - 1));
    this.token += 1;
    window.speechSynthesis.cancel();
    this.index = next;
    this.status = "playing";
    this.emit();
    this.speakCurrent();
    this.startKeepAlive();
  }

  private finish() {
    this.token += 1;
    this.status = "idle";
    this.index = this.chunks.length;
    this.stopKeepAlive();
    this.emit();
  }

  stop() {
    if (!isNarrationSupported()) return;
    this.token += 1;
    window.speechSynthesis.cancel();
    this.status = "idle";
    this.index = 0;
    this.stopKeepAlive();
    this.emit();
  }

  /**
   * Some browsers only expose voices after `voiceschanged`. Calling this once
   * on mount warms the list so the first play already has the right voice.
   */
  static warmVoices(onReady?: () => void) {
    if (!isNarrationSupported()) return;
    const synth = window.speechSynthesis;
    if (synth.getVoices().length) {
      onReady?.();
      return;
    }
    const handler = () => {
      synth.removeEventListener("voiceschanged", handler);
      onReady?.();
    };
    synth.addEventListener("voiceschanged", handler);
  }
}

/** Whether a real voice exists for this locale on this device. */
export function hasVoiceFor(locale: Locale): boolean {
  if (!isNarrationSupported()) return false;
  const voices = window.speechSynthesis.getVoices();
  return VOICE_PREFERENCE[locale].some((tag) =>
    voices.some((v) => v.lang.toLowerCase().replace("_", "-").startsWith(tag))
  );
}
