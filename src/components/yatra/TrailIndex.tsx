"use client";

import Link from "@/components/LocaleLink";
import { ArrowRight, Eye, Footprints, Headphones, Radar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { yatraUI } from "@/i18n/yatraTranslations";
import { trails } from "@/data/yatraData";
import { WalkingPilgrim } from "@/components/art/Scenes";
import { BorderStrip, Kalash, Lotus, Trishul } from "@/components/art/Motifs";
import { StopArt } from "@/components/art/StopScenes";

const ACCENT = {
  saffron: { rule: "bg-saffron-500", text: "text-saffron-700", soft: "bg-saffron-50" },
  river: { rule: "bg-river-500", text: "text-river-700", soft: "bg-river-50" },
  indigo: { rule: "bg-indigo-500", text: "text-indigo-700", soft: "bg-indigo-50" },
} as const;

const TRAIL_ICON = {
  panchavati: Lotus,
  trimbak: Kalash,
  akhada: Trishul,
} as const;

export default function TrailIndex() {
  const { t } = useLanguage();

  const steps = [
    { icon: Footprints, title: yatraUI.how1Title, body: yatraUI.how1Body },
    { icon: Radar, title: yatraUI.how2Title, body: yatraUI.how2Body },
    { icon: Eye, title: yatraUI.how3Title, body: yatraUI.how3Body },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream-100 paper-grain">
        <div className="section-container grid gap-12 pt-32 pb-20 sm:pt-36 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">{t(yatraUI.eyebrow)}</span>
            <h1 className="mt-5 text-display-sm text-balance">{t(yatraUI.title)}</h1>
            <p className="mt-6 text-lede text-temple-500">{t(yatraUI.lede)}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#walks" className="btn-primary">
                <Headphones className="h-4 w-4" />
                {t(yatraUI.chooseTrail)}
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-temple-400">
                {trails.reduce((n, tr) => n + tr.stops.length, 0)} {t(yatraUI.stops)} ·{" "}
                {t({ en: "free", hi: "नि:शुल्क", mr: "मोफत" })}
              </span>
            </div>
          </div>

          <WalkingPilgrim className="mx-auto w-full max-w-md" />
        </div>

        <div className="text-gold-500/40">
          <BorderStrip className="h-4 w-full" />
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="section-container section-y">
        <div className="grid gap-10 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div key={i}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-200 text-saffron-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-heading text-2xl text-temple-200">0{i + 1}</span>
              </div>
              <h2 className="mt-5 font-heading text-xl text-temple-900">{t(title)}</h2>
              <p className="mt-2 leading-relaxed text-temple-500">{t(body)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trails ───────────────────────────────────────── */}
      <section id="walks" className="section-paper py-20 sm:py-24">
        <div className="section-container">
          <h2 className="text-title">{t(yatraUI.chooseTrail)}</h2>
          <div className="mt-6 mb-10 h-px w-24 bg-gold-400/60" />

          <div className="grid gap-6 lg:grid-cols-3">
            {trails.map((trail) => {
              const accent = ACCENT[trail.accent];
              const Icon = TRAIL_ICON[trail.id as keyof typeof TRAIL_ICON] ?? Lotus;

              return (
                <Link
                  key={trail.id}
                  href={`/yatra/${trail.id}`}
                  className="card-sacred group flex flex-col overflow-hidden"
                >
                  {/* the first stop stands as the walk's cover */}
                  <span className="relative block aspect-[5/3] w-full overflow-hidden">
                    <StopArt stopId={trail.stops[0].id} className="block h-full w-full" />
                    <span
                      className={`absolute bottom-0 left-0 h-1 w-16 ${accent.rule}`}
                    />
                  </span>

                  <span className="flex flex-1 flex-col p-7">
                  <Icon className={`h-9 w-9 ${accent.text}`} />

                  <h3 className="mt-5 font-heading text-2xl text-temple-900">
                    {t(trail.name)}
                  </h3>
                  <p className="mt-1.5 text-sm text-temple-500">{t(trail.subtitle)}</p>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-temple-500">
                    {t(trail.description)}
                  </p>

                  <dl className="mt-6 flex gap-6 border-t border-temple-100 pt-5 text-sm">
                    {[
                      [trail.stops.length, t(yatraUI.stops)],
                      [trail.totalMinutes, t(yatraUI.minutes)],
                      [trail.distanceKm, t(yatraUI.km)],
                    ].map(([value, label]) => (
                      <div key={String(label)}>
                        <dd className="font-heading text-lg leading-none text-temple-900">
                          {value}
                        </dd>
                        <dt className="mt-1 text-xs font-medium text-temple-400">
                          {label}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  <span
                    className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${accent.text}`}
                  >
                    {t(yatraUI.startWalk)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="mt-10 text-sm text-temple-400">{t(yatraUI.voiceNote)}</p>
        </div>
      </section>
    </>
  );
}
