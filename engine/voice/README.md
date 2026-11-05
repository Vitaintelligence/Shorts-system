# Voice

Plan how the script is performed, then store the performance outside git.

**Input:** an approved `script.md`.

**Output:** `voice.json`. A real job also produces a wav (or the provider's audio) and word timings, stored next to the recording in external storage. Keys for a provider belong in `.env` (`ELEVENLABS_API_KEY`, `OPENAI_API_KEY` are the placeholders). This folder does not call those APIs.

The sample plan is `mode: "silent-bed"`: AAC silence at 48 kHz stereo, so the master container is valid without a fake voice.

The role spec is [the audio director](../../agents/audio-director.md).
