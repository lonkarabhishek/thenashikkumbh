"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Download, Printer, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FAMILY_COPY as C } from "@/components/tools/familyCopy";
import { buildFamilyCard, FIELD_LIMITS, type FamilyCard } from "@/lib/familyCard";
import { jpegToPdf } from "@/lib/jpegPdf";
import { SITE_URL } from "@/lib/seo";

const W = 1080;

function fontFamily(): string {
  if (typeof document === "undefined") return '"Noto Serif Devanagari", serif';
  const deva = getComputedStyle(document.body).getPropertyValue("--font-devanagari").trim();
  return deva || '"Noto Serif Devanagari", Georgia, serif';
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  const pushLong = (word: string) => {
    let chunk = "";
    for (const ch of Array.from(word)) {
      const test = chunk + ch;
      if (ctx.measureText(test).width > maxW && chunk) {
        lines.push(chunk);
        chunk = ch;
      } else chunk = test;
    }
    line = chunk;
  };
  for (const word of words) {
    if (ctx.measureText(word).width > maxW) {
      if (line) lines.push(line);
      line = "";
      pushLong(word);
      continue;
    }
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

type Labels = {
  band: string;
  sub: string;
  name: string;
  phone: string;
  meet: string;
  stay: string;
  note: string;
  scan: string;
  emptyQr: string;
  foot: string;
  unofficial: string;
  placeholder: string;
};

function paint(cv: HTMLCanvasElement, card: FamilyCard | null, qr: HTMLImageElement | null, labels: Labels) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const font = fontFamily();
  const maxW = W - 144;
  const labelFont = `600 28px ${font}`;
  const nameFont = `700 68px ${font}`;
  const phoneFont = `700 64px ${font}`;
  const valueFont = `600 44px ${font}`;
  const subFont = `500 36px ${font}`;

  ctx.font = subFont;
  const subLines = wrap(ctx, labels.sub, W - 180);
  ctx.font = nameFont;
  const nameLines = wrap(ctx, card?.name || labels.placeholder, maxW);
  ctx.font = phoneFont;
  const phoneLines = wrap(ctx, card?.phoneDisplay || labels.placeholder, maxW);
  ctx.font = valueFont;
  const meetLines = card?.meeting ? wrap(ctx, card.meeting, maxW) : [];
  const stayLines = card?.stay ? wrap(ctx, card.stay, maxW) : [];
  const noteLines = card?.note ? wrap(ctx, card.note, maxW) : [];
  ctx.font = `500 34px ${font}`;
  const emptyLines = wrap(ctx, labels.emptyQr, W - 180);
  ctx.font = `400 26px ${font}`;
  const unofficialLines = wrap(ctx, labels.unofficial, W - 160);

  const bandH = 230 + subLines.length * 48;
  const advance = (n: number, lh: number) => 8 + n * lh + 36;
  let H = bandH + 64;
  H += advance(nameLines.length, 78);
  H += advance(phoneLines.length, 74);
  if (meetLines.length) H += advance(meetLines.length, 56);
  if (stayLines.length) H += advance(stayLines.length, 56);
  if (noteLines.length) H += advance(noteLines.length, 56);
  H += 8;
  H += card && qr ? 300 + 70 + 52 : emptyLines.length * 46 + 24;
  H += 42 + unofficialLines.length * 36 + 56;

  cv.width = W;
  cv.height = H;
  ctx.fillStyle = "#FEFCF8";
  ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, W, bandH);
  g.addColorStop(0, "#7A1418");
  g.addColorStop(1, "#C1272D");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, bandH);
  ctx.fillStyle = "#C9A227";
  ctx.fillRect(0, bandH - 12, W, 12);

  ctx.textAlign = "center";
  ctx.fillStyle = "#F5EED2";
  ctx.font = `700 36px ${font}`;
  ctx.fillText("ॐ", W / 2, 64);
  ctx.fillStyle = "#FEFCF8";
  ctx.font = `700 72px ${font}`;
  ctx.fillText(labels.band, W / 2, 148);
  ctx.fillStyle = "#FBF6EC";
  ctx.font = subFont;
  subLines.forEach((line, i) => ctx.fillText(line, W / 2, 206 + i * 48));

  ctx.textAlign = "left";
  let y = bandH + 64;
  const drawField = (label: string, lines: string[], valueFontName: string, lh: number, ink: string) => {
    ctx.fillStyle = "#9E4F09";
    ctx.font = labelFont;
    ctx.fillText(label, 72, y);
    y += 8;
    ctx.fillStyle = ink;
    ctx.font = valueFontName;
    for (const line of lines) {
      y += lh;
      ctx.fillText(line, 72, y);
    }
    y += 36;
  };
  const ink = card ? "#16110D" : "#B3A28C";
  drawField(labels.name, nameLines, nameFont, 78, ink);
  drawField(labels.phone, phoneLines, phoneFont, 74, ink);
  if (meetLines.length) drawField(labels.meet, meetLines, valueFont, 56, "#16110D");
  if (stayLines.length) drawField(labels.stay, stayLines, valueFont, 56, "#16110D");
  if (noteLines.length) drawField(labels.note, noteLines, valueFont, 56, "#16110D");

  y += 8;
  if (card && qr) {
    const size = 300;
    const x = (W - size) / 2;
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#E2CEAC";
    ctx.lineWidth = 4;
    ctx.fillRect(x - 18, y, size + 36, size + 36);
    ctx.strokeRect(x - 18, y, size + 36, size + 36);
    ctx.drawImage(qr, x, y + 18, size, size);
    y += size + 70;
    ctx.textAlign = "center";
    ctx.fillStyle = "#6B5847";
    ctx.font = `600 32px ${font}`;
    ctx.fillText(labels.scan, W / 2, y);
    y += 52;
  } else {
    ctx.textAlign = "center";
    ctx.fillStyle = "#8C7860";
    ctx.font = `500 34px ${font}`;
    for (const line of emptyLines) {
      ctx.fillText(line, W / 2, y);
      y += 46;
    }
    y += 24;
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#A8851C";
  ctx.font = `600 30px ${font}`;
  ctx.fillText(labels.foot, W / 2, y);
  y += 42;
  ctx.fillStyle = "#8C7860";
  ctx.font = `400 26px ${font}`;
  for (const line of unofficialLines) {
    ctx.fillText(line, W / 2, y);
    y += 36;
  }

  ctx.strokeStyle = "#C9A227";
  ctx.lineWidth = 10;
  ctx.strokeRect(28, 28, W - 56, H - 56);
}

async function loadQr(text: string): Promise<HTMLImageElement> {
  const mod = await import("qrcode");
  const api = (mod.default ?? mod) as typeof import("qrcode");
  const url = await api.toDataURL(text, {
    errorCorrectionLevel: "Q",
    margin: 1,
    width: 360,
    color: { dark: "#16110dff", light: "#ffffffff" },
  });
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("qr"));
    img.src = url;
  });
}

export default function FamilyCardTool() {
  const { locale } = useLanguage();
  const ref = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stay, setStay] = useState("");
  const [meeting, setMeeting] = useState("");
  const [note, setNote] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const { card, errors } = useMemo(
    () => buildFamilyCard({ name, phone, stay, meeting, note }, locale),
    [name, phone, stay, meeting, note, locale]
  );

  const labels: Labels = useMemo(
    () => ({
      band: C.band[locale],
      sub: C.cardSub[locale],
      name: C.cardName[locale],
      phone: C.cardPhone[locale],
      meet: C.cardMeet[locale],
      stay: C.cardStay[locale],
      note: C.cardNote[locale],
      scan: C.scan[locale],
      emptyQr: C.emptyQr[locale],
      foot: C.foot[locale],
      unofficial: C.unofficial[locale],
      placeholder: C.placeholder[locale],
    }),
    [locale]
  );

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    let cancelled = false;
    (async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      let qr: HTMLImageElement | null = null;
      if (card) {
        try {
          qr = await loadQr(card.qrText);
        } catch {
          qr = null;
        }
      }
      if (cancelled || !ref.current) return;
      paint(ref.current, card, qr, labels);
    })();
    return () => {
      cancelled = true;
    };
  }, [card, labels]);

  const toolUrl = `${SITE_URL}/${locale}/family-card`;
  const message = card?.whatsappText(toolUrl) ?? "";
  const showNameError = errors.includes("name") && (attempted || name.trim().length > 0);
  const showPhoneError = errors.includes("phone") && (attempted || phone.trim().length > 0);

  const blob = (type: string, quality?: number) =>
    new Promise<Blob | null>((resolve) => ref.current?.toBlob((b) => resolve(b), type, quality));

  const save = (href: string, filename: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(href), 2000);
  };

  const downloadPng = async () => {
    setAttempted(true);
    const b = await blob("image/png");
    if (!b || !card) return;
    save(URL.createObjectURL(b), "khoya-paya-family-card.png");
  };

  const downloadPdf = async () => {
    setAttempted(true);
    const cv = ref.current;
    const b = await blob("image/jpeg", 0.92);
    if (!b || !cv || !card) return;
    const pdf = jpegToPdf(new Uint8Array(await b.arrayBuffer()), cv.width, cv.height);
    const file = new Blob([Uint8Array.from(pdf).buffer], { type: "application/pdf" });
    save(URL.createObjectURL(file), "khoya-paya-family-card.pdf");
  };

  const printCard = () => {
    setAttempted(true);
    if (!card) return;
    document.body.classList.add("family-card-printing");
    const cleanup = () => {
      document.body.classList.remove("family-card-printing");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  };

  const copyText = async () => {
    setAttempted(true);
    if (!card) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    setAttempted(true);
    if (!card) return;
    const b = await blob("image/png");
    const file = b ? new File([b], "khoya-paya-family-card.png", { type: "image/png" }) : null;
    try {
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: message, title: C.h1[locale] });
      } else {
        await navigator.share({ text: message, title: C.h1[locale] });
      }
    } catch {
      /* The visitor dismissed the share sheet. */
    }
  };

  const wa = message ? `https://wa.me/?text=${encodeURIComponent(message)}` : undefined;
  const locked = !card;

  return (
    <div className="mt-8">
      <p className="rounded-xl border-l-4 border-saffron-500 bg-cream-100 p-4 text-temple-800">{C.privacy[locale]}</p>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void downloadPng();
          }}
          noValidate
        >
          <div>
            <label htmlFor="family-name" className="block font-semibold text-temple-900">
              {C.name[locale]}
            </label>
            <input
              id="family-name"
              name="name"
              value={name}
              maxLength={FIELD_LIMITS.name}
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              aria-invalid={showNameError}
              aria-describedby={showNameError ? "family-name-error" : undefined}
              className="mt-1 w-full rounded-xl border border-temple-200 bg-white px-4 py-3 text-temple-900"
            />
            {showNameError && (
              <p id="family-name-error" className="mt-1 text-sm text-sacred-red">
                {C.errName[locale]}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="family-phone" className="block font-semibold text-temple-900">
              {C.phone[locale]}
            </label>
            <input
              id="family-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              maxLength={20}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={showPhoneError}
              aria-describedby="family-phone-hint"
              className="mt-1 w-full rounded-xl border border-temple-200 bg-white px-4 py-3 text-temple-900"
            />
            <p id="family-phone-hint" className="mt-1 text-sm text-temple-600">
              {showPhoneError ? C.errPhone[locale] : C.phoneHint[locale]}
            </p>
          </div>
          <div>
            <label htmlFor="family-stay" className="block font-semibold text-temple-900">
              {C.stay[locale]}
            </label>
            <input
              id="family-stay"
              name="stay"
              value={stay}
              maxLength={FIELD_LIMITS.stay}
              placeholder={C.phStay[locale]}
              onChange={(e) => setStay(e.target.value)}
              className="mt-1 w-full rounded-xl border border-temple-200 bg-white px-4 py-3 text-temple-900 placeholder:text-temple-400"
            />
          </div>
          <div>
            <label htmlFor="family-meet" className="block font-semibold text-temple-900">
              {C.meet[locale]}
            </label>
            <input
              id="family-meet"
              name="meeting"
              value={meeting}
              maxLength={FIELD_LIMITS.meeting}
              placeholder={C.phMeet[locale]}
              onChange={(e) => setMeeting(e.target.value)}
              className="mt-1 w-full rounded-xl border border-temple-200 bg-white px-4 py-3 text-temple-900 placeholder:text-temple-400"
            />
          </div>
          <div>
            <label htmlFor="family-note" className="block font-semibold text-temple-900">
              {C.note[locale]}
            </label>
            <input
              id="family-note"
              name="note"
              value={note}
              maxLength={FIELD_LIMITS.note}
              placeholder={C.phNote[locale]}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full rounded-xl border border-temple-200 bg-white px-4 py-3 text-temple-900 placeholder:text-temple-400"
            />
          </div>
          {!card && <p className="text-sm text-temple-600">{C.need[locale]}</p>}
        </form>

        <div>
          <canvas
            id="family-safety-card"
            ref={ref}
            role="img"
            aria-label={card ? `${C.altReady[locale]} ${card.name}, ${card.phoneDisplay}` : C.altEmpty[locale]}
            className="mx-auto w-full max-w-sm rounded-2xl border border-temple-200 shadow"
          />
          <p className="sr-only" aria-live="polite">
            {card ? `${card.name}. ${card.phoneDisplay}. ${card.meeting}` : C.need[locale]}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => void downloadPng()} disabled={locked} className="btn-gold inline-flex items-center gap-2 disabled:opacity-50">
          <Download className="h-4 w-4" />
          {C.download[locale]}
        </button>
        <button type="button" onClick={() => void downloadPdf()} disabled={locked} className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50">
          <Download className="h-4 w-4" />
          {C.pdf[locale]}
        </button>
        <button type="button" onClick={printCard} disabled={locked} className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50">
          <Printer className="h-4 w-4" />
          {C.print[locale]}
        </button>
        <button type="button" onClick={() => void copyText()} disabled={locked} className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50">
          <Copy className="h-4 w-4" />
          {copied ? C.copied[locale] : C.copy[locale]}
        </button>
        {canShare && (
          <button type="button" onClick={() => void share()} disabled={locked} className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50">
            <Share2 className="h-4 w-4" />
            {C.share[locale]}
          </button>
        )}
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            {C.wa[locale]}
          </a>
        ) : (
          <span className="btn-secondary opacity-50">{C.wa[locale]}</span>
        )}
      </div>
      <p className="mt-3 text-sm text-temple-600">{C.waNote[locale]}</p>
      {card && (
        <details className="mt-4 rounded-xl border border-temple-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold text-temple-900">{C.showText[locale]}</summary>
          <textarea readOnly value={message} rows={8} className="mt-3 w-full rounded-lg border border-temple-200 p-3 text-sm text-temple-800" />
        </details>
      )}
    </div>
  );
}
