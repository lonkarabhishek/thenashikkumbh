# Pilot scope — 60 days

## Objective

Establish a working editorial channel between NTKMA and the site, and verify — with real pilgrim traffic — that the platform can carry authoritative information reliably in the run-up to the 2027 Simhastha.

## In scope

1. **Schedule feed.** NTKMA supplies the Amrit Snan and Dhwajarohan schedule (already public). The site continues to source from DGIPR releases; NTKMA gets a single email address to notify us of any change.
2. **Emergency numbers.** NTKMA confirms or corrects the helplines the site publishes. Any additions from NTKMA (Kumbh control room, lost-and-found, medical) are added with an NTKMA source and a verified date.
3. **Awaiting-confirmation items.** The site currently marks event programme, facilities, traffic, railway, and accommodation as `awaiting_confirmation`. During the pilot, NTKMA reviews what it wants published and when.
4. **Corrections workflow.** NTKMA emails corrections to a monitored inbox; corrections are actioned within 24 hours during the pilot, logged publicly in `/changelog`.

## Out of scope during pilot

- Rebranding or domain transfer (proposed separately, only if the pilot succeeds).
- Payments or transactions of any kind.
- Public forms that collect pilgrim data.
- AI-generated operational content.

## Success criteria

- Zero unsourced operational claims on the site (already true; content-integrity check enforces this).
- Median time to reflect an NTKMA correction: under 24 hours.
- Emergency card resolves in under 1 second on a 3G connection and works offline (already true; verify weekly).
- Assistant refusal rate on safety-critical queries without a matching topic: 100% (already true; enforced by `chatbotEngine.ts`).

## Termination

Either party can terminate with seven days' notice. On termination, the site either continues in its independent, unbranded form (default) or is taken down (if NTKMA prefers). Source code and content remain available under the ownership terms in `docs/OWNERSHIP.md`.
