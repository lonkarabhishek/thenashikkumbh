/**
 * Google AdSense placements.
 *
 * The site carries ads only in a few quiet spots, never in the way of the
 * content: after a story or guide has been read, and once inside the news
 * list. No sticky bars, no full-screen ads, nothing in the chat, nothing on
 * the emergency, policies or credits pages. Turn Auto ads off in the
 * AdSense dashboard (or at least the Anchor, Vignette and Side rail formats)
 * so Google does not add its own on top of these.
 *
 * Create one display unit per placement in AdSense (Ads, By ad unit,
 * Display ads, responsive) and paste its data-ad-slot number below. A
 * placement with an empty slot renders nothing at all.
 */
export const AD_CLIENT = "ca-pub-4556049898419830";

export const AD_SLOTS = {
  /** Under a news post, after the sources box and before "More news". */
  articleEnd: "",
  /** In the news list, after the first day's stories. */
  newsList: "",
  /** Under a long-form guide page, after its sources. */
  guideEnd: "",
} as const;

export type AdPlacement = keyof typeof AD_SLOTS;
