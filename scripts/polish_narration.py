#!/usr/bin/env python3
"""
Polish the Yatra narration MP3s for listening on a phone speaker outdoors.

edge-tts output arrives at about -21 LUFS, which is quiet next to traffic and
crowds. For each file this script:

  - cuts low rumble below 80 Hz (inaudible on phones, wastes headroom),
  - adds a gentle presence lift around 3 kHz so consonants carry,
  - applies light compression so quiet words are not lost,
  - normalises loudness to -16 LUFS with a -1.5 dBTP ceiling (two-pass),
  - adds 250 ms of lead-in silence so Bluetooth speakers that wake up late
    do not clip the first syllable,
  - re-encodes mono 64 kbps (up from 48) to limit generational loss.

Idempotent: a file already within 1 LU of the target is skipped, so running
it again does not re-encode (and degrade) finished files.

Setup:
    pip3 install imageio-ffmpeg --break-system-packages   # or have ffmpeg on PATH

Usage (after generate_voiceover.py):
    python3 scripts/polish_narration.py
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "public" / "audio" / "yatra"

TARGET_LUFS = -16.0
TRUE_PEAK = -1.5
LRA = 7.0
TOLERANCE_LU = 1.0

VOICE_CHAIN = (
    "highpass=f=80,"
    "equalizer=f=3000:t=q:w=1.2:g=2,"
    "acompressor=threshold=-24dB:ratio=2.5:attack=15:release=200:makeup=1"
)


def ffmpeg() -> str:
    path = shutil.which("ffmpeg")
    if path:
        return path
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("ffmpeg not found. Install it, or: pip3 install imageio-ffmpeg --break-system-packages")


def measure(ff: str, path: Path, pre: str = "") -> dict:
    """Run loudnorm in analysis mode and return its JSON measurements."""
    chain = f"{pre}," if pre else ""
    out = subprocess.run(
        [ff, "-hide_banner", "-nostats", "-i", str(path), "-af",
         f"{chain}loudnorm=I={TARGET_LUFS}:TP={TRUE_PEAK}:LRA={LRA}:print_format=json",
         "-f", "null", "-"],
        capture_output=True, text=True, check=True,
    ).stderr
    return json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", out, re.S).group(0))


def polish(ff: str, path: Path) -> str:
    current = float(measure(ff, path)["input_i"])
    if abs(current - TARGET_LUFS) <= TOLERANCE_LU:
        return f"skipped   {path.relative_to(AUDIO)} ({current:.1f} LUFS)"

    m = measure(ff, path, VOICE_CHAIN)
    norm = (
        f"loudnorm=I={TARGET_LUFS}:TP={TRUE_PEAK}:LRA={LRA}"
        f":measured_I={m['input_i']}:measured_TP={m['input_tp']}"
        f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}"
        f":offset={m['target_offset']}:linear=true"
    )
    tmp = path.with_suffix(".polish.mp3")
    subprocess.run(
        [ff, "-hide_banner", "-loglevel", "error", "-y", "-i", str(path), "-af",
         f"{VOICE_CHAIN},{norm},adelay=250,aresample=24000",
         "-ac", "1", "-c:a", "libmp3lame", "-b:a", "64k", str(tmp)],
        check=True,
    )
    tmp.replace(path)
    after = float(measure(ff, path)["input_i"])
    return f"polished  {path.relative_to(AUDIO)} ({current:.1f} -> {after:.1f} LUFS)"


def main() -> None:
    ff = ffmpeg()
    files = sorted(AUDIO.rglob("*.mp3"))
    if not files:
        sys.exit(f"No MP3s under {AUDIO}")
    for path in files:
        print(polish(ff, path))


if __name__ == "__main__":
    main()
