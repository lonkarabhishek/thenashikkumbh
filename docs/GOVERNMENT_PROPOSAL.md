# Proposal — thenashikkumbh.com as an official pilgrim information channel

**Prepared for:** Nashik–Trimbakeshwar Kumbh Mela Authority (NTKMA), Divisional Commissioner Office, Nashik
**Prepared by:** Abhishek Lonkar (independent maintainer, thenashikkumbh.com)
**Status:** Draft. Not to be sent without the maintainer's explicit approval.

---

## What this is

An independently built, mobile-first, trilingual (English / Hindi / Marathi) public-information website for the Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027, already live at [https://thenashikkumbh.com](https://thenashikkumbh.com). Every operational fact on the site is either sourced to a first-party government release with a verification date, or clearly labelled as awaiting confirmation.

Nothing on the site is presented as an official government channel today. This proposal asks NTKMA to consider adopting the platform — or a fork of it — as a supplementary official pilgrim channel, under NTKMA branding and editorial oversight.

## Why this exists

Search results for "Nashik Kumbh 2027" today lead pilgrims to a mix of wire copy, blog roundups, and a small number of official releases. Several third-party sites already publish invented schedules, exaggerated crowd numbers, and false emergency-contact information. A single, mobile-first, offline-capable, authoritative page — under NTKMA control — would materially reduce misinformation risk in the run-up to the Mela.

## What is already built

- Trilingual UI (English / Hindi / Marathi), mobile-first design.
- Verified schedule of Amrit Snans and Dhwajarohan, drawn from the 21 May 2025 DGIPR release, corroborated by wire coverage.
- Offline emergency card at `/emergency` (routes to 112, 108, 101, 1091, 1098 and NTKMA), cached by a service worker so it opens with no data connection.
- Deterministic pilgrim assistant with source-attributed answers and an honest refusal path — safety-critical questions without a confident topic match are routed to 112 and NTKMA rather than being auto-generated.
- Public content-corrections log (`/changelog`) and policies page (`/policies`).
- Content-integrity check gates every deploy — the build fails if any known placeholder or invented fact reappears.

## What is asked from NTKMA

1. Nomination of a single editorial point of contact for schedule and safety corrections.
2. Access — even in read-only form — to the authoritative data feeds NTKMA develops: helpline numbers, event programme, ghat facilities, medical camps, lost-and-found centres, transport advisories, crowd advisories.
3. Approval to display an NTKMA verification badge alongside items sourced directly from NTKMA.
4. If NTKMA wishes to take the site over: a plan for handover, either as a fork under a government domain or as a rebrand on this domain.

## What NTKMA gets

- A working, deployed, mobile-first, offline-capable, trilingual channel at zero build cost.
- A content model that makes it structurally hard to publish an unsourced operational claim.
- Source code and content, transferable to NTKMA at any time (see `docs/OWNERSHIP.md`).

## Pilot scope

See `docs/PILOT_SCOPE.md` for the proposed 60-day pilot.

## Contact

`hello@workwithabhi.online` · `https://workwithabhi.online`
