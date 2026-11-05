# Audio

Mux the finished picture with the audio bed.

**Input:** `media/picture.mp4` and the voice plan.

**Output:** `media/master.mp4` and `audio.json`.

The sample generates silence with ffmpeg `anullsrc` and copies the video stream unchanged (`-c:v copy`), mapping that video plus the new AAC track. Sample rate 48 kHz, stereo, 128 kbps AAC, `+faststart`.

A later mix replaces silence with voice and music stems. Keep stems out of git. Measure loudness in the quality stage once there is real audio. Silence is the expected sample result, not a defect.

The role spec is [the audio director](../../agents/audio-director.md).
