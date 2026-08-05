# Security and privacy summary

## Data the site collects from pilgrims

**None that identifies an individual.** The site publishes information; it does not run accounts, forms, payments, or newsletters that require personal data.

- No login, no account creation.
- No payment integration.
- No pilgrim registration form.
- No location capture on load (the previous "find nearest exit" feature was removed because it relied on placeholder geodata and would have shipped false safety information).

## Analytics

Vercel Web Analytics is enabled — server-side, cookie-less, IP anonymised at ingest. It records page views and referrer paths in aggregate. No individual pilgrim is identifiable.

## Third-party requests

- Google Fonts (`Inter`, `Fraunces`, `Noto Serif Devanagari`) served through Next.js's font hosting (Google's font CDN).
- Vercel Analytics endpoint.
- No advertising SDKs, no fingerprinting scripts, no session recorders.

## Transport security

- HTTPS only.
- HSTS with `max-age=63072000; includeSubDomains; preload`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: origin-when-cross-origin`, `Content-Security-Policy: upgrade-insecure-requests`.

## Assistant safety

- The pilgrim assistant is deterministic — it retrieves from a curated knowledge base, not a live LLM. No pilgrim query leaves the browser.
- Safety-critical queries without a confident topic match are refused honestly, with a direct routing to 112 and NTKMA.
- Adversarial-probe questions are enumerated in `src/lib/chatbotEngine.ts` for regression review.

## Build-time integrity

- Every deploy runs `scripts/verify-content.mjs`. If a known placeholder or invented fact reappears (fabricated helpline, old wrong Amrit Snan date, unsourced "AI-powered" claim), the build fails.

## Incident response

- Any correction — factual, safety, privacy — is logged in `/changelog` within 24 hours.
- The maintainer is reachable at `hello@workwithabhi.online`.
