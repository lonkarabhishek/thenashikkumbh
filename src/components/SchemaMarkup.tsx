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
      {
        "@type": "Question",
        name: "Who are the Naga Sadhus at Kumbh Mela?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Naga Sadhus are warrior-monks of the Hindu tradition who have renounced worldly life. They are known for their ash-smeared bodies and role as protectors of Hindu dharma. At Kumbh Mela, Naga Sadhus lead the grand Shahi Snan processions. They belong to Akhada orders such as Juna Akhada, Niranjani Akhada, and Mahanirvani Akhada. There are 13 recognized Akhadas in total.",
        },
      },
      {
        "@type": "Question",
        name: "What is the significance of bathing in the Godavari River during Kumbh Mela?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Godavari River is called Dakshin Ganga (Ganga of the South) and is one of the holiest rivers in Hinduism. During Kumbh Mela, bathing in the Godavari at Nashik is believed to wash away sins and help the soul achieve moksha (spiritual liberation). The planetary alignment of Jupiter in Leo (Simha Rashi) is said to charge the river waters with divine energy during the Kumbh period.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I stay during Nashik Kumbh Mela 2027?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pilgrims visiting Nashik Kumbh Mela 2027 have several accommodation options. These include hotels and guesthouses in Nashik city, dharamshalas (pilgrim rest houses) near the ghats, government-organized tent cities along the Godavari, Akhada camps that offer free accommodation to devotees, and private homestays. Booking early is strongly recommended as rooms fill up months before the main Shahi Snan dates.",
        },
      },
      {
        "@type": "Question",
        name: "What is the history of Kumbh Mela at Nashik?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kumbh Mela at Nashik dates back thousands of years to the legend of Samudra Manthan (churning of the ocean). When gods and demons churned the cosmic ocean, a pot (kumbh) of Amrit (nectar of immortality) emerged. During a 12-day celestial battle, drops of Amrit fell at four places on earth: Nashik, Prayagraj, Haridwar, and Ujjain. Nashik is where the Godavari River became sacred, and the Kumbh is held here every 12 years when Jupiter enters Leo.",
        },
      },
      {
        "@type": "Question",
        name: "How many visitors are expected at Nashik Kumbh Mela 2027?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nashik Kumbh Mela 2027 is expected to receive between 15 and 20 crore (150 to 200 million) visitors over its duration. The Maharashtra government has sanctioned Rs 25,055 crore for infrastructure and preparations. Key developments include a 91-kilometer ring road, AI-powered crowd management, 5G connectivity across the Kumbh zone, and extensive healthcare and sanitation facilities.",
        },
      },
      {
        "@type": "Question",
        name: "What are the main events and rituals at Nashik Kumbh Mela?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The main events at Nashik Kumbh Mela include Shahi Snan (Royal Bath) processions led by Naga Sadhus and Akhadas, spiritual discourses (satsangs) by saints, Ganga Aarti at the Godavari ghats, yoga camps and meditation sessions, cultural performances including devotional music, and Bhandara (free community meals) organized by various Akhadas and religious groups.",
        },
      },
      {
        "@type": "Question",
        name: "Is Nashik Kumbh Mela safe for solo travelers and families?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Nashik Kumbh Mela is generally safe for solo travelers and families. The 2027 edition will feature AI-powered CCTV surveillance across all major areas, a dedicated Kumbh War Room for emergency response, mobile hospitals and trauma centers, free Wi-Fi and a Kumbh mobile app for navigation, and a large police deployment. Pilgrims should keep ID proof, stay hydrated, follow official crowd guidelines, and keep children close during peak bathing hours.",
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
