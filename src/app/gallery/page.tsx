"use client";

import React, { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Share2, Search } from "lucide-react";
import { galleryImagesI18n } from "@/data/siteDataI18n";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ───────────────────────────── data ───────────────────────────── */

const categories = [
  { key: "All", labelKey: translations.galleryPage.filterAll },
  { key: "Shahi Snan", labelKey: translations.galleryPage.filterShahiSnan },
  { key: "Processions", labelKey: translations.galleryPage.filterProcessions },
  { key: "Aarti", labelKey: translations.galleryPage.filterAarti },
  { key: "Temples", labelKey: translations.galleryPage.filterTemples },
  { key: "Rituals", labelKey: translations.galleryPage.filterRituals },
  { key: "Nature", labelKey: translations.galleryPage.filterNature },
  { key: "Spiritual", labelKey: translations.galleryPage.filterSpiritual },
  { key: "Cultural", labelKey: translations.galleryPage.filterCultural },
  { key: "Aerial", labelKey: translations.galleryPage.filterAerial },
  { key: "Night", labelKey: translations.galleryPage.filterNight },
];

const heightClasses = [
  "h-64",
  "h-80",
  "h-72",
  "h-96",
  "h-64",
  "h-80",
  "h-72",
  "h-64",
  "h-96",
  "h-80",
  "h-72",
  "h-64",
];

/* ───────────────────────────── page ───────────────────────────── */

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredImages =
    activeFilter === "All"
      ? galleryImagesI18n
      : galleryImagesI18n.filter((img) => img.category.en === activeFilter);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const goToPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    },
    [closeLightbox, goToPrev, goToNext]
  );

  return (
    <>


      {/* ═══════════════════ HERO BANNER ═══════════════════ */}
      <section className="section-dark relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,67,0.08)_0%,transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-20 top-10 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-10 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)" }}
        />

        <div className="section-container relative z-10 text-center">
          <span
            className="mb-4 inline-block font-devanagari text-5xl drop-shadow-lg"
            style={{ color: "#D4A843", textShadow: "0 0 30px rgba(212,168,67,0.4)" }}
            aria-hidden="true"
          >
            दर्शन
          </span>

          <h1
            className="font-heading text-4xl font-bold text-cream-100 drop-shadow-md md:text-6xl lg:text-7xl"
          >
            {t(translations.galleryPage.heroTitle)}
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-lg text-cream-300/70 md:text-xl"
          >
            {t(translations.galleryPage.heroSubtitle)}
          </p>

          <div
            className="gold-line-thick mx-auto mt-8 w-48 origin-center"
          />
        </div>
      </section>

      {/* ═══════════════════ GALLERY SECTION ═══════════════════ */}
      <section className="section-dark relative py-16 md:py-24">
        <div className="absolute inset-0 temple-pattern opacity-[0.02]" />
        <div className="section-container relative z-10">
          {/* Filter Pills */}
          <div
            className="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3"
          >
            <div className="mr-2 flex items-center gap-2 text-cream-300/40">
              <Search className="h-4 w-4" />
              <span className="hidden text-sm font-medium sm:inline">{t(translations.galleryPage.filterLabel)}</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                style={
                  activeFilter === cat.key
                    ? {
                        background: "linear-gradient(135deg, #D4A843, #B8922D)",
                        color: "#0D0906",
                        boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                      }
                    : {
                        background: "transparent",
                        color: "rgba(212,168,67,0.6)",
                        border: "1px solid rgba(212,168,67,0.15)",
                      }
                }
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
            {filteredImages.map((image, index) => {
              const heightIndex = index % heightClasses.length;

              return (
                <div
                  key={image.src}
                  className="group cursor-pointer break-inside-avoid"
                  onClick={() => openLightbox(index)}
                >
                  <div
                    className={`relative ${heightClasses[heightIndex]} overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#D4A843]/10 group-hover:-translate-y-1`}
                    style={{ border: "1px solid rgba(212,168,67,0.08)" }}
                  >
                    {/* Actual image */}
                    <img
                      src={image.src}
                      alt={t(image.alt)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Bottom overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                      <span
                        className="mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm"
                        style={{
                          background: "rgba(212,168,67,0.15)",
                          color: "#D4A843",
                          border: "1px solid rgba(212,168,67,0.2)",
                        }}
                      >
                        {t(image.category)}
                      </span>
                      <p className="text-sm leading-snug text-white/80">
                        {t(image.alt)}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                      <div
                        className="rounded-full p-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: "rgba(212,168,67,0.2)",
                          border: "1px solid rgba(212,168,67,0.3)",
                        }}
                      >
                        <Search className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredImages.length === 0 && (
            <p
              className="py-16 text-center text-lg text-cream-300/40"
            >
              {t(translations.galleryPage.noImages)}
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════ LIGHTBOX MODAL ═══════════════════ */}
      {lightboxOpen && filteredImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(13,9,6,0.95)", backdropFilter: "blur(20px)" }}
            onClick={closeLightbox}
          />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 z-10 rounded-full p-2 transition-colors"
            style={{ color: "rgba(212,168,67,0.6)" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#D4A843"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(212,168,67,0.6)"; }}
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Previous */}
          <button
            onClick={goToPrev}
            className="absolute left-4 z-10 rounded-full p-3 transition-all md:left-8"
            style={{ color: "rgba(212,168,67,0.6)", background: "rgba(212,168,67,0.05)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#D4A843";
              (e.currentTarget as HTMLElement).style.background = "rgba(212,168,67,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(212,168,67,0.6)";
              (e.currentTarget as HTMLElement).style.background = "rgba(212,168,67,0.05)";
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next */}
          <button
            onClick={goToNext}
            className="absolute right-4 z-10 rounded-full p-3 transition-all md:right-8"
            style={{ color: "rgba(212,168,67,0.6)", background: "rgba(212,168,67,0.05)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#D4A843";
              (e.currentTarget as HTMLElement).style.background = "rgba(212,168,67,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(212,168,67,0.6)";
              (e.currentTarget as HTMLElement).style.background = "rgba(212,168,67,0.05)";
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image content */}
          <div
            className="relative z-10 mx-4 w-full max-w-4xl md:mx-8"
            key={selectedIndex}
          >
            <div
              className="relative h-[60vh] w-full overflow-hidden rounded-2xl md:h-[70vh]"
              style={{ border: "1px solid rgba(212,168,67,0.15)", background: "#0D0906" }}
            >
              {filteredImages[selectedIndex] && (
                <img
                  src={filteredImages[selectedIndex].src}
                  alt={t(filteredImages[selectedIndex].alt)}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Info bar */}
            <div className="mt-4 text-center">
              <span
                className="mb-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                style={{
                  background: "rgba(212,168,67,0.15)",
                  color: "#D4A843",
                }}
              >
                {filteredImages[selectedIndex] && t(filteredImages[selectedIndex].category)}
              </span>
              <p className="text-base text-cream-100/90 md:text-lg">
                {filteredImages[selectedIndex] && t(filteredImages[selectedIndex].alt)}
              </p>
              <p className="mt-2 text-sm text-cream-300/40">
                {selectedIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════ SHARE CTA ═══════════════════ */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #0D0906 50%, #1a0a00 100%)",
        }}
      >
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)]" />

        <div
          className="section-container relative z-10 text-center"
        >
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}
          >
            <Share2 className="h-8 w-8" style={{ color: "#D4A843" }} />
          </div>

          <h2 className="font-heading text-3xl font-bold text-cream-100 md:text-5xl">
            {t(translations.galleryPage.ctaHeading)}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-300/70">
            {t(translations.galleryPage.ctaDesc)}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://instagram.com/thenashikkumbh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Camera className="h-5 w-5" />
              {t(translations.galleryPage.shareOnInstagram)}
            </a>
            <span className="text-sm" style={{ color: "rgba(212,168,67,0.5)" }}>
              #NashikKumbh2027
            </span>
          </div>
        </div>
      </section>


    </>
  );
}
