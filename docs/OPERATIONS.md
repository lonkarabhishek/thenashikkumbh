# Operational support plan

## Availability

- **Editorial response:** corrections actioned within 24 hours; safety-critical corrections within 4 hours during waking hours.
- **Uptime:** best-effort on Vercel's free tier during independent operation. If NTKMA adopts the site, uptime commitments follow the hosting NTKMA chooses.
- **Backups:** source in Git; content in the source tree; no separate database to back up.

## On-call

During independent operation, the maintainer is on call for safety-critical corrections and platform outages. The maintainer is not on call for hosting-provider incidents.

If NTKMA adopts the site, on-call responsibility follows NTKMA's own ops setup.

## Change process

1. All changes are made in Git.
2. Every deploy runs the content-integrity check (`scripts/verify-content.mjs`).
3. Material factual changes are logged in `/changelog` at deploy time.
4. NTKMA can request a change by email; on receipt, the change is queued, made, and logged.

## Known risks and mitigations

- **Placeholder data creeping back in.** Mitigated by the content-integrity check that fails the build.
- **Assistant fabricating.** Mitigated by the deterministic retrieval engine and the honest-refusal path — the assistant does not call an LLM at runtime.
- **Emergency card unavailable offline.** Mitigated by the service worker precache; a change to the emergency route triggers a new SW version.
- **Wrong schedule.** Mitigated by the single-source-of-truth registry (`src/data/verified/index.ts`); a schedule change is one file edit.
- **Independent maintainer unavailable.** Mitigated by full portability of source and content — see `docs/OWNERSHIP.md`.
