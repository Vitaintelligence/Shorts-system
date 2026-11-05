# Video analysis

Watch a source recording and write down only what it shows.

**Input:** a recording URL or path recorded in the manifest, plus the job id. The file itself stays outside git.

**Output:** `analysis.json` and, for a real job, `analysis.md` filled from [the template](../../docs/APP_ANALYSIS_TEMPLATE.md).

The sample module writes `status: "skipped"` and `features: []` because the fixture has no recording. It must not grow a hardcoded description of LIVI.

Later work in this folder can extract frames or transcripts. Those tools still do not get to name a feature the frames do not contain. The role spec is [the video analyst](../../agents/video-analyst.md).
