# Content governance

The Nashik Kumbh 2027 site is used by pilgrims to plan real journeys and, in
some cases, to find an emergency number in a hurry. The rules below are how the
codebase enforces "do not present anything as fact unless it is."

## The one rule

**No operational claim ships without an entry in `src/data/verified/index.ts`.**

Operational means: dates, times, phone numbers, email addresses, offices,
addresses, road closures, transport, medical facilities, food distribution,
lost-and-found, akhada locations, official events, registration status,
accommodation availability, prices. It does *not* mean religious tradition,
historical background, mythology, or the sensory instructions in an audio walk.

If a claim is not in the registry, the page must either:

- rewrite it as description and not as fact, or
- render an "awaiting confirmation" state that references an entry in
  `awaiting` in the same file.

## Statuses

| Status | Meaning |
|---|---|
| `official` | Published by the authority responsible (NTKMA, MoHA, DGIPR, MoR, MEMS 108, …). |
| `provisional` | Officially announced but noted as subject to change. Show the caveat. |
| `historical` | Established fact from the published record. |
| `general_guidance` | Practical advice not tied to a single authority. |
| `religious_tradition` | Ritual custom. Not an operational fact. |
| `commercial` | A vendor's own claim about themselves. Never rendered as verified. |
| `unverified` | We saw it somewhere; we do not stand behind it. Do not surface. |
| `awaiting_confirmation` | Expected to be announced. Render the honest empty state. |

## Every entry carries

- **claim** — the fact itself, in en/hi/mr.
- **status** — from the table above.
- **sourceOrganisation, sourceTitle, sourceUrl** — where it comes from.
- **verifiedAt (ISO date), verifiedBy** — when we last opened the source.
- **reviewAt** — when we must open it again.
- **languagesReviewed** — locales whose translation has been human-checked.
- **aiUsable** — whether the assistant may surface it.
- **emergencyCritical** — life-safety information. Never AI-generated,
  never expired, never rendered without a source.

`complianceReport()` in the registry fails a build-time test in Phase 14 for
any emergency-critical claim missing a source, and for any claim whose
`reviewAt` is in the past.

## How to update a claim

1. Open the source you cite. Do not add a `sourceUrl` you have not opened
   in the last hour. If the source has changed, update the claim to match
   or open a task to remove the claim.
2. Update `verifiedAt` to today (`YYYY-MM-DD`).
3. Update `verifiedBy` to your initials or agent id.
4. Set `reviewAt` no more than **90 days** away.
5. Re-check Marathi and Hindi translations. Add the locale to
   `languagesReviewed` only if a Marathi/Hindi reader has approved it.
6. Commit with a message that mentions the source and the change.

## How to add a new operational claim

1. Add the entry to `verifiedClaims` or the appropriate typed array
   (`schedule`, `helplines`, `offices`).
2. Wire the page or component to read from the helper (`schedule`,
   `helplines`, `claimById`) — never inline the value.
3. If translation review is incomplete, set `languagesReviewed: []` and
   ship the English string; the site will fall back gracefully. Do not
   auto-translate emergency-critical content.

## What must never happen

- Placeholder helplines like `1800-XXX-XXXX` or `+91 99999 99999`
  ("we'll fix it later" always ships).
- Chatbot answers that assert operational facts without a claim id.
- SOS features that use placeholder geodata (see
  `src/data/exitRoutes.ts`, which is now UI-forbidden).
- Structured data (`SchemaMarkup.tsx`) that repeats a marketing claim.
- Translation files that leak an ad-sales email into the emergency block.

If you find one of these, remove it in the same commit as the discovery.
