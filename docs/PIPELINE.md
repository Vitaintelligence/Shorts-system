# Pipeline

One job moves from a recording to three platform files. Stages match the folders in `engine/`. The sample command `npm run produce:sample` walks the same order with a placeholder manifest and stops short of pretending it analyzed an app.

## 1. Ingestion

**Input:** a manifest plus, for a real job, a screen recording stored outside git.

**Output:** `projects/production/<id>/ingest.json`.

Check that the recording plays, note its length, device, and app build if the recorder captured that, and copy nothing large into git. The sample manifest is `projects/incoming/sample/input.json`. Its `source.kind` is `none`.

## 2. Video analysis

**Input:** the recording.

**Output:** a filled [APP_ANALYSIS_TEMPLATE.md](APP_ANALYSIS_TEMPLATE.md) saved as `projects/production/<id>/analysis.md`, plus `analysis.json` pointing at it.

Watch the recording. Record only screens, gestures, and results that are visible. The sample writes `analysis.json` with `status: "skipped"` and an empty feature list.

## 3. Concept

**Input:** the analysis.

**Output:** five concepts from [CONCEPTS_TEMPLATE.md](CONCEPTS_TEMPLATE.md), saved as `projects/production/<id>/concepts.md`.

If a concept needs a screen the analysis does not cite, mark that concept blocked. Do not fill the gap. The sample writes `concept.json` with `status: "blocked"`.

## 4. Script

**Input:** one approved concept and the template in `templates/<format>/`.

**Output:** `script.md` with spoken lines and on-screen text.

Every line that asserts what the app does cites an analysis timecode. The sample script quotes the title card and the caption from the manifest and states that there is no voiceover.

## 5. Voice

**Input:** the approved script.

**Output:** a voice plan, then a performance file (wav or similar) kept outside git, with word timings once a real voice stage exists.

The sample does not synthesize speech. `voice.json` selects a silent AAC bed so the master still has an audio track.

## 6. Captions

**Input:** the on-screen lines and their times. Later, word timings from the voice track.

**Output:** `captions.srt` and the same strings burned into the picture.

Burned-in captions are required on the master. The SRT is the optional sidecar for editors and for platforms that also take a file. Times in the SRT and the picture come from one cue list.

## 7. Motion graphics

**Input:** title, supers, and lower-thirds from the script, plus the safe area.

**Output:** `motion.json` and, when the shot needs designed type, the Remotion layers that draw them.

The sample draws one title card. Padding is 220px top, 80px sides, 280px bottom, so platform chrome is less likely to cover the type. Confirm on a phone before a real publish.

## 8. Animation

**Input:** shots that cannot be a screen recording.

**Output:** `animation.json` and a composition, when one is actually needed.

Animation illustrates a demonstrated fact. It does not depict unshown screens. The sample sets `mode: "none"`.

## 9. Editing

**Input:** recording slices, title, captions, animation shots, voice plan.

**Output:** `edit.json`, an edit decision list with frame numbers at 30 fps.

The sample EDL has a title-card segment and one caption segment. Frame bounds are `round(seconds × 30)`.

## 10. Rendering

**Input:** the edit and the Remotion props.

**Output:** `media/picture.mp4`.

The sample composition id is `SampleShort`, registered in `engine/rendering/Root.tsx`. Command path: `npx remotion render engine/rendering/index.ts SampleShort`.

## 11. Audio

**Input:** the picture, the voice plan, and later music and effects stems.

**Output:** `media/master.mp4`.

ffmpeg maps the rendered video and a generated audio stream into one MP4. The sample uses `anullsrc` so the track is valid AAC and contains no fake voice. A later mix should duck music under the voice and keep the voice intelligible. Do not commit the wav stems.

## 12. Quality

**Input:** `media/master.mp4` and `captions.srt`.

**Output:** `qa.json`. The process exits non-zero on failure.

The sample gate checks:

- H.264 video, yuv420p, 1080×1920
- average frame rate within 0.01 of 30
- AAC, 48 kHz, stereo
- duration within 0.08s of the manifest
- SRT contains each burned-in caption string

A later gate can add loudness, dead-frame, and claim-citation checks. Those checks should read the analysis, not invent a new source of truth.

## 13. Approval and export

A person moves a passing job from `projects/production/<id>` to `projects/approved/<id>`. Export copies the master to:

- `exports/instagram/<id>.mp4`
- `exports/tiktok/<id>.mp4`
- `exports/youtube/<id>.mp4`

Each copy ships with `<id>.srt` and `<id>.json`. The JSON records the spec and a safe-area note. This foundation does not re-encode per platform.

The sample writes those files directly so the path can be tested. It does not copy them into `projects/approved/`.

## Export spec

| Property | Value |
| --- | --- |
| Aspect | 9:16 |
| Frame size | 1080×1920 |
| Container | MP4 |
| Video | H.264, yuv420p |
| Audio | AAC, 48 kHz, stereo |
| Frame rate | 30 fps |
| Captions | Burned in. Optional SRT beside the file |
| Instagram | Same master. Watch the bottom caption and right-edge buttons |
| TikTok | Same master. Watch the right edge and bottom description |
| YouTube Shorts | Same master. Watch the bottom title area |

Filename for the sample: `sample-pipeline.mp4`.
