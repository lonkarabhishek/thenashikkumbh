import JsonLd from "@/components/JsonLd";
import { offices, schedule, type ScheduleEvent } from "@/data/verified";
import { SITE_URL } from "@/lib/seo";

/**
 * One schema.org Event per Amrit Snan day and for Dhwajarohan, built from the
 * verified schedule. Used on the home page and /dates only.
 */

const RAMKUND = {
  "@type": "Place",
  name: "Ramkund, Panchavati",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

const KUSHAVARTA = {
  "@type": "Place",
  name: "Kushavarta Tirth",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Trimbakeshwar",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

function placesFor(e: ScheduleEvent) {
  if (e.id === "amrit-snan-3-nashik") return RAMKUND;
  if (e.id === "amrit-snan-3-trimbak") return KUSHAVARTA;
  return [RAMKUND, KUSHAVARTA];
}

const ntkma = offices.find((o) => o.id === "ntkma");

export default function EventsSchema() {
  const events = schedule
    .filter((e) => e.isAmritSnan || e.id === "dhwajarohan")
    .map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `${e.name.en}, Nashik–Trimbakeshwar Simhastha Kumbh Mela`,
      description: e.significance?.en ?? e.name.en,
      startDate: e.startTime ? `${e.isoDate}T${e.startTime}:00+05:30` : e.isoDate,
      ...(e.startTime ? {} : { endDate: e.isoDate }),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: placesFor(e),
      image: [`${SITE_URL}/images/og-image.jpg`],
      organizer: {
        "@type": "Organization",
        name: ntkma?.name.en ?? "Nashik–Trimbakeshwar Kumbh Mela Authority",
        url: "https://divcomnashik.maharashtra.gov.in/en/simhastha-kumbh-mela-2027/",
      },
      isAccessibleForFree: true,
      inLanguage: ["mr", "hi", "en"],
      url: `${SITE_URL}/en/dates`,
    }));

  return (
    <>
      {events.map((ev) => (
        <JsonLd key={ev.startDate} data={ev} />
      ))}
    </>
  );
}
