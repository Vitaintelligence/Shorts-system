export const MASTER = {
  width: 1080,
  height: 1920,
  fps: 30,
  videoCodec: "h264",
  audioCodec: "aac",
  pixelFormat: "yuv420p",
  audioSampleRate: 48000,
  audioChannels: 2,
  audioBitrate: "128k",
} as const;

export const PLATFORMS = ["instagram", "tiktok", "youtube"] as const;

export type Platform = (typeof PLATFORMS)[number];

export function secondsToFrames(seconds: number, fps: number = MASTER.fps): number {
  return Math.round(seconds * fps);
}

export function parseRate(rate: string): number {
  const [numerator, denominator] = rate.split("/").map(Number);
  if (!Number.isFinite(numerator) || numerator <= 0) {
    return Number.NaN;
  }
  if (!denominator) {
    return numerator;
  }
  return numerator / denominator;
}
