# Accessibility summary

The site is designed against WCAG 2.2 AA. It does **not** claim certification. This document lists what is in place and what is still to do so a reviewer can independently verify.

## In place

- Trilingual UI (English, Hindi, Marathi), user-selectable, preserved across pages.
- Devanagari serif with proper fallback stack for Hindi and Marathi content.
- Semantic HTML (`<main>`, `<nav>`, `<footer>`, `<h1>`–`<h3>`, `<ol>`, `<ul>`, `<figure>`).
- `aria-label` on icon-only controls (social links, close buttons).
- Emergency card at `/emergency` server-rendered, JavaScript-free, works with the browser reader.
- Skip link to main content.
- Prefers-reduced-motion honoured in scroll-driven scenes.
- Focus indicators on all interactive elements.
- Colour palette contrast checked against AA on primary body and CTA text.

## To do

- Formal audit against WCAG 2.2 AA by a third party.
- Transcripts for audio-walk narration (the underlying script is authored text, so transcripts are trivial to generate).
- Captions on any embedded video.
- Screen-reader dry-run of the assistant dialog with a screen reader other than VoiceOver.
- Reduced-motion pass on the scroll-world hero.
- GIGW 3.0 alignment review.

## What we won't claim

- The site is not "fully AA compliant" until an external audit says so. It is designed to that standard; a self-assertion is not a certification.
