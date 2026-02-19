export default function SchemaMarkup() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Nashik Kumbh Mela 2027 (Simhastha)",
    alternateName: ["नाशिक कुंभमेळा २०२७", "नाशिक कुंभ मेला 2027", "Simhastha Kumbh Nashik"],
    description:
      "Nashik Kumbh Mela 2027 is one of Hinduism's most sacred festivals, held every 12 years at the banks of the holy Godavari River in Nashik, Maharashtra. Millions of devotees, sadhus, and pilgrims gather for sacred baths (Shahi Snan) believed to cleanse sins and lead to moksha. The event features grand Akhada processions, spiritual discourses, yoga camps, and cultural performances.",
    startDate: "2027-08-20",
    endDate: "2027-10-17",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Godavari Ghats, Nashik",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ram Kund, Panchavati",
        addressLocality: "Nashik",
        addressRegion: "Maharashtra",
        postalCode: "422003",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "20.0063",
        longitude: "73.7910",
      },
    },
    image: "https://thenashikkumbh.com/images/og-image.svg",
    organizer: {
      "@type": "Organization",
      name: "Nashik Kumbh Mela Administration",
      url: "https://thenashikkumbh.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: "Free entry for all devotees and pilgrims",
    },
    performer: {
      "@type": "PerformingGroup",
      name: "Various Akhadas, Saints & Spiritual Leaders",
    },
    keywords:
      "Kumbh Mela, Nashik, Simhastha, Godavari, Hindu pilgrimage, Shahi Snan, sacred bath, कुंभ मेला, नाशिक, सिंहस्थ, शाही स्नान",
    inLanguage: ["en", "hi", "mr"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Nashik Kumbh",
    alternateName: "नाशिक कुंभमेळा",
    url: "https://thenashikkumbh.com",
    description:
      "Complete guide to Nashik Kumbh Mela 2027 - sacred dates, ghats, pilgrim tips, events, akhadas, and spiritual heritage. Available in English, Hindi, and Marathi.",
    inLanguage: ["en", "hi", "mr"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://thenashikkumbh.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thenashikkumbh.com" },
      { "@type": "ListItem", position: 2, name: "About Kumbh Mela", item: "https://thenashikkumbh.com/about" },
      { "@type": "ListItem", position: 3, name: "Sacred Ghats", item: "https://thenashikkumbh.com/ghats" },
      { "@type": "ListItem", position: 4, name: "Important Dates", item: "https://thenashikkumbh.com/dates" },
      { "@type": "ListItem", position: 5, name: "Pilgrim Guide", item: "https://thenashikkumbh.com/guide" },
      { "@type": "ListItem", position: 6, name: "Events & Akhadas", item: "https://thenashikkumbh.com/events" },
      { "@type": "ListItem", position: 7, name: "Gallery", item: "https://thenashikkumbh.com/gallery" },
    ],
  };

  // FAQ Schema - critical for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Nashik Kumbh Mela 2027?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nashik Kumbh Mela 2027 (also called Simhastha) is one of the four Kumbh Melas held in India, taking place at the banks of the sacred Godavari River in Nashik, Maharashtra. It occurs every 12 years when Jupiter enters the zodiac sign of Leo (Simha Rashi). Millions of Hindu devotees, sadhus, and pilgrims gather for sacred baths (Shahi Snan) believed to wash away sins and lead to moksha (spiritual liberation).",
        },
      },
      {
        "@type": "Question",
        name: "When are the Shahi Snan dates for Nashik Kumbh Mela 2027?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The five main Shahi Snan (Royal Bath) dates for Nashik Kumbh Mela 2027 are: August 20 (Shravan Purnima), September 3 (Bhadrapad Amavasya), September 17 (Bhadrapad Purnima), October 2 (Ashwin Amavasya/Mahalaya), and October 17 (Ashwin Purnima/Sharad Purnima). These dates are considered the most auspicious for sacred bathing in the Godavari River.",
        },
      },
      {
        "@type": "Question",
        name: "How to reach Nashik for Kumbh Mela?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nashik is well-connected by all modes of transport. By Train: Nashik Road Railway Station (NK) has direct trains from Mumbai, Delhi, Pune, and other major cities. By Air: The nearest international airport is Mumbai CSIA (170km, ~3 hours by road). By Road: Nashik is on NH-3, about 3-4 hours from Mumbai via the Mumbai-Agra Highway.",
        },
      },
      {
        "@type": "Question",
        name: "What are the main ghats at Nashik Kumbh Mela?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The four main ghats are: Ram Kund (the holiest ghat where Lord Rama bathed), Godavari Ghats (the chain of steps along the sacred river where Shahi Snan takes place), Kapaleshwar Temple & Ghat (ancient Shiva sanctum), and Panchavati (sacred grove where Rama lived during exile, home to Kalaram Temple and Sita Gufa).",
        },
      },
      {
        "@type": "Question",
        name: "Is Nashik Kumbh Mela free to attend?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Nashik Kumbh Mela is completely free to attend. There is no entry fee. The sacred bathing at all ghats is free. Many akhadas and religious organizations also provide free food (bhandara/langar), free accommodation in tent cities, and free medical services during the Kumbh Mela period.",
        },
      },
      {
        "@type": "Question",
        name: "What should I carry to Kumbh Mela?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Essential items include: valid ID proof (Aadhaar/Passport), comfortable cotton clothes, towel, water bottle, personal medications, sufficient cash, mobile phone with power bank, comfortable walking shoes, umbrella/raincoat (monsoon season), sacred items like flowers and incense for puja, and a reusable bag.",
        },
      },
    ],
  };

  // Organization schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Nashik Kumbh",
    url: "https://thenashikkumbh.com",
    logo: "https://thenashikkumbh.com/images/logo.svg",
    sameAs: [
      "https://facebook.com/thenashikkumbh",
      "https://instagram.com/thenashikkumbh",
      "https://youtube.com/@thenashikkumbh",
      "https://twitter.com/thenashikkumbh",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9999999999",
      contactType: "customer service",
      email: "info@thenashikkumbh.com",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
    </>
  );
}
