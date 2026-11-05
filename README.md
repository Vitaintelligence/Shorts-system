# Shorts Studio

Shorts Studio is a short-form marketing video production system for mobile apps. It turns a real screen recording into a vertical master and per-platform exports. The first app it will serve is [LIVI](https://livi.aifans.ai), an iOS language-learning app where you text native AI characters in Spanish, French, Japanese, and Korean.

That sentence is the known product identity. It is not a feature list. Scripts, captions, and pictures may state a behavior only when a source recording shows it.

This repository is the foundation: folder contracts, role specs, production templates, and one small pipeline that proves the render path. Production of real shorts happens later, in [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web).

## Run the sample

```bash
npm install
npm run produce:sample
```

The sample reads `projects/incoming/sample/input.json` and writes a 5 second 1080×1920, 30 fps, H.264/AAC MP4 with a title card and a burned-in caption. The same file is copied to `exports/instagram`, `exports/tiktok`, and `exports/youtube`, each with an SRT sidecar. Those media files are gitignored. Nothing in the sample is a LIVI advertisement.

Details: [docs/SETUP.md](docs/SETUP.md).

## Layout

```
engine/       Stage modules. The sample pipeline calls each one.
agents/       Role specs for Claude Code. Not running services.
templates/    Production formats. Claims must be demonstrated on screen.
projects/     incoming → production → approved
exports/      Instagram, TikTok, and YouTube deliverables
docs/         Architecture, pipeline, setup, and the two fill-in templates
```

| Document | What it is |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the parts fit |
| [docs/PIPELINE.md](docs/PIPELINE.md) | Ingestion through export, including master specs |
| [docs/SETUP.md](docs/SETUP.md) | Install, sample run, assets, Claude Code on the web |
| [docs/APP_ANALYSIS_TEMPLATE.md](docs/APP_ANALYSIS_TEMPLATE.md) | Per-recording analysis |
| [docs/CONCEPTS_TEMPLATE.md](docs/CONCEPTS_TEMPLATE.md) | Five-concept creative brief |

## Sample pipeline

`npm run produce:sample` runs, in order: ingestion, video analysis, creative, scriptwriting, voice, captions, motion graphics, animation, editing, Remotion render, ffmpeg AAC mux, ffprobe QA, platform export.

Analysis, concepts, voice, and animation are honest no-ops on this input. There is no recording to analyze, so the creative stage refuses to invent a concept, and the voice stage does not call a provider. The picture is a title card plus one caption taken from the manifest.

## Credits

Pipeline structure is inspired by [mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) (Copyright (c) 2026 Mr omi, MIT). No source from that repository is vendored here. See [NOTICE](NOTICE).
