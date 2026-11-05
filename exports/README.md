# Exports

Finished masters, one folder per platform. The bytes match. The sidecar records the safe-area warning for that platform.

| Folder | File |
| --- | --- |
| [instagram](instagram/README.md) | `<id>.mp4`, `<id>.srt`, `<id>.json` |
| [tiktok](tiktok/README.md) | `<id>.mp4`, `<id>.srt`, `<id>.json` |
| [youtube](youtube/README.md) | `<id>.mp4`, `<id>.srt`, `<id>.json` |

Spec for every file: 9:16, 1080×1920, 30 fps, MP4, H.264, AAC, captions burned in, SRT optional beside it. See [docs/PIPELINE.md](../docs/PIPELINE.md).

`npm run produce:sample` writes `sample-pipeline.*` into each folder. Those files are gitignored.
