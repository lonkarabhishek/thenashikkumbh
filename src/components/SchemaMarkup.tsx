import { SITE_URL } from "@/lib/seo";
import { OWNER_SAME_AS, SITE_OWNER } from "@/data/siteOwner";

/**
 * Site-wide structured data: the WebSite and its publisher. Event markup is
 * not here: it lives on the home page and /dates only (see EventsSchema).
 *
 * The WebSite schema deliberately omits `potentialAction`/SearchAction:
 * advertising a search endpoint we do not have would misrepresent the site.
 */

/**
 * Only profiles verified to exist. The YouTube and X handles linked earlier
 * returned 404 (14 Oct 2026); Facebook/Instagram pages are unconfirmed.
 */
const SAME_AS: string[] = [];

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
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
    founder: { "@id": `${SITE_URL}/#owner` },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#owner`,
    name: SITE_OWNER.name,
    jobTitle: "Business analyst (GTM analytics)",
    description: SITE_OWNER.bio.en,
    url: `${SITE_URL}/en/about#who-runs-this-site`,
    sameAs: OWNER_SAME_AS,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
