# Captions

Build the cue list once and use it for both the burned-in line and the SRT.

**Input:** caption cues (`id`, `startSeconds`, `endSeconds`, `text`).

**Output:** `captions.srt` and `captions.json`.

`srt.ts` formats times as `HH:MM:SS,mmm`. The sample composition reads the same cue objects via Remotion props, so the subtitle file and the picture cannot drift unless a later edit changes one and not the other. The quality gate checks that the SRT still contains each cue string.

Captions are part of the picture on every platform export. The SRT is the optional sidecar.
