import { offices, schedule } from "@/data/verified";

/**
 * Structured data for the site.
 *
 * Rebuilt against the content registry. The previous version claimed a
 * Nashik–Trimbakeshwar Kumbh Mela Administration organiser and a
 * `+91-9999999999` contact — both fabricated. The Event schema now uses only
 * fields sourced from the DGIPR schedule, with `startDate`/`endDate` derived
 * from the registry so a schedule change updates the schema automatically.
 *
 * The FAQ schema, which asserted "AI-powered CCTV surveillance" and a
 * "dedicated Kumbh War Room" as facts, has been removed until those claims can
 * be sourced to an authority page.
 */

const first = schedule.find((e) => e.id === "dhwajarohan");
const last = schedule.find((e) => e.id === "conclusion");
const ntkma = offices.find((o) => o.id === "ntkma");

export default function SchemaMarkup() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027",
    alternateName: [
      "नाशिक कुंभमेळा २०२७",
      "नाशिक कुंभ मेला 2027",
      "Simhastha Kumbh Nashik",
    ],
    description:
      "The Simhastha Kumbh Mela at Nashik and Trimbakeshwar, held once in twelve years when Jupiter enters Leo. Formally opened at Ram Kund with Dhwajarohan on 31 October 2026; three Amrit Snans in August and September 2027; concludes 24 July 2028.",
    startDate: first?.isoDate ?? "2026-10-31",
    endDate: last?.isoDate ?? "2028-07-24",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Nashik and Trimbakeshwar",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nashik",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    image: "https://thenashikkumbh.com/images/og-image.svg",
    organizer: {
      "@type": "Organization",
      name: ntkma?.name.en ?? "Nashik–Trimbakeshwar Kumbh Mela Authority",
      url: "https://divcomnashik.maharashtra.gov.in/en/about-nashik-trimbakeshwar-authority/",
      email: ntkma?.email,
      telephone: ntkma?.phone,
    },
    subEvent: schedule
      .filter((e) => e.isAmritSnan)
      .map((e) => ({
        "@type": "Event",
        name: e.name.en,
        startDate: e.isoDate,
        location: {
          "@type": "Place",
          name: e.location.en,
          address: {
            "@type": "PostalAddress",
            addressLocality: e.location.en,
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
        },
      })),
    inLanguage: ["en", "hi", "mr"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Nashik Kumbh",
    url: "https://thenashikkumbh.com",
    inLanguage: ["en", "hi", "mr"],
    publisher: {
      "@type": "Organization",
      name: "The Nashik Kumbh — independent public-information initiative",
    },
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://thenashikkumbh.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
