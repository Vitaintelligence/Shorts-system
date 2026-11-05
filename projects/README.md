# Projects

One job, three stages.

| Folder | Holds |
| --- | --- |
| [incoming](incoming/) | Manifests and pointers to recordings. The sample fixture lives here and is committed. Real media does not. |
| [production](production/) | Stage artifacts while a job is open. Gitignored except this explanation's sibling `.gitkeep`. |
| [approved](approved/) | Jobs a person has accepted. Gitignored except `.gitkeep`. |

Flow: drop a manifest in `incoming`, run the stages, write outputs in `production/<id>`, and move the folder to `approved/<id>` only after QA and a person say so. Export reads an approved master. The sample command writes platform files from `production/sample` without that move, and it labels itself as a pipeline proof.

LIVI recordings, when they exist, are noted from [incoming/livi](incoming/livi/README.md) and stored outside git.
