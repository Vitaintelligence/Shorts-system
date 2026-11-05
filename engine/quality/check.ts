import path from "node:path";
import { readFile } from "node:fs/promises";
import { MASTER, parseRate } from "../format";
import { capture } from "../exec";
import { writeJson } from "../fsutil";
import type { RenderProps } from "../types";
import type { VoicePlan } from "../voice/prepare-voice";

interface ProbeStream {
  codec_type?: string;
  codec_name?: string;
  width?: number;
  height?: number;
  avg_frame_rate?: string;
  pix_fmt?: string;
  sample_rate?: string;
  channels?: number;
}

interface Probe {
  streams?: ProbeStream[];
  format?: { duration?: string };
}

export async function checkMaster(
  masterPath: string,
  srt: string,
  props: RenderProps,
  voice: VoicePlan,
  workDir: string,
  cwd: string,
): Promise<void> {
  const probe = JSON.parse(
    await capture(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", masterPath],
      cwd,
    ),
  ) as Probe;
  const video = probe.streams?.find((stream) => stream.codec_type === "video");
  const audio = probe.streams?.find((stream) => stream.codec_type === "audio");
  const failures: string[] = [];
  if (!video || video.codec_name !== MASTER.videoCodec) {
    failures.push(`video codec must be ${MASTER.videoCodec}`);
  }
  if (video?.width !== MASTER.width || video?.height !== MASTER.height) {
    failures.push(`frame size must be ${MASTER.width}x${MASTER.height}`);
  }
  if (video?.pix_fmt !== MASTER.pixelFormat) {
    failures.push(`pixel format must be ${MASTER.pixelFormat}`);
  }
  const fps = video?.avg_frame_rate ? parseRate(video.avg_frame_rate) : Number.NaN;
  if (!Number.isFinite(fps) || Math.abs(fps - MASTER.fps) > 0.01) {
    failures.push(`frame rate must be ${MASTER.fps}`);
  }
  if (!audio || audio.codec_name !== MASTER.audioCodec) {
    failures.push(`audio codec must be ${MASTER.audioCodec}`);
  }
  if (Number(audio?.sample_rate) !== MASTER.audioSampleRate) {
    failures.push(`audio sample rate must be ${MASTER.audioSampleRate}`);
  }
  if (audio?.channels !== MASTER.audioChannels) {
    failures.push(`audio channels must be ${MASTER.audioChannels}`);
  }
  const duration = Number(probe.format?.duration);
  if (!Number.isFinite(duration) || Math.abs(duration - props.durationSeconds) > 0.08) {
    failures.push(`duration must be within 0.08s of ${props.durationSeconds}`);
  }
  const srtOnDisk = await readFile(path.join(workDir, "captions.srt"), "utf8");
  if (srtOnDisk !== srt) {
    failures.push("captions.srt does not match the cues written this run");
  }
  for (const cue of props.captions) {
    if (!srt.includes(cue.text)) {
      failures.push(`SRT is missing caption "${cue.text}"`);
    }
  }
  if (voice.mode !== "silent-bed") {
    failures.push("sample QA only accepts the silent AAC bed");
  }
  const report = {
    stage: "quality",
    passed: failures.length === 0,
    failures,
    video: {
      codec: video?.codec_name ?? null,
      width: video?.width ?? null,
      height: video?.height ?? null,
      fps,
      pixelFormat: video?.pix_fmt ?? null,
    },
    audio: {
      codec: audio?.codec_name ?? null,
      sampleRate: audio?.sample_rate ?? null,
      channels: audio?.channels ?? null,
      mode: voice.mode,
    },
    durationSeconds: duration,
  };
  await writeJson(path.join(workDir, "qa.json"), report);
  if (failures.length > 0) {
    throw new Error(`Quality check failed: ${failures.join("; ")}`);
  }
}
