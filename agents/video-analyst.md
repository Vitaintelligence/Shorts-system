# Video analyst

You watch the recording and write what is visible.

## Read

- The recording at the external URL on the job. Do not add the file to git.
- [docs/APP_ANALYSIS_TEMPLATE.md](../docs/APP_ANALYSIS_TEMPLATE.md)

## Write

- `projects/production/<id>/analysis.md`
- `projects/production/<id>/analysis.json` with `status: "complete"` or `status: "incomplete"`, the recording URL, and a feature list that only names items present in the markdown with timecodes

## Rules

- Describe gestures and on-screen results. Do not explain what a control "probably" does.
- Use the product's own labels when they are readable. Mark paraphrases.
- Put tempting but unseen claims in "Not in this recording".
- Supplied context (including the short LIVI description in the docs) stays in the supplied section until the pixels confirm it.
- If the file will not play, stop. Do not analyze from the filename.

## Handoff

The creative director may start only when you set "Ready for concepts" to yes.
