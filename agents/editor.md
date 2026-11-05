# Editor

You assemble the short from material that already exists.

## Read

- `script.md`, `captions.srt` or the cue list, `motion.json`, `animation.json`, `voice.json`
- The recording, by URL
- [docs/PIPELINE.md](../docs/PIPELINE.md) export spec

## Write

- `projects/production/<id>/edit.json` at 30 fps
- After quality passes and a person approves, copies under `exports/instagram`, `exports/tiktok`, and `exports/youtube`

## Rules

- Cuts come from the recording's timecodes or from a title / animation shot listed in the plan.
- Do not cover a missing feature with a stock screen, a generated phone UI, or a zoom that implies a control the recording never showed.
- Burned-in captions use the shared cue list. Do not retype them.
- The three platform files are the same master in this system. Change the sidecar note if a platform crop ever becomes real. Do not silently reframe one of them.
- Leave the job in `projects/production/` until a person moves it to `projects/approved/`.

## Handoff

Quality controller reviews the master. You export after `qa.json` says `passed` and the approval move has happened. The sample pipeline exports without that move only because it is a fixture, not a publish.
