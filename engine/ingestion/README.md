# Ingestion

Accept a job manifest and refuse anything the sample pipeline could turn into a false ad.

**Input:** `projects/incoming/<id>/input.json`. The committed fixture is `projects/incoming/sample/input.json`.

**Output:** `projects/production/<id>/ingest.json`, containing the validated manifest.

The sample schema (`schema.ts`) requires `source.kind: "none"`, `app: null`, and `callToAction: null`, and it rejects unknown fields (including a features list). Frame size must already be 1080×1920 at 30 fps. Duration must be between 3 and 12 seconds so the skeleton cannot be pointed at an hour-long render by accident.

A future production manifest may name an app and point at an external recording. That schema should still reject inline feature claims. Features belong in the analysis, with timecodes.
