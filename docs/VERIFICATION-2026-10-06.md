# Verification: 6 October 2026 update

Checked on a local production build (`next build && next start`).

## Redirects
Every legacy URL from Search Console (8 pages and 16 archived posts), on
both `www.thenashikkumbh.com` and `thenashikkumbh.com`: one 301 hop to the
`/en/` page, which returns 200 with a matching self-canonical. 48 of 48
passed; full log in `screenshots-2026-10-06/redirect-check.txt`.

Note: on the live site the bare domain is first redirected by Vercel's own
domain setting (currently 307 to www). To get a single hop there too, set
`thenashikkumbh.com` in Vercel to serve the production deployment without a
redirect; the site's middleware then 301s it to www in one hop.

## Structured data (parsed from the built HTML)
- `/en/dates`: 5 Event items (Dhwajarohan at 12:02 PM IST, four Amrit
  Snan days), FAQPage with 7 questions, one BreadcrumbList.
- Home: the same 5 Events. Articles: NewsArticle (author The Nashik Kumbh
  Desk, sources as citations) and one BreadcrumbList.
Google's Rich Results Test could not be run from the build environment.

## Lighthouse (mobile, local lab, median of 3)
| Page | Before perf / LCP / FCP | After perf / LCP / FCP |
|---|---|---|
| /en | 63 / 5.3 s / 1.4 s | 81 / 4.4 s / 1.2 s |
| /mr | 80 / 5.3 s / 1.4 s | 84 / 4.6 s / 1.2 s |

## Content checks
- Every source URL in the new posts and pages appears in the briefing.
- Every rupee figure and percentage in the English copy appears in the
  briefing.
- No em dashes in the source or the built output.
- No hydration errors on the screenshot pages.
