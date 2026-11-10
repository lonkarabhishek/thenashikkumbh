/** 11-character YouTube ids only, so an embed URL cannot be rewritten. */
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function youtubeId(id: string): string | null {
  return YOUTUBE_ID.test(id) ? id : null;
}

/** Privacy-enhanced player. `autoplay` is only for an explicit Play tap. */
export function youtubeEmbedUrl(id: string, autoplay = false): string | null {
  const safe = youtubeId(id);
  if (!safe) return null;
  return `https://www.youtube-nocookie.com/embed/${safe}${autoplay ? "?autoplay=1" : ""}`;
}
