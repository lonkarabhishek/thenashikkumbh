import CommonsGallery from "@/components/gallery/CommonsGallery";
import LegacyGallery from "@/components/gallery/LegacyGallery";
import { availablePhotos } from "@/data/photos";

// The credited Wikimedia gallery replaces the old one as soon as its photo
// files have been imported (scripts/import-commons-photos.mjs).
export default function GalleryPage() {
  return availablePhotos.length > 0 ? <CommonsGallery /> : <LegacyGallery />;
}
