"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "@/components/LocaleLink";
import { Download, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { countdownTargets } from "@/data/kumbhCountdown";
import { formatDate, formatTime } from "@/lib/dates";
import { SITE_URL } from "@/lib/seo";
import { SHARE_COPY as C } from "@/components/tools/shareCopy";

const W = 1080;
const H = 1350;
const FONT = '"Noto Sans Devanagari","Noto Serif Devanagari","Segoe UI",system-ui,sans-serif';
const SHOWN = ["dhwajarohan", "amrit-snan-1", "amrit-snan-2", "amrit-snan-3-nashik", "amrit-snan-3-trimbak"];

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

export default function ShareCardTool() {
  const { locale } = useLanguage();
  const ref = useRef<HTMLCanvasElement>(null);
  const [canShare, setCanShare] = useState(false);

  const draw = useCallback(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#1a0a00"); g.addColorStop(1, "#0B1220");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 6; ctx.strokeRect(36, 36, W - 72, H - 72);
    ctx.textAlign = "center";
    ctx.fillStyle = "#C9A227"; ctx.font = `700 40px ${FONT}`; ctx.fillText("ॐ", W / 2, 130);
    ctx.fillStyle = "#F7EFD9"; ctx.font = `700 78px ${FONT}`; ctx.fillText(C.cardTitle[locale], W / 2, 235);
    ctx.fillStyle = "#DFCC78"; ctx.font = `500 42px ${FONT}`; ctx.fillText(C.cardSub[locale], W / 2, 305);
    let y = 400;
    for (const id of SHOWN) {
      const t = countdownTargets.find((x) => x.event.id === id);
      if (!t) continue;
      const e = t.event;
      ctx.textAlign = "left";
      ctx.fillStyle = "#C9A227"; ctx.font = `700 50px ${FONT}`;
      const when = formatDate(e.isoDate, locale) + (t.hasOfficialTime ? `, ${formatTime(e.startTime!, locale)}` : "");
      ctx.fillText(when, 90, y);
      ctx.fillStyle = "#F7EFD9"; ctx.font = `500 36px ${FONT}`;
      const lines = wrap(ctx, e.name[locale].replace(/\s*\(.*\)$/, ""), W - 180);
      lines.forEach((l, i) => ctx.fillText(l, 90, y + 52 + i * 44));
      y += 52 + lines.length * 44 + 52;
    }
    ctx.textAlign = "center";
    ctx.fillStyle = "#cdbf9a"; ctx.font = `400 32px ${FONT}`; ctx.fillText(C.cardNote[locale], W / 2, H - 150);
    ctx.fillStyle = "#C9A227"; ctx.font = `600 36px ${FONT}`; ctx.fillText(C.cardFoot[locale], W / 2, H - 90);
  }, [locale]);

  useEffect(() => {
    draw();
    if (typeof document !== "undefined" && document.fonts?.ready) document.fonts.ready.then(draw);
    setCanShare(typeof navigator !== "undefined" && typeof navigator.canShare === "function");
  }, [draw]);

  const toBlob = () => new Promise<Blob | null>((res) => ref.current?.toBlob(res, "image/png"));

  const download = async () => {
    const b = await toBlob();
    if (!b) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = `nashik-kumbh-2027-dates-${locale}.png`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  const share = async () => {
    const b = await toBlob();
    if (!b) return;
    const file = new File([b], `nashik-kumbh-2027-dates-${locale}.png`, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], text: `${C.shareText[locale]} ${SITE_URL}/${locale}/dates` }).catch(() => {});
    else download();
  };
  const wa = `https://wa.me/?text=${encodeURIComponent(`${C.shareText[locale]} ${SITE_URL}/${locale}/dates`)}`;

  return (
    <>
      <canvas ref={ref} width={W} height={H} role="img" aria-label={C.alt[locale]} className="mx-auto mt-8 w-full max-w-sm rounded-2xl border border-temple-200 shadow" />
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={download} className="btn-gold inline-flex items-center gap-2"><Download className="h-4 w-4" />{C.download[locale]}</button>
        {canShare && <button type="button" onClick={share} className="btn-gold inline-flex items-center gap-2"><Share2 className="h-4 w-4" />{C.shareImg[locale]}</button>}
        <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full border border-temple-900 px-5 py-2 font-semibold text-temple-900">{C.wa[locale]}</a>
      </div>
      <p className="mt-3 text-center text-sm text-temple-600">{C.waNote[locale]}</p>
      <p className="mt-6 rounded-xl border-l-4 border-saffron-500 bg-cream-100 p-4 text-temple-800">
        {C.datesLead[locale]} <Link href="/dates" className="font-semibold text-saffron-700 underline">{C.datesLink[locale]}</Link>.
      </p>
    </>
  );
}
