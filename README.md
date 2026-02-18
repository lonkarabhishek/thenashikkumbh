# Nashik Kumbh Mela 2027 — thenashikkumbh.com

A premium, Hindu-first, devotional + informational website for the Nashik Kumbh Mela (Simhastha) 2027, built with Next.js 14 and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom sacred color palette
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Playfair Display (headings), Inter (body), Tiro Devanagari Hindi (Sanskrit/Hindi)
- **Deployment:** Vercel-ready

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, about preview, dates, ghats, events, map, newsletter |
| `/about` | About Kumbh Mela | History, Samudra Manthan origins, importance in Hinduism |
| `/ghats` | Sacred Ghats | Ram Kund, Godavari Ghats, Kapaleshwar, Panchavati |
| `/dates` | Important Dates | Shahi Snan timeline, Parva Snan schedule |
| `/guide` | Pilgrim Guide | How to reach, accommodation, packing, do's & don'ts |
| `/events` | Events & Akhadas | Events calendar, all 13 akhadas with details |
| `/gallery` | Gallery | Image grid with lightbox and category filters |
| `/businesses` | Local Businesses | Hotels, tours, puja services (monetization-ready) |
| `/blog` | Blog | Blog-ready structure with placeholder posts |

## Features

- Fully responsive, mobile-first design
- Saffron/gold/cream Hindu spiritual aesthetic
- Framer Motion scroll animations and parallax hero
- JSON-LD Schema markup (Event, WebSite, BreadcrumbList)
- OpenGraph and Twitter Card metadata
- Auto-generated sitemap.xml and robots.txt
- Floating WhatsApp button
- Google Maps embed
- Newsletter email capture
- Placeholder ad sections for monetization
- Business listing structure for future revenue
- Static generation (SSG) for all pages

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nashik-kumbh

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: Git Integration

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Set your custom domain `thenashikkumbh.com` in Project Settings > Domains

### Custom Domain Setup

1. In Vercel dashboard, go to your project > Settings > Domains
2. Add `thenashikkumbh.com`
3. Update DNS records at your domain registrar:
   - **A Record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com` (for `www` subdomain)

## Project Structure

```
nashik-kumbh/
├── public/
│   └── images/           # Image assets (add real images here)
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout with Navbar, Footer, Schema
│   │   ├── page.tsx      # Home page
│   │   ├── about/        # About Kumbh Mela
│   │   ├── ghats/        # Sacred Ghats
│   │   ├── dates/        # Important Dates
│   │   ├── guide/        # Pilgrim Guide
│   │   ├── events/       # Events & Akhadas
│   │   ├── gallery/      # Photo Gallery
│   │   ├── businesses/   # Local Businesses
│   │   ├── blog/         # Blog (placeholder)
│   │   ├── sitemap.ts    # Auto sitemap
│   │   └── robots.ts     # Robots.txt
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── SectionWrapper.tsx
│   │   ├── GhatCard.tsx
│   │   ├── Timeline.tsx
│   │   ├── InfoCard.tsx
│   │   ├── CTABanner.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── SchemaMarkup.tsx
│   ├── data/
│   │   └── siteData.ts   # All site content (CMS-ready JSON)
│   └── lib/
│       └── utils.ts
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## Adding Real Images

Replace placeholder gradients with actual images:

1. Add images to `public/images/` (e.g., `ramkund.jpg`, `godavari-ghats.jpg`)
2. Add gallery images to `public/images/gallery/`
3. Update image paths in `src/data/siteData.ts`
4. Add an OG image at `public/images/og-image.jpg` (1200x630px)

## Future Enhancements

- [ ] Connect to a headless CMS (Sanity, Strapi, or Contentful)
- [ ] Add real-time event updates
- [ ] Implement business listing submission and payment
- [ ] Add multi-language support (Hindi, Marathi)
- [ ] Integrate live darshan / webcam feeds
- [ ] Add push notifications for Shahi Snan reminders
- [ ] Connect newsletter to Mailchimp/SendGrid
