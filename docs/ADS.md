# Ads: where they appear and how to keep them from annoying people

The site shows Google AdSense display units in three quiet places only:

| Placement | Where | Why it is natural there |
| --- | --- | --- |
| `articleEnd` | Under a news post, after the sources box, before "More news" | The reader has finished the story. |
| `newsList` | In the news list, after the first day's stories | One break in a long list, below the lead story. |
| `guideEnd` | Under a long-form guide page, after its sources | Same as a post: after the reading is done. |

Never: in the hero, inside a story's text, in the chat, on the emergency,
policies or credits pages, as sticky bars, or as full-screen ads.

## Turning the placements on

1. In AdSense: Ads, By ad unit, Display ads. Create one responsive unit per
   placement, named after the row above.
2. Paste each unit's `data-ad-slot` number into `src/data/ads.ts`.
3. Deploy. A placement with an empty slot renders nothing.

## Auto ads: turn them off

AdSense turns Auto ads on by default for a new site. Auto ads add their own
units anywhere on the page, including anchor bars that stick to the bottom
of the phone screen, full-screen "vignette" ads between pages, and side
rails. Those are the formats people find annoying.

In AdSense: Ads, By site, your site, edit. Either switch Auto ads off, or
keep them on and switch off at least Anchor ads, Vignette ads and Side rail
ads, and set the ad load slider to the minimum.

## Consent

Google requires a consent message for visitors from the EEA, UK and
Switzerland. Turn on Google's own message in AdSense under Privacy and
messaging. No code change is needed.

## Layout shift

Each unit reserves 280 px of height before the ad loads, so the page does
not jump. If Google serves a taller ad, the box grows once; it never pushes
content that the reader is already looking at.
