import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { galleryFaqs, galleryPhotoCount } from "@/data/galleryFaq";
import { availablePhotos } from "@/data/photos";
import type { Locale } from "@/i18n/translations";
import { SITE_URL, localeUrl, sectionBreadcrumb, sectionMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

/** Subset for ImageGallery JSON-LD — enough for rich results without a huge payload. */
const SCHEMA_PHOTO_LIMIT = 18;

export function generateMetadata({ params }: Params): Metadata {
  return sectionMetadata(params.locale, "gallery", {
    path: "/gallery",
    image: "/images/og/kumbh-11.jpg",
    keywords: [
      "photos of kumbh mela nashik",
      "Nashik Kumbh Mela photo",
      "Kumbh Mela photos",
      "Nashik Kumbh images",
      "Shahi Snan photos",
      "Godavari River photos",
      "Kumbh Mela gallery",
      "कुंभ मेला फोटो",
      "कुंभमेळा फोटो",
    ],
  });
}

function galleryImageSchema(locale: Locale) {
  const count = galleryPhotoCount();
  const pageUrl = localeUrl(locale, "/gallery");
  const subset = availablePhotos.slice(0, SCHEMA_PHOTO_LIMIT);
  const name =
    locale === "hi"
      ? `नाशिक कुंभ मेला फोटो गैलरी (${count} तस्वीरें)`
      : locale === "mr"
        ? `नाशिक कुंभमेळा फोटो गॅलरी (${count} छायाचित्रे)`
        : `Nashik Kumbh Mela photo gallery (${count} photos)`;
  const description =
    locale === "hi"
      ? "नाशिक, त्र्यंबकेश्वर और पहले के सिंहस्थों की मुक्त-लाइसेंस तस्वीरें; हर फोटो पर श्रेय।"
      : locale === "mr"
        ? "नाशिक, त्र्यंबकेश्वर आणि आधीच्या सिंहस्थांची मुक्त-परवाना छायाचित्रे; प्रत्येक फोटोवर श्रेय."
        : "Freely licensed photos of Nashik, Trimbakeshwar and earlier Simhasthas; every photo is credited.";

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    url: pageUrl,
    numberOfItems: count,
    isPartOf: { "@type": "WebSite", name: "The Nashik Kumbh", url: SITE_URL },
    associatedMedia: subset.map((p) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${p.file}`,
      url: `${SITE_URL}${p.file}`,
      name: p.caption,
      caption: p.caption,
      creditText: p.author,
      license: p.licenseUrl,
      acquireLicensePage: p.sourcePage,
      width: p.width,
      height: p.height,
    })),
  };
}

export default function GalleryLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  const locale = params.locale;
  return (
    <>
      <JsonLd data={sectionBreadcrumb(locale, "gallery", "/gallery")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: galleryFaqs().map((f) => ({
            "@type": "Question",
            name: f.q[locale],
            acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
          })),
        }}
      />
      <JsonLd data={galleryImageSchema(locale)} />
      {children}
    </>
  );
}
