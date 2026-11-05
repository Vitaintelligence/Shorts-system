import path from "node:path";
import { MASTER } from "../format";
import { capture } from "../exec";
import { writeJson } from "../fsutil";
import type { VoicePlan } from "../voice/prepare-voice";

export async function muxSilentBed(
  picturePath: string,
  masterPath: string,
  voice: VoicePlan,
  workDir: string,
  cwd: string,
): Promise<void> {
  const probe = JSON.parse(
    await capture(
      "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "json", picturePath],
      cwd,
    ),
  ) as { format?: { duration?: string } };
  const duration = Number(probe.format?.duration);
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error("Could not read the rendered picture duration");
  }
  await capture(
    "ffmpeg",
    [
      "-y",
      "-i",
      picturePath,
      "-f",
      "lavfi",
      "-t",
      duration.toFixed(3),
      "-i",
      `anullsrc=r=${voice.sampleRate}:cl=stereo`,
      "-map",
      "0:v:0",
      "-map",
      "1:a:0",
      "-c:v",
      "copy",
      "-c:a",
      voice.codec,
      "-b:a",
      MASTER.audioBitrate,
      "-ar",
      String(voice.sampleRate),
      "-ac",
      String(voice.channels),
      "-movflags",
      "+faststart",
      masterPath,
    ],
    cwd,
  );
  await writeJson(path.join(workDir, "audio.json"), {
    stage: "audio",
    mode: voice.mode,
    master: path.basename(masterPath),
    durationSeconds: duration,
    codec: MASTER.audioCodec,
    sampleRate: voice.sampleRate,
    channels: voice.channels,
  });
}
