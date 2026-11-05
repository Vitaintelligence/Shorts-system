# Quality

Accept or reject the master before export.

**Input:** `media/master.mp4`, `captions.srt`, the render props, and the voice plan.

**Output:** `qa.json`. On failure, `produce.ts` exits with a non-zero status and does not export.

Checks in this skeleton: H.264, yuv420p, 1080×1920, ~30 fps, AAC 48 kHz stereo, duration within 0.08s of the manifest, and every caption string present in the SRT. The sample also requires `voice.mode === "silent-bed"`.

Later checks belong here too: loudness once the bed is real, and a citation check that every super appears in the approved script. The role spec is [the quality controller](../../agents/quality-controller.md).
