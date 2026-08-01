#!/usr/bin/env python3
"""
Generate the Yatra narration MP3s with edge-tts.

Setup:
    pip3 install edge-tts --break-system-packages

Usage:
    node_modules/.bin/sucrase-node scripts/export-narration.ts   # refresh manifest
    python3 scripts/generate_voiceover.py                        # synthesise
    python3 scripts/generate_voiceover.py --force                # re-synthesise all

The manifest (scripts/narration.json) is generated from src/data/yatraData.ts,
so editing the story copy and re-running both commands is the whole workflow.

Files land in public/audio/yatra/<trail>/<stop>.<locale>.mp3, which is exactly
the URL the player requests.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:  # pragma: no cover
    sys.exit("edge-tts is not installed. Run: pip3 install edge-tts --break-system-packages")

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "scripts" / "narration.json"
PUBLIC = ROOT / "public"

# One warm female narrator per language. Indian English is used rather than a US
# voice so the place names are pronounced the way pilgrims actually say them.
VOICES = {
    "en": "en-IN-NeerjaNeural",
    "hi": "hi-IN-SwaraNeural",
    "mr": "mr-IN-AarohiNeural",
}

# Slightly under natural pace — this is heard while walking, often on a phone
# speaker in a crowd.
RATE = "-8%"

MAX_PARALLEL = 4
MAX_ATTEMPTS = 3


async def synthesise(line: dict, force: bool, semaphore: asyncio.Semaphore) -> tuple[str, str]:
    """Render one line. Returns (status, detail)."""
    out_path = PUBLIC / line["out"]

    if out_path.exists() and not force:
        return "skipped", line["out"]

    voice = VOICES.get(line["locale"])
    if voice is None:
        return "failed", f'{line["out"]}: no voice for locale {line["locale"]}'

    out_path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = out_path.with_suffix(".mp3.part")

    async with semaphore:
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                communicate = edge_tts.Communicate(line["text"], voice, rate=RATE)
                await communicate.save(str(temp_path))

                if temp_path.stat().st_size < 1024:
                    raise RuntimeError("suspiciously small output")

                temp_path.replace(out_path)
                size_kb = out_path.stat().st_size // 1024
                return "written", f'{line["out"]} ({size_kb} KB)'

            except Exception as exc:  # noqa: BLE001 - report and retry any failure
                temp_path.unlink(missing_ok=True)
                if attempt == MAX_ATTEMPTS:
                    return "failed", f'{line["out"]}: {exc}'
                await asyncio.sleep(2 * attempt)

    return "failed", line["out"]


async def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="re-render files that already exist")
    parser.add_argument("--locale", choices=sorted(VOICES), help="only render one language")
    parser.add_argument("--manifest", type=Path, default=MANIFEST)
    args = parser.parse_args()

    if not args.manifest.exists():
        sys.exit(
            f"Manifest not found at {args.manifest}.\n"
            "Run: node_modules/.bin/sucrase-node scripts/export-narration.ts"
        )

    lines = json.loads(args.manifest.read_text(encoding="utf8"))["lines"]
    if args.locale:
        lines = [line for line in lines if line["locale"] == args.locale]

    print(f"Synthesising {len(lines)} lines with edge-tts…")

    semaphore = asyncio.Semaphore(MAX_PARALLEL)
    results = await asyncio.gather(*(synthesise(line, args.force, semaphore) for line in lines))

    written = [detail for status, detail in results if status == "written"]
    skipped = [detail for status, detail in results if status == "skipped"]
    failed = [detail for status, detail in results if status == "failed"]

    for detail in written:
        print(f"  ✓ {detail}")
    for detail in failed:
        print(f"  ✗ {detail}", file=sys.stderr)

    total_bytes = sum(
        (PUBLIC / line["out"]).stat().st_size
        for line in lines
        if (PUBLIC / line["out"]).exists()
    )
    print(
        f"\nwritten {len(written)} · skipped {len(skipped)} · failed {len(failed)}"
        f" · {total_bytes / 1_048_576:.1f} MB on disk"
    )

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
