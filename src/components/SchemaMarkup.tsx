import { SITE_URL } from "@/lib/seo";

/**
 * Site-wide structured data: the WebSite and its publisher. Event markup is
 * not here: it lives on the home page and /dates only (see EventsSchema).
 *
 * The WebSite schema deliberately omits `potentialAction`/SearchAction:
 * advertising a search endpoint we do not have would misrepresent the site.
 */

/** Social profiles linked from the footer. */
const SAME_AS = [
  "https://facebook.com/thenashikkumbh",
  "https://instagram.com/thenashikkumbh",
  "https://youtube.com/@thenashikkumbh",
  "https://twitter.com/thenashikkumbh",
];

export default function SchemaMarkup() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Nashik Kumbh",
    url: SITE_URL,
    inLanguage: ["mr", "hi", "en"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  // Describes this site only; it makes no claim of official status.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "The Nashik Kumbh",
    description:
      "Independent public-information initiative for the Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027. Not an official government website.",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 192, height: 192 },
    sameAs: SAME_AS,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
