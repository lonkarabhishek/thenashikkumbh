"use client";

import Link from "@/components/LocaleLink";
import { Clock, Users, ShieldCheck, ArrowRight, Star, Calendar, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import { majorMelaPeriod, schedule, type ScheduleEvent } from "@/data/verified";
import type { Locale } from "@/i18n/translations";
import { DatesFaq, DatesQuickAnswer } from "@/components/DatesAnswers";
import CommonsPhoto from "@/components/photos/CommonsPhoto";
import { formatDate as fmtDate, formatTime as fmtTime, localDigits } from "@/lib/dates";

/* ───────────────────────────── page ─────────────────────────────── */

type Kind = "amrit" | "ceremony" | "procession" | "parva" | "close";

function kindOf(e: ScheduleEvent): Kind {
  if (e.isAmritSnan) return "amrit";
  if (e.id === "nagar-pradakshina") return "procession";
  if (e.id.startsWith("parva")) return "parva";
  if (e.id.startsWith("conclusion")) return "close";
  return "ceremony";
}

const KIND_LABEL: Record<Kind, Record<Locale, string>> = {
  amrit: { en: "Amrit Snan", hi: "अमृत स्नान", mr: "अमृत स्नान" },
  ceremony: { en: "Ceremony", hi: "समारोह", mr: "सोहळा" },
  procession: { en: "Procession", hi: "शोभायात्रा", mr: "मिरवणूक" },
  parva: { en: "Parva days", hi: "पर्व दिवस", mr: "पर्व दिवस" },
  close: { en: "Close", hi: "समापन", mr: "सांगता" },
};

function formatDate(iso: string, locale: Locale) {
  return fmtDate(iso, locale, { weekday: true });
}

function formatTime(hhmm: string, locale: Locale) {
  return fmtTime(hhmm, locale);
}

function rangeText(a: string, b: string, locale: Locale) {
  if (locale === "hi") return `${a} से ${b} तक`;
  if (locale === "mr") return `${a} ते ${b}`;
  return `${a} to ${b}`;
}

const PERIOD_COPY = {
  title: { en: "Major Mela Period", hi: "मुख्य मेला अवधि", mr: "मुख्य मेळा कालावधी" },
  body: {
    en: "The official peak of the mela, when most pilgrims are expected.",
    hi: "मेले का आधिकारिक मुख्य समय, जब सबसे अधिक श्रद्धालु अपेक्षित हैं।",
    mr: "मेळ्याचा अधिकृत मुख्य काळ, जेव्हा सर्वाधिक भाविक अपेक्षित आहेत.",
  },
  days: { en: "days", hi: "दिन", mr: "दिवस" },
};

export default function ImportantDatesPage() {
  const { locale, t } = useLanguage();

  const sortedDates = [...schedule].sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  return (
    <>


      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        {/* Background layers */}
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <span
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#C9A227", textShadow: "0 0 30px rgba(201,162,39,0.4)" }}
            aria-hidden="true"
          >
            पवित्र तिथियाँ
          </span>

          <h1 className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl">
            {t(translations.datesPage.heroTitle)}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl">
            {t(translations.datesPage.heroSubtitle)}
          </p>

          <div className="gold-line-thick mx-auto mt-8 w-48 origin-center" />

          <div className="mt-6 flex items-center justify-center gap-3">
            <Calendar className="h-5 w-5" style={{ color: "#C9A227" }} />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-cream-300/50">
              {t(translations.datesPage.periodLabel)}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════ INTRODUCTION ═══════════════════ */}
      <DatesQuickAnswer />

      <section className="relative bg-cream-50 py-16 md:py-24">
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.datesPage.whySacredTitle)}
            </h2>

            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-temple-600">
              {t(translations.datesPage.whySacredDesc)}
            </p>
            <p className="mt-4 text-base leading-relaxed text-temple-500">
              {t(translations.datesPage.whySacredP2)}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TIMELINE ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.04)_0%,transparent_60%)]" />

        <div className="section-container relative z-10">
          <div className="mb-16 text-center">
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.datesPage.scheduleTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-cream-300/60">
              {t(translations.datesPage.scheduleDesc)}
            </p>
          </div>

          {/* -- major mela period -- */}
          <div className="card-dark mx-auto mb-14 max-w-2xl p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#C9A227" }}>
              {t(PERIOD_COPY.title)}
            </p>
            <p className="mt-2 font-heading text-xl text-cream-100">
              {rangeText(formatDate(majorMelaPeriod.startIso, locale), formatDate(majorMelaPeriod.endIso, locale), locale)}
            </p>
            <p className="mt-1 text-sm text-cream-300/70">
              {localDigits(String(majorMelaPeriod.days), locale)} {t(PERIOD_COPY.days)} · {t(PERIOD_COPY.body)}
            </p>
          </div>

          {/* -- vertical timeline -- */}
          <div className="relative">
            {/* center line -- desktop; left line -- mobile */}
            <div
              aria-hidden="true"
              className="absolute left-4 top-0 h-full w-0.5 origin-top md:left-1/2 md:-translate-x-1/2"
              style={{
                background: "linear-gradient(180deg, transparent, #C9A227, #C9A227, transparent)",
              }}
            />

            <div className="space-y-12 md:space-y-16">
              {sortedDates.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const isMajor = item.isAmritSnan;
                const kind = kindOf(item);

                return (
                  <div
                    key={item.id}
                    className="relative"
                  >
                    {/* -- node / circle -- */}
                    <div
                      className={`absolute left-4 z-10 -translate-x-1/2 md:left-1/2 ${
                        isMajor ? "-mt-1" : "mt-0.5"
                      }`}
                    >
                      {isMajor ? (
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg md:h-12 md:w-12"
                          style={{
                            background: "linear-gradient(135deg, #C9A227, #DFCC78)",
                            boxShadow: "0 0 30px rgba(201,162,39,0.4), 0 0 60px rgba(201,162,39,0.15)",
                          }}
                        >
                          <Star className="h-5 w-5 text-[#0B1220] md:h-6 md:w-6" />
                        </span>
                      ) : (
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7"
                          style={{
                            background: "#C9A227",
                            boxShadow: "0 0 15px rgba(201,162,39,0.3)",
                          }}
                        />
                      )}
                    </div>

                    {/* -- card -- */}
                    <div
                      className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${
                        isLeft
                          ? "md:mr-auto md:pr-0"
                          : "md:ml-auto md:pl-0"
                      }`}
                    >
                      <div
                        className={`card-dark group relative p-6 transition-transform hover:-translate-y-1 md:p-8 ${
                          isMajor
                            ? "border-l-4"
                            : ""
                        }`}
                        style={isMajor ? { borderLeftColor: "#C9A227" } : {}}
                      >
                        <span
                          className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs uppercase tracking-widest ${isMajor ? "font-bold" : "font-medium"}`}
                          style={{
                            background: isMajor
                              ? "linear-gradient(135deg, rgba(201,162,39,0.2), rgba(201,162,39,0.08))"
                              : "rgba(201,162,39,0.08)",
                            color: isMajor ? "#C9A227" : "rgba(201,162,39,0.7)",
                            border: `1px solid rgba(201,162,39,${isMajor ? 0.3 : 0.15})`,
                          }}
                        >
                          {isMajor && <Sparkles className="h-3 w-3" />}
                          {t(KIND_LABEL[kind])}
                        </span>

                        <p
                          className="font-heading text-xl font-bold md:text-2xl"
                          style={{ color: "#C9A227" }}
                        >
                          {formatDate(item.isoDate, locale)}
                          {item.startTime && (
                            <span className="ml-2 text-base font-semibold text-cream-300/70">
                              {formatTime(item.startTime, locale)}
                            </span>
                          )}
                        </p>

                        <h3 className="mt-2 font-heading text-lg font-bold text-cream-100 md:text-xl">
                          {t(item.name)}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-cream-300/50">
                          {item.tithi ? `${t(item.tithi)} · ${t(item.location)}` : t(item.location)}
                        </p>

                        {item.significance && (
                          <p className="mt-3 text-base leading-relaxed text-cream-300/70">
                            {t(item.significance)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ADDITIONAL INFO ═══════════════════ */}
      <section className="relative bg-cream-50 py-16 md:py-24">
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <div className="mb-16 text-center">
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.datesPage.goodToKnow)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                Icon: Clock,
                title: translations.datesPage.bestTimesTitle,
                text: translations.datesPage.bestTimesDesc,
              },
              {
                Icon: Users,
                title: translations.datesPage.shahiSnanTitle,
                text: translations.datesPage.shahiSnanDesc,
              },
              {
                Icon: ShieldCheck,
                title: translations.datesPage.safetyTitle,
                text: translations.datesPage.safetyDesc,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="card-glass p-8"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(201,162,39,0.1)" }}
                >
                  <card.Icon className="h-7 w-7" style={{ color: "#C9A227" }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-temple-800">
                  {t(card.title)}
                </h3>
                <p className="mt-3 leading-relaxed text-temple-600">
                  {t(card.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <div className="section-container mx-auto max-w-3xl">
        <CommonsPhoto id={28} className="mt-12" />
      </div>
      <DatesFaq />

      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #0B1220 50%, #1a0a00 100%)",
        }}
      >
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.06)_0%,transparent_70%)]" />

        <div className="section-container relative z-10 text-center">
          <div className="sacred-divider mx-auto mb-8 max-w-xs">
            <span className="font-devanagari text-sm" style={{ color: "#C9A227" }}>
              ॐ
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-5xl">
            {t(translations.datesPage.ctaHeading)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream-300/70">
            {t(translations.datesPage.ctaDesc)}
          </p>
          <Link
            href="/guide"
            className="btn-gold mt-10 inline-flex items-center gap-2"
          >
            {t(translations.datesPage.ctaButton)}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>


    </>
  );
}
