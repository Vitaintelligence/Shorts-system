# Setup

## Prerequisites

- Node.js 22 or newer
- npm
- ffmpeg and ffprobe on `PATH`

The sample render downloads a headless browser the first time Remotion runs. That download needs network access.

## Install and run

```bash
npm install
npm run produce:sample
```

`npm run typecheck` runs `tsc --noEmit`. `npm run studio` opens the Remotion studio on the sample composition for local preview. Studio is optional. There is no dashboard.

A passing run prints three gitignored paths:

```
exports/instagram/sample-pipeline.mp4
exports/tiktok/sample-pipeline.mp4
exports/youtube/sample-pipeline.mp4
```

Beside each MP4 are an `.srt` and a `.json` sidecar. Stage notes for the run are under `projects/production/sample/`, also gitignored. Inspect `qa.json` if you want the probed codecs and frame size.

The picture is a title card ("Pipeline sample") and one burned-in line ("Burned-in caption from the sample manifest."). The audio track is silent AAC on purpose.

## Environment variables

```bash
cp .env.example .env
```

Leave the values empty until a voice provider or an asset bucket exists. Do not commit `.env`. The sample command does not read it.

`REMOTION_TMP` can point at a directory with spare disk. Remotion's webpack bundles are large and are not cleaned aggressively.

## Source recordings and renders

Do not commit `.mp4`, `.mov`, or audio stems. `.gitignore` already drops them, along with everything under `projects/production/` and `projects/approved/` except the `.gitkeep` files.

For a real LIVI recording, put the file in object storage or on a shared drive and record the URL in the job manifest. `ASSET_BUCKET_URL` in `.env.example` is the placeholder for that location. Git LFS is an option if the team wants the binaries in the repo history anyway. LFS is not configured here, and a cloud session that uploads the working tree will skip or struggle with large media. Prefer an external URL.

`projects/incoming/livi/README.md` is the drop note for that app. The folder is otherwise gitignored so a local recording is not added by accident.

## Continue in Claude Code on the web

Real shorts are produced by a person driving Claude Code, not by extending this sample into a fake ad.

1. Merge this foundation, then open the repo in a cloud session from [claude.ai/code](https://claude.ai/code). Setup, GitHub access, and moving a session between the terminal and the cloud are documented at [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web).
2. The cloud environment needs Node 22, ffmpeg, and ffprobe. Put provider keys in the environment's secrets, not in the repo.
3. Start a session by pointing it at `docs/ARCHITECTURE.md`, `docs/PIPELINE.md`, and the agent spec for the seat you want (`agents/`).
4. Give it a recording URL. Ask it to fill `docs/APP_ANALYSIS_TEMPLATE.md` only from what is on screen, then `docs/CONCEPTS_TEMPLATE.md`.
5. After you approve one concept, use the matching folder in `templates/`. Render a new composition. Do not point `produce:sample` at LIVI copy.

`claude --cloud` from a machine where the CLI is logged in can start that session once the branch is on GitHub. Push first. The cloud VM clones the remote.

## What the sample will not do

- It will not analyze LIVI or any other app.
- It will not call a voice, music, or video-generation API.
- It will not write a file that claims a feature, a price, a rating, or a quote.
