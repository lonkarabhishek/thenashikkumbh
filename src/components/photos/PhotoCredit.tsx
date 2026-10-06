import type { CommonsPhoto } from "@/data/photos";

/**
 * The licence credit shown under every Commons photo:
 * Photo: "<title>" by <author>, via Wikimedia Commons, <licence>.
 */
export default function PhotoCredit({ photo, className = "" }: { photo: CommonsPhoto; className?: string }) {
  return (
    <span className={`block text-[11px] leading-snug opacity-70 ${className}`}>
      Photo:{" "}
      <a href={photo.sourcePage} target="_blank" rel="noopener noreferrer" className="underline">
        &ldquo;{photo.title}&rdquo;
      </a>{" "}
      by {photo.author}, via Wikimedia Commons,{" "}
      {photo.licenseUrl ? (
        <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline">
          {photo.license}
        </a>
      ) : (
        photo.license
      )}
    </span>
  );
}
