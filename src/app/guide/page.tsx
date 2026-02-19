"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Train,
  Plane,
  Car,
  Hotel,
  Tent,
  Home,
  Building2,
  CheckCircle,
  XCircle,
  ShieldCheck,
  CloudRain,
  Phone,
  Stethoscope,
  Smartphone,
  Wallet,
  ArrowRight,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ───────────────────────────── data ───────────────────────────── */

const quickNavItems = [
  { labelKey: translations.guidePage.navHowToReach, href: "#how-to-reach" },
  { labelKey: translations.guidePage.navAccommodation, href: "#accommodation" },
  { labelKey: translations.guidePage.navWhatToCarry, href: "#what-to-carry" },
  { labelKey: translations.guidePage.navDosAndDonts, href: "#dos-and-donts" },
  { labelKey: translations.guidePage.navEssentialTips, href: "#essential-tips" },
];

const transportModes = [
  {
    Icon: Train,
    titleKey: translations.guidePage.byTrain,
    descKey: translations.guidePage.byTrainDesc,
    details: [
      "Mumbai CSMT to Nashik Road: Panchvati Express, Godavari Express (~3.5 hrs)",
      "Pune to Nashik Road: multiple daily trains (~4.5 hrs)",
      "Delhi to Nashik Road: Rajdhani connection via Mumbai, or direct trains (~18-20 hrs)",
      "Hyderabad to Nashik Road: direct trains (~12 hrs)",
    ],
    tip: "During Kumbh, special trains are run by Indian Railways. Book well in advance as demand is extremely high.",
  },
  {
    Icon: Plane,
    titleKey: translations.guidePage.byAir,
    descKey: translations.guidePage.byAirDesc,
    details: [
      "Ozar Airport, Nashik (ISK): limited flights from Delhi, Hyderabad, Bengaluru",
      "Mumbai CSIA (BOM): 170 km, well-connected internationally and domestically",
      "Pune Airport (PNQ): 210 km, good domestic connectivity",
    ],
    tip: "From Mumbai airport, pre-book a private cab or take the comfortable Volvo bus service to Nashik (~3-4 hours).",
  },
  {
    Icon: Car,
    titleKey: translations.guidePage.byRoad,
    descKey: translations.guidePage.byRoadDesc,
    details: [
      "Mumbai to Nashik via NH-3: approximately 170 km (3-4 hours by car)",
      "Pune to Nashik via NH-60: approximately 210 km (4-5 hours)",
      "MSRTC (Maharashtra State) buses run every 15-30 minutes from Mumbai and Pune",
      "Private operators: Neeta, Purple, CitiLinq offer Volvo/AC coaches",
    ],
    tip: "During Kumbh, special parking zones are set up outside the city. Use the shuttle buses provided to reach the ghats.",
  },
];

const accommodationTypes = [
  {
    Icon: Hotel,
    titleKey: translations.guidePage.hotels,
    description:
      "Nashik has a range of hotels from luxury to budget. Areas like College Road, Panchavati, and Trimbak Road offer easy ghat access.",
    priceRange: "Rs 800 - Rs 8,000+ per night",
    tip: "Book 3-6 months in advance for Kumbh period. Prices rise significantly during Shahi Snan days.",
  },
  {
    Icon: Home,
    titleKey: translations.guidePage.dharamshalas,
    description:
      "Temple trusts and religious organizations operate dharamshalas (pilgrim rest houses) offering basic but clean rooms at nominal charges.",
    priceRange: "Rs 100 - Rs 500 per night",
    tip: "Availability is first-come-first-served. Arrive early in the day or contact the trust office in advance.",
  },
  {
    Icon: Building2,
    titleKey: translations.guidePage.ashrams,
    description:
      "Several ashrams in and around Nashik welcome pilgrims during Kumbh. Stay includes meals, satsang, and a deeply spiritual atmosphere.",
    priceRange: "Donation-based to Rs 300 per night",
    tip: "Some ashrams require prior registration. Check with the ashram's official contact for Kumbh arrangements.",
  },
  {
    Icon: Tent,
    titleKey: translations.guidePage.tentCities,
    description:
      "The government and private operators set up large tent cities with basic amenities including cots, shared bathrooms, and security.",
    priceRange: "Rs 200 - Rs 2,000 per night",
    tip: "Government tent cities are subsidized. Many Akhada camps also offer free accommodation to devotees.",
  },
];

const carryItems = [
  "Valid identity documents (Aadhaar, Passport, etc.)",
  "Comfortable cotton clothes (white/light-colored preferred)",
  "Extra set of dry clothes for after bathing",
  "Towel and basic toiletries",
  "Reusable water bottle (stay hydrated!)",
  "Prescription medications and basic first-aid",
  "Sufficient cash (ATMs may be crowded or run out)",
  "Mobile charger and power bank",
  "Comfortable walking footwear (you will walk a lot)",
  "Umbrella or raincoat (monsoon season)",
  "Sacred items: flowers, incense, camphor, coconut",
  "Reusable bag for offerings and personal belongings",
  "Sunscreen and a hat for daytime outings",
  "A small lock for luggage security",
];

const dos = [
  "Respect local customs, traditions, and religious sentiments",
  "Carry a valid government-issued photo ID at all times",
  "Stay hydrated and eat at hygienic stalls only",
  "Follow crowd management directions and designated routes",
  "Keep valuables safe; use money belts or inner pockets",
  "Use only designated bathing ghats for your safety",
  "Attend the mesmerizing evening aarti at the Godavari",
  "Try local prasad, sabudana khichdi, and Nashik delicacies",
  "Maintain cleanliness at the ghats and temple premises",
  "Keep your group together and set a meeting point",
];

const donts = [
  "Don't litter at ghats, rivers, or temple premises",
  "Don't wear leather items (belts, bags) near temples",
  "Don't photograph sadhus without their permission",
  "Don't carry or consume alcohol anywhere in the Kumbh area",
  "Avoid non-vegetarian food near sacred areas",
  "Don't swim in deep or restricted areas of the river",
  "Don't block procession routes; stand at designated spots",
  "Don't leave children unattended in crowded areas",
  "Don't use plastic bags; use cloth or jute alternatives",
  "Don't engage with unauthorized guides or touts",
];

const essentialTips = [
  {
    Icon: CloudRain,
    titleKey: translations.guidePage.weatherTitle,
    color: "#60A5FA",
    content:
      "Nashik Kumbh falls during the monsoon and early autumn months (August\u2013October). Expect warm, humid conditions with frequent rainfall. Temperatures range from 22\u00B0C to 33\u00B0C. Carry rain gear, quick-dry clothing, and waterproof bags for electronics.",
  },
  {
    Icon: Phone,
    titleKey: translations.guidePage.emergencyTitle,
    color: "#F87171",
    contacts: [
      { label: "Kumbh Mela Helpline", number: "1800-XXX-XXXX (toll free)" },
      { label: "Police Control Room", number: "0253-2305555" },
      { label: "Ambulance", number: "108" },
      { label: "Fire Brigade", number: "101" },
      { label: "Women Helpline", number: "1091" },
      { label: "Disaster Management", number: "0253-2571202" },
    ],
  },
  {
    Icon: Stethoscope,
    titleKey: translations.guidePage.medicalTitle,
    color: "#34D399",
    content:
      "The Kumbh Mela administration sets up temporary medical camps and first-aid centers at every major ghat and along procession routes. Nashik also has well-equipped hospitals including Nashik Civil Hospital, Wockhardt Hospital, and Bytco Hospital.",
  },
  {
    Icon: Smartphone,
    titleKey: translations.guidePage.mobileTitle,
    color: "#A78BFA",
    content:
      "During peak Shahi Snan days, mobile networks can become heavily congested. Pre-download offline maps of Nashik and the ghat areas. Save important contacts as physical notes. Jio and Airtel generally have the best coverage.",
  },
  {
    Icon: Wallet,
    titleKey: translations.guidePage.moneyTitle,
    color: "#FBBF24",
    content:
      "Carry sufficient cash in small denominations (Rs 10, 20, 50, 100 notes). ATMs near the ghats may run out of cash or have very long queues. UPI payments are widely accepted at shops and larger stalls, but small vendors require cash.",
  },
  {
    Icon: ShieldCheck,
    titleKey: translations.guidePage.generalSafetyTitle,
    color: "#D4A843",
    content:
      "Set a meeting point with your group in case you get separated. Wear comfortable, non-slippery footwear \u2014 ghat steps can be wet and slippery. Avoid carrying large bags or expensive jewelry. Use the lost-and-found centers set up by the administration.",
  },
];

/* ───────────────────────────── page ───────────────────────────── */

export default function PilgrimGuidePage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = quickNavItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>


      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <span
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#D4A843", textShadow: "0 0 30px rgba(212,168,67,0.4)" }}
            aria-hidden="true"
          >
            तीर्थ यात्रा
          </span>

          <h1
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(translations.guidePage.heroTitle)}
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(translations.guidePage.heroSubtitle)}
          </p>

          <div
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ═══════════════════ QUICK NAVIGATION ═══════════════════ */}
      <nav
        className="sticky top-16 z-40 border-b lg:top-20"
        style={{
          background: "rgba(13,9,6,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(212,168,67,0.12)",
        }}
      >
        <div className="section-container">
          <div className="scrollbar-hide flex gap-1 overflow-x-auto py-3">
            {quickNavItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #D4A843, #B8922D)",
                          color: "#0D0906",
                          boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                        }
                      : {
                          color: "rgba(212,168,67,0.6)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "#D4A843";
                      (e.target as HTMLElement).style.background = "rgba(212,168,67,0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "rgba(212,168,67,0.6)";
                      (e.target as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {t(item.labelKey)}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HOW TO REACH ═══════════════════ */}
      <section id="how-to-reach" className="section-dark relative scroll-mt-32 py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.howToReachTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-cream-300/60">
              {t(translations.guidePage.howToReachDesc)}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {transportModes.map((mode) => (
              <div
                key={t(mode.titleKey)}
                className="card-glass flex flex-col p-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(212,168,67,0.1)",
                }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(212,168,67,0.1)" }}
                >
                  <mode.Icon className="h-7 w-7" style={{ color: "#D4A843" }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-cream-100">
                  {t(mode.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-300/60">
                  {t(mode.descKey)}
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {mode.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-cream-300/60"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#D4A843" }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-5 rounded-xl p-3"
                  style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.1)" }}
                >
                  <p className="text-xs font-semibold" style={{ color: "#D4A843" }}>
                    {t(translations.guidePage.tip)} <span className="font-normal text-cream-300/60">{mode.tip}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ACCOMMODATION ═══════════════════ */}
      <section
        id="accommodation"
        className="relative scroll-mt-32 bg-cream-50 py-16 md:py-24"
      >
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.whereToStay)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-temple-500">
              {t(translations.guidePage.whereToStayDesc)}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {accommodationTypes.map((acc) => (
              <div
                key={t(acc.titleKey)}
                className="card-glass flex flex-col p-6"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "rgba(212,168,67,0.1)" }}
                >
                  <acc.Icon className="h-6 w-6" style={{ color: "#D4A843" }} />
                </div>
                <h3 className="font-heading text-lg font-bold text-temple-800">
                  {t(acc.titleKey)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-temple-600">
                  {acc.description}
                </p>
                <div
                  className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.15)" }}
                >
                  <Wallet className="h-4 w-4" style={{ color: "#D4A843" }} />
                  <span className="text-xs font-semibold" style={{ color: "#B8922D" }}>
                    {acc.priceRange}
                  </span>
                </div>
                <p className="mt-3 text-xs text-temple-500">
                  <strong>{t(translations.guidePage.tip)}</strong> {acc.tip}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mx-auto mt-10 max-w-2xl rounded-2xl p-6 text-center"
            style={{
              background: "rgba(212,168,67,0.05)",
              border: "1px solid rgba(212,168,67,0.2)",
            }}
          >
            <p className="text-sm leading-relaxed text-temple-600">
              {t(translations.guidePage.akhadaNote)}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHAT TO CARRY ═══════════════════ */}
      <section id="what-to-carry" className="section-dark relative scroll-mt-32 py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.whatToCarryTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-cream-300/60">
              {t(translations.guidePage.whatToCarryDesc)}
            </p>
          </div>

          <div
            className="mx-auto max-w-3xl"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {carryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,168,67,0.1)",
                  }}
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: "#D4A843" }} />
                  <span className="text-sm text-cream-300/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DO'S AND DON'TS ═══════════════════ */}
      <section
        id="dos-and-donts"
        className="relative scroll-mt-32 bg-cream-50 py-16 md:py-24"
      >
        <div className="absolute inset-0 mandala-bg" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.dosAndDontsTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-temple-500">
              {t(translations.guidePage.dosAndDontsDesc)}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Do's Column */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "rgba(34,197,94,0.1)" }}
                >
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-green-600">
                  {t(translations.guidePage.dosLabel)}
                </h3>
              </div>
              <div className="space-y-3">
                {dos.map((item, idx) => (
                  <div
                    key={idx}
                    className="card-glass flex items-start gap-3 p-4"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm text-temple-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Don'ts Column */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "rgba(239,68,68,0.1)" }}
                >
                  <XCircle className="h-6 w-6 text-red-500" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-red-500">
                  {t(translations.guidePage.dontsLabel)}
                </h3>
              </div>
              <div className="space-y-3">
                {donts.map((item, idx) => (
                  <div
                    key={idx}
                    className="card-glass flex items-start gap-3 p-4"
                  >
                    <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    <span className="text-sm text-temple-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ESSENTIAL TIPS ═══════════════════ */}
      <section id="essential-tips" className="section-dark relative scroll-mt-32 py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          <div
            className="mb-16 text-center"
          >
            <h2 className="gradient-text font-heading text-3xl font-bold md:text-4xl">
              {t(translations.guidePage.essentialTipsTitle)}
            </h2>
            <div className="sacred-divider mt-6">
              <span className="om-decoration select-none" aria-hidden="true">
                ॐ
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {essentialTips.map((tip) => (
              <div
                key={t(tip.titleKey)}
                className="card-dark p-8"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${tip.color}15` }}
                >
                  <tip.Icon className="h-7 w-7" style={{ color: tip.color }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-cream-100">
                  {t(tip.titleKey)}
                </h3>
                {"contacts" in tip && tip.contacts ? (
                  <ul className="mt-3 space-y-3">
                    {(tip.contacts as Array<{label: string; number: string}>).map((contact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-cream-300/60">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: tip.color }} />
                        <span>
                          <strong className="text-cream-300/80">{contact.label}:</strong>{" "}
                          {contact.number}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 leading-relaxed text-cream-300/60">
                    {tip.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #0D0906 50%, #1a0a00 100%)",
        }}
      >
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)]" />

        <div
          className="section-container relative z-10 text-center"
        >
          <div className="sacred-divider mx-auto mb-8 max-w-xs">
            <span className="font-devanagari text-sm" style={{ color: "#D4A843" }}>
              ॐ
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-5xl">
            {t(translations.guidePage.ctaHeading)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream-300/70">
            {t(translations.guidePage.ctaDesc)}
          </p>
          <Link
            href="/dates"
            className="btn-gold mt-10 inline-flex items-center gap-2"
          >
            {t(translations.guidePage.ctaButton)}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>


    </>
  );
}
