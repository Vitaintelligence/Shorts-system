# Editing

Assemble the edit decision list and, after QA, write platform files.

**Input:** script, cues, motion window, animation plan, and voice plan.

**Output:** `edit.json` with inclusive-start, exclusive-end frame numbers at 30 fps. `export-platforms.ts` copies a passing master to `exports/instagram`, `exports/tiktok`, and `exports/youtube` and writes a matching SRT and JSON sidecar.

The sample EDL lists the title card and the caption. It does not trim a recording, because there is no recording.

Approval is a folder move into `projects/approved/` done by a person. The sample exporter does not perform that move.

The role spec is [the editor](../../agents/editor.md).
