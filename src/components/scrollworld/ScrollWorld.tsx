"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/LocaleLink";
import { ArrowRight, ChevronDown, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { worldScenes } from "./IsoScenes";
import { worldCopy, worldUI } from "./worldCopy";

/**
 * Scroll-scrubbed camera flight through isometric dioramas.
 *
 * Two things the layout has to get right: the copy must stay legible over
 * whatever the art is doing, and the information has to arrive gradually rather
 * than all at once. So the text lives in its own paper panel, never floating
 * over the model, and each scene's facts stagger in as the camera moves deeper
 * into it.
 *
 * Scroll only drives time. Per-frame work is arithmetic written straight to the
 * DOM in a rAF loop; React re-renders just five times, when the panel changes.
 */

/**
 * Scroll height per scene, in viewport heights. Phones get a shorter flight,
 * nine screen-heights of swiping is a lot of thumb.
 */
const SCENE_VH = 1.8;
const SCENE_VH_MOBILE = 1.15;

/** Start and end scale per depth layer: backdrop, model, foreground. */
const LAYER_SCALE: [number, number][] = [
  [1.0, 1.22],
  [0.62, 2.15],
  [1.12, 2.9],
];
/** On a phone the model has a smaller band to live in, so it starts larger. */
const LAYER_SCALE_MOBILE: [number, number][] = [
  [1.0, 1.16],
  [0.92, 1.95],
  [1.1, 2.5],
];
const LAYER_DRIFT = [-8, -40, -170];
const LAYER_DRIFT_MOBILE = [-6, -28, -110];

/** How far into a scene each fact appears. The first is already arriving when
    the scene does, so the panel never shows an empty block. */
const FACT_AT = [-0.1, 0.12, 0.3];

/** On wide screens the model shifts right so the reading panel does not cover
    it. The backdrop stays full-bleed, or a seam shows at the panel's edge. */
const LAYER_SHIFTS = [0, 1, 1];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function ScrollWorld() {
  const { locale } = useLanguage();

  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const factRefs = useRef<(HTMLLIElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  /** Which scene's copy the panel is showing. Changes five times, not per frame. */
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    const stage = stageRef.current;
    if (!host || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const render = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const travel = host.offsetHeight - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel, 0, 1) : 0;
      const g = p * worldScenes.length;
      // Wide screens: shift the model right of the reading panel.
      // Phones: the panel is a bottom sheet, so lift the model into the top half.
      const wide = window.innerWidth >= 1024;
      const panelShift = wide ? Math.min(230, window.innerWidth * 0.15) : 0;
      const panelLift = wide ? 0 : -window.innerHeight * 0.17;

      worldScenes.forEach((scene, i) => {
        const sceneEl = sceneRefs.current[i];
        if (!sceneEl) return;

        const d = g - i;
        const approach = i === 0 ? 0 : 0.5;

        if (d < -approach - 0.05 || d > 1.4) {
          if (sceneEl.style.visibility !== "hidden") {
            sceneEl.style.visibility = "hidden";
            sceneEl.style.opacity = "0";
          }
          return;
        }
        sceneEl.style.visibility = "visible";

        const fadeIn = approach > 0 ? clamp((d + approach) / approach, 0, 1) : 1;
        const fadeOut = 1 - clamp((d - 0.78) / 0.58, 0, 1);
        sceneEl.style.opacity = String(reduce ? (d >= 0 && d < 1 ? 1 : 0) : fadeIn * fadeOut);
        sceneEl.style.zIndex = String(10 + i);

        const dolly = reduce ? 0 : clamp((d + approach) / (approach + 1.35), 0, 1);

        const layers = layerRefs.current[i] || [];
        layers.forEach((layerEl, li) => {
          if (!layerEl) return;
          const [from, to] = (wide ? LAYER_SCALE : LAYER_SCALE_MOBILE)[li] ?? [1, 2];
          const scale = lerp(from, to, dolly);
          const drift = lerp(0, (wide ? LAYER_DRIFT : LAYER_DRIFT_MOBILE)[li] ?? -60, dolly);
          const shift = (LAYER_SHIFTS[li] ?? 0) * panelShift;
          const lift = (LAYER_SHIFTS[li] ?? 0) * panelLift;
          layerEl.style.transform = `translate3d(${shift.toFixed(1)}px, ${(drift + lift).toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
        });

        const railEl = railRefs.current[i];
        if (railEl) {
          const on = d >= -0.1 && d < 0.9;
          railEl.style.opacity = on ? "1" : "0.28";
        }
      });

      // Which scene owns the panel right now.
      const idx = clamp(Math.floor(g), 0, worldScenes.length - 1);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
      stage.style.backgroundColor = worldScenes[idx].bg;

      // Facts arrive one by one as the camera settles into the scene.
      const local = g - idx;
      factRefs.current.forEach((factEl, fi) => {
        if (!factEl) return;
        const at = FACT_AT[fi] ?? 0.5;
        const v = reduce ? 1 : smooth(clamp((local - at) / 0.16, 0, 1));
        factEl.style.opacity = String(v);
        factEl.style.transform = `translate3d(0, ${((1 - v) * 12).toFixed(1)}px, 0)`;
      });

      if (hintRef.current) {
        hintRef.current.style.opacity = String(clamp(1 - p * 16, 0, 1));
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    // `?scene=3` opens partway in. Deferred so the router's own scroll
    // restoration has already run.
    const requested = Number(new URLSearchParams(window.location.search).get("scene"));
    let jump = 0;
    if (Number.isFinite(requested) && requested >= 1 && requested <= worldScenes.length) {
      jump = requestAnimationFrame(() => {
        jump = requestAnimationFrame(() => {
          const travel = host.offsetHeight - window.innerHeight;
          window.scrollTo({
            top: host.offsetTop + ((requested - 0.5) / worldScenes.length) * travel,
            behavior: "instant",
          });
          render();
        });
      });
    }

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (jump) cancelAnimationFrame(jump);
    };
  }, []);

  // Re-run the fact stagger against the new panel's elements.
  useEffect(() => {
    factRefs.current = factRefs.current.slice(0, worldCopy[active].facts.length);
  }, [active]);

  const copy = worldCopy[active];
  const accent = worldScenes[active].accent;
  const isLast = active === worldScenes.length - 1;

  return (
    <div
      ref={hostRef}
      className="relative h-[var(--sw-h-mobile)] lg:h-[var(--sw-h)]"
      style={
        {
          "--sw-h-mobile": `${worldScenes.length * SCENE_VH_MOBILE * 100}svh`,
          "--sw-h": `${worldScenes.length * SCENE_VH * 100}vh`,
        } as React.CSSProperties
      }
    >
      <div
        ref={stageRef}
        // h-screen is the fallback; dvh keeps the frame matched to the visible
        // viewport as a phone's URL bar collapses, instead of clipping.
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-500 [height:100dvh]"
        style={{ backgroundColor: worldScenes[0].bg }}
      >
        {/* ── The models. Full-bleed; the model layers themselves shift right
               of the reading panel, so the backdrop has no visible edge. ── */}
        <div className="absolute inset-0">
          {worldScenes.map((scene, i) => {
            const { Far, Mid, Near } = scene;
            layerRefs.current[i] = layerRefs.current[i] || [];
            return (
              <div
                key={scene.id}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ opacity: 0 }}
              >
                {[Far, Mid, Near].map((LayerComp, li) => (
                  <div
                    key={li}
                    ref={(el) => {
                      layerRefs.current[i][li] = el;
                    }}
                    // No will-change: fifteen permanently-promoted layers is a
                    // lot of GPU memory on a phone, and translate3d already
                    // promotes the ones actually moving.
                    className="absolute inset-0"
                    style={{ transformOrigin: "50% 50%" }}
                  >
                    <LayerComp />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* ── The reading panel. Always paper, so contrast never depends
               on what the art happens to be doing behind it. ── */}
        <aside className="pointer-events-none absolute inset-x-3 bottom-3 z-40 sm:inset-x-6 sm:bottom-6 lg:inset-x-auto lg:left-8 lg:top-1/2 lg:w-[24rem] lg:-translate-y-1/2 xl:left-12 xl:w-[26rem]">
          <div
            key={active}
            // No internal scroller on phones: a swipe that starts on the card
            // has to move the world, not the card. Solid background rather than
            // a blur, which is expensive to repaint over moving art.
            className="animate-slide-up pointer-events-auto rounded-card border border-temple-100 bg-cream-50 p-4 pb-14 shadow-lift sm:p-6 sm:pb-14 lg:bg-cream-50/97 lg:p-7 lg:pb-7 lg:backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className="text-eyebrow font-semibold uppercase"
                style={{ color: accent }}
              >
                {copy.eyebrow[locale]}
              </span>
              <span className="shrink-0 font-mono text-xs text-temple-400">
                {String(active + 1).padStart(2, "0")}
                <span className="mx-1 text-temple-200">/</span>
                {String(worldScenes.length).padStart(2, "0")}
              </span>
            </div>

            <h2 className="mt-2.5 font-heading text-xl leading-tight text-temple-900 sm:mt-3 sm:text-2xl lg:text-[1.75rem]">
              {copy.title[locale]}
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-temple-600 sm:mt-3 sm:text-[0.9375rem] lg:text-base">
              {copy.body[locale]}
            </p>

            <ul className="mt-4 space-y-2 border-t border-temple-100 pt-3 sm:mt-5 sm:space-y-2.5 sm:pt-4">
              {copy.facts.map((fact, fi) => (
                <li
                  key={`${active}-${fi}`}
                  ref={(el) => {
                    factRefs.current[fi] = el;
                  }}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
                  style={{ opacity: 0 }}
                >
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-temple-400">
                    {fact.label[locale]}
                  </span>
                  <span className="text-sm font-semibold text-temple-800">
                    {fact.value[locale]}
                  </span>
                </li>
              ))}
            </ul>

            {isLast && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link href="/yatra" className="btn-primary !px-5 !py-3 !text-sm">
                  <Headphones className="h-4 w-4" />
                  {worldUI.walks[locale]}
                </Link>
                <Link href="/dates" className="btn-secondary !px-5 !py-3 !text-sm">
                  {worldUI.dates[locale]}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* ── Progress rail ── */}
        <div className="absolute left-1/2 top-20 z-30 flex -translate-x-1/2 gap-2 lg:left-auto lg:right-10 lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2 lg:flex-col">
          {worldScenes.map((scene, i) => (
            <span
              key={`rail-${scene.id}`}
              ref={(el) => {
                railRefs.current[i] = el;
              }}
              className="block h-1 w-8 rounded-full transition-opacity duration-300 lg:h-8 lg:w-1"
              style={{ backgroundColor: scene.accent }}
            />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 top-32 z-30 flex flex-col items-center gap-1.5 text-temple-500 lg:top-auto lg:bottom-8"
        >
          <span className="text-eyebrow font-semibold uppercase">
            {worldUI.hint[locale]}
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
