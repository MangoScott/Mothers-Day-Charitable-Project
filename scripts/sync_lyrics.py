#!/usr/bin/env python3
"""
Generate precise lyric timings for Wendy's Song via Whisper forced alignment.

This script is the single source of truth for the timings in
src/utils/lyricsData.js. Run it whenever the audio file changes or the lyric
breakdown changes. It produces a verified slot table that you paste into
lyricsData.js.

Usage:
    pip install openai-whisper
    sudo apt-get install -y ffmpeg
    python3 scripts/sync_lyrics.py

Output:
    scripts/output/whisper_words.json   # raw word-level timestamps
    scripts/output/slots.json           # resolved 24-slot table
    scripts/output/alignment_report.txt # human-readable verification

How it works:
    1. ffmpeg converts the MP3 to mono 16 kHz WAV.
    2. Whisper medium.en transcribes with word_timestamps=True.
    3. For each of the 24 logical slots we anchor on the FIRST WORD of its
       lyric and snap the slot start to that word's onset (typically within
       ~100 ms of the audible attack).
    4. Each slot's end equals the next slot's start so the timeline is
       contiguous with no gaps.
    5. A verification report prints the words that actually fall inside each
       slot, so we can sanity-check the alignment by eye.

Tuning:
    - To shift a slot's anchor (e.g., because two phrases share a first word),
      pass an "after_time_hint" so the search starts after a given second.
    - To re-merge phrases (e.g., if you want 18 narrative+verse slots instead
      of the current 4+18), edit the SLOT_DEFS table below.
"""

import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT          = Path(__file__).resolve().parent.parent
AUDIO_MP3     = ROOT / "public" / "audio" / "wendys_song.mp3"
OUT_DIR       = Path(__file__).resolve().parent / "output"
WAV_PATH      = OUT_DIR / "wendys_song.wav"
WORDS_JSON    = OUT_DIR / "whisper_words.json"
SLOTS_JSON    = OUT_DIR / "slots.json"
REPORT_PATH   = OUT_DIR / "alignment_report.txt"
SONG_DURATION = 124.83  # seconds; matches MP3

# (id, type, lyric, anchor_first_word, search_after_seconds)
# `anchor_first_word` is matched case-insensitively against Whisper's word
# stream; the slot's startTime is set to that word's onset.
SLOT_DEFS = [
    (1,  "intro",     "A Mother's Day Story Card",                                                                None,        0.0),
    (2,  "narrative", "Hi, mom, it's me.",                                                                        "Hi",        0.0),
    (3,  "narrative", "Sometimes it's hard for me to say it face to face,\nabout how I've left you all along.",  "Sometimes", 9.0),
    (4,  "narrative", "Now that Mother's Day is near,\nit's easier for me to say",                                "Now",      14.5),
    (5,  "narrative", "how I feel in this song.",                                                                 "how",      18.0),
    (6,  "verse",     "Those tender tears my mother shed for me,",                                                "Those",    20.0),
    (7,  "verse",     "for my hurt feelings she offered sympathy.",                                               "For",      28.0),
    (8,  "verse",     "Through both the good times and the bad,",                                                 "Through",  34.0),
    (9,  "verse",     "she was the one true friend I always had.",                                                "she",      38.5),
    (10, "verse",     "When I was scared, she'd say it'll be alright.",                                           "When",     44.0),
    (11, "verse",     "When I was sick, she stayed up through the night.",                                        "When",     50.0),
    (12, "verse",     "She kissed my sores and my tears away,",                                                   "She",      54.0),
    (13, "verse",     "made time for me during her busy day.",                                                    "Made",     60.0),
    (14, "verse",     "She sheltered me from all harm",                                                           "She",      66.0),
    (15, "verse",     "through the years, she kept me safe and warm.",                                            "through",  70.5),
    (16, "verse",     "When I was growing up, she was always there.",                                             "When",     76.5),
    (17, "verse",     "When I was bad, she was firm but fair.",                                                   "When",     81.5),
    (18, "verse",     "She did her best to teach me right from wrong.",                                           "She",      86.5),
    (19, "verse",     "And now my heart carries her loving song.",                                                "And",      91.5),
    (20, "verse",     "Thanks for loving what you gave to me.",                                                   "Thanks",   96.5),
    (21, "verse",     "Thanks for not giving up when I was mean as I could be.",                                  "Thanks",  102.0),
    (22, "verse",     "Mom, I love you more than words can say.",                                                 "Mom",     107.5),
    (23, "verse",     "And this is your song on Mother's Day.",                                                   "And",     112.5),
    (24, "outro",     "Happy Mother's Day, Mom",                                                                  None,        0.0),
]


def _check_dep(cmd, hint):
    if shutil.which(cmd) is None:
        sys.exit(f"Missing dependency `{cmd}`. {hint}")


def transcribe_audio() -> dict:
    """Run Whisper on the audio and return its raw output dict."""
    try:
        import whisper  # noqa: WPS433 — local import so missing dep gives a friendly message
    except ImportError:
        sys.exit("Missing python package `openai-whisper`. Run: pip install openai-whisper")

    print("Loading whisper medium.en (1.4 GB; cached after first run)…", flush=True)
    model = whisper.load_model("medium.en")

    print("Transcribing with word-level timestamps…", flush=True)
    result = model.transcribe(
        str(WAV_PATH),
        word_timestamps=True,
        language="en",
        fp16=False,
        temperature=0.0,
    )

    words = []
    for seg in result["segments"]:
        for w in seg.get("words", []):
            words.append({
                "word":  w["word"].strip(),
                "start": float(w["start"]),
                "end":   float(w["end"]),
                "prob":  float(w.get("probability", 0)),
            })

    OUT_DIR.mkdir(exist_ok=True)
    with WORDS_JSON.open("w") as f:
        json.dump({"text": result["text"], "words": words}, f, indent=2)

    return {"text": result["text"], "words": words}


def find_first_word(words, anchor, after=0.0):
    target = anchor.lower().strip(".,!?'\"")
    for w in words:
        if w["start"] < after:
            continue
        if w["word"].lower().strip(".,!?'\"") == target:
            return w
    return None


def build_slots(words):
    slots = []
    for sid, stype, lyric, anchor, after in SLOT_DEFS:
        if sid == 1:
            start = 0.0
        elif sid == 24:
            start = None  # filled below — placed after the last sung word
        else:
            w = find_first_word(words, anchor, after=after)
            if w is None:
                raise RuntimeError(
                    f"Could not anchor slot {sid} on word {anchor!r} after {after}s. "
                    "Inspect whisper_words.json and adjust SLOT_DEFS."
                )
            start = round(w["start"], 2)
        slots.append({"id": sid, "type": stype, "lyric": lyric, "start": start})

    last_end = words[-1]["end"]  # last sung word
    slots[23]["start"] = round(last_end + 3.5, 2)

    for i in range(len(slots)):
        slots[i]["end"] = slots[i + 1]["start"] if i + 1 < len(slots) else SONG_DURATION
        slots[i]["duration"] = round(slots[i]["end"] - slots[i]["start"], 2)

    slots[0]["editable"]    = True
    slots[0]["subLyric"]    = "made especially for YOU"
    slots[23]["isGenerated"] = True

    return slots


def write_report(words, slots):
    lines = []
    lines.append("=" * 100)
    lines.append("LYRIC ALIGNMENT REPORT")
    lines.append("=" * 100)
    lines.append(f"{'#':>3}  {'type':<10}  {'start':>7}  {'end':>7}  {'dur':>5}   lyric")
    lines.append("-" * 100)
    for s in slots:
        lyric_oneline = s["lyric"].replace("\n", " | ")
        lines.append(
            f"{s['id']:>3}  {s['type']:<10}  {s['start']:>7.2f}  {s['end']:>7.2f}  {s['duration']:>5.2f}   {lyric_oneline}"
        )

    lines.append("")
    lines.append("=" * 100)
    lines.append("SUNG-WORDS-IN-RANGE  (sanity check)")
    lines.append("=" * 100)
    for s in slots:
        sung = " ".join(
            w["word"] for w in words if w["end"] >= s["start"] and w["start"] < s["end"]
        )
        lines.append(f"  slot {s['id']:>2}  ({s['start']:>6.2f}-{s['end']:>6.2f})  sung: {sung or '(instrumental)'}")
        lines.append(f"            displayed: {s['lyric']}")
        lines.append("")

    REPORT_PATH.write_text("\n".join(lines))
    print(f"\nWrote report to {REPORT_PATH}")
    print("\n" + "\n".join(lines[:32]))


def main():
    _check_dep("ffmpeg", "Install with: sudo apt-get install -y ffmpeg")

    if not AUDIO_MP3.exists():
        sys.exit(f"Missing audio file: {AUDIO_MP3}")

    OUT_DIR.mkdir(exist_ok=True)

    print(f"Converting {AUDIO_MP3.name} -> 16kHz mono WAV…", flush=True)
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(AUDIO_MP3), "-ar", "16000", "-ac", "1", str(WAV_PATH)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    transcription = transcribe_audio()

    print("Building slot table…", flush=True)
    slots = build_slots(transcription["words"])
    SLOTS_JSON.write_text(json.dumps(slots, indent=2))

    write_report(transcription["words"], slots)

    print(
        "\nDONE. To apply the timings, copy the values from "
        f"{SLOTS_JSON} into src/utils/lyricsData.js."
    )


if __name__ == "__main__":
    main()
