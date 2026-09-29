/**
 * Site configuration.
 *
 * `whatsapp` and `email` used to hold placeholder values (a nines-only phone
 * number and an info@ address on this domain) that were treated by the schema
 * and footer as real. They are removed. Any operational contact belongs in the
 * content registry at `src/data/verified/index.ts` so it carries a source and
 * a verification date.
 */
export const siteConfig = {
  name: "The Nashik Kumbh",
  domain: "thenashikkumbh.com",
  url: "https://www.thenashikkumbh.com",
  description:
    "An independent public-information initiative for the Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027. Verified dates, guidance and emergency information; official facts attributed to their publishing authority.",
  tagline: "Where Faith Meets Eternity",
  social: {
    facebook: "https://facebook.com/thenashikkumbh",
    instagram: "https://instagram.com/thenashikkumbh",
    youtube: "https://youtube.com/@thenashikkumbh",
    twitter: "https://twitter.com/thenashikkumbh",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Kumbh", href: "/about" },
  { label: "Sacred Ghats", href: "/ghats" },
  { label: "Important Dates", href: "/dates" },
  { label: "Pilgrim Guide", href: "/guide" },
  { label: "Events & Akhadas", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Local Businesses", href: "/businesses" },
];


// Legacy arrays (bathingDates, ghats, akhadas, events, galleryImages) were
// removed on the P0 cleanup. Every schedule, ghat and event is now sourced
// from src/data/verified/index.ts or src/data/siteDataI18n.ts.
