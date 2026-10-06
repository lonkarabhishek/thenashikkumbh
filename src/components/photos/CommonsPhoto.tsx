import Image from "next/image";
import { getPhoto, isPhotoAvailable } from "@/data/photos";
import PhotoCredit from "./PhotoCredit";

/**
 * One self-hosted Commons photo with its caption and licence credit.
 * Renders nothing until the file has been imported (see src/data/photos).
 */
export default function CommonsPhoto({
  id,
  priority = false,
  className = "",
  tone = "light",
}: {
  id: number;
  priority?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  const photo = getPhoto(id);
  if (!photo || !isPhotoAvailable(id)) return null;

  return (
    <figure className={className}>
      <Image
        src={photo.file}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 768px) 768px, 100vw"
        priority={priority}
        className="h-auto w-full rounded-2xl"
      />
      <figcaption className={`mt-2 text-sm ${tone === "dark" ? "text-cream-300/70" : "text-temple-600"}`}>
        {photo.caption}
        <PhotoCredit photo={photo} className="mt-1" />
      </figcaption>
    </figure>
  );
}
