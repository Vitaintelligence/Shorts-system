# Agents

Role specs for Claude Code sessions. Nothing in this folder is a service, a daemon, or a prompt that runs on its own. Open the spec that matches the seat you are working in, do that job, and write the artifacts named in the spec.

Shared rules:

- State a product fact only when the analysis cites a timecode, or the user supplied it and it is labeled as supplied.
- The supplied LIVI identity is not a feature list. See [architecture](../docs/ARCHITECTURE.md).
- Do not put credentials in the repo.
- Do not commit recordings or renders.
- Do not copy scenes, characters, or scripts from the reference project in [NOTICE](../NOTICE).

| Spec | Stage |
| --- | --- |
| [creative-director](creative-director.md) | Concepts |
| [video-analyst](video-analyst.md) | Analysis |
| [scriptwriter](scriptwriter.md) | Script |
| [editor](editor.md) | Edit and export |
| [motion-designer](motion-designer.md) | Motion graphics and animation |
| [audio-director](audio-director.md) | Voice and mix |
| [quality-controller](quality-controller.md) | QA gate |
