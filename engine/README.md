# Engine

Runnable stage modules for one job. `produce.ts` is the sample orchestrator (`npm run produce:sample`). Each subfolder owns one stage of [the pipeline](../docs/PIPELINE.md).

| Folder | Input | Output |
| --- | --- | --- |
| [ingestion](ingestion/README.md) | Manifest JSON | `ingest.json` |
| [video-analysis](video-analysis/README.md) | Recording | `analysis.json` |
| [creative](creative/README.md) | Analysis | `concept.json` |
| [scriptwriting](scriptwriting/README.md) | Chosen concept | `script.md` |
| [voice](voice/README.md) | Script | `voice.json`, later a performance file |
| [captions](captions/README.md) | Cue list | `captions.srt` |
| [motion-graphics](motion-graphics/README.md) | Title and safe area | `motion.json`, Remotion layers |
| [animation](animation/README.md) | Shots that are not screen video | `animation.json` |
| [editing](editing/README.md) | All of the above | `edit.json`, platform copies |
| [audio](audio/README.md) | Picture + voice plan | `media/master.mp4` |
| [rendering](rendering/README.md) | Edit props | `media/picture.mp4` |
| [quality](quality/README.md) | Master + SRT | `qa.json` |

Shared types live in `types.ts`. The sample manifest is checked by `schema.ts`. Master frame size, frame rate, and codecs live in `format.ts`.

Stage modules write only inside the job directory they are given. They do not read `.env`.
