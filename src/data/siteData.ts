export const siteConfig = {
  name: "Nashik Kumbh Mela 2027",
  domain: "thenashikkumbh.com",
  url: "https://thenashikkumbh.com",
  description:
    "Official guide to Nashik Kumbh Mela 2027 - sacred bathing dates, ghats, pilgrim guide, events, and spiritual heritage of the Simhastha Kumbh at the holy Godavari River.",
  tagline: "Where Faith Meets Eternity",
  whatsapp: "+919999999999",
  email: "info@thenashikkumbh.com",
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

export const bathingDates = [
  {
    date: "August 20, 2027",
    event: "Pratham Shahi Snan",
    nakshatra: "Shravan Purnima",
    significance:
      "The first royal bath marks the grand opening of Kumbh Mela. Millions gather at the sacred Godavari to cleanse their sins.",
    isMajor: true,
  },
  {
    date: "September 3, 2027",
    event: "Dwitiya Shahi Snan",
    nakshatra: "Bhadrapad Amavasya",
    significance:
      "The second royal bath, observed during the new moon, holds immense spiritual power for moksha seekers.",
    isMajor: true,
  },
  {
    date: "September 17, 2027",
    event: "Tritiya Shahi Snan",
    nakshatra: "Bhadrapad Purnima",
    significance:
      "The third royal bath during the full moon. Akhadas lead grand processions to the ghats.",
    isMajor: true,
  },
  {
    date: "October 2, 2027",
    event: "Chaturtha Shahi Snan",
    nakshatra: "Ashwin Amavasya",
    significance:
      "A deeply auspicious bath coinciding with Mahalaya Amavasya - honoring ancestors and seeking their blessings.",
    isMajor: true,
  },
  {
    date: "October 17, 2027",
    event: "Panchama Shahi Snan",
    nakshatra: "Ashwin Purnima (Sharad Purnima)",
    significance:
      "The concluding royal bath under the luminous Sharad Purnima moon - a night of divine grace.",
    isMajor: true,
  },
  {
    date: "August 25, 2027",
    event: "Parva Snan - Krishna Janmashtami",
    nakshatra: "Shravan Krishna Ashtami",
    significance:
      "Celebrating Lord Krishna's birth with sacred dips and devotional festivities along the river.",
    isMajor: false,
  },
  {
    date: "September 7, 2027",
    event: "Parva Snan - Ganesh Chaturthi",
    nakshatra: "Bhadrapad Shukla Chaturthi",
    significance:
      "Honoring Lord Ganesha, the remover of obstacles. Special pujas and immersion ceremonies.",
    isMajor: false,
  },
  {
    date: "October 12, 2027",
    event: "Parva Snan - Navratri Begins",
    nakshatra: "Ashwin Shukla Pratipada",
    significance:
      "The nine nights of Goddess Durga worship begin. Devotees seek shakti through sacred baths.",
    isMajor: false,
  },
];

export const ghats = [
  {
    id: "ramkund",
    name: "Ram Kund",
    subtitle: "The Holiest Bathing Ghat",
    description:
      "Ram Kund is the most sacred ghat in Nashik, believed to be the exact spot where Lord Rama bathed during his 14-year exile. Hindus consider a dip here equivalent to bathing in all holy rivers. It is also the site for performing asthi visarjan (immersion of ashes) of the departed, granting them moksha.",
    rituals: [
      "Sacred bathing for moksha",
      "Asthi visarjan ceremonies",
      "Daily aarti at dawn and dusk",
      "Pind daan for ancestors",
    ],
    timings: "Open 24 hours (Aarti: 6:00 AM & 7:00 PM)",
    image: "/images/ramkund.webp",
  },
  {
    id: "godavari-ghats",
    name: "Godavari Ghats",
    subtitle: "Steps Along the Sacred River",
    description:
      "The chain of ghats along the Godavari River forms the spiritual spine of Nashik. Known as Dakshin Ganga (Ganga of the South), the Godavari is one of India's seven sacred rivers. The ghats come alive during Kumbh with millions performing holy dips, chanting mantras, and offering prayers.",
    rituals: [
      "Shahi Snan during Kumbh",
      "Evening Ganga Aarti",
      "Sunrise meditation sessions",
      "Devotional kirtans",
    ],
    timings: "Open 24 hours",
    image: "/images/godavari-ghats.webp",
  },
  {
    id: "kapaleshwar",
    name: "Kapaleshwar Temple & Ghat",
    subtitle: "Ancient Shiva Sanctum",
    description:
      "Kapaleshwar Temple is one of Nashik's oldest Shiva temples, dating back centuries. Legend holds that Lord Shiva granted darshan here to absolve a great sin. The adjacent ghat offers serene bathing and is less crowded than Ram Kund, making it ideal for contemplative spiritual practice.",
    rituals: [
      "Shiva abhishekam",
      "Maha Shivaratri celebrations",
      "Rudra puja",
      "Meditation and dhyana",
    ],
    timings: "5:00 AM – 9:00 PM",
    image: "/images/kapaleshwar.webp",
  },
  {
    id: "panchavati",
    name: "Panchavati",
    subtitle: "Where Rama Dwelt in Exile",
    description:
      "Panchavati is the sacred grove of five banyan trees where Lord Rama, Sita, and Lakshmana lived during their exile. This hallowed ground houses the ancient Kalaram Temple (Black Rama Temple), Sita Gufa (Sita's Cave), and the Tapovan gardens - a living testament to the Ramayana.",
    rituals: [
      "Darshan at Kalaram Temple",
      "Sita Gufa pilgrimage",
      "Ramayana recital gatherings",
      "Circumambulation of sacred trees",
    ],
    timings: "6:00 AM – 9:00 PM",
    image: "/images/panchavati.webp",
  },
];

export const akhadas = [
  {
    name: "Shri Panchayati Akhada Mahanirvani",
    tradition: "Shaiva",
    description:
      "One of the most ancient akhadas dedicated to Lord Shiva. Known for their ascetic practices and fire rituals. They lead the first Shahi Snan procession.",
    established: "Ancient (pre-historic origins)",
  },
  {
    name: "Shri Panchayati Akhada Niranjani",
    tradition: "Shaiva",
    description:
      "Devoted to Lord Kartikeya, this akhada is renowned for its warrior-ascetics and their spectacular procession during Kumbh Mela.",
    established: "904 CE",
  },
  {
    name: "Shri Taponidhi Anand Akhada",
    tradition: "Shaiva",
    description:
      "One of the largest Shaiva akhadas, known for profound spiritual teachings and meditation traditions passed down through centuries.",
    established: "855 CE",
  },
  {
    name: "Shri Panchdasnam Juna Akhada",
    tradition: "Shaiva",
    description:
      "The largest of all akhadas with thousands of naga sadhus. Their procession during Shahi Snan is the most grand and awe-inspiring.",
    established: "Ancient",
  },
  {
    name: "Shri Panchdashnam Aavahan Akhada",
    tradition: "Shaiva",
    description:
      "Known for strict ascetic discipline and powerful spiritual practices. They maintain ancient traditions of tapasya (austerity).",
    established: "646 CE",
  },
  {
    name: "Shri Panchayati Akhada Atal",
    tradition: "Shaiva",
    description:
      "Named for their unwavering (atal) devotion, this akhada preserves rare spiritual texts and practices of Shaivism.",
    established: "569 CE",
  },
  {
    name: "Shri Digambar Ani Akhada",
    tradition: "Vaishnava",
    description:
      "A prominent Vaishnava akhada devoted to Lord Vishnu. Known for their devotional music, kirtan traditions, and tilak markings.",
    established: "Ancient",
  },
  {
    name: "Shri Nirmohi Ani Akhada",
    tradition: "Vaishnava",
    description:
      "Dedicated to the worship of Lord Rama, this akhada played a historical role in preserving Ram Janmabhoomi traditions.",
    established: "Ancient",
  },
  {
    name: "Shri Nirvani Ani Akhada",
    tradition: "Vaishnava",
    description:
      "Focused on bhakti (devotion) and the teachings of Ramanuja. Known for their elaborate deity worship and philosophical discourse.",
    established: "Ancient",
  },
  {
    name: "Shri Panchayati Bada Udasin Akhada",
    tradition: "Udasin",
    description:
      "Founded on the teachings of Shri Chandra (son of Guru Nanak Dev Ji). They transcend sectarian boundaries and practice universal spirituality.",
    established: "1710 CE",
  },
  {
    name: "Shri Panchayati Akhada Naya Udasin",
    tradition: "Udasin",
    description:
      "A newer branch of the Udasin tradition, maintaining the syncretic spiritual practices that blend Hindu and Sikh mysticism.",
    established: "1710 CE",
  },
  {
    name: "Shri Nirmal Panchayati Akhada",
    tradition: "Nirmal",
    description:
      "Rooted in the teachings of Guru Gobind Singh Ji, this akhada combines Sikh spiritual practices with the ancient Kumbh tradition.",
    established: "1784 CE",
  },
  {
    name: "Kinnar Akhada",
    tradition: "Kinnar",
    description:
      "A historic akhada representing the transgender community in the ancient Kumbh tradition, recognized in 2019. Led by Mahamandaleshwar Laxmi Narayan Tripathi.",
    established: "2019 CE",
  },
];

export const events = [
  {
    title: "Grand Opening Ceremony",
    date: "August 2027",
    category: "Ceremony",
    description:
      "The official inauguration with Vedic rituals, lamp lighting, and blessings from senior religious leaders.",
  },
  {
    title: "Shahi Snan Processions",
    date: "Multiple dates",
    category: "Sacred Bathing",
    description:
      "Spectacular processions of Naga sadhus, adorned elephants, and decorated chariots leading to the ghats.",
  },
  {
    title: "Pravachan & Satsang",
    date: "Daily",
    category: "Spiritual",
    description:
      "Discourses by revered saints and spiritual leaders on Vedanta, Bhagavad Gita, and dharmic living.",
  },
  {
    title: "Ganga Aarti at Godavari",
    date: "Every Evening",
    category: "Devotional",
    description:
      "A mesmerizing evening aarti ceremony with thousands of lamps illuminating the sacred Godavari.",
  },
  {
    title: "Cultural Performances",
    date: "Throughout Kumbh",
    category: "Cultural",
    description:
      "Classical dance, devotional music, bhajan sandhya, and theatrical performances depicting Hindu epics.",
  },
  {
    title: "Yoga & Meditation Camps",
    date: "Daily",
    category: "Wellness",
    description:
      "Free yoga sessions and guided meditation led by renowned practitioners along the riverbanks.",
  },
  {
    title: "Bhajan Sandhya",
    date: "Every Evening",
    category: "Devotional",
    description:
      "Soul-stirring devotional singing sessions featuring renowned bhajan artists from across India.",
  },
  {
    title: "Annakshetra - Free Bhandara",
    date: "Daily",
    category: "Seva",
    description:
      "Massive free food distribution (langar/bhandara) serving lakhs of pilgrims daily, organized by akhadas and trusts.",
  },
];

export const galleryImages = [
  { src: "/images/gallery/kumbh-1.webp", alt: "Millions of devotees at the Godavari ghats during Shahi Snan", category: "Shahi Snan" },
  { src: "/images/gallery/kumbh-2.webp", alt: "Naga sadhus in grand procession", category: "Processions" },
  { src: "/images/gallery/kumbh-3.webp", alt: "Evening Ganga Aarti at the Godavari", category: "Aarti" },
  { src: "/images/gallery/kumbh-4.webp", alt: "Aerial view of the Kumbh Mela grounds", category: "Aerial" },
  { src: "/images/gallery/kumbh-5.webp", alt: "Devotees performing sacred rituals", category: "Rituals" },
  { src: "/images/gallery/kumbh-6.webp", alt: "Ancient Kalaram Temple in Panchavati", category: "Temples" },
  { src: "/images/gallery/kumbh-7.webp", alt: "Sunrise over the Godavari River", category: "Nature" },
  { src: "/images/gallery/kumbh-8.webp", alt: "Sadhus in meditation along the riverbank", category: "Spiritual" },
  { src: "/images/gallery/kumbh-9.webp", alt: "Grand decorated elephants in procession", category: "Processions" },
  { src: "/images/gallery/kumbh-10.webp", alt: "Cultural dance performances at Kumbh", category: "Cultural" },
  { src: "/images/gallery/kumbh-11.webp", alt: "Flower offerings at Ram Kund", category: "Rituals" },
  { src: "/images/gallery/kumbh-12.webp", alt: "Night view of illuminated ghats", category: "Night" },
];
