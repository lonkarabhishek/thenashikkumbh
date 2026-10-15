# Kumbh status board and countdown: how to update

## /kumbh-status (`src/data/kumbhStatus.ts`)
One typed array, `statusItems`. Each item has a place, state (`closed`, `restricted`, `upcoming`, `unsettled`),
headline, detail, optional `unknown` line, `confidence` (`confirmed` or `reported`), `lastUpdated`, a source link and
the `newsSlug` of the news post that already carries the fact.

Update routine (daily SEO run / news watch):
1. Re-check each item against its source and any newer news post.
2. Change the text if the situation changed; set `lastUpdated` to the date you checked. The page header shows the newest date.
3. Delete items that are no longer true. Add new items only if a news post in `src/data/news` backs them.
4. `confirmed` only for official sources or officials on record, quoted by name. Everything else is `reported`.
5. Bump `PAGE_LASTMOD["/kumbh-status"]` in `src/data/lastmod.ts`.
6. Write all three languages (Marathi first). Never invent dates, figures or quotes.

## /kumbh-countdown (`src/data/kumbhCountdown.ts`)
No dates live here. Targets are read from `schedule` in `src/data/verified/index.ts` (same source as /dates).
Change the `COUNTDOWN_IDS` list to add or remove rows. Rows with no official start time count down to 00:00 IST on that day.
